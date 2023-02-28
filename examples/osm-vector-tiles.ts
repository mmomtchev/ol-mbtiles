import 'ol/ol.css';
import './style.css';

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import VectorTileLayer from 'ol/layer/VectorTile';
import TileDebug from 'ol/source/TileDebug';
import { fromLonLat } from 'ol/proj';

import { MBTilesSource } from 'ol-mbtiles';
import { waterStyle, roadStyle, buildingStyle } from './style';

// MBTiles from
// https://data.maptiler.com/downloads/dataset/osm/europe/
// 34.4 GB original file
// down to 19.2GB after vacuum (MapTiler, wtf?)

export default function () {
  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new TileDebug()
      }),
      new VectorTileLayer({
        source: new MBTilesSource({
          url: 'https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles',
          layers: ['transportation', 'water', 'waterway'],
          attributions: ['MapTiler', 'OSM', 'https://data.maptiler.com/downloads/dataset/osm/europe/'],
          maxZoom: 14,
          minZoom: 0
        }),
        style: function (feature, resolution) {
          switch (feature.get('layer')) {
            case 'water':
            case 'waterway':
              return waterStyle;
            case 'transportation':
              return roadStyle(feature);
            default:
              return null;
          }
        }
      })
    ],
    view: new View({
      center: fromLonLat([12, 50]),
      zoom: 6
    }),
  });
}