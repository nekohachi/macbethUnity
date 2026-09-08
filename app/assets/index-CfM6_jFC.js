(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Ru="modulepreload",Pu=function(i){return"/macbethUnity/app/"+i},Sl={},yl=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let a=function(c){return Promise.all(c.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=a(e.map(c=>{if(c=Pu(c),c in Sl)return;Sl[c]=!0;const h=c.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":Ru,h||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),h)return new Promise((d,g)=>{f.addEventListener("load",d),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xo="185",Lu=0,bl=1,Du=2,xr=1,Iu=2,_s=3,si=0,He=1,en=2,On=0,Zi=1,El=2,wl=3,Tl=4,Uu=5,_i=100,Nu=101,Fu=102,Ou=103,Bu=104,ku=200,zu=201,Vu=202,Hu=203,Ba=204,ka=205,Gu=206,Wu=207,Xu=208,qu=209,$u=210,Yu=211,Ku=212,Zu=213,Ju=214,za=0,Va=1,Ha=2,ts=3,Ga=4,Wa=5,Xa=6,qa=7,qo=0,ju=1,Qu=2,En=0,xh=1,Mh=2,Sh=3,yh=4,bh=5,Eh=6,wh=7,Th=300,Ei=301,es=302,Xr=303,qr=304,Ur=306,$a=1e3,Fn=1001,Ya=1002,Pe=1003,tf=1004,Fs=1005,Ne=1006,$r=1007,Mi=1008,qe=1009,Ah=1010,Ch=1011,Es=1012,$o=1013,Cn=1014,yn=1015,kn=1016,Yo=1017,Ko=1018,ws=1020,Rh=35902,Ph=35899,Lh=1021,Dh=1022,fn=1023,zn=1026,Si=1027,Ih=1028,Zo=1029,wi=1030,Jo=1031,jo=1033,Mr=33776,Sr=33777,yr=33778,br=33779,Ka=35840,Za=35841,Ja=35842,ja=35843,Qa=36196,to=37492,eo=37496,no=37488,io=37489,wr=37490,so=37491,ro=37808,ao=37809,oo=37810,lo=37811,co=37812,ho=37813,uo=37814,fo=37815,po=37816,mo=37817,go=37818,vo=37819,_o=37820,xo=37821,Mo=36492,So=36494,yo=36495,bo=36283,Eo=36284,Tr=36285,wo=36286,ef=3200,To=0,nf=1,ei="",Ze="srgb",Ar="srgb-linear",Cr="linear",Qt="srgb",Li=7680,Al=519,sf=512,rf=513,af=514,Qo=515,of=516,lf=517,tl=518,cf=519,Cl=35044,Rl="300 es",bn=2e3,Ts=2001;function hf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Rr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function uf(){const i=Rr("canvas");return i.style.display="block",i}const Pl={};function Ll(...i){const t="THREE."+i.shift();console.log(t,...i)}function Uh(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Dt(...i){i=Uh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function $t(...i){i=Uh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Ji(...i){const t=i.join(" ");t in Pl||(Pl[t]=!0,Dt(...i))}function ff(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const df={[za]:Va,[Ha]:Xa,[Ga]:qa,[ts]:Wa,[Va]:za,[Xa]:Ha,[qa]:Ga,[Wa]:ts};class Ai{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yr=Math.PI/180,Ao=180/Math.PI;function Rs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[i&255]+De[i>>8&255]+De[i>>16&255]+De[i>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function qt(i,t,e){return Math.max(t,Math.min(e,i))}function pf(i,t){return(i%t+t)%t}function Kr(i,t,e){return(1-e)*i+e*t}function ls(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ve(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Wt{static{Wt.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(u!==v||l!==f||c!==d||h!==g){let m=l*f+c*d+h*g+u*v;m<0&&(f=-f,d=-d,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){const S=Math.acos(m),E=Math.sin(S);p=Math.sin(p*S)/E,o=Math.sin(o*S)/E,l=l*p+f*o,c=c*p+d*o,h=h*p+g*o,u=u*p+v*o}else{l=l*p+f*o,c=c*p+d*o,h=h*p+g*o,u=u*p+v*o;const S=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=S,c*=S,h*=S,u*=S}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-o*d,t[e+2]=c*g+h*d+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{static{D.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Dl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Dl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Zr.copy(this).projectOnVector(t),this.sub(Zr)}reflect(t){return this.sub(Zr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zr=new D,Dl=new dn;class Nt{static{Nt.prototype.isMatrix3=!0}constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],v=s[0],m=s[3],p=s[6],S=s[1],E=s[4],M=s[7],w=s[2],y=s[5],A=s[8];return r[0]=a*v+o*S+l*w,r[3]=a*m+o*E+l*y,r[6]=a*p+o*M+l*A,r[1]=c*v+h*S+u*w,r[4]=c*m+h*E+u*y,r[7]=c*p+h*M+u*A,r[2]=f*v+d*S+g*w,r[5]=f*m+d*E+g*y,r[8]=f*p+d*M+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=f*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Ji("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Jr.makeScale(t,e)),this}rotate(t){return Ji("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Jr.makeRotation(-t)),this}translate(t,e){return Ji("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Jr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Jr=new Nt,Il=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ul=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mf(){const i={enabled:!0,workingColorSpace:Ar,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qt&&(s.r=Bn(s.r),s.g=Bn(s.g),s.b=Bn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(s.r=ji(s.r),s.g=ji(s.g),s.b=ji(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ei?Cr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ji("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ji("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ar]:{primaries:t,whitePoint:n,transfer:Cr,toXYZ:Il,fromXYZ:Ul,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:t,whitePoint:n,transfer:Qt,toXYZ:Il,fromXYZ:Ul,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}}),i}const Xt=mf();function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Di;class gf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Di===void 0&&(Di=Rr("canvas")),Di.width=t.width,Di.height=t.height;const s=Di.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Di}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Rr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vf=0;class el{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=Rs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(jr(s[a].image)):r.push(jr(s[a]))}else r=jr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function jr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?gf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let _f=0;const Qr=new D;class ke extends Ai{constructor(t=ke.DEFAULT_IMAGE,e=ke.DEFAULT_MAPPING,n=Fn,s=Fn,r=Ne,a=Mi,o=fn,l=qe,c=ke.DEFAULT_ANISOTROPY,h=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=Rs(),this.name="",this.source=new el(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Qr).x}get height(){return this.source.getSize(Qr).y}get depth(){return this.source.getSize(Qr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Th)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $a:t.x=t.x-Math.floor(t.x);break;case Fn:t.x=t.x<0?0:1;break;case Ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $a:t.y=t.y-Math.floor(t.y);break;case Fn:t.y=t.y<0?0:1;break;case Ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=Th;ke.DEFAULT_ANISOTROPY=1;class ce{static{ce.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,M=(d+1)/2,w=(p+1)/2,y=(h+f)/4,A=(u+v)/4,_=(g+m)/4;return E>M&&E>w?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=y/n,r=A/n):M>w?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=y/s,r=_/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=A/r,s=_/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-v)/S,this.z=(f-h)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xf extends Ai{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ne,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new ke(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Ne,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new el(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wn extends xf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Nh extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mf extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class se{static{se.prototype.isMatrix4=!0}constructor(t,e,n,s,r,a,o,l,c,h,u,f,d,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,f,d,g,v,m)}set(t,e,n,s,r,a,o,l,c,h,u,f,d,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Ii.setFromMatrixColumn(t,0).length(),r=1/Ii.setFromMatrixColumn(t,1).length(),a=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-v*c,e[9]=-o*l,e[2]=v-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,v=c*u;e[0]=f+v*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=v+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,v=c*u;e[0]=f-v*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=v-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+v,e[1]=l*u,e[5]=v*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+v,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sf,t,yf)}lookAt(t,e,n){const s=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),Xn.crossVectors(n,We),Xn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),Xn.crossVectors(n,We)),Xn.normalize(),Os.crossVectors(We,Xn),s[0]=Xn.x,s[4]=Os.x,s[8]=We.x,s[1]=Xn.y,s[5]=Os.y,s[9]=We.y,s[2]=Xn.z,s[6]=Os.z,s[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],S=n[3],E=n[7],M=n[11],w=n[15],y=s[0],A=s[4],_=s[8],T=s[12],P=s[1],R=s[5],L=s[9],W=s[13],z=s[2],F=s[6],k=s[10],O=s[14],q=s[3],j=s[7],nt=s[11],Q=s[15];return r[0]=a*y+o*P+l*z+c*q,r[4]=a*A+o*R+l*F+c*j,r[8]=a*_+o*L+l*k+c*nt,r[12]=a*T+o*W+l*O+c*Q,r[1]=h*y+u*P+f*z+d*q,r[5]=h*A+u*R+f*F+d*j,r[9]=h*_+u*L+f*k+d*nt,r[13]=h*T+u*W+f*O+d*Q,r[2]=g*y+v*P+m*z+p*q,r[6]=g*A+v*R+m*F+p*j,r[10]=g*_+v*L+m*k+p*nt,r[14]=g*T+v*W+m*O+p*Q,r[3]=S*y+E*P+M*z+w*q,r[7]=S*A+E*R+M*F+w*j,r[11]=S*_+E*L+M*k+w*nt,r[15]=S*T+E*W+M*O+w*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],m=t[11],p=t[15],S=l*d-c*f,E=o*d-c*u,M=o*f-l*u,w=a*d-c*h,y=a*f-l*h,A=a*u-o*h;return e*(v*S-m*E+p*M)-n*(g*S-m*w+p*y)+s*(g*E-v*w+p*A)-r*(g*M-v*y+m*A)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],m=t[14],p=t[15],S=e*o-n*a,E=e*l-s*a,M=e*c-r*a,w=n*l-s*o,y=n*c-r*o,A=s*c-r*l,_=h*v-u*g,T=h*m-f*g,P=h*p-d*g,R=u*m-f*v,L=u*p-d*v,W=f*p-d*m,z=S*W-E*L+M*R+w*P-y*T+A*_;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/z;return t[0]=(o*W-l*L+c*R)*F,t[1]=(s*L-n*W-r*R)*F,t[2]=(v*A-m*y+p*w)*F,t[3]=(f*y-u*A-d*w)*F,t[4]=(l*P-a*W-c*T)*F,t[5]=(e*W-s*P+r*T)*F,t[6]=(m*M-g*A-p*E)*F,t[7]=(h*A-f*M+d*E)*F,t[8]=(a*L-o*P+c*_)*F,t[9]=(n*P-e*L-r*_)*F,t[10]=(g*y-v*M+p*S)*F,t[11]=(u*M-h*y-d*S)*F,t[12]=(o*T-a*R-l*_)*F,t[13]=(e*R-n*T+s*_)*F,t[14]=(v*E-g*w-m*S)*F,t[15]=(h*w-u*E+f*S)*F,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,v=a*h,m=a*u,p=o*u,S=l*c,E=l*h,M=l*u,w=n.x,y=n.y,A=n.z;return s[0]=(1-(v+p))*w,s[1]=(d+M)*w,s[2]=(g-E)*w,s[3]=0,s[4]=(d-M)*y,s[5]=(1-(f+p))*y,s[6]=(m+S)*y,s[7]=0,s[8]=(g+E)*A,s[9]=(m-S)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ii.set(s[0],s[1],s[2]).length();const o=Ii.set(s[4],s[5],s[6]).length(),l=Ii.set(s[8],s[9],s[10]).length();r<0&&(a=-a),sn.copy(this);const c=1/a,h=1/o,u=1/l;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,e.setFromRotationMatrix(sn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=bn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===bn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Ts)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=bn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===bn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Ts)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ii=new D,sn=new se,Sf=new D(0,0,0),yf=new D(1,1,1),Xn=new D,Os=new D,We=new D,Nl=new se,Fl=new dn;class ri{constructor(t=0,e=0,n=0,s=ri.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Nl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Nl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fl.setFromEuler(this),this.setFromQuaternion(Fl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ri.DEFAULT_ORDER="XYZ";class nl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bf=0;const Ol=new D,Ui=new dn,Pn=new se,Bs=new D,cs=new D,Ef=new D,wf=new dn,Bl=new D(1,0,0),kl=new D(0,1,0),zl=new D(0,0,1),Vl={type:"added"},Tf={type:"removed"},Ni={type:"childadded",child:null},ta={type:"childremoved",child:null};class ye extends Ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=Rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new D,e=new ri,n=new dn,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Nt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.premultiply(Ui),this}rotateX(t){return this.rotateOnAxis(Bl,t)}rotateY(t){return this.rotateOnAxis(kl,t)}rotateZ(t){return this.rotateOnAxis(zl,t)}translateOnAxis(t,e){return Ol.copy(t).applyQuaternion(this.quaternion),this.position.add(Ol.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Bl,t)}translateY(t){return this.translateOnAxis(kl,t)}translateZ(t){return this.translateOnAxis(zl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Bs.copy(t):Bs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(cs,Bs,this.up):Pn.lookAt(Bs,cs,this.up),this.quaternion.setFromRotationMatrix(Pn),s&&(Pn.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(Pn),this.quaternion.premultiply(Ui.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?($t("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vl),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null):$t("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Tf),ta.child=t,this.dispatchEvent(ta),ta.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vl),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,t,Ef),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,wf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ye.DEFAULT_UP=new D(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class cn extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Af={type:"move"};class ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Af)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new cn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Fh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},ks={h:0,s:0,l:0};function na(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Vt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=pf(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=na(a,r,t+1/3),this.g=na(a,r,t),this.b=na(a,r,t-1/3)}return Xt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ze){function n(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){const n=Fh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=ji(t.r),this.g=ji(t.g),this.b=ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return Xt.workingToColorSpace(Ie.copy(this),t),Math.round(qt(Ie.r*255,0,255))*65536+Math.round(qt(Ie.g*255,0,255))*256+Math.round(qt(Ie.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.workingToColorSpace(Ie.copy(this),e);const n=Ie.r,s=Ie.g,r=Ie.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.workingToColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Ze){Xt.workingToColorSpace(Ie.copy(this),t);const e=Ie.r,n=Ie.g,s=Ie.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(qn),this.setHSL(qn.h+t,qn.s+e,qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(qn),t.getHSL(ks);const n=Kr(qn.h,ks.h,e),s=Kr(qn.s,ks.s,e),r=Kr(qn.l,ks.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ie=new Vt;Vt.NAMES=Fh;class Cf extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const rn=new D,Ln=new D,ia=new D,Dn=new D,Fi=new D,Oi=new D,Hl=new D,sa=new D,ra=new D,aa=new D,oa=new ce,la=new ce,ca=new ce;class hn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),rn.subVectors(t,e),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){rn.subVectors(s,e),Ln.subVectors(n,e),ia.subVectors(t,e);const a=rn.dot(rn),o=rn.dot(Ln),l=rn.dot(ia),c=Ln.dot(Ln),h=Ln.dot(ia),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return oa.setScalar(0),la.setScalar(0),ca.setScalar(0),oa.fromBufferAttribute(t,e),la.fromBufferAttribute(t,n),ca.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(oa,r.x),a.addScaledVector(la,r.y),a.addScaledVector(ca,r.z),a}static isFrontFacing(t,e,n,s){return rn.subVectors(n,e),Ln.subVectors(t,e),rn.cross(Ln).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),rn.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Fi.subVectors(s,n),Oi.subVectors(r,n),sa.subVectors(t,n);const l=Fi.dot(sa),c=Oi.dot(sa);if(l<=0&&c<=0)return e.copy(n);ra.subVectors(t,s);const h=Fi.dot(ra),u=Oi.dot(ra);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Fi,a);aa.subVectors(t,r);const d=Fi.dot(aa),g=Oi.dot(aa);if(g>=0&&d<=g)return e.copy(r);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Oi,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Hl.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(Hl,o);const p=1/(m+v+f);return a=v*p,o=f*p,e.copy(n).addScaledVector(Fi,a).addScaledVector(Oi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ps{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zs.copy(n.boundingBox)),zs.applyMatrix4(t.matrixWorld),this.union(zs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(hs),Vs.subVectors(this.max,hs),Bi.subVectors(t.a,hs),ki.subVectors(t.b,hs),zi.subVectors(t.c,hs),$n.subVectors(ki,Bi),Yn.subVectors(zi,ki),hi.subVectors(Bi,zi);let e=[0,-$n.z,$n.y,0,-Yn.z,Yn.y,0,-hi.z,hi.y,$n.z,0,-$n.x,Yn.z,0,-Yn.x,hi.z,0,-hi.x,-$n.y,$n.x,0,-Yn.y,Yn.x,0,-hi.y,hi.x,0];return!ha(e,Bi,ki,zi,Vs)||(e=[1,0,0,0,1,0,0,0,1],!ha(e,Bi,ki,zi,Vs))?!1:(Hs.crossVectors($n,Yn),e=[Hs.x,Hs.y,Hs.z],ha(e,Bi,ki,zi,Vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const In=[new D,new D,new D,new D,new D,new D,new D,new D],an=new D,zs=new Ps,Bi=new D,ki=new D,zi=new D,$n=new D,Yn=new D,hi=new D,hs=new D,Vs=new D,Hs=new D,ui=new D;function ha(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ui.fromArray(i,r);const o=s.x*Math.abs(ui.x)+s.y*Math.abs(ui.y)+s.z*Math.abs(ui.z),l=t.dot(ui),c=e.dot(ui),h=n.dot(ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const _e=new D,Gs=new Wt;let Rf=0;class Tn extends Ai{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Cl,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Gs.fromBufferAttribute(this,e),Gs.applyMatrix3(t),this.setXY(e,Gs.x,Gs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ls(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ve(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ls(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ls(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ls(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ls(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),s=Ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),s=Ve(s,this.array),r=Ve(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cl&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Oh extends Tn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Bh extends Tn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends Tn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Pf=new Ps,us=new D,ua=new D;class Ls{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Pf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;us.subVectors(t,this.center);const e=us.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(us,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ua.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(us.copy(t.center).add(ua)),this.expandByPoint(us.copy(t.center).sub(ua))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Lf=0;const Ke=new se,fa=new ye,Vi=new D,Xe=new Ps,fs=new Ps,Te=new D;class Me extends Ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=Rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hf(t)?Bh:Oh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,n){return Ke.makeTranslation(t,e,n),this.applyMatrix4(Ke),this}scale(t,e,n){return Ke.makeScale(t,e,n),this.applyMatrix4(Ke),this}lookAt(t){return fa.lookAt(t),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new oe(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ps);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ls);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];fs.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(Xe.min,fs.min),Xe.expandByPoint(Te),Te.addVectors(Xe.max,fs.max),Xe.expandByPoint(Te)):(Xe.expandByPoint(fs.min),Xe.expandByPoint(fs.max))}Xe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Te.fromBufferAttribute(o,c),l&&(Vi.fromBufferAttribute(t,c),Te.add(Vi)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&$t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){$t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Tn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new D,l[_]=new D;const c=new D,h=new D,u=new D,f=new Wt,d=new Wt,g=new Wt,v=new D,m=new D;function p(_,T,P){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,P),f.fromBufferAttribute(r,_),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,P),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(R),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(R),o[_].add(v),o[T].add(v),o[P].add(v),l[_].add(m),l[T].add(m),l[P].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let _=0,T=S.length;_<T;++_){const P=S[_],R=P.start,L=P.count;for(let W=R,z=R+L;W<z;W+=3)p(t.getX(W+0),t.getX(W+1),t.getX(W+2))}const E=new D,M=new D,w=new D,y=new D;function A(_){w.fromBufferAttribute(s,_),y.copy(w);const T=o[_];E.copy(T),E.sub(w.multiplyScalar(w.dot(T))).normalize(),M.crossVectors(y,T);const R=M.dot(l[_])<0?-1:1;a.setXYZW(_,E.x,E.y,E.z,R)}for(let _=0,T=S.length;_<T;++_){const P=S[_],R=P.start,L=P.count;for(let W=R,z=R+L;W<z;W+=3)A(t.getX(W+0)),A(t.getX(W+1)),A(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Tn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Tn(f,h,u)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Me,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Df=0;class Ci extends Ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=Rs(),this.name="",this.type="Material",this.blending=Zi,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ba,this.blendDst=ka,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(n.blending=this.blending),this.side!==si&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ba&&(n.blendSrc=this.blendSrc),this.blendDst!==ka&&(n.blendDst=this.blendDst),this.blendEquation!==_i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Vt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Wt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Wt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Un=new D,da=new D,Ws=new D,Kn=new D,pa=new D,Xs=new D,ma=new D;class Nr{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Un.copy(this.origin).addScaledVector(this.direction,e),Un.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){da.copy(t).add(e).multiplyScalar(.5),Ws.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(da);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ws),o=Kn.dot(this.direction),l=-Kn.dot(Ws),c=Kn.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(da).addScaledVector(Ws,f),d}intersectSphere(t,e){Un.subVectors(t.center,this.origin);const n=Un.dot(this.direction),s=Un.dot(Un)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Un)!==null}intersectTriangle(t,e,n,s,r){pa.subVectors(e,t),Xs.subVectors(n,t),ma.crossVectors(pa,Xs);let a=this.direction.dot(ma),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Kn.subVectors(this.origin,t);const l=o*this.direction.dot(Xs.crossVectors(Kn,Xs));if(l<0)return null;const c=o*this.direction.dot(pa.cross(Kn));if(c<0||l+c>a)return null;const h=-o*Kn.dot(ma);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ni extends Ci{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Gl=new se,fi=new Nr,qs=new Ls,Wl=new D,$s=new D,Ys=new D,Ks=new D,ga=new D,Zs=new D,Xl=new D,Js=new D;let Fe=class extends ye{constructor(t=new Me,e=new ni){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Zs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(ga.fromBufferAttribute(u,t),a?Zs.addScaledVector(ga,h):Zs.addScaledVector(ga.sub(e),h))}e.add(Zs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(r),fi.copy(t.ray).recast(t.near),!(qs.containsPoint(fi.origin)===!1&&(fi.intersectSphere(qs,Wl)===null||fi.origin.distanceToSquared(Wl)>(t.far-t.near)**2))&&(Gl.copy(r).invert(),fi.copy(t.ray).applyMatrix4(Gl),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],S=Math.max(m.start,d.start),E=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=S,w=E;M<w;M+=3){const y=o.getX(M),A=o.getX(M+1),_=o.getX(M+2);s=js(this,p,t,n,c,h,u,y,A,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const S=o.getX(m),E=o.getX(m+1),M=o.getX(m+2);s=js(this,a,t,n,c,h,u,S,E,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],S=Math.max(m.start,d.start),E=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=S,w=E;M<w;M+=3){const y=M,A=M+1,_=M+2;s=js(this,p,t,n,c,h,u,y,A,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const S=m,E=m+1,M=m+2;s=js(this,a,t,n,c,h,u,S,E,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function If(i,t,e,n,s,r,a,o){let l;if(t.side===He?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===si,o),l===null)return null;Js.copy(o),Js.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Js);return c<e.near||c>e.far?null:{distance:c,point:Js.clone(),object:i}}function js(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,$s),i.getVertexPosition(l,Ys),i.getVertexPosition(c,Ks);const h=If(i,t,e,n,$s,Ys,Ks,Xl);if(h){const u=new D;hn.getBarycoord(Xl,$s,Ys,Ks,u),s&&(h.uv=hn.getInterpolatedAttribute(s,o,l,c,u,new Wt)),r&&(h.uv1=hn.getInterpolatedAttribute(r,o,l,c,u,new Wt)),a&&(h.normal=hn.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new D,materialIndex:0};hn.getNormal($s,Ys,Ks,f.normal),h.face=f,h.barycoord=u}return h}class Uf extends ke{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Pe,h=Pe,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const va=new D,Nf=new D,Ff=new Nt;class ti{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=va.subVectors(n,e).cross(Nf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(va),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ff.getNormalMatrix(t),s=this.coplanarPoint(va).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const di=new Ls,Of=new Wt(.5,.5),Qs=new D;class il{constructor(t=new ti,e=new ti,n=new ti,s=new ti,r=new ti,a=new ti){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=bn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],v=r[9],m=r[10],p=r[11],S=r[12],E=r[13],M=r[14],w=r[15];if(s[0].setComponents(c-a,d-h,p-g,w-S).normalize(),s[1].setComponents(c+a,d+h,p+g,w+S).normalize(),s[2].setComponents(c+o,d+u,p+v,w+E).normalize(),s[3].setComponents(c-o,d-u,p-v,w-E).normalize(),n)s[4].setComponents(l,f,m,M).normalize(),s[5].setComponents(c-l,d-f,p-m,w-M).normalize();else if(s[4].setComponents(c-l,d-f,p-m,w-M).normalize(),e===bn)s[5].setComponents(c+l,d+f,p+m,w+M).normalize();else if(e===Ts)s[5].setComponents(l,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(t){di.center.set(0,0,0);const e=Of.distanceTo(t.center);return di.radius=.7071067811865476+e,di.applyMatrix4(t.matrixWorld),this.intersectsSphere(di)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Qs.x=s.normal.x>0?t.max.x:t.min.x,Qs.y=s.normal.y>0?t.max.y:t.min.y,Qs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Qs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Qe extends Ci{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Pr=new D,Lr=new D,ql=new se,ds=new Nr,tr=new Ls,_a=new D,$l=new D;class Ds extends ye{constructor(t=new Me,e=new Qe){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Pr.fromBufferAttribute(e,s-1),Lr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Pr.distanceTo(Lr);t.setAttribute("lineDistance",new oe(n,1))}else Dt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(s),tr.radius+=r,t.ray.intersectsSphere(tr)===!1)return;ql.copy(s).invert(),ds.copy(t.ray).applyMatrix4(ql);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){const p=h.getX(v),S=h.getX(v+1),E=er(this,t,ds,l,p,S,v);E&&e.push(E)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(d),p=er(this,t,ds,l,v,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=c){const p=er(this,t,ds,l,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=er(this,t,ds,l,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function er(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Pr.fromBufferAttribute(o,s),Lr.fromBufferAttribute(o,r),e.distanceSqToSegment(Pr,Lr,_a,$l)>n)return;_a.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(_a);if(!(c<t.near||c>t.far))return{distance:c,point:$l.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Yl=new D,Kl=new D;class Fr extends Ds{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Yl.fromBufferAttribute(e,s),Kl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Yl.distanceTo(Kl);t.setAttribute("lineDistance",new oe(n,1))}else Dt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class yi extends Ci{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Zl=new se,Co=new Nr,nr=new Ls,ir=new D;class ns extends ye{constructor(t=new Me,e=new yi){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(s),nr.radius+=r,t.ray.intersectsSphere(nr)===!1)return;Zl.copy(s).invert(),Co.copy(t.ray).applyMatrix4(Zl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=f,v=d;g<v;g++){const m=c.getX(g);ir.fromBufferAttribute(u,m),Jl(ir,m,l,s,t,e,this)}}else{const f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let g=f,v=d;g<v;g++)ir.fromBufferAttribute(u,g),Jl(ir,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Jl(i,t,e,n,s,r,a){const o=Co.distanceSqToPoint(i);if(o<e){const l=new D;Co.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class kh extends ke{constructor(t=[],e=Ei,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class is extends ke{constructor(t,e,n=Cn,s,r,a,o=Pe,l=Pe,c,h=zn,u=1){if(h!==zn&&h!==Si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new el(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Bf extends is{constructor(t,e=Cn,n=Ei,s,r,a=Pe,o=Pe,l,c=zn){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class zh extends ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ti extends Me{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function g(v,m,p,S,E,M,w,y,A,_,T){const P=M/A,R=w/_,L=M/2,W=w/2,z=y/2,F=A+1,k=_+1;let O=0,q=0;const j=new D;for(let nt=0;nt<k;nt++){const Q=nt*R-W;for(let st=0;st<F;st++){const wt=st*P-L;j[v]=wt*S,j[m]=Q*E,j[p]=z,c.push(j.x,j.y,j.z),j[v]=0,j[m]=0,j[p]=y>0?1:-1,h.push(j.x,j.y,j.z),u.push(st/A),u.push(1-nt/_),O+=1}}for(let nt=0;nt<_;nt++)for(let Q=0;Q<A;Q++){const st=f+Q+F*nt,wt=f+Q+F*(nt+1),Ut=f+(Q+1)+F*(nt+1),Tt=f+(Q+1)+F*nt;l.push(st,wt,Tt),l.push(wt,Ut,Tt),q+=6}o.addGroup(d,q,T),d+=q,f+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ti(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class sl extends Me{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;S(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(f,3)),this.setAttribute("uv",new oe(d,2));function S(){const M=new D,w=new D;let y=0;const A=(e-t)/n;for(let _=0;_<=r;_++){const T=[],P=_/r,R=P*(e-t)+t;for(let L=0;L<=s;L++){const W=L/s,z=W*l+o,F=Math.sin(z),k=Math.cos(z);w.x=R*F,w.y=-P*n+m,w.z=R*k,u.push(w.x,w.y,w.z),M.set(F,A,k).normalize(),f.push(M.x,M.y,M.z),d.push(W,1-P),T.push(g++)}v.push(T)}for(let _=0;_<s;_++)for(let T=0;T<r;T++){const P=v[T][_],R=v[T+1][_],L=v[T+1][_+1],W=v[T][_+1];(t>0||T!==0)&&(h.push(P,R,W),y+=3),(e>0||T!==r-1)&&(h.push(R,L,W),y+=3)}c.addGroup(p,y,0),p+=y}function E(M){const w=g,y=new Wt,A=new D;let _=0;const T=M===!0?t:e,P=M===!0?1:-1;for(let L=1;L<=s;L++)u.push(0,m*P,0),f.push(0,P,0),d.push(.5,.5),g++;const R=g;for(let L=0;L<=s;L++){const z=L/s*l+o,F=Math.cos(z),k=Math.sin(z);A.x=T*k,A.y=m*P,A.z=T*F,u.push(A.x,A.y,A.z),f.push(0,P,0),y.x=F*.5+.5,y.y=k*.5*P+.5,d.push(y.x,y.y),g++}for(let L=0;L<s;L++){const W=w+L,z=R+L;M===!0?h.push(z,z+1,W):h.push(z+1,z,W),_+=3}c.addGroup(p,_,M===!0?1:2),p+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sl(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class rl extends sl{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new rl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Or extends Me{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const S=p*f-a;for(let E=0;E<c;E++){const M=E*u-r;g.push(M,-S,0),v.push(0,0,1),m.push(E/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const E=S+c*p,M=S+c*(p+1),w=S+1+c*(p+1),y=S+1+c*p;d.push(E,M,y),d.push(M,w,y)}this.setIndex(d),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(v,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Or(t.width,t.height,t.widthSegments,t.heightSegments)}}class al extends Me{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new D,f=new D,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const S=[],E=p/n,M=a+E*o,w=t*Math.cos(M),y=Math.sqrt(t*t-w*w);let A=0;p===0&&a===0?A=.5/e:p===n&&l===Math.PI&&(A=-.5/e);for(let _=0;_<=e;_++){const T=_/e,P=s+T*r;u.x=-y*Math.cos(P),u.y=w,u.z=y*Math.sin(P),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(T+A,1-E),S.push(c++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){const E=h[p][S+1],M=h[p][S],w=h[p+1][S],y=h[p+1][S+1];(p!==0||a>0)&&d.push(E,M,y),(p!==n-1||l<Math.PI)&&d.push(M,w,y)}this.setIndex(d),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(v,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new al(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function ss(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(jl(s))s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(jl(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Be(i){const t={};for(let e=0;e<i.length;e++){const n=ss(i[e]);for(const s in n)t[s]=n[s]}return t}function jl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function kf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Vh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const zf={clone:ss,merge:Be};var Vf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends Ci{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vf,this.fragmentShader=Hf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ss(t.uniforms),this.uniformsGroups=kf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Vt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Wt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new D().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ce().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Nt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new se().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Gf extends Rn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Wf extends Ci{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Vt(16777215),this.specular=new Vt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=To,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=qo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Xf extends Ci{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ef,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class qf extends Ci{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Hh extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class $f extends Hh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Vt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const xa=new se,Ql=new D,tc=new D;class Yf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=qe,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new il,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ql.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ql),tc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(tc),e.updateMatrixWorld(),xa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xa,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Ts||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const sr=new D,rr=new dn,vn=new D;class Gh extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(sr,rr,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sr,rr,vn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(sr,rr,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sr,rr,vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Zn=new D,ec=new Wt,nc=new Wt;class tn extends Gh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ao*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Yr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ao*2*Math.atan(Math.tan(Yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z)}getViewSize(t,e){return this.getViewBounds(t,ec,nc),e.subVectors(nc,ec)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Yr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Br extends Gh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Kf extends Yf{constructor(){super(new Br(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ic extends Hh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.shadow=new Kf}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Hi=-90,Gi=1;class Zf extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new tn(Hi,Gi,t,e);s.layers=this.layers,this.add(s);const r=new tn(Hi,Gi,t,e);r.layers=this.layers,this.add(r);const a=new tn(Hi,Gi,t,e);a.layers=this.layers,this.add(a);const o=new tn(Hi,Gi,t,e);o.layers=this.layers,this.add(o);const l=new tn(Hi,Gi,t,e);l.layers=this.layers,this.add(l);const c=new tn(Hi,Gi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ts)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Jf extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const sc=new se;class Wh{constructor(t,e,n=0,s=1/0){this.ray=new Nr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new nl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):$t("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return sc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sc),this}intersectObject(t,e=!0,n=[]){return Ro(t,this,n,e),n.sort(rc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ro(t[s],this,n,e);return n.sort(rc),n}}function rc(i,t){return i.distance-t.distance}function Ro(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Ro(r[a],t,e,!0)}}class Xh{static{Xh.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}}class jf extends Fr{constructor(t=10,e=10,n=4473924,s=8947848){n=new Vt(n),s=new Vt(s);const r=e/2,a=t/e,o=t/2,l=[],c=[];for(let f=0,d=0,g=-o;f<=e;f++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const v=f===r?n:s;v.toArray(c,d),d+=3,v.toArray(c,d),d+=3,v.toArray(c,d),d+=3,v.toArray(c,d),d+=3}const h=new Me;h.setAttribute("position",new oe(l,3)),h.setAttribute("color",new oe(c,3));const u=new Qe({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function ac(i,t,e,n){const s=Qf(n);switch(e){case Lh:return i*t;case Ih:return i*t/s.components*s.byteLength;case Zo:return i*t/s.components*s.byteLength;case wi:return i*t*2/s.components*s.byteLength;case Jo:return i*t*2/s.components*s.byteLength;case Dh:return i*t*3/s.components*s.byteLength;case fn:return i*t*4/s.components*s.byteLength;case jo:return i*t*4/s.components*s.byteLength;case Mr:case Sr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case yr:case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Za:case ja:return Math.max(i,16)*Math.max(t,8)/4;case Ka:case Ja:return Math.max(i,8)*Math.max(t,8)/2;case Qa:case to:case no:case io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case eo:case wr:case so:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ao:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case lo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case co:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ho:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case uo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case fo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case po:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case go:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case vo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _o:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Mo:case So:case yo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case bo:case Eo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Tr:case wo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Qf(i){switch(i){case qe:case Ah:return{byteLength:1,components:1};case Es:case Ch:case kn:return{byteLength:2,components:1};case Yo:case Ko:return{byteLength:2,components:4};case Cn:case $o:case yn:return{byteLength:4,components:1};case Rh:case Ph:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xo}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function qh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function td(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var ed=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nd=`#ifdef USE_ALPHAHASH
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
#endif`,id=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,od=`#ifdef USE_AOMAP
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
#endif`,ld=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cd=`#ifdef USE_BATCHING
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
#endif`,hd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ud=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pd=`#ifdef USE_IRIDESCENCE
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
#endif`,md=`#ifdef USE_BUMPMAP
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
#endif`,gd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Md=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Sd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,yd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Ed=`#define PI 3.141592653589793
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
} // validated`,wd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Td=`vec3 transformedNormal = objectNormal;
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
#endif`,Ad=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ld="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Id=`#ifdef USE_ENVMAP
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
#endif`,Ud=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Nd=`#ifdef USE_ENVMAP
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
#endif`,Fd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Od=`#ifdef USE_ENVMAP
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
#endif`,Bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hd=`#ifdef USE_GRADIENTMAP
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
}`,Gd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,$d=`#ifdef USE_ENVMAP
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
#endif`,Yd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jd=`PhysicalMaterial material;
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
#endif`,Qd=`uniform sampler2D dfgLUT;
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
}`,tp=`
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
#endif`,ep=`#if defined( RE_IndirectDiffuse )
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
#endif`,np=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ip=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,sp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ap=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,op=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,up=`#if defined( USE_POINTS_UV )
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
#endif`,fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vp=`#ifdef USE_MORPHTARGETS
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
#endif`,_p=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ep=`#ifdef USE_NORMALMAP
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
#endif`,wp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ap=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ip=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Op=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zp=`float getShadowMask() {
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
}`,Vp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hp=`#ifdef USE_SKINNING
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
#endif`,Gp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wp=`#ifdef USE_SKINNING
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
#endif`,Xp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$p=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kp=`#ifdef USE_TRANSMISSION
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
#endif`,Zp=`#ifdef USE_TRANSMISSION
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
#endif`,Jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const em=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nm=`uniform sampler2D t2D;
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
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,am=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`#include <common>
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
}`,lm=`#if DEPTH_PACKING == 3200
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
}`,cm=`#define DISTANCE
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
}`,hm=`#define DISTANCE
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
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dm=`uniform float scale;
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
}`,pm=`uniform vec3 diffuse;
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
}`,mm=`#include <common>
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
}`,gm=`uniform vec3 diffuse;
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
}`,vm=`#define LAMBERT
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
}`,_m=`#define LAMBERT
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
}`,xm=`#define MATCAP
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
}`,Mm=`#define MATCAP
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
}`,Sm=`#define NORMAL
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
}`,ym=`#define NORMAL
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
}`,bm=`#define PHONG
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
}`,Em=`#define PHONG
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
}`,wm=`#define STANDARD
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
}`,Tm=`#define STANDARD
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
}`,Am=`#define TOON
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
}`,Cm=`#define TOON
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
}`,Rm=`uniform float size;
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Lm=`#include <common>
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
}`,Dm=`uniform vec3 color;
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
}`,Im=`uniform float rotation;
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
}`,Um=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:ed,alphahash_pars_fragment:nd,alphamap_fragment:id,alphamap_pars_fragment:sd,alphatest_fragment:rd,alphatest_pars_fragment:ad,aomap_fragment:od,aomap_pars_fragment:ld,batching_pars_vertex:cd,batching_vertex:hd,begin_vertex:ud,beginnormal_vertex:fd,bsdfs:dd,iridescence_fragment:pd,bumpmap_pars_fragment:md,clipping_planes_fragment:gd,clipping_planes_pars_fragment:vd,clipping_planes_pars_vertex:_d,clipping_planes_vertex:xd,color_fragment:Md,color_pars_fragment:Sd,color_pars_vertex:yd,color_vertex:bd,common:Ed,cube_uv_reflection_fragment:wd,defaultnormal_vertex:Td,displacementmap_pars_vertex:Ad,displacementmap_vertex:Cd,emissivemap_fragment:Rd,emissivemap_pars_fragment:Pd,colorspace_fragment:Ld,colorspace_pars_fragment:Dd,envmap_fragment:Id,envmap_common_pars_fragment:Ud,envmap_pars_fragment:Nd,envmap_pars_vertex:Fd,envmap_physical_pars_fragment:$d,envmap_vertex:Od,fog_vertex:Bd,fog_pars_vertex:kd,fog_fragment:zd,fog_pars_fragment:Vd,gradientmap_pars_fragment:Hd,lightmap_pars_fragment:Gd,lights_lambert_fragment:Wd,lights_lambert_pars_fragment:Xd,lights_pars_begin:qd,lights_toon_fragment:Yd,lights_toon_pars_fragment:Kd,lights_phong_fragment:Zd,lights_phong_pars_fragment:Jd,lights_physical_fragment:jd,lights_physical_pars_fragment:Qd,lights_fragment_begin:tp,lights_fragment_maps:ep,lights_fragment_end:np,lightprobes_pars_fragment:ip,logdepthbuf_fragment:sp,logdepthbuf_pars_fragment:rp,logdepthbuf_pars_vertex:ap,logdepthbuf_vertex:op,map_fragment:lp,map_pars_fragment:cp,map_particle_fragment:hp,map_particle_pars_fragment:up,metalnessmap_fragment:fp,metalnessmap_pars_fragment:dp,morphinstance_vertex:pp,morphcolor_vertex:mp,morphnormal_vertex:gp,morphtarget_pars_vertex:vp,morphtarget_vertex:_p,normal_fragment_begin:xp,normal_fragment_maps:Mp,normal_pars_fragment:Sp,normal_pars_vertex:yp,normal_vertex:bp,normalmap_pars_fragment:Ep,clearcoat_normal_fragment_begin:wp,clearcoat_normal_fragment_maps:Tp,clearcoat_pars_fragment:Ap,iridescence_pars_fragment:Cp,opaque_fragment:Rp,packing:Pp,premultiplied_alpha_fragment:Lp,project_vertex:Dp,dithering_fragment:Ip,dithering_pars_fragment:Up,roughnessmap_fragment:Np,roughnessmap_pars_fragment:Fp,shadowmap_pars_fragment:Op,shadowmap_pars_vertex:Bp,shadowmap_vertex:kp,shadowmask_pars_fragment:zp,skinbase_vertex:Vp,skinning_pars_vertex:Hp,skinning_vertex:Gp,skinnormal_vertex:Wp,specularmap_fragment:Xp,specularmap_pars_fragment:qp,tonemapping_fragment:$p,tonemapping_pars_fragment:Yp,transmission_fragment:Kp,transmission_pars_fragment:Zp,uv_pars_fragment:Jp,uv_pars_vertex:jp,uv_vertex:Qp,worldpos_vertex:tm,background_vert:em,background_frag:nm,backgroundCube_vert:im,backgroundCube_frag:sm,cube_vert:rm,cube_frag:am,depth_vert:om,depth_frag:lm,distance_vert:cm,distance_frag:hm,equirect_vert:um,equirect_frag:fm,linedashed_vert:dm,linedashed_frag:pm,meshbasic_vert:mm,meshbasic_frag:gm,meshlambert_vert:vm,meshlambert_frag:_m,meshmatcap_vert:xm,meshmatcap_frag:Mm,meshnormal_vert:Sm,meshnormal_frag:ym,meshphong_vert:bm,meshphong_frag:Em,meshphysical_vert:wm,meshphysical_frag:Tm,meshtoon_vert:Am,meshtoon_frag:Cm,points_vert:Rm,points_frag:Pm,shadow_vert:Lm,shadow_frag:Dm,sprite_vert:Im,sprite_frag:Um},dt={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},Mn={basic:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)},envMapIntensity:{value:1}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Be([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Be([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Be([dt.points,dt.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Be([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Be([dt.common,dt.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Be([dt.sprite,dt.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distance:{uniforms:Be([dt.common,dt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distance_vert,fragmentShader:kt.distance_frag},shadow:{uniforms:Be([dt.lights,dt.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};Mn.physical={uniforms:Be([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const ar={r:0,b:0,g:0},Nm=new se,$h=new Nt;$h.set(-1,0,0,0,1,0,0,0,1);function Fm(i,t,e,n,s,r){const a=new Vt(0);let o=s===!0?0:1,l,c,h=null,u=0,f=null;function d(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){const M=S.backgroundBlurriness>0;E=t.get(E,M)}return E}function g(S){let E=!1;const M=d(S);M===null?m(a,o):M&&M.isColor&&(m(M,1),E=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(S,E){const M=d(E);M&&(M.isCubeTexture||M.mapping===Ur)?(c===void 0&&(c=new Fe(new Ti(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:ss(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,y,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Nm.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply($h),c.material.toneMapped=Xt.getTransfer(M.colorSpace)!==Qt,(h!==M||u!==M.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Fe(new Or(2,2),new Rn({name:"BackgroundMaterial",uniforms:ss(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Xt.getTransfer(M.colorSpace)!==Qt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,E){S.getRGB(ar,Vh(i)),e.buffers.color.setClear(ar.r,ar.g,ar.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:v,dispose:p}}function Om(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(R,L,W,z,F){let k=!1;const O=u(R,z,W,L);r!==O&&(r=O,c(r.object)),k=d(R,z,W,F),k&&g(R,z,W,F),F!==null&&t.update(F,i.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,M(R,L,W,z),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return i.createVertexArray()}function c(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function u(R,L,W,z){const F=z.wireframe===!0;let k=n[L.id];k===void 0&&(k={},n[L.id]=k);const O=R.isInstancedMesh===!0?R.id:0;let q=k[O];q===void 0&&(q={},k[O]=q);let j=q[W.id];j===void 0&&(j={},q[W.id]=j);let nt=j[F];return nt===void 0&&(nt=f(l()),j[F]=nt),nt}function f(R){const L=[],W=[],z=[];for(let F=0;F<e;F++)L[F]=0,W[F]=0,z[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:W,attributeDivisors:z,object:R,attributes:{},index:null}}function d(R,L,W,z){const F=r.attributes,k=L.attributes;let O=0;const q=W.getAttributes();for(const j in q)if(q[j].location>=0){const Q=F[j];let st=k[j];if(st===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(st=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(st=R.instanceColor)),Q===void 0||Q.attribute!==st||st&&Q.data!==st.data)return!0;O++}return r.attributesNum!==O||r.index!==z}function g(R,L,W,z){const F={},k=L.attributes;let O=0;const q=W.getAttributes();for(const j in q)if(q[j].location>=0){let Q=k[j];Q===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(Q=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(Q=R.instanceColor));const st={};st.attribute=Q,Q&&Q.data&&(st.data=Q.data),F[j]=st,O++}r.attributes=F,r.attributesNum=O,r.index=z}function v(){const R=r.newAttributes;for(let L=0,W=R.length;L<W;L++)R[L]=0}function m(R){p(R,0)}function p(R,L){const W=r.newAttributes,z=r.enabledAttributes,F=r.attributeDivisors;W[R]=1,z[R]===0&&(i.enableVertexAttribArray(R),z[R]=1),F[R]!==L&&(i.vertexAttribDivisor(R,L),F[R]=L)}function S(){const R=r.newAttributes,L=r.enabledAttributes;for(let W=0,z=L.length;W<z;W++)L[W]!==R[W]&&(i.disableVertexAttribArray(W),L[W]=0)}function E(R,L,W,z,F,k,O){O===!0?i.vertexAttribIPointer(R,L,W,F,k):i.vertexAttribPointer(R,L,W,z,F,k)}function M(R,L,W,z){v();const F=z.attributes,k=W.getAttributes(),O=L.defaultAttributeValues;for(const q in k){const j=k[q];if(j.location>=0){let nt=F[q];if(nt===void 0&&(q==="instanceMatrix"&&R.instanceMatrix&&(nt=R.instanceMatrix),q==="instanceColor"&&R.instanceColor&&(nt=R.instanceColor)),nt!==void 0){const Q=nt.normalized,st=nt.itemSize,wt=t.get(nt);if(wt===void 0)continue;const Ut=wt.buffer,Tt=wt.type,Y=wt.bytesPerElement,it=Tt===i.INT||Tt===i.UNSIGNED_INT||nt.gpuType===$o;if(nt.isInterleavedBufferAttribute){const et=nt.data,Pt=et.stride,It=nt.offset;if(et.isInstancedInterleavedBuffer){for(let At=0;At<j.locationSize;At++)p(j.location+At,et.meshPerAttribute);R.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let At=0;At<j.locationSize;At++)m(j.location+At);i.bindBuffer(i.ARRAY_BUFFER,Ut);for(let At=0;At<j.locationSize;At++)E(j.location+At,st/j.locationSize,Tt,Q,Pt*Y,(It+st/j.locationSize*At)*Y,it)}else{if(nt.isInstancedBufferAttribute){for(let et=0;et<j.locationSize;et++)p(j.location+et,nt.meshPerAttribute);R.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let et=0;et<j.locationSize;et++)m(j.location+et);i.bindBuffer(i.ARRAY_BUFFER,Ut);for(let et=0;et<j.locationSize;et++)E(j.location+et,st/j.locationSize,Tt,Q,st*Y,st/j.locationSize*et*Y,it)}}else if(O!==void 0){const Q=O[q];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(j.location,Q);break;case 3:i.vertexAttrib3fv(j.location,Q);break;case 4:i.vertexAttrib4fv(j.location,Q);break;default:i.vertexAttrib1fv(j.location,Q)}}}}S()}function w(){T();for(const R in n){const L=n[R];for(const W in L){const z=L[W];for(const F in z){const k=z[F];for(const O in k)h(k[O].object),delete k[O];delete z[F]}}delete n[R]}}function y(R){if(n[R.id]===void 0)return;const L=n[R.id];for(const W in L){const z=L[W];for(const F in z){const k=z[F];for(const O in k)h(k[O].object),delete k[O];delete z[F]}}delete n[R.id]}function A(R){for(const L in n){const W=n[L];for(const z in W){const F=W[z];if(F[R.id]===void 0)continue;const k=F[R.id];for(const O in k)h(k[O].object),delete k[O];delete F[R.id]}}}function _(R){for(const L in n){const W=n[L],z=R.isInstancedMesh===!0?R.id:0,F=W[z];if(F!==void 0){for(const k in F){const O=F[k];for(const q in O)h(O[q].object),delete O[q];delete F[k]}delete W[z],Object.keys(W).length===0&&delete n[L]}}}function T(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:y,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function Bm(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let d=0;d<h;d++)f+=c[d];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function km(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==fn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===kn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==qe&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==yn&&!_)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Dt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),y=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:M,maxSamples:w,samples:y}}function zm(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new ti,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,E=S*4;let M=p.clippingState||null;l.value=M,M=h(g,f,E,d);for(let w=0;w!==E;++w)M[w]=e[w];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=d+v*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,M=d;E!==v;++E,M+=4)a.copy(u[E]).applyMatrix4(S,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}const ii=4,oc=[.125,.215,.35,.446,.526,.582],xi=20,Vm=256,ps=new Br,lc=new Vt;let Ma=null,Sa=0,ya=0,ba=!1;const Hm=new D;class cc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=Hm}=r;Ma=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ma,Sa,ya),this._renderer.xr.enabled=ba,t.scissorTest=!1,Wi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ei||t.mapping===es?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ma=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ne,minFilter:Ne,generateMipmaps:!1,type:kn,format:fn,colorSpace:Ar,depthBuffer:!1},s=hc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hc(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Gm(r)),this._blurMaterial=Xm(r,t,e),this._ggxMaterial=Wm(r,t,e)}return s}_compileMaterial(t){const e=new Fe(new Me,t);this._renderer.compile(e,ps)}_sceneToCubeUV(t,e,n,s,r){const l=new tn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(lc),u.toneMapping=En,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Fe(new Ti,new ni({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const S=t.background;S?S.isColor&&(m.color.copy(S),t.background=null,p=!0):(m.color.copy(lc),p=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):M===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const w=this._cubeSize;Wi(s,M*w,E>2?w:0,w,w),u.setRenderTarget(s),p&&u.render(v,l),u.render(t,l)}u.toneMapping=d,u.autoClear=f,t.background=S}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ei||t.mapping===es;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Wi(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ps)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),f=0+c*1.25,d=u*f,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-ii?n-g+ii:0),p=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,Wi(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(o,ps),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Wi(t,m,p,3*v,2*v),s.setRenderTarget(t),s.render(o,ps)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&$t("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=c;const f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*xi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):xi;m>xi&&Dt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${xi}`);const p=[];let S=0;for(let A=0;A<xi;++A){const _=A/v,T=Math.exp(-_*_/2);p.push(T),A===0?S+=T:A<m&&(S+=2*T)}for(let A=0;A<p.length;A++)p[A]=p[A]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;const M=this._sizeLods[s],w=3*M*(s>E-ii?s-E+ii:0),y=4*(this._cubeSize-M);Wi(e,w,y,3*M,2*M),l.setRenderTarget(e),l.render(u,ps)}}function Gm(i){const t=[],e=[],n=[];let s=i;const r=i-ii+1+oc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-ii?l=oc[a-i+ii-1]:a===0&&(l=0),e.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,S=new Float32Array(v*g*d),E=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let y=0;y<d;y++){const A=y%3*2/3-1,_=y>2?0:-1,T=[A,_,0,A+2/3,_,0,A+2/3,_+1,0,A,_,0,A+2/3,_+1,0,A,_+1,0];S.set(T,v*g*y),E.set(f,m*g*y);const P=[y,y,y,y,y,y];M.set(P,p*g*y)}const w=new Me;w.setAttribute("position",new Tn(S,v)),w.setAttribute("uv",new Tn(E,m)),w.setAttribute("faceIndex",new Tn(M,p)),n.push(new Fe(w,null)),s>ii&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function hc(i,t,e){const n=new wn(i,t,e);return n.texture.mapping=Ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wi(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Wm(i,t,e){return new Rn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Vm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:kr(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function Xm(i,t,e){const n=new Float32Array(xi),s=new D(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:kr(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function uc(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:kr(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function fc(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:kr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function kr(){return`

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
	`}class Yh extends wn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new kh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ti(5,5,5),r=new Rn({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:He,blending:On});r.uniforms.tEquirect.value=e;const a=new Fe(s,r),o=e.minFilter;return e.minFilter===Mi&&(e.minFilter=Ne),new Zf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}function qm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Xr||d===qr)if(t.has(f)){const g=t.get(f).texture;return o(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const v=new Yh(g.height);return v.fromEquirectangularTexture(i,f),t.set(f,v),f.addEventListener("dispose",c),o(v.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,g=d===Xr||d===qr,v=d===Ei||d===es;if(g||v){let m=e.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new cc(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const S=f.image;return g&&S&&S.height>0||v&&S&&l(S)?(n===null&&(n=new cc(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function o(f,d){return d===Xr?f.mapping=Ei:d===qr&&(f.mapping=es),f}function l(f){let d=0;const g=6;for(let v=0;v<g;v++)f[v]!==void 0&&d++;return d===g}function c(f){const d=f.target;d.removeEventListener("dispose",c);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function $m(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ji("WebGLRenderer: "+n+" extension not supported."),s}}}function Ym(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(g===void 0)return;if(d!==null){const S=d.array;v=d.version;for(let E=0,M=S.length;E<M;E+=3){const w=S[E+0],y=S[E+1],A=S[E+2];f.push(w,y,y,A,A,w)}}else{const S=g.array;v=g.version;for(let E=0,M=S.length/3-1;E<M;E+=3){const w=E+0,y=E+1,A=E+2;f.push(w,y,y,A,A,w)}}const m=new(g.count>=65535?Bh:Oh)(f,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Km(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*a,d),e.update(f,n,d))}function h(u,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let v=0;for(let m=0;m<d;m++)v+=f[m];e.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Zm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:$t("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Jm(i,t,e){const n=new WeakMap,s=new ce;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let T=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let E=0;d===!0&&(E=1),g===!0&&(E=2),v===!0&&(E=3);let M=o.attributes.position.count*E,w=1;M>t.maxTextureSize&&(w=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const y=new Float32Array(M*w*4*u),A=new Nh(y,M,w,u);A.type=yn,A.needsUpdate=!0;const _=E*4;for(let P=0;P<u;P++){const R=m[P],L=p[P],W=S[P],z=M*w*4*P;for(let F=0;F<R.count;F++){const k=F*_;d===!0&&(s.fromBufferAttribute(R,F),y[z+k+0]=s.x,y[z+k+1]=s.y,y[z+k+2]=s.z,y[z+k+3]=0),g===!0&&(s.fromBufferAttribute(L,F),y[z+k+4]=s.x,y[z+k+5]=s.y,y[z+k+6]=s.z,y[z+k+7]=0),v===!0&&(s.fromBufferAttribute(W,F),y[z+k+8]=s.x,y[z+k+9]=s.y,y[z+k+10]=s.z,y[z+k+11]=W.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new Wt(M,w)},n.set(o,f),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];const g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function jm(i,t,e,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,f=t.get(c,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Qm={[xh]:"LINEAR_TONE_MAPPING",[Mh]:"REINHARD_TONE_MAPPING",[Sh]:"CINEON_TONE_MAPPING",[yh]:"ACES_FILMIC_TONE_MAPPING",[Eh]:"AGX_TONE_MAPPING",[wh]:"NEUTRAL_TONE_MAPPING",[bh]:"CUSTOM_TONE_MAPPING"};function tg(i,t,e,n,s,r){const a=new wn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new is(t,e):void 0}),o=new wn(t,e,{type:kn,depthBuffer:!1,stencilBuffer:!1}),l=new Me;l.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new oe([0,2,0,0,2,0],2));const c=new Gf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Fe(l,c),u=new Br(-1,1,1,-1,0,1);let f=null,d=null,g=!1,v,m=null,p=[],S=!1;this.setSize=function(E,M){a.setSize(E,M),o.setSize(E,M);for(let w=0;w<p.length;w++){const y=p[w];y.setSize&&y.setSize(E,M)}},this.setEffects=function(E){p=E,S=p.length>0&&p[0].isRenderPass===!0;const M=a.width,w=a.height;for(let y=0;y<p.length;y++){const A=p[y];A.setSize&&A.setSize(M,w)}},this.begin=function(E,M){if(g||E.toneMapping===En&&p.length===0)return!1;if(m=M,M!==null){const w=M.width,y=M.height;(a.width!==w||a.height!==y)&&this.setSize(w,y)}return S===!1&&E.setRenderTarget(a),v=E.toneMapping,E.toneMapping=En,!0},this.hasRenderPass=function(){return S},this.end=function(E,M){E.toneMapping=v,g=!0;let w=a,y=o;for(let A=0;A<p.length;A++){const _=p[A];if(_.enabled!==!1&&(_.render(E,y,w,M),_.needsSwap!==!1)){const T=w;w=y,y=T}}if(f!==E.outputColorSpace||d!==E.toneMapping){f=E.outputColorSpace,d=E.toneMapping,c.defines={},Xt.getTransfer(f)===Qt&&(c.defines.SRGB_TRANSFER="");const A=Qm[d];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,E.setRenderTarget(m),E.render(h,u),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Kh=new ke,Po=new is(1,1),Zh=new Nh,Jh=new Mf,jh=new kh,dc=[],pc=[],mc=new Float32Array(16),gc=new Float32Array(9),vc=new Float32Array(4);function os(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dc[s];if(r===void 0&&(r=new Float32Array(s),dc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function zr(i,t){let e=pc[t];e===void 0&&(e=new Int32Array(t),pc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function eg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function ig(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function sg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function rg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;vc.set(n),i.uniformMatrix2fv(this.addr,!1,vc),Ee(e,n)}}function ag(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;gc.set(n),i.uniformMatrix3fv(this.addr,!1,gc),Ee(e,n)}}function og(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;mc.set(n),i.uniformMatrix4fv(this.addr,!1,mc),Ee(e,n)}}function lg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function cg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function hg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function fg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function dg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function mg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function gg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Po.compareFunction=e.isReversedDepthBuffer()?tl:Qo,r=Po):r=Kh,e.setTexture2D(t||r,s)}function vg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Jh,s)}function _g(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||jh,s)}function xg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Zh,s)}function Mg(i){switch(i){case 5126:return eg;case 35664:return ng;case 35665:return ig;case 35666:return sg;case 35674:return rg;case 35675:return ag;case 35676:return og;case 5124:case 35670:return lg;case 35667:case 35671:return cg;case 35668:case 35672:return hg;case 35669:case 35673:return ug;case 5125:return fg;case 36294:return dg;case 36295:return pg;case 36296:return mg;case 35678:case 36198:case 36298:case 36306:case 35682:return gg;case 35679:case 36299:case 36307:return vg;case 35680:case 36300:case 36308:case 36293:return _g;case 36289:case 36303:case 36311:case 36292:return xg}}function Sg(i,t){i.uniform1fv(this.addr,t)}function yg(i,t){const e=os(t,this.size,2);i.uniform2fv(this.addr,e)}function bg(i,t){const e=os(t,this.size,3);i.uniform3fv(this.addr,e)}function Eg(i,t){const e=os(t,this.size,4);i.uniform4fv(this.addr,e)}function wg(i,t){const e=os(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Tg(i,t){const e=os(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ag(i,t){const e=os(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Cg(i,t){i.uniform1iv(this.addr,t)}function Rg(i,t){i.uniform2iv(this.addr,t)}function Pg(i,t){i.uniform3iv(this.addr,t)}function Lg(i,t){i.uniform4iv(this.addr,t)}function Dg(i,t){i.uniform1uiv(this.addr,t)}function Ig(i,t){i.uniform2uiv(this.addr,t)}function Ug(i,t){i.uniform3uiv(this.addr,t)}function Ng(i,t){i.uniform4uiv(this.addr,t)}function Fg(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Po:a=Kh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Og(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Jh,r[a])}function Bg(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||jh,r[a])}function kg(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Zh,r[a])}function zg(i){switch(i){case 5126:return Sg;case 35664:return yg;case 35665:return bg;case 35666:return Eg;case 35674:return wg;case 35675:return Tg;case 35676:return Ag;case 5124:case 35670:return Cg;case 35667:case 35671:return Rg;case 35668:case 35672:return Pg;case 35669:case 35673:return Lg;case 5125:return Dg;case 36294:return Ig;case 36295:return Ug;case 36296:return Ng;case 35678:case 36198:case 36298:case 36306:case 35682:return Fg;case 35679:case 36299:case 36307:return Og;case 35680:case 36300:case 36308:case 36293:return Bg;case 36289:case 36303:case 36311:case 36292:return kg}}class Vg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Mg(e.type)}}class Hg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zg(e.type)}}class Gg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ea=/(\w+)(\])?(\[|\.)?/g;function _c(i,t){i.seq.push(t),i.map[t.id]=t}function Wg(i,t,e){const n=i.name,s=n.length;for(Ea.lastIndex=0;;){const r=Ea.exec(n),a=Ea.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){_c(e,c===void 0?new Vg(o,i,t):new Hg(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Gg(o),_c(e,u)),e=u}}}class Er{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Wg(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function xc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Xg=37297;let qg=0;function $g(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Mc=new Nt;function Yg(i){Xt._getMatrix(Mc,Xt.workingColorSpace,i);const t=`mat3( ${Mc.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(i)){case Cr:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Sc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+$g(i.getShaderSource(t),o)}else return r}function Kg(i,t){const e=Yg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Zg={[xh]:"Linear",[Mh]:"Reinhard",[Sh]:"Cineon",[yh]:"ACESFilmic",[Eh]:"AgX",[wh]:"Neutral",[bh]:"Custom"};function Jg(i,t){const e=Zg[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const or=new D;function jg(){Xt.getLuminanceCoefficients(or);const i=or.x.toFixed(4),t=or.y.toFixed(4),e=or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Qg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xs).join(`
`)}function t0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function e0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function xs(i){return i!==""}function yc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const n0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lo(i){return i.replace(n0,s0)}const i0=new Map;function s0(i,t){let e=kt[t];if(e===void 0){const n=i0.get(t);if(n!==void 0)e=kt[n],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Lo(e)}const r0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ec(i){return i.replace(r0,a0)}function a0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const o0={[xr]:"SHADOWMAP_TYPE_PCF",[_s]:"SHADOWMAP_TYPE_VSM"};function l0(i){return o0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const c0={[Ei]:"ENVMAP_TYPE_CUBE",[es]:"ENVMAP_TYPE_CUBE",[Ur]:"ENVMAP_TYPE_CUBE_UV"};function h0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":c0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const u0={[es]:"ENVMAP_MODE_REFRACTION"};function f0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":u0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const d0={[qo]:"ENVMAP_BLENDING_MULTIPLY",[ju]:"ENVMAP_BLENDING_MIX",[Qu]:"ENVMAP_BLENDING_ADD"};function p0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":d0[i.combine]||"ENVMAP_BLENDING_NONE"}function m0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function g0(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=l0(e),c=h0(e),h=f0(e),u=p0(e),f=m0(e),d=Qg(e),g=t0(r),v=s.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xs).join(`
`),p.length>0&&(p+=`
`)):(m=[wc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xs).join(`
`),p=[wc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==En?"#define TONE_MAPPING":"",e.toneMapping!==En?kt.tonemapping_pars_fragment:"",e.toneMapping!==En?Jg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,Kg("linearToOutputTexel",e.outputColorSpace),jg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xs).join(`
`)),a=Lo(a),a=yc(a,e),a=bc(a,e),o=Lo(o),o=yc(o,e),o=bc(o,e),a=Ec(a),o=Ec(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=S+m+a,M=S+p+o,w=xc(s,s.VERTEX_SHADER,E),y=xc(s,s.FRAGMENT_SHADER,M);s.attachShader(v,w),s.attachShader(v,y),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(R){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(v)||"",W=s.getShaderInfoLog(w)||"",z=s.getShaderInfoLog(y)||"",F=L.trim(),k=W.trim(),O=z.trim();let q=!0,j=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,w,y);else{const nt=Sc(s,w,"vertex"),Q=Sc(s,y,"fragment");$t("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+nt+`
`+Q)}else F!==""?Dt("WebGLProgram: Program Info Log:",F):(k===""||O==="")&&(j=!1);j&&(R.diagnostics={runnable:q,programLog:F,vertexShader:{log:k,prefix:m},fragmentShader:{log:O,prefix:p}})}s.deleteShader(w),s.deleteShader(y),_=new Er(s,v),T=e0(s,v)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,Xg)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=qg++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=y,this}let v0=0;class _0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new x0(t),e.set(t,n)),n}}class x0{constructor(t){this.id=v0++,this.code=t,this.usedTimes=0}}function M0(i){return i===wi||i===wr||i===Tr}function S0(i,t,e,n,s,r){const a=new nl,o=new _0,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,T,P,R,L,W){const z=R.fog,F=L.geometry,k=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,O=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,q=t.get(_.envMap||k,O),j=q&&q.mapping===Ur?q.image.height:null,nt=d[_.type];_.precision!==null&&(f=n.getMaxPrecision(_.precision),f!==_.precision&&Dt("WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));const Q=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,st=Q!==void 0?Q.length:0;let wt=0;F.morphAttributes.position!==void 0&&(wt=1),F.morphAttributes.normal!==void 0&&(wt=2),F.morphAttributes.color!==void 0&&(wt=3);let Ut,Tt,Y,it;if(nt){const xt=Mn[nt];Ut=xt.vertexShader,Tt=xt.fragmentShader}else{Ut=_.vertexShader,Tt=_.fragmentShader;const xt=o.getVertexShaderStage(_),ue=o.getFragmentShaderStage(_);o.update(_,xt,ue),Y=xt.id,it=ue.id}const et=i.getRenderTarget(),Pt=i.state.buffers.depth.getReversed(),It=L.isInstancedMesh===!0,At=L.isBatchedMesh===!0,ee=!!_.map,Ft=!!_.matcap,Zt=!!q,Jt=!!_.aoMap,Yt=!!_.lightMap,ge=!!_.bumpMap&&_.wireframe===!1,Se=!!_.normalMap,we=!!_.displacementMap,Ae=!!_.emissiveMap,he=!!_.metalnessMap,ve=!!_.roughnessMap,U=_.anisotropy>0,ze=_.clearcoat>0,jt=_.dispersion>0,C=_.iridescence>0,x=_.sheen>0,B=_.transmission>0,G=U&&!!_.anisotropyMap,$=ze&&!!_.clearcoatMap,rt=ze&&!!_.clearcoatNormalMap,ot=ze&&!!_.clearcoatRoughnessMap,K=C&&!!_.iridescenceMap,J=C&&!!_.iridescenceThicknessMap,lt=x&&!!_.sheenColorMap,bt=x&&!!_.sheenRoughnessMap,ft=!!_.specularMap,ct=!!_.specularColorMap,Rt=!!_.specularIntensityMap,Lt=B&&!!_.transmissionMap,Ot=B&&!!_.thicknessMap,I=!!_.gradientMap,at=!!_.alphaMap,Z=_.alphaTest>0,ht=!!_.alphaHash,gt=!!_.extensions;let tt=En;_.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(tt=i.toneMapping);const yt={shaderID:nt,shaderType:_.type,shaderName:_.name,vertexShader:Ut,fragmentShader:Tt,defines:_.defines,customVertexShaderID:Y,customFragmentShaderID:it,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:At,batchingColor:At&&L._colorsTexture!==null,instancing:It,instancingColor:It&&L.instanceColor!==null,instancingMorph:It&&L.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Xt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ee,matcap:Ft,envMap:Zt,envMapMode:Zt&&q.mapping,envMapCubeUVHeight:j,aoMap:Jt,lightMap:Yt,bumpMap:ge,normalMap:Se,displacementMap:we,emissiveMap:Ae,normalMapObjectSpace:Se&&_.normalMapType===nf,normalMapTangentSpace:Se&&_.normalMapType===To,packedNormalMap:Se&&_.normalMapType===To&&M0(_.normalMap.format),metalnessMap:he,roughnessMap:ve,anisotropy:U,anisotropyMap:G,clearcoat:ze,clearcoatMap:$,clearcoatNormalMap:rt,clearcoatRoughnessMap:ot,dispersion:jt,iridescence:C,iridescenceMap:K,iridescenceThicknessMap:J,sheen:x,sheenColorMap:lt,sheenRoughnessMap:bt,specularMap:ft,specularColorMap:ct,specularIntensityMap:Rt,transmission:B,transmissionMap:Lt,thicknessMap:Ot,gradientMap:I,opaque:_.transparent===!1&&_.blending===Zi&&_.alphaToCoverage===!1,alphaMap:at,alphaTest:Z,alphaHash:ht,combine:_.combine,mapUv:ee&&g(_.map.channel),aoMapUv:Jt&&g(_.aoMap.channel),lightMapUv:Yt&&g(_.lightMap.channel),bumpMapUv:ge&&g(_.bumpMap.channel),normalMapUv:Se&&g(_.normalMap.channel),displacementMapUv:we&&g(_.displacementMap.channel),emissiveMapUv:Ae&&g(_.emissiveMap.channel),metalnessMapUv:he&&g(_.metalnessMap.channel),roughnessMapUv:ve&&g(_.roughnessMap.channel),anisotropyMapUv:G&&g(_.anisotropyMap.channel),clearcoatMapUv:$&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:rt&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:bt&&g(_.sheenRoughnessMap.channel),specularMapUv:ft&&g(_.specularMap.channel),specularColorMapUv:ct&&g(_.specularColorMap.channel),specularIntensityMapUv:Rt&&g(_.specularIntensityMap.channel),transmissionMapUv:Lt&&g(_.transmissionMap.channel),thicknessMapUv:Ot&&g(_.thicknessMap.channel),alphaMapUv:at&&g(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Se||U),vertexNormals:!!F.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!F.attributes.uv&&(ee||at),fog:!!z,useFog:_.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||F.attributes.normal===void 0&&Se===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Pt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:wt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:tt,decodeVideoTexture:ee&&_.map.isVideoTexture===!0&&Xt.getTransfer(_.map.colorSpace)===Qt,decodeVideoTextureEmissive:Ae&&_.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(_.emissiveMap.colorSpace)===Qt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===en,flipSided:_.side===He,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:gt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&_.extensions.multiDraw===!0||At)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return yt.vertexUv1s=l.has(1),yt.vertexUv2s=l.has(2),yt.vertexUv3s=l.has(3),l.clear(),yt}function m(_){const T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)T.push(P),T.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(p(T,_),S(T,_),T.push(i.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function p(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function S(_,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function E(_){const T=d[_.type];let P;if(T){const R=Mn[T];P=zf.clone(R.uniforms)}else P=_.uniforms;return P}function M(_,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new g0(i,T,_,s),c.push(P),h.set(T,P)),P}function w(_){if(--_.usedTimes===0){const T=c.indexOf(_);c[T]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function y(_){o.remove(_)}function A(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:E,acquireProgram:M,releaseProgram:w,releaseShaderCache:y,programs:c,dispose:A}}function y0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function b0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Tc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ac(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,g,v,m,p){let S=i[t];return S===void 0?(S={id:f.id,object:f,geometry:d,material:g,materialVariant:a(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:p},i[t]=S):(S.id=f.id,S.object=f,S.geometry=d,S.material=g,S.materialVariant=a(f),S.groupOrder=v,S.renderOrder=f.renderOrder,S.z=m,S.group=p),t++,S}function l(f,d,g,v,m,p){const S=o(f,d,g,v,m,p);g.transmission>0?n.push(S):g.transparent===!0?s.push(S):e.push(S)}function c(f,d,g,v,m,p){const S=o(f,d,g,v,m,p);g.transmission>0?n.unshift(S):g.transparent===!0?s.unshift(S):e.unshift(S)}function h(f,d,g){e.length>1&&e.sort(f||b0),n.length>1&&n.sort(d||Tc),s.length>1&&s.sort(d||Tc),g&&(e.reverse(),n.reverse(),s.reverse())}function u(){for(let f=t,d=i.length;f<d;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function E0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Ac,i.set(n,[a])):s>=r.length?(a=new Ac,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function w0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Vt};break;case"SpotLight":e={position:new D,direction:new D,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function T0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let A0=0;function C0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function R0(i){const t=new w0,e=T0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new se,a=new se;function o(c){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,S=0,E=0,M=0,w=0,y=0,A=0;c.sort(C0);for(let T=0,P=c.length;T<P;T++){const R=c[T],L=R.color,W=R.intensity,z=R.distance;let F=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===wi?F=R.shadow.map.texture:F=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=L.r*W,u+=L.g*W,f+=L.b*W;else if(R.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(R.sh.coefficients[k],W);A++}else if(R.isDirectionalLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const O=R.shadow,q=e.get(R);q.shadowIntensity=O.intensity,q.shadowBias=O.bias,q.shadowNormalBias=O.normalBias,q.shadowRadius=O.radius,q.shadowMapSize=O.mapSize,n.directionalShadow[d]=q,n.directionalShadowMap[d]=F,n.directionalShadowMatrix[d]=R.shadow.matrix,S++}n.directional[d]=k,d++}else if(R.isSpotLight){const k=t.get(R);k.position.setFromMatrixPosition(R.matrixWorld),k.color.copy(L).multiplyScalar(W),k.distance=z,k.coneCos=Math.cos(R.angle),k.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),k.decay=R.decay,n.spot[v]=k;const O=R.shadow;if(R.map&&(n.spotLightMap[w]=R.map,w++,O.updateMatrices(R),R.castShadow&&y++),n.spotLightMatrix[v]=O.matrix,R.castShadow){const q=e.get(R);q.shadowIntensity=O.intensity,q.shadowBias=O.bias,q.shadowNormalBias=O.normalBias,q.shadowRadius=O.radius,q.shadowMapSize=O.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=F,M++}v++}else if(R.isRectAreaLight){const k=t.get(R);k.color.copy(L).multiplyScalar(W),k.halfWidth.set(R.width*.5,0,0),k.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=k,m++}else if(R.isPointLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),k.distance=R.distance,k.decay=R.decay,R.castShadow){const O=R.shadow,q=e.get(R);q.shadowIntensity=O.intensity,q.shadowBias=O.bias,q.shadowNormalBias=O.normalBias,q.shadowRadius=O.radius,q.shadowMapSize=O.mapSize,q.shadowCameraNear=O.camera.near,q.shadowCameraFar=O.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=F,n.pointShadowMatrix[g]=R.shadow.matrix,E++}n.point[g]=k,g++}else if(R.isHemisphereLight){const k=t.get(R);k.skyColor.copy(R.color).multiplyScalar(W),k.groundColor.copy(R.groundColor).multiplyScalar(W),n.hemi[p]=k,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const _=n.hash;(_.directionalLength!==d||_.pointLength!==g||_.spotLength!==v||_.rectAreaLength!==m||_.hemiLength!==p||_.numDirectionalShadows!==S||_.numPointShadows!==E||_.numSpotShadows!==M||_.numSpotMaps!==w||_.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+w-y,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=A,_.directionalLength=d,_.pointLength=g,_.spotLength=v,_.rectAreaLength=m,_.hemiLength=p,_.numDirectionalShadows=S,_.numPointShadows=E,_.numSpotShadows=M,_.numSpotMaps=w,_.numLightProbes=A,n.version=A0++)}function l(c,h){let u=0,f=0,d=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const E=c[p];if(E.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(E.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(E.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),f++}else if(E.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Cc(i){const t=new R0(i),e=[],n=[],s=[];function r(f){u.camera=f,e.length=0,n.length=0,s.length=0}function a(f){e.push(f)}function o(f){n.push(f)}function l(f){s.push(f)}function c(){t.setup(e)}function h(f){t.setupView(e,f)}const u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function P0(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Cc(i),t.set(s,[o])):r>=a.length?(o=new Cc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const L0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D0=`uniform sampler2D shadow_pass;
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
}`,I0=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],U0=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Rc=new se,ms=new D,wa=new D;function N0(i,t,e){let n=new il;const s=new Wt,r=new Wt,a=new ce,o=new Xf,l=new qf,c={},h=e.maxTextureSize,u={[si]:He,[He]:si,[en]:en},f=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:L0,fragmentShader:D0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Me;g.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Fe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xr;let p=this.type;this.render=function(y,A,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;this.type===Iu&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=xr);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),L=i.state;L.setBlending(On),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const W=p!==this.type;W&&A.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(F=>F.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,F=y.length;z<F;z++){const k=y[z],O=k.shadow;if(O===void 0){Dt("WebGLShadowMap:",k,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const q=O.getFrameExtents();s.multiply(q),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,O.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=j,O.map===null||W===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===_s){if(k.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new wn(s.x,s.y,{format:wi,type:kn,minFilter:Ne,magFilter:Ne,generateMipmaps:!1}),O.map.texture.name=k.name+".shadowMap",O.map.depthTexture=new is(s.x,s.y,yn),O.map.depthTexture.name=k.name+".shadowMapDepth",O.map.depthTexture.format=zn,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Pe,O.map.depthTexture.magFilter=Pe}else k.isPointLight?(O.map=new Yh(s.x),O.map.depthTexture=new Bf(s.x,Cn)):(O.map=new wn(s.x,s.y),O.map.depthTexture=new is(s.x,s.y,Cn)),O.map.depthTexture.name=k.name+".shadowMap",O.map.depthTexture.format=zn,this.type===xr?(O.map.depthTexture.compareFunction=j?tl:Qo,O.map.depthTexture.minFilter=Ne,O.map.depthTexture.magFilter=Ne):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Pe,O.map.depthTexture.magFilter=Pe);O.camera.updateProjectionMatrix()}const nt=O.map.isWebGLCubeRenderTarget?6:1;for(let Q=0;Q<nt;Q++){if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,Q),i.clear();else{Q===0&&(i.setRenderTarget(O.map),i.clear());const st=O.getViewport(Q);a.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),L.viewport(a)}if(k.isPointLight){const st=O.camera,wt=O.matrix,Ut=k.distance||st.far;Ut!==st.far&&(st.far=Ut,st.updateProjectionMatrix()),ms.setFromMatrixPosition(k.matrixWorld),st.position.copy(ms),wa.copy(st.position),wa.add(I0[Q]),st.up.copy(U0[Q]),st.lookAt(wa),st.updateMatrixWorld(),wt.makeTranslation(-ms.x,-ms.y,-ms.z),Rc.multiplyMatrices(st.projectionMatrix,st.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Rc,st.coordinateSystem,st.reversedDepth)}else O.updateMatrices(k);n=O.getFrustum(),M(A,_,O.camera,k,this.type)}O.isPointLightShadow!==!0&&this.type===_s&&S(O,_),O.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,P,R)};function S(y,A){const _=t.update(v);f.defines.VSM_SAMPLES!==y.blurSamples&&(f.defines.VSM_SAMPLES=y.blurSamples,d.defines.VSM_SAMPLES=y.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new wn(s.x,s.y,{format:wi,type:kn})),f.uniforms.shadow_pass.value=y.map.depthTexture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(A,null,_,f,v,null),d.uniforms.shadow_pass.value=y.mapPass.texture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(A,null,_,d,v,null)}function E(y,A,_,T){let P=null;const R=_.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(R!==void 0)P=R;else if(P=_.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const L=P.uuid,W=A.uuid;let z=c[L];z===void 0&&(z={},c[L]=z);let F=z[W];F===void 0&&(F=P.clone(),z[W]=F,A.addEventListener("dispose",w)),P=F}if(P.visible=A.visible,P.wireframe=A.wireframe,T===_s?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:u[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const L=i.properties.get(P);L.light=_}return P}function M(y,A,_,T,P){if(y.visible===!1)return;if(y.layers.test(A.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&P===_s)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,y.matrixWorld);const W=t.update(y),z=y.material;if(Array.isArray(z)){const F=W.groups;for(let k=0,O=F.length;k<O;k++){const q=F[k],j=z[q.materialIndex];if(j&&j.visible){const nt=E(y,j,T,P);y.onBeforeShadow(i,y,A,_,W,nt,q),i.renderBufferDirect(_,null,W,nt,y,q),y.onAfterShadow(i,y,A,_,W,nt,q)}}}else if(z.visible){const F=E(y,z,T,P);y.onBeforeShadow(i,y,A,_,W,F,null),i.renderBufferDirect(_,null,W,F,y,null),y.onAfterShadow(i,y,A,_,W,F,null)}}const L=y.children;for(let W=0,z=L.length;W<z;W++)M(L[W],A,_,T,P)}function w(y){y.target.removeEventListener("dispose",w);for(const _ in c){const T=c[_],P=y.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function F0(i,t){function e(){let I=!1;const at=new ce;let Z=null;const ht=new ce(0,0,0,0);return{setMask:function(gt){Z!==gt&&!I&&(i.colorMask(gt,gt,gt,gt),Z=gt)},setLocked:function(gt){I=gt},setClear:function(gt,tt,yt,xt,ue){ue===!0&&(gt*=xt,tt*=xt,yt*=xt),at.set(gt,tt,yt,xt),ht.equals(at)===!1&&(i.clearColor(gt,tt,yt,xt),ht.copy(at))},reset:function(){I=!1,Z=null,ht.set(-1,0,0,0)}}}function n(){let I=!1,at=!1,Z=null,ht=null,gt=null;return{setReversed:function(tt){if(at!==tt){const yt=t.get("EXT_clip_control");tt?yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.ZERO_TO_ONE_EXT):yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.NEGATIVE_ONE_TO_ONE_EXT),at=tt;const xt=gt;gt=null,this.setClear(xt)}},getReversed:function(){return at},setTest:function(tt){tt?et(i.DEPTH_TEST):Pt(i.DEPTH_TEST)},setMask:function(tt){Z!==tt&&!I&&(i.depthMask(tt),Z=tt)},setFunc:function(tt){if(at&&(tt=df[tt]),ht!==tt){switch(tt){case za:i.depthFunc(i.NEVER);break;case Va:i.depthFunc(i.ALWAYS);break;case Ha:i.depthFunc(i.LESS);break;case ts:i.depthFunc(i.LEQUAL);break;case Ga:i.depthFunc(i.EQUAL);break;case Wa:i.depthFunc(i.GEQUAL);break;case Xa:i.depthFunc(i.GREATER);break;case qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ht=tt}},setLocked:function(tt){I=tt},setClear:function(tt){gt!==tt&&(gt=tt,at&&(tt=1-tt),i.clearDepth(tt))},reset:function(){I=!1,Z=null,ht=null,gt=null,at=!1}}}function s(){let I=!1,at=null,Z=null,ht=null,gt=null,tt=null,yt=null,xt=null,ue=null;return{setTest:function(re){I||(re?et(i.STENCIL_TEST):Pt(i.STENCIL_TEST))},setMask:function(re){at!==re&&!I&&(i.stencilMask(re),at=re)},setFunc:function(re,pn,mn){(Z!==re||ht!==pn||gt!==mn)&&(i.stencilFunc(re,pn,mn),Z=re,ht=pn,gt=mn)},setOp:function(re,pn,mn){(tt!==re||yt!==pn||xt!==mn)&&(i.stencilOp(re,pn,mn),tt=re,yt=pn,xt=mn)},setLocked:function(re){I=re},setClear:function(re){ue!==re&&(i.clearStencil(re),ue=re)},reset:function(){I=!1,at=null,Z=null,ht=null,gt=null,tt=null,yt=null,xt=null,ue=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f={},d=new WeakMap,g=[],v=null,m=!1,p=null,S=null,E=null,M=null,w=null,y=null,A=null,_=new Vt(0,0,0),T=0,P=!1,R=null,L=null,W=null,z=null,F=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,q=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(j)[1]),O=q>=1):j.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),O=q>=2);let nt=null,Q={};const st=i.getParameter(i.SCISSOR_BOX),wt=i.getParameter(i.VIEWPORT),Ut=new ce().fromArray(st),Tt=new ce().fromArray(wt);function Y(I,at,Z,ht){const gt=new Uint8Array(4),tt=i.createTexture();i.bindTexture(I,tt),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let yt=0;yt<Z;yt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(at,0,i.RGBA,1,1,ht,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(at+yt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return tt}const it={};it[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),it[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),it[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(ts),ge(!1),Se(bl),et(i.CULL_FACE),Jt(On);function et(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Pt(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function It(I,at){return f[I]!==at?(i.bindFramebuffer(I,at),f[I]=at,I===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=at),I===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=at),!0):!1}function At(I,at){let Z=g,ht=!1;if(I){Z=d.get(at),Z===void 0&&(Z=[],d.set(at,Z));const gt=I.textures;if(Z.length!==gt.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let tt=0,yt=gt.length;tt<yt;tt++)Z[tt]=i.COLOR_ATTACHMENT0+tt;Z.length=gt.length,ht=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,ht=!0);ht&&i.drawBuffers(Z)}function ee(I){return v!==I?(i.useProgram(I),v=I,!0):!1}const Ft={[_i]:i.FUNC_ADD,[Nu]:i.FUNC_SUBTRACT,[Fu]:i.FUNC_REVERSE_SUBTRACT};Ft[Ou]=i.MIN,Ft[Bu]=i.MAX;const Zt={[ku]:i.ZERO,[zu]:i.ONE,[Vu]:i.SRC_COLOR,[Ba]:i.SRC_ALPHA,[$u]:i.SRC_ALPHA_SATURATE,[Xu]:i.DST_COLOR,[Gu]:i.DST_ALPHA,[Hu]:i.ONE_MINUS_SRC_COLOR,[ka]:i.ONE_MINUS_SRC_ALPHA,[qu]:i.ONE_MINUS_DST_COLOR,[Wu]:i.ONE_MINUS_DST_ALPHA,[Yu]:i.CONSTANT_COLOR,[Ku]:i.ONE_MINUS_CONSTANT_COLOR,[Zu]:i.CONSTANT_ALPHA,[Ju]:i.ONE_MINUS_CONSTANT_ALPHA};function Jt(I,at,Z,ht,gt,tt,yt,xt,ue,re){if(I===On){m===!0&&(Pt(i.BLEND),m=!1);return}if(m===!1&&(et(i.BLEND),m=!0),I!==Uu){if(I!==p||re!==P){if((S!==_i||w!==_i)&&(i.blendEquation(i.FUNC_ADD),S=_i,w=_i),re)switch(I){case Zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case El:i.blendFunc(i.ONE,i.ONE);break;case wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Tl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:$t("WebGLState: Invalid blending: ",I);break}else switch(I){case Zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case El:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wl:$t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Tl:$t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$t("WebGLState: Invalid blending: ",I);break}E=null,M=null,y=null,A=null,_.set(0,0,0),T=0,p=I,P=re}return}gt=gt||at,tt=tt||Z,yt=yt||ht,(at!==S||gt!==w)&&(i.blendEquationSeparate(Ft[at],Ft[gt]),S=at,w=gt),(Z!==E||ht!==M||tt!==y||yt!==A)&&(i.blendFuncSeparate(Zt[Z],Zt[ht],Zt[tt],Zt[yt]),E=Z,M=ht,y=tt,A=yt),(xt.equals(_)===!1||ue!==T)&&(i.blendColor(xt.r,xt.g,xt.b,ue),_.copy(xt),T=ue),p=I,P=!1}function Yt(I,at){I.side===en?Pt(i.CULL_FACE):et(i.CULL_FACE);let Z=I.side===He;at&&(Z=!Z),ge(Z),I.blending===Zi&&I.transparent===!1?Jt(On):Jt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const ht=I.stencilWrite;o.setTest(ht),ht&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Ae(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):Pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ge(I){R!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),R=I)}function Se(I){I!==Lu?(et(i.CULL_FACE),I!==L&&(I===bl?i.cullFace(i.BACK):I===Du?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Pt(i.CULL_FACE),L=I}function we(I){I!==W&&(O&&i.lineWidth(I),W=I)}function Ae(I,at,Z){I?(et(i.POLYGON_OFFSET_FILL),(z!==at||F!==Z)&&(z=at,F=Z,a.getReversed()&&(at=-at),i.polygonOffset(at,Z))):Pt(i.POLYGON_OFFSET_FILL)}function he(I){I?et(i.SCISSOR_TEST):Pt(i.SCISSOR_TEST)}function ve(I){I===void 0&&(I=i.TEXTURE0+k-1),nt!==I&&(i.activeTexture(I),nt=I)}function U(I,at,Z){Z===void 0&&(nt===null?Z=i.TEXTURE0+k-1:Z=nt);let ht=Q[Z];ht===void 0&&(ht={type:void 0,texture:void 0},Q[Z]=ht),(ht.type!==I||ht.texture!==at)&&(nt!==Z&&(i.activeTexture(Z),nt=Z),i.bindTexture(I,at||it[I]),ht.type=I,ht.texture=at)}function ze(){const I=Q[nt];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function jt(){try{i.compressedTexImage2D(...arguments)}catch(I){$t("WebGLState:",I)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(I){$t("WebGLState:",I)}}function x(){try{i.texSubImage2D(...arguments)}catch(I){$t("WebGLState:",I)}}function B(){try{i.texSubImage3D(...arguments)}catch(I){$t("WebGLState:",I)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(I){$t("WebGLState:",I)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(I){$t("WebGLState:",I)}}function rt(){try{i.texStorage2D(...arguments)}catch(I){$t("WebGLState:",I)}}function ot(){try{i.texStorage3D(...arguments)}catch(I){$t("WebGLState:",I)}}function K(){try{i.texImage2D(...arguments)}catch(I){$t("WebGLState:",I)}}function J(){try{i.texImage3D(...arguments)}catch(I){$t("WebGLState:",I)}}function lt(I){return u[I]!==void 0?u[I]:i.getParameter(I)}function bt(I,at){u[I]!==at&&(i.pixelStorei(I,at),u[I]=at)}function ft(I){Ut.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Ut.copy(I))}function ct(I){Tt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),Tt.copy(I))}function Rt(I,at){let Z=c.get(at);Z===void 0&&(Z=new WeakMap,c.set(at,Z));let ht=Z.get(I);ht===void 0&&(ht=i.getUniformBlockIndex(at,I.name),Z.set(I,ht))}function Lt(I,at){const ht=c.get(at).get(I);l.get(at)!==ht&&(i.uniformBlockBinding(at,ht,I.__bindingPointIndex),l.set(at,ht))}function Ot(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},nt=null,Q={},f={},d=new WeakMap,g=[],v=null,m=!1,p=null,S=null,E=null,M=null,w=null,y=null,A=null,_=new Vt(0,0,0),T=0,P=!1,R=null,L=null,W=null,z=null,F=null,Ut.set(0,0,i.canvas.width,i.canvas.height),Tt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:Pt,bindFramebuffer:It,drawBuffers:At,useProgram:ee,setBlending:Jt,setMaterial:Yt,setFlipSided:ge,setCullFace:Se,setLineWidth:we,setPolygonOffset:Ae,setScissorTest:he,activeTexture:ve,bindTexture:U,unbindTexture:ze,compressedTexImage2D:jt,compressedTexImage3D:C,texImage2D:K,texImage3D:J,pixelStorei:bt,getParameter:lt,updateUBOMapping:Rt,uniformBlockBinding:Lt,texStorage2D:rt,texStorage3D:ot,texSubImage2D:x,texSubImage3D:B,compressedTexSubImage2D:G,compressedTexSubImage3D:$,scissor:ft,viewport:ct,reset:Ot}}function O0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Wt,h=new WeakMap,u=new Set;let f;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,x){return g?new OffscreenCanvas(C,x):Rr("canvas")}function m(C,x,B){let G=1;const $=jt(C);if(($.width>B||$.height>B)&&(G=B/Math.max($.width,$.height)),G<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const rt=Math.floor(G*$.width),ot=Math.floor(G*$.height);f===void 0&&(f=v(rt,ot));const K=x?v(rt,ot):f;return K.width=rt,K.height=ot,K.getContext("2d").drawImage(C,0,0,rt,ot),Dt("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+rt+"x"+ot+")."),K}else return"data"in C&&Dt("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function p(C){return C.generateMipmaps}function S(C){i.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(C,x,B,G,$,rt=!1){if(C!==null){if(i[C]!==void 0)return i[C];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ot;G&&(ot=t.get("EXT_texture_norm16"),ot||Dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=x;if(x===i.RED&&(B===i.FLOAT&&(K=i.R32F),B===i.HALF_FLOAT&&(K=i.R16F),B===i.UNSIGNED_BYTE&&(K=i.R8),B===i.UNSIGNED_SHORT&&ot&&(K=ot.R16_EXT),B===i.SHORT&&ot&&(K=ot.R16_SNORM_EXT)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.R8UI),B===i.UNSIGNED_SHORT&&(K=i.R16UI),B===i.UNSIGNED_INT&&(K=i.R32UI),B===i.BYTE&&(K=i.R8I),B===i.SHORT&&(K=i.R16I),B===i.INT&&(K=i.R32I)),x===i.RG&&(B===i.FLOAT&&(K=i.RG32F),B===i.HALF_FLOAT&&(K=i.RG16F),B===i.UNSIGNED_BYTE&&(K=i.RG8),B===i.UNSIGNED_SHORT&&ot&&(K=ot.RG16_EXT),B===i.SHORT&&ot&&(K=ot.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RG8UI),B===i.UNSIGNED_SHORT&&(K=i.RG16UI),B===i.UNSIGNED_INT&&(K=i.RG32UI),B===i.BYTE&&(K=i.RG8I),B===i.SHORT&&(K=i.RG16I),B===i.INT&&(K=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGB8UI),B===i.UNSIGNED_SHORT&&(K=i.RGB16UI),B===i.UNSIGNED_INT&&(K=i.RGB32UI),B===i.BYTE&&(K=i.RGB8I),B===i.SHORT&&(K=i.RGB16I),B===i.INT&&(K=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),B===i.UNSIGNED_INT&&(K=i.RGBA32UI),B===i.BYTE&&(K=i.RGBA8I),B===i.SHORT&&(K=i.RGBA16I),B===i.INT&&(K=i.RGBA32I)),x===i.RGB&&(B===i.UNSIGNED_SHORT&&ot&&(K=ot.RGB16_EXT),B===i.SHORT&&ot&&(K=ot.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),x===i.RGBA){const J=rt?Cr:Xt.getTransfer($);B===i.FLOAT&&(K=i.RGBA32F),B===i.HALF_FLOAT&&(K=i.RGBA16F),B===i.UNSIGNED_BYTE&&(K=J===Qt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ot&&(K=ot.RGBA16_EXT),B===i.SHORT&&ot&&(K=ot.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function w(C,x){let B;return C?x===null||x===Cn||x===ws?B=i.DEPTH24_STENCIL8:x===yn?B=i.DEPTH32F_STENCIL8:x===Es&&(B=i.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Cn||x===ws?B=i.DEPTH_COMPONENT24:x===yn?B=i.DEPTH_COMPONENT32F:x===Es&&(B=i.DEPTH_COMPONENT16),B}function y(C,x){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Pe&&C.minFilter!==Ne?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function A(C){const x=C.target;x.removeEventListener("dispose",A),T(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function _(C){const x=C.target;x.removeEventListener("dispose",_),R(x)}function T(C){const x=n.get(C);if(x.__webglInit===void 0)return;const B=C.source,G=d.get(B);if(G){const $=G[x.__cacheKey];$.usedTimes--,$.usedTimes===0&&P(C),Object.keys(G).length===0&&d.delete(B)}n.remove(C)}function P(C){const x=n.get(C);i.deleteTexture(x.__webglTexture);const B=C.source,G=d.get(B);delete G[x.__cacheKey],a.memory.textures--}function R(C){const x=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(x.__webglFramebuffer[G]))for(let $=0;$<x.__webglFramebuffer[G].length;$++)i.deleteFramebuffer(x.__webglFramebuffer[G][$]);else i.deleteFramebuffer(x.__webglFramebuffer[G]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[G])}else{if(Array.isArray(x.__webglFramebuffer))for(let G=0;G<x.__webglFramebuffer.length;G++)i.deleteFramebuffer(x.__webglFramebuffer[G]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let G=0;G<x.__webglColorRenderbuffer.length;G++)x.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[G]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=C.textures;for(let G=0,$=B.length;G<$;G++){const rt=n.get(B[G]);rt.__webglTexture&&(i.deleteTexture(rt.__webglTexture),a.memory.textures--),n.remove(B[G])}n.remove(C)}let L=0;function W(){L=0}function z(){return L}function F(C){L=C}function k(){const C=L;return C>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),L+=1,C}function O(C){const x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function q(C,x){const B=n.get(C);if(C.isVideoTexture&&U(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){const G=C.image;if(G===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{Pt(B,C,x);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function j(C,x){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){Pt(B,C,x);return}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function nt(C,x){const B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){Pt(B,C,x);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function Q(C,x){const B=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&B.__version!==C.version){It(B,C,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}const st={[$a]:i.REPEAT,[Fn]:i.CLAMP_TO_EDGE,[Ya]:i.MIRRORED_REPEAT},wt={[Pe]:i.NEAREST,[tf]:i.NEAREST_MIPMAP_NEAREST,[Fs]:i.NEAREST_MIPMAP_LINEAR,[Ne]:i.LINEAR,[$r]:i.LINEAR_MIPMAP_NEAREST,[Mi]:i.LINEAR_MIPMAP_LINEAR},Ut={[sf]:i.NEVER,[cf]:i.ALWAYS,[rf]:i.LESS,[Qo]:i.LEQUAL,[af]:i.EQUAL,[tl]:i.GEQUAL,[of]:i.GREATER,[lf]:i.NOTEQUAL};function Tt(C,x){if(x.type===yn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Ne||x.magFilter===$r||x.magFilter===Fs||x.magFilter===Mi||x.minFilter===Ne||x.minFilter===$r||x.minFilter===Fs||x.minFilter===Mi)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,st[x.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,st[x.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,st[x.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,wt[x.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,wt[x.minFilter]),x.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Ut[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Pe||x.minFilter!==Fs&&x.minFilter!==Mi||x.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Y(C,x){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",A));const G=x.source;let $=d.get(G);$===void 0&&($={},d.set(G,$));const rt=O(x);if(rt!==C.__cacheKey){$[rt]===void 0&&($[rt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),$[rt].usedTimes++;const ot=$[C.__cacheKey];ot!==void 0&&($[C.__cacheKey].usedTimes--,ot.usedTimes===0&&P(x)),C.__cacheKey=rt,C.__webglTexture=$[rt].texture}return B}function it(C,x,B){return Math.floor(Math.floor(C/B)/x)}function et(C,x,B,G){const rt=C.updateRanges;if(rt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,B,G,x.data);else{rt.sort((bt,ft)=>bt.start-ft.start);let ot=0;for(let bt=1;bt<rt.length;bt++){const ft=rt[ot],ct=rt[bt],Rt=ft.start+ft.count,Lt=it(ct.start,x.width,4),Ot=it(ft.start,x.width,4);ct.start<=Rt+1&&Lt===Ot&&it(ct.start+ct.count-1,x.width,4)===Lt?ft.count=Math.max(ft.count,ct.start+ct.count-ft.start):(++ot,rt[ot]=ct)}rt.length=ot+1;const K=e.getParameter(i.UNPACK_ROW_LENGTH),J=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let bt=0,ft=rt.length;bt<ft;bt++){const ct=rt[bt],Rt=Math.floor(ct.start/4),Lt=Math.ceil(ct.count/4),Ot=Rt%x.width,I=Math.floor(Rt/x.width),at=Lt,Z=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Ot),e.pixelStorei(i.UNPACK_SKIP_ROWS,I),e.texSubImage2D(i.TEXTURE_2D,0,Ot,I,at,Z,B,G,x.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,K),e.pixelStorei(i.UNPACK_SKIP_PIXELS,J),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function Pt(C,x,B){let G=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(G=i.TEXTURE_3D);const $=Y(C,x),rt=x.source;e.bindTexture(G,C.__webglTexture,i.TEXTURE0+B);const ot=n.get(rt);if(rt.version!==ot.__version||$===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const Z=Xt.getPrimaries(Xt.workingColorSpace),ht=x.colorSpace===ei?null:Xt.getPrimaries(x.colorSpace),gt=x.colorSpace===ei||Z===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let J=m(x.image,!1,s.maxTextureSize);J=ze(x,J);const lt=r.convert(x.format,x.colorSpace),bt=r.convert(x.type);let ft=M(x.internalFormat,lt,bt,x.normalized,x.colorSpace,x.isVideoTexture);Tt(G,x);let ct;const Rt=x.mipmaps,Lt=x.isVideoTexture!==!0,Ot=ot.__version===void 0||$===!0,I=rt.dataReady,at=y(x,J);if(x.isDepthTexture)ft=w(x.format===Si,x.type),Ot&&(Lt?e.texStorage2D(i.TEXTURE_2D,1,ft,J.width,J.height):e.texImage2D(i.TEXTURE_2D,0,ft,J.width,J.height,0,lt,bt,null));else if(x.isDataTexture)if(Rt.length>0){Lt&&Ot&&e.texStorage2D(i.TEXTURE_2D,at,ft,Rt[0].width,Rt[0].height);for(let Z=0,ht=Rt.length;Z<ht;Z++)ct=Rt[Z],Lt?I&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,ct.width,ct.height,lt,bt,ct.data):e.texImage2D(i.TEXTURE_2D,Z,ft,ct.width,ct.height,0,lt,bt,ct.data);x.generateMipmaps=!1}else Lt?(Ot&&e.texStorage2D(i.TEXTURE_2D,at,ft,J.width,J.height),I&&et(x,J,lt,bt)):e.texImage2D(i.TEXTURE_2D,0,ft,J.width,J.height,0,lt,bt,J.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Lt&&Ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,ft,Rt[0].width,Rt[0].height,J.depth);for(let Z=0,ht=Rt.length;Z<ht;Z++)if(ct=Rt[Z],x.format!==fn)if(lt!==null)if(Lt){if(I)if(x.layerUpdates.size>0){const gt=ac(ct.width,ct.height,x.format,x.type);for(const tt of x.layerUpdates){const yt=ct.data.subarray(tt*gt/ct.data.BYTES_PER_ELEMENT,(tt+1)*gt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,tt,ct.width,ct.height,1,lt,yt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ct.width,ct.height,J.depth,lt,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,ft,ct.width,ct.height,J.depth,0,ct.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,ct.width,ct.height,J.depth,lt,bt,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,ft,ct.width,ct.height,J.depth,0,lt,bt,ct.data)}else{Lt&&Ot&&e.texStorage2D(i.TEXTURE_2D,at,ft,Rt[0].width,Rt[0].height);for(let Z=0,ht=Rt.length;Z<ht;Z++)ct=Rt[Z],x.format!==fn?lt!==null?Lt?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,ct.width,ct.height,lt,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,ft,ct.width,ct.height,0,ct.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?I&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,ct.width,ct.height,lt,bt,ct.data):e.texImage2D(i.TEXTURE_2D,Z,ft,ct.width,ct.height,0,lt,bt,ct.data)}else if(x.isDataArrayTexture)if(Lt){if(Ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,at,ft,J.width,J.height,J.depth),I)if(x.layerUpdates.size>0){const Z=ac(J.width,J.height,x.format,x.type);for(const ht of x.layerUpdates){const gt=J.data.subarray(ht*Z/J.data.BYTES_PER_ELEMENT,(ht+1)*Z/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ht,J.width,J.height,1,lt,bt,gt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,lt,bt,J.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ft,J.width,J.height,J.depth,0,lt,bt,J.data);else if(x.isData3DTexture)Lt?(Ot&&e.texStorage3D(i.TEXTURE_3D,at,ft,J.width,J.height,J.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,lt,bt,J.data)):e.texImage3D(i.TEXTURE_3D,0,ft,J.width,J.height,J.depth,0,lt,bt,J.data);else if(x.isFramebufferTexture){if(Ot)if(Lt)e.texStorage2D(i.TEXTURE_2D,at,ft,J.width,J.height);else{let Z=J.width,ht=J.height;for(let gt=0;gt<at;gt++)e.texImage2D(i.TEXTURE_2D,gt,ft,Z,ht,0,lt,bt,null),Z>>=1,ht>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const Z=i.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),J.parentNode!==Z){Z.appendChild(J),u.add(x),Z.onpaint=ht=>{const gt=ht.changedElements;for(const tt of u)gt.includes(tt.image)&&(tt.needsUpdate=!0)},Z.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{const gt=i.RGBA,tt=i.RGBA,yt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,gt,tt,yt,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Rt.length>0){if(Lt&&Ot){const Z=jt(Rt[0]);e.texStorage2D(i.TEXTURE_2D,at,ft,Z.width,Z.height)}for(let Z=0,ht=Rt.length;Z<ht;Z++)ct=Rt[Z],Lt?I&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,lt,bt,ct):e.texImage2D(i.TEXTURE_2D,Z,ft,lt,bt,ct);x.generateMipmaps=!1}else if(Lt){if(Ot){const Z=jt(J);e.texStorage2D(i.TEXTURE_2D,at,ft,Z.width,Z.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,bt,J)}else e.texImage2D(i.TEXTURE_2D,0,ft,lt,bt,J);p(x)&&S(G),ot.__version=rt.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function It(C,x,B){if(x.image.length!==6)return;const G=Y(C,x),$=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+B);const rt=n.get($);if($.version!==rt.__version||G===!0){e.activeTexture(i.TEXTURE0+B);const ot=Xt.getPrimaries(Xt.workingColorSpace),K=x.colorSpace===ei?null:Xt.getPrimaries(x.colorSpace),J=x.colorSpace===ei||ot===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const lt=x.isCompressedTexture||x.image[0].isCompressedTexture,bt=x.image[0]&&x.image[0].isDataTexture,ft=[];for(let tt=0;tt<6;tt++)!lt&&!bt?ft[tt]=m(x.image[tt],!0,s.maxCubemapSize):ft[tt]=bt?x.image[tt].image:x.image[tt],ft[tt]=ze(x,ft[tt]);const ct=ft[0],Rt=r.convert(x.format,x.colorSpace),Lt=r.convert(x.type),Ot=M(x.internalFormat,Rt,Lt,x.normalized,x.colorSpace),I=x.isVideoTexture!==!0,at=rt.__version===void 0||G===!0,Z=$.dataReady;let ht=y(x,ct);Tt(i.TEXTURE_CUBE_MAP,x);let gt;if(lt){I&&at&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Ot,ct.width,ct.height);for(let tt=0;tt<6;tt++){gt=ft[tt].mipmaps;for(let yt=0;yt<gt.length;yt++){const xt=gt[yt];x.format!==fn?Rt!==null?I?Z&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,yt,0,0,xt.width,xt.height,Rt,xt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,yt,Ot,xt.width,xt.height,0,xt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,yt,0,0,xt.width,xt.height,Rt,Lt,xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,yt,Ot,xt.width,xt.height,0,Rt,Lt,xt.data)}}}else{if(gt=x.mipmaps,I&&at){gt.length>0&&ht++;const tt=jt(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Ot,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(bt){I?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,ft[tt].width,ft[tt].height,Rt,Lt,ft[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Ot,ft[tt].width,ft[tt].height,0,Rt,Lt,ft[tt].data);for(let yt=0;yt<gt.length;yt++){const ue=gt[yt].image[tt].image;I?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,yt+1,0,0,ue.width,ue.height,Rt,Lt,ue.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,yt+1,Ot,ue.width,ue.height,0,Rt,Lt,ue.data)}}else{I?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Rt,Lt,ft[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Ot,Rt,Lt,ft[tt]);for(let yt=0;yt<gt.length;yt++){const xt=gt[yt];I?Z&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,yt+1,0,0,Rt,Lt,xt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,yt+1,Ot,Rt,Lt,xt.image[tt])}}}p(x)&&S(i.TEXTURE_CUBE_MAP),rt.__version=$.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function At(C,x,B,G,$,rt){const ot=r.convert(B.format,B.colorSpace),K=r.convert(B.type),J=M(B.internalFormat,ot,K,B.normalized,B.colorSpace),lt=n.get(x),bt=n.get(B);if(bt.__renderTarget=x,!lt.__hasExternalTextures){const ft=Math.max(1,x.width>>rt),ct=Math.max(1,x.height>>rt);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,rt,J,ft,ct,x.depth,0,ot,K,null):e.texImage2D($,rt,J,ft,ct,0,ot,K,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),ve(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,$,bt.__webglTexture,0,he(x)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,$,bt.__webglTexture,rt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(C,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,C),x.depthBuffer){const G=x.depthTexture,$=G&&G.isDepthTexture?G.type:null,rt=w(x.stencilBuffer,$),ot=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ve(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he(x),rt,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,he(x),rt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,rt,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,C)}else{const G=x.textures;for(let $=0;$<G.length;$++){const rt=G[$],ot=r.convert(rt.format,rt.colorSpace),K=r.convert(rt.type),J=M(rt.internalFormat,ot,K,rt.normalized,rt.colorSpace);ve(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he(x),J,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,he(x),J,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,J,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ft(C,x,B){const G=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=n.get(x.depthTexture);if($.__renderTarget=x,(!$.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G){if($.__webglInit===void 0&&($.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Tt(i.TEXTURE_CUBE_MAP,x.depthTexture);const lt=r.convert(x.depthTexture.format),bt=r.convert(x.depthTexture.type);let ft;x.depthTexture.format===zn?ft=i.DEPTH_COMPONENT24:x.depthTexture.format===Si&&(ft=i.DEPTH24_STENCIL8);for(let ct=0;ct<6;ct++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,ft,x.width,x.height,0,lt,bt,null)}}else q(x.depthTexture,0);const rt=$.__webglTexture,ot=he(x),K=G?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,J=x.depthTexture.format===Si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===zn)ve(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,K,rt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,J,K,rt,0);else if(x.depthTexture.format===Si)ve(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,K,rt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,J,K,rt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Zt(C){const x=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){const G=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),G){const $=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,G.removeEventListener("dispose",$)};G.addEventListener("dispose",$),x.__depthDisposeCallback=$}x.__boundDepthTexture=G}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(B)for(let G=0;G<6;G++)Ft(x.__webglFramebuffer[G],C,G);else{const G=C.texture.mipmaps;G&&G.length>0?Ft(x.__webglFramebuffer[0],C,0):Ft(x.__webglFramebuffer,C,0)}else if(B){x.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[G]),x.__webglDepthbuffer[G]===void 0)x.__webglDepthbuffer[G]=i.createRenderbuffer(),ee(x.__webglDepthbuffer[G],C,!1);else{const $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=x.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,rt)}}else{const G=C.texture.mipmaps;if(G&&G.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ee(x.__webglDepthbuffer,C,!1);else{const $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,rt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Jt(C,x,B){const G=n.get(C);x!==void 0&&At(G.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Zt(C)}function Yt(C){const x=C.texture,B=n.get(C),G=n.get(x);C.addEventListener("dispose",_);const $=C.textures,rt=C.isWebGLCubeRenderTarget===!0,ot=$.length>1;if(ot||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=x.version,a.memory.textures++),rt){B.__webglFramebuffer=[];for(let K=0;K<6;K++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[K]=[];for(let J=0;J<x.mipmaps.length;J++)B.__webglFramebuffer[K][J]=i.createFramebuffer()}else B.__webglFramebuffer[K]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let K=0;K<x.mipmaps.length;K++)B.__webglFramebuffer[K]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ot)for(let K=0,J=$.length;K<J;K++){const lt=n.get($[K]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&ve(C)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let K=0;K<$.length;K++){const J=$[K];B.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[K]);const lt=r.convert(J.format,J.colorSpace),bt=r.convert(J.type),ft=M(J.internalFormat,lt,bt,J.normalized,J.colorSpace,C.isXRRenderTarget===!0),ct=he(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,ft,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,B.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ee(B.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(rt){e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),Tt(i.TEXTURE_CUBE_MAP,x);for(let K=0;K<6;K++)if(x.mipmaps&&x.mipmaps.length>0)for(let J=0;J<x.mipmaps.length;J++)At(B.__webglFramebuffer[K][J],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,J);else At(B.__webglFramebuffer[K],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);p(x)&&S(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ot){for(let K=0,J=$.length;K<J;K++){const lt=$[K],bt=n.get(lt);let ft=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ft=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,bt.__webglTexture),Tt(ft,lt),At(B.__webglFramebuffer,C,lt,i.COLOR_ATTACHMENT0+K,ft,0),p(lt)&&S(ft)}e.unbindTexture()}else{let K=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,G.__webglTexture),Tt(K,x),x.mipmaps&&x.mipmaps.length>0)for(let J=0;J<x.mipmaps.length;J++)At(B.__webglFramebuffer[J],C,x,i.COLOR_ATTACHMENT0,K,J);else At(B.__webglFramebuffer,C,x,i.COLOR_ATTACHMENT0,K,0);p(x)&&S(K),e.unbindTexture()}C.depthBuffer&&Zt(C)}function ge(C){const x=C.textures;for(let B=0,G=x.length;B<G;B++){const $=x[B];if(p($)){const rt=E(C),ot=n.get($).__webglTexture;e.bindTexture(rt,ot),S(rt),e.unbindTexture()}}}const Se=[],we=[];function Ae(C){if(C.samples>0){if(ve(C)===!1){const x=C.textures,B=C.width,G=C.height;let $=i.COLOR_BUFFER_BIT;const rt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=n.get(C),K=x.length>1;if(K)for(let lt=0;lt<x.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer);const J=C.texture.mipmaps;J&&J.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let lt=0;lt<x.length;lt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ot.__webglColorRenderbuffer[lt]);const bt=n.get(x[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,bt,0)}i.blitFramebuffer(0,0,B,G,0,0,B,G,$,i.NEAREST),l===!0&&(Se.length=0,we.length=0,Se.push(i.COLOR_ATTACHMENT0+lt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Se.push(rt),we.push(rt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,we)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Se))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let lt=0;lt<x.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,ot.__webglColorRenderbuffer[lt]);const bt=n.get(x[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const x=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function he(C){return Math.min(s.maxSamples,C.samples)}function ve(C){const x=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function U(C){const x=a.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function ze(C,x){const B=C.colorSpace,G=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==Ar&&B!==ei&&(Xt.getTransfer(B)===Qt?(G!==fn||$!==qe)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$t("WebGLTextures: Unsupported texture color space:",B)),x}function jt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=W,this.getTextureUnits=z,this.setTextureUnits=F,this.setTexture2D=q,this.setTexture2DArray=j,this.setTexture3D=nt,this.setTextureCube=Q,this.rebindTextures=Jt,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=At,this.useMultisampledRTT=ve,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function B0(i,t){function e(n,s=ei){let r;const a=Xt.getTransfer(s);if(n===qe)return i.UNSIGNED_BYTE;if(n===Yo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ko)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Rh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ph)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ah)return i.BYTE;if(n===Ch)return i.SHORT;if(n===Es)return i.UNSIGNED_SHORT;if(n===$o)return i.INT;if(n===Cn)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===kn)return i.HALF_FLOAT;if(n===Lh)return i.ALPHA;if(n===Dh)return i.RGB;if(n===fn)return i.RGBA;if(n===zn)return i.DEPTH_COMPONENT;if(n===Si)return i.DEPTH_STENCIL;if(n===Ih)return i.RED;if(n===Zo)return i.RED_INTEGER;if(n===wi)return i.RG;if(n===Jo)return i.RG_INTEGER;if(n===jo)return i.RGBA_INTEGER;if(n===Mr||n===Sr||n===yr||n===br)if(a===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ka||n===Za||n===Ja||n===ja)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Za)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qa||n===to||n===eo||n===no||n===io||n===wr||n===so)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qa||n===to)return a===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===eo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===no)return r.COMPRESSED_R11_EAC;if(n===io)return r.COMPRESSED_SIGNED_R11_EAC;if(n===wr)return r.COMPRESSED_RG11_EAC;if(n===so)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===vo||n===_o||n===xo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ro)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ao)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===co)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ho)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===po)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===go)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_o)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xo)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Mo||n===So||n===yo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Mo)return a===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===So)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bo||n===Eo||n===Tr||n===wo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===bo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Tr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const k0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,z0=`
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

}`;class V0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new zh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Rn({vertexShader:k0,fragmentShader:z0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Fe(new Or(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class H0 extends Ai{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new V0,p={},S=e.getContextAttributes();let E=null,M=null;const w=[],y=[],A=new Wt;let _=null;const T=new tn;T.viewport=new ce;const P=new tn;P.viewport=new ce;const R=[T,P],L=new Jf;let W=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let it=w[Y];return it===void 0&&(it=new ea,w[Y]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Y){let it=w[Y];return it===void 0&&(it=new ea,w[Y]=it),it.getGripSpace()},this.getHand=function(Y){let it=w[Y];return it===void 0&&(it=new ea,w[Y]=it),it.getHandSpace()};function F(Y){const it=y.indexOf(Y.inputSource);if(it===-1)return;const et=w[it];et!==void 0&&(et.update(Y.inputSource,Y.frame,c||a),et.dispatchEvent({type:Y.type,data:Y.inputSource}))}function k(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",O);for(let Y=0;Y<w.length;Y++){const it=y[Y];it!==null&&(y[Y]=null,w[Y].disconnect(it))}W=null,z=null,m.reset();for(const Y in p)delete p[Y];t.setRenderTarget(E),d=null,f=null,u=null,s=null,M=null,Tt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",k),s.addEventListener("inputsourceschange",O),S.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let et=null,Pt=null,It=null;S.depth&&(It=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=S.stencil?Si:zn,Pt=S.stencil?ws:Cn);const At={colorFormat:e.RGBA8,depthFormat:It,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(At),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new wn(f.textureWidth,f.textureHeight,{format:fn,type:qe,depthTexture:new is(f.textureWidth,f.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const et={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new wn(d.framebufferWidth,d.framebufferHeight,{format:fn,type:qe,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Tt.setContext(s),Tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function O(Y){for(let it=0;it<Y.removed.length;it++){const et=Y.removed[it],Pt=y.indexOf(et);Pt>=0&&(y[Pt]=null,w[Pt].disconnect(et))}for(let it=0;it<Y.added.length;it++){const et=Y.added[it];let Pt=y.indexOf(et);if(Pt===-1){for(let At=0;At<w.length;At++)if(At>=y.length){y.push(et),Pt=At;break}else if(y[At]===null){y[At]=et,Pt=At;break}if(Pt===-1)break}const It=w[Pt];It&&It.connect(et)}}const q=new D,j=new D;function nt(Y,it,et){q.setFromMatrixPosition(it.matrixWorld),j.setFromMatrixPosition(et.matrixWorld);const Pt=q.distanceTo(j),It=it.projectionMatrix.elements,At=et.projectionMatrix.elements,ee=It[14]/(It[10]-1),Ft=It[14]/(It[10]+1),Zt=(It[9]+1)/It[5],Jt=(It[9]-1)/It[5],Yt=(It[8]-1)/It[0],ge=(At[8]+1)/At[0],Se=ee*Yt,we=ee*ge,Ae=Pt/(-Yt+ge),he=Ae*-Yt;if(it.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(he),Y.translateZ(Ae),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),It[10]===-1)Y.projectionMatrix.copy(it.projectionMatrix),Y.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const ve=ee+Ae,U=Ft+Ae,ze=Se-he,jt=we+(Pt-he),C=Zt*Ft/U*ve,x=Jt*Ft/U*ve;Y.projectionMatrix.makePerspective(ze,jt,C,x,ve,U),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Q(Y,it){it===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(it.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let it=Y.near,et=Y.far;m.texture!==null&&(m.depthNear>0&&(it=m.depthNear),m.depthFar>0&&(et=m.depthFar)),L.near=P.near=T.near=it,L.far=P.far=T.far=et,(W!==L.near||z!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),W=L.near,z=L.far),L.layers.mask=Y.layers.mask|6,T.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;const Pt=Y.parent,It=L.cameras;Q(L,Pt);for(let At=0;At<It.length;At++)Q(It[At],Pt);It.length===2?nt(L,T,P):L.projectionMatrix.copy(T.projectionMatrix),st(Y,L,Pt)};function st(Y,it,et){et===null?Y.matrix.copy(it.matrixWorld):(Y.matrix.copy(et.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(it.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(it.projectionMatrix),Y.projectionMatrixInverse.copy(it.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ao*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(Y){return p[Y]};let wt=null;function Ut(Y,it){if(h=it.getViewerPose(c||a),g=it,h!==null){const et=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let Pt=!1;et.length!==L.cameras.length&&(L.cameras.length=0,Pt=!0);for(let Ft=0;Ft<et.length;Ft++){const Zt=et[Ft];let Jt=null;if(d!==null)Jt=d.getViewport(Zt);else{const ge=u.getViewSubImage(f,Zt);Jt=ge.viewport,Ft===0&&(t.setRenderTargetTextures(M,ge.colorTexture,ge.depthStencilTexture),t.setRenderTarget(M))}let Yt=R[Ft];Yt===void 0&&(Yt=new tn,Yt.layers.enable(Ft),Yt.viewport=new ce,R[Ft]=Yt),Yt.matrix.fromArray(Zt.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(Zt.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),Ft===0&&(L.matrix.copy(Yt.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Pt===!0&&L.cameras.push(Yt)}const It=s.enabledFeatures;if(It&&It.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const Ft=u.getDepthInformation(et[0]);Ft&&Ft.isValid&&Ft.texture&&m.init(Ft,s.renderState)}if(It&&It.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let Ft=0;Ft<et.length;Ft++){const Zt=et[Ft].camera;if(Zt){let Jt=p[Zt];Jt||(Jt=new zh,p[Zt]=Jt);const Yt=u.getCameraImage(Zt);Jt.sourceTexture=Yt}}}}for(let et=0;et<w.length;et++){const Pt=y[et],It=w[et];Pt!==null&&It!==void 0&&It.update(Pt,it,c||a)}wt&&wt(Y,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const Tt=new qh;Tt.setAnimationLoop(Ut),this.setAnimationLoop=function(Y){wt=Y},this.dispose=function(){}}}const G0=new se,Qh=new Nt;Qh.set(-1,0,0,0,1,0,0,0,1);function W0(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Vh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,E,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===He&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===He&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),E=S.envMap,M=S.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(G0.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Qh),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===He&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function X0(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){const y=w.program;n.uniformBlockBinding(M,y)}function c(M,w){let y=s[M.id];y===void 0&&(m(M),y=h(M),s[M.id]=y,M.addEventListener("dispose",S));const A=w.program;n.updateUBOMapping(M,A);const _=t.render.frame;r[M.id]!==_&&(f(M),r[M.id]=_)}function h(M){const w=u();M.__bindingPointIndex=w;const y=i.createBuffer(),A=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,y),y}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return $t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const w=s[M.id],y=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let _=0,T=y.length;_<T;_++){const P=y[_];if(Array.isArray(P))for(let R=0,L=P.length;R<L;R++)d(P[R],_,R,A);else d(P,_,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,w,y,A){if(v(M,w,y,A)===!0){const _=M.__offset,T=M.value;if(Array.isArray(T)){let P=0;for(let R=0;R<T.length;R++){const L=T[R],W=p(L);g(L,M.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function g(M,w,y){typeof M=="number"||typeof M=="boolean"?w[0]=M:M.isMatrix3?(w[0]=M.elements[0],w[1]=M.elements[1],w[2]=M.elements[2],w[3]=0,w[4]=M.elements[3],w[5]=M.elements[4],w[6]=M.elements[5],w[7]=0,w[8]=M.elements[6],w[9]=M.elements[7],w[10]=M.elements[8],w[11]=0):ArrayBuffer.isView(M)?w.set(new M.constructor(M.buffer,M.byteOffset,w.length)):M.toArray(w,y)}function v(M,w,y,A){const _=M.value,T=w+"_"+y;if(A[T]===void 0)return typeof _=="number"||typeof _=="boolean"?A[T]=_:ArrayBuffer.isView(_)?A[T]=_.slice():A[T]=_.clone(),!0;{const P=A[T];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return A[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function m(M){const w=M.uniforms;let y=0;const A=16;for(let T=0,P=w.length;T<P;T++){const R=Array.isArray(w[T])?w[T]:[w[T]];for(let L=0,W=R.length;L<W;L++){const z=R[L],F=Array.isArray(z.value)?z.value:[z.value];for(let k=0,O=F.length;k<O;k++){const q=F[k],j=p(q),nt=y%A,Q=nt%j.boundary,st=nt+Q;y+=Q,st!==0&&A-st<j.storage&&(y+=A-st),z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=y,y+=j.storage}}}const _=y%A;return _>0&&(y+=A-_),M.__size=y,M.__cache={},this}function p(M){const w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(w.boundary=16,w.storage=M.byteLength):Dt("WebGLRenderer: Unsupported uniform value type.",M),w}function S(M){const w=M.target;w.removeEventListener("dispose",S);const y=a.indexOf(w.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function E(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:E}}const q0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _n=null;function $0(){return _n===null&&(_n=new Uf(q0,16,16,wi,kn),_n.name="DFG_LUT",_n.minFilter=Ne,_n.magFilter=Ne,_n.wrapS=Fn,_n.wrapT=Fn,_n.generateMipmaps=!1,_n.needsUpdate=!0),_n}class Y0{constructor(t={}){const{canvas:e=uf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=qe}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=d,m=new Set([jo,Jo,Zo]),p=new Set([qe,Cn,Es,ws,Yo,Ko]),S=new Uint32Array(4),E=new Int32Array(4),M=new D;let w=null,y=null;const A=[],_=[];let T=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=En,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,L=null,W=null,z=null,F=null;this._outputColorSpace=Ze;let k=0,O=0,q=null,j=-1,nt=null;const Q=new ce,st=new ce;let wt=null;const Ut=new Vt(0);let Tt=0,Y=e.width,it=e.height,et=1,Pt=null,It=null;const At=new ce(0,0,Y,it),ee=new ce(0,0,Y,it);let Ft=!1;const Zt=new il;let Jt=!1,Yt=!1;const ge=new se,Se=new D,we=new ce,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let he=!1;function ve(){return q===null?et:1}let U=n;function ze(b,N){return e.getContext(b,N)}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Xo}`),e.addEventListener("webglcontextlost",ue,!1),e.addEventListener("webglcontextrestored",re,!1),e.addEventListener("webglcontextcreationerror",pn,!1),U===null){const N="webgl2";if(U=ze(N,b),U===null)throw ze(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw $t("WebGLRenderer: "+b.message),b}let jt,C,x,B,G,$,rt,ot,K,J,lt,bt,ft,ct,Rt,Lt,Ot,I,at,Z,ht,gt,tt;function yt(){jt=new $m(U),jt.init(),ht=new B0(U,jt),C=new km(U,jt,t,ht),x=new F0(U,jt),C.reversedDepthBuffer&&f&&x.buffers.depth.setReversed(!0),W=U.createFramebuffer(),z=U.createFramebuffer(),F=U.createFramebuffer(),B=new Zm(U),G=new y0,$=new O0(U,jt,x,G,C,ht,B),rt=new qm(P),ot=new td(U),gt=new Om(U,ot),K=new Ym(U,ot,B,gt),J=new jm(U,K,ot,gt,B),I=new Jm(U,C,$),Rt=new zm(G),lt=new S0(P,rt,jt,C,gt,Rt),bt=new W0(P,G),ft=new E0,ct=new P0(jt),Ot=new Fm(P,rt,x,J,g,l),Lt=new N0(P,J,C),tt=new X0(U,B,C,x),at=new Bm(U,jt,B),Z=new Km(U,jt,B),B.programs=lt.programs,P.capabilities=C,P.extensions=jt,P.properties=G,P.renderLists=ft,P.shadowMap=Lt,P.state=x,P.info=B}yt(),v!==qe&&(T=new tg(v,e.width,e.height,o,s,r));const xt=new H0(P,U);this.xr=xt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const b=jt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=jt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(b){b!==void 0&&(et=b,this.setSize(Y,it,!1))},this.getSize=function(b){return b.set(Y,it)},this.setSize=function(b,N,X=!0){if(xt.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}Y=b,it=N,e.width=Math.floor(b*et),e.height=Math.floor(N*et),X===!0&&(e.style.width=b+"px",e.style.height=N+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(Y*et,it*et).floor()},this.setDrawingBufferSize=function(b,N,X){Y=b,it=N,et=X,e.width=Math.floor(b*X),e.height=Math.floor(N*X),this.setViewport(0,0,b,N)},this.setEffects=function(b){if(v===qe){$t("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let N=0;N<b.length;N++)if(b[N].isOutputPass===!0){Dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(Q)},this.getViewport=function(b){return b.copy(At)},this.setViewport=function(b,N,X,V){b.isVector4?At.set(b.x,b.y,b.z,b.w):At.set(b,N,X,V),x.viewport(Q.copy(At).multiplyScalar(et).round())},this.getScissor=function(b){return b.copy(ee)},this.setScissor=function(b,N,X,V){b.isVector4?ee.set(b.x,b.y,b.z,b.w):ee.set(b,N,X,V),x.scissor(st.copy(ee).multiplyScalar(et).round())},this.getScissorTest=function(){return Ft},this.setScissorTest=function(b){x.setScissorTest(Ft=b)},this.setOpaqueSort=function(b){Pt=b},this.setTransparentSort=function(b){It=b},this.getClearColor=function(b){return b.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor(...arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha(...arguments)},this.clear=function(b=!0,N=!0,X=!0){let V=0;if(b){let H=!1;if(q!==null){const mt=q.texture.format;H=m.has(mt)}if(H){const mt=q.texture.type,_t=p.has(mt),pt=Ot.getClearColor(),Mt=Ot.getClearAlpha(),Et=pt.r,Bt=pt.g,zt=pt.b;_t?(S[0]=Et,S[1]=Bt,S[2]=zt,S[3]=Mt,U.clearBufferuiv(U.COLOR,0,S)):(E[0]=Et,E[1]=Bt,E[2]=zt,E[3]=Mt,U.clearBufferiv(U.COLOR,0,E))}else V|=U.COLOR_BUFFER_BIT}N&&(V|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(V|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&U.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),L=b},this.dispose=function(){e.removeEventListener("webglcontextlost",ue,!1),e.removeEventListener("webglcontextrestored",re,!1),e.removeEventListener("webglcontextcreationerror",pn,!1),Ot.dispose(),ft.dispose(),ct.dispose(),G.dispose(),rt.dispose(),J.dispose(),gt.dispose(),tt.dispose(),lt.dispose(),xt.dispose(),xt.removeEventListener("sessionstart",dl),xt.removeEventListener("sessionend",pl),ci.stop()};function ue(b){b.preventDefault(),Ll("WebGLRenderer: Context Lost."),R=!0}function re(){Ll("WebGLRenderer: Context Restored."),R=!1;const b=B.autoReset,N=Lt.enabled,X=Lt.autoUpdate,V=Lt.needsUpdate,H=Lt.type;yt(),B.autoReset=b,Lt.enabled=N,Lt.autoUpdate=X,Lt.needsUpdate=V,Lt.type=H}function pn(b){$t("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function mn(b){const N=b.target;N.removeEventListener("dispose",mn),yu(N)}function yu(b){bu(b),G.remove(b)}function bu(b){const N=G.get(b).programs;N!==void 0&&(N.forEach(function(X){lt.releaseProgram(X)}),b.isShaderMaterial&&lt.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,X,V,H,mt){N===null&&(N=Ae);const _t=H.isMesh&&H.matrixWorld.determinantAffine()<0,pt=Tu(b,N,X,V,H);x.setMaterial(V,_t);let Mt=X.index,Et=1;if(V.wireframe===!0){if(Mt=K.getWireframeAttribute(X),Mt===void 0)return;Et=2}const Bt=X.drawRange,zt=X.attributes.position;let Ct=Bt.start*Et,te=(Bt.start+Bt.count)*Et;mt!==null&&(Ct=Math.max(Ct,mt.start*Et),te=Math.min(te,(mt.start+mt.count)*Et)),Mt!==null?(Ct=Math.max(Ct,0),te=Math.min(te,Mt.count)):zt!=null&&(Ct=Math.max(Ct,0),te=Math.min(te,zt.count));const de=te-Ct;if(de<0||de===1/0)return;gt.setup(H,V,pt,X,Mt);let fe,ne=at;if(Mt!==null&&(fe=ot.get(Mt),ne=Z,ne.setIndex(fe)),H.isMesh)V.wireframe===!0?(x.setLineWidth(V.wireframeLinewidth*ve()),ne.setMode(U.LINES)):ne.setMode(U.TRIANGLES);else if(H.isLine){let Le=V.linewidth;Le===void 0&&(Le=1),x.setLineWidth(Le*ve()),H.isLineSegments?ne.setMode(U.LINES):H.isLineLoop?ne.setMode(U.LINE_LOOP):ne.setMode(U.LINE_STRIP)}else H.isPoints?ne.setMode(U.POINTS):H.isSprite&&ne.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(jt.get("WEBGL_multi_draw"))ne.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Le=H._multiDrawStarts,vt=H._multiDrawCounts,Ge=H._multiDrawCount,Kt=Mt?ot.get(Mt).bytesPerElement:1,Ye=G.get(V).currentProgram.getUniforms();for(let gn=0;gn<Ge;gn++)Ye.setValue(U,"_gl_DrawID",gn),ne.render(Le[gn]/Kt,vt[gn])}else if(H.isInstancedMesh)ne.renderInstances(Ct,de,H.count);else if(X.isInstancedBufferGeometry){const Le=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,vt=Math.min(X.instanceCount,Le);ne.renderInstances(Ct,de,vt)}else ne.render(Ct,de)};function fl(b,N,X){b.transparent===!0&&b.side===en&&b.forceSinglePass===!1?(b.side=He,b.needsUpdate=!0,Ns(b,N,X),b.side=si,b.needsUpdate=!0,Ns(b,N,X),b.side=en):Ns(b,N,X)}this.compile=function(b,N,X=null){X===null&&(X=b),y=ct.get(X),y.init(N),_.push(y),X.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(y.pushLight(H),H.castShadow&&y.pushShadow(H))}),b!==X&&b.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(y.pushLight(H),H.castShadow&&y.pushShadow(H))}),y.setupLights();const V=new Set;return b.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const mt=H.material;if(mt)if(Array.isArray(mt))for(let _t=0;_t<mt.length;_t++){const pt=mt[_t];fl(pt,X,H),V.add(pt)}else fl(mt,X,H),V.add(mt)}),y=_.pop(),V},this.compileAsync=function(b,N,X=null){const V=this.compile(b,N,X);return new Promise(H=>{function mt(){if(V.forEach(function(_t){G.get(_t).currentProgram.isReady()&&V.delete(_t)}),V.size===0){H(b);return}setTimeout(mt,10)}jt.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let Gr=null;function Eu(b){Gr&&Gr(b)}function dl(){ci.stop()}function pl(){ci.start()}const ci=new qh;ci.setAnimationLoop(Eu),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(b){Gr=b,xt.setAnimationLoop(b),b===null?ci.stop():ci.start()},xt.addEventListener("sessionstart",dl),xt.addEventListener("sessionend",pl),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){$t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;L!==null&&L.renderStart(b,N);const X=xt.enabled===!0&&xt.isPresenting===!0,V=T!==null&&(q===null||X)&&T.begin(P,q);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),xt.enabled===!0&&xt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(xt.cameraAutoUpdate===!0&&xt.updateCamera(N),N=xt.getCamera()),b.isScene===!0&&b.onBeforeRender(P,b,N,q),y=ct.get(b,_.length),y.init(N),y.state.textureUnits=$.getTextureUnits(),_.push(y),ge.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Zt.setFromProjectionMatrix(ge,bn,N.reversedDepth),Yt=this.localClippingEnabled,Jt=Rt.init(this.clippingPlanes,Yt),w=ft.get(b,A.length),w.init(),A.push(w),xt.enabled===!0&&xt.isPresenting===!0){const _t=P.xr.getDepthSensingMesh();_t!==null&&Wr(_t,N,-1/0,P.sortObjects)}Wr(b,N,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(Pt,It,N.reversedDepth),he=xt.enabled===!1||xt.isPresenting===!1||xt.hasDepthSensing()===!1,he&&Ot.addToRenderList(w,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Jt===!0&&Rt.beginShadows();const H=y.state.shadowsArray;if(Lt.render(H,b,N),Jt===!0&&Rt.endShadows(),(V&&T.hasRenderPass())===!1){const _t=w.opaque,pt=w.transmissive;if(y.setupLights(),N.isArrayCamera){const Mt=N.cameras;if(pt.length>0)for(let Et=0,Bt=Mt.length;Et<Bt;Et++){const zt=Mt[Et];gl(_t,pt,b,zt)}he&&Ot.render(b);for(let Et=0,Bt=Mt.length;Et<Bt;Et++){const zt=Mt[Et];ml(w,b,zt,zt.viewport)}}else pt.length>0&&gl(_t,pt,b,N),he&&Ot.render(b),ml(w,b,N)}q!==null&&O===0&&($.updateMultisampleRenderTarget(q),$.updateRenderTargetMipmap(q)),V&&T.end(P),b.isScene===!0&&b.onAfterRender(P,b,N),gt.resetDefaultState(),j=-1,nt=null,_.pop(),_.length>0?(y=_[_.length-1],$.setTextureUnits(y.state.textureUnits),Jt===!0&&Rt.setGlobalState(P.clippingPlanes,y.state.camera)):y=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,L!==null&&L.renderEnd()};function Wr(b,N,X,V){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLightProbeGrid)y.pushLightProbeGrid(b);else if(b.isLight)y.pushLight(b),b.castShadow&&y.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Zt.intersectsSprite(b)){V&&we.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ge);const _t=J.update(b),pt=b.material;pt.visible&&w.push(b,_t,pt,X,we.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Zt.intersectsObject(b))){const _t=J.update(b),pt=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),we.copy(b.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),we.copy(_t.boundingSphere.center)),we.applyMatrix4(b.matrixWorld).applyMatrix4(ge)),Array.isArray(pt)){const Mt=_t.groups;for(let Et=0,Bt=Mt.length;Et<Bt;Et++){const zt=Mt[Et],Ct=pt[zt.materialIndex];Ct&&Ct.visible&&w.push(b,_t,Ct,X,we.z,zt)}}else pt.visible&&w.push(b,_t,pt,X,we.z,null)}}const mt=b.children;for(let _t=0,pt=mt.length;_t<pt;_t++)Wr(mt[_t],N,X,V)}function ml(b,N,X,V){const{opaque:H,transmissive:mt,transparent:_t}=b;y.setupLightsView(X),Jt===!0&&Rt.setGlobalState(P.clippingPlanes,X),V&&x.viewport(Q.copy(V)),H.length>0&&Us(H,N,X),mt.length>0&&Us(mt,N,X),_t.length>0&&Us(_t,N,X),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function gl(b,N,X,V){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[V.id]===void 0){const Ct=jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[V.id]=new wn(1,1,{generateMipmaps:!0,type:Ct?kn:qe,minFilter:Mi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace})}const mt=y.state.transmissionRenderTarget[V.id],_t=V.viewport||Q;mt.setSize(_t.z*P.transmissionResolutionScale,_t.w*P.transmissionResolutionScale);const pt=P.getRenderTarget(),Mt=P.getActiveCubeFace(),Et=P.getActiveMipmapLevel();P.setRenderTarget(mt),P.getClearColor(Ut),Tt=P.getClearAlpha(),Tt<1&&P.setClearColor(16777215,.5),P.clear(),he&&Ot.render(X);const Bt=P.toneMapping;P.toneMapping=En;const zt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),y.setupLightsView(V),Jt===!0&&Rt.setGlobalState(P.clippingPlanes,V),Us(b,X,V),$.updateMultisampleRenderTarget(mt),$.updateRenderTargetMipmap(mt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let te=0,de=N.length;te<de;te++){const fe=N[te],{object:ne,geometry:Le,material:vt,group:Ge}=fe;if(vt.side===en&&ne.layers.test(V.layers)){const Kt=vt.side;vt.side=He,vt.needsUpdate=!0,vl(ne,X,V,Le,vt,Ge),vt.side=Kt,vt.needsUpdate=!0,Ct=!0}}Ct===!0&&($.updateMultisampleRenderTarget(mt),$.updateRenderTargetMipmap(mt))}P.setRenderTarget(pt,Mt,Et),P.setClearColor(Ut,Tt),zt!==void 0&&(V.viewport=zt),P.toneMapping=Bt}function Us(b,N,X){const V=N.isScene===!0?N.overrideMaterial:null;for(let H=0,mt=b.length;H<mt;H++){const _t=b[H],{object:pt,geometry:Mt,group:Et}=_t;let Bt=_t.material;Bt.allowOverride===!0&&V!==null&&(Bt=V),pt.layers.test(X.layers)&&vl(pt,N,X,Mt,Bt,Et)}}function vl(b,N,X,V,H,mt){b.onBeforeRender(P,N,X,V,H,mt),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(P,N,X,V,b,mt),H.transparent===!0&&H.side===en&&H.forceSinglePass===!1?(H.side=He,H.needsUpdate=!0,P.renderBufferDirect(X,N,V,H,b,mt),H.side=si,H.needsUpdate=!0,P.renderBufferDirect(X,N,V,H,b,mt),H.side=en):P.renderBufferDirect(X,N,V,H,b,mt),b.onAfterRender(P,N,X,V,H,mt)}function Ns(b,N,X){N.isScene!==!0&&(N=Ae);const V=G.get(b),H=y.state.lights,mt=y.state.shadowsArray,_t=H.state.version,pt=lt.getParameters(b,H.state,mt,N,X,y.state.lightProbeGridArray),Mt=lt.getProgramCacheKey(pt);let Et=V.programs;V.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?N.environment:null,V.fog=N.fog;const Bt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;V.envMap=rt.get(b.envMap||V.environment,Bt),V.envMapRotation=V.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Et===void 0&&(b.addEventListener("dispose",mn),Et=new Map,V.programs=Et);let zt=Et.get(Mt);if(zt!==void 0){if(V.currentProgram===zt&&V.lightsStateVersion===_t)return xl(b,pt),zt}else pt.uniforms=lt.getUniforms(b),L!==null&&b.isNodeMaterial&&L.build(b,X,pt),b.onBeforeCompile(pt,P),zt=lt.acquireProgram(pt,Mt),Et.set(Mt,zt),V.uniforms=pt.uniforms;const Ct=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ct.clippingPlanes=Rt.uniform),xl(b,pt),V.needsLights=Cu(b),V.lightsStateVersion=_t,V.needsLights&&(Ct.ambientLightColor.value=H.state.ambient,Ct.lightProbe.value=H.state.probe,Ct.directionalLights.value=H.state.directional,Ct.directionalLightShadows.value=H.state.directionalShadow,Ct.spotLights.value=H.state.spot,Ct.spotLightShadows.value=H.state.spotShadow,Ct.rectAreaLights.value=H.state.rectArea,Ct.ltc_1.value=H.state.rectAreaLTC1,Ct.ltc_2.value=H.state.rectAreaLTC2,Ct.pointLights.value=H.state.point,Ct.pointLightShadows.value=H.state.pointShadow,Ct.hemisphereLights.value=H.state.hemi,Ct.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ct.spotLightMatrix.value=H.state.spotLightMatrix,Ct.spotLightMap.value=H.state.spotLightMap,Ct.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=y.state.lightProbeGridArray.length>0,V.currentProgram=zt,V.uniformsList=null,zt}function _l(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=Er.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function xl(b,N){const X=G.get(b);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function wu(b,N){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;M.setFromMatrixPosition(N.matrixWorld);for(let X=0,V=b.length;X<V;X++){const H=b[X];if(H.texture!==null&&H.boundingBox.containsPoint(M))return H}return null}function Tu(b,N,X,V,H){N.isScene!==!0&&(N=Ae),$.resetTextureUnits();const mt=N.fog,_t=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?N.environment:null,pt=q===null?P.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Xt.workingColorSpace,Mt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Et=rt.get(V.envMap||_t,Mt),Bt=V.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,zt=!!X.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ct=!!X.morphAttributes.position,te=!!X.morphAttributes.normal,de=!!X.morphAttributes.color;let fe=En;V.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(fe=P.toneMapping);const ne=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Le=ne!==void 0?ne.length:0,vt=G.get(V),Ge=y.state.lights;if(Jt===!0&&(Yt===!0||b!==nt)){const ae=b===nt&&V.id===j;Rt.setState(V,b,ae)}let Kt=!1;V.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==Ge.state.version||vt.outputColorSpace!==pt||H.isBatchedMesh&&vt.batching===!1||!H.isBatchedMesh&&vt.batching===!0||H.isBatchedMesh&&vt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&vt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&vt.instancing===!1||!H.isInstancedMesh&&vt.instancing===!0||H.isSkinnedMesh&&vt.skinning===!1||!H.isSkinnedMesh&&vt.skinning===!0||H.isInstancedMesh&&vt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&vt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&vt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&vt.instancingMorph===!1&&H.morphTexture!==null||vt.envMap!==Et||V.fog===!0&&vt.fog!==mt||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==Rt.numPlanes||vt.numIntersection!==Rt.numIntersection)||vt.vertexAlphas!==Bt||vt.vertexTangents!==zt||vt.morphTargets!==Ct||vt.morphNormals!==te||vt.morphColors!==de||vt.toneMapping!==fe||vt.morphTargetsCount!==Le||!!vt.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(Kt=!0):(Kt=!0,vt.__version=V.version);let Ye=vt.currentProgram;Kt===!0&&(Ye=Ns(V,N,H),L&&V.isNodeMaterial&&L.onUpdateProgram(V,Ye,vt));let gn=!1,Hn=!1,Ri=!1;const ie=Ye.getUniforms(),pe=vt.uniforms;if(x.useProgram(Ye.program)&&(gn=!0,Hn=!0,Ri=!0),V.id!==j&&(j=V.id,Hn=!0),vt.needsLights){const ae=wu(y.state.lightProbeGridArray,H);vt.lightProbeGrid!==ae&&(vt.lightProbeGrid=ae,Hn=!0)}if(gn||nt!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ie.setValue(U,"projectionMatrix",b.projectionMatrix),ie.setValue(U,"viewMatrix",b.matrixWorldInverse);const Wn=ie.map.cameraPosition;Wn!==void 0&&Wn.setValue(U,Se.setFromMatrixPosition(b.matrixWorld)),C.logarithmicDepthBuffer&&ie.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ie.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),nt!==b&&(nt=b,Hn=!0,Ri=!0)}if(vt.needsLights&&(Ge.state.directionalShadowMap.length>0&&ie.setValue(U,"directionalShadowMap",Ge.state.directionalShadowMap,$),Ge.state.spotShadowMap.length>0&&ie.setValue(U,"spotShadowMap",Ge.state.spotShadowMap,$),Ge.state.pointShadowMap.length>0&&ie.setValue(U,"pointShadowMap",Ge.state.pointShadowMap,$)),H.isSkinnedMesh){ie.setOptional(U,H,"bindMatrix"),ie.setOptional(U,H,"bindMatrixInverse");const ae=H.skeleton;ae&&(ae.boneTexture===null&&ae.computeBoneTexture(),ie.setValue(U,"boneTexture",ae.boneTexture,$))}H.isBatchedMesh&&(ie.setOptional(U,H,"batchingTexture"),ie.setValue(U,"batchingTexture",H._matricesTexture,$),ie.setOptional(U,H,"batchingIdTexture"),ie.setValue(U,"batchingIdTexture",H._indirectTexture,$),ie.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&ie.setValue(U,"batchingColorTexture",H._colorsTexture,$));const Gn=X.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&I.update(H,X,Ye),(Hn||vt.receiveShadow!==H.receiveShadow)&&(vt.receiveShadow=H.receiveShadow,ie.setValue(U,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&N.environment!==null&&(pe.envMapIntensity.value=N.environmentIntensity),pe.dfgLUT!==void 0&&(pe.dfgLUT.value=$0()),Hn){if(ie.setValue(U,"toneMappingExposure",P.toneMappingExposure),vt.needsLights&&Au(pe,Ri),mt&&V.fog===!0&&bt.refreshFogUniforms(pe,mt),bt.refreshMaterialUniforms(pe,V,et,it,y.state.transmissionRenderTarget[b.id]),vt.needsLights&&vt.lightProbeGrid){const ae=vt.lightProbeGrid;pe.probesSH.value=ae.texture,pe.probesMin.value.copy(ae.boundingBox.min),pe.probesMax.value.copy(ae.boundingBox.max),pe.probesResolution.value.copy(ae.resolution)}Er.upload(U,_l(vt),pe,$)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Er.upload(U,_l(vt),pe,$),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ie.setValue(U,"center",H.center),ie.setValue(U,"modelViewMatrix",H.modelViewMatrix),ie.setValue(U,"normalMatrix",H.normalMatrix),ie.setValue(U,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){const ae=V.uniformsGroups;for(let Wn=0,Pi=ae.length;Wn<Pi;Wn++){const Ml=ae[Wn];tt.update(Ml,Ye),tt.bind(Ml,Ye)}}return Ye}function Au(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function Cu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(b,N,X){const V=G.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),G.get(b.texture).__webglTexture=N,G.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:X,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,N){const X=G.get(b);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,X=0){q=b,k=N,O=X;let V=null,H=!1,mt=!1;if(b){const pt=G.get(b);if(pt.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(U.FRAMEBUFFER,pt.__webglFramebuffer),Q.copy(b.viewport),st.copy(b.scissor),wt=b.scissorTest,x.viewport(Q),x.scissor(st),x.setScissorTest(wt),j=-1;return}else if(pt.__webglFramebuffer===void 0)$.setupRenderTarget(b);else if(pt.__hasExternalTextures)$.rebindTextures(b,G.get(b.texture).__webglTexture,G.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Bt=b.depthTexture;if(pt.__boundDepthTexture!==Bt){if(Bt!==null&&G.has(Bt)&&(b.width!==Bt.image.width||b.height!==Bt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(b)}}const Mt=b.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(mt=!0);const Et=G.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Et[N])?V=Et[N][X]:V=Et[N],H=!0):b.samples>0&&$.useMultisampledRTT(b)===!1?V=G.get(b).__webglMultisampledFramebuffer:Array.isArray(Et)?V=Et[X]:V=Et,Q.copy(b.viewport),st.copy(b.scissor),wt=b.scissorTest}else Q.copy(At).multiplyScalar(et).floor(),st.copy(ee).multiplyScalar(et).floor(),wt=Ft;if(X!==0&&(V=W),x.bindFramebuffer(U.FRAMEBUFFER,V)&&x.drawBuffers(b,V),x.viewport(Q),x.scissor(st),x.setScissorTest(wt),H){const pt=G.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,pt.__webglTexture,X)}else if(mt){const pt=N;for(let Mt=0;Mt<b.textures.length;Mt++){const Et=G.get(b.textures[Mt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Mt,Et.__webglTexture,X,pt)}}else if(b!==null&&X!==0){const pt=G.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pt.__webglTexture,X)}j=-1},this.readRenderTargetPixels=function(b,N,X,V,H,mt,_t,pt=0){if(!(b&&b.isWebGLRenderTarget)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(Mt=Mt[_t]),Mt){x.bindFramebuffer(U.FRAMEBUFFER,Mt);try{const Et=b.textures[pt],Bt=Et.format,zt=Et.type;if(b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt),!C.textureFormatReadable(Bt)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(zt)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-V&&X>=0&&X<=b.height-H&&U.readPixels(N,X,V,H,ht.convert(Bt),ht.convert(zt),mt)}finally{const Et=q!==null?G.get(q).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(b,N,X,V,H,mt,_t,pt=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=G.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(Mt=Mt[_t]),Mt)if(N>=0&&N<=b.width-V&&X>=0&&X<=b.height-H){x.bindFramebuffer(U.FRAMEBUFFER,Mt);const Et=b.textures[pt],Bt=Et.format,zt=Et.type;if(b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt),!C.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ct=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ct),U.bufferData(U.PIXEL_PACK_BUFFER,mt.byteLength,U.STREAM_READ),U.readPixels(N,X,V,H,ht.convert(Bt),ht.convert(zt),0);const te=q!==null?G.get(q).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,te);const de=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ff(U,de,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ct),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,mt),U.deleteBuffer(Ct),U.deleteSync(de),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,N=null,X=0){const V=Math.pow(2,-X),H=Math.floor(b.image.width*V),mt=Math.floor(b.image.height*V),_t=N!==null?N.x:0,pt=N!==null?N.y:0;$.setTexture2D(b,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,_t,pt,H,mt),x.unbindTexture()},this.copyTextureToTexture=function(b,N,X=null,V=null,H=0,mt=0){let _t,pt,Mt,Et,Bt,zt,Ct,te,de;const fe=b.isCompressedTexture?b.mipmaps[mt]:b.image;if(X!==null)_t=X.max.x-X.min.x,pt=X.max.y-X.min.y,Mt=X.isBox3?X.max.z-X.min.z:1,Et=X.min.x,Bt=X.min.y,zt=X.isBox3?X.min.z:0;else{const pe=Math.pow(2,-H);_t=Math.floor(fe.width*pe),pt=Math.floor(fe.height*pe),b.isDataArrayTexture?Mt=fe.depth:b.isData3DTexture?Mt=Math.floor(fe.depth*pe):Mt=1,Et=0,Bt=0,zt=0}V!==null?(Ct=V.x,te=V.y,de=V.z):(Ct=0,te=0,de=0);const ne=ht.convert(N.format),Le=ht.convert(N.type);let vt;N.isData3DTexture?($.setTexture3D(N,0),vt=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?($.setTexture2DArray(N,0),vt=U.TEXTURE_2D_ARRAY):($.setTexture2D(N,0),vt=U.TEXTURE_2D),x.activeTexture(U.TEXTURE0),x.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),x.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),x.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const Ge=x.getParameter(U.UNPACK_ROW_LENGTH),Kt=x.getParameter(U.UNPACK_IMAGE_HEIGHT),Ye=x.getParameter(U.UNPACK_SKIP_PIXELS),gn=x.getParameter(U.UNPACK_SKIP_ROWS),Hn=x.getParameter(U.UNPACK_SKIP_IMAGES);x.pixelStorei(U.UNPACK_ROW_LENGTH,fe.width),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,fe.height),x.pixelStorei(U.UNPACK_SKIP_PIXELS,Et),x.pixelStorei(U.UNPACK_SKIP_ROWS,Bt),x.pixelStorei(U.UNPACK_SKIP_IMAGES,zt);const Ri=b.isDataArrayTexture||b.isData3DTexture,ie=N.isDataArrayTexture||N.isData3DTexture;if(b.isDepthTexture){const pe=G.get(b),Gn=G.get(N),ae=G.get(pe.__renderTarget),Wn=G.get(Gn.__renderTarget);x.bindFramebuffer(U.READ_FRAMEBUFFER,ae.__webglFramebuffer),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,Wn.__webglFramebuffer);for(let Pi=0;Pi<Mt;Pi++)Ri&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(b).__webglTexture,H,zt+Pi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,G.get(N).__webglTexture,mt,de+Pi)),U.blitFramebuffer(Et,Bt,_t,pt,Ct,te,_t,pt,U.DEPTH_BUFFER_BIT,U.NEAREST);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||b.isRenderTargetTexture||G.has(b)){const pe=G.get(b),Gn=G.get(N);x.bindFramebuffer(U.READ_FRAMEBUFFER,z),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,F);for(let ae=0;ae<Mt;ae++)Ri?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,pe.__webglTexture,H,zt+ae):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pe.__webglTexture,H),ie?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Gn.__webglTexture,mt,de+ae):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Gn.__webglTexture,mt),H!==0?U.blitFramebuffer(Et,Bt,_t,pt,Ct,te,_t,pt,U.COLOR_BUFFER_BIT,U.NEAREST):ie?U.copyTexSubImage3D(vt,mt,Ct,te,de+ae,Et,Bt,_t,pt):U.copyTexSubImage2D(vt,mt,Ct,te,Et,Bt,_t,pt);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ie?b.isDataTexture||b.isData3DTexture?U.texSubImage3D(vt,mt,Ct,te,de,_t,pt,Mt,ne,Le,fe.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(vt,mt,Ct,te,de,_t,pt,Mt,ne,fe.data):U.texSubImage3D(vt,mt,Ct,te,de,_t,pt,Mt,ne,Le,fe):b.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,mt,Ct,te,_t,pt,ne,Le,fe.data):b.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,mt,Ct,te,fe.width,fe.height,ne,fe.data):U.texSubImage2D(U.TEXTURE_2D,mt,Ct,te,_t,pt,ne,Le,fe);x.pixelStorei(U.UNPACK_ROW_LENGTH,Ge),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Kt),x.pixelStorei(U.UNPACK_SKIP_PIXELS,Ye),x.pixelStorei(U.UNPACK_SKIP_ROWS,gn),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Hn),mt===0&&N.generateMipmaps&&U.generateMipmap(vt),x.unbindTexture()},this.initRenderTarget=function(b){G.get(b).__webglFramebuffer===void 0&&$.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?$.setTextureCube(b,0):b.isData3DTexture?$.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?$.setTexture2DArray(b,0):$.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){k=0,O=0,q=null,x.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}function Gt(i,t){return i<t?`${i}_${t}`:`${t}_${i}`}class rs{positions;faceOffsets;faceCorners;uvSets;crease;cornerSharp;polygroup;materialId;vertexColor;constructor(t,e,n,s={}){this.positions=t,this.faceOffsets=e,this.faceCorners=n;const r=Math.max(0,e.length-1);this.uvSets=s.uvSets??new Map,this.crease=s.crease??new Map,this.cornerSharp=s.cornerSharp??new Map,this.polygroup=s.polygroup??new Uint16Array(r),this.materialId=s.materialId??new Uint16Array(r),this.vertexColor=s.vertexColor??null}static empty(){return new rs(new Float32Array(0),new Uint32Array([0]),new Uint32Array(0))}get vertexCount(){return this.positions.length/3}get faceCount(){return Math.max(0,this.faceOffsets.length-1)}get cornerCount(){return this.faceCorners.length}faceSize(t){return this.faceOffsets[t+1]-this.faceOffsets[t]}faceVerts(t){const e=[];for(let n=this.faceOffsets[t];n<this.faceOffsets[t+1];n++)e.push(this.faceCorners[n]);return e}cornerIndex(t,e){return this.faceOffsets[t]+e}getPosition(t,e=[0,0,0]){return e[0]=this.positions[t*3],e[1]=this.positions[t*3+1],e[2]=this.positions[t*3+2],e}setPosition(t,e,n,s){this.positions[t*3]=e,this.positions[t*3+1]=n,this.positions[t*3+2]=s}getCrease(t,e){return this.crease.get(Gt(t,e))??0}setCrease(t,e,n){const s=Gt(t,e);n<=0?this.crease.delete(s):this.crease.set(s,Math.min(10,n))}edges(){const t=new Set,e=[];for(let n=0;n<this.faceCount;n++){const s=this.faceOffsets[n],r=this.faceOffsets[n+1]-s;for(let a=0;a<r;a++){const o=this.faceCorners[s+a],l=this.faceCorners[s+(a+1)%r],c=Gt(o,l);t.has(c)||(t.add(c),e.push([Math.min(o,l),Math.max(o,l)]))}}return e}edgeFaceMap(){const t=new Map;for(let e=0;e<this.faceCount;e++){const n=this.faceOffsets[e],s=this.faceOffsets[e+1]-n;for(let r=0;r<s;r++){const a=Gt(this.faceCorners[n+r],this.faceCorners[n+(r+1)%s]),o=t.get(a);o?o.push(e):t.set(a,[e])}}return t}vertexFaces(){const t=new Map;for(let e=0;e<this.faceCount;e++)for(let n=this.faceOffsets[e];n<this.faceOffsets[e+1];n++){const s=this.faceCorners[n],r=t.get(s);r?r.push(e):t.set(s,[e])}return t}vertexNeighbors(){const t=new Map,e=(n,s)=>{const r=t.get(n);r?r.includes(s)||r.push(s):t.set(n,[s])};for(const[n,s]of this.edges())e(n,s),e(s,n);return t}triangulate(){let t=0;for(let r=0;r<this.faceCount;r++)t+=Math.max(0,this.faceSize(r)-2);const e=new Uint32Array(t*3),n=new Uint32Array(t);let s=0;for(let r=0;r<this.faceCount;r++){const a=this.faceOffsets[r],o=this.faceOffsets[r+1]-a;for(let l=1;l<o-1;l++)e[s*3]=this.faceCorners[a],e[s*3+1]=this.faceCorners[a+l],e[s*3+2]=this.faceCorners[a+l+1],n[s]=r,s++}return{tri:e,triToFace:n}}faceCenter(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,a=0;for(let o=0;o<n;o++){const l=this.faceCorners[e+o];s+=this.positions[l*3],r+=this.positions[l*3+1],a+=this.positions[l*3+2]}return[s/n,r/n,a/n]}faceNormal(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,a=0;for(let l=0;l<n;l++){const c=this.faceCorners[e+l],h=this.faceCorners[e+(l+1)%n],u=this.positions[c*3],f=this.positions[c*3+1],d=this.positions[c*3+2],g=this.positions[h*3],v=this.positions[h*3+1],m=this.positions[h*3+2];s+=(f-v)*(d+m),r+=(d-m)*(u+g),a+=(u-g)*(f+v)}const o=Math.hypot(s,r,a)||1;return[s/o,r/o,a/o]}faceNormals(){const t=new Float32Array(this.faceCount*3);for(let e=0;e<this.faceCount;e++){const n=this.faceNormal(e);t[e*3]=n[0],t[e*3+1]=n[1],t[e*3+2]=n[2]}return t}vertexNormals(){const t=this.faceNormals(),e=new Float32Array(this.vertexCount*3);for(let n=0;n<this.faceCount;n++)for(let s=this.faceOffsets[n];s<this.faceOffsets[n+1];s++){const r=this.faceCorners[s];e[r*3]+=t[n*3],e[r*3+1]+=t[n*3+1],e[r*3+2]+=t[n*3+2]}for(let n=0;n<this.vertexCount;n++){const s=Math.hypot(e[n*3],e[n*3+1],e[n*3+2])||1;e[n*3]/=s,e[n*3+1]/=s,e[n*3+2]/=s}return e}boundsCenter(){if(this.vertexCount===0)return[0,0,0];const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let n=0;n<this.positions.length;n+=3)for(let s=0;s<3;s++){const r=this.positions[n+s];r<t[s]&&(t[s]=r),r>e[s]&&(e[s]=r)}return[(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2]}stats(){let t=0;for(let e=0;e<this.faceCount;e++)t+=Math.max(0,this.faceSize(e)-2);return{vertices:this.vertexCount,edges:this.edges().length,faces:this.faceCount,triangles:t,corners:this.cornerCount}}clone(){const t=new Map;for(const[e,n]of this.uvSets)t.set(e,n.slice());return new rs(this.positions.slice(),this.faceOffsets.slice(),this.faceCorners.slice(),{uvSets:t,crease:new Map(this.crease),cornerSharp:new Map(this.cornerSharp),polygroup:this.polygroup.slice(),materialId:this.materialId.slice(),vertexColor:this.vertexColor?this.vertexColor.slice():null})}}class xe{pos=[];offsets=[0];corners=[];uv=new Map;groups=[];materials=[];weldMap;crease=new Map;cornerSharp=new Map;constructor(t={}){this.weldMap=t.weld===!1?null:new Map}vertex(t,e,n){if(this.weldMap){const r=`${t.toFixed(5)},${e.toFixed(5)},${n.toFixed(5)}`,a=this.weldMap.get(r);if(a!==void 0)return a;const o=this.pos.length/3;return this.pos.push(t,e,n),this.weldMap.set(r,o),o}const s=this.pos.length/3;return this.pos.push(t,e,n),s}get vertexCount(){return this.pos.length/3}positionAt(t){return[this.pos[t*3],this.pos[t*3+1],this.pos[t*3+2]]}get faceCount(){return this.offsets.length-1}face(t,e={}){const n=[],s=[];for(let r=0;r<t.length;r++){const a=t[r];n.length&&n[n.length-1]===a||n.includes(a)||(n.push(a),s.push(r))}if(n.length>=2&&n[0]===n[n.length-1]&&(n.pop(),s.pop()),n.length<3)return-1;for(const r of n)this.corners.push(r);if(this.offsets.push(this.corners.length),this.groups.push(e.polygroup??0),this.materials.push(e.materialId??0),e.uv)for(const[r,a]of e.uv){let o=this.uv.get(r);o||(o=new Array((this.corners.length-n.length)*2).fill(0),this.uv.set(r,o));for(const l of s){const c=a[l]??[0,0];o.push(c[0],c[1])}}for(const[r,a]of this.uv){const o=this.corners.length*2;for(;a.length<o;)a.push(0)}return this.faceCount-1}build(){const t=new Map;for(const[e,n]of this.uv){const s=new Float32Array(this.corners.length*2);s.set(n.slice(0,s.length)),t.set(e,s)}return new rs(new Float32Array(this.pos),new Uint32Array(this.offsets),new Uint32Array(this.corners),{uvSets:t,crease:this.crease,cornerSharp:this.cornerSharp,polygroup:new Uint16Array(this.groups),materialId:new Uint16Array(this.materials)})}}function Vn(i,t){if(i.uvSets.size===0)return null;const e=new Map,n=i.faceOffsets[t],s=i.faceOffsets[t+1]-n;for(const[r,a]of i.uvSets){const o=[];for(let l=0;l<s;l++)o.push([a[(n+l)*2],a[(n+l)*2+1]]);e.set(r,o)}return e}function _x(i){return Array.from(i.uvSets.keys())}function xx(i,t,e,n){if(!i)return null;const s=new Map;for(const[r,a]of i){const o=a[t]??[0,0],l=a[e]??[0,0];s.set(r,[o[0]+(l[0]-o[0])*n,o[1]+(l[1]-o[1])*n])}return s}function Xi(i,t,e,n,s=(a,o)=>[a,o],r=!1){for(let a=0;a<t;a++)for(let o=0;o<e;o++){const l=r?[[a,o],[a,o+1],[a+1,o+1],[a+1,o]]:[[a,o],[a+1,o],[a+1,o+1],[a,o+1]],c=[],h=[];for(const[u,f]of l){const d=u/t,g=f/e,v=n(d,g);c.push(i.vertex(v[0],v[1],v[2])),h.push(s(d,g))}i.face(c,{uv:new Map([["map1",h]])})}}function lr(i,t,e,n,s,r){if(!(s<=0))for(let a=0;a<s;a++)for(let o=0;o<n;o++){const l=[[o,a],[o+1,a],[o+1,a+1],[o,a+1]],c=[],h=[];for(const[u,f]of l){const d=u/n*Math.PI*2,g=t*(1-f/s);c.push(i.vertex(g*Math.cos(d),e,g*Math.sin(d))),h.push([.5+Math.cos(d)*g/(t*2),.5+Math.sin(d)*g/(t*2)])}r>0&&(c.reverse(),h.reverse()),i.face(c,{uv:new Map([["map1",h]])})}}const as={cube:{id:"cube",label:"キューブ",en:"Cube",params:[{key:"width",label:"幅",value:1,min:.05,max:6,step:.05},{key:"height",label:"高さ",value:1,min:.05,max:6,step:.05},{key:"depth",label:"奥行き",value:1,min:.05,max:6,step:.05},{key:"sdW",label:"分割数 幅",value:1,min:1,max:12,step:1},{key:"sdH",label:"分割数 高さ",value:1,min:1,max:12,step:1},{key:"sdD",label:"分割数 奥行き",value:1,min:1,max:12,step:1}],build(i){const t=new xe,e=i.width/2,n=i.height/2,s=i.depth/2,r=(a,o,l,c,h)=>Xi(t,c,h,(u,f)=>[a[0]+o[0]*u+l[0]*f,a[1]+o[1]*u+l[1]*f,a[2]+o[2]*u+l[2]*f]);return r([-e,-n,s],[i.width,0,0],[0,i.height,0],i.sdW,i.sdH),r([e,-n,-s],[-i.width,0,0],[0,i.height,0],i.sdW,i.sdH),r([e,-n,s],[0,0,-i.depth],[0,i.height,0],i.sdD,i.sdH),r([-e,-n,-s],[0,0,i.depth],[0,i.height,0],i.sdD,i.sdH),r([-e,n,s],[i.width,0,0],[0,0,-i.depth],i.sdW,i.sdD),r([-e,-n,-s],[i.width,0,0],[0,0,i.depth],i.sdW,i.sdD),t.build()}},sphere:{id:"sphere",label:"スフィア",en:"Sphere",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sdAxis",label:"分割数 軸",value:20,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:12,min:2,max:64,step:1}],build(i){const t=new xe;return Xi(t,i.sdAxis,i.sdHeight,(e,n)=>{const s=e*Math.PI*2,r=n*Math.PI;return[i.radius*Math.sin(r)*Math.cos(s),i.radius*Math.cos(r),i.radius*Math.sin(r)*Math.sin(s)]},(e,n)=>[e,1-n]),t.build()}},cylinder:{id:"cylinder",label:"シリンダー",en:"Cylinder",params:[{key:"radius",label:"半径",value:.6,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCaps",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new xe,e=i.height/2;return Xi(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*Math.cos(r),-e+s*i.height,i.radius*Math.sin(r)]},(n,s)=>[n,s],!0),lr(t,i.radius,e,i.sdAxis,i.sdCaps,1),lr(t,i.radius,-e,i.sdAxis,i.sdCaps,-1),t.build()}},cone:{id:"cone",label:"コーン",en:"Cone",params:[{key:"radius",label:"半径",value:.7,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCap",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new xe,e=i.height/2;return Xi(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*(1-s)*Math.cos(r),-e+s*i.height,i.radius*(1-s)*Math.sin(r)]},(n,s)=>[n,s],!0),lr(t,i.radius,-e,i.sdAxis,i.sdCap,-1),t.build()}},torus:{id:"torus",label:"トーラス",en:"Torus",params:[{key:"radius",label:"半径",value:1,min:.1,max:4,step:.05},{key:"section",label:"断面半径",value:.32,min:.02,max:2,step:.02},{key:"twist",label:"ツイスト",value:0,min:0,max:360,step:5},{key:"sdAxis",label:"分割数 軸",value:24,min:3,max:80,step:1},{key:"sdHeight",label:"分割数 断面",value:12,min:3,max:48,step:1}],build(i){const t=new xe,e=i.twist*Math.PI/180;return Xi(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2,a=s*Math.PI*2+e*n,o=i.radius+i.section*Math.cos(a);return[o*Math.cos(r),i.section*Math.sin(a),o*Math.sin(r)]},(n,s)=>[n,s],!0),t.build()}},plane:{id:"plane",label:"プレーン",en:"Plane",params:[{key:"width",label:"幅",value:2,min:.05,max:10,step:.05},{key:"height",label:"奥行き",value:2,min:.05,max:10,step:.05},{key:"sdW",label:"分割数 幅",value:4,min:1,max:40,step:1},{key:"sdH",label:"分割数 奥行き",value:4,min:1,max:40,step:1}],build(i){const t=new xe;return Xi(t,i.sdW,i.sdH,(e,n)=>[-i.width/2+e*i.width,0,-i.height/2+n*i.height],(e,n)=>[e,n],!0),t.build()}},disk:{id:"disk",label:"ディスク",en:"Disk",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sides",label:"サイド数",value:16,min:3,max:64,step:1},{key:"sdCaps",label:"分割数",value:1,min:1,max:10,step:1}],build(i){const t=new xe;return lr(t,i.radius,0,i.sides,i.sdCaps,1),t.build()}},platonic:{id:"platonic",label:"正多面体",en:"Platonic",params:[{key:"kind",label:"種類",value:4,min:0,max:4,step:1,choices:["正四面体","正六面体","正八面体","正十二面体","正二十面体"]},{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05}],build(i){const t=(1+Math.sqrt(5))/2,e=1/t,n=Math.round(i.kind);let s,r;n===0?(s=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]],r=[[0,1,2],[0,3,1],[0,2,3],[1,3,2]]):n===1?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]],r=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]]):n===2?(s=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],r=[[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]]):n===3?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],[0,e,t],[0,e,-t],[0,-e,t],[0,-e,-t],[e,t,0],[e,-t,0],[-e,t,0],[-e,-t,0],[t,0,e],[t,0,-e],[-t,0,e],[-t,0,-e]],r=[[0,8,10,2,16],[0,16,17,1,12],[0,12,14,4,8],[8,4,18,6,10],[10,6,15,13,2],[2,13,3,17,16],[17,3,11,9,1],[1,9,5,14,12],[14,5,19,18,4],[18,19,7,15,6],[15,7,11,3,13],[9,11,7,19,5]]):(s=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]],r=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]);const a=new xe({weld:!1});for(const h of s){const u=Math.hypot(h[0],h[1],h[2]);a.vertex(h[0]/u*i.radius,h[1]/u*i.radius,h[2]/u*i.radius)}for(const h of r)a.face(h);const o=a.build(),l=[];for(let h=0;h<o.faceCount;h++){const u=o.faceCenter(h),f=o.faceNormal(h),d=o.faceVerts(h);l.push(u[0]*f[0]+u[1]*f[1]+u[2]*f[2]<0?d.reverse():d)}const c=new xe({weld:!1});for(let h=0;h<o.vertexCount;h++){const u=o.getPosition(h);c.vertex(u[0],u[1],u[2])}for(const h of l)c.face(h);return c.build()}}},K0=["cube","sphere","cylinder","cone","torus","plane","disk","platonic"];function Z0(i){const t=as[i],e={};if(!t)return e;for(const n of t.params)e[n.key]=n.value;return e}function tu(i,t,e,n){const s=i.edgeFaceMap(),r=[],a=new Set,o=(l,c,h,u,f)=>{for(let d=0;d<1e5;d++){const v=(s.get(Gt(l,c))??[]).find(_=>_!==u);if(v===void 0||a.has(v))return;const m=i.faceVerts(v);if(m.length!==4)return;a.add(v);let p=-1,S=l,E=c,M=h;for(let _=0;_<4;_++)if(m[_]===l&&m[(_+1)%4]===c){p=_;break}if(p<0){for(let _=0;_<4;_++)if(m[_]===c&&m[(_+1)%4]===l){p=_,S=c,E=l,M=1-h;break}}if(p<0)return;const w=(p+2)%4,y=(p+3)%4,A={face:v,a:S,b:E,t:M,c:m[w],d:m[y],ia:p,ib:(p+1)%4,ic:w,id:y};f?r.push(A):r.unshift(A),u=v,l=A.d,c=A.c,h=M}};return o(t,e,n,-1,!0),o(e,t,1-n,r.length?r[0].face:-1,!1),r}function Do(i,t,e,n,s,r){const a=i.getPosition(t),o=i.getPosition(e);if(!s||!r)return[a[0]+(o[0]-a[0])*n,a[1]+(o[1]-a[1])*n,a[2]+(o[2]-a[2])*n];const l=[r[t*3],r[t*3+1],r[t*3+2]],c=[r[e*3],r[e*3+1],r[e*3+2]],h=[o[0]-a[0],o[1]-a[1],o[2]-a[2]],u=h[0]*l[0]+h[1]*l[1]+h[2]*l[2],f=-(h[0]*c[0]+h[1]*c[1]+h[2]*c[2]),d=[0,0,0],g=1-n;for(let v=0;v<3;v++){const m=(2*a[v]+o[v]-u*l[v])/3,p=(2*o[v]+a[v]-f*c[v])/3;d[v]=g*g*g*a[v]+3*g*g*n*m+3*g*n*n*p+n*n*n*o[v]}return d}function J0(i,t,e,n,s){const r=tu(i,t,e,n);if(!r.length)return null;const a=s?i.vertexNormals():null,o=[Do(i,r[0].a,r[0].b,r[0].t,s,a)];for(const l of r)o.push(Do(i,l.d,l.c,l.t,s,a));return{points:o,faceCount:r.length}}function j0(i,t,e,n,s=!1){const r=tu(i,t,e,n);if(!r.length)return null;const a=s?i.vertexNormals():null,o=new Map;for(const f of r)o.set(f.face,f);const l=new xe({weld:!1});for(let f=0;f<i.vertexCount;f++){const d=i.getPosition(f);l.vertex(d[0],d[1],d[2])}const c=new Map,h=(f,d,g)=>{const v=Math.min(f,d),m=Math.max(f,d),p=`${v}_${m}`,S=c.get(p);if(S!==void 0)return S;const E=Do(i,f,d,g,s,a),M=l.vertex(E[0],E[1],E[2]);return c.set(p,M),M};for(let f=0;f<i.faceCount;f++){const d=o.get(f),g=Vn(i,f),v=i.polygroup[f],m=i.materialId[f];if(!d){l.face(i.faceVerts(f),{uv:g??void 0,polygroup:v,materialId:m});continue}const p=h(d.a,d.b,d.t),S=h(d.d,d.c,d.t),E=M=>{if(!g)return;const w=new Map;for(const[y,A]of g)w.set(y,M.map(_=>{if(typeof _=="number")return A[_]??[0,0];const[T,P]=_,R=A[T]??[0,0],L=A[P]??[0,0];return[R[0]+(L[0]-R[0])*d.t,R[1]+(L[1]-R[1])*d.t]}));return w};l.face([d.a,p,S,d.d],{uv:E([d.ia,[d.ia,d.ib],[d.id,d.ic],d.id]),polygroup:v,materialId:m}),l.face([p,d.b,d.c,S],{uv:E([[d.ia,d.ib],d.ib,d.ic,[d.id,d.ic]]),polygroup:v,materialId:m})}const u=l.build();for(const[f,d]of i.crease){const[g,v]=f.split("_").map(Number);c.has(`${Math.min(g,v)}_${Math.max(g,v)}`)||u.setCrease(g,v,d)}for(const[f,d]of i.cornerSharp)u.cornerSharp.set(f,d);return{mesh:u,faceCount:r.length}}function Pc(i,t,e){const n=Array.from(new Set(t));if(!n.length)return null;const s=new Set(n);let r=0,a=0,o=0;for(const v of n){const m=i.faceNormal(v);r+=m[0],a+=m[1],o+=m[2]}const l=Math.hypot(r,a,o)||1;r/=l,a/=l,o/=l;const c=new xe({weld:!1});for(let v=0;v<i.vertexCount;v++){const m=i.getPosition(v);c.vertex(m[0],m[1],m[2])}const h=new Set;for(const v of n)for(const m of i.faceVerts(v))h.add(m);const u=new Map;for(const v of h){const m=i.getPosition(v);u.set(v,c.vertex(m[0]+r*e,m[1]+a*e,m[2]+o*e))}const f=new Map;for(const v of n){const m=i.faceVerts(v);for(let p=0;p<m.length;p++){const S=Gt(m[p],m[(p+1)%m.length]);f.set(S,(f.get(S)??0)+1)}}const d=[];for(let v=0;v<i.faceCount;v++){const m=Vn(i,v),p=i.polygroup[v],S=i.materialId[v],E=i.faceVerts(v);if(!s.has(v)){c.face(E,{uv:m??void 0,polygroup:p,materialId:S});continue}c.face(E.map(M=>u.get(M)),{uv:m??void 0,polygroup:p,materialId:S});for(let M=0;M<E.length;M++){const w=E[M],y=E[(M+1)%E.length];if(f.get(Gt(w,y))!==1)continue;let A;if(m){A=new Map;for(const[_,T]of m){const P=T[M]??[0,0],R=T[(M+1)%E.length]??[0,0];A.set(_,[P,R,R,P])}}d.push({verts:[w,y,u.get(y),u.get(w)],uv:A,group:p,material:S})}}for(const v of d)c.face(v.verts,{uv:v.uv,polygroup:v.group,materialId:v.material});const g=c.build();for(const[v,m]of i.crease){const[p,S]=v.split("_").map(Number);g.setCrease(p,S,m)}return{mesh:g,faceCount:n.length}}function Lc(i,t,e){if(!t.length)return null;const n=i.edgeFaceMap(),s=i.faceNormals();let r=0,a=0,o=0;for(const[d,g]of t)for(const v of n.get(Gt(d,g))??[])r+=s[v*3],a+=s[v*3+1],o+=s[v*3+2];const l=Math.hypot(r,a,o);l<1e-6?(r=0,a=1,o=0):(r/=l,a/=l,o/=l);const c=new xe({weld:!1});for(let d=0;d<i.vertexCount;d++){const g=i.getPosition(d);c.vertex(g[0],g[1],g[2])}const h=new Set;for(const[d,g]of t)h.add(d),h.add(g);const u=new Map;for(const d of h){const g=i.getPosition(d);u.set(d,c.vertex(g[0]+r*e,g[1]+a*e,g[2]+o*e))}for(let d=0;d<i.faceCount;d++)c.face(i.faceVerts(d),{uv:Vn(i,d)??void 0,polygroup:i.polygroup[d],materialId:i.materialId[d]});for(const[d,g]of t){const v=n.get(Gt(d,g))??[];let m=!0;if(v.length){const p=i.faceVerts(v[0]);for(let S=0;S<p.length;S++)if(p[S]===d&&p[(S+1)%p.length]===g){m=!1;break}}m?c.face([d,g,u.get(g),u.get(d)]):c.face([g,d,u.get(d),u.get(g)])}const f=c.build();for(const[d,g]of i.crease){const[v,m]=d.split("_").map(Number);f.setCrease(v,m,g)}return{mesh:f,newEdges:t.map(([d,g])=>[u.get(d),u.get(g)]),faceCount:t.length}}function Io(i,t){const e=new Map,n=new Map;t.forEach((o,l)=>{let c=0,h=0,u=0;for(const d of o){const g=i.getPosition(d);c+=g[0],h+=g[1],u+=g[2]}const f=`g${l}`;n.set(f,[c/o.length,h/o.length,u/o.length]);for(const d of o)e.set(d,f)});const s=new xe({weld:!1}),r=new Map,a=o=>{const l=e.get(o)??`v${o}`,c=r.get(l);if(c!==void 0)return c;const h=e.has(o)?n.get(e.get(o)):i.getPosition(o),u=s.vertex(h[0],h[1],h[2]);return r.set(l,u),u};for(let o=0;o<i.faceCount;o++)s.face(i.faceVerts(o).map(a),{uv:Vn(i,o)??void 0,polygroup:i.polygroup[o],materialId:i.materialId[o]});return s.build()}function Q0(i,t,e,n){let s=-1,r=-1,a=-1;for(let u=0;u<i.length;u++){const f=i[u],d=i[(u+1)%i.length];if(f===e&&d===n||f===n&&d===e){s=u,r=f,a=d;break}}if(s<0)return null;const o=[];for(let u=0;u<i.length;u++)o.push(i[(s+1+u)%i.length]);let l=t,c=-1;for(let u=0;u<t.length;u++)if(t[u]===a&&t[(u+1)%t.length]===r){c=u;break}if(c<0){const u=[...t].reverse();for(let f=0;f<u.length;f++)if(u[f]===a&&u[(f+1)%u.length]===r){c=f,l=u;break}if(c<0)return null}const h=[];for(let u=0;u<l.length;u++)h.push(l[(c+1+u)%l.length]);return[...o,...h.slice(1,h.length-1)]}function tv(i,t){let e=[];for(let o=0;o<i.faceCount;o++)e.push(i.faceVerts(o));const n=Array.from(i.polygroup),s=Array.from(i.materialId);let r=0;for(const[o,l]of t){const c=new Map;e.forEach((f,d)=>{for(let g=0;g<f.length;g++){const v=Gt(f[g],f[(g+1)%f.length]),m=c.get(v);m?m.push(d):c.set(v,[d])}});const h=c.get(Gt(o,l))??[];if(h.length!==2)continue;const u=Q0(e[h[0]],e[h[1]],o,l);!u||u.length<3||(e[h[0]]=u,e.splice(h[1],1),n.splice(h[1],1),s.splice(h[1],1),r++)}if(!r)return null;const a=new xe({weld:!1});for(let o=0;o<i.vertexCount;o++){const l=i.getPosition(o);a.vertex(l[0],l[1],l[2])}return e.forEach((o,l)=>{a.face(o,{polygroup:n[l]??0,materialId:s[l]??0})}),{mesh:a.build(),merged:r}}function ev(i,t){const e=new Set(t);if(!e.size)return null;const n=new xe({weld:!1});for(let a=0;a<i.vertexCount;a++){const o=i.getPosition(a);n.vertex(o[0],o[1],o[2])}let s=0;for(let a=0;a<i.faceCount;a++){if(e.has(a)){s++;continue}n.face(i.faceVerts(a),{uv:Vn(i,a)??void 0,polygroup:i.polygroup[a],materialId:i.materialId[a]})}if(!s)return null;const r=n.build();for(const[a,o]of i.crease){const[l,c]=a.split("_").map(Number);r.setCrease(l,c,o)}return{mesh:r,removed:s}}function nv(i,t){const e=[];for(const n of t)n<i.faceCount&&e.push(i.faceVerts(n));return e.length?Io(i,e):null}function cr(i){const t=new Set;for(let r=0;r<i.faceCorners.length;r++)t.add(i.faceCorners[r]);if(t.size===i.vertexCount)return i;const e=new xe({weld:!1}),n=new Map;for(let r=0;r<i.vertexCount;r++){if(!t.has(r))continue;const a=i.getPosition(r);n.set(r,e.vertex(a[0],a[1],a[2]))}for(let r=0;r<i.faceCount;r++)e.face(i.faceVerts(r).map(a=>n.get(a)),{uv:Vn(i,r)??void 0,polygroup:i.polygroup[r],materialId:i.materialId[r]});const s=e.build();for(const[r,a]of i.crease){const[o,l]=r.split("_").map(Number),c=n.get(o),h=n.get(l);c!==void 0&&h!==void 0&&s.setCrease(c,h,a)}return s}function Yi(i,t){return[i[0]-t[0],i[1]-t[1],i[2]-t[2]]}function Dc(i){const t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]}function iv(i,t){return[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]]}function sv(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function rv(i,t,e,n=1){const s=Math.max(1,Math.round(n));if(!(e>0))return null;const r=new Set;for(const[S,E]of t)S!==E&&r.add(Gt(S,E));if(!r.size)return null;const a=i.edgeFaceMap(),o=new Set;for(const S of r){const E=a.get(S);if(!E||E.length!==2)return null;for(const y of E)if(i.faceSize(y)!==4)return null;const[M,w]=S.split("_").map(Number);o.add(M),o.add(w)}const l=new xe({weld:!0}),c=[];for(let S=0;S<i.vertexCount;S++){const E=i.getPosition(S);c.push(l.vertex(E[0],E[1],E[2]))}const h=new Map,u=(S,E,M)=>`${S}|${E}|${M}`,f=new Map,d=S=>i.getPosition(S);for(let S=0;S<i.faceCount;S++){const E=i.faceVerts(S),M=[];for(let w=0;w<E.length;w++){const y=E[w],A=E[(w-1+E.length)%E.length],_=E[(w+1)%E.length],T=(w-1+E.length)%E.length,P=(w+1)%E.length;if(!o.has(y)){const Q={index:c[y],uv:{base:w,toward:[]}};M.push(Q);continue}const R=d(y),L=Dc(Yi(d(A),R)),W=Dc(Yi(d(_),R)),z=Math.hypot(...Yi(d(A),R))||1,F=Math.hypot(...Yi(d(_),R))||1,k=Math.min(e,z*.49),O=Math.min(e,F*.49),q=r.has(Gt(A,y)),j=r.has(Gt(y,_)),nt=(Q,st)=>({index:l.vertex(R[0]+Q[0],R[1]+Q[1],R[2]+Q[2]),uv:st});if(q&&j){const Q=nt([L[0]*k+W[0]*O,L[1]*k+W[1]*O,L[2]*k+W[2]*O],{base:w,toward:[{corner:T,t:k/z},{corner:P,t:O/F}]});M.push({index:Q.index,uv:Q.uv}),h.set(u(S,y,A),Q),h.set(u(S,y,_),Q)}else if(q){const Q=nt([W[0]*O,W[1]*O,W[2]*O],{base:w,toward:[{corner:P,t:O/F}]});M.push({index:Q.index,uv:Q.uv}),h.set(u(S,y,A),Q),h.set(u(S,y,_),Q)}else if(j){const Q=nt([L[0]*k,L[1]*k,L[2]*k],{base:w,toward:[{corner:T,t:k/z}]});M.push({index:Q.index,uv:Q.uv}),h.set(u(S,y,A),Q),h.set(u(S,y,_),Q)}else{const Q=nt([L[0]*k,L[1]*k,L[2]*k],{base:w,toward:[{corner:T,t:k/z}]}),st=nt([W[0]*O,W[1]*O,W[2]*O],{base:w,toward:[{corner:P,t:O/F}]});M.push({index:Q.index,uv:Q.uv},{index:st.index,uv:st.uv}),h.set(u(S,y,A),Q),h.set(u(S,y,_),st)}}f.set(S,M)}for(let S=0;S<i.faceCount;S++){const E=f.get(S),M=Vn(i,S);l.face(E.map(w=>w.index),{uv:M?av(M,E.map(w=>w.uv)):void 0,polygroup:i.polygroup[S],materialId:i.materialId[S]})}let g=0;const v=new Map,m=(S,E)=>`${S}|${E}`;for(const S of r){const[E,M]=S.split("_").map(Number),[w,y]=a.get(S);for(const z of[E,M]){const F=z===E?M:E,k=h.get(u(w,z,F)),O=h.get(u(y,z,F));if(!k||!O)return null;const q=[],j=d(z),nt=bs(l,k.index),Q=bs(l,O.index);for(let st=0;st<=s;st++){const wt=st/s;if(st===0)q.push(k.index);else if(st===s)q.push(O.index);else{const Ut=1-wt,Tt=Ut*Ut*nt[0]+2*wt*Ut*j[0]+wt*wt*Q[0],Y=Ut*Ut*nt[1]+2*wt*Ut*j[1]+wt*wt*Q[1],it=Ut*Ut*nt[2]+2*wt*Ut*j[2]+wt*wt*Q[2];q.push(l.vertex(Tt,Y,it))}}v.set(m(S,z),q)}const A=v.get(m(S,E)),_=v.get(m(S,M)),T=i.polygroup[w]??0,P=i.materialId[w]??0,R=i.faceVerts(w),L=R.indexOf(E),W=L>=0&&R[(L+1)%R.length]===M;for(let z=0;z<s;z++){const F=W?[_[z],A[z],A[z+1],_[z+1]]:[A[z],_[z],_[z+1],A[z+1]];l.face(F,{polygroup:T,materialId:P})>=0&&g++}}for(const S of o){const E=ov(i,S,a,r,h,v,u,m);if(E===null)return null;if(E.length<3)continue;const M=lv(l,E,i,S);l.face(M)>=0&&g++}const p=l.build();for(const[S,E]of i.crease){if(r.has(S))continue;const[M,w]=S.split("_").map(Number),y=c[M],A=c[w];y!==void 0&&A!==void 0&&!o.has(M)&&!o.has(w)&&p.setCrease(y,A,E)}return{mesh:p,newFaces:g}}function bs(i,t){const e=i.positionAt(t);return[e[0],e[1],e[2]]}function av(i,t){const e=new Map;for(const[n,s]of i){const r=[];for(const a of t){const o=s[a.base]??[0,0];let l=o[0],c=o[1];for(const h of a.toward){const u=s[h.corner]??o;l+=(u[0]-o[0])*h.t,c+=(u[1]-o[1])*h.t}r.push([l,c])}e.set(n,r)}return e}function ov(i,t,e,n,s,r,a,o){const l=new Map;for(const g of i.vertexFaces().get(t)??[]){const v=i.faceVerts(g),m=v.indexOf(t);if(m<0)return null;l.set(g,[v[(m-1+v.length)%v.length],v[(m+1)%v.length]])}if(!l.size)return null;const c=[...l.keys()][0],h=[];let u=c,f=l.get(c)[0];for(let g=0;g<=l.size;g++){const v=l.get(u);if(!v)return null;const m=v[0]===f?v[1]:v[0];h.push({face:u,from:f,to:m});const p=(e.get(Gt(t,m))??[]).find(S=>S!==u);if(p===void 0)return null;if(p===c&&m===l.get(c)[0])break;if(u=p,f=m,h.length>l.size)return null}if(h.length!==l.size)return null;const d=[];for(const g of h){const v=s.get(a(g.face,t,g.from)),m=s.get(a(g.face,t,g.to));if(!v||!m)return null;Ta(d,v.index),m.index!==v.index&&Ta(d,m.index);const p=Gt(t,g.to);if(n.has(p)){const S=r.get(o(p,t));if(!S)return null;const M=e.get(p)[0]===g.face?S:[...S].reverse();for(const w of M)Ta(d,w)}}return d.length>1&&d[0]===d[d.length-1]&&d.pop(),d}function Ta(i,t){i.length&&i[i.length-1]===t||i.push(t)}function lv(i,t,e,n){const s=e.vertexNormals(),r=[s[n*3],s[n*3+1],s[n*3+2]],a=bs(i,t[0]);let o=0,l=0,c=0;for(let h=1;h+1<t.length;h++){const u=iv(Yi(bs(i,t[h]),a),Yi(bs(i,t[h+1]),a));o+=u[0],l+=u[1],c+=u[2]}return sv([o,l,c],r)<0?[...t].reverse():t}function Aa(i){return i.closed?i.verts.length:i.verts.length-1}function Ca(i,t){return[i.verts[t],i.verts[(t+1)%i.verts.length]]}function cv(i){const t=new Map,e=(o,l)=>{const c=t.get(o);c?c.push(l):t.set(o,[l])},n=new Set;for(const[o,l]of i){if(o===l)continue;const c=Gt(o,l);n.has(c)||(n.add(c),e(o,l),e(l,o))}for(const o of t.values())if(o.length>2)return null;const s=new Set,r=o=>{const l=[o];s.add(o);let c=-1,h=o;for(;;){const u=(t.get(h)??[]).find(f=>f!==c&&!s.has(f));if(u===void 0)return l;l.push(u),s.add(u),c=h,h=u}},a=[];for(const[o,l]of t)l.length===1&&!s.has(o)&&a.push({verts:r(o),closed:!1});for(const o of t.keys()){if(s.has(o))continue;const l=r(o),c=l[l.length-1],h=l.length>2&&(t.get(c)??[]).includes(l[0]);a.push({verts:l,closed:h})}return a}function Ms(i,t,e){const n=i.getPosition(t),s=i.getPosition(e);return Math.hypot(n[0]-s[0],n[1]-s[1],n[2]-s[2])}function hv(i,t,e){let n=0;for(let s=0;s<t.length;s++)n+=Ms(i,t[s],e[s]);return n}function uv(i,t,e){const n=e.verts;if(!e.closed){const a=Ms(i,t.verts[0],n[0])+Ms(i,t.verts[t.verts.length-1],n[n.length-1]);return Ms(i,t.verts[0],n[n.length-1])+Ms(i,t.verts[t.verts.length-1],n[0])<a?[...n].reverse():[...n]}let s=n,r=1/0;for(const a of[n,[...n].reverse()])for(let o=0;o<a.length;o++){const l=a.map((h,u)=>a[(o+u)%a.length]),c=hv(i,t.verts,l);c<r&&(r=c,s=l)}return s}function fv(i,t){const e=cv(t);if(!e||e.length!==2)return null;const[n,s]=e;if(n.closed!==s.closed)return null;const r=Aa(n);if(r<1||r!==Aa(s))return null;const a=i.edgeFaceMap(),o=(d,g)=>{const v=a.get(Gt(d,g))??[];return v.length===1?v[0]:-1};for(const d of[n,s])for(let g=0;g<Aa(d);g++){const[v,m]=Ca(d,g);if(o(v,m)<0)return null}const c={verts:uv(i,n,s),closed:s.closed},h=new xe({weld:!1});for(let d=0;d<i.vertexCount;d++){const g=i.getPosition(d);h.vertex(g[0],g[1],g[2])}for(let d=0;d<i.faceCount;d++)h.face(i.faceVerts(d),{uv:Vn(i,d)??void 0,polygroup:i.polygroup[d],materialId:i.materialId[d]});let u=0;for(let d=0;d<r;d++){const[g,v]=Ca(n,d),[m,p]=Ca(c,d),S=o(g,v);if(S<0)continue;const E=i.faceVerts(S),M=E.indexOf(g),y=M>=0&&E[(M+1)%E.length]===v?[v,g,m,p]:[g,v,p,m];h.face(y,{polygroup:i.polygroup[S],materialId:i.materialId[S]})>=0&&u++}if(!u)return null;const f=h.build();for(const[d,g]of i.crease){const[v,m]=d.split("_").map(Number);f.setCrease(v,m,g)}return{mesh:f,faces:u}}function Ra(i,t,e){const n=i.vertexNeighbors(),s=i.edgeFaceMap(),r=new Set,a=(h,u)=>{const f=n.get(u);if(!f||f.length!==4)return-1;const d=s.get(Gt(h,u))??[];for(const g of f){if(g===h)continue;if(!(s.get(Gt(u,g))??[]).some(m=>d.includes(m)))return g}return-1},o=[],l=(h,u,f,d)=>{let g=!0;for(let v=0;v<1e5;v++){const m=Gt(h,u);if(r.has(m)&&!g)return!0;g&&d||(r.add(m),f?o.push([h,u]):o.unshift([u,h])),g=!1;const p=a(h,u);if(p<0)return!1;h=u,u=p}return!1},c=l(t,e,!0,!1);return c||l(e,t,!1,!0),{edges:o,closed:c}}function dv(i,t,e){const n=i.edgeFaceMap(),s=new Set,r=[],a=[],o=(u,f,d,g)=>{for(let v=0;v<1e5;v++){const p=(n.get(Gt(u,f))??[]).find(y=>y!==d);if(p===void 0)return!1;if(s.has(p))return!0;const S=i.faceVerts(p);if(S.length!==4)return!1;s.add(p);let E=-1;for(let y=0;y<4;y++)if(S[y]===u&&S[(y+1)%4]===f){E=y;break}if(E<0){for(let y=0;y<4;y++)if(S[y]===f&&S[(y+1)%4]===u){E=y;break}}if(E<0)return!1;const M=S[(E+2)%4],w=S[(E+3)%4];g.push([w,M]),d=p,u=w,f=M}return!1},l=n.get(Gt(t,e))??[],c=o(t,e,-1,r);if(!c){const u=l.find(f=>s.has(f));o(e,t,u??-1,a)}const h=[...a.reverse(),[t,e],...r];if(c&&h.length>1){const u=h[h.length-1];Gt(u[0],u[1])===Gt(t,e)&&h.pop()}return{edges:h,closed:c}}function Ic(i,t,e){const n=i.edges.map(l=>Gt(l[0],l[1]));let s=n.indexOf(t),r=n.indexOf(e);if(s<0||r<0)return null;s>r&&([s,r]=[r,s]);const a=i.edges.slice(s,r+1);if(!i.closed)return a;const o=[...i.edges.slice(r),...i.edges.slice(0,s+1)];return o.length<a.length?o:a}function eu(i,t){const e=i.edgeFaceMap(),n=new Set([t]),s=[t],r=[];for(;s.length;){const a=s.pop();r.push(a);const o=i.faceVerts(a);for(let l=0;l<o.length;l++){const c=e.get(Gt(o[l],o[(l+1)%o.length]))??[];for(const h of c)n.has(h)||(n.add(h),s.push(h))}}return r}function pv(i,t){const e=new Set;for(const n of eu(i,t))for(const s of i.faceVerts(n))e.add(s);return Array.from(e)}function mv(i){const t=[];for(const[e,n]of i.edges)t.includes(e)||t.push(e),t.includes(n)||t.push(n);return t}function gv(i){const t=[];for(const[e,n]of i.edgeFaceMap())if(n.length===1){const[s,r]=e.split("_").map(Number);t.push([s,r])}return t}function Uc(i,t){const e=i.vertexNeighbors(),n=new Set(t);for(const s of Array.from(n))for(const r of e.get(s)??[])n.add(r);return Array.from(n)}function Nc(i,t){const e=i.vertexNeighbors(),n=new Set(t);return Array.from(n).filter(s=>(e.get(s)??[]).every(r=>n.has(r)))}function vv(i,t){const e=i.edgeFaceMap(),n=new Set(t);for(const s of Array.from(n)){const r=i.faceVerts(s);for(let a=0;a<r.length;a++)for(const o of e.get(Gt(r[a],r[(a+1)%r.length]))??[])n.add(o)}return Array.from(n)}function _v(i,t){const e=i.edgeFaceMap(),n=new Set(t);return Array.from(n).filter(s=>{const r=i.faceVerts(s);for(let a=0;a<r.length;a++)for(const o of e.get(Gt(r[a],r[(a+1)%r.length]))??[])if(!n.has(o))return!1;return!0})}function xv(i){let t=0,e=0;for(const n of i)t+=n[0],e+=n[1];return[t/i.length,e/i.length]}class Mv{vertexCount;faceCount;edgeList;edgeBase;faceBase;outCount;faceVerts=[];vertexFaces=[];neighbors=[];edgeIndex=new Map;edgeFaces=[];edgeSharp;sharpAt=[];constructor(t){this.vertexCount=t.vertexCount,this.faceCount=t.faceCount,this.edgeList=t.edges(),this.edgeBase=this.vertexCount,this.faceBase=this.vertexCount+this.edgeList.length,this.outCount=this.faceBase+this.faceCount;for(let r=0;r<this.faceCount;r++)this.faceVerts.push(t.faceVerts(r));const e=t.vertexFaces(),n=t.vertexNeighbors();for(let r=0;r<this.vertexCount;r++)this.vertexFaces.push(e.get(r)??[]),this.neighbors.push(n.get(r)??[]),this.sharpAt.push([]);const s=t.edgeFaceMap();this.edgeSharp=new Float64Array(this.edgeList.length);for(let r=0;r<this.edgeList.length;r++){const[a,o]=this.edgeList[r],l=Gt(a,o);this.edgeIndex.set(l,r);const c=s.get(l)??[];this.edgeFaces.push(c),this.edgeSharp[r]=Math.min(1,t.getCrease(a,o));const h=c.length===1?1:this.edgeSharp[r];h>0&&(this.sharpAt[a].push({other:o,sharpness:h}),this.sharpAt[o].push({other:a,sharpness:h}))}}edgePointOf(t,e){const n=this.edgeIndex.get(Gt(t,e));return n===void 0?-1:this.edgeBase+n}affected(t){const e=new Set,n=new Set;for(const s of t){if(s<0||s>=this.vertexCount)continue;const r=this.vertexFaces[s];r.length||n.add(s);for(const a of r)e.add(a)}for(const s of e){n.add(this.faceBase+s);const r=this.faceVerts[s];for(let a=0;a<r.length;a++){n.add(r[a]);const o=this.edgeIndex.get(Gt(r[a],r[(a+1)%r.length]));o!==void 0&&n.add(this.edgeBase+o)}}return n}positions(t,e,n){const s=new Float64Array(this.faceCount*3),r=new Uint8Array(this.faceCount),a=u=>{if(!r[u]){const f=t.faceCenter(u);s[u*3]=f[0],s[u*3+1]=f[1],s[u*3+2]=f[2],r[u]=1}return u*3},o=u=>{const f=a(u),d=(this.faceBase+u)*3;e[d]=s[f],e[d+1]=s[f+1],e[d+2]=s[f+2]},l=u=>{const[f,d]=this.edgeList[u],g=t.getPosition(f),v=t.getPosition(d),m=[(g[0]+v[0])/2,(g[1]+v[1])/2,(g[2]+v[2])/2],p=(this.edgeBase+u)*3,S=this.edgeFaces[u];if(S.length!==2){e[p]=m[0],e[p+1]=m[1],e[p+2]=m[2];return}const E=a(S[0]),M=a(S[1]),w=this.edgeSharp[u];for(let y=0;y<3;y++){const A=(g[y]+v[y]+s[E+y]+s[M+y])/4;e[p+y]=A+(m[y]-A)*w}},c=u=>{const f=t.getPosition(u),d=this.vertexFaces[u],g=d.length,v=this.neighbors[u],m=u*3;let p;if(!g||!v.length)p=[f[0],f[1],f[2]];else{let w=0,y=0,A=0;for(const R of d){const L=a(R);w+=s[L],y+=s[L+1],A+=s[L+2]}w/=g,y/=g,A/=g;let _=0,T=0,P=0;for(const R of v){const L=t.getPosition(R);_+=(f[0]+L[0])/2,T+=(f[1]+L[1])/2,P+=(f[2]+L[2])/2}_/=v.length,T/=v.length,P/=v.length,p=[(w+2*_+(g-3)*f[0])/g,(y+2*T+(g-3)*f[1])/g,(A+2*P+(g-3)*f[2])/g]}const S=this.sharpAt[u];if(S.length<2){e[m]=p[0],e[m+1]=p[1],e[m+2]=p[2];return}let E;if(S.length>=3)E=[f[0],f[1],f[2]];else{let w=0,y=0,A=0;for(const _ of S){const T=t.getPosition(_.other);w+=(f[0]+T[0])/2,y+=(f[1]+T[1])/2,A+=(f[2]+T[2])/2}E=[(w+6*f[0])/8,(y+6*f[1])/8,(A+6*f[2])/8]}let M=0;for(const w of S)M+=w.sharpness;M=Math.min(1,M/S.length);for(let w=0;w<3;w++)e[m+w]=p[w]+(E[w]-p[w])*M},h=u=>{u>=this.faceBase?o(u-this.faceBase):u>=this.edgeBase?l(u-this.edgeBase):c(u)};if(n){for(const u of n)u>=0&&u<this.outCount&&h(u);return}for(let u=0;u<this.faceCount;u++)o(u);for(let u=0;u<this.edgeList.length;u++)l(u);for(let u=0;u<this.vertexCount;u++)c(u)}build(t){const e=new Float32Array(this.outCount*3);this.positions(t,e);const n=new xe({weld:!1});for(let r=0;r<this.outCount;r++)n.vertex(e[r*3],e[r*3+1],e[r*3+2]);for(let r=0;r<this.faceCount;r++){const a=this.faceVerts[r],o=Vn(t,r),l=t.polygroup[r],c=t.materialId[r],h=a.length,u=new Map;if(o)for(const[f,d]of o)u.set(f,xv(d));for(let f=0;f<h;f++){const d=a[f],g=a[(f+1)%h],v=a[(f-1+h)%h];let m;if(o){m=new Map;for(const[p,S]of o){const E=S[f]??[0,0],M=S[(f+1)%h]??[0,0],w=S[(f-1+h)%h]??[0,0];m.set(p,[E,[(E[0]+M[0])/2,(E[1]+M[1])/2],u.get(p),[(w[0]+E[0])/2,(w[1]+E[1])/2]])}}n.face([d,this.edgePointOf(d,g),this.faceBase+r,this.edgePointOf(v,d)],{uv:m,polygroup:l,materialId:c})}}const s=n.build();for(const[r,a]of t.crease){const o=a-1;if(o<=0)continue;const[l,c]=r.split("_").map(Number),h=this.edgePointOf(l,c);h<0||(s.setCrease(l,h,o),s.setCrease(h,c,o))}for(const[r,a]of t.cornerSharp){const o=a-1;o>0&&s.cornerSharp.set(r,o)}return s}}function Sv(i){return new Mv(i).build(i)}function yv(i,t){let e=i;for(let n=0;n<t;n++)e=Sv(e);return e}function hr(i,t){return i^=t&255,i=Math.imul(i,16777619),i^=t>>>8&255,i=Math.imul(i,16777619),i^=t>>>16&255,i=Math.imul(i,16777619),i^=t>>>24&255,i=Math.imul(i,16777619),i>>>0}function nu(i){let t=2166136261;t=hr(t,i.vertexCount),t=hr(t,i.faceCount);for(let e=0;e<i.faceOffsets.length;e++)t=hr(t,i.faceOffsets[e]);for(let e=0;e<i.faceCorners.length;e++)t=hr(t,i.faceCorners[e]);return t.toString(16).padStart(8,"0")}function Mx(i,t){if(i.vertexCount!==t.vertexCount)return{same:!1,reason:"vertexCount"};if(i.faceCount!==t.faceCount)return{same:!1,reason:"faceCount"};if(i.faceCorners.length!==t.faceCorners.length)return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceOffsets.length;e++)if(i.faceOffsets[e]!==t.faceOffsets[e])return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceCorners.length;e++)if(i.faceCorners[e]!==t.faceCorners[e])return{same:!1,reason:"faceOrder"};return{same:!0}}function iu(){return{position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]}}function As(i){const[t,e,n]=i.position,[s,r,a,o]=i.rotation,[l,c,h]=i.scale;return{position:[t,e,n],rotation:[s,r,a,o],scale:[l,c,h]}}class Uo{id;name;kind;parametric;params;transform;mesh;multires=[];sculptLayers=[];paintLayers=[];activeLevel=0;visible=!0;exportedTopologyHash=null;constructor(t,e,n){this.id=e,this.kind=t;const s=as[t];this.name=n??(s?s.en.replace(/\s/g,""):"mesh")+e,this.parametric=!!s,this.params=Z0(t),this.transform=iu(),this.mesh=s?s.build(this.params):rs.empty()}rebuild(){if(!this.parametric)return;const t=as[this.kind];t&&(this.mesh=t.build(this.params))}markTopologyChanged(){const t=this.multires.length,e=this.sculptLayers.length;return this.parametric=!1,this.multires=[],this.sculptLayers=[],this.activeLevel=0,{droppedLevels:t,droppedLayers:e}}topologyHash(){return nu(this.mesh)}hasUv(){return this.mesh.uvSets.size>0}}class su{objects=[];settings={};cameraBookmarks=[];nextId=1;newId(){return String(this.nextId++)}addObject(t){const e=new Uo(t,this.newId());return this.objects.push(e),e}addMesh(t,e){const n=new Uo("mesh",this.newId(),e);return n.parametric=!1,n.mesh=t,this.objects.push(n),n}remove(t){const e=this.objects.indexOf(t);e>=0&&this.objects.splice(e,1)}find(t){return this.objects.find(e=>e.id===t)}syncIdCounter(){let t=0;for(const e of this.objects){const n=Number(e.id);Number.isFinite(n)&&n>t&&(t=n)}this.nextId=t+1}stats(){let t=0,e=0,n=0;for(const s of this.objects){const r=s.mesh.stats();t+=r.vertices,e+=r.faces,n+=r.triangles}return{objects:this.objects.length,vertices:t,faces:e,triangles:n}}}function bv(i){const t=[],e=[],n=[];let s=null,r="mesh",a=new Map,o=!1,l=0;const c=new Map,h=()=>{s&&s.faceCount>0&&n.push({name:r,mesh:s.build()}),s=null,a=new Map,o=!1},u=()=>(s||(s=new xe({weld:!1})),s);for(const f of i.split(/\r?\n/)){const d=f.trim();if(!d||d.startsWith("#"))continue;const g=d.split(/\s+/),v=g[0];if(v==="v")t.push([Number(g[1]),Number(g[2]),Number(g[3])]);else if(v==="vt")e.push([Number(g[1]),Number(g[2]??0)]);else if(v==="o")h(),r=g.slice(1).join("_")||"mesh";else if(v==="g"){const m=g.slice(1).join("_")||"default";let p=c.get(m);p===void 0&&(p=c.size,c.set(m,p)),l=p,r==="mesh"&&!s&&(r=m)}else if(v==="f"){const m=u(),p=[],S=[];for(let E=1;E<g.length;E++){const M=g[E].split("/");let w=parseInt(M[0],10);if(!Number.isFinite(w))continue;w<0&&(w=t.length+w+1);let y=a.get(w);if(y===void 0){const _=t[w-1];if(!_)continue;y=m.vertex(_[0],_[1],_[2]),a.set(w,y)}if(p.includes(y))continue;p.push(y);let A=M[1]?parseInt(M[1],10):NaN;if(Number.isFinite(A)){A<0&&(A=e.length+A+1);const _=e[A-1];_?(S.push(_),o=!0):S.push([0,0])}else S.push([0,0])}p.length>=3&&m.face(p,{uv:o?new Map([["map1",S]]):void 0,polygroup:l})}}return h(),n}function Ev(i){const t=["# macbeth"];let e=1,n=1;for(const s of i){const{mesh:r}=s;t.push(`o ${s.name.replace(/\s+/g,"_")}`);for(let c=0;c<r.vertexCount;c++){const h=r.getPosition(c),u=s.toWorld?s.toWorld(h[0],h[1],h[2]):h;t.push(`v ${u[0].toFixed(6)} ${u[1].toFixed(6)} ${u[2].toFixed(6)}`)}const a=r.uvSets.get("map1")??r.uvSets.values().next().value??null;if(a)for(let c=0;c<r.cornerCount;c++)t.push(`vt ${a[c*2].toFixed(6)} ${a[c*2+1].toFixed(6)}`);const o=new Map;for(let c=0;c<r.faceCount;c++){const h=r.polygroup[c],u=o.get(h);u?u.push(c):o.set(h,[c])}const l=o.size<=1;for(const[c,h]of o){l||t.push(`g group${c}`);for(const u of h){const f=[];for(let d=r.faceOffsets[u];d<r.faceOffsets[u+1];d++){const g=r.faceCorners[d]+e;f.push(a?`${g}/${d+n}`:`${g}`)}t.push(`f ${f.join(" ")}`)}}e+=r.vertexCount,a&&(n+=r.cornerCount)}return t.join(`
`)+`
`}const ru="MBMESH\0\0",au=1;function No(i){return i+3&-4}function wv(i){let t=16;for(const r of i)t+=8+No(r.data.byteLength);const e=new Uint8Array(t),n=new DataView(e.buffer);for(let r=0;r<8;r++)e[r]=ru.charCodeAt(r);n.setUint32(8,au,!0),n.setUint32(12,i.length,!0);let s=16;for(const r of i){for(let a=0;a<4;a++)e[s+a]=r.tag.charCodeAt(a);n.setUint32(s+4,r.data.byteLength,!0),e.set(r.data,s+8),s+=8+No(r.data.byteLength)}return e}function Tv(i){for(let a=0;a<8;a++)if(i[a]!==ru.charCodeAt(a))throw new Error("メッシュのバイナリ形式ではありません");const t=new DataView(i.buffer,i.byteOffset,i.byteLength),e=t.getUint32(8,!0),n=t.getUint32(12,!0),s=new Map;let r=16;for(let a=0;a<n;a++){let o="";for(let c=0;c<4;c++)o+=String.fromCharCode(i[r+c]);const l=t.getUint32(r+4,!0);s.set(o,i.subarray(r+8,r+8+l)),r+=8+No(l)}return{version:e,chunks:s}}function on(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function ur(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function fr(i){return new Uint32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Fc(i){return new Uint16Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}const Av=new TextEncoder,Cv=new TextDecoder;function Rv(i){const t=[{tag:"POSI",data:on(i.positions)},{tag:"FOFF",data:on(i.faceOffsets)},{tag:"FCOR",data:on(i.faceCorners)}];if(i.polygroup.some(e=>e!==0)&&t.push({tag:"PGRP",data:on(i.polygroup)}),i.materialId.some(e=>e!==0)&&t.push({tag:"MTID",data:on(i.materialId)}),i.vertexColor&&t.push({tag:"VCOL",data:on(i.vertexColor)}),i.crease.size){const e=new Uint32Array(i.crease.size*2),n=new Float32Array(i.crease.size);let s=0;for(const[r,a]of i.crease){const[o,l]=r.split("_").map(Number);e[s*2]=o,e[s*2+1]=l,n[s]=a,s++}t.push({tag:"CRID",data:on(e)},{tag:"CRSH",data:on(n)})}if(i.cornerSharp.size){const e=new Uint32Array(i.cornerSharp.size),n=new Float32Array(i.cornerSharp.size);let s=0;for(const[r,a]of i.cornerSharp)e[s]=r,n[s]=a,s++;t.push({tag:"CNID",data:on(e)},{tag:"CNSH",data:on(n)})}if(i.uvSets.size){const e=Array.from(i.uvSets.keys());t.push({tag:"UVNM",data:Av.encode(JSON.stringify(e))}),e.forEach((n,s)=>{t.push({tag:`UV${String(s).padStart(2,"0")}`,data:on(i.uvSets.get(n))})})}return wv(t)}function Pv(i){const{version:t,chunks:e}=Tv(i);if(t>au)throw new Error(`このメッシュは新しい版 (v${t}) で保存されています。アプリを更新してください`);const n=ur(e.get("POSI")),s=fr(e.get("FOFF")),r=fr(e.get("FCOR")),a=new Map,o=e.get("UVNM");o&&JSON.parse(Cv.decode(o)).forEach((E,M)=>{const w=e.get(`UV${String(M).padStart(2,"0")}`);w&&a.set(E,ur(w))});const l=new Map,c=e.get("CRID"),h=e.get("CRSH");if(c&&h){const S=fr(c),E=ur(h);for(let M=0;M<E.length;M++){const w=S[M*2],y=S[M*2+1];l.set(w<y?`${w}_${y}`:`${y}_${w}`,E[M])}}const u=new Map,f=e.get("CNID"),d=e.get("CNSH");if(f&&d){const S=fr(f),E=ur(d);for(let M=0;M<E.length;M++)u.set(S[M],E[M])}const g=Math.max(0,s.length-1),v=e.get("PGRP"),m=e.get("MTID"),p=e.get("VCOL");return new rs(n,s,r,{uvSets:a,crease:l,cornerSharp:u,polygroup:v?Fc(v):new Uint16Array(g),materialId:m?Fc(m):new Uint16Array(g),vertexColor:p?new Uint8Array(p):null})}var me=Uint8Array,$e=Uint16Array,ol=Int32Array,Vr=new me([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Hr=new me([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Fo=new me([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ou=function(i,t){for(var e=new $e(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new ol(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)s[r]=r-e[n]<<5|n;return{b:e,r:s}},lu=ou(Vr,2),cu=lu.b,Oo=lu.r;cu[28]=258,Oo[258]=28;var hu=ou(Hr,0),Lv=hu.b,Oc=hu.r,Bo=new $e(32768);for(var le=0;le<32768;++le){var Jn=(le&43690)>>1|(le&21845)<<1;Jn=(Jn&52428)>>2|(Jn&13107)<<2,Jn=(Jn&61680)>>4|(Jn&3855)<<4,Bo[le]=((Jn&65280)>>8|(Jn&255)<<8)>>1}var An=(function(i,t,e){for(var n=i.length,s=0,r=new $e(t);s<n;++s)i[s]&&++r[i[s]-1];var a=new $e(t);for(s=1;s<t;++s)a[s]=a[s-1]+r[s-1]<<1;var o;if(e){o=new $e(1<<t);var l=15-t;for(s=0;s<n;++s)if(i[s])for(var c=s<<4|i[s],h=t-i[s],u=a[i[s]-1]++<<h,f=u|(1<<h)-1;u<=f;++u)o[Bo[u]>>l]=c}else for(o=new $e(n),s=0;s<n;++s)i[s]&&(o[s]=Bo[a[i[s]-1]++]>>15-i[s]);return o}),ai=new me(288);for(var le=0;le<144;++le)ai[le]=8;for(var le=144;le<256;++le)ai[le]=9;for(var le=256;le<280;++le)ai[le]=7;for(var le=280;le<288;++le)ai[le]=8;var Cs=new me(32);for(var le=0;le<32;++le)Cs[le]=5;var Dv=An(ai,9,0),Iv=An(ai,9,1),Uv=An(Cs,5,0),Nv=An(Cs,5,1),Pa=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},ln=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},La=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},ll=function(i){return(i+7)/8|0},Is=function(i,t,e){return(t==null||t<0)&&(t=0),(e==null||e>i.length)&&(e=i.length),new me(i.subarray(t,e))},Fv=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ue=function(i,t,e){var n=new Error(t||Fv[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Ue),!e)throw n;return n},Ov=function(i,t,e,n){var s=i.length,r=n?n.length:0;if(!s||t.f&&!t.l)return e||new me(0);var a=!e,o=a||t.i!=2,l=t.i;a&&(e=new me(s*3));var c=function(At){var ee=e.length;if(At>ee){var Ft=new me(Math.max(ee*2,At));Ft.set(e),e=Ft}},h=t.f||0,u=t.p||0,f=t.b||0,d=t.l,g=t.d,v=t.m,m=t.n,p=s*8;do{if(!d){h=ln(i,u,1);var S=ln(i,u+1,3);if(u+=3,S)if(S==1)d=Iv,g=Nv,v=9,m=5;else if(S==2){var y=ln(i,u,31)+257,A=ln(i,u+10,15)+4,_=y+ln(i,u+5,31)+1;u+=14;for(var T=new me(_),P=new me(19),R=0;R<A;++R)P[Fo[R]]=ln(i,u+R*3,7);u+=A*3;for(var L=Pa(P),W=(1<<L)-1,z=An(P,L,1),R=0;R<_;){var F=z[ln(i,u,W)];u+=F&15;var E=F>>4;if(E<16)T[R++]=E;else{var k=0,O=0;for(E==16?(O=3+ln(i,u,3),u+=2,k=T[R-1]):E==17?(O=3+ln(i,u,7),u+=3):E==18&&(O=11+ln(i,u,127),u+=7);O--;)T[R++]=k}}var q=T.subarray(0,y),j=T.subarray(y);v=Pa(q),m=Pa(j),d=An(q,v,1),g=An(j,m,1)}else Ue(1);else{var E=ll(u)+4,M=i[E-4]|i[E-3]<<8,w=E+M;if(w>s){l&&Ue(0);break}o&&c(f+M),e.set(i.subarray(E,w),f),t.b=f+=M,t.p=u=w*8,t.f=h;continue}if(u>p){l&&Ue(0);break}}o&&c(f+131072);for(var nt=(1<<v)-1,Q=(1<<m)-1,st=u;;st=u){var k=d[La(i,u)&nt],wt=k>>4;if(u+=k&15,u>p){l&&Ue(0);break}if(k||Ue(2),wt<256)e[f++]=wt;else if(wt==256){st=u,d=null;break}else{var Ut=wt-254;if(wt>264){var R=wt-257,Tt=Vr[R];Ut=ln(i,u,(1<<Tt)-1)+cu[R],u+=Tt}var Y=g[La(i,u)&Q],it=Y>>4;Y||Ue(3),u+=Y&15;var j=Lv[it];if(it>3){var Tt=Hr[it];j+=La(i,u)&(1<<Tt)-1,u+=Tt}if(u>p){l&&Ue(0);break}o&&c(f+131072);var et=f+Ut;if(f<j){var Pt=r-j,It=Math.min(j,et);for(Pt+f<0&&Ue(3);f<It;++f)e[f]=n[Pt+f]}for(;f<et;++f)e[f]=e[f-j]}}t.l=d,t.p=st,t.b=f,t.f=h,d&&(h=1,t.m=v,t.d=g,t.n=m)}while(!h);return f!=e.length&&a?Is(e,0,f):e.subarray(0,f)},Nn=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8},gs=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8,i[n+2]|=e>>16},Da=function(i,t){for(var e=[],n=0;n<i.length;++n)i[n]&&e.push({s:n,f:i[n]});var s=e.length,r=e.slice();if(!s)return{t:fu,l:0};if(s==1){var a=new me(e[0].s+1);return a[e[0].s]=1,{t:a,l:1}}e.sort(function(w,y){return w.f-y.f}),e.push({s:-1,f:25001});var o=e[0],l=e[1],c=0,h=1,u=2;for(e[0]={s:-1,f:o.f+l.f,l:o,r:l};h!=s-1;)o=e[e[c].f<e[u].f?c++:u++],l=e[c!=h&&e[c].f<e[u].f?c++:u++],e[h++]={s:-1,f:o.f+l.f,l:o,r:l};for(var f=r[0].s,n=1;n<s;++n)r[n].s>f&&(f=r[n].s);var d=new $e(f+1),g=ko(e[h-1],d,0);if(g>t){var n=0,v=0,m=g-t,p=1<<m;for(r.sort(function(y,A){return d[A.s]-d[y.s]||y.f-A.f});n<s;++n){var S=r[n].s;if(d[S]>t)v+=p-(1<<g-d[S]),d[S]=t;else break}for(v>>=m;v>0;){var E=r[n].s;d[E]<t?v-=1<<t-d[E]++-1:++n}for(;n>=0&&v;--n){var M=r[n].s;d[M]==t&&(--d[M],++v)}g=t}return{t:new me(d),l:g}},ko=function(i,t,e){return i.s==-1?Math.max(ko(i.l,t,e+1),ko(i.r,t,e+1)):t[i.s]=e},Bc=function(i){for(var t=i.length;t&&!i[--t];);for(var e=new $e(++t),n=0,s=i[0],r=1,a=function(l){e[n++]=l},o=1;o<=t;++o)if(i[o]==s&&o!=t)++r;else{if(!s&&r>2){for(;r>138;r-=138)a(32754);r>2&&(a(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(a(s),--r;r>6;r-=6)a(8304);r>2&&(a(r-3<<5|8208),r=0)}for(;r--;)a(s);r=1,s=i[o]}return{c:e.subarray(0,n),n:t}},vs=function(i,t){for(var e=0,n=0;n<t.length;++n)e+=i[n]*t[n];return e},uu=function(i,t,e){var n=e.length,s=ll(t+2);i[s]=n&255,i[s+1]=n>>8,i[s+2]=i[s]^255,i[s+3]=i[s+1]^255;for(var r=0;r<n;++r)i[s+r+4]=e[r];return(s+4+n)*8},kc=function(i,t,e,n,s,r,a,o,l,c,h){Nn(t,h++,e),++s[256];for(var u=Da(s,15),f=u.t,d=u.l,g=Da(r,15),v=g.t,m=g.l,p=Bc(f),S=p.c,E=p.n,M=Bc(v),w=M.c,y=M.n,A=new $e(19),_=0;_<S.length;++_)++A[S[_]&31];for(var _=0;_<w.length;++_)++A[w[_]&31];for(var T=Da(A,7),P=T.t,R=T.l,L=19;L>4&&!P[Fo[L-1]];--L);var W=c+5<<3,z=vs(s,ai)+vs(r,Cs)+a,F=vs(s,f)+vs(r,v)+a+14+3*L+vs(A,P)+2*A[16]+3*A[17]+7*A[18];if(l>=0&&W<=z&&W<=F)return uu(t,h,i.subarray(l,l+c));var k,O,q,j;if(Nn(t,h,1+(F<z)),h+=2,F<z){k=An(f,d,0),O=f,q=An(v,m,0),j=v;var nt=An(P,R,0);Nn(t,h,E-257),Nn(t,h+5,y-1),Nn(t,h+10,L-4),h+=14;for(var _=0;_<L;++_)Nn(t,h+3*_,P[Fo[_]]);h+=3*L;for(var Q=[S,w],st=0;st<2;++st)for(var wt=Q[st],_=0;_<wt.length;++_){var Ut=wt[_]&31;Nn(t,h,nt[Ut]),h+=P[Ut],Ut>15&&(Nn(t,h,wt[_]>>5&127),h+=wt[_]>>12)}}else k=Dv,O=ai,q=Uv,j=Cs;for(var _=0;_<o;++_){var Tt=n[_];if(Tt>255){var Ut=Tt>>18&31;gs(t,h,k[Ut+257]),h+=O[Ut+257],Ut>7&&(Nn(t,h,Tt>>23&31),h+=Vr[Ut]);var Y=Tt&31;gs(t,h,q[Y]),h+=j[Y],Y>3&&(gs(t,h,Tt>>5&8191),h+=Hr[Y])}else gs(t,h,k[Tt]),h+=O[Tt]}return gs(t,h,k[256]),h+O[256]},Bv=new ol([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),fu=new me(0),kv=function(i,t,e,n,s,r){var a=r.z||i.length,o=new me(n+a+5*(1+Math.ceil(a/7e3))+s),l=o.subarray(n,o.length-s),c=r.l,h=(r.r||0)&7;if(t){h&&(l[0]=r.r>>3);for(var u=Bv[t-1],f=u>>13,d=u&8191,g=(1<<e)-1,v=r.p||new $e(32768),m=r.h||new $e(g+1),p=Math.ceil(e/3),S=2*p,E=function(Zt){return(i[Zt]^i[Zt+1]<<p^i[Zt+2]<<S)&g},M=new ol(25e3),w=new $e(288),y=new $e(32),A=0,_=0,T=r.i||0,P=0,R=r.w||0,L=0;T+2<a;++T){var W=E(T),z=T&32767,F=m[W];if(v[z]=F,m[W]=z,R<=T){var k=a-T;if((A>7e3||P>24576)&&(k>423||!c)){h=kc(i,l,0,M,w,y,_,P,L,T-L,h),P=A=_=0,L=T;for(var O=0;O<286;++O)w[O]=0;for(var O=0;O<30;++O)y[O]=0}var q=2,j=0,nt=d,Q=z-F&32767;if(k>2&&W==E(T-Q))for(var st=Math.min(f,k)-1,wt=Math.min(32767,T),Ut=Math.min(258,k);Q<=wt&&--nt&&z!=F;){if(i[T+q]==i[T+q-Q]){for(var Tt=0;Tt<Ut&&i[T+Tt]==i[T+Tt-Q];++Tt);if(Tt>q){if(q=Tt,j=Q,Tt>st)break;for(var Y=Math.min(Q,Tt-2),it=0,O=0;O<Y;++O){var et=T-Q+O&32767,Pt=v[et],It=et-Pt&32767;It>it&&(it=It,F=et)}}}z=F,F=v[z],Q+=z-F&32767}if(j){M[P++]=268435456|Oo[q]<<18|Oc[j];var At=Oo[q]&31,ee=Oc[j]&31;_+=Vr[At]+Hr[ee],++w[257+At],++y[ee],R=T+q,++A}else M[P++]=i[T],++w[i[T]]}}for(T=Math.max(T,R);T<a;++T)M[P++]=i[T],++w[i[T]];h=kc(i,l,c,M,w,y,_,P,L,T-L,h),c||(r.r=h&7|l[h/8|0]<<3,h-=7,r.h=m,r.p=v,r.i=T,r.w=R)}else{for(var T=r.w||0;T<a+c;T+=65535){var Ft=T+65535;Ft>=a&&(l[h/8|0]=c,Ft=a),h=uu(l,h+1,i.subarray(T,Ft))}r.i=a}return Is(o,0,n+ll(h)+s)},zv=(function(){for(var i=new Int32Array(256),t=0;t<256;++t){for(var e=t,n=9;--n;)e=(e&1&&-306674912)^e>>>1;i[t]=e}return i})(),Vv=function(){var i=-1;return{p:function(t){for(var e=i,n=0;n<t.length;++n)e=zv[e&255^t[n]]^e>>>8;i=e},d:function(){return~i}}},Hv=function(i,t,e,n,s){if(!s&&(s={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),a=new me(r.length+i.length);a.set(r),a.set(i,r.length),i=a,s.w=r.length}return kv(i,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+t.mem,e,n,s)},du=function(i,t){var e={};for(var n in i)e[n]=i[n];for(var n in t)e[n]=t[n];return e},Sn=function(i,t){return i[t]|i[t+1]<<8},Je=function(i,t){return(i[t]|i[t+1]<<8|i[t+2]<<16|i[t+3]<<24)>>>0},Ia=function(i,t){return Je(i,t)+Je(i,t+4)*4294967296},Ce=function(i,t,e){for(;e;++t)i[t]=e,e>>>=8};function Gv(i,t){return Hv(i,t||{},0,0)}function Wv(i,t){return Ov(i,{i:2},t&&t.out,t&&t.dictionary)}var pu=function(i,t,e,n){for(var s in i){var r=i[s],a=t+s,o=n;Array.isArray(r)&&(o=du(n,r[1]),r=r[0]),ArrayBuffer.isView(r)?e[a]=[r,o]:(e[a+="/"]=[new me(0),o],pu(r,a,e,n))}},zc=typeof TextEncoder<"u"&&new TextEncoder,zo=typeof TextDecoder<"u"&&new TextDecoder,Xv=0;try{zo.decode(fu,{stream:!0}),Xv=1}catch{}var qv=function(i){for(var t="",e=0;;){var n=i[e++],s=(n>127)+(n>223)+(n>239);if(e+s>i.length)return{s:t,r:Is(i,e-1)};s?s==3?(n=((n&15)<<18|(i[e++]&63)<<12|(i[e++]&63)<<6|i[e++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):s&1?t+=String.fromCharCode((n&31)<<6|i[e++]&63):t+=String.fromCharCode((n&15)<<12|(i[e++]&63)<<6|i[e++]&63):t+=String.fromCharCode(n)}};function Vc(i,t){var e;if(zc)return zc.encode(i);for(var n=i.length,s=new me(i.length+(i.length>>1)),r=0,a=function(c){s[r++]=c},e=0;e<n;++e){if(r+5>s.length){var o=new me(r+8+(n-e<<1));o.set(s),s=o}var l=i.charCodeAt(e);l<128||t?a(l):l<2048?(a(192|l>>6),a(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|i.charCodeAt(++e)&1023,a(240|l>>18),a(128|l>>12&63),a(128|l>>6&63),a(128|l&63)):(a(224|l>>12),a(128|l>>6&63),a(128|l&63))}return Is(s,0,r)}function $v(i,t){if(t){for(var e="",n=0;n<i.length;n+=16384)e+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return e}else{if(zo)return zo.decode(i);var s=qv(i),r=s.s,e=s.r;return e.length&&Ue(8),r}}var Yv=function(i,t){return t+30+Sn(i,t+26)+Sn(i,t+28)},Kv=function(i,t,e){var n=Sn(i,t+28),s=Sn(i,t+30),r=$v(i.subarray(t+46,t+46+n),!(Sn(i,t+8)&2048)),a=t+46+n,o=Zv(i,a,s,e,Je(i,t+20),Je(i,t+24),Je(i,t+42)),l=o[0],c=o[1],h=o[2];return[Sn(i,t+10),l,c,r,a+s+Sn(i,t+32),h]},Zv=function(i,t,e,n,s,r,a){var o=s==4294967295,l=r==4294967295,c=a==4294967295,h=t+e,u=o+l+c;if(n&&u){for(;t+4<h;t+=4+Sn(i,t+2))if(Sn(i,t)==1)return[o?Ia(i,t+4+8*l):s,l?Ia(i,t+4):r,c?Ia(i,t+4+8*(l+o)):a,1];n<2&&Ue(13)}return[s,r,a,0]},Vo=function(i){var t=0;if(i)for(var e in i){var n=i[e].length;n>65535&&Ue(9),t+=n+4}return t},Hc=function(i,t,e,n,s,r,a,o){var l=n.length,c=e.extra,h=o&&o.length,u=Vo(c);Ce(i,t,a!=null?33639248:67324752),t+=4,a!=null&&(i[t++]=20,i[t++]=e.os),i[t]=20,t+=2,i[t++]=e.flag<<1|(r<0&&8),i[t++]=s&&8,i[t++]=e.compression&255,i[t++]=e.compression>>8;var f=new Date(e.mtime==null?Date.now():e.mtime),d=f.getFullYear()-1980;if((d<0||d>119)&&Ue(10),Ce(i,t,d<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),t+=4,r!=-1&&(Ce(i,t,e.crc),Ce(i,t+4,r<0?-r-2:r),Ce(i,t+8,e.size)),Ce(i,t+12,l),Ce(i,t+14,u),t+=16,a!=null&&(Ce(i,t,h),Ce(i,t+6,e.attrs),Ce(i,t+10,a),t+=14),i.set(n,t),t+=l,u)for(var g in c){var v=c[g],m=v.length;Ce(i,t,+g),Ce(i,t+2,m),i.set(v,t+4),t+=4+m}return h&&(i.set(o,t),t+=h),t},Jv=function(i,t,e,n,s){Ce(i,t,101010256),Ce(i,t+8,e),Ce(i,t+10,e),Ce(i,t+12,n),Ce(i,t+16,s)};function jv(i,t){t||(t={});var e={},n=[];pu(i,"",e,t);var s=0,r=0;for(var a in e){var o=e[a],l=o[0],c=o[1],h=c.level==0?0:8,u=Vc(a),f=u.length,d=c.comment,g=d&&Vc(d),v=g&&g.length,m=Vo(c.extra);f>65535&&Ue(11);var p=h?Gv(l,c):l,S=p.length,E=Vv();E.p(l),n.push(du(c,{size:l.length,crc:E.d(),c:p,f:u,m:g,u:f!=a.length||g&&d.length!=v,o:s,compression:h})),s+=30+f+m+S,r+=76+2*(f+m)+(v||0)+S}for(var M=new me(r+22),w=s,y=r-s,A=0;A<n.length;++A){var u=n[A];Hc(M,u.o,u,u.f,u.u,u.c.length);var _=30+u.f.length+Vo(u.extra);M.set(u.c,u.o+_),Hc(M,s,u,u.f,u.u,u.c.length,u.o,u.m),s+=16+_+(u.m?u.m.length:0)}return Jv(M,s,n.length,y,w),M}function Qv(i,t){for(var e={},n=i.length-22;Je(i,n)!=101010256;--n)(!n||i.length-n>65558)&&Ue(13);var s=Sn(i,n+8);if(!s)return{};var r=Je(i,n+16),a=Je(i,n-20)==117853008;if(a){var o=Je(i,n-12);a=Je(i,o)==101075792,a&&(s=Je(i,o+32),r=Je(i,o+48))}for(var l=0;l<s;++l){var c=Kv(i,r,a),h=c[0],u=c[1],f=c[2],d=c[3],g=c[4],v=c[5],m=Yv(i,v);r=g,h?h==8?e[d]=Wv(i.subarray(m,m+u),{out:new me(f)}):Ue(14,"unknown compression type "+h):e[d]=Is(i,m,m+u)}return e}const Dr=1,Gc=new TextEncoder,Wc=new TextDecoder;function Xc(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function qc(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function t_(i,t={}){const e={},n=new Date().toISOString(),s={objects:i.objects.map(a=>{e[`meshes/${a.id}.bin`]=Rv(a.mesh);for(const o of a.multires)e[`multires/${a.id}/L${o.level}.bin`]=Xc(o.delta);for(const o of a.sculptLayers)e[`layers/${a.id}/${o.id}.bin`]=Xc(o.delta);return{id:a.id,name:a.name,kind:a.kind,parametric:a.parametric,params:a.params,transform:a.transform,visible:a.visible,activeLevel:a.activeLevel,exportedTopologyHash:a.exportedTopologyHash,multires:a.multires.map(o=>({level:o.level,count:o.delta.length})),sculptLayers:a.sculptLayers.map(o=>({id:o.id,name:o.name,level:o.level,weight:o.weight,visible:o.visible,count:o.delta.length})),paintLayers:a.paintLayers}}),settings:i.settings,cameraBookmarks:i.cameraBookmarks},r={formatVersion:Dr,app:"macbeth",appVersion:t.appVersion??"0.1.0",created:n,modified:n};if(t.thumbnail&&(e["thumbnail.png"]=t.thumbnail,r.thumbnail="thumbnail.png"),t.extraFiles)for(const[a,o]of t.extraFiles)e[a]=o;return e["manifest.json"]=Gc.encode(JSON.stringify(r,null,2)),e["scene.json"]=Gc.encode(JSON.stringify(s)),jv(e,{level:6})}const e_={};function n_(i,t,e){let n=i;for(let s=e;s<Dr;s++){const r=e_[s];if(!r)throw new Error(`版 ${s} から ${s+1} への変換がありません`);n=r(n,t)}return n}function i_(i){const t=Qv(i),e=t["manifest.json"];if(!e)throw new Error("manifest.json がありません。macbeth のプロジェクトではないようです");const n=JSON.parse(Wc.decode(e));if(n.formatVersion>Dr)throw new Error(`このプロジェクトは新しい版 (v${n.formatVersion}) で保存されています。アプリを更新してください`);let s=JSON.parse(Wc.decode(t["scene.json"]));n.formatVersion<Dr&&(s=n_(s,t,n.formatVersion));const r=new su;r.settings=s.settings??{},r.cameraBookmarks=s.cameraBookmarks??[];const a=new Set(["manifest.json","scene.json"]);for(const l of s.objects){const c=new Uo(l.kind,l.id,l.name);c.parametric=l.parametric,c.params=l.params,c.transform=l.transform??iu(),c.visible=l.visible??!0,c.activeLevel=l.activeLevel??0,c.exportedTopologyHash=l.exportedTopologyHash??null;const h=`meshes/${l.id}.bin`,u=t[h];if(!u)throw new Error(`${l.name} のメッシュ (${h}) がありません`);c.mesh=Pv(u),a.add(h),c.multires=(l.multires??[]).map(f=>{const d=`multires/${l.id}/L${f.level}.bin`,g=t[d];return g?(a.add(d),{level:f.level,delta:qc(g)}):null}).filter(f=>f!==null),c.sculptLayers=(l.sculptLayers??[]).map(f=>{const d=`layers/${l.id}/${f.id}.bin`,g=t[d];return g?(a.add(d),{id:f.id,name:f.name,level:f.level,weight:f.weight,visible:f.visible,delta:qc(g)}):null}).filter(f=>f!==null),c.paintLayers=l.paintLayers??[],r.objects.push(c)}r.syncIdCounter();const o=new Map;for(const[l,c]of Object.entries(t))a.has(l)||o.set(l,c);return{document:r,manifest:n,extraFiles:o}}function Sx(i,t){return nu(i.mesh)===t}function dr(i){let t=0,e=0;for(const a of i.values())t+=a.x,e+=a.y;const n=i.size||1;t/=n,e/=n;let s=0;const r=new Map;for(const[a,o]of i)s+=Math.hypot(o.x-t,o.y-e),r.set(a,Math.atan2(o.y-e,o.x-t));return{cx:t,cy:e,spread:s/n,angles:r}}function s_(i,t){let e=0,n=0;for(const[s,r]of t.angles){const a=i.angles.get(s);if(a===void 0)continue;let o=r-a;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;e+=o,n++}return n?e/n:0}function mu(i,t){return Math.abs(t.spread-i.spread)*2}function r_(i,t){const e=Math.abs(s_(i,t))*t.spread;return Math.hypot(t.cx-i.cx,t.cy-i.cy)+mu(i,t)+e}const a_=5,$c=10,o_=12,l_=120,c_=300,h_=400,u_=400,Yc=3;class f_{constructor(t,e,n){this.canvas=t,this.local=e,this.h=n}pointers=new Map;gesture=null;holdTimer=null;tap={t0:0,maxN:0,moved:!1,stagger:!1,lastN:0,lastT:0};fHeld=!1;fChord=!1;fingerCam=!1;attach(){const t=this.canvas;t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("touchmove",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>this.down(e)),t.addEventListener("pointermove",e=>this.move(e)),t.addEventListener("pointerup",e=>this.up(e)),t.addEventListener("pointercancel",e=>this.cancelled(e)),t.addEventListener("pointerleave",()=>{this.pointers.size||this.h.hoverLeave()}),t.addEventListener("wheel",e=>{e.preventDefault(),this.h.dolly(1+Math.sign(e.deltaY)*.09)},{passive:!1})}touchCount(){let t=0;for(const e of this.pointers.values())e.type==="touch"&&t++;return t}down(t){try{this.canvas.setPointerCapture(t.pointerId)}catch{}if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,x0:t.clientX,y0:t.clientY,type:t.pointerType}),this.tapDown(t),this.pointers.size>=2){if(this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.h.abort(),this.cancelHold(),this.pointers.size===3&&this.touchCount()===3){const n=dr(this.pointers);this.gesture={mode:"threefinger",live:!1,acc:0,basis:n,last:n};return}if(this.pointers.size===2){const n=dr(this.pointers);this.gesture={mode:"twofinger",live:!1,acc:0,last:n},this.touchCount()===2&&this.startHold(2,()=>this.h.openTwoFingerMenu(n.cx,n.cy)),this.fHeld&&(this.fChord=!0,this.gesture.zoomOnly=!0,this.gesture.pivot=this.h.zoomPivot()??void 0)}else this.gesture={mode:"idle"};return}const e=this.local(t);if(this.fHeld){this.fChord=!0,this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},this.h.marqueeStart(e);return}if(t.pointerType==="mouse"){if(this.h.altOn(t)){this.gesture={mode:t.button===0?"tumble":t.button===1?"pan":"dolly"};return}if(t.button===2){this.h.openMarkingMenu(t.clientX,t.clientY,this.h.shiftOn(t)),this.gesture={mode:"marking"};return}if(t.button===1){this.gesture={mode:"pan"};return}}if(t.pointerType==="touch"&&!(!this.fingerCam&&this.h.isOnMesh(e,t))){this.gesture={mode:"tumble",live:!1,acc:0},this.startMarkingHold(t);return}this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},t.pointerType!=="mouse"&&this.startMarkingHold(t),this.h.toolDown(e,t)}move(t){const e=this.pointers.get(t.pointerId);if(!e){t.buttons===0&&!this.pointers.size&&this.h.hover(this.local(t),t);return}const n=e.x,s=e.y;e.x=t.clientX,e.y=t.clientY,Math.hypot(t.clientX-e.x0,t.clientY-e.y0)>o_&&(this.tap.moved=!0,this.cancelHold());const r=this.gesture;if(r){if(r.mode==="tumble"){if(!r.live&&t.pointerType==="touch"){if(r.acc=(r.acc??0)+Math.hypot(t.clientX-n,t.clientY-s),r.acc<a_)return;r.live=!0}this.h.tumble(t.clientX-n,t.clientY-s);return}if(r.mode==="pan")return this.h.pan(t.clientX-n,t.clientY-s);if(r.mode==="dolly")return this.h.dolly(1+(t.clientX-n+(t.clientY-s))*.006);if(r.mode==="twofinger"){if(this.pointers.size<2)return;const a=dr(this.pointers),o=r.last??a;if(!r.live){if(r.acc=(r.acc??0)+r_(o,a),r.last=a,r.acc<$c)return;r.live=!0,this.tap.moved=!0,this.cancelHold();return}const l=o.spread>1e-6&&a.spread>1e-6?o.spread/a.spread:1;r.zoomOnly&&r.pivot?this.h.dollyAbout(r.pivot,l):(this.h.dolly(l),this.h.pan(a.cx-o.cx,a.cy-o.cy)),r.last=a;return}if(r.mode==="threefinger"){if(this.pointers.size!==3)return;const a=dr(this.pointers);if(!r.live){const l=r.fresh??=new Set;if(l.add(t.pointerId),l.size<this.pointers.size||(l.clear(),r.last=a,mu(r.basis??a,a)<$c))return;if(!this.h.transformBegin()){this.gesture={mode:"idle"};return}r.live=!0,this.tap.moved=!0,r.basis=a;return}const o=r.basis??a;this.h.transformUpdate(o.spread>1e-6?a.spread/o.spread:1);return}if(r.mode==="tool"){const a=this.local(t);(Math.abs(a.x-(r.sx??0))>Yc||Math.abs(a.y-(r.sy??0))>Yc)&&(r.moved=!0),this.h.toolMove(a,t)}}}up(t){this.cancelHold();const e=this.gesture;e?.mode==="threefinger"&&e.live&&this.h.transformEnd();const n=e?.mode==="tool",s=n&&!!e?.moved;this.pointers.delete(t.pointerId),n&&this.h.toolUp(this.local(t),t,s),this.pointers.size===0?(this.gesture=null,this.tapUp(t)):this.gesture={mode:"idle"}}cancelled(t){this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.pointers.delete(t.pointerId),this.cancelHold(),this.h.abort(),this.pointers.size?this.gesture={mode:"idle"}:(this.gesture=null,this.tap.lastN=0)}tapDown(t){if(t.pointerType!=="touch")return;const e=performance.now(),n=this.touchCount();n===1?(this.tap.t0=e,this.tap.maxN=1,this.tap.moved=!1,this.tap.stagger=!1):(this.tap.maxN=Math.max(this.tap.maxN,n),e-this.tap.t0>l_&&(this.tap.stagger=!0))}tapUp(t){if(t.pointerType!=="touch")return;const e=performance.now();if(!(!this.tap.moved&&!this.tap.stagger&&e-this.tap.t0<c_&&this.tap.maxN>=2)){this.tap.lastN=0;return}this.tap.lastN===this.tap.maxN&&e-this.tap.lastT<h_?(this.tap.lastN=0,this.tap.maxN===2?this.h.undo():this.h.redo(),navigator.vibrate?.(8)):(this.tap.lastN=this.tap.maxN,this.tap.lastT=e)}startMarkingHold(t){const e=this.h.shiftOn(t),{clientX:n,clientY:s}=t;this.startHold(1,()=>this.h.openMarkingMenu(n,s,e))}startHold(t,e){this.cancelHold(),this.holdTimer=setTimeout(()=>{this.pointers.size===t&&(this.h.abort(),this.gesture=null,e())},u_)}cancelHold(){this.holdTimer!==null&&clearTimeout(this.holdTimer),this.holdTimer=null}}const Kc=new Wh,d_=new D;class p_{constructor(t,e){this.viewport=t,this.container=e}get width(){return this.container.clientWidth||1}get height(){return this.container.clientHeight||1}local(t){const e=this.container.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}ndc(t){return new Wt(t.x/this.width*2-1,-(t.y/this.height*2-1))}project(t,e,n,s){t.group.updateMatrixWorld();const r=d_.set(e,n,s).applyMatrix4(t.group.matrixWorld).project(this.viewport.camera);return{x:(r.x+1)/2*this.width,y:(-r.y+1)/2*this.height,z:r.z}}projectVertex(t,e){const n=t.object.mesh.positions;return this.project(t,n[e*3],n[e*3+1],n[e*3+2])}pickSurface(t){Kc.setFromCamera(this.ndc(t),this.viewport.camera);const e=this.viewport.allViews().filter(l=>l.object.visible),s=Kc.intersectObjects(e.map(l=>l.surface),!1)[0];if(!s)return null;const r=e.find(l=>l.surface===s.object);if(!r)return null;const a=s.faceIndex??0,o=r.tri.triToFace[a]??0;return{object:r.object,view:r,face:o,point:s.point.clone(),distance:s.distance}}pickVertex(t,e,n){let s=-1,r=n*n;const a=t.object.mesh.vertexCount;for(let o=0;o<a;o++){const l=this.projectVertex(t,o);if(l.z>1)continue;const c=(l.x-e.x)**2+(l.y-e.y)**2;c<r&&(r=c,s=o)}return s}pickVertexExcept(t,e,n,s){let r=-1,a=n*n;const o=t.object.mesh.vertexCount;for(let l=0;l<o;l++){if(l===s)continue;const c=this.projectVertex(t,l);if(c.z>1)continue;const h=(c.x-e.x)**2+(c.y-e.y)**2;h<a&&(a=h,r=l)}return r}pickEdge(t,e,n){let s=-1,r=n,a=.5;for(let o=0;o<t.edges.length;o++){const[l,c]=t.edges[o],h=this.projectVertex(t,l),u=this.projectVertex(t,c);if(h.z>1&&u.z>1)continue;const f=u.x-h.x,d=u.y-h.y,g=f*f+d*d,v=g?Math.max(0,Math.min(1,((e.x-h.x)*f+(e.y-h.y)*d)/g)):0,m=Math.hypot(h.x+f*v-e.x,h.y+d*v-e.y);m<r&&(r=m,s=o,a=v)}return{edge:s,t:a}}vertsInRect(t,e,n,s,r){const a={x:Math.min(e,s),y:Math.min(n,r)},o={x:Math.max(e,s),y:Math.max(n,r)},l=[],c=t.object.mesh.vertexCount;for(let h=0;h<c;h++){const u=this.projectVertex(t,h);u.z<=1&&u.x>=a.x&&u.x<=o.x&&u.y>=a.y&&u.y<=o.y&&l.push(h)}return l}}const pr=[14176847,7129418,5214176],je={surf:new Wf({color:10134701,specular:2765112,shininess:24,side:en}),wire:new Qe({color:1317407,transparent:!0,opacity:.9}),wireSel:new Qe({color:5111629}),wireComp:new Qe({color:4608605}),vert:new yi({color:9134e3,size:6,sizeAttenuation:!1}),vertSel:new yi({color:16752128,size:11,sizeAttenuation:!1}),edgeSel:new Qe({color:16752128}),faceSel:new ni({color:16752128,transparent:!0,opacity:.5,side:en,depthWrite:!1}),softPt:new yi({color:13658666,size:7,sizeAttenuation:!1}),cutLine:new Qe({color:16769354}),cutPt:new yi({color:16769354,size:9,sizeAttenuation:!1}),pivot:new Qe({color:15915386})};function gu(i,t,e){const n=i.faceNormals(),s=i.vertexFaces(),r=Math.cos(e*Math.PI/180)-1e-4,a=t.tri.length,o=new Float32Array(a*3),l=new Float32Array(a*3);for(let h=0;h<a;h+=3){const u=t.triToFace[h/3],f=n[u*3],d=n[u*3+1],g=n[u*3+2];for(let v=0;v<3;v++){const m=t.tri[h+v],p=(h+v)*3;o[p]=i.positions[m*3],o[p+1]=i.positions[m*3+1],o[p+2]=i.positions[m*3+2];let S=0,E=0,M=0;for(const y of s.get(m)??[]){const A=n[y*3],_=n[y*3+1],T=n[y*3+2];A*f+_*d+T*g>=r&&(S+=A,E+=_,M+=T)}const w=Math.hypot(S,E,M)||1;l[p]=S/w,l[p+1]=E/w,l[p+2]=M/w}}const c=new Me;return c.setAttribute("position",new oe(o,3)),c.setAttribute("normal",new oe(l,3)),c}function vu(i,t){const e=new Float32Array(t.length*6);for(let s=0;s<t.length;s++){const[r,a]=t[s];e[s*6]=i.positions[r*3],e[s*6+1]=i.positions[r*3+1],e[s*6+2]=i.positions[r*3+2],e[s*6+3]=i.positions[a*3],e[s*6+4]=i.positions[a*3+1],e[s*6+5]=i.positions[a*3+2]}const n=new Me;return n.setAttribute("position",new oe(e,3)),n}function nn(i){const t=new Me;return t.setAttribute("position",new oe(Float32Array.from(i),3)),t}function un(i,t){return i.position.set(t.position[0],t.position[1],t.position[2]),i.quaternion.set(t.rotation[0],t.rotation[1],t.rotation[2],t.rotation[3]),i.scale.set(t.scale[0],t.scale[1],t.scale[2]),i}function m_(i,t){const e=new cn;un(e,i.transform);const n=i.mesh.triangulate(),s=i.mesh.edges(),r=new Fe(gu(i.mesh,n,t),je.surf);r.userData.objectId=i.id,e.add(r);const a=new Fr(vu(i.mesh,s),je.wire);e.add(a);const o=new ns(nn(i.mesh.positions),je.vert);return e.add(o),e.updateMatrixWorld(),{object:i,group:e,surface:r,wire:a,points:o,tri:n,edges:s}}function Qi(i){i.traverse(t=>{const e=t.geometry;e&&e.dispose()})}const Ss={persp:{label:"パース",sub:"Persp",theta:.72,phi:1.12,ortho:!1},top:{label:"上",sub:"Top",theta:0,phi:.001,ortho:!0},bottom:{label:"下",sub:"Bottom",theta:0,phi:Math.PI-.001,ortho:!0},front:{label:"前",sub:"Front",theta:0,phi:Math.PI/2,ortho:!0},back:{label:"後",sub:"Back",theta:Math.PI,phi:Math.PI/2,ortho:!0},right:{label:"右",sub:"Right",theta:Math.PI/2,phi:Math.PI/2,ortho:!0},left:{label:"左",sub:"Left",theta:-Math.PI/2,phi:Math.PI/2,ortho:!0}},Zc=.3,Jc=140;class g_{constructor(t,e,n){this.container=t,this.state=n,this.renderer=new Y0({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene.add(this.root,this.overlay,this.manip,this.preview,this.preselect),this.addLights(),this.addGrid(),this.applyCamera()}renderer;scene=new Cf;persp=new tn(45,1,.05,500);ortho=new Br(-1,1,1,-1,.05,500);camera=this.persp;root=new cn;overlay=new cn;manip=new cn;preview=new cn;preselect=new cn;cam={target:new D(0,.4,0),theta:.72,phi:1.12,distance:7.2};views=new Map;frame=0;addLights(){this.scene.add(new $f(12371921,3356733,.85));const t=new ic(16777215,.72);t.position.set(3,6,4);const e=new ic(10466502,.28);e.position.set(-4,2,-3),this.scene.add(t,e)}addGrid(){const t=new jf(24,24,7174272,4936796),e=t.material;e.transparent=!0,e.opacity=.55,this.scene.add(t);const n=(s,r)=>{const a=new Me;a.setAttribute("position",new oe(s,3)),this.scene.add(new Ds(a,new Qe({color:r})))};n([-12,0,0,12,0,0],12610154),n([0,0,-12,0,0,12],6982336)}applyCamera(){const{cam:t}=this,e=Math.sin(t.phi),n=t.target.x+t.distance*e*Math.sin(t.theta),s=t.target.y+t.distance*Math.cos(t.phi),r=t.target.z+t.distance*e*Math.cos(t.theta),a=this.state.camOpts;this.persp.position.set(n,s,r),this.persp.lookAt(t.target),this.persp.near=a.near,this.persp.far=a.far,this.persp.setFocalLength(a.focal),this.ortho.position.set(n,s,r),this.ortho.lookAt(t.target);const o=(this.container.clientWidth||1)/(this.container.clientHeight||1),l=t.distance*.42;this.ortho.left=-l*o,this.ortho.right=l*o,this.ortho.top=l,this.ortho.bottom=-l,this.ortho.near=a.near,this.ortho.far=a.far,this.ortho.updateProjectionMatrix(),this.camera=a.ortho?this.ortho:this.persp}setView(t){const e=Ss[t];this.cam.theta=e.theta,this.cam.phi=e.phi,this.state.camOpts.ortho=e.ortho,this.applyCamera()}tumble(t,e){this.cam.theta-=t*.0088,this.cam.phi=Math.max(.05,Math.min(Math.PI-.05,this.cam.phi-e*.0088)),this.applyCamera()}pan(t,e){const n=new D().setFromMatrixColumn(this.camera.matrix,0),s=new D().setFromMatrixColumn(this.camera.matrix,1),r=this.cam.distance*.0016;this.cam.target.addScaledVector(n,-t*r).addScaledVector(s,e*r),this.applyCamera()}dolly(t){this.cam.distance=Math.max(Zc,Math.min(Jc,this.cam.distance*t)),this.applyCamera()}dollyAbout(t,e){const n=Math.max(Zc,Math.min(Jc,this.cam.distance*e)),s=n/this.cam.distance;this.cam.target.sub(t).multiplyScalar(s).add(t),this.cam.distance=n,this.applyCamera()}frameSelected(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;let e=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0],s=!1;for(const a of t){const o=this.views.get(a.id);if(!o)continue;const l=a.mesh.positions;for(let c=0;c<a.mesh.vertexCount;c++){const h=new D(l[c*3],l[c*3+1],l[c*3+2]).applyMatrix4(o.group.matrixWorld);e=[Math.min(e[0],h.x),Math.min(e[1],h.y),Math.min(e[2],h.z)],n=[Math.max(n[0],h.x),Math.max(n[1],h.y),Math.max(n[2],h.z)],s=!0}}if(!s)return;this.cam.target.set((e[0]+n[0])/2,(e[1]+n[1])/2,(e[2]+n[2])/2);const r=Math.max(n[0]-e[0],n[1]-e[1],n[2]-e[2]);this.cam.distance=Math.max(1.4,r*2.4),this.applyCamera()}viewOf(t){return this.views.get(t.id)}allViews(){return[...this.views.values()]}rebuildObject(t){const e=this.views.get(t.id);e&&(this.root.remove(e.group),Qi(e.group));const n=m_(t,this.shadingAngle);this.root.add(n.group),this.views.set(t.id,n),this.applyDisplay(n)}syncAll(){const t=new Set(this.state.doc.objects.map(e=>e.id));for(const[e,n]of this.views)t.has(e)||(this.root.remove(n.group),Qi(n.group),this.views.delete(e));for(const e of this.state.doc.objects)this.rebuildObject(e);this.rebuildOverlay()}get shadingAngle(){return this.state.display==="shaded"?0:this.state.smoothAngle}refreshPositions(t){const e=this.views.get(t.id);if(!e)return this.rebuildObject(t);un(e.group,t.transform),e.group.updateMatrixWorld(),e.surface.geometry.dispose(),e.surface.geometry=gu(t.mesh,e.tri,this.shadingAngle),e.wire.geometry.dispose(),e.wire.geometry=vu(t.mesh,e.edges),e.points.geometry.dispose(),e.points.geometry=nn(t.mesh.positions)}applyDisplay(t){const e=this.state.display,n=t.object===this.state.selected;t.surface.visible=e!=="wire",t.wire.visible=e==="wire"||e==="shadedWire"||n,t.wire.material=n?this.state.compMode==="object"?je.wireSel:je.wireComp:je.wire,t.points.visible=n&&this.state.compMode==="vertex",t.group.visible=t.object.visible}applyDisplayAll(){for(const t of this.views.values())this.applyDisplay(t)}softWeightsProvider=null;rebuildOverlay(){for(const s of this.overlay.children.slice())this.overlay.remove(s),Qi(s);const t=this.state.selected,e=t?this.views.get(t.id):void 0;if(!t||!e||!this.state.comp.size)return;const n=t.mesh;if(this.state.soft.strength>0&&this.state.compMode!=="object"&&this.softWeightsProvider){const s=[];for(const[r,a]of this.softWeightsProvider())a>.02&&a<.999&&s.push(n.positions[r*3],n.positions[r*3+1],n.positions[r*3+2]);if(s.length){const r=new ns(nn(s),je.softPt);un(r,t.transform).renderOrder=2,this.overlay.add(r)}}if(this.state.compMode==="vertex"){const s=[];for(const a of this.state.comp)s.push(n.positions[a*3],n.positions[a*3+1],n.positions[a*3+2]);const r=new ns(nn(s),je.vertSel);un(r,t.transform).renderOrder=4,this.overlay.add(r)}else if(this.state.compMode==="edge"){const s=[];for(const a of this.state.comp){const o=e.edges[a];o&&(s.push(n.positions[o[0]*3],n.positions[o[0]*3+1],n.positions[o[0]*3+2]),s.push(n.positions[o[1]*3],n.positions[o[1]*3+1],n.positions[o[1]*3+2]))}const r=new Fr(nn(s),je.edgeSel);un(r,t.transform).renderOrder=4,this.overlay.add(r)}else if(this.state.compMode==="face"){const s=[],r=[];for(const l of this.state.comp){if(l>=n.faceCount)continue;const c=n.faceVerts(l),h=s.length/3;for(const u of c)s.push(n.positions[u*3],n.positions[u*3+1],n.positions[u*3+2]);for(let u=1;u<c.length-1;u++)r.push(h,h+u,h+u+1)}const a=nn(s);a.setIndex(r);const o=new Fe(a,je.faceSel);un(o,t.transform).renderOrder=4,this.overlay.add(o)}}resize(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.persp.aspect=t/e,this.persp.updateProjectionMatrix(),this.applyCamera()}start(){const t=()=>{this.frame=requestAnimationFrame(t),this.renderer.render(this.scene,this.camera)};t()}stop(){cancelAnimationFrame(this.frame)}}const bi=[new D(1,0,0),new D(0,1,0),new D(0,0,1)],jc=3,Qc=13,th=23,cl=30,v_=40;function Ho(i){return i<0?null:i===cl||i<10?"move":i<20?"rotate":"scale"}const __=1.8,pi=16770688,eh=14862432;function nh(i){const t=i==="all";return{move:t||i==="move",rotate:t||i==="rotate",scale:t||i==="scale",arrow:1,ring:t?.68:1,cube:t?1.3:1}}function ih(i,t,e,n,s=64){const r=new dn().setFromUnitVectors(new D(0,0,1),t.clone().normalize()),a=[];for(let c=0;c<=s;c++){const h=c/s*Math.PI*2,u=new D(Math.cos(h)*e,Math.sin(h)*e,0).applyQuaternion(r).add(i);a.push(u.x,u.y,u.z)}const o=new Me;o.setAttribute("position",new oe(a,3));const l=new Ds(o,new Qe({color:n}));return l.renderOrder=6,l}function x_(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s,a=r?Math.max(0,Math.min(1,((i.x-t.x)*n+(i.y-t.y)*s)/r)):0;return Math.hypot(t.x+n*a-i.x,t.y+s*a-i.y)}class M_{constructor(t){this.host=t}group=new cn;hot=-1;signature="";toScreen(t){return this.host.toScreen(t)}scaleAt(t){const e=this.host.orthoDistance();return e!==null?e*.09:this.host.camera().position.distanceTo(t)*.15}clear(){for(const t of this.group.children.slice())this.group.remove(t),Qi(t);this.signature=""}rebuild(t,e,n){if(!t){this.signature&&this.clear();return}const s=this.scaleAt(t),r=[e,this.hot,n,t.x.toFixed(3),t.y.toFixed(3),t.z.toFixed(3),s.toFixed(3)].join("|");if(r===this.signature)return;this.clear(),this.signature=r;const a=nh(e),o=c=>this.hot===c;for(let c=0;c<3;c++){const h=bi[c];if(a.move||a.scale){const u=h.clone().multiplyScalar((a.scale?a.cube:a.arrow)*s).add(t),f=o(c)||o(20+c)?pi:pr[c],d=new Me;d.setAttribute("position",new oe([t.x,t.y,t.z,u.x,u.y,u.z],3));const g=new Ds(d,new Qe({color:f}));g.renderOrder=6,this.group.add(g)}if(a.move){const u=new Fe(new rl(s*.075,s*.22,10),new ni({color:o(c)?pi:pr[c]}));u.quaternion.setFromUnitVectors(new D(0,1,0),h),u.position.copy(h.clone().multiplyScalar(a.arrow*s).add(t)),u.renderOrder=6,this.group.add(u)}if(a.scale){const u=new Fe(new Ti(s*.12,s*.12,s*.12),new ni({color:o(20+c)?pi:pr[c]}));u.position.copy(h.clone().multiplyScalar(a.cube*s).add(t)),u.renderOrder=6,this.group.add(u)}a.rotate&&this.group.add(ih(t,h,a.ring*s,o(10+c)?pi:pr[c]))}if(e==="rotate"){const c=new D().subVectors(this.host.camera().position,t).normalize();this.group.add(ih(t,c,s*1.18,o(Qc)?pi:12174283))}const l=e==="scale"?new Fe(new Ti(s*.14,s*.14,s*.14),new ni({color:o(th)?pi:eh})):new Fe(new al(s*.085,12,10),new ni({color:o(jc)||o(cl)?pi:eh}));l.position.copy(t),l.renderOrder=6,this.group.add(l)}pick(t,e,n,s=1){if(!e)return-1;const r=this.scaleAt(e),a=this.host.toScreen(e);if(Math.hypot(a.x-t.x,a.y-t.y)<16*s)return n==="scale"?th:jc;const o=nh(n);let l=-1,c=1/0;const h=(u,f,d)=>{f<d&&f<c&&(c=f,l=u)};for(let u=0;u<3;u++){const f=bi[u];if(o.scale){const d=this.host.toScreen(f.clone().multiplyScalar(o.cube*r).add(e));h(20+u,Math.hypot(d.x-t.x,d.y-t.y),16*s)}if(o.move){const d=this.host.toScreen(f.clone().multiplyScalar(.3*r).add(e)),g=this.host.toScreen(f.clone().multiplyScalar(o.arrow*r).add(e));h(u,x_(t,d,g),14*s)}}if(l>=0)return l;if(o.rotate){for(let u=0;u<3;u++)h(10+u,this.ringDistance(t,e,bi[u],o.ring*r),12*s);if(n==="rotate"){const u=new D().subVectors(this.host.camera().position,e).normalize();h(Qc,this.ringDistance(t,e,u,r*1.18),12*s)}}return l}ringDistance(t,e,n,s){const r=new dn().setFromUnitVectors(new D(0,0,1),n.clone().normalize());let a=1/0;for(let o=0;o<64;o++){const l=o/64*Math.PI*2,c=new D(Math.cos(l)*s,Math.sin(l)*s,0).applyQuaternion(r).add(e),h=this.host.toScreen(c);a=Math.min(a,Math.hypot(h.x-t.x,h.y-t.y))}return a}}function Go(i,t,e){const n=new D().subVectors(t,i.origin),s=e.dot(e),r=e.dot(i.direction),a=i.direction.dot(i.direction),o=e.dot(n),l=i.direction.dot(n),c=s*a-r*r;return Math.abs(c)<1e-9?0:(r*l-a*o)/c}const S_={model:{g1:jn("強度","ソフト選択 強度",0,1,.01,"strength"),g2:jn("範囲","ソフト選択 範囲",.05,6,.05,"radius")},uv:{g1:jn("強度","ソフト選択 強度",0,1,.01,"strength"),g2:jn("範囲","ソフト選択 範囲",.05,6,.05,"radius")},sculpt:{g1:jn("強度","ブラシ強度",0,1,.01,"strength"),g2:jn("サイズ","ブラシサイズ",.05,6,.05,"radius")},material:{g1:jn("不透明","不透明度",0,1,.01,"strength"),g2:jn("サイズ","ブラシサイズ",.05,6,.05,"radius")}};function jn(i,t,e,n,s,r){return{label:i,full:t,min:e,max:n,step:s,get:a=>a.soft[r],set:(a,o)=>{a.soft[r]=o}}}class y_{doc=new su;selected=null;comp=new Set;mode="model";compMode="object";tool="select";manip="all";display="shadedWire";mods={shift:"off",ctrl:"off",alt:"off"};symX=!1;fingerCam=!1;panelsHidden=!1;soft={strength:0,radius:1};toolOpts={extrudeDist:.35};cut={snapStep:0,edgeFlow:!1};bevel={width:.1,segments:1};smoothAngle=30;camOpts={focal:35,near:.05,far:500,ortho:!1};viewName="パース";cameras=[];gauge(t){return S_[this.mode][t]}modOn(t){return this.mods[t]!=="off"}releaseLatches(){let t=!1;for(const e of["shift","ctrl","alt"])this.mods[e]==="latch"&&(this.mods[e]="off",t=!0);return t}select(t){this.selected!==t&&this.comp.clear(),this.selected=t}}const b_=40;class E_{constructor(t){this.state=t}undoStack=[];redoStack=[];onChange=null;get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get undoLabel(){return this.undoStack.at(-1)?.label??null}get redoLabel(){return this.redoStack.at(-1)?.label??null}push(t){this.commit(t,this.snapshot())}snapshot(){return{objects:this.state.doc.objects.map(t=>({ref:t,name:t.name,kind:t.kind,parametric:t.parametric,params:{...t.params},transform:As(t.transform),visible:t.visible,activeLevel:t.activeLevel,mesh:t.mesh.clone(),multires:t.multires.slice(),sculptLayers:t.sculptLayers.slice(),paintLayers:t.paintLayers.slice()})),selectedId:this.state.selected?.id??null,compMode:this.state.compMode,comp:[...this.state.comp]}}commit(t,e){this.undoStack.push({label:t,snap:e}),this.undoStack.length>b_&&this.undoStack.shift(),this.redoStack.length=0,this.onChange?.()}drop(){this.undoStack.pop(),this.onChange?.()}undo(){const t=this.undoStack.pop();return t?(this.redoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}redo(){const t=this.redoStack.pop();return t?(this.undoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}clear(){this.undoStack.length=0,this.redoStack.length=0,this.onChange?.()}restore(t){const e=this.state.doc;e.objects=t.objects.map(r=>{const a=r.ref;return a.name=r.name,a.kind=r.kind,a.parametric=r.parametric,a.params={...r.params},a.transform=As(r.transform),a.visible=r.visible,a.activeLevel=r.activeLevel,a.mesh=r.mesh.clone(),a.multires=r.multires.slice(),a.sculptLayers=r.sculptLayers.slice(),a.paintLayers=r.paintLayers.slice(),a}),this.state.selected=t.selectedId?e.find(t.selectedId)??null:null,this.state.compMode=t.compMode,this.state.comp.clear();const n=this.state.selected?.mesh,s=!n||t.compMode==="object"?0:t.compMode==="vertex"?n.vertexCount:t.compMode==="face"?n.faceCount:1/0;for(const r of t.comp)r<s&&this.state.comp.add(r)}}const w_="macbeth",T_=1,oi="projects",li="blobs";let mr=null;function _u(){return mr||(mr=new Promise((i,t)=>{const e=indexedDB.open(w_,T_);e.onupgradeneeded=()=>{const n=e.result;n.objectStoreNames.contains(oi)||n.createObjectStore(oi,{keyPath:"id"}),n.objectStoreNames.contains(li)||n.createObjectStore(li)},e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error??new Error("IndexedDB を開けません"))}),mr)}function hl(i,t,e){return _u().then(n=>new Promise((s,r)=>{const a=n.transaction(i,t);let o;Promise.resolve(e(a)).then(l=>{o=l},r),a.oncomplete=()=>s(o),a.onerror=()=>r(a.error??new Error("IndexedDB の操作に失敗しました")),a.onabort=()=>r(a.error??new Error("IndexedDB の操作が中断されました"))}))}function sh(i){return new Promise((t,e)=>{i.onsuccess=()=>t(i.result),i.onerror=()=>e(i.error)})}async function rh(){try{return await _u(),!0}catch{return!1}}async function A_(i,t){const e=Date.now(),n={...i,created:i.created??e,modified:e,size:t.byteLength};return await hl([oi,li],"readwrite",s=>{s.objectStore(oi).put(n),s.objectStore(li).put(t.slice().buffer,n.id)}),n}async function C_(i){return await hl([oi,li],"readonly",async e=>{const n=await sh(e.objectStore(oi).get(i)),s=await sh(e.objectStore(li).get(i));return n&&s?{record:n,bytes:new Uint8Array(s)}:null})}async function ah(i){await hl([oi,li],"readwrite",t=>{t.objectStore(oi).delete(i),t.objectStore(li).delete(i)})}const gr="__autosave__",R_=1200,P_="0.1.0";class L_{constructor(t){this.state=t}timer=null;writing=!1;pending=!1;available=null;onError=null;onSaved=null;schedule(){this.timer!==null&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.timer=null,this.saveNow()},R_)}async saveNow(){if(this.writing){this.pending=!0;return}if(this.available===null&&(this.available=await rh()),!!this.available){this.writing=!0;try{const t=t_(this.state.doc,{appVersion:P_}),e=await A_({id:gr,name:"自動保存",thumbnail:"",autosave:!0},t);this.onSaved?.(e.modified)}catch(t){this.onError?.(t instanceof Error?t.message:"自動保存に失敗しました")}finally{this.writing=!1,this.pending&&(this.pending=!1,this.schedule())}}}async restore(){if(this.available===null&&(this.available=await rh()),!this.available)return!1;try{const t=await C_(gr);if(!t)return!1;const{document:e}=i_(t.bytes);return e.objects.length?(this.state.doc=e,this.state.select(null),!0):!1}catch(t){return this.onError?.(t instanceof Error?t.message:"前回の状態を読み込めませんでした"),await ah(gr).catch(()=>{}),!1}}async clear(){this.timer!==null&&clearTimeout(this.timer),this.timer=null,await ah(gr).catch(()=>{})}}function xu(){return typeof window.showSaveFilePicker=="function"?"file-system-access":typeof navigator.canShare=="function"&&typeof navigator.share=="function"?"share":"download"}function D_(i){return i.endsWith(".mbz")?"application/zip":i.endsWith(".obj")?"text/plain":i.endsWith(".png")?"image/png":"application/octet-stream"}function I_(i){return i.endsWith(".mbz")?{"application/zip":[".mbz"]}:i.endsWith(".obj")?{"text/plain":[".obj"]}:{"application/octet-stream":[`.${i.split(".").pop()}`]}}function oh(i,t){const e=URL.createObjectURL(i),n=document.createElement("a");n.href=e,n.download=t,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(e),2e3)}async function lh(i,t){const e=new Blob([i],{type:D_(t)}),n=xu();if(n==="file-system-access")try{const s=await window.showSaveFilePicker({suggestedName:t,types:[{description:"macbeth",accept:I_(t)}]}),r=await s.createWritable();return await r.write(e),await r.close(),{method:n,target:{handle:s,name:s.name},saved:!0}}catch(s){return s?.name==="AbortError"?{method:n,target:null,saved:!1}:(oh(e,t),{method:"download",target:{name:t},saved:!0})}if(n==="share"){const s=new File([e],t,{type:e.type});if(navigator.canShare?.({files:[s]}))try{return await navigator.share({files:[s],title:t}),{method:n,target:{name:t},saved:!0}}catch(r){if(r?.name==="AbortError")return{method:n,target:null,saved:!1}}}return oh(e,t),{method:"download",target:{name:t},saved:!0}}async function ch(i){if(typeof window.showOpenFilePicker=="function")try{const t=i.split(",").map(r=>r.trim()),[e]=await window.showOpenFilePicker({multiple:!1,types:[{description:"macbeth",accept:{"*/*":t}}]}),n=await e.getFile(),s=await n.arrayBuffer();return{name:n.name,bytes:new Uint8Array(s),text:await n.text(),handle:e}}catch(t){if(t?.name==="AbortError")return null}return new Promise(t=>{const e=document.createElement("input");e.type="file",e.accept=i,e.style.display="none",document.body.appendChild(e);let n=!1;const s=r=>{n||(n=!0,e.remove(),t(r))};e.addEventListener("change",async()=>{const r=e.files?.[0];if(!r)return s(null);const a=await r.arrayBuffer();s({name:r.name,bytes:new Uint8Array(a),text:new TextDecoder().decode(a)})}),window.addEventListener("focus",()=>setTimeout(()=>s(null),800),{once:!0}),e.click()})}function U_(){switch(xu()){case"file-system-access":return"フォルダを選んで保存（同じファイルに上書きできます）";case"share":return"共有シートから「ファイル」App へ保存";default:return"ダウンロード"}}const N_=100;class F_{session=null;get active(){return this.session!==null}begin(t,e,n){if(!e.length)return null;let s=0;for(const[a,o]of e){const l=t.mesh.getPosition(a),c=t.mesh.getPosition(o);s+=Math.hypot(l[0]-c[0],l[1]-c[1],l[2]-c[2])}const r=s/e.length||1;return this.session={object:t,source:t.mesh.clone(),edges:e,scale:r,startX:n},this.session}widthFromDrag(t,e){const n=t/N_*e*.5;return Math.max(e*.02,Math.min(e*.49,n))}apply(t){const e=this.session;if(!e)return null;const n=rv(e.source,e.edges,t.width,t.segments);return n?(e.object.mesh=n.mesh,{faces:n.newFaces}):null}cancel(){const t=this.session;t&&(t.object.mesh=t.source,this.session=null)}keep(){return this.session}end(){this.session=null}}const O_=30;class B_{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}preview=null;get current(){return this.preview}snap(t,e){if(e)return .5;const n=this.state.cut.snapStep;if(n>0){const s=n/100;t=Math.round(t/s)*s}return Math.max(.02,Math.min(.98,t))}clear(){for(const t of this.group.children.slice())this.group.remove(t),Qi(t);this.preview=null}update(t,e,n){if(this.clear(),!e)return null;const s=this.picker.pickEdge(e,t,O_);if(s.edge<0)return null;const r=this.snap(s.t,n),[a,o]=e.edges[s.edge],l=J0(e.object.mesh,a,o,r,this.state.cut.edgeFlow);if(!l)return null;this.preview={edge:s.edge,t:r,faceCount:l.faceCount};const c=[];for(const d of l.points)c.push(d[0],d[1],d[2]);const h=new Ds(nn(c),je.cutLine);un(h,e.object.transform).renderOrder=5,this.group.add(h);const u=l.points[0],f=new ns(nn([u[0],u[1],u[2]]),je.cutPt);return un(f,e.object.transform).renderOrder=5,this.group.add(f),`エッジループ挿入 <kbd>${Math.round(r*100)}%</kbd> · ${l.faceCount} 面`+(this.state.cut.edgeFlow?" · エッジフロー":"")+" · <kbd>Shift</kbd> で 50%"}commit(t){const e=this.preview;if(!e||!t)return null;const[n,s]=t.edges[e.edge],r=j0(t.object.mesh,n,s,e.t,this.state.cut.edgeFlow);return this.clear(),r?(t.object.mesh=r.mesh,{faceCount:r.faceCount}):null}}const k_=22,z_=16,vr={vert:new yi({color:16761963,size:9,sizeAttenuation:!1,transparent:!0,opacity:.75}),edge:new Qe({color:16761963,transparent:!0,opacity:.8}),weld:new yi({color:7139450,size:14,sizeAttenuation:!1}),face:new ni({color:16761963,transparent:!0,opacity:.22,side:en,depthWrite:!1})};class V_{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}current="";clear(){if(this.current){for(const t of this.group.children.slice())this.group.remove(t),Qi(t);this.current=""}}showVertex(t,e){if(this.setKey(`w${e}`))return;const n=t.object.mesh,s=new ns(nn([n.positions[e*3],n.positions[e*3+1],n.positions[e*3+2]]),vr.weld);this.add(s,t)}update(t,e){if(!e||this.state.compMode==="object")return this.clear();const n=e.object,s=n.mesh;if(this.state.compMode==="vertex"){const h=this.picker.pickVertex(e,t,k_);if(h<0)return this.clear();if(this.setKey(`v${h}`))return;const u=new ns(nn([s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]]),vr.vert);this.add(u,e);return}if(this.state.compMode==="edge"){const h=this.picker.pickEdge(e,t,z_);if(h.edge<0)return this.clear();if(this.setKey(`e${h.edge}`))return;const[u,f]=e.edges[h.edge],d=new Fr(nn([s.positions[u*3],s.positions[u*3+1],s.positions[u*3+2],s.positions[f*3],s.positions[f*3+1],s.positions[f*3+2]]),vr.edge);this.add(d,e);return}const r=this.picker.pickSurface(t);if(!r||r.object!==n)return this.clear();if(this.setKey(`f${r.face}`))return;const a=s.faceVerts(r.face),o=[],l=[];for(const h of a)o.push(s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]);for(let h=1;h<a.length-1;h++)l.push(0,h,h+1);const c=nn(o);c.setIndex(l),this.add(new Fe(c,vr.face),e)}setKey(t){return this.current===t?!0:(this.clear(),this.current=t,!1)}add(t,e){un(t,e.object.transform).renderOrder=3,this.group.add(t)}}const hh=22,uh=16,H_=380,G_=14,fh=4;function mi(i,t,e){e?i.delete(t):i.add(t)}const xn={changed:!1,objectChanged:!1};class W_{constructor(t,e,n){this.state=t,this.picker=e,this.viewOf=n}lastClick=null;add(t){return this.state.modOn("shift")||t.shiftKey}sub(t){return this.state.modOn("ctrl")||t.ctrlKey||t.metaKey}click(t,e){if(this.state.compMode==="object"){const h=this.picker.pickSurface(t)?.object??null,u=h!==this.state.selected;return this.state.select(h),this.lastClick=null,{changed:u,objectChanged:u}}let n=this.state.selected;if(!n){const c=this.picker.pickSurface(t);if(!c)return xn;this.state.select(c.object),n=c.object;const h=this.viewOf(n.id);return h&&(this.pickOne(t,e,h),this.lastClick={t:performance.now(),x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,before:new Set}),{changed:!0,objectChanged:!0}}const s=this.viewOf(n.id);if(!s)return xn;const r=performance.now(),a=this.lastClick;if(a!==null&&r-a.t<H_&&Math.hypot(t.x-a.x,t.y-a.y)<G_&&a.mode===this.state.compMode&&a.objectId===n.id&&a)return this.lastClick=null,this.double(t,e,s,a.before);const l=new Set(this.state.comp);return!this.add(e)&&!this.sub(e)&&this.state.comp.clear(),this.pickOne(t,e,s),this.lastClick={t:r,x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,before:l},{changed:!0,objectChanged:!1}}pickOne(t,e,n){const s=this.sub(e),r=this.state.comp;if(this.state.compMode==="vertex"){const a=this.picker.pickVertex(n,t,hh);a>=0&&mi(r,a,s)}else if(this.state.compMode==="edge"){const a=this.picker.pickEdge(n,t,uh);a.edge>=0&&mi(r,a.edge,s)}else if(this.state.compMode==="face"){const a=this.picker.pickSurface(t);a&&a.object===n.object&&mi(r,a.face,s)}}edgeIndex(t){const e=new Map;return t.edges.forEach((n,s)=>e.set(Gt(n[0],n[1]),s)),e}double(t,e,n,s){const r=n.object,a=r.mesh,o=this.add(e),l=this.sub(e),c=this.edgeIndex(n),h=f=>f.map(d=>c.get(Gt(d[0],d[1]))).filter(d=>d!==void 0),u=(f,d)=>{!o&&!l?this.state.comp.clear():this.state.comp=new Set(s);for(const g of f)mi(this.state.comp,g,l);return{changed:!0,objectChanged:!1,message:`${d} — ${f.length}`}};if(this.state.compMode==="edge"){const f=this.picker.pickEdge(n,t,uh);if(f.edge<0)return xn;const[d,g]=n.edges[f.edge];if(o&&s.size){const v=[...s][s.size-1],m=n.edges[v];if(m){const p=Gt(m[0],m[1]),S=Gt(d,g),E=Ra(a,m[0],m[1]),M=Ic(E,p,S);if(M)return u(h(M),"部分エッジループ");const w=dv(a,m[0],m[1]),y=Ic(w,p,S);if(y)return u(h(y),"部分エッジリング")}}return u(h(Ra(a,d,g).edges),"エッジループ")}if(this.state.compMode==="face"){const f=this.picker.pickSurface(t);return!f||f.object!==r?xn:u(eu(a,f.face),"シェル")}if(this.state.compMode==="vertex"){const f=this.picker.pickVertex(n,t,hh);if(f<0)return xn;if(o&&s.size){const g=[...s][s.size-1],v=n.edges.find(([m,p])=>m===g||p===g);if(v){const m=Ra(a,v[0],v[1]),p=mv(m),S=p.indexOf(g),E=p.indexOf(f);if(S>=0&&E>=0){const[M,w]=S<E?[S,E]:[E,S];return u(p.slice(M,w+1),"頂点列")}}}const d=a.vertexFaces().get(f);return d?.length?u(pv(a,d[0]),"シェル"):xn}return xn}marquee(t,e,n,s,r,a){const o={x:Math.min(t,n),y:Math.min(e,s)},l={x:Math.max(t,n),y:Math.max(e,s)};if(l.x-o.x<fh&&l.y-o.y<fh)return this.click(r,a);const c=g=>g.z<=1&&g.x>=o.x&&g.x<=l.x&&g.y>=o.y&&g.y<=l.y;if(this.state.compMode==="object"){let g=null;for(const m of this.state.doc.objects){const p=this.viewOf(m.id);if(p&&this.picker.vertsInRect(p,o.x,o.y,l.x,l.y).length){g=m;break}}const v=g!==this.state.selected;return this.state.select(g),{changed:v,objectChanged:v}}const h=this.state.selected,u=h?this.viewOf(h.id):void 0;if(!h||!u)return xn;const f=this.sub(a);!this.add(a)&&!f&&this.state.comp.clear();const d=this.state.comp;if(this.state.compMode==="vertex")for(const g of this.picker.vertsInRect(u,o.x,o.y,l.x,l.y))mi(d,g,f);else if(this.state.compMode==="edge")u.edges.forEach((g,v)=>{const m=h.mesh.getPosition(g[0]),p=h.mesh.getPosition(g[1]),S=this.picker.project(u,(m[0]+p[0])/2,(m[1]+p[1])/2,(m[2]+p[2])/2);c(S)&&mi(d,v,f)});else if(this.state.compMode==="face")for(let g=0;g<h.mesh.faceCount;g++){const v=h.mesh.faceCenter(g);c(this.picker.project(u,v[0],v[1],v[2]))&&mi(d,g,f)}return{changed:!0,objectChanged:!1}}growOrShrink(t){const e=this.state.selected;if(!e||this.state.compMode==="object"||!this.state.comp.size)return{changed:!1,objectChanged:!1,message:"コンポーネントを選択してください"};const n=e.mesh,s=this.state.comp;if(this.state.compMode==="vertex"){const r=t?Uc(n,s):Nc(n,s);s.clear();for(const a of r)s.add(a)}else if(this.state.compMode==="face"){const r=t?vv(n,s):_v(n,s);s.clear();for(const a of r)s.add(a)}else{const r=this.viewOf(e.id);if(!r)return xn;const a=new Set;for(const l of s){const c=r.edges[l];c&&(a.add(c[0]),a.add(c[1]))}const o=new Set(t?Uc(n,a):Nc(n,a));s.clear(),r.edges.forEach(([l,c],h)=>{o.has(l)&&o.has(c)&&s.add(h)})}return{changed:!0,objectChanged:!1,message:`${t?"選択を拡張":"選択を縮小"} — ${s.size}`}}selectBoundary(){const t=this.state.selected;if(!t)return{changed:!1,objectChanged:!1,message:"オブジェクトを選択してください"};const e=this.viewOf(t.id);if(!e)return xn;const n=new Set(gv(t.mesh).map(([s,r])=>Gt(s,r)));return n.size?(this.state.compMode="edge",this.state.comp.clear(),e.edges.forEach(([s,r],a)=>{n.has(Gt(s,r))&&this.state.comp.add(a)}),this.lastClick=null,{changed:!0,objectChanged:!1,message:`境界エッジ — ${this.state.comp.size}`}):{changed:!1,objectChanged:!1,message:"境界エッジがありません（閉じたメッシュです）"}}selectedVertices(){const t=this.state.selected;if(!t)return[];const e=this.viewOf(t.id),n=new Set;if(this.state.compMode==="vertex")for(const s of this.state.comp)n.add(s);else if(this.state.compMode==="edge"&&e)for(const s of this.state.comp){const r=e.edges[s];r&&(n.add(r[0]),n.add(r[1]))}else if(this.state.compMode==="face")for(const s of this.state.comp)for(const r of t.mesh.faceVerts(s))n.add(r);else for(let s=0;s<t.mesh.vertexCount;s++)n.add(s);return[...n]}reset(){this.lastClick=null}}const X_=4e5;function dh(i,t,e){const n=new Map;for(const l of t)n.set(l,1);if(!e.enabled||e.strength<=0||!t.length)return{weights:n,skipped:!1};const s=i.vertexCount;if(s*t.length>X_)return{weights:n,skipped:!0};const r=i.positions,{radius:a,strength:o}=e;for(let l=0;l<s;l++){if(n.get(l)===1)continue;let c=1/0;for(const h of t){const u=Math.hypot(r[l*3]-r[h*3],r[l*3+1]-r[h*3+1],r[l*3+2]-r[h*3+2]);u<c&&(c=u)}if(c<a){const h=1-c/a;n.set(l,o*(h*h*(3-2*h)))}}return{weights:n,skipped:!1}}function q_(i,t){const e=new Set(t),n=i.positions,s=(o,l,c)=>`${o.toFixed(3)==="-0.000"?"0.000":o.toFixed(3)},${l.toFixed(3)},${c.toFixed(3)}`,r=new Map;for(let o=0;o<i.vertexCount;o++)r.set(s(n[o*3],n[o*3+1],n[o*3+2]),o);const a=[];for(const o of e){const l=r.get(s(-n[o*3],n[o*3+1],n[o*3+2]));l!==void 0&&l!==o&&!e.has(l)&&a.push([o,l])}return a}function ph(i){const{handle:t,pivot:e,ray:n}=i,s=Ho(t)??"move",r=t!==30&&t%10<3?t%10:-1,a=new ti().setFromNormalAndCoplanarPoint(new D().subVectors(i.cameraPosition,e).normalize(),e);let o=null;if(r<0){const l=new D;n.intersectPlane(a,l)&&(o=l)}return{kind:s,label:i.label,handle:t,axis:r,pivot:e.clone(),target:i.target,start:i.point,pivotScreen:i.pivotScreen,t0:r>=0?Go(n,e,bi[r]):0,a0:Math.atan2(i.point.y-i.pivotScreen.y,i.point.x-i.pivotScreen.x),plane:a,planeStart:o}}function $_(i,t,e,n,s){if(i.kind==="move"){let a;if(i.axis<0){const o=new D;if(!i.planeStart||!n.intersectPlane(i.plane,o))return;a=new D().subVectors(o,i.planeStart)}else{const o=bi[i.axis];a=o.clone().multiplyScalar(Go(n,i.pivot,o)-i.t0)}Ua(i,t,(o,l)=>o.clone().addScaledVector(a,l),{position:a});return}if(i.kind==="rotate"){let a=Math.atan2(e.y-i.pivotScreen.y,e.x-i.pivotScreen.x)-i.a0;const o=i.axis<0?new D().subVectors(s,i.pivot).normalize():bi[i.axis].clone();i.axis>=0&&o.dot(new D().subVectors(s,i.pivot))<0&&(a=-a),Ua(i,t,(l,c)=>{const h=new dn().setFromAxisAngle(o,-a*c);return l.clone().sub(i.pivot).applyQuaternion(h).add(i.pivot)},{rotation:new dn().setFromAxisAngle(o,-a)});return}let r;if(i.axis<0)r=new D(1,1,1).multiplyScalar(Math.max(.02,1+(e.x-i.start.x)*.008));else{const a=Go(n,i.pivot,bi[i.axis]),o=Math.max(.02,1+(a-i.t0)/Math.max(1e-4,Math.abs(i.t0))*.6);r=new D(1,1,1),r.setComponent(i.axis,o)}Ua(i,t,(a,o)=>{const l=a.clone().sub(i.pivot);return l.set(l.x*(1+(r.x-1)*o),l.y*(1+(r.y-1)*o),l.z*(1+(r.z-1)*o)),l.add(i.pivot)},{scale:r})}function Y_(i,t,e){const n=Math.max(.02,e),s=i.pivot,r=i.target,a=o=>o.clone().sub(s).multiplyScalar(n).add(s);if(r.kind==="object"){const o=r.transform,l=a(new D(o.position[0],o.position[1],o.position[2]));t.transform={position:[l.x,l.y,l.z],rotation:[...o.rotation],scale:[o.scale[0]*n,o.scale[1]*n,o.scale[2]*n]};return}for(let o=0;o<r.verts.length;o++){const l=r.world[o],c=l.clone().lerp(a(l),r.weights[o]).applyMatrix4(r.inverse);t.mesh.setPosition(r.verts[o],c.x,c.y,c.z)}for(const[o,l]of r.mirror){const c=t.mesh.getPosition(o);t.mesh.setPosition(l,-c[0],c[1],c[2])}}function Ua(i,t,e,n){const s=i.target;if(s.kind==="object"){const r=s.transform,a=As(r),o=new D(r.position[0],r.position[1],r.position[2]);if(n.position){const l=o.clone().add(n.position);a.position=[l.x,l.y,l.z]}if(n.rotation){const l=n.rotation.clone().multiply(new dn(r.rotation[0],r.rotation[1],r.rotation[2],r.rotation[3]));a.rotation=[l.x,l.y,l.z,l.w];const c=o.clone().sub(i.pivot).applyQuaternion(n.rotation).add(i.pivot);a.position=[c.x,c.y,c.z]}if(n.scale){const l=n.scale;a.scale=[r.scale[0]*l.x,r.scale[1]*l.y,r.scale[2]*l.z];const c=o.clone().sub(i.pivot);c.set(c.x*l.x,c.y*l.y,c.z*l.z),c.add(i.pivot),a.position=[c.x,c.y,c.z]}t.transform=a;return}for(let r=0;r<s.verts.length;r++){const a=e(s.world[r],s.weights[r]).applyMatrix4(s.inverse);t.mesh.setPosition(s.verts[r],a.x,a.y,a.z)}for(const[r,a]of s.mirror){const o=t.mesh.getPosition(r);t.mesh.setPosition(a,-o[0],o[1],o[2])}}function Ht(i){const t=document.getElementById(i);if(!t)throw new Error(`#${i} が見つかりません`);return t}function St(i,t,e){const n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}class K_{constructor(t,e){this.stage=t,this.host=e}drag=null;attach(t){const e=t.querySelector(".phead");if(!e)return;const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("class","grip"),n.setAttribute("viewBox","0 0 8 12"),n.setAttribute("fill","currentColor");for(const[s,r]of[[2,2],[6,2],[2,6],[6,6],[2,10],[6,10]]){const a=document.createElementNS("http://www.w3.org/2000/svg","circle");a.setAttribute("cx",String(s)),a.setAttribute("cy",String(r)),a.setAttribute("r","1"),n.appendChild(a)}e.insertBefore(n,e.firstChild),e.addEventListener("touchstart",s=>s.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",s=>this.start(s,t))}place(t,e){e==="float"?(t.classList.add("floating"),t.style.left="320px",t.style.top="90px",this.stage.appendChild(t)):(t.classList.remove("floating"),t.style.left="",t.style.top="",this.stage.querySelector(`[data-zone="${e}"]`)?.appendChild(t)),this.updateDockWidths()}updateDockWidths(){for(const t of this.stage.querySelectorAll(".dock"))t.classList.toggle("narrow",!!t.querySelector('.panel[data-panel="tools"]'))}start(t,e){t.preventDefault();const n=e.getBoundingClientRect();this.drag={panel:e,key:e.dataset.panel??"",dx:t.clientX-n.left,dy:t.clientY-n.top,zones:[],hot:null},this.showDropZones(),e.classList.add("floating"),this.stage.appendChild(e),this.move(t),window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.end),window.addEventListener("pointercancel",this.end)}move=t=>{const e=this.drag;if(!e)return;const n=this.stage.getBoundingClientRect();e.panel.style.left=`${t.clientX-n.left-e.dx}px`,e.panel.style.top=`${t.clientY-n.top-e.dy}px`;let s=null;for(const r of e.zones){const a=r.el.getBoundingClientRect(),o=t.clientX>=a.left&&t.clientX<=a.right&&t.clientY>=a.top&&t.clientY<=a.bottom;r.el.classList.toggle("hot",o),o&&(s=r)}e.hot=s};end=()=>{window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.end),window.removeEventListener("pointercancel",this.end);const t=this.drag;t&&(t.hot?(this.place(t.panel,t.hot.zone),this.host.onZoneChange(t.key,t.hot.zone),this.host.onMessage(`${t.panel.querySelector(".phead span")?.textContent??""}を${t.hot.name}にドッキング`)):this.host.onZoneChange(t.key,"float"),this.hideDropZones(),this.drag=null,this.updateDockWidths(),setTimeout(()=>this.host.onLayoutChange(),0))};showDropZones(){const t=this.drag;if(!t)return;const e=this.stage.getBoundingClientRect(),n=[{zone:"left",name:"左",x:64,y:0,w:200,h:e.height},{zone:"rightTop",name:"右上",x:e.width-236,y:0,w:236,h:e.height*.62},{zone:"rightBottom",name:"右下",x:e.width-236,y:e.height*.62,w:236,h:e.height*.38}];for(const s of n){const r=St("div","dropz");r.style.left=`${s.x}px`,r.style.top=`${s.y}px`,r.style.width=`${s.w}px`,r.style.height=`${s.h}px`,r.appendChild(St("span",void 0,s.name)),this.stage.appendChild(r),t.zones.push({el:r,zone:s.zone,name:s.name})}}hideDropZones(){for(const t of this.stage.querySelectorAll(".dropz"))t.remove()}}const Z_=180,J_=420,mh="macbeth.dockSize";class j_{constructor(t,e,n){this.stage=t,this.dockCol=e,this.onChange=n;try{const s=localStorage.getItem(mh);s&&(this.sizes={...this.sizes,...JSON.parse(s)})}catch{}this.grip=document.createElement("div"),this.grip.className="dockgrip",this.stage.appendChild(this.grip),this.attachGrip(),this.apply(),window.addEventListener("resize",()=>this.apply())}grip;sizes={landscape:236,portrait:240};portrait=!1;apply(){const t=this.stage.getBoundingClientRect(),e=t.height>t.width,n=e!==this.portrait;this.portrait=e,this.stage.classList.toggle("portrait",e),this.setSize(this.size),this.grip.classList.toggle("vertical",!e),this.grip.classList.toggle("horizontal",e),this.placeGrip(),n&&this.onChange()}get size(){return this.portrait?this.sizes.portrait:this.sizes.landscape}setSize(t){const e=Math.max(Z_,Math.min(J_,t));this.portrait?this.sizes.portrait=e:this.sizes.landscape=e,this.stage.style.setProperty("--dockw",`${e}px`),this.placeGrip()}placeGrip(){const t=!this.dockCol.querySelector(".panel");if(this.grip.hidden=t,t)return;const e=this.stage.getBoundingClientRect(),n=this.dockCol.getBoundingClientRect();this.portrait?(this.grip.style.top=`${n.top-e.top-3}px`,this.grip.style.left=""):(this.grip.style.left=`${n.left-e.left-3}px`,this.grip.style.top="")}attachGrip(){let t=!1;this.grip.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),this.grip.addEventListener("pointerdown",e=>{e.preventDefault(),t=!0,this.grip.classList.add("active"),this.grip.setPointerCapture(e.pointerId)}),this.grip.addEventListener("pointermove",e=>{if(!t)return;const n=this.stage.getBoundingClientRect();this.setSize(this.portrait?n.bottom-e.clientY:n.right-e.clientX),this.onChange()});for(const e of["pointerup","pointercancel"])this.grip.addEventListener(e,()=>{if(t){t=!1,this.grip.classList.remove("active");try{localStorage.setItem(mh,JSON.stringify(this.sizes))}catch{}this.onChange()}})}get isPortrait(){return this.portrait}}class gh{constructor(t,e,n,s,r,a,o){this.state=t,this.which=n,this.labelId=s,this.valueId=r,this.onInput=a,this.onCommit=o,this.root=Ht(e),this.fill=this.root.querySelector(".fill"),this.knob=this.root.querySelector(".knob"),this.attach(),this.paint()}root;fill;knob;active=!1;paint(){const t=this.state.gauge(this.which),e=t.get(this.state),n=(e-t.min)/(t.max-t.min);this.fill.style.height=`${n*100}%`,this.knob.style.bottom=`calc(${n*100}% - 1px)`,Ht(this.labelId).textContent=t.label,this.root.title=t.full,Ht(this.valueId).textContent=e.toFixed(2),this.root.dataset.off=this.which==="g1"&&e<=0?"true":"false"}setFromY(t){const e=this.state.gauge(this.which),n=this.root.getBoundingClientRect(),s=Math.max(0,Math.min(1,1-(t-n.top)/n.height)),r=e.min+s*(e.max-e.min);e.set(this.state,Math.round(r/e.step)*e.step),this.paint(),this.onInput()}attach(){const t=this.root;t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>{e.preventDefault(),this.active=!0,t.setPointerCapture(e.pointerId),this.setFromY(e.clientY)}),t.addEventListener("pointermove",e=>{this.active&&this.setFromY(e.clientY)});for(const e of["pointerup","pointercancel"])t.addEventListener(e,()=>{this.active&&(this.active=!1,this.onCommit())})}}const Q_={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"},tx={wire:"WIRE",shaded:"SHADED",shadedWire:"SHADED+WIRE",smooth:"SMOOTH"};class ex{constructor(t){this.state=t}toastTimer=null;refreshStats(){const t=this.state.doc.stats();let e=0;for(const r of this.state.doc.objects)e+=r.mesh.stats().edges;Ht("hudStats").innerHTML=`<i>Verts</i><span>${t.vertices}</span><i>Edges</i><span>${e}</span><i>Faces</i><span>${t.faces}</span><i>Tris</i><span>${t.triangles}</span>`;const n=Q_[this.state.compMode],s=tx[this.state.display];Ht("hudMode").innerHTML=`${this.state.tool}${this.state.symX?" · 対称X":""} · <b>${n}</b>`+(this.state.comp.size?` · ${this.state.comp.size}`:"")+`<br>${s} · ${this.state.viewName}${this.state.camOpts.ortho?" · ORTHO":""}`+(this.state.selected?` · ${this.state.selected.name}`:"")}toast(t){Ht("hudHint").innerHTML=t,this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.defaultHint(),2800)}defaultHint(){this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=null,Ht("hudHint").innerHTML=(this.state.fingerCam?"指1本 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>":"指1本 メッシュ上 <kbd>ツール</kbd> / 外 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>")+" · 指2本 <kbd>パン / ズーム</kbd> · <b>指3本でつまむ <kbd>選択を拡大縮小</kbd></b><br>指2本長押し <kbd>カメラ / 編集メニュー</kbd> · 指2本ダブルタップ <kbd>戻る</kbd> · 指3本ダブルタップ <kbd>進む</kbd><br><kbd>F</kbd> + ドラッグ <kbd>矩形選択</kbd> · <kbd>F</kbd> + ピンチ <kbd>選択中心へズーム</kbd><br>マウス <kbd>Alt+左 タンブル</kbd> <kbd>Alt+中 パン</kbd> <kbd>Alt+右 ズーム</kbd>"}setSaveNote(t){Ht("saveNote").textContent=t}}function Na(i,t){const e=St("div","panel");e.dataset.panel=i;const n=St("div","phead");n.appendChild(St("span",void 0,t));const s=St("div","pbody");return e.append(n,s),{panel:e,body:s}}function gi(i,t){const e=St("div","sect"),n=St("div","sect-h");return n.appendChild(St("span",void 0,i)),t&&n.appendChild(St("b",void 0,t)),e.appendChild(n),e}function Qn(i,t){const e=St("div","row");e.appendChild(St("label",void 0,t.label));const n=St("input","num");n.type="text",n.readOnly=!0;const s=a=>{n.value=t.format?t.format(a):a.toFixed(t.step<1?2:0)};s(t.value),e.appendChild(n);const r=St("input","slider");r.type="range",r.min=String(t.min),r.max=String(t.max),r.step=String(t.step),r.value=String(t.value),r.addEventListener("input",()=>{const a=Number(r.value);s(a),t.onInput(a)});for(const a of["change","pointerup"])r.addEventListener(a,()=>t.onCommit?.());e.appendChild(r),i.appendChild(e)}function nx(i,t,e,n){const s=St("button","chk");s.setAttribute("aria-pressed",String(e)),s.appendChild(St("i")),s.appendChild(St("span",void 0,t)),s.addEventListener("click",()=>{const r=s.getAttribute("aria-pressed")!=="true";s.setAttribute("aria-pressed",String(r)),n(r)}),i.appendChild(s)}function ix(i,t,e){i.textContent="";const n=t.selected;if(t.tool==="multicut"){const r=gi("マルチカット","MULTI CUT");Qn(r,{label:"ステップ % スナップ",value:t.cut.snapStep,min:0,max:50,step:5,format:a=>a?`${Math.round(a)}%`:"オフ",onInput:a=>e.onCutChange("snapStep",a)}),nx(r,"エッジフロー",t.cut.edgeFlow,a=>e.onCutChange("edgeFlow",a)),r.appendChild(St("div","hint",`ホバーで入る位置を先に見せます。Shift で 50% に固定。
エッジフローは頂点法線による三次補間で、ループをサーフェスに沿わせます。`)),i.appendChild(r)}if(t.tool==="bevel"||t.bevelActive){const r=gi("ベベル","BEVEL");Qn(r,{label:"幅",value:t.bevel.width,min:.005,max:2,step:.005,format:a=>a.toFixed(3),onInput:a=>e.onBevelChange("width",a)}),Qn(r,{label:"セグメント",value:t.bevel.segments,min:1,max:8,step:1,onInput:a=>e.onBevelChange("segments",a)}),r.appendChild(St("div","hint",t.bevelActive?`確定したあとでも、ここを動かすとかけ直します。
別の操作をすると確定します。`:`エッジを選んで左右にドラッグすると幅が決まります。
セグメント 1 で面取り、2 以上で丸めになります。`)),i.appendChild(r)}if(t.compMode==="face"||t.compMode==="edge"){const r=gi("押し出し","EXTRUDE");Qn(r,{label:"距離",value:t.extrudeDist,min:.05,max:3,step:.05,onInput:a=>e.onExtrudeDistChange(a)}),r.appendChild(St("div","hint",`編集メニューの「押し出し」で使う距離です。
SHF を押しながらドラッグする場合は距離ではなく動かした量になります。`)),i.appendChild(r)}if(t.compMode!=="object"){const r=gi("ソフト選択","SOFT SELECT");Qn(r,{label:"強度",value:t.soft.strength,min:0,max:1,step:.01,onInput:a=>e.onSoftChange("strength",a)}),Qn(r,{label:"範囲",value:t.soft.radius,min:.05,max:6,step:.05,onInput:a=>e.onSoftChange("radius",a)}),i.appendChild(r)}if(n){const r=as[n.kind];if(n.parametric&&r){const a=gi("入力ノード",r.en.toUpperCase()),o=St("div","attr-title",n.name);o.appendChild(St("span",void 0,r.en)),a.appendChild(o);for(const l of r.params)Qn(a,{label:l.label,value:n.params[l.key]??l.value,min:l.min,max:l.max,step:l.step,onInput:c=>e.onParamInput(n,l.key,c),onCommit:()=>e.onParamCommit(n,`${l.label} を変更`)});a.appendChild(St("div","hint",`パラメトリックなので、値を変えると作り直されます。
編集すると通常のメッシュになります。`)),i.appendChild(a)}else{const a=gi("メッシュ","MESH"),o=n.mesh.stats();a.appendChild(St("div","attr-title",n.name)),a.appendChild(St("div","hint",`頂点 ${o.vertices} · エッジ ${o.edges} · 面 ${o.faces}`)),i.appendChild(a)}}const s=gi("表示","DISPLAY");Qn(s,{label:"スムージング角度",value:t.smoothAngle,min:0,max:180,step:1,format:r=>`${Math.round(r)}°`,onInput:r=>e.onSmoothAngleChange(r)}),i.appendChild(s),i.children.length||i.appendChild(St("div","empty","選択すると内容が出ます"))}function sx(i,t,e,n){if(i.textContent="",!t.length){i.appendChild(St("div","empty",`オブジェクトがありません
ツール列から追加してください`));return}for(const s of t){const r=St("button","olrow");r.setAttribute("aria-selected",String(s===e)),r.appendChild(St("i","dot")),r.appendChild(St("span","nm",s.name)),r.appendChild(St("span","ty",s.parametric?s.kind:"mesh")),rx(r,s,n),i.appendChild(r)}}function rx(i,t,e){let n=null,s=0,r=0,a=!1,o=0;i.addEventListener("touchstart",c=>c.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",c=>c.preventDefault()),i.addEventListener("pointerdown",c=>{if(s=c.clientX,r=c.clientY,a=!1,c.pointerType==="mouse"&&c.button===2){a=!0,e.onOutlinerMenu(t,c.clientX,c.clientY);return}n=setTimeout(()=>{a=!0,e.onOutlinerMenu(t,s,r)},420)});const l=()=>{n!==null&&clearTimeout(n),n=null};i.addEventListener("pointermove",c=>{Math.hypot(c.clientX-s,c.clientY-r)>12&&l()}),i.addEventListener("pointerup",()=>{if(l(),a)return;const c=performance.now();if(c-o<400){o=0,ax(i,t,e);return}o=c,e.onSelect(t)}),i.addEventListener("pointercancel",l)}function ax(i,t,e){const n=i.querySelector(".nm");if(!n)return;const s=St("input","olinput");s.value=t.name,n.replaceWith(s),s.focus(),s.select();let r=!1;const a=o=>{if(r)return;r=!0,o&&s.value.trim()&&e.onRename(t,s.value.trim());const l=St("span","nm",t.name);s.replaceWith(l)};s.addEventListener("blur",()=>a(!0)),s.addEventListener("keydown",o=>{o.key==="Enter"&&a(!0),o.key==="Escape"&&a(!1)})}const Oe=(i,t,e)=>({label:i,detail:t,note:e}),ox={uv:{kicker:"未実装 — 次のフェーズ",title:"UV エディタ",body:"2D の UV ビューと 3D ビューを左右に並べ、片方の選択がもう片方に同期します。モデリングモードで面を選択すると、対応する UV シェルが選択された状態でこのモードに入ります。",items:[Oe("展開","LSCM による対話的なアンフォールド","自前実装"),Oe("自動 UV","シーム自動生成とアトラス化","xatlas"),Oe("カット / ソー","ペンでシームを描いて切り開く、縫い合わせる","自前実装"),Oe("レイアウト","シェルのパッキングと UDIM 1001–1010","xatlas"),Oe("歪みの可視化","チェッカーマップとヒートマップ表示","自前実装")]},sculpt:{kicker:"未実装 — v1.5 の中核",title:"スカルプト",body:"モデリングモードで作ったローモデルを、クリースとディバイドでハイメッシュ化します。ディバイドスライダーを下げてモデリングに戻り頂点を編集すると、ハイメッシュのディテールを保ったままローモデルを調整できます。左のゲージはそのまま「ブラシ強度」と「ブラシサイズ」に置き換わります。",items:[Oe("ブラシ","Standard / Clay / Move / Smooth / Pinch / Inflate / Flatten / Trim / Polish","11 種"),Oe("サブディビジョン","接空間デルタによるマルチ解像度スタック","docs/03"),Oe("マスキング","ペン描画、キャビティ、ポリグループ、裏面マスク","自前実装"),Oe("対称","X / Y / Z 軸対称と放射状対称","自前実装"),Oe("レイヤー","レベルごとのデルタバッファと強度スライダー","v1.5")]},material:{kicker:"未実装 — v2.0 予定",title:"マテリアル",body:"2D ビュー（UV 空間）と 3D ビューを同時に表示し、両方で同期してペイントします。Substance のファイル形式は非公開のため直接は読めません。書き出したテクスチャセットを命名規則で自動認識する方式で対応します。左のゲージは「不透明度」と「ブラシサイズ」に置き換わります。",items:[Oe("チャンネル","BaseColor / Roughness / Metallic / Normal / Height / AO / Emissive","7 種"),Oe("レイヤー","塗り、ペイント、マスク、フォルダ、ブレンドモード","自前実装"),Oe("ベイク","法線、AO、カーブチャ、厚み、ポジション、ID","2K 既定"),Oe("読み込み","テクスチャセット（PNG / TGA / EXR）と MaterialX",".sbsar 不可"),Oe("書き出し","テクスチャセット、glTF、MaterialX","自前実装")]}};function lx(i){const t=St("div","stub"),e=St("div","stub-in");e.appendChild(St("div","kicker",i.kicker)),e.appendChild(St("h2",void 0,i.title)),e.appendChild(St("p",void 0,i.body));const n=St("ul");for(const s of i.items){const r=St("li");r.appendChild(St("b",void 0,s.label)),r.appendChild(St("span",void 0,s.detail)),r.appendChild(St("em",void 0,s.note)),n.appendChild(r)}return e.appendChild(n),t.appendChild(e),t}const ut={move:'<path d="M12 3v18M3 12h18M12 3l-2.6 2.6M12 3l2.6 2.6M12 21l-2.6-2.6M12 21l2.6-2.6M3 12l2.6-2.6M3 12l2.6 2.6M21 12l-2.6-2.6M21 12l-2.6 2.6"/>',rotate:'<path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4"/><path d="M20.5 3.6v5h-5"/>',scale:'<path d="M5 19 18 6"/><path d="M12.5 6H18v5.5"/><rect x="3.2" y="15.2" width="5.6" height="5.6" rx=".8"/>',multicut:'<circle cx="5.5" cy="5.5" r="2.3"/><circle cx="5.5" cy="18.5" r="2.3"/><path d="M7.4 6.8 20 18M7.4 17.2 20 6"/>',extrude:'<path d="M4.5 13.5h8v7h-8z"/><path d="m4.5 13.5 4-4h8v7M12.5 13.5l4-4"/><path d="M20 3v5m0-5-1.8 1.8M20 3l1.8 1.8"/>',prim:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',camera:'<path d="M3.4 8.4h3.2l1.6-2.4h7.6l1.6 2.4h3.2v9.8a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1z"/><circle cx="12" cy="13" r="3.4"/>',shade:'<circle cx="12" cy="12" r="8.8"/><path d="M12 3.2a8.8 8.8 0 0 1 0 17.6z" fill="currentColor" fill-opacity=".5"/>',vObj:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/>',vVert:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="6" r="2" fill="currentColor"/><circle cx="6" cy="18" r="2" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/>',vEdge:'<rect x="6" y="6" width="12" height="12"/><path d="M6 6h12" stroke-width="3.4"/>',vFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".45"/>',vVertFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".2"/><circle cx="8.6" cy="8.6" r="2.1" fill="currentColor"/>',vMulti:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="1.9" fill="currentColor"/><path d="M6 18h12" stroke-width="3"/>',wire:'<rect x="4" y="4" width="16" height="16"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',shaded:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".5"/>',shadedWire:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".3"/><path d="M4 12h16M12 4v16"/>',smooth:'<circle cx="12" cy="12" r="8.6" fill="currentColor" fill-opacity=".5"/><path d="M8 15.4a6 6 0 0 1 5-6.6"/>',sym:'<path d="M12 3v18" stroke-dasharray="2.4 2.4"/><path d="M9.4 7 4.5 12l4.9 5zM14.6 7l4.9 5-4.9 5z"/>',xform:'<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="6.5"/><rect x="16.6" y="16.6" width="4.2" height="4.2"/><path d="M12 3l-2 2M12 3l2 2M3 12l2-2M3 12l2 2"/>',rename:'<path d="M4 20h16"/><path d="M15.4 4.6 19 8.2 8.6 18.6 4.4 19.6l1-4.2z"/>',dup:'<rect x="3.6" y="3.6" width="12" height="12" rx="1"/><path d="M8.4 20.4h12v-12"/>',del:'<path d="M4 6.6h16M9.4 6.6V4.4h5.2v2.2M6.4 6.6l1 13.2a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l1-13.2"/>',frame:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3"/>',mModel:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',mUV:'<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="1"/><path d="M3.4 12h17.2M12 3.4v17.2" stroke-dasharray="2.6 2.2"/>',mSculpt:'<path d="M16.4 3.6 20.4 7.6 9.6 18.4l-5.2 1.2 1.2-5.2z"/><path d="m14.4 5.6 4 4"/>',mMaterial:'<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a8.6 8.6 0 0 1 0 17.2z" fill="currentColor" fill-opacity=".45"/><path d="M3.4 12h17.2"/>',pCube:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',pSphere:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',pCylinder:'<ellipse cx="12" cy="5.6" rx="7" ry="2.8"/><path d="M5 5.6v12.8M19 5.6v12.8"/><path d="M5 18.4a7 2.8 0 0 0 14 0"/>',pCone:'<path d="M12 3 19 18.4M12 3 5 18.4"/><ellipse cx="12" cy="18.4" rx="7" ry="2.8"/>',pTorus:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><ellipse cx="12" cy="12" rx="3.6" ry="1.9"/>',pPlane:'<path d="M2.6 16.4 9.4 6.6h12L14.6 16.4z"/><path d="M6 11.5h12"/>',pDisk:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><path d="M2.8 12h18.4"/>',pPlatonic:'<path d="m12 2.8 8.8 6.4-3.4 10.4H6.6L3.2 9.2z"/><path d="M12 2.8v16.8M3.2 9.2l13.8 10M20.8 9.2 7 19.2"/>'};function cx(i,t=18,e=1.6){return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">${i}</svg>`}const hx=["N","NE","E","SE","S","SW","W","NW"],$i="http://www.w3.org/2000/svg",vi=132,Fa=40,ux=30,Wo=176,ys=26,vh=14;let Re=null;function fx(i,t,e,n,s,r){const a=i+Math.cos(s)*n,o=t+Math.sin(s)*n,l=i+Math.cos(r)*n,c=t+Math.sin(r)*n,h=i+Math.cos(r)*e,u=t+Math.sin(r)*e,f=i+Math.cos(s)*e,d=t+Math.sin(s)*e;return`M${a},${o}A${n},${n} 0 0 1 ${l},${c}L${h},${u}A${e},${e} 0 0 0 ${f},${d}Z`}function _r(i,t,e,n){const s=document.createElementNS($i,"text");return i&&s.setAttribute("class",i),s.setAttribute("x",String(t)),s.setAttribute("y",String(e)),s.setAttribute("text-anchor","middle"),s.textContent=n,s}function Ki(i,t,e,n=[]){ul();const s=n.length?vh+n.length*ys:0,r=Math.max(vi+16,Math.min(window.innerWidth-vi-16,t)),a=Math.max(vi+16,Math.min(window.innerHeight-vi-s-16,e)),o=document.createElement("div");o.className="radial",o.addEventListener("touchstart",d=>d.preventDefault(),{passive:!1}),o.addEventListener("touchmove",d=>d.preventDefault(),{passive:!1});const l=document.createElementNS($i,"svg");o.appendChild(l),document.body.appendChild(o);const c=[];for(let d=0;d<8;d++){const g=i[hx[d]],v=(d*45-22.5-90)*Math.PI/180,m=(d*45+22.5-90)*Math.PI/180,p=document.createElementNS($i,"path");if(p.setAttribute("d",fx(r,a,Fa,vi,v,m)),p.setAttribute("fill",g?"#2c3238":"#23272c"),p.setAttribute("stroke","#171a1e"),p.setAttribute("stroke-width","1"),p.setAttribute("opacity",g?"1":".45"),l.appendChild(p),!g){c.push(null);continue}const S=(v+m)/2,E=(Fa+vi)/2,M=r+Math.cos(S)*E,w=a+Math.sin(S)*E,y=document.createElementNS($i,"g");y.setAttribute("transform",`translate(${M-10},${w-23}) scale(0.84)`),y.setAttribute("fill","none"),y.setAttribute("stroke","#dfe5ea"),y.setAttribute("stroke-width","1.6"),y.setAttribute("stroke-linecap","round"),y.setAttribute("stroke-linejoin","round"),y.innerHTML=g.icon??"",l.appendChild(y),l.appendChild(_r(null,M,w+10,g.label)),l.appendChild(_r("sub",M,w+21,g.sub??"")),c.push({path:p,icon:y,item:g,index:d})}const h=document.createElementNS($i,"circle");h.setAttribute("cx",String(r)),h.setAttribute("cy",String(a)),h.setAttribute("r",String(Fa-2)),h.setAttribute("fill","#20242a"),h.setAttribute("stroke","#3d454e"),l.appendChild(h),l.appendChild(_r("sub",r,a+4,"キャンセル"));const u=[],f=a+vi+vh;n.forEach((d,g)=>{const v=f+g*ys,m=document.createElementNS($i,"rect");m.setAttribute("x",String(r-Wo/2)),m.setAttribute("y",String(v)),m.setAttribute("width",String(Wo)),m.setAttribute("height",String(ys)),m.setAttribute("fill","#2c3238"),m.setAttribute("stroke","#171a1e"),l.appendChild(m);const p=_r(null,r,v+ys/2+4,d.label);l.appendChild(p),u.push({rect:m,label:p,item:d,top:v})}),Re={host:o,slices:c,rows:u,cx:r,cy:a,selected:-1,selectedRow:-1},window.addEventListener("pointermove",Mu),window.addEventListener("pointerup",Ir),window.addEventListener("pointercancel",Ir)}function Mu(i){if(!Re)return;const t=i.clientX-Re.cx,e=i.clientY-Re.cy;let n=-1;Math.abs(t)<=Wo/2&&(n=Re.rows.findIndex(r=>i.clientY>=r.top&&i.clientY<r.top+ys)),n!==Re.selectedRow&&(Re.rows.forEach((r,a)=>r.rect.setAttribute("fill",a===n?"#2f5f7d":"#2c3238")),Re.selectedRow=n,n>=0&&navigator.vibrate?.(6));let s=-1;if(n<0&&Math.hypot(t,e)>=ux){const r=(Math.atan2(e,t)*180/Math.PI+90+360+22.5)%360,a=Math.floor(r/45);Re.slices[a]&&(s=a)}if(s!==Re.selected){for(const r of Re.slices){if(!r)continue;const a=r.index===s;r.path.setAttribute("fill",a?"#2f5f7d":"#2c3238"),r.path.setAttribute("stroke",a?"#4f9fd1":"#171a1e"),r.icon.setAttribute("stroke",a?"#ffffff":"#dfe5ea")}Re.selected=s,s>=0&&navigator.vibrate?.(6)}}function Ir(){if(!Re)return;const{selected:i,selectedRow:t,slices:e,rows:n}=Re;ul(),t>=0?n[t]?.item.run():i>=0&&e[i]?.item.run()}function ul(){Re&&(window.removeEventListener("pointermove",Mu),window.removeEventListener("pointerup",Ir),window.removeEventListener("pointercancel",Ir),Re.host.remove(),Re=null)}function _h(i,t,e){let n=null,s=!1,r=0,a=0,o=null;const l=()=>{n!==null&&clearTimeout(n),n=null};i.addEventListener("touchstart",u=>u.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",u=>u.preventDefault()),i.addEventListener("pointerdown",u=>{if(u.preventDefault(),o=u.pointerId,r=u.clientX,a=u.clientY,s=!1,u.pointerType==="mouse"&&u.button===2){s=!0,Ki(t(),r,a);return}n=setTimeout(()=>{s=!0,Ki(t(),r,a)},200)});const c=u=>{u.pointerId===o&&Math.hypot(u.clientX-r,u.clientY-a)>12&&l()},h=u=>{u.pointerId===o&&(l(),o=null,s||e?.(),s=!1)};window.addEventListener("pointermove",c),window.addEventListener("pointerup",h),window.addEventListener("pointercancel",h)}const Oa=[{id:"object",label:"オブジェクト",key:"F8"},{id:"vertex",label:"頂点",key:"F9"},{id:"edge",label:"エッジ",key:"F10"},{id:"face",label:"フェース",key:"F11"}],dx={4:"wire",5:"shaded",6:"shadedWire",7:"smooth"},qi={model:"モデリング",uv:"UV",sculpt:"スカルプト",material:"マテリアル"},px={object:ut.vObj,vertex:ut.vVert,edge:ut.vEdge,face:ut.vFace},mx={cube:ut.pCube,sphere:ut.pSphere,cylinder:ut.pCylinder,cone:ut.pCone,torus:ut.pTorus,plane:ut.pPlane,disk:ut.pDisk,platonic:ut.pPlatonic};class gx{state=new y_;history=new E_(this.state);viewport;picker;selector;autosave=new L_(this.state);hud=new ex(this.state);gauges=[];marqueeEl=Ht("marquee");marquee=null;popup=null;router;manipulator;multicut;preselect;bevel=new F_;weldTarget=null;gestureDrag=null;gestureMoved=!1;bevelSnapshot=null;docking;layout;zones={tools:"left",options:"rightTop",outliner:"rightBottom"};toolPanelBody=null;optionsBody=null;outlinerBody=null;paramSnapshot=null;drag=null;dragSnapshot=null;raycaster=new Wh;constructor(){const t=Ht("vp"),e=Ht("gl");this.viewport=new g_(t,e,this.state),this.picker=new p_(this.viewport,t),this.selector=new W_(this.state,this.picker,n=>{const s=this.state.doc.find(n);return s?this.viewport.viewOf(s):void 0}),this.multicut=new B_(this.state,this.picker,this.viewport.preview),this.preselect=new V_(this.state,this.picker,this.viewport.preselect),this.viewport.softWeightsProvider=()=>{const n=this.state.selected;return n?dh(n.mesh,this.selector.selectedVertices(),{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0}).weights:new Map},this.manipulator=new M_({toScreen:n=>{const s=n.clone().project(this.viewport.camera);return{x:(s.x+1)/2*(t.clientWidth||1),y:(-s.y+1)/2*(t.clientHeight||1),z:s.z}},camera:()=>this.viewport.camera,orthoDistance:()=>this.state.camOpts.ortho?this.viewport.cam.distance:null}),this.viewport.manip.add(this.manipulator.group),this.history.onChange=()=>{this.updateHistoryButtons(),this.autosave.schedule()},this.autosave.onSaved=n=>this.hud.setSaveNote(`自動保存 ${new Date(n).toLocaleTimeString("ja-JP",{timeStyle:"short"})}`),this.autosave.onError=n=>this.hud.toast(n),this.router=new f_(e,n=>this.picker.local(n),this.gestureHandlers()),this.router.attach(),this.docking=new K_(Ht("stage"),{onZoneChange:(n,s)=>{this.zones[n]=s,localStorage.setItem("macbeth.panelZones",JSON.stringify(this.zones))},onMessage:n=>this.hud.toast(n),onLayoutChange:()=>{this.layout?.apply(),this.viewport.resize()}});try{const n=localStorage.getItem("macbeth.panelZones");n&&(this.zones={...this.zones,...JSON.parse(n)})}catch{}this.buildToolDock(),this.buildPanels(),this.layout=new j_(Ht("stage"),Ht("dockColRight"),()=>this.viewport.resize()),this.buildGauges(),this.buildCluster(),this.bindKeyboard(),this.bindTopBar(),window.addEventListener("resize",()=>this.viewport.resize()),this.viewport.resize(),this.viewport.start()}async boot(){const t=await this.autosave.restore();t||this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]??null),this.viewport.syncAll(),this.refresh(),this.hud.defaultHint(),t?this.hud.toast("前回の続きを復元しました"):this.hud.setSaveNote(U_())}gestureHandlers(){return{toolDown:(t,e)=>this.startTool(t,e),toolMove:(t,e)=>this.moveTool(t,e),toolUp:(t,e,n)=>this.finishTool(t,e,n),hover:(t,e)=>{this.updateCutPreview(t,e),this.updatePreselect(t,e)},hoverLeave:()=>{this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},openMarkingMenu:(t,e,n)=>this.openMarkingMenu(t,e,n),openTwoFingerMenu:(t,e)=>this.openTwoFingerMenu(t,e),undo:()=>this.doUndo(),redo:()=>this.doRedo(),abort:()=>{this.endMarquee(),this.drag=null,this.dragSnapshot=null,this.manipulator.hot=-1,this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},isOnMesh:(t,e)=>{const n=this.tolerance(e);return this.state.selected&&this.manipulator.pick(t,this.pivotWorld(),this.state.manip,n)>=0?!0:this.hitSelectedComponent(t,n)||!!this.picker.pickSurface(t)},zoomPivot:()=>this.pivotWorld(),marqueeStart:t=>this.startMarquee(t),tumble:(t,e)=>this.viewport.tumble(t,e),pan:(t,e)=>this.viewport.pan(t,e),dolly:t=>this.viewport.dolly(t),dollyAbout:(t,e)=>this.viewport.dollyAbout(t,e),transformBegin:()=>this.beginGestureTransform(),transformUpdate:t=>this.updateGestureTransform(t),transformEnd:()=>this.endGestureTransform(),shiftOn:t=>this.state.modOn("shift")||t.shiftKey,altOn:t=>this.state.modOn("alt")||t.altKey}}beginGestureTransform(){if(this.state.tool!=="select")return!1;const t=this.state.selected,e=this.pivotWorld();if(!t||!e)return!1;const n=this.captureTarget();if(!n)return!1;const s=this.manipulator.toScreen(e);return this.dragSnapshot=this.history.snapshot(),this.gestureDrag=ph({handle:v_,pivot:e,target:n,point:s,pivotScreen:s,ray:this.ray(s),cameraPosition:this.cameraPosition(),label:"スケール"}),this.gestureMoved=!1,!0}updateGestureTransform(t){const e=this.gestureDrag,n=this.state.selected;if(!(!e||!n)){if(Y_(e,n,t),this.gestureMoved=!0,e.target.kind==="object"){const s=this.viewport.viewOf(n);s&&(un(s.group,n.transform),s.group.updateMatrixWorld())}else this.viewport.refreshPositions(n);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats(),Ht("hudHint").innerHTML=`スケール <kbd>×${t.toFixed(2)}</kbd> · 指 3 本`}}endGestureTransform(){const t=this.gestureMoved;this.gestureDrag=null,this.gestureMoved=!1,t&&this.dragSnapshot&&this.history.commit("スケール",this.dragSnapshot),this.dragSnapshot=null,this.refresh(),this.hud.defaultHint()}ray(t){return this.raycaster.setFromCamera(this.picker.ndc(t),this.viewport.camera),this.raycaster.ray}cameraPosition(){return this.viewport.camera.position}tolerance(t){return t.pointerType==="touch"?__:1}hitSelectedComponent(t,e=1){const n=this.state.selected,s=n?this.viewport.viewOf(n):void 0;if(!n||!s||!this.state.comp.size)return!1;if(this.state.compMode==="face"){const r=this.picker.pickSurface(t);return!!r&&r.object===n&&this.state.comp.has(r.face)}if(this.state.compMode==="vertex"){const r=this.picker.pickVertex(s,t,22*e);return r>=0&&this.state.comp.has(r)}if(this.state.compMode==="edge"){const r=this.picker.pickEdge(s,t,16*e);return r.edge>=0&&this.state.comp.has(r.edge)}return!1}captureTarget(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;if(e.group.updateMatrixWorld(),this.state.compMode==="object")return{kind:"object",transform:As(t.transform)};const n=this.selector.selectedVertices();if(!n.length)return null;const s=dh(t.mesh,n,{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0});s.skipped&&this.hud.toast("範囲が広すぎるのでソフト選択を省きました");const r=[],a=[],o=[];for(const[l,c]of s.weights){const h=t.mesh.getPosition(l);r.push(l),a.push(c),o.push(new D(h[0],h[1],h[2]).applyMatrix4(e.group.matrixWorld))}return{kind:"component",verts:r,weights:a,world:o,inverse:new se().copy(e.group.matrixWorld).invert(),mirror:this.state.symX?q_(t.mesh,r):[]}}updatePreselect(t,e){if(e.pointerType==="touch"||this.state.tool==="multicut"){this.preselect.clear();return}const n=this.state.selected;this.preselect.update(t,n?this.viewport.viewOf(n):void 0)}updateCutPreview(t,e){if(this.state.tool!=="multicut")return;const n=this.state.selected,s=this.multicut.update(t,n?this.viewport.viewOf(n):void 0,this.state.modOn("shift")||e.shiftKey);s&&(Ht("hudHint").innerHTML=s)}startTool(t,e){if(this.state.tool==="multicut"){this.updateCutPreview(t,e);return}if(this.state.tool==="bevel"){this.startBevel(t);return}const n=this.state.selected,s=this.pivotWorld(),r=this.tolerance(e);let a=n?this.manipulator.pick(t,s,this.state.manip,r):-1;if(a<0&&n&&this.state.compMode!=="object"&&this.hitSelectedComponent(t,r)&&(a=cl),a<0||!n||!s){this.startMarquee(t);return}const o=this.history.snapshot();let l={move:"移動",rotate:"回転",scale:"スケール"}[Ho(a)??"move"];Ho(a)==="move"&&this.state.compMode!=="object"&&this.state.comp.size&&(this.state.modOn("shift")||e.shiftKey)&&this.extrudeForDrag(n)&&(l="押し出し");const c=this.captureTarget();if(!c){this.startMarquee(t);return}this.dragSnapshot=o,this.drag=ph({handle:a,pivot:this.pivotWorld()??s,target:c,point:t,pivotScreen:this.manipulator.toScreen(this.pivotWorld()??s),ray:this.ray(t),cameraPosition:this.cameraPosition(),label:l}),this.manipulator.hot=a,this.refreshManipulator()}extrudeForDrag(t){if(this.state.compMode==="face"){const e=Pc(t.mesh,this.state.comp,0);return e?(t.mesh=e.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),!0):!1}if(this.state.compMode==="edge"){const e=this.viewport.viewOf(t);if(!e)return!1;const n=[...this.state.comp].map(a=>e.edges[a]).filter(Boolean),s=Lc(t.mesh,n,0);if(!s)return!1;t.mesh=s.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t);const r=this.viewport.viewOf(t);if(r){const a=new Set(s.newEdges.map(([o,l])=>`${Math.min(o,l)}_${Math.max(o,l)}`));this.state.comp.clear(),r.edges.forEach(([o,l],c)=>{a.has(`${Math.min(o,l)}_${Math.max(o,l)}`)&&this.state.comp.add(c)})}return this.viewport.rebuildOverlay(),!0}return this.hud.toast("頂点の押し出しは未対応です（そのまま移動します）"),!1}moveTool(t,e){if(this.state.tool==="multicut")return this.updateCutPreview(t,e);if(this.state.tool==="bevel")return this.dragBevel(t);if(this.marquee)return this.updateMarquee(t);const n=this.drag,s=this.state.selected;if(!(!n||!s)){if($_(n,s,t,this.ray(t),this.cameraPosition()),this.updateWeldTarget(t,e,s),n.target.kind==="object"){const r=this.viewport.viewOf(s);r&&(un(r.group,s.transform),r.group.updateMatrixWorld())}else this.viewport.refreshPositions(s);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats()}}updateWeldTarget(t,e,n){if(this.weldTarget=null,this.preselect.clear(),this.state.compMode!=="vertex"||this.state.comp.size!==1)return;const s=this.viewport.viewOf(n);if(!s)return;const r=[...this.state.comp][0],a=22*this.tolerance(e),o=this.picker.pickVertexExcept(s,t,a,r);o<0||(this.weldTarget=o,this.preselect.showVertex(s,o),Ht("hudHint").innerHTML="離すと <kbd>この頂点へ溶接</kbd> します")}applyTargetWeld(t,e,n){t.mesh=cr(Io(t.mesh,[[e,n]]));const s=t.markTopologyChanged();this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let r="ターゲットウェルド";(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),this.hud.toast(r)}finishTool(t,e,n){if(this.state.tool==="multicut"){this.doMultiCut(),this.state.releaseLatches()&&this.syncModButtons();return}if(this.state.tool==="bevel"){this.endBevel(n),this.state.releaseLatches()&&this.syncModButtons();return}const s=this.marquee;if(s){this.endMarquee();const r=this.selector.marquee(s.x0,s.y0,s.x1,s.y1,t,e);this.applySelectResult(r)}else if(this.drag){const r=this.drag;if(this.drag=null,this.manipulator.hot=-1,this.preselect.clear(),!n&&r.label!=="押し出し")this.dragSnapshot=null,this.applySelectResult(this.selector.click(t,e));else if(this.dragSnapshot){const a=this.weldTarget,o=this.state.compMode==="vertex"?[...this.state.comp][0]:void 0;a!==null&&o!==void 0&&this.state.selected?(this.applyTargetWeld(this.state.selected,o,a),this.history.commit("ターゲットウェルド",this.dragSnapshot)):(this.history.commit(r.label,this.dragSnapshot),this.hud.toast(r.label)),this.dragSnapshot=null}else this.dragSnapshot=null;this.refresh()}else n||this.applySelectResult(this.selector.click(t,e));this.state.releaseLatches()&&this.syncModButtons()}selectedEdgePairs(t){const e=this.viewport.viewOf(t);return e?[...this.state.comp].map(n=>e.edges[n]).filter(Boolean):[]}startBevel(t){const e=this.state.selected;if(!e||this.state.compMode!=="edge"||!this.state.comp.size){this.hud.toast("エッジモードでエッジを選択してから、左右にドラッグしてください");return}const n=this.selectedEdgePairs(e),s=this.history.snapshot();this.bevel.begin(e,n,t.x)&&(this.bevelSnapshot=s)}dragBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;this.state.bevel.width=this.bevel.widthFromDrag(t.x-e.startX,e.scale);const s=this.bevel.apply(this.state.bevel);if(!s){this.hud.toast("この形はまだベベルできません（四角形と閉じたエッジのみ）");return}this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.hud.refreshStats(),Ht("hudHint").innerHTML=`ベベル <kbd>幅 ${this.state.bevel.width.toFixed(3)}</kbd> · <kbd>${this.state.bevel.segments} 分割</kbd> · ${s.faces} 面`}endBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;if(!t){this.bevel.cancel(),this.bevel.end(),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.refresh();return}const s=n.markTopologyChanged();this.state.comp.clear(),this.bevelSnapshot&&this.history.commit("ベベル",this.bevelSnapshot),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.refresh();let r=`ベベル — 幅 ${this.state.bevel.width.toFixed(3)} · ${this.state.bevel.segments} 分割`;(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),this.hud.toast(`${r}（オプションで作り直せます）`)}redoBevel(){const t=this.state.selected;!t||!this.bevel.active||this.bevel.apply(this.state.bevel)&&(this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats())}doMultiCut(){const t=this.state.selected;if(!t)return;const e=this.history.snapshot(),n=this.multicut.commit(this.viewport.viewOf(t));n&&(t.markTopologyChanged(),this.state.comp.clear(),this.history.commit("エッジループ挿入",e),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`エッジループを挿入しました — ${n.faceCount} 面`))}screenOfVertex(t){const e=this.state.selected,n=e?this.viewport.viewOf(e):void 0;if(!n||t>=n.object.mesh.vertexCount)return null;const s=this.picker.projectVertex(n,t);return{x:s.x,y:s.y}}refreshManipulator(){if(this.state.tool!=="select"){this.manipulator.clear();return}const t=[this.state.compMode,this.state.selected?.id??"-",this.state.comp.size,this.state.tool].join(",");this.manipulator.rebuild(this.pivotWorld(),this.state.manip,t)}setTool(t){if(this.state.tool!==t){this.bevel.active&&(this.bevel.end(),this.bevelSnapshot=null),this.state.tool=t,this.multicut.clear(),this.preselect.clear(),this.manipulator.clear(),this.refresh();for(const e of document.querySelectorAll("[data-tool]"))e.setAttribute("aria-pressed",String(e.dataset.tool===t));this.hud.toast(t==="multicut"?"マルチカット":"選択・変形"),this.hud.defaultHint()}}setDisplay(t){this.state.display=t,this.viewport.syncAll(),this.refresh(),this.hud.toast({wire:"ワイヤーフレーム",shaded:"シェード",shadedWire:"シェード + ワイヤー",smooth:"スムースシェード"}[t])}cycleDisplay(){const t=["wire","shaded","shadedWire","smooth"];this.setDisplay(t[(t.indexOf(this.state.display)+1)%t.length])}openCameraPopup(t){this.closePopup();const e=t.getBoundingClientRect(),n=St("div","panel floating");n.style.left=`${e.right+6}px`,n.style.top=`${e.top}px`;const s=St("div","pbody"),r=St("div","hint"),a=()=>{const c=2*Math.atan(24/(2*this.state.camOpts.focal))*180/Math.PI;r.textContent=`アングル オブ ビュー  ${c.toFixed(2)}°
フィルム ゲート  35mm アカデミー`},o=(c,h,u,f,d)=>{const g=St("div","row");g.appendChild(St("label",void 0,c));const v=St("input","num");v.type="text",v.readOnly=!0,v.value=String(this.state.camOpts[h]),g.appendChild(v);const m=St("input","slider");m.type="range",m.min=String(u),m.max=String(f),m.step=String(d),m.value=String(this.state.camOpts[h]),m.addEventListener("input",()=>{const p=Number(m.value);this.state.camOpts[h]=p,v.value=String(p),this.viewport.applyCamera(),a(),this.refreshManipulator()}),g.appendChild(m),s.appendChild(g)};o("焦点距離","focal",10,200,1),o("ニア クリップ","near",.01,1,.01),o("ファー クリップ","far",50,2e3,10),a(),s.appendChild(r);const l=St("button","chk");l.setAttribute("aria-pressed",String(this.state.camOpts.ortho)),l.appendChild(St("i")),l.appendChild(St("span",void 0,"平行投影")),l.addEventListener("click",()=>{this.state.camOpts.ortho=!this.state.camOpts.ortho,l.setAttribute("aria-pressed",String(this.state.camOpts.ortho)),this.viewport.applyCamera(),this.refresh()}),s.appendChild(l),n.appendChild(s),document.body.appendChild(n),this.popup=n}setManip(t){this.state.manip=t,this.manipulator.clear(),this.refreshManipulator(),this.hud.toast(`マニピュレータ: ${{all:"ユニバーサル",move:"移動",rotate:"回転",scale:"スケール"}[t]}`)}applySelectResult(t){t.changed&&(t.objectChanged&&this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),t.message&&this.hud.toast(t.message))}startMarquee(t){this.marquee={x0:t.x,y0:t.y,x1:t.x,y1:t.y},this.marqueeEl.style.display="block",this.updateMarquee(t)}updateMarquee(t){const e=this.marquee;e&&(e.x1=t.x,e.y1=t.y,this.marqueeEl.style.left=`${Math.min(e.x0,e.x1)}px`,this.marqueeEl.style.top=`${Math.min(e.y0,e.y1)}px`,this.marqueeEl.style.width=`${Math.abs(e.x1-e.x0)}px`,this.marqueeEl.style.height=`${Math.abs(e.y1-e.y0)}px`)}endMarquee(){this.marquee=null,this.marqueeEl.style.display="none"}pivotWorld(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;if(e.group.updateMatrixWorld(),this.state.compMode==="object"||!this.state.comp.size)return new D().setFromMatrixPosition(e.group.matrixWorld);const n=this.selector.selectedVertices();if(!n.length)return null;const s=new D(1/0,1/0,1/0),r=new D(-1/0,-1/0,-1/0);for(const a of n){const o=t.mesh.getPosition(a),l=new D(o[0],o[1],o[2]).applyMatrix4(e.group.matrixWorld);s.min(l),r.max(l)}return s.add(r).multiplyScalar(.5)}openMarkingMenu(t,e,n){this.closePopup(),Ki(n?this.editMenu():this.selectModeMenu(),t,e)}openTwoFingerMenu(t,e){if(this.closePopup(),this.state.selected){Ki(this.editMenu(),t,e);return}Ki(this.cameraMenu(),t,e,this.savedCameraItems())}cameraMenu(){const t=e=>({label:Ss[e].label,sub:Ss[e].sub,icon:ut.camera,run:()=>this.setView(e)});return{N:t("persp"),NE:{label:"新規カメラ",sub:"New Camera",icon:ut.camera,run:()=>this.addCamera()},E:t("right"),SE:t("bottom"),S:t("front"),SW:t("back"),W:t("top"),NW:t("left")}}savedCameraItems(){return this.state.cameras.map(t=>({label:t.name,run:()=>this.recallCamera(t)}))}setView(t){this.viewport.setView(t),this.state.viewName=Ss[t].label,this.refresh(),this.hud.toast(`${Ss[t].label}ビュー`)}addCamera(){const t=this.viewport.cam,e={name:`camera${this.state.cameras.length+1}`,theta:t.theta,phi:t.phi,distance:t.distance,target:[t.target.x,t.target.y,t.target.z],focal:this.state.camOpts.focal,ortho:this.state.camOpts.ortho};this.state.cameras.push(e),this.state.viewName=e.name,this.refresh(),this.hud.toast(`${e.name} を控えました`)}recallCamera(t){const e=this.viewport.cam;e.theta=t.theta,e.phi=t.phi,e.distance=t.distance,e.target.set(t.target[0],t.target[1],t.target[2]),this.state.camOpts.focal=t.focal,this.state.camOpts.ortho=t.ortho,this.viewport.applyCamera(),this.state.viewName=t.name,this.refresh(),this.hud.toast(`${t.name} に切り替えました`)}manipMenu(){return{N:{label:"ユニバーサル",sub:"All  T",icon:ut.xform,run:()=>this.setManip("all")},E:{label:"移動",sub:"Move  W",icon:ut.move,run:()=>this.setManip("move")},S:{label:"回転",sub:"Rotate  E",icon:ut.rotate,run:()=>this.setManip("rotate")},W:{label:"スケール",sub:"Scale  R",icon:ut.scale,run:()=>this.setManip("scale")}}}modeMenu(){const t=e=>()=>this.setMode(e);return{N:{label:qi.model,sub:"Modeling",icon:ut.mModel,run:t("model")},E:{label:qi.uv,sub:"UV Editor",icon:ut.mUV,run:t("uv")},S:{label:qi.sculpt,sub:"Sculpt",icon:ut.mSculpt,run:t("sculpt")},W:{label:qi.material,sub:"Material",icon:ut.mMaterial,run:t("material")}}}setMode(t){if(this.state.mode===t)return;this.state.mode=t,Ht("modeLabel").textContent=qi[t],this.closePopup(),this.multicut.clear(),this.preselect.clear();const e=Ht("modeStub");e.textContent="";const n=ox[t];n?(e.appendChild(lx(n)),e.hidden=!1,Ht("stage").hidden=!0):(e.hidden=!0,Ht("stage").hidden=!1,this.viewport.resize()),this.renderToolColumn(),this.refresh(),this.hud.toast(qi[t])}shadingMenu(){return{N:{label:"ワイヤーフレーム",sub:"4",icon:ut.wire,run:()=>this.setDisplay("wire")},E:{label:"シェード",sub:"5",icon:ut.shaded,run:()=>this.setDisplay("shaded")},S:{label:"シェード + ワイヤー",sub:"6",icon:ut.shadedWire,run:()=>this.setDisplay("shadedWire")},W:{label:"スムースシェード",sub:"7",icon:ut.smooth,run:()=>this.setDisplay("smooth")}}}selectModeMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return{N:{label:"エッジ",sub:"Edge",icon:ut.vEdge,run:()=>this.setCompMode("edge")},NE:{label:"オブジェクト モード",sub:"Object",icon:ut.vObj,run:()=>this.setCompMode("object")},SE:{label:"マルチ",sub:"Multi",icon:ut.vMulti,run:t("マルチコンポーネント選択")},S:{label:"フェース",sub:"Face",icon:ut.vFace,run:()=>this.setCompMode("face")},SW:{label:"頂点フェース",sub:"Vertex Face",icon:ut.vVertFace,run:t("頂点フェース選択")},W:{label:"頂点",sub:"Vertex",icon:ut.vVert,run:()=>this.setCompMode("vertex")},NW:this.state.modOn("ctrl")?{label:"選択を縮小",sub:"Shrink  <",icon:ut.vMulti,run:()=>this.growOrShrink(!1)}:{label:"選択を拡張",sub:"Grow  >",icon:ut.vMulti,run:()=>this.growOrShrink(!0)}}}editMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return this.state.compMode==="face"?{N:{label:"押し出し",sub:"Extrude",icon:ut.extrude,run:()=>this.doExtrudeFaces()},NE:{label:"ベベル",sub:"Bevel",icon:ut.scale,run:t("ベベル")},E:{label:"ブリッジ",sub:"Bridge",icon:ut.vEdge,run:t("ブリッジ")},SE:{label:"複製",sub:"Duplicate",icon:ut.dup,run:t("フェースの複製")},S:{label:"削除",sub:"Delete",icon:ut.del,run:()=>this.doDeleteFaces()},SW:{label:"コラプス",sub:"Collapse",icon:ut.vVert,run:()=>this.doCollapseFaces()},W:{label:"スムース",sub:"Smooth",icon:ut.smooth,run:()=>this.doSmooth()},NW:{label:"抽出",sub:"Extract",icon:ut.vFace,run:t("抽出")}}:this.state.compMode==="edge"?{N:{label:"押し出し",sub:"Extrude",icon:ut.extrude,run:()=>this.doExtrudeEdgesMenu()},NE:{label:"ベベル",sub:"Bevel",icon:ut.scale,run:()=>this.setTool("bevel")},E:{label:"ブリッジ",sub:"Bridge",icon:ut.vEdge,run:()=>this.doBridge()},SE:{label:"エッジループ挿入",sub:"Insert Loop",icon:ut.multicut,run:()=>this.setTool("multicut")},S:{label:"削除",sub:"Delete",icon:ut.del,run:()=>this.doDeleteEdges()},SW:{label:"スピン",sub:"Spin",icon:ut.rotate,run:t("スピンエッジ")},W:{label:"接続",sub:"Connect",icon:ut.vMulti,run:t("接続")},NW:{label:"境界を選択",sub:"Boundary",icon:ut.vEdge,run:()=>this.selectBoundary()}}:this.state.compMode==="vertex"?{N:{label:"マージ",sub:"Merge",icon:ut.vVert,run:()=>this.doMergeVertices()},NE:{label:"中心にマージ",sub:"To Center",icon:ut.vObj,run:()=>this.doMergeVertices()},E:{label:"面取り",sub:"Chamfer",icon:ut.scale,run:t("面取り")},SE:{label:"接続",sub:"Connect",icon:ut.vMulti,run:t("接続")},S:{label:"削除",sub:"Delete",icon:ut.del,run:t("頂点の削除")},SW:{label:"平均化",sub:"Average",icon:ut.smooth,run:t("平均化")},W:{label:"分離",sub:"Detach",icon:ut.vVertFace,run:t("分離")},NW:{label:"押し出し",sub:"Extrude",icon:ut.extrude,run:t("頂点の押し出し")}}:{N:{label:"スムース",sub:"Smooth",icon:ut.smooth,run:()=>this.doSmooth()},NE:{label:"中心にピボット",sub:"Center Pivot",icon:ut.vObj,run:()=>this.doCenterPivot()},E:{label:"分離",sub:"Separate",icon:ut.vVertFace,run:t("分離")},SE:{label:"複製",sub:"Duplicate",icon:ut.dup,run:()=>this.doDuplicate()},S:{label:"削除",sub:"Delete",icon:ut.del,run:()=>this.doDelete()},SW:{label:"ミラー",sub:"Mirror",icon:ut.sym,run:t("ミラー")},W:{label:"ブーリアン",sub:"Boolean",icon:ut.pCube,run:t("ブーリアン")},NW:{label:"フリーズ",sub:"Freeze",icon:ut.vObj,run:()=>this.doFreeze()}}}growOrShrink(t){this.applySelectResult(this.selector.growOrShrink(t))}selectBoundary(){const t=this.selector.selectBoundary();t.changed&&this.syncCompModeButtons(),this.applySelectResult(t),!t.changed&&t.message&&this.hud.toast(t.message)}doSmooth(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");this.history.push("スムース"),t.mesh=yv(t.mesh,1),t.markTopologyChanged(),this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`スムース — ${t.mesh.faceCount} 面`)}applyTopologyChange(t,e,n,s){const r=this.history.snapshot();if(!n())return;const a=t.markTopologyChanged();this.state.comp.clear(),this.history.commit(e,r),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let o=s(t);(a.droppedLevels||a.droppedLayers)&&(o+=` · 上位レベル ${a.droppedLevels} とレイヤー ${a.droppedLayers} を破棄`),this.hud.toast(o)}requireComponents(t,e=1){const n=this.state.selected,s={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"}[t];return!n||this.state.compMode!==t||this.state.comp.size<e?(this.hud.toast(`${s}モードで${e>1?`${e} つ以上`:""}選択してから実行してください`),null):n}doExtrudeFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"押し出し",()=>{const n=Pc(t.mesh,this.state.comp,this.state.toolOpts.extrudeDist);return n?(t.mesh=n.mesh,e=n.faceCount,!0):!1},()=>`面を押し出し — ${e} 面`)}doExtrudeEdgesMenu(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean);let s=0;this.applyTopologyChange(t,"エッジを押し出し",()=>{const r=Lc(t.mesh,n,this.state.toolOpts.extrudeDist);return r?(t.mesh=r.mesh,s=r.faceCount,!0):!1},()=>`エッジを押し出し — ${s} 面`)}doDeleteFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"面を削除",()=>{const n=ev(t.mesh,this.state.comp);return n?(t.mesh=cr(n.mesh),e=n.removed,!0):!1},()=>`${e} 面を削除`)}doCollapseFaces(){const t=this.requireComponents("face");t&&this.applyTopologyChange(t,"コラプス",()=>{const e=nv(t.mesh,this.state.comp);return e?(t.mesh=cr(e),!0):!1},()=>"フェースをコラプス")}doMergeVertices(){const t=this.requireComponents("vertex",2);t&&this.applyTopologyChange(t,"頂点をマージ",()=>(t.mesh=cr(Io(t.mesh,[[...this.state.comp]])),!0),()=>"頂点をマージ")}doDeleteEdges(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(a=>e.edges[a]).filter(Boolean);let s=0;const r=tv(t.mesh,n);if(!r){this.hud.toast("結合できるエッジがありません（境界エッジは削除できません）");return}this.applyTopologyChange(t,"エッジを削除",()=>(t.mesh=r.mesh,s=r.merged,!0),()=>`エッジを削除 — ${s} 面を結合`)}doBridge(){const t=this.requireComponents("edge",2);if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean),s=fv(t.mesh,n);if(!s){this.hud.toast("ブリッジできません（境界エッジの 2 列を同じ本数だけ選んでください）");return}this.applyTopologyChange(t,"ブリッジ",()=>(t.mesh=s.mesh,!0),()=>`ブリッジ — ${s.faces} 面`)}doCenterPivot(){const t=this.state.selected;if(!t)return;this.history.push("中心にピボット");const e=t.mesh.boundsCenter();for(let n=0;n<t.mesh.vertexCount;n++){const s=t.mesh.getPosition(n);t.mesh.setPosition(n,s[0]-e[0],s[1]-e[1],s[2]-e[2])}t.transform.position=[t.transform.position[0]+e[0]*t.transform.scale[0],t.transform.position[1]+e[1]*t.transform.scale[1],t.transform.position[2]+e[2]*t.transform.scale[2]],t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("ピボットを中心へ")}doFreeze(){const t=this.state.selected;if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;this.history.push("フリーズ"),e.group.updateMatrixWorld();const n=e.group.matrixWorld;for(let s=0;s<t.mesh.vertexCount;s++){const r=t.mesh.getPosition(s),a=new D(r[0],r[1],r[2]).applyMatrix4(n);t.mesh.setPosition(s,a.x,a.y,a.z)}t.transform={position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]},t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("トランスフォームをフリーズ")}doDuplicate(){const t=this.state.selected;if(!t)return;this.history.push("複製");const e=this.state.doc.addMesh(t.mesh.clone(),`${t.name}_copy`);e.transform=As(t.transform),this.state.select(e),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${e.name} を複製しました`)}doDelete(){const t=this.state.selected;t&&(this.history.push("削除"),this.state.doc.remove(t),this.state.select(null),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${t.name} を削除しました`))}doUndo(){const t=this.history.undo();t&&(this.afterHistory(),this.hud.toast(`元に戻す: ${t}`))}doRedo(){const t=this.history.redo();t&&(this.afterHistory(),this.hud.toast(`やり直す: ${t}`))}afterHistory(){this.viewport.syncAll(),this.selector.reset(),this.syncCompModeButtons(),this.refresh()}syncCompModeButtons(){for(const t of document.querySelectorAll("[data-comp-mode]"))t.setAttribute("aria-pressed",String(t.dataset.compMode===this.state.compMode))}updateHistoryButtons(){Ht("btnUndo").disabled=!this.history.canUndo,Ht("btnRedo").disabled=!this.history.canRedo}toolColumn(){if(this.state.mode!=="model")return[];const t=[{kind:"label",text:"変形"},{kind:"button",icon:ut.xform,title:"選択・変形（長押しで 移動 / 回転 / スケール）",tool:"select",radial:()=>this.manipMenu(),onTap:()=>{this.setTool("select"),this.setManip("all")}},{kind:"button",icon:ut.multicut,title:"マルチカット（エッジループ挿入）",tool:"multicut",onTap:()=>this.setTool("multicut")},{kind:"button",icon:ut.scale,title:"ベベル（エッジを選んで左右にドラッグ）",tool:"bevel",onTap:()=>this.setTool("bevel")},{kind:"separator"},{kind:"label",text:"選択"}];for(const e of Oa)t.push({kind:"button",icon:px[e.id],title:`${e.label} (${e.key})`,compMode:e.id,onTap:()=>this.setCompMode(e.id)});t.push({kind:"separator"},{kind:"label",text:"表示"},{kind:"button",icon:ut.shade,title:"シェーディング（長押しで切り替え。4–7）",radial:()=>this.shadingMenu(),onTap:()=>this.cycleDisplay()},{kind:"button",icon:ut.camera,title:"カメラ設定",onTap:e=>this.openCameraPopup(e)},{kind:"separator"},{kind:"label",text:"追加"});for(const e of K0){const n=as[e];t.push({kind:"button",icon:mx[e]??ut.prim,title:`${n.label} を原点に追加`,onTap:()=>this.addPrimitive(e)})}return t}buildToolDock(){Ht("dockLeft").textContent="";const{panel:t,body:e}=Na("tools","ツール");this.toolPanelBody=e,this.renderToolColumn(),this.docking.attach(t),this.docking.place(t,this.zones.tools??"left")}renderToolColumn(){const t=this.toolPanelBody;if(!t)return;t.textContent="";const e=St("div","toolcol");for(const n of this.toolColumn()){if(n.kind==="label"){e.appendChild(St("div","minilbl",n.text));continue}if(n.kind==="separator"){e.appendChild(St("div","tool-sep"));continue}const s=St("button","ibtn");s.innerHTML=cx(n.icon),s.title=n.title,n.tool&&(s.dataset.tool=n.tool,s.setAttribute("aria-pressed",String(this.state.tool===n.tool))),n.compMode&&(s.dataset.compMode=n.compMode,s.setAttribute("aria-pressed",String(this.state.compMode===n.compMode))),n.radial?(s.dataset.radial="1",_h(s,n.radial,()=>n.onTap(s))):s.addEventListener("click",()=>n.onTap(s)),e.appendChild(s)}t.appendChild(e)}buildPanels(){const t=Na("options","オプション");this.docking.attach(t.panel),this.docking.place(t.panel,this.zones.options??"rightTop"),this.optionsBody=t.body;const e=Na("outliner","アウトライナ");this.docking.attach(e.panel),this.docking.place(e.panel,this.zones.outliner??"rightBottom"),this.outlinerBody=e.body,this.renderPanels(),this.viewport.resize()}panelHost(){return{onParamInput:(t,e,n)=>{this.paramSnapshot??=this.history.snapshot(),t.params[e]=n,t.rebuild(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats(),this.refreshManipulator()},onParamCommit:(t,e)=>{this.paramSnapshot&&(this.history.commit(e,this.paramSnapshot),this.paramSnapshot=null)},onSoftChange:(t,e)=>{this.state.soft[t]=e,this.viewport.rebuildOverlay(),this.refresh()},onExtrudeDistChange:t=>{this.state.toolOpts.extrudeDist=t},onBevelChange:(t,e)=>{t==="segments"?this.state.bevel.segments=e:this.state.bevel.width=e,this.redoBevel()},onCutChange:(t,e)=>{t==="edgeFlow"?this.state.cut.edgeFlow=e:this.state.cut.snapStep=e},onSmoothAngleChange:t=>{this.state.smoothAngle=t;for(const e of this.state.doc.objects)this.viewport.rebuildObject(e)},onSelect:t=>{this.state.select(t),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh()},onRename:(t,e)=>{this.history.push("名前変更"),t.name=e,this.refresh()},onOutlinerMenu:(t,e,n)=>{Ki({N:{label:"名前変更",sub:"Rename",icon:ut.rename,run:()=>this.hud.toast("行をダブルタップでも変更できます")},E:{label:"複製",sub:"Duplicate",icon:ut.dup,run:()=>{this.state.select(t),this.doDuplicate()}},S:{label:"削除",sub:"Delete",icon:ut.del,run:()=>{this.state.select(t),this.doDelete()}},W:{label:"フレーム",sub:"Frame",icon:ut.frame,run:()=>{this.state.select(t),this.refresh(),this.viewport.frameSelected()}}},e,n)}}}renderPanels(){const t=this.panelHost();this.optionsBody&&ix(this.optionsBody,{tool:this.state.tool,selected:this.state.selected,soft:this.state.soft,cut:this.state.cut,bevel:this.state.bevel,bevelActive:this.bevel.active,extrudeDist:this.state.toolOpts.extrudeDist,smoothAngle:this.state.smoothAngle,compMode:this.state.compMode},t),this.outlinerBody&&sx(this.outlinerBody,this.state.doc.objects,this.state.selected,t)}addPrimitive(t){this.history.push(`${as[t].label} を追加`);const e=this.state.doc.addObject(t);this.state.select(e),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${e.name} を追加しました`)}setCompMode(t){this.state.compMode!==t&&(this.state.compMode=t,this.state.comp.clear(),this.selector.reset(),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),this.syncCompModeButtons(),this.hud.toast(Oa.find(e=>e.id===t)?.label??t))}buildGauges(){const t=()=>this.viewport.rebuildOverlay();this.gauges=[new gh(this.state,"gauge1","g1","g1lbl","g1val",t,()=>this.refresh()),new gh(this.state,"gauge2","g2","g2lbl","g2val",t,()=>this.refresh())]}buildCluster(){const t=n=>{const s=this.state.mods[n];this.state.mods[n]=s==="off"?"latch":s==="latch"?"lock":"off",this.syncModButtons()};Ht("modShift").addEventListener("click",()=>t("shift")),Ht("modCtrl").addEventListener("click",()=>t("ctrl")),Ht("modAlt").addEventListener("click",()=>t("alt"));const e=Ht("btnFrame");e.addEventListener("touchstart",n=>n.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",n=>{e.setPointerCapture(n.pointerId),this.fHeld=!0});for(const n of["pointerup","pointercancel"])e.addEventListener(n,()=>{this.fHeld&&(this.fHeld=!1,this.fChord||this.viewport.frameSelected(),this.fChord=!1)})}get fHeld(){return this.router.fHeld}set fHeld(t){this.router.fHeld=t}get fChord(){return this.router.fChord}set fChord(t){this.router.fChord=t}syncModButtons(){for(const[t,e]of[["shift","modShift"],["ctrl","modCtrl"],["alt","modAlt"]])Ht(e).dataset.state=this.state.mods[t]}bindKeyboard(){window.addEventListener("keydown",t=>{const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;const n=Oa.find(a=>a.key===t.key);if(n){t.preventDefault(),this.setCompMode(n.id);return}const s=dx[t.key];if(s){this.setDisplay(s);return}if(t.key==="f"||t.key==="F"){this.viewport.frameSelected();return}const r={q:"all",t:"all",w:"move",e:"rotate",r:"scale"}[t.key.toLowerCase()];if(r&&!t.ctrlKey&&!t.metaKey){this.setManip(r);return}if(t.key===">"||t.key==="."){this.growOrShrink(!0);return}if(t.key==="<"||t.key===","){this.growOrShrink(!1);return}if(t.key==="x"||t.key==="X"){this.state.symX=!this.state.symX,this.refresh(),this.hud.toast(`対称編集 X: ${this.state.symX?"オン":"オフ"}`);return}if((t.ctrlKey||t.metaKey)&&(t.key==="z"||t.key==="Z")){t.preventDefault(),t.shiftKey?this.doRedo():this.doUndo();return}(t.ctrlKey||t.metaKey)&&(t.key==="y"||t.key==="Y")&&(t.preventDefault(),this.doRedo())})}bindTopBar(){Ht("btnUndo").addEventListener("click",()=>this.doUndo()),Ht("btnRedo").addEventListener("click",()=>this.doRedo()),Ht("btnPanels").addEventListener("click",()=>{this.state.panelsHidden=!this.state.panelsHidden,Ht("btnPanels").setAttribute("aria-pressed",String(this.state.panelsHidden)),Ht("dockLeft").hidden=this.state.panelsHidden,Ht("dockColRight").hidden=this.state.panelsHidden,this.layout.apply(),this.viewport.resize()}),_h(Ht("modeBtn"),()=>this.modeMenu(),()=>this.hud.toast("長押しでモードを選べます")),Ht("fileBtn").addEventListener("click",t=>this.openFileMenu(t.currentTarget)),document.addEventListener("pointerdown",t=>{this.popup&&!this.popup.contains(t.target)&&this.closePopup()})}closePopup(){this.popup?.remove(),this.popup=null,ul()}openFileMenu(t){this.closePopup();const e=t.getBoundingClientRect(),n=St("div","panel floating");n.style.left=`${e.left}px`,n.style.top=`${e.bottom+2}px`;const s=St("div","pbody"),r=(a,o)=>{const l=St("button","act",a);l.addEventListener("click",()=>{this.closePopup(),o()}),s.appendChild(l)};r("新規シーン",()=>this.newScene()),r("プロジェクトを開く (.mbz)",()=>this.openProject()),r("プロジェクトを保存 (.mbz)",()=>this.saveProject()),r("OBJ を読み込む",()=>this.importObj()),r("OBJ を書き出す",()=>this.exportObj()),n.appendChild(s),document.body.appendChild(n),this.popup=n}async newScene(){this.history.push("新規シーン"),this.state.doc.objects.length=0,this.state.select(null),this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]),this.viewport.syncAll(),this.refresh(),await this.autosave.saveNow()}async saveProject(){const{packMbz:t}=await yl(async()=>{const{packMbz:r}=await import("./index-CCIhCHWd.js");return{packMbz:r}},[]),e=t(this.state.doc,{appVersion:"0.1.0"}),n=`${this.state.doc.objects[0]?.name??"scene"}.mbz`,s=await lh(e,n);this.hud.toast(s.saved?`${n} を保存しました`:"保存を取り消しました")}async openProject(){const t=await ch(".mbz");if(t)try{const{unpackMbz:e}=await yl(async()=>{const{unpackMbz:s}=await import("./index-CCIhCHWd.js");return{unpackMbz:s}},[]),{document:n}=e(t.bytes);this.state.doc=n,this.state.select(n.objects[0]??null),this.history.clear(),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を開きました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async importObj(){const t=await ch(".obj,text/plain");if(t)try{const e=bv(t.text);if(!e.length)return void this.hud.toast("面が見つかりませんでした");this.history.push("OBJ 読み込み");let n=null;for(const s of e)n=this.state.doc.addMesh(s.mesh,s.name);this.state.select(n),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を読み込みました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async exportObj(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;if(!t.length)return void this.hud.toast("書き出すものがありません");const e=Ev(t.map(r=>({mesh:r.mesh,name:r.name}))),n=`${t[0].name}.obj`,s=await lh(e,n);this.hud.toast(s.saved?`${n} を書き出しました`:"書き出しを取り消しました")}refresh(){this.preselect.clear(),this.viewport.applyDisplayAll(),this.refreshManipulator(),this.hud.refreshStats();for(const t of this.gauges)t.paint();this.updateHistoryButtons(),this.paramSnapshot||this.renderPanels()}}document.addEventListener("contextmenu",i=>i.preventDefault());document.addEventListener("selectstart",i=>{const t=i.target;t&&t.tagName!=="INPUT"&&t.tagName!=="TEXTAREA"&&i.preventDefault()});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/macbethUnity/app/sw.js",{scope:"/macbethUnity/app/"})});const Su=new gx;Su.boot();Object.assign(window,{macbeth:Su});export{Rv as A,Lc as B,Pc as C,su as D,Vn as E,vv as F,Uc as G,iu as H,j0 as I,xx as J,J0 as K,tu as L,Dr as M,Q0 as N,bv as O,as as P,eu as Q,pv as R,Mv as S,_v as T,Nc as U,Do as V,yv as W,nu as X,_x as Y,Io as Z,Ev as _,au as a,rs as b,xe as c,K0 as d,Uo as e,Ic as f,rv as g,gv as h,fv as i,Sx as j,Sv as k,mv as l,As as m,nv as n,cr as o,t_ as p,Mx as q,Pv as r,Z0 as s,ev as t,i_ as u,tv as v,cv as w,Gt as x,Ra as y,dv as z};
//# sourceMappingURL=index-CfM6_jFC.js.map
