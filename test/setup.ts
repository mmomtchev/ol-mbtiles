import { MBTilesSource } from '../dist/index.js';

// Replace the worker URLs
MBTilesSource.workerUrl = new URL('sqlworker.js', import.meta.url);
MBTilesSource.wasmUrl = new URL('../node_modules/sql.js-httpvfs/dist/sql-wasm.wasm', import.meta.url);

// WebWorker polyfill
import WebWorker from 'web-worker';
globalThis.Worker = class Worker extends WebWorker {
  constructor(specifier, options = {}) {
    super(specifier, { type: 'module' });
  }
} as typeof WebWorker;
