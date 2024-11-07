(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const u of i)if(u.type==="childList")for(const s of u.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const u={};return i.integrity&&(u.integrity=i.integrity),i.referrerPolicy&&(u.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?u.credentials="include":i.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function n(i){if(i.ep)return;i.ep=!0;const u=t(i);fetch(i.href,u)}})();const Ir=!1;var Te=Array.isArray,Ne=Array.from,Dr=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,Cr=Object.getOwnPropertyDescriptors,Rr=Object.prototype,Pr=Array.prototype,Ee=Object.getPrototypeOf;function Lr(e){for(var r=0;r<e.length;r++)e[r]()}const z=2,We=4,Oe=8,Ae=16,F=32,de=64,Y=128,ce=256,C=512,V=1024,le=2048,P=4096,se=8192,Fr=16384,Ye=32768,Mr=1<<18,Ge=1<<19,we=Symbol("$state"),qr=Symbol("");function je(e){return e===this.v}function zr(e,r){return e!=e?r==r:e!==r||e!==null&&typeof e=="object"||typeof e=="function"}function $r(e){return!zr(e,this.v)}function Br(e){throw new Error("effect_in_teardown")}function Hr(){throw new Error("effect_in_unowned_derived")}function Vr(e){throw new Error("effect_orphan")}function Ur(){throw new Error("effect_update_depth_exceeded")}function Kr(e){throw new Error("props_invalid_value")}function Wr(){throw new Error("state_descriptors_fixed")}function Yr(){throw new Error("state_prototype_fixed")}function Gr(){throw new Error("state_unsafe_local_read")}function jr(){throw new Error("state_unsafe_mutation")}function D(e){return{f:0,v:e,reactions:null,equals:je,version:0}}function Xr(e){return Jr(D(e))}function Zr(e,r=!1){var n;const t=D(e);return r||(t.equals=$r),m!==null&&m.l!==null&&((n=m.l).s??(n.s=[])).push(t),t}function Jr(e){return y!==null&&y.f&z&&(L===null?ht([e]):L.push(e)),e}function q(e,r){return y!==null&&Le()&&y.f&(z|Ae)&&(L===null||!L.includes(e))&&jr(),Xe(e,r)}function Xe(e,r){return e.equals(r)||(e.v=r,e.version=dr(),Ze(e,V),Le()&&g!==null&&g.f&C&&!(g.f&F)&&(x!==null&&x.includes(e)?($(g,V),ge(g)):H===null?pt([e]):H.push(e))),r}function Ze(e,r){var t=e.reactions;if(t!==null)for(var n=Le(),i=t.length,u=0;u<i;u++){var s=t[u],v=s.f;v&V||!n&&s===g||($(s,r),v&(C|Y)&&(v&z?Ze(s,le):ge(s)))}}const Qr=1,et=2,rt=16,tt=2,nt=2,A=Symbol();let ut=!1;function W(e,r=null,t){if(typeof e!="object"||e===null||we in e)return e;const n=Ee(e);if(n!==Rr&&n!==Pr)return e;var i=new Map,u=Te(e),s=D(0);u&&i.set("length",D(e.length));var v;return new Proxy(e,{defineProperty(c,o,l){(!("value"in l)||l.configurable===!1||l.enumerable===!1||l.writable===!1)&&Wr();var f=i.get(o);return f===void 0?(f=D(l.value),i.set(o,f)):q(f,W(l.value,v)),!0},deleteProperty(c,o){var l=i.get(o);if(l===void 0)o in c&&i.set(o,D(A));else{if(u&&typeof o=="string"){var f=i.get("length"),a=Number(o);Number.isInteger(a)&&a<f.v&&q(f,a)}q(l,A),Me(s)}return!0},get(c,o,l){var d;if(o===we)return e;var f=i.get(o),a=o in c;if(f===void 0&&(!a||(d=Q(c,o))!=null&&d.writable)&&(f=D(W(a?c[o]:A,v)),i.set(o,f)),f!==void 0){var _=k(f);return _===A?void 0:_}return Reflect.get(c,o,l)},getOwnPropertyDescriptor(c,o){var l=Reflect.getOwnPropertyDescriptor(c,o);if(l&&"value"in l){var f=i.get(o);f&&(l.value=k(f))}else if(l===void 0){var a=i.get(o),_=a==null?void 0:a.v;if(a!==void 0&&_!==A)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return l},has(c,o){var _;if(o===we)return!0;var l=i.get(o),f=l!==void 0&&l.v!==A||Reflect.has(c,o);if(l!==void 0||g!==null&&(!f||(_=Q(c,o))!=null&&_.writable)){l===void 0&&(l=D(f?W(c[o],v):A),i.set(o,l));var a=k(l);if(a===A)return!1}return f},set(c,o,l,f){var p;var a=i.get(o),_=o in c;if(u&&o==="length")for(var d=l;d<a.v;d+=1){var E=i.get(d+"");E!==void 0?q(E,A):d in c&&(E=D(A),i.set(d+"",E))}a===void 0?(!_||(p=Q(c,o))!=null&&p.writable)&&(a=D(void 0),q(a,W(l,v)),i.set(o,a)):(_=a.v!==A,q(a,W(l,v)));var b=Reflect.getOwnPropertyDescriptor(c,o);if(b!=null&&b.set&&b.set.call(f,l),!_){if(u&&typeof o=="string"){var w=i.get("length"),h=Number(o);Number.isInteger(h)&&h>=w.v&&q(w,h+1)}Me(s)}return!0},ownKeys(c){k(s);var o=Reflect.ownKeys(c).filter(a=>{var _=i.get(a);return _===void 0||_.v!==A});for(var[l,f]of i)f.v!==A&&!(l in c)&&o.push(l);return o},setPrototypeOf(){Yr()}})}function Me(e,r=1){q(e,e.v+r)}var qe,Je,Qe;function it(){if(qe===void 0){qe=window;var e=Element.prototype,r=Node.prototype;Je=Q(r,"firstChild").get,Qe=Q(r,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}function lt(e=""){return document.createTextNode(e)}function ve(e){return Je.call(e)}function Se(e){return Qe.call(e)}function fe(e,r){return ve(e)}function re(e,r=1,t=!1){let n=e;for(;r--;)n=Se(n);return n}function st(e){e.textContent=""}function S(e){var r=z|V;g===null?r|=Y:g.f|=Ge;const t={children:null,ctx:m,deps:null,equals:je,f:r,fn:e,reactions:null,v:null,version:0,parent:g};if(y!==null&&y.f&z){var n=y;(n.children??(n.children=[])).push(t)}return t}function er(e){var r=e.children;if(r!==null){e.children=null;for(var t=0;t<r.length;t+=1){var n=r[t];n.f&z?Ie(n):G(n)}}}function rr(e){var r,t=g;K(e.parent);try{er(e),r=hr(e)}finally{K(t)}return r}function tr(e){var r=rr(e),t=(J||e.f&Y)&&e.deps!==null?le:C;$(e,t),e.equals(r)||(e.v=r,e.version=dr())}function Ie(e){er(e),ie(e,0),$(e,se),e.v=e.children=e.deps=e.ctx=e.reactions=null}function ot(e){g===null&&y===null&&Vr(),y!==null&&y.f&Y&&Hr(),Pe&&Br()}function at(e,r){var t=r.last;t===null?r.last=r.first=e:(t.next=e,e.prev=t,r.last=e)}function he(e,r,t,n=!0){var i=(e&de)!==0,u=g,s={ctx:m,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:e|V,first:null,fn:r,last:null,next:null,parent:i?null:u,prev:null,teardown:null,transitions:null,version:0};if(t){var v=ee;try{ze(!0),pe(s),s.f|=Fr}catch(l){throw G(s),l}finally{ze(v)}}else r!==null&&ge(s);var c=t&&s.deps===null&&s.first===null&&s.nodes_start===null&&s.teardown===null&&(s.f&Ge)===0;if(!c&&!i&&n&&(u!==null&&at(s,u),y!==null&&y.f&z)){var o=y;(o.children??(o.children=[])).push(s)}return s}function ft(e){ot();var r=g!==null&&(g.f&F)!==0&&m!==null&&!m.m;if(r){var t=m;(t.e??(t.e=[])).push({fn:e,effect:g,reaction:y})}else{var n=nr(e);return n}}function ct(e){const r=he(de,e,!0);return()=>{G(r)}}function nr(e){return he(We,e,!1)}function ur(e){return ir(e)}function ir(e,r=0){return he(Oe|Ae|r,e,!0)}function De(e,r=!0){return he(Oe|F,e,!0,r)}function lr(e){var r=e.teardown;if(r!==null){const t=Pe,n=y;$e(!0),U(null);try{r.call(null)}finally{$e(t),U(n)}}}function sr(e){var r=e.deriveds;if(r!==null){e.deriveds=null;for(var t=0;t<r.length;t+=1)Ie(r[t])}}function or(e,r=!1){var t=e.first;for(e.first=e.last=null;t!==null;){var n=t.next;G(t,r),t=n}}function vt(e){for(var r=e.first;r!==null;){var t=r.next;r.f&F||G(r),r=t}}function G(e,r=!0){var t=!1;if((r||e.f&Mr)&&e.nodes_start!==null){for(var n=e.nodes_start,i=e.nodes_end;n!==null;){var u=n===i?null:Se(n);n.remove(),n=u}t=!0}or(e,r&&!t),sr(e),ie(e,0),$(e,se);var s=e.transitions;if(s!==null)for(const c of s)c.stop();lr(e);var v=e.parent;v!==null&&v.first!==null&&ar(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.parent=e.fn=e.nodes_start=e.nodes_end=null}function ar(e){var r=e.parent,t=e.prev,n=e.next;t!==null&&(t.next=n),n!==null&&(n.prev=t),r!==null&&(r.first===e&&(r.first=n),r.last===e&&(r.last=t))}function _t(e,r){var t=[];Ce(e,t,!0),fr(t,()=>{G(e),r&&r()})}function fr(e,r){var t=e.length;if(t>0){var n=()=>--t||r();for(var i of e)i.out(n)}else r()}function Ce(e,r,t){if(!(e.f&P)){if(e.f^=P,e.transitions!==null)for(const s of e.transitions)(s.is_global||t)&&r.push(s);for(var n=e.first;n!==null;){var i=n.next,u=(n.f&Ye)!==0||(n.f&F)!==0;Ce(n,r,u?t:!1),n=i}}}function cr(e){vr(e,!0)}function vr(e,r){if(e.f&P){oe(e)&&pe(e),e.f^=P;for(var t=e.first;t!==null;){var n=t.next,i=(t.f&Ye)!==0||(t.f&F)!==0;vr(t,i?r:!1),t=n}if(e.transitions!==null)for(const u of e.transitions)(u.is_global||r)&&u.in()}}let ke=!1,be=[];function dt(){ke=!1;const e=be.slice();be=[],Lr(e)}function Re(e){ke||(ke=!0,queueMicrotask(dt)),be.push(e)}let _e=!1,ee=!1,Pe=!1;function ze(e){ee=e}function $e(e){Pe=e}let me=[],ue=0;let y=null;function U(e){y=e}let g=null;function K(e){g=e}let L=null;function ht(e){L=e}let x=null,I=0,H=null;function pt(e){H=e}let _r=0,J=!1,m=null;function dr(){return++_r}function Le(){return m!==null&&m.l===null}function oe(e){var s,v;var r=e.f;if(r&V)return!0;if(r&le){var t=e.deps,n=(r&Y)!==0;if(t!==null){var i;if(r&ce){for(i=0;i<t.length;i++)((s=t[i]).reactions??(s.reactions=[])).push(e);e.f^=ce}for(i=0;i<t.length;i++){var u=t[i];if(oe(u)&&tr(u),n&&g!==null&&!J&&!((v=u==null?void 0:u.reactions)!=null&&v.includes(e))&&(u.reactions??(u.reactions=[])).push(e),u.version>e.version)return!0}}n||$(e,C)}return!1}function gt(e,r,t){throw e}function hr(e){var a;var r=x,t=I,n=H,i=y,u=J,s=L,v=m,c=e.f;x=null,I=0,H=null,y=c&(F|de)?null:e,J=!ee&&(c&Y)!==0,L=null,m=e.ctx;try{var o=(0,e.fn)(),l=e.deps;if(x!==null){var f;if(ie(e,I),l!==null&&I>0)for(l.length=I+x.length,f=0;f<x.length;f++)l[I+f]=x[f];else e.deps=l=x;if(!J)for(f=I;f<l.length;f++)((a=l[f]).reactions??(a.reactions=[])).push(e)}else l!==null&&I<l.length&&(ie(e,I),l.length=I);return o}finally{x=r,I=t,H=n,y=i,J=u,L=s,m=v}}function wt(e,r){let t=r.reactions;if(t!==null){var n=t.indexOf(e);if(n!==-1){var i=t.length-1;i===0?t=r.reactions=null:(t[n]=t[i],t.pop())}}t===null&&r.f&z&&(x===null||!x.includes(r))&&($(r,le),r.f&(Y|ce)||(r.f^=ce),ie(r,0))}function ie(e,r){var t=e.deps;if(t!==null)for(var n=r;n<t.length;n++)wt(e,t[n])}function pe(e){var r=e.f;if(!(r&se)){$(e,C);var t=g;g=e;try{r&Ae?vt(e):or(e),sr(e),lr(e);var n=hr(e);e.teardown=typeof n=="function"?n:null,e.version=_r}catch(i){gt(i)}finally{g=t}}}function yt(){ue>1e3&&(ue=0,Ur()),ue++}function Et(e){var r=e.length;if(r!==0){yt();var t=ee;ee=!0;try{for(var n=0;n<r;n++){var i=e[n];i.f&C||(i.f^=C);var u=[];pr(i,u),kt(u)}}finally{ee=t}}}function kt(e){var r=e.length;if(r!==0)for(var t=0;t<r;t++){var n=e[t];!(n.f&(se|P))&&oe(n)&&(pe(n),n.deps===null&&n.first===null&&n.nodes_start===null&&(n.teardown===null?ar(n):n.fn=null))}}function bt(){if(_e=!1,ue>1001)return;const e=me;me=[],Et(e),_e||(ue=0)}function ge(e){_e||(_e=!0,queueMicrotask(bt));for(var r=e;r.parent!==null;){r=r.parent;var t=r.f;if(t&(de|F)){if(!(t&C))return;r.f^=C}}me.push(r)}function pr(e,r){var t=e.first,n=[];e:for(;t!==null;){var i=t.f,u=(i&F)!==0,s=u&&(i&C)!==0;if(!s&&!(i&P))if(i&Oe){u?t.f^=C:oe(t)&&pe(t);var v=t.first;if(v!==null){t=v;continue}}else i&We&&n.push(t);var c=t.next;if(c===null){let f=t.parent;for(;f!==null;){if(e===f)break e;var o=f.next;if(o!==null){t=o;continue e}f=f.parent}}t=c}for(var l=0;l<n.length;l++)v=n[l],r.push(v),pr(v,r)}function k(e){var v;var r=e.f,t=(r&z)!==0;if(t&&r&se){var n=rr(e);return Ie(e),n}if(y!==null){L!==null&&L.includes(e)&&Gr();var i=y.deps;x===null&&i!==null&&i[I]===e?I++:x===null?x=[e]:x.push(e),H!==null&&g!==null&&g.f&C&&!(g.f&F)&&H.includes(e)&&($(g,V),ge(g))}else if(t&&e.deps===null){var u=e,s=u.parent;s!==null&&!((v=s.deriveds)!=null&&v.includes(u))&&(s.deriveds??(s.deriveds=[])).push(u)}return t&&(u=e,oe(u)&&tr(u)),e.v}const mt=~(V|le|C);function $(e,r){e.f=e.f&mt|r}function gr(e,r=!1,t){m={p:m,c:null,e:null,m:!1,s:e,x:null,l:null},r||(m.l={s:null,u:null,r1:[],r2:D(!1)})}function wr(e){const r=m;if(r!==null){const s=r.e;if(s!==null){var t=g,n=y;r.e=null;try{for(var i=0;i<s.length;i++){var u=s[i];K(u.effect),U(u.reaction),nr(u.fn)}}finally{K(t),U(n)}}m=r.p,r.m=!0}return{}}const yr=new Set,xe=new Set;function Be(e,r,t,n){function i(u){if(n.capture||ne.call(r,u),!u.cancelBubble){var s=y,v=g;U(null),K(null);try{return t.call(this,u)}finally{U(s),K(v)}}}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Re(()=>{r.addEventListener(e,i,n)}):r.addEventListener(e,i,n),i}function xt(e){for(var r=0;r<e.length;r++)yr.add(e[r]);for(var t of xe)t(e)}function ne(e){var h;var r=this,t=r.ownerDocument,n=e.type,i=((h=e.composedPath)==null?void 0:h.call(e))||[],u=i[0]||e.target,s=0,v=e.__root;if(v){var c=i.indexOf(v);if(c!==-1&&(r===document||r===window)){e.__root=r;return}var o=i.indexOf(r);if(o===-1)return;c<=o&&(s=c)}if(u=i[s]||e.target,u!==r){Dr(e,"currentTarget",{configurable:!0,get(){return u||t}});var l=y,f=g;U(null),K(null);try{for(var a,_=[];u!==null;){var d=u.assignedSlot||u.parentNode||u.host||null;try{var E=u["__"+n];if(E!==void 0&&!u.disabled)if(Te(E)){var[b,...w]=E;b.apply(u,[e,...w])}else E.call(u,e)}catch(p){a?_.push(p):a=p}if(e.cancelBubble||d===r||d===null)break;u=d}if(a){for(let p of _)queueMicrotask(()=>{throw p});throw a}}finally{e.__root=r,delete e.currentTarget,U(l),K(f)}}}function Er(e){var r=document.createElement("template");return r.innerHTML=e,r.content}function kr(e,r){var t=g;t.nodes_start===null&&(t.nodes_start=e,t.nodes_end=r)}function Tt(e,r){var t=(r&nt)!==0,n,i=!e.startsWith("<!>");return()=>{n===void 0&&(n=Er(i?e:"<!>"+e),n=ve(n));var u=t?document.importNode(n,!0):n.cloneNode(!0);return kr(u,u),u}}function Nt(e,r,t="svg"){var n=!e.startsWith("<!>"),i=`<${t}>${n?e:"<!>"+e}</${t}>`,u;return()=>{if(!u){var s=Er(i),v=ve(s);u=ve(v)}var c=u.cloneNode(!0);return kr(c,c),c}}function br(e,r){e!==null&&e.before(r)}function Ot(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const At=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function St(e){return At.includes(e)}const It={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"};function Dt(e){return e=e.toLowerCase(),It[e]??e}const Ct=["touchstart","touchmove"];function Rt(e){return Ct.includes(e)}function Pt(e,r){return Lt(e,r)}const X=new Map;function Lt(e,{target:r,anchor:t,props:n={},events:i,context:u,intro:s=!0}){it();var v=new Set,c=f=>{for(var a=0;a<f.length;a++){var _=f[a];if(!v.has(_)){v.add(_);var d=Rt(_);r.addEventListener(_,ne,{passive:d});var E=X.get(_);E===void 0?(document.addEventListener(_,ne,{passive:d}),X.set(_,1)):X.set(_,E+1)}}};c(Ne(yr)),xe.add(c);var o=void 0,l=ct(()=>{var f=t??r.appendChild(lt());return De(()=>{if(u){gr({});var a=m;a.c=u}i&&(n.$$events=i),o=e(f,n)||{},u&&wr()}),()=>{var d;for(var a of v){r.removeEventListener(a,ne);var _=X.get(a);--_===0?(document.removeEventListener(a,ne),X.delete(a)):X.set(a,_)}xe.delete(c),He.delete(o),f!==t&&((d=f.parentNode)==null||d.removeChild(f))}});return He.set(o,l),o}let He=new WeakMap,ye=null;function Ft(e,r){return r}function Mt(e,r,t,n){for(var i=[],u=r.length,s=0;s<u;s++)Ce(r[s].e,i,!0);var v=u>0&&i.length===0&&t!==null;if(v){var c=t.parentNode;st(c),c.append(t),n.clear(),B(e,r[0].prev,r[u-1].next)}fr(i,()=>{for(var o=0;o<u;o++){var l=r[o];v||(n.delete(l.k),B(e,l.prev,l.next)),G(l.e,!v)}})}function qt(e,r,t,n,i,u=null){var s=e,v={flags:r,items:new Map,first:null},c=null,o=!1;ir(()=>{var l=t(),f=Te(l)?l:l==null?[]:Ne(l),a=f.length;if(!(o&&a===0)){o=a===0;{var _=y;zt(f,v,s,i,r,(_.f&P)!==0,n)}u!==null&&(a===0?c?cr(c):c=De(()=>u(s)):c!==null&&_t(c,()=>{c=null}))}})}function zt(e,r,t,n,i,u,s){var v=e.length,c=r.items,o=r.first,l=o,f,a=null,_=[],d=[],E,b,w,h;for(h=0;h<v;h+=1){if(E=e[h],b=s(E,h),w=c.get(b),w===void 0){var p=l?l.e.nodes_start:t;a=Bt(p,r,a,a===null?r.first:a.next,E,b,h,n,i),c.set(b,a),_=[],d=[],l=a.next;continue}if($t(w,E,h),w.e.f&P&&cr(w.e),w!==l){if(f!==void 0&&f.has(w)){if(_.length<d.length){var N=d[0],T;a=N.prev;var O=_[0],M=_[_.length-1];for(T=0;T<_.length;T+=1)Ve(_[T],N,t);for(T=0;T<d.length;T+=1)f.delete(d[T]);B(r,O.prev,M.next),B(r,a,O),B(r,M,N),l=N,a=M,h-=1,_=[],d=[]}else f.delete(w),Ve(w,l,t),B(r,w.prev,w.next),B(r,w,a===null?r.first:a.next),B(r,a,w),a=w;continue}for(_=[],d=[];l!==null&&l.k!==b;)(u||!(l.e.f&P))&&(f??(f=new Set)).add(l),d.push(l),l=l.next;if(l===null)continue;w=l}_.push(w),a=w,l=w.next}if(l!==null||f!==void 0){for(var R=f===void 0?[]:Ne(f);l!==null;)(u||!(l.e.f&P))&&R.push(l),l=l.next;var j=R.length;if(j>0){var ae=null;Mt(r,R,ae,c)}}g.first=r.first&&r.first.e,g.last=a&&a.e}function $t(e,r,t,n){Xe(e.v,r),e.i=t}function Bt(e,r,t,n,i,u,s,v,c){var o=ye;try{var l=(c&Qr)!==0,f=(c&rt)===0,a=l?f?Zr(i):D(i):i,_=c&et?D(s):s,d={i:_,v:a,k:u,a:null,e:null,prev:t,next:n};return ye=d,d.e=De(()=>v(e,a,_),ut),d.e.prev=t&&t.e,d.e.next=n&&n.e,t===null?r.first=d:(t.next=d,t.e.next=d.e),n!==null&&(n.prev=d,n.e.prev=d.e),d}finally{ye=o}}function Ve(e,r,t){for(var n=e.next?e.next.e.nodes_start:t,i=r?r.e.nodes_start:t,u=e.e.nodes_start;u!==n;){var s=Se(u);i.before(u),u=s}}function B(e,r,t){r===null?e.first=t:(r.next=t,r.e.next=t&&t.e),t!==null&&(t.prev=r,t.e.prev=r&&r.e)}function Ht(e,r){if(r){const t=document.body;e.autofocus=!0,Re(()=>{document.activeElement===t&&e.focus()})}}function mr(e,r,t,n){var i=e.__attributes??(e.__attributes={});i[r]!==(i[r]=t)&&(r==="style"&&"__styles"in e&&(e.__styles={}),r==="loading"&&(e[qr]=t),t==null?e.removeAttribute(r):typeof t!="string"&&xr(e).includes(r)?e[r]=t:e.setAttribute(r,t))}function Vt(e,r,t,n,i=!1,u=!1,s=!1){var v=r||{},c=e.tagName==="OPTION";for(var o in r)o in t||(t[o]=null);var l=xr(e),f=e.__attributes??(e.__attributes={}),a=[];for(const h in t){let p=t[h];if(c&&h==="value"&&p==null){e.value=e.__value="",v[h]=p;continue}var _=v[h];if(p!==_){v[h]=p;var d=h[0]+h[1];if(d!=="$$"){if(d==="on"){const N={},T="$$"+h;let O=h.slice(2);var E=St(O);if(Ot(O)&&(O=O.slice(0,-7),N.capture=!0),!E&&_){if(p!=null)continue;e.removeEventListener(O,v[T],N),v[T]=null}if(p!=null)if(E)e[`__${O}`]=p,xt([O]);else{let M=function(R){v[h].call(this,R)};var w=M;r?v[T]=Be(O,e,M,N):a.push([h,p,()=>v[T]=Be(O,e,M,N)])}}else if(h==="style"&&p!=null)e.style.cssText=p+"";else if(h==="autofocus")Ht(e,!!p);else if(h==="__value"||h==="value"&&p!=null)e.value=e[h]=e.__value=p;else{var b=h;i||(b=Dt(b)),p==null&&!u?(f[h]=null,e.removeAttribute(h)):l.includes(b)&&(u||typeof p!="string")?e[b]=p:typeof p!="function"&&mr(e,b,p)}h==="style"&&"__styles"in e&&(e.__styles={})}}}return r||Re(()=>{if(e.isConnected)for(const[h,p,N]of a)v[h]===p&&N()}),v}var Ue=new Map;function xr(e){var r=Ue.get(e.nodeName);if(r)return r;Ue.set(e.nodeName,r=[]);for(var t,n=Ee(e),i=Element.prototype;i!==n;){t=Cr(n);for(var u in t)t[u].set&&r.push(u);n=Ee(n)}return r}const Ut={get(e,r){if(!e.exclude.includes(r))return e.props[r]},set(e,r){return!1},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function Kt(e,r,t){return new Proxy({props:e,exclude:r},Ut)}function Ke(e,r,t,n){var f;var i=(t&tt)!==0,u;u=e[r];var s=(f=Q(e,r))==null?void 0:f.set,v=n,c=!0,o=()=>(c&&(c=!1,v=n),v);u===void 0&&n!==void 0&&(s&&i&&Kr(),u=o(),s&&s(u));var l;return l=()=>{var a=e[r];return a===void 0?o():(c=!0,a)},l}const Wt="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Wt);const Z=e=>{};var Yt=Nt("<line></line>");function te(e,r){let t=Ke(r,"limit",3,94),n=Ke(r,"graduation",3,!1),i=Kt(r,["$$slots","$$events","$$legacy","length","limit","graduation"]);var u=Yt();let s;ur(()=>s=Vt(u,s,{"stroke-linecap":"round",y1:n()?r.length-t():void 0,y2:-(n()?t():r.length),...i},void 0,!0)),br(e,u)}var Gt=Tt('<div class="grid h-screen place-content-center dark:bg-zinc-800"><svg viewBox="0 0 200 200" class="h-[95vmin]"><g class="translate-1/2"><circle class="fill-none stroke-zinc-600 dark:stroke-zinc-200" r="98"></circle><!></g><g class="translate-1/2"><!><!><!><!></g></svg></div>');function jt(e,r){gr(r,!0);const t=60,n=t/5,i=()=>(Date.now()-new Date().setHours(0,0,0,0))/1e3,u=(R,j=1)=>`rotate(${(R*360).toFixed(j)})`;let s=Xr(W(i())),v=S(()=>u(k(s)%1,0)),c=S(()=>u(k(s)%t/t)),o=S(()=>u(k(s)/t%t/t)),l=S(()=>u(k(s)/t/t%n/n));ft(()=>{let R=requestAnimationFrame(function j(){q(s,W(i())),R=requestAnimationFrame(j)});return()=>{cancelAnimationFrame(R)}});var f=Gt();ur(()=>mr(f,"data-testid",Z()));var a=fe(f),_=fe(a),d=re(fe(_));qt(d,17,()=>({length:t}),Ft,(R,j,ae)=>{const Fe=S(()=>ae%5===0);var Nr=S(()=>u(ae/t,0)),Or=S(()=>k(Fe)?"stroke-2 stroke-zinc-600 dark:stroke-zinc-200":"stroke-zinc-200 dark:stroke-zinc-600"),Ar=S(()=>k(Fe)?6:2.5),Sr=S(()=>Z());te(R,{get transform(){return k(Nr)},get class(){return k(Or)},get length(){return k(Ar)},graduation:!0,get"data-testid"(){return k(Sr)}})});var E=re(_),b=fe(E),w=S(()=>Z());te(b,{get transform(){return k(v)},class:"stroke-3 stroke-zinc-200 dark:stroke-zinc-600",length:82,get"data-testid"(){return k(w)}});var h=re(b),p=S(()=>Z());te(h,{get transform(){return k(l)},class:"stroke-zinc-600 dark:stroke-zinc-200 stroke-4",length:46,get"data-testid"(){return k(p)}});var N=re(h),T=S(()=>Z());te(N,{get transform(){return k(o)},class:"stroke-3 stroke-zinc-400",length:64,get"data-testid"(){return k(T)}});var O=re(N),M=S(()=>Z());te(O,{get transform(){return k(c)},class:"stroke-2 stroke-svelte",length:76,get"data-testid"(){return k(M)}}),br(e,f),wr()}const Tr=document.querySelector("#root");if(!Tr)throw new Error("#root element not found");Pt(jt,{target:Tr});
