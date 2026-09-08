(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const mp="modulepreload",gp=function(i){return"/macbethUnity/app/"+i},Ll={},Il=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=o(e.map(l=>{if(l=gp(l),l in Ll)return;Ll[l]=!0;const h=l.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const u=document.createElement("link");if(u.rel=h?"stylesheet":mp,h||(u.as="script"),u.crossOrigin="",u.href=l,c&&u.setAttribute("nonce",c),document.head.appendChild(u),h)return new Promise((f,p)=>{u.addEventListener("load",f),u.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Dc="185",vp=0,Ul=1,xp=2,Wr=1,_p=2,Os=3,Mi=0,Je=1,Xe=2,ii=0,us=1,Dl=2,Nl=3,Fl=4,Mp=5,Li=100,yp=101,bp=102,Sp=103,wp=104,Ep=200,Tp=201,Cp=202,Ap=203,xa=204,_a=205,Rp=206,Pp=207,Lp=208,Ip=209,Up=210,Dp=211,Np=212,Fp=213,Op=214,Ma=0,ya=1,ba=2,gs=3,Sa=4,wa=5,Ea=6,Ta=7,Nc=0,kp=1,Bp=2,Bn=0,Bu=1,zu=2,Vu=3,Hu=4,Gu=5,Wu=6,Xu=7,$u=300,Fi=301,vs=302,So=303,wo=304,po=306,Oi=1e3,ni=1001,Ca=1002,Ie=1003,zp=1004,lr=1005,Ve=1006,Eo=1007,Ui=1008,rn=1009,qu=1010,Yu=1011,Xs=1012,Fc=1013,Gn=1014,Fn=1015,ri=1016,Oc=1017,kc=1018,$s=1020,Ku=35902,Zu=35899,ju=1021,Ju=1022,yn=1023,oi=1026,Di=1027,Qu=1028,Bc=1029,ki=1030,zc=1031,Vc=1033,Xr=33776,$r=33777,qr=33778,Yr=33779,Aa=35840,Ra=35841,Pa=35842,La=35843,Ia=36196,Ua=37492,Da=37496,Na=37488,Fa=37489,Qr=37490,Oa=37491,ka=37808,Ba=37809,za=37810,Va=37811,Ha=37812,Ga=37813,Wa=37814,Xa=37815,$a=37816,qa=37817,Ya=37818,Ka=37819,Za=37820,ja=37821,Ja=36492,Qa=36494,tc=36495,ec=36283,nc=36284,to=36285,ic=36286,Vp=3200,sc=0,Hp=1,xi="",un="srgb",eo="srgb-linear",no="linear",te="srgb",Xi=7680,Ol=519,Gp=512,Wp=513,Xp=514,Hc=515,$p=516,qp=517,Gc=518,Yp=519,kl=35044,Bl="300 es",On=2e3,qs=2001;function Kp(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function io(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Zp(){const i=io("canvas");return i.style.display="block",i}const zl={};function Vl(...i){const t="THREE."+i.shift();console.log(t,...i)}function tf(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Dt(...i){i=tf(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function qt(...i){i=tf(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function fs(...i){const t=i.join(" ");t in zl||(zl[t]=!0,Dt(...i))}function jp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Jp={[Ma]:ya,[ba]:Ea,[Sa]:Ta,[gs]:wa,[ya]:Ma,[Ea]:ba,[Ta]:Sa,[wa]:gs};class Vi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],To=Math.PI/180,rc=180/Math.PI;function tr(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function Qp(i,t){return(i%t+t)%t}function Co(i,t,e){return(1-e)*i+e*t}function Ss(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function qe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Wt{static{Wt.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class cn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],p=r[o+2],v=r[o+3];if(d!==v||c!==u||l!==f||h!==p){let g=c*u+l*f+h*p+d*v;g<0&&(u=-u,f=-f,p=-p,v=-v,g=-g);let m=1-a;if(g<.9995){const x=Math.acos(g),y=Math.sin(x);m=Math.sin(m*x)/y,a=Math.sin(a*x)/y,c=c*m+u*a,l=l*m+f*a,h=h*m+p*a,d=d*m+v*a}else{c=c*m+u*a,l=l*m+f*a,h=h*m+p*a,d=d*m+v*a;const x=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=x,l*=x,h*=x,d*=x}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],p=r[o+3];return t[e]=a*p+h*d+c*f-l*u,t[e+1]=c*p+h*u+l*d-a*f,t[e+2]=l*p+h*f+a*u-c*d,t[e+3]=h*p-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),d=a(r/2),u=c(n/2),f=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"YZX":this._x=u*h*d+l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d-u*f*p;break;case"XZY":this._x=u*h*d-l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d+u*f*p;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{static{I.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Hl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Hl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ao.copy(this).projectOnVector(t),this.sub(Ao)}reflect(t){return this.sub(Ao.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ao=new I,Hl=new cn;class Ot{static{Ot.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],v=s[0],g=s[3],m=s[6],x=s[1],y=s[4],_=s[7],S=s[2],w=s[5],T=s[8];return r[0]=o*v+a*x+c*S,r[3]=o*g+a*y+c*w,r[6]=o*m+a*_+c*T,r[1]=l*v+h*x+d*S,r[4]=l*g+h*y+d*w,r[7]=l*m+h*_+d*T,r[2]=u*v+f*x+p*S,r[5]=u*g+f*y+p*w,r[8]=u*m+f*_+p*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*r,f=l*r-o*c,p=e*d+n*u+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=d*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=u*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return fs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ro.makeScale(t,e)),this}rotate(t){return fs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ro.makeRotation(-t)),this}translate(t,e){return fs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ro.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ro=new Ot,Gl=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wl=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tm(){const i={enabled:!0,workingColorSpace:eo,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===te&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===te&&(s.r=ds(s.r),s.g=ds(s.g),s.b=ds(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===xi?no:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return fs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return fs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[eo]:{primaries:t,whitePoint:n,transfer:no,toXYZ:Gl,fromXYZ:Wl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:t,whitePoint:n,transfer:te,toXYZ:Gl,fromXYZ:Wl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),i}const Xt=tm();function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ds(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let $i;class em{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{$i===void 0&&($i=io("canvas")),$i.width=t.width,$i.height=t.height;const s=$i.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=$i}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=io("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=si(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(si(e[n]/255)*255):e[n]=si(e[n]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let nm=0;class Wc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=tr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Po(s[o].image)):r.push(Po(s[o]))}else r=Po(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Po(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?em.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let im=0;const Lo=new I;class He extends Vi{constructor(t=He.DEFAULT_IMAGE,e=He.DEFAULT_MAPPING,n=ni,s=ni,r=Ve,o=Ui,a=yn,c=rn,l=He.DEFAULT_ANISOTROPY,h=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=tr(),this.name="",this.source=new Wc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Lo).x}get height(){return this.source.getSize(Lo).y}get depth(){return this.source.getSize(Lo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$u)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Oi:t.x=t.x-Math.floor(t.x);break;case ni:t.x=t.x<0?0:1;break;case Ca:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Oi:t.y=t.y-Math.floor(t.y);break;case ni:t.y=t.y<0?0:1;break;case Ca:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=$u;He.DEFAULT_ANISOTROPY=1;class ue{static{ue.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],p=c[9],v=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,_=(f+1)/2,S=(m+1)/2,w=(h+u)/4,T=(d+v)/4,M=(p+g)/4;return y>_&&y>S?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=w/n,r=T/n):_>S?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=M/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=T/r,s=M/r),this.set(n,s,r,e),this}let x=Math.sqrt((g-p)*(g-p)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(d-v)/x,this.z=(u-h)/x,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sm extends Vi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ve,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new He(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Ve,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Wc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wn extends sm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ef extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class rm extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oe{static{oe.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,h,d,u,f,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,d,u,f,p,v,g)}set(t,e,n,s,r,o,a,c,l,h,d,u,f,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/qi.setFromMatrixColumn(t,0).length(),r=1/qi.setFromMatrixColumn(t,1).length(),o=1/qi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,f=o*d,p=a*h,v=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+p*l,e[5]=u-v*l,e[9]=-a*c,e[2]=v-u*l,e[6]=p+f*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,p=l*h,v=l*d;e[0]=u+v*a,e[4]=p*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=v+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,p=l*h,v=l*d;e[0]=u-v*a,e[4]=-o*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=v-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*h,f=o*d,p=a*h,v=a*d;e[0]=c*h,e[4]=p*l-f,e[8]=u*l+v,e[1]=c*d,e[5]=v*l+u,e[9]=f*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,f=o*l,p=a*c,v=a*l;e[0]=c*h,e[4]=v-u*d,e[8]=p*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+p,e[10]=u-v*d}else if(t.order==="XZY"){const u=o*c,f=o*l,p=a*c,v=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+v,e[5]=o*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(om,t,am)}lookAt(t,e,n){const s=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),hi.crossVectors(n,tn),hi.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),hi.crossVectors(n,tn)),hi.normalize(),hr.crossVectors(tn,hi),s[0]=hi.x,s[4]=hr.x,s[8]=tn.x,s[1]=hi.y,s[5]=hr.y,s[9]=tn.y,s[2]=hi.z,s[6]=hr.z,s[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],x=n[3],y=n[7],_=n[11],S=n[15],w=s[0],T=s[4],M=s[8],E=s[12],P=s[1],A=s[5],L=s[9],z=s[13],F=s[2],U=s[6],B=s[10],D=s[14],q=s[3],j=s[7],st=s[11],tt=s[15];return r[0]=o*w+a*P+c*F+l*q,r[4]=o*T+a*A+c*U+l*j,r[8]=o*M+a*L+c*B+l*st,r[12]=o*E+a*z+c*D+l*tt,r[1]=h*w+d*P+u*F+f*q,r[5]=h*T+d*A+u*U+f*j,r[9]=h*M+d*L+u*B+f*st,r[13]=h*E+d*z+u*D+f*tt,r[2]=p*w+v*P+g*F+m*q,r[6]=p*T+v*A+g*U+m*j,r[10]=p*M+v*L+g*B+m*st,r[14]=p*E+v*z+g*D+m*tt,r[3]=x*w+y*P+_*F+S*q,r[7]=x*T+y*A+_*U+S*j,r[11]=x*M+y*L+_*B+S*st,r[15]=x*E+y*z+_*D+S*tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],v=t[7],g=t[11],m=t[15],x=c*f-l*u,y=a*f-l*d,_=a*u-c*d,S=o*f-l*h,w=o*u-c*h,T=o*d-a*h;return e*(v*x-g*y+m*_)-n*(p*x-g*S+m*w)+s*(p*y-v*S+m*T)-r*(p*_-v*w+g*T)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],h=t[10];return e*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],v=t[13],g=t[14],m=t[15],x=e*a-n*o,y=e*c-s*o,_=e*l-r*o,S=n*c-s*a,w=n*l-r*a,T=s*l-r*c,M=h*v-d*p,E=h*g-u*p,P=h*m-f*p,A=d*g-u*v,L=d*m-f*v,z=u*m-f*g,F=x*z-y*L+_*A+S*P-w*E+T*M;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/F;return t[0]=(a*z-c*L+l*A)*U,t[1]=(s*L-n*z-r*A)*U,t[2]=(v*T-g*w+m*S)*U,t[3]=(u*w-d*T-f*S)*U,t[4]=(c*P-o*z-l*E)*U,t[5]=(e*z-s*P+r*E)*U,t[6]=(g*_-p*T-m*y)*U,t[7]=(h*T-u*_+f*y)*U,t[8]=(o*L-a*P+l*M)*U,t[9]=(n*P-e*L-r*M)*U,t[10]=(p*w-v*_+m*x)*U,t[11]=(d*_-h*w-f*x)*U,t[12]=(a*E-o*A-c*M)*U,t[13]=(e*A-n*E+s*M)*U,t[14]=(v*y-p*S-g*x)*U,t[15]=(h*S-d*y+u*x)*U,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,d=a+a,u=r*l,f=r*h,p=r*d,v=o*h,g=o*d,m=a*d,x=c*l,y=c*h,_=c*d,S=n.x,w=n.y,T=n.z;return s[0]=(1-(v+m))*S,s[1]=(f+_)*S,s[2]=(p-y)*S,s[3]=0,s[4]=(f-_)*w,s[5]=(1-(u+m))*w,s[6]=(g+x)*w,s[7]=0,s[8]=(p+y)*T,s[9]=(g-x)*T,s[10]=(1-(u+v))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=qi.set(s[0],s[1],s[2]).length();const a=qi.set(s[4],s[5],s[6]).length(),c=qi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),pn.copy(this);const l=1/o,h=1/a,d=1/c;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=d,pn.elements[9]*=d,pn.elements[10]*=d,e.setFromRotationMatrix(pn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=On,c=!1){const l=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let p,v;if(c)p=r/(o-r),v=o*r/(o-r);else if(a===On)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===qs)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=On,c=!1){const l=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s);let p,v;if(c)p=1/(o-r),v=o/(o-r);else if(a===On)p=-2/(o-r),v=-(o+r)/(o-r);else if(a===qs)p=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const qi=new I,pn=new oe,om=new I(0,0,0),am=new I(1,1,1),hi=new I,hr=new I,tn=new I,Xl=new oe,$l=new cn;class Wn{constructor(t=0,e=0,n=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin($t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$t(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin($t(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-$t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Xl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $l.setFromEuler(this),this.setFromQuaternion($l,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class Xc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let cm=0;const ql=new I,Yi=new cn,$n=new oe,ur=new I,ws=new I,lm=new I,hm=new cn,Yl=new I(1,0,0),Kl=new I(0,1,0),Zl=new I(0,0,1),jl={type:"added"},um={type:"removed"},Ki={type:"childadded",child:null},Io={type:"childremoved",child:null};class Ce extends Vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=tr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new I,e=new Wn,n=new cn,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new Ot}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.premultiply(Yi),this}rotateX(t){return this.rotateOnAxis(Yl,t)}rotateY(t){return this.rotateOnAxis(Kl,t)}rotateZ(t){return this.rotateOnAxis(Zl,t)}translateOnAxis(t,e){return ql.copy(t).applyQuaternion(this.quaternion),this.position.add(ql.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yl,t)}translateY(t){return this.translateOnAxis(Kl,t)}translateZ(t){return this.translateOnAxis(Zl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ur.copy(t):ur.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(ws,ur,this.up):$n.lookAt(ur,ws,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),Yi.setFromRotationMatrix($n),this.quaternion.premultiply(Yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(jl),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(um),Io.child=t,this.dispatchEvent(Io),Io.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),$n.multiply(t.parent.matrixWorld)),t.applyMatrix4($n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(jl),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,t,lm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,hm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ce.DEFAULT_UP=new I(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _n extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fm={type:"move"};class Uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;l.inputState.pinching&&u>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(fm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new _n;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const nf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},fr={h:0,s:0,l:0};function Do(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=Qp(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Do(o,r,t+1/3),this.g=Do(o,r,t),this.b=Do(o,r,t-1/3)}return Xt.colorSpaceToWorking(this,s),this}setStyle(t,e=un){function n(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=un){const n=nf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=si(t.r),this.g=si(t.g),this.b=si(t.b),this}copyLinearToSRGB(t){return this.r=ds(t.r),this.g=ds(t.g),this.b=ds(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=un){return Xt.workingToColorSpace(Be.copy(this),t),Math.round($t(Be.r*255,0,255))*65536+Math.round($t(Be.g*255,0,255))*256+Math.round($t(Be.b*255,0,255))}getHexString(t=un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.workingToColorSpace(Be.copy(this),e);const n=Be.r,s=Be.g,r=Be.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=un){Xt.workingToColorSpace(Be.copy(this),t);const e=Be.r,n=Be.g,s=Be.b;return t!==un?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ui),this.setHSL(ui.h+t,ui.s+e,ui.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ui),t.getHSL(fr);const n=Co(ui.h,fr.h,e),s=Co(ui.s,fr.s,e),r=Co(ui.l,fr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new Gt;Gt.NAMES=nf;class oc extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const mn=new I,qn=new I,No=new I,Yn=new I,Zi=new I,ji=new I,Jl=new I,Fo=new I,Oo=new I,ko=new I,Bo=new ue,zo=new ue,Vo=new ue;class Mn{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),mn.subVectors(t,e),s.cross(mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){mn.subVectors(s,e),qn.subVectors(n,e),No.subVectors(t,e);const o=mn.dot(mn),a=mn.dot(qn),c=mn.dot(No),l=qn.dot(qn),h=qn.dot(No),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,p=(o*h-a*c)*u;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Yn.x),c.addScaledVector(o,Yn.y),c.addScaledVector(a,Yn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Bo.setScalar(0),zo.setScalar(0),Vo.setScalar(0),Bo.fromBufferAttribute(t,e),zo.fromBufferAttribute(t,n),Vo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Bo,r.x),o.addScaledVector(zo,r.y),o.addScaledVector(Vo,r.z),o}static isFrontFacing(t,e,n,s){return mn.subVectors(n,e),qn.subVectors(t,e),mn.cross(qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),mn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Mn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Zi.subVectors(s,n),ji.subVectors(r,n),Fo.subVectors(t,n);const c=Zi.dot(Fo),l=ji.dot(Fo);if(c<=0&&l<=0)return e.copy(n);Oo.subVectors(t,s);const h=Zi.dot(Oo),d=ji.dot(Oo);if(h>=0&&d<=h)return e.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Zi,o);ko.subVectors(t,r);const f=Zi.dot(ko),p=ji.dot(ko);if(p>=0&&f<=p)return e.copy(r);const v=f*l-c*p;if(v<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(ji,a);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return Jl.subVectors(r,s),a=(d-h)/(d-h+(f-p)),e.copy(s).addScaledVector(Jl,a);const m=1/(g+v+u);return o=v*m,a=u*m,e.copy(n).addScaledVector(Zi,o).addScaledVector(ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ms{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),dr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),dr.copy(n.boundingBox)),dr.applyMatrix4(t.matrixWorld),this.union(dr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Es),pr.subVectors(this.max,Es),Ji.subVectors(t.a,Es),Qi.subVectors(t.b,Es),ts.subVectors(t.c,Es),fi.subVectors(Qi,Ji),di.subVectors(ts,Qi),Ei.subVectors(Ji,ts);let e=[0,-fi.z,fi.y,0,-di.z,di.y,0,-Ei.z,Ei.y,fi.z,0,-fi.x,di.z,0,-di.x,Ei.z,0,-Ei.x,-fi.y,fi.x,0,-di.y,di.x,0,-Ei.y,Ei.x,0];return!Ho(e,Ji,Qi,ts,pr)||(e=[1,0,0,0,1,0,0,0,1],!Ho(e,Ji,Qi,ts,pr))?!1:(mr.crossVectors(fi,di),e=[mr.x,mr.y,mr.z],Ho(e,Ji,Qi,ts,pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Kn=[new I,new I,new I,new I,new I,new I,new I,new I],gn=new I,dr=new Ms,Ji=new I,Qi=new I,ts=new I,fi=new I,di=new I,Ei=new I,Es=new I,pr=new I,mr=new I,Ti=new I;function Ho(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ti.fromArray(i,r);const a=s.x*Math.abs(Ti.x)+s.y*Math.abs(Ti.y)+s.z*Math.abs(Ti.z),c=t.dot(Ti),l=e.dot(Ti),h=n.dot(Ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const be=new I,gr=new Wt;let dm=0;class zn extends Vi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=kl,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)gr.fromBufferAttribute(this,e),gr.applyMatrix3(t),this.setXY(e,gr.x,gr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ss(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=qe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ss(e,this.array)),e}setX(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ss(e,this.array)),e}setY(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ss(e,this.array)),e}setZ(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ss(e,this.array)),e}setW(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array),r=qe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==kl&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class sf extends zn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class rf extends zn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Zt extends zn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const pm=new Ms,Ts=new I,Go=new I;class er{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):pm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ts.subVectors(t,this.center);const e=Ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ts,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Go.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ts.copy(t.center).add(Go)),this.expandByPoint(Ts.copy(t.center).sub(Go))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let mm=0;const hn=new oe,Wo=new Ce,es=new I,en=new Ms,Cs=new Ms,Le=new I;class he extends Vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=tr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kp(t)?rf:sf)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return Wo.lookAt(t),Wo.updateMatrix(),this.applyMatrix4(Wo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ms);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new er);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(en.min,Cs.min),en.expandByPoint(Le),Le.addVectors(en.max,Cs.max),en.expandByPoint(Le)):(en.expandByPoint(Cs.min),en.expandByPoint(Cs.max))}en.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Le.fromBufferAttribute(a,l),c&&(es.fromBufferAttribute(t,l),Le.add(es)),s=Math.max(s,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new zn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let M=0;M<n.count;M++)a[M]=new I,c[M]=new I;const l=new I,h=new I,d=new I,u=new Wt,f=new Wt,p=new Wt,v=new I,g=new I;function m(M,E,P){l.fromBufferAttribute(n,M),h.fromBufferAttribute(n,E),d.fromBufferAttribute(n,P),u.fromBufferAttribute(r,M),f.fromBufferAttribute(r,E),p.fromBufferAttribute(r,P),h.sub(l),d.sub(l),f.sub(u),p.sub(u);const A=1/(f.x*p.y-p.x*f.y);isFinite(A)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(A),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(A),a[M].add(v),a[E].add(v),a[P].add(v),c[M].add(g),c[E].add(g),c[P].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let M=0,E=x.length;M<E;++M){const P=x[M],A=P.start,L=P.count;for(let z=A,F=A+L;z<F;z+=3)m(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const y=new I,_=new I,S=new I,w=new I;function T(M){S.fromBufferAttribute(s,M),w.copy(S);const E=a[M];y.copy(E),y.sub(S.multiplyScalar(S.dot(E))).normalize(),_.crossVectors(w,E);const A=_.dot(c[M])<0?-1:1;o.setXYZW(M,y.x,y.y,y.z,A)}for(let M=0,E=x.length;M<E;++M){const P=x[M],A=P.start,L=P.count;for(let z=A,F=A+L;z<F;z+=3)T(t.getX(z+0)),T(t.getX(z+1)),T(t.getX(z+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new zn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,d=new I;if(t)for(let u=0,f=t.count;u<f;u+=3){const p=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,p=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let m=0;m<h;m++)u[p++]=l[f++]}return new zn(u,h,d)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new he,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let gm=0;class Hi extends Vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=tr(),this.name="",this.type="Material",this.blending=us,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xa,this.blendDst=_a,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ol,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==us&&(n.blending=this.blending),this.side!==Mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xa&&(n.blendSrc=this.blendSrc),this.blendDst!==_a&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ol&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Gt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Wt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Wt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Zn=new I,Xo=new I,vr=new I,pi=new I,$o=new I,xr=new I,qo=new I;class mo{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Xo.copy(t).add(e).multiplyScalar(.5),vr.copy(e).sub(t).normalize(),pi.copy(this.origin).sub(Xo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(vr),a=pi.dot(this.direction),c=-pi.dot(vr),l=pi.lengthSq(),h=Math.abs(1-o*o);let d,u,f,p;if(h>0)if(d=o*c-a,u=o*a-c,p=r*h,d>=0)if(u>=-p)if(u<=p){const v=1/h;d*=v,u*=v,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-p?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=p?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Xo).addScaledVector(vr,u),f}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);const n=Zn.dot(this.direction),s=Zn.dot(Zn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,s,r){$o.subVectors(e,t),xr.subVectors(n,t),qo.crossVectors($o,xr);let o=this.direction.dot(qo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;pi.subVectors(this.origin,t);const c=a*this.direction.dot(xr.crossVectors(pi,xr));if(c<0)return null;const l=a*this.direction.dot($o.cross(pi));if(l<0||c+l>o)return null;const h=-a*pi.dot(qo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bn extends Hi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Nc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ql=new oe,Ci=new mo,_r=new er,th=new I,Mr=new I,yr=new I,br=new I,Yo=new I,Sr=new I,eh=new I,wr=new I;let we=class extends Ce{constructor(t=new he,e=new bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Sr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],d=r[c];h!==0&&(Yo.fromBufferAttribute(d,t),o?Sr.addScaledVector(Yo,h):Sr.addScaledVector(Yo.sub(e),h))}e.add(Sr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(r),Ci.copy(t.ray).recast(t.near),!(_r.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(_r,th)===null||Ci.origin.distanceToSquared(th)>(t.far-t.near)**2))&&(Ql.copy(r).invert(),Ci.copy(t.ray).applyMatrix4(Ql),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ci)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=o[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=x,S=y;_<S;_+=3){const w=a.getX(_),T=a.getX(_+1),M=a.getX(_+2);s=Er(this,m,t,n,l,h,d,w,T,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=a.getX(g),y=a.getX(g+1),_=a.getX(g+2);s=Er(this,o,t,n,l,h,d,x,y,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=o[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let _=x,S=y;_<S;_+=3){const w=_,T=_+1,M=_+2;s=Er(this,m,t,n,l,h,d,w,T,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=g,y=g+1,_=g+2;s=Er(this,o,t,n,l,h,d,x,y,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function vm(i,t,e,n,s,r,o,a){let c;if(t.side===Je?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Mi,a),c===null)return null;wr.copy(a),wr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(wr);return l<e.near||l>e.far?null:{distance:l,point:wr.clone(),object:i}}function Er(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Mr),i.getVertexPosition(c,yr),i.getVertexPosition(l,br);const h=vm(i,t,e,n,Mr,yr,br,eh);if(h){const d=new I;Mn.getBarycoord(eh,Mr,yr,br,d),s&&(h.uv=Mn.getInterpolatedAttribute(s,a,c,l,d,new Wt)),r&&(h.uv1=Mn.getInterpolatedAttribute(r,a,c,l,d,new Wt)),o&&(h.normal=Mn.getInterpolatedAttribute(o,a,c,l,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new I,materialIndex:0};Mn.getNormal(Mr,yr,br,u.normal),h.face=u,h.barycoord=d}return h}class xm extends He{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Ie,h=Ie,d,u){super(null,o,a,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ko=new I,_m=new I,Mm=new Ot;class Qn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ko.subVectors(n,e).cross(_m.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Ko),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Mm.getNormalMatrix(t),s=this.coplanarPoint(Ko).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ai=new er,ym=new Wt(.5,.5),Tr=new I;class $c{constructor(t=new Qn,e=new Qn,n=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],v=r[9],g=r[10],m=r[11],x=r[12],y=r[13],_=r[14],S=r[15];if(s[0].setComponents(l-o,f-h,m-p,S-x).normalize(),s[1].setComponents(l+o,f+h,m+p,S+x).normalize(),s[2].setComponents(l+a,f+d,m+v,S+y).normalize(),s[3].setComponents(l-a,f-d,m-v,S-y).normalize(),n)s[4].setComponents(c,u,g,_).normalize(),s[5].setComponents(l-c,f-u,m-g,S-_).normalize();else if(s[4].setComponents(l-c,f-u,m-g,S-_).normalize(),e===On)s[5].setComponents(l+c,f+u,m+g,S+_).normalize();else if(e===qs)s[5].setComponents(c,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(t){Ai.center.set(0,0,0);const e=ym.distanceTo(t.center);return Ai.radius=.7071067811865476+e,Ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Tr.x=s.normal.x>0?t.max.x:t.min.x,Tr.y=s.normal.y>0?t.max.y:t.min.y,Tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Se extends Hi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const so=new I,ro=new I,nh=new oe,As=new mo,Cr=new er,Zo=new I,ih=new I;class nr extends Ce{constructor(t=new he,e=new Se){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)so.fromBufferAttribute(e,s-1),ro.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=so.distanceTo(ro);t.setAttribute("lineDistance",new Zt(n,1))}else Dt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;nh.copy(s).invert(),As.copy(t.ray).applyMatrix4(nh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let v=f,g=p-1;v<g;v+=l){const m=h.getX(v),x=h.getX(v+1),y=Ar(this,t,As,c,m,x,v);y&&e.push(y)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=Ar(this,t,As,c,v,g,p-1);m&&e.push(m)}}else{const f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let v=f,g=p-1;v<g;v+=l){const m=Ar(this,t,As,c,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=Ar(this,t,As,c,p-1,f,p-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ar(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(so.fromBufferAttribute(a,s),ro.fromBufferAttribute(a,r),e.distanceSqToSegment(so,ro,Zo,ih)>n)return;Zo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Zo);if(!(l<t.near||l>t.far))return{distance:l,point:ih.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const sh=new I,rh=new I;class Dn extends nr{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)sh.fromBufferAttribute(e,s),rh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+sh.distanceTo(rh);t.setAttribute("lineDistance",new Zt(n,1))}else Dt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class on extends Hi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const oh=new oe,ac=new mo,Rr=new er,Pr=new I;class dn extends Ce{constructor(t=new he,e=new on){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(s),Rr.radius+=r,t.ray.intersectsSphere(Rr)===!1)return;oh.copy(s).invert(),ac.copy(t.ray).applyMatrix4(oh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let p=u,v=f;p<v;p++){const g=l.getX(p);Pr.fromBufferAttribute(d,g),ah(Pr,g,c,s,t,e,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,v=f;p<v;p++)Pr.fromBufferAttribute(d,p),ah(Pr,p,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ah(i,t,e,n,s,r,o){const a=ac.distanceSqToPoint(i);if(a<e){const c=new I;ac.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class of extends He{constructor(t=[],e=Fi,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class af extends He{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xs extends He{constructor(t,e,n=Gn,s,r,o,a=Ie,c=Ie,l,h=oi,d=1){if(h!==oi&&h!==Di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Wc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class bm extends xs{constructor(t,e=Gn,n=Fi,s,r,o=Ie,a=Ie,c,l=oi){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class cf extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Bi extends he{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,s,o,2),p("x","z","y",1,-1,t,n,-e,s,o,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2));function p(v,g,m,x,y,_,S,w,T,M,E){const P=_/T,A=S/M,L=_/2,z=S/2,F=w/2,U=T+1,B=M+1;let D=0,q=0;const j=new I;for(let st=0;st<B;st++){const tt=st*A-z;for(let ot=0;ot<U;ot++){const Ct=ot*P-L;j[v]=Ct*x,j[g]=tt*y,j[m]=F,l.push(j.x,j.y,j.z),j[v]=0,j[g]=0,j[m]=w>0?1:-1,h.push(j.x,j.y,j.z),d.push(ot/T),d.push(1-st/M),D+=1}}for(let st=0;st<M;st++)for(let tt=0;tt<T;tt++){const ot=u+tt+U*st,Ct=u+tt+U*(st+1),Ft=u+(tt+1)+U*(st+1),At=u+(tt+1)+U*st;c.push(ot,Ct,At),c.push(Ct,Ft,At),q+=6}a.addGroup(f,q,E),f+=q,u+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class qc extends he{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let p=0;const v=[],g=n/2;let m=0;x(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Zt(d,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2));function x(){const _=new I,S=new I;let w=0;const T=(e-t)/n;for(let M=0;M<=r;M++){const E=[],P=M/r,A=P*(e-t)+t;for(let L=0;L<=s;L++){const z=L/s,F=z*c+a,U=Math.sin(F),B=Math.cos(F);S.x=A*U,S.y=-P*n+g,S.z=A*B,d.push(S.x,S.y,S.z),_.set(U,T,B).normalize(),u.push(_.x,_.y,_.z),f.push(z,1-P),E.push(p++)}v.push(E)}for(let M=0;M<s;M++)for(let E=0;E<r;E++){const P=v[E][M],A=v[E+1][M],L=v[E+1][M+1],z=v[E][M+1];(t>0||E!==0)&&(h.push(P,A,z),w+=3),(e>0||E!==r-1)&&(h.push(A,L,z),w+=3)}l.addGroup(m,w,0),m+=w}function y(_){const S=p,w=new Wt,T=new I;let M=0;const E=_===!0?t:e,P=_===!0?1:-1;for(let L=1;L<=s;L++)d.push(0,g*P,0),u.push(0,P,0),f.push(.5,.5),p++;const A=p;for(let L=0;L<=s;L++){const F=L/s*c+a,U=Math.cos(F),B=Math.sin(F);T.x=E*B,T.y=g*P,T.z=E*U,d.push(T.x,T.y,T.z),u.push(0,P,0),w.x=U*.5+.5,w.y=B*.5*P+.5,f.push(w.x,w.y),p++}for(let L=0;L<s;L++){const z=S+L,F=A+L;_===!0?h.push(F,F+1,z):h.push(F+1,F,z),M+=3}l.addGroup(m,M,_===!0?1:2),m+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qc(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Yc extends qc{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Yc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ir extends he{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,d=t/a,u=e/c,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const x=m*u-o;for(let y=0;y<l;y++){const _=y*d-r;p.push(_,-x,0),v.push(0,0,1),g.push(y/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const y=x+l*m,_=x+l*(m+1),S=x+1+l*(m+1),w=x+1+l*m;f.push(y,_,w),f.push(_,S,w)}this.setIndex(f),this.setAttribute("position",new Zt(p,3)),this.setAttribute("normal",new Zt(v,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ir(t.width,t.height,t.widthSegments,t.heightSegments)}}class Kc extends he{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],d=new I,u=new I,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const x=[],y=m/n,_=o+y*a,S=t*Math.cos(_),w=Math.sqrt(t*t-S*S);let T=0;m===0&&o===0?T=.5/e:m===n&&c===Math.PI&&(T=-.5/e);for(let M=0;M<=e;M++){const E=M/e,P=s+E*r;d.x=-w*Math.cos(P),d.y=S,d.z=w*Math.sin(P),p.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(E+T,1-y),x.push(l++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const y=h[m][x+1],_=h[m][x],S=h[m+1][x],w=h[m+1][x+1];(m!==0||o>0)&&f.push(y,_,w),(m!==n-1||c<Math.PI)&&f.push(_,S,w)}this.setIndex(f),this.setAttribute("position",new Zt(p,3)),this.setAttribute("normal",new Zt(v,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function _s(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(ch(s))s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(ch(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function We(i){const t={};for(let e=0;e<i.length;e++){const n=_s(i[e]);for(const s in n)t[s]=n[s]}return t}function ch(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Sm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function lf(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const wm={clone:_s,merge:We};var Em=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends Hi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Em,this.fragmentShader=Tm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_s(t.uniforms),this.uniformsGroups=Sm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Gt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Wt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ue().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"m4":this.uniforms[n].value=new oe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Cm extends Xn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class hf extends Hi{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Gt(16777215),this.specular=new Gt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Nc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Am extends Hi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Vp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Rm extends Hi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class uf extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Pm extends uf{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const jo=new oe,lh=new I,hh=new I;class Lm{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $c,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;lh.setFromMatrixPosition(t.matrixWorld),e.position.copy(lh),hh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hh),e.updateMatrixWorld(),jo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jo,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===qs||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Lr=new I,Ir=new cn,An=new I;class ff extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Lr,Ir,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lr,Ir,An.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Lr,Ir,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lr,Ir,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const mi=new I,uh=new Wt,fh=new Wt;class nn extends ff{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=rc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(To*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rc*2*Math.atan(Math.tan(To*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,uh,fh),e.subVectors(fh,uh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(To*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class sr extends ff{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Im extends Lm{constructor(){super(new sr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dh extends uf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Im}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const ns=-90,is=1;class Um extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(ns,is,t,e);s.layers=this.layers,this.add(s);const r=new nn(ns,is,t,e);r.layers=this.layers,this.add(r);const o=new nn(ns,is,t,e);o.layers=this.layers,this.add(o);const a=new nn(ns,is,t,e);a.layers=this.layers,this.add(a);const c=new nn(ns,is,t,e);c.layers=this.layers,this.add(c);const l=new nn(ns,is,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Dm extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const ph=new oe;class df{constructor(t,e,n=0,s=1/0){this.ray=new mo(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Xc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):qt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ph.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ph),this}intersectObject(t,e=!0,n=[]){return cc(t,this,n,e),n.sort(mh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)cc(t[s],this,n,e);return n.sort(mh),n}}function mh(i,t){return i.distance-t.distance}function cc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)cc(r[o],t,e,!0)}}class pf{static{pf.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}}class Nm extends Dn{constructor(t=10,e=10,n=4473924,s=8947848){n=new Gt(n),s=new Gt(s);const r=e/2,o=t/e,a=t/2,c=[],l=[];for(let u=0,f=0,p=-a;u<=e;u++,p+=o){c.push(-a,0,p,a,0,p),c.push(p,0,-a,p,0,a);const v=u===r?n:s;v.toArray(l,f),f+=3,v.toArray(l,f),f+=3,v.toArray(l,f),f+=3,v.toArray(l,f),f+=3}const h=new he;h.setAttribute("position",new Zt(c,3)),h.setAttribute("color",new Zt(l,3));const d=new Se({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function gh(i,t,e,n){const s=Fm(n);switch(e){case ju:return i*t;case Qu:return i*t/s.components*s.byteLength;case Bc:return i*t/s.components*s.byteLength;case ki:return i*t*2/s.components*s.byteLength;case zc:return i*t*2/s.components*s.byteLength;case Ju:return i*t*3/s.components*s.byteLength;case yn:return i*t*4/s.components*s.byteLength;case Vc:return i*t*4/s.components*s.byteLength;case Xr:case $r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case qr:case Yr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ra:case La:return Math.max(i,16)*Math.max(t,8)/4;case Aa:case Pa:return Math.max(i,8)*Math.max(t,8)/2;case Ia:case Ua:case Na:case Fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Da:case Qr:case Oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case za:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ha:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ga:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Xa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case $a:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case qa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ja:case Qa:case tc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ec:case nc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case to:case ic:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Fm(i){switch(i){case rn:case qu:return{byteLength:1,components:1};case Xs:case Yu:case ri:return{byteLength:2,components:1};case Oc:case kc:return{byteLength:2,components:4};case Gn:case Fc:case Fn:return{byteLength:4,components:1};case Ku:case Zu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dc}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function mf(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Om(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],v=d[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const v=d[f];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var km=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bm=`#ifdef USE_ALPHAHASH
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
#endif`,zm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wm=`#ifdef USE_AOMAP
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
#endif`,Xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$m=`#ifdef USE_BATCHING
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
#endif`,qm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Km=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jm=`#ifdef USE_IRIDESCENCE
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
#endif`,Jm=`#ifdef USE_BUMPMAP
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
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ig=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,og=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ag=`#define PI 3.141592653589793
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
} // validated`,cg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lg=`vec3 transformedNormal = objectNormal;
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
#endif`,hg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ug=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pg="gl_FragColor = linearToOutputTexel( gl_FragColor );",mg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gg=`#ifdef USE_ENVMAP
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
#endif`,vg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,xg=`#ifdef USE_ENVMAP
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
#endif`,_g=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mg=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Eg=`#ifdef USE_GRADIENTMAP
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
}`,Tg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ag=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Pg=`#ifdef USE_ENVMAP
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
#endif`,Lg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ug=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ng=`PhysicalMaterial material;
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
#endif`,Fg=`uniform sampler2D dfgLUT;
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
}`,Og=`
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
#endif`,kg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Vg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$g=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yg=`#if defined( USE_POINTS_UV )
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
#endif`,Kg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,t0=`#ifdef USE_MORPHTARGETS
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
#endif`,e0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,n0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,i0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,s0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,a0=`#ifdef USE_NORMALMAP
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
#endif`,c0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,l0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,h0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,u0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,f0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,d0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,p0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,m0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,g0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,v0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,x0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,M0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,y0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,b0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,S0=`float getShadowMask() {
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
}`,w0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,E0=`#ifdef USE_SKINNING
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
#endif`,T0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,C0=`#ifdef USE_SKINNING
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
#endif`,A0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,R0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,P0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,L0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,I0=`#ifdef USE_TRANSMISSION
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
#endif`,U0=`#ifdef USE_TRANSMISSION
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
#endif`,D0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,N0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const k0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,B0=`uniform sampler2D t2D;
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
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,V0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,H0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W0=`#include <common>
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
}`,X0=`#if DEPTH_PACKING == 3200
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
}`,$0=`#define DISTANCE
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
}`,q0=`#define DISTANCE
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
}`,Y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,K0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z0=`uniform float scale;
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
}`,j0=`uniform vec3 diffuse;
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
}`,J0=`#include <common>
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
}`,Q0=`uniform vec3 diffuse;
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
}`,tv=`#define LAMBERT
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
}`,ev=`#define LAMBERT
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
}`,nv=`#define MATCAP
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
}`,iv=`#define MATCAP
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
}`,sv=`#define NORMAL
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
}`,rv=`#define NORMAL
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
}`,ov=`#define PHONG
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
}`,av=`#define PHONG
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
}`,cv=`#define STANDARD
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
}`,lv=`#define STANDARD
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
}`,hv=`#define TOON
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
}`,uv=`#define TOON
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
}`,fv=`uniform float size;
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
}`,dv=`uniform vec3 diffuse;
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
}`,pv=`#include <common>
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
}`,mv=`uniform vec3 color;
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
}`,gv=`uniform float rotation;
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
}`,vv=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:km,alphahash_pars_fragment:Bm,alphamap_fragment:zm,alphamap_pars_fragment:Vm,alphatest_fragment:Hm,alphatest_pars_fragment:Gm,aomap_fragment:Wm,aomap_pars_fragment:Xm,batching_pars_vertex:$m,batching_vertex:qm,begin_vertex:Ym,beginnormal_vertex:Km,bsdfs:Zm,iridescence_fragment:jm,bumpmap_pars_fragment:Jm,clipping_planes_fragment:Qm,clipping_planes_pars_fragment:tg,clipping_planes_pars_vertex:eg,clipping_planes_vertex:ng,color_fragment:ig,color_pars_fragment:sg,color_pars_vertex:rg,color_vertex:og,common:ag,cube_uv_reflection_fragment:cg,defaultnormal_vertex:lg,displacementmap_pars_vertex:hg,displacementmap_vertex:ug,emissivemap_fragment:fg,emissivemap_pars_fragment:dg,colorspace_fragment:pg,colorspace_pars_fragment:mg,envmap_fragment:gg,envmap_common_pars_fragment:vg,envmap_pars_fragment:xg,envmap_pars_vertex:_g,envmap_physical_pars_fragment:Pg,envmap_vertex:Mg,fog_vertex:yg,fog_pars_vertex:bg,fog_fragment:Sg,fog_pars_fragment:wg,gradientmap_pars_fragment:Eg,lightmap_pars_fragment:Tg,lights_lambert_fragment:Cg,lights_lambert_pars_fragment:Ag,lights_pars_begin:Rg,lights_toon_fragment:Lg,lights_toon_pars_fragment:Ig,lights_phong_fragment:Ug,lights_phong_pars_fragment:Dg,lights_physical_fragment:Ng,lights_physical_pars_fragment:Fg,lights_fragment_begin:Og,lights_fragment_maps:kg,lights_fragment_end:Bg,lightprobes_pars_fragment:zg,logdepthbuf_fragment:Vg,logdepthbuf_pars_fragment:Hg,logdepthbuf_pars_vertex:Gg,logdepthbuf_vertex:Wg,map_fragment:Xg,map_pars_fragment:$g,map_particle_fragment:qg,map_particle_pars_fragment:Yg,metalnessmap_fragment:Kg,metalnessmap_pars_fragment:Zg,morphinstance_vertex:jg,morphcolor_vertex:Jg,morphnormal_vertex:Qg,morphtarget_pars_vertex:t0,morphtarget_vertex:e0,normal_fragment_begin:n0,normal_fragment_maps:i0,normal_pars_fragment:s0,normal_pars_vertex:r0,normal_vertex:o0,normalmap_pars_fragment:a0,clearcoat_normal_fragment_begin:c0,clearcoat_normal_fragment_maps:l0,clearcoat_pars_fragment:h0,iridescence_pars_fragment:u0,opaque_fragment:f0,packing:d0,premultiplied_alpha_fragment:p0,project_vertex:m0,dithering_fragment:g0,dithering_pars_fragment:v0,roughnessmap_fragment:x0,roughnessmap_pars_fragment:_0,shadowmap_pars_fragment:M0,shadowmap_pars_vertex:y0,shadowmap_vertex:b0,shadowmask_pars_fragment:S0,skinbase_vertex:w0,skinning_pars_vertex:E0,skinning_vertex:T0,skinnormal_vertex:C0,specularmap_fragment:A0,specularmap_pars_fragment:R0,tonemapping_fragment:P0,tonemapping_pars_fragment:L0,transmission_fragment:I0,transmission_pars_fragment:U0,uv_pars_fragment:D0,uv_pars_vertex:N0,uv_vertex:F0,worldpos_vertex:O0,background_vert:k0,background_frag:B0,backgroundCube_vert:z0,backgroundCube_frag:V0,cube_vert:H0,cube_frag:G0,depth_vert:W0,depth_frag:X0,distance_vert:$0,distance_frag:q0,equirect_vert:Y0,equirect_frag:K0,linedashed_vert:Z0,linedashed_frag:j0,meshbasic_vert:J0,meshbasic_frag:Q0,meshlambert_vert:tv,meshlambert_frag:ev,meshmatcap_vert:nv,meshmatcap_frag:iv,meshnormal_vert:sv,meshnormal_frag:rv,meshphong_vert:ov,meshphong_frag:av,meshphysical_vert:cv,meshphysical_frag:lv,meshtoon_vert:hv,meshtoon_frag:uv,points_vert:fv,points_frag:dv,shadow_vert:pv,shadow_frag:mv,sprite_vert:gv,sprite_frag:vv},pt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},In={basic:{uniforms:We([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:We([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:We([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:We([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:We([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:We([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:We([pt.points,pt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:We([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:We([pt.common,pt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:We([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:We([pt.sprite,pt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:We([pt.common,pt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:We([pt.lights,pt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};In.physical={uniforms:We([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const Ur={r:0,b:0,g:0},xv=new oe,gf=new Ot;gf.set(-1,0,0,0,1,0,0,0,1);function _v(i,t,e,n,s,r){const o=new Gt(0);let a=s===!0?0:1,c,l,h=null,d=0,u=null;function f(x){let y=x.isScene===!0?x.background:null;if(y&&y.isTexture){const _=x.backgroundBlurriness>0;y=t.get(y,_)}return y}function p(x){let y=!1;const _=f(x);_===null?g(o,a):_&&_.isColor&&(g(_,1),y=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,y){const _=f(y);_&&(_.isCubeTexture||_.mapping===po)?(l===void 0&&(l=new we(new Bi(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:_s(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(xv.makeRotationFromEuler(y.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(gf),l.material.toneMapped=Xt.getTransfer(_.colorSpace)!==te,(h!==_||d!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new we(new ir(2,2),new Xn({name:"BackgroundMaterial",uniforms:_s(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(_.colorSpace)!==te,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function g(x,y){x.getRGB(Ur,lf(i)),e.buffers.color.setClear(Ur.r,Ur.g,Ur.b,y,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),a=y,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,g(o,a)},render:p,addToRenderList:v,dispose:m}}function Mv(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(A,L,z,F,U){let B=!1;const D=d(A,F,z,L);r!==D&&(r=D,l(r.object)),B=f(A,F,z,U),B&&p(A,F,z,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,_(A,L,z,F),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return i.createVertexArray()}function l(A){return i.bindVertexArray(A)}function h(A){return i.deleteVertexArray(A)}function d(A,L,z,F){const U=F.wireframe===!0;let B=n[L.id];B===void 0&&(B={},n[L.id]=B);const D=A.isInstancedMesh===!0?A.id:0;let q=B[D];q===void 0&&(q={},B[D]=q);let j=q[z.id];j===void 0&&(j={},q[z.id]=j);let st=j[U];return st===void 0&&(st=u(c()),j[U]=st),st}function u(A){const L=[],z=[],F=[];for(let U=0;U<e;U++)L[U]=0,z[U]=0,F[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:z,attributeDivisors:F,object:A,attributes:{},index:null}}function f(A,L,z,F){const U=r.attributes,B=L.attributes;let D=0;const q=z.getAttributes();for(const j in q)if(q[j].location>=0){const tt=U[j];let ot=B[j];if(ot===void 0&&(j==="instanceMatrix"&&A.instanceMatrix&&(ot=A.instanceMatrix),j==="instanceColor"&&A.instanceColor&&(ot=A.instanceColor)),tt===void 0||tt.attribute!==ot||ot&&tt.data!==ot.data)return!0;D++}return r.attributesNum!==D||r.index!==F}function p(A,L,z,F){const U={},B=L.attributes;let D=0;const q=z.getAttributes();for(const j in q)if(q[j].location>=0){let tt=B[j];tt===void 0&&(j==="instanceMatrix"&&A.instanceMatrix&&(tt=A.instanceMatrix),j==="instanceColor"&&A.instanceColor&&(tt=A.instanceColor));const ot={};ot.attribute=tt,tt&&tt.data&&(ot.data=tt.data),U[j]=ot,D++}r.attributes=U,r.attributesNum=D,r.index=F}function v(){const A=r.newAttributes;for(let L=0,z=A.length;L<z;L++)A[L]=0}function g(A){m(A,0)}function m(A,L){const z=r.newAttributes,F=r.enabledAttributes,U=r.attributeDivisors;z[A]=1,F[A]===0&&(i.enableVertexAttribArray(A),F[A]=1),U[A]!==L&&(i.vertexAttribDivisor(A,L),U[A]=L)}function x(){const A=r.newAttributes,L=r.enabledAttributes;for(let z=0,F=L.length;z<F;z++)L[z]!==A[z]&&(i.disableVertexAttribArray(z),L[z]=0)}function y(A,L,z,F,U,B,D){D===!0?i.vertexAttribIPointer(A,L,z,U,B):i.vertexAttribPointer(A,L,z,F,U,B)}function _(A,L,z,F){v();const U=F.attributes,B=z.getAttributes(),D=L.defaultAttributeValues;for(const q in B){const j=B[q];if(j.location>=0){let st=U[q];if(st===void 0&&(q==="instanceMatrix"&&A.instanceMatrix&&(st=A.instanceMatrix),q==="instanceColor"&&A.instanceColor&&(st=A.instanceColor)),st!==void 0){const tt=st.normalized,ot=st.itemSize,Ct=t.get(st);if(Ct===void 0)continue;const Ft=Ct.buffer,At=Ct.type,K=Ct.bytesPerElement,rt=At===i.INT||At===i.UNSIGNED_INT||st.gpuType===Fc;if(st.isInterleavedBufferAttribute){const it=st.data,It=it.stride,Nt=st.offset;if(it.isInstancedInterleavedBuffer){for(let Rt=0;Rt<j.locationSize;Rt++)m(j.location+Rt,it.meshPerAttribute);A.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let Rt=0;Rt<j.locationSize;Rt++)g(j.location+Rt);i.bindBuffer(i.ARRAY_BUFFER,Ft);for(let Rt=0;Rt<j.locationSize;Rt++)y(j.location+Rt,ot/j.locationSize,At,tt,It*K,(Nt+ot/j.locationSize*Rt)*K,rt)}else{if(st.isInstancedBufferAttribute){for(let it=0;it<j.locationSize;it++)m(j.location+it,st.meshPerAttribute);A.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let it=0;it<j.locationSize;it++)g(j.location+it);i.bindBuffer(i.ARRAY_BUFFER,Ft);for(let it=0;it<j.locationSize;it++)y(j.location+it,ot/j.locationSize,At,tt,ot*K,ot/j.locationSize*it*K,rt)}}else if(D!==void 0){const tt=D[q];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(j.location,tt);break;case 3:i.vertexAttrib3fv(j.location,tt);break;case 4:i.vertexAttrib4fv(j.location,tt);break;default:i.vertexAttrib1fv(j.location,tt)}}}}x()}function S(){E();for(const A in n){const L=n[A];for(const z in L){const F=L[z];for(const U in F){const B=F[U];for(const D in B)h(B[D].object),delete B[D];delete F[U]}}delete n[A]}}function w(A){if(n[A.id]===void 0)return;const L=n[A.id];for(const z in L){const F=L[z];for(const U in F){const B=F[U];for(const D in B)h(B[D].object),delete B[D];delete F[U]}}delete n[A.id]}function T(A){for(const L in n){const z=n[L];for(const F in z){const U=z[F];if(U[A.id]===void 0)continue;const B=U[A.id];for(const D in B)h(B[D].object),delete B[D];delete U[A.id]}}}function M(A){for(const L in n){const z=n[L],F=A.isInstancedMesh===!0?A.id:0,U=z[F];if(U!==void 0){for(const B in U){const D=U[B];for(const q in D)h(D[q].object),delete D[q];delete U[B]}delete z[F],Object.keys(z).length===0&&delete n[L]}}}function E(){P(),o=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:P,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfObject:M,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function yv(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function a(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let f=0;f<h;f++)u+=l[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function bv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==yn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const M=T===ri&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==rn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Fn&&!M)}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Dt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:_,maxSamples:S,samples:w}}function Sv(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Qn,a=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||p===null||p.length===0||r&&!g)r?h(null):l();else{const x=r?0:n,y=x*4;let _=m.clippingState||null;c.value=_,_=h(p,u,y,f);for(let S=0;S!==y;++S)_[S]=e[S];m.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=c.value,p!==!0||g===null){const m=f+v*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,_=f;y!==v;++y,_+=4)o.copy(d[y]).applyMatrix4(x,a),o.normal.toArray(g,_),g[_+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}const _i=4,vh=[.125,.215,.35,.446,.526,.582],Ii=20,wv=256,Rs=new sr,xh=new Gt;let Jo=null,Qo=0,ta=0,ea=!1;const Ev=new I;class _h{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Ev}=r;Jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Jo,Qo,ta),this._renderer.xr.enabled=ea,t.scissorTest=!1,ss(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Fi||t.mapping===vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ve,minFilter:Ve,generateMipmaps:!1,type:ri,format:yn,colorSpace:eo,depthBuffer:!1},s=Mh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mh(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Tv(r)),this._blurMaterial=Av(r,t,e),this._ggxMaterial=Cv(r,t,e)}return s}_compileMaterial(t){const e=new we(new he,t);this._renderer.compile(e,Rs)}_sceneToCubeUV(t,e,n,s,r){const c=new nn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(xh),d.toneMapping=Bn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new we(new Bi,new bn({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let m=!1;const x=t.background;x?x.isColor&&(g.color.copy(x),t.background=null,m=!0):(g.color.copy(xh),m=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):_===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));const S=this._cubeSize;ss(s,_*S,y>2?S:0,S,S),d.setRenderTarget(s),m&&d.render(v,c),d.render(t,c)}d.toneMapping=f,d.autoClear=u,t.background=x}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Fi||t.mapping===vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;ss(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Rs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,f=d*u,{_lodMax:p}=this,v=this._sizeLods[n],g=3*v*(n>p-_i?n-p+_i:0),m=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=p-e,ss(r,g,m,3*v,2*v),s.setRenderTarget(r),s.render(a,Rs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-n,ss(t,g,m,3*v,2*v),s.setRenderTarget(t),s.render(a,Rs)}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&qt("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=l;const u=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ii-1),v=r/p,g=isFinite(r)?1+Math.floor(h*v):Ii;g>Ii&&Dt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ii}`);const m=[];let x=0;for(let T=0;T<Ii;++T){const M=T/v,E=Math.exp(-M*M/2);m.push(E),T===0?x+=E:T<g&&(x+=2*E)}for(let T=0;T<m.length;T++)m[T]=m[T]/x;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:y}=this;u.dTheta.value=p,u.mipInt.value=y-n;const _=this._sizeLods[s],S=3*_*(s>y-_i?s-y+_i:0),w=4*(this._cubeSize-_);ss(e,S,w,3*_,2*_),c.setRenderTarget(e),c.render(d,Rs)}}function Tv(i){const t=[],e=[],n=[];let s=i;const r=i-_i+1+vh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-_i?c=vh[o-i+_i-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,v=3,g=2,m=1,x=new Float32Array(v*p*f),y=new Float32Array(g*p*f),_=new Float32Array(m*p*f);for(let w=0;w<f;w++){const T=w%3*2/3-1,M=w>2?0:-1,E=[T,M,0,T+2/3,M,0,T+2/3,M+1,0,T,M,0,T+2/3,M+1,0,T,M+1,0];x.set(E,v*p*w),y.set(u,g*p*w);const P=[w,w,w,w,w,w];_.set(P,m*p*w)}const S=new he;S.setAttribute("position",new zn(x,v)),S.setAttribute("uv",new zn(y,g)),S.setAttribute("faceIndex",new zn(_,m)),n.push(new we(S,null)),s>_i&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Mh(i,t,e){const n=new wn(i,t,e);return n.texture.mapping=po,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ss(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Cv(i,t,e){return new Xn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:go(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Av(i,t,e){const n=new Float32Array(Ii),s=new I(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:go(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function yh(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:go(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function bh(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function go(){return`

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
	`}class vf extends wn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new of(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Bi(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:ii});r.uniforms.tEquirect.value=e;const o=new we(s,r),a=e.minFilter;return e.minFilter===Ui&&(e.minFilter=Ve),new Um(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}function Rv(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===So||f===wo)if(t.has(u)){const p=t.get(u).texture;return a(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const v=new vf(p.height);return v.fromEquirectangularTexture(i,u),t.set(u,v),u.addEventListener("dispose",l),a(v.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const f=u.mapping,p=f===So||f===wo,v=f===Fi||f===vs;if(p||v){let g=e.get(u);const m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new _h(i)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{const x=u.image;return p&&x&&x.height>0||v&&x&&c(x)?(n===null&&(n=new _h(i)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===So?u.mapping=Fi:f===wo&&(u.mapping=vs),u}function c(u){let f=0;const p=6;for(let v=0;v<p;v++)u[v]!==void 0&&f++;return f===p}function l(u){const f=u.target;f.removeEventListener("dispose",l);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Pv(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&fs("WebGLRenderer: "+n+" extension not supported."),s}}}function Lv(i,t,e,n){const s={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)t.update(u[f],i.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,p=d.attributes.position;let v=0;if(p===void 0)return;if(f!==null){const x=f.array;v=f.version;for(let y=0,_=x.length;y<_;y+=3){const S=x[y+0],w=x[y+1],T=x[y+2];u.push(S,w,w,T,T,S)}}else{const x=p.array;v=p.version;for(let y=0,_=x.length/3-1;y<_;y+=3){const S=y+0,w=y+1,T=y+2;u.push(S,w,w,T,T,S)}}const g=new(p.count>=65535?rf:sf)(u,1);g.version=v;const m=r.get(d);m&&t.remove(m),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function Iv(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,u){i.drawElements(n,u,r,d*o),e.update(u,n,1)}function l(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let v=0;for(let g=0;g<f;g++)v+=u[g];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Uv(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:qt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Dv(i,t,e){const n=new WeakMap,s=new ue;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let P=function(){M.dispose(),n.delete(a),a.removeEventListener("dispose",P)};var f=P;u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;p===!0&&(_=1),v===!0&&(_=2),g===!0&&(_=3);let S=a.attributes.position.count*_,w=1;S>t.maxTextureSize&&(w=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const T=new Float32Array(S*w*4*d),M=new ef(T,S,w,d);M.type=Fn,M.needsUpdate=!0;const E=_*4;for(let A=0;A<d;A++){const L=m[A],z=x[A],F=y[A],U=S*w*4*A;for(let B=0;B<L.count;B++){const D=B*E;p===!0&&(s.fromBufferAttribute(L,B),T[U+D+0]=s.x,T[U+D+1]=s.y,T[U+D+2]=s.z,T[U+D+3]=0),v===!0&&(s.fromBufferAttribute(z,B),T[U+D+4]=s.x,T[U+D+5]=s.y,T[U+D+6]=s.z,T[U+D+7]=0),g===!0&&(s.fromBufferAttribute(F,B),T[U+D+8]=s.x,T[U+D+9]=s.y,T[U+D+10]=s.z,T[U+D+11]=F.itemSize===4?s.w:1)}}u={count:d,texture:M,size:new Wt(S,w)},n.set(a,u),a.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let g=0;g<l.length;g++)p+=l[g];const v=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Nv(i,t,e,n,s){let r=new WeakMap;function o(l){const h=s.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}const Fv={[Bu]:"LINEAR_TONE_MAPPING",[zu]:"REINHARD_TONE_MAPPING",[Vu]:"CINEON_TONE_MAPPING",[Hu]:"ACES_FILMIC_TONE_MAPPING",[Wu]:"AGX_TONE_MAPPING",[Xu]:"NEUTRAL_TONE_MAPPING",[Gu]:"CUSTOM_TONE_MAPPING"};function Ov(i,t,e,n,s,r){const o=new wn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new xs(t,e):void 0}),a=new wn(t,e,{type:ri,depthBuffer:!1,stencilBuffer:!1}),c=new he;c.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Zt([0,2,0,0,2,0],2));const l=new Cm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new we(c,l),d=new sr(-1,1,1,-1,0,1);let u=null,f=null,p=!1,v,g=null,m=[],x=!1;this.setSize=function(y,_){o.setSize(y,_),a.setSize(y,_);for(let S=0;S<m.length;S++){const w=m[S];w.setSize&&w.setSize(y,_)}},this.setEffects=function(y){m=y,x=m.length>0&&m[0].isRenderPass===!0;const _=o.width,S=o.height;for(let w=0;w<m.length;w++){const T=m[w];T.setSize&&T.setSize(_,S)}},this.begin=function(y,_){if(p||y.toneMapping===Bn&&m.length===0)return!1;if(g=_,_!==null){const S=_.width,w=_.height;(o.width!==S||o.height!==w)&&this.setSize(S,w)}return x===!1&&y.setRenderTarget(o),v=y.toneMapping,y.toneMapping=Bn,!0},this.hasRenderPass=function(){return x},this.end=function(y,_){y.toneMapping=v,p=!0;let S=o,w=a;for(let T=0;T<m.length;T++){const M=m[T];if(M.enabled!==!1&&(M.render(y,w,S,_),M.needsSwap!==!1)){const E=S;S=w,w=E}}if(u!==y.outputColorSpace||f!==y.toneMapping){u=y.outputColorSpace,f=y.toneMapping,l.defines={},Xt.getTransfer(u)===te&&(l.defines.SRGB_TRANSFER="");const T=Fv[f];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(g),y.render(h,d),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),c.dispose(),l.dispose()}}const xf=new He,lc=new xs(1,1),_f=new ef,Mf=new rm,yf=new of,Sh=[],wh=[],Eh=new Float32Array(16),Th=new Float32Array(9),Ch=new Float32Array(4);function ys(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Sh[s];if(r===void 0&&(r=new Float32Array(s),Sh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function vo(i,t){let e=wh[t];e===void 0&&(e=new Int32Array(t),wh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function kv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Bv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function zv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function Vv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function Hv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Ch.set(n),i.uniformMatrix2fv(this.addr,!1,Ch),Re(e,n)}}function Gv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Th.set(n),i.uniformMatrix3fv(this.addr,!1,Th),Re(e,n)}}function Wv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Eh.set(n),i.uniformMatrix4fv(this.addr,!1,Eh),Re(e,n)}}function Xv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function $v(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function qv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function Yv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function Kv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Zv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function jv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function Jv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function Qv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(lc.compareFunction=e.isReversedDepthBuffer()?Gc:Hc,r=lc):r=xf,e.setTexture2D(t||r,s)}function tx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Mf,s)}function ex(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||yf,s)}function nx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||_f,s)}function ix(i){switch(i){case 5126:return kv;case 35664:return Bv;case 35665:return zv;case 35666:return Vv;case 35674:return Hv;case 35675:return Gv;case 35676:return Wv;case 5124:case 35670:return Xv;case 35667:case 35671:return $v;case 35668:case 35672:return qv;case 35669:case 35673:return Yv;case 5125:return Kv;case 36294:return Zv;case 36295:return jv;case 36296:return Jv;case 35678:case 36198:case 36298:case 36306:case 35682:return Qv;case 35679:case 36299:case 36307:return tx;case 35680:case 36300:case 36308:case 36293:return ex;case 36289:case 36303:case 36311:case 36292:return nx}}function sx(i,t){i.uniform1fv(this.addr,t)}function rx(i,t){const e=ys(t,this.size,2);i.uniform2fv(this.addr,e)}function ox(i,t){const e=ys(t,this.size,3);i.uniform3fv(this.addr,e)}function ax(i,t){const e=ys(t,this.size,4);i.uniform4fv(this.addr,e)}function cx(i,t){const e=ys(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function lx(i,t){const e=ys(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function hx(i,t){const e=ys(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ux(i,t){i.uniform1iv(this.addr,t)}function fx(i,t){i.uniform2iv(this.addr,t)}function dx(i,t){i.uniform3iv(this.addr,t)}function px(i,t){i.uniform4iv(this.addr,t)}function mx(i,t){i.uniform1uiv(this.addr,t)}function gx(i,t){i.uniform2uiv(this.addr,t)}function vx(i,t){i.uniform3uiv(this.addr,t)}function xx(i,t){i.uniform4uiv(this.addr,t)}function _x(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=lc:o=xf;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function Mx(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Mf,r[o])}function yx(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||yf,r[o])}function bx(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||_f,r[o])}function Sx(i){switch(i){case 5126:return sx;case 35664:return rx;case 35665:return ox;case 35666:return ax;case 35674:return cx;case 35675:return lx;case 35676:return hx;case 5124:case 35670:return ux;case 35667:case 35671:return fx;case 35668:case 35672:return dx;case 35669:case 35673:return px;case 5125:return mx;case 36294:return gx;case 36295:return vx;case 36296:return xx;case 35678:case 36198:case 36298:case 36306:case 35682:return _x;case 35679:case 36299:case 36307:return Mx;case 35680:case 36300:case 36308:case 36293:return yx;case 36289:case 36303:case 36311:case 36292:return bx}}class wx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ix(e.type)}}class Ex{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Sx(e.type)}}class Tx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const na=/(\w+)(\])?(\[|\.)?/g;function Ah(i,t){i.seq.push(t),i.map[t.id]=t}function Cx(i,t,e){const n=i.name,s=n.length;for(na.lastIndex=0;;){const r=na.exec(n),o=na.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Ah(e,l===void 0?new wx(a,i,t):new Ex(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Tx(a),Ah(e,d)),e=d}}}class Kr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);Cx(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Rh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Ax=37297;let Rx=0;function Px(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ph=new Ot;function Lx(i){Xt._getMatrix(Ph,Xt.workingColorSpace,i);const t=`mat3( ${Ph.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(i)){case no:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Lh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Px(i.getShaderSource(t),a)}else return r}function Ix(i,t){const e=Lx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Ux={[Bu]:"Linear",[zu]:"Reinhard",[Vu]:"Cineon",[Hu]:"ACESFilmic",[Wu]:"AgX",[Xu]:"Neutral",[Gu]:"Custom"};function Dx(i,t){const e=Ux[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Dr=new I;function Nx(){Xt.getLuminanceCoefficients(Dr);const i=Dr.x.toFixed(4),t=Dr.y.toFixed(4),e=Dr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ks).join(`
`)}function Ox(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function kx(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ks(i){return i!==""}function Ih(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Bx=/^[ \t]*#include +<([\w\d./]+)>/gm;function hc(i){return i.replace(Bx,Vx)}const zx=new Map;function Vx(i,t){let e=Vt[t];if(e===void 0){const n=zx.get(t);if(n!==void 0)e=Vt[n],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return hc(e)}const Hx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dh(i){return i.replace(Hx,Gx)}function Gx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const Wx={[Wr]:"SHADOWMAP_TYPE_PCF",[Os]:"SHADOWMAP_TYPE_VSM"};function Xx(i){return Wx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const $x={[Fi]:"ENVMAP_TYPE_CUBE",[vs]:"ENVMAP_TYPE_CUBE",[po]:"ENVMAP_TYPE_CUBE_UV"};function qx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":$x[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Yx={[vs]:"ENVMAP_MODE_REFRACTION"};function Kx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Yx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Zx={[Nc]:"ENVMAP_BLENDING_MULTIPLY",[kp]:"ENVMAP_BLENDING_MIX",[Bp]:"ENVMAP_BLENDING_ADD"};function jx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Zx[i.combine]||"ENVMAP_BLENDING_NONE"}function Jx(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Qx(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Xx(e),l=qx(e),h=Kx(e),d=jx(e),u=Jx(e),f=Fx(e),p=Ox(r),v=s.createProgram();let g,m,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ks).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ks).join(`
`),m.length>0&&(m+=`
`)):(g=[Nh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ks).join(`
`),m=[Nh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bn?"#define TONE_MAPPING":"",e.toneMapping!==Bn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Bn?Dx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,Ix("linearToOutputTexel",e.outputColorSpace),Nx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ks).join(`
`)),o=hc(o),o=Ih(o,e),o=Uh(o,e),a=hc(a),a=Ih(a,e),a=Uh(a,e),o=Dh(o),a=Dh(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Bl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Bl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=x+g+o,_=x+m+a,S=Rh(s,s.VERTEX_SHADER,y),w=Rh(s,s.FRAGMENT_SHADER,_);s.attachShader(v,S),s.attachShader(v,w),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function T(A){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(v)||"",z=s.getShaderInfoLog(S)||"",F=s.getShaderInfoLog(w)||"",U=L.trim(),B=z.trim(),D=F.trim();let q=!0,j=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,S,w);else{const st=Lh(s,S,"vertex"),tt=Lh(s,w,"fragment");qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+U+`
`+st+`
`+tt)}else U!==""?Dt("WebGLProgram: Program Info Log:",U):(B===""||D==="")&&(j=!1);j&&(A.diagnostics={runnable:q,programLog:U,vertexShader:{log:B,prefix:g},fragmentShader:{log:D,prefix:m}})}s.deleteShader(S),s.deleteShader(w),M=new Kr(s,v),E=kx(s,v)}let M;this.getUniforms=function(){return M===void 0&&T(this),M};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,Ax)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Rx++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=w,this}let t_=0;class e_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new n_(t),e.set(t,n)),n}}class n_{constructor(t){this.id=t_++,this.code=t,this.usedTimes=0}}function i_(i){return i===ki||i===Qr||i===to}function s_(i,t,e,n,s,r){const o=new Xc,a=new e_,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(M){return c.add(M),M===0?"uv":`uv${M}`}function v(M,E,P,A,L,z){const F=A.fog,U=L.geometry,B=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?A.environment:null,D=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,q=t.get(M.envMap||B,D),j=q&&q.mapping===po?q.image.height:null,st=f[M.type];M.precision!==null&&(u=n.getMaxPrecision(M.precision),u!==M.precision&&Dt("WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const tt=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ot=tt!==void 0?tt.length:0;let Ct=0;U.morphAttributes.position!==void 0&&(Ct=1),U.morphAttributes.normal!==void 0&&(Ct=2),U.morphAttributes.color!==void 0&&(Ct=3);let Ft,At,K,rt;if(st){const Mt=In[st];Ft=Mt.vertexShader,At=Mt.fragmentShader}else{Ft=M.vertexShader,At=M.fragmentShader;const Mt=a.getVertexShaderStage(M),de=a.getFragmentShaderStage(M);a.update(M,Mt,de),K=Mt.id,rt=de.id}const it=i.getRenderTarget(),It=i.state.buffers.depth.getReversed(),Nt=L.isInstancedMesh===!0,Rt=L.isBatchedMesh===!0,ie=!!M.map,kt=!!M.matcap,jt=!!q,Jt=!!M.aoMap,Yt=!!M.lightMap,Me=!!M.bumpMap&&M.wireframe===!1,Ee=!!M.normalMap,Pe=!!M.displacementMap,De=!!M.emissiveMap,fe=!!M.metalnessMap,ye=!!M.roughnessMap,O=M.anisotropy>0,$e=M.clearcoat>0,Qt=M.dispersion>0,R=M.iridescence>0,b=M.sheen>0,V=M.transmission>0,X=O&&!!M.anisotropyMap,Y=$e&&!!M.clearcoatMap,at=$e&&!!M.clearcoatNormalMap,lt=$e&&!!M.clearcoatRoughnessMap,Z=R&&!!M.iridescenceMap,Q=R&&!!M.iridescenceThicknessMap,ht=b&&!!M.sheenColorMap,Et=b&&!!M.sheenRoughnessMap,dt=!!M.specularMap,ut=!!M.specularColorMap,Lt=!!M.specularIntensityMap,Ut=V&&!!M.transmissionMap,Bt=V&&!!M.thicknessMap,N=!!M.gradientMap,ct=!!M.alphaMap,J=M.alphaTest>0,ft=!!M.alphaHash,vt=!!M.extensions;let et=Bn;M.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(et=i.toneMapping);const wt={shaderID:st,shaderType:M.type,shaderName:M.name,vertexShader:Ft,fragmentShader:At,defines:M.defines,customVertexShaderID:K,customFragmentShaderID:rt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:Rt,batchingColor:Rt&&L._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&L.instanceColor!==null,instancingMorph:Nt&&L.morphTexture!==null,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Xt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:ie,matcap:kt,envMap:jt,envMapMode:jt&&q.mapping,envMapCubeUVHeight:j,aoMap:Jt,lightMap:Yt,bumpMap:Me,normalMap:Ee,displacementMap:Pe,emissiveMap:De,normalMapObjectSpace:Ee&&M.normalMapType===Hp,normalMapTangentSpace:Ee&&M.normalMapType===sc,packedNormalMap:Ee&&M.normalMapType===sc&&i_(M.normalMap.format),metalnessMap:fe,roughnessMap:ye,anisotropy:O,anisotropyMap:X,clearcoat:$e,clearcoatMap:Y,clearcoatNormalMap:at,clearcoatRoughnessMap:lt,dispersion:Qt,iridescence:R,iridescenceMap:Z,iridescenceThicknessMap:Q,sheen:b,sheenColorMap:ht,sheenRoughnessMap:Et,specularMap:dt,specularColorMap:ut,specularIntensityMap:Lt,transmission:V,transmissionMap:Ut,thicknessMap:Bt,gradientMap:N,opaque:M.transparent===!1&&M.blending===us&&M.alphaToCoverage===!1,alphaMap:ct,alphaTest:J,alphaHash:ft,combine:M.combine,mapUv:ie&&p(M.map.channel),aoMapUv:Jt&&p(M.aoMap.channel),lightMapUv:Yt&&p(M.lightMap.channel),bumpMapUv:Me&&p(M.bumpMap.channel),normalMapUv:Ee&&p(M.normalMap.channel),displacementMapUv:Pe&&p(M.displacementMap.channel),emissiveMapUv:De&&p(M.emissiveMap.channel),metalnessMapUv:fe&&p(M.metalnessMap.channel),roughnessMapUv:ye&&p(M.roughnessMap.channel),anisotropyMapUv:X&&p(M.anisotropyMap.channel),clearcoatMapUv:Y&&p(M.clearcoatMap.channel),clearcoatNormalMapUv:at&&p(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&p(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&p(M.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&p(M.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&p(M.sheenColorMap.channel),sheenRoughnessMapUv:Et&&p(M.sheenRoughnessMap.channel),specularMapUv:dt&&p(M.specularMap.channel),specularColorMapUv:ut&&p(M.specularColorMap.channel),specularIntensityMapUv:Lt&&p(M.specularIntensityMap.channel),transmissionMapUv:Ut&&p(M.transmissionMap.channel),thicknessMapUv:Bt&&p(M.thicknessMap.channel),alphaMapUv:ct&&p(M.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Ee||O),vertexNormals:!!U.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!U.attributes.uv&&(ie||ct),fog:!!F,useFog:M.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||U.attributes.normal===void 0&&Ee===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:It,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:Ct,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:et,decodeVideoTexture:ie&&M.map.isVideoTexture===!0&&Xt.getTransfer(M.map.colorSpace)===te,decodeVideoTextureEmissive:De&&M.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(M.emissiveMap.colorSpace)===te,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Xe,flipSided:M.side===Je,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:vt&&M.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&M.extensions.multiDraw===!0||Rt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return wt.vertexUv1s=c.has(1),wt.vertexUv2s=c.has(2),wt.vertexUv3s=c.has(3),c.clear(),wt}function g(M){const E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)E.push(P),E.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(m(E,M),x(E,M),E.push(i.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function m(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function x(M,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),M.push(o.mask)}function y(M){const E=f[M.type];let P;if(E){const A=In[E];P=wm.clone(A.uniforms)}else P=M.uniforms;return P}function _(M,E){let P=h.get(E);return P!==void 0?++P.usedTimes:(P=new Qx(i,E,M,s),l.push(P),h.set(E,P)),P}function S(M){if(--M.usedTimes===0){const E=l.indexOf(M);l[E]=l[l.length-1],l.pop(),h.delete(M.cacheKey),M.destroy()}}function w(M){a.remove(M)}function T(){a.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:y,acquireProgram:_,releaseProgram:S,releaseShaderCache:w,programs:l,dispose:T}}function r_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function o_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Fh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Oh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,p,v,g,m){let x=i[t];return x===void 0?(x={id:u.id,object:u,geometry:f,material:p,materialVariant:o(u),groupOrder:v,renderOrder:u.renderOrder,z:g,group:m},i[t]=x):(x.id=u.id,x.object=u,x.geometry=f,x.material=p,x.materialVariant=o(u),x.groupOrder=v,x.renderOrder=u.renderOrder,x.z=g,x.group=m),t++,x}function c(u,f,p,v,g,m){const x=a(u,f,p,v,g,m);p.transmission>0?n.push(x):p.transparent===!0?s.push(x):e.push(x)}function l(u,f,p,v,g,m){const x=a(u,f,p,v,g,m);p.transmission>0?n.unshift(x):p.transparent===!0?s.unshift(x):e.unshift(x)}function h(u,f,p){e.length>1&&e.sort(u||o_),n.length>1&&n.sort(f||Fh),s.length>1&&s.sort(f||Fh),p&&(e.reverse(),n.reverse(),s.reverse())}function d(){for(let u=t,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function a_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Oh,i.set(n,[o])):s>=r.length?(o=new Oh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function c_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Gt};break;case"SpotLight":e={position:new I,direction:new I,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function l_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let h_=0;function u_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function f_(i){const t=new c_,e=l_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new oe,o=new oe;function a(l){let h=0,d=0,u=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,x=0,y=0,_=0,S=0,w=0,T=0;l.sort(u_);for(let E=0,P=l.length;E<P;E++){const A=l[E],L=A.color,z=A.intensity,F=A.distance;let U=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===ki?U=A.shadow.map.texture:U=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)h+=L.r*z,d+=L.g*z,u+=L.b*z;else if(A.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(A.sh.coefficients[B],z);T++}else if(A.isDirectionalLight){const B=t.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const D=A.shadow,q=e.get(A);q.shadowIntensity=D.intensity,q.shadowBias=D.bias,q.shadowNormalBias=D.normalBias,q.shadowRadius=D.radius,q.shadowMapSize=D.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=A.shadow.matrix,x++}n.directional[f]=B,f++}else if(A.isSpotLight){const B=t.get(A);B.position.setFromMatrixPosition(A.matrixWorld),B.color.copy(L).multiplyScalar(z),B.distance=F,B.coneCos=Math.cos(A.angle),B.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),B.decay=A.decay,n.spot[v]=B;const D=A.shadow;if(A.map&&(n.spotLightMap[S]=A.map,S++,D.updateMatrices(A),A.castShadow&&w++),n.spotLightMatrix[v]=D.matrix,A.castShadow){const q=e.get(A);q.shadowIntensity=D.intensity,q.shadowBias=D.bias,q.shadowNormalBias=D.normalBias,q.shadowRadius=D.radius,q.shadowMapSize=D.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=U,_++}v++}else if(A.isRectAreaLight){const B=t.get(A);B.color.copy(L).multiplyScalar(z),B.halfWidth.set(A.width*.5,0,0),B.halfHeight.set(0,A.height*.5,0),n.rectArea[g]=B,g++}else if(A.isPointLight){const B=t.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),B.distance=A.distance,B.decay=A.decay,A.castShadow){const D=A.shadow,q=e.get(A);q.shadowIntensity=D.intensity,q.shadowBias=D.bias,q.shadowNormalBias=D.normalBias,q.shadowRadius=D.radius,q.shadowMapSize=D.mapSize,q.shadowCameraNear=D.camera.near,q.shadowCameraFar=D.camera.far,n.pointShadow[p]=q,n.pointShadowMap[p]=U,n.pointShadowMatrix[p]=A.shadow.matrix,y++}n.point[p]=B,p++}else if(A.isHemisphereLight){const B=t.get(A);B.skyColor.copy(A.color).multiplyScalar(z),B.groundColor.copy(A.groundColor).multiplyScalar(z),n.hemi[m]=B,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const M=n.hash;(M.directionalLength!==f||M.pointLength!==p||M.spotLength!==v||M.rectAreaLength!==g||M.hemiLength!==m||M.numDirectionalShadows!==x||M.numPointShadows!==y||M.numSpotShadows!==_||M.numSpotMaps!==S||M.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+S-w,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,M.directionalLength=f,M.pointLength=p,M.spotLength=v,M.rectAreaLength=g,M.hemiLength=m,M.numDirectionalShadows=x,M.numPointShadows=y,M.numSpotShadows=_,M.numSpotMaps=S,M.numLightProbes=T,n.version=h_++)}function c(l,h){let d=0,u=0,f=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const y=l[m];if(y.isDirectionalLight){const _=n.directional[d];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(y.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const _=n.rectArea[p];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),p++}else if(y.isPointLight){const _=n.point[u];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),u++}else if(y.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(g),v++}}}return{setup:a,setupView:c,state:n}}function kh(i){const t=new f_(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function d_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new kh(i),t.set(s,[a])):r>=o.length?(a=new kh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const p_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,m_=`uniform sampler2D shadow_pass;
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
}`,g_=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],v_=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Bh=new oe,Ps=new I,ia=new I;function x_(i,t,e){let n=new $c;const s=new Wt,r=new Wt,o=new ue,a=new Am,c=new Rm,l={},h=e.maxTextureSize,d={[Mi]:Je,[Je]:Mi,[Xe]:Xe},u=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:p_,fragmentShader:m_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new he;p.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new we(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wr;let m=this.type;this.render=function(w,T,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===_p&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Wr);const E=i.getRenderTarget(),P=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),L=i.state;L.setBlending(ii),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const z=m!==this.type;z&&T.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(U=>U.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,U=w.length;F<U;F++){const B=w[F],D=B.shadow;if(D===void 0){Dt("WebGLShadowMap:",B,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);const q=D.getFrameExtents();s.multiply(q),r.copy(D.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,D.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,D.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(D.camera._reversedDepth=j,D.map===null||z===!0){if(D.map!==null&&(D.map.depthTexture!==null&&(D.map.depthTexture.dispose(),D.map.depthTexture=null),D.map.dispose()),this.type===Os){if(B.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}D.map=new wn(s.x,s.y,{format:ki,type:ri,minFilter:Ve,magFilter:Ve,generateMipmaps:!1}),D.map.texture.name=B.name+".shadowMap",D.map.depthTexture=new xs(s.x,s.y,Fn),D.map.depthTexture.name=B.name+".shadowMapDepth",D.map.depthTexture.format=oi,D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Ie,D.map.depthTexture.magFilter=Ie}else B.isPointLight?(D.map=new vf(s.x),D.map.depthTexture=new bm(s.x,Gn)):(D.map=new wn(s.x,s.y),D.map.depthTexture=new xs(s.x,s.y,Gn)),D.map.depthTexture.name=B.name+".shadowMap",D.map.depthTexture.format=oi,this.type===Wr?(D.map.depthTexture.compareFunction=j?Gc:Hc,D.map.depthTexture.minFilter=Ve,D.map.depthTexture.magFilter=Ve):(D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Ie,D.map.depthTexture.magFilter=Ie);D.camera.updateProjectionMatrix()}const st=D.map.isWebGLCubeRenderTarget?6:1;for(let tt=0;tt<st;tt++){if(D.map.isWebGLCubeRenderTarget)i.setRenderTarget(D.map,tt),i.clear();else{tt===0&&(i.setRenderTarget(D.map),i.clear());const ot=D.getViewport(tt);o.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),L.viewport(o)}if(B.isPointLight){const ot=D.camera,Ct=D.matrix,Ft=B.distance||ot.far;Ft!==ot.far&&(ot.far=Ft,ot.updateProjectionMatrix()),Ps.setFromMatrixPosition(B.matrixWorld),ot.position.copy(Ps),ia.copy(ot.position),ia.add(g_[tt]),ot.up.copy(v_[tt]),ot.lookAt(ia),ot.updateMatrixWorld(),Ct.makeTranslation(-Ps.x,-Ps.y,-Ps.z),Bh.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),D._frustum.setFromProjectionMatrix(Bh,ot.coordinateSystem,ot.reversedDepth)}else D.updateMatrices(B);n=D.getFrustum(),_(T,M,D.camera,B,this.type)}D.isPointLightShadow!==!0&&this.type===Os&&x(D,M),D.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(E,P,A)};function x(w,T){const M=t.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new wn(s.x,s.y,{format:ki,type:ri})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,M,u,v,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,M,f,v,null)}function y(w,T,M,E){let P=null;const A=M.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(A!==void 0)P=A;else if(P=M.isPointLight===!0?c:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const L=P.uuid,z=T.uuid;let F=l[L];F===void 0&&(F={},l[L]=F);let U=F[z];U===void 0&&(U=P.clone(),F[z]=U,T.addEventListener("dispose",S)),P=U}if(P.visible=T.visible,P.wireframe=T.wireframe,E===Os?P.side=T.shadowSide!==null?T.shadowSide:T.side:P.side=T.shadowSide!==null?T.shadowSide:d[T.side],P.alphaMap=T.alphaMap,P.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,P.map=T.map,P.clipShadows=T.clipShadows,P.clippingPlanes=T.clippingPlanes,P.clipIntersection=T.clipIntersection,P.displacementMap=T.displacementMap,P.displacementScale=T.displacementScale,P.displacementBias=T.displacementBias,P.wireframeLinewidth=T.wireframeLinewidth,P.linewidth=T.linewidth,M.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const L=i.properties.get(P);L.light=M}return P}function _(w,T,M,E,P){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&P===Os)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,w.matrixWorld);const z=t.update(w),F=w.material;if(Array.isArray(F)){const U=z.groups;for(let B=0,D=U.length;B<D;B++){const q=U[B],j=F[q.materialIndex];if(j&&j.visible){const st=y(w,j,E,P);w.onBeforeShadow(i,w,T,M,z,st,q),i.renderBufferDirect(M,null,z,st,w,q),w.onAfterShadow(i,w,T,M,z,st,q)}}}else if(F.visible){const U=y(w,F,E,P);w.onBeforeShadow(i,w,T,M,z,U,null),i.renderBufferDirect(M,null,z,U,w,null),w.onAfterShadow(i,w,T,M,z,U,null)}}const L=w.children;for(let z=0,F=L.length;z<F;z++)_(L[z],T,M,E,P)}function S(w){w.target.removeEventListener("dispose",S);for(const M in l){const E=l[M],P=w.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function __(i,t){function e(){let N=!1;const ct=new ue;let J=null;const ft=new ue(0,0,0,0);return{setMask:function(vt){J!==vt&&!N&&(i.colorMask(vt,vt,vt,vt),J=vt)},setLocked:function(vt){N=vt},setClear:function(vt,et,wt,Mt,de){de===!0&&(vt*=Mt,et*=Mt,wt*=Mt),ct.set(vt,et,wt,Mt),ft.equals(ct)===!1&&(i.clearColor(vt,et,wt,Mt),ft.copy(ct))},reset:function(){N=!1,J=null,ft.set(-1,0,0,0)}}}function n(){let N=!1,ct=!1,J=null,ft=null,vt=null;return{setReversed:function(et){if(ct!==et){const wt=t.get("EXT_clip_control");et?wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.ZERO_TO_ONE_EXT):wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.NEGATIVE_ONE_TO_ONE_EXT),ct=et;const Mt=vt;vt=null,this.setClear(Mt)}},getReversed:function(){return ct},setTest:function(et){et?it(i.DEPTH_TEST):It(i.DEPTH_TEST)},setMask:function(et){J!==et&&!N&&(i.depthMask(et),J=et)},setFunc:function(et){if(ct&&(et=Jp[et]),ft!==et){switch(et){case Ma:i.depthFunc(i.NEVER);break;case ya:i.depthFunc(i.ALWAYS);break;case ba:i.depthFunc(i.LESS);break;case gs:i.depthFunc(i.LEQUAL);break;case Sa:i.depthFunc(i.EQUAL);break;case wa:i.depthFunc(i.GEQUAL);break;case Ea:i.depthFunc(i.GREATER);break;case Ta:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ft=et}},setLocked:function(et){N=et},setClear:function(et){vt!==et&&(vt=et,ct&&(et=1-et),i.clearDepth(et))},reset:function(){N=!1,J=null,ft=null,vt=null,ct=!1}}}function s(){let N=!1,ct=null,J=null,ft=null,vt=null,et=null,wt=null,Mt=null,de=null;return{setTest:function(ae){N||(ae?it(i.STENCIL_TEST):It(i.STENCIL_TEST))},setMask:function(ae){ct!==ae&&!N&&(i.stencilMask(ae),ct=ae)},setFunc:function(ae,En,Tn){(J!==ae||ft!==En||vt!==Tn)&&(i.stencilFunc(ae,En,Tn),J=ae,ft=En,vt=Tn)},setOp:function(ae,En,Tn){(et!==ae||wt!==En||Mt!==Tn)&&(i.stencilOp(ae,En,Tn),et=ae,wt=En,Mt=Tn)},setLocked:function(ae){N=ae},setClear:function(ae){de!==ae&&(i.clearStencil(ae),de=ae)},reset:function(){N=!1,ct=null,J=null,ft=null,vt=null,et=null,wt=null,Mt=null,de=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u={},f=new WeakMap,p=[],v=null,g=!1,m=null,x=null,y=null,_=null,S=null,w=null,T=null,M=new Gt(0,0,0),E=0,P=!1,A=null,L=null,z=null,F=null,U=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,q=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(j)[1]),D=q>=1):j.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),D=q>=2);let st=null,tt={};const ot=i.getParameter(i.SCISSOR_BOX),Ct=i.getParameter(i.VIEWPORT),Ft=new ue().fromArray(ot),At=new ue().fromArray(Ct);function K(N,ct,J,ft){const vt=new Uint8Array(4),et=i.createTexture();i.bindTexture(N,et),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let wt=0;wt<J;wt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,ft,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ct+wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return et}const rt={};rt[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),rt[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),rt[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(i.DEPTH_TEST),o.setFunc(gs),Me(!1),Ee(Ul),it(i.CULL_FACE),Jt(ii);function it(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function It(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Nt(N,ct){return u[N]!==ct?(i.bindFramebuffer(N,ct),u[N]=ct,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ct),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function Rt(N,ct){let J=p,ft=!1;if(N){J=f.get(ct),J===void 0&&(J=[],f.set(ct,J));const vt=N.textures;if(J.length!==vt.length||J[0]!==i.COLOR_ATTACHMENT0){for(let et=0,wt=vt.length;et<wt;et++)J[et]=i.COLOR_ATTACHMENT0+et;J.length=vt.length,ft=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ft=!0);ft&&i.drawBuffers(J)}function ie(N){return v!==N?(i.useProgram(N),v=N,!0):!1}const kt={[Li]:i.FUNC_ADD,[yp]:i.FUNC_SUBTRACT,[bp]:i.FUNC_REVERSE_SUBTRACT};kt[Sp]=i.MIN,kt[wp]=i.MAX;const jt={[Ep]:i.ZERO,[Tp]:i.ONE,[Cp]:i.SRC_COLOR,[xa]:i.SRC_ALPHA,[Up]:i.SRC_ALPHA_SATURATE,[Lp]:i.DST_COLOR,[Rp]:i.DST_ALPHA,[Ap]:i.ONE_MINUS_SRC_COLOR,[_a]:i.ONE_MINUS_SRC_ALPHA,[Ip]:i.ONE_MINUS_DST_COLOR,[Pp]:i.ONE_MINUS_DST_ALPHA,[Dp]:i.CONSTANT_COLOR,[Np]:i.ONE_MINUS_CONSTANT_COLOR,[Fp]:i.CONSTANT_ALPHA,[Op]:i.ONE_MINUS_CONSTANT_ALPHA};function Jt(N,ct,J,ft,vt,et,wt,Mt,de,ae){if(N===ii){g===!0&&(It(i.BLEND),g=!1);return}if(g===!1&&(it(i.BLEND),g=!0),N!==Mp){if(N!==m||ae!==P){if((x!==Li||S!==Li)&&(i.blendEquation(i.FUNC_ADD),x=Li,S=Li),ae)switch(N){case us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dl:i.blendFunc(i.ONE,i.ONE);break;case Nl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qt("WebGLState: Invalid blending: ",N);break}else switch(N){case us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Dl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Nl:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fl:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",N);break}y=null,_=null,w=null,T=null,M.set(0,0,0),E=0,m=N,P=ae}return}vt=vt||ct,et=et||J,wt=wt||ft,(ct!==x||vt!==S)&&(i.blendEquationSeparate(kt[ct],kt[vt]),x=ct,S=vt),(J!==y||ft!==_||et!==w||wt!==T)&&(i.blendFuncSeparate(jt[J],jt[ft],jt[et],jt[wt]),y=J,_=ft,w=et,T=wt),(Mt.equals(M)===!1||de!==E)&&(i.blendColor(Mt.r,Mt.g,Mt.b,de),M.copy(Mt),E=de),m=N,P=!1}function Yt(N,ct){N.side===Xe?It(i.CULL_FACE):it(i.CULL_FACE);let J=N.side===Je;ct&&(J=!J),Me(J),N.blending===us&&N.transparent===!1?Jt(ii):Jt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const ft=N.stencilWrite;a.setTest(ft),ft&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),De(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):It(i.SAMPLE_ALPHA_TO_COVERAGE)}function Me(N){A!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),A=N)}function Ee(N){N!==vp?(it(i.CULL_FACE),N!==L&&(N===Ul?i.cullFace(i.BACK):N===xp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):It(i.CULL_FACE),L=N}function Pe(N){N!==z&&(D&&i.lineWidth(N),z=N)}function De(N,ct,J){N?(it(i.POLYGON_OFFSET_FILL),(F!==ct||U!==J)&&(F=ct,U=J,o.getReversed()&&(ct=-ct),i.polygonOffset(ct,J))):It(i.POLYGON_OFFSET_FILL)}function fe(N){N?it(i.SCISSOR_TEST):It(i.SCISSOR_TEST)}function ye(N){N===void 0&&(N=i.TEXTURE0+B-1),st!==N&&(i.activeTexture(N),st=N)}function O(N,ct,J){J===void 0&&(st===null?J=i.TEXTURE0+B-1:J=st);let ft=tt[J];ft===void 0&&(ft={type:void 0,texture:void 0},tt[J]=ft),(ft.type!==N||ft.texture!==ct)&&(st!==J&&(i.activeTexture(J),st=J),i.bindTexture(N,ct||rt[N]),ft.type=N,ft.texture=ct)}function $e(){const N=tt[st];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Qt(){try{i.compressedTexImage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function b(){try{i.texSubImage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function V(){try{i.texSubImage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function at(){try{i.texStorage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function lt(){try{i.texStorage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function Z(){try{i.texImage2D(...arguments)}catch(N){qt("WebGLState:",N)}}function Q(){try{i.texImage3D(...arguments)}catch(N){qt("WebGLState:",N)}}function ht(N){return d[N]!==void 0?d[N]:i.getParameter(N)}function Et(N,ct){d[N]!==ct&&(i.pixelStorei(N,ct),d[N]=ct)}function dt(N){Ft.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Ft.copy(N))}function ut(N){At.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),At.copy(N))}function Lt(N,ct){let J=l.get(ct);J===void 0&&(J=new WeakMap,l.set(ct,J));let ft=J.get(N);ft===void 0&&(ft=i.getUniformBlockIndex(ct,N.name),J.set(N,ft))}function Ut(N,ct){const ft=l.get(ct).get(N);c.get(ct)!==ft&&(i.uniformBlockBinding(ct,ft,N.__bindingPointIndex),c.set(ct,ft))}function Bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},st=null,tt={},u={},f=new WeakMap,p=[],v=null,g=!1,m=null,x=null,y=null,_=null,S=null,w=null,T=null,M=new Gt(0,0,0),E=0,P=!1,A=null,L=null,z=null,F=null,U=null,Ft.set(0,0,i.canvas.width,i.canvas.height),At.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:It,bindFramebuffer:Nt,drawBuffers:Rt,useProgram:ie,setBlending:Jt,setMaterial:Yt,setFlipSided:Me,setCullFace:Ee,setLineWidth:Pe,setPolygonOffset:De,setScissorTest:fe,activeTexture:ye,bindTexture:O,unbindTexture:$e,compressedTexImage2D:Qt,compressedTexImage3D:R,texImage2D:Z,texImage3D:Q,pixelStorei:Et,getParameter:ht,updateUBOMapping:Lt,uniformBlockBinding:Ut,texStorage2D:at,texStorage3D:lt,texSubImage2D:b,texSubImage3D:V,compressedTexSubImage2D:X,compressedTexSubImage3D:Y,scissor:dt,viewport:ut,reset:Bt}}function M_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Wt,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,b){return p?new OffscreenCanvas(R,b):io("canvas")}function g(R,b,V){let X=1;const Y=Qt(R);if((Y.width>V||Y.height>V)&&(X=V/Math.max(Y.width,Y.height)),X<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const at=Math.floor(X*Y.width),lt=Math.floor(X*Y.height);u===void 0&&(u=v(at,lt));const Z=b?v(at,lt):u;return Z.width=at,Z.height=lt,Z.getContext("2d").drawImage(R,0,0,at,lt),Dt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+at+"x"+lt+")."),Z}else return"data"in R&&Dt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),R;return R}function m(R){return R.generateMipmaps}function x(R){i.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(R,b,V,X,Y,at=!1){if(R!==null){if(i[R]!==void 0)return i[R];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let lt;X&&(lt=t.get("EXT_texture_norm16"),lt||Dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=b;if(b===i.RED&&(V===i.FLOAT&&(Z=i.R32F),V===i.HALF_FLOAT&&(Z=i.R16F),V===i.UNSIGNED_BYTE&&(Z=i.R8),V===i.UNSIGNED_SHORT&&lt&&(Z=lt.R16_EXT),V===i.SHORT&&lt&&(Z=lt.R16_SNORM_EXT)),b===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.R8UI),V===i.UNSIGNED_SHORT&&(Z=i.R16UI),V===i.UNSIGNED_INT&&(Z=i.R32UI),V===i.BYTE&&(Z=i.R8I),V===i.SHORT&&(Z=i.R16I),V===i.INT&&(Z=i.R32I)),b===i.RG&&(V===i.FLOAT&&(Z=i.RG32F),V===i.HALF_FLOAT&&(Z=i.RG16F),V===i.UNSIGNED_BYTE&&(Z=i.RG8),V===i.UNSIGNED_SHORT&&lt&&(Z=lt.RG16_EXT),V===i.SHORT&&lt&&(Z=lt.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RG8UI),V===i.UNSIGNED_SHORT&&(Z=i.RG16UI),V===i.UNSIGNED_INT&&(Z=i.RG32UI),V===i.BYTE&&(Z=i.RG8I),V===i.SHORT&&(Z=i.RG16I),V===i.INT&&(Z=i.RG32I)),b===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),V===i.UNSIGNED_INT&&(Z=i.RGB32UI),V===i.BYTE&&(Z=i.RGB8I),V===i.SHORT&&(Z=i.RGB16I),V===i.INT&&(Z=i.RGB32I)),b===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),V===i.UNSIGNED_INT&&(Z=i.RGBA32UI),V===i.BYTE&&(Z=i.RGBA8I),V===i.SHORT&&(Z=i.RGBA16I),V===i.INT&&(Z=i.RGBA32I)),b===i.RGB&&(V===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGB16_EXT),V===i.SHORT&&lt&&(Z=lt.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),b===i.RGBA){const Q=at?no:Xt.getTransfer(Y);V===i.FLOAT&&(Z=i.RGBA32F),V===i.HALF_FLOAT&&(Z=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Z=Q===te?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGBA16_EXT),V===i.SHORT&&lt&&(Z=lt.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function S(R,b){let V;return R?b===null||b===Gn||b===$s?V=i.DEPTH24_STENCIL8:b===Fn?V=i.DEPTH32F_STENCIL8:b===Xs&&(V=i.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Gn||b===$s?V=i.DEPTH_COMPONENT24:b===Fn?V=i.DEPTH_COMPONENT32F:b===Xs&&(V=i.DEPTH_COMPONENT16),V}function w(R,b){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ie&&R.minFilter!==Ve?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function T(R){const b=R.target;b.removeEventListener("dispose",T),E(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&d.delete(b)}function M(R){const b=R.target;b.removeEventListener("dispose",M),A(b)}function E(R){const b=n.get(R);if(b.__webglInit===void 0)return;const V=R.source,X=f.get(V);if(X){const Y=X[b.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(R),Object.keys(X).length===0&&f.delete(V)}n.remove(R)}function P(R){const b=n.get(R);i.deleteTexture(b.__webglTexture);const V=R.source,X=f.get(V);delete X[b.__cacheKey],o.memory.textures--}function A(R){const b=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(b.__webglFramebuffer[X]))for(let Y=0;Y<b.__webglFramebuffer[X].length;Y++)i.deleteFramebuffer(b.__webglFramebuffer[X][Y]);else i.deleteFramebuffer(b.__webglFramebuffer[X]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[X])}else{if(Array.isArray(b.__webglFramebuffer))for(let X=0;X<b.__webglFramebuffer.length;X++)i.deleteFramebuffer(b.__webglFramebuffer[X]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let X=0;X<b.__webglColorRenderbuffer.length;X++)b.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[X]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const V=R.textures;for(let X=0,Y=V.length;X<Y;X++){const at=n.get(V[X]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(V[X])}n.remove(R)}let L=0;function z(){L=0}function F(){return L}function U(R){L=R}function B(){const R=L;return R>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),L+=1,R}function D(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function q(R,b){const V=n.get(R);if(R.isVideoTexture&&O(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&V.__version!==R.version){const X=R.image;if(X===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{It(V,R,b);return}}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+b)}function j(R,b){const V=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){It(V,R,b);return}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+b)}function st(R,b){const V=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){It(V,R,b);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+b)}function tt(R,b){const V=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&V.__version!==R.version){Nt(V,R,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+b)}const ot={[Oi]:i.REPEAT,[ni]:i.CLAMP_TO_EDGE,[Ca]:i.MIRRORED_REPEAT},Ct={[Ie]:i.NEAREST,[zp]:i.NEAREST_MIPMAP_NEAREST,[lr]:i.NEAREST_MIPMAP_LINEAR,[Ve]:i.LINEAR,[Eo]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},Ft={[Gp]:i.NEVER,[Yp]:i.ALWAYS,[Wp]:i.LESS,[Hc]:i.LEQUAL,[Xp]:i.EQUAL,[Gc]:i.GEQUAL,[$p]:i.GREATER,[qp]:i.NOTEQUAL};function At(R,b){if(b.type===Fn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Ve||b.magFilter===Eo||b.magFilter===lr||b.magFilter===Ui||b.minFilter===Ve||b.minFilter===Eo||b.minFilter===lr||b.minFilter===Ui)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ot[b.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ot[b.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ot[b.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ct[b.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ct[b.minFilter]),b.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Ft[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ie||b.minFilter!==lr&&b.minFilter!==Ui||b.type===Fn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function K(R,b){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",T));const X=b.source;let Y=f.get(X);Y===void 0&&(Y={},f.set(X,Y));const at=D(b);if(at!==R.__cacheKey){Y[at]===void 0&&(Y[at]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),Y[at].usedTimes++;const lt=Y[R.__cacheKey];lt!==void 0&&(Y[R.__cacheKey].usedTimes--,lt.usedTimes===0&&P(b)),R.__cacheKey=at,R.__webglTexture=Y[at].texture}return V}function rt(R,b,V){return Math.floor(Math.floor(R/V)/b)}function it(R,b,V,X){const at=R.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,V,X,b.data);else{at.sort((Et,dt)=>Et.start-dt.start);let lt=0;for(let Et=1;Et<at.length;Et++){const dt=at[lt],ut=at[Et],Lt=dt.start+dt.count,Ut=rt(ut.start,b.width,4),Bt=rt(dt.start,b.width,4);ut.start<=Lt+1&&Ut===Bt&&rt(ut.start+ut.count-1,b.width,4)===Ut?dt.count=Math.max(dt.count,ut.start+ut.count-dt.start):(++lt,at[lt]=ut)}at.length=lt+1;const Z=e.getParameter(i.UNPACK_ROW_LENGTH),Q=e.getParameter(i.UNPACK_SKIP_PIXELS),ht=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let Et=0,dt=at.length;Et<dt;Et++){const ut=at[Et],Lt=Math.floor(ut.start/4),Ut=Math.ceil(ut.count/4),Bt=Lt%b.width,N=Math.floor(Lt/b.width),ct=Ut,J=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(i.UNPACK_SKIP_ROWS,N),e.texSubImage2D(i.TEXTURE_2D,0,Bt,N,ct,J,V,X,b.data)}R.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(i.UNPACK_SKIP_ROWS,ht)}}function It(R,b,V){let X=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(X=i.TEXTURE_3D);const Y=K(R,b),at=b.source;e.bindTexture(X,R.__webglTexture,i.TEXTURE0+V);const lt=n.get(at);if(at.version!==lt.__version||Y===!0){if(e.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const J=Xt.getPrimaries(Xt.workingColorSpace),ft=b.colorSpace===xi?null:Xt.getPrimaries(b.colorSpace),vt=b.colorSpace===xi||J===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let Q=g(b.image,!1,s.maxTextureSize);Q=$e(b,Q);const ht=r.convert(b.format,b.colorSpace),Et=r.convert(b.type);let dt=_(b.internalFormat,ht,Et,b.normalized,b.colorSpace,b.isVideoTexture);At(X,b);let ut;const Lt=b.mipmaps,Ut=b.isVideoTexture!==!0,Bt=lt.__version===void 0||Y===!0,N=at.dataReady,ct=w(b,Q);if(b.isDepthTexture)dt=S(b.format===Di,b.type),Bt&&(Ut?e.texStorage2D(i.TEXTURE_2D,1,dt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,ht,Et,null));else if(b.isDataTexture)if(Lt.length>0){Ut&&Bt&&e.texStorage2D(i.TEXTURE_2D,ct,dt,Lt[0].width,Lt[0].height);for(let J=0,ft=Lt.length;J<ft;J++)ut=Lt[J],Ut?N&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,ht,Et,ut.data):e.texImage2D(i.TEXTURE_2D,J,dt,ut.width,ut.height,0,ht,Et,ut.data);b.generateMipmaps=!1}else Ut?(Bt&&e.texStorage2D(i.TEXTURE_2D,ct,dt,Q.width,Q.height),N&&it(b,Q,ht,Et)):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,ht,Et,Q.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ut&&Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,dt,Lt[0].width,Lt[0].height,Q.depth);for(let J=0,ft=Lt.length;J<ft;J++)if(ut=Lt[J],b.format!==yn)if(ht!==null)if(Ut){if(N)if(b.layerUpdates.size>0){const vt=gh(ut.width,ut.height,b.format,b.type);for(const et of b.layerUpdates){const wt=ut.data.subarray(et*vt/ut.data.BYTES_PER_ELEMENT,(et+1)*vt/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,et,ut.width,ut.height,1,ht,wt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,Q.depth,ht,ut.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,dt,ut.width,ut.height,Q.depth,0,ut.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,Q.depth,ht,Et,ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,dt,ut.width,ut.height,Q.depth,0,ht,Et,ut.data)}else{Ut&&Bt&&e.texStorage2D(i.TEXTURE_2D,ct,dt,Lt[0].width,Lt[0].height);for(let J=0,ft=Lt.length;J<ft;J++)ut=Lt[J],b.format!==yn?ht!==null?Ut?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,ht,ut.data):e.compressedTexImage2D(i.TEXTURE_2D,J,dt,ut.width,ut.height,0,ut.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?N&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,ht,Et,ut.data):e.texImage2D(i.TEXTURE_2D,J,dt,ut.width,ut.height,0,ht,Et,ut.data)}else if(b.isDataArrayTexture)if(Ut){if(Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,dt,Q.width,Q.height,Q.depth),N)if(b.layerUpdates.size>0){const J=gh(Q.width,Q.height,b.format,b.type);for(const ft of b.layerUpdates){const vt=Q.data.subarray(ft*J/Q.data.BYTES_PER_ELEMENT,(ft+1)*J/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ft,Q.width,Q.height,1,ht,Et,vt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ht,Et,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,dt,Q.width,Q.height,Q.depth,0,ht,Et,Q.data);else if(b.isData3DTexture)Ut?(Bt&&e.texStorage3D(i.TEXTURE_3D,ct,dt,Q.width,Q.height,Q.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ht,Et,Q.data)):e.texImage3D(i.TEXTURE_3D,0,dt,Q.width,Q.height,Q.depth,0,ht,Et,Q.data);else if(b.isFramebufferTexture){if(Bt)if(Ut)e.texStorage2D(i.TEXTURE_2D,ct,dt,Q.width,Q.height);else{let J=Q.width,ft=Q.height;for(let vt=0;vt<ct;vt++)e.texImage2D(i.TEXTURE_2D,vt,dt,J,ft,0,ht,Et,null),J>>=1,ft>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Q.parentNode!==J){J.appendChild(Q),d.add(b),J.onpaint=ft=>{const vt=ft.changedElements;for(const et of d)vt.includes(et.image)&&(et.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{const vt=i.RGBA,et=i.RGBA,wt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,vt,et,wt,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Lt.length>0){if(Ut&&Bt){const J=Qt(Lt[0]);e.texStorage2D(i.TEXTURE_2D,ct,dt,J.width,J.height)}for(let J=0,ft=Lt.length;J<ft;J++)ut=Lt[J],Ut?N&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ht,Et,ut):e.texImage2D(i.TEXTURE_2D,J,dt,ht,Et,ut);b.generateMipmaps=!1}else if(Ut){if(Bt){const J=Qt(Q);e.texStorage2D(i.TEXTURE_2D,ct,dt,J.width,J.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,Et,Q)}else e.texImage2D(i.TEXTURE_2D,0,dt,ht,Et,Q);m(b)&&x(X),lt.__version=at.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Nt(R,b,V){if(b.image.length!==6)return;const X=K(R,b),Y=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+V);const at=n.get(Y);if(Y.version!==at.__version||X===!0){e.activeTexture(i.TEXTURE0+V);const lt=Xt.getPrimaries(Xt.workingColorSpace),Z=b.colorSpace===xi?null:Xt.getPrimaries(b.colorSpace),Q=b.colorSpace===xi||lt===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const ht=b.isCompressedTexture||b.image[0].isCompressedTexture,Et=b.image[0]&&b.image[0].isDataTexture,dt=[];for(let et=0;et<6;et++)!ht&&!Et?dt[et]=g(b.image[et],!0,s.maxCubemapSize):dt[et]=Et?b.image[et].image:b.image[et],dt[et]=$e(b,dt[et]);const ut=dt[0],Lt=r.convert(b.format,b.colorSpace),Ut=r.convert(b.type),Bt=_(b.internalFormat,Lt,Ut,b.normalized,b.colorSpace),N=b.isVideoTexture!==!0,ct=at.__version===void 0||X===!0,J=Y.dataReady;let ft=w(b,ut);At(i.TEXTURE_CUBE_MAP,b);let vt;if(ht){N&&ct&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Bt,ut.width,ut.height);for(let et=0;et<6;et++){vt=dt[et].mipmaps;for(let wt=0;wt<vt.length;wt++){const Mt=vt[wt];b.format!==yn?Lt!==null?N?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,wt,0,0,Mt.width,Mt.height,Lt,Mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,wt,Bt,Mt.width,Mt.height,0,Mt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,wt,0,0,Mt.width,Mt.height,Lt,Ut,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,wt,Bt,Mt.width,Mt.height,0,Lt,Ut,Mt.data)}}}else{if(vt=b.mipmaps,N&&ct){vt.length>0&&ft++;const et=Qt(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Bt,et.width,et.height)}for(let et=0;et<6;et++)if(Et){N?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,dt[et].width,dt[et].height,Lt,Ut,dt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Bt,dt[et].width,dt[et].height,0,Lt,Ut,dt[et].data);for(let wt=0;wt<vt.length;wt++){const de=vt[wt].image[et].image;N?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,wt+1,0,0,de.width,de.height,Lt,Ut,de.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,wt+1,Bt,de.width,de.height,0,Lt,Ut,de.data)}}else{N?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Lt,Ut,dt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Bt,Lt,Ut,dt[et]);for(let wt=0;wt<vt.length;wt++){const Mt=vt[wt];N?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,wt+1,0,0,Lt,Ut,Mt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,wt+1,Bt,Lt,Ut,Mt.image[et])}}}m(b)&&x(i.TEXTURE_CUBE_MAP),at.__version=Y.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Rt(R,b,V,X,Y,at){const lt=r.convert(V.format,V.colorSpace),Z=r.convert(V.type),Q=_(V.internalFormat,lt,Z,V.normalized,V.colorSpace),ht=n.get(b),Et=n.get(V);if(Et.__renderTarget=b,!ht.__hasExternalTextures){const dt=Math.max(1,b.width>>at),ut=Math.max(1,b.height>>at);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,at,Q,dt,ut,b.depth,0,lt,Z,null):e.texImage2D(Y,at,Q,dt,ut,0,lt,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),ye(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,Y,Et.__webglTexture,0,fe(b)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,Y,Et.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ie(R,b,V){if(i.bindRenderbuffer(i.RENDERBUFFER,R),b.depthBuffer){const X=b.depthTexture,Y=X&&X.isDepthTexture?X.type:null,at=S(b.stencilBuffer,Y),lt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ye(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,fe(b),at,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,fe(b),at,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,at,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,R)}else{const X=b.textures;for(let Y=0;Y<X.length;Y++){const at=X[Y],lt=r.convert(at.format,at.colorSpace),Z=r.convert(at.type),Q=_(at.internalFormat,lt,Z,at.normalized,at.colorSpace);ye(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,fe(b),Q,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,fe(b),Q,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Q,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function kt(R,b,V){const X=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(b.depthTexture);if(Y.__renderTarget=b,(!Y.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,b.depthTexture.addEventListener("dispose",T)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),At(i.TEXTURE_CUBE_MAP,b.depthTexture);const ht=r.convert(b.depthTexture.format),Et=r.convert(b.depthTexture.type);let dt;b.depthTexture.format===oi?dt=i.DEPTH_COMPONENT24:b.depthTexture.format===Di&&(dt=i.DEPTH24_STENCIL8);for(let ut=0;ut<6;ut++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,dt,b.width,b.height,0,ht,Et,null)}}else q(b.depthTexture,0);const at=Y.__webglTexture,lt=fe(b),Z=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,Q=b.depthTexture.format===Di?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===oi)ye(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,at,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,at,0);else if(b.depthTexture.format===Di)ye(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,at,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function jt(R){const b=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const X=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),X){const Y=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,X.removeEventListener("dispose",Y)};X.addEventListener("dispose",Y),b.__depthDisposeCallback=Y}b.__boundDepthTexture=X}if(R.depthTexture&&!b.__autoAllocateDepthBuffer)if(V)for(let X=0;X<6;X++)kt(b.__webglFramebuffer[X],R,X);else{const X=R.texture.mipmaps;X&&X.length>0?kt(b.__webglFramebuffer[0],R,0):kt(b.__webglFramebuffer,R,0)}else if(V){b.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[X]),b.__webglDepthbuffer[X]===void 0)b.__webglDepthbuffer[X]=i.createRenderbuffer(),ie(b.__webglDepthbuffer[X],R,!1);else{const Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,at)}}else{const X=R.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ie(b.__webglDepthbuffer,R,!1);else{const Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,at)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Jt(R,b,V){const X=n.get(R);b!==void 0&&Rt(X.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&jt(R)}function Yt(R){const b=R.texture,V=n.get(R),X=n.get(b);R.addEventListener("dispose",M);const Y=R.textures,at=R.isWebGLCubeRenderTarget===!0,lt=Y.length>1;if(lt||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=b.version,o.memory.textures++),at){V.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[Z]=[];for(let Q=0;Q<b.mipmaps.length;Q++)V.__webglFramebuffer[Z][Q]=i.createFramebuffer()}else V.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let Z=0;Z<b.mipmaps.length;Z++)V.__webglFramebuffer[Z]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(lt)for(let Z=0,Q=Y.length;Z<Q;Z++){const ht=n.get(Y[Z]);ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&ye(R)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){const Q=Y[Z];V.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[Z]);const ht=r.convert(Q.format,Q.colorSpace),Et=r.convert(Q.type),dt=_(Q.internalFormat,ht,Et,Q.normalized,Q.colorSpace,R.isXRRenderTarget===!0),ut=fe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,dt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,V.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ie(V.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),At(i.TEXTURE_CUBE_MAP,b);for(let Z=0;Z<6;Z++)if(b.mipmaps&&b.mipmaps.length>0)for(let Q=0;Q<b.mipmaps.length;Q++)Rt(V.__webglFramebuffer[Z][Q],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Q);else Rt(V.__webglFramebuffer[Z],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);m(b)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let Z=0,Q=Y.length;Z<Q;Z++){const ht=Y[Z],Et=n.get(ht);let dt=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(dt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,Et.__webglTexture),At(dt,ht),Rt(V.__webglFramebuffer,R,ht,i.COLOR_ATTACHMENT0+Z,dt,0),m(ht)&&x(dt)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Z=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,X.__webglTexture),At(Z,b),b.mipmaps&&b.mipmaps.length>0)for(let Q=0;Q<b.mipmaps.length;Q++)Rt(V.__webglFramebuffer[Q],R,b,i.COLOR_ATTACHMENT0,Z,Q);else Rt(V.__webglFramebuffer,R,b,i.COLOR_ATTACHMENT0,Z,0);m(b)&&x(Z),e.unbindTexture()}R.depthBuffer&&jt(R)}function Me(R){const b=R.textures;for(let V=0,X=b.length;V<X;V++){const Y=b[V];if(m(Y)){const at=y(R),lt=n.get(Y).__webglTexture;e.bindTexture(at,lt),x(at),e.unbindTexture()}}}const Ee=[],Pe=[];function De(R){if(R.samples>0){if(ye(R)===!1){const b=R.textures,V=R.width,X=R.height;let Y=i.COLOR_BUFFER_BIT;const at=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(R),Z=b.length>1;if(Z)for(let ht=0;ht<b.length;ht++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const Q=R.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ht=0;ht<b.length;ht++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ht]);const Et=n.get(b[ht]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Et,0)}i.blitFramebuffer(0,0,V,X,0,0,V,X,Y,i.NEAREST),c===!0&&(Ee.length=0,Pe.length=0,Ee.push(i.COLOR_ATTACHMENT0+ht),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ee.push(at),Pe.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Pe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ee))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ht=0;ht<b.length;ht++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ht]);const Et=n.get(b[ht]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,Et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const b=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function fe(R){return Math.min(s.maxSamples,R.samples)}function ye(R){const b=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function O(R){const b=o.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function $e(R,b){const V=R.colorSpace,X=R.format,Y=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==eo&&V!==xi&&(Xt.getTransfer(V)===te?(X!==yn||Y!==rn)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",V)),b}function Qt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=z,this.getTextureUnits=F,this.setTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=j,this.setTexture3D=st,this.setTextureCube=tt,this.rebindTextures=Jt,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=ye,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function y_(i,t){function e(n,s=xi){let r;const o=Xt.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===Oc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===kc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ku)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===qu)return i.BYTE;if(n===Yu)return i.SHORT;if(n===Xs)return i.UNSIGNED_SHORT;if(n===Fc)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===Fn)return i.FLOAT;if(n===ri)return i.HALF_FLOAT;if(n===ju)return i.ALPHA;if(n===Ju)return i.RGB;if(n===yn)return i.RGBA;if(n===oi)return i.DEPTH_COMPONENT;if(n===Di)return i.DEPTH_STENCIL;if(n===Qu)return i.RED;if(n===Bc)return i.RED_INTEGER;if(n===ki)return i.RG;if(n===zc)return i.RG_INTEGER;if(n===Vc)return i.RGBA_INTEGER;if(n===Xr||n===$r||n===qr||n===Yr)if(o===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Xr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Xr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Aa||n===Ra||n===Pa||n===La)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Aa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Pa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===La)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ia||n===Ua||n===Da||n===Na||n===Fa||n===Qr||n===Oa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ia||n===Ua)return o===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Da)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Na)return r.COMPRESSED_R11_EAC;if(n===Fa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Qr)return r.COMPRESSED_RG11_EAC;if(n===Oa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ka||n===Ba||n===za||n===Va||n===Ha||n===Ga||n===Wa||n===Xa||n===$a||n===qa||n===Ya||n===Ka||n===Za||n===ja)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ka)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ba)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===za)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Va)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ha)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ga)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$a)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ya)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ka)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Za)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ja)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ja||n===Qa||n===tc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ja)return o===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ec||n===nc||n===to||n===ic)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ec)return r.COMPRESSED_RED_RGTC1_EXT;if(n===nc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===to)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ic)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$s?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const b_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S_=`
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

}`;class w_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new cf(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Xn({vertexShader:b_,fragmentShader:S_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new we(new ir(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class E_ extends Vi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,p=null;const v=typeof XRWebGLBinding<"u",g=new w_,m={},x=e.getContextAttributes();let y=null,_=null;const S=[],w=[],T=new Wt;let M=null;const E=new nn;E.viewport=new ue;const P=new nn;P.viewport=new ue;const A=[E,P],L=new Dm;let z=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let rt=S[K];return rt===void 0&&(rt=new Uo,S[K]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(K){let rt=S[K];return rt===void 0&&(rt=new Uo,S[K]=rt),rt.getGripSpace()},this.getHand=function(K){let rt=S[K];return rt===void 0&&(rt=new Uo,S[K]=rt),rt.getHandSpace()};function U(K){const rt=w.indexOf(K.inputSource);if(rt===-1)return;const it=S[rt];it!==void 0&&(it.update(K.inputSource,K.frame,l||o),it.dispatchEvent({type:K.type,data:K.inputSource}))}function B(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",D);for(let K=0;K<S.length;K++){const rt=w[K];rt!==null&&(w[K]=null,S[K].disconnect(rt))}z=null,F=null,g.reset();for(const K in m)delete m[K];t.setRenderTarget(y),f=null,u=null,d=null,s=null,_=null,At.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",B),s.addEventListener("inputsourceschange",D),x.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(T),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let it=null,It=null,Nt=null;x.depth&&(Nt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=x.stencil?Di:oi,It=x.stencil?$s:Gn);const Rt={colorFormat:e.RGBA8,depthFormat:Nt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Rt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new wn(u.textureWidth,u.textureHeight,{format:yn,type:rn,depthTexture:new xs(u.textureWidth,u.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const it={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new wn(f.framebufferWidth,f.framebufferHeight,{format:yn,type:rn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),At.setContext(s),At.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function D(K){for(let rt=0;rt<K.removed.length;rt++){const it=K.removed[rt],It=w.indexOf(it);It>=0&&(w[It]=null,S[It].disconnect(it))}for(let rt=0;rt<K.added.length;rt++){const it=K.added[rt];let It=w.indexOf(it);if(It===-1){for(let Rt=0;Rt<S.length;Rt++)if(Rt>=w.length){w.push(it),It=Rt;break}else if(w[Rt]===null){w[Rt]=it,It=Rt;break}if(It===-1)break}const Nt=S[It];Nt&&Nt.connect(it)}}const q=new I,j=new I;function st(K,rt,it){q.setFromMatrixPosition(rt.matrixWorld),j.setFromMatrixPosition(it.matrixWorld);const It=q.distanceTo(j),Nt=rt.projectionMatrix.elements,Rt=it.projectionMatrix.elements,ie=Nt[14]/(Nt[10]-1),kt=Nt[14]/(Nt[10]+1),jt=(Nt[9]+1)/Nt[5],Jt=(Nt[9]-1)/Nt[5],Yt=(Nt[8]-1)/Nt[0],Me=(Rt[8]+1)/Rt[0],Ee=ie*Yt,Pe=ie*Me,De=It/(-Yt+Me),fe=De*-Yt;if(rt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(fe),K.translateZ(De),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Nt[10]===-1)K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const ye=ie+De,O=kt+De,$e=Ee-fe,Qt=Pe+(It-fe),R=jt*kt/O*ye,b=Jt*kt/O*ye;K.projectionMatrix.makePerspective($e,Qt,R,b,ye,O),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function tt(K,rt){rt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(rt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let rt=K.near,it=K.far;g.texture!==null&&(g.depthNear>0&&(rt=g.depthNear),g.depthFar>0&&(it=g.depthFar)),L.near=P.near=E.near=rt,L.far=P.far=E.far=it,(z!==L.near||F!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),z=L.near,F=L.far),L.layers.mask=K.layers.mask|6,E.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;const It=K.parent,Nt=L.cameras;tt(L,It);for(let Rt=0;Rt<Nt.length;Rt++)tt(Nt[Rt],It);Nt.length===2?st(L,E,P):L.projectionMatrix.copy(E.projectionMatrix),ot(K,L,It)};function ot(K,rt,it){it===null?K.matrix.copy(rt.matrixWorld):(K.matrix.copy(it.matrixWorld),K.matrix.invert(),K.matrix.multiply(rt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=rc*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(L)},this.getCameraTexture=function(K){return m[K]};let Ct=null;function Ft(K,rt){if(h=rt.getViewerPose(l||o),p=rt,h!==null){const it=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let It=!1;it.length!==L.cameras.length&&(L.cameras.length=0,It=!0);for(let kt=0;kt<it.length;kt++){const jt=it[kt];let Jt=null;if(f!==null)Jt=f.getViewport(jt);else{const Me=d.getViewSubImage(u,jt);Jt=Me.viewport,kt===0&&(t.setRenderTargetTextures(_,Me.colorTexture,Me.depthStencilTexture),t.setRenderTarget(_))}let Yt=A[kt];Yt===void 0&&(Yt=new nn,Yt.layers.enable(kt),Yt.viewport=new ue,A[kt]=Yt),Yt.matrix.fromArray(jt.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(jt.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),kt===0&&(L.matrix.copy(Yt.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),It===!0&&L.cameras.push(Yt)}const Nt=s.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const kt=d.getDepthInformation(it[0]);kt&&kt.isValid&&kt.texture&&g.init(kt,s.renderState)}if(Nt&&Nt.includes("camera-access")&&v){t.state.unbindTexture(),d=n.getBinding();for(let kt=0;kt<it.length;kt++){const jt=it[kt].camera;if(jt){let Jt=m[jt];Jt||(Jt=new cf,m[jt]=Jt);const Yt=d.getCameraImage(jt);Jt.sourceTexture=Yt}}}}for(let it=0;it<S.length;it++){const It=w[it],Nt=S[it];It!==null&&Nt!==void 0&&Nt.update(It,rt,l||o)}Ct&&Ct(K,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),p=null}const At=new mf;At.setAnimationLoop(Ft),this.setAnimationLoop=function(K){Ct=K},this.dispose=function(){}}}const T_=new oe,bf=new Ot;bf.set(-1,0,0,0,1,0,0,0,1);function C_(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,lf(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,x,y,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,x,y):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Je&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Je&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=t.get(m),y=x.envMap,_=x.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(T_.makeRotationFromEuler(_)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(bf),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,x,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=y*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Je&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const x=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function A_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,S){const w=S.program;n.uniformBlockBinding(_,w)}function l(_,S){let w=s[_.id];w===void 0&&(g(_),w=h(_),s[_.id]=w,_.addEventListener("dispose",x));const T=S.program;n.updateUBOMapping(_,T);const M=t.render.frame;r[_.id]!==M&&(u(_),r[_.id]=M)}function h(_){const S=d();_.__bindingPointIndex=S;const w=i.createBuffer(),T=_.__size,M=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,T,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,w),w}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const S=s[_.id],w=_.uniforms,T=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let M=0,E=w.length;M<E;M++){const P=w[M];if(Array.isArray(P))for(let A=0,L=P.length;A<L;A++)f(P[A],M,A,T);else f(P,M,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,S,w,T){if(v(_,S,w,T)===!0){const M=_.__offset,E=_.value;if(Array.isArray(E)){let P=0;for(let A=0;A<E.length;A++){const L=E[A],z=m(L);p(L,_.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,_.__data)}}function p(_,S,w){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,w)}function v(_,S,w,T){const M=_.value,E=S+"_"+w;if(T[E]===void 0)return typeof M=="number"||typeof M=="boolean"?T[E]=M:ArrayBuffer.isView(M)?T[E]=M.slice():T[E]=M.clone(),!0;{const P=T[E];if(typeof M=="number"||typeof M=="boolean"){if(P!==M)return T[E]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(P.equals(M)===!1)return P.copy(M),!0}}return!1}function g(_){const S=_.uniforms;let w=0;const T=16;for(let E=0,P=S.length;E<P;E++){const A=Array.isArray(S[E])?S[E]:[S[E]];for(let L=0,z=A.length;L<z;L++){const F=A[L],U=Array.isArray(F.value)?F.value:[F.value];for(let B=0,D=U.length;B<D;B++){const q=U[B],j=m(q),st=w%T,tt=st%j.boundary,ot=st+tt;w+=tt,ot!==0&&T-ot<j.storage&&(w+=T-ot),F.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=w,w+=j.storage}}}const M=w%T;return M>0&&(w+=T-M),_.__size=w,_.__cache={},this}function m(_){const S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Dt("WebGLRenderer: Unsupported uniform value type.",_),S}function x(_){const S=_.target;S.removeEventListener("dispose",x);const w=o.indexOf(S.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function y(){for(const _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:y}}const R_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Rn=null;function P_(){return Rn===null&&(Rn=new xm(R_,16,16,ki,ri),Rn.name="DFG_LUT",Rn.minFilter=Ve,Rn.magFilter=Ve,Rn.wrapS=ni,Rn.wrapT=ni,Rn.generateMipmaps=!1,Rn.needsUpdate=!0),Rn}class Sf{constructor(t={}){const{canvas:e=Zp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=rn}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const v=f,g=new Set([Vc,zc,Bc]),m=new Set([rn,Gn,Xs,$s,Oc,kc]),x=new Uint32Array(4),y=new Int32Array(4),_=new I;let S=null,w=null;const T=[],M=[];let E=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let A=!1,L=null,z=null,F=null,U=null;this._outputColorSpace=un;let B=0,D=0,q=null,j=-1,st=null;const tt=new ue,ot=new ue;let Ct=null;const Ft=new Gt(0);let At=0,K=e.width,rt=e.height,it=1,It=null,Nt=null;const Rt=new ue(0,0,K,rt),ie=new ue(0,0,K,rt);let kt=!1;const jt=new $c;let Jt=!1,Yt=!1;const Me=new oe,Ee=new I,Pe=new ue,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function ye(){return q===null?it:1}let O=n;function $e(C,k){return e.getContext(C,k)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Dc}`),e.addEventListener("webglcontextlost",de,!1),e.addEventListener("webglcontextrestored",ae,!1),e.addEventListener("webglcontextcreationerror",En,!1),O===null){const k="webgl2";if(O=$e(k,C),O===null)throw $e(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(C){throw qt("WebGLRenderer: "+C.message),C}let Qt,R,b,V,X,Y,at,lt,Z,Q,ht,Et,dt,ut,Lt,Ut,Bt,N,ct,J,ft,vt,et;function wt(){Qt=new Pv(O),Qt.init(),ft=new y_(O,Qt),R=new bv(O,Qt,t,ft),b=new __(O,Qt),R.reversedDepthBuffer&&u&&b.buffers.depth.setReversed(!0),z=O.createFramebuffer(),F=O.createFramebuffer(),U=O.createFramebuffer(),V=new Uv(O),X=new r_,Y=new M_(O,Qt,b,X,R,ft,V),at=new Rv(P),lt=new Om(O),vt=new Mv(O,lt),Z=new Lv(O,lt,V,vt),Q=new Nv(O,Z,lt,vt,V),N=new Dv(O,R,Y),Lt=new Sv(X),ht=new s_(P,at,Qt,R,vt,Lt),Et=new C_(P,X),dt=new a_,ut=new d_(Qt),Bt=new _v(P,at,b,Q,p,c),Ut=new x_(P,Q,R),et=new A_(O,V,R,b),ct=new yv(O,Qt,V),J=new Iv(O,Qt,V),V.programs=ht.programs,P.capabilities=R,P.extensions=Qt,P.properties=X,P.renderLists=dt,P.shadowMap=Ut,P.state=b,P.info=V}wt(),v!==rn&&(E=new Ov(v,e.width,e.height,a,s,r));const Mt=new E_(P,O);this.xr=Mt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const C=Qt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Qt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return it},this.setPixelRatio=function(C){C!==void 0&&(it=C,this.setSize(K,rt,!1))},this.getSize=function(C){return C.set(K,rt)},this.setSize=function(C,k,$=!0){if(Mt.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}K=C,rt=k,e.width=Math.floor(C*it),e.height=Math.floor(k*it),$===!0&&(e.style.width=C+"px",e.style.height=k+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,C,k)},this.getDrawingBufferSize=function(C){return C.set(K*it,rt*it).floor()},this.setDrawingBufferSize=function(C,k,$){K=C,rt=k,it=$,e.width=Math.floor(C*$),e.height=Math.floor(k*$),this.setViewport(0,0,C,k)},this.setEffects=function(C){if(v===rn){qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let k=0;k<C.length;k++)if(C[k].isOutputPass===!0){Dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(tt)},this.getViewport=function(C){return C.copy(Rt)},this.setViewport=function(C,k,$,G){C.isVector4?Rt.set(C.x,C.y,C.z,C.w):Rt.set(C,k,$,G),b.viewport(tt.copy(Rt).multiplyScalar(it).round())},this.getScissor=function(C){return C.copy(ie)},this.setScissor=function(C,k,$,G){C.isVector4?ie.set(C.x,C.y,C.z,C.w):ie.set(C,k,$,G),b.scissor(ot.copy(ie).multiplyScalar(it).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(C){b.setScissorTest(kt=C)},this.setOpaqueSort=function(C){It=C},this.setTransparentSort=function(C){Nt=C},this.getClearColor=function(C){return C.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor(...arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha(...arguments)},this.clear=function(C=!0,k=!0,$=!0){let G=0;if(C){let W=!1;if(q!==null){const gt=q.texture.format;W=g.has(gt)}if(W){const gt=q.texture.type,_t=m.has(gt),mt=Bt.getClearColor(),yt=Bt.getClearAlpha(),Tt=mt.r,zt=mt.g,Ht=mt.b;_t?(x[0]=Tt,x[1]=zt,x[2]=Ht,x[3]=yt,O.clearBufferuiv(O.COLOR,0,x)):(y[0]=Tt,y[1]=zt,y[2]=Ht,y[3]=yt,O.clearBufferiv(O.COLOR,0,y))}else G|=O.COLOR_BUFFER_BIT}k&&(G|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),L=C},this.dispose=function(){e.removeEventListener("webglcontextlost",de,!1),e.removeEventListener("webglcontextrestored",ae,!1),e.removeEventListener("webglcontextcreationerror",En,!1),Bt.dispose(),dt.dispose(),ut.dispose(),X.dispose(),at.dispose(),Q.dispose(),vt.dispose(),et.dispose(),ht.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",Sl),Mt.removeEventListener("sessionend",wl),wi.stop()};function de(C){C.preventDefault(),Vl("WebGLRenderer: Context Lost."),A=!0}function ae(){Vl("WebGLRenderer: Context Restored."),A=!1;const C=V.autoReset,k=Ut.enabled,$=Ut.autoUpdate,G=Ut.needsUpdate,W=Ut.type;wt(),V.autoReset=C,Ut.enabled=k,Ut.autoUpdate=$,Ut.needsUpdate=G,Ut.type=W}function En(C){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Tn(C){const k=C.target;k.removeEventListener("dispose",Tn),cp(k)}function cp(C){lp(C),X.remove(C)}function lp(C){const k=X.get(C).programs;k!==void 0&&(k.forEach(function($){ht.releaseProgram($)}),C.isShaderMaterial&&ht.releaseShaderCache(C))}this.renderBufferDirect=function(C,k,$,G,W,gt){k===null&&(k=De);const _t=W.isMesh&&W.matrixWorld.determinantAffine()<0,mt=fp(C,k,$,G,W);b.setMaterial(G,_t);let yt=$.index,Tt=1;if(G.wireframe===!0){if(yt=Z.getWireframeAttribute($),yt===void 0)return;Tt=2}const zt=$.drawRange,Ht=$.attributes.position;let Pt=zt.start*Tt,ne=(zt.start+zt.count)*Tt;gt!==null&&(Pt=Math.max(Pt,gt.start*Tt),ne=Math.min(ne,(gt.start+gt.count)*Tt)),yt!==null?(Pt=Math.max(Pt,0),ne=Math.min(ne,yt.count)):Ht!=null&&(Pt=Math.max(Pt,0),ne=Math.min(ne,Ht.count));const ge=ne-Pt;if(ge<0||ge===1/0)return;vt.setup(W,G,mt,$,yt);let pe,se=ct;if(yt!==null&&(pe=lt.get(yt),se=J,se.setIndex(pe)),W.isMesh)G.wireframe===!0?(b.setLineWidth(G.wireframeLinewidth*ye()),se.setMode(O.LINES)):se.setMode(O.TRIANGLES);else if(W.isLine){let Oe=G.linewidth;Oe===void 0&&(Oe=1),b.setLineWidth(Oe*ye()),W.isLineSegments?se.setMode(O.LINES):W.isLineLoop?se.setMode(O.LINE_LOOP):se.setMode(O.LINE_STRIP)}else W.isPoints?se.setMode(O.POINTS):W.isSprite&&se.setMode(O.TRIANGLES);if(W.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))se.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Oe=W._multiDrawStarts,xt=W._multiDrawCounts,Qe=W._multiDrawCount,Kt=yt?lt.get(yt).bytesPerElement:1,ln=X.get(G).currentProgram.getUniforms();for(let Cn=0;Cn<Qe;Cn++)ln.setValue(O,"_gl_DrawID",Cn),se.render(Oe[Cn]/Kt,xt[Cn])}else if(W.isInstancedMesh)se.renderInstances(Pt,ge,W.count);else if($.isInstancedBufferGeometry){const Oe=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,xt=Math.min($.instanceCount,Oe);se.renderInstances(Pt,ge,xt)}else se.render(Pt,ge)};function bl(C,k,$){C.transparent===!0&&C.side===Xe&&C.forceSinglePass===!1?(C.side=Je,C.needsUpdate=!0,cr(C,k,$),C.side=Mi,C.needsUpdate=!0,cr(C,k,$),C.side=Xe):cr(C,k,$)}this.compile=function(C,k,$=null){$===null&&($=C),w=ut.get($),w.init(k),M.push(w),$.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),C!==$&&C.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),w.setupLights();const G=new Set;return C.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const gt=W.material;if(gt)if(Array.isArray(gt))for(let _t=0;_t<gt.length;_t++){const mt=gt[_t];bl(mt,$,W),G.add(mt)}else bl(gt,$,W),G.add(gt)}),w=M.pop(),G},this.compileAsync=function(C,k,$=null){const G=this.compile(C,k,$);return new Promise(W=>{function gt(){if(G.forEach(function(_t){X.get(_t).currentProgram.isReady()&&G.delete(_t)}),G.size===0){W(C);return}setTimeout(gt,10)}Qt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let yo=null;function hp(C){yo&&yo(C)}function Sl(){wi.stop()}function wl(){wi.start()}const wi=new mf;wi.setAnimationLoop(hp),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(C){yo=C,Mt.setAnimationLoop(C),C===null?wi.stop():wi.start()},Mt.addEventListener("sessionstart",Sl),Mt.addEventListener("sessionend",wl),this.render=function(C,k){if(k!==void 0&&k.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;L!==null&&L.renderStart(C,k);const $=Mt.enabled===!0&&Mt.isPresenting===!0,G=E!==null&&(q===null||$)&&E.begin(P,q);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(k),k=Mt.getCamera()),C.isScene===!0&&C.onBeforeRender(P,C,k,q),w=ut.get(C,M.length),w.init(k),w.state.textureUnits=Y.getTextureUnits(),M.push(w),Me.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),jt.setFromProjectionMatrix(Me,On,k.reversedDepth),Yt=this.localClippingEnabled,Jt=Lt.init(this.clippingPlanes,Yt),S=dt.get(C,T.length),S.init(),T.push(S),Mt.enabled===!0&&Mt.isPresenting===!0){const _t=P.xr.getDepthSensingMesh();_t!==null&&bo(_t,k,-1/0,P.sortObjects)}bo(C,k,0,P.sortObjects),S.finish(),P.sortObjects===!0&&S.sort(It,Nt,k.reversedDepth),fe=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,fe&&Bt.addToRenderList(S,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Jt===!0&&Lt.beginShadows();const W=w.state.shadowsArray;if(Ut.render(W,C,k),Jt===!0&&Lt.endShadows(),(G&&E.hasRenderPass())===!1){const _t=S.opaque,mt=S.transmissive;if(w.setupLights(),k.isArrayCamera){const yt=k.cameras;if(mt.length>0)for(let Tt=0,zt=yt.length;Tt<zt;Tt++){const Ht=yt[Tt];Tl(_t,mt,C,Ht)}fe&&Bt.render(C);for(let Tt=0,zt=yt.length;Tt<zt;Tt++){const Ht=yt[Tt];El(S,C,Ht,Ht.viewport)}}else mt.length>0&&Tl(_t,mt,C,k),fe&&Bt.render(C),El(S,C,k)}q!==null&&D===0&&(Y.updateMultisampleRenderTarget(q),Y.updateRenderTargetMipmap(q)),G&&E.end(P),C.isScene===!0&&C.onAfterRender(P,C,k),vt.resetDefaultState(),j=-1,st=null,M.pop(),M.length>0?(w=M[M.length-1],Y.setTextureUnits(w.state.textureUnits),Jt===!0&&Lt.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,T.pop(),T.length>0?S=T[T.length-1]:S=null,L!==null&&L.renderEnd()};function bo(C,k,$,G){if(C.visible===!1)return;if(C.layers.test(k.layers)){if(C.isGroup)$=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(k);else if(C.isLightProbeGrid)w.pushLightProbeGrid(C);else if(C.isLight)w.pushLight(C),C.castShadow&&w.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||jt.intersectsSprite(C)){G&&Pe.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Me);const _t=Q.update(C),mt=C.material;mt.visible&&S.push(C,_t,mt,$,Pe.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||jt.intersectsObject(C))){const _t=Q.update(C),mt=C.material;if(G&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Pe.copy(C.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Pe.copy(_t.boundingSphere.center)),Pe.applyMatrix4(C.matrixWorld).applyMatrix4(Me)),Array.isArray(mt)){const yt=_t.groups;for(let Tt=0,zt=yt.length;Tt<zt;Tt++){const Ht=yt[Tt],Pt=mt[Ht.materialIndex];Pt&&Pt.visible&&S.push(C,_t,Pt,$,Pe.z,Ht)}}else mt.visible&&S.push(C,_t,mt,$,Pe.z,null)}}const gt=C.children;for(let _t=0,mt=gt.length;_t<mt;_t++)bo(gt[_t],k,$,G)}function El(C,k,$,G){const{opaque:W,transmissive:gt,transparent:_t}=C;w.setupLightsView($),Jt===!0&&Lt.setGlobalState(P.clippingPlanes,$),G&&b.viewport(tt.copy(G)),W.length>0&&ar(W,k,$),gt.length>0&&ar(gt,k,$),_t.length>0&&ar(_t,k,$),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Tl(C,k,$,G){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[G.id]===void 0){const Pt=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[G.id]=new wn(1,1,{generateMipmaps:!0,type:Pt?ri:rn,minFilter:Ui,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace})}const gt=w.state.transmissionRenderTarget[G.id],_t=G.viewport||tt;gt.setSize(_t.z*P.transmissionResolutionScale,_t.w*P.transmissionResolutionScale);const mt=P.getRenderTarget(),yt=P.getActiveCubeFace(),Tt=P.getActiveMipmapLevel();P.setRenderTarget(gt),P.getClearColor(Ft),At=P.getClearAlpha(),At<1&&P.setClearColor(16777215,.5),P.clear(),fe&&Bt.render($);const zt=P.toneMapping;P.toneMapping=Bn;const Ht=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),w.setupLightsView(G),Jt===!0&&Lt.setGlobalState(P.clippingPlanes,G),ar(C,$,G),Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let ne=0,ge=k.length;ne<ge;ne++){const pe=k[ne],{object:se,geometry:Oe,material:xt,group:Qe}=pe;if(xt.side===Xe&&se.layers.test(G.layers)){const Kt=xt.side;xt.side=Je,xt.needsUpdate=!0,Cl(se,$,G,Oe,xt,Qe),xt.side=Kt,xt.needsUpdate=!0,Pt=!0}}Pt===!0&&(Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt))}P.setRenderTarget(mt,yt,Tt),P.setClearColor(Ft,At),Ht!==void 0&&(G.viewport=Ht),P.toneMapping=zt}function ar(C,k,$){const G=k.isScene===!0?k.overrideMaterial:null;for(let W=0,gt=C.length;W<gt;W++){const _t=C[W],{object:mt,geometry:yt,group:Tt}=_t;let zt=_t.material;zt.allowOverride===!0&&G!==null&&(zt=G),mt.layers.test($.layers)&&Cl(mt,k,$,yt,zt,Tt)}}function Cl(C,k,$,G,W,gt){C.onBeforeRender(P,k,$,G,W,gt),C.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),W.onBeforeRender(P,k,$,G,C,gt),W.transparent===!0&&W.side===Xe&&W.forceSinglePass===!1?(W.side=Je,W.needsUpdate=!0,P.renderBufferDirect($,k,G,W,C,gt),W.side=Mi,W.needsUpdate=!0,P.renderBufferDirect($,k,G,W,C,gt),W.side=Xe):P.renderBufferDirect($,k,G,W,C,gt),C.onAfterRender(P,k,$,G,W,gt)}function cr(C,k,$){k.isScene!==!0&&(k=De);const G=X.get(C),W=w.state.lights,gt=w.state.shadowsArray,_t=W.state.version,mt=ht.getParameters(C,W.state,gt,k,$,w.state.lightProbeGridArray),yt=ht.getProgramCacheKey(mt);let Tt=G.programs;G.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?k.environment:null,G.fog=k.fog;const zt=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;G.envMap=at.get(C.envMap||G.environment,zt),G.envMapRotation=G.environment!==null&&C.envMap===null?k.environmentRotation:C.envMapRotation,Tt===void 0&&(C.addEventListener("dispose",Tn),Tt=new Map,G.programs=Tt);let Ht=Tt.get(yt);if(Ht!==void 0){if(G.currentProgram===Ht&&G.lightsStateVersion===_t)return Rl(C,mt),Ht}else mt.uniforms=ht.getUniforms(C),L!==null&&C.isNodeMaterial&&L.build(C,$,mt),C.onBeforeCompile(mt,P),Ht=ht.acquireProgram(mt,yt),Tt.set(yt,Ht),G.uniforms=mt.uniforms;const Pt=G.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Pt.clippingPlanes=Lt.uniform),Rl(C,mt),G.needsLights=pp(C),G.lightsStateVersion=_t,G.needsLights&&(Pt.ambientLightColor.value=W.state.ambient,Pt.lightProbe.value=W.state.probe,Pt.directionalLights.value=W.state.directional,Pt.directionalLightShadows.value=W.state.directionalShadow,Pt.spotLights.value=W.state.spot,Pt.spotLightShadows.value=W.state.spotShadow,Pt.rectAreaLights.value=W.state.rectArea,Pt.ltc_1.value=W.state.rectAreaLTC1,Pt.ltc_2.value=W.state.rectAreaLTC2,Pt.pointLights.value=W.state.point,Pt.pointLightShadows.value=W.state.pointShadow,Pt.hemisphereLights.value=W.state.hemi,Pt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Pt.spotLightMatrix.value=W.state.spotLightMatrix,Pt.spotLightMap.value=W.state.spotLightMap,Pt.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=w.state.lightProbeGridArray.length>0,G.currentProgram=Ht,G.uniformsList=null,Ht}function Al(C){if(C.uniformsList===null){const k=C.currentProgram.getUniforms();C.uniformsList=Kr.seqWithValue(k.seq,C.uniforms)}return C.uniformsList}function Rl(C,k){const $=X.get(C);$.outputColorSpace=k.outputColorSpace,$.batching=k.batching,$.batchingColor=k.batchingColor,$.instancing=k.instancing,$.instancingColor=k.instancingColor,$.instancingMorph=k.instancingMorph,$.skinning=k.skinning,$.morphTargets=k.morphTargets,$.morphNormals=k.morphNormals,$.morphColors=k.morphColors,$.morphTargetsCount=k.morphTargetsCount,$.numClippingPlanes=k.numClippingPlanes,$.numIntersection=k.numClipIntersection,$.vertexAlphas=k.vertexAlphas,$.vertexTangents=k.vertexTangents,$.toneMapping=k.toneMapping}function up(C,k){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;_.setFromMatrixPosition(k.matrixWorld);for(let $=0,G=C.length;$<G;$++){const W=C[$];if(W.texture!==null&&W.boundingBox.containsPoint(_))return W}return null}function fp(C,k,$,G,W){k.isScene!==!0&&(k=De),Y.resetTextureUnits();const gt=k.fog,_t=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?k.environment:null,mt=q===null?P.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Xt.workingColorSpace,yt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Tt=at.get(G.envMap||_t,yt),zt=G.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ht=!!$.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Pt=!!$.morphAttributes.position,ne=!!$.morphAttributes.normal,ge=!!$.morphAttributes.color;let pe=Bn;G.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(pe=P.toneMapping);const se=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Oe=se!==void 0?se.length:0,xt=X.get(G),Qe=w.state.lights;if(Jt===!0&&(Yt===!0||C!==st)){const ce=C===st&&G.id===j;Lt.setState(G,C,ce)}let Kt=!1;G.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Qe.state.version||xt.outputColorSpace!==mt||W.isBatchedMesh&&xt.batching===!1||!W.isBatchedMesh&&xt.batching===!0||W.isBatchedMesh&&xt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&xt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&xt.instancing===!1||!W.isInstancedMesh&&xt.instancing===!0||W.isSkinnedMesh&&xt.skinning===!1||!W.isSkinnedMesh&&xt.skinning===!0||W.isInstancedMesh&&xt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&xt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&xt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&xt.instancingMorph===!1&&W.morphTexture!==null||xt.envMap!==Tt||G.fog===!0&&xt.fog!==gt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==Lt.numPlanes||xt.numIntersection!==Lt.numIntersection)||xt.vertexAlphas!==zt||xt.vertexTangents!==Ht||xt.morphTargets!==Pt||xt.morphNormals!==ne||xt.morphColors!==ge||xt.toneMapping!==pe||xt.morphTargetsCount!==Oe||!!xt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Kt=!0):(Kt=!0,xt.__version=G.version);let ln=xt.currentProgram;Kt===!0&&(ln=cr(G,k,W),L&&G.isNodeMaterial&&L.onUpdateProgram(G,ln,xt));let Cn=!1,ai=!1,Gi=!1;const re=ln.getUniforms(),ve=xt.uniforms;if(b.useProgram(ln.program)&&(Cn=!0,ai=!0,Gi=!0),G.id!==j&&(j=G.id,ai=!0),xt.needsLights){const ce=up(w.state.lightProbeGridArray,W);xt.lightProbeGrid!==ce&&(xt.lightProbeGrid=ce,ai=!0)}if(Cn||st!==C){b.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),re.setValue(O,"projectionMatrix",C.projectionMatrix),re.setValue(O,"viewMatrix",C.matrixWorldInverse);const li=re.map.cameraPosition;li!==void 0&&li.setValue(O,Ee.setFromMatrixPosition(C.matrixWorld)),R.logarithmicDepthBuffer&&re.setValue(O,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&re.setValue(O,"isOrthographic",C.isOrthographicCamera===!0),st!==C&&(st=C,ai=!0,Gi=!0)}if(xt.needsLights&&(Qe.state.directionalShadowMap.length>0&&re.setValue(O,"directionalShadowMap",Qe.state.directionalShadowMap,Y),Qe.state.spotShadowMap.length>0&&re.setValue(O,"spotShadowMap",Qe.state.spotShadowMap,Y),Qe.state.pointShadowMap.length>0&&re.setValue(O,"pointShadowMap",Qe.state.pointShadowMap,Y)),W.isSkinnedMesh){re.setOptional(O,W,"bindMatrix"),re.setOptional(O,W,"bindMatrixInverse");const ce=W.skeleton;ce&&(ce.boneTexture===null&&ce.computeBoneTexture(),re.setValue(O,"boneTexture",ce.boneTexture,Y))}W.isBatchedMesh&&(re.setOptional(O,W,"batchingTexture"),re.setValue(O,"batchingTexture",W._matricesTexture,Y),re.setOptional(O,W,"batchingIdTexture"),re.setValue(O,"batchingIdTexture",W._indirectTexture,Y),re.setOptional(O,W,"batchingColorTexture"),W._colorsTexture!==null&&re.setValue(O,"batchingColorTexture",W._colorsTexture,Y));const ci=$.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&N.update(W,$,ln),(ai||xt.receiveShadow!==W.receiveShadow)&&(xt.receiveShadow=W.receiveShadow,re.setValue(O,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&k.environment!==null&&(ve.envMapIntensity.value=k.environmentIntensity),ve.dfgLUT!==void 0&&(ve.dfgLUT.value=P_()),ai){if(re.setValue(O,"toneMappingExposure",P.toneMappingExposure),xt.needsLights&&dp(ve,Gi),gt&&G.fog===!0&&Et.refreshFogUniforms(ve,gt),Et.refreshMaterialUniforms(ve,G,it,rt,w.state.transmissionRenderTarget[C.id]),xt.needsLights&&xt.lightProbeGrid){const ce=xt.lightProbeGrid;ve.probesSH.value=ce.texture,ve.probesMin.value.copy(ce.boundingBox.min),ve.probesMax.value.copy(ce.boundingBox.max),ve.probesResolution.value.copy(ce.resolution)}Kr.upload(O,Al(xt),ve,Y)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Kr.upload(O,Al(xt),ve,Y),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&re.setValue(O,"center",W.center),re.setValue(O,"modelViewMatrix",W.modelViewMatrix),re.setValue(O,"normalMatrix",W.normalMatrix),re.setValue(O,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){const ce=G.uniformsGroups;for(let li=0,Wi=ce.length;li<Wi;li++){const Pl=ce[li];et.update(Pl,ln),et.bind(Pl,ln)}}return ln}function dp(C,k){C.ambientLightColor.needsUpdate=k,C.lightProbe.needsUpdate=k,C.directionalLights.needsUpdate=k,C.directionalLightShadows.needsUpdate=k,C.pointLights.needsUpdate=k,C.pointLightShadows.needsUpdate=k,C.spotLights.needsUpdate=k,C.spotLightShadows.needsUpdate=k,C.rectAreaLights.needsUpdate=k,C.hemisphereLights.needsUpdate=k}function pp(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(C,k,$){const G=X.get(C);G.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),X.get(C.texture).__webglTexture=k,X.get(C.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:$,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,k){const $=X.get(C);$.__webglFramebuffer=k,$.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(C,k=0,$=0){q=C,B=k,D=$;let G=null,W=!1,gt=!1;if(C){const mt=X.get(C);if(mt.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(O.FRAMEBUFFER,mt.__webglFramebuffer),tt.copy(C.viewport),ot.copy(C.scissor),Ct=C.scissorTest,b.viewport(tt),b.scissor(ot),b.setScissorTest(Ct),j=-1;return}else if(mt.__webglFramebuffer===void 0)Y.setupRenderTarget(C);else if(mt.__hasExternalTextures)Y.rebindTextures(C,X.get(C.texture).__webglTexture,X.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const zt=C.depthTexture;if(mt.__boundDepthTexture!==zt){if(zt!==null&&X.has(zt)&&(C.width!==zt.image.width||C.height!==zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(C)}}const yt=C.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(gt=!0);const Tt=X.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Tt[k])?G=Tt[k][$]:G=Tt[k],W=!0):C.samples>0&&Y.useMultisampledRTT(C)===!1?G=X.get(C).__webglMultisampledFramebuffer:Array.isArray(Tt)?G=Tt[$]:G=Tt,tt.copy(C.viewport),ot.copy(C.scissor),Ct=C.scissorTest}else tt.copy(Rt).multiplyScalar(it).floor(),ot.copy(ie).multiplyScalar(it).floor(),Ct=kt;if($!==0&&(G=z),b.bindFramebuffer(O.FRAMEBUFFER,G)&&b.drawBuffers(C,G),b.viewport(tt),b.scissor(ot),b.setScissorTest(Ct),W){const mt=X.get(C.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+k,mt.__webglTexture,$)}else if(gt){const mt=k;for(let yt=0;yt<C.textures.length;yt++){const Tt=X.get(C.textures[yt]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+yt,Tt.__webglTexture,$,mt)}}else if(C!==null&&$!==0){const mt=X.get(C.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,mt.__webglTexture,$)}j=-1},this.readRenderTargetPixels=function(C,k,$,G,W,gt,_t,mt=0){if(!(C&&C.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=X.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t]),yt){b.bindFramebuffer(O.FRAMEBUFFER,yt);try{const Tt=C.textures[mt],zt=Tt.format,Ht=Tt.type;if(C.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+mt),!R.textureFormatReadable(zt)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(Ht)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=C.width-G&&$>=0&&$<=C.height-W&&O.readPixels(k,$,G,W,ft.convert(zt),ft.convert(Ht),gt)}finally{const Tt=q!==null?X.get(q).__webglFramebuffer:null;b.bindFramebuffer(O.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(C,k,$,G,W,gt,_t,mt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=X.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t]),yt)if(k>=0&&k<=C.width-G&&$>=0&&$<=C.height-W){b.bindFramebuffer(O.FRAMEBUFFER,yt);const Tt=C.textures[mt],zt=Tt.format,Ht=Tt.type;if(C.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+mt),!R.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Pt),O.bufferData(O.PIXEL_PACK_BUFFER,gt.byteLength,O.STREAM_READ),O.readPixels(k,$,G,W,ft.convert(zt),ft.convert(Ht),0);const ne=q!==null?X.get(q).__webglFramebuffer:null;b.bindFramebuffer(O.FRAMEBUFFER,ne);const ge=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await jp(O,ge,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Pt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,gt),O.deleteBuffer(Pt),O.deleteSync(ge),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,k=null,$=0){const G=Math.pow(2,-$),W=Math.floor(C.image.width*G),gt=Math.floor(C.image.height*G),_t=k!==null?k.x:0,mt=k!==null?k.y:0;Y.setTexture2D(C,0),O.copyTexSubImage2D(O.TEXTURE_2D,$,0,0,_t,mt,W,gt),b.unbindTexture()},this.copyTextureToTexture=function(C,k,$=null,G=null,W=0,gt=0){let _t,mt,yt,Tt,zt,Ht,Pt,ne,ge;const pe=C.isCompressedTexture?C.mipmaps[gt]:C.image;if($!==null)_t=$.max.x-$.min.x,mt=$.max.y-$.min.y,yt=$.isBox3?$.max.z-$.min.z:1,Tt=$.min.x,zt=$.min.y,Ht=$.isBox3?$.min.z:0;else{const ve=Math.pow(2,-W);_t=Math.floor(pe.width*ve),mt=Math.floor(pe.height*ve),C.isDataArrayTexture?yt=pe.depth:C.isData3DTexture?yt=Math.floor(pe.depth*ve):yt=1,Tt=0,zt=0,Ht=0}G!==null?(Pt=G.x,ne=G.y,ge=G.z):(Pt=0,ne=0,ge=0);const se=ft.convert(k.format),Oe=ft.convert(k.type);let xt;k.isData3DTexture?(Y.setTexture3D(k,0),xt=O.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Y.setTexture2DArray(k,0),xt=O.TEXTURE_2D_ARRAY):(Y.setTexture2D(k,0),xt=O.TEXTURE_2D),b.activeTexture(O.TEXTURE0),b.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),b.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),b.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);const Qe=b.getParameter(O.UNPACK_ROW_LENGTH),Kt=b.getParameter(O.UNPACK_IMAGE_HEIGHT),ln=b.getParameter(O.UNPACK_SKIP_PIXELS),Cn=b.getParameter(O.UNPACK_SKIP_ROWS),ai=b.getParameter(O.UNPACK_SKIP_IMAGES);b.pixelStorei(O.UNPACK_ROW_LENGTH,pe.width),b.pixelStorei(O.UNPACK_IMAGE_HEIGHT,pe.height),b.pixelStorei(O.UNPACK_SKIP_PIXELS,Tt),b.pixelStorei(O.UNPACK_SKIP_ROWS,zt),b.pixelStorei(O.UNPACK_SKIP_IMAGES,Ht);const Gi=C.isDataArrayTexture||C.isData3DTexture,re=k.isDataArrayTexture||k.isData3DTexture;if(C.isDepthTexture){const ve=X.get(C),ci=X.get(k),ce=X.get(ve.__renderTarget),li=X.get(ci.__renderTarget);b.bindFramebuffer(O.READ_FRAMEBUFFER,ce.__webglFramebuffer),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,li.__webglFramebuffer);for(let Wi=0;Wi<yt;Wi++)Gi&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(C).__webglTexture,W,Ht+Wi),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(k).__webglTexture,gt,ge+Wi)),O.blitFramebuffer(Tt,zt,_t,mt,Pt,ne,_t,mt,O.DEPTH_BUFFER_BIT,O.NEAREST);b.bindFramebuffer(O.READ_FRAMEBUFFER,null),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(W!==0||C.isRenderTargetTexture||X.has(C)){const ve=X.get(C),ci=X.get(k);b.bindFramebuffer(O.READ_FRAMEBUFFER,F),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,U);for(let ce=0;ce<yt;ce++)Gi?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ve.__webglTexture,W,Ht+ce):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ve.__webglTexture,W),re?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ci.__webglTexture,gt,ge+ce):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ci.__webglTexture,gt),W!==0?O.blitFramebuffer(Tt,zt,_t,mt,Pt,ne,_t,mt,O.COLOR_BUFFER_BIT,O.NEAREST):re?O.copyTexSubImage3D(xt,gt,Pt,ne,ge+ce,Tt,zt,_t,mt):O.copyTexSubImage2D(xt,gt,Pt,ne,Tt,zt,_t,mt);b.bindFramebuffer(O.READ_FRAMEBUFFER,null),b.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else re?C.isDataTexture||C.isData3DTexture?O.texSubImage3D(xt,gt,Pt,ne,ge,_t,mt,yt,se,Oe,pe.data):k.isCompressedArrayTexture?O.compressedTexSubImage3D(xt,gt,Pt,ne,ge,_t,mt,yt,se,pe.data):O.texSubImage3D(xt,gt,Pt,ne,ge,_t,mt,yt,se,Oe,pe):C.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,gt,Pt,ne,_t,mt,se,Oe,pe.data):C.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,gt,Pt,ne,pe.width,pe.height,se,pe.data):O.texSubImage2D(O.TEXTURE_2D,gt,Pt,ne,_t,mt,se,Oe,pe);b.pixelStorei(O.UNPACK_ROW_LENGTH,Qe),b.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Kt),b.pixelStorei(O.UNPACK_SKIP_PIXELS,ln),b.pixelStorei(O.UNPACK_SKIP_ROWS,Cn),b.pixelStorei(O.UNPACK_SKIP_IMAGES,ai),gt===0&&k.generateMipmaps&&O.generateMipmap(xt),b.unbindTexture()},this.initRenderTarget=function(C){X.get(C).__webglFramebuffer===void 0&&Y.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Y.setTextureCube(C,0):C.isData3DTexture?Y.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Y.setTexture2DArray(C,0):Y.setTexture2D(C,0),b.unbindTexture()},this.resetState=function(){B=0,D=0,q=null,b.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}function St(i,t){return i<t?`${i}_${t}`:`${t}_${i}`}class zi{positions;faceOffsets;faceCorners;uvSets;crease;cornerSharp;polygroup;materialId;vertexColor;constructor(t,e,n,s={}){this.positions=t,this.faceOffsets=e,this.faceCorners=n;const r=Math.max(0,e.length-1);this.uvSets=s.uvSets??new Map,this.crease=s.crease??new Map,this.cornerSharp=s.cornerSharp??new Map,this.polygroup=s.polygroup??new Uint16Array(r),this.materialId=s.materialId??new Uint16Array(r),this.vertexColor=s.vertexColor??null}static empty(){return new zi(new Float32Array(0),new Uint32Array([0]),new Uint32Array(0))}get vertexCount(){return this.positions.length/3}get faceCount(){return Math.max(0,this.faceOffsets.length-1)}get cornerCount(){return this.faceCorners.length}faceSize(t){return this.faceOffsets[t+1]-this.faceOffsets[t]}faceVerts(t){const e=[];for(let n=this.faceOffsets[t];n<this.faceOffsets[t+1];n++)e.push(this.faceCorners[n]);return e}cornerIndex(t,e){return this.faceOffsets[t]+e}getPosition(t,e=[0,0,0]){return e[0]=this.positions[t*3],e[1]=this.positions[t*3+1],e[2]=this.positions[t*3+2],e}setPosition(t,e,n,s){this.positions[t*3]=e,this.positions[t*3+1]=n,this.positions[t*3+2]=s}getCrease(t,e){return this.crease.get(St(t,e))??0}setCrease(t,e,n){const s=St(t,e);n<=0?this.crease.delete(s):this.crease.set(s,Math.min(10,n))}edges(){const t=new Set,e=[];for(let n=0;n<this.faceCount;n++){const s=this.faceOffsets[n],r=this.faceOffsets[n+1]-s;for(let o=0;o<r;o++){const a=this.faceCorners[s+o],c=this.faceCorners[s+(o+1)%r],l=St(a,c);t.has(l)||(t.add(l),e.push([Math.min(a,c),Math.max(a,c)]))}}return e}edgeFaceMap(){const t=new Map;for(let e=0;e<this.faceCount;e++){const n=this.faceOffsets[e],s=this.faceOffsets[e+1]-n;for(let r=0;r<s;r++){const o=St(this.faceCorners[n+r],this.faceCorners[n+(r+1)%s]),a=t.get(o);a?a.push(e):t.set(o,[e])}}return t}vertexFaces(){const t=new Map;for(let e=0;e<this.faceCount;e++)for(let n=this.faceOffsets[e];n<this.faceOffsets[e+1];n++){const s=this.faceCorners[n],r=t.get(s);r?r.push(e):t.set(s,[e])}return t}vertexNeighbors(){const t=new Map,e=(n,s)=>{const r=t.get(n);r?r.includes(s)||r.push(s):t.set(n,[s])};for(const[n,s]of this.edges())e(n,s),e(s,n);return t}triangulate(){let t=0;for(let r=0;r<this.faceCount;r++)t+=Math.max(0,this.faceSize(r)-2);const e=new Uint32Array(t*3),n=new Uint32Array(t);let s=0;for(let r=0;r<this.faceCount;r++){const o=this.faceOffsets[r],a=this.faceOffsets[r+1]-o;for(let c=1;c<a-1;c++)e[s*3]=this.faceCorners[o],e[s*3+1]=this.faceCorners[o+c],e[s*3+2]=this.faceCorners[o+c+1],n[s]=r,s++}return{tri:e,triToFace:n}}faceCenter(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,o=0;for(let a=0;a<n;a++){const c=this.faceCorners[e+a];s+=this.positions[c*3],r+=this.positions[c*3+1],o+=this.positions[c*3+2]}return[s/n,r/n,o/n]}faceNormal(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,o=0;for(let c=0;c<n;c++){const l=this.faceCorners[e+c],h=this.faceCorners[e+(c+1)%n],d=this.positions[l*3],u=this.positions[l*3+1],f=this.positions[l*3+2],p=this.positions[h*3],v=this.positions[h*3+1],g=this.positions[h*3+2];s+=(u-v)*(f+g),r+=(f-g)*(d+p),o+=(d-p)*(u+v)}const a=Math.hypot(s,r,o)||1;return[s/a,r/a,o/a]}faceNormals(){const t=new Float32Array(this.faceCount*3);for(let e=0;e<this.faceCount;e++){const n=this.faceNormal(e);t[e*3]=n[0],t[e*3+1]=n[1],t[e*3+2]=n[2]}return t}vertexNormals(){const t=this.faceNormals(),e=new Float32Array(this.vertexCount*3);for(let n=0;n<this.faceCount;n++)for(let s=this.faceOffsets[n];s<this.faceOffsets[n+1];s++){const r=this.faceCorners[s];e[r*3]+=t[n*3],e[r*3+1]+=t[n*3+1],e[r*3+2]+=t[n*3+2]}for(let n=0;n<this.vertexCount;n++){const s=Math.hypot(e[n*3],e[n*3+1],e[n*3+2])||1;e[n*3]/=s,e[n*3+1]/=s,e[n*3+2]/=s}return e}boundsCenter(){if(this.vertexCount===0)return[0,0,0];const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let n=0;n<this.positions.length;n+=3)for(let s=0;s<3;s++){const r=this.positions[n+s];r<t[s]&&(t[s]=r),r>e[s]&&(e[s]=r)}return[(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2]}stats(){let t=0;for(let e=0;e<this.faceCount;e++)t+=Math.max(0,this.faceSize(e)-2);return{vertices:this.vertexCount,edges:this.edges().length,faces:this.faceCount,triangles:t,corners:this.cornerCount}}clone(){const t=new Map;for(const[e,n]of this.uvSets)t.set(e,n.slice());return new zi(this.positions.slice(),this.faceOffsets.slice(),this.faceCorners.slice(),{uvSets:t,crease:new Map(this.crease),cornerSharp:new Map(this.cornerSharp),polygroup:this.polygroup.slice(),materialId:this.materialId.slice(),vertexColor:this.vertexColor?this.vertexColor.slice():null})}}class ee{pos=[];offsets=[0];corners=[];uv=new Map;groups=[];materials=[];weldMap;crease=new Map;cornerSharp=new Map;constructor(t={}){this.weldMap=t.weld===!1?null:new Map}vertex(t,e,n){if(this.weldMap){const r=l=>{const h=l.toFixed(5);return h==="-0.00000"?"0.00000":h},o=`${r(t)},${r(e)},${r(n)}`,a=this.weldMap.get(o);if(a!==void 0)return a;const c=this.pos.length/3;return this.pos.push(t,e,n),this.weldMap.set(o,c),c}const s=this.pos.length/3;return this.pos.push(t,e,n),s}get vertexCount(){return this.pos.length/3}positionAt(t){return[this.pos[t*3],this.pos[t*3+1],this.pos[t*3+2]]}get faceCount(){return this.offsets.length-1}face(t,e={}){const n=[],s=[];for(let r=0;r<t.length;r++){const o=t[r];n.length&&n[n.length-1]===o||n.includes(o)||(n.push(o),s.push(r))}if(n.length>=2&&n[0]===n[n.length-1]&&(n.pop(),s.pop()),n.length<3)return-1;for(const r of n)this.corners.push(r);if(this.offsets.push(this.corners.length),this.groups.push(e.polygroup??0),this.materials.push(e.materialId??0),e.uv)for(const[r,o]of e.uv){let a=this.uv.get(r);a||(a=new Array((this.corners.length-n.length)*2).fill(0),this.uv.set(r,a));for(const c of s){const l=o[c]??[0,0];a.push(l[0],l[1])}}for(const[r,o]of this.uv){const a=this.corners.length*2;for(;o.length<a;)o.push(0)}return this.faceCount-1}build(){const t=new Map;for(const[e,n]of this.uv){const s=new Float32Array(this.corners.length*2);s.set(n.slice(0,s.length)),t.set(e,s)}return new zi(new Float32Array(this.pos),new Uint32Array(this.offsets),new Uint32Array(this.corners),{uvSets:t,crease:this.crease,cornerSharp:this.cornerSharp,polygroup:new Uint16Array(this.groups),materialId:new Uint16Array(this.materials)})}}function Ue(i,t){if(i.uvSets.size===0)return null;const e=new Map,n=i.faceOffsets[t],s=i.faceOffsets[t+1]-n;for(const[r,o]of i.uvSets){const a=[];for(let c=0;c<s;c++)a.push([o[(n+c)*2],o[(n+c)*2+1]]);e.set(r,a)}return e}function L_(i){return Array.from(i.uvSets.keys())}function I_(i,t,e,n){if(!i)return null;const s=new Map;for(const[r,o]of i){const a=o[t]??[0,0],c=o[e]??[0,0];s.set(r,[a[0]+(c[0]-a[0])*n,a[1]+(c[1]-a[1])*n])}return s}function rs(i,t,e,n,s=(a,c)=>[a,c],r=!1,o={}){for(let a=0;a<t;a++)for(let c=0;c<e;c++){const l=r?[[a,c],[a,c+1],[a+1,c+1],[a+1,c]]:[[a,c],[a+1,c],[a+1,c+1],[a,c+1]],h=[],d=[];for(const[u,f]of l){const p=u/t,v=f/e,g=n(o.u?u%t/t:p,o.v?f%e/e:v);h.push(i.vertex(g[0],g[1],g[2])),d.push(s(p,v))}i.face(h,{uv:new Map([["map1",d]])})}}function Nr(i,t,e,n,s,r,o=[.5,.5],a=.5){if(!(s<=0))for(let c=0;c<s;c++)for(let l=0;l<n;l++){const h=[[l,c],[l+1,c],[l+1,c+1],[l,c+1]],d=[],u=[];for(const[f,p]of h){const v=f%n/n*Math.PI*2,g=t*(1-p/s);d.push(i.vertex(g*Math.cos(v),e,g*Math.sin(v)));const m=g/t*a;u.push([o[0]+Math.cos(v)*m,o[1]+Math.sin(v)*m])}r>0&&(d.reverse(),u.reverse()),i.face(d,{uv:new Map([["map1",u]])})}}const Bs=1/4,U_=(1-Bs*3)/2;function os(i,t){const e=i*Bs,n=U_+t*Bs;return(s,r)=>[e+s*Bs,n+r*Bs]}function D_(i,t,e,n,s,r){const[o,a,c]=i,l=[a[0]-o[0],a[1]-o[1],a[2]-o[2]],h=[c[0]-o[0],c[1]-o[1],c[2]-o[2]],d=[l[1]*h[2]-l[2]*h[1],l[2]*h[0]-l[0]*h[2],l[0]*h[1]-l[1]*h[0]],u=Math.hypot(d[0],d[1],d[2])||1,f=[d[0]/u,d[1]/u,d[2]/u],p=Math.abs(f[1])<.9?[0,1,0]:[1,0,0],v=[p[1]*f[2]-p[2]*f[1],p[2]*f[0]-p[0]*f[2],p[0]*f[1]-p[1]*f[0]],g=Math.hypot(v[0],v[1],v[2])||1,m=[v[0]/g,v[1]/g,v[2]/g],x=[f[1]*m[2]-f[2]*m[1],f[2]*m[0]-f[0]*m[2],f[0]*m[1]-f[1]*m[0]],y=i.map(F=>[F[0]*m[0]+F[1]*m[1]+F[2]*m[2],F[0]*x[0]+F[1]*x[1]+F[2]*x[2]]);let _=1/0,S=1/0,w=-1/0,T=-1/0;for(const[F,U]of y)_=Math.min(_,F),w=Math.max(w,F),S=Math.min(S,U),T=Math.max(T,U);const M=Math.max(w-_,T-S,1e-9),E=1/n,P=1/s,A=(Math.min(E,P)-r*2)/M,L=t*E+(E-(w-_)*A)/2,z=e*P+(P-(T-S)*A)/2;return y.map(([F,U])=>[L+(F-_)*A,z+(U-S)*A])}const Sn={cube:{id:"cube",label:"キューブ",en:"Cube",params:[{key:"width",label:"幅",value:1,min:.05,max:6,step:.05},{key:"height",label:"高さ",value:1,min:.05,max:6,step:.05},{key:"depth",label:"奥行き",value:1,min:.05,max:6,step:.05},{key:"sdW",label:"分割数 幅",value:1,min:1,max:12,step:1},{key:"sdH",label:"分割数 高さ",value:1,min:1,max:12,step:1},{key:"sdD",label:"分割数 奥行き",value:1,min:1,max:12,step:1}],build(i){const t=new ee,e=i.width/2,n=i.height/2,s=i.depth/2,r=(o,a,c,l,h,d)=>rs(t,l,h,(u,f)=>[o[0]+a[0]*u+c[0]*f,o[1]+a[1]*u+c[1]*f,o[2]+a[2]*u+c[2]*f],d);return r([-e,-n,s],[i.width,0,0],[0,i.height,0],i.sdW,i.sdH,os(0,1)),r([e,-n,-s],[-i.width,0,0],[0,i.height,0],i.sdW,i.sdH,os(2,1)),r([e,-n,s],[0,0,-i.depth],[0,i.height,0],i.sdD,i.sdH,os(1,1)),r([-e,-n,-s],[0,0,i.depth],[0,i.height,0],i.sdD,i.sdH,os(3,1)),r([-e,n,s],[i.width,0,0],[0,0,-i.depth],i.sdW,i.sdD,os(0,2)),r([-e,-n,-s],[i.width,0,0],[0,0,i.depth],i.sdW,i.sdD,os(0,0)),t.build()}},sphere:{id:"sphere",label:"スフィア",en:"Sphere",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sdAxis",label:"分割数 軸",value:20,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:12,min:2,max:64,step:1}],build(i){const t=new ee;return rs(t,i.sdAxis,i.sdHeight,(e,n)=>{const s=e*Math.PI*2,r=n*Math.PI;return[i.radius*Math.sin(r)*Math.cos(s),i.radius*Math.cos(r),i.radius*Math.sin(r)*Math.sin(s)]},(e,n)=>[e,1-n],!1,{u:!0}),t.build()}},cylinder:{id:"cylinder",label:"シリンダー",en:"Cylinder",params:[{key:"radius",label:"半径",value:.6,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCaps",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new ee,e=i.height/2;return rs(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*Math.cos(r),-e+s*i.height,i.radius*Math.sin(r)]},(n,s)=>[n,s*.5],!0,{u:!0}),Nr(t,i.radius,e,i.sdAxis,i.sdCaps,1,[.75,.75],.25),Nr(t,i.radius,-e,i.sdAxis,i.sdCaps,-1,[.25,.75],.25),t.build()}},cone:{id:"cone",label:"コーン",en:"Cone",params:[{key:"radius",label:"半径",value:.7,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCap",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new ee,e=i.height/2;return rs(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*(1-s)*Math.cos(r),-e+s*i.height,i.radius*(1-s)*Math.sin(r)]},(n,s)=>[n,s*.5],!0,{u:!0}),Nr(t,i.radius,-e,i.sdAxis,i.sdCap,-1,[.5,.75],.25),t.build()}},torus:{id:"torus",label:"トーラス",en:"Torus",params:[{key:"radius",label:"半径",value:1,min:.1,max:4,step:.05},{key:"section",label:"断面半径",value:.32,min:.02,max:2,step:.02},{key:"twist",label:"ツイスト",value:0,min:0,max:360,step:5},{key:"sdAxis",label:"分割数 軸",value:24,min:3,max:80,step:1},{key:"sdHeight",label:"分割数 断面",value:12,min:3,max:48,step:1}],build(i){const t=new ee,e=i.twist*Math.PI/180;return rs(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2,o=s*Math.PI*2+e*n,a=i.radius+i.section*Math.cos(o);return[a*Math.cos(r),i.section*Math.sin(o),a*Math.sin(r)]},(n,s)=>[n,s],!0,{u:!0,v:!0}),t.build()}},plane:{id:"plane",label:"プレーン",en:"Plane",params:[{key:"width",label:"幅",value:2,min:.05,max:10,step:.05},{key:"height",label:"奥行き",value:2,min:.05,max:10,step:.05},{key:"sdW",label:"分割数 幅",value:4,min:1,max:40,step:1},{key:"sdH",label:"分割数 奥行き",value:4,min:1,max:40,step:1}],build(i){const t=new ee;return rs(t,i.sdW,i.sdH,(e,n)=>[-i.width/2+e*i.width,0,-i.height/2+n*i.height],(e,n)=>[e,n],!0),t.build()}},disk:{id:"disk",label:"ディスク",en:"Disk",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sides",label:"サイド数",value:16,min:3,max:64,step:1},{key:"sdCaps",label:"分割数",value:1,min:1,max:10,step:1}],build(i){const t=new ee;return Nr(t,i.radius,0,i.sides,i.sdCaps,1,[.5,.5],.5),t.build()}},platonic:{id:"platonic",label:"正多面体",en:"Platonic",params:[{key:"kind",label:"種類",value:4,min:0,max:4,step:1,choices:["正四面体","正六面体","正八面体","正十二面体","正二十面体"]},{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05}],build(i){const t=(1+Math.sqrt(5))/2,e=1/t,n=Math.round(i.kind);let s,r;n===0?(s=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]],r=[[0,1,2],[0,3,1],[0,2,3],[1,3,2]]):n===1?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]],r=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]]):n===2?(s=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],r=[[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]]):n===3?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],[0,e,t],[0,e,-t],[0,-e,t],[0,-e,-t],[e,t,0],[e,-t,0],[-e,t,0],[-e,-t,0],[t,0,e],[t,0,-e],[-t,0,e],[-t,0,-e]],r=[[0,8,10,2,16],[0,16,17,1,12],[0,12,14,4,8],[8,4,18,6,10],[10,6,15,13,2],[2,13,3,17,16],[17,3,11,9,1],[1,9,5,14,12],[14,5,19,18,4],[18,19,7,15,6],[15,7,11,3,13],[9,11,7,19,5]]):(s=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]],r=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]);const o=new ee({weld:!1});for(const f of s){const p=Math.hypot(f[0],f[1],f[2]);o.vertex(f[0]/p*i.radius,f[1]/p*i.radius,f[2]/p*i.radius)}for(const f of r)o.face(f);const a=o.build(),c=[];for(let f=0;f<a.faceCount;f++){const p=a.faceCenter(f),v=a.faceNormal(f),g=a.faceVerts(f);c.push(p[0]*v[0]+p[1]*v[1]+p[2]*v[2]<0?g.reverse():g)}const l=new ee({weld:!1});for(let f=0;f<a.vertexCount;f++){const p=a.getPosition(f);l.vertex(p[0],p[1],p[2])}const h=Math.ceil(Math.sqrt(c.length)),d=Math.ceil(c.length/h),u=.02;return c.forEach((f,p)=>{const v=f.map(m=>a.getPosition(m)),g=D_(v,p%h,Math.floor(p/h),h,d,u);l.face(f,{uv:new Map([["map1",g]])})}),l.build()}}},wf=["cube","sphere","cylinder","cone","torus","plane","disk","platonic"];function oo(i){const t=Sn[i],e={};if(!t)return e;for(const n of t.params)e[n.key]=n.value;return e}function Zc(i,t,e,n){const s=i.edgeFaceMap(),r=[],o=new Set,a=(c,l,h,d,u)=>{for(let f=0;f<1e5;f++){const v=(s.get(St(c,l))??[]).find(M=>M!==d);if(v===void 0||o.has(v))return;const g=i.faceVerts(v);if(g.length!==4)return;o.add(v);let m=-1,x=c,y=l,_=h;for(let M=0;M<4;M++)if(g[M]===c&&g[(M+1)%4]===l){m=M;break}if(m<0){for(let M=0;M<4;M++)if(g[M]===l&&g[(M+1)%4]===c){m=M,x=l,y=c,_=1-h;break}}if(m<0)return;const S=(m+2)%4,w=(m+3)%4,T={face:v,a:x,b:y,t:_,c:g[S],d:g[w],ia:m,ib:(m+1)%4,ic:S,id:w};u?r.push(T):r.unshift(T),d=v,c=T.d,l=T.c,h=_}};return a(t,e,n,-1,!0),a(e,t,1-n,r.length?r[0].face:-1,!1),r}function ao(i,t,e,n,s,r){const o=i.getPosition(t),a=i.getPosition(e);if(!s||!r)return[o[0]+(a[0]-o[0])*n,o[1]+(a[1]-o[1])*n,o[2]+(a[2]-o[2])*n];const c=[r[t*3],r[t*3+1],r[t*3+2]],l=[r[e*3],r[e*3+1],r[e*3+2]],h=[a[0]-o[0],a[1]-o[1],a[2]-o[2]],d=h[0]*c[0]+h[1]*c[1]+h[2]*c[2],u=-(h[0]*l[0]+h[1]*l[1]+h[2]*l[2]),f=[0,0,0],p=1-n;for(let v=0;v<3;v++){const g=(2*o[v]+a[v]-d*c[v])/3,m=(2*a[v]+o[v]-u*l[v])/3;f[v]=p*p*p*o[v]+3*p*p*n*g+3*p*n*n*m+n*n*n*a[v]}return f}function Ef(i,t,e,n,s){const r=Zc(i,t,e,n);if(!r.length)return null;const o=s?i.vertexNormals():null,a=[ao(i,r[0].a,r[0].b,r[0].t,s,o)];for(const c of r)a.push(ao(i,c.d,c.c,c.t,s,o));return{points:a,faceCount:r.length}}function Tf(i,t,e,n,s=!1){const r=Zc(i,t,e,n);if(!r.length)return null;const o=s?i.vertexNormals():null,a=new Map;for(const u of r)a.set(u.face,u);const c=new ee({weld:!1});for(let u=0;u<i.vertexCount;u++){const f=i.getPosition(u);c.vertex(f[0],f[1],f[2])}const l=new Map,h=(u,f,p)=>{const v=Math.min(u,f),g=Math.max(u,f),m=`${v}_${g}`,x=l.get(m);if(x!==void 0)return x;const y=ao(i,u,f,p,s,o),_=c.vertex(y[0],y[1],y[2]);return l.set(m,_),_};for(let u=0;u<i.faceCount;u++){const f=a.get(u),p=Ue(i,u),v=i.polygroup[u],g=i.materialId[u];if(!f){c.face(i.faceVerts(u),{uv:p??void 0,polygroup:v,materialId:g});continue}const m=h(f.a,f.b,f.t),x=h(f.d,f.c,f.t),y=_=>{if(!p)return;const S=new Map;for(const[w,T]of p)S.set(w,_.map(M=>{if(typeof M=="number")return T[M]??[0,0];const[E,P]=M,A=T[E]??[0,0],L=T[P]??[0,0];return[A[0]+(L[0]-A[0])*f.t,A[1]+(L[1]-A[1])*f.t]}));return S};c.face([f.a,m,x,f.d],{uv:y([f.ia,[f.ia,f.ib],[f.id,f.ic],f.id]),polygroup:v,materialId:g}),c.face([m,f.b,f.c,x],{uv:y([[f.ia,f.ib],f.ib,f.ic,[f.id,f.ic]]),polygroup:v,materialId:g})}const d=c.build();for(const[u,f]of i.crease){const[p,v]=u.split("_").map(Number);l.has(`${Math.min(p,v)}_${Math.max(p,v)}`)||d.setCrease(p,v,f)}for(const[u,f]of i.cornerSharp)d.cornerSharp.set(u,f);return{mesh:d,faceCount:r.length}}function uc(i,t,e){const n=Array.from(new Set(t));if(!n.length)return null;const s=new Set(n);let r=0,o=0,a=0;for(const v of n){const g=i.faceNormal(v);r+=g[0],o+=g[1],a+=g[2]}const c=Math.hypot(r,o,a)||1;r/=c,o/=c,a/=c;const l=new ee({weld:!1});for(let v=0;v<i.vertexCount;v++){const g=i.getPosition(v);l.vertex(g[0],g[1],g[2])}const h=new Set;for(const v of n)for(const g of i.faceVerts(v))h.add(g);const d=new Map;for(const v of h){const g=i.getPosition(v);d.set(v,l.vertex(g[0]+r*e,g[1]+o*e,g[2]+a*e))}const u=new Map;for(const v of n){const g=i.faceVerts(v);for(let m=0;m<g.length;m++){const x=St(g[m],g[(m+1)%g.length]);u.set(x,(u.get(x)??0)+1)}}const f=[];for(let v=0;v<i.faceCount;v++){const g=Ue(i,v),m=i.polygroup[v],x=i.materialId[v],y=i.faceVerts(v);if(!s.has(v)){l.face(y,{uv:g??void 0,polygroup:m,materialId:x});continue}l.face(y.map(_=>d.get(_)),{uv:g??void 0,polygroup:m,materialId:x});for(let _=0;_<y.length;_++){const S=y[_],w=y[(_+1)%y.length];if(u.get(St(S,w))!==1)continue;let T;if(g){T=new Map;for(const[M,E]of g){const P=E[_]??[0,0],A=E[(_+1)%y.length]??[0,0];T.set(M,[P,A,A,P])}}f.push({verts:[S,w,d.get(w),d.get(S)],uv:T,group:m,material:x})}}for(const v of f)l.face(v.verts,{uv:v.uv,polygroup:v.group,materialId:v.material});const p=l.build();for(const[v,g]of i.crease){const[m,x]=v.split("_").map(Number);p.setCrease(m,x,g)}return{mesh:p,faceCount:n.length}}function fc(i,t,e){if(!t.length)return null;const n=i.edgeFaceMap(),s=i.faceNormals();let r=0,o=0,a=0;for(const[f,p]of t)for(const v of n.get(St(f,p))??[])r+=s[v*3],o+=s[v*3+1],a+=s[v*3+2];const c=Math.hypot(r,o,a);c<1e-6?(r=0,o=1,a=0):(r/=c,o/=c,a/=c);const l=new ee({weld:!1});for(let f=0;f<i.vertexCount;f++){const p=i.getPosition(f);l.vertex(p[0],p[1],p[2])}const h=new Set;for(const[f,p]of t)h.add(f),h.add(p);const d=new Map;for(const f of h){const p=i.getPosition(f);d.set(f,l.vertex(p[0]+r*e,p[1]+o*e,p[2]+a*e))}for(let f=0;f<i.faceCount;f++)l.face(i.faceVerts(f),{uv:Ue(i,f)??void 0,polygroup:i.polygroup[f],materialId:i.materialId[f]});for(const[f,p]of t){const v=n.get(St(f,p))??[];let g=!0;if(v.length){const m=i.faceVerts(v[0]);for(let x=0;x<m.length;x++)if(m[x]===f&&m[(x+1)%m.length]===p){g=!1;break}}g?l.face([f,p,d.get(p),d.get(f)]):l.face([p,f,d.get(f),d.get(p)])}const u=l.build();for(const[f,p]of i.crease){const[v,g]=f.split("_").map(Number);u.setCrease(v,g,p)}return{mesh:u,newEdges:t.map(([f,p])=>[d.get(f),d.get(p)]),faceCount:t.length}}function Ys(i,t){const e=new Map,n=new Map;t.forEach((a,c)=>{let l=0,h=0,d=0;for(const f of a){const p=i.getPosition(f);l+=p[0],h+=p[1],d+=p[2]}const u=`g${c}`;n.set(u,[l/a.length,h/a.length,d/a.length]);for(const f of a)e.set(f,u)});const s=new ee({weld:!1}),r=new Map,o=a=>{const c=e.get(a)??`v${a}`,l=r.get(c);if(l!==void 0)return l;const h=e.has(a)?n.get(e.get(a)):i.getPosition(a),d=s.vertex(h[0],h[1],h[2]);return r.set(c,d),d};for(let a=0;a<i.faceCount;a++)s.face(i.faceVerts(a).map(o),{uv:Ue(i,a)??void 0,polygroup:i.polygroup[a],materialId:i.materialId[a]});return s.build()}function Cf(i,t,e,n){let s=-1,r=-1,o=-1;for(let d=0;d<i.length;d++){const u=i[d],f=i[(d+1)%i.length];if(u===e&&f===n||u===n&&f===e){s=d,r=u,o=f;break}}if(s<0)return null;const a=[];for(let d=0;d<i.length;d++)a.push(i[(s+1+d)%i.length]);let c=t,l=-1;for(let d=0;d<t.length;d++)if(t[d]===o&&t[(d+1)%t.length]===r){l=d;break}if(l<0){const d=[...t].reverse();for(let u=0;u<d.length;u++)if(d[u]===o&&d[(u+1)%d.length]===r){l=u,c=d;break}if(l<0)return null}const h=[];for(let d=0;d<c.length;d++)h.push(c[(l+1+d)%c.length]);return[...a,...h.slice(1,h.length-1)]}function Af(i,t){let e=[];for(let a=0;a<i.faceCount;a++)e.push(i.faceVerts(a));const n=Array.from(i.polygroup),s=Array.from(i.materialId);let r=0;for(const[a,c]of t){const l=new Map;e.forEach((u,f)=>{for(let p=0;p<u.length;p++){const v=St(u[p],u[(p+1)%u.length]),g=l.get(v);g?g.push(f):l.set(v,[f])}});const h=l.get(St(a,c))??[];if(h.length!==2)continue;const d=Cf(e[h[0]],e[h[1]],a,c);!d||d.length<3||(e[h[0]]=d,e.splice(h[1],1),n.splice(h[1],1),s.splice(h[1],1),r++)}if(!r)return null;const o=new ee({weld:!1});for(let a=0;a<i.vertexCount;a++){const c=i.getPosition(a);o.vertex(c[0],c[1],c[2])}return e.forEach((a,c)=>{o.face(a,{polygroup:n[c]??0,materialId:s[c]??0})}),{mesh:o.build(),merged:r}}function Rf(i,t){const e=new Set(t);if(!e.size)return null;const n=new ee({weld:!1});for(let o=0;o<i.vertexCount;o++){const a=i.getPosition(o);n.vertex(a[0],a[1],a[2])}let s=0;for(let o=0;o<i.faceCount;o++){if(e.has(o)){s++;continue}n.face(i.faceVerts(o),{uv:Ue(i,o)??void 0,polygroup:i.polygroup[o],materialId:i.materialId[o]})}if(!s)return null;const r=n.build();for(const[o,a]of i.crease){const[c,l]=o.split("_").map(Number);r.setCrease(c,l,a)}return{mesh:r,removed:s}}function Pf(i,t){const e=[];for(const n of t)n<i.faceCount&&e.push(i.faceVerts(n));return e.length?Ys(i,e):null}function Un(i){const t=new Set;for(let r=0;r<i.faceCorners.length;r++)t.add(i.faceCorners[r]);if(t.size===i.vertexCount)return i;const e=new ee({weld:!1}),n=new Map;for(let r=0;r<i.vertexCount;r++){if(!t.has(r))continue;const o=i.getPosition(r);n.set(r,e.vertex(o[0],o[1],o[2]))}for(let r=0;r<i.faceCount;r++)e.face(i.faceVerts(r).map(o=>n.get(o)),{uv:Ue(i,r)??void 0,polygroup:i.polygroup[r],materialId:i.materialId[r]});const s=e.build();for(const[r,o]of i.crease){const[a,c]=r.split("_").map(Number),l=n.get(a),h=n.get(c);l!==void 0&&h!==void 0&&s.setCrease(l,h,o)}return s}function hs(i,t){return[i[0]-t[0],i[1]-t[1],i[2]-t[2]]}function zh(i){const t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]}function N_(i,t){return[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]]}function F_(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function Lf(i,t,e,n=1){const s=Math.max(1,Math.round(n));if(!(e>0))return null;const r=new Set;for(const[x,y]of t)x!==y&&r.add(St(x,y));if(!r.size)return null;const o=i.edgeFaceMap(),a=new Set;for(const x of r){const y=o.get(x);if(!y||y.length!==2)return null;for(const w of y)if(i.faceSize(w)!==4)return null;const[_,S]=x.split("_").map(Number);a.add(_),a.add(S)}const c=new ee({weld:!0}),l=[];for(let x=0;x<i.vertexCount;x++){const y=i.getPosition(x);l.push(c.vertex(y[0],y[1],y[2]))}const h=new Map,d=(x,y,_)=>`${x}|${y}|${_}`,u=new Map,f=x=>i.getPosition(x);for(let x=0;x<i.faceCount;x++){const y=i.faceVerts(x),_=[];for(let S=0;S<y.length;S++){const w=y[S],T=y[(S-1+y.length)%y.length],M=y[(S+1)%y.length],E=(S-1+y.length)%y.length,P=(S+1)%y.length;if(!a.has(w)){const tt={index:l[w],uv:{base:S,toward:[]}};_.push(tt);continue}const A=f(w),L=zh(hs(f(T),A)),z=zh(hs(f(M),A)),F=Math.hypot(...hs(f(T),A))||1,U=Math.hypot(...hs(f(M),A))||1,B=Math.min(e,F*.49),D=Math.min(e,U*.49),q=r.has(St(T,w)),j=r.has(St(w,M)),st=(tt,ot)=>({index:c.vertex(A[0]+tt[0],A[1]+tt[1],A[2]+tt[2]),uv:ot});if(q&&j){const tt=st([L[0]*B+z[0]*D,L[1]*B+z[1]*D,L[2]*B+z[2]*D],{base:S,toward:[{corner:E,t:B/F},{corner:P,t:D/U}]});_.push({index:tt.index,uv:tt.uv}),h.set(d(x,w,T),tt),h.set(d(x,w,M),tt)}else if(q){const tt=st([z[0]*D,z[1]*D,z[2]*D],{base:S,toward:[{corner:P,t:D/U}]});_.push({index:tt.index,uv:tt.uv}),h.set(d(x,w,T),tt),h.set(d(x,w,M),tt)}else if(j){const tt=st([L[0]*B,L[1]*B,L[2]*B],{base:S,toward:[{corner:E,t:B/F}]});_.push({index:tt.index,uv:tt.uv}),h.set(d(x,w,T),tt),h.set(d(x,w,M),tt)}else{const tt=st([L[0]*B,L[1]*B,L[2]*B],{base:S,toward:[{corner:E,t:B/F}]}),ot=st([z[0]*D,z[1]*D,z[2]*D],{base:S,toward:[{corner:P,t:D/U}]});_.push({index:tt.index,uv:tt.uv},{index:ot.index,uv:ot.uv}),h.set(d(x,w,T),tt),h.set(d(x,w,M),ot)}}u.set(x,_)}for(let x=0;x<i.faceCount;x++){const y=u.get(x),_=Ue(i,x);c.face(y.map(S=>S.index),{uv:_?O_(_,y.map(S=>S.uv)):void 0,polygroup:i.polygroup[x],materialId:i.materialId[x]})}let p=0;const v=new Map,g=(x,y)=>`${x}|${y}`;for(const x of r){const[y,_]=x.split("_").map(Number),[S,w]=o.get(x);for(const F of[y,_]){const U=F===y?_:y,B=h.get(d(S,F,U)),D=h.get(d(w,F,U));if(!B||!D)return null;const q=[],j=f(F),st=Gs(c,B.index),tt=Gs(c,D.index);for(let ot=0;ot<=s;ot++){const Ct=ot/s;if(ot===0)q.push(B.index);else if(ot===s)q.push(D.index);else{const Ft=1-Ct,At=Ft*Ft*st[0]+2*Ct*Ft*j[0]+Ct*Ct*tt[0],K=Ft*Ft*st[1]+2*Ct*Ft*j[1]+Ct*Ct*tt[1],rt=Ft*Ft*st[2]+2*Ct*Ft*j[2]+Ct*Ct*tt[2];q.push(c.vertex(At,K,rt))}}v.set(g(x,F),q)}const T=v.get(g(x,y)),M=v.get(g(x,_)),E=i.polygroup[S]??0,P=i.materialId[S]??0,A=i.faceVerts(S),L=A.indexOf(y),z=L>=0&&A[(L+1)%A.length]===_;for(let F=0;F<s;F++){const U=z?[M[F],T[F],T[F+1],M[F+1]]:[T[F],M[F],M[F+1],T[F+1]];c.face(U,{polygroup:E,materialId:P})>=0&&p++}}for(const x of a){const y=k_(i,x,o,r,h,v,d,g);if(y===null)return null;if(y.length<3)continue;const _=B_(c,y,i,x);c.face(_)>=0&&p++}const m=c.build();for(const[x,y]of i.crease){if(r.has(x))continue;const[_,S]=x.split("_").map(Number),w=l[_],T=l[S];w!==void 0&&T!==void 0&&!a.has(_)&&!a.has(S)&&m.setCrease(w,T,y)}return{mesh:m,newFaces:p}}function Gs(i,t){const e=i.positionAt(t);return[e[0],e[1],e[2]]}function O_(i,t){const e=new Map;for(const[n,s]of i){const r=[];for(const o of t){const a=s[o.base]??[0,0];let c=a[0],l=a[1];for(const h of o.toward){const d=s[h.corner]??a;c+=(d[0]-a[0])*h.t,l+=(d[1]-a[1])*h.t}r.push([c,l])}e.set(n,r)}return e}function k_(i,t,e,n,s,r,o,a){const c=new Map;for(const p of i.vertexFaces().get(t)??[]){const v=i.faceVerts(p),g=v.indexOf(t);if(g<0)return null;c.set(p,[v[(g-1+v.length)%v.length],v[(g+1)%v.length]])}if(!c.size)return null;const l=[...c.keys()][0],h=[];let d=l,u=c.get(l)[0];for(let p=0;p<=c.size;p++){const v=c.get(d);if(!v)return null;const g=v[0]===u?v[1]:v[0];h.push({face:d,from:u,to:g});const m=(e.get(St(t,g))??[]).find(x=>x!==d);if(m===void 0)return null;if(m===l&&g===c.get(l)[0])break;if(d=m,u=g,h.length>c.size)return null}if(h.length!==c.size)return null;const f=[];for(const p of h){const v=s.get(o(p.face,t,p.from)),g=s.get(o(p.face,t,p.to));if(!v||!g)return null;sa(f,v.index),g.index!==v.index&&sa(f,g.index);const m=St(t,p.to);if(n.has(m)){const x=r.get(a(m,t));if(!x)return null;const _=e.get(m)[0]===p.face?x:[...x].reverse();for(const S of _)sa(f,S)}}return f.length>1&&f[0]===f[f.length-1]&&f.pop(),f}function sa(i,t){i.length&&i[i.length-1]===t||i.push(t)}function B_(i,t,e,n){const s=e.vertexNormals(),r=[s[n*3],s[n*3+1],s[n*3+2]],o=Gs(i,t[0]);let a=0,c=0,l=0;for(let h=1;h+1<t.length;h++){const d=N_(hs(Gs(i,t[h]),o),hs(Gs(i,t[h+1]),o));a+=d[0],c+=d[1],l+=d[2]}return F_([a,c,l],r)<0?[...t].reverse():t}function ra(i){return i.closed?i.verts.length:i.verts.length-1}function oa(i,t){return[i.verts[t],i.verts[(t+1)%i.verts.length]]}function If(i){const t=new Map,e=(a,c)=>{const l=t.get(a);l?l.push(c):t.set(a,[c])},n=new Set;for(const[a,c]of i){if(a===c)continue;const l=St(a,c);n.has(l)||(n.add(l),e(a,c),e(c,a))}for(const a of t.values())if(a.length>2)return null;const s=new Set,r=a=>{const c=[a];s.add(a);let l=-1,h=a;for(;;){const d=(t.get(h)??[]).find(u=>u!==l&&!s.has(u));if(d===void 0)return c;c.push(d),s.add(d),l=h,h=d}},o=[];for(const[a,c]of t)c.length===1&&!s.has(a)&&o.push({verts:r(a),closed:!1});for(const a of t.keys()){if(s.has(a))continue;const c=r(a),l=c[c.length-1],h=c.length>2&&(t.get(l)??[]).includes(c[0]);o.push({verts:c,closed:h})}return o}function zs(i,t,e){const n=i.getPosition(t),s=i.getPosition(e);return Math.hypot(n[0]-s[0],n[1]-s[1],n[2]-s[2])}function z_(i,t,e){let n=0;for(let s=0;s<t.length;s++)n+=zs(i,t[s],e[s]);return n}function V_(i,t,e){const n=e.verts;if(!e.closed){const o=zs(i,t.verts[0],n[0])+zs(i,t.verts[t.verts.length-1],n[n.length-1]);return zs(i,t.verts[0],n[n.length-1])+zs(i,t.verts[t.verts.length-1],n[0])<o?[...n].reverse():[...n]}let s=n,r=1/0;for(const o of[n,[...n].reverse()])for(let a=0;a<o.length;a++){const c=o.map((h,d)=>o[(a+d)%o.length]),l=z_(i,t.verts,c);l<r&&(r=l,s=c)}return s}function Uf(i,t){const e=If(t);if(!e||e.length!==2)return null;const[n,s]=e;if(n.closed!==s.closed)return null;const r=ra(n);if(r<1||r!==ra(s))return null;const o=i.edgeFaceMap(),a=(f,p)=>{const v=o.get(St(f,p))??[];return v.length===1?v[0]:-1};for(const f of[n,s])for(let p=0;p<ra(f);p++){const[v,g]=oa(f,p);if(a(v,g)<0)return null}const l={verts:V_(i,n,s),closed:s.closed},h=new ee({weld:!1});for(let f=0;f<i.vertexCount;f++){const p=i.getPosition(f);h.vertex(p[0],p[1],p[2])}for(let f=0;f<i.faceCount;f++)h.face(i.faceVerts(f),{uv:Ue(i,f)??void 0,polygroup:i.polygroup[f],materialId:i.materialId[f]});let d=0;for(let f=0;f<r;f++){const[p,v]=oa(n,f),[g,m]=oa(l,f),x=a(p,v);if(x<0)continue;const y=i.faceVerts(x),_=y.indexOf(p),w=_>=0&&y[(_+1)%y.length]===v?[v,p,g,m]:[p,v,m,g];h.face(w,{polygroup:i.polygroup[x],materialId:i.materialId[x]})>=0&&d++}if(!d)return null;const u=h.build();for(const[f,p]of i.crease){const[v,g]=f.split("_").map(Number);u.setCrease(v,g,p)}return{mesh:u,faces:d}}function Df(i,t,e){if(!e.length)return null;const n=new Map,s=new Map,r=[];for(const l of e){const h=i.faceVerts(l),d=h.indexOf(t);if(d<0||h.length<3)return null;const u={face:l,prev:h[(d-1+h.length)%h.length],next:h[(d+1)%h.length]};if(n.has(u.next)||s.has(u.prev))return null;n.set(u.next,u),s.set(u.prev,u),r.push(u)}const o=r.find(l=>!s.has(l.next))??r[0],a=[o];let c=o;for(let l=1;l<r.length;l++){const h=n.get(c.prev);if(!h||h===o)return null;a.push(h),c=h}return{cycle:a,closed:n.get(c.prev)===o}}function H_(i,t,e){const n=i.faceVerts(t),s=n.indexOf(e),r=[];for(let o=1;o<n.length;o++)r.push(n[(s+o)%n.length]);return r}function Nf(i){const t=new ee({weld:!1});for(let e=0;e<i.vertexCount;e++){const n=i.getPosition(e);t.vertex(n[0],n[1],n[2])}return t}function Ff(i,t){for(const[e,n]of i.crease){const[s,r]=e.split("_").map(Number);s<t.vertexCount&&r<t.vertexCount&&t.setCrease(s,r,n)}}function jc(i,t,e){if(!(t>0))return null;const n=e?[...new Set(e)]:Array.from({length:i.vertexCount},(f,p)=>p);if(n.length<2)return null;const s=t,r=new Map,o=(f,p,v)=>`${Math.floor(f/s)},${Math.floor(p/s)},${Math.floor(v/s)}`;for(const f of n){const p=i.getPosition(f),v=o(p[0],p[1],p[2]),g=r.get(v);g?g.push(f):r.set(v,[f])}const a=new Map,c=f=>{let p=f;for(;a.get(p)!==p;)p=a.get(p)??p;let v=f;for(;a.get(v)!==p;){const g=a.get(v)??p;a.set(v,p),v=g}return p};for(const f of n)a.set(f,f);const l=t*t;for(const f of n){const p=i.getPosition(f),v=Math.floor(p[0]/s),g=Math.floor(p[1]/s),m=Math.floor(p[2]/s);for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let _=-1;_<=1;_++)for(const S of r.get(`${v+x},${g+y},${m+_}`)??[]){if(S<=f)continue;const w=i.getPosition(S);if((p[0]-w[0])**2+(p[1]-w[1])**2+(p[2]-w[2])**2>l)continue;const M=c(f),E=c(S);M!==E&&a.set(E,M)}}const h=new Map;for(const f of n){const p=c(f),v=h.get(p);v?v.push(f):h.set(p,[f])}const d=[...h.values()].filter(f=>f.length>1);if(!d.length)return null;let u=0;for(const f of d)u+=f.length-1;return{mesh:Ys(i,d),merged:u}}function Of(i,t){let e=i,n=0;for(const s of new Set(t)){const o=e.vertexFaces().get(s)??[],a=Df(e,s,o);if(!a)continue;const c=[];for(const u of a.cycle)for(const f of H_(e,u.face,s))c[c.length-1]!==f&&c.push(f);if(c.length>1&&c[0]===c[c.length-1]&&c.pop(),c.length<3)continue;const l=new Set(o),h=Nf(e);for(let u=0;u<e.faceCount;u++)l.has(u)||h.face(e.faceVerts(u),{uv:Ue(e,u)??void 0,polygroup:e.polygroup[u],materialId:e.materialId[u]});h.face(c,{polygroup:e.polygroup[a.cycle[0].face],materialId:e.materialId[a.cycle[0].face]});const d=h.build();Ff(e,d),e=d,n++}return n?{mesh:e,removed:n}:null}function dc(i,t,e,n=.25){const s=[...new Set(t)];if(!s.length)return null;const r=Math.max(.01,Math.min(.9,n)),o=i.vertexFaces(),a=i.vertexNormals(),c=[],l=new Set;for(const m of s){const x=Df(i,m,o.get(m)??[]);if(!(!x||!x.closed)&&!x.cycle.some(y=>l.has(y.face))){for(const y of x.cycle)l.add(y.face);c.push({v:m,cycle:x.cycle})}}if(!c.length)return null;const h=Nf(i),d=new Map,u=new Map;for(const{v:m,cycle:x}of c){const y=i.getPosition(m);for(const _ of x){const S=St(m,_.next);if(d.has(S))continue;const w=i.getPosition(_.next);d.set(S,h.vertex(y[0]+(w[0]-y[0])*r,y[1]+(w[1]-y[1])*r,y[2]+(w[2]-y[2])*r))}u.set(m,h.vertex(y[0]+a[m*3]*e,y[1]+a[m*3+1]*e,y[2]+a[m*3+2]*e))}const f=(m,x)=>[m[0]+(x[0]-m[0])*r,m[1]+(x[1]-m[1])*r],p=new Map;for(const{v:m,cycle:x}of c)for(const y of x)p.set(y.face,{v:m,entry:y});let v=0;for(let m=0;m<i.faceCount;m++){const x=p.get(m);if(!x){h.face(i.faceVerts(m),{uv:Ue(i,m)??void 0,polygroup:i.polygroup[m],materialId:i.materialId[m]});continue}const{v:y,entry:_}=x,S=i.faceVerts(m),w=S.indexOf(y),T=d.get(St(y,_.prev)),M=d.get(St(y,_.next)),E=[],P=Ue(i,m),A=new Map;if(P)for(const[L]of P)A.set(L,[]);for(let L=0;L<S.length;L++){const z=(w+L)%S.length;if(z===w){if(E.push(T,M),P)for(const[F,U]of P){const B=U[z]??[0,0],D=U[(z-1+S.length)%S.length]??B,q=U[(z+1)%S.length]??B;A.get(F).push(f(B,D),f(B,q))}continue}if(E.push(S[z]),P)for(const[F,U]of P)A.get(F).push(U[z]??[0,0])}h.face(E,{uv:P?A:void 0,polygroup:i.polygroup[m],materialId:i.materialId[m]})>=0&&v++}for(const{v:m,cycle:x}of c){const y=u.get(m);for(const _ of x){const S=d.get(St(m,_.prev)),w=d.get(St(m,_.next));h.face([w,S,y],{polygroup:i.polygroup[_.face],materialId:i.materialId[_.face]})>=0&&v++}}const g=h.build();return Ff(i,g),{mesh:g,faces:v,tips:c.map(({v:m})=>u.get(m))}}function pc(i,t){const{verts:e,uv:n}=i,s=e.length,r=[];for(let o=0;o<s;o++)t.has(e[o])&&r.push(o);if(r.length<2||s<4)return[i];for(let o=0;o<r.length;o++)for(let a=o+1;a<r.length;a++){const c=r[o],l=r[a],h=l-c,d=s-h;if(h<2||d<2)continue;const u=m=>[m.slice(c,l+1),[...m.slice(l),...m.slice(0,c+1)]],[f,p]=u(e);let v=null,g=null;if(n){v=new Map,g=new Map;for(const[m,x]of n){const[y,_]=u(x);v.set(m,y),g.set(m,_)}}return[...pc({verts:f,uv:v},t),...pc({verts:p,uv:g},t)]}return[i]}function G_(i,t,e){const n=new ee({weld:!1});for(let o=0;o<i.vertexCount;o++){const a=i.getPosition(o);n.vertex(a[0],a[1],a[2])}let s=0;for(let o=0;o<i.faceCount;o++){const a=pc({verts:i.faceVerts(o),uv:Ue(i,o)},t);s+=a.length-1;for(const c of a)n.face(c.verts,{uv:c.uv??void 0,polygroup:i.polygroup[o],materialId:i.materialId[o]})}if(!s)return null;const r=n.build();for(const[o,a]of i.crease){const[c,l]=o.split("_").map(Number);c<r.vertexCount&&l<r.vertexCount&&r.setCrease(c,l,a)}return{mesh:r,edges:s}}function Jc(i,t){const e=new Set(t);return e.size<2?null:G_(i,e)}function kf(i,t){const e=new Set(t.map(([c,l])=>St(c,l)));if(e.size<2)return null;const n=new Map,s=[];let r=i.vertexCount;for(const c of e){const[l,h]=c.split("_").map(Number);if(l>=i.vertexCount||h>=i.vertexCount)continue;const d=i.getPosition(l),u=i.getPosition(h);s.push((d[0]+u[0])/2,(d[1]+u[1])/2,(d[2]+u[2])/2),n.set(c,r++)}if(n.size<2)return null;const o=new ee({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);o.vertex(l[0],l[1],l[2])}for(let c=0;c<s.length;c+=3)o.vertex(s[c],s[c+1],s[c+2]);for(let c=0;c<i.faceCount;c++){const l=i.faceVerts(c),h=Ue(i,c),d=[],u=new Map;if(h)for(const[f]of h)u.set(f,[]);for(let f=0;f<l.length;f++){const p=l[f],v=l[(f+1)%l.length];if(d.push(p),h)for(const[m,x]of h)u.get(m).push(x[f]??[0,0]);const g=n.get(St(p,v));if(g!==void 0&&(d.push(g),h))for(const[m,x]of h){const y=x[f]??[0,0],_=x[(f+1)%l.length]??y;u.get(m).push([(y[0]+_[0])/2,(y[1]+_[1])/2])}}o.face(d,{uv:h?u:void 0,polygroup:i.polygroup[c],materialId:i.materialId[c]})}const a=o.build();for(const[c,l]of i.crease){const[h,d]=c.split("_").map(Number);h<a.vertexCount&&d<a.vertexCount&&a.setCrease(h,d,l)}return Jc(a,n.values())}function Bf(i,t){const e=new Set(t),n=i.vertexNeighbors(),s=new Map;for(const r of[...e].sort((o,a)=>o-a)){const o=(n.get(r)??[]).filter(a=>!e.has(a)).sort((a,c)=>a-c);s.set(r,o)}return s}function zf(i,t,e,n){const s=Math.max(-.99,Math.min(.99,n));for(const[r,o]of e){if(o<0)continue;const a=t[r*3],c=t[r*3+1],l=t[r*3+2];i.setPosition(r,a+(t[o*3]-a)*s,c+(t[o*3+1]-c)*s,l+(t[o*3+2]-l)*s)}}function Vf(i,t,e,n){let s=t*i.scale[0],r=e*i.scale[1],o=n*i.scale[2];const[a,c,l,h]=i.rotation,d=2*(c*o-l*r),u=2*(l*s-a*o),f=2*(a*r-c*s);return s+=h*d+(c*f-l*u),r+=h*u+(l*d-a*f),o+=h*f+(a*u-c*d),[s+i.position[0],r+i.position[1],o+i.position[2]]}function Ks(i,t,e,n){i.face(t.faceVerts(e).map(n),{uv:Ue(t,e)??void 0,polygroup:t.polygroup[e],materialId:t.materialId[e]})}function Hf(i,t){const e=[...new Set(t)].filter(c=>c>=0&&c<i.faceCount);if(!e.length)return null;const n=new ee({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);n.vertex(l[0],l[1],l[2])}for(let c=0;c<i.faceCount;c++)Ks(n,i,c,l=>l);const s=new Map,r=[],o=[];for(const c of e)for(const l of i.faceVerts(c)){if(s.has(l))continue;const h=i.getPosition(l),d=n.vertex(h[0],h[1],h[2]);s.set(l,d),r.push(d)}for(const c of e){const l=i.faceCount+o.length;Ks(n,i,c,h=>s.get(h)),o.push(l)}const a=n.build();for(const[c,l]of i.crease){const[h,d]=c.split("_").map(Number);a.setCrease(h,d,l)}return{mesh:a,faces:o,verts:r}}function Gf(i,t){const e=new Set([...t].filter(s=>s>=0&&s<i.faceCount));if(!e.size||e.size===i.faceCount)return null;const n=s=>{const r=new ee({weld:!1});for(let a=0;a<i.vertexCount;a++){const c=i.getPosition(a);r.vertex(c[0],c[1],c[2])}for(let a=0;a<i.faceCount;a++)s(a)&&Ks(r,i,a,c=>c);const o=r.build();for(const[a,c]of i.crease){const[l,h]=a.split("_").map(Number);o.setCrease(l,h,c)}return Un(o)};return{mesh:n(s=>!e.has(s)),extracted:n(s=>e.has(s)),count:e.size}}function Wf(i){if(i.length<2)return null;const t=new Set;for(const n of i)for(const s of n.mesh.uvSets.keys())t.add(s);const e=new ee({weld:!1});for(const{mesh:n,transform:s}of i){const r=e.vertexCount;for(let o=0;o<n.vertexCount;o++){const a=n.getPosition(o),c=s?Vf(s,a[0],a[1],a[2]):a;e.vertex(c[0],c[1],c[2])}for(let o=0;o<n.faceCount;o++){const a=n.faceVerts(o),c=Ue(n,o);let l;if(t.size){l=new Map;for(const h of t)l.set(h,c?.get(h)??a.map(()=>[0,0]))}e.face(a.map(h=>r+h),{uv:l,polygroup:n.polygroup[o],materialId:n.materialId[o]})}}return e.build()}function Xf(i){if(!i.faceCount)return null;const t=new Int32Array(i.faceCount);for(let o=0;o<i.faceCount;o++)t[o]=o;const e=o=>{let a=o;for(;t[a]!==a;)a=t[a];let c=o;for(;t[c]!==a;){const l=t[c];t[c]=a,c=l}return a},n=new Int32Array(i.vertexCount).fill(-1);for(let o=0;o<i.faceCount;o++)for(const a of i.faceVerts(o))if(n[a]<0)n[a]=o;else{const c=e(n[a]),l=e(o);c!==l&&(t[l]=c)}const s=new Map;for(let o=0;o<i.faceCount;o++){const a=e(o),c=s.get(a);c?c.push(o):s.set(a,[o])}if(s.size<2)return null;const r=[];for(const o of s.values()){const a=new ee({weld:!1});for(let l=0;l<i.vertexCount;l++){const h=i.getPosition(l);a.vertex(h[0],h[1],h[2])}for(const l of o)Ks(a,i,l,h=>h);const c=a.build();for(const[l,h]of i.crease){const[d,u]=l.split("_").map(Number);c.setCrease(d,u,h)}r.push(Un(c))}return r}function $f(i,t,e=.001){if(!i.vertexCount)return null;const n=new ee({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);n.vertex(l[0],l[1],l[2])}const s=i.vertexCount;for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c),h=[l[0],l[1],l[2]];h[t]=-h[t],n.vertex(h[0],h[1],h[2])}for(let c=0;c<i.faceCount;c++)Ks(n,i,c,l=>l);for(let c=0;c<i.faceCount;c++){const l=i.faceVerts(c).map(u=>s+u),h=Ue(i,c);let d;if(h){d=new Map;for(const[u,f]of h)d.set(u,[...f].reverse())}n.face(l.reverse(),{uv:d,polygroup:i.polygroup[c],materialId:i.materialId[c]})}const r=n.build();for(const[c,l]of i.crease){const[h,d]=c.split("_").map(Number);r.setCrease(h,d,l),r.setCrease(s+h,s+d,l)}const o=[];for(let c=0;c<r.vertexCount;c++)Math.abs(r.getPosition(c)[t])<=e&&o.push(c);const a=o.length>=2?jc(r,Math.max(e,1e-6),o):null;return a?{mesh:Un(a.mesh),welded:a.merged}:{mesh:r,welded:0}}function Vn(i,t){return`${i}:${t}`}function Zs(i){const t=i.indexOf(":");return[Number(i.slice(0,t)),Number(i.slice(t+1))]}function W_(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619)>>>0;return t.toString(16).padStart(8,"0")}function qf(i,t){const e=[...i].sort((s,r)=>s-r).join(","),n=[...t].sort().join(",");return W_(`${e}|${n}`)}function X_(i,t,e){const n=i.faceOffsets[t],s=i.faceOffsets[t+1];for(let r=n;r<s;r++)if(i.faceCorners[r]===e)return r-n;return-1}function bs(i,t){const e=i.edgeFaceMap(),n=new Int32Array(i.faceCount);for(let a=0;a<i.faceCount;a++)n[a]=a;const s=a=>{let c=a;for(;n[c]!==c;)c=n[c];let l=a;for(;n[l]!==c;){const h=n[l];n[l]=c,l=h}return c};for(const[a,c]of e){if(c.length!==2||t.has(a))continue;const l=s(c[0]),h=s(c[1]);l!==h&&(n[Math.max(l,h)]=Math.min(l,h))}const r=new Map;for(let a=0;a<i.faceCount;a++){const c=s(a),l=r.get(c);l?l.push(a):r.set(c,[a])}const o=[];for(const a of[...r.keys()].sort((c,l)=>c-l)){const c=r.get(a),l=[],h=new Set(c),d=new Set;for(const f of c){const p=i.faceSize(f);for(let g=0;g<p;g++)l.push(Vn(f,g));const v=i.faceVerts(f);for(let g=0;g<p;g++){const m=St(v[g],v[(g+1)%p]),x=e.get(m)??[];(t.has(m)||x.length!==2||!x.every(y=>h.has(y)))&&d.add(m)}}const u=[...d].sort();o.push({faces:c,corners:l,boundarySeams:u,fingerprint:qf(c,u)})}return o}function xo(i,t,e){const n=i.edgeFaceMap(),s=new Set(t.faces),r=new Map;t.corners.forEach((g,m)=>r.set(g,m));const o=new Int32Array(t.corners.length);for(let g=0;g<o.length;g++)o[g]=g;const a=g=>{let m=g;for(;o[m]!==m;)m=o[m];let x=g;for(;o[x]!==m;){const y=o[x];o[x]=m,x=y}return m},c=(g,m)=>{const x=a(g),y=a(m);x!==y&&(o[Math.max(x,y)]=Math.min(x,y))};for(const g of t.faces){const m=i.faceVerts(g);for(let x=0;x<m.length;x++){const y=m[x],_=m[(x+1)%m.length],S=St(y,_);if(e.has(S))continue;const w=n.get(S)??[];if(w.length!==2)continue;const T=w[0]===g?w[1]:w[0];if(!(T===g||!s.has(T)))for(const[M,E]of[[y,x],[_,(x+1)%m.length]]){const P=X_(i,T,M);if(P<0)continue;const A=r.get(Vn(g,E)),L=r.get(Vn(T,P));A!==void 0&&L!==void 0&&c(A,L)}}}const l=new Map,h=new Map,d=[];for(let g=0;g<t.corners.length;g++){const m=a(g);let x=l.get(m);if(x===void 0){x=l.size,l.set(m,x);const[y,_]=Zs(t.corners[g]);d.push(i.faceVerts(y)[_])}h.set(t.corners[g],x)}const u=l.size,f=new Float64Array(u*3),p=new Int32Array(u);for(let g=0;g<u;g++){const m=d[g];p[g]=m,f[g*3]=i.positions[m*3],f[g*3+1]=i.positions[m*3+1],f[g*3+2]=i.positions[m*3+2]}const v=[];for(const g of t.faces){const m=i.faceSize(g),x=[];for(let y=0;y<m;y++)x.push(h.get(Vn(g,y)));for(let y=1;y<m-1;y++)v.push(x[0],x[y],x[y+1])}return{count:u,tri:Uint32Array.from(v),positions:f,localOf:h,vertexOf:p}}function $_(i,t){const e=new Float64Array(i.cols.length);for(let n=0;n<i.cols.length;n++){const s=i.cols[n],r=i.vals[n];let o=0;for(let a=0;a<s.length;a++)o+=r[a]*t[s[a]];e[n]=o}return e}function Vh(i,t){const e=new Float64Array(i.columns);for(let n=0;n<i.cols.length;n++){const s=i.cols[n],r=i.vals[n],o=t[n];if(o!==0)for(let a=0;a<s.length;a++)e[s[a]]+=r[a]*o}return e}function Yf(i,t=4e3,e=1e-10){const n=i.columns,s=new Float64Array(n),r=Vh(i,i.rhs),o=new Float64Array(n);for(let f=0;f<i.cols.length;f++){const p=i.cols[f],v=i.vals[f];for(let g=0;g<p.length;g++)o[p[g]]+=v[g]*v[g]}for(let f=0;f<n;f++)o[f]>1e-300||(o[f]=1);const a=Float64Array.from(r),c=new Float64Array(n);for(let f=0;f<n;f++)c[f]=a[f]/o[f];const l=Float64Array.from(c);let h=0,d=0;for(let f=0;f<n;f++)h+=a[f]*c[f],d+=a[f]*a[f];const u=Math.max(1e-300,d)*e*e;if(d<=u)return s;for(let f=0;f<t;f++){const p=Vh(i,$_(i,l));let v=0;for(let _=0;_<n;_++)v+=l[_]*p[_];if(!(Math.abs(v)>1e-300))break;const g=h/v;let m=0;for(let _=0;_<n;_++)s[_]+=g*l[_],a[_]-=g*p[_],m+=a[_]*a[_];if(m<=u)break;let x=0;for(let _=0;_<n;_++)c[_]=a[_]/o[_],x+=a[_]*c[_];const y=x/h;for(let _=0;_<n;_++)l[_]=c[_]+y*l[_];h=x}return s}function q_(i,t,e,n){const s=i[e*3]-i[t*3],r=i[e*3+1]-i[t*3+1],o=i[e*3+2]-i[t*3+2],a=i[n*3]-i[t*3],c=i[n*3+1]-i[t*3+1],l=i[n*3+2]-i[t*3+2],h=Math.hypot(s,r,o);if(h<1e-12)return{x:[0,0,0],y:[0,0,0],area2:0};const d=h,u=(s*a+r*c+o*l)/h,f=r*l-o*c,p=o*a-s*l,v=s*c-r*a,g=Math.hypot(f,p,v)/h;return{x:[0,d,u],y:[0,0,g],area2:d*g}}function Kf(i,t,e){const n=i.length/3,s=new Float64Array(n*2);if(!n)return s;const r=[],o=new Int32Array(n).fill(-1);for(let u=0;u<n;u++)e.has(u)||(o[u]=r.length,r.push(u));const a=r.length*2;if(!a){for(const[u,f]of e)s[u*2]=f[0],s[u*2+1]=f[1];return s}const c=[],l=[],h=[];for(let u=0;u<t.length;u+=3){const f=[t[u],t[u+1],t[u+2]],{x:p,y:v,area2:g}=q_(i,f[0],f[1],f[2]);if(!(g>1e-16))continue;const m=1/Math.sqrt(g),x=[p[2]-p[1],p[0]-p[2],p[1]-p[0]],y=[v[2]-v[1],v[0]-v[2],v[1]-v[0]];for(const _ of[0,1]){const S=[],w=[];let T=0;for(let M=0;M<3;M++){const E=(_===0?x[M]:y[M])*m,P=(_===0?-y[M]:x[M])*m,A=f[M],L=e.get(A);if(L){T-=E*L[0]+P*L[1];continue}S.push(o[A],r.length+o[A]),w.push(E,P)}S.length&&(c.push(Int32Array.from(S)),l.push(Float64Array.from(w)),h.push(T))}}const d=Yf({cols:c,vals:l,rhs:Float64Array.from(h),columns:a});for(let u=0;u<r.length;u++){const f=r[u];s[f*2]=d[u],s[f*2+1]=d[r.length+u]}for(const[u,f]of e)s[u*2]=f[0],s[u*2+1]=f[1];return s}function Zf(i,t){const e=i.length/3,n=new Map;if(e<2)return e===1&&n.set(0,[0,0]),n;if(!t||!t.length){const[u,f]=Hh(i,Array.from({length:e},(p,v)=>v));return u!==f&&(n.set(u,[0,0]),n.set(f,[1,0])),n}const s=new Int32Array(e);for(let u=0;u<e;u++)s[u]=u;const r=u=>{let f=u;for(;s[f]!==f;)f=s[f];for(;s[u]!==f;){const p=s[u];s[u]=f,u=p}return f},o=(u,f)=>{const p=r(u),v=r(f);p!==v&&(s[p]=v)};for(let u=0;u<t.length;u+=3)o(t[u],t[u+1]),o(t[u+1],t[u+2]);const a=new Map;for(let u=0;u<t.length;u+=3)for(let f=0;f<3;f++){const p=t[u+f],v=t[u+(f+1)%3];if(p===v)continue;const g=p<v?`${p}_${v}`:`${v}_${p}`;a.set(g,(a.get(g)??0)+1)}const c=new Set;for(const[u,f]of a){if(f!==1)continue;const[p,v]=u.split("_").map(Number);c.add(p),c.add(v)}const l=new Map;for(const[u,f]of a){if(f!==1)continue;const[p,v]=u.split("_").map(Number);for(const[g,m]of[[p,v],[v,p]]){const x=l.get(g);x?x.push(m):l.set(g,[m])}}const h=new Map;for(let u=0;u<e;u++){const f=r(u),p=h.get(f);p?p.push(u):h.set(f,[u])}let d=0;for(const u of[...h.keys()].sort((f,p)=>f-p)){const f=h.get(u),p=f.filter(x=>c.has(x)),v=Y_(l,p);let g,m;v.length>=4?(g=v[0],m=v[Math.floor(v.length/2)]):[g,m]=Hh(i,p.length>=2?p:f),g!==m&&(n.set(g,[d,0]),n.set(m,[d+1,0]),d+=2)}return n}function Y_(i,t){const e=t.length?Math.min(...t):-1;if(e<0)return[];const n=[e],s=new Set([e]);let r=e;for(let o=0;o<t.length+2;o++){const a=(i.get(r)??[]).filter(c=>!s.has(c)).sort((c,l)=>c-l);if(!a.length)break;r=a[0],s.add(r),n.push(r)}return n}function Hh(i,t){if(t.length<2)return[t[0]??0,t[0]??0];const e=[...t].sort((o,a)=>o-a);let n=e[0],s=-1;for(const o of e){const a=Gh(i,e[0],o);a>s&&(s=a,n=o)}let r=e[0];s=-1;for(const o of e){if(o===n)continue;const a=Gh(i,n,o);a>s&&(s=a,r=o)}return[n,r]}function Gh(i,t,e){return Math.hypot(i[t*3]-i[e*3],i[t*3+1]-i[e*3+1],i[t*3+2]-i[e*3+2])}function jf(i,t,e){let n=0,s=0;for(let o=0;o<t.length;o+=3){const a=t[o],c=t[o+1],l=t[o+2],h=i[c*3]-i[a*3],d=i[c*3+1]-i[a*3+1],u=i[c*3+2]-i[a*3+2],f=i[l*3]-i[a*3],p=i[l*3+1]-i[a*3+1],v=i[l*3+2]-i[a*3+2],g=d*v-u*p,m=u*f-h*v,x=h*p-d*f;n+=Math.hypot(g,m,x)/2;const y=e[c*2]-e[a*2],_=e[c*2+1]-e[a*2+1],S=e[l*2]-e[a*2],w=e[l*2+1]-e[a*2+1];s+=Math.abs(y*w-_*S)/2}if(!(n>1e-16)||!(s>1e-16))return 1;const r=Math.sqrt(n/s);for(let o=0;o<e.length;o++)e[o]*=r;return r}function mc(i,t){const e=i.length/3,n=new Float64Array(e*2);if(!e)return n;let s=0,r=0,o=0;for(let m=0;m<t.length;m+=3){const x=t[m]*3,y=t[m+1]*3,_=t[m+2]*3,S=i[y]-i[x],w=i[y+1]-i[x+1],T=i[y+2]-i[x+2],M=i[_]-i[x],E=i[_+1]-i[x+1],P=i[_+2]-i[x+2];s+=w*P-T*E,r+=T*M-S*P,o+=S*E-w*M}let a=Math.hypot(s,r,o);a<1e-12&&(s=0,r=0,o=1,a=1),s/=a,r/=a,o/=a;const c=Math.abs(s)<.9?1:0,l=Math.abs(s)<.9?0:1;let h=l*o-0*r,d=0*s-c*o,u=c*r-l*s;const f=Math.hypot(h,d,u)||1;h/=f,d/=f,u/=f;const p=r*u-o*d,v=o*h-s*u,g=s*d-r*h;for(let m=0;m<e;m++){const x=i[m*3],y=i[m*3+1],_=i[m*3+2];n[m*2]=x*h+y*d+_*u,n[m*2+1]=x*p+y*v+_*g}return n}function co(i,t,e,n){const s=t[e*3],r=t[e*3+1],o=t[e*3+2],a=i[r*3]-i[s*3],c=i[r*3+1]-i[s*3+1],l=i[r*3+2]-i[s*3+2],h=i[o*3]-i[s*3],d=i[o*3+1]-i[s*3+1],u=i[o*3+2]-i[s*3+2],f=Math.hypot(a,c,l);if(f<1e-12)return null;const p=f,v=(a*h+c*d+l*u)/f,g=c*u-l*d,m=l*h-a*u,x=a*d-c*h,y=Math.hypot(g,m,x),_=y/f,S=p*_;if(!(Math.abs(S)>1e-16))return null;const w=n[r*2]-n[s*2],T=n[r*2+1]-n[s*2+1],M=n[o*2]-n[s*2],E=n[o*2+1]-n[s*2+1],P=[w*_/S,(-w*v+M*p)/S,T*_/S,(-T*v+E*p)/S],A=g/y,L=m/y,z=x/y,F=a/f,U=c/f,B=l/f;return{ex:[F,U,B],ey:[L*B-z*U,z*F-A*B,A*U-L*F],normal:[A,L,z],j:P,area:y/2,uvArea:Math.abs(w*E-M*T)/2,local:[[0,0],[p,0],[v,_]]}}function Qc(i,t,e){const n=t.length/3,s=new Float32Array(n);let r=1,o=0,a=0;for(let c=0;c<n;c++){const l=t[c*3],h=t[c*3+1],d=t[c*3+2],u=co(i,t,c,e);if(!u){s[c]=1;continue}const[f,p,v,g]=u.j,m=(f+g)/2,x=(f-g)/2,y=(v+p)/2,_=(v-p)/2,S=Math.hypot(m,_),w=Math.hypot(x,y),T=S+w,M=Math.abs(S-w),E=M>1e-12?T/M:1e12;s[c]=E,E>r&&(r=E);const P=u.local,A=[[e[l*2],e[l*2+1]],[e[h*2],e[h*2+1]],[e[d*2],e[d*2+1]]];for(let L=0;L<3;L++){const z=P[L],F=P[(L+1)%3],U=P[(L+2)%3],B=A[L],D=A[(L+1)%3],q=A[(L+2)%3],j=Wh(z,F,U),st=Wh(B,D,q);Number.isFinite(j)&&Number.isFinite(st)&&(o+=Math.abs(j-st),a++)}}return{maxStretch:r,meanAngleError:a?o/a*(180/Math.PI):0,perTriangle:s}}function Wh(i,t,e){const n=t[0]-i[0],s=t[1]-i[1],r=e[0]-i[0],o=e[1]-i[1],a=Math.hypot(n,s),c=Math.hypot(r,o);if(a<1e-12||c<1e-12)return NaN;const l=Math.max(-1,Math.min(1,(n*r+s*o)/(a*c)));return Math.acos(l)}const Xh=.2,$h=[0,1,0],K_=[1,0,0];function Jf(i,t,e){const n=t.length/3;if(!n)return;let s=0,r=0;for(let d=0;d<n;d++){const u=co(i,t,d,e);u&&(r+=u.area,Z_($h,u.normal)>=Xh&&(s+=u.area))}if(!(r>0))return;const o=s*2>=r,a=o?$h:K_;let c=0,l=0;for(let d=0;d<n;d++){const u=co(i,t,d,e);if(!u)continue;const f=Qf(a,u.normal),p=Math.hypot(f[0],f[1],f[2]);if(p<Xh)continue;const v=gc(f,u.ex)/p,g=gc(f,u.ey)/p,[m,x,y,_]=u.j,S=m*v+x*g,w=y*v+_*g,T=Math.hypot(S,w);T<1e-12||(c+=S/T*u.uvArea,l+=w/T*u.uvArea)}if(Math.hypot(c,l)<1e-12)return;let h=Math.atan2(c,l);o||(h-=Math.PI/2),!(Math.abs(h)<1e-9)&&j_(e,h)}function Z_(i,t){const e=Qf(i,t);return Math.hypot(e[0],e[1],e[2])}function Qf(i,t){const e=gc(i,t);return[i[0]-t[0]*e,i[1]-t[1]*e,i[2]-t[2]*e]}function gc(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function j_(i,t){const e=i.length/2;if(!e)return;let n=0,s=0;for(let a=0;a<e;a++)n+=i[a*2],s+=i[a*2+1];n/=e,s/=e;const r=Math.cos(t),o=Math.sin(t);for(let a=0;a<e;a++){const c=i[a*2]-n,l=i[a*2+1]-s;i[a*2]=n+c*r-l*o,i[a*2+1]=s+c*o+l*r}}function J_(i){const t=new Map;for(let e=0;e<i.faceCount;e++){const n=i.faceVerts(e);for(let s=0;s<n.length;s++){const r=St(n[s],n[(s+1)%n.length]),o=t.get(r);o?o.push(e):t.set(r,[e])}}return t}function Ni(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function td(i,t,e){const n=new Set;if(i.faceCount===0)return n;const s=J_(i),r=[];for(let c=0;c<i.faceCount;c++)r.push(i.faceNormal(c));const o=Math.cos(Math.max(0,Math.min(180,t.angle))*Math.PI/180),a=Math.cos(Math.max(0,Math.min(180,e))*Math.PI/180);for(const c of[...s.keys()].sort()){const l=s.get(c);if(l.length!==2)continue;const[h,d]=l,u=Ni(r[h],r[d]);if(u<o){n.add(c);continue}if(t.useHardEdges&&u<a){n.add(c);continue}if(t.useCreases&&(i.crease.get(c)??0)>0){n.add(c);continue}t.usePolygroups&&i.polygroup[h]!==i.polygroup[d]&&n.add(c)}return Q_(i,n,r,s),eM(i,n,r,s),t.symmetric&&iM(i,n),n}function Q_(i,t,e,n){for(let s=0;s<4;s++){const r=bs(i,t);let o=!1;for(const a of r){if(a.faces.length<4)continue;const c=a.faces.length>i.faceCount/3,l=tM(a.faces,e)<Math.cos(120*Math.PI/180);!c&&!l||ed(a.faces,t,e,n)&&(o=!0)}if(!o)return}}function tM(i,t){let e=1;const n=i[0];let s=n;for(const o of i){const a=Ni(t[n],t[o]);a<e&&(e=a,s=o)}let r=1;for(const o of i)r=Math.min(r,Ni(t[s],t[o]));return Math.min(e,r)}function ed(i,t,e,n){const s=new Set(i),r=[...i].sort((p,v)=>p-v),o=r[0];let a=o,c=1;for(const p of r){const v=Ni(e[o],e[p]);v<c&&(c=v,a=p)}let l=a;c=1;for(const p of r){const v=Ni(e[a],e[p]);v<c&&(c=v,l=p)}if(a===l)return!1;const h=new Map;for(const[p,v]of n){if(v.length!==2||t.has(p))continue;const[g,m]=v;if(!(!s.has(g)||!s.has(m)))for(const[x,y]of[[g,m],[m,g]]){const _=h.get(x);_?_.push(y):h.set(x,[y])}}const d=new Map;d.set(a,0),d.set(l,1);const u=[a,l];for(;u.length;){const p=u.shift();for(const v of(h.get(p)??[]).sort((g,m)=>g-m)){if(d.has(v))continue;const g=Ni(e[v],e[a]),m=Ni(e[v],e[l]);d.set(v,g>=m?0:1),u.push(v)}}let f=0;for(const p of[...n.keys()].sort()){const v=n.get(p);if(v.length!==2||t.has(p))continue;const[g,m]=v;if(!s.has(g)||!s.has(m))continue;const x=d.get(g),y=d.get(m);x===void 0||y===void 0||x===y||(t.add(p),f++)}return f>0}function eM(i,t,e,n){for(let s=0;s<8;s++){const r=bs(i,t);let o=!1;for(const a of r){if(nM(i,a.faces,t))continue;if(ed(a.faces,t,e,n)){o=!0;continue}const c=[...a.faces].sort((h,d)=>h-d)[0],l=i.faceVerts(c);for(let h=0;h<l.length;h++)t.add(St(l[h],l[(h+1)%l.length]));o=!0}if(!o)return}}function nM(i,t,e){new Set(t);const n=new Map,s=l=>{let h=l;for(;n.get(h)!==h;)h=n.get(h)??h;let d=l;for(;n.get(d)!==h;){const u=n.get(d)??h;n.set(d,h),d=u}return h},r=(l,h)=>{const d=s(l),u=s(h);d!==u&&n.set(d,u)},o=(l,h)=>`${l}:${h}`;for(const l of t)for(let h=0;h<i.faceSize(l);h++)n.set(o(l,h),o(l,h));for(const l of t){const h=i.faceVerts(l);for(let d=0;d<h.length;d++){const u=h[d],f=h[(d+1)%h.length],p=St(u,f);if(!e.has(p))for(const v of t){if(v===l)continue;const g=i.faceVerts(v),m=g.indexOf(u),x=g.indexOf(f);if(m<0||x<0)continue;const y=g.length;(m+1)%y!==x&&(x+1)%y!==m||(r(o(l,d),o(v,m)),r(o(l,(d+1)%h.length),o(v,x)))}}}const a=new Set;for(const l of t)for(let h=0;h<i.faceSize(l);h++)a.add(s(o(l,h)));const c=new Set;for(const l of t){const h=i.faceSize(l);for(let d=0;d<h;d++){const u=s(o(l,d)),f=s(o(l,(d+1)%h));c.add(u<f?`${u}|${f}`:`${f}|${u}`)}}return a.size-c.size+t.length===1}function iM(i,t){const e=i.positions,n=(o,a,c)=>`${o.toFixed(3)==="-0.000"?"0.000":o.toFixed(3)},${a.toFixed(3)},${c.toFixed(3)}`,s=new Map;for(let o=0;o<i.vertexCount;o++)s.set(n(e[o*3],e[o*3+1],e[o*3+2]),o);const r=new Set;for(const[o,a]of i.edges())r.add(St(o,a));for(const o of[...t].sort()){const[a,c]=o.split("_").map(Number),l=s.get(n(-e[a*3],e[a*3+1],e[a*3+2])),h=s.get(n(-e[c*3],e[c*3+1],e[c*3+2]));if(l===void 0||h===void 0)continue;const d=St(l,h);r.has(d)&&t.add(d)}}function nd(i){const t=Math.max(1,i.textureSize);return Math.max(i.marginTexels,Math.ceil(5*1024/t))/t}function id(i,t,e){const n=i.length,s=i.map(()=>({x:0,y:0,rotated:!1,scale:1}));if(!n)return s;const r=i.map((f,p)=>{const v=e&&f.h>f.w;return{i:p,w:Math.max(1e-6,v?f.h:f.w),h:Math.max(1e-6,v?f.w:f.h),rotated:v}}),o=[...r].sort((f,p)=>p.h-f.h||p.w-f.w||f.i-p.i),a=Math.max(1e-6,1-t*2),c=f=>{let p=0,v=0;for(const w of r)p+=(w.w*f+t)*(w.h*f+t),v=Math.max(v,w.w*f);const g=Math.max(v,Math.sqrt(p)*1.05),m=new Array(n);let x=0,y=0,_=0,S=0;for(const w of o){const T=w.w*f,M=w.h*f;x>0&&x+T>g&&(y+=_+t,x=0,_=0),m[w.i]={x,y},x+=T+t,S=Math.max(S,x-t),_=Math.max(_,M)}return{place:m,usedWidth:S,usedHeight:y+_}},l=f=>{const p=c(f);return p.usedWidth<=a&&p.usedHeight<=a};let h=0,d=1;for(let f=0;f<40&&l(d);f++)h=d,d*=2;for(let f=0;f<40;f++){const p=(h+d)/2;l(p)?h=p:d=p}const u=c(h);for(let f=0;f<n;f++)s[f]={x:u.place[f].x+t,y:u.place[f].y+t,rotated:r[f].rotated,scale:h};return s}function sd(i,t,e,n){const s=[];for(let o=0;o<i.length;o++){const a=rd(i[o],t[o]),c=Math.max(1e-12,e[o]);s.push(a>1e-12?Math.sqrt(a/c):1)}let r=n;if(r===null){let o=0;for(let a=1;a<e.length;a++)e[a]>e[o]&&(o=a);r=s[o]??1}if(r>1e-12)for(let o=0;o<i.length;o++){const a=r/Math.max(1e-12,s[o]);if(Math.abs(a-1)<1e-9)continue;const c=i[o];let l=0,h=0;const d=c.length/2;for(let u=0;u<d;u++)l+=c[u*2],h+=c[u*2+1];l/=Math.max(1,d),h/=Math.max(1,d);for(let u=0;u<d;u++)c[u*2]=l+(c[u*2]-l)*a,c[u*2+1]=h+(c[u*2+1]-h)*a}}function rd(i,t){let e=0;for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],o=t[n+2];e+=Math.abs((i[r*2]-i[s*2])*(i[o*2+1]-i[s*2+1])-(i[o*2]-i[s*2])*(i[r*2+1]-i[s*2+1]))}return e/2}function od(i,t){let e=0;for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],o=t[n+2],a=i[r*3]-i[s*3],c=i[r*3+1]-i[s*3+1],l=i[r*3+2]-i[s*3+2],h=i[o*3]-i[s*3],d=i[o*3+1]-i[s*3+1],u=i[o*3+2]-i[s*3+2];e+=Math.hypot(c*u-l*d,l*h-a*u,a*d-c*h)}return e/2}function ad(i,t,e="center"){lo(i,t,0,e)}function cd(i,t,e="center"){lo(i,t,1,e)}function lo(i,t,e,n){const s=[...t];if(s.length<2)return;let r=0,o=1/0,a=-1/0;for(const l of s){const h=i[l*2+e];r+=h,o=Math.min(o,h),a=Math.max(a,h)}const c=n==="min"?o:n==="max"?a:r/s.length;for(const l of s)i[l*2+e]=c}function ld(i,t){const e=[...t];if(e.length<3)return;let n=0,s=0;for(const d of e)n+=i[d*2],s+=i[d*2+1];n/=e.length,s/=e.length;let r=0,o=0,a=0;for(const d of e){const u=i[d*2]-n,f=i[d*2+1]-s;r+=u*u,o+=u*f,a+=f*f}const c=.5*Math.atan2(2*o,r-a),l=Math.cos(c),h=Math.sin(c);for(const d of e){const u=i[d*2]-n,f=i[d*2+1]-s,p=u*l+f*h;i[d*2]=n+l*p,i[d*2+1]=s+h*p}}function hd(i,t){if(t.length<4)return;const e=[];for(let s=0;s<t.length;s++){const r=t[s],o=t[(s+1)%t.length];e.push(Math.abs(i[o*2]-i[r*2])>=Math.abs(i[o*2+1]-i[r*2+1]))}let n=0;for(;n<t.length;){let s=n;for(;s+1<t.length&&e[s+1]===e[n];)s++;const r=[];for(let o=n;o<=s+1&&o<t.length+1;o++)r.push(t[o%t.length]);r.length>=2&&(e[n]?lo(i,r,1,"center"):lo(i,r,0,"center")),n=s+1}}function ud(i,t){if(t.length<2)return;let e=1/0,n=1/0,s=-1/0,r=-1/0;for(const a of t)for(const c of a)e=Math.min(e,i[c*2]),s=Math.max(s,i[c*2]),n=Math.min(n,i[c*2+1]),r=Math.max(r,i[c*2+1]);if(!Number.isFinite(e))return;const o=t.length-1;for(let a=0;a<t.length;a++){const c=t[a],l=o>0?n+(r-n)*a/o:n,h=c.length-1;for(let d=0;d<c.length;d++){const u=h>0?e+(s-e)*d/h:e;i[c[d]*2]=u,i[c[d]*2+1]=l}}}function sM(i,t){fd(i,t,0)}function rM(i,t){fd(i,t,1)}function fd(i,t,e){const n=[...t];if(!n.length)return;let s=1/0,r=-1/0;for(const a of n)s=Math.min(s,i[a*2+e]),r=Math.max(r,i[a*2+e]);const o=(s+r)/2;for(const a of n)i[a*2+e]=o*2-i[a*2+e]}function oM(i,t,e=1){const n=[...t];if(!n.length)return;let s=1/0,r=1/0,o=-1/0,a=-1/0;for(const d of n)s=Math.min(s,i[d*2]),o=Math.max(o,i[d*2]),r=Math.min(r,i[d*2+1]),a=Math.max(a,i[d*2+1]);const c=(s+o)/2,l=(r+a)/2,h=(e%4+4)%4;for(let d=0;d<h;d++)for(const u of n){const f=i[u*2]-c,p=i[u*2+1]-l;i[u*2]=c-p,i[u*2+1]=l+f}}function dd(i,t,e){const n=[...t].sort((o,a)=>o-a),s=new Set;let r=0;for(let o=0;o<n.length;o++){const a=n[o];if(s.has(a))continue;const c=[a];for(let d=o+1;d<n.length;d++){const u=n[d];if(s.has(u))continue;Math.hypot(i[a*2]-i[u*2],i[a*2+1]-i[u*2+1])<=e&&(c.push(u),s.add(u))}if(c.length<2)continue;let l=0,h=0;for(const d of c)l+=i[d*2],h+=i[d*2+1];l/=c.length,h/=c.length;for(const d of c)i[d*2]=l,i[d*2+1]=h;r+=c.length-1}return r}function pd(i,t,e){if(!t.length)return;let n=e;if(n===void 0){let s=0,r=0;for(const[o,a]of t)s+=i[o*2]+i[a*2],r+=2;n=r?s/r:0}for(const[s,r]of t)i[r*2]=n*2-i[s*2],i[r*2+1]=i[s*2+1]}function md(i,t,e,n){const s=t[0]-i[0],r=t[1]-i[1],o=n[0]-e[0],a=n[1]-e[1],c=s*s+r*r;if(c<1e-18)return{du:e[0]-i[0],dv:e[1]-i[1],angle:0,scale:1};const l=(o*s+a*r)/c,h=(a*s-o*r)/c,d=Math.hypot(l,h),u=Math.atan2(h,l),f=tl(i,i,{du:0,dv:0,angle:u,scale:d});return{du:e[0]-f[0],dv:e[1]-f[1],angle:u,scale:d}}function tl(i,t,e){const n=i[0]-t[0],s=i[1]-t[1],r=Math.cos(e.angle)*e.scale,o=Math.sin(e.angle)*e.scale;return[t[0]+n*r-s*o+e.du,t[1]+n*o+s*r+e.dv]}const me="map1";function el(){return{seams:new Set,pins:new Map,method:"lscm",base:null,packing:{marginTexels:8,textureSize:1024,allowRotate:!1,texelDensity:null},manual:new Map,autoSeamParams:{angle:65,useHardEdges:!0,useCreases:!0,usePolygroups:!0,symmetric:!1}}}function vc(i){const t=new Map;for(const[e,n]of i.manual)t.set(e,new Map([...n].map(([s,r])=>[s,[r[0],r[1]]])));return{seams:new Set(i.seams),pins:new Map([...i.pins].map(([e,n])=>[e,[n[0],n[1]]])),method:i.method,base:i.base?Float32Array.from(i.base):null,packing:{...i.packing},manual:t,autoSeamParams:{...i.autoSeamParams}}}function ti(i,t,e={}){const n=bs(i,t.seams),s=new Float32Array(i.faceCorners.length*2),r=[],o=[],a=[],c=[],l=t.base??i.uvSets.get(me);for(const u of n){const f=xo(i,u,t.seams);let p,v=t.method!=="none";if(t.method==="none"){p=new Float64Array(f.count*2);for(const g of u.corners){const m=f.localOf.get(g),x=Te(i,g);p[m*2]=l?l[x*2]:0,p[m*2+1]=l?l[x*2+1]:0}}else if(t.method==="projection")p=mc(f.positions,f.tri);else{const g=new Map;for(const m of u.corners){const x=t.pins.get(m);if(!x)continue;const y=f.localOf.get(m);y!==void 0&&g.set(y,[x[0],x[1]])}if(g.size<2)for(const[m,x]of Zf(f.positions,f.tri))g.has(m)||g.set(m,x);else v=!1;p=Kf(f.positions,f.tri,g),aM(p,f.count)||(p=mc(f.positions,f.tri)),t.pins.size<2&&jf(f.positions,f.tri,p)}v&&Jf(f.positions,f.tri,p),r.push(Qc(f.positions,f.tri,p)),o.push(p),a.push(f.tri),c.push(od(f.positions,f.tri));for(const g of u.corners){const m=f.localOf.get(g),x=Te(i,g);s[x*2]=p[m*2],s[x*2+1]=p[m*2+1]}}!e.skipPack&&t.method!=="none"&&(sd(o,a,c,t.packing.texelDensity),cM(n,o,s,i,t.packing));for(const u of n){const f=t.manual.get(u.fingerprint);if(f)for(const[p,v]of f){const g=Te(i,p);g<0||g*2+1>=s.length||(s[g*2]+=v[0],s[g*2+1]+=v[1])}}i.uvSets.set(me,s);let h=1,d=0;for(const u of r)h=Math.max(h,u.maxStretch),d+=u.meanAngleError;return{charts:n,distortion:r,maxStretch:h,meanAngleError:r.length?d/r.length:0}}function aM(i,t){if(!t)return!0;let e=1/0,n=1/0,s=-1/0,r=-1/0;for(let c=0;c<t;c++){const l=i[c*2],h=i[c*2+1];if(!Number.isFinite(l)||!Number.isFinite(h))return!1;e=Math.min(e,l),s=Math.max(s,l),n=Math.min(n,h),r=Math.max(r,h)}const o=s-e,a=r-n;return o>1e-9&&a>1e-9}function cM(i,t,e,n,s){if(!i.length)return;const r=[],o=[];t.forEach(c=>{let l=1/0,h=1/0,d=-1/0,u=-1/0;for(let f=0;f<c.length/2;f++)l=Math.min(l,c[f*2]),d=Math.max(d,c[f*2]),h=Math.min(h,c[f*2+1]),u=Math.max(u,c[f*2+1]);o.push([l,h]),r.push({w:d-l,h:u-h})});const a=id(r,nd(s),s.allowRotate);i.forEach((c,l)=>{const h=a[l],[d,u]=o[l];for(const f of c.corners){const p=Te(n,f),v=e[p*2]-d,g=e[p*2+1]-u,m=h.rotated?g:v,x=h.rotated?r[l].w-v:g;e[p*2]=h.x+m*h.scale,e[p*2+1]=h.y+x*h.scale}})}function nl(i,t=1e-6){const e=new Set,n=i.uvSets.get(me);if(!n)return e;const s=new Map;for(let r=0;r<i.faceCount;r++){const o=i.faceSize(r);for(let a=0;a<o;a++){const c=sl(i,r,a),l=s.get(c);l?l.push([r,a]):s.set(c,[[r,a]])}}for(const[r,o]of s){if(o.length!==2)continue;const[a,c]=r.split("_").map(Number),l=(d,u)=>{const p=i.faceVerts(d).indexOf(u);if(p<0)return null;const v=i.faceOffsets[d]+p;return[n[v*2],n[v*2+1]]};let h=!1;for(const d of[a,c]){const u=l(o[0][0],d),f=l(o[1][0],d);!u||!f||(Math.abs(u[0]-f[0])>t||Math.abs(u[1]-f[1])>t)&&(h=!0)}h&&e.add(r)}return e}function il(i){const t=el(),e=i.uvSets.get(me);if(!e)return t.method="projection",t;t.method="none",t.base=Float32Array.from(e);for(const n of nl(i))t.seams.add(n);return t}function gd(i,t){const e=il(t);return e.method=i.method,e.packing={...i.packing},e.autoSeamParams={...i.autoSeamParams},e}function xc(i,t,e){const n=new Set(e);if(!n.size)return;const s=new Map;for(let r=0;r<i.faceCount;r++){const o=i.faceSize(r);for(let a=0;a<o;a++){const c=sl(i,r,a);if(!n.has(c))continue;const l=s.get(c);l?l.push([r,a]):s.set(c,[[r,a]])}}for(const[r,o]of s){if(o.length!==2)continue;const[a,c]=r.split("_").map(Number);for(const l of[a,c]){const h=[];for(const[f]of o){const p=i.faceVerts(f).indexOf(l);p>=0&&h.push(i.faceOffsets[f]+p)}if(h.length!==2)continue;const d=(t[h[0]*2]+t[h[1]*2])/2,u=(t[h[0]*2+1]+t[h[1]*2+1])/2;for(const f of h)t[f*2]=d,t[f*2+1]=u}}}function Te(i,t){const[e,n]=Zs(t);return e<0||e>=i.faceCount?-1:i.faceOffsets[e]+n}function vd(i,t,e){const n=i.manual.get(t)??new Map;for(const[s,r]of e){const o=n.get(s)??[0,0];n.set(s,[o[0]+r[0],o[1]+r[1]])}i.manual.set(t,n)}function xd(i,t){if(i.method==="none"){const a=t.uvSets.get(me);if(a){i.base=Float32Array.from(a),i.manual.clear();for(const h of nl(t))i.seams.add(h);for(const h of[...i.pins.keys()]){const[d,u]=Zs(h);(d<0||d>=t.faceCount||u>=t.faceSize(d))&&i.pins.delete(h)}let c=0;const l=new Set;for(const[h,d]of t.edges())l.add(St(h,d));for(const h of[...i.seams])l.has(h)||(i.seams.delete(h),c++);return{droppedSeams:c,droppedIslands:0,rebased:!0}}}const e=new Set;for(const[a,c]of t.edges())e.add(St(a,c));let n=0;for(const a of[...i.seams])e.has(a)||(i.seams.delete(a),n++);for(const a of[...i.pins.keys()]){const[c,l]=Zs(a);(c<0||c>=t.faceCount||l>=t.faceSize(c))&&i.pins.delete(a)}const s=bs(t,i.seams),r=new Set(s.map(a=>a.fingerprint));let o=0;for(const a of[...i.manual.keys()])r.has(a)||(i.manual.delete(a),o++);return{droppedSeams:n,droppedIslands:o,rebased:!1}}function sl(i,t,e){const n=i.faceVerts(t);return St(n[e],n[(e+1)%n.length])}function _d(i){return{seams:[...i.seams].sort(),pins:[...i.pins].sort((t,e)=>t[0]<e[0]?-1:1).map(([t,e])=>[t,e[0],e[1]]),method:i.method,base:i.base?[...i.base]:null,packing:{...i.packing},manual:[...i.manual].sort((t,e)=>t[0]<e[0]?-1:1).map(([t,e])=>[t,[...e].sort((n,s)=>n[0]<s[0]?-1:1).map(([n,s])=>[n,s[0],s[1]])]),autoSeamParams:{...i.autoSeamParams}}}function Md(i){if(!i)return null;const t=el();for(const e of i.seams??[])t.seams.add(e);for(const[e,n,s]of i.pins??[])t.pins.set(e,[n,s]);if(i.method&&(t.method=i.method),i.base&&(t.base=Float32Array.from(i.base)),i.packing){const e=i.packing;t.packing={...t.packing,...i.packing},e.marginTexels===void 0&&typeof e.margin=="number"&&(t.packing.marginTexels=Math.max(1,Math.round(e.margin*1024)),t.packing.textureSize=1024),e.allowRotate===void 0&&(t.packing.allowRotate=!1),delete t.packing.margin}i.autoSeamParams&&(t.autoSeamParams={...t.autoSeamParams,...i.autoSeamParams});for(const[e,n]of i.manual??[])t.manual.set(e,new Map(n.map(([s,r,o])=>[s,[r,o]])));return t}function yd(i,t){const e=i.uvSets.get(me);if(!e)return null;const n=bs(i,t),s=[],r=[],o=[],a=new Map,c=new Map;n.forEach((p,v)=>{for(const x of p.faces)c.set(x,v);const g=xo(i,p,t),m=s.length;for(let x=0;x<g.count;x++)s.push([]),r.push(0,0),o.push(v);for(const x of p.corners){const y=m+g.localOf.get(x);s[y].push(x),a.set(x,y);const _=Te(i,x);r[y*2]=e[_*2],r[y*2+1]=e[_*2+1]}});const l=[],h=[],d=[],u=[],f=new Map;for(let p=0;p<i.faceCount;p++){const v=i.faceVerts(p),g=c.get(p)??0;for(let m=0;m<v.length;m++){const x=a.get(Vn(p,m)),y=a.get(Vn(p,(m+1)%v.length));if(x===void 0||y===void 0)continue;const _=`${Math.min(x,y)}_${Math.max(x,y)}`,S=f.get(_);if(S!==void 0){u[S].push(p);continue}f.set(_,l.length),l.push([x,y]),h.push(g),u.push([p]);const w=v[m],T=v[(m+1)%v.length];d.push(`${Math.min(w,T)}_${Math.max(w,T)}`)}}return{charts:n,vertexCorners:s,vertexUv:Float32Array.from(r),vertexChart:Int32Array.from(o),edges:l,edgeChart:Int32Array.from(h),edgeKeys:d,edgeFaces:u,cornerToVertex:a,chartOfFace:c}}function rr(i){const t=[];for(let e=0;e<i.vertexUv.length/2;e++)t.push([]);return i.edges.forEach(([e,n],s)=>{t[e]?.push(s),t[n]?.push(s)}),t}function ho(i,t){if(!i.edges[t])return{edges:[],closed:!1};const e=rr(i),n=(i.edgeFaces[t]?.length??0)<2,s=(u,f)=>{const p=e[f]??[];let v;if(n)v=p.filter(y=>y!==u&&(i.edgeFaces[y]?.length??0)<2);else{if(p.length!==4)return null;const y=i.edgeFaces[u]??[];v=p.filter(_=>_!==u&&!(i.edgeFaces[_]??[]).some(S=>y.includes(S)))}if(v.length!==1)return null;const g=v[0],[m,x]=i.edges[g];return{edge:g,next:m===f?x:m}},[r,o]=i.edges[t],a=new Set([t]),c=[t];let l=!1,h=t,d=o;for(let u=0;u<1e6;u++){const f=s(h,d);if(!f)break;if(a.has(f.edge)){l=f.edge===t;break}a.add(f.edge),c.push(f.edge),h=f.edge,d=f.next}if(!l){h=t,d=r;for(let u=0;u<1e6;u++){const f=s(h,d);if(!f||a.has(f.edge))break;a.add(f.edge),c.unshift(f.edge),h=f.edge,d=f.next}}return{edges:c,closed:l}}function bd(i,t,e){const n=i.edges.indexOf(t),s=i.edges.indexOf(e);if(n<0||s<0)return null;const[r,o]=n<s?[n,s]:[s,n],a=i.edges.slice(r,o+1);if(!i.closed)return a;const c=[...i.edges.slice(o),...i.edges.slice(0,r+1)];return a.length<=c.length?a:c}function rl(i,t){if(!t.edges.length)return[];const e=i.edges[t.edges[0]];if(t.edges.length===1)return[e[0],e[1]];const n=i.edges[t.edges[1]];let s=e[0]===n[0]||e[0]===n[1]?e[1]:e[0];const r=[s];for(const o of t.edges){const[a,c]=i.edges[o];s=a===s?c:a,r.push(s)}return r}function lM(i,t){const e=[];for(let n=0;n<i.edges.length;n++)i.edgeChart[n]===t&&e.push(n);return e}function ol(i,t){const e=[];for(let n=0;n<i.vertexChart.length;n++)i.vertexChart[n]===t&&e.push(n);return e}function Sd(i,t,e){if(t===e)return[t];const n=rr(i);for(const s of n[t]??[]){const r=ho(i,s),o=rl(i,r),a=o.indexOf(t),c=o.indexOf(e);if(a<0||c<0)continue;const[l,h]=a<c?[a,c]:[c,a],d=o.slice(l,h+1);if(!r.closed)return d;const u=[...o.slice(h),...o.slice(0,l+1)];return d.length<=u.length?d:u}return null}function Zr(i,t,e){const n=rr(i),s=i.edges[e];if(!s)return{verts:[t],edges:[]};let r=s[0]===t?s[1]:s[0];const o=[t,r],a=[e],c=new Set([e]);for(let l=0;l<1e6;l++){const h=i.edgeFaces[a[a.length-1]]??[],d=(n[r]??[]).filter(v=>!c.has(v)&&!(i.edgeFaces[v]??[]).some(g=>h.includes(g)));if(d.length!==1)break;const u=d[0],[f,p]=i.edges[u];if(r=f===r?p:f,o.includes(r))break;c.add(u),a.push(u),o.push(r)}return{verts:o,edges:a}}function wd(i,t){if(!(i.charts[t]?.faces??[]).length)return null;const n=rr(i),s=ol(i,t);if(s.length<4)return null;const r=new Set(s),o=p=>(n[p]??[]).filter(v=>i.edgeChart[v]===t),a=s.find(p=>o(p).length===2);if(a===void 0)return null;const[c,l]=o(a),h=Zr(i,a,c),d=Zr(i,a,l);if(h.verts.length<2||d.verts.length<2)return null;const u=[h.verts];for(let p=1;p<d.verts.length;p++){const v=d.verts[p],g=i.edgeFaces[d.edges[p-1]]??[],m=o(v).filter(y=>y!==d.edges[p-1]&&(i.edgeFaces[y]??[]).some(_=>g.includes(_)));if(m.length!==1)return null;const x=Zr(i,v,m[0]);if(x.verts.length!==h.verts.length)return null;u.push(x.verts)}const f=new Set;for(const p of u)for(const v of p)f.add(v);if(f.size!==s.length)return null;for(const p of f)if(!r.has(p))return null;return u}function jr(i,t,e){const n=i.vertexNeighbors(),s=i.edgeFaceMap(),r=new Set,o=(h,d)=>{const u=n.get(d);if(!u||u.length!==4)return-1;const f=s.get(St(h,d))??[];for(const p of u){if(p===h)continue;if(!(s.get(St(d,p))??[]).some(g=>f.includes(g)))return p}return-1},a=[],c=(h,d,u,f)=>{let p=!0;for(let v=0;v<1e5;v++){const g=St(h,d);if(r.has(g)&&!p)return!0;p&&f||(r.add(g),u?a.push([h,d]):a.unshift([d,h])),p=!1;const m=o(h,d);if(m<0)return!1;h=d,d=m}return!1},l=c(t,e,!0,!1);return l||c(e,t,!1,!0),{edges:a,closed:l}}function Ed(i,t,e){const n=i.edgeFaceMap(),s=new Set,r=[],o=[],a=(d,u,f,p)=>{for(let v=0;v<1e5;v++){const m=(n.get(St(d,u))??[]).find(w=>w!==f);if(m===void 0)return!1;if(s.has(m))return!0;const x=i.faceVerts(m);if(x.length!==4)return!1;s.add(m);let y=-1;for(let w=0;w<4;w++)if(x[w]===d&&x[(w+1)%4]===u){y=w;break}if(y<0){for(let w=0;w<4;w++)if(x[w]===u&&x[(w+1)%4]===d){y=w;break}}if(y<0)return!1;const _=x[(y+2)%4],S=x[(y+3)%4];p.push([S,_]),f=m,d=S,u=_}return!1},c=n.get(St(t,e))??[],l=a(t,e,-1,r);if(!l){const d=c.find(u=>s.has(u));a(e,t,d??-1,o)}const h=[...o.reverse(),[t,e],...r];if(l&&h.length>1){const d=h[h.length-1];St(d[0],d[1])===St(t,e)&&h.pop()}return{edges:h,closed:l}}function _c(i,t,e){const n=i.edges.map(c=>St(c[0],c[1]));let s=n.indexOf(t),r=n.indexOf(e);if(s<0||r<0)return null;s>r&&([s,r]=[r,s]);const o=i.edges.slice(s,r+1);if(!i.closed)return o;const a=[...i.edges.slice(r),...i.edges.slice(0,s+1)];return a.length<o.length?a:o}function al(i,t){const e=i.edgeFaceMap(),n=new Set([t]),s=[t],r=[];for(;s.length;){const o=s.pop();r.push(o);const a=i.faceVerts(o);for(let c=0;c<a.length;c++){const l=e.get(St(a[c],a[(c+1)%a.length]))??[];for(const h of l)n.has(h)||(n.add(h),s.push(h))}}return r}function Td(i,t){const e=new Set;for(const n of al(i,t))for(const s of i.faceVerts(n))e.add(s);return Array.from(e)}function Cd(i){const t=[];for(const[e,n]of i.edges)t.includes(e)||t.push(e),t.includes(n)||t.push(n);return t}function Ad(i){const t=[];for(const[e,n]of i.edgeFaceMap())if(n.length===1){const[s,r]=e.split("_").map(Number);t.push([s,r])}return t}function Mc(i,t){const e=i.vertexNeighbors(),n=new Set(t);for(const s of Array.from(n))for(const r of e.get(s)??[])n.add(r);return Array.from(n)}function yc(i,t){const e=i.vertexNeighbors(),n=new Set(t);return Array.from(n).filter(s=>(e.get(s)??[]).every(r=>n.has(r)))}function Rd(i,t){const e=i.edgeFaceMap(),n=new Set(t);for(const s of Array.from(n)){const r=i.faceVerts(s);for(let o=0;o<r.length;o++)for(const a of e.get(St(r[o],r[(o+1)%r.length]))??[])n.add(a)}return Array.from(n)}function Pd(i,t){const e=i.edgeFaceMap(),n=new Set(t);return Array.from(n).filter(s=>{const r=i.faceVerts(s);for(let o=0;o<r.length;o++)for(const a of e.get(St(r[o],r[(o+1)%r.length]))??[])if(!n.has(a))return!1;return!0})}function hM(i){let t=0,e=0;for(const n of i)t+=n[0],e+=n[1];return[t/i.length,e/i.length]}class cl{vertexCount;faceCount;edgeList;edgeBase;faceBase;outCount;faceVerts=[];vertexFaces=[];neighbors=[];edgeIndex=new Map;edgeFaces=[];edgeSharp;sharpAt=[];constructor(t){this.vertexCount=t.vertexCount,this.faceCount=t.faceCount,this.edgeList=t.edges(),this.edgeBase=this.vertexCount,this.faceBase=this.vertexCount+this.edgeList.length,this.outCount=this.faceBase+this.faceCount;for(let r=0;r<this.faceCount;r++)this.faceVerts.push(t.faceVerts(r));const e=t.vertexFaces(),n=t.vertexNeighbors();for(let r=0;r<this.vertexCount;r++)this.vertexFaces.push(e.get(r)??[]),this.neighbors.push(n.get(r)??[]),this.sharpAt.push([]);const s=t.edgeFaceMap();this.edgeSharp=new Float64Array(this.edgeList.length);for(let r=0;r<this.edgeList.length;r++){const[o,a]=this.edgeList[r],c=St(o,a);this.edgeIndex.set(c,r);const l=s.get(c)??[];this.edgeFaces.push(l),this.edgeSharp[r]=Math.min(1,t.getCrease(o,a));const h=l.length===1?1:this.edgeSharp[r];h>0&&(this.sharpAt[o].push({other:a,sharpness:h}),this.sharpAt[a].push({other:o,sharpness:h}))}}edgePointOf(t,e){const n=this.edgeIndex.get(St(t,e));return n===void 0?-1:this.edgeBase+n}affected(t){const e=new Set,n=new Set;for(const s of t){if(s<0||s>=this.vertexCount)continue;const r=this.vertexFaces[s];r.length||n.add(s);for(const o of r)e.add(o)}for(const s of e){n.add(this.faceBase+s);const r=this.faceVerts[s];for(let o=0;o<r.length;o++){n.add(r[o]);const a=this.edgeIndex.get(St(r[o],r[(o+1)%r.length]));a!==void 0&&n.add(this.edgeBase+a)}}return n}positions(t,e,n){const s=new Float64Array(this.faceCount*3),r=new Uint8Array(this.faceCount),o=d=>{if(!r[d]){const u=t.faceCenter(d);s[d*3]=u[0],s[d*3+1]=u[1],s[d*3+2]=u[2],r[d]=1}return d*3},a=d=>{const u=o(d),f=(this.faceBase+d)*3;e[f]=s[u],e[f+1]=s[u+1],e[f+2]=s[u+2]},c=d=>{const[u,f]=this.edgeList[d],p=t.getPosition(u),v=t.getPosition(f),g=[(p[0]+v[0])/2,(p[1]+v[1])/2,(p[2]+v[2])/2],m=(this.edgeBase+d)*3,x=this.edgeFaces[d];if(x.length!==2){e[m]=g[0],e[m+1]=g[1],e[m+2]=g[2];return}const y=o(x[0]),_=o(x[1]),S=this.edgeSharp[d];for(let w=0;w<3;w++){const T=(p[w]+v[w]+s[y+w]+s[_+w])/4;e[m+w]=T+(g[w]-T)*S}},l=d=>{const u=t.getPosition(d),f=this.vertexFaces[d],p=f.length,v=this.neighbors[d],g=d*3;let m;if(!p||!v.length)m=[u[0],u[1],u[2]];else{let S=0,w=0,T=0;for(const A of f){const L=o(A);S+=s[L],w+=s[L+1],T+=s[L+2]}S/=p,w/=p,T/=p;let M=0,E=0,P=0;for(const A of v){const L=t.getPosition(A);M+=(u[0]+L[0])/2,E+=(u[1]+L[1])/2,P+=(u[2]+L[2])/2}M/=v.length,E/=v.length,P/=v.length,m=[(S+2*M+(p-3)*u[0])/p,(w+2*E+(p-3)*u[1])/p,(T+2*P+(p-3)*u[2])/p]}const x=this.sharpAt[d];if(x.length<2){e[g]=m[0],e[g+1]=m[1],e[g+2]=m[2];return}let y;if(x.length>=3)y=[u[0],u[1],u[2]];else{let S=0,w=0,T=0;for(const M of x){const E=t.getPosition(M.other);S+=(u[0]+E[0])/2,w+=(u[1]+E[1])/2,T+=(u[2]+E[2])/2}y=[(S+6*u[0])/8,(w+6*u[1])/8,(T+6*u[2])/8]}let _=0;for(const S of x)_+=S.sharpness;_=Math.min(1,_/x.length);for(let S=0;S<3;S++)e[g+S]=m[S]+(y[S]-m[S])*_},h=d=>{d>=this.faceBase?a(d-this.faceBase):d>=this.edgeBase?c(d-this.edgeBase):l(d)};if(n){for(const d of n)d>=0&&d<this.outCount&&h(d);return}for(let d=0;d<this.faceCount;d++)a(d);for(let d=0;d<this.edgeList.length;d++)c(d);for(let d=0;d<this.vertexCount;d++)l(d)}build(t){const e=new Float32Array(this.outCount*3);this.positions(t,e);const n=new ee({weld:!1});for(let r=0;r<this.outCount;r++)n.vertex(e[r*3],e[r*3+1],e[r*3+2]);for(let r=0;r<this.faceCount;r++){const o=this.faceVerts[r],a=Ue(t,r),c=t.polygroup[r],l=t.materialId[r],h=o.length,d=new Map;if(a)for(const[u,f]of a)d.set(u,hM(f));for(let u=0;u<h;u++){const f=o[u],p=o[(u+1)%h],v=o[(u-1+h)%h];let g;if(a){g=new Map;for(const[m,x]of a){const y=x[u]??[0,0],_=x[(u+1)%h]??[0,0],S=x[(u-1+h)%h]??[0,0];g.set(m,[y,[(y[0]+_[0])/2,(y[1]+_[1])/2],d.get(m),[(S[0]+y[0])/2,(S[1]+y[1])/2]])}}n.face([f,this.edgePointOf(f,p),this.faceBase+r,this.edgePointOf(v,f)],{uv:g,polygroup:c,materialId:l})}}const s=n.build();for(const[r,o]of t.crease){const a=o-1;if(a<=0)continue;const[c,l]=r.split("_").map(Number),h=this.edgePointOf(c,l);h<0||(s.setCrease(c,h,a),s.setCrease(h,l,a))}for(const[r,o]of t.cornerSharp){const a=o-1;a>0&&s.cornerSharp.set(r,a)}return s}}function Ld(i){return new cl(i).build(i)}function Id(i,t){let e=i;for(let n=0;n<t;n++)e=Ld(e);return e}class ll{vertexCount;vertexFaces=[];faceVerts=[];reference;scratch=new Float32Array(3);constructor(t){this.vertexCount=t.vertexCount;for(let s=0;s<t.faceCount;s++)this.faceVerts.push(t.faceVerts(s));const e=t.vertexFaces(),n=t.vertexNeighbors();this.reference=new Int32Array(this.vertexCount).fill(-1);for(let s=0;s<this.vertexCount;s++){this.vertexFaces.push(e.get(s)??[]);let r=-1;for(const o of n.get(s)??[])(r<0||o<r)&&(r=o);this.reference[s]=r}}affected(t){const e=new Set,n=new Set;for(const s of t)if(!(s<0||s>=this.vertexCount)){n.add(s);for(const r of this.vertexFaces[s])e.add(r)}for(const s of e)for(const r of this.faceVerts[s])n.add(r);return n}write(t,e,n){const s=t.positions,r=this.scratch;r[0]=0,r[1]=0,r[2]=0;for(const g of this.vertexFaces[e]){const m=t.faceNormal(g);r[0]+=m[0],r[1]+=m[1],r[2]+=m[2]}let o=r[0],a=r[1],c=r[2];const l=Math.hypot(o,a,c);l<1e-12?(o=0,a=0,c=1):(o/=l,a/=l,c/=l);const h=this.reference[e];let d=0,u=0,f=0;if(h>=0){d=s[h*3]-s[e*3],u=s[h*3+1]-s[e*3+1],f=s[h*3+2]-s[e*3+2];const g=d*o+u*a+f*c;d-=o*g,u-=a*g,f-=c*g}let p=Math.hypot(d,u,f);if(p<1e-12){const g=Math.abs(o)<.9?1:0,m=Math.abs(o)<.9?0:1;d=m*c,u=-g*c,f=g*a-m*o,p=Math.hypot(d,u,f)||1}d/=p,u/=p,f/=p;const v=e*9;n[v]=d,n[v+1]=u,n[v+2]=f,n[v+3]=a*f-c*u,n[v+4]=c*d-o*f,n[v+5]=o*u-a*d,n[v+6]=o,n[v+7]=a,n[v+8]=c}build(t){const e=new Float32Array(this.vertexCount*9);for(let n=0;n<this.vertexCount;n++)this.write(t,n,e);return e}}function hl(i){return new ll(i).build(i)}function Ud(i,t,e=hl(i)){if(i.vertexCount!==t.vertexCount)throw new Error("デルタを取るには頂点数が一致している必要があります");const n=i.vertexCount,s=new Float32Array(n*3);for(let r=0;r<n;r++){const o=t.positions[r*3]-i.positions[r*3],a=t.positions[r*3+1]-i.positions[r*3+1],c=t.positions[r*3+2]-i.positions[r*3+2],l=r*9;s[r*3]=o*e[l]+a*e[l+1]+c*e[l+2],s[r*3+1]=o*e[l+3]+a*e[l+4]+c*e[l+5],s[r*3+2]=o*e[l+6]+a*e[l+7]+c*e[l+8]}return s}function bc(i,t,e,n,s){const r=o=>{const a=o*9,c=n[o*3]??0,l=n[o*3+1]??0,h=n[o*3+2]??0;i.positions[o*3]=t.positions[o*3]+e[a]*c+e[a+3]*l+e[a+6]*h,i.positions[o*3+1]=t.positions[o*3+1]+e[a+1]*c+e[a+4]*l+e[a+7]*h,i.positions[o*3+2]=t.positions[o*3+2]+e[a+2]*c+e[a+5]*l+e[a+8]*h};if(s){for(const o of s)r(o);return}for(let o=0;o<t.vertexCount;o++)r(o)}function uM(i,t){const e=i.clone();return bc(e,i,hl(i),t),e}function fM(i,t){const e=new Dd(i);for(let n=0;n<t.length;n++)e.divide(),e.deltas[n]=t[n];return e.levels()}class Dd{constructor(t){this.baseMesh=t}deltas=[];stack=null;get base(){return this.baseMesh}get levelCount(){return this.deltas.length}divide(){this.deltas.push(null),this.stack=null}setBase(t,e){const n=t.vertexCount===this.baseMesh.vertexCount&&t.faceCount===this.baseMesh.faceCount;if(this.baseMesh=t,!e||!this.stack||!n){this.stack=null;return}this.updateFrom(t,e)}updateFrom(t,e){const n=this.stack;if(!n)return;let s=t,r=e;for(let o=0;o<n.length;o++){const a=n[o],c=a.plan.affected(r);a.plan.positions(s,a.smooth.positions,c);const l=this.deltas[o];if(l&&a.frames){const h=a.framePlan.affected(c);for(const d of h)a.framePlan.write(a.smooth,d,a.frames);bc(a.mesh,a.smooth,a.frames,l,h),r=h}else{for(const h of c)a.mesh.positions[h*3]=a.smooth.positions[h*3],a.mesh.positions[h*3+1]=a.smooth.positions[h*3+1],a.mesh.positions[h*3+2]=a.smooth.positions[h*3+2];r=c}s=a.mesh}}rebuild(){const t=[];let e=this.baseMesh;for(let n=0;n<this.deltas.length;n++){const s=new cl(e),r=s.build(e),o=new ll(r),a=this.deltas[n],c=a?o.build(r):null,l=r.clone();a&&c&&bc(l,r,c,a),t.push({plan:s,smooth:r,framePlan:o,frames:c,mesh:l}),e=l}return this.stack=t,t}ensure(){return this.stack??this.rebuild()}levels(){return[this.baseMesh,...this.ensure().map(t=>t.mesh)]}level(t){const e=this.levels();return e[Math.max(0,Math.min(e.length-1,t))]}smoothLevel(t){if(t<1||t>this.deltas.length)throw new Error(`レベル ${t} はありません`);return this.ensure()[t-1].smooth}sculpt(t,e){if(t<1||t>this.deltas.length)throw new Error(`レベル ${t} はありません`);const n=this.ensure()[t-1],s=n.frames??n.framePlan.build(n.smooth);this.deltas[t-1]=Ud(n.smooth,e,s),this.stack=null}dropAbove(t){this.deltas.length=Math.max(0,t),this.stack=null}}function Fr(i,t){return i^=t&255,i=Math.imul(i,16777619),i^=t>>>8&255,i=Math.imul(i,16777619),i^=t>>>16&255,i=Math.imul(i,16777619),i^=t>>>24&255,i=Math.imul(i,16777619),i>>>0}function ul(i){let t=2166136261;t=Fr(t,i.vertexCount),t=Fr(t,i.faceCount);for(let e=0;e<i.faceOffsets.length;e++)t=Fr(t,i.faceOffsets[e]);for(let e=0;e<i.faceCorners.length;e++)t=Fr(t,i.faceCorners[e]);return t.toString(16).padStart(8,"0")}function dM(i,t){if(i.vertexCount!==t.vertexCount)return{same:!1,reason:"vertexCount"};if(i.faceCount!==t.faceCount)return{same:!1,reason:"faceCount"};if(i.faceCorners.length!==t.faceCorners.length)return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceOffsets.length;e++)if(i.faceOffsets[e]!==t.faceOffsets[e])return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceCorners.length;e++)if(i.faceCorners[e]!==t.faceCorners[e])return{same:!1,reason:"faceOrder"};return{same:!0}}function fl(){return{position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]}}function ei(i){const[t,e,n]=i.position,[s,r,o,a]=i.rotation,[c,l,h]=i.scale;return{position:[t,e,n],rotation:[s,r,o,a],scale:[c,l,h]}}class uo{id;name;kind;parametric;params;transform;mesh;multires=[];sculptLayers=[];paintLayers=[];activeLevel=0;visible=!0;locked=!1;exportedTopologyHash=null;uv=null;constructor(t,e,n){this.id=e,this.kind=t;const s=Sn[t];this.name=n??(s?s.en.replace(/\s/g,""):"mesh")+e,this.parametric=!!s,this.params=oo(t),this.transform=fl(),this.mesh=s?s.build(this.params):zi.empty()}rebuild(){if(!this.parametric)return;const t=Sn[this.kind];t&&(this.mesh=t.build(this.params))}markTopologyChanged(){const t=this.multires.length,e=this.sculptLayers.length;this.parametric=!1,this.multires=[],this.sculptLayers=[],this.activeLevel=0;const n=this.uv?xd(this.uv,this.mesh):{droppedSeams:0,droppedIslands:0,rebased:!1};return{droppedLevels:t,droppedLayers:e,...n}}topologyHash(){return ul(this.mesh)}hasUv(){return this.mesh.uvSets.size>0}}class dl{objects=[];settings={};cameraBookmarks=[];nextId=1;newId(){return String(this.nextId++)}addObject(t){const e=new uo(t,this.newId());return this.objects.push(e),e}addMesh(t,e){const n=new uo("mesh",this.newId(),e);return n.parametric=!1,n.mesh=t,this.objects.push(n),n}remove(t){const e=this.objects.indexOf(t);e>=0&&this.objects.splice(e,1)}find(t){return this.objects.find(e=>e.id===t)}syncIdCounter(){let t=0;for(const e of this.objects){const n=Number(e.id);Number.isFinite(n)&&n>t&&(t=n)}this.nextId=t+1}stats(){let t=0,e=0,n=0;for(const s of this.objects){const r=s.mesh.stats();t+=r.vertices,e+=r.faces,n+=r.triangles}return{objects:this.objects.length,vertices:t,faces:e,triangles:n}}}function Nd(i){const t=[],e=[],n=[];let s=null,r="mesh",o=new Map,a=!1,c=0;const l=new Map,h=()=>{s&&s.faceCount>0&&n.push({name:r,mesh:s.build()}),s=null,o=new Map,a=!1},d=()=>(s||(s=new ee({weld:!1})),s);for(const u of i.split(/\r?\n/)){const f=u.trim();if(!f||f.startsWith("#"))continue;const p=f.split(/\s+/),v=p[0];if(v==="v")t.push([Number(p[1]),Number(p[2]),Number(p[3])]);else if(v==="vt")e.push([Number(p[1]),Number(p[2]??0)]);else if(v==="o")h(),r=p.slice(1).join("_")||"mesh";else if(v==="g"){const g=p.slice(1).join("_")||"default";let m=l.get(g);m===void 0&&(m=l.size,l.set(g,m)),c=m,r==="mesh"&&!s&&(r=g)}else if(v==="f"){const g=d(),m=[],x=[];for(let y=1;y<p.length;y++){const _=p[y].split("/");let S=parseInt(_[0],10);if(!Number.isFinite(S))continue;S<0&&(S=t.length+S+1);let w=o.get(S);if(w===void 0){const M=t[S-1];if(!M)continue;w=g.vertex(M[0],M[1],M[2]),o.set(S,w)}if(m.includes(w))continue;m.push(w);let T=_[1]?parseInt(_[1],10):NaN;if(Number.isFinite(T)){T<0&&(T=e.length+T+1);const M=e[T-1];M?(x.push(M),a=!0):x.push([0,0])}else x.push([0,0])}m.length>=3&&g.face(m,{uv:a?new Map([["map1",x]]):void 0,polygroup:c})}}return h(),n}function Fd(i){const t=["# macbeth"];let e=1,n=1;for(const s of i){const{mesh:r}=s;t.push(`o ${s.name.replace(/\s+/g,"_")}`);for(let l=0;l<r.vertexCount;l++){const h=r.getPosition(l),d=s.toWorld?s.toWorld(h[0],h[1],h[2]):h;t.push(`v ${d[0].toFixed(6)} ${d[1].toFixed(6)} ${d[2].toFixed(6)}`)}const o=r.uvSets.get("map1")??r.uvSets.values().next().value??null;if(o)for(let l=0;l<r.cornerCount;l++)t.push(`vt ${o[l*2].toFixed(6)} ${o[l*2+1].toFixed(6)}`);const a=new Map;for(let l=0;l<r.faceCount;l++){const h=r.polygroup[l],d=a.get(h);d?d.push(l):a.set(h,[l])}const c=a.size<=1;for(const[l,h]of a){c||t.push(`g group${l}`);for(const d of h){const u=[];for(let f=r.faceOffsets[d];f<r.faceOffsets[d+1];f++){const p=r.faceCorners[f]+e;u.push(o?`${p}/${f+n}`:`${p}`)}t.push(`f ${u.join(" ")}`)}}e+=r.vertexCount,o&&(n+=r.cornerCount)}return t.join(`
`)+`
`}function pM(i,t){const e=i.faceNormals(),n=i.uvSets.get(me)??null,s=Math.cos(Math.max(0,Math.min(180,t))*Math.PI/180),r=new Float32Array(i.vertexCount*3);for(let u=0;u<i.faceCount;u++)for(let f=i.faceOffsets[u];f<i.faceOffsets[u+1];f++){const p=i.faceCorners[f];r[p*3]+=e[u*3],r[p*3+1]+=e[u*3+1],r[p*3+2]+=e[u*3+2]}for(let u=0;u<i.vertexCount;u++){const f=Math.hypot(r[u*3],r[u*3+1],r[u*3+2])||1;r[u*3]/=f,r[u*3+1]/=f,r[u*3+2]/=f}const o=[],a=[],c=[],l=[],h=new Map,d=u=>{const f=mM(i,u),p=i.faceCorners[u],m=e[f*3]*r[p*3]+e[f*3+1]*r[p*3+1]+e[f*3+2]*r[p*3+2]<s?[e[f*3],e[f*3+1],e[f*3+2]]:[r[p*3],r[p*3+1],r[p*3+2]],x=n?[n[u*2],n[u*2+1]]:[0,0],y=`${p}|${m[0].toFixed(4)},${m[1].toFixed(4)},${m[2].toFixed(4)}|${x[0].toFixed(6)},${x[1].toFixed(6)}`,_=h.get(y);if(_!==void 0)return _;const S=o.length/3;return o.push(i.positions[p*3],i.positions[p*3+1],i.positions[p*3+2]),a.push(m[0],m[1],m[2]),c.push(x[0],x[1]),h.set(y,S),S};for(let u=0;u<i.faceCount;u++){const f=i.faceOffsets[u],p=i.faceOffsets[u+1];for(let v=f+1;v<p-1;v++)l.push(d(f),d(v),d(v+1))}return{position:Float32Array.from(o),normal:Float32Array.from(a),uv:n?Float32Array.from(c):null,index:Uint32Array.from(l)}}function mM(i,t){let e=0,n=i.faceCount-1;for(;e<n;){const s=e+n+1>>1;i.faceOffsets[s]<=t?e=s:n=s-1}return e}function qh(i){return i+3&-4}function Od(i,t={}){const e=t.smoothAngle??30,n=[];let s=0;const r=[],o=[],a=(_,S)=>{const w=qh(_.byteLength),T=new Uint8Array(w);T.set(_),n.push(T);const M={buffer:0,byteOffset:s,byteLength:_.byteLength};return S!==void 0&&(M.target=S),r.push(M),s+=w,r.length-1},c=(_,S,w,T)=>{const M=a(new Uint8Array(_.buffer,_.byteOffset,_.byteLength),T),E=S==="SCALAR"?1:S==="VEC2"?2:3,P=_.length/E,A=new Array(E).fill(1/0),L=new Array(E).fill(-1/0);for(let z=0;z<P;z++)for(let F=0;F<E;F++){const U=_[z*E+F];U<A[F]&&(A[F]=U),U>L[F]&&(L[F]=U)}return o.push({bufferView:M,componentType:w,count:P,type:S,min:A,max:L}),o.length-1},l=[],h=[];i.forEach(_=>{const S=pM(_.mesh,e),w={POSITION:c(S.position,"VEC3",5126,34962),NORMAL:c(S.normal,"VEC3",5126,34962)};S.uv&&(w.TEXCOORD_0=c(S.uv,"VEC2",5126,34962));const T=c(S.index,"SCALAR",5125,34963);l.push({name:_.name,primitives:[{attributes:w,indices:T,material:0,mode:4}]}),h.push({name:_.name,mesh:l.length-1,translation:_.position,rotation:_.rotation,scale:_.scale})});const d={asset:{version:"2.0",generator:t.generator??"macbeth"},scene:0,scenes:[{nodes:h.map((_,S)=>S)}],nodes:h,meshes:l,materials:[{name:"macbeth",pbrMetallicRoughness:{baseColorFactor:[.75,.78,.81,1],metallicFactor:0,roughnessFactor:.7},doubleSided:!0}],accessors:o,bufferViews:r,buffers:[{byteLength:s}]};let f=new TextEncoder().encode(JSON.stringify(d));const p=qh(f.byteLength);if(p!==f.byteLength){const _=new Uint8Array(p).fill(32);_.set(f),f=_}const v=s,g=20+f.byteLength+(v?8+v:0),m=new Uint8Array(g),x=new DataView(m.buffer);let y=0;if(x.setUint32(y,1179937895,!0),x.setUint32(y+4,2,!0),x.setUint32(y+8,g,!0),y+=12,x.setUint32(y,f.byteLength,!0),x.setUint32(y+4,1313821514,!0),y+=8,m.set(f,y),y+=f.byteLength,v){x.setUint32(y,v,!0),x.setUint32(y+4,5130562,!0),y+=8;for(const _ of n)m.set(_,y),y+=_.byteLength}return m}function kd(i){return i.filter(t=>t.visible&&t.mesh.faceCount>0).map(t=>({name:t.name,mesh:t.mesh,position:[...t.transform.position],rotation:[...t.transform.rotation],scale:[...t.transform.scale]}))}const Bd="MBMESH\0\0",pl=1;function Sc(i){return i+3&-4}function gM(i){let t=16;for(const r of i)t+=8+Sc(r.data.byteLength);const e=new Uint8Array(t),n=new DataView(e.buffer);for(let r=0;r<8;r++)e[r]=Bd.charCodeAt(r);n.setUint32(8,pl,!0),n.setUint32(12,i.length,!0);let s=16;for(const r of i){for(let o=0;o<4;o++)e[s+o]=r.tag.charCodeAt(o);n.setUint32(s+4,r.data.byteLength,!0),e.set(r.data,s+8),s+=8+Sc(r.data.byteLength)}return e}function vM(i){for(let o=0;o<8;o++)if(i[o]!==Bd.charCodeAt(o))throw new Error("メッシュのバイナリ形式ではありません");const t=new DataView(i.buffer,i.byteOffset,i.byteLength),e=t.getUint32(8,!0),n=t.getUint32(12,!0),s=new Map;let r=16;for(let o=0;o<n;o++){let a="";for(let l=0;l<4;l++)a+=String.fromCharCode(i[r+l]);const c=t.getUint32(r+4,!0);s.set(a,i.subarray(r+8,r+8+c)),r+=8+Sc(c)}return{version:e,chunks:s}}function vn(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Or(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function kr(i){return new Uint32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Yh(i){return new Uint16Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}const xM=new TextEncoder,_M=new TextDecoder;function zd(i){const t=[{tag:"POSI",data:vn(i.positions)},{tag:"FOFF",data:vn(i.faceOffsets)},{tag:"FCOR",data:vn(i.faceCorners)}];if(i.polygroup.some(e=>e!==0)&&t.push({tag:"PGRP",data:vn(i.polygroup)}),i.materialId.some(e=>e!==0)&&t.push({tag:"MTID",data:vn(i.materialId)}),i.vertexColor&&t.push({tag:"VCOL",data:vn(i.vertexColor)}),i.crease.size){const e=new Uint32Array(i.crease.size*2),n=new Float32Array(i.crease.size);let s=0;for(const[r,o]of i.crease){const[a,c]=r.split("_").map(Number);e[s*2]=a,e[s*2+1]=c,n[s]=o,s++}t.push({tag:"CRID",data:vn(e)},{tag:"CRSH",data:vn(n)})}if(i.cornerSharp.size){const e=new Uint32Array(i.cornerSharp.size),n=new Float32Array(i.cornerSharp.size);let s=0;for(const[r,o]of i.cornerSharp)e[s]=r,n[s]=o,s++;t.push({tag:"CNID",data:vn(e)},{tag:"CNSH",data:vn(n)})}if(i.uvSets.size){const e=Array.from(i.uvSets.keys());t.push({tag:"UVNM",data:xM.encode(JSON.stringify(e))}),e.forEach((n,s)=>{t.push({tag:`UV${String(s).padStart(2,"0")}`,data:vn(i.uvSets.get(n))})})}return gM(t)}function Vd(i){const{version:t,chunks:e}=vM(i);if(t>pl)throw new Error(`このメッシュは新しい版 (v${t}) で保存されています。アプリを更新してください`);const n=Or(e.get("POSI")),s=kr(e.get("FOFF")),r=kr(e.get("FCOR")),o=new Map,a=e.get("UVNM");a&&JSON.parse(_M.decode(a)).forEach((y,_)=>{const S=e.get(`UV${String(_).padStart(2,"0")}`);S&&o.set(y,Or(S))});const c=new Map,l=e.get("CRID"),h=e.get("CRSH");if(l&&h){const x=kr(l),y=Or(h);for(let _=0;_<y.length;_++){const S=x[_*2],w=x[_*2+1];c.set(S<w?`${S}_${w}`:`${w}_${S}`,y[_])}}const d=new Map,u=e.get("CNID"),f=e.get("CNSH");if(u&&f){const x=kr(u),y=Or(f);for(let _=0;_<y.length;_++)d.set(x[_],y[_])}const p=Math.max(0,s.length-1),v=e.get("PGRP"),g=e.get("MTID"),m=e.get("VCOL");return new zi(n,s,r,{uvSets:o,crease:c,cornerSharp:d,polygroup:v?Yh(v):new Uint16Array(p),materialId:g?Yh(g):new Uint16Array(p),vertexColor:m?new Uint8Array(m):null})}var xe=Uint8Array,an=Uint16Array,ml=Int32Array,_o=new xe([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Mo=new xe([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),wc=new xe([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Hd=function(i,t){for(var e=new an(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new ml(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)s[r]=r-e[n]<<5|n;return{b:e,r:s}},Gd=Hd(_o,2),Wd=Gd.b,Ec=Gd.r;Wd[28]=258,Ec[258]=28;var Xd=Hd(Mo,0),MM=Xd.b,Kh=Xd.r,Tc=new an(32768);for(var le=0;le<32768;++le){var gi=(le&43690)>>1|(le&21845)<<1;gi=(gi&52428)>>2|(gi&13107)<<2,gi=(gi&61680)>>4|(gi&3855)<<4,Tc[le]=((gi&65280)>>8|(gi&255)<<8)>>1}var Hn=(function(i,t,e){for(var n=i.length,s=0,r=new an(t);s<n;++s)i[s]&&++r[i[s]-1];var o=new an(t);for(s=1;s<t;++s)o[s]=o[s-1]+r[s-1]<<1;var a;if(e){a=new an(1<<t);var c=15-t;for(s=0;s<n;++s)if(i[s])for(var l=s<<4|i[s],h=t-i[s],d=o[i[s]-1]++<<h,u=d|(1<<h)-1;d<=u;++d)a[Tc[d]>>c]=l}else for(a=new an(n),s=0;s<n;++s)i[s]&&(a[s]=Tc[o[i[s]-1]++]>>15-i[s]);return a}),yi=new xe(288);for(var le=0;le<144;++le)yi[le]=8;for(var le=144;le<256;++le)yi[le]=9;for(var le=256;le<280;++le)yi[le]=7;for(var le=280;le<288;++le)yi[le]=8;var js=new xe(32);for(var le=0;le<32;++le)js[le]=5;var yM=Hn(yi,9,0),bM=Hn(yi,9,1),SM=Hn(js,5,0),wM=Hn(js,5,1),aa=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},xn=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},ca=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},gl=function(i){return(i+7)/8|0},or=function(i,t,e){return(t==null||t<0)&&(t=0),(e==null||e>i.length)&&(e=i.length),new xe(i.subarray(t,e))},EM=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ze=function(i,t,e){var n=new Error(t||EM[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,ze),!e)throw n;return n},TM=function(i,t,e,n){var s=i.length,r=n?n.length:0;if(!s||t.f&&!t.l)return e||new xe(0);var o=!e,a=o||t.i!=2,c=t.i;o&&(e=new xe(s*3));var l=function(Rt){var ie=e.length;if(Rt>ie){var kt=new xe(Math.max(ie*2,Rt));kt.set(e),e=kt}},h=t.f||0,d=t.p||0,u=t.b||0,f=t.l,p=t.d,v=t.m,g=t.n,m=s*8;do{if(!f){h=xn(i,d,1);var x=xn(i,d+1,3);if(d+=3,x)if(x==1)f=bM,p=wM,v=9,g=5;else if(x==2){var w=xn(i,d,31)+257,T=xn(i,d+10,15)+4,M=w+xn(i,d+5,31)+1;d+=14;for(var E=new xe(M),P=new xe(19),A=0;A<T;++A)P[wc[A]]=xn(i,d+A*3,7);d+=T*3;for(var L=aa(P),z=(1<<L)-1,F=Hn(P,L,1),A=0;A<M;){var U=F[xn(i,d,z)];d+=U&15;var y=U>>4;if(y<16)E[A++]=y;else{var B=0,D=0;for(y==16?(D=3+xn(i,d,3),d+=2,B=E[A-1]):y==17?(D=3+xn(i,d,7),d+=3):y==18&&(D=11+xn(i,d,127),d+=7);D--;)E[A++]=B}}var q=E.subarray(0,w),j=E.subarray(w);v=aa(q),g=aa(j),f=Hn(q,v,1),p=Hn(j,g,1)}else ze(1);else{var y=gl(d)+4,_=i[y-4]|i[y-3]<<8,S=y+_;if(S>s){c&&ze(0);break}a&&l(u+_),e.set(i.subarray(y,S),u),t.b=u+=_,t.p=d=S*8,t.f=h;continue}if(d>m){c&&ze(0);break}}a&&l(u+131072);for(var st=(1<<v)-1,tt=(1<<g)-1,ot=d;;ot=d){var B=f[ca(i,d)&st],Ct=B>>4;if(d+=B&15,d>m){c&&ze(0);break}if(B||ze(2),Ct<256)e[u++]=Ct;else if(Ct==256){ot=d,f=null;break}else{var Ft=Ct-254;if(Ct>264){var A=Ct-257,At=_o[A];Ft=xn(i,d,(1<<At)-1)+Wd[A],d+=At}var K=p[ca(i,d)&tt],rt=K>>4;K||ze(3),d+=K&15;var j=MM[rt];if(rt>3){var At=Mo[rt];j+=ca(i,d)&(1<<At)-1,d+=At}if(d>m){c&&ze(0);break}a&&l(u+131072);var it=u+Ft;if(u<j){var It=r-j,Nt=Math.min(j,it);for(It+u<0&&ze(3);u<Nt;++u)e[u]=n[It+u]}for(;u<it;++u)e[u]=e[u-j]}}t.l=f,t.p=ot,t.b=u,t.f=h,f&&(h=1,t.m=v,t.d=p,t.n=g)}while(!h);return u!=e.length&&o?or(e,0,u):e.subarray(0,u)},jn=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8},Ls=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8,i[n+2]|=e>>16},la=function(i,t){for(var e=[],n=0;n<i.length;++n)i[n]&&e.push({s:n,f:i[n]});var s=e.length,r=e.slice();if(!s)return{t:qd,l:0};if(s==1){var o=new xe(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(S,w){return S.f-w.f}),e.push({s:-1,f:25001});var a=e[0],c=e[1],l=0,h=1,d=2;for(e[0]={s:-1,f:a.f+c.f,l:a,r:c};h!=s-1;)a=e[e[l].f<e[d].f?l++:d++],c=e[l!=h&&e[l].f<e[d].f?l++:d++],e[h++]={s:-1,f:a.f+c.f,l:a,r:c};for(var u=r[0].s,n=1;n<s;++n)r[n].s>u&&(u=r[n].s);var f=new an(u+1),p=Cc(e[h-1],f,0);if(p>t){var n=0,v=0,g=p-t,m=1<<g;for(r.sort(function(w,T){return f[T.s]-f[w.s]||w.f-T.f});n<s;++n){var x=r[n].s;if(f[x]>t)v+=m-(1<<p-f[x]),f[x]=t;else break}for(v>>=g;v>0;){var y=r[n].s;f[y]<t?v-=1<<t-f[y]++-1:++n}for(;n>=0&&v;--n){var _=r[n].s;f[_]==t&&(--f[_],++v)}p=t}return{t:new xe(f),l:p}},Cc=function(i,t,e){return i.s==-1?Math.max(Cc(i.l,t,e+1),Cc(i.r,t,e+1)):t[i.s]=e},Zh=function(i){for(var t=i.length;t&&!i[--t];);for(var e=new an(++t),n=0,s=i[0],r=1,o=function(c){e[n++]=c},a=1;a<=t;++a)if(i[a]==s&&a!=t)++r;else{if(!s&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(s),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(s);r=1,s=i[a]}return{c:e.subarray(0,n),n:t}},Is=function(i,t){for(var e=0,n=0;n<t.length;++n)e+=i[n]*t[n];return e},$d=function(i,t,e){var n=e.length,s=gl(t+2);i[s]=n&255,i[s+1]=n>>8,i[s+2]=i[s]^255,i[s+3]=i[s+1]^255;for(var r=0;r<n;++r)i[s+r+4]=e[r];return(s+4+n)*8},jh=function(i,t,e,n,s,r,o,a,c,l,h){jn(t,h++,e),++s[256];for(var d=la(s,15),u=d.t,f=d.l,p=la(r,15),v=p.t,g=p.l,m=Zh(u),x=m.c,y=m.n,_=Zh(v),S=_.c,w=_.n,T=new an(19),M=0;M<x.length;++M)++T[x[M]&31];for(var M=0;M<S.length;++M)++T[S[M]&31];for(var E=la(T,7),P=E.t,A=E.l,L=19;L>4&&!P[wc[L-1]];--L);var z=l+5<<3,F=Is(s,yi)+Is(r,js)+o,U=Is(s,u)+Is(r,v)+o+14+3*L+Is(T,P)+2*T[16]+3*T[17]+7*T[18];if(c>=0&&z<=F&&z<=U)return $d(t,h,i.subarray(c,c+l));var B,D,q,j;if(jn(t,h,1+(U<F)),h+=2,U<F){B=Hn(u,f,0),D=u,q=Hn(v,g,0),j=v;var st=Hn(P,A,0);jn(t,h,y-257),jn(t,h+5,w-1),jn(t,h+10,L-4),h+=14;for(var M=0;M<L;++M)jn(t,h+3*M,P[wc[M]]);h+=3*L;for(var tt=[x,S],ot=0;ot<2;++ot)for(var Ct=tt[ot],M=0;M<Ct.length;++M){var Ft=Ct[M]&31;jn(t,h,st[Ft]),h+=P[Ft],Ft>15&&(jn(t,h,Ct[M]>>5&127),h+=Ct[M]>>12)}}else B=yM,D=yi,q=SM,j=js;for(var M=0;M<a;++M){var At=n[M];if(At>255){var Ft=At>>18&31;Ls(t,h,B[Ft+257]),h+=D[Ft+257],Ft>7&&(jn(t,h,At>>23&31),h+=_o[Ft]);var K=At&31;Ls(t,h,q[K]),h+=j[K],K>3&&(Ls(t,h,At>>5&8191),h+=Mo[K])}else Ls(t,h,B[At]),h+=D[At]}return Ls(t,h,B[256]),h+D[256]},CM=new ml([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),qd=new xe(0),AM=function(i,t,e,n,s,r){var o=r.z||i.length,a=new xe(n+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(n,a.length-s),l=r.l,h=(r.r||0)&7;if(t){h&&(c[0]=r.r>>3);for(var d=CM[t-1],u=d>>13,f=d&8191,p=(1<<e)-1,v=r.p||new an(32768),g=r.h||new an(p+1),m=Math.ceil(e/3),x=2*m,y=function(jt){return(i[jt]^i[jt+1]<<m^i[jt+2]<<x)&p},_=new ml(25e3),S=new an(288),w=new an(32),T=0,M=0,E=r.i||0,P=0,A=r.w||0,L=0;E+2<o;++E){var z=y(E),F=E&32767,U=g[z];if(v[F]=U,g[z]=F,A<=E){var B=o-E;if((T>7e3||P>24576)&&(B>423||!l)){h=jh(i,c,0,_,S,w,M,P,L,E-L,h),P=T=M=0,L=E;for(var D=0;D<286;++D)S[D]=0;for(var D=0;D<30;++D)w[D]=0}var q=2,j=0,st=f,tt=F-U&32767;if(B>2&&z==y(E-tt))for(var ot=Math.min(u,B)-1,Ct=Math.min(32767,E),Ft=Math.min(258,B);tt<=Ct&&--st&&F!=U;){if(i[E+q]==i[E+q-tt]){for(var At=0;At<Ft&&i[E+At]==i[E+At-tt];++At);if(At>q){if(q=At,j=tt,At>ot)break;for(var K=Math.min(tt,At-2),rt=0,D=0;D<K;++D){var it=E-tt+D&32767,It=v[it],Nt=it-It&32767;Nt>rt&&(rt=Nt,U=it)}}}F=U,U=v[F],tt+=F-U&32767}if(j){_[P++]=268435456|Ec[q]<<18|Kh[j];var Rt=Ec[q]&31,ie=Kh[j]&31;M+=_o[Rt]+Mo[ie],++S[257+Rt],++w[ie],A=E+q,++T}else _[P++]=i[E],++S[i[E]]}}for(E=Math.max(E,A);E<o;++E)_[P++]=i[E],++S[i[E]];h=jh(i,c,l,_,S,w,M,P,L,E-L,h),l||(r.r=h&7|c[h/8|0]<<3,h-=7,r.h=g,r.p=v,r.i=E,r.w=A)}else{for(var E=r.w||0;E<o+l;E+=65535){var kt=E+65535;kt>=o&&(c[h/8|0]=l,kt=o),h=$d(c,h+1,i.subarray(E,kt))}r.i=o}return or(a,0,n+gl(h)+s)},RM=(function(){for(var i=new Int32Array(256),t=0;t<256;++t){for(var e=t,n=9;--n;)e=(e&1&&-306674912)^e>>>1;i[t]=e}return i})(),PM=function(){var i=-1;return{p:function(t){for(var e=i,n=0;n<t.length;++n)e=RM[e&255^t[n]]^e>>>8;i=e},d:function(){return~i}}},LM=function(i,t,e,n,s){if(!s&&(s={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),o=new xe(r.length+i.length);o.set(r),o.set(i,r.length),i=o,s.w=r.length}return AM(i,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+t.mem,e,n,s)},Yd=function(i,t){var e={};for(var n in i)e[n]=i[n];for(var n in t)e[n]=t[n];return e},Nn=function(i,t){return i[t]|i[t+1]<<8},fn=function(i,t){return(i[t]|i[t+1]<<8|i[t+2]<<16|i[t+3]<<24)>>>0},ha=function(i,t){return fn(i,t)+fn(i,t+4)*4294967296},Ne=function(i,t,e){for(;e;++t)i[t]=e,e>>>=8};function IM(i,t){return LM(i,t||{},0,0)}function UM(i,t){return TM(i,{i:2},t&&t.out,t&&t.dictionary)}var Kd=function(i,t,e,n){for(var s in i){var r=i[s],o=t+s,a=n;Array.isArray(r)&&(a=Yd(n,r[1]),r=r[0]),ArrayBuffer.isView(r)?e[o]=[r,a]:(e[o+="/"]=[new xe(0),a],Kd(r,o,e,n))}},Jh=typeof TextEncoder<"u"&&new TextEncoder,Ac=typeof TextDecoder<"u"&&new TextDecoder,DM=0;try{Ac.decode(qd,{stream:!0}),DM=1}catch{}var NM=function(i){for(var t="",e=0;;){var n=i[e++],s=(n>127)+(n>223)+(n>239);if(e+s>i.length)return{s:t,r:or(i,e-1)};s?s==3?(n=((n&15)<<18|(i[e++]&63)<<12|(i[e++]&63)<<6|i[e++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):s&1?t+=String.fromCharCode((n&31)<<6|i[e++]&63):t+=String.fromCharCode((n&15)<<12|(i[e++]&63)<<6|i[e++]&63):t+=String.fromCharCode(n)}};function Qh(i,t){var e;if(Jh)return Jh.encode(i);for(var n=i.length,s=new xe(i.length+(i.length>>1)),r=0,o=function(l){s[r++]=l},e=0;e<n;++e){if(r+5>s.length){var a=new xe(r+8+(n-e<<1));a.set(s),s=a}var c=i.charCodeAt(e);c<128||t?o(c):c<2048?(o(192|c>>6),o(128|c&63)):c>55295&&c<57344?(c=65536+(c&1047552)|i.charCodeAt(++e)&1023,o(240|c>>18),o(128|c>>12&63),o(128|c>>6&63),o(128|c&63)):(o(224|c>>12),o(128|c>>6&63),o(128|c&63))}return or(s,0,r)}function FM(i,t){if(t){for(var e="",n=0;n<i.length;n+=16384)e+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return e}else{if(Ac)return Ac.decode(i);var s=NM(i),r=s.s,e=s.r;return e.length&&ze(8),r}}var OM=function(i,t){return t+30+Nn(i,t+26)+Nn(i,t+28)},kM=function(i,t,e){var n=Nn(i,t+28),s=Nn(i,t+30),r=FM(i.subarray(t+46,t+46+n),!(Nn(i,t+8)&2048)),o=t+46+n,a=BM(i,o,s,e,fn(i,t+20),fn(i,t+24),fn(i,t+42)),c=a[0],l=a[1],h=a[2];return[Nn(i,t+10),c,l,r,o+s+Nn(i,t+32),h]},BM=function(i,t,e,n,s,r,o){var a=s==4294967295,c=r==4294967295,l=o==4294967295,h=t+e,d=a+c+l;if(n&&d){for(;t+4<h;t+=4+Nn(i,t+2))if(Nn(i,t)==1)return[a?ha(i,t+4+8*c):s,c?ha(i,t+4):r,l?ha(i,t+4+8*(c+a)):o,1];n<2&&ze(13)}return[s,r,o,0]},Rc=function(i){var t=0;if(i)for(var e in i){var n=i[e].length;n>65535&&ze(9),t+=n+4}return t},tu=function(i,t,e,n,s,r,o,a){var c=n.length,l=e.extra,h=a&&a.length,d=Rc(l);Ne(i,t,o!=null?33639248:67324752),t+=4,o!=null&&(i[t++]=20,i[t++]=e.os),i[t]=20,t+=2,i[t++]=e.flag<<1|(r<0&&8),i[t++]=s&&8,i[t++]=e.compression&255,i[t++]=e.compression>>8;var u=new Date(e.mtime==null?Date.now():e.mtime),f=u.getFullYear()-1980;if((f<0||f>119)&&ze(10),Ne(i,t,f<<25|u.getMonth()+1<<21|u.getDate()<<16|u.getHours()<<11|u.getMinutes()<<5|u.getSeconds()>>1),t+=4,r!=-1&&(Ne(i,t,e.crc),Ne(i,t+4,r<0?-r-2:r),Ne(i,t+8,e.size)),Ne(i,t+12,c),Ne(i,t+14,d),t+=16,o!=null&&(Ne(i,t,h),Ne(i,t+6,e.attrs),Ne(i,t+10,o),t+=14),i.set(n,t),t+=c,d)for(var p in l){var v=l[p],g=v.length;Ne(i,t,+p),Ne(i,t+2,g),i.set(v,t+4),t+=4+g}return h&&(i.set(a,t),t+=h),t},zM=function(i,t,e,n,s){Ne(i,t,101010256),Ne(i,t+8,e),Ne(i,t+10,e),Ne(i,t+12,n),Ne(i,t+16,s)};function VM(i,t){t||(t={});var e={},n=[];Kd(i,"",e,t);var s=0,r=0;for(var o in e){var a=e[o],c=a[0],l=a[1],h=l.level==0?0:8,d=Qh(o),u=d.length,f=l.comment,p=f&&Qh(f),v=p&&p.length,g=Rc(l.extra);u>65535&&ze(11);var m=h?IM(c,l):c,x=m.length,y=PM();y.p(c),n.push(Yd(l,{size:c.length,crc:y.d(),c:m,f:d,m:p,u:u!=o.length||p&&f.length!=v,o:s,compression:h})),s+=30+u+g+x,r+=76+2*(u+g)+(v||0)+x}for(var _=new xe(r+22),S=s,w=r-s,T=0;T<n.length;++T){var d=n[T];tu(_,d.o,d,d.f,d.u,d.c.length);var M=30+d.f.length+Rc(d.extra);_.set(d.c,d.o+M),tu(_,s,d,d.f,d.u,d.c.length,d.o,d.m),s+=16+M+(d.m?d.m.length:0)}return zM(_,s,n.length,w,S),_}function HM(i,t){for(var e={},n=i.length-22;fn(i,n)!=101010256;--n)(!n||i.length-n>65558)&&ze(13);var s=Nn(i,n+8);if(!s)return{};var r=fn(i,n+16),o=fn(i,n-20)==117853008;if(o){var a=fn(i,n-12);o=fn(i,a)==101075792,o&&(s=fn(i,a+32),r=fn(i,a+48))}for(var c=0;c<s;++c){var l=kM(i,r,o),h=l[0],d=l[1],u=l[2],f=l[3],p=l[4],v=l[5],g=OM(i,v);r=p,h?h==8?e[f]=UM(i.subarray(g,g+d),{out:new xe(u)}):ze(14,"unknown compression type "+h):e[f]=or(i,g,g+d)}return e}const Js=1,eu=new TextEncoder,nu=new TextDecoder;function iu(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function su(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Zd(i,t={}){const e={},n=new Date().toISOString(),s={objects:i.objects.map(o=>{e[`meshes/${o.id}.bin`]=zd(o.mesh);for(const a of o.multires)e[`multires/${o.id}/L${a.level}.bin`]=iu(a.delta);for(const a of o.sculptLayers)e[`layers/${o.id}/${a.id}.bin`]=iu(a.delta);return{id:o.id,name:o.name,kind:o.kind,parametric:o.parametric,params:o.params,transform:o.transform,visible:o.visible,locked:o.locked,activeLevel:o.activeLevel,exportedTopologyHash:o.exportedTopologyHash,multires:o.multires.map(a=>({level:a.level,count:a.delta.length})),sculptLayers:o.sculptLayers.map(a=>({id:a.id,name:a.name,level:a.level,weight:a.weight,visible:a.visible,count:a.delta.length})),paintLayers:o.paintLayers,uv:o.uv?_d(o.uv):null}}),settings:i.settings,cameraBookmarks:i.cameraBookmarks},r={formatVersion:Js,app:"macbeth",appVersion:t.appVersion??"0.1.0",created:n,modified:n};if(t.thumbnail&&(e["thumbnail.png"]=t.thumbnail,r.thumbnail="thumbnail.png"),t.extraFiles)for(const[o,a]of t.extraFiles)e[o]=a;return e["manifest.json"]=eu.encode(JSON.stringify(r,null,2)),e["scene.json"]=eu.encode(JSON.stringify(s)),VM(e,{level:6})}const GM={};function WM(i,t,e){let n=i;for(let s=e;s<Js;s++){const r=GM[s];if(!r)throw new Error(`版 ${s} から ${s+1} への変換がありません`);n=r(n,t)}return n}function jd(i){const t=HM(i),e=t["manifest.json"];if(!e)throw new Error("manifest.json がありません。macbeth のプロジェクトではないようです");const n=JSON.parse(nu.decode(e));if(n.formatVersion>Js)throw new Error(`このプロジェクトは新しい版 (v${n.formatVersion}) で保存されています。アプリを更新してください`);let s=JSON.parse(nu.decode(t["scene.json"]));n.formatVersion<Js&&(s=WM(s,t,n.formatVersion));const r=new dl;r.settings=s.settings??{},r.cameraBookmarks=s.cameraBookmarks??[];const o=new Set(["manifest.json","scene.json"]);for(const c of s.objects){const l=new uo(c.kind,c.id,c.name);l.parametric=c.parametric,l.params=c.params,l.transform=c.transform??fl(),l.visible=c.visible??!0,l.locked=c.locked??!1,l.activeLevel=c.activeLevel??0,l.exportedTopologyHash=c.exportedTopologyHash??null;const h=`meshes/${c.id}.bin`,d=t[h];if(!d)throw new Error(`${c.name} のメッシュ (${h}) がありません`);l.mesh=Vd(d),o.add(h),l.multires=(c.multires??[]).map(u=>{const f=`multires/${c.id}/L${u.level}.bin`,p=t[f];return p?(o.add(f),{level:u.level,delta:su(p)}):null}).filter(u=>u!==null),l.sculptLayers=(c.sculptLayers??[]).map(u=>{const f=`layers/${c.id}/${u.id}.bin`,p=t[f];return p?(o.add(f),{id:u.id,name:u.name,level:u.level,weight:u.weight,visible:u.visible,delta:su(p)}):null}).filter(u=>u!==null),l.paintLayers=c.paintLayers??[],l.uv=Md(c.uv),r.objects.push(l)}r.syncIdCounter();const a=new Map;for(const[c,l]of Object.entries(t))o.has(c)||a.set(c,l);return{document:r,manifest:n,extraFiles:a}}function XM(i,t){return ul(i.mesh)===t}const Pc=Object.freeze(Object.defineProperty({__proto__:null,Document:dl,FramePlan:ll,MBZ_FORMAT_VERSION:Js,MESH_BINARY_VERSION:pl,Mesh:zi,MeshBuilder:ee,Multires:Dd,PRIMITIVES:Sn,PRIMITIVE_ORDER:wf,SceneObject:uo,SubdivPlan:cl,UV_SET:me,alignU:ad,alignV:cd,applyDeltas:uM,applySimilarity:tl,arcBetween:_c,autoPins:Zf,autoSeams:td,bevelEdges:Lf,boundaryEdges:Ad,bridgeEdges:Uf,buildCharts:bs,buildFrames:hl,buildUvTopology:yd,canReplaceBase:XM,captureDeltas:Ud,catmullClark:Ld,chainVertices:Cd,chartFingerprint:qf,chartMesh:xo,cloneRecipe:vc,cloneTransform:ei,collapseFaces:Pf,combineMeshes:Wf,compact:Un,compareTopology:dM,conjugateGradient:Yf,connectEdges:kf,connectVertices:Jc,cornerIndex:Te,cornerKey:Vn,decodeMesh:Vd,defaultParams:oo,deleteFaces:Rf,deserializeRecipe:Md,dissolveEdges:Af,dissolveVertices:Of,duplicateFaces:Hf,edgeChains:If,edgeKey:St,edgeLoopFrom:jr,edgeRingFrom:Ed,emptyRecipe:el,encodeMesh:zd,equalizeTexelDensity:sd,evaluateLevels:fM,extractFaces:Gf,extrudeEdges:fc,extrudeFaces:uc,extrudeVertices:dc,faceEdgeKey:sl,faceUvs:Ue,flipU:sM,flipV:rM,gridding:ud,growFaces:Rd,growVertices:Mc,identityTransform:fl,insertEdgeLoop:Tf,lerpUvRows:I_,loopPreviewPoints:Ef,loopStrip:Zc,lscm:Kf,marginUv:nd,measure:Qc,mergeByDistance:jc,mergeFacesAcrossEdge:Cf,mergeUvs:dd,mirrorMesh:$f,nodesFromObjects:kd,normalizeScale:jf,packMbz:Zd,parseCorner:Zs,parseObj:Nd,polygonArea:rd,projectChart:mc,rebuildRecipeFor:gd,recipeFromMesh:il,recompute:ti,reconcile:xd,recordManual:vd,rotate90:oM,seamsFromUv:nl,separateShells:Xf,serializeRecipe:_d,sewInBase:xc,shelfPack:id,shellFaces:al,shellVertices:Td,shrinkFaces:Pd,shrinkVertices:yc,similarityFrom2:md,slideRails:Bf,slideVertices:zf,splitPoint:ao,straightenBorder:hd,straightenPoints:ld,subdivide:Id,surfaceArea:od,symmetrizeUv:pd,topologyHash:ul,transformPoint:Vf,triangleFrame:co,unpackMbz:jd,uprightChart:Jf,uvArcBetween:bd,uvChartEdges:lM,uvChartVertices:ol,uvEdgeLoopFrom:ho,uvGridRows:wd,uvIncidentEdges:rr,uvLoopVertices:rl,uvSetNames:L_,uvStraightRun:Zr,uvVertexPath:Sd,weldVertices:Ys,writeGlb:Od,writeObj:Fd},Symbol.toStringTag,{value:"Module"}));function Br(i){let t=0,e=0;for(const o of i.values())t+=o.x,e+=o.y;const n=i.size||1;t/=n,e/=n;let s=0;const r=new Map;for(const[o,a]of i)s+=Math.hypot(a.x-t,a.y-e),r.set(o,Math.atan2(a.y-e,a.x-t));return{cx:t,cy:e,spread:s/n,angles:r}}function $M(i,t){let e=0,n=0;for(const[s,r]of t.angles){const o=i.angles.get(s);if(o===void 0)continue;let a=r-o;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;e+=a,n++}return n?e/n:0}function Jd(i,t){return Math.abs(t.spread-i.spread)*2}function qM(i,t){const e=Math.abs($M(i,t))*t.spread;return Math.hypot(t.cx-i.cx,t.cy-i.cy)+Jd(i,t)+e}const YM=5,ua=10,vl=12,KM=120,xl=300,ZM=400,jM=400,ps=3;class Qd{constructor(t,e,n){this.canvas=t,this.local=e,this.h=n}pointers=new Map;gesture=null;holdTimer=null;tap={t0:0,maxN:0,moved:!1,stagger:!1,lastN:0,lastT:0};fHeld=!1;fChord=!1;fingerCam=!1;attach(){const t=this.canvas;t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("touchmove",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>this.down(e)),t.addEventListener("pointermove",e=>this.move(e)),t.addEventListener("pointerup",e=>this.up(e)),t.addEventListener("pointercancel",e=>this.cancelled(e)),t.addEventListener("pointerleave",()=>{this.pointers.size||this.h.hoverLeave()}),t.addEventListener("wheel",e=>{e.preventDefault(),this.h.dolly(1+Math.sign(e.deltaY)*.09)},{passive:!1})}touchCount(){let t=0;for(const e of this.pointers.values())e.type==="touch"&&t++;return t}down(t){try{this.canvas.setPointerCapture(t.pointerId)}catch{}if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,x0:t.clientX,y0:t.clientY,type:t.pointerType}),this.tapDown(t),this.pointers.size>=2){if(this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.h.abort(),this.cancelHold(),this.pointers.size===3&&this.touchCount()===3){const n=Br(this.pointers);this.gesture={mode:"threefinger",live:!1,acc:0,basis:n,last:n},this.startHold(3,()=>this.h.openCameraMenu(n.cx,n.cy));return}if(this.pointers.size===2){const n=Br(this.pointers);this.gesture={mode:"twofinger",live:!1,acc:0,last:n},this.touchCount()===2&&this.startHold(2,()=>this.h.openTwoFingerMenu(n.cx,n.cy)),this.fHeld&&(this.fChord=!0,this.gesture.zoomOnly=!0,this.gesture.pivot=this.h.zoomPivot()??void 0)}else this.gesture={mode:"idle"};return}const e=this.local(t);if(this.fHeld){this.fChord=!0,this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},this.h.marqueeStart(e);return}if(t.pointerType==="mouse"){if(this.h.altOn(t)){this.gesture={mode:t.button===0?"tumble":t.button===1?"pan":"dolly"};return}if(t.button===2){this.h.openMarkingMenu(t.clientX,t.clientY,this.h.shiftOn(t)),this.gesture={mode:"marking"};return}if(t.button===1){this.gesture={mode:"pan"};return}}if(t.pointerType==="touch"&&!(!this.fingerCam&&this.h.isOnMesh(e,t))){this.gesture={mode:"tumble",live:!1,acc:0},this.startMarkingHold(t);return}this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},t.pointerType!=="mouse"&&this.startMarkingHold(t),this.h.toolDown(e,t)}move(t){const e=this.pointers.get(t.pointerId);if(!e){t.buttons===0&&!this.pointers.size&&this.h.hover(this.local(t),t);return}const n=e.x,s=e.y;e.x=t.clientX,e.y=t.clientY,Math.hypot(t.clientX-e.x0,t.clientY-e.y0)>vl&&(this.tap.moved=!0,this.cancelHold());const r=this.gesture;if(r){if(r.mode==="tumble"){if(!r.live&&t.pointerType==="touch"){if(r.acc=(r.acc??0)+Math.hypot(t.clientX-n,t.clientY-s),r.acc<YM)return;r.live=!0}this.h.tumble(t.clientX-n,t.clientY-s);return}if(r.mode==="pan")return this.h.pan(t.clientX-n,t.clientY-s);if(r.mode==="dolly")return this.h.dolly(1+(t.clientX-n+(t.clientY-s))*.006);if(r.mode==="twofinger"){if(this.pointers.size<2)return;const o=Br(this.pointers),a=r.last??o;if(!r.live){if(r.acc=(r.acc??0)+qM(a,o),r.last=o,r.acc<ua)return;r.live=!0,this.tap.moved=!0,this.cancelHold();return}const c=a.spread>1e-6&&o.spread>1e-6?a.spread/o.spread:1;r.zoomOnly&&r.pivot?this.h.dollyAbout(r.pivot,c):(this.h.dolly(c),this.h.pan(o.cx-a.cx,o.cy-a.cy)),r.last=o;return}if(r.mode==="threefinger"){if(this.pointers.size!==3)return;const o=Br(this.pointers),a=r.basis??o;if(!r.live){const l=r.fresh??=new Set;if(l.add(t.pointerId),l.size<this.pointers.size)return;l.clear(),r.last=o;const h=Jd(a,o),d=o.cx-a.cx,u=o.cy-a.cy,f=Math.hypot(d,u);if(h<ua&&f<ua)return;if(!this.h.transformBegin()){this.gesture={mode:"idle"};return}r.live=!0,this.tap.moved=!0,this.cancelHold(),r.delta=h>=f?{kind:"scale"}:{kind:"swipe",axis:Math.abs(u)>=Math.abs(d)?"vertical":"horizontal"},r.basis=o;return}const c=r.delta??{kind:"scale"};c.kind==="scale"?this.h.transformUpdate({kind:"scale",scale:a.spread>1e-6?o.spread/a.spread:1}):this.h.transformUpdate({kind:"swipe",axis:c.axis,pixels:c.axis==="vertical"?o.cy-a.cy:o.cx-a.cx});return}if(r.mode==="tool"){const o=this.local(t);(Math.abs(o.x-(r.sx??0))>ps||Math.abs(o.y-(r.sy??0))>ps)&&(r.moved=!0),this.h.toolMove(o,t)}}}up(t){this.cancelHold();const e=this.gesture;e?.mode==="threefinger"&&e.live&&this.h.transformEnd();const n=e?.mode==="tool",s=n&&!!e?.moved;this.pointers.delete(t.pointerId),n&&this.h.toolUp(this.local(t),t,s),this.pointers.size===0?(this.gesture=null,this.tapUp(t)):this.gesture={mode:"idle"}}cancelled(t){this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.pointers.delete(t.pointerId),this.cancelHold(),this.h.abort(),this.pointers.size?this.gesture={mode:"idle"}:(this.gesture=null,this.tap.lastN=0)}tapDown(t){if(t.pointerType!=="touch")return;const e=performance.now(),n=this.touchCount();n===1?(this.tap.t0=e,this.tap.maxN=1,this.tap.moved=!1,this.tap.stagger=!1):(this.tap.maxN=Math.max(this.tap.maxN,n),e-this.tap.t0>KM&&(this.tap.stagger=!0))}tapUp(t){if(t.pointerType!=="touch")return;const e=performance.now();if(!(!this.tap.moved&&!this.tap.stagger&&e-this.tap.t0<xl&&this.tap.maxN>=2)){this.tap.lastN=0;return}this.tap.lastN===this.tap.maxN&&e-this.tap.lastT<ZM?(this.tap.lastN=0,this.tap.maxN===2?this.h.undo():this.h.redo(),navigator.vibrate?.(8)):(this.tap.lastN=this.tap.maxN,this.tap.lastT=e)}startMarkingHold(t){const e=this.h.shiftOn(t),{clientX:n,clientY:s}=t;this.startHold(1,()=>this.h.openMarkingMenu(n,s,e))}startHold(t,e){this.cancelHold(),this.holdTimer=setTimeout(()=>{this.pointers.size===t&&(this.h.abort(),this.gesture=null,e())},jM)}cancelHold(){this.holdTimer!==null&&clearTimeout(this.holdTimer),this.holdTimer=null}}const ru=new df,JM=new I,QM=1e-6,ou=new Map;function ty(i,t){if(i.length!==t.length)return!1;for(let e=0;e<i.length;e++)if(i[e]!==t[e])return!1;return!0}class ey{constructor(t,e){this.viewport=t,this.container=e}cameraBased=()=>!1;facingCache=null;edgeFaceCache=null;frontFaces(t){const e=this.facingStamp(t),n=this.facingCache;if(n?.view===t&&ty(n.stamp,e))return n.front;const s=t.object.mesh,r=new Ot().getNormalMatrix(t.group.matrixWorld),o=s.faceNormals(),a=new Uint8Array(s.faceCount),c=this.viewport.camera,l=new I;c.getWorldDirection(l);const h=c.isPerspectiveCamera===!0,d=new I,u=new I;for(let f=0;f<s.faceCount;f++){d.set(o[f*3],o[f*3+1],o[f*3+2]).applyMatrix3(r);let p;if(h){const g=s.faceCenter(f);u.set(g[0],g[1],g[2]).applyMatrix4(t.group.matrixWorld),p=u.subVectors(c.position,u)}else p=u.copy(l).negate();const v=d.dot(p)/Math.max(1e-12,d.length()*p.length());a[f]=v>QM?1:0}return this.facingCache={view:t,front:a,stamp:e},a}facingStamp(t){t.group.updateMatrixWorld();const e=this.viewport.camera;e.updateMatrixWorld();const n=t.object.mesh,s=n.positions,r=s.length-3;return[...e.matrixWorld.elements,...t.group.matrixWorld.elements,n.faceCount,n.vertexCount,s[0]??0,s[1]??0,s[2]??0,s[r]??0,s[r+1]??0,s[r+2]??0]}edgeFaces(t){const e=t.object.mesh,n=this.edgeFaceCache;if(n?.view===t&&n.mesh===e)return n.map;const s=e.edgeFaceMap();return this.edgeFaceCache={view:t,mesh:e,map:s},s}edgeFacing(t,e,n){if(!this.cameraBased())return!0;const s=this.frontFaces(t),r=this.edgeFaces(t).get(St(e,n));return r?.length?r.some(o=>s[o]===1):!0}faceVisible(t,e){return this.cameraBased()?this.frontFaces(t)[e]===1:!0}vertexVisible(t,e,n){if(!this.cameraBased())return!0;const s=this.frontFaces(t),r=n.get(e);return r?.length?r.some(o=>s[o]===1):!0}get width(){return this.container.clientWidth||1}get height(){return this.container.clientHeight||1}local(t){const e=this.container.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}ndc(t){return new Wt(t.x/this.width*2-1,-(t.y/this.height*2-1))}project(t,e,n,s){t.group.updateMatrixWorld();const r=JM.set(e,n,s).applyMatrix4(t.group.matrixWorld).project(this.viewport.camera);return{x:(r.x+1)/2*this.width,y:(-r.y+1)/2*this.height,z:r.z}}projectVertex(t,e){const n=t.object.mesh.positions;return this.project(t,n[e*3],n[e*3+1],n[e*3+2])}pickSurface(t,e){ru.setFromCamera(this.ndc(t),this.viewport.camera);const n=this.viewport.allViews().filter(r=>r.object.visible&&!r.object.locked&&(!e||r.object!==e)),s=ru.intersectObjects(n.map(r=>r.surface),!1);for(const r of s){const o=n.find(l=>l.surface===r.object);if(!o)continue;const a=r.faceIndex??0,c=o.tri.triToFace[a]??0;if(this.faceVisible(o,c))return{object:o.object,view:o,face:c,point:r.point.clone(),distance:r.distance}}return null}pickVertex(t,e,n,s=-1){const r=this.cameraBased()?t.object.mesh.vertexFaces():ou;let o=-1,a=n*n;const c=t.object.mesh.vertexCount;for(let l=0;l<c;l++){if(l===s)continue;const h=this.projectVertex(t,l);if(h.z>1)continue;const d=(h.x-e.x)**2+(h.y-e.y)**2;d>=a||this.vertexVisible(t,l,r)&&(a=d,o=l)}return o}pickVertexExcept(t,e,n,s){return this.pickVertex(t,e,n,s)}pickEdge(t,e,n){let s=-1,r=n,o=.5;for(let a=0;a<t.edges.length;a++){const[c,l]=t.edges[a],h=this.projectVertex(t,c),d=this.projectVertex(t,l);if(h.z>1&&d.z>1)continue;const u=d.x-h.x,f=d.y-h.y,p=u*u+f*f,v=p?Math.max(0,Math.min(1,((e.x-h.x)*u+(e.y-h.y)*f)/p)):0,g=Math.hypot(h.x+u*v-e.x,h.y+f*v-e.y);g>=r||this.edgeFacing(t,c,l)&&(r=g,s=a,o=v)}return{edge:s,t:o}}vertsInRect(t,e,n,s,r){const o={x:Math.min(e,s),y:Math.min(n,r)},a={x:Math.max(e,s),y:Math.max(n,r)},c=[],l=this.cameraBased()?t.object.mesh.vertexFaces():ou,h=t.object.mesh.vertexCount;for(let d=0;d<h;d++){const u=this.projectVertex(t,d);u.z>1||u.x<o.x||u.x>a.x||u.y<o.y||u.y>a.y||this.vertexVisible(t,d,l)&&c.push(d)}return c}edgeVisible(t,e,n){return this.cameraBased()?this.edgeFacing(t,e,n):!0}}const ny=[14176847,7129418,5214176];let Us=null;function iy(){if(!Us){const e=document.createElement("canvas");e.width=512,e.height=512;const n=e.getContext("2d"),s=512/16;for(let r=0;r<16;r++)for(let o=0;o<16;o++)n.fillStyle=(o+r)%2===0?"#d7dde3":"#7d8891",n.fillRect(o*s,r*s,s,s);n.fillStyle="#e0723c",n.fillRect(0,512-s,s,s),Us=new af(e),Us.wrapS=Oi,Us.wrapT=Oi}return new hf({map:Us,specular:1712166,shininess:14,side:Xe})}const Ke={surf:new hf({color:10134701,specular:2765112,shininess:24,side:Xe}),wire:new Se({color:1317407,transparent:!0,opacity:.9}),wireSel:new Se({color:5111629}),wireComp:new Se({color:4608605}),vert:new on({color:9134e3,size:6,sizeAttenuation:!1}),vertSel:new on({color:16752128,size:11,sizeAttenuation:!1}),edgeSel:new Se({color:16752128}),faceSel:new bn({color:16752128,transparent:!0,opacity:.5,side:Xe,depthWrite:!1}),softPt:new on({color:13658666,size:7,sizeAttenuation:!1}),seam:new Se({color:16739146}),cutLine:new Se({color:16769354}),cutPt:new on({color:16769354,size:9,sizeAttenuation:!1}),pivot:new Se({color:15915386})};function tp(i,t,e){const n=i.faceNormals(),s=i.vertexFaces(),r=Math.cos(e*Math.PI/180)-1e-4,o=t.tri.length,a=new Float32Array(o*3),c=new Float32Array(o*3);for(let d=0;d<o;d+=3){const u=t.triToFace[d/3],f=n[u*3],p=n[u*3+1],v=n[u*3+2];for(let g=0;g<3;g++){const m=t.tri[d+g],x=(d+g)*3;a[x]=i.positions[m*3],a[x+1]=i.positions[m*3+1],a[x+2]=i.positions[m*3+2];let y=0,_=0,S=0;for(const T of s.get(m)??[]){const M=n[T*3],E=n[T*3+1],P=n[T*3+2];M*f+E*p+P*v>=r&&(y+=M,_+=E,S+=P)}const w=Math.hypot(y,_,S)||1;c[x]=y/w,c[x+1]=_/w,c[x+2]=S/w}}const l=new he;l.setAttribute("position",new Zt(a,3)),l.setAttribute("normal",new Zt(c,3));const h=i.uvSets.get("map1");if(h){const d=new Float32Array(o*2);let u=-1,f=0;for(let p=0;p<o;p+=3){const v=t.triToFace[p/3];v!==u&&(u=v,f=0);const g=[0,f+1,f+2];for(let m=0;m<3;m++){const x=i.faceOffsets[v]+g[m];d[(p+m)*2]=h[x*2]??0,d[(p+m)*2+1]=h[x*2+1]??0}f++}l.setAttribute("uv",new Zt(d,2))}return l}function ep(i,t){const e=new Float32Array(t.length*6);for(let s=0;s<t.length;s++){const[r,o]=t[s];e[s*6]=i.positions[r*3],e[s*6+1]=i.positions[r*3+1],e[s*6+2]=i.positions[r*3+2],e[s*6+3]=i.positions[o*3],e[s*6+4]=i.positions[o*3+1],e[s*6+5]=i.positions[o*3+2]}const n=new he;return n.setAttribute("position",new Zt(e,3)),n}function Ze(i){const t=new he;return t.setAttribute("position",new Zt(Float32Array.from(i),3)),t}function sn(i,t){return i.position.set(t.position[0],t.position[1],t.position[2]),i.quaternion.set(t.rotation[0],t.rotation[1],t.rotation[2],t.rotation[3]),i.scale.set(t.scale[0],t.scale[1],t.scale[2]),i}function sy(i,t){const e=new _n;sn(e,i.transform);const n=i.mesh.triangulate(),s=i.mesh.edges(),r=new we(tp(i.mesh,n,t),Ke.surf);r.userData.objectId=i.id,e.add(r);const o=new Dn(ep(i.mesh,s),Ke.wire);e.add(o);const a=new dn(Ze(i.mesh.positions),Ke.vert);return e.add(a),e.updateMatrixWorld(),{object:i,group:e,surface:r,wire:o,points:a,tri:n,edges:s}}function ms(i){i.traverse(t=>{const e=t.geometry;e&&e.dispose()})}const Vs={persp:{label:"パース",sub:"Persp",theta:.72,phi:1.12,ortho:!1},top:{label:"上",sub:"Top",theta:0,phi:.001,ortho:!0},bottom:{label:"下",sub:"Bottom",theta:0,phi:Math.PI-.001,ortho:!0},front:{label:"前",sub:"Front",theta:0,phi:Math.PI/2,ortho:!0},back:{label:"後",sub:"Back",theta:Math.PI,phi:Math.PI/2,ortho:!0},right:{label:"右",sub:"Right",theta:Math.PI/2,phi:Math.PI/2,ortho:!0},left:{label:"左",sub:"Left",theta:-Math.PI/2,phi:Math.PI/2,ortho:!0}},au=.3,cu=140;class ry{constructor(t,e,n){this.container=t,this.state=n,this.renderer=new Sf({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene.add(this.root,this.overlay,this.manip,this.preview,this.preselect),this.addLights(),this.addGrid(),this.applyCamera()}renderer;scene=new oc;persp=new nn(45,1,.05,500);grid;ortho=new sr(-1,1,1,-1,.05,500);camera=this.persp;root=new _n;overlay=new _n;manip=new _n;preview=new _n;preselect=new _n;cam={target:new I(0,.4,0),theta:.72,phi:1.12,distance:7.2};views=new Map;frame=0;addLights(){this.scene.add(new Pm(12371921,3356733,.85));const t=new dh(16777215,.72);t.position.set(3,6,4);const e=new dh(10466502,.28);e.position.set(-4,2,-3),this.scene.add(t,e)}addGrid(){const t=new Nm(24,24,7174272,4936796);this.grid=t;const e=t.material;e.transparent=!0,e.opacity=.55,this.scene.add(t);const n=(s,r)=>{const o=new he;o.setAttribute("position",new Zt(s,3)),this.scene.add(new nr(o,new Se({color:r})))};n([-12,0,0,12,0,0],12610154),n([0,0,-12,0,0,12],6982336)}applyCamera(){const{cam:t}=this,e=Math.sin(t.phi),n=t.target.x+t.distance*e*Math.sin(t.theta),s=t.target.y+t.distance*Math.cos(t.phi),r=t.target.z+t.distance*e*Math.cos(t.theta),o=this.state.camOpts;this.persp.position.set(n,s,r),this.persp.lookAt(t.target),this.persp.near=o.near,this.persp.far=o.far,this.persp.setFocalLength(o.focal),this.ortho.position.set(n,s,r),this.ortho.lookAt(t.target);const a=(this.container.clientWidth||1)/(this.container.clientHeight||1),c=t.distance*.42;this.ortho.left=-c*a,this.ortho.right=c*a,this.ortho.top=c,this.ortho.bottom=-c,this.ortho.near=o.near,this.ortho.far=o.far,this.ortho.updateProjectionMatrix(),this.camera=o.ortho?this.ortho:this.persp}setView(t){const e=Vs[t];this.cam.theta=e.theta,this.cam.phi=e.phi,this.state.camOpts.ortho=e.ortho,this.applyCamera()}tumble(t,e){this.cam.theta-=t*.0088,this.cam.phi=Math.max(.05,Math.min(Math.PI-.05,this.cam.phi-e*.0088)),this.applyCamera()}pan(t,e){const n=new I().setFromMatrixColumn(this.camera.matrix,0),s=new I().setFromMatrixColumn(this.camera.matrix,1),r=this.cam.distance*.0016;this.cam.target.addScaledVector(n,-t*r).addScaledVector(s,e*r),this.applyCamera()}dolly(t){this.cam.distance=Math.max(au,Math.min(cu,this.cam.distance*t)),this.applyCamera()}dollyAbout(t,e){const n=Math.max(au,Math.min(cu,this.cam.distance*e)),s=n/this.cam.distance;this.cam.target.sub(t).multiplyScalar(s).add(t),this.cam.distance=n,this.applyCamera()}frameSelected(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;let e=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0],s=!1;for(const o of t){const a=this.views.get(o.id);if(!a)continue;const c=o.mesh.positions;for(let l=0;l<o.mesh.vertexCount;l++){const h=new I(c[l*3],c[l*3+1],c[l*3+2]).applyMatrix4(a.group.matrixWorld);e=[Math.min(e[0],h.x),Math.min(e[1],h.y),Math.min(e[2],h.z)],n=[Math.max(n[0],h.x),Math.max(n[1],h.y),Math.max(n[2],h.z)],s=!0}}if(!s)return;this.cam.target.set((e[0]+n[0])/2,(e[1]+n[1])/2,(e[2]+n[2])/2);const r=Math.max(n[0]-e[0],n[1]-e[1],n[2]-e[2]);this.cam.distance=Math.max(1.4,r*2.4),this.applyCamera()}viewOf(t){return this.views.get(t.id)}thumbnail(t,e=80){const n=this.views.get(t.id);if(!n)return"";const s=[];for(const m of this.views.values())s.push([m,m.group.visible]),m.group.visible=m===n;const r=this.grid.visible,o=this.overlay.visible;this.grid.visible=!1,this.overlay.visible=!1;const a=new Ms().setFromObject(n.group),c=a.getCenter(new I),l=Math.max(.001,a.getSize(new I).length()/2),h=new nn(35,1,.01,l*40);h.position.set(c.x+l*2.2,c.y+l*1.6,c.z+l*2.6),h.lookAt(c);const d=new wn(e,e),u=this.renderer.getRenderTarget();this.renderer.setRenderTarget(d),this.renderer.setClearColor(2896440,1),this.renderer.clear(),this.renderer.render(this.scene,h);const f=new Uint8Array(e*e*4);this.renderer.readRenderTargetPixels(d,0,0,e,e,f),this.renderer.setRenderTarget(u),this.renderer.setClearColor(0,0),d.dispose();for(const[m,x]of s)m.group.visible=x;this.grid.visible=r,this.overlay.visible=o;const p=document.createElement("canvas");p.width=e,p.height=e;const v=p.getContext("2d");if(!v)return"";const g=v.createImageData(e,e);for(let m=0;m<e;m++){const x=(e-1-m)*e*4;g.data.set(f.subarray(x,x+e*4),m*e*4)}return v.putImageData(g,0,0),p.toDataURL("image/png")}allViews(){return[...this.views.values()]}rebuildObject(t){const e=this.views.get(t.id);e&&(this.root.remove(e.group),ms(e.group));const n=sy(t,this.shadingAngle);this.root.add(n.group),this.views.set(t.id,n),this.applyDisplay(n)}syncAll(){const t=new Set(this.state.doc.objects.map(e=>e.id));for(const[e,n]of this.views)t.has(e)||(this.root.remove(n.group),ms(n.group),this.views.delete(e));for(const e of this.state.doc.objects)this.rebuildObject(e);this.rebuildOverlay()}get shadingAngle(){return this.state.display==="shaded"?0:this.state.smoothAngle}refreshPositions(t){const e=this.views.get(t.id);if(!e)return this.rebuildObject(t);sn(e.group,t.transform),e.group.updateMatrixWorld(),e.surface.geometry.dispose(),e.surface.geometry=tp(t.mesh,e.tri,this.shadingAngle),e.wire.geometry.dispose(),e.wire.geometry=ep(t.mesh,e.edges),e.points.geometry.dispose(),e.points.geometry=Ze(t.mesh.positions)}applyDisplay(t){const e=this.state.display,n=t.object===this.state.selected||this.state.also.has(t.object);t.surface.visible=e!=="wire",t.surface.material=e==="checker"?t.checker??=iy():Ke.surf,t.wire.visible=e==="wire"||e==="shadedWire"||n,t.wire.material=n?this.state.compMode==="object"?Ke.wireSel:Ke.wireComp:Ke.wire,t.points.visible=n&&this.state.compMode==="vertex",t.group.visible=t.object.visible}applyDisplayAll(){for(const t of this.views.values())this.applyDisplay(t)}softWeightsProvider=null;seamProvider=null;rebuildOverlay(){for(const r of this.overlay.children.slice())this.overlay.remove(r),ms(r);const t=this.state.selected,e=t?this.views.get(t.id):void 0;if(!t||!e)return;const n=t.mesh,s=this.seamProvider?.();if(s?.size){const r=[];for(const[o,a]of e.edges){const c=`${Math.min(o,a)}_${Math.max(o,a)}`;s.has(c)&&(r.push(n.positions[o*3],n.positions[o*3+1],n.positions[o*3+2]),r.push(n.positions[a*3],n.positions[a*3+1],n.positions[a*3+2]))}if(r.length){const o=new Dn(Ze(r),Ke.seam);sn(o,t.transform).renderOrder=3,this.overlay.add(o)}}if(this.state.comp.size){if(this.state.soft.strength>0&&this.state.compMode!=="object"&&this.softWeightsProvider){const r=[];for(const[o,a]of this.softWeightsProvider())a>.02&&a<.999&&r.push(n.positions[o*3],n.positions[o*3+1],n.positions[o*3+2]);if(r.length){const o=new dn(Ze(r),Ke.softPt);sn(o,t.transform).renderOrder=2,this.overlay.add(o)}}if(this.state.compMode==="vertex"){const r=[];for(const a of this.state.comp)r.push(n.positions[a*3],n.positions[a*3+1],n.positions[a*3+2]);const o=new dn(Ze(r),Ke.vertSel);sn(o,t.transform).renderOrder=4,this.overlay.add(o)}else if(this.state.compMode==="edge"){const r=[];for(const a of this.state.comp){const c=e.edges[a];c&&(r.push(n.positions[c[0]*3],n.positions[c[0]*3+1],n.positions[c[0]*3+2]),r.push(n.positions[c[1]*3],n.positions[c[1]*3+1],n.positions[c[1]*3+2]))}const o=new Dn(Ze(r),Ke.edgeSel);sn(o,t.transform).renderOrder=4,this.overlay.add(o)}else if(this.state.compMode==="face"){const r=[],o=[];for(const l of this.state.comp){if(l>=n.faceCount)continue;const h=n.faceVerts(l),d=r.length/3;for(const u of h)r.push(n.positions[u*3],n.positions[u*3+1],n.positions[u*3+2]);for(let u=1;u<h.length-1;u++)o.push(d,d+u,d+u+1)}const a=Ze(r);a.setIndex(o);const c=new we(a,Ke.faceSel);sn(c,t.transform).renderOrder=4,this.overlay.add(c)}}}resize(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.persp.aspect=t/e,this.persp.updateProjectionMatrix(),this.applyCamera()}start(){const t=()=>{this.frame=requestAnimationFrame(t),this.renderer.render(this.scene,this.camera)};t()}stop(){cancelAnimationFrame(this.frame)}}const je=[new I(1,0,0),new I(0,1,0),new I(0,0,1)],lu=3,hu=13,uu=23,_l=30,oy=40;function Jr(i){return i<0?null:i===_l||i<10?"move":i<20?"rotate":"scale"}const ay=1.8,Ri=16770688,fu=14862432,du=10149450;function fa(i){const t=i==="all";return{move:t||i==="move",rotate:t||i==="rotate",scale:t||i==="scale",arrow:1,ring:t?.68:1,cube:t?1.3:1}}function pu(i,t,e,n,s=64){const r=new cn().setFromUnitVectors(new I(0,0,1),t.clone().normalize()),o=[];for(let l=0;l<=s;l++){const h=l/s*Math.PI*2,d=new I(Math.cos(h)*e,Math.sin(h)*e,0).applyQuaternion(r).add(i);o.push(d.x,d.y,d.z)}const a=new he;a.setAttribute("position",new Zt(o,3));const c=new nr(a,new Se({color:n}));return c.renderOrder=6,c}function cy(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s,o=r?Math.max(0,Math.min(1,((i.x-t.x)*n+(i.y-t.y)*s)/r)):0;return Math.hypot(t.x+n*o-i.x,t.y+s*o-i.y)}class ly{constructor(t){this.host=t}group=new _n;hot=-1;signature="";toScreen(t){return this.host.toScreen(t)}scaleAt(t){const e=this.host.orthoDistance();return(e!==null?e*.09:this.host.camera().position.distanceTo(t)*.15)*this.host.manipSize()}clear(){for(const t of this.group.children.slice())this.group.remove(t),ms(t);this.signature=""}rebuild(t,e,n){if(!t){this.signature&&this.clear();return}const s=this.scaleAt(t),r=this.host.pivotEdit(),o=[e,this.hot,n,r?"pivot":"",t.x.toFixed(3),t.y.toFixed(3),t.z.toFixed(3),s.toFixed(3)].join("|");if(o===this.signature)return;this.clear(),this.signature=o;const a=fa(r?"move":e),c=d=>r?du:ny[d],l=d=>this.hot===d;for(let d=0;d<3;d++){const u=je[d];if(a.move||a.scale){const f=u.clone().multiplyScalar((a.scale?a.cube:a.arrow)*s).add(t),p=l(d)||l(20+d)?Ri:c(d),v=new he;v.setAttribute("position",new Zt([t.x,t.y,t.z,f.x,f.y,f.z],3));const g=new nr(v,new Se({color:p}));g.renderOrder=6,this.group.add(g)}if(a.move){const f=new we(new Yc(s*.075,s*.22,10),new bn({color:l(d)?Ri:c(d)}));f.quaternion.setFromUnitVectors(new I(0,1,0),u),f.position.copy(u.clone().multiplyScalar(a.arrow*s).add(t)),f.renderOrder=6,this.group.add(f)}if(a.scale){const f=new we(new Bi(s*.12,s*.12,s*.12),new bn({color:l(20+d)?Ri:c(d)}));f.position.copy(u.clone().multiplyScalar(a.cube*s).add(t)),f.renderOrder=6,this.group.add(f)}a.rotate&&this.group.add(pu(t,u,a.ring*s,l(10+d)?Ri:c(d)))}if(e==="rotate"&&!r){const d=new I().subVectors(this.host.camera().position,t).normalize();this.group.add(pu(t,d,s*1.18,l(hu)?Ri:12174283))}const h=e==="scale"&&!r?new we(new Bi(s*.14,s*.14,s*.14),new bn({color:l(uu)?Ri:fu})):new we(new Kc(s*.085,12,10),new bn({color:l(lu)||l(_l)?Ri:r?du:fu}));h.position.copy(t),h.renderOrder=6,this.group.add(h)}pick(t,e,n,s=1){if(!e)return-1;const o=this.host.pivotEdit()?"move":n,a=this.scaleAt(e),c=this.host.toScreen(e);if(Math.hypot(c.x-t.x,c.y-t.y)<16*s)return o==="scale"?uu:lu;const l=fa(o);let h=-1,d=1/0;const u=(f,p,v)=>{p<v&&p<d&&(d=p,h=f)};for(let f=0;f<3;f++){const p=je[f];if(l.scale){const v=this.host.toScreen(p.clone().multiplyScalar(l.cube*a).add(e));u(20+f,Math.hypot(v.x-t.x,v.y-t.y),16*s)}if(l.move){const v=this.host.toScreen(p.clone().multiplyScalar(.3*a).add(e)),g=this.host.toScreen(p.clone().multiplyScalar(l.arrow*a).add(e));u(f,cy(t,v,g),14*s)}}if(h>=0)return h;if(l.rotate){for(let f=0;f<3;f++)u(10+f,this.ringDistance(t,e,je[f],l.ring*a),12*s);if(o==="rotate"){const f=new I().subVectors(this.host.camera().position,e).normalize();u(hu,this.ringDistance(t,e,f,a*1.18),12*s)}}return h}ringDistance(t,e,n,s){const r=new cn().setFromUnitVectors(new I(0,0,1),n.clone().normalize());let o=1/0;for(let a=0;a<64;a++){const c=a/64*Math.PI*2,l=new I(Math.cos(c)*s,Math.sin(c)*s,0).applyQuaternion(r).add(e),h=this.host.toScreen(l);o=Math.min(o,Math.hypot(h.x-t.x,h.y-t.y))}return o}}function Qs(i,t,e){const n=new I().subVectors(t,i.origin),s=e.dot(e),r=e.dot(i.direction),o=i.direction.dot(i.direction),a=e.dot(n),c=i.direction.dot(n),l=s*o-r*r;return Math.abs(l)<1e-9?0:(r*c-o*a)/l}const hy={model:{g1:vi("強度","ソフト選択 強度",0,1,.01,"strength"),g2:vi("範囲","ソフト選択 範囲",.05,6,.05,"radius")},uv:{g1:vi("強度","ソフト選択 強度",0,1,.01,"strength"),g2:vi("範囲","ソフト選択 範囲",.05,6,.05,"radius")},sculpt:{g1:vi("強度","ブラシ強度",0,1,.01,"strength"),g2:vi("サイズ","ブラシサイズ",.05,6,.05,"radius")},material:{g1:vi("不透明","不透明度",0,1,.01,"strength"),g2:vi("サイズ","ブラシサイズ",.05,6,.05,"radius")}};function vi(i,t,e,n,s,r){return{label:i,full:t,min:e,max:n,step:s,get:o=>o.soft[r],set:(o,a)=>{o.soft[r]=a}}}class uy{doc=new dl;selected=null;comp=new Set;also=new Set;mode="model";compMode="object";tool="select";manip="all";display="shadedWire";manipSize=1;pivotEdit=!1;pivotOverride=null;mods={shift:"off",ctrl:"off",alt:"off"};symX=!1;fingerCam=!1;panelsHidden=!1;soft={strength:0,radius:1};toolOpts={extrudeDist:.35};vertexOpts={mergeDist:.05,extrudeWidth:.25};snap={kind:"grid",step:.5};snapOn=!1;snapKeyHeld=!1;uvSnap={kind:"grid",step:1/8};mirrorAxis=0;cut={snapStep:0,edgeFlow:!1};bevel={width:.1,segments:1};cameraBased=!1;rotateStep=0;preventNegativeScale=!0;lastEdit="multicut";lastPrimitive="cube";primitiveDefaults={};smoothAngle=30;camOpts={focal:35,near:.05,far:500,ortho:!1};viewName="パース";get cameras(){return this.doc.cameraBookmarks}gauge(t){return hy[this.mode][t]}modOn(t){return this.mods[t]!=="off"}get snapping(){return this.snapKeyHeld||this.snapOn}activeMods(){const t=[];return this.mods.shift!=="off"&&t.push("SHF"),this.mods.ctrl!=="off"&&t.push("CTL"),this.mods.alt!=="off"&&t.push("ALT"),t}select(t){this.selected!==t&&this.comp.clear(),this.also.clear(),this.selected=t,this.pivotOverride=null}selectedObjects(){return this.selected?[this.selected,...[...this.also].filter(t=>t!==this.selected)]:[]}addObject(t){if(!this.selected){this.selected=t;return}t!==this.selected&&(this.also.has(t)?this.also.delete(t):this.also.add(t))}}const fy=40;class dy{constructor(t){this.state=t}undoStack=[];redoStack=[];onChange=null;get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get undoLabel(){return this.undoStack.at(-1)?.label??null}get redoLabel(){return this.redoStack.at(-1)?.label??null}push(t){this.commit(t,this.snapshot())}snapshot(){return{objects:this.state.doc.objects.map(t=>({ref:t,name:t.name,kind:t.kind,parametric:t.parametric,params:{...t.params},transform:ei(t.transform),visible:t.visible,locked:t.locked,activeLevel:t.activeLevel,mesh:t.mesh.clone(),uv:t.uv?vc(t.uv):null,multires:t.multires.slice(),sculptLayers:t.sculptLayers.slice(),paintLayers:t.paintLayers.slice()})),selectedId:this.state.selected?.id??null,compMode:this.state.compMode,comp:[...this.state.comp]}}commit(t,e){this.undoStack.push({label:t,snap:e}),this.undoStack.length>fy&&this.undoStack.shift(),this.redoStack.length=0,this.onChange?.()}drop(){this.undoStack.pop(),this.onChange?.()}undo(){const t=this.undoStack.pop();return t?(this.redoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}redo(){const t=this.redoStack.pop();return t?(this.undoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}clear(){this.undoStack.length=0,this.redoStack.length=0,this.onChange?.()}restore(t){const e=this.state.doc;e.objects=t.objects.map(r=>{const o=r.ref;return o.name=r.name,o.kind=r.kind,o.parametric=r.parametric,o.params={...r.params},o.transform=ei(r.transform),o.visible=r.visible,o.locked=r.locked,o.activeLevel=r.activeLevel,o.mesh=r.mesh.clone(),o.uv=r.uv?vc(r.uv):null,o.multires=r.multires.slice(),o.sculptLayers=r.sculptLayers.slice(),o.paintLayers=r.paintLayers.slice(),o}),this.state.selected=t.selectedId?e.find(t.selectedId)??null:null,this.state.compMode=t.compMode,this.state.comp.clear();const n=this.state.selected?.mesh,s=!n||t.compMode==="object"?0:t.compMode==="vertex"?n.vertexCount:t.compMode==="face"?n.faceCount:1/0;for(const r of t.comp)r<s&&this.state.comp.add(r)}}const py="macbeth",my=1,bi="projects",Si="blobs";let zr=null;function np(){return zr||(zr=new Promise((i,t)=>{const e=indexedDB.open(py,my);e.onupgradeneeded=()=>{const n=e.result;n.objectStoreNames.contains(bi)||n.createObjectStore(bi,{keyPath:"id"}),n.objectStoreNames.contains(Si)||n.createObjectStore(Si)},e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error??new Error("IndexedDB を開けません"))}),zr)}function Ml(i,t,e){return np().then(n=>new Promise((s,r)=>{const o=n.transaction(i,t);let a;Promise.resolve(e(o)).then(c=>{a=c},r),o.oncomplete=()=>s(a),o.onerror=()=>r(o.error??new Error("IndexedDB の操作に失敗しました")),o.onabort=()=>r(o.error??new Error("IndexedDB の操作が中断されました"))}))}function mu(i){return new Promise((t,e)=>{i.onsuccess=()=>t(i.result),i.onerror=()=>e(i.error)})}async function gu(){try{return await np(),!0}catch{return!1}}async function gy(i,t){const e=Date.now(),n={...i,created:i.created??e,modified:e,size:t.byteLength};return await Ml([bi,Si],"readwrite",s=>{s.objectStore(bi).put(n),s.objectStore(Si).put(t.slice().buffer,n.id)}),n}async function vy(i){return await Ml([bi,Si],"readonly",async e=>{const n=await mu(e.objectStore(bi).get(i)),s=await mu(e.objectStore(Si).get(i));return n&&s?{record:n,bytes:new Uint8Array(s)}:null})}async function vu(i){await Ml([bi,Si],"readwrite",t=>{t.objectStore(bi).delete(i),t.objectStore(Si).delete(i)})}const Vr="__autosave__",xy=1200,_y="0.1.0";class My{constructor(t){this.state=t}timer=null;writing=!1;pending=!1;available=null;onError=null;onSaved=null;schedule(){this.timer!==null&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.timer=null,this.saveNow()},xy)}async saveNow(){if(this.writing){this.pending=!0;return}if(this.available===null&&(this.available=await gu()),!!this.available){this.writing=!0;try{const t=Zd(this.state.doc,{appVersion:_y}),e=await gy({id:Vr,name:"自動保存",thumbnail:"",autosave:!0},t);this.onSaved?.(e.modified)}catch(t){this.onError?.(t instanceof Error?t.message:"自動保存に失敗しました")}finally{this.writing=!1,this.pending&&(this.pending=!1,this.schedule())}}}async restore(){if(this.available===null&&(this.available=await gu()),!this.available)return!1;try{const t=await vy(Vr);if(!t)return!1;const{document:e}=jd(t.bytes);return e.objects.length?(this.state.doc=e,this.state.select(null),!0):!1}catch(t){return this.onError?.(t instanceof Error?t.message:"前回の状態を読み込めませんでした"),await vu(Vr).catch(()=>{}),!1}}async clear(){this.timer!==null&&clearTimeout(this.timer),this.timer=null,await vu(Vr).catch(()=>{})}}function ip(){return typeof window.showSaveFilePicker=="function"?"file-system-access":typeof navigator.canShare=="function"&&typeof navigator.share=="function"?"share":"download"}function yy(i){return i.endsWith(".mbz")?"application/zip":i.endsWith(".obj")?"text/plain":i.endsWith(".png")?"image/png":"application/octet-stream"}function by(i){return i.endsWith(".mbz")?{"application/zip":[".mbz"]}:i.endsWith(".obj")?{"text/plain":[".obj"]}:{"application/octet-stream":[`.${i.split(".").pop()}`]}}function xu(i,t){const e=URL.createObjectURL(i),n=document.createElement("a");n.href=e,n.download=t,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(e),2e3)}async function Hr(i,t){const e=new Blob([i],{type:yy(t)}),n=ip();if(n==="file-system-access")try{const s=await window.showSaveFilePicker({suggestedName:t,types:[{description:"macbeth",accept:by(t)}]}),r=await s.createWritable();return await r.write(e),await r.close(),{method:n,target:{handle:s,name:s.name},saved:!0}}catch(s){return s?.name==="AbortError"?{method:n,target:null,saved:!1}:(xu(e,t),{method:"download",target:{name:t},saved:!0})}if(n==="share"){const s=new File([e],t,{type:e.type});if(navigator.canShare?.({files:[s]}))try{return await navigator.share({files:[s],title:t}),{method:n,target:{name:t},saved:!0}}catch(r){if(r?.name==="AbortError")return{method:n,target:null,saved:!1}}}return xu(e,t),{method:"download",target:{name:t},saved:!0}}async function _u(i){if(typeof window.showOpenFilePicker=="function")try{const t=i.split(",").map(r=>r.trim()),[e]=await window.showOpenFilePicker({multiple:!1,types:[{description:"macbeth",accept:{"*/*":t}}]}),n=await e.getFile(),s=await n.arrayBuffer();return{name:n.name,bytes:new Uint8Array(s),text:await n.text(),handle:e}}catch(t){if(t?.name==="AbortError")return null}return new Promise(t=>{const e=document.createElement("input");e.type="file",e.accept=i,e.style.display="none",document.body.appendChild(e);let n=!1;const s=r=>{n||(n=!0,e.remove(),t(r))};e.addEventListener("change",async()=>{const r=e.files?.[0];if(!r)return s(null);const o=await r.arrayBuffer();s({name:r.name,bytes:new Uint8Array(o),text:new TextDecoder().decode(o)})}),window.addEventListener("focus",()=>setTimeout(()=>s(null),800),{once:!0}),e.click()})}function Sy(){switch(ip()){case"file-system-access":return"フォルダを選んで保存（同じファイルに上書きできます）";case"share":return"共有シートから「ファイル」App へ保存";default:return"ダウンロード"}}const wy=100;class Ey{session=null;get active(){return this.session!==null}begin(t,e,n){if(!e.length)return null;let s=0;for(const[o,a]of e){const c=t.mesh.getPosition(o),l=t.mesh.getPosition(a);s+=Math.hypot(c[0]-l[0],c[1]-l[1],c[2]-l[2])}const r=s/e.length||1;return this.session={object:t,source:t.mesh.clone(),edges:e,scale:r,startX:n},this.session}widthFromDrag(t,e){const n=t/wy*e*.5;return Math.max(e*.02,Math.min(e*.49,n))}apply(t){const e=this.session;if(!e)return null;const n=Lf(e.source,e.edges,t.width,t.segments);return n?(e.object.mesh=n.mesh,{faces:n.newFaces}):null}cancel(){const t=this.session;t&&(t.object.mesh=t.source,this.session=null)}keep(){return this.session}end(){this.session=null}}const Ty=30;class Cy{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}preview=null;get current(){return this.preview}snap(t,e){if(e)return .5;const n=this.state.cut.snapStep;if(n>0){const s=n/100;t=Math.round(t/s)*s}return Math.max(.02,Math.min(.98,t))}clear(){for(const t of this.group.children.slice())this.group.remove(t),ms(t);this.preview=null}update(t,e,n){if(this.clear(),!e)return null;const s=this.picker.pickEdge(e,t,Ty);if(s.edge<0)return null;const r=this.snap(s.t,n),[o,a]=e.edges[s.edge],c=Ef(e.object.mesh,o,a,r,this.state.cut.edgeFlow);if(!c)return null;this.preview={edge:s.edge,t:r,faceCount:c.faceCount};const l=[];for(const f of c.points)l.push(f[0],f[1],f[2]);const h=new nr(Ze(l),Ke.cutLine);sn(h,e.object.transform).renderOrder=5,this.group.add(h);const d=c.points[0],u=new dn(Ze([d[0],d[1],d[2]]),Ke.cutPt);return sn(u,e.object.transform).renderOrder=5,this.group.add(u),`エッジループ挿入 <kbd>${Math.round(r*100)}%</kbd> · ${c.faceCount} 面`+(this.state.cut.edgeFlow?" · エッジフロー":"")+" · <kbd>Shift</kbd> で 50%"}commit(t){const e=this.preview;if(!e||!t)return null;const[n,s]=t.edges[e.edge],r=Tf(t.object.mesh,n,s,e.t,this.state.cut.edgeFlow);return this.clear(),r?(t.object.mesh=r.mesh,{faceCount:r.faceCount}):null}}const Ay=22,Ry=16,Ds={vert:new on({color:16761963,size:9,sizeAttenuation:!1,transparent:!0,opacity:.75}),edge:new Se({color:16761963,transparent:!0,opacity:.8}),weld:new on({color:7139450,size:14,sizeAttenuation:!1}),snap:new on({color:7139450,size:11,sizeAttenuation:!1}),face:new bn({color:16761963,transparent:!0,opacity:.22,side:Xe,depthWrite:!1})};class Py{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}current="";clear(){if(this.current){for(const t of this.group.children.slice())this.group.remove(t),ms(t);this.current=""}}showVertex(t,e){if(this.setKey(`w${e}`))return;const n=t.object.mesh,s=new dn(Ze([n.positions[e*3],n.positions[e*3+1],n.positions[e*3+2]]),Ds.weld);this.add(s,t)}showWorldPoint(t,e,n){const s=`s${t.toFixed(4)},${e.toFixed(4)},${n.toFixed(4)}`;if(this.setKey(s))return;const r=new dn(Ze([t,e,n]),Ds.snap);r.renderOrder=3,this.group.add(r)}update(t,e){if(!e||this.state.compMode==="object")return this.clear();const n=e.object,s=n.mesh;if(this.state.compMode==="vertex"){const h=this.picker.pickVertex(e,t,Ay);if(h<0)return this.clear();if(this.setKey(`v${h}`))return;const d=new dn(Ze([s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]]),Ds.vert);this.add(d,e);return}if(this.state.compMode==="edge"){const h=this.picker.pickEdge(e,t,Ry);if(h.edge<0)return this.clear();if(this.setKey(`e${h.edge}`))return;const[d,u]=e.edges[h.edge],f=new Dn(Ze([s.positions[d*3],s.positions[d*3+1],s.positions[d*3+2],s.positions[u*3],s.positions[u*3+1],s.positions[u*3+2]]),Ds.edge);this.add(f,e);return}const r=this.picker.pickSurface(t);if(!r||r.object!==n)return this.clear();if(this.setKey(`f${r.face}`))return;const o=s.faceVerts(r.face),a=[],c=[];for(const h of o)a.push(s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]);for(let h=1;h<o.length-1;h++)c.push(0,h,h+1);const l=Ze(a);l.setIndex(c),this.add(new we(l,Ds.face),e)}setKey(t){return this.current===t?!0:(this.clear(),this.current=t,!1)}add(t,e){sn(t,e.object.transform).renderOrder=3,this.group.add(t)}}const Mu=22,yu=16,Ly=380,Iy=14,bu=4;function Ns(i,t,e){e?i.delete(t):i.add(t)}const Pn={changed:!1,objectChanged:!1};class Uy{constructor(t,e,n){this.state=t,this.picker=e,this.viewOf=n}lastClick=null;add(t){return this.state.modOn("shift")||t.shiftKey}sub(t){return this.state.modOn("ctrl")||t.ctrlKey||t.metaKey}click(t,e){if(this.state.compMode==="object"){const u=this.picker.pickSurface(t)?.object??null;if(u&&this.add(e))return this.state.addObject(u),this.lastClick=null,{changed:!0,objectChanged:!0};const f=u!==this.state.selected||this.state.also.size>0;return this.state.select(u),this.lastClick=null,{changed:f,objectChanged:f}}let n=this.state.selected;if(!n){const d=this.picker.pickSurface(t);if(!d)return Pn;this.state.select(d.object),n=d.object;const u=this.viewOf(n.id);if(u){const f=this.pickOne(t,e,u);this.lastClick={t:performance.now(),x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,hit:f,before:new Set}}return{changed:!0,objectChanged:!0}}const s=this.viewOf(n.id);if(!s)return Pn;const r=performance.now(),o=this.lastClick,a=this.probe(t,s);if(o!==null&&r-o.t<Ly&&Math.hypot(t.x-o.x,t.y-o.y)<Iy&&o.mode===this.state.compMode&&o.objectId===n.id&&a>=0&&o.hit===a&&o)return this.lastClick=null,this.double(t,e,s,o.before);const l=new Set(this.state.comp);!this.add(e)&&!this.sub(e)&&this.state.comp.clear();const h=this.pickOne(t,e,s);return this.lastClick={t:r,x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,hit:h,before:l},{changed:!0,objectChanged:!1}}probe(t,e){if(this.state.compMode==="vertex")return this.picker.pickVertex(e,t,Mu);if(this.state.compMode==="edge")return this.picker.pickEdge(e,t,yu).edge;if(this.state.compMode==="face"){const n=this.picker.pickSurface(t);return n&&n.object===e.object?n.face:-1}return-1}pickOne(t,e,n){const s=this.sub(e),r=this.state.comp,o=this.probe(t,n);return o>=0&&Ns(r,o,s),o}edgeIndex(t){const e=new Map;return t.edges.forEach((n,s)=>e.set(St(n[0],n[1]),s)),e}double(t,e,n,s){const r=n.object,o=r.mesh,a=this.add(e),c=this.sub(e),l=this.edgeIndex(n),h=u=>u.map(f=>l.get(St(f[0],f[1]))).filter(f=>f!==void 0),d=(u,f)=>{!a&&!c?this.state.comp.clear():this.state.comp=new Set(s);for(const p of u)Ns(this.state.comp,p,c);return{changed:!0,objectChanged:!1,message:`${f} — ${u.length}`}};if(this.state.compMode==="edge"){const u=this.picker.pickEdge(n,t,yu);if(u.edge<0)return Pn;const[f,p]=n.edges[u.edge];if(a&&s.size){const v=[...s][s.size-1],g=n.edges[v];if(g){const m=St(g[0],g[1]),x=St(f,p),y=jr(o,g[0],g[1]),_=_c(y,m,x);if(_)return d(h(_),"部分エッジループ");const S=Ed(o,g[0],g[1]),w=_c(S,m,x);if(w)return d(h(w),"部分エッジリング")}}return d(h(jr(o,f,p).edges),"エッジループ")}if(this.state.compMode==="face"){if(a||c)return{changed:!0,objectChanged:!1};const u=this.picker.pickSurface(t);return!u||u.object!==r?Pn:d(al(o,u.face),"シェル")}if(this.state.compMode==="vertex"){const u=this.picker.pickVertex(n,t,Mu);if(u<0)return Pn;if(a&&s.size){const p=[...s][s.size-1],v=n.edges.find(([g,m])=>g===p||m===p);if(v){const g=jr(o,v[0],v[1]),m=Cd(g),x=m.indexOf(p),y=m.indexOf(u);if(x>=0&&y>=0){const[_,S]=x<y?[x,y]:[y,x];return d(m.slice(_,S+1),"頂点列")}}}const f=o.vertexFaces().get(u);return f?.length?d(Td(o,f[0]),"シェル"):Pn}return Pn}marquee(t,e,n,s,r,o){const a={x:Math.min(t,n),y:Math.min(e,s)},c={x:Math.max(t,n),y:Math.max(e,s)};if(c.x-a.x<bu&&c.y-a.y<bu)return this.click(r,o);const l=p=>p.z<=1&&p.x>=a.x&&p.x<=c.x&&p.y>=a.y&&p.y<=c.y;if(this.state.compMode==="object"){let p=null;for(const g of this.state.doc.objects){const m=this.viewOf(g.id);if(m&&this.picker.vertsInRect(m,a.x,a.y,c.x,c.y).length){p=g;break}}const v=p!==this.state.selected;return this.state.select(p),{changed:v,objectChanged:v}}const h=this.state.selected,d=h?this.viewOf(h.id):void 0;if(!h||!d)return Pn;const u=this.sub(o);!this.add(o)&&!u&&this.state.comp.clear();const f=this.state.comp;if(this.state.compMode==="vertex")for(const p of this.picker.vertsInRect(d,a.x,a.y,c.x,c.y))Ns(f,p,u);else if(this.state.compMode==="edge")d.edges.forEach((p,v)=>{const g=h.mesh.getPosition(p[0]),m=h.mesh.getPosition(p[1]),x=this.picker.project(d,(g[0]+m[0])/2,(g[1]+m[1])/2,(g[2]+m[2])/2);l(x)&&this.picker.edgeVisible(d,p[0],p[1])&&Ns(f,v,u)});else if(this.state.compMode==="face")for(let p=0;p<h.mesh.faceCount;p++){const v=h.mesh.faceCenter(p),g=this.picker.project(d,v[0],v[1],v[2]);l(g)&&this.picker.faceVisible(d,p)&&Ns(f,p,u)}return{changed:!0,objectChanged:!1}}growOrShrink(t){const e=this.state.selected;if(!e||this.state.compMode==="object"||!this.state.comp.size)return{changed:!1,objectChanged:!1,message:"コンポーネントを選択してください"};const n=e.mesh,s=this.state.comp;if(this.state.compMode==="vertex"){const r=t?Mc(n,s):yc(n,s);s.clear();for(const o of r)s.add(o)}else if(this.state.compMode==="face"){const r=t?Rd(n,s):Pd(n,s);s.clear();for(const o of r)s.add(o)}else{const r=this.viewOf(e.id);if(!r)return Pn;const o=new Set;for(const c of s){const l=r.edges[c];l&&(o.add(l[0]),o.add(l[1]))}const a=new Set(t?Mc(n,o):yc(n,o));s.clear(),r.edges.forEach(([c,l],h)=>{a.has(c)&&a.has(l)&&s.add(h)})}return{changed:!0,objectChanged:!1,message:`${t?"選択を拡張":"選択を縮小"} — ${s.size}`}}selectBoundary(){const t=this.state.selected;if(!t)return{changed:!1,objectChanged:!1,message:"オブジェクトを選択してください"};const e=this.viewOf(t.id);if(!e)return Pn;const n=new Set(Ad(t.mesh).map(([s,r])=>St(s,r)));return n.size?(this.state.compMode="edge",this.state.comp.clear(),e.edges.forEach(([s,r],o)=>{n.has(St(s,r))&&this.state.comp.add(o)}),this.lastClick=null,{changed:!0,objectChanged:!1,message:`境界エッジ — ${this.state.comp.size}`}):{changed:!1,objectChanged:!1,message:"境界エッジがありません（閉じたメッシュです）"}}selectedVertices(){const t=this.state.selected;if(!t)return[];const e=this.viewOf(t.id),n=new Set;if(this.state.compMode==="vertex")for(const s of this.state.comp)n.add(s);else if(this.state.compMode==="edge"&&e)for(const s of this.state.comp){const r=e.edges[s];r&&(n.add(r[0]),n.add(r[1]))}else if(this.state.compMode==="face")for(const s of this.state.comp)for(const r of t.mesh.faceVerts(s))n.add(r);else for(let s=0;s<t.mesh.vertexCount;s++)n.add(s);return[...n]}reset(){this.lastClick=null}}const Dy=4e5;function Su(i,t,e){const n=new Map;for(const c of t)n.set(c,1);if(!e.enabled||e.strength<=0||!t.length)return{weights:n,skipped:!1};const s=i.vertexCount;if(s*t.length>Dy)return{weights:n,skipped:!0};const r=i.positions,{radius:o,strength:a}=e;for(let c=0;c<s;c++){if(n.get(c)===1)continue;let l=1/0;for(const h of t){const d=Math.hypot(r[c*3]-r[h*3],r[c*3+1]-r[h*3+1],r[c*3+2]-r[h*3+2]);d<l&&(l=d)}if(l<o){const h=1-l/o;n.set(c,a*(h*h*(3-2*h)))}}return{weights:n,skipped:!1}}function wu(i,t){const e=new Set(t),n=i.positions,s=(a,c,l)=>`${a.toFixed(3)==="-0.000"?"0.000":a.toFixed(3)},${c.toFixed(3)},${l.toFixed(3)}`,r=new Map;for(let a=0;a<i.vertexCount;a++)r.set(s(n[a*3],n[a*3+1],n[a*3+2]),a);const o=[];for(const a of e){const c=r.get(s(-n[a*3],n[a*3+1],n[a*3+2]));c!==void 0&&c!==a&&!e.has(c)&&o.push([a,c])}return o}function Eu(i){const{handle:t,pivot:e,ray:n}=i,s=Jr(t)??"move",r=t!==30&&t%10<3?t%10:-1,o=new Qn().setFromNormalAndCoplanarPoint(new I().subVectors(i.cameraPosition,e).normalize(),e);let a=null;if(r<0){const c=new I;n.intersectPlane(o,c)&&(a=c)}return{kind:s,label:i.label,handle:t,axis:r,pivot:e.clone(),target:i.target,start:i.point,pivotScreen:i.pivotScreen,t0:r>=0?Qs(n,e,je[r]):0,a0:Math.atan2(i.point.y-i.pivotScreen.y,i.point.x-i.pivotScreen.x),plane:o,planeStart:a}}const Ny=.001;function Fy(i,t,e,n,s,r={}){const o=r.snap;if(i.kind==="move"){let l;if(i.axis<0){const h=new I;if(!i.planeStart||!n.intersectPlane(i.plane,h))return;l=new I().subVectors(h,i.planeStart)}else{const h=je[i.axis];l=h.clone().multiplyScalar(Qs(n,i.pivot,h)-i.t0)}if(o){const h=o(i.pivot.clone().add(l));if(h){const d=h.sub(i.pivot);l=i.axis<0?d:je[i.axis].clone().multiplyScalar(d.dot(je[i.axis]))}}pa(i,t,(h,d)=>h.clone().addScaledVector(l,d),{position:l});return}if(i.kind==="rotate"){let l=Math.atan2(e.y-i.pivotScreen.y,e.x-i.pivotScreen.x)-i.a0;const h=r.rotateStep??0;if(h>0){const u=h*Math.PI/180;l=Math.round(l/u)*u}const d=i.axis<0?new I().subVectors(s,i.pivot).normalize():je[i.axis].clone();i.axis>=0&&d.dot(new I().subVectors(s,i.pivot))<0&&(l=-l),pa(i,t,(u,f)=>{const p=new cn().setFromAxisAngle(d,-l*f);return u.clone().sub(i.pivot).applyQuaternion(p).add(i.pivot)},{rotation:new cn().setFromAxisAngle(d,-l)});return}const a=r.preventNegativeScale===!1?-1/0:Ny;let c;if(i.axis<0)c=new I(1,1,1).multiplyScalar(Math.max(a,1+(e.x-i.start.x)*.008));else{const l=Qs(n,i.pivot,je[i.axis]),h=Math.max(a,1+(l-i.t0)/Math.max(1e-4,Math.abs(i.t0))*.6);c=new I(1,1,1),c.setComponent(i.axis,h)}pa(i,t,(l,h)=>{const d=l.clone().sub(i.pivot);return d.set(d.x*(1+(c.x-1)*h),d.y*(1+(c.y-1)*h),d.z*(1+(c.z-1)*h)),d.add(i.pivot)},{scale:c})}function da(i,t,e){const n=Math.max(.02,e.scale??1),s=e.move??new I,r=i.pivot,o=i.target,a=c=>c.clone().sub(r).multiplyScalar(n).add(r).add(s);if(o.kind==="object"){const c=o.transform,l=a(new I(c.position[0],c.position[1],c.position[2]));t.transform={position:[l.x,l.y,l.z],rotation:[...c.rotation],scale:[c.scale[0]*n,c.scale[1]*n,c.scale[2]*n]};return}for(let c=0;c<o.verts.length;c++){const l=o.world[c],h=l.clone().lerp(a(l),o.weights[c]).applyMatrix4(o.inverse);t.mesh.setPosition(o.verts[c],h.x,h.y,h.z)}for(const[c,l]of o.mirror){const h=t.mesh.getPosition(c);t.mesh.setPosition(l,-h[0],h[1],h[2])}}function pa(i,t,e,n){const s=i.target;if(s.kind==="object"){const r=s.transform,o=ei(r),a=new I(r.position[0],r.position[1],r.position[2]);if(n.position){const c=a.clone().add(n.position);o.position=[c.x,c.y,c.z]}if(n.rotation){const c=n.rotation.clone().multiply(new cn(r.rotation[0],r.rotation[1],r.rotation[2],r.rotation[3]));o.rotation=[c.x,c.y,c.z,c.w];const l=a.clone().sub(i.pivot).applyQuaternion(n.rotation).add(i.pivot);o.position=[l.x,l.y,l.z]}if(n.scale){const c=n.scale;o.scale=[r.scale[0]*c.x,r.scale[1]*c.y,r.scale[2]*c.z];const l=a.clone().sub(i.pivot);l.set(l.x*c.x,l.y*c.y,l.z*c.z),l.add(i.pivot),o.position=[l.x,l.y,l.z]}t.transform=o;return}for(let r=0;r<s.verts.length;r++){const o=e(s.world[r],s.weights[r]).applyMatrix4(s.inverse);t.mesh.setPosition(s.verts[r],o.x,o.y,o.z)}for(const[r,o]of s.mirror){const a=t.mesh.getPosition(r);t.mesh.setPosition(o,-a[0],a[1],a[2])}}function bt(i){const t=document.getElementById(i);if(!t)throw new Error(`#${i} が見つかりません`);return t}function nt(i,t,e){const n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}class Oy{constructor(t,e){this.stage=t,this.host=e}drag=null;attach(t){const e=t.querySelector(".phead");if(!e)return;const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("class","grip"),n.setAttribute("viewBox","0 0 8 12"),n.setAttribute("fill","currentColor");for(const[s,r]of[[2,2],[6,2],[2,6],[6,6],[2,10],[6,10]]){const o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx",String(s)),o.setAttribute("cy",String(r)),o.setAttribute("r","1"),n.appendChild(o)}e.insertBefore(n,e.firstChild),e.addEventListener("touchstart",s=>s.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",s=>this.start(s,t))}place(t,e){e==="float"?(t.classList.add("floating"),t.style.left="320px",t.style.top="90px",this.stage.appendChild(t)):(t.classList.remove("floating"),t.style.left="",t.style.top="",this.stage.querySelector(`[data-zone="${e}"]`)?.appendChild(t)),this.updateDockWidths()}updateDockWidths(){for(const t of this.stage.querySelectorAll(".dock"))t.classList.toggle("narrow",!!t.querySelector('.panel[data-panel="tools"]'))}start(t,e){t.preventDefault();const n=e.getBoundingClientRect();this.drag={panel:e,key:e.dataset.panel??"",dx:t.clientX-n.left,dy:t.clientY-n.top,zones:[],hot:null},this.showDropZones(),e.classList.add("floating"),this.stage.appendChild(e),this.move(t),window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.end),window.addEventListener("pointercancel",this.end)}move=t=>{const e=this.drag;if(!e)return;const n=this.stage.getBoundingClientRect();e.panel.style.left=`${t.clientX-n.left-e.dx}px`,e.panel.style.top=`${t.clientY-n.top-e.dy}px`;let s=null;for(const r of e.zones){const o=r.el.getBoundingClientRect(),a=t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom;r.el.classList.toggle("hot",a),a&&(s=r)}e.hot=s};end=()=>{window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.end),window.removeEventListener("pointercancel",this.end);const t=this.drag;t&&(t.hot?(this.place(t.panel,t.hot.zone),this.host.onZoneChange(t.key,t.hot.zone),this.host.onMessage(`${t.panel.querySelector(".phead span")?.textContent??""}を${t.hot.name}にドッキング`)):this.host.onZoneChange(t.key,"float"),this.hideDropZones(),this.drag=null,this.updateDockWidths(),setTimeout(()=>this.host.onLayoutChange(),0))};showDropZones(){const t=this.drag;if(!t)return;const e=this.stage.getBoundingClientRect(),n=[{zone:"left",name:"左",x:64,y:0,w:200,h:e.height},{zone:"rightTop",name:"右上",x:e.width-236,y:0,w:236,h:e.height*.62},{zone:"rightBottom",name:"右下",x:e.width-236,y:e.height*.62,w:236,h:e.height*.38}];for(const s of n){const r=nt("div","dropz");r.style.left=`${s.x}px`,r.style.top=`${s.y}px`,r.style.width=`${s.w}px`,r.style.height=`${s.h}px`,r.appendChild(nt("span",void 0,s.name)),this.stage.appendChild(r),t.zones.push({el:r,zone:s.zone,name:s.name})}}hideDropZones(){for(const t of this.stage.querySelectorAll(".dropz"))t.remove()}}const ky=180,By=420,Tu="macbeth.dockSize";class zy{constructor(t,e,n){this.stage=t,this.dockCol=e,this.onChange=n;try{const s=localStorage.getItem(Tu);s&&(this.sizes={...this.sizes,...JSON.parse(s)})}catch{}this.grip=document.createElement("div"),this.grip.className="dockgrip",this.stage.appendChild(this.grip),this.attachGrip(),this.apply(),window.addEventListener("resize",()=>this.apply())}grip;sizes={landscape:236,portrait:240};portrait=!1;wide=!1;apply(){const t=this.stage.getBoundingClientRect(),e=t.height>t.width,n=t.width>=1200,s=e!==this.portrait||n!==this.wide;this.portrait=e,this.wide=n,this.stage.classList.toggle("portrait",e),this.setSize(this.size),this.grip.classList.toggle("vertical",!e),this.grip.classList.toggle("horizontal",e),this.placeGrip(),s&&this.onChange()}get size(){return this.portrait?this.sizes.portrait:this.sizes.landscape}setSize(t){const e=Math.max(ky,Math.min(By,t));this.portrait?this.sizes.portrait=e:this.sizes.landscape=e,this.stage.style.setProperty("--dockw",`${e}px`),this.placeGrip()}placeGrip(){const t=!this.dockCol.querySelector(".panel");if(this.grip.hidden=t,t)return;const e=this.stage.getBoundingClientRect(),n=this.dockCol.getBoundingClientRect();this.portrait?(this.grip.style.top=`${n.top-e.top-3}px`,this.grip.style.left=""):(this.grip.style.left=`${n.left-e.left-3}px`,this.grip.style.top="")}attachGrip(){let t=!1;this.grip.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),this.grip.addEventListener("pointerdown",e=>{e.preventDefault(),t=!0,this.grip.classList.add("active"),this.grip.setPointerCapture(e.pointerId)}),this.grip.addEventListener("pointermove",e=>{if(!t)return;const n=this.stage.getBoundingClientRect();this.setSize(this.portrait?n.bottom-e.clientY:n.right-e.clientX),this.onChange()});for(const e of["pointerup","pointercancel"])this.grip.addEventListener(e,()=>{if(t){t=!1,this.grip.classList.remove("active");try{localStorage.setItem(Tu,JSON.stringify(this.sizes))}catch{}this.onChange()}})}get isWide(){return this.stage.getBoundingClientRect().width>=1200}get isPortrait(){return this.portrait}}class Cu{constructor(t,e,n,s,r,o,a){this.state=t,this.which=n,this.labelId=s,this.valueId=r,this.onInput=o,this.onCommit=a,this.root=bt(e),this.fill=this.root.querySelector(".fill"),this.knob=this.root.querySelector(".knob"),this.attach(),this.paint()}root;fill;knob;active=!1;paint(){const t=this.state.gauge(this.which),e=t.get(this.state),n=(e-t.min)/(t.max-t.min);this.fill.style.height=`${n*100}%`,this.knob.style.bottom=`calc(${n*100}% - 1px)`,bt(this.labelId).textContent=t.label,this.root.title=t.full,bt(this.valueId).textContent=e.toFixed(2),this.root.dataset.off=this.which==="g1"&&e<=0?"true":"false"}setFromY(t){const e=this.state.gauge(this.which),n=this.root.getBoundingClientRect(),s=Math.max(0,Math.min(1,1-(t-n.top)/n.height)),r=e.min+s*(e.max-e.min);e.set(this.state,Math.round(r/e.step)*e.step),this.paint(),this.onInput()}attach(){const t=this.root;t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>{e.preventDefault(),this.active=!0,t.setPointerCapture(e.pointerId),this.setFromY(e.clientY)}),t.addEventListener("pointermove",e=>{this.active&&this.setFromY(e.clientY)});for(const e of["pointerup","pointercancel"])t.addEventListener(e,()=>{this.active&&(this.active=!1,this.onCommit())})}}const Vy={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"},Hy={wire:"WIRE",shaded:"SHADED",shadedWire:"SHADED+WIRE",smooth:"SMOOTH",checker:"CHECKER"};class Gy{constructor(t){this.state=t}toastTimer=null;uvNote=null;refreshStats(){const t=this.state.doc.stats();let e=0;for(const a of this.state.doc.objects)e+=a.mesh.stats().edges;bt("hudStats").innerHTML=`<i>Verts</i><span>${t.vertices}</span><i>Edges</i><span>${e}</span><i>Faces</i><span>${t.faces}</span><i>Tris</i><span>${t.triangles}</span>`;const n=this.state.activeMods(),s=n.length?` · <b>${n.join(" ")}</b>`:"";if(this.state.mode==="uv"&&this.uvNote){const a=this.uvNote;bt("hudMode").innerHTML=`UV · <b>${a.unit}</b>${s}<br>島 ${a.charts} · 伸び ×${a.maxStretch.toFixed(2)}`+(this.state.selected?` · ${this.state.selected.name}`:"");return}const r=Vy[this.state.compMode],o=Hy[this.state.display];bt("hudMode").innerHTML=`${this.state.tool}${this.state.symX?" · 対称X":""}`+(this.state.pivotEdit?" · <b>ピボット編集</b>":"")+` · <b>${r}</b>`+(this.state.comp.size?` · ${this.state.comp.size}`:"")+s+`<br>${o} · ${this.state.viewName}${this.state.camOpts.ortho?" · ORTHO":""}`+(this.state.selected?` · ${this.state.selected.name}`:"")}toast(t){bt("hudHint").innerHTML=t,this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.defaultHint(),2800)}defaultHint(){this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=null,bt("hudHint").innerHTML=(this.state.fingerCam?"指1本 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>":"指1本 メッシュ上 <kbd>ツール</kbd> / 外 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>")+" · 指2本 <kbd>パン / ズーム</kbd><br><b>指3本 つまむ <kbd>選択を拡大縮小</kbd> · 上下 <kbd>Y へ移動</kbd> · 左右 <kbd>X / Z へ移動</kbd></b><br>長押し 指1本 <kbd>マーキング</kbd> 指2本 <kbd>カメラ / 編集</kbd> 指3本 <kbd>カメラ</kbd> · ダブルタップ 指2本 <kbd>戻る</kbd> 指3本 <kbd>進む</kbd><br><kbd>SHF</kbd> + 移動 <kbd>押し出し</kbd> · <kbd>SHF</kbd> + <kbd>CTL</kbd> + 移動 <kbd>スライド</kbd> · <kbd>D</kbd> <kbd>ピボット</kbd> · <kbd>+</kbd>/<kbd>-</kbd> <kbd>マニピュレータの大きさ</kbd><br>スナップ <kbd>ツール列</kbd> または <kbd>X</kbd>/<kbd>V</kbd>/<kbd>C</kbd> を押している間 · <kbd>F</kbd> <kbd>矩形 / フレーム</kbd><br>マウス <kbd>Alt+左 タンブル</kbd> <kbd>Alt+中 パン</kbd> <kbd>Alt+右 ズーム</kbd>"}setSaveNote(t){bt("saveNote").textContent=t}}const H={move:'<path d="M12 3v18M3 12h18M12 3l-2.6 2.6M12 3l2.6 2.6M12 21l-2.6-2.6M12 21l2.6-2.6M3 12l2.6-2.6M3 12l2.6 2.6M21 12l-2.6-2.6M21 12l-2.6 2.6"/>',rotate:'<path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4"/><path d="M20.5 3.6v5h-5"/>',scale:'<path d="M5 19 18 6"/><path d="M12.5 6H18v5.5"/><rect x="3.2" y="15.2" width="5.6" height="5.6" rx=".8"/>',multicut:'<circle cx="5.5" cy="5.5" r="2.3"/><circle cx="5.5" cy="18.5" r="2.3"/><path d="M7.4 6.8 20 18M7.4 17.2 20 6"/>',extrude:'<path d="M4.5 13.5h8v7h-8z"/><path d="m4.5 13.5 4-4h8v7M12.5 13.5l4-4"/><path d="M20 3v5m0-5-1.8 1.8M20 3l1.8 1.8"/>',prim:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',camera:'<path d="M3.4 8.4h3.2l1.6-2.4h7.6l1.6 2.4h3.2v9.8a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1z"/><circle cx="12" cy="13" r="3.4"/>',vObj:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/>',vVert:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="6" r="2" fill="currentColor"/><circle cx="6" cy="18" r="2" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/>',vEdge:'<rect x="6" y="6" width="12" height="12"/><path d="M6 6h12" stroke-width="3.4"/>',vFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".45"/>',vVertFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".2"/><circle cx="8.6" cy="8.6" r="2.1" fill="currentColor"/>',vMulti:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="1.9" fill="currentColor"/><path d="M6 18h12" stroke-width="3"/>',wire:'<rect x="4" y="4" width="16" height="16"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',shaded:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".5"/>',shadedWire:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".3"/><path d="M4 12h16M12 4v16"/>',smooth:'<circle cx="12" cy="12" r="8.6" fill="currentColor" fill-opacity=".5"/><path d="M8 15.4a6 6 0 0 1 5-6.6"/>',sym:'<path d="M12 3v18" stroke-dasharray="2.4 2.4"/><path d="M9.4 7 4.5 12l4.9 5zM14.6 7l4.9 5-4.9 5z"/>',xform:'<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="6.5"/><rect x="16.6" y="16.6" width="4.2" height="4.2"/><path d="M12 3l-2 2M12 3l2 2M3 12l2-2M3 12l2 2"/>',snap:'<path d="M6 20V10a6 6 0 0 1 12 0v10"/><path d="M6 15h4v5H6zM14 15h4v5h-4z"/>',pivot:'<circle cx="12" cy="12" r="2.2" fill="currentColor"/><path d="M12 2.6v5.6M12 15.8v5.6M2.6 12h5.6M15.8 12h5.6"/><circle cx="12" cy="12" r="6.6" stroke-dasharray="2.2 2.4"/>',rename:'<path d="M4 20h16"/><path d="M15.4 4.6 19 8.2 8.6 18.6 4.4 19.6l1-4.2z"/>',eye:'<path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',eyeOff:'<path d="M4.6 6.4C3.1 8 2.5 12 2.5 12S6 18.2 12 18.2c1.5 0 2.8-.4 3.9-.9"/><path d="M9.6 6.1c.8-.2 1.6-.3 2.4-.3 6 0 9.5 6.2 9.5 6.2s-.8 1.5-2.3 3"/><path d="M3.5 3.5l17 17"/>',lock:'<rect x="5" y="10.5" width="14" height="9.5" rx="1.2"/><path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7"/>',lockOpen:'<rect x="5" y="10.5" width="14" height="9.5" rx="1.2"/><path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.4-.9"/>',dup:'<rect x="3.6" y="3.6" width="12" height="12" rx="1"/><path d="M8.4 20.4h12v-12"/>',del:'<path d="M4 6.6h16M9.4 6.6V4.4h5.2v2.2M6.4 6.6l1 13.2a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l1-13.2"/>',frame:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3"/>',mModel:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',mUV:'<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="1"/><path d="M3.4 12h17.2M12 3.4v17.2" stroke-dasharray="2.6 2.2"/>',mSculpt:'<path d="M16.4 3.6 20.4 7.6 9.6 18.4l-5.2 1.2 1.2-5.2z"/><path d="m14.4 5.6 4 4"/>',mMaterial:'<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a8.6 8.6 0 0 1 0 17.2z" fill="currentColor" fill-opacity=".45"/><path d="M3.4 12h17.2"/>',pCube:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',pSphere:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',pCylinder:'<ellipse cx="12" cy="5.6" rx="7" ry="2.8"/><path d="M5 5.6v12.8M19 5.6v12.8"/><path d="M5 18.4a7 2.8 0 0 0 14 0"/>',pCone:'<path d="M12 3 19 18.4M12 3 5 18.4"/><ellipse cx="12" cy="18.4" rx="7" ry="2.8"/>',pTorus:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><ellipse cx="12" cy="12" rx="3.6" ry="1.9"/>',pPlane:'<path d="M2.6 16.4 9.4 6.6h12L14.6 16.4z"/><path d="M6 11.5h12"/>',pDisk:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><path d="M2.8 12h18.4"/>',pPlatonic:'<path d="m12 2.8 8.8 6.4-3.4 10.4H6.6L3.2 9.2z"/><path d="M12 2.8v16.8M3.2 9.2l13.8 10M20.8 9.2 7 19.2"/>'};function Lc(i,t=18,e=1.6){return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">${i}</svg>`}function Au(i,t){const e=nt("div","panel");e.dataset.panel=i;const n=nt("div","phead");n.appendChild(nt("span",void 0,t));const s=nt("div","pbody");return e.append(n,s),{panel:e,body:s}}function _e(i,t){const e=nt("div","sect"),n=nt("div","sect-h");return n.appendChild(nt("span",void 0,i)),t&&n.appendChild(nt("b",void 0,t)),e.appendChild(n),e}function Wy(i,t){const e=nt("div","sect fold"),n=document.createElement("details"),s=document.createElement("summary");s.className="sect-h",s.appendChild(nt("span",void 0,i)),s.appendChild(nt("b",void 0,t)),n.appendChild(s);const r=nt("div");return n.appendChild(r),e.appendChild(n),{wrap:e,body:r}}function Ge(i,t){const e=nt("div","row");e.appendChild(nt("label",void 0,t.label));const n=nt("input","num");n.type="text",n.readOnly=!0;const s=o=>{n.value=t.format?t.format(o):o.toFixed(t.step<1?2:0)};s(t.value),e.appendChild(n);const r=nt("input","slider");r.type="range",r.min=String(t.min),r.max=String(t.max),r.step=String(t.step),r.value=String(t.value),r.addEventListener("input",()=>{const o=Number(r.value);s(o),t.onInput(o)});for(const o of["change","pointerup"])r.addEventListener(o,()=>t.onCommit?.());e.appendChild(r),i.appendChild(e)}function kn(i,t,e,n){const s=nt("button","chk");s.setAttribute("aria-pressed",String(e)),s.appendChild(nt("i")),s.appendChild(nt("span",void 0,t)),s.addEventListener("click",()=>{const r=s.getAttribute("aria-pressed")!=="true";s.setAttribute("aria-pressed",String(r)),n(r)}),i.appendChild(s)}function Xy(i,t){const e=_e("パッキング","PACK");Ge(e,{label:"余白",value:i.packing.marginTexels,min:2,max:64,step:1,format:r=>`${Math.round(r)} tx`,onInput:r=>t.onUvPackingChange("marginTexels",Math.round(r))});const n=nt("div","row"),s=nt("div","segmented");for(const r of[512,1024,2048,4096]){const o=nt("button","seg");o.textContent=String(r),o.setAttribute("aria-pressed",String(i.packing.textureSize===r)),o.addEventListener("click",()=>t.onUvPackingChange("textureSize",r)),s.appendChild(o)}return n.appendChild(s),e.appendChild(n),kn(e,"90° 回転を許す",i.packing.allowRotate,r=>t.onUvPackingChange("allowRotate",r)),e.appendChild(nt("div","hint",`余白はテクスチャのテクセルで持ちます。どの大きさでも最低 5px は空きます。
90° 回転は島の向き（上が +V）を崩すので、既定は切ってあります。`)),e}function Ws(i,t,e,n,s){const r=nt("div","row triple");r.appendChild(nt("label",void 0,t));for(let o=0;o<3;o++){const a=nt("input","num");a.type="text",a.inputMode="decimal",a.value=e[o].toFixed(n),a.addEventListener("change",()=>{const c=Number(a.value);Number.isFinite(c)?s(o,c):a.value=e[o].toFixed(n)}),r.appendChild(a)}i.appendChild(r)}function $y(i,t){const e=i.selected;if(!e)return null;const n=_e("トランスフォーム","TRANSFORM");return Ws(n,"移動",e.transform.position,3,(s,r)=>t.onTransformInput(e,"position",s,r)),Ws(n,"回転",i.rotationEuler,1,(s,r)=>t.onTransformInput(e,"rotation",s,r)),Ws(n,"スケール",e.transform.scale,3,(s,r)=>t.onTransformInput(e,"scale",s,r)),n.appendChild(nt("div","hint","回転は度で入れます。数値を打って Enter で確定します。")),n}function qy(i,t){const e={all:"ユニバーサル",move:"移動",rotate:"回転",scale:"スケール"}[i.manip],n=_e(e,"MANIPULATOR");if(Ge(n,{label:"大きさ",value:i.manipSize,min:.5,max:2,step:.05,format:s=>`×${s.toFixed(2)}`,onInput:s=>t.onManipSizeChange(s)}),kn(n,"ピボットを移動（D）",i.pivotEdit,()=>t.onPivotEditToggle()),i.manip==="rotate"||i.manip==="all"){const s=nt("div","row");s.appendChild(nt("label",void 0,"刻み"));const r=nt("div","segmented");for(const[o,a]of[[0,"なし"],[5,"5°"],[15,"15°"],[45,"45°"],[90,"90°"]]){const c=nt("button","seg");c.textContent=a,c.setAttribute("aria-pressed",String(i.rotateStep===o)),c.addEventListener("click",()=>t.onRotateStepChange(o)),r.appendChild(c)}s.appendChild(r),n.appendChild(s)}return(i.manip==="scale"||i.manip==="all")&&kn(n,"負のスケールを防ぐ",i.preventNegativeScale,s=>t.onPreventNegativeScaleChange(s)),n.appendChild(nt("div","hint",`長押しで 移動 / 回転 / スケール を切り替えます。
ピボットの移動中は、メッシュではなくピボットだけが動きます。`)),n}function Ru(i,t){const e=_e("選択","SELECT");return kn(e,"カメラベース選択",i.cameraBased,n=>t.onCameraBasedChange(n)),e.appendChild(nt("div","hint",`オンにすると、カメラから見えているものだけを選びます。
裏側の頂点やエッジは、タップでも矩形でも拾いません。`)),e}function Yy(i,t){const e=_e("マルチカット","MULTI CUT");return Ge(e,{label:"ステップ % スナップ",value:i.cut.snapStep,min:0,max:50,step:5,format:n=>n?`${Math.round(n)}%`:"オフ",onInput:n=>t.onCutChange("snapStep",n)}),kn(e,"エッジフロー",i.cut.edgeFlow,n=>t.onCutChange("edgeFlow",n)),e.appendChild(nt("div","hint",`ホバーで入る位置を先に見せます。Shift で 50% に固定。
エッジフローは頂点法線による三次補間で、ループをサーフェスに沿わせます。`)),e}function Ky(i,t){const e=_e("ベベル","BEVEL");return Ge(e,{label:"幅",value:i.bevel.width,min:.005,max:2,step:.005,format:n=>n.toFixed(3),onInput:n=>t.onBevelChange("width",n)}),Ge(e,{label:"セグメント",value:i.bevel.segments,min:1,max:8,step:1,onInput:n=>t.onBevelChange("segments",n)}),e.appendChild(nt("div","hint",i.bevelActive?`確定したあとでも、ここを動かすとかけ直します。
別の操作をすると確定します。`:`エッジを選んで左右にドラッグすると幅が決まります。
セグメント 1 で面取り、2 以上で丸めになります。`)),e}function Zy(i,t){const e=_e("押し出し","EXTRUDE");return Ge(e,{label:"距離",value:i.extrudeDist,min:.05,max:3,step:.05,onInput:n=>t.onExtrudeDistChange(n)}),e.appendChild(nt("div","hint",`編集メニューの「押し出し」で使う距離です。
SHF を押しながらドラッグする場合は距離ではなく動かした量になります。`)),e}function jy(){const i=_e("ブリッジ","BRIDGE");return i.appendChild(nt("div","hint",`境界のエッジ列を 2 つ選んで実行します。数が同じでないと繋げません。
分割数はまだ 1 だけです。`)),i}function Jy(){const i=_e("コネクト","CONNECT");return i.appendChild(nt("div","hint",`同じ面にある頂点どうしを結んで面を分けます。
エッジを選んだときは中点を作ってから結びます。`)),i}function Qy(i,t){const e=_e(`スナップ${i.snap.active?"（効いています）":""}`,"SNAP"),n=nt("div","row"),s=nt("div","segmented");for(const[r,o]of[["grid","グリッド  X"],["vertex","頂点  V"],["edge","カーブ  C"],["surface","面"]]){const a=nt("button","seg");a.textContent=o,a.setAttribute("aria-pressed",String(i.snap.kind===r)),a.addEventListener("click",()=>t.onSnapChange("kind",r)),s.appendChild(a)}return n.appendChild(s),e.appendChild(n),Ge(e,{label:"グリッドの刻み",value:i.snap.step,min:.05,max:2,step:.05,onInput:r=>t.onSnapChange("step",r)}),e.appendChild(nt("div","hint",`ツール列のスナップがオンのとき、または X / V / C を押している間だけ効きます。
移動のときだけ働き、寄せ先は緑で光ります。`)),e}function tb(i,t){const e=_e("ミラー","MIRROR"),n=nt("div","row"),s=nt("div","segmented");for(const[r,o]of[[0,"X"],[1,"Y"],[2,"Z"]]){const a=nt("button","seg");a.textContent=o,a.setAttribute("aria-pressed",String(i.mirrorAxis===r)),a.addEventListener("click",()=>t.onMirrorAxisChange(r)),s.appendChild(a)}return n.appendChild(s),e.appendChild(n),e.appendChild(nt("div","hint",`編集メニュー（オブジェクト）の「ミラー」で使う軸です。
境目の頂点は「マージ距離」で溶接します。`)),e}function ma(i,t){const e=_e("頂点","VERTEX");return Ge(e,{label:"マージ距離",value:i.vertex.mergeDist,min:.001,max:.5,step:.001,format:n=>n.toFixed(3),onInput:n=>t.onVertexOptChange("mergeDist",n)}),Ge(e,{label:"押し出しの太さ",value:i.vertex.extrudeWidth,min:.05,max:.6,step:.01,onInput:n=>t.onVertexOptChange("extrudeWidth",n)}),e.appendChild(nt("div","hint",`マージ距離は「距離でマージ」で使うしきい値です。
押し出しの太さは、尖らせたときの根元の広がり（辺の長さに対する割合）です。`)),e}function eb(i,t){const e=_e("ソフト選択","SOFT SELECT");return Ge(e,{label:"強度",value:i.soft.strength,min:0,max:1,step:.01,onInput:n=>t.onSoftChange("strength",n)}),Ge(e,{label:"範囲",value:i.soft.radius,min:.05,max:6,step:.05,onInput:n=>t.onSoftChange("radius",n)}),e}function Pu(i,t){const e=i.selected;if(e&&e.parametric&&Sn[e.kind]){const o=Sn[e.kind],a=_e("入力ノード",o.en.toUpperCase()),c=nt("div","attr-title",e.name);c.appendChild(nt("span",void 0,o.en)),a.appendChild(c);for(const l of o.params)Ge(a,{label:l.label,value:e.params[l.key]??l.value,min:l.min,max:l.max,step:l.step,onInput:h=>t.onParamInput(e,l.key,h),onCommit:()=>t.onParamCommit(e,`${l.label} を変更`)});return a.appendChild(nt("div","hint",`パラメトリックなので、値を変えると作り直されます。
編集すると通常のメッシュになります。`)),a}const n=i.nextPrimitive,s=Sn[n],r=_e(`次の${s?.label??n}`,(s?.en??n).toUpperCase());if(!s)return r;for(const o of s.params)Ge(r,{label:o.label,value:i.nextPrimitiveParams[o.key]??o.value,min:o.min,max:o.max,step:o.step,onInput:a=>t.onDefaultParamChange(n,o.key,a)});if(r.appendChild(nt("div","hint","長押しのメニューから追加すると、この値で作られます。")),e){const o=e.mesh.stats();r.appendChild(nt("div","attr-title",e.name)),r.appendChild(nt("div","hint",`頂点 ${o.vertices} · エッジ ${o.edges} · 面 ${o.faces}`))}return r}function nb(i,t){const e=_e("表示","DISPLAY");return Ge(e,{label:"スムージング角度",value:i.smoothAngle,min:0,max:180,step:1,format:n=>`${Math.round(n)}°`,onInput:n=>t.onSmoothAngleChange(n)}),e.appendChild(nt("div","hint","長押しで ワイヤ / シェード / シェード + ワイヤ / スムース を選べます（4〜7）。")),e}function Lu(i,t){const e=_e("カメラ","CAMERA"),n=nt("div","hint"),s=a=>{const c=2*Math.atan(24/(2*a))*180/Math.PI;n.textContent=`アングル オブ ビュー  ${c.toFixed(2)}°
フィルム ゲート  35mm アカデミー`},r=(a,c,l,h,d)=>{Ge(e,{label:a,value:i.cam[c],min:l,max:h,step:d,format:u=>String(d<1?Number(u.toFixed(2)):Math.round(u)),onInput:u=>{t.onCamOptChange(c,u),c==="focal"&&s(u)}})};r("焦点距離","focal",10,200,1),r("ニア クリップ","near",.01,1,.01),r("ファー クリップ","far",50,2e3,10),s(i.cam.focal),e.appendChild(n),kn(e,"平行投影",i.cam.ortho,a=>t.onCamOrthoChange(a));const o=nt("button","act","初期設定に戻す");return o.addEventListener("click",()=>t.onCamReset()),e.appendChild(o),e.appendChild(nt("div","hint","焦点距離 35mm・ニア 0.05・ファー 500・パースに戻します。")),e}function ib(i,t){const e=[Xy(i,t)],n=Wy("詳細（自動 UV・方式）","ADVANCED");e.push(n.wrap);const s=_e("展開","UNFOLD"),r=nt("div","row"),o=nt("div","segmented");for(const[l,h]of[["none","取り込んだまま"],["lscm","LSCM"],["projection","投影"]]){const d=nt("button","seg");d.textContent=h,d.setAttribute("aria-pressed",String(i.method===l)),d.addEventListener("click",()=>t.onUvMethodChange(l)),o.appendChild(d)}r.appendChild(o),s.appendChild(r),s.appendChild(nt("div","hint",`「取り込んだまま」はメッシュが持っている UV をそのまま見せます。
「展開」を押すと LSCM に切り替わります。`)),n.body.appendChild(s);const a=_e("自動 UV","AUTO");Ge(a,{label:"角度",value:i.auto.angle,min:10,max:180,step:1,format:l=>`${Math.round(l)}°`,onInput:l=>t.onUvAutoChange("angle",l)}),kn(a,"ハードエッジ",i.auto.useHardEdges,l=>t.onUvAutoChange("useHardEdges",l)),kn(a,"クリース",i.auto.useCreases,l=>t.onUvAutoChange("useCreases",l)),kn(a,"ポリグループ",i.auto.usePolygroups,l=>t.onUvAutoChange("usePolygroups",l)),kn(a,"対称 X",i.auto.symmetric,l=>t.onUvAutoChange("symmetric",l));const c=nt("button","act","自動 UV を実行");return c.addEventListener("click",()=>t.onUvAutoRun()),a.appendChild(c),a.appendChild(nt("div","hint",`角度・ハードエッジ・クリース・ポリグループで切れ目を置き、
大きすぎる島と閉じた island を割ってから開きます。手で動かした分は捨てます。`)),n.body.appendChild(a),e}function sb(i,t,e){const n=_e(`UV スナップ${t.snap.active?"（効いています）":""}`,"SNAP"),s=nt("div","row"),r=nt("div","segmented");for(const[o,a,c]of[["grid","1/8",1/8],["grid","1/16",1/16],["grid","1/32",1/32],["vertex","UV 頂点",0]]){const l=nt("button","seg");l.textContent=a;const h=o==="vertex"?i.snapKind==="vertex":i.snapKind==="grid"&&Math.abs(i.snapStep-c)<1e-9;l.setAttribute("aria-pressed",String(h)),l.addEventListener("click",()=>{e.onUvSnapChange("kind",o),o==="grid"&&e.onUvSnapChange("step",c)}),r.appendChild(l)}return s.appendChild(r),n.appendChild(s),n}function rb(i,t,e,n,s){if(i.textContent="",!t.length){i.appendChild(nt("div","empty",`オブジェクトがありません
ツール列から追加してください`));return}for(let r=t.length-1;r>=0;r--){const o=t[r],a=nt("div","lyitem"),c=nt("div","lyrow");c.setAttribute("aria-selected",String(o===e)),c.dataset.id=o.id;const l=nt("div","thumb"),h=n.thumbnail(o);if(h){const v=nt("img");v.src=h,v.alt="",l.appendChild(v)}c.appendChild(l);const d=nt("div","nm");d.appendChild(nt("span",void 0,o.name)),d.appendChild(nt("span","ty",o.parametric?o.kind:"mesh")),c.appendChild(d);const u=nt("button","eye");u.setAttribute("aria-pressed",String(o.visible)),u.title=o.visible?"隠す":"表示する",u.innerHTML=Lc(o.visible?H.eye:H.eyeOff),u.addEventListener("pointerdown",v=>v.stopPropagation()),u.addEventListener("click",v=>{v.stopPropagation(),n.onVisible(o,!o.visible)}),c.appendChild(u);const f=nt("button","lock");f.setAttribute("aria-pressed",String(o.locked)),f.title=o.locked?"ロックを外す":"ロックする",f.innerHTML=Lc(o.locked?H.lock:H.lockOpen),f.addEventListener("pointerdown",v=>v.stopPropagation()),f.addEventListener("click",v=>{v.stopPropagation(),n.onLock(o,!o.locked)}),c.appendChild(f);const p=nt("button","more",s.has(o.id)?"▾":"▸");if(p.title="プロパティ",p.addEventListener("pointerdown",v=>v.stopPropagation()),p.addEventListener("click",v=>{v.stopPropagation(),s.has(o.id)?s.delete(o.id):s.add(o.id),n.onLayersChanged()}),c.appendChild(p),ab(c,o,n),a.appendChild(c),s.has(o.id)){const v=nt("div","lyprops"),g=ob(o,n);g&&v.appendChild(g);const m=o.mesh.stats();v.appendChild(nt("div","hint",`頂点 ${m.vertices} · エッジ ${m.edges} · 面 ${m.faces}`)),a.appendChild(v)}i.appendChild(a)}}function ob(i,t){const e=_e("トランスフォーム","TRANSFORM");return Ws(e,"移動",i.transform.position,3,(n,s)=>t.onTransformInput(i,"position",n,s)),Ws(e,"スケール",i.transform.scale,3,(n,s)=>t.onTransformInput(i,"scale",n,s)),e}function ab(i,t,e){let n=null,s=0,r=0,o=!1,a=0,c=!1;i.addEventListener("touchstart",h=>h.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",h=>h.preventDefault()),i.addEventListener("pointerdown",h=>{if(s=h.clientX,r=h.clientY,o=!1,c=!1,h.pointerType==="mouse"&&h.button===2){o=!0,e.onOutlinerMenu(t,h.clientX,h.clientY);return}n=setTimeout(()=>{c=!0,i.classList.add("dragging")},420)});const l=()=>{n!==null&&clearTimeout(n),n=null};i.addEventListener("pointermove",h=>{if(!c){Math.hypot(h.clientX-s,h.clientY-r)>12&&l();return}const d=i.parentElement?.parentElement;if(!d)return;const u=[...d.querySelectorAll(".lyrow")],f=u.indexOf(i),p=u.findIndex(v=>{const g=v.getBoundingClientRect();return h.clientY>=g.top&&h.clientY<=g.bottom});p>=0&&p!==f&&(o=!0,e.onReorder(f,p))}),i.addEventListener("pointerup",h=>{const d=c;if(l(),i.classList.remove("dragging"),c=!1,o)return;if(d){e.onOutlinerMenu(t,h.clientX,h.clientY);return}const u=performance.now();if(u-a<400){a=0,cb(i,t,e);return}a=u,e.onSelect(t)}),i.addEventListener("pointercancel",()=>{l(),i.classList.remove("dragging"),c=!1})}function cb(i,t,e){const n=i.querySelector(".nm span");if(!n)return;const s=nt("input","olinput");s.value=t.name,n.replaceWith(s),s.focus(),s.select();let r=!1;const o=a=>{if(r)return;r=!0,a&&s.value.trim()&&e.onRename(t,s.value.trim());const c=nt("span","nm",t.name);s.replaceWith(c)};s.addEventListener("blur",()=>o(!0)),s.addEventListener("keydown",a=>{a.key==="Enter"&&o(!0),a.key==="Escape"&&o(!1)})}const Ln=(i,t,e)=>({label:i,detail:t,note:e}),lb={sculpt:{kicker:"未実装 — v1.5 の中核",title:"スカルプト",body:"モデリングモードで作ったローモデルを、クリースとディバイドでハイメッシュ化します。ディバイドスライダーを下げてモデリングに戻り頂点を編集すると、ハイメッシュのディテールを保ったままローモデルを調整できます。左のゲージはそのまま「ブラシ強度」と「ブラシサイズ」に置き換わります。",items:[Ln("ブラシ","Standard / Clay / Move / Smooth / Pinch / Inflate / Flatten / Trim / Polish","11 種"),Ln("サブディビジョン","接空間デルタによるマルチ解像度スタック","docs/03"),Ln("マスキング","ペン描画、キャビティ、ポリグループ、裏面マスク","自前実装"),Ln("対称","X / Y / Z 軸対称と放射状対称","自前実装"),Ln("レイヤー","レベルごとのデルタバッファと強度スライダー","v1.5")]},material:{kicker:"未実装 — v2.0 予定",title:"マテリアル",body:"2D ビュー（UV 空間）と 3D ビューを同時に表示し、両方で同期してペイントします。Substance のファイル形式は非公開のため直接は読めません。書き出したテクスチャセットを命名規則で自動認識する方式で対応します。左のゲージは「不透明度」と「ブラシサイズ」に置き換わります。",items:[Ln("チャンネル","BaseColor / Roughness / Metallic / Normal / Height / AO / Emissive","7 種"),Ln("レイヤー","塗り、ペイント、マスク、フォルダ、ブレンドモード","自前実装"),Ln("ベイク","法線、AO、カーブチャ、厚み、ポジション、ID","2K 既定"),Ln("読み込み","テクスチャセット（PNG / TGA / EXR）と MaterialX",".sbsar 不可"),Ln("書き出し","テクスチャセット、glTF、MaterialX","自前実装")]}};function hb(i){const t=nt("div","stub"),e=nt("div","stub-in");e.appendChild(nt("div","kicker",i.kicker)),e.appendChild(nt("h2",void 0,i.title)),e.appendChild(nt("p",void 0,i.body));const n=nt("ul");for(const s of i.items){const r=nt("li");r.appendChild(nt("b",void 0,s.label)),r.appendChild(nt("span",void 0,s.detail)),r.appendChild(nt("em",void 0,s.note)),n.appendChild(r)}return e.appendChild(n),t.appendChild(e),t}const Ye={face:new bn({color:7776477,transparent:!0,opacity:.3,side:Xe,depthWrite:!1}),faceSel:new bn({color:15765820,transparent:!0,opacity:.5,side:Xe,depthWrite:!1}),wire:new Se({color:15134454}),seam:new Se({color:16739146}),wireSel:new Se({color:15765820}),point:new on({color:12033002,size:6,sizeAttenuation:!1}),pointSel:new on({color:15765820,size:9,sizeAttenuation:!1}),pin:new on({color:7139450,size:11,sizeAttenuation:!1}),border:new Se({color:9675181}),manip:new Se({color:14862432}),manipHot:new Se({color:16770688}),manipCenter:new on({color:14862432,size:10,sizeAttenuation:!1}),manipPivot:new Se({color:10149450}),manipPivotPoint:new on({color:10149450,size:12,sizeAttenuation:!1})};function ub(i){const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d"),s=256/i;for(let o=0;o<i;o++)for(let a=0;a<i;a++)n.fillStyle=(a+o)%2===0?"#333a42":"#282e35",n.fillRect(a*s,o*s,s,s);const r=new af(e);return r.wrapS=Oi,r.wrapT=Oi,r.magFilter=Ie,r}class fb{constructor(t,e){this.container=t,this.renderer=new Sf({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(2106410,1),this.scene.add(this.group),this.buildBackground(),this.resize()}renderer;scene=new oc;camera=new sr(-.2,1.2,1.2,-.2,-10,10);center={u:.5,v:.5};span=1.4;checkerCells=8;group=new oc;topology=null;frame=0;background=null;buildBackground(){this.background&&(this.scene.remove(this.background),this.background.geometry.dispose(),this.background.material.map?.dispose(),this.background.material.dispose());const t=new ir(1,1);t.translate(.5,.5,0);const e=new bn({map:ub(this.checkerCells)}),n=new we(t,e);n.position.z=-1,this.scene.add(n),this.background=n;const s=new he;s.setAttribute("position",new Zt([0,0,0,1,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,1,0,0,0,0],3));const r=new Dn(s,Ye.border);r.position.z=-.5,this.scene.add(r)}setCheckerCells(t){this.checkerCells=t,this.buildBackground()}get cells(){return this.checkerCells}resize(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.applyCamera()}applyCamera(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1,n=t/e,s=this.span/2,r=n>=1?s*n:s,o=n>=1?s:s/n;this.camera.left=this.center.u-r,this.camera.right=this.center.u+r,this.camera.top=this.center.v+o,this.camera.bottom=this.center.v-o,this.camera.updateProjectionMatrix()}pixelToUv(){const t=this.container.clientHeight||1;return(this.camera.top-this.camera.bottom)/t}pan(t,e){const n=this.pixelToUv();this.center.u-=t*n,this.center.v+=e*n,this.applyCamera()}zoom(t){this.span=Math.max(.02,Math.min(20,this.span*t)),this.applyCamera()}frameUnit(){this.center={u:.5,v:.5},this.span=1.4,this.applyCamera()}framepoints(t){if(!t.length)return this.frameUnit();let e=1/0,n=1/0,s=-1/0,r=-1/0;for(const o of t)e=Math.min(e,o.u),s=Math.max(s,o.u),n=Math.min(n,o.v),r=Math.max(r,o.v);this.center={u:(e+s)/2,v:(n+r)/2},this.span=Math.max(.05,Math.max(s-e,r-n)*1.5),this.applyCamera()}toUv(t){const e=this.container.clientWidth||1,n=this.container.clientHeight||1;return{u:this.camera.left+t.x/e*(this.camera.right-this.camera.left),v:this.camera.top-t.y/n*(this.camera.top-this.camera.bottom)}}toScreen(t,e){const n=this.container.clientWidth||1,s=this.container.clientHeight||1;return{x:(t-this.camera.left)/(this.camera.right-this.camera.left)*n,y:(this.camera.top-e)/(this.camera.top-this.camera.bottom)*s}}get uvTopology(){return this.topology}build(t,e){for(const o of this.group.children.slice())this.group.remove(o),(o instanceof we||o instanceof Dn||o instanceof dn)&&o.geometry.dispose();if(this.topology=null,!t)return;const n=t.mesh;if(!n.uvSets.get(me))return;const r=e?.seams??new Set;this.topology=yd(n,r),this.topology&&this.draw(t,r)}draw(t,e){const n=this.topology,s=t.mesh,r=[],o=[];for(let v=0;v<n.vertexUv.length/2;v++)r.push(n.vertexUv[v*2],n.vertexUv[v*2+1],0);for(let v=0;v<s.faceCount;v++){const g=s.faceSize(v),m=[];for(let x=0;x<g;x++){const y=this.vertexOfCorner(Vn(v,x));y>=0&&m.push(y)}if(!(m.length<3))for(let x=1;x<m.length-1;x++)o.push(m[0],m[x],m[x+1])}const a=new he;a.setAttribute("position",new Zt(r,3)),a.setIndex(o);const c=new we(a,Ye.face);c.renderOrder=0,this.group.add(c);const l=[],h=[],d=this.pixelToUv();n.edges.forEach(([v,g],m)=>{const x=n.vertexUv[v*2],y=n.vertexUv[v*2+1],_=n.vertexUv[g*2],S=n.vertexUv[g*2+1];if(!e.has(n.edgeKeys[m])){l.push(x,y,.01,_,S,.01);return}const w=_-x,T=S-y,M=Math.hypot(w,T)||1,E=-T/M*d,P=w/M*d;for(const A of[-1,0,1])h.push(x+E*A,y+P*A,.02,_+E*A,S+P*A,.02)});for(const[v,g]of[[l,Ye.wire],[h,Ye.seam]]){if(!v.length)continue;const m=new he;m.setAttribute("position",new Zt(v,3));const x=new Dn(m,g);x.renderOrder=1,this.group.add(x)}const u=[];for(let v=0;v<n.vertexUv.length/2;v++)u.push(n.vertexUv[v*2],n.vertexUv[v*2+1],.02);const f=new he;f.setAttribute("position",new Zt(u,3));const p=new dn(f,Ye.point);p.renderOrder=2,this.group.add(p)}vertexOfCorner(t){return this.topology?.cornerToVertex.get(t)??-1}overlay=[];highlight(t,e,n,s){for(const o of this.overlay)this.group.remove(o),o.geometry.dispose();this.overlay=[];const r=this.topology;if(!(!r||!s)){if(t==="vertex"&&e.size){const o=[];for(const a of e)o.push(r.vertexUv[a*2],r.vertexUv[a*2+1],.05);this.addOverlay(new dn(as(o),Ye.pointSel))}if(t==="edge"&&e.size){const o=[];for(const a of e){const[c,l]=r.edges[a]??[0,0];o.push(r.vertexUv[c*2],r.vertexUv[c*2+1],.05,r.vertexUv[l*2],r.vertexUv[l*2+1],.05)}this.addOverlay(new Dn(as(o),Ye.wireSel))}if(t==="shell"&&e.size){const o=[],a=[];for(const l of e){const h=r.charts[l];if(h)for(const d of h.faces){const u=s.mesh.faceSize(d),f=[];for(let p=0;p<u;p++){const v=this.vertexOfCorner(Vn(d,p));v<0||(f.push(o.length/3),o.push(r.vertexUv[v*2],r.vertexUv[v*2+1],.04))}for(let p=1;p<f.length-1;p++)a.push(f[0],f[p],f[p+1])}}const c=as(o);c.setIndex(a),this.addOverlay(new we(c,Ye.faceSel))}if(n.size){const o=[];for(const a of n)o.push(r.vertexUv[a*2],r.vertexUv[a*2+1],.06);this.addOverlay(new dn(as(o),Ye.pin))}}}manip=null;manipPoints=null;drawManipulator(t,e,n,s){for(const u of[this.manip,this.manipPoints])u&&(this.group.remove(u),u.geometry.dispose());if(this.manip=null,this.manipPoints=null,!t)return;const r=this.pixelToUv(),o=n*r,a=[],c=(u,f,p,v)=>{a.push(t.u+u,t.v+f,.08,t.u+p,t.v+v,.08)};if(c(0,0,o,0),c(o,0,o-o*.18,o*.09),c(o,0,o-o*.18,-o*.09),c(0,0,0,o),c(0,o,o*.09,o-o*.18),c(0,o,-o*.09,o-o*.18),!s){const u=o*.78,f=o*.07;c(u-f,u-f,u+f,u-f),c(u+f,u-f,u+f,u+f),c(u+f,u+f,u-f,u+f),c(u-f,u+f,u-f,u-f),c(0,0,u-f,u-f);const p=o*1.15,v=48;for(let g=0;g<v;g++){const m=g/v*Math.PI*2,x=(g+1)/v*Math.PI*2;c(Math.cos(m)*p,Math.sin(m)*p,Math.cos(x)*p,Math.sin(x)*p)}}const l=as(a),h=new Dn(l,s?Ye.manipPivot:e>=0?Ye.manipHot:Ye.manip);h.renderOrder=6,this.group.add(h),this.manip=h;const d=new dn(as([t.u,t.v,.09]),s?Ye.manipPivotPoint:Ye.manipCenter);d.renderOrder=7,this.group.add(d),this.manipPoints=d}pickManipulator(t,e,n,s){if(!e)return-1;const r=this.toUv(t),o=this.pixelToUv(),a=(r.u-e.u)/o,c=(r.v-e.v)/o,l=Math.hypot(a,c);return l<14?3:!s&&((d,u)=>Math.hypot(a-d,c-u)<14)(n*.78,n*.78)?23:a>10&&a<n*1.1&&Math.abs(c)<12?0:c>10&&c<n*1.1&&Math.abs(a)<12?1:!s&&Math.abs(l-n*1.15)<12?10:-1}addOverlay(t){t.renderOrder=5,this.group.add(t),this.overlay.push(t)}pickVertex(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t),r=e*this.pixelToUv();let o=-1,a=r;for(let c=0;c<n.vertexUv.length/2;c++){const l=Math.hypot(n.vertexUv[c*2]-s.u,n.vertexUv[c*2+1]-s.v);l<a&&(a=l,o=c)}return o}pickEdge(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t),r=e*this.pixelToUv();let o=-1,a=r;return n.edges.forEach(([c,l],h)=>{const d=n.vertexUv[c*2],u=n.vertexUv[c*2+1],f=n.vertexUv[l*2],p=n.vertexUv[l*2+1],v=f-d,g=p-u,m=v*v+g*g,x=m>1e-12?Math.max(0,Math.min(1,((s.u-d)*v+(s.v-u)*g)/m)):0,y=Math.hypot(d+v*x-s.u,u+g*x-s.v);y<a&&(a=y,o=h)}),o}pickFace(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t);for(let r=0;r<e.mesh.faceCount;r++){const o=e.mesh.faceSize(r),a=[];for(let c=0;c<o;c++){const l=this.vertexOfCorner(Vn(r,c));l<0||a.push([n.vertexUv[l*2],n.vertexUv[l*2+1]])}if(a.length>=3&&db(a,s.u,s.v))return r}return-1}start(){const t=()=>{this.frame=requestAnimationFrame(t),this.renderer.render(this.scene,this.camera)};this.frame||t()}stop(){this.frame&&cancelAnimationFrame(this.frame),this.frame=0}}function as(i){const t=new he;return t.setAttribute("position",new Zt(i,3)),t}function db(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++){const[o,a]=i[s],[c,l]=i[r];a>e!=l>e&&t<(c-o)*(e-a)/(l-a)+o&&(n=!n)}return n}const pb=20,mb=14,gb=380,vb=14;class xb{constructor(t,e,n){this.pane=t,this.host=n,this.view=new fb(t,e),this.router=new Qd(e,s=>this.local(s),this.handlers()),this.router.attach()}view;router;unit="shell";chosen=new Set;pinned=new Set;drag=null;gesture=null;marquee=null;menuOpened=!1;lastTap=null;manipDrag=null;pivotOverride=null;cancelPress(){this.menuOpened=!0,this.marquee=null,this.host.marquee(null),this.drag=null,this.manipDrag=null}local(t){const e=this.pane.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}start(){this.view.start()}stop(){this.view.stop()}resize(){this.view.resize()}stats(){const t=this.host.object(),e=this.host.recipe(),n={vertex:"UV 頂点",edge:"UV エッジ",shell:"UV シェル"}[this.unit];if(!t||!e)return{charts:0,maxStretch:1,unit:n};let s=1;const r=this.view.uvTopology;if(r)for(const o of r.charts){const a=xo(t.mesh,o,e.seams),c=t.mesh.uvSets.get(me);if(!c)continue;const l=new Float64Array(a.count*2);for(const h of o.corners){const d=a.localOf.get(h),u=Te(t.mesh,h);l[d*2]=c[u*2],l[d*2+1]=c[u*2+1]}s=Math.max(s,Qc(a.positions,a.tri,l).maxStretch)}return{charts:r?.charts.length??0,maxStretch:s,unit:n}}rebuild(){const t=this.host.object();this.view.build(t,this.host.recipe()),this.syncPins(),this.refreshHighlight()}refreshHighlight(){this.view.highlight(this.unit,this.chosen,this.pinned,this.host.object()),this.refreshManipulator()}setUnit(t){this.unit!==t&&(this.unit=t,this.chosen.clear(),this.pivotOverride=null,this.refreshHighlight(),this.host.changed(null))}syncPins(){this.pinned.clear();const t=this.view.uvTopology,e=this.host.recipe();if(!(!t||!e))for(const n of e.pins.keys()){const s=t.cornerToVertex.get(n);s!==void 0&&this.pinned.add(s)}}syncFromView(t,e){const n=this.view.uvTopology,s=this.host.object();if(!(!n||!s)){if(t==="vertex"){this.unit="vertex",this.chosen.clear();const r=new Set(e.verts??[]);for(let o=0;o<n.vertexCorners.length;o++)for(const a of n.vertexCorners[o]??[]){const[c,l]=a.split(":").map(Number),h=s.mesh.faceVerts(c);if(h[l]!==void 0&&r.has(h[l])){this.chosen.add(o);break}}}else if(t==="edge"){this.unit="edge",this.chosen.clear();const r=new Set(e.edges??[]);n.edgeKeys.forEach((o,a)=>{r.has(o)&&this.chosen.add(a)})}else{this.unit="shell",this.chosen.clear();for(const r of e.faces??[]){const o=n.chartOfFace.get(r);o!==void 0&&this.chosen.add(o)}}this.refreshHighlight()}}pushToViewForTest(){this.pushToView()}pushToView(){const t=this.view.uvTopology,e=this.host.object();if(!t||!e){this.host.syncToView({mode:"face",verts:[],edges:[],faces:[]});return}if(this.unit==="vertex"){const n=new Set;for(const s of this.chosen)for(const r of t.vertexCorners[s]??[]){const[o,a]=r.split(":").map(Number),c=e.mesh.faceVerts(o);c[a]!==void 0&&n.add(c[a])}this.host.syncToView({mode:"vertex",verts:[...n].sort((s,r)=>s-r),edges:[],faces:[]});return}if(this.unit==="edge"){const n=new Set;for(const s of this.chosen){const r=t.edgeKeys[s];r&&n.add(r)}this.host.syncToView({mode:"edge",verts:[],edges:[...n].sort(),faces:[]});return}this.host.syncToView({mode:"face",verts:[],edges:[],faces:this.facesOfSelection()})}facesOfSelection(){const t=this.view.uvTopology;if(!t)return[];const e=new Set;if(this.unit==="shell")for(const n of this.chosen)for(const s of t.charts[n]?.faces??[])e.add(s);else{const n=[];if(this.unit==="vertex")for(const s of this.chosen)n.push(...t.vertexCorners[s]??[]);else for(const s of this.chosen){const[r,o]=t.edges[s]??[-1,-1];n.push(...t.vertexCorners[r]??[],...t.vertexCorners[o]??[])}for(const s of n)e.add(Number(s.slice(0,s.indexOf(":"))))}return[...e].sort((n,s)=>n-s)}selectedCorners(){const t=this.view.uvTopology;if(!t)return{corners:[],chart:-1};const e=[];let n=-1;const s=r=>{n<0&&(n=r)};if(this.unit==="shell")for(const r of this.chosen){s(r);for(const o of t.charts[r]?.corners??[])e.push(o)}else if(this.unit==="vertex")for(const r of this.chosen)s(t.vertexChart[r]),e.push(...t.vertexCorners[r]??[]);else for(const r of this.chosen){s(t.edgeChart[r]);const[o,a]=t.edges[r]??[-1,-1];e.push(...t.vertexCorners[o]??[],...t.vertexCorners[a]??[])}return{corners:[...new Set(e)],chart:n}}captureBase(t){const e=this.host.object(),n=new Map;if(!e)return n;const s=e.mesh.uvSets.get(me);if(!s)return n;for(const r of t){const o=Te(e.mesh,r);o>=0&&n.set(r,[s[o*2],s[o*2+1]])}return n}applyOffset(t,e,n,s=1,r=0,o){const a=this.host.object();if(!a)return;const c=a.mesh.uvSets.get(me);if(!c)return;const l=o??Iu(t),h=Math.cos(r),d=Math.sin(r);for(const[u,f]of t){const p=Te(a.mesh,u);if(p<0)continue;const v=(f[0]-l.u)*s,g=(f[1]-l.v)*s;c[p*2]=l.u+v*h-g*d+e,c[p*2+1]=l.v+v*d+g*h+n}this.rebuildGeometryOnly()}manipulatorPivot(){if(this.pivotOverride)return this.pivotOverride;if(!this.view.uvTopology||!this.chosen.size)return null;const{corners:e}=this.selectedCorners();if(!e.length)return null;const n=this.host.object(),s=n?.mesh.uvSets.get(me);if(!n||!s)return null;let r=1/0,o=1/0,a=-1/0,c=-1/0;for(const l of e){const h=Te(n.mesh,l);h<0||(r=Math.min(r,s[h*2]),a=Math.max(a,s[h*2]),o=Math.min(o,s[h*2+1]),c=Math.max(c,s[h*2+1]))}return Number.isFinite(r)?{u:(r+a)/2,v:(o+c)/2}:null}refreshManipulator(){this.view.drawManipulator(this.manipulatorPivot(),this.manipDrag?.handle??-1,this.manipSizePx(),this.host.pivotEdit())}manipSizePx(){return 60*this.host.manipSize()}resetPivot(){this.pivotOverride=null,this.refreshManipulator()}beginManip(t,e,n){const s=this.view.toUv(e);if(this.host.pivotEdit()){this.manipDrag={handle:t,start:s,pivot:n,base:new Map,chart:-1,snapshot:null,moved:!1},this.refreshManipulator();return}const{corners:r,chart:o}=this.selectedCorners();r.length&&(this.manipDrag={handle:t,start:s,pivot:n,base:this.captureBase(r),chart:o,snapshot:this.host.snapshot(),moved:!1},this.refreshManipulator())}updateManip(t){const e=this.manipDrag;if(!e)return;const n=this.view.toUv(t),s=n.u-e.start.u,r=n.v-e.start.v;if(this.host.pivotEdit()){const l={u:e.pivot.u+s,v:e.pivot.v+r};e.handle===0&&(l.v=e.pivot.v),e.handle===1&&(l.u=e.pivot.u);const h=this.host.uvSnap();h?.kind==="grid"&&(l.u=Math.round(l.u/h.step)*h.step,l.v=Math.round(l.v/h.step)*h.step),this.pivotOverride=l,e.moved=!0,this.refreshManipulator(),this.host.hint(`ピボット <kbd>${l.u.toFixed(3)}, ${l.v.toFixed(3)}</kbd>`);return}if(e.moved=!0,e.handle===10){const l=Math.atan2(e.start.v-e.pivot.v,e.start.u-e.pivot.u),d=Math.atan2(n.v-e.pivot.v,n.u-e.pivot.u)-l;this.applyOffset(e.base,0,0,1,d,e.pivot),this.host.hint(`回転 <kbd>${(d*180/Math.PI).toFixed(1)}°</kbd>`);return}if(e.handle===23){const l=Math.hypot(e.start.u-e.pivot.u,e.start.v-e.pivot.v),h=Math.hypot(n.u-e.pivot.u,n.v-e.pivot.v),d=l>1e-6?Math.max(.02,h/l):1;this.applyOffset(e.base,0,0,d,0,e.pivot),this.host.hint(`スケール <kbd>×${d.toFixed(2)}</kbd>`);return}let o=e.handle===1?0:s,a=e.handle===0?0:r;const c=this.host.uvSnap();if(c){const l=Iu(e.base);if(c.kind==="grid"){const h=Math.round((l.u+o)/c.step)*c.step,d=Math.round((l.v+a)/c.step)*c.step;e.handle!==1&&(o=h-l.u),e.handle!==0&&(a=d-l.v)}}this.applyOffset(e.base,o,a,1,0,e.pivot),this.host.hint(`移動 <kbd>${o.toFixed(3)}, ${a.toFixed(3)}</kbd>`)}endManip(){const t=this.manipDrag;if(this.manipDrag=null,!!t){if(t.moved&&!this.host.pivotEdit()&&t.snapshot!==null){const e=t.handle===10?"UV を回転":t.handle===23?"UV をスケール":"UV を移動";this.recordFrom(t.base,t.chart)&&this.host.commit(e,t.snapshot),this.host.changed(null)}this.refreshManipulator()}}recordFrom(t,e){const n=this.host.object(),s=this.host.recipe(),r=this.view.uvTopology;if(!n||!s||!r||e<0)return!1;const o=n.mesh.uvSets.get(me),a=r.charts[e]?.fingerprint;if(!o||!a)return!1;const c=new Map;let l=!1;for(const[h,d]of t){const u=Te(n.mesh,h);if(u<0)continue;const f=o[u*2]-d[0],p=o[u*2+1]-d[1];Math.abs(f)<1e-9&&Math.abs(p)<1e-9||(c.set(h,[f,p]),l=!0)}return l&&vd(s,a,c),l}rebuildGeometryOnly(){this.view.build(this.host.object(),this.host.recipe()),this.refreshHighlight()}unfold(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;const n=this.host.snapshot(),s=e.method==="none";s&&(e.method="lscm");const r=ti(t.mesh,e);this.host.commit("展開",n),this.rebuild(),this.host.changed(`展開 — 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}`+(s?"（LSCM に切り替えた）":""))}autoUnwrap(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;const n=this.host.snapshot(),s=td(t.mesh,e.autoSeamParams,this.host.smoothAngle());e.seams=s,e.manual.clear(),e.pins.clear(),e.method="lscm";const r=ti(t.mesh,e);this.host.commit("自動 UV",n),this.chosen.clear(),this.rebuild(),this.host.changed(`自動 UV — 切れ目 ${s.size} 本 / 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}`)}repack(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;if(e.method==="none"){this.host.toast("「取り込んだまま」では並べ直せません。先に展開してください");return}const n=this.host.snapshot();e.manual.clear();const s=ti(t.mesh,e);this.host.commit("整列",n),this.rebuild(),this.host.changed(`整列 — 島 ${s.charts.length} を 0〜1 に詰めた`)}setMethod(t){const e=this.host.object(),n=this.host.recipe();if(!e||!n||n.method===t)return;const s=this.host.snapshot();if(n.method=t,t==="none"){const r=e.mesh.uvSets.get(me);r&&(n.base=Float32Array.from(r),n.manual.clear())}ti(e.mesh,n),this.host.commit("ソルバーの変更",s),this.rebuild(),this.host.changed({lscm:"LSCM",projection:"投影",none:"なし"}[t])}cutOrSew(t){const e=this.host.object(),n=this.host.recipe(),s=this.view.uvTopology;if(!e||!n||!s)return;if(!this.chosen.size){this.host.toast("先に選んでから実行してください");return}const r=this.edgesForCutSew(t),o=this.host.snapshot(),a=[];for(const c of r)(t?!n.seams.has(c):n.seams.has(c))&&(t?n.seams.add(c):n.seams.delete(c),a.push(c));if(!a.length){this.host.toast(t?"すでに切れています":"切れ目ではありません");return}!t&&n.method==="none"&&n.base&&xc(e.mesh,n.base,a),ti(e.mesh,n),this.host.commit(t?"カット":"ソー",o),this.chosen.clear(),this.rebuild(),this.host.changed(`${t?"カット":"ソー"} — ${a.length} 本`)}edgesForCutSew(t){const e=this.host.object(),n=this.view.uvTopology;if(!e||!n)return[];if(this.unit==="edge")return[...this.chosen].map(l=>n.edgeKeys[l]).filter(l=>!!l);if(this.unit==="vertex"){const l=new Set;for(const d of this.chosen)for(const u of n.vertexCorners[d]??[]){const[f,p]=u.split(":").map(Number),v=e.mesh.faceVerts(f);v[p]!==void 0&&l.add(v[p])}const h=new Set;for(const[d,u]of e.mesh.edges()){const f=l.has(d)&&l.has(u),p=l.size===1&&(l.has(d)||l.has(u));(f||p)&&h.add(St(d,u))}return[...h].sort()}const s=this.host.selectedFaces(),r=new Set(s.length?s:this.facesOfSelection()),o=l=>r.has(l),a=new Map;for(let l=0;l<e.mesh.faceCount;l++){const h=e.mesh.faceSize(l),d=e.mesh.faceVerts(l);for(let u=0;u<h;u++){const f=St(d[u],d[(u+1)%h]),p=a.get(f);p?p.push(l):a.set(f,[l])}}const c=[];for(const[l,h]of a){if(h.length!==2)continue;const[d,u]=h;(t?o(d)!==o(u):o(d)&&o(u))&&c.push(l)}return c.sort()}moveAndSew(){const t=this.host.object(),e=this.host.recipe(),n=this.view.uvTopology,s=t?.mesh.uvSets.get(me);if(!t||!e||!n||!s)return;const r=this.edgesForCutSew(!1).filter(T=>e.seams.has(T));if(!r.length){this.host.toast("切れ目を選んでから実行してください");return}const o=new Set(r),a=new Map;if(n.edgeKeys.forEach((T,M)=>{if(!o.has(T))return;const E=n.edgeChart[M],P=a.get(E);P?P.push(M):a.set(E,[M])}),a.size!==2){this.cutOrSew(!1);return}const[c,l]=[...a.keys()],h=T=>n.charts[T]?.faces.length??0,d=h(c)<h(l)||h(c)===h(l)&&c>l?c:l,u=d===c?l:c,f=(T,M)=>{const E=(a.get(T)??[]).find(P=>n.edgeKeys[P]===M);return E===void 0?null:n.edges[E]},p=[];for(const T of r){const M=f(d,T),E=f(u,T);if(!M||!E)continue;const P=U=>{const B=n.vertexCorners[U]?.[0];if(!B)return-1;const[D,q]=B.split(":").map(Number);return t.mesh.faceVerts(D)[q]??-1},[A,L]=M,[z,F]=E;P(A)===P(z)?p.push([A,z],[L,F]):p.push([A,F],[L,z])}if(p.length<2){this.cutOrSew(!1);return}const v=T=>[n.vertexUv[T*2],n.vertexUv[T*2+1]];let g=[0,1],m=-1;for(let T=0;T<p.length;T++)for(let M=T+1;M<p.length;M++){const E=v(p[T][0]),P=v(p[M][0]),A=Math.hypot(P[0]-E[0],P[1]-E[1]);A>m&&(m=A,g=[T,M])}if(m<1e-9){this.cutOrSew(!1);return}const x=md(v(p[g[0]][0]),v(p[g[1]][0]),v(p[g[0]][1]),v(p[g[1]][1])),y=n.charts[d]?.corners??[],_=this.host.snapshot(),S=this.captureBase(y),w=v(p[g[0]][0]);for(const T of y){const M=Te(t.mesh,T);if(M<0)continue;const E=tl([s[M*2],s[M*2+1]],w,x);s[M*2]=E[0],s[M*2+1]=E[1]}this.recordFrom(S,d);for(const T of r)e.seams.delete(T);e.method==="none"&&e.base&&xc(t.mesh,e.base,r),ti(t.mesh,e),this.host.commit("Move and Sew",_),this.chosen.clear(),this.rebuild(),this.host.changed(`Move and Sew — ${r.length} 本`)}pinOrUnpin(t){const e=this.host.object(),n=this.host.recipe(),s=this.view.uvTopology;if(!e||!n||!s)return;if(this.unit!=="vertex"||!this.chosen.size){this.host.toast("UV 頂点を選んでから実行してください");return}const r=e.mesh.uvSets.get(me);if(!r)return;const o=this.host.snapshot();for(const a of this.chosen)for(const c of s.vertexCorners[a]??[])if(t){const l=Te(e.mesh,c);n.pins.set(c,[r[l*2],r[l*2+1]])}else n.pins.delete(c);this.host.commit(t?"ピン":"ピン解除",o),this.syncPins(),this.refreshHighlight(),this.host.changed(`${t?"ピン":"ピン解除"} — ${this.chosen.size} 点`)}straightenBorderEdges(){const t=this.host.object(),e=this.view.uvTopology;if(!t||!e)return;if(this.unit!=="edge"||this.chosen.size<2){this.host.toast("縁の辺を 2 本以上選んでから実行してください");return}const n=[...this.chosen];if(n.some(c=>(e.edgeFaces[c]?.length??0)>=2)){this.host.toast("縁の辺を選んでください");return}const s=ho(e,n[0]),r=new Set(n),o={edges:s.edges.filter(c=>r.has(c)),closed:s.closed};if(o.edges.length!==n.length){this.host.toast("ひと続きの縁を選んでください");return}const a=rl(e,o);this.applyToUvVertices(a,"境界の直線化",(c,l)=>hd(c,l))}gridChart(){const t=this.view.uvTopology;if(!t)return;const e=this.unit==="shell"?[...this.chosen][0]:this.selectedCorners().chart;if(e===void 0||e<0){this.host.toast("島を選んでから実行してください");return}const n=wd(t,e);if(!n){this.host.toast("四角形の帯（格子）になっている島でだけ使えます");return}const s=n.flat();this.applyToUvVertices(s,"格子化",r=>ud(r,n))}applyToUvVertices(t,e,n){const s=this.host.object(),r=this.view.uvTopology,o=s?.mesh.uvSets.get(me);if(!s||!r||!o||t.length<2)return;const a=[];for(const f of t)a.push(...r.vertexCorners[f]??[]);const c=[...new Set(a)],l=this.host.snapshot(),h=this.captureBase(c),d=r.vertexChart[t[0]]??-1,u=new Float64Array(r.vertexUv.length/2>0?r.vertexUv.length/2*2:0);for(let f=0;f<r.vertexUv.length/2;f++){const p=r.vertexCorners[f]?.[0];if(!p)continue;const v=Te(s.mesh,p);v<0||(u[f*2]=o[v*2],u[f*2+1]=o[v*2+1])}n(u,t);for(const f of t)for(const p of r.vertexCorners[f]??[]){const v=Te(s.mesh,p);v<0||(o[v*2]=u[f*2],o[v*2+1]=u[f*2+1])}this.recordFrom(h,d),this.host.commit(e,l),this.rebuildGeometryOnly(),this.rebuild(),this.host.changed(e)}tidy(t){const e=this.host.object();if(!e)return;const{corners:n,chart:s}=this.selectedCorners();if(n.length<2){this.host.toast("2 つ以上選んでから実行してください");return}const r=e.mesh.uvSets.get(me);if(!r)return;const o=this.host.snapshot(),a=this.captureBase(n),c=[],l=new Map;for(const d of n){const u=Te(e.mesh,d);u<0||(c.push(u),l.set(u,d))}const h={alignU:"整列 U",alignV:"整列 V",straighten:"直線化",merge:"マージ",symmetry:"対称"}[t];if(t==="alignU")ad(r,c);else if(t==="alignV")cd(r,c);else if(t==="straighten")ld(r,_b(r,c));else if(t==="merge")dd(r,c,.01);else{const d=Mb(r,c);if(!d.length){this.host.toast("対称の相手が見つかりません");return}pd(r,d)}this.recordFrom(a,s),this.host.commit(h,o),this.rebuildGeometryOnly(),this.rebuild(),this.host.changed(h)}transformSelection(t){const e=this.host.object();if(!e)return;const{corners:n,chart:s}=this.selectedCorners();if(!n.length){this.host.toast("選択してから実行してください");return}const r=e.mesh.uvSets.get(me);if(!r)return;const o=this.host.snapshot(),a=this.captureBase(n);let c=0,l=0;for(const[,h]of a)c+=h[0],l+=h[1];c/=a.size,l/=a.size;for(const[h,d]of a){const u=Te(e.mesh,h),f=d[0]-c,p=d[1]-l;t==="flipU"?r[u*2]=c-f:t==="flipV"?r[u*2+1]=l-p:(r[u*2]=c-p,r[u*2+1]=l+f)}this.recordFrom(a,s),this.host.commit({flipU:"反転 U",flipV:"反転 V",rotate90:"90° 回転"}[t],o),this.rebuildGeometryOnly(),this.host.changed(null)}handlers(){return{toolDown:(t,e)=>this.down(t,e),toolMove:t=>this.move(t),toolUp:(t,e,n)=>this.up(t,e,n),hover:()=>{},hoverLeave:()=>{},openMarkingMenu:(t,e,n)=>{this.cancelPress(),this.host.markingMenu(t,e,n)},openTwoFingerMenu:(t,e)=>{this.cancelPress(),this.host.markingMenu(t,e,!0)},openCameraMenu:(t,e)=>{this.cancelPress(),this.host.cameraMenu(t,e)},undo:()=>this.host.undo(),redo:()=>this.host.redo(),abort:()=>{this.drag=null,this.gesture=null,this.manipDrag=null,this.marquee=null,this.host.marquee(null)},transformBegin:()=>this.gestureBegin(),transformUpdate:t=>this.gestureUpdate(t),transformEnd:()=>this.gestureEnd(),isOnMesh:()=>!0,zoomPivot:()=>null,marqueeStart:()=>{},tumble:()=>{},pan:(t,e)=>this.view.pan(t,e),dolly:t=>this.view.zoom(t),dollyAbout:(t,e)=>this.view.zoom(e),shiftOn:t=>this.host.shiftOn(t),altOn:()=>!1}}down(t,e){const n=this.host.object();if(!n)return;this.menuOpened=!1;const s=this.host.shiftOn(e),r=this.host.ctrlOn(e),o=this.pick(t,n),a=performance.now(),c=this.lastTap;if(c!==null&&a-c.t<gb&&Math.hypot(t.x-c.x,t.y-c.y)<vb&&c.unit===this.unit&&c.hit===o&&o>=0&&c){const d=c.before;this.lastTap=null,this.expandFrom(o,s,d);return}this.lastTap=o>=0?{t:a,x:t.x,y:t.y,unit:this.unit,hit:o,before:[...this.chosen]}:null;const h=this.manipulatorPivot();if(h&&!s&&!r){const d=this.view.pickManipulator(t,h,this.manipSizePx(),this.host.pivotEdit());if(d>=0){this.beginManip(d,t,h);return}}if(o>=0&&this.chosen.has(o)&&!s&&!r){this.beginDrag(t,e);return}if(o<0){this.marquee={x0:t.x,y0:t.y,x1:t.x,y1:t.y,add:s,sub:r,moved:!1};return}r?this.chosen.delete(o):(s||this.chosen.clear(),this.chosen.add(o)),this.refreshHighlight(),this.pushToView(),this.beginDrag(t,e)}expandFrom(t,e,n){const s=this.view.uvTopology;if(s){if(this.unit==="edge"){const r=ho(s,t);let o=r.edges,a="UV エッジループ";if(e&&n.length){const c=bd(r,n[n.length-1],t);c&&(o=c,a="UV エッジの区間")}this.applyExpanded(o,e,n,a);return}if(this.unit==="vertex"){if(e&&n.length){const o=Sd(s,n[n.length-1],t);if(o){this.applyExpanded(o,e,n,"UV 頂点列");return}}const r=s.vertexChart[t]??-1;this.applyExpanded(ol(s,r),e,n,"島の UV 頂点");return}this.applyExpanded([t],e,n,"UV シェル")}}applyExpanded(t,e,n,s){if(this.chosen.clear(),e)for(const r of n)this.chosen.add(r);for(const r of t)this.chosen.add(r);this.refreshHighlight(),this.pushToView(),this.host.changed(`${s} — ${t.length}`)}updateMarquee(t){const e=this.marquee;e&&(e.x1=t.x,e.y1=t.y,(Math.abs(e.x1-e.x0)>ps||Math.abs(e.y1-e.y0)>ps)&&(e.moved=!0),this.host.marquee(e.moved?{x0:e.x0,y0:e.y0,x1:e.x1,y1:e.y1}:null))}applyMarquee(t){const e=this.topologyOrNull();if(!e)return;const n=this.view.toUv({x:Math.min(t.x0,t.x1),y:Math.max(t.y0,t.y1)}),s=this.view.toUv({x:Math.max(t.x0,t.x1),y:Math.min(t.y0,t.y1)}),r=(a,c)=>a>=n.u&&a<=s.u&&c>=n.v&&c<=s.v;!t.add&&!t.sub&&this.chosen.clear();const o=a=>{t.sub?this.chosen.delete(a):this.chosen.add(a)};if(this.unit==="vertex")for(let a=0;a<e.vertexUv.length/2;a++)r(e.vertexUv[a*2],e.vertexUv[a*2+1])&&o(a);else if(this.unit==="edge")e.edges.forEach(([a,c],l)=>{const h=(e.vertexUv[a*2]+e.vertexUv[c*2])/2,d=(e.vertexUv[a*2+1]+e.vertexUv[c*2+1])/2;r(h,d)&&o(l)});else{const a=new Set;for(let c=0;c<e.vertexUv.length/2;c++)r(e.vertexUv[c*2],e.vertexUv[c*2+1])&&a.add(e.vertexChart[c]);for(const c of a)o(c)}this.refreshHighlight(),this.pushToView()}topologyOrNull(){return this.view.uvTopology}pick(t,e){if(this.unit==="vertex")return this.view.pickVertex(t,pb);if(this.unit==="edge")return this.view.pickEdge(t,mb);const n=this.view.pickFace(t,e);return n<0?-1:this.view.uvTopology?.chartOfFace.get(n)??-1}beginDrag(t,e){const{corners:n,chart:s}=this.selectedCorners();n.length&&(this.drag={start:t,base:this.captureBase(n),chart:s,snapshot:this.host.snapshot(),moved:!1,pending:e.pointerType!=="mouse",t0:performance.now()})}move(t){if(this.manipDrag)return this.updateManip(t);if(this.marquee)return this.updateMarquee(t);const e=this.drag;if(!e)return;if(e.pending){const a=Math.hypot(t.x-e.start.x,t.y-e.start.y),c=performance.now()-e.t0;if(a<=vl&&!(a>ps&&c>xl))return;e.pending=!1}const n=this.view.pixelToUv();let s=(t.x-e.start.x)*n,r=-(t.y-e.start.y)*n;const o=this.host.uvSnap();if(o&&e.base.size){const a=this.anchorCorner(e,t);if(a){const c=[a[1][0]+s,a[1][1]+r],l=o.kind==="grid"?[Math.round(c[0]/o.step)*o.step,Math.round(c[1]/o.step)*o.step]:this.nearestUvVertex(c,e.base);l&&(s=l[0]-a[1][0],r=l[1]-a[1][1])}}(Math.abs(s)>1e-9||Math.abs(r)>1e-9)&&(e.moved=!0),this.applyOffset(e.base,s,r),this.host.hint((o?`スナップ ${o.kind==="grid"?"グリッド":"UV 頂点"} · `:"")+`移動 <kbd>${s.toFixed(3)}, ${r.toFixed(3)}</kbd>`)}anchorCorner(t,e){let n=null,s=1/0;for(const[r,o]of t.base){const a=this.view.toScreen(o[0],o[1]),c=Math.hypot(a.x-e.x,a.y-e.y);c<s&&(s=c,n=[r,o])}return n}nearestUvVertex(t,e){const n=this.host.object(),s=this.view.uvTopology;if(!n||!s)return null;const r=n.mesh.uvSets.get(me);if(!r)return null;const o=this.view.toScreen(t[0],t[1]);let a=null,c=40;for(let l=0;l<s.vertexCorners.length;l++){const h=s.vertexCorners[l]??[];if(!h.length||h.some(p=>e.has(p)))continue;const d=Te(n.mesh,h[0]);if(d<0)continue;const u=this.view.toScreen(r[d*2],r[d*2+1]),f=Math.hypot(u.x-o.x,u.y-o.y);f<c&&(c=f,a=[r[d*2],r[d*2+1]])}return a}up(t,e,n){if(this.manipDrag){this.endManip();return}const s=this.marquee;this.marquee=null,this.host.marquee(null);const r=this.drag;if(this.drag=null,this.menuOpened){this.menuOpened=!1;return}if(s){s.moved?this.applyMarquee(s):!s.add&&!s.sub&&this.chosen.size&&(this.chosen.clear(),this.refreshHighlight(),this.pushToView());return}!r||!r.moved||(this.recordFrom(r.base,r.chart)&&this.host.commit("UV を移動",r.snapshot),this.host.changed(null))}gestureBegin(){const{corners:t,chart:e}=this.selectedCorners();return t.length?(this.gesture={base:this.captureBase(t),chart:e,snapshot:this.host.snapshot(),moved:!1},!0):!1}gestureUpdate(t){const e=this.gesture;if(!e)return;e.moved=!0;const n=this.view.pixelToUv();if(t.kind==="scale"){this.applyOffset(e.base,0,0,Math.max(.02,t.scale)),this.host.hint(`スケール <kbd>×${t.scale.toFixed(2)}</kbd> · 指 3 本`);return}const s=t.axis==="horizontal"?t.pixels*n:0,r=t.axis==="vertical"?-t.pixels*n:0;this.applyOffset(e.base,s,r),this.host.hint(`移動 <kbd>${t.axis==="vertical"?"V":"U"} ${(s+r).toFixed(3)}</kbd> · 指 3 本`)}gestureEnd(){const t=this.gesture;this.gesture=null,!(!t||!t.moved)&&(this.recordFrom(t.base,t.chart)&&this.host.commit("UV を変形",t.snapshot),this.host.changed(null))}frame(){const t=this.view.uvTopology,{corners:e}=this.selectedCorners(),n=this.host.object();if(!t||!n||!e.length)return this.view.frameUnit();const s=n.mesh.uvSets.get(me);if(!s)return this.view.frameUnit();this.view.framepoints(e.map(r=>{const o=Te(n.mesh,r);return{u:s[o*2],v:s[o*2+1]}}))}}function Iu(i){let t=0,e=0;for(const[,n]of i)t+=n[0],e+=n[1];return i.size&&(t/=i.size,e/=i.size),{u:t,v:e}}function _b(i,t){if(t.length<3)return t;let e=0,n=0;for(const h of t)e+=i[h*2],n+=i[h*2+1];e/=t.length,n/=t.length;let s=0,r=0,o=0;for(const h of t){const d=i[h*2]-e,u=i[h*2+1]-n;s+=d*d,r+=d*u,o+=u*u}const a=.5*Math.atan2(2*r,s-o),c=Math.cos(a),l=Math.sin(a);return[...t].sort((h,d)=>(i[h*2]-e)*c+(i[h*2+1]-n)*l-((i[d*2]-e)*c+(i[d*2+1]-n)*l))}function Mb(i,t){let e=1/0,n=-1/0;for(const l of t)e=Math.min(e,i[l*2]),n=Math.max(n,i[l*2]);const s=(e+n)/2,r=t.filter(l=>i[l*2]<s-1e-9),o=t.filter(l=>i[l*2]>s+1e-9),a=[],c=new Set;for(const l of r.sort((h,d)=>h-d)){let h=-1,d=1/0;for(const u of o){if(c.has(u))continue;const f=Math.hypot(s*2-i[l*2]-i[u*2],i[l*2+1]-i[u*2+1]);f<d&&(d=f,h=u)}h>=0&&(c.add(h),a.push([l,h]))}return a}const Ic=["N","NE","E","SE","S","SW","W","NW"],ls="http://www.w3.org/2000/svg",Pi=176,ga=56,yb=42,Uc=208,Hs=32,Uu=14;let Fe=null;function bb(i,t,e,n,s,r){const o=i+Math.cos(s)*n,a=t+Math.sin(s)*n,c=i+Math.cos(r)*n,l=t+Math.sin(r)*n,h=i+Math.cos(r)*e,d=t+Math.sin(r)*e,u=i+Math.cos(s)*e,f=t+Math.sin(s)*e;return`M${o},${a}A${n},${n} 0 0 1 ${c},${l}L${h},${d}A${e},${e} 0 0 0 ${u},${f}Z`}function Gr(i,t,e,n){const s=document.createElementNS(ls,"text");return i&&s.setAttribute("class",i),s.setAttribute("x",String(t)),s.setAttribute("y",String(e)),s.setAttribute("text-anchor","middle"),s.textContent=n,s}function Jn(i,t,e,n=[]){yl();const s=n.length?Uu+n.length*Hs:0,r=Math.max(Pi+16,Math.min(window.innerWidth-Pi-16,t)),o=Math.max(Pi+16,Math.min(window.innerHeight-Pi-s-16,e)),a=document.createElement("div");a.className="radial",a.addEventListener("touchstart",f=>f.preventDefault(),{passive:!1}),a.addEventListener("touchmove",f=>f.preventDefault(),{passive:!1});const c=document.createElementNS(ls,"svg");a.appendChild(c),document.body.appendChild(a);const l=[];for(let f=0;f<8;f++){const p=i[Ic[f]],v=(f*45-22.5-90)*Math.PI/180,g=(f*45+22.5-90)*Math.PI/180,m=document.createElementNS(ls,"path");if(m.setAttribute("d",bb(r,o,ga,Pi,v,g)),m.setAttribute("fill",p?"#2c3238":"#23272c"),m.setAttribute("stroke","#171a1e"),m.setAttribute("stroke-width","1"),m.setAttribute("opacity",p?"1":".45"),c.appendChild(m),!p){l.push(null);continue}const x=(v+g)/2,y=(ga+Pi)/2,_=r+Math.cos(x)*y,S=o+Math.sin(x)*y,w=document.createElementNS(ls,"g");w.setAttribute("transform",`translate(${_-12},${S-28}) scale(1)`),w.setAttribute("fill","none"),w.setAttribute("stroke","#dfe5ea"),w.setAttribute("stroke-width","1.6"),w.setAttribute("stroke-linecap","round"),w.setAttribute("stroke-linejoin","round"),w.innerHTML=p.icon??"",c.appendChild(w),c.appendChild(Gr(null,_,S+12,p.label)),c.appendChild(Gr("sub",_,S+26,p.sub??"")),l.push({path:m,icon:w,item:p,index:f})}const h=document.createElementNS(ls,"circle");h.setAttribute("cx",String(r)),h.setAttribute("cy",String(o)),h.setAttribute("r",String(ga-2)),h.setAttribute("fill","#20242a"),h.setAttribute("stroke","#3d454e"),c.appendChild(h),c.appendChild(Gr("sub",r,o+4,"キャンセル"));const d=[],u=o+Pi+Uu;n.forEach((f,p)=>{const v=u+p*Hs,g=document.createElementNS(ls,"rect");g.setAttribute("x",String(r-Uc/2)),g.setAttribute("y",String(v)),g.setAttribute("width",String(Uc)),g.setAttribute("height",String(Hs)),g.setAttribute("fill","#2c3238"),g.setAttribute("stroke","#171a1e"),c.appendChild(g);const m=Gr(null,r,v+Hs/2+5,f.label);c.appendChild(m),d.push({rect:g,label:m,item:f,top:v})}),Fe={host:a,slices:l,rows:d,cx:r,cy:o,selected:-1,selectedRow:-1},window.addEventListener("pointermove",sp),window.addEventListener("pointerup",fo),window.addEventListener("pointercancel",fo)}function sp(i){if(!Fe)return;const t=i.clientX-Fe.cx,e=i.clientY-Fe.cy;let n=-1;Math.abs(t)<=Uc/2&&(n=Fe.rows.findIndex(r=>i.clientY>=r.top&&i.clientY<r.top+Hs)),n!==Fe.selectedRow&&(Fe.rows.forEach((r,o)=>r.rect.setAttribute("fill",o===n?"#2f5f7d":"#2c3238")),Fe.selectedRow=n,n>=0&&navigator.vibrate?.(6));let s=-1;if(n<0&&Math.hypot(t,e)>=yb){const r=(Math.atan2(e,t)*180/Math.PI+90+360+22.5)%360,o=Math.floor(r/45);Fe.slices[o]&&(s=o)}if(s!==Fe.selected){for(const r of Fe.slices){if(!r)continue;const o=r.index===s;r.path.setAttribute("fill",o?"#2f5f7d":"#2c3238"),r.path.setAttribute("stroke",o?"#4f9fd1":"#171a1e"),r.icon.setAttribute("stroke",o?"#ffffff":"#dfe5ea")}Fe.selected=s,s>=0&&navigator.vibrate?.(6)}}function fo(){if(!Fe)return;const{selected:i,selectedRow:t,slices:e,rows:n}=Fe;yl(),t>=0?n[t]?.item.run():i>=0&&e[i]?.item.run()}function yl(){Fe&&(window.removeEventListener("pointermove",sp),window.removeEventListener("pointerup",fo),window.removeEventListener("pointercancel",fo),Fe.host.remove(),Fe=null)}function Du(i,t,e,n){let s=null,r=!1,o=0,a=0,c=null;const l=()=>{s!==null&&clearTimeout(s),s=null},h=f=>{const p=f?window.addEventListener:window.removeEventListener;p("pointermove",d),p("pointerup",u),p("pointercancel",u)},d=f=>{f.pointerId===c&&Math.hypot(f.clientX-o,f.clientY-a)>12&&l()},u=f=>{f.pointerId===c&&(l(),c=null,h(!1),r||e?.(),r=!1)};i.addEventListener("touchstart",f=>f.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",f=>f.preventDefault()),i.addEventListener("pointerdown",f=>{if(f.preventDefault(),c=f.pointerId,o=f.clientX,a=f.clientY,r=!1,h(!0),f.pointerType==="mouse"&&f.button===2){r=!0,Jn(t(),o,a,n?.()??[]);return}s=setTimeout(()=>{r=!0,Jn(t(),o,a,n?.()??[])},200)})}const Nu=[{id:"object",label:"オブジェクト",key:"F8"},{id:"vertex",label:"頂点",key:"F9"},{id:"edge",label:"エッジ",key:"F10"},{id:"face",label:"フェース",key:"F11"}],rp=.5,op=2,Fu=1.25;function Sb(){const i=Number(localStorage.getItem("macbeth.manipSize"));return!Number.isFinite(i)||i<=0?1:Math.min(op,Math.max(rp,i))}const Fs={grid:"グリッド",vertex:"頂点",edge:"カーブ / エッジ",surface:"サーフェス"},wb={4:"wire",5:"shaded",6:"shadedWire",7:"smooth",8:"checker"},cs={model:"モデリング",uv:"UV",sculpt:"スカルプト",material:"マテリアル"},Eb={object:H.vObj,vertex:H.vVert,edge:H.vEdge,face:H.vFace},Ou={all:H.xform,move:H.move,rotate:H.rotate,scale:H.scale},ku={multicut:H.multicut,bevel:H.scale,bridge:H.vEdge,extrude:H.extrude,connect:H.vMulti,weld:H.vVert},Tb={multicut:"マルチカット",bevel:"ベベル",bridge:"ブリッジ",extrude:"押し出し",connect:"接続",weld:"ターゲットウェルド"},Cb={grid:H.snap,vertex:H.vVert,edge:H.vEdge,surface:H.vFace},Ab={wire:H.wire,shaded:H.shaded,shadedWire:H.shadedWire,smooth:H.smooth,checker:H.mUV},va={cube:H.pCube,sphere:H.pSphere,cylinder:H.pCylinder,cone:H.pCone,torus:H.pTorus,plane:H.pPlane,disk:H.pDisk,platonic:H.pPlatonic};class Rb{state=new uy;history=new dy(this.state);viewport;picker;selector;autosave=new My(this.state);hud=new Gy(this.state);gauges=[];marqueeEl=bt("marquee");marquee=null;popup=null;popupAnchor=null;syncingSelection=!1;router;manipulator;multicut;preselect;bevel=new Ey;weldTarget=null;gestureDrag=null;uv=null;panelHostForTest(){return this.panelHost()}pushSelectionToUvForTest(){this.pushSelectionToUv()}uvSplit="both";gestureView=null;gestureMoved=!1;bevelSnapshot=null;docking;layout;zones={tools:"left",outliner:"rightTop"};toolPanelBody=null;outlinerBody=null;openedLayers=new Set;thumbs=new Map;drawer=null;layersPanel=null;paramSnapshot=null;drag=null;pendingDrag=null;slideDrag=null;pivotDrag=null;dragSnapshot=null;raycaster=new df;constructor(){const t=bt("pane3d"),e=bt("gl");this.viewport=new ry(t,e,this.state),this.picker=new ey(this.viewport,t),this.picker.cameraBased=()=>this.state.cameraBased,this.selector=new Uy(this.state,this.picker,n=>{const s=this.state.doc.find(n);return s?this.viewport.viewOf(s):void 0}),this.multicut=new Cy(this.state,this.picker,this.viewport.preview),this.preselect=new Py(this.state,this.picker,this.viewport.preselect),this.viewport.seamProvider=()=>this.state.selected?.uv?.seams??null,this.viewport.softWeightsProvider=()=>{const n=this.state.selected;return n?Su(n.mesh,this.selector.selectedVertices(),{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0}).weights:new Map},this.manipulator=new ly({toScreen:n=>{const s=n.clone().project(this.viewport.camera);return{x:(s.x+1)/2*(t.clientWidth||1),y:(-s.y+1)/2*(t.clientHeight||1),z:s.z}},camera:()=>this.viewport.camera,orthoDistance:()=>this.state.camOpts.ortho?this.viewport.cam.distance:null,manipSize:()=>this.state.manipSize,pivotEdit:()=>this.state.pivotEdit}),this.state.manipSize=Sb(),this.viewport.manip.add(this.manipulator.group),this.history.onChange=()=>{this.updateHistoryButtons(),this.autosave.schedule()},this.autosave.onSaved=n=>this.hud.setSaveNote(`自動保存 ${new Date(n).toLocaleTimeString("ja-JP",{timeStyle:"short"})}`),this.autosave.onError=n=>this.hud.toast(n),this.router=new Qd(e,n=>this.picker.local(n),this.gestureHandlers()),this.router.attach(),this.docking=new Oy(bt("stage"),{onZoneChange:(n,s)=>{this.zones[n]=s,localStorage.setItem("macbeth.panelZones",JSON.stringify(this.zones))},onMessage:n=>this.hud.toast(n),onLayoutChange:()=>{this.layout?.apply(),this.viewport.resize()}});try{const n=localStorage.getItem("macbeth.panelZones");n&&(this.zones={...this.zones,...JSON.parse(n)})}catch{}this.restoreSettings(),this.buildToolDock(),this.buildPanels(),this.layout=new zy(bt("stage"),bt("dockColRight"),()=>{this.placeLayers(),this.viewport.resize()}),this.placeLayers(),this.buildGauges(),this.buildCluster(),this.bindKeyboard(),this.bindTopBar(),window.addEventListener("resize",()=>this.viewport.resize()),this.viewport.resize(),this.viewport.start()}async boot(){const t=await this.autosave.restore();t||this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]??null),this.viewport.syncAll(),this.refresh(),this.hud.defaultHint(),t?this.hud.toast("前回の続きを復元しました"):this.hud.setSaveNote(Sy())}gestureHandlers(){return{toolDown:(t,e)=>this.startTool(t,e),toolMove:(t,e)=>this.moveTool(t,e),toolUp:(t,e,n)=>this.finishTool(t,e,n),hover:(t,e)=>{this.updateCutPreview(t,e),this.updatePreselect(t,e)},hoverLeave:()=>{this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},openMarkingMenu:(t,e,n)=>this.openMarkingMenu(t,e,n),openTwoFingerMenu:(t,e)=>this.openTwoFingerMenu(t,e),openCameraMenu:(t,e)=>{this.closePopup(),Jn(this.cameraMenu(),t,e,this.savedCameraItems())},undo:()=>this.doUndo(),redo:()=>this.doRedo(),abort:()=>{this.endMarquee(),this.drag=null,this.pendingDrag=null,this.pivotDrag=null,this.slideDrag=null,this.dragSnapshot=null,this.manipulator.hot=-1,this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},isOnMesh:(t,e)=>{const n=this.tolerance(e);return this.state.selected&&this.manipulator.pick(t,this.pivotWorld(),this.state.manip,n)>=0?!0:this.hitSelectedComponent(t,n)||!!this.picker.pickSurface(t)},zoomPivot:()=>this.pivotWorld(),marqueeStart:t=>this.startMarquee(t),tumble:(t,e)=>this.viewport.tumble(t,e),pan:(t,e)=>this.viewport.pan(t,e),dolly:t=>this.viewport.dolly(t),dollyAbout:(t,e)=>this.viewport.dollyAbout(t,e),transformBegin:()=>this.beginGestureTransform(),transformUpdate:t=>this.updateGestureTransform(t),transformEnd:()=>this.endGestureTransform(),shiftOn:t=>this.state.modOn("shift")||t.shiftKey,altOn:t=>this.state.modOn("alt")||t.altKey}}eulerOf(t){const e=new Wn().setFromQuaternion(new cn(t[0],t[1],t[2],t[3]),"XYZ"),n=180/Math.PI;return[e.x*n,e.y*n,e.z*n]}pixelToWorldAt(t){const e=new I().setFromMatrixColumn(this.viewport.camera.matrix,0),n=this.manipulator.toScreen(t),s=this.manipulator.toScreen(t.clone().add(e)),r=Math.hypot(s.x-n.x,s.y-n.y);return r>1e-6?1/r:.01}screenRightAxis(){const t=new I().setFromMatrixColumn(this.viewport.camera.matrix,0);return Math.abs(t.x)>=Math.abs(t.z)?new I(Math.sign(t.x)||1,0,0):new I(0,0,Math.sign(t.z)||1)}beginGestureTransform(){if(this.state.tool!=="select"||this.state.pivotEdit)return!1;const t=this.state.selected,e=this.pivotWorld();if(!t||!e)return!1;const n=this.captureTarget();if(!n)return!1;const s=this.manipulator.toScreen(e);return this.dragSnapshot=this.history.snapshot(),this.gestureDrag=Eu({handle:oy,pivot:e,target:n,point:s,pivotScreen:s,ray:this.ray(s),cameraPosition:this.cameraPosition(),label:"変形"}),this.gestureView={pixelToWorld:this.pixelToWorldAt(e),horizontal:this.screenRightAxis()},this.gestureMoved=!1,!0}updateGestureTransform(t){const e=this.gestureDrag,n=this.gestureView,s=this.state.selected;if(!e||!n||!s)return;let r;if(t.kind==="scale")da(e,s,{scale:t.scale}),r=`スケール <kbd>×${t.scale.toFixed(2)}</kbd>`;else if(t.axis==="vertical"){const o=-t.pixels*n.pixelToWorld;da(e,s,{move:new I(0,o,0)}),r=`移動 <kbd>Y ${o>=0?"+":""}${o.toFixed(2)}</kbd>`}else{const o=t.pixels*n.pixelToWorld,a=n.horizontal;da(e,s,{move:a.clone().multiplyScalar(o)});const c=a.x!==0?"X":"Z",l=o*(a.x!==0?a.x:a.z);r=`移動 <kbd>${c} ${l>=0?"+":""}${l.toFixed(2)}</kbd>`}if(this.gestureMoved=!0,e.target.kind==="object"){const o=this.viewport.viewOf(s);o&&(sn(o.group,s.transform),o.group.updateMatrixWorld())}else this.viewport.refreshPositions(s);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats(),bt("hudHint").innerHTML=`${r} · 指 3 本`}endGestureTransform(){const t=this.gestureMoved;this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,t&&this.dragSnapshot&&this.history.commit("変形",this.dragSnapshot),this.dragSnapshot=null,this.refresh(),this.hud.defaultHint()}ray(t){return this.raycaster.setFromCamera(this.picker.ndc(t),this.viewport.camera),this.raycaster.ray}cameraPosition(){return this.viewport.camera.position}tolerance(t){return t.pointerType==="touch"?ay:1}hitSelectedComponent(t,e=1){const n=this.state.selected,s=n?this.viewport.viewOf(n):void 0;if(!n||!s||!this.state.comp.size)return!1;if(this.state.compMode==="face"){const r=this.picker.pickSurface(t);return!!r&&r.object===n&&this.state.comp.has(r.face)}if(this.state.compMode==="vertex"){const r=this.picker.pickVertex(s,t,22*e);return r>=0&&this.state.comp.has(r)}if(this.state.compMode==="edge"){const r=this.picker.pickEdge(s,t,16*e);return r.edge>=0&&this.state.comp.has(r.edge)}return!1}captureTarget(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;if(e.group.updateMatrixWorld(),this.state.compMode==="object")return{kind:"object",transform:ei(t.transform)};const n=this.selector.selectedVertices();if(!n.length)return null;const s=Su(t.mesh,n,{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0});s.skipped&&this.hud.toast("範囲が広すぎるのでソフト選択を省きました");const r=[],o=[],a=[];for(const[c,l]of s.weights){const h=t.mesh.getPosition(c);r.push(c),o.push(l),a.push(new I(h[0],h[1],h[2]).applyMatrix4(e.group.matrixWorld))}return{kind:"component",verts:r,weights:o,world:a,inverse:new oe().copy(e.group.matrixWorld).invert(),mirror:this.state.symX?wu(t.mesh,r):[]}}updatePreselect(t,e){if(e.pointerType==="touch"||this.state.tool==="multicut"){this.preselect.clear();return}const n=this.state.selected;this.preselect.update(t,n?this.viewport.viewOf(n):void 0)}updateCutPreview(t,e){if(this.state.tool!=="multicut")return;const n=this.state.selected,s=this.multicut.update(t,n?this.viewport.viewOf(n):void 0,this.state.modOn("shift")||e.shiftKey);s&&(bt("hudHint").innerHTML=s)}startTool(t,e){if(this.state.tool==="multicut"){this.updateCutPreview(t,e);return}if(this.state.tool==="bevel"){this.startBevel(t);return}const n=this.state.selected,s=this.pivotWorld(),r=this.tolerance(e);let o=n?this.manipulator.pick(t,s,this.state.manip,r):-1;if(o<0&&n&&this.state.compMode!=="object"&&this.hitSelectedComponent(t,r)&&(o=_l),o<0||!n||!s){this.startMarquee(t);return}if(this.state.pivotEdit){this.beginPivotDrag(o,t,s);return}if(e.pointerType!=="mouse"){this.pendingDrag={handle:o,point:t,t0:performance.now(),shift:this.state.modOn("shift")||e.shiftKey,ctrl:this.state.modOn("ctrl")||e.ctrlKey||e.metaKey},this.manipulator.hot=o,this.refreshManipulator();return}this.beginToolDrag(o,t,this.state.modOn("shift")||e.shiftKey,this.state.modOn("ctrl")||e.ctrlKey||e.metaKey)}beginToolDrag(t,e,n,s){const r=this.state.selected,o=this.pivotWorld();if(!r||!o){this.startMarquee(e);return}const a=this.history.snapshot();let c={move:"移動",rotate:"回転",scale:"スケール"}[Jr(t)??"move"];if(Jr(t)==="move"&&this.state.compMode!=="object"&&this.state.comp.size&&n&&s&&this.beginSlide(r,e)){this.dragSnapshot=a,this.manipulator.hot=t,this.refreshManipulator();return}Jr(t)==="move"&&this.state.compMode!=="object"&&this.state.comp.size&&n&&!s&&this.extrudeForDrag(r)&&(c="押し出し");const l=this.captureTarget();if(!l){this.startMarquee(e);return}this.dragSnapshot=a,this.drag=Eu({handle:t,pivot:this.pivotWorld()??o,target:l,point:e,pivotScreen:this.manipulator.toScreen(this.pivotWorld()??o),ray:this.ray(e),cameraPosition:this.cameraPosition(),label:c}),this.manipulator.hot=t,this.refreshManipulator()}beginSlide(t,e){const n=this.selector.selectedVertices();if(!n.length)return!1;const s=this.viewport.viewOf(t);if(!s)return!1;s.group.updateMatrixWorld();const r=Bf(t.mesh,n);if(![...r.values()].some(d=>d.length))return this.hud.toast("スライドできる辺がありません（まわりが全部選ばれています）"),!1;const o=d=>{const u=t.mesh.getPosition(d);return this.manipulator.toScreen(new I(u[0],u[1],u[2]).applyMatrix4(s.group.matrixWorld))},a=new Map;for(const d of n)a.set(d,o(d));const c=new Map;for(const[d,u]of r){const f=a.get(d);c.set(d,u.map(p=>{const v=o(p);return{x:v.x-f.x,y:v.y-f.y}}))}let l=n[0],h=1/0;for(const d of n){const u=a.get(d),f=Math.hypot(u.x-e.x,u.y-e.y);f<h&&(h=f,l=d)}return this.slideDrag={base:Float32Array.from(t.mesh.positions),rails:r,railScreen:c,anchor:l,start:e,mirror:this.state.symX?wu(t.mesh,n):[]},!0}updateSlide(t,e){const n=this.slideDrag;if(!n)return;const s=e.x-n.start.x,r=e.y-n.start.y,o=Math.hypot(s,r);if(o<1e-6)return;const a=new Map;for(const[h,d]of n.rails){const u=n.railScreen.get(h)??[];let f=-1,p=0;for(let v=0;v<d.length;v++){const g=u[v],m=Math.hypot(g.x,g.y);if(m<1e-6)continue;const x=(g.x*s+g.y*r)/(m*o);x>p&&(p=x,f=v)}f>=0&&a.set(h,d[f])}if(!a.size)return;const c=a.get(n.anchor);let l=0;if(c!==void 0){const h=(n.rails.get(n.anchor)??[]).indexOf(c),d=(n.railScreen.get(n.anchor)??[])[h],u=d?d.x*d.x+d.y*d.y:0;u>1e-9&&(l=(s*d.x+r*d.y)/u)}else{const[h,d]=[...a][0],u=(n.rails.get(h)??[]).indexOf(d),f=(n.railScreen.get(h)??[])[u],p=f?f.x*f.x+f.y*f.y:0;p>1e-9&&(l=(s*f.x+r*f.y)/p)}if(l=Math.max(0,Math.min(.99,l)),n.mirror.length){const h=t.mesh.vertexNeighbors();for(const[d,u]of n.mirror){const f=a.get(d);if(f===void 0)continue;const p=[-n.base[f*3],n.base[f*3+1],n.base[f*3+2]];let v=-1;for(const g of h.get(u)??[])if(Math.abs(n.base[g*3]-p[0])<1e-4&&Math.abs(n.base[g*3+1]-p[1])<1e-4&&Math.abs(n.base[g*3+2]-p[2])<1e-4){v=g;break}v>=0&&a.set(u,v)}}zf(t.mesh,n.base,a,l),this.viewport.refreshPositions(t),this.viewport.rebuildOverlay(),this.refreshManipulator(),bt("hudHint").innerHTML=`スライド <kbd>${l.toFixed(2)}</kbd>`}beginPivotDrag(t,e,n){const s=t<3?t:-1,r=new Qn().setFromNormalAndCoplanarPoint(new I().subVectors(this.cameraPosition(),n).normalize(),n);let o=null;if(s<0){const a=new I;this.ray(e).intersectPlane(r,a)&&(o=a)}this.pivotDrag={axis:s,origin:n.clone(),plane:r,planeStart:o,t0:s>=0?Qs(this.ray(e),n,je[s]):0},this.manipulator.hot=t,this.refreshManipulator()}updatePivotDrag(t){const e=this.pivotDrag;if(!e)return;const n=this.ray(t);let s;if(e.axis>=0){const r=Qs(n,e.origin,je[e.axis]);s=e.origin.clone().addScaledVector(je[e.axis],r-e.t0)}else{const r=new I;if(!n.intersectPlane(e.plane,r)||!e.planeStart)return;s=e.origin.clone().add(r.sub(e.planeStart))}if(this.state.snapping){const r=this.snapPoint(s);r&&(s=e.axis>=0?e.origin.clone().addScaledVector(je[e.axis],r.clone().sub(e.origin).dot(je[e.axis])):r.clone()),this.showSnapTarget()}this.state.pivotOverride={x:s.x,y:s.y,z:s.z},this.refreshManipulator(),this.state.snapping||(bt("hudHint").innerHTML=`ピボット <kbd>${s.x.toFixed(2)}, ${s.y.toFixed(2)}, ${s.z.toFixed(2)}</kbd>`)}togglePivotEdit(){this.state.pivotEdit=!this.state.pivotEdit,this.manipulator.hot=-1,this.syncToggleButtons(),this.refreshManipulator(),this.uv?.refreshManipulator(),this.refresh(),this.hud.toast(this.state.pivotEdit?"ピボット編集: オン（もう一度 D で終了）":"ピボット編集: オフ")}resetPivot(){this.state.pivotOverride=null,this.refreshManipulator(),this.uv?.resetPivot(),this.hud.toast("ピボットを選択の中心へ")}setManipSize(t){this.state.manipSize=Math.min(op,Math.max(rp,t)),localStorage.setItem("macbeth.manipSize",String(this.state.manipSize)),this.refreshManipulator(),this.uv?.refreshManipulator(),this.refresh(),this.hud.toast(`マニピュレータの大きさ ×${this.state.manipSize.toFixed(2)}`)}manipulatorMenu(){return{N:{label:"ユニバーサル",sub:"All  T",icon:H.xform,run:()=>this.setManip("all")},NE:{label:this.state.pivotEdit?"ピボットの移動を終える":"ピボットを移動",sub:"Pivot  D",icon:H.pivot,run:()=>this.togglePivotEdit()},E:{label:"移動",sub:"Move  W",icon:H.move,run:()=>this.setManip("move")},SE:{label:"ピボットを戻す",sub:"Center",icon:H.vObj,run:()=>this.resetPivot()},S:{label:"回転",sub:"Rotate  E",icon:H.rotate,run:()=>this.setManip("rotate")},SW:{label:"距離でマージ",sub:"Merge",icon:H.vVert,run:()=>this.doMergeByDistance()},W:{label:"スケール",sub:"Scale  R",icon:H.scale,run:()=>this.setManip("scale")},NW:{label:"初期設定に戻す",sub:"Reset",icon:H.xform,run:()=>{this.state.pivotEdit=!1,this.state.pivotOverride=null,this.uv?.resetPivot(),this.setManip("all"),this.setManipSize(1),this.syncToggleButtons(),this.hud.toast("マニピュレータを初期設定に戻した")}}}}extrudeForDrag(t){if(this.state.compMode==="face"){const n=uc(t.mesh,this.state.comp,0);return n?(t.mesh=n.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),!0):!1}if(this.state.compMode==="edge"){const n=this.viewport.viewOf(t);if(!n)return!1;const s=[...this.state.comp].map(a=>n.edges[a]).filter(Boolean),r=fc(t.mesh,s,0);if(!r)return!1;t.mesh=r.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t);const o=this.viewport.viewOf(t);if(o){const a=new Set(r.newEdges.map(([c,l])=>`${Math.min(c,l)}_${Math.max(c,l)}`));this.state.comp.clear(),o.edges.forEach(([c,l],h)=>{a.has(`${Math.min(c,l)}_${Math.max(c,l)}`)&&this.state.comp.add(h)})}return this.viewport.rebuildOverlay(),!0}const e=dc(t.mesh,this.state.comp,0,this.state.vertexOpts.extrudeWidth);if(!e)return this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）"),!1;t.mesh=e.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t),this.state.comp.clear();for(const n of e.tips)this.state.comp.add(n);return this.viewport.rebuildOverlay(),!0}moveTool(t,e){if(this.state.tool==="multicut")return this.updateCutPreview(t,e);if(this.state.tool==="bevel")return this.dragBevel(t);if(this.marquee)return this.updateMarquee(t);if(this.pivotDrag)return this.updatePivotDrag(t);if(this.slideDrag){const o=this.state.selected;o&&this.updateSlide(o,t);return}if(this.pendingDrag){const o=this.pendingDrag,a=Math.hypot(t.x-o.point.x,t.y-o.point.y),c=performance.now()-o.t0;if(a<=vl&&!(a>ps&&c>xl))return;if(this.pendingDrag=null,this.beginToolDrag(o.handle,o.point,o.shift,o.ctrl),this.slideDrag){const l=this.state.selected;l&&this.updateSlide(l,t);return}}const n=this.drag,s=this.state.selected;if(!n||!s)return;const r=this.state.snapping&&n.kind==="move";if(Fy(n,s,t,this.ray(t),this.cameraPosition(),{snap:r?o=>this.snapPoint(o):void 0,rotateStep:this.state.rotateStep,preventNegativeScale:this.state.preventNegativeScale}),r?this.showSnapTarget():this.updateWeldTarget(t,e,s),n.target.kind==="object"){const o=this.viewport.viewOf(s);o&&(sn(o.group,s.transform),o.group.updateMatrixWorld())}else this.viewport.refreshPositions(s);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats()}snapHit=null;snapPoint(t){const e=this.state.snap.kind;if(e==="grid"){const d=Math.max(1e-4,this.state.snap.step),u=new I(Math.round(t.x/d)*d,Math.round(t.y/d)*d,Math.round(t.z/d)*d);return this.snapHit=u,u}if(e==="surface"){const d=this.manipulator.toScreen(t),u=this.picker.pickSurface(d,this.state.selected);return this.snapHit=u?u.point.clone():null,this.snapHit}const n=this.manipulator.toScreen(t),s=40;let r=null,o=s;const a=d=>{const u=this.manipulator.toScreen(d),f=Math.hypot(u.x-n.x,u.y-n.y);f<o&&(o=f,r=d)},c=this.state.selected,l=this.state.compMode==="object",h=this.state.compMode==="vertex"?this.state.comp:null;for(const d of this.state.doc.objects){if(l&&d===c)continue;const u=this.viewport.viewOf(d);if(!u)continue;const f=d.mesh,p=v=>new I(f.positions[v*3],f.positions[v*3+1],f.positions[v*3+2]).applyMatrix4(u.group.matrixWorld);if(e==="vertex")for(let v=0;v<f.vertexCount;v++)d===c&&h?.has(v)||a(p(v));else for(const[v,g]of u.edges){if(d===c&&h?.has(v)&&h.has(g))continue;const m=p(v),y=p(g).clone().sub(m),_=y.lengthSq(),S=_>1e-12?Math.max(0,Math.min(1,t.clone().sub(m).dot(y)/_)):0;a(m.clone().addScaledVector(y,S))}}return this.snapHit=r,r}showSnapTarget(){const t=this.snapHit;if(this.preselect.clear(),!t){bt("hudHint").innerHTML=`スナップ <kbd>${Fs[this.state.snap.kind]}</kbd> · near なし`;return}this.preselect.showWorldPoint(t.x,t.y,t.z),bt("hudHint").innerHTML=`スナップ <kbd>${Fs[this.state.snap.kind]}</kbd> · <kbd>${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}</kbd>`}updateWeldTarget(t,e,n){if(this.weldTarget=null,this.preselect.clear(),this.state.compMode!=="vertex"||this.state.comp.size!==1)return;const s=this.viewport.viewOf(n);if(!s)return;const r=[...this.state.comp][0],o=22*this.tolerance(e),a=this.picker.pickVertexExcept(s,t,o,r);a<0||(this.weldTarget=a,this.preselect.showVertex(s,a),bt("hudHint").innerHTML="離すと <kbd>この頂点へ溶接</kbd> します")}applyTargetWeld(t,e,n){t.mesh=Un(Ys(t.mesh,[[e,n]]));const s=t.markTopologyChanged();this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let r="ターゲットウェルド";(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),s.rebased&&(r+=" · UV の土台を取り直した"),this.hud.toast(r)}finishTool(t,e,n){if(this.state.tool==="multicut"){this.doMultiCut();return}if(this.state.tool==="bevel"){this.endBevel(n);return}if(this.slideDrag){const r=this.slideDrag;this.slideDrag=null,this.manipulator.hot=-1;const o=this.state.selected;!!o&&r.base.some((c,l)=>Math.abs(c-o.mesh.positions[l])>1e-6)&&this.dragSnapshot&&(this.history.commit("スライド",this.dragSnapshot),this.hud.toast("スライド")),this.dragSnapshot=null,this.refreshManipulator(),this.refresh();return}if(this.pivotDrag){this.pivotDrag=null,this.manipulator.hot=-1,this.preselect.clear(),this.refreshManipulator(),this.hud.defaultHint();return}if(this.pendingDrag){this.pendingDrag=null,this.manipulator.hot=-1,this.refreshManipulator(),this.applySelectResult(this.selector.click(t,e));return}const s=this.marquee;if(s){this.endMarquee();const r=this.selector.marquee(s.x0,s.y0,s.x1,s.y1,t,e);this.applySelectResult(r)}else if(this.drag){const r=this.drag;if(this.drag=null,this.manipulator.hot=-1,this.preselect.clear(),!n)this.dragSnapshot=null,this.applySelectResult(this.selector.click(t,e));else if(this.dragSnapshot){const o=this.weldTarget,a=this.state.compMode==="vertex"?[...this.state.comp][0]:void 0;o!==null&&a!==void 0&&this.state.selected?(this.applyTargetWeld(this.state.selected,a,o),this.history.commit("ターゲットウェルド",this.dragSnapshot)):(this.history.commit(r.label,this.dragSnapshot),this.hud.toast(r.label)),this.dragSnapshot=null}else this.dragSnapshot=null;this.refresh()}else n||this.applySelectResult(this.selector.click(t,e))}selectedEdgePairs(t){const e=this.viewport.viewOf(t);return e?[...this.state.comp].map(n=>e.edges[n]).filter(Boolean):[]}startBevel(t){const e=this.state.selected;if(!e||this.state.compMode!=="edge"||!this.state.comp.size){this.hud.toast("エッジモードでエッジを選択してから、左右にドラッグしてください");return}const n=this.selectedEdgePairs(e),s=this.history.snapshot();this.bevel.begin(e,n,t.x)&&(this.bevelSnapshot=s)}dragBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;this.state.bevel.width=this.bevel.widthFromDrag(t.x-e.startX,e.scale);const s=this.bevel.apply(this.state.bevel);if(!s){this.hud.toast("この形はまだベベルできません（四角形と閉じたエッジのみ）");return}this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.hud.refreshStats(),bt("hudHint").innerHTML=`ベベル <kbd>幅 ${this.state.bevel.width.toFixed(3)}</kbd> · <kbd>${this.state.bevel.segments} 分割</kbd> · ${s.faces} 面`}endBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;if(!t){this.bevel.cancel(),this.bevel.end(),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.refresh();return}const s=n.markTopologyChanged();this.state.comp.clear(),this.bevelSnapshot&&this.history.commit("ベベル",this.bevelSnapshot),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.refresh();let r=`ベベル — 幅 ${this.state.bevel.width.toFixed(3)} · ${this.state.bevel.segments} 分割`;(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),this.hud.toast(`${r}（オプションで作り直せます）`)}redoBevel(){const t=this.state.selected;!t||!this.bevel.active||this.bevel.apply(this.state.bevel)&&(this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats())}doMultiCut(){const t=this.state.selected;if(!t)return;const e=this.history.snapshot(),n=this.multicut.commit(this.viewport.viewOf(t));n&&(t.markTopologyChanged(),this.state.comp.clear(),this.history.commit("エッジループ挿入",e),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`エッジループを挿入しました — ${n.faceCount} 面`))}screenOfVertex(t){const e=this.state.selected,n=e?this.viewport.viewOf(e):void 0;if(!n||t>=n.object.mesh.vertexCount)return null;const s=this.picker.projectVertex(n,t);return{x:s.x,y:s.y}}refreshManipulator(){if(this.state.tool!=="select"){this.manipulator.clear();return}const t=[this.state.compMode,this.state.selected?.id??"-",this.state.comp.size,this.state.tool].join(",");this.manipulator.rebuild(this.pivotWorld(),this.state.manip,t)}setTool(t){if(this.state.tool!==t){this.bevel.active&&(this.bevel.end(),this.bevelSnapshot=null),this.state.tool=t,this.multicut.clear(),this.preselect.clear(),this.manipulator.clear(),this.refresh();for(const e of document.querySelectorAll("[data-tool]"))e.setAttribute("aria-pressed",String(e.dataset.tool===t));this.renderToolColumn(),this.hud.toast(t==="multicut"?"マルチカット":"選択・変形"),this.hud.defaultHint()}}setDisplay(t){this.state.display=t,this.renderToolColumn(),this.viewport.syncAll(),this.refresh(),this.hud.toast({wire:"ワイヤーフレーム",shaded:"シェード",shadedWire:"シェード + ワイヤー",smooth:"スムースシェード",checker:"チェッカー（UV の確認）"}[t])}setManip(t){this.state.manip=t,this.manipulator.clear(),this.renderToolColumn(),this.refreshManipulator(),this.hud.toast(`マニピュレータ: ${{all:"ユニバーサル",move:"移動",rotate:"回転",scale:"スケール"}[t]}`)}applySelectResult(t){t.changed&&(t.objectChanged&&this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),this.pushSelectionToUv(),t.message&&this.hud.toast(t.message))}pushSelectionToUv(){if(this.state.mode!=="uv"||!this.uv||this.syncingSelection)return;this.syncingSelection=!0;const t=this.state.selected,e=t?this.viewport.viewOf(t):void 0,n=[];if(this.state.compMode==="edge"&&e)for(const s of this.state.comp){const r=e.edges[s];r&&n.push(`${Math.min(r[0],r[1])}_${Math.max(r[0],r[1])}`)}this.uv.syncFromView(this.state.compMode,{verts:this.state.compMode==="vertex"?[...this.state.comp]:[],edges:n,faces:this.state.compMode==="face"?[...this.state.comp]:[]}),this.hud.uvNote=this.uv.stats(),this.hud.refreshStats(),this.syncingSelection=!1}startMarquee(t){this.marquee={x0:t.x,y0:t.y,x1:t.x,y1:t.y},this.marqueeEl.style.display="block",this.updateMarquee(t)}updateMarquee(t){const e=this.marquee;if(!e)return;e.x1=t.x,e.y1=t.y;const n=bt("pane3d"),s=n.offsetLeft,r=n.offsetTop;this.marqueeEl.style.left=`${Math.min(e.x0,e.x1)+s}px`,this.marqueeEl.style.top=`${Math.min(e.y0,e.y1)+r}px`,this.marqueeEl.style.width=`${Math.abs(e.x1-e.x0)}px`,this.marqueeEl.style.height=`${Math.abs(e.y1-e.y0)}px`}endMarquee(){this.marquee=null,this.marqueeEl.style.display="none"}pivotWorld(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;const n=this.state.pivotOverride;if(n)return new I(n.x,n.y,n.z);if(e.group.updateMatrixWorld(),this.state.compMode==="object"||!this.state.comp.size)return new I().setFromMatrixPosition(e.group.matrixWorld);const s=this.selector.selectedVertices();if(!s.length)return null;const r=new I(1/0,1/0,1/0),o=new I(-1/0,-1/0,-1/0);for(const a of s){const c=t.mesh.getPosition(a),l=new I(c[0],c[1],c[2]).applyMatrix4(e.group.matrixWorld);r.min(l),o.max(l)}return r.add(o).multiplyScalar(.5)}openMarkingMenu(t,e,n){this.closePopup(),Jn(n?this.editMenu():this.selectModeMenu(),t,e)}openTwoFingerMenu(t,e){if(this.closePopup(),this.state.selected){Jn(this.editMenu(),t,e);return}Jn(this.cameraMenu(),t,e,this.savedCameraItems())}cameraMenu(){const t=e=>({label:Vs[e].label,sub:Vs[e].sub,icon:H.camera,run:()=>this.setView(e)});return{N:t("persp"),NE:{label:"新規カメラ",sub:"New Camera",icon:H.camera,run:()=>this.addCamera()},E:t("right"),SE:t("bottom"),S:t("front"),SW:t("back"),W:t("top"),NW:t("left")}}savedCameraItems(){return this.state.cameras.map(t=>({label:t.name,run:()=>this.recallCamera(t)}))}setView(t){this.viewport.setView(t),this.state.viewName=Vs[t].label,this.refresh(),this.hud.toast(`${Vs[t].label}ビュー`)}addCamera(){const t=this.viewport.cam,e={name:`camera${this.state.cameras.length+1}`,theta:t.theta,phi:t.phi,distance:t.distance,target:[t.target.x,t.target.y,t.target.z],focal:this.state.camOpts.focal,ortho:this.state.camOpts.ortho};this.state.cameras.push(e),this.state.viewName=e.name,this.refresh(),this.hud.toast(`${e.name} を控えました`)}recallCamera(t){const e=this.viewport.cam;e.theta=t.theta,e.phi=t.phi,e.distance=t.distance,e.target.set(t.target[0],t.target[1],t.target[2]),t.focal!==void 0&&(this.state.camOpts.focal=t.focal),t.ortho!==void 0&&(this.state.camOpts.ortho=t.ortho),this.viewport.applyCamera(),this.state.viewName=t.name,this.refresh(),this.hud.toast(`${t.name} に切り替えました`)}modeMenu(){const t=e=>()=>this.setMode(e);return{N:{label:cs.model,sub:"Modeling",icon:H.mModel,run:t("model")},E:{label:cs.uv,sub:"UV Editor",icon:H.mUV,run:t("uv")},S:{label:cs.sculpt,sub:"Sculpt",icon:H.mSculpt,run:t("sculpt")},W:{label:cs.material,sub:"Material",icon:H.mMaterial,run:t("material")}}}setMode(t){if(this.state.mode===t)return;this.state.mode=t,bt("modeLabel").textContent=cs[t],this.closePopup(),this.multicut.clear(),this.preselect.clear();const e=bt("modeStub");e.textContent="";const n=lb[t];t==="uv"?this.enterUv():this.leaveUv(),n?(e.appendChild(hb(n)),e.hidden=!1,bt("stage").hidden=!0):(e.hidden=!0,bt("stage").hidden=!1,this.viewport.resize()),this.renderToolColumn(),this.refresh(),this.hud.toast(cs[t])}uvToolColumn(){const t=this.uv;if(!t)return[];const e={vertex:H.vVert,edge:H.vEdge,shell:H.vFace},n=(s,r,o,a)=>({kind:"button",id:s,icon:r,title:o,onTap:a});return[{kind:"label",text:"選択"},{kind:"button",id:"select",icon:()=>e[t.unit],title:"UV の選択（長押しで 頂点 / エッジ / シェル）",radial:()=>({E:{label:"UV 頂点",sub:"Vertex",icon:H.vVert,run:()=>this.setUvUnit("vertex")},S:{label:"UV エッジ",sub:"Edge",icon:H.vEdge,run:()=>this.setUvUnit("edge")},W:{label:"UV シェル",sub:"Shell",icon:H.vFace,run:()=>this.setUvUnit("shell")}}),options:()=>[Ru(this.optionsState(),this.panelHost())],onTap:()=>{}},{kind:"button",id:"xform",icon:()=>this.state.pivotEdit?H.pivot:Ou[this.state.manip],title:"変形（長押しで マニピュレータ / ピボット）",pressed:()=>this.state.pivotEdit,radial:()=>this.manipulatorMenu(),options:()=>this.xformOptions(),onTap:()=>{}},{kind:"button",id:"snap",icon:()=>this.state.uvSnap.kind==="vertex"?H.vVert:H.snap,title:"スナップ（タップでオン / オフ · 長押しで種類）",pressed:()=>this.state.snapOn,radial:()=>this.uvSnapMenu(),onTap:()=>this.toggleSnap()},{kind:"separator"},{kind:"label",text:"UV"},{kind:"button",id:"unfold",icon:H.smooth,title:"展開（タップで開き直す · 長押しで自動 UV と方式）",radial:()=>({N:{label:"展開",sub:"Unfold",icon:H.smooth,run:()=>t.unfold()},E:{label:"自動 UV",sub:"Auto",icon:H.mUV,run:()=>t.autoUnwrap()},S:{label:"整列",sub:"Layout",icon:H.vMulti,run:()=>t.repack()},W:{label:"オプション…",sub:"Options",icon:H.mUV,run:()=>this.openGroupOptions("unfold",()=>this.uvUnfoldOptions())}}),onTap:()=>t.unfold()},n("cut",H.multicut,"カット（選んだところを切る）",()=>t.cutOrSew(!0)),n("sew",H.vEdge,"ソー（切れ目を縫う。エッジ / シェルは動かしてから縫う）",()=>t.unit==="vertex"?t.cutOrSew(!1):t.moveAndSew()),{kind:"separator"},n("frame",H.frame,"選択にフレーム",()=>t.frame()),{kind:"separator"},{kind:"label",text:"3D"},{kind:"button",id:"camera",icon:H.camera,title:"カメラ（長押しでビューの切り替え · タップで設定）",pressed:()=>this.state.camOpts.ortho,radial:()=>this.cameraMenu(),radialList:()=>this.savedCameraItems(),options:()=>[Lu(this.optionsState(),this.panelHost())],onTap:()=>{}},{kind:"button",id:"add",icon:()=>va[this.primitiveIconKind()]??H.prim,title:"追加（長押しでプリミティブを選ぶ · タップで入力ノード）",radial:()=>this.primitiveMenu(),options:()=>[Pu(this.optionsState(),this.panelHost())],onTap:()=>{}}]}setUvUnit(t){this.uv?.setUnit(t),this.renderToolColumn()}uvUnfoldOptions(){const t=this.optionsState();if(!t.uv)return[];const e=this.panelHost();return[...ib(t.uv,e),sb(t.uv,t,e)]}enterUv(){const t=this.state.selected;this.uv||(this.uv=new xb(bt("paneUv"),bt("uvgl"),{object:()=>this.state.selected,recipe:()=>this.state.selected?.uv??null,changed:n=>{const s=this.state.selected;s&&this.viewport.rebuildObject(s),this.viewport.rebuildOverlay(),this.hud.uvNote=this.uv?.stats()??null,this.refresh(),n&&this.hud.toast(n)},snapshot:()=>this.history.snapshot(),commit:(n,s)=>this.history.commit(n,s),syncToView:n=>{if(this.syncingSelection)return;this.syncingSelection=!0;const s=this.state.selected;if(this.state.compMode=n.mode,this.state.comp.clear(),n.mode==="vertex")for(const r of n.verts)this.state.comp.add(r);else if(n.mode==="edge"){const r=s?this.viewport.viewOf(s):void 0,o=new Set(n.edges);r?.edges.forEach(([a,c],l)=>{o.has(`${Math.min(a,c)}_${Math.max(a,c)}`)&&this.state.comp.add(l)})}else for(const r of n.faces)this.state.comp.add(r);this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats(),this.syncCompModeButtons(),this.syncingSelection=!1},markingMenu:(n,s,r)=>{this.closePopup(),Jn(r?this.uvEditMenu():this.uvSelectMenu(),n,s)},cameraMenu:(n,s)=>{this.closePopup(),Jn({N:{label:"0〜1 にフレーム",sub:"Unit",icon:H.frame,run:()=>this.uv?.view.frameUnit()},S:{label:"選択にフレーム",sub:"Frame  F",icon:H.frame,run:()=>this.uv?.frame()}},n,s)},hint:n=>{bt("hudHint").innerHTML=n},toast:n=>this.hud.toast(n),undo:()=>this.doUndo(),redo:()=>this.doRedo(),shiftOn:n=>this.state.modOn("shift")||n.shiftKey,ctrlOn:n=>this.state.modOn("ctrl")||n.ctrlKey||n.metaKey,marquee:n=>{if(!n){this.marqueeEl.style.display="none";return}const s=bt("paneUv"),r=s.offsetLeft,o=s.offsetTop;this.marqueeEl.style.display="block",this.marqueeEl.style.left=`${Math.min(n.x0,n.x1)+r}px`,this.marqueeEl.style.top=`${Math.min(n.y0,n.y1)+o}px`,this.marqueeEl.style.width=`${Math.abs(n.x1-n.x0)}px`,this.marqueeEl.style.height=`${Math.abs(n.y1-n.y0)}px`},uvSnap:()=>this.state.snapping?this.state.uvSnap:null,selectedFaces:()=>this.state.compMode==="face"?[...this.state.comp]:[],manipSize:()=>this.state.manipSize,pivotEdit:()=>this.state.pivotEdit,smoothAngle:()=>this.state.smoothAngle}),this.buildUvSwitch());let e=null;t&&!t.uv&&(t.uv=il(t.mesh),e=ti(t.mesh,t.uv).charts.length,this.viewport.rebuildObject(t)),bt("paneUv").hidden=!1,bt("uvSwitch").hidden=!1,this.applyUvSplit(),this.uv.start(),this.uv.rebuild(),this.hud.uvNote=this.uv.stats(),this.pushSelectionToUv(),e!==null&&this.hud.toast(`今の UV を取り込んだ — 島 ${e}（「展開」を押すまで開き直しません）`)}leaveUv(){this.hud.uvNote=null,this.uv&&(this.uv.stop(),bt("paneUv").hidden=!0,bt("uvSwitch").hidden=!0,bt("vp").classList.remove("split","uvonly"),this.viewport.resize())}buildUvSwitch(){const t=bt("uvSwitch");t.textContent="";for(const[e,n]of[["uv","2D"],["both","両方"],["view","3D"]]){const s=nt("button");s.textContent=n,s.dataset.split=e,s.addEventListener("click",()=>{this.uvSplit=e,this.applyUvSplit()}),t.appendChild(s)}}applyUvSplit(){const t=bt("vp");t.classList.toggle("split",this.uvSplit==="both"),t.classList.toggle("uvonly",this.uvSplit==="uv"),bt("paneUv").hidden=this.uvSplit==="view";for(const e of bt("uvSwitch").querySelectorAll("button"))e.setAttribute("aria-pressed",String(e.dataset.split===this.uvSplit));requestAnimationFrame(()=>{this.viewport.resize(),this.uv?.resize()})}uvSelectMenu(){const t=n=>()=>this.uv?.setUnit(n),e=this.uv;return{N:{label:"UV エッジ",sub:"UV Edge",icon:H.vEdge,run:t("edge")},NE:{label:"オブジェクト",sub:"Object",icon:H.vObj,run:()=>this.setMode("model")},E:{label:"UV シェル",sub:"Shell",icon:H.vFace,run:t("shell")},SE:{label:"カット",sub:"Cut",icon:H.multicut,run:()=>e?.cutOrSew(!0)},S:{label:"面（3D と同期）",sub:"Face",icon:H.vFace,run:t("shell")},SW:{label:"移動して縫う",sub:"Move and Sew",icon:H.vEdge,run:()=>e?.unit==="vertex"?e?.cutOrSew(!1):e?.moveAndSew()},W:{label:"UV 頂点",sub:"UV Vertex",icon:H.vVert,run:t("vertex")}}}uvEditMenu(){const t=this.uv;if(!t)return{};const e={N:{label:"展開",sub:"Unfold",icon:H.smooth,run:()=>t.unfold()},NE:{label:"カット",sub:"Cut",icon:H.multicut,run:()=>t.cutOrSew(!0)},E:{label:t.unit==="vertex"?"ソー":"移動して縫う",sub:t.unit==="vertex"?"Sew":"Move and Sew",icon:H.vEdge,run:()=>t.unit==="vertex"?t.cutOrSew(!1):t.moveAndSew()}};return t.unit==="edge"?{...e,SE:{label:"整列",sub:"Layout",icon:H.vMulti,run:()=>t.repack()},S:{label:"直線化",sub:"Straighten",icon:H.vEdge,run:()=>t.tidy("straighten")},SW:{label:"境界の直線化",sub:"Straighten Border",icon:H.vEdge,run:()=>t.straightenBorderEdges()},W:{label:"整列 V",sub:"Align V",icon:H.vMulti,run:()=>t.tidy("alignV")},NW:{label:"マージ",sub:"Merge",icon:H.vVert,run:()=>t.tidy("merge")}}:t.unit==="vertex"?{...e,SE:{label:"ピン",sub:"Pin",icon:H.vVert,run:()=>t.pinOrUnpin(!0)},S:{label:"ピン解除",sub:"Unpin",icon:H.vVert,run:()=>t.pinOrUnpin(!1)},SW:{label:"整列 U",sub:"Align U",icon:H.vMulti,run:()=>t.tidy("alignU")},W:{label:"整列 V",sub:"Align V",icon:H.vMulti,run:()=>t.tidy("alignV")},NW:{label:"対称",sub:"Symmetry",icon:H.sym,run:()=>t.tidy("symmetry")}}:{...e,SE:{label:"90° 回転",sub:"Rotate",icon:H.rotate,run:()=>t.transformSelection("rotate90")},S:{label:"整列",sub:"Layout",icon:H.vMulti,run:()=>t.repack()},SW:{label:"格子化",sub:"Gridding",icon:H.wire,run:()=>t.gridChart()},W:{label:"反転 U",sub:"Flip U",icon:H.sym,run:()=>t.transformSelection("flipU")},NW:{label:"反転 V",sub:"Flip V",icon:H.sym,run:()=>t.transformSelection("flipV")}}}toggleSnap(){this.state.snapOn=!this.state.snapOn,this.syncToggleButtons(),this.refresh(),this.hud.toast(this.state.snapOn?`スナップ オン: ${Fs[this.state.snap.kind]}`:"スナップ オフ")}setSnapKind(t){this.state.snap.kind=t,this.state.snapOn=!0,this.renderToolColumn(),this.syncToggleButtons(),this.refresh(),this.hud.toast(`スナップ: ${Fs[t]}`)}snapMenu(){return{N:{label:"グリッド",sub:"Grid  X",icon:H.wire,run:()=>this.setSnapKind("grid")},E:{label:"頂点",sub:"Point  V",icon:H.vVert,run:()=>this.setSnapKind("vertex")},S:{label:"カーブ / エッジ",sub:"Curve  C",icon:H.vEdge,run:()=>this.setSnapKind("edge")},W:{label:"サーフェス",sub:"Surface",icon:H.vFace,run:()=>this.setSnapKind("surface")},SE:{label:"オプション…",sub:"Options",icon:H.snap,run:()=>this.openGroupOptions("snap",()=>[Qy(this.optionsState(),this.panelHost())])},SW:{label:"オフ",sub:"Off",icon:H.snap,run:()=>{this.state.snapOn=!1,this.syncToggleButtons(),this.refresh(),this.hud.toast("スナップ オフ")}}}}uvSnapMenu(){const t=(e,n)=>({label:n,sub:"Grid",icon:H.wire,run:()=>{this.state.uvSnap={kind:"grid",step:e},this.state.snapOn=!0,this.syncToggleButtons(),this.refresh(),this.hud.toast(`UV スナップ: グリッド ${n}`)}});return{N:t(1/8,"1/8"),NE:t(1/16,"1/16"),E:t(1/32,"1/32"),S:{label:"UV 頂点",sub:"UV Point",icon:H.vVert,run:()=>{this.state.uvSnap={...this.state.uvSnap,kind:"vertex"},this.state.snapOn=!0,this.syncToggleButtons(),this.refresh(),this.hud.toast("UV スナップ: UV 頂点")}},SW:{label:"オフ",sub:"Off",icon:H.snap,run:()=>{this.state.snapOn=!1,this.syncToggleButtons(),this.refresh(),this.hud.toast("スナップ オフ")}}}}shadingMenu(){return{N:{label:"ワイヤーフレーム",sub:"4",icon:H.wire,run:()=>this.setDisplay("wire")},E:{label:"シェード",sub:"5",icon:H.shaded,run:()=>this.setDisplay("shaded")},S:{label:"シェード + ワイヤー",sub:"6",icon:H.shadedWire,run:()=>this.setDisplay("shadedWire")},W:{label:"スムースシェード",sub:"7",icon:H.smooth,run:()=>this.setDisplay("smooth")},NW:{label:"チェッカー",sub:"8",icon:H.mUV,run:()=>this.setDisplay("checker")}}}selectModeMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return{N:{label:"エッジ",sub:"Edge",icon:H.vEdge,run:()=>this.setCompMode("edge")},NE:{label:"オブジェクト モード",sub:"Object",icon:H.vObj,run:()=>this.setCompMode("object")},SE:{label:"マルチ",sub:"Multi",icon:H.vMulti,run:t("マルチコンポーネント選択")},S:{label:"フェース",sub:"Face",icon:H.vFace,run:()=>this.setCompMode("face")},SW:{label:"頂点フェース",sub:"Vertex Face",icon:H.vVertFace,run:t("頂点フェース選択")},W:{label:"頂点",sub:"Vertex",icon:H.vVert,run:()=>this.setCompMode("vertex")},NW:this.state.modOn("ctrl")?{label:"選択を縮小",sub:"Shrink  <",icon:H.vMulti,run:()=>this.growOrShrink(!1)}:{label:"選択を拡張",sub:"Grow  >",icon:H.vMulti,run:()=>this.growOrShrink(!0)}}}editMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return this.state.compMode==="face"?{N:{label:"押し出し",sub:"Extrude",icon:H.extrude,run:()=>this.doExtrudeFaces()},NE:{label:"ベベル",sub:"Bevel",icon:H.scale,run:t("ベベル")},E:{label:"ブリッジ",sub:"Bridge",icon:H.vEdge,run:t("ブリッジ")},SE:{label:"複製",sub:"Duplicate",icon:H.dup,run:()=>this.doDuplicateFaces()},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>this.doDeleteFaces()},SW:{label:"コラプス",sub:"Collapse",icon:H.vVert,run:()=>this.doCollapseFaces()},W:{label:"スムース",sub:"Smooth",icon:H.smooth,run:()=>this.doSmooth()},NW:{label:"抽出",sub:"Extract",icon:H.vFace,run:()=>this.doExtractFaces()}}:this.state.compMode==="edge"?{N:{label:"押し出し",sub:"Extrude",icon:H.extrude,run:()=>this.doExtrudeEdgesMenu()},NE:{label:"ベベル",sub:"Bevel",icon:H.scale,run:()=>this.setTool("bevel")},E:{label:"ブリッジ",sub:"Bridge",icon:H.vEdge,run:()=>this.doBridge()},SE:{label:"エッジループ挿入",sub:"Insert Loop",icon:H.multicut,run:()=>this.setTool("multicut")},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>this.doDeleteEdges()},SW:{label:"スピン",sub:"Spin",icon:H.rotate,run:t("スピンエッジ")},W:{label:"接続",sub:"Connect",icon:H.vMulti,run:()=>this.doConnectEdges()},NW:{label:"境界を選択",sub:"Boundary",icon:H.vEdge,run:()=>this.selectBoundary()}}:this.state.compMode==="vertex"?{N:{label:"距離でマージ",sub:"Merge",icon:H.vVert,run:()=>this.doMergeByDistance()},NE:{label:"中心にマージ",sub:"To Center",icon:H.vObj,run:()=>this.doMergeVertices()},E:{label:"面取り",sub:"Chamfer",icon:H.scale,run:t("面取り")},SE:{label:"接続",sub:"Connect",icon:H.vMulti,run:()=>this.doConnectVertices()},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>this.doDissolveVertices()},SW:{label:"平均化",sub:"Average",icon:H.smooth,run:t("平均化")},W:{label:"分離",sub:"Detach",icon:H.vVertFace,run:t("分離")},NW:{label:"押し出し",sub:"Extrude",icon:H.extrude,run:()=>this.doExtrudeVertices()}}:{N:{label:"スムース",sub:"Smooth",icon:H.smooth,run:()=>this.doSmooth()},NE:{label:"中心にピボット",sub:"Center Pivot",icon:H.vObj,run:()=>this.doCenterPivot()},E:{label:"分離",sub:"Separate",icon:H.vVertFace,run:()=>this.doSeparate()},SE:{label:"複製",sub:"Duplicate",icon:H.dup,run:()=>this.doDuplicate()},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>this.doDelete()},SW:{label:"ミラー",sub:"Mirror",icon:H.sym,run:()=>this.doMirror()},W:{label:"結合",sub:"Combine",icon:H.prim,run:()=>this.doCombine()},NW:{label:"フリーズ",sub:"Freeze",icon:H.vObj,run:()=>this.doFreeze()}}}growOrShrink(t){this.applySelectResult(this.selector.growOrShrink(t))}selectBoundary(){const t=this.selector.selectBoundary();t.changed&&this.syncCompModeButtons(),this.applySelectResult(t),!t.changed&&t.message&&this.hud.toast(t.message)}doSmooth(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");this.history.push("スムース"),t.mesh=Id(t.mesh,1),t.markTopologyChanged(),this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`スムース — ${t.mesh.faceCount} 面`)}applyTopologyChange(t,e,n,s){const r=this.history.snapshot();if(!n())return;const o=t.markTopologyChanged();this.state.comp.clear(),this.history.commit(e,r),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let a=s(t);(o.droppedLevels||o.droppedLayers)&&(a+=` · 上位レベル ${o.droppedLevels} とレイヤー ${o.droppedLayers} を破棄`),o.rebased&&(a+=" · UV の土台を取り直した"),this.hud.toast(a)}requireComponents(t,e=1){const n=this.state.selected,s={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"}[t];return!n||this.state.compMode!==t||this.state.comp.size<e?(this.hud.toast(`${s}モードで${e>1?`${e} つ以上`:""}選択してから実行してください`),null):n}doExtrudeFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"押し出し",()=>{const n=uc(t.mesh,this.state.comp,this.state.toolOpts.extrudeDist);return n?(t.mesh=n.mesh,e=n.faceCount,!0):!1},()=>`面を押し出し — ${e} 面`)}doExtrudeEdgesMenu(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean);let s=0;this.applyTopologyChange(t,"エッジを押し出し",()=>{const r=fc(t.mesh,n,this.state.toolOpts.extrudeDist);return r?(t.mesh=r.mesh,s=r.faceCount,!0):!1},()=>`エッジを押し出し — ${s} 面`)}doDeleteFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"面を削除",()=>{const n=Rf(t.mesh,this.state.comp);return n?(t.mesh=Un(n.mesh),e=n.removed,!0):!1},()=>`${e} 面を削除`)}doCollapseFaces(){const t=this.requireComponents("face");t&&this.applyTopologyChange(t,"コラプス",()=>{const e=Pf(t.mesh,this.state.comp);return e?(t.mesh=Un(e),!0):!1},()=>"フェースをコラプス")}doMergeVertices(){const t=this.requireComponents("vertex",2);t&&this.applyTopologyChange(t,"頂点をマージ",()=>(t.mesh=Un(Ys(t.mesh,[[...this.state.comp]])),!0),()=>"頂点をマージ")}doMergeByDistance(){const t=this.state.selected;if(!t||this.state.compMode!=="vertex"){this.hud.toast("頂点モードで実行してください");return}const e=this.state.vertexOpts.mergeDist,n=this.state.comp.size>=2?[...this.state.comp]:void 0,s=jc(t.mesh,e,n);if(!s){this.hud.toast(`${e.toFixed(3)} 以内に重なる頂点がありません`);return}this.applyTopologyChange(t,"距離でマージ",()=>(t.mesh=Un(s.mesh),!0),()=>`${s.merged} 頂点をマージ（${e.toFixed(3)} 以内）`)}doDissolveVertices(){const t=this.requireComponents("vertex");if(!t)return;const e=Of(t.mesh,this.state.comp);if(!e){this.hud.toast("消せる頂点がありません（面が繋がっていない頂点です）");return}this.applyTopologyChange(t,"頂点を削除",()=>(t.mesh=Un(e.mesh),!0),()=>`${e.removed} 頂点を削除`)}doExtrudeVertices(){const t=this.requireComponents("vertex");if(!t)return;const e=dc(t.mesh,this.state.comp,this.state.toolOpts.extrudeDist,this.state.vertexOpts.extrudeWidth);if(!e){this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）");return}this.applyTopologyChange(t,"頂点を押し出し",()=>(t.mesh=e.mesh,!0),()=>`頂点を押し出し — ${e.faces} 面`)}doDeleteEdges(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(o=>e.edges[o]).filter(Boolean);let s=0;const r=Af(t.mesh,n);if(!r){this.hud.toast("結合できるエッジがありません（境界エッジは削除できません）");return}this.applyTopologyChange(t,"エッジを削除",()=>(t.mesh=r.mesh,s=r.merged,!0),()=>`エッジを削除 — ${s} 面を結合`)}doBridge(){const t=this.requireComponents("edge",2);if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean),s=Uf(t.mesh,n);if(!s){this.hud.toast("ブリッジできません（境界エッジの 2 列を同じ本数だけ選んでください）");return}this.applyTopologyChange(t,"ブリッジ",()=>(t.mesh=s.mesh,!0),()=>`ブリッジ — ${s.faces} 面`)}doConnectVertices(){const t=this.requireComponents("vertex",2);if(!t)return;const e=Jc(t.mesh,this.state.comp);if(!e){this.hud.toast("結べる組がありません（同じ面にあり、隣り合っていない 2 点を選んでください）");return}this.applyTopologyChange(t,"接続",()=>(t.mesh=e.mesh,!0),()=>`接続 — ${e.edges} 本のエッジ`)}doConnectEdges(){const t=this.requireComponents("edge",2);if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean),s=kf(t.mesh,n);if(!s){this.hud.toast("結べる組がありません（同じ面に来るエッジを 2 本以上選んでください）");return}this.applyTopologyChange(t,"接続",()=>(t.mesh=s.mesh,!0),()=>`接続 — ${s.edges} 本のエッジ`)}doDuplicateFaces(){const t=this.requireComponents("face");if(!t)return;const e=Hf(t.mesh,this.state.comp);if(!e)return;let n=0;this.applyTopologyChange(t,"フェースの複製",()=>(t.mesh=e.mesh,n=e.faces.length,!0),()=>`${n} 面を複製`),this.state.comp.clear();for(const s of e.faces)this.state.comp.add(s);this.viewport.rebuildOverlay(),this.refresh()}doExtractFaces(){const t=this.requireComponents("face");if(!t)return;const e=Gf(t.mesh,this.state.comp);if(!e){this.hud.toast("抽出できません（全部を選ぶと残りが無くなります）");return}const n=this.history.snapshot();t.mesh=e.mesh,t.markTopologyChanged();const s=this.state.doc.addMesh(e.extracted,`${t.name}_extract`);s.transform=ei(t.transform),this.history.commit("フェースの抽出",n),this.state.comp.clear(),this.viewport.syncAll(),this.state.select(s),this.setCompMode("object"),this.refresh(),this.hud.toast(`${e.count} 面を ${s.name} へ抽出`)}doSeparate(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");const e=Xf(t.mesh);if(!e){this.hud.toast("分けられません（繋がった 1 つの塊です）");return}const n=this.history.snapshot(),s=this.state.doc.objects.indexOf(t);this.state.doc.objects.splice(s,1);let r=null;e.forEach((o,a)=>{const c=this.state.doc.addMesh(o,`${t.name}_${a+1}`);c.transform=ei(t.transform),r||(r=c)}),this.history.commit("分離",n),this.viewport.syncAll(),this.state.select(r),this.refresh(),this.hud.toast(`${e.length} 個に分離`)}doCombine(){const t=this.state.selectedObjects();if(t.length<2){this.hud.toast("オブジェクトモードで SHF を足して 2 つ以上選んでください");return}const e=Wf(t.map(r=>({mesh:r.mesh,transform:r.transform})));if(!e)return;const n=this.history.snapshot();for(const r of t){const o=this.state.doc.objects.indexOf(r);o>=0&&this.state.doc.objects.splice(o,1)}const s=this.state.doc.addMesh(e,t[0].name);this.history.commit("結合",n),this.viewport.syncAll(),this.state.select(s),this.refresh(),this.hud.toast(`${t.length} 個を結合`)}doMirror(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");const e=this.state.mirrorAxis,n=$f(t.mesh,e,this.state.vertexOpts.mergeDist);n&&this.applyTopologyChange(t,"ミラー",()=>(t.mesh=n.mesh,!0),()=>`ミラー ${"XYZ"[e]} — ${n.welded} 頂点を溶接`)}doCenterPivot(){const t=this.state.selected;if(!t)return;this.history.push("中心にピボット");const e=t.mesh.boundsCenter();for(let n=0;n<t.mesh.vertexCount;n++){const s=t.mesh.getPosition(n);t.mesh.setPosition(n,s[0]-e[0],s[1]-e[1],s[2]-e[2])}t.transform.position=[t.transform.position[0]+e[0]*t.transform.scale[0],t.transform.position[1]+e[1]*t.transform.scale[1],t.transform.position[2]+e[2]*t.transform.scale[2]],t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("ピボットを中心へ")}doFreeze(){const t=this.state.selected;if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;this.history.push("フリーズ"),e.group.updateMatrixWorld();const n=e.group.matrixWorld;for(let s=0;s<t.mesh.vertexCount;s++){const r=t.mesh.getPosition(s),o=new I(r[0],r[1],r[2]).applyMatrix4(n);t.mesh.setPosition(s,o.x,o.y,o.z)}t.transform={position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]},t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("トランスフォームをフリーズ")}doDuplicate(){const t=this.state.selected;if(!t)return;this.history.push("複製");const e=this.state.doc.addMesh(t.mesh.clone(),`${t.name}_copy`);e.transform=ei(t.transform),this.state.select(e),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${e.name} を複製しました`)}doDelete(){const t=this.state.selected;t&&(this.history.push("削除"),this.state.doc.remove(t),this.state.select(null),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${t.name} を削除しました`))}doUndo(){const t=this.history.undo();t&&(this.afterHistory(),this.hud.toast(`元に戻す: ${t}`))}doRedo(){const t=this.history.redo();t&&(this.afterHistory(),this.hud.toast(`やり直す: ${t}`))}afterHistory(){this.viewport.syncAll(),this.selector.reset(),this.syncCompModeButtons(),this.state.mode==="uv"&&this.uv&&(this.uv.rebuild(),this.pushSelectionToUv()),this.refresh()}syncCompModeButtons(){for(const t of document.querySelectorAll("[data-comp-mode]"))t.setAttribute("aria-pressed",String(t.dataset.compMode===this.state.compMode))}syncToggleButtons(){this.renderToolColumn()}updateHistoryButtons(){bt("btnUndo").disabled=!this.history.canUndo,bt("btnRedo").disabled=!this.history.canRedo}toolColumn(){return this.state.mode==="uv"?this.uvToolColumn():this.state.mode!=="model"?[]:[{kind:"label",text:"選択"},{kind:"button",id:"select",icon:()=>Eb[this.state.compMode],title:"選択（長押しで オブジェクト / 頂点 / エッジ / フェース）",pressed:()=>this.state.tool==="select",radial:()=>this.selectGroupMenu(),options:()=>this.selectOptions(),onTap:()=>this.setTool("select")},{kind:"button",id:"xform",icon:()=>this.state.pivotEdit?H.pivot:Ou[this.state.manip],title:"変形（長押しで ユニバーサル / 移動 / 回転 / スケール / ピボット）",pressed:()=>this.state.pivotEdit,radial:()=>this.manipulatorMenu(),options:()=>this.xformOptions(),onTap:()=>this.setTool("select")},{kind:"button",id:"edit",icon:()=>ku[this.state.lastEdit],title:"編集（長押しで マルチカット / ベベル / ブリッジ / 押し出し / 接続 / ウェルド）",pressed:()=>this.state.tool==="multicut"||this.state.tool==="bevel",radial:()=>this.editGroupMenu(),options:()=>this.editOptions(),onTap:()=>this.activateEdit(this.state.lastEdit)},{kind:"button",id:"snap",icon:()=>Cb[this.state.snap.kind],title:"スナップ（タップでオン / オフ · 長押しで種類とオプション）",pressed:()=>this.state.snapOn,radial:()=>this.snapMenu(),onTap:()=>this.toggleSnap()},{kind:"separator"},{kind:"label",text:"表示"},{kind:"button",id:"display",icon:()=>Ab[this.state.display],title:"シェーディング（長押しで切り替え。4–8）",radial:()=>this.shadingMenu(),options:()=>[nb(this.optionsState(),this.panelHost())],onTap:()=>{}},{kind:"button",id:"camera",icon:H.camera,title:"カメラ（長押しでビューの切り替え · タップで設定）",pressed:()=>this.state.camOpts.ortho,radial:()=>this.cameraMenu(),radialList:()=>this.savedCameraItems(),options:()=>[Lu(this.optionsState(),this.panelHost())],onTap:()=>{}},{kind:"separator"},{kind:"label",text:"追加"},{kind:"button",id:"add",icon:()=>va[this.primitiveIconKind()]??H.prim,title:"追加（長押しでプリミティブを選ぶ · タップで入力ノード）",radial:()=>this.primitiveMenu(),options:()=>[Pu(this.optionsState(),this.panelHost())],onTap:()=>{}}]}primitiveIconKind(){const t=this.state.selected;return t?.parametric&&Sn[t.kind]?t.kind:this.state.lastPrimitive}selectGroupMenu(){return{N:{label:"オブジェクト",sub:"Object  F8",icon:H.vObj,run:()=>this.setCompMode("object")},E:{label:"頂点",sub:"Vertex  F9",icon:H.vVert,run:()=>this.setCompMode("vertex")},S:{label:"エッジ",sub:"Edge  F10",icon:H.vEdge,run:()=>this.setCompMode("edge")},W:{label:"フェース",sub:"Face  F11",icon:H.vFace,run:()=>this.setCompMode("face")},NW:this.state.modOn("ctrl")?{label:"選択を縮小",sub:"Shrink  <",icon:H.vMulti,run:()=>this.growOrShrink(!1)}:{label:"選択を拡張",sub:"Grow  >",icon:H.vMulti,run:()=>this.growOrShrink(!0)}}}editGroupMenu(){const t=(e,n)=>({label:Tb[e],sub:n,icon:ku[e],run:()=>this.activateEdit(e,!0)});return{N:t("multicut","Multi Cut"),E:t("bevel","Bevel"),S:t("bridge","Bridge"),W:t("extrude","Extrude"),NW:t("connect","Connect"),SW:t("weld","Target Weld")}}primitiveMenu(){const t={};return wf.forEach((e,n)=>{const s=Sn[e];!s||n>=Ic.length||(t[Ic[n]]={label:s.label,sub:s.en,icon:va[e]??H.prim,run:()=>this.addPrimitive(e)})}),t}activateEdit(t,e=!1){if(this.state.lastEdit=t,t==="multicut"||t==="bevel"){this.setTool(t);return}if(this.setTool("select"),!e){this.renderToolColumn();return}t==="bridge"?this.doBridge():t==="extrude"?this.doExtrudeForMode():t==="connect"?this.doConnectForMode():this.hud.toast("頂点を掴んで、別の頂点の近くで離すと溶接します"),this.renderToolColumn()}doExtrudeForMode(){this.state.compMode==="face"?this.doExtrudeFaces():this.state.compMode==="edge"?this.doExtrudeEdgesMenu():this.state.compMode==="vertex"?this.doExtrudeVertices():this.hud.toast("面・エッジ・頂点を選んでください")}doConnectForMode(){this.state.compMode==="edge"?this.doConnectEdges():this.state.compMode==="vertex"?this.doConnectVertices():this.hud.toast("エッジか頂点を選んでください")}selectOptions(){const t=this.optionsState(),e=this.panelHost(),n=[Ru(t,e)];return this.state.compMode!=="object"&&n.push(eb(t,e)),this.state.compMode==="vertex"&&n.push(ma(t,e)),this.state.compMode==="object"&&n.push(tb(t,e)),n}xformOptions(){const t=this.optionsState(),e=this.panelHost(),n=[qy(t,e)];this.state.compMode==="vertex"&&n.push(ma(t,e));const s=$y(t,e);return s&&n.push(s),n}editOptions(){const t=this.optionsState(),e=this.panelHost();switch(this.state.lastEdit){case"multicut":return[Yy(t,e)];case"bevel":return[Ky(t,e)];case"bridge":return[jy()];case"connect":return[Jy()];case"extrude":return[Zy(t,e)];default:return[ma(t,e)]}}buildToolDock(){bt("dockLeft").textContent="";const{panel:t,body:e}=Au("tools","ツール");this.toolPanelBody=e,this.renderToolColumn(),this.docking.attach(t),this.docking.place(t,this.zones.tools??"left")}renderToolColumn(){const t=this.toolPanelBody;if(!t)return;t.textContent="";const e=nt("div","toolcol");for(const n of this.toolColumn()){if(n.kind==="label"){e.appendChild(nt("div","minilbl",n.text));continue}if(n.kind==="separator"){e.appendChild(nt("div","tool-sep"));continue}const s=nt("button","ibtn");s.dataset.group=n.id,s.innerHTML=Lc(typeof n.icon=="function"?n.icon():n.icon),s.title=n.title,n.tool&&(s.dataset.tool=n.tool,s.setAttribute("aria-pressed",String(this.state.tool===n.tool))),n.compMode&&(s.dataset.compMode=n.compMode,s.setAttribute("aria-pressed",String(this.state.compMode===n.compMode))),n.pressed&&(s.dataset.toggle="1",s.setAttribute("aria-pressed",String(n.pressed())));const r=()=>{const o=n.options&&this.popup?.dataset.gauge===n.id;if(n.onTap(s),!n.options)return;if(o){this.closePopup();return}const a=this.toolPanelBody?.querySelector(`[data-group="${n.id}"]`)??s;this.openToolOptions(a,n.id,n.options)};n.radial?(s.dataset.radial="1",Du(s,n.radial,r,n.radialList)):s.addEventListener("click",r),e.appendChild(s)}t.appendChild(e)}openToolOptions(t,e,n){this.closePopup();const s=n();if(!s.length)return;const r=t.getBoundingClientRect(),o=nt("div","cutin wide");o.dataset.gauge=e,o.style.left=`${r.right+8}px`,o.style.top=`${Math.max(8,Math.min(window.innerHeight-120,r.top))}px`,o.style.maxHeight=`${window.innerHeight-Math.max(8,r.top)-16}px`;for(const a of s)o.appendChild(a);document.body.appendChild(o),this.popup=o,this.popupAnchor=t}openGroupOptions(t,e){const n=this.toolPanelBody?.querySelector(`[data-group="${t}"]`);n&&this.openToolOptions(n,t,e)}optionsState(){const t=this.primitiveIconKind();return{tool:this.state.tool,selected:this.state.selected,soft:this.state.soft,cut:this.state.cut,bevel:this.state.bevel,bevelActive:this.bevel.active,extrudeDist:this.state.toolOpts.extrudeDist,vertex:this.state.vertexOpts,snap:{...this.state.snap,active:this.state.snapping},mirrorAxis:this.state.mirrorAxis,rotationEuler:this.state.selected?this.eulerOf(this.state.selected.transform.rotation):[0,0,0],smoothAngle:this.state.smoothAngle,compMode:this.state.compMode,manipSize:this.state.manipSize,manip:this.state.manip,pivotEdit:this.state.pivotEdit,rotateStep:this.state.rotateStep,preventNegativeScale:this.state.preventNegativeScale,cameraBased:this.state.cameraBased,cam:this.state.camOpts,nextPrimitive:t,nextPrimitiveParams:this.state.primitiveDefaults[t]??oo(t),uv:this.state.mode==="uv"&&this.state.selected?.uv?{method:this.state.selected.uv.method,snapKind:this.state.uvSnap.kind,snapStep:this.state.uvSnap.step,auto:{...this.state.selected.uv.autoSeamParams},packing:{...this.state.selected.uv.packing}}:null}}buildPanels(){const t=Au("layers","レイヤー");this.layersPanel=t.panel,this.outlinerBody=t.body,this.docking.attach(t.panel),this.placeLayers(),this.renderPanels(),this.bindLayerSwipe(),this.viewport.resize()}placeLayers(){const t=this.layersPanel;if(!t)return;this.layout?.isWide??!0?(this.drawer?.remove(),this.drawer=null,this.docking.place(t,this.zones.outliner??"rightTop")):(this.drawer||(this.drawer=nt("div","drawer"),bt("vp").appendChild(this.drawer)),this.drawer.appendChild(t),t.classList.remove("floating")),this.syncLayersButton()}toggleLayers(){if(this.layout?.isWide??!0){this.state.panelsHidden=!this.state.panelsHidden,bt("dockColRight").hidden=this.state.panelsHidden,this.syncLayersButton(),this.viewport.resize();return}this.drawer?.classList.toggle("open"),this.drawer?.classList.contains("open")&&this.renderPanels(),this.syncLayersButton()}syncLayersButton(){const t=this.layout?.isWide??!0?!this.state.panelsHidden:!!this.drawer?.classList.contains("open");bt("btnPanels").setAttribute("aria-pressed",String(t))}bindLayerSwipe(){const t=bt("vp");let e=null;t.addEventListener("pointerdown",n=>{const s=t.getBoundingClientRect();e=n.pointerType==="touch"&&n.clientX>s.right-24?{x:n.clientX,y:n.clientY,id:n.pointerId}:null}),t.addEventListener("pointermove",n=>{!e||n.pointerId!==e.id||e.x-n.clientX>40&&Math.abs(n.clientY-e.y)<60&&(e=null,!(this.layout?.isWide??!0)&&!this.drawer?.classList.contains("open")&&this.toggleLayers())});for(const n of["pointerup","pointercancel"])t.addEventListener(n,()=>e=null);t.addEventListener("pointerdown",n=>{this.drawer?.classList.contains("open")&&(this.drawer.contains(n.target)||(this.drawer.classList.remove("open"),this.syncLayersButton()))})}panelHost(){return{onParamInput:(t,e,n)=>{this.paramSnapshot??=this.history.snapshot(),t.params[e]=n,t.rebuild(),t.uv&&(t.uv=gd(t.uv,t.mesh),ti(t.mesh,t.uv),this.uv?.rebuild()),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats(),this.refreshManipulator()},onParamCommit:(t,e)=>{this.paramSnapshot&&(this.history.commit(e,this.paramSnapshot),this.paramSnapshot=null)},onSoftChange:(t,e)=>{this.state.soft[t]=e,this.viewport.rebuildOverlay(),this.refresh()},onExtrudeDistChange:t=>{this.state.toolOpts.extrudeDist=t},onVertexOptChange:(t,e)=>{this.state.vertexOpts[t]=e},onMirrorAxisChange:t=>{this.state.mirrorAxis=t,this.refresh()},onTransformInput:(t,e,n,s)=>{this.history.push("数値入力");const r=ei(t.transform);if(e==="rotation"){const a=this.eulerOf(r.rotation);a[n]=s;const c=a.map(h=>h*Math.PI/180),l=new cn().setFromEuler(new Wn(c[0],c[1],c[2],"XYZ"));r.rotation=[l.x,l.y,l.z,l.w]}else{const a=[...r[e]];a[n]=s,r[e]=a}t.transform=r;const o=this.viewport.viewOf(t);o&&(sn(o.group,t.transform),o.group.updateMatrixWorld()),this.viewport.rebuildOverlay(),this.refresh()},onSnapChange:(t,e)=>{t==="kind"?this.setSnapKind(e):(this.state.snap.step=e,this.refresh())},onBevelChange:(t,e)=>{t==="segments"?this.state.bevel.segments=e:this.state.bevel.width=e,this.redoBevel()},onCutChange:(t,e)=>{t==="edgeFlow"?this.state.cut.edgeFlow=e:this.state.cut.snapStep=e},onSmoothAngleChange:t=>{this.state.smoothAngle=t;for(const e of this.state.doc.objects)this.viewport.rebuildObject(e)},onManipSizeChange:t=>this.setManipSize(t),onUvMethodChange:t=>{this.uv?.setMethod(t),this.refresh()},onUvAutoChange:(t,e)=>{const n=this.state.selected?.uv;n&&(t==="angle"?n.autoSeamParams.angle=e:n.autoSeamParams[t]=e)},onUvAutoRun:()=>this.uv?.autoUnwrap(),onUvPackingChange:(t,e)=>{const n=this.state.selected?.uv;n&&(t==="allowRotate"?n.packing.allowRotate=e:n.packing[t]=e,this.uv?.repack(),this.refresh())},onUvSnapChange:(t,e)=>{t==="kind"?this.state.uvSnap.kind=e:this.state.uvSnap.step=e,this.state.snapOn=!0,this.syncToggleButtons(),this.refresh()},onCameraBasedChange:t=>{this.state.cameraBased=t,this.remember("cameraBased",t),this.hud.toast(t?"カメラベース選択: オン":"カメラベース選択: オフ")},onRotateStepChange:t=>{this.state.rotateStep=t,this.remember("rotateStep",t),this.reopenToolOptions("xform")},onPreventNegativeScaleChange:t=>{this.state.preventNegativeScale=t,this.remember("preventNegativeScale",t)},onPivotEditToggle:()=>{this.togglePivotEdit(),this.reopenToolOptions("xform")},onCamOptChange:(t,e)=>{this.state.camOpts[t]=e,this.viewport.applyCamera(),this.refreshManipulator()},onCamOrthoChange:t=>{this.state.camOpts.ortho=t,this.viewport.applyCamera(),this.refresh()},onCamReset:()=>{this.state.camOpts={focal:35,near:.05,far:500,ortho:!1},this.setView("persp"),this.refreshManipulator(),this.reopenToolOptions("camera"),this.hud.toast("カメラを初期設定に戻した")},onDefaultParamChange:(t,e,n)=>{const s=this.state.primitiveDefaults[t]??=oo(t);s[e]=n},onSelect:t=>{this.state.select(t),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh()},onRename:(t,e)=>{this.history.push("名前変更"),t.name=e,this.refresh()},onVisible:(t,e)=>{this.history.push(e?"表示":"非表示"),t.visible=e,this.viewport.syncAll(),this.refresh()},onLock:(t,e)=>{this.history.push(e?"ロック":"ロック解除"),t.locked=e,e&&this.state.selected===t&&this.state.select(null),this.viewport.applyDisplayAll(),this.refresh()},onReorder:(t,e)=>{const n=this.state.doc.objects.length,s=n-1-t,r=n-1-e;if(s===r||s<0||r<0||s>=n||r>=n)return;const[o]=this.state.doc.objects.splice(s,1);this.state.doc.objects.splice(r,0,o),this.renderPanels()},onLayersChanged:()=>this.renderPanels(),thumbnail:t=>this.thumbnailOf(t),onOutlinerMenu:(t,e,n)=>{Jn({N:{label:"名前変更",sub:"Rename",icon:H.rename,run:()=>this.hud.toast("行をダブルタップでも変更できます")},E:{label:"複製",sub:"Duplicate",icon:H.dup,run:()=>{this.state.select(t),this.doDuplicate()}},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>{this.state.select(t),this.doDelete()}},W:{label:"フレーム",sub:"Frame",icon:H.frame,run:()=>{this.state.select(t),this.refresh(),this.viewport.frameSelected()}}},e,n)}}}renderPanels(){this.outlinerBody&&rb(this.outlinerBody,this.state.doc.objects,this.state.selected,this.panelHost(),this.openedLayers)}reopenToolOptions(t){if(this.popup?.dataset.gauge!==t)return;const e=this.popupAnchor,n=this.toolColumn().find(r=>r.kind==="button"&&r.id===t);if(!e||!n||n.kind!=="button"||!n.options)return;this.renderToolColumn();const s=this.toolPanelBody?.querySelector(`[data-group="${t}"]`)??e;this.openToolOptions(s,t,n.options)}thumbnailOf(t){const e=`${t.mesh.vertexCount}_${t.mesh.faceCount}_${t.kind}_${t.transform.scale.join(",")}`,n=this.thumbs.get(t.id);if(n&&n.stamp===e)return n.url;const s=this.viewport.thumbnail(t);return s&&this.thumbs.set(t.id,{url:s,stamp:e}),s}restoreSettings(){const t=s=>{try{return localStorage.getItem(`macbeth.${s}`)}catch{return null}};this.state.cameraBased=t("cameraBased")==="true",this.state.preventNegativeScale=t("preventNegativeScale")!=="false";const e=Number(t("rotateStep"));Number.isFinite(e)&&e>=0&&(this.state.rotateStep=e);const n=t("lastPrimitive");n&&Sn[n]&&(this.state.lastPrimitive=n)}remember(t,e){try{localStorage.setItem(`macbeth.${t}`,String(e))}catch{}}addPrimitive(t){this.history.push(`${Sn[t].label} を追加`);const e=this.state.doc.addObject(t),n=this.state.primitiveDefaults[t];n&&(e.params={...n},e.rebuild()),this.state.lastPrimitive=t,this.remember("lastPrimitive",t),this.state.select(e),this.viewport.syncAll(),this.renderToolColumn(),this.refresh(),this.hud.toast(`${e.name} を追加しました`)}setCompMode(t){this.state.tool!=="select"&&this.setTool("select"),this.state.compMode!==t&&(this.state.compMode=t,this.state.comp.clear(),this.selector.reset(),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),this.syncCompModeButtons(),this.pushSelectionToUv(),this.hud.toast(Nu.find(e=>e.id===t)?.label??t))}buildGauges(){const t=()=>this.viewport.rebuildOverlay();this.gauges=[new Cu(this.state,"gauge1","g1","g1lbl","g1val",t,()=>this.refresh()),new Cu(this.state,"gauge2","g2","g2lbl","g2val",t,()=>this.refresh())]}buildCluster(){const t=n=>{this.state.mods[n]=this.state.mods[n]==="off"?"on":"off",this.syncModButtons(),this.hud.refreshStats()};bt("modShift").addEventListener("click",()=>t("shift")),bt("modCtrl").addEventListener("click",()=>t("ctrl")),bt("modAlt").addEventListener("click",()=>t("alt"));const e=bt("btnFrame");e.addEventListener("touchstart",n=>n.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",n=>{e.setPointerCapture(n.pointerId),this.fHeld=!0});for(const n of["pointerup","pointercancel"])e.addEventListener(n,()=>{this.fHeld&&(this.fHeld=!1,this.fChord||this.viewport.frameSelected(),this.fChord=!1)})}get fHeld(){return this.router.fHeld}set fHeld(t){this.router.fHeld=t}get fChord(){return this.router.fChord}set fChord(t){this.router.fChord=t}syncModButtons(){for(const[t,e]of[["shift","modShift"],["ctrl","modCtrl"],["alt","modAlt"]])bt(e).dataset.state=this.state.mods[t]}bindKeyboard(){window.addEventListener("keydown",t=>{const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;const n=Nu.find(a=>a.key===t.key);if(n){t.preventDefault(),this.setCompMode(n.id);return}const s=wb[t.key];if(s){this.setDisplay(s);return}if(t.key==="f"||t.key==="F"){this.viewport.frameSelected();return}const r={q:"all",t:"all",w:"move",e:"rotate",r:"scale"}[t.key.toLowerCase()];if(r&&!t.ctrlKey&&!t.metaKey){this.setManip(r);return}if(t.key===">"||t.key==="."){this.growOrShrink(!0);return}if(t.key==="<"||t.key===","){this.growOrShrink(!1);return}const o={x:"grid",v:"vertex",c:"edge"}[t.key.toLowerCase()];if(o&&!t.ctrlKey&&!t.metaKey){this.state.snap.kind=o,this.state.snapKeyHeld||(this.state.snapKeyHeld=!0,this.hud.toast(`スナップ: ${Fs[this.state.snap.kind]}（押している間）`),this.refresh());return}if((t.key==="d"||t.key==="D"||t.key==="Insert")&&!t.ctrlKey&&!t.metaKey){t.preventDefault(),this.togglePivotEdit();return}if(t.key==="+"||t.key==="="){this.setManipSize(this.state.manipSize*Fu);return}if(t.key==="-"||t.key==="_"){this.setManipSize(this.state.manipSize/Fu);return}if(t.key==="s"||t.key==="S"){this.state.symX=!this.state.symX,this.refresh(),this.hud.toast(`対称編集 X: ${this.state.symX?"オン":"オフ"}`);return}if((t.ctrlKey||t.metaKey)&&(t.key==="z"||t.key==="Z")){t.preventDefault(),t.shiftKey?this.doRedo():this.doUndo();return}(t.ctrlKey||t.metaKey)&&(t.key==="y"||t.key==="Y")&&(t.preventDefault(),this.doRedo())}),window.addEventListener("keyup",t=>{this.state.snapKeyHeld&&["x","v","c"].includes(t.key.toLowerCase())&&(this.state.snapKeyHeld=!1,this.preselect.clear(),this.refresh(),this.hud.defaultHint())})}bindTopBar(){bt("btnUndo").addEventListener("click",()=>this.doUndo()),bt("btnRedo").addEventListener("click",()=>this.doRedo()),bt("btnPanels").addEventListener("click",()=>this.toggleLayers()),Du(bt("modeBtn"),()=>this.modeMenu(),()=>this.hud.toast("長押しでモードを選べます")),bt("fileBtn").addEventListener("click",t=>this.openFileMenu(t.currentTarget)),document.addEventListener("pointerdown",t=>{if(!this.popup)return;const e=t.target;this.popup.contains(e)||this.popupAnchor?.contains(e)||this.closePopup()})}closePopup(){this.popup?.remove(),this.popup=null,this.popupAnchor=null,yl()}openFileMenu(t){this.closePopup();const e=t.getBoundingClientRect(),n=nt("div","panel floating");n.style.left=`${e.left}px`,n.style.top=`${e.bottom+2}px`;const s=nt("div","pbody"),r=(o,a)=>{const c=nt("button","act",o);c.addEventListener("click",()=>{this.closePopup(),a()}),s.appendChild(c)};r("新規シーン",()=>this.newScene()),r("プロジェクトを開く (.mbz)",()=>this.openProject()),r("プロジェクトを保存 (.mbz)",()=>this.saveProject()),r("OBJ を読み込む",()=>this.importObj()),r("OBJ を書き出す",()=>this.exportObj()),r("glTF を書き出す (.glb)",()=>this.exportGlb()),r("画面を画像で保存 (.png)",()=>this.exportPng()),r("更新を確認して開き直す",()=>this.checkForUpdate()),s.appendChild(nt("div","hint","ビルド 2026-09-08 16:51 · cfe394e")),n.appendChild(s),document.body.appendChild(n),this.popup=n}async checkForUpdate(){this.hud.toast("更新を確認しています…");try{await(await navigator.serviceWorker?.getRegistration())?.update()}catch{}location.reload()}async newScene(){this.history.push("新規シーン"),this.state.doc.objects.length=0,this.state.select(null),this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]),this.viewport.syncAll(),this.refresh(),await this.autosave.saveNow()}async saveProject(){const{packMbz:t}=await Il(async()=>{const{packMbz:r}=await Promise.resolve().then(()=>Pc);return{packMbz:r}},void 0),e=t(this.state.doc,{appVersion:"0.1.0"}),n=`${this.state.doc.objects[0]?.name??"scene"}.mbz`,s=await Hr(e,n);this.hud.toast(s.saved?`${n} を保存しました`:"保存を取り消しました")}async openProject(){const t=await _u(".mbz");if(t)try{const{unpackMbz:e}=await Il(async()=>{const{unpackMbz:s}=await Promise.resolve().then(()=>Pc);return{unpackMbz:s}},void 0),{document:n}=e(t.bytes);this.state.doc=n,this.state.select(n.objects[0]??null),this.history.clear(),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を開きました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async importObj(){const t=await _u(".obj,text/plain");if(t)try{const e=Nd(t.text);if(!e.length)return void this.hud.toast("面が見つかりませんでした");this.history.push("OBJ 読み込み");let n=null;for(const s of e)n=this.state.doc.addMesh(s.mesh,s.name);this.state.select(n),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を読み込みました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async exportObj(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;if(!t.length)return void this.hud.toast("書き出すものがありません");const e=Fd(t.map(r=>({mesh:r.mesh,name:r.name}))),n=`${t[0].name}.obj`,s=await Hr(e,n);this.hud.toast(s.saved?`${n} を書き出しました`:"書き出しを取り消しました")}async exportGlb(){const t=kd(this.state.doc.objects);if(!t.length)return void this.hud.toast("書き出すものがありません");const e=Od(t,{smoothAngle:this.state.smoothAngle,generator:"macbeth"}),n=`${this.state.doc.objects[0]?.name??"scene"}.glb`,s=await Hr(e,n);this.hud.toast(s.saved?`${n} を書き出しました — ${t.length} オブジェクト`:"書き出しを取り消しました")}async exportPng(){this.viewport.renderer.render(this.viewport.scene,this.viewport.camera);const t=bt("gl"),e=await new Promise(o=>t.toBlob(a=>o(a),"image/png"));if(!e)return void this.hud.toast("画像を作れませんでした");const n=new Uint8Array(await e.arrayBuffer()),s=`${this.state.doc.objects[0]?.name??"macbeth"}.png`,r=await Hr(n,s);this.hud.toast(r.saved?`${s} を保存しました`:"保存を取り消しました")}refresh(){this.preselect.clear(),this.viewport.applyDisplayAll(),this.refreshManipulator(),this.hud.refreshStats();for(const t of this.gauges)t.paint();this.updateHistoryButtons(),this.paramSnapshot||this.renderPanels()}}document.addEventListener("contextmenu",i=>i.preventDefault());document.addEventListener("selectstart",i=>{const t=i.target;t&&t.tagName!=="INPUT"&&t.tagName!=="TEXTAREA"&&i.preventDefault()});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/macbethUnity/app/sw.js",{scope:"/macbethUnity/app/",updateViaCache:"none"}).then(i=>i.update()).catch(()=>{})});const ap=new Rb;ap.boot();Object.assign(window,{macbeth:ap,macbethCore:Pc});
//# sourceMappingURL=index-CpFeiVh1.js.map
