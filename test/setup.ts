// Replace the worker URLs
globalThis.olMBTiles = {
  workerUrl: new URL('sqlworker.js', import.meta.url),
  wasmUrl: new URL('../node_modules/sql.js-httpvfs/dist/sql-wasm.wasm', import.meta.url)
};

// WebWorker polyfill
import WebWorker from 'web-worker';
globalThis.Worker = class Worker extends WebWorker {
  constructor(specifier, options = {}) {
    //specifier = specifier.replace('dist', 'node_modules');
    super(specifier, { type: 'module' });
  }
} as typeof WebWorker;
