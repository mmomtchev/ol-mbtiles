(()=>{"use strict";const e=(e,...t)=>postMessage({type:e,payload:t});globalThis.SharedArrayBuffer?globalThis.Atomics?globalThis.FileSystemHandle&&globalThis.FileSystemDirectoryHandle&&globalThis.FileSystemFileHandle&&globalThis.FileSystemFileHandle.prototype.createSyncAccessHandle&&navigator?.storage?.getDirectory?function(t){const n=function(...e){throw new Error(e.join(" "))};globalThis.window===globalThis?n("This code cannot run from the main thread.","Load it as a Worker from a separate Worker."):navigator?.storage?.getDirectory||n("This API requires navigator.storage.getDirectory.");const s=Object.create(null);s.verbose=1;const a={0:console.error.bind(console),1:console.warn.bind(console),2:console.log.bind(console)},o=(e,...t)=>{s.verbose>e&&a[e]("OPFS asyncer:",...t)},i=(...e)=>o(2,...e),c=(...e)=>o(1,...e),r=(...e)=>o(0,...e),l=Object.create(null);l.reset=()=>{let e;for(e in s.opIds)(t=l[e]=Object.create(null)).count=t.time=t.wait=0;var t;let n=l.s11n=Object.create(null);n=n.serialize=Object.create(null),n.count=n.time=0,n=l.s11n.deserialize=Object.create(null),n.count=n.time=0},l.dump=()=>{let e,t=0,n=0,a=0;for(e in s.opIds){const s=l[e];t+=s.count,n+=s.time,a+=s.wait,s.avgTime=s.count&&s.time?s.time/s.count:0}console.log(globalThis?.location?.href,"metrics for",globalThis?.location?.href,":\n",l,"\nTotal of",t,"op(s) for",n,"ms","approx",a,"ms spent waiting on OPFS APIs."),console.log("Serialization metrics:",l.s11n)};const d=Object.create(null),f=new Set,y=function(e,t){const n=new URL(e,"file://irrelevant").pathname;return t?n.split("/").filter((e=>!!e)):n},u=async function(e,t=!1){const n=y(e,!0),a=n.pop();let o=s.rootDir;for(const e of n)e&&(o=await o.getDirectoryHandle(e,{create:!!t}));return[o,a]},p=async e=>{if(e.syncHandle){i("Closing sync handle for",e.filenameAbs);const t=e.syncHandle;return delete e.syncHandle,delete e.xLock,f.delete(e.fid),t.close()}},b=async e=>{try{await p(e)}catch(t){c("closeSyncHandleNoThrow() ignoring:",t,e)}},m=async()=>{if(f.size)for(const e of f){const t=d[e];await b(t),i("Auto-unlocked",e,t.filenameAbs)}},w=async e=>{if(e.releaseImplicitLocks&&f.has(e.fid))return b(e)};class g extends Error{constructor(e,...t){super([...t,": "+e.name+":",e.message].join(" "),{cause:e}),this.name="GetSyncHandleError"}}g.convertRc=(e,t)=>e instanceof g&&("NoModificationAllowedError"===e.cause.name||"DOMException"===e.cause.name&&0===e.cause.message.indexOf("Access Handles cannot"))?s.sq3Codes.SQLITE_BUSY:t;const O=async(e,t)=>{if(!e.syncHandle){const n=performance.now();i("Acquiring sync handle for",e.filenameAbs);const a=6,o=2*s.asyncIdleWaitTime;let r=1,l=o;for(;;l=o*++r)try{e.syncHandle=await e.fileHandle.createSyncAccessHandle();break}catch(n){if(r===a)throw new g(n,"Error getting sync handle for",t+"().",a,"attempts failed.",e.filenameAbs);c("Error getting sync handle for",t+"(). Waiting",l,"ms and trying again.",e.filenameAbs,n),Atomics.wait(s.sabOPView,s.opIds.retry,0,l)}i("Got",t+"() sync handle for",e.filenameAbs,"in",performance.now()-n,"ms"),e.xLock||(f.add(e.fid),i("Acquired implicit lock for",t+"()",e.fid,e.filenameAbs))}return e.syncHandle},E=(e,t)=>{i(e+"() => notify(",t,")"),Atomics.store(s.sabOPView,s.opIds.rc,t),Atomics.notify(s.sabOPView,s.opIds.rc)},h=function(e,t){t.readOnly&&n(e+"(): File is read-only: "+t.filenameAbs)},x=Object.create(null);x.op=void 0,x.start=void 0;const I=e=>{x.start=performance.now(),x.op=e,++l[e].count},S=()=>l[x.op].time+=performance.now()-x.start,T=Object.create(null);T.op=void 0,T.start=void 0;const R=e=>{T.start=performance.now(),T.op=e},A=()=>l[T.op].wait+=performance.now()-T.start;let L=!1;const C={"opfs-async-metrics":async()=>{I("opfs-async-metrics"),l.dump(),E("opfs-async-metrics",0),S()},"opfs-async-shutdown":async()=>{L=!0,E("opfs-async-shutdown",0)},mkdir:async e=>{I("mkdir");let t=0;R("mkdir");try{await u(e+"/filepart",!0)}catch(e){s.s11n.storeException(2,e),t=s.sq3Codes.SQLITE_IOERR}finally{A()}E("mkdir",t),S()},xAccess:async e=>{I("xAccess");let t=0;R("xAccess");try{const[t,n]=await u(e);await t.getFileHandle(n)}catch(e){s.s11n.storeException(2,e),t=s.sq3Codes.SQLITE_IOERR}finally{A()}E("xAccess",t),S()},xClose:async function(e){const t="xClose";I(t),f.delete(e);const n=d[e];let a=0;if(R(t),n){if(delete d[e],await p(n),n.deleteOnClose)try{await n.dirHandle.removeEntry(n.filenamePart)}catch(e){c("Ignoring dirHandle.removeEntry() failure of",n,e)}}else s.s11n.serialize(),a=s.sq3Codes.SQLITE_NOTFOUND;A(),E(t,a),S()},xDelete:async function(...e){I("xDelete");const t=await C.xDeleteNoWait(...e);E("xDelete",t),S()},xDeleteNoWait:async function(e,t=0,n=!1){let a=0;R("xDelete");try{for(;e;){const[s,a]=await u(e,!1);if(!a)break;if(await s.removeEntry(a,{recursive:n}),4660!==t)break;n=!1,(e=y(e,!0)).pop(),e=e.join("/")}}catch(e){s.s11n.storeException(2,e),a=s.sq3Codes.SQLITE_IOERR_DELETE}return A(),a},xFileSize:async function(e){I("xFileSize");const t=d[e];let n=0;R("xFileSize");try{const e=await(await O(t,"xFileSize")).getSize();s.s11n.serialize(Number(e))}catch(e){s.s11n.storeException(1,e),n=g.convertRc(e,s.sq3Codes.SQLITE_IOERR)}await w(t),A(),E("xFileSize",n),S()},xLock:async function(e,t){I("xLock");const n=d[e];let a=0;const o=n.xLock;if(n.xLock=t,!n.syncHandle){R("xLock");try{await O(n,"xLock"),f.delete(e)}catch(e){s.s11n.storeException(1,e),a=g.convertRc(e,s.sq3Codes.SQLITE_IOERR_LOCK),n.xLock=o}A()}E("xLock",a),S()},xOpen:async function(e,t,n,a){const o="xOpen";I(o);const i=s.sq3Codes.SQLITE_OPEN_CREATE&n;R("xOpen");try{let c,r;try{[c,r]=await u(t,!!i)}catch(e){return s.s11n.storeException(1,e),E(o,s.sq3Codes.SQLITE_NOTFOUND),S(),void A()}const l=await c.getFileHandle(r,{create:i});A();const f=Object.assign(Object.create(null),{fid:e,filenameAbs:t,filenamePart:r,dirHandle:c,fileHandle:l,sabView:s.sabFileBufView,readOnly:!i&&s.sq3Codes.SQLITE_OPEN_READONLY&n,deleteOnClose:!!(s.sq3Codes.SQLITE_OPEN_DELETEONCLOSE&n)});f.releaseImplicitLocks=a&s.opfsFlags.OPFS_UNLOCK_ASAP||s.opfsFlags.defaultUnlockAsap,d[e]=f,E(o,0)}catch(e){A(),r(o,e),s.s11n.storeException(1,e),E(o,s.sq3Codes.SQLITE_IOERR)}S()},xRead:async function(e,t,n){I("xRead");let a,o=0;const i=d[e];try{R("xRead"),a=(await O(i,"xRead")).read(i.sabView.subarray(0,t),{at:Number(n)}),A(),a<t&&(i.sabView.fill(0,a,t),o=s.sq3Codes.SQLITE_IOERR_SHORT_READ)}catch(e){void 0===a&&A(),r("xRead() failed",e,i),s.s11n.storeException(1,e),o=g.convertRc(e,s.sq3Codes.SQLITE_IOERR_READ)}await w(i),E("xRead",o),S()},xSync:async function(e,t){I("xSync");const n=d[e];let a=0;if(!n.readOnly&&n.syncHandle){try{R("xSync"),await n.syncHandle.flush()}catch(e){s.s11n.storeException(2,e),a=s.sq3Codes.SQLITE_IOERR_FSYNC}A()}E("xSync",a),S()},xTruncate:async function(e,t){I("xTruncate");let n=0;const a=d[e];R("xTruncate");try{h("xTruncate",a),await(await O(a,"xTruncate")).truncate(t)}catch(e){r("xTruncate():",e,a),s.s11n.storeException(2,e),n=g.convertRc(e,s.sq3Codes.SQLITE_IOERR_TRUNCATE)}await w(a),A(),E("xTruncate",n),S()},xUnlock:async function(e,t){I("xUnlock");let n=0;const a=d[e];if(s.sq3Codes.SQLITE_LOCK_NONE===t&&a.syncHandle){R("xUnlock");try{await p(a)}catch(e){s.s11n.storeException(1,e),n=s.sq3Codes.SQLITE_IOERR_UNLOCK}A()}E("xUnlock",n),S()},xWrite:async function(e,t,n){let a;I("xWrite");const o=d[e];R("xWrite");try{h("xWrite",o),a=t===(await O(o,"xWrite")).write(o.sabView.subarray(0,t),{at:Number(n)})?0:s.sq3Codes.SQLITE_IOERR_WRITE}catch(e){r("xWrite():",e,o),s.s11n.storeException(1,e),a=g.convertRc(e,s.sq3Codes.SQLITE_IOERR_WRITE)}await w(o),A(),E("xWrite",a),S()}},_=async function(){const e=Object.create(null);for(let t of Object.keys(s.opIds)){const n=C[t];if(!n)continue;const a=Object.create(null);e[s.opIds[t]]=a,a.key=t,a.f=n}for(;!L;)try{if("timed-out"===Atomics.wait(s.sabOPView,s.opIds.whichOp,0,s.asyncIdleWaitTime)){await m();continue}const t=Atomics.load(s.sabOPView,s.opIds.whichOp);Atomics.store(s.sabOPView,s.opIds.whichOp,0);const a=e[t]??n("No waitLoop handler for whichOp #",t),o=s.s11n.deserialize(!0)||[];a.f?await a.f(...o):r("Missing callback for opId",t)}catch(e){r("in waitLoop():",e)}};navigator.storage.getDirectory().then((function(t){s.rootDir=t,globalThis.onmessage=function({data:t}){switch(t.type){case"opfs-async-init":{const a=t.args;for(const e in a)s[e]=a[e];s.verbose=a.verbose??1,s.sabOPView=new Int32Array(s.sabOP),s.sabFileBufView=new Uint8Array(s.sabIO,0,s.fileBufferSize),s.sabS11nView=new Uint8Array(s.sabIO,s.sabS11nOffset,s.sabS11nSize),Object.keys(C).forEach((e=>{Number.isFinite(s.opIds[e])||n("Maintenance required: missing state.opIds[",e,"]")})),(()=>{if(s.s11n)return s.s11n;const e=new TextDecoder,t=new TextEncoder("utf-8"),a=new Uint8Array(s.sabIO,s.sabS11nOffset,s.sabS11nSize),o=new DataView(s.sabIO,s.sabS11nOffset,s.sabS11nSize);s.s11n=Object.create(null);const i=Object.create(null);i.number={id:1,size:8,getter:"getFloat64",setter:"setFloat64"},i.bigint={id:2,size:8,getter:"getBigInt64",setter:"setBigInt64"},i.boolean={id:3,size:4,getter:"getInt32",setter:"setInt32"},i.string={id:4};const c=e=>{switch(e){case i.number.id:return i.number;case i.bigint.id:return i.bigint;case i.boolean.id:return i.boolean;case i.string.id:return i.string;default:n("Invalid type ID:",e)}};s.s11n.deserialize=function(t=!1){++l.s11n.deserialize.count;const n=performance.now(),i=a[0],r=i?[]:null;if(i){const t=[];let n,l,d,f=1;for(n=0;n<i;++n,++f)t.push(c(a[f]));for(n=0;n<i;++n){const i=t[n];i.getter?(d=o[i.getter](f,s.littleEndian),f+=i.size):(l=o.getInt32(f,s.littleEndian),f+=4,d=e.decode(a.slice(f,f+l)),f+=l),r.push(d)}}return t&&(a[0]=0),l.s11n.deserialize.time+=performance.now()-n,r},s.s11n.serialize=function(...e){const c=performance.now();if(++l.s11n.serialize.count,e.length){const c=[];let l=0,d=1;for(a[0]=255&e.length;l<e.length;++l,++d)c.push((r=e[l],i[typeof r]||n("Maintenance required: this value type cannot be serialized.",r))),a[d]=c[l].id;for(l=0;l<e.length;++l){const n=c[l];if(n.setter)o[n.setter](d,e[l],s.littleEndian),d+=n.size;else{const n=t.encode(e[l]);o.setInt32(d,n.byteLength,s.littleEndian),d+=4,a.set(n,d),d+=n.byteLength}}}else a[0]=0;var r;l.s11n.serialize.time+=performance.now()-c},s.s11n.storeException=s.asyncS11nExceptions?(e,t)=>{e<=s.asyncS11nExceptions&&s.s11n.serialize([t.name,": ",t.message].join(""))}:()=>{},s.s11n})(),l.reset(),i("init state",s),e("opfs-async-inited"),_();break}case"opfs-async-restart":L&&(c("Restarting after opfs-async-shutdown. Might or might not work."),L=!1,_());break;case"opfs-async-metrics":l.dump()}},e("opfs-async-loaded")})).catch((e=>r("error initializing OPFS asyncer:",e)))}(self):e("opfs-unavailable","Missing required OPFS APIs."):e("opfs-unavailable","Missing Atomics API.","The server must emit the COOP/COEP response headers to enable that."):e("opfs-unavailable","Missing SharedArrayBuffer API.","The server must emit the COOP/COEP response headers to enable that.")})();
//# sourceMappingURL=934.bundle.js.map