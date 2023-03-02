"use strict";(self.webpackChunkol_mbtiles=self.webpackChunkol_mbtiles||[]).push([[505],{6505:(n,s,a)=>{a.r(s),a.d(s,{default:()=>p});const p='<span class="token keyword">import</span> Map <span class="token keyword">from</span> <span class="token string">"ol/Map.js"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token constant">OSM</span> <span class="token keyword">from</span> <span class="token string">"ol/source/OSM.js"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> TileLayer <span class="token keyword">from</span> <span class="token string">"ol/layer/Tile.js"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> View <span class="token keyword">from</span> <span class="token string">"ol/View.js"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> VectorTileLayer <span class="token keyword">from</span> <span class="token string">"ol/layer/VectorTile"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> TileDebug <span class="token keyword">from</span> <span class="token string">"ol/source/TileDebug"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fromLonLat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/proj"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> MBTilesSource <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol-mbtiles"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> styleTown <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../style"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    target<span class="token operator">:</span> <span class="token string">"map"</span><span class="token punctuation">,</span>\n    layers<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token keyword">new</span> <span class="token class-name">TileLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        source<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">OSM</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token keyword">new</span> <span class="token class-name">TileLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        source<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">TileDebug</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token keyword">new</span> <span class="token class-name">VectorTileLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        source<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">MBTilesSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n          url<span class="token operator">:</span> <span class="token string">"https://velivole.b-cdn.net/mbtiles/place/0.mbtiles"</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        style<span class="token operator">:</span> <span class="token function">styleTown</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        renderBuffer<span class="token operator">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>\n        minZoom<span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token keyword">new</span> <span class="token class-name">VectorTileLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        source<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">MBTilesSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n          url<span class="token operator">:</span> <span class="token string">"https://velivole.b-cdn.net/mbtiles/place/1.mbtiles"</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        style<span class="token operator">:</span> <span class="token function">styleTown</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        renderBuffer<span class="token operator">:</span> <span class="token number">256</span><span class="token punctuation">,</span>\n        minZoom<span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token keyword">new</span> <span class="token class-name">VectorTileLayer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        source<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">MBTilesSource</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n          url<span class="token operator">:</span> <span class="token string">"https://velivole.b-cdn.net/mbtiles/place/2.mbtiles"</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        style<span class="token operator">:</span> <span class="token function">styleTown</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        minZoom<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    view<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">View</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      center<span class="token operator">:</span> <span class="token function">fromLonLat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      zoom<span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n'}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA1LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoicUlBR0EsUUFGVywybFMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vbC1tYnRpbGVzLy4vZXhhbXBsZXMvY29kZS92ZWxpdm9sZS50cz82ZDExIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE1vZHVsZVxudmFyIGNvZGUgPSBcIjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5pbXBvcnQ8L3NwYW4+IE1hcCA8c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+ZnJvbTwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIHN0cmluZ1xcXCI+XFxcIm9sL01hcC5qc1xcXCI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj47PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5pbXBvcnQ8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBjb25zdGFudFxcXCI+T1NNPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+ZnJvbTwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIHN0cmluZ1xcXCI+XFxcIm9sL3NvdXJjZS9PU00uanNcXFwiPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+Ozwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+aW1wb3J0PC9zcGFuPiBUaWxlTGF5ZXIgPHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPmZyb208L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBzdHJpbmdcXFwiPlxcXCJvbC9sYXllci9UaWxlLmpzXFxcIjwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPjs8L3NwYW4+XFxuPHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPmltcG9ydDwvc3Bhbj4gVmlldyA8c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+ZnJvbTwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIHN0cmluZ1xcXCI+XFxcIm9sL1ZpZXcuanNcXFwiPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+Ozwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+aW1wb3J0PC9zcGFuPiBWZWN0b3JUaWxlTGF5ZXIgPHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPmZyb208L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBzdHJpbmdcXFwiPlxcXCJvbC9sYXllci9WZWN0b3JUaWxlXFxcIjwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPjs8L3NwYW4+XFxuPHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPmltcG9ydDwvc3Bhbj4gVGlsZURlYnVnIDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5mcm9tPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gc3RyaW5nXFxcIj5cXFwib2wvc291cmNlL1RpbGVEZWJ1Z1xcXCI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj47PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5pbXBvcnQ8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+ezwvc3Bhbj4gZnJvbUxvbkxhdCA8c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPn08L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5mcm9tPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gc3RyaW5nXFxcIj5cXFwib2wvcHJvalxcXCI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj47PC9zcGFuPlxcblxcbjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5pbXBvcnQ8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+ezwvc3Bhbj4gTUJUaWxlc1NvdXJjZSA8c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPn08L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5mcm9tPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gc3RyaW5nXFxcIj5cXFwib2wtbWJ0aWxlc1xcXCI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj47PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5pbXBvcnQ8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+ezwvc3Bhbj4gc3R5bGVUb3duIDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+fTwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPmZyb208L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBzdHJpbmdcXFwiPlxcXCIuLi9zdHlsZVxcXCI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj47PC9zcGFuPlxcblxcbjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5leHBvcnQ8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5kZWZhdWx0PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+ZnVuY3Rpb248L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPik8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+ezwvc3Bhbj5cXG4gIDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5yZXR1cm48L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5uZXc8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBjbGFzcy1uYW1lXFxcIj5NYXA8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4oPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+ezwvc3Bhbj5cXG4gICAgdGFyZ2V0PHNwYW4gY2xhc3M9XFxcInRva2VuIG9wZXJhdG9yXFxcIj46PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gc3RyaW5nXFxcIj5cXFwibWFwXFxcIjwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgIGxheWVyczxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBvcGVyYXRvclxcXCI+Ojwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj5bPC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5uZXc8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBjbGFzcy1uYW1lXFxcIj5UaWxlTGF5ZXI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4oPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+ezwvc3Bhbj5cXG4gICAgICAgIHNvdXJjZTxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBvcGVyYXRvclxcXCI+Ojwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPm5ldzwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIGNsYXNzLW5hbWVcXFwiPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBjb25zdGFudFxcXCI+T1NNPC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4pPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPn08L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4pPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+bmV3PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gY2xhc3MtbmFtZVxcXCI+VGlsZUxheWVyPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPns8L3NwYW4+XFxuICAgICAgICBzb3VyY2U8c3BhbiBjbGFzcz1cXFwidG9rZW4gb3BlcmF0b3JcXFwiPjo8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5uZXc8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBjbGFzcy1uYW1lXFxcIj5UaWxlRGVidWc8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4oPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj59PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPm5ldzwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIGNsYXNzLW5hbWVcXFwiPlZlY3RvclRpbGVMYXllcjwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj57PC9zcGFuPlxcbiAgICAgICAgc291cmNlPHNwYW4gY2xhc3M9XFxcInRva2VuIG9wZXJhdG9yXFxcIj46PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+bmV3PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gY2xhc3MtbmFtZVxcXCI+TUJUaWxlc1NvdXJjZTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj57PC9zcGFuPlxcbiAgICAgICAgICB1cmw8c3BhbiBjbGFzcz1cXFwidG9rZW4gb3BlcmF0b3JcXFwiPjo8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBzdHJpbmdcXFwiPlxcXCJodHRwczovL3ZlbGl2b2xlLmItY2RuLm5ldC9tYnRpbGVzL3BsYWNlLzAubWJ0aWxlc1xcXCI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4sPC9zcGFuPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj59PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgICBzdHlsZTxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBvcGVyYXRvclxcXCI+Ojwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIGZ1bmN0aW9uXFxcIj5zdHlsZVRvd248L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4uPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBmdW5jdGlvblxcXCI+YmluZDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPm51bGw8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4sPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gbnVtYmVyXFxcIj4wPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgICByZW5kZXJCdWZmZXI8c3BhbiBjbGFzcz1cXFwidG9rZW4gb3BlcmF0b3JcXFwiPjo8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBudW1iZXJcXFwiPjEwMjQ8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4sPC9zcGFuPlxcbiAgICAgICAgbWluWm9vbTxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBvcGVyYXRvclxcXCI+Ojwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIG51bWJlclxcXCI+Njwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj59PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPm5ldzwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIGNsYXNzLW5hbWVcXFwiPlZlY3RvclRpbGVMYXllcjwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj57PC9zcGFuPlxcbiAgICAgICAgc291cmNlPHNwYW4gY2xhc3M9XFxcInRva2VuIG9wZXJhdG9yXFxcIj46PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+bmV3PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gY2xhc3MtbmFtZVxcXCI+TUJUaWxlc1NvdXJjZTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj57PC9zcGFuPlxcbiAgICAgICAgICB1cmw8c3BhbiBjbGFzcz1cXFwidG9rZW4gb3BlcmF0b3JcXFwiPjo8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBzdHJpbmdcXFwiPlxcXCJodHRwczovL3ZlbGl2b2xlLmItY2RuLm5ldC9tYnRpbGVzL3BsYWNlLzEubWJ0aWxlc1xcXCI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4sPC9zcGFuPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj59PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgICBzdHlsZTxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBvcGVyYXRvclxcXCI+Ojwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIGZ1bmN0aW9uXFxcIj5zdHlsZVRvd248L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4uPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBmdW5jdGlvblxcXCI+YmluZDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPm51bGw8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4sPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gbnVtYmVyXFxcIj4xPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgICByZW5kZXJCdWZmZXI8c3BhbiBjbGFzcz1cXFwidG9rZW4gb3BlcmF0b3JcXFwiPjo8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBudW1iZXJcXFwiPjI1Njwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgICBtaW5ab29tPHNwYW4gY2xhc3M9XFxcInRva2VuIG9wZXJhdG9yXFxcIj46PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gbnVtYmVyXFxcIj44PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPn08L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4pPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+bmV3PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gY2xhc3MtbmFtZVxcXCI+VmVjdG9yVGlsZUxheWVyPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPns8L3NwYW4+XFxuICAgICAgICBzb3VyY2U8c3BhbiBjbGFzcz1cXFwidG9rZW4gb3BlcmF0b3JcXFwiPjo8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBrZXl3b3JkXFxcIj5uZXc8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBjbGFzcy1uYW1lXFxcIj5NQlRpbGVzU291cmNlPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPns8L3NwYW4+XFxuICAgICAgICAgIHVybDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBvcGVyYXRvclxcXCI+Ojwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIHN0cmluZ1xcXCI+XFxcImh0dHBzOi8vdmVsaXZvbGUuYi1jZG4ubmV0L21idGlsZXMvcGxhY2UvMi5tYnRpbGVzXFxcIjwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPn08L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4pPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgICAgIHN0eWxlPHNwYW4gY2xhc3M9XFxcInRva2VuIG9wZXJhdG9yXFxcIj46PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gZnVuY3Rpb25cXFwiPnN0eWxlVG93bjwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPi48L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIGZ1bmN0aW9uXFxcIj5iaW5kPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4ga2V5d29yZFxcXCI+bnVsbDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBudW1iZXJcXFwiPjI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4pPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgICAgIG1pblpvb208c3BhbiBjbGFzcz1cXFwidG9rZW4gb3BlcmF0b3JcXFwiPjo8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBudW1iZXJcXFwiPjEwPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPn08L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4pPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj5dPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgdmlldzxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBvcGVyYXRvclxcXCI+Ojwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIGtleXdvcmRcXFwiPm5ldzwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcInRva2VuIGNsYXNzLW5hbWVcXFwiPlZpZXc8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4oPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+ezwvc3Bhbj5cXG4gICAgICBjZW50ZXI8c3BhbiBjbGFzcz1cXFwidG9rZW4gb3BlcmF0b3JcXFwiPjo8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBmdW5jdGlvblxcXCI+ZnJvbUxvbkxhdDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPig8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj5bPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBudW1iZXJcXFwiPjY8L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4sPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gbnVtYmVyXFxcIj40NTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPl08L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4pPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgICB6b29tPHNwYW4gY2xhc3M9XFxcInRva2VuIG9wZXJhdG9yXFxcIj46PC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwidG9rZW4gbnVtYmVyXFxcIj44PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+LDwvc3Bhbj5cXG4gICAgPHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj59PC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+KTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPiw8L3NwYW4+XFxuICA8c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPn08L3NwYW4+PHNwYW4gY2xhc3M9XFxcInRva2VuIHB1bmN0dWF0aW9uXFxcIj4pPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwdW5jdHVhdGlvblxcXCI+Ozwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwidG9rZW4gcHVuY3R1YXRpb25cXFwiPn08L3NwYW4+XFxuXCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==