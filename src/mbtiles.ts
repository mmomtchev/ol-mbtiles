import { createSQLiteHTTPPool, SQLiteHTTPPool, VFSHTTP } from 'sqlite-wasm-http';

import { Options as ImageTileOptions } from 'ol/source/TileImage.js';
import { Options as OLVectorTileOptions } from 'ol/source/VectorTile.js';
import { get as getProjection, transformExtent } from 'ol/proj.js';
import { getWidth } from 'ol/extent.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import { FeatureLike } from 'ol/Feature.js';
import { debug } from './debug.js';

// This is a very ugly check if OLVectorTileOptions is a generic type
// (this is something that changed in OpenLayers 9.0)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type VectorTileOptions = unknown extends OLVectorTileOptions<FeatureLike> ?
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  OLVectorTileOptions :
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  OLVectorTileOptions<FeatureLike>;

/**
 * Options for creating a MBTilesRasterSource
 */
export interface MBTilesRasterOptions extends ImageTileOptions {
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

  /**
   * Optional MIME type for loaded tiles (see https://github.com/mmomtchev/ol-mbtiles/issues/68)
   */
  mime?: string;
}

/**
 * Options for creating a MBTilesVectorSource
 */
export interface MBTilesVectorOptions extends VectorTileOptions {
  /**
   * Number of parallel workers to use for retrieving tiles, @default 4
   */
  sqlWorkers?: number;
  /**
   * List of layer names to selectively include, @default everything
   */
  layers?: string[];

  /**
   * Optional already open SQLiteHTTP pool (mutually exclusive with url)
   */
  pool?: Promise<SQLiteHTTPPool>;

  tileUrlFunction?: never;
  tileLoadFunction?: never;
  format?: never;
}

/**
 * Shared options for all MBTiles
 */
export interface SQLOptions {
  /**
   * URL of the remote MBTiles source
   */
  url: string;
  /**
   * Number of parallel workers to use for retrieving tiles, @default 4
   */
  sqlWorkers?: number;

  /**
   * Maximum expected page size in bytes for SQLite3 files, @default 4096
   */
  maxSqlPageSize?: number;

  /**
   * Memory to use for SQLite cache in KB, @default 4096
   */
  sqlCacheSize?: number;

  /**
   * Use a specific backend type, @default 'shared'
   */
  backendType?: VFSHTTP.Options['backendType'];
}

export type MBTilesOptions = MBTilesVectorOptions | MBTilesRasterOptions;

const formats: Record<string, { type: 'raster' | 'vector', mime?: string; }> = {
  'jpg': { type: 'raster', mime: 'image/jpeg' },
  'png': { type: 'raster', mime: 'image/png' },
  'webp': { type: 'raster', mime: 'image/webp' },
  'pbf': { type: 'vector' },
  'mvt': { type: 'vector' },
};

export function httpPoolOptions(options?: SQLOptions) {
  return {
    workers: options?.sqlWorkers ?? 4,
    httpOptions: {
      backendType: options?.backendType,
      maxPageSize: options?.maxSqlPageSize ?? 4096,
      cacheSize: options?.sqlCacheSize ?? 4096
    } as VFSHTTP.Options,
  };
}

/**
 * Automatically import MBTiles metadata and return an options object
 * compatible with the source constructors.
 * 
 * @param {(MBTilesRasterOptions | MBTilesVectorOptions) & SQLOptions} opt Any MBTiles{Raster|Vector}Source options to be overridden
 * @param {string} opt.url URL of the remote tileset
 * @returns {(MBTilesRasterOptions | MBTilesVectorOptions)}
 */
export function importMBTiles<T extends MBTilesOptions>(opt: SQLOptions & T): Promise<T & SQLOptions> {
  const pool: Promise<SQLiteHTTPPool> = createSQLiteHTTPPool(httpPoolOptions(opt));

  return pool
    .then((pool) => pool.open(opt.url).then(() => pool))
    .then((p) => p.exec('SELECT name,value FROM metadata'))
    .then((r) => {
      if (r && r.length) {
        // Transform an array of form [ ['name', 'value' ], ... ] to object
        const data = r.reduce((a, x) => {
          a[x.row[0] as string] = x.row[1] as string;
          return a;
        }, {} as Record<string, string>);
        debug('Loaded metadata', data);
        return data;
      }
      throw new Error('Could not load metadata');
    })
    .then((md) => {
      const opts = { ...opt } as T & SQLOptions;

      const format = (md['format'] as string)?.toLowerCase?.();
      if (!formats[format])
        console.warn('Unknown tile format', format);

      // Sometimes, I wonder if Mapbox doesn't hold a patent or some
      // other kind of investment related to everyone using 3857
      opts.projection = opt.projection ?? 'EPSG:3857';
      opts.attributions = (md.attribution ?? md.description) as string;
      opts.maxZoom = opt.maxZoom ?? +md['maxzoom'];
      opts.minZoom = opt.minZoom ?? +md['minzoom'];

      const projExtent = getProjection(opts.projection)?.getExtent?.();
      const bounds = md['bounds'] as string;
      const extent = bounds ?
        transformExtent(bounds.split(',').map((r) => +r), 'EPSG:4326', opts.projection) :
        projExtent;

      if (formats[format].type === 'raster') {
        if (opts.maxZoom === undefined || opts.minZoom === undefined || projExtent === undefined)
          throw new Error('Cannot determine tilegrid, need minZoom, maxZoom');
        const baseResolution = getWidth(projExtent) / 256;
        const resolutions = [baseResolution];
        for (let z = 1; z <= opts.maxZoom; z++)
          resolutions.push(resolutions[resolutions.length - 1] / 2);

        const mime = formats[format].mime ?? format;
        (opts as MBTilesRasterOptions).mime = mime;

        opts.tileGrid = new TileGrid({
          origin: [projExtent[0], projExtent[2]],
          extent,
          minZoom: opts.minZoom,
          resolutions
        });
      } else {
        const vectorOpts = opts as MBTilesVectorOptions;
        // Alas VectorTileSource in OpenLayers does not support
        // constraining the extent while keeping the origin
        vectorOpts.extent = projExtent;
      }
      opts.pool = pool;
      opts.url = opt.url;

      return opts;
    })
    .catch((e) =>
      pool.then((p) => p.close()).then(() => Promise.reject(e))
    );
}
