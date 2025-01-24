(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(i){if(i.ep)return;i.ep=!0;const l=r(i);fetch(i.href,l)}})();const Je=!1;var He=Array.isArray,Jt=Array.prototype.indexOf,Ue=Array.from,Qt=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,st=Object.getOwnPropertyDescriptors,er=Object.prototype,tr=Array.prototype,je=Object.getPrototypeOf;function rr(e){return e()}function Fe(e){for(var t=0;t<e.length;t++)e[t]()}const C=2,at=4,Ne=8,Ye=16,V=32,ne=64,me=128,X=256,be=512,T=1024,z=2048,Z=4096,L=8192,ie=16384,nr=32768,ft=65536,ir=1<<17,lr=1<<19,ct=1<<20,ce=Symbol("$state"),ur=Symbol("");function vt(e){return e===this.v}function or(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function _t(e){return!or(e,this.v)}function sr(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function ar(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function fr(e){throw new Error("https://svelte.dev/e/effect_orphan")}function cr(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function vr(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function _r(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function dr(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function pr(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let de=!1,hr=!1;function gr(){de=!0}const yr=1,wr=2,Er=16,mr=1,br=2,kr=1,xr=2,N=Symbol();function S(e,t){var r={f:0,v:e,reactions:null,equals:vt,rv:0,wv:0};return r}function Tr(e){return Nr(S(e))}function Ar(e,t=!1){var n;const r=S(e);return t||(r.equals=_t),de&&m!==null&&m.l!==null&&((n=m.l).s??(n.s=[])).push(r),r}function Nr(e){return E!==null&&!U&&E.f&C&&(F===null?qr([e]):F.push(e)),e}function B(e,t){return E!==null&&!U&&Se()&&E.f&(C|Ye)&&(F===null||!F.includes(e))&&pr(),dt(e,t)}function dt(e,t){return e.equals(t)||(e.v,e.v=t,e.wv=Mt(),pt(e,z),Se()&&w!==null&&w.f&T&&!(w.f&(V|ne))&&(H===null?$r([e]):H.push(e))),t}function pt(e,t){var r=e.reactions;if(r!==null)for(var n=Se(),i=r.length,l=0;l<i;l++){var u=r[l],c=u.f;c&z||!n&&u===w||($(u,t),c&(T|X)&&(c&C?pt(u,Z):De(u)))}}let Or=!1;function W(e,t=null,r){if(typeof e!="object"||e===null||ce in e)return e;const n=je(e);if(n!==er&&n!==tr)return e;var i=new Map,l=He(e),u=S(0);l&&i.set("length",S(e.length));var c;return new Proxy(e,{defineProperty(a,s,v){(!("value"in v)||v.configurable===!1||v.enumerable===!1||v.writable===!1)&&vr();var o=i.get(s);return o===void 0?(o=S(v.value),i.set(s,o)):B(o,W(v.value,c)),!0},deleteProperty(a,s){var v=i.get(s);if(v===void 0)s in a&&i.set(s,S(N));else{if(l&&typeof s=="string"){var o=i.get("length"),f=Number(s);Number.isInteger(f)&&f<o.v&&B(o,f)}B(v,N),Qe(u)}return!0},get(a,s,v){var p;if(s===ce)return e;var o=i.get(s),f=s in a;if(o===void 0&&(!f||(p=fe(a,s))!=null&&p.writable)&&(o=S(W(f?a[s]:N,c)),i.set(s,o)),o!==void 0){var _=y(o);return _===N?void 0:_}return Reflect.get(a,s,v)},getOwnPropertyDescriptor(a,s){var v=Reflect.getOwnPropertyDescriptor(a,s);if(v&&"value"in v){var o=i.get(s);o&&(v.value=y(o))}else if(v===void 0){var f=i.get(s),_=f==null?void 0:f.v;if(f!==void 0&&_!==N)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return v},has(a,s){var _;if(s===ce)return!0;var v=i.get(s),o=v!==void 0&&v.v!==N||Reflect.has(a,s);if(v!==void 0||w!==null&&(!o||(_=fe(a,s))!=null&&_.writable)){v===void 0&&(v=S(o?W(a[s],c):N),i.set(s,v));var f=y(v);if(f===N)return!1}return o},set(a,s,v,o){var g;var f=i.get(s),_=s in a;if(l&&s==="length")for(var p=v;p<f.v;p+=1){var h=i.get(p+"");h!==void 0?B(h,N):p in a&&(h=S(N),i.set(p+"",h))}f===void 0?(!_||(g=fe(a,s))!=null&&g.writable)&&(f=S(void 0),B(f,W(v,c)),i.set(s,f)):(_=f.v!==N,B(f,W(v,c)));var k=Reflect.getOwnPropertyDescriptor(a,s);if(k!=null&&k.set&&k.set.call(o,v),!_){if(l&&typeof s=="string"){var P=i.get("length"),d=Number(s);Number.isInteger(d)&&d>=P.v&&B(P,d+1)}Qe(u)}return!0},ownKeys(a){y(u);var s=Reflect.ownKeys(a).filter(f=>{var _=i.get(f);return _===void 0||_.v!==N});for(var[v,o]of i)o.v!==N&&!(v in a)&&s.push(v);return s},setPrototypeOf(){_r()}})}function Qe(e,t=1){B(e,e.v+t)}var et,ht,gt;function Sr(){if(et===void 0){et=window;var e=Element.prototype,t=Node.prototype;ht=fe(t,"firstChild").get,gt=fe(t,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}function yt(e=""){return document.createTextNode(e)}function re(e){return ht.call(e)}function Oe(e){return gt.call(e)}function we(e,t){return re(e)}function wt(e,t){{var r=re(e);return r instanceof Comment&&r.data===""?Oe(r):r}}function ee(e,t=1,r=!1){let n=e;for(;t--;)n=Oe(n);return n}function Cr(e){e.textContent=""}function x(e){var t=C|z;w===null?t|=X:w.f|=ct;var r=E!==null&&E.f&C?E:null;const n={children:null,ctx:m,deps:null,equals:vt,f:t,fn:e,reactions:null,rv:0,v:null,wv:0,parent:r??w};return r!==null&&(r.children??(r.children=[])).push(n),n}function R(e){const t=x(e);return t.equals=_t,t}function Et(e){var t=e.children;if(t!==null){e.children=null;for(var r=0;r<t.length;r+=1){var n=t[r];n.f&C?Ke(n):Y(n)}}}function Dr(e){for(var t=e.parent;t!==null;){if(!(t.f&C))return t;t=t.parent}return null}function mt(e){var t,r=w;q(Dr(e));try{Et(e),t=$t(e)}finally{q(r)}return t}function bt(e){var t=mt(e),r=(G||e.f&X)&&e.deps!==null?Z:T;$(e,r),e.equals(t)||(e.v=t,e.wv=Mt())}function Ke(e){Et(e),_e(e,0),$(e,ie),e.v=e.children=e.deps=e.ctx=e.reactions=null}function kt(e){w===null&&E===null&&fr(),E!==null&&E.f&X&&ar(),Xe&&sr()}function Ir(e,t){var r=t.last;r===null?t.last=t.first=e:(r.next=e,e.prev=r,t.last=e)}function pe(e,t,r,n=!0){var i=(e&ne)!==0,l=w,u={ctx:m,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:e|z,first:null,fn:t,last:null,next:null,parent:i?null:l,prev:null,teardown:null,transitions:null,wv:0};if(r){var c=te;try{tt(!0),Ze(u),u.f|=nr}catch(v){throw Y(u),v}finally{tt(c)}}else t!==null&&De(u);var a=r&&u.deps===null&&u.first===null&&u.nodes_start===null&&u.teardown===null&&(u.f&(ct|me))===0;if(!a&&!i&&n&&(l!==null&&Ir(u,l),E!==null&&E.f&C)){var s=E;(s.children??(s.children=[])).push(u)}return u}function Me(e){kt();var t=w!==null&&(w.f&V)!==0&&m!==null&&!m.m;if(t){var r=m;(r.e??(r.e=[])).push({fn:e,effect:w,reaction:E})}else{var n=xt(e);return n}}function Pr(e){return kt(),Lr(e)}function Rr(e){const t=pe(ne,e,!0);return(r={})=>new Promise(n=>{r.outro?Dt(t,()=>{Y(t),n(void 0)}):(Y(t),n(void 0))})}function xt(e){return pe(at,e,!1)}function Lr(e){return pe(Ne,e,!0)}function Tt(e,t=[],r=x){const n=t.map(r);return At(()=>e(...n.map(y)))}function At(e,t=0){return pe(Ne|Ye|t,e,!0)}function We(e,t=!0){return pe(Ne|V,e,!0,t)}function Nt(e){var t=e.teardown;if(t!==null){const r=Xe,n=E;rt(!0),K(null);try{t.call(null)}finally{rt(r),K(n)}}}function Ot(e){var t=e.deriveds;if(t!==null){e.deriveds=null;for(var r=0;r<t.length;r+=1)Ke(t[r])}}function St(e,t=!1){var r=e.first;for(e.first=e.last=null;r!==null;){var n=r.next;Y(r,t),r=n}}function Fr(e){for(var t=e.first;t!==null;){var r=t.next;t.f&V||Y(t),t=r}}function Y(e,t=!0){var r=!1;if((t||e.f&lr)&&e.nodes_start!==null){for(var n=e.nodes_start,i=e.nodes_end;n!==null;){var l=n===i?null:Oe(n);n.remove(),n=l}r=!0}St(e,t&&!r),Ot(e),_e(e,0),$(e,ie);var u=e.transitions;if(u!==null)for(const a of u)a.stop();Nt(e);var c=e.parent;c!==null&&c.first!==null&&Ct(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes_start=e.nodes_end=null}function Ct(e){var t=e.parent,r=e.prev,n=e.next;r!==null&&(r.next=n),n!==null&&(n.prev=r),t!==null&&(t.first===e&&(t.first=n),t.last===e&&(t.last=r))}function Dt(e,t){var r=[];Ge(e,r,!0),It(r,()=>{Y(e),t&&t()})}function It(e,t){var r=e.length;if(r>0){var n=()=>--r||t();for(var i of e)i.out(n)}else t()}function Ge(e,t,r){if(!(e.f&L)){if(e.f^=L,e.transitions!==null)for(const u of e.transitions)(u.is_global||r)&&t.push(u);for(var n=e.first;n!==null;){var i=n.next,l=(n.f&ft)!==0||(n.f&V)!==0;Ge(n,t,l?r:!1),n=i}}}function Pt(e){Rt(e,!0)}function Rt(e,t){if(e.f&L){e.f^=L,e.f&T||(e.f^=T),he(e)&&($(e,z),De(e));for(var r=e.first;r!==null;){var n=r.next,i=(r.f&ft)!==0||(r.f&V)!==0;Rt(r,i?t:!1),r=n}if(e.transitions!==null)for(const l of e.transitions)(l.is_global||t)&&l.in()}}let qe=!1,$e=[];function Mr(){qe=!1;const e=$e.slice();$e=[],Fe(e)}function Lt(e){qe||(qe=!0,queueMicrotask(Mr)),$e.push(e)}let Ee=!1,ke=!1,xe=null,te=!1,Xe=!1;function tt(e){te=e}function rt(e){Xe=e}let Ve=[],ve=0;let E=null,U=!1;function K(e){E=e}let w=null;function q(e){w=e}let F=null;function qr(e){F=e}let A=null,O=0,H=null;function $r(e){H=e}let Ft=1,Te=0,G=!1,m=null;function Mt(){return++Ft}function Se(){return!de||m!==null&&m.l===null}function he(e){var s;var t=e.f;if(t&z)return!0;if(t&Z){var r=e.deps,n=(t&X)!==0;if(r!==null){var i,l,u=(t&be)!==0,c=n&&w!==null&&!G,a=r.length;if(u||c){for(i=0;i<a;i++)l=r[i],(u||!((s=l==null?void 0:l.reactions)!=null&&s.includes(e)))&&(l.reactions??(l.reactions=[])).push(e);u&&(e.f^=be)}for(i=0;i<a;i++)if(l=r[i],he(l)&&bt(l),l.wv>e.wv)return!0}(!n||w!==null&&!G)&&$(e,T)}return!1}function Vr(e,t){for(var r=t;r!==null;){if(r.f&me)try{r.fn(e);return}catch{r.f^=me}r=r.parent}throw Ee=!1,e}function zr(e){return(e.f&ie)===0&&(e.parent===null||(e.parent.f&me)===0)}function Ce(e,t,r,n){if(Ee){if(r===null&&(Ee=!1),zr(t))throw e;return}r!==null&&(Ee=!0);{Vr(e,t);return}}function qt(e,t,r=0){var n=e.reactions;if(n!==null)for(var i=0;i<n.length;i++){var l=n[i];l.f&C?qt(l,t,r+1):t===l&&(r===0?$(l,z):l.f&T&&$(l,Z),De(l))}}function $t(e){var _;var t=A,r=O,n=H,i=E,l=G,u=F,c=m,a=U,s=e.f;A=null,O=0,H=null,E=s&(V|ne)?null:e,G=!te&&(s&X)!==0,F=null,m=e.ctx,U=!1,Te++;try{var v=(0,e.fn)(),o=e.deps;if(A!==null){var f;if(_e(e,O),o!==null&&O>0)for(o.length=O+A.length,f=0;f<A.length;f++)o[O+f]=A[f];else e.deps=o=A;if(!G)for(f=O;f<o.length;f++)((_=o[f]).reactions??(_.reactions=[])).push(e)}else o!==null&&O<o.length&&(_e(e,O),o.length=O);if(Se()&&H!==null&&!(e.f&(C|Z|z)))for(f=0;f<H.length;f++)qt(H[f],e);return i!==null&&Te++,v}finally{A=t,O=r,H=n,E=i,G=l,F=u,m=c,U=a}}function Br(e,t){let r=t.reactions;if(r!==null){var n=Jt.call(r,e);if(n!==-1){var i=r.length-1;i===0?r=t.reactions=null:(r[n]=r[i],r.pop())}}r===null&&t.f&C&&(A===null||!A.includes(t))&&($(t,Z),t.f&(X|be)||(t.f^=be),_e(t,0))}function _e(e,t){var r=e.deps;if(r!==null)for(var n=t;n<r.length;n++)Br(e,r[n])}function Ze(e){var t=e.f;if(!(t&ie)){$(e,T);var r=w,n=m;w=e;try{t&Ye?Fr(e):St(e),Ot(e),Nt(e);var i=$t(e);e.teardown=typeof i=="function"?i:null,e.wv=Ft;var l=e.deps,u;Je&&hr&&e.f&z}catch(c){Ce(c,e,r,n||e.ctx)}finally{w=r}}}function Hr(){if(ve>1e3){ve=0;try{cr()}catch(e){if(xe!==null)Ce(e,xe,null);else throw e}}ve++}function Ur(e){var t=e.length;if(t!==0){Hr();var r=te;te=!0;try{for(var n=0;n<t;n++){var i=e[n];i.f&T||(i.f^=T);var l=[];Vt(i,l),jr(l)}}finally{te=r}}}function jr(e){var t=e.length;if(t!==0)for(var r=0;r<t;r++){var n=e[r];if(!(n.f&(ie|L)))try{he(n)&&(Ze(n),n.deps===null&&n.first===null&&n.nodes_start===null&&(n.teardown===null?Ct(n):n.fn=null))}catch(i){Ce(i,n,null,n.ctx)}}}function Yr(){if(ke=!1,ve>1001)return;const e=Ve;Ve=[],Ur(e),ke||(ve=0,xe=null)}function De(e){ke||(ke=!0,queueMicrotask(Yr)),xe=e;for(var t=e;t.parent!==null;){t=t.parent;var r=t.f;if(r&(ne|V)){if(!(r&T))return;t.f^=T}}Ve.push(t)}function Vt(e,t){var r=e.first,n=[];e:for(;r!==null;){var i=r.f,l=(i&V)!==0,u=l&&(i&T)!==0,c=r.next;if(!u&&!(i&L))if(i&Ne){if(l)r.f^=T;else try{he(r)&&Ze(r)}catch(o){Ce(o,r,null,r.ctx)}var a=r.first;if(a!==null){r=a;continue}}else i&at&&n.push(r);if(c===null){let o=r.parent;for(;o!==null;){if(e===o)break e;var s=o.next;if(s!==null){r=s;continue e}o=o.parent}}r=c}for(var v=0;v<n.length;v++)a=n[v],t.push(a),Vt(a,t)}function y(e){var v;var t=e.f,r=(t&C)!==0;if(r&&t&ie){var n=mt(e);return Ke(e),n}if(E!==null&&!U){F!==null&&F.includes(e)&&dr();var i=E.deps;e.rv<Te&&(e.rv=Te,A===null&&i!==null&&i[O]===e?O++:A===null?A=[e]:A.push(e))}else if(r&&e.deps===null)for(var l=e,u=l.parent,c=l;u!==null;)if(u.f&C){var a=u;c=a,u=a.parent}else{var s=u;(v=s.deriveds)!=null&&v.includes(c)||(s.deriveds??(s.deriveds=[])).push(c);break}return r&&(l=e,he(l)&&bt(l)),e.v}function Kr(e){var t=U;try{return U=!0,e()}finally{U=t}}const Wr=~(z|Z|T);function $(e,t){e.f=e.f&Wr|t}function Ie(e,t=!1,r){m={p:m,c:null,e:null,m:!1,s:e,x:null,l:null},de&&!t&&(m.l={s:null,u:null,r1:[],r2:S(!1)})}function Pe(e){const t=m;if(t!==null){const u=t.e;if(u!==null){var r=w,n=E;t.e=null;try{for(var i=0;i<u.length;i++){var l=u[i];q(l.effect),K(l.reaction),xt(l.fn)}}finally{q(r),K(n)}}m=t.p,t.m=!0}return{}}function Gr(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(ce in e)ze(e);else if(!Array.isArray(e))for(let t in e){const r=e[t];typeof r=="object"&&r&&ce in r&&ze(r)}}}function ze(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let n in e)try{ze(e[n],t)}catch{}const r=je(e);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const n=st(r);for(let i in n){const l=n[i].get;if(l)try{l.call(e)}catch{}}}}}function Xr(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const Zr=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Jr(e){return Zr.includes(e)}const Qr={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject"};function en(e){return e=e.toLowerCase(),Qr[e]??e}const tn=["touchstart","touchmove"];function rn(e){return tn.includes(e)}function nn(e,t){if(t){const r=document.body;e.autofocus=!0,Lt(()=>{document.activeElement===r&&e.focus()})}}function ln(e){var t=E,r=w;K(null),q(null);try{return e()}finally{K(t),q(r)}}const zt=new Set,Be=new Set;function un(e,t,r,n){function i(l){if(n.capture||se.call(t,l),!l.cancelBubble)return ln(()=>r.call(this,l))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Lt(()=>{t.addEventListener(e,i,n)}):t.addEventListener(e,i,n),i}function on(e){for(var t=0;t<e.length;t++)zt.add(e[t]);for(var r of Be)r(e)}function se(e){var d;var t=this,r=t.ownerDocument,n=e.type,i=((d=e.composedPath)==null?void 0:d.call(e))||[],l=i[0]||e.target,u=0,c=e.__root;if(c){var a=i.indexOf(c);if(a!==-1&&(t===document||t===window)){e.__root=t;return}var s=i.indexOf(t);if(s===-1)return;a<=s&&(u=a)}if(l=i[u]||e.target,l!==t){Qt(e,"currentTarget",{configurable:!0,get(){return l||r}});var v=E,o=w;K(null),q(null);try{for(var f,_=[];l!==null;){var p=l.assignedSlot||l.parentNode||l.host||null;try{var h=l["__"+n];if(h!==void 0&&!l.disabled)if(He(h)){var[k,...P]=h;k.apply(l,[e,...P])}else h.call(l,e)}catch(g){f?_.push(g):f=g}if(e.cancelBubble||p===t||p===null)break;l=p}if(f){for(let g of _)queueMicrotask(()=>{throw g});throw f}}finally{e.__root=t,delete e.currentTarget,K(v),q(o)}}}function Bt(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function Ae(e,t){var r=w;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function Ht(e,t){var r=(t&kr)!==0,n=(t&xr)!==0,i,l=!e.startsWith("<!>");return()=>{i===void 0&&(i=Bt(l?e:"<!>"+e),r||(i=re(i)));var u=n?document.importNode(i,!0):i.cloneNode(!0);if(r){var c=re(u),a=u.lastChild;Ae(c,a)}else Ae(u,u);return u}}function sn(e,t,r="svg"){var n=!e.startsWith("<!>"),i=`<${r}>${n?e:"<!>"+e}</${r}>`,l;return()=>{if(!l){var u=Bt(i),c=re(u);l=re(c)}var a=l.cloneNode(!0);return Ae(a,a),a}}function an(){var e=document.createDocumentFragment(),t=document.createComment(""),r=yt();return e.append(t,r),Ae(t,r),e}function Re(e,t){e!==null&&e.before(t)}function fn(e,t){return cn(e,t)}const J=new Map;function cn(e,{target:t,anchor:r,props:n={},events:i,context:l,intro:u=!0}){Sr();var c=new Set,a=o=>{for(var f=0;f<o.length;f++){var _=o[f];if(!c.has(_)){c.add(_);var p=rn(_);t.addEventListener(_,se,{passive:p});var h=J.get(_);h===void 0?(document.addEventListener(_,se,{passive:p}),J.set(_,1)):J.set(_,h+1)}}};a(Ue(zt)),Be.add(a);var s=void 0,v=Rr(()=>{var o=r??t.appendChild(yt());return We(()=>{if(l){Ie({});var f=m;f.c=l}i&&(n.$$events=i),s=e(o,n)||{},l&&Pe()}),()=>{var p;for(var f of c){t.removeEventListener(f,se);var _=J.get(f);--_===0?(document.removeEventListener(f,se),J.delete(f)):J.set(f,_)}Be.delete(a),o!==r&&((p=o.parentNode)==null||p.removeChild(o))}});return vn.set(s,v),s}let vn=new WeakMap;function _n(e,t){return t}function dn(e,t,r,n){for(var i=[],l=t.length,u=0;u<l;u++)Ge(t[u].e,i,!0);var c=l>0&&i.length===0&&r!==null;if(c){var a=r.parentNode;Cr(a),a.append(r),n.clear(),j(e,t[0].prev,t[l-1].next)}It(i,()=>{for(var s=0;s<l;s++){var v=t[s];c||(n.delete(v.k),j(e,v.prev,v.next)),Y(v.e,!c)}})}function pn(e,t,r,n,i,l=null){var u=e,c={flags:t,items:new Map,first:null},a=null,s=!1,v=R(()=>{var o=r();return He(o)?o:o==null?[]:Ue(o)});At(()=>{var o=y(v),f=o.length;if(!(s&&f===0)){s=f===0;{var _=E;hn(o,c,u,i,t,(_.f&L)!==0,n)}l!==null&&(f===0?a?Pt(a):a=We(()=>l(u)):a!==null&&Dt(a,()=>{a=null})),y(v)}})}function hn(e,t,r,n,i,l,u,c){var a=e.length,s=t.items,v=t.first,o=v,f,_=null,p=[],h=[],k,P,d,g;for(g=0;g<a;g+=1){if(k=e[g],P=u(k,g),d=s.get(P),d===void 0){var D=o?o.e.nodes_start:r;_=yn(D,t,_,_===null?t.first:_.next,k,P,g,n,i),s.set(P,_),p=[],h=[],o=_.next;continue}if(gn(d,k,g),d.e.f&L&&Pt(d.e),d!==o){if(f!==void 0&&f.has(d)){if(p.length<h.length){var I=h[0],b;_=I.prev;var le=p[0],ue=p[p.length-1];for(b=0;b<p.length;b+=1)nt(p[b],I,r);for(b=0;b<h.length;b+=1)f.delete(h[b]);j(t,le.prev,ue.next),j(t,_,le),j(t,ue,I),o=I,_=ue,g-=1,p=[],h=[]}else f.delete(d),nt(d,o,r),j(t,d.prev,d.next),j(t,d,_===null?t.first:_.next),j(t,_,d),_=d;continue}for(p=[],h=[];o!==null&&o.k!==P;)(l||!(o.e.f&L))&&(f??(f=new Set)).add(o),h.push(o),o=o.next;if(o===null)continue;d=o}p.push(d),_=d,o=d.next}if(o!==null||f!==void 0){for(var Le=f===void 0?[]:Ue(f);o!==null;)(l||!(o.e.f&L))&&Le.push(o),o=o.next;var Xt=Le.length;if(Xt>0){var Zt=null;dn(t,Le,Zt,s)}}w.first=t.first&&t.first.e,w.last=_&&_.e}function gn(e,t,r,n){dt(e.v,t),e.i=r}function yn(e,t,r,n,i,l,u,c,a,s){var v=(a&yr)!==0,o=(a&Er)===0,f=v?o?Ar(i):S(i):i,_=a&wr?S(u):u,p={i:_,v:f,k:l,a:null,e:null,prev:r,next:n};try{return p.e=We(()=>c(e,f,_),Or),p.e.prev=r&&r.e,p.e.next=n&&n.e,r===null?t.first=p:(r.next=p,r.e.next=p.e),n!==null&&(n.prev=p,n.e.prev=p.e),p}finally{}}function nt(e,t,r){for(var n=e.next?e.next.e.nodes_start:r,i=t?t.e.nodes_start:r,l=e.e.nodes_start;l!==n;){var u=Oe(l);i.before(l),l=u}}function j(e,t,r){t===null?e.first=r:(t.next=r,t.e.next=r&&r.e),r!==null&&(r.prev=t,r.e.prev=t&&t.e)}function Ut(e){var t,r,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(r=Ut(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function wn(){for(var e,t,r=0,n="",i=arguments.length;r<i;r++)(e=arguments[r])&&(t=Ut(e))&&(n&&(n+=" "),n+=t);return n}function En(e){return typeof e=="object"?wn(e):e??""}function mn(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function jt(e,t,r,n){var i=e.__attributes??(e.__attributes={});i[t]!==(i[t]=r)&&(t==="style"&&"__styles"in e&&(e.__styles={}),t==="loading"&&(e[ur]=r),r==null?e.removeAttribute(t):typeof r!="string"&&Yt(e).includes(t)?e[t]=r:e.setAttribute(t,r))}function bn(e,t,r,n,i=!1,l=!1,u=!1){var c=t||{},a=e.tagName==="OPTION";for(var s in t)s in r||(r[s]=null);r.class&&(r.class=En(r.class));var v=Yt(e),o=e.__attributes??(e.__attributes={});for(const d in r){let g=r[d];if(a&&d==="value"&&g==null){e.value=e.__value="",c[d]=g;continue}var f=c[d];if(g!==f){c[d]=g;var _=d[0]+d[1];if(_!=="$$"){if(_==="on"){const D={},I="$$"+d;let b=d.slice(2);var p=Jr(b);if(Xr(b)&&(b=b.slice(0,-7),D.capture=!0),!p&&f){if(g!=null)continue;e.removeEventListener(b,c[I],D),c[I]=null}if(g!=null)if(p)e[`__${b}`]=g,on([b]);else{let le=function(ue){c[d].call(this,ue)};var P=le;c[I]=un(b,e,le,D)}else p&&(e[`__${b}`]=void 0)}else if(d==="style"&&g!=null)e.style.cssText=g+"";else if(d==="autofocus")nn(e,!!g);else if(d==="__value"||d==="value"&&g!=null)e.value=e[d]=e.__value=g;else if(d==="selected"&&a)mn(e,g);else{var h=d;i||(h=en(h));var k=h==="defaultValue"||h==="defaultChecked";if(g==null&&!l&&!k)if(o[d]=null,h==="value"||h==="checked"){let D=e;if(h==="value"){let I=D.defaultValue;D.removeAttribute(h),D.defaultValue=I}else{let I=D.defaultChecked;D.removeAttribute(h),D.defaultChecked=I}}else e.removeAttribute(d);else k||v.includes(h)&&(l||typeof g!="string")?e[h]=g:typeof g!="function"&&jt(e,h,g)}d==="style"&&"__styles"in e&&(e.__styles={})}}}return c}var it=new Map;function Yt(e){var t=it.get(e.nodeName);if(t)return t;it.set(e.nodeName,t=[]);for(var r,n=e,i=Element.prototype;i!==n;){r=st(n);for(var l in r)r[l].set&&t.push(l);n=je(n)}return t}function Kt(e=!1){const t=m,r=t.l.u;if(!r)return;let n=()=>Gr(t.s);if(e){let i=0,l={};const u=x(()=>{let c=!1;const a=t.s;for(const s in a)a[s]!==l[s]&&(l[s]=a[s],c=!0);return c&&i++,i});n=()=>y(u)}r.b.length&&Pr(()=>{lt(t,n),Fe(r.b)}),Me(()=>{const i=Kr(()=>r.m.map(rr));return()=>{for(const l of i)typeof l=="function"&&l()}}),r.a.length&&Me(()=>{lt(t,n),Fe(r.a)})}function lt(e,t){if(e.l.s)for(const r of e.l.s)y(r);t()}const kn={get(e,t){if(!e.exclude.includes(t))return e.props[t]},set(e,t){return!1},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function xn(e,t,r){return new Proxy({props:e,exclude:t},kn)}function Tn(e){for(var t=w,r=w;t!==null&&!(t.f&(V|ne));)t=t.parent;try{return q(t),e()}finally{q(r)}}function ut(e,t,r,n){var i=(r&mr)!==0,l=!de||(r&br)!==0,u;u=e[t];var c=n,a=!0,s=()=>(a&&(a=!1,c=n),c);u===void 0&&n!==void 0&&(u=s());var v;if(l)v=()=>{var f=e[t];return f===void 0?s():(a=!0,f)};else{var o=Tn(()=>(i?x:R)(()=>e[t]));o.f|=ir,v=()=>{var f=y(o);return f!==void 0&&(c=void 0),f===void 0?c:f}}return v}const An="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(An);gr();const Q=e=>{},M=60,ge=(e,t=1)=>`rotate(${(e*360).toFixed(t)})`;var Nn=sn("<line></line>");function ae(e,t){let r=ut(t,"limit",3,94),n=ut(t,"graduation",3,!1),i=xn(t,["$$slots","$$events","$$legacy","length","limit","graduation"]);var l=Nn();let u;Tt(()=>u=bn(l,u,{"stroke-linecap":"round",y1:n()?t.length-r():void 0,y2:-(n()?r():t.length),...i},void 0,!0)),Re(e,l)}function On(e,t){Ie(t,!1),Kt();var r=an(),n=wt(r);pn(n,1,()=>({length:M}),_n,(i,l,u)=>{const c=R(()=>u%5===0),a=R(()=>ge(u/M,0));var s=R(()=>y(a)),v=R(()=>y(c)?"stroke-zinc-600 stroke-2 dark:stroke-zinc-200":"stroke-zinc-200 dark:stroke-zinc-600"),o=R(()=>y(c)?6:2.5);const f=R(()=>Q());var _=R(()=>y(f));ae(i,{get transform(){return y(s)},get class(){return y(v)},get length(){return y(o)},graduation:!0,get"data-testid"(){return y(_)}})}),Re(e,r),Pe()}const ot=M/5,Wt=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3;let ye=Tr(W(Wt()));const Sn=x(()=>ge(y(ye)%1,0)),Cn=x(()=>ge(y(ye)%M/M)),Dn=x(()=>ge(y(ye)/M%M/M)),In=x(()=>ge(y(ye)/M/M%ot/ot)),oe={update:()=>{B(ye,W(Wt()))},get subsecond(){return y(Sn)},get second(){return y(Cn)},get minute(){return y(Dn)},get hour(){return y(In)}};var Pn=Ht("<!> <!> <!> <!>",1);function Rn(e,t){Ie(t,!0),Me(()=>{let h=requestAnimationFrame(function k(){oe.update(),h=requestAnimationFrame(k)});return()=>{cancelAnimationFrame(h)}});var r=Pn(),n=wt(r);const i=x(()=>Q());var l=x(()=>y(i));ae(n,{get transform(){return oe.subsecond},class:"stroke-zinc-200 stroke-3 dark:stroke-zinc-600",length:82,get"data-testid"(){return y(l)}});var u=ee(n,2);const c=x(()=>Q());var a=x(()=>y(c));ae(u,{get transform(){return oe.hour},class:"stroke-zinc-600 stroke-4 dark:stroke-zinc-200",length:46,get"data-testid"(){return y(a)}});var s=ee(u,2);const v=x(()=>Q());var o=x(()=>y(v));ae(s,{get transform(){return oe.minute},class:"stroke-zinc-400 stroke-3",length:64,get"data-testid"(){return y(o)}});var f=ee(s,2);const _=x(()=>Q());var p=x(()=>y(_));ae(f,{get transform(){return oe.second},class:"stroke-svelte stroke-2",length:76,get"data-testid"(){return y(p)}}),Re(e,r),Pe()}var Ln=Ht('<div class="grid h-screen place-content-center dark:bg-zinc-800"><svg viewBox="0 0 200 200" class="h-[95vmin]"><image class="size-1/6 translate-5/12" href="logo.svg"></image><g class="translate-1/2"><circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200" r="98"></circle><!></g><g class="translate-1/2"><!></g></svg></div>');function Fn(e,t){Ie(t,!1),Kt();var r=Ln(),n=we(r),i=ee(we(n)),l=ee(we(i));On(l,{});var u=ee(i),c=we(u);Rn(c,{}),Tt(a=>jt(r,"data-testid",a),[()=>Q()],R),Re(e,r),Pe()}const Gt=document.querySelector("#root");if(!Gt)throw new Error("#root element not found");fn(Fn,{target:Gt});
