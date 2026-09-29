import { importMBTiles } from 'ol-mbtiles';

import { assert } from 'chai';

it('import from bundle', () => {
  assert.isFunction(importMBTiles);
});
