import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import ImageTileLayer from 'ol/layer/Tile';
import TileDebug from 'ol/source/TileDebug';
import { fromLonLat } from 'ol/proj';

import { MBTilesRasterSource } from 'ol-mbtiles';

// Raster MBTiles from
// https://www.data.gouv.fr/en/datasets/pyramide-de-tuiles-depuis-la-bd-ortho-r/
// 240MB original file

export default function () {
  return new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new TileDebug()
      }),
      new ImageTileLayer({
        source: new MBTilesRasterSource({
          url: 'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles',
          layers: ['transportation', 'water', 'waterway', 'landuse', 'place', 'boundary'],
          attributions: [
            'Mapotempo',
            'BD Ortho 5m',
            'https://www.data.gouv.fr/en/datasets/pyramide-de-tuiles-depuis-la-bd-ortho-r/'
          ],
          maxZoom: 16,
          minZoom: 9
        }),
      })
    ],
    view: new View({
      center: fromLonLat([55.47437, -21.08468]),
      zoom: 9
    }),
  });
}