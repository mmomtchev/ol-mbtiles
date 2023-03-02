# ol-mbtiles

Openlayers plugin for rendering remote vector tile sets in `MBTiles` format

[![License: ISC](https://img.shields.io/github/license/mmomtchev/ol-mbtiles)](https://github.com/mmomtchev/ol-mbtiles/blob/main/LICENSE)
[![Node.js CI](https://github.com/mmomtchev/ol-mbtiles/actions/workflows/node.js.yml/badge.svg)](https://github.com/mmomtchev/ol-mbtiles/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/mmomtchev/ol-mbtiles/branch/main/graph/badge.svg?token=wgDFzZEJRx)](https://codecov.io/gh/mmomtchev/ol-mbtiles)

# Status

`EXPERIMENTAL`

This project started as a quick hack built upon another quick hack by [@phiresky](https://github.com/phiresky/sql.js-httpvfs) - namely using `HTTP` `RANGE` requests to implement a VFS-like interface to access remote SQLite databases using only the HTTP protocol. His bundle includes SQLite3 compiled to WebAssembly from the [sql.js](https://github.com/sql-js/sql.js/) project.

I deem the experiment an absolute success, proving that not only is this possible, but also that the efficiency loss is acceptable. In fact, when this is coupled with a high-speed CDN provider compared to a complex single application server, the loss could be completely offset by the lower latency of the CDN provider.

I will surely fix any glaring bugs in this version, but I do not intend to add any new features.

Since December 2022, there is a new SQLite WASM project that is backed by both the SQLite and the Chromium teams which will probably become the industry standard. I am currently working on a new VFS over HTTP driver for this version on which 2.0 will be based and it will include:

- Drop-in replacement for the current version
- Built-in support for multiple shared connections to the database with cache sharing
- MBTiles and GeoPackage support
- Vector and raster data

The current version has a number of difficult to solve shortcomings:

- When using multiple connections to the database the cache is only partially shared
- Bundling can sometimes be difficult since there is a worker with a WASM blob in it (but this is likely to affect the new project as well)

**Currently there is only a vector tile driver, there won't be raster support in 1.0**

# SQLite optimization

Don't forget to prepare your SQLite tables (otherwise it will still work, but much slower):

```
$ sqlite3 yourtiles.mbtiles
sqlite> pragma journal_mode = delete;
sqlite> pragma page_size = 1024;
sqlite> vacuum;
```

# Quickstart

```
npm install ol-mbtiles
```

```js
import Map from "ol/Map.js";
import View from "ol/View.js";
import VectorTileLayer from "ol/layer/VectorTile";
import { fromLonLat } from "ol/proj";
import { MBTilesSource } from "ol-mbtiles";

const map = new Map({
  target: "map",
  layers: [
    new VectorTileLayer({
      source: new MBTilesSource({
        url: "https://server/path/file.mbtiles",
        layers: ["transportation", "water", "waterway"],
        maxZoom: 12,
        minZoom: 0,
      }),
    }),
  ],
  view: new View({
    center: fromLonLat([12, 50]),
    zoom: 6,
  }),
});
```

Keep in mind that while webpack is capable of automatically discovering and bundling the worker and the `sql.js` WASM bundle, most other bundlers are not and will need manual configuration.

Here is a solution that works in Vite:

```js
import { MBTilesSource } from "ol-mbtiles";
import workerUrl from "sql.js-httpvfs/dist/sqlite.worker.js?url";
import wasmUrl from "sql.js-httpvfs/dist/sql-wasm.wasm?url";
MBTilesSource.workerUrl = workerUrl;
MBTilesSource.wasmUrl = wasmUrl;
```

# Examples

Check the demo for examples: https://mmomtchev.github.io/ol-mbtiles/

Or run it locally:

- Checkout the code
- `npm install`
- `npm run start`
- Open `http://localhost:9000`
