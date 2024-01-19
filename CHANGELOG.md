## 2.1.0

 - Support OpenLayers 8.2.0
 - Fix [#5](https://github.com/mmomtchev/ol-mbtiles/issues/5), do not leak a pool when opening an invalid url

### 2.0.2 2023-04-04

- Allow explicit selection of the SQLite HTTP backend
- Correct the TypeScript return type of `importMBTiles`

### 2.0.1 2023-04-03

- Upgrade to the latest [`sqlite-wasm-http`](https://github.com/mmomtchev/sqlite-wasm-http)
- Optimize the examples bundle size and significantly improve the initial loading times

# 2.0.0 2023-03-17

- Switch to my new [`sqlite-wasm-http`](https://github.com/mmomtchev/sqlite-wasm-http)
- Shared cache for all workers when COOP/COEP is enabled
- Reduced bundle size
- Support raster tilesets
- Support auto-discovery of source metadata

# 1.0.0 2023-03-02

- First release
