(()=>{var m=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var h=m(r=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});function i(t){return new Promise((e,n)=>{t.oncomplete=t.onsuccess=()=>e(t.result),t.onabort=t.onerror=()=>n(t.error)})}function d(t,e){let n=indexedDB.open(t);n.onupgradeneeded=()=>n.result.createObjectStore(e);let s=i(n);return(a,c)=>s.then(o=>c(o.transaction(e,a).objectStore(e)))}var l;function u(){return l||(l=d("keyval-store","keyval")),l}function y(t,e=u()){return e("readonly",n=>i(n.get(t)))}function g(t,e,n=u()){return n("readwrite",s=>(s.put(e,t),i(s.transaction)))}function v(t,e=u()){return e("readwrite",n=>(t.forEach(s=>n.put(s[1],s[0])),i(n.transaction)))}function w(t,e=u()){return e("readonly",n=>Promise.all(t.map(s=>i(n.get(s)))))}function E(t,e,n=u()){return n("readwrite",s=>new Promise((a,c)=>{s.get(t).onsuccess=function(){try{s.put(e(this.result),t),a(i(s.transaction))}catch(o){c(o)}}}))}function S(t,e=u()){return e("readwrite",n=>(n.delete(t),i(n.transaction)))}function k(t=u()){return t("readwrite",e=>(e.clear(),i(e.transaction)))}function f(t,e){return t("readonly",n=>(n.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},i(n.transaction)))}function b(t=u()){let e=[];return f(t,n=>e.push(n.key)).then(()=>e)}function C(t=u()){let e=[];return f(t,n=>e.push(n.value)).then(()=>e)}function M(t=u()){let e=[];return f(t,n=>e.push([n.key,n.value])).then(()=>e)}r.clear=k;r.createStore=d;r.del=S;r.entries=M;r.get=y;r.getMany=w;r.keys=b;r.promisifyRequest=i;r.set=g;r.setMany=v;r.update=E;r.values=C});var p="cache-v1621855776816";self.addEventListener("install",t=>{t.waitUntil(caches.open(p).then(e=>e.addAll(JSON.parse('["/.well-known/assetlinks.json","/404.html","/favicon.ico","/icons/128.png","/icons/144.png","/icons/16.png","/icons/192.png","/icons/32.png","/icons/48.png","/icons/512.png","/icons/72.png","/icons/96.png","/index.html","/index.min.js","/index.min.js.map","/manifest.json","/style.min.css"]'))).then(()=>{self.skipWaiting()}))});self.addEventListener("activate",t=>{t.waitUntil(caches.keys().then(e=>e.filter(n=>p!==n)).then(e=>(e.length>0&&h().clear(),Promise.all(e.map(n=>caches.delete(n))))).then(()=>self.clients.claim()).then(()=>{self.clients.matchAll().then(function(e){e.forEach(n=>{n.postMessage({msg:"pageNeedsRefresh"})})})}))});self.addEventListener("fetch",function(t){!t.request.url.startsWith(self.location.origin)||t.respondWith(caches.match(t.request).then(function(e){if(e)return e;let n=new Request("/index.html");return caches.match(n)}))});})();
//# sourceMappingURL=cache-worker.js.map
