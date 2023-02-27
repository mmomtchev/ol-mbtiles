import { createDbWorker, WorkerHttpvfs } from 'sql.js-httpvfs';
import { SplitFileConfigPure } from 'sql.js-httpvfs/dist/sqlite.worker';

import { Extent } from 'ol/extent';
import { ProjectionLike } from 'ol/proj';
import VectorTileSource from 'ol/source/VectorTile.js';
import VectorTile from 'ol/VectorTile';
import { TileCoord } from 'ol/tilecoord';
import TileGrid from 'ol/tilegrid/TileGrid';
import Feature from 'ol/Feature';
import { Geometry } from 'ol/geom';

import { MBTilesFormat } from './mbtiles-format';

export interface Options {
  attributionsCollapsible?: boolean;
  tileCacheSize?: number;
  sqlCacheSize?: number;
  extent?: Extent;
  overlaps?: boolean;
  projection?: ProjectionLike;
  maxZoom?: number;
  tileSize?: number;
  maxResolution?: number;
  tileGrid?: TileGrid;
  url: string;
  transition?: number;
  wrapX?: boolean;
}

const workerUrl = new URL(
  'sql.js-httpvfs/dist/sqlite.worker.js',
  import.meta.url,
);
const wasmUrl = new URL(
  'sql.js-httpvfs/dist/sql-wasm.wasm',
  import.meta.url,
);

const maxBytesToRead = 10 * 1024 * 1024;

export class MBTilesSource extends VectorTileSource {
  worker: Promise<WorkerHttpvfs>;

  constructor(options: Options) {
    super({
      ...options,
      url: undefined,
      format: new MBTilesFormat(),
      tileLoadFunction: (tile: VectorTile, url: string) => this.tileLoader(tile, url),
      // This is required to prevent Openlayers' cache from thinking that all tiles share the same URL
      tileUrlFunction: (coords: TileCoord) => `${coords[0]}:${coords[1]}:${coords[2]}`
    });

    const config = {
      from: 'inline',
      config: {
        serverMode: 'full',
        requestChunkSize: 1024,
        url: options.url
      }
    } as SplitFileConfigPure;

    this.worker = createDbWorker(
      [config],
      workerUrl.toString(),
      wasmUrl.toString(),
      maxBytesToRead
    );
  }

  tileLoader(tile: VectorTile, url: string) {
    const source = this;

    console.log('loading tile', [tile.tileCoord[0], tile.tileCoord[1], (1 << tile.tileCoord[0]) - 1 - tile.tileCoord[2]]);
    tile.setLoader(function (extent, resolution, projection) {
      source.worker
        .then((w) =>
          w.db.query(
            `SELECT tile_data FROM tiles WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?`,
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
}
