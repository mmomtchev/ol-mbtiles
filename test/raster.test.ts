import { MBTilesRasterSource } from '../src/index.js';
import { Tile } from 'ol';

import chai from 'chai';
import spies from 'chai-spies';
import { TileCoord } from 'ol/tilecoord.js';
chai.use(spies);
const assert = chai.assert;

function setupMockSource(opt: {
  url: string,
  tileCoord: TileCoord,
  setState?: (state: number) => void,
  setImageSrc?: (url: string) => void,
  onLoadStart?: () => void,
  onLoadEnd?: () => void,
  onLoadError?: () => void;
}) {
  const source = new MBTilesRasterSource({ url: opt.url, sqlWorkers: 1, mime: 'image/jpeg' });
  const loadFn = source.getTileLoadFunction();
  const onLoadStart = chai.spy(opt.onLoadStart ?? (() => undefined));
  const onLoadEnd = chai.spy(opt.onLoadStart ?? (() => undefined));
  const onLoadError = chai.spy(opt.onLoadStart ?? (() => undefined));
  const setState = chai.spy((state: number) => {
    if (opt.setState)
      opt.setState(state);
    if (source)
      source.dispose();
  });
  const setImageSrc = chai.spy(opt.setImageSrc ?? (() => undefined));
  // These events do not work without a real Image polyfill
  source.on('tileloadstart', onLoadStart);
  source.on('tileloadend', onLoadEnd);
  source.on('tileloaderror', onLoadError);

  const tile = {
    tileCoord: opt.tileCoord,
    setState,
    getImage: () => ({
      set src(url: string) {
        setImageSrc(url);
        if (source)
          source.dispose();
      }
    }) as unknown as HTMLImageElement
  };

  return {
    source,
    tile,
    loadFn,
    setState,
    setImageSrc,
    onLoadEnd,
    onLoadStart,
    onLoadError
  };
}

describe('MBTilesRasterSource', () => {
  it('can shovel', (done) => {
    let source: MBTilesRasterSource | null = null;
    const tileCoord = [9, 334, 287];
    try {
      const mock = setupMockSource({
        url: 'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles',
        tileCoord,
        setState: () => done('Tile error'),
        setImageSrc: (url: string) => {
          assert.isString(url);
          assert.match(url, /^blob:nodedata:[a-z0-f-]+/);
          fetch(url)
            .then((r) => r.blob())
            .then((r) => {
              assert.strictEqual(r.type, 'image/jpeg');
              done();
            })
            .catch(done);
        },
        onLoadError: () => done('Tile error')
      });
      source = mock.source;

      mock.loadFn(mock.tile as unknown as Tile, '');
    } catch (e) {
      done(e);
      if (source)
        source.dispose();
    }
  });

  it('can not shovel', (done) => {
    let source: MBTilesRasterSource | null = null;
    const tileCoord = [8, 9, 3];
    try {
      const mock = setupMockSource({
        url: 'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles',
        tileCoord,
        setImageSrc: () => done('It was not supposed to shovel'),
        onLoadEnd: () => done('It was not supposed to shovel'),
        setState: () => done()
      });
      source = mock.source;

      mock.loadFn(mock.tile as unknown as Tile, '');
    } catch (e) {
      done(e);
      if (source)
        source.dispose();
    }
  });
});
