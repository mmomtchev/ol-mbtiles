import { createSQLiteHTTPPool, SQLiteHTTPPool } from 'sqlite-wasm-http';

import { Options as ImageTileOptions } from 'ol/source/TileImage.js';
import { Options as VectorTileOptions } from 'ol/source/VectorTile.js';
import { get as getProjection } from 'ol/proj.js';
import { getWidth } from 'ol/extent.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import { debug } from './debug';

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

export interface SQLOptions {
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

/**
 * Automatically import 
 * 
 * @param opt 
 * @returns 
 */
export function importMBTiles<T extends MBTilesOptions>(opt: SQLOptions & T): Promise < T | null > {
  const pool: Promise<SQLiteHTTPPool> = createSQLiteHTTPPool({
    workers: opt.sqlWorkers ?? 4,
  httpOptions: { maxPageSize: opt.maxSqlPageSize, cacheSize: opt.sqlCacheSize }
})
    .then((pool) => pool.open(opt.url).then(() => pool))
  .catch((e) => {
    console.error(e);
    return null;
  });

return pool
  .then((p) => p.exec('SELECT name,value FROM metadata'))
  .then((r) => {
    if (r && r.length) {
      // Transform an array of form [ ['name', 'value' ], ... ] to object
      const data = r.reduce((a, x) => {
        a[x.row[0] as string] = x.row[1];
        return a;
      }, {}) as Record<string, string | number>;
      debug('Loaded metadata', data);
      return data;
    }
    throw new Error('Could not load metadata');
  })
  .then((md: Record<string, unknown>) => {
    const opts: T = {} as T;

    const format = (md['format'] as string)?.toLowerCase?.();
    if (!formats[format])
      console.warn('Unknown tile format', format);

    // Sometimes, I wonder if Mapbox doesn't hold a patent or some
    // other kind of investment related to everyone using 3857
    opts.projection = opt.projection ?? 'EPSG:3857';
    opts.attributions = (md.attribution ?? md.description) as string;
    opts.maxZoom = opt.maxZoom ?? +md['maxzoom'] as number;
    opts.minZoom = opt.minZoom ?? +md['minzoom'] as number;
    const projExtent = getProjection(opts.projection)?.getExtent?.();
    if (formats[format] === 'raster') {
      if (opts.maxZoom === undefined || opts.minZoom === undefined)
        throw new Error('Cannot determine tilegrid, need minZoom, maxZoom');
      const baseResolution = getWidth(projExtent) / 256;
      const resolutions = [baseResolution];
      for (let z = 1; z <= opts.maxZoom; z++)
        resolutions.push(resolutions[resolutions.length - 1] / 2);
      opts.tileGrid = new TileGrid({
        extent: projExtent,
        minZoom: opts.minZoom,
        resolutions
      });
    }
    opts.pool = pool;
    opts.url = opt.url;

    return opts;
  })
  .catch(e => {
    console.warn(e);
    return null;
  });
}
