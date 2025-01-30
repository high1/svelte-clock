(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const u of i)if(u.type==="childList")for(const o of u.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const u={};return i.integrity&&(u.integrity=i.integrity),i.referrerPolicy&&(u.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?u.credentials="include":i.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function n(i){if(i.ep)return;i.ep=!0;const u=r(i);fetch(i.href,u)}})();const Ze=!1;var Be=Array.isArray,Xt=Array.prototype.indexOf,He=Array.from,Zt=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,st=Object.getOwnPropertyDescriptors,Jt=Object.prototype,Qt=Array.prototype,Ue=Object.getPrototypeOf;function er(e){return e()}function Fe(e){for(var t=0;t<e.length;t++)e[t]()}const P=2,ft=4,Ne=8,je=16,V=32,ie=64,me=128,L=256,be=512,A=1024,$=2048,Z=4096,H=8192,ue=16384,tr=32768,at=65536,rr=1<<17,nr=1<<19,ct=1<<20,ce=Symbol("$state"),ir=Symbol("");function vt(e){return e===this.v}function ur(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function _t(e){return!ur(e,this.v)}function lr(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function or(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function sr(e){throw new Error("https://svelte.dev/e/effect_orphan")}function fr(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function ar(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function cr(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function vr(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function _r(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let de=!1,dr=!1;function pr(){de=!0}const hr=1,gr=2,yr=16,wr=1,Er=2,mr=1,br=2,O=Symbol();let b=null;function Je(e){b=e}function Oe(e,t=!1,r){b={p:b,c:null,e:null,m:!1,s:e,x:null,l:null},de&&!t&&(b.l={s:null,u:null,r1:[],r2:C(!1)})}function Se(e){const t=b;if(t!==null){const o=t.e;if(o!==null){var r=g,n=E;t.e=null;try{for(var i=0;i<o.length;i++){var u=o[i];M(u.effect),W(u.reaction),kt(u.fn)}}finally{M(r),W(n)}}b=t.p,t.m=!0}return{}}function Ce(){return!de||b!==null&&b.l===null}function C(e,t){var r={f:0,v:e,reactions:null,equals:vt,rv:0,wv:0};return r}function kr(e){return Tr(C(e))}function xr(e,t=!1){var n;const r=C(e);return t||(r.equals=_t),de&&b!==null&&b.l!==null&&((n=b.l).s??(n.s=[])).push(r),r}function Tr(e){return E!==null&&!U&&E.f&P&&(R===null?Mr([e]):R.push(e)),e}function z(e,t){return E!==null&&!U&&Ce()&&E.f&(P|je)&&(R===null||!R.includes(e))&&_r(),dt(e,t)}function dt(e,t){return e.equals(t)||(e.v,e.v=t,e.wv=Ft(),pt(e,$),Ce()&&g!==null&&g.f&A&&!(g.f&(V|ie))&&(B===null?qr([e]):B.push(e))),t}function pt(e,t){var r=e.reactions;if(r!==null)for(var n=Ce(),i=r.length,u=0;u<i;u++){var o=r[u],v=o.f;v&$||!n&&o===g||(q(o,t),v&(A|L)&&(v&P?pt(o,Z):Pe(o)))}}let Ar=!1;function G(e,t=null,r){if(typeof e!="object"||e===null||ce in e)return e;const n=Ue(e);if(n!==Jt&&n!==Qt)return e;var i=new Map,u=Be(e),o=C(0);u&&i.set("length",C(e.length));var v;return new Proxy(e,{defineProperty(a,s,f){(!("value"in f)||f.configurable===!1||f.enumerable===!1||f.writable===!1)&&ar();var c=i.get(s);return c===void 0?(c=C(f.value),i.set(s,c)):z(c,G(f.value,v)),!0},deleteProperty(a,s){var f=i.get(s);if(f===void 0)s in a&&i.set(s,C(O));else{if(u&&typeof s=="string"){var c=i.get("length"),l=Number(s);Number.isInteger(l)&&l<c.v&&z(c,l)}z(f,O),Qe(o)}return!0},get(a,s,f){var d;if(s===ce)return e;var c=i.get(s),l=s in a;if(c===void 0&&(!l||(d=ae(a,s))!=null&&d.writable)&&(c=C(G(l?a[s]:O,v)),i.set(s,c)),c!==void 0){var _=w(c);return _===O?void 0:_}return Reflect.get(a,s,f)},getOwnPropertyDescriptor(a,s){var f=Reflect.getOwnPropertyDescriptor(a,s);if(f&&"value"in f){var c=i.get(s);c&&(f.value=w(c))}else if(f===void 0){var l=i.get(s),_=l==null?void 0:l.v;if(l!==void 0&&_!==O)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return f},has(a,s){var _;if(s===ce)return!0;var f=i.get(s),c=f!==void 0&&f.v!==O||Reflect.has(a,s);if(f!==void 0||g!==null&&(!c||(_=ae(a,s))!=null&&_.writable)){f===void 0&&(f=C(c?G(a[s],v):O),i.set(s,f));var l=w(f);if(l===O)return!1}return c},set(a,s,f,c){var y;var l=i.get(s),_=s in a;if(u&&s==="length")for(var d=f;d<l.v;d+=1){var h=i.get(d+"");h!==void 0?z(h,O):d in a&&(h=C(O),i.set(d+"",h))}l===void 0?(!_||(y=ae(a,s))!=null&&y.writable)&&(l=C(void 0),z(l,G(f,v)),i.set(s,l)):(_=l.v!==O,z(l,G(f,v)));var x=Reflect.getOwnPropertyDescriptor(a,s);if(x!=null&&x.set&&x.set.call(c,f),!_){if(u&&typeof s=="string"){var m=i.get("length"),p=Number(s);Number.isInteger(p)&&p>=m.v&&z(m,p+1)}Qe(o)}return!0},ownKeys(a){w(o);var s=Reflect.ownKeys(a).filter(l=>{var _=i.get(l);return _===void 0||_.v!==O});for(var[f,c]of i)c.v!==O&&!(f in a)&&s.push(f);return s},setPrototypeOf(){cr()}})}function Qe(e,t=1){z(e,e.v+t)}var et,ht,gt;function Nr(){if(et===void 0){et=window;var e=Element.prototype,t=Node.prototype;ht=ae(t,"firstChild").get,gt=ae(t,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}function yt(e=""){return document.createTextNode(e)}function ne(e){return ht.call(e)}function De(e){return gt.call(e)}function we(e,t){return ne(e)}function wt(e,t){{var r=ne(e);return r instanceof Comment&&r.data===""?De(r):r}}function te(e,t=1,r=!1){let n=e;for(;t--;)n=De(n);return n}function Or(e){e.textContent=""}function I(e){var t=P|$,r=E!==null&&E.f&P?E:null;return g===null||r!==null&&r.f&L?t|=L:g.f|=ct,{ctx:b,deps:null,effects:null,equals:vt,f:t,fn:e,reactions:null,rv:0,v:null,wv:0,parent:r??g}}function Y(e){const t=I(e);return t.equals=_t,t}function Ye(e){var t=e.effects;if(t!==null){e.effects=null;for(var r=0;r<t.length;r+=1)K(t[r])}}function Sr(e){for(var t=e.parent;t!==null;){if(!(t.f&P))return t;t=t.parent}return null}function Et(e){var t,r=g;M(Sr(e));try{Ye(e),t=Mt(e)}finally{M(r)}return t}function mt(e){var t=Et(e),r=(X||e.f&L)&&e.deps!==null?Z:A;q(e,r),e.equals(t)||(e.v=t,e.wv=Ft())}function Cr(e){Ye(e),_e(e,0),q(e,ue),e.v=e.deps=e.ctx=e.reactions=null}function bt(e){g===null&&E===null&&sr(),E!==null&&E.f&L&&g===null&&or(),Ge&&lr()}function Dr(e,t){var r=t.last;r===null?t.last=t.first=e:(r.next=e,e.prev=r,t.last=e)}function pe(e,t,r,n=!0){var i=(e&ie)!==0,u=g,o={ctx:b,deps:null,nodes_start:null,nodes_end:null,f:e|$,first:null,fn:t,last:null,next:null,parent:i?null:u,prev:null,teardown:null,transitions:null,wv:0};if(r){var v=re;try{tt(!0),Xe(o),o.f|=tr}catch(f){throw K(o),f}finally{tt(v)}}else t!==null&&Pe(o);var a=r&&o.deps===null&&o.first===null&&o.nodes_start===null&&o.teardown===null&&(o.f&(ct|me))===0;if(!a&&!i&&n&&(u!==null&&Dr(o,u),E!==null&&E.f&P)){var s=E;(s.effects??(s.effects=[])).push(o)}return o}function Le(e){bt();var t=g!==null&&(g.f&V)!==0&&b!==null&&!b.m;if(t){var r=b;(r.e??(r.e=[])).push({fn:e,effect:g,reaction:E})}else{var n=kt(e);return n}}function Ir(e){return bt(),Rr(e)}function Pr(e){const t=pe(ie,e,!0);return(r={})=>new Promise(n=>{r.outro?St(t,()=>{K(t),n(void 0)}):(K(t),n(void 0))})}function kt(e){return pe(ft,e,!1)}function Rr(e){return pe(Ne,e,!0)}function xt(e,t=[],r=I){const n=t.map(r);return Tt(()=>e(...n.map(w)))}function Tt(e,t=0){return pe(Ne|je|t,e,!0)}function Ke(e,t=!0){return pe(Ne|V,e,!0,t)}function At(e){var t=e.teardown;if(t!==null){const r=Ge,n=E;rt(!0),W(null);try{t.call(null)}finally{rt(r),W(n)}}}function Nt(e,t=!1){var r=e.first;for(e.first=e.last=null;r!==null;){var n=r.next;K(r,t),r=n}}function Fr(e){for(var t=e.first;t!==null;){var r=t.next;t.f&V||K(t),t=r}}function K(e,t=!0){var r=!1;if((t||e.f&nr)&&e.nodes_start!==null){for(var n=e.nodes_start,i=e.nodes_end;n!==null;){var u=n===i?null:De(n);n.remove(),n=u}r=!0}Nt(e,t&&!r),_e(e,0),q(e,ue);var o=e.transitions;if(o!==null)for(const a of o)a.stop();At(e);var v=e.parent;v!==null&&v.first!==null&&Ot(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes_start=e.nodes_end=null}function Ot(e){var t=e.parent,r=e.prev,n=e.next;r!==null&&(r.next=n),n!==null&&(n.prev=r),t!==null&&(t.first===e&&(t.first=n),t.last===e&&(t.last=r))}function St(e,t){var r=[];We(e,r,!0),Ct(r,()=>{K(e),t&&t()})}function Ct(e,t){var r=e.length;if(r>0){var n=()=>--r||t();for(var i of e)i.out(n)}else t()}function We(e,t,r){if(!(e.f&H)){if(e.f^=H,e.transitions!==null)for(const o of e.transitions)(o.is_global||r)&&t.push(o);for(var n=e.first;n!==null;){var i=n.next,u=(n.f&at)!==0||(n.f&V)!==0;We(n,t,u?r:!1),n=i}}}function Dt(e){It(e,!0)}function It(e,t){if(e.f&H){e.f^=H,e.f&A||(e.f^=A),he(e)&&(q(e,$),Pe(e));for(var r=e.first;r!==null;){var n=r.next,i=(r.f&at)!==0||(r.f&V)!==0;It(r,i?t:!1),r=n}if(e.transitions!==null)for(const u of e.transitions)(u.is_global||t)&&u.in()}}let Me=!1,qe=[];function Lr(){Me=!1;const e=qe.slice();qe=[],Fe(e)}function Pt(e){Me||(Me=!0,queueMicrotask(Lr)),qe.push(e)}let Ee=!1,ke=!1,xe=null,re=!1,Ge=!1;function tt(e){re=e}function rt(e){Ge=e}let Ve=[],ve=0;let E=null,U=!1;function W(e){E=e}let g=null;function M(e){g=e}let R=null;function Mr(e){R=e}let N=null,S=0,B=null;function qr(e){B=e}let Rt=1,Te=0,X=!1;function Ft(){return++Rt}function he(e){var s;var t=e.f;if(t&$)return!0;if(t&Z){var r=e.deps,n=(t&L)!==0;if(r!==null){var i,u,o=(t&be)!==0,v=n&&g!==null&&!X,a=r.length;if(o||v){for(i=0;i<a;i++)u=r[i],(o||!((s=u==null?void 0:u.reactions)!=null&&s.includes(e)))&&(u.reactions??(u.reactions=[])).push(e);o&&(e.f^=be)}for(i=0;i<a;i++)if(u=r[i],he(u)&&mt(u),u.wv>e.wv)return!0}(!n||g!==null&&!X)&&q(e,A)}return!1}function Vr(e,t){for(var r=t;r!==null;){if(r.f&me)try{r.fn(e);return}catch{r.f^=me}r=r.parent}throw Ee=!1,e}function $r(e){return(e.f&ue)===0&&(e.parent===null||(e.parent.f&me)===0)}function Ie(e,t,r,n){if(Ee){if(r===null&&(Ee=!1),$r(t))throw e;return}r!==null&&(Ee=!0);{Vr(e,t);return}}function Lt(e,t,r=0){var n=e.reactions;if(n!==null)for(var i=0;i<n.length;i++){var u=n[i];u.f&P?Lt(u,t,r+1):t===u&&(r===0?q(u,$):u.f&A&&q(u,Z),Pe(u))}}function Mt(e){var _;var t=N,r=S,n=B,i=E,u=X,o=R,v=b,a=U,s=e.f;N=null,S=0,B=null,E=s&(V|ie)?null:e,X=(s&L)!==0&&(!re||(i===null||a)&&e.parent!==null),R=null,Je(e.ctx),U=!1,Te++;try{var f=(0,e.fn)(),c=e.deps;if(N!==null){var l;if(_e(e,S),c!==null&&S>0)for(c.length=S+N.length,l=0;l<N.length;l++)c[S+l]=N[l];else e.deps=c=N;if(!X)for(l=S;l<c.length;l++)((_=c[l]).reactions??(_.reactions=[])).push(e)}else c!==null&&S<c.length&&(_e(e,S),c.length=S);if(Ce()&&B!==null&&!(e.f&(P|Z|$)))for(l=0;l<B.length;l++)Lt(B[l],e);return i!==null&&Te++,f}finally{N=t,S=r,B=n,E=i,X=u,R=o,Je(v),U=a}}function zr(e,t){let r=t.reactions;if(r!==null){var n=Xt.call(r,e);if(n!==-1){var i=r.length-1;i===0?r=t.reactions=null:(r[n]=r[i],r.pop())}}r===null&&t.f&P&&(N===null||!N.includes(t))&&(q(t,Z),t.f&(L|be)||(t.f^=be),Ye(t),_e(t,0))}function _e(e,t){var r=e.deps;if(r!==null)for(var n=t;n<r.length;n++)zr(e,r[n])}function Xe(e){var t=e.f;if(!(t&ue)){q(e,A);var r=g,n=b;g=e;try{t&je?Fr(e):Nt(e),At(e);var i=Mt(e);e.teardown=typeof i=="function"?i:null,e.wv=Rt;var u=e.deps,o;Ze&&dr&&e.f&$}catch(v){Ie(v,e,r,n||e.ctx)}finally{g=r}}}function Br(){if(ve>1e3){ve=0;try{fr()}catch(e){if(xe!==null)Ie(e,xe,null);else throw e}}ve++}function Hr(e){var t=e.length;if(t!==0){Br();var r=re;re=!0;try{for(var n=0;n<t;n++){var i=e[n];i.f&A||(i.f^=A);var u=[];qt(i,u),Ur(u)}}finally{re=r}}}function Ur(e){var t=e.length;if(t!==0)for(var r=0;r<t;r++){var n=e[r];if(!(n.f&(ue|H)))try{he(n)&&(Xe(n),n.deps===null&&n.first===null&&n.nodes_start===null&&(n.teardown===null?Ot(n):n.fn=null))}catch(i){Ie(i,n,null,n.ctx)}}}function jr(){if(ke=!1,ve>1001)return;const e=Ve;Ve=[],Hr(e),ke||(ve=0,xe=null)}function Pe(e){ke||(ke=!0,queueMicrotask(jr)),xe=e;for(var t=e;t.parent!==null;){t=t.parent;var r=t.f;if(r&(ie|V)){if(!(r&A))return;t.f^=A}}Ve.push(t)}function qt(e,t){var r=e.first,n=[];e:for(;r!==null;){var i=r.f,u=(i&V)!==0,o=u&&(i&A)!==0,v=r.next;if(!o&&!(i&H))if(i&Ne){if(u)r.f^=A;else{var a=E;try{E=r,he(r)&&Xe(r)}catch(l){Ie(l,r,null,r.ctx)}finally{E=a}}var s=r.first;if(s!==null){r=s;continue}}else i&ft&&n.push(r);if(v===null){let l=r.parent;for(;l!==null;){if(e===l)break e;var f=l.next;if(f!==null){r=f;continue e}l=l.parent}}r=v}for(var c=0;c<n.length;c++)s=n[c],t.push(s),qt(s,t)}function w(e){var t=e.f,r=(t&P)!==0;if(r&&t&ue){var n=Et(e);return Cr(e),n}if(E!==null&&!U){R!==null&&R.includes(e)&&vr();var i=E.deps;e.rv<Te&&(e.rv=Te,N===null&&i!==null&&i[S]===e?S++:N===null?N=[e]:N.push(e))}else if(r&&e.deps===null&&e.effects===null){var u=e,o=u.parent;o!==null&&!(o.f&L)&&(u.f^=L)}return r&&(u=e,he(u)&&mt(u)),e.v}function Yr(e){var t=U;try{return U=!0,e()}finally{U=t}}const Kr=~($|Z|A);function q(e,t){e.f=e.f&Kr|t}function Wr(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(ce in e)$e(e);else if(!Array.isArray(e))for(let t in e){const r=e[t];typeof r=="object"&&r&&ce in r&&$e(r)}}}function $e(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let n in e)try{$e(e[n],t)}catch{}const r=Ue(e);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const n=st(r);for(let i in n){const u=n[i].get;if(u)try{u.call(e)}catch{}}}}}function Gr(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const Xr=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Zr(e){return Xr.includes(e)}const Jr={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Qr(e){return e=e.toLowerCase(),Jr[e]??e}const en=["touchstart","touchmove"];function tn(e){return en.includes(e)}function rn(e,t){if(t){const r=document.body;e.autofocus=!0,Pt(()=>{document.activeElement===r&&e.focus()})}}function nn(e){var t=E,r=g;W(null),M(null);try{return e()}finally{W(t),M(r)}}const Vt=new Set,ze=new Set;function un(e,t,r,n={}){function i(u){if(n.capture||se.call(t,u),!u.cancelBubble)return nn(()=>r==null?void 0:r.call(this,u))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Pt(()=>{t.addEventListener(e,i,n)}):t.addEventListener(e,i,n),i}function ln(e){for(var t=0;t<e.length;t++)Vt.add(e[t]);for(var r of ze)r(e)}function se(e){var p;var t=this,r=t.ownerDocument,n=e.type,i=((p=e.composedPath)==null?void 0:p.call(e))||[],u=i[0]||e.target,o=0,v=e.__root;if(v){var a=i.indexOf(v);if(a!==-1&&(t===document||t===window)){e.__root=t;return}var s=i.indexOf(t);if(s===-1)return;a<=s&&(o=a)}if(u=i[o]||e.target,u!==t){Zt(e,"currentTarget",{configurable:!0,get(){return u||r}});var f=E,c=g;W(null),M(null);try{for(var l,_=[];u!==null;){var d=u.assignedSlot||u.parentNode||u.host||null;try{var h=u["__"+n];if(h!==void 0&&!u.disabled)if(Be(h)){var[x,...m]=h;x.apply(u,[e,...m])}else h.call(u,e)}catch(y){l?_.push(y):l=y}if(e.cancelBubble||d===t||d===null)break;u=d}if(l){for(let y of _)queueMicrotask(()=>{throw y});throw l}}finally{e.__root=t,delete e.currentTarget,W(f),M(c)}}}function $t(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function Ae(e,t){var r=g;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function zt(e,t){var r=(t&mr)!==0,n=(t&br)!==0,i,u=!e.startsWith("<!>");return()=>{i===void 0&&(i=$t(u?e:"<!>"+e),r||(i=ne(i)));var o=n?document.importNode(i,!0):i.cloneNode(!0);if(r){var v=ne(o),a=o.lastChild;Ae(v,a)}else Ae(o,o);return o}}function on(e,t,r="svg"){var n=!e.startsWith("<!>"),i=`<${r}>${n?e:"<!>"+e}</${r}>`,u;return()=>{if(!u){var o=$t(i),v=ne(o);u=ne(v)}var a=u.cloneNode(!0);return Ae(a,a),a}}function sn(){var e=document.createDocumentFragment(),t=document.createComment(""),r=yt();return e.append(t,r),Ae(t,r),e}function Re(e,t){e!==null&&e.before(t)}function fn(e,t){return an(e,t)}const Q=new Map;function an(e,{target:t,anchor:r,props:n={},events:i,context:u,intro:o=!0}){Nr();var v=new Set,a=c=>{for(var l=0;l<c.length;l++){var _=c[l];if(!v.has(_)){v.add(_);var d=tn(_);t.addEventListener(_,se,{passive:d});var h=Q.get(_);h===void 0?(document.addEventListener(_,se,{passive:d}),Q.set(_,1)):Q.set(_,h+1)}}};a(He(Vt)),ze.add(a);var s=void 0,f=Pr(()=>{var c=r??t.appendChild(yt());return Ke(()=>{if(u){Oe({});var l=b;l.c=u}i&&(n.$$events=i),s=e(c,n)||{},u&&Se()}),()=>{var d;for(var l of v){t.removeEventListener(l,se);var _=Q.get(l);--_===0?(document.removeEventListener(l,se),Q.delete(l)):Q.set(l,_)}ze.delete(a),c!==r&&((d=c.parentNode)==null||d.removeChild(c))}});return cn.set(s,f),s}let cn=new WeakMap;function vn(e,t){return t}function _n(e,t,r,n){for(var i=[],u=t.length,o=0;o<u;o++)We(t[o].e,i,!0);var v=u>0&&i.length===0&&r!==null;if(v){var a=r.parentNode;Or(a),a.append(r),n.clear(),j(e,t[0].prev,t[u-1].next)}Ct(i,()=>{for(var s=0;s<u;s++){var f=t[s];v||(n.delete(f.k),j(e,f.prev,f.next)),K(f.e,!v)}})}function dn(e,t,r,n,i,u=null){var o=e,v={flags:t,items:new Map,first:null},a=null,s=!1,f=Y(()=>{var c=r();return Be(c)?c:c==null?[]:He(c)});Tt(()=>{var c=w(f),l=c.length;s&&l===0||(s=l===0,pn(c,v,o,i,t,n,r),u!==null&&(l===0?a?Dt(a):a=Ke(()=>u(o)):a!==null&&St(a,()=>{a=null})),w(f))})}function pn(e,t,r,n,i,u,o){var v=e.length,a=t.items,s=t.first,f=s,c,l=null,_=[],d=[],h,x,m,p;for(p=0;p<v;p+=1){if(h=e[p],x=u(h,p),m=a.get(x),m===void 0){var y=f?f.e.nodes_start:r;l=gn(y,t,l,l===null?t.first:l.next,h,x,p,n,i,o),a.set(x,l),_=[],d=[],f=l.next;continue}if(hn(m,h,p),m.e.f&H&&Dt(m.e),m!==f){if(c!==void 0&&c.has(m)){if(_.length<d.length){var T=d[0],k;l=T.prev;var D=_[0],J=_[_.length-1];for(k=0;k<_.length;k+=1)nt(_[k],T,r);for(k=0;k<d.length;k+=1)c.delete(d[k]);j(t,D.prev,J.next),j(t,l,D),j(t,J,T),f=T,l=J,p-=1,_=[],d=[]}else c.delete(m),nt(m,f,r),j(t,m.prev,m.next),j(t,m,l===null?t.first:l.next),j(t,l,m),l=m;continue}for(_=[],d=[];f!==null&&f.k!==x;)f.e.f&H||(c??(c=new Set)).add(f),d.push(f),f=f.next;if(f===null)continue;m=f}_.push(m),l=m,f=m.next}if(f!==null||c!==void 0){for(var le=c===void 0?[]:He(c);f!==null;)f.e.f&H||le.push(f),f=f.next;var Wt=le.length;if(Wt>0){var Gt=null;_n(t,le,Gt,a)}}g.first=t.first&&t.first.e,g.last=l&&l.e}function hn(e,t,r,n){dt(e.v,t),e.i=r}function gn(e,t,r,n,i,u,o,v,a,s){var f=(a&hr)!==0,c=(a&yr)===0,l=f?c?xr(i):C(i):i,_=a&gr?C(o):o,d={i:_,v:l,k:u,a:null,e:null,prev:r,next:n};try{return d.e=Ke(()=>v(e,l,_,s),Ar),d.e.prev=r&&r.e,d.e.next=n&&n.e,r===null?t.first=d:(r.next=d,r.e.next=d.e),n!==null&&(n.prev=d,n.e.prev=d.e),d}finally{}}function nt(e,t,r){for(var n=e.next?e.next.e.nodes_start:r,i=t?t.e.nodes_start:r,u=e.e.nodes_start;u!==n;){var o=De(u);i.before(u),u=o}}function j(e,t,r){t===null?e.first=r:(t.next=r,t.e.next=r&&r.e),r!==null&&(r.prev=t,r.e.prev=t&&t.e)}function Bt(e){var t,r,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(r=Bt(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function yn(){for(var e,t,r=0,n="",i=arguments.length;r<i;r++)(e=arguments[r])&&(t=Bt(e))&&(n&&(n+=" "),n+=t);return n}function wn(e){return typeof e=="object"?yn(e):e??""}function En(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function Ht(e,t,r,n){var i=e.__attributes??(e.__attributes={});i[t]!==(i[t]=r)&&(t==="style"&&"__styles"in e&&(e.__styles={}),t==="loading"&&(e[ir]=r),r==null?e.removeAttribute(t):typeof r!="string"&&Ut(e).includes(t)?e[t]=r:e.setAttribute(t,r))}function mn(e,t,r,n,i=!1,u=!1,o=!1){var v=t||{},a=e.tagName==="OPTION";for(var s in t)s in r||(r[s]=null);r.class&&(r.class=wn(r.class));var f=Ut(e),c=e.__attributes??(e.__attributes={});for(const p in r){let y=r[p];if(a&&p==="value"&&y==null){e.value=e.__value="",v[p]=y;continue}var l=v[p];if(y!==l){v[p]=y;var _=p[0]+p[1];if(_!=="$$"){if(_==="on"){const T={},k="$$"+p;let D=p.slice(2);var d=Zr(D);if(Gr(D)&&(D=D.slice(0,-7),T.capture=!0),!d&&l){if(y!=null)continue;e.removeEventListener(D,v[k],T),v[k]=null}if(y!=null)if(d)e[`__${D}`]=y,ln([D]);else{let J=function(le){v[p].call(this,le)};var m=J;v[k]=un(D,e,J,T)}else d&&(e[`__${D}`]=void 0)}else if(p==="style"&&y!=null)e.style.cssText=y+"";else if(p==="autofocus")rn(e,!!y);else if(p==="__value"||p==="value"&&y!=null)e.value=e[p]=e.__value=y;else if(p==="selected"&&a)En(e,y);else{var h=p;i||(h=Qr(h));var x=h==="defaultValue"||h==="defaultChecked";if(y==null&&!u&&!x)if(c[p]=null,h==="value"||h==="checked"){let T=e;if(h==="value"){let k=T.defaultValue;T.removeAttribute(h),T.defaultValue=k}else{let k=T.defaultChecked;T.removeAttribute(h),T.defaultChecked=k}}else e.removeAttribute(p);else x||f.includes(h)&&(u||typeof y!="string")?e[h]=y:typeof y!="function"&&Ht(e,h,y)}p==="style"&&"__styles"in e&&(e.__styles={})}}}return v}var it=new Map;function Ut(e){var t=it.get(e.nodeName);if(t)return t;it.set(e.nodeName,t=[]);for(var r,n=e,i=Element.prototype;i!==n;){r=st(n);for(var u in r)r[u].set&&t.push(u);n=Ue(n)}return t}function jt(e=!1){const t=b,r=t.l.u;if(!r)return;let n=()=>Wr(t.s);if(e){let i=0,u={};const o=I(()=>{let v=!1;const a=t.s;for(const s in a)a[s]!==u[s]&&(u[s]=a[s],v=!0);return v&&i++,i});n=()=>w(o)}r.b.length&&Ir(()=>{ut(t,n),Fe(r.b)}),Le(()=>{const i=Yr(()=>r.m.map(er));return()=>{for(const u of i)typeof u=="function"&&u()}}),r.a.length&&Le(()=>{ut(t,n),Fe(r.a)})}function ut(e,t){if(e.l.s)for(const r of e.l.s)w(r);t()}const bn={get(e,t){if(!e.exclude.includes(t))return e.props[t]},set(e,t){return!1},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function kn(e,t,r){return new Proxy({props:e,exclude:t},bn)}function xn(e){for(var t=g,r=g;t!==null&&!(t.f&(V|ie));)t=t.parent;try{return M(t),e()}finally{M(r)}}function lt(e,t,r,n){var i=(r&wr)!==0,u=!de||(r&Er)!==0,o;o=e[t];var v=n,a=!0,s=()=>(a&&(a=!1,v=n),v);o===void 0&&n!==void 0&&(o=s());var f;if(u)f=()=>{var l=e[t];return l===void 0?s():(a=!0,l)};else{var c=xn(()=>(i?I:Y)(()=>e[t]));c.f|=rr,f=()=>{var l=w(c);return l!==void 0&&(v=void 0),l===void 0?v:l}}return f}const Tn="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Tn);pr();const ee=e=>{},F=60,ge=(e,t=1)=>`rotate(${(e*360).toFixed(t)})`;var An=on("<line></line>");function fe(e,t){let r=lt(t,"limit",3,94),n=lt(t,"graduation",3,!1),i=kn(t,["$$slots","$$events","$$legacy","length","limit","graduation"]);var u=An();let o;xt(()=>o=mn(u,o,{"stroke-linecap":"round",y1:n()?t.length-r():void 0,y2:-(n()?r():t.length),...i},void 0,!0)),Re(e,u)}function Nn(e,t){Oe(t,!1),jt();var r=sn(),n=wt(r);dn(n,1,()=>({length:F}),vn,(i,u,o)=>{const v=Y(()=>o%5===0),a=Y(()=>ge(o/F,0)),s=Y(()=>w(v)?"stroke-zinc-600 stroke-2 dark:stroke-zinc-200":"stroke-zinc-200 dark:stroke-zinc-600"),f=Y(()=>w(v)?6:2.5),c=Y(()=>ee());fe(i,{get transform(){return w(a)},get class(){return w(s)},get length(){return w(f)},graduation:!0,get"data-testid"(){return w(c)}})}),Re(e,r),Se()}const ot=F/5,Yt=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3;let ye=kr(G(Yt()));const On=I(()=>ge(w(ye)%1,0)),Sn=I(()=>ge(w(ye)%F/F)),Cn=I(()=>ge(w(ye)/F%F/F)),Dn=I(()=>ge(w(ye)/F/F%ot/ot)),oe={update:()=>{z(ye,G(Yt()))},get subsecond(){return w(On)},get second(){return w(Sn)},get minute(){return w(Cn)},get hour(){return w(Dn)}};var In=zt("<!> <!> <!> <!>",1);function Pn(e,t){Oe(t,!0),Le(()=>{let c=requestAnimationFrame(function l(){oe.update(),c=requestAnimationFrame(l)});return()=>{cancelAnimationFrame(c)}});var r=In(),n=wt(r);const i=I(()=>ee());fe(n,{get transform(){return oe.subsecond},class:"stroke-zinc-200 stroke-3 dark:stroke-zinc-600",length:82,get"data-testid"(){return w(i)}});var u=te(n,2);const o=I(()=>ee());fe(u,{get transform(){return oe.hour},class:"stroke-zinc-600 stroke-4 dark:stroke-zinc-200",length:46,get"data-testid"(){return w(o)}});var v=te(u,2);const a=I(()=>ee());fe(v,{get transform(){return oe.minute},class:"stroke-zinc-400 stroke-3",length:64,get"data-testid"(){return w(a)}});var s=te(v,2);const f=I(()=>ee());fe(s,{get transform(){return oe.second},class:"stroke-svelte stroke-2",length:76,get"data-testid"(){return w(f)}}),Re(e,r),Se()}var Rn=zt('<div class="grid h-screen place-content-center dark:bg-zinc-800"><svg viewBox="0 0 200 200" class="h-[95vmin]"><image class="size-1/6 translate-5/12" href="logo.svg"></image><g class="translate-1/2"><circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200" r="98"></circle><!></g><g class="translate-1/2"><!></g></svg></div>');function Fn(e,t){Oe(t,!1),jt();var r=Rn(),n=we(r),i=te(we(n)),u=te(we(i));Nn(u,{});var o=te(i),v=we(o);Pn(v,{}),xt(a=>Ht(r,"data-testid",a),[()=>ee()],Y),Re(e,r),Se()}const Kt=document.querySelector("#root");if(!Kt)throw new Error("#root element not found");fn(Fn,{target:Kt});
