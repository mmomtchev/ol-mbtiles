import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM';
import View from 'ol/View.js';
import ImageTileLayer from 'ol/layer/Tile';
import TileDebug from 'ol/source/TileDebug';
import { fromLonLat, get as getProjection } from 'ol/proj';
import { getWidth } from 'ol/extent';

import { MBTilesRasterSource } from 'ol-mbtiles';
import TileGrid from 'ol/tilegrid/TileGrid';

const projExtent = getProjection('EPSG:3857').getExtent();
const baseResolution = getWidth(projExtent) / 256;
function resolutions(maxZoom: number): number[] {
  const r = [ baseResolution ];
  for (let z = 1; z < maxZoom; z++)
    r.push(r[r.length - 1] / 2);
    console.log(r);
  return r;
}

// Raster MBTiles from
// https://www.data.gouv.fr/en/datasets/pyramide-de-tuiles-depuis-la-bd-ortho-r/
// 240MB original file

export default function () {
  return new Map({
    target: 'map',
    layers: [
      new TileLayer({
        zIndex: 20,
        source: new TileDebug()
      }),
      new TileLayer({
        zIndex: 0,
        source: new OSM(),
      }),
      new ImageTileLayer({
        zIndex: 10,
        opacity: 0.5,
        source: new MBTilesRasterSource({
          url: 'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles',
          attributions: [
            'Mapotempo',
            'BD Ortho 5m',
            'https://www.data.gouv.fr/en/datasets/pyramide-de-tuiles-depuis-la-bd-ortho-r/'
          ],
          tileGrid: new TileGrid({
            extent: projExtent,
            minZoom: 9,
            resolutions: resolutions(16)
          })
        }),
      })
    ],
    view: new View({
      center: fromLonLat([55.47437, -21.08468]),
      zoom: 9
    }),
  });
}