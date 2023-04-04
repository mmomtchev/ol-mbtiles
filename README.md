# ol-mbtiles

Openlayers plugin for rendering remote vector tile sets in `MBTiles` format over bare-bones HTTP

[![License: ISC](https://img.shields.io/github/license/mmomtchev/ol-mbtiles)](https://github.com/mmomtchev/ol-mbtiles/blob/main/LICENSE)
[![Node.js CI](https://github.com/mmomtchev/ol-mbtiles/actions/workflows/node.js.yml/badge.svg)](https://github.com/mmomtchev/ol-mbtiles/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/mmomtchev/ol-mbtiles/branch/main/graph/badge.svg?token=wgDFzZEJRx)](https://codecov.io/gh/mmomtchev/ol-mbtiles)

# Status

`EXPERIMENTAL`

This project is based upon the very recent SQLite WASM version and it is inspired by the prior work of [@phiresky](https://github.com/phiresky/sql.js-httpvfs).

Version 2.0 is based on my [`sqlite-wasm-http`](https://github.com/mmomtchev/sqlite-wasm-http). If you are interested in working with MBTiles in the browser without using Openlayers, you should probably start there.

The current version supports both raster and vector MBTiles with multiple parallel connections to the remote host. It requires [WebAssembly](https://caniuse.com/wasm) support in the browser which, as of March 2023, is available in 95.54% of the currently installed user base. If [`SharedArrayBuffer`](https://web.dev/coop-coep/) is auto-detected, it can support cache sharing between workers, allowing for a significant performance and efficiency boost.

Both raster and vector tilesets are supported.

# Quickstart

```
npm install ol-mbtiles
```

## Manual layer configuration (require prior knowledge of the metadata parameters):

```js
import Map from "ol/Map.js";
import View from "ol/View.js";
import VectorTileLayer from "ol/layer/VectorTile";
import { fromLonLat } from "ol/proj";
import { MBTilesVectorSource } from "ol-mbtiles";

const map = new Map({
  target: "map",
  layers: [
    new VectorTileLayer({
      source: new MBTilesVectorSource({
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

## Automatic discovery of all parameters (requires asynchronous code):

```js
import Map from "ol/Map.js";
import View from "ol/View.js";
import VectorTileLayer from "ol/layer/VectorTile";
import { fromLonLat } from "ol/proj";
import { importMBTiles, MBTilesVectorSource } from "ol-mbtiles";

const map = new Map({
  target: "map",
  layers: [
    new VectorTileLayer({
      source: new MBTilesVectorSource(await importMBTiles({
        url: "https://server/path/file.mbtiles",
        layers: ["transportation", "water", "waterway"]
      })),
    }),
  ],
  view: new View({
    center: fromLonLat([12, 50]),
    zoom: 6,
  }),
});
```

## Full API

[https://github.com/mmomtchev/ol-mbtiles/blob/main/docs/API.md](https://github.com/mmomtchev/ol-mbtiles/blob/main/docs/API.md)

# SQLite optimization

It is recommended to reduce the page size of your SQLite tables (otherwise it will still work, but it will be slower):

```
$ sqlite3 yourtiles.mbtiles
sqlite> pragma journal_mode = delete;
sqlite> pragma page_size = 1024;
sqlite> vacuum;
```

# Examples

You can check a Github-hosted live demo with examples: [https://mmomtchev.github.io/ol-mbtiles/#osm-vector-tiles](https://mmomtchev.github.io/ol-mbtiles/#osm-vector-tiles)
- this is the performance you should expect if you cannot set custom HTTP headers

You can also see it working in a COOP/COEP-enabled environment here: [https://ol-mbtiles.momtchev.com/#osm-vector-tiles](https://ol-mbtiles.momtchev.com/#osm-vector-tiles)
- this is the full performance

Or to run it locally in developer mode:

- Checkout the code
- `npm install`
- `npm run start`
- Open `http://localhost:9000`

# Bundling

Because it uses [`sqlite-wasm-http`](https://github.com/mmomtchev/sqlite-wasm-http), it requires very recent versions of all bundlers. Be sure to check `sqlite-wasm-http` page for more details if you have problems bundling.

# Performance

Generally, the cost of handling an `.mbtiles`-based source is higher than that of a static tree of `.mvt`/`.pbf` tiles on an equivalent hosting provider. However the difference has proven to be almost negligible and it can even be completely offset by hosting on cheaper/faster CDN providers because of the simplified deployment that `.mbtiles` offer - single large file vs millions or even billions of small files in a huge tree.

There are some caveats though:

- First and foremost, if your hosting provider allows setting of custom HTTP headers, enable COOP/COEP on all costs - you will get a very significant boost
- The first initialization requires the downloading of the 849KB SQLite3 `.wasm` binary and the 650KB SQLite3 JS glue code - subsequent visits of the same map will probably load these from the cache
- These can be brought down to 51KB for the JS bundle and 400KB for the `.wasm` binary - if compression on your web server is enabled for the `application/wasm` MIME-type - **which is not the case in the default configuration of nginx or Apache**
- Downloading of the very first tile requires the downloading of the SQLite3 headers and the index locations and it can also be somewhat slower
- Each remote `.mbtiles` source requires that each DB worker connected to it runs in a separate browser thread with a separate SQLite3 instance - one should try to find a compromise between the memory used by each worker and the overall tile downloading performance - especially if using a large number of `.mbtiles` sources - as the memory requirements can become prohibitive
- If continuously adding and removing layers, you should take care of properly disposing layers removed from the map as currently no JS engine can GC worker threads - they can only put them on hold without fully recovering the used memory which will remain committed until the browser tab is closed (or the user navigates away). The new ES12 `FinalizationRegistry` cannot solve this problem, as the number of threads will kill the JS engine much before the GC on the main thread has to start disposing objects.
- Proper code splitting is paramount for fast startup times - `sqlite-wasm-http` uses dynamic `import()` to force the bundler to keep certain chunks separate so that they can be loaded only once between the main thread and the workers. Be sure to check what is loaded by the browser - the only sizeable chunk should be the WASM - at 400Kb gzipped - and it should be loaded only once.
- Preloading can also have a huge impact on the initial startup time - without it the WASM blob won't be requested until the main bundle has finished loading. The examples [`webpack.config.js`](https://github.com/mmomtchev/ol-mbtiles/blob/main/webpack.config.cjs) should be your starting point when configuring your own bundling.

# Roadmap

* Add OGC GeoPackage support
