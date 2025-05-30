# 3.3.0 2025-02-03

 - Support OpenLayers 10.4
 
# 3.2.0 2024-12-17

 - Support OpenLayers 10.3

# 3.1.0 2024-09-23

 - Support OpenLayers 10.2

# 3.0.0 2024-07-27

 - Support OpenLayers 10
 - Drop all previous versions
 - Switch to using `RenderFeature` by default (full-fledged `Feature` is still available when explicitly configured)

## 2.4.0 2024-05-21

 - Support OpenLayers 9.2

## 2.3.0 2024-03-24

 - Support OpenLayers 9.1
 
## 2.2.0 2024-02-26

 - Support OpenLayers 9.0
 - Fix [#68](https://github.com/mmomtchev/ol-mbtiles/issues/68), create the tile image blob with a MIME type

## 2.1.0 2024-01-19

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
