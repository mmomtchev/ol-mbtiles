import { MBTilesRasterSource } from '../dist/index.js';
import { Tile } from 'ol';

import { assert } from 'chai';

describe('MBTilesRasterSource', () => {
  it('can shovel', (done) => {
    let source: MBTilesRasterSource | null = null;
    const tileCoord = [9, 334, 287];
    try {
      source = new MBTilesRasterSource({
        url: 'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles',
        sqlWorkers: 1
      });
      const loadFn = source.getTileLoadFunction();
      const tile = {
        tileCoord,
        setState: () => {
          done('Tile error');
          if (source)
            source.dispose();
        },
        getImage: () => ({
          set src(url: string) {
            assert.isString(url);
            assert.match(url, /^blob:nodedata:[a-z0-f-]+/);
            done();
            if (source)
              source.dispose();
          }
        }) as unknown as HTMLImageElement
      };

      loadFn(tile as unknown as Tile, '');
    } catch (e) {
      done(e);
      console.log('out', source);
      if (source)
        source.dispose();
    }
  });

  it('can not shovel', (done) => {
    let source: MBTilesRasterSource | null = null;
    const tileCoord = [8, 9, 3];
    try {
      source = new MBTilesRasterSource({
        url: 'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles',
        sqlWorkers: 1
      });
      const loadFn = source.getTileLoadFunction();
      const tile = {
        tileCoord,
        setState: () => {
          done();
          if (source)
            source.dispose();
        },
        getImage: () => ({
          set src(url: string) {
            done('Shoveled when it was not supposed to');
            if (source)
              source.dispose();
          }
        }) as unknown as HTMLImageElement
      };

      loadFn(tile as unknown as Tile, '');
    } catch (e) {
      done(e);
      console.log('out', source);
      if (source)
        source.dispose();
    }
  });
});