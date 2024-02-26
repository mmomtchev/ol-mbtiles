import { MBTilesFormat, MBTilesVectorSource } from '../src/index.js';
import { Feature, VectorTile } from 'ol';
import { get as getProjection, Projection } from 'ol/proj.js';
import TileState from 'ol/TileState.js';
import { FeatureLoader } from 'ol/featureloader.js';
import RenderFeature from 'ol/render/Feature.js';

import chai from 'chai';
import spies from 'chai-spies';
chai.use(spies);
const assert = chai.assert;
const expect = chai.expect;

describe('MBTilesVectorSource', () => {
  const tileCoord = [12, 2118, 1461];
  const extent = [684875.7734351791, 5733388.6176145, 694659.7130556817, 5743172.5572350025];
  const resolution = 19.109257071294063;
  const projection = 'EPSG:3857';

  it('should retrieve tiles', (done) => {
    const source = new MBTilesVectorSource({
      url: 'https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles',
      sqlWorkers: 1
    });
    const loadFn = source.getTileLoadFunction();
    const tile = new VectorTile(tileCoord, TileState.EMPTY, '', new MBTilesFormat(), loadFn);

    tile.setLoader = chai.spy((loader: FeatureLoader) => {
      expect(loader).is.a('function');

      tile.setFeatures = chai.spy((features: Feature[]) => {
        try {
          assert.lengthOf(features, 278);
          const rdb = features.find((f) =>
            f.getProperties()['name'] === 'Roc des Boeufs') as unknown as RenderFeature;
          assert.instanceOf(rdb, RenderFeature);
          assert.strictEqual(rdb?.getProperties()['ele'], 1774);
          assert.strictEqual(rdb?.getGeometry()?.getType(), 'Point');
          assert.deepEqual(rdb.getExtent(), [686421.23460082, 5741182.805842454, 686421.23460082, 5741182.805842454]);
        } catch (e) {
          source.dispose();
          done(e);
        }
      });

      tile.onError = chai.spy();
      tile.onLoad = chai.spy(() => {
        try {
          expect(tile.setFeatures).to.be.called.once;
          expect(tile.onLoad).to.be.called.once;
          expect(tile.onError).to.be.not.be.called;
          source.dispose();
          done();
          return;
        } catch (e) {
          source.dispose();
          done(e);
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      loader.call(source as any, extent, resolution, getProjection(projection) as Projection,
        () => undefined, () => undefined);
    });

    loadFn(tile, '');
    expect(tile.setLoader).to.be.called.once;
  });

  it('should filter by layer', (done) => {
    const layers = ['mountain_peak', 'transportation'];
    const source = new MBTilesVectorSource({
      url: 'https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles',
      layers,
      maxZoom: 14,
      minZoom: 0,
      sqlWorkers: 1
    });
    const loadFn = source.getTileLoadFunction();
    const tile = new VectorTile(tileCoord, TileState.EMPTY, '', new MBTilesFormat({ layers }), loadFn);

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
          assert.strictEqual(rdb?.getProperties()['layer'], 'mountain_peak');
          assert.deepEqual(rdb.getExtent(), [686421.23460082, 5741182.805842454, 686421.23460082, 5741182.805842454]);
        } catch (e) {
          source.dispose();
          done(e);
        }
      });

      tile.onError = chai.spy();
      tile.onLoad = chai.spy(() => {
        try {
          expect(tile.setFeatures).to.be.called.once;
          expect(tile.onLoad).to.be.called.once;
          expect(tile.onError).to.be.not.be.called;
          source.dispose();
          done();
          return;
        } catch (e) {
          source.dispose();
          done(e);
        }
      });

      // TODO This is not needed anymore with recent OL versions
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      loader.call(source as any, extent, resolution, getProjection(projection) as Projection,
        () => undefined, () => undefined);
    });

    loadFn(tile, '');
    expect(tile.setLoader).to.be.called.once;
  });

  it('should report errors', (done) => {
    const layers = ['mountain_peak', 'transportation'];
    const source = new MBTilesVectorSource({
      url: 'https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles',
      layers,
      maxZoom: 14,
      minZoom: 0,
      sqlWorkers: 1
    });
    const loadFn = source.getTileLoadFunction();
    const tile = new VectorTile([1, 100, 100], TileState.EMPTY, '', new MBTilesFormat({ layers }), loadFn);

    tile.setLoader = chai.spy((loader: FeatureLoader) => {
      expect(loader).is.a('function');

      tile.setFeatures = chai.spy();
      tile.onLoad = chai.spy();
      tile.onError = chai.spy(() => {
        try {
          expect(tile.setFeatures).to.not.be.called;
          expect(tile.onLoad).to.be.not.be.called;
          expect(tile.onError).to.be.be.called.once;
          source.dispose();
          done();
          return;
        } catch (e) {
          source.dispose();
          done(e);
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      loader.call(source as any, extent, resolution, getProjection(projection) as Projection,
        () => undefined, () => undefined);
    });

    loadFn(tile, '');
    expect(tile.setLoader).to.be.called.once;
  });
});
