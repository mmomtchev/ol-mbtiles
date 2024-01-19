import { importMBTiles, MBTilesRasterOptions, MBTilesVectorOptions } from '../src/index.js';

import TileGrid from 'ol/tilegrid/TileGrid.js';

import { assert } from 'chai';

describe('importMBTiles', () => {
  it('can shovel raster data', (done) => {
    importMBTiles<MBTilesRasterOptions>({
      url: 'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles',
      sqlWorkers: 1
    })
      .then((md) => {
        try {
          assert.isNotNull(md);

          assert.strictEqual(md.maxZoom, 16);
          assert.strictEqual(md.minZoom, 9);
          assert.isString(md.attributions);
          assert.instanceOf(md.tileGrid, TileGrid);
          assert.lengthOf(md.tileGrid?.getResolutions() as number[], 17);
          assert.deepStrictEqual(md.tileGrid?.getResolutions() as number[],
            [
              156543.03392804097, 78271.51696402048,
              39135.75848201024, 19567.87924100512,
              9783.93962050256, 4891.96981025128,
              2445.98490512564, 1222.99245256282,
              611.49622628141, 305.748113140705,
              152.8740565703525, 76.43702828517625,
              38.21851414258813, 19.109257071294063,
              9.554628535647032, 4.777314267823516,
              2.388657133911758
            ]);
          assert.isString(md.url);
          assert.deepStrictEqual(md.tileGrid?.getExtent(), [
            6141145.607336855,
            -2443028.8860581857,
            6216858.872510456,
            -2366876.107971946
          ]);
          assert.deepStrictEqual(md.tileGrid?.getOrigin(0), [-20037508.342789244, 20037508.342789244]);

          done();
        } finally {
          md.pool?.then((p) => p.close());
        }
      })
      .catch((e) => {
        done(e);
      });
  });

  it('can shovel vector data', (done) => {
    importMBTiles<MBTilesVectorOptions>({
      url: 'https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles',
      layers: ['water'],
      sqlWorkers: 1
    })
      .then((md) => {
        try {
          assert.isNotNull(md);

          assert.strictEqual(md.maxZoom, 14);
          assert.strictEqual(md.minZoom, 0);
          assert.isString(md.attributions);
          assert.isString(md.url);
          assert.strictEqual(md.projection, 'EPSG:3857');
          assert.deepStrictEqual(md.extent, [
            -20037508.342789244,
            -20037508.342789244,
            20037508.342789244,
            20037508.342789244
          ]);
          assert.deepStrictEqual(md.layers, ['water']);

          done();
        } finally {
          md?.pool?.then((p) => p.close());
        }
      })
      .catch((e) => {
        done(e);
      });
  });

  it('doesn\'t break without a shovel', (done) => {
    importMBTiles<MBTilesVectorOptions>({
      url: 'http://black.hole',
      sqlWorkers: 1
    })
      .then(() => {
        done('entered the event horizon');
      })
      .catch((e) => {
        assert.match(e.result.message, /SQLITE_CANTOPEN/);
        done();
      })
      .catch(done);
  });
});
