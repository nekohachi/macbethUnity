(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const af="modulepreload",cf=function(i){return"/macbethUnity/app/"+i},kc={},Bc=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=o(e.map(l=>{if(l=cf(l),l in kc)return;kc[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":af,h||(f.as="script"),f.crossOrigin="",f.href=l,c&&f.setAttribute("nonce",c),document.head.appendChild(f),h)return new Promise((d,g)=>{f.addEventListener("load",d),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rc="185",lf=0,zc=1,hf=2,Lr=1,uf=2,Rs=3,vi=0,We=1,Ve=2,Jn=0,rs=1,Vc=2,Hc=3,Gc=4,ff=5,Ri=100,df=101,pf=102,mf=103,gf=104,vf=200,xf=201,_f=202,Mf=203,jo=204,Qo=205,yf=206,Sf=207,bf=208,wf=209,Ef=210,Tf=211,Af=212,Cf=213,Rf=214,ta=0,ea=1,na=2,ls=3,ia=4,sa=5,ra=6,oa=7,oc=0,Pf=1,Lf=2,In=0,Bh=1,zh=2,Vh=3,Hh=4,Gh=5,Wh=6,Xh=7,$h=300,Di=301,hs=302,eo=303,no=304,qr=306,Ui=1e3,Zn=1001,aa=1002,Ce=1003,If=1004,Ks=1005,ke=1006,io=1007,Li=1008,Ke=1009,qh=1010,Yh=1011,Ns=1012,ac=1013,Fn=1014,Pn=1015,Qn=1016,cc=1017,lc=1018,Fs=1020,Kh=35902,Zh=35899,Jh=1021,jh=1022,gn=1023,ti=1026,Ii=1027,Qh=1028,hc=1029,Ni=1030,uc=1031,fc=1033,Ir=33776,Dr=33777,Ur=33778,Nr=33779,ca=35840,la=35841,ha=35842,ua=35843,fa=36196,da=37492,pa=37496,ma=37488,ga=37489,Or=37490,va=37491,xa=37808,_a=37809,Ma=37810,ya=37811,Sa=37812,ba=37813,wa=37814,Ea=37815,Ta=37816,Aa=37817,Ca=37818,Ra=37819,Pa=37820,La=37821,Ia=36492,Da=36494,Ua=36495,Na=36283,Fa=36284,kr=36285,Oa=36286,Df=3200,ka=0,Uf=1,di="",en="srgb",Br="srgb-linear",zr="linear",ee="srgb",Vi=7680,Wc=519,Nf=512,Ff=513,Of=514,dc=515,kf=516,Bf=517,pc=518,zf=519,Xc=35044,$c="300 es",Ln=2e3,Os=2001;function Vf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Vr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hf(){const i=Vr("canvas");return i.style.display="block",i}const qc={};function Yc(...i){const t="THREE."+i.shift();console.log(t,...i)}function tu(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ut(...i){i=tu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Yt(...i){i=tu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function os(...i){const t=i.join(" ");t in qc||(qc[t]=!0,Ut(...i))}function Gf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Wf={[ta]:ea,[na]:ra,[ia]:oa,[ls]:sa,[ea]:ta,[ra]:na,[oa]:ia,[sa]:ls};class Oi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],so=Math.PI/180,Ba=180/Math.PI;function zs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function qt(i,t,e){return Math.max(t,Math.min(e,i))}function Xf(i,t){return(i%t+t)%t}function ro(i,t,e){return(1-e)*i+e*t}function gs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ge(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Xt{static{Xt.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],g=r[o+2],v=r[o+3];if(u!==v||c!==f||l!==d||h!==g){let m=c*f+l*d+h*g+u*v;m<0&&(f=-f,d=-d,g=-g,v=-v,m=-m);let p=1-a;if(m<.9995){const _=Math.acos(m),y=Math.sin(_);p=Math.sin(p*_)/y,a=Math.sin(a*_)/y,c=c*p+f*a,l=l*p+d*a,h=h*p+g*a,u=u*p+v*a}else{c=c*p+f*a,l=l*p+d*a,h=h*p+g*a,u=u*p+v*a;const _=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=_,l*=_,h*=_,u*=_}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{static{I.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return oo.copy(this).projectOnVector(t),this.sub(oo)}reflect(t){return this.sub(oo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oo=new I,Kc=new je;class kt{static{kt.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],v=s[0],m=s[3],p=s[6],_=s[1],y=s[4],M=s[7],w=s[2],b=s[5],A=s[8];return r[0]=o*v+a*_+c*w,r[3]=o*m+a*y+c*b,r[6]=o*p+a*M+c*A,r[1]=l*v+h*_+u*w,r[4]=l*m+h*y+u*b,r[7]=l*p+h*M+u*A,r[2]=f*v+d*_+g*w,r[5]=f*m+d*y+g*b,r[8]=f*p+d*M+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=f*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return os("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ao.makeScale(t,e)),this}rotate(t){return os("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ao.makeRotation(-t)),this}translate(t,e){return os("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ao.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ao=new kt,Zc=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jc=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $f(){const i={enabled:!0,workingColorSpace:Br,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ee&&(s.r=jn(s.r),s.g=jn(s.g),s.b=jn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ee&&(s.r=as(s.r),s.g=as(s.g),s.b=as(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?zr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return os("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return os("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Br]:{primaries:t,whitePoint:n,transfer:zr,toXYZ:Zc,fromXYZ:Jc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:t,whitePoint:n,transfer:ee,toXYZ:Zc,fromXYZ:Jc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:en}}}),i}const $t=$f();function jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function as(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Hi;class qf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Hi===void 0&&(Hi=Vr("canvas")),Hi.width=t.width,Hi.height=t.height;const s=Hi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Hi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Vr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=jn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(jn(e[n]/255)*255):e[n]=jn(e[n]);return{data:e,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Yf=0;class mc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=zs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(co(s[o].image)):r.push(co(s[o]))}else r=co(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function co(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?qf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let Kf=0;const lo=new I;class Be extends Oi{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=Zn,s=Zn,r=ke,o=Li,a=gn,c=Ke,l=Be.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=zs(),this.name="",this.source=new mc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(lo).x}get height(){return this.source.getSize(lo).y}get depth(){return this.source.getSize(lo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ut(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ut(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$h)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ui:t.x=t.x-Math.floor(t.x);break;case Zn:t.x=t.x<0?0:1;break;case aa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ui:t.y=t.y-Math.floor(t.y);break;case Zn:t.y=t.y<0?0:1;break;case aa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=$h;Be.DEFAULT_ANISOTROPY=1;class fe{static{fe.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,M=(d+1)/2,w=(p+1)/2,b=(h+f)/4,A=(u+v)/4,x=(g+m)/4;return y>M&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=b/n,r=A/n):M>w?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=b/s,r=x/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=A/r,s=x/r),this.set(n,s,r,e),this}let _=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(u-v)/_,this.z=(f-h)/_,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zf extends Oi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ke,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new Be(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:ke,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new mc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Dn extends Zf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class eu extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jf extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oe{static{oe.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,v,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Gi.setFromMatrixColumn(t,0).length(),r=1/Gi.setFromMatrixColumn(t,1).length(),o=1/Gi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-v*l,e[9]=-a*c,e[2]=v-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f+v*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=v+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f-v*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=v-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+v,e[1]=c*u,e[5]=v*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(jf,t,Qf)}lookAt(t,e,n){const s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),si.crossVectors(n,$e),si.lengthSq()===0&&(Math.abs(n.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),si.crossVectors(n,$e)),si.normalize(),Zs.crossVectors($e,si),s[0]=si.x,s[4]=Zs.x,s[8]=$e.x,s[1]=si.y,s[5]=Zs.y,s[9]=$e.y,s[2]=si.z,s[6]=Zs.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],_=n[3],y=n[7],M=n[11],w=n[15],b=s[0],A=s[4],x=s[8],T=s[12],P=s[1],R=s[5],L=s[9],V=s[13],B=s[2],U=s[6],k=s[10],O=s[14],$=s[3],Z=s[7],it=s[11],Q=s[15];return r[0]=o*b+a*P+c*B+l*$,r[4]=o*A+a*R+c*U+l*Z,r[8]=o*x+a*L+c*k+l*it,r[12]=o*T+a*V+c*O+l*Q,r[1]=h*b+u*P+f*B+d*$,r[5]=h*A+u*R+f*U+d*Z,r[9]=h*x+u*L+f*k+d*it,r[13]=h*T+u*V+f*O+d*Q,r[2]=g*b+v*P+m*B+p*$,r[6]=g*A+v*R+m*U+p*Z,r[10]=g*x+v*L+m*k+p*it,r[14]=g*T+v*V+m*O+p*Q,r[3]=_*b+y*P+M*B+w*$,r[7]=_*A+y*R+M*U+w*Z,r[11]=_*x+y*L+M*k+w*it,r[15]=_*T+y*V+M*O+w*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15],_=c*d-l*f,y=a*d-l*u,M=a*f-c*u,w=o*d-l*h,b=o*f-c*h,A=o*u-a*h;return e*(v*_-m*y+p*M)-n*(g*_-m*w+p*b)+s*(g*y-v*w+p*A)-r*(g*M-v*b+m*A)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],h=t[10];return e*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],_=e*a-n*o,y=e*c-s*o,M=e*l-r*o,w=n*c-s*a,b=n*l-r*a,A=s*l-r*c,x=h*v-u*g,T=h*m-f*g,P=h*p-d*g,R=u*m-f*v,L=u*p-d*v,V=f*p-d*m,B=_*V-y*L+M*R+w*P-b*T+A*x;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/B;return t[0]=(a*V-c*L+l*R)*U,t[1]=(s*L-n*V-r*R)*U,t[2]=(v*A-m*b+p*w)*U,t[3]=(f*b-u*A-d*w)*U,t[4]=(c*P-o*V-l*T)*U,t[5]=(e*V-s*P+r*T)*U,t[6]=(m*M-g*A-p*y)*U,t[7]=(h*A-f*M+d*y)*U,t[8]=(o*L-a*P+l*x)*U,t[9]=(n*P-e*L-r*x)*U,t[10]=(g*b-v*M+p*_)*U,t[11]=(u*M-h*b-d*_)*U,t[12]=(a*T-o*R-c*x)*U,t[13]=(e*R-n*T+s*x)*U,t[14]=(v*y-g*w-m*_)*U,t[15]=(h*w-u*y+f*_)*U,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,v=o*h,m=o*u,p=a*u,_=c*l,y=c*h,M=c*u,w=n.x,b=n.y,A=n.z;return s[0]=(1-(v+p))*w,s[1]=(d+M)*w,s[2]=(g-y)*w,s[3]=0,s[4]=(d-M)*b,s[5]=(1-(f+p))*b,s[6]=(m+_)*b,s[7]=0,s[8]=(g+y)*A,s[9]=(m-_)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Gi.set(s[0],s[1],s[2]).length();const a=Gi.set(s[4],s[5],s[6]).length(),c=Gi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),an.copy(this);const l=1/o,h=1/a,u=1/c;return an.elements[0]*=l,an.elements[1]*=l,an.elements[2]*=l,an.elements[4]*=h,an.elements[5]*=h,an.elements[6]*=h,an.elements[8]*=u,an.elements[9]*=u,an.elements[10]*=u,e.setFromRotationMatrix(an),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Ln,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,v;if(c)g=r/(o-r),v=o*r/(o-r);else if(a===Ln)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Os)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Ln,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,v;if(c)g=1/(o-r),v=o/(o-r);else if(a===Ln)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===Os)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Gi=new I,an=new oe,jf=new I(0,0,0),Qf=new I(1,1,1),si=new I,Zs=new I,$e=new I,jc=new oe,Qc=new je;class On{constructor(t=0,e=0,n=0,s=On.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return jc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qc.setFromEuler(this),this.setFromQuaternion(Qc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}On.DEFAULT_ORDER="XYZ";class gc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let td=0;const tl=new I,Wi=new je,Bn=new oe,Js=new I,vs=new I,ed=new I,nd=new je,el=new I(1,0,0),nl=new I(0,1,0),il=new I(0,0,1),sl={type:"added"},id={type:"removed"},Xi={type:"childadded",child:null},ho={type:"childremoved",child:null};class be extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new I,e=new On,n=new je,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new kt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.premultiply(Wi),this}rotateX(t){return this.rotateOnAxis(el,t)}rotateY(t){return this.rotateOnAxis(nl,t)}rotateZ(t){return this.rotateOnAxis(il,t)}translateOnAxis(t,e){return tl.copy(t).applyQuaternion(this.quaternion),this.position.add(tl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(el,t)}translateY(t){return this.translateOnAxis(nl,t)}translateZ(t){return this.translateOnAxis(il,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Js.copy(t):Js.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(vs,Js,this.up):Bn.lookAt(Js,vs,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),Wi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Yt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sl),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null):Yt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(id),ho.child=t,this.dispatchEvent(ho),ho.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sl),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,t,ed),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,nd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}be.DEFAULT_UP=new I(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class pn extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sd={type:"move"};class uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(sd)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new pn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},js={h:0,s:0,l:0};function fo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=en){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=Xf(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=fo(o,r,t+1/3),this.g=fo(o,r,t),this.b=fo(o,r,t-1/3)}return $t.colorSpaceToWorking(this,s),this}setStyle(t,e=en){function n(r){r!==void 0&&parseFloat(r)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ut("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=en){const n=nu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=jn(t.r),this.g=jn(t.g),this.b=jn(t.b),this}copyLinearToSRGB(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=en){return $t.workingToColorSpace(Ne.copy(this),t),Math.round(qt(Ne.r*255,0,255))*65536+Math.round(qt(Ne.g*255,0,255))*256+Math.round(qt(Ne.b*255,0,255))}getHexString(t=en){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Ne.copy(this),e);const n=Ne.r,s=Ne.g,r=Ne.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=en){$t.workingToColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,s=Ne.b;return t!==en?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ri),this.setHSL(ri.h+t,ri.s+e,ri.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ri),t.getHSL(js);const n=ro(ri.h,js.h,e),s=ro(ri.s,js.s,e),r=ro(ri.l,js.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Gt;Gt.NAMES=nu;class za extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new On,this.environmentIntensity=1,this.environmentRotation=new On,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const cn=new I,zn=new I,po=new I,Vn=new I,$i=new I,qi=new I,rl=new I,mo=new I,go=new I,vo=new I,xo=new fe,_o=new fe,Mo=new fe;class mn{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),cn.subVectors(t,e),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){cn.subVectors(s,e),zn.subVectors(n,e),po.subVectors(t,e);const o=cn.dot(cn),a=cn.dot(zn),c=cn.dot(po),l=zn.dot(zn),h=zn.dot(po),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Vn.x),c.addScaledVector(o,Vn.y),c.addScaledVector(a,Vn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return xo.setScalar(0),_o.setScalar(0),Mo.setScalar(0),xo.fromBufferAttribute(t,e),_o.fromBufferAttribute(t,n),Mo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(xo,r.x),o.addScaledVector(_o,r.y),o.addScaledVector(Mo,r.z),o}static isFrontFacing(t,e,n,s){return cn.subVectors(n,e),zn.subVectors(t,e),cn.cross(zn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),cn.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return mn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;$i.subVectors(s,n),qi.subVectors(r,n),mo.subVectors(t,n);const c=$i.dot(mo),l=qi.dot(mo);if(c<=0&&l<=0)return e.copy(n);go.subVectors(t,s);const h=$i.dot(go),u=qi.dot(go);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector($i,o);vo.subVectors(t,r);const d=$i.dot(vo),g=qi.dot(vo);if(g>=0&&d<=g)return e.copy(r);const v=d*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(qi,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return rl.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(rl,a);const p=1/(m+v+f);return o=v*p,a=f*p,e.copy(n).addScaledVector($i,o).addScaledVector(qi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Vs{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ln):ln.fromBufferAttribute(r,o),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Qs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qs.copy(n.boundingBox)),Qs.applyMatrix4(t.matrixWorld),this.union(Qs)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(xs),tr.subVectors(this.max,xs),Yi.subVectors(t.a,xs),Ki.subVectors(t.b,xs),Zi.subVectors(t.c,xs),oi.subVectors(Ki,Yi),ai.subVectors(Zi,Ki),Si.subVectors(Yi,Zi);let e=[0,-oi.z,oi.y,0,-ai.z,ai.y,0,-Si.z,Si.y,oi.z,0,-oi.x,ai.z,0,-ai.x,Si.z,0,-Si.x,-oi.y,oi.x,0,-ai.y,ai.x,0,-Si.y,Si.x,0];return!yo(e,Yi,Ki,Zi,tr)||(e=[1,0,0,0,1,0,0,0,1],!yo(e,Yi,Ki,Zi,tr))?!1:(er.crossVectors(oi,ai),e=[er.x,er.y,er.z],yo(e,Yi,Ki,Zi,tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Hn=[new I,new I,new I,new I,new I,new I,new I,new I],ln=new I,Qs=new Vs,Yi=new I,Ki=new I,Zi=new I,oi=new I,ai=new I,Si=new I,xs=new I,tr=new I,er=new I,bi=new I;function yo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){bi.fromArray(i,r);const a=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),c=t.dot(bi),l=e.dot(bi),h=n.dot(bi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Me=new I,nr=new Xt;let rd=0;class Un extends Oi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Xc,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)nr.fromBufferAttribute(this,e),nr.applyMatrix3(t),this.setXY(e,nr.x,nr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ge(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),s=Ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),n=Ge(n,this.array),s=Ge(s,this.array),r=Ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Xc&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class iu extends Un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class su extends Un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class jt extends Un{constructor(t,e,n){super(new Float32Array(t),e,n)}}const od=new Vs,_s=new I,So=new I;class Hs{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):od.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_s.subVectors(t,this.center);const e=_s.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(_s,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(So.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_s.copy(t.center).add(So)),this.expandByPoint(_s.copy(t.center).sub(So))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let ad=0;const tn=new oe,bo=new be,Ji=new I,qe=new Vs,Ms=new Vs,Ae=new I;class he extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=zs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Vf(t)?su:iu)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return bo.lookAt(t),bo.updateMatrix(),this.applyMatrix4(bo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new jt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ms.setFromBufferAttribute(a),this.morphTargetsRelative?(Ae.addVectors(qe.min,Ms.min),qe.expandByPoint(Ae),Ae.addVectors(qe.max,Ms.max),qe.expandByPoint(Ae)):(qe.expandByPoint(Ms.min),qe.expandByPoint(Ms.max))}qe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ae.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ae));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ae.fromBufferAttribute(a,l),c&&(Ji.fromBufferAttribute(t,l),Ae.add(Ji)),s=Math.max(s,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Un(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new I,c[x]=new I;const l=new I,h=new I,u=new I,f=new Xt,d=new Xt,g=new Xt,v=new I,m=new I;function p(x,T,P){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,P),f.fromBufferAttribute(r,x),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,P),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(R),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(R),a[x].add(v),a[T].add(v),a[P].add(v),c[x].add(m),c[T].add(m),c[P].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let x=0,T=_.length;x<T;++x){const P=_[x],R=P.start,L=P.count;for(let V=R,B=R+L;V<B;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const y=new I,M=new I,w=new I,b=new I;function A(x){w.fromBufferAttribute(s,x),b.copy(w);const T=a[x];y.copy(T),y.sub(w.multiplyScalar(w.dot(T))).normalize(),M.crossVectors(b,T);const R=M.dot(c[x])<0?-1:1;o.setXYZW(x,y.x,y.y,y.z,R)}for(let x=0,T=_.length;x<T;++x){const P=_[x],R=P.start,L=P.count;for(let V=R,B=R+L;V<B;V+=3)A(t.getX(V+0)),A(t.getX(V+1)),A(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Un(f,h,u)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new he,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let cd=0;class ki extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=zs(),this.name="",this.type="Material",this.blending=rs,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jo,this.blendDst=Qo,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ut(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ut(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rs&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==jo&&(n.blendSrc=this.blendSrc),this.blendDst!==Qo&&(n.blendDst=this.blendDst),this.blendEquation!==Ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ls&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Gt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Xt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Gn=new I,wo=new I,ir=new I,ci=new I,Eo=new I,sr=new I,To=new I;class Yr{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){wo.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),ci.copy(this.origin).sub(wo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ir),a=ci.dot(this.direction),c=-ci.dot(ir),l=ci.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(wo).addScaledVector(ir,f),d}intersectSphere(t,e){Gn.subVectors(t.center,this.origin);const n=Gn.dot(this.direction),s=Gn.dot(Gn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,s,r){Eo.subVectors(e,t),sr.subVectors(n,t),To.crossVectors(Eo,sr);let o=this.direction.dot(To),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,t);const c=a*this.direction.dot(sr.crossVectors(ci,sr));if(c<0)return null;const l=a*this.direction.dot(Eo.cross(ci));if(l<0||c+l>o)return null;const h=-a*ci.dot(To);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vn extends ki{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=oc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ol=new oe,wi=new Yr,rr=new Hs,al=new I,or=new I,ar=new I,cr=new I,Ao=new I,lr=new I,cl=new I,hr=new I;let ye=class extends be{constructor(t=new he,e=new vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){lr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Ao.fromBufferAttribute(u,t),o?lr.addScaledVector(Ao,h):lr.addScaledVector(Ao.sub(e),h))}e.add(lr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(r),wi.copy(t.ray).recast(t.near),!(rr.containsPoint(wi.origin)===!1&&(wi.intersectSphere(rr,al)===null||wi.origin.distanceToSquared(al)>(t.far-t.near)**2))&&(ol.copy(r).invert(),wi.copy(t.ray).applyMatrix4(ol),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,wi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],_=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=_,w=y;M<w;M+=3){const b=a.getX(M),A=a.getX(M+1),x=a.getX(M+2);s=ur(this,p,t,n,l,h,u,b,A,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const _=a.getX(m),y=a.getX(m+1),M=a.getX(m+2);s=ur(this,o,t,n,l,h,u,_,y,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],_=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let M=_,w=y;M<w;M+=3){const b=M,A=M+1,x=M+2;s=ur(this,p,t,n,l,h,u,b,A,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const _=m,y=m+1,M=m+2;s=ur(this,o,t,n,l,h,u,_,y,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function ld(i,t,e,n,s,r,o,a){let c;if(t.side===We?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===vi,a),c===null)return null;hr.copy(a),hr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(hr);return l<e.near||l>e.far?null:{distance:l,point:hr.clone(),object:i}}function ur(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,or),i.getVertexPosition(c,ar),i.getVertexPosition(l,cr);const h=ld(i,t,e,n,or,ar,cr,cl);if(h){const u=new I;mn.getBarycoord(cl,or,ar,cr,u),s&&(h.uv=mn.getInterpolatedAttribute(s,a,c,l,u,new Xt)),r&&(h.uv1=mn.getInterpolatedAttribute(r,a,c,l,u,new Xt)),o&&(h.normal=mn.getInterpolatedAttribute(o,a,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new I,materialIndex:0};mn.getNormal(or,ar,cr,f.normal),h.face=f,h.barycoord=u}return h}class hd extends Be{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Ce,h=Ce,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Co=new I,ud=new I,fd=new kt;class fi{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Co.subVectors(n,e).cross(ud.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Co),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||fd.getNormalMatrix(t),s=this.coplanarPoint(Co).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new Hs,dd=new Xt(.5,.5),fr=new I;class vc{constructor(t=new fi,e=new fi,n=new fi,s=new fi,r=new fi,o=new fi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ln,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],v=r[9],m=r[10],p=r[11],_=r[12],y=r[13],M=r[14],w=r[15];if(s[0].setComponents(l-o,d-h,p-g,w-_).normalize(),s[1].setComponents(l+o,d+h,p+g,w+_).normalize(),s[2].setComponents(l+a,d+u,p+v,w+y).normalize(),s[3].setComponents(l-a,d-u,p-v,w-y).normalize(),n)s[4].setComponents(c,f,m,M).normalize(),s[5].setComponents(l-c,d-f,p-m,w-M).normalize();else if(s[4].setComponents(l-c,d-f,p-m,w-M).normalize(),e===Ln)s[5].setComponents(l+c,d+f,p+m,w+M).normalize();else if(e===Os)s[5].setComponents(c,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(t){Ei.center.set(0,0,0);const e=dd.distanceTo(t.center);return Ei.radius=.7071067811865476+e,Ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(fr.x=s.normal.x>0?t.max.x:t.min.x,fr.y=s.normal.y>0?t.max.y:t.min.y,fr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Oe extends ki{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Hr=new I,Gr=new I,ll=new oe,ys=new Yr,dr=new Hs,Ro=new I,hl=new I;class Gs extends be{constructor(t=new he,e=new Oe){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Hr.fromBufferAttribute(e,s-1),Gr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Hr.distanceTo(Gr);t.setAttribute("lineDistance",new jt(n,1))}else Ut("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(s),dr.radius+=r,t.ray.intersectsSphere(dr)===!1)return;ll.copy(s).invert(),ys.copy(t.ray).applyMatrix4(ll);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=l){const p=h.getX(v),_=h.getX(v+1),y=pr(this,t,ys,c,p,_,v);y&&e.push(y)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(d),p=pr(this,t,ys,c,v,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=l){const p=pr(this,t,ys,c,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=pr(this,t,ys,c,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function pr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Hr.fromBufferAttribute(a,s),Gr.fromBufferAttribute(a,r),e.distanceSqToSegment(Hr,Gr,Ro,hl)>n)return;Ro.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ro);if(!(l<t.near||l>t.far))return{distance:l,point:hl.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const ul=new I,fl=new I;class mi extends Gs{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)ul.fromBufferAttribute(e,s),fl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ul.distanceTo(fl);t.setAttribute("lineDistance",new jt(n,1))}else Ut("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xn extends ki{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const dl=new oe,Va=new Yr,mr=new Hs,gr=new I;class _n extends be{constructor(t=new he,e=new xn){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(s),mr.radius+=r,t.ray.intersectsSphere(mr)===!1)return;dl.copy(s).invert(),Va.copy(t.ray).applyMatrix4(dl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,v=d;g<v;g++){const m=l.getX(g);gr.fromBufferAttribute(u,m),pl(gr,m,c,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,v=d;g<v;g++)gr.fromBufferAttribute(u,g),pl(gr,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function pl(i,t,e,n,s,r,o){const a=Va.distanceSqToPoint(i);if(a<e){const c=new I;Va.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ru extends Be{constructor(t=[],e=Di,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ou extends Be{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class us extends Be{constructor(t,e,n=Fn,s,r,o,a=Ce,c=Ce,l,h=ti,u=1){if(h!==ti&&h!==Ii)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new mc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class pd extends us{constructor(t,e=Fn,n=Di,s,r,o=Ce,a=Ce,c,l=ti){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class au extends Be{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Fi extends he{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(u,2));function g(v,m,p,_,y,M,w,b,A,x,T){const P=M/A,R=w/x,L=M/2,V=w/2,B=b/2,U=A+1,k=x+1;let O=0,$=0;const Z=new I;for(let it=0;it<k;it++){const Q=it*R-V;for(let rt=0;rt<U;rt++){const bt=rt*P-L;Z[v]=bt*_,Z[m]=Q*y,Z[p]=B,l.push(Z.x,Z.y,Z.z),Z[v]=0,Z[m]=0,Z[p]=b>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(rt/A),u.push(1-it/x),O+=1}}for(let it=0;it<x;it++)for(let Q=0;Q<A;Q++){const rt=f+Q+U*it,bt=f+Q+U*(it+1),Ft=f+(Q+1)+U*(it+1),wt=f+(Q+1)+U*it;c.push(rt,bt,wt),c.push(bt,Ft,wt),$+=6}a.addGroup(d,$,T),d+=$,f+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class xc extends he{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;_(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(f,3)),this.setAttribute("uv",new jt(d,2));function _(){const M=new I,w=new I;let b=0;const A=(e-t)/n;for(let x=0;x<=r;x++){const T=[],P=x/r,R=P*(e-t)+t;for(let L=0;L<=s;L++){const V=L/s,B=V*c+a,U=Math.sin(B),k=Math.cos(B);w.x=R*U,w.y=-P*n+m,w.z=R*k,u.push(w.x,w.y,w.z),M.set(U,A,k).normalize(),f.push(M.x,M.y,M.z),d.push(V,1-P),T.push(g++)}v.push(T)}for(let x=0;x<s;x++)for(let T=0;T<r;T++){const P=v[T][x],R=v[T+1][x],L=v[T+1][x+1],V=v[T][x+1];(t>0||T!==0)&&(h.push(P,R,V),b+=3),(e>0||T!==r-1)&&(h.push(R,L,V),b+=3)}l.addGroup(p,b,0),p+=b}function y(M){const w=g,b=new Xt,A=new I;let x=0;const T=M===!0?t:e,P=M===!0?1:-1;for(let L=1;L<=s;L++)u.push(0,m*P,0),f.push(0,P,0),d.push(.5,.5),g++;const R=g;for(let L=0;L<=s;L++){const B=L/s*c+a,U=Math.cos(B),k=Math.sin(B);A.x=T*k,A.y=m*P,A.z=T*U,u.push(A.x,A.y,A.z),f.push(0,P,0),b.x=U*.5+.5,b.y=k*.5*P+.5,d.push(b.x,b.y),g++}for(let L=0;L<s;L++){const V=w+L,B=R+L;M===!0?h.push(B,B+1,V):h.push(B+1,B,V),x+=3}l.addGroup(p,x,M===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xc(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _c extends xc{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new _c(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ws extends he{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const _=p*f-o;for(let y=0;y<l;y++){const M=y*u-r;g.push(M,-_,0),v.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let _=0;_<a;_++){const y=_+l*p,M=_+l*(p+1),w=_+1+l*(p+1),b=_+1+l*p;d.push(y,M,b),d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(v,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ws(t.width,t.height,t.widthSegments,t.heightSegments)}}class Mc extends he{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new I,f=new I,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const _=[],y=p/n,M=o+y*a,w=t*Math.cos(M),b=Math.sqrt(t*t-w*w);let A=0;p===0&&o===0?A=.5/e:p===n&&c===Math.PI&&(A=-.5/e);for(let x=0;x<=e;x++){const T=x/e,P=s+T*r;u.x=-b*Math.cos(P),u.y=w,u.z=b*Math.sin(P),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(T+A,1-y),_.push(l++)}h.push(_)}for(let p=0;p<n;p++)for(let _=0;_<e;_++){const y=h[p][_+1],M=h[p][_],w=h[p+1][_],b=h[p+1][_+1];(p!==0||o>0)&&d.push(y,M,b),(p!==n-1||c<Math.PI)&&d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(v,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function fs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(ml(s))s.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(ml(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function ze(i){const t={};for(let e=0;e<i.length;e++){const n=fs(i[e]);for(const s in n)t[s]=n[s]}return t}function ml(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function md(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const gd={clone:fs,merge:ze};var vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kn extends ki{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vd,this.fragmentShader=xd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=fs(t.uniforms),this.uniformsGroups=md(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Gt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Xt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new fe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new kt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new oe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class _d extends kn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class lu extends ki{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Gt(16777215),this.specular=new Gt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ka,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=oc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Md extends ki{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class yd extends ki{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class hu extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Sd extends hu{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Po=new oe,gl=new I,vl=new I;class bd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.mapType=Ke,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vc,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;gl.setFromMatrixPosition(t.matrixWorld),e.position.copy(gl),vl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vl),e.updateMatrixWorld(),Po.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Po,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Os||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Po)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const vr=new I,xr=new je,bn=new I;class uu extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(vr,xr,bn),bn.x===1&&bn.y===1&&bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vr,xr,bn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(vr,xr,bn),bn.x===1&&bn.y===1&&bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vr,xr,bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const li=new I,xl=new Xt,_l=new Xt;class rn extends uu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ba*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(so*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ba*2*Math.atan(Math.tan(so*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(li.x,li.y).multiplyScalar(-t/li.z),li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(li.x,li.y).multiplyScalar(-t/li.z)}getViewSize(t,e){return this.getViewBounds(t,xl,_l),e.subVectors(_l,xl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(so*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Xs extends uu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class wd extends bd{constructor(){super(new Xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ml extends hu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new wd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const ji=-90,Qi=1;class Ed extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(ji,Qi,t,e);s.layers=this.layers,this.add(s);const r=new rn(ji,Qi,t,e);r.layers=this.layers,this.add(r);const o=new rn(ji,Qi,t,e);o.layers=this.layers,this.add(o);const a=new rn(ji,Qi,t,e);a.layers=this.layers,this.add(a);const c=new rn(ji,Qi,t,e);c.layers=this.layers,this.add(c);const l=new rn(ji,Qi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Os)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Td extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const yl=new oe;class fu{constructor(t,e,n=0,s=1/0){this.ray=new Yr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new gc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Yt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return yl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yl),this}intersectObject(t,e=!0,n=[]){return Ha(t,this,n,e),n.sort(Sl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ha(t[s],this,n,e);return n.sort(Sl),n}}function Sl(i,t){return i.distance-t.distance}function Ha(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Ha(r[o],t,e,!0)}}class du{static{du.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}}class Ad extends mi{constructor(t=10,e=10,n=4473924,s=8947848){n=new Gt(n),s=new Gt(s);const r=e/2,o=t/e,a=t/2,c=[],l=[];for(let f=0,d=0,g=-a;f<=e;f++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);const v=f===r?n:s;v.toArray(l,d),d+=3,v.toArray(l,d),d+=3,v.toArray(l,d),d+=3,v.toArray(l,d),d+=3}const h=new he;h.setAttribute("position",new jt(c,3)),h.setAttribute("color",new jt(l,3));const u=new Oe({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function bl(i,t,e,n){const s=Cd(n);switch(e){case Jh:return i*t;case Qh:return i*t/s.components*s.byteLength;case hc:return i*t/s.components*s.byteLength;case Ni:return i*t*2/s.components*s.byteLength;case uc:return i*t*2/s.components*s.byteLength;case jh:return i*t*3/s.components*s.byteLength;case gn:return i*t*4/s.components*s.byteLength;case fc:return i*t*4/s.components*s.byteLength;case Ir:case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ur:case Nr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case la:case ua:return Math.max(i,16)*Math.max(t,8)/4;case ca:case ha:return Math.max(i,8)*Math.max(t,8)/2;case fa:case da:case ma:case ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case pa:case Or:case va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case _a:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ya:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ba:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case wa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ea:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ta:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ra:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Pa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case La:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ia:case Da:case Ua:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Na:case Fa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case kr:case Oa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Cd(i){switch(i){case Ke:case qh:return{byteLength:1,components:1};case Ns:case Yh:case Qn:return{byteLength:2,components:1};case cc:case lc:return{byteLength:2,components:4};case Fn:case ac:case Pn:return{byteLength:4,components:1};case Kh:case Zh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rc}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function pu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Rd(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Pd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ld=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Id=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ud=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Od=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Bd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Qd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ep=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,np=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ip=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,op="gl_FragColor = linearToOutputTexel( gl_FragColor );",ap=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,lp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,up=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_p=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Sp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ep=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ap=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Cp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Pp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ip=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Dp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Up=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Op=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Kp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Qp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,tm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,em=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,im=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,om=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,am=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,dm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,pm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,mm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,gm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,xm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_m=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ym=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Em=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Rm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Om=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,km=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Bm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Xm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ym=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Km=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Jm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,eg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,og=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ag=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:Pd,alphahash_pars_fragment:Ld,alphamap_fragment:Id,alphamap_pars_fragment:Dd,alphatest_fragment:Ud,alphatest_pars_fragment:Nd,aomap_fragment:Fd,aomap_pars_fragment:Od,batching_pars_vertex:kd,batching_vertex:Bd,begin_vertex:zd,beginnormal_vertex:Vd,bsdfs:Hd,iridescence_fragment:Gd,bumpmap_pars_fragment:Wd,clipping_planes_fragment:Xd,clipping_planes_pars_fragment:$d,clipping_planes_pars_vertex:qd,clipping_planes_vertex:Yd,color_fragment:Kd,color_pars_fragment:Zd,color_pars_vertex:Jd,color_vertex:jd,common:Qd,cube_uv_reflection_fragment:tp,defaultnormal_vertex:ep,displacementmap_pars_vertex:np,displacementmap_vertex:ip,emissivemap_fragment:sp,emissivemap_pars_fragment:rp,colorspace_fragment:op,colorspace_pars_fragment:ap,envmap_fragment:cp,envmap_common_pars_fragment:lp,envmap_pars_fragment:hp,envmap_pars_vertex:up,envmap_physical_pars_fragment:Sp,envmap_vertex:fp,fog_vertex:dp,fog_pars_vertex:pp,fog_fragment:mp,fog_pars_fragment:gp,gradientmap_pars_fragment:vp,lightmap_pars_fragment:xp,lights_lambert_fragment:_p,lights_lambert_pars_fragment:Mp,lights_pars_begin:yp,lights_toon_fragment:bp,lights_toon_pars_fragment:wp,lights_phong_fragment:Ep,lights_phong_pars_fragment:Tp,lights_physical_fragment:Ap,lights_physical_pars_fragment:Cp,lights_fragment_begin:Rp,lights_fragment_maps:Pp,lights_fragment_end:Lp,lightprobes_pars_fragment:Ip,logdepthbuf_fragment:Dp,logdepthbuf_pars_fragment:Up,logdepthbuf_pars_vertex:Np,logdepthbuf_vertex:Fp,map_fragment:Op,map_pars_fragment:kp,map_particle_fragment:Bp,map_particle_pars_fragment:zp,metalnessmap_fragment:Vp,metalnessmap_pars_fragment:Hp,morphinstance_vertex:Gp,morphcolor_vertex:Wp,morphnormal_vertex:Xp,morphtarget_pars_vertex:$p,morphtarget_vertex:qp,normal_fragment_begin:Yp,normal_fragment_maps:Kp,normal_pars_fragment:Zp,normal_pars_vertex:Jp,normal_vertex:jp,normalmap_pars_fragment:Qp,clearcoat_normal_fragment_begin:tm,clearcoat_normal_fragment_maps:em,clearcoat_pars_fragment:nm,iridescence_pars_fragment:im,opaque_fragment:sm,packing:rm,premultiplied_alpha_fragment:om,project_vertex:am,dithering_fragment:cm,dithering_pars_fragment:lm,roughnessmap_fragment:hm,roughnessmap_pars_fragment:um,shadowmap_pars_fragment:fm,shadowmap_pars_vertex:dm,shadowmap_vertex:pm,shadowmask_pars_fragment:mm,skinbase_vertex:gm,skinning_pars_vertex:vm,skinning_vertex:xm,skinnormal_vertex:_m,specularmap_fragment:Mm,specularmap_pars_fragment:ym,tonemapping_fragment:Sm,tonemapping_pars_fragment:bm,transmission_fragment:wm,transmission_pars_fragment:Em,uv_pars_fragment:Tm,uv_pars_vertex:Am,uv_vertex:Cm,worldpos_vertex:Rm,background_vert:Pm,background_frag:Lm,backgroundCube_vert:Im,backgroundCube_frag:Dm,cube_vert:Um,cube_frag:Nm,depth_vert:Fm,depth_frag:Om,distance_vert:km,distance_frag:Bm,equirect_vert:zm,equirect_frag:Vm,linedashed_vert:Hm,linedashed_frag:Gm,meshbasic_vert:Wm,meshbasic_frag:Xm,meshlambert_vert:$m,meshlambert_frag:qm,meshmatcap_vert:Ym,meshmatcap_frag:Km,meshnormal_vert:Zm,meshnormal_frag:Jm,meshphong_vert:jm,meshphong_frag:Qm,meshphysical_vert:tg,meshphysical_frag:eg,meshtoon_vert:ng,meshtoon_frag:ig,points_vert:sg,points_frag:rg,shadow_vert:og,shadow_frag:ag,sprite_vert:cg,sprite_frag:lg},dt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},Cn={basic:{uniforms:ze([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:ze([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Gt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:ze([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:ze([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:ze([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:ze([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:ze([dt.points,dt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:ze([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:ze([dt.common,dt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:ze([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:ze([dt.sprite,dt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:ze([dt.common,dt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:ze([dt.lights,dt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Cn.physical={uniforms:ze([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const _r={r:0,b:0,g:0},hg=new oe,mu=new kt;mu.set(-1,0,0,0,1,0,0,0,1);function ug(i,t,e,n,s,r){const o=new Gt(0);let a=s===!0?0:1,c,l,h=null,u=0,f=null;function d(_){let y=_.isScene===!0?_.background:null;if(y&&y.isTexture){const M=_.backgroundBlurriness>0;y=t.get(y,M)}return y}function g(_){let y=!1;const M=d(_);M===null?m(o,a):M&&M.isColor&&(m(M,1),y=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(_,y){const M=d(y);M&&(M.isCubeTexture||M.mapping===qr)?(l===void 0&&(l=new ye(new Fi(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:fs(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(hg.makeRotationFromEuler(y.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(mu),l.material.toneMapped=$t.getTransfer(M.colorSpace)!==ee,(h!==M||u!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new ye(new Ws(2,2),new kn({name:"BackgroundMaterial",uniforms:fs(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=$t.getTransfer(M.colorSpace)!==ee,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,y){_.getRGB(_r,cu(i)),e.buffers.color.setClear(_r.r,_r.g,_r.b,y,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,y=1){o.set(_),a=y,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,m(o,a)},render:g,addToRenderList:v,dispose:p}}function fg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(R,L,V,B,U){let k=!1;const O=u(R,B,V,L);r!==O&&(r=O,l(r.object)),k=d(R,B,V,U),k&&g(R,B,V,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,M(R,L,V,B),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function u(R,L,V,B){const U=B.wireframe===!0;let k=n[L.id];k===void 0&&(k={},n[L.id]=k);const O=R.isInstancedMesh===!0?R.id:0;let $=k[O];$===void 0&&($={},k[O]=$);let Z=$[V.id];Z===void 0&&(Z={},$[V.id]=Z);let it=Z[U];return it===void 0&&(it=f(c()),Z[U]=it),it}function f(R){const L=[],V=[],B=[];for(let U=0;U<e;U++)L[U]=0,V[U]=0,B[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:V,attributeDivisors:B,object:R,attributes:{},index:null}}function d(R,L,V,B){const U=r.attributes,k=L.attributes;let O=0;const $=V.getAttributes();for(const Z in $)if($[Z].location>=0){const Q=U[Z];let rt=k[Z];if(rt===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(rt=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(rt=R.instanceColor)),Q===void 0||Q.attribute!==rt||rt&&Q.data!==rt.data)return!0;O++}return r.attributesNum!==O||r.index!==B}function g(R,L,V,B){const U={},k=L.attributes;let O=0;const $=V.getAttributes();for(const Z in $)if($[Z].location>=0){let Q=k[Z];Q===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(Q=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(Q=R.instanceColor));const rt={};rt.attribute=Q,Q&&Q.data&&(rt.data=Q.data),U[Z]=rt,O++}r.attributes=U,r.attributesNum=O,r.index=B}function v(){const R=r.newAttributes;for(let L=0,V=R.length;L<V;L++)R[L]=0}function m(R){p(R,0)}function p(R,L){const V=r.newAttributes,B=r.enabledAttributes,U=r.attributeDivisors;V[R]=1,B[R]===0&&(i.enableVertexAttribArray(R),B[R]=1),U[R]!==L&&(i.vertexAttribDivisor(R,L),U[R]=L)}function _(){const R=r.newAttributes,L=r.enabledAttributes;for(let V=0,B=L.length;V<B;V++)L[V]!==R[V]&&(i.disableVertexAttribArray(V),L[V]=0)}function y(R,L,V,B,U,k,O){O===!0?i.vertexAttribIPointer(R,L,V,U,k):i.vertexAttribPointer(R,L,V,B,U,k)}function M(R,L,V,B){v();const U=B.attributes,k=V.getAttributes(),O=L.defaultAttributeValues;for(const $ in k){const Z=k[$];if(Z.location>=0){let it=U[$];if(it===void 0&&($==="instanceMatrix"&&R.instanceMatrix&&(it=R.instanceMatrix),$==="instanceColor"&&R.instanceColor&&(it=R.instanceColor)),it!==void 0){const Q=it.normalized,rt=it.itemSize,bt=t.get(it);if(bt===void 0)continue;const Ft=bt.buffer,wt=bt.type,q=bt.bytesPerElement,st=wt===i.INT||wt===i.UNSIGNED_INT||it.gpuType===ac;if(it.isInterleavedBufferAttribute){const nt=it.data,yt=nt.stride,Dt=it.offset;if(nt.isInstancedInterleavedBuffer){for(let Et=0;Et<Z.locationSize;Et++)p(Z.location+Et,nt.meshPerAttribute);R.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Et=0;Et<Z.locationSize;Et++)m(Z.location+Et);i.bindBuffer(i.ARRAY_BUFFER,Ft);for(let Et=0;Et<Z.locationSize;Et++)y(Z.location+Et,rt/Z.locationSize,wt,Q,yt*q,(Dt+rt/Z.locationSize*Et)*q,st)}else{if(it.isInstancedBufferAttribute){for(let nt=0;nt<Z.locationSize;nt++)p(Z.location+nt,it.meshPerAttribute);R.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let nt=0;nt<Z.locationSize;nt++)m(Z.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Ft);for(let nt=0;nt<Z.locationSize;nt++)y(Z.location+nt,rt/Z.locationSize,wt,Q,rt*q,rt/Z.locationSize*nt*q,st)}}else if(O!==void 0){const Q=O[$];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(Z.location,Q);break;case 3:i.vertexAttrib3fv(Z.location,Q);break;case 4:i.vertexAttrib4fv(Z.location,Q);break;default:i.vertexAttrib1fv(Z.location,Q)}}}}_()}function w(){T();for(const R in n){const L=n[R];for(const V in L){const B=L[V];for(const U in B){const k=B[U];for(const O in k)h(k[O].object),delete k[O];delete B[U]}}delete n[R]}}function b(R){if(n[R.id]===void 0)return;const L=n[R.id];for(const V in L){const B=L[V];for(const U in B){const k=B[U];for(const O in k)h(k[O].object),delete k[O];delete B[U]}}delete n[R.id]}function A(R){for(const L in n){const V=n[L];for(const B in V){const U=V[B];if(U[R.id]===void 0)continue;const k=U[R.id];for(const O in k)h(k[O].object),delete k[O];delete U[R.id]}}}function x(R){for(const L in n){const V=n[L],B=R.isInstancedMesh===!0?R.id:0,U=V[B];if(U!==void 0){for(const k in U){const O=U[k];for(const $ in O)h(O[$].object),delete O[$];delete U[k]}delete V[B],Object.keys(V).length===0&&delete n[L]}}}function T(){P(),o=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function dg(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function a(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function pg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==gn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const x=A===Qn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Ke&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Pn&&!x)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Ut("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:M,maxSamples:w,samples:b}}function mg(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new fi,a=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const _=r?0:n,y=_*4;let M=p.clippingState||null;c.value=M,M=h(g,f,y,d);for(let w=0;w!==y;++w)M[w]=e[w];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=d+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,M=d;y!==v;++y,M+=4)o.copy(u[y]).applyMatrix4(_,a),o.normal.toArray(m,M),m[M+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}const gi=4,wl=[.125,.215,.35,.446,.526,.582],Pi=20,gg=256,Ss=new Xs,El=new Gt;let Lo=null,Io=0,Do=0,Uo=!1;const vg=new I;class Tl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=vg}=r;Lo=this._renderer.getRenderTarget(),Io=this._renderer.getActiveCubeFace(),Do=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Lo,Io,Do),this._renderer.xr.enabled=Uo,t.scissorTest=!1,ts(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Di||t.mapping===hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Lo=this._renderer.getRenderTarget(),Io=this._renderer.getActiveCubeFace(),Do=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ke,minFilter:ke,generateMipmaps:!1,type:Qn,format:gn,colorSpace:Br,depthBuffer:!1},s=Al(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Al(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=xg(r)),this._blurMaterial=Mg(r,t,e),this._ggxMaterial=_g(r,t,e)}return s}_compileMaterial(t){const e=new ye(new he,t);this._renderer.compile(e,Ss)}_sceneToCubeUV(t,e,n,s,r){const c=new rn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(El),u.toneMapping=In,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ye(new Fi,new vn({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const _=t.background;_?_.isColor&&(m.color.copy(_),t.background=null,p=!0):(m.color.copy(El),p=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):M===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));const w=this._cubeSize;ts(s,M*w,y>2?w:0,w,w),u.setRenderTarget(s),p&&u.render(v,c),u.render(t,c)}u.toneMapping=d,u.autoClear=f,t.background=_}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Di||t.mapping===hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;ts(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ss)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=0+l*1.25,d=u*f,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-gi?n-g+gi:0),p=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=g-e,ts(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(a,Ss),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,ts(t,m,p,3*v,2*v),s.setRenderTarget(t),s.render(a,Ss)}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Yt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=l;const f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Pi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Pi;m>Pi&&Ut(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pi}`);const p=[];let _=0;for(let A=0;A<Pi;++A){const x=A/v,T=Math.exp(-x*x/2);p.push(T),A===0?_+=T:A<m&&(_+=2*T)}for(let A=0;A<p.length;A++)p[A]=p[A]/_;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const M=this._sizeLods[s],w=3*M*(s>y-gi?s-y+gi:0),b=4*(this._cubeSize-M);ts(e,w,b,3*M,2*M),c.setRenderTarget(e),c.render(u,Ss)}}function xg(i){const t=[],e=[],n=[];let s=i;const r=i-gi+1+wl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-gi?c=wl[o-i+gi-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,_=new Float32Array(v*g*d),y=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let b=0;b<d;b++){const A=b%3*2/3-1,x=b>2?0:-1,T=[A,x,0,A+2/3,x,0,A+2/3,x+1,0,A,x,0,A+2/3,x+1,0,A,x+1,0];_.set(T,v*g*b),y.set(f,m*g*b);const P=[b,b,b,b,b,b];M.set(P,p*g*b)}const w=new he;w.setAttribute("position",new Un(_,v)),w.setAttribute("uv",new Un(y,m)),w.setAttribute("faceIndex",new Un(M,p)),n.push(new ye(w,null)),s>gi&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Al(i,t,e){const n=new Dn(i,t,e);return n.texture.mapping=qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ts(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function _g(i,t,e){return new kn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:gg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Kr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Mg(i,t,e){const n=new Float32Array(Pi),s=new I(0,1,0);return new kn({name:"SphericalGaussianBlur",defines:{n:Pi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Cl(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Rl(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Kr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class gu extends Dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ru(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Fi(5,5,5),r=new kn({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:Jn});r.uniforms.tEquirect.value=e;const o=new ye(s,r),a=e.minFilter;return e.minFilter===Li&&(e.minFilter=ke),new Ed(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}function yg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===eo||d===no)if(t.has(f)){const g=t.get(f).texture;return a(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const v=new gu(g.height);return v.fromEquirectangularTexture(i,f),t.set(f,v),f.addEventListener("dispose",l),a(v.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const d=f.mapping,g=d===eo||d===no,v=d===Di||d===hs;if(g||v){let m=e.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Tl(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const _=f.image;return g&&_&&_.height>0||v&&_&&c(_)?(n===null&&(n=new Tl(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function a(f,d){return d===eo?f.mapping=Di:d===no&&(f.mapping=hs),f}function c(f){let d=0;const g=6;for(let v=0;v<g;v++)f[v]!==void 0&&d++;return d===g}function l(f){const d=f.target;d.removeEventListener("dispose",l);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Sg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&os("WebGLRenderer: "+n+" extension not supported."),s}}}function bg(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(g===void 0)return;if(d!==null){const _=d.array;v=d.version;for(let y=0,M=_.length;y<M;y+=3){const w=_[y+0],b=_[y+1],A=_[y+2];f.push(w,b,b,A,A,w)}}else{const _=g.array;v=g.version;for(let y=0,M=_.length/3-1;y<M;y+=3){const w=y+0,b=y+1,A=y+2;f.push(w,b,b,A,A,w)}}const m=new(g.count>=65535?su:iu)(f,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function wg(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),e.update(f,n,d))}function h(u,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let v=0;for(let m=0;m<d;m++)v+=f[m];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Eg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Yt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Tg(i,t,e){const n=new WeakMap,s=new fe;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let T=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let y=0;d===!0&&(y=1),g===!0&&(y=2),v===!0&&(y=3);let M=a.attributes.position.count*y,w=1;M>t.maxTextureSize&&(w=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const b=new Float32Array(M*w*4*u),A=new eu(b,M,w,u);A.type=Pn,A.needsUpdate=!0;const x=y*4;for(let P=0;P<u;P++){const R=m[P],L=p[P],V=_[P],B=M*w*4*P;for(let U=0;U<R.count;U++){const k=U*x;d===!0&&(s.fromBufferAttribute(R,U),b[B+k+0]=s.x,b[B+k+1]=s.y,b[B+k+2]=s.z,b[B+k+3]=0),g===!0&&(s.fromBufferAttribute(L,U),b[B+k+4]=s.x,b[B+k+5]=s.y,b[B+k+6]=s.z,b[B+k+7]=0),v===!0&&(s.fromBufferAttribute(V,U),b[B+k+8]=s.x,b[B+k+9]=s.y,b[B+k+10]=s.z,b[B+k+11]=V.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new Xt(M,w)},n.set(a,f),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ag(i,t,e,n,s){let r=new WeakMap;function o(l){const h=s.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}const Cg={[Bh]:"LINEAR_TONE_MAPPING",[zh]:"REINHARD_TONE_MAPPING",[Vh]:"CINEON_TONE_MAPPING",[Hh]:"ACES_FILMIC_TONE_MAPPING",[Wh]:"AGX_TONE_MAPPING",[Xh]:"NEUTRAL_TONE_MAPPING",[Gh]:"CUSTOM_TONE_MAPPING"};function Rg(i,t,e,n,s,r){const o=new Dn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new us(t,e):void 0}),a=new Dn(t,e,{type:Qn,depthBuffer:!1,stencilBuffer:!1}),c=new he;c.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new jt([0,2,0,0,2,0],2));const l=new _d({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new ye(c,l),u=new Xs(-1,1,1,-1,0,1);let f=null,d=null,g=!1,v,m=null,p=[],_=!1;this.setSize=function(y,M){o.setSize(y,M),a.setSize(y,M);for(let w=0;w<p.length;w++){const b=p[w];b.setSize&&b.setSize(y,M)}},this.setEffects=function(y){p=y,_=p.length>0&&p[0].isRenderPass===!0;const M=o.width,w=o.height;for(let b=0;b<p.length;b++){const A=p[b];A.setSize&&A.setSize(M,w)}},this.begin=function(y,M){if(g||y.toneMapping===In&&p.length===0)return!1;if(m=M,M!==null){const w=M.width,b=M.height;(o.width!==w||o.height!==b)&&this.setSize(w,b)}return _===!1&&y.setRenderTarget(o),v=y.toneMapping,y.toneMapping=In,!0},this.hasRenderPass=function(){return _},this.end=function(y,M){y.toneMapping=v,g=!0;let w=o,b=a;for(let A=0;A<p.length;A++){const x=p[A];if(x.enabled!==!1&&(x.render(y,b,w,M),x.needsSwap!==!1)){const T=w;w=b,b=T}}if(f!==y.outputColorSpace||d!==y.toneMapping){f=y.outputColorSpace,d=y.toneMapping,l.defines={},$t.getTransfer(f)===ee&&(l.defines.SRGB_TRANSFER="");const A=Cg[d];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(m),y.render(h,u),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),c.dispose(),l.dispose()}}const vu=new Be,Ga=new us(1,1),xu=new eu,_u=new Jf,Mu=new ru,Pl=[],Ll=[],Il=new Float32Array(16),Dl=new Float32Array(9),Ul=new Float32Array(4);function ms(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Pl[s];if(r===void 0&&(r=new Float32Array(s),Pl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function we(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Zr(i,t){let e=Ll[t];e===void 0&&(e=new Int32Array(t),Ll[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Pg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function Ig(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function Dg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function Ug(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;Ul.set(n),i.uniformMatrix2fv(this.addr,!1,Ul),Ee(e,n)}}function Ng(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;Dl.set(n),i.uniformMatrix3fv(this.addr,!1,Dl),Ee(e,n)}}function Fg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;Il.set(n),i.uniformMatrix4fv(this.addr,!1,Il),Ee(e,n)}}function Og(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function kg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function Bg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function Vg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Hg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function Gg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function Wg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function Xg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ga.compareFunction=e.isReversedDepthBuffer()?pc:dc,r=Ga):r=vu,e.setTexture2D(t||r,s)}function $g(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||_u,s)}function qg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Mu,s)}function Yg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||xu,s)}function Kg(i){switch(i){case 5126:return Pg;case 35664:return Lg;case 35665:return Ig;case 35666:return Dg;case 35674:return Ug;case 35675:return Ng;case 35676:return Fg;case 5124:case 35670:return Og;case 35667:case 35671:return kg;case 35668:case 35672:return Bg;case 35669:case 35673:return zg;case 5125:return Vg;case 36294:return Hg;case 36295:return Gg;case 36296:return Wg;case 35678:case 36198:case 36298:case 36306:case 35682:return Xg;case 35679:case 36299:case 36307:return $g;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return Yg}}function Zg(i,t){i.uniform1fv(this.addr,t)}function Jg(i,t){const e=ms(t,this.size,2);i.uniform2fv(this.addr,e)}function jg(i,t){const e=ms(t,this.size,3);i.uniform3fv(this.addr,e)}function Qg(i,t){const e=ms(t,this.size,4);i.uniform4fv(this.addr,e)}function t0(i,t){const e=ms(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function e0(i,t){const e=ms(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function n0(i,t){const e=ms(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function i0(i,t){i.uniform1iv(this.addr,t)}function s0(i,t){i.uniform2iv(this.addr,t)}function r0(i,t){i.uniform3iv(this.addr,t)}function o0(i,t){i.uniform4iv(this.addr,t)}function a0(i,t){i.uniform1uiv(this.addr,t)}function c0(i,t){i.uniform2uiv(this.addr,t)}function l0(i,t){i.uniform3uiv(this.addr,t)}function h0(i,t){i.uniform4uiv(this.addr,t)}function u0(i,t,e){const n=this.cache,s=t.length,r=Zr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Ga:o=vu;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function f0(i,t,e){const n=this.cache,s=t.length,r=Zr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||_u,r[o])}function d0(i,t,e){const n=this.cache,s=t.length,r=Zr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Mu,r[o])}function p0(i,t,e){const n=this.cache,s=t.length,r=Zr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||xu,r[o])}function m0(i){switch(i){case 5126:return Zg;case 35664:return Jg;case 35665:return jg;case 35666:return Qg;case 35674:return t0;case 35675:return e0;case 35676:return n0;case 5124:case 35670:return i0;case 35667:case 35671:return s0;case 35668:case 35672:return r0;case 35669:case 35673:return o0;case 5125:return a0;case 36294:return c0;case 36295:return l0;case 36296:return h0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return f0;case 35680:case 36300:case 36308:case 36293:return d0;case 36289:case 36303:case 36311:case 36292:return p0}}class g0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Kg(e.type)}}class v0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=m0(e.type)}}class x0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const No=/(\w+)(\])?(\[|\.)?/g;function Nl(i,t){i.seq.push(t),i.map[t.id]=t}function _0(i,t,e){const n=i.name,s=n.length;for(No.lastIndex=0;;){const r=No.exec(n),o=No.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Nl(e,l===void 0?new g0(a,i,t):new v0(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new x0(a),Nl(e,u)),e=u}}}class Fr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);_0(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Fl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const M0=37297;let y0=0;function S0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ol=new kt;function b0(i){$t._getMatrix(Ol,$t.workingColorSpace,i);const t=`mat3( ${Ol.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case zr:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function kl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+S0(i.getShaderSource(t),a)}else return r}function w0(i,t){const e=b0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const E0={[Bh]:"Linear",[zh]:"Reinhard",[Vh]:"Cineon",[Hh]:"ACESFilmic",[Wh]:"AgX",[Xh]:"Neutral",[Gh]:"Custom"};function T0(i,t){const e=E0[t];return e===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Mr=new I;function A0(){$t.getLuminanceCoefficients(Mr);const i=Mr.x.toFixed(4),t=Mr.y.toFixed(4),e=Mr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ps).join(`
`)}function R0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function P0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ps(i){return i!==""}function Bl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const L0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wa(i){return i.replace(L0,D0)}const I0=new Map;function D0(i,t){let e=Vt[t];if(e===void 0){const n=I0.get(t);if(n!==void 0)e=Vt[n],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Wa(e)}const U0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vl(i){return i.replace(U0,N0)}function N0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const F0={[Lr]:"SHADOWMAP_TYPE_PCF",[Rs]:"SHADOWMAP_TYPE_VSM"};function O0(i){return F0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const k0={[Di]:"ENVMAP_TYPE_CUBE",[hs]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE_UV"};function B0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":k0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const z0={[hs]:"ENVMAP_MODE_REFRACTION"};function V0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":z0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const H0={[oc]:"ENVMAP_BLENDING_MULTIPLY",[Pf]:"ENVMAP_BLENDING_MIX",[Lf]:"ENVMAP_BLENDING_ADD"};function G0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":H0[i.combine]||"ENVMAP_BLENDING_NONE"}function W0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function X0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=O0(e),l=B0(e),h=V0(e),u=G0(e),f=W0(e),d=C0(e),g=R0(r),v=s.createProgram();let m,p,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ps).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ps).join(`
`),p.length>0&&(p+=`
`)):(m=[Hl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ps).join(`
`),p=[Hl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==In?"#define TONE_MAPPING":"",e.toneMapping!==In?Vt.tonemapping_pars_fragment:"",e.toneMapping!==In?T0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,w0("linearToOutputTexel",e.outputColorSpace),A0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ps).join(`
`)),o=Wa(o),o=Bl(o,e),o=zl(o,e),a=Wa(a),a=Bl(a,e),a=zl(a,e),o=Vl(o),a=Vl(a),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===$c?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=_+m+o,M=_+p+a,w=Fl(s,s.VERTEX_SHADER,y),b=Fl(s,s.FRAGMENT_SHADER,M);s.attachShader(v,w),s.attachShader(v,b),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(R){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(w)||"",B=s.getShaderInfoLog(b)||"",U=L.trim(),k=V.trim(),O=B.trim();let $=!0,Z=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,w,b);else{const it=kl(s,w,"vertex"),Q=kl(s,b,"fragment");Yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+U+`
`+it+`
`+Q)}else U!==""?Ut("WebGLProgram: Program Info Log:",U):(k===""||O==="")&&(Z=!1);Z&&(R.diagnostics={runnable:$,programLog:U,vertexShader:{log:k,prefix:m},fragmentShader:{log:O,prefix:p}})}s.deleteShader(w),s.deleteShader(b),x=new Fr(s,v),T=P0(s,v)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,M0)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=y0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=b,this}let $0=0;class q0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Y0(t),e.set(t,n)),n}}class Y0{constructor(t){this.id=$0++,this.code=t,this.usedTimes=0}}function K0(i){return i===Ni||i===Or||i===kr}function Z0(i,t,e,n,s,r){const o=new gc,a=new q0,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function v(x,T,P,R,L,V){const B=R.fog,U=L.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,O=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,$=t.get(x.envMap||k,O),Z=$&&$.mapping===qr?$.image.height:null,it=d[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&Ut("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const Q=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,rt=Q!==void 0?Q.length:0;let bt=0;U.morphAttributes.position!==void 0&&(bt=1),U.morphAttributes.normal!==void 0&&(bt=2),U.morphAttributes.color!==void 0&&(bt=3);let Ft,wt,q,st;if(it){const Mt=Cn[it];Ft=Mt.vertexShader,wt=Mt.fragmentShader}else{Ft=x.vertexShader,wt=x.fragmentShader;const Mt=a.getVertexShaderStage(x),pe=a.getFragmentShaderStage(x);a.update(x,Mt,pe),q=Mt.id,st=pe.id}const nt=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Dt=L.isInstancedMesh===!0,Et=L.isBatchedMesh===!0,Qt=!!x.map,Ot=!!x.matcap,Kt=!!$,Zt=!!x.aoMap,Wt=!!x.lightMap,ue=!!x.bumpMap&&x.wireframe===!1,Se=!!x.normalMap,Te=!!x.displacementMap,Re=!!x.emissiveMap,de=!!x.metalnessMap,_e=!!x.roughnessMap,N=x.anisotropy>0,He=x.clearcoat>0,te=x.dispersion>0,C=x.iridescence>0,S=x.sheen>0,z=x.transmission>0,W=N&&!!x.anisotropyMap,Y=He&&!!x.clearcoatMap,ot=He&&!!x.clearcoatNormalMap,ct=He&&!!x.clearcoatRoughnessMap,K=C&&!!x.iridescenceMap,j=C&&!!x.iridescenceThicknessMap,lt=S&&!!x.sheenColorMap,At=S&&!!x.sheenRoughnessMap,ft=!!x.specularMap,ht=!!x.specularColorMap,Pt=!!x.specularIntensityMap,It=z&&!!x.transmissionMap,Bt=z&&!!x.thicknessMap,D=!!x.gradientMap,at=!!x.alphaMap,J=x.alphaTest>0,ut=!!x.alphaHash,vt=!!x.extensions;let et=In;x.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(et=i.toneMapping);const Tt={shaderID:it,shaderType:x.type,shaderName:x.name,vertexShader:Ft,fragmentShader:wt,defines:x.defines,customVertexShaderID:q,customFragmentShaderID:st,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:Et,batchingColor:Et&&L._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&L.instanceColor!==null,instancingMorph:Dt&&L.morphTexture!==null,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:$t.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Qt,matcap:Ot,envMap:Kt,envMapMode:Kt&&$.mapping,envMapCubeUVHeight:Z,aoMap:Zt,lightMap:Wt,bumpMap:ue,normalMap:Se,displacementMap:Te,emissiveMap:Re,normalMapObjectSpace:Se&&x.normalMapType===Uf,normalMapTangentSpace:Se&&x.normalMapType===ka,packedNormalMap:Se&&x.normalMapType===ka&&K0(x.normalMap.format),metalnessMap:de,roughnessMap:_e,anisotropy:N,anisotropyMap:W,clearcoat:He,clearcoatMap:Y,clearcoatNormalMap:ot,clearcoatRoughnessMap:ct,dispersion:te,iridescence:C,iridescenceMap:K,iridescenceThicknessMap:j,sheen:S,sheenColorMap:lt,sheenRoughnessMap:At,specularMap:ft,specularColorMap:ht,specularIntensityMap:Pt,transmission:z,transmissionMap:It,thicknessMap:Bt,gradientMap:D,opaque:x.transparent===!1&&x.blending===rs&&x.alphaToCoverage===!1,alphaMap:at,alphaTest:J,alphaHash:ut,combine:x.combine,mapUv:Qt&&g(x.map.channel),aoMapUv:Zt&&g(x.aoMap.channel),lightMapUv:Wt&&g(x.lightMap.channel),bumpMapUv:ue&&g(x.bumpMap.channel),normalMapUv:Se&&g(x.normalMap.channel),displacementMapUv:Te&&g(x.displacementMap.channel),emissiveMapUv:Re&&g(x.emissiveMap.channel),metalnessMapUv:de&&g(x.metalnessMap.channel),roughnessMapUv:_e&&g(x.roughnessMap.channel),anisotropyMapUv:W&&g(x.anisotropyMap.channel),clearcoatMapUv:Y&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:ot&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:At&&g(x.sheenRoughnessMap.channel),specularMapUv:ft&&g(x.specularMap.channel),specularColorMapUv:ht&&g(x.specularColorMap.channel),specularIntensityMapUv:Pt&&g(x.specularIntensityMap.channel),transmissionMapUv:It&&g(x.transmissionMap.channel),thicknessMapUv:Bt&&g(x.thicknessMap.channel),alphaMapUv:at&&g(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Se||N),vertexNormals:!!U.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!U.attributes.uv&&(Qt||at),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&Se===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:yt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:bt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:et,decodeVideoTexture:Qt&&x.map.isVideoTexture===!0&&$t.getTransfer(x.map.colorSpace)===ee,decodeVideoTextureEmissive:Re&&x.emissiveMap.isVideoTexture===!0&&$t.getTransfer(x.emissiveMap.colorSpace)===ee,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ve,flipSided:x.side===We,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:vt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&x.extensions.multiDraw===!0||Et)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Tt.vertexUv1s=c.has(1),Tt.vertexUv2s=c.has(2),Tt.vertexUv3s=c.has(3),c.clear(),Tt}function m(x){const T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)T.push(P),T.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(p(T,x),_(T,x),T.push(i.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function p(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function _(x,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function y(x){const T=d[x.type];let P;if(T){const R=Cn[T];P=gd.clone(R.uniforms)}else P=x.uniforms;return P}function M(x,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new X0(i,T,x,s),l.push(P),h.set(T,P)),P}function w(x){if(--x.usedTimes===0){const T=l.indexOf(x);l[T]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function b(x){a.remove(x)}function A(){a.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:y,acquireProgram:M,releaseProgram:w,releaseShaderCache:b,programs:l,dispose:A}}function J0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function j0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Gl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Wl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,g,v,m,p){let _=i[t];return _===void 0?(_={id:f.id,object:f,geometry:d,material:g,materialVariant:o(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:p},i[t]=_):(_.id=f.id,_.object=f,_.geometry=d,_.material=g,_.materialVariant=o(f),_.groupOrder=v,_.renderOrder=f.renderOrder,_.z=m,_.group=p),t++,_}function c(f,d,g,v,m,p){const _=a(f,d,g,v,m,p);g.transmission>0?n.push(_):g.transparent===!0?s.push(_):e.push(_)}function l(f,d,g,v,m,p){const _=a(f,d,g,v,m,p);g.transmission>0?n.unshift(_):g.transparent===!0?s.unshift(_):e.unshift(_)}function h(f,d,g){e.length>1&&e.sort(f||j0),n.length>1&&n.sort(d||Gl),s.length>1&&s.sort(d||Gl),g&&(e.reverse(),n.reverse(),s.reverse())}function u(){for(let f=t,d=i.length;f<d;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function Q0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Wl,i.set(n,[o])):s>=r.length?(o=new Wl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function tv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Gt};break;case"SpotLight":e={position:new I,direction:new I,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function ev(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let nv=0;function iv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function sv(i){const t=new tv,e=ev(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new oe,o=new oe;function a(l){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,_=0,y=0,M=0,w=0,b=0,A=0;l.sort(iv);for(let T=0,P=l.length;T<P;T++){const R=l[T],L=R.color,V=R.intensity,B=R.distance;let U=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Ni?U=R.shadow.map.texture:U=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=L.r*V,u+=L.g*V,f+=L.b*V;else if(R.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(R.sh.coefficients[k],V);A++}else if(R.isDirectionalLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const O=R.shadow,$=e.get(R);$.shadowIntensity=O.intensity,$.shadowBias=O.bias,$.shadowNormalBias=O.normalBias,$.shadowRadius=O.radius,$.shadowMapSize=O.mapSize,n.directionalShadow[d]=$,n.directionalShadowMap[d]=U,n.directionalShadowMatrix[d]=R.shadow.matrix,_++}n.directional[d]=k,d++}else if(R.isSpotLight){const k=t.get(R);k.position.setFromMatrixPosition(R.matrixWorld),k.color.copy(L).multiplyScalar(V),k.distance=B,k.coneCos=Math.cos(R.angle),k.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),k.decay=R.decay,n.spot[v]=k;const O=R.shadow;if(R.map&&(n.spotLightMap[w]=R.map,w++,O.updateMatrices(R),R.castShadow&&b++),n.spotLightMatrix[v]=O.matrix,R.castShadow){const $=e.get(R);$.shadowIntensity=O.intensity,$.shadowBias=O.bias,$.shadowNormalBias=O.normalBias,$.shadowRadius=O.radius,$.shadowMapSize=O.mapSize,n.spotShadow[v]=$,n.spotShadowMap[v]=U,M++}v++}else if(R.isRectAreaLight){const k=t.get(R);k.color.copy(L).multiplyScalar(V),k.halfWidth.set(R.width*.5,0,0),k.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=k,m++}else if(R.isPointLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),k.distance=R.distance,k.decay=R.decay,R.castShadow){const O=R.shadow,$=e.get(R);$.shadowIntensity=O.intensity,$.shadowBias=O.bias,$.shadowNormalBias=O.normalBias,$.shadowRadius=O.radius,$.shadowMapSize=O.mapSize,$.shadowCameraNear=O.camera.near,$.shadowCameraFar=O.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=U,n.pointShadowMatrix[g]=R.shadow.matrix,y++}n.point[g]=k,g++}else if(R.isHemisphereLight){const k=t.get(R);k.skyColor.copy(R.color).multiplyScalar(V),k.groundColor.copy(R.groundColor).multiplyScalar(V),n.hemi[p]=k,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const x=n.hash;(x.directionalLength!==d||x.pointLength!==g||x.spotLength!==v||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==_||x.numPointShadows!==y||x.numSpotShadows!==M||x.numSpotMaps!==w||x.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+w-b,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,x.directionalLength=d,x.pointLength=g,x.spotLength=v,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=_,x.numPointShadows=y,x.numSpotShadows=M,x.numSpotMaps=w,x.numLightProbes=A,n.version=nv++)}function c(l,h){let u=0,f=0,d=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,_=l.length;p<_;p++){const y=l[p];if(y.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(y.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function Xl(i){const t=new sv(i),e=[],n=[],s=[];function r(f){u.camera=f,e.length=0,n.length=0,s.length=0}function o(f){e.push(f)}function a(f){n.push(f)}function c(f){s.push(f)}function l(){t.setup(e)}function h(f){t.setupView(e,f)}const u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function rv(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Xl(i),t.set(s,[a])):r>=o.length?(a=new Xl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const ov=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,av=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,cv=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],lv=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],$l=new oe,bs=new I,Fo=new I;function hv(i,t,e){let n=new vc;const s=new Xt,r=new Xt,o=new fe,a=new Md,c=new yd,l={},h=e.maxTextureSize,u={[vi]:We,[We]:vi,[Ve]:Ve},f=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:ov,fragmentShader:av}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new he;g.setAttribute("position",new Un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ye(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lr;let p=this.type;this.render=function(b,A,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===uf&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Lr);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Jn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const V=p!==this.type;V&&A.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(U=>U.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,U=b.length;B<U;B++){const k=b[B],O=k.shadow;if(O===void 0){Ut("WebGLShadowMap:",k,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const $=O.getFrameExtents();s.multiply($),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,O.mapSize.y=r.y));const Z=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=Z,O.map===null||V===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===Rs){if(k.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new Dn(s.x,s.y,{format:Ni,type:Qn,minFilter:ke,magFilter:ke,generateMipmaps:!1}),O.map.texture.name=k.name+".shadowMap",O.map.depthTexture=new us(s.x,s.y,Pn),O.map.depthTexture.name=k.name+".shadowMapDepth",O.map.depthTexture.format=ti,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ce,O.map.depthTexture.magFilter=Ce}else k.isPointLight?(O.map=new gu(s.x),O.map.depthTexture=new pd(s.x,Fn)):(O.map=new Dn(s.x,s.y),O.map.depthTexture=new us(s.x,s.y,Fn)),O.map.depthTexture.name=k.name+".shadowMap",O.map.depthTexture.format=ti,this.type===Lr?(O.map.depthTexture.compareFunction=Z?pc:dc,O.map.depthTexture.minFilter=ke,O.map.depthTexture.magFilter=ke):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ce,O.map.depthTexture.magFilter=Ce);O.camera.updateProjectionMatrix()}const it=O.map.isWebGLCubeRenderTarget?6:1;for(let Q=0;Q<it;Q++){if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,Q),i.clear();else{Q===0&&(i.setRenderTarget(O.map),i.clear());const rt=O.getViewport(Q);o.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),L.viewport(o)}if(k.isPointLight){const rt=O.camera,bt=O.matrix,Ft=k.distance||rt.far;Ft!==rt.far&&(rt.far=Ft,rt.updateProjectionMatrix()),bs.setFromMatrixPosition(k.matrixWorld),rt.position.copy(bs),Fo.copy(rt.position),Fo.add(cv[Q]),rt.up.copy(lv[Q]),rt.lookAt(Fo),rt.updateMatrixWorld(),bt.makeTranslation(-bs.x,-bs.y,-bs.z),$l.multiplyMatrices(rt.projectionMatrix,rt.matrixWorldInverse),O._frustum.setFromProjectionMatrix($l,rt.coordinateSystem,rt.reversedDepth)}else O.updateMatrices(k);n=O.getFrustum(),M(A,x,O.camera,k,this.type)}O.isPointLightShadow!==!0&&this.type===Rs&&_(O,x),O.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,P,R)};function _(b,A){const x=t.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Dn(s.x,s.y,{format:Ni,type:Qn})),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(A,null,x,f,v,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(A,null,x,d,v,null)}function y(b,A,x,T){let P=null;const R=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)P=R;else if(P=x.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const L=P.uuid,V=A.uuid;let B=l[L];B===void 0&&(B={},l[L]=B);let U=B[V];U===void 0&&(U=P.clone(),B[V]=U,A.addEventListener("dispose",w)),P=U}if(P.visible=A.visible,P.wireframe=A.wireframe,T===Rs?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:u[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const L=i.properties.get(P);L.light=x}return P}function M(b,A,x,T,P){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===Rs)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);const V=t.update(b),B=b.material;if(Array.isArray(B)){const U=V.groups;for(let k=0,O=U.length;k<O;k++){const $=U[k],Z=B[$.materialIndex];if(Z&&Z.visible){const it=y(b,Z,T,P);b.onBeforeShadow(i,b,A,x,V,it,$),i.renderBufferDirect(x,null,V,it,b,$),b.onAfterShadow(i,b,A,x,V,it,$)}}}else if(B.visible){const U=y(b,B,T,P);b.onBeforeShadow(i,b,A,x,V,U,null),i.renderBufferDirect(x,null,V,U,b,null),b.onAfterShadow(i,b,A,x,V,U,null)}}const L=b.children;for(let V=0,B=L.length;V<B;V++)M(L[V],A,x,T,P)}function w(b){b.target.removeEventListener("dispose",w);for(const x in l){const T=l[x],P=b.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function uv(i,t){function e(){let D=!1;const at=new fe;let J=null;const ut=new fe(0,0,0,0);return{setMask:function(vt){J!==vt&&!D&&(i.colorMask(vt,vt,vt,vt),J=vt)},setLocked:function(vt){D=vt},setClear:function(vt,et,Tt,Mt,pe){pe===!0&&(vt*=Mt,et*=Mt,Tt*=Mt),at.set(vt,et,Tt,Mt),ut.equals(at)===!1&&(i.clearColor(vt,et,Tt,Mt),ut.copy(at))},reset:function(){D=!1,J=null,ut.set(-1,0,0,0)}}}function n(){let D=!1,at=!1,J=null,ut=null,vt=null;return{setReversed:function(et){if(at!==et){const Tt=t.get("EXT_clip_control");et?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),at=et;const Mt=vt;vt=null,this.setClear(Mt)}},getReversed:function(){return at},setTest:function(et){et?nt(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(et){J!==et&&!D&&(i.depthMask(et),J=et)},setFunc:function(et){if(at&&(et=Wf[et]),ut!==et){switch(et){case ta:i.depthFunc(i.NEVER);break;case ea:i.depthFunc(i.ALWAYS);break;case na:i.depthFunc(i.LESS);break;case ls:i.depthFunc(i.LEQUAL);break;case ia:i.depthFunc(i.EQUAL);break;case sa:i.depthFunc(i.GEQUAL);break;case ra:i.depthFunc(i.GREATER);break;case oa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ut=et}},setLocked:function(et){D=et},setClear:function(et){vt!==et&&(vt=et,at&&(et=1-et),i.clearDepth(et))},reset:function(){D=!1,J=null,ut=null,vt=null,at=!1}}}function s(){let D=!1,at=null,J=null,ut=null,vt=null,et=null,Tt=null,Mt=null,pe=null;return{setTest:function(ae){D||(ae?nt(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(ae){at!==ae&&!D&&(i.stencilMask(ae),at=ae)},setFunc:function(ae,Mn,yn){(J!==ae||ut!==Mn||vt!==yn)&&(i.stencilFunc(ae,Mn,yn),J=ae,ut=Mn,vt=yn)},setOp:function(ae,Mn,yn){(et!==ae||Tt!==Mn||Mt!==yn)&&(i.stencilOp(ae,Mn,yn),et=ae,Tt=Mn,Mt=yn)},setLocked:function(ae){D=ae},setClear:function(ae){pe!==ae&&(i.clearStencil(ae),pe=ae)},reset:function(){D=!1,at=null,J=null,ut=null,vt=null,et=null,Tt=null,Mt=null,pe=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f={},d=new WeakMap,g=[],v=null,m=!1,p=null,_=null,y=null,M=null,w=null,b=null,A=null,x=new Gt(0,0,0),T=0,P=!1,R=null,L=null,V=null,B=null,U=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,$=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Z)[1]),O=$>=1):Z.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),O=$>=2);let it=null,Q={};const rt=i.getParameter(i.SCISSOR_BOX),bt=i.getParameter(i.VIEWPORT),Ft=new fe().fromArray(rt),wt=new fe().fromArray(bt);function q(D,at,J,ut){const vt=new Uint8Array(4),et=i.createTexture();i.bindTexture(D,et),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Tt=0;Tt<J;Tt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(at,0,i.RGBA,1,1,ut,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(at+Tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return et}const st={};st[i.TEXTURE_2D]=q(i.TEXTURE_2D,i.TEXTURE_2D,1),st[i.TEXTURE_CUBE_MAP]=q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[i.TEXTURE_2D_ARRAY]=q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),st[i.TEXTURE_3D]=q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(i.DEPTH_TEST),o.setFunc(ls),ue(!1),Se(zc),nt(i.CULL_FACE),Zt(Jn);function nt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function yt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Dt(D,at){return f[D]!==at?(i.bindFramebuffer(D,at),f[D]=at,D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=at),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=at),!0):!1}function Et(D,at){let J=g,ut=!1;if(D){J=d.get(at),J===void 0&&(J=[],d.set(at,J));const vt=D.textures;if(J.length!==vt.length||J[0]!==i.COLOR_ATTACHMENT0){for(let et=0,Tt=vt.length;et<Tt;et++)J[et]=i.COLOR_ATTACHMENT0+et;J.length=vt.length,ut=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ut=!0);ut&&i.drawBuffers(J)}function Qt(D){return v!==D?(i.useProgram(D),v=D,!0):!1}const Ot={[Ri]:i.FUNC_ADD,[df]:i.FUNC_SUBTRACT,[pf]:i.FUNC_REVERSE_SUBTRACT};Ot[mf]=i.MIN,Ot[gf]=i.MAX;const Kt={[vf]:i.ZERO,[xf]:i.ONE,[_f]:i.SRC_COLOR,[jo]:i.SRC_ALPHA,[Ef]:i.SRC_ALPHA_SATURATE,[bf]:i.DST_COLOR,[yf]:i.DST_ALPHA,[Mf]:i.ONE_MINUS_SRC_COLOR,[Qo]:i.ONE_MINUS_SRC_ALPHA,[wf]:i.ONE_MINUS_DST_COLOR,[Sf]:i.ONE_MINUS_DST_ALPHA,[Tf]:i.CONSTANT_COLOR,[Af]:i.ONE_MINUS_CONSTANT_COLOR,[Cf]:i.CONSTANT_ALPHA,[Rf]:i.ONE_MINUS_CONSTANT_ALPHA};function Zt(D,at,J,ut,vt,et,Tt,Mt,pe,ae){if(D===Jn){m===!0&&(yt(i.BLEND),m=!1);return}if(m===!1&&(nt(i.BLEND),m=!0),D!==ff){if(D!==p||ae!==P){if((_!==Ri||w!==Ri)&&(i.blendEquation(i.FUNC_ADD),_=Ri,w=Ri),ae)switch(D){case rs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFunc(i.ONE,i.ONE);break;case Hc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Yt("WebGLState: Invalid blending: ",D);break}else switch(D){case rs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Hc:Yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gc:Yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Yt("WebGLState: Invalid blending: ",D);break}y=null,M=null,b=null,A=null,x.set(0,0,0),T=0,p=D,P=ae}return}vt=vt||at,et=et||J,Tt=Tt||ut,(at!==_||vt!==w)&&(i.blendEquationSeparate(Ot[at],Ot[vt]),_=at,w=vt),(J!==y||ut!==M||et!==b||Tt!==A)&&(i.blendFuncSeparate(Kt[J],Kt[ut],Kt[et],Kt[Tt]),y=J,M=ut,b=et,A=Tt),(Mt.equals(x)===!1||pe!==T)&&(i.blendColor(Mt.r,Mt.g,Mt.b,pe),x.copy(Mt),T=pe),p=D,P=!1}function Wt(D,at){D.side===Ve?yt(i.CULL_FACE):nt(i.CULL_FACE);let J=D.side===We;at&&(J=!J),ue(J),D.blending===rs&&D.transparent===!1?Zt(Jn):Zt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const ut=D.stencilWrite;a.setTest(ut),ut&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Re(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ue(D){R!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),R=D)}function Se(D){D!==lf?(nt(i.CULL_FACE),D!==L&&(D===zc?i.cullFace(i.BACK):D===hf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),L=D}function Te(D){D!==V&&(O&&i.lineWidth(D),V=D)}function Re(D,at,J){D?(nt(i.POLYGON_OFFSET_FILL),(B!==at||U!==J)&&(B=at,U=J,o.getReversed()&&(at=-at),i.polygonOffset(at,J))):yt(i.POLYGON_OFFSET_FILL)}function de(D){D?nt(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function _e(D){D===void 0&&(D=i.TEXTURE0+k-1),it!==D&&(i.activeTexture(D),it=D)}function N(D,at,J){J===void 0&&(it===null?J=i.TEXTURE0+k-1:J=it);let ut=Q[J];ut===void 0&&(ut={type:void 0,texture:void 0},Q[J]=ut),(ut.type!==D||ut.texture!==at)&&(it!==J&&(i.activeTexture(J),it=J),i.bindTexture(D,at||st[D]),ut.type=D,ut.texture=at)}function He(){const D=Q[it];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function te(){try{i.compressedTexImage2D(...arguments)}catch(D){Yt("WebGLState:",D)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(D){Yt("WebGLState:",D)}}function S(){try{i.texSubImage2D(...arguments)}catch(D){Yt("WebGLState:",D)}}function z(){try{i.texSubImage3D(...arguments)}catch(D){Yt("WebGLState:",D)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Yt("WebGLState:",D)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Yt("WebGLState:",D)}}function ot(){try{i.texStorage2D(...arguments)}catch(D){Yt("WebGLState:",D)}}function ct(){try{i.texStorage3D(...arguments)}catch(D){Yt("WebGLState:",D)}}function K(){try{i.texImage2D(...arguments)}catch(D){Yt("WebGLState:",D)}}function j(){try{i.texImage3D(...arguments)}catch(D){Yt("WebGLState:",D)}}function lt(D){return u[D]!==void 0?u[D]:i.getParameter(D)}function At(D,at){u[D]!==at&&(i.pixelStorei(D,at),u[D]=at)}function ft(D){Ft.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Ft.copy(D))}function ht(D){wt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),wt.copy(D))}function Pt(D,at){let J=l.get(at);J===void 0&&(J=new WeakMap,l.set(at,J));let ut=J.get(D);ut===void 0&&(ut=i.getUniformBlockIndex(at,D.name),J.set(D,ut))}function It(D,at){const ut=l.get(at).get(D);c.get(at)!==ut&&(i.uniformBlockBinding(at,ut,D.__bindingPointIndex),c.set(at,ut))}function Bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},it=null,Q={},f={},d=new WeakMap,g=[],v=null,m=!1,p=null,_=null,y=null,M=null,w=null,b=null,A=null,x=new Gt(0,0,0),T=0,P=!1,R=null,L=null,V=null,B=null,U=null,Ft.set(0,0,i.canvas.width,i.canvas.height),wt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:yt,bindFramebuffer:Dt,drawBuffers:Et,useProgram:Qt,setBlending:Zt,setMaterial:Wt,setFlipSided:ue,setCullFace:Se,setLineWidth:Te,setPolygonOffset:Re,setScissorTest:de,activeTexture:_e,bindTexture:N,unbindTexture:He,compressedTexImage2D:te,compressedTexImage3D:C,texImage2D:K,texImage3D:j,pixelStorei:At,getParameter:lt,updateUBOMapping:Pt,uniformBlockBinding:It,texStorage2D:ot,texStorage3D:ct,texSubImage2D:S,texSubImage3D:z,compressedTexSubImage2D:W,compressedTexSubImage3D:Y,scissor:ft,viewport:ht,reset:Bt}}function fv(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xt,h=new WeakMap,u=new Set;let f;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,S){return g?new OffscreenCanvas(C,S):Vr("canvas")}function m(C,S,z){let W=1;const Y=te(C);if((Y.width>z||Y.height>z)&&(W=z/Math.max(Y.width,Y.height)),W<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const ot=Math.floor(W*Y.width),ct=Math.floor(W*Y.height);f===void 0&&(f=v(ot,ct));const K=S?v(ot,ct):f;return K.width=ot,K.height=ct,K.getContext("2d").drawImage(C,0,0,ot,ct),Ut("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ot+"x"+ct+")."),K}else return"data"in C&&Ut("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),C;return C}function p(C){return C.generateMipmaps}function _(C){i.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(C,S,z,W,Y,ot=!1){if(C!==null){if(i[C]!==void 0)return i[C];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ct;W&&(ct=t.get("EXT_texture_norm16"),ct||Ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=S;if(S===i.RED&&(z===i.FLOAT&&(K=i.R32F),z===i.HALF_FLOAT&&(K=i.R16F),z===i.UNSIGNED_BYTE&&(K=i.R8),z===i.UNSIGNED_SHORT&&ct&&(K=ct.R16_EXT),z===i.SHORT&&ct&&(K=ct.R16_SNORM_EXT)),S===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.R8UI),z===i.UNSIGNED_SHORT&&(K=i.R16UI),z===i.UNSIGNED_INT&&(K=i.R32UI),z===i.BYTE&&(K=i.R8I),z===i.SHORT&&(K=i.R16I),z===i.INT&&(K=i.R32I)),S===i.RG&&(z===i.FLOAT&&(K=i.RG32F),z===i.HALF_FLOAT&&(K=i.RG16F),z===i.UNSIGNED_BYTE&&(K=i.RG8),z===i.UNSIGNED_SHORT&&ct&&(K=ct.RG16_EXT),z===i.SHORT&&ct&&(K=ct.RG16_SNORM_EXT)),S===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RG8UI),z===i.UNSIGNED_SHORT&&(K=i.RG16UI),z===i.UNSIGNED_INT&&(K=i.RG32UI),z===i.BYTE&&(K=i.RG8I),z===i.SHORT&&(K=i.RG16I),z===i.INT&&(K=i.RG32I)),S===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGB8UI),z===i.UNSIGNED_SHORT&&(K=i.RGB16UI),z===i.UNSIGNED_INT&&(K=i.RGB32UI),z===i.BYTE&&(K=i.RGB8I),z===i.SHORT&&(K=i.RGB16I),z===i.INT&&(K=i.RGB32I)),S===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),z===i.UNSIGNED_INT&&(K=i.RGBA32UI),z===i.BYTE&&(K=i.RGBA8I),z===i.SHORT&&(K=i.RGBA16I),z===i.INT&&(K=i.RGBA32I)),S===i.RGB&&(z===i.UNSIGNED_SHORT&&ct&&(K=ct.RGB16_EXT),z===i.SHORT&&ct&&(K=ct.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),S===i.RGBA){const j=ot?zr:$t.getTransfer(Y);z===i.FLOAT&&(K=i.RGBA32F),z===i.HALF_FLOAT&&(K=i.RGBA16F),z===i.UNSIGNED_BYTE&&(K=j===ee?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&ct&&(K=ct.RGBA16_EXT),z===i.SHORT&&ct&&(K=ct.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function w(C,S){let z;return C?S===null||S===Fn||S===Fs?z=i.DEPTH24_STENCIL8:S===Pn?z=i.DEPTH32F_STENCIL8:S===Ns&&(z=i.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Fn||S===Fs?z=i.DEPTH_COMPONENT24:S===Pn?z=i.DEPTH_COMPONENT32F:S===Ns&&(z=i.DEPTH_COMPONENT16),z}function b(C,S){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ce&&C.minFilter!==ke?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function A(C){const S=C.target;S.removeEventListener("dispose",A),T(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&u.delete(S)}function x(C){const S=C.target;S.removeEventListener("dispose",x),R(S)}function T(C){const S=n.get(C);if(S.__webglInit===void 0)return;const z=C.source,W=d.get(z);if(W){const Y=W[S.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(C),Object.keys(W).length===0&&d.delete(z)}n.remove(C)}function P(C){const S=n.get(C);i.deleteTexture(S.__webglTexture);const z=C.source,W=d.get(z);delete W[S.__cacheKey],o.memory.textures--}function R(C){const S=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(S.__webglFramebuffer[W]))for(let Y=0;Y<S.__webglFramebuffer[W].length;Y++)i.deleteFramebuffer(S.__webglFramebuffer[W][Y]);else i.deleteFramebuffer(S.__webglFramebuffer[W]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[W])}else{if(Array.isArray(S.__webglFramebuffer))for(let W=0;W<S.__webglFramebuffer.length;W++)i.deleteFramebuffer(S.__webglFramebuffer[W]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let W=0;W<S.__webglColorRenderbuffer.length;W++)S.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[W]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const z=C.textures;for(let W=0,Y=z.length;W<Y;W++){const ot=n.get(z[W]);ot.__webglTexture&&(i.deleteTexture(ot.__webglTexture),o.memory.textures--),n.remove(z[W])}n.remove(C)}let L=0;function V(){L=0}function B(){return L}function U(C){L=C}function k(){const C=L;return C>=s.maxTextures&&Ut("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),L+=1,C}function O(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function $(C,S){const z=n.get(C);if(C.isVideoTexture&&N(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){const W=C.image;if(W===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(z,C,S);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+S)}function Z(C,S){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){yt(z,C,S);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+S)}function it(C,S){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){yt(z,C,S);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+S)}function Q(C,S){const z=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){Dt(z,C,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+S)}const rt={[Ui]:i.REPEAT,[Zn]:i.CLAMP_TO_EDGE,[aa]:i.MIRRORED_REPEAT},bt={[Ce]:i.NEAREST,[If]:i.NEAREST_MIPMAP_NEAREST,[Ks]:i.NEAREST_MIPMAP_LINEAR,[ke]:i.LINEAR,[io]:i.LINEAR_MIPMAP_NEAREST,[Li]:i.LINEAR_MIPMAP_LINEAR},Ft={[Nf]:i.NEVER,[zf]:i.ALWAYS,[Ff]:i.LESS,[dc]:i.LEQUAL,[Of]:i.EQUAL,[pc]:i.GEQUAL,[kf]:i.GREATER,[Bf]:i.NOTEQUAL};function wt(C,S){if(S.type===Pn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===ke||S.magFilter===io||S.magFilter===Ks||S.magFilter===Li||S.minFilter===ke||S.minFilter===io||S.minFilter===Ks||S.minFilter===Li)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,rt[S.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,rt[S.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,rt[S.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,bt[S.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,bt[S.minFilter]),S.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Ft[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ce||S.minFilter!==Ks&&S.minFilter!==Li||S.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function q(C,S){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",A));const W=S.source;let Y=d.get(W);Y===void 0&&(Y={},d.set(W,Y));const ot=O(S);if(ot!==C.__cacheKey){Y[ot]===void 0&&(Y[ot]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Y[ot].usedTimes++;const ct=Y[C.__cacheKey];ct!==void 0&&(Y[C.__cacheKey].usedTimes--,ct.usedTimes===0&&P(S)),C.__cacheKey=ot,C.__webglTexture=Y[ot].texture}return z}function st(C,S,z){return Math.floor(Math.floor(C/z)/S)}function nt(C,S,z,W){const ot=C.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,z,W,S.data);else{ot.sort((At,ft)=>At.start-ft.start);let ct=0;for(let At=1;At<ot.length;At++){const ft=ot[ct],ht=ot[At],Pt=ft.start+ft.count,It=st(ht.start,S.width,4),Bt=st(ft.start,S.width,4);ht.start<=Pt+1&&It===Bt&&st(ht.start+ht.count-1,S.width,4)===It?ft.count=Math.max(ft.count,ht.start+ht.count-ft.start):(++ct,ot[ct]=ht)}ot.length=ct+1;const K=e.getParameter(i.UNPACK_ROW_LENGTH),j=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let At=0,ft=ot.length;At<ft;At++){const ht=ot[At],Pt=Math.floor(ht.start/4),It=Math.ceil(ht.count/4),Bt=Pt%S.width,D=Math.floor(Pt/S.width),at=It,J=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Bt,D,at,J,z,W,S.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,K),e.pixelStorei(i.UNPACK_SKIP_PIXELS,j),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function yt(C,S,z){let W=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(W=i.TEXTURE_3D);const Y=q(C,S),ot=S.source;e.bindTexture(W,C.__webglTexture,i.TEXTURE0+z);const ct=n.get(ot);if(ot.version!==ct.__version||Y===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const J=$t.getPrimaries($t.workingColorSpace),ut=S.colorSpace===di?null:$t.getPrimaries(S.colorSpace),vt=S.colorSpace===di||J===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let j=m(S.image,!1,s.maxTextureSize);j=He(S,j);const lt=r.convert(S.format,S.colorSpace),At=r.convert(S.type);let ft=M(S.internalFormat,lt,At,S.normalized,S.colorSpace,S.isVideoTexture);wt(W,S);let ht;const Pt=S.mipmaps,It=S.isVideoTexture!==!0,Bt=ct.__version===void 0||Y===!0,D=ot.dataReady,at=b(S,j);if(S.isDepthTexture)ft=w(S.format===Ii,S.type),Bt&&(It?e.texStorage2D(i.TEXTURE_2D,1,ft,j.width,j.height):e.texImage2D(i.TEXTURE_2D,0,ft,j.width,j.height,0,lt,At,null));else if(S.isDataTexture)if(Pt.length>0){It&&Bt&&e.texStorage2D(i.TEXTURE_2D,at,ft,Pt[0].width,Pt[0].height);for(let J=0,ut=Pt.length;J<ut;J++)ht=Pt[J],It?D&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ht.width,ht.height,lt,At,ht.data):e.texImage2D(i.TEXTURE_2D,J,ft,ht.width,ht.height,0,lt,At,ht.data);S.generateMipmaps=!1}else It?(Bt&&e.texStorage2D(i.TEXTURE_2D,at,ft,j.width,j.height),D&&nt(S,j,lt,At)):e.texImage2D(i.TEXTURE_2D,0,ft,j.width,j.height,0,lt,At,j.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){It&&Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,ft,Pt[0].width,Pt[0].height,j.depth);for(let J=0,ut=Pt.length;J<ut;J++)if(ht=Pt[J],S.format!==gn)if(lt!==null)if(It){if(D)if(S.layerUpdates.size>0){const vt=bl(ht.width,ht.height,S.format,S.type);for(const et of S.layerUpdates){const Tt=ht.data.subarray(et*vt/ht.data.BYTES_PER_ELEMENT,(et+1)*vt/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,et,ht.width,ht.height,1,lt,Tt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,j.depth,lt,ht.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,ft,ht.width,ht.height,j.depth,0,ht.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else It?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,j.depth,lt,At,ht.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,ft,ht.width,ht.height,j.depth,0,lt,At,ht.data)}else{It&&Bt&&e.texStorage2D(i.TEXTURE_2D,at,ft,Pt[0].width,Pt[0].height);for(let J=0,ut=Pt.length;J<ut;J++)ht=Pt[J],S.format!==gn?lt!==null?It?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ht.width,ht.height,lt,ht.data):e.compressedTexImage2D(i.TEXTURE_2D,J,ft,ht.width,ht.height,0,ht.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):It?D&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ht.width,ht.height,lt,At,ht.data):e.texImage2D(i.TEXTURE_2D,J,ft,ht.width,ht.height,0,lt,At,ht.data)}else if(S.isDataArrayTexture)if(It){if(Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,ft,j.width,j.height,j.depth),D)if(S.layerUpdates.size>0){const J=bl(j.width,j.height,S.format,S.type);for(const ut of S.layerUpdates){const vt=j.data.subarray(ut*J/j.data.BYTES_PER_ELEMENT,(ut+1)*J/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,j.width,j.height,1,lt,At,vt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,lt,At,j.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ft,j.width,j.height,j.depth,0,lt,At,j.data);else if(S.isData3DTexture)It?(Bt&&e.texStorage3D(i.TEXTURE_3D,at,ft,j.width,j.height,j.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,lt,At,j.data)):e.texImage3D(i.TEXTURE_3D,0,ft,j.width,j.height,j.depth,0,lt,At,j.data);else if(S.isFramebufferTexture){if(Bt)if(It)e.texStorage2D(i.TEXTURE_2D,at,ft,j.width,j.height);else{let J=j.width,ut=j.height;for(let vt=0;vt<at;vt++)e.texImage2D(i.TEXTURE_2D,vt,ft,J,ut,0,lt,At,null),J>>=1,ut>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){const J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),j.parentNode!==J){J.appendChild(j),u.add(S),J.onpaint=ut=>{const vt=ut.changedElements;for(const et of u)vt.includes(et.image)&&(et.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{const vt=i.RGBA,et=i.RGBA,Tt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,vt,et,Tt,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pt.length>0){if(It&&Bt){const J=te(Pt[0]);e.texStorage2D(i.TEXTURE_2D,at,ft,J.width,J.height)}for(let J=0,ut=Pt.length;J<ut;J++)ht=Pt[J],It?D&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,lt,At,ht):e.texImage2D(i.TEXTURE_2D,J,ft,lt,At,ht);S.generateMipmaps=!1}else if(It){if(Bt){const J=te(j);e.texStorage2D(i.TEXTURE_2D,at,ft,J.width,J.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,At,j)}else e.texImage2D(i.TEXTURE_2D,0,ft,lt,At,j);p(S)&&_(W),ct.__version=ot.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function Dt(C,S,z){if(S.image.length!==6)return;const W=q(C,S),Y=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+z);const ot=n.get(Y);if(Y.version!==ot.__version||W===!0){e.activeTexture(i.TEXTURE0+z);const ct=$t.getPrimaries($t.workingColorSpace),K=S.colorSpace===di?null:$t.getPrimaries(S.colorSpace),j=S.colorSpace===di||ct===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const lt=S.isCompressedTexture||S.image[0].isCompressedTexture,At=S.image[0]&&S.image[0].isDataTexture,ft=[];for(let et=0;et<6;et++)!lt&&!At?ft[et]=m(S.image[et],!0,s.maxCubemapSize):ft[et]=At?S.image[et].image:S.image[et],ft[et]=He(S,ft[et]);const ht=ft[0],Pt=r.convert(S.format,S.colorSpace),It=r.convert(S.type),Bt=M(S.internalFormat,Pt,It,S.normalized,S.colorSpace),D=S.isVideoTexture!==!0,at=ot.__version===void 0||W===!0,J=Y.dataReady;let ut=b(S,ht);wt(i.TEXTURE_CUBE_MAP,S);let vt;if(lt){D&&at&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Bt,ht.width,ht.height);for(let et=0;et<6;et++){vt=ft[et].mipmaps;for(let Tt=0;Tt<vt.length;Tt++){const Mt=vt[Tt];S.format!==gn?Pt!==null?D?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt,0,0,Mt.width,Mt.height,Pt,Mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt,Bt,Mt.width,Mt.height,0,Mt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt,0,0,Mt.width,Mt.height,Pt,It,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt,Bt,Mt.width,Mt.height,0,Pt,It,Mt.data)}}}else{if(vt=S.mipmaps,D&&at){vt.length>0&&ut++;const et=te(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Bt,et.width,et.height)}for(let et=0;et<6;et++)if(At){D?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,ft[et].width,ft[et].height,Pt,It,ft[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Bt,ft[et].width,ft[et].height,0,Pt,It,ft[et].data);for(let Tt=0;Tt<vt.length;Tt++){const pe=vt[Tt].image[et].image;D?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt+1,0,0,pe.width,pe.height,Pt,It,pe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt+1,Bt,pe.width,pe.height,0,Pt,It,pe.data)}}else{D?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Pt,It,ft[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Bt,Pt,It,ft[et]);for(let Tt=0;Tt<vt.length;Tt++){const Mt=vt[Tt];D?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt+1,0,0,Pt,It,Mt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt+1,Bt,Pt,It,Mt.image[et])}}}p(S)&&_(i.TEXTURE_CUBE_MAP),ot.__version=Y.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function Et(C,S,z,W,Y,ot){const ct=r.convert(z.format,z.colorSpace),K=r.convert(z.type),j=M(z.internalFormat,ct,K,z.normalized,z.colorSpace),lt=n.get(S),At=n.get(z);if(At.__renderTarget=S,!lt.__hasExternalTextures){const ft=Math.max(1,S.width>>ot),ht=Math.max(1,S.height>>ot);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,ot,j,ft,ht,S.depth,0,ct,K,null):e.texImage2D(Y,ot,j,ft,ht,0,ct,K,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),_e(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,Y,At.__webglTexture,0,de(S)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,Y,At.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Qt(C,S,z){if(i.bindRenderbuffer(i.RENDERBUFFER,C),S.depthBuffer){const W=S.depthTexture,Y=W&&W.isDepthTexture?W.type:null,ot=w(S.stencilBuffer,Y),ct=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_e(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de(S),ot,S.width,S.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,de(S),ot,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ot,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,C)}else{const W=S.textures;for(let Y=0;Y<W.length;Y++){const ot=W[Y],ct=r.convert(ot.format,ot.colorSpace),K=r.convert(ot.type),j=M(ot.internalFormat,ct,K,ot.normalized,ot.colorSpace);_e(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de(S),j,S.width,S.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,de(S),j,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,j,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ot(C,S,z){const W=S.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(S.depthTexture);if(Y.__renderTarget=S,(!Y.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),W){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,S.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),wt(i.TEXTURE_CUBE_MAP,S.depthTexture);const lt=r.convert(S.depthTexture.format),At=r.convert(S.depthTexture.type);let ft;S.depthTexture.format===ti?ft=i.DEPTH_COMPONENT24:S.depthTexture.format===Ii&&(ft=i.DEPTH24_STENCIL8);for(let ht=0;ht<6;ht++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,ft,S.width,S.height,0,lt,At,null)}}else $(S.depthTexture,0);const ot=Y.__webglTexture,ct=de(S),K=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,j=S.depthTexture.format===Ii?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===ti)_e(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,K,ot,0,ct):i.framebufferTexture2D(i.FRAMEBUFFER,j,K,ot,0);else if(S.depthTexture.format===Ii)_e(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,K,ot,0,ct):i.framebufferTexture2D(i.FRAMEBUFFER,j,K,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Kt(C){const S=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){const W=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),W){const Y=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,W.removeEventListener("dispose",Y)};W.addEventListener("dispose",Y),S.__depthDisposeCallback=Y}S.__boundDepthTexture=W}if(C.depthTexture&&!S.__autoAllocateDepthBuffer)if(z)for(let W=0;W<6;W++)Ot(S.__webglFramebuffer[W],C,W);else{const W=C.texture.mipmaps;W&&W.length>0?Ot(S.__webglFramebuffer[0],C,0):Ot(S.__webglFramebuffer,C,0)}else if(z){S.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[W]),S.__webglDepthbuffer[W]===void 0)S.__webglDepthbuffer[W]=i.createRenderbuffer(),Qt(S.__webglDepthbuffer[W],C,!1);else{const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=S.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ot)}}else{const W=C.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),Qt(S.__webglDepthbuffer,C,!1);else{const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ot)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Zt(C,S,z){const W=n.get(C);S!==void 0&&Et(W.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Kt(C)}function Wt(C){const S=C.texture,z=n.get(C),W=n.get(S);C.addEventListener("dispose",x);const Y=C.textures,ot=C.isWebGLCubeRenderTarget===!0,ct=Y.length>1;if(ct||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=S.version,o.memory.textures++),ot){z.__webglFramebuffer=[];for(let K=0;K<6;K++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[K]=[];for(let j=0;j<S.mipmaps.length;j++)z.__webglFramebuffer[K][j]=i.createFramebuffer()}else z.__webglFramebuffer[K]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let K=0;K<S.mipmaps.length;K++)z.__webglFramebuffer[K]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(ct)for(let K=0,j=Y.length;K<j;K++){const lt=n.get(Y[K]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&_e(C)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){const j=Y[K];z.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[K]);const lt=r.convert(j.format,j.colorSpace),At=r.convert(j.type),ft=M(j.internalFormat,lt,At,j.normalized,j.colorSpace,C.isXRRenderTarget===!0),ht=de(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,ft,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,z.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Qt(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),wt(i.TEXTURE_CUBE_MAP,S);for(let K=0;K<6;K++)if(S.mipmaps&&S.mipmaps.length>0)for(let j=0;j<S.mipmaps.length;j++)Et(z.__webglFramebuffer[K][j],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,j);else Et(z.__webglFramebuffer[K],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);p(S)&&_(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let K=0,j=Y.length;K<j;K++){const lt=Y[K],At=n.get(lt);let ft=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ft=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,At.__webglTexture),wt(ft,lt),Et(z.__webglFramebuffer,C,lt,i.COLOR_ATTACHMENT0+K,ft,0),p(lt)&&_(ft)}e.unbindTexture()}else{let K=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,W.__webglTexture),wt(K,S),S.mipmaps&&S.mipmaps.length>0)for(let j=0;j<S.mipmaps.length;j++)Et(z.__webglFramebuffer[j],C,S,i.COLOR_ATTACHMENT0,K,j);else Et(z.__webglFramebuffer,C,S,i.COLOR_ATTACHMENT0,K,0);p(S)&&_(K),e.unbindTexture()}C.depthBuffer&&Kt(C)}function ue(C){const S=C.textures;for(let z=0,W=S.length;z<W;z++){const Y=S[z];if(p(Y)){const ot=y(C),ct=n.get(Y).__webglTexture;e.bindTexture(ot,ct),_(ot),e.unbindTexture()}}}const Se=[],Te=[];function Re(C){if(C.samples>0){if(_e(C)===!1){const S=C.textures,z=C.width,W=C.height;let Y=i.COLOR_BUFFER_BIT;const ot=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=n.get(C),K=S.length>1;if(K)for(let lt=0;lt<S.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer);const j=C.texture.mipmaps;j&&j.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let lt=0;lt<S.length;lt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ct.__webglColorRenderbuffer[lt]);const At=n.get(S[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,At,0)}i.blitFramebuffer(0,0,z,W,0,0,z,W,Y,i.NEAREST),c===!0&&(Se.length=0,Te.length=0,Se.push(i.COLOR_ATTACHMENT0+lt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Se.push(ot),Te.push(ot),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Te)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Se))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let lt=0;lt<S.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,ct.__webglColorRenderbuffer[lt]);const At=n.get(S[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,At,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const S=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function de(C){return Math.min(s.maxSamples,C.samples)}function _e(C){const S=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function N(C){const S=o.render.frame;h.get(C)!==S&&(h.set(C,S),C.update())}function He(C,S){const z=C.colorSpace,W=C.format,Y=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Br&&z!==di&&($t.getTransfer(z)===ee?(W!==gn||Y!==Ke)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Yt("WebGLTextures: Unsupported texture color space:",z)),S}function te(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=V,this.getTextureUnits=B,this.setTextureUnits=U,this.setTexture2D=$,this.setTexture2DArray=Z,this.setTexture3D=it,this.setTextureCube=Q,this.rebindTextures=Zt,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=Kt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=_e,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function dv(i,t){function e(n,s=di){let r;const o=$t.getTransfer(s);if(n===Ke)return i.UNSIGNED_BYTE;if(n===cc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===lc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Kh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===qh)return i.BYTE;if(n===Yh)return i.SHORT;if(n===Ns)return i.UNSIGNED_SHORT;if(n===ac)return i.INT;if(n===Fn)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===Qn)return i.HALF_FLOAT;if(n===Jh)return i.ALPHA;if(n===jh)return i.RGB;if(n===gn)return i.RGBA;if(n===ti)return i.DEPTH_COMPONENT;if(n===Ii)return i.DEPTH_STENCIL;if(n===Qh)return i.RED;if(n===hc)return i.RED_INTEGER;if(n===Ni)return i.RG;if(n===uc)return i.RG_INTEGER;if(n===fc)return i.RGBA_INTEGER;if(n===Ir||n===Dr||n===Ur||n===Nr)if(o===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ir)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ir)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ca||n===la||n===ha||n===ua)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ca)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===la)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ha)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ua)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fa||n===da||n===pa||n===ma||n===ga||n===Or||n===va)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===fa||n===da)return o===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===pa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ma)return r.COMPRESSED_R11_EAC;if(n===ga)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Or)return r.COMPRESSED_RG11_EAC;if(n===va)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===xa||n===_a||n===Ma||n===ya||n===Sa||n===ba||n===wa||n===Ea||n===Ta||n===Aa||n===Ca||n===Ra||n===Pa||n===La)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_a)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ma)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ya)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Sa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ba)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ea)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ta)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Aa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ca)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ra)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===La)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ia||n===Da||n===Ua)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ia)return o===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Da)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ua)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Na||n===Fa||n===kr||n===Oa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Na)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Fa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===kr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Fs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const pv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class gv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new au(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new kn({vertexShader:pv,fragmentShader:mv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ye(new Ws(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vv extends Oi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new gv,p={},_=e.getContextAttributes();let y=null,M=null;const w=[],b=[],A=new Xt;let x=null;const T=new rn;T.viewport=new fe;const P=new rn;P.viewport=new fe;const R=[T,P],L=new Td;let V=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let st=w[q];return st===void 0&&(st=new uo,w[q]=st),st.getTargetRaySpace()},this.getControllerGrip=function(q){let st=w[q];return st===void 0&&(st=new uo,w[q]=st),st.getGripSpace()},this.getHand=function(q){let st=w[q];return st===void 0&&(st=new uo,w[q]=st),st.getHandSpace()};function U(q){const st=b.indexOf(q.inputSource);if(st===-1)return;const nt=w[st];nt!==void 0&&(nt.update(q.inputSource,q.frame,l||o),nt.dispatchEvent({type:q.type,data:q.inputSource}))}function k(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",O);for(let q=0;q<w.length;q++){const st=b[q];st!==null&&(b[q]=null,w[q].disconnect(st))}V=null,B=null,m.reset();for(const q in p)delete p[q];t.setRenderTarget(y),d=null,f=null,u=null,s=null,M=null,wt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",k),s.addEventListener("inputsourceschange",O),_.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,yt=null,Dt=null;_.depth&&(Dt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=_.stencil?Ii:ti,yt=_.stencil?Fs:Fn);const Et={colorFormat:e.RGBA8,depthFormat:Dt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Et),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new Dn(f.textureWidth,f.textureHeight,{format:gn,type:Ke,depthTexture:new us(f.textureWidth,f.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const nt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Dn(d.framebufferWidth,d.framebufferHeight,{format:gn,type:Ke,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),wt.setContext(s),wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function O(q){for(let st=0;st<q.removed.length;st++){const nt=q.removed[st],yt=b.indexOf(nt);yt>=0&&(b[yt]=null,w[yt].disconnect(nt))}for(let st=0;st<q.added.length;st++){const nt=q.added[st];let yt=b.indexOf(nt);if(yt===-1){for(let Et=0;Et<w.length;Et++)if(Et>=b.length){b.push(nt),yt=Et;break}else if(b[Et]===null){b[Et]=nt,yt=Et;break}if(yt===-1)break}const Dt=w[yt];Dt&&Dt.connect(nt)}}const $=new I,Z=new I;function it(q,st,nt){$.setFromMatrixPosition(st.matrixWorld),Z.setFromMatrixPosition(nt.matrixWorld);const yt=$.distanceTo(Z),Dt=st.projectionMatrix.elements,Et=nt.projectionMatrix.elements,Qt=Dt[14]/(Dt[10]-1),Ot=Dt[14]/(Dt[10]+1),Kt=(Dt[9]+1)/Dt[5],Zt=(Dt[9]-1)/Dt[5],Wt=(Dt[8]-1)/Dt[0],ue=(Et[8]+1)/Et[0],Se=Qt*Wt,Te=Qt*ue,Re=yt/(-Wt+ue),de=Re*-Wt;if(st.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(de),q.translateZ(Re),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Dt[10]===-1)q.projectionMatrix.copy(st.projectionMatrix),q.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const _e=Qt+Re,N=Ot+Re,He=Se-de,te=Te+(yt-de),C=Kt*Ot/N*_e,S=Zt*Ot/N*_e;q.projectionMatrix.makePerspective(He,te,C,S,_e,N),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Q(q,st){st===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(st.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let st=q.near,nt=q.far;m.texture!==null&&(m.depthNear>0&&(st=m.depthNear),m.depthFar>0&&(nt=m.depthFar)),L.near=P.near=T.near=st,L.far=P.far=T.far=nt,(V!==L.near||B!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),V=L.near,B=L.far),L.layers.mask=q.layers.mask|6,T.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;const yt=q.parent,Dt=L.cameras;Q(L,yt);for(let Et=0;Et<Dt.length;Et++)Q(Dt[Et],yt);Dt.length===2?it(L,T,P):L.projectionMatrix.copy(T.projectionMatrix),rt(q,L,yt)};function rt(q,st,nt){nt===null?q.matrix.copy(st.matrixWorld):(q.matrix.copy(nt.matrixWorld),q.matrix.invert(),q.matrix.multiply(st.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(st.projectionMatrix),q.projectionMatrixInverse.copy(st.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ba*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(q){return p[q]};let bt=null;function Ft(q,st){if(h=st.getViewerPose(l||o),g=st,h!==null){const nt=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let yt=!1;nt.length!==L.cameras.length&&(L.cameras.length=0,yt=!0);for(let Ot=0;Ot<nt.length;Ot++){const Kt=nt[Ot];let Zt=null;if(d!==null)Zt=d.getViewport(Kt);else{const ue=u.getViewSubImage(f,Kt);Zt=ue.viewport,Ot===0&&(t.setRenderTargetTextures(M,ue.colorTexture,ue.depthStencilTexture),t.setRenderTarget(M))}let Wt=R[Ot];Wt===void 0&&(Wt=new rn,Wt.layers.enable(Ot),Wt.viewport=new fe,R[Ot]=Wt),Wt.matrix.fromArray(Kt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(Kt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),Ot===0&&(L.matrix.copy(Wt.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),yt===!0&&L.cameras.push(Wt)}const Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const Ot=u.getDepthInformation(nt[0]);Ot&&Ot.isValid&&Ot.texture&&m.init(Ot,s.renderState)}if(Dt&&Dt.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let Ot=0;Ot<nt.length;Ot++){const Kt=nt[Ot].camera;if(Kt){let Zt=p[Kt];Zt||(Zt=new au,p[Kt]=Zt);const Wt=u.getCameraImage(Kt);Zt.sourceTexture=Wt}}}}for(let nt=0;nt<w.length;nt++){const yt=b[nt],Dt=w[nt];yt!==null&&Dt!==void 0&&Dt.update(yt,st,l||o)}bt&&bt(q,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}const wt=new pu;wt.setAnimationLoop(Ft),this.setAnimationLoop=function(q){bt=q},this.dispose=function(){}}}const xv=new oe,yu=new kt;yu.set(-1,0,0,0,1,0,0,0,1);function _v(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,cu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,_,y,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,_,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===We&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===We&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=t.get(p),y=_.envMap,M=_.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(xv.makeRotationFromEuler(M)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(yu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,_,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===We&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const _=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Mv(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,w){const b=w.program;n.uniformBlockBinding(M,b)}function l(M,w){let b=s[M.id];b===void 0&&(m(M),b=h(M),s[M.id]=b,M.addEventListener("dispose",_));const A=w.program;n.updateUBOMapping(M,A);const x=t.render.frame;r[M.id]!==x&&(f(M),r[M.id]=x)}function h(M){const w=u();M.__bindingPointIndex=w;const b=i.createBuffer(),A=M.__size,x=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,A,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,b),b}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return Yt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const w=s[M.id],b=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let x=0,T=b.length;x<T;x++){const P=b[x];if(Array.isArray(P))for(let R=0,L=P.length;R<L;R++)d(P[R],x,R,A);else d(P,x,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,w,b,A){if(v(M,w,b,A)===!0){const x=M.__offset,T=M.value;if(Array.isArray(T)){let P=0;for(let R=0;R<T.length;R++){const L=T[R],V=p(L);g(L,M.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,M.__data)}}function g(M,w,b){typeof M=="number"||typeof M=="boolean"?w[0]=M:M.isMatrix3?(w[0]=M.elements[0],w[1]=M.elements[1],w[2]=M.elements[2],w[3]=0,w[4]=M.elements[3],w[5]=M.elements[4],w[6]=M.elements[5],w[7]=0,w[8]=M.elements[6],w[9]=M.elements[7],w[10]=M.elements[8],w[11]=0):ArrayBuffer.isView(M)?w.set(new M.constructor(M.buffer,M.byteOffset,w.length)):M.toArray(w,b)}function v(M,w,b,A){const x=M.value,T=w+"_"+b;if(A[T]===void 0)return typeof x=="number"||typeof x=="boolean"?A[T]=x:ArrayBuffer.isView(x)?A[T]=x.slice():A[T]=x.clone(),!0;{const P=A[T];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return A[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function m(M){const w=M.uniforms;let b=0;const A=16;for(let T=0,P=w.length;T<P;T++){const R=Array.isArray(w[T])?w[T]:[w[T]];for(let L=0,V=R.length;L<V;L++){const B=R[L],U=Array.isArray(B.value)?B.value:[B.value];for(let k=0,O=U.length;k<O;k++){const $=U[k],Z=p($),it=b%A,Q=it%Z.boundary,rt=it+Q;b+=Q,rt!==0&&A-rt<Z.storage&&(b+=A-rt),B.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=b,b+=Z.storage}}}const x=b%A;return x>0&&(b+=A-x),M.__size=b,M.__cache={},this}function p(M){const w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Ut("WebGLRenderer: Unsupported uniform value type.",M),w}function _(M){const w=M.target;w.removeEventListener("dispose",_);const b=o.indexOf(w.__bindingPointIndex);o.splice(b,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function y(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:y}}const yv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let wn=null;function Sv(){return wn===null&&(wn=new hd(yv,16,16,Ni,Qn),wn.name="DFG_LUT",wn.minFilter=ke,wn.magFilter=ke,wn.wrapS=Zn,wn.wrapT=Zn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}class Su{constructor(t={}){const{canvas:e=Hf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Ke}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;const v=d,m=new Set([fc,uc,hc]),p=new Set([Ke,Fn,Ns,Fs,cc,lc]),_=new Uint32Array(4),y=new Int32Array(4),M=new I;let w=null,b=null;const A=[],x=[];let T=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=In,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,L=null,V=null,B=null,U=null;this._outputColorSpace=en;let k=0,O=0,$=null,Z=-1,it=null;const Q=new fe,rt=new fe;let bt=null;const Ft=new Gt(0);let wt=0,q=e.width,st=e.height,nt=1,yt=null,Dt=null;const Et=new fe(0,0,q,st),Qt=new fe(0,0,q,st);let Ot=!1;const Kt=new vc;let Zt=!1,Wt=!1;const ue=new oe,Se=new I,Te=new fe,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function _e(){return $===null?nt:1}let N=n;function He(E,F){return e.getContext(E,F)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${rc}`),e.addEventListener("webglcontextlost",pe,!1),e.addEventListener("webglcontextrestored",ae,!1),e.addEventListener("webglcontextcreationerror",Mn,!1),N===null){const F="webgl2";if(N=He(F,E),N===null)throw He(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw Yt("WebGLRenderer: "+E.message),E}let te,C,S,z,W,Y,ot,ct,K,j,lt,At,ft,ht,Pt,It,Bt,D,at,J,ut,vt,et;function Tt(){te=new Sg(N),te.init(),ut=new dv(N,te),C=new pg(N,te,t,ut),S=new uv(N,te),C.reversedDepthBuffer&&f&&S.buffers.depth.setReversed(!0),V=N.createFramebuffer(),B=N.createFramebuffer(),U=N.createFramebuffer(),z=new Eg(N),W=new J0,Y=new fv(N,te,S,W,C,ut,z),ot=new yg(P),ct=new Rd(N),vt=new fg(N,ct),K=new bg(N,ct,z,vt),j=new Ag(N,K,ct,vt,z),D=new Tg(N,C,Y),Pt=new mg(W),lt=new Z0(P,ot,te,C,vt,Pt),At=new _v(P,W),ft=new Q0,ht=new rv(te),Bt=new ug(P,ot,S,j,g,c),It=new hv(P,j,C),et=new Mv(N,z,C,S),at=new dg(N,te,z),J=new wg(N,te,z),z.programs=lt.programs,P.capabilities=C,P.extensions=te,P.properties=W,P.renderLists=ft,P.shadowMap=It,P.state=S,P.info=z}Tt(),v!==Ke&&(T=new Rg(v,e.width,e.height,a,s,r));const Mt=new vv(P,N);this.xr=Mt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=te.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=te.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(E){E!==void 0&&(nt=E,this.setSize(q,st,!1))},this.getSize=function(E){return E.set(q,st)},this.setSize=function(E,F,X=!0){if(Mt.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}q=E,st=F,e.width=Math.floor(E*nt),e.height=Math.floor(F*nt),X===!0&&(e.style.width=E+"px",e.style.height=F+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(q*nt,st*nt).floor()},this.setDrawingBufferSize=function(E,F,X){q=E,st=F,nt=X,e.width=Math.floor(E*X),e.height=Math.floor(F*X),this.setViewport(0,0,E,F)},this.setEffects=function(E){if(v===Ke){Yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let F=0;F<E.length;F++)if(E[F].isOutputPass===!0){Ut("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Q)},this.getViewport=function(E){return E.copy(Et)},this.setViewport=function(E,F,X,H){E.isVector4?Et.set(E.x,E.y,E.z,E.w):Et.set(E,F,X,H),S.viewport(Q.copy(Et).multiplyScalar(nt).round())},this.getScissor=function(E){return E.copy(Qt)},this.setScissor=function(E,F,X,H){E.isVector4?Qt.set(E.x,E.y,E.z,E.w):Qt.set(E,F,X,H),S.scissor(rt.copy(Qt).multiplyScalar(nt).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(E){S.setScissorTest(Ot=E)},this.setOpaqueSort=function(E){yt=E},this.setTransparentSort=function(E){Dt=E},this.getClearColor=function(E){return E.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor(...arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha(...arguments)},this.clear=function(E=!0,F=!0,X=!0){let H=0;if(E){let G=!1;if($!==null){const gt=$.texture.format;G=m.has(gt)}if(G){const gt=$.texture.type,_t=p.has(gt),pt=Bt.getClearColor(),St=Bt.getClearAlpha(),Ct=pt.r,zt=pt.g,Ht=pt.b;_t?(_[0]=Ct,_[1]=zt,_[2]=Ht,_[3]=St,N.clearBufferuiv(N.COLOR,0,_)):(y[0]=Ct,y[1]=zt,y[2]=Ht,y[3]=St,N.clearBufferiv(N.COLOR,0,y))}else H|=N.COLOR_BUFFER_BIT}F&&(H|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),L=E},this.dispose=function(){e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",ae,!1),e.removeEventListener("webglcontextcreationerror",Mn,!1),Bt.dispose(),ft.dispose(),ht.dispose(),W.dispose(),ot.dispose(),j.dispose(),vt.dispose(),et.dispose(),lt.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",Pc),Mt.removeEventListener("sessionend",Lc),yi.stop()};function pe(E){E.preventDefault(),Yc("WebGLRenderer: Context Lost."),R=!0}function ae(){Yc("WebGLRenderer: Context Restored."),R=!1;const E=z.autoReset,F=It.enabled,X=It.autoUpdate,H=It.needsUpdate,G=It.type;Tt(),z.autoReset=E,It.enabled=F,It.autoUpdate=X,It.needsUpdate=H,It.type=G}function Mn(E){Yt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function yn(E){const F=E.target;F.removeEventListener("dispose",yn),Qu(F)}function Qu(E){tf(E),W.remove(E)}function tf(E){const F=W.get(E).programs;F!==void 0&&(F.forEach(function(X){lt.releaseProgram(X)}),E.isShaderMaterial&&lt.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,X,H,G,gt){F===null&&(F=Re);const _t=G.isMesh&&G.matrixWorld.determinantAffine()<0,pt=sf(E,F,X,H,G);S.setMaterial(H,_t);let St=X.index,Ct=1;if(H.wireframe===!0){if(St=K.getWireframeAttribute(X),St===void 0)return;Ct=2}const zt=X.drawRange,Ht=X.attributes.position;let Rt=zt.start*Ct,ne=(zt.start+zt.count)*Ct;gt!==null&&(Rt=Math.max(Rt,gt.start*Ct),ne=Math.min(ne,(gt.start+gt.count)*Ct)),St!==null?(Rt=Math.max(Rt,0),ne=Math.min(ne,St.count)):Ht!=null&&(Rt=Math.max(Rt,0),ne=Math.min(ne,Ht.count));const ge=ne-Rt;if(ge<0||ge===1/0)return;vt.setup(G,H,pt,X,St);let me,se=at;if(St!==null&&(me=ct.get(St),se=J,se.setIndex(me)),G.isMesh)H.wireframe===!0?(S.setLineWidth(H.wireframeLinewidth*_e()),se.setMode(N.LINES)):se.setMode(N.TRIANGLES);else if(G.isLine){let De=H.linewidth;De===void 0&&(De=1),S.setLineWidth(De*_e()),G.isLineSegments?se.setMode(N.LINES):G.isLineLoop?se.setMode(N.LINE_LOOP):se.setMode(N.LINE_STRIP)}else G.isPoints?se.setMode(N.POINTS):G.isSprite&&se.setMode(N.TRIANGLES);if(G.isBatchedMesh)if(te.get("WEBGL_multi_draw"))se.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const De=G._multiDrawStarts,xt=G._multiDrawCounts,Xe=G._multiDrawCount,Jt=St?ct.get(St).bytesPerElement:1,Qe=W.get(H).currentProgram.getUniforms();for(let Sn=0;Sn<Xe;Sn++)Qe.setValue(N,"_gl_DrawID",Sn),se.render(De[Sn]/Jt,xt[Sn])}else if(G.isInstancedMesh)se.renderInstances(Rt,ge,G.count);else if(X.isInstancedBufferGeometry){const De=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,xt=Math.min(X.instanceCount,De);se.renderInstances(Rt,ge,xt)}else se.render(Rt,ge)};function Rc(E,F,X){E.transparent===!0&&E.side===Ve&&E.forceSinglePass===!1?(E.side=We,E.needsUpdate=!0,Ys(E,F,X),E.side=vi,E.needsUpdate=!0,Ys(E,F,X),E.side=Ve):Ys(E,F,X)}this.compile=function(E,F,X=null){X===null&&(X=E),b=ht.get(X),b.init(F),x.push(b),X.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),E!==X&&E.traverseVisible(function(G){G.isLight&&G.layers.test(F.layers)&&(b.pushLight(G),G.castShadow&&b.pushShadow(G))}),b.setupLights();const H=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const gt=G.material;if(gt)if(Array.isArray(gt))for(let _t=0;_t<gt.length;_t++){const pt=gt[_t];Rc(pt,X,G),H.add(pt)}else Rc(gt,X,G),H.add(gt)}),b=x.pop(),H},this.compileAsync=function(E,F,X=null){const H=this.compile(E,F,X);return new Promise(G=>{function gt(){if(H.forEach(function(_t){W.get(_t).currentProgram.isReady()&&H.delete(_t)}),H.size===0){G(E);return}setTimeout(gt,10)}te.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let Qr=null;function ef(E){Qr&&Qr(E)}function Pc(){yi.stop()}function Lc(){yi.start()}const yi=new pu;yi.setAnimationLoop(ef),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(E){Qr=E,Mt.setAnimationLoop(E),E===null?yi.stop():yi.start()},Mt.addEventListener("sessionstart",Pc),Mt.addEventListener("sessionend",Lc),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){Yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;L!==null&&L.renderStart(E,F);const X=Mt.enabled===!0&&Mt.isPresenting===!0,H=T!==null&&($===null||X)&&T.begin(P,$);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(F),F=Mt.getCamera()),E.isScene===!0&&E.onBeforeRender(P,E,F,$),b=ht.get(E,x.length),b.init(F),b.state.textureUnits=Y.getTextureUnits(),x.push(b),ue.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Kt.setFromProjectionMatrix(ue,Ln,F.reversedDepth),Wt=this.localClippingEnabled,Zt=Pt.init(this.clippingPlanes,Wt),w=ft.get(E,A.length),w.init(),A.push(w),Mt.enabled===!0&&Mt.isPresenting===!0){const _t=P.xr.getDepthSensingMesh();_t!==null&&to(_t,F,-1/0,P.sortObjects)}to(E,F,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(yt,Dt,F.reversedDepth),de=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,de&&Bt.addToRenderList(w,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Zt===!0&&Pt.beginShadows();const G=b.state.shadowsArray;if(It.render(G,E,F),Zt===!0&&Pt.endShadows(),(H&&T.hasRenderPass())===!1){const _t=w.opaque,pt=w.transmissive;if(b.setupLights(),F.isArrayCamera){const St=F.cameras;if(pt.length>0)for(let Ct=0,zt=St.length;Ct<zt;Ct++){const Ht=St[Ct];Dc(_t,pt,E,Ht)}de&&Bt.render(E);for(let Ct=0,zt=St.length;Ct<zt;Ct++){const Ht=St[Ct];Ic(w,E,Ht,Ht.viewport)}}else pt.length>0&&Dc(_t,pt,E,F),de&&Bt.render(E),Ic(w,E,F)}$!==null&&O===0&&(Y.updateMultisampleRenderTarget($),Y.updateRenderTargetMipmap($)),H&&T.end(P),E.isScene===!0&&E.onAfterRender(P,E,F),vt.resetDefaultState(),Z=-1,it=null,x.pop(),x.length>0?(b=x[x.length-1],Y.setTextureUnits(b.state.textureUnits),Zt===!0&&Pt.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,L!==null&&L.renderEnd()};function to(E,F,X,H){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLightProbeGrid)b.pushLightProbeGrid(E);else if(E.isLight)b.pushLight(E),E.castShadow&&b.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Kt.intersectsSprite(E)){H&&Te.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ue);const _t=j.update(E),pt=E.material;pt.visible&&w.push(E,_t,pt,X,Te.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Kt.intersectsObject(E))){const _t=j.update(E),pt=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Te.copy(E.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Te.copy(_t.boundingSphere.center)),Te.applyMatrix4(E.matrixWorld).applyMatrix4(ue)),Array.isArray(pt)){const St=_t.groups;for(let Ct=0,zt=St.length;Ct<zt;Ct++){const Ht=St[Ct],Rt=pt[Ht.materialIndex];Rt&&Rt.visible&&w.push(E,_t,Rt,X,Te.z,Ht)}}else pt.visible&&w.push(E,_t,pt,X,Te.z,null)}}const gt=E.children;for(let _t=0,pt=gt.length;_t<pt;_t++)to(gt[_t],F,X,H)}function Ic(E,F,X,H){const{opaque:G,transmissive:gt,transparent:_t}=E;b.setupLightsView(X),Zt===!0&&Pt.setGlobalState(P.clippingPlanes,X),H&&S.viewport(Q.copy(H)),G.length>0&&qs(G,F,X),gt.length>0&&qs(gt,F,X),_t.length>0&&qs(_t,F,X),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function Dc(E,F,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[H.id]===void 0){const Rt=te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[H.id]=new Dn(1,1,{generateMipmaps:!0,type:Rt?Qn:Ke,minFilter:Li,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace})}const gt=b.state.transmissionRenderTarget[H.id],_t=H.viewport||Q;gt.setSize(_t.z*P.transmissionResolutionScale,_t.w*P.transmissionResolutionScale);const pt=P.getRenderTarget(),St=P.getActiveCubeFace(),Ct=P.getActiveMipmapLevel();P.setRenderTarget(gt),P.getClearColor(Ft),wt=P.getClearAlpha(),wt<1&&P.setClearColor(16777215,.5),P.clear(),de&&Bt.render(X);const zt=P.toneMapping;P.toneMapping=In;const Ht=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),b.setupLightsView(H),Zt===!0&&Pt.setGlobalState(P.clippingPlanes,H),qs(E,X,H),Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt),te.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let ne=0,ge=F.length;ne<ge;ne++){const me=F[ne],{object:se,geometry:De,material:xt,group:Xe}=me;if(xt.side===Ve&&se.layers.test(H.layers)){const Jt=xt.side;xt.side=We,xt.needsUpdate=!0,Uc(se,X,H,De,xt,Xe),xt.side=Jt,xt.needsUpdate=!0,Rt=!0}}Rt===!0&&(Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt))}P.setRenderTarget(pt,St,Ct),P.setClearColor(Ft,wt),Ht!==void 0&&(H.viewport=Ht),P.toneMapping=zt}function qs(E,F,X){const H=F.isScene===!0?F.overrideMaterial:null;for(let G=0,gt=E.length;G<gt;G++){const _t=E[G],{object:pt,geometry:St,group:Ct}=_t;let zt=_t.material;zt.allowOverride===!0&&H!==null&&(zt=H),pt.layers.test(X.layers)&&Uc(pt,F,X,St,zt,Ct)}}function Uc(E,F,X,H,G,gt){E.onBeforeRender(P,F,X,H,G,gt),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(P,F,X,H,E,gt),G.transparent===!0&&G.side===Ve&&G.forceSinglePass===!1?(G.side=We,G.needsUpdate=!0,P.renderBufferDirect(X,F,H,G,E,gt),G.side=vi,G.needsUpdate=!0,P.renderBufferDirect(X,F,H,G,E,gt),G.side=Ve):P.renderBufferDirect(X,F,H,G,E,gt),E.onAfterRender(P,F,X,H,G,gt)}function Ys(E,F,X){F.isScene!==!0&&(F=Re);const H=W.get(E),G=b.state.lights,gt=b.state.shadowsArray,_t=G.state.version,pt=lt.getParameters(E,G.state,gt,F,X,b.state.lightProbeGridArray),St=lt.getProgramCacheKey(pt);let Ct=H.programs;H.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?F.environment:null,H.fog=F.fog;const zt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;H.envMap=ot.get(E.envMap||H.environment,zt),H.envMapRotation=H.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Ct===void 0&&(E.addEventListener("dispose",yn),Ct=new Map,H.programs=Ct);let Ht=Ct.get(St);if(Ht!==void 0){if(H.currentProgram===Ht&&H.lightsStateVersion===_t)return Fc(E,pt),Ht}else pt.uniforms=lt.getUniforms(E),L!==null&&E.isNodeMaterial&&L.build(E,X,pt),E.onBeforeCompile(pt,P),Ht=lt.acquireProgram(pt,St),Ct.set(St,Ht),H.uniforms=pt.uniforms;const Rt=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Rt.clippingPlanes=Pt.uniform),Fc(E,pt),H.needsLights=of(E),H.lightsStateVersion=_t,H.needsLights&&(Rt.ambientLightColor.value=G.state.ambient,Rt.lightProbe.value=G.state.probe,Rt.directionalLights.value=G.state.directional,Rt.directionalLightShadows.value=G.state.directionalShadow,Rt.spotLights.value=G.state.spot,Rt.spotLightShadows.value=G.state.spotShadow,Rt.rectAreaLights.value=G.state.rectArea,Rt.ltc_1.value=G.state.rectAreaLTC1,Rt.ltc_2.value=G.state.rectAreaLTC2,Rt.pointLights.value=G.state.point,Rt.pointLightShadows.value=G.state.pointShadow,Rt.hemisphereLights.value=G.state.hemi,Rt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Rt.spotLightMatrix.value=G.state.spotLightMatrix,Rt.spotLightMap.value=G.state.spotLightMap,Rt.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=b.state.lightProbeGridArray.length>0,H.currentProgram=Ht,H.uniformsList=null,Ht}function Nc(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=Fr.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function Fc(E,F){const X=W.get(E);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.batchingColor=F.batchingColor,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.instancingMorph=F.instancingMorph,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function nf(E,F){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;M.setFromMatrixPosition(F.matrixWorld);for(let X=0,H=E.length;X<H;X++){const G=E[X];if(G.texture!==null&&G.boundingBox.containsPoint(M))return G}return null}function sf(E,F,X,H,G){F.isScene!==!0&&(F=Re),Y.resetTextureUnits();const gt=F.fog,_t=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?F.environment:null,pt=$===null?P.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:$t.workingColorSpace,St=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ct=ot.get(H.envMap||_t,St),zt=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ht=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Rt=!!X.morphAttributes.position,ne=!!X.morphAttributes.normal,ge=!!X.morphAttributes.color;let me=In;H.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(me=P.toneMapping);const se=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,De=se!==void 0?se.length:0,xt=W.get(H),Xe=b.state.lights;if(Zt===!0&&(Wt===!0||E!==it)){const ce=E===it&&H.id===Z;Pt.setState(H,E,ce)}let Jt=!1;H.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Xe.state.version||xt.outputColorSpace!==pt||G.isBatchedMesh&&xt.batching===!1||!G.isBatchedMesh&&xt.batching===!0||G.isBatchedMesh&&xt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&xt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&xt.instancing===!1||!G.isInstancedMesh&&xt.instancing===!0||G.isSkinnedMesh&&xt.skinning===!1||!G.isSkinnedMesh&&xt.skinning===!0||G.isInstancedMesh&&xt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&xt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&xt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&xt.instancingMorph===!1&&G.morphTexture!==null||xt.envMap!==Ct||H.fog===!0&&xt.fog!==gt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==Pt.numPlanes||xt.numIntersection!==Pt.numIntersection)||xt.vertexAlphas!==zt||xt.vertexTangents!==Ht||xt.morphTargets!==Rt||xt.morphNormals!==ne||xt.morphColors!==ge||xt.toneMapping!==me||xt.morphTargetsCount!==De||!!xt.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Jt=!0):(Jt=!0,xt.__version=H.version);let Qe=xt.currentProgram;Jt===!0&&(Qe=Ys(H,F,G),L&&H.isNodeMaterial&&L.onUpdateProgram(H,Qe,xt));let Sn=!1,ei=!1,Bi=!1;const re=Qe.getUniforms(),ve=xt.uniforms;if(S.useProgram(Qe.program)&&(Sn=!0,ei=!0,Bi=!0),H.id!==Z&&(Z=H.id,ei=!0),xt.needsLights){const ce=nf(b.state.lightProbeGridArray,G);xt.lightProbeGrid!==ce&&(xt.lightProbeGrid=ce,ei=!0)}if(Sn||it!==E){S.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),re.setValue(N,"projectionMatrix",E.projectionMatrix),re.setValue(N,"viewMatrix",E.matrixWorldInverse);const ii=re.map.cameraPosition;ii!==void 0&&ii.setValue(N,Se.setFromMatrixPosition(E.matrixWorld)),C.logarithmicDepthBuffer&&re.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&re.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),it!==E&&(it=E,ei=!0,Bi=!0)}if(xt.needsLights&&(Xe.state.directionalShadowMap.length>0&&re.setValue(N,"directionalShadowMap",Xe.state.directionalShadowMap,Y),Xe.state.spotShadowMap.length>0&&re.setValue(N,"spotShadowMap",Xe.state.spotShadowMap,Y),Xe.state.pointShadowMap.length>0&&re.setValue(N,"pointShadowMap",Xe.state.pointShadowMap,Y)),G.isSkinnedMesh){re.setOptional(N,G,"bindMatrix"),re.setOptional(N,G,"bindMatrixInverse");const ce=G.skeleton;ce&&(ce.boneTexture===null&&ce.computeBoneTexture(),re.setValue(N,"boneTexture",ce.boneTexture,Y))}G.isBatchedMesh&&(re.setOptional(N,G,"batchingTexture"),re.setValue(N,"batchingTexture",G._matricesTexture,Y),re.setOptional(N,G,"batchingIdTexture"),re.setValue(N,"batchingIdTexture",G._indirectTexture,Y),re.setOptional(N,G,"batchingColorTexture"),G._colorsTexture!==null&&re.setValue(N,"batchingColorTexture",G._colorsTexture,Y));const ni=X.morphAttributes;if((ni.position!==void 0||ni.normal!==void 0||ni.color!==void 0)&&D.update(G,X,Qe),(ei||xt.receiveShadow!==G.receiveShadow)&&(xt.receiveShadow=G.receiveShadow,re.setValue(N,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&F.environment!==null&&(ve.envMapIntensity.value=F.environmentIntensity),ve.dfgLUT!==void 0&&(ve.dfgLUT.value=Sv()),ei){if(re.setValue(N,"toneMappingExposure",P.toneMappingExposure),xt.needsLights&&rf(ve,Bi),gt&&H.fog===!0&&At.refreshFogUniforms(ve,gt),At.refreshMaterialUniforms(ve,H,nt,st,b.state.transmissionRenderTarget[E.id]),xt.needsLights&&xt.lightProbeGrid){const ce=xt.lightProbeGrid;ve.probesSH.value=ce.texture,ve.probesMin.value.copy(ce.boundingBox.min),ve.probesMax.value.copy(ce.boundingBox.max),ve.probesResolution.value.copy(ce.resolution)}Fr.upload(N,Nc(xt),ve,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Fr.upload(N,Nc(xt),ve,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&re.setValue(N,"center",G.center),re.setValue(N,"modelViewMatrix",G.modelViewMatrix),re.setValue(N,"normalMatrix",G.normalMatrix),re.setValue(N,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){const ce=H.uniformsGroups;for(let ii=0,zi=ce.length;ii<zi;ii++){const Oc=ce[ii];et.update(Oc,Qe),et.bind(Oc,Qe)}}return Qe}function rf(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function of(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(E,F,X){const H=W.get(E);H.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),W.get(E.texture).__webglTexture=F,W.get(E.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,F){const X=W.get(E);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,X=0){$=E,k=F,O=X;let H=null,G=!1,gt=!1;if(E){const pt=W.get(E);if(pt.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(N.FRAMEBUFFER,pt.__webglFramebuffer),Q.copy(E.viewport),rt.copy(E.scissor),bt=E.scissorTest,S.viewport(Q),S.scissor(rt),S.setScissorTest(bt),Z=-1;return}else if(pt.__webglFramebuffer===void 0)Y.setupRenderTarget(E);else if(pt.__hasExternalTextures)Y.rebindTextures(E,W.get(E.texture).__webglTexture,W.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const zt=E.depthTexture;if(pt.__boundDepthTexture!==zt){if(zt!==null&&W.has(zt)&&(E.width!==zt.image.width||E.height!==zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(E)}}const St=E.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(gt=!0);const Ct=W.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ct[F])?H=Ct[F][X]:H=Ct[F],G=!0):E.samples>0&&Y.useMultisampledRTT(E)===!1?H=W.get(E).__webglMultisampledFramebuffer:Array.isArray(Ct)?H=Ct[X]:H=Ct,Q.copy(E.viewport),rt.copy(E.scissor),bt=E.scissorTest}else Q.copy(Et).multiplyScalar(nt).floor(),rt.copy(Qt).multiplyScalar(nt).floor(),bt=Ot;if(X!==0&&(H=V),S.bindFramebuffer(N.FRAMEBUFFER,H)&&S.drawBuffers(E,H),S.viewport(Q),S.scissor(rt),S.setScissorTest(bt),G){const pt=W.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,pt.__webglTexture,X)}else if(gt){const pt=F;for(let St=0;St<E.textures.length;St++){const Ct=W.get(E.textures[St]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+St,Ct.__webglTexture,X,pt)}}else if(E!==null&&X!==0){const pt=W.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pt.__webglTexture,X)}Z=-1},this.readRenderTargetPixels=function(E,F,X,H,G,gt,_t,pt=0){if(!(E&&E.isWebGLRenderTarget)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=W.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_t!==void 0&&(St=St[_t]),St){S.bindFramebuffer(N.FRAMEBUFFER,St);try{const Ct=E.textures[pt],zt=Ct.format,Ht=Ct.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pt),!C.textureFormatReadable(zt)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Ht)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-H&&X>=0&&X<=E.height-G&&N.readPixels(F,X,H,G,ut.convert(zt),ut.convert(Ht),gt)}finally{const Ct=$!==null?W.get($).__webglFramebuffer:null;S.bindFramebuffer(N.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(E,F,X,H,G,gt,_t,pt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=W.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_t!==void 0&&(St=St[_t]),St)if(F>=0&&F<=E.width-H&&X>=0&&X<=E.height-G){S.bindFramebuffer(N.FRAMEBUFFER,St);const Ct=E.textures[pt],zt=Ct.format,Ht=Ct.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+pt),!C.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Rt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Rt),N.bufferData(N.PIXEL_PACK_BUFFER,gt.byteLength,N.STREAM_READ),N.readPixels(F,X,H,G,ut.convert(zt),ut.convert(Ht),0);const ne=$!==null?W.get($).__webglFramebuffer:null;S.bindFramebuffer(N.FRAMEBUFFER,ne);const ge=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Gf(N,ge,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Rt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,gt),N.deleteBuffer(Rt),N.deleteSync(ge),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,F=null,X=0){const H=Math.pow(2,-X),G=Math.floor(E.image.width*H),gt=Math.floor(E.image.height*H),_t=F!==null?F.x:0,pt=F!==null?F.y:0;Y.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,X,0,0,_t,pt,G,gt),S.unbindTexture()},this.copyTextureToTexture=function(E,F,X=null,H=null,G=0,gt=0){let _t,pt,St,Ct,zt,Ht,Rt,ne,ge;const me=E.isCompressedTexture?E.mipmaps[gt]:E.image;if(X!==null)_t=X.max.x-X.min.x,pt=X.max.y-X.min.y,St=X.isBox3?X.max.z-X.min.z:1,Ct=X.min.x,zt=X.min.y,Ht=X.isBox3?X.min.z:0;else{const ve=Math.pow(2,-G);_t=Math.floor(me.width*ve),pt=Math.floor(me.height*ve),E.isDataArrayTexture?St=me.depth:E.isData3DTexture?St=Math.floor(me.depth*ve):St=1,Ct=0,zt=0,Ht=0}H!==null?(Rt=H.x,ne=H.y,ge=H.z):(Rt=0,ne=0,ge=0);const se=ut.convert(F.format),De=ut.convert(F.type);let xt;F.isData3DTexture?(Y.setTexture3D(F,0),xt=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Y.setTexture2DArray(F,0),xt=N.TEXTURE_2D_ARRAY):(Y.setTexture2D(F,0),xt=N.TEXTURE_2D),S.activeTexture(N.TEXTURE0),S.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),S.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),S.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const Xe=S.getParameter(N.UNPACK_ROW_LENGTH),Jt=S.getParameter(N.UNPACK_IMAGE_HEIGHT),Qe=S.getParameter(N.UNPACK_SKIP_PIXELS),Sn=S.getParameter(N.UNPACK_SKIP_ROWS),ei=S.getParameter(N.UNPACK_SKIP_IMAGES);S.pixelStorei(N.UNPACK_ROW_LENGTH,me.width),S.pixelStorei(N.UNPACK_IMAGE_HEIGHT,me.height),S.pixelStorei(N.UNPACK_SKIP_PIXELS,Ct),S.pixelStorei(N.UNPACK_SKIP_ROWS,zt),S.pixelStorei(N.UNPACK_SKIP_IMAGES,Ht);const Bi=E.isDataArrayTexture||E.isData3DTexture,re=F.isDataArrayTexture||F.isData3DTexture;if(E.isDepthTexture){const ve=W.get(E),ni=W.get(F),ce=W.get(ve.__renderTarget),ii=W.get(ni.__renderTarget);S.bindFramebuffer(N.READ_FRAMEBUFFER,ce.__webglFramebuffer),S.bindFramebuffer(N.DRAW_FRAMEBUFFER,ii.__webglFramebuffer);for(let zi=0;zi<St;zi++)Bi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,W.get(E).__webglTexture,G,Ht+zi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,W.get(F).__webglTexture,gt,ge+zi)),N.blitFramebuffer(Ct,zt,_t,pt,Rt,ne,_t,pt,N.DEPTH_BUFFER_BIT,N.NEAREST);S.bindFramebuffer(N.READ_FRAMEBUFFER,null),S.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(G!==0||E.isRenderTargetTexture||W.has(E)){const ve=W.get(E),ni=W.get(F);S.bindFramebuffer(N.READ_FRAMEBUFFER,B),S.bindFramebuffer(N.DRAW_FRAMEBUFFER,U);for(let ce=0;ce<St;ce++)Bi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ve.__webglTexture,G,Ht+ce):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ve.__webglTexture,G),re?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ni.__webglTexture,gt,ge+ce):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ni.__webglTexture,gt),G!==0?N.blitFramebuffer(Ct,zt,_t,pt,Rt,ne,_t,pt,N.COLOR_BUFFER_BIT,N.NEAREST):re?N.copyTexSubImage3D(xt,gt,Rt,ne,ge+ce,Ct,zt,_t,pt):N.copyTexSubImage2D(xt,gt,Rt,ne,Ct,zt,_t,pt);S.bindFramebuffer(N.READ_FRAMEBUFFER,null),S.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else re?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(xt,gt,Rt,ne,ge,_t,pt,St,se,De,me.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(xt,gt,Rt,ne,ge,_t,pt,St,se,me.data):N.texSubImage3D(xt,gt,Rt,ne,ge,_t,pt,St,se,De,me):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,gt,Rt,ne,_t,pt,se,De,me.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,gt,Rt,ne,me.width,me.height,se,me.data):N.texSubImage2D(N.TEXTURE_2D,gt,Rt,ne,_t,pt,se,De,me);S.pixelStorei(N.UNPACK_ROW_LENGTH,Xe),S.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Jt),S.pixelStorei(N.UNPACK_SKIP_PIXELS,Qe),S.pixelStorei(N.UNPACK_SKIP_ROWS,Sn),S.pixelStorei(N.UNPACK_SKIP_IMAGES,ei),gt===0&&F.generateMipmaps&&N.generateMipmap(xt),S.unbindTexture()},this.initRenderTarget=function(E){W.get(E).__webglFramebuffer===void 0&&Y.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Y.setTextureCube(E,0):E.isData3DTexture?Y.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Y.setTexture2DArray(E,0):Y.setTexture2D(E,0),S.unbindTexture()},this.resetState=function(){k=0,O=0,$=null,S.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}function Nt(i,t){return i<t?`${i}_${t}`:`${t}_${i}`}class ds{positions;faceOffsets;faceCorners;uvSets;crease;cornerSharp;polygroup;materialId;vertexColor;constructor(t,e,n,s={}){this.positions=t,this.faceOffsets=e,this.faceCorners=n;const r=Math.max(0,e.length-1);this.uvSets=s.uvSets??new Map,this.crease=s.crease??new Map,this.cornerSharp=s.cornerSharp??new Map,this.polygroup=s.polygroup??new Uint16Array(r),this.materialId=s.materialId??new Uint16Array(r),this.vertexColor=s.vertexColor??null}static empty(){return new ds(new Float32Array(0),new Uint32Array([0]),new Uint32Array(0))}get vertexCount(){return this.positions.length/3}get faceCount(){return Math.max(0,this.faceOffsets.length-1)}get cornerCount(){return this.faceCorners.length}faceSize(t){return this.faceOffsets[t+1]-this.faceOffsets[t]}faceVerts(t){const e=[];for(let n=this.faceOffsets[t];n<this.faceOffsets[t+1];n++)e.push(this.faceCorners[n]);return e}cornerIndex(t,e){return this.faceOffsets[t]+e}getPosition(t,e=[0,0,0]){return e[0]=this.positions[t*3],e[1]=this.positions[t*3+1],e[2]=this.positions[t*3+2],e}setPosition(t,e,n,s){this.positions[t*3]=e,this.positions[t*3+1]=n,this.positions[t*3+2]=s}getCrease(t,e){return this.crease.get(Nt(t,e))??0}setCrease(t,e,n){const s=Nt(t,e);n<=0?this.crease.delete(s):this.crease.set(s,Math.min(10,n))}edges(){const t=new Set,e=[];for(let n=0;n<this.faceCount;n++){const s=this.faceOffsets[n],r=this.faceOffsets[n+1]-s;for(let o=0;o<r;o++){const a=this.faceCorners[s+o],c=this.faceCorners[s+(o+1)%r],l=Nt(a,c);t.has(l)||(t.add(l),e.push([Math.min(a,c),Math.max(a,c)]))}}return e}edgeFaceMap(){const t=new Map;for(let e=0;e<this.faceCount;e++){const n=this.faceOffsets[e],s=this.faceOffsets[e+1]-n;for(let r=0;r<s;r++){const o=Nt(this.faceCorners[n+r],this.faceCorners[n+(r+1)%s]),a=t.get(o);a?a.push(e):t.set(o,[e])}}return t}vertexFaces(){const t=new Map;for(let e=0;e<this.faceCount;e++)for(let n=this.faceOffsets[e];n<this.faceOffsets[e+1];n++){const s=this.faceCorners[n],r=t.get(s);r?r.push(e):t.set(s,[e])}return t}vertexNeighbors(){const t=new Map,e=(n,s)=>{const r=t.get(n);r?r.includes(s)||r.push(s):t.set(n,[s])};for(const[n,s]of this.edges())e(n,s),e(s,n);return t}triangulate(){let t=0;for(let r=0;r<this.faceCount;r++)t+=Math.max(0,this.faceSize(r)-2);const e=new Uint32Array(t*3),n=new Uint32Array(t);let s=0;for(let r=0;r<this.faceCount;r++){const o=this.faceOffsets[r],a=this.faceOffsets[r+1]-o;for(let c=1;c<a-1;c++)e[s*3]=this.faceCorners[o],e[s*3+1]=this.faceCorners[o+c],e[s*3+2]=this.faceCorners[o+c+1],n[s]=r,s++}return{tri:e,triToFace:n}}faceCenter(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,o=0;for(let a=0;a<n;a++){const c=this.faceCorners[e+a];s+=this.positions[c*3],r+=this.positions[c*3+1],o+=this.positions[c*3+2]}return[s/n,r/n,o/n]}faceNormal(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,o=0;for(let c=0;c<n;c++){const l=this.faceCorners[e+c],h=this.faceCorners[e+(c+1)%n],u=this.positions[l*3],f=this.positions[l*3+1],d=this.positions[l*3+2],g=this.positions[h*3],v=this.positions[h*3+1],m=this.positions[h*3+2];s+=(f-v)*(d+m),r+=(d-m)*(u+g),o+=(u-g)*(f+v)}const a=Math.hypot(s,r,o)||1;return[s/a,r/a,o/a]}faceNormals(){const t=new Float32Array(this.faceCount*3);for(let e=0;e<this.faceCount;e++){const n=this.faceNormal(e);t[e*3]=n[0],t[e*3+1]=n[1],t[e*3+2]=n[2]}return t}vertexNormals(){const t=this.faceNormals(),e=new Float32Array(this.vertexCount*3);for(let n=0;n<this.faceCount;n++)for(let s=this.faceOffsets[n];s<this.faceOffsets[n+1];s++){const r=this.faceCorners[s];e[r*3]+=t[n*3],e[r*3+1]+=t[n*3+1],e[r*3+2]+=t[n*3+2]}for(let n=0;n<this.vertexCount;n++){const s=Math.hypot(e[n*3],e[n*3+1],e[n*3+2])||1;e[n*3]/=s,e[n*3+1]/=s,e[n*3+2]/=s}return e}boundsCenter(){if(this.vertexCount===0)return[0,0,0];const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let n=0;n<this.positions.length;n+=3)for(let s=0;s<3;s++){const r=this.positions[n+s];r<t[s]&&(t[s]=r),r>e[s]&&(e[s]=r)}return[(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2]}stats(){let t=0;for(let e=0;e<this.faceCount;e++)t+=Math.max(0,this.faceSize(e)-2);return{vertices:this.vertexCount,edges:this.edges().length,faces:this.faceCount,triangles:t,corners:this.cornerCount}}clone(){const t=new Map;for(const[e,n]of this.uvSets)t.set(e,n.slice());return new ds(this.positions.slice(),this.faceOffsets.slice(),this.faceCorners.slice(),{uvSets:t,crease:new Map(this.crease),cornerSharp:new Map(this.cornerSharp),polygroup:this.polygroup.slice(),materialId:this.materialId.slice(),vertexColor:this.vertexColor?this.vertexColor.slice():null})}}class ie{pos=[];offsets=[0];corners=[];uv=new Map;groups=[];materials=[];weldMap;crease=new Map;cornerSharp=new Map;constructor(t={}){this.weldMap=t.weld===!1?null:new Map}vertex(t,e,n){if(this.weldMap){const r=`${t.toFixed(5)},${e.toFixed(5)},${n.toFixed(5)}`,o=this.weldMap.get(r);if(o!==void 0)return o;const a=this.pos.length/3;return this.pos.push(t,e,n),this.weldMap.set(r,a),a}const s=this.pos.length/3;return this.pos.push(t,e,n),s}get vertexCount(){return this.pos.length/3}positionAt(t){return[this.pos[t*3],this.pos[t*3+1],this.pos[t*3+2]]}get faceCount(){return this.offsets.length-1}face(t,e={}){const n=[],s=[];for(let r=0;r<t.length;r++){const o=t[r];n.length&&n[n.length-1]===o||n.includes(o)||(n.push(o),s.push(r))}if(n.length>=2&&n[0]===n[n.length-1]&&(n.pop(),s.pop()),n.length<3)return-1;for(const r of n)this.corners.push(r);if(this.offsets.push(this.corners.length),this.groups.push(e.polygroup??0),this.materials.push(e.materialId??0),e.uv)for(const[r,o]of e.uv){let a=this.uv.get(r);a||(a=new Array((this.corners.length-n.length)*2).fill(0),this.uv.set(r,a));for(const c of s){const l=o[c]??[0,0];a.push(l[0],l[1])}}for(const[r,o]of this.uv){const a=this.corners.length*2;for(;o.length<a;)o.push(0)}return this.faceCount-1}build(){const t=new Map;for(const[e,n]of this.uv){const s=new Float32Array(this.corners.length*2);s.set(n.slice(0,s.length)),t.set(e,s)}return new ds(new Float32Array(this.pos),new Uint32Array(this.offsets),new Uint32Array(this.corners),{uvSets:t,crease:this.crease,cornerSharp:this.cornerSharp,polygroup:new Uint16Array(this.groups),materialId:new Uint16Array(this.materials)})}}function Ie(i,t){if(i.uvSets.size===0)return null;const e=new Map,n=i.faceOffsets[t],s=i.faceOffsets[t+1]-n;for(const[r,o]of i.uvSets){const a=[];for(let c=0;c<s;c++)a.push([o[(n+c)*2],o[(n+c)*2+1]]);e.set(r,a)}return e}function SM(i){return Array.from(i.uvSets.keys())}function bM(i,t,e,n){if(!i)return null;const s=new Map;for(const[r,o]of i){const a=o[t]??[0,0],c=o[e]??[0,0];s.set(r,[a[0]+(c[0]-a[0])*n,a[1]+(c[1]-a[1])*n])}return s}function es(i,t,e,n,s=(o,a)=>[o,a],r=!1){for(let o=0;o<t;o++)for(let a=0;a<e;a++){const c=r?[[o,a],[o,a+1],[o+1,a+1],[o+1,a]]:[[o,a],[o+1,a],[o+1,a+1],[o,a+1]],l=[],h=[];for(const[u,f]of c){const d=u/t,g=f/e,v=n(d,g);l.push(i.vertex(v[0],v[1],v[2])),h.push(s(d,g))}i.face(l,{uv:new Map([["map1",h]])})}}function yr(i,t,e,n,s,r){if(!(s<=0))for(let o=0;o<s;o++)for(let a=0;a<n;a++){const c=[[a,o],[a+1,o],[a+1,o+1],[a,o+1]],l=[],h=[];for(const[u,f]of c){const d=u/n*Math.PI*2,g=t*(1-f/s);l.push(i.vertex(g*Math.cos(d),e,g*Math.sin(d))),h.push([.5+Math.cos(d)*g/(t*2),.5+Math.sin(d)*g/(t*2)])}r>0&&(l.reverse(),h.reverse()),i.face(l,{uv:new Map([["map1",h]])})}}const ps={cube:{id:"cube",label:"キューブ",en:"Cube",params:[{key:"width",label:"幅",value:1,min:.05,max:6,step:.05},{key:"height",label:"高さ",value:1,min:.05,max:6,step:.05},{key:"depth",label:"奥行き",value:1,min:.05,max:6,step:.05},{key:"sdW",label:"分割数 幅",value:1,min:1,max:12,step:1},{key:"sdH",label:"分割数 高さ",value:1,min:1,max:12,step:1},{key:"sdD",label:"分割数 奥行き",value:1,min:1,max:12,step:1}],build(i){const t=new ie,e=i.width/2,n=i.height/2,s=i.depth/2,r=(o,a,c,l,h)=>es(t,l,h,(u,f)=>[o[0]+a[0]*u+c[0]*f,o[1]+a[1]*u+c[1]*f,o[2]+a[2]*u+c[2]*f]);return r([-e,-n,s],[i.width,0,0],[0,i.height,0],i.sdW,i.sdH),r([e,-n,-s],[-i.width,0,0],[0,i.height,0],i.sdW,i.sdH),r([e,-n,s],[0,0,-i.depth],[0,i.height,0],i.sdD,i.sdH),r([-e,-n,-s],[0,0,i.depth],[0,i.height,0],i.sdD,i.sdH),r([-e,n,s],[i.width,0,0],[0,0,-i.depth],i.sdW,i.sdD),r([-e,-n,-s],[i.width,0,0],[0,0,i.depth],i.sdW,i.sdD),t.build()}},sphere:{id:"sphere",label:"スフィア",en:"Sphere",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sdAxis",label:"分割数 軸",value:20,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:12,min:2,max:64,step:1}],build(i){const t=new ie;return es(t,i.sdAxis,i.sdHeight,(e,n)=>{const s=e*Math.PI*2,r=n*Math.PI;return[i.radius*Math.sin(r)*Math.cos(s),i.radius*Math.cos(r),i.radius*Math.sin(r)*Math.sin(s)]},(e,n)=>[e,1-n]),t.build()}},cylinder:{id:"cylinder",label:"シリンダー",en:"Cylinder",params:[{key:"radius",label:"半径",value:.6,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCaps",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new ie,e=i.height/2;return es(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*Math.cos(r),-e+s*i.height,i.radius*Math.sin(r)]},(n,s)=>[n,s],!0),yr(t,i.radius,e,i.sdAxis,i.sdCaps,1),yr(t,i.radius,-e,i.sdAxis,i.sdCaps,-1),t.build()}},cone:{id:"cone",label:"コーン",en:"Cone",params:[{key:"radius",label:"半径",value:.7,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCap",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new ie,e=i.height/2;return es(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*(1-s)*Math.cos(r),-e+s*i.height,i.radius*(1-s)*Math.sin(r)]},(n,s)=>[n,s],!0),yr(t,i.radius,-e,i.sdAxis,i.sdCap,-1),t.build()}},torus:{id:"torus",label:"トーラス",en:"Torus",params:[{key:"radius",label:"半径",value:1,min:.1,max:4,step:.05},{key:"section",label:"断面半径",value:.32,min:.02,max:2,step:.02},{key:"twist",label:"ツイスト",value:0,min:0,max:360,step:5},{key:"sdAxis",label:"分割数 軸",value:24,min:3,max:80,step:1},{key:"sdHeight",label:"分割数 断面",value:12,min:3,max:48,step:1}],build(i){const t=new ie,e=i.twist*Math.PI/180;return es(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2,o=s*Math.PI*2+e*n,a=i.radius+i.section*Math.cos(o);return[a*Math.cos(r),i.section*Math.sin(o),a*Math.sin(r)]},(n,s)=>[n,s],!0),t.build()}},plane:{id:"plane",label:"プレーン",en:"Plane",params:[{key:"width",label:"幅",value:2,min:.05,max:10,step:.05},{key:"height",label:"奥行き",value:2,min:.05,max:10,step:.05},{key:"sdW",label:"分割数 幅",value:4,min:1,max:40,step:1},{key:"sdH",label:"分割数 奥行き",value:4,min:1,max:40,step:1}],build(i){const t=new ie;return es(t,i.sdW,i.sdH,(e,n)=>[-i.width/2+e*i.width,0,-i.height/2+n*i.height],(e,n)=>[e,n],!0),t.build()}},disk:{id:"disk",label:"ディスク",en:"Disk",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sides",label:"サイド数",value:16,min:3,max:64,step:1},{key:"sdCaps",label:"分割数",value:1,min:1,max:10,step:1}],build(i){const t=new ie;return yr(t,i.radius,0,i.sides,i.sdCaps,1),t.build()}},platonic:{id:"platonic",label:"正多面体",en:"Platonic",params:[{key:"kind",label:"種類",value:4,min:0,max:4,step:1,choices:["正四面体","正六面体","正八面体","正十二面体","正二十面体"]},{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05}],build(i){const t=(1+Math.sqrt(5))/2,e=1/t,n=Math.round(i.kind);let s,r;n===0?(s=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]],r=[[0,1,2],[0,3,1],[0,2,3],[1,3,2]]):n===1?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]],r=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]]):n===2?(s=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],r=[[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]]):n===3?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],[0,e,t],[0,e,-t],[0,-e,t],[0,-e,-t],[e,t,0],[e,-t,0],[-e,t,0],[-e,-t,0],[t,0,e],[t,0,-e],[-t,0,e],[-t,0,-e]],r=[[0,8,10,2,16],[0,16,17,1,12],[0,12,14,4,8],[8,4,18,6,10],[10,6,15,13,2],[2,13,3,17,16],[17,3,11,9,1],[1,9,5,14,12],[14,5,19,18,4],[18,19,7,15,6],[15,7,11,3,13],[9,11,7,19,5]]):(s=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]],r=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]);const o=new ie({weld:!1});for(const h of s){const u=Math.hypot(h[0],h[1],h[2]);o.vertex(h[0]/u*i.radius,h[1]/u*i.radius,h[2]/u*i.radius)}for(const h of r)o.face(h);const a=o.build(),c=[];for(let h=0;h<a.faceCount;h++){const u=a.faceCenter(h),f=a.faceNormal(h),d=a.faceVerts(h);c.push(u[0]*f[0]+u[1]*f[1]+u[2]*f[2]<0?d.reverse():d)}const l=new ie({weld:!1});for(let h=0;h<a.vertexCount;h++){const u=a.getPosition(h);l.vertex(u[0],u[1],u[2])}for(const h of c)l.face(h);return l.build()}}},bv=["cube","sphere","cylinder","cone","torus","plane","disk","platonic"];function wv(i){const t=ps[i],e={};if(!t)return e;for(const n of t.params)e[n.key]=n.value;return e}function bu(i,t,e,n){const s=i.edgeFaceMap(),r=[],o=new Set,a=(c,l,h,u,f)=>{for(let d=0;d<1e5;d++){const v=(s.get(Nt(c,l))??[]).find(x=>x!==u);if(v===void 0||o.has(v))return;const m=i.faceVerts(v);if(m.length!==4)return;o.add(v);let p=-1,_=c,y=l,M=h;for(let x=0;x<4;x++)if(m[x]===c&&m[(x+1)%4]===l){p=x;break}if(p<0){for(let x=0;x<4;x++)if(m[x]===l&&m[(x+1)%4]===c){p=x,_=l,y=c,M=1-h;break}}if(p<0)return;const w=(p+2)%4,b=(p+3)%4,A={face:v,a:_,b:y,t:M,c:m[w],d:m[b],ia:p,ib:(p+1)%4,ic:w,id:b};f?r.push(A):r.unshift(A),u=v,c=A.d,l=A.c,h=M}};return a(t,e,n,-1,!0),a(e,t,1-n,r.length?r[0].face:-1,!1),r}function Xa(i,t,e,n,s,r){const o=i.getPosition(t),a=i.getPosition(e);if(!s||!r)return[o[0]+(a[0]-o[0])*n,o[1]+(a[1]-o[1])*n,o[2]+(a[2]-o[2])*n];const c=[r[t*3],r[t*3+1],r[t*3+2]],l=[r[e*3],r[e*3+1],r[e*3+2]],h=[a[0]-o[0],a[1]-o[1],a[2]-o[2]],u=h[0]*c[0]+h[1]*c[1]+h[2]*c[2],f=-(h[0]*l[0]+h[1]*l[1]+h[2]*l[2]),d=[0,0,0],g=1-n;for(let v=0;v<3;v++){const m=(2*o[v]+a[v]-u*c[v])/3,p=(2*a[v]+o[v]-f*l[v])/3;d[v]=g*g*g*o[v]+3*g*g*n*m+3*g*n*n*p+n*n*n*a[v]}return d}function Ev(i,t,e,n,s){const r=bu(i,t,e,n);if(!r.length)return null;const o=s?i.vertexNormals():null,a=[Xa(i,r[0].a,r[0].b,r[0].t,s,o)];for(const c of r)a.push(Xa(i,c.d,c.c,c.t,s,o));return{points:a,faceCount:r.length}}function Tv(i,t,e,n,s=!1){const r=bu(i,t,e,n);if(!r.length)return null;const o=s?i.vertexNormals():null,a=new Map;for(const f of r)a.set(f.face,f);const c=new ie({weld:!1});for(let f=0;f<i.vertexCount;f++){const d=i.getPosition(f);c.vertex(d[0],d[1],d[2])}const l=new Map,h=(f,d,g)=>{const v=Math.min(f,d),m=Math.max(f,d),p=`${v}_${m}`,_=l.get(p);if(_!==void 0)return _;const y=Xa(i,f,d,g,s,o),M=c.vertex(y[0],y[1],y[2]);return l.set(p,M),M};for(let f=0;f<i.faceCount;f++){const d=a.get(f),g=Ie(i,f),v=i.polygroup[f],m=i.materialId[f];if(!d){c.face(i.faceVerts(f),{uv:g??void 0,polygroup:v,materialId:m});continue}const p=h(d.a,d.b,d.t),_=h(d.d,d.c,d.t),y=M=>{if(!g)return;const w=new Map;for(const[b,A]of g)w.set(b,M.map(x=>{if(typeof x=="number")return A[x]??[0,0];const[T,P]=x,R=A[T]??[0,0],L=A[P]??[0,0];return[R[0]+(L[0]-R[0])*d.t,R[1]+(L[1]-R[1])*d.t]}));return w};c.face([d.a,p,_,d.d],{uv:y([d.ia,[d.ia,d.ib],[d.id,d.ic],d.id]),polygroup:v,materialId:m}),c.face([p,d.b,d.c,_],{uv:y([[d.ia,d.ib],d.ib,d.ic,[d.id,d.ic]]),polygroup:v,materialId:m})}const u=c.build();for(const[f,d]of i.crease){const[g,v]=f.split("_").map(Number);l.has(`${Math.min(g,v)}_${Math.max(g,v)}`)||u.setCrease(g,v,d)}for(const[f,d]of i.cornerSharp)u.cornerSharp.set(f,d);return{mesh:u,faceCount:r.length}}function ql(i,t,e){const n=Array.from(new Set(t));if(!n.length)return null;const s=new Set(n);let r=0,o=0,a=0;for(const v of n){const m=i.faceNormal(v);r+=m[0],o+=m[1],a+=m[2]}const c=Math.hypot(r,o,a)||1;r/=c,o/=c,a/=c;const l=new ie({weld:!1});for(let v=0;v<i.vertexCount;v++){const m=i.getPosition(v);l.vertex(m[0],m[1],m[2])}const h=new Set;for(const v of n)for(const m of i.faceVerts(v))h.add(m);const u=new Map;for(const v of h){const m=i.getPosition(v);u.set(v,l.vertex(m[0]+r*e,m[1]+o*e,m[2]+a*e))}const f=new Map;for(const v of n){const m=i.faceVerts(v);for(let p=0;p<m.length;p++){const _=Nt(m[p],m[(p+1)%m.length]);f.set(_,(f.get(_)??0)+1)}}const d=[];for(let v=0;v<i.faceCount;v++){const m=Ie(i,v),p=i.polygroup[v],_=i.materialId[v],y=i.faceVerts(v);if(!s.has(v)){l.face(y,{uv:m??void 0,polygroup:p,materialId:_});continue}l.face(y.map(M=>u.get(M)),{uv:m??void 0,polygroup:p,materialId:_});for(let M=0;M<y.length;M++){const w=y[M],b=y[(M+1)%y.length];if(f.get(Nt(w,b))!==1)continue;let A;if(m){A=new Map;for(const[x,T]of m){const P=T[M]??[0,0],R=T[(M+1)%y.length]??[0,0];A.set(x,[P,R,R,P])}}d.push({verts:[w,b,u.get(b),u.get(w)],uv:A,group:p,material:_})}}for(const v of d)l.face(v.verts,{uv:v.uv,polygroup:v.group,materialId:v.material});const g=l.build();for(const[v,m]of i.crease){const[p,_]=v.split("_").map(Number);g.setCrease(p,_,m)}return{mesh:g,faceCount:n.length}}function Yl(i,t,e){if(!t.length)return null;const n=i.edgeFaceMap(),s=i.faceNormals();let r=0,o=0,a=0;for(const[d,g]of t)for(const v of n.get(Nt(d,g))??[])r+=s[v*3],o+=s[v*3+1],a+=s[v*3+2];const c=Math.hypot(r,o,a);c<1e-6?(r=0,o=1,a=0):(r/=c,o/=c,a/=c);const l=new ie({weld:!1});for(let d=0;d<i.vertexCount;d++){const g=i.getPosition(d);l.vertex(g[0],g[1],g[2])}const h=new Set;for(const[d,g]of t)h.add(d),h.add(g);const u=new Map;for(const d of h){const g=i.getPosition(d);u.set(d,l.vertex(g[0]+r*e,g[1]+o*e,g[2]+a*e))}for(let d=0;d<i.faceCount;d++)l.face(i.faceVerts(d),{uv:Ie(i,d)??void 0,polygroup:i.polygroup[d],materialId:i.materialId[d]});for(const[d,g]of t){const v=n.get(Nt(d,g))??[];let m=!0;if(v.length){const p=i.faceVerts(v[0]);for(let _=0;_<p.length;_++)if(p[_]===d&&p[(_+1)%p.length]===g){m=!1;break}}m?l.face([d,g,u.get(g),u.get(d)]):l.face([g,d,u.get(d),u.get(g)])}const f=l.build();for(const[d,g]of i.crease){const[v,m]=d.split("_").map(Number);f.setCrease(v,m,g)}return{mesh:f,newEdges:t.map(([d,g])=>[u.get(d),u.get(g)]),faceCount:t.length}}function Wr(i,t){const e=new Map,n=new Map;t.forEach((a,c)=>{let l=0,h=0,u=0;for(const d of a){const g=i.getPosition(d);l+=g[0],h+=g[1],u+=g[2]}const f=`g${c}`;n.set(f,[l/a.length,h/a.length,u/a.length]);for(const d of a)e.set(d,f)});const s=new ie({weld:!1}),r=new Map,o=a=>{const c=e.get(a)??`v${a}`,l=r.get(c);if(l!==void 0)return l;const h=e.has(a)?n.get(e.get(a)):i.getPosition(a),u=s.vertex(h[0],h[1],h[2]);return r.set(c,u),u};for(let a=0;a<i.faceCount;a++)s.face(i.faceVerts(a).map(o),{uv:Ie(i,a)??void 0,polygroup:i.polygroup[a],materialId:i.materialId[a]});return s.build()}function Av(i,t,e,n){let s=-1,r=-1,o=-1;for(let u=0;u<i.length;u++){const f=i[u],d=i[(u+1)%i.length];if(f===e&&d===n||f===n&&d===e){s=u,r=f,o=d;break}}if(s<0)return null;const a=[];for(let u=0;u<i.length;u++)a.push(i[(s+1+u)%i.length]);let c=t,l=-1;for(let u=0;u<t.length;u++)if(t[u]===o&&t[(u+1)%t.length]===r){l=u;break}if(l<0){const u=[...t].reverse();for(let f=0;f<u.length;f++)if(u[f]===o&&u[(f+1)%u.length]===r){l=f,c=u;break}if(l<0)return null}const h=[];for(let u=0;u<c.length;u++)h.push(c[(l+1+u)%c.length]);return[...a,...h.slice(1,h.length-1)]}function Cv(i,t){let e=[];for(let a=0;a<i.faceCount;a++)e.push(i.faceVerts(a));const n=Array.from(i.polygroup),s=Array.from(i.materialId);let r=0;for(const[a,c]of t){const l=new Map;e.forEach((f,d)=>{for(let g=0;g<f.length;g++){const v=Nt(f[g],f[(g+1)%f.length]),m=l.get(v);m?m.push(d):l.set(v,[d])}});const h=l.get(Nt(a,c))??[];if(h.length!==2)continue;const u=Av(e[h[0]],e[h[1]],a,c);!u||u.length<3||(e[h[0]]=u,e.splice(h[1],1),n.splice(h[1],1),s.splice(h[1],1),r++)}if(!r)return null;const o=new ie({weld:!1});for(let a=0;a<i.vertexCount;a++){const c=i.getPosition(a);o.vertex(c[0],c[1],c[2])}return e.forEach((a,c)=>{o.face(a,{polygroup:n[c]??0,materialId:s[c]??0})}),{mesh:o.build(),merged:r}}function Rv(i,t){const e=new Set(t);if(!e.size)return null;const n=new ie({weld:!1});for(let o=0;o<i.vertexCount;o++){const a=i.getPosition(o);n.vertex(a[0],a[1],a[2])}let s=0;for(let o=0;o<i.faceCount;o++){if(e.has(o)){s++;continue}n.face(i.faceVerts(o),{uv:Ie(i,o)??void 0,polygroup:i.polygroup[o],materialId:i.materialId[o]})}if(!s)return null;const r=n.build();for(const[o,a]of i.crease){const[c,l]=o.split("_").map(Number);r.setCrease(c,l,a)}return{mesh:r,removed:s}}function Pv(i,t){const e=[];for(const n of t)n<i.faceCount&&e.push(i.faceVerts(n));return e.length?Wr(i,e):null}function qn(i){const t=new Set;for(let r=0;r<i.faceCorners.length;r++)t.add(i.faceCorners[r]);if(t.size===i.vertexCount)return i;const e=new ie({weld:!1}),n=new Map;for(let r=0;r<i.vertexCount;r++){if(!t.has(r))continue;const o=i.getPosition(r);n.set(r,e.vertex(o[0],o[1],o[2]))}for(let r=0;r<i.faceCount;r++)e.face(i.faceVerts(r).map(o=>n.get(o)),{uv:Ie(i,r)??void 0,polygroup:i.polygroup[r],materialId:i.materialId[r]});const s=e.build();for(const[r,o]of i.crease){const[a,c]=r.split("_").map(Number),l=n.get(a),h=n.get(c);l!==void 0&&h!==void 0&&s.setCrease(l,h,o)}return s}function ss(i,t){return[i[0]-t[0],i[1]-t[1],i[2]-t[2]]}function Kl(i){const t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]}function Lv(i,t){return[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]]}function Iv(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function Dv(i,t,e,n=1){const s=Math.max(1,Math.round(n));if(!(e>0))return null;const r=new Set;for(const[_,y]of t)_!==y&&r.add(Nt(_,y));if(!r.size)return null;const o=i.edgeFaceMap(),a=new Set;for(const _ of r){const y=o.get(_);if(!y||y.length!==2)return null;for(const b of y)if(i.faceSize(b)!==4)return null;const[M,w]=_.split("_").map(Number);a.add(M),a.add(w)}const c=new ie({weld:!0}),l=[];for(let _=0;_<i.vertexCount;_++){const y=i.getPosition(_);l.push(c.vertex(y[0],y[1],y[2]))}const h=new Map,u=(_,y,M)=>`${_}|${y}|${M}`,f=new Map,d=_=>i.getPosition(_);for(let _=0;_<i.faceCount;_++){const y=i.faceVerts(_),M=[];for(let w=0;w<y.length;w++){const b=y[w],A=y[(w-1+y.length)%y.length],x=y[(w+1)%y.length],T=(w-1+y.length)%y.length,P=(w+1)%y.length;if(!a.has(b)){const Q={index:l[b],uv:{base:w,toward:[]}};M.push(Q);continue}const R=d(b),L=Kl(ss(d(A),R)),V=Kl(ss(d(x),R)),B=Math.hypot(...ss(d(A),R))||1,U=Math.hypot(...ss(d(x),R))||1,k=Math.min(e,B*.49),O=Math.min(e,U*.49),$=r.has(Nt(A,b)),Z=r.has(Nt(b,x)),it=(Q,rt)=>({index:c.vertex(R[0]+Q[0],R[1]+Q[1],R[2]+Q[2]),uv:rt});if($&&Z){const Q=it([L[0]*k+V[0]*O,L[1]*k+V[1]*O,L[2]*k+V[2]*O],{base:w,toward:[{corner:T,t:k/B},{corner:P,t:O/U}]});M.push({index:Q.index,uv:Q.uv}),h.set(u(_,b,A),Q),h.set(u(_,b,x),Q)}else if($){const Q=it([V[0]*O,V[1]*O,V[2]*O],{base:w,toward:[{corner:P,t:O/U}]});M.push({index:Q.index,uv:Q.uv}),h.set(u(_,b,A),Q),h.set(u(_,b,x),Q)}else if(Z){const Q=it([L[0]*k,L[1]*k,L[2]*k],{base:w,toward:[{corner:T,t:k/B}]});M.push({index:Q.index,uv:Q.uv}),h.set(u(_,b,A),Q),h.set(u(_,b,x),Q)}else{const Q=it([L[0]*k,L[1]*k,L[2]*k],{base:w,toward:[{corner:T,t:k/B}]}),rt=it([V[0]*O,V[1]*O,V[2]*O],{base:w,toward:[{corner:P,t:O/U}]});M.push({index:Q.index,uv:Q.uv},{index:rt.index,uv:rt.uv}),h.set(u(_,b,A),Q),h.set(u(_,b,x),rt)}}f.set(_,M)}for(let _=0;_<i.faceCount;_++){const y=f.get(_),M=Ie(i,_);c.face(y.map(w=>w.index),{uv:M?Uv(M,y.map(w=>w.uv)):void 0,polygroup:i.polygroup[_],materialId:i.materialId[_]})}let g=0;const v=new Map,m=(_,y)=>`${_}|${y}`;for(const _ of r){const[y,M]=_.split("_").map(Number),[w,b]=o.get(_);for(const B of[y,M]){const U=B===y?M:y,k=h.get(u(w,B,U)),O=h.get(u(b,B,U));if(!k||!O)return null;const $=[],Z=d(B),it=Us(c,k.index),Q=Us(c,O.index);for(let rt=0;rt<=s;rt++){const bt=rt/s;if(rt===0)$.push(k.index);else if(rt===s)$.push(O.index);else{const Ft=1-bt,wt=Ft*Ft*it[0]+2*bt*Ft*Z[0]+bt*bt*Q[0],q=Ft*Ft*it[1]+2*bt*Ft*Z[1]+bt*bt*Q[1],st=Ft*Ft*it[2]+2*bt*Ft*Z[2]+bt*bt*Q[2];$.push(c.vertex(wt,q,st))}}v.set(m(_,B),$)}const A=v.get(m(_,y)),x=v.get(m(_,M)),T=i.polygroup[w]??0,P=i.materialId[w]??0,R=i.faceVerts(w),L=R.indexOf(y),V=L>=0&&R[(L+1)%R.length]===M;for(let B=0;B<s;B++){const U=V?[x[B],A[B],A[B+1],x[B+1]]:[A[B],x[B],x[B+1],A[B+1]];c.face(U,{polygroup:T,materialId:P})>=0&&g++}}for(const _ of a){const y=Nv(i,_,o,r,h,v,u,m);if(y===null)return null;if(y.length<3)continue;const M=Fv(c,y,i,_);c.face(M)>=0&&g++}const p=c.build();for(const[_,y]of i.crease){if(r.has(_))continue;const[M,w]=_.split("_").map(Number),b=l[M],A=l[w];b!==void 0&&A!==void 0&&!a.has(M)&&!a.has(w)&&p.setCrease(b,A,y)}return{mesh:p,newFaces:g}}function Us(i,t){const e=i.positionAt(t);return[e[0],e[1],e[2]]}function Uv(i,t){const e=new Map;for(const[n,s]of i){const r=[];for(const o of t){const a=s[o.base]??[0,0];let c=a[0],l=a[1];for(const h of o.toward){const u=s[h.corner]??a;c+=(u[0]-a[0])*h.t,l+=(u[1]-a[1])*h.t}r.push([c,l])}e.set(n,r)}return e}function Nv(i,t,e,n,s,r,o,a){const c=new Map;for(const g of i.vertexFaces().get(t)??[]){const v=i.faceVerts(g),m=v.indexOf(t);if(m<0)return null;c.set(g,[v[(m-1+v.length)%v.length],v[(m+1)%v.length]])}if(!c.size)return null;const l=[...c.keys()][0],h=[];let u=l,f=c.get(l)[0];for(let g=0;g<=c.size;g++){const v=c.get(u);if(!v)return null;const m=v[0]===f?v[1]:v[0];h.push({face:u,from:f,to:m});const p=(e.get(Nt(t,m))??[]).find(_=>_!==u);if(p===void 0)return null;if(p===l&&m===c.get(l)[0])break;if(u=p,f=m,h.length>c.size)return null}if(h.length!==c.size)return null;const d=[];for(const g of h){const v=s.get(o(g.face,t,g.from)),m=s.get(o(g.face,t,g.to));if(!v||!m)return null;Oo(d,v.index),m.index!==v.index&&Oo(d,m.index);const p=Nt(t,g.to);if(n.has(p)){const _=r.get(a(p,t));if(!_)return null;const M=e.get(p)[0]===g.face?_:[..._].reverse();for(const w of M)Oo(d,w)}}return d.length>1&&d[0]===d[d.length-1]&&d.pop(),d}function Oo(i,t){i.length&&i[i.length-1]===t||i.push(t)}function Fv(i,t,e,n){const s=e.vertexNormals(),r=[s[n*3],s[n*3+1],s[n*3+2]],o=Us(i,t[0]);let a=0,c=0,l=0;for(let h=1;h+1<t.length;h++){const u=Lv(ss(Us(i,t[h]),o),ss(Us(i,t[h+1]),o));a+=u[0],c+=u[1],l+=u[2]}return Iv([a,c,l],r)<0?[...t].reverse():t}function ko(i){return i.closed?i.verts.length:i.verts.length-1}function Bo(i,t){return[i.verts[t],i.verts[(t+1)%i.verts.length]]}function Ov(i){const t=new Map,e=(a,c)=>{const l=t.get(a);l?l.push(c):t.set(a,[c])},n=new Set;for(const[a,c]of i){if(a===c)continue;const l=Nt(a,c);n.has(l)||(n.add(l),e(a,c),e(c,a))}for(const a of t.values())if(a.length>2)return null;const s=new Set,r=a=>{const c=[a];s.add(a);let l=-1,h=a;for(;;){const u=(t.get(h)??[]).find(f=>f!==l&&!s.has(f));if(u===void 0)return c;c.push(u),s.add(u),l=h,h=u}},o=[];for(const[a,c]of t)c.length===1&&!s.has(a)&&o.push({verts:r(a),closed:!1});for(const a of t.keys()){if(s.has(a))continue;const c=r(a),l=c[c.length-1],h=c.length>2&&(t.get(l)??[]).includes(c[0]);o.push({verts:c,closed:h})}return o}function Ls(i,t,e){const n=i.getPosition(t),s=i.getPosition(e);return Math.hypot(n[0]-s[0],n[1]-s[1],n[2]-s[2])}function kv(i,t,e){let n=0;for(let s=0;s<t.length;s++)n+=Ls(i,t[s],e[s]);return n}function Bv(i,t,e){const n=e.verts;if(!e.closed){const o=Ls(i,t.verts[0],n[0])+Ls(i,t.verts[t.verts.length-1],n[n.length-1]);return Ls(i,t.verts[0],n[n.length-1])+Ls(i,t.verts[t.verts.length-1],n[0])<o?[...n].reverse():[...n]}let s=n,r=1/0;for(const o of[n,[...n].reverse()])for(let a=0;a<o.length;a++){const c=o.map((h,u)=>o[(a+u)%o.length]),l=kv(i,t.verts,c);l<r&&(r=l,s=c)}return s}function zv(i,t){const e=Ov(t);if(!e||e.length!==2)return null;const[n,s]=e;if(n.closed!==s.closed)return null;const r=ko(n);if(r<1||r!==ko(s))return null;const o=i.edgeFaceMap(),a=(d,g)=>{const v=o.get(Nt(d,g))??[];return v.length===1?v[0]:-1};for(const d of[n,s])for(let g=0;g<ko(d);g++){const[v,m]=Bo(d,g);if(a(v,m)<0)return null}const l={verts:Bv(i,n,s),closed:s.closed},h=new ie({weld:!1});for(let d=0;d<i.vertexCount;d++){const g=i.getPosition(d);h.vertex(g[0],g[1],g[2])}for(let d=0;d<i.faceCount;d++)h.face(i.faceVerts(d),{uv:Ie(i,d)??void 0,polygroup:i.polygroup[d],materialId:i.materialId[d]});let u=0;for(let d=0;d<r;d++){const[g,v]=Bo(n,d),[m,p]=Bo(l,d),_=a(g,v);if(_<0)continue;const y=i.faceVerts(_),M=y.indexOf(g),b=M>=0&&y[(M+1)%y.length]===v?[v,g,m,p]:[g,v,p,m];h.face(b,{polygroup:i.polygroup[_],materialId:i.materialId[_]})>=0&&u++}if(!u)return null;const f=h.build();for(const[d,g]of i.crease){const[v,m]=d.split("_").map(Number);f.setCrease(v,m,g)}return{mesh:f,faces:u}}function wu(i,t,e){if(!e.length)return null;const n=new Map,s=new Map,r=[];for(const l of e){const h=i.faceVerts(l),u=h.indexOf(t);if(u<0||h.length<3)return null;const f={face:l,prev:h[(u-1+h.length)%h.length],next:h[(u+1)%h.length]};if(n.has(f.next)||s.has(f.prev))return null;n.set(f.next,f),s.set(f.prev,f),r.push(f)}const o=r.find(l=>!s.has(l.next))??r[0],a=[o];let c=o;for(let l=1;l<r.length;l++){const h=n.get(c.prev);if(!h||h===o)return null;a.push(h),c=h}return{cycle:a,closed:n.get(c.prev)===o}}function Vv(i,t,e){const n=i.faceVerts(t),s=n.indexOf(e),r=[];for(let o=1;o<n.length;o++)r.push(n[(s+o)%n.length]);return r}function Eu(i){const t=new ie({weld:!1});for(let e=0;e<i.vertexCount;e++){const n=i.getPosition(e);t.vertex(n[0],n[1],n[2])}return t}function Tu(i,t){for(const[e,n]of i.crease){const[s,r]=e.split("_").map(Number);s<t.vertexCount&&r<t.vertexCount&&t.setCrease(s,r,n)}}function Au(i,t,e){if(!(t>0))return null;const n=e?[...new Set(e)]:Array.from({length:i.vertexCount},(d,g)=>g);if(n.length<2)return null;const s=t,r=new Map,o=(d,g,v)=>`${Math.floor(d/s)},${Math.floor(g/s)},${Math.floor(v/s)}`;for(const d of n){const g=i.getPosition(d),v=o(g[0],g[1],g[2]),m=r.get(v);m?m.push(d):r.set(v,[d])}const a=new Map,c=d=>{let g=d;for(;a.get(g)!==g;)g=a.get(g)??g;let v=d;for(;a.get(v)!==g;){const m=a.get(v)??g;a.set(v,g),v=m}return g};for(const d of n)a.set(d,d);const l=t*t;for(const d of n){const g=i.getPosition(d),v=Math.floor(g[0]/s),m=Math.floor(g[1]/s),p=Math.floor(g[2]/s);for(let _=-1;_<=1;_++)for(let y=-1;y<=1;y++)for(let M=-1;M<=1;M++)for(const w of r.get(`${v+_},${m+y},${p+M}`)??[]){if(w<=d)continue;const b=i.getPosition(w);if((g[0]-b[0])**2+(g[1]-b[1])**2+(g[2]-b[2])**2>l)continue;const x=c(d),T=c(w);x!==T&&a.set(T,x)}}const h=new Map;for(const d of n){const g=c(d),v=h.get(g);v?v.push(d):h.set(g,[d])}const u=[...h.values()].filter(d=>d.length>1);if(!u.length)return null;let f=0;for(const d of u)f+=d.length-1;return{mesh:Wr(i,u),merged:f}}function Hv(i,t){let e=i,n=0;for(const s of new Set(t)){const o=e.vertexFaces().get(s)??[],a=wu(e,s,o);if(!a)continue;const c=[];for(const f of a.cycle)for(const d of Vv(e,f.face,s))c[c.length-1]!==d&&c.push(d);if(c.length>1&&c[0]===c[c.length-1]&&c.pop(),c.length<3)continue;const l=new Set(o),h=Eu(e);for(let f=0;f<e.faceCount;f++)l.has(f)||h.face(e.faceVerts(f),{uv:Ie(e,f)??void 0,polygroup:e.polygroup[f],materialId:e.materialId[f]});h.face(c,{polygroup:e.polygroup[a.cycle[0].face],materialId:e.materialId[a.cycle[0].face]});const u=h.build();Tu(e,u),e=u,n++}return n?{mesh:e,removed:n}:null}function Zl(i,t,e,n=.25){const s=[...new Set(t)];if(!s.length)return null;const r=Math.max(.01,Math.min(.9,n)),o=i.vertexFaces(),a=i.vertexNormals(),c=[],l=new Set;for(const p of s){const _=wu(i,p,o.get(p)??[]);if(!(!_||!_.closed)&&!_.cycle.some(y=>l.has(y.face))){for(const y of _.cycle)l.add(y.face);c.push({v:p,cycle:_.cycle})}}if(!c.length)return null;const h=Eu(i),u=new Map,f=new Map;for(const{v:p,cycle:_}of c){const y=i.getPosition(p);for(const M of _){const w=Nt(p,M.next);if(u.has(w))continue;const b=i.getPosition(M.next);u.set(w,h.vertex(y[0]+(b[0]-y[0])*r,y[1]+(b[1]-y[1])*r,y[2]+(b[2]-y[2])*r))}f.set(p,h.vertex(y[0]+a[p*3]*e,y[1]+a[p*3+1]*e,y[2]+a[p*3+2]*e))}const d=(p,_)=>[p[0]+(_[0]-p[0])*r,p[1]+(_[1]-p[1])*r],g=new Map;for(const{v:p,cycle:_}of c)for(const y of _)g.set(y.face,{v:p,entry:y});let v=0;for(let p=0;p<i.faceCount;p++){const _=g.get(p);if(!_){h.face(i.faceVerts(p),{uv:Ie(i,p)??void 0,polygroup:i.polygroup[p],materialId:i.materialId[p]});continue}const{v:y,entry:M}=_,w=i.faceVerts(p),b=w.indexOf(y),A=u.get(Nt(y,M.prev)),x=u.get(Nt(y,M.next)),T=[],P=Ie(i,p),R=new Map;if(P)for(const[L]of P)R.set(L,[]);for(let L=0;L<w.length;L++){const V=(b+L)%w.length;if(V===b){if(T.push(A,x),P)for(const[B,U]of P){const k=U[V]??[0,0],O=U[(V-1+w.length)%w.length]??k,$=U[(V+1)%w.length]??k;R.get(B).push(d(k,O),d(k,$))}continue}if(T.push(w[V]),P)for(const[B,U]of P)R.get(B).push(U[V]??[0,0])}h.face(T,{uv:P?R:void 0,polygroup:i.polygroup[p],materialId:i.materialId[p]})>=0&&v++}for(const{v:p,cycle:_}of c){const y=f.get(p);for(const M of _){const w=u.get(Nt(p,M.prev)),b=u.get(Nt(p,M.next));h.face([b,w,y],{polygroup:i.polygroup[M.face],materialId:i.materialId[M.face]})>=0&&v++}}const m=h.build();return Tu(i,m),{mesh:m,faces:v,tips:c.map(({v:p})=>f.get(p))}}function $a(i,t){const{verts:e,uv:n}=i,s=e.length,r=[];for(let o=0;o<s;o++)t.has(e[o])&&r.push(o);if(r.length<2||s<4)return[i];for(let o=0;o<r.length;o++)for(let a=o+1;a<r.length;a++){const c=r[o],l=r[a],h=l-c,u=s-h;if(h<2||u<2)continue;const f=p=>[p.slice(c,l+1),[...p.slice(l),...p.slice(0,c+1)]],[d,g]=f(e);let v=null,m=null;if(n){v=new Map,m=new Map;for(const[p,_]of n){const[y,M]=f(_);v.set(p,y),m.set(p,M)}}return[...$a({verts:d,uv:v},t),...$a({verts:g,uv:m},t)]}return[i]}function Gv(i,t,e){const n=new ie({weld:!1});for(let o=0;o<i.vertexCount;o++){const a=i.getPosition(o);n.vertex(a[0],a[1],a[2])}let s=0;for(let o=0;o<i.faceCount;o++){const a=$a({verts:i.faceVerts(o),uv:Ie(i,o)},t);s+=a.length-1;for(const c of a)n.face(c.verts,{uv:c.uv??void 0,polygroup:i.polygroup[o],materialId:i.materialId[o]})}if(!s)return null;const r=n.build();for(const[o,a]of i.crease){const[c,l]=o.split("_").map(Number);c<r.vertexCount&&l<r.vertexCount&&r.setCrease(c,l,a)}return{mesh:r,edges:s}}function Cu(i,t){const e=new Set(t);return e.size<2?null:Gv(i,e)}function Wv(i,t){const e=new Set(t.map(([c,l])=>Nt(c,l)));if(e.size<2)return null;const n=new Map,s=[];let r=i.vertexCount;for(const c of e){const[l,h]=c.split("_").map(Number);if(l>=i.vertexCount||h>=i.vertexCount)continue;const u=i.getPosition(l),f=i.getPosition(h);s.push((u[0]+f[0])/2,(u[1]+f[1])/2,(u[2]+f[2])/2),n.set(c,r++)}if(n.size<2)return null;const o=new ie({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);o.vertex(l[0],l[1],l[2])}for(let c=0;c<s.length;c+=3)o.vertex(s[c],s[c+1],s[c+2]);for(let c=0;c<i.faceCount;c++){const l=i.faceVerts(c),h=Ie(i,c),u=[],f=new Map;if(h)for(const[d]of h)f.set(d,[]);for(let d=0;d<l.length;d++){const g=l[d],v=l[(d+1)%l.length];if(u.push(g),h)for(const[p,_]of h)f.get(p).push(_[d]??[0,0]);const m=n.get(Nt(g,v));if(m!==void 0&&(u.push(m),h))for(const[p,_]of h){const y=_[d]??[0,0],M=_[(d+1)%l.length]??y;f.get(p).push([(y[0]+M[0])/2,(y[1]+M[1])/2])}}o.face(u,{uv:h?f:void 0,polygroup:i.polygroup[c],materialId:i.materialId[c]})}const a=o.build();for(const[c,l]of i.crease){const[h,u]=c.split("_").map(Number);h<a.vertexCount&&u<a.vertexCount&&a.setCrease(h,u,l)}return Cu(a,n.values())}function Xv(i,t,e,n){let s=t*i.scale[0],r=e*i.scale[1],o=n*i.scale[2];const[a,c,l,h]=i.rotation,u=2*(c*o-l*r),f=2*(l*s-a*o),d=2*(a*r-c*s);return s+=h*u+(c*d-l*f),r+=h*f+(l*u-a*d),o+=h*d+(a*f-c*u),[s+i.position[0],r+i.position[1],o+i.position[2]]}function ks(i,t,e,n){i.face(t.faceVerts(e).map(n),{uv:Ie(t,e)??void 0,polygroup:t.polygroup[e],materialId:t.materialId[e]})}function $v(i,t){const e=[...new Set(t)].filter(c=>c>=0&&c<i.faceCount);if(!e.length)return null;const n=new ie({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);n.vertex(l[0],l[1],l[2])}for(let c=0;c<i.faceCount;c++)ks(n,i,c,l=>l);const s=new Map,r=[],o=[];for(const c of e)for(const l of i.faceVerts(c)){if(s.has(l))continue;const h=i.getPosition(l),u=n.vertex(h[0],h[1],h[2]);s.set(l,u),r.push(u)}for(const c of e){const l=i.faceCount+o.length;ks(n,i,c,h=>s.get(h)),o.push(l)}const a=n.build();for(const[c,l]of i.crease){const[h,u]=c.split("_").map(Number);a.setCrease(h,u,l)}return{mesh:a,faces:o,verts:r}}function qv(i,t){const e=new Set([...t].filter(s=>s>=0&&s<i.faceCount));if(!e.size||e.size===i.faceCount)return null;const n=s=>{const r=new ie({weld:!1});for(let a=0;a<i.vertexCount;a++){const c=i.getPosition(a);r.vertex(c[0],c[1],c[2])}for(let a=0;a<i.faceCount;a++)s(a)&&ks(r,i,a,c=>c);const o=r.build();for(const[a,c]of i.crease){const[l,h]=a.split("_").map(Number);o.setCrease(l,h,c)}return qn(o)};return{mesh:n(s=>!e.has(s)),extracted:n(s=>e.has(s)),count:e.size}}function Yv(i){if(i.length<2)return null;const t=new Set;for(const n of i)for(const s of n.mesh.uvSets.keys())t.add(s);const e=new ie({weld:!1});for(const{mesh:n,transform:s}of i){const r=e.vertexCount;for(let o=0;o<n.vertexCount;o++){const a=n.getPosition(o),c=s?Xv(s,a[0],a[1],a[2]):a;e.vertex(c[0],c[1],c[2])}for(let o=0;o<n.faceCount;o++){const a=n.faceVerts(o),c=Ie(n,o);let l;if(t.size){l=new Map;for(const h of t)l.set(h,c?.get(h)??a.map(()=>[0,0]))}e.face(a.map(h=>r+h),{uv:l,polygroup:n.polygroup[o],materialId:n.materialId[o]})}}return e.build()}function Kv(i){if(!i.faceCount)return null;const t=new Int32Array(i.faceCount);for(let o=0;o<i.faceCount;o++)t[o]=o;const e=o=>{let a=o;for(;t[a]!==a;)a=t[a];let c=o;for(;t[c]!==a;){const l=t[c];t[c]=a,c=l}return a},n=new Int32Array(i.vertexCount).fill(-1);for(let o=0;o<i.faceCount;o++)for(const a of i.faceVerts(o))if(n[a]<0)n[a]=o;else{const c=e(n[a]),l=e(o);c!==l&&(t[l]=c)}const s=new Map;for(let o=0;o<i.faceCount;o++){const a=e(o),c=s.get(a);c?c.push(o):s.set(a,[o])}if(s.size<2)return null;const r=[];for(const o of s.values()){const a=new ie({weld:!1});for(let l=0;l<i.vertexCount;l++){const h=i.getPosition(l);a.vertex(h[0],h[1],h[2])}for(const l of o)ks(a,i,l,h=>h);const c=a.build();for(const[l,h]of i.crease){const[u,f]=l.split("_").map(Number);c.setCrease(u,f,h)}r.push(qn(c))}return r}function Zv(i,t,e=.001){if(!i.vertexCount)return null;const n=new ie({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);n.vertex(l[0],l[1],l[2])}const s=i.vertexCount;for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c),h=[l[0],l[1],l[2]];h[t]=-h[t],n.vertex(h[0],h[1],h[2])}for(let c=0;c<i.faceCount;c++)ks(n,i,c,l=>l);for(let c=0;c<i.faceCount;c++){const l=i.faceVerts(c).map(f=>s+f),h=Ie(i,c);let u;if(h){u=new Map;for(const[f,d]of h)u.set(f,[...d].reverse())}n.face(l.reverse(),{uv:u,polygroup:i.polygroup[c],materialId:i.materialId[c]})}const r=n.build();for(const[c,l]of i.crease){const[h,u]=c.split("_").map(Number);r.setCrease(h,u,l),r.setCrease(s+h,s+u,l)}const o=[];for(let c=0;c<r.vertexCount;c++)Math.abs(r.getPosition(c)[t])<=e&&o.push(c);const a=o.length>=2?Au(r,Math.max(e,1e-6),o):null;return a?{mesh:qn(a.mesh),welded:a.merged}:{mesh:r,welded:0}}function Yn(i,t){return`${i}:${t}`}function yc(i){const t=i.indexOf(":");return[Number(i.slice(0,t)),Number(i.slice(t+1))]}function Jv(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619)>>>0;return t.toString(16).padStart(8,"0")}function jv(i,t){const e=[...i].sort((s,r)=>s-r).join(","),n=[...t].sort().join(",");return Jv(`${e}|${n}`)}function Qv(i,t,e){const n=i.faceOffsets[t],s=i.faceOffsets[t+1];for(let r=n;r<s;r++)if(i.faceCorners[r]===e)return r-n;return-1}function Sc(i,t){const e=i.edgeFaceMap(),n=new Int32Array(i.faceCount);for(let a=0;a<i.faceCount;a++)n[a]=a;const s=a=>{let c=a;for(;n[c]!==c;)c=n[c];let l=a;for(;n[l]!==c;){const h=n[l];n[l]=c,l=h}return c};for(const[a,c]of e){if(c.length!==2||t.has(a))continue;const l=s(c[0]),h=s(c[1]);l!==h&&(n[Math.max(l,h)]=Math.min(l,h))}const r=new Map;for(let a=0;a<i.faceCount;a++){const c=s(a),l=r.get(c);l?l.push(a):r.set(c,[a])}const o=[];for(const a of[...r.keys()].sort((c,l)=>c-l)){const c=r.get(a),l=[],h=new Set(c),u=new Set;for(const d of c){const g=i.faceSize(d);for(let m=0;m<g;m++)l.push(Yn(d,m));const v=i.faceVerts(d);for(let m=0;m<g;m++){const p=Nt(v[m],v[(m+1)%g]),_=e.get(p)??[];(t.has(p)||_.length!==2||!_.every(y=>h.has(y)))&&u.add(p)}}const f=[...u].sort();o.push({faces:c,corners:l,boundarySeams:f,fingerprint:jv(c,f)})}return o}function bc(i,t,e){const n=i.edgeFaceMap(),s=new Set(t.faces),r=new Map;t.corners.forEach((m,p)=>r.set(m,p));const o=new Int32Array(t.corners.length);for(let m=0;m<o.length;m++)o[m]=m;const a=m=>{let p=m;for(;o[p]!==p;)p=o[p];let _=m;for(;o[_]!==p;){const y=o[_];o[_]=p,_=y}return p},c=(m,p)=>{const _=a(m),y=a(p);_!==y&&(o[Math.max(_,y)]=Math.min(_,y))};for(const m of t.faces){const p=i.faceVerts(m);for(let _=0;_<p.length;_++){const y=p[_],M=p[(_+1)%p.length],w=Nt(y,M);if(e.has(w))continue;const b=n.get(w)??[];if(b.length!==2)continue;const A=b[0]===m?b[1]:b[0];if(!(A===m||!s.has(A)))for(const[x,T]of[[y,_],[M,(_+1)%p.length]]){const P=Qv(i,A,x);if(P<0)continue;const R=r.get(Yn(m,T)),L=r.get(Yn(A,P));R!==void 0&&L!==void 0&&c(R,L)}}}const l=new Map,h=new Map,u=[];for(let m=0;m<t.corners.length;m++){const p=a(m);let _=l.get(p);if(_===void 0){_=l.size,l.set(p,_);const[y,M]=yc(t.corners[m]);u.push(i.faceVerts(y)[M])}h.set(t.corners[m],_)}const f=l.size,d=new Float64Array(f*3),g=new Int32Array(f);for(let m=0;m<f;m++){const p=u[m];g[m]=p,d[m*3]=i.positions[p*3],d[m*3+1]=i.positions[p*3+1],d[m*3+2]=i.positions[p*3+2]}const v=[];for(const m of t.faces){const p=i.faceSize(m),_=[];for(let y=0;y<p;y++)_.push(h.get(Yn(m,y)));for(let y=1;y<p-1;y++)v.push(_[0],_[y],_[y+1])}return{count:f,tri:Uint32Array.from(v),positions:d,localOf:h,vertexOf:g}}function tx(i,t){const e=new Float64Array(i.cols.length);for(let n=0;n<i.cols.length;n++){const s=i.cols[n],r=i.vals[n];let o=0;for(let a=0;a<s.length;a++)o+=r[a]*t[s[a]];e[n]=o}return e}function Jl(i,t){const e=new Float64Array(i.columns);for(let n=0;n<i.cols.length;n++){const s=i.cols[n],r=i.vals[n],o=t[n];if(o!==0)for(let a=0;a<s.length;a++)e[s[a]]+=r[a]*o}return e}function ex(i,t=2e3,e=1e-6){const n=i.columns,s=new Float64Array(n),r=Jl(i,i.rhs),o=Float64Array.from(r),a=Float64Array.from(o);let c=0;for(let h=0;h<n;h++)c+=o[h]*o[h];const l=Math.max(1e-300,c)*e*e;if(c<=l)return s;for(let h=0;h<t;h++){const u=Jl(i,tx(i,a));let f=0;for(let m=0;m<n;m++)f+=a[m]*u[m];if(!(Math.abs(f)>1e-300))break;const d=c/f;for(let m=0;m<n;m++)s[m]+=d*a[m],o[m]-=d*u[m];let g=0;for(let m=0;m<n;m++)g+=o[m]*o[m];if(g<=l)break;const v=g/c;for(let m=0;m<n;m++)a[m]=o[m]+v*a[m];c=g}return s}function nx(i,t,e,n){const s=i[e*3]-i[t*3],r=i[e*3+1]-i[t*3+1],o=i[e*3+2]-i[t*3+2],a=i[n*3]-i[t*3],c=i[n*3+1]-i[t*3+1],l=i[n*3+2]-i[t*3+2],h=Math.hypot(s,r,o);if(h<1e-12)return{x:[0,0,0],y:[0,0,0],area2:0};const u=h,f=(s*a+r*c+o*l)/h,d=r*l-o*c,g=o*a-s*l,v=s*c-r*a,m=Math.hypot(d,g,v)/h;return{x:[0,u,f],y:[0,0,m],area2:u*m}}function ix(i,t,e){const n=i.length/3,s=new Float64Array(n*2);if(!n)return s;const r=[],o=new Int32Array(n).fill(-1);for(let f=0;f<n;f++)e.has(f)||(o[f]=r.length,r.push(f));const a=r.length*2;if(!a){for(const[f,d]of e)s[f*2]=d[0],s[f*2+1]=d[1];return s}const c=[],l=[],h=[];for(let f=0;f<t.length;f+=3){const d=[t[f],t[f+1],t[f+2]],{x:g,y:v,area2:m}=nx(i,d[0],d[1],d[2]);if(!(m>1e-16))continue;const p=1/Math.sqrt(m),_=[g[2]-g[1],g[0]-g[2],g[1]-g[0]],y=[v[2]-v[1],v[0]-v[2],v[1]-v[0]];for(const M of[0,1]){const w=[],b=[];let A=0;for(let x=0;x<3;x++){const T=(M===0?_[x]:y[x])*p,P=(M===0?-y[x]:_[x])*p,R=d[x],L=e.get(R);if(L){A-=T*L[0]+P*L[1];continue}w.push(o[R],r.length+o[R]),b.push(T,P)}w.length&&(c.push(Int32Array.from(w)),l.push(Float64Array.from(b)),h.push(A))}}const u=ex({cols:c,vals:l,rhs:Float64Array.from(h),columns:a});for(let f=0;f<r.length;f++){const d=r[f];s[d*2]=u[f],s[d*2+1]=u[r.length+f]}for(const[f,d]of e)s[f*2]=d[0],s[f*2+1]=d[1];return s}function sx(i){const t=i.length/3,e=new Map;if(t<2)return t===1&&e.set(0,[0,0]),e;let n=0,s=-1;for(let c=1;c<t;c++){const l=jl(i,0,c);l>s&&(s=l,n=c)}let r=0;s=-1;for(let c=0;c<t;c++){if(c===n)continue;const l=jl(i,n,c);l>s&&(s=l,r=c)}const o=Math.min(n,r),a=Math.max(n,r);return e.set(o,[0,0]),e.set(a,[1,0]),e}function jl(i,t,e){return Math.hypot(i[t*3]-i[e*3],i[t*3+1]-i[e*3+1],i[t*3+2]-i[e*3+2])}function rx(i,t,e){let n=0,s=0;for(let o=0;o<t.length;o+=3){const a=t[o],c=t[o+1],l=t[o+2],h=i[c*3]-i[a*3],u=i[c*3+1]-i[a*3+1],f=i[c*3+2]-i[a*3+2],d=i[l*3]-i[a*3],g=i[l*3+1]-i[a*3+1],v=i[l*3+2]-i[a*3+2],m=u*v-f*g,p=f*d-h*v,_=h*g-u*d;n+=Math.hypot(m,p,_)/2;const y=e[c*2]-e[a*2],M=e[c*2+1]-e[a*2+1],w=e[l*2]-e[a*2],b=e[l*2+1]-e[a*2+1];s+=Math.abs(y*b-M*w)/2}if(!(n>1e-16)||!(s>1e-16))return 1;const r=Math.sqrt(n/s);for(let o=0;o<e.length;o++)e[o]*=r;return r}function ox(i,t){const e=i.length/3,n=new Float64Array(e*2);if(!e)return n;let s=0,r=0,o=0;for(let p=0;p<t.length;p+=3){const _=t[p]*3,y=t[p+1]*3,M=t[p+2]*3,w=i[y]-i[_],b=i[y+1]-i[_+1],A=i[y+2]-i[_+2],x=i[M]-i[_],T=i[M+1]-i[_+1],P=i[M+2]-i[_+2];s+=b*P-A*T,r+=A*x-w*P,o+=w*T-b*x}let a=Math.hypot(s,r,o);a<1e-12&&(s=0,r=0,o=1,a=1),s/=a,r/=a,o/=a;const c=Math.abs(s)<.9?1:0,l=Math.abs(s)<.9?0:1;let h=l*o-0*r,u=0*s-c*o,f=c*r-l*s;const d=Math.hypot(h,u,f)||1;h/=d,u/=d,f/=d;const g=r*f-o*u,v=o*h-s*f,m=s*u-r*h;for(let p=0;p<e;p++){const _=i[p*3],y=i[p*3+1],M=i[p*3+2];n[p*2]=_*h+y*u+M*f,n[p*2+1]=_*g+y*v+M*m}return n}function Ru(i,t,e){const n=t.length/3,s=new Float32Array(n);let r=1,o=0,a=0;for(let c=0;c<n;c++){const l=t[c*3],h=t[c*3+1],u=t[c*3+2],f=i[h*3]-i[l*3],d=i[h*3+1]-i[l*3+1],g=i[h*3+2]-i[l*3+2],v=i[u*3]-i[l*3],m=i[u*3+1]-i[l*3+1],p=i[u*3+2]-i[l*3+2],_=Math.hypot(f,d,g);if(_<1e-12){s[c]=1;continue}const y=_,M=(f*v+d*m+g*p)/_,w=d*p-g*m,b=g*v-f*p,A=f*m-d*v,x=Math.hypot(w,b,A)/_,T=y*x;if(!(Math.abs(T)>1e-16)){s[c]=1;continue}const P=e[h*2]-e[l*2],R=e[h*2+1]-e[l*2+1],L=e[u*2]-e[l*2],V=e[u*2+1]-e[l*2+1],B=(P*x-L*0)/T,U=(-P*M+L*y)/T,k=(R*x-V*0)/T,O=(-R*M+V*y)/T,$=(B+O)/2,Z=(B-O)/2,it=(k+U)/2,Q=(k-U)/2,rt=Math.hypot($,Q),bt=Math.hypot(Z,it),Ft=rt+bt,wt=Math.abs(rt-bt),q=Math.max(Ft,wt>1e-12?1/wt:1e12);s[c]=q,q>r&&(r=q);const st=[[0,0],[y,0],[M,x]],nt=[[e[l*2],e[l*2+1]],[e[h*2],e[h*2+1]],[e[u*2],e[u*2+1]]];for(let yt=0;yt<3;yt++){const Dt=st[yt],Et=st[(yt+1)%3],Qt=st[(yt+2)%3],Ot=nt[yt],Kt=nt[(yt+1)%3],Zt=nt[(yt+2)%3],Wt=Ql(Dt,Et,Qt),ue=Ql(Ot,Kt,Zt);Number.isFinite(Wt)&&Number.isFinite(ue)&&(o+=Math.abs(Wt-ue),a++)}}return{maxStretch:r,meanAngleError:a?o/a*(180/Math.PI):0,perTriangle:s}}function Ql(i,t,e){const n=t[0]-i[0],s=t[1]-i[1],r=e[0]-i[0],o=e[1]-i[1],a=Math.hypot(n,s),c=Math.hypot(r,o);if(a<1e-12||c<1e-12)return NaN;const l=Math.max(-1,Math.min(1,(n*r+s*o)/(a*c)));return Math.acos(l)}const An="map1";function Pu(){return{seams:new Set,pins:new Map,method:"lscm",packing:{margin:1/128,allowRotate:!0,texelDensity:null},manual:new Map,autoSeamParams:{angle:65,useHardEdges:!0,useCreases:!0,usePolygroups:!0,symmetric:!1}}}function wM(i){const t=new Map;for(const[e,n]of i.manual)t.set(e,new Map([...n].map(([s,r])=>[s,[r[0],r[1]]])));return{seams:new Set(i.seams),pins:new Map([...i.pins].map(([e,n])=>[e,[n[0],n[1]]])),method:i.method,packing:{...i.packing},manual:t,autoSeamParams:{...i.autoSeamParams}}}function qa(i,t,e={}){const n=Sc(i,t.seams),s=new Float32Array(i.faceCorners.length*2),r=[],o=[],a=i.uvSets.get(An);for(const h of n){const u=bc(i,h,t.seams);let f;if(t.method==="none"){f=new Float64Array(u.count*2);for(const p of h.corners){const _=u.localOf.get(p),y=nn(i,p);f[_*2]=a?a[y*2]:0,f[_*2+1]=a?a[y*2+1]:0}}else if(t.method==="projection")f=ox(u.positions,u.tri);else{const p=new Map;for(const _ of h.corners){const y=t.pins.get(_);if(!y)continue;const M=u.localOf.get(_);M!==void 0&&p.set(M,[y[0],y[1]])}if(p.size<2)for(const[_,y]of sx(u.positions))p.has(_)||p.set(_,y);f=ix(u.positions,u.tri,p),t.pins.size<2&&rx(u.positions,u.tri,f)}r.push(Ru(u.positions,u.tri,f));let d=1/0,g=1/0,v=-1/0,m=-1/0;for(let p=0;p<u.count;p++)d=Math.min(d,f[p*2]),v=Math.max(v,f[p*2]),g=Math.min(g,f[p*2+1]),m=Math.max(m,f[p*2+1]);o.push({min:[d,g],max:[v,m]});for(const p of h.corners){const _=u.localOf.get(p),y=nn(i,p);s[y*2]=f[_*2],s[y*2+1]=f[_*2+1]}}!e.skipPack&&t.method!=="none"&&ax(n,o,s,i,t.packing.margin);for(const h of n){const u=t.manual.get(h.fingerprint);if(u)for(const[f,d]of u){const g=nn(i,f);g<0||g*2+1>=s.length||(s[g*2]+=d[0],s[g*2+1]+=d[1])}}i.uvSets.set(An,s);let c=1,l=0;for(const h of r)c=Math.max(c,h.maxStretch),l+=h.meanAngleError;return{charts:n,distortion:r,maxStretch:c,meanAngleError:r.length?l/r.length:0}}function ax(i,t,e,n,s){if(!i.length)return;let r=0,o=0;for(const l of t)r+=Math.max(1e-6,l.max[0]-l.min[0])+s,o=Math.max(o,Math.max(1e-6,l.max[1]-l.min[1]));const a=Math.min(1/Math.max(1e-6,r),1/Math.max(1e-6,o));let c=0;i.forEach((l,h)=>{const u=t[h];for(const f of l.corners){const d=nn(n,f);e[d*2]=(e[d*2]-u.min[0])*a+c,e[d*2+1]=(e[d*2+1]-u.min[1])*a}c+=(u.max[0]-u.min[0])*a+s})}function nn(i,t){const[e,n]=yc(t);return e<0||e>=i.faceCount?-1:i.faceOffsets[e]+n}function cx(i,t,e){const n=i.manual.get(t)??new Map;for(const[s,r]of e){const o=n.get(s)??[0,0];n.set(s,[o[0]+r[0],o[1]+r[1]])}i.manual.set(t,n)}function lx(i,t){const e=new Set;for(const[a,c]of t.edges())e.add(Nt(a,c));let n=0;for(const a of[...i.seams])e.has(a)||(i.seams.delete(a),n++);for(const a of[...i.pins.keys()]){const[c,l]=yc(a);(c<0||c>=t.faceCount||l>=t.faceSize(c))&&i.pins.delete(a)}const s=Sc(t,i.seams),r=new Set(s.map(a=>a.fingerprint));let o=0;for(const a of[...i.manual.keys()])r.has(a)||(i.manual.delete(a),o++);return{droppedSeams:n,droppedIslands:o}}function EM(i,t,e){const n=i.faceVerts(t);return Nt(n[e],n[(e+1)%n.length])}function hx(i){return{seams:[...i.seams].sort(),pins:[...i.pins].sort((t,e)=>t[0]<e[0]?-1:1).map(([t,e])=>[t,e[0],e[1]]),method:i.method,packing:{...i.packing},manual:[...i.manual].sort((t,e)=>t[0]<e[0]?-1:1).map(([t,e])=>[t,[...e].sort((n,s)=>n[0]<s[0]?-1:1).map(([n,s])=>[n,s[0],s[1]])]),autoSeamParams:{...i.autoSeamParams}}}function ux(i){if(!i)return null;const t=Pu();for(const e of i.seams??[])t.seams.add(e);for(const[e,n,s]of i.pins??[])t.pins.set(e,[n,s]);i.method&&(t.method=i.method),i.packing&&(t.packing={...t.packing,...i.packing}),i.autoSeamParams&&(t.autoSeamParams={...t.autoSeamParams,...i.autoSeamParams});for(const[e,n]of i.manual??[])t.manual.set(e,new Map(n.map(([s,r,o])=>[s,[r,o]])));return t}function zo(i,t,e){const n=i.vertexNeighbors(),s=i.edgeFaceMap(),r=new Set,o=(h,u)=>{const f=n.get(u);if(!f||f.length!==4)return-1;const d=s.get(Nt(h,u))??[];for(const g of f){if(g===h)continue;if(!(s.get(Nt(u,g))??[]).some(m=>d.includes(m)))return g}return-1},a=[],c=(h,u,f,d)=>{let g=!0;for(let v=0;v<1e5;v++){const m=Nt(h,u);if(r.has(m)&&!g)return!0;g&&d||(r.add(m),f?a.push([h,u]):a.unshift([u,h])),g=!1;const p=o(h,u);if(p<0)return!1;h=u,u=p}return!1},l=c(t,e,!0,!1);return l||c(e,t,!1,!0),{edges:a,closed:l}}function fx(i,t,e){const n=i.edgeFaceMap(),s=new Set,r=[],o=[],a=(u,f,d,g)=>{for(let v=0;v<1e5;v++){const p=(n.get(Nt(u,f))??[]).find(b=>b!==d);if(p===void 0)return!1;if(s.has(p))return!0;const _=i.faceVerts(p);if(_.length!==4)return!1;s.add(p);let y=-1;for(let b=0;b<4;b++)if(_[b]===u&&_[(b+1)%4]===f){y=b;break}if(y<0){for(let b=0;b<4;b++)if(_[b]===f&&_[(b+1)%4]===u){y=b;break}}if(y<0)return!1;const M=_[(y+2)%4],w=_[(y+3)%4];g.push([w,M]),d=p,u=w,f=M}return!1},c=n.get(Nt(t,e))??[],l=a(t,e,-1,r);if(!l){const u=c.find(f=>s.has(f));a(e,t,u??-1,o)}const h=[...o.reverse(),[t,e],...r];if(l&&h.length>1){const u=h[h.length-1];Nt(u[0],u[1])===Nt(t,e)&&h.pop()}return{edges:h,closed:l}}function th(i,t,e){const n=i.edges.map(c=>Nt(c[0],c[1]));let s=n.indexOf(t),r=n.indexOf(e);if(s<0||r<0)return null;s>r&&([s,r]=[r,s]);const o=i.edges.slice(s,r+1);if(!i.closed)return o;const a=[...i.edges.slice(r),...i.edges.slice(0,s+1)];return a.length<o.length?a:o}function Lu(i,t){const e=i.edgeFaceMap(),n=new Set([t]),s=[t],r=[];for(;s.length;){const o=s.pop();r.push(o);const a=i.faceVerts(o);for(let c=0;c<a.length;c++){const l=e.get(Nt(a[c],a[(c+1)%a.length]))??[];for(const h of l)n.has(h)||(n.add(h),s.push(h))}}return r}function dx(i,t){const e=new Set;for(const n of Lu(i,t))for(const s of i.faceVerts(n))e.add(s);return Array.from(e)}function px(i){const t=[];for(const[e,n]of i.edges)t.includes(e)||t.push(e),t.includes(n)||t.push(n);return t}function mx(i){const t=[];for(const[e,n]of i.edgeFaceMap())if(n.length===1){const[s,r]=e.split("_").map(Number);t.push([s,r])}return t}function eh(i,t){const e=i.vertexNeighbors(),n=new Set(t);for(const s of Array.from(n))for(const r of e.get(s)??[])n.add(r);return Array.from(n)}function nh(i,t){const e=i.vertexNeighbors(),n=new Set(t);return Array.from(n).filter(s=>(e.get(s)??[]).every(r=>n.has(r)))}function gx(i,t){const e=i.edgeFaceMap(),n=new Set(t);for(const s of Array.from(n)){const r=i.faceVerts(s);for(let o=0;o<r.length;o++)for(const a of e.get(Nt(r[o],r[(o+1)%r.length]))??[])n.add(a)}return Array.from(n)}function vx(i,t){const e=i.edgeFaceMap(),n=new Set(t);return Array.from(n).filter(s=>{const r=i.faceVerts(s);for(let o=0;o<r.length;o++)for(const a of e.get(Nt(r[o],r[(o+1)%r.length]))??[])if(!n.has(a))return!1;return!0})}function xx(i){let t=0,e=0;for(const n of i)t+=n[0],e+=n[1];return[t/i.length,e/i.length]}class _x{vertexCount;faceCount;edgeList;edgeBase;faceBase;outCount;faceVerts=[];vertexFaces=[];neighbors=[];edgeIndex=new Map;edgeFaces=[];edgeSharp;sharpAt=[];constructor(t){this.vertexCount=t.vertexCount,this.faceCount=t.faceCount,this.edgeList=t.edges(),this.edgeBase=this.vertexCount,this.faceBase=this.vertexCount+this.edgeList.length,this.outCount=this.faceBase+this.faceCount;for(let r=0;r<this.faceCount;r++)this.faceVerts.push(t.faceVerts(r));const e=t.vertexFaces(),n=t.vertexNeighbors();for(let r=0;r<this.vertexCount;r++)this.vertexFaces.push(e.get(r)??[]),this.neighbors.push(n.get(r)??[]),this.sharpAt.push([]);const s=t.edgeFaceMap();this.edgeSharp=new Float64Array(this.edgeList.length);for(let r=0;r<this.edgeList.length;r++){const[o,a]=this.edgeList[r],c=Nt(o,a);this.edgeIndex.set(c,r);const l=s.get(c)??[];this.edgeFaces.push(l),this.edgeSharp[r]=Math.min(1,t.getCrease(o,a));const h=l.length===1?1:this.edgeSharp[r];h>0&&(this.sharpAt[o].push({other:a,sharpness:h}),this.sharpAt[a].push({other:o,sharpness:h}))}}edgePointOf(t,e){const n=this.edgeIndex.get(Nt(t,e));return n===void 0?-1:this.edgeBase+n}affected(t){const e=new Set,n=new Set;for(const s of t){if(s<0||s>=this.vertexCount)continue;const r=this.vertexFaces[s];r.length||n.add(s);for(const o of r)e.add(o)}for(const s of e){n.add(this.faceBase+s);const r=this.faceVerts[s];for(let o=0;o<r.length;o++){n.add(r[o]);const a=this.edgeIndex.get(Nt(r[o],r[(o+1)%r.length]));a!==void 0&&n.add(this.edgeBase+a)}}return n}positions(t,e,n){const s=new Float64Array(this.faceCount*3),r=new Uint8Array(this.faceCount),o=u=>{if(!r[u]){const f=t.faceCenter(u);s[u*3]=f[0],s[u*3+1]=f[1],s[u*3+2]=f[2],r[u]=1}return u*3},a=u=>{const f=o(u),d=(this.faceBase+u)*3;e[d]=s[f],e[d+1]=s[f+1],e[d+2]=s[f+2]},c=u=>{const[f,d]=this.edgeList[u],g=t.getPosition(f),v=t.getPosition(d),m=[(g[0]+v[0])/2,(g[1]+v[1])/2,(g[2]+v[2])/2],p=(this.edgeBase+u)*3,_=this.edgeFaces[u];if(_.length!==2){e[p]=m[0],e[p+1]=m[1],e[p+2]=m[2];return}const y=o(_[0]),M=o(_[1]),w=this.edgeSharp[u];for(let b=0;b<3;b++){const A=(g[b]+v[b]+s[y+b]+s[M+b])/4;e[p+b]=A+(m[b]-A)*w}},l=u=>{const f=t.getPosition(u),d=this.vertexFaces[u],g=d.length,v=this.neighbors[u],m=u*3;let p;if(!g||!v.length)p=[f[0],f[1],f[2]];else{let w=0,b=0,A=0;for(const R of d){const L=o(R);w+=s[L],b+=s[L+1],A+=s[L+2]}w/=g,b/=g,A/=g;let x=0,T=0,P=0;for(const R of v){const L=t.getPosition(R);x+=(f[0]+L[0])/2,T+=(f[1]+L[1])/2,P+=(f[2]+L[2])/2}x/=v.length,T/=v.length,P/=v.length,p=[(w+2*x+(g-3)*f[0])/g,(b+2*T+(g-3)*f[1])/g,(A+2*P+(g-3)*f[2])/g]}const _=this.sharpAt[u];if(_.length<2){e[m]=p[0],e[m+1]=p[1],e[m+2]=p[2];return}let y;if(_.length>=3)y=[f[0],f[1],f[2]];else{let w=0,b=0,A=0;for(const x of _){const T=t.getPosition(x.other);w+=(f[0]+T[0])/2,b+=(f[1]+T[1])/2,A+=(f[2]+T[2])/2}y=[(w+6*f[0])/8,(b+6*f[1])/8,(A+6*f[2])/8]}let M=0;for(const w of _)M+=w.sharpness;M=Math.min(1,M/_.length);for(let w=0;w<3;w++)e[m+w]=p[w]+(y[w]-p[w])*M},h=u=>{u>=this.faceBase?a(u-this.faceBase):u>=this.edgeBase?c(u-this.edgeBase):l(u)};if(n){for(const u of n)u>=0&&u<this.outCount&&h(u);return}for(let u=0;u<this.faceCount;u++)a(u);for(let u=0;u<this.edgeList.length;u++)c(u);for(let u=0;u<this.vertexCount;u++)l(u)}build(t){const e=new Float32Array(this.outCount*3);this.positions(t,e);const n=new ie({weld:!1});for(let r=0;r<this.outCount;r++)n.vertex(e[r*3],e[r*3+1],e[r*3+2]);for(let r=0;r<this.faceCount;r++){const o=this.faceVerts[r],a=Ie(t,r),c=t.polygroup[r],l=t.materialId[r],h=o.length,u=new Map;if(a)for(const[f,d]of a)u.set(f,xx(d));for(let f=0;f<h;f++){const d=o[f],g=o[(f+1)%h],v=o[(f-1+h)%h];let m;if(a){m=new Map;for(const[p,_]of a){const y=_[f]??[0,0],M=_[(f+1)%h]??[0,0],w=_[(f-1+h)%h]??[0,0];m.set(p,[y,[(y[0]+M[0])/2,(y[1]+M[1])/2],u.get(p),[(w[0]+y[0])/2,(w[1]+y[1])/2]])}}n.face([d,this.edgePointOf(d,g),this.faceBase+r,this.edgePointOf(v,d)],{uv:m,polygroup:c,materialId:l})}}const s=n.build();for(const[r,o]of t.crease){const a=o-1;if(a<=0)continue;const[c,l]=r.split("_").map(Number),h=this.edgePointOf(c,l);h<0||(s.setCrease(c,h,a),s.setCrease(h,l,a))}for(const[r,o]of t.cornerSharp){const a=o-1;a>0&&s.cornerSharp.set(r,a)}return s}}function Mx(i){return new _x(i).build(i)}function yx(i,t){let e=i;for(let n=0;n<t;n++)e=Mx(e);return e}function Sr(i,t){return i^=t&255,i=Math.imul(i,16777619),i^=t>>>8&255,i=Math.imul(i,16777619),i^=t>>>16&255,i=Math.imul(i,16777619),i^=t>>>24&255,i=Math.imul(i,16777619),i>>>0}function Iu(i){let t=2166136261;t=Sr(t,i.vertexCount),t=Sr(t,i.faceCount);for(let e=0;e<i.faceOffsets.length;e++)t=Sr(t,i.faceOffsets[e]);for(let e=0;e<i.faceCorners.length;e++)t=Sr(t,i.faceCorners[e]);return t.toString(16).padStart(8,"0")}function TM(i,t){if(i.vertexCount!==t.vertexCount)return{same:!1,reason:"vertexCount"};if(i.faceCount!==t.faceCount)return{same:!1,reason:"faceCount"};if(i.faceCorners.length!==t.faceCorners.length)return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceOffsets.length;e++)if(i.faceOffsets[e]!==t.faceOffsets[e])return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceCorners.length;e++)if(i.faceCorners[e]!==t.faceCorners[e])return{same:!1,reason:"faceOrder"};return{same:!0}}function Du(){return{position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]}}function pi(i){const[t,e,n]=i.position,[s,r,o,a]=i.rotation,[c,l,h]=i.scale;return{position:[t,e,n],rotation:[s,r,o,a],scale:[c,l,h]}}class Ya{id;name;kind;parametric;params;transform;mesh;multires=[];sculptLayers=[];paintLayers=[];activeLevel=0;visible=!0;exportedTopologyHash=null;uv=null;constructor(t,e,n){this.id=e,this.kind=t;const s=ps[t];this.name=n??(s?s.en.replace(/\s/g,""):"mesh")+e,this.parametric=!!s,this.params=wv(t),this.transform=Du(),this.mesh=s?s.build(this.params):ds.empty()}rebuild(){if(!this.parametric)return;const t=ps[this.kind];t&&(this.mesh=t.build(this.params))}markTopologyChanged(){const t=this.multires.length,e=this.sculptLayers.length;this.parametric=!1,this.multires=[],this.sculptLayers=[],this.activeLevel=0;const n=this.uv?lx(this.uv,this.mesh):{droppedSeams:0,droppedIslands:0};return{droppedLevels:t,droppedLayers:e,...n}}topologyHash(){return Iu(this.mesh)}hasUv(){return this.mesh.uvSets.size>0}}class Uu{objects=[];settings={};cameraBookmarks=[];nextId=1;newId(){return String(this.nextId++)}addObject(t){const e=new Ya(t,this.newId());return this.objects.push(e),e}addMesh(t,e){const n=new Ya("mesh",this.newId(),e);return n.parametric=!1,n.mesh=t,this.objects.push(n),n}remove(t){const e=this.objects.indexOf(t);e>=0&&this.objects.splice(e,1)}find(t){return this.objects.find(e=>e.id===t)}syncIdCounter(){let t=0;for(const e of this.objects){const n=Number(e.id);Number.isFinite(n)&&n>t&&(t=n)}this.nextId=t+1}stats(){let t=0,e=0,n=0;for(const s of this.objects){const r=s.mesh.stats();t+=r.vertices,e+=r.faces,n+=r.triangles}return{objects:this.objects.length,vertices:t,faces:e,triangles:n}}}function Sx(i){const t=[],e=[],n=[];let s=null,r="mesh",o=new Map,a=!1,c=0;const l=new Map,h=()=>{s&&s.faceCount>0&&n.push({name:r,mesh:s.build()}),s=null,o=new Map,a=!1},u=()=>(s||(s=new ie({weld:!1})),s);for(const f of i.split(/\r?\n/)){const d=f.trim();if(!d||d.startsWith("#"))continue;const g=d.split(/\s+/),v=g[0];if(v==="v")t.push([Number(g[1]),Number(g[2]),Number(g[3])]);else if(v==="vt")e.push([Number(g[1]),Number(g[2]??0)]);else if(v==="o")h(),r=g.slice(1).join("_")||"mesh";else if(v==="g"){const m=g.slice(1).join("_")||"default";let p=l.get(m);p===void 0&&(p=l.size,l.set(m,p)),c=p,r==="mesh"&&!s&&(r=m)}else if(v==="f"){const m=u(),p=[],_=[];for(let y=1;y<g.length;y++){const M=g[y].split("/");let w=parseInt(M[0],10);if(!Number.isFinite(w))continue;w<0&&(w=t.length+w+1);let b=o.get(w);if(b===void 0){const x=t[w-1];if(!x)continue;b=m.vertex(x[0],x[1],x[2]),o.set(w,b)}if(p.includes(b))continue;p.push(b);let A=M[1]?parseInt(M[1],10):NaN;if(Number.isFinite(A)){A<0&&(A=e.length+A+1);const x=e[A-1];x?(_.push(x),a=!0):_.push([0,0])}else _.push([0,0])}p.length>=3&&m.face(p,{uv:a?new Map([["map1",_]]):void 0,polygroup:c})}}return h(),n}function bx(i){const t=["# macbeth"];let e=1,n=1;for(const s of i){const{mesh:r}=s;t.push(`o ${s.name.replace(/\s+/g,"_")}`);for(let l=0;l<r.vertexCount;l++){const h=r.getPosition(l),u=s.toWorld?s.toWorld(h[0],h[1],h[2]):h;t.push(`v ${u[0].toFixed(6)} ${u[1].toFixed(6)} ${u[2].toFixed(6)}`)}const o=r.uvSets.get("map1")??r.uvSets.values().next().value??null;if(o)for(let l=0;l<r.cornerCount;l++)t.push(`vt ${o[l*2].toFixed(6)} ${o[l*2+1].toFixed(6)}`);const a=new Map;for(let l=0;l<r.faceCount;l++){const h=r.polygroup[l],u=a.get(h);u?u.push(l):a.set(h,[l])}const c=a.size<=1;for(const[l,h]of a){c||t.push(`g group${l}`);for(const u of h){const f=[];for(let d=r.faceOffsets[u];d<r.faceOffsets[u+1];d++){const g=r.faceCorners[d]+e;f.push(o?`${g}/${d+n}`:`${g}`)}t.push(`f ${f.join(" ")}`)}}e+=r.vertexCount,o&&(n+=r.cornerCount)}return t.join(`
`)+`
`}const Nu="MBMESH\0\0",Fu=1;function Ka(i){return i+3&-4}function wx(i){let t=16;for(const r of i)t+=8+Ka(r.data.byteLength);const e=new Uint8Array(t),n=new DataView(e.buffer);for(let r=0;r<8;r++)e[r]=Nu.charCodeAt(r);n.setUint32(8,Fu,!0),n.setUint32(12,i.length,!0);let s=16;for(const r of i){for(let o=0;o<4;o++)e[s+o]=r.tag.charCodeAt(o);n.setUint32(s+4,r.data.byteLength,!0),e.set(r.data,s+8),s+=8+Ka(r.data.byteLength)}return e}function Ex(i){for(let o=0;o<8;o++)if(i[o]!==Nu.charCodeAt(o))throw new Error("メッシュのバイナリ形式ではありません");const t=new DataView(i.buffer,i.byteOffset,i.byteLength),e=t.getUint32(8,!0),n=t.getUint32(12,!0),s=new Map;let r=16;for(let o=0;o<n;o++){let a="";for(let l=0;l<4;l++)a+=String.fromCharCode(i[r+l]);const c=t.getUint32(r+4,!0);s.set(a,i.subarray(r+8,r+8+c)),r+=8+Ka(c)}return{version:e,chunks:s}}function hn(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function br(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function wr(i){return new Uint32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function ih(i){return new Uint16Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}const Tx=new TextEncoder,Ax=new TextDecoder;function Cx(i){const t=[{tag:"POSI",data:hn(i.positions)},{tag:"FOFF",data:hn(i.faceOffsets)},{tag:"FCOR",data:hn(i.faceCorners)}];if(i.polygroup.some(e=>e!==0)&&t.push({tag:"PGRP",data:hn(i.polygroup)}),i.materialId.some(e=>e!==0)&&t.push({tag:"MTID",data:hn(i.materialId)}),i.vertexColor&&t.push({tag:"VCOL",data:hn(i.vertexColor)}),i.crease.size){const e=new Uint32Array(i.crease.size*2),n=new Float32Array(i.crease.size);let s=0;for(const[r,o]of i.crease){const[a,c]=r.split("_").map(Number);e[s*2]=a,e[s*2+1]=c,n[s]=o,s++}t.push({tag:"CRID",data:hn(e)},{tag:"CRSH",data:hn(n)})}if(i.cornerSharp.size){const e=new Uint32Array(i.cornerSharp.size),n=new Float32Array(i.cornerSharp.size);let s=0;for(const[r,o]of i.cornerSharp)e[s]=r,n[s]=o,s++;t.push({tag:"CNID",data:hn(e)},{tag:"CNSH",data:hn(n)})}if(i.uvSets.size){const e=Array.from(i.uvSets.keys());t.push({tag:"UVNM",data:Tx.encode(JSON.stringify(e))}),e.forEach((n,s)=>{t.push({tag:`UV${String(s).padStart(2,"0")}`,data:hn(i.uvSets.get(n))})})}return wx(t)}function Rx(i){const{version:t,chunks:e}=Ex(i);if(t>Fu)throw new Error(`このメッシュは新しい版 (v${t}) で保存されています。アプリを更新してください`);const n=br(e.get("POSI")),s=wr(e.get("FOFF")),r=wr(e.get("FCOR")),o=new Map,a=e.get("UVNM");a&&JSON.parse(Ax.decode(a)).forEach((y,M)=>{const w=e.get(`UV${String(M).padStart(2,"0")}`);w&&o.set(y,br(w))});const c=new Map,l=e.get("CRID"),h=e.get("CRSH");if(l&&h){const _=wr(l),y=br(h);for(let M=0;M<y.length;M++){const w=_[M*2],b=_[M*2+1];c.set(w<b?`${w}_${b}`:`${b}_${w}`,y[M])}}const u=new Map,f=e.get("CNID"),d=e.get("CNSH");if(f&&d){const _=wr(f),y=br(d);for(let M=0;M<y.length;M++)u.set(_[M],y[M])}const g=Math.max(0,s.length-1),v=e.get("PGRP"),m=e.get("MTID"),p=e.get("VCOL");return new ds(n,s,r,{uvSets:o,crease:c,cornerSharp:u,polygroup:v?ih(v):new Uint16Array(g),materialId:m?ih(m):new Uint16Array(g),vertexColor:p?new Uint8Array(p):null})}var xe=Uint8Array,Je=Uint16Array,wc=Int32Array,Jr=new xe([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),jr=new xe([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Za=new xe([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ou=function(i,t){for(var e=new Je(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new wc(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)s[r]=r-e[n]<<5|n;return{b:e,r:s}},ku=Ou(Jr,2),Bu=ku.b,Ja=ku.r;Bu[28]=258,Ja[258]=28;var zu=Ou(jr,0),Px=zu.b,sh=zu.r,ja=new Je(32768);for(var le=0;le<32768;++le){var hi=(le&43690)>>1|(le&21845)<<1;hi=(hi&52428)>>2|(hi&13107)<<2,hi=(hi&61680)>>4|(hi&3855)<<4,ja[le]=((hi&65280)>>8|(hi&255)<<8)>>1}var Nn=(function(i,t,e){for(var n=i.length,s=0,r=new Je(t);s<n;++s)i[s]&&++r[i[s]-1];var o=new Je(t);for(s=1;s<t;++s)o[s]=o[s-1]+r[s-1]<<1;var a;if(e){a=new Je(1<<t);var c=15-t;for(s=0;s<n;++s)if(i[s])for(var l=s<<4|i[s],h=t-i[s],u=o[i[s]-1]++<<h,f=u|(1<<h)-1;u<=f;++u)a[ja[u]>>c]=l}else for(a=new Je(n),s=0;s<n;++s)i[s]&&(a[s]=ja[o[i[s]-1]++]>>15-i[s]);return a}),xi=new xe(288);for(var le=0;le<144;++le)xi[le]=8;for(var le=144;le<256;++le)xi[le]=9;for(var le=256;le<280;++le)xi[le]=7;for(var le=280;le<288;++le)xi[le]=8;var Bs=new xe(32);for(var le=0;le<32;++le)Bs[le]=5;var Lx=Nn(xi,9,0),Ix=Nn(xi,9,1),Dx=Nn(Bs,5,0),Ux=Nn(Bs,5,1),Vo=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},un=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},Ho=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},Ec=function(i){return(i+7)/8|0},$s=function(i,t,e){return(t==null||t<0)&&(t=0),(e==null||e>i.length)&&(e=i.length),new xe(i.subarray(t,e))},Nx=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Fe=function(i,t,e){var n=new Error(t||Nx[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Fe),!e)throw n;return n},Fx=function(i,t,e,n){var s=i.length,r=n?n.length:0;if(!s||t.f&&!t.l)return e||new xe(0);var o=!e,a=o||t.i!=2,c=t.i;o&&(e=new xe(s*3));var l=function(Et){var Qt=e.length;if(Et>Qt){var Ot=new xe(Math.max(Qt*2,Et));Ot.set(e),e=Ot}},h=t.f||0,u=t.p||0,f=t.b||0,d=t.l,g=t.d,v=t.m,m=t.n,p=s*8;do{if(!d){h=un(i,u,1);var _=un(i,u+1,3);if(u+=3,_)if(_==1)d=Ix,g=Ux,v=9,m=5;else if(_==2){var b=un(i,u,31)+257,A=un(i,u+10,15)+4,x=b+un(i,u+5,31)+1;u+=14;for(var T=new xe(x),P=new xe(19),R=0;R<A;++R)P[Za[R]]=un(i,u+R*3,7);u+=A*3;for(var L=Vo(P),V=(1<<L)-1,B=Nn(P,L,1),R=0;R<x;){var U=B[un(i,u,V)];u+=U&15;var y=U>>4;if(y<16)T[R++]=y;else{var k=0,O=0;for(y==16?(O=3+un(i,u,3),u+=2,k=T[R-1]):y==17?(O=3+un(i,u,7),u+=3):y==18&&(O=11+un(i,u,127),u+=7);O--;)T[R++]=k}}var $=T.subarray(0,b),Z=T.subarray(b);v=Vo($),m=Vo(Z),d=Nn($,v,1),g=Nn(Z,m,1)}else Fe(1);else{var y=Ec(u)+4,M=i[y-4]|i[y-3]<<8,w=y+M;if(w>s){c&&Fe(0);break}a&&l(f+M),e.set(i.subarray(y,w),f),t.b=f+=M,t.p=u=w*8,t.f=h;continue}if(u>p){c&&Fe(0);break}}a&&l(f+131072);for(var it=(1<<v)-1,Q=(1<<m)-1,rt=u;;rt=u){var k=d[Ho(i,u)&it],bt=k>>4;if(u+=k&15,u>p){c&&Fe(0);break}if(k||Fe(2),bt<256)e[f++]=bt;else if(bt==256){rt=u,d=null;break}else{var Ft=bt-254;if(bt>264){var R=bt-257,wt=Jr[R];Ft=un(i,u,(1<<wt)-1)+Bu[R],u+=wt}var q=g[Ho(i,u)&Q],st=q>>4;q||Fe(3),u+=q&15;var Z=Px[st];if(st>3){var wt=jr[st];Z+=Ho(i,u)&(1<<wt)-1,u+=wt}if(u>p){c&&Fe(0);break}a&&l(f+131072);var nt=f+Ft;if(f<Z){var yt=r-Z,Dt=Math.min(Z,nt);for(yt+f<0&&Fe(3);f<Dt;++f)e[f]=n[yt+f]}for(;f<nt;++f)e[f]=e[f-Z]}}t.l=d,t.p=rt,t.b=f,t.f=h,d&&(h=1,t.m=v,t.d=g,t.n=m)}while(!h);return f!=e.length&&o?$s(e,0,f):e.subarray(0,f)},Wn=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8},ws=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8,i[n+2]|=e>>16},Go=function(i,t){for(var e=[],n=0;n<i.length;++n)i[n]&&e.push({s:n,f:i[n]});var s=e.length,r=e.slice();if(!s)return{t:Hu,l:0};if(s==1){var o=new xe(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(w,b){return w.f-b.f}),e.push({s:-1,f:25001});var a=e[0],c=e[1],l=0,h=1,u=2;for(e[0]={s:-1,f:a.f+c.f,l:a,r:c};h!=s-1;)a=e[e[l].f<e[u].f?l++:u++],c=e[l!=h&&e[l].f<e[u].f?l++:u++],e[h++]={s:-1,f:a.f+c.f,l:a,r:c};for(var f=r[0].s,n=1;n<s;++n)r[n].s>f&&(f=r[n].s);var d=new Je(f+1),g=Qa(e[h-1],d,0);if(g>t){var n=0,v=0,m=g-t,p=1<<m;for(r.sort(function(b,A){return d[A.s]-d[b.s]||b.f-A.f});n<s;++n){var _=r[n].s;if(d[_]>t)v+=p-(1<<g-d[_]),d[_]=t;else break}for(v>>=m;v>0;){var y=r[n].s;d[y]<t?v-=1<<t-d[y]++-1:++n}for(;n>=0&&v;--n){var M=r[n].s;d[M]==t&&(--d[M],++v)}g=t}return{t:new xe(d),l:g}},Qa=function(i,t,e){return i.s==-1?Math.max(Qa(i.l,t,e+1),Qa(i.r,t,e+1)):t[i.s]=e},rh=function(i){for(var t=i.length;t&&!i[--t];);for(var e=new Je(++t),n=0,s=i[0],r=1,o=function(c){e[n++]=c},a=1;a<=t;++a)if(i[a]==s&&a!=t)++r;else{if(!s&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(s),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(s);r=1,s=i[a]}return{c:e.subarray(0,n),n:t}},Es=function(i,t){for(var e=0,n=0;n<t.length;++n)e+=i[n]*t[n];return e},Vu=function(i,t,e){var n=e.length,s=Ec(t+2);i[s]=n&255,i[s+1]=n>>8,i[s+2]=i[s]^255,i[s+3]=i[s+1]^255;for(var r=0;r<n;++r)i[s+r+4]=e[r];return(s+4+n)*8},oh=function(i,t,e,n,s,r,o,a,c,l,h){Wn(t,h++,e),++s[256];for(var u=Go(s,15),f=u.t,d=u.l,g=Go(r,15),v=g.t,m=g.l,p=rh(f),_=p.c,y=p.n,M=rh(v),w=M.c,b=M.n,A=new Je(19),x=0;x<_.length;++x)++A[_[x]&31];for(var x=0;x<w.length;++x)++A[w[x]&31];for(var T=Go(A,7),P=T.t,R=T.l,L=19;L>4&&!P[Za[L-1]];--L);var V=l+5<<3,B=Es(s,xi)+Es(r,Bs)+o,U=Es(s,f)+Es(r,v)+o+14+3*L+Es(A,P)+2*A[16]+3*A[17]+7*A[18];if(c>=0&&V<=B&&V<=U)return Vu(t,h,i.subarray(c,c+l));var k,O,$,Z;if(Wn(t,h,1+(U<B)),h+=2,U<B){k=Nn(f,d,0),O=f,$=Nn(v,m,0),Z=v;var it=Nn(P,R,0);Wn(t,h,y-257),Wn(t,h+5,b-1),Wn(t,h+10,L-4),h+=14;for(var x=0;x<L;++x)Wn(t,h+3*x,P[Za[x]]);h+=3*L;for(var Q=[_,w],rt=0;rt<2;++rt)for(var bt=Q[rt],x=0;x<bt.length;++x){var Ft=bt[x]&31;Wn(t,h,it[Ft]),h+=P[Ft],Ft>15&&(Wn(t,h,bt[x]>>5&127),h+=bt[x]>>12)}}else k=Lx,O=xi,$=Dx,Z=Bs;for(var x=0;x<a;++x){var wt=n[x];if(wt>255){var Ft=wt>>18&31;ws(t,h,k[Ft+257]),h+=O[Ft+257],Ft>7&&(Wn(t,h,wt>>23&31),h+=Jr[Ft]);var q=wt&31;ws(t,h,$[q]),h+=Z[q],q>3&&(ws(t,h,wt>>5&8191),h+=jr[q])}else ws(t,h,k[wt]),h+=O[wt]}return ws(t,h,k[256]),h+O[256]},Ox=new wc([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Hu=new xe(0),kx=function(i,t,e,n,s,r){var o=r.z||i.length,a=new xe(n+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(n,a.length-s),l=r.l,h=(r.r||0)&7;if(t){h&&(c[0]=r.r>>3);for(var u=Ox[t-1],f=u>>13,d=u&8191,g=(1<<e)-1,v=r.p||new Je(32768),m=r.h||new Je(g+1),p=Math.ceil(e/3),_=2*p,y=function(Kt){return(i[Kt]^i[Kt+1]<<p^i[Kt+2]<<_)&g},M=new wc(25e3),w=new Je(288),b=new Je(32),A=0,x=0,T=r.i||0,P=0,R=r.w||0,L=0;T+2<o;++T){var V=y(T),B=T&32767,U=m[V];if(v[B]=U,m[V]=B,R<=T){var k=o-T;if((A>7e3||P>24576)&&(k>423||!l)){h=oh(i,c,0,M,w,b,x,P,L,T-L,h),P=A=x=0,L=T;for(var O=0;O<286;++O)w[O]=0;for(var O=0;O<30;++O)b[O]=0}var $=2,Z=0,it=d,Q=B-U&32767;if(k>2&&V==y(T-Q))for(var rt=Math.min(f,k)-1,bt=Math.min(32767,T),Ft=Math.min(258,k);Q<=bt&&--it&&B!=U;){if(i[T+$]==i[T+$-Q]){for(var wt=0;wt<Ft&&i[T+wt]==i[T+wt-Q];++wt);if(wt>$){if($=wt,Z=Q,wt>rt)break;for(var q=Math.min(Q,wt-2),st=0,O=0;O<q;++O){var nt=T-Q+O&32767,yt=v[nt],Dt=nt-yt&32767;Dt>st&&(st=Dt,U=nt)}}}B=U,U=v[B],Q+=B-U&32767}if(Z){M[P++]=268435456|Ja[$]<<18|sh[Z];var Et=Ja[$]&31,Qt=sh[Z]&31;x+=Jr[Et]+jr[Qt],++w[257+Et],++b[Qt],R=T+$,++A}else M[P++]=i[T],++w[i[T]]}}for(T=Math.max(T,R);T<o;++T)M[P++]=i[T],++w[i[T]];h=oh(i,c,l,M,w,b,x,P,L,T-L,h),l||(r.r=h&7|c[h/8|0]<<3,h-=7,r.h=m,r.p=v,r.i=T,r.w=R)}else{for(var T=r.w||0;T<o+l;T+=65535){var Ot=T+65535;Ot>=o&&(c[h/8|0]=l,Ot=o),h=Vu(c,h+1,i.subarray(T,Ot))}r.i=o}return $s(a,0,n+Ec(h)+s)},Bx=(function(){for(var i=new Int32Array(256),t=0;t<256;++t){for(var e=t,n=9;--n;)e=(e&1&&-306674912)^e>>>1;i[t]=e}return i})(),zx=function(){var i=-1;return{p:function(t){for(var e=i,n=0;n<t.length;++n)e=Bx[e&255^t[n]]^e>>>8;i=e},d:function(){return~i}}},Vx=function(i,t,e,n,s){if(!s&&(s={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),o=new xe(r.length+i.length);o.set(r),o.set(i,r.length),i=o,s.w=r.length}return kx(i,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+t.mem,e,n,s)},Gu=function(i,t){var e={};for(var n in i)e[n]=i[n];for(var n in t)e[n]=t[n];return e},Rn=function(i,t){return i[t]|i[t+1]<<8},sn=function(i,t){return(i[t]|i[t+1]<<8|i[t+2]<<16|i[t+3]<<24)>>>0},Wo=function(i,t){return sn(i,t)+sn(i,t+4)*4294967296},Pe=function(i,t,e){for(;e;++t)i[t]=e,e>>>=8};function Hx(i,t){return Vx(i,t||{},0,0)}function Gx(i,t){return Fx(i,{i:2},t&&t.out,t&&t.dictionary)}var Wu=function(i,t,e,n){for(var s in i){var r=i[s],o=t+s,a=n;Array.isArray(r)&&(a=Gu(n,r[1]),r=r[0]),ArrayBuffer.isView(r)?e[o]=[r,a]:(e[o+="/"]=[new xe(0),a],Wu(r,o,e,n))}},ah=typeof TextEncoder<"u"&&new TextEncoder,tc=typeof TextDecoder<"u"&&new TextDecoder,Wx=0;try{tc.decode(Hu,{stream:!0}),Wx=1}catch{}var Xx=function(i){for(var t="",e=0;;){var n=i[e++],s=(n>127)+(n>223)+(n>239);if(e+s>i.length)return{s:t,r:$s(i,e-1)};s?s==3?(n=((n&15)<<18|(i[e++]&63)<<12|(i[e++]&63)<<6|i[e++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):s&1?t+=String.fromCharCode((n&31)<<6|i[e++]&63):t+=String.fromCharCode((n&15)<<12|(i[e++]&63)<<6|i[e++]&63):t+=String.fromCharCode(n)}};function ch(i,t){var e;if(ah)return ah.encode(i);for(var n=i.length,s=new xe(i.length+(i.length>>1)),r=0,o=function(l){s[r++]=l},e=0;e<n;++e){if(r+5>s.length){var a=new xe(r+8+(n-e<<1));a.set(s),s=a}var c=i.charCodeAt(e);c<128||t?o(c):c<2048?(o(192|c>>6),o(128|c&63)):c>55295&&c<57344?(c=65536+(c&1047552)|i.charCodeAt(++e)&1023,o(240|c>>18),o(128|c>>12&63),o(128|c>>6&63),o(128|c&63)):(o(224|c>>12),o(128|c>>6&63),o(128|c&63))}return $s(s,0,r)}function $x(i,t){if(t){for(var e="",n=0;n<i.length;n+=16384)e+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return e}else{if(tc)return tc.decode(i);var s=Xx(i),r=s.s,e=s.r;return e.length&&Fe(8),r}}var qx=function(i,t){return t+30+Rn(i,t+26)+Rn(i,t+28)},Yx=function(i,t,e){var n=Rn(i,t+28),s=Rn(i,t+30),r=$x(i.subarray(t+46,t+46+n),!(Rn(i,t+8)&2048)),o=t+46+n,a=Kx(i,o,s,e,sn(i,t+20),sn(i,t+24),sn(i,t+42)),c=a[0],l=a[1],h=a[2];return[Rn(i,t+10),c,l,r,o+s+Rn(i,t+32),h]},Kx=function(i,t,e,n,s,r,o){var a=s==4294967295,c=r==4294967295,l=o==4294967295,h=t+e,u=a+c+l;if(n&&u){for(;t+4<h;t+=4+Rn(i,t+2))if(Rn(i,t)==1)return[a?Wo(i,t+4+8*c):s,c?Wo(i,t+4):r,l?Wo(i,t+4+8*(c+a)):o,1];n<2&&Fe(13)}return[s,r,o,0]},ec=function(i){var t=0;if(i)for(var e in i){var n=i[e].length;n>65535&&Fe(9),t+=n+4}return t},lh=function(i,t,e,n,s,r,o,a){var c=n.length,l=e.extra,h=a&&a.length,u=ec(l);Pe(i,t,o!=null?33639248:67324752),t+=4,o!=null&&(i[t++]=20,i[t++]=e.os),i[t]=20,t+=2,i[t++]=e.flag<<1|(r<0&&8),i[t++]=s&&8,i[t++]=e.compression&255,i[t++]=e.compression>>8;var f=new Date(e.mtime==null?Date.now():e.mtime),d=f.getFullYear()-1980;if((d<0||d>119)&&Fe(10),Pe(i,t,d<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),t+=4,r!=-1&&(Pe(i,t,e.crc),Pe(i,t+4,r<0?-r-2:r),Pe(i,t+8,e.size)),Pe(i,t+12,c),Pe(i,t+14,u),t+=16,o!=null&&(Pe(i,t,h),Pe(i,t+6,e.attrs),Pe(i,t+10,o),t+=14),i.set(n,t),t+=c,u)for(var g in l){var v=l[g],m=v.length;Pe(i,t,+g),Pe(i,t+2,m),i.set(v,t+4),t+=4+m}return h&&(i.set(a,t),t+=h),t},Zx=function(i,t,e,n,s){Pe(i,t,101010256),Pe(i,t+8,e),Pe(i,t+10,e),Pe(i,t+12,n),Pe(i,t+16,s)};function Jx(i,t){t||(t={});var e={},n=[];Wu(i,"",e,t);var s=0,r=0;for(var o in e){var a=e[o],c=a[0],l=a[1],h=l.level==0?0:8,u=ch(o),f=u.length,d=l.comment,g=d&&ch(d),v=g&&g.length,m=ec(l.extra);f>65535&&Fe(11);var p=h?Hx(c,l):c,_=p.length,y=zx();y.p(c),n.push(Gu(l,{size:c.length,crc:y.d(),c:p,f:u,m:g,u:f!=o.length||g&&d.length!=v,o:s,compression:h})),s+=30+f+m+_,r+=76+2*(f+m)+(v||0)+_}for(var M=new xe(r+22),w=s,b=r-s,A=0;A<n.length;++A){var u=n[A];lh(M,u.o,u,u.f,u.u,u.c.length);var x=30+u.f.length+ec(u.extra);M.set(u.c,u.o+x),lh(M,s,u,u.f,u.u,u.c.length,u.o,u.m),s+=16+x+(u.m?u.m.length:0)}return Zx(M,s,n.length,b,w),M}function jx(i,t){for(var e={},n=i.length-22;sn(i,n)!=101010256;--n)(!n||i.length-n>65558)&&Fe(13);var s=Rn(i,n+8);if(!s)return{};var r=sn(i,n+16),o=sn(i,n-20)==117853008;if(o){var a=sn(i,n-12);o=sn(i,a)==101075792,o&&(s=sn(i,a+32),r=sn(i,a+48))}for(var c=0;c<s;++c){var l=Yx(i,r,o),h=l[0],u=l[1],f=l[2],d=l[3],g=l[4],v=l[5],m=qx(i,v);r=g,h?h==8?e[d]=Gx(i.subarray(m,m+u),{out:new xe(f)}):Fe(14,"unknown compression type "+h):e[d]=$s(i,m,m+u)}return e}const Xr=1,hh=new TextEncoder,uh=new TextDecoder;function fh(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function dh(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Qx(i,t={}){const e={},n=new Date().toISOString(),s={objects:i.objects.map(o=>{e[`meshes/${o.id}.bin`]=Cx(o.mesh);for(const a of o.multires)e[`multires/${o.id}/L${a.level}.bin`]=fh(a.delta);for(const a of o.sculptLayers)e[`layers/${o.id}/${a.id}.bin`]=fh(a.delta);return{id:o.id,name:o.name,kind:o.kind,parametric:o.parametric,params:o.params,transform:o.transform,visible:o.visible,activeLevel:o.activeLevel,exportedTopologyHash:o.exportedTopologyHash,multires:o.multires.map(a=>({level:a.level,count:a.delta.length})),sculptLayers:o.sculptLayers.map(a=>({id:a.id,name:a.name,level:a.level,weight:a.weight,visible:a.visible,count:a.delta.length})),paintLayers:o.paintLayers,uv:o.uv?hx(o.uv):null}}),settings:i.settings,cameraBookmarks:i.cameraBookmarks},r={formatVersion:Xr,app:"macbeth",appVersion:t.appVersion??"0.1.0",created:n,modified:n};if(t.thumbnail&&(e["thumbnail.png"]=t.thumbnail,r.thumbnail="thumbnail.png"),t.extraFiles)for(const[o,a]of t.extraFiles)e[o]=a;return e["manifest.json"]=hh.encode(JSON.stringify(r,null,2)),e["scene.json"]=hh.encode(JSON.stringify(s)),Jx(e,{level:6})}const t_={};function e_(i,t,e){let n=i;for(let s=e;s<Xr;s++){const r=t_[s];if(!r)throw new Error(`版 ${s} から ${s+1} への変換がありません`);n=r(n,t)}return n}function n_(i){const t=jx(i),e=t["manifest.json"];if(!e)throw new Error("manifest.json がありません。macbeth のプロジェクトではないようです");const n=JSON.parse(uh.decode(e));if(n.formatVersion>Xr)throw new Error(`このプロジェクトは新しい版 (v${n.formatVersion}) で保存されています。アプリを更新してください`);let s=JSON.parse(uh.decode(t["scene.json"]));n.formatVersion<Xr&&(s=e_(s,t,n.formatVersion));const r=new Uu;r.settings=s.settings??{},r.cameraBookmarks=s.cameraBookmarks??[];const o=new Set(["manifest.json","scene.json"]);for(const c of s.objects){const l=new Ya(c.kind,c.id,c.name);l.parametric=c.parametric,l.params=c.params,l.transform=c.transform??Du(),l.visible=c.visible??!0,l.activeLevel=c.activeLevel??0,l.exportedTopologyHash=c.exportedTopologyHash??null;const h=`meshes/${c.id}.bin`,u=t[h];if(!u)throw new Error(`${c.name} のメッシュ (${h}) がありません`);l.mesh=Rx(u),o.add(h),l.multires=(c.multires??[]).map(f=>{const d=`multires/${c.id}/L${f.level}.bin`,g=t[d];return g?(o.add(d),{level:f.level,delta:dh(g)}):null}).filter(f=>f!==null),l.sculptLayers=(c.sculptLayers??[]).map(f=>{const d=`layers/${c.id}/${f.id}.bin`,g=t[d];return g?(o.add(d),{id:f.id,name:f.name,level:f.level,weight:f.weight,visible:f.visible,delta:dh(g)}):null}).filter(f=>f!==null),l.paintLayers=c.paintLayers??[],l.uv=ux(c.uv),r.objects.push(l)}r.syncIdCounter();const a=new Map;for(const[c,l]of Object.entries(t))o.has(c)||a.set(c,l);return{document:r,manifest:n,extraFiles:a}}function AM(i,t){return Iu(i.mesh)===t}function Er(i){let t=0,e=0;for(const o of i.values())t+=o.x,e+=o.y;const n=i.size||1;t/=n,e/=n;let s=0;const r=new Map;for(const[o,a]of i)s+=Math.hypot(a.x-t,a.y-e),r.set(o,Math.atan2(a.y-e,a.x-t));return{cx:t,cy:e,spread:s/n,angles:r}}function i_(i,t){let e=0,n=0;for(const[s,r]of t.angles){const o=i.angles.get(s);if(o===void 0)continue;let a=r-o;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;e+=a,n++}return n?e/n:0}function Xu(i,t){return Math.abs(t.spread-i.spread)*2}function s_(i,t){const e=Math.abs(i_(i,t))*t.spread;return Math.hypot(t.cx-i.cx,t.cy-i.cy)+Xu(i,t)+e}const r_=5,Xo=10,o_=12,a_=120,c_=300,l_=400,h_=400,ph=3;class $u{constructor(t,e,n){this.canvas=t,this.local=e,this.h=n}pointers=new Map;gesture=null;holdTimer=null;tap={t0:0,maxN:0,moved:!1,stagger:!1,lastN:0,lastT:0};fHeld=!1;fChord=!1;fingerCam=!1;attach(){const t=this.canvas;t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("touchmove",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>this.down(e)),t.addEventListener("pointermove",e=>this.move(e)),t.addEventListener("pointerup",e=>this.up(e)),t.addEventListener("pointercancel",e=>this.cancelled(e)),t.addEventListener("pointerleave",()=>{this.pointers.size||this.h.hoverLeave()}),t.addEventListener("wheel",e=>{e.preventDefault(),this.h.dolly(1+Math.sign(e.deltaY)*.09)},{passive:!1})}touchCount(){let t=0;for(const e of this.pointers.values())e.type==="touch"&&t++;return t}down(t){try{this.canvas.setPointerCapture(t.pointerId)}catch{}if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,x0:t.clientX,y0:t.clientY,type:t.pointerType}),this.tapDown(t),this.pointers.size>=2){if(this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.h.abort(),this.cancelHold(),this.pointers.size===3&&this.touchCount()===3){const n=Er(this.pointers);this.gesture={mode:"threefinger",live:!1,acc:0,basis:n,last:n},this.startHold(3,()=>this.h.openCameraMenu(n.cx,n.cy));return}if(this.pointers.size===2){const n=Er(this.pointers);this.gesture={mode:"twofinger",live:!1,acc:0,last:n},this.touchCount()===2&&this.startHold(2,()=>this.h.openTwoFingerMenu(n.cx,n.cy)),this.fHeld&&(this.fChord=!0,this.gesture.zoomOnly=!0,this.gesture.pivot=this.h.zoomPivot()??void 0)}else this.gesture={mode:"idle"};return}const e=this.local(t);if(this.fHeld){this.fChord=!0,this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},this.h.marqueeStart(e);return}if(t.pointerType==="mouse"){if(this.h.altOn(t)){this.gesture={mode:t.button===0?"tumble":t.button===1?"pan":"dolly"};return}if(t.button===2){this.h.openMarkingMenu(t.clientX,t.clientY,this.h.shiftOn(t)),this.gesture={mode:"marking"};return}if(t.button===1){this.gesture={mode:"pan"};return}}if(t.pointerType==="touch"&&!(!this.fingerCam&&this.h.isOnMesh(e,t))){this.gesture={mode:"tumble",live:!1,acc:0},this.startMarkingHold(t);return}this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},t.pointerType!=="mouse"&&this.startMarkingHold(t),this.h.toolDown(e,t)}move(t){const e=this.pointers.get(t.pointerId);if(!e){t.buttons===0&&!this.pointers.size&&this.h.hover(this.local(t),t);return}const n=e.x,s=e.y;e.x=t.clientX,e.y=t.clientY,Math.hypot(t.clientX-e.x0,t.clientY-e.y0)>o_&&(this.tap.moved=!0,this.cancelHold());const r=this.gesture;if(r){if(r.mode==="tumble"){if(!r.live&&t.pointerType==="touch"){if(r.acc=(r.acc??0)+Math.hypot(t.clientX-n,t.clientY-s),r.acc<r_)return;r.live=!0}this.h.tumble(t.clientX-n,t.clientY-s);return}if(r.mode==="pan")return this.h.pan(t.clientX-n,t.clientY-s);if(r.mode==="dolly")return this.h.dolly(1+(t.clientX-n+(t.clientY-s))*.006);if(r.mode==="twofinger"){if(this.pointers.size<2)return;const o=Er(this.pointers),a=r.last??o;if(!r.live){if(r.acc=(r.acc??0)+s_(a,o),r.last=o,r.acc<Xo)return;r.live=!0,this.tap.moved=!0,this.cancelHold();return}const c=a.spread>1e-6&&o.spread>1e-6?a.spread/o.spread:1;r.zoomOnly&&r.pivot?this.h.dollyAbout(r.pivot,c):(this.h.dolly(c),this.h.pan(o.cx-a.cx,o.cy-a.cy)),r.last=o;return}if(r.mode==="threefinger"){if(this.pointers.size!==3)return;const o=Er(this.pointers),a=r.basis??o;if(!r.live){const l=r.fresh??=new Set;if(l.add(t.pointerId),l.size<this.pointers.size)return;l.clear(),r.last=o;const h=Xu(a,o),u=o.cx-a.cx,f=o.cy-a.cy,d=Math.hypot(u,f);if(h<Xo&&d<Xo)return;if(!this.h.transformBegin()){this.gesture={mode:"idle"};return}r.live=!0,this.tap.moved=!0,this.cancelHold(),r.delta=h>=d?{kind:"scale"}:{kind:"swipe",axis:Math.abs(f)>=Math.abs(u)?"vertical":"horizontal"},r.basis=o;return}const c=r.delta??{kind:"scale"};c.kind==="scale"?this.h.transformUpdate({kind:"scale",scale:a.spread>1e-6?o.spread/a.spread:1}):this.h.transformUpdate({kind:"swipe",axis:c.axis,pixels:c.axis==="vertical"?o.cy-a.cy:o.cx-a.cx});return}if(r.mode==="tool"){const o=this.local(t);(Math.abs(o.x-(r.sx??0))>ph||Math.abs(o.y-(r.sy??0))>ph)&&(r.moved=!0),this.h.toolMove(o,t)}}}up(t){this.cancelHold();const e=this.gesture;e?.mode==="threefinger"&&e.live&&this.h.transformEnd();const n=e?.mode==="tool",s=n&&!!e?.moved;this.pointers.delete(t.pointerId),n&&this.h.toolUp(this.local(t),t,s),this.pointers.size===0?(this.gesture=null,this.tapUp(t)):this.gesture={mode:"idle"}}cancelled(t){this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.pointers.delete(t.pointerId),this.cancelHold(),this.h.abort(),this.pointers.size?this.gesture={mode:"idle"}:(this.gesture=null,this.tap.lastN=0)}tapDown(t){if(t.pointerType!=="touch")return;const e=performance.now(),n=this.touchCount();n===1?(this.tap.t0=e,this.tap.maxN=1,this.tap.moved=!1,this.tap.stagger=!1):(this.tap.maxN=Math.max(this.tap.maxN,n),e-this.tap.t0>a_&&(this.tap.stagger=!0))}tapUp(t){if(t.pointerType!=="touch")return;const e=performance.now();if(!(!this.tap.moved&&!this.tap.stagger&&e-this.tap.t0<c_&&this.tap.maxN>=2)){this.tap.lastN=0;return}this.tap.lastN===this.tap.maxN&&e-this.tap.lastT<l_?(this.tap.lastN=0,this.tap.maxN===2?this.h.undo():this.h.redo(),navigator.vibrate?.(8)):(this.tap.lastN=this.tap.maxN,this.tap.lastT=e)}startMarkingHold(t){const e=this.h.shiftOn(t),{clientX:n,clientY:s}=t;this.startHold(1,()=>this.h.openMarkingMenu(n,s,e))}startHold(t,e){this.cancelHold(),this.holdTimer=setTimeout(()=>{this.pointers.size===t&&(this.h.abort(),this.gesture=null,e())},h_)}cancelHold(){this.holdTimer!==null&&clearTimeout(this.holdTimer),this.holdTimer=null}}const mh=new fu,u_=new I;class f_{constructor(t,e){this.viewport=t,this.container=e}get width(){return this.container.clientWidth||1}get height(){return this.container.clientHeight||1}local(t){const e=this.container.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}ndc(t){return new Xt(t.x/this.width*2-1,-(t.y/this.height*2-1))}project(t,e,n,s){t.group.updateMatrixWorld();const r=u_.set(e,n,s).applyMatrix4(t.group.matrixWorld).project(this.viewport.camera);return{x:(r.x+1)/2*this.width,y:(-r.y+1)/2*this.height,z:r.z}}projectVertex(t,e){const n=t.object.mesh.positions;return this.project(t,n[e*3],n[e*3+1],n[e*3+2])}pickSurface(t,e){mh.setFromCamera(this.ndc(t),this.viewport.camera);const n=this.viewport.allViews().filter(l=>l.object.visible&&(!e||l.object!==e)),r=mh.intersectObjects(n.map(l=>l.surface),!1)[0];if(!r)return null;const o=n.find(l=>l.surface===r.object);if(!o)return null;const a=r.faceIndex??0,c=o.tri.triToFace[a]??0;return{object:o.object,view:o,face:c,point:r.point.clone(),distance:r.distance}}pickVertex(t,e,n){let s=-1,r=n*n;const o=t.object.mesh.vertexCount;for(let a=0;a<o;a++){const c=this.projectVertex(t,a);if(c.z>1)continue;const l=(c.x-e.x)**2+(c.y-e.y)**2;l<r&&(r=l,s=a)}return s}pickVertexExcept(t,e,n,s){let r=-1,o=n*n;const a=t.object.mesh.vertexCount;for(let c=0;c<a;c++){if(c===s)continue;const l=this.projectVertex(t,c);if(l.z>1)continue;const h=(l.x-e.x)**2+(l.y-e.y)**2;h<o&&(o=h,r=c)}return r}pickEdge(t,e,n){let s=-1,r=n,o=.5;for(let a=0;a<t.edges.length;a++){const[c,l]=t.edges[a],h=this.projectVertex(t,c),u=this.projectVertex(t,l);if(h.z>1&&u.z>1)continue;const f=u.x-h.x,d=u.y-h.y,g=f*f+d*d,v=g?Math.max(0,Math.min(1,((e.x-h.x)*f+(e.y-h.y)*d)/g)):0,m=Math.hypot(h.x+f*v-e.x,h.y+d*v-e.y);m<r&&(r=m,s=a,o=v)}return{edge:s,t:o}}vertsInRect(t,e,n,s,r){const o={x:Math.min(e,s),y:Math.min(n,r)},a={x:Math.max(e,s),y:Math.max(n,r)},c=[],l=t.object.mesh.vertexCount;for(let h=0;h<l;h++){const u=this.projectVertex(t,h);u.z<=1&&u.x>=o.x&&u.x<=a.x&&u.y>=o.y&&u.y<=a.y&&c.push(h)}return c}}const Tr=[14176847,7129418,5214176];let Ts=null;function d_(){if(!Ts){const e=document.createElement("canvas");e.width=512,e.height=512;const n=e.getContext("2d"),s=512/16;for(let r=0;r<16;r++)for(let o=0;o<16;o++)n.fillStyle=(o+r)%2===0?"#d7dde3":"#7d8891",n.fillRect(o*s,r*s,s,s);n.fillStyle="#e0723c",n.fillRect(0,512-s,s,s),Ts=new ou(e),Ts.wrapS=Ui,Ts.wrapT=Ui}return new lu({map:Ts,specular:1712166,shininess:14,side:Ve})}const Ye={surf:new lu({color:10134701,specular:2765112,shininess:24,side:Ve}),wire:new Oe({color:1317407,transparent:!0,opacity:.9}),wireSel:new Oe({color:5111629}),wireComp:new Oe({color:4608605}),vert:new xn({color:9134e3,size:6,sizeAttenuation:!1}),vertSel:new xn({color:16752128,size:11,sizeAttenuation:!1}),edgeSel:new Oe({color:16752128}),faceSel:new vn({color:16752128,transparent:!0,opacity:.5,side:Ve,depthWrite:!1}),softPt:new xn({color:13658666,size:7,sizeAttenuation:!1}),cutLine:new Oe({color:16769354}),cutPt:new xn({color:16769354,size:9,sizeAttenuation:!1}),pivot:new Oe({color:15915386})};function qu(i,t,e){const n=i.faceNormals(),s=i.vertexFaces(),r=Math.cos(e*Math.PI/180)-1e-4,o=t.tri.length,a=new Float32Array(o*3),c=new Float32Array(o*3);for(let u=0;u<o;u+=3){const f=t.triToFace[u/3],d=n[f*3],g=n[f*3+1],v=n[f*3+2];for(let m=0;m<3;m++){const p=t.tri[u+m],_=(u+m)*3;a[_]=i.positions[p*3],a[_+1]=i.positions[p*3+1],a[_+2]=i.positions[p*3+2];let y=0,M=0,w=0;for(const A of s.get(p)??[]){const x=n[A*3],T=n[A*3+1],P=n[A*3+2];x*d+T*g+P*v>=r&&(y+=x,M+=T,w+=P)}const b=Math.hypot(y,M,w)||1;c[_]=y/b,c[_+1]=M/b,c[_+2]=w/b}}const l=new he;l.setAttribute("position",new jt(a,3)),l.setAttribute("normal",new jt(c,3));const h=i.uvSets.get("map1");if(h){const u=new Float32Array(o*2);let f=-1,d=0;for(let g=0;g<o;g+=3){const v=t.triToFace[g/3];v!==f&&(f=v,d=0);const m=[0,d+1,d+2];for(let p=0;p<3;p++){const _=i.faceOffsets[v]+m[p];u[(g+p)*2]=h[_*2]??0,u[(g+p)*2+1]=h[_*2+1]??0}d++}l.setAttribute("uv",new jt(u,2))}return l}function Yu(i,t){const e=new Float32Array(t.length*6);for(let s=0;s<t.length;s++){const[r,o]=t[s];e[s*6]=i.positions[r*3],e[s*6+1]=i.positions[r*3+1],e[s*6+2]=i.positions[r*3+2],e[s*6+3]=i.positions[o*3],e[s*6+4]=i.positions[o*3+1],e[s*6+5]=i.positions[o*3+2]}const n=new he;return n.setAttribute("position",new jt(e,3)),n}function Ze(i){const t=new he;return t.setAttribute("position",new jt(Float32Array.from(i),3)),t}function on(i,t){return i.position.set(t.position[0],t.position[1],t.position[2]),i.quaternion.set(t.rotation[0],t.rotation[1],t.rotation[2],t.rotation[3]),i.scale.set(t.scale[0],t.scale[1],t.scale[2]),i}function p_(i,t){const e=new pn;on(e,i.transform);const n=i.mesh.triangulate(),s=i.mesh.edges(),r=new ye(qu(i.mesh,n,t),Ye.surf);r.userData.objectId=i.id,e.add(r);const o=new mi(Yu(i.mesh,s),Ye.wire);e.add(o);const a=new _n(Ze(i.mesh.positions),Ye.vert);return e.add(a),e.updateMatrixWorld(),{object:i,group:e,surface:r,wire:o,points:a,tri:n,edges:s}}function cs(i){i.traverse(t=>{const e=t.geometry;e&&e.dispose()})}const Is={persp:{label:"パース",sub:"Persp",theta:.72,phi:1.12,ortho:!1},top:{label:"上",sub:"Top",theta:0,phi:.001,ortho:!0},bottom:{label:"下",sub:"Bottom",theta:0,phi:Math.PI-.001,ortho:!0},front:{label:"前",sub:"Front",theta:0,phi:Math.PI/2,ortho:!0},back:{label:"後",sub:"Back",theta:Math.PI,phi:Math.PI/2,ortho:!0},right:{label:"右",sub:"Right",theta:Math.PI/2,phi:Math.PI/2,ortho:!0},left:{label:"左",sub:"Left",theta:-Math.PI/2,phi:Math.PI/2,ortho:!0}},gh=.3,vh=140;class m_{constructor(t,e,n){this.container=t,this.state=n,this.renderer=new Su({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene.add(this.root,this.overlay,this.manip,this.preview,this.preselect),this.addLights(),this.addGrid(),this.applyCamera()}renderer;scene=new za;persp=new rn(45,1,.05,500);ortho=new Xs(-1,1,1,-1,.05,500);camera=this.persp;root=new pn;overlay=new pn;manip=new pn;preview=new pn;preselect=new pn;cam={target:new I(0,.4,0),theta:.72,phi:1.12,distance:7.2};views=new Map;frame=0;addLights(){this.scene.add(new Sd(12371921,3356733,.85));const t=new Ml(16777215,.72);t.position.set(3,6,4);const e=new Ml(10466502,.28);e.position.set(-4,2,-3),this.scene.add(t,e)}addGrid(){const t=new Ad(24,24,7174272,4936796),e=t.material;e.transparent=!0,e.opacity=.55,this.scene.add(t);const n=(s,r)=>{const o=new he;o.setAttribute("position",new jt(s,3)),this.scene.add(new Gs(o,new Oe({color:r})))};n([-12,0,0,12,0,0],12610154),n([0,0,-12,0,0,12],6982336)}applyCamera(){const{cam:t}=this,e=Math.sin(t.phi),n=t.target.x+t.distance*e*Math.sin(t.theta),s=t.target.y+t.distance*Math.cos(t.phi),r=t.target.z+t.distance*e*Math.cos(t.theta),o=this.state.camOpts;this.persp.position.set(n,s,r),this.persp.lookAt(t.target),this.persp.near=o.near,this.persp.far=o.far,this.persp.setFocalLength(o.focal),this.ortho.position.set(n,s,r),this.ortho.lookAt(t.target);const a=(this.container.clientWidth||1)/(this.container.clientHeight||1),c=t.distance*.42;this.ortho.left=-c*a,this.ortho.right=c*a,this.ortho.top=c,this.ortho.bottom=-c,this.ortho.near=o.near,this.ortho.far=o.far,this.ortho.updateProjectionMatrix(),this.camera=o.ortho?this.ortho:this.persp}setView(t){const e=Is[t];this.cam.theta=e.theta,this.cam.phi=e.phi,this.state.camOpts.ortho=e.ortho,this.applyCamera()}tumble(t,e){this.cam.theta-=t*.0088,this.cam.phi=Math.max(.05,Math.min(Math.PI-.05,this.cam.phi-e*.0088)),this.applyCamera()}pan(t,e){const n=new I().setFromMatrixColumn(this.camera.matrix,0),s=new I().setFromMatrixColumn(this.camera.matrix,1),r=this.cam.distance*.0016;this.cam.target.addScaledVector(n,-t*r).addScaledVector(s,e*r),this.applyCamera()}dolly(t){this.cam.distance=Math.max(gh,Math.min(vh,this.cam.distance*t)),this.applyCamera()}dollyAbout(t,e){const n=Math.max(gh,Math.min(vh,this.cam.distance*e)),s=n/this.cam.distance;this.cam.target.sub(t).multiplyScalar(s).add(t),this.cam.distance=n,this.applyCamera()}frameSelected(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;let e=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0],s=!1;for(const o of t){const a=this.views.get(o.id);if(!a)continue;const c=o.mesh.positions;for(let l=0;l<o.mesh.vertexCount;l++){const h=new I(c[l*3],c[l*3+1],c[l*3+2]).applyMatrix4(a.group.matrixWorld);e=[Math.min(e[0],h.x),Math.min(e[1],h.y),Math.min(e[2],h.z)],n=[Math.max(n[0],h.x),Math.max(n[1],h.y),Math.max(n[2],h.z)],s=!0}}if(!s)return;this.cam.target.set((e[0]+n[0])/2,(e[1]+n[1])/2,(e[2]+n[2])/2);const r=Math.max(n[0]-e[0],n[1]-e[1],n[2]-e[2]);this.cam.distance=Math.max(1.4,r*2.4),this.applyCamera()}viewOf(t){return this.views.get(t.id)}allViews(){return[...this.views.values()]}rebuildObject(t){const e=this.views.get(t.id);e&&(this.root.remove(e.group),cs(e.group));const n=p_(t,this.shadingAngle);this.root.add(n.group),this.views.set(t.id,n),this.applyDisplay(n)}syncAll(){const t=new Set(this.state.doc.objects.map(e=>e.id));for(const[e,n]of this.views)t.has(e)||(this.root.remove(n.group),cs(n.group),this.views.delete(e));for(const e of this.state.doc.objects)this.rebuildObject(e);this.rebuildOverlay()}get shadingAngle(){return this.state.display==="shaded"?0:this.state.smoothAngle}refreshPositions(t){const e=this.views.get(t.id);if(!e)return this.rebuildObject(t);on(e.group,t.transform),e.group.updateMatrixWorld(),e.surface.geometry.dispose(),e.surface.geometry=qu(t.mesh,e.tri,this.shadingAngle),e.wire.geometry.dispose(),e.wire.geometry=Yu(t.mesh,e.edges),e.points.geometry.dispose(),e.points.geometry=Ze(t.mesh.positions)}applyDisplay(t){const e=this.state.display,n=t.object===this.state.selected||this.state.also.has(t.object);t.surface.visible=e!=="wire",t.surface.material=e==="checker"?t.checker??=d_():Ye.surf,t.wire.visible=e==="wire"||e==="shadedWire"||n,t.wire.material=n?this.state.compMode==="object"?Ye.wireSel:Ye.wireComp:Ye.wire,t.points.visible=n&&this.state.compMode==="vertex",t.group.visible=t.object.visible}applyDisplayAll(){for(const t of this.views.values())this.applyDisplay(t)}softWeightsProvider=null;rebuildOverlay(){for(const s of this.overlay.children.slice())this.overlay.remove(s),cs(s);const t=this.state.selected,e=t?this.views.get(t.id):void 0;if(!t||!e||!this.state.comp.size)return;const n=t.mesh;if(this.state.soft.strength>0&&this.state.compMode!=="object"&&this.softWeightsProvider){const s=[];for(const[r,o]of this.softWeightsProvider())o>.02&&o<.999&&s.push(n.positions[r*3],n.positions[r*3+1],n.positions[r*3+2]);if(s.length){const r=new _n(Ze(s),Ye.softPt);on(r,t.transform).renderOrder=2,this.overlay.add(r)}}if(this.state.compMode==="vertex"){const s=[];for(const o of this.state.comp)s.push(n.positions[o*3],n.positions[o*3+1],n.positions[o*3+2]);const r=new _n(Ze(s),Ye.vertSel);on(r,t.transform).renderOrder=4,this.overlay.add(r)}else if(this.state.compMode==="edge"){const s=[];for(const o of this.state.comp){const a=e.edges[o];a&&(s.push(n.positions[a[0]*3],n.positions[a[0]*3+1],n.positions[a[0]*3+2]),s.push(n.positions[a[1]*3],n.positions[a[1]*3+1],n.positions[a[1]*3+2]))}const r=new mi(Ze(s),Ye.edgeSel);on(r,t.transform).renderOrder=4,this.overlay.add(r)}else if(this.state.compMode==="face"){const s=[],r=[];for(const c of this.state.comp){if(c>=n.faceCount)continue;const l=n.faceVerts(c),h=s.length/3;for(const u of l)s.push(n.positions[u*3],n.positions[u*3+1],n.positions[u*3+2]);for(let u=1;u<l.length-1;u++)r.push(h,h+u,h+u+1)}const o=Ze(s);o.setIndex(r);const a=new ye(o,Ye.faceSel);on(a,t.transform).renderOrder=4,this.overlay.add(a)}}resize(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.persp.aspect=t/e,this.persp.updateProjectionMatrix(),this.applyCamera()}start(){const t=()=>{this.frame=requestAnimationFrame(t),this.renderer.render(this.scene,this.camera)};t()}stop(){cancelAnimationFrame(this.frame)}}const Kn=[new I(1,0,0),new I(0,1,0),new I(0,0,1)],xh=3,_h=13,Mh=23,Tc=30,g_=40;function nc(i){return i<0?null:i===Tc||i<10?"move":i<20?"rotate":"scale"}const v_=1.8,Ti=16770688,yh=14862432;function Sh(i){const t=i==="all";return{move:t||i==="move",rotate:t||i==="rotate",scale:t||i==="scale",arrow:1,ring:t?.68:1,cube:t?1.3:1}}function bh(i,t,e,n,s=64){const r=new je().setFromUnitVectors(new I(0,0,1),t.clone().normalize()),o=[];for(let l=0;l<=s;l++){const h=l/s*Math.PI*2,u=new I(Math.cos(h)*e,Math.sin(h)*e,0).applyQuaternion(r).add(i);o.push(u.x,u.y,u.z)}const a=new he;a.setAttribute("position",new jt(o,3));const c=new Gs(a,new Oe({color:n}));return c.renderOrder=6,c}function x_(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s,o=r?Math.max(0,Math.min(1,((i.x-t.x)*n+(i.y-t.y)*s)/r)):0;return Math.hypot(t.x+n*o-i.x,t.y+s*o-i.y)}class __{constructor(t){this.host=t}group=new pn;hot=-1;signature="";toScreen(t){return this.host.toScreen(t)}scaleAt(t){const e=this.host.orthoDistance();return e!==null?e*.09:this.host.camera().position.distanceTo(t)*.15}clear(){for(const t of this.group.children.slice())this.group.remove(t),cs(t);this.signature=""}rebuild(t,e,n){if(!t){this.signature&&this.clear();return}const s=this.scaleAt(t),r=[e,this.hot,n,t.x.toFixed(3),t.y.toFixed(3),t.z.toFixed(3),s.toFixed(3)].join("|");if(r===this.signature)return;this.clear(),this.signature=r;const o=Sh(e),a=l=>this.hot===l;for(let l=0;l<3;l++){const h=Kn[l];if(o.move||o.scale){const u=h.clone().multiplyScalar((o.scale?o.cube:o.arrow)*s).add(t),f=a(l)||a(20+l)?Ti:Tr[l],d=new he;d.setAttribute("position",new jt([t.x,t.y,t.z,u.x,u.y,u.z],3));const g=new Gs(d,new Oe({color:f}));g.renderOrder=6,this.group.add(g)}if(o.move){const u=new ye(new _c(s*.075,s*.22,10),new vn({color:a(l)?Ti:Tr[l]}));u.quaternion.setFromUnitVectors(new I(0,1,0),h),u.position.copy(h.clone().multiplyScalar(o.arrow*s).add(t)),u.renderOrder=6,this.group.add(u)}if(o.scale){const u=new ye(new Fi(s*.12,s*.12,s*.12),new vn({color:a(20+l)?Ti:Tr[l]}));u.position.copy(h.clone().multiplyScalar(o.cube*s).add(t)),u.renderOrder=6,this.group.add(u)}o.rotate&&this.group.add(bh(t,h,o.ring*s,a(10+l)?Ti:Tr[l]))}if(e==="rotate"){const l=new I().subVectors(this.host.camera().position,t).normalize();this.group.add(bh(t,l,s*1.18,a(_h)?Ti:12174283))}const c=e==="scale"?new ye(new Fi(s*.14,s*.14,s*.14),new vn({color:a(Mh)?Ti:yh})):new ye(new Mc(s*.085,12,10),new vn({color:a(xh)||a(Tc)?Ti:yh}));c.position.copy(t),c.renderOrder=6,this.group.add(c)}pick(t,e,n,s=1){if(!e)return-1;const r=this.scaleAt(e),o=this.host.toScreen(e);if(Math.hypot(o.x-t.x,o.y-t.y)<16*s)return n==="scale"?Mh:xh;const a=Sh(n);let c=-1,l=1/0;const h=(u,f,d)=>{f<d&&f<l&&(l=f,c=u)};for(let u=0;u<3;u++){const f=Kn[u];if(a.scale){const d=this.host.toScreen(f.clone().multiplyScalar(a.cube*r).add(e));h(20+u,Math.hypot(d.x-t.x,d.y-t.y),16*s)}if(a.move){const d=this.host.toScreen(f.clone().multiplyScalar(.3*r).add(e)),g=this.host.toScreen(f.clone().multiplyScalar(a.arrow*r).add(e));h(u,x_(t,d,g),14*s)}}if(c>=0)return c;if(a.rotate){for(let u=0;u<3;u++)h(10+u,this.ringDistance(t,e,Kn[u],a.ring*r),12*s);if(n==="rotate"){const u=new I().subVectors(this.host.camera().position,e).normalize();h(_h,this.ringDistance(t,e,u,r*1.18),12*s)}}return c}ringDistance(t,e,n,s){const r=new je().setFromUnitVectors(new I(0,0,1),n.clone().normalize());let o=1/0;for(let a=0;a<64;a++){const c=a/64*Math.PI*2,l=new I(Math.cos(c)*s,Math.sin(c)*s,0).applyQuaternion(r).add(e),h=this.host.toScreen(l);o=Math.min(o,Math.hypot(h.x-t.x,h.y-t.y))}return o}}function ic(i,t,e){const n=new I().subVectors(t,i.origin),s=e.dot(e),r=e.dot(i.direction),o=i.direction.dot(i.direction),a=e.dot(n),c=i.direction.dot(n),l=s*o-r*r;return Math.abs(l)<1e-9?0:(r*c-o*a)/l}const M_={model:{g1:ui("強度","ソフト選択 強度",0,1,.01,"strength"),g2:ui("範囲","ソフト選択 範囲",.05,6,.05,"radius")},uv:{g1:ui("強度","ソフト選択 強度",0,1,.01,"strength"),g2:ui("範囲","ソフト選択 範囲",.05,6,.05,"radius")},sculpt:{g1:ui("強度","ブラシ強度",0,1,.01,"strength"),g2:ui("サイズ","ブラシサイズ",.05,6,.05,"radius")},material:{g1:ui("不透明","不透明度",0,1,.01,"strength"),g2:ui("サイズ","ブラシサイズ",.05,6,.05,"radius")}};function ui(i,t,e,n,s,r){return{label:i,full:t,min:e,max:n,step:s,get:o=>o.soft[r],set:(o,a)=>{o.soft[r]=a}}}class y_{doc=new Uu;selected=null;comp=new Set;also=new Set;mode="model";compMode="object";tool="select";manip="all";display="shadedWire";mods={shift:"off",ctrl:"off",alt:"off"};symX=!1;fingerCam=!1;panelsHidden=!1;soft={strength:0,radius:1};toolOpts={extrudeDist:.35};vertexOpts={mergeDist:.05,extrudeWidth:.25};snap={kind:"grid",step:.5};snapOn=!1;snapKeyHeld=!1;uvSnap={kind:"grid",step:1/8};mirrorAxis=0;cut={snapStep:0,edgeFlow:!1};bevel={width:.1,segments:1};smoothAngle=30;camOpts={focal:35,near:.05,far:500,ortho:!1};viewName="パース";get cameras(){return this.doc.cameraBookmarks}gauge(t){return M_[this.mode][t]}modOn(t){return this.mods[t]!=="off"}get snapping(){return this.snapKeyHeld||this.snapOn}activeMods(){const t=[];return this.mods.shift!=="off"&&t.push("SHF"),this.mods.ctrl!=="off"&&t.push("CTL"),this.mods.alt!=="off"&&t.push("ALT"),t}select(t){this.selected!==t&&this.comp.clear(),this.also.clear(),this.selected=t}selectedObjects(){return this.selected?[this.selected,...[...this.also].filter(t=>t!==this.selected)]:[]}addObject(t){if(!this.selected){this.selected=t;return}t!==this.selected&&(this.also.has(t)?this.also.delete(t):this.also.add(t))}}const S_=40;class b_{constructor(t){this.state=t}undoStack=[];redoStack=[];onChange=null;get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get undoLabel(){return this.undoStack.at(-1)?.label??null}get redoLabel(){return this.redoStack.at(-1)?.label??null}push(t){this.commit(t,this.snapshot())}snapshot(){return{objects:this.state.doc.objects.map(t=>({ref:t,name:t.name,kind:t.kind,parametric:t.parametric,params:{...t.params},transform:pi(t.transform),visible:t.visible,activeLevel:t.activeLevel,mesh:t.mesh.clone(),multires:t.multires.slice(),sculptLayers:t.sculptLayers.slice(),paintLayers:t.paintLayers.slice()})),selectedId:this.state.selected?.id??null,compMode:this.state.compMode,comp:[...this.state.comp]}}commit(t,e){this.undoStack.push({label:t,snap:e}),this.undoStack.length>S_&&this.undoStack.shift(),this.redoStack.length=0,this.onChange?.()}drop(){this.undoStack.pop(),this.onChange?.()}undo(){const t=this.undoStack.pop();return t?(this.redoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}redo(){const t=this.redoStack.pop();return t?(this.undoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}clear(){this.undoStack.length=0,this.redoStack.length=0,this.onChange?.()}restore(t){const e=this.state.doc;e.objects=t.objects.map(r=>{const o=r.ref;return o.name=r.name,o.kind=r.kind,o.parametric=r.parametric,o.params={...r.params},o.transform=pi(r.transform),o.visible=r.visible,o.activeLevel=r.activeLevel,o.mesh=r.mesh.clone(),o.multires=r.multires.slice(),o.sculptLayers=r.sculptLayers.slice(),o.paintLayers=r.paintLayers.slice(),o}),this.state.selected=t.selectedId?e.find(t.selectedId)??null:null,this.state.compMode=t.compMode,this.state.comp.clear();const n=this.state.selected?.mesh,s=!n||t.compMode==="object"?0:t.compMode==="vertex"?n.vertexCount:t.compMode==="face"?n.faceCount:1/0;for(const r of t.comp)r<s&&this.state.comp.add(r)}}const w_="macbeth",E_=1,_i="projects",Mi="blobs";let Ar=null;function Ku(){return Ar||(Ar=new Promise((i,t)=>{const e=indexedDB.open(w_,E_);e.onupgradeneeded=()=>{const n=e.result;n.objectStoreNames.contains(_i)||n.createObjectStore(_i,{keyPath:"id"}),n.objectStoreNames.contains(Mi)||n.createObjectStore(Mi)},e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error??new Error("IndexedDB を開けません"))}),Ar)}function Ac(i,t,e){return Ku().then(n=>new Promise((s,r)=>{const o=n.transaction(i,t);let a;Promise.resolve(e(o)).then(c=>{a=c},r),o.oncomplete=()=>s(a),o.onerror=()=>r(o.error??new Error("IndexedDB の操作に失敗しました")),o.onabort=()=>r(o.error??new Error("IndexedDB の操作が中断されました"))}))}function wh(i){return new Promise((t,e)=>{i.onsuccess=()=>t(i.result),i.onerror=()=>e(i.error)})}async function Eh(){try{return await Ku(),!0}catch{return!1}}async function T_(i,t){const e=Date.now(),n={...i,created:i.created??e,modified:e,size:t.byteLength};return await Ac([_i,Mi],"readwrite",s=>{s.objectStore(_i).put(n),s.objectStore(Mi).put(t.slice().buffer,n.id)}),n}async function A_(i){return await Ac([_i,Mi],"readonly",async e=>{const n=await wh(e.objectStore(_i).get(i)),s=await wh(e.objectStore(Mi).get(i));return n&&s?{record:n,bytes:new Uint8Array(s)}:null})}async function Th(i){await Ac([_i,Mi],"readwrite",t=>{t.objectStore(_i).delete(i),t.objectStore(Mi).delete(i)})}const Cr="__autosave__",C_=1200,R_="0.1.0";class P_{constructor(t){this.state=t}timer=null;writing=!1;pending=!1;available=null;onError=null;onSaved=null;schedule(){this.timer!==null&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.timer=null,this.saveNow()},C_)}async saveNow(){if(this.writing){this.pending=!0;return}if(this.available===null&&(this.available=await Eh()),!!this.available){this.writing=!0;try{const t=Qx(this.state.doc,{appVersion:R_}),e=await T_({id:Cr,name:"自動保存",thumbnail:"",autosave:!0},t);this.onSaved?.(e.modified)}catch(t){this.onError?.(t instanceof Error?t.message:"自動保存に失敗しました")}finally{this.writing=!1,this.pending&&(this.pending=!1,this.schedule())}}}async restore(){if(this.available===null&&(this.available=await Eh()),!this.available)return!1;try{const t=await A_(Cr);if(!t)return!1;const{document:e}=n_(t.bytes);return e.objects.length?(this.state.doc=e,this.state.select(null),!0):!1}catch(t){return this.onError?.(t instanceof Error?t.message:"前回の状態を読み込めませんでした"),await Th(Cr).catch(()=>{}),!1}}async clear(){this.timer!==null&&clearTimeout(this.timer),this.timer=null,await Th(Cr).catch(()=>{})}}function Zu(){return typeof window.showSaveFilePicker=="function"?"file-system-access":typeof navigator.canShare=="function"&&typeof navigator.share=="function"?"share":"download"}function L_(i){return i.endsWith(".mbz")?"application/zip":i.endsWith(".obj")?"text/plain":i.endsWith(".png")?"image/png":"application/octet-stream"}function I_(i){return i.endsWith(".mbz")?{"application/zip":[".mbz"]}:i.endsWith(".obj")?{"text/plain":[".obj"]}:{"application/octet-stream":[`.${i.split(".").pop()}`]}}function Ah(i,t){const e=URL.createObjectURL(i),n=document.createElement("a");n.href=e,n.download=t,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(e),2e3)}async function Ch(i,t){const e=new Blob([i],{type:L_(t)}),n=Zu();if(n==="file-system-access")try{const s=await window.showSaveFilePicker({suggestedName:t,types:[{description:"macbeth",accept:I_(t)}]}),r=await s.createWritable();return await r.write(e),await r.close(),{method:n,target:{handle:s,name:s.name},saved:!0}}catch(s){return s?.name==="AbortError"?{method:n,target:null,saved:!1}:(Ah(e,t),{method:"download",target:{name:t},saved:!0})}if(n==="share"){const s=new File([e],t,{type:e.type});if(navigator.canShare?.({files:[s]}))try{return await navigator.share({files:[s],title:t}),{method:n,target:{name:t},saved:!0}}catch(r){if(r?.name==="AbortError")return{method:n,target:null,saved:!1}}}return Ah(e,t),{method:"download",target:{name:t},saved:!0}}async function Rh(i){if(typeof window.showOpenFilePicker=="function")try{const t=i.split(",").map(r=>r.trim()),[e]=await window.showOpenFilePicker({multiple:!1,types:[{description:"macbeth",accept:{"*/*":t}}]}),n=await e.getFile(),s=await n.arrayBuffer();return{name:n.name,bytes:new Uint8Array(s),text:await n.text(),handle:e}}catch(t){if(t?.name==="AbortError")return null}return new Promise(t=>{const e=document.createElement("input");e.type="file",e.accept=i,e.style.display="none",document.body.appendChild(e);let n=!1;const s=r=>{n||(n=!0,e.remove(),t(r))};e.addEventListener("change",async()=>{const r=e.files?.[0];if(!r)return s(null);const o=await r.arrayBuffer();s({name:r.name,bytes:new Uint8Array(o),text:new TextDecoder().decode(o)})}),window.addEventListener("focus",()=>setTimeout(()=>s(null),800),{once:!0}),e.click()})}function D_(){switch(Zu()){case"file-system-access":return"フォルダを選んで保存（同じファイルに上書きできます）";case"share":return"共有シートから「ファイル」App へ保存";default:return"ダウンロード"}}const U_=100;class N_{session=null;get active(){return this.session!==null}begin(t,e,n){if(!e.length)return null;let s=0;for(const[o,a]of e){const c=t.mesh.getPosition(o),l=t.mesh.getPosition(a);s+=Math.hypot(c[0]-l[0],c[1]-l[1],c[2]-l[2])}const r=s/e.length||1;return this.session={object:t,source:t.mesh.clone(),edges:e,scale:r,startX:n},this.session}widthFromDrag(t,e){const n=t/U_*e*.5;return Math.max(e*.02,Math.min(e*.49,n))}apply(t){const e=this.session;if(!e)return null;const n=Dv(e.source,e.edges,t.width,t.segments);return n?(e.object.mesh=n.mesh,{faces:n.newFaces}):null}cancel(){const t=this.session;t&&(t.object.mesh=t.source,this.session=null)}keep(){return this.session}end(){this.session=null}}const F_=30;class O_{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}preview=null;get current(){return this.preview}snap(t,e){if(e)return .5;const n=this.state.cut.snapStep;if(n>0){const s=n/100;t=Math.round(t/s)*s}return Math.max(.02,Math.min(.98,t))}clear(){for(const t of this.group.children.slice())this.group.remove(t),cs(t);this.preview=null}update(t,e,n){if(this.clear(),!e)return null;const s=this.picker.pickEdge(e,t,F_);if(s.edge<0)return null;const r=this.snap(s.t,n),[o,a]=e.edges[s.edge],c=Ev(e.object.mesh,o,a,r,this.state.cut.edgeFlow);if(!c)return null;this.preview={edge:s.edge,t:r,faceCount:c.faceCount};const l=[];for(const d of c.points)l.push(d[0],d[1],d[2]);const h=new Gs(Ze(l),Ye.cutLine);on(h,e.object.transform).renderOrder=5,this.group.add(h);const u=c.points[0],f=new _n(Ze([u[0],u[1],u[2]]),Ye.cutPt);return on(f,e.object.transform).renderOrder=5,this.group.add(f),`エッジループ挿入 <kbd>${Math.round(r*100)}%</kbd> · ${c.faceCount} 面`+(this.state.cut.edgeFlow?" · エッジフロー":"")+" · <kbd>Shift</kbd> で 50%"}commit(t){const e=this.preview;if(!e||!t)return null;const[n,s]=t.edges[e.edge],r=Tv(t.object.mesh,n,s,e.t,this.state.cut.edgeFlow);return this.clear(),r?(t.object.mesh=r.mesh,{faceCount:r.faceCount}):null}}const k_=22,B_=16,As={vert:new xn({color:16761963,size:9,sizeAttenuation:!1,transparent:!0,opacity:.75}),edge:new Oe({color:16761963,transparent:!0,opacity:.8}),weld:new xn({color:7139450,size:14,sizeAttenuation:!1}),snap:new xn({color:7139450,size:11,sizeAttenuation:!1}),face:new vn({color:16761963,transparent:!0,opacity:.22,side:Ve,depthWrite:!1})};class z_{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}current="";clear(){if(this.current){for(const t of this.group.children.slice())this.group.remove(t),cs(t);this.current=""}}showVertex(t,e){if(this.setKey(`w${e}`))return;const n=t.object.mesh,s=new _n(Ze([n.positions[e*3],n.positions[e*3+1],n.positions[e*3+2]]),As.weld);this.add(s,t)}showWorldPoint(t,e,n){const s=`s${t.toFixed(4)},${e.toFixed(4)},${n.toFixed(4)}`;if(this.setKey(s))return;const r=new _n(Ze([t,e,n]),As.snap);r.renderOrder=3,this.group.add(r)}update(t,e){if(!e||this.state.compMode==="object")return this.clear();const n=e.object,s=n.mesh;if(this.state.compMode==="vertex"){const h=this.picker.pickVertex(e,t,k_);if(h<0)return this.clear();if(this.setKey(`v${h}`))return;const u=new _n(Ze([s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]]),As.vert);this.add(u,e);return}if(this.state.compMode==="edge"){const h=this.picker.pickEdge(e,t,B_);if(h.edge<0)return this.clear();if(this.setKey(`e${h.edge}`))return;const[u,f]=e.edges[h.edge],d=new mi(Ze([s.positions[u*3],s.positions[u*3+1],s.positions[u*3+2],s.positions[f*3],s.positions[f*3+1],s.positions[f*3+2]]),As.edge);this.add(d,e);return}const r=this.picker.pickSurface(t);if(!r||r.object!==n)return this.clear();if(this.setKey(`f${r.face}`))return;const o=s.faceVerts(r.face),a=[],c=[];for(const h of o)a.push(s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]);for(let h=1;h<o.length-1;h++)c.push(0,h,h+1);const l=Ze(a);l.setIndex(c),this.add(new ye(l,As.face),e)}setKey(t){return this.current===t?!0:(this.clear(),this.current=t,!1)}add(t,e){on(t,e.object.transform).renderOrder=3,this.group.add(t)}}const Ph=22,Lh=16,V_=380,H_=14,Ih=4;function Ai(i,t,e){e?i.delete(t):i.add(t)}const En={changed:!1,objectChanged:!1};class G_{constructor(t,e,n){this.state=t,this.picker=e,this.viewOf=n}lastClick=null;add(t){return this.state.modOn("shift")||t.shiftKey}sub(t){return this.state.modOn("ctrl")||t.ctrlKey||t.metaKey}click(t,e){if(this.state.compMode==="object"){const h=this.picker.pickSurface(t)?.object??null;if(h&&this.add(e))return this.state.addObject(h),this.lastClick=null,{changed:!0,objectChanged:!0};const u=h!==this.state.selected||this.state.also.size>0;return this.state.select(h),this.lastClick=null,{changed:u,objectChanged:u}}let n=this.state.selected;if(!n){const l=this.picker.pickSurface(t);if(!l)return En;this.state.select(l.object),n=l.object;const h=this.viewOf(n.id);return h&&(this.pickOne(t,e,h),this.lastClick={t:performance.now(),x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,before:new Set}),{changed:!0,objectChanged:!0}}const s=this.viewOf(n.id);if(!s)return En;const r=performance.now(),o=this.lastClick;if(o!==null&&r-o.t<V_&&Math.hypot(t.x-o.x,t.y-o.y)<H_&&o.mode===this.state.compMode&&o.objectId===n.id&&o)return this.lastClick=null,this.double(t,e,s,o.before);const c=new Set(this.state.comp);return!this.add(e)&&!this.sub(e)&&this.state.comp.clear(),this.pickOne(t,e,s),this.lastClick={t:r,x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,before:c},{changed:!0,objectChanged:!1}}pickOne(t,e,n){const s=this.sub(e),r=this.state.comp;if(this.state.compMode==="vertex"){const o=this.picker.pickVertex(n,t,Ph);o>=0&&Ai(r,o,s)}else if(this.state.compMode==="edge"){const o=this.picker.pickEdge(n,t,Lh);o.edge>=0&&Ai(r,o.edge,s)}else if(this.state.compMode==="face"){const o=this.picker.pickSurface(t);o&&o.object===n.object&&Ai(r,o.face,s)}}edgeIndex(t){const e=new Map;return t.edges.forEach((n,s)=>e.set(Nt(n[0],n[1]),s)),e}double(t,e,n,s){const r=n.object,o=r.mesh,a=this.add(e),c=this.sub(e),l=this.edgeIndex(n),h=f=>f.map(d=>l.get(Nt(d[0],d[1]))).filter(d=>d!==void 0),u=(f,d)=>{!a&&!c?this.state.comp.clear():this.state.comp=new Set(s);for(const g of f)Ai(this.state.comp,g,c);return{changed:!0,objectChanged:!1,message:`${d} — ${f.length}`}};if(this.state.compMode==="edge"){const f=this.picker.pickEdge(n,t,Lh);if(f.edge<0)return En;const[d,g]=n.edges[f.edge];if(a&&s.size){const v=[...s][s.size-1],m=n.edges[v];if(m){const p=Nt(m[0],m[1]),_=Nt(d,g),y=zo(o,m[0],m[1]),M=th(y,p,_);if(M)return u(h(M),"部分エッジループ");const w=fx(o,m[0],m[1]),b=th(w,p,_);if(b)return u(h(b),"部分エッジリング")}}return u(h(zo(o,d,g).edges),"エッジループ")}if(this.state.compMode==="face"){const f=this.picker.pickSurface(t);return!f||f.object!==r?En:u(Lu(o,f.face),"シェル")}if(this.state.compMode==="vertex"){const f=this.picker.pickVertex(n,t,Ph);if(f<0)return En;if(a&&s.size){const g=[...s][s.size-1],v=n.edges.find(([m,p])=>m===g||p===g);if(v){const m=zo(o,v[0],v[1]),p=px(m),_=p.indexOf(g),y=p.indexOf(f);if(_>=0&&y>=0){const[M,w]=_<y?[_,y]:[y,_];return u(p.slice(M,w+1),"頂点列")}}}const d=o.vertexFaces().get(f);return d?.length?u(dx(o,d[0]),"シェル"):En}return En}marquee(t,e,n,s,r,o){const a={x:Math.min(t,n),y:Math.min(e,s)},c={x:Math.max(t,n),y:Math.max(e,s)};if(c.x-a.x<Ih&&c.y-a.y<Ih)return this.click(r,o);const l=g=>g.z<=1&&g.x>=a.x&&g.x<=c.x&&g.y>=a.y&&g.y<=c.y;if(this.state.compMode==="object"){let g=null;for(const m of this.state.doc.objects){const p=this.viewOf(m.id);if(p&&this.picker.vertsInRect(p,a.x,a.y,c.x,c.y).length){g=m;break}}const v=g!==this.state.selected;return this.state.select(g),{changed:v,objectChanged:v}}const h=this.state.selected,u=h?this.viewOf(h.id):void 0;if(!h||!u)return En;const f=this.sub(o);!this.add(o)&&!f&&this.state.comp.clear();const d=this.state.comp;if(this.state.compMode==="vertex")for(const g of this.picker.vertsInRect(u,a.x,a.y,c.x,c.y))Ai(d,g,f);else if(this.state.compMode==="edge")u.edges.forEach((g,v)=>{const m=h.mesh.getPosition(g[0]),p=h.mesh.getPosition(g[1]),_=this.picker.project(u,(m[0]+p[0])/2,(m[1]+p[1])/2,(m[2]+p[2])/2);l(_)&&Ai(d,v,f)});else if(this.state.compMode==="face")for(let g=0;g<h.mesh.faceCount;g++){const v=h.mesh.faceCenter(g);l(this.picker.project(u,v[0],v[1],v[2]))&&Ai(d,g,f)}return{changed:!0,objectChanged:!1}}growOrShrink(t){const e=this.state.selected;if(!e||this.state.compMode==="object"||!this.state.comp.size)return{changed:!1,objectChanged:!1,message:"コンポーネントを選択してください"};const n=e.mesh,s=this.state.comp;if(this.state.compMode==="vertex"){const r=t?eh(n,s):nh(n,s);s.clear();for(const o of r)s.add(o)}else if(this.state.compMode==="face"){const r=t?gx(n,s):vx(n,s);s.clear();for(const o of r)s.add(o)}else{const r=this.viewOf(e.id);if(!r)return En;const o=new Set;for(const c of s){const l=r.edges[c];l&&(o.add(l[0]),o.add(l[1]))}const a=new Set(t?eh(n,o):nh(n,o));s.clear(),r.edges.forEach(([c,l],h)=>{a.has(c)&&a.has(l)&&s.add(h)})}return{changed:!0,objectChanged:!1,message:`${t?"選択を拡張":"選択を縮小"} — ${s.size}`}}selectBoundary(){const t=this.state.selected;if(!t)return{changed:!1,objectChanged:!1,message:"オブジェクトを選択してください"};const e=this.viewOf(t.id);if(!e)return En;const n=new Set(mx(t.mesh).map(([s,r])=>Nt(s,r)));return n.size?(this.state.compMode="edge",this.state.comp.clear(),e.edges.forEach(([s,r],o)=>{n.has(Nt(s,r))&&this.state.comp.add(o)}),this.lastClick=null,{changed:!0,objectChanged:!1,message:`境界エッジ — ${this.state.comp.size}`}):{changed:!1,objectChanged:!1,message:"境界エッジがありません（閉じたメッシュです）"}}selectedVertices(){const t=this.state.selected;if(!t)return[];const e=this.viewOf(t.id),n=new Set;if(this.state.compMode==="vertex")for(const s of this.state.comp)n.add(s);else if(this.state.compMode==="edge"&&e)for(const s of this.state.comp){const r=e.edges[s];r&&(n.add(r[0]),n.add(r[1]))}else if(this.state.compMode==="face")for(const s of this.state.comp)for(const r of t.mesh.faceVerts(s))n.add(r);else for(let s=0;s<t.mesh.vertexCount;s++)n.add(s);return[...n]}reset(){this.lastClick=null}}const W_=4e5;function Dh(i,t,e){const n=new Map;for(const c of t)n.set(c,1);if(!e.enabled||e.strength<=0||!t.length)return{weights:n,skipped:!1};const s=i.vertexCount;if(s*t.length>W_)return{weights:n,skipped:!0};const r=i.positions,{radius:o,strength:a}=e;for(let c=0;c<s;c++){if(n.get(c)===1)continue;let l=1/0;for(const h of t){const u=Math.hypot(r[c*3]-r[h*3],r[c*3+1]-r[h*3+1],r[c*3+2]-r[h*3+2]);u<l&&(l=u)}if(l<o){const h=1-l/o;n.set(c,a*(h*h*(3-2*h)))}}return{weights:n,skipped:!1}}function X_(i,t){const e=new Set(t),n=i.positions,s=(a,c,l)=>`${a.toFixed(3)==="-0.000"?"0.000":a.toFixed(3)},${c.toFixed(3)},${l.toFixed(3)}`,r=new Map;for(let a=0;a<i.vertexCount;a++)r.set(s(n[a*3],n[a*3+1],n[a*3+2]),a);const o=[];for(const a of e){const c=r.get(s(-n[a*3],n[a*3+1],n[a*3+2]));c!==void 0&&c!==a&&!e.has(c)&&o.push([a,c])}return o}function Uh(i){const{handle:t,pivot:e,ray:n}=i,s=nc(t)??"move",r=t!==30&&t%10<3?t%10:-1,o=new fi().setFromNormalAndCoplanarPoint(new I().subVectors(i.cameraPosition,e).normalize(),e);let a=null;if(r<0){const c=new I;n.intersectPlane(o,c)&&(a=c)}return{kind:s,label:i.label,handle:t,axis:r,pivot:e.clone(),target:i.target,start:i.point,pivotScreen:i.pivotScreen,t0:r>=0?ic(n,e,Kn[r]):0,a0:Math.atan2(i.point.y-i.pivotScreen.y,i.point.x-i.pivotScreen.x),plane:o,planeStart:a}}function $_(i,t,e,n,s,r){if(i.kind==="move"){let a;if(i.axis<0){const c=new I;if(!i.planeStart||!n.intersectPlane(i.plane,c))return;a=new I().subVectors(c,i.planeStart)}else{const c=Kn[i.axis];a=c.clone().multiplyScalar(ic(n,i.pivot,c)-i.t0)}if(r){const c=r(i.pivot.clone().add(a));if(c){const l=c.sub(i.pivot);a=i.axis<0?l:Kn[i.axis].clone().multiplyScalar(l.dot(Kn[i.axis]))}}qo(i,t,(c,l)=>c.clone().addScaledVector(a,l),{position:a});return}if(i.kind==="rotate"){let a=Math.atan2(e.y-i.pivotScreen.y,e.x-i.pivotScreen.x)-i.a0;const c=i.axis<0?new I().subVectors(s,i.pivot).normalize():Kn[i.axis].clone();i.axis>=0&&c.dot(new I().subVectors(s,i.pivot))<0&&(a=-a),qo(i,t,(l,h)=>{const u=new je().setFromAxisAngle(c,-a*h);return l.clone().sub(i.pivot).applyQuaternion(u).add(i.pivot)},{rotation:new je().setFromAxisAngle(c,-a)});return}let o;if(i.axis<0)o=new I(1,1,1).multiplyScalar(Math.max(.02,1+(e.x-i.start.x)*.008));else{const a=ic(n,i.pivot,Kn[i.axis]),c=Math.max(.02,1+(a-i.t0)/Math.max(1e-4,Math.abs(i.t0))*.6);o=new I(1,1,1),o.setComponent(i.axis,c)}qo(i,t,(a,c)=>{const l=a.clone().sub(i.pivot);return l.set(l.x*(1+(o.x-1)*c),l.y*(1+(o.y-1)*c),l.z*(1+(o.z-1)*c)),l.add(i.pivot)},{scale:o})}function $o(i,t,e){const n=Math.max(.02,e.scale??1),s=e.move??new I,r=i.pivot,o=i.target,a=c=>c.clone().sub(r).multiplyScalar(n).add(r).add(s);if(o.kind==="object"){const c=o.transform,l=a(new I(c.position[0],c.position[1],c.position[2]));t.transform={position:[l.x,l.y,l.z],rotation:[...c.rotation],scale:[c.scale[0]*n,c.scale[1]*n,c.scale[2]*n]};return}for(let c=0;c<o.verts.length;c++){const l=o.world[c],h=l.clone().lerp(a(l),o.weights[c]).applyMatrix4(o.inverse);t.mesh.setPosition(o.verts[c],h.x,h.y,h.z)}for(const[c,l]of o.mirror){const h=t.mesh.getPosition(c);t.mesh.setPosition(l,-h[0],h[1],h[2])}}function qo(i,t,e,n){const s=i.target;if(s.kind==="object"){const r=s.transform,o=pi(r),a=new I(r.position[0],r.position[1],r.position[2]);if(n.position){const c=a.clone().add(n.position);o.position=[c.x,c.y,c.z]}if(n.rotation){const c=n.rotation.clone().multiply(new je(r.rotation[0],r.rotation[1],r.rotation[2],r.rotation[3]));o.rotation=[c.x,c.y,c.z,c.w];const l=a.clone().sub(i.pivot).applyQuaternion(n.rotation).add(i.pivot);o.position=[l.x,l.y,l.z]}if(n.scale){const c=n.scale;o.scale=[r.scale[0]*c.x,r.scale[1]*c.y,r.scale[2]*c.z];const l=a.clone().sub(i.pivot);l.set(l.x*c.x,l.y*c.y,l.z*c.z),l.add(i.pivot),o.position=[l.x,l.y,l.z]}t.transform=o;return}for(let r=0;r<s.verts.length;r++){const o=e(s.world[r],s.weights[r]).applyMatrix4(s.inverse);t.mesh.setPosition(s.verts[r],o.x,o.y,o.z)}for(const[r,o]of s.mirror){const a=t.mesh.getPosition(r);t.mesh.setPosition(o,-a[0],a[1],a[2])}}function Lt(i){const t=document.getElementById(i);if(!t)throw new Error(`#${i} が見つかりません`);return t}function mt(i,t,e){const n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}class q_{constructor(t,e){this.stage=t,this.host=e}drag=null;attach(t){const e=t.querySelector(".phead");if(!e)return;const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("class","grip"),n.setAttribute("viewBox","0 0 8 12"),n.setAttribute("fill","currentColor");for(const[s,r]of[[2,2],[6,2],[2,6],[6,6],[2,10],[6,10]]){const o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx",String(s)),o.setAttribute("cy",String(r)),o.setAttribute("r","1"),n.appendChild(o)}e.insertBefore(n,e.firstChild),e.addEventListener("touchstart",s=>s.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",s=>this.start(s,t))}place(t,e){e==="float"?(t.classList.add("floating"),t.style.left="320px",t.style.top="90px",this.stage.appendChild(t)):(t.classList.remove("floating"),t.style.left="",t.style.top="",this.stage.querySelector(`[data-zone="${e}"]`)?.appendChild(t)),this.updateDockWidths()}updateDockWidths(){for(const t of this.stage.querySelectorAll(".dock"))t.classList.toggle("narrow",!!t.querySelector('.panel[data-panel="tools"]'))}start(t,e){t.preventDefault();const n=e.getBoundingClientRect();this.drag={panel:e,key:e.dataset.panel??"",dx:t.clientX-n.left,dy:t.clientY-n.top,zones:[],hot:null},this.showDropZones(),e.classList.add("floating"),this.stage.appendChild(e),this.move(t),window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.end),window.addEventListener("pointercancel",this.end)}move=t=>{const e=this.drag;if(!e)return;const n=this.stage.getBoundingClientRect();e.panel.style.left=`${t.clientX-n.left-e.dx}px`,e.panel.style.top=`${t.clientY-n.top-e.dy}px`;let s=null;for(const r of e.zones){const o=r.el.getBoundingClientRect(),a=t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom;r.el.classList.toggle("hot",a),a&&(s=r)}e.hot=s};end=()=>{window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.end),window.removeEventListener("pointercancel",this.end);const t=this.drag;t&&(t.hot?(this.place(t.panel,t.hot.zone),this.host.onZoneChange(t.key,t.hot.zone),this.host.onMessage(`${t.panel.querySelector(".phead span")?.textContent??""}を${t.hot.name}にドッキング`)):this.host.onZoneChange(t.key,"float"),this.hideDropZones(),this.drag=null,this.updateDockWidths(),setTimeout(()=>this.host.onLayoutChange(),0))};showDropZones(){const t=this.drag;if(!t)return;const e=this.stage.getBoundingClientRect(),n=[{zone:"left",name:"左",x:64,y:0,w:200,h:e.height},{zone:"rightTop",name:"右上",x:e.width-236,y:0,w:236,h:e.height*.62},{zone:"rightBottom",name:"右下",x:e.width-236,y:e.height*.62,w:236,h:e.height*.38}];for(const s of n){const r=mt("div","dropz");r.style.left=`${s.x}px`,r.style.top=`${s.y}px`,r.style.width=`${s.w}px`,r.style.height=`${s.h}px`,r.appendChild(mt("span",void 0,s.name)),this.stage.appendChild(r),t.zones.push({el:r,zone:s.zone,name:s.name})}}hideDropZones(){for(const t of this.stage.querySelectorAll(".dropz"))t.remove()}}const Y_=180,K_=420,Nh="macbeth.dockSize";class Z_{constructor(t,e,n){this.stage=t,this.dockCol=e,this.onChange=n;try{const s=localStorage.getItem(Nh);s&&(this.sizes={...this.sizes,...JSON.parse(s)})}catch{}this.grip=document.createElement("div"),this.grip.className="dockgrip",this.stage.appendChild(this.grip),this.attachGrip(),this.apply(),window.addEventListener("resize",()=>this.apply())}grip;sizes={landscape:236,portrait:240};portrait=!1;apply(){const t=this.stage.getBoundingClientRect(),e=t.height>t.width,n=e!==this.portrait;this.portrait=e,this.stage.classList.toggle("portrait",e),this.setSize(this.size),this.grip.classList.toggle("vertical",!e),this.grip.classList.toggle("horizontal",e),this.placeGrip(),n&&this.onChange()}get size(){return this.portrait?this.sizes.portrait:this.sizes.landscape}setSize(t){const e=Math.max(Y_,Math.min(K_,t));this.portrait?this.sizes.portrait=e:this.sizes.landscape=e,this.stage.style.setProperty("--dockw",`${e}px`),this.placeGrip()}placeGrip(){const t=!this.dockCol.querySelector(".panel");if(this.grip.hidden=t,t)return;const e=this.stage.getBoundingClientRect(),n=this.dockCol.getBoundingClientRect();this.portrait?(this.grip.style.top=`${n.top-e.top-3}px`,this.grip.style.left=""):(this.grip.style.left=`${n.left-e.left-3}px`,this.grip.style.top="")}attachGrip(){let t=!1;this.grip.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),this.grip.addEventListener("pointerdown",e=>{e.preventDefault(),t=!0,this.grip.classList.add("active"),this.grip.setPointerCapture(e.pointerId)}),this.grip.addEventListener("pointermove",e=>{if(!t)return;const n=this.stage.getBoundingClientRect();this.setSize(this.portrait?n.bottom-e.clientY:n.right-e.clientX),this.onChange()});for(const e of["pointerup","pointercancel"])this.grip.addEventListener(e,()=>{if(t){t=!1,this.grip.classList.remove("active");try{localStorage.setItem(Nh,JSON.stringify(this.sizes))}catch{}this.onChange()}})}get isPortrait(){return this.portrait}}class Fh{constructor(t,e,n,s,r,o,a){this.state=t,this.which=n,this.labelId=s,this.valueId=r,this.onInput=o,this.onCommit=a,this.root=Lt(e),this.fill=this.root.querySelector(".fill"),this.knob=this.root.querySelector(".knob"),this.attach(),this.paint()}root;fill;knob;active=!1;paint(){const t=this.state.gauge(this.which),e=t.get(this.state),n=(e-t.min)/(t.max-t.min);this.fill.style.height=`${n*100}%`,this.knob.style.bottom=`calc(${n*100}% - 1px)`,Lt(this.labelId).textContent=t.label,this.root.title=t.full,Lt(this.valueId).textContent=e.toFixed(2),this.root.dataset.off=this.which==="g1"&&e<=0?"true":"false"}setFromY(t){const e=this.state.gauge(this.which),n=this.root.getBoundingClientRect(),s=Math.max(0,Math.min(1,1-(t-n.top)/n.height)),r=e.min+s*(e.max-e.min);e.set(this.state,Math.round(r/e.step)*e.step),this.paint(),this.onInput()}attach(){const t=this.root;t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>{e.preventDefault(),this.active=!0,t.setPointerCapture(e.pointerId),this.setFromY(e.clientY)}),t.addEventListener("pointermove",e=>{this.active&&this.setFromY(e.clientY)});for(const e of["pointerup","pointercancel"])t.addEventListener(e,()=>{this.active&&(this.active=!1,this.onCommit())})}}const J_={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"},j_={wire:"WIRE",shaded:"SHADED",shadedWire:"SHADED+WIRE",smooth:"SMOOTH",checker:"CHECKER"};class Q_{constructor(t){this.state=t}toastTimer=null;uvNote=null;refreshStats(){const t=this.state.doc.stats();let e=0;for(const a of this.state.doc.objects)e+=a.mesh.stats().edges;Lt("hudStats").innerHTML=`<i>Verts</i><span>${t.vertices}</span><i>Edges</i><span>${e}</span><i>Faces</i><span>${t.faces}</span><i>Tris</i><span>${t.triangles}</span>`;const n=this.state.activeMods(),s=n.length?` · <b>${n.join(" ")}</b>`:"";if(this.state.mode==="uv"&&this.uvNote){const a=this.uvNote;Lt("hudMode").innerHTML=`UV · <b>${a.unit}</b>${s}<br>島 ${a.charts} · 伸び ×${a.maxStretch.toFixed(2)}`+(this.state.selected?` · ${this.state.selected.name}`:"");return}const r=J_[this.state.compMode],o=j_[this.state.display];Lt("hudMode").innerHTML=`${this.state.tool}${this.state.symX?" · 対称X":""} · <b>${r}</b>`+(this.state.comp.size?` · ${this.state.comp.size}`:"")+s+`<br>${o} · ${this.state.viewName}${this.state.camOpts.ortho?" · ORTHO":""}`+(this.state.selected?` · ${this.state.selected.name}`:"")}toast(t){Lt("hudHint").innerHTML=t,this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.defaultHint(),2800)}defaultHint(){this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=null,Lt("hudHint").innerHTML=(this.state.fingerCam?"指1本 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>":"指1本 メッシュ上 <kbd>ツール</kbd> / 外 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>")+" · 指2本 <kbd>パン / ズーム</kbd><br><b>指3本 つまむ <kbd>選択を拡大縮小</kbd> · 上下 <kbd>Y へ移動</kbd> · 左右 <kbd>X / Z へ移動</kbd></b><br>長押し 指1本 <kbd>マーキング</kbd> 指2本 <kbd>カメラ / 編集</kbd> 指3本 <kbd>カメラ</kbd> · ダブルタップ 指2本 <kbd>戻る</kbd> 指3本 <kbd>進む</kbd><br><kbd>SHF</kbd> + 移動 <kbd>押し出し</kbd> · <kbd>SHF</kbd> + <kbd>CTL</kbd> + 移動 <kbd>スライド</kbd> · <kbd>D</kbd> <kbd>ピボット</kbd> · <kbd>+</kbd>/<kbd>-</kbd> <kbd>マニピュレータの大きさ</kbd><br>スナップ <kbd>ツール列</kbd> または <kbd>X</kbd>/<kbd>V</kbd>/<kbd>C</kbd> を押している間 · <kbd>F</kbd> <kbd>矩形 / フレーム</kbd><br>マウス <kbd>Alt+左 タンブル</kbd> <kbd>Alt+中 パン</kbd> <kbd>Alt+右 ズーム</kbd>"}setSaveNote(t){Lt("saveNote").textContent=t}}function Yo(i,t){const e=mt("div","panel");e.dataset.panel=i;const n=mt("div","phead");n.appendChild(mt("span",void 0,t));const s=mt("div","pbody");return e.append(n,s),{panel:e,body:s}}function fn(i,t){const e=mt("div","sect"),n=mt("div","sect-h");return n.appendChild(mt("span",void 0,i)),t&&n.appendChild(mt("b",void 0,t)),e.appendChild(n),e}function dn(i,t){const e=mt("div","row");e.appendChild(mt("label",void 0,t.label));const n=mt("input","num");n.type="text",n.readOnly=!0;const s=o=>{n.value=t.format?t.format(o):o.toFixed(t.step<1?2:0)};s(t.value),e.appendChild(n);const r=mt("input","slider");r.type="range",r.min=String(t.min),r.max=String(t.max),r.step=String(t.step),r.value=String(t.value),r.addEventListener("input",()=>{const o=Number(r.value);s(o),t.onInput(o)});for(const o of["change","pointerup"])r.addEventListener(o,()=>t.onCommit?.());e.appendChild(r),i.appendChild(e)}function tM(i,t,e,n){const s=mt("button","chk");s.setAttribute("aria-pressed",String(e)),s.appendChild(mt("i")),s.appendChild(mt("span",void 0,t)),s.addEventListener("click",()=>{const r=s.getAttribute("aria-pressed")!=="true";s.setAttribute("aria-pressed",String(r)),n(r)}),i.appendChild(s)}function Ko(i,t,e,n,s){const r=mt("div","row triple");r.appendChild(mt("label",void 0,t));for(let o=0;o<3;o++){const a=mt("input","num");a.type="text",a.inputMode="decimal",a.value=e[o].toFixed(n),a.addEventListener("change",()=>{const c=Number(a.value);Number.isFinite(c)?s(o,c):a.value=e[o].toFixed(n)}),r.appendChild(a)}i.appendChild(r)}function eM(i,t,e){i.textContent="";const n=t.selected;if(n){const r=fn("トランスフォーム","TRANSFORM");Ko(r,"移動",n.transform.position,3,(o,a)=>e.onTransformInput(n,"position",o,a)),Ko(r,"回転",t.rotationEuler,1,(o,a)=>e.onTransformInput(n,"rotation",o,a)),Ko(r,"スケール",n.transform.scale,3,(o,a)=>e.onTransformInput(n,"scale",o,a)),r.appendChild(mt("div","hint","回転は度で入れます。数値を打って Enter で確定します。")),i.appendChild(r)}if(t.tool==="multicut"){const r=fn("マルチカット","MULTI CUT");dn(r,{label:"ステップ % スナップ",value:t.cut.snapStep,min:0,max:50,step:5,format:o=>o?`${Math.round(o)}%`:"オフ",onInput:o=>e.onCutChange("snapStep",o)}),tM(r,"エッジフロー",t.cut.edgeFlow,o=>e.onCutChange("edgeFlow",o)),r.appendChild(mt("div","hint",`ホバーで入る位置を先に見せます。Shift で 50% に固定。
エッジフローは頂点法線による三次補間で、ループをサーフェスに沿わせます。`)),i.appendChild(r)}if(t.tool==="bevel"||t.bevelActive){const r=fn("ベベル","BEVEL");dn(r,{label:"幅",value:t.bevel.width,min:.005,max:2,step:.005,format:o=>o.toFixed(3),onInput:o=>e.onBevelChange("width",o)}),dn(r,{label:"セグメント",value:t.bevel.segments,min:1,max:8,step:1,onInput:o=>e.onBevelChange("segments",o)}),r.appendChild(mt("div","hint",t.bevelActive?`確定したあとでも、ここを動かすとかけ直します。
別の操作をすると確定します。`:`エッジを選んで左右にドラッグすると幅が決まります。
セグメント 1 で面取り、2 以上で丸めになります。`)),i.appendChild(r)}if(t.compMode==="face"||t.compMode==="edge"){const r=fn("押し出し","EXTRUDE");dn(r,{label:"距離",value:t.extrudeDist,min:.05,max:3,step:.05,onInput:o=>e.onExtrudeDistChange(o)}),r.appendChild(mt("div","hint",`編集メニューの「押し出し」で使う距離です。
SHF を押しながらドラッグする場合は距離ではなく動かした量になります。`)),i.appendChild(r)}{const r=fn(`スナップ${t.snap.active?"（効いています）":""}`,"SNAP"),o=mt("div","row"),a=mt("div","segmented");for(const[c,l]of[["grid","グリッド  X"],["vertex","頂点  V"],["edge","カーブ  C"],["surface","面"]]){const h=mt("button","seg");h.textContent=l,h.setAttribute("aria-pressed",String(t.snap.kind===c)),h.addEventListener("click",()=>e.onSnapChange("kind",c)),a.appendChild(h)}o.appendChild(a),r.appendChild(o),dn(r,{label:"グリッドの刻み",value:t.snap.step,min:.05,max:2,step:.05,onInput:c=>e.onSnapChange("step",c)}),r.appendChild(mt("div","hint",`ツール列のスナップがオンのとき、または X / V / C を押している間だけ効きます。
移動のときだけ働き、寄せ先は緑で光ります。`)),i.appendChild(r)}if(t.compMode==="object"){const r=fn("ミラー","MIRROR"),o=mt("div","row"),a=mt("div","segmented");for(const[c,l]of[[0,"X"],[1,"Y"],[2,"Z"]]){const h=mt("button","seg");h.textContent=l,h.setAttribute("aria-pressed",String(t.mirrorAxis===c)),h.addEventListener("click",()=>e.onMirrorAxisChange(c)),a.appendChild(h)}o.appendChild(a),r.appendChild(o),r.appendChild(mt("div","hint",`編集メニュー（オブジェクト）の「ミラー」で使う軸です。
境目の頂点は「マージ距離」で溶接します。`)),i.appendChild(r)}if(t.compMode==="vertex"){const r=fn("頂点","VERTEX");dn(r,{label:"マージ距離",value:t.vertex.mergeDist,min:.001,max:.5,step:.001,format:o=>o.toFixed(3),onInput:o=>e.onVertexOptChange("mergeDist",o)}),dn(r,{label:"押し出しの太さ",value:t.vertex.extrudeWidth,min:.05,max:.6,step:.01,onInput:o=>e.onVertexOptChange("extrudeWidth",o)}),r.appendChild(mt("div","hint",`マージ距離は「距離でマージ」で使うしきい値です。
押し出しの太さは、尖らせたときの根元の広がり（辺の長さに対する割合）です。`)),i.appendChild(r)}if(t.compMode!=="object"){const r=fn("ソフト選択","SOFT SELECT");dn(r,{label:"強度",value:t.soft.strength,min:0,max:1,step:.01,onInput:o=>e.onSoftChange("strength",o)}),dn(r,{label:"範囲",value:t.soft.radius,min:.05,max:6,step:.05,onInput:o=>e.onSoftChange("radius",o)}),i.appendChild(r)}if(n){const r=ps[n.kind];if(n.parametric&&r){const o=fn("入力ノード",r.en.toUpperCase()),a=mt("div","attr-title",n.name);a.appendChild(mt("span",void 0,r.en)),o.appendChild(a);for(const c of r.params)dn(o,{label:c.label,value:n.params[c.key]??c.value,min:c.min,max:c.max,step:c.step,onInput:l=>e.onParamInput(n,c.key,l),onCommit:()=>e.onParamCommit(n,`${c.label} を変更`)});o.appendChild(mt("div","hint",`パラメトリックなので、値を変えると作り直されます。
編集すると通常のメッシュになります。`)),i.appendChild(o)}else{const o=fn("メッシュ","MESH"),a=n.mesh.stats();o.appendChild(mt("div","attr-title",n.name)),o.appendChild(mt("div","hint",`頂点 ${a.vertices} · エッジ ${a.edges} · 面 ${a.faces}`)),i.appendChild(o)}}const s=fn("表示","DISPLAY");dn(s,{label:"スムージング角度",value:t.smoothAngle,min:0,max:180,step:1,format:r=>`${Math.round(r)}°`,onInput:r=>e.onSmoothAngleChange(r)}),i.appendChild(s),i.children.length||i.appendChild(mt("div","empty","選択すると内容が出ます"))}function nM(i,t,e,n){if(i.textContent="",!t.length){i.appendChild(mt("div","empty",`オブジェクトがありません
ツール列から追加してください`));return}for(const s of t){const r=mt("button","olrow");r.setAttribute("aria-selected",String(s===e)),r.appendChild(mt("i","dot")),r.appendChild(mt("span","nm",s.name)),r.appendChild(mt("span","ty",s.parametric?s.kind:"mesh")),iM(r,s,n),i.appendChild(r)}}function iM(i,t,e){let n=null,s=0,r=0,o=!1,a=0;i.addEventListener("touchstart",l=>l.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",l=>l.preventDefault()),i.addEventListener("pointerdown",l=>{if(s=l.clientX,r=l.clientY,o=!1,l.pointerType==="mouse"&&l.button===2){o=!0,e.onOutlinerMenu(t,l.clientX,l.clientY);return}n=setTimeout(()=>{o=!0,e.onOutlinerMenu(t,s,r)},420)});const c=()=>{n!==null&&clearTimeout(n),n=null};i.addEventListener("pointermove",l=>{Math.hypot(l.clientX-s,l.clientY-r)>12&&c()}),i.addEventListener("pointerup",()=>{if(c(),o)return;const l=performance.now();if(l-a<400){a=0,sM(i,t,e);return}a=l,e.onSelect(t)}),i.addEventListener("pointercancel",c)}function sM(i,t,e){const n=i.querySelector(".nm");if(!n)return;const s=mt("input","olinput");s.value=t.name,n.replaceWith(s),s.focus(),s.select();let r=!1;const o=a=>{if(r)return;r=!0,a&&s.value.trim()&&e.onRename(t,s.value.trim());const c=mt("span","nm",t.name);s.replaceWith(c)};s.addEventListener("blur",()=>o(!0)),s.addEventListener("keydown",a=>{a.key==="Enter"&&o(!0),a.key==="Escape"&&o(!1)})}const Tn=(i,t,e)=>({label:i,detail:t,note:e}),rM={sculpt:{kicker:"未実装 — v1.5 の中核",title:"スカルプト",body:"モデリングモードで作ったローモデルを、クリースとディバイドでハイメッシュ化します。ディバイドスライダーを下げてモデリングに戻り頂点を編集すると、ハイメッシュのディテールを保ったままローモデルを調整できます。左のゲージはそのまま「ブラシ強度」と「ブラシサイズ」に置き換わります。",items:[Tn("ブラシ","Standard / Clay / Move / Smooth / Pinch / Inflate / Flatten / Trim / Polish","11 種"),Tn("サブディビジョン","接空間デルタによるマルチ解像度スタック","docs/03"),Tn("マスキング","ペン描画、キャビティ、ポリグループ、裏面マスク","自前実装"),Tn("対称","X / Y / Z 軸対称と放射状対称","自前実装"),Tn("レイヤー","レベルごとのデルタバッファと強度スライダー","v1.5")]},material:{kicker:"未実装 — v2.0 予定",title:"マテリアル",body:"2D ビュー（UV 空間）と 3D ビューを同時に表示し、両方で同期してペイントします。Substance のファイル形式は非公開のため直接は読めません。書き出したテクスチャセットを命名規則で自動認識する方式で対応します。左のゲージは「不透明度」と「ブラシサイズ」に置き換わります。",items:[Tn("チャンネル","BaseColor / Roughness / Metallic / Normal / Height / AO / Emissive","7 種"),Tn("レイヤー","塗り、ペイント、マスク、フォルダ、ブレンドモード","自前実装"),Tn("ベイク","法線、AO、カーブチャ、厚み、ポジション、ID","2K 既定"),Tn("読み込み","テクスチャセット（PNG / TGA / EXR）と MaterialX",".sbsar 不可"),Tn("書き出し","テクスチャセット、glTF、MaterialX","自前実装")]}};function oM(i){const t=mt("div","stub"),e=mt("div","stub-in");e.appendChild(mt("div","kicker",i.kicker)),e.appendChild(mt("h2",void 0,i.title)),e.appendChild(mt("p",void 0,i.body));const n=mt("ul");for(const s of i.items){const r=mt("li");r.appendChild(mt("b",void 0,s.label)),r.appendChild(mt("span",void 0,s.detail)),r.appendChild(mt("em",void 0,s.note)),n.appendChild(r)}return e.appendChild(n),t.appendChild(e),t}const Xn={face:new vn({color:9411237,transparent:!0,opacity:.34,side:Ve,depthWrite:!1}),faceSel:new vn({color:15765820,transparent:!0,opacity:.45,side:Ve,depthWrite:!1}),wire:new Oe({color:13161179,transparent:!0,opacity:.75}),seam:new Oe({color:16739146}),wireSel:new Oe({color:15765820}),point:new xn({color:10321878,size:6,sizeAttenuation:!1}),pointSel:new xn({color:15765820,size:9,sizeAttenuation:!1}),pin:new xn({color:7139450,size:11,sizeAttenuation:!1}),border:new Oe({color:6253430})};function aM(i){const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d"),s=256/i;for(let o=0;o<i;o++)for(let a=0;a<i;a++)n.fillStyle=(a+o)%2===0?"#3a4149":"#2b3138",n.fillRect(a*s,o*s,s,s);const r=new ou(e);return r.wrapS=Ui,r.wrapT=Ui,r.magFilter=Ce,r}class cM{constructor(t,e){this.container=t,this.renderer=new Su({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(2106410,1),this.scene.add(this.group),this.buildBackground(),this.resize()}renderer;scene=new za;camera=new Xs(-.2,1.2,1.2,-.2,-10,10);center={u:.5,v:.5};span=1.4;checkerCells=8;group=new za;topology=null;frame=0;background=null;buildBackground(){this.background&&(this.scene.remove(this.background),this.background.geometry.dispose(),this.background.material.map?.dispose(),this.background.material.dispose());const t=new Ws(1,1);t.translate(.5,.5,0);const e=new vn({map:aM(this.checkerCells)}),n=new ye(t,e);n.position.z=-1,this.scene.add(n),this.background=n;const s=new he;s.setAttribute("position",new jt([0,0,0,1,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,1,0,0,0,0],3));const r=new mi(s,Xn.border);r.position.z=-.5,this.scene.add(r)}setCheckerCells(t){this.checkerCells=t,this.buildBackground()}get cells(){return this.checkerCells}resize(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.applyCamera()}applyCamera(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1,n=t/e,s=this.span/2,r=s*n;this.camera.left=this.center.u-r,this.camera.right=this.center.u+r,this.camera.top=this.center.v+s,this.camera.bottom=this.center.v-s,this.camera.updateProjectionMatrix()}pixelToUv(){const t=this.container.clientHeight||1;return this.span/t}pan(t,e){const n=this.pixelToUv();this.center.u-=t*n,this.center.v+=e*n,this.applyCamera()}zoom(t){this.span=Math.max(.02,Math.min(20,this.span*t)),this.applyCamera()}frameUnit(){this.center={u:.5,v:.5},this.span=1.4,this.applyCamera()}framepoints(t){if(!t.length)return this.frameUnit();let e=1/0,n=1/0,s=-1/0,r=-1/0;for(const o of t)e=Math.min(e,o.u),s=Math.max(s,o.u),n=Math.min(n,o.v),r=Math.max(r,o.v);this.center={u:(e+s)/2,v:(n+r)/2},this.span=Math.max(.05,Math.max(s-e,r-n)*1.5),this.applyCamera()}toUv(t){const e=this.container.clientWidth||1,n=this.container.clientHeight||1;return{u:this.camera.left+t.x/e*(this.camera.right-this.camera.left),v:this.camera.top-t.y/n*(this.camera.top-this.camera.bottom)}}toScreen(t,e){const n=this.container.clientWidth||1,s=this.container.clientHeight||1;return{x:(t-this.camera.left)/(this.camera.right-this.camera.left)*n,y:(this.camera.top-e)/(this.camera.top-this.camera.bottom)*s}}get uvTopology(){return this.topology}build(t,e){for(const m of this.group.children.slice())this.group.remove(m),(m instanceof ye||m instanceof mi||m instanceof _n)&&m.geometry.dispose();if(this.topology=null,!t)return;const n=t.mesh,s=n.uvSets.get(An);if(!s)return;const r=e?.seams??new Set,o=Sc(n,r),a=[],c=[],l=[],h=new Map,u=new Map;o.forEach((m,p)=>{for(const M of m.faces)u.set(M,p);const _=bc(n,m,r),y=a.length;for(let M=0;M<_.count;M++)a.push([]),c.push(0,0),l.push(p);for(const M of m.corners){const w=y+_.localOf.get(M);a[w].push(M),h.set(M,w);const b=nn(n,M);c[w*2]=s[b*2],c[w*2+1]=s[b*2+1]}});const f=[],d=[],g=[],v=new Set;for(let m=0;m<n.faceCount;m++){const p=n.faceVerts(m),_=u.get(m)??0;for(let y=0;y<p.length;y++){const M=h.get(Yn(m,y)),w=h.get(Yn(m,(y+1)%p.length));if(M===void 0||w===void 0)continue;const b=`${Math.min(M,w)}_${Math.max(M,w)}`;if(v.has(b))continue;v.add(b),f.push([M,w]),d.push(_);const A=p[y],x=p[(y+1)%p.length];g.push(`${Math.min(A,x)}_${Math.max(A,x)}`)}}this.topology={charts:o,vertexCorners:a,vertexUv:Float32Array.from(c),vertexChart:Int32Array.from(l),edges:f,edgeChart:Int32Array.from(d),edgeKeys:g,cornerToVertex:h,chartOfFace:u},this.draw(t,r)}draw(t,e){const n=this.topology,s=t.mesh,r=[],o=[];for(let g=0;g<n.vertexUv.length/2;g++)r.push(n.vertexUv[g*2],n.vertexUv[g*2+1],0);for(let g=0;g<s.faceCount;g++){const v=s.faceSize(g),m=[];for(let p=0;p<v;p++){const _=this.vertexOfCorner(Yn(g,p));_>=0&&m.push(_)}if(!(m.length<3))for(let p=1;p<m.length-1;p++)o.push(m[0],m[p],m[p+1])}const a=new he;a.setAttribute("position",new jt(r,3)),a.setIndex(o);const c=new ye(a,Xn.face);c.renderOrder=0,this.group.add(c);const l=[],h=[];n.edges.forEach(([g,v],m)=>{(e.has(n.edgeKeys[m])?h:l).push(n.vertexUv[g*2],n.vertexUv[g*2+1],.01,n.vertexUv[v*2],n.vertexUv[v*2+1],.01)});for(const[g,v]of[[l,Xn.wire],[h,Xn.seam]]){if(!g.length)continue;const m=new he;m.setAttribute("position",new jt(g,3));const p=new mi(m,v);p.renderOrder=1,this.group.add(p)}const u=[];for(let g=0;g<n.vertexUv.length/2;g++)u.push(n.vertexUv[g*2],n.vertexUv[g*2+1],.02);const f=new he;f.setAttribute("position",new jt(u,3));const d=new _n(f,Xn.point);d.renderOrder=2,this.group.add(d)}vertexOfCorner(t){return this.topology?.cornerToVertex.get(t)??-1}overlay=[];highlight(t,e,n,s){for(const o of this.overlay)this.group.remove(o),o.geometry.dispose();this.overlay=[];const r=this.topology;if(!(!r||!s)){if(t==="vertex"&&e.size){const o=[];for(const a of e)o.push(r.vertexUv[a*2],r.vertexUv[a*2+1],.05);this.addOverlay(new _n(Rr(o),Xn.pointSel))}if(t==="edge"&&e.size){const o=[];for(const a of e){const[c,l]=r.edges[a]??[0,0];o.push(r.vertexUv[c*2],r.vertexUv[c*2+1],.05,r.vertexUv[l*2],r.vertexUv[l*2+1],.05)}this.addOverlay(new mi(Rr(o),Xn.wireSel))}if(t==="shell"&&e.size){const o=[],a=[];for(const l of e){const h=r.charts[l];if(h)for(const u of h.faces){const f=s.mesh.faceSize(u),d=[];for(let g=0;g<f;g++){const v=this.vertexOfCorner(Yn(u,g));v<0||(d.push(o.length/3),o.push(r.vertexUv[v*2],r.vertexUv[v*2+1],.04))}for(let g=1;g<d.length-1;g++)a.push(d[0],d[g],d[g+1])}}const c=Rr(o);c.setIndex(a),this.addOverlay(new ye(c,Xn.faceSel))}if(n.size){const o=[];for(const a of n)o.push(r.vertexUv[a*2],r.vertexUv[a*2+1],.06);this.addOverlay(new _n(Rr(o),Xn.pin))}}}addOverlay(t){t.renderOrder=5,this.group.add(t),this.overlay.push(t)}pickVertex(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t),r=e*this.pixelToUv();let o=-1,a=r;for(let c=0;c<n.vertexUv.length/2;c++){const l=Math.hypot(n.vertexUv[c*2]-s.u,n.vertexUv[c*2+1]-s.v);l<a&&(a=l,o=c)}return o}pickEdge(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t),r=e*this.pixelToUv();let o=-1,a=r;return n.edges.forEach(([c,l],h)=>{const u=n.vertexUv[c*2],f=n.vertexUv[c*2+1],d=n.vertexUv[l*2],g=n.vertexUv[l*2+1],v=d-u,m=g-f,p=v*v+m*m,_=p>1e-12?Math.max(0,Math.min(1,((s.u-u)*v+(s.v-f)*m)/p)):0,y=Math.hypot(u+v*_-s.u,f+m*_-s.v);y<a&&(a=y,o=h)}),o}pickFace(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t);for(let r=0;r<e.mesh.faceCount;r++){const o=e.mesh.faceSize(r),a=[];for(let c=0;c<o;c++){const l=this.vertexOfCorner(Yn(r,c));l<0||a.push([n.vertexUv[l*2],n.vertexUv[l*2+1]])}if(a.length>=3&&lM(a,s.u,s.v))return r}return-1}start(){const t=()=>{this.frame=requestAnimationFrame(t),this.renderer.render(this.scene,this.camera)};this.frame||t()}stop(){this.frame&&cancelAnimationFrame(this.frame),this.frame=0}}function Rr(i){const t=new he;return t.setAttribute("position",new jt(i,3)),t}function lM(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++){const[o,a]=i[s],[c,l]=i[r];a>e!=l>e&&t<(c-o)*(e-a)/(l-a)+o&&(n=!n)}return n}const hM=20,uM=14;class fM{constructor(t,e,n){this.pane=t,this.host=n,this.view=new cM(t,e),this.router=new $u(e,s=>this.local(s),this.handlers()),this.router.attach()}view;router;unit="shell";chosen=new Set;pinned=new Set;drag=null;gesture=null;local(t){const e=this.pane.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}start(){this.view.start()}stop(){this.view.stop()}resize(){this.view.resize()}stats(){const t=this.host.object(),e=this.host.recipe(),n={vertex:"UV 頂点",edge:"UV エッジ",shell:"UV シェル"}[this.unit];if(!t||!e)return{charts:0,maxStretch:1,unit:n};let s=1;const r=this.view.uvTopology;if(r)for(const o of r.charts){const a=bc(t.mesh,o,e.seams),c=t.mesh.uvSets.get(An);if(!c)continue;const l=new Float64Array(a.count*2);for(const h of o.corners){const u=a.localOf.get(h),f=nn(t.mesh,h);l[u*2]=c[f*2],l[u*2+1]=c[f*2+1]}s=Math.max(s,Ru(a.positions,a.tri,l).maxStretch)}return{charts:r?.charts.length??0,maxStretch:s,unit:n}}rebuild(){const t=this.host.object();this.view.build(t,this.host.recipe()),this.syncPins(),this.refreshHighlight()}refreshHighlight(){this.view.highlight(this.unit,this.chosen,this.pinned,this.host.object())}setUnit(t){this.unit!==t&&(this.unit=t,this.chosen.clear(),this.refreshHighlight(),this.host.changed(null))}syncPins(){this.pinned.clear();const t=this.view.uvTopology,e=this.host.recipe();if(!(!t||!e))for(const n of e.pins.keys()){const s=t.cornerToVertex.get(n);s!==void 0&&this.pinned.add(s)}}syncFromView(t){const e=this.view.uvTopology;if(e){this.unit="shell",this.chosen.clear();for(const n of t){const s=e.chartOfFace.get(n);s!==void 0&&this.chosen.add(s)}this.refreshHighlight()}}facesOfSelection(){const t=this.view.uvTopology;if(!t)return[];const e=new Set;if(this.unit==="shell")for(const n of this.chosen)for(const s of t.charts[n]?.faces??[])e.add(s);else{const n=[];if(this.unit==="vertex")for(const s of this.chosen)n.push(...t.vertexCorners[s]??[]);else for(const s of this.chosen){const[r,o]=t.edges[s]??[-1,-1];n.push(...t.vertexCorners[r]??[],...t.vertexCorners[o]??[])}for(const s of n)e.add(Number(s.slice(0,s.indexOf(":"))))}return[...e].sort((n,s)=>n-s)}selectedCorners(){const t=this.view.uvTopology;if(!t)return{corners:[],chart:-1};const e=[];let n=-1;const s=r=>{n<0&&(n=r)};if(this.unit==="shell")for(const r of this.chosen){s(r);for(const o of t.charts[r]?.corners??[])e.push(o)}else if(this.unit==="vertex")for(const r of this.chosen)s(t.vertexChart[r]),e.push(...t.vertexCorners[r]??[]);else for(const r of this.chosen){s(t.edgeChart[r]);const[o,a]=t.edges[r]??[-1,-1];e.push(...t.vertexCorners[o]??[],...t.vertexCorners[a]??[])}return{corners:[...new Set(e)],chart:n}}captureBase(t){const e=this.host.object(),n=new Map;if(!e)return n;const s=e.mesh.uvSets.get(An);if(!s)return n;for(const r of t){const o=nn(e.mesh,r);o>=0&&n.set(r,[s[o*2],s[o*2+1]])}return n}applyOffset(t,e,n,s=1){const r=this.host.object();if(!r)return;const o=r.mesh.uvSets.get(An);if(!o)return;let a=0,c=0;for(const[,l]of t)a+=l[0],c+=l[1];t.size&&(a/=t.size,c/=t.size);for(const[l,h]of t){const u=nn(r.mesh,l);u<0||(o[u*2]=a+(h[0]-a)*s+e,o[u*2+1]=c+(h[1]-c)*s+n)}this.rebuildGeometryOnly()}recordFrom(t,e){const n=this.host.object(),s=this.host.recipe(),r=this.view.uvTopology;if(!n||!s||!r||e<0)return!1;const o=n.mesh.uvSets.get(An),a=r.charts[e]?.fingerprint;if(!o||!a)return!1;const c=new Map;let l=!1;for(const[h,u]of t){const f=nn(n.mesh,h);if(f<0)continue;const d=o[f*2]-u[0],g=o[f*2+1]-u[1];Math.abs(d)<1e-9&&Math.abs(g)<1e-9||(c.set(h,[d,g]),l=!0)}return l&&cx(s,a,c),l}rebuildGeometryOnly(){this.view.build(this.host.object(),this.host.recipe()),this.refreshHighlight()}unfold(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;const n=this.host.snapshot(),s=qa(t.mesh,e);this.host.commit("展開",n),this.rebuild(),this.host.changed(`展開 — 島 ${s.charts.length} / 伸び ×${s.maxStretch.toFixed(2)}`)}cutOrSew(t){const e=this.host.recipe(),n=this.view.uvTopology;if(!e||!n)return;if(this.unit!=="edge"||!this.chosen.size){this.host.toast("UV エッジを選んでから実行してください");return}const s=this.host.snapshot();let r=0;for(const a of this.chosen){const c=n.edgeKeys[a];c&&(t?!e.seams.has(c):e.seams.has(c))&&(t?e.seams.add(c):e.seams.delete(c),r++)}if(!r){this.host.toast(t?"すでに切れています":"切れ目ではありません");return}const o=this.host.object();qa(o.mesh,e),this.host.commit(t?"カット":"ソー",s),this.chosen.clear(),this.rebuild(),this.host.changed(`${t?"カット":"ソー"} — ${r} 本`)}pinOrUnpin(t){const e=this.host.object(),n=this.host.recipe(),s=this.view.uvTopology;if(!e||!n||!s)return;if(this.unit!=="vertex"||!this.chosen.size){this.host.toast("UV 頂点を選んでから実行してください");return}const r=e.mesh.uvSets.get(An);if(!r)return;const o=this.host.snapshot();for(const a of this.chosen)for(const c of s.vertexCorners[a]??[])if(t){const l=nn(e.mesh,c);n.pins.set(c,[r[l*2],r[l*2+1]])}else n.pins.delete(c);this.host.commit(t?"ピン":"ピン解除",o),this.syncPins(),this.refreshHighlight(),this.host.changed(`${t?"ピン":"ピン解除"} — ${this.chosen.size} 点`)}transformSelection(t){const e=this.host.object();if(!e)return;const{corners:n,chart:s}=this.selectedCorners();if(!n.length){this.host.toast("選択してから実行してください");return}const r=e.mesh.uvSets.get(An);if(!r)return;const o=this.host.snapshot(),a=this.captureBase(n);let c=0,l=0;for(const[,h]of a)c+=h[0],l+=h[1];c/=a.size,l/=a.size;for(const[h,u]of a){const f=nn(e.mesh,h),d=u[0]-c,g=u[1]-l;t==="flipU"?r[f*2]=c-d:t==="flipV"?r[f*2+1]=l-g:(r[f*2]=c-g,r[f*2+1]=l+d)}this.recordFrom(a,s),this.host.commit({flipU:"反転 U",flipV:"反転 V",rotate90:"90° 回転"}[t],o),this.rebuildGeometryOnly(),this.host.changed(null)}handlers(){return{toolDown:(t,e)=>this.down(t,e),toolMove:t=>this.move(t),toolUp:(t,e,n)=>this.up(t,e,n),hover:()=>{},hoverLeave:()=>{},openMarkingMenu:(t,e,n)=>this.host.markingMenu(t,e,n),openTwoFingerMenu:(t,e)=>this.host.markingMenu(t,e,!0),openCameraMenu:(t,e)=>this.host.cameraMenu(t,e),undo:()=>this.host.undo(),redo:()=>this.host.redo(),abort:()=>{this.drag=null,this.gesture=null},transformBegin:()=>this.gestureBegin(),transformUpdate:t=>this.gestureUpdate(t),transformEnd:()=>this.gestureEnd(),isOnMesh:()=>!0,zoomPivot:()=>null,marqueeStart:()=>{},tumble:()=>{},pan:(t,e)=>this.view.pan(t,e),dolly:t=>this.view.zoom(t),dollyAbout:(t,e)=>this.view.zoom(e),shiftOn:t=>this.host.shiftOn(t),altOn:()=>!1}}down(t,e){const n=this.host.object();if(!n)return;const s=this.pick(t,n),r=this.host.shiftOn(e),o=this.host.ctrlOn(e);if(s>=0&&this.chosen.has(s)&&!r&&!o){this.beginDrag(t);return}if(s<0){!r&&!o&&(this.chosen.clear(),this.refreshHighlight(),this.host.syncToView([]));return}o?this.chosen.delete(s):(r||this.chosen.clear(),this.chosen.add(s)),this.refreshHighlight(),this.host.syncToView(this.facesOfSelection()),this.beginDrag(t)}pick(t,e){if(this.unit==="vertex")return this.view.pickVertex(t,hM);if(this.unit==="edge")return this.view.pickEdge(t,uM);const n=this.view.pickFace(t,e);return n<0?-1:this.view.uvTopology?.chartOfFace.get(n)??-1}beginDrag(t){const{corners:e,chart:n}=this.selectedCorners();e.length&&(this.drag={start:t,base:this.captureBase(e),chart:n,snapshot:this.host.snapshot(),moved:!1})}move(t){const e=this.drag;if(!e)return;const n=this.view.pixelToUv(),s=(t.x-e.start.x)*n,r=-(t.y-e.start.y)*n;(Math.abs(s)>1e-9||Math.abs(r)>1e-9)&&(e.moved=!0),this.applyOffset(e.base,s,r),this.host.hint(`移動 <kbd>${s.toFixed(3)}, ${r.toFixed(3)}</kbd>`)}up(t,e,n){const s=this.drag;this.drag=null,!(!s||!s.moved)&&(this.recordFrom(s.base,s.chart)&&this.host.commit("UV を移動",s.snapshot),this.host.changed(null))}gestureBegin(){const{corners:t,chart:e}=this.selectedCorners();return t.length?(this.gesture={base:this.captureBase(t),chart:e,snapshot:this.host.snapshot(),moved:!1},!0):!1}gestureUpdate(t){const e=this.gesture;if(!e)return;e.moved=!0;const n=this.view.pixelToUv();if(t.kind==="scale"){this.applyOffset(e.base,0,0,Math.max(.02,t.scale)),this.host.hint(`スケール <kbd>×${t.scale.toFixed(2)}</kbd> · 指 3 本`);return}const s=t.axis==="horizontal"?t.pixels*n:0,r=t.axis==="vertical"?-t.pixels*n:0;this.applyOffset(e.base,s,r),this.host.hint(`移動 <kbd>${t.axis==="vertical"?"V":"U"} ${(s+r).toFixed(3)}</kbd> · 指 3 本`)}gestureEnd(){const t=this.gesture;this.gesture=null,!(!t||!t.moved)&&(this.recordFrom(t.base,t.chart)&&this.host.commit("UV を変形",t.snapshot),this.host.changed(null))}frame(){const t=this.view.uvTopology,{corners:e}=this.selectedCorners(),n=this.host.object();if(!t||!n||!e.length)return this.view.frameUnit();const s=n.mesh.uvSets.get(An);if(!s)return this.view.frameUnit();this.view.framepoints(e.map(r=>{const o=nn(n.mesh,r);return{u:s[o*2],v:s[o*2+1]}}))}}const tt={move:'<path d="M12 3v18M3 12h18M12 3l-2.6 2.6M12 3l2.6 2.6M12 21l-2.6-2.6M12 21l2.6-2.6M3 12l2.6-2.6M3 12l2.6 2.6M21 12l-2.6-2.6M21 12l-2.6 2.6"/>',rotate:'<path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4"/><path d="M20.5 3.6v5h-5"/>',scale:'<path d="M5 19 18 6"/><path d="M12.5 6H18v5.5"/><rect x="3.2" y="15.2" width="5.6" height="5.6" rx=".8"/>',multicut:'<circle cx="5.5" cy="5.5" r="2.3"/><circle cx="5.5" cy="18.5" r="2.3"/><path d="M7.4 6.8 20 18M7.4 17.2 20 6"/>',extrude:'<path d="M4.5 13.5h8v7h-8z"/><path d="m4.5 13.5 4-4h8v7M12.5 13.5l4-4"/><path d="M20 3v5m0-5-1.8 1.8M20 3l1.8 1.8"/>',prim:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',camera:'<path d="M3.4 8.4h3.2l1.6-2.4h7.6l1.6 2.4h3.2v9.8a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1z"/><circle cx="12" cy="13" r="3.4"/>',shade:'<circle cx="12" cy="12" r="8.8"/><path d="M12 3.2a8.8 8.8 0 0 1 0 17.6z" fill="currentColor" fill-opacity=".5"/>',vObj:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/>',vVert:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="6" r="2" fill="currentColor"/><circle cx="6" cy="18" r="2" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/>',vEdge:'<rect x="6" y="6" width="12" height="12"/><path d="M6 6h12" stroke-width="3.4"/>',vFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".45"/>',vVertFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".2"/><circle cx="8.6" cy="8.6" r="2.1" fill="currentColor"/>',vMulti:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="1.9" fill="currentColor"/><path d="M6 18h12" stroke-width="3"/>',wire:'<rect x="4" y="4" width="16" height="16"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',shaded:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".5"/>',shadedWire:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".3"/><path d="M4 12h16M12 4v16"/>',smooth:'<circle cx="12" cy="12" r="8.6" fill="currentColor" fill-opacity=".5"/><path d="M8 15.4a6 6 0 0 1 5-6.6"/>',sym:'<path d="M12 3v18" stroke-dasharray="2.4 2.4"/><path d="M9.4 7 4.5 12l4.9 5zM14.6 7l4.9 5-4.9 5z"/>',xform:'<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="6.5"/><rect x="16.6" y="16.6" width="4.2" height="4.2"/><path d="M12 3l-2 2M12 3l2 2M3 12l2-2M3 12l2 2"/>',snap:'<path d="M6 20V10a6 6 0 0 1 12 0v10"/><path d="M6 15h4v5H6zM14 15h4v5h-4z"/>',rename:'<path d="M4 20h16"/><path d="M15.4 4.6 19 8.2 8.6 18.6 4.4 19.6l1-4.2z"/>',dup:'<rect x="3.6" y="3.6" width="12" height="12" rx="1"/><path d="M8.4 20.4h12v-12"/>',del:'<path d="M4 6.6h16M9.4 6.6V4.4h5.2v2.2M6.4 6.6l1 13.2a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l1-13.2"/>',frame:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3"/>',mModel:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',mUV:'<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="1"/><path d="M3.4 12h17.2M12 3.4v17.2" stroke-dasharray="2.6 2.2"/>',mSculpt:'<path d="M16.4 3.6 20.4 7.6 9.6 18.4l-5.2 1.2 1.2-5.2z"/><path d="m14.4 5.6 4 4"/>',mMaterial:'<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a8.6 8.6 0 0 1 0 17.2z" fill="currentColor" fill-opacity=".45"/><path d="M3.4 12h17.2"/>',pCube:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',pSphere:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',pCylinder:'<ellipse cx="12" cy="5.6" rx="7" ry="2.8"/><path d="M5 5.6v12.8M19 5.6v12.8"/><path d="M5 18.4a7 2.8 0 0 0 14 0"/>',pCone:'<path d="M12 3 19 18.4M12 3 5 18.4"/><ellipse cx="12" cy="18.4" rx="7" ry="2.8"/>',pTorus:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><ellipse cx="12" cy="12" rx="3.6" ry="1.9"/>',pPlane:'<path d="M2.6 16.4 9.4 6.6h12L14.6 16.4z"/><path d="M6 11.5h12"/>',pDisk:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><path d="M2.8 12h18.4"/>',pPlatonic:'<path d="m12 2.8 8.8 6.4-3.4 10.4H6.6L3.2 9.2z"/><path d="M12 2.8v16.8M3.2 9.2l13.8 10M20.8 9.2 7 19.2"/>'};function dM(i,t=18,e=1.6){return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">${i}</svg>`}const pM=["N","NE","E","SE","S","SW","W","NW"],is="http://www.w3.org/2000/svg",Ci=176,Zo=56,mM=42,sc=208,Ds=32,Oh=14;let Le=null;function gM(i,t,e,n,s,r){const o=i+Math.cos(s)*n,a=t+Math.sin(s)*n,c=i+Math.cos(r)*n,l=t+Math.sin(r)*n,h=i+Math.cos(r)*e,u=t+Math.sin(r)*e,f=i+Math.cos(s)*e,d=t+Math.sin(s)*e;return`M${o},${a}A${n},${n} 0 0 1 ${c},${l}L${h},${u}A${e},${e} 0 0 0 ${f},${d}Z`}function Pr(i,t,e,n){const s=document.createElementNS(is,"text");return i&&s.setAttribute("class",i),s.setAttribute("x",String(t)),s.setAttribute("y",String(e)),s.setAttribute("text-anchor","middle"),s.textContent=n,s}function $n(i,t,e,n=[]){Cc();const s=n.length?Oh+n.length*Ds:0,r=Math.max(Ci+16,Math.min(window.innerWidth-Ci-16,t)),o=Math.max(Ci+16,Math.min(window.innerHeight-Ci-s-16,e)),a=document.createElement("div");a.className="radial",a.addEventListener("touchstart",d=>d.preventDefault(),{passive:!1}),a.addEventListener("touchmove",d=>d.preventDefault(),{passive:!1});const c=document.createElementNS(is,"svg");a.appendChild(c),document.body.appendChild(a);const l=[];for(let d=0;d<8;d++){const g=i[pM[d]],v=(d*45-22.5-90)*Math.PI/180,m=(d*45+22.5-90)*Math.PI/180,p=document.createElementNS(is,"path");if(p.setAttribute("d",gM(r,o,Zo,Ci,v,m)),p.setAttribute("fill",g?"#2c3238":"#23272c"),p.setAttribute("stroke","#171a1e"),p.setAttribute("stroke-width","1"),p.setAttribute("opacity",g?"1":".45"),c.appendChild(p),!g){l.push(null);continue}const _=(v+m)/2,y=(Zo+Ci)/2,M=r+Math.cos(_)*y,w=o+Math.sin(_)*y,b=document.createElementNS(is,"g");b.setAttribute("transform",`translate(${M-12},${w-28}) scale(1)`),b.setAttribute("fill","none"),b.setAttribute("stroke","#dfe5ea"),b.setAttribute("stroke-width","1.6"),b.setAttribute("stroke-linecap","round"),b.setAttribute("stroke-linejoin","round"),b.innerHTML=g.icon??"",c.appendChild(b),c.appendChild(Pr(null,M,w+12,g.label)),c.appendChild(Pr("sub",M,w+26,g.sub??"")),l.push({path:p,icon:b,item:g,index:d})}const h=document.createElementNS(is,"circle");h.setAttribute("cx",String(r)),h.setAttribute("cy",String(o)),h.setAttribute("r",String(Zo-2)),h.setAttribute("fill","#20242a"),h.setAttribute("stroke","#3d454e"),c.appendChild(h),c.appendChild(Pr("sub",r,o+4,"キャンセル"));const u=[],f=o+Ci+Oh;n.forEach((d,g)=>{const v=f+g*Ds,m=document.createElementNS(is,"rect");m.setAttribute("x",String(r-sc/2)),m.setAttribute("y",String(v)),m.setAttribute("width",String(sc)),m.setAttribute("height",String(Ds)),m.setAttribute("fill","#2c3238"),m.setAttribute("stroke","#171a1e"),c.appendChild(m);const p=Pr(null,r,v+Ds/2+5,d.label);c.appendChild(p),u.push({rect:m,label:p,item:d,top:v})}),Le={host:a,slices:l,rows:u,cx:r,cy:o,selected:-1,selectedRow:-1},window.addEventListener("pointermove",Ju),window.addEventListener("pointerup",$r),window.addEventListener("pointercancel",$r)}function Ju(i){if(!Le)return;const t=i.clientX-Le.cx,e=i.clientY-Le.cy;let n=-1;Math.abs(t)<=sc/2&&(n=Le.rows.findIndex(r=>i.clientY>=r.top&&i.clientY<r.top+Ds)),n!==Le.selectedRow&&(Le.rows.forEach((r,o)=>r.rect.setAttribute("fill",o===n?"#2f5f7d":"#2c3238")),Le.selectedRow=n,n>=0&&navigator.vibrate?.(6));let s=-1;if(n<0&&Math.hypot(t,e)>=mM){const r=(Math.atan2(e,t)*180/Math.PI+90+360+22.5)%360,o=Math.floor(r/45);Le.slices[o]&&(s=o)}if(s!==Le.selected){for(const r of Le.slices){if(!r)continue;const o=r.index===s;r.path.setAttribute("fill",o?"#2f5f7d":"#2c3238"),r.path.setAttribute("stroke",o?"#4f9fd1":"#171a1e"),r.icon.setAttribute("stroke",o?"#ffffff":"#dfe5ea")}Le.selected=s,s>=0&&navigator.vibrate?.(6)}}function $r(){if(!Le)return;const{selected:i,selectedRow:t,slices:e,rows:n}=Le;Cc(),t>=0?n[t]?.item.run():i>=0&&e[i]?.item.run()}function Cc(){Le&&(window.removeEventListener("pointermove",Ju),window.removeEventListener("pointerup",$r),window.removeEventListener("pointercancel",$r),Le.host.remove(),Le=null)}function kh(i,t,e){let n=null,s=!1,r=0,o=0,a=null;const c=()=>{n!==null&&clearTimeout(n),n=null};i.addEventListener("touchstart",u=>u.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",u=>u.preventDefault()),i.addEventListener("pointerdown",u=>{if(u.preventDefault(),a=u.pointerId,r=u.clientX,o=u.clientY,s=!1,u.pointerType==="mouse"&&u.button===2){s=!0,$n(t(),r,o);return}n=setTimeout(()=>{s=!0,$n(t(),r,o)},200)});const l=u=>{u.pointerId===a&&Math.hypot(u.clientX-r,u.clientY-o)>12&&c()},h=u=>{u.pointerId===a&&(c(),a=null,s||e?.(),s=!1)};window.addEventListener("pointermove",l),window.addEventListener("pointerup",h),window.addEventListener("pointercancel",h)}const Jo=[{id:"object",label:"オブジェクト",key:"F8"},{id:"vertex",label:"頂点",key:"F9"},{id:"edge",label:"エッジ",key:"F10"},{id:"face",label:"フェース",key:"F11"}],Cs={grid:"グリッド",vertex:"頂点",edge:"カーブ / エッジ",surface:"サーフェス"},vM={4:"wire",5:"shaded",6:"shadedWire",7:"smooth",8:"checker"},ns={model:"モデリング",uv:"UV",sculpt:"スカルプト",material:"マテリアル"},xM={object:tt.vObj,vertex:tt.vVert,edge:tt.vEdge,face:tt.vFace},_M={cube:tt.pCube,sphere:tt.pSphere,cylinder:tt.pCylinder,cone:tt.pCone,torus:tt.pTorus,plane:tt.pPlane,disk:tt.pDisk,platonic:tt.pPlatonic};class MM{state=new y_;history=new b_(this.state);viewport;picker;selector;autosave=new P_(this.state);hud=new Q_(this.state);gauges=[];marqueeEl=Lt("marquee");marquee=null;popup=null;router;manipulator;multicut;preselect;bevel=new N_;weldTarget=null;gestureDrag=null;uv=null;uvSplit="both";gestureView=null;gestureMoved=!1;bevelSnapshot=null;docking;layout;zones={tools:"left",options:"rightTop",outliner:"rightBottom"};toolPanelBody=null;optionsBody=null;outlinerBody=null;paramSnapshot=null;drag=null;dragSnapshot=null;raycaster=new fu;constructor(){const t=Lt("pane3d"),e=Lt("gl");this.viewport=new m_(t,e,this.state),this.picker=new f_(this.viewport,t),this.selector=new G_(this.state,this.picker,n=>{const s=this.state.doc.find(n);return s?this.viewport.viewOf(s):void 0}),this.multicut=new O_(this.state,this.picker,this.viewport.preview),this.preselect=new z_(this.state,this.picker,this.viewport.preselect),this.viewport.softWeightsProvider=()=>{const n=this.state.selected;return n?Dh(n.mesh,this.selector.selectedVertices(),{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0}).weights:new Map},this.manipulator=new __({toScreen:n=>{const s=n.clone().project(this.viewport.camera);return{x:(s.x+1)/2*(t.clientWidth||1),y:(-s.y+1)/2*(t.clientHeight||1),z:s.z}},camera:()=>this.viewport.camera,orthoDistance:()=>this.state.camOpts.ortho?this.viewport.cam.distance:null}),this.viewport.manip.add(this.manipulator.group),this.history.onChange=()=>{this.updateHistoryButtons(),this.autosave.schedule()},this.autosave.onSaved=n=>this.hud.setSaveNote(`自動保存 ${new Date(n).toLocaleTimeString("ja-JP",{timeStyle:"short"})}`),this.autosave.onError=n=>this.hud.toast(n),this.router=new $u(e,n=>this.picker.local(n),this.gestureHandlers()),this.router.attach(),this.docking=new q_(Lt("stage"),{onZoneChange:(n,s)=>{this.zones[n]=s,localStorage.setItem("macbeth.panelZones",JSON.stringify(this.zones))},onMessage:n=>this.hud.toast(n),onLayoutChange:()=>{this.layout?.apply(),this.viewport.resize()}});try{const n=localStorage.getItem("macbeth.panelZones");n&&(this.zones={...this.zones,...JSON.parse(n)})}catch{}this.buildToolDock(),this.buildPanels(),this.layout=new Z_(Lt("stage"),Lt("dockColRight"),()=>this.viewport.resize()),this.buildGauges(),this.buildCluster(),this.bindKeyboard(),this.bindTopBar(),window.addEventListener("resize",()=>this.viewport.resize()),this.viewport.resize(),this.viewport.start()}async boot(){const t=await this.autosave.restore();t||this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]??null),this.viewport.syncAll(),this.refresh(),this.hud.defaultHint(),t?this.hud.toast("前回の続きを復元しました"):this.hud.setSaveNote(D_())}gestureHandlers(){return{toolDown:(t,e)=>this.startTool(t,e),toolMove:(t,e)=>this.moveTool(t,e),toolUp:(t,e,n)=>this.finishTool(t,e,n),hover:(t,e)=>{this.updateCutPreview(t,e),this.updatePreselect(t,e)},hoverLeave:()=>{this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},openMarkingMenu:(t,e,n)=>this.openMarkingMenu(t,e,n),openTwoFingerMenu:(t,e)=>this.openTwoFingerMenu(t,e),openCameraMenu:(t,e)=>{this.closePopup(),$n(this.cameraMenu(),t,e,this.savedCameraItems())},undo:()=>this.doUndo(),redo:()=>this.doRedo(),abort:()=>{this.endMarquee(),this.drag=null,this.dragSnapshot=null,this.manipulator.hot=-1,this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},isOnMesh:(t,e)=>{const n=this.tolerance(e);return this.state.selected&&this.manipulator.pick(t,this.pivotWorld(),this.state.manip,n)>=0?!0:this.hitSelectedComponent(t,n)||!!this.picker.pickSurface(t)},zoomPivot:()=>this.pivotWorld(),marqueeStart:t=>this.startMarquee(t),tumble:(t,e)=>this.viewport.tumble(t,e),pan:(t,e)=>this.viewport.pan(t,e),dolly:t=>this.viewport.dolly(t),dollyAbout:(t,e)=>this.viewport.dollyAbout(t,e),transformBegin:()=>this.beginGestureTransform(),transformUpdate:t=>this.updateGestureTransform(t),transformEnd:()=>this.endGestureTransform(),shiftOn:t=>this.state.modOn("shift")||t.shiftKey,altOn:t=>this.state.modOn("alt")||t.altKey}}eulerOf(t){const e=new On().setFromQuaternion(new je(t[0],t[1],t[2],t[3]),"XYZ"),n=180/Math.PI;return[e.x*n,e.y*n,e.z*n]}pixelToWorldAt(t){const e=new I().setFromMatrixColumn(this.viewport.camera.matrix,0),n=this.manipulator.toScreen(t),s=this.manipulator.toScreen(t.clone().add(e)),r=Math.hypot(s.x-n.x,s.y-n.y);return r>1e-6?1/r:.01}screenRightAxis(){const t=new I().setFromMatrixColumn(this.viewport.camera.matrix,0);return Math.abs(t.x)>=Math.abs(t.z)?new I(Math.sign(t.x)||1,0,0):new I(0,0,Math.sign(t.z)||1)}beginGestureTransform(){if(this.state.tool!=="select")return!1;const t=this.state.selected,e=this.pivotWorld();if(!t||!e)return!1;const n=this.captureTarget();if(!n)return!1;const s=this.manipulator.toScreen(e);return this.dragSnapshot=this.history.snapshot(),this.gestureDrag=Uh({handle:g_,pivot:e,target:n,point:s,pivotScreen:s,ray:this.ray(s),cameraPosition:this.cameraPosition(),label:"変形"}),this.gestureView={pixelToWorld:this.pixelToWorldAt(e),horizontal:this.screenRightAxis()},this.gestureMoved=!1,!0}updateGestureTransform(t){const e=this.gestureDrag,n=this.gestureView,s=this.state.selected;if(!e||!n||!s)return;let r;if(t.kind==="scale")$o(e,s,{scale:t.scale}),r=`スケール <kbd>×${t.scale.toFixed(2)}</kbd>`;else if(t.axis==="vertical"){const o=-t.pixels*n.pixelToWorld;$o(e,s,{move:new I(0,o,0)}),r=`移動 <kbd>Y ${o>=0?"+":""}${o.toFixed(2)}</kbd>`}else{const o=t.pixels*n.pixelToWorld,a=n.horizontal;$o(e,s,{move:a.clone().multiplyScalar(o)});const c=a.x!==0?"X":"Z",l=o*(a.x!==0?a.x:a.z);r=`移動 <kbd>${c} ${l>=0?"+":""}${l.toFixed(2)}</kbd>`}if(this.gestureMoved=!0,e.target.kind==="object"){const o=this.viewport.viewOf(s);o&&(on(o.group,s.transform),o.group.updateMatrixWorld())}else this.viewport.refreshPositions(s);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats(),Lt("hudHint").innerHTML=`${r} · 指 3 本`}endGestureTransform(){const t=this.gestureMoved;this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,t&&this.dragSnapshot&&this.history.commit("変形",this.dragSnapshot),this.dragSnapshot=null,this.refresh(),this.hud.defaultHint()}ray(t){return this.raycaster.setFromCamera(this.picker.ndc(t),this.viewport.camera),this.raycaster.ray}cameraPosition(){return this.viewport.camera.position}tolerance(t){return t.pointerType==="touch"?v_:1}hitSelectedComponent(t,e=1){const n=this.state.selected,s=n?this.viewport.viewOf(n):void 0;if(!n||!s||!this.state.comp.size)return!1;if(this.state.compMode==="face"){const r=this.picker.pickSurface(t);return!!r&&r.object===n&&this.state.comp.has(r.face)}if(this.state.compMode==="vertex"){const r=this.picker.pickVertex(s,t,22*e);return r>=0&&this.state.comp.has(r)}if(this.state.compMode==="edge"){const r=this.picker.pickEdge(s,t,16*e);return r.edge>=0&&this.state.comp.has(r.edge)}return!1}captureTarget(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;if(e.group.updateMatrixWorld(),this.state.compMode==="object")return{kind:"object",transform:pi(t.transform)};const n=this.selector.selectedVertices();if(!n.length)return null;const s=Dh(t.mesh,n,{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0});s.skipped&&this.hud.toast("範囲が広すぎるのでソフト選択を省きました");const r=[],o=[],a=[];for(const[c,l]of s.weights){const h=t.mesh.getPosition(c);r.push(c),o.push(l),a.push(new I(h[0],h[1],h[2]).applyMatrix4(e.group.matrixWorld))}return{kind:"component",verts:r,weights:o,world:a,inverse:new oe().copy(e.group.matrixWorld).invert(),mirror:this.state.symX?X_(t.mesh,r):[]}}updatePreselect(t,e){if(e.pointerType==="touch"||this.state.tool==="multicut"){this.preselect.clear();return}const n=this.state.selected;this.preselect.update(t,n?this.viewport.viewOf(n):void 0)}updateCutPreview(t,e){if(this.state.tool!=="multicut")return;const n=this.state.selected,s=this.multicut.update(t,n?this.viewport.viewOf(n):void 0,this.state.modOn("shift")||e.shiftKey);s&&(Lt("hudHint").innerHTML=s)}startTool(t,e){if(this.state.tool==="multicut"){this.updateCutPreview(t,e);return}if(this.state.tool==="bevel"){this.startBevel(t);return}const n=this.state.selected,s=this.pivotWorld(),r=this.tolerance(e);let o=n?this.manipulator.pick(t,s,this.state.manip,r):-1;if(o<0&&n&&this.state.compMode!=="object"&&this.hitSelectedComponent(t,r)&&(o=Tc),o<0||!n||!s){this.startMarquee(t);return}const a=this.history.snapshot();let c={move:"移動",rotate:"回転",scale:"スケール"}[nc(o)??"move"];nc(o)==="move"&&this.state.compMode!=="object"&&this.state.comp.size&&(this.state.modOn("shift")||e.shiftKey)&&this.extrudeForDrag(n)&&(c="押し出し");const l=this.captureTarget();if(!l){this.startMarquee(t);return}this.dragSnapshot=a,this.drag=Uh({handle:o,pivot:this.pivotWorld()??s,target:l,point:t,pivotScreen:this.manipulator.toScreen(this.pivotWorld()??s),ray:this.ray(t),cameraPosition:this.cameraPosition(),label:c}),this.manipulator.hot=o,this.refreshManipulator()}extrudeForDrag(t){if(this.state.compMode==="face"){const n=ql(t.mesh,this.state.comp,0);return n?(t.mesh=n.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),!0):!1}if(this.state.compMode==="edge"){const n=this.viewport.viewOf(t);if(!n)return!1;const s=[...this.state.comp].map(a=>n.edges[a]).filter(Boolean),r=Yl(t.mesh,s,0);if(!r)return!1;t.mesh=r.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t);const o=this.viewport.viewOf(t);if(o){const a=new Set(r.newEdges.map(([c,l])=>`${Math.min(c,l)}_${Math.max(c,l)}`));this.state.comp.clear(),o.edges.forEach(([c,l],h)=>{a.has(`${Math.min(c,l)}_${Math.max(c,l)}`)&&this.state.comp.add(h)})}return this.viewport.rebuildOverlay(),!0}const e=Zl(t.mesh,this.state.comp,0,this.state.vertexOpts.extrudeWidth);if(!e)return this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）"),!1;t.mesh=e.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t),this.state.comp.clear();for(const n of e.tips)this.state.comp.add(n);return this.viewport.rebuildOverlay(),!0}moveTool(t,e){if(this.state.tool==="multicut")return this.updateCutPreview(t,e);if(this.state.tool==="bevel")return this.dragBevel(t);if(this.marquee)return this.updateMarquee(t);const n=this.drag,s=this.state.selected;if(!n||!s)return;const r=this.state.snapping&&n.kind==="move";if($_(n,s,t,this.ray(t),this.cameraPosition(),r?o=>this.snapPoint(o):void 0),r?this.showSnapTarget():this.updateWeldTarget(t,e,s),n.target.kind==="object"){const o=this.viewport.viewOf(s);o&&(on(o.group,s.transform),o.group.updateMatrixWorld())}else this.viewport.refreshPositions(s);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats()}snapHit=null;snapPoint(t){const e=this.state.snap.kind;if(e==="grid"){const u=Math.max(1e-4,this.state.snap.step),f=new I(Math.round(t.x/u)*u,Math.round(t.y/u)*u,Math.round(t.z/u)*u);return this.snapHit=f,f}if(e==="surface"){const u=this.manipulator.toScreen(t),f=this.picker.pickSurface(u,this.state.selected);return this.snapHit=f?f.point.clone():null,this.snapHit}const n=this.manipulator.toScreen(t),s=40;let r=null,o=s;const a=u=>{const f=this.manipulator.toScreen(u),d=Math.hypot(f.x-n.x,f.y-n.y);d<o&&(o=d,r=u)},c=this.state.selected,l=this.state.compMode==="object",h=this.state.compMode==="vertex"?this.state.comp:null;for(const u of this.state.doc.objects){if(l&&u===c)continue;const f=this.viewport.viewOf(u);if(!f)continue;const d=u.mesh,g=v=>new I(d.positions[v*3],d.positions[v*3+1],d.positions[v*3+2]).applyMatrix4(f.group.matrixWorld);if(e==="vertex")for(let v=0;v<d.vertexCount;v++)u===c&&h?.has(v)||a(g(v));else for(const[v,m]of f.edges){if(u===c&&h?.has(v)&&h.has(m))continue;const p=g(v),y=g(m).clone().sub(p),M=y.lengthSq(),w=M>1e-12?Math.max(0,Math.min(1,t.clone().sub(p).dot(y)/M)):0;a(p.clone().addScaledVector(y,w))}}return this.snapHit=r,r}showSnapTarget(){const t=this.snapHit;if(this.preselect.clear(),!t){Lt("hudHint").innerHTML=`スナップ <kbd>${Cs[this.state.snap.kind]}</kbd> · near なし`;return}this.preselect.showWorldPoint(t.x,t.y,t.z),Lt("hudHint").innerHTML=`スナップ <kbd>${Cs[this.state.snap.kind]}</kbd> · <kbd>${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}</kbd>`}updateWeldTarget(t,e,n){if(this.weldTarget=null,this.preselect.clear(),this.state.compMode!=="vertex"||this.state.comp.size!==1)return;const s=this.viewport.viewOf(n);if(!s)return;const r=[...this.state.comp][0],o=22*this.tolerance(e),a=this.picker.pickVertexExcept(s,t,o,r);a<0||(this.weldTarget=a,this.preselect.showVertex(s,a),Lt("hudHint").innerHTML="離すと <kbd>この頂点へ溶接</kbd> します")}applyTargetWeld(t,e,n){t.mesh=qn(Wr(t.mesh,[[e,n]]));const s=t.markTopologyChanged();this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let r="ターゲットウェルド";(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),this.hud.toast(r)}finishTool(t,e,n){if(this.state.tool==="multicut"){this.doMultiCut();return}if(this.state.tool==="bevel"){this.endBevel(n);return}const s=this.marquee;if(s){this.endMarquee();const r=this.selector.marquee(s.x0,s.y0,s.x1,s.y1,t,e);this.applySelectResult(r)}else if(this.drag){const r=this.drag;if(this.drag=null,this.manipulator.hot=-1,this.preselect.clear(),!n&&r.label!=="押し出し")this.dragSnapshot=null,this.applySelectResult(this.selector.click(t,e));else if(this.dragSnapshot){const o=this.weldTarget,a=this.state.compMode==="vertex"?[...this.state.comp][0]:void 0;o!==null&&a!==void 0&&this.state.selected?(this.applyTargetWeld(this.state.selected,a,o),this.history.commit("ターゲットウェルド",this.dragSnapshot)):(this.history.commit(r.label,this.dragSnapshot),this.hud.toast(r.label)),this.dragSnapshot=null}else this.dragSnapshot=null;this.refresh()}else n||this.applySelectResult(this.selector.click(t,e))}selectedEdgePairs(t){const e=this.viewport.viewOf(t);return e?[...this.state.comp].map(n=>e.edges[n]).filter(Boolean):[]}startBevel(t){const e=this.state.selected;if(!e||this.state.compMode!=="edge"||!this.state.comp.size){this.hud.toast("エッジモードでエッジを選択してから、左右にドラッグしてください");return}const n=this.selectedEdgePairs(e),s=this.history.snapshot();this.bevel.begin(e,n,t.x)&&(this.bevelSnapshot=s)}dragBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;this.state.bevel.width=this.bevel.widthFromDrag(t.x-e.startX,e.scale);const s=this.bevel.apply(this.state.bevel);if(!s){this.hud.toast("この形はまだベベルできません（四角形と閉じたエッジのみ）");return}this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.hud.refreshStats(),Lt("hudHint").innerHTML=`ベベル <kbd>幅 ${this.state.bevel.width.toFixed(3)}</kbd> · <kbd>${this.state.bevel.segments} 分割</kbd> · ${s.faces} 面`}endBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;if(!t){this.bevel.cancel(),this.bevel.end(),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.refresh();return}const s=n.markTopologyChanged();this.state.comp.clear(),this.bevelSnapshot&&this.history.commit("ベベル",this.bevelSnapshot),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.refresh();let r=`ベベル — 幅 ${this.state.bevel.width.toFixed(3)} · ${this.state.bevel.segments} 分割`;(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),this.hud.toast(`${r}（オプションで作り直せます）`)}redoBevel(){const t=this.state.selected;!t||!this.bevel.active||this.bevel.apply(this.state.bevel)&&(this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats())}doMultiCut(){const t=this.state.selected;if(!t)return;const e=this.history.snapshot(),n=this.multicut.commit(this.viewport.viewOf(t));n&&(t.markTopologyChanged(),this.state.comp.clear(),this.history.commit("エッジループ挿入",e),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`エッジループを挿入しました — ${n.faceCount} 面`))}screenOfVertex(t){const e=this.state.selected,n=e?this.viewport.viewOf(e):void 0;if(!n||t>=n.object.mesh.vertexCount)return null;const s=this.picker.projectVertex(n,t);return{x:s.x,y:s.y}}refreshManipulator(){if(this.state.tool!=="select"){this.manipulator.clear();return}const t=[this.state.compMode,this.state.selected?.id??"-",this.state.comp.size,this.state.tool].join(",");this.manipulator.rebuild(this.pivotWorld(),this.state.manip,t)}setTool(t){if(this.state.tool!==t){this.bevel.active&&(this.bevel.end(),this.bevelSnapshot=null),this.state.tool=t,this.multicut.clear(),this.preselect.clear(),this.manipulator.clear(),this.refresh();for(const e of document.querySelectorAll("[data-tool]"))e.setAttribute("aria-pressed",String(e.dataset.tool===t));this.hud.toast(t==="multicut"?"マルチカット":"選択・変形"),this.hud.defaultHint()}}setDisplay(t){this.state.display=t,this.viewport.syncAll(),this.refresh(),this.hud.toast({wire:"ワイヤーフレーム",shaded:"シェード",shadedWire:"シェード + ワイヤー",smooth:"スムースシェード",checker:"チェッカー（UV の確認）"}[t])}cycleDisplay(){const t=["wire","shaded","shadedWire","smooth","checker"];this.setDisplay(t[(t.indexOf(this.state.display)+1)%t.length])}openCameraPopup(t){this.closePopup();const e=t.getBoundingClientRect(),n=mt("div","panel floating");n.style.left=`${e.right+6}px`,n.style.top=`${e.top}px`;const s=mt("div","pbody"),r=mt("div","hint"),o=()=>{const l=2*Math.atan(24/(2*this.state.camOpts.focal))*180/Math.PI;r.textContent=`アングル オブ ビュー  ${l.toFixed(2)}°
フィルム ゲート  35mm アカデミー`},a=(l,h,u,f,d)=>{const g=mt("div","row");g.appendChild(mt("label",void 0,l));const v=mt("input","num");v.type="text",v.readOnly=!0,v.value=String(this.state.camOpts[h]),g.appendChild(v);const m=mt("input","slider");m.type="range",m.min=String(u),m.max=String(f),m.step=String(d),m.value=String(this.state.camOpts[h]),m.addEventListener("input",()=>{const p=Number(m.value);this.state.camOpts[h]=p,v.value=String(p),this.viewport.applyCamera(),o(),this.refreshManipulator()}),g.appendChild(m),s.appendChild(g)};a("焦点距離","focal",10,200,1),a("ニア クリップ","near",.01,1,.01),a("ファー クリップ","far",50,2e3,10),o(),s.appendChild(r);const c=mt("button","chk");c.setAttribute("aria-pressed",String(this.state.camOpts.ortho)),c.appendChild(mt("i")),c.appendChild(mt("span",void 0,"平行投影")),c.addEventListener("click",()=>{this.state.camOpts.ortho=!this.state.camOpts.ortho,c.setAttribute("aria-pressed",String(this.state.camOpts.ortho)),this.viewport.applyCamera(),this.refresh()}),s.appendChild(c),n.appendChild(s),document.body.appendChild(n),this.popup=n}setManip(t){this.state.manip=t,this.manipulator.clear(),this.refreshManipulator(),this.hud.toast(`マニピュレータ: ${{all:"ユニバーサル",move:"移動",rotate:"回転",scale:"スケール"}[t]}`)}applySelectResult(t){t.changed&&(t.objectChanged&&this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),t.message&&this.hud.toast(t.message))}startMarquee(t){this.marquee={x0:t.x,y0:t.y,x1:t.x,y1:t.y},this.marqueeEl.style.display="block",this.updateMarquee(t)}updateMarquee(t){const e=this.marquee;e&&(e.x1=t.x,e.y1=t.y,this.marqueeEl.style.left=`${Math.min(e.x0,e.x1)}px`,this.marqueeEl.style.top=`${Math.min(e.y0,e.y1)}px`,this.marqueeEl.style.width=`${Math.abs(e.x1-e.x0)}px`,this.marqueeEl.style.height=`${Math.abs(e.y1-e.y0)}px`)}endMarquee(){this.marquee=null,this.marqueeEl.style.display="none"}pivotWorld(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;if(e.group.updateMatrixWorld(),this.state.compMode==="object"||!this.state.comp.size)return new I().setFromMatrixPosition(e.group.matrixWorld);const n=this.selector.selectedVertices();if(!n.length)return null;const s=new I(1/0,1/0,1/0),r=new I(-1/0,-1/0,-1/0);for(const o of n){const a=t.mesh.getPosition(o),c=new I(a[0],a[1],a[2]).applyMatrix4(e.group.matrixWorld);s.min(c),r.max(c)}return s.add(r).multiplyScalar(.5)}openMarkingMenu(t,e,n){this.closePopup(),$n(n?this.editMenu():this.selectModeMenu(),t,e)}openTwoFingerMenu(t,e){if(this.closePopup(),this.state.selected){$n(this.editMenu(),t,e);return}$n(this.cameraMenu(),t,e,this.savedCameraItems())}cameraMenu(){const t=e=>({label:Is[e].label,sub:Is[e].sub,icon:tt.camera,run:()=>this.setView(e)});return{N:t("persp"),NE:{label:"新規カメラ",sub:"New Camera",icon:tt.camera,run:()=>this.addCamera()},E:t("right"),SE:t("bottom"),S:t("front"),SW:t("back"),W:t("top"),NW:t("left")}}savedCameraItems(){return this.state.cameras.map(t=>({label:t.name,run:()=>this.recallCamera(t)}))}setView(t){this.viewport.setView(t),this.state.viewName=Is[t].label,this.refresh(),this.hud.toast(`${Is[t].label}ビュー`)}addCamera(){const t=this.viewport.cam,e={name:`camera${this.state.cameras.length+1}`,theta:t.theta,phi:t.phi,distance:t.distance,target:[t.target.x,t.target.y,t.target.z],focal:this.state.camOpts.focal,ortho:this.state.camOpts.ortho};this.state.cameras.push(e),this.state.viewName=e.name,this.refresh(),this.hud.toast(`${e.name} を控えました`)}recallCamera(t){const e=this.viewport.cam;e.theta=t.theta,e.phi=t.phi,e.distance=t.distance,e.target.set(t.target[0],t.target[1],t.target[2]),t.focal!==void 0&&(this.state.camOpts.focal=t.focal),t.ortho!==void 0&&(this.state.camOpts.ortho=t.ortho),this.viewport.applyCamera(),this.state.viewName=t.name,this.refresh(),this.hud.toast(`${t.name} に切り替えました`)}manipMenu(){return{N:{label:"ユニバーサル",sub:"All  T",icon:tt.xform,run:()=>this.setManip("all")},E:{label:"移動",sub:"Move  W",icon:tt.move,run:()=>this.setManip("move")},S:{label:"回転",sub:"Rotate  E",icon:tt.rotate,run:()=>this.setManip("rotate")},W:{label:"スケール",sub:"Scale  R",icon:tt.scale,run:()=>this.setManip("scale")}}}modeMenu(){const t=e=>()=>this.setMode(e);return{N:{label:ns.model,sub:"Modeling",icon:tt.mModel,run:t("model")},E:{label:ns.uv,sub:"UV Editor",icon:tt.mUV,run:t("uv")},S:{label:ns.sculpt,sub:"Sculpt",icon:tt.mSculpt,run:t("sculpt")},W:{label:ns.material,sub:"Material",icon:tt.mMaterial,run:t("material")}}}setMode(t){if(this.state.mode===t)return;this.state.mode=t,Lt("modeLabel").textContent=ns[t],this.closePopup(),this.multicut.clear(),this.preselect.clear();const e=Lt("modeStub");e.textContent="";const n=rM[t];t==="uv"?this.enterUv():this.leaveUv(),n?(e.appendChild(oM(n)),e.hidden=!1,Lt("stage").hidden=!0):(e.hidden=!0,Lt("stage").hidden=!1,this.viewport.resize()),this.renderToolColumn(),this.refresh(),this.hud.toast(ns[t])}uvToolColumn(){const t=this.uv;if(!t)return[];const e=(n,s,r)=>({kind:"button",icon:s,title:r,compMode:t.unit===n?n:`${n}_off`,onTap:()=>{t.setUnit(n),this.renderToolColumn()}});return[{kind:"label",text:"選択"},e("vertex",tt.vVert,"UV 頂点"),e("edge",tt.vEdge,"UV エッジ"),e("shell",tt.vFace,"UV シェル"),{kind:"separator"},{kind:"label",text:"UV"},{kind:"button",icon:tt.smooth,title:"展開（レシピから開き直す）",onTap:()=>t.unfold()},{kind:"button",icon:tt.multicut,title:"カット（選んだ UV エッジを切る）",onTap:()=>t.cutOrSew(!0)},{kind:"button",icon:tt.vEdge,title:"ソー（選んだ切れ目を縫う）",onTap:()=>t.cutOrSew(!1)},{kind:"separator"},{kind:"button",icon:tt.frame,title:"選択にフレーム",onTap:()=>t.frame()}]}enterUv(){const t=this.state.selected;this.uv||(this.uv=new fM(Lt("paneUv"),Lt("uvgl"),{object:()=>this.state.selected,recipe:()=>this.state.selected?.uv??null,changed:e=>{const n=this.state.selected;n&&this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.hud.uvNote=this.uv?.stats()??null,this.refresh(),e&&this.hud.toast(e)},snapshot:()=>this.history.snapshot(),commit:(e,n)=>this.history.commit(e,n),syncToView:e=>{this.state.compMode="face",this.state.comp.clear();for(const n of e)this.state.comp.add(n);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats()},markingMenu:(e,n,s)=>{this.closePopup(),$n(s?this.uvEditMenu():this.uvSelectMenu(),e,n)},cameraMenu:(e,n)=>{this.closePopup(),$n({N:{label:"0〜1 にフレーム",sub:"Unit",icon:tt.frame,run:()=>this.uv?.view.frameUnit()},S:{label:"選択にフレーム",sub:"Frame  F",icon:tt.frame,run:()=>this.uv?.frame()}},e,n)},hint:e=>{Lt("hudHint").innerHTML=e},toast:e=>this.hud.toast(e),undo:()=>this.doUndo(),redo:()=>this.doRedo(),shiftOn:e=>this.state.modOn("shift")||e.shiftKey,ctrlOn:e=>this.state.modOn("ctrl")||e.ctrlKey||e.metaKey}),this.buildUvSwitch()),t&&!t.uv&&(t.uv=Pu(),qa(t.mesh,t.uv),this.viewport.rebuildObject(t)),Lt("paneUv").hidden=!1,Lt("uvSwitch").hidden=!1,this.applyUvSplit(),this.uv.start(),this.uv.rebuild(),this.hud.uvNote=this.uv.stats(),this.state.compMode==="face"&&this.state.comp.size&&this.uv.syncFromView(this.state.comp)}leaveUv(){this.hud.uvNote=null,this.uv&&(this.uv.stop(),Lt("paneUv").hidden=!0,Lt("uvSwitch").hidden=!0,Lt("vp").classList.remove("split","uvonly"),this.viewport.resize())}buildUvSwitch(){const t=Lt("uvSwitch");t.textContent="";for(const[e,n]of[["uv","2D"],["both","両方"],["view","3D"]]){const s=mt("button");s.textContent=n,s.dataset.split=e,s.addEventListener("click",()=>{this.uvSplit=e,this.applyUvSplit()}),t.appendChild(s)}}applyUvSplit(){const t=Lt("vp");t.classList.toggle("split",this.uvSplit==="both"),t.classList.toggle("uvonly",this.uvSplit==="uv"),Lt("paneUv").hidden=this.uvSplit==="view";for(const e of Lt("uvSwitch").querySelectorAll("button"))e.setAttribute("aria-pressed",String(e.dataset.split===this.uvSplit));requestAnimationFrame(()=>{this.viewport.resize(),this.uv?.resize()})}uvSelectMenu(){const t=e=>()=>this.uv?.setUnit(e);return{N:{label:"UV エッジ",sub:"UV Edge",icon:tt.vEdge,run:t("edge")},NE:{label:"オブジェクト",sub:"Object",icon:tt.vObj,run:()=>this.setMode("model")},E:{label:"UV シェル",sub:"Shell",icon:tt.vFace,run:t("shell")},S:{label:"面（3D と同期）",sub:"Face",icon:tt.vFace,run:t("shell")},W:{label:"UV 頂点",sub:"UV Vertex",icon:tt.vVert,run:t("vertex")}}}uvEditMenu(){const t=this.uv;return t?t.unit==="edge"?{N:{label:"カット",sub:"Cut",icon:tt.multicut,run:()=>t.cutOrSew(!0)},NE:{label:"ソー",sub:"Sew",icon:tt.vEdge,run:()=>t.cutOrSew(!1)},S:{label:"展開",sub:"Unfold",icon:tt.smooth,run:()=>t.unfold()}}:t.unit==="vertex"?{N:{label:"ピン",sub:"Pin",icon:tt.vVert,run:()=>t.pinOrUnpin(!0)},NE:{label:"ピン解除",sub:"Unpin",icon:tt.vVert,run:()=>t.pinOrUnpin(!1)},S:{label:"展開",sub:"Unfold",icon:tt.smooth,run:()=>t.unfold()}}:{N:{label:"展開",sub:"Unfold",icon:tt.smooth,run:()=>t.unfold()},SE:{label:"反転 U",sub:"Flip U",icon:tt.sym,run:()=>t.transformSelection("flipU")},S:{label:"反転 V",sub:"Flip V",icon:tt.sym,run:()=>t.transformSelection("flipV")},SW:{label:"90° 回転",sub:"Rotate",icon:tt.rotate,run:()=>t.transformSelection("rotate90")}}:{}}toggleSnap(){this.state.snapOn=!this.state.snapOn,this.syncToggleButtons(),this.refresh(),this.hud.toast(this.state.snapOn?`スナップ オン: ${Cs[this.state.snap.kind]}`:"スナップ オフ")}setSnapKind(t){this.state.snap.kind=t,this.state.snapOn=!0,this.syncToggleButtons(),this.refresh(),this.hud.toast(`スナップ: ${Cs[t]}`)}snapMenu(){return{N:{label:"グリッド",sub:"Grid  X",icon:tt.wire,run:()=>this.setSnapKind("grid")},E:{label:"頂点",sub:"Point  V",icon:tt.vVert,run:()=>this.setSnapKind("vertex")},S:{label:"カーブ / エッジ",sub:"Curve  C",icon:tt.vEdge,run:()=>this.setSnapKind("edge")},W:{label:"サーフェス",sub:"Surface",icon:tt.vFace,run:()=>this.setSnapKind("surface")},SW:{label:"オフ",sub:"Off",icon:tt.snap,run:()=>{this.state.snapOn=!1,this.syncToggleButtons(),this.refresh(),this.hud.toast("スナップ オフ")}}}}shadingMenu(){return{N:{label:"ワイヤーフレーム",sub:"4",icon:tt.wire,run:()=>this.setDisplay("wire")},E:{label:"シェード",sub:"5",icon:tt.shaded,run:()=>this.setDisplay("shaded")},S:{label:"シェード + ワイヤー",sub:"6",icon:tt.shadedWire,run:()=>this.setDisplay("shadedWire")},W:{label:"スムースシェード",sub:"7",icon:tt.smooth,run:()=>this.setDisplay("smooth")},NW:{label:"チェッカー",sub:"8",icon:tt.mUV,run:()=>this.setDisplay("checker")}}}selectModeMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return{N:{label:"エッジ",sub:"Edge",icon:tt.vEdge,run:()=>this.setCompMode("edge")},NE:{label:"オブジェクト モード",sub:"Object",icon:tt.vObj,run:()=>this.setCompMode("object")},SE:{label:"マルチ",sub:"Multi",icon:tt.vMulti,run:t("マルチコンポーネント選択")},S:{label:"フェース",sub:"Face",icon:tt.vFace,run:()=>this.setCompMode("face")},SW:{label:"頂点フェース",sub:"Vertex Face",icon:tt.vVertFace,run:t("頂点フェース選択")},W:{label:"頂点",sub:"Vertex",icon:tt.vVert,run:()=>this.setCompMode("vertex")},NW:this.state.modOn("ctrl")?{label:"選択を縮小",sub:"Shrink  <",icon:tt.vMulti,run:()=>this.growOrShrink(!1)}:{label:"選択を拡張",sub:"Grow  >",icon:tt.vMulti,run:()=>this.growOrShrink(!0)}}}editMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return this.state.compMode==="face"?{N:{label:"押し出し",sub:"Extrude",icon:tt.extrude,run:()=>this.doExtrudeFaces()},NE:{label:"ベベル",sub:"Bevel",icon:tt.scale,run:t("ベベル")},E:{label:"ブリッジ",sub:"Bridge",icon:tt.vEdge,run:t("ブリッジ")},SE:{label:"複製",sub:"Duplicate",icon:tt.dup,run:()=>this.doDuplicateFaces()},S:{label:"削除",sub:"Delete",icon:tt.del,run:()=>this.doDeleteFaces()},SW:{label:"コラプス",sub:"Collapse",icon:tt.vVert,run:()=>this.doCollapseFaces()},W:{label:"スムース",sub:"Smooth",icon:tt.smooth,run:()=>this.doSmooth()},NW:{label:"抽出",sub:"Extract",icon:tt.vFace,run:()=>this.doExtractFaces()}}:this.state.compMode==="edge"?{N:{label:"押し出し",sub:"Extrude",icon:tt.extrude,run:()=>this.doExtrudeEdgesMenu()},NE:{label:"ベベル",sub:"Bevel",icon:tt.scale,run:()=>this.setTool("bevel")},E:{label:"ブリッジ",sub:"Bridge",icon:tt.vEdge,run:()=>this.doBridge()},SE:{label:"エッジループ挿入",sub:"Insert Loop",icon:tt.multicut,run:()=>this.setTool("multicut")},S:{label:"削除",sub:"Delete",icon:tt.del,run:()=>this.doDeleteEdges()},SW:{label:"スピン",sub:"Spin",icon:tt.rotate,run:t("スピンエッジ")},W:{label:"接続",sub:"Connect",icon:tt.vMulti,run:()=>this.doConnectEdges()},NW:{label:"境界を選択",sub:"Boundary",icon:tt.vEdge,run:()=>this.selectBoundary()}}:this.state.compMode==="vertex"?{N:{label:"距離でマージ",sub:"Merge",icon:tt.vVert,run:()=>this.doMergeByDistance()},NE:{label:"中心にマージ",sub:"To Center",icon:tt.vObj,run:()=>this.doMergeVertices()},E:{label:"面取り",sub:"Chamfer",icon:tt.scale,run:t("面取り")},SE:{label:"接続",sub:"Connect",icon:tt.vMulti,run:()=>this.doConnectVertices()},S:{label:"削除",sub:"Delete",icon:tt.del,run:()=>this.doDissolveVertices()},SW:{label:"平均化",sub:"Average",icon:tt.smooth,run:t("平均化")},W:{label:"分離",sub:"Detach",icon:tt.vVertFace,run:t("分離")},NW:{label:"押し出し",sub:"Extrude",icon:tt.extrude,run:()=>this.doExtrudeVertices()}}:{N:{label:"スムース",sub:"Smooth",icon:tt.smooth,run:()=>this.doSmooth()},NE:{label:"中心にピボット",sub:"Center Pivot",icon:tt.vObj,run:()=>this.doCenterPivot()},E:{label:"分離",sub:"Separate",icon:tt.vVertFace,run:()=>this.doSeparate()},SE:{label:"複製",sub:"Duplicate",icon:tt.dup,run:()=>this.doDuplicate()},S:{label:"削除",sub:"Delete",icon:tt.del,run:()=>this.doDelete()},SW:{label:"ミラー",sub:"Mirror",icon:tt.sym,run:()=>this.doMirror()},W:{label:"結合",sub:"Combine",icon:tt.prim,run:()=>this.doCombine()},NW:{label:"フリーズ",sub:"Freeze",icon:tt.vObj,run:()=>this.doFreeze()}}}growOrShrink(t){this.applySelectResult(this.selector.growOrShrink(t))}selectBoundary(){const t=this.selector.selectBoundary();t.changed&&this.syncCompModeButtons(),this.applySelectResult(t),!t.changed&&t.message&&this.hud.toast(t.message)}doSmooth(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");this.history.push("スムース"),t.mesh=yx(t.mesh,1),t.markTopologyChanged(),this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`スムース — ${t.mesh.faceCount} 面`)}applyTopologyChange(t,e,n,s){const r=this.history.snapshot();if(!n())return;const o=t.markTopologyChanged();this.state.comp.clear(),this.history.commit(e,r),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let a=s(t);(o.droppedLevels||o.droppedLayers)&&(a+=` · 上位レベル ${o.droppedLevels} とレイヤー ${o.droppedLayers} を破棄`),this.hud.toast(a)}requireComponents(t,e=1){const n=this.state.selected,s={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"}[t];return!n||this.state.compMode!==t||this.state.comp.size<e?(this.hud.toast(`${s}モードで${e>1?`${e} つ以上`:""}選択してから実行してください`),null):n}doExtrudeFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"押し出し",()=>{const n=ql(t.mesh,this.state.comp,this.state.toolOpts.extrudeDist);return n?(t.mesh=n.mesh,e=n.faceCount,!0):!1},()=>`面を押し出し — ${e} 面`)}doExtrudeEdgesMenu(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean);let s=0;this.applyTopologyChange(t,"エッジを押し出し",()=>{const r=Yl(t.mesh,n,this.state.toolOpts.extrudeDist);return r?(t.mesh=r.mesh,s=r.faceCount,!0):!1},()=>`エッジを押し出し — ${s} 面`)}doDeleteFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"面を削除",()=>{const n=Rv(t.mesh,this.state.comp);return n?(t.mesh=qn(n.mesh),e=n.removed,!0):!1},()=>`${e} 面を削除`)}doCollapseFaces(){const t=this.requireComponents("face");t&&this.applyTopologyChange(t,"コラプス",()=>{const e=Pv(t.mesh,this.state.comp);return e?(t.mesh=qn(e),!0):!1},()=>"フェースをコラプス")}doMergeVertices(){const t=this.requireComponents("vertex",2);t&&this.applyTopologyChange(t,"頂点をマージ",()=>(t.mesh=qn(Wr(t.mesh,[[...this.state.comp]])),!0),()=>"頂点をマージ")}doMergeByDistance(){const t=this.state.selected;if(!t||this.state.compMode!=="vertex"){this.hud.toast("頂点モードで実行してください");return}const e=this.state.vertexOpts.mergeDist,n=this.state.comp.size>=2?[...this.state.comp]:void 0,s=Au(t.mesh,e,n);if(!s){this.hud.toast(`${e.toFixed(3)} 以内に重なる頂点がありません`);return}this.applyTopologyChange(t,"距離でマージ",()=>(t.mesh=qn(s.mesh),!0),()=>`${s.merged} 頂点をマージ（${e.toFixed(3)} 以内）`)}doDissolveVertices(){const t=this.requireComponents("vertex");if(!t)return;const e=Hv(t.mesh,this.state.comp);if(!e){this.hud.toast("消せる頂点がありません（面が繋がっていない頂点です）");return}this.applyTopologyChange(t,"頂点を削除",()=>(t.mesh=qn(e.mesh),!0),()=>`${e.removed} 頂点を削除`)}doExtrudeVertices(){const t=this.requireComponents("vertex");if(!t)return;const e=Zl(t.mesh,this.state.comp,this.state.toolOpts.extrudeDist,this.state.vertexOpts.extrudeWidth);if(!e){this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）");return}this.applyTopologyChange(t,"頂点を押し出し",()=>(t.mesh=e.mesh,!0),()=>`頂点を押し出し — ${e.faces} 面`)}doDeleteEdges(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(o=>e.edges[o]).filter(Boolean);let s=0;const r=Cv(t.mesh,n);if(!r){this.hud.toast("結合できるエッジがありません（境界エッジは削除できません）");return}this.applyTopologyChange(t,"エッジを削除",()=>(t.mesh=r.mesh,s=r.merged,!0),()=>`エッジを削除 — ${s} 面を結合`)}doBridge(){const t=this.requireComponents("edge",2);if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean),s=zv(t.mesh,n);if(!s){this.hud.toast("ブリッジできません（境界エッジの 2 列を同じ本数だけ選んでください）");return}this.applyTopologyChange(t,"ブリッジ",()=>(t.mesh=s.mesh,!0),()=>`ブリッジ — ${s.faces} 面`)}doConnectVertices(){const t=this.requireComponents("vertex",2);if(!t)return;const e=Cu(t.mesh,this.state.comp);if(!e){this.hud.toast("結べる組がありません（同じ面にあり、隣り合っていない 2 点を選んでください）");return}this.applyTopologyChange(t,"接続",()=>(t.mesh=e.mesh,!0),()=>`接続 — ${e.edges} 本のエッジ`)}doConnectEdges(){const t=this.requireComponents("edge",2);if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean),s=Wv(t.mesh,n);if(!s){this.hud.toast("結べる組がありません（同じ面に来るエッジを 2 本以上選んでください）");return}this.applyTopologyChange(t,"接続",()=>(t.mesh=s.mesh,!0),()=>`接続 — ${s.edges} 本のエッジ`)}doDuplicateFaces(){const t=this.requireComponents("face");if(!t)return;const e=$v(t.mesh,this.state.comp);if(!e)return;let n=0;this.applyTopologyChange(t,"フェースの複製",()=>(t.mesh=e.mesh,n=e.faces.length,!0),()=>`${n} 面を複製`),this.state.comp.clear();for(const s of e.faces)this.state.comp.add(s);this.viewport.rebuildOverlay(),this.refresh()}doExtractFaces(){const t=this.requireComponents("face");if(!t)return;const e=qv(t.mesh,this.state.comp);if(!e){this.hud.toast("抽出できません（全部を選ぶと残りが無くなります）");return}const n=this.history.snapshot();t.mesh=e.mesh,t.markTopologyChanged();const s=this.state.doc.addMesh(e.extracted,`${t.name}_extract`);s.transform=pi(t.transform),this.history.commit("フェースの抽出",n),this.state.comp.clear(),this.viewport.syncAll(),this.state.select(s),this.setCompMode("object"),this.refresh(),this.hud.toast(`${e.count} 面を ${s.name} へ抽出`)}doSeparate(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");const e=Kv(t.mesh);if(!e){this.hud.toast("分けられません（繋がった 1 つの塊です）");return}const n=this.history.snapshot(),s=this.state.doc.objects.indexOf(t);this.state.doc.objects.splice(s,1);let r=null;e.forEach((o,a)=>{const c=this.state.doc.addMesh(o,`${t.name}_${a+1}`);c.transform=pi(t.transform),r||(r=c)}),this.history.commit("分離",n),this.viewport.syncAll(),this.state.select(r),this.refresh(),this.hud.toast(`${e.length} 個に分離`)}doCombine(){const t=this.state.selectedObjects();if(t.length<2){this.hud.toast("オブジェクトモードで SHF を足して 2 つ以上選んでください");return}const e=Yv(t.map(r=>({mesh:r.mesh,transform:r.transform})));if(!e)return;const n=this.history.snapshot();for(const r of t){const o=this.state.doc.objects.indexOf(r);o>=0&&this.state.doc.objects.splice(o,1)}const s=this.state.doc.addMesh(e,t[0].name);this.history.commit("結合",n),this.viewport.syncAll(),this.state.select(s),this.refresh(),this.hud.toast(`${t.length} 個を結合`)}doMirror(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");const e=this.state.mirrorAxis,n=Zv(t.mesh,e,this.state.vertexOpts.mergeDist);n&&this.applyTopologyChange(t,"ミラー",()=>(t.mesh=n.mesh,!0),()=>`ミラー ${"XYZ"[e]} — ${n.welded} 頂点を溶接`)}doCenterPivot(){const t=this.state.selected;if(!t)return;this.history.push("中心にピボット");const e=t.mesh.boundsCenter();for(let n=0;n<t.mesh.vertexCount;n++){const s=t.mesh.getPosition(n);t.mesh.setPosition(n,s[0]-e[0],s[1]-e[1],s[2]-e[2])}t.transform.position=[t.transform.position[0]+e[0]*t.transform.scale[0],t.transform.position[1]+e[1]*t.transform.scale[1],t.transform.position[2]+e[2]*t.transform.scale[2]],t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("ピボットを中心へ")}doFreeze(){const t=this.state.selected;if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;this.history.push("フリーズ"),e.group.updateMatrixWorld();const n=e.group.matrixWorld;for(let s=0;s<t.mesh.vertexCount;s++){const r=t.mesh.getPosition(s),o=new I(r[0],r[1],r[2]).applyMatrix4(n);t.mesh.setPosition(s,o.x,o.y,o.z)}t.transform={position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]},t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("トランスフォームをフリーズ")}doDuplicate(){const t=this.state.selected;if(!t)return;this.history.push("複製");const e=this.state.doc.addMesh(t.mesh.clone(),`${t.name}_copy`);e.transform=pi(t.transform),this.state.select(e),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${e.name} を複製しました`)}doDelete(){const t=this.state.selected;t&&(this.history.push("削除"),this.state.doc.remove(t),this.state.select(null),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${t.name} を削除しました`))}doUndo(){const t=this.history.undo();t&&(this.afterHistory(),this.hud.toast(`元に戻す: ${t}`))}doRedo(){const t=this.history.redo();t&&(this.afterHistory(),this.hud.toast(`やり直す: ${t}`))}afterHistory(){this.viewport.syncAll(),this.selector.reset(),this.syncCompModeButtons(),this.refresh()}syncCompModeButtons(){for(const t of document.querySelectorAll("[data-comp-mode]"))t.setAttribute("aria-pressed",String(t.dataset.compMode===this.state.compMode))}syncToggleButtons(){this.renderToolColumn()}updateHistoryButtons(){Lt("btnUndo").disabled=!this.history.canUndo,Lt("btnRedo").disabled=!this.history.canRedo}toolColumn(){if(this.state.mode==="uv")return this.uvToolColumn();if(this.state.mode!=="model")return[];const t=[{kind:"label",text:"変形"},{kind:"button",icon:tt.xform,title:"選択・変形（長押しで 移動 / 回転 / スケール）",tool:"select",radial:()=>this.manipMenu(),onTap:()=>{this.setTool("select"),this.setManip("all")}},{kind:"button",icon:tt.multicut,title:"マルチカット（エッジループ挿入）",tool:"multicut",onTap:()=>this.setTool("multicut")},{kind:"button",icon:tt.scale,title:"ベベル（エッジを選んで左右にドラッグ）",tool:"bevel",onTap:()=>this.setTool("bevel")},{kind:"button",icon:tt.snap,title:"スナップ（長押しで グリッド / 頂点 / カーブ / サーフェス）",pressed:()=>this.state.snapOn,radial:()=>this.snapMenu(),onTap:()=>this.toggleSnap()},{kind:"separator"},{kind:"label",text:"選択"}];for(const e of Jo)t.push({kind:"button",icon:xM[e.id],title:`${e.label} (${e.key})`,compMode:e.id,onTap:()=>this.setCompMode(e.id)});t.push({kind:"separator"},{kind:"label",text:"表示"},{kind:"button",icon:tt.shade,title:"シェーディング（長押しで切り替え。4–7）",radial:()=>this.shadingMenu(),onTap:()=>this.cycleDisplay()},{kind:"button",icon:tt.camera,title:"カメラ設定",onTap:e=>this.openCameraPopup(e)},{kind:"separator"},{kind:"label",text:"追加"});for(const e of bv){const n=ps[e];t.push({kind:"button",icon:_M[e]??tt.prim,title:`${n.label} を原点に追加`,onTap:()=>this.addPrimitive(e)})}return t}buildToolDock(){Lt("dockLeft").textContent="";const{panel:t,body:e}=Yo("tools","ツール");this.toolPanelBody=e,this.renderToolColumn(),this.docking.attach(t),this.docking.place(t,this.zones.tools??"left")}renderToolColumn(){const t=this.toolPanelBody;if(!t)return;t.textContent="";const e=mt("div","toolcol");for(const n of this.toolColumn()){if(n.kind==="label"){e.appendChild(mt("div","minilbl",n.text));continue}if(n.kind==="separator"){e.appendChild(mt("div","tool-sep"));continue}const s=mt("button","ibtn");s.innerHTML=dM(n.icon),s.title=n.title,n.tool&&(s.dataset.tool=n.tool,s.setAttribute("aria-pressed",String(this.state.tool===n.tool))),n.compMode&&(s.dataset.compMode=n.compMode,s.setAttribute("aria-pressed",String(this.state.compMode===n.compMode))),n.pressed&&(s.dataset.toggle="1",s.setAttribute("aria-pressed",String(n.pressed()))),n.radial?(s.dataset.radial="1",kh(s,n.radial,()=>n.onTap(s))):s.addEventListener("click",()=>n.onTap(s)),e.appendChild(s)}t.appendChild(e)}buildPanels(){const t=Yo("options","オプション");this.docking.attach(t.panel),this.docking.place(t.panel,this.zones.options??"rightTop"),this.optionsBody=t.body;const e=Yo("outliner","アウトライナ");this.docking.attach(e.panel),this.docking.place(e.panel,this.zones.outliner??"rightBottom"),this.outlinerBody=e.body,this.renderPanels(),this.viewport.resize()}panelHost(){return{onParamInput:(t,e,n)=>{this.paramSnapshot??=this.history.snapshot(),t.params[e]=n,t.rebuild(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats(),this.refreshManipulator()},onParamCommit:(t,e)=>{this.paramSnapshot&&(this.history.commit(e,this.paramSnapshot),this.paramSnapshot=null)},onSoftChange:(t,e)=>{this.state.soft[t]=e,this.viewport.rebuildOverlay(),this.refresh()},onExtrudeDistChange:t=>{this.state.toolOpts.extrudeDist=t},onVertexOptChange:(t,e)=>{this.state.vertexOpts[t]=e},onMirrorAxisChange:t=>{this.state.mirrorAxis=t,this.refresh()},onTransformInput:(t,e,n,s)=>{this.history.push("数値入力");const r=pi(t.transform);if(e==="rotation"){const a=this.eulerOf(r.rotation);a[n]=s;const c=a.map(h=>h*Math.PI/180),l=new je().setFromEuler(new On(c[0],c[1],c[2],"XYZ"));r.rotation=[l.x,l.y,l.z,l.w]}else{const a=[...r[e]];a[n]=s,r[e]=a}t.transform=r;const o=this.viewport.viewOf(t);o&&(on(o.group,t.transform),o.group.updateMatrixWorld()),this.viewport.rebuildOverlay(),this.refresh()},onSnapChange:(t,e)=>{t==="kind"?this.setSnapKind(e):(this.state.snap.step=e,this.refresh())},onBevelChange:(t,e)=>{t==="segments"?this.state.bevel.segments=e:this.state.bevel.width=e,this.redoBevel()},onCutChange:(t,e)=>{t==="edgeFlow"?this.state.cut.edgeFlow=e:this.state.cut.snapStep=e},onSmoothAngleChange:t=>{this.state.smoothAngle=t;for(const e of this.state.doc.objects)this.viewport.rebuildObject(e)},onSelect:t=>{this.state.select(t),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh()},onRename:(t,e)=>{this.history.push("名前変更"),t.name=e,this.refresh()},onOutlinerMenu:(t,e,n)=>{$n({N:{label:"名前変更",sub:"Rename",icon:tt.rename,run:()=>this.hud.toast("行をダブルタップでも変更できます")},E:{label:"複製",sub:"Duplicate",icon:tt.dup,run:()=>{this.state.select(t),this.doDuplicate()}},S:{label:"削除",sub:"Delete",icon:tt.del,run:()=>{this.state.select(t),this.doDelete()}},W:{label:"フレーム",sub:"Frame",icon:tt.frame,run:()=>{this.state.select(t),this.refresh(),this.viewport.frameSelected()}}},e,n)}}}renderPanels(){const t=this.panelHost();this.optionsBody&&eM(this.optionsBody,{tool:this.state.tool,selected:this.state.selected,soft:this.state.soft,cut:this.state.cut,bevel:this.state.bevel,bevelActive:this.bevel.active,extrudeDist:this.state.toolOpts.extrudeDist,vertex:this.state.vertexOpts,snap:{...this.state.snap,active:this.state.snapping},mirrorAxis:this.state.mirrorAxis,rotationEuler:this.state.selected?this.eulerOf(this.state.selected.transform.rotation):[0,0,0],smoothAngle:this.state.smoothAngle,compMode:this.state.compMode},t),this.outlinerBody&&nM(this.outlinerBody,this.state.doc.objects,this.state.selected,t)}addPrimitive(t){this.history.push(`${ps[t].label} を追加`);const e=this.state.doc.addObject(t);this.state.select(e),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${e.name} を追加しました`)}setCompMode(t){this.state.compMode!==t&&(this.state.compMode=t,this.state.comp.clear(),this.selector.reset(),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),this.syncCompModeButtons(),this.hud.toast(Jo.find(e=>e.id===t)?.label??t))}buildGauges(){const t=()=>this.viewport.rebuildOverlay();this.gauges=[new Fh(this.state,"gauge1","g1","g1lbl","g1val",t,()=>this.refresh()),new Fh(this.state,"gauge2","g2","g2lbl","g2val",t,()=>this.refresh())]}buildCluster(){const t=n=>{this.state.mods[n]=this.state.mods[n]==="off"?"on":"off",this.syncModButtons(),this.hud.refreshStats()};Lt("modShift").addEventListener("click",()=>t("shift")),Lt("modCtrl").addEventListener("click",()=>t("ctrl")),Lt("modAlt").addEventListener("click",()=>t("alt"));const e=Lt("btnFrame");e.addEventListener("touchstart",n=>n.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",n=>{e.setPointerCapture(n.pointerId),this.fHeld=!0});for(const n of["pointerup","pointercancel"])e.addEventListener(n,()=>{this.fHeld&&(this.fHeld=!1,this.fChord||this.viewport.frameSelected(),this.fChord=!1)})}get fHeld(){return this.router.fHeld}set fHeld(t){this.router.fHeld=t}get fChord(){return this.router.fChord}set fChord(t){this.router.fChord=t}syncModButtons(){for(const[t,e]of[["shift","modShift"],["ctrl","modCtrl"],["alt","modAlt"]])Lt(e).dataset.state=this.state.mods[t]}bindKeyboard(){window.addEventListener("keydown",t=>{const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;const n=Jo.find(a=>a.key===t.key);if(n){t.preventDefault(),this.setCompMode(n.id);return}const s=vM[t.key];if(s){this.setDisplay(s);return}if(t.key==="f"||t.key==="F"){this.viewport.frameSelected();return}const r={q:"all",t:"all",w:"move",e:"rotate",r:"scale"}[t.key.toLowerCase()];if(r&&!t.ctrlKey&&!t.metaKey){this.setManip(r);return}if(t.key===">"||t.key==="."){this.growOrShrink(!0);return}if(t.key==="<"||t.key===","){this.growOrShrink(!1);return}const o={x:"grid",v:"vertex",c:"edge"}[t.key.toLowerCase()];if(o&&!t.ctrlKey&&!t.metaKey){this.state.snap.kind=o,this.state.snapKeyHeld||(this.state.snapKeyHeld=!0,this.hud.toast(`スナップ: ${Cs[this.state.snap.kind]}（押している間）`),this.refresh());return}if(t.key==="s"||t.key==="S"){this.state.symX=!this.state.symX,this.refresh(),this.hud.toast(`対称編集 X: ${this.state.symX?"オン":"オフ"}`);return}if((t.ctrlKey||t.metaKey)&&(t.key==="z"||t.key==="Z")){t.preventDefault(),t.shiftKey?this.doRedo():this.doUndo();return}(t.ctrlKey||t.metaKey)&&(t.key==="y"||t.key==="Y")&&(t.preventDefault(),this.doRedo())}),window.addEventListener("keyup",t=>{this.state.snapKeyHeld&&["x","v","c"].includes(t.key.toLowerCase())&&(this.state.snapKeyHeld=!1,this.preselect.clear(),this.refresh(),this.hud.defaultHint())})}bindTopBar(){Lt("btnUndo").addEventListener("click",()=>this.doUndo()),Lt("btnRedo").addEventListener("click",()=>this.doRedo()),Lt("btnPanels").addEventListener("click",()=>{this.state.panelsHidden=!this.state.panelsHidden,Lt("btnPanels").setAttribute("aria-pressed",String(this.state.panelsHidden)),Lt("dockLeft").hidden=this.state.panelsHidden,Lt("dockColRight").hidden=this.state.panelsHidden,this.layout.apply(),this.viewport.resize()}),kh(Lt("modeBtn"),()=>this.modeMenu(),()=>this.hud.toast("長押しでモードを選べます")),Lt("fileBtn").addEventListener("click",t=>this.openFileMenu(t.currentTarget)),document.addEventListener("pointerdown",t=>{this.popup&&!this.popup.contains(t.target)&&this.closePopup()})}closePopup(){this.popup?.remove(),this.popup=null,Cc()}openFileMenu(t){this.closePopup();const e=t.getBoundingClientRect(),n=mt("div","panel floating");n.style.left=`${e.left}px`,n.style.top=`${e.bottom+2}px`;const s=mt("div","pbody"),r=(o,a)=>{const c=mt("button","act",o);c.addEventListener("click",()=>{this.closePopup(),a()}),s.appendChild(c)};r("新規シーン",()=>this.newScene()),r("プロジェクトを開く (.mbz)",()=>this.openProject()),r("プロジェクトを保存 (.mbz)",()=>this.saveProject()),r("OBJ を読み込む",()=>this.importObj()),r("OBJ を書き出す",()=>this.exportObj()),n.appendChild(s),document.body.appendChild(n),this.popup=n}async newScene(){this.history.push("新規シーン"),this.state.doc.objects.length=0,this.state.select(null),this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]),this.viewport.syncAll(),this.refresh(),await this.autosave.saveNow()}async saveProject(){const{packMbz:t}=await Bc(async()=>{const{packMbz:r}=await import("./index-DMk3xyK4.js");return{packMbz:r}},[]),e=t(this.state.doc,{appVersion:"0.1.0"}),n=`${this.state.doc.objects[0]?.name??"scene"}.mbz`,s=await Ch(e,n);this.hud.toast(s.saved?`${n} を保存しました`:"保存を取り消しました")}async openProject(){const t=await Rh(".mbz");if(t)try{const{unpackMbz:e}=await Bc(async()=>{const{unpackMbz:s}=await import("./index-DMk3xyK4.js");return{unpackMbz:s}},[]),{document:n}=e(t.bytes);this.state.doc=n,this.state.select(n.objects[0]??null),this.history.clear(),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を開きました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async importObj(){const t=await Rh(".obj,text/plain");if(t)try{const e=Sx(t.text);if(!e.length)return void this.hud.toast("面が見つかりませんでした");this.history.push("OBJ 読み込み");let n=null;for(const s of e)n=this.state.doc.addMesh(s.mesh,s.name);this.state.select(n),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を読み込みました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async exportObj(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;if(!t.length)return void this.hud.toast("書き出すものがありません");const e=bx(t.map(r=>({mesh:r.mesh,name:r.name}))),n=`${t[0].name}.obj`,s=await Ch(e,n);this.hud.toast(s.saved?`${n} を書き出しました`:"書き出しを取り消しました")}refresh(){this.preselect.clear(),this.viewport.applyDisplayAll(),this.refreshManipulator(),this.hud.refreshStats();for(const t of this.gauges)t.paint();this.updateHistoryButtons(),this.paramSnapshot||this.renderPanels()}}document.addEventListener("contextmenu",i=>i.preventDefault());document.addEventListener("selectstart",i=>{const t=i.target;t&&t.tagName!=="INPUT"&&t.tagName!=="TEXTAREA"&&i.preventDefault()});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/macbethUnity/app/sw.js",{scope:"/macbethUnity/app/"})});const ju=new MM;ju.boot();Object.assign(window,{macbeth:ju});export{gx as $,Cu as A,nn as B,Yn as C,Uu as D,Rx as E,wv as F,Rv as G,ux as H,Cv as I,Hv as J,$v as K,Ov as L,Xr as M,Nt as N,zo as O,ps as P,fx as Q,Pu as R,_x as S,Cx as T,An as U,qv as V,Yl as W,ql as X,Zl as Y,EM as Z,Ie as _,Fu as a,eh as a0,Du as a1,Tv as a2,bM as a3,Ev as a4,bu as a5,ix as a6,Ru as a7,Au as a8,Av as a9,Zv as aa,rx as ab,yc as ac,Sx as ad,ox as ae,qa as af,lx as ag,cx as ah,Kv as ai,hx as aj,Lu as ak,dx as al,vx as am,nh as an,Xa as ao,yx as ap,Iu as aq,Xv as ar,SM as as,Wr as at,bx as au,ds as b,ie as c,bv as d,Ya as e,th as f,sx as g,Dv as h,mx as i,zv as j,Sc as k,AM as l,Mx as m,px as n,jv as o,Qx as p,bc as q,wM as r,pi as s,Pv as t,n_ as u,Yv as v,qn as w,TM as x,ex as y,Wv as z};
//# sourceMappingURL=index-C5QSPRA4.js.map
