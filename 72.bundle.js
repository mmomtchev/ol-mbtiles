"use strict";(self.webpackChunkol_mbtiles=self.webpackChunkol_mbtiles||[]).push([[72],{6072:(e,t,o)=>{o.r(t),o.d(t,{default:()=>m});var n=o(4316),r=o(2780),i=o(1765),l=o(957),s=o(9090),a=o(594),c=o(4509),d=o(16),u=function(e,t,o,n){return new(o||(o=Promise))((function(r,i){function l(e){try{a(n.next(e))}catch(e){i(e)}}function s(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(l,s)}a((n=n.apply(e,t||[])).next())}))};function m(){return u(this,void 0,void 0,(function*(){return new n.A({target:"map",layers:[new r.A({source:new s.A}),new l.A({source:new c.bX(yield(0,c.Cy)({url:"https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles",layers:["transportation","water","waterway","landuse","place","boundary"],attributions:["MapTiler","OSM","https://data.maptiler.com/downloads/dataset/osm/europe/"]})),style:function(e){switch(e.get("layer")){case"water":case"waterway":return d.Tl;case"transportation":return(0,d.OA)(e);case"landuse":return d.C5;case"boundary":return d.AD;case"place":return(0,d.HB)(e);default:return null}}})],view:new i.Ay({center:(0,a.Rb)([12,50]),zoom:6})})}))}},16:(e,t,o)=>{o.d(t,{AD:()=>w,C5:()=>m,CT:()=>a,HB:()=>y,OA:()=>p,Tl:()=>h,qk:()=>c});var n=o(9276),r=o(7733),i=o(3628),l=o(953),s=o(1426);function a(e,t){let o,a;switch(e){case 0:o=6,a="2em";break;case 1:o=5,a="1.2em";break;case 2:o=3,a="0.8em";break;default:o=1,a="0.5em"}a+=" helvetica, sans-serif";const c="#00007f";return new n.Ay({image:new r.A({fill:new i.A({color:c}),radius:o,stroke:new l.A({color:c,width:o})}),text:new s.A({font:a,text:t.get("n"),fill:new i.A({color:"#ffffff"}),stroke:new l.A({color:c,width:2})})})}const c=new n.Ay({stroke:new l.A({color:"blue",width:2})}),d={},u={motorway:"#776",trunk:"#ccb",highway:"#f39"},m=new n.Ay({fill:new i.A({color:"#666"}),stroke:new l.A({color:"#444",width:1})}),h=new n.Ay({fill:new i.A({color:"#9db9e8"})}),w=new n.Ay({stroke:new l.A({color:"#8B008B",width:2})}),p=function(e){const t=e.get("class"),o=e.get("railway"),r=e.get("sort_key"),i=t+"/"+o+"/"+r;let s=d[i];if(!s){let e,a;o?(e="#7de",a=1):(e=u[t],a="highway"==t?1.5:1),s=new n.Ay({stroke:new l.A({color:e,width:a}),zIndex:r}),d[i]=s}return s},f=new n.Ay({image:new r.A({radius:5,fill:new i.A({color:"#000080"})})}),v=new l.A({color:"white",width:2}),y=function(e){if("country"==e.get("class"))return null;if(e.get("name")){const t=f.clone();return t.setText(new s.A({text:e.get("name"),offsetY:-5,font:"bold 16px sans-serif",stroke:v})),t}return null}},4509:(e,t,o)=>{o.d(t,{Cy:()=>A,bX:()=>x,v0:()=>C});var n,r=o(7139),i=o(594),l=o(915),s=o(6758),a=o(1940),c=o(5335),d=o(4537),u=o(3075),m=o(8258),h=o(5286),w=o(4778),p=o(8512),f=o(1078);const v="undefined"!=typeof process&&void 0!==(null===(n=null===process||void 0===process?void 0:process.env)||void 0===n?void 0:n.OL_MBTILES_DEBUG)&&process.env.OL_MBTILES_DEBUG?console.debug.bind(console):()=>{},y={jpg:{type:"raster",mime:"image/jpeg"},png:{type:"raster",mime:"image/png"},webp:{type:"raster",mime:"image/webp"},pbf:{type:"vector"},mvt:{type:"vector"}};function g(e){var t,o,n;return{workers:null!==(t=null==e?void 0:e.sqlWorkers)&&void 0!==t?t:4,httpOptions:{backendType:null==e?void 0:e.backendType,maxPageSize:null!==(o=null==e?void 0:e.maxSqlPageSize)&&void 0!==o?o:4096,cacheSize:null!==(n=null==e?void 0:e.sqlCacheSize)&&void 0!==n?n:4096}}}function A(e){const t=(0,r.j8)(g(e));return t.then((t=>t.open(e.url).then((()=>t)))).then((e=>e.exec("SELECT name,value FROM metadata"))).then((e=>{if(e&&e.length){const t=e.reduce(((e,t)=>(e[t.row[0]]=t.row[1],e)),{});return v("Loaded metadata",t),t}throw new Error("Could not load metadata")})).then((o=>{var n,r,a,c,d,u,m,h,w;const p=Object.assign({},e),f=null===(r=null===(n=o.format)||void 0===n?void 0:n.toLowerCase)||void 0===r?void 0:r.call(n);y[f]||console.warn("Unknown tile format",f),p.projection=null!==(a=e.projection)&&void 0!==a?a:"EPSG:3857",p.attributions=null!==(c=o.attribution)&&void 0!==c?c:o.description,p.maxZoom=null!==(d=e.maxZoom)&&void 0!==d?d:+o.maxzoom,p.minZoom=null!==(u=e.minZoom)&&void 0!==u?u:+o.minzoom;const v=null===(h=null===(m=(0,i.Jt)(p.projection))||void 0===m?void 0:m.getExtent)||void 0===h?void 0:h.call(m),g=o.bounds,A=g?(0,i.DI)(g.split(",").map((e=>+e)),"EPSG:4326",p.projection):v;if("raster"===y[f].type){if(void 0===p.maxZoom||void 0===p.minZoom||void 0===v)throw new Error("Cannot determine tilegrid, need minZoom, maxZoom");const e=[(0,l.RG)(v)/256];for(let t=1;t<=p.maxZoom;t++)e.push(e[e.length-1]/2);const t=null!==(w=y[f].mime)&&void 0!==w?w:f;p.mime=t,p.tileGrid=new s.A({origin:[v[0],v[2]],extent:A,minZoom:p.minZoom,resolutions:e})}else p.extent=v;return p.pool=t,p.url=e.url,p})).catch((e=>t.then((e=>e.close())).then((()=>Promise.reject(e)))))}class b extends m.Ay{constructor(e){var t,o,n;super(),e=e||{},this.dataProjection=new h.A({code:"",units:"tile-pixels"}),this.featureClass_=e.featureClass?e.featureClass:w.Ay,this.geometryName_=null!==(t=e.geometryName)&&void 0!==t?t:"Geometry",this.layers_=null!==(o=e.layers)&&void 0!==o?o:null,this.idProperty_=e.idProperty,this.extent=null!==(n=e.extent)&&void 0!==n?n:4096,this.supportedMediaTypes=["application/vnd-mbtiles"]}readFeature(e,t){const o=e.properties;let n;this.idProperty_?(n=o[this.idProperty_],delete o[this.idProperty_]):n=e.id;const r=e.loadGeometry(),i=[],l=[],s=b.MBTypes[r.length>1?"multi":"mono"][e.type];if("Unknown"===s)return null;for(let e=0;e<r.length;e++)if(0!=r[e].length){for(let t=0;t<r[e].length;t++)i.push(r[e][t].x,r[e][t].y);l.push(i.length)}const a=new this.featureClass_(s,i,l,2,o,n);return(null==t?void 0:t.dataProjection)&&"transform"in a&&a.transform(null==t?void 0:t.dataProjection),a}readFeatures(e,t){const o=this.layers_,n=[],r=new d.VectorTile(new c(u.Ay.ungzip(e)));t=this.adaptOptions(t);const l=(0,i.Jt)(null==t?void 0:t.dataProjection),s=null==t?void 0:t.extent;if(!l||!t||!s)throw new Error("Cannot determine the projection/extent");l.setWorldExtent(s),l.setExtent([0,0,this.extent,this.extent]),t.dataProjection=l;for(const e of Object.keys(r.layers)){if(o&&!o.includes(e))continue;const i=r.layers[e];for(let o=0;o<i.length;o++){const r=i.feature(o),l=this.readFeature(r,t);l.getProperties().layer=e,n.push(l)}}return n}readProjection(){return this.dataProjection}}b.MBTypes={mono:["Unknown","Point","LineString","Polygon"],multi:["Unknown","MultiPoint","MultiLineString","Polygon"]};class x extends a.A{constructor(e){var t;if(void 0===e.url&&void 0===e.pool)throw new Error("Must specify url");super(Object.assign(Object.assign({},e),{url:void 0,format:new b({layers:e.layers}),tileUrlFunction:t=>`${e.url}#${t[0]}:${t[1]}:${t[2]}`})),this.setTileLoadFunction(this.tileLoader.bind(this)),this.pool=null!==(t=e.pool)&&void 0!==t?t:(0,r.j8)(g(e)).then((t=>t.open(e.url).then((()=>t))))}tileLoader(e,t){const o=e;v("loading tile",[o.tileCoord[0],o.tileCoord[1],o.tileCoord[2]]),o.setLoader(((e,t,n)=>{this.pool.then((e=>e.exec("SELECT tile_data FROM tiles WHERE zoom_level = $zoom AND tile_column = $col AND tile_row = $row",{$zoom:o.tileCoord[0],$col:o.tileCoord[1],$row:(1<<o.tileCoord[0])-1-o.tileCoord[2]}))).then((t=>{if(t&&t[0]&&t[0].row[0]){const r=o.getFormat().readFeatures(t[0].row[0],{extent:e,featureProjection:n});return o.setFeatures(r),void o.onLoad(r,n)}throw new Error(`No data for ${o.tileCoord}`)})).catch((e=>{v(e),o.onError()}))}))}disposeInternal(){return this.pool.then((e=>e.close()))}}class C extends p.A{constructor(e){var t;if(void 0===e.url&&void 0===e.pool)throw new Error("Must specify url");super(Object.assign(Object.assign({},e),{url:void 0,tileUrlFunction:t=>`${e.url}#${t[0]}:${t[1]}:${t[2]}`})),this.setTileLoadFunction(this.tileLoader.bind(this)),this.pool=null!==(t=e.pool)&&void 0!==t?t:(0,r.j8)(g(e)).then((t=>t.open(e.url).then((()=>t)))),this.mime=e.mime}tileLoader(e,t){v("loading tile",[e.tileCoord[0],e.tileCoord[1],e.tileCoord[2]]);const o=e.getImage();this.pool.then((t=>t.exec("SELECT tile_data FROM tiles WHERE zoom_level = $zoom AND tile_column = $col AND tile_row = $row",{$zoom:e.tileCoord[0],$col:e.tileCoord[1],$row:(1<<e.tileCoord[0])-1-e.tileCoord[2]}))).then((t=>{if(!(t&&t[0]&&t[0].row[0]instanceof Uint8Array))throw new Error(`No data for ${e.tileCoord}`);{const e=new Blob([t[0].row[0]],{type:this.mime}),n=URL.createObjectURL(e);o.src=n}})).catch((t=>{v(t),e.setState(f.A.ERROR)}))}disposeInternal(){return this.pool.then((e=>e.close()))}}}}]);
//# sourceMappingURL=72.bundle.js.map