import { createSQLiteHTTPPool, SQLiteHTTPPool } from 'sqlite-wasm-http';

import { ProjectionLike, get as getProjection } from 'ol/proj.js';
import { getWidth } from 'ol/extent.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';

export interface Metadata {
  pool: Promise<SQLiteHTTPPool>;
  url: string;
  minZoom?: number;
  maxZoom?: number;
  format?: string;
  resolutions?: number[];
  attritubtions: string;
  [key: string]: unknown;
}

export interface Options {
  url: string;
  /**
   * Number of parallel workers to use for retrieving tiles, @default 4
   */
  sqlWorkers?: number;

  /**
   * override metadata minZoom
   */
  minZoom?: number;

  /**
   * override metadata maxZoom
   */
  maxZoom?: number;

  maxSqlPageSize?: number;
  sqlCacheSize?: number;
  projection?: ProjectionLike;
}

const formats: Record<string, 'raster' | 'vector'> = {
  'jpg': 'raster',
  'png': 'raster',
  'webp': 'raster',
  'pbf': 'vector',
  'mvt': 'vector'
};

export function importMBTiles(opt: Options): Promise<Metadata | null> {
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
        }, {}) as Record<string, number>;
        console.debug('Loaded metadata', data);
        return {
          ...data,
          minZoom: data['minzoom'],
          maxZoom: data['maxzoom'],
          pool,
          url: opt.url
        } as Metadata;
      }
      throw new Error('Could not load metadata');
    })
    .then((md) => {
      if (!formats[md.format.toLowerCase()])
        console.warn('Unknown tile format', md.format.toLowerCase());
      if (formats[md.format.toLowerCase()] === 'raster') {
        // Sometimes, I wonder if Mapbox doesn't hold a patent or some
        // other kind of investment related to everyone using 3857
        const projection = opt.projection ?? 'EPSG:3857';
        const maxZoom = opt.maxZoom ?? md.maxZoom;
        const minZoom = opt.minZoom ?? md.minZoom;
        const attributions = md.attribution ?? md.description;
        const projExtent = getProjection(projection)?.getExtent?.();
        if (maxZoom === undefined || minZoom === undefined || projExtent === undefined)
          throw new Error('Cannot determine tilegrid, need minZoom, maxZoom and projection');
        const baseResolution = getWidth(projExtent) / 256;
        const resolutions = [baseResolution];
        for (let z = 1; z <= maxZoom; z++)
          resolutions.push(resolutions[resolutions.length - 1] / 2);
        md.minZoom = minZoom;
        md.maxZoom = maxZoom;
        md.resolutions = resolutions;
        md.projection = projection;
        md.attributions = attributions;
        md.tileGrid = new TileGrid({
          extent: projExtent,
          minZoom,
          resolutions: resolutions
        });
      }

      return md;
    })
    .catch(e => {
      console.warn(e);
      return null;
    });
}