import 'sql.js-httpvfs/dist/sqlite.worker.js';

// Binary version of the classic xmlhttprequest
import { XMLHttpRequest as _XMLHttpRequest } from './XMLHttpRequest.cjs';

// eslint-disable-next-line no-undef
globalThis.XMLHttpRequest = class XMLHttpRequest extends _XMLHttpRequest {
  get response() {
    const r =  Uint8Array.from(this.responseText.split('').map(x => x.charCodeAt())).buffer;
    return r;
  }
};
