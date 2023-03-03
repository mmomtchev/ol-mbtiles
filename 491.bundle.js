"use strict";(self.webpackChunkol_mbtiles=self.webpackChunkol_mbtiles||[]).push([[491],{9491:(e,t,o)=>{o.r(t),o.d(t,{default:()=>d});var r=o(8854),n=o(2479),a=o(9090),s=o(9731),l=o(6263),i=o(8661),c=o(5901),u=o(5917);function d(){return new r.Z({target:"map",layers:[new n.Z({source:new l.Z}),new s.Z({source:new c.B({url:"https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles",layers:["transportation","water","waterway","landuse","place"],attributions:["MapTiler","OSM","https://data.maptiler.com/downloads/dataset/osm/europe/"],maxZoom:14,minZoom:0}),style:function(e){switch(e.get("layer")){case"water":case"waterway":return u.d_;case"transportation":return(0,u.xl)(e);case"landuse":return u.Xu;case"boundary":return u.oj;case"place":return(0,u.Hh)(e);default:return null}}})],view:new a.ZP({center:(0,i.mi)([12,50]),zoom:6})})}},5917:(e,t,o)=>{o.d(t,{Hh:()=>g,Xu:()=>w,d_:()=>m,kY:()=>c,oj:()=>h,xl:()=>f,y8:()=>i});var r=o(7539),n=o(283),a=o(1345),s=o(8958),l=o(1280);function i(e,t){let o,i;switch(e){case 0:o=6,i="2em";break;case 1:o=5,i="1.2em";break;case 2:o=3,i="0.8em";break;default:o=1,i="0.5em"}i+=" helvetica, sans-serif";const c="#00007f";return new r.ZP({image:new n.Z({fill:new a.Z({color:c}),radius:o,stroke:new s.Z({color:c,width:o})}),text:new l.Z({font:i,text:t.get("n"),fill:new a.Z({color:"#ffffff"}),stroke:new s.Z({color:c,width:2})})})}const c=new r.ZP({stroke:new s.Z({color:"blue",width:2})}),u={},d={motorway:"#776",trunk:"#ccb",highway:"#f39"},w=new r.ZP({fill:new a.Z({color:"#666"}),stroke:new s.Z({color:"#444",width:1})}),m=new r.ZP({fill:new a.Z({color:"#9db9e8"})}),h=new r.ZP({stroke:new s.Z({color:"#8B008B",width:2})}),f=function(e){const t=e.get("class"),o=e.get("railway"),n=e.get("sort_key"),a=t+"/"+o+"/"+n;let l=u[a];if(!l){let e,i;o?(e="#7de",i=1):(e=d[t],i="highway"==t?1.5:1),l=new r.ZP({stroke:new s.Z({color:e,width:i}),zIndex:n}),u[a]=l}return l},y=new r.ZP({image:new n.Z({radius:5,fill:new a.Z({color:"#000080"})})}),p=new s.Z({color:"white",width:2}),g=function(e){if("country"==e.get("class"))return null;if(e.get("name")){const t=y.clone();return t.setText(new l.Z({text:e.get("name"),offsetY:-5,font:"bold 16px sans-serif",stroke:p})),t}}},5901:(e,t,o)=>{o.d(t,{B:()=>y});var r=o(2891),n=o.n(r),a=o(7205),s=o(3614),l=o.n(s),i=o(8929),c=o(7885),u=o(9646),d=o(9619),w=o(3433),m=o(8661);class h extends u.ZP{constructor(e){var t,o,r;super(),e=e||{},this.dataProjection=new d.Z({code:"",units:"tile-pixels"}),this.featureClass_=e.featureClass?e.featureClass:w.ZP,this.geometryName_=null!==(t=e.geometryName)&&void 0!==t?t:"Geometry",this.layers_=null!==(o=e.layers)&&void 0!==o?o:null,this.idProperty_=e.idProperty,this.extent=null!==(r=e.extent)&&void 0!==r?r:4096,this.supportedMediaTypes=["application/vnd-mbtiles"]}readFeature(e,t){const o=e.properties;let r;this.idProperty_?(r=o[this.idProperty_],delete o[this.idProperty_]):r=e.id;const n=e.loadGeometry(),a=[],s=[],l=h.MBTypes[n.length>1?"multi":"mono"][e.type];if("Unknown"===l)return null;for(let e=0;e<n.length;e++)if(0!=n[e].length){for(let t=0;t<n[e].length;t++)a.push(n[e][t].x,n[e][t].y);s.push(a.length)}const i=new this.featureClass_(l,a,s,o,r);return i.transform(t.dataProjection),i}readFeatures(e,t){const o=this.layers_,r=[],n=new i.VectorTile(new(l())(c.ec(e)));t=this.adaptOptions(t);const a=(0,m.U2)(t.dataProjection);a.setWorldExtent(t.extent),a.setExtent([0,0,this.extent,this.extent]),t.dataProjection=a;for(const e of Object.keys(n.layers)){if(o&&!o.includes(e))continue;const a=n.layers[e];for(let o=0;o<a.length;o++){const n=a.feature(o),s=this.readFeature(n,t);s.getProperties().layer=e,r.push(s)}}return r}readProjection(){return this.dataProjection}}h.MBTypes={mono:["Unknown","Point","LineString","Polygon"],multi:["Unknown","MultiPoint","MultiLineString","Polygon"]};const f=null!==n()&&void 0!==n()?n():r;class y extends a.Z{constructor(e){var t,o;super(Object.assign(Object.assign({},e),{url:void 0,format:new h({layers:e.layers}),tileUrlFunction:e=>`${e[0]}:${e[1]}:${e[2]}`})),this.setTileLoadFunction(this.tileLoader.bind(this));const r={from:"inline",config:{serverMode:"full",requestChunkSize:1024,url:e.url}};this.worker=[];for(let n=0;n<(null!==(t=e.sqlWorkers)&&void 0!==t?t:4);n++)this.worker[n]=f.createDbWorker([r],y.workerUrl.toString(),y.wasmUrl.toString(),null!==(o=e.maxSingleTransfer)&&void 0!==o?o:10485760);this.currentWorker=0,this.metadata=this.worker[this.currentWorker++%this.worker.length].then((e=>e.db.query('SELECT name,value FROM metadata WHERE name="maxzoom" or name="minzoom"'))).then((t=>{if(t&&2==t.length){const o=t.reduce(((e,t)=>(e[t.name]=t.value,e)),{});return console.debug("Loaded metadata",o),e.maxZoom==o.maxzoom&&e.minZoom==o.minzoom||console.warn(`minZoom/maxZoom ${o.minzoom}/${o.maxzoom} of retrieved MBTiles do not match Openlayers configuration ${e.minZoom}/${e.maxZoom}`),o}throw new Error("Could not load metadata")})).catch((e=>(console.warn(e),null)))}tileLoader(e,t){console.debug("loading tile",[e.tileCoord[0],e.tileCoord[1],e.tileCoord[2]]),e.setLoader(((t,o,r)=>{this.worker[this.currentWorker++%this.worker.length].then((t=>t.db.query("SELECT tile_data FROM tiles WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?",[e.tileCoord[0],e.tileCoord[1],(1<<e.tileCoord[0])-1-e.tileCoord[2]]))).then((o=>{if(o&&o[0]&&o[0].tile_data){const n=e.getFormat().readFeatures(o[0].tile_data,{extent:t,featureProjection:r});return e.setFeatures(n),void e.onLoad(n,r)}throw new Error(`No data for ${e.tileCoord}`)})).catch((t=>{console.warn(t),e.onError()}))}))}destroy(){for(const e of this.worker)e.then((e=>{e.release()}))}}y.workerUrl=new URL(o(421),o.b),y.wasmUrl=new URL(o(3611),o.b)}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUlQLE1BQU0sZUFBZXBELEVBQUt3RCxZQUFZLElBRWpESCxPQUFPQyxJQUNOUCxRQUFRSSxLQUFLRyxHQUNidEQsRUFBS2dFLFNBQVMsR0FDZCxHQUVSLENBRUFDLFVBQ0UsSUFBSyxNQUFNbkMsS0FBVTlELEtBQUs4RCxPQUN4QkEsRUFBT1MsTUFBTUMsSUFDWEEsRUFBRTBCLFNBQVMsR0FHakIsRUFyR08sRUFBQWpDLFVBQVksSUFBSWtDLElBQ3JCLFlBR0ssRUFBQWhDLFFBQVUsSUFBSWdDLElBQ25CLFkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vbC1tYnRpbGVzLy4vZXhhbXBsZXMvY29kZS9vc20tdmVjdG9yLXRpbGVzLnRzIiwid2VicGFjazovL29sLW1idGlsZXMvLi9leGFtcGxlcy9zdHlsZS50cyIsIndlYnBhY2s6Ly9vbC1tYnRpbGVzLy4vc3JjL21idGlsZXMtZm9ybWF0LnRzIiwid2VicGFjazovL29sLW1idGlsZXMvLi9zcmMvbWJ0aWxlcy1zb3VyY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hcCBmcm9tICdvbC9NYXAuanMnO1xuaW1wb3J0IFRpbGVMYXllciBmcm9tICdvbC9sYXllci9UaWxlLmpzJztcbmltcG9ydCBWaWV3IGZyb20gJ29sL1ZpZXcuanMnO1xuaW1wb3J0IFZlY3RvclRpbGVMYXllciBmcm9tICdvbC9sYXllci9WZWN0b3JUaWxlJztcbmltcG9ydCBUaWxlRGVidWcgZnJvbSAnb2wvc291cmNlL1RpbGVEZWJ1Zyc7XG5pbXBvcnQgeyBmcm9tTG9uTGF0IH0gZnJvbSAnb2wvcHJvaic7XG5cbmltcG9ydCB7IE1CVGlsZXNTb3VyY2UgfSBmcm9tICdvbC1tYnRpbGVzJztcbmltcG9ydCB7IHdhdGVyU3R5bGUsIHJvYWRTdHlsZSwgYnVpbGRpbmdTdHlsZSwgYm91bmRhcnlTdHlsZSwgcGxhY2VTdHlsZSB9IGZyb20gJy4uL3N0eWxlJztcblxuLy8gTUJUaWxlcyBmcm9tXG4vLyBodHRwczovL2RhdGEubWFwdGlsZXIuY29tL2Rvd25sb2Fkcy9kYXRhc2V0L29zbS9ldXJvcGUvXG4vLyAzNC40IEdCIG9yaWdpbmFsIGZpbGVcbi8vIGRvd24gdG8gMTkuMkdCIGFmdGVyIHZhY3V1bSAoTWFwVGlsZXIsIHd0Zj8pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBNYXAoe1xuICAgIHRhcmdldDogJ21hcCcsXG4gICAgbGF5ZXJzOiBbXG4gICAgICBuZXcgVGlsZUxheWVyKHtcbiAgICAgICAgc291cmNlOiBuZXcgVGlsZURlYnVnKClcbiAgICAgIH0pLFxuICAgICAgbmV3IFZlY3RvclRpbGVMYXllcih7XG4gICAgICAgIHNvdXJjZTogbmV3IE1CVGlsZXNTb3VyY2Uoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vdmVsaXZvbGUuYi1jZG4ubmV0L21hcHRpbGVyLW9zbS0yMDE3LTA3LTAzLXYzLjYuMS1ldXJvcGUubWJ0aWxlcycsXG4gICAgICAgICAgbGF5ZXJzOiBbJ3RyYW5zcG9ydGF0aW9uJywgJ3dhdGVyJywgJ3dhdGVyd2F5JywgJ2xhbmR1c2UnLCdwbGFjZSddLFxuICAgICAgICAgIGF0dHJpYnV0aW9uczogWydNYXBUaWxlcicsICdPU00nLCAnaHR0cHM6Ly9kYXRhLm1hcHRpbGVyLmNvbS9kb3dubG9hZHMvZGF0YXNldC9vc20vZXVyb3BlLyddLFxuICAgICAgICAgIG1heFpvb206IDE0LFxuICAgICAgICAgIG1pblpvb206IDBcbiAgICAgICAgfSksXG4gICAgICAgIHN0eWxlOiBmdW5jdGlvbiAoZmVhdHVyZSkge1xuICAgICAgICAgIHN3aXRjaCAoZmVhdHVyZS5nZXQoJ2xheWVyJykpIHtcbiAgICAgICAgICAgIGNhc2UgJ3dhdGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ3dhdGVyd2F5JzpcbiAgICAgICAgICAgICAgcmV0dXJuIHdhdGVyU3R5bGU7XG4gICAgICAgICAgICBjYXNlICd0cmFuc3BvcnRhdGlvbic6XG4gICAgICAgICAgICAgIHJldHVybiByb2FkU3R5bGUoZmVhdHVyZSk7XG4gICAgICAgICAgICBjYXNlICdsYW5kdXNlJzpcbiAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkaW5nU3R5bGU7XG4gICAgICAgICAgICBjYXNlICdib3VuZGFyeSc6XG4gICAgICAgICAgICAgIHJldHVybiBib3VuZGFyeVN0eWxlO1xuICAgICAgICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiBwbGFjZVN0eWxlKGZlYXR1cmUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIF0sXG4gICAgdmlldzogbmV3IFZpZXcoe1xuICAgICAgY2VudGVyOiBmcm9tTG9uTGF0KFsxMiwgNTBdKSxcbiAgICAgIHpvb206IDZcbiAgICB9KSxcbiAgfSk7XG59IiwiaW1wb3J0IEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG5pbXBvcnQgeyBTdHlsZSwgVGV4dCwgRmlsbCwgU3Ryb2tlLCBDaXJjbGUgfSBmcm9tICdvbC9zdHlsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVRvd24oc2l6ZTogbnVtYmVyLCBmZWF0dXJlOiBGZWF0dXJlKTogU3R5bGUge1xuICBsZXQgd2lkdGg6IG51bWJlcjtcbiAgbGV0IGZvbnQ6IHN0cmluZztcbiAgc3dpdGNoIChzaXplKSB7XG4gICAgY2FzZSAwOlxuICAgICAgd2lkdGggPSA2O1xuICAgICAgZm9udCA9ICcyZW0nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgd2lkdGggPSA1O1xuICAgICAgZm9udCA9ICcxLjJlbSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICB3aWR0aCA9IDM7XG4gICAgICBmb250ID0gJzAuOGVtJztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB3aWR0aCA9IDE7XG4gICAgICBmb250ID0gJzAuNWVtJztcbiAgICAgIGJyZWFrO1xuICB9XG4gIGZvbnQgKz0gJyBoZWx2ZXRpY2EsIHNhbnMtc2VyaWYnO1xuICBjb25zdCBjb2xvcjEgPSAnIzAwMDA3Zic7XG4gIGNvbnN0IGNvbG9yMiA9ICcjZmZmZmZmJztcblxuICBjb25zdCBzdHlsZSA9IG5ldyBTdHlsZSh7XG4gICAgaW1hZ2U6IG5ldyBDaXJjbGUoe1xuICAgICAgZmlsbDogbmV3IEZpbGwoe1xuICAgICAgICBjb2xvcjogY29sb3IxLFxuICAgICAgfSksXG4gICAgICByYWRpdXM6IHdpZHRoLFxuICAgICAgc3Ryb2tlOiBuZXcgU3Ryb2tlKHtcbiAgICAgICAgY29sb3I6IGNvbG9yMSxcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgfSksXG4gICAgfSksXG4gICAgdGV4dDogbmV3IFRleHQoe1xuICAgICAgZm9udDogZm9udCxcbiAgICAgIHRleHQ6IGZlYXR1cmUuZ2V0KCduJyksXG4gICAgICBmaWxsOiBuZXcgRmlsbCh7XG4gICAgICAgIGNvbG9yOiBjb2xvcjJcbiAgICAgIH0pLFxuICAgICAgc3Ryb2tlOiBuZXcgU3Ryb2tlKHtcbiAgICAgICAgY29sb3I6IGNvbG9yMSxcbiAgICAgICAgd2lkdGg6IDJcbiAgICAgIH0pXG4gICAgfSlcbiAgfSk7XG4gIHJldHVybiBzdHlsZTtcbn1cblxuZXhwb3J0IGNvbnN0IHN0eWxlQm9yZGVyID0gbmV3IFN0eWxlKHtcbiAgc3Ryb2tlOiBuZXcgU3Ryb2tlKHtcbiAgICBjb2xvcjogJ2JsdWUnLFxuICAgIHdpZHRoOiAyXG4gIH0pXG59KTtcblxuXG4vLyBTdHlsZXMgaW5zcGlyZWQgZnJvbSBodHRwczovL29wZW5sYXllcnMub3JnL2VuL2xhdGVzdC9leGFtcGxlcy9vc20tdmVjdG9yLXRpbGVzLmh0bWxcbmNvbnN0IHJvYWRTdHlsZUNhY2hlID0ge307XG5jb25zdCByb2FkQ29sb3IgPSB7XG4gICdtb3RvcndheSc6ICcjNzc2JyxcbiAgJ3RydW5rJzogJyNjY2InLFxuICAnaGlnaHdheSc6ICcjZjM5Jyxcbn07XG5leHBvcnQgY29uc3QgYnVpbGRpbmdTdHlsZSA9IG5ldyBTdHlsZSh7XG4gIGZpbGw6IG5ldyBGaWxsKHtcbiAgICBjb2xvcjogJyM2NjYnXG4gIH0pLFxuICBzdHJva2U6IG5ldyBTdHJva2Uoe1xuICAgIGNvbG9yOiAnIzQ0NCcsXG4gICAgd2lkdGg6IDEsXG4gIH0pLFxufSk7XG5leHBvcnQgY29uc3Qgd2F0ZXJTdHlsZSA9IG5ldyBTdHlsZSh7XG4gIGZpbGw6IG5ldyBGaWxsKHtcbiAgICBjb2xvcjogJyM5ZGI5ZTgnLFxuICB9KSxcbn0pO1xuZXhwb3J0IGNvbnN0IGJvdW5kYXJ5U3R5bGUgPSBuZXcgU3R5bGUoe1xuICBzdHJva2U6IG5ldyBTdHJva2Uoe1xuICAgIGNvbG9yOiAnIzhCMDA4QicsXG4gICAgd2lkdGg6IDIsXG4gIH0pLFxufSk7XG5leHBvcnQgY29uc3Qgcm9hZFN0eWxlID0gZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgY29uc3Qga2luZCA9IGZlYXR1cmUuZ2V0KCdjbGFzcycpO1xuICBjb25zdCByYWlsd2F5ID0gZmVhdHVyZS5nZXQoJ3JhaWx3YXknKTtcbiAgY29uc3Qgc29ydF9rZXkgPSBmZWF0dXJlLmdldCgnc29ydF9rZXknKTtcbiAgY29uc3Qgc3R5bGVLZXkgPSBraW5kICsgJy8nICsgcmFpbHdheSArICcvJyArIHNvcnRfa2V5O1xuICBsZXQgc3R5bGUgPSByb2FkU3R5bGVDYWNoZVtzdHlsZUtleV07XG4gIGlmICghc3R5bGUpIHtcbiAgICBsZXQgY29sb3IsIHdpZHRoO1xuICAgIGlmIChyYWlsd2F5KSB7XG4gICAgICBjb2xvciA9ICcjN2RlJztcbiAgICAgIHdpZHRoID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sb3IgPSByb2FkQ29sb3Jba2luZF07XG4gICAgICB3aWR0aCA9IGtpbmQgPT0gJ2hpZ2h3YXknID8gMS41IDogMTtcbiAgICB9XG4gICAgc3R5bGUgPSBuZXcgU3R5bGUoe1xuICAgICAgc3Ryb2tlOiBuZXcgU3Ryb2tlKHtcbiAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICB9KSxcbiAgICAgIHpJbmRleDogc29ydF9rZXksXG4gICAgfSk7XG4gICAgcm9hZFN0eWxlQ2FjaGVbc3R5bGVLZXldID0gc3R5bGU7XG4gIH1cbiAgcmV0dXJuIHN0eWxlO1xufTtcbmNvbnN0IHBsYWNlQmFzZSA9IG5ldyBTdHlsZSh7XG4gIGltYWdlOiBuZXcgQ2lyY2xlKHtcbiAgICByYWRpdXM6IDUsXG4gICAgZmlsbDogbmV3IEZpbGwoe1xuICAgICAgY29sb3I6ICcjMDAwMDgwJ1xuICAgIH0pXG4gIH0pXG59KTtcbmNvbnN0IHRleHRTdHJva2UgPSBuZXcgU3Ryb2tlKHtcbiAgY29sb3I6ICd3aGl0ZScsXG4gIHdpZHRoOiAyXG59KTtcbmV4cG9ydCBjb25zdCBwbGFjZVN0eWxlID0gZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgaWYgKGZlYXR1cmUuZ2V0KCdjbGFzcycpID09ICdjb3VudHJ5JylcbiAgICByZXR1cm4gbnVsbDtcbiAgaWYgKGZlYXR1cmUuZ2V0KCduYW1lJykpIHtcbiAgICBjb25zdCBzdHlsZSA9IHBsYWNlQmFzZS5jbG9uZSgpO1xuICAgIHN0eWxlLnNldFRleHQobmV3IFRleHQoe1xuICAgICAgdGV4dDogZmVhdHVyZS5nZXQoJ25hbWUnKSxcbiAgICAgIG9mZnNldFk6IC01LFxuICAgICAgZm9udDogJ2JvbGQgMTZweCBzYW5zLXNlcmlmJyxcbiAgICAgIHN0cm9rZTogdGV4dFN0cm9rZVxuICAgIH0pKTtcbiAgICByZXR1cm4gc3R5bGU7XG4gIH1cbn07IiwiaW1wb3J0IFByb3RvYnVmIGZyb20gJ3BiZic7XG5pbXBvcnQgeyBWZWN0b3JUaWxlLCBWZWN0b3JUaWxlRmVhdHVyZSB9IGZyb20gJ0BtYXBib3gvdmVjdG9yLXRpbGUnO1xuaW1wb3J0ICogYXMgcGFrbyBmcm9tICdwYWtvJztcblxuaW1wb3J0IEZlYXR1cmVGb3JtYXQsIHsgUmVhZE9wdGlvbnMgfSBmcm9tICdvbC9mb3JtYXQvRmVhdHVyZS5qcyc7XG5pbXBvcnQgUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24uanMnO1xuaW1wb3J0IFJlbmRlckZlYXR1cmUgZnJvbSAnb2wvcmVuZGVyL0ZlYXR1cmUuanMnO1xuaW1wb3J0IHsgRmVhdHVyZUxpa2UgfSBmcm9tICdvbC9GZWF0dXJlLmpzJztcbmltcG9ydCB7IGdldCBhcyBnZXRQcm9qZWN0aW9uIH0gZnJvbSAnb2wvcHJvai5qcyc7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSAnb2wvZ2VvbS9HZW9tZXRyeSc7XG5cbmRlY2xhcmUgbW9kdWxlICdAbWFwYm94L3ZlY3Rvci10aWxlJyB7XG4gIGludGVyZmFjZSBWZWN0b3JUaWxlRmVhdHVyZSB7XG4gICAgdG9HZW9KU09OKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHByb2plY3Q/OiAoeHk6IFtudW1iZXIsIG51bWJlcl0pID0+IFtudW1iZXIsIG51bWJlcl0pOiBHZW9KU09OLkZlYXR1cmU7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgbGF5ZXJzPzogc3RyaW5nW107XG4gIGZlYXR1cmVDbGFzcz86IHR5cGVvZiBSZW5kZXJGZWF0dXJlO1xuICBnZW9tZXRyeU5hbWU/OiBzdHJpbmc7XG4gIGlkUHJvcGVydHk/OiBzdHJpbmc7XG4gIGV4dGVudD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIE1CVGlsZXNGb3JtYXQgZXh0ZW5kcyBGZWF0dXJlRm9ybWF0IHtcbiAgZGF0YVByb2plY3Rpb246IFByb2plY3Rpb247XG4gIHByaXZhdGUgZmVhdHVyZUNsYXNzXzogdHlwZW9mIFJlbmRlckZlYXR1cmU7XG4gIHByaXZhdGUgZ2VvbWV0cnlOYW1lXzogc3RyaW5nO1xuICBwcml2YXRlIGxheWVyc186IHN0cmluZ1tdIHwgbnVsbDtcbiAgcHJpdmF0ZSBpZFByb3BlcnR5Xzogc3RyaW5nO1xuICBzdXBwb3J0ZWRNZWRpYVR5cGVzOiBzdHJpbmdbXTtcbiAgZXh0ZW50OiBudW1iZXI7XG4gIHN0YXRpYyBNQlR5cGVzID0ge1xuICAgIG1vbm86IFsnVW5rbm93bicsICdQb2ludCcsICdMaW5lU3RyaW5nJywgJ1BvbHlnb24nIF0sXG4gICAgbXVsdGk6IFsnVW5rbm93bicsICdNdWx0aVBvaW50JywgJ011bHRpTGluZVN0cmluZycsICdQb2x5Z29uJ11cbiAgIH0gYXMgUmVjb3JkPCdtb25vJyB8ICdtdWx0aScsIChUeXBlIHwgJ1Vua25vd24nKVtdPjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyA/IG9wdGlvbnMgOiB7fTtcblxuICAgIHRoaXMuZGF0YVByb2plY3Rpb24gPSBuZXcgUHJvamVjdGlvbih7XG4gICAgICBjb2RlOiAnJyxcbiAgICAgIHVuaXRzOiAndGlsZS1waXhlbHMnLFxuICAgIH0pO1xuXG4gICAgdGhpcy5mZWF0dXJlQ2xhc3NfID0gb3B0aW9ucy5mZWF0dXJlQ2xhc3MgPyBvcHRpb25zLmZlYXR1cmVDbGFzcyA6IFJlbmRlckZlYXR1cmU7XG4gICAgdGhpcy5nZW9tZXRyeU5hbWVfID0gb3B0aW9ucy5nZW9tZXRyeU5hbWUgPz8gJ0dlb21ldHJ5JztcbiAgICB0aGlzLmxheWVyc18gPSBvcHRpb25zLmxheWVycyA/PyBudWxsO1xuICAgIHRoaXMuaWRQcm9wZXJ0eV8gPSBvcHRpb25zLmlkUHJvcGVydHk7XG4gICAgdGhpcy5leHRlbnQgPSBvcHRpb25zLmV4dGVudCA/PyA0MDk2O1xuXG4gICAgLyoqXG4gICAgICogQXMgdGhpcyBpcyB0aGUgdmVyeSBmaXJzdCB0aW1lIE1CVGlsZXMgd2lsbCBiZSBkaXN0cmlidXRlZCBieSBIVFRQXG4gICAgICogdGhlcmUgaXMgc3RpbGwgbm8gb2ZmaWNpYWwgTUlNRSB0eXBlXG4gICAgICovXG4gICAgdGhpcy5zdXBwb3J0ZWRNZWRpYVR5cGVzID0gW1xuICAgICAgJ2FwcGxpY2F0aW9uL3ZuZC1tYnRpbGVzJ1xuICAgIF07XG4gIH1cblxuICByZWFkRmVhdHVyZShzb3VyY2U6IFZlY3RvclRpbGVGZWF0dXJlLCBvcHRpb25zPzogUmVhZE9wdGlvbnMpOiBGZWF0dXJlTGlrZSB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHNvdXJjZS5wcm9wZXJ0aWVzO1xuXG4gICAgbGV0IGlkOiBzdHJpbmcgfCBudW1iZXI7XG4gICAgaWYgKCF0aGlzLmlkUHJvcGVydHlfKSB7XG4gICAgICBpZCA9IHNvdXJjZS5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgPSBwcm9wZXJ0aWVzW3RoaXMuaWRQcm9wZXJ0eV9dIGFzIHN0cmluZyB8IG51bWJlcjtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW3RoaXMuaWRQcm9wZXJ0eV9dO1xuICAgIH1cbiAgICBjb25zdCBwb2ludHMgPSBzb3VyY2UubG9hZEdlb21ldHJ5KCk7XG4gICAgY29uc3QgZmxhdENvb3JkaW5hdGVzID0gW10gYXMgbnVtYmVyW107XG4gICAgY29uc3QgZW5kcyA9IFtdIGFzIG51bWJlcltdO1xuXG4gICAgY29uc3QgdHlwZTogVHlwZSB8ICdVbmtub3duJyA9IE1CVGlsZXNGb3JtYXQuTUJUeXBlc1twb2ludHMubGVuZ3RoID4gMSA/ICdtdWx0aScgOiAnbW9ubyddW3NvdXJjZS50eXBlXTtcbiAgICBpZiAodHlwZSA9PT0gJ1Vua25vd24nKVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHBvaW50c1tpXS5sZW5ndGggPT0gMClcbiAgICAgICAgY29udGludWU7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBvaW50c1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICBmbGF0Q29vcmRpbmF0ZXMucHVzaChwb2ludHNbaV1bal0ueCwgcG9pbnRzW2ldW2pdLnkpO1xuICAgICAgfVxuICAgICAgZW5kcy5wdXNoKGZsYXRDb29yZGluYXRlcy5sZW5ndGgpO1xuICAgIH1cblxuICAgIGNvbnN0IGZlYXR1cmUgPSBuZXcgdGhpcy5mZWF0dXJlQ2xhc3NfKHR5cGUsIGZsYXRDb29yZGluYXRlcywgZW5kcywgcHJvcGVydGllcywgaWQpO1xuICAgIGZlYXR1cmUudHJhbnNmb3JtKG9wdGlvbnMuZGF0YVByb2plY3Rpb24pO1xuXG4gICAgcmV0dXJuIGZlYXR1cmU7XG4gIH1cblxuICByZWFkRmVhdHVyZXMoc291cmNlOiBBcnJheUJ1ZmZlciwgb3B0aW9ucz86IFJlYWRPcHRpb25zKTogRmVhdHVyZUxpa2VbXSB7XG4gICAgY29uc3QgbGF5ZXJzID0gdGhpcy5sYXllcnNfO1xuXG4gICAgY29uc3QgZmVhdHVyZXM6IEZlYXR1cmVMaWtlW10gPSBbXTtcbiAgICBjb25zdCB0aWxlID0gbmV3IFZlY3RvclRpbGUobmV3IFByb3RvYnVmKHBha28udW5nemlwKHNvdXJjZSkpKTtcbiAgICBvcHRpb25zID0gdGhpcy5hZGFwdE9wdGlvbnMob3B0aW9ucyk7XG4gICAgY29uc3QgZGF0YVByb2plY3Rpb24gPSBnZXRQcm9qZWN0aW9uKG9wdGlvbnMuZGF0YVByb2plY3Rpb24pO1xuICAgIGRhdGFQcm9qZWN0aW9uLnNldFdvcmxkRXh0ZW50KG9wdGlvbnMuZXh0ZW50KTtcbiAgICBkYXRhUHJvamVjdGlvbi5zZXRFeHRlbnQoWzAsIDAsIHRoaXMuZXh0ZW50LCB0aGlzLmV4dGVudF0pO1xuICAgIG9wdGlvbnMuZGF0YVByb2plY3Rpb24gPSBkYXRhUHJvamVjdGlvbjtcblxuICAgIGZvciAoY29uc3QgbGF5ZXJOYW1lIG9mIE9iamVjdC5rZXlzKHRpbGUubGF5ZXJzKSkge1xuICAgICAgaWYgKGxheWVycyAmJiAhbGF5ZXJzLmluY2x1ZGVzKGxheWVyTmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBsID0gdGlsZS5sYXllcnNbbGF5ZXJOYW1lXTtcbiAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGwubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICBjb25zdCB2ZWN0b3JGZWF0dXJlID0gbC5mZWF0dXJlKGlkeCk7XG4gICAgICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLnJlYWRGZWF0dXJlKHZlY3RvckZlYXR1cmUsIG9wdGlvbnMpO1xuICAgICAgICBmZWF0dXJlLmdldFByb3BlcnRpZXMoKS5sYXllciA9IGxheWVyTmFtZTtcbiAgICAgICAgZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmVhdHVyZXM7XG4gIH1cblxuICByZWFkUHJvamVjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhUHJvamVjdGlvbjtcbiAgfVxuXG59IiwiLy8gV2h5IGlzIHRoaXMgaG9ycm9yIG5lY2Vzc2FyeT9cbi8vIEJlY2F1c2Ugb2YgaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9janMtbW9kdWxlLWxleGVyL3B1bGwvMjRcbmltcG9ydCBzcWxodHRwRGVmYXVsdCBmcm9tICdzcWwuanMtaHR0cHZmcyc7XG5pbXBvcnQgKiBhcyBzcWxodHRwQWxsIGZyb20gJ3NxbC5qcy1odHRwdmZzJztcbmNvbnN0IHNxbGh0dHAgPSBzcWxodHRwRGVmYXVsdCA/PyBzcWxodHRwQWxsO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJIdHRwdmZzIH0gZnJvbSAnc3FsLmpzLWh0dHB2ZnMnO1xuaW1wb3J0IHsgU3BsaXRGaWxlQ29uZmlnUHVyZSB9IGZyb20gJ3NxbC5qcy1odHRwdmZzL2Rpc3Qvc3FsaXRlLndvcmtlcic7XG5cbmltcG9ydCBWZWN0b3JUaWxlU291cmNlLCB7IE9wdGlvbnMgYXMgVmVjdG9yVGlsZU9wdGlvbnMgfSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yVGlsZS5qcyc7XG5pbXBvcnQgVmVjdG9yVGlsZSBmcm9tICdvbC9WZWN0b3JUaWxlLmpzJztcbmltcG9ydCB7IFRpbGVDb29yZCB9IGZyb20gJ29sL3RpbGVjb29yZC5qcyc7XG5pbXBvcnQgRmVhdHVyZSBmcm9tICdvbC9GZWF0dXJlLmpzJztcbmltcG9ydCB7IEdlb21ldHJ5IH0gZnJvbSAnb2wvZ2VvbS5qcyc7XG5cbmltcG9ydCB7IE1CVGlsZXNGb3JtYXQgfSBmcm9tICcuL21idGlsZXMtZm9ybWF0JztcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIGV4dGVuZHMgVmVjdG9yVGlsZU9wdGlvbnMge1xuICAvKipcbiAgICogTnVtYmVyIG9mIHBhcmFsbGVsIHdvcmtlcnMgdG8gdXNlIGZvciByZXRyaWV2aW5nIHRpbGVzLCBAZGVmYXVsdCA0XG4gICAqL1xuICBzcWxXb3JrZXJzPzogbnVtYmVyO1xuICAvKipcbiAgICogTGlzdCBvZiBsYXllciBuYW1lcyB0byBzZWxlY3RpdmVseSBpbmNsdWRlLCBAZGVmYXVsdCBldmVyeXRoaW5nXG4gICAqL1xuICBsYXllcnM/OiBzdHJpbmdbXTtcbiAgLyoqXG4gICAqIE1heGltdW0gYW1vdW50IG9mIGJ5dGVzIHRvIHRyYW5zZmVyIGZvciBhIHNpbmdsZSB0aWxlLlxuICAgKiBUaGlzIGlzIGEgcHJvdGVjdGlvbiBhZ2FpbnN0IHJlcXVlc3RpbmcgZnJvbSBhIGRhdGFiYXNlIHdpdGhvdXQgaW5kZXguXG4gICAqIEBkZWZhdWx0IDEwNDg1NzYwXG4gICAqL1xuICBtYXhTaW5nbGVUcmFuc2Zlcj86IG51bWJlcjtcblxuICB0aWxlVXJsRnVuY3Rpb24/OiBuZXZlcjtcbiAgdGlsZUxvYWRGdW5jdGlvbj86IG5ldmVyO1xuICBmb3JtYXQ/OiBuZXZlcjtcbn1cblxuaW50ZXJmYWNlIE1ldGFkYXRhIHtcbiAgbWluem9vbTogbnVtYmVyO1xuICBtYXh6b29tOiBudW1iZXI7XG59XG5cbi8qKlxuICogQSB0aWxlIHNvdXJjZSBpbiBhIHJlbW90ZSAubWJ0aWxlcyBmaWxlIGFjY2Vzc2libGUgYnkgSFRUUFxuICovXG5leHBvcnQgY2xhc3MgTUJUaWxlc1NvdXJjZSBleHRlbmRzIFZlY3RvclRpbGVTb3VyY2Uge1xuICBwcml2YXRlIHdvcmtlcjogUHJvbWlzZTxXb3JrZXJIdHRwdmZzPltdO1xuICBwcml2YXRlIGN1cnJlbnRXb3JrZXI6IG51bWJlcjtcbiAgbWV0YWRhdGE6IFByb21pc2U8TWV0YWRhdGEgfCBudWxsPjtcbiAgc3RhdGljIHdvcmtlclVybCA9IG5ldyBVUkwoXG4gICAgJ3NxbC5qcy1odHRwdmZzL2Rpc3Qvc3FsaXRlLndvcmtlci5qcycsXG4gICAgaW1wb3J0Lm1ldGEudXJsLFxuICApO1xuICBzdGF0aWMgd2FzbVVybCA9IG5ldyBVUkwoXG4gICAgJ3NxbC5qcy1odHRwdmZzL2Rpc3Qvc3FsLXdhc20ud2FzbScsXG4gICAgaW1wb3J0Lm1ldGEudXJsLFxuICApOyBcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPcHRpb25zKSB7XG4gICAgc3VwZXIoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHVybDogdW5kZWZpbmVkLFxuICAgICAgZm9ybWF0OiBuZXcgTUJUaWxlc0Zvcm1hdCh7XG4gICAgICAgIGxheWVyczogb3B0aW9ucy5sYXllcnNcbiAgICAgIH0pLFxuICAgICAgLy8gVGhpcyBpcyByZXF1aXJlZCB0byBwcmV2ZW50IE9wZW5sYXllcnMnIGNhY2hlIGZyb20gdGhpbmtpbmcgdGhhdCBhbGwgdGlsZXMgc2hhcmUgdGhlIHNhbWUgVVJMXG4gICAgICB0aWxlVXJsRnVuY3Rpb246IChjb29yZHM6IFRpbGVDb29yZCkgPT4gYCR7Y29vcmRzWzBdfToke2Nvb3Jkc1sxXX06JHtjb29yZHNbMl19YFxuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRUaWxlTG9hZEZ1bmN0aW9uKHRoaXMudGlsZUxvYWRlci5iaW5kKHRoaXMpKTtcblxuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgIGZyb206ICdpbmxpbmUnLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIHNlcnZlck1vZGU6ICdmdWxsJyxcbiAgICAgICAgcmVxdWVzdENodW5rU2l6ZTogMTAyNCxcbiAgICAgICAgdXJsOiBvcHRpb25zLnVybFxuICAgICAgfVxuICAgIH0gYXMgU3BsaXRGaWxlQ29uZmlnUHVyZTtcblxuICAgIHRoaXMud29ya2VyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAob3B0aW9ucy5zcWxXb3JrZXJzID8/IDQpOyBpKyspIHtcbiAgICAgIHRoaXMud29ya2VyW2ldID0gc3FsaHR0cC5jcmVhdGVEYldvcmtlcihcbiAgICAgICAgW2NvbmZpZ10sXG4gICAgICAgIE1CVGlsZXNTb3VyY2Uud29ya2VyVXJsLnRvU3RyaW5nKCksXG4gICAgICAgIE1CVGlsZXNTb3VyY2Uud2FzbVVybC50b1N0cmluZygpLFxuICAgICAgICBvcHRpb25zLm1heFNpbmdsZVRyYW5zZmVyID8/IDEwMjQgKiAxMDI0ICogMTBcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFdvcmtlciA9IDA7XG5cbiAgICB0aGlzLm1ldGFkYXRhID0gdGhpcy53b3JrZXJbKHRoaXMuY3VycmVudFdvcmtlcisrKSAlIHRoaXMud29ya2VyLmxlbmd0aF1cbiAgICAgIC50aGVuKCh3KSA9PiB3LmRiLnF1ZXJ5KCdTRUxFQ1QgbmFtZSx2YWx1ZSBGUk9NIG1ldGFkYXRhIFdIRVJFIG5hbWU9XCJtYXh6b29tXCIgb3IgbmFtZT1cIm1pbnpvb21cIicpKVxuICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgLy8gQWxhcywgYXQgdGhlIG1vbWVudCBpdCBpcyBub3QgcG9zc2libGUgdG8gcmVwbGFjZSB0aGUgVGlsZUdyaWQgYWZ0ZXIgY29uc3RydWN0aW5nIHRoZSBsYXllclxuICAgICAgICBpZiAociAmJiByLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHIucmVkdWNlKChhLCB4KSA9PiB7XG4gICAgICAgICAgICBhW3hbJ25hbWUnXV0gPSB4Wyd2YWx1ZSddO1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgfSwge30pIGFzIFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gICAgICAgICAgY29uc29sZS5kZWJ1ZygnTG9hZGVkIG1ldGFkYXRhJywgZGF0YSk7XG4gICAgICAgICAgaWYgKG9wdGlvbnMubWF4Wm9vbSAhPSBkYXRhLm1heHpvb20gfHwgb3B0aW9ucy5taW5ab29tICE9IGRhdGEubWluem9vbSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBtaW5ab29tL21heFpvb20gJHtkYXRhLm1pbnpvb219LyR7ZGF0YS5tYXh6b29tfWAgK1xuICAgICAgICAgICAgICBgIG9mIHJldHJpZXZlZCBNQlRpbGVzIGRvIG5vdCBtYXRjaCBPcGVubGF5ZXJzIGNvbmZpZ3VyYXRpb24gJHtvcHRpb25zLm1pblpvb219LyR7b3B0aW9ucy5tYXhab29tfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGF0YSBhcyB1bmtub3duIGFzIE1ldGFkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgbWV0YWRhdGEnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdGlsZUxvYWRlcih0aWxlOiBWZWN0b3JUaWxlLCBfdXJsOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdsb2FkaW5nIHRpbGUnLCBbdGlsZS50aWxlQ29vcmRbMF0sIHRpbGUudGlsZUNvb3JkWzFdLCB0aWxlLnRpbGVDb29yZFsyXV0pO1xuICAgIHRpbGUuc2V0TG9hZGVyKChleHRlbnQsIHJlc29sdXRpb24sIHByb2plY3Rpb24pID0+IHtcbiAgICAgIHRoaXMud29ya2VyWyh0aGlzLmN1cnJlbnRXb3JrZXIrKykgJSB0aGlzLndvcmtlci5sZW5ndGhdXG4gICAgICAgIC50aGVuKCh3KSA9PlxuICAgICAgICAgIHcuZGIucXVlcnkoXG4gICAgICAgICAgICAnU0VMRUNUIHRpbGVfZGF0YSBGUk9NIHRpbGVzIFdIRVJFIHpvb21fbGV2ZWwgPSA/IEFORCB0aWxlX2NvbHVtbiA9ID8gQU5EIHRpbGVfcm93ID0gPycsXG4gICAgICAgICAgICBbdGlsZS50aWxlQ29vcmRbMF0sIHRpbGUudGlsZUNvb3JkWzFdLCAoMSA8PCB0aWxlLnRpbGVDb29yZFswXSkgLSAxIC0gdGlsZS50aWxlQ29vcmRbMl1dXG4gICAgICAgICAgKSlcbiAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICBpZiAociAmJiByWzBdICYmIHJbMF1bJ3RpbGVfZGF0YSddKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXQgPSB0aWxlLmdldEZvcm1hdCgpO1xuICAgICAgICAgICAgY29uc3QgZmVhdHVyZXMgPSBmb3JtYXQucmVhZEZlYXR1cmVzKHJbMF1bJ3RpbGVfZGF0YSddLCB7XG4gICAgICAgICAgICAgIGV4dGVudCxcbiAgICAgICAgICAgICAgZmVhdHVyZVByb2plY3Rpb246IHByb2plY3Rpb25cbiAgICAgICAgICAgIH0pIGFzIEZlYXR1cmU8R2VvbWV0cnk+W107XG4gICAgICAgICAgICB0aWxlLnNldEZlYXR1cmVzKGZlYXR1cmVzKTtcbiAgICAgICAgICAgIHRpbGUub25Mb2FkKGZlYXR1cmVzLCBwcm9qZWN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBkYXRhIGZvciAke3RpbGUudGlsZUNvb3JkfWApO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oZSk7XG4gICAgICAgICAgdGlsZS5vbkVycm9yKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBmb3IgKGNvbnN0IHdvcmtlciBvZiB0aGlzLndvcmtlcikge1xuICAgICAgd29ya2VyLnRoZW4oKHcpID0+IHtcbiAgICAgICAgdy5yZWxlYXNlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJ0YXJnZXQiLCJsYXllcnMiLCJzb3VyY2UiLCJ1cmwiLCJhdHRyaWJ1dGlvbnMiLCJtYXhab29tIiwibWluWm9vbSIsInN0eWxlIiwiZmVhdHVyZSIsImdldCIsInZpZXciLCJjZW50ZXIiLCJ6b29tIiwic3R5bGVUb3duIiwic2l6ZSIsIndpZHRoIiwiZm9udCIsImNvbG9yMSIsImltYWdlIiwiZmlsbCIsImNvbG9yIiwicmFkaXVzIiwic3Ryb2tlIiwidGV4dCIsInN0eWxlQm9yZGVyIiwicm9hZFN0eWxlQ2FjaGUiLCJyb2FkQ29sb3IiLCJidWlsZGluZ1N0eWxlIiwid2F0ZXJTdHlsZSIsImJvdW5kYXJ5U3R5bGUiLCJyb2FkU3R5bGUiLCJraW5kIiwicmFpbHdheSIsInNvcnRfa2V5Iiwic3R5bGVLZXkiLCJ6SW5kZXgiLCJwbGFjZUJhc2UiLCJ0ZXh0U3Ryb2tlIiwicGxhY2VTdHlsZSIsImNsb25lIiwic2V0VGV4dCIsIm9mZnNldFkiLCJNQlRpbGVzRm9ybWF0IiwiRmVhdHVyZSIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsInN1cGVyIiwidGhpcyIsImRhdGFQcm9qZWN0aW9uIiwiUHJvamVjdGlvbiIsImNvZGUiLCJ1bml0cyIsImZlYXR1cmVDbGFzc18iLCJmZWF0dXJlQ2xhc3MiLCJnZW9tZXRyeU5hbWVfIiwiZ2VvbWV0cnlOYW1lIiwibGF5ZXJzXyIsImlkUHJvcGVydHlfIiwiaWRQcm9wZXJ0eSIsImV4dGVudCIsInN1cHBvcnRlZE1lZGlhVHlwZXMiLCJyZWFkRmVhdHVyZSIsInByb3BlcnRpZXMiLCJpZCIsInBvaW50cyIsImxvYWRHZW9tZXRyeSIsImZsYXRDb29yZGluYXRlcyIsImVuZHMiLCJ0eXBlIiwiTUJUeXBlcyIsImxlbmd0aCIsImkiLCJqIiwicHVzaCIsIngiLCJ5IiwidHJhbnNmb3JtIiwicmVhZEZlYXR1cmVzIiwiZmVhdHVyZXMiLCJ0aWxlIiwiVmVjdG9yVGlsZSIsImFkYXB0T3B0aW9ucyIsInNldFdvcmxkRXh0ZW50Iiwic2V0RXh0ZW50IiwibGF5ZXJOYW1lIiwiT2JqZWN0Iiwia2V5cyIsImluY2x1ZGVzIiwibCIsImlkeCIsInZlY3RvckZlYXR1cmUiLCJnZXRQcm9wZXJ0aWVzIiwibGF5ZXIiLCJyZWFkUHJvamVjdGlvbiIsIm1vbm8iLCJtdWx0aSIsInNxbGh0dHAiLCJNQlRpbGVzU291cmNlIiwidW5kZWZpbmVkIiwiZm9ybWF0IiwidGlsZVVybEZ1bmN0aW9uIiwiY29vcmRzIiwic2V0VGlsZUxvYWRGdW5jdGlvbiIsInRpbGVMb2FkZXIiLCJiaW5kIiwiY29uZmlnIiwiZnJvbSIsInNlcnZlck1vZGUiLCJyZXF1ZXN0Q2h1bmtTaXplIiwid29ya2VyIiwic3FsV29ya2VycyIsImNyZWF0ZURiV29ya2VyIiwid29ya2VyVXJsIiwidG9TdHJpbmciLCJ3YXNtVXJsIiwibWF4U2luZ2xlVHJhbnNmZXIiLCJjdXJyZW50V29ya2VyIiwibWV0YWRhdGEiLCJ0aGVuIiwidyIsImRiIiwicXVlcnkiLCJyIiwiZGF0YSIsInJlZHVjZSIsImEiLCJjb25zb2xlIiwiZGVidWciLCJtYXh6b29tIiwibWluem9vbSIsIndhcm4iLCJFcnJvciIsImNhdGNoIiwiZSIsIl91cmwiLCJ0aWxlQ29vcmQiLCJzZXRMb2FkZXIiLCJyZXNvbHV0aW9uIiwicHJvamVjdGlvbiIsImdldEZvcm1hdCIsImZlYXR1cmVQcm9qZWN0aW9uIiwic2V0RmVhdHVyZXMiLCJvbkxvYWQiLCJvbkVycm9yIiwiZGVzdHJveSIsInJlbGVhc2UiLCJVUkwiXSwic291cmNlUm9vdCI6IiJ9