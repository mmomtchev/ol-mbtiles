# ol-mbtiles

Openlayers plugin for rendering remote vector tile sets in `MBTiles` format

[![License: ISC](https://img.shields.io/github/license/mmomtchev/ol-mbtiles)](https://github.com/mmomtchev/ol-mbtiles/blob/main/LICENSE)
[![Node.js CI](https://github.com/mmomtchev/ol-mbtiles/actions/workflows/node.js.yml/badge.svg)](https://github.com/mmomtchev/ol-mbtiles/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/mmomtchev/ol-mbtiles/branch/main/graph/badge.svg?token=wgDFzZEJRx)](https://codecov.io/gh/mmomtchev/ol-mbtiles)

# Status

`EXPERIMENTAL`

This project started as a quick hack built upon another quick hack by [@phiresky](https://github.com/phiresky/sql.js-httpvfs) - namely using `HTTP` `RANGE` requests to implement a VFS-like interface to access remote SQLite databases using only the HTTP protocol. His bundle includes SQLite3 compiled to WebAssembly from the [sql.js](https://github.com/sql-js/sql.js/) project.

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

# Performance

Generally, the cost of handling an `.mbtiles`-based source is higher than that of a static tree of `.mvt`/`.pbf` tiles on an equivalent hosting provider. However the difference has proven to be almost negligible and it can even be completely offset by hosting on cheaper/faster CDN providers because of the simplified deployment that `.mbtiles` offer - single large file vs millions or even billions of small files in a huge tree.

There are some caveats though:

- The first initialization requires the downloading of the 849KB SQLite3 `.wasm` binary and the 650KB SQLite3 JS glue code - subsequent visits of the same map will probably load these from the cache
- Downloading of the very first tile requires the downloading of the SQLite3 headers and the index locations and it can also be somewhat slower
- Each remote `.mbtiles` source requires that each DB worker connected to it runs in a separate browser thread with a separate SQLite3 instance - one should try to find a compromise between the memory used by each worker and the overall tile downloading performance - especially if using a large number of `.mbtiles` sources - as the memory requirements can become prohibitive
- If continuously adding and removing layers, you should take care of properly disposing layers removed from the map as currently no JS engine can GC worker threads - they can only put them on hold without fully recovering the used memory which will remain committed until the browser tab is closed (or the user navigates away). The new ES12 `FinalizerRegistry` cannot solve this problem, as the number of threads will kill the JS engine much before the GC on the main thread has to start disposing objects.

# Roadmap

The next version will use my brand new [`sqlite-wasm-http`](https://github.com/mmomtchev/sqlite-wasm-http) project that includes many improvements over the original HTTP VFS driver, including shared cache for concurrent DB connections.

I have planned:
- Drop-in replacement for the current version
- Built-in support for multiple shared connections to the database with cache sharing
- MBTiles and GeoPackage support
- Vector and raster data

The first preliminary results are very encouraging, with MBTiles over HTTP from CDN server loading faster than most commercial map services.

The loading of the very first frame is still somewhat slower - mostly due to the time needed to load the almost 1MB SQLite `.wasm` binary - but once this has been cached, subsequent visits of the same page start rendering much faster.

You can see a live demo of the upcoming release here: [https://ol-mbtiles.momtchev.com/#osm-vector-tiles](https://ol-mbtiles.momtchev.com/#osm-vector-tiles)
