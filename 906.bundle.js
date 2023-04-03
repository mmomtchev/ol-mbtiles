"use strict";(self.webpackChunkol_mbtiles=self.webpackChunkol_mbtiles||[]).push([[906],{7400:(t,e,i)=>{i.d(e,{g:()=>n});var s=i(6186);const h=function(){const t=new ArrayBuffer(2),e=new Uint8Array(t),i=new Uint16Array(t);if(e[0]=240,e[1]=13,61453==i[0])return s.fF.threads("System is Big-Endian"),!1;if(3568==i[0])return s.fF.threads("System is Little-Endian"),!0;throw new Error(`Failed determining endianness: ${i}`)}();function n(t){if(h)for(let e=0;e<t.length;e++)t[e]=(65280&t[e])>>8|(255&t[e])<<8}},6186:(t,e,i)=>{var s;i.d(e,{J3:()=>n,fF:()=>r,vC:()=>h});const h={timeout:2e4,maxPageSize:4096,cacheSize:1024,headers:{}};var n;!function(t){t[t.WORKMSG=16777215]="WORKMSG",t[t.HANDSHAKE=16777214]="HANDSHAKE"}(n||(n={}));const o="undefined"!=typeof SQLITE_DEBUG&&SQLITE_DEBUG||"undefined"!=typeof process&&void 0!==(null===(s=null===process||void 0===process?void 0:process.env)||void 0===s?void 0:s.SQLITE_DEBUG)&&process.env.SQLITE_DEBUG||"",a=["threads","vfs","cache","http"],r={};for(const t of a)r[t]=o.includes(t)?console.debug.bind(console):()=>{}},7028:(t,e,i)=>{i.d(e,{Z:()=>w});const s="object"==typeof performance&&performance&&"function"==typeof performance.now?performance:Date,h="function"==typeof AbortController?AbortController:class{constructor(){this.signal=new a}abort(t=new Error("This operation was aborted")){this.signal.reason=this.signal.reason||t,this.signal.aborted=!0,this.signal.dispatchEvent({type:"abort",target:this.signal})}},n="function"==typeof AbortSignal,o="function"==typeof h.AbortSignal,a=n?AbortSignal:o?h.AbortController:class{constructor(){this.reason=void 0,this.aborted=!1,this._listeners=[]}dispatchEvent(t){"abort"===t.type&&(this.aborted=!0,this.onabort(t),this._listeners.forEach((e=>e(t)),this))}onabort(){}addEventListener(t,e){"abort"===t&&this._listeners.push(e)}removeEventListener(t,e){"abort"===t&&(this._listeners=this._listeners.filter((t=>t!==e)))}},r=new Set,l=(t,e)=>{const i=`LRU_CACHE_OPTION_${t}`;u(i)&&f(i,`${t} option`,`options.${e}`,y)},c=(t,e)=>{const i=`LRU_CACHE_METHOD_${t}`;if(u(i)){const{prototype:s}=y,{get:h}=Object.getOwnPropertyDescriptor(s,t);f(i,`${t} method`,`cache.${e}()`,h)}},d=(...t)=>{"object"==typeof process&&process&&"function"==typeof process.emitWarning?process.emitWarning(...t):console.error(...t)},u=t=>!r.has(t),f=(t,e,i,s)=>{r.add(t),d(`The ${e} is deprecated. Please use ${i} instead.`,"DeprecationWarning",t,s)},p=t=>t&&t===Math.floor(t)&&t>0&&isFinite(t),g=t=>p(t)?t<=Math.pow(2,8)?Uint8Array:t<=Math.pow(2,16)?Uint16Array:t<=Math.pow(2,32)?Uint32Array:t<=Number.MAX_SAFE_INTEGER?v:null:null;class v extends Array{constructor(t){super(t),this.fill(0)}}class S{constructor(t){if(0===t)return[];const e=g(t);this.heap=new e(t),this.length=0}push(t){this.heap[this.length++]=t}pop(){return this.heap[--this.length]}}class y{constructor(t={}){const{max:e=0,ttl:i,ttlResolution:s=1,ttlAutopurge:h,updateAgeOnGet:n,updateAgeOnHas:o,allowStale:a,dispose:c,disposeAfter:f,noDisposeOnSet:v,noUpdateTTL:w,maxSize:m=0,maxEntrySize:z=0,sizeCalculation:L,fetchMethod:_,fetchContext:T,noDeleteOnFetchRejection:x,noDeleteOnStaleGet:A,allowStaleOnFetchRejection:F,allowStaleOnFetchAbort:b,ignoreFetchAbort:k}=t,{length:E,maxAge:O,stale:C}=t instanceof y?{}:t;if(0!==e&&!p(e))throw new TypeError("max option must be a nonnegative integer");const D=e?g(e):Array;if(!D)throw new Error("invalid max value: "+e);if(this.max=e,this.maxSize=m,this.maxEntrySize=z||this.maxSize,this.sizeCalculation=L||E,this.sizeCalculation){if(!this.maxSize&&!this.maxEntrySize)throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");if("function"!=typeof this.sizeCalculation)throw new TypeError("sizeCalculation set to non-function")}if(this.fetchMethod=_||null,this.fetchMethod&&"function"!=typeof this.fetchMethod)throw new TypeError("fetchMethod must be a function if specified");if(this.fetchContext=T,!this.fetchMethod&&void 0!==T)throw new TypeError("cannot set fetchContext without fetchMethod");if(this.keyMap=new Map,this.keyList=new Array(e).fill(null),this.valList=new Array(e).fill(null),this.next=new D(e),this.prev=new D(e),this.head=0,this.tail=0,this.free=new S(e),this.initialFill=1,this.size=0,"function"==typeof c&&(this.dispose=c),"function"==typeof f?(this.disposeAfter=f,this.disposed=[]):(this.disposeAfter=null,this.disposed=null),this.noDisposeOnSet=!!v,this.noUpdateTTL=!!w,this.noDeleteOnFetchRejection=!!x,this.allowStaleOnFetchRejection=!!F,this.allowStaleOnFetchAbort=!!b,this.ignoreFetchAbort=!!k,0!==this.maxEntrySize){if(0!==this.maxSize&&!p(this.maxSize))throw new TypeError("maxSize must be a positive integer if specified");if(!p(this.maxEntrySize))throw new TypeError("maxEntrySize must be a positive integer if specified");this.initializeSizeTracking()}if(this.allowStale=!!a||!!C,this.noDeleteOnStaleGet=!!A,this.updateAgeOnGet=!!n,this.updateAgeOnHas=!!o,this.ttlResolution=p(s)||0===s?s:1,this.ttlAutopurge=!!h,this.ttl=i||O||0,this.ttl){if(!p(this.ttl))throw new TypeError("ttl must be a positive integer if specified");this.initializeTTLTracking()}if(0===this.max&&0===this.ttl&&0===this.maxSize)throw new TypeError("At least one of max, maxSize, or ttl is required");if(!this.ttlAutopurge&&!this.max&&!this.maxSize){const t="LRU_CACHE_UNBOUNDED";u(t)&&(r.add(t),d("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.","UnboundedCacheWarning",t,y))}C&&l("stale","allowStale"),O&&l("maxAge","ttl"),E&&l("length","sizeCalculation")}getRemainingTTL(t){return this.has(t,{updateAgeOnHas:!1})?1/0:0}initializeTTLTracking(){this.ttls=new v(this.max),this.starts=new v(this.max),this.setItemTTL=(t,e,i=s.now())=>{if(this.starts[t]=0!==e?i:0,this.ttls[t]=e,0!==e&&this.ttlAutopurge){const i=setTimeout((()=>{this.isStale(t)&&this.delete(this.keyList[t])}),e+1);i.unref&&i.unref()}},this.updateItemAge=t=>{this.starts[t]=0!==this.ttls[t]?s.now():0},this.statusTTL=(i,s)=>{i&&(i.ttl=this.ttls[s],i.start=this.starts[s],i.now=t||e(),i.remainingTTL=i.now+i.ttl-i.start)};let t=0;const e=()=>{const e=s.now();if(this.ttlResolution>0){t=e;const i=setTimeout((()=>t=0),this.ttlResolution);i.unref&&i.unref()}return e};this.getRemainingTTL=i=>{const s=this.keyMap.get(i);return void 0===s?0:0===this.ttls[s]||0===this.starts[s]?1/0:this.starts[s]+this.ttls[s]-(t||e())},this.isStale=i=>0!==this.ttls[i]&&0!==this.starts[i]&&(t||e())-this.starts[i]>this.ttls[i]}updateItemAge(t){}statusTTL(t,e){}setItemTTL(t,e,i){}isStale(t){return!1}initializeSizeTracking(){this.calculatedSize=0,this.sizes=new v(this.max),this.removeItemSize=t=>{this.calculatedSize-=this.sizes[t],this.sizes[t]=0},this.requireSize=(t,e,i,s)=>{if(this.isBackgroundFetch(e))return 0;if(!p(i)){if(!s)throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");if("function"!=typeof s)throw new TypeError("sizeCalculation must be a function");if(i=s(e,t),!p(i))throw new TypeError("sizeCalculation return invalid (expect positive integer)")}return i},this.addItemSize=(t,e,i)=>{if(this.sizes[t]=e,this.maxSize){const e=this.maxSize-this.sizes[t];for(;this.calculatedSize>e;)this.evict(!0)}this.calculatedSize+=this.sizes[t],i&&(i.entrySize=e,i.totalCalculatedSize=this.calculatedSize)}}removeItemSize(t){}addItemSize(t,e){}requireSize(t,e,i,s){if(i||s)throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache")}*indexes({allowStale:t=this.allowStale}={}){if(this.size)for(let e=this.tail;this.isValidIndex(e)&&(!t&&this.isStale(e)||(yield e),e!==this.head);)e=this.prev[e]}*rindexes({allowStale:t=this.allowStale}={}){if(this.size)for(let e=this.head;this.isValidIndex(e)&&(!t&&this.isStale(e)||(yield e),e!==this.tail);)e=this.next[e]}isValidIndex(t){return void 0!==t&&this.keyMap.get(this.keyList[t])===t}*entries(){for(const t of this.indexes())void 0===this.valList[t]||void 0===this.keyList[t]||this.isBackgroundFetch(this.valList[t])||(yield[this.keyList[t],this.valList[t]])}*rentries(){for(const t of this.rindexes())void 0===this.valList[t]||void 0===this.keyList[t]||this.isBackgroundFetch(this.valList[t])||(yield[this.keyList[t],this.valList[t]])}*keys(){for(const t of this.indexes())void 0===this.keyList[t]||this.isBackgroundFetch(this.valList[t])||(yield this.keyList[t])}*rkeys(){for(const t of this.rindexes())void 0===this.keyList[t]||this.isBackgroundFetch(this.valList[t])||(yield this.keyList[t])}*values(){for(const t of this.indexes())void 0===this.valList[t]||this.isBackgroundFetch(this.valList[t])||(yield this.valList[t])}*rvalues(){for(const t of this.rindexes())void 0===this.valList[t]||this.isBackgroundFetch(this.valList[t])||(yield this.valList[t])}[Symbol.iterator](){return this.entries()}find(t,e){for(const i of this.indexes()){const s=this.valList[i],h=this.isBackgroundFetch(s)?s.__staleWhileFetching:s;if(void 0!==h&&t(h,this.keyList[i],this))return this.get(this.keyList[i],e)}}forEach(t,e=this){for(const i of this.indexes()){const s=this.valList[i],h=this.isBackgroundFetch(s)?s.__staleWhileFetching:s;void 0!==h&&t.call(e,h,this.keyList[i],this)}}rforEach(t,e=this){for(const i of this.rindexes()){const s=this.valList[i],h=this.isBackgroundFetch(s)?s.__staleWhileFetching:s;void 0!==h&&t.call(e,h,this.keyList[i],this)}}get prune(){return c("prune","purgeStale"),this.purgeStale}purgeStale(){let t=!1;for(const e of this.rindexes({allowStale:!0}))this.isStale(e)&&(this.delete(this.keyList[e]),t=!0);return t}dump(){const t=[];for(const e of this.indexes({allowStale:!0})){const i=this.keyList[e],h=this.valList[e],n=this.isBackgroundFetch(h)?h.__staleWhileFetching:h;if(void 0===n)continue;const o={value:n};if(this.ttls){o.ttl=this.ttls[e];const t=s.now()-this.starts[e];o.start=Math.floor(Date.now()-t)}this.sizes&&(o.size=this.sizes[e]),t.unshift([i,o])}return t}load(t){this.clear();for(const[e,i]of t){if(i.start){const t=Date.now()-i.start;i.start=s.now()-t}this.set(e,i.value,i)}}dispose(t,e,i){}set(t,e,{ttl:i=this.ttl,start:s,noDisposeOnSet:h=this.noDisposeOnSet,size:n=0,sizeCalculation:o=this.sizeCalculation,noUpdateTTL:a=this.noUpdateTTL,status:r}={}){if(n=this.requireSize(t,e,n,o),this.maxEntrySize&&n>this.maxEntrySize)return r&&(r.set="miss",r.maxEntrySizeExceeded=!0),this.delete(t),this;let l=0===this.size?void 0:this.keyMap.get(t);if(void 0===l)l=this.newIndex(),this.keyList[l]=t,this.valList[l]=e,this.keyMap.set(t,l),this.next[this.tail]=l,this.prev[l]=this.tail,this.tail=l,this.size++,this.addItemSize(l,n,r),r&&(r.set="add"),a=!1;else{this.moveToTail(l);const i=this.valList[l];if(e!==i){if(this.isBackgroundFetch(i)?i.__abortController.abort(new Error("replaced")):h||(this.dispose(i,t,"set"),this.disposeAfter&&this.disposed.push([i,t,"set"])),this.removeItemSize(l),this.valList[l]=e,this.addItemSize(l,n,r),r){r.set="replace";const t=i&&this.isBackgroundFetch(i)?i.__staleWhileFetching:i;void 0!==t&&(r.oldValue=t)}}else r&&(r.set="update")}if(0===i||0!==this.ttl||this.ttls||this.initializeTTLTracking(),a||this.setItemTTL(l,i,s),this.statusTTL(r,l),this.disposeAfter)for(;this.disposed.length;)this.disposeAfter(...this.disposed.shift());return this}newIndex(){return 0===this.size?this.tail:this.size===this.max&&0!==this.max?this.evict(!1):0!==this.free.length?this.free.pop():this.initialFill++}pop(){if(this.size){const t=this.valList[this.head];return this.evict(!0),t}}evict(t){const e=this.head,i=this.keyList[e],s=this.valList[e];return this.isBackgroundFetch(s)?s.__abortController.abort(new Error("evicted")):(this.dispose(s,i,"evict"),this.disposeAfter&&this.disposed.push([s,i,"evict"])),this.removeItemSize(e),t&&(this.keyList[e]=null,this.valList[e]=null,this.free.push(e)),this.head=this.next[e],this.keyMap.delete(i),this.size--,e}has(t,{updateAgeOnHas:e=this.updateAgeOnHas,status:i}={}){const s=this.keyMap.get(t);if(void 0!==s){if(!this.isStale(s))return e&&this.updateItemAge(s),i&&(i.has="hit"),this.statusTTL(i,s),!0;i&&(i.has="stale",this.statusTTL(i,s))}else i&&(i.has="miss");return!1}peek(t,{allowStale:e=this.allowStale}={}){const i=this.keyMap.get(t);if(void 0!==i&&(e||!this.isStale(i))){const t=this.valList[i];return this.isBackgroundFetch(t)?t.__staleWhileFetching:t}}backgroundFetch(t,e,i,s){const n=void 0===e?void 0:this.valList[e];if(this.isBackgroundFetch(n))return n;const o=new h;i.signal&&i.signal.addEventListener("abort",(()=>o.abort(i.signal.reason)));const a={signal:o.signal,options:i,context:s},r=(s,h=!1)=>{const{aborted:n}=o.signal,r=i.ignoreFetchAbort&&void 0!==s;return i.status&&(n&&!h?(i.status.fetchAborted=!0,i.status.fetchError=o.signal.reason,r&&(i.status.fetchAbortIgnored=!0)):i.status.fetchResolved=!0),!n||r||h?(this.valList[e]===c&&(void 0===s?c.__staleWhileFetching?this.valList[e]=c.__staleWhileFetching:this.delete(t):(i.status&&(i.status.fetchUpdated=!0),this.set(t,s,a.options))),s):l(o.signal.reason)},l=s=>{const{aborted:h}=o.signal,n=h&&i.allowStaleOnFetchAbort,a=n||i.allowStaleOnFetchRejection,r=a||i.noDeleteOnFetchRejection;if(this.valList[e]===c&&(r&&void 0!==c.__staleWhileFetching?n||(this.valList[e]=c.__staleWhileFetching):this.delete(t)),a)return i.status&&void 0!==c.__staleWhileFetching&&(i.status.returnedStale=!0),c.__staleWhileFetching;if(c.__returned===c)throw s};i.status&&(i.status.fetchDispatched=!0);const c=new Promise(((e,s)=>{this.fetchMethod(t,n,a).then((t=>e(t)),s),o.signal.addEventListener("abort",(()=>{i.ignoreFetchAbort&&!i.allowStaleOnFetchAbort||(e(),i.allowStaleOnFetchAbort&&(e=t=>r(t,!0)))}))})).then(r,(t=>(i.status&&(i.status.fetchRejected=!0,i.status.fetchError=t),l(t))));return c.__abortController=o,c.__staleWhileFetching=n,c.__returned=null,void 0===e?(this.set(t,c,{...a.options,status:void 0}),e=this.keyMap.get(t)):this.valList[e]=c,c}isBackgroundFetch(t){return t&&"object"==typeof t&&"function"==typeof t.then&&Object.prototype.hasOwnProperty.call(t,"__staleWhileFetching")&&Object.prototype.hasOwnProperty.call(t,"__returned")&&(t.__returned===t||null===t.__returned)}async fetch(t,{allowStale:e=this.allowStale,updateAgeOnGet:i=this.updateAgeOnGet,noDeleteOnStaleGet:s=this.noDeleteOnStaleGet,ttl:h=this.ttl,noDisposeOnSet:n=this.noDisposeOnSet,size:o=0,sizeCalculation:a=this.sizeCalculation,noUpdateTTL:r=this.noUpdateTTL,noDeleteOnFetchRejection:l=this.noDeleteOnFetchRejection,allowStaleOnFetchRejection:c=this.allowStaleOnFetchRejection,ignoreFetchAbort:d=this.ignoreFetchAbort,allowStaleOnFetchAbort:u=this.allowStaleOnFetchAbort,fetchContext:f=this.fetchContext,forceRefresh:p=!1,status:g,signal:v}={}){if(!this.fetchMethod)return g&&(g.fetch="get"),this.get(t,{allowStale:e,updateAgeOnGet:i,noDeleteOnStaleGet:s,status:g});const S={allowStale:e,updateAgeOnGet:i,noDeleteOnStaleGet:s,ttl:h,noDisposeOnSet:n,size:o,sizeCalculation:a,noUpdateTTL:r,noDeleteOnFetchRejection:l,allowStaleOnFetchRejection:c,allowStaleOnFetchAbort:u,ignoreFetchAbort:d,status:g,signal:v};let y=this.keyMap.get(t);if(void 0===y){g&&(g.fetch="miss");const e=this.backgroundFetch(t,y,S,f);return e.__returned=e}{const s=this.valList[y];if(this.isBackgroundFetch(s)){const t=e&&void 0!==s.__staleWhileFetching;return g&&(g.fetch="inflight",t&&(g.returnedStale=!0)),t?s.__staleWhileFetching:s.__returned=s}const h=this.isStale(y);if(!p&&!h)return g&&(g.fetch="hit"),this.moveToTail(y),i&&this.updateItemAge(y),this.statusTTL(g,y),s;const n=this.backgroundFetch(t,y,S,f),o=void 0!==n.__staleWhileFetching,a=o&&e;return g&&(g.fetch=o&&h?"stale":"refresh",a&&h&&(g.returnedStale=!0)),a?n.__staleWhileFetching:n.__returned=n}}get(t,{allowStale:e=this.allowStale,updateAgeOnGet:i=this.updateAgeOnGet,noDeleteOnStaleGet:s=this.noDeleteOnStaleGet,status:h}={}){const n=this.keyMap.get(t);if(void 0!==n){const o=this.valList[n],a=this.isBackgroundFetch(o);return this.statusTTL(h,n),this.isStale(n)?(h&&(h.get="stale"),a?(h&&(h.returnedStale=e&&void 0!==o.__staleWhileFetching),e?o.__staleWhileFetching:void 0):(s||this.delete(t),h&&(h.returnedStale=e),e?o:void 0)):(h&&(h.get="hit"),a?o.__staleWhileFetching:(this.moveToTail(n),i&&this.updateItemAge(n),o))}h&&(h.get="miss")}connect(t,e){this.prev[e]=t,this.next[t]=e}moveToTail(t){t!==this.tail&&(t===this.head?this.head=this.next[t]:this.connect(this.prev[t],this.next[t]),this.connect(this.tail,t),this.tail=t)}get del(){return c("del","delete"),this.delete}delete(t){let e=!1;if(0!==this.size){const i=this.keyMap.get(t);if(void 0!==i)if(e=!0,1===this.size)this.clear();else{this.removeItemSize(i);const e=this.valList[i];this.isBackgroundFetch(e)?e.__abortController.abort(new Error("deleted")):(this.dispose(e,t,"delete"),this.disposeAfter&&this.disposed.push([e,t,"delete"])),this.keyMap.delete(t),this.keyList[i]=null,this.valList[i]=null,i===this.tail?this.tail=this.prev[i]:i===this.head?this.head=this.next[i]:(this.next[this.prev[i]]=this.next[i],this.prev[this.next[i]]=this.prev[i]),this.size--,this.free.push(i)}}if(this.disposed)for(;this.disposed.length;)this.disposeAfter(...this.disposed.shift());return e}clear(){for(const t of this.rindexes({allowStale:!0})){const e=this.valList[t];if(this.isBackgroundFetch(e))e.__abortController.abort(new Error("deleted"));else{const i=this.keyList[t];this.dispose(e,i,"delete"),this.disposeAfter&&this.disposed.push([e,i,"delete"])}}if(this.keyMap.clear(),this.valList.fill(null),this.keyList.fill(null),this.ttls&&(this.ttls.fill(0),this.starts.fill(0)),this.sizes&&this.sizes.fill(0),this.head=0,this.tail=0,this.initialFill=1,this.free.length=0,this.calculatedSize=0,this.size=0,this.disposed)for(;this.disposed.length;)this.disposeAfter(...this.disposed.shift())}get reset(){return c("reset","clear"),this.clear}get length(){return((t,e)=>{const i=`LRU_CACHE_PROPERTY_${t}`;if(u(i)){const{prototype:e}=y,{get:s}=Object.getOwnPropertyDescriptor(e,t);f(i,`${t} property`,"cache.size",s)}})("length"),this.size}static get AbortController(){return h}static get AbortSignal(){return a}}const w=y}}]);
//# sourceMappingURL=906.bundle.js.map