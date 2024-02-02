import { createSQLiteHTTPPool, SQLiteHTTPPool } from 'sqlite-wasm-http';

import ImageTileSource from 'ol/source/TileImage.js';
import Tile from 'ol/Tile.js';
import ImageTile from 'ol/ImageTile.js';
import { TileCoord } from 'ol/tilecoord.js';
import TileState from 'ol/TileState.js';

import { httpPoolOptions, MBTilesRasterOptions, SQLOptions } from './mbtiles.js';
import { debug } from './debug.js';

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
  private mime?: string;

  /**
   * @param {MBTilesRasterOptions} options options
   */
  constructor(options: MBTilesRasterOptions & SQLOptions) {
    if (options.url === undefined && options.pool === undefined)
      throw new Error('Must specify url');

    super({
      ...options,
      url: undefined,
      // This is required to prevent Openlayers' cache from thinking that all tiles share the same URL
      tileUrlFunction: (coords: TileCoord) => `${options.url}#${coords[0]}:${coords[1]}:${coords[2]}`
    });

    this.setTileLoadFunction(this.tileLoader.bind(this));

    this.pool = options.pool ?? createSQLiteHTTPPool(httpPoolOptions(options))
      .then((pool) => pool.open(options.url).then(() => pool));
    this.mime = options.mime;
  }

  // TODO fix the tile type in Openlayers
  private tileLoader(tile: Tile, _url: string) {
    debug('loading tile', [tile.tileCoord[0], tile.tileCoord[1], tile.tileCoord[2]]);
    const image = (tile as ImageTile).getImage() as HTMLImageElement;
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
            const blob = new Blob([r[0].row[0] as Uint8Array], { type: this.mime });
            const imageUrl = URL.createObjectURL(blob);
            image.src = imageUrl;
            return;
          }
        }
        throw new Error(`No data for ${tile.tileCoord}`);
      })
      .catch((e) => {
        debug(e);
        tile.setState(TileState.ERROR);
      });
  }

  disposeInternal() {
    return this.pool.then((p) => p.close());
  }
}
