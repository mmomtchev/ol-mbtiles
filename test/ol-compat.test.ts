import { _createOLRenderFeature } from '../dist/index.js';
import RenderFeature from 'ol/render/Feature.js';
import { VERSION } from 'ol/util.js';

import { assert } from 'chai';

describe(`OpenLayers ${VERSION} compatibility`, () => {
  it('supports creating RenderFeature', () => {
    const f = _createOLRenderFeature(RenderFeature, 'Point', [100, 100], [100, 100], { 'rare': 'property' }, 12);

    assert.instanceOf(f, RenderFeature);
    assert.sameDeepMembers(Object.keys(f.getProperties()), ['rare']);
    assert.strictEqual(f.getId(), 12);
  });
});
