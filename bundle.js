(()=>{var n,o,e={5916:(n,o,e)=>{var t={"./klokantech.ts":[5323,323],"./osm-vector-tiles.ts":[4598,598],"./reunion-raster.ts":[5939,939],"./sync-init.ts":[4877,877],"./velivole.ts":[6959,959]};function A(n){if(!e.o(t,n))return Promise.resolve().then((()=>{var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}));var o=t[n],A=o[0];return e.e(o[1]).then((()=>e(A)))}A.keys=()=>Object.keys(t),A.id=5916,n.exports=A},9497:(n,o,e)=>{var t={"./klokantech":[7829,152,957,832,829],"./klokantech.ts":[7829,152,957,832,829],"./osm-vector-tiles":[6072,152,957,72],"./osm-vector-tiles.ts":[6072,152,957,72],"./reunion-raster":[8317,152,832,317],"./reunion-raster.ts":[8317,152,832,317],"./sync-init":[3327,152,832,327],"./sync-init.ts":[3327,152,832,327],"./velivole":[1545,152,957,832,545],"./velivole.ts":[1545,152,957,832,545]};function A(n){if(!e.o(t,n))return Promise.resolve().then((()=>{var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}));var o=t[n],A=o[0];return Promise.all(o.slice(1).map(e.e)).then((()=>e(A)))}A.keys=()=>Object.keys(t),A.id=9497,n.exports=A},9417:(n,o,e)=>{"use strict";e.d(o,{A:()=>a});var t=e(1354),A=e.n(t),r=e(6314),l=e.n(r)()(A());l.push([n.id,"html, body {\n  margin: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n#map, #main {\n  height: 100vh;\n}\n\n#text {\n  overflow: auto;\n  margin-right: 1rem;\n  height: 99vh;\n}\n\n.menu {\n  width: 10rem;\n  height: 100vh;\n}\n\nsmall {\n  font-size: 0.7rem;\n}","",{version:3,sources:["webpack://./examples/style.css"],names:[],mappings:"AAAA;EACE,SAAS;EACT,WAAW;EACX,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,iBAAiB;AACnB",sourcesContent:["html, body {\n  margin: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n#map, #main {\n  height: 100vh;\n}\n\n#text {\n  overflow: auto;\n  margin-right: 1rem;\n  height: 99vh;\n}\n\n.menu {\n  width: 10rem;\n  height: 100vh;\n}\n\nsmall {\n  font-size: 0.7rem;\n}"],sourceRoot:""}]);const a=l},4096:(n,o,e)=>{"use strict";e.d(o,{A:()=>a});var t=e(1354),A=e.n(t),r=e(6314),l=e.n(r)()(A());l.push([n.id,':root,\n:host {\n  --ol-background-color: white;\n  --ol-accent-background-color: #F5F5F5;\n  --ol-subtle-background-color: rgba(128, 128, 128, 0.25);\n  --ol-partial-background-color: rgba(255, 255, 255, 0.75);\n  --ol-foreground-color: #333333;\n  --ol-subtle-foreground-color: #666666;\n  --ol-brand-color: #00AAFF;\n}\n\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.ol-scale-bar-inner {\n  display: flex;\n}\n\n.ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport,\n.ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ol-viewport canvas {\n  all: unset;\n  overflow: hidden;\n}\n\n.ol-viewport {\n  touch-action: pan-x pan-y;\n}\n\n.ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 1px .5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: " ";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution button {\n  flex-shrink: 0;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.ol-overviewmap-box {\n  border: 1.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n.ol-overviewmap .ol-viewport:hover {\n  cursor: pointer;\n}\n',"",{version:3,sources:["webpack://./node_modules/ol/ol.css"],names:[],mappings:"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",sourcesContent:[':root,\n:host {\n  --ol-background-color: white;\n  --ol-accent-background-color: #F5F5F5;\n  --ol-subtle-background-color: rgba(128, 128, 128, 0.25);\n  --ol-partial-background-color: rgba(255, 255, 255, 0.75);\n  --ol-foreground-color: #333333;\n  --ol-subtle-foreground-color: #666666;\n  --ol-brand-color: #00AAFF;\n}\n\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.ol-scale-bar-inner {\n  display: flex;\n}\n\n.ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport,\n.ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ol-viewport canvas {\n  all: unset;\n  overflow: hidden;\n}\n\n.ol-viewport {\n  touch-action: pan-x pan-y;\n}\n\n.ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 1px .5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: " ";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution button {\n  flex-shrink: 0;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.ol-overviewmap-box {\n  border: 1.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n.ol-overviewmap .ol-viewport:hover {\n  cursor: pointer;\n}\n'],sourceRoot:""}]);const a=l},4813:(n,o,e)=>{"use strict";e.d(o,{A:()=>a});var t=e(1354),A=e.n(t),r=e(6314),l=e.n(r)()(A());l.push([n.id,'pre[class*="language-"],\ncode[class*="language-"] {\n\tcolor: #d4d4d4;\n\tfont-size: 13px;\n\ttext-shadow: none;\n\tfont-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace;\n\tdirection: ltr;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tline-height: 1.5;\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*="language-"]::selection,\ncode[class*="language-"]::selection,\npre[class*="language-"] *::selection,\ncode[class*="language-"] *::selection {\n\ttext-shadow: none;\n\tbackground: #264F78;\n}\n\n@media print {\n\tpre[class*="language-"],\n\tcode[class*="language-"] {\n\t\ttext-shadow: none;\n\t}\n}\n\npre[class*="language-"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n\tbackground: #1e1e1e;\n}\n\n:not(pre) > code[class*="language-"] {\n\tpadding: .1em .3em;\n\tborder-radius: .3em;\n\tcolor: #db4c69;\n\tbackground: #1e1e1e;\n}\n/*********************************************************\n* Tokens\n*/\n.namespace {\n\topacity: .7;\n}\n\n.token.doctype .token.doctype-tag {\n\tcolor: #569CD6;\n}\n\n.token.doctype .token.name {\n\tcolor: #9cdcfe;\n}\n\n.token.comment,\n.token.prolog {\n\tcolor: #6a9955;\n}\n\n.token.punctuation,\n.language-html .language-css .token.punctuation,\n.language-html .language-javascript .token.punctuation {\n\tcolor: #d4d4d4;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.inserted,\n.token.unit {\n\tcolor: #b5cea8;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.deleted {\n\tcolor: #ce9178;\n}\n\n.language-css .token.string.url {\n\ttext-decoration: underline;\n}\n\n.token.operator,\n.token.entity {\n\tcolor: #d4d4d4;\n}\n\n.token.operator.arrow {\n\tcolor: #569CD6;\n}\n\n.token.atrule {\n\tcolor: #ce9178;\n}\n\n.token.atrule .token.rule {\n\tcolor: #c586c0;\n}\n\n.token.atrule .token.url {\n\tcolor: #9cdcfe;\n}\n\n.token.atrule .token.url .token.function {\n\tcolor: #dcdcaa;\n}\n\n.token.atrule .token.url .token.punctuation {\n\tcolor: #d4d4d4;\n}\n\n.token.keyword {\n\tcolor: #569CD6;\n}\n\n.token.keyword.module,\n.token.keyword.control-flow {\n\tcolor: #c586c0;\n}\n\n.token.function,\n.token.function .token.maybe-class-name {\n\tcolor: #dcdcaa;\n}\n\n.token.regex {\n\tcolor: #d16969;\n}\n\n.token.important {\n\tcolor: #569cd6;\n}\n\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.constant {\n\tcolor: #9cdcfe;\n}\n\n.token.class-name,\n.token.maybe-class-name {\n\tcolor: #4ec9b0;\n}\n\n.token.console {\n\tcolor: #9cdcfe;\n}\n\n.token.parameter {\n\tcolor: #9cdcfe;\n}\n\n.token.interpolation {\n\tcolor: #9cdcfe;\n}\n\n.token.punctuation.interpolation-punctuation {\n\tcolor: #569cd6;\n}\n\n.token.boolean {\n\tcolor: #569cd6;\n}\n\n.token.property,\n.token.variable,\n.token.imports .token.maybe-class-name,\n.token.exports .token.maybe-class-name {\n\tcolor: #9cdcfe;\n}\n\n.token.selector {\n\tcolor: #d7ba7d;\n}\n\n.token.escape {\n\tcolor: #d7ba7d;\n}\n\n.token.tag {\n\tcolor: #569cd6;\n}\n\n.token.tag .token.punctuation {\n\tcolor: #808080;\n}\n\n.token.cdata {\n\tcolor: #808080;\n}\n\n.token.attr-name {\n\tcolor: #9cdcfe;\n}\n\n.token.attr-value,\n.token.attr-value .token.punctuation {\n\tcolor: #ce9178;\n}\n\n.token.attr-value .token.punctuation.attr-equals {\n\tcolor: #d4d4d4;\n}\n\n.token.entity {\n\tcolor: #569cd6;\n}\n\n.token.namespace {\n\tcolor: #4ec9b0;\n}\n/*********************************************************\n* Language Specific\n*/\n\npre[class*="language-javascript"],\ncode[class*="language-javascript"],\npre[class*="language-jsx"],\ncode[class*="language-jsx"],\npre[class*="language-typescript"],\ncode[class*="language-typescript"],\npre[class*="language-tsx"],\ncode[class*="language-tsx"] {\n\tcolor: #9cdcfe;\n}\n\npre[class*="language-css"],\ncode[class*="language-css"] {\n\tcolor: #ce9178;\n}\n\npre[class*="language-html"],\ncode[class*="language-html"] {\n\tcolor: #d4d4d4;\n}\n\n.language-regex .token.anchor {\n\tcolor: #dcdcaa;\n}\n\n.language-html .token.punctuation {\n\tcolor: #808080;\n}\n/*********************************************************\n* Line highlighting\n*/\npre[class*="language-"] > code[class*="language-"] {\n\tposition: relative;\n\tz-index: 1;\n}\n\n.line-highlight.line-highlight {\n\tbackground: #f7ebc6;\n\tbox-shadow: inset 5px 0 0 #f7d87c;\n\tz-index: 0;\n}\n',"",{version:3,sources:["webpack://./node_modules/prism-themes/themes/prism-vsc-dark-plus.css"],names:[],mappings:"AAAA;;CAEC,cAAc;CACd,eAAe;CACf,iBAAiB;CACjB,4FAA4F;CAC5F,cAAc;CACd,gBAAgB;CAChB,gBAAgB;CAChB,oBAAoB;CACpB,kBAAkB;CAClB,gBAAgB;CAChB,gBAAgB;CAChB,cAAc;CACd,WAAW;CACX,qBAAqB;CACrB,kBAAkB;CAClB,iBAAiB;CACjB,aAAa;AACd;;AAEA;;;;CAIC,iBAAiB;CACjB,mBAAmB;AACpB;;AAEA;CACC;;EAEC,iBAAiB;CAClB;AACD;;AAEA;CACC,YAAY;CACZ,cAAc;CACd,cAAc;CACd,mBAAmB;AACpB;;AAEA;CACC,kBAAkB;CAClB,mBAAmB;CACnB,cAAc;CACd,mBAAmB;AACpB;AACA;;CAEC;AACD;CACC,WAAW;AACZ;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;;CAEC,cAAc;AACf;;AAEA;;;CAGC,cAAc;AACf;;AAEA;;;;;;;;CAQC,cAAc;AACf;;AAEA;;;;;;CAMC,cAAc;AACf;;AAEA;CACC,0BAA0B;AAC3B;;AAEA;;CAEC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;;CAEC,cAAc;AACf;;AAEA;;CAEC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,kBAAkB;AACnB;;AAEA;CACC,cAAc;AACf;;AAEA;;CAEC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;;;;CAIC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;;CAEC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;AACA;;CAEC;;AAED;;;;;;;;CAQC,cAAc;AACf;;AAEA;;CAEC,cAAc;AACf;;AAEA;;CAEC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,cAAc;AACf;AACA;;CAEC;AACD;CACC,kBAAkB;CAClB,UAAU;AACX;;AAEA;CACC,mBAAmB;CACnB,iCAAiC;CACjC,UAAU;AACX",sourcesContent:['pre[class*="language-"],\ncode[class*="language-"] {\n\tcolor: #d4d4d4;\n\tfont-size: 13px;\n\ttext-shadow: none;\n\tfont-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace;\n\tdirection: ltr;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tline-height: 1.5;\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*="language-"]::selection,\ncode[class*="language-"]::selection,\npre[class*="language-"] *::selection,\ncode[class*="language-"] *::selection {\n\ttext-shadow: none;\n\tbackground: #264F78;\n}\n\n@media print {\n\tpre[class*="language-"],\n\tcode[class*="language-"] {\n\t\ttext-shadow: none;\n\t}\n}\n\npre[class*="language-"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n\tbackground: #1e1e1e;\n}\n\n:not(pre) > code[class*="language-"] {\n\tpadding: .1em .3em;\n\tborder-radius: .3em;\n\tcolor: #db4c69;\n\tbackground: #1e1e1e;\n}\n/*********************************************************\n* Tokens\n*/\n.namespace {\n\topacity: .7;\n}\n\n.token.doctype .token.doctype-tag {\n\tcolor: #569CD6;\n}\n\n.token.doctype .token.name {\n\tcolor: #9cdcfe;\n}\n\n.token.comment,\n.token.prolog {\n\tcolor: #6a9955;\n}\n\n.token.punctuation,\n.language-html .language-css .token.punctuation,\n.language-html .language-javascript .token.punctuation {\n\tcolor: #d4d4d4;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.inserted,\n.token.unit {\n\tcolor: #b5cea8;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.deleted {\n\tcolor: #ce9178;\n}\n\n.language-css .token.string.url {\n\ttext-decoration: underline;\n}\n\n.token.operator,\n.token.entity {\n\tcolor: #d4d4d4;\n}\n\n.token.operator.arrow {\n\tcolor: #569CD6;\n}\n\n.token.atrule {\n\tcolor: #ce9178;\n}\n\n.token.atrule .token.rule {\n\tcolor: #c586c0;\n}\n\n.token.atrule .token.url {\n\tcolor: #9cdcfe;\n}\n\n.token.atrule .token.url .token.function {\n\tcolor: #dcdcaa;\n}\n\n.token.atrule .token.url .token.punctuation {\n\tcolor: #d4d4d4;\n}\n\n.token.keyword {\n\tcolor: #569CD6;\n}\n\n.token.keyword.module,\n.token.keyword.control-flow {\n\tcolor: #c586c0;\n}\n\n.token.function,\n.token.function .token.maybe-class-name {\n\tcolor: #dcdcaa;\n}\n\n.token.regex {\n\tcolor: #d16969;\n}\n\n.token.important {\n\tcolor: #569cd6;\n}\n\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.constant {\n\tcolor: #9cdcfe;\n}\n\n.token.class-name,\n.token.maybe-class-name {\n\tcolor: #4ec9b0;\n}\n\n.token.console {\n\tcolor: #9cdcfe;\n}\n\n.token.parameter {\n\tcolor: #9cdcfe;\n}\n\n.token.interpolation {\n\tcolor: #9cdcfe;\n}\n\n.token.punctuation.interpolation-punctuation {\n\tcolor: #569cd6;\n}\n\n.token.boolean {\n\tcolor: #569cd6;\n}\n\n.token.property,\n.token.variable,\n.token.imports .token.maybe-class-name,\n.token.exports .token.maybe-class-name {\n\tcolor: #9cdcfe;\n}\n\n.token.selector {\n\tcolor: #d7ba7d;\n}\n\n.token.escape {\n\tcolor: #d7ba7d;\n}\n\n.token.tag {\n\tcolor: #569cd6;\n}\n\n.token.tag .token.punctuation {\n\tcolor: #808080;\n}\n\n.token.cdata {\n\tcolor: #808080;\n}\n\n.token.attr-name {\n\tcolor: #9cdcfe;\n}\n\n.token.attr-value,\n.token.attr-value .token.punctuation {\n\tcolor: #ce9178;\n}\n\n.token.attr-value .token.punctuation.attr-equals {\n\tcolor: #d4d4d4;\n}\n\n.token.entity {\n\tcolor: #569cd6;\n}\n\n.token.namespace {\n\tcolor: #4ec9b0;\n}\n/*********************************************************\n* Language Specific\n*/\n\npre[class*="language-javascript"],\ncode[class*="language-javascript"],\npre[class*="language-jsx"],\ncode[class*="language-jsx"],\npre[class*="language-typescript"],\ncode[class*="language-typescript"],\npre[class*="language-tsx"],\ncode[class*="language-tsx"] {\n\tcolor: #9cdcfe;\n}\n\npre[class*="language-css"],\ncode[class*="language-css"] {\n\tcolor: #ce9178;\n}\n\npre[class*="language-html"],\ncode[class*="language-html"] {\n\tcolor: #d4d4d4;\n}\n\n.language-regex .token.anchor {\n\tcolor: #dcdcaa;\n}\n\n.language-html .token.punctuation {\n\tcolor: #808080;\n}\n/*********************************************************\n* Line highlighting\n*/\npre[class*="language-"] > code[class*="language-"] {\n\tposition: relative;\n\tz-index: 1;\n}\n\n.line-highlight.line-highlight {\n\tbackground: #f7ebc6;\n\tbox-shadow: inset 5px 0 0 #f7d87c;\n\tz-index: 0;\n}\n'],sourceRoot:""}]);const a=l},6314:n=>{"use strict";n.exports=function(n){var o=[];return o.toString=function(){return this.map((function(o){var e="",t=void 0!==o[5];return o[4]&&(e+="@supports (".concat(o[4],") {")),o[2]&&(e+="@media ".concat(o[2]," {")),t&&(e+="@layer".concat(o[5].length>0?" ".concat(o[5]):""," {")),e+=n(o),t&&(e+="}"),o[2]&&(e+="}"),o[4]&&(e+="}"),e})).join("")},o.i=function(n,e,t,A,r){"string"==typeof n&&(n=[[null,n,void 0]]);var l={};if(t)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(l[c]=!0)}for(var i=0;i<n.length;i++){var s=[].concat(n[i]);t&&l[s[0]]||(void 0!==r&&(void 0===s[5]||(s[1]="@layer".concat(s[5].length>0?" ".concat(s[5]):""," {").concat(s[1],"}")),s[5]=r),e&&(s[2]?(s[1]="@media ".concat(s[2]," {").concat(s[1],"}"),s[2]=e):s[2]=e),A&&(s[4]?(s[1]="@supports (".concat(s[4],") {").concat(s[1],"}"),s[4]=A):s[4]="".concat(A)),o.push(s))}},o}},1354:n=>{"use strict";n.exports=function(n){var o=n[1],e=n[3];if(!e)return o;if("function"==typeof btoa){var t=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),A="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t),r="/*# ".concat(A," */");return[o].concat([r]).join("\n")}return[o].join("\n")}},5072:n=>{"use strict";var o=[];function e(n){for(var e=-1,t=0;t<o.length;t++)if(o[t].identifier===n){e=t;break}return e}function t(n,t){for(var r={},l=[],a=0;a<n.length;a++){var c=n[a],i=t.base?c[0]+t.base:c[0],s=r[i]||0,u="".concat(i," ").concat(s);r[i]=s+1;var d=e(u),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==d)o[d].references++,o[d].updater(p);else{var C=A(p,t);t.byIndex=a,o.splice(a,0,{identifier:u,updater:C,references:1})}l.push(u)}return l}function A(n,o){var e=o.domAPI(o);return e.update(n),function(o){if(o){if(o.css===n.css&&o.media===n.media&&o.sourceMap===n.sourceMap&&o.supports===n.supports&&o.layer===n.layer)return;e.update(n=o)}else e.remove()}}n.exports=function(n,A){var r=t(n=n||[],A=A||{});return function(n){n=n||[];for(var l=0;l<r.length;l++){var a=e(r[l]);o[a].references--}for(var c=t(n,A),i=0;i<r.length;i++){var s=e(r[i]);0===o[s].references&&(o[s].updater(),o.splice(s,1))}r=c}}},7659:n=>{"use strict";var o={};n.exports=function(n,e){var t=function(n){if(void 0===o[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}o[n]=e}return o[n]}(n);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(e)}},540:n=>{"use strict";n.exports=function(n){var o=document.createElement("style");return n.setAttributes(o,n.attributes),n.insert(o,n.options),o}},5056:(n,o,e)=>{"use strict";n.exports=function(n){var o=e.nc;o&&n.setAttribute("nonce",o)}},7825:n=>{"use strict";n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var o=n.insertStyleElement(n);return{update:function(e){!function(n,o,e){var t="";e.supports&&(t+="@supports (".concat(e.supports,") {")),e.media&&(t+="@media ".concat(e.media," {"));var A=void 0!==e.layer;A&&(t+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),t+=e.css,A&&(t+="}"),e.media&&(t+="}"),e.supports&&(t+="}");var r=e.sourceMap;r&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),o.styleTagTransform(t,n,o.options)}(o,n,e)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(o)}}}},1113:n=>{"use strict";n.exports=function(n,o){if(o.styleSheet)o.styleSheet.cssText=n;else{for(;o.firstChild;)o.removeChild(o.firstChild);o.appendChild(document.createTextNode(n))}}}},t={};function A(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={id:n,exports:{}};return e[n](r,r.exports,A),r.exports}A.m=e,A.n=n=>{var o=n&&n.__esModule?()=>n.default:()=>n;return A.d(o,{a:o}),o},A.d=(n,o)=>{for(var e in o)A.o(o,e)&&!A.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:o[e]})},A.f={},A.e=n=>Promise.all(Object.keys(A.f).reduce(((o,e)=>(A.f[e](n,o),o)),[])),A.u=n=>n+".bundle.js",A.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),A.o=(n,o)=>Object.prototype.hasOwnProperty.call(n,o),n={},o="ol-mbtiles:",A.l=(e,t,r,l)=>{if(n[e])n[e].push(t);else{var a,c;if(void 0!==r)for(var i=document.getElementsByTagName("script"),s=0;s<i.length;s++){var u=i[s];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==o+r){a=u;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,A.nc&&a.setAttribute("nonce",A.nc),a.setAttribute("data-webpack",o+r),a.src=e),n[e]=[t];var d=(o,t)=>{a.onerror=a.onload=null,clearTimeout(p);var A=n[e];if(delete n[e],a.parentNode&&a.parentNode.removeChild(a),A&&A.forEach((n=>n(t))),o)return o(t)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}},A.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},(()=>{var n;A.g.importScripts&&(n=A.g.location+"");var o=A.g.document;if(!n&&o&&(o.currentScript&&"SCRIPT"===o.currentScript.tagName.toUpperCase()&&(n=o.currentScript.src),!n)){var e=o.getElementsByTagName("script");if(e.length)for(var t=e.length-1;t>-1&&(!n||!/^http(s?):/.test(n));)n=e[t--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),A.p=n})(),(()=>{A.b=document.baseURI||self.location.href;var n={792:0};A.f.j=(o,e)=>{var t=A.o(n,o)?n[o]:void 0;if(0!==t)if(t)e.push(t[2]);else{var r=new Promise(((e,A)=>t=n[o]=[e,A]));e.push(t[2]=r);var l=A.p+A.u(o),a=new Error;A.l(l,(e=>{if(A.o(n,o)&&(0!==(t=n[o])&&(n[o]=void 0),t)){var r=e&&("load"===e.type?"missing":e.type),l=e&&e.target&&e.target.src;a.message="Loading chunk "+o+" failed.\n("+r+": "+l+")",a.name="ChunkLoadError",a.type=r,a.request=l,t[1](a)}}),"chunk-"+o,o)}};var o=(o,e)=>{var t,r,[l,a,c]=e,i=0;if(l.some((o=>0!==n[o]))){for(t in a)A.o(a,t)&&(A.m[t]=a[t]);c&&c(A)}for(o&&o(e);i<l.length;i++)r=l[i],A.o(n,r)&&n[r]&&n[r][0](),n[r]=0},e=self.webpackChunkol_mbtiles=self.webpackChunkol_mbtiles||[];e.forEach(o.bind(null,0)),e.push=o.bind(null,e.push.bind(e))})(),A.nc=void 0,(()=>{"use strict";var n=A(5072),o=A.n(n),e=A(7825),t=A.n(e),r=A(7659),l=A.n(r),a=A(5056),c=A.n(a),i=A(540),s=A.n(i),u=A(1113),d=A.n(u),p=A(4096),C={};C.styleTagTransform=d(),C.setAttributes=c(),C.insert=l().bind(null,"head"),C.domAPI=t(),C.insertStyleElement=s(),o()(p.A,C),p.A&&p.A.locals&&p.A.locals;var g=A(9417),b={};b.styleTagTransform=d(),b.setAttributes=c(),b.insert=l().bind(null,"head"),b.domAPI=t(),b.insertStyleElement=s(),o()(g.A,b),g.A&&g.A.locals&&g.A.locals;var m=A(4813),E={};E.styleTagTransform=d(),E.setAttributes=c(),E.insert=l().bind(null,"head"),E.domAPI=t(),E.insertStyleElement=s(),o()(m.A,E),m.A&&m.A.locals&&m.A.locals;const f=JSON.parse('{"U$":{"Snc":{"rE":"1.2.0"}}}');var k=function(n,o,e,t){return new(e||(e=Promise))((function(A,r){function l(n){try{c(t.next(n))}catch(n){r(n)}}function a(n){try{c(t.throw(n))}catch(n){r(n)}}function c(n){var o;n.done?A(n.value):(o=n.value,o instanceof e?o:new e((function(n){n(o)}))).then(l,a)}c((t=t.apply(n,o||[])).next())}))};const h={velivole:"Towns from velivole.fr<br>vector<br>EPSG: 3857",klokantech:"Borders from klokantech<br>vector<br>EPSG: 3857","osm-vector-tiles":"OSM data for Europe from MapTiler, 34.4GB<br>vector<br>EPSG: 3857","reunion-raster":"IGN<br>BD Ortho 5m<br>La Réunion<br>raster<br>EPSG: 3857","sync-init":"Synchronous initialization when the metadata is known beforehand"};let v=null;function B(){return k(this,void 0,void 0,(function*(){const n=window.location.hash.slice(1),o=A(9497)(`./${n}`),e=A(5916)(`./${n}.ts`);if($("#example").html('<div id="map"></div>'),v){for(const n of v.getLayers().getArray()){if("function"==typeof n.getSource){const o=n.getSource();o&&"function"==typeof o.dispose&&o.dispose()}"function"==typeof n.dispose&&n.dispose()}v.dispose()}o.then((n=>k(this,void 0,void 0,(function*(){const o=n.default();v=o instanceof Promise?yield o:o})))),e.then((n=>$("#text").html(n.default)))}))}$((function(){const n="undefined"==typeof crossOriginIsolated||!crossOriginIsolated;$("#menu").empty();for(const n of Object.keys(h))$("#menu").append(`<button id="id-${n}" class="menu-btn btn btn-primary m-0 mb-1 px-1" >${h[n]}</button>`);$("#menu").append(`<div class="mt-auto mb-1 border p-1 bg-light d-flex flex-column"><div>Cross-Origin isolation:</div><div class="ms-auto">${n?'<strong class="text-danger">disabled</strong>':'<strong class="text-success">enabled</strong>'}</div></div>`),$("#menu").append("<small>ol-mbtiles@3.3.0</small>"),$("#menu").append(`<small>sqlite-wasm-http@${f.U$.Snc.rE}</small>`),$(".menu-btn").on("click",(n=>{window.location.hash=n.target.id.slice(3),B()})),window.location.hash||(window.location.hash=Object.keys(h)[0]),B()}))})()})();
//# sourceMappingURL=bundle.js.map