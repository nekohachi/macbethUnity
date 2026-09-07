(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Uh="modulepreload",Nh=function(i){return"/macbethUnity/app/"+i},Ho={},Go=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let a=function(c){return Promise.all(c.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");r=a(t.map(c=>{if(c=Nh(c),c in Ho)return;Ho[c]=!0;const h=c.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const u=document.createElement("link");if(u.rel=h?"stylesheet":Uh,h||(u.as="script"),u.crossOrigin="",u.href=c,l&&u.setAttribute("nonce",l),document.head.appendChild(u),h)return new Promise((d,g)=>{u.addEventListener("load",d),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const po="185",Fh=0,Wo=1,Oh=2,Zr=1,Bh=2,er=3,Zn=0,Ot=1,nn=2,Dn=0,Ui=1,Xo=2,qo=3,Yo=4,zh=5,li=100,kh=101,Vh=102,Hh=103,Gh=104,Wh=200,Xh=201,qh=202,Yh=203,ua=204,fa=205,$h=206,Kh=207,Zh=208,Jh=209,Qh=210,jh=211,eu=212,tu=213,nu=214,da=0,pa=1,ma=2,Oi=3,ga=4,_a=5,va=6,xa=7,mo=0,iu=1,ru=2,gn=0,Tc=1,Ac=2,wc=3,Cc=4,Rc=5,Pc=6,Lc=7,Dc=300,fi=301,Bi=302,Ss=303,ys=304,us=306,Ma=1e3,Pn=1001,Sa=1002,At=1003,su=1004,vr=1005,Lt=1006,bs=1007,hi=1008,Gt=1009,Ic=1010,Uc=1011,ar=1012,go=1013,Mn=1014,pn=1015,Un=1016,_o=1017,vo=1018,or=1020,Nc=35902,Fc=35899,Oc=1021,Bc=1022,sn=1023,Nn=1026,ui=1027,zc=1028,xo=1029,di=1030,Mo=1031,So=1033,Jr=33776,Qr=33777,jr=33778,es=33779,ya=35840,ba=35841,Ea=35842,Ta=35843,Aa=36196,wa=37492,Ca=37496,Ra=37488,Pa=37489,ns=37490,La=37491,Da=37808,Ia=37809,Ua=37810,Na=37811,Fa=37812,Oa=37813,Ba=37814,za=37815,ka=37816,Va=37817,Ha=37818,Ga=37819,Wa=37820,Xa=37821,qa=36492,Ya=36494,$a=36495,Ka=36283,Za=36284,is=36285,Ja=36286,au=3200,Qa=0,ou=1,$n="",Yt="srgb",rs="srgb-linear",ss="linear",Ze="srgb",vi=7680,$o=519,lu=512,cu=513,hu=514,yo=515,uu=516,fu=517,bo=518,du=519,Ko=35044,Zo="300 es",mn=2e3,lr=2001;function pu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function as(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function mu(){const i=as("canvas");return i.style.display="block",i}const Jo={};function Qo(...i){const e="THREE."+i.shift();console.log(e,...i)}function kc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Pe(...i){i=kc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function We(...i){i=kc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ni(...i){const e=i.join(" ");e in Jo||(Jo[e]=!0,Pe(...i))}function gu(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const _u={[da]:pa,[ma]:va,[ga]:xa,[Oi]:_a,[pa]:da,[va]:ma,[xa]:ga,[_a]:Oi};class pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Es=Math.PI/180,ja=180/Math.PI;function ur(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ct[i&255]+Ct[i>>8&255]+Ct[i>>16&255]+Ct[i>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]).toLowerCase()}function He(i,e,t){return Math.max(e,Math.min(t,i))}function vu(i,e){return(i%e+e)%e}function Ts(i,e,t){return(1-t)*i+t*e}function Wi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ft(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ge{static{Ge.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Hi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],f=n[r+3],u=s[a+0],d=s[a+1],g=s[a+2],x=s[a+3];if(f!==x||l!==u||c!==d||h!==g){let m=l*u+c*d+h*g+f*x;m<0&&(u=-u,d=-d,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){const E=Math.acos(m),w=Math.sin(E);p=Math.sin(p*E)/w,o=Math.sin(o*E)/w,l=l*p+u*o,c=c*p+d*o,h=h*p+g*o,f=f*p+x*o}else{l=l*p+u*o,c=c*p+d*o,h=h*p+g*o,f=f*p+x*o;const E=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=E,c*=E,h*=E,f*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],f=s[a],u=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+h*f+l*d-c*u,e[t+1]=l*g+h*u+c*f-o*d,e[t+2]=c*g+h*d+o*u-l*f,e[t+3]=h*g-o*f-l*u-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),f=o(s/2),u=l(n/2),d=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{static{F.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*h,this.y=n+l*h+o*c-s*f,this.z=r+l*f+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return As.copy(this).projectOnVector(e),this.sub(As)}reflect(e){return this.sub(As.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const As=new F,jo=new Hi;class Ie{static{Ie.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],d=n[5],g=n[8],x=r[0],m=r[3],p=r[6],E=r[1],w=r[4],M=r[7],T=r[2],y=r[5],C=r[8];return s[0]=a*x+o*E+l*T,s[3]=a*m+o*w+l*y,s[6]=a*p+o*M+l*C,s[1]=c*x+h*E+f*T,s[4]=c*m+h*w+f*y,s[7]=c*p+h*M+f*C,s[2]=u*x+d*E+g*T,s[5]=u*m+d*w+g*y,s[8]=u*p+d*M+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,u=o*l-h*s,d=c*s-a*l,g=t*f+n*u+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=f*x,e[1]=(r*c-h*n)*x,e[2]=(o*n-r*a)*x,e[3]=u*x,e[4]=(h*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=d*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ni("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ws.makeScale(e,t)),this}rotate(e){return Ni("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ws.makeRotation(-e)),this}translate(e,t){return Ni("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ws.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ws=new Ie,el=new Ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tl=new Ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xu(){const i={enabled:!0,workingColorSpace:rs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ze&&(r.r=In(r.r),r.g=In(r.g),r.b=In(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(r.r=Fi(r.r),r.g=Fi(r.g),r.b=Fi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===$n?ss:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ni("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ni("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[rs]:{primaries:e,whitePoint:n,transfer:ss,toXYZ:el,fromXYZ:tl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:n,transfer:Ze,toXYZ:el,fromXYZ:tl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),i}const Ve=xu();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let xi;class Mu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xi===void 0&&(xi=as("canvas")),xi.width=e.width,xi.height=e.height;const r=xi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=xi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=as("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=In(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(In(t[n]/255)*255):t[n]=In(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Su=0;class Eo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=ur(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Cs(r[a].image)):s.push(Cs(r[a]))}else s=Cs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Cs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Mu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let yu=0;const Rs=new F;class Ut extends pi{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=Pn,r=Pn,s=Lt,a=hi,o=sn,l=Gt,c=Ut.DEFAULT_ANISOTROPY,h=$n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=ur(),this.name="",this.source=new Eo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Rs).x}get height(){return this.source.getSize(Rs).y}get depth(){return this.source.getSize(Rs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ma:e.x=e.x-Math.floor(e.x);break;case Pn:e.x=e.x<0?0:1;break;case Sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ma:e.y=e.y-Math.floor(e.y);break;case Pn:e.y=e.y<0?0:1;break;case Sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Dc;Ut.DEFAULT_ANISOTROPY=1;class ot{static{ot.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,M=(d+1)/2,T=(p+1)/2,y=(h+u)/4,C=(f+x)/4,v=(g+m)/4;return w>M&&w>T?w<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(w),r=y/n,s=C/n):M>T?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=y/r,s=v/r):T<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),n=C/s,r=v/s),this.set(n,r,s,t),this}let E=Math.sqrt((m-g)*(m-g)+(f-x)*(f-x)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(f-x)/E,this.z=(u-h)/E,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bu extends pi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Lt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Ut(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Lt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Eo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _n extends bu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Vc extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=At,this.minFilter=At,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Eu extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=At,this.minFilter=At,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rt{static{rt.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,l,c,h,f,u,d,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,f,u,d,g,x,m)}set(e,t,n,r,s,a,o,l,c,h,f,u,d,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Mi.setFromMatrixColumn(e,0).length(),s=1/Mi.setFromMatrixColumn(e,1).length(),a=1/Mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*h,d=a*f,g=o*h,x=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=u-x*c,t[9]=-o*l,t[2]=x-u*c,t[6]=g+d*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,d=l*f,g=c*h,x=c*f;t[0]=u+x*o,t[4]=g*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-g,t[6]=x+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,d=l*f,g=c*h,x=c*f;t[0]=u-x*o,t[4]=-a*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,d=a*f,g=o*h,x=o*f;t[0]=l*h,t[4]=g*c-d,t[8]=u*c+x,t[1]=l*f,t[5]=x*c+u,t[9]=d*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,d=a*c,g=o*l,x=o*c;t[0]=l*h,t[4]=x-u*f,t[8]=g*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*f+g,t[10]=u-x*f}else if(e.order==="XZY"){const u=a*l,d=a*c,g=o*l,x=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=u*f+x,t[5]=a*h,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*h,t[10]=x*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tu,e,Au)}lookAt(e,t,n){const r=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),zn.crossVectors(n,zt),zn.lengthSq()===0&&(Math.abs(n.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),zn.crossVectors(n,zt)),zn.normalize(),xr.crossVectors(zt,zn),r[0]=zn.x,r[4]=xr.x,r[8]=zt.x,r[1]=zn.y,r[5]=xr.y,r[9]=zt.y,r[2]=zn.z,r[6]=xr.z,r[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],d=n[13],g=n[2],x=n[6],m=n[10],p=n[14],E=n[3],w=n[7],M=n[11],T=n[15],y=r[0],C=r[4],v=r[8],b=r[12],P=r[1],R=r[5],U=r[9],W=r[13],X=r[2],O=r[6],G=r[10],B=r[14],K=r[3],Q=r[7],re=r[11],ie=r[15];return s[0]=a*y+o*P+l*X+c*K,s[4]=a*C+o*R+l*O+c*Q,s[8]=a*v+o*U+l*G+c*re,s[12]=a*b+o*W+l*B+c*ie,s[1]=h*y+f*P+u*X+d*K,s[5]=h*C+f*R+u*O+d*Q,s[9]=h*v+f*U+u*G+d*re,s[13]=h*b+f*W+u*B+d*ie,s[2]=g*y+x*P+m*X+p*K,s[6]=g*C+x*R+m*O+p*Q,s[10]=g*v+x*U+m*G+p*re,s[14]=g*b+x*W+m*B+p*ie,s[3]=E*y+w*P+M*X+T*K,s[7]=E*C+w*R+M*O+T*Q,s[11]=E*v+w*U+M*G+T*re,s[15]=E*b+w*W+M*B+T*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],u=e[10],d=e[14],g=e[3],x=e[7],m=e[11],p=e[15],E=l*d-c*u,w=o*d-c*f,M=o*u-l*f,T=a*d-c*h,y=a*u-l*h,C=a*f-o*h;return t*(x*E-m*w+p*M)-n*(g*E-m*T+p*y)+r*(g*w-x*T+p*C)-s*(g*M-x*y+m*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(s*h-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],u=e[10],d=e[11],g=e[12],x=e[13],m=e[14],p=e[15],E=t*o-n*a,w=t*l-r*a,M=t*c-s*a,T=n*l-r*o,y=n*c-s*o,C=r*c-s*l,v=h*x-f*g,b=h*m-u*g,P=h*p-d*g,R=f*m-u*x,U=f*p-d*x,W=u*p-d*m,X=E*W-w*U+M*R+T*P-y*b+C*v;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/X;return e[0]=(o*W-l*U+c*R)*O,e[1]=(r*U-n*W-s*R)*O,e[2]=(x*C-m*y+p*T)*O,e[3]=(u*y-f*C-d*T)*O,e[4]=(l*P-a*W-c*b)*O,e[5]=(t*W-r*P+s*b)*O,e[6]=(m*M-g*C-p*w)*O,e[7]=(h*C-u*M+d*w)*O,e[8]=(a*U-o*P+c*v)*O,e[9]=(n*P-t*U-s*v)*O,e[10]=(g*y-x*M+p*E)*O,e[11]=(f*M-h*y-d*E)*O,e[12]=(o*b-a*R-l*v)*O,e[13]=(t*R-n*b+r*v)*O,e[14]=(x*w-g*T-m*E)*O,e[15]=(h*T-f*w+u*E)*O,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,f=o+o,u=s*c,d=s*h,g=s*f,x=a*h,m=a*f,p=o*f,E=l*c,w=l*h,M=l*f,T=n.x,y=n.y,C=n.z;return r[0]=(1-(x+p))*T,r[1]=(d+M)*T,r[2]=(g-w)*T,r[3]=0,r[4]=(d-M)*y,r[5]=(1-(u+p))*y,r[6]=(m+E)*y,r[7]=0,r[8]=(g+w)*C,r[9]=(m-E)*C,r[10]=(1-(u+x))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Mi.set(r[0],r[1],r[2]).length();const o=Mi.set(r[4],r[5],r[6]).length(),l=Mi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Zt.copy(this);const c=1/a,h=1/o,f=1/l;return Zt.elements[0]*=c,Zt.elements[1]*=c,Zt.elements[2]*=c,Zt.elements[4]*=h,Zt.elements[5]*=h,Zt.elements[6]*=h,Zt.elements[8]*=f,Zt.elements[9]*=f,Zt.elements[10]*=f,t.setFromRotationMatrix(Zt),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=mn,l=!1){const c=this.elements,h=2*s/(t-e),f=2*s/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r);let g,x;if(l)g=s/(a-s),x=a*s/(a-s);else if(o===mn)g=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===lr)g=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=mn,l=!1){const c=this.elements,h=2/(t-e),f=2/(n-r),u=-(t+e)/(t-e),d=-(n+r)/(n-r);let g,x;if(l)g=1/(a-s),x=a/(a-s);else if(o===mn)g=-2/(a-s),x=-(a+s)/(a-s);else if(o===lr)g=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Mi=new F,Zt=new rt,Tu=new F(0,0,0),Au=new F(1,1,1),zn=new F,xr=new F,zt=new F,nl=new rt,il=new Hi;class Jn{constructor(e=0,t=0,n=0,r=Jn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],f=r[2],u=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(He(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-He(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return il.setFromEuler(this),this.setFromQuaternion(il,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jn.DEFAULT_ORDER="XYZ";class To{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wu=0;const rl=new F,Si=new Hi,yn=new rt,Mr=new F,Xi=new F,Cu=new F,Ru=new Hi,sl=new F(1,0,0),al=new F(0,1,0),ol=new F(0,0,1),ll={type:"added"},Pu={type:"removed"},yi={type:"childadded",child:null},Ps={type:"childremoved",child:null};class vt extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=ur(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new F,t=new Jn,n=new Hi,r=new F(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new rt},normalMatrix:{value:new Ie}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new To,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(sl,e)}rotateY(e){return this.rotateOnAxis(al,e)}rotateZ(e){return this.rotateOnAxis(ol,e)}translateOnAxis(e,t){return rl.copy(e).applyQuaternion(this.quaternion),this.position.add(rl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sl,e)}translateY(e){return this.translateOnAxis(al,e)}translateZ(e){return this.translateOnAxis(ol,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Mr.copy(e):Mr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Xi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(Xi,Mr,this.up):yn.lookAt(Mr,Xi,this.up),this.quaternion.setFromRotationMatrix(yn),r&&(yn.extractRotation(r.matrixWorld),Si.setFromRotationMatrix(yn),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ll),yi.child=e,this.dispatchEvent(yi),yi.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pu),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ll),yi.child=e,this.dispatchEvent(yi),yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xi,e,Cu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xi,Ru,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}vt.DEFAULT_UP=new F(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ln extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lu={type:"move"};class Ls{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Lu)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ln;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Hc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function Ds(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ve.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ve.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ve.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ve.workingColorSpace){if(e=vu(e,1),t=He(t,0,1),n=He(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ds(a,s,e+1/3),this.g=Ds(a,s,e),this.b=Ds(a,s,e-1/3)}return Ve.colorSpaceToWorking(this,r),this}setStyle(e,t=Yt){function n(s){s!==void 0&&parseFloat(s)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const n=Hc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=In(e.r),this.g=In(e.g),this.b=In(e.b),this}copyLinearToSRGB(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return Ve.workingToColorSpace(Rt.copy(this),e),Math.round(He(Rt.r*255,0,255))*65536+Math.round(He(Rt.g*255,0,255))*256+Math.round(He(Rt.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ve.workingColorSpace){Ve.workingToColorSpace(Rt.copy(this),t);const n=Rt.r,r=Rt.g,s=Rt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ve.workingColorSpace){return Ve.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=Yt){Ve.workingToColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,r=Rt.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(kn),this.setHSL(kn.h+e,kn.s+t,kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(Sr);const n=Ts(kn.h,Sr.h,t),r=Ts(kn.s,Sr.s,t),s=Ts(kn.l,Sr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new ze;ze.NAMES=Hc;class Du extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Jt=new F,bn=new F,Is=new F,En=new F,bi=new F,Ei=new F,cl=new F,Us=new F,Ns=new F,Fs=new F,Os=new ot,Bs=new ot,zs=new ot;class rn{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Jt.subVectors(e,t),r.cross(Jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Jt.subVectors(r,t),bn.subVectors(n,t),Is.subVectors(e,t);const a=Jt.dot(Jt),o=Jt.dot(bn),l=Jt.dot(Is),c=bn.dot(bn),h=bn.dot(Is),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,d=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,En.x),l.addScaledVector(a,En.y),l.addScaledVector(o,En.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Os.setScalar(0),Bs.setScalar(0),zs.setScalar(0),Os.fromBufferAttribute(e,t),Bs.fromBufferAttribute(e,n),zs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Os,s.x),a.addScaledVector(Bs,s.y),a.addScaledVector(zs,s.z),a}static isFrontFacing(e,t,n,r){return Jt.subVectors(n,t),bn.subVectors(e,t),Jt.cross(bn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),Jt.cross(bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return rn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;bi.subVectors(r,n),Ei.subVectors(s,n),Us.subVectors(e,n);const l=bi.dot(Us),c=Ei.dot(Us);if(l<=0&&c<=0)return t.copy(n);Ns.subVectors(e,r);const h=bi.dot(Ns),f=Ei.dot(Ns);if(h>=0&&f<=h)return t.copy(r);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(bi,a);Fs.subVectors(e,s);const d=bi.dot(Fs),g=Ei.dot(Fs);if(g>=0&&d<=g)return t.copy(s);const x=d*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Ei,o);const m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return cl.subVectors(s,r),o=(f-h)/(f-h+(d-g)),t.copy(r).addScaledVector(cl,o);const p=1/(m+x+u);return a=x*p,o=u*p,t.copy(n).addScaledVector(bi,a).addScaledVector(Ei,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class fr{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qt):Qt.fromBufferAttribute(s,a),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yr.copy(n.boundingBox)),yr.applyMatrix4(e.matrixWorld),this.union(yr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qi),br.subVectors(this.max,qi),Ti.subVectors(e.a,qi),Ai.subVectors(e.b,qi),wi.subVectors(e.c,qi),Vn.subVectors(Ai,Ti),Hn.subVectors(wi,Ai),ni.subVectors(Ti,wi);let t=[0,-Vn.z,Vn.y,0,-Hn.z,Hn.y,0,-ni.z,ni.y,Vn.z,0,-Vn.x,Hn.z,0,-Hn.x,ni.z,0,-ni.x,-Vn.y,Vn.x,0,-Hn.y,Hn.x,0,-ni.y,ni.x,0];return!ks(t,Ti,Ai,wi,br)||(t=[1,0,0,0,1,0,0,0,1],!ks(t,Ti,Ai,wi,br))?!1:(Er.crossVectors(Vn,Hn),t=[Er.x,Er.y,Er.z],ks(t,Ti,Ai,wi,br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Tn=[new F,new F,new F,new F,new F,new F,new F,new F],Qt=new F,yr=new fr,Ti=new F,Ai=new F,wi=new F,Vn=new F,Hn=new F,ni=new F,qi=new F,br=new F,Er=new F,ii=new F;function ks(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ii.fromArray(i,s);const o=r.x*Math.abs(ii.x)+r.y*Math.abs(ii.y)+r.z*Math.abs(ii.z),l=e.dot(ii),c=t.dot(ii),h=n.dot(ii);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const gt=new F,Tr=new Ge;let Iu=0;class vn extends pi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Iu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ko,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Tr.fromBufferAttribute(this,t),Tr.applyMatrix3(e),this.setXY(t,Tr.x,Tr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),n=Ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),n=Ft(n,this.array),r=Ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),n=Ft(n,this.array),r=Ft(r,this.array),s=Ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ko&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Gc extends vn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Wc extends vn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bt extends vn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Uu=new fr,Yi=new F,Vs=new F;class dr{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Uu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Yi.subVectors(e,this.center);const t=Yi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Yi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Vs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Yi.copy(e.center).add(Vs)),this.expandByPoint(Yi.copy(e.center).sub(Vs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Nu=0;const qt=new rt,Hs=new vt,Ci=new F,kt=new fr,$i=new fr,yt=new F;class Dt extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=ur(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pu(e)?Wc:Gc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ie().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,n){return qt.makeTranslation(e,t,n),this.applyMatrix4(qt),this}scale(e,t,n){return qt.makeScale(e,t,n),this.applyMatrix4(qt),this}lookAt(e){return Hs.lookAt(e),Hs.updateMatrix(),this.applyMatrix4(Hs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new bt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];kt.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,kt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,kt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(kt.min),this.boundingBox.expandByPoint(kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(kt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];$i.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(kt.min,$i.min),kt.expandByPoint(yt),yt.addVectors(kt.max,$i.max),kt.expandByPoint(yt)):(kt.expandByPoint($i.min),kt.expandByPoint($i.max))}kt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)yt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)yt.fromBufferAttribute(o,c),l&&(Ci.fromBufferAttribute(e,c),yt.add(Ci)),r=Math.max(r,n.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new vn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new F,l[v]=new F;const c=new F,h=new F,f=new F,u=new Ge,d=new Ge,g=new Ge,x=new F,m=new F;function p(v,b,P){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,b),f.fromBufferAttribute(n,P),u.fromBufferAttribute(s,v),d.fromBufferAttribute(s,b),g.fromBufferAttribute(s,P),h.sub(c),f.sub(c),d.sub(u),g.sub(u);const R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(R),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(R),o[v].add(x),o[b].add(x),o[P].add(x),l[v].add(m),l[b].add(m),l[P].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let v=0,b=E.length;v<b;++v){const P=E[v],R=P.start,U=P.count;for(let W=R,X=R+U;W<X;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const w=new F,M=new F,T=new F,y=new F;function C(v){T.fromBufferAttribute(r,v),y.copy(T);const b=o[v];w.copy(b),w.sub(T.multiplyScalar(T.dot(b))).normalize(),M.crossVectors(y,b);const R=M.dot(l[v])<0?-1:1;a.setXYZW(v,w.x,w.y,w.z,R)}for(let v=0,b=E.length;v<b;++v){const P=E[v],R=P.start,U=P.count;for(let W=R,X=R+U;W<X;W+=3)C(e.getX(W+0)),C(e.getX(W+1)),C(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new vn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const r=new F,s=new F,a=new F,o=new F,l=new F,c=new F,h=new F,f=new F;if(e)for(let u=0,d=e.count;u<d;u+=3){const g=e.getX(u+0),x=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=t.count;u<d;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let d=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?d=l[x]*o.data.stride+o.offset:d=l[x]*h;for(let p=0;p<h;p++)u[g++]=c[d++]}return new vn(u,h,f)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Dt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],d=e(u,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const d=c[f];h.push(d.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],f=s[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Fu=0;class mi extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=ur(),this.name="",this.type="Material",this.blending=Ui,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ua,this.blendDst=fa,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$o,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==Zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ua&&(n.blendSrc=this.blendSrc),this.blendDst!==fa&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$o&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ze().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ge().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ge().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const An=new F,Gs=new F,Ar=new F,Gn=new F,Ws=new F,wr=new F,Xs=new F;class fs{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Gs.copy(e).add(t).multiplyScalar(.5),Ar.copy(t).sub(e).normalize(),Gn.copy(this.origin).sub(Gs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ar),o=Gn.dot(this.direction),l=-Gn.dot(Ar),c=Gn.lengthSq(),h=Math.abs(1-a*a);let f,u,d,g;if(h>0)if(f=a*l-o,u=a*o-l,g=s*h,f>=0)if(u>=-g)if(u<=g){const x=1/h;f*=x,u*=x,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-s,-l),s),d=u*(u+2*l)+c):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+u*(u+2*l)+c);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Gs).addScaledVector(Ar,u),d}intersectSphere(e,t){An.subVectors(e.center,this.origin);const n=An.dot(this.direction),r=An.dot(An)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,n,r,s){Ws.subVectors(t,e),wr.subVectors(n,e),Xs.crossVectors(Ws,wr);let a=this.direction.dot(Xs),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Gn.subVectors(this.origin,e);const l=o*this.direction.dot(wr.crossVectors(Gn,wr));if(l<0)return null;const c=o*this.direction.dot(Ws.cross(Gn));if(c<0||l+c>a)return null;const h=-o*Gn.dot(Xs);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ao extends mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=mo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hl=new rt,ri=new fs,Cr=new dr,ul=new F,Rr=new F,Pr=new F,Lr=new F,qs=new F,Dr=new F,fl=new F,Ir=new F;let an=class extends vt{constructor(e=new Dt,t=new Ao){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Dr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],f=s[l];h!==0&&(qs.fromBufferAttribute(f,e),a?Dr.addScaledVector(qs,h):Dr.addScaledVector(qs.sub(t),h))}t.add(Dr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),ri.copy(e.ray).recast(e.near),!(Cr.containsPoint(ri.origin)===!1&&(ri.intersectSphere(Cr,ul)===null||ri.origin.distanceToSquared(ul)>(e.far-e.near)**2))&&(hl.copy(s).invert(),ri.copy(e.ray).applyMatrix4(hl),!(n.boundingBox!==null&&ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ri)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=a[m.materialIndex],E=Math.max(m.start,d.start),w=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=E,T=w;M<T;M+=3){const y=o.getX(M),C=o.getX(M+1),v=o.getX(M+2);r=Ur(this,p,e,n,c,h,f,y,C,v),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const E=o.getX(m),w=o.getX(m+1),M=o.getX(m+2);r=Ur(this,a,e,n,c,h,f,E,w,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=a[m.materialIndex],E=Math.max(m.start,d.start),w=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=E,T=w;M<T;M+=3){const y=M,C=M+1,v=M+2;r=Ur(this,p,e,n,c,h,f,y,C,v),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const E=m,w=m+1,M=m+2;r=Ur(this,a,e,n,c,h,f,E,w,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Ou(i,e,t,n,r,s,a,o){let l;if(e.side===Ot?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Zn,o),l===null)return null;Ir.copy(o),Ir.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ir);return c<t.near||c>t.far?null:{distance:c,point:Ir.clone(),object:i}}function Ur(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Rr),i.getVertexPosition(l,Pr),i.getVertexPosition(c,Lr);const h=Ou(i,e,t,n,Rr,Pr,Lr,fl);if(h){const f=new F;rn.getBarycoord(fl,Rr,Pr,Lr,f),r&&(h.uv=rn.getInterpolatedAttribute(r,o,l,c,f,new Ge)),s&&(h.uv1=rn.getInterpolatedAttribute(s,o,l,c,f,new Ge)),a&&(h.normal=rn.getInterpolatedAttribute(a,o,l,c,f,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new F,materialIndex:0};rn.getNormal(Rr,Pr,Lr,u.normal),h.face=u,h.barycoord=f}return h}class Bu extends Ut{constructor(e=null,t=1,n=1,r,s,a,o,l,c=At,h=At,f,u){super(null,a,o,l,c,h,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ys=new F,zu=new F,ku=new Ie;class oi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ys.subVectors(n,t).cross(zu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Ys),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ku.getNormalMatrix(e),r=this.coplanarPoint(Ys).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const si=new dr,Vu=new Ge(.5,.5),Nr=new F;class wo{constructor(e=new oi,t=new oi,n=new oi,r=new oi,s=new oi,a=new oi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=mn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],f=s[5],u=s[6],d=s[7],g=s[8],x=s[9],m=s[10],p=s[11],E=s[12],w=s[13],M=s[14],T=s[15];if(r[0].setComponents(c-a,d-h,p-g,T-E).normalize(),r[1].setComponents(c+a,d+h,p+g,T+E).normalize(),r[2].setComponents(c+o,d+f,p+x,T+w).normalize(),r[3].setComponents(c-o,d-f,p-x,T-w).normalize(),n)r[4].setComponents(l,u,m,M).normalize(),r[5].setComponents(c-l,d-u,p-m,T-M).normalize();else if(r[4].setComponents(c-l,d-u,p-m,T-M).normalize(),t===mn)r[5].setComponents(c+l,d+u,p+m,T+M).normalize();else if(t===lr)r[5].setComponents(l,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(e){si.center.set(0,0,0);const t=Vu.distanceTo(e.center);return si.radius=.7071067811865476+t,si.applyMatrix4(e.matrixWorld),this.intersectsSphere(si)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Nr.x=r.normal.x>0?e.max.x:e.min.x,Nr.y=r.normal.y>0?e.max.y:e.min.y,Nr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Nr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cn extends mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const os=new F,ls=new F,dl=new rt,Ki=new fs,Fr=new dr,$s=new F,pl=new F;class Xc extends vt{constructor(e=new Dt,t=new Cn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)os.fromBufferAttribute(t,r-1),ls.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=os.distanceTo(ls);e.setAttribute("lineDistance",new bt(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(r),Fr.radius+=s,e.ray.intersectsSphere(Fr)===!1)return;dl.copy(r).invert(),Ki.copy(e.ray).applyMatrix4(dl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=d,m=g-1;x<m;x+=c){const p=h.getX(x),E=h.getX(x+1),w=Or(this,e,Ki,l,p,E,x);w&&t.push(w)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(d),p=Or(this,e,Ki,l,x,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=d,m=g-1;x<m;x+=c){const p=Or(this,e,Ki,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=Or(this,e,Ki,l,g-1,d,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Or(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(os.fromBufferAttribute(o,r),ls.fromBufferAttribute(o,s),t.distanceSqToSegment(os,ls,$s,pl)>n)return;$s.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo($s);if(!(c<e.near||c>e.far))return{distance:c,point:pl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const ml=new F,gl=new F;class Co extends Xc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)ml.fromBufferAttribute(t,r),gl.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+ml.distanceTo(gl);e.setAttribute("lineDistance",new bt(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class tr extends mi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _l=new rt,eo=new fs,Br=new dr,zr=new F;class qc extends vt{constructor(e=new Dt,t=new tr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(r),Br.radius+=s,e.ray.intersectsSphere(Br)===!1)return;_l.copy(r).invert(),eo.copy(e.ray).applyMatrix4(_l);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=u,x=d;g<x;g++){const m=c.getX(g);zr.fromBufferAttribute(f,m),vl(zr,m,l,r,e,t,this)}}else{const u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let g=u,x=d;g<x;g++)zr.fromBufferAttribute(f,g),vl(zr,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function vl(i,e,t,n,r,s,a){const o=eo.distanceSqToPoint(i);if(o<t){const l=new F;eo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Yc extends Ut{constructor(e=[],t=fi,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zi extends Ut{constructor(e,t,n=Mn,r,s,a,o=At,l=At,c,h=Nn,f=1){if(h!==Nn&&h!==ui)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Eo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Hu extends zi{constructor(e,t=Mn,n=fi,r,s,a=At,o=At,l,c=Nn){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class $c extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class pr extends Dt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,d=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new bt(c,3)),this.setAttribute("normal",new bt(h,3)),this.setAttribute("uv",new bt(f,2));function g(x,m,p,E,w,M,T,y,C,v,b){const P=M/C,R=T/v,U=M/2,W=T/2,X=y/2,O=C+1,G=v+1;let B=0,K=0;const Q=new F;for(let re=0;re<G;re++){const ie=re*R-W;for(let de=0;de<O;de++){const De=de*P-U;Q[x]=De*E,Q[m]=ie*w,Q[p]=X,c.push(Q.x,Q.y,Q.z),Q[x]=0,Q[m]=0,Q[p]=y>0?1:-1,h.push(Q.x,Q.y,Q.z),f.push(de/C),f.push(1-re/v),B+=1}}for(let re=0;re<v;re++)for(let ie=0;ie<C;ie++){const de=u+ie+O*re,De=u+ie+O*(re+1),ke=u+(ie+1)+O*(re+1),Te=u+(ie+1)+O*re;l.push(de,De,Te),l.push(De,ke,Te),K+=6}o.addGroup(d,K,b),d+=K,u+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ds extends Dt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,f=e/o,u=t/l,d=[],g=[],x=[],m=[];for(let p=0;p<h;p++){const E=p*u-a;for(let w=0;w<c;w++){const M=w*f-s;g.push(M,-E,0),x.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){const w=E+c*p,M=E+c*(p+1),T=E+1+c*(p+1),y=E+1+c*p;d.push(w,M,y),d.push(M,T,y)}this.setIndex(d),this.setAttribute("position",new bt(g,3)),this.setAttribute("normal",new bt(x,3)),this.setAttribute("uv",new bt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ds(e.width,e.height,e.widthSegments,e.heightSegments)}}function ki(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(xl(r))r.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(xl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function It(i){const e={};for(let t=0;t<i.length;t++){const n=ki(i[t]);for(const r in n)e[r]=n[r]}return e}function xl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Gu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Kc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ve.workingColorSpace}const Wu={clone:ki,merge:It};var Xu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Sn extends mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xu,this.fragmentShader=qu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ki(e.uniforms),this.uniformsGroups=Gu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new ze().setHex(r.value);break;case"v2":this.uniforms[n].value=new Ge().fromArray(r.value);break;case"v3":this.uniforms[n].value=new F().fromArray(r.value);break;case"v4":this.uniforms[n].value=new ot().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ie().fromArray(r.value);break;case"m4":this.uniforms[n].value=new rt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Yu extends Sn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class $u extends mi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ze(16777215),this.specular=new ze(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qa,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=mo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ku extends mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=au,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zu extends mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Zc extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Ju extends Zc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ks=new rt,Ml=new F,Sl=new F;class Qu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.mapType=Gt,this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wo,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ml.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ml),Sl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sl),t.updateMatrixWorld(),Ks.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ks,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===lr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ks)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const kr=new F,Vr=new Hi,hn=new F;class Jc extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(kr,Vr,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kr,Vr,hn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(kr,Vr,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kr,Vr,hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new F,yl=new Ge,bl=new Ge;class Kt extends Jc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ja*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ja*2*Math.atan(Math.tan(Es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wn.x,Wn.y).multiplyScalar(-e/Wn.z)}getViewSize(e,t){return this.getViewBounds(e,yl,bl),t.subVectors(bl,yl)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Es*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class ps extends Jc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ju extends Qu{constructor(){super(new ps(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class El extends Zc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new ju}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Ri=-90,Pi=1;class ef extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Kt(Ri,Pi,e,t);r.layers=this.layers,this.add(r);const s=new Kt(Ri,Pi,e,t);s.layers=this.layers,this.add(s);const a=new Kt(Ri,Pi,e,t);a.layers=this.layers,this.add(a);const o=new Kt(Ri,Pi,e,t);o.layers=this.layers,this.add(o);const l=new Kt(Ri,Pi,e,t);l.layers=this.layers,this.add(l);const c=new Kt(Ri,Pi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===mn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class tf extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Tl=new rt;class nf{constructor(e,t,n=0,r=1/0){this.ray=new fs(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new To,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):We("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Tl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tl),this}intersectObject(e,t=!0,n=[]){return to(e,this,n,t),n.sort(Al),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)to(e[r],this,n,t);return n.sort(Al),n}}function Al(i,e){return i.distance-e.distance}function to(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)to(s[a],e,t,!0)}}class Qc{static{Qc.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}class rf extends Co{constructor(e=10,t=10,n=4473924,r=8947848){n=new ze(n),r=new ze(r);const s=t/2,a=e/t,o=e/2,l=[],c=[];for(let u=0,d=0,g=-o;u<=t;u++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const x=u===s?n:r;x.toArray(c,d),d+=3,x.toArray(c,d),d+=3,x.toArray(c,d),d+=3,x.toArray(c,d),d+=3}const h=new Dt;h.setAttribute("position",new bt(l,3)),h.setAttribute("color",new bt(c,3));const f=new Cn({vertexColors:!0,toneMapped:!1});super(h,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function wl(i,e,t,n){const r=sf(n);switch(t){case Oc:return i*e;case zc:return i*e/r.components*r.byteLength;case xo:return i*e/r.components*r.byteLength;case di:return i*e*2/r.components*r.byteLength;case Mo:return i*e*2/r.components*r.byteLength;case Bc:return i*e*3/r.components*r.byteLength;case sn:return i*e*4/r.components*r.byteLength;case So:return i*e*4/r.components*r.byteLength;case Jr:case Qr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case jr:case es:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ba:case Ta:return Math.max(i,16)*Math.max(e,8)/4;case ya:case Ea:return Math.max(i,8)*Math.max(e,8)/2;case Aa:case wa:case Ra:case Pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ca:case ns:case La:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ia:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ua:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Na:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Fa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Oa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case za:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ka:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Va:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Wa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Xa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case qa:case Ya:case $a:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ka:case Za:return Math.ceil(i/4)*Math.ceil(e/4)*8;case is:case Ja:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sf(i){switch(i){case Gt:case Ic:return{byteLength:1,components:1};case ar:case Uc:case Un:return{byteLength:2,components:1};case _o:case vo:return{byteLength:2,components:4};case Mn:case go:case pn:return{byteLength:4,components:1};case Nc:case Fc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:po}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=po);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function jc(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function af(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const h=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){const g=f[u],x=f[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,f[u]=x)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){const x=f[d];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var of=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lf=`#ifdef USE_ALPHAHASH
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
#endif`,cf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,df=`#ifdef USE_AOMAP
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
#endif`,pf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mf=`#ifdef USE_BATCHING
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
#endif`,gf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_f=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mf=`#ifdef USE_IRIDESCENCE
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
#endif`,Sf=`#ifdef USE_BUMPMAP
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
#endif`,yf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Af=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,wf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Cf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Rf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Pf=`#define PI 3.141592653589793
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
} // validated`,Lf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Df=`vec3 transformedNormal = objectNormal;
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
#endif`,If=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Uf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ff=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Of="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zf=`#ifdef USE_ENVMAP
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
#endif`,kf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Vf=`#ifdef USE_ENVMAP
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
#endif`,Hf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gf=`#ifdef USE_ENVMAP
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
#endif`,Wf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$f=`#ifdef USE_GRADIENTMAP
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
}`,Kf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,jf=`#ifdef USE_ENVMAP
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
#endif`,ed=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,td=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rd=`PhysicalMaterial material;
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
#endif`,sd=`uniform sampler2D dfgLUT;
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
}`,ad=`
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
#endif`,od=`#if defined( RE_IndirectDiffuse )
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
#endif`,ld=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cd=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,hd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ud=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,md=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_d=`#if defined( USE_POINTS_UV )
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
#endif`,vd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Md=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bd=`#ifdef USE_MORPHTARGETS
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
#endif`,Ed=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Td=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ad=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Pd=`#ifdef USE_NORMALMAP
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
#endif`,Ld=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Id=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ud=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Od=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qd=`float getShadowMask() {
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
}`,Yd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$d=`#ifdef USE_SKINNING
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
#endif`,Kd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zd=`#ifdef USE_SKINNING
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
#endif`,Jd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ep=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tp=`#ifdef USE_TRANSMISSION
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
#endif`,np=`#ifdef USE_TRANSMISSION
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
#endif`,ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ap=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const op=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lp=`uniform sampler2D t2D;
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
}`,cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dp=`#include <common>
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
}`,pp=`#if DEPTH_PACKING == 3200
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
}`,mp=`#define DISTANCE
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
}`,gp=`#define DISTANCE
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
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`uniform float scale;
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
}`,Mp=`uniform vec3 diffuse;
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
}`,Sp=`#include <common>
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
}`,yp=`uniform vec3 diffuse;
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
}`,bp=`#define LAMBERT
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
}`,Ep=`#define LAMBERT
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
}`,Tp=`#define MATCAP
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
}`,Ap=`#define MATCAP
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
}`,wp=`#define NORMAL
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
}`,Cp=`#define NORMAL
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
}`,Rp=`#define PHONG
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
}`,Pp=`#define PHONG
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
}`,Lp=`#define STANDARD
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
}`,Dp=`#define STANDARD
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
}`,Ip=`#define TOON
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
}`,Up=`#define TOON
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
}`,Np=`uniform float size;
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
}`,Fp=`uniform vec3 diffuse;
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
}`,Op=`#include <common>
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
}`,Bp=`uniform vec3 color;
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
}`,zp=`uniform float rotation;
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
}`,kp=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:of,alphahash_pars_fragment:lf,alphamap_fragment:cf,alphamap_pars_fragment:hf,alphatest_fragment:uf,alphatest_pars_fragment:ff,aomap_fragment:df,aomap_pars_fragment:pf,batching_pars_vertex:mf,batching_vertex:gf,begin_vertex:_f,beginnormal_vertex:vf,bsdfs:xf,iridescence_fragment:Mf,bumpmap_pars_fragment:Sf,clipping_planes_fragment:yf,clipping_planes_pars_fragment:bf,clipping_planes_pars_vertex:Ef,clipping_planes_vertex:Tf,color_fragment:Af,color_pars_fragment:wf,color_pars_vertex:Cf,color_vertex:Rf,common:Pf,cube_uv_reflection_fragment:Lf,defaultnormal_vertex:Df,displacementmap_pars_vertex:If,displacementmap_vertex:Uf,emissivemap_fragment:Nf,emissivemap_pars_fragment:Ff,colorspace_fragment:Of,colorspace_pars_fragment:Bf,envmap_fragment:zf,envmap_common_pars_fragment:kf,envmap_pars_fragment:Vf,envmap_pars_vertex:Hf,envmap_physical_pars_fragment:jf,envmap_vertex:Gf,fog_vertex:Wf,fog_pars_vertex:Xf,fog_fragment:qf,fog_pars_fragment:Yf,gradientmap_pars_fragment:$f,lightmap_pars_fragment:Kf,lights_lambert_fragment:Zf,lights_lambert_pars_fragment:Jf,lights_pars_begin:Qf,lights_toon_fragment:ed,lights_toon_pars_fragment:td,lights_phong_fragment:nd,lights_phong_pars_fragment:id,lights_physical_fragment:rd,lights_physical_pars_fragment:sd,lights_fragment_begin:ad,lights_fragment_maps:od,lights_fragment_end:ld,lightprobes_pars_fragment:cd,logdepthbuf_fragment:hd,logdepthbuf_pars_fragment:ud,logdepthbuf_pars_vertex:fd,logdepthbuf_vertex:dd,map_fragment:pd,map_pars_fragment:md,map_particle_fragment:gd,map_particle_pars_fragment:_d,metalnessmap_fragment:vd,metalnessmap_pars_fragment:xd,morphinstance_vertex:Md,morphcolor_vertex:Sd,morphnormal_vertex:yd,morphtarget_pars_vertex:bd,morphtarget_vertex:Ed,normal_fragment_begin:Td,normal_fragment_maps:Ad,normal_pars_fragment:wd,normal_pars_vertex:Cd,normal_vertex:Rd,normalmap_pars_fragment:Pd,clearcoat_normal_fragment_begin:Ld,clearcoat_normal_fragment_maps:Dd,clearcoat_pars_fragment:Id,iridescence_pars_fragment:Ud,opaque_fragment:Nd,packing:Fd,premultiplied_alpha_fragment:Od,project_vertex:Bd,dithering_fragment:zd,dithering_pars_fragment:kd,roughnessmap_fragment:Vd,roughnessmap_pars_fragment:Hd,shadowmap_pars_fragment:Gd,shadowmap_pars_vertex:Wd,shadowmap_vertex:Xd,shadowmask_pars_fragment:qd,skinbase_vertex:Yd,skinning_pars_vertex:$d,skinning_vertex:Kd,skinnormal_vertex:Zd,specularmap_fragment:Jd,specularmap_pars_fragment:Qd,tonemapping_fragment:jd,tonemapping_pars_fragment:ep,transmission_fragment:tp,transmission_pars_fragment:np,uv_pars_fragment:ip,uv_pars_vertex:rp,uv_vertex:sp,worldpos_vertex:ap,background_vert:op,background_frag:lp,backgroundCube_vert:cp,backgroundCube_frag:hp,cube_vert:up,cube_frag:fp,depth_vert:dp,depth_frag:pp,distance_vert:mp,distance_frag:gp,equirect_vert:_p,equirect_frag:vp,linedashed_vert:xp,linedashed_frag:Mp,meshbasic_vert:Sp,meshbasic_frag:yp,meshlambert_vert:bp,meshlambert_frag:Ep,meshmatcap_vert:Tp,meshmatcap_frag:Ap,meshnormal_vert:wp,meshnormal_frag:Cp,meshphong_vert:Rp,meshphong_frag:Pp,meshphysical_vert:Lp,meshphysical_frag:Dp,meshtoon_vert:Ip,meshtoon_frag:Up,points_vert:Np,points_frag:Fp,shadow_vert:Op,shadow_frag:Bp,sprite_vert:zp,sprite_frag:kp},ue={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ie}},envmap:{envMap:{value:null},envMapRotation:{value:new Ie},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ie},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0},uvTransform:{value:new Ie}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ie},alphaMap:{value:null},alphaMapTransform:{value:new Ie},alphaTest:{value:0}}},fn={basic:{uniforms:It([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:It([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:It([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:It([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:It([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new ze(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:It([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:It([ue.points,ue.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:It([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:It([ue.common,ue.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:It([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:It([ue.sprite,ue.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ie}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distance:{uniforms:It([ue.common,ue.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distance_vert,fragmentShader:Oe.distance_frag},shadow:{uniforms:It([ue.lights,ue.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};fn.physical={uniforms:It([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ie},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ie},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ie},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ie},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ie},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ie}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Hr={r:0,b:0,g:0},Vp=new rt,eh=new Ie;eh.set(-1,0,0,0,1,0,0,0,1);function Hp(i,e,t,n,r,s){const a=new ze(0);let o=r===!0?0:1,l,c,h=null,f=0,u=null;function d(E){let w=E.isScene===!0?E.background:null;if(w&&w.isTexture){const M=E.backgroundBlurriness>0;w=e.get(w,M)}return w}function g(E){let w=!1;const M=d(E);M===null?m(a,o):M&&M.isColor&&(m(M,1),w=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(E,w){const M=d(w);M&&(M.isCubeTexture||M.mapping===us)?(c===void 0&&(c=new an(new pr(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:ki(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,y,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Vp.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(eh),c.material.toneMapped=Ve.getTransfer(M.colorSpace)!==Ze,(h!==M||f!==M.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,u=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new an(new ds(2,2),new Sn({name:"BackgroundMaterial",uniforms:ki(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Ve.getTransfer(M.colorSpace)!==Ze,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,f=M.version,u=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function m(E,w){E.getRGB(Hr,Kc(i)),t.buffers.color.setClear(Hr.r,Hr.g,Hr.b,w,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,w=1){a.set(E),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,m(a,o)},render:g,addToRenderList:x,dispose:p}}function Gp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null);let s=r,a=!1;function o(R,U,W,X,O){let G=!1;const B=f(R,X,W,U);s!==B&&(s=B,c(s.object)),G=d(R,X,W,O),G&&g(R,X,W,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,M(R,U,W,X),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function f(R,U,W,X){const O=X.wireframe===!0;let G=n[U.id];G===void 0&&(G={},n[U.id]=G);const B=R.isInstancedMesh===!0?R.id:0;let K=G[B];K===void 0&&(K={},G[B]=K);let Q=K[W.id];Q===void 0&&(Q={},K[W.id]=Q);let re=Q[O];return re===void 0&&(re=u(l()),Q[O]=re),re}function u(R){const U=[],W=[],X=[];for(let O=0;O<t;O++)U[O]=0,W[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:W,attributeDivisors:X,object:R,attributes:{},index:null}}function d(R,U,W,X){const O=s.attributes,G=U.attributes;let B=0;const K=W.getAttributes();for(const Q in K)if(K[Q].location>=0){const ie=O[Q];let de=G[Q];if(de===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(de=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(de=R.instanceColor)),ie===void 0||ie.attribute!==de||de&&ie.data!==de.data)return!0;B++}return s.attributesNum!==B||s.index!==X}function g(R,U,W,X){const O={},G=U.attributes;let B=0;const K=W.getAttributes();for(const Q in K)if(K[Q].location>=0){let ie=G[Q];ie===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(ie=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(ie=R.instanceColor));const de={};de.attribute=ie,ie&&ie.data&&(de.data=ie.data),O[Q]=de,B++}s.attributes=O,s.attributesNum=B,s.index=X}function x(){const R=s.newAttributes;for(let U=0,W=R.length;U<W;U++)R[U]=0}function m(R){p(R,0)}function p(R,U){const W=s.newAttributes,X=s.enabledAttributes,O=s.attributeDivisors;W[R]=1,X[R]===0&&(i.enableVertexAttribArray(R),X[R]=1),O[R]!==U&&(i.vertexAttribDivisor(R,U),O[R]=U)}function E(){const R=s.newAttributes,U=s.enabledAttributes;for(let W=0,X=U.length;W<X;W++)U[W]!==R[W]&&(i.disableVertexAttribArray(W),U[W]=0)}function w(R,U,W,X,O,G,B){B===!0?i.vertexAttribIPointer(R,U,W,O,G):i.vertexAttribPointer(R,U,W,X,O,G)}function M(R,U,W,X){x();const O=X.attributes,G=W.getAttributes(),B=U.defaultAttributeValues;for(const K in G){const Q=G[K];if(Q.location>=0){let re=O[K];if(re===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(re=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(re=R.instanceColor)),re!==void 0){const ie=re.normalized,de=re.itemSize,De=e.get(re);if(De===void 0)continue;const ke=De.buffer,Te=De.type,$=De.bytesPerElement,te=Te===i.INT||Te===i.UNSIGNED_INT||re.gpuType===go;if(re.isInterleavedBufferAttribute){const ee=re.data,Ce=ee.stride,Le=re.offset;if(ee.isInstancedInterleavedBuffer){for(let be=0;be<Q.locationSize;be++)p(Q.location+be,ee.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let be=0;be<Q.locationSize;be++)m(Q.location+be);i.bindBuffer(i.ARRAY_BUFFER,ke);for(let be=0;be<Q.locationSize;be++)w(Q.location+be,de/Q.locationSize,Te,ie,Ce*$,(Le+de/Q.locationSize*be)*$,te)}else{if(re.isInstancedBufferAttribute){for(let ee=0;ee<Q.locationSize;ee++)p(Q.location+ee,re.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ee=0;ee<Q.locationSize;ee++)m(Q.location+ee);i.bindBuffer(i.ARRAY_BUFFER,ke);for(let ee=0;ee<Q.locationSize;ee++)w(Q.location+ee,de/Q.locationSize,Te,ie,de*$,de/Q.locationSize*ee*$,te)}}else if(B!==void 0){const ie=B[K];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(Q.location,ie);break;case 3:i.vertexAttrib3fv(Q.location,ie);break;case 4:i.vertexAttrib4fv(Q.location,ie);break;default:i.vertexAttrib1fv(Q.location,ie)}}}}E()}function T(){b();for(const R in n){const U=n[R];for(const W in U){const X=U[W];for(const O in X){const G=X[O];for(const B in G)h(G[B].object),delete G[B];delete X[O]}}delete n[R]}}function y(R){if(n[R.id]===void 0)return;const U=n[R.id];for(const W in U){const X=U[W];for(const O in X){const G=X[O];for(const B in G)h(G[B].object),delete G[B];delete X[O]}}delete n[R.id]}function C(R){for(const U in n){const W=n[U];for(const X in W){const O=W[X];if(O[R.id]===void 0)continue;const G=O[R.id];for(const B in G)h(G[B].object),delete G[B];delete O[R.id]}}}function v(R){for(const U in n){const W=n[U],X=R.isInstancedMesh===!0?R.id:0,O=W[X];if(O!==void 0){for(const G in O){const B=O[G];for(const K in B)h(B[K].object),delete B[K];delete O[G]}delete W[X],Object.keys(W).length===0&&delete n[U]}}}function b(){P(),a=!0,s!==r&&(s=r,c(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:y,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:E}}function Wp(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];t.update(u,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Xp(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==sn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const v=C===Un&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Gt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==pn&&!v)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Pe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),y=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:M,maxSamples:T,samples:y}}function qp(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new oi,o=new Ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||r;return r=u,n=f.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){const g=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const E=s?0:n,w=E*4;let M=p.clippingState||null;l.value=M,M=h(g,u,w,d);for(let T=0;T!==w;++T)M[T]=t[T];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,g){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=d+x*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,M=d;w!==x;++w,M+=4)a.copy(f[w]).applyMatrix4(E,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const Kn=4,Cl=[.125,.215,.35,.446,.526,.582],ci=20,Yp=256,Zi=new ps,Rl=new ze;let Zs=null,Js=0,Qs=0,js=!1;const $p=new F;class Pl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=$p}=s;Zs=this._renderer.getRenderTarget(),Js=this._renderer.getActiveCubeFace(),Qs=this._renderer.getActiveMipmapLevel(),js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Il(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Zs,Js,Qs),this._renderer.xr.enabled=js,e.scissorTest=!1,Li(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fi||e.mapping===Bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zs=this._renderer.getRenderTarget(),Js=this._renderer.getActiveCubeFace(),Qs=this._renderer.getActiveMipmapLevel(),js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Lt,minFilter:Lt,generateMipmaps:!1,type:Un,format:sn,colorSpace:rs,depthBuffer:!1},r=Ll(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ll(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Kp(s)),this._blurMaterial=Jp(s,e,t),this._ggxMaterial=Zp(s,e,t)}return r}_compileMaterial(e){const t=new an(new Dt,e);this._renderer.compile(t,Zi)}_sceneToCubeUV(e,t,n,r,s){const l=new Kt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Rl),f.toneMapping=gn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new an(new pr,new Ao({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const E=e.background;E?E.isColor&&(m.color.copy(E),e.background=null,p=!0):(m.color.copy(Rl),p=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[w],s.y,s.z)):M===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[w]));const T=this._cubeSize;Li(r,M*T,w>2?T:0,T,T),f.setRenderTarget(r),p&&f.render(x,l),f.render(e,l)}f.toneMapping=d,f.autoClear=u,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===fi||e.mapping===Bi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Il()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Li(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Zi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=0+c*1.25,d=f*u,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-Kn?n-g+Kn:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=g-t,Li(s,m,p,3*x,2*x),r.setRenderTarget(s),r.render(o,Zi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,Li(e,m,p,3*x,2*x),r.setRenderTarget(e),r.render(o,Zi)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&We("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[r];f.material=c;const u=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ci-1),x=s/g,m=isFinite(s)?1+Math.floor(h*x):ci;m>ci&&Pe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ci}`);const p=[];let E=0;for(let C=0;C<ci;++C){const v=C/x,b=Math.exp(-v*v/2);p.push(b),C===0?E+=b:C<m&&(E+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/E;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:w}=this;u.dTheta.value=g,u.mipInt.value=w-n;const M=this._sizeLods[r],T=3*M*(r>w-Kn?r-w+Kn:0),y=4*(this._cubeSize-M);Li(t,T,y,3*M,2*M),l.setRenderTarget(t),l.render(f,Zi)}}function Kp(i){const e=[],t=[],n=[];let r=i;const s=i-Kn+1+Cl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Kn?l=Cl[a-i+Kn-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,g=6,x=3,m=2,p=1,E=new Float32Array(x*g*d),w=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let y=0;y<d;y++){const C=y%3*2/3-1,v=y>2?0:-1,b=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];E.set(b,x*g*y),w.set(u,m*g*y);const P=[y,y,y,y,y,y];M.set(P,p*g*y)}const T=new Dt;T.setAttribute("position",new vn(E,x)),T.setAttribute("uv",new vn(w,m)),T.setAttribute("faceIndex",new vn(M,p)),n.push(new an(T,null)),r>Kn&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ll(i,e,t){const n=new _n(i,e,t);return n.texture.mapping=us,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Li(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Zp(i,e,t){return new Sn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Yp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ms(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Jp(i,e,t){const n=new Float32Array(ci),r=new F(0,1,0);return new Sn({name:"SphericalGaussianBlur",defines:{n:ci,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ms(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Dl(){return new Sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ms(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Il(){return new Sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ms(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function ms(){return`

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
	`}class th extends _n{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Yc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new pr(5,5,5),s=new Sn({name:"CubemapFromEquirect",uniforms:ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ot,blending:Dn});s.uniforms.tEquirect.value=t;const a=new an(r,s),o=t.minFilter;return t.minFilter===hi&&(t.minFilter=Lt),new ef(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function Qp(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,d=!1){return u==null?null:d?a(u):s(u)}function s(u){if(u&&u.isTexture){const d=u.mapping;if(d===Ss||d===ys)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new th(g.height);return x.fromEquirectangularTexture(i,u),e.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const d=u.mapping,g=d===Ss||d===ys,x=d===fi||d===Bi;if(g||x){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Pl(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const E=u.image;return g&&E&&E.height>0||x&&E&&l(E)?(n===null&&(n=new Pl(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,d){return d===Ss?u.mapping=fi:d===ys&&(u.mapping=Bi),u}function l(u){let d=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&d++;return d===g}function c(u){const d=u.target;d.removeEventListener("dispose",c);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function jp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Ni("WebGLRenderer: "+n+" extension not supported."),r}}}function em(i,e,t,n){const r={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const d=s.get(u);d&&(e.remove(d),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(f){const u=f.attributes;for(const d in u)e.update(u[d],i.ARRAY_BUFFER)}function c(f){const u=[],d=f.index,g=f.attributes.position;let x=0;if(g===void 0)return;if(d!==null){const E=d.array;x=d.version;for(let w=0,M=E.length;w<M;w+=3){const T=E[w+0],y=E[w+1],C=E[w+2];u.push(T,y,y,C,C,T)}}else{const E=g.array;x=g.version;for(let w=0,M=E.length/3-1;w<M;w+=3){const T=w+0,y=w+1,C=w+2;u.push(T,y,y,C,C,T)}}const m=new(g.count>=65535?Wc:Gc)(u,1);m.version=x;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function h(f){const u=s.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function tm(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,u){i.drawElements(n,u,s,f*a),t.update(u,n,1)}function c(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,s,f*a,d),t.update(u,n,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,f,0,d);let x=0;for(let m=0;m<d;m++)x+=u[m];t.update(x,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function nm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:We("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function im(i,e,t){const n=new WeakMap,r=new ot;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==f){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let w=0;d===!0&&(w=1),g===!0&&(w=2),x===!0&&(w=3);let M=o.attributes.position.count*w,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const y=new Float32Array(M*T*4*f),C=new Vc(y,M,T,f);C.type=pn,C.needsUpdate=!0;const v=w*4;for(let P=0;P<f;P++){const R=m[P],U=p[P],W=E[P],X=M*T*4*P;for(let O=0;O<R.count;O++){const G=O*v;d===!0&&(r.fromBufferAttribute(R,O),y[X+G+0]=r.x,y[X+G+1]=r.y,y[X+G+2]=r.z,y[X+G+3]=0),g===!0&&(r.fromBufferAttribute(U,O),y[X+G+4]=r.x,y[X+G+5]=r.y,y[X+G+6]=r.z,y[X+G+7]=0),x===!0&&(r.fromBufferAttribute(W,O),y[X+G+8]=r.x,y[X+G+9]=r.y,y[X+G+10]=r.z,y[X+G+11]=W.itemSize===4?r.w:1)}}u={count:f,texture:C,size:new Ge(M,T)},n.set(o,u),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];const g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function rm(i,e,t,n,r){let s=new WeakMap;function a(c){const h=r.render.frame,f=c.geometry,u=e.get(c,f);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==h&&(d.update(),s.set(d,h))}return u}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const sm={[Tc]:"LINEAR_TONE_MAPPING",[Ac]:"REINHARD_TONE_MAPPING",[wc]:"CINEON_TONE_MAPPING",[Cc]:"ACES_FILMIC_TONE_MAPPING",[Pc]:"AGX_TONE_MAPPING",[Lc]:"NEUTRAL_TONE_MAPPING",[Rc]:"CUSTOM_TONE_MAPPING"};function am(i,e,t,n,r,s){const a=new _n(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,depthTexture:r?new zi(e,t):void 0}),o=new _n(e,t,{type:Un,depthBuffer:!1,stencilBuffer:!1}),l=new Dt;l.setAttribute("position",new bt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new bt([0,2,0,0,2,0],2));const c=new Yu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new an(l,c),f=new ps(-1,1,1,-1,0,1);let u=null,d=null,g=!1,x,m=null,p=[],E=!1;this.setSize=function(w,M){a.setSize(w,M),o.setSize(w,M);for(let T=0;T<p.length;T++){const y=p[T];y.setSize&&y.setSize(w,M)}},this.setEffects=function(w){p=w,E=p.length>0&&p[0].isRenderPass===!0;const M=a.width,T=a.height;for(let y=0;y<p.length;y++){const C=p[y];C.setSize&&C.setSize(M,T)}},this.begin=function(w,M){if(g||w.toneMapping===gn&&p.length===0)return!1;if(m=M,M!==null){const T=M.width,y=M.height;(a.width!==T||a.height!==y)&&this.setSize(T,y)}return E===!1&&w.setRenderTarget(a),x=w.toneMapping,w.toneMapping=gn,!0},this.hasRenderPass=function(){return E},this.end=function(w,M){w.toneMapping=x,g=!0;let T=a,y=o;for(let C=0;C<p.length;C++){const v=p[C];if(v.enabled!==!1&&(v.render(w,y,T,M),v.needsSwap!==!1)){const b=T;T=y,y=b}}if(u!==w.outputColorSpace||d!==w.toneMapping){u=w.outputColorSpace,d=w.toneMapping,c.defines={},Ve.getTransfer(u)===Ze&&(c.defines.SRGB_TRANSFER="");const C=sm[d];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,w.setRenderTarget(m),w.render(h,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const nh=new Ut,no=new zi(1,1),ih=new Vc,rh=new Eu,sh=new Yc,Ul=[],Nl=[],Fl=new Float32Array(16),Ol=new Float32Array(9),Bl=new Float32Array(4);function Gi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Ul[r];if(s===void 0&&(s=new Float32Array(r),Ul[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function gs(i,e){let t=Nl[e];t===void 0&&(t=new Int32Array(e),Nl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function om(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function lm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),Mt(t,e)}}function cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),Mt(t,e)}}function hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),Mt(t,e)}}function um(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;Bl.set(n),i.uniformMatrix2fv(this.addr,!1,Bl),Mt(t,n)}}function fm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;Ol.set(n),i.uniformMatrix3fv(this.addr,!1,Ol),Mt(t,n)}}function dm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;Fl.set(n),i.uniformMatrix4fv(this.addr,!1,Fl),Mt(t,n)}}function pm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),Mt(t,e)}}function gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),Mt(t,e)}}function _m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),Mt(t,e)}}function vm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),Mt(t,e)}}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),Mt(t,e)}}function Sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),Mt(t,e)}}function ym(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(no.compareFunction=t.isReversedDepthBuffer()?bo:yo,s=no):s=nh,t.setTexture2D(e||s,r)}function bm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||rh,r)}function Em(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||sh,r)}function Tm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ih,r)}function Am(i){switch(i){case 5126:return om;case 35664:return lm;case 35665:return cm;case 35666:return hm;case 35674:return um;case 35675:return fm;case 35676:return dm;case 5124:case 35670:return pm;case 35667:case 35671:return mm;case 35668:case 35672:return gm;case 35669:case 35673:return _m;case 5125:return vm;case 36294:return xm;case 36295:return Mm;case 36296:return Sm;case 35678:case 36198:case 36298:case 36306:case 35682:return ym;case 35679:case 36299:case 36307:return bm;case 35680:case 36300:case 36308:case 36293:return Em;case 36289:case 36303:case 36311:case 36292:return Tm}}function wm(i,e){i.uniform1fv(this.addr,e)}function Cm(i,e){const t=Gi(e,this.size,2);i.uniform2fv(this.addr,t)}function Rm(i,e){const t=Gi(e,this.size,3);i.uniform3fv(this.addr,t)}function Pm(i,e){const t=Gi(e,this.size,4);i.uniform4fv(this.addr,t)}function Lm(i,e){const t=Gi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Dm(i,e){const t=Gi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Im(i,e){const t=Gi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Um(i,e){i.uniform1iv(this.addr,e)}function Nm(i,e){i.uniform2iv(this.addr,e)}function Fm(i,e){i.uniform3iv(this.addr,e)}function Om(i,e){i.uniform4iv(this.addr,e)}function Bm(i,e){i.uniform1uiv(this.addr,e)}function zm(i,e){i.uniform2uiv(this.addr,e)}function km(i,e){i.uniform3uiv(this.addr,e)}function Vm(i,e){i.uniform4uiv(this.addr,e)}function Hm(i,e,t){const n=this.cache,r=e.length,s=gs(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=no:a=nh;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Gm(i,e,t){const n=this.cache,r=e.length,s=gs(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||rh,s[a])}function Wm(i,e,t){const n=this.cache,r=e.length,s=gs(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||sh,s[a])}function Xm(i,e,t){const n=this.cache,r=e.length,s=gs(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),Mt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||ih,s[a])}function qm(i){switch(i){case 5126:return wm;case 35664:return Cm;case 35665:return Rm;case 35666:return Pm;case 35674:return Lm;case 35675:return Dm;case 35676:return Im;case 5124:case 35670:return Um;case 35667:case 35671:return Nm;case 35668:case 35672:return Fm;case 35669:case 35673:return Om;case 5125:return Bm;case 36294:return zm;case 36295:return km;case 36296:return Vm;case 35678:case 36198:case 36298:case 36306:case 35682:return Hm;case 35679:case 36299:case 36307:return Gm;case 35680:case 36300:case 36308:case 36293:return Wm;case 36289:case 36303:case 36311:case 36292:return Xm}}class Ym{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Am(t.type)}}class $m{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=qm(t.type)}}class Km{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const ea=/(\w+)(\])?(\[|\.)?/g;function zl(i,e){i.seq.push(e),i.map[e.id]=e}function Zm(i,e,t){const n=i.name,r=n.length;for(ea.lastIndex=0;;){const s=ea.exec(n),a=ea.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){zl(t,c===void 0?new Ym(o,i,e):new $m(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Km(o),zl(t,f)),t=f}}}class ts{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Zm(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function kl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Jm=37297;let Qm=0;function jm(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Vl=new Ie;function eg(i){Ve._getMatrix(Vl,Ve.workingColorSpace,i);const e=`mat3( ${Vl.elements.map(t=>t.toFixed(4))} )`;switch(Ve.getTransfer(i)){case ss:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Hl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+jm(i.getShaderSource(e),o)}else return s}function tg(i,e){const t=eg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const ng={[Tc]:"Linear",[Ac]:"Reinhard",[wc]:"Cineon",[Cc]:"ACESFilmic",[Pc]:"AgX",[Lc]:"Neutral",[Rc]:"Custom"};function ig(i,e){const t=ng[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Gr=new F;function rg(){Ve.getLuminanceCoefficients(Gr);const i=Gr.x.toFixed(4),e=Gr.y.toFixed(4),t=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nr).join(`
`)}function ag(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function og(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function nr(i){return i!==""}function Gl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lg=/^[ \t]*#include +<([\w\d./]+)>/gm;function io(i){return i.replace(lg,hg)}const cg=new Map;function hg(i,e){let t=Oe[e];if(t===void 0){const n=cg.get(e);if(n!==void 0)t=Oe[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return io(t)}const ug=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(i){return i.replace(ug,fg)}function fg(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ql(i){let e=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const dg={[Zr]:"SHADOWMAP_TYPE_PCF",[er]:"SHADOWMAP_TYPE_VSM"};function pg(i){return dg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const mg={[fi]:"ENVMAP_TYPE_CUBE",[Bi]:"ENVMAP_TYPE_CUBE",[us]:"ENVMAP_TYPE_CUBE_UV"};function gg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":mg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const _g={[Bi]:"ENVMAP_MODE_REFRACTION"};function vg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":_g[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const xg={[mo]:"ENVMAP_BLENDING_MULTIPLY",[iu]:"ENVMAP_BLENDING_MIX",[ru]:"ENVMAP_BLENDING_ADD"};function Mg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":xg[i.combine]||"ENVMAP_BLENDING_NONE"}function Sg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function yg(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=pg(t),c=gg(t),h=vg(t),f=Mg(t),u=Sg(t),d=sg(t),g=ag(s),x=r.createProgram();let m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(nr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(nr).join(`
`),p.length>0&&(p+=`
`)):(m=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nr).join(`
`),p=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gn?"#define TONE_MAPPING":"",t.toneMapping!==gn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==gn?ig("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,tg("linearToOutputTexel",t.outputColorSpace),rg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(nr).join(`
`)),a=io(a),a=Gl(a,t),a=Wl(a,t),o=io(o),o=Gl(o,t),o=Wl(o,t),a=Xl(a),o=Xl(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Zo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=E+m+a,M=E+p+o,T=kl(r,r.VERTEX_SHADER,w),y=kl(r,r.FRAGMENT_SHADER,M);r.attachShader(x,T),r.attachShader(x,y),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function C(R){if(i.debug.checkShaderErrors){const U=r.getProgramInfoLog(x)||"",W=r.getShaderInfoLog(T)||"",X=r.getShaderInfoLog(y)||"",O=U.trim(),G=W.trim(),B=X.trim();let K=!0,Q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,T,y);else{const re=Hl(r,T,"vertex"),ie=Hl(r,y,"fragment");We("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+O+`
`+re+`
`+ie)}else O!==""?Pe("WebGLProgram: Program Info Log:",O):(G===""||B==="")&&(Q=!1);Q&&(R.diagnostics={runnable:K,programLog:O,vertexShader:{log:G,prefix:m},fragmentShader:{log:B,prefix:p}})}r.deleteShader(T),r.deleteShader(y),v=new ts(r,x),b=og(r,x)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(x,Jm)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Qm++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=y,this}let bg=0;class Eg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Tg(e),t.set(e,n)),n}}class Tg{constructor(e){this.id=bg++,this.code=e,this.usedTimes=0}}function Ag(i){return i===di||i===ns||i===is}function wg(i,e,t,n,r,s){const a=new To,o=new Eg,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,b,P,R,U,W){const X=R.fog,O=U.geometry,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,K=e.get(v.envMap||G,B),Q=K&&K.mapping===us?K.image.height:null,re=d[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Pe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const ie=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,de=ie!==void 0?ie.length:0;let De=0;O.morphAttributes.position!==void 0&&(De=1),O.morphAttributes.normal!==void 0&&(De=2),O.morphAttributes.color!==void 0&&(De=3);let ke,Te,$,te;if(re){const ve=fn[re];ke=ve.vertexShader,Te=ve.fragmentShader}else{ke=v.vertexShader,Te=v.fragmentShader;const ve=o.getVertexShaderStage(v),ct=o.getFragmentShaderStage(v);o.update(v,ve,ct),$=ve.id,te=ct.id}const ee=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),Le=U.isInstancedMesh===!0,be=U.isBatchedMesh===!0,Qe=!!v.map,Ue=!!v.matcap,Ye=!!K,$e=!!v.aoMap,Xe=!!v.lightMap,pt=!!v.bumpMap&&v.wireframe===!1,_t=!!v.normalMap,St=!!v.displacementMap,Et=!!v.emissiveMap,lt=!!v.metalnessMap,mt=!!v.roughnessMap,D=v.anisotropy>0,Nt=v.clearcoat>0,Ke=v.dispersion>0,A=v.iridescence>0,_=v.sheen>0,N=v.transmission>0,V=D&&!!v.anisotropyMap,q=Nt&&!!v.clearcoatMap,ne=Nt&&!!v.clearcoatNormalMap,ae=Nt&&!!v.clearcoatRoughnessMap,Y=A&&!!v.iridescenceMap,J=A&&!!v.iridescenceThicknessMap,oe=_&&!!v.sheenColorMap,Se=_&&!!v.sheenRoughnessMap,he=!!v.specularMap,le=!!v.specularColorMap,Ae=!!v.specularIntensityMap,Re=N&&!!v.transmissionMap,Ne=N&&!!v.thicknessMap,L=!!v.gradientMap,se=!!v.alphaMap,Z=v.alphaTest>0,ce=!!v.alphaHash,me=!!v.extensions;let j=gn;v.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(j=i.toneMapping);const Me={shaderID:re,shaderType:v.type,shaderName:v.name,vertexShader:ke,fragmentShader:Te,defines:v.defines,customVertexShaderID:$,customFragmentShaderID:te,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:be,batchingColor:be&&U._colorsTexture!==null,instancing:Le,instancingColor:Le&&U.instanceColor!==null,instancingMorph:Le&&U.morphTexture!==null,outputColorSpace:ee===null?i.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ve.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Qe,matcap:Ue,envMap:Ye,envMapMode:Ye&&K.mapping,envMapCubeUVHeight:Q,aoMap:$e,lightMap:Xe,bumpMap:pt,normalMap:_t,displacementMap:St,emissiveMap:Et,normalMapObjectSpace:_t&&v.normalMapType===ou,normalMapTangentSpace:_t&&v.normalMapType===Qa,packedNormalMap:_t&&v.normalMapType===Qa&&Ag(v.normalMap.format),metalnessMap:lt,roughnessMap:mt,anisotropy:D,anisotropyMap:V,clearcoat:Nt,clearcoatMap:q,clearcoatNormalMap:ne,clearcoatRoughnessMap:ae,dispersion:Ke,iridescence:A,iridescenceMap:Y,iridescenceThicknessMap:J,sheen:_,sheenColorMap:oe,sheenRoughnessMap:Se,specularMap:he,specularColorMap:le,specularIntensityMap:Ae,transmission:N,transmissionMap:Re,thicknessMap:Ne,gradientMap:L,opaque:v.transparent===!1&&v.blending===Ui&&v.alphaToCoverage===!1,alphaMap:se,alphaTest:Z,alphaHash:ce,combine:v.combine,mapUv:Qe&&g(v.map.channel),aoMapUv:$e&&g(v.aoMap.channel),lightMapUv:Xe&&g(v.lightMap.channel),bumpMapUv:pt&&g(v.bumpMap.channel),normalMapUv:_t&&g(v.normalMap.channel),displacementMapUv:St&&g(v.displacementMap.channel),emissiveMapUv:Et&&g(v.emissiveMap.channel),metalnessMapUv:lt&&g(v.metalnessMap.channel),roughnessMapUv:mt&&g(v.roughnessMap.channel),anisotropyMapUv:V&&g(v.anisotropyMap.channel),clearcoatMapUv:q&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ne&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Se&&g(v.sheenRoughnessMap.channel),specularMapUv:he&&g(v.specularMap.channel),specularColorMapUv:le&&g(v.specularColorMap.channel),specularIntensityMapUv:Ae&&g(v.specularIntensityMap.channel),transmissionMapUv:Re&&g(v.transmissionMap.channel),thicknessMapUv:Ne&&g(v.thicknessMap.channel),alphaMapUv:se&&g(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(_t||D),vertexNormals:!!O.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!O.attributes.uv&&(Qe||se),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||O.attributes.normal===void 0&&_t===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Ce,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:De,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:j,decodeVideoTexture:Qe&&v.map.isVideoTexture===!0&&Ve.getTransfer(v.map.colorSpace)===Ze,decodeVideoTextureEmissive:Et&&v.emissiveMap.isVideoTexture===!0&&Ve.getTransfer(v.emissiveMap.colorSpace)===Ze,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===nn,flipSided:v.side===Ot,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:me&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&v.extensions.multiDraw===!0||be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function m(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)b.push(P),b.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(p(b,v),E(b,v),b.push(i.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function p(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function E(v,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function w(v){const b=d[v.type];let P;if(b){const R=fn[b];P=Wu.clone(R.uniforms)}else P=v.uniforms;return P}function M(v,b){let P=h.get(b);return P!==void 0?++P.usedTimes:(P=new yg(i,b,v,r),c.push(P),h.set(b,P)),P}function T(v){if(--v.usedTimes===0){const b=c.indexOf(v);c[b]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function y(v){o.remove(v)}function C(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:w,acquireProgram:M,releaseProgram:T,releaseShaderCache:y,programs:c,dispose:C}}function Cg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Rg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Yl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function $l(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,g,x,m,p){let E=i[e];return E===void 0?(E={id:u.id,object:u,geometry:d,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},i[e]=E):(E.id=u.id,E.object=u,E.geometry=d,E.material=g,E.materialVariant=a(u),E.groupOrder=x,E.renderOrder=u.renderOrder,E.z=m,E.group=p),e++,E}function l(u,d,g,x,m,p){const E=o(u,d,g,x,m,p);g.transmission>0?n.push(E):g.transparent===!0?r.push(E):t.push(E)}function c(u,d,g,x,m,p){const E=o(u,d,g,x,m,p);g.transmission>0?n.unshift(E):g.transparent===!0?r.unshift(E):t.unshift(E)}function h(u,d,g){t.length>1&&t.sort(u||Rg),n.length>1&&n.sort(d||Yl),r.length>1&&r.sort(d||Yl),g&&(t.reverse(),n.reverse(),r.reverse())}function f(){for(let u=e,d=i.length;u<d;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:f,sort:h}}function Pg(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new $l,i.set(n,[a])):r>=s.length?(a=new $l,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Lg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new ze};break;case"SpotLight":t={position:new F,direction:new F,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function Dg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Ig=0;function Ug(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Ng(i){const e=new Lg,t=Dg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);const r=new F,s=new rt,a=new rt;function o(c){let h=0,f=0,u=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,E=0,w=0,M=0,T=0,y=0,C=0;c.sort(Ug);for(let b=0,P=c.length;b<P;b++){const R=c[b],U=R.color,W=R.intensity,X=R.distance;let O=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===di?O=R.shadow.map.texture:O=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=U.r*W,f+=U.g*W,u+=U.b*W;else if(R.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(R.sh.coefficients[G],W);C++}else if(R.isDirectionalLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const B=R.shadow,K=t.get(R);K.shadowIntensity=B.intensity,K.shadowBias=B.bias,K.shadowNormalBias=B.normalBias,K.shadowRadius=B.radius,K.shadowMapSize=B.mapSize,n.directionalShadow[d]=K,n.directionalShadowMap[d]=O,n.directionalShadowMatrix[d]=R.shadow.matrix,E++}n.directional[d]=G,d++}else if(R.isSpotLight){const G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(U).multiplyScalar(W),G.distance=X,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,n.spot[x]=G;const B=R.shadow;if(R.map&&(n.spotLightMap[T]=R.map,T++,B.updateMatrices(R),R.castShadow&&y++),n.spotLightMatrix[x]=B.matrix,R.castShadow){const K=t.get(R);K.shadowIntensity=B.intensity,K.shadowBias=B.bias,K.shadowNormalBias=B.normalBias,K.shadowRadius=B.radius,K.shadowMapSize=B.mapSize,n.spotShadow[x]=K,n.spotShadowMap[x]=O,M++}x++}else if(R.isRectAreaLight){const G=e.get(R);G.color.copy(U).multiplyScalar(W),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=G,m++}else if(R.isPointLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){const B=R.shadow,K=t.get(R);K.shadowIntensity=B.intensity,K.shadowBias=B.bias,K.shadowNormalBias=B.normalBias,K.shadowRadius=B.radius,K.shadowMapSize=B.mapSize,K.shadowCameraNear=B.camera.near,K.shadowCameraFar=B.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=O,n.pointShadowMatrix[g]=R.shadow.matrix,w++}n.point[g]=G,g++}else if(R.isHemisphereLight){const G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(W),G.groundColor.copy(R.groundColor).multiplyScalar(W),n.hemi[p]=G,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const v=n.hash;(v.directionalLength!==d||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==E||v.numPointShadows!==w||v.numSpotShadows!==M||v.numSpotMaps!==T||v.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=M+T-y,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=C,v.directionalLength=d,v.pointLength=g,v.spotLength=x,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=E,v.numPointShadows=w,v.numSpotShadows=M,v.numSpotMaps=T,v.numLightProbes=C,n.version=Ig++)}function l(c,h){let f=0,u=0,d=0,g=0,x=0;const m=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const w=c[p];if(w.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),f++}else if(w.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),d++}else if(w.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),a.identity(),s.copy(w.matrixWorld),s.premultiply(m),a.extractRotation(s),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),u++}else if(w.isHemisphereLight){const M=n.hemi[x];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:n}}function Kl(i){const e=new Ng(i),t=[],n=[],r=[];function s(u){f.camera=u,t.length=0,n.length=0,r.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Fg(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Kl(i),e.set(r,[o])):s>=a.length?(o=new Kl(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Og=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bg=`uniform sampler2D shadow_pass;
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
}`,zg=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],kg=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Zl=new rt,Ji=new F,ta=new F;function Vg(i,e,t){let n=new wo;const r=new Ge,s=new Ge,a=new ot,o=new Ku,l=new Zu,c={},h=t.maxTextureSize,f={[Zn]:Ot,[Ot]:Zn,[nn]:nn},u=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:Og,fragmentShader:Bg}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const g=new Dt;g.setAttribute("position",new vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new an(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zr;let p=this.type;this.render=function(y,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;this.type===Bh&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Zr);const b=i.getRenderTarget(),P=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Dn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const W=p!==this.type;W&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=y.length;X<O;X++){const G=y[X],B=G.shadow;if(B===void 0){Pe("WebGLShadowMap:",G,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const K=B.getFrameExtents();r.multiply(K),s.copy(B.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/K.x),r.x=s.x*K.x,B.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/K.y),r.y=s.y*K.y,B.mapSize.y=s.y));const Q=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=Q,B.map===null||W===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===er){if(G.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new _n(r.x,r.y,{format:di,type:Un,minFilter:Lt,magFilter:Lt,generateMipmaps:!1}),B.map.texture.name=G.name+".shadowMap",B.map.depthTexture=new zi(r.x,r.y,pn),B.map.depthTexture.name=G.name+".shadowMapDepth",B.map.depthTexture.format=Nn,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=At,B.map.depthTexture.magFilter=At}else G.isPointLight?(B.map=new th(r.x),B.map.depthTexture=new Hu(r.x,Mn)):(B.map=new _n(r.x,r.y),B.map.depthTexture=new zi(r.x,r.y,Mn)),B.map.depthTexture.name=G.name+".shadowMap",B.map.depthTexture.format=Nn,this.type===Zr?(B.map.depthTexture.compareFunction=Q?bo:yo,B.map.depthTexture.minFilter=Lt,B.map.depthTexture.magFilter=Lt):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=At,B.map.depthTexture.magFilter=At);B.camera.updateProjectionMatrix()}const re=B.map.isWebGLCubeRenderTarget?6:1;for(let ie=0;ie<re;ie++){if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,ie),i.clear();else{ie===0&&(i.setRenderTarget(B.map),i.clear());const de=B.getViewport(ie);a.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),U.viewport(a)}if(G.isPointLight){const de=B.camera,De=B.matrix,ke=G.distance||de.far;ke!==de.far&&(de.far=ke,de.updateProjectionMatrix()),Ji.setFromMatrixPosition(G.matrixWorld),de.position.copy(Ji),ta.copy(de.position),ta.add(zg[ie]),de.up.copy(kg[ie]),de.lookAt(ta),de.updateMatrixWorld(),De.makeTranslation(-Ji.x,-Ji.y,-Ji.z),Zl.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Zl,de.coordinateSystem,de.reversedDepth)}else B.updateMatrices(G);n=B.getFrustum(),M(C,v,B.camera,G,this.type)}B.isPointLightShadow!==!0&&this.type===er&&E(B,v),B.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,P,R)};function E(y,C){const v=e.update(x);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,d.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new _n(r.x,r.y,{format:di,type:Un})),u.uniforms.shadow_pass.value=y.map.depthTexture,u.uniforms.resolution.value=y.mapSize,u.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(C,null,v,u,x,null),d.uniforms.shadow_pass.value=y.mapPass.texture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(C,null,v,d,x,null)}function w(y,C,v,b){let P=null;const R=v.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(R!==void 0)P=R;else if(P=v.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const U=P.uuid,W=C.uuid;let X=c[U];X===void 0&&(X={},c[U]=X);let O=X[W];O===void 0&&(O=P.clone(),X[W]=O,C.addEventListener("dispose",T)),P=O}if(P.visible=C.visible,P.wireframe=C.wireframe,b===er?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:f[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const U=i.properties.get(P);U.light=v}return P}function M(y,C,v,b,P){if(y.visible===!1)return;if(y.layers.test(C.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&P===er)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,y.matrixWorld);const W=e.update(y),X=y.material;if(Array.isArray(X)){const O=W.groups;for(let G=0,B=O.length;G<B;G++){const K=O[G],Q=X[K.materialIndex];if(Q&&Q.visible){const re=w(y,Q,b,P);y.onBeforeShadow(i,y,C,v,W,re,K),i.renderBufferDirect(v,null,W,re,y,K),y.onAfterShadow(i,y,C,v,W,re,K)}}}else if(X.visible){const O=w(y,X,b,P);y.onBeforeShadow(i,y,C,v,W,O,null),i.renderBufferDirect(v,null,W,O,y,null),y.onAfterShadow(i,y,C,v,W,O,null)}}const U=y.children;for(let W=0,X=U.length;W<X;W++)M(U[W],C,v,b,P)}function T(y){y.target.removeEventListener("dispose",T);for(const v in c){const b=c[v],P=y.target.uuid;P in b&&(b[P].dispose(),delete b[P])}}}function Hg(i,e){function t(){let L=!1;const se=new ot;let Z=null;const ce=new ot(0,0,0,0);return{setMask:function(me){Z!==me&&!L&&(i.colorMask(me,me,me,me),Z=me)},setLocked:function(me){L=me},setClear:function(me,j,Me,ve,ct){ct===!0&&(me*=ve,j*=ve,Me*=ve),se.set(me,j,Me,ve),ce.equals(se)===!1&&(i.clearColor(me,j,Me,ve),ce.copy(se))},reset:function(){L=!1,Z=null,ce.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,Z=null,ce=null,me=null;return{setReversed:function(j){if(se!==j){const Me=e.get("EXT_clip_control");j?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),se=j;const ve=me;me=null,this.setClear(ve)}},getReversed:function(){return se},setTest:function(j){j?ee(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(j){Z!==j&&!L&&(i.depthMask(j),Z=j)},setFunc:function(j){if(se&&(j=_u[j]),ce!==j){switch(j){case da:i.depthFunc(i.NEVER);break;case pa:i.depthFunc(i.ALWAYS);break;case ma:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case ga:i.depthFunc(i.EQUAL);break;case _a:i.depthFunc(i.GEQUAL);break;case va:i.depthFunc(i.GREATER);break;case xa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ce=j}},setLocked:function(j){L=j},setClear:function(j){me!==j&&(me=j,se&&(j=1-j),i.clearDepth(j))},reset:function(){L=!1,Z=null,ce=null,me=null,se=!1}}}function r(){let L=!1,se=null,Z=null,ce=null,me=null,j=null,Me=null,ve=null,ct=null;return{setTest:function(tt){L||(tt?ee(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(tt){se!==tt&&!L&&(i.stencilMask(tt),se=tt)},setFunc:function(tt,on,ln){(Z!==tt||ce!==on||me!==ln)&&(i.stencilFunc(tt,on,ln),Z=tt,ce=on,me=ln)},setOp:function(tt,on,ln){(j!==tt||Me!==on||ve!==ln)&&(i.stencilOp(tt,on,ln),j=tt,Me=on,ve=ln)},setLocked:function(tt){L=tt},setClear:function(tt){ct!==tt&&(i.clearStencil(tt),ct=tt)},reset:function(){L=!1,se=null,Z=null,ce=null,me=null,j=null,Me=null,ve=null,ct=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let h={},f={},u={},d=new WeakMap,g=[],x=null,m=!1,p=null,E=null,w=null,M=null,T=null,y=null,C=null,v=new ze(0,0,0),b=0,P=!1,R=null,U=null,W=null,X=null,O=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,K=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Q)[1]),B=K>=1):Q.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),B=K>=2);let re=null,ie={};const de=i.getParameter(i.SCISSOR_BOX),De=i.getParameter(i.VIEWPORT),ke=new ot().fromArray(de),Te=new ot().fromArray(De);function $(L,se,Z,ce){const me=new Uint8Array(4),j=i.createTexture();i.bindTexture(L,j),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Me=0;Me<Z;Me++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,ce,0,i.RGBA,i.UNSIGNED_BYTE,me):i.texImage2D(se+Me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,me);return j}const te={};te[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),te[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),te[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(i.DEPTH_TEST),a.setFunc(Oi),pt(!1),_t(Wo),ee(i.CULL_FACE),$e(Dn);function ee(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function Ce(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Le(L,se){return u[L]!==se?(i.bindFramebuffer(L,se),u[L]=se,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function be(L,se){let Z=g,ce=!1;if(L){Z=d.get(se),Z===void 0&&(Z=[],d.set(se,Z));const me=L.textures;if(Z.length!==me.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Me=me.length;j<Me;j++)Z[j]=i.COLOR_ATTACHMENT0+j;Z.length=me.length,ce=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,ce=!0);ce&&i.drawBuffers(Z)}function Qe(L){return x!==L?(i.useProgram(L),x=L,!0):!1}const Ue={[li]:i.FUNC_ADD,[kh]:i.FUNC_SUBTRACT,[Vh]:i.FUNC_REVERSE_SUBTRACT};Ue[Hh]=i.MIN,Ue[Gh]=i.MAX;const Ye={[Wh]:i.ZERO,[Xh]:i.ONE,[qh]:i.SRC_COLOR,[ua]:i.SRC_ALPHA,[Qh]:i.SRC_ALPHA_SATURATE,[Zh]:i.DST_COLOR,[$h]:i.DST_ALPHA,[Yh]:i.ONE_MINUS_SRC_COLOR,[fa]:i.ONE_MINUS_SRC_ALPHA,[Jh]:i.ONE_MINUS_DST_COLOR,[Kh]:i.ONE_MINUS_DST_ALPHA,[jh]:i.CONSTANT_COLOR,[eu]:i.ONE_MINUS_CONSTANT_COLOR,[tu]:i.CONSTANT_ALPHA,[nu]:i.ONE_MINUS_CONSTANT_ALPHA};function $e(L,se,Z,ce,me,j,Me,ve,ct,tt){if(L===Dn){m===!0&&(Ce(i.BLEND),m=!1);return}if(m===!1&&(ee(i.BLEND),m=!0),L!==zh){if(L!==p||tt!==P){if((E!==li||T!==li)&&(i.blendEquation(i.FUNC_ADD),E=li,T=li),tt)switch(L){case Ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xo:i.blendFunc(i.ONE,i.ONE);break;case qo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:We("WebGLState: Invalid blending: ",L);break}else switch(L){case Ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case qo:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yo:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",L);break}w=null,M=null,y=null,C=null,v.set(0,0,0),b=0,p=L,P=tt}return}me=me||se,j=j||Z,Me=Me||ce,(se!==E||me!==T)&&(i.blendEquationSeparate(Ue[se],Ue[me]),E=se,T=me),(Z!==w||ce!==M||j!==y||Me!==C)&&(i.blendFuncSeparate(Ye[Z],Ye[ce],Ye[j],Ye[Me]),w=Z,M=ce,y=j,C=Me),(ve.equals(v)===!1||ct!==b)&&(i.blendColor(ve.r,ve.g,ve.b,ct),v.copy(ve),b=ct),p=L,P=!1}function Xe(L,se){L.side===nn?Ce(i.CULL_FACE):ee(i.CULL_FACE);let Z=L.side===Ot;se&&(Z=!Z),pt(Z),L.blending===Ui&&L.transparent===!1?$e(Dn):$e(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const ce=L.stencilWrite;o.setTest(ce),ce&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Et(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ee(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function pt(L){R!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),R=L)}function _t(L){L!==Fh?(ee(i.CULL_FACE),L!==U&&(L===Wo?i.cullFace(i.BACK):L===Oh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),U=L}function St(L){L!==W&&(B&&i.lineWidth(L),W=L)}function Et(L,se,Z){L?(ee(i.POLYGON_OFFSET_FILL),(X!==se||O!==Z)&&(X=se,O=Z,a.getReversed()&&(se=-se),i.polygonOffset(se,Z))):Ce(i.POLYGON_OFFSET_FILL)}function lt(L){L?ee(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function mt(L){L===void 0&&(L=i.TEXTURE0+G-1),re!==L&&(i.activeTexture(L),re=L)}function D(L,se,Z){Z===void 0&&(re===null?Z=i.TEXTURE0+G-1:Z=re);let ce=ie[Z];ce===void 0&&(ce={type:void 0,texture:void 0},ie[Z]=ce),(ce.type!==L||ce.texture!==se)&&(re!==Z&&(i.activeTexture(Z),re=Z),i.bindTexture(L,se||te[L]),ce.type=L,ce.texture=se)}function Nt(){const L=ie[re];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Ke(){try{i.compressedTexImage2D(...arguments)}catch(L){We("WebGLState:",L)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(L){We("WebGLState:",L)}}function _(){try{i.texSubImage2D(...arguments)}catch(L){We("WebGLState:",L)}}function N(){try{i.texSubImage3D(...arguments)}catch(L){We("WebGLState:",L)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(L){We("WebGLState:",L)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(L){We("WebGLState:",L)}}function ne(){try{i.texStorage2D(...arguments)}catch(L){We("WebGLState:",L)}}function ae(){try{i.texStorage3D(...arguments)}catch(L){We("WebGLState:",L)}}function Y(){try{i.texImage2D(...arguments)}catch(L){We("WebGLState:",L)}}function J(){try{i.texImage3D(...arguments)}catch(L){We("WebGLState:",L)}}function oe(L){return f[L]!==void 0?f[L]:i.getParameter(L)}function Se(L,se){f[L]!==se&&(i.pixelStorei(L,se),f[L]=se)}function he(L){ke.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),ke.copy(L))}function le(L){Te.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Te.copy(L))}function Ae(L,se){let Z=c.get(se);Z===void 0&&(Z=new WeakMap,c.set(se,Z));let ce=Z.get(L);ce===void 0&&(ce=i.getUniformBlockIndex(se,L.name),Z.set(L,ce))}function Re(L,se){const ce=c.get(se).get(L);l.get(se)!==ce&&(i.uniformBlockBinding(se,ce,L.__bindingPointIndex),l.set(se,ce))}function Ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},re=null,ie={},u={},d=new WeakMap,g=[],x=null,m=!1,p=null,E=null,w=null,M=null,T=null,y=null,C=null,v=new ze(0,0,0),b=0,P=!1,R=null,U=null,W=null,X=null,O=null,ke.set(0,0,i.canvas.width,i.canvas.height),Te.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ee,disable:Ce,bindFramebuffer:Le,drawBuffers:be,useProgram:Qe,setBlending:$e,setMaterial:Xe,setFlipSided:pt,setCullFace:_t,setLineWidth:St,setPolygonOffset:Et,setScissorTest:lt,activeTexture:mt,bindTexture:D,unbindTexture:Nt,compressedTexImage2D:Ke,compressedTexImage3D:A,texImage2D:Y,texImage3D:J,pixelStorei:Se,getParameter:oe,updateUBOMapping:Ae,uniformBlockBinding:Re,texStorage2D:ne,texStorage3D:ae,texSubImage2D:_,texSubImage3D:N,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:he,viewport:le,reset:Ne}}function Gg(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ge,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,_){return g?new OffscreenCanvas(A,_):as("canvas")}function m(A,_,N){let V=1;const q=Ke(A);if((q.width>N||q.height>N)&&(V=N/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ne=Math.floor(V*q.width),ae=Math.floor(V*q.height);u===void 0&&(u=x(ne,ae));const Y=_?x(ne,ae):u;return Y.width=ne,Y.height=ae,Y.getContext("2d").drawImage(A,0,0,ne,ae),Pe("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ne+"x"+ae+")."),Y}else return"data"in A&&Pe("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),A;return A}function p(A){return A.generateMipmaps}function E(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(A,_,N,V,q,ne=!1){if(A!==null){if(i[A]!==void 0)return i[A];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ae;V&&(ae=e.get("EXT_texture_norm16"),ae||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=_;if(_===i.RED&&(N===i.FLOAT&&(Y=i.R32F),N===i.HALF_FLOAT&&(Y=i.R16F),N===i.UNSIGNED_BYTE&&(Y=i.R8),N===i.UNSIGNED_SHORT&&ae&&(Y=ae.R16_EXT),N===i.SHORT&&ae&&(Y=ae.R16_SNORM_EXT)),_===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.R8UI),N===i.UNSIGNED_SHORT&&(Y=i.R16UI),N===i.UNSIGNED_INT&&(Y=i.R32UI),N===i.BYTE&&(Y=i.R8I),N===i.SHORT&&(Y=i.R16I),N===i.INT&&(Y=i.R32I)),_===i.RG&&(N===i.FLOAT&&(Y=i.RG32F),N===i.HALF_FLOAT&&(Y=i.RG16F),N===i.UNSIGNED_BYTE&&(Y=i.RG8),N===i.UNSIGNED_SHORT&&ae&&(Y=ae.RG16_EXT),N===i.SHORT&&ae&&(Y=ae.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.RG8UI),N===i.UNSIGNED_SHORT&&(Y=i.RG16UI),N===i.UNSIGNED_INT&&(Y=i.RG32UI),N===i.BYTE&&(Y=i.RG8I),N===i.SHORT&&(Y=i.RG16I),N===i.INT&&(Y=i.RG32I)),_===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),N===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),N===i.UNSIGNED_INT&&(Y=i.RGB32UI),N===i.BYTE&&(Y=i.RGB8I),N===i.SHORT&&(Y=i.RGB16I),N===i.INT&&(Y=i.RGB32I)),_===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),N===i.UNSIGNED_INT&&(Y=i.RGBA32UI),N===i.BYTE&&(Y=i.RGBA8I),N===i.SHORT&&(Y=i.RGBA16I),N===i.INT&&(Y=i.RGBA32I)),_===i.RGB&&(N===i.UNSIGNED_SHORT&&ae&&(Y=ae.RGB16_EXT),N===i.SHORT&&ae&&(Y=ae.RGB16_SNORM_EXT),N===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),_===i.RGBA){const J=ne?ss:Ve.getTransfer(q);N===i.FLOAT&&(Y=i.RGBA32F),N===i.HALF_FLOAT&&(Y=i.RGBA16F),N===i.UNSIGNED_BYTE&&(Y=J===Ze?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT&&ae&&(Y=ae.RGBA16_EXT),N===i.SHORT&&ae&&(Y=ae.RGBA16_SNORM_EXT),N===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function T(A,_){let N;return A?_===null||_===Mn||_===or?N=i.DEPTH24_STENCIL8:_===pn?N=i.DEPTH32F_STENCIL8:_===ar&&(N=i.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Mn||_===or?N=i.DEPTH_COMPONENT24:_===pn?N=i.DEPTH_COMPONENT32F:_===ar&&(N=i.DEPTH_COMPONENT16),N}function y(A,_){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==At&&A.minFilter!==Lt?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function C(A){const _=A.target;_.removeEventListener("dispose",C),b(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&f.delete(_)}function v(A){const _=A.target;_.removeEventListener("dispose",v),R(_)}function b(A){const _=n.get(A);if(_.__webglInit===void 0)return;const N=A.source,V=d.get(N);if(V){const q=V[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&P(A),Object.keys(V).length===0&&d.delete(N)}n.remove(A)}function P(A){const _=n.get(A);i.deleteTexture(_.__webglTexture);const N=A.source,V=d.get(N);delete V[_.__cacheKey],a.memory.textures--}function R(A){const _=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let q=0;q<_.__webglFramebuffer[V].length;q++)i.deleteFramebuffer(_.__webglFramebuffer[V][q]);else i.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)i.deleteFramebuffer(_.__webglFramebuffer[V]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const N=A.textures;for(let V=0,q=N.length;V<q;V++){const ne=n.get(N[V]);ne.__webglTexture&&(i.deleteTexture(ne.__webglTexture),a.memory.textures--),n.remove(N[V])}n.remove(A)}let U=0;function W(){U=0}function X(){return U}function O(A){U=A}function G(){const A=U;return A>=r.maxTextures&&Pe("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),U+=1,A}function B(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function K(A,_){const N=n.get(A);if(A.isVideoTexture&&D(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&N.__version!==A.version){const V=A.image;if(V===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(N,A,_);return}}else A.isExternalTexture&&(N.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+_)}function Q(A,_){const N=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&N.__version!==A.version){Ce(N,A,_);return}else A.isExternalTexture&&(N.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+_)}function re(A,_){const N=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&N.__version!==A.version){Ce(N,A,_);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+_)}function ie(A,_){const N=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&N.__version!==A.version){Le(N,A,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+_)}const de={[Ma]:i.REPEAT,[Pn]:i.CLAMP_TO_EDGE,[Sa]:i.MIRRORED_REPEAT},De={[At]:i.NEAREST,[su]:i.NEAREST_MIPMAP_NEAREST,[vr]:i.NEAREST_MIPMAP_LINEAR,[Lt]:i.LINEAR,[bs]:i.LINEAR_MIPMAP_NEAREST,[hi]:i.LINEAR_MIPMAP_LINEAR},ke={[lu]:i.NEVER,[du]:i.ALWAYS,[cu]:i.LESS,[yo]:i.LEQUAL,[hu]:i.EQUAL,[bo]:i.GEQUAL,[uu]:i.GREATER,[fu]:i.NOTEQUAL};function Te(A,_){if(_.type===pn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Lt||_.magFilter===bs||_.magFilter===vr||_.magFilter===hi||_.minFilter===Lt||_.minFilter===bs||_.minFilter===vr||_.minFilter===hi)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,de[_.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,de[_.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,de[_.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,De[_.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,De[_.minFilter]),_.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ke[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===At||_.minFilter!==vr&&_.minFilter!==hi||_.type===pn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function $(A,_){let N=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",C));const V=_.source;let q=d.get(V);q===void 0&&(q={},d.set(V,q));const ne=B(_);if(ne!==A.__cacheKey){q[ne]===void 0&&(q[ne]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),q[ne].usedTimes++;const ae=q[A.__cacheKey];ae!==void 0&&(q[A.__cacheKey].usedTimes--,ae.usedTimes===0&&P(_)),A.__cacheKey=ne,A.__webglTexture=q[ne].texture}return N}function te(A,_,N){return Math.floor(Math.floor(A/N)/_)}function ee(A,_,N,V){const ne=A.updateRanges;if(ne.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,N,V,_.data);else{ne.sort((Se,he)=>Se.start-he.start);let ae=0;for(let Se=1;Se<ne.length;Se++){const he=ne[ae],le=ne[Se],Ae=he.start+he.count,Re=te(le.start,_.width,4),Ne=te(he.start,_.width,4);le.start<=Ae+1&&Re===Ne&&te(le.start+le.count-1,_.width,4)===Re?he.count=Math.max(he.count,le.start+le.count-he.start):(++ae,ne[ae]=le)}ne.length=ae+1;const Y=t.getParameter(i.UNPACK_ROW_LENGTH),J=t.getParameter(i.UNPACK_SKIP_PIXELS),oe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Se=0,he=ne.length;Se<he;Se++){const le=ne[Se],Ae=Math.floor(le.start/4),Re=Math.ceil(le.count/4),Ne=Ae%_.width,L=Math.floor(Ae/_.width),se=Re,Z=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,L),t.texSubImage2D(i.TEXTURE_2D,0,Ne,L,se,Z,N,V,_.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Y),t.pixelStorei(i.UNPACK_SKIP_PIXELS,J),t.pixelStorei(i.UNPACK_SKIP_ROWS,oe)}}function Ce(A,_,N){let V=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=i.TEXTURE_3D);const q=$(A,_),ne=_.source;t.bindTexture(V,A.__webglTexture,i.TEXTURE0+N);const ae=n.get(ne);if(ne.version!==ae.__version||q===!0){if(t.activeTexture(i.TEXTURE0+N),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const Z=Ve.getPrimaries(Ve.workingColorSpace),ce=_.colorSpace===$n?null:Ve.getPrimaries(_.colorSpace),me=_.colorSpace===$n||Z===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let J=m(_.image,!1,r.maxTextureSize);J=Nt(_,J);const oe=s.convert(_.format,_.colorSpace),Se=s.convert(_.type);let he=M(_.internalFormat,oe,Se,_.normalized,_.colorSpace,_.isVideoTexture);Te(V,_);let le;const Ae=_.mipmaps,Re=_.isVideoTexture!==!0,Ne=ae.__version===void 0||q===!0,L=ne.dataReady,se=y(_,J);if(_.isDepthTexture)he=T(_.format===ui,_.type),Ne&&(Re?t.texStorage2D(i.TEXTURE_2D,1,he,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,he,J.width,J.height,0,oe,Se,null));else if(_.isDataTexture)if(Ae.length>0){Re&&Ne&&t.texStorage2D(i.TEXTURE_2D,se,he,Ae[0].width,Ae[0].height);for(let Z=0,ce=Ae.length;Z<ce;Z++)le=Ae[Z],Re?L&&t.texSubImage2D(i.TEXTURE_2D,Z,0,0,le.width,le.height,oe,Se,le.data):t.texImage2D(i.TEXTURE_2D,Z,he,le.width,le.height,0,oe,Se,le.data);_.generateMipmaps=!1}else Re?(Ne&&t.texStorage2D(i.TEXTURE_2D,se,he,J.width,J.height),L&&ee(_,J,oe,Se)):t.texImage2D(i.TEXTURE_2D,0,he,J.width,J.height,0,oe,Se,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Re&&Ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,he,Ae[0].width,Ae[0].height,J.depth);for(let Z=0,ce=Ae.length;Z<ce;Z++)if(le=Ae[Z],_.format!==sn)if(oe!==null)if(Re){if(L)if(_.layerUpdates.size>0){const me=wl(le.width,le.height,_.format,_.type);for(const j of _.layerUpdates){const Me=le.data.subarray(j*me/le.data.BYTES_PER_ELEMENT,(j+1)*me/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,j,le.width,le.height,1,oe,Me)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,le.width,le.height,J.depth,oe,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,he,le.width,le.height,J.depth,0,le.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,le.width,le.height,J.depth,oe,Se,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Z,he,le.width,le.height,J.depth,0,oe,Se,le.data)}else{Re&&Ne&&t.texStorage2D(i.TEXTURE_2D,se,he,Ae[0].width,Ae[0].height);for(let Z=0,ce=Ae.length;Z<ce;Z++)le=Ae[Z],_.format!==sn?oe!==null?Re?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,le.width,le.height,oe,le.data):t.compressedTexImage2D(i.TEXTURE_2D,Z,he,le.width,le.height,0,le.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?L&&t.texSubImage2D(i.TEXTURE_2D,Z,0,0,le.width,le.height,oe,Se,le.data):t.texImage2D(i.TEXTURE_2D,Z,he,le.width,le.height,0,oe,Se,le.data)}else if(_.isDataArrayTexture)if(Re){if(Ne&&t.texStorage3D(i.TEXTURE_2D_ARRAY,se,he,J.width,J.height,J.depth),L)if(_.layerUpdates.size>0){const Z=wl(J.width,J.height,_.format,_.type);for(const ce of _.layerUpdates){const me=J.data.subarray(ce*Z/J.data.BYTES_PER_ELEMENT,(ce+1)*Z/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ce,J.width,J.height,1,oe,Se,me)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,oe,Se,J.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,he,J.width,J.height,J.depth,0,oe,Se,J.data);else if(_.isData3DTexture)Re?(Ne&&t.texStorage3D(i.TEXTURE_3D,se,he,J.width,J.height,J.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,oe,Se,J.data)):t.texImage3D(i.TEXTURE_3D,0,he,J.width,J.height,J.depth,0,oe,Se,J.data);else if(_.isFramebufferTexture){if(Ne)if(Re)t.texStorage2D(i.TEXTURE_2D,se,he,J.width,J.height);else{let Z=J.width,ce=J.height;for(let me=0;me<se;me++)t.texImage2D(i.TEXTURE_2D,me,he,Z,ce,0,oe,Se,null),Z>>=1,ce>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const Z=i.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),J.parentNode!==Z){Z.appendChild(J),f.add(_),Z.onpaint=ce=>{const me=ce.changedElements;for(const j of f)me.includes(j.image)&&(j.needsUpdate=!0)},Z.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{const me=i.RGBA,j=i.RGBA,Me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,me,j,Me,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(Re&&Ne){const Z=Ke(Ae[0]);t.texStorage2D(i.TEXTURE_2D,se,he,Z.width,Z.height)}for(let Z=0,ce=Ae.length;Z<ce;Z++)le=Ae[Z],Re?L&&t.texSubImage2D(i.TEXTURE_2D,Z,0,0,oe,Se,le):t.texImage2D(i.TEXTURE_2D,Z,he,oe,Se,le);_.generateMipmaps=!1}else if(Re){if(Ne){const Z=Ke(J);t.texStorage2D(i.TEXTURE_2D,se,he,Z.width,Z.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,oe,Se,J)}else t.texImage2D(i.TEXTURE_2D,0,he,oe,Se,J);p(_)&&E(V),ae.__version=ne.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Le(A,_,N){if(_.image.length!==6)return;const V=$(A,_),q=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+N);const ne=n.get(q);if(q.version!==ne.__version||V===!0){t.activeTexture(i.TEXTURE0+N);const ae=Ve.getPrimaries(Ve.workingColorSpace),Y=_.colorSpace===$n?null:Ve.getPrimaries(_.colorSpace),J=_.colorSpace===$n||ae===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const oe=_.isCompressedTexture||_.image[0].isCompressedTexture,Se=_.image[0]&&_.image[0].isDataTexture,he=[];for(let j=0;j<6;j++)!oe&&!Se?he[j]=m(_.image[j],!0,r.maxCubemapSize):he[j]=Se?_.image[j].image:_.image[j],he[j]=Nt(_,he[j]);const le=he[0],Ae=s.convert(_.format,_.colorSpace),Re=s.convert(_.type),Ne=M(_.internalFormat,Ae,Re,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,se=ne.__version===void 0||V===!0,Z=q.dataReady;let ce=y(_,le);Te(i.TEXTURE_CUBE_MAP,_);let me;if(oe){L&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,Ne,le.width,le.height);for(let j=0;j<6;j++){me=he[j].mipmaps;for(let Me=0;Me<me.length;Me++){const ve=me[Me];_.format!==sn?Ae!==null?L?Z&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,ve.width,ve.height,Ae,ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Ne,ve.width,ve.height,0,ve.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,0,0,ve.width,ve.height,Ae,Re,ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me,Ne,ve.width,ve.height,0,Ae,Re,ve.data)}}}else{if(me=_.mipmaps,L&&se){me.length>0&&ce++;const j=Ke(he[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,Ne,j.width,j.height)}for(let j=0;j<6;j++)if(Se){L?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,he[j].width,he[j].height,Ae,Re,he[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ne,he[j].width,he[j].height,0,Ae,Re,he[j].data);for(let Me=0;Me<me.length;Me++){const ct=me[Me].image[j].image;L?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,ct.width,ct.height,Ae,Re,ct.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Ne,ct.width,ct.height,0,Ae,Re,ct.data)}}else{L?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ae,Re,he[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ne,Ae,Re,he[j]);for(let Me=0;Me<me.length;Me++){const ve=me[Me];L?Z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,0,0,Ae,Re,ve.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me+1,Ne,Ae,Re,ve.image[j])}}}p(_)&&E(i.TEXTURE_CUBE_MAP),ne.__version=q.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function be(A,_,N,V,q,ne){const ae=s.convert(N.format,N.colorSpace),Y=s.convert(N.type),J=M(N.internalFormat,ae,Y,N.normalized,N.colorSpace),oe=n.get(_),Se=n.get(N);if(Se.__renderTarget=_,!oe.__hasExternalTextures){const he=Math.max(1,_.width>>ne),le=Math.max(1,_.height>>ne);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?t.texImage3D(q,ne,J,he,le,_.depth,0,ae,Y,null):t.texImage2D(q,ne,J,he,le,0,ae,Y,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,q,Se.__webglTexture,0,lt(_)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,q,Se.__webglTexture,ne),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Qe(A,_,N){if(i.bindRenderbuffer(i.RENDERBUFFER,A),_.depthBuffer){const V=_.depthTexture,q=V&&V.isDepthTexture?V.type:null,ne=T(_.stencilBuffer,q),ae=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(_),ne,_.width,_.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(_),ne,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ne,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,A)}else{const V=_.textures;for(let q=0;q<V.length;q++){const ne=V[q],ae=s.convert(ne.format,ne.colorSpace),Y=s.convert(ne.type),J=M(ne.internalFormat,ae,Y,ne.normalized,ne.colorSpace);mt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(_),J,_.width,_.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(_),J,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,J,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(A,_,N){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=n.get(_.depthTexture);if(q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Te(i.TEXTURE_CUBE_MAP,_.depthTexture);const oe=s.convert(_.depthTexture.format),Se=s.convert(_.depthTexture.type);let he;_.depthTexture.format===Nn?he=i.DEPTH_COMPONENT24:_.depthTexture.format===ui&&(he=i.DEPTH24_STENCIL8);for(let le=0;le<6;le++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,he,_.width,_.height,0,oe,Se,null)}}else K(_.depthTexture,0);const ne=q.__webglTexture,ae=lt(_),Y=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+N:i.TEXTURE_2D,J=_.depthTexture.format===ui?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Nn)mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,Y,ne,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,J,Y,ne,0);else if(_.depthTexture.format===ui)mt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,Y,ne,0,ae):i.framebufferTexture2D(i.FRAMEBUFFER,J,Y,ne,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ye(A){const _=n.get(A),N=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const V=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),_.__depthDisposeCallback=q}_.__boundDepthTexture=V}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(N)for(let V=0;V<6;V++)Ue(_.__webglFramebuffer[V],A,V);else{const V=A.texture.mipmaps;V&&V.length>0?Ue(_.__webglFramebuffer[0],A,0):Ue(_.__webglFramebuffer,A,0)}else if(N){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=i.createRenderbuffer(),Qe(_.__webglDepthbuffer[V],A,!1);else{const q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=_.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ne)}}else{const V=A.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Qe(_.__webglDepthbuffer,A,!1);else{const q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ne)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function $e(A,_,N){const V=n.get(A);_!==void 0&&be(V.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ye(A)}function Xe(A){const _=A.texture,N=n.get(A),V=n.get(_);A.addEventListener("dispose",v);const q=A.textures,ne=A.isWebGLCubeRenderTarget===!0,ae=q.length>1;if(ae||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=_.version,a.memory.textures++),ne){N.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[Y]=[];for(let J=0;J<_.mipmaps.length;J++)N.__webglFramebuffer[Y][J]=i.createFramebuffer()}else N.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let Y=0;Y<_.mipmaps.length;Y++)N.__webglFramebuffer[Y]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(ae)for(let Y=0,J=q.length;Y<J;Y++){const oe=n.get(q[Y]);oe.__webglTexture===void 0&&(oe.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&mt(A)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let Y=0;Y<q.length;Y++){const J=q[Y];N.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[Y]);const oe=s.convert(J.format,J.colorSpace),Se=s.convert(J.type),he=M(J.internalFormat,oe,Se,J.normalized,J.colorSpace,A.isXRRenderTarget===!0),le=lt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,le,he,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,N.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Qe(N.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Te(i.TEXTURE_CUBE_MAP,_);for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)be(N.__webglFramebuffer[Y][J],A,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,J);else be(N.__webglFramebuffer[Y],A,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(_)&&E(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let Y=0,J=q.length;Y<J;Y++){const oe=q[Y],Se=n.get(oe);let he=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(he=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,Se.__webglTexture),Te(he,oe),be(N.__webglFramebuffer,A,oe,i.COLOR_ATTACHMENT0+Y,he,0),p(oe)&&E(he)}t.unbindTexture()}else{let Y=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Y=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Y,V.__webglTexture),Te(Y,_),_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)be(N.__webglFramebuffer[J],A,_,i.COLOR_ATTACHMENT0,Y,J);else be(N.__webglFramebuffer,A,_,i.COLOR_ATTACHMENT0,Y,0);p(_)&&E(Y),t.unbindTexture()}A.depthBuffer&&Ye(A)}function pt(A){const _=A.textures;for(let N=0,V=_.length;N<V;N++){const q=_[N];if(p(q)){const ne=w(A),ae=n.get(q).__webglTexture;t.bindTexture(ne,ae),E(ne),t.unbindTexture()}}}const _t=[],St=[];function Et(A){if(A.samples>0){if(mt(A)===!1){const _=A.textures,N=A.width,V=A.height;let q=i.COLOR_BUFFER_BIT;const ne=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=n.get(A),Y=_.length>1;if(Y)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);const J=A.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const Se=n.get(_[oe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Se,0)}i.blitFramebuffer(0,0,N,V,0,0,N,V,q,i.NEAREST),l===!0&&(_t.length=0,St.length=0,_t.push(i.COLOR_ATTACHMENT0+oe),A.depthBuffer&&A.resolveDepthBuffer===!1&&(_t.push(ne),St.push(ne),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,St)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);const Se=n.get(_[oe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,Se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const _=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function lt(A){return Math.min(r.maxSamples,A.samples)}function mt(A){const _=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function D(A){const _=a.render.frame;h.get(A)!==_&&(h.set(A,_),A.update())}function Nt(A,_){const N=A.colorSpace,V=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||N!==rs&&N!==$n&&(Ve.getTransfer(N)===Ze?(V!==sn||q!==Gt)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",N)),_}function Ke(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=K,this.setTexture2DArray=Q,this.setTexture3D=re,this.setTextureCube=ie,this.rebindTextures=$e,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=Et,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=be,this.useMultisampledRTT=mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Wg(i,e){function t(n,r=$n){let s;const a=Ve.getTransfer(r);if(n===Gt)return i.UNSIGNED_BYTE;if(n===_o)return i.UNSIGNED_SHORT_4_4_4_4;if(n===vo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ic)return i.BYTE;if(n===Uc)return i.SHORT;if(n===ar)return i.UNSIGNED_SHORT;if(n===go)return i.INT;if(n===Mn)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===Un)return i.HALF_FLOAT;if(n===Oc)return i.ALPHA;if(n===Bc)return i.RGB;if(n===sn)return i.RGBA;if(n===Nn)return i.DEPTH_COMPONENT;if(n===ui)return i.DEPTH_STENCIL;if(n===zc)return i.RED;if(n===xo)return i.RED_INTEGER;if(n===di)return i.RG;if(n===Mo)return i.RG_INTEGER;if(n===So)return i.RGBA_INTEGER;if(n===Jr||n===Qr||n===jr||n===es)if(a===Ze)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Jr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===es)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Jr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Qr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===es)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ya||n===ba||n===Ea||n===Ta)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ya)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ba)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ea)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ta)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Aa||n===wa||n===Ca||n===Ra||n===Pa||n===ns||n===La)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Aa||n===wa)return a===Ze?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ca)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ra)return s.COMPRESSED_R11_EAC;if(n===Pa)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ns)return s.COMPRESSED_RG11_EAC;if(n===La)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Da||n===Ia||n===Ua||n===Na||n===Fa||n===Oa||n===Ba||n===za||n===ka||n===Va||n===Ha||n===Ga||n===Wa||n===Xa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Da)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ia)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ua)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Na)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fa)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oa)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ba)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===za)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ka)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Va)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ha)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ga)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wa)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xa)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qa||n===Ya||n===$a)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===qa)return a===Ze?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ya)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$a)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ka||n===Za||n===is||n===Ja)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ka)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Za)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===is)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ja)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===or?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Xg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qg=`
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

}`;class Yg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new $c(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Sn({vertexShader:Xg,fragmentShader:qg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new an(new ds(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $g extends pi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null;const x=typeof XRWebGLBinding<"u",m=new Yg,p={},E=t.getContextAttributes();let w=null,M=null;const T=[],y=[],C=new Ge;let v=null;const b=new Kt;b.viewport=new ot;const P=new Kt;P.viewport=new ot;const R=[b,P],U=new tf;let W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let te=T[$];return te===void 0&&(te=new Ls,T[$]=te),te.getTargetRaySpace()},this.getControllerGrip=function($){let te=T[$];return te===void 0&&(te=new Ls,T[$]=te),te.getGripSpace()},this.getHand=function($){let te=T[$];return te===void 0&&(te=new Ls,T[$]=te),te.getHandSpace()};function O($){const te=y.indexOf($.inputSource);if(te===-1)return;const ee=T[te];ee!==void 0&&(ee.update($.inputSource,$.frame,c||a),ee.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",B);for(let $=0;$<T.length;$++){const te=y[$];te!==null&&(y[$]=null,T[$].disconnect(te))}W=null,X=null,m.reset();for(const $ in p)delete p[$];e.setRenderTarget(w),d=null,u=null,f=null,r=null,M=null,Te.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",G),r.addEventListener("inputsourceschange",B),E.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ce=null,Le=null;E.depth&&(Le=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=E.stencil?ui:Nn,Ce=E.stencil?or:Mn);const be={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(be),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new _n(u.textureWidth,u.textureHeight,{format:sn,type:Gt,depthTexture:new zi(u.textureWidth,u.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new _n(d.framebufferWidth,d.framebufferHeight,{format:sn,type:Gt,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Te.setContext(r),Te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function B($){for(let te=0;te<$.removed.length;te++){const ee=$.removed[te],Ce=y.indexOf(ee);Ce>=0&&(y[Ce]=null,T[Ce].disconnect(ee))}for(let te=0;te<$.added.length;te++){const ee=$.added[te];let Ce=y.indexOf(ee);if(Ce===-1){for(let be=0;be<T.length;be++)if(be>=y.length){y.push(ee),Ce=be;break}else if(y[be]===null){y[be]=ee,Ce=be;break}if(Ce===-1)break}const Le=T[Ce];Le&&Le.connect(ee)}}const K=new F,Q=new F;function re($,te,ee){K.setFromMatrixPosition(te.matrixWorld),Q.setFromMatrixPosition(ee.matrixWorld);const Ce=K.distanceTo(Q),Le=te.projectionMatrix.elements,be=ee.projectionMatrix.elements,Qe=Le[14]/(Le[10]-1),Ue=Le[14]/(Le[10]+1),Ye=(Le[9]+1)/Le[5],$e=(Le[9]-1)/Le[5],Xe=(Le[8]-1)/Le[0],pt=(be[8]+1)/be[0],_t=Qe*Xe,St=Qe*pt,Et=Ce/(-Xe+pt),lt=Et*-Xe;if(te.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(lt),$.translateZ(Et),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Le[10]===-1)$.projectionMatrix.copy(te.projectionMatrix),$.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const mt=Qe+Et,D=Ue+Et,Nt=_t-lt,Ke=St+(Ce-lt),A=Ye*Ue/D*mt,_=$e*Ue/D*mt;$.projectionMatrix.makePerspective(Nt,Ke,A,_,mt,D),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ie($,te){te===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(te.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let te=$.near,ee=$.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),U.near=P.near=b.near=te,U.far=P.far=b.far=ee,(W!==U.near||X!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),W=U.near,X=U.far),U.layers.mask=$.layers.mask|6,b.layers.mask=U.layers.mask&-5,P.layers.mask=U.layers.mask&-3;const Ce=$.parent,Le=U.cameras;ie(U,Ce);for(let be=0;be<Le.length;be++)ie(Le[be],Ce);Le.length===2?re(U,b,P):U.projectionMatrix.copy(b.projectionMatrix),de($,U,Ce)};function de($,te,ee){ee===null?$.matrix.copy(te.matrixWorld):($.matrix.copy(ee.matrixWorld),$.matrix.invert(),$.matrix.multiply(te.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(te.projectionMatrix),$.projectionMatrixInverse.copy(te.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ja*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function($){return p[$]};let De=null;function ke($,te){if(h=te.getViewerPose(c||a),g=te,h!==null){const ee=h.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Ce=!1;ee.length!==U.cameras.length&&(U.cameras.length=0,Ce=!0);for(let Ue=0;Ue<ee.length;Ue++){const Ye=ee[Ue];let $e=null;if(d!==null)$e=d.getViewport(Ye);else{const pt=f.getViewSubImage(u,Ye);$e=pt.viewport,Ue===0&&(e.setRenderTargetTextures(M,pt.colorTexture,pt.depthStencilTexture),e.setRenderTarget(M))}let Xe=R[Ue];Xe===void 0&&(Xe=new Kt,Xe.layers.enable(Ue),Xe.viewport=new ot,R[Ue]=Xe),Xe.matrix.fromArray(Ye.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(Ye.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set($e.x,$e.y,$e.width,$e.height),Ue===0&&(U.matrix.copy(Xe.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ce===!0&&U.cameras.push(Xe)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=n.getBinding();const Ue=f.getDepthInformation(ee[0]);Ue&&Ue.isValid&&Ue.texture&&m.init(Ue,r.renderState)}if(Le&&Le.includes("camera-access")&&x){e.state.unbindTexture(),f=n.getBinding();for(let Ue=0;Ue<ee.length;Ue++){const Ye=ee[Ue].camera;if(Ye){let $e=p[Ye];$e||($e=new $c,p[Ye]=$e);const Xe=f.getCameraImage(Ye);$e.sourceTexture=Xe}}}}for(let ee=0;ee<T.length;ee++){const Ce=y[ee],Le=T[ee];Ce!==null&&Le!==void 0&&Le.update(Ce,te,c||a)}De&&De($,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),g=null}const Te=new jc;Te.setAnimationLoop(ke),this.setAnimationLoop=function($){De=$},this.dispose=function(){}}}const Kg=new rt,ah=new Ie;ah.set(-1,0,0,0,1,0,0,0,1);function Zg(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Kc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,E,w,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,E,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ot&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ot&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=e.get(p),w=E.envMap,M=E.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(Kg.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ah),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ot&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Jg(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,T){const y=T.program;n.uniformBlockBinding(M,y)}function c(M,T){let y=r[M.id];y===void 0&&(m(M),y=h(M),r[M.id]=y,M.addEventListener("dispose",E));const C=T.program;n.updateUBOMapping(M,C);const v=e.render.frame;s[M.id]!==v&&(u(M),s[M.id]=v)}function h(M){const T=f();M.__bindingPointIndex=T;const y=i.createBuffer(),C=M.__size,v=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,C,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,y),y}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return We("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const T=r[M.id],y=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let v=0,b=y.length;v<b;v++){const P=y[v];if(Array.isArray(P))for(let R=0,U=P.length;R<U;R++)d(P[R],v,R,C);else d(P,v,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,T,y,C){if(x(M,T,y,C)===!0){const v=M.__offset,b=M.value;if(Array.isArray(b)){let P=0;for(let R=0;R<b.length;R++){const U=b[R],W=p(U);g(U,M.__data,P),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(b,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,M.__data)}}function g(M,T,y){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,y)}function x(M,T,y,C){const v=M.value,b=T+"_"+y;if(C[b]===void 0)return typeof v=="number"||typeof v=="boolean"?C[b]=v:ArrayBuffer.isView(v)?C[b]=v.slice():C[b]=v.clone(),!0;{const P=C[b];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return C[b]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function m(M){const T=M.uniforms;let y=0;const C=16;for(let b=0,P=T.length;b<P;b++){const R=Array.isArray(T[b])?T[b]:[T[b]];for(let U=0,W=R.length;U<W;U++){const X=R[U],O=Array.isArray(X.value)?X.value:[X.value];for(let G=0,B=O.length;G<B;G++){const K=O[G],Q=p(K),re=y%C,ie=re%Q.boundary,de=re+ie;y+=ie,de!==0&&C-de<Q.storage&&(y+=C-de),X.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=y,y+=Q.storage}}}const v=y%C;return v>0&&(y+=C-v),M.__size=y,M.__cache={},this}function p(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",M),T}function E(M){const T=M.target;T.removeEventListener("dispose",E);const y=a.indexOf(T.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function w(){for(const M in r)i.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:w}}const Qg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let un=null;function jg(){return un===null&&(un=new Bu(Qg,16,16,di,Un),un.name="DFG_LUT",un.minFilter=Lt,un.magFilter=Lt,un.wrapS=Pn,un.wrapT=Pn,un.generateMipmaps=!1,un.needsUpdate=!0),un}class e0{constructor(e={}){const{canvas:t=mu(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Gt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const x=d,m=new Set([So,Mo,xo]),p=new Set([Gt,Mn,ar,or,_o,vo]),E=new Uint32Array(4),w=new Int32Array(4),M=new F;let T=null,y=null;const C=[],v=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,U=null,W=null,X=null,O=null;this._outputColorSpace=Yt;let G=0,B=0,K=null,Q=-1,re=null;const ie=new ot,de=new ot;let De=null;const ke=new ze(0);let Te=0,$=t.width,te=t.height,ee=1,Ce=null,Le=null;const be=new ot(0,0,$,te),Qe=new ot(0,0,$,te);let Ue=!1;const Ye=new wo;let $e=!1,Xe=!1;const pt=new rt,_t=new F,St=new ot,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let lt=!1;function mt(){return K===null?ee:1}let D=n;function Nt(S,I){return t.getContext(S,I)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${po}`),t.addEventListener("webglcontextlost",ct,!1),t.addEventListener("webglcontextrestored",tt,!1),t.addEventListener("webglcontextcreationerror",on,!1),D===null){const I="webgl2";if(D=Nt(I,S),D===null)throw Nt(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw We("WebGLRenderer: "+S.message),S}let Ke,A,_,N,V,q,ne,ae,Y,J,oe,Se,he,le,Ae,Re,Ne,L,se,Z,ce,me,j;function Me(){Ke=new jp(D),Ke.init(),ce=new Wg(D,Ke),A=new Xp(D,Ke,e,ce),_=new Hg(D,Ke),A.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),W=D.createFramebuffer(),X=D.createFramebuffer(),O=D.createFramebuffer(),N=new nm(D),V=new Cg,q=new Gg(D,Ke,_,V,A,ce,N),ne=new Qp(P),ae=new af(D),me=new Gp(D,ae),Y=new em(D,ae,N,me),J=new rm(D,Y,ae,me,N),L=new im(D,A,q),Ae=new qp(V),oe=new wg(P,ne,Ke,A,me,Ae),Se=new Zg(P,V),he=new Pg,le=new Fg(Ke),Ne=new Hp(P,ne,_,J,g,l),Re=new Vg(P,J,A),j=new Jg(D,N,A,_),se=new Wp(D,Ke,N),Z=new tm(D,Ke,N),N.programs=oe.programs,P.capabilities=A,P.extensions=Ke,P.properties=V,P.renderLists=he,P.shadowMap=Re,P.state=_,P.info=N}Me(),x!==Gt&&(b=new am(x,t.width,t.height,o,r,s));const ve=new $g(P,D);this.xr=ve,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=Ke.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ke.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(S){S!==void 0&&(ee=S,this.setSize($,te,!1))},this.getSize=function(S){return S.set($,te)},this.setSize=function(S,I,H=!0){if(ve.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}$=S,te=I,t.width=Math.floor(S*ee),t.height=Math.floor(I*ee),H===!0&&(t.style.width=S+"px",t.style.height=I+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set($*ee,te*ee).floor()},this.setDrawingBufferSize=function(S,I,H){$=S,te=I,ee=H,t.width=Math.floor(S*H),t.height=Math.floor(I*H),this.setViewport(0,0,S,I)},this.setEffects=function(S){if(x===Gt){We("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let I=0;I<S.length;I++)if(S[I].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ie)},this.getViewport=function(S){return S.copy(be)},this.setViewport=function(S,I,H,z){S.isVector4?be.set(S.x,S.y,S.z,S.w):be.set(S,I,H,z),_.viewport(ie.copy(be).multiplyScalar(ee).round())},this.getScissor=function(S){return S.copy(Qe)},this.setScissor=function(S,I,H,z){S.isVector4?Qe.set(S.x,S.y,S.z,S.w):Qe.set(S,I,H,z),_.scissor(de.copy(Qe).multiplyScalar(ee).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(S){_.setScissorTest(Ue=S)},this.setOpaqueSort=function(S){Ce=S},this.setTransparentSort=function(S){Le=S},this.getClearColor=function(S){return S.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(S=!0,I=!0,H=!0){let z=0;if(S){let k=!1;if(K!==null){const pe=K.texture.format;k=m.has(pe)}if(k){const pe=K.texture.type,_e=p.has(pe),fe=Ne.getClearColor(),xe=Ne.getClearAlpha(),ye=fe.r,Fe=fe.g,Be=fe.b;_e?(E[0]=ye,E[1]=Fe,E[2]=Be,E[3]=xe,D.clearBufferuiv(D.COLOR,0,E)):(w[0]=ye,w[1]=Fe,w[2]=Be,w[3]=xe,D.clearBufferiv(D.COLOR,0,w))}else z|=D.COLOR_BUFFER_BIT}I&&(z|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),U=S},this.dispose=function(){t.removeEventListener("webglcontextlost",ct,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",on,!1),Ne.dispose(),he.dispose(),le.dispose(),V.dispose(),ne.dispose(),J.dispose(),me.dispose(),j.dispose(),oe.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",Uo),ve.removeEventListener("sessionend",No),ti.stop()};function ct(S){S.preventDefault(),Qo("WebGLRenderer: Context Lost."),R=!0}function tt(){Qo("WebGLRenderer: Context Restored."),R=!1;const S=N.autoReset,I=Re.enabled,H=Re.autoUpdate,z=Re.needsUpdate,k=Re.type;Me(),N.autoReset=S,Re.enabled=I,Re.autoUpdate=H,Re.needsUpdate=z,Re.type=k}function on(S){We("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ln(S){const I=S.target;I.removeEventListener("dispose",ln),wh(I)}function wh(S){Ch(S),V.remove(S)}function Ch(S){const I=V.get(S).programs;I!==void 0&&(I.forEach(function(H){oe.releaseProgram(H)}),S.isShaderMaterial&&oe.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,H,z,k,pe){I===null&&(I=Et);const _e=k.isMesh&&k.matrixWorld.determinantAffine()<0,fe=Lh(S,I,H,z,k);_.setMaterial(z,_e);let xe=H.index,ye=1;if(z.wireframe===!0){if(xe=Y.getWireframeAttribute(H),xe===void 0)return;ye=2}const Fe=H.drawRange,Be=H.attributes.position;let Ee=Fe.start*ye,Je=(Fe.start+Fe.count)*ye;pe!==null&&(Ee=Math.max(Ee,pe.start*ye),Je=Math.min(Je,(pe.start+pe.count)*ye)),xe!==null?(Ee=Math.max(Ee,0),Je=Math.min(Je,xe.count)):Be!=null&&(Ee=Math.max(Ee,0),Je=Math.min(Je,Be.count));const ut=Je-Ee;if(ut<0||ut===1/0)return;me.setup(k,z,fe,H,xe);let ht,je=se;if(xe!==null&&(ht=ae.get(xe),je=Z,je.setIndex(ht)),k.isMesh)z.wireframe===!0?(_.setLineWidth(z.wireframeLinewidth*mt()),je.setMode(D.LINES)):je.setMode(D.TRIANGLES);else if(k.isLine){let wt=z.linewidth;wt===void 0&&(wt=1),_.setLineWidth(wt*mt()),k.isLineSegments?je.setMode(D.LINES):k.isLineLoop?je.setMode(D.LINE_LOOP):je.setMode(D.LINE_STRIP)}else k.isPoints?je.setMode(D.POINTS):k.isSprite&&je.setMode(D.TRIANGLES);if(k.isBatchedMesh)if(Ke.get("WEBGL_multi_draw"))je.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const wt=k._multiDrawStarts,ge=k._multiDrawCounts,Bt=k._multiDrawCount,qe=xe?ae.get(xe).bytesPerElement:1,Xt=V.get(z).currentProgram.getUniforms();for(let cn=0;cn<Bt;cn++)Xt.setValue(D,"_gl_DrawID",cn),je.render(wt[cn]/qe,ge[cn])}else if(k.isInstancedMesh)je.renderInstances(Ee,ut,k.count);else if(H.isInstancedBufferGeometry){const wt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,ge=Math.min(H.instanceCount,wt);je.renderInstances(Ee,ut,ge)}else je.render(Ee,ut)};function Io(S,I,H){S.transparent===!0&&S.side===nn&&S.forceSinglePass===!1?(S.side=Ot,S.needsUpdate=!0,_r(S,I,H),S.side=Zn,S.needsUpdate=!0,_r(S,I,H),S.side=nn):_r(S,I,H)}this.compile=function(S,I,H=null){H===null&&(H=S),y=le.get(H),y.init(I),v.push(y),H.traverseVisible(function(k){k.isLight&&k.layers.test(I.layers)&&(y.pushLight(k),k.castShadow&&y.pushShadow(k))}),S!==H&&S.traverseVisible(function(k){k.isLight&&k.layers.test(I.layers)&&(y.pushLight(k),k.castShadow&&y.pushShadow(k))}),y.setupLights();const z=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const pe=k.material;if(pe)if(Array.isArray(pe))for(let _e=0;_e<pe.length;_e++){const fe=pe[_e];Io(fe,H,k),z.add(fe)}else Io(pe,H,k),z.add(pe)}),y=v.pop(),z},this.compileAsync=function(S,I,H=null){const z=this.compile(S,I,H);return new Promise(k=>{function pe(){if(z.forEach(function(_e){V.get(_e).currentProgram.isReady()&&z.delete(_e)}),z.size===0){k(S);return}setTimeout(pe,10)}Ke.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let xs=null;function Rh(S){xs&&xs(S)}function Uo(){ti.stop()}function No(){ti.start()}const ti=new jc;ti.setAnimationLoop(Rh),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(S){xs=S,ve.setAnimationLoop(S),S===null?ti.stop():ti.start()},ve.addEventListener("sessionstart",Uo),ve.addEventListener("sessionend",No),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;U!==null&&U.renderStart(S,I);const H=ve.enabled===!0&&ve.isPresenting===!0,z=b!==null&&(K===null||H)&&b.begin(P,K);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(I),I=ve.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,I,K),y=le.get(S,v.length),y.init(I),y.state.textureUnits=q.getTextureUnits(),v.push(y),pt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Ye.setFromProjectionMatrix(pt,mn,I.reversedDepth),Xe=this.localClippingEnabled,$e=Ae.init(this.clippingPlanes,Xe),T=he.get(S,C.length),T.init(),C.push(T),ve.enabled===!0&&ve.isPresenting===!0){const _e=P.xr.getDepthSensingMesh();_e!==null&&Ms(_e,I,-1/0,P.sortObjects)}Ms(S,I,0,P.sortObjects),T.finish(),P.sortObjects===!0&&T.sort(Ce,Le,I.reversedDepth),lt=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,lt&&Ne.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$e===!0&&Ae.beginShadows();const k=y.state.shadowsArray;if(Re.render(k,S,I),$e===!0&&Ae.endShadows(),(z&&b.hasRenderPass())===!1){const _e=T.opaque,fe=T.transmissive;if(y.setupLights(),I.isArrayCamera){const xe=I.cameras;if(fe.length>0)for(let ye=0,Fe=xe.length;ye<Fe;ye++){const Be=xe[ye];Oo(_e,fe,S,Be)}lt&&Ne.render(S);for(let ye=0,Fe=xe.length;ye<Fe;ye++){const Be=xe[ye];Fo(T,S,Be,Be.viewport)}}else fe.length>0&&Oo(_e,fe,S,I),lt&&Ne.render(S),Fo(T,S,I)}K!==null&&B===0&&(q.updateMultisampleRenderTarget(K),q.updateRenderTargetMipmap(K)),z&&b.end(P),S.isScene===!0&&S.onAfterRender(P,S,I),me.resetDefaultState(),Q=-1,re=null,v.pop(),v.length>0?(y=v[v.length-1],q.setTextureUnits(y.state.textureUnits),$e===!0&&Ae.setGlobalState(P.clippingPlanes,y.state.camera)):y=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,U!==null&&U.renderEnd()};function Ms(S,I,H,z){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLightProbeGrid)y.pushLightProbeGrid(S);else if(S.isLight)y.pushLight(S),S.castShadow&&y.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ye.intersectsSprite(S)){z&&St.setFromMatrixPosition(S.matrixWorld).applyMatrix4(pt);const _e=J.update(S),fe=S.material;fe.visible&&T.push(S,_e,fe,H,St.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ye.intersectsObject(S))){const _e=J.update(S),fe=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),St.copy(S.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),St.copy(_e.boundingSphere.center)),St.applyMatrix4(S.matrixWorld).applyMatrix4(pt)),Array.isArray(fe)){const xe=_e.groups;for(let ye=0,Fe=xe.length;ye<Fe;ye++){const Be=xe[ye],Ee=fe[Be.materialIndex];Ee&&Ee.visible&&T.push(S,_e,Ee,H,St.z,Be)}}else fe.visible&&T.push(S,_e,fe,H,St.z,null)}}const pe=S.children;for(let _e=0,fe=pe.length;_e<fe;_e++)Ms(pe[_e],I,H,z)}function Fo(S,I,H,z){const{opaque:k,transmissive:pe,transparent:_e}=S;y.setupLightsView(H),$e===!0&&Ae.setGlobalState(P.clippingPlanes,H),z&&_.viewport(ie.copy(z)),k.length>0&&gr(k,I,H),pe.length>0&&gr(pe,I,H),_e.length>0&&gr(_e,I,H),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Oo(S,I,H,z){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[z.id]===void 0){const Ee=Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[z.id]=new _n(1,1,{generateMipmaps:!0,type:Ee?Un:Gt,minFilter:hi,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ve.workingColorSpace})}const pe=y.state.transmissionRenderTarget[z.id],_e=z.viewport||ie;pe.setSize(_e.z*P.transmissionResolutionScale,_e.w*P.transmissionResolutionScale);const fe=P.getRenderTarget(),xe=P.getActiveCubeFace(),ye=P.getActiveMipmapLevel();P.setRenderTarget(pe),P.getClearColor(ke),Te=P.getClearAlpha(),Te<1&&P.setClearColor(16777215,.5),P.clear(),lt&&Ne.render(H);const Fe=P.toneMapping;P.toneMapping=gn;const Be=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),y.setupLightsView(z),$e===!0&&Ae.setGlobalState(P.clippingPlanes,z),gr(S,H,z),q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Je=0,ut=I.length;Je<ut;Je++){const ht=I[Je],{object:je,geometry:wt,material:ge,group:Bt}=ht;if(ge.side===nn&&je.layers.test(z.layers)){const qe=ge.side;ge.side=Ot,ge.needsUpdate=!0,Bo(je,H,z,wt,ge,Bt),ge.side=qe,ge.needsUpdate=!0,Ee=!0}}Ee===!0&&(q.updateMultisampleRenderTarget(pe),q.updateRenderTargetMipmap(pe))}P.setRenderTarget(fe,xe,ye),P.setClearColor(ke,Te),Be!==void 0&&(z.viewport=Be),P.toneMapping=Fe}function gr(S,I,H){const z=I.isScene===!0?I.overrideMaterial:null;for(let k=0,pe=S.length;k<pe;k++){const _e=S[k],{object:fe,geometry:xe,group:ye}=_e;let Fe=_e.material;Fe.allowOverride===!0&&z!==null&&(Fe=z),fe.layers.test(H.layers)&&Bo(fe,I,H,xe,Fe,ye)}}function Bo(S,I,H,z,k,pe){S.onBeforeRender(P,I,H,z,k,pe),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(P,I,H,z,S,pe),k.transparent===!0&&k.side===nn&&k.forceSinglePass===!1?(k.side=Ot,k.needsUpdate=!0,P.renderBufferDirect(H,I,z,k,S,pe),k.side=Zn,k.needsUpdate=!0,P.renderBufferDirect(H,I,z,k,S,pe),k.side=nn):P.renderBufferDirect(H,I,z,k,S,pe),S.onAfterRender(P,I,H,z,k,pe)}function _r(S,I,H){I.isScene!==!0&&(I=Et);const z=V.get(S),k=y.state.lights,pe=y.state.shadowsArray,_e=k.state.version,fe=oe.getParameters(S,k.state,pe,I,H,y.state.lightProbeGridArray),xe=oe.getProgramCacheKey(fe);let ye=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?I.environment:null,z.fog=I.fog;const Fe=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=ne.get(S.envMap||z.environment,Fe),z.envMapRotation=z.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,ye===void 0&&(S.addEventListener("dispose",ln),ye=new Map,z.programs=ye);let Be=ye.get(xe);if(Be!==void 0){if(z.currentProgram===Be&&z.lightsStateVersion===_e)return ko(S,fe),Be}else fe.uniforms=oe.getUniforms(S),U!==null&&S.isNodeMaterial&&U.build(S,H,fe),S.onBeforeCompile(fe,P),Be=oe.acquireProgram(fe,xe),ye.set(xe,Be),z.uniforms=fe.uniforms;const Ee=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ee.clippingPlanes=Ae.uniform),ko(S,fe),z.needsLights=Ih(S),z.lightsStateVersion=_e,z.needsLights&&(Ee.ambientLightColor.value=k.state.ambient,Ee.lightProbe.value=k.state.probe,Ee.directionalLights.value=k.state.directional,Ee.directionalLightShadows.value=k.state.directionalShadow,Ee.spotLights.value=k.state.spot,Ee.spotLightShadows.value=k.state.spotShadow,Ee.rectAreaLights.value=k.state.rectArea,Ee.ltc_1.value=k.state.rectAreaLTC1,Ee.ltc_2.value=k.state.rectAreaLTC2,Ee.pointLights.value=k.state.point,Ee.pointLightShadows.value=k.state.pointShadow,Ee.hemisphereLights.value=k.state.hemi,Ee.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ee.spotLightMatrix.value=k.state.spotLightMatrix,Ee.spotLightMap.value=k.state.spotLightMap,Ee.pointShadowMatrix.value=k.state.pointShadowMatrix),z.lightProbeGrid=y.state.lightProbeGridArray.length>0,z.currentProgram=Be,z.uniformsList=null,Be}function zo(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=ts.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function ko(S,I){const H=V.get(S);H.outputColorSpace=I.outputColorSpace,H.batching=I.batching,H.batchingColor=I.batchingColor,H.instancing=I.instancing,H.instancingColor=I.instancingColor,H.instancingMorph=I.instancingMorph,H.skinning=I.skinning,H.morphTargets=I.morphTargets,H.morphNormals=I.morphNormals,H.morphColors=I.morphColors,H.morphTargetsCount=I.morphTargetsCount,H.numClippingPlanes=I.numClippingPlanes,H.numIntersection=I.numClipIntersection,H.vertexAlphas=I.vertexAlphas,H.vertexTangents=I.vertexTangents,H.toneMapping=I.toneMapping}function Ph(S,I){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(I.matrixWorld);for(let H=0,z=S.length;H<z;H++){const k=S[H];if(k.texture!==null&&k.boundingBox.containsPoint(M))return k}return null}function Lh(S,I,H,z,k){I.isScene!==!0&&(I=Et),q.resetTextureUnits();const pe=I.fog,_e=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?I.environment:null,fe=K===null?P.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ve.workingColorSpace,xe=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,ye=ne.get(z.envMap||_e,xe),Fe=z.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Be=!!H.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ee=!!H.morphAttributes.position,Je=!!H.morphAttributes.normal,ut=!!H.morphAttributes.color;let ht=gn;z.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ht=P.toneMapping);const je=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,wt=je!==void 0?je.length:0,ge=V.get(z),Bt=y.state.lights;if($e===!0&&(Xe===!0||S!==re)){const nt=S===re&&z.id===Q;Ae.setState(z,S,nt)}let qe=!1;z.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==Bt.state.version||ge.outputColorSpace!==fe||k.isBatchedMesh&&ge.batching===!1||!k.isBatchedMesh&&ge.batching===!0||k.isBatchedMesh&&ge.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&ge.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&ge.instancing===!1||!k.isInstancedMesh&&ge.instancing===!0||k.isSkinnedMesh&&ge.skinning===!1||!k.isSkinnedMesh&&ge.skinning===!0||k.isInstancedMesh&&ge.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&ge.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&ge.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&ge.instancingMorph===!1&&k.morphTexture!==null||ge.envMap!==ye||z.fog===!0&&ge.fog!==pe||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==Ae.numPlanes||ge.numIntersection!==Ae.numIntersection)||ge.vertexAlphas!==Fe||ge.vertexTangents!==Be||ge.morphTargets!==Ee||ge.morphNormals!==Je||ge.morphColors!==ut||ge.toneMapping!==ht||ge.morphTargetsCount!==wt||!!ge.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(qe=!0):(qe=!0,ge.__version=z.version);let Xt=ge.currentProgram;qe===!0&&(Xt=_r(z,I,k),U&&z.isNodeMaterial&&U.onUpdateProgram(z,Xt,ge));let cn=!1,Fn=!1,gi=!1;const et=Xt.getUniforms(),ft=ge.uniforms;if(_.useProgram(Xt.program)&&(cn=!0,Fn=!0,gi=!0),z.id!==Q&&(Q=z.id,Fn=!0),ge.needsLights){const nt=Ph(y.state.lightProbeGridArray,k);ge.lightProbeGrid!==nt&&(ge.lightProbeGrid=nt,Fn=!0)}if(cn||re!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),et.setValue(D,"projectionMatrix",S.projectionMatrix),et.setValue(D,"viewMatrix",S.matrixWorldInverse);const Bn=et.map.cameraPosition;Bn!==void 0&&Bn.setValue(D,_t.setFromMatrixPosition(S.matrixWorld)),A.logarithmicDepthBuffer&&et.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&et.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),re!==S&&(re=S,Fn=!0,gi=!0)}if(ge.needsLights&&(Bt.state.directionalShadowMap.length>0&&et.setValue(D,"directionalShadowMap",Bt.state.directionalShadowMap,q),Bt.state.spotShadowMap.length>0&&et.setValue(D,"spotShadowMap",Bt.state.spotShadowMap,q),Bt.state.pointShadowMap.length>0&&et.setValue(D,"pointShadowMap",Bt.state.pointShadowMap,q)),k.isSkinnedMesh){et.setOptional(D,k,"bindMatrix"),et.setOptional(D,k,"bindMatrixInverse");const nt=k.skeleton;nt&&(nt.boneTexture===null&&nt.computeBoneTexture(),et.setValue(D,"boneTexture",nt.boneTexture,q))}k.isBatchedMesh&&(et.setOptional(D,k,"batchingTexture"),et.setValue(D,"batchingTexture",k._matricesTexture,q),et.setOptional(D,k,"batchingIdTexture"),et.setValue(D,"batchingIdTexture",k._indirectTexture,q),et.setOptional(D,k,"batchingColorTexture"),k._colorsTexture!==null&&et.setValue(D,"batchingColorTexture",k._colorsTexture,q));const On=H.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&L.update(k,H,Xt),(Fn||ge.receiveShadow!==k.receiveShadow)&&(ge.receiveShadow=k.receiveShadow,et.setValue(D,"receiveShadow",k.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&I.environment!==null&&(ft.envMapIntensity.value=I.environmentIntensity),ft.dfgLUT!==void 0&&(ft.dfgLUT.value=jg()),Fn){if(et.setValue(D,"toneMappingExposure",P.toneMappingExposure),ge.needsLights&&Dh(ft,gi),pe&&z.fog===!0&&Se.refreshFogUniforms(ft,pe),Se.refreshMaterialUniforms(ft,z,ee,te,y.state.transmissionRenderTarget[S.id]),ge.needsLights&&ge.lightProbeGrid){const nt=ge.lightProbeGrid;ft.probesSH.value=nt.texture,ft.probesMin.value.copy(nt.boundingBox.min),ft.probesMax.value.copy(nt.boundingBox.max),ft.probesResolution.value.copy(nt.resolution)}ts.upload(D,zo(ge),ft,q)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ts.upload(D,zo(ge),ft,q),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&et.setValue(D,"center",k.center),et.setValue(D,"modelViewMatrix",k.modelViewMatrix),et.setValue(D,"normalMatrix",k.normalMatrix),et.setValue(D,"modelMatrix",k.matrixWorld),z.uniformsGroups!==void 0){const nt=z.uniformsGroups;for(let Bn=0,_i=nt.length;Bn<_i;Bn++){const Vo=nt[Bn];j.update(Vo,Xt),j.bind(Vo,Xt)}}return Xt}function Dh(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function Ih(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(S,I,H){const z=V.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),V.get(S.texture).__webglTexture=I,V.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:H,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,I){const H=V.get(S);H.__webglFramebuffer=I,H.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,H=0){K=S,G=I,B=H;let z=null,k=!1,pe=!1;if(S){const fe=V.get(S);if(fe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(D.FRAMEBUFFER,fe.__webglFramebuffer),ie.copy(S.viewport),de.copy(S.scissor),De=S.scissorTest,_.viewport(ie),_.scissor(de),_.setScissorTest(De),Q=-1;return}else if(fe.__webglFramebuffer===void 0)q.setupRenderTarget(S);else if(fe.__hasExternalTextures)q.rebindTextures(S,V.get(S.texture).__webglTexture,V.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Fe=S.depthTexture;if(fe.__boundDepthTexture!==Fe){if(Fe!==null&&V.has(Fe)&&(S.width!==Fe.image.width||S.height!==Fe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(S)}}const xe=S.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(pe=!0);const ye=V.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(ye[I])?z=ye[I][H]:z=ye[I],k=!0):S.samples>0&&q.useMultisampledRTT(S)===!1?z=V.get(S).__webglMultisampledFramebuffer:Array.isArray(ye)?z=ye[H]:z=ye,ie.copy(S.viewport),de.copy(S.scissor),De=S.scissorTest}else ie.copy(be).multiplyScalar(ee).floor(),de.copy(Qe).multiplyScalar(ee).floor(),De=Ue;if(H!==0&&(z=W),_.bindFramebuffer(D.FRAMEBUFFER,z)&&_.drawBuffers(S,z),_.viewport(ie),_.scissor(de),_.setScissorTest(De),k){const fe=V.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+I,fe.__webglTexture,H)}else if(pe){const fe=I;for(let xe=0;xe<S.textures.length;xe++){const ye=V.get(S.textures[xe]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+xe,ye.__webglTexture,H,fe)}}else if(S!==null&&H!==0){const fe=V.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,fe.__webglTexture,H)}Q=-1},this.readRenderTargetPixels=function(S,I,H,z,k,pe,_e,fe=0){if(!(S&&S.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(xe=xe[_e]),xe){_.bindFramebuffer(D.FRAMEBUFFER,xe);try{const ye=S.textures[fe],Fe=ye.format,Be=ye.type;if(S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+fe),!A.textureFormatReadable(Fe)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Be)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-z&&H>=0&&H<=S.height-k&&D.readPixels(I,H,z,k,ce.convert(Fe),ce.convert(Be),pe)}finally{const ye=K!==null?V.get(K).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(S,I,H,z,k,pe,_e,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(xe=xe[_e]),xe)if(I>=0&&I<=S.width-z&&H>=0&&H<=S.height-k){_.bindFramebuffer(D.FRAMEBUFFER,xe);const ye=S.textures[fe],Fe=ye.format,Be=ye.type;if(S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+fe),!A.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ee),D.bufferData(D.PIXEL_PACK_BUFFER,pe.byteLength,D.STREAM_READ),D.readPixels(I,H,z,k,ce.convert(Fe),ce.convert(Be),0);const Je=K!==null?V.get(K).__webglFramebuffer:null;_.bindFramebuffer(D.FRAMEBUFFER,Je);const ut=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await gu(D,ut,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ee),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pe),D.deleteBuffer(Ee),D.deleteSync(ut),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,I=null,H=0){const z=Math.pow(2,-H),k=Math.floor(S.image.width*z),pe=Math.floor(S.image.height*z),_e=I!==null?I.x:0,fe=I!==null?I.y:0;q.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,_e,fe,k,pe),_.unbindTexture()},this.copyTextureToTexture=function(S,I,H=null,z=null,k=0,pe=0){let _e,fe,xe,ye,Fe,Be,Ee,Je,ut;const ht=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(H!==null)_e=H.max.x-H.min.x,fe=H.max.y-H.min.y,xe=H.isBox3?H.max.z-H.min.z:1,ye=H.min.x,Fe=H.min.y,Be=H.isBox3?H.min.z:0;else{const ft=Math.pow(2,-k);_e=Math.floor(ht.width*ft),fe=Math.floor(ht.height*ft),S.isDataArrayTexture?xe=ht.depth:S.isData3DTexture?xe=Math.floor(ht.depth*ft):xe=1,ye=0,Fe=0,Be=0}z!==null?(Ee=z.x,Je=z.y,ut=z.z):(Ee=0,Je=0,ut=0);const je=ce.convert(I.format),wt=ce.convert(I.type);let ge;I.isData3DTexture?(q.setTexture3D(I,0),ge=D.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(q.setTexture2DArray(I,0),ge=D.TEXTURE_2D_ARRAY):(q.setTexture2D(I,0),ge=D.TEXTURE_2D),_.activeTexture(D.TEXTURE0),_.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,I.flipY),_.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),_.pixelStorei(D.UNPACK_ALIGNMENT,I.unpackAlignment);const Bt=_.getParameter(D.UNPACK_ROW_LENGTH),qe=_.getParameter(D.UNPACK_IMAGE_HEIGHT),Xt=_.getParameter(D.UNPACK_SKIP_PIXELS),cn=_.getParameter(D.UNPACK_SKIP_ROWS),Fn=_.getParameter(D.UNPACK_SKIP_IMAGES);_.pixelStorei(D.UNPACK_ROW_LENGTH,ht.width),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ht.height),_.pixelStorei(D.UNPACK_SKIP_PIXELS,ye),_.pixelStorei(D.UNPACK_SKIP_ROWS,Fe),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Be);const gi=S.isDataArrayTexture||S.isData3DTexture,et=I.isDataArrayTexture||I.isData3DTexture;if(S.isDepthTexture){const ft=V.get(S),On=V.get(I),nt=V.get(ft.__renderTarget),Bn=V.get(On.__renderTarget);_.bindFramebuffer(D.READ_FRAMEBUFFER,nt.__webglFramebuffer),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,Bn.__webglFramebuffer);for(let _i=0;_i<xe;_i++)gi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,V.get(S).__webglTexture,k,Be+_i),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,V.get(I).__webglTexture,pe,ut+_i)),D.blitFramebuffer(ye,Fe,_e,fe,Ee,Je,_e,fe,D.DEPTH_BUFFER_BIT,D.NEAREST);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||V.has(S)){const ft=V.get(S),On=V.get(I);_.bindFramebuffer(D.READ_FRAMEBUFFER,X),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,O);for(let nt=0;nt<xe;nt++)gi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ft.__webglTexture,k,Be+nt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ft.__webglTexture,k),et?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,On.__webglTexture,pe,ut+nt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,On.__webglTexture,pe),k!==0?D.blitFramebuffer(ye,Fe,_e,fe,Ee,Je,_e,fe,D.COLOR_BUFFER_BIT,D.NEAREST):et?D.copyTexSubImage3D(ge,pe,Ee,Je,ut+nt,ye,Fe,_e,fe):D.copyTexSubImage2D(ge,pe,Ee,Je,ye,Fe,_e,fe);_.bindFramebuffer(D.READ_FRAMEBUFFER,null),_.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else et?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(ge,pe,Ee,Je,ut,_e,fe,xe,je,wt,ht.data):I.isCompressedArrayTexture?D.compressedTexSubImage3D(ge,pe,Ee,Je,ut,_e,fe,xe,je,ht.data):D.texSubImage3D(ge,pe,Ee,Je,ut,_e,fe,xe,je,wt,ht):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pe,Ee,Je,_e,fe,je,wt,ht.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pe,Ee,Je,ht.width,ht.height,je,ht.data):D.texSubImage2D(D.TEXTURE_2D,pe,Ee,Je,_e,fe,je,wt,ht);_.pixelStorei(D.UNPACK_ROW_LENGTH,Bt),_.pixelStorei(D.UNPACK_IMAGE_HEIGHT,qe),_.pixelStorei(D.UNPACK_SKIP_PIXELS,Xt),_.pixelStorei(D.UNPACK_SKIP_ROWS,cn),_.pixelStorei(D.UNPACK_SKIP_IMAGES,Fn),pe===0&&I.generateMipmaps&&D.generateMipmap(ge),_.unbindTexture()},this.initRenderTarget=function(S){V.get(S).__webglFramebuffer===void 0&&q.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?q.setTextureCube(S,0):S.isData3DTexture?q.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?q.setTexture2DArray(S,0):q.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){G=0,B=0,K=null,_.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ve._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ve._getUnpackColorSpace()}}function st(i,e){return i<e?`${i}_${e}`:`${e}_${i}`}class Vi{positions;faceOffsets;faceCorners;uvSets;crease;cornerSharp;polygroup;materialId;vertexColor;constructor(e,t,n,r={}){this.positions=e,this.faceOffsets=t,this.faceCorners=n;const s=Math.max(0,t.length-1);this.uvSets=r.uvSets??new Map,this.crease=r.crease??new Map,this.cornerSharp=r.cornerSharp??new Map,this.polygroup=r.polygroup??new Uint16Array(s),this.materialId=r.materialId??new Uint16Array(s),this.vertexColor=r.vertexColor??null}static empty(){return new Vi(new Float32Array(0),new Uint32Array([0]),new Uint32Array(0))}get vertexCount(){return this.positions.length/3}get faceCount(){return Math.max(0,this.faceOffsets.length-1)}get cornerCount(){return this.faceCorners.length}faceSize(e){return this.faceOffsets[e+1]-this.faceOffsets[e]}faceVerts(e){const t=[];for(let n=this.faceOffsets[e];n<this.faceOffsets[e+1];n++)t.push(this.faceCorners[n]);return t}cornerIndex(e,t){return this.faceOffsets[e]+t}getPosition(e,t=[0,0,0]){return t[0]=this.positions[e*3],t[1]=this.positions[e*3+1],t[2]=this.positions[e*3+2],t}setPosition(e,t,n,r){this.positions[e*3]=t,this.positions[e*3+1]=n,this.positions[e*3+2]=r}getCrease(e,t){return this.crease.get(st(e,t))??0}setCrease(e,t,n){const r=st(e,t);n<=0?this.crease.delete(r):this.crease.set(r,Math.min(10,n))}edges(){const e=new Set,t=[];for(let n=0;n<this.faceCount;n++){const r=this.faceOffsets[n],s=this.faceOffsets[n+1]-r;for(let a=0;a<s;a++){const o=this.faceCorners[r+a],l=this.faceCorners[r+(a+1)%s],c=st(o,l);e.has(c)||(e.add(c),t.push([Math.min(o,l),Math.max(o,l)]))}}return t}edgeFaceMap(){const e=new Map;for(let t=0;t<this.faceCount;t++){const n=this.faceOffsets[t],r=this.faceOffsets[t+1]-n;for(let s=0;s<r;s++){const a=st(this.faceCorners[n+s],this.faceCorners[n+(s+1)%r]),o=e.get(a);o?o.push(t):e.set(a,[t])}}return e}vertexFaces(){const e=new Map;for(let t=0;t<this.faceCount;t++)for(let n=this.faceOffsets[t];n<this.faceOffsets[t+1];n++){const r=this.faceCorners[n],s=e.get(r);s?s.push(t):e.set(r,[t])}return e}vertexNeighbors(){const e=new Map,t=(n,r)=>{const s=e.get(n);s?s.includes(r)||s.push(r):e.set(n,[r])};for(const[n,r]of this.edges())t(n,r),t(r,n);return e}triangulate(){let e=0;for(let s=0;s<this.faceCount;s++)e+=Math.max(0,this.faceSize(s)-2);const t=new Uint32Array(e*3),n=new Uint32Array(e);let r=0;for(let s=0;s<this.faceCount;s++){const a=this.faceOffsets[s],o=this.faceOffsets[s+1]-a;for(let l=1;l<o-1;l++)t[r*3]=this.faceCorners[a],t[r*3+1]=this.faceCorners[a+l],t[r*3+2]=this.faceCorners[a+l+1],n[r]=s,r++}return{tri:t,triToFace:n}}faceCenter(e){const t=this.faceOffsets[e],n=this.faceOffsets[e+1]-t;let r=0,s=0,a=0;for(let o=0;o<n;o++){const l=this.faceCorners[t+o];r+=this.positions[l*3],s+=this.positions[l*3+1],a+=this.positions[l*3+2]}return[r/n,s/n,a/n]}faceNormal(e){const t=this.faceOffsets[e],n=this.faceOffsets[e+1]-t;let r=0,s=0,a=0;for(let l=0;l<n;l++){const c=this.faceCorners[t+l],h=this.faceCorners[t+(l+1)%n],f=this.positions[c*3],u=this.positions[c*3+1],d=this.positions[c*3+2],g=this.positions[h*3],x=this.positions[h*3+1],m=this.positions[h*3+2];r+=(u-x)*(d+m),s+=(d-m)*(f+g),a+=(f-g)*(u+x)}const o=Math.hypot(r,s,a)||1;return[r/o,s/o,a/o]}faceNormals(){const e=new Float32Array(this.faceCount*3);for(let t=0;t<this.faceCount;t++){const n=this.faceNormal(t);e[t*3]=n[0],e[t*3+1]=n[1],e[t*3+2]=n[2]}return e}vertexNormals(){const e=this.faceNormals(),t=new Float32Array(this.vertexCount*3);for(let n=0;n<this.faceCount;n++)for(let r=this.faceOffsets[n];r<this.faceOffsets[n+1];r++){const s=this.faceCorners[r];t[s*3]+=e[n*3],t[s*3+1]+=e[n*3+1],t[s*3+2]+=e[n*3+2]}for(let n=0;n<this.vertexCount;n++){const r=Math.hypot(t[n*3],t[n*3+1],t[n*3+2])||1;t[n*3]/=r,t[n*3+1]/=r,t[n*3+2]/=r}return t}boundsCenter(){if(this.vertexCount===0)return[0,0,0];const e=[1/0,1/0,1/0],t=[-1/0,-1/0,-1/0];for(let n=0;n<this.positions.length;n+=3)for(let r=0;r<3;r++){const s=this.positions[n+r];s<e[r]&&(e[r]=s),s>t[r]&&(t[r]=s)}return[(e[0]+t[0])/2,(e[1]+t[1])/2,(e[2]+t[2])/2]}stats(){let e=0;for(let t=0;t<this.faceCount;t++)e+=Math.max(0,this.faceSize(t)-2);return{vertices:this.vertexCount,edges:this.edges().length,faces:this.faceCount,triangles:e,corners:this.cornerCount}}clone(){const e=new Map;for(const[t,n]of this.uvSets)e.set(t,n.slice());return new Vi(this.positions.slice(),this.faceOffsets.slice(),this.faceCorners.slice(),{uvSets:e,crease:new Map(this.crease),cornerSharp:new Map(this.cornerSharp),polygroup:this.polygroup.slice(),materialId:this.materialId.slice(),vertexColor:this.vertexColor?this.vertexColor.slice():null})}}class tn{pos=[];offsets=[0];corners=[];uv=new Map;groups=[];materials=[];weldMap;crease=new Map;cornerSharp=new Map;constructor(e={}){this.weldMap=e.weld===!1?null:new Map}vertex(e,t,n){if(this.weldMap){const s=`${e.toFixed(5)},${t.toFixed(5)},${n.toFixed(5)}`,a=this.weldMap.get(s);if(a!==void 0)return a;const o=this.pos.length/3;return this.pos.push(e,t,n),this.weldMap.set(s,o),o}const r=this.pos.length/3;return this.pos.push(e,t,n),r}get vertexCount(){return this.pos.length/3}get faceCount(){return this.offsets.length-1}face(e,t={}){const n=[],r=[];for(let s=0;s<e.length;s++){const a=e[s];n.length&&n[n.length-1]===a||n.includes(a)||(n.push(a),r.push(s))}if(n.length>=2&&n[0]===n[n.length-1]&&(n.pop(),r.pop()),n.length<3)return-1;for(const s of n)this.corners.push(s);if(this.offsets.push(this.corners.length),this.groups.push(t.polygroup??0),this.materials.push(t.materialId??0),t.uv)for(const[s,a]of t.uv){let o=this.uv.get(s);o||(o=new Array((this.corners.length-n.length)*2).fill(0),this.uv.set(s,o));for(const l of r){const c=a[l]??[0,0];o.push(c[0],c[1])}}for(const[s,a]of this.uv){const o=this.corners.length*2;for(;a.length<o;)a.push(0)}return this.faceCount-1}build(){const e=new Map;for(const[t,n]of this.uv){const r=new Float32Array(this.corners.length*2);r.set(n.slice(0,r.length)),e.set(t,r)}return new Vi(new Float32Array(this.pos),new Uint32Array(this.offsets),new Uint32Array(this.corners),{uvSets:e,crease:this.crease,cornerSharp:this.cornerSharp,polygroup:new Uint16Array(this.groups),materialId:new Uint16Array(this.materials)})}}function t0(i,e){if(i.uvSets.size===0)return null;const t=new Map,n=i.faceOffsets[e],r=i.faceOffsets[e+1]-n;for(const[s,a]of i.uvSets){const o=[];for(let l=0;l<r;l++)o.push([a[(n+l)*2],a[(n+l)*2+1]]);t.set(s,o)}return t}function L_(i){return Array.from(i.uvSets.keys())}function D_(i,e,t,n){if(!i)return null;const r=new Map;for(const[s,a]of i){const o=a[e]??[0,0],l=a[t]??[0,0];r.set(s,[o[0]+(l[0]-o[0])*n,o[1]+(l[1]-o[1])*n])}return r}function Di(i,e,t,n,r=(a,o)=>[a,o],s=!1){for(let a=0;a<e;a++)for(let o=0;o<t;o++){const l=s?[[a,o],[a,o+1],[a+1,o+1],[a+1,o]]:[[a,o],[a+1,o],[a+1,o+1],[a,o+1]],c=[],h=[];for(const[f,u]of l){const d=f/e,g=u/t,x=n(d,g);c.push(i.vertex(x[0],x[1],x[2])),h.push(r(d,g))}i.face(c,{uv:new Map([["map1",h]])})}}function Wr(i,e,t,n,r,s){if(!(r<=0))for(let a=0;a<r;a++)for(let o=0;o<n;o++){const l=[[o,a],[o+1,a],[o+1,a+1],[o,a+1]],c=[],h=[];for(const[f,u]of l){const d=f/n*Math.PI*2,g=e*(1-u/r);c.push(i.vertex(g*Math.cos(d),t,g*Math.sin(d))),h.push([.5+Math.cos(d)*g/(e*2),.5+Math.sin(d)*g/(e*2)])}s>0&&(c.reverse(),h.reverse()),i.face(c,{uv:new Map([["map1",h]])})}}const cr={cube:{id:"cube",label:"キューブ",en:"Cube",params:[{key:"width",label:"幅",value:1,min:.05,max:6,step:.05},{key:"height",label:"高さ",value:1,min:.05,max:6,step:.05},{key:"depth",label:"奥行き",value:1,min:.05,max:6,step:.05},{key:"sdW",label:"分割数 幅",value:1,min:1,max:12,step:1},{key:"sdH",label:"分割数 高さ",value:1,min:1,max:12,step:1},{key:"sdD",label:"分割数 奥行き",value:1,min:1,max:12,step:1}],build(i){const e=new tn,t=i.width/2,n=i.height/2,r=i.depth/2,s=(a,o,l,c,h)=>Di(e,c,h,(f,u)=>[a[0]+o[0]*f+l[0]*u,a[1]+o[1]*f+l[1]*u,a[2]+o[2]*f+l[2]*u]);return s([-t,-n,r],[i.width,0,0],[0,i.height,0],i.sdW,i.sdH),s([t,-n,-r],[-i.width,0,0],[0,i.height,0],i.sdW,i.sdH),s([t,-n,r],[0,0,-i.depth],[0,i.height,0],i.sdD,i.sdH),s([-t,-n,-r],[0,0,i.depth],[0,i.height,0],i.sdD,i.sdH),s([-t,n,r],[i.width,0,0],[0,0,-i.depth],i.sdW,i.sdD),s([-t,-n,-r],[i.width,0,0],[0,0,i.depth],i.sdW,i.sdD),e.build()}},sphere:{id:"sphere",label:"スフィア",en:"Sphere",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sdAxis",label:"分割数 軸",value:20,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:12,min:2,max:64,step:1}],build(i){const e=new tn;return Di(e,i.sdAxis,i.sdHeight,(t,n)=>{const r=t*Math.PI*2,s=n*Math.PI;return[i.radius*Math.sin(s)*Math.cos(r),i.radius*Math.cos(s),i.radius*Math.sin(s)*Math.sin(r)]},(t,n)=>[t,1-n]),e.build()}},cylinder:{id:"cylinder",label:"シリンダー",en:"Cylinder",params:[{key:"radius",label:"半径",value:.6,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCaps",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const e=new tn,t=i.height/2;return Di(e,i.sdAxis,i.sdHeight,(n,r)=>{const s=n*Math.PI*2;return[i.radius*Math.cos(s),-t+r*i.height,i.radius*Math.sin(s)]},(n,r)=>[n,r],!0),Wr(e,i.radius,t,i.sdAxis,i.sdCaps,1),Wr(e,i.radius,-t,i.sdAxis,i.sdCaps,-1),e.build()}},cone:{id:"cone",label:"コーン",en:"Cone",params:[{key:"radius",label:"半径",value:.7,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCap",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const e=new tn,t=i.height/2;return Di(e,i.sdAxis,i.sdHeight,(n,r)=>{const s=n*Math.PI*2;return[i.radius*(1-r)*Math.cos(s),-t+r*i.height,i.radius*(1-r)*Math.sin(s)]},(n,r)=>[n,r],!0),Wr(e,i.radius,-t,i.sdAxis,i.sdCap,-1),e.build()}},torus:{id:"torus",label:"トーラス",en:"Torus",params:[{key:"radius",label:"半径",value:1,min:.1,max:4,step:.05},{key:"section",label:"断面半径",value:.32,min:.02,max:2,step:.02},{key:"twist",label:"ツイスト",value:0,min:0,max:360,step:5},{key:"sdAxis",label:"分割数 軸",value:24,min:3,max:80,step:1},{key:"sdHeight",label:"分割数 断面",value:12,min:3,max:48,step:1}],build(i){const e=new tn,t=i.twist*Math.PI/180;return Di(e,i.sdAxis,i.sdHeight,(n,r)=>{const s=n*Math.PI*2,a=r*Math.PI*2+t*n,o=i.radius+i.section*Math.cos(a);return[o*Math.cos(s),i.section*Math.sin(a),o*Math.sin(s)]},(n,r)=>[n,r],!0),e.build()}},plane:{id:"plane",label:"プレーン",en:"Plane",params:[{key:"width",label:"幅",value:2,min:.05,max:10,step:.05},{key:"height",label:"奥行き",value:2,min:.05,max:10,step:.05},{key:"sdW",label:"分割数 幅",value:4,min:1,max:40,step:1},{key:"sdH",label:"分割数 奥行き",value:4,min:1,max:40,step:1}],build(i){const e=new tn;return Di(e,i.sdW,i.sdH,(t,n)=>[-i.width/2+t*i.width,0,-i.height/2+n*i.height],(t,n)=>[t,n],!0),e.build()}},disk:{id:"disk",label:"ディスク",en:"Disk",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sides",label:"サイド数",value:16,min:3,max:64,step:1},{key:"sdCaps",label:"分割数",value:1,min:1,max:10,step:1}],build(i){const e=new tn;return Wr(e,i.radius,0,i.sides,i.sdCaps,1),e.build()}},platonic:{id:"platonic",label:"正多面体",en:"Platonic",params:[{key:"kind",label:"種類",value:4,min:0,max:4,step:1,choices:["正四面体","正六面体","正八面体","正十二面体","正二十面体"]},{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05}],build(i){const e=(1+Math.sqrt(5))/2,t=1/e,n=Math.round(i.kind);let r,s;n===0?(r=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]],s=[[0,1,2],[0,3,1],[0,2,3],[1,3,2]]):n===1?(r=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]],s=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]]):n===2?(r=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],s=[[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]]):n===3?(r=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],[0,t,e],[0,t,-e],[0,-t,e],[0,-t,-e],[t,e,0],[t,-e,0],[-t,e,0],[-t,-e,0],[e,0,t],[e,0,-t],[-e,0,t],[-e,0,-t]],s=[[0,8,10,2,16],[0,16,17,1,12],[0,12,14,4,8],[8,4,18,6,10],[10,6,15,13,2],[2,13,3,17,16],[17,3,11,9,1],[1,9,5,14,12],[14,5,19,18,4],[18,19,7,15,6],[15,7,11,3,13],[9,11,7,19,5]]):(r=[[-1,e,0],[1,e,0],[-1,-e,0],[1,-e,0],[0,-1,e],[0,1,e],[0,-1,-e],[0,1,-e],[e,0,-1],[e,0,1],[-e,0,-1],[-e,0,1]],s=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]);const a=new tn({weld:!1});for(const h of r){const f=Math.hypot(h[0],h[1],h[2]);a.vertex(h[0]/f*i.radius,h[1]/f*i.radius,h[2]/f*i.radius)}for(const h of s)a.face(h);const o=a.build(),l=[];for(let h=0;h<o.faceCount;h++){const f=o.faceCenter(h),u=o.faceNormal(h),d=o.faceVerts(h);l.push(f[0]*u[0]+f[1]*u[1]+f[2]*u[2]<0?d.reverse():d)}const c=new tn({weld:!1});for(let h=0;h<o.vertexCount;h++){const f=o.getPosition(h);c.vertex(f[0],f[1],f[2])}for(const h of l)c.face(h);return c.build()}}},n0=["cube","sphere","cylinder","cone","torus","plane","disk","platonic"];function i0(i){const e=cr[i],t={};if(!e)return t;for(const n of e.params)t[n.key]=n.value;return t}function na(i,e,t){const n=i.vertexNeighbors(),r=i.edgeFaceMap(),s=new Set,a=(h,f)=>{const u=n.get(f);if(!u||u.length!==4)return-1;const d=r.get(st(h,f))??[];for(const g of u){if(g===h)continue;if(!(r.get(st(f,g))??[]).some(m=>d.includes(m)))return g}return-1},o=[],l=(h,f,u,d)=>{let g=!0;for(let x=0;x<1e5;x++){const m=st(h,f);if(s.has(m)&&!g)return!0;g&&d||(s.add(m),u?o.push([h,f]):o.unshift([f,h])),g=!1;const p=a(h,f);if(p<0)return!1;h=f,f=p}return!1},c=l(e,t,!0,!1);return c||l(t,e,!1,!0),{edges:o,closed:c}}function r0(i,e,t){const n=i.edgeFaceMap(),r=new Set,s=[],a=[],o=(f,u,d,g)=>{for(let x=0;x<1e5;x++){const p=(n.get(st(f,u))??[]).find(y=>y!==d);if(p===void 0)return!1;if(r.has(p))return!0;const E=i.faceVerts(p);if(E.length!==4)return!1;r.add(p);let w=-1;for(let y=0;y<4;y++)if(E[y]===f&&E[(y+1)%4]===u){w=y;break}if(w<0){for(let y=0;y<4;y++)if(E[y]===u&&E[(y+1)%4]===f){w=y;break}}if(w<0)return!1;const M=E[(w+2)%4],T=E[(w+3)%4];g.push([T,M]),d=p,f=T,u=M}return!1},l=n.get(st(e,t))??[],c=o(e,t,-1,s);if(!c){const f=l.find(u=>r.has(u));o(t,e,f??-1,a)}const h=[...a.reverse(),[e,t],...s];if(c&&h.length>1){const f=h[h.length-1];st(f[0],f[1])===st(e,t)&&h.pop()}return{edges:h,closed:c}}function Jl(i,e,t){const n=i.edges.map(l=>st(l[0],l[1]));let r=n.indexOf(e),s=n.indexOf(t);if(r<0||s<0)return null;r>s&&([r,s]=[s,r]);const a=i.edges.slice(r,s+1);if(!i.closed)return a;const o=[...i.edges.slice(s),...i.edges.slice(0,r+1)];return o.length<a.length?o:a}function oh(i,e){const t=i.edgeFaceMap(),n=new Set([e]),r=[e],s=[];for(;r.length;){const a=r.pop();s.push(a);const o=i.faceVerts(a);for(let l=0;l<o.length;l++){const c=t.get(st(o[l],o[(l+1)%o.length]))??[];for(const h of c)n.has(h)||(n.add(h),r.push(h))}}return s}function s0(i,e){const t=new Set;for(const n of oh(i,e))for(const r of i.faceVerts(n))t.add(r);return Array.from(t)}function a0(i){const e=[];for(const[t,n]of i.edges)e.includes(t)||e.push(t),e.includes(n)||e.push(n);return e}function I_(i){const e=[];for(const[t,n]of i.edgeFaceMap())if(n.length===1){const[r,s]=t.split("_").map(Number);e.push([r,s])}return e}function U_(i,e){const t=i.vertexNeighbors(),n=new Set(e);for(const r of Array.from(n))for(const s of t.get(r)??[])n.add(s);return Array.from(n)}function N_(i,e){const t=i.vertexNeighbors(),n=new Set(e);return Array.from(n).filter(r=>(t.get(r)??[]).every(s=>n.has(s)))}function F_(i,e){const t=i.edgeFaceMap(),n=new Set(e);for(const r of Array.from(n)){const s=i.faceVerts(r);for(let a=0;a<s.length;a++)for(const o of t.get(st(s[a],s[(a+1)%s.length]))??[])n.add(o)}return Array.from(n)}function O_(i,e){const t=i.edgeFaceMap(),n=new Set(e);return Array.from(n).filter(r=>{const s=i.faceVerts(r);for(let a=0;a<s.length;a++)for(const o of t.get(st(s[a],s[(a+1)%s.length]))??[])if(!n.has(o))return!1;return!0})}function o0(i){let e=0,t=0;for(const n of i)e+=n[0],t+=n[1];return[e/i.length,t/i.length]}function l0(i){const e=i.edgeFaceMap(),t=i.vertexFaces(),n=i.edges(),r=[];for(let d=0;d<i.faceCount;d++)r.push(i.faceCenter(d));const s=new Map;for(const[d,g]of n){const x=st(d,g),m=i.getPosition(d),p=i.getPosition(g),E=[(m[0]+p[0])/2,(m[1]+p[1])/2,(m[2]+p[2])/2],w=e.get(x)??[];if(w.length!==2){s.set(x,E);continue}const M=r[w[0]],T=r[w[1]],y=[(m[0]+p[0]+M[0]+T[0])/4,(m[1]+p[1]+M[1]+T[1])/4,(m[2]+p[2]+M[2]+T[2])/4],C=Math.min(1,i.getCrease(d,g));s.set(x,[y[0]+(E[0]-y[0])*C,y[1]+(E[1]-y[1])*C,y[2]+(E[2]-y[2])*C])}const a=new Map;for(const[d,g]of n)(e.get(st(d,g))??[]).length===1&&((a.get(d)??a.set(d,[]).get(d)).push(g),(a.get(g)??a.set(g,[]).get(g)).push(d));const o=[];for(let d=0;d<i.vertexCount;d++){const g=i.getPosition(d),x=a.get(d);if(x&&x.length){let b=0,P=0,R=0;for(const U of x.slice(0,2)){const W=i.getPosition(U);b+=(g[0]+W[0])/2,P+=(g[1]+W[1])/2,R+=(g[2]+W[2])/2}o.push([(b+6*g[0])/8,(P+6*g[1])/8,(R+6*g[2])/8]);continue}const m=t.get(d)??[],p=m.length;if(!p){o.push([g[0],g[1],g[2]]);continue}let E=0,w=0,M=0;for(const b of m)E+=r[b][0],w+=r[b][1],M+=r[b][2];E/=p,w/=p,M/=p;let T=0,y=0,C=0,v=0;for(const[b,P]of n){if(b!==d&&P!==d)continue;const R=b===d?P:b,U=i.getPosition(R);T+=(g[0]+U[0])/2,y+=(g[1]+U[1])/2,C+=(g[2]+U[2])/2,v++}v?(T/=v,y/=v,C/=v):(T=g[0],y=g[1],C=g[2]),o.push([(E+2*T+(p-3)*g[0])/p,(w+2*y+(p-3)*g[1])/p,(M+2*C+(p-3)*g[2])/p])}const l=new tn({weld:!1}),c=[];for(const d of o)c.push(l.vertex(d[0],d[1],d[2]));const h=new Map;for(const[d,g]of n){const x=st(d,g),m=s.get(x);h.set(x,l.vertex(m[0],m[1],m[2]))}const f=[];for(const d of r)f.push(l.vertex(d[0],d[1],d[2]));for(let d=0;d<i.faceCount;d++){const g=i.faceVerts(d),x=t0(i,d),m=i.polygroup[d],p=i.materialId[d],E=g.length,w=new Map;if(x)for(const[M,T]of x)w.set(M,o0(T));for(let M=0;M<E;M++){const T=g[M],y=g[(M+1)%E],C=g[(M-1+E)%E];let v;if(x){v=new Map;for(const[b,P]of x){const R=P[M]??[0,0],U=P[(M+1)%E]??[0,0],W=P[(M-1+E)%E]??[0,0];v.set(b,[R,[(R[0]+U[0])/2,(R[1]+U[1])/2],w.get(b),[(W[0]+R[0])/2,(W[1]+R[1])/2]])}}l.face([c[T],h.get(st(T,y)),f[d],h.get(st(C,T))],{uv:v,polygroup:m,materialId:p})}}const u=l.build();for(const[d,g]of i.crease){const x=g-1;if(x<=0)continue;const[m,p]=d.split("_").map(Number),E=h.get(st(m,p));E!==void 0&&(u.setCrease(c[m],E,x),u.setCrease(E,c[p],x))}for(const[d,g]of i.cornerSharp){const x=g-1;x>0&&u.cornerSharp.set(c[d],x)}return u}function c0(i,e){let t=i;for(let n=0;n<e;n++)t=l0(t);return t}function Xr(i,e){return i^=e&255,i=Math.imul(i,16777619),i^=e>>>8&255,i=Math.imul(i,16777619),i^=e>>>16&255,i=Math.imul(i,16777619),i^=e>>>24&255,i=Math.imul(i,16777619),i>>>0}function lh(i){let e=2166136261;e=Xr(e,i.vertexCount),e=Xr(e,i.faceCount);for(let t=0;t<i.faceOffsets.length;t++)e=Xr(e,i.faceOffsets[t]);for(let t=0;t<i.faceCorners.length;t++)e=Xr(e,i.faceCorners[t]);return e.toString(16).padStart(8,"0")}function B_(i,e){if(i.vertexCount!==e.vertexCount)return{same:!1,reason:"vertexCount"};if(i.faceCount!==e.faceCount)return{same:!1,reason:"faceCount"};if(i.faceCorners.length!==e.faceCorners.length)return{same:!1,reason:"faceOrder"};for(let t=0;t<i.faceOffsets.length;t++)if(i.faceOffsets[t]!==e.faceOffsets[t])return{same:!1,reason:"faceOrder"};for(let t=0;t<i.faceCorners.length;t++)if(i.faceCorners[t]!==e.faceCorners[t])return{same:!1,reason:"faceOrder"};return{same:!0}}function ch(){return{position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]}}function ro(i){const[e,t,n]=i.position,[r,s,a,o]=i.rotation,[l,c,h]=i.scale;return{position:[e,t,n],rotation:[r,s,a,o],scale:[l,c,h]}}class so{id;name;kind;parametric;params;transform;mesh;multires=[];sculptLayers=[];paintLayers=[];activeLevel=0;visible=!0;exportedTopologyHash=null;constructor(e,t,n){this.id=t,this.kind=e;const r=cr[e];this.name=n??(r?r.en.replace(/\s/g,""):"mesh")+t,this.parametric=!!r,this.params=i0(e),this.transform=ch(),this.mesh=r?r.build(this.params):Vi.empty()}rebuild(){if(!this.parametric)return;const e=cr[this.kind];e&&(this.mesh=e.build(this.params))}markTopologyChanged(){const e=this.multires.length,t=this.sculptLayers.length;return this.parametric=!1,this.multires=[],this.sculptLayers=[],this.activeLevel=0,{droppedLevels:e,droppedLayers:t}}topologyHash(){return lh(this.mesh)}hasUv(){return this.mesh.uvSets.size>0}}class hh{objects=[];settings={};cameraBookmarks=[];nextId=1;newId(){return String(this.nextId++)}addObject(e){const t=new so(e,this.newId());return this.objects.push(t),t}addMesh(e,t){const n=new so("mesh",this.newId(),t);return n.parametric=!1,n.mesh=e,this.objects.push(n),n}remove(e){const t=this.objects.indexOf(e);t>=0&&this.objects.splice(t,1)}find(e){return this.objects.find(t=>t.id===e)}syncIdCounter(){let e=0;for(const t of this.objects){const n=Number(t.id);Number.isFinite(n)&&n>e&&(e=n)}this.nextId=e+1}stats(){let e=0,t=0,n=0;for(const r of this.objects){const s=r.mesh.stats();e+=s.vertices,t+=s.faces,n+=s.triangles}return{objects:this.objects.length,vertices:e,faces:t,triangles:n}}}function h0(i){const e=[],t=[],n=[];let r=null,s="mesh",a=new Map,o=!1,l=0;const c=new Map,h=()=>{r&&r.faceCount>0&&n.push({name:s,mesh:r.build()}),r=null,a=new Map,o=!1},f=()=>(r||(r=new tn({weld:!1})),r);for(const u of i.split(/\r?\n/)){const d=u.trim();if(!d||d.startsWith("#"))continue;const g=d.split(/\s+/),x=g[0];if(x==="v")e.push([Number(g[1]),Number(g[2]),Number(g[3])]);else if(x==="vt")t.push([Number(g[1]),Number(g[2]??0)]);else if(x==="o")h(),s=g.slice(1).join("_")||"mesh";else if(x==="g"){const m=g.slice(1).join("_")||"default";let p=c.get(m);p===void 0&&(p=c.size,c.set(m,p)),l=p,s==="mesh"&&!r&&(s=m)}else if(x==="f"){const m=f(),p=[],E=[];for(let w=1;w<g.length;w++){const M=g[w].split("/");let T=parseInt(M[0],10);if(!Number.isFinite(T))continue;T<0&&(T=e.length+T+1);let y=a.get(T);if(y===void 0){const v=e[T-1];if(!v)continue;y=m.vertex(v[0],v[1],v[2]),a.set(T,y)}if(p.includes(y))continue;p.push(y);let C=M[1]?parseInt(M[1],10):NaN;if(Number.isFinite(C)){C<0&&(C=t.length+C+1);const v=t[C-1];v?(E.push(v),o=!0):E.push([0,0])}else E.push([0,0])}p.length>=3&&m.face(p,{uv:o?new Map([["map1",E]]):void 0,polygroup:l})}}return h(),n}function u0(i){const e=["# macbeth"];let t=1,n=1;for(const r of i){const{mesh:s}=r;e.push(`o ${r.name.replace(/\s+/g,"_")}`);for(let c=0;c<s.vertexCount;c++){const h=s.getPosition(c),f=r.toWorld?r.toWorld(h[0],h[1],h[2]):h;e.push(`v ${f[0].toFixed(6)} ${f[1].toFixed(6)} ${f[2].toFixed(6)}`)}const a=s.uvSets.get("map1")??s.uvSets.values().next().value??null;if(a)for(let c=0;c<s.cornerCount;c++)e.push(`vt ${a[c*2].toFixed(6)} ${a[c*2+1].toFixed(6)}`);const o=new Map;for(let c=0;c<s.faceCount;c++){const h=s.polygroup[c],f=o.get(h);f?f.push(c):o.set(h,[c])}const l=o.size<=1;for(const[c,h]of o){l||e.push(`g group${c}`);for(const f of h){const u=[];for(let d=s.faceOffsets[f];d<s.faceOffsets[f+1];d++){const g=s.faceCorners[d]+t;u.push(a?`${g}/${d+n}`:`${g}`)}e.push(`f ${u.join(" ")}`)}}t+=s.vertexCount,a&&(n+=s.cornerCount)}return e.join(`
`)+`
`}const uh="MBMESH\0\0",fh=1;function ao(i){return i+3&-4}function f0(i){let e=16;for(const s of i)e+=8+ao(s.data.byteLength);const t=new Uint8Array(e),n=new DataView(t.buffer);for(let s=0;s<8;s++)t[s]=uh.charCodeAt(s);n.setUint32(8,fh,!0),n.setUint32(12,i.length,!0);let r=16;for(const s of i){for(let a=0;a<4;a++)t[r+a]=s.tag.charCodeAt(a);n.setUint32(r+4,s.data.byteLength,!0),t.set(s.data,r+8),r+=8+ao(s.data.byteLength)}return t}function d0(i){for(let a=0;a<8;a++)if(i[a]!==uh.charCodeAt(a))throw new Error("メッシュのバイナリ形式ではありません");const e=new DataView(i.buffer,i.byteOffset,i.byteLength),t=e.getUint32(8,!0),n=e.getUint32(12,!0),r=new Map;let s=16;for(let a=0;a<n;a++){let o="";for(let c=0;c<4;c++)o+=String.fromCharCode(i[s+c]);const l=e.getUint32(s+4,!0);r.set(o,i.subarray(s+8,s+8+l)),s+=8+ao(l)}return{version:t,chunks:r}}function jt(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function qr(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Yr(i){return new Uint32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Ql(i){return new Uint16Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}const p0=new TextEncoder,m0=new TextDecoder;function g0(i){const e=[{tag:"POSI",data:jt(i.positions)},{tag:"FOFF",data:jt(i.faceOffsets)},{tag:"FCOR",data:jt(i.faceCorners)}];if(i.polygroup.some(t=>t!==0)&&e.push({tag:"PGRP",data:jt(i.polygroup)}),i.materialId.some(t=>t!==0)&&e.push({tag:"MTID",data:jt(i.materialId)}),i.vertexColor&&e.push({tag:"VCOL",data:jt(i.vertexColor)}),i.crease.size){const t=new Uint32Array(i.crease.size*2),n=new Float32Array(i.crease.size);let r=0;for(const[s,a]of i.crease){const[o,l]=s.split("_").map(Number);t[r*2]=o,t[r*2+1]=l,n[r]=a,r++}e.push({tag:"CRID",data:jt(t)},{tag:"CRSH",data:jt(n)})}if(i.cornerSharp.size){const t=new Uint32Array(i.cornerSharp.size),n=new Float32Array(i.cornerSharp.size);let r=0;for(const[s,a]of i.cornerSharp)t[r]=s,n[r]=a,r++;e.push({tag:"CNID",data:jt(t)},{tag:"CNSH",data:jt(n)})}if(i.uvSets.size){const t=Array.from(i.uvSets.keys());e.push({tag:"UVNM",data:p0.encode(JSON.stringify(t))}),t.forEach((n,r)=>{e.push({tag:`UV${String(r).padStart(2,"0")}`,data:jt(i.uvSets.get(n))})})}return f0(e)}function _0(i){const{version:e,chunks:t}=d0(i);if(e>fh)throw new Error(`このメッシュは新しい版 (v${e}) で保存されています。アプリを更新してください`);const n=qr(t.get("POSI")),r=Yr(t.get("FOFF")),s=Yr(t.get("FCOR")),a=new Map,o=t.get("UVNM");o&&JSON.parse(m0.decode(o)).forEach((w,M)=>{const T=t.get(`UV${String(M).padStart(2,"0")}`);T&&a.set(w,qr(T))});const l=new Map,c=t.get("CRID"),h=t.get("CRSH");if(c&&h){const E=Yr(c),w=qr(h);for(let M=0;M<w.length;M++){const T=E[M*2],y=E[M*2+1];l.set(T<y?`${T}_${y}`:`${y}_${T}`,w[M])}}const f=new Map,u=t.get("CNID"),d=t.get("CNSH");if(u&&d){const E=Yr(u),w=qr(d);for(let M=0;M<w.length;M++)f.set(E[M],w[M])}const g=Math.max(0,r.length-1),x=t.get("PGRP"),m=t.get("MTID"),p=t.get("VCOL");return new Vi(n,r,s,{uvSets:a,crease:l,cornerSharp:f,polygroup:x?Ql(x):new Uint16Array(g),materialId:m?Ql(m):new Uint16Array(g),vertexColor:p?new Uint8Array(p):null})}var dt=Uint8Array,Wt=Uint16Array,Ro=Int32Array,_s=new dt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),vs=new dt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),oo=new dt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),dh=function(i,e){for(var t=new Wt(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new Ro(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return{b:t,r}},ph=dh(_s,2),mh=ph.b,lo=ph.r;mh[28]=258,lo[258]=28;var gh=dh(vs,0),v0=gh.b,jl=gh.r,co=new Wt(32768);for(var at=0;at<32768;++at){var Xn=(at&43690)>>1|(at&21845)<<1;Xn=(Xn&52428)>>2|(Xn&13107)<<2,Xn=(Xn&61680)>>4|(Xn&3855)<<4,co[at]=((Xn&65280)>>8|(Xn&255)<<8)>>1}var xn=(function(i,e,t){for(var n=i.length,r=0,s=new Wt(e);r<n;++r)i[r]&&++s[i[r]-1];var a=new Wt(e);for(r=1;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new Wt(1<<e);var l=15-e;for(r=0;r<n;++r)if(i[r])for(var c=r<<4|i[r],h=e-i[r],f=a[i[r]-1]++<<h,u=f|(1<<h)-1;f<=u;++f)o[co[f]>>l]=c}else for(o=new Wt(n),r=0;r<n;++r)i[r]&&(o[r]=co[a[i[r]-1]++]>>15-i[r]);return o}),Qn=new dt(288);for(var at=0;at<144;++at)Qn[at]=8;for(var at=144;at<256;++at)Qn[at]=9;for(var at=256;at<280;++at)Qn[at]=7;for(var at=280;at<288;++at)Qn[at]=8;var hr=new dt(32);for(var at=0;at<32;++at)hr[at]=5;var x0=xn(Qn,9,0),M0=xn(Qn,9,1),S0=xn(hr,5,0),y0=xn(hr,5,1),ia=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},en=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},ra=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},Po=function(i){return(i+7)/8|0},mr=function(i,e,t){return(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length),new dt(i.subarray(e,t))},b0=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Pt=function(i,e,t){var n=new Error(e||b0[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Pt),!t)throw n;return n},E0=function(i,e,t,n){var r=i.length,s=n?n.length:0;if(!r||e.f&&!e.l)return t||new dt(0);var a=!t,o=a||e.i!=2,l=e.i;a&&(t=new dt(r*3));var c=function(be){var Qe=t.length;if(be>Qe){var Ue=new dt(Math.max(Qe*2,be));Ue.set(t),t=Ue}},h=e.f||0,f=e.p||0,u=e.b||0,d=e.l,g=e.d,x=e.m,m=e.n,p=r*8;do{if(!d){h=en(i,f,1);var E=en(i,f+1,3);if(f+=3,E)if(E==1)d=M0,g=y0,x=9,m=5;else if(E==2){var y=en(i,f,31)+257,C=en(i,f+10,15)+4,v=y+en(i,f+5,31)+1;f+=14;for(var b=new dt(v),P=new dt(19),R=0;R<C;++R)P[oo[R]]=en(i,f+R*3,7);f+=C*3;for(var U=ia(P),W=(1<<U)-1,X=xn(P,U,1),R=0;R<v;){var O=X[en(i,f,W)];f+=O&15;var w=O>>4;if(w<16)b[R++]=w;else{var G=0,B=0;for(w==16?(B=3+en(i,f,3),f+=2,G=b[R-1]):w==17?(B=3+en(i,f,7),f+=3):w==18&&(B=11+en(i,f,127),f+=7);B--;)b[R++]=G}}var K=b.subarray(0,y),Q=b.subarray(y);x=ia(K),m=ia(Q),d=xn(K,x,1),g=xn(Q,m,1)}else Pt(1);else{var w=Po(f)+4,M=i[w-4]|i[w-3]<<8,T=w+M;if(T>r){l&&Pt(0);break}o&&c(u+M),t.set(i.subarray(w,T),u),e.b=u+=M,e.p=f=T*8,e.f=h;continue}if(f>p){l&&Pt(0);break}}o&&c(u+131072);for(var re=(1<<x)-1,ie=(1<<m)-1,de=f;;de=f){var G=d[ra(i,f)&re],De=G>>4;if(f+=G&15,f>p){l&&Pt(0);break}if(G||Pt(2),De<256)t[u++]=De;else if(De==256){de=f,d=null;break}else{var ke=De-254;if(De>264){var R=De-257,Te=_s[R];ke=en(i,f,(1<<Te)-1)+mh[R],f+=Te}var $=g[ra(i,f)&ie],te=$>>4;$||Pt(3),f+=$&15;var Q=v0[te];if(te>3){var Te=vs[te];Q+=ra(i,f)&(1<<Te)-1,f+=Te}if(f>p){l&&Pt(0);break}o&&c(u+131072);var ee=u+ke;if(u<Q){var Ce=s-Q,Le=Math.min(Q,ee);for(Ce+u<0&&Pt(3);u<Le;++u)t[u]=n[Ce+u]}for(;u<ee;++u)t[u]=t[u-Q]}}e.l=d,e.p=de,e.b=u,e.f=h,d&&(h=1,e.m=x,e.d=g,e.n=m)}while(!h);return u!=t.length&&a?mr(t,0,u):t.subarray(0,u)},wn=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8},Qi=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8,i[n+2]|=t>>16},sa=function(i,e){for(var t=[],n=0;n<i.length;++n)i[n]&&t.push({s:n,f:i[n]});var r=t.length,s=t.slice();if(!r)return{t:vh,l:0};if(r==1){var a=new dt(t[0].s+1);return a[t[0].s]=1,{t:a,l:1}}t.sort(function(T,y){return T.f-y.f}),t.push({s:-1,f:25001});var o=t[0],l=t[1],c=0,h=1,f=2;for(t[0]={s:-1,f:o.f+l.f,l:o,r:l};h!=r-1;)o=t[t[c].f<t[f].f?c++:f++],l=t[c!=h&&t[c].f<t[f].f?c++:f++],t[h++]={s:-1,f:o.f+l.f,l:o,r:l};for(var u=s[0].s,n=1;n<r;++n)s[n].s>u&&(u=s[n].s);var d=new Wt(u+1),g=ho(t[h-1],d,0);if(g>e){var n=0,x=0,m=g-e,p=1<<m;for(s.sort(function(y,C){return d[C.s]-d[y.s]||y.f-C.f});n<r;++n){var E=s[n].s;if(d[E]>e)x+=p-(1<<g-d[E]),d[E]=e;else break}for(x>>=m;x>0;){var w=s[n].s;d[w]<e?x-=1<<e-d[w]++-1:++n}for(;n>=0&&x;--n){var M=s[n].s;d[M]==e&&(--d[M],++x)}g=e}return{t:new dt(d),l:g}},ho=function(i,e,t){return i.s==-1?Math.max(ho(i.l,e,t+1),ho(i.r,e,t+1)):e[i.s]=t},ec=function(i){for(var e=i.length;e&&!i[--e];);for(var t=new Wt(++e),n=0,r=i[0],s=1,a=function(l){t[n++]=l},o=1;o<=e;++o)if(i[o]==r&&o!=e)++s;else{if(!r&&s>2){for(;s>138;s-=138)a(32754);s>2&&(a(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(a(r),--s;s>6;s-=6)a(8304);s>2&&(a(s-3<<5|8208),s=0)}for(;s--;)a(r);s=1,r=i[o]}return{c:t.subarray(0,n),n:e}},ji=function(i,e){for(var t=0,n=0;n<e.length;++n)t+=i[n]*e[n];return t},_h=function(i,e,t){var n=t.length,r=Po(e+2);i[r]=n&255,i[r+1]=n>>8,i[r+2]=i[r]^255,i[r+3]=i[r+1]^255;for(var s=0;s<n;++s)i[r+s+4]=t[s];return(r+4+n)*8},tc=function(i,e,t,n,r,s,a,o,l,c,h){wn(e,h++,t),++r[256];for(var f=sa(r,15),u=f.t,d=f.l,g=sa(s,15),x=g.t,m=g.l,p=ec(u),E=p.c,w=p.n,M=ec(x),T=M.c,y=M.n,C=new Wt(19),v=0;v<E.length;++v)++C[E[v]&31];for(var v=0;v<T.length;++v)++C[T[v]&31];for(var b=sa(C,7),P=b.t,R=b.l,U=19;U>4&&!P[oo[U-1]];--U);var W=c+5<<3,X=ji(r,Qn)+ji(s,hr)+a,O=ji(r,u)+ji(s,x)+a+14+3*U+ji(C,P)+2*C[16]+3*C[17]+7*C[18];if(l>=0&&W<=X&&W<=O)return _h(e,h,i.subarray(l,l+c));var G,B,K,Q;if(wn(e,h,1+(O<X)),h+=2,O<X){G=xn(u,d,0),B=u,K=xn(x,m,0),Q=x;var re=xn(P,R,0);wn(e,h,w-257),wn(e,h+5,y-1),wn(e,h+10,U-4),h+=14;for(var v=0;v<U;++v)wn(e,h+3*v,P[oo[v]]);h+=3*U;for(var ie=[E,T],de=0;de<2;++de)for(var De=ie[de],v=0;v<De.length;++v){var ke=De[v]&31;wn(e,h,re[ke]),h+=P[ke],ke>15&&(wn(e,h,De[v]>>5&127),h+=De[v]>>12)}}else G=x0,B=Qn,K=S0,Q=hr;for(var v=0;v<o;++v){var Te=n[v];if(Te>255){var ke=Te>>18&31;Qi(e,h,G[ke+257]),h+=B[ke+257],ke>7&&(wn(e,h,Te>>23&31),h+=_s[ke]);var $=Te&31;Qi(e,h,K[$]),h+=Q[$],$>3&&(Qi(e,h,Te>>5&8191),h+=vs[$])}else Qi(e,h,G[Te]),h+=B[Te]}return Qi(e,h,G[256]),h+B[256]},T0=new Ro([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),vh=new dt(0),A0=function(i,e,t,n,r,s){var a=s.z||i.length,o=new dt(n+a+5*(1+Math.ceil(a/7e3))+r),l=o.subarray(n,o.length-r),c=s.l,h=(s.r||0)&7;if(e){h&&(l[0]=s.r>>3);for(var f=T0[e-1],u=f>>13,d=f&8191,g=(1<<t)-1,x=s.p||new Wt(32768),m=s.h||new Wt(g+1),p=Math.ceil(t/3),E=2*p,w=function(Ye){return(i[Ye]^i[Ye+1]<<p^i[Ye+2]<<E)&g},M=new Ro(25e3),T=new Wt(288),y=new Wt(32),C=0,v=0,b=s.i||0,P=0,R=s.w||0,U=0;b+2<a;++b){var W=w(b),X=b&32767,O=m[W];if(x[X]=O,m[W]=X,R<=b){var G=a-b;if((C>7e3||P>24576)&&(G>423||!c)){h=tc(i,l,0,M,T,y,v,P,U,b-U,h),P=C=v=0,U=b;for(var B=0;B<286;++B)T[B]=0;for(var B=0;B<30;++B)y[B]=0}var K=2,Q=0,re=d,ie=X-O&32767;if(G>2&&W==w(b-ie))for(var de=Math.min(u,G)-1,De=Math.min(32767,b),ke=Math.min(258,G);ie<=De&&--re&&X!=O;){if(i[b+K]==i[b+K-ie]){for(var Te=0;Te<ke&&i[b+Te]==i[b+Te-ie];++Te);if(Te>K){if(K=Te,Q=ie,Te>de)break;for(var $=Math.min(ie,Te-2),te=0,B=0;B<$;++B){var ee=b-ie+B&32767,Ce=x[ee],Le=ee-Ce&32767;Le>te&&(te=Le,O=ee)}}}X=O,O=x[X],ie+=X-O&32767}if(Q){M[P++]=268435456|lo[K]<<18|jl[Q];var be=lo[K]&31,Qe=jl[Q]&31;v+=_s[be]+vs[Qe],++T[257+be],++y[Qe],R=b+K,++C}else M[P++]=i[b],++T[i[b]]}}for(b=Math.max(b,R);b<a;++b)M[P++]=i[b],++T[i[b]];h=tc(i,l,c,M,T,y,v,P,U,b-U,h),c||(s.r=h&7|l[h/8|0]<<3,h-=7,s.h=m,s.p=x,s.i=b,s.w=R)}else{for(var b=s.w||0;b<a+c;b+=65535){var Ue=b+65535;Ue>=a&&(l[h/8|0]=c,Ue=a),h=_h(l,h+1,i.subarray(b,Ue))}s.i=a}return mr(o,0,n+Po(h)+r)},w0=(function(){for(var i=new Int32Array(256),e=0;e<256;++e){for(var t=e,n=9;--n;)t=(t&1&&-306674912)^t>>>1;i[e]=t}return i})(),C0=function(){var i=-1;return{p:function(e){for(var t=i,n=0;n<e.length;++n)t=w0[t&255^e[n]]^t>>>8;i=t},d:function(){return~i}}},R0=function(i,e,t,n,r){if(!r&&(r={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),a=new dt(s.length+i.length);a.set(s),a.set(i,s.length),i=a,r.w=s.length}return A0(i,e.level==null?6:e.level,e.mem==null?r.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+e.mem,t,n,r)},xh=function(i,e){var t={};for(var n in i)t[n]=i[n];for(var n in e)t[n]=e[n];return t},dn=function(i,e){return i[e]|i[e+1]<<8},$t=function(i,e){return(i[e]|i[e+1]<<8|i[e+2]<<16|i[e+3]<<24)>>>0},aa=function(i,e){return $t(i,e)+$t(i,e+4)*4294967296},Tt=function(i,e,t){for(;t;++e)i[e]=t,t>>>=8};function P0(i,e){return R0(i,e||{},0,0)}function L0(i,e){return E0(i,{i:2},e&&e.out,e&&e.dictionary)}var Mh=function(i,e,t,n){for(var r in i){var s=i[r],a=e+r,o=n;Array.isArray(s)&&(o=xh(n,s[1]),s=s[0]),ArrayBuffer.isView(s)?t[a]=[s,o]:(t[a+="/"]=[new dt(0),o],Mh(s,a,t,n))}},nc=typeof TextEncoder<"u"&&new TextEncoder,uo=typeof TextDecoder<"u"&&new TextDecoder,D0=0;try{uo.decode(vh,{stream:!0}),D0=1}catch{}var I0=function(i){for(var e="",t=0;;){var n=i[t++],r=(n>127)+(n>223)+(n>239);if(t+r>i.length)return{s:e,r:mr(i,t-1)};r?r==3?(n=((n&15)<<18|(i[t++]&63)<<12|(i[t++]&63)<<6|i[t++]&63)-65536,e+=String.fromCharCode(55296|n>>10,56320|n&1023)):r&1?e+=String.fromCharCode((n&31)<<6|i[t++]&63):e+=String.fromCharCode((n&15)<<12|(i[t++]&63)<<6|i[t++]&63):e+=String.fromCharCode(n)}};function ic(i,e){var t;if(nc)return nc.encode(i);for(var n=i.length,r=new dt(i.length+(i.length>>1)),s=0,a=function(c){r[s++]=c},t=0;t<n;++t){if(s+5>r.length){var o=new dt(s+8+(n-t<<1));o.set(r),r=o}var l=i.charCodeAt(t);l<128||e?a(l):l<2048?(a(192|l>>6),a(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|i.charCodeAt(++t)&1023,a(240|l>>18),a(128|l>>12&63),a(128|l>>6&63),a(128|l&63)):(a(224|l>>12),a(128|l>>6&63),a(128|l&63))}return mr(r,0,s)}function U0(i,e){if(e){for(var t="",n=0;n<i.length;n+=16384)t+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return t}else{if(uo)return uo.decode(i);var r=I0(i),s=r.s,t=r.r;return t.length&&Pt(8),s}}var N0=function(i,e){return e+30+dn(i,e+26)+dn(i,e+28)},F0=function(i,e,t){var n=dn(i,e+28),r=dn(i,e+30),s=U0(i.subarray(e+46,e+46+n),!(dn(i,e+8)&2048)),a=e+46+n,o=O0(i,a,r,t,$t(i,e+20),$t(i,e+24),$t(i,e+42)),l=o[0],c=o[1],h=o[2];return[dn(i,e+10),l,c,s,a+r+dn(i,e+32),h]},O0=function(i,e,t,n,r,s,a){var o=r==4294967295,l=s==4294967295,c=a==4294967295,h=e+t,f=o+l+c;if(n&&f){for(;e+4<h;e+=4+dn(i,e+2))if(dn(i,e)==1)return[o?aa(i,e+4+8*l):r,l?aa(i,e+4):s,c?aa(i,e+4+8*(l+o)):a,1];n<2&&Pt(13)}return[r,s,a,0]},fo=function(i){var e=0;if(i)for(var t in i){var n=i[t].length;n>65535&&Pt(9),e+=n+4}return e},rc=function(i,e,t,n,r,s,a,o){var l=n.length,c=t.extra,h=o&&o.length,f=fo(c);Tt(i,e,a!=null?33639248:67324752),e+=4,a!=null&&(i[e++]=20,i[e++]=t.os),i[e]=20,e+=2,i[e++]=t.flag<<1|(s<0&&8),i[e++]=r&&8,i[e++]=t.compression&255,i[e++]=t.compression>>8;var u=new Date(t.mtime==null?Date.now():t.mtime),d=u.getFullYear()-1980;if((d<0||d>119)&&Pt(10),Tt(i,e,d<<25|u.getMonth()+1<<21|u.getDate()<<16|u.getHours()<<11|u.getMinutes()<<5|u.getSeconds()>>1),e+=4,s!=-1&&(Tt(i,e,t.crc),Tt(i,e+4,s<0?-s-2:s),Tt(i,e+8,t.size)),Tt(i,e+12,l),Tt(i,e+14,f),e+=16,a!=null&&(Tt(i,e,h),Tt(i,e+6,t.attrs),Tt(i,e+10,a),e+=14),i.set(n,e),e+=l,f)for(var g in c){var x=c[g],m=x.length;Tt(i,e,+g),Tt(i,e+2,m),i.set(x,e+4),e+=4+m}return h&&(i.set(o,e),e+=h),e},B0=function(i,e,t,n,r){Tt(i,e,101010256),Tt(i,e+8,t),Tt(i,e+10,t),Tt(i,e+12,n),Tt(i,e+16,r)};function z0(i,e){e||(e={});var t={},n=[];Mh(i,"",t,e);var r=0,s=0;for(var a in t){var o=t[a],l=o[0],c=o[1],h=c.level==0?0:8,f=ic(a),u=f.length,d=c.comment,g=d&&ic(d),x=g&&g.length,m=fo(c.extra);u>65535&&Pt(11);var p=h?P0(l,c):l,E=p.length,w=C0();w.p(l),n.push(xh(c,{size:l.length,crc:w.d(),c:p,f,m:g,u:u!=a.length||g&&d.length!=x,o:r,compression:h})),r+=30+u+m+E,s+=76+2*(u+m)+(x||0)+E}for(var M=new dt(s+22),T=r,y=s-r,C=0;C<n.length;++C){var f=n[C];rc(M,f.o,f,f.f,f.u,f.c.length);var v=30+f.f.length+fo(f.extra);M.set(f.c,f.o+v),rc(M,r,f,f.f,f.u,f.c.length,f.o,f.m),r+=16+v+(f.m?f.m.length:0)}return B0(M,r,n.length,y,T),M}function k0(i,e){for(var t={},n=i.length-22;$t(i,n)!=101010256;--n)(!n||i.length-n>65558)&&Pt(13);var r=dn(i,n+8);if(!r)return{};var s=$t(i,n+16),a=$t(i,n-20)==117853008;if(a){var o=$t(i,n-12);a=$t(i,o)==101075792,a&&(r=$t(i,o+32),s=$t(i,o+48))}for(var l=0;l<r;++l){var c=F0(i,s,a),h=c[0],f=c[1],u=c[2],d=c[3],g=c[4],x=c[5],m=N0(i,x);s=g,h?h==8?t[d]=L0(i.subarray(m,m+f),{out:new dt(u)}):Pt(14,"unknown compression type "+h):t[d]=mr(i,m,m+f)}return t}const cs=1,sc=new TextEncoder,ac=new TextDecoder;function oc(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function lc(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function V0(i,e={}){const t={},n=new Date().toISOString(),r={objects:i.objects.map(a=>{t[`meshes/${a.id}.bin`]=g0(a.mesh);for(const o of a.multires)t[`multires/${a.id}/L${o.level}.bin`]=oc(o.delta);for(const o of a.sculptLayers)t[`layers/${a.id}/${o.id}.bin`]=oc(o.delta);return{id:a.id,name:a.name,kind:a.kind,parametric:a.parametric,params:a.params,transform:a.transform,visible:a.visible,activeLevel:a.activeLevel,exportedTopologyHash:a.exportedTopologyHash,multires:a.multires.map(o=>({level:o.level,count:o.delta.length})),sculptLayers:a.sculptLayers.map(o=>({id:o.id,name:o.name,level:o.level,weight:o.weight,visible:o.visible,count:o.delta.length})),paintLayers:a.paintLayers}}),settings:i.settings,cameraBookmarks:i.cameraBookmarks},s={formatVersion:cs,app:"macbeth",appVersion:e.appVersion??"0.1.0",created:n,modified:n};if(e.thumbnail&&(t["thumbnail.png"]=e.thumbnail,s.thumbnail="thumbnail.png"),e.extraFiles)for(const[a,o]of e.extraFiles)t[a]=o;return t["manifest.json"]=sc.encode(JSON.stringify(s,null,2)),t["scene.json"]=sc.encode(JSON.stringify(r)),z0(t,{level:6})}const H0={};function G0(i,e,t){let n=i;for(let r=t;r<cs;r++){const s=H0[r];if(!s)throw new Error(`版 ${r} から ${r+1} への変換がありません`);n=s(n,e)}return n}function W0(i){const e=k0(i),t=e["manifest.json"];if(!t)throw new Error("manifest.json がありません。macbeth のプロジェクトではないようです");const n=JSON.parse(ac.decode(t));if(n.formatVersion>cs)throw new Error(`このプロジェクトは新しい版 (v${n.formatVersion}) で保存されています。アプリを更新してください`);let r=JSON.parse(ac.decode(e["scene.json"]));n.formatVersion<cs&&(r=G0(r,e,n.formatVersion));const s=new hh;s.settings=r.settings??{},s.cameraBookmarks=r.cameraBookmarks??[];const a=new Set(["manifest.json","scene.json"]);for(const l of r.objects){const c=new so(l.kind,l.id,l.name);c.parametric=l.parametric,c.params=l.params,c.transform=l.transform??ch(),c.visible=l.visible??!0,c.activeLevel=l.activeLevel??0,c.exportedTopologyHash=l.exportedTopologyHash??null;const h=`meshes/${l.id}.bin`,f=e[h];if(!f)throw new Error(`${l.name} のメッシュ (${h}) がありません`);c.mesh=_0(f),a.add(h),c.multires=(l.multires??[]).map(u=>{const d=`multires/${l.id}/L${u.level}.bin`,g=e[d];return g?(a.add(d),{level:u.level,delta:lc(g)}):null}).filter(u=>u!==null),c.sculptLayers=(l.sculptLayers??[]).map(u=>{const d=`layers/${l.id}/${u.id}.bin`,g=e[d];return g?(a.add(d),{id:u.id,name:u.name,level:u.level,weight:u.weight,visible:u.visible,delta:lc(g)}):null}).filter(u=>u!==null),c.paintLayers=l.paintLayers??[],s.objects.push(c)}s.syncIdCounter();const o=new Map;for(const[l,c]of Object.entries(e))a.has(l)||o.set(l,c);return{document:s,manifest:n,extraFiles:o}}function z_(i,e){return lh(i.mesh)===e}const X0=5,q0=10,cc=12,Y0=120,$0=300,K0=400,Z0=400,hc=3;class J0{constructor(e,t,n){this.canvas=e,this.local=t,this.h=n}pointers=new Map;gesture=null;holdTimer=null;holdX=0;holdY=0;tap={t0:0,maxN:0,moved:!1,stagger:!1,lastN:0,lastT:0};fHeld=!1;fChord=!1;fingerCam=!1;attach(){const e=this.canvas;e.addEventListener("contextmenu",t=>t.preventDefault()),e.addEventListener("touchstart",t=>t.preventDefault(),{passive:!1}),e.addEventListener("touchmove",t=>t.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",t=>this.down(t)),e.addEventListener("pointermove",t=>this.move(t)),e.addEventListener("pointerup",t=>this.up(t)),e.addEventListener("pointercancel",t=>this.cancelled(t)),e.addEventListener("pointerleave",()=>{this.pointers.size||this.h.hoverLeave()}),e.addEventListener("wheel",t=>{t.preventDefault(),this.h.dolly(1+Math.sign(t.deltaY)*.09)},{passive:!1})}touchCount(){let e=0;for(const t of this.pointers.values())t.type==="touch"&&e++;return e}down(e){if(this.canvas.setPointerCapture(e.pointerId),this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,x0:e.clientX,y0:e.clientY,type:e.pointerType}),this.tapDown(e),this.pointers.size>=2){if(this.h.abort(),this.cancelHold(),this.pointers.size===2){const n=[...this.pointers.values()];this.gesture={mode:"twofinger",live:!1,acc:0,d:Math.hypot(n[0].x-n[1].x,n[0].y-n[1].y),cx:(n[0].x+n[1].x)/2,cy:(n[0].y+n[1].y)/2},this.fHeld&&(this.fChord=!0,this.gesture.zoomOnly=!0,this.gesture.pivot=this.h.zoomPivot()??void 0)}else this.gesture={mode:"idle"};return}const t=this.local(e);if(this.fHeld){this.fChord=!0,this.gesture={mode:"tool",moved:!1,sx:t.x,sy:t.y},this.h.marqueeStart(t);return}if(e.pointerType==="mouse"){if(this.h.altOn(e)){this.gesture={mode:e.button===0?"tumble":e.button===1?"pan":"dolly"};return}if(e.button===2){this.h.openMarkingMenu(e.clientX,e.clientY,this.h.shiftOn(e)),this.gesture={mode:"marking"};return}if(e.button===1){this.gesture={mode:"pan"};return}}if(e.pointerType==="touch"&&!(!this.fingerCam&&this.h.isOnMesh(t))){this.gesture={mode:"tumble",live:!1,acc:0},this.startHold(e.clientX,e.clientY,this.h.shiftOn(e));return}this.gesture={mode:"tool",moved:!1,sx:t.x,sy:t.y},e.pointerType!=="mouse"&&this.startHold(e.clientX,e.clientY,this.h.shiftOn(e)),this.h.toolDown(t,e)}move(e){const t=this.pointers.get(e.pointerId);if(!t){e.buttons===0&&!this.pointers.size&&this.h.hover(this.local(e),e);return}const n=t.x,r=t.y;t.x=e.clientX,t.y=e.clientY,Math.hypot(e.clientX-this.holdX,e.clientY-this.holdY)>cc&&this.cancelHold(),Math.hypot(e.clientX-t.x0,e.clientY-t.y0)>cc&&(this.tap.moved=!0);const s=this.gesture;if(s){if(s.mode==="tumble"){if(!s.live&&e.pointerType==="touch"){if(s.acc=(s.acc??0)+Math.hypot(e.clientX-n,e.clientY-r),s.acc<X0)return;s.live=!0}this.h.tumble(e.clientX-n,e.clientY-r);return}if(s.mode==="pan")return this.h.pan(e.clientX-n,e.clientY-r);if(s.mode==="dolly")return this.h.dolly(1+(e.clientX-n+(e.clientY-r))*.006);if(s.mode==="twofinger"){const a=[...this.pointers.values()];if(a.length<2)return;const o=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),l=(a[0].x+a[1].x)/2,c=(a[0].y+a[1].y)/2;if(!s.live){if(s.acc=(s.acc??0)+Math.hypot(l-(s.cx??0),c-(s.cy??0))+Math.abs(o-(s.d??0)),s.acc<q0)return;s.live=!0,this.tap.moved=!0,s.d=o,s.cx=l,s.cy=c;return}s.zoomOnly&&s.pivot?(s.d??0)>0&&o>0&&this.h.dollyAbout(s.pivot,(s.d??1)/o):((s.d??0)>0&&o>0&&this.h.dolly((s.d??1)/o),this.h.pan(l-(s.cx??0),c-(s.cy??0))),s.d=o,s.cx=l,s.cy=c;return}if(s.mode==="tool"){const a=this.local(e);(Math.abs(a.x-(s.sx??0))>hc||Math.abs(a.y-(s.sy??0))>hc)&&(s.moved=!0),this.h.toolMove(a,e)}}}up(e){this.cancelHold();const t=this.gesture,n=t?.mode==="tool",r=n&&!!t?.moved;this.pointers.delete(e.pointerId),n&&this.h.toolUp(this.local(e),e,r),this.pointers.size===0?(this.gesture=null,this.tapUp(e)):this.gesture={mode:"idle"}}cancelled(e){this.pointers.delete(e.pointerId),this.cancelHold(),this.h.abort(),this.pointers.size?this.gesture={mode:"idle"}:(this.gesture=null,this.tap.lastN=0)}tapDown(e){if(e.pointerType!=="touch")return;const t=performance.now(),n=this.touchCount();n===1?(this.tap.t0=t,this.tap.maxN=1,this.tap.moved=!1,this.tap.stagger=!1):(this.tap.maxN=Math.max(this.tap.maxN,n),t-this.tap.t0>Y0&&(this.tap.stagger=!0))}tapUp(e){if(e.pointerType!=="touch")return;const t=performance.now();if(!(!this.tap.moved&&!this.tap.stagger&&t-this.tap.t0<$0&&this.tap.maxN>=2)){this.tap.lastN=0;return}this.tap.lastN===this.tap.maxN&&t-this.tap.lastT<K0?(this.tap.lastN=0,this.tap.maxN===2?this.h.undo():this.h.redo(),navigator.vibrate?.(8)):(this.tap.lastN=this.tap.maxN,this.tap.lastT=t)}startHold(e,t,n){this.holdX=e,this.holdY=t,this.cancelHold(),this.holdTimer=setTimeout(()=>{this.pointers.size===1&&(this.h.abort(),this.gesture=null,this.h.openMarkingMenu(e,t,n))},Z0)}cancelHold(){this.holdTimer!==null&&clearTimeout(this.holdTimer),this.holdTimer=null}}const uc=new nf,Q0=new F;class j0{constructor(e,t){this.viewport=e,this.container=t}get width(){return this.container.clientWidth||1}get height(){return this.container.clientHeight||1}local(e){const t=this.container.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}ndc(e){return new Ge(e.x/this.width*2-1,-(e.y/this.height*2-1))}project(e,t,n,r){e.group.updateMatrixWorld();const s=Q0.set(t,n,r).applyMatrix4(e.group.matrixWorld).project(this.viewport.camera);return{x:(s.x+1)/2*this.width,y:(-s.y+1)/2*this.height,z:s.z}}projectVertex(e,t){const n=e.object.mesh.positions;return this.project(e,n[t*3],n[t*3+1],n[t*3+2])}pickSurface(e){uc.setFromCamera(this.ndc(e),this.viewport.camera);const t=this.viewport.allViews().filter(l=>l.object.visible),r=uc.intersectObjects(t.map(l=>l.surface),!1)[0];if(!r)return null;const s=t.find(l=>l.surface===r.object);if(!s)return null;const a=r.faceIndex??0,o=s.tri.triToFace[a]??0;return{object:s.object,view:s,face:o,point:r.point.clone(),distance:r.distance}}pickVertex(e,t,n){let r=-1,s=n*n;const a=e.object.mesh.vertexCount;for(let o=0;o<a;o++){const l=this.projectVertex(e,o);if(l.z>1)continue;const c=(l.x-t.x)**2+(l.y-t.y)**2;c<s&&(s=c,r=o)}return r}pickEdge(e,t,n){let r=-1,s=n,a=.5;for(let o=0;o<e.edges.length;o++){const[l,c]=e.edges[o],h=this.projectVertex(e,l),f=this.projectVertex(e,c);if(h.z>1&&f.z>1)continue;const u=f.x-h.x,d=f.y-h.y,g=u*u+d*d,x=g?Math.max(0,Math.min(1,((t.x-h.x)*u+(t.y-h.y)*d)/g)):0,m=Math.hypot(h.x+u*x-t.x,h.y+d*x-t.y);m<s&&(s=m,r=o,a=x)}return{edge:r,t:a}}vertsInRect(e,t,n,r,s){const a={x:Math.min(t,r),y:Math.min(n,s)},o={x:Math.max(t,r),y:Math.max(n,s)},l=[],c=e.object.mesh.vertexCount;for(let h=0;h<c;h++){const f=this.projectVertex(e,h);f.z<=1&&f.x>=a.x&&f.x<=o.x&&f.y>=a.y&&f.y<=o.y&&l.push(h)}return l}}const Rn={surf:new $u({color:10134701,specular:2765112,shininess:24,side:nn}),wire:new Cn({color:1317407,transparent:!0,opacity:.9}),wireSel:new Cn({color:5111629}),wireComp:new Cn({color:4608605}),vert:new tr({color:9134e3,size:6,sizeAttenuation:!1}),vertSel:new tr({color:16752128,size:11,sizeAttenuation:!1}),edgeSel:new Cn({color:16752128}),faceSel:new Ao({color:16752128,transparent:!0,opacity:.5,side:nn,depthWrite:!1}),softPt:new tr({color:13658666,size:7,sizeAttenuation:!1}),cutLine:new Cn({color:16769354}),cutPt:new tr({color:16769354,size:9,sizeAttenuation:!1}),pivot:new Cn({color:15915386})};function Sh(i,e,t){const n=i.faceNormals(),r=i.vertexFaces(),s=Math.cos(t*Math.PI/180)-1e-4,a=e.tri.length,o=new Float32Array(a*3),l=new Float32Array(a*3);for(let h=0;h<a;h+=3){const f=e.triToFace[h/3],u=n[f*3],d=n[f*3+1],g=n[f*3+2];for(let x=0;x<3;x++){const m=e.tri[h+x],p=(h+x)*3;o[p]=i.positions[m*3],o[p+1]=i.positions[m*3+1],o[p+2]=i.positions[m*3+2];let E=0,w=0,M=0;for(const y of r.get(m)??[]){const C=n[y*3],v=n[y*3+1],b=n[y*3+2];C*u+v*d+b*g>=s&&(E+=C,w+=v,M+=b)}const T=Math.hypot(E,w,M)||1;l[p]=E/T,l[p+1]=w/T,l[p+2]=M/T}}const c=new Dt;return c.setAttribute("position",new bt(o,3)),c.setAttribute("normal",new bt(l,3)),c}function yh(i,e){const t=new Float32Array(e.length*6);for(let r=0;r<e.length;r++){const[s,a]=e[r];t[r*6]=i.positions[s*3],t[r*6+1]=i.positions[s*3+1],t[r*6+2]=i.positions[s*3+2],t[r*6+3]=i.positions[a*3],t[r*6+4]=i.positions[a*3+1],t[r*6+5]=i.positions[a*3+2]}const n=new Dt;return n.setAttribute("position",new bt(t,3)),n}function ir(i){const e=new Dt;return e.setAttribute("position",new bt(Float32Array.from(i),3)),e}function rr(i,e){return i.position.set(e.position[0],e.position[1],e.position[2]),i.quaternion.set(e.rotation[0],e.rotation[1],e.rotation[2],e.rotation[3]),i.scale.set(e.scale[0],e.scale[1],e.scale[2]),i}function e_(i,e){const t=new Ln;rr(t,i.transform);const n=i.mesh.triangulate(),r=i.mesh.edges(),s=new an(Sh(i.mesh,n,e),Rn.surf);s.userData.objectId=i.id,t.add(s);const a=new Co(yh(i.mesh,r),Rn.wire);t.add(a);const o=new qc(ir(i.mesh.positions),Rn.vert);return t.add(o),t.updateMatrixWorld(),{object:i,group:t,surface:s,wire:a,points:o,tri:n,edges:r}}function oa(i){i.traverse(e=>{const t=e.geometry;t&&t.dispose()})}const fc=.3,dc=140;class t_{constructor(e,t,n){this.container=e,this.state=n,this.renderer=new e0({canvas:t,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene.add(this.root,this.overlay,this.manip,this.preview),this.addLights(),this.addGrid(),this.applyCamera()}renderer;scene=new Du;persp=new Kt(45,1,.05,500);ortho=new ps(-1,1,1,-1,.05,500);camera=this.persp;root=new Ln;overlay=new Ln;manip=new Ln;preview=new Ln;cam={target:new F(0,.4,0),theta:.72,phi:1.12,distance:7.2};views=new Map;frame=0;addLights(){this.scene.add(new Ju(12371921,3356733,.85));const e=new El(16777215,.72);e.position.set(3,6,4);const t=new El(10466502,.28);t.position.set(-4,2,-3),this.scene.add(e,t)}addGrid(){const e=new rf(24,24,7174272,4936796),t=e.material;t.transparent=!0,t.opacity=.55,this.scene.add(e);const n=(r,s)=>{const a=new Dt;a.setAttribute("position",new bt(r,3)),this.scene.add(new Xc(a,new Cn({color:s})))};n([-12,0,0,12,0,0],12610154),n([0,0,-12,0,0,12],6982336)}applyCamera(){const{cam:e}=this,t=Math.sin(e.phi),n=e.target.x+e.distance*t*Math.sin(e.theta),r=e.target.y+e.distance*Math.cos(e.phi),s=e.target.z+e.distance*t*Math.cos(e.theta),a=this.state.camOpts;this.persp.position.set(n,r,s),this.persp.lookAt(e.target),this.persp.near=a.near,this.persp.far=a.far,this.persp.setFocalLength(a.focal),this.ortho.position.set(n,r,s),this.ortho.lookAt(e.target);const o=(this.container.clientWidth||1)/(this.container.clientHeight||1),l=e.distance*.42;this.ortho.left=-l*o,this.ortho.right=l*o,this.ortho.top=l,this.ortho.bottom=-l,this.ortho.near=a.near,this.ortho.far=a.far,this.ortho.updateProjectionMatrix(),this.camera=a.ortho?this.ortho:this.persp}tumble(e,t){this.cam.theta-=e*.0088,this.cam.phi=Math.max(.05,Math.min(Math.PI-.05,this.cam.phi-t*.0088)),this.applyCamera()}pan(e,t){const n=new F().setFromMatrixColumn(this.camera.matrix,0),r=new F().setFromMatrixColumn(this.camera.matrix,1),s=this.cam.distance*.0016;this.cam.target.addScaledVector(n,-e*s).addScaledVector(r,t*s),this.applyCamera()}dolly(e){this.cam.distance=Math.max(fc,Math.min(dc,this.cam.distance*e)),this.applyCamera()}dollyAbout(e,t){const n=Math.max(fc,Math.min(dc,this.cam.distance*t)),r=n/this.cam.distance;this.cam.target.sub(e).multiplyScalar(r).add(e),this.cam.distance=n,this.applyCamera()}frameSelected(){const e=this.state.selected?[this.state.selected]:this.state.doc.objects;let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0],r=!1;for(const a of e){const o=this.views.get(a.id);if(!o)continue;const l=a.mesh.positions;for(let c=0;c<a.mesh.vertexCount;c++){const h=new F(l[c*3],l[c*3+1],l[c*3+2]).applyMatrix4(o.group.matrixWorld);t=[Math.min(t[0],h.x),Math.min(t[1],h.y),Math.min(t[2],h.z)],n=[Math.max(n[0],h.x),Math.max(n[1],h.y),Math.max(n[2],h.z)],r=!0}}if(!r)return;this.cam.target.set((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2);const s=Math.max(n[0]-t[0],n[1]-t[1],n[2]-t[2]);this.cam.distance=Math.max(1.4,s*2.4),this.applyCamera()}viewOf(e){return this.views.get(e.id)}allViews(){return[...this.views.values()]}rebuildObject(e){const t=this.views.get(e.id);t&&(this.root.remove(t.group),oa(t.group));const n=e_(e,this.shadingAngle);this.root.add(n.group),this.views.set(e.id,n),this.applyDisplay(n)}syncAll(){const e=new Set(this.state.doc.objects.map(t=>t.id));for(const[t,n]of this.views)e.has(t)||(this.root.remove(n.group),oa(n.group),this.views.delete(t));for(const t of this.state.doc.objects)this.rebuildObject(t);this.rebuildOverlay()}get shadingAngle(){return this.state.display==="shaded"?0:this.state.smoothAngle}refreshPositions(e){const t=this.views.get(e.id);if(!t)return this.rebuildObject(e);rr(t.group,e.transform),t.group.updateMatrixWorld(),t.surface.geometry.dispose(),t.surface.geometry=Sh(e.mesh,t.tri,this.shadingAngle),t.wire.geometry.dispose(),t.wire.geometry=yh(e.mesh,t.edges),t.points.geometry.dispose(),t.points.geometry=ir(e.mesh.positions)}applyDisplay(e){const t=this.state.display,n=e.object===this.state.selected;e.surface.visible=t!=="wire",e.wire.visible=t==="wire"||t==="shadedWire"||n,e.wire.material=n?this.state.compMode==="object"?Rn.wireSel:Rn.wireComp:Rn.wire,e.points.visible=n&&this.state.compMode==="vertex",e.group.visible=e.object.visible}applyDisplayAll(){for(const e of this.views.values())this.applyDisplay(e)}rebuildOverlay(){for(const r of this.overlay.children.slice())this.overlay.remove(r),oa(r);const e=this.state.selected,t=e?this.views.get(e.id):void 0;if(!e||!t||!this.state.comp.size)return;const n=e.mesh;if(this.state.compMode==="vertex"){const r=[];for(const a of this.state.comp)r.push(n.positions[a*3],n.positions[a*3+1],n.positions[a*3+2]);const s=new qc(ir(r),Rn.vertSel);rr(s,e.transform).renderOrder=4,this.overlay.add(s)}else if(this.state.compMode==="edge"){const r=[];for(const a of this.state.comp){const o=t.edges[a];o&&(r.push(n.positions[o[0]*3],n.positions[o[0]*3+1],n.positions[o[0]*3+2]),r.push(n.positions[o[1]*3],n.positions[o[1]*3+1],n.positions[o[1]*3+2]))}const s=new Co(ir(r),Rn.edgeSel);rr(s,e.transform).renderOrder=4,this.overlay.add(s)}else if(this.state.compMode==="face"){const r=[],s=[];for(const l of this.state.comp){if(l>=n.faceCount)continue;const c=n.faceVerts(l),h=r.length/3;for(const f of c)r.push(n.positions[f*3],n.positions[f*3+1],n.positions[f*3+2]);for(let f=1;f<c.length-1;f++)s.push(h,h+f,h+f+1)}const a=ir(r);a.setIndex(s);const o=new an(a,Rn.faceSel);rr(o,e.transform).renderOrder=4,this.overlay.add(o)}}resize(){const e=this.container.clientWidth||1,t=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(e,t,!1),this.persp.aspect=e/t,this.persp.updateProjectionMatrix(),this.applyCamera()}start(){const e=()=>{this.frame=requestAnimationFrame(e),this.renderer.render(this.scene,this.camera)};e()}stop(){cancelAnimationFrame(this.frame)}}const n_={model:{g1:qn("強度","ソフト選択 強度",0,1,.01,"strength"),g2:qn("範囲","ソフト選択 範囲",.05,6,.05,"radius")},uv:{g1:qn("強度","ソフト選択 強度",0,1,.01,"strength"),g2:qn("範囲","ソフト選択 範囲",.05,6,.05,"radius")},sculpt:{g1:qn("強度","ブラシ強度",0,1,.01,"strength"),g2:qn("サイズ","ブラシサイズ",.05,6,.05,"radius")},material:{g1:qn("不透明","不透明度",0,1,.01,"strength"),g2:qn("サイズ","ブラシサイズ",.05,6,.05,"radius")}};function qn(i,e,t,n,r,s){return{label:i,full:e,min:t,max:n,step:r,get:a=>a.soft[s],set:(a,o)=>{a.soft[s]=o}}}class i_{doc=new hh;selected=null;comp=new Set;mode="model";compMode="object";tool="select";manip="all";display="shadedWire";mods={shift:"off",ctrl:"off",alt:"off"};symX=!1;fingerCam=!1;panelsHidden=!1;soft={strength:0,radius:1};toolOpts={extrudeDist:.35};cut={snapStep:0,edgeFlow:!1};smoothAngle=30;camOpts={focal:35,near:.05,far:500,ortho:!1};gauge(e){return n_[this.mode][e]}modOn(e){return this.mods[e]!=="off"}releaseLatches(){let e=!1;for(const t of["shift","ctrl","alt"])this.mods[t]==="latch"&&(this.mods[t]="off",e=!0);return e}select(e){this.selected!==e&&this.comp.clear(),this.selected=e}}const r_=40;class s_{constructor(e){this.state=e}undoStack=[];redoStack=[];onChange=null;get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get undoLabel(){return this.undoStack.at(-1)?.label??null}get redoLabel(){return this.redoStack.at(-1)?.label??null}push(e){this.commit(e,this.snapshot())}snapshot(){return{objects:this.state.doc.objects.map(e=>({ref:e,name:e.name,kind:e.kind,parametric:e.parametric,params:{...e.params},transform:ro(e.transform),visible:e.visible,activeLevel:e.activeLevel,mesh:e.mesh.clone(),multires:e.multires.slice(),sculptLayers:e.sculptLayers.slice(),paintLayers:e.paintLayers.slice()})),selectedId:this.state.selected?.id??null}}commit(e,t){this.undoStack.push({label:e,snap:t}),this.undoStack.length>r_&&this.undoStack.shift(),this.redoStack.length=0,this.onChange?.()}drop(){this.undoStack.pop(),this.onChange?.()}undo(){const e=this.undoStack.pop();return e?(this.redoStack.push({label:e.label,snap:this.snapshot()}),this.restore(e.snap),this.onChange?.(),e.label):null}redo(){const e=this.redoStack.pop();return e?(this.undoStack.push({label:e.label,snap:this.snapshot()}),this.restore(e.snap),this.onChange?.(),e.label):null}clear(){this.undoStack.length=0,this.redoStack.length=0,this.onChange?.()}restore(e){const t=this.state.doc;t.objects=e.objects.map(n=>{const r=n.ref;return r.name=n.name,r.kind=n.kind,r.parametric=n.parametric,r.params={...n.params},r.transform=ro(n.transform),r.visible=n.visible,r.activeLevel=n.activeLevel,r.mesh=n.mesh.clone(),r.multires=n.multires.slice(),r.sculptLayers=n.sculptLayers.slice(),r.paintLayers=n.paintLayers.slice(),r}),this.state.selected=e.selectedId?t.find(e.selectedId)??null:null,this.state.comp.clear()}}const a_="macbeth",o_=1,jn="projects",ei="blobs";let $r=null;function bh(){return $r||($r=new Promise((i,e)=>{const t=indexedDB.open(a_,o_);t.onupgradeneeded=()=>{const n=t.result;n.objectStoreNames.contains(jn)||n.createObjectStore(jn,{keyPath:"id"}),n.objectStoreNames.contains(ei)||n.createObjectStore(ei)},t.onsuccess=()=>i(t.result),t.onerror=()=>e(t.error??new Error("IndexedDB を開けません"))}),$r)}function Lo(i,e,t){return bh().then(n=>new Promise((r,s)=>{const a=n.transaction(i,e);let o;Promise.resolve(t(a)).then(l=>{o=l},s),a.oncomplete=()=>r(o),a.onerror=()=>s(a.error??new Error("IndexedDB の操作に失敗しました")),a.onabort=()=>s(a.error??new Error("IndexedDB の操作が中断されました"))}))}function pc(i){return new Promise((e,t)=>{i.onsuccess=()=>e(i.result),i.onerror=()=>t(i.error)})}async function mc(){try{return await bh(),!0}catch{return!1}}async function l_(i,e){const t=Date.now(),n={...i,created:i.created??t,modified:t,size:e.byteLength};return await Lo([jn,ei],"readwrite",r=>{r.objectStore(jn).put(n),r.objectStore(ei).put(e.slice().buffer,n.id)}),n}async function c_(i){return await Lo([jn,ei],"readonly",async t=>{const n=await pc(t.objectStore(jn).get(i)),r=await pc(t.objectStore(ei).get(i));return n&&r?{record:n,bytes:new Uint8Array(r)}:null})}async function gc(i){await Lo([jn,ei],"readwrite",e=>{e.objectStore(jn).delete(i),e.objectStore(ei).delete(i)})}const Kr="__autosave__",h_=1200,u_="0.1.0";class f_{constructor(e){this.state=e}timer=null;writing=!1;pending=!1;available=null;onError=null;onSaved=null;schedule(){this.timer!==null&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.timer=null,this.saveNow()},h_)}async saveNow(){if(this.writing){this.pending=!0;return}if(this.available===null&&(this.available=await mc()),!!this.available){this.writing=!0;try{const e=V0(this.state.doc,{appVersion:u_}),t=await l_({id:Kr,name:"自動保存",thumbnail:"",autosave:!0},e);this.onSaved?.(t.modified)}catch(e){this.onError?.(e instanceof Error?e.message:"自動保存に失敗しました")}finally{this.writing=!1,this.pending&&(this.pending=!1,this.schedule())}}}async restore(){if(this.available===null&&(this.available=await mc()),!this.available)return!1;try{const e=await c_(Kr);if(!e)return!1;const{document:t}=W0(e.bytes);return t.objects.length?(this.state.doc=t,this.state.select(null),!0):!1}catch(e){return this.onError?.(e instanceof Error?e.message:"前回の状態を読み込めませんでした"),await gc(Kr).catch(()=>{}),!1}}async clear(){this.timer!==null&&clearTimeout(this.timer),this.timer=null,await gc(Kr).catch(()=>{})}}function Eh(){return typeof window.showSaveFilePicker=="function"?"file-system-access":typeof navigator.canShare=="function"&&typeof navigator.share=="function"?"share":"download"}function d_(i){return i.endsWith(".mbz")?"application/zip":i.endsWith(".obj")?"text/plain":i.endsWith(".png")?"image/png":"application/octet-stream"}function p_(i){return i.endsWith(".mbz")?{"application/zip":[".mbz"]}:i.endsWith(".obj")?{"text/plain":[".obj"]}:{"application/octet-stream":[`.${i.split(".").pop()}`]}}function _c(i,e){const t=URL.createObjectURL(i),n=document.createElement("a");n.href=t,n.download=e,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),2e3)}async function vc(i,e){const t=new Blob([i],{type:d_(e)}),n=Eh();if(n==="file-system-access")try{const r=await window.showSaveFilePicker({suggestedName:e,types:[{description:"macbeth",accept:p_(e)}]}),s=await r.createWritable();return await s.write(t),await s.close(),{method:n,target:{handle:r,name:r.name},saved:!0}}catch(r){return r?.name==="AbortError"?{method:n,target:null,saved:!1}:(_c(t,e),{method:"download",target:{name:e},saved:!0})}if(n==="share"){const r=new File([t],e,{type:t.type});if(navigator.canShare?.({files:[r]}))try{return await navigator.share({files:[r],title:e}),{method:n,target:{name:e},saved:!0}}catch(s){if(s?.name==="AbortError")return{method:n,target:null,saved:!1}}}return _c(t,e),{method:"download",target:{name:e},saved:!0}}async function xc(i){if(typeof window.showOpenFilePicker=="function")try{const e=i.split(",").map(s=>s.trim()),[t]=await window.showOpenFilePicker({multiple:!1,types:[{description:"macbeth",accept:{"*/*":e}}]}),n=await t.getFile(),r=await n.arrayBuffer();return{name:n.name,bytes:new Uint8Array(r),text:await n.text(),handle:t}}catch(e){if(e?.name==="AbortError")return null}return new Promise(e=>{const t=document.createElement("input");t.type="file",t.accept=i,t.style.display="none",document.body.appendChild(t);let n=!1;const r=s=>{n||(n=!0,t.remove(),e(s))};t.addEventListener("change",async()=>{const s=t.files?.[0];if(!s)return r(null);const a=await s.arrayBuffer();r({name:s.name,bytes:new Uint8Array(a),text:new TextDecoder().decode(a)})}),window.addEventListener("focus",()=>setTimeout(()=>r(null),800),{once:!0}),t.click()})}function m_(){switch(Eh()){case"file-system-access":return"フォルダを選んで保存（同じファイルに上書きできます）";case"share":return"共有シートから「ファイル」App へ保存";default:return"ダウンロード"}}const Mc=22,Sc=16,g_=380,__=14,yc=4;function ai(i,e,t){t?i.delete(e):i.add(e)}const Yn={changed:!1,objectChanged:!1};class v_{constructor(e,t,n){this.state=e,this.picker=t,this.viewOf=n}lastClick=null;add(e){return this.state.modOn("shift")||e.shiftKey}sub(e){return this.state.modOn("ctrl")||e.ctrlKey||e.metaKey}click(e,t){if(this.state.compMode==="object"){const h=this.picker.pickSurface(e)?.object??null,f=h!==this.state.selected;return this.state.select(h),this.lastClick=null,{changed:f,objectChanged:f}}const n=this.state.selected;if(!n){const c=this.picker.pickSurface(e);return c?(this.state.select(c.object),{changed:!0,objectChanged:!0}):Yn}const r=this.viewOf(n.id);if(!r)return Yn;const s=performance.now(),a=this.lastClick;if(a!==null&&s-a.t<g_&&Math.hypot(e.x-a.x,e.y-a.y)<__&&a.mode===this.state.compMode&&a.objectId===n.id&&a)return this.lastClick=null,this.double(e,t,r,a.before);const l=new Set(this.state.comp);return!this.add(t)&&!this.sub(t)&&this.state.comp.clear(),this.pickOne(e,t,r),this.lastClick={t:s,x:e.x,y:e.y,mode:this.state.compMode,objectId:n.id,before:l},{changed:!0,objectChanged:!1}}pickOne(e,t,n){const r=this.sub(t),s=this.state.comp;if(this.state.compMode==="vertex"){const a=this.picker.pickVertex(n,e,Mc);a>=0&&ai(s,a,r)}else if(this.state.compMode==="edge"){const a=this.picker.pickEdge(n,e,Sc);a.edge>=0&&ai(s,a.edge,r)}else if(this.state.compMode==="face"){const a=this.picker.pickSurface(e);a&&a.object===n.object&&ai(s,a.face,r)}}edgeIndex(e){const t=new Map;return e.edges.forEach((n,r)=>t.set(st(n[0],n[1]),r)),t}double(e,t,n,r){const s=n.object,a=s.mesh,o=this.add(t),l=this.sub(t),c=this.edgeIndex(n),h=u=>u.map(d=>c.get(st(d[0],d[1]))).filter(d=>d!==void 0),f=(u,d)=>{!o&&!l?this.state.comp.clear():this.state.comp=new Set(r);for(const g of u)ai(this.state.comp,g,l);return{changed:!0,objectChanged:!1,message:`${d} — ${u.length}`}};if(this.state.compMode==="edge"){const u=this.picker.pickEdge(n,e,Sc);if(u.edge<0)return Yn;const[d,g]=n.edges[u.edge];if(o&&r.size){const x=[...r][r.size-1],m=n.edges[x];if(m){const p=st(m[0],m[1]),E=st(d,g),w=na(a,m[0],m[1]),M=Jl(w,p,E);if(M)return f(h(M),"部分エッジループ");const T=r0(a,m[0],m[1]),y=Jl(T,p,E);if(y)return f(h(y),"部分エッジリング")}}return f(h(na(a,d,g).edges),"エッジループ")}if(this.state.compMode==="face"){const u=this.picker.pickSurface(e);return!u||u.object!==s?Yn:f(oh(a,u.face),"シェル")}if(this.state.compMode==="vertex"){const u=this.picker.pickVertex(n,e,Mc);if(u<0)return Yn;if(o&&r.size){const g=[...r][r.size-1],x=n.edges.find(([m,p])=>m===g||p===g);if(x){const m=na(a,x[0],x[1]),p=a0(m),E=p.indexOf(g),w=p.indexOf(u);if(E>=0&&w>=0){const[M,T]=E<w?[E,w]:[w,E];return f(p.slice(M,T+1),"頂点列")}}}const d=a.vertexFaces().get(u);return d?.length?f(s0(a,d[0]),"シェル"):Yn}return Yn}marquee(e,t,n,r,s,a){const o={x:Math.min(e,n),y:Math.min(t,r)},l={x:Math.max(e,n),y:Math.max(t,r)};if(l.x-o.x<yc&&l.y-o.y<yc)return this.click(s,a);const c=g=>g.z<=1&&g.x>=o.x&&g.x<=l.x&&g.y>=o.y&&g.y<=l.y;if(this.state.compMode==="object"){let g=null;for(const m of this.state.doc.objects){const p=this.viewOf(m.id);if(p&&this.picker.vertsInRect(p,o.x,o.y,l.x,l.y).length){g=m;break}}const x=g!==this.state.selected;return this.state.select(g),{changed:x,objectChanged:x}}const h=this.state.selected,f=h?this.viewOf(h.id):void 0;if(!h||!f)return Yn;const u=this.sub(a);!this.add(a)&&!u&&this.state.comp.clear();const d=this.state.comp;if(this.state.compMode==="vertex")for(const g of this.picker.vertsInRect(f,o.x,o.y,l.x,l.y))ai(d,g,u);else if(this.state.compMode==="edge")f.edges.forEach((g,x)=>{const m=h.mesh.getPosition(g[0]),p=h.mesh.getPosition(g[1]),E=this.picker.project(f,(m[0]+p[0])/2,(m[1]+p[1])/2,(m[2]+p[2])/2);c(E)&&ai(d,x,u)});else if(this.state.compMode==="face")for(let g=0;g<h.mesh.faceCount;g++){const x=h.mesh.faceCenter(g);c(this.picker.project(f,x[0],x[1],x[2]))&&ai(d,g,u)}return{changed:!0,objectChanged:!1}}selectedVertices(){const e=this.state.selected;if(!e)return[];const t=this.viewOf(e.id),n=new Set;if(this.state.compMode==="vertex")for(const r of this.state.comp)n.add(r);else if(this.state.compMode==="edge"&&t)for(const r of this.state.comp){const s=t.edges[r];s&&(n.add(s[0]),n.add(s[1]))}else if(this.state.compMode==="face")for(const r of this.state.comp)for(const s of e.mesh.faceVerts(r))n.add(s);else for(let r=0;r<e.mesh.vertexCount;r++)n.add(r);return[...n]}reset(){this.lastClick=null}}function it(i){const e=document.getElementById(i);if(!e)throw new Error(`#${i} が見つかりません`);return e}function Vt(i,e,t){const n=document.createElement(i);return e&&(n.className=e),t!=null&&(n.textContent=t),n}class bc{constructor(e,t,n,r,s,a,o){this.state=e,this.which=n,this.labelId=r,this.valueId=s,this.onInput=a,this.onCommit=o,this.root=it(t),this.fill=this.root.querySelector(".fill"),this.knob=this.root.querySelector(".knob"),this.attach(),this.paint()}root;fill;knob;active=!1;paint(){const e=this.state.gauge(this.which),t=e.get(this.state),n=(t-e.min)/(e.max-e.min);this.fill.style.height=`${n*100}%`,this.knob.style.bottom=`calc(${n*100}% - 1px)`,it(this.labelId).textContent=e.label,this.root.title=e.full,it(this.valueId).textContent=t.toFixed(2),this.root.dataset.off=this.which==="g1"&&t<=0?"true":"false"}setFromY(e){const t=this.state.gauge(this.which),n=this.root.getBoundingClientRect(),r=Math.max(0,Math.min(1,1-(e-n.top)/n.height)),s=t.min+r*(t.max-t.min);t.set(this.state,Math.round(s/t.step)*t.step),this.paint(),this.onInput()}attach(){const e=this.root;e.addEventListener("touchstart",t=>t.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",t=>{t.preventDefault(),this.active=!0,e.setPointerCapture(t.pointerId),this.setFromY(t.clientY)}),e.addEventListener("pointermove",t=>{this.active&&this.setFromY(t.clientY)});for(const t of["pointerup","pointercancel"])e.addEventListener(t,()=>{this.active&&(this.active=!1,this.onCommit())})}}const x_={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"},M_={wire:"WIRE",shaded:"SHADED",shadedWire:"SHADED+WIRE",smooth:"SMOOTH"};class S_{constructor(e){this.state=e}toastTimer=null;refreshStats(){const e=this.state.doc.stats();let t=0;for(const s of this.state.doc.objects)t+=s.mesh.stats().edges;it("hudStats").innerHTML=`<i>Verts</i><span>${e.vertices}</span><i>Edges</i><span>${t}</span><i>Faces</i><span>${e.faces}</span><i>Tris</i><span>${e.triangles}</span>`;const n=x_[this.state.compMode],r=M_[this.state.display];it("hudMode").innerHTML=`${this.state.tool}${this.state.symX?" · 対称X":""} · <b>${n}</b>`+(this.state.comp.size?` · ${this.state.comp.size}`:"")+`<br>${r}${this.state.camOpts.ortho?" · ORTHO":""}`+(this.state.selected?` · ${this.state.selected.name}`:"")}toast(e){it("hudHint").innerHTML=e,this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.defaultHint(),2800)}defaultHint(){this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=null,it("hudHint").innerHTML=(this.state.fingerCam?"指1本 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>":"指1本 メッシュ上 <kbd>ツール</kbd> / 外 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>")+" · 指2本 <kbd>パン / ズーム</kbd> · 指2本ダブルタップ <kbd>戻る</kbd> · 指3本 <kbd>進む</kbd><br><kbd>F</kbd> + ドラッグ <kbd>矩形選択</kbd> · <kbd>F</kbd> + ピンチ <kbd>選択中心へズーム</kbd><br>マウス <kbd>Alt+左 タンブル</kbd> <kbd>Alt+中 パン</kbd> <kbd>Alt+右 ズーム</kbd>"}setSaveNote(e){it("saveNote").textContent=e}}const we={rotate:'<path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4"/><path d="M20.5 3.6v5h-5"/>',scale:'<path d="M5 19 18 6"/><path d="M12.5 6H18v5.5"/><rect x="3.2" y="15.2" width="5.6" height="5.6" rx=".8"/>',multicut:'<circle cx="5.5" cy="5.5" r="2.3"/><circle cx="5.5" cy="18.5" r="2.3"/><path d="M7.4 6.8 20 18M7.4 17.2 20 6"/>',extrude:'<path d="M4.5 13.5h8v7h-8z"/><path d="m4.5 13.5 4-4h8v7M12.5 13.5l4-4"/><path d="M20 3v5m0-5-1.8 1.8M20 3l1.8 1.8"/>',prim:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',vObj:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/>',vVert:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="6" r="2" fill="currentColor"/><circle cx="6" cy="18" r="2" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/>',vEdge:'<rect x="6" y="6" width="12" height="12"/><path d="M6 6h12" stroke-width="3.4"/>',vFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".45"/>',vVertFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".2"/><circle cx="8.6" cy="8.6" r="2.1" fill="currentColor"/>',vMulti:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="1.9" fill="currentColor"/><path d="M6 18h12" stroke-width="3"/>',vUV:'<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 12h16M12 4v16" stroke-dasharray="2.4 2"/>',smooth:'<circle cx="12" cy="12" r="8.6" fill="currentColor" fill-opacity=".5"/><path d="M8 15.4a6 6 0 0 1 5-6.6"/>',sym:'<path d="M12 3v18" stroke-dasharray="2.4 2.4"/><path d="M9.4 7 4.5 12l4.9 5zM14.6 7l4.9 5-4.9 5z"/>',dup:'<rect x="3.6" y="3.6" width="12" height="12" rx="1"/><path d="M8.4 20.4h12v-12"/>',del:'<path d="M4 6.6h16M9.4 6.6V4.4h5.2v2.2M6.4 6.6l1 13.2a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l1-13.2"/>',pCube:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',pSphere:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',pCylinder:'<ellipse cx="12" cy="5.6" rx="7" ry="2.8"/><path d="M5 5.6v12.8M19 5.6v12.8"/><path d="M5 18.4a7 2.8 0 0 0 14 0"/>',pCone:'<path d="M12 3 19 18.4M12 3 5 18.4"/><ellipse cx="12" cy="18.4" rx="7" ry="2.8"/>',pTorus:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><ellipse cx="12" cy="12" rx="3.6" ry="1.9"/>',pPlane:'<path d="M2.6 16.4 9.4 6.6h12L14.6 16.4z"/><path d="M6 11.5h12"/>',pDisk:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><path d="M2.8 12h18.4"/>',pPlatonic:'<path d="m12 2.8 8.8 6.4-3.4 10.4H6.6L3.2 9.2z"/><path d="M12 2.8v16.8M3.2 9.2l13.8 10M20.8 9.2 7 19.2"/>'};function Ec(i,e=18,t=1.6){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${t}" stroke-linecap="round" stroke-linejoin="round">${i}</svg>`}const y_=["N","NE","E","SE","S","SW","W","NW"],sr="http://www.w3.org/2000/svg",Ii=132,la=40,b_=30;let Ht=null;function E_(i,e,t,n,r,s){const a=i+Math.cos(r)*n,o=e+Math.sin(r)*n,l=i+Math.cos(s)*n,c=e+Math.sin(s)*n,h=i+Math.cos(s)*t,f=e+Math.sin(s)*t,u=i+Math.cos(r)*t,d=e+Math.sin(r)*t;return`M${a},${o}A${n},${n} 0 0 1 ${l},${c}L${h},${f}A${t},${t} 0 0 0 ${u},${d}Z`}function ca(i,e,t,n){const r=document.createElementNS(sr,"text");return i&&r.setAttribute("class",i),r.setAttribute("x",String(e)),r.setAttribute("y",String(t)),r.setAttribute("text-anchor","middle"),r.textContent=n,r}function T_(i,e,t){Do();const n=Math.max(Ii+16,Math.min(window.innerWidth-Ii-16,e)),r=Math.max(Ii+16,Math.min(window.innerHeight-Ii-16,t)),s=document.createElement("div");s.className="radial",s.addEventListener("touchstart",c=>c.preventDefault(),{passive:!1}),s.addEventListener("touchmove",c=>c.preventDefault(),{passive:!1});const a=document.createElementNS(sr,"svg");s.appendChild(a),document.body.appendChild(s);const o=[];for(let c=0;c<8;c++){const h=i[y_[c]],f=(c*45-22.5-90)*Math.PI/180,u=(c*45+22.5-90)*Math.PI/180,d=document.createElementNS(sr,"path");if(d.setAttribute("d",E_(n,r,la,Ii,f,u)),d.setAttribute("fill",h?"#2c3238":"#23272c"),d.setAttribute("stroke","#171a1e"),d.setAttribute("stroke-width","1"),d.setAttribute("opacity",h?"1":".45"),a.appendChild(d),!h){o.push(null);continue}const g=(f+u)/2,x=(la+Ii)/2,m=n+Math.cos(g)*x,p=r+Math.sin(g)*x,E=document.createElementNS(sr,"g");E.setAttribute("transform",`translate(${m-10},${p-23}) scale(0.84)`),E.setAttribute("fill","none"),E.setAttribute("stroke","#dfe5ea"),E.setAttribute("stroke-width","1.6"),E.setAttribute("stroke-linecap","round"),E.setAttribute("stroke-linejoin","round"),E.innerHTML=h.icon??"",a.appendChild(E),a.appendChild(ca(null,m,p+10,h.label)),a.appendChild(ca("sub",m,p+21,h.sub??"")),o.push({path:d,icon:E,item:h,index:c})}const l=document.createElementNS(sr,"circle");l.setAttribute("cx",String(n)),l.setAttribute("cy",String(r)),l.setAttribute("r",String(la-2)),l.setAttribute("fill","#20242a"),l.setAttribute("stroke","#3d454e"),a.appendChild(l),a.appendChild(ca("sub",n,r+4,"キャンセル")),Ht={host:s,slices:o,cx:n,cy:r,selected:-1},window.addEventListener("pointermove",Th),window.addEventListener("pointerup",hs),window.addEventListener("pointercancel",hs)}function Th(i){if(!Ht)return;const e=i.clientX-Ht.cx,t=i.clientY-Ht.cy;let n=-1;if(Math.hypot(e,t)>=b_){const r=(Math.atan2(t,e)*180/Math.PI+90+360+22.5)%360,s=Math.floor(r/45);Ht.slices[s]&&(n=s)}if(n!==Ht.selected){for(const r of Ht.slices){if(!r)continue;const s=r.index===n;r.path.setAttribute("fill",s?"#2f5f7d":"#2c3238"),r.path.setAttribute("stroke",s?"#4f9fd1":"#171a1e"),r.icon.setAttribute("stroke",s?"#ffffff":"#dfe5ea")}Ht.selected=n,n>=0&&navigator.vibrate?.(6)}}function hs(){if(!Ht)return;const{selected:i,slices:e}=Ht;Do(),i>=0&&e[i]?.item.run()}function Do(){Ht&&(window.removeEventListener("pointermove",Th),window.removeEventListener("pointerup",hs),window.removeEventListener("pointercancel",hs),Ht.host.remove(),Ht=null)}const ha=[{id:"object",label:"オブジェクト",key:"F8"},{id:"vertex",label:"頂点",key:"F9"},{id:"edge",label:"エッジ",key:"F10"},{id:"face",label:"フェース",key:"F11"}],A_={4:"wire",5:"shaded",6:"shadedWire",7:"smooth"},w_={object:we.vObj,vertex:we.vVert,edge:we.vEdge,face:we.vFace},C_={cube:we.pCube,sphere:we.pSphere,cylinder:we.pCylinder,cone:we.pCone,torus:we.pTorus,plane:we.pPlane,disk:we.pDisk,platonic:we.pPlatonic};class R_{state=new i_;history=new s_(this.state);viewport;picker;selector;autosave=new f_(this.state);hud=new S_(this.state);gauges=[];marqueeEl=it("marquee");marquee=null;popup=null;router;constructor(){const e=it("vp"),t=it("gl");this.viewport=new t_(e,t,this.state),this.picker=new j0(this.viewport,e),this.selector=new v_(this.state,this.picker,n=>{const r=this.state.doc.find(n);return r?this.viewport.viewOf(r):void 0}),this.history.onChange=()=>{this.updateHistoryButtons(),this.autosave.schedule()},this.autosave.onSaved=n=>this.hud.setSaveNote(`自動保存 ${new Date(n).toLocaleTimeString("ja-JP",{timeStyle:"short"})}`),this.autosave.onError=n=>this.hud.toast(n),this.router=new J0(t,n=>this.picker.local(n),this.gestureHandlers()),this.router.attach(),this.buildToolDock(),this.buildGauges(),this.buildCluster(),this.bindKeyboard(),this.bindTopBar(),window.addEventListener("resize",()=>this.viewport.resize()),this.viewport.resize(),this.viewport.start()}async boot(){const e=await this.autosave.restore();e||this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]??null),this.viewport.syncAll(),this.refresh(),this.hud.defaultHint(),e?this.hud.toast("前回の続きを復元しました"):this.hud.setSaveNote(m_())}gestureHandlers(){return{toolDown:()=>{},toolMove:e=>this.updateMarquee(e),toolUp:(e,t,n)=>this.finishTool(e,t,n),hover:()=>{},hoverLeave:()=>{},openMarkingMenu:(e,t,n)=>this.openMarkingMenu(e,t,n),undo:()=>this.doUndo(),redo:()=>this.doRedo(),abort:()=>this.endMarquee(),isOnMesh:e=>!!this.picker.pickSurface(e),zoomPivot:()=>this.pivotWorld(),marqueeStart:e=>this.startMarquee(e),tumble:(e,t)=>this.viewport.tumble(e,t),pan:(e,t)=>this.viewport.pan(e,t),dolly:e=>this.viewport.dolly(e),dollyAbout:(e,t)=>this.viewport.dollyAbout(e,t),shiftOn:e=>this.state.modOn("shift")||e.shiftKey,altOn:e=>this.state.modOn("alt")||e.altKey}}finishTool(e,t,n){const r=this.marquee;if(r){this.endMarquee();const s=this.selector.marquee(r.x0,r.y0,r.x1,r.y1,e,t);this.applySelectResult(s)}else n||this.applySelectResult(this.selector.click(e,t));this.state.releaseLatches()&&this.syncModButtons()}applySelectResult(e){e.changed&&(e.objectChanged&&this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),e.message&&this.hud.toast(e.message))}startMarquee(e){this.marquee={x0:e.x,y0:e.y,x1:e.x,y1:e.y},this.marqueeEl.style.display="block",this.updateMarquee(e)}updateMarquee(e){const t=this.marquee;t&&(t.x1=e.x,t.y1=e.y,this.marqueeEl.style.left=`${Math.min(t.x0,t.x1)}px`,this.marqueeEl.style.top=`${Math.min(t.y0,t.y1)}px`,this.marqueeEl.style.width=`${Math.abs(t.x1-t.x0)}px`,this.marqueeEl.style.height=`${Math.abs(t.y1-t.y0)}px`)}endMarquee(){this.marquee=null,this.marqueeEl.style.display="none"}pivotWorld(){const e=this.state.selected;if(!e)return null;const t=this.viewport.viewOf(e);if(!t)return null;if(t.group.updateMatrixWorld(),this.state.compMode==="object"||!this.state.comp.size)return new F().setFromMatrixPosition(t.group.matrixWorld);const n=this.selector.selectedVertices();if(!n.length)return null;const r=new F(1/0,1/0,1/0),s=new F(-1/0,-1/0,-1/0);for(const a of n){const o=e.mesh.getPosition(a),l=new F(o[0],o[1],o[2]).applyMatrix4(t.group.matrixWorld);r.min(l),s.max(l)}return r.add(s).multiplyScalar(.5)}openMarkingMenu(e,t,n){this.closePopup(),T_(n?this.editMenu():this.selectModeMenu(),e,t)}selectModeMenu(){const e=t=>()=>this.hud.toast(`${t} は未実装です`);return{N:{label:"エッジ",sub:"Edge",icon:we.vEdge,run:()=>this.setCompMode("edge")},NE:{label:"オブジェクト モード",sub:"Object",icon:we.vObj,run:()=>this.setCompMode("object")},E:{label:"UV",sub:"UV ▸",icon:we.vUV,run:e("UV コンポーネント選択")},SE:{label:"マルチ",sub:"Multi",icon:we.vMulti,run:e("マルチコンポーネント選択")},S:{label:"フェース",sub:"Face",icon:we.vFace,run:()=>this.setCompMode("face")},SW:{label:"頂点フェース",sub:"Vertex Face",icon:we.vVertFace,run:e("頂点フェース選択")},W:{label:"頂点",sub:"Vertex",icon:we.vVert,run:()=>this.setCompMode("vertex")}}}editMenu(){const e=t=>()=>this.hud.toast(`${t} は未実装です`);return this.state.compMode==="face"?{N:{label:"押し出し",sub:"Extrude",icon:we.extrude,run:e("押し出し")},NE:{label:"ベベル",sub:"Bevel",icon:we.scale,run:e("ベベル")},E:{label:"ブリッジ",sub:"Bridge",icon:we.vEdge,run:e("ブリッジ")},SE:{label:"複製",sub:"Duplicate",icon:we.dup,run:e("フェースの複製")},S:{label:"削除",sub:"Delete",icon:we.del,run:e("削除")},SW:{label:"コラプス",sub:"Collapse",icon:we.vVert,run:e("コラプス")},W:{label:"スムース",sub:"Smooth",icon:we.smooth,run:()=>this.doSmooth()},NW:{label:"抽出",sub:"Extract",icon:we.vFace,run:e("抽出")}}:this.state.compMode==="edge"?{N:{label:"押し出し",sub:"Extrude",icon:we.extrude,run:e("押し出し")},NE:{label:"ベベル",sub:"Bevel",icon:we.scale,run:e("ベベル")},E:{label:"ブリッジ",sub:"Bridge",icon:we.vEdge,run:e("ブリッジ")},SE:{label:"エッジループ挿入",sub:"Insert Loop",icon:we.multicut,run:e("エッジループ挿入")},S:{label:"削除",sub:"Delete",icon:we.del,run:e("エッジの削除")},SW:{label:"スピン",sub:"Spin",icon:we.rotate,run:e("スピンエッジ")},W:{label:"接続",sub:"Connect",icon:we.vMulti,run:e("接続")},NW:{label:"分離",sub:"Detach",icon:we.vVertFace,run:e("分離")}}:this.state.compMode==="vertex"?{N:{label:"マージ",sub:"Merge",icon:we.vVert,run:e("マージ")},NE:{label:"中心にマージ",sub:"To Center",icon:we.vObj,run:e("中心にマージ")},E:{label:"面取り",sub:"Chamfer",icon:we.scale,run:e("面取り")},SE:{label:"接続",sub:"Connect",icon:we.vMulti,run:e("接続")},S:{label:"削除",sub:"Delete",icon:we.del,run:e("頂点の削除")},SW:{label:"平均化",sub:"Average",icon:we.smooth,run:e("平均化")},W:{label:"分離",sub:"Detach",icon:we.vVertFace,run:e("分離")},NW:{label:"押し出し",sub:"Extrude",icon:we.extrude,run:e("頂点の押し出し")}}:{N:{label:"スムース",sub:"Smooth",icon:we.smooth,run:()=>this.doSmooth()},NE:{label:"中心にピボット",sub:"Center Pivot",icon:we.vObj,run:e("中心にピボット")},E:{label:"分離",sub:"Separate",icon:we.vVertFace,run:e("分離")},SE:{label:"複製",sub:"Duplicate",icon:we.dup,run:()=>this.doDuplicate()},S:{label:"削除",sub:"Delete",icon:we.del,run:()=>this.doDelete()},SW:{label:"ミラー",sub:"Mirror",icon:we.sym,run:e("ミラー")},W:{label:"ブーリアン",sub:"Boolean",icon:we.pCube,run:e("ブーリアン")},NW:{label:"フリーズ",sub:"Freeze",icon:we.vObj,run:e("フリーズ")}}}doSmooth(){const e=this.state.selected;if(!e)return void this.hud.toast("オブジェクトを選択してください");this.history.push("スムース"),e.mesh=c0(e.mesh,1),e.markTopologyChanged(),this.state.comp.clear(),this.viewport.rebuildObject(e),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`スムース — ${e.mesh.faceCount} 面`)}doDuplicate(){const e=this.state.selected;if(!e)return;this.history.push("複製");const t=this.state.doc.addMesh(e.mesh.clone(),`${e.name}_copy`);t.transform=ro(e.transform),this.state.select(t),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${t.name} を複製しました`)}doDelete(){const e=this.state.selected;e&&(this.history.push("削除"),this.state.doc.remove(e),this.state.select(null),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${e.name} を削除しました`))}doUndo(){const e=this.history.undo();e&&(this.viewport.syncAll(),this.selector.reset(),this.refresh(),this.hud.toast(`元に戻す: ${e}`))}doRedo(){const e=this.history.redo();e&&(this.viewport.syncAll(),this.selector.reset(),this.refresh(),this.hud.toast(`やり直す: ${e}`))}updateHistoryButtons(){it("btnUndo").disabled=!this.history.canUndo,it("btnRedo").disabled=!this.history.canRedo}buildToolDock(){const e=it("dockLeft");e.textContent="";const t=Vt("div","panel");t.dataset.panel="tools";const n=Vt("div","phead");n.appendChild(Vt("span",void 0,"ツール"));const r=Vt("div","pbody"),s=Vt("div","toolcol");s.appendChild(Vt("div","minilbl","選択"));for(const a of ha){const o=Vt("button","ibtn");o.innerHTML=Ec(w_[a.id]),o.title=`${a.label} (${a.key})`,o.setAttribute("aria-pressed",String(this.state.compMode===a.id)),o.dataset.compMode=a.id,o.addEventListener("click",()=>this.setCompMode(a.id)),s.appendChild(o)}s.appendChild(Vt("div","tool-sep")),s.appendChild(Vt("div","minilbl","追加"));for(const a of n0){const o=cr[a],l=Vt("button","ibtn");l.innerHTML=Ec(C_[a]??we.prim),l.title=`${o.label} を原点に追加`,l.addEventListener("click",()=>this.addPrimitive(a)),s.appendChild(l)}r.appendChild(s),t.append(n,r),e.appendChild(t)}addPrimitive(e){this.history.push(`${cr[e].label} を追加`);const t=this.state.doc.addObject(e);this.state.select(t),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${t.name} を追加しました`)}setCompMode(e){if(this.state.compMode!==e){this.state.compMode=e,this.state.comp.clear(),this.selector.reset(),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh();for(const t of document.querySelectorAll("[data-comp-mode]"))t.setAttribute("aria-pressed",String(t.dataset.compMode===e));this.hud.toast(ha.find(t=>t.id===e)?.label??e)}}buildGauges(){const e=()=>this.viewport.rebuildOverlay();this.gauges=[new bc(this.state,"gauge1","g1","g1lbl","g1val",e,()=>this.refresh()),new bc(this.state,"gauge2","g2","g2lbl","g2val",e,()=>this.refresh())]}buildCluster(){const e=n=>{const r=this.state.mods[n];this.state.mods[n]=r==="off"?"latch":r==="latch"?"lock":"off",this.syncModButtons()};it("modShift").addEventListener("click",()=>e("shift")),it("modCtrl").addEventListener("click",()=>e("ctrl")),it("modAlt").addEventListener("click",()=>e("alt"));const t=it("btnFrame");t.addEventListener("touchstart",n=>n.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",n=>{t.setPointerCapture(n.pointerId),this.fHeld=!0});for(const n of["pointerup","pointercancel"])t.addEventListener(n,()=>{this.fHeld&&(this.fHeld=!1,this.fChord||this.viewport.frameSelected(),this.fChord=!1)})}get fHeld(){return this.router.fHeld}set fHeld(e){this.router.fHeld=e}get fChord(){return this.router.fChord}set fChord(e){this.router.fChord=e}syncModButtons(){for(const[e,t]of[["shift","modShift"],["ctrl","modCtrl"],["alt","modAlt"]])it(t).dataset.state=this.state.mods[e]}bindKeyboard(){window.addEventListener("keydown",e=>{const t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"))return;const n=ha.find(s=>s.key===e.key);if(n){e.preventDefault(),this.setCompMode(n.id);return}const r=A_[e.key];if(r){this.state.display=r,this.viewport.syncAll(),this.refresh();return}if(e.key==="f"||e.key==="F"){this.viewport.frameSelected();return}if((e.ctrlKey||e.metaKey)&&(e.key==="z"||e.key==="Z")){e.preventDefault(),e.shiftKey?this.doRedo():this.doUndo();return}(e.ctrlKey||e.metaKey)&&(e.key==="y"||e.key==="Y")&&(e.preventDefault(),this.doRedo())})}bindTopBar(){it("btnUndo").addEventListener("click",()=>this.doUndo()),it("btnRedo").addEventListener("click",()=>this.doRedo()),it("btnPanels").addEventListener("click",()=>{this.state.panelsHidden=!this.state.panelsHidden,it("btnPanels").setAttribute("aria-pressed",String(this.state.panelsHidden)),it("dockLeft").hidden=this.state.panelsHidden,it("dockColRight").hidden=this.state.panelsHidden}),it("fileBtn").addEventListener("click",e=>this.openFileMenu(e.currentTarget)),document.addEventListener("pointerdown",e=>{this.popup&&!this.popup.contains(e.target)&&this.closePopup()})}closePopup(){this.popup?.remove(),this.popup=null,Do()}openFileMenu(e){this.closePopup();const t=e.getBoundingClientRect(),n=Vt("div","panel floating");n.style.left=`${t.left}px`,n.style.top=`${t.bottom+2}px`;const r=Vt("div","pbody"),s=(a,o)=>{const l=Vt("button","act",a);l.addEventListener("click",()=>{this.closePopup(),o()}),r.appendChild(l)};s("新規シーン",()=>this.newScene()),s("プロジェクトを開く (.mbz)",()=>this.openProject()),s("プロジェクトを保存 (.mbz)",()=>this.saveProject()),s("OBJ を読み込む",()=>this.importObj()),s("OBJ を書き出す",()=>this.exportObj()),n.appendChild(r),document.body.appendChild(n),this.popup=n}async newScene(){this.history.push("新規シーン"),this.state.doc.objects.length=0,this.state.select(null),this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]),this.viewport.syncAll(),this.refresh(),await this.autosave.saveNow()}async saveProject(){const{packMbz:e}=await Go(async()=>{const{packMbz:s}=await import("./index-B7HpXw9F.js");return{packMbz:s}},[]),t=e(this.state.doc,{appVersion:"0.1.0"}),n=`${this.state.doc.objects[0]?.name??"scene"}.mbz`,r=await vc(t,n);this.hud.toast(r.saved?`${n} を保存しました`:"保存を取り消しました")}async openProject(){const e=await xc(".mbz");if(e)try{const{unpackMbz:t}=await Go(async()=>{const{unpackMbz:r}=await import("./index-B7HpXw9F.js");return{unpackMbz:r}},[]),{document:n}=t(e.bytes);this.state.doc=n,this.state.select(n.objects[0]??null),this.history.clear(),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${e.name} を開きました`)}catch(t){this.hud.toast(t instanceof Error?t.message:"読み込めませんでした")}}async importObj(){const e=await xc(".obj,text/plain");if(e)try{const t=h0(e.text);if(!t.length)return void this.hud.toast("面が見つかりませんでした");this.history.push("OBJ 読み込み");let n=null;for(const r of t)n=this.state.doc.addMesh(r.mesh,r.name);this.state.select(n),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${e.name} を読み込みました`)}catch(t){this.hud.toast(t instanceof Error?t.message:"読み込めませんでした")}}async exportObj(){const e=this.state.selected?[this.state.selected]:this.state.doc.objects;if(!e.length)return void this.hud.toast("書き出すものがありません");const t=u0(e.map(s=>({mesh:s.mesh,name:s.name}))),n=`${e[0].name}.obj`,r=await vc(t,n);this.hud.toast(r.saved?`${n} を書き出しました`:"書き出しを取り消しました")}refresh(){this.viewport.applyDisplayAll(),this.hud.refreshStats();for(const e of this.gauges)e.paint();this.updateHistoryButtons()}}document.addEventListener("contextmenu",i=>i.preventDefault());document.addEventListener("selectstart",i=>{const e=i.target;e&&e.tagName!=="INPUT"&&e.tagName!=="TEXTAREA"&&i.preventDefault()});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/macbethUnity/app/sw.js",{scope:"/macbethUnity/app/"})});const Ah=new R_;Ah.boot();Object.assign(window,{macbeth:Ah});export{s0 as A,O_ as B,N_ as C,hh as D,c0 as E,lh as F,L_ as G,u0 as H,tn as M,cr as P,so as S,cs as a,fh as b,Vi as c,n0 as d,st as e,t0 as f,Jl as g,I_ as h,z_ as i,l0 as j,a0 as k,ro as l,B_ as m,_0 as n,i0 as o,V0 as p,na as q,r0 as r,g0 as s,F_ as t,W0 as u,U_ as v,ch as w,D_ as x,h0 as y,oh as z};
//# sourceMappingURL=app-CxHpPTG5.js.map
