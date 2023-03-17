import { createSQLiteHTTPPool, SQLiteHTTPPool, VFSHTTP } from 'sqlite-wasm-http';

import { Options as ImageTileOptions } from 'ol/source/TileImage.js';
import { Options as VectorTileOptions } from 'ol/source/VectorTile.js';
import { get as getProjection, transformExtent } from 'ol/proj.js';
import { getWidth } from 'ol/extent.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import { debug } from './debug';

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
}

export type MBTilesOptions = MBTilesVectorOptions | MBTilesRasterOptions;

const formats: Record<string, 'raster' | 'vector'> = {
  'jpg': 'raster',
  'png': 'raster',
  'webp': 'raster',
  'pbf': 'vector',
  'mvt': 'vector'
};

export function httpPoolOptions(options?: SQLOptions) {
  return {
    workers: options?.sqlWorkers ?? 4,
    httpOptions: {
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
export function importMBTiles<T extends MBTilesOptions>(opt: SQLOptions & T): Promise<T> {
  const pool: Promise<SQLiteHTTPPool> = createSQLiteHTTPPool(httpPoolOptions(opt))
    .then((pool) => pool.open(opt.url).then(() => pool));

  return pool
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
      const opts: T = {...opt} as T;

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
      const bounds = md['bounds'];
      const extent = bounds ?
        transformExtent(bounds.split(',').map((r) => +r), 'EPSG:4326', opts.projection) :
        projExtent;

      if (formats[format] === 'raster') {
        if (opts.maxZoom === undefined || opts.minZoom === undefined || projExtent === undefined)
          throw new Error('Cannot determine tilegrid, need minZoom, maxZoom');
        const baseResolution = getWidth(projExtent) / 256;
        const resolutions = [baseResolution];
        for (let z = 1; z <= opts.maxZoom; z++)
          resolutions.push(resolutions[resolutions.length - 1] / 2);

        opts.tileGrid = new TileGrid({
          origin: [projExtent[0], projExtent[2]],
          extent,
          minZoom: opts.minZoom,
          resolutions
        });
      } else {
        const vectorOpts = opts as MBTilesVectorOptions;
        // Alas VectorTileSource in Openlayers does not support
        // constraining the extent while keeping the origin
        vectorOpts.extent = projExtent;
      }
      opts.pool = pool;
      opts.url = opt.url;

      return opts;
    });
}
