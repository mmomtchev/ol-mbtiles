import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import VectorTileLayer from 'ol/layer/VectorTile';
import TileDebug from 'ol/source/TileDebug';
import { fromLonLat } from 'ol/proj';

import { MBTilesVectorSource } from 'ol-mbtiles';
import { styleBorder } from '../style';

// MBTiles from
// https://github.com/klokantech/vector-tiles-sample

export default function () {
  return new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new TileLayer({
        source: new TileDebug()
      }),
      new VectorTileLayer({
        source: new MBTilesVectorSource({
          url: 'https://velivole.b-cdn.net/mbtiles/countries.mbtiles',
          minZoom: 0,
          maxZoom: 6
        }),
        style: styleBorder
      })
    ],
    view: new View({
      center: fromLonLat([12, 50]),
      zoom: 6
    }),
  });
}