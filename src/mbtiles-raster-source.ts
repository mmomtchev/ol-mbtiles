import { createSQLiteHTTPPool, SQLiteHTTPPool } from 'sqlite-wasm-http';

import ImageTileSource, { Options as ImageTileOptions } from 'ol/source/TileImage.js';
import ImageTile from 'ol/ImageTile.js';
import { TileCoord } from 'ol/tilecoord.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';

import { Metadata } from './mbtiles';

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
   * Alternative method of specifying minZoom, mutually exclusive with tileGrid, requires explicit projection
   */
  minZoom?: number;

  /**
   * Alternative method of specifying minZoom, mutually exclusive with tileGrid, requires explicit projection
   */
  maxZoom?: number;

  /**
   * Optional tile grid, refer to the Openlayers manual
   */
  tileGrid?: TileGrid;

  /**
   * Optional already open SQLiteHTTP pool (mutually exclusive with url)
   */
  pool?: Promise<SQLiteHTTPPool>;
}

/**
 * A tile source in a remote .mbtiles file accessible by HTTP
 * 
 * WARNING
 * If your application continuously creates and removes MBTilesSource
 * objects, special care must be taken to properly dispose of them.
 * An MBTilesSource creates a thread pool that the JS engine is unable to
 * automatically garbage-collect unless the dispose() method
 * is invoked.
 * If you need to dispose a map that can potentially contain
 * MBTilesSource objects, check loadExample() in
 * https://github.com/mmomtchev/ol-mbtiles/blob/main/examples/index.ts#L15
 */
export class MBTilesRasterSource extends ImageTileSource {
  private pool: Promise<SQLiteHTTPPool>;
  metadata: Promise<Metadata | null>;

  /**
   * @param {Options} options options
   */
  constructor(options: Options) {
    if (options.url === undefined && options.pool === undefined)
      throw new Error('Must specify url');

    super({
      ...options,
      url: undefined,
      // This is required to prevent Openlayers' cache from thinking that all tiles share the same URL
      tileUrlFunction: (coords: TileCoord) => `${options.url}#${coords[0]}:${coords[1]}:${coords[2]}`
    });

    this.setTileLoadFunction(this.tileLoader.bind(this));

    this.pool = options.pool ?? createSQLiteHTTPPool({
      workers: options.sqlWorkers ?? 4,
      httpOptions: { maxPageSize: 4096 }
    })
      .then((pool) => pool.open(options.url).then(() => pool));
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
          if (r[0].row[0] instanceof Uint8Array) {
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
