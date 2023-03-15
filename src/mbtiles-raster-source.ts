import { createSQLiteHTTPPool, SQLiteHTTPPool } from 'sqlite-wasm-http';

import ImageTileSource, { Options as ImageTileOptions } from 'ol/source/TileImage.js';
import ImageTile from 'ol/ImageTile.js';
import { TileCoord } from 'ol/tilecoord.js';
import TileGrid from 'ol/tilegrid/TileGrid';

import { loadMBTilesMetadata, Metadata } from './metadata';

export interface Options extends ImageTileOptions {
  /**
   * Number of parallel workers to use for retrieving tiles, @default 4
   */
  sqlWorkers?: number;
  /**
   * List of layer names to selectively include, @default everything
   */
  layers?: string[];

  tileUrlFunction?: never;
  tileLoadFunction?: never;

  /**
   * Optional tile grid, refer to the Openlayers manual
   */
  tileGrid?: TileGrid;
}

/**
 * A tile source in a remote .mbtiles file accessible by HTTP
 * 
 * WARNING
 * If your application continuously creates and removes MBTilesSource
 * objects, special care must be taken to properly dispose of them.
 * An MBTilesSource creates a thread pool that the JS engine is unable to
 * automatically garbage-collect unless the dispose() method
 * is invoked. Check loadExample() in
 * https://github.com/mmomtchev/ol-mbtiles/blob/main/examples/index.ts#L15
 * for an example implementation that properly disposes of a Map
 * containing MBTilesSource
 */
export class MBTilesRasterSource extends ImageTileSource {
  private pool: Promise<SQLiteHTTPPool>;
  metadata: Promise<Metadata | null>;

  constructor(options: Options) {
    super({
      ...options,
      url: undefined,
      // This is required to prevent Openlayers' cache from thinking that all tiles share the same URL
      tileUrlFunction: (coords: TileCoord) => `${coords[0]}:${coords[1]}:${coords[2]}`
    });

    this.setTileLoadFunction(this.tileLoader.bind(this));

    this.pool = createSQLiteHTTPPool({
      workers: options.sqlWorkers ?? 4,
      httpOptions: { maxPageSize: 4096 }
    })
      .then((pool) => pool.open(options.url).then(() => pool));

    this.metadata = loadMBTilesMetadata(this.pool, {
      minZoom: options.tileGrid.getMinZoom(),
      maxZoom: options.tileGrid.getMaxZoom()
    });
  }

  private tileLoader(tile: ImageTile, _url: string) {
    console.debug('loading tile', [tile.tileCoord[0], tile.tileCoord[1], tile.tileCoord[2]]);
    const image = tile.getImage() as HTMLImageElement;
    this.pool
      .then((p) =>
        p.exec(
          'SELECT tile_data FROM tiles WHERE zoom_level = $zoom AND tile_column = $col AND tile_row = $row',
          {
            $zoom: tile.tileCoord[0],
            $col: tile.tileCoord[1],
            $row: (1 << tile.tileCoord[0]) - 1 - tile.tileCoord[2]
          }
        ))
      .then((r) => {
        if (r && r[0]) {
          if(r[0].row[0] instanceof Uint8Array) {
            const blob = new Blob([r[0].row[0] as Uint8Array]);
            const imageUrl = URL.createObjectURL(blob);
            image.src = imageUrl;
            return;
          }
        }
        tile.setState(3);
      })
      .catch(() => tile.setState(3));
  }

  disposeInternal() {
    return this.pool.then((p) => p.close());
  }
}
