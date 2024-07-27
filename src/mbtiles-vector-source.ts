import { createSQLiteHTTPPool, SQLiteHTTPPool } from 'sqlite-wasm-http';

import VectorTileSource from 'ol/source/VectorTile.js';
import VectorTile from 'ol/VectorTile.js';
import { TileCoord } from 'ol/tilecoord.js';
import { FeatureLike } from 'ol/Feature.js';
import Tile from 'ol/Tile';
import RenderFeature from 'ol/render/Feature.js';

import { httpPoolOptions, MBTilesVectorOptions, SQLOptions } from './mbtiles.js';
import { MBTilesFormat } from './mbtiles-format.js';
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
export class MBTilesVectorSource<F extends FeatureLike = RenderFeature> extends VectorTileSource<F> {
  private pool: Promise<SQLiteHTTPPool>;

  /**
   * @param {MBTilesVectorOptions} options options
   */
  constructor(options: MBTilesVectorOptions & SQLOptions) {
    if (options.url === undefined && options.pool === undefined)
      throw new Error('Must specify url');

    super({
      ...options,
      url: undefined,
      format: new MBTilesFormat<F>({
        layers: options.layers
      }),
      // This is required to prevent Openlayers' cache from thinking that all tiles share the same URL
      tileUrlFunction: (coords: TileCoord) => `${options.url}#${coords[0]}:${coords[1]}:${coords[2]}`
    });

    this.setTileLoadFunction(this.tileLoader.bind(this));

    this.pool = options.pool ?? createSQLiteHTTPPool(httpPoolOptions(options))
      .then((pool) => pool.open(options.url).then(() => pool));
  }

  private tileLoader(_tile: Tile, _url: string) {
    const tile = _tile as VectorTile<F>;
    debug('loading tile', [tile.tileCoord[0], tile.tileCoord[1], tile.tileCoord[2]]);
    tile.setLoader((extent, resolution, projection) => {
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
          if (r && r[0] && r[0].row[0]) {
            const format = tile.getFormat();
            const features = format.readFeatures(r[0].row[0], {
              extent,
              featureProjection: projection
            }) as F[];
            tile.setFeatures(features);
            tile.onLoad(features, projection);
            return;
          }
          throw new Error(`No data for ${tile.tileCoord}`);
        })
        .catch((e) => {
          debug(e);
          tile.onError();
        });
    });
  }

  disposeInternal() {
    return this.pool.then((p) => p.close());
  }
}
