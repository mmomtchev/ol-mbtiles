import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import VectorTileLayer from 'ol/layer/VectorTile';
import TileDebug from 'ol/source/TileDebug';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import { FeatureLike } from 'ol/Feature';

import { importMBTiles, MBTilesVectorSource } from 'ol-mbtiles';
import { waterStyle, roadStyle, buildingStyle, boundaryStyle, placeStyle } from '../style';

// MBTiles from
// https://data.maptiler.com/downloads/dataset/osm/europe/
// 34.4 GB original file
// down to 19.2GB after vacuum (MapTiler, wtf?)

export default async function () {
  return new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new TileDebug()
      }),
      new VectorTileLayer({
        source: new MBTilesVectorSource(await importMBTiles({
          url: 'https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles',
          layers: ['transportation', 'water', 'waterway', 'landuse', 'place', 'boundary'],
          // All properties from the MBTiles data can be overridden
          attributions: ['MapTiler', 'OSM', 'https://data.maptiler.com/downloads/dataset/osm/europe/'],
        })),
        style: function (feature: FeatureLike): Style {
          switch (feature.get('layer')) {
            case 'water':
            case 'waterway':
              return waterStyle;
            case 'transportation':
              return roadStyle(feature);
            case 'landuse':
              return buildingStyle;
            case 'boundary':
              return boundaryStyle;
            case 'place':
              return placeStyle(feature);
            default:
              return null as unknown as Style;
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