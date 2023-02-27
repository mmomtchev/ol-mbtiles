import 'ol/ol.css';
import './style.css';

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import VectorTileLayer from 'ol/layer/VectorTile';
import { MBTilesSource } from '../src/mbtiles-source';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import { Style, Text, Fill, Stroke, Circle } from 'ol/style';

function style(size: number, feature: Feature): Style {
  let width: number;
  let font: string;
  switch(size) {
    case 0:
      width = 6;
      font = '2em';
      break;
    case 1:
      width = 5;
      font = '1.2em';
      break;
    case 2:
      width = 3;
      font = '0.8em';
      break;
    default:
      width = 1;
      font = '0.5em';
      break;
  }
  font += ' helvetica, sans-serif';
  const color1 = '#00007f';
  const color2 = '#ffffff';

  var style = new Style({
    image: new Circle({
      fill: new Fill({
        color: color1,
      }),
      radius: width,
      stroke: new Stroke({
        color: color1,
        width: width,
      }),
    }),
    text: new Text({
      font: font,
      text: feature.get('n'),
      fill: new Fill({
        color: color2
      }),
      stroke: new Stroke({
        color: color1,
        width: 2
      })
    })
  });
  return style;
}

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorTileLayer({
      source: new MBTilesSource({
        url: 'https://velivole.b-cdn.net/mbtiles/place/0.mbtiles'
      }),
      style: style.bind(null, 0),
      minZoom: 6
    }),
    new VectorTileLayer({
      source: new MBTilesSource({
        url: 'https://velivole.b-cdn.net/mbtiles/place/1.mbtiles'
      }),
      style: style.bind(null, 1),
      minZoom: 8
    }),
    new VectorTileLayer({
      source: new MBTilesSource({
        url: 'https://velivole.b-cdn.net/mbtiles/place/2.mbtiles'
      }),
      style: style.bind(null, 2),
      minZoom: 10
    }),
  ],
  view: new View({
    center: fromLonLat([6, 45]),
    zoom: 8
  }),
});

console.log('started');
