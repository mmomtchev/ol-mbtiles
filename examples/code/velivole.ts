import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import VectorTileLayer from 'ol/layer/VectorTile';
import TileDebug from 'ol/source/TileDebug';
import { fromLonLat } from 'ol/proj';

import { importMBTiles, MBTilesVectorSource } from 'ol-mbtiles';
import { styleTown } from '../style';

export default async function () {
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
        source: new MBTilesVectorSource(await importMBTiles({
          url: 'https://velivole.b-cdn.net/mbtiles/place/0.mbtiles',
        })),
        style: styleTown.bind(null, 0),
        renderBuffer: 1024,
        minZoom: 6
      }),
      new VectorTileLayer({
        source: new MBTilesVectorSource(await importMBTiles({
          url: 'https://velivole.b-cdn.net/mbtiles/place/1.mbtiles',
        })),
        style: styleTown.bind(null, 1),
        renderBuffer: 256,
        minZoom: 8
      }),
      new VectorTileLayer({
        source: new MBTilesVectorSource(await importMBTiles({
          url: 'https://velivole.b-cdn.net/mbtiles/place/2.mbtiles',
        })),
        style: styleTown.bind(null, 2),
        minZoom: 10
      }),
    ],
    view: new View({
      center: fromLonLat([6, 45]),
      zoom: 8
    }),
  });
}