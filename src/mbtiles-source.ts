import { createSQLiteHTTPPool, SQLiteHTTPPool } from 'sqlite-wasm-http';

import VectorTileSource, { Options as VectorTileOptions } from 'ol/source/VectorTile.js';
import VectorTile from 'ol/VectorTile.js';
import { TileCoord } from 'ol/tilecoord.js';
import Feature from 'ol/Feature.js';
import { Geometry } from 'ol/geom.js';

import { MBTilesFormat } from './mbtiles-format';

export interface Options extends VectorTileOptions {
  /**
   * Number of parallel workers to use for retrieving tiles, @default 4
   */
  sqlWorkers?: number;
  /**
   * List of layer names to selectively include, @default everything
   */
  layers?: string[];
  /**
   * Maximum amount of bytes to transfer for a single tile.
   * This is a protection against requesting from a database without index.
   * @default 10485760
   */
  maxSingleTransfer?: number;

  tileUrlFunction?: never;
  tileLoadFunction?: never;
  format?: never;
}

interface Metadata {
  minzoom: number;
  maxzoom: number;
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
export class MBTilesSource extends VectorTileSource {
  private pool: Promise<SQLiteHTTPPool>;
  metadata: Promise<Metadata | null>;

  constructor(options: Options) {
    super({
      ...options,
      url: undefined,
      format: new MBTilesFormat({
        layers: options.layers
      }),
      // This is required to prevent Openlayers' cache from thinking that all tiles share the same URL
      tileUrlFunction: (coords: TileCoord) => `${coords[0]}:${coords[1]}:${coords[2]}`
    });

    this.setTileLoadFunction(this.tileLoader.bind(this));

    this.pool = createSQLiteHTTPPool({
      workers: options.sqlWorkers ?? 4,
      httpOptions: { maxPageSize: 4096 }
    })
      .then((pool) => pool.open(options.url).then(() => pool));

    this.metadata = this.pool
      .then((p) => p.exec('SELECT name,value FROM metadata WHERE name=$maxzoom or name=$minzoom', {
        $maxzoom: 'maxzoom',
        $minzoom: 'minzoom'
      }))
      .then((r) => {
        // Alas, at the moment it is not possible to replace the TileGrid after constructing the layer
        if (r && r.length == 2) {
          const data = r.reduce((a, x) => {
            a[x.row[0] as string] = x.row[1];
            return a;
          }, {}) as Record<string, number>;
          console.debug('Loaded metadata', data);
          if (options.maxZoom != data.maxzoom || options.minZoom != data.minzoom) {
            console.warn(`minZoom/maxZoom ${data.minzoom}/${data.maxzoom}` +
              ` of retrieved MBTiles do not match Openlayers configuration ${options.minZoom}/${options.maxZoom}`);
          }
          return data as unknown as Metadata;
        }
        throw new Error('Could not load metadata');
      })
      .catch(e => {
        console.warn(e);
        return null;
      });
  }

  private tileLoader(tile: VectorTile, _url: string) {
    console.debug('loading tile', [tile.tileCoord[0], tile.tileCoord[1], tile.tileCoord[2]]);
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
            }) as Feature<Geometry>[];
            tile.setFeatures(features);
            tile.onLoad(features, projection);
            return;
          }
          throw new Error(`No data for ${tile.tileCoord}`);
        })
        .catch((e) => {
          console.warn(e);
          tile.onError();
        });
    });
  }

  disposeInternal() {
    return this.pool.then((p) => p.close());
  }
}
