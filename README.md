# ol-mbtiles

Openlayers plugin for rendering remote vector tile set in `MBTiles` format

# Status

`HIGHLY EXPERIMENTAL` / `UNPUBLISHED`

**Bear in mind that this plugin does something that was never meant to be possible.**

It builds upon what started as a quick hack by [@phiresky] - namely using `HTTP` `RANGE` requests to implement a VFS-like interface for access remote SQLite databases using only the HTTP protocol.

The current conclusion is that this can work rather well and has a bandwidth overhead of about 60% in its current form - that is it transfers 60% more data than it would have transferred if each tile was available as a separate file.

Still, it is a potentially very useful tool that will open many new possibilities.
