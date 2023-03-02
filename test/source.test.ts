import { MBTilesFormat, MBTilesSource } from '../dist/index.js';
import { Feature, VectorTile } from 'ol';
import TileState from 'ol/TileState.js';
import { FeatureLoader } from 'ol/featureloader.js';
import RenderFeature from 'ol/render/Feature.js';

import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
const assert = chai.assert;
const expect = chai.expect;

describe('MBTilesSource', () => {
  it('should retrieve tiles', (done) => {
    const layers = ['mountain_peak', 'transportation'];
    const source = new MBTilesSource({
      url: 'https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles',
      layers,
      attributions: ['MapTiler', 'OSM', 'https://data.maptiler.com/downloads/dataset/osm/europe/'],
      maxZoom: 14,
      minZoom: 0,
      sqlWorkers: 1
    });
    const extent = [684875.7734351791, 5733388.6176145, 694659.7130556817, 5743172.5572350025];
    const resolution = 19.109257071294063;
    const projection = 'ESPG:3587';
    const loadFn = source.getTileLoadFunction();
    const tile = new VectorTile([12, 2118, 1461], TileState.EMPTY, '', new MBTilesFormat({ layers }), loadFn);

    tile.setLoader = chai.spy((loader: FeatureLoader) => {
      expect(loader).is.a('function');

      tile.setFeatures = chai.spy((features: Feature[]) => {
        try {
          assert.lengthOf(features, 71);
          const rdb = features.find((f) =>
            f.getProperties()['name'] === 'Roc des Boeufs') as unknown as RenderFeature;
          assert.instanceOf(rdb, RenderFeature);
          assert.strictEqual(rdb?.getProperties()['ele'], 1774);
          assert.strictEqual(rdb?.getGeometry()?.getType(), 'Point');
          console.log(rdb);
          assert.deepEqual(rdb.getExtent(), [686421.23460082, 5741182.805842454, 686421.23460082, 5741182.805842454]);
        } catch (e) {
          source.destroy();
          done(e);
        }
      });

      tile.onError = chai.spy();
      tile.onLoad = chai.spy(() => {
        try {
          expect(tile.setFeatures).to.be.called.once;
          expect(tile.onLoad).to.be.called.once;
          source.destroy();
          done();
          return;
        } catch (e) {
          source.destroy();
          done(e);
        }
      });

      loader!.call(source, extent, resolution, projection, [], () => undefined);
    });

    loadFn(tile, '');
    expect(tile.setLoader).to.be.called.once;
  });
});