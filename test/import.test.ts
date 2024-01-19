import { importMBTiles } from '../dist/index.js';

import { assert } from 'chai';

it('import from bundle', () => {
  assert.isFunction(importMBTiles);
});
