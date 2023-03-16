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
  return new Map({
    target: 'map',
    layers: [
      new TileLayer({
        zIndex: 20,
        source: new TileDebug()
      }),
      new TileLayer({
        zIndex: 10,
        opacity: 0.4,
        source: new OSM(),
      }),
      new ImageTileLayer({
        zIndex: 0,
        source: new MBTilesRasterSource(
          await importMBTiles({ url: 'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles' }),
        ),
      })
    ],
    view: new View({
      center: fromLonLat([55.47437, -21.08468]),
      zoom: 9
    }),
  });
}
