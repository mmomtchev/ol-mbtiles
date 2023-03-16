// WebWorker polyfill
import WebWorker from 'web-worker';
globalThis.Worker = class Worker extends WebWorker {
  constructor(specifier: string, options = {}) {
    super(specifier, { ...options, type: 'module' });
  }
} as typeof WebWorker;
