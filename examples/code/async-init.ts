import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM';
import View from 'ol/View.js';
import ImageTileLayer from 'ol/layer/Tile';
import TileDebug from 'ol/source/TileDebug';
import { fromLonLat } from 'ol/proj';

import { importMBTiles, MBTilesRasterSource } from 'ol-mbtiles';

// Initialization can be automatic from the MBTiles metadata

export default async function () {
  const metadata = await importMBTiles({
    url: 'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles',
    projection: 'EPSG:3857'
  });

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
          ...metadata,
          attributions: [
            'IGN / Mapotempo',
            'BD Ortho 5m',
            'https://www.data.gouv.fr/en/datasets/pyramide-de-tuiles-depuis-la-bd-ortho-r/'
          ]
        }),
      })
    ],
    view: new View({
      center: fromLonLat([55.47437, -21.08468]),
      zoom: 9
    }),
  });
}
