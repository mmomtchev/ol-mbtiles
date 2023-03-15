import { SQLiteHTTPPool } from 'sqlite-wasm-http';

export interface Metadata {
  minzoom: number;
  maxzoom: number;
}

export function loadMBTilesMetadata(
  pool: Promise<SQLiteHTTPPool>,
  options: { minZoom?: number, maxZoom?: number; }
): Promise<Metadata | null> {
  return pool
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