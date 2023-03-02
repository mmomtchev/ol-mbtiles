// Why is this horror necessary?
// Because of https://github.com/nodejs/cjs-module-lexer/pull/24
import sqlhttpDefault from 'sql.js-httpvfs';
import * as sqlhttpAll from 'sql.js-httpvfs';
const sqlhttp = sqlhttpDefault ?? sqlhttpAll;
import type { WorkerHttpvfs } from 'sql.js-httpvfs';
import { SplitFileConfigPure } from 'sql.js-httpvfs/dist/sqlite.worker';

import VectorTileSource, { Options as VectorTileOptions } from 'ol/source/VectorTile.js';
import VectorTile from 'ol/VectorTile.js';
import { TileCoord } from 'ol/tilecoord.js';
import Feature from 'ol/Feature.js';
import { Geometry } from 'ol/geom.js';

import { MBTilesFormat } from './mbtiles-format';

export interface Options extends VectorTileOptions {
  tileCacheSize?: number;
  sqlCacheSize?: number;
  sqlWorkers?: number;
  layers?: string[];
};

const workerUrl = globalThis.olMBTiles?.workerUrl ?? new URL(
  'sql.js-httpvfs/dist/sqlite.worker.js',
  import.meta.url,
);
const wasmUrl = globalThis.olMBTiles?.wasmUrl ?? new URL(
  'sql.js-httpvfs/dist/sql-wasm.wasm',
  import.meta.url,
); 
const maxBytesToRead = 10 * 1024 * 1024;

interface Metadata {
  minzoom: number;
  maxzoom: number;
};

export class MBTilesSource extends VectorTileSource {
  private worker: Promise<WorkerHttpvfs>[];
  private currentWorker: number;
  metadata: Promise<Metadata | null>;

  constructor(options: Options) {
    super({
      ...options,
      cacheSize: options.tileCacheSize,
      url: undefined,
      format: new MBTilesFormat({
        layers: options.layers
      }),
      // This is required to prevent Openlayers' cache from thinking that all tiles share the same URL
      tileUrlFunction: (coords: TileCoord) => `${coords[0]}:${coords[1]}:${coords[2]}`
    });

    this.setTileLoadFunction(this.tileLoader.bind(this));

    const config = {
      from: 'inline',
      config: {
        serverMode: 'full',
        requestChunkSize: 1024,
        url: options.url
      }
    } as SplitFileConfigPure;

    this.worker = [];
    for (let i = 0; i < (options.sqlWorkers ?? 4); i++) {
      this.worker[i] = sqlhttp.createDbWorker(
        [config],
        workerUrl.toString(),
        wasmUrl.toString(),
        maxBytesToRead
      );
    }
    this.currentWorker = 0;

    this.metadata = this.worker[(this.currentWorker++) % this.worker.length]
      .then((w) => w.db.query('SELECT name,value FROM metadata WHERE name="maxzoom" or name="minzoom"'))
      .then((r) => {
        // Alas, at the moment it is not possible to replace the TileGrid after constructing the layer
        if (r && r.length == 2) {
          const data = r.reduce((a, x) => {
            a[x['name']] = x['value'];
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

  private tileLoader(tile: VectorTile, url: string) {
    console.debug('loading tile', [tile.tileCoord[0], tile.tileCoord[1], tile.tileCoord[2]]);
    tile.setLoader((extent, resolution, projection) => {
      this.worker[(this.currentWorker++) % this.worker.length]
        .then((w) =>
          w.db.query(
            'SELECT tile_data FROM tiles WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?',
            [tile.tileCoord[0], tile.tileCoord[1], (1 << tile.tileCoord[0]) - 1 - tile.tileCoord[2]]
          ))
        .then((r) => {
          if (r && r[0] && r[0]['tile_data']) {
            const format = tile.getFormat();
            const features = format.readFeatures(r[0]['tile_data'], {
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

  destroy() {
    for (const worker of this.worker) {
      worker.then((w) => {
        w.release();
      });
    }
  }
}
