# ol-mbtiles

Openlayers plugin for rendering remote vector tile sets in `MBTiles` format

# Status

`HIGHLY EXPERIMENTAL` / `UNPUBLISHED`

**Bear in mind that this plugin does something that was never meant to be possible.**

It builds upon what started as a quick hack by @phiresky - namely using `HTTP` `RANGE` requests to implement a VFS-like interface to access remote SQLite databases using only the HTTP protocol. The bundle includes SQLite3 compiled to WebAssembly.

The current conclusion is that this can work rather well and has a bandwidth overhead of about 60% in its current form - that is it transfers 60% more data than it would have transferred if each tile was available as a separate file. Further improvements are possible by making sure that the indices are downloaded only once, by eventually reordering and merging requests and by optimizing the bundle size.

While this is not a perfect solution, it is still a potentially very useful tool that will open many new possibilities - including hosting on low-cost CDN providers.

**Currently there is only a vector tile driver, raster support is planned at a later stage**

# SQLite optimization

Don't forget to prepare your SQLite tables (otherwise it will still work, but much slower):

```
$ sqlite3 yourtiles.mbtiles
sqlite> pragma journal_mode = delete;
sqlite> pragma page_size = 1024;
sqlite> vacuum;
```

# Try the demo

* Checkout the code
* `npm install`
* `webpack serve --mode=development`
* Open `http://localhost:9000`
