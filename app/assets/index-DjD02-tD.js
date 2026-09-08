(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Ef="modulepreload",Tf=function(i){return"/macbethUnity/app/"+i},Yc={},Kc=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=o(e.map(l=>{if(l=Tf(l),l in Yc)return;Yc[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":Ef,h||(f.as="script"),f.crossOrigin="",f.href=l,c&&f.setAttribute("nonce",c),document.head.appendChild(f),h)return new Promise((d,m)=>{f.addEventListener("load",d),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mc="185",Af=0,Zc=1,Cf=2,Br=1,Rf=2,Fs=3,vi=0,je=1,Ge=2,Qn=0,hs=1,jc=2,Jc=3,Qc=4,Pf=5,Ri=100,If=101,Lf=102,Df=103,Uf=104,Nf=200,Ff=201,Of=202,kf=203,ua=204,fa=205,Bf=206,zf=207,Vf=208,Hf=209,Gf=210,Wf=211,Xf=212,$f=213,qf=214,da=0,pa=1,ma=2,ms=3,ga=4,va=5,xa=6,_a=7,gc=0,Yf=1,Kf=2,Nn=0,Qh=1,tu=2,eu=3,nu=4,iu=5,su=6,ru=7,ou=300,Ui=301,gs=302,po=303,mo=304,ro=306,Ni=1e3,Jn=1001,Ma=1002,Re=1003,Zf=1004,rr=1005,Be=1006,go=1007,Ii=1008,sn=1009,au=1010,cu=1011,Gs=1012,vc=1013,Bn=1014,Dn=1015,ei=1016,xc=1017,_c=1018,Ws=1020,lu=35902,hu=35899,uu=1021,fu=1022,yn=1023,ni=1026,Li=1027,du=1028,Mc=1029,Fi=1030,yc=1031,bc=1033,zr=33776,Vr=33777,Hr=33778,Gr=33779,ya=35840,ba=35841,Sa=35842,wa=35843,Ea=36196,Ta=37492,Aa=37496,Ca=37488,Ra=37489,qr=37490,Pa=37491,Ia=37808,La=37809,Da=37810,Ua=37811,Na=37812,Fa=37813,Oa=37814,ka=37815,Ba=37816,za=37817,Va=37818,Ha=37819,Ga=37820,Wa=37821,Xa=36492,$a=36494,qa=36495,Ya=36283,Ka=36284,Yr=36285,Za=36286,jf=3200,ja=0,Jf=1,pi="",hn="srgb",Kr="srgb-linear",Zr="linear",ee="srgb",Hi=7680,tl=519,Qf=512,td=513,ed=514,Sc=515,nd=516,id=517,wc=518,sd=519,el=35044,nl="300 es",Un=2e3,Xs=2001;function rd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function jr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function od(){const i=jr("canvas");return i.style.display="block",i}const il={};function sl(...i){const t="THREE."+i.shift();console.log(t,...i)}function pu(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Nt(...i){i=pu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Yt(...i){i=pu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function us(...i){const t=i.join(" ");t in il||(il[t]=!0,Nt(...i))}function ad(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const cd={[da]:pa,[ma]:xa,[ga]:_a,[ms]:va,[pa]:da,[xa]:ma,[_a]:ga,[va]:ms};class ki{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vo=Math.PI/180,Ja=180/Math.PI;function Ks(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function qt(i,t,e){return Math.max(t,Math.min(e,i))}function ld(i,t){return(i%t+t)%t}function xo(i,t,e){return(1-e)*i+e*t}function bs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Xt{static{Xt.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class an{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],m=r[o+2],v=r[o+3];if(u!==v||c!==f||l!==d||h!==m){let p=c*f+l*d+h*m+u*v;p<0&&(f=-f,d=-d,m=-m,v=-v,p=-p);let g=1-a;if(p<.9995){const x=Math.acos(p),y=Math.sin(x);g=Math.sin(g*x)/y,a=Math.sin(a*x)/y,c=c*g+f*a,l=l*g+d*a,h=h*g+m*a,u=u*g+v*a}else{c=c*g+f*a,l=l*g+d*a,h=h*g+m*a,u=u*g+v*a;const x=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=x,l*=x,h*=x,u*=x}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+h*u+c*d-l*f,t[e+1]=c*m+h*f+l*u-a*d,t[e+2]=l*m+h*d+a*f-c*u,t[e+3]=h*m-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:Nt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{static{L.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(rl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(rl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return _o.copy(this).projectOnVector(t),this.sub(_o)}reflect(t){return this.sub(_o.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _o=new L,rl=new an;class kt{static{kt.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],v=s[0],p=s[3],g=s[6],x=s[1],y=s[4],_=s[7],w=s[2],S=s[5],A=s[8];return r[0]=o*v+a*x+c*w,r[3]=o*p+a*y+c*S,r[6]=o*g+a*_+c*A,r[1]=l*v+h*x+u*w,r[4]=l*p+h*y+u*S,r[7]=l*g+h*_+u*A,r[2]=f*v+d*x+m*w,r[5]=f*p+d*y+m*S,r[8]=f*g+d*_+m*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,m=e*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=f*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return us("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Mo.makeScale(t,e)),this}rotate(t){return us("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Mo.makeRotation(-t)),this}translate(t,e){return us("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Mo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Mo=new kt,ol=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),al=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hd(){const i={enabled:!0,workingColorSpace:Kr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ee&&(s.r=ti(s.r),s.g=ti(s.g),s.b=ti(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ee&&(s.r=fs(s.r),s.g=fs(s.g),s.b=fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===pi?Zr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return us("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return us("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Kr]:{primaries:t,whitePoint:n,transfer:Zr,toXYZ:ol,fromXYZ:al,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:t,whitePoint:n,transfer:ee,toXYZ:ol,fromXYZ:al,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const $t=hd();function ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Gi;class ud{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Gi===void 0&&(Gi=jr("canvas")),Gi.width=t.width,Gi.height=t.height;const s=Gi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Gi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=jr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ti(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ti(e[n]/255)*255):e[n]=ti(e[n]);return{data:e,width:t.width,height:t.height}}else return Nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let fd=0;class Ec{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Ks(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(yo(s[o].image)):r.push(yo(s[o]))}else r=yo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function yo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ud.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Nt("Texture: Unable to serialize Texture."),{})}let dd=0;const bo=new L;class ze extends ki{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=Jn,s=Jn,r=Be,o=Ii,a=yn,c=sn,l=ze.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Ks(),this.name="",this.source=new Ec(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(bo).x}get height(){return this.source.getSize(bo).y}get depth(){return this.source.getSize(bo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Nt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Nt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ou)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ni:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case Ma:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ni:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case Ma:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=ou;ze.DEFAULT_ANISOTROPY=1;class fe{static{fe.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],v=c[2],p=c[6],g=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(m+p)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,_=(d+1)/2,w=(g+1)/2,S=(h+f)/4,A=(u+v)/4,M=(m+p)/4;return y>_&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=S/n,r=A/n):_>w?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=S/s,r=M/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=A/r,s=M/r),this.set(n,s,r,e),this}let x=Math.sqrt((p-m)*(p-m)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(p-m)/x,this.y=(u-v)/x,this.z=(f-h)/x,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pd extends ki{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Be,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new ze(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Be,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ec(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fn extends pd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class mu extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class md extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Re,this.minFilter=Re,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oe{static{oe.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,m,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,v,p)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,v,p){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=m,g[11]=v,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Wi.setFromMatrixColumn(t,0).length(),r=1/Wi.setFromMatrixColumn(t,1).length(),o=1/Wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,m=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+m*l,e[5]=f-v*l,e[9]=-a*c,e[2]=v-f*l,e[6]=m+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,m=l*h,v=l*u;e[0]=f+v*a,e[4]=m*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-m,e[6]=v+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,m=l*h,v=l*u;e[0]=f-v*a,e[4]=-o*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*h,e[9]=v-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,m=a*h,v=a*u;e[0]=c*h,e[4]=m*l-d,e[8]=f*l+v,e[1]=c*u,e[5]=v*l+f,e[9]=d*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,m=a*c,v=a*l;e[0]=c*h,e[4]=v-f*u,e[8]=m*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+m,e[10]=f-v*u}else if(t.order==="XZY"){const f=o*c,d=o*l,m=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=o*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(gd,t,vd)}lookAt(t,e,n){const s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),oi.crossVectors(n,Qe),oi.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),oi.crossVectors(n,Qe)),oi.normalize(),or.crossVectors(Qe,oi),s[0]=oi.x,s[4]=or.x,s[8]=Qe.x,s[1]=oi.y,s[5]=or.y,s[9]=Qe.y,s[2]=oi.z,s[6]=or.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],v=n[6],p=n[10],g=n[14],x=n[3],y=n[7],_=n[11],w=n[15],S=s[0],A=s[4],M=s[8],T=s[12],P=s[1],R=s[5],I=s[9],V=s[13],F=s[2],D=s[6],B=s[10],k=s[14],$=s[3],j=s[7],it=s[11],tt=s[15];return r[0]=o*S+a*P+c*F+l*$,r[4]=o*A+a*R+c*D+l*j,r[8]=o*M+a*I+c*B+l*it,r[12]=o*T+a*V+c*k+l*tt,r[1]=h*S+u*P+f*F+d*$,r[5]=h*A+u*R+f*D+d*j,r[9]=h*M+u*I+f*B+d*it,r[13]=h*T+u*V+f*k+d*tt,r[2]=m*S+v*P+p*F+g*$,r[6]=m*A+v*R+p*D+g*j,r[10]=m*M+v*I+p*B+g*it,r[14]=m*T+v*V+p*k+g*tt,r[3]=x*S+y*P+_*F+w*$,r[7]=x*A+y*R+_*D+w*j,r[11]=x*M+y*I+_*B+w*it,r[15]=x*T+y*V+_*k+w*tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],v=t[7],p=t[11],g=t[15],x=c*d-l*f,y=a*d-l*u,_=a*f-c*u,w=o*d-l*h,S=o*f-c*h,A=o*u-a*h;return e*(v*x-p*y+g*_)-n*(m*x-p*w+g*S)+s*(m*y-v*w+g*A)-r*(m*_-v*S+p*A)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],h=t[10];return e*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],v=t[13],p=t[14],g=t[15],x=e*a-n*o,y=e*c-s*o,_=e*l-r*o,w=n*c-s*a,S=n*l-r*a,A=s*l-r*c,M=h*v-u*m,T=h*p-f*m,P=h*g-d*m,R=u*p-f*v,I=u*g-d*v,V=f*g-d*p,F=x*V-y*I+_*R+w*P-S*T+A*M;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/F;return t[0]=(a*V-c*I+l*R)*D,t[1]=(s*I-n*V-r*R)*D,t[2]=(v*A-p*S+g*w)*D,t[3]=(f*S-u*A-d*w)*D,t[4]=(c*P-o*V-l*T)*D,t[5]=(e*V-s*P+r*T)*D,t[6]=(p*_-m*A-g*y)*D,t[7]=(h*A-f*_+d*y)*D,t[8]=(o*I-a*P+l*M)*D,t[9]=(n*P-e*I-r*M)*D,t[10]=(m*S-v*_+g*x)*D,t[11]=(u*_-h*S-d*x)*D,t[12]=(a*T-o*R-c*M)*D,t[13]=(e*R-n*T+s*M)*D,t[14]=(v*y-m*w-p*x)*D,t[15]=(h*w-u*y+f*x)*D,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,m=r*u,v=o*h,p=o*u,g=a*u,x=c*l,y=c*h,_=c*u,w=n.x,S=n.y,A=n.z;return s[0]=(1-(v+g))*w,s[1]=(d+_)*w,s[2]=(m-y)*w,s[3]=0,s[4]=(d-_)*S,s[5]=(1-(f+g))*S,s[6]=(p+x)*S,s[7]=0,s[8]=(m+y)*A,s[9]=(p-x)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Wi.set(s[0],s[1],s[2]).length();const a=Wi.set(s[4],s[5],s[6]).length(),c=Wi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),pn.copy(this);const l=1/o,h=1/a,u=1/c;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=u,pn.elements[9]*=u,pn.elements[10]*=u,e.setFromRotationMatrix(pn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Un,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let m,v;if(c)m=r/(o-r),v=o*r/(o-r);else if(a===Un)m=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Xs)m=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Un,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let m,v;if(c)m=1/(o-r),v=o/(o-r);else if(a===Un)m=-2/(o-r),v=-(o+r)/(o-r);else if(a===Xs)m=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Wi=new L,pn=new oe,gd=new L(0,0,0),vd=new L(1,1,1),oi=new L,or=new L,Qe=new L,cl=new oe,ll=new an;class zn{constructor(t=0,e=0,n=0,s=zn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return cl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(cl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ll.setFromEuler(this),this.setFromQuaternion(ll,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zn.DEFAULT_ORDER="XYZ";class Tc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xd=0;const hl=new L,Xi=new an,Hn=new oe,ar=new L,Ss=new L,_d=new L,Md=new an,ul=new L(1,0,0),fl=new L(0,1,0),dl=new L(0,0,1),pl={type:"added"},yd={type:"removed"},$i={type:"childadded",child:null},So={type:"childremoved",child:null};class we extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=Ks(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new L,e=new zn,n=new an,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new kt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.premultiply(Xi),this}rotateX(t){return this.rotateOnAxis(ul,t)}rotateY(t){return this.rotateOnAxis(fl,t)}rotateZ(t){return this.rotateOnAxis(dl,t)}translateOnAxis(t,e){return hl.copy(t).applyQuaternion(this.quaternion),this.position.add(hl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ul,t)}translateY(t){return this.translateOnAxis(fl,t)}translateZ(t){return this.translateOnAxis(dl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ar.copy(t):ar.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Ss,ar,this.up):Hn.lookAt(ar,Ss,this.up),this.quaternion.setFromRotationMatrix(Hn),s&&(Hn.extractRotation(s.matrixWorld),Xi.setFromRotationMatrix(Hn),this.quaternion.premultiply(Xi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Yt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(pl),$i.child=t,this.dispatchEvent($i),$i.child=null):Yt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(yd),So.child=t,this.dispatchEvent(So),So.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Hn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Hn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(pl),$i.child=t,this.dispatchEvent($i),$i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,t,_d),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,Md,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}we.DEFAULT_UP=new L(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _n extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bd={type:"move"};class wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,n),g=this._getHandJoint(l,v);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bd)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new _n;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const gu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},cr={h:0,s:0,l:0};function Eo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=ld(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Eo(o,r,t+1/3),this.g=Eo(o,r,t),this.b=Eo(o,r,t-1/3)}return $t.colorSpaceToWorking(this,s),this}setStyle(t,e=hn){function n(r){r!==void 0&&parseFloat(r)<1&&Nt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Nt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Nt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){const n=gu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Nt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ti(t.r),this.g=ti(t.g),this.b=ti(t.b),this}copyLinearToSRGB(t){return this.r=fs(t.r),this.g=fs(t.g),this.b=fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return $t.workingToColorSpace(Oe.copy(this),t),Math.round(qt(Oe.r*255,0,255))*65536+Math.round(qt(Oe.g*255,0,255))*256+Math.round(qt(Oe.b*255,0,255))}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Oe.copy(this),e);const n=Oe.r,s=Oe.g,r=Oe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=hn){$t.workingToColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,s=Oe.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ai),this.setHSL(ai.h+t,ai.s+e,ai.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ai),t.getHSL(cr);const n=xo(ai.h,cr.h,e),s=xo(ai.s,cr.s,e),r=xo(ai.l,cr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Gt;Gt.NAMES=gu;class Qa extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const mn=new L,Gn=new L,To=new L,Wn=new L,qi=new L,Yi=new L,ml=new L,Ao=new L,Co=new L,Ro=new L,Po=new fe,Io=new fe,Lo=new fe;class Mn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),mn.subVectors(t,e),s.cross(mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){mn.subVectors(s,e),Gn.subVectors(n,e),To.subVectors(t,e);const o=mn.dot(mn),a=mn.dot(Gn),c=mn.dot(To),l=Gn.dot(Gn),h=Gn.dot(To),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,m=(o*h-a*c)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Wn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Wn.x),c.addScaledVector(o,Wn.y),c.addScaledVector(a,Wn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Po.setScalar(0),Io.setScalar(0),Lo.setScalar(0),Po.fromBufferAttribute(t,e),Io.fromBufferAttribute(t,n),Lo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Po,r.x),o.addScaledVector(Io,r.y),o.addScaledVector(Lo,r.z),o}static isFrontFacing(t,e,n,s){return mn.subVectors(n,e),Gn.subVectors(t,e),mn.cross(Gn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),mn.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Mn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;qi.subVectors(s,n),Yi.subVectors(r,n),Ao.subVectors(t,n);const c=qi.dot(Ao),l=Yi.dot(Ao);if(c<=0&&l<=0)return e.copy(n);Co.subVectors(t,s);const h=qi.dot(Co),u=Yi.dot(Co);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(qi,o);Ro.subVectors(t,r);const d=qi.dot(Ro),m=Yi.dot(Ro);if(m>=0&&d<=m)return e.copy(r);const v=d*l-c*m;if(v<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(Yi,a);const p=h*m-d*u;if(p<=0&&u-h>=0&&d-m>=0)return ml.subVectors(r,s),a=(u-h)/(u-h+(d-m)),e.copy(s).addScaledVector(ml,a);const g=1/(p+v+f);return o=v*g,a=f*g,e.copy(n).addScaledVector(qi,o).addScaledVector(Yi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Zs{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),lr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),lr.copy(n.boundingBox)),lr.applyMatrix4(t.matrixWorld),this.union(lr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ws),hr.subVectors(this.max,ws),Ki.subVectors(t.a,ws),Zi.subVectors(t.b,ws),ji.subVectors(t.c,ws),ci.subVectors(Zi,Ki),li.subVectors(ji,Zi),bi.subVectors(Ki,ji);let e=[0,-ci.z,ci.y,0,-li.z,li.y,0,-bi.z,bi.y,ci.z,0,-ci.x,li.z,0,-li.x,bi.z,0,-bi.x,-ci.y,ci.x,0,-li.y,li.x,0,-bi.y,bi.x,0];return!Do(e,Ki,Zi,ji,hr)||(e=[1,0,0,0,1,0,0,0,1],!Do(e,Ki,Zi,ji,hr))?!1:(ur.crossVectors(ci,li),e=[ur.x,ur.y,ur.z],Do(e,Ki,Zi,ji,hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Xn=[new L,new L,new L,new L,new L,new L,new L,new L],gn=new L,lr=new Zs,Ki=new L,Zi=new L,ji=new L,ci=new L,li=new L,bi=new L,ws=new L,hr=new L,ur=new L,Si=new L;function Do(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Si.fromArray(i,r);const a=s.x*Math.abs(Si.x)+s.y*Math.abs(Si.y)+s.z*Math.abs(Si.z),c=t.dot(Si),l=e.dot(Si),h=n.dot(Si);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Me=new L,fr=new Xt;let Sd=0;class On extends ki{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=el,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)fr.fromBufferAttribute(this,e),fr.applyMatrix3(t),this.setXY(e,fr.x,fr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=bs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=bs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=bs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=bs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=bs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array),r=Xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==el&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class vu extends On{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xu extends On{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Jt extends On{constructor(t,e,n){super(new Float32Array(t),e,n)}}const wd=new Zs,Es=new L,Uo=new L;class js{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):wd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Es.subVectors(t,this.center);const e=Es.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Es,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Uo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Es.copy(t.center).add(Uo)),this.expandByPoint(Es.copy(t.center).sub(Uo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Ed=0;const ln=new oe,No=new we,Ji=new L,tn=new Zs,Ts=new Zs,Ce=new L;class he extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Ks(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rd(t)?xu:vu)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,n){return ln.makeTranslation(t,e,n),this.applyMatrix4(ln),this}scale(t,e,n){return ln.makeScale(t,e,n),this.applyMatrix4(ln),this}lookAt(t){return No.lookAt(t),No.updateMatrix(),this.applyMatrix4(No.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Jt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new js);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ts.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(tn.min,Ts.min),tn.expandByPoint(Ce),Ce.addVectors(tn.max,Ts.max),tn.expandByPoint(Ce)):(tn.expandByPoint(Ts.min),tn.expandByPoint(Ts.max))}tn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ce.fromBufferAttribute(a,l),c&&(Ji.fromBufferAttribute(t,l),Ce.add(Ji)),s=Math.max(s,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new On(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let M=0;M<n.count;M++)a[M]=new L,c[M]=new L;const l=new L,h=new L,u=new L,f=new Xt,d=new Xt,m=new Xt,v=new L,p=new L;function g(M,T,P){l.fromBufferAttribute(n,M),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,P),f.fromBufferAttribute(r,M),d.fromBufferAttribute(r,T),m.fromBufferAttribute(r,P),h.sub(l),u.sub(l),d.sub(f),m.sub(f);const R=1/(d.x*m.y-m.x*d.y);isFinite(R)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(R),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(R),a[M].add(v),a[T].add(v),a[P].add(v),c[M].add(p),c[T].add(p),c[P].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let M=0,T=x.length;M<T;++M){const P=x[M],R=P.start,I=P.count;for(let V=R,F=R+I;V<F;V+=3)g(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const y=new L,_=new L,w=new L,S=new L;function A(M){w.fromBufferAttribute(s,M),S.copy(w);const T=a[M];y.copy(T),y.sub(w.multiplyScalar(w.dot(T))).normalize(),_.crossVectors(S,T);const R=_.dot(c[M])<0?-1:1;o.setXYZW(M,y.x,y.y,y.z,R)}for(let M=0,T=x.length;M<T;++M){const P=x[M],R=P.start,I=P.count;for(let V=R,F=R+I;V<F;V+=3)A(t.getX(V+0)),A(t.getX(V+1)),A(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new On(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){const m=t.getX(f+0),v=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,m=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*h;for(let g=0;g<h;g++)f[m++]=l[d++]}return new On(f,h,u)}if(this.index===null)return Nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new he,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Td=0;class Bi extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=Ks(),this.name="",this.type="Material",this.blending=hs,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ua,this.blendDst=fa,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Nt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Nt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ua&&(n.blendSrc=this.blendSrc),this.blendDst!==fa&&(n.blendDst=this.blendDst),this.blendEquation!==Ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Gt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Xt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const $n=new L,Fo=new L,dr=new L,hi=new L,Oo=new L,pr=new L,ko=new L;class oo{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,$n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=$n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):($n.copy(this.origin).addScaledVector(this.direction,e),$n.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Fo.copy(t).add(e).multiplyScalar(.5),dr.copy(e).sub(t).normalize(),hi.copy(this.origin).sub(Fo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(dr),a=hi.dot(this.direction),c=-hi.dot(dr),l=hi.lengthSq(),h=Math.abs(1-o*o);let u,f,d,m;if(h>0)if(u=o*c-a,f=o*a-c,m=r*h,u>=0)if(f>=-m)if(f<=m){const v=1/h;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Fo).addScaledVector(dr,f),d}intersectSphere(t,e){$n.subVectors(t.center,this.origin);const n=$n.dot(this.direction),s=$n.dot($n)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,$n)!==null}intersectTriangle(t,e,n,s,r){Oo.subVectors(e,t),pr.subVectors(n,t),ko.crossVectors(Oo,pr);let o=this.direction.dot(ko),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hi.subVectors(this.origin,t);const c=a*this.direction.dot(pr.crossVectors(hi,pr));if(c<0)return null;const l=a*this.direction.dot(Oo.cross(hi));if(l<0||c+l>o)return null;const h=-a*hi.dot(ko);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bn extends Bi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const gl=new oe,wi=new oo,mr=new js,vl=new L,gr=new L,vr=new L,xr=new L,Bo=new L,_r=new L,xl=new L,Mr=new L;let be=class extends we{constructor(t=new he,e=new bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){_r.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Bo.fromBufferAttribute(u,t),o?_r.addScaledVector(Bo,h):_r.addScaledVector(Bo.sub(e),h))}e.add(_r)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(r),wi.copy(t.ray).recast(t.near),!(mr.containsPoint(wi.origin)===!1&&(wi.intersectSphere(mr,vl)===null||wi.origin.distanceToSquared(vl)>(t.far-t.near)**2))&&(gl.copy(r).invert(),wi.copy(t.ray).applyMatrix4(gl),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,wi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,v=f.length;m<v;m++){const p=f[m],g=o[p.materialIndex],x=Math.max(p.start,d.start),y=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let _=x,w=y;_<w;_+=3){const S=a.getX(_),A=a.getX(_+1),M=a.getX(_+2);s=yr(this,g,t,n,l,h,u,S,A,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let p=m,g=v;p<g;p+=3){const x=a.getX(p),y=a.getX(p+1),_=a.getX(p+2);s=yr(this,o,t,n,l,h,u,x,y,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,v=f.length;m<v;m++){const p=f[m],g=o[p.materialIndex],x=Math.max(p.start,d.start),y=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let _=x,w=y;_<w;_+=3){const S=_,A=_+1,M=_+2;s=yr(this,g,t,n,l,h,u,S,A,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let p=m,g=v;p<g;p+=3){const x=p,y=p+1,_=p+2;s=yr(this,o,t,n,l,h,u,x,y,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Ad(i,t,e,n,s,r,o,a){let c;if(t.side===je?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===vi,a),c===null)return null;Mr.copy(a),Mr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Mr);return l<e.near||l>e.far?null:{distance:l,point:Mr.clone(),object:i}}function yr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,gr),i.getVertexPosition(c,vr),i.getVertexPosition(l,xr);const h=Ad(i,t,e,n,gr,vr,xr,xl);if(h){const u=new L;Mn.getBarycoord(xl,gr,vr,xr,u),s&&(h.uv=Mn.getInterpolatedAttribute(s,a,c,l,u,new Xt)),r&&(h.uv1=Mn.getInterpolatedAttribute(r,a,c,l,u,new Xt)),o&&(h.normal=Mn.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};Mn.getNormal(gr,vr,xr,f.normal),h.face=f,h.barycoord=u}return h}class Cd extends ze{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Re,h=Re,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const zo=new L,Rd=new L,Pd=new kt;class Kn{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=zo.subVectors(n,e).cross(Rd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(zo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Pd.getNormalMatrix(t),s=this.coplanarPoint(zo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new js,Id=new Xt(.5,.5),br=new L;class Ac{constructor(t=new Kn,e=new Kn,n=new Kn,s=new Kn,r=new Kn,o=new Kn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Un,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],v=r[9],p=r[10],g=r[11],x=r[12],y=r[13],_=r[14],w=r[15];if(s[0].setComponents(l-o,d-h,g-m,w-x).normalize(),s[1].setComponents(l+o,d+h,g+m,w+x).normalize(),s[2].setComponents(l+a,d+u,g+v,w+y).normalize(),s[3].setComponents(l-a,d-u,g-v,w-y).normalize(),n)s[4].setComponents(c,f,p,_).normalize(),s[5].setComponents(l-c,d-f,g-p,w-_).normalize();else if(s[4].setComponents(l-c,d-f,g-p,w-_).normalize(),e===Un)s[5].setComponents(l+c,d+f,g+p,w+_).normalize();else if(e===Xs)s[5].setComponents(c,f,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(t){Ei.center.set(0,0,0);const e=Id.distanceTo(t.center);return Ei.radius=.7071067811865476+e,Ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(br.x=s.normal.x>0?t.max.x:t.min.x,br.y=s.normal.y>0?t.max.y:t.min.y,br.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(br)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ye extends Bi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Jr=new L,Qr=new L,_l=new oe,As=new oo,Sr=new js,Vo=new L,Ml=new L;class Js extends we{constructor(t=new he,e=new ye){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Jr.fromBufferAttribute(e,s-1),Qr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Jr.distanceTo(Qr);t.setAttribute("lineDistance",new Jt(n,1))}else Nt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(s),Sr.radius+=r,t.ray.intersectsSphere(Sr)===!1)return;_l.copy(s).invert(),As.copy(t.ray).applyMatrix4(_l);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let v=d,p=m-1;v<p;v+=l){const g=h.getX(v),x=h.getX(v+1),y=wr(this,t,As,c,g,x,v);y&&e.push(y)}if(this.isLineLoop){const v=h.getX(m-1),p=h.getX(d),g=wr(this,t,As,c,v,p,m-1);g&&e.push(g)}}else{const d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let v=d,p=m-1;v<p;v+=l){const g=wr(this,t,As,c,v,v+1,v);g&&e.push(g)}if(this.isLineLoop){const v=wr(this,t,As,c,m-1,d,m-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function wr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Jr.fromBufferAttribute(a,s),Qr.fromBufferAttribute(a,r),e.distanceSqToSegment(Jr,Qr,Vo,Ml)>n)return;Vo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Vo);if(!(l<t.near||l>t.far))return{distance:l,point:Ml.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const yl=new L,bl=new L;class In extends Js{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)yl.fromBufferAttribute(e,s),bl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+yl.distanceTo(bl);t.setAttribute("lineDistance",new Jt(n,1))}else Nt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rn extends Bi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Sl=new oe,tc=new oo,Er=new js,Tr=new L;class dn extends we{constructor(t=new he,e=new rn){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(s),Er.radius+=r,t.ray.intersectsSphere(Er)===!1)return;Sl.copy(s).invert(),tc.copy(t.ray).applyMatrix4(Sl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let m=f,v=d;m<v;m++){const p=l.getX(m);Tr.fromBufferAttribute(u,p),wl(Tr,p,c,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,v=d;m<v;m++)Tr.fromBufferAttribute(u,m),wl(Tr,m,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function wl(i,t,e,n,s,r,o){const a=tc.distanceSqToPoint(i);if(a<e){const c=new L;tc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class _u extends ze{constructor(t=[],e=Ui,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Mu extends ze{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class vs extends ze{constructor(t,e,n=Bn,s,r,o,a=Re,c=Re,l,h=ni,u=1){if(h!==ni&&h!==Li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ec(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ld extends vs{constructor(t,e=Bn,n=Ui,s,r,o=Re,a=Re,c,l=ni){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class yu extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Oi extends he{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(u,2));function m(v,p,g,x,y,_,w,S,A,M,T){const P=_/A,R=w/M,I=_/2,V=w/2,F=S/2,D=A+1,B=M+1;let k=0,$=0;const j=new L;for(let it=0;it<B;it++){const tt=it*R-V;for(let ot=0;ot<D;ot++){const St=ot*P-I;j[v]=St*x,j[p]=tt*y,j[g]=F,l.push(j.x,j.y,j.z),j[v]=0,j[p]=0,j[g]=S>0?1:-1,h.push(j.x,j.y,j.z),u.push(ot/A),u.push(1-it/M),k+=1}}for(let it=0;it<M;it++)for(let tt=0;tt<A;tt++){const ot=f+tt+D*it,St=f+tt+D*(it+1),Ft=f+(tt+1)+D*(it+1),wt=f+(tt+1)+D*it;c.push(ot,St,wt),c.push(St,Ft,wt),$+=6}a.addGroup(d,$,T),d+=$,f+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Cc extends he{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let m=0;const v=[],p=n/2;let g=0;x(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Jt(u,3)),this.setAttribute("normal",new Jt(f,3)),this.setAttribute("uv",new Jt(d,2));function x(){const _=new L,w=new L;let S=0;const A=(e-t)/n;for(let M=0;M<=r;M++){const T=[],P=M/r,R=P*(e-t)+t;for(let I=0;I<=s;I++){const V=I/s,F=V*c+a,D=Math.sin(F),B=Math.cos(F);w.x=R*D,w.y=-P*n+p,w.z=R*B,u.push(w.x,w.y,w.z),_.set(D,A,B).normalize(),f.push(_.x,_.y,_.z),d.push(V,1-P),T.push(m++)}v.push(T)}for(let M=0;M<s;M++)for(let T=0;T<r;T++){const P=v[T][M],R=v[T+1][M],I=v[T+1][M+1],V=v[T][M+1];(t>0||T!==0)&&(h.push(P,R,V),S+=3),(e>0||T!==r-1)&&(h.push(R,I,V),S+=3)}l.addGroup(g,S,0),g+=S}function y(_){const w=m,S=new Xt,A=new L;let M=0;const T=_===!0?t:e,P=_===!0?1:-1;for(let I=1;I<=s;I++)u.push(0,p*P,0),f.push(0,P,0),d.push(.5,.5),m++;const R=m;for(let I=0;I<=s;I++){const F=I/s*c+a,D=Math.cos(F),B=Math.sin(F);A.x=T*B,A.y=p*P,A.z=T*D,u.push(A.x,A.y,A.z),f.push(0,P,0),S.x=D*.5+.5,S.y=B*.5*P+.5,d.push(S.x,S.y),m++}for(let I=0;I<s;I++){const V=w+I,F=R+I;_===!0?h.push(F,F+1,V):h.push(F+1,F,V),M+=3}l.addGroup(g,M,_===!0?1:2),g+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cc(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Rc extends Cc{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Rc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Qs extends he{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],m=[],v=[],p=[];for(let g=0;g<h;g++){const x=g*f-o;for(let y=0;y<l;y++){const _=y*u-r;m.push(_,-x,0),v.push(0,0,1),p.push(y/a),p.push(1-g/c)}}for(let g=0;g<c;g++)for(let x=0;x<a;x++){const y=x+l*g,_=x+l*(g+1),w=x+1+l*(g+1),S=x+1+l*g;d.push(y,_,S),d.push(_,w,S)}this.setIndex(d),this.setAttribute("position",new Jt(m,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Pc extends he{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new L,f=new L,d=[],m=[],v=[],p=[];for(let g=0;g<=n;g++){const x=[],y=g/n,_=o+y*a,w=t*Math.cos(_),S=Math.sqrt(t*t-w*w);let A=0;g===0&&o===0?A=.5/e:g===n&&c===Math.PI&&(A=-.5/e);for(let M=0;M<=e;M++){const T=M/e,P=s+T*r;u.x=-S*Math.cos(P),u.y=w,u.z=S*Math.sin(P),m.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),p.push(T+A,1-y),x.push(l++)}h.push(x)}for(let g=0;g<n;g++)for(let x=0;x<e;x++){const y=h[g][x+1],_=h[g][x],w=h[g+1][x],S=h[g+1][x+1];(g!==0||o>0)&&d.push(y,_,S),(g!==n-1||c<Math.PI)&&d.push(_,w,S)}this.setIndex(d),this.setAttribute("position",new Jt(m,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function xs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(El(s))s.isRenderTargetTexture?(Nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(El(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ve(i){const t={};for(let e=0;e<i.length;e++){const n=xs(i[e]);for(const s in n)t[s]=n[s]}return t}function El(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Dd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function bu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const Ud={clone:xs,merge:Ve};var Nd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends Bi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nd,this.fragmentShader=Fd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xs(t.uniforms),this.uniformsGroups=Dd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Gt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Xt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new fe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new kt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new oe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Od extends Vn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Su extends Bi{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Gt(16777215),this.specular=new Gt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ja,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=gc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class kd extends Bi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bd extends Bi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class wu extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class zd extends wu{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ho=new oe,Tl=new L,Al=new L;class Vd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ac,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Tl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Tl),Al.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Al),e.updateMatrixWorld(),Ho.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ho,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Xs||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ho)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ar=new L,Cr=new an,Tn=new L;class Eu extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ar,Cr,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ar,Cr,Tn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Ar,Cr,Tn),Tn.x===1&&Tn.y===1&&Tn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ar,Cr,Tn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ui=new L,Cl=new Xt,Rl=new Xt;class fn extends Eu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ja*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ja*2*Math.atan(Math.tan(vo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ui.x,ui.y).multiplyScalar(-t/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-t/ui.z)}getViewSize(t,e){return this.getViewBounds(t,Cl,Rl),e.subVectors(Rl,Cl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(vo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class tr extends Eu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Hd extends Vd{constructor(){super(new tr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Pl extends wu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new Hd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Qi=-90,ts=1;class Gd extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new fn(Qi,ts,t,e);s.layers=this.layers,this.add(s);const r=new fn(Qi,ts,t,e);r.layers=this.layers,this.add(r);const o=new fn(Qi,ts,t,e);o.layers=this.layers,this.add(o);const a=new fn(Qi,ts,t,e);a.layers=this.layers,this.add(a);const c=new fn(Qi,ts,t,e);c.layers=this.layers,this.add(c);const l=new fn(Qi,ts,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Wd extends fn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Il=new oe;class Tu{constructor(t,e,n=0,s=1/0){this.ray=new oo(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Tc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Yt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Il.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Il),this}intersectObject(t,e=!0,n=[]){return ec(t,this,n,e),n.sort(Ll),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ec(t[s],this,n,e);return n.sort(Ll),n}}function Ll(i,t){return i.distance-t.distance}function ec(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)ec(r[o],t,e,!0)}}class Au{static{Au.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}}class Xd extends In{constructor(t=10,e=10,n=4473924,s=8947848){n=new Gt(n),s=new Gt(s);const r=e/2,o=t/e,a=t/2,c=[],l=[];for(let f=0,d=0,m=-a;f<=e;f++,m+=o){c.push(-a,0,m,a,0,m),c.push(m,0,-a,m,0,a);const v=f===r?n:s;v.toArray(l,d),d+=3,v.toArray(l,d),d+=3,v.toArray(l,d),d+=3,v.toArray(l,d),d+=3}const h=new he;h.setAttribute("position",new Jt(c,3)),h.setAttribute("color",new Jt(l,3));const u=new ye({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function Dl(i,t,e,n){const s=$d(n);switch(e){case uu:return i*t;case du:return i*t/s.components*s.byteLength;case Mc:return i*t/s.components*s.byteLength;case Fi:return i*t*2/s.components*s.byteLength;case yc:return i*t*2/s.components*s.byteLength;case fu:return i*t*3/s.components*s.byteLength;case yn:return i*t*4/s.components*s.byteLength;case bc:return i*t*4/s.components*s.byteLength;case zr:case Vr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Hr:case Gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ba:case wa:return Math.max(i,16)*Math.max(t,8)/4;case ya:case Sa:return Math.max(i,8)*Math.max(t,8)/2;case Ea:case Ta:case Ca:case Ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Aa:case qr:case Pa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case La:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Da:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ua:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Na:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Fa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ka:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Va:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ga:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Wa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Xa:case $a:case qa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ya:case Ka:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Yr:case Za:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function $d(i){switch(i){case sn:case au:return{byteLength:1,components:1};case Gs:case cu:case ei:return{byteLength:2,components:1};case xc:case _c:return{byteLength:2,components:4};case Bn:case vc:case Dn:return{byteLength:4,components:1};case lu:case hu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mc}}));typeof window<"u"&&(window.__THREE__?Nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Cu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function qd(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){const m=u[f],v=u[d];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){const v=u[d];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Yd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kd=`#ifdef USE_ALPHAHASH
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
#endif`,Zd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tp=`#ifdef USE_AOMAP
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
#endif`,ep=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,np=`#ifdef USE_BATCHING
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
#endif`,ip=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,op=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ap=`#ifdef USE_IRIDESCENCE
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
#endif`,cp=`#ifdef USE_BUMPMAP
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
#endif`,lp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,vp=`#define PI 3.141592653589793
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
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_p=`vec3 transformedNormal = objectNormal;
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
#endif`,Mp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ep=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tp=`#ifdef USE_ENVMAP
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
#endif`,Ap=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
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
#endif`,Ip=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Up=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Np=`#ifdef USE_GRADIENTMAP
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
}`,Fp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,zp=`#ifdef USE_ENVMAP
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
#endif`,Vp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xp=`PhysicalMaterial material;
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
#endif`,$p=`uniform sampler2D dfgLUT;
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
}`,qp=`
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
#endif`,Yp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,em=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sm=`#if defined( USE_POINTS_UV )
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
#endif`,rm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,am=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`#ifdef USE_MORPHTARGETS
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
#endif`,um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vm=`#ifdef USE_NORMALMAP
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
#endif`,xm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_m=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Em=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dm=`float getShadowMask() {
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
}`,Um=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nm=`#ifdef USE_SKINNING
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
#endif`,Fm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Om=`#ifdef USE_SKINNING
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
#endif`,km=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hm=`#ifdef USE_TRANSMISSION
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
#endif`,Gm=`#ifdef USE_TRANSMISSION
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
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Km=`uniform sampler2D t2D;
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
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`#include <common>
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
}`,eg=`#if DEPTH_PACKING == 3200
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
}`,ng=`#define DISTANCE
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
}`,ig=`#define DISTANCE
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
}`,sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`uniform float scale;
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
}`,ag=`uniform vec3 diffuse;
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
}`,cg=`#include <common>
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
}`,lg=`uniform vec3 diffuse;
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
}`,hg=`#define LAMBERT
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
}`,ug=`#define LAMBERT
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
}`,fg=`#define MATCAP
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
}`,dg=`#define MATCAP
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
}`,pg=`#define NORMAL
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
}`,mg=`#define NORMAL
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
}`,gg=`#define PHONG
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
}`,vg=`#define PHONG
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
}`,xg=`#define STANDARD
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
}`,_g=`#define STANDARD
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
}`,Mg=`#define TOON
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
}`,yg=`#define TOON
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
}`,bg=`uniform float size;
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
}`,Sg=`uniform vec3 diffuse;
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
}`,wg=`#include <common>
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
}`,Eg=`uniform vec3 color;
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
}`,Tg=`uniform float rotation;
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
}`,Ag=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:Yd,alphahash_pars_fragment:Kd,alphamap_fragment:Zd,alphamap_pars_fragment:jd,alphatest_fragment:Jd,alphatest_pars_fragment:Qd,aomap_fragment:tp,aomap_pars_fragment:ep,batching_pars_vertex:np,batching_vertex:ip,begin_vertex:sp,beginnormal_vertex:rp,bsdfs:op,iridescence_fragment:ap,bumpmap_pars_fragment:cp,clipping_planes_fragment:lp,clipping_planes_pars_fragment:hp,clipping_planes_pars_vertex:up,clipping_planes_vertex:fp,color_fragment:dp,color_pars_fragment:pp,color_pars_vertex:mp,color_vertex:gp,common:vp,cube_uv_reflection_fragment:xp,defaultnormal_vertex:_p,displacementmap_pars_vertex:Mp,displacementmap_vertex:yp,emissivemap_fragment:bp,emissivemap_pars_fragment:Sp,colorspace_fragment:wp,colorspace_pars_fragment:Ep,envmap_fragment:Tp,envmap_common_pars_fragment:Ap,envmap_pars_fragment:Cp,envmap_pars_vertex:Rp,envmap_physical_pars_fragment:zp,envmap_vertex:Pp,fog_vertex:Ip,fog_pars_vertex:Lp,fog_fragment:Dp,fog_pars_fragment:Up,gradientmap_pars_fragment:Np,lightmap_pars_fragment:Fp,lights_lambert_fragment:Op,lights_lambert_pars_fragment:kp,lights_pars_begin:Bp,lights_toon_fragment:Vp,lights_toon_pars_fragment:Hp,lights_phong_fragment:Gp,lights_phong_pars_fragment:Wp,lights_physical_fragment:Xp,lights_physical_pars_fragment:$p,lights_fragment_begin:qp,lights_fragment_maps:Yp,lights_fragment_end:Kp,lightprobes_pars_fragment:Zp,logdepthbuf_fragment:jp,logdepthbuf_pars_fragment:Jp,logdepthbuf_pars_vertex:Qp,logdepthbuf_vertex:tm,map_fragment:em,map_pars_fragment:nm,map_particle_fragment:im,map_particle_pars_fragment:sm,metalnessmap_fragment:rm,metalnessmap_pars_fragment:om,morphinstance_vertex:am,morphcolor_vertex:cm,morphnormal_vertex:lm,morphtarget_pars_vertex:hm,morphtarget_vertex:um,normal_fragment_begin:fm,normal_fragment_maps:dm,normal_pars_fragment:pm,normal_pars_vertex:mm,normal_vertex:gm,normalmap_pars_fragment:vm,clearcoat_normal_fragment_begin:xm,clearcoat_normal_fragment_maps:_m,clearcoat_pars_fragment:Mm,iridescence_pars_fragment:ym,opaque_fragment:bm,packing:Sm,premultiplied_alpha_fragment:wm,project_vertex:Em,dithering_fragment:Tm,dithering_pars_fragment:Am,roughnessmap_fragment:Cm,roughnessmap_pars_fragment:Rm,shadowmap_pars_fragment:Pm,shadowmap_pars_vertex:Im,shadowmap_vertex:Lm,shadowmask_pars_fragment:Dm,skinbase_vertex:Um,skinning_pars_vertex:Nm,skinning_vertex:Fm,skinnormal_vertex:Om,specularmap_fragment:km,specularmap_pars_fragment:Bm,tonemapping_fragment:zm,tonemapping_pars_fragment:Vm,transmission_fragment:Hm,transmission_pars_fragment:Gm,uv_pars_fragment:Wm,uv_pars_vertex:Xm,uv_vertex:$m,worldpos_vertex:qm,background_vert:Ym,background_frag:Km,backgroundCube_vert:Zm,backgroundCube_frag:jm,cube_vert:Jm,cube_frag:Qm,depth_vert:tg,depth_frag:eg,distance_vert:ng,distance_frag:ig,equirect_vert:sg,equirect_frag:rg,linedashed_vert:og,linedashed_frag:ag,meshbasic_vert:cg,meshbasic_frag:lg,meshlambert_vert:hg,meshlambert_frag:ug,meshmatcap_vert:fg,meshmatcap_frag:dg,meshnormal_vert:pg,meshnormal_frag:mg,meshphong_vert:gg,meshphong_frag:vg,meshphysical_vert:xg,meshphysical_frag:_g,meshtoon_vert:Mg,meshtoon_frag:yg,points_vert:bg,points_frag:Sg,shadow_vert:wg,shadow_frag:Eg,sprite_vert:Tg,sprite_frag:Ag},pt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},Pn={basic:{uniforms:Ve([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Ve([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Ve([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Ve([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Ve([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Ve([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Ve([pt.points,pt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Ve([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Ve([pt.common,pt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Ve([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Ve([pt.sprite,pt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:Ve([pt.common,pt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:Ve([pt.lights,pt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Pn.physical={uniforms:Ve([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const Rr={r:0,b:0,g:0},Cg=new oe,Ru=new kt;Ru.set(-1,0,0,0,1,0,0,0,1);function Rg(i,t,e,n,s,r){const o=new Gt(0);let a=s===!0?0:1,c,l,h=null,u=0,f=null;function d(x){let y=x.isScene===!0?x.background:null;if(y&&y.isTexture){const _=x.backgroundBlurriness>0;y=t.get(y,_)}return y}function m(x){let y=!1;const _=d(x);_===null?p(o,a):_&&_.isColor&&(p(_,1),y=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,y){const _=d(y);_&&(_.isCubeTexture||_.mapping===ro)?(l===void 0&&(l=new be(new Oi(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:xs(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Cg.makeRotationFromEuler(y.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ru),l.material.toneMapped=$t.getTransfer(_.colorSpace)!==ee,(h!==_||u!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,f=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new be(new Qs(2,2),new Vn({name:"BackgroundMaterial",uniforms:xs(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=$t.getTransfer(_.colorSpace)!==ee,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,f=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,y){x.getRGB(Rr,bu(i)),e.buffers.color.setClear(Rr.r,Rr.g,Rr.b,y,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),a=y,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,p(o,a)},render:m,addToRenderList:v,dispose:g}}function Pg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(R,I,V,F,D){let B=!1;const k=u(R,F,V,I);r!==k&&(r=k,l(r.object)),B=d(R,F,V,D),B&&m(R,F,V,D),D!==null&&t.update(D,i.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,_(R,I,V,F),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function u(R,I,V,F){const D=F.wireframe===!0;let B=n[I.id];B===void 0&&(B={},n[I.id]=B);const k=R.isInstancedMesh===!0?R.id:0;let $=B[k];$===void 0&&($={},B[k]=$);let j=$[V.id];j===void 0&&(j={},$[V.id]=j);let it=j[D];return it===void 0&&(it=f(c()),j[D]=it),it}function f(R){const I=[],V=[],F=[];for(let D=0;D<e;D++)I[D]=0,V[D]=0,F[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:F,object:R,attributes:{},index:null}}function d(R,I,V,F){const D=r.attributes,B=I.attributes;let k=0;const $=V.getAttributes();for(const j in $)if($[j].location>=0){const tt=D[j];let ot=B[j];if(ot===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(ot=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(ot=R.instanceColor)),tt===void 0||tt.attribute!==ot||ot&&tt.data!==ot.data)return!0;k++}return r.attributesNum!==k||r.index!==F}function m(R,I,V,F){const D={},B=I.attributes;let k=0;const $=V.getAttributes();for(const j in $)if($[j].location>=0){let tt=B[j];tt===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(tt=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(tt=R.instanceColor));const ot={};ot.attribute=tt,tt&&tt.data&&(ot.data=tt.data),D[j]=ot,k++}r.attributes=D,r.attributesNum=k,r.index=F}function v(){const R=r.newAttributes;for(let I=0,V=R.length;I<V;I++)R[I]=0}function p(R){g(R,0)}function g(R,I){const V=r.newAttributes,F=r.enabledAttributes,D=r.attributeDivisors;V[R]=1,F[R]===0&&(i.enableVertexAttribArray(R),F[R]=1),D[R]!==I&&(i.vertexAttribDivisor(R,I),D[R]=I)}function x(){const R=r.newAttributes,I=r.enabledAttributes;for(let V=0,F=I.length;V<F;V++)I[V]!==R[V]&&(i.disableVertexAttribArray(V),I[V]=0)}function y(R,I,V,F,D,B,k){k===!0?i.vertexAttribIPointer(R,I,V,D,B):i.vertexAttribPointer(R,I,V,F,D,B)}function _(R,I,V,F){v();const D=F.attributes,B=V.getAttributes(),k=I.defaultAttributeValues;for(const $ in B){const j=B[$];if(j.location>=0){let it=D[$];if(it===void 0&&($==="instanceMatrix"&&R.instanceMatrix&&(it=R.instanceMatrix),$==="instanceColor"&&R.instanceColor&&(it=R.instanceColor)),it!==void 0){const tt=it.normalized,ot=it.itemSize,St=t.get(it);if(St===void 0)continue;const Ft=St.buffer,wt=St.type,q=St.bytesPerElement,st=wt===i.INT||wt===i.UNSIGNED_INT||it.gpuType===vc;if(it.isInterleavedBufferAttribute){const nt=it.data,yt=nt.stride,Ut=it.offset;if(nt.isInstancedInterleavedBuffer){for(let Et=0;Et<j.locationSize;Et++)g(j.location+Et,nt.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Et=0;Et<j.locationSize;Et++)p(j.location+Et);i.bindBuffer(i.ARRAY_BUFFER,Ft);for(let Et=0;Et<j.locationSize;Et++)y(j.location+Et,ot/j.locationSize,wt,tt,yt*q,(Ut+ot/j.locationSize*Et)*q,st)}else{if(it.isInstancedBufferAttribute){for(let nt=0;nt<j.locationSize;nt++)g(j.location+nt,it.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let nt=0;nt<j.locationSize;nt++)p(j.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Ft);for(let nt=0;nt<j.locationSize;nt++)y(j.location+nt,ot/j.locationSize,wt,tt,ot*q,ot/j.locationSize*nt*q,st)}}else if(k!==void 0){const tt=k[$];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(j.location,tt);break;case 3:i.vertexAttrib3fv(j.location,tt);break;case 4:i.vertexAttrib4fv(j.location,tt);break;default:i.vertexAttrib1fv(j.location,tt)}}}}x()}function w(){T();for(const R in n){const I=n[R];for(const V in I){const F=I[V];for(const D in F){const B=F[D];for(const k in B)h(B[k].object),delete B[k];delete F[D]}}delete n[R]}}function S(R){if(n[R.id]===void 0)return;const I=n[R.id];for(const V in I){const F=I[V];for(const D in F){const B=F[D];for(const k in B)h(B[k].object),delete B[k];delete F[D]}}delete n[R.id]}function A(R){for(const I in n){const V=n[I];for(const F in V){const D=V[F];if(D[R.id]===void 0)continue;const B=D[R.id];for(const k in B)h(B[k].object),delete B[k];delete D[R.id]}}}function M(R){for(const I in n){const V=n[I],F=R.isInstancedMesh===!0?R.id:0,D=V[F];if(D!==void 0){for(const B in D){const k=D[B];for(const $ in k)h(k[$].object),delete k[$];delete D[B]}delete V[F],Object.keys(V).length===0&&delete n[I]}}}function T(){P(),o=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:M,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:p,disableUnusedAttributes:x}}function Ig(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function a(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Lg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==yn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const M=A===ei&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==sn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Dn&&!M)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Nt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:_,maxSamples:w,samples:S}}function Dg(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Kn,a=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const m=u.clippingPlanes,v=u.clipIntersection,p=u.clipShadows,g=i.get(u);if(!s||m===null||m.length===0||r&&!p)r?h(null):l();else{const x=r?0:n,y=x*4;let _=g.clippingState||null;c.value=_,_=h(m,f,y,d);for(let w=0;w!==y;++w)_[w]=e[w];g.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){const v=u!==null?u.length:0;let p=null;if(v!==0){if(p=c.value,m!==!0||p===null){const g=d+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<g)&&(p=new Float32Array(g));for(let y=0,_=d;y!==v;++y,_+=4)o.copy(u[y]).applyMatrix4(x,a),o.normal.toArray(p,_),p[_+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}const gi=4,Ul=[.125,.215,.35,.446,.526,.582],Pi=20,Ug=256,Cs=new tr,Nl=new Gt;let Go=null,Wo=0,Xo=0,$o=!1;const Ng=new L;class Fl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Ng}=r;Go=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Xo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Go,Wo,Xo),this._renderer.xr.enabled=$o,t.scissorTest=!1,es(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ui||t.mapping===gs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Go=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Xo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Be,minFilter:Be,generateMipmaps:!1,type:ei,format:yn,colorSpace:Kr,depthBuffer:!1},s=Ol(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ol(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Fg(r)),this._blurMaterial=kg(r,t,e),this._ggxMaterial=Og(r,t,e)}return s}_compileMaterial(t){const e=new be(new he,t);this._renderer.compile(e,Cs)}_sceneToCubeUV(t,e,n,s,r){const c=new fn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Nl),u.toneMapping=Nn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new be(new Oi,new bn({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,p=v.material;let g=!1;const x=t.background;x?x.isColor&&(p.color.copy(x),t.background=null,g=!0):(p.color.copy(Nl),g=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):_===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));const w=this._cubeSize;es(s,_*w,y>2?w:0,w,w),u.setRenderTarget(s),g&&u.render(v,c),u.render(t,c)}u.toneMapping=d,u.autoClear=f,t.background=x}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ui||t.mapping===gs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;es(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Cs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=0+l*1.25,d=u*f,{_lodMax:m}=this,v=this._sizeLods[n],p=3*v*(n>m-gi?n-m+gi:0),g=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=m-e,es(r,p,g,3*v,2*v),s.setRenderTarget(r),s.render(a,Cs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,es(t,p,g,3*v,2*v),s.setRenderTarget(t),s.render(a,Cs)}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Yt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=l;const f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Pi-1),v=r/m,p=isFinite(r)?1+Math.floor(h*v):Pi;p>Pi&&Nt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Pi}`);const g=[];let x=0;for(let A=0;A<Pi;++A){const M=A/v,T=Math.exp(-M*M/2);g.push(T),A===0?x+=T:A<p&&(x+=2*T)}for(let A=0;A<g.length;A++)g[A]=g[A]/x;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=g,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=m,f.mipInt.value=y-n;const _=this._sizeLods[s],w=3*_*(s>y-gi?s-y+gi:0),S=4*(this._cubeSize-_);es(e,w,S,3*_,2*_),c.setRenderTarget(e),c.render(u,Cs)}}function Fg(i){const t=[],e=[],n=[];let s=i;const r=i-gi+1+Ul.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-gi?c=Ul[o-i+gi-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,v=3,p=2,g=1,x=new Float32Array(v*m*d),y=new Float32Array(p*m*d),_=new Float32Array(g*m*d);for(let S=0;S<d;S++){const A=S%3*2/3-1,M=S>2?0:-1,T=[A,M,0,A+2/3,M,0,A+2/3,M+1,0,A,M,0,A+2/3,M+1,0,A,M+1,0];x.set(T,v*m*S),y.set(f,p*m*S);const P=[S,S,S,S,S,S];_.set(P,g*m*S)}const w=new he;w.setAttribute("position",new On(x,v)),w.setAttribute("uv",new On(y,p)),w.setAttribute("faceIndex",new On(_,g)),n.push(new be(w,null)),s>gi&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Ol(i,t,e){const n=new Fn(i,t,e);return n.texture.mapping=ro,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function es(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Og(i,t,e){return new Vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ug,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ao(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function kg(i,t,e){const n=new Float32Array(Pi),s=new L(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:Pi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ao(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function kl(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ao(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Bl(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function ao(){return`

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
	`}class Pu extends Fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new _u(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Oi(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:je,blending:Qn});r.uniforms.tEquirect.value=e;const o=new be(s,r),a=e.minFilter;return e.minFilter===Ii&&(e.minFilter=Be),new Gd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}function Bg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===po||d===mo)if(t.has(f)){const m=t.get(f).texture;return a(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const v=new Pu(m.height);return v.fromEquirectangularTexture(i,f),t.set(f,v),f.addEventListener("dispose",l),a(v.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const d=f.mapping,m=d===po||d===mo,v=d===Ui||d===gs;if(m||v){let p=e.get(f);const g=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new Fl(i)),p=m?n.fromEquirectangular(f,p):n.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,e.set(f,p),p.texture;if(p!==void 0)return p.texture;{const x=f.image;return m&&x&&x.height>0||v&&x&&c(x)?(n===null&&(n=new Fl(i)),p=m?n.fromEquirectangular(f):n.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,e.set(f,p),f.addEventListener("dispose",h),p.texture):null}}}return f}function a(f,d){return d===po?f.mapping=Ui:d===mo&&(f.mapping=gs),f}function c(f){let d=0;const m=6;for(let v=0;v<m;v++)f[v]!==void 0&&d++;return d===m}function l(f){const d=f.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function zg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&us("WebGLRenderer: "+n+" extension not supported."),s}}}function Vg(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,m=u.attributes.position;let v=0;if(m===void 0)return;if(d!==null){const x=d.array;v=d.version;for(let y=0,_=x.length;y<_;y+=3){const w=x[y+0],S=x[y+1],A=x[y+2];f.push(w,S,S,A,A,w)}}else{const x=m.array;v=m.version;for(let y=0,_=x.length/3-1;y<_;y+=3){const w=y+0,S=y+1,A=y+2;f.push(w,S,S,A,A,w)}}const p=new(m.count>=65535?xu:vu)(f,1);p.version=v;const g=r.get(u);g&&t.remove(g),r.set(u,p)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Hg(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),e.update(f,n,d))}function h(u,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let v=0;for(let p=0;p<d;p++)v+=f[p];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Gg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Yt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Wg(i,t,e){const n=new WeakMap,s=new fe;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let T=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;d===!0&&(y=1),m===!0&&(y=2),v===!0&&(y=3);let _=a.attributes.position.count*y,w=1;_>t.maxTextureSize&&(w=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const S=new Float32Array(_*w*4*u),A=new mu(S,_,w,u);A.type=Dn,A.needsUpdate=!0;const M=y*4;for(let P=0;P<u;P++){const R=p[P],I=g[P],V=x[P],F=_*w*4*P;for(let D=0;D<R.count;D++){const B=D*M;d===!0&&(s.fromBufferAttribute(R,D),S[F+B+0]=s.x,S[F+B+1]=s.y,S[F+B+2]=s.z,S[F+B+3]=0),m===!0&&(s.fromBufferAttribute(I,D),S[F+B+4]=s.x,S[F+B+5]=s.y,S[F+B+6]=s.z,S[F+B+7]=0),v===!0&&(s.fromBufferAttribute(V,D),S[F+B+8]=s.x,S[F+B+9]=s.y,S[F+B+10]=s.z,S[F+B+11]=V.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new Xt(_,w)},n.set(a,f),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Xg(i,t,e,n,s){let r=new WeakMap;function o(l){const h=s.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}const $g={[Qh]:"LINEAR_TONE_MAPPING",[tu]:"REINHARD_TONE_MAPPING",[eu]:"CINEON_TONE_MAPPING",[nu]:"ACES_FILMIC_TONE_MAPPING",[su]:"AGX_TONE_MAPPING",[ru]:"NEUTRAL_TONE_MAPPING",[iu]:"CUSTOM_TONE_MAPPING"};function qg(i,t,e,n,s,r){const o=new Fn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new vs(t,e):void 0}),a=new Fn(t,e,{type:ei,depthBuffer:!1,stencilBuffer:!1}),c=new he;c.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Jt([0,2,0,0,2,0],2));const l=new Od({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new be(c,l),u=new tr(-1,1,1,-1,0,1);let f=null,d=null,m=!1,v,p=null,g=[],x=!1;this.setSize=function(y,_){o.setSize(y,_),a.setSize(y,_);for(let w=0;w<g.length;w++){const S=g[w];S.setSize&&S.setSize(y,_)}},this.setEffects=function(y){g=y,x=g.length>0&&g[0].isRenderPass===!0;const _=o.width,w=o.height;for(let S=0;S<g.length;S++){const A=g[S];A.setSize&&A.setSize(_,w)}},this.begin=function(y,_){if(m||y.toneMapping===Nn&&g.length===0)return!1;if(p=_,_!==null){const w=_.width,S=_.height;(o.width!==w||o.height!==S)&&this.setSize(w,S)}return x===!1&&y.setRenderTarget(o),v=y.toneMapping,y.toneMapping=Nn,!0},this.hasRenderPass=function(){return x},this.end=function(y,_){y.toneMapping=v,m=!0;let w=o,S=a;for(let A=0;A<g.length;A++){const M=g[A];if(M.enabled!==!1&&(M.render(y,S,w,_),M.needsSwap!==!1)){const T=w;w=S,S=T}}if(f!==y.outputColorSpace||d!==y.toneMapping){f=y.outputColorSpace,d=y.toneMapping,l.defines={},$t.getTransfer(f)===ee&&(l.defines.SRGB_TRANSFER="");const A=$g[d];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(p),y.render(h,u),p=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),c.dispose(),l.dispose()}}const Iu=new ze,nc=new vs(1,1),Lu=new mu,Du=new md,Uu=new _u,zl=[],Vl=[],Hl=new Float32Array(16),Gl=new Float32Array(9),Wl=new Float32Array(4);function ys(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=zl[s];if(r===void 0&&(r=new Float32Array(s),zl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function co(i,t){let e=Vl[t];e===void 0&&(e=new Int32Array(t),Vl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Yg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Kg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function Zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function jg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function Jg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Wl.set(n),i.uniformMatrix2fv(this.addr,!1,Wl),Te(e,n)}}function Qg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Gl.set(n),i.uniformMatrix3fv(this.addr,!1,Gl),Te(e,n)}}function t0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Hl.set(n),i.uniformMatrix4fv(this.addr,!1,Hl),Te(e,n)}}function e0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function n0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function i0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function s0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function r0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function o0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function a0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function c0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function l0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(nc.compareFunction=e.isReversedDepthBuffer()?wc:Sc,r=nc):r=Iu,e.setTexture2D(t||r,s)}function h0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Du,s)}function u0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Uu,s)}function f0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Lu,s)}function d0(i){switch(i){case 5126:return Yg;case 35664:return Kg;case 35665:return Zg;case 35666:return jg;case 35674:return Jg;case 35675:return Qg;case 35676:return t0;case 5124:case 35670:return e0;case 35667:case 35671:return n0;case 35668:case 35672:return i0;case 35669:case 35673:return s0;case 5125:return r0;case 36294:return o0;case 36295:return a0;case 36296:return c0;case 35678:case 36198:case 36298:case 36306:case 35682:return l0;case 35679:case 36299:case 36307:return h0;case 35680:case 36300:case 36308:case 36293:return u0;case 36289:case 36303:case 36311:case 36292:return f0}}function p0(i,t){i.uniform1fv(this.addr,t)}function m0(i,t){const e=ys(t,this.size,2);i.uniform2fv(this.addr,e)}function g0(i,t){const e=ys(t,this.size,3);i.uniform3fv(this.addr,e)}function v0(i,t){const e=ys(t,this.size,4);i.uniform4fv(this.addr,e)}function x0(i,t){const e=ys(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function _0(i,t){const e=ys(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function M0(i,t){const e=ys(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function y0(i,t){i.uniform1iv(this.addr,t)}function b0(i,t){i.uniform2iv(this.addr,t)}function S0(i,t){i.uniform3iv(this.addr,t)}function w0(i,t){i.uniform4iv(this.addr,t)}function E0(i,t){i.uniform1uiv(this.addr,t)}function T0(i,t){i.uniform2uiv(this.addr,t)}function A0(i,t){i.uniform3uiv(this.addr,t)}function C0(i,t){i.uniform4uiv(this.addr,t)}function R0(i,t,e){const n=this.cache,s=t.length,r=co(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=nc:o=Iu;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function P0(i,t,e){const n=this.cache,s=t.length,r=co(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Du,r[o])}function I0(i,t,e){const n=this.cache,s=t.length,r=co(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Uu,r[o])}function L0(i,t,e){const n=this.cache,s=t.length,r=co(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Lu,r[o])}function D0(i){switch(i){case 5126:return p0;case 35664:return m0;case 35665:return g0;case 35666:return v0;case 35674:return x0;case 35675:return _0;case 35676:return M0;case 5124:case 35670:return y0;case 35667:case 35671:return b0;case 35668:case 35672:return S0;case 35669:case 35673:return w0;case 5125:return E0;case 36294:return T0;case 36295:return A0;case 36296:return C0;case 35678:case 36198:case 36298:case 36306:case 35682:return R0;case 35679:case 36299:case 36307:return P0;case 35680:case 36300:case 36308:case 36293:return I0;case 36289:case 36303:case 36311:case 36292:return L0}}class U0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=d0(e.type)}}class N0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=D0(e.type)}}class F0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const qo=/(\w+)(\])?(\[|\.)?/g;function Xl(i,t){i.seq.push(t),i.map[t.id]=t}function O0(i,t,e){const n=i.name,s=n.length;for(qo.lastIndex=0;;){const r=qo.exec(n),o=qo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Xl(e,l===void 0?new U0(a,i,t):new N0(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new F0(a),Xl(e,u)),e=u}}}class Wr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);O0(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function $l(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const k0=37297;let B0=0;function z0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const ql=new kt;function V0(i){$t._getMatrix(ql,$t.workingColorSpace,i);const t=`mat3( ${ql.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case Zr:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return Nt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Yl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+z0(i.getShaderSource(t),a)}else return r}function H0(i,t){const e=V0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const G0={[Qh]:"Linear",[tu]:"Reinhard",[eu]:"Cineon",[nu]:"ACESFilmic",[su]:"AgX",[ru]:"Neutral",[iu]:"Custom"};function W0(i,t){const e=G0[t];return e===void 0?(Nt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Pr=new L;function X0(){$t.getLuminanceCoefficients(Pr);const i=Pr.x.toFixed(4),t=Pr.y.toFixed(4),e=Pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Os).join(`
`)}function q0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Y0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Os(i){return i!==""}function Kl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const K0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ic(i){return i.replace(K0,j0)}const Z0=new Map;function j0(i,t){let e=Vt[t];if(e===void 0){const n=Z0.get(t);if(n!==void 0)e=Vt[n],Nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return ic(e)}const J0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jl(i){return i.replace(J0,Q0)}function Q0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Jl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const tv={[Br]:"SHADOWMAP_TYPE_PCF",[Fs]:"SHADOWMAP_TYPE_VSM"};function ev(i){return tv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const nv={[Ui]:"ENVMAP_TYPE_CUBE",[gs]:"ENVMAP_TYPE_CUBE",[ro]:"ENVMAP_TYPE_CUBE_UV"};function iv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":nv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const sv={[gs]:"ENVMAP_MODE_REFRACTION"};function rv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":sv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ov={[gc]:"ENVMAP_BLENDING_MULTIPLY",[Yf]:"ENVMAP_BLENDING_MIX",[Kf]:"ENVMAP_BLENDING_ADD"};function av(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ov[i.combine]||"ENVMAP_BLENDING_NONE"}function cv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function lv(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=ev(e),l=iv(e),h=rv(e),u=av(e),f=cv(e),d=$0(e),m=q0(r),v=s.createProgram();let p,g,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Os).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Os).join(`
`),g.length>0&&(g+=`
`)):(p=[Jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Os).join(`
`),g=[Jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Nn?"#define TONE_MAPPING":"",e.toneMapping!==Nn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Nn?W0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,H0("linearToOutputTexel",e.outputColorSpace),X0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Os).join(`
`)),o=ic(o),o=Kl(o,e),o=Zl(o,e),a=ic(a),a=Kl(a,e),a=Zl(a,e),o=jl(o),a=jl(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===nl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===nl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=x+p+o,_=x+g+a,w=$l(s,s.VERTEX_SHADER,y),S=$l(s,s.FRAGMENT_SHADER,_);s.attachShader(v,w),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(R){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(w)||"",F=s.getShaderInfoLog(S)||"",D=I.trim(),B=V.trim(),k=F.trim();let $=!0,j=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,w,S);else{const it=Yl(s,w,"vertex"),tt=Yl(s,S,"fragment");Yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+D+`
`+it+`
`+tt)}else D!==""?Nt("WebGLProgram: Program Info Log:",D):(B===""||k==="")&&(j=!1);j&&(R.diagnostics={runnable:$,programLog:D,vertexShader:{log:B,prefix:p},fragmentShader:{log:k,prefix:g}})}s.deleteShader(w),s.deleteShader(S),M=new Wr(s,v),T=Y0(s,v)}let M;this.getUniforms=function(){return M===void 0&&A(this),M};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,k0)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=B0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=S,this}let hv=0;class uv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new fv(t),e.set(t,n)),n}}class fv{constructor(t){this.id=hv++,this.code=t,this.usedTimes=0}}function dv(i){return i===Fi||i===qr||i===Yr}function pv(i,t,e,n,s,r){const o=new Tc,a=new uv,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(M){return c.add(M),M===0?"uv":`uv${M}`}function v(M,T,P,R,I,V){const F=R.fog,D=I.geometry,B=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?R.environment:null,k=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,$=t.get(M.envMap||B,k),j=$&&$.mapping===ro?$.image.height:null,it=d[M.type];M.precision!==null&&(f=n.getMaxPrecision(M.precision),f!==M.precision&&Nt("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const tt=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ot=tt!==void 0?tt.length:0;let St=0;D.morphAttributes.position!==void 0&&(St=1),D.morphAttributes.normal!==void 0&&(St=2),D.morphAttributes.color!==void 0&&(St=3);let Ft,wt,q,st;if(it){const Mt=Pn[it];Ft=Mt.vertexShader,wt=Mt.fragmentShader}else{Ft=M.vertexShader,wt=M.fragmentShader;const Mt=a.getVertexShaderStage(M),pe=a.getFragmentShaderStage(M);a.update(M,Mt,pe),q=Mt.id,st=pe.id}const nt=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Ut=I.isInstancedMesh===!0,Et=I.isBatchedMesh===!0,Qt=!!M.map,Ot=!!M.matcap,Kt=!!$,Zt=!!M.aoMap,Wt=!!M.lightMap,ue=!!M.bumpMap&&M.wireframe===!1,Se=!!M.normalMap,Ae=!!M.displacementMap,Pe=!!M.emissiveMap,de=!!M.metalnessMap,_e=!!M.roughnessMap,N=M.anisotropy>0,We=M.clearcoat>0,te=M.dispersion>0,C=M.iridescence>0,b=M.sheen>0,z=M.transmission>0,W=N&&!!M.anisotropyMap,Y=We&&!!M.clearcoatMap,at=We&&!!M.clearcoatNormalMap,lt=We&&!!M.clearcoatRoughnessMap,K=C&&!!M.iridescenceMap,Q=C&&!!M.iridescenceThicknessMap,ht=b&&!!M.sheenColorMap,At=b&&!!M.sheenRoughnessMap,dt=!!M.specularMap,ut=!!M.specularColorMap,Lt=!!M.specularIntensityMap,Dt=z&&!!M.transmissionMap,Bt=z&&!!M.thicknessMap,U=!!M.gradientMap,ct=!!M.alphaMap,J=M.alphaTest>0,ft=!!M.alphaHash,vt=!!M.extensions;let et=Nn;M.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(et=i.toneMapping);const Tt={shaderID:it,shaderType:M.type,shaderName:M.name,vertexShader:Ft,fragmentShader:wt,defines:M.defines,customVertexShaderID:q,customFragmentShaderID:st,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Et,batchingColor:Et&&I._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&I.instanceColor!==null,instancingMorph:Ut&&I.morphTexture!==null,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:$t.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:Qt,matcap:Ot,envMap:Kt,envMapMode:Kt&&$.mapping,envMapCubeUVHeight:j,aoMap:Zt,lightMap:Wt,bumpMap:ue,normalMap:Se,displacementMap:Ae,emissiveMap:Pe,normalMapObjectSpace:Se&&M.normalMapType===Jf,normalMapTangentSpace:Se&&M.normalMapType===ja,packedNormalMap:Se&&M.normalMapType===ja&&dv(M.normalMap.format),metalnessMap:de,roughnessMap:_e,anisotropy:N,anisotropyMap:W,clearcoat:We,clearcoatMap:Y,clearcoatNormalMap:at,clearcoatRoughnessMap:lt,dispersion:te,iridescence:C,iridescenceMap:K,iridescenceThicknessMap:Q,sheen:b,sheenColorMap:ht,sheenRoughnessMap:At,specularMap:dt,specularColorMap:ut,specularIntensityMap:Lt,transmission:z,transmissionMap:Dt,thicknessMap:Bt,gradientMap:U,opaque:M.transparent===!1&&M.blending===hs&&M.alphaToCoverage===!1,alphaMap:ct,alphaTest:J,alphaHash:ft,combine:M.combine,mapUv:Qt&&m(M.map.channel),aoMapUv:Zt&&m(M.aoMap.channel),lightMapUv:Wt&&m(M.lightMap.channel),bumpMapUv:ue&&m(M.bumpMap.channel),normalMapUv:Se&&m(M.normalMap.channel),displacementMapUv:Ae&&m(M.displacementMap.channel),emissiveMapUv:Pe&&m(M.emissiveMap.channel),metalnessMapUv:de&&m(M.metalnessMap.channel),roughnessMapUv:_e&&m(M.roughnessMap.channel),anisotropyMapUv:W&&m(M.anisotropyMap.channel),clearcoatMapUv:Y&&m(M.clearcoatMap.channel),clearcoatNormalMapUv:at&&m(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&m(M.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&m(M.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&m(M.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&m(M.sheenColorMap.channel),sheenRoughnessMapUv:At&&m(M.sheenRoughnessMap.channel),specularMapUv:dt&&m(M.specularMap.channel),specularColorMapUv:ut&&m(M.specularColorMap.channel),specularIntensityMapUv:Lt&&m(M.specularIntensityMap.channel),transmissionMapUv:Dt&&m(M.transmissionMap.channel),thicknessMapUv:Bt&&m(M.thicknessMap.channel),alphaMapUv:ct&&m(M.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Se||N),vertexNormals:!!D.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!D.attributes.uv&&(Qt||ct),fog:!!F,useFog:M.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||D.attributes.normal===void 0&&Se===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:yt,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:St,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:et,decodeVideoTexture:Qt&&M.map.isVideoTexture===!0&&$t.getTransfer(M.map.colorSpace)===ee,decodeVideoTextureEmissive:Pe&&M.emissiveMap.isVideoTexture===!0&&$t.getTransfer(M.emissiveMap.colorSpace)===ee,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ge,flipSided:M.side===je,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:vt&&M.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&M.extensions.multiDraw===!0||Et)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Tt.vertexUv1s=c.has(1),Tt.vertexUv2s=c.has(2),Tt.vertexUv3s=c.has(3),c.clear(),Tt}function p(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)T.push(P),T.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(g(T,M),x(T,M),T.push(i.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function g(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),M.push(o.mask)}function y(M){const T=d[M.type];let P;if(T){const R=Pn[T];P=Ud.clone(R.uniforms)}else P=M.uniforms;return P}function _(M,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new lv(i,T,M,s),l.push(P),h.set(T,P)),P}function w(M){if(--M.usedTimes===0){const T=l.indexOf(M);l[T]=l[l.length-1],l.pop(),h.delete(M.cacheKey),M.destroy()}}function S(M){a.remove(M)}function A(){a.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:y,acquireProgram:_,releaseProgram:w,releaseShaderCache:S,programs:l,dispose:A}}function mv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function gv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Ql(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function th(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,m,v,p,g){let x=i[t];return x===void 0?(x={id:f.id,object:f,geometry:d,material:m,materialVariant:o(f),groupOrder:v,renderOrder:f.renderOrder,z:p,group:g},i[t]=x):(x.id=f.id,x.object=f,x.geometry=d,x.material=m,x.materialVariant=o(f),x.groupOrder=v,x.renderOrder=f.renderOrder,x.z=p,x.group=g),t++,x}function c(f,d,m,v,p,g){const x=a(f,d,m,v,p,g);m.transmission>0?n.push(x):m.transparent===!0?s.push(x):e.push(x)}function l(f,d,m,v,p,g){const x=a(f,d,m,v,p,g);m.transmission>0?n.unshift(x):m.transparent===!0?s.unshift(x):e.unshift(x)}function h(f,d,m){e.length>1&&e.sort(f||gv),n.length>1&&n.sort(d||Ql),s.length>1&&s.sort(d||Ql),m&&(e.reverse(),n.reverse(),s.reverse())}function u(){for(let f=t,d=i.length;f<d;f++){const m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function vv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new th,i.set(n,[o])):s>=r.length?(o=new th,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function xv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Gt};break;case"SpotLight":e={position:new L,direction:new L,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function _v(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Mv=0;function yv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function bv(i){const t=new xv,e=_v(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new oe,o=new oe;function a(l){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,m=0,v=0,p=0,g=0,x=0,y=0,_=0,w=0,S=0,A=0;l.sort(yv);for(let T=0,P=l.length;T<P;T++){const R=l[T],I=R.color,V=R.intensity,F=R.distance;let D=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Fi?D=R.shadow.map.texture:D=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=I.r*V,u+=I.g*V,f+=I.b*V;else if(R.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(R.sh.coefficients[B],V);A++}else if(R.isDirectionalLight){const B=t.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const k=R.shadow,$=e.get(R);$.shadowIntensity=k.intensity,$.shadowBias=k.bias,$.shadowNormalBias=k.normalBias,$.shadowRadius=k.radius,$.shadowMapSize=k.mapSize,n.directionalShadow[d]=$,n.directionalShadowMap[d]=D,n.directionalShadowMatrix[d]=R.shadow.matrix,x++}n.directional[d]=B,d++}else if(R.isSpotLight){const B=t.get(R);B.position.setFromMatrixPosition(R.matrixWorld),B.color.copy(I).multiplyScalar(V),B.distance=F,B.coneCos=Math.cos(R.angle),B.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),B.decay=R.decay,n.spot[v]=B;const k=R.shadow;if(R.map&&(n.spotLightMap[w]=R.map,w++,k.updateMatrices(R),R.castShadow&&S++),n.spotLightMatrix[v]=k.matrix,R.castShadow){const $=e.get(R);$.shadowIntensity=k.intensity,$.shadowBias=k.bias,$.shadowNormalBias=k.normalBias,$.shadowRadius=k.radius,$.shadowMapSize=k.mapSize,n.spotShadow[v]=$,n.spotShadowMap[v]=D,_++}v++}else if(R.isRectAreaLight){const B=t.get(R);B.color.copy(I).multiplyScalar(V),B.halfWidth.set(R.width*.5,0,0),B.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=B,p++}else if(R.isPointLight){const B=t.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),B.distance=R.distance,B.decay=R.decay,R.castShadow){const k=R.shadow,$=e.get(R);$.shadowIntensity=k.intensity,$.shadowBias=k.bias,$.shadowNormalBias=k.normalBias,$.shadowRadius=k.radius,$.shadowMapSize=k.mapSize,$.shadowCameraNear=k.camera.near,$.shadowCameraFar=k.camera.far,n.pointShadow[m]=$,n.pointShadowMap[m]=D,n.pointShadowMatrix[m]=R.shadow.matrix,y++}n.point[m]=B,m++}else if(R.isHemisphereLight){const B=t.get(R);B.skyColor.copy(R.color).multiplyScalar(V),B.groundColor.copy(R.groundColor).multiplyScalar(V),n.hemi[g]=B,g++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const M=n.hash;(M.directionalLength!==d||M.pointLength!==m||M.spotLength!==v||M.rectAreaLength!==p||M.hemiLength!==g||M.numDirectionalShadows!==x||M.numPointShadows!==y||M.numSpotShadows!==_||M.numSpotMaps!==w||M.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=p,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+w-S,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,M.directionalLength=d,M.pointLength=m,M.spotLength=v,M.rectAreaLength=p,M.hemiLength=g,M.numDirectionalShadows=x,M.numPointShadows=y,M.numSpotShadows=_,M.numSpotMaps=w,M.numLightProbes=A,n.version=Mv++)}function c(l,h){let u=0,f=0,d=0,m=0,v=0;const p=h.matrixWorldInverse;for(let g=0,x=l.length;g<x;g++){const y=l[g];if(y.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),u++}else if(y.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),d++}else if(y.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(p),o.identity(),r.copy(y.matrixWorld),r.premultiply(p),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(p),v++}}}return{setup:a,setupView:c,state:n}}function eh(i){const t=new bv(i),e=[],n=[],s=[];function r(f){u.camera=f,e.length=0,n.length=0,s.length=0}function o(f){e.push(f)}function a(f){n.push(f)}function c(f){s.push(f)}function l(){t.setup(e)}function h(f){t.setupView(e,f)}const u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function Sv(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new eh(i),t.set(s,[a])):r>=o.length?(a=new eh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const wv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ev=`uniform sampler2D shadow_pass;
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
}`,Tv=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Av=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],nh=new oe,Rs=new L,Yo=new L;function Cv(i,t,e){let n=new Ac;const s=new Xt,r=new Xt,o=new fe,a=new kd,c=new Bd,l={},h=e.maxTextureSize,u={[vi]:je,[je]:vi,[Ge]:Ge},f=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:wv,fragmentShader:Ev}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new he;m.setAttribute("position",new On(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new be(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Br;let g=this.type;this.render=function(S,A,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;this.type===Rf&&(Nt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Br);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),I=i.state;I.setBlending(Qn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const V=g!==this.type;V&&A.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(D=>D.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,D=S.length;F<D;F++){const B=S[F],k=B.shadow;if(k===void 0){Nt("WebGLShadowMap:",B,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const $=k.getFrameExtents();s.multiply($),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,k.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=j,k.map===null||V===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Fs){if(B.isPointLight){Nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Fn(s.x,s.y,{format:Fi,type:ei,minFilter:Be,magFilter:Be,generateMipmaps:!1}),k.map.texture.name=B.name+".shadowMap",k.map.depthTexture=new vs(s.x,s.y,Dn),k.map.depthTexture.name=B.name+".shadowMapDepth",k.map.depthTexture.format=ni,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Re,k.map.depthTexture.magFilter=Re}else B.isPointLight?(k.map=new Pu(s.x),k.map.depthTexture=new Ld(s.x,Bn)):(k.map=new Fn(s.x,s.y),k.map.depthTexture=new vs(s.x,s.y,Bn)),k.map.depthTexture.name=B.name+".shadowMap",k.map.depthTexture.format=ni,this.type===Br?(k.map.depthTexture.compareFunction=j?wc:Sc,k.map.depthTexture.minFilter=Be,k.map.depthTexture.magFilter=Be):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Re,k.map.depthTexture.magFilter=Re);k.camera.updateProjectionMatrix()}const it=k.map.isWebGLCubeRenderTarget?6:1;for(let tt=0;tt<it;tt++){if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,tt),i.clear();else{tt===0&&(i.setRenderTarget(k.map),i.clear());const ot=k.getViewport(tt);o.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),I.viewport(o)}if(B.isPointLight){const ot=k.camera,St=k.matrix,Ft=B.distance||ot.far;Ft!==ot.far&&(ot.far=Ft,ot.updateProjectionMatrix()),Rs.setFromMatrixPosition(B.matrixWorld),ot.position.copy(Rs),Yo.copy(ot.position),Yo.add(Tv[tt]),ot.up.copy(Av[tt]),ot.lookAt(Yo),ot.updateMatrixWorld(),St.makeTranslation(-Rs.x,-Rs.y,-Rs.z),nh.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),k._frustum.setFromProjectionMatrix(nh,ot.coordinateSystem,ot.reversedDepth)}else k.updateMatrices(B);n=k.getFrustum(),_(A,M,k.camera,B,this.type)}k.isPointLightShadow!==!0&&this.type===Fs&&x(k,M),k.needsUpdate=!1}g=this.type,p.needsUpdate=!1,i.setRenderTarget(T,P,R)};function x(S,A){const M=t.update(v);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Fn(s.x,s.y,{format:Fi,type:ei})),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(A,null,M,f,v,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(A,null,M,d,v,null)}function y(S,A,M,T){let P=null;const R=M.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(R!==void 0)P=R;else if(P=M.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const I=P.uuid,V=A.uuid;let F=l[I];F===void 0&&(F={},l[I]=F);let D=F[V];D===void 0&&(D=P.clone(),F[V]=D,A.addEventListener("dispose",w)),P=D}if(P.visible=A.visible,P.wireframe=A.wireframe,T===Fs?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:u[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,M.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const I=i.properties.get(P);I.light=M}return P}function _(S,A,M,T,P){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===Fs)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,S.matrixWorld);const V=t.update(S),F=S.material;if(Array.isArray(F)){const D=V.groups;for(let B=0,k=D.length;B<k;B++){const $=D[B],j=F[$.materialIndex];if(j&&j.visible){const it=y(S,j,T,P);S.onBeforeShadow(i,S,A,M,V,it,$),i.renderBufferDirect(M,null,V,it,S,$),S.onAfterShadow(i,S,A,M,V,it,$)}}}else if(F.visible){const D=y(S,F,T,P);S.onBeforeShadow(i,S,A,M,V,D,null),i.renderBufferDirect(M,null,V,D,S,null),S.onAfterShadow(i,S,A,M,V,D,null)}}const I=S.children;for(let V=0,F=I.length;V<F;V++)_(I[V],A,M,T,P)}function w(S){S.target.removeEventListener("dispose",w);for(const M in l){const T=l[M],P=S.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function Rv(i,t){function e(){let U=!1;const ct=new fe;let J=null;const ft=new fe(0,0,0,0);return{setMask:function(vt){J!==vt&&!U&&(i.colorMask(vt,vt,vt,vt),J=vt)},setLocked:function(vt){U=vt},setClear:function(vt,et,Tt,Mt,pe){pe===!0&&(vt*=Mt,et*=Mt,Tt*=Mt),ct.set(vt,et,Tt,Mt),ft.equals(ct)===!1&&(i.clearColor(vt,et,Tt,Mt),ft.copy(ct))},reset:function(){U=!1,J=null,ft.set(-1,0,0,0)}}}function n(){let U=!1,ct=!1,J=null,ft=null,vt=null;return{setReversed:function(et){if(ct!==et){const Tt=t.get("EXT_clip_control");et?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),ct=et;const Mt=vt;vt=null,this.setClear(Mt)}},getReversed:function(){return ct},setTest:function(et){et?nt(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(et){J!==et&&!U&&(i.depthMask(et),J=et)},setFunc:function(et){if(ct&&(et=cd[et]),ft!==et){switch(et){case da:i.depthFunc(i.NEVER);break;case pa:i.depthFunc(i.ALWAYS);break;case ma:i.depthFunc(i.LESS);break;case ms:i.depthFunc(i.LEQUAL);break;case ga:i.depthFunc(i.EQUAL);break;case va:i.depthFunc(i.GEQUAL);break;case xa:i.depthFunc(i.GREATER);break;case _a:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ft=et}},setLocked:function(et){U=et},setClear:function(et){vt!==et&&(vt=et,ct&&(et=1-et),i.clearDepth(et))},reset:function(){U=!1,J=null,ft=null,vt=null,ct=!1}}}function s(){let U=!1,ct=null,J=null,ft=null,vt=null,et=null,Tt=null,Mt=null,pe=null;return{setTest:function(ae){U||(ae?nt(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(ae){ct!==ae&&!U&&(i.stencilMask(ae),ct=ae)},setFunc:function(ae,Sn,wn){(J!==ae||ft!==Sn||vt!==wn)&&(i.stencilFunc(ae,Sn,wn),J=ae,ft=Sn,vt=wn)},setOp:function(ae,Sn,wn){(et!==ae||Tt!==Sn||Mt!==wn)&&(i.stencilOp(ae,Sn,wn),et=ae,Tt=Sn,Mt=wn)},setLocked:function(ae){U=ae},setClear:function(ae){pe!==ae&&(i.clearStencil(ae),pe=ae)},reset:function(){U=!1,ct=null,J=null,ft=null,vt=null,et=null,Tt=null,Mt=null,pe=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f={},d=new WeakMap,m=[],v=null,p=!1,g=null,x=null,y=null,_=null,w=null,S=null,A=null,M=new Gt(0,0,0),T=0,P=!1,R=null,I=null,V=null,F=null,D=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,$=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(j)[1]),k=$>=1):j.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),k=$>=2);let it=null,tt={};const ot=i.getParameter(i.SCISSOR_BOX),St=i.getParameter(i.VIEWPORT),Ft=new fe().fromArray(ot),wt=new fe().fromArray(St);function q(U,ct,J,ft){const vt=new Uint8Array(4),et=i.createTexture();i.bindTexture(U,et),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Tt=0;Tt<J;Tt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,ft,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ct+Tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return et}const st={};st[i.TEXTURE_2D]=q(i.TEXTURE_2D,i.TEXTURE_2D,1),st[i.TEXTURE_CUBE_MAP]=q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[i.TEXTURE_2D_ARRAY]=q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),st[i.TEXTURE_3D]=q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(i.DEPTH_TEST),o.setFunc(ms),ue(!1),Se(Zc),nt(i.CULL_FACE),Zt(Qn);function nt(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function yt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ut(U,ct){return f[U]!==ct?(i.bindFramebuffer(U,ct),f[U]=ct,U===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ct),U===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function Et(U,ct){let J=m,ft=!1;if(U){J=d.get(ct),J===void 0&&(J=[],d.set(ct,J));const vt=U.textures;if(J.length!==vt.length||J[0]!==i.COLOR_ATTACHMENT0){for(let et=0,Tt=vt.length;et<Tt;et++)J[et]=i.COLOR_ATTACHMENT0+et;J.length=vt.length,ft=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ft=!0);ft&&i.drawBuffers(J)}function Qt(U){return v!==U?(i.useProgram(U),v=U,!0):!1}const Ot={[Ri]:i.FUNC_ADD,[If]:i.FUNC_SUBTRACT,[Lf]:i.FUNC_REVERSE_SUBTRACT};Ot[Df]=i.MIN,Ot[Uf]=i.MAX;const Kt={[Nf]:i.ZERO,[Ff]:i.ONE,[Of]:i.SRC_COLOR,[ua]:i.SRC_ALPHA,[Gf]:i.SRC_ALPHA_SATURATE,[Vf]:i.DST_COLOR,[Bf]:i.DST_ALPHA,[kf]:i.ONE_MINUS_SRC_COLOR,[fa]:i.ONE_MINUS_SRC_ALPHA,[Hf]:i.ONE_MINUS_DST_COLOR,[zf]:i.ONE_MINUS_DST_ALPHA,[Wf]:i.CONSTANT_COLOR,[Xf]:i.ONE_MINUS_CONSTANT_COLOR,[$f]:i.CONSTANT_ALPHA,[qf]:i.ONE_MINUS_CONSTANT_ALPHA};function Zt(U,ct,J,ft,vt,et,Tt,Mt,pe,ae){if(U===Qn){p===!0&&(yt(i.BLEND),p=!1);return}if(p===!1&&(nt(i.BLEND),p=!0),U!==Pf){if(U!==g||ae!==P){if((x!==Ri||w!==Ri)&&(i.blendEquation(i.FUNC_ADD),x=Ri,w=Ri),ae)switch(U){case hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jc:i.blendFunc(i.ONE,i.ONE);break;case Jc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Yt("WebGLState: Invalid blending: ",U);break}else switch(U){case hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Jc:Yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qc:Yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Yt("WebGLState: Invalid blending: ",U);break}y=null,_=null,S=null,A=null,M.set(0,0,0),T=0,g=U,P=ae}return}vt=vt||ct,et=et||J,Tt=Tt||ft,(ct!==x||vt!==w)&&(i.blendEquationSeparate(Ot[ct],Ot[vt]),x=ct,w=vt),(J!==y||ft!==_||et!==S||Tt!==A)&&(i.blendFuncSeparate(Kt[J],Kt[ft],Kt[et],Kt[Tt]),y=J,_=ft,S=et,A=Tt),(Mt.equals(M)===!1||pe!==T)&&(i.blendColor(Mt.r,Mt.g,Mt.b,pe),M.copy(Mt),T=pe),g=U,P=!1}function Wt(U,ct){U.side===Ge?yt(i.CULL_FACE):nt(i.CULL_FACE);let J=U.side===je;ct&&(J=!J),ue(J),U.blending===hs&&U.transparent===!1?Zt(Qn):Zt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const ft=U.stencilWrite;a.setTest(ft),ft&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Pe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ue(U){R!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),R=U)}function Se(U){U!==Af?(nt(i.CULL_FACE),U!==I&&(U===Zc?i.cullFace(i.BACK):U===Cf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),I=U}function Ae(U){U!==V&&(k&&i.lineWidth(U),V=U)}function Pe(U,ct,J){U?(nt(i.POLYGON_OFFSET_FILL),(F!==ct||D!==J)&&(F=ct,D=J,o.getReversed()&&(ct=-ct),i.polygonOffset(ct,J))):yt(i.POLYGON_OFFSET_FILL)}function de(U){U?nt(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function _e(U){U===void 0&&(U=i.TEXTURE0+B-1),it!==U&&(i.activeTexture(U),it=U)}function N(U,ct,J){J===void 0&&(it===null?J=i.TEXTURE0+B-1:J=it);let ft=tt[J];ft===void 0&&(ft={type:void 0,texture:void 0},tt[J]=ft),(ft.type!==U||ft.texture!==ct)&&(it!==J&&(i.activeTexture(J),it=J),i.bindTexture(U,ct||st[U]),ft.type=U,ft.texture=ct)}function We(){const U=tt[it];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function te(){try{i.compressedTexImage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function b(){try{i.texSubImage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function z(){try{i.texSubImage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function at(){try{i.texStorage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function lt(){try{i.texStorage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function K(){try{i.texImage2D(...arguments)}catch(U){Yt("WebGLState:",U)}}function Q(){try{i.texImage3D(...arguments)}catch(U){Yt("WebGLState:",U)}}function ht(U){return u[U]!==void 0?u[U]:i.getParameter(U)}function At(U,ct){u[U]!==ct&&(i.pixelStorei(U,ct),u[U]=ct)}function dt(U){Ft.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Ft.copy(U))}function ut(U){wt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),wt.copy(U))}function Lt(U,ct){let J=l.get(ct);J===void 0&&(J=new WeakMap,l.set(ct,J));let ft=J.get(U);ft===void 0&&(ft=i.getUniformBlockIndex(ct,U.name),J.set(U,ft))}function Dt(U,ct){const ft=l.get(ct).get(U);c.get(ct)!==ft&&(i.uniformBlockBinding(ct,ft,U.__bindingPointIndex),c.set(ct,ft))}function Bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},it=null,tt={},f={},d=new WeakMap,m=[],v=null,p=!1,g=null,x=null,y=null,_=null,w=null,S=null,A=null,M=new Gt(0,0,0),T=0,P=!1,R=null,I=null,V=null,F=null,D=null,Ft.set(0,0,i.canvas.width,i.canvas.height),wt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:yt,bindFramebuffer:Ut,drawBuffers:Et,useProgram:Qt,setBlending:Zt,setMaterial:Wt,setFlipSided:ue,setCullFace:Se,setLineWidth:Ae,setPolygonOffset:Pe,setScissorTest:de,activeTexture:_e,bindTexture:N,unbindTexture:We,compressedTexImage2D:te,compressedTexImage3D:C,texImage2D:K,texImage3D:Q,pixelStorei:At,getParameter:ht,updateUBOMapping:Lt,uniformBlockBinding:Dt,texStorage2D:at,texStorage3D:lt,texSubImage2D:b,texSubImage3D:z,compressedTexSubImage2D:W,compressedTexSubImage3D:Y,scissor:dt,viewport:ut,reset:Bt}}function Pv(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xt,h=new WeakMap,u=new Set;let f;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,b){return m?new OffscreenCanvas(C,b):jr("canvas")}function p(C,b,z){let W=1;const Y=te(C);if((Y.width>z||Y.height>z)&&(W=z/Math.max(Y.width,Y.height)),W<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const at=Math.floor(W*Y.width),lt=Math.floor(W*Y.height);f===void 0&&(f=v(at,lt));const K=b?v(at,lt):f;return K.width=at,K.height=lt,K.getContext("2d").drawImage(C,0,0,at,lt),Nt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+at+"x"+lt+")."),K}else return"data"in C&&Nt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),C;return C}function g(C){return C.generateMipmaps}function x(C){i.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(C,b,z,W,Y,at=!1){if(C!==null){if(i[C]!==void 0)return i[C];Nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let lt;W&&(lt=t.get("EXT_texture_norm16"),lt||Nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=b;if(b===i.RED&&(z===i.FLOAT&&(K=i.R32F),z===i.HALF_FLOAT&&(K=i.R16F),z===i.UNSIGNED_BYTE&&(K=i.R8),z===i.UNSIGNED_SHORT&&lt&&(K=lt.R16_EXT),z===i.SHORT&&lt&&(K=lt.R16_SNORM_EXT)),b===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.R8UI),z===i.UNSIGNED_SHORT&&(K=i.R16UI),z===i.UNSIGNED_INT&&(K=i.R32UI),z===i.BYTE&&(K=i.R8I),z===i.SHORT&&(K=i.R16I),z===i.INT&&(K=i.R32I)),b===i.RG&&(z===i.FLOAT&&(K=i.RG32F),z===i.HALF_FLOAT&&(K=i.RG16F),z===i.UNSIGNED_BYTE&&(K=i.RG8),z===i.UNSIGNED_SHORT&&lt&&(K=lt.RG16_EXT),z===i.SHORT&&lt&&(K=lt.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RG8UI),z===i.UNSIGNED_SHORT&&(K=i.RG16UI),z===i.UNSIGNED_INT&&(K=i.RG32UI),z===i.BYTE&&(K=i.RG8I),z===i.SHORT&&(K=i.RG16I),z===i.INT&&(K=i.RG32I)),b===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGB8UI),z===i.UNSIGNED_SHORT&&(K=i.RGB16UI),z===i.UNSIGNED_INT&&(K=i.RGB32UI),z===i.BYTE&&(K=i.RGB8I),z===i.SHORT&&(K=i.RGB16I),z===i.INT&&(K=i.RGB32I)),b===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),z===i.UNSIGNED_INT&&(K=i.RGBA32UI),z===i.BYTE&&(K=i.RGBA8I),z===i.SHORT&&(K=i.RGBA16I),z===i.INT&&(K=i.RGBA32I)),b===i.RGB&&(z===i.UNSIGNED_SHORT&&lt&&(K=lt.RGB16_EXT),z===i.SHORT&&lt&&(K=lt.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),b===i.RGBA){const Q=at?Zr:$t.getTransfer(Y);z===i.FLOAT&&(K=i.RGBA32F),z===i.HALF_FLOAT&&(K=i.RGBA16F),z===i.UNSIGNED_BYTE&&(K=Q===ee?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&lt&&(K=lt.RGBA16_EXT),z===i.SHORT&&lt&&(K=lt.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function w(C,b){let z;return C?b===null||b===Bn||b===Ws?z=i.DEPTH24_STENCIL8:b===Dn?z=i.DEPTH32F_STENCIL8:b===Gs&&(z=i.DEPTH24_STENCIL8,Nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Bn||b===Ws?z=i.DEPTH_COMPONENT24:b===Dn?z=i.DEPTH_COMPONENT32F:b===Gs&&(z=i.DEPTH_COMPONENT16),z}function S(C,b){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Re&&C.minFilter!==Be?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function A(C){const b=C.target;b.removeEventListener("dispose",A),T(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&u.delete(b)}function M(C){const b=C.target;b.removeEventListener("dispose",M),R(b)}function T(C){const b=n.get(C);if(b.__webglInit===void 0)return;const z=C.source,W=d.get(z);if(W){const Y=W[b.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(C),Object.keys(W).length===0&&d.delete(z)}n.remove(C)}function P(C){const b=n.get(C);i.deleteTexture(b.__webglTexture);const z=C.source,W=d.get(z);delete W[b.__cacheKey],o.memory.textures--}function R(C){const b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(b.__webglFramebuffer[W]))for(let Y=0;Y<b.__webglFramebuffer[W].length;Y++)i.deleteFramebuffer(b.__webglFramebuffer[W][Y]);else i.deleteFramebuffer(b.__webglFramebuffer[W]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[W])}else{if(Array.isArray(b.__webglFramebuffer))for(let W=0;W<b.__webglFramebuffer.length;W++)i.deleteFramebuffer(b.__webglFramebuffer[W]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let W=0;W<b.__webglColorRenderbuffer.length;W++)b.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[W]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const z=C.textures;for(let W=0,Y=z.length;W<Y;W++){const at=n.get(z[W]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(z[W])}n.remove(C)}let I=0;function V(){I=0}function F(){return I}function D(C){I=C}function B(){const C=I;return C>=s.maxTextures&&Nt("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function k(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function $(C,b){const z=n.get(C);if(C.isVideoTexture&&N(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){const W=C.image;if(W===null)Nt("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Nt("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(z,C,b);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+b)}function j(C,b){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){yt(z,C,b);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+b)}function it(C,b){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){yt(z,C,b);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+b)}function tt(C,b){const z=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){Ut(z,C,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+b)}const ot={[Ni]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[Ma]:i.MIRRORED_REPEAT},St={[Re]:i.NEAREST,[Zf]:i.NEAREST_MIPMAP_NEAREST,[rr]:i.NEAREST_MIPMAP_LINEAR,[Be]:i.LINEAR,[go]:i.LINEAR_MIPMAP_NEAREST,[Ii]:i.LINEAR_MIPMAP_LINEAR},Ft={[Qf]:i.NEVER,[sd]:i.ALWAYS,[td]:i.LESS,[Sc]:i.LEQUAL,[ed]:i.EQUAL,[wc]:i.GEQUAL,[nd]:i.GREATER,[id]:i.NOTEQUAL};function wt(C,b){if(b.type===Dn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Be||b.magFilter===go||b.magFilter===rr||b.magFilter===Ii||b.minFilter===Be||b.minFilter===go||b.minFilter===rr||b.minFilter===Ii)&&Nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ot[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ot[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ot[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,St[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,St[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Ft[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Re||b.minFilter!==rr&&b.minFilter!==Ii||b.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function q(C,b){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",A));const W=b.source;let Y=d.get(W);Y===void 0&&(Y={},d.set(W,Y));const at=k(b);if(at!==C.__cacheKey){Y[at]===void 0&&(Y[at]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Y[at].usedTimes++;const lt=Y[C.__cacheKey];lt!==void 0&&(Y[C.__cacheKey].usedTimes--,lt.usedTimes===0&&P(b)),C.__cacheKey=at,C.__webglTexture=Y[at].texture}return z}function st(C,b,z){return Math.floor(Math.floor(C/z)/b)}function nt(C,b,z,W){const at=C.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,z,W,b.data);else{at.sort((At,dt)=>At.start-dt.start);let lt=0;for(let At=1;At<at.length;At++){const dt=at[lt],ut=at[At],Lt=dt.start+dt.count,Dt=st(ut.start,b.width,4),Bt=st(dt.start,b.width,4);ut.start<=Lt+1&&Dt===Bt&&st(ut.start+ut.count-1,b.width,4)===Dt?dt.count=Math.max(dt.count,ut.start+ut.count-dt.start):(++lt,at[lt]=ut)}at.length=lt+1;const K=e.getParameter(i.UNPACK_ROW_LENGTH),Q=e.getParameter(i.UNPACK_SKIP_PIXELS),ht=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let At=0,dt=at.length;At<dt;At++){const ut=at[At],Lt=Math.floor(ut.start/4),Dt=Math.ceil(ut.count/4),Bt=Lt%b.width,U=Math.floor(Lt/b.width),ct=Dt,J=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Bt,U,ct,J,z,W,b.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,K),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(i.UNPACK_SKIP_ROWS,ht)}}function yt(C,b,z){let W=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(W=i.TEXTURE_3D);const Y=q(C,b),at=b.source;e.bindTexture(W,C.__webglTexture,i.TEXTURE0+z);const lt=n.get(at);if(at.version!==lt.__version||Y===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const J=$t.getPrimaries($t.workingColorSpace),ft=b.colorSpace===pi?null:$t.getPrimaries(b.colorSpace),vt=b.colorSpace===pi||J===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let Q=p(b.image,!1,s.maxTextureSize);Q=We(b,Q);const ht=r.convert(b.format,b.colorSpace),At=r.convert(b.type);let dt=_(b.internalFormat,ht,At,b.normalized,b.colorSpace,b.isVideoTexture);wt(W,b);let ut;const Lt=b.mipmaps,Dt=b.isVideoTexture!==!0,Bt=lt.__version===void 0||Y===!0,U=at.dataReady,ct=S(b,Q);if(b.isDepthTexture)dt=w(b.format===Li,b.type),Bt&&(Dt?e.texStorage2D(i.TEXTURE_2D,1,dt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,ht,At,null));else if(b.isDataTexture)if(Lt.length>0){Dt&&Bt&&e.texStorage2D(i.TEXTURE_2D,ct,dt,Lt[0].width,Lt[0].height);for(let J=0,ft=Lt.length;J<ft;J++)ut=Lt[J],Dt?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,ht,At,ut.data):e.texImage2D(i.TEXTURE_2D,J,dt,ut.width,ut.height,0,ht,At,ut.data);b.generateMipmaps=!1}else Dt?(Bt&&e.texStorage2D(i.TEXTURE_2D,ct,dt,Q.width,Q.height),U&&nt(b,Q,ht,At)):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,ht,At,Q.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Dt&&Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,dt,Lt[0].width,Lt[0].height,Q.depth);for(let J=0,ft=Lt.length;J<ft;J++)if(ut=Lt[J],b.format!==yn)if(ht!==null)if(Dt){if(U)if(b.layerUpdates.size>0){const vt=Dl(ut.width,ut.height,b.format,b.type);for(const et of b.layerUpdates){const Tt=ut.data.subarray(et*vt/ut.data.BYTES_PER_ELEMENT,(et+1)*vt/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,et,ut.width,ut.height,1,ht,Tt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,Q.depth,ht,ut.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,dt,ut.width,ut.height,Q.depth,0,ut.data,0,0);else Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,Q.depth,ht,At,ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,dt,ut.width,ut.height,Q.depth,0,ht,At,ut.data)}else{Dt&&Bt&&e.texStorage2D(i.TEXTURE_2D,ct,dt,Lt[0].width,Lt[0].height);for(let J=0,ft=Lt.length;J<ft;J++)ut=Lt[J],b.format!==yn?ht!==null?Dt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,ht,ut.data):e.compressedTexImage2D(i.TEXTURE_2D,J,dt,ut.width,ut.height,0,ut.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,ht,At,ut.data):e.texImage2D(i.TEXTURE_2D,J,dt,ut.width,ut.height,0,ht,At,ut.data)}else if(b.isDataArrayTexture)if(Dt){if(Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,dt,Q.width,Q.height,Q.depth),U)if(b.layerUpdates.size>0){const J=Dl(Q.width,Q.height,b.format,b.type);for(const ft of b.layerUpdates){const vt=Q.data.subarray(ft*J/Q.data.BYTES_PER_ELEMENT,(ft+1)*J/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ft,Q.width,Q.height,1,ht,At,vt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ht,At,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,dt,Q.width,Q.height,Q.depth,0,ht,At,Q.data);else if(b.isData3DTexture)Dt?(Bt&&e.texStorage3D(i.TEXTURE_3D,ct,dt,Q.width,Q.height,Q.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ht,At,Q.data)):e.texImage3D(i.TEXTURE_3D,0,dt,Q.width,Q.height,Q.depth,0,ht,At,Q.data);else if(b.isFramebufferTexture){if(Bt)if(Dt)e.texStorage2D(i.TEXTURE_2D,ct,dt,Q.width,Q.height);else{let J=Q.width,ft=Q.height;for(let vt=0;vt<ct;vt++)e.texImage2D(i.TEXTURE_2D,vt,dt,J,ft,0,ht,At,null),J>>=1,ft>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Q.parentNode!==J){J.appendChild(Q),u.add(b),J.onpaint=ft=>{const vt=ft.changedElements;for(const et of u)vt.includes(et.image)&&(et.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{const vt=i.RGBA,et=i.RGBA,Tt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,vt,et,Tt,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Lt.length>0){if(Dt&&Bt){const J=te(Lt[0]);e.texStorage2D(i.TEXTURE_2D,ct,dt,J.width,J.height)}for(let J=0,ft=Lt.length;J<ft;J++)ut=Lt[J],Dt?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ht,At,ut):e.texImage2D(i.TEXTURE_2D,J,dt,ht,At,ut);b.generateMipmaps=!1}else if(Dt){if(Bt){const J=te(Q);e.texStorage2D(i.TEXTURE_2D,ct,dt,J.width,J.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,At,Q)}else e.texImage2D(i.TEXTURE_2D,0,dt,ht,At,Q);g(b)&&x(W),lt.__version=at.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function Ut(C,b,z){if(b.image.length!==6)return;const W=q(C,b),Y=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+z);const at=n.get(Y);if(Y.version!==at.__version||W===!0){e.activeTexture(i.TEXTURE0+z);const lt=$t.getPrimaries($t.workingColorSpace),K=b.colorSpace===pi?null:$t.getPrimaries(b.colorSpace),Q=b.colorSpace===pi||lt===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const ht=b.isCompressedTexture||b.image[0].isCompressedTexture,At=b.image[0]&&b.image[0].isDataTexture,dt=[];for(let et=0;et<6;et++)!ht&&!At?dt[et]=p(b.image[et],!0,s.maxCubemapSize):dt[et]=At?b.image[et].image:b.image[et],dt[et]=We(b,dt[et]);const ut=dt[0],Lt=r.convert(b.format,b.colorSpace),Dt=r.convert(b.type),Bt=_(b.internalFormat,Lt,Dt,b.normalized,b.colorSpace),U=b.isVideoTexture!==!0,ct=at.__version===void 0||W===!0,J=Y.dataReady;let ft=S(b,ut);wt(i.TEXTURE_CUBE_MAP,b);let vt;if(ht){U&&ct&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Bt,ut.width,ut.height);for(let et=0;et<6;et++){vt=dt[et].mipmaps;for(let Tt=0;Tt<vt.length;Tt++){const Mt=vt[Tt];b.format!==yn?Lt!==null?U?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt,0,0,Mt.width,Mt.height,Lt,Mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt,Bt,Mt.width,Mt.height,0,Mt.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt,0,0,Mt.width,Mt.height,Lt,Dt,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt,Bt,Mt.width,Mt.height,0,Lt,Dt,Mt.data)}}}else{if(vt=b.mipmaps,U&&ct){vt.length>0&&ft++;const et=te(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Bt,et.width,et.height)}for(let et=0;et<6;et++)if(At){U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,dt[et].width,dt[et].height,Lt,Dt,dt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Bt,dt[et].width,dt[et].height,0,Lt,Dt,dt[et].data);for(let Tt=0;Tt<vt.length;Tt++){const pe=vt[Tt].image[et].image;U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt+1,0,0,pe.width,pe.height,Lt,Dt,pe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt+1,Bt,pe.width,pe.height,0,Lt,Dt,pe.data)}}else{U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Lt,Dt,dt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Bt,Lt,Dt,dt[et]);for(let Tt=0;Tt<vt.length;Tt++){const Mt=vt[Tt];U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt+1,0,0,Lt,Dt,Mt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Tt+1,Bt,Lt,Dt,Mt.image[et])}}}g(b)&&x(i.TEXTURE_CUBE_MAP),at.__version=Y.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function Et(C,b,z,W,Y,at){const lt=r.convert(z.format,z.colorSpace),K=r.convert(z.type),Q=_(z.internalFormat,lt,K,z.normalized,z.colorSpace),ht=n.get(b),At=n.get(z);if(At.__renderTarget=b,!ht.__hasExternalTextures){const dt=Math.max(1,b.width>>at),ut=Math.max(1,b.height>>at);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,at,Q,dt,ut,b.depth,0,lt,K,null):e.texImage2D(Y,at,Q,dt,ut,0,lt,K,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),_e(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,Y,At.__webglTexture,0,de(b)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,Y,At.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Qt(C,b,z){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){const W=b.depthTexture,Y=W&&W.isDepthTexture?W.type:null,at=w(b.stencilBuffer,Y),lt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_e(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de(b),at,b.width,b.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,de(b),at,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,at,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,C)}else{const W=b.textures;for(let Y=0;Y<W.length;Y++){const at=W[Y],lt=r.convert(at.format,at.colorSpace),K=r.convert(at.type),Q=_(at.internalFormat,lt,K,at.normalized,at.colorSpace);_e(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de(b),Q,b.width,b.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,de(b),Q,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Q,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ot(C,b,z){const W=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(b.depthTexture);if(Y.__renderTarget=b,(!Y.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,b.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),wt(i.TEXTURE_CUBE_MAP,b.depthTexture);const ht=r.convert(b.depthTexture.format),At=r.convert(b.depthTexture.type);let dt;b.depthTexture.format===ni?dt=i.DEPTH_COMPONENT24:b.depthTexture.format===Li&&(dt=i.DEPTH24_STENCIL8);for(let ut=0;ut<6;ut++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,dt,b.width,b.height,0,ht,At,null)}}else $(b.depthTexture,0);const at=Y.__webglTexture,lt=de(b),K=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,Q=b.depthTexture.format===Li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===ni)_e(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,at,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,at,0);else if(b.depthTexture.format===Li)_e(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,K,at,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,K,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Kt(C){const b=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const W=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),W){const Y=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,W.removeEventListener("dispose",Y)};W.addEventListener("dispose",Y),b.__depthDisposeCallback=Y}b.__boundDepthTexture=W}if(C.depthTexture&&!b.__autoAllocateDepthBuffer)if(z)for(let W=0;W<6;W++)Ot(b.__webglFramebuffer[W],C,W);else{const W=C.texture.mipmaps;W&&W.length>0?Ot(b.__webglFramebuffer[0],C,0):Ot(b.__webglFramebuffer,C,0)}else if(z){b.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[W]),b.__webglDepthbuffer[W]===void 0)b.__webglDepthbuffer[W]=i.createRenderbuffer(),Qt(b.__webglDepthbuffer[W],C,!1);else{const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,at)}}else{const W=C.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Qt(b.__webglDepthbuffer,C,!1);else{const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,at)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Zt(C,b,z){const W=n.get(C);b!==void 0&&Et(W.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Kt(C)}function Wt(C){const b=C.texture,z=n.get(C),W=n.get(b);C.addEventListener("dispose",M);const Y=C.textures,at=C.isWebGLCubeRenderTarget===!0,lt=Y.length>1;if(lt||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=b.version,o.memory.textures++),at){z.__webglFramebuffer=[];for(let K=0;K<6;K++)if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer[K]=[];for(let Q=0;Q<b.mipmaps.length;Q++)z.__webglFramebuffer[K][Q]=i.createFramebuffer()}else z.__webglFramebuffer[K]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer=[];for(let K=0;K<b.mipmaps.length;K++)z.__webglFramebuffer[K]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(lt)for(let K=0,Q=Y.length;K<Q;K++){const ht=n.get(Y[K]);ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&_e(C)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){const Q=Y[K];z.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[K]);const ht=r.convert(Q.format,Q.colorSpace),At=r.convert(Q.type),dt=_(Q.internalFormat,ht,At,Q.normalized,Q.colorSpace,C.isXRRenderTarget===!0),ut=de(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,dt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,z.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Qt(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),wt(i.TEXTURE_CUBE_MAP,b);for(let K=0;K<6;K++)if(b.mipmaps&&b.mipmaps.length>0)for(let Q=0;Q<b.mipmaps.length;Q++)Et(z.__webglFramebuffer[K][Q],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Q);else Et(z.__webglFramebuffer[K],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);g(b)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let K=0,Q=Y.length;K<Q;K++){const ht=Y[K],At=n.get(ht);let dt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(dt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,At.__webglTexture),wt(dt,ht),Et(z.__webglFramebuffer,C,ht,i.COLOR_ATTACHMENT0+K,dt,0),g(ht)&&x(dt)}e.unbindTexture()}else{let K=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,W.__webglTexture),wt(K,b),b.mipmaps&&b.mipmaps.length>0)for(let Q=0;Q<b.mipmaps.length;Q++)Et(z.__webglFramebuffer[Q],C,b,i.COLOR_ATTACHMENT0,K,Q);else Et(z.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,K,0);g(b)&&x(K),e.unbindTexture()}C.depthBuffer&&Kt(C)}function ue(C){const b=C.textures;for(let z=0,W=b.length;z<W;z++){const Y=b[z];if(g(Y)){const at=y(C),lt=n.get(Y).__webglTexture;e.bindTexture(at,lt),x(at),e.unbindTexture()}}}const Se=[],Ae=[];function Pe(C){if(C.samples>0){if(_e(C)===!1){const b=C.textures,z=C.width,W=C.height;let Y=i.COLOR_BUFFER_BIT;const at=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(C),K=b.length>1;if(K)for(let ht=0;ht<b.length;ht++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const Q=C.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ht=0;ht<b.length;ht++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ht]);const At=n.get(b[ht]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,At,0)}i.blitFramebuffer(0,0,z,W,0,0,z,W,Y,i.NEAREST),c===!0&&(Se.length=0,Ae.length=0,Se.push(i.COLOR_ATTACHMENT0+ht),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Se.push(at),Ae.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ae)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Se))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let ht=0;ht<b.length;ht++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ht]);const At=n.get(b[ht]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,At,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function de(C){return Math.min(s.maxSamples,C.samples)}function _e(C){const b=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function N(C){const b=o.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function We(C,b){const z=C.colorSpace,W=C.format,Y=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Kr&&z!==pi&&($t.getTransfer(z)===ee?(W!==yn||Y!==sn)&&Nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Yt("WebGLTextures: Unsupported texture color space:",z)),b}function te(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=V,this.getTextureUnits=F,this.setTextureUnits=D,this.setTexture2D=$,this.setTexture2DArray=j,this.setTexture3D=it,this.setTextureCube=tt,this.rebindTextures=Zt,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=Kt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=_e,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Iv(i,t){function e(n,s=pi){let r;const o=$t.getTransfer(s);if(n===sn)return i.UNSIGNED_BYTE;if(n===xc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===_c)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===hu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===au)return i.BYTE;if(n===cu)return i.SHORT;if(n===Gs)return i.UNSIGNED_SHORT;if(n===vc)return i.INT;if(n===Bn)return i.UNSIGNED_INT;if(n===Dn)return i.FLOAT;if(n===ei)return i.HALF_FLOAT;if(n===uu)return i.ALPHA;if(n===fu)return i.RGB;if(n===yn)return i.RGBA;if(n===ni)return i.DEPTH_COMPONENT;if(n===Li)return i.DEPTH_STENCIL;if(n===du)return i.RED;if(n===Mc)return i.RED_INTEGER;if(n===Fi)return i.RG;if(n===yc)return i.RG_INTEGER;if(n===bc)return i.RGBA_INTEGER;if(n===zr||n===Vr||n===Hr||n===Gr)if(o===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ya||n===ba||n===Sa||n===wa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ya)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Sa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ea||n===Ta||n===Aa||n===Ca||n===Ra||n===qr||n===Pa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ea||n===Ta)return o===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Aa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ca)return r.COMPRESSED_R11_EAC;if(n===Ra)return r.COMPRESSED_SIGNED_R11_EAC;if(n===qr)return r.COMPRESSED_RG11_EAC;if(n===Pa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ia||n===La||n===Da||n===Ua||n===Na||n===Fa||n===Oa||n===ka||n===Ba||n===za||n===Va||n===Ha||n===Ga||n===Wa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ia)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===La)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Da)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ua)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Na)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ka)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ba)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===za)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Va)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ha)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ga)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wa)return o===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xa||n===$a||n===qa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Xa)return o===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===$a)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ya||n===Ka||n===Yr||n===Za)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ya)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ka)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Lv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dv=`
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

}`;class Uv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new yu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Vn({vertexShader:Lv,fragmentShader:Dv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new be(new Qs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Nv extends ki{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null;const v=typeof XRWebGLBinding<"u",p=new Uv,g={},x=e.getContextAttributes();let y=null,_=null;const w=[],S=[],A=new Xt;let M=null;const T=new fn;T.viewport=new fe;const P=new fn;P.viewport=new fe;const R=[T,P],I=new Wd;let V=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let st=w[q];return st===void 0&&(st=new wo,w[q]=st),st.getTargetRaySpace()},this.getControllerGrip=function(q){let st=w[q];return st===void 0&&(st=new wo,w[q]=st),st.getGripSpace()},this.getHand=function(q){let st=w[q];return st===void 0&&(st=new wo,w[q]=st),st.getHandSpace()};function D(q){const st=S.indexOf(q.inputSource);if(st===-1)return;const nt=w[st];nt!==void 0&&(nt.update(q.inputSource,q.frame,l||o),nt.dispatchEvent({type:q.type,data:q.inputSource}))}function B(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",k);for(let q=0;q<w.length;q++){const st=S[q];st!==null&&(S[q]=null,w[q].disconnect(st))}V=null,F=null,p.reset();for(const q in g)delete g[q];t.setRenderTarget(y),d=null,f=null,u=null,s=null,_=null,wt.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&Nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&Nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",B),s.addEventListener("inputsourceschange",k),x.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,yt=null,Ut=null;x.depth&&(Ut=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=x.stencil?Li:ni,yt=x.stencil?Ws:Bn);const Et={colorFormat:e.RGBA8,depthFormat:Ut,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Et),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Fn(f.textureWidth,f.textureHeight,{format:yn,type:sn,depthTexture:new vs(f.textureWidth,f.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const nt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Fn(d.framebufferWidth,d.framebufferHeight,{format:yn,type:sn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),wt.setContext(s),wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function k(q){for(let st=0;st<q.removed.length;st++){const nt=q.removed[st],yt=S.indexOf(nt);yt>=0&&(S[yt]=null,w[yt].disconnect(nt))}for(let st=0;st<q.added.length;st++){const nt=q.added[st];let yt=S.indexOf(nt);if(yt===-1){for(let Et=0;Et<w.length;Et++)if(Et>=S.length){S.push(nt),yt=Et;break}else if(S[Et]===null){S[Et]=nt,yt=Et;break}if(yt===-1)break}const Ut=w[yt];Ut&&Ut.connect(nt)}}const $=new L,j=new L;function it(q,st,nt){$.setFromMatrixPosition(st.matrixWorld),j.setFromMatrixPosition(nt.matrixWorld);const yt=$.distanceTo(j),Ut=st.projectionMatrix.elements,Et=nt.projectionMatrix.elements,Qt=Ut[14]/(Ut[10]-1),Ot=Ut[14]/(Ut[10]+1),Kt=(Ut[9]+1)/Ut[5],Zt=(Ut[9]-1)/Ut[5],Wt=(Ut[8]-1)/Ut[0],ue=(Et[8]+1)/Et[0],Se=Qt*Wt,Ae=Qt*ue,Pe=yt/(-Wt+ue),de=Pe*-Wt;if(st.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(de),q.translateZ(Pe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ut[10]===-1)q.projectionMatrix.copy(st.projectionMatrix),q.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const _e=Qt+Pe,N=Ot+Pe,We=Se-de,te=Ae+(yt-de),C=Kt*Ot/N*_e,b=Zt*Ot/N*_e;q.projectionMatrix.makePerspective(We,te,C,b,_e,N),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function tt(q,st){st===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(st.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let st=q.near,nt=q.far;p.texture!==null&&(p.depthNear>0&&(st=p.depthNear),p.depthFar>0&&(nt=p.depthFar)),I.near=P.near=T.near=st,I.far=P.far=T.far=nt,(V!==I.near||F!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),V=I.near,F=I.far),I.layers.mask=q.layers.mask|6,T.layers.mask=I.layers.mask&-5,P.layers.mask=I.layers.mask&-3;const yt=q.parent,Ut=I.cameras;tt(I,yt);for(let Et=0;Et<Ut.length;Et++)tt(Ut[Et],yt);Ut.length===2?it(I,T,P):I.projectionMatrix.copy(T.projectionMatrix),ot(q,I,yt)};function ot(q,st,nt){nt===null?q.matrix.copy(st.matrixWorld):(q.matrix.copy(nt.matrixWorld),q.matrix.invert(),q.matrix.multiply(st.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(st.projectionMatrix),q.projectionMatrixInverse.copy(st.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ja*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(I)},this.getCameraTexture=function(q){return g[q]};let St=null;function Ft(q,st){if(h=st.getViewerPose(l||o),m=st,h!==null){const nt=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let yt=!1;nt.length!==I.cameras.length&&(I.cameras.length=0,yt=!0);for(let Ot=0;Ot<nt.length;Ot++){const Kt=nt[Ot];let Zt=null;if(d!==null)Zt=d.getViewport(Kt);else{const ue=u.getViewSubImage(f,Kt);Zt=ue.viewport,Ot===0&&(t.setRenderTargetTextures(_,ue.colorTexture,ue.depthStencilTexture),t.setRenderTarget(_))}let Wt=R[Ot];Wt===void 0&&(Wt=new fn,Wt.layers.enable(Ot),Wt.viewport=new fe,R[Ot]=Wt),Wt.matrix.fromArray(Kt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(Kt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),Ot===0&&(I.matrix.copy(Wt.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),yt===!0&&I.cameras.push(Wt)}const Ut=s.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const Ot=u.getDepthInformation(nt[0]);Ot&&Ot.isValid&&Ot.texture&&p.init(Ot,s.renderState)}if(Ut&&Ut.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let Ot=0;Ot<nt.length;Ot++){const Kt=nt[Ot].camera;if(Kt){let Zt=g[Kt];Zt||(Zt=new yu,g[Kt]=Zt);const Wt=u.getCameraImage(Kt);Zt.sourceTexture=Wt}}}}for(let nt=0;nt<w.length;nt++){const yt=S[nt],Ut=w[nt];yt!==null&&Ut!==void 0&&Ut.update(yt,st,l||o)}St&&St(q,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),m=null}const wt=new Cu;wt.setAnimationLoop(Ft),this.setAnimationLoop=function(q){St=q},this.dispose=function(){}}}const Fv=new oe,Nu=new kt;Nu.set(-1,0,0,0,1,0,0,0,1);function Ov(i,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,bu(i)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,x,y,_){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),u(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),f(p,g),g.isMeshPhysicalMaterial&&d(p,g,_)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),v(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?c(p,g,x,y):g.isSpriteMaterial?l(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===je&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===je&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const x=t.get(g),y=x.envMap,_=x.envMapRotation;y&&(p.envMap.value=y,p.envMapRotation.value.setFromMatrix4(Fv.makeRotationFromEuler(_)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Nu),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function c(p,g,x,y){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*x,p.scale.value=y*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function l(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function d(p,g,x){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===je&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function v(p,g){const x=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function kv(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,w){const S=w.program;n.uniformBlockBinding(_,S)}function l(_,w){let S=s[_.id];S===void 0&&(p(_),S=h(_),s[_.id]=S,_.addEventListener("dispose",x));const A=w.program;n.updateUBOMapping(_,A);const M=t.render.frame;r[_.id]!==M&&(f(_),r[_.id]=M)}function h(_){const w=u();_.__bindingPointIndex=w;const S=i.createBuffer(),A=_.__size,M=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,A,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,S),S}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return Yt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const w=s[_.id],S=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let M=0,T=S.length;M<T;M++){const P=S[M];if(Array.isArray(P))for(let R=0,I=P.length;R<I;R++)d(P[R],M,R,A);else d(P,M,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,w,S,A){if(v(_,w,S,A)===!0){const M=_.__offset,T=_.value;if(Array.isArray(T)){let P=0;for(let R=0;R<T.length;R++){const I=T[R],V=g(I);m(I,_.__data,P),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,_.__data)}}function m(_,w,S){typeof _=="number"||typeof _=="boolean"?w[0]=_:_.isMatrix3?(w[0]=_.elements[0],w[1]=_.elements[1],w[2]=_.elements[2],w[3]=0,w[4]=_.elements[3],w[5]=_.elements[4],w[6]=_.elements[5],w[7]=0,w[8]=_.elements[6],w[9]=_.elements[7],w[10]=_.elements[8],w[11]=0):ArrayBuffer.isView(_)?w.set(new _.constructor(_.buffer,_.byteOffset,w.length)):_.toArray(w,S)}function v(_,w,S,A){const M=_.value,T=w+"_"+S;if(A[T]===void 0)return typeof M=="number"||typeof M=="boolean"?A[T]=M:ArrayBuffer.isView(M)?A[T]=M.slice():A[T]=M.clone(),!0;{const P=A[T];if(typeof M=="number"||typeof M=="boolean"){if(P!==M)return A[T]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(P.equals(M)===!1)return P.copy(M),!0}}return!1}function p(_){const w=_.uniforms;let S=0;const A=16;for(let T=0,P=w.length;T<P;T++){const R=Array.isArray(w[T])?w[T]:[w[T]];for(let I=0,V=R.length;I<V;I++){const F=R[I],D=Array.isArray(F.value)?F.value:[F.value];for(let B=0,k=D.length;B<k;B++){const $=D[B],j=g($),it=S%A,tt=it%j.boundary,ot=it+tt;S+=tt,ot!==0&&A-ot<j.storage&&(S+=A-ot),F.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=j.storage}}}const M=S%A;return M>0&&(S+=A-M),_.__size=S,_.__cache={},this}function g(_){const w={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(w.boundary=4,w.storage=4):_.isVector2?(w.boundary=8,w.storage=8):_.isVector3||_.isColor?(w.boundary=16,w.storage=12):_.isVector4?(w.boundary=16,w.storage=16):_.isMatrix3?(w.boundary=48,w.storage=48):_.isMatrix4?(w.boundary=64,w.storage=64):_.isTexture?Nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(w.boundary=16,w.storage=_.byteLength):Nt("WebGLRenderer: Unsupported uniform value type.",_),w}function x(_){const w=_.target;w.removeEventListener("dispose",x);const S=o.indexOf(w.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function y(){for(const _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:y}}const Bv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let An=null;function zv(){return An===null&&(An=new Cd(Bv,16,16,Fi,ei),An.name="DFG_LUT",An.minFilter=Be,An.magFilter=Be,An.wrapS=Jn,An.wrapT=Jn,An.generateMipmaps=!1,An.needsUpdate=!0),An}class Fu{constructor(t={}){const{canvas:e=od(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=sn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const v=d,p=new Set([bc,yc,Mc]),g=new Set([sn,Bn,Gs,Ws,xc,_c]),x=new Uint32Array(4),y=new Int32Array(4),_=new L;let w=null,S=null;const A=[],M=[];let T=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let R=!1,I=null,V=null,F=null,D=null;this._outputColorSpace=hn;let B=0,k=0,$=null,j=-1,it=null;const tt=new fe,ot=new fe;let St=null;const Ft=new Gt(0);let wt=0,q=e.width,st=e.height,nt=1,yt=null,Ut=null;const Et=new fe(0,0,q,st),Qt=new fe(0,0,q,st);let Ot=!1;const Kt=new Ac;let Zt=!1,Wt=!1;const ue=new oe,Se=new L,Ae=new fe,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function _e(){return $===null?nt:1}let N=n;function We(E,O){return e.getContext(E,O)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${mc}`),e.addEventListener("webglcontextlost",pe,!1),e.addEventListener("webglcontextrestored",ae,!1),e.addEventListener("webglcontextcreationerror",Sn,!1),N===null){const O="webgl2";if(N=We(O,E),N===null)throw We(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw Yt("WebGLRenderer: "+E.message),E}let te,C,b,z,W,Y,at,lt,K,Q,ht,At,dt,ut,Lt,Dt,Bt,U,ct,J,ft,vt,et;function Tt(){te=new zg(N),te.init(),ft=new Iv(N,te),C=new Lg(N,te,t,ft),b=new Rv(N,te),C.reversedDepthBuffer&&f&&b.buffers.depth.setReversed(!0),V=N.createFramebuffer(),F=N.createFramebuffer(),D=N.createFramebuffer(),z=new Gg(N),W=new mv,Y=new Pv(N,te,b,W,C,ft,z),at=new Bg(P),lt=new qd(N),vt=new Pg(N,lt),K=new Vg(N,lt,z,vt),Q=new Xg(N,K,lt,vt,z),U=new Wg(N,C,Y),Lt=new Dg(W),ht=new pv(P,at,te,C,vt,Lt),At=new Ov(P,W),dt=new vv,ut=new Sv(te),Bt=new Rg(P,at,b,Q,m,c),Dt=new Cv(P,Q,C),et=new kv(N,z,C,b),ct=new Ig(N,te,z),J=new Hg(N,te,z),z.programs=ht.programs,P.capabilities=C,P.extensions=te,P.properties=W,P.renderLists=dt,P.shadowMap=Dt,P.state=b,P.info=z}Tt(),v!==sn&&(T=new qg(v,e.width,e.height,a,s,r));const Mt=new Nv(P,N);this.xr=Mt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=te.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=te.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(E){E!==void 0&&(nt=E,this.setSize(q,st,!1))},this.getSize=function(E){return E.set(q,st)},this.setSize=function(E,O,X=!0){if(Mt.isPresenting){Nt("WebGLRenderer: Can't change size while VR device is presenting.");return}q=E,st=O,e.width=Math.floor(E*nt),e.height=Math.floor(O*nt),X===!0&&(e.style.width=E+"px",e.style.height=O+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(q*nt,st*nt).floor()},this.setDrawingBufferSize=function(E,O,X){q=E,st=O,nt=X,e.width=Math.floor(E*X),e.height=Math.floor(O*X),this.setViewport(0,0,E,O)},this.setEffects=function(E){if(v===sn){Yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let O=0;O<E.length;O++)if(E[O].isOutputPass===!0){Nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(tt)},this.getViewport=function(E){return E.copy(Et)},this.setViewport=function(E,O,X,H){E.isVector4?Et.set(E.x,E.y,E.z,E.w):Et.set(E,O,X,H),b.viewport(tt.copy(Et).multiplyScalar(nt).round())},this.getScissor=function(E){return E.copy(Qt)},this.setScissor=function(E,O,X,H){E.isVector4?Qt.set(E.x,E.y,E.z,E.w):Qt.set(E,O,X,H),b.scissor(ot.copy(Qt).multiplyScalar(nt).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(E){b.setScissorTest(Ot=E)},this.setOpaqueSort=function(E){yt=E},this.setTransparentSort=function(E){Ut=E},this.getClearColor=function(E){return E.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor(...arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha(...arguments)},this.clear=function(E=!0,O=!0,X=!0){let H=0;if(E){let G=!1;if($!==null){const gt=$.texture.format;G=p.has(gt)}if(G){const gt=$.texture.type,_t=g.has(gt),mt=Bt.getClearColor(),bt=Bt.getClearAlpha(),Ct=mt.r,zt=mt.g,Ht=mt.b;_t?(x[0]=Ct,x[1]=zt,x[2]=Ht,x[3]=bt,N.clearBufferuiv(N.COLOR,0,x)):(y[0]=Ct,y[1]=zt,y[2]=Ht,y[3]=bt,N.clearBufferiv(N.COLOR,0,y))}else H|=N.COLOR_BUFFER_BIT}O&&(H|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),I=E},this.dispose=function(){e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",ae,!1),e.removeEventListener("webglcontextcreationerror",Sn,!1),Bt.dispose(),dt.dispose(),ut.dispose(),W.dispose(),at.dispose(),Q.dispose(),vt.dispose(),et.dispose(),ht.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",zc),Mt.removeEventListener("sessionend",Vc),yi.stop()};function pe(E){E.preventDefault(),sl("WebGLRenderer: Context Lost."),R=!0}function ae(){sl("WebGLRenderer: Context Restored."),R=!1;const E=z.autoReset,O=Dt.enabled,X=Dt.autoUpdate,H=Dt.needsUpdate,G=Dt.type;Tt(),z.autoReset=E,Dt.enabled=O,Dt.autoUpdate=X,Dt.needsUpdate=H,Dt.type=G}function Sn(E){Yt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function wn(E){const O=E.target;O.removeEventListener("dispose",wn),xf(O)}function xf(E){_f(E),W.remove(E)}function _f(E){const O=W.get(E).programs;O!==void 0&&(O.forEach(function(X){ht.releaseProgram(X)}),E.isShaderMaterial&&ht.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,X,H,G,gt){O===null&&(O=Pe);const _t=G.isMesh&&G.matrixWorld.determinantAffine()<0,mt=bf(E,O,X,H,G);b.setMaterial(H,_t);let bt=X.index,Ct=1;if(H.wireframe===!0){if(bt=K.getWireframeAttribute(X),bt===void 0)return;Ct=2}const zt=X.drawRange,Ht=X.attributes.position;let Pt=zt.start*Ct,ne=(zt.start+zt.count)*Ct;gt!==null&&(Pt=Math.max(Pt,gt.start*Ct),ne=Math.min(ne,(gt.start+gt.count)*Ct)),bt!==null?(Pt=Math.max(Pt,0),ne=Math.min(ne,bt.count)):Ht!=null&&(Pt=Math.max(Pt,0),ne=Math.min(ne,Ht.count));const ge=ne-Pt;if(ge<0||ge===1/0)return;vt.setup(G,H,mt,X,bt);let me,se=ct;if(bt!==null&&(me=lt.get(bt),se=J,se.setIndex(me)),G.isMesh)H.wireframe===!0?(b.setLineWidth(H.wireframeLinewidth*_e()),se.setMode(N.LINES)):se.setMode(N.TRIANGLES);else if(G.isLine){let Ne=H.linewidth;Ne===void 0&&(Ne=1),b.setLineWidth(Ne*_e()),G.isLineSegments?se.setMode(N.LINES):G.isLineLoop?se.setMode(N.LINE_LOOP):se.setMode(N.LINE_STRIP)}else G.isPoints?se.setMode(N.POINTS):G.isSprite&&se.setMode(N.TRIANGLES);if(G.isBatchedMesh)if(te.get("WEBGL_multi_draw"))se.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ne=G._multiDrawStarts,xt=G._multiDrawCounts,Je=G._multiDrawCount,jt=bt?lt.get(bt).bytesPerElement:1,cn=W.get(H).currentProgram.getUniforms();for(let En=0;En<Je;En++)cn.setValue(N,"_gl_DrawID",En),se.render(Ne[En]/jt,xt[En])}else if(G.isInstancedMesh)se.renderInstances(Pt,ge,G.count);else if(X.isInstancedBufferGeometry){const Ne=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,xt=Math.min(X.instanceCount,Ne);se.renderInstances(Pt,ge,xt)}else se.render(Pt,ge)};function Bc(E,O,X){E.transparent===!0&&E.side===Ge&&E.forceSinglePass===!1?(E.side=je,E.needsUpdate=!0,sr(E,O,X),E.side=vi,E.needsUpdate=!0,sr(E,O,X),E.side=Ge):sr(E,O,X)}this.compile=function(E,O,X=null){X===null&&(X=E),S=ut.get(X),S.init(O),M.push(S),X.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),E!==X&&E.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),S.setupLights();const H=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const gt=G.material;if(gt)if(Array.isArray(gt))for(let _t=0;_t<gt.length;_t++){const mt=gt[_t];Bc(mt,X,G),H.add(mt)}else Bc(gt,X,G),H.add(gt)}),S=M.pop(),H},this.compileAsync=function(E,O,X=null){const H=this.compile(E,O,X);return new Promise(G=>{function gt(){if(H.forEach(function(_t){W.get(_t).currentProgram.isReady()&&H.delete(_t)}),H.size===0){G(E);return}setTimeout(gt,10)}te.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let uo=null;function Mf(E){uo&&uo(E)}function zc(){yi.stop()}function Vc(){yi.start()}const yi=new Cu;yi.setAnimationLoop(Mf),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(E){uo=E,Mt.setAnimationLoop(E),E===null?yi.stop():yi.start()},Mt.addEventListener("sessionstart",zc),Mt.addEventListener("sessionend",Vc),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){Yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;I!==null&&I.renderStart(E,O);const X=Mt.enabled===!0&&Mt.isPresenting===!0,H=T!==null&&($===null||X)&&T.begin(P,$);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(O),O=Mt.getCamera()),E.isScene===!0&&E.onBeforeRender(P,E,O,$),S=ut.get(E,M.length),S.init(O),S.state.textureUnits=Y.getTextureUnits(),M.push(S),ue.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Kt.setFromProjectionMatrix(ue,Un,O.reversedDepth),Wt=this.localClippingEnabled,Zt=Lt.init(this.clippingPlanes,Wt),w=dt.get(E,A.length),w.init(),A.push(w),Mt.enabled===!0&&Mt.isPresenting===!0){const _t=P.xr.getDepthSensingMesh();_t!==null&&fo(_t,O,-1/0,P.sortObjects)}fo(E,O,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(yt,Ut,O.reversedDepth),de=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,de&&Bt.addToRenderList(w,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Zt===!0&&Lt.beginShadows();const G=S.state.shadowsArray;if(Dt.render(G,E,O),Zt===!0&&Lt.endShadows(),(H&&T.hasRenderPass())===!1){const _t=w.opaque,mt=w.transmissive;if(S.setupLights(),O.isArrayCamera){const bt=O.cameras;if(mt.length>0)for(let Ct=0,zt=bt.length;Ct<zt;Ct++){const Ht=bt[Ct];Gc(_t,mt,E,Ht)}de&&Bt.render(E);for(let Ct=0,zt=bt.length;Ct<zt;Ct++){const Ht=bt[Ct];Hc(w,E,Ht,Ht.viewport)}}else mt.length>0&&Gc(_t,mt,E,O),de&&Bt.render(E),Hc(w,E,O)}$!==null&&k===0&&(Y.updateMultisampleRenderTarget($),Y.updateRenderTargetMipmap($)),H&&T.end(P),E.isScene===!0&&E.onAfterRender(P,E,O),vt.resetDefaultState(),j=-1,it=null,M.pop(),M.length>0?(S=M[M.length-1],Y.setTextureUnits(S.state.textureUnits),Zt===!0&&Lt.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,I!==null&&I.renderEnd()};function fo(E,O,X,H){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Kt.intersectsSprite(E)){H&&Ae.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ue);const _t=Q.update(E),mt=E.material;mt.visible&&w.push(E,_t,mt,X,Ae.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Kt.intersectsObject(E))){const _t=Q.update(E),mt=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ae.copy(E.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Ae.copy(_t.boundingSphere.center)),Ae.applyMatrix4(E.matrixWorld).applyMatrix4(ue)),Array.isArray(mt)){const bt=_t.groups;for(let Ct=0,zt=bt.length;Ct<zt;Ct++){const Ht=bt[Ct],Pt=mt[Ht.materialIndex];Pt&&Pt.visible&&w.push(E,_t,Pt,X,Ae.z,Ht)}}else mt.visible&&w.push(E,_t,mt,X,Ae.z,null)}}const gt=E.children;for(let _t=0,mt=gt.length;_t<mt;_t++)fo(gt[_t],O,X,H)}function Hc(E,O,X,H){const{opaque:G,transmissive:gt,transparent:_t}=E;S.setupLightsView(X),Zt===!0&&Lt.setGlobalState(P.clippingPlanes,X),H&&b.viewport(tt.copy(H)),G.length>0&&ir(G,O,X),gt.length>0&&ir(gt,O,X),_t.length>0&&ir(_t,O,X),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Gc(E,O,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){const Pt=te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new Fn(1,1,{generateMipmaps:!0,type:Pt?ei:sn,minFilter:Ii,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace})}const gt=S.state.transmissionRenderTarget[H.id],_t=H.viewport||tt;gt.setSize(_t.z*P.transmissionResolutionScale,_t.w*P.transmissionResolutionScale);const mt=P.getRenderTarget(),bt=P.getActiveCubeFace(),Ct=P.getActiveMipmapLevel();P.setRenderTarget(gt),P.getClearColor(Ft),wt=P.getClearAlpha(),wt<1&&P.setClearColor(16777215,.5),P.clear(),de&&Bt.render(X);const zt=P.toneMapping;P.toneMapping=Nn;const Ht=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),Zt===!0&&Lt.setGlobalState(P.clippingPlanes,H),ir(E,X,H),Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt),te.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let ne=0,ge=O.length;ne<ge;ne++){const me=O[ne],{object:se,geometry:Ne,material:xt,group:Je}=me;if(xt.side===Ge&&se.layers.test(H.layers)){const jt=xt.side;xt.side=je,xt.needsUpdate=!0,Wc(se,X,H,Ne,xt,Je),xt.side=jt,xt.needsUpdate=!0,Pt=!0}}Pt===!0&&(Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt))}P.setRenderTarget(mt,bt,Ct),P.setClearColor(Ft,wt),Ht!==void 0&&(H.viewport=Ht),P.toneMapping=zt}function ir(E,O,X){const H=O.isScene===!0?O.overrideMaterial:null;for(let G=0,gt=E.length;G<gt;G++){const _t=E[G],{object:mt,geometry:bt,group:Ct}=_t;let zt=_t.material;zt.allowOverride===!0&&H!==null&&(zt=H),mt.layers.test(X.layers)&&Wc(mt,O,X,bt,zt,Ct)}}function Wc(E,O,X,H,G,gt){E.onBeforeRender(P,O,X,H,G,gt),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(P,O,X,H,E,gt),G.transparent===!0&&G.side===Ge&&G.forceSinglePass===!1?(G.side=je,G.needsUpdate=!0,P.renderBufferDirect(X,O,H,G,E,gt),G.side=vi,G.needsUpdate=!0,P.renderBufferDirect(X,O,H,G,E,gt),G.side=Ge):P.renderBufferDirect(X,O,H,G,E,gt),E.onAfterRender(P,O,X,H,G,gt)}function sr(E,O,X){O.isScene!==!0&&(O=Pe);const H=W.get(E),G=S.state.lights,gt=S.state.shadowsArray,_t=G.state.version,mt=ht.getParameters(E,G.state,gt,O,X,S.state.lightProbeGridArray),bt=ht.getProgramCacheKey(mt);let Ct=H.programs;H.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?O.environment:null,H.fog=O.fog;const zt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;H.envMap=at.get(E.envMap||H.environment,zt),H.envMapRotation=H.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Ct===void 0&&(E.addEventListener("dispose",wn),Ct=new Map,H.programs=Ct);let Ht=Ct.get(bt);if(Ht!==void 0){if(H.currentProgram===Ht&&H.lightsStateVersion===_t)return $c(E,mt),Ht}else mt.uniforms=ht.getUniforms(E),I!==null&&E.isNodeMaterial&&I.build(E,X,mt),E.onBeforeCompile(mt,P),Ht=ht.acquireProgram(mt,bt),Ct.set(bt,Ht),H.uniforms=mt.uniforms;const Pt=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Pt.clippingPlanes=Lt.uniform),$c(E,mt),H.needsLights=wf(E),H.lightsStateVersion=_t,H.needsLights&&(Pt.ambientLightColor.value=G.state.ambient,Pt.lightProbe.value=G.state.probe,Pt.directionalLights.value=G.state.directional,Pt.directionalLightShadows.value=G.state.directionalShadow,Pt.spotLights.value=G.state.spot,Pt.spotLightShadows.value=G.state.spotShadow,Pt.rectAreaLights.value=G.state.rectArea,Pt.ltc_1.value=G.state.rectAreaLTC1,Pt.ltc_2.value=G.state.rectAreaLTC2,Pt.pointLights.value=G.state.point,Pt.pointLightShadows.value=G.state.pointShadow,Pt.hemisphereLights.value=G.state.hemi,Pt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Pt.spotLightMatrix.value=G.state.spotLightMatrix,Pt.spotLightMap.value=G.state.spotLightMap,Pt.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=S.state.lightProbeGridArray.length>0,H.currentProgram=Ht,H.uniformsList=null,Ht}function Xc(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=Wr.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function $c(E,O){const X=W.get(E);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function yf(E,O){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;_.setFromMatrixPosition(O.matrixWorld);for(let X=0,H=E.length;X<H;X++){const G=E[X];if(G.texture!==null&&G.boundingBox.containsPoint(_))return G}return null}function bf(E,O,X,H,G){O.isScene!==!0&&(O=Pe),Y.resetTextureUnits();const gt=O.fog,_t=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?O.environment:null,mt=$===null?P.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:$t.workingColorSpace,bt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ct=at.get(H.envMap||_t,bt),zt=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ht=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pt=!!X.morphAttributes.position,ne=!!X.morphAttributes.normal,ge=!!X.morphAttributes.color;let me=Nn;H.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(me=P.toneMapping);const se=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ne=se!==void 0?se.length:0,xt=W.get(H),Je=S.state.lights;if(Zt===!0&&(Wt===!0||E!==it)){const ce=E===it&&H.id===j;Lt.setState(H,E,ce)}let jt=!1;H.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Je.state.version||xt.outputColorSpace!==mt||G.isBatchedMesh&&xt.batching===!1||!G.isBatchedMesh&&xt.batching===!0||G.isBatchedMesh&&xt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&xt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&xt.instancing===!1||!G.isInstancedMesh&&xt.instancing===!0||G.isSkinnedMesh&&xt.skinning===!1||!G.isSkinnedMesh&&xt.skinning===!0||G.isInstancedMesh&&xt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&xt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&xt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&xt.instancingMorph===!1&&G.morphTexture!==null||xt.envMap!==Ct||H.fog===!0&&xt.fog!==gt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==Lt.numPlanes||xt.numIntersection!==Lt.numIntersection)||xt.vertexAlphas!==zt||xt.vertexTangents!==Ht||xt.morphTargets!==Pt||xt.morphNormals!==ne||xt.morphColors!==ge||xt.toneMapping!==me||xt.morphTargetsCount!==Ne||!!xt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(jt=!0):(jt=!0,xt.__version=H.version);let cn=xt.currentProgram;jt===!0&&(cn=sr(H,O,G),I&&H.isNodeMaterial&&I.onUpdateProgram(H,cn,xt));let En=!1,ii=!1,zi=!1;const re=cn.getUniforms(),ve=xt.uniforms;if(b.useProgram(cn.program)&&(En=!0,ii=!0,zi=!0),H.id!==j&&(j=H.id,ii=!0),xt.needsLights){const ce=yf(S.state.lightProbeGridArray,G);xt.lightProbeGrid!==ce&&(xt.lightProbeGrid=ce,ii=!0)}if(En||it!==E){b.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),re.setValue(N,"projectionMatrix",E.projectionMatrix),re.setValue(N,"viewMatrix",E.matrixWorldInverse);const ri=re.map.cameraPosition;ri!==void 0&&ri.setValue(N,Se.setFromMatrixPosition(E.matrixWorld)),C.logarithmicDepthBuffer&&re.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&re.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),it!==E&&(it=E,ii=!0,zi=!0)}if(xt.needsLights&&(Je.state.directionalShadowMap.length>0&&re.setValue(N,"directionalShadowMap",Je.state.directionalShadowMap,Y),Je.state.spotShadowMap.length>0&&re.setValue(N,"spotShadowMap",Je.state.spotShadowMap,Y),Je.state.pointShadowMap.length>0&&re.setValue(N,"pointShadowMap",Je.state.pointShadowMap,Y)),G.isSkinnedMesh){re.setOptional(N,G,"bindMatrix"),re.setOptional(N,G,"bindMatrixInverse");const ce=G.skeleton;ce&&(ce.boneTexture===null&&ce.computeBoneTexture(),re.setValue(N,"boneTexture",ce.boneTexture,Y))}G.isBatchedMesh&&(re.setOptional(N,G,"batchingTexture"),re.setValue(N,"batchingTexture",G._matricesTexture,Y),re.setOptional(N,G,"batchingIdTexture"),re.setValue(N,"batchingIdTexture",G._indirectTexture,Y),re.setOptional(N,G,"batchingColorTexture"),G._colorsTexture!==null&&re.setValue(N,"batchingColorTexture",G._colorsTexture,Y));const si=X.morphAttributes;if((si.position!==void 0||si.normal!==void 0||si.color!==void 0)&&U.update(G,X,cn),(ii||xt.receiveShadow!==G.receiveShadow)&&(xt.receiveShadow=G.receiveShadow,re.setValue(N,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&O.environment!==null&&(ve.envMapIntensity.value=O.environmentIntensity),ve.dfgLUT!==void 0&&(ve.dfgLUT.value=zv()),ii){if(re.setValue(N,"toneMappingExposure",P.toneMappingExposure),xt.needsLights&&Sf(ve,zi),gt&&H.fog===!0&&At.refreshFogUniforms(ve,gt),At.refreshMaterialUniforms(ve,H,nt,st,S.state.transmissionRenderTarget[E.id]),xt.needsLights&&xt.lightProbeGrid){const ce=xt.lightProbeGrid;ve.probesSH.value=ce.texture,ve.probesMin.value.copy(ce.boundingBox.min),ve.probesMax.value.copy(ce.boundingBox.max),ve.probesResolution.value.copy(ce.resolution)}Wr.upload(N,Xc(xt),ve,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Wr.upload(N,Xc(xt),ve,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&re.setValue(N,"center",G.center),re.setValue(N,"modelViewMatrix",G.modelViewMatrix),re.setValue(N,"normalMatrix",G.normalMatrix),re.setValue(N,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){const ce=H.uniformsGroups;for(let ri=0,Vi=ce.length;ri<Vi;ri++){const qc=ce[ri];et.update(qc,cn),et.bind(qc,cn)}}return cn}function Sf(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function wf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(E,O,X){const H=W.get(E);H.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),W.get(E.texture).__webglTexture=O,W.get(E.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,O){const X=W.get(E);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,X=0){$=E,B=O,k=X;let H=null,G=!1,gt=!1;if(E){const mt=W.get(E);if(mt.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(N.FRAMEBUFFER,mt.__webglFramebuffer),tt.copy(E.viewport),ot.copy(E.scissor),St=E.scissorTest,b.viewport(tt),b.scissor(ot),b.setScissorTest(St),j=-1;return}else if(mt.__webglFramebuffer===void 0)Y.setupRenderTarget(E);else if(mt.__hasExternalTextures)Y.rebindTextures(E,W.get(E.texture).__webglTexture,W.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const zt=E.depthTexture;if(mt.__boundDepthTexture!==zt){if(zt!==null&&W.has(zt)&&(E.width!==zt.image.width||E.height!==zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(E)}}const bt=E.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(gt=!0);const Ct=W.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ct[O])?H=Ct[O][X]:H=Ct[O],G=!0):E.samples>0&&Y.useMultisampledRTT(E)===!1?H=W.get(E).__webglMultisampledFramebuffer:Array.isArray(Ct)?H=Ct[X]:H=Ct,tt.copy(E.viewport),ot.copy(E.scissor),St=E.scissorTest}else tt.copy(Et).multiplyScalar(nt).floor(),ot.copy(Qt).multiplyScalar(nt).floor(),St=Ot;if(X!==0&&(H=V),b.bindFramebuffer(N.FRAMEBUFFER,H)&&b.drawBuffers(E,H),b.viewport(tt),b.scissor(ot),b.setScissorTest(St),G){const mt=W.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+O,mt.__webglTexture,X)}else if(gt){const mt=O;for(let bt=0;bt<E.textures.length;bt++){const Ct=W.get(E.textures[bt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+bt,Ct.__webglTexture,X,mt)}}else if(E!==null&&X!==0){const mt=W.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,mt.__webglTexture,X)}j=-1},this.readRenderTargetPixels=function(E,O,X,H,G,gt,_t,mt=0){if(!(E&&E.isWebGLRenderTarget)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=W.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_t!==void 0&&(bt=bt[_t]),bt){b.bindFramebuffer(N.FRAMEBUFFER,bt);try{const Ct=E.textures[mt],zt=Ct.format,Ht=Ct.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+mt),!C.textureFormatReadable(zt)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Ht)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-H&&X>=0&&X<=E.height-G&&N.readPixels(O,X,H,G,ft.convert(zt),ft.convert(Ht),gt)}finally{const Ct=$!==null?W.get($).__webglFramebuffer:null;b.bindFramebuffer(N.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(E,O,X,H,G,gt,_t,mt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=W.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_t!==void 0&&(bt=bt[_t]),bt)if(O>=0&&O<=E.width-H&&X>=0&&X<=E.height-G){b.bindFramebuffer(N.FRAMEBUFFER,bt);const Ct=E.textures[mt],zt=Ct.format,Ht=Ct.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+mt),!C.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Pt),N.bufferData(N.PIXEL_PACK_BUFFER,gt.byteLength,N.STREAM_READ),N.readPixels(O,X,H,G,ft.convert(zt),ft.convert(Ht),0);const ne=$!==null?W.get($).__webglFramebuffer:null;b.bindFramebuffer(N.FRAMEBUFFER,ne);const ge=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await ad(N,ge,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Pt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,gt),N.deleteBuffer(Pt),N.deleteSync(ge),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,O=null,X=0){const H=Math.pow(2,-X),G=Math.floor(E.image.width*H),gt=Math.floor(E.image.height*H),_t=O!==null?O.x:0,mt=O!==null?O.y:0;Y.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,X,0,0,_t,mt,G,gt),b.unbindTexture()},this.copyTextureToTexture=function(E,O,X=null,H=null,G=0,gt=0){let _t,mt,bt,Ct,zt,Ht,Pt,ne,ge;const me=E.isCompressedTexture?E.mipmaps[gt]:E.image;if(X!==null)_t=X.max.x-X.min.x,mt=X.max.y-X.min.y,bt=X.isBox3?X.max.z-X.min.z:1,Ct=X.min.x,zt=X.min.y,Ht=X.isBox3?X.min.z:0;else{const ve=Math.pow(2,-G);_t=Math.floor(me.width*ve),mt=Math.floor(me.height*ve),E.isDataArrayTexture?bt=me.depth:E.isData3DTexture?bt=Math.floor(me.depth*ve):bt=1,Ct=0,zt=0,Ht=0}H!==null?(Pt=H.x,ne=H.y,ge=H.z):(Pt=0,ne=0,ge=0);const se=ft.convert(O.format),Ne=ft.convert(O.type);let xt;O.isData3DTexture?(Y.setTexture3D(O,0),xt=N.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Y.setTexture2DArray(O,0),xt=N.TEXTURE_2D_ARRAY):(Y.setTexture2D(O,0),xt=N.TEXTURE_2D),b.activeTexture(N.TEXTURE0),b.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,O.flipY),b.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),b.pixelStorei(N.UNPACK_ALIGNMENT,O.unpackAlignment);const Je=b.getParameter(N.UNPACK_ROW_LENGTH),jt=b.getParameter(N.UNPACK_IMAGE_HEIGHT),cn=b.getParameter(N.UNPACK_SKIP_PIXELS),En=b.getParameter(N.UNPACK_SKIP_ROWS),ii=b.getParameter(N.UNPACK_SKIP_IMAGES);b.pixelStorei(N.UNPACK_ROW_LENGTH,me.width),b.pixelStorei(N.UNPACK_IMAGE_HEIGHT,me.height),b.pixelStorei(N.UNPACK_SKIP_PIXELS,Ct),b.pixelStorei(N.UNPACK_SKIP_ROWS,zt),b.pixelStorei(N.UNPACK_SKIP_IMAGES,Ht);const zi=E.isDataArrayTexture||E.isData3DTexture,re=O.isDataArrayTexture||O.isData3DTexture;if(E.isDepthTexture){const ve=W.get(E),si=W.get(O),ce=W.get(ve.__renderTarget),ri=W.get(si.__renderTarget);b.bindFramebuffer(N.READ_FRAMEBUFFER,ce.__webglFramebuffer),b.bindFramebuffer(N.DRAW_FRAMEBUFFER,ri.__webglFramebuffer);for(let Vi=0;Vi<bt;Vi++)zi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,W.get(E).__webglTexture,G,Ht+Vi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,W.get(O).__webglTexture,gt,ge+Vi)),N.blitFramebuffer(Ct,zt,_t,mt,Pt,ne,_t,mt,N.DEPTH_BUFFER_BIT,N.NEAREST);b.bindFramebuffer(N.READ_FRAMEBUFFER,null),b.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(G!==0||E.isRenderTargetTexture||W.has(E)){const ve=W.get(E),si=W.get(O);b.bindFramebuffer(N.READ_FRAMEBUFFER,F),b.bindFramebuffer(N.DRAW_FRAMEBUFFER,D);for(let ce=0;ce<bt;ce++)zi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ve.__webglTexture,G,Ht+ce):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ve.__webglTexture,G),re?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,si.__webglTexture,gt,ge+ce):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,si.__webglTexture,gt),G!==0?N.blitFramebuffer(Ct,zt,_t,mt,Pt,ne,_t,mt,N.COLOR_BUFFER_BIT,N.NEAREST):re?N.copyTexSubImage3D(xt,gt,Pt,ne,ge+ce,Ct,zt,_t,mt):N.copyTexSubImage2D(xt,gt,Pt,ne,Ct,zt,_t,mt);b.bindFramebuffer(N.READ_FRAMEBUFFER,null),b.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else re?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(xt,gt,Pt,ne,ge,_t,mt,bt,se,Ne,me.data):O.isCompressedArrayTexture?N.compressedTexSubImage3D(xt,gt,Pt,ne,ge,_t,mt,bt,se,me.data):N.texSubImage3D(xt,gt,Pt,ne,ge,_t,mt,bt,se,Ne,me):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,gt,Pt,ne,_t,mt,se,Ne,me.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,gt,Pt,ne,me.width,me.height,se,me.data):N.texSubImage2D(N.TEXTURE_2D,gt,Pt,ne,_t,mt,se,Ne,me);b.pixelStorei(N.UNPACK_ROW_LENGTH,Je),b.pixelStorei(N.UNPACK_IMAGE_HEIGHT,jt),b.pixelStorei(N.UNPACK_SKIP_PIXELS,cn),b.pixelStorei(N.UNPACK_SKIP_ROWS,En),b.pixelStorei(N.UNPACK_SKIP_IMAGES,ii),gt===0&&O.generateMipmaps&&N.generateMipmap(xt),b.unbindTexture()},this.initRenderTarget=function(E){W.get(E).__webglFramebuffer===void 0&&Y.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Y.setTextureCube(E,0):E.isData3DTexture?Y.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Y.setTexture2DArray(E,0):Y.setTexture2D(E,0),b.unbindTexture()},this.resetState=function(){B=0,k=0,$=null,b.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}function Rt(i,t){return i<t?`${i}_${t}`:`${t}_${i}`}class _s{positions;faceOffsets;faceCorners;uvSets;crease;cornerSharp;polygroup;materialId;vertexColor;constructor(t,e,n,s={}){this.positions=t,this.faceOffsets=e,this.faceCorners=n;const r=Math.max(0,e.length-1);this.uvSets=s.uvSets??new Map,this.crease=s.crease??new Map,this.cornerSharp=s.cornerSharp??new Map,this.polygroup=s.polygroup??new Uint16Array(r),this.materialId=s.materialId??new Uint16Array(r),this.vertexColor=s.vertexColor??null}static empty(){return new _s(new Float32Array(0),new Uint32Array([0]),new Uint32Array(0))}get vertexCount(){return this.positions.length/3}get faceCount(){return Math.max(0,this.faceOffsets.length-1)}get cornerCount(){return this.faceCorners.length}faceSize(t){return this.faceOffsets[t+1]-this.faceOffsets[t]}faceVerts(t){const e=[];for(let n=this.faceOffsets[t];n<this.faceOffsets[t+1];n++)e.push(this.faceCorners[n]);return e}cornerIndex(t,e){return this.faceOffsets[t]+e}getPosition(t,e=[0,0,0]){return e[0]=this.positions[t*3],e[1]=this.positions[t*3+1],e[2]=this.positions[t*3+2],e}setPosition(t,e,n,s){this.positions[t*3]=e,this.positions[t*3+1]=n,this.positions[t*3+2]=s}getCrease(t,e){return this.crease.get(Rt(t,e))??0}setCrease(t,e,n){const s=Rt(t,e);n<=0?this.crease.delete(s):this.crease.set(s,Math.min(10,n))}edges(){const t=new Set,e=[];for(let n=0;n<this.faceCount;n++){const s=this.faceOffsets[n],r=this.faceOffsets[n+1]-s;for(let o=0;o<r;o++){const a=this.faceCorners[s+o],c=this.faceCorners[s+(o+1)%r],l=Rt(a,c);t.has(l)||(t.add(l),e.push([Math.min(a,c),Math.max(a,c)]))}}return e}edgeFaceMap(){const t=new Map;for(let e=0;e<this.faceCount;e++){const n=this.faceOffsets[e],s=this.faceOffsets[e+1]-n;for(let r=0;r<s;r++){const o=Rt(this.faceCorners[n+r],this.faceCorners[n+(r+1)%s]),a=t.get(o);a?a.push(e):t.set(o,[e])}}return t}vertexFaces(){const t=new Map;for(let e=0;e<this.faceCount;e++)for(let n=this.faceOffsets[e];n<this.faceOffsets[e+1];n++){const s=this.faceCorners[n],r=t.get(s);r?r.push(e):t.set(s,[e])}return t}vertexNeighbors(){const t=new Map,e=(n,s)=>{const r=t.get(n);r?r.includes(s)||r.push(s):t.set(n,[s])};for(const[n,s]of this.edges())e(n,s),e(s,n);return t}triangulate(){let t=0;for(let r=0;r<this.faceCount;r++)t+=Math.max(0,this.faceSize(r)-2);const e=new Uint32Array(t*3),n=new Uint32Array(t);let s=0;for(let r=0;r<this.faceCount;r++){const o=this.faceOffsets[r],a=this.faceOffsets[r+1]-o;for(let c=1;c<a-1;c++)e[s*3]=this.faceCorners[o],e[s*3+1]=this.faceCorners[o+c],e[s*3+2]=this.faceCorners[o+c+1],n[s]=r,s++}return{tri:e,triToFace:n}}faceCenter(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,o=0;for(let a=0;a<n;a++){const c=this.faceCorners[e+a];s+=this.positions[c*3],r+=this.positions[c*3+1],o+=this.positions[c*3+2]}return[s/n,r/n,o/n]}faceNormal(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,o=0;for(let c=0;c<n;c++){const l=this.faceCorners[e+c],h=this.faceCorners[e+(c+1)%n],u=this.positions[l*3],f=this.positions[l*3+1],d=this.positions[l*3+2],m=this.positions[h*3],v=this.positions[h*3+1],p=this.positions[h*3+2];s+=(f-v)*(d+p),r+=(d-p)*(u+m),o+=(u-m)*(f+v)}const a=Math.hypot(s,r,o)||1;return[s/a,r/a,o/a]}faceNormals(){const t=new Float32Array(this.faceCount*3);for(let e=0;e<this.faceCount;e++){const n=this.faceNormal(e);t[e*3]=n[0],t[e*3+1]=n[1],t[e*3+2]=n[2]}return t}vertexNormals(){const t=this.faceNormals(),e=new Float32Array(this.vertexCount*3);for(let n=0;n<this.faceCount;n++)for(let s=this.faceOffsets[n];s<this.faceOffsets[n+1];s++){const r=this.faceCorners[s];e[r*3]+=t[n*3],e[r*3+1]+=t[n*3+1],e[r*3+2]+=t[n*3+2]}for(let n=0;n<this.vertexCount;n++){const s=Math.hypot(e[n*3],e[n*3+1],e[n*3+2])||1;e[n*3]/=s,e[n*3+1]/=s,e[n*3+2]/=s}return e}boundsCenter(){if(this.vertexCount===0)return[0,0,0];const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let n=0;n<this.positions.length;n+=3)for(let s=0;s<3;s++){const r=this.positions[n+s];r<t[s]&&(t[s]=r),r>e[s]&&(e[s]=r)}return[(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2]}stats(){let t=0;for(let e=0;e<this.faceCount;e++)t+=Math.max(0,this.faceSize(e)-2);return{vertices:this.vertexCount,edges:this.edges().length,faces:this.faceCount,triangles:t,corners:this.cornerCount}}clone(){const t=new Map;for(const[e,n]of this.uvSets)t.set(e,n.slice());return new _s(this.positions.slice(),this.faceOffsets.slice(),this.faceCorners.slice(),{uvSets:t,crease:new Map(this.crease),cornerSharp:new Map(this.cornerSharp),polygroup:this.polygroup.slice(),materialId:this.materialId.slice(),vertexColor:this.vertexColor?this.vertexColor.slice():null})}}class ie{pos=[];offsets=[0];corners=[];uv=new Map;groups=[];materials=[];weldMap;crease=new Map;cornerSharp=new Map;constructor(t={}){this.weldMap=t.weld===!1?null:new Map}vertex(t,e,n){if(this.weldMap){const r=l=>{const h=l.toFixed(5);return h==="-0.00000"?"0.00000":h},o=`${r(t)},${r(e)},${r(n)}`,a=this.weldMap.get(o);if(a!==void 0)return a;const c=this.pos.length/3;return this.pos.push(t,e,n),this.weldMap.set(o,c),c}const s=this.pos.length/3;return this.pos.push(t,e,n),s}get vertexCount(){return this.pos.length/3}positionAt(t){return[this.pos[t*3],this.pos[t*3+1],this.pos[t*3+2]]}get faceCount(){return this.offsets.length-1}face(t,e={}){const n=[],s=[];for(let r=0;r<t.length;r++){const o=t[r];n.length&&n[n.length-1]===o||n.includes(o)||(n.push(o),s.push(r))}if(n.length>=2&&n[0]===n[n.length-1]&&(n.pop(),s.pop()),n.length<3)return-1;for(const r of n)this.corners.push(r);if(this.offsets.push(this.corners.length),this.groups.push(e.polygroup??0),this.materials.push(e.materialId??0),e.uv)for(const[r,o]of e.uv){let a=this.uv.get(r);a||(a=new Array((this.corners.length-n.length)*2).fill(0),this.uv.set(r,a));for(const c of s){const l=o[c]??[0,0];a.push(l[0],l[1])}}for(const[r,o]of this.uv){const a=this.corners.length*2;for(;o.length<a;)o.push(0)}return this.faceCount-1}build(){const t=new Map;for(const[e,n]of this.uv){const s=new Float32Array(this.corners.length*2);s.set(n.slice(0,s.length)),t.set(e,s)}return new _s(new Float32Array(this.pos),new Uint32Array(this.offsets),new Uint32Array(this.corners),{uvSets:t,crease:this.crease,cornerSharp:this.cornerSharp,polygroup:new Uint16Array(this.groups),materialId:new Uint16Array(this.materials)})}}function Ue(i,t){if(i.uvSets.size===0)return null;const e=new Map,n=i.faceOffsets[t],s=i.faceOffsets[t+1]-n;for(const[r,o]of i.uvSets){const a=[];for(let c=0;c<s;c++)a.push([o[(n+c)*2],o[(n+c)*2+1]]);e.set(r,a)}return e}function ly(i){return Array.from(i.uvSets.keys())}function hy(i,t,e,n){if(!i)return null;const s=new Map;for(const[r,o]of i){const a=o[t]??[0,0],c=o[e]??[0,0];s.set(r,[a[0]+(c[0]-a[0])*n,a[1]+(c[1]-a[1])*n])}return s}function ns(i,t,e,n,s=(a,c)=>[a,c],r=!1,o={}){for(let a=0;a<t;a++)for(let c=0;c<e;c++){const l=r?[[a,c],[a,c+1],[a+1,c+1],[a+1,c]]:[[a,c],[a+1,c],[a+1,c+1],[a,c+1]],h=[],u=[];for(const[f,d]of l){const m=f/t,v=d/e,p=n(o.u?f%t/t:m,o.v?d%e/e:v);h.push(i.vertex(p[0],p[1],p[2])),u.push(s(m,v))}i.face(h,{uv:new Map([["map1",u]])})}}function Ir(i,t,e,n,s,r,o=[.5,.5],a=.5){if(!(s<=0))for(let c=0;c<s;c++)for(let l=0;l<n;l++){const h=[[l,c],[l+1,c],[l+1,c+1],[l,c+1]],u=[],f=[];for(const[d,m]of h){const v=d%n/n*Math.PI*2,p=t*(1-m/s);u.push(i.vertex(p*Math.cos(v),e,p*Math.sin(v)));const g=p/t*a;f.push([o[0]+Math.cos(v)*g,o[1]+Math.sin(v)*g])}r>0&&(u.reverse(),f.reverse()),i.face(u,{uv:new Map([["map1",f]])})}}const ks=1/4,Vv=(1-ks*3)/2;function is(i,t){const e=i*ks,n=Vv+t*ks;return(s,r)=>[e+s*ks,n+r*ks]}function Hv(i,t,e,n,s,r){const[o,a,c]=i,l=[a[0]-o[0],a[1]-o[1],a[2]-o[2]],h=[c[0]-o[0],c[1]-o[1],c[2]-o[2]],u=[l[1]*h[2]-l[2]*h[1],l[2]*h[0]-l[0]*h[2],l[0]*h[1]-l[1]*h[0]],f=Math.hypot(u[0],u[1],u[2])||1,d=[u[0]/f,u[1]/f,u[2]/f],m=Math.abs(d[1])<.9?[0,1,0]:[1,0,0],v=[m[1]*d[2]-m[2]*d[1],m[2]*d[0]-m[0]*d[2],m[0]*d[1]-m[1]*d[0]],p=Math.hypot(v[0],v[1],v[2])||1,g=[v[0]/p,v[1]/p,v[2]/p],x=[d[1]*g[2]-d[2]*g[1],d[2]*g[0]-d[0]*g[2],d[0]*g[1]-d[1]*g[0]],y=i.map(F=>[F[0]*g[0]+F[1]*g[1]+F[2]*g[2],F[0]*x[0]+F[1]*x[1]+F[2]*x[2]]);let _=1/0,w=1/0,S=-1/0,A=-1/0;for(const[F,D]of y)_=Math.min(_,F),S=Math.max(S,F),w=Math.min(w,D),A=Math.max(A,D);const M=Math.max(S-_,A-w,1e-9),T=1/n,P=1/s,R=(Math.min(T,P)-r*2)/M,I=t*T+(T-(S-_)*R)/2,V=e*P+(P-(A-w)*R)/2;return y.map(([F,D])=>[I+(F-_)*R,V+(D-w)*R])}const Ms={cube:{id:"cube",label:"キューブ",en:"Cube",params:[{key:"width",label:"幅",value:1,min:.05,max:6,step:.05},{key:"height",label:"高さ",value:1,min:.05,max:6,step:.05},{key:"depth",label:"奥行き",value:1,min:.05,max:6,step:.05},{key:"sdW",label:"分割数 幅",value:1,min:1,max:12,step:1},{key:"sdH",label:"分割数 高さ",value:1,min:1,max:12,step:1},{key:"sdD",label:"分割数 奥行き",value:1,min:1,max:12,step:1}],build(i){const t=new ie,e=i.width/2,n=i.height/2,s=i.depth/2,r=(o,a,c,l,h,u)=>ns(t,l,h,(f,d)=>[o[0]+a[0]*f+c[0]*d,o[1]+a[1]*f+c[1]*d,o[2]+a[2]*f+c[2]*d],u);return r([-e,-n,s],[i.width,0,0],[0,i.height,0],i.sdW,i.sdH,is(0,1)),r([e,-n,-s],[-i.width,0,0],[0,i.height,0],i.sdW,i.sdH,is(2,1)),r([e,-n,s],[0,0,-i.depth],[0,i.height,0],i.sdD,i.sdH,is(1,1)),r([-e,-n,-s],[0,0,i.depth],[0,i.height,0],i.sdD,i.sdH,is(3,1)),r([-e,n,s],[i.width,0,0],[0,0,-i.depth],i.sdW,i.sdD,is(0,2)),r([-e,-n,-s],[i.width,0,0],[0,0,i.depth],i.sdW,i.sdD,is(0,0)),t.build()}},sphere:{id:"sphere",label:"スフィア",en:"Sphere",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sdAxis",label:"分割数 軸",value:20,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:12,min:2,max:64,step:1}],build(i){const t=new ie;return ns(t,i.sdAxis,i.sdHeight,(e,n)=>{const s=e*Math.PI*2,r=n*Math.PI;return[i.radius*Math.sin(r)*Math.cos(s),i.radius*Math.cos(r),i.radius*Math.sin(r)*Math.sin(s)]},(e,n)=>[e,1-n],!1,{u:!0}),t.build()}},cylinder:{id:"cylinder",label:"シリンダー",en:"Cylinder",params:[{key:"radius",label:"半径",value:.6,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCaps",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new ie,e=i.height/2;return ns(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*Math.cos(r),-e+s*i.height,i.radius*Math.sin(r)]},(n,s)=>[n,s*.5],!0,{u:!0}),Ir(t,i.radius,e,i.sdAxis,i.sdCaps,1,[.75,.75],.25),Ir(t,i.radius,-e,i.sdAxis,i.sdCaps,-1,[.25,.75],.25),t.build()}},cone:{id:"cone",label:"コーン",en:"Cone",params:[{key:"radius",label:"半径",value:.7,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCap",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new ie,e=i.height/2;return ns(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*(1-s)*Math.cos(r),-e+s*i.height,i.radius*(1-s)*Math.sin(r)]},(n,s)=>[n,s*.5],!0,{u:!0}),Ir(t,i.radius,-e,i.sdAxis,i.sdCap,-1,[.5,.75],.25),t.build()}},torus:{id:"torus",label:"トーラス",en:"Torus",params:[{key:"radius",label:"半径",value:1,min:.1,max:4,step:.05},{key:"section",label:"断面半径",value:.32,min:.02,max:2,step:.02},{key:"twist",label:"ツイスト",value:0,min:0,max:360,step:5},{key:"sdAxis",label:"分割数 軸",value:24,min:3,max:80,step:1},{key:"sdHeight",label:"分割数 断面",value:12,min:3,max:48,step:1}],build(i){const t=new ie,e=i.twist*Math.PI/180;return ns(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2,o=s*Math.PI*2+e*n,a=i.radius+i.section*Math.cos(o);return[a*Math.cos(r),i.section*Math.sin(o),a*Math.sin(r)]},(n,s)=>[n,s],!0,{u:!0,v:!0}),t.build()}},plane:{id:"plane",label:"プレーン",en:"Plane",params:[{key:"width",label:"幅",value:2,min:.05,max:10,step:.05},{key:"height",label:"奥行き",value:2,min:.05,max:10,step:.05},{key:"sdW",label:"分割数 幅",value:4,min:1,max:40,step:1},{key:"sdH",label:"分割数 奥行き",value:4,min:1,max:40,step:1}],build(i){const t=new ie;return ns(t,i.sdW,i.sdH,(e,n)=>[-i.width/2+e*i.width,0,-i.height/2+n*i.height],(e,n)=>[e,n],!0),t.build()}},disk:{id:"disk",label:"ディスク",en:"Disk",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sides",label:"サイド数",value:16,min:3,max:64,step:1},{key:"sdCaps",label:"分割数",value:1,min:1,max:10,step:1}],build(i){const t=new ie;return Ir(t,i.radius,0,i.sides,i.sdCaps,1,[.5,.5],.5),t.build()}},platonic:{id:"platonic",label:"正多面体",en:"Platonic",params:[{key:"kind",label:"種類",value:4,min:0,max:4,step:1,choices:["正四面体","正六面体","正八面体","正十二面体","正二十面体"]},{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05}],build(i){const t=(1+Math.sqrt(5))/2,e=1/t,n=Math.round(i.kind);let s,r;n===0?(s=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]],r=[[0,1,2],[0,3,1],[0,2,3],[1,3,2]]):n===1?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]],r=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]]):n===2?(s=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],r=[[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]]):n===3?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],[0,e,t],[0,e,-t],[0,-e,t],[0,-e,-t],[e,t,0],[e,-t,0],[-e,t,0],[-e,-t,0],[t,0,e],[t,0,-e],[-t,0,e],[-t,0,-e]],r=[[0,8,10,2,16],[0,16,17,1,12],[0,12,14,4,8],[8,4,18,6,10],[10,6,15,13,2],[2,13,3,17,16],[17,3,11,9,1],[1,9,5,14,12],[14,5,19,18,4],[18,19,7,15,6],[15,7,11,3,13],[9,11,7,19,5]]):(s=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]],r=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]);const o=new ie({weld:!1});for(const d of s){const m=Math.hypot(d[0],d[1],d[2]);o.vertex(d[0]/m*i.radius,d[1]/m*i.radius,d[2]/m*i.radius)}for(const d of r)o.face(d);const a=o.build(),c=[];for(let d=0;d<a.faceCount;d++){const m=a.faceCenter(d),v=a.faceNormal(d),p=a.faceVerts(d);c.push(m[0]*v[0]+m[1]*v[1]+m[2]*v[2]<0?p.reverse():p)}const l=new ie({weld:!1});for(let d=0;d<a.vertexCount;d++){const m=a.getPosition(d);l.vertex(m[0],m[1],m[2])}const h=Math.ceil(Math.sqrt(c.length)),u=Math.ceil(c.length/h),f=.02;return c.forEach((d,m)=>{const v=d.map(g=>a.getPosition(g)),p=Hv(v,m%h,Math.floor(m/h),h,u,f);l.face(d,{uv:new Map([["map1",p]])})}),l.build()}}},Gv=["cube","sphere","cylinder","cone","torus","plane","disk","platonic"];function Wv(i){const t=Ms[i],e={};if(!t)return e;for(const n of t.params)e[n.key]=n.value;return e}function Ou(i,t,e,n){const s=i.edgeFaceMap(),r=[],o=new Set,a=(c,l,h,u,f)=>{for(let d=0;d<1e5;d++){const v=(s.get(Rt(c,l))??[]).find(M=>M!==u);if(v===void 0||o.has(v))return;const p=i.faceVerts(v);if(p.length!==4)return;o.add(v);let g=-1,x=c,y=l,_=h;for(let M=0;M<4;M++)if(p[M]===c&&p[(M+1)%4]===l){g=M;break}if(g<0){for(let M=0;M<4;M++)if(p[M]===l&&p[(M+1)%4]===c){g=M,x=l,y=c,_=1-h;break}}if(g<0)return;const w=(g+2)%4,S=(g+3)%4,A={face:v,a:x,b:y,t:_,c:p[w],d:p[S],ia:g,ib:(g+1)%4,ic:w,id:S};f?r.push(A):r.unshift(A),u=v,c=A.d,l=A.c,h=_}};return a(t,e,n,-1,!0),a(e,t,1-n,r.length?r[0].face:-1,!1),r}function sc(i,t,e,n,s,r){const o=i.getPosition(t),a=i.getPosition(e);if(!s||!r)return[o[0]+(a[0]-o[0])*n,o[1]+(a[1]-o[1])*n,o[2]+(a[2]-o[2])*n];const c=[r[t*3],r[t*3+1],r[t*3+2]],l=[r[e*3],r[e*3+1],r[e*3+2]],h=[a[0]-o[0],a[1]-o[1],a[2]-o[2]],u=h[0]*c[0]+h[1]*c[1]+h[2]*c[2],f=-(h[0]*l[0]+h[1]*l[1]+h[2]*l[2]),d=[0,0,0],m=1-n;for(let v=0;v<3;v++){const p=(2*o[v]+a[v]-u*c[v])/3,g=(2*a[v]+o[v]-f*l[v])/3;d[v]=m*m*m*o[v]+3*m*m*n*p+3*m*n*n*g+n*n*n*a[v]}return d}function Xv(i,t,e,n,s){const r=Ou(i,t,e,n);if(!r.length)return null;const o=s?i.vertexNormals():null,a=[sc(i,r[0].a,r[0].b,r[0].t,s,o)];for(const c of r)a.push(sc(i,c.d,c.c,c.t,s,o));return{points:a,faceCount:r.length}}function $v(i,t,e,n,s=!1){const r=Ou(i,t,e,n);if(!r.length)return null;const o=s?i.vertexNormals():null,a=new Map;for(const f of r)a.set(f.face,f);const c=new ie({weld:!1});for(let f=0;f<i.vertexCount;f++){const d=i.getPosition(f);c.vertex(d[0],d[1],d[2])}const l=new Map,h=(f,d,m)=>{const v=Math.min(f,d),p=Math.max(f,d),g=`${v}_${p}`,x=l.get(g);if(x!==void 0)return x;const y=sc(i,f,d,m,s,o),_=c.vertex(y[0],y[1],y[2]);return l.set(g,_),_};for(let f=0;f<i.faceCount;f++){const d=a.get(f),m=Ue(i,f),v=i.polygroup[f],p=i.materialId[f];if(!d){c.face(i.faceVerts(f),{uv:m??void 0,polygroup:v,materialId:p});continue}const g=h(d.a,d.b,d.t),x=h(d.d,d.c,d.t),y=_=>{if(!m)return;const w=new Map;for(const[S,A]of m)w.set(S,_.map(M=>{if(typeof M=="number")return A[M]??[0,0];const[T,P]=M,R=A[T]??[0,0],I=A[P]??[0,0];return[R[0]+(I[0]-R[0])*d.t,R[1]+(I[1]-R[1])*d.t]}));return w};c.face([d.a,g,x,d.d],{uv:y([d.ia,[d.ia,d.ib],[d.id,d.ic],d.id]),polygroup:v,materialId:p}),c.face([g,d.b,d.c,x],{uv:y([[d.ia,d.ib],d.ib,d.ic,[d.id,d.ic]]),polygroup:v,materialId:p})}const u=c.build();for(const[f,d]of i.crease){const[m,v]=f.split("_").map(Number);l.has(`${Math.min(m,v)}_${Math.max(m,v)}`)||u.setCrease(m,v,d)}for(const[f,d]of i.cornerSharp)u.cornerSharp.set(f,d);return{mesh:u,faceCount:r.length}}function ih(i,t,e){const n=Array.from(new Set(t));if(!n.length)return null;const s=new Set(n);let r=0,o=0,a=0;for(const v of n){const p=i.faceNormal(v);r+=p[0],o+=p[1],a+=p[2]}const c=Math.hypot(r,o,a)||1;r/=c,o/=c,a/=c;const l=new ie({weld:!1});for(let v=0;v<i.vertexCount;v++){const p=i.getPosition(v);l.vertex(p[0],p[1],p[2])}const h=new Set;for(const v of n)for(const p of i.faceVerts(v))h.add(p);const u=new Map;for(const v of h){const p=i.getPosition(v);u.set(v,l.vertex(p[0]+r*e,p[1]+o*e,p[2]+a*e))}const f=new Map;for(const v of n){const p=i.faceVerts(v);for(let g=0;g<p.length;g++){const x=Rt(p[g],p[(g+1)%p.length]);f.set(x,(f.get(x)??0)+1)}}const d=[];for(let v=0;v<i.faceCount;v++){const p=Ue(i,v),g=i.polygroup[v],x=i.materialId[v],y=i.faceVerts(v);if(!s.has(v)){l.face(y,{uv:p??void 0,polygroup:g,materialId:x});continue}l.face(y.map(_=>u.get(_)),{uv:p??void 0,polygroup:g,materialId:x});for(let _=0;_<y.length;_++){const w=y[_],S=y[(_+1)%y.length];if(f.get(Rt(w,S))!==1)continue;let A;if(p){A=new Map;for(const[M,T]of p){const P=T[_]??[0,0],R=T[(_+1)%y.length]??[0,0];A.set(M,[P,R,R,P])}}d.push({verts:[w,S,u.get(S),u.get(w)],uv:A,group:g,material:x})}}for(const v of d)l.face(v.verts,{uv:v.uv,polygroup:v.group,materialId:v.material});const m=l.build();for(const[v,p]of i.crease){const[g,x]=v.split("_").map(Number);m.setCrease(g,x,p)}return{mesh:m,faceCount:n.length}}function sh(i,t,e){if(!t.length)return null;const n=i.edgeFaceMap(),s=i.faceNormals();let r=0,o=0,a=0;for(const[d,m]of t)for(const v of n.get(Rt(d,m))??[])r+=s[v*3],o+=s[v*3+1],a+=s[v*3+2];const c=Math.hypot(r,o,a);c<1e-6?(r=0,o=1,a=0):(r/=c,o/=c,a/=c);const l=new ie({weld:!1});for(let d=0;d<i.vertexCount;d++){const m=i.getPosition(d);l.vertex(m[0],m[1],m[2])}const h=new Set;for(const[d,m]of t)h.add(d),h.add(m);const u=new Map;for(const d of h){const m=i.getPosition(d);u.set(d,l.vertex(m[0]+r*e,m[1]+o*e,m[2]+a*e))}for(let d=0;d<i.faceCount;d++)l.face(i.faceVerts(d),{uv:Ue(i,d)??void 0,polygroup:i.polygroup[d],materialId:i.materialId[d]});for(const[d,m]of t){const v=n.get(Rt(d,m))??[];let p=!0;if(v.length){const g=i.faceVerts(v[0]);for(let x=0;x<g.length;x++)if(g[x]===d&&g[(x+1)%g.length]===m){p=!1;break}}p?l.face([d,m,u.get(m),u.get(d)]):l.face([m,d,u.get(d),u.get(m)])}const f=l.build();for(const[d,m]of i.crease){const[v,p]=d.split("_").map(Number);f.setCrease(v,p,m)}return{mesh:f,newEdges:t.map(([d,m])=>[u.get(d),u.get(m)]),faceCount:t.length}}function to(i,t){const e=new Map,n=new Map;t.forEach((a,c)=>{let l=0,h=0,u=0;for(const d of a){const m=i.getPosition(d);l+=m[0],h+=m[1],u+=m[2]}const f=`g${c}`;n.set(f,[l/a.length,h/a.length,u/a.length]);for(const d of a)e.set(d,f)});const s=new ie({weld:!1}),r=new Map,o=a=>{const c=e.get(a)??`v${a}`,l=r.get(c);if(l!==void 0)return l;const h=e.has(a)?n.get(e.get(a)):i.getPosition(a),u=s.vertex(h[0],h[1],h[2]);return r.set(c,u),u};for(let a=0;a<i.faceCount;a++)s.face(i.faceVerts(a).map(o),{uv:Ue(i,a)??void 0,polygroup:i.polygroup[a],materialId:i.materialId[a]});return s.build()}function qv(i,t,e,n){let s=-1,r=-1,o=-1;for(let u=0;u<i.length;u++){const f=i[u],d=i[(u+1)%i.length];if(f===e&&d===n||f===n&&d===e){s=u,r=f,o=d;break}}if(s<0)return null;const a=[];for(let u=0;u<i.length;u++)a.push(i[(s+1+u)%i.length]);let c=t,l=-1;for(let u=0;u<t.length;u++)if(t[u]===o&&t[(u+1)%t.length]===r){l=u;break}if(l<0){const u=[...t].reverse();for(let f=0;f<u.length;f++)if(u[f]===o&&u[(f+1)%u.length]===r){l=f,c=u;break}if(l<0)return null}const h=[];for(let u=0;u<c.length;u++)h.push(c[(l+1+u)%c.length]);return[...a,...h.slice(1,h.length-1)]}function Yv(i,t){let e=[];for(let a=0;a<i.faceCount;a++)e.push(i.faceVerts(a));const n=Array.from(i.polygroup),s=Array.from(i.materialId);let r=0;for(const[a,c]of t){const l=new Map;e.forEach((f,d)=>{for(let m=0;m<f.length;m++){const v=Rt(f[m],f[(m+1)%f.length]),p=l.get(v);p?p.push(d):l.set(v,[d])}});const h=l.get(Rt(a,c))??[];if(h.length!==2)continue;const u=qv(e[h[0]],e[h[1]],a,c);!u||u.length<3||(e[h[0]]=u,e.splice(h[1],1),n.splice(h[1],1),s.splice(h[1],1),r++)}if(!r)return null;const o=new ie({weld:!1});for(let a=0;a<i.vertexCount;a++){const c=i.getPosition(a);o.vertex(c[0],c[1],c[2])}return e.forEach((a,c)=>{o.face(a,{polygroup:n[c]??0,materialId:s[c]??0})}),{mesh:o.build(),merged:r}}function Kv(i,t){const e=new Set(t);if(!e.size)return null;const n=new ie({weld:!1});for(let o=0;o<i.vertexCount;o++){const a=i.getPosition(o);n.vertex(a[0],a[1],a[2])}let s=0;for(let o=0;o<i.faceCount;o++){if(e.has(o)){s++;continue}n.face(i.faceVerts(o),{uv:Ue(i,o)??void 0,polygroup:i.polygroup[o],materialId:i.materialId[o]})}if(!s)return null;const r=n.build();for(const[o,a]of i.crease){const[c,l]=o.split("_").map(Number);r.setCrease(c,l,a)}return{mesh:r,removed:s}}function Zv(i,t){const e=[];for(const n of t)n<i.faceCount&&e.push(i.faceVerts(n));return e.length?to(i,e):null}function Zn(i){const t=new Set;for(let r=0;r<i.faceCorners.length;r++)t.add(i.faceCorners[r]);if(t.size===i.vertexCount)return i;const e=new ie({weld:!1}),n=new Map;for(let r=0;r<i.vertexCount;r++){if(!t.has(r))continue;const o=i.getPosition(r);n.set(r,e.vertex(o[0],o[1],o[2]))}for(let r=0;r<i.faceCount;r++)e.face(i.faceVerts(r).map(o=>n.get(o)),{uv:Ue(i,r)??void 0,polygroup:i.polygroup[r],materialId:i.materialId[r]});const s=e.build();for(const[r,o]of i.crease){const[a,c]=r.split("_").map(Number),l=n.get(a),h=n.get(c);l!==void 0&&h!==void 0&&s.setCrease(l,h,o)}return s}function ls(i,t){return[i[0]-t[0],i[1]-t[1],i[2]-t[2]]}function rh(i){const t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]}function jv(i,t){return[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]]}function Jv(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function Qv(i,t,e,n=1){const s=Math.max(1,Math.round(n));if(!(e>0))return null;const r=new Set;for(const[x,y]of t)x!==y&&r.add(Rt(x,y));if(!r.size)return null;const o=i.edgeFaceMap(),a=new Set;for(const x of r){const y=o.get(x);if(!y||y.length!==2)return null;for(const S of y)if(i.faceSize(S)!==4)return null;const[_,w]=x.split("_").map(Number);a.add(_),a.add(w)}const c=new ie({weld:!0}),l=[];for(let x=0;x<i.vertexCount;x++){const y=i.getPosition(x);l.push(c.vertex(y[0],y[1],y[2]))}const h=new Map,u=(x,y,_)=>`${x}|${y}|${_}`,f=new Map,d=x=>i.getPosition(x);for(let x=0;x<i.faceCount;x++){const y=i.faceVerts(x),_=[];for(let w=0;w<y.length;w++){const S=y[w],A=y[(w-1+y.length)%y.length],M=y[(w+1)%y.length],T=(w-1+y.length)%y.length,P=(w+1)%y.length;if(!a.has(S)){const tt={index:l[S],uv:{base:w,toward:[]}};_.push(tt);continue}const R=d(S),I=rh(ls(d(A),R)),V=rh(ls(d(M),R)),F=Math.hypot(...ls(d(A),R))||1,D=Math.hypot(...ls(d(M),R))||1,B=Math.min(e,F*.49),k=Math.min(e,D*.49),$=r.has(Rt(A,S)),j=r.has(Rt(S,M)),it=(tt,ot)=>({index:c.vertex(R[0]+tt[0],R[1]+tt[1],R[2]+tt[2]),uv:ot});if($&&j){const tt=it([I[0]*B+V[0]*k,I[1]*B+V[1]*k,I[2]*B+V[2]*k],{base:w,toward:[{corner:T,t:B/F},{corner:P,t:k/D}]});_.push({index:tt.index,uv:tt.uv}),h.set(u(x,S,A),tt),h.set(u(x,S,M),tt)}else if($){const tt=it([V[0]*k,V[1]*k,V[2]*k],{base:w,toward:[{corner:P,t:k/D}]});_.push({index:tt.index,uv:tt.uv}),h.set(u(x,S,A),tt),h.set(u(x,S,M),tt)}else if(j){const tt=it([I[0]*B,I[1]*B,I[2]*B],{base:w,toward:[{corner:T,t:B/F}]});_.push({index:tt.index,uv:tt.uv}),h.set(u(x,S,A),tt),h.set(u(x,S,M),tt)}else{const tt=it([I[0]*B,I[1]*B,I[2]*B],{base:w,toward:[{corner:T,t:B/F}]}),ot=it([V[0]*k,V[1]*k,V[2]*k],{base:w,toward:[{corner:P,t:k/D}]});_.push({index:tt.index,uv:tt.uv},{index:ot.index,uv:ot.uv}),h.set(u(x,S,A),tt),h.set(u(x,S,M),ot)}}f.set(x,_)}for(let x=0;x<i.faceCount;x++){const y=f.get(x),_=Ue(i,x);c.face(y.map(w=>w.index),{uv:_?tx(_,y.map(w=>w.uv)):void 0,polygroup:i.polygroup[x],materialId:i.materialId[x]})}let m=0;const v=new Map,p=(x,y)=>`${x}|${y}`;for(const x of r){const[y,_]=x.split("_").map(Number),[w,S]=o.get(x);for(const F of[y,_]){const D=F===y?_:y,B=h.get(u(w,F,D)),k=h.get(u(S,F,D));if(!B||!k)return null;const $=[],j=d(F),it=Hs(c,B.index),tt=Hs(c,k.index);for(let ot=0;ot<=s;ot++){const St=ot/s;if(ot===0)$.push(B.index);else if(ot===s)$.push(k.index);else{const Ft=1-St,wt=Ft*Ft*it[0]+2*St*Ft*j[0]+St*St*tt[0],q=Ft*Ft*it[1]+2*St*Ft*j[1]+St*St*tt[1],st=Ft*Ft*it[2]+2*St*Ft*j[2]+St*St*tt[2];$.push(c.vertex(wt,q,st))}}v.set(p(x,F),$)}const A=v.get(p(x,y)),M=v.get(p(x,_)),T=i.polygroup[w]??0,P=i.materialId[w]??0,R=i.faceVerts(w),I=R.indexOf(y),V=I>=0&&R[(I+1)%R.length]===_;for(let F=0;F<s;F++){const D=V?[M[F],A[F],A[F+1],M[F+1]]:[A[F],M[F],M[F+1],A[F+1]];c.face(D,{polygroup:T,materialId:P})>=0&&m++}}for(const x of a){const y=ex(i,x,o,r,h,v,u,p);if(y===null)return null;if(y.length<3)continue;const _=nx(c,y,i,x);c.face(_)>=0&&m++}const g=c.build();for(const[x,y]of i.crease){if(r.has(x))continue;const[_,w]=x.split("_").map(Number),S=l[_],A=l[w];S!==void 0&&A!==void 0&&!a.has(_)&&!a.has(w)&&g.setCrease(S,A,y)}return{mesh:g,newFaces:m}}function Hs(i,t){const e=i.positionAt(t);return[e[0],e[1],e[2]]}function tx(i,t){const e=new Map;for(const[n,s]of i){const r=[];for(const o of t){const a=s[o.base]??[0,0];let c=a[0],l=a[1];for(const h of o.toward){const u=s[h.corner]??a;c+=(u[0]-a[0])*h.t,l+=(u[1]-a[1])*h.t}r.push([c,l])}e.set(n,r)}return e}function ex(i,t,e,n,s,r,o,a){const c=new Map;for(const m of i.vertexFaces().get(t)??[]){const v=i.faceVerts(m),p=v.indexOf(t);if(p<0)return null;c.set(m,[v[(p-1+v.length)%v.length],v[(p+1)%v.length]])}if(!c.size)return null;const l=[...c.keys()][0],h=[];let u=l,f=c.get(l)[0];for(let m=0;m<=c.size;m++){const v=c.get(u);if(!v)return null;const p=v[0]===f?v[1]:v[0];h.push({face:u,from:f,to:p});const g=(e.get(Rt(t,p))??[]).find(x=>x!==u);if(g===void 0)return null;if(g===l&&p===c.get(l)[0])break;if(u=g,f=p,h.length>c.size)return null}if(h.length!==c.size)return null;const d=[];for(const m of h){const v=s.get(o(m.face,t,m.from)),p=s.get(o(m.face,t,m.to));if(!v||!p)return null;Ko(d,v.index),p.index!==v.index&&Ko(d,p.index);const g=Rt(t,m.to);if(n.has(g)){const x=r.get(a(g,t));if(!x)return null;const _=e.get(g)[0]===m.face?x:[...x].reverse();for(const w of _)Ko(d,w)}}return d.length>1&&d[0]===d[d.length-1]&&d.pop(),d}function Ko(i,t){i.length&&i[i.length-1]===t||i.push(t)}function nx(i,t,e,n){const s=e.vertexNormals(),r=[s[n*3],s[n*3+1],s[n*3+2]],o=Hs(i,t[0]);let a=0,c=0,l=0;for(let h=1;h+1<t.length;h++){const u=jv(ls(Hs(i,t[h]),o),ls(Hs(i,t[h+1]),o));a+=u[0],c+=u[1],l+=u[2]}return Jv([a,c,l],r)<0?[...t].reverse():t}function Zo(i){return i.closed?i.verts.length:i.verts.length-1}function jo(i,t){return[i.verts[t],i.verts[(t+1)%i.verts.length]]}function ix(i){const t=new Map,e=(a,c)=>{const l=t.get(a);l?l.push(c):t.set(a,[c])},n=new Set;for(const[a,c]of i){if(a===c)continue;const l=Rt(a,c);n.has(l)||(n.add(l),e(a,c),e(c,a))}for(const a of t.values())if(a.length>2)return null;const s=new Set,r=a=>{const c=[a];s.add(a);let l=-1,h=a;for(;;){const u=(t.get(h)??[]).find(f=>f!==l&&!s.has(f));if(u===void 0)return c;c.push(u),s.add(u),l=h,h=u}},o=[];for(const[a,c]of t)c.length===1&&!s.has(a)&&o.push({verts:r(a),closed:!1});for(const a of t.keys()){if(s.has(a))continue;const c=r(a),l=c[c.length-1],h=c.length>2&&(t.get(l)??[]).includes(c[0]);o.push({verts:c,closed:h})}return o}function Bs(i,t,e){const n=i.getPosition(t),s=i.getPosition(e);return Math.hypot(n[0]-s[0],n[1]-s[1],n[2]-s[2])}function sx(i,t,e){let n=0;for(let s=0;s<t.length;s++)n+=Bs(i,t[s],e[s]);return n}function rx(i,t,e){const n=e.verts;if(!e.closed){const o=Bs(i,t.verts[0],n[0])+Bs(i,t.verts[t.verts.length-1],n[n.length-1]);return Bs(i,t.verts[0],n[n.length-1])+Bs(i,t.verts[t.verts.length-1],n[0])<o?[...n].reverse():[...n]}let s=n,r=1/0;for(const o of[n,[...n].reverse()])for(let a=0;a<o.length;a++){const c=o.map((h,u)=>o[(a+u)%o.length]),l=sx(i,t.verts,c);l<r&&(r=l,s=c)}return s}function ox(i,t){const e=ix(t);if(!e||e.length!==2)return null;const[n,s]=e;if(n.closed!==s.closed)return null;const r=Zo(n);if(r<1||r!==Zo(s))return null;const o=i.edgeFaceMap(),a=(d,m)=>{const v=o.get(Rt(d,m))??[];return v.length===1?v[0]:-1};for(const d of[n,s])for(let m=0;m<Zo(d);m++){const[v,p]=jo(d,m);if(a(v,p)<0)return null}const l={verts:rx(i,n,s),closed:s.closed},h=new ie({weld:!1});for(let d=0;d<i.vertexCount;d++){const m=i.getPosition(d);h.vertex(m[0],m[1],m[2])}for(let d=0;d<i.faceCount;d++)h.face(i.faceVerts(d),{uv:Ue(i,d)??void 0,polygroup:i.polygroup[d],materialId:i.materialId[d]});let u=0;for(let d=0;d<r;d++){const[m,v]=jo(n,d),[p,g]=jo(l,d),x=a(m,v);if(x<0)continue;const y=i.faceVerts(x),_=y.indexOf(m),S=_>=0&&y[(_+1)%y.length]===v?[v,m,p,g]:[m,v,g,p];h.face(S,{polygroup:i.polygroup[x],materialId:i.materialId[x]})>=0&&u++}if(!u)return null;const f=h.build();for(const[d,m]of i.crease){const[v,p]=d.split("_").map(Number);f.setCrease(v,p,m)}return{mesh:f,faces:u}}function ku(i,t,e){if(!e.length)return null;const n=new Map,s=new Map,r=[];for(const l of e){const h=i.faceVerts(l),u=h.indexOf(t);if(u<0||h.length<3)return null;const f={face:l,prev:h[(u-1+h.length)%h.length],next:h[(u+1)%h.length]};if(n.has(f.next)||s.has(f.prev))return null;n.set(f.next,f),s.set(f.prev,f),r.push(f)}const o=r.find(l=>!s.has(l.next))??r[0],a=[o];let c=o;for(let l=1;l<r.length;l++){const h=n.get(c.prev);if(!h||h===o)return null;a.push(h),c=h}return{cycle:a,closed:n.get(c.prev)===o}}function ax(i,t,e){const n=i.faceVerts(t),s=n.indexOf(e),r=[];for(let o=1;o<n.length;o++)r.push(n[(s+o)%n.length]);return r}function Bu(i){const t=new ie({weld:!1});for(let e=0;e<i.vertexCount;e++){const n=i.getPosition(e);t.vertex(n[0],n[1],n[2])}return t}function zu(i,t){for(const[e,n]of i.crease){const[s,r]=e.split("_").map(Number);s<t.vertexCount&&r<t.vertexCount&&t.setCrease(s,r,n)}}function Vu(i,t,e){if(!(t>0))return null;const n=e?[...new Set(e)]:Array.from({length:i.vertexCount},(d,m)=>m);if(n.length<2)return null;const s=t,r=new Map,o=(d,m,v)=>`${Math.floor(d/s)},${Math.floor(m/s)},${Math.floor(v/s)}`;for(const d of n){const m=i.getPosition(d),v=o(m[0],m[1],m[2]),p=r.get(v);p?p.push(d):r.set(v,[d])}const a=new Map,c=d=>{let m=d;for(;a.get(m)!==m;)m=a.get(m)??m;let v=d;for(;a.get(v)!==m;){const p=a.get(v)??m;a.set(v,m),v=p}return m};for(const d of n)a.set(d,d);const l=t*t;for(const d of n){const m=i.getPosition(d),v=Math.floor(m[0]/s),p=Math.floor(m[1]/s),g=Math.floor(m[2]/s);for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let _=-1;_<=1;_++)for(const w of r.get(`${v+x},${p+y},${g+_}`)??[]){if(w<=d)continue;const S=i.getPosition(w);if((m[0]-S[0])**2+(m[1]-S[1])**2+(m[2]-S[2])**2>l)continue;const M=c(d),T=c(w);M!==T&&a.set(T,M)}}const h=new Map;for(const d of n){const m=c(d),v=h.get(m);v?v.push(d):h.set(m,[d])}const u=[...h.values()].filter(d=>d.length>1);if(!u.length)return null;let f=0;for(const d of u)f+=d.length-1;return{mesh:to(i,u),merged:f}}function cx(i,t){let e=i,n=0;for(const s of new Set(t)){const o=e.vertexFaces().get(s)??[],a=ku(e,s,o);if(!a)continue;const c=[];for(const f of a.cycle)for(const d of ax(e,f.face,s))c[c.length-1]!==d&&c.push(d);if(c.length>1&&c[0]===c[c.length-1]&&c.pop(),c.length<3)continue;const l=new Set(o),h=Bu(e);for(let f=0;f<e.faceCount;f++)l.has(f)||h.face(e.faceVerts(f),{uv:Ue(e,f)??void 0,polygroup:e.polygroup[f],materialId:e.materialId[f]});h.face(c,{polygroup:e.polygroup[a.cycle[0].face],materialId:e.materialId[a.cycle[0].face]});const u=h.build();zu(e,u),e=u,n++}return n?{mesh:e,removed:n}:null}function oh(i,t,e,n=.25){const s=[...new Set(t)];if(!s.length)return null;const r=Math.max(.01,Math.min(.9,n)),o=i.vertexFaces(),a=i.vertexNormals(),c=[],l=new Set;for(const g of s){const x=ku(i,g,o.get(g)??[]);if(!(!x||!x.closed)&&!x.cycle.some(y=>l.has(y.face))){for(const y of x.cycle)l.add(y.face);c.push({v:g,cycle:x.cycle})}}if(!c.length)return null;const h=Bu(i),u=new Map,f=new Map;for(const{v:g,cycle:x}of c){const y=i.getPosition(g);for(const _ of x){const w=Rt(g,_.next);if(u.has(w))continue;const S=i.getPosition(_.next);u.set(w,h.vertex(y[0]+(S[0]-y[0])*r,y[1]+(S[1]-y[1])*r,y[2]+(S[2]-y[2])*r))}f.set(g,h.vertex(y[0]+a[g*3]*e,y[1]+a[g*3+1]*e,y[2]+a[g*3+2]*e))}const d=(g,x)=>[g[0]+(x[0]-g[0])*r,g[1]+(x[1]-g[1])*r],m=new Map;for(const{v:g,cycle:x}of c)for(const y of x)m.set(y.face,{v:g,entry:y});let v=0;for(let g=0;g<i.faceCount;g++){const x=m.get(g);if(!x){h.face(i.faceVerts(g),{uv:Ue(i,g)??void 0,polygroup:i.polygroup[g],materialId:i.materialId[g]});continue}const{v:y,entry:_}=x,w=i.faceVerts(g),S=w.indexOf(y),A=u.get(Rt(y,_.prev)),M=u.get(Rt(y,_.next)),T=[],P=Ue(i,g),R=new Map;if(P)for(const[I]of P)R.set(I,[]);for(let I=0;I<w.length;I++){const V=(S+I)%w.length;if(V===S){if(T.push(A,M),P)for(const[F,D]of P){const B=D[V]??[0,0],k=D[(V-1+w.length)%w.length]??B,$=D[(V+1)%w.length]??B;R.get(F).push(d(B,k),d(B,$))}continue}if(T.push(w[V]),P)for(const[F,D]of P)R.get(F).push(D[V]??[0,0])}h.face(T,{uv:P?R:void 0,polygroup:i.polygroup[g],materialId:i.materialId[g]})>=0&&v++}for(const{v:g,cycle:x}of c){const y=f.get(g);for(const _ of x){const w=u.get(Rt(g,_.prev)),S=u.get(Rt(g,_.next));h.face([S,w,y],{polygroup:i.polygroup[_.face],materialId:i.materialId[_.face]})>=0&&v++}}const p=h.build();return zu(i,p),{mesh:p,faces:v,tips:c.map(({v:g})=>f.get(g))}}function rc(i,t){const{verts:e,uv:n}=i,s=e.length,r=[];for(let o=0;o<s;o++)t.has(e[o])&&r.push(o);if(r.length<2||s<4)return[i];for(let o=0;o<r.length;o++)for(let a=o+1;a<r.length;a++){const c=r[o],l=r[a],h=l-c,u=s-h;if(h<2||u<2)continue;const f=g=>[g.slice(c,l+1),[...g.slice(l),...g.slice(0,c+1)]],[d,m]=f(e);let v=null,p=null;if(n){v=new Map,p=new Map;for(const[g,x]of n){const[y,_]=f(x);v.set(g,y),p.set(g,_)}}return[...rc({verts:d,uv:v},t),...rc({verts:m,uv:p},t)]}return[i]}function lx(i,t,e){const n=new ie({weld:!1});for(let o=0;o<i.vertexCount;o++){const a=i.getPosition(o);n.vertex(a[0],a[1],a[2])}let s=0;for(let o=0;o<i.faceCount;o++){const a=rc({verts:i.faceVerts(o),uv:Ue(i,o)},t);s+=a.length-1;for(const c of a)n.face(c.verts,{uv:c.uv??void 0,polygroup:i.polygroup[o],materialId:i.materialId[o]})}if(!s)return null;const r=n.build();for(const[o,a]of i.crease){const[c,l]=o.split("_").map(Number);c<r.vertexCount&&l<r.vertexCount&&r.setCrease(c,l,a)}return{mesh:r,edges:s}}function Hu(i,t){const e=new Set(t);return e.size<2?null:lx(i,e)}function hx(i,t){const e=new Set(t.map(([c,l])=>Rt(c,l)));if(e.size<2)return null;const n=new Map,s=[];let r=i.vertexCount;for(const c of e){const[l,h]=c.split("_").map(Number);if(l>=i.vertexCount||h>=i.vertexCount)continue;const u=i.getPosition(l),f=i.getPosition(h);s.push((u[0]+f[0])/2,(u[1]+f[1])/2,(u[2]+f[2])/2),n.set(c,r++)}if(n.size<2)return null;const o=new ie({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);o.vertex(l[0],l[1],l[2])}for(let c=0;c<s.length;c+=3)o.vertex(s[c],s[c+1],s[c+2]);for(let c=0;c<i.faceCount;c++){const l=i.faceVerts(c),h=Ue(i,c),u=[],f=new Map;if(h)for(const[d]of h)f.set(d,[]);for(let d=0;d<l.length;d++){const m=l[d],v=l[(d+1)%l.length];if(u.push(m),h)for(const[g,x]of h)f.get(g).push(x[d]??[0,0]);const p=n.get(Rt(m,v));if(p!==void 0&&(u.push(p),h))for(const[g,x]of h){const y=x[d]??[0,0],_=x[(d+1)%l.length]??y;f.get(g).push([(y[0]+_[0])/2,(y[1]+_[1])/2])}}o.face(u,{uv:h?f:void 0,polygroup:i.polygroup[c],materialId:i.materialId[c]})}const a=o.build();for(const[c,l]of i.crease){const[h,u]=c.split("_").map(Number);h<a.vertexCount&&u<a.vertexCount&&a.setCrease(h,u,l)}return Hu(a,n.values())}function ux(i,t){const e=new Set(t),n=i.vertexNeighbors(),s=new Map;for(const r of[...e].sort((o,a)=>o-a)){const o=(n.get(r)??[]).filter(a=>!e.has(a)).sort((a,c)=>a-c);s.set(r,o)}return s}function fx(i,t,e,n){const s=Math.max(-.99,Math.min(.99,n));for(const[r,o]of e){if(o<0)continue;const a=t[r*3],c=t[r*3+1],l=t[r*3+2];i.setPosition(r,a+(t[o*3]-a)*s,c+(t[o*3+1]-c)*s,l+(t[o*3+2]-l)*s)}}function dx(i,t,e,n){let s=t*i.scale[0],r=e*i.scale[1],o=n*i.scale[2];const[a,c,l,h]=i.rotation,u=2*(c*o-l*r),f=2*(l*s-a*o),d=2*(a*r-c*s);return s+=h*u+(c*d-l*f),r+=h*f+(l*u-a*d),o+=h*d+(a*f-c*u),[s+i.position[0],r+i.position[1],o+i.position[2]]}function $s(i,t,e,n){i.face(t.faceVerts(e).map(n),{uv:Ue(t,e)??void 0,polygroup:t.polygroup[e],materialId:t.materialId[e]})}function px(i,t){const e=[...new Set(t)].filter(c=>c>=0&&c<i.faceCount);if(!e.length)return null;const n=new ie({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);n.vertex(l[0],l[1],l[2])}for(let c=0;c<i.faceCount;c++)$s(n,i,c,l=>l);const s=new Map,r=[],o=[];for(const c of e)for(const l of i.faceVerts(c)){if(s.has(l))continue;const h=i.getPosition(l),u=n.vertex(h[0],h[1],h[2]);s.set(l,u),r.push(u)}for(const c of e){const l=i.faceCount+o.length;$s(n,i,c,h=>s.get(h)),o.push(l)}const a=n.build();for(const[c,l]of i.crease){const[h,u]=c.split("_").map(Number);a.setCrease(h,u,l)}return{mesh:a,faces:o,verts:r}}function mx(i,t){const e=new Set([...t].filter(s=>s>=0&&s<i.faceCount));if(!e.size||e.size===i.faceCount)return null;const n=s=>{const r=new ie({weld:!1});for(let a=0;a<i.vertexCount;a++){const c=i.getPosition(a);r.vertex(c[0],c[1],c[2])}for(let a=0;a<i.faceCount;a++)s(a)&&$s(r,i,a,c=>c);const o=r.build();for(const[a,c]of i.crease){const[l,h]=a.split("_").map(Number);o.setCrease(l,h,c)}return Zn(o)};return{mesh:n(s=>!e.has(s)),extracted:n(s=>e.has(s)),count:e.size}}function gx(i){if(i.length<2)return null;const t=new Set;for(const n of i)for(const s of n.mesh.uvSets.keys())t.add(s);const e=new ie({weld:!1});for(const{mesh:n,transform:s}of i){const r=e.vertexCount;for(let o=0;o<n.vertexCount;o++){const a=n.getPosition(o),c=s?dx(s,a[0],a[1],a[2]):a;e.vertex(c[0],c[1],c[2])}for(let o=0;o<n.faceCount;o++){const a=n.faceVerts(o),c=Ue(n,o);let l;if(t.size){l=new Map;for(const h of t)l.set(h,c?.get(h)??a.map(()=>[0,0]))}e.face(a.map(h=>r+h),{uv:l,polygroup:n.polygroup[o],materialId:n.materialId[o]})}}return e.build()}function vx(i){if(!i.faceCount)return null;const t=new Int32Array(i.faceCount);for(let o=0;o<i.faceCount;o++)t[o]=o;const e=o=>{let a=o;for(;t[a]!==a;)a=t[a];let c=o;for(;t[c]!==a;){const l=t[c];t[c]=a,c=l}return a},n=new Int32Array(i.vertexCount).fill(-1);for(let o=0;o<i.faceCount;o++)for(const a of i.faceVerts(o))if(n[a]<0)n[a]=o;else{const c=e(n[a]),l=e(o);c!==l&&(t[l]=c)}const s=new Map;for(let o=0;o<i.faceCount;o++){const a=e(o),c=s.get(a);c?c.push(o):s.set(a,[o])}if(s.size<2)return null;const r=[];for(const o of s.values()){const a=new ie({weld:!1});for(let l=0;l<i.vertexCount;l++){const h=i.getPosition(l);a.vertex(h[0],h[1],h[2])}for(const l of o)$s(a,i,l,h=>h);const c=a.build();for(const[l,h]of i.crease){const[u,f]=l.split("_").map(Number);c.setCrease(u,f,h)}r.push(Zn(c))}return r}function xx(i,t,e=.001){if(!i.vertexCount)return null;const n=new ie({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);n.vertex(l[0],l[1],l[2])}const s=i.vertexCount;for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c),h=[l[0],l[1],l[2]];h[t]=-h[t],n.vertex(h[0],h[1],h[2])}for(let c=0;c<i.faceCount;c++)$s(n,i,c,l=>l);for(let c=0;c<i.faceCount;c++){const l=i.faceVerts(c).map(f=>s+f),h=Ue(i,c);let u;if(h){u=new Map;for(const[f,d]of h)u.set(f,[...d].reverse())}n.face(l.reverse(),{uv:u,polygroup:i.polygroup[c],materialId:i.materialId[c]})}const r=n.build();for(const[c,l]of i.crease){const[h,u]=c.split("_").map(Number);r.setCrease(h,u,l),r.setCrease(s+h,s+u,l)}const o=[];for(let c=0;c<r.vertexCount;c++)Math.abs(r.getPosition(c)[t])<=e&&o.push(c);const a=o.length>=2?Vu(r,Math.max(e,1e-6),o):null;return a?{mesh:Zn(a.mesh),welded:a.merged}:{mesh:r,welded:0}}function jn(i,t){return`${i}:${t}`}function eo(i){const t=i.indexOf(":");return[Number(i.slice(0,t)),Number(i.slice(t+1))]}function _x(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619)>>>0;return t.toString(16).padStart(8,"0")}function Mx(i,t){const e=[...i].sort((s,r)=>s-r).join(","),n=[...t].sort().join(",");return _x(`${e}|${n}`)}function yx(i,t,e){const n=i.faceOffsets[t],s=i.faceOffsets[t+1];for(let r=n;r<s;r++)if(i.faceCorners[r]===e)return r-n;return-1}function er(i,t){const e=i.edgeFaceMap(),n=new Int32Array(i.faceCount);for(let a=0;a<i.faceCount;a++)n[a]=a;const s=a=>{let c=a;for(;n[c]!==c;)c=n[c];let l=a;for(;n[l]!==c;){const h=n[l];n[l]=c,l=h}return c};for(const[a,c]of e){if(c.length!==2||t.has(a))continue;const l=s(c[0]),h=s(c[1]);l!==h&&(n[Math.max(l,h)]=Math.min(l,h))}const r=new Map;for(let a=0;a<i.faceCount;a++){const c=s(a),l=r.get(c);l?l.push(a):r.set(c,[a])}const o=[];for(const a of[...r.keys()].sort((c,l)=>c-l)){const c=r.get(a),l=[],h=new Set(c),u=new Set;for(const d of c){const m=i.faceSize(d);for(let p=0;p<m;p++)l.push(jn(d,p));const v=i.faceVerts(d);for(let p=0;p<m;p++){const g=Rt(v[p],v[(p+1)%m]),x=e.get(g)??[];(t.has(g)||x.length!==2||!x.every(y=>h.has(y)))&&u.add(g)}}const f=[...u].sort();o.push({faces:c,corners:l,boundarySeams:f,fingerprint:Mx(c,f)})}return o}function Ic(i,t,e){const n=i.edgeFaceMap(),s=new Set(t.faces),r=new Map;t.corners.forEach((p,g)=>r.set(p,g));const o=new Int32Array(t.corners.length);for(let p=0;p<o.length;p++)o[p]=p;const a=p=>{let g=p;for(;o[g]!==g;)g=o[g];let x=p;for(;o[x]!==g;){const y=o[x];o[x]=g,x=y}return g},c=(p,g)=>{const x=a(p),y=a(g);x!==y&&(o[Math.max(x,y)]=Math.min(x,y))};for(const p of t.faces){const g=i.faceVerts(p);for(let x=0;x<g.length;x++){const y=g[x],_=g[(x+1)%g.length],w=Rt(y,_);if(e.has(w))continue;const S=n.get(w)??[];if(S.length!==2)continue;const A=S[0]===p?S[1]:S[0];if(!(A===p||!s.has(A)))for(const[M,T]of[[y,x],[_,(x+1)%g.length]]){const P=yx(i,A,M);if(P<0)continue;const R=r.get(jn(p,T)),I=r.get(jn(A,P));R!==void 0&&I!==void 0&&c(R,I)}}}const l=new Map,h=new Map,u=[];for(let p=0;p<t.corners.length;p++){const g=a(p);let x=l.get(g);if(x===void 0){x=l.size,l.set(g,x);const[y,_]=eo(t.corners[p]);u.push(i.faceVerts(y)[_])}h.set(t.corners[p],x)}const f=l.size,d=new Float64Array(f*3),m=new Int32Array(f);for(let p=0;p<f;p++){const g=u[p];m[p]=g,d[p*3]=i.positions[g*3],d[p*3+1]=i.positions[g*3+1],d[p*3+2]=i.positions[g*3+2]}const v=[];for(const p of t.faces){const g=i.faceSize(p),x=[];for(let y=0;y<g;y++)x.push(h.get(jn(p,y)));for(let y=1;y<g-1;y++)v.push(x[0],x[y],x[y+1])}return{count:f,tri:Uint32Array.from(v),positions:d,localOf:h,vertexOf:m}}function bx(i,t){const e=new Float64Array(i.cols.length);for(let n=0;n<i.cols.length;n++){const s=i.cols[n],r=i.vals[n];let o=0;for(let a=0;a<s.length;a++)o+=r[a]*t[s[a]];e[n]=o}return e}function ah(i,t){const e=new Float64Array(i.columns);for(let n=0;n<i.cols.length;n++){const s=i.cols[n],r=i.vals[n],o=t[n];if(o!==0)for(let a=0;a<s.length;a++)e[s[a]]+=r[a]*o}return e}function Sx(i,t=4e3,e=1e-10){const n=i.columns,s=new Float64Array(n),r=ah(i,i.rhs),o=new Float64Array(n);for(let d=0;d<i.cols.length;d++){const m=i.cols[d],v=i.vals[d];for(let p=0;p<m.length;p++)o[m[p]]+=v[p]*v[p]}for(let d=0;d<n;d++)o[d]>1e-300||(o[d]=1);const a=Float64Array.from(r),c=new Float64Array(n);for(let d=0;d<n;d++)c[d]=a[d]/o[d];const l=Float64Array.from(c);let h=0,u=0;for(let d=0;d<n;d++)h+=a[d]*c[d],u+=a[d]*a[d];const f=Math.max(1e-300,u)*e*e;if(u<=f)return s;for(let d=0;d<t;d++){const m=ah(i,bx(i,l));let v=0;for(let _=0;_<n;_++)v+=l[_]*m[_];if(!(Math.abs(v)>1e-300))break;const p=h/v;let g=0;for(let _=0;_<n;_++)s[_]+=p*l[_],a[_]-=p*m[_],g+=a[_]*a[_];if(g<=f)break;let x=0;for(let _=0;_<n;_++)c[_]=a[_]/o[_],x+=a[_]*c[_];const y=x/h;for(let _=0;_<n;_++)l[_]=c[_]+y*l[_];h=x}return s}function wx(i,t,e,n){const s=i[e*3]-i[t*3],r=i[e*3+1]-i[t*3+1],o=i[e*3+2]-i[t*3+2],a=i[n*3]-i[t*3],c=i[n*3+1]-i[t*3+1],l=i[n*3+2]-i[t*3+2],h=Math.hypot(s,r,o);if(h<1e-12)return{x:[0,0,0],y:[0,0,0],area2:0};const u=h,f=(s*a+r*c+o*l)/h,d=r*l-o*c,m=o*a-s*l,v=s*c-r*a,p=Math.hypot(d,m,v)/h;return{x:[0,u,f],y:[0,0,p],area2:u*p}}function Ex(i,t,e){const n=i.length/3,s=new Float64Array(n*2);if(!n)return s;const r=[],o=new Int32Array(n).fill(-1);for(let f=0;f<n;f++)e.has(f)||(o[f]=r.length,r.push(f));const a=r.length*2;if(!a){for(const[f,d]of e)s[f*2]=d[0],s[f*2+1]=d[1];return s}const c=[],l=[],h=[];for(let f=0;f<t.length;f+=3){const d=[t[f],t[f+1],t[f+2]],{x:m,y:v,area2:p}=wx(i,d[0],d[1],d[2]);if(!(p>1e-16))continue;const g=1/Math.sqrt(p),x=[m[2]-m[1],m[0]-m[2],m[1]-m[0]],y=[v[2]-v[1],v[0]-v[2],v[1]-v[0]];for(const _ of[0,1]){const w=[],S=[];let A=0;for(let M=0;M<3;M++){const T=(_===0?x[M]:y[M])*g,P=(_===0?-y[M]:x[M])*g,R=d[M],I=e.get(R);if(I){A-=T*I[0]+P*I[1];continue}w.push(o[R],r.length+o[R]),S.push(T,P)}w.length&&(c.push(Int32Array.from(w)),l.push(Float64Array.from(S)),h.push(A))}}const u=Sx({cols:c,vals:l,rhs:Float64Array.from(h),columns:a});for(let f=0;f<r.length;f++){const d=r[f];s[d*2]=u[f],s[d*2+1]=u[r.length+f]}for(const[f,d]of e)s[f*2]=d[0],s[f*2+1]=d[1];return s}function Tx(i,t){const e=i.length/3,n=new Map;if(e<2)return e===1&&n.set(0,[0,0]),n;if(!t||!t.length){const[f,d]=ch(i,Array.from({length:e},(m,v)=>v));return f!==d&&(n.set(f,[0,0]),n.set(d,[1,0])),n}const s=new Int32Array(e);for(let f=0;f<e;f++)s[f]=f;const r=f=>{let d=f;for(;s[d]!==d;)d=s[d];for(;s[f]!==d;){const m=s[f];s[f]=d,f=m}return d},o=(f,d)=>{const m=r(f),v=r(d);m!==v&&(s[m]=v)};for(let f=0;f<t.length;f+=3)o(t[f],t[f+1]),o(t[f+1],t[f+2]);const a=new Map;for(let f=0;f<t.length;f+=3)for(let d=0;d<3;d++){const m=t[f+d],v=t[f+(d+1)%3];if(m===v)continue;const p=m<v?`${m}_${v}`:`${v}_${m}`;a.set(p,(a.get(p)??0)+1)}const c=new Set;for(const[f,d]of a){if(d!==1)continue;const[m,v]=f.split("_").map(Number);c.add(m),c.add(v)}const l=new Map;for(const[f,d]of a){if(d!==1)continue;const[m,v]=f.split("_").map(Number);for(const[p,g]of[[m,v],[v,m]]){const x=l.get(p);x?x.push(g):l.set(p,[g])}}const h=new Map;for(let f=0;f<e;f++){const d=r(f),m=h.get(d);m?m.push(f):h.set(d,[f])}let u=0;for(const f of[...h.keys()].sort((d,m)=>d-m)){const d=h.get(f),m=d.filter(x=>c.has(x)),v=Ax(l,m);let p,g;v.length>=4?(p=v[0],g=v[Math.floor(v.length/2)]):[p,g]=ch(i,m.length>=2?m:d),p!==g&&(n.set(p,[u,0]),n.set(g,[u+1,0]),u+=2)}return n}function Ax(i,t){const e=t.length?Math.min(...t):-1;if(e<0)return[];const n=[e],s=new Set([e]);let r=e;for(let o=0;o<t.length+2;o++){const a=(i.get(r)??[]).filter(c=>!s.has(c)).sort((c,l)=>c-l);if(!a.length)break;r=a[0],s.add(r),n.push(r)}return n}function ch(i,t){if(t.length<2)return[t[0]??0,t[0]??0];const e=[...t].sort((o,a)=>o-a);let n=e[0],s=-1;for(const o of e){const a=lh(i,e[0],o);a>s&&(s=a,n=o)}let r=e[0];s=-1;for(const o of e){if(o===n)continue;const a=lh(i,n,o);a>s&&(s=a,r=o)}return[n,r]}function lh(i,t,e){return Math.hypot(i[t*3]-i[e*3],i[t*3+1]-i[e*3+1],i[t*3+2]-i[e*3+2])}function Cx(i,t,e){let n=0,s=0;for(let o=0;o<t.length;o+=3){const a=t[o],c=t[o+1],l=t[o+2],h=i[c*3]-i[a*3],u=i[c*3+1]-i[a*3+1],f=i[c*3+2]-i[a*3+2],d=i[l*3]-i[a*3],m=i[l*3+1]-i[a*3+1],v=i[l*3+2]-i[a*3+2],p=u*v-f*m,g=f*d-h*v,x=h*m-u*d;n+=Math.hypot(p,g,x)/2;const y=e[c*2]-e[a*2],_=e[c*2+1]-e[a*2+1],w=e[l*2]-e[a*2],S=e[l*2+1]-e[a*2+1];s+=Math.abs(y*S-_*w)/2}if(!(n>1e-16)||!(s>1e-16))return 1;const r=Math.sqrt(n/s);for(let o=0;o<e.length;o++)e[o]*=r;return r}function hh(i,t){const e=i.length/3,n=new Float64Array(e*2);if(!e)return n;let s=0,r=0,o=0;for(let g=0;g<t.length;g+=3){const x=t[g]*3,y=t[g+1]*3,_=t[g+2]*3,w=i[y]-i[x],S=i[y+1]-i[x+1],A=i[y+2]-i[x+2],M=i[_]-i[x],T=i[_+1]-i[x+1],P=i[_+2]-i[x+2];s+=S*P-A*T,r+=A*M-w*P,o+=w*T-S*M}let a=Math.hypot(s,r,o);a<1e-12&&(s=0,r=0,o=1,a=1),s/=a,r/=a,o/=a;const c=Math.abs(s)<.9?1:0,l=Math.abs(s)<.9?0:1;let h=l*o-0*r,u=0*s-c*o,f=c*r-l*s;const d=Math.hypot(h,u,f)||1;h/=d,u/=d,f/=d;const m=r*f-o*u,v=o*h-s*f,p=s*u-r*h;for(let g=0;g<e;g++){const x=i[g*3],y=i[g*3+1],_=i[g*3+2];n[g*2]=x*h+y*u+_*f,n[g*2+1]=x*m+y*v+_*p}return n}function Gu(i,t,e){const n=t.length/3,s=new Float32Array(n);let r=1,o=0,a=0;for(let c=0;c<n;c++){const l=t[c*3],h=t[c*3+1],u=t[c*3+2],f=i[h*3]-i[l*3],d=i[h*3+1]-i[l*3+1],m=i[h*3+2]-i[l*3+2],v=i[u*3]-i[l*3],p=i[u*3+1]-i[l*3+1],g=i[u*3+2]-i[l*3+2],x=Math.hypot(f,d,m);if(x<1e-12){s[c]=1;continue}const y=x,_=(f*v+d*p+m*g)/x,w=d*g-m*p,S=m*v-f*g,A=f*p-d*v,M=Math.hypot(w,S,A)/x,T=y*M;if(!(Math.abs(T)>1e-16)){s[c]=1;continue}const P=e[h*2]-e[l*2],R=e[h*2+1]-e[l*2+1],I=e[u*2]-e[l*2],V=e[u*2+1]-e[l*2+1],F=(P*M-I*0)/T,D=(-P*_+I*y)/T,B=(R*M-V*0)/T,k=(-R*_+V*y)/T,$=(F+k)/2,j=(F-k)/2,it=(B+D)/2,tt=(B-D)/2,ot=Math.hypot($,tt),St=Math.hypot(j,it),Ft=ot+St,wt=Math.abs(ot-St),q=wt>1e-12?Ft/wt:1e12;s[c]=q,q>r&&(r=q);const st=[[0,0],[y,0],[_,M]],nt=[[e[l*2],e[l*2+1]],[e[h*2],e[h*2+1]],[e[u*2],e[u*2+1]]];for(let yt=0;yt<3;yt++){const Ut=st[yt],Et=st[(yt+1)%3],Qt=st[(yt+2)%3],Ot=nt[yt],Kt=nt[(yt+1)%3],Zt=nt[(yt+2)%3],Wt=uh(Ut,Et,Qt),ue=uh(Ot,Kt,Zt);Number.isFinite(Wt)&&Number.isFinite(ue)&&(o+=Math.abs(Wt-ue),a++)}}return{maxStretch:r,meanAngleError:a?o/a*(180/Math.PI):0,perTriangle:s}}function uh(i,t,e){const n=t[0]-i[0],s=t[1]-i[1],r=e[0]-i[0],o=e[1]-i[1],a=Math.hypot(n,s),c=Math.hypot(r,o);if(a<1e-12||c<1e-12)return NaN;const l=Math.max(-1,Math.min(1,(n*r+s*o)/(a*c)));return Math.acos(l)}function Rx(i){const t=new Map;for(let e=0;e<i.faceCount;e++){const n=i.faceVerts(e);for(let s=0;s<n.length;s++){const r=Rt(n[s],n[(s+1)%n.length]),o=t.get(r);o?o.push(e):t.set(r,[e])}}return t}function Di(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function Px(i,t,e){const n=new Set;if(i.faceCount===0)return n;const s=Rx(i),r=[];for(let c=0;c<i.faceCount;c++)r.push(i.faceNormal(c));const o=Math.cos(Math.max(0,Math.min(180,t.angle))*Math.PI/180),a=Math.cos(Math.max(0,Math.min(180,e))*Math.PI/180);for(const c of[...s.keys()].sort()){const l=s.get(c);if(l.length!==2)continue;const[h,u]=l,f=Di(r[h],r[u]);if(f<o){n.add(c);continue}if(t.useHardEdges&&f<a){n.add(c);continue}if(t.useCreases&&(i.crease.get(c)??0)>0){n.add(c);continue}t.usePolygroups&&i.polygroup[h]!==i.polygroup[u]&&n.add(c)}return Ix(i,n,r,s),Dx(i,n,r,s),t.symmetric&&Nx(i,n),n}function Ix(i,t,e,n){for(let s=0;s<4;s++){const r=er(i,t);let o=!1;for(const a of r){if(a.faces.length<4)continue;const c=a.faces.length>i.faceCount/3,l=Lx(a.faces,e)<Math.cos(120*Math.PI/180);!c&&!l||Wu(a.faces,t,e,n)&&(o=!0)}if(!o)return}}function Lx(i,t){let e=1;const n=i[0];let s=n;for(const o of i){const a=Di(t[n],t[o]);a<e&&(e=a,s=o)}let r=1;for(const o of i)r=Math.min(r,Di(t[s],t[o]));return Math.min(e,r)}function Wu(i,t,e,n){const s=new Set(i),r=[...i].sort((m,v)=>m-v),o=r[0];let a=o,c=1;for(const m of r){const v=Di(e[o],e[m]);v<c&&(c=v,a=m)}let l=a;c=1;for(const m of r){const v=Di(e[a],e[m]);v<c&&(c=v,l=m)}if(a===l)return!1;const h=new Map;for(const[m,v]of n){if(v.length!==2||t.has(m))continue;const[p,g]=v;if(!(!s.has(p)||!s.has(g)))for(const[x,y]of[[p,g],[g,p]]){const _=h.get(x);_?_.push(y):h.set(x,[y])}}const u=new Map;u.set(a,0),u.set(l,1);const f=[a,l];for(;f.length;){const m=f.shift();for(const v of(h.get(m)??[]).sort((p,g)=>p-g)){if(u.has(v))continue;const p=Di(e[v],e[a]),g=Di(e[v],e[l]);u.set(v,p>=g?0:1),f.push(v)}}let d=0;for(const m of[...n.keys()].sort()){const v=n.get(m);if(v.length!==2||t.has(m))continue;const[p,g]=v;if(!s.has(p)||!s.has(g))continue;const x=u.get(p),y=u.get(g);x===void 0||y===void 0||x===y||(t.add(m),d++)}return d>0}function Dx(i,t,e,n){for(let s=0;s<8;s++){const r=er(i,t);let o=!1;for(const a of r){if(Ux(i,a.faces,t))continue;if(Wu(a.faces,t,e,n)){o=!0;continue}const c=[...a.faces].sort((h,u)=>h-u)[0],l=i.faceVerts(c);for(let h=0;h<l.length;h++)t.add(Rt(l[h],l[(h+1)%l.length]));o=!0}if(!o)return}}function Ux(i,t,e){new Set(t);const n=new Map,s=l=>{let h=l;for(;n.get(h)!==h;)h=n.get(h)??h;let u=l;for(;n.get(u)!==h;){const f=n.get(u)??h;n.set(u,h),u=f}return h},r=(l,h)=>{const u=s(l),f=s(h);u!==f&&n.set(u,f)},o=(l,h)=>`${l}:${h}`;for(const l of t)for(let h=0;h<i.faceSize(l);h++)n.set(o(l,h),o(l,h));for(const l of t){const h=i.faceVerts(l);for(let u=0;u<h.length;u++){const f=h[u],d=h[(u+1)%h.length],m=Rt(f,d);if(!e.has(m))for(const v of t){if(v===l)continue;const p=i.faceVerts(v),g=p.indexOf(f),x=p.indexOf(d);if(g<0||x<0)continue;const y=p.length;(g+1)%y!==x&&(x+1)%y!==g||(r(o(l,u),o(v,g)),r(o(l,(u+1)%h.length),o(v,x)))}}}const a=new Set;for(const l of t)for(let h=0;h<i.faceSize(l);h++)a.add(s(o(l,h)));const c=new Set;for(const l of t){const h=i.faceSize(l);for(let u=0;u<h;u++){const f=s(o(l,u)),d=s(o(l,(u+1)%h));c.add(f<d?`${f}|${d}`:`${d}|${f}`)}}return a.size-c.size+t.length===1}function Nx(i,t){const e=i.positions,n=(o,a,c)=>`${o.toFixed(3)==="-0.000"?"0.000":o.toFixed(3)},${a.toFixed(3)},${c.toFixed(3)}`,s=new Map;for(let o=0;o<i.vertexCount;o++)s.set(n(e[o*3],e[o*3+1],e[o*3+2]),o);const r=new Set;for(const[o,a]of i.edges())r.add(Rt(o,a));for(const o of[...t].sort()){const[a,c]=o.split("_").map(Number),l=s.get(n(-e[a*3],e[a*3+1],e[a*3+2])),h=s.get(n(-e[c*3],e[c*3+1],e[c*3+2]));if(l===void 0||h===void 0)continue;const u=Rt(l,h);r.has(u)&&t.add(u)}}function Fx(i,t,e){const n=i.length,s=i.map(()=>({x:0,y:0,rotated:!1,scale:1}));if(!n)return s;const r=i.map((p,g)=>{const x=e&&p.h>p.w;return{i:g,w:Math.max(1e-6,x?p.h:p.w),h:Math.max(1e-6,x?p.w:p.h),rotated:x}}),o=[...r].sort((p,g)=>g.h-p.h||g.w-p.w||p.i-g.i);let a=0;for(const p of r)a+=(p.w+t)*(p.h+t);const c=Math.max(...r.map(p=>p.w)),l=Math.max(c,Math.sqrt(a)*1.05);let h=0,u=0,f=0,d=0;for(const p of o)h>0&&h+p.w>l&&(u+=f+t,h=0,f=0),s[p.i]={x:h,y:u,rotated:p.rotated,scale:1},h+=p.w+t,d=Math.max(d,h-t),f=Math.max(f,p.h);const m=u+f,v=Math.min((1-t*2)/Math.max(1e-6,d),(1-t*2)/Math.max(1e-6,m));for(const p of s)p.x=p.x*v+t,p.y=p.y*v+t,p.scale=v;return s}function Ox(i,t,e,n){const s=[];for(let o=0;o<i.length;o++){const a=kx(i[o],t[o]),c=Math.max(1e-12,e[o]);s.push(a>1e-12?Math.sqrt(a/c):1)}let r=n;if(r===null){let o=0;for(let a=1;a<e.length;a++)e[a]>e[o]&&(o=a);r=s[o]??1}if(r>1e-12)for(let o=0;o<i.length;o++){const a=r/Math.max(1e-12,s[o]);if(Math.abs(a-1)<1e-9)continue;const c=i[o];let l=0,h=0;const u=c.length/2;for(let f=0;f<u;f++)l+=c[f*2],h+=c[f*2+1];l/=Math.max(1,u),h/=Math.max(1,u);for(let f=0;f<u;f++)c[f*2]=l+(c[f*2]-l)*a,c[f*2+1]=h+(c[f*2+1]-h)*a}}function kx(i,t){let e=0;for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],o=t[n+2];e+=Math.abs((i[r*2]-i[s*2])*(i[o*2+1]-i[s*2+1])-(i[o*2]-i[s*2])*(i[r*2+1]-i[s*2+1]))}return e/2}function Bx(i,t){let e=0;for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],o=t[n+2],a=i[r*3]-i[s*3],c=i[r*3+1]-i[s*3+1],l=i[r*3+2]-i[s*3+2],h=i[o*3]-i[s*3],u=i[o*3+1]-i[s*3+1],f=i[o*3+2]-i[s*3+2];e+=Math.hypot(c*f-l*u,l*h-a*f,a*u-c*h)}return e/2}function zx(i,t,e="center"){no(i,t,0,e)}function Vx(i,t,e="center"){no(i,t,1,e)}function no(i,t,e,n){const s=[...t];if(s.length<2)return;let r=0,o=1/0,a=-1/0;for(const l of s){const h=i[l*2+e];r+=h,o=Math.min(o,h),a=Math.max(a,h)}const c=n==="min"?o:n==="max"?a:r/s.length;for(const l of s)i[l*2+e]=c}function Hx(i,t){const e=[...t];if(e.length<3)return;let n=0,s=0;for(const u of e)n+=i[u*2],s+=i[u*2+1];n/=e.length,s/=e.length;let r=0,o=0,a=0;for(const u of e){const f=i[u*2]-n,d=i[u*2+1]-s;r+=f*f,o+=f*d,a+=d*d}const c=.5*Math.atan2(2*o,r-a),l=Math.cos(c),h=Math.sin(c);for(const u of e){const f=i[u*2]-n,d=i[u*2+1]-s,m=f*l+d*h;i[u*2]=n+l*m,i[u*2+1]=s+h*m}}function uy(i,t){if(t.length<4)return;const e=[];for(let s=0;s<t.length;s++){const r=t[s],o=t[(s+1)%t.length];e.push(Math.abs(i[o*2]-i[r*2])>=Math.abs(i[o*2+1]-i[r*2+1]))}let n=0;for(;n<t.length;){let s=n;for(;s+1<t.length&&e[s+1]===e[n];)s++;const r=[];for(let o=n;o<=s+1&&o<t.length+1;o++)r.push(t[o%t.length]);r.length>=2&&(e[n]?no(i,r,1,"center"):no(i,r,0,"center")),n=s+1}}function fy(i,t){if(t.length<2)return;let e=1/0,n=1/0,s=-1/0,r=-1/0;for(const a of t)for(const c of a)e=Math.min(e,i[c*2]),s=Math.max(s,i[c*2]),n=Math.min(n,i[c*2+1]),r=Math.max(r,i[c*2+1]);if(!Number.isFinite(e))return;const o=t.length-1;for(let a=0;a<t.length;a++){const c=t[a],l=o>0?n+(r-n)*a/o:n,h=c.length-1;for(let u=0;u<c.length;u++){const f=h>0?e+(s-e)*u/h:e;i[c[u]*2]=f,i[c[u]*2+1]=l}}}function dy(i,t){Xu(i,t,0)}function py(i,t){Xu(i,t,1)}function Xu(i,t,e){const n=[...t];if(!n.length)return;let s=1/0,r=-1/0;for(const a of n)s=Math.min(s,i[a*2+e]),r=Math.max(r,i[a*2+e]);const o=(s+r)/2;for(const a of n)i[a*2+e]=o*2-i[a*2+e]}function my(i,t,e=1){const n=[...t];if(!n.length)return;let s=1/0,r=1/0,o=-1/0,a=-1/0;for(const u of n)s=Math.min(s,i[u*2]),o=Math.max(o,i[u*2]),r=Math.min(r,i[u*2+1]),a=Math.max(a,i[u*2+1]);const c=(s+o)/2,l=(r+a)/2,h=(e%4+4)%4;for(let u=0;u<h;u++)for(const f of n){const d=i[f*2]-c,m=i[f*2+1]-l;i[f*2]=c-m,i[f*2+1]=l+d}}function Gx(i,t,e){const n=[...t].sort((o,a)=>o-a),s=new Set;let r=0;for(let o=0;o<n.length;o++){const a=n[o];if(s.has(a))continue;const c=[a];for(let u=o+1;u<n.length;u++){const f=n[u];if(s.has(f))continue;Math.hypot(i[a*2]-i[f*2],i[a*2+1]-i[f*2+1])<=e&&(c.push(f),s.add(f))}if(c.length<2)continue;let l=0,h=0;for(const u of c)l+=i[u*2],h+=i[u*2+1];l/=c.length,h/=c.length;for(const u of c)i[u*2]=l,i[u*2+1]=h;r+=c.length-1}return r}function Wx(i,t,e){if(!t.length)return;let n=e;if(n===void 0){let s=0,r=0;for(const[o,a]of t)s+=i[o*2]+i[a*2],r+=2;n=r?s/r:0}for(const[s,r]of t)i[r*2]=n*2-i[s*2],i[r*2+1]=i[s*2+1]}const Le="map1";function $u(){return{seams:new Set,pins:new Map,method:"lscm",base:null,packing:{margin:1/128,allowRotate:!0,texelDensity:null},manual:new Map,autoSeamParams:{angle:65,useHardEdges:!0,useCreases:!0,usePolygroups:!0,symmetric:!1}}}function gy(i){const t=new Map;for(const[e,n]of i.manual)t.set(e,new Map([...n].map(([s,r])=>[s,[r[0],r[1]]])));return{seams:new Set(i.seams),pins:new Map([...i.pins].map(([e,n])=>[e,[n[0],n[1]]])),method:i.method,base:i.base?Float32Array.from(i.base):null,packing:{...i.packing},manual:t,autoSeamParams:{...i.autoSeamParams}}}function os(i,t,e={}){const n=er(i,t.seams),s=new Float32Array(i.faceCorners.length*2),r=[],o=[],a=[],c=[],l=t.base??i.uvSets.get(Le);for(const f of n){const d=Ic(i,f,t.seams);let m;if(t.method==="none"){m=new Float64Array(d.count*2);for(const v of f.corners){const p=d.localOf.get(v),g=He(i,v);m[p*2]=l?l[g*2]:0,m[p*2+1]=l?l[g*2+1]:0}}else if(t.method==="projection")m=hh(d.positions,d.tri);else{const v=new Map;for(const p of f.corners){const g=t.pins.get(p);if(!g)continue;const x=d.localOf.get(p);x!==void 0&&v.set(x,[g[0],g[1]])}if(v.size<2)for(const[p,g]of Tx(d.positions,d.tri))v.has(p)||v.set(p,g);m=Ex(d.positions,d.tri,v),Xx(m,d.count)||(m=hh(d.positions,d.tri)),t.pins.size<2&&Cx(d.positions,d.tri,m)}r.push(Gu(d.positions,d.tri,m)),o.push(m),a.push(d.tri),c.push(Bx(d.positions,d.tri));for(const v of f.corners){const p=d.localOf.get(v),g=He(i,v);s[g*2]=m[p*2],s[g*2+1]=m[p*2+1]}}!e.skipPack&&t.method!=="none"&&(Ox(o,a,c,t.packing.texelDensity),$x(n,o,s,i,t.packing));for(const f of n){const d=t.manual.get(f.fingerprint);if(d)for(const[m,v]of d){const p=He(i,m);p<0||p*2+1>=s.length||(s[p*2]+=v[0],s[p*2+1]+=v[1])}}i.uvSets.set(Le,s);let h=1,u=0;for(const f of r)h=Math.max(h,f.maxStretch),u+=f.meanAngleError;return{charts:n,distortion:r,maxStretch:h,meanAngleError:r.length?u/r.length:0}}function Xx(i,t){if(!t)return!0;let e=1/0,n=1/0,s=-1/0,r=-1/0;for(let c=0;c<t;c++){const l=i[c*2],h=i[c*2+1];if(!Number.isFinite(l)||!Number.isFinite(h))return!1;e=Math.min(e,l),s=Math.max(s,l),n=Math.min(n,h),r=Math.max(r,h)}const o=s-e,a=r-n;return o>1e-9&&a>1e-9}function $x(i,t,e,n,s){if(!i.length)return;const r=[],o=[];t.forEach(c=>{let l=1/0,h=1/0,u=-1/0,f=-1/0;for(let d=0;d<c.length/2;d++)l=Math.min(l,c[d*2]),u=Math.max(u,c[d*2]),h=Math.min(h,c[d*2+1]),f=Math.max(f,c[d*2+1]);o.push([l,h]),r.push({w:u-l,h:f-h})});const a=Fx(r,s.margin,s.allowRotate);i.forEach((c,l)=>{const h=a[l],[u,f]=o[l];for(const d of c.corners){const m=He(n,d),v=e[m*2]-u,p=e[m*2+1]-f,g=h.rotated?p:v,x=h.rotated?r[l].w-v:p;e[m*2]=h.x+g*h.scale,e[m*2+1]=h.y+x*h.scale}})}function qu(i,t=1e-6){const e=new Set,n=i.uvSets.get(Le);if(!n)return e;const s=new Map;for(let r=0;r<i.faceCount;r++){const o=i.faceSize(r);for(let a=0;a<o;a++){const c=Yu(i,r,a),l=s.get(c);l?l.push([r,a]):s.set(c,[[r,a]])}}for(const[r,o]of s){if(o.length!==2)continue;const[a,c]=r.split("_").map(Number),l=(u,f)=>{const m=i.faceVerts(u).indexOf(f);if(m<0)return null;const v=i.faceOffsets[u]+m;return[n[v*2],n[v*2+1]]};let h=!1;for(const u of[a,c]){const f=l(o[0][0],u),d=l(o[1][0],u);!f||!d||(Math.abs(f[0]-d[0])>t||Math.abs(f[1]-d[1])>t)&&(h=!0)}h&&e.add(r)}return e}function qx(i){const t=$u(),e=i.uvSets.get(Le);if(!e)return t.method="projection",t;t.method="none",t.base=Float32Array.from(e);for(const n of qu(i))t.seams.add(n);return t}function Yx(i,t,e){const n=new Set(e);if(!n.size)return;const s=new Map;for(let r=0;r<i.faceCount;r++){const o=i.faceSize(r);for(let a=0;a<o;a++){const c=Yu(i,r,a);if(!n.has(c))continue;const l=s.get(c);l?l.push([r,a]):s.set(c,[[r,a]])}}for(const[r,o]of s){if(o.length!==2)continue;const[a,c]=r.split("_").map(Number);for(const l of[a,c]){const h=[];for(const[d]of o){const m=i.faceVerts(d).indexOf(l);m>=0&&h.push(i.faceOffsets[d]+m)}if(h.length!==2)continue;const u=(t[h[0]*2]+t[h[1]*2])/2,f=(t[h[0]*2+1]+t[h[1]*2+1])/2;for(const d of h)t[d*2]=u,t[d*2+1]=f}}}function He(i,t){const[e,n]=eo(t);return e<0||e>=i.faceCount?-1:i.faceOffsets[e]+n}function Kx(i,t,e){const n=i.manual.get(t)??new Map;for(const[s,r]of e){const o=n.get(s)??[0,0];n.set(s,[o[0]+r[0],o[1]+r[1]])}i.manual.set(t,n)}function Zx(i,t){if(i.method==="none"){const a=t.uvSets.get(Le);if(a){i.base=Float32Array.from(a),i.manual.clear();for(const h of qu(t))i.seams.add(h);for(const h of[...i.pins.keys()]){const[u,f]=eo(h);(u<0||u>=t.faceCount||f>=t.faceSize(u))&&i.pins.delete(h)}let c=0;const l=new Set;for(const[h,u]of t.edges())l.add(Rt(h,u));for(const h of[...i.seams])l.has(h)||(i.seams.delete(h),c++);return{droppedSeams:c,droppedIslands:0,rebased:!0}}}const e=new Set;for(const[a,c]of t.edges())e.add(Rt(a,c));let n=0;for(const a of[...i.seams])e.has(a)||(i.seams.delete(a),n++);for(const a of[...i.pins.keys()]){const[c,l]=eo(a);(c<0||c>=t.faceCount||l>=t.faceSize(c))&&i.pins.delete(a)}const s=er(t,i.seams),r=new Set(s.map(a=>a.fingerprint));let o=0;for(const a of[...i.manual.keys()])r.has(a)||(i.manual.delete(a),o++);return{droppedSeams:n,droppedIslands:o,rebased:!1}}function Yu(i,t,e){const n=i.faceVerts(t);return Rt(n[e],n[(e+1)%n.length])}function jx(i){return{seams:[...i.seams].sort(),pins:[...i.pins].sort((t,e)=>t[0]<e[0]?-1:1).map(([t,e])=>[t,e[0],e[1]]),method:i.method,base:i.base?[...i.base]:null,packing:{...i.packing},manual:[...i.manual].sort((t,e)=>t[0]<e[0]?-1:1).map(([t,e])=>[t,[...e].sort((n,s)=>n[0]<s[0]?-1:1).map(([n,s])=>[n,s[0],s[1]])]),autoSeamParams:{...i.autoSeamParams}}}function Jx(i){if(!i)return null;const t=$u();for(const e of i.seams??[])t.seams.add(e);for(const[e,n,s]of i.pins??[])t.pins.set(e,[n,s]);i.method&&(t.method=i.method),i.base&&(t.base=Float32Array.from(i.base)),i.packing&&(t.packing={...t.packing,...i.packing}),i.autoSeamParams&&(t.autoSeamParams={...t.autoSeamParams,...i.autoSeamParams});for(const[e,n]of i.manual??[])t.manual.set(e,new Map(n.map(([s,r,o])=>[s,[r,o]])));return t}function Jo(i,t,e){const n=i.vertexNeighbors(),s=i.edgeFaceMap(),r=new Set,o=(h,u)=>{const f=n.get(u);if(!f||f.length!==4)return-1;const d=s.get(Rt(h,u))??[];for(const m of f){if(m===h)continue;if(!(s.get(Rt(u,m))??[]).some(p=>d.includes(p)))return m}return-1},a=[],c=(h,u,f,d)=>{let m=!0;for(let v=0;v<1e5;v++){const p=Rt(h,u);if(r.has(p)&&!m)return!0;m&&d||(r.add(p),f?a.push([h,u]):a.unshift([u,h])),m=!1;const g=o(h,u);if(g<0)return!1;h=u,u=g}return!1},l=c(t,e,!0,!1);return l||c(e,t,!1,!0),{edges:a,closed:l}}function Qx(i,t,e){const n=i.edgeFaceMap(),s=new Set,r=[],o=[],a=(u,f,d,m)=>{for(let v=0;v<1e5;v++){const g=(n.get(Rt(u,f))??[]).find(S=>S!==d);if(g===void 0)return!1;if(s.has(g))return!0;const x=i.faceVerts(g);if(x.length!==4)return!1;s.add(g);let y=-1;for(let S=0;S<4;S++)if(x[S]===u&&x[(S+1)%4]===f){y=S;break}if(y<0){for(let S=0;S<4;S++)if(x[S]===f&&x[(S+1)%4]===u){y=S;break}}if(y<0)return!1;const _=x[(y+2)%4],w=x[(y+3)%4];m.push([w,_]),d=g,u=w,f=_}return!1},c=n.get(Rt(t,e))??[],l=a(t,e,-1,r);if(!l){const u=c.find(f=>s.has(f));a(e,t,u??-1,o)}const h=[...o.reverse(),[t,e],...r];if(l&&h.length>1){const u=h[h.length-1];Rt(u[0],u[1])===Rt(t,e)&&h.pop()}return{edges:h,closed:l}}function fh(i,t,e){const n=i.edges.map(c=>Rt(c[0],c[1]));let s=n.indexOf(t),r=n.indexOf(e);if(s<0||r<0)return null;s>r&&([s,r]=[r,s]);const o=i.edges.slice(s,r+1);if(!i.closed)return o;const a=[...i.edges.slice(r),...i.edges.slice(0,s+1)];return a.length<o.length?a:o}function Ku(i,t){const e=i.edgeFaceMap(),n=new Set([t]),s=[t],r=[];for(;s.length;){const o=s.pop();r.push(o);const a=i.faceVerts(o);for(let c=0;c<a.length;c++){const l=e.get(Rt(a[c],a[(c+1)%a.length]))??[];for(const h of l)n.has(h)||(n.add(h),s.push(h))}}return r}function t_(i,t){const e=new Set;for(const n of Ku(i,t))for(const s of i.faceVerts(n))e.add(s);return Array.from(e)}function e_(i){const t=[];for(const[e,n]of i.edges)t.includes(e)||t.push(e),t.includes(n)||t.push(n);return t}function n_(i){const t=[];for(const[e,n]of i.edgeFaceMap())if(n.length===1){const[s,r]=e.split("_").map(Number);t.push([s,r])}return t}function dh(i,t){const e=i.vertexNeighbors(),n=new Set(t);for(const s of Array.from(n))for(const r of e.get(s)??[])n.add(r);return Array.from(n)}function ph(i,t){const e=i.vertexNeighbors(),n=new Set(t);return Array.from(n).filter(s=>(e.get(s)??[]).every(r=>n.has(r)))}function i_(i,t){const e=i.edgeFaceMap(),n=new Set(t);for(const s of Array.from(n)){const r=i.faceVerts(s);for(let o=0;o<r.length;o++)for(const a of e.get(Rt(r[o],r[(o+1)%r.length]))??[])n.add(a)}return Array.from(n)}function s_(i,t){const e=i.edgeFaceMap(),n=new Set(t);return Array.from(n).filter(s=>{const r=i.faceVerts(s);for(let o=0;o<r.length;o++)for(const a of e.get(Rt(r[o],r[(o+1)%r.length]))??[])if(!n.has(a))return!1;return!0})}function r_(i){let t=0,e=0;for(const n of i)t+=n[0],e+=n[1];return[t/i.length,e/i.length]}class o_{vertexCount;faceCount;edgeList;edgeBase;faceBase;outCount;faceVerts=[];vertexFaces=[];neighbors=[];edgeIndex=new Map;edgeFaces=[];edgeSharp;sharpAt=[];constructor(t){this.vertexCount=t.vertexCount,this.faceCount=t.faceCount,this.edgeList=t.edges(),this.edgeBase=this.vertexCount,this.faceBase=this.vertexCount+this.edgeList.length,this.outCount=this.faceBase+this.faceCount;for(let r=0;r<this.faceCount;r++)this.faceVerts.push(t.faceVerts(r));const e=t.vertexFaces(),n=t.vertexNeighbors();for(let r=0;r<this.vertexCount;r++)this.vertexFaces.push(e.get(r)??[]),this.neighbors.push(n.get(r)??[]),this.sharpAt.push([]);const s=t.edgeFaceMap();this.edgeSharp=new Float64Array(this.edgeList.length);for(let r=0;r<this.edgeList.length;r++){const[o,a]=this.edgeList[r],c=Rt(o,a);this.edgeIndex.set(c,r);const l=s.get(c)??[];this.edgeFaces.push(l),this.edgeSharp[r]=Math.min(1,t.getCrease(o,a));const h=l.length===1?1:this.edgeSharp[r];h>0&&(this.sharpAt[o].push({other:a,sharpness:h}),this.sharpAt[a].push({other:o,sharpness:h}))}}edgePointOf(t,e){const n=this.edgeIndex.get(Rt(t,e));return n===void 0?-1:this.edgeBase+n}affected(t){const e=new Set,n=new Set;for(const s of t){if(s<0||s>=this.vertexCount)continue;const r=this.vertexFaces[s];r.length||n.add(s);for(const o of r)e.add(o)}for(const s of e){n.add(this.faceBase+s);const r=this.faceVerts[s];for(let o=0;o<r.length;o++){n.add(r[o]);const a=this.edgeIndex.get(Rt(r[o],r[(o+1)%r.length]));a!==void 0&&n.add(this.edgeBase+a)}}return n}positions(t,e,n){const s=new Float64Array(this.faceCount*3),r=new Uint8Array(this.faceCount),o=u=>{if(!r[u]){const f=t.faceCenter(u);s[u*3]=f[0],s[u*3+1]=f[1],s[u*3+2]=f[2],r[u]=1}return u*3},a=u=>{const f=o(u),d=(this.faceBase+u)*3;e[d]=s[f],e[d+1]=s[f+1],e[d+2]=s[f+2]},c=u=>{const[f,d]=this.edgeList[u],m=t.getPosition(f),v=t.getPosition(d),p=[(m[0]+v[0])/2,(m[1]+v[1])/2,(m[2]+v[2])/2],g=(this.edgeBase+u)*3,x=this.edgeFaces[u];if(x.length!==2){e[g]=p[0],e[g+1]=p[1],e[g+2]=p[2];return}const y=o(x[0]),_=o(x[1]),w=this.edgeSharp[u];for(let S=0;S<3;S++){const A=(m[S]+v[S]+s[y+S]+s[_+S])/4;e[g+S]=A+(p[S]-A)*w}},l=u=>{const f=t.getPosition(u),d=this.vertexFaces[u],m=d.length,v=this.neighbors[u],p=u*3;let g;if(!m||!v.length)g=[f[0],f[1],f[2]];else{let w=0,S=0,A=0;for(const R of d){const I=o(R);w+=s[I],S+=s[I+1],A+=s[I+2]}w/=m,S/=m,A/=m;let M=0,T=0,P=0;for(const R of v){const I=t.getPosition(R);M+=(f[0]+I[0])/2,T+=(f[1]+I[1])/2,P+=(f[2]+I[2])/2}M/=v.length,T/=v.length,P/=v.length,g=[(w+2*M+(m-3)*f[0])/m,(S+2*T+(m-3)*f[1])/m,(A+2*P+(m-3)*f[2])/m]}const x=this.sharpAt[u];if(x.length<2){e[p]=g[0],e[p+1]=g[1],e[p+2]=g[2];return}let y;if(x.length>=3)y=[f[0],f[1],f[2]];else{let w=0,S=0,A=0;for(const M of x){const T=t.getPosition(M.other);w+=(f[0]+T[0])/2,S+=(f[1]+T[1])/2,A+=(f[2]+T[2])/2}y=[(w+6*f[0])/8,(S+6*f[1])/8,(A+6*f[2])/8]}let _=0;for(const w of x)_+=w.sharpness;_=Math.min(1,_/x.length);for(let w=0;w<3;w++)e[p+w]=g[w]+(y[w]-g[w])*_},h=u=>{u>=this.faceBase?a(u-this.faceBase):u>=this.edgeBase?c(u-this.edgeBase):l(u)};if(n){for(const u of n)u>=0&&u<this.outCount&&h(u);return}for(let u=0;u<this.faceCount;u++)a(u);for(let u=0;u<this.edgeList.length;u++)c(u);for(let u=0;u<this.vertexCount;u++)l(u)}build(t){const e=new Float32Array(this.outCount*3);this.positions(t,e);const n=new ie({weld:!1});for(let r=0;r<this.outCount;r++)n.vertex(e[r*3],e[r*3+1],e[r*3+2]);for(let r=0;r<this.faceCount;r++){const o=this.faceVerts[r],a=Ue(t,r),c=t.polygroup[r],l=t.materialId[r],h=o.length,u=new Map;if(a)for(const[f,d]of a)u.set(f,r_(d));for(let f=0;f<h;f++){const d=o[f],m=o[(f+1)%h],v=o[(f-1+h)%h];let p;if(a){p=new Map;for(const[g,x]of a){const y=x[f]??[0,0],_=x[(f+1)%h]??[0,0],w=x[(f-1+h)%h]??[0,0];p.set(g,[y,[(y[0]+_[0])/2,(y[1]+_[1])/2],u.get(g),[(w[0]+y[0])/2,(w[1]+y[1])/2]])}}n.face([d,this.edgePointOf(d,m),this.faceBase+r,this.edgePointOf(v,d)],{uv:p,polygroup:c,materialId:l})}}const s=n.build();for(const[r,o]of t.crease){const a=o-1;if(a<=0)continue;const[c,l]=r.split("_").map(Number),h=this.edgePointOf(c,l);h<0||(s.setCrease(c,h,a),s.setCrease(h,l,a))}for(const[r,o]of t.cornerSharp){const a=o-1;a>0&&s.cornerSharp.set(r,a)}return s}}function a_(i){return new o_(i).build(i)}function c_(i,t){let e=i;for(let n=0;n<t;n++)e=a_(e);return e}function Lr(i,t){return i^=t&255,i=Math.imul(i,16777619),i^=t>>>8&255,i=Math.imul(i,16777619),i^=t>>>16&255,i=Math.imul(i,16777619),i^=t>>>24&255,i=Math.imul(i,16777619),i>>>0}function Zu(i){let t=2166136261;t=Lr(t,i.vertexCount),t=Lr(t,i.faceCount);for(let e=0;e<i.faceOffsets.length;e++)t=Lr(t,i.faceOffsets[e]);for(let e=0;e<i.faceCorners.length;e++)t=Lr(t,i.faceCorners[e]);return t.toString(16).padStart(8,"0")}function vy(i,t){if(i.vertexCount!==t.vertexCount)return{same:!1,reason:"vertexCount"};if(i.faceCount!==t.faceCount)return{same:!1,reason:"faceCount"};if(i.faceCorners.length!==t.faceCorners.length)return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceOffsets.length;e++)if(i.faceOffsets[e]!==t.faceOffsets[e])return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceCorners.length;e++)if(i.faceCorners[e]!==t.faceCorners[e])return{same:!1,reason:"faceOrder"};return{same:!0}}function ju(){return{position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]}}function mi(i){const[t,e,n]=i.position,[s,r,o,a]=i.rotation,[c,l,h]=i.scale;return{position:[t,e,n],rotation:[s,r,o,a],scale:[c,l,h]}}class oc{id;name;kind;parametric;params;transform;mesh;multires=[];sculptLayers=[];paintLayers=[];activeLevel=0;visible=!0;exportedTopologyHash=null;uv=null;constructor(t,e,n){this.id=e,this.kind=t;const s=Ms[t];this.name=n??(s?s.en.replace(/\s/g,""):"mesh")+e,this.parametric=!!s,this.params=Wv(t),this.transform=ju(),this.mesh=s?s.build(this.params):_s.empty()}rebuild(){if(!this.parametric)return;const t=Ms[this.kind];t&&(this.mesh=t.build(this.params))}markTopologyChanged(){const t=this.multires.length,e=this.sculptLayers.length;this.parametric=!1,this.multires=[],this.sculptLayers=[],this.activeLevel=0;const n=this.uv?Zx(this.uv,this.mesh):{droppedSeams:0,droppedIslands:0,rebased:!1};return{droppedLevels:t,droppedLayers:e,...n}}topologyHash(){return Zu(this.mesh)}hasUv(){return this.mesh.uvSets.size>0}}class Ju{objects=[];settings={};cameraBookmarks=[];nextId=1;newId(){return String(this.nextId++)}addObject(t){const e=new oc(t,this.newId());return this.objects.push(e),e}addMesh(t,e){const n=new oc("mesh",this.newId(),e);return n.parametric=!1,n.mesh=t,this.objects.push(n),n}remove(t){const e=this.objects.indexOf(t);e>=0&&this.objects.splice(e,1)}find(t){return this.objects.find(e=>e.id===t)}syncIdCounter(){let t=0;for(const e of this.objects){const n=Number(e.id);Number.isFinite(n)&&n>t&&(t=n)}this.nextId=t+1}stats(){let t=0,e=0,n=0;for(const s of this.objects){const r=s.mesh.stats();t+=r.vertices,e+=r.faces,n+=r.triangles}return{objects:this.objects.length,vertices:t,faces:e,triangles:n}}}function l_(i){const t=[],e=[],n=[];let s=null,r="mesh",o=new Map,a=!1,c=0;const l=new Map,h=()=>{s&&s.faceCount>0&&n.push({name:r,mesh:s.build()}),s=null,o=new Map,a=!1},u=()=>(s||(s=new ie({weld:!1})),s);for(const f of i.split(/\r?\n/)){const d=f.trim();if(!d||d.startsWith("#"))continue;const m=d.split(/\s+/),v=m[0];if(v==="v")t.push([Number(m[1]),Number(m[2]),Number(m[3])]);else if(v==="vt")e.push([Number(m[1]),Number(m[2]??0)]);else if(v==="o")h(),r=m.slice(1).join("_")||"mesh";else if(v==="g"){const p=m.slice(1).join("_")||"default";let g=l.get(p);g===void 0&&(g=l.size,l.set(p,g)),c=g,r==="mesh"&&!s&&(r=p)}else if(v==="f"){const p=u(),g=[],x=[];for(let y=1;y<m.length;y++){const _=m[y].split("/");let w=parseInt(_[0],10);if(!Number.isFinite(w))continue;w<0&&(w=t.length+w+1);let S=o.get(w);if(S===void 0){const M=t[w-1];if(!M)continue;S=p.vertex(M[0],M[1],M[2]),o.set(w,S)}if(g.includes(S))continue;g.push(S);let A=_[1]?parseInt(_[1],10):NaN;if(Number.isFinite(A)){A<0&&(A=e.length+A+1);const M=e[A-1];M?(x.push(M),a=!0):x.push([0,0])}else x.push([0,0])}g.length>=3&&p.face(g,{uv:a?new Map([["map1",x]]):void 0,polygroup:c})}}return h(),n}function h_(i){const t=["# macbeth"];let e=1,n=1;for(const s of i){const{mesh:r}=s;t.push(`o ${s.name.replace(/\s+/g,"_")}`);for(let l=0;l<r.vertexCount;l++){const h=r.getPosition(l),u=s.toWorld?s.toWorld(h[0],h[1],h[2]):h;t.push(`v ${u[0].toFixed(6)} ${u[1].toFixed(6)} ${u[2].toFixed(6)}`)}const o=r.uvSets.get("map1")??r.uvSets.values().next().value??null;if(o)for(let l=0;l<r.cornerCount;l++)t.push(`vt ${o[l*2].toFixed(6)} ${o[l*2+1].toFixed(6)}`);const a=new Map;for(let l=0;l<r.faceCount;l++){const h=r.polygroup[l],u=a.get(h);u?u.push(l):a.set(h,[l])}const c=a.size<=1;for(const[l,h]of a){c||t.push(`g group${l}`);for(const u of h){const f=[];for(let d=r.faceOffsets[u];d<r.faceOffsets[u+1];d++){const m=r.faceCorners[d]+e;f.push(o?`${m}/${d+n}`:`${m}`)}t.push(`f ${f.join(" ")}`)}}e+=r.vertexCount,o&&(n+=r.cornerCount)}return t.join(`
`)+`
`}const Qu="MBMESH\0\0",tf=1;function ac(i){return i+3&-4}function u_(i){let t=16;for(const r of i)t+=8+ac(r.data.byteLength);const e=new Uint8Array(t),n=new DataView(e.buffer);for(let r=0;r<8;r++)e[r]=Qu.charCodeAt(r);n.setUint32(8,tf,!0),n.setUint32(12,i.length,!0);let s=16;for(const r of i){for(let o=0;o<4;o++)e[s+o]=r.tag.charCodeAt(o);n.setUint32(s+4,r.data.byteLength,!0),e.set(r.data,s+8),s+=8+ac(r.data.byteLength)}return e}function f_(i){for(let o=0;o<8;o++)if(i[o]!==Qu.charCodeAt(o))throw new Error("メッシュのバイナリ形式ではありません");const t=new DataView(i.buffer,i.byteOffset,i.byteLength),e=t.getUint32(8,!0),n=t.getUint32(12,!0),s=new Map;let r=16;for(let o=0;o<n;o++){let a="";for(let l=0;l<4;l++)a+=String.fromCharCode(i[r+l]);const c=t.getUint32(r+4,!0);s.set(a,i.subarray(r+8,r+8+c)),r+=8+ac(c)}return{version:e,chunks:s}}function vn(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Dr(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Ur(i){return new Uint32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function mh(i){return new Uint16Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}const d_=new TextEncoder,p_=new TextDecoder;function m_(i){const t=[{tag:"POSI",data:vn(i.positions)},{tag:"FOFF",data:vn(i.faceOffsets)},{tag:"FCOR",data:vn(i.faceCorners)}];if(i.polygroup.some(e=>e!==0)&&t.push({tag:"PGRP",data:vn(i.polygroup)}),i.materialId.some(e=>e!==0)&&t.push({tag:"MTID",data:vn(i.materialId)}),i.vertexColor&&t.push({tag:"VCOL",data:vn(i.vertexColor)}),i.crease.size){const e=new Uint32Array(i.crease.size*2),n=new Float32Array(i.crease.size);let s=0;for(const[r,o]of i.crease){const[a,c]=r.split("_").map(Number);e[s*2]=a,e[s*2+1]=c,n[s]=o,s++}t.push({tag:"CRID",data:vn(e)},{tag:"CRSH",data:vn(n)})}if(i.cornerSharp.size){const e=new Uint32Array(i.cornerSharp.size),n=new Float32Array(i.cornerSharp.size);let s=0;for(const[r,o]of i.cornerSharp)e[s]=r,n[s]=o,s++;t.push({tag:"CNID",data:vn(e)},{tag:"CNSH",data:vn(n)})}if(i.uvSets.size){const e=Array.from(i.uvSets.keys());t.push({tag:"UVNM",data:d_.encode(JSON.stringify(e))}),e.forEach((n,s)=>{t.push({tag:`UV${String(s).padStart(2,"0")}`,data:vn(i.uvSets.get(n))})})}return u_(t)}function g_(i){const{version:t,chunks:e}=f_(i);if(t>tf)throw new Error(`このメッシュは新しい版 (v${t}) で保存されています。アプリを更新してください`);const n=Dr(e.get("POSI")),s=Ur(e.get("FOFF")),r=Ur(e.get("FCOR")),o=new Map,a=e.get("UVNM");a&&JSON.parse(p_.decode(a)).forEach((y,_)=>{const w=e.get(`UV${String(_).padStart(2,"0")}`);w&&o.set(y,Dr(w))});const c=new Map,l=e.get("CRID"),h=e.get("CRSH");if(l&&h){const x=Ur(l),y=Dr(h);for(let _=0;_<y.length;_++){const w=x[_*2],S=x[_*2+1];c.set(w<S?`${w}_${S}`:`${S}_${w}`,y[_])}}const u=new Map,f=e.get("CNID"),d=e.get("CNSH");if(f&&d){const x=Ur(f),y=Dr(d);for(let _=0;_<y.length;_++)u.set(x[_],y[_])}const m=Math.max(0,s.length-1),v=e.get("PGRP"),p=e.get("MTID"),g=e.get("VCOL");return new _s(n,s,r,{uvSets:o,crease:c,cornerSharp:u,polygroup:v?mh(v):new Uint16Array(m),materialId:p?mh(p):new Uint16Array(m),vertexColor:g?new Uint8Array(g):null})}var xe=Uint8Array,on=Uint16Array,Lc=Int32Array,lo=new xe([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ho=new xe([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),cc=new xe([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ef=function(i,t){for(var e=new on(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new Lc(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)s[r]=r-e[n]<<5|n;return{b:e,r:s}},nf=ef(lo,2),sf=nf.b,lc=nf.r;sf[28]=258,lc[258]=28;var rf=ef(ho,0),v_=rf.b,gh=rf.r,hc=new on(32768);for(var le=0;le<32768;++le){var fi=(le&43690)>>1|(le&21845)<<1;fi=(fi&52428)>>2|(fi&13107)<<2,fi=(fi&61680)>>4|(fi&3855)<<4,hc[le]=((fi&65280)>>8|(fi&255)<<8)>>1}var kn=(function(i,t,e){for(var n=i.length,s=0,r=new on(t);s<n;++s)i[s]&&++r[i[s]-1];var o=new on(t);for(s=1;s<t;++s)o[s]=o[s-1]+r[s-1]<<1;var a;if(e){a=new on(1<<t);var c=15-t;for(s=0;s<n;++s)if(i[s])for(var l=s<<4|i[s],h=t-i[s],u=o[i[s]-1]++<<h,f=u|(1<<h)-1;u<=f;++u)a[hc[u]>>c]=l}else for(a=new on(n),s=0;s<n;++s)i[s]&&(a[s]=hc[o[i[s]-1]++]>>15-i[s]);return a}),xi=new xe(288);for(var le=0;le<144;++le)xi[le]=8;for(var le=144;le<256;++le)xi[le]=9;for(var le=256;le<280;++le)xi[le]=7;for(var le=280;le<288;++le)xi[le]=8;var qs=new xe(32);for(var le=0;le<32;++le)qs[le]=5;var x_=kn(xi,9,0),__=kn(xi,9,1),M_=kn(qs,5,0),y_=kn(qs,5,1),Qo=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},xn=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},ta=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},Dc=function(i){return(i+7)/8|0},nr=function(i,t,e){return(t==null||t<0)&&(t=0),(e==null||e>i.length)&&(e=i.length),new xe(i.subarray(t,e))},b_=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ke=function(i,t,e){var n=new Error(t||b_[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,ke),!e)throw n;return n},S_=function(i,t,e,n){var s=i.length,r=n?n.length:0;if(!s||t.f&&!t.l)return e||new xe(0);var o=!e,a=o||t.i!=2,c=t.i;o&&(e=new xe(s*3));var l=function(Et){var Qt=e.length;if(Et>Qt){var Ot=new xe(Math.max(Qt*2,Et));Ot.set(e),e=Ot}},h=t.f||0,u=t.p||0,f=t.b||0,d=t.l,m=t.d,v=t.m,p=t.n,g=s*8;do{if(!d){h=xn(i,u,1);var x=xn(i,u+1,3);if(u+=3,x)if(x==1)d=__,m=y_,v=9,p=5;else if(x==2){var S=xn(i,u,31)+257,A=xn(i,u+10,15)+4,M=S+xn(i,u+5,31)+1;u+=14;for(var T=new xe(M),P=new xe(19),R=0;R<A;++R)P[cc[R]]=xn(i,u+R*3,7);u+=A*3;for(var I=Qo(P),V=(1<<I)-1,F=kn(P,I,1),R=0;R<M;){var D=F[xn(i,u,V)];u+=D&15;var y=D>>4;if(y<16)T[R++]=y;else{var B=0,k=0;for(y==16?(k=3+xn(i,u,3),u+=2,B=T[R-1]):y==17?(k=3+xn(i,u,7),u+=3):y==18&&(k=11+xn(i,u,127),u+=7);k--;)T[R++]=B}}var $=T.subarray(0,S),j=T.subarray(S);v=Qo($),p=Qo(j),d=kn($,v,1),m=kn(j,p,1)}else ke(1);else{var y=Dc(u)+4,_=i[y-4]|i[y-3]<<8,w=y+_;if(w>s){c&&ke(0);break}a&&l(f+_),e.set(i.subarray(y,w),f),t.b=f+=_,t.p=u=w*8,t.f=h;continue}if(u>g){c&&ke(0);break}}a&&l(f+131072);for(var it=(1<<v)-1,tt=(1<<p)-1,ot=u;;ot=u){var B=d[ta(i,u)&it],St=B>>4;if(u+=B&15,u>g){c&&ke(0);break}if(B||ke(2),St<256)e[f++]=St;else if(St==256){ot=u,d=null;break}else{var Ft=St-254;if(St>264){var R=St-257,wt=lo[R];Ft=xn(i,u,(1<<wt)-1)+sf[R],u+=wt}var q=m[ta(i,u)&tt],st=q>>4;q||ke(3),u+=q&15;var j=v_[st];if(st>3){var wt=ho[st];j+=ta(i,u)&(1<<wt)-1,u+=wt}if(u>g){c&&ke(0);break}a&&l(f+131072);var nt=f+Ft;if(f<j){var yt=r-j,Ut=Math.min(j,nt);for(yt+f<0&&ke(3);f<Ut;++f)e[f]=n[yt+f]}for(;f<nt;++f)e[f]=e[f-j]}}t.l=d,t.p=ot,t.b=f,t.f=h,d&&(h=1,t.m=v,t.d=m,t.n=p)}while(!h);return f!=e.length&&o?nr(e,0,f):e.subarray(0,f)},qn=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8},Ps=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8,i[n+2]|=e>>16},ea=function(i,t){for(var e=[],n=0;n<i.length;++n)i[n]&&e.push({s:n,f:i[n]});var s=e.length,r=e.slice();if(!s)return{t:af,l:0};if(s==1){var o=new xe(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(w,S){return w.f-S.f}),e.push({s:-1,f:25001});var a=e[0],c=e[1],l=0,h=1,u=2;for(e[0]={s:-1,f:a.f+c.f,l:a,r:c};h!=s-1;)a=e[e[l].f<e[u].f?l++:u++],c=e[l!=h&&e[l].f<e[u].f?l++:u++],e[h++]={s:-1,f:a.f+c.f,l:a,r:c};for(var f=r[0].s,n=1;n<s;++n)r[n].s>f&&(f=r[n].s);var d=new on(f+1),m=uc(e[h-1],d,0);if(m>t){var n=0,v=0,p=m-t,g=1<<p;for(r.sort(function(S,A){return d[A.s]-d[S.s]||S.f-A.f});n<s;++n){var x=r[n].s;if(d[x]>t)v+=g-(1<<m-d[x]),d[x]=t;else break}for(v>>=p;v>0;){var y=r[n].s;d[y]<t?v-=1<<t-d[y]++-1:++n}for(;n>=0&&v;--n){var _=r[n].s;d[_]==t&&(--d[_],++v)}m=t}return{t:new xe(d),l:m}},uc=function(i,t,e){return i.s==-1?Math.max(uc(i.l,t,e+1),uc(i.r,t,e+1)):t[i.s]=e},vh=function(i){for(var t=i.length;t&&!i[--t];);for(var e=new on(++t),n=0,s=i[0],r=1,o=function(c){e[n++]=c},a=1;a<=t;++a)if(i[a]==s&&a!=t)++r;else{if(!s&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(s),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(s);r=1,s=i[a]}return{c:e.subarray(0,n),n:t}},Is=function(i,t){for(var e=0,n=0;n<t.length;++n)e+=i[n]*t[n];return e},of=function(i,t,e){var n=e.length,s=Dc(t+2);i[s]=n&255,i[s+1]=n>>8,i[s+2]=i[s]^255,i[s+3]=i[s+1]^255;for(var r=0;r<n;++r)i[s+r+4]=e[r];return(s+4+n)*8},xh=function(i,t,e,n,s,r,o,a,c,l,h){qn(t,h++,e),++s[256];for(var u=ea(s,15),f=u.t,d=u.l,m=ea(r,15),v=m.t,p=m.l,g=vh(f),x=g.c,y=g.n,_=vh(v),w=_.c,S=_.n,A=new on(19),M=0;M<x.length;++M)++A[x[M]&31];for(var M=0;M<w.length;++M)++A[w[M]&31];for(var T=ea(A,7),P=T.t,R=T.l,I=19;I>4&&!P[cc[I-1]];--I);var V=l+5<<3,F=Is(s,xi)+Is(r,qs)+o,D=Is(s,f)+Is(r,v)+o+14+3*I+Is(A,P)+2*A[16]+3*A[17]+7*A[18];if(c>=0&&V<=F&&V<=D)return of(t,h,i.subarray(c,c+l));var B,k,$,j;if(qn(t,h,1+(D<F)),h+=2,D<F){B=kn(f,d,0),k=f,$=kn(v,p,0),j=v;var it=kn(P,R,0);qn(t,h,y-257),qn(t,h+5,S-1),qn(t,h+10,I-4),h+=14;for(var M=0;M<I;++M)qn(t,h+3*M,P[cc[M]]);h+=3*I;for(var tt=[x,w],ot=0;ot<2;++ot)for(var St=tt[ot],M=0;M<St.length;++M){var Ft=St[M]&31;qn(t,h,it[Ft]),h+=P[Ft],Ft>15&&(qn(t,h,St[M]>>5&127),h+=St[M]>>12)}}else B=x_,k=xi,$=M_,j=qs;for(var M=0;M<a;++M){var wt=n[M];if(wt>255){var Ft=wt>>18&31;Ps(t,h,B[Ft+257]),h+=k[Ft+257],Ft>7&&(qn(t,h,wt>>23&31),h+=lo[Ft]);var q=wt&31;Ps(t,h,$[q]),h+=j[q],q>3&&(Ps(t,h,wt>>5&8191),h+=ho[q])}else Ps(t,h,B[wt]),h+=k[wt]}return Ps(t,h,B[256]),h+k[256]},w_=new Lc([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),af=new xe(0),E_=function(i,t,e,n,s,r){var o=r.z||i.length,a=new xe(n+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(n,a.length-s),l=r.l,h=(r.r||0)&7;if(t){h&&(c[0]=r.r>>3);for(var u=w_[t-1],f=u>>13,d=u&8191,m=(1<<e)-1,v=r.p||new on(32768),p=r.h||new on(m+1),g=Math.ceil(e/3),x=2*g,y=function(Kt){return(i[Kt]^i[Kt+1]<<g^i[Kt+2]<<x)&m},_=new Lc(25e3),w=new on(288),S=new on(32),A=0,M=0,T=r.i||0,P=0,R=r.w||0,I=0;T+2<o;++T){var V=y(T),F=T&32767,D=p[V];if(v[F]=D,p[V]=F,R<=T){var B=o-T;if((A>7e3||P>24576)&&(B>423||!l)){h=xh(i,c,0,_,w,S,M,P,I,T-I,h),P=A=M=0,I=T;for(var k=0;k<286;++k)w[k]=0;for(var k=0;k<30;++k)S[k]=0}var $=2,j=0,it=d,tt=F-D&32767;if(B>2&&V==y(T-tt))for(var ot=Math.min(f,B)-1,St=Math.min(32767,T),Ft=Math.min(258,B);tt<=St&&--it&&F!=D;){if(i[T+$]==i[T+$-tt]){for(var wt=0;wt<Ft&&i[T+wt]==i[T+wt-tt];++wt);if(wt>$){if($=wt,j=tt,wt>ot)break;for(var q=Math.min(tt,wt-2),st=0,k=0;k<q;++k){var nt=T-tt+k&32767,yt=v[nt],Ut=nt-yt&32767;Ut>st&&(st=Ut,D=nt)}}}F=D,D=v[F],tt+=F-D&32767}if(j){_[P++]=268435456|lc[$]<<18|gh[j];var Et=lc[$]&31,Qt=gh[j]&31;M+=lo[Et]+ho[Qt],++w[257+Et],++S[Qt],R=T+$,++A}else _[P++]=i[T],++w[i[T]]}}for(T=Math.max(T,R);T<o;++T)_[P++]=i[T],++w[i[T]];h=xh(i,c,l,_,w,S,M,P,I,T-I,h),l||(r.r=h&7|c[h/8|0]<<3,h-=7,r.h=p,r.p=v,r.i=T,r.w=R)}else{for(var T=r.w||0;T<o+l;T+=65535){var Ot=T+65535;Ot>=o&&(c[h/8|0]=l,Ot=o),h=of(c,h+1,i.subarray(T,Ot))}r.i=o}return nr(a,0,n+Dc(h)+s)},T_=(function(){for(var i=new Int32Array(256),t=0;t<256;++t){for(var e=t,n=9;--n;)e=(e&1&&-306674912)^e>>>1;i[t]=e}return i})(),A_=function(){var i=-1;return{p:function(t){for(var e=i,n=0;n<t.length;++n)e=T_[e&255^t[n]]^e>>>8;i=e},d:function(){return~i}}},C_=function(i,t,e,n,s){if(!s&&(s={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),o=new xe(r.length+i.length);o.set(r),o.set(i,r.length),i=o,s.w=r.length}return E_(i,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+t.mem,e,n,s)},cf=function(i,t){var e={};for(var n in i)e[n]=i[n];for(var n in t)e[n]=t[n];return e},Ln=function(i,t){return i[t]|i[t+1]<<8},un=function(i,t){return(i[t]|i[t+1]<<8|i[t+2]<<16|i[t+3]<<24)>>>0},na=function(i,t){return un(i,t)+un(i,t+4)*4294967296},Ie=function(i,t,e){for(;e;++t)i[t]=e,e>>>=8};function R_(i,t){return C_(i,t||{},0,0)}function P_(i,t){return S_(i,{i:2},t&&t.out,t&&t.dictionary)}var lf=function(i,t,e,n){for(var s in i){var r=i[s],o=t+s,a=n;Array.isArray(r)&&(a=cf(n,r[1]),r=r[0]),ArrayBuffer.isView(r)?e[o]=[r,a]:(e[o+="/"]=[new xe(0),a],lf(r,o,e,n))}},_h=typeof TextEncoder<"u"&&new TextEncoder,fc=typeof TextDecoder<"u"&&new TextDecoder,I_=0;try{fc.decode(af,{stream:!0}),I_=1}catch{}var L_=function(i){for(var t="",e=0;;){var n=i[e++],s=(n>127)+(n>223)+(n>239);if(e+s>i.length)return{s:t,r:nr(i,e-1)};s?s==3?(n=((n&15)<<18|(i[e++]&63)<<12|(i[e++]&63)<<6|i[e++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):s&1?t+=String.fromCharCode((n&31)<<6|i[e++]&63):t+=String.fromCharCode((n&15)<<12|(i[e++]&63)<<6|i[e++]&63):t+=String.fromCharCode(n)}};function Mh(i,t){var e;if(_h)return _h.encode(i);for(var n=i.length,s=new xe(i.length+(i.length>>1)),r=0,o=function(l){s[r++]=l},e=0;e<n;++e){if(r+5>s.length){var a=new xe(r+8+(n-e<<1));a.set(s),s=a}var c=i.charCodeAt(e);c<128||t?o(c):c<2048?(o(192|c>>6),o(128|c&63)):c>55295&&c<57344?(c=65536+(c&1047552)|i.charCodeAt(++e)&1023,o(240|c>>18),o(128|c>>12&63),o(128|c>>6&63),o(128|c&63)):(o(224|c>>12),o(128|c>>6&63),o(128|c&63))}return nr(s,0,r)}function D_(i,t){if(t){for(var e="",n=0;n<i.length;n+=16384)e+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return e}else{if(fc)return fc.decode(i);var s=L_(i),r=s.s,e=s.r;return e.length&&ke(8),r}}var U_=function(i,t){return t+30+Ln(i,t+26)+Ln(i,t+28)},N_=function(i,t,e){var n=Ln(i,t+28),s=Ln(i,t+30),r=D_(i.subarray(t+46,t+46+n),!(Ln(i,t+8)&2048)),o=t+46+n,a=F_(i,o,s,e,un(i,t+20),un(i,t+24),un(i,t+42)),c=a[0],l=a[1],h=a[2];return[Ln(i,t+10),c,l,r,o+s+Ln(i,t+32),h]},F_=function(i,t,e,n,s,r,o){var a=s==4294967295,c=r==4294967295,l=o==4294967295,h=t+e,u=a+c+l;if(n&&u){for(;t+4<h;t+=4+Ln(i,t+2))if(Ln(i,t)==1)return[a?na(i,t+4+8*c):s,c?na(i,t+4):r,l?na(i,t+4+8*(c+a)):o,1];n<2&&ke(13)}return[s,r,o,0]},dc=function(i){var t=0;if(i)for(var e in i){var n=i[e].length;n>65535&&ke(9),t+=n+4}return t},yh=function(i,t,e,n,s,r,o,a){var c=n.length,l=e.extra,h=a&&a.length,u=dc(l);Ie(i,t,o!=null?33639248:67324752),t+=4,o!=null&&(i[t++]=20,i[t++]=e.os),i[t]=20,t+=2,i[t++]=e.flag<<1|(r<0&&8),i[t++]=s&&8,i[t++]=e.compression&255,i[t++]=e.compression>>8;var f=new Date(e.mtime==null?Date.now():e.mtime),d=f.getFullYear()-1980;if((d<0||d>119)&&ke(10),Ie(i,t,d<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),t+=4,r!=-1&&(Ie(i,t,e.crc),Ie(i,t+4,r<0?-r-2:r),Ie(i,t+8,e.size)),Ie(i,t+12,c),Ie(i,t+14,u),t+=16,o!=null&&(Ie(i,t,h),Ie(i,t+6,e.attrs),Ie(i,t+10,o),t+=14),i.set(n,t),t+=c,u)for(var m in l){var v=l[m],p=v.length;Ie(i,t,+m),Ie(i,t+2,p),i.set(v,t+4),t+=4+p}return h&&(i.set(a,t),t+=h),t},O_=function(i,t,e,n,s){Ie(i,t,101010256),Ie(i,t+8,e),Ie(i,t+10,e),Ie(i,t+12,n),Ie(i,t+16,s)};function k_(i,t){t||(t={});var e={},n=[];lf(i,"",e,t);var s=0,r=0;for(var o in e){var a=e[o],c=a[0],l=a[1],h=l.level==0?0:8,u=Mh(o),f=u.length,d=l.comment,m=d&&Mh(d),v=m&&m.length,p=dc(l.extra);f>65535&&ke(11);var g=h?R_(c,l):c,x=g.length,y=A_();y.p(c),n.push(cf(l,{size:c.length,crc:y.d(),c:g,f:u,m,u:f!=o.length||m&&d.length!=v,o:s,compression:h})),s+=30+f+p+x,r+=76+2*(f+p)+(v||0)+x}for(var _=new xe(r+22),w=s,S=r-s,A=0;A<n.length;++A){var u=n[A];yh(_,u.o,u,u.f,u.u,u.c.length);var M=30+u.f.length+dc(u.extra);_.set(u.c,u.o+M),yh(_,s,u,u.f,u.u,u.c.length,u.o,u.m),s+=16+M+(u.m?u.m.length:0)}return O_(_,s,n.length,S,w),_}function B_(i,t){for(var e={},n=i.length-22;un(i,n)!=101010256;--n)(!n||i.length-n>65558)&&ke(13);var s=Ln(i,n+8);if(!s)return{};var r=un(i,n+16),o=un(i,n-20)==117853008;if(o){var a=un(i,n-12);o=un(i,a)==101075792,o&&(s=un(i,a+32),r=un(i,a+48))}for(var c=0;c<s;++c){var l=N_(i,r,o),h=l[0],u=l[1],f=l[2],d=l[3],m=l[4],v=l[5],p=U_(i,v);r=m,h?h==8?e[d]=P_(i.subarray(p,p+u),{out:new xe(f)}):ke(14,"unknown compression type "+h):e[d]=nr(i,p,p+u)}return e}const io=1,bh=new TextEncoder,Sh=new TextDecoder;function wh(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Eh(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function z_(i,t={}){const e={},n=new Date().toISOString(),s={objects:i.objects.map(o=>{e[`meshes/${o.id}.bin`]=m_(o.mesh);for(const a of o.multires)e[`multires/${o.id}/L${a.level}.bin`]=wh(a.delta);for(const a of o.sculptLayers)e[`layers/${o.id}/${a.id}.bin`]=wh(a.delta);return{id:o.id,name:o.name,kind:o.kind,parametric:o.parametric,params:o.params,transform:o.transform,visible:o.visible,activeLevel:o.activeLevel,exportedTopologyHash:o.exportedTopologyHash,multires:o.multires.map(a=>({level:a.level,count:a.delta.length})),sculptLayers:o.sculptLayers.map(a=>({id:a.id,name:a.name,level:a.level,weight:a.weight,visible:a.visible,count:a.delta.length})),paintLayers:o.paintLayers,uv:o.uv?jx(o.uv):null}}),settings:i.settings,cameraBookmarks:i.cameraBookmarks},r={formatVersion:io,app:"macbeth",appVersion:t.appVersion??"0.1.0",created:n,modified:n};if(t.thumbnail&&(e["thumbnail.png"]=t.thumbnail,r.thumbnail="thumbnail.png"),t.extraFiles)for(const[o,a]of t.extraFiles)e[o]=a;return e["manifest.json"]=bh.encode(JSON.stringify(r,null,2)),e["scene.json"]=bh.encode(JSON.stringify(s)),k_(e,{level:6})}const V_={};function H_(i,t,e){let n=i;for(let s=e;s<io;s++){const r=V_[s];if(!r)throw new Error(`版 ${s} から ${s+1} への変換がありません`);n=r(n,t)}return n}function G_(i){const t=B_(i),e=t["manifest.json"];if(!e)throw new Error("manifest.json がありません。macbeth のプロジェクトではないようです");const n=JSON.parse(Sh.decode(e));if(n.formatVersion>io)throw new Error(`このプロジェクトは新しい版 (v${n.formatVersion}) で保存されています。アプリを更新してください`);let s=JSON.parse(Sh.decode(t["scene.json"]));n.formatVersion<io&&(s=H_(s,t,n.formatVersion));const r=new Ju;r.settings=s.settings??{},r.cameraBookmarks=s.cameraBookmarks??[];const o=new Set(["manifest.json","scene.json"]);for(const c of s.objects){const l=new oc(c.kind,c.id,c.name);l.parametric=c.parametric,l.params=c.params,l.transform=c.transform??ju(),l.visible=c.visible??!0,l.activeLevel=c.activeLevel??0,l.exportedTopologyHash=c.exportedTopologyHash??null;const h=`meshes/${c.id}.bin`,u=t[h];if(!u)throw new Error(`${c.name} のメッシュ (${h}) がありません`);l.mesh=g_(u),o.add(h),l.multires=(c.multires??[]).map(f=>{const d=`multires/${c.id}/L${f.level}.bin`,m=t[d];return m?(o.add(d),{level:f.level,delta:Eh(m)}):null}).filter(f=>f!==null),l.sculptLayers=(c.sculptLayers??[]).map(f=>{const d=`layers/${c.id}/${f.id}.bin`,m=t[d];return m?(o.add(d),{id:f.id,name:f.name,level:f.level,weight:f.weight,visible:f.visible,delta:Eh(m)}):null}).filter(f=>f!==null),l.paintLayers=c.paintLayers??[],l.uv=Jx(c.uv),r.objects.push(l)}r.syncIdCounter();const a=new Map;for(const[c,l]of Object.entries(t))o.has(c)||a.set(c,l);return{document:r,manifest:n,extraFiles:a}}function xy(i,t){return Zu(i.mesh)===t}function Nr(i){let t=0,e=0;for(const o of i.values())t+=o.x,e+=o.y;const n=i.size||1;t/=n,e/=n;let s=0;const r=new Map;for(const[o,a]of i)s+=Math.hypot(a.x-t,a.y-e),r.set(o,Math.atan2(a.y-e,a.x-t));return{cx:t,cy:e,spread:s/n,angles:r}}function W_(i,t){let e=0,n=0;for(const[s,r]of t.angles){const o=i.angles.get(s);if(o===void 0)continue;let a=r-o;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;e+=a,n++}return n?e/n:0}function hf(i,t){return Math.abs(t.spread-i.spread)*2}function X_(i,t){const e=Math.abs(W_(i,t))*t.spread;return Math.hypot(t.cx-i.cx,t.cy-i.cy)+hf(i,t)+e}const $_=5,ia=10,Uc=12,q_=120,Nc=300,Y_=400,K_=400,ds=3;class uf{constructor(t,e,n){this.canvas=t,this.local=e,this.h=n}pointers=new Map;gesture=null;holdTimer=null;tap={t0:0,maxN:0,moved:!1,stagger:!1,lastN:0,lastT:0};fHeld=!1;fChord=!1;fingerCam=!1;attach(){const t=this.canvas;t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("touchmove",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>this.down(e)),t.addEventListener("pointermove",e=>this.move(e)),t.addEventListener("pointerup",e=>this.up(e)),t.addEventListener("pointercancel",e=>this.cancelled(e)),t.addEventListener("pointerleave",()=>{this.pointers.size||this.h.hoverLeave()}),t.addEventListener("wheel",e=>{e.preventDefault(),this.h.dolly(1+Math.sign(e.deltaY)*.09)},{passive:!1})}touchCount(){let t=0;for(const e of this.pointers.values())e.type==="touch"&&t++;return t}down(t){try{this.canvas.setPointerCapture(t.pointerId)}catch{}if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,x0:t.clientX,y0:t.clientY,type:t.pointerType}),this.tapDown(t),this.pointers.size>=2){if(this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.h.abort(),this.cancelHold(),this.pointers.size===3&&this.touchCount()===3){const n=Nr(this.pointers);this.gesture={mode:"threefinger",live:!1,acc:0,basis:n,last:n},this.startHold(3,()=>this.h.openCameraMenu(n.cx,n.cy));return}if(this.pointers.size===2){const n=Nr(this.pointers);this.gesture={mode:"twofinger",live:!1,acc:0,last:n},this.touchCount()===2&&this.startHold(2,()=>this.h.openTwoFingerMenu(n.cx,n.cy)),this.fHeld&&(this.fChord=!0,this.gesture.zoomOnly=!0,this.gesture.pivot=this.h.zoomPivot()??void 0)}else this.gesture={mode:"idle"};return}const e=this.local(t);if(this.fHeld){this.fChord=!0,this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},this.h.marqueeStart(e);return}if(t.pointerType==="mouse"){if(this.h.altOn(t)){this.gesture={mode:t.button===0?"tumble":t.button===1?"pan":"dolly"};return}if(t.button===2){this.h.openMarkingMenu(t.clientX,t.clientY,this.h.shiftOn(t)),this.gesture={mode:"marking"};return}if(t.button===1){this.gesture={mode:"pan"};return}}if(t.pointerType==="touch"&&!(!this.fingerCam&&this.h.isOnMesh(e,t))){this.gesture={mode:"tumble",live:!1,acc:0},this.startMarkingHold(t);return}this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},t.pointerType!=="mouse"&&this.startMarkingHold(t),this.h.toolDown(e,t)}move(t){const e=this.pointers.get(t.pointerId);if(!e){t.buttons===0&&!this.pointers.size&&this.h.hover(this.local(t),t);return}const n=e.x,s=e.y;e.x=t.clientX,e.y=t.clientY,Math.hypot(t.clientX-e.x0,t.clientY-e.y0)>Uc&&(this.tap.moved=!0,this.cancelHold());const r=this.gesture;if(r){if(r.mode==="tumble"){if(!r.live&&t.pointerType==="touch"){if(r.acc=(r.acc??0)+Math.hypot(t.clientX-n,t.clientY-s),r.acc<$_)return;r.live=!0}this.h.tumble(t.clientX-n,t.clientY-s);return}if(r.mode==="pan")return this.h.pan(t.clientX-n,t.clientY-s);if(r.mode==="dolly")return this.h.dolly(1+(t.clientX-n+(t.clientY-s))*.006);if(r.mode==="twofinger"){if(this.pointers.size<2)return;const o=Nr(this.pointers),a=r.last??o;if(!r.live){if(r.acc=(r.acc??0)+X_(a,o),r.last=o,r.acc<ia)return;r.live=!0,this.tap.moved=!0,this.cancelHold();return}const c=a.spread>1e-6&&o.spread>1e-6?a.spread/o.spread:1;r.zoomOnly&&r.pivot?this.h.dollyAbout(r.pivot,c):(this.h.dolly(c),this.h.pan(o.cx-a.cx,o.cy-a.cy)),r.last=o;return}if(r.mode==="threefinger"){if(this.pointers.size!==3)return;const o=Nr(this.pointers),a=r.basis??o;if(!r.live){const l=r.fresh??=new Set;if(l.add(t.pointerId),l.size<this.pointers.size)return;l.clear(),r.last=o;const h=hf(a,o),u=o.cx-a.cx,f=o.cy-a.cy,d=Math.hypot(u,f);if(h<ia&&d<ia)return;if(!this.h.transformBegin()){this.gesture={mode:"idle"};return}r.live=!0,this.tap.moved=!0,this.cancelHold(),r.delta=h>=d?{kind:"scale"}:{kind:"swipe",axis:Math.abs(f)>=Math.abs(u)?"vertical":"horizontal"},r.basis=o;return}const c=r.delta??{kind:"scale"};c.kind==="scale"?this.h.transformUpdate({kind:"scale",scale:a.spread>1e-6?o.spread/a.spread:1}):this.h.transformUpdate({kind:"swipe",axis:c.axis,pixels:c.axis==="vertical"?o.cy-a.cy:o.cx-a.cx});return}if(r.mode==="tool"){const o=this.local(t);(Math.abs(o.x-(r.sx??0))>ds||Math.abs(o.y-(r.sy??0))>ds)&&(r.moved=!0),this.h.toolMove(o,t)}}}up(t){this.cancelHold();const e=this.gesture;e?.mode==="threefinger"&&e.live&&this.h.transformEnd();const n=e?.mode==="tool",s=n&&!!e?.moved;this.pointers.delete(t.pointerId),n&&this.h.toolUp(this.local(t),t,s),this.pointers.size===0?(this.gesture=null,this.tapUp(t)):this.gesture={mode:"idle"}}cancelled(t){this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.pointers.delete(t.pointerId),this.cancelHold(),this.h.abort(),this.pointers.size?this.gesture={mode:"idle"}:(this.gesture=null,this.tap.lastN=0)}tapDown(t){if(t.pointerType!=="touch")return;const e=performance.now(),n=this.touchCount();n===1?(this.tap.t0=e,this.tap.maxN=1,this.tap.moved=!1,this.tap.stagger=!1):(this.tap.maxN=Math.max(this.tap.maxN,n),e-this.tap.t0>q_&&(this.tap.stagger=!0))}tapUp(t){if(t.pointerType!=="touch")return;const e=performance.now();if(!(!this.tap.moved&&!this.tap.stagger&&e-this.tap.t0<Nc&&this.tap.maxN>=2)){this.tap.lastN=0;return}this.tap.lastN===this.tap.maxN&&e-this.tap.lastT<Y_?(this.tap.lastN=0,this.tap.maxN===2?this.h.undo():this.h.redo(),navigator.vibrate?.(8)):(this.tap.lastN=this.tap.maxN,this.tap.lastT=e)}startMarkingHold(t){const e=this.h.shiftOn(t),{clientX:n,clientY:s}=t;this.startHold(1,()=>this.h.openMarkingMenu(n,s,e))}startHold(t,e){this.cancelHold(),this.holdTimer=setTimeout(()=>{this.pointers.size===t&&(this.h.abort(),this.gesture=null,e())},K_)}cancelHold(){this.holdTimer!==null&&clearTimeout(this.holdTimer),this.holdTimer=null}}const Th=new Tu,Z_=new L;class j_{constructor(t,e){this.viewport=t,this.container=e}get width(){return this.container.clientWidth||1}get height(){return this.container.clientHeight||1}local(t){const e=this.container.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}ndc(t){return new Xt(t.x/this.width*2-1,-(t.y/this.height*2-1))}project(t,e,n,s){t.group.updateMatrixWorld();const r=Z_.set(e,n,s).applyMatrix4(t.group.matrixWorld).project(this.viewport.camera);return{x:(r.x+1)/2*this.width,y:(-r.y+1)/2*this.height,z:r.z}}projectVertex(t,e){const n=t.object.mesh.positions;return this.project(t,n[e*3],n[e*3+1],n[e*3+2])}pickSurface(t,e){Th.setFromCamera(this.ndc(t),this.viewport.camera);const n=this.viewport.allViews().filter(l=>l.object.visible&&(!e||l.object!==e)),r=Th.intersectObjects(n.map(l=>l.surface),!1)[0];if(!r)return null;const o=n.find(l=>l.surface===r.object);if(!o)return null;const a=r.faceIndex??0,c=o.tri.triToFace[a]??0;return{object:o.object,view:o,face:c,point:r.point.clone(),distance:r.distance}}pickVertex(t,e,n){let s=-1,r=n*n;const o=t.object.mesh.vertexCount;for(let a=0;a<o;a++){const c=this.projectVertex(t,a);if(c.z>1)continue;const l=(c.x-e.x)**2+(c.y-e.y)**2;l<r&&(r=l,s=a)}return s}pickVertexExcept(t,e,n,s){let r=-1,o=n*n;const a=t.object.mesh.vertexCount;for(let c=0;c<a;c++){if(c===s)continue;const l=this.projectVertex(t,c);if(l.z>1)continue;const h=(l.x-e.x)**2+(l.y-e.y)**2;h<o&&(o=h,r=c)}return r}pickEdge(t,e,n){let s=-1,r=n,o=.5;for(let a=0;a<t.edges.length;a++){const[c,l]=t.edges[a],h=this.projectVertex(t,c),u=this.projectVertex(t,l);if(h.z>1&&u.z>1)continue;const f=u.x-h.x,d=u.y-h.y,m=f*f+d*d,v=m?Math.max(0,Math.min(1,((e.x-h.x)*f+(e.y-h.y)*d)/m)):0,p=Math.hypot(h.x+f*v-e.x,h.y+d*v-e.y);p<r&&(r=p,s=a,o=v)}return{edge:s,t:o}}vertsInRect(t,e,n,s,r){const o={x:Math.min(e,s),y:Math.min(n,r)},a={x:Math.max(e,s),y:Math.max(n,r)},c=[],l=t.object.mesh.vertexCount;for(let h=0;h<l;h++){const u=this.projectVertex(t,h);u.z<=1&&u.x>=o.x&&u.x<=a.x&&u.y>=o.y&&u.y<=a.y&&c.push(h)}return c}}const J_=[14176847,7129418,5214176];let Ls=null;function Q_(){if(!Ls){const e=document.createElement("canvas");e.width=512,e.height=512;const n=e.getContext("2d"),s=512/16;for(let r=0;r<16;r++)for(let o=0;o<16;o++)n.fillStyle=(o+r)%2===0?"#d7dde3":"#7d8891",n.fillRect(o*s,r*s,s,s);n.fillStyle="#e0723c",n.fillRect(0,512-s,s,s),Ls=new Mu(e),Ls.wrapS=Ni,Ls.wrapT=Ni}return new Su({map:Ls,specular:1712166,shininess:14,side:Ge})}const Ye={surf:new Su({color:10134701,specular:2765112,shininess:24,side:Ge}),wire:new ye({color:1317407,transparent:!0,opacity:.9}),wireSel:new ye({color:5111629}),wireComp:new ye({color:4608605}),vert:new rn({color:9134e3,size:6,sizeAttenuation:!1}),vertSel:new rn({color:16752128,size:11,sizeAttenuation:!1}),edgeSel:new ye({color:16752128}),faceSel:new bn({color:16752128,transparent:!0,opacity:.5,side:Ge,depthWrite:!1}),softPt:new rn({color:13658666,size:7,sizeAttenuation:!1}),seam:new ye({color:16739146}),cutLine:new ye({color:16769354}),cutPt:new rn({color:16769354,size:9,sizeAttenuation:!1}),pivot:new ye({color:15915386})};function ff(i,t,e){const n=i.faceNormals(),s=i.vertexFaces(),r=Math.cos(e*Math.PI/180)-1e-4,o=t.tri.length,a=new Float32Array(o*3),c=new Float32Array(o*3);for(let u=0;u<o;u+=3){const f=t.triToFace[u/3],d=n[f*3],m=n[f*3+1],v=n[f*3+2];for(let p=0;p<3;p++){const g=t.tri[u+p],x=(u+p)*3;a[x]=i.positions[g*3],a[x+1]=i.positions[g*3+1],a[x+2]=i.positions[g*3+2];let y=0,_=0,w=0;for(const A of s.get(g)??[]){const M=n[A*3],T=n[A*3+1],P=n[A*3+2];M*d+T*m+P*v>=r&&(y+=M,_+=T,w+=P)}const S=Math.hypot(y,_,w)||1;c[x]=y/S,c[x+1]=_/S,c[x+2]=w/S}}const l=new he;l.setAttribute("position",new Jt(a,3)),l.setAttribute("normal",new Jt(c,3));const h=i.uvSets.get("map1");if(h){const u=new Float32Array(o*2);let f=-1,d=0;for(let m=0;m<o;m+=3){const v=t.triToFace[m/3];v!==f&&(f=v,d=0);const p=[0,d+1,d+2];for(let g=0;g<3;g++){const x=i.faceOffsets[v]+p[g];u[(m+g)*2]=h[x*2]??0,u[(m+g)*2+1]=h[x*2+1]??0}d++}l.setAttribute("uv",new Jt(u,2))}return l}function df(i,t){const e=new Float32Array(t.length*6);for(let s=0;s<t.length;s++){const[r,o]=t[s];e[s*6]=i.positions[r*3],e[s*6+1]=i.positions[r*3+1],e[s*6+2]=i.positions[r*3+2],e[s*6+3]=i.positions[o*3],e[s*6+4]=i.positions[o*3+1],e[s*6+5]=i.positions[o*3+2]}const n=new he;return n.setAttribute("position",new Jt(e,3)),n}function Ke(i){const t=new he;return t.setAttribute("position",new Jt(Float32Array.from(i),3)),t}function nn(i,t){return i.position.set(t.position[0],t.position[1],t.position[2]),i.quaternion.set(t.rotation[0],t.rotation[1],t.rotation[2],t.rotation[3]),i.scale.set(t.scale[0],t.scale[1],t.scale[2]),i}function tM(i,t){const e=new _n;nn(e,i.transform);const n=i.mesh.triangulate(),s=i.mesh.edges(),r=new be(ff(i.mesh,n,t),Ye.surf);r.userData.objectId=i.id,e.add(r);const o=new In(df(i.mesh,s),Ye.wire);e.add(o);const a=new dn(Ke(i.mesh.positions),Ye.vert);return e.add(a),e.updateMatrixWorld(),{object:i,group:e,surface:r,wire:o,points:a,tri:n,edges:s}}function ps(i){i.traverse(t=>{const e=t.geometry;e&&e.dispose()})}const zs={persp:{label:"パース",sub:"Persp",theta:.72,phi:1.12,ortho:!1},top:{label:"上",sub:"Top",theta:0,phi:.001,ortho:!0},bottom:{label:"下",sub:"Bottom",theta:0,phi:Math.PI-.001,ortho:!0},front:{label:"前",sub:"Front",theta:0,phi:Math.PI/2,ortho:!0},back:{label:"後",sub:"Back",theta:Math.PI,phi:Math.PI/2,ortho:!0},right:{label:"右",sub:"Right",theta:Math.PI/2,phi:Math.PI/2,ortho:!0},left:{label:"左",sub:"Left",theta:-Math.PI/2,phi:Math.PI/2,ortho:!0}},Ah=.3,Ch=140;class eM{constructor(t,e,n){this.container=t,this.state=n,this.renderer=new Fu({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene.add(this.root,this.overlay,this.manip,this.preview,this.preselect),this.addLights(),this.addGrid(),this.applyCamera()}renderer;scene=new Qa;persp=new fn(45,1,.05,500);ortho=new tr(-1,1,1,-1,.05,500);camera=this.persp;root=new _n;overlay=new _n;manip=new _n;preview=new _n;preselect=new _n;cam={target:new L(0,.4,0),theta:.72,phi:1.12,distance:7.2};views=new Map;frame=0;addLights(){this.scene.add(new zd(12371921,3356733,.85));const t=new Pl(16777215,.72);t.position.set(3,6,4);const e=new Pl(10466502,.28);e.position.set(-4,2,-3),this.scene.add(t,e)}addGrid(){const t=new Xd(24,24,7174272,4936796),e=t.material;e.transparent=!0,e.opacity=.55,this.scene.add(t);const n=(s,r)=>{const o=new he;o.setAttribute("position",new Jt(s,3)),this.scene.add(new Js(o,new ye({color:r})))};n([-12,0,0,12,0,0],12610154),n([0,0,-12,0,0,12],6982336)}applyCamera(){const{cam:t}=this,e=Math.sin(t.phi),n=t.target.x+t.distance*e*Math.sin(t.theta),s=t.target.y+t.distance*Math.cos(t.phi),r=t.target.z+t.distance*e*Math.cos(t.theta),o=this.state.camOpts;this.persp.position.set(n,s,r),this.persp.lookAt(t.target),this.persp.near=o.near,this.persp.far=o.far,this.persp.setFocalLength(o.focal),this.ortho.position.set(n,s,r),this.ortho.lookAt(t.target);const a=(this.container.clientWidth||1)/(this.container.clientHeight||1),c=t.distance*.42;this.ortho.left=-c*a,this.ortho.right=c*a,this.ortho.top=c,this.ortho.bottom=-c,this.ortho.near=o.near,this.ortho.far=o.far,this.ortho.updateProjectionMatrix(),this.camera=o.ortho?this.ortho:this.persp}setView(t){const e=zs[t];this.cam.theta=e.theta,this.cam.phi=e.phi,this.state.camOpts.ortho=e.ortho,this.applyCamera()}tumble(t,e){this.cam.theta-=t*.0088,this.cam.phi=Math.max(.05,Math.min(Math.PI-.05,this.cam.phi-e*.0088)),this.applyCamera()}pan(t,e){const n=new L().setFromMatrixColumn(this.camera.matrix,0),s=new L().setFromMatrixColumn(this.camera.matrix,1),r=this.cam.distance*.0016;this.cam.target.addScaledVector(n,-t*r).addScaledVector(s,e*r),this.applyCamera()}dolly(t){this.cam.distance=Math.max(Ah,Math.min(Ch,this.cam.distance*t)),this.applyCamera()}dollyAbout(t,e){const n=Math.max(Ah,Math.min(Ch,this.cam.distance*e)),s=n/this.cam.distance;this.cam.target.sub(t).multiplyScalar(s).add(t),this.cam.distance=n,this.applyCamera()}frameSelected(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;let e=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0],s=!1;for(const o of t){const a=this.views.get(o.id);if(!a)continue;const c=o.mesh.positions;for(let l=0;l<o.mesh.vertexCount;l++){const h=new L(c[l*3],c[l*3+1],c[l*3+2]).applyMatrix4(a.group.matrixWorld);e=[Math.min(e[0],h.x),Math.min(e[1],h.y),Math.min(e[2],h.z)],n=[Math.max(n[0],h.x),Math.max(n[1],h.y),Math.max(n[2],h.z)],s=!0}}if(!s)return;this.cam.target.set((e[0]+n[0])/2,(e[1]+n[1])/2,(e[2]+n[2])/2);const r=Math.max(n[0]-e[0],n[1]-e[1],n[2]-e[2]);this.cam.distance=Math.max(1.4,r*2.4),this.applyCamera()}viewOf(t){return this.views.get(t.id)}allViews(){return[...this.views.values()]}rebuildObject(t){const e=this.views.get(t.id);e&&(this.root.remove(e.group),ps(e.group));const n=tM(t,this.shadingAngle);this.root.add(n.group),this.views.set(t.id,n),this.applyDisplay(n)}syncAll(){const t=new Set(this.state.doc.objects.map(e=>e.id));for(const[e,n]of this.views)t.has(e)||(this.root.remove(n.group),ps(n.group),this.views.delete(e));for(const e of this.state.doc.objects)this.rebuildObject(e);this.rebuildOverlay()}get shadingAngle(){return this.state.display==="shaded"?0:this.state.smoothAngle}refreshPositions(t){const e=this.views.get(t.id);if(!e)return this.rebuildObject(t);nn(e.group,t.transform),e.group.updateMatrixWorld(),e.surface.geometry.dispose(),e.surface.geometry=ff(t.mesh,e.tri,this.shadingAngle),e.wire.geometry.dispose(),e.wire.geometry=df(t.mesh,e.edges),e.points.geometry.dispose(),e.points.geometry=Ke(t.mesh.positions)}applyDisplay(t){const e=this.state.display,n=t.object===this.state.selected||this.state.also.has(t.object);t.surface.visible=e!=="wire",t.surface.material=e==="checker"?t.checker??=Q_():Ye.surf,t.wire.visible=e==="wire"||e==="shadedWire"||n,t.wire.material=n?this.state.compMode==="object"?Ye.wireSel:Ye.wireComp:Ye.wire,t.points.visible=n&&this.state.compMode==="vertex",t.group.visible=t.object.visible}applyDisplayAll(){for(const t of this.views.values())this.applyDisplay(t)}softWeightsProvider=null;seamProvider=null;rebuildOverlay(){for(const r of this.overlay.children.slice())this.overlay.remove(r),ps(r);const t=this.state.selected,e=t?this.views.get(t.id):void 0;if(!t||!e)return;const n=t.mesh,s=this.seamProvider?.();if(s?.size){const r=[];for(const[o,a]of e.edges){const c=`${Math.min(o,a)}_${Math.max(o,a)}`;s.has(c)&&(r.push(n.positions[o*3],n.positions[o*3+1],n.positions[o*3+2]),r.push(n.positions[a*3],n.positions[a*3+1],n.positions[a*3+2]))}if(r.length){const o=new In(Ke(r),Ye.seam);nn(o,t.transform).renderOrder=3,this.overlay.add(o)}}if(this.state.comp.size){if(this.state.soft.strength>0&&this.state.compMode!=="object"&&this.softWeightsProvider){const r=[];for(const[o,a]of this.softWeightsProvider())a>.02&&a<.999&&r.push(n.positions[o*3],n.positions[o*3+1],n.positions[o*3+2]);if(r.length){const o=new dn(Ke(r),Ye.softPt);nn(o,t.transform).renderOrder=2,this.overlay.add(o)}}if(this.state.compMode==="vertex"){const r=[];for(const a of this.state.comp)r.push(n.positions[a*3],n.positions[a*3+1],n.positions[a*3+2]);const o=new dn(Ke(r),Ye.vertSel);nn(o,t.transform).renderOrder=4,this.overlay.add(o)}else if(this.state.compMode==="edge"){const r=[];for(const a of this.state.comp){const c=e.edges[a];c&&(r.push(n.positions[c[0]*3],n.positions[c[0]*3+1],n.positions[c[0]*3+2]),r.push(n.positions[c[1]*3],n.positions[c[1]*3+1],n.positions[c[1]*3+2]))}const o=new In(Ke(r),Ye.edgeSel);nn(o,t.transform).renderOrder=4,this.overlay.add(o)}else if(this.state.compMode==="face"){const r=[],o=[];for(const l of this.state.comp){if(l>=n.faceCount)continue;const h=n.faceVerts(l),u=r.length/3;for(const f of h)r.push(n.positions[f*3],n.positions[f*3+1],n.positions[f*3+2]);for(let f=1;f<h.length-1;f++)o.push(u,u+f,u+f+1)}const a=Ke(r);a.setIndex(o);const c=new be(a,Ye.faceSel);nn(c,t.transform).renderOrder=4,this.overlay.add(c)}}}resize(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.persp.aspect=t/e,this.persp.updateProjectionMatrix(),this.applyCamera()}start(){const t=()=>{this.frame=requestAnimationFrame(t),this.renderer.render(this.scene,this.camera)};t()}stop(){cancelAnimationFrame(this.frame)}}const Ze=[new L(1,0,0),new L(0,1,0),new L(0,0,1)],Rh=3,Ph=13,Ih=23,Fc=30,nM=40;function Xr(i){return i<0?null:i===Fc||i<10?"move":i<20?"rotate":"scale"}const iM=1.8,Ti=16770688,Lh=14862432,Dh=10149450;function sa(i){const t=i==="all";return{move:t||i==="move",rotate:t||i==="rotate",scale:t||i==="scale",arrow:1,ring:t?.68:1,cube:t?1.3:1}}function Uh(i,t,e,n,s=64){const r=new an().setFromUnitVectors(new L(0,0,1),t.clone().normalize()),o=[];for(let l=0;l<=s;l++){const h=l/s*Math.PI*2,u=new L(Math.cos(h)*e,Math.sin(h)*e,0).applyQuaternion(r).add(i);o.push(u.x,u.y,u.z)}const a=new he;a.setAttribute("position",new Jt(o,3));const c=new Js(a,new ye({color:n}));return c.renderOrder=6,c}function sM(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s,o=r?Math.max(0,Math.min(1,((i.x-t.x)*n+(i.y-t.y)*s)/r)):0;return Math.hypot(t.x+n*o-i.x,t.y+s*o-i.y)}class rM{constructor(t){this.host=t}group=new _n;hot=-1;signature="";toScreen(t){return this.host.toScreen(t)}scaleAt(t){const e=this.host.orthoDistance();return(e!==null?e*.09:this.host.camera().position.distanceTo(t)*.15)*this.host.manipSize()}clear(){for(const t of this.group.children.slice())this.group.remove(t),ps(t);this.signature=""}rebuild(t,e,n){if(!t){this.signature&&this.clear();return}const s=this.scaleAt(t),r=this.host.pivotEdit(),o=[e,this.hot,n,r?"pivot":"",t.x.toFixed(3),t.y.toFixed(3),t.z.toFixed(3),s.toFixed(3)].join("|");if(o===this.signature)return;this.clear(),this.signature=o;const a=sa(r?"move":e),c=u=>r?Dh:J_[u],l=u=>this.hot===u;for(let u=0;u<3;u++){const f=Ze[u];if(a.move||a.scale){const d=f.clone().multiplyScalar((a.scale?a.cube:a.arrow)*s).add(t),m=l(u)||l(20+u)?Ti:c(u),v=new he;v.setAttribute("position",new Jt([t.x,t.y,t.z,d.x,d.y,d.z],3));const p=new Js(v,new ye({color:m}));p.renderOrder=6,this.group.add(p)}if(a.move){const d=new be(new Rc(s*.075,s*.22,10),new bn({color:l(u)?Ti:c(u)}));d.quaternion.setFromUnitVectors(new L(0,1,0),f),d.position.copy(f.clone().multiplyScalar(a.arrow*s).add(t)),d.renderOrder=6,this.group.add(d)}if(a.scale){const d=new be(new Oi(s*.12,s*.12,s*.12),new bn({color:l(20+u)?Ti:c(u)}));d.position.copy(f.clone().multiplyScalar(a.cube*s).add(t)),d.renderOrder=6,this.group.add(d)}a.rotate&&this.group.add(Uh(t,f,a.ring*s,l(10+u)?Ti:c(u)))}if(e==="rotate"&&!r){const u=new L().subVectors(this.host.camera().position,t).normalize();this.group.add(Uh(t,u,s*1.18,l(Ph)?Ti:12174283))}const h=e==="scale"&&!r?new be(new Oi(s*.14,s*.14,s*.14),new bn({color:l(Ih)?Ti:Lh})):new be(new Pc(s*.085,12,10),new bn({color:l(Rh)||l(Fc)?Ti:r?Dh:Lh}));h.position.copy(t),h.renderOrder=6,this.group.add(h)}pick(t,e,n,s=1){if(!e)return-1;const o=this.host.pivotEdit()?"move":n,a=this.scaleAt(e),c=this.host.toScreen(e);if(Math.hypot(c.x-t.x,c.y-t.y)<16*s)return o==="scale"?Ih:Rh;const l=sa(o);let h=-1,u=1/0;const f=(d,m,v)=>{m<v&&m<u&&(u=m,h=d)};for(let d=0;d<3;d++){const m=Ze[d];if(l.scale){const v=this.host.toScreen(m.clone().multiplyScalar(l.cube*a).add(e));f(20+d,Math.hypot(v.x-t.x,v.y-t.y),16*s)}if(l.move){const v=this.host.toScreen(m.clone().multiplyScalar(.3*a).add(e)),p=this.host.toScreen(m.clone().multiplyScalar(l.arrow*a).add(e));f(d,sM(t,v,p),14*s)}}if(h>=0)return h;if(l.rotate){for(let d=0;d<3;d++)f(10+d,this.ringDistance(t,e,Ze[d],l.ring*a),12*s);if(o==="rotate"){const d=new L().subVectors(this.host.camera().position,e).normalize();f(Ph,this.ringDistance(t,e,d,a*1.18),12*s)}}return h}ringDistance(t,e,n,s){const r=new an().setFromUnitVectors(new L(0,0,1),n.clone().normalize());let o=1/0;for(let a=0;a<64;a++){const c=a/64*Math.PI*2,l=new L(Math.cos(c)*s,Math.sin(c)*s,0).applyQuaternion(r).add(e),h=this.host.toScreen(l);o=Math.min(o,Math.hypot(h.x-t.x,h.y-t.y))}return o}}function Ys(i,t,e){const n=new L().subVectors(t,i.origin),s=e.dot(e),r=e.dot(i.direction),o=i.direction.dot(i.direction),a=e.dot(n),c=i.direction.dot(n),l=s*o-r*r;return Math.abs(l)<1e-9?0:(r*c-o*a)/l}const oM={model:{g1:di("強度","ソフト選択 強度",0,1,.01,"strength"),g2:di("範囲","ソフト選択 範囲",.05,6,.05,"radius")},uv:{g1:di("強度","ソフト選択 強度",0,1,.01,"strength"),g2:di("範囲","ソフト選択 範囲",.05,6,.05,"radius")},sculpt:{g1:di("強度","ブラシ強度",0,1,.01,"strength"),g2:di("サイズ","ブラシサイズ",.05,6,.05,"radius")},material:{g1:di("不透明","不透明度",0,1,.01,"strength"),g2:di("サイズ","ブラシサイズ",.05,6,.05,"radius")}};function di(i,t,e,n,s,r){return{label:i,full:t,min:e,max:n,step:s,get:o=>o.soft[r],set:(o,a)=>{o.soft[r]=a}}}class aM{doc=new Ju;selected=null;comp=new Set;also=new Set;mode="model";compMode="object";tool="select";manip="all";display="shadedWire";manipSize=1;pivotEdit=!1;pivotOverride=null;mods={shift:"off",ctrl:"off",alt:"off"};symX=!1;fingerCam=!1;panelsHidden=!1;soft={strength:0,radius:1};toolOpts={extrudeDist:.35};vertexOpts={mergeDist:.05,extrudeWidth:.25};snap={kind:"grid",step:.5};snapOn=!1;snapKeyHeld=!1;uvSnap={kind:"grid",step:1/8};mirrorAxis=0;cut={snapStep:0,edgeFlow:!1};bevel={width:.1,segments:1};smoothAngle=30;camOpts={focal:35,near:.05,far:500,ortho:!1};viewName="パース";get cameras(){return this.doc.cameraBookmarks}gauge(t){return oM[this.mode][t]}modOn(t){return this.mods[t]!=="off"}get snapping(){return this.snapKeyHeld||this.snapOn}activeMods(){const t=[];return this.mods.shift!=="off"&&t.push("SHF"),this.mods.ctrl!=="off"&&t.push("CTL"),this.mods.alt!=="off"&&t.push("ALT"),t}select(t){this.selected!==t&&this.comp.clear(),this.also.clear(),this.selected=t,this.pivotOverride=null}selectedObjects(){return this.selected?[this.selected,...[...this.also].filter(t=>t!==this.selected)]:[]}addObject(t){if(!this.selected){this.selected=t;return}t!==this.selected&&(this.also.has(t)?this.also.delete(t):this.also.add(t))}}const cM=40;class lM{constructor(t){this.state=t}undoStack=[];redoStack=[];onChange=null;get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get undoLabel(){return this.undoStack.at(-1)?.label??null}get redoLabel(){return this.redoStack.at(-1)?.label??null}push(t){this.commit(t,this.snapshot())}snapshot(){return{objects:this.state.doc.objects.map(t=>({ref:t,name:t.name,kind:t.kind,parametric:t.parametric,params:{...t.params},transform:mi(t.transform),visible:t.visible,activeLevel:t.activeLevel,mesh:t.mesh.clone(),multires:t.multires.slice(),sculptLayers:t.sculptLayers.slice(),paintLayers:t.paintLayers.slice()})),selectedId:this.state.selected?.id??null,compMode:this.state.compMode,comp:[...this.state.comp]}}commit(t,e){this.undoStack.push({label:t,snap:e}),this.undoStack.length>cM&&this.undoStack.shift(),this.redoStack.length=0,this.onChange?.()}drop(){this.undoStack.pop(),this.onChange?.()}undo(){const t=this.undoStack.pop();return t?(this.redoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}redo(){const t=this.redoStack.pop();return t?(this.undoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}clear(){this.undoStack.length=0,this.redoStack.length=0,this.onChange?.()}restore(t){const e=this.state.doc;e.objects=t.objects.map(r=>{const o=r.ref;return o.name=r.name,o.kind=r.kind,o.parametric=r.parametric,o.params={...r.params},o.transform=mi(r.transform),o.visible=r.visible,o.activeLevel=r.activeLevel,o.mesh=r.mesh.clone(),o.multires=r.multires.slice(),o.sculptLayers=r.sculptLayers.slice(),o.paintLayers=r.paintLayers.slice(),o}),this.state.selected=t.selectedId?e.find(t.selectedId)??null:null,this.state.compMode=t.compMode,this.state.comp.clear();const n=this.state.selected?.mesh,s=!n||t.compMode==="object"?0:t.compMode==="vertex"?n.vertexCount:t.compMode==="face"?n.faceCount:1/0;for(const r of t.comp)r<s&&this.state.comp.add(r)}}const hM="macbeth",uM=1,_i="projects",Mi="blobs";let Fr=null;function pf(){return Fr||(Fr=new Promise((i,t)=>{const e=indexedDB.open(hM,uM);e.onupgradeneeded=()=>{const n=e.result;n.objectStoreNames.contains(_i)||n.createObjectStore(_i,{keyPath:"id"}),n.objectStoreNames.contains(Mi)||n.createObjectStore(Mi)},e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error??new Error("IndexedDB を開けません"))}),Fr)}function Oc(i,t,e){return pf().then(n=>new Promise((s,r)=>{const o=n.transaction(i,t);let a;Promise.resolve(e(o)).then(c=>{a=c},r),o.oncomplete=()=>s(a),o.onerror=()=>r(o.error??new Error("IndexedDB の操作に失敗しました")),o.onabort=()=>r(o.error??new Error("IndexedDB の操作が中断されました"))}))}function Nh(i){return new Promise((t,e)=>{i.onsuccess=()=>t(i.result),i.onerror=()=>e(i.error)})}async function Fh(){try{return await pf(),!0}catch{return!1}}async function fM(i,t){const e=Date.now(),n={...i,created:i.created??e,modified:e,size:t.byteLength};return await Oc([_i,Mi],"readwrite",s=>{s.objectStore(_i).put(n),s.objectStore(Mi).put(t.slice().buffer,n.id)}),n}async function dM(i){return await Oc([_i,Mi],"readonly",async e=>{const n=await Nh(e.objectStore(_i).get(i)),s=await Nh(e.objectStore(Mi).get(i));return n&&s?{record:n,bytes:new Uint8Array(s)}:null})}async function Oh(i){await Oc([_i,Mi],"readwrite",t=>{t.objectStore(_i).delete(i),t.objectStore(Mi).delete(i)})}const Or="__autosave__",pM=1200,mM="0.1.0";class gM{constructor(t){this.state=t}timer=null;writing=!1;pending=!1;available=null;onError=null;onSaved=null;schedule(){this.timer!==null&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.timer=null,this.saveNow()},pM)}async saveNow(){if(this.writing){this.pending=!0;return}if(this.available===null&&(this.available=await Fh()),!!this.available){this.writing=!0;try{const t=z_(this.state.doc,{appVersion:mM}),e=await fM({id:Or,name:"自動保存",thumbnail:"",autosave:!0},t);this.onSaved?.(e.modified)}catch(t){this.onError?.(t instanceof Error?t.message:"自動保存に失敗しました")}finally{this.writing=!1,this.pending&&(this.pending=!1,this.schedule())}}}async restore(){if(this.available===null&&(this.available=await Fh()),!this.available)return!1;try{const t=await dM(Or);if(!t)return!1;const{document:e}=G_(t.bytes);return e.objects.length?(this.state.doc=e,this.state.select(null),!0):!1}catch(t){return this.onError?.(t instanceof Error?t.message:"前回の状態を読み込めませんでした"),await Oh(Or).catch(()=>{}),!1}}async clear(){this.timer!==null&&clearTimeout(this.timer),this.timer=null,await Oh(Or).catch(()=>{})}}function mf(){return typeof window.showSaveFilePicker=="function"?"file-system-access":typeof navigator.canShare=="function"&&typeof navigator.share=="function"?"share":"download"}function vM(i){return i.endsWith(".mbz")?"application/zip":i.endsWith(".obj")?"text/plain":i.endsWith(".png")?"image/png":"application/octet-stream"}function xM(i){return i.endsWith(".mbz")?{"application/zip":[".mbz"]}:i.endsWith(".obj")?{"text/plain":[".obj"]}:{"application/octet-stream":[`.${i.split(".").pop()}`]}}function kh(i,t){const e=URL.createObjectURL(i),n=document.createElement("a");n.href=e,n.download=t,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(e),2e3)}async function Bh(i,t){const e=new Blob([i],{type:vM(t)}),n=mf();if(n==="file-system-access")try{const s=await window.showSaveFilePicker({suggestedName:t,types:[{description:"macbeth",accept:xM(t)}]}),r=await s.createWritable();return await r.write(e),await r.close(),{method:n,target:{handle:s,name:s.name},saved:!0}}catch(s){return s?.name==="AbortError"?{method:n,target:null,saved:!1}:(kh(e,t),{method:"download",target:{name:t},saved:!0})}if(n==="share"){const s=new File([e],t,{type:e.type});if(navigator.canShare?.({files:[s]}))try{return await navigator.share({files:[s],title:t}),{method:n,target:{name:t},saved:!0}}catch(r){if(r?.name==="AbortError")return{method:n,target:null,saved:!1}}}return kh(e,t),{method:"download",target:{name:t},saved:!0}}async function zh(i){if(typeof window.showOpenFilePicker=="function")try{const t=i.split(",").map(r=>r.trim()),[e]=await window.showOpenFilePicker({multiple:!1,types:[{description:"macbeth",accept:{"*/*":t}}]}),n=await e.getFile(),s=await n.arrayBuffer();return{name:n.name,bytes:new Uint8Array(s),text:await n.text(),handle:e}}catch(t){if(t?.name==="AbortError")return null}return new Promise(t=>{const e=document.createElement("input");e.type="file",e.accept=i,e.style.display="none",document.body.appendChild(e);let n=!1;const s=r=>{n||(n=!0,e.remove(),t(r))};e.addEventListener("change",async()=>{const r=e.files?.[0];if(!r)return s(null);const o=await r.arrayBuffer();s({name:r.name,bytes:new Uint8Array(o),text:new TextDecoder().decode(o)})}),window.addEventListener("focus",()=>setTimeout(()=>s(null),800),{once:!0}),e.click()})}function _M(){switch(mf()){case"file-system-access":return"フォルダを選んで保存（同じファイルに上書きできます）";case"share":return"共有シートから「ファイル」App へ保存";default:return"ダウンロード"}}const MM=100;class yM{session=null;get active(){return this.session!==null}begin(t,e,n){if(!e.length)return null;let s=0;for(const[o,a]of e){const c=t.mesh.getPosition(o),l=t.mesh.getPosition(a);s+=Math.hypot(c[0]-l[0],c[1]-l[1],c[2]-l[2])}const r=s/e.length||1;return this.session={object:t,source:t.mesh.clone(),edges:e,scale:r,startX:n},this.session}widthFromDrag(t,e){const n=t/MM*e*.5;return Math.max(e*.02,Math.min(e*.49,n))}apply(t){const e=this.session;if(!e)return null;const n=Qv(e.source,e.edges,t.width,t.segments);return n?(e.object.mesh=n.mesh,{faces:n.newFaces}):null}cancel(){const t=this.session;t&&(t.object.mesh=t.source,this.session=null)}keep(){return this.session}end(){this.session=null}}const bM=30;class SM{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}preview=null;get current(){return this.preview}snap(t,e){if(e)return .5;const n=this.state.cut.snapStep;if(n>0){const s=n/100;t=Math.round(t/s)*s}return Math.max(.02,Math.min(.98,t))}clear(){for(const t of this.group.children.slice())this.group.remove(t),ps(t);this.preview=null}update(t,e,n){if(this.clear(),!e)return null;const s=this.picker.pickEdge(e,t,bM);if(s.edge<0)return null;const r=this.snap(s.t,n),[o,a]=e.edges[s.edge],c=Xv(e.object.mesh,o,a,r,this.state.cut.edgeFlow);if(!c)return null;this.preview={edge:s.edge,t:r,faceCount:c.faceCount};const l=[];for(const d of c.points)l.push(d[0],d[1],d[2]);const h=new Js(Ke(l),Ye.cutLine);nn(h,e.object.transform).renderOrder=5,this.group.add(h);const u=c.points[0],f=new dn(Ke([u[0],u[1],u[2]]),Ye.cutPt);return nn(f,e.object.transform).renderOrder=5,this.group.add(f),`エッジループ挿入 <kbd>${Math.round(r*100)}%</kbd> · ${c.faceCount} 面`+(this.state.cut.edgeFlow?" · エッジフロー":"")+" · <kbd>Shift</kbd> で 50%"}commit(t){const e=this.preview;if(!e||!t)return null;const[n,s]=t.edges[e.edge],r=$v(t.object.mesh,n,s,e.t,this.state.cut.edgeFlow);return this.clear(),r?(t.object.mesh=r.mesh,{faceCount:r.faceCount}):null}}const wM=22,EM=16,Ds={vert:new rn({color:16761963,size:9,sizeAttenuation:!1,transparent:!0,opacity:.75}),edge:new ye({color:16761963,transparent:!0,opacity:.8}),weld:new rn({color:7139450,size:14,sizeAttenuation:!1}),snap:new rn({color:7139450,size:11,sizeAttenuation:!1}),face:new bn({color:16761963,transparent:!0,opacity:.22,side:Ge,depthWrite:!1})};class TM{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}current="";clear(){if(this.current){for(const t of this.group.children.slice())this.group.remove(t),ps(t);this.current=""}}showVertex(t,e){if(this.setKey(`w${e}`))return;const n=t.object.mesh,s=new dn(Ke([n.positions[e*3],n.positions[e*3+1],n.positions[e*3+2]]),Ds.weld);this.add(s,t)}showWorldPoint(t,e,n){const s=`s${t.toFixed(4)},${e.toFixed(4)},${n.toFixed(4)}`;if(this.setKey(s))return;const r=new dn(Ke([t,e,n]),Ds.snap);r.renderOrder=3,this.group.add(r)}update(t,e){if(!e||this.state.compMode==="object")return this.clear();const n=e.object,s=n.mesh;if(this.state.compMode==="vertex"){const h=this.picker.pickVertex(e,t,wM);if(h<0)return this.clear();if(this.setKey(`v${h}`))return;const u=new dn(Ke([s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]]),Ds.vert);this.add(u,e);return}if(this.state.compMode==="edge"){const h=this.picker.pickEdge(e,t,EM);if(h.edge<0)return this.clear();if(this.setKey(`e${h.edge}`))return;const[u,f]=e.edges[h.edge],d=new In(Ke([s.positions[u*3],s.positions[u*3+1],s.positions[u*3+2],s.positions[f*3],s.positions[f*3+1],s.positions[f*3+2]]),Ds.edge);this.add(d,e);return}const r=this.picker.pickSurface(t);if(!r||r.object!==n)return this.clear();if(this.setKey(`f${r.face}`))return;const o=s.faceVerts(r.face),a=[],c=[];for(const h of o)a.push(s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]);for(let h=1;h<o.length-1;h++)c.push(0,h,h+1);const l=Ke(a);l.setIndex(c),this.add(new be(l,Ds.face),e)}setKey(t){return this.current===t?!0:(this.clear(),this.current=t,!1)}add(t,e){nn(t,e.object.transform).renderOrder=3,this.group.add(t)}}const Vh=22,Hh=16,AM=380,CM=14,Gh=4;function Ai(i,t,e){e?i.delete(t):i.add(t)}const Cn={changed:!1,objectChanged:!1};class RM{constructor(t,e,n){this.state=t,this.picker=e,this.viewOf=n}lastClick=null;add(t){return this.state.modOn("shift")||t.shiftKey}sub(t){return this.state.modOn("ctrl")||t.ctrlKey||t.metaKey}click(t,e){if(this.state.compMode==="object"){const h=this.picker.pickSurface(t)?.object??null;if(h&&this.add(e))return this.state.addObject(h),this.lastClick=null,{changed:!0,objectChanged:!0};const u=h!==this.state.selected||this.state.also.size>0;return this.state.select(h),this.lastClick=null,{changed:u,objectChanged:u}}let n=this.state.selected;if(!n){const l=this.picker.pickSurface(t);if(!l)return Cn;this.state.select(l.object),n=l.object;const h=this.viewOf(n.id);return h&&(this.pickOne(t,e,h),this.lastClick={t:performance.now(),x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,before:new Set}),{changed:!0,objectChanged:!0}}const s=this.viewOf(n.id);if(!s)return Cn;const r=performance.now(),o=this.lastClick;if(o!==null&&r-o.t<AM&&Math.hypot(t.x-o.x,t.y-o.y)<CM&&o.mode===this.state.compMode&&o.objectId===n.id&&o)return this.lastClick=null,this.double(t,e,s,o.before);const c=new Set(this.state.comp);return!this.add(e)&&!this.sub(e)&&this.state.comp.clear(),this.pickOne(t,e,s),this.lastClick={t:r,x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,before:c},{changed:!0,objectChanged:!1}}pickOne(t,e,n){const s=this.sub(e),r=this.state.comp;if(this.state.compMode==="vertex"){const o=this.picker.pickVertex(n,t,Vh);o>=0&&Ai(r,o,s)}else if(this.state.compMode==="edge"){const o=this.picker.pickEdge(n,t,Hh);o.edge>=0&&Ai(r,o.edge,s)}else if(this.state.compMode==="face"){const o=this.picker.pickSurface(t);o&&o.object===n.object&&Ai(r,o.face,s)}}edgeIndex(t){const e=new Map;return t.edges.forEach((n,s)=>e.set(Rt(n[0],n[1]),s)),e}double(t,e,n,s){const r=n.object,o=r.mesh,a=this.add(e),c=this.sub(e),l=this.edgeIndex(n),h=f=>f.map(d=>l.get(Rt(d[0],d[1]))).filter(d=>d!==void 0),u=(f,d)=>{!a&&!c?this.state.comp.clear():this.state.comp=new Set(s);for(const m of f)Ai(this.state.comp,m,c);return{changed:!0,objectChanged:!1,message:`${d} — ${f.length}`}};if(this.state.compMode==="edge"){const f=this.picker.pickEdge(n,t,Hh);if(f.edge<0)return Cn;const[d,m]=n.edges[f.edge];if(a&&s.size){const v=[...s][s.size-1],p=n.edges[v];if(p){const g=Rt(p[0],p[1]),x=Rt(d,m),y=Jo(o,p[0],p[1]),_=fh(y,g,x);if(_)return u(h(_),"部分エッジループ");const w=Qx(o,p[0],p[1]),S=fh(w,g,x);if(S)return u(h(S),"部分エッジリング")}}return u(h(Jo(o,d,m).edges),"エッジループ")}if(this.state.compMode==="face"){const f=this.picker.pickSurface(t);return!f||f.object!==r?Cn:u(Ku(o,f.face),"シェル")}if(this.state.compMode==="vertex"){const f=this.picker.pickVertex(n,t,Vh);if(f<0)return Cn;if(a&&s.size){const m=[...s][s.size-1],v=n.edges.find(([p,g])=>p===m||g===m);if(v){const p=Jo(o,v[0],v[1]),g=e_(p),x=g.indexOf(m),y=g.indexOf(f);if(x>=0&&y>=0){const[_,w]=x<y?[x,y]:[y,x];return u(g.slice(_,w+1),"頂点列")}}}const d=o.vertexFaces().get(f);return d?.length?u(t_(o,d[0]),"シェル"):Cn}return Cn}marquee(t,e,n,s,r,o){const a={x:Math.min(t,n),y:Math.min(e,s)},c={x:Math.max(t,n),y:Math.max(e,s)};if(c.x-a.x<Gh&&c.y-a.y<Gh)return this.click(r,o);const l=m=>m.z<=1&&m.x>=a.x&&m.x<=c.x&&m.y>=a.y&&m.y<=c.y;if(this.state.compMode==="object"){let m=null;for(const p of this.state.doc.objects){const g=this.viewOf(p.id);if(g&&this.picker.vertsInRect(g,a.x,a.y,c.x,c.y).length){m=p;break}}const v=m!==this.state.selected;return this.state.select(m),{changed:v,objectChanged:v}}const h=this.state.selected,u=h?this.viewOf(h.id):void 0;if(!h||!u)return Cn;const f=this.sub(o);!this.add(o)&&!f&&this.state.comp.clear();const d=this.state.comp;if(this.state.compMode==="vertex")for(const m of this.picker.vertsInRect(u,a.x,a.y,c.x,c.y))Ai(d,m,f);else if(this.state.compMode==="edge")u.edges.forEach((m,v)=>{const p=h.mesh.getPosition(m[0]),g=h.mesh.getPosition(m[1]),x=this.picker.project(u,(p[0]+g[0])/2,(p[1]+g[1])/2,(p[2]+g[2])/2);l(x)&&Ai(d,v,f)});else if(this.state.compMode==="face")for(let m=0;m<h.mesh.faceCount;m++){const v=h.mesh.faceCenter(m);l(this.picker.project(u,v[0],v[1],v[2]))&&Ai(d,m,f)}return{changed:!0,objectChanged:!1}}growOrShrink(t){const e=this.state.selected;if(!e||this.state.compMode==="object"||!this.state.comp.size)return{changed:!1,objectChanged:!1,message:"コンポーネントを選択してください"};const n=e.mesh,s=this.state.comp;if(this.state.compMode==="vertex"){const r=t?dh(n,s):ph(n,s);s.clear();for(const o of r)s.add(o)}else if(this.state.compMode==="face"){const r=t?i_(n,s):s_(n,s);s.clear();for(const o of r)s.add(o)}else{const r=this.viewOf(e.id);if(!r)return Cn;const o=new Set;for(const c of s){const l=r.edges[c];l&&(o.add(l[0]),o.add(l[1]))}const a=new Set(t?dh(n,o):ph(n,o));s.clear(),r.edges.forEach(([c,l],h)=>{a.has(c)&&a.has(l)&&s.add(h)})}return{changed:!0,objectChanged:!1,message:`${t?"選択を拡張":"選択を縮小"} — ${s.size}`}}selectBoundary(){const t=this.state.selected;if(!t)return{changed:!1,objectChanged:!1,message:"オブジェクトを選択してください"};const e=this.viewOf(t.id);if(!e)return Cn;const n=new Set(n_(t.mesh).map(([s,r])=>Rt(s,r)));return n.size?(this.state.compMode="edge",this.state.comp.clear(),e.edges.forEach(([s,r],o)=>{n.has(Rt(s,r))&&this.state.comp.add(o)}),this.lastClick=null,{changed:!0,objectChanged:!1,message:`境界エッジ — ${this.state.comp.size}`}):{changed:!1,objectChanged:!1,message:"境界エッジがありません（閉じたメッシュです）"}}selectedVertices(){const t=this.state.selected;if(!t)return[];const e=this.viewOf(t.id),n=new Set;if(this.state.compMode==="vertex")for(const s of this.state.comp)n.add(s);else if(this.state.compMode==="edge"&&e)for(const s of this.state.comp){const r=e.edges[s];r&&(n.add(r[0]),n.add(r[1]))}else if(this.state.compMode==="face")for(const s of this.state.comp)for(const r of t.mesh.faceVerts(s))n.add(r);else for(let s=0;s<t.mesh.vertexCount;s++)n.add(s);return[...n]}reset(){this.lastClick=null}}const PM=4e5;function Wh(i,t,e){const n=new Map;for(const c of t)n.set(c,1);if(!e.enabled||e.strength<=0||!t.length)return{weights:n,skipped:!1};const s=i.vertexCount;if(s*t.length>PM)return{weights:n,skipped:!0};const r=i.positions,{radius:o,strength:a}=e;for(let c=0;c<s;c++){if(n.get(c)===1)continue;let l=1/0;for(const h of t){const u=Math.hypot(r[c*3]-r[h*3],r[c*3+1]-r[h*3+1],r[c*3+2]-r[h*3+2]);u<l&&(l=u)}if(l<o){const h=1-l/o;n.set(c,a*(h*h*(3-2*h)))}}return{weights:n,skipped:!1}}function Xh(i,t){const e=new Set(t),n=i.positions,s=(a,c,l)=>`${a.toFixed(3)==="-0.000"?"0.000":a.toFixed(3)},${c.toFixed(3)},${l.toFixed(3)}`,r=new Map;for(let a=0;a<i.vertexCount;a++)r.set(s(n[a*3],n[a*3+1],n[a*3+2]),a);const o=[];for(const a of e){const c=r.get(s(-n[a*3],n[a*3+1],n[a*3+2]));c!==void 0&&c!==a&&!e.has(c)&&o.push([a,c])}return o}function $h(i){const{handle:t,pivot:e,ray:n}=i,s=Xr(t)??"move",r=t!==30&&t%10<3?t%10:-1,o=new Kn().setFromNormalAndCoplanarPoint(new L().subVectors(i.cameraPosition,e).normalize(),e);let a=null;if(r<0){const c=new L;n.intersectPlane(o,c)&&(a=c)}return{kind:s,label:i.label,handle:t,axis:r,pivot:e.clone(),target:i.target,start:i.point,pivotScreen:i.pivotScreen,t0:r>=0?Ys(n,e,Ze[r]):0,a0:Math.atan2(i.point.y-i.pivotScreen.y,i.point.x-i.pivotScreen.x),plane:o,planeStart:a}}function IM(i,t,e,n,s,r){if(i.kind==="move"){let a;if(i.axis<0){const c=new L;if(!i.planeStart||!n.intersectPlane(i.plane,c))return;a=new L().subVectors(c,i.planeStart)}else{const c=Ze[i.axis];a=c.clone().multiplyScalar(Ys(n,i.pivot,c)-i.t0)}if(r){const c=r(i.pivot.clone().add(a));if(c){const l=c.sub(i.pivot);a=i.axis<0?l:Ze[i.axis].clone().multiplyScalar(l.dot(Ze[i.axis]))}}oa(i,t,(c,l)=>c.clone().addScaledVector(a,l),{position:a});return}if(i.kind==="rotate"){let a=Math.atan2(e.y-i.pivotScreen.y,e.x-i.pivotScreen.x)-i.a0;const c=i.axis<0?new L().subVectors(s,i.pivot).normalize():Ze[i.axis].clone();i.axis>=0&&c.dot(new L().subVectors(s,i.pivot))<0&&(a=-a),oa(i,t,(l,h)=>{const u=new an().setFromAxisAngle(c,-a*h);return l.clone().sub(i.pivot).applyQuaternion(u).add(i.pivot)},{rotation:new an().setFromAxisAngle(c,-a)});return}let o;if(i.axis<0)o=new L(1,1,1).multiplyScalar(Math.max(.02,1+(e.x-i.start.x)*.008));else{const a=Ys(n,i.pivot,Ze[i.axis]),c=Math.max(.02,1+(a-i.t0)/Math.max(1e-4,Math.abs(i.t0))*.6);o=new L(1,1,1),o.setComponent(i.axis,c)}oa(i,t,(a,c)=>{const l=a.clone().sub(i.pivot);return l.set(l.x*(1+(o.x-1)*c),l.y*(1+(o.y-1)*c),l.z*(1+(o.z-1)*c)),l.add(i.pivot)},{scale:o})}function ra(i,t,e){const n=Math.max(.02,e.scale??1),s=e.move??new L,r=i.pivot,o=i.target,a=c=>c.clone().sub(r).multiplyScalar(n).add(r).add(s);if(o.kind==="object"){const c=o.transform,l=a(new L(c.position[0],c.position[1],c.position[2]));t.transform={position:[l.x,l.y,l.z],rotation:[...c.rotation],scale:[c.scale[0]*n,c.scale[1]*n,c.scale[2]*n]};return}for(let c=0;c<o.verts.length;c++){const l=o.world[c],h=l.clone().lerp(a(l),o.weights[c]).applyMatrix4(o.inverse);t.mesh.setPosition(o.verts[c],h.x,h.y,h.z)}for(const[c,l]of o.mirror){const h=t.mesh.getPosition(c);t.mesh.setPosition(l,-h[0],h[1],h[2])}}function oa(i,t,e,n){const s=i.target;if(s.kind==="object"){const r=s.transform,o=mi(r),a=new L(r.position[0],r.position[1],r.position[2]);if(n.position){const c=a.clone().add(n.position);o.position=[c.x,c.y,c.z]}if(n.rotation){const c=n.rotation.clone().multiply(new an(r.rotation[0],r.rotation[1],r.rotation[2],r.rotation[3]));o.rotation=[c.x,c.y,c.z,c.w];const l=a.clone().sub(i.pivot).applyQuaternion(n.rotation).add(i.pivot);o.position=[l.x,l.y,l.z]}if(n.scale){const c=n.scale;o.scale=[r.scale[0]*c.x,r.scale[1]*c.y,r.scale[2]*c.z];const l=a.clone().sub(i.pivot);l.set(l.x*c.x,l.y*c.y,l.z*c.z),l.add(i.pivot),o.position=[l.x,l.y,l.z]}t.transform=o;return}for(let r=0;r<s.verts.length;r++){const o=e(s.world[r],s.weights[r]).applyMatrix4(s.inverse);t.mesh.setPosition(s.verts[r],o.x,o.y,o.z)}for(const[r,o]of s.mirror){const a=t.mesh.getPosition(r);t.mesh.setPosition(o,-a[0],a[1],a[2])}}function It(i){const t=document.getElementById(i);if(!t)throw new Error(`#${i} が見つかりません`);return t}function rt(i,t,e){const n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}class LM{constructor(t,e){this.stage=t,this.host=e}drag=null;attach(t){const e=t.querySelector(".phead");if(!e)return;const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("class","grip"),n.setAttribute("viewBox","0 0 8 12"),n.setAttribute("fill","currentColor");for(const[s,r]of[[2,2],[6,2],[2,6],[6,6],[2,10],[6,10]]){const o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx",String(s)),o.setAttribute("cy",String(r)),o.setAttribute("r","1"),n.appendChild(o)}e.insertBefore(n,e.firstChild),e.addEventListener("touchstart",s=>s.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",s=>this.start(s,t))}place(t,e){e==="float"?(t.classList.add("floating"),t.style.left="320px",t.style.top="90px",this.stage.appendChild(t)):(t.classList.remove("floating"),t.style.left="",t.style.top="",this.stage.querySelector(`[data-zone="${e}"]`)?.appendChild(t)),this.updateDockWidths()}updateDockWidths(){for(const t of this.stage.querySelectorAll(".dock"))t.classList.toggle("narrow",!!t.querySelector('.panel[data-panel="tools"]'))}start(t,e){t.preventDefault();const n=e.getBoundingClientRect();this.drag={panel:e,key:e.dataset.panel??"",dx:t.clientX-n.left,dy:t.clientY-n.top,zones:[],hot:null},this.showDropZones(),e.classList.add("floating"),this.stage.appendChild(e),this.move(t),window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.end),window.addEventListener("pointercancel",this.end)}move=t=>{const e=this.drag;if(!e)return;const n=this.stage.getBoundingClientRect();e.panel.style.left=`${t.clientX-n.left-e.dx}px`,e.panel.style.top=`${t.clientY-n.top-e.dy}px`;let s=null;for(const r of e.zones){const o=r.el.getBoundingClientRect(),a=t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom;r.el.classList.toggle("hot",a),a&&(s=r)}e.hot=s};end=()=>{window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.end),window.removeEventListener("pointercancel",this.end);const t=this.drag;t&&(t.hot?(this.place(t.panel,t.hot.zone),this.host.onZoneChange(t.key,t.hot.zone),this.host.onMessage(`${t.panel.querySelector(".phead span")?.textContent??""}を${t.hot.name}にドッキング`)):this.host.onZoneChange(t.key,"float"),this.hideDropZones(),this.drag=null,this.updateDockWidths(),setTimeout(()=>this.host.onLayoutChange(),0))};showDropZones(){const t=this.drag;if(!t)return;const e=this.stage.getBoundingClientRect(),n=[{zone:"left",name:"左",x:64,y:0,w:200,h:e.height},{zone:"rightTop",name:"右上",x:e.width-236,y:0,w:236,h:e.height*.62},{zone:"rightBottom",name:"右下",x:e.width-236,y:e.height*.62,w:236,h:e.height*.38}];for(const s of n){const r=rt("div","dropz");r.style.left=`${s.x}px`,r.style.top=`${s.y}px`,r.style.width=`${s.w}px`,r.style.height=`${s.h}px`,r.appendChild(rt("span",void 0,s.name)),this.stage.appendChild(r),t.zones.push({el:r,zone:s.zone,name:s.name})}}hideDropZones(){for(const t of this.stage.querySelectorAll(".dropz"))t.remove()}}const DM=180,UM=420,qh="macbeth.dockSize";class NM{constructor(t,e,n){this.stage=t,this.dockCol=e,this.onChange=n;try{const s=localStorage.getItem(qh);s&&(this.sizes={...this.sizes,...JSON.parse(s)})}catch{}this.grip=document.createElement("div"),this.grip.className="dockgrip",this.stage.appendChild(this.grip),this.attachGrip(),this.apply(),window.addEventListener("resize",()=>this.apply())}grip;sizes={landscape:236,portrait:240};portrait=!1;apply(){const t=this.stage.getBoundingClientRect(),e=t.height>t.width,n=e!==this.portrait;this.portrait=e,this.stage.classList.toggle("portrait",e),this.setSize(this.size),this.grip.classList.toggle("vertical",!e),this.grip.classList.toggle("horizontal",e),this.placeGrip(),n&&this.onChange()}get size(){return this.portrait?this.sizes.portrait:this.sizes.landscape}setSize(t){const e=Math.max(DM,Math.min(UM,t));this.portrait?this.sizes.portrait=e:this.sizes.landscape=e,this.stage.style.setProperty("--dockw",`${e}px`),this.placeGrip()}placeGrip(){const t=!this.dockCol.querySelector(".panel");if(this.grip.hidden=t,t)return;const e=this.stage.getBoundingClientRect(),n=this.dockCol.getBoundingClientRect();this.portrait?(this.grip.style.top=`${n.top-e.top-3}px`,this.grip.style.left=""):(this.grip.style.left=`${n.left-e.left-3}px`,this.grip.style.top="")}attachGrip(){let t=!1;this.grip.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),this.grip.addEventListener("pointerdown",e=>{e.preventDefault(),t=!0,this.grip.classList.add("active"),this.grip.setPointerCapture(e.pointerId)}),this.grip.addEventListener("pointermove",e=>{if(!t)return;const n=this.stage.getBoundingClientRect();this.setSize(this.portrait?n.bottom-e.clientY:n.right-e.clientX),this.onChange()});for(const e of["pointerup","pointercancel"])this.grip.addEventListener(e,()=>{if(t){t=!1,this.grip.classList.remove("active");try{localStorage.setItem(qh,JSON.stringify(this.sizes))}catch{}this.onChange()}})}get isPortrait(){return this.portrait}}class Yh{constructor(t,e,n,s,r,o,a){this.state=t,this.which=n,this.labelId=s,this.valueId=r,this.onInput=o,this.onCommit=a,this.root=It(e),this.fill=this.root.querySelector(".fill"),this.knob=this.root.querySelector(".knob"),this.attach(),this.paint()}root;fill;knob;active=!1;paint(){const t=this.state.gauge(this.which),e=t.get(this.state),n=(e-t.min)/(t.max-t.min);this.fill.style.height=`${n*100}%`,this.knob.style.bottom=`calc(${n*100}% - 1px)`,It(this.labelId).textContent=t.label,this.root.title=t.full,It(this.valueId).textContent=e.toFixed(2),this.root.dataset.off=this.which==="g1"&&e<=0?"true":"false"}setFromY(t){const e=this.state.gauge(this.which),n=this.root.getBoundingClientRect(),s=Math.max(0,Math.min(1,1-(t-n.top)/n.height)),r=e.min+s*(e.max-e.min);e.set(this.state,Math.round(r/e.step)*e.step),this.paint(),this.onInput()}attach(){const t=this.root;t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>{e.preventDefault(),this.active=!0,t.setPointerCapture(e.pointerId),this.setFromY(e.clientY)}),t.addEventListener("pointermove",e=>{this.active&&this.setFromY(e.clientY)});for(const e of["pointerup","pointercancel"])t.addEventListener(e,()=>{this.active&&(this.active=!1,this.onCommit())})}}const FM={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"},OM={wire:"WIRE",shaded:"SHADED",shadedWire:"SHADED+WIRE",smooth:"SMOOTH",checker:"CHECKER"};class kM{constructor(t){this.state=t}toastTimer=null;uvNote=null;refreshStats(){const t=this.state.doc.stats();let e=0;for(const a of this.state.doc.objects)e+=a.mesh.stats().edges;It("hudStats").innerHTML=`<i>Verts</i><span>${t.vertices}</span><i>Edges</i><span>${e}</span><i>Faces</i><span>${t.faces}</span><i>Tris</i><span>${t.triangles}</span>`;const n=this.state.activeMods(),s=n.length?` · <b>${n.join(" ")}</b>`:"";if(this.state.mode==="uv"&&this.uvNote){const a=this.uvNote;It("hudMode").innerHTML=`UV · <b>${a.unit}</b>${s}<br>島 ${a.charts} · 伸び ×${a.maxStretch.toFixed(2)}`+(this.state.selected?` · ${this.state.selected.name}`:"");return}const r=FM[this.state.compMode],o=OM[this.state.display];It("hudMode").innerHTML=`${this.state.tool}${this.state.symX?" · 対称X":""}`+(this.state.pivotEdit?" · <b>ピボット編集</b>":"")+` · <b>${r}</b>`+(this.state.comp.size?` · ${this.state.comp.size}`:"")+s+`<br>${o} · ${this.state.viewName}${this.state.camOpts.ortho?" · ORTHO":""}`+(this.state.selected?` · ${this.state.selected.name}`:"")}toast(t){It("hudHint").innerHTML=t,this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.defaultHint(),2800)}defaultHint(){this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=null,It("hudHint").innerHTML=(this.state.fingerCam?"指1本 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>":"指1本 メッシュ上 <kbd>ツール</kbd> / 外 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>")+" · 指2本 <kbd>パン / ズーム</kbd><br><b>指3本 つまむ <kbd>選択を拡大縮小</kbd> · 上下 <kbd>Y へ移動</kbd> · 左右 <kbd>X / Z へ移動</kbd></b><br>長押し 指1本 <kbd>マーキング</kbd> 指2本 <kbd>カメラ / 編集</kbd> 指3本 <kbd>カメラ</kbd> · ダブルタップ 指2本 <kbd>戻る</kbd> 指3本 <kbd>進む</kbd><br><kbd>SHF</kbd> + 移動 <kbd>押し出し</kbd> · <kbd>SHF</kbd> + <kbd>CTL</kbd> + 移動 <kbd>スライド</kbd> · <kbd>D</kbd> <kbd>ピボット</kbd> · <kbd>+</kbd>/<kbd>-</kbd> <kbd>マニピュレータの大きさ</kbd><br>スナップ <kbd>ツール列</kbd> または <kbd>X</kbd>/<kbd>V</kbd>/<kbd>C</kbd> を押している間 · <kbd>F</kbd> <kbd>矩形 / フレーム</kbd><br>マウス <kbd>Alt+左 タンブル</kbd> <kbd>Alt+中 パン</kbd> <kbd>Alt+右 ズーム</kbd>"}setSaveNote(t){It("saveNote").textContent=t}}function aa(i,t){const e=rt("div","panel");e.dataset.panel=i;const n=rt("div","phead");n.appendChild(rt("span",void 0,t));const s=rt("div","pbody");return e.append(n,s),{panel:e,body:s}}function $e(i,t){const e=rt("div","sect"),n=rt("div","sect-h");return n.appendChild(rt("span",void 0,i)),t&&n.appendChild(rt("b",void 0,t)),e.appendChild(n),e}function en(i,t){const e=rt("div","row");e.appendChild(rt("label",void 0,t.label));const n=rt("input","num");n.type="text",n.readOnly=!0;const s=o=>{n.value=t.format?t.format(o):o.toFixed(t.step<1?2:0)};s(t.value),e.appendChild(n);const r=rt("input","slider");r.type="range",r.min=String(t.min),r.max=String(t.max),r.step=String(t.step),r.value=String(t.value),r.addEventListener("input",()=>{const o=Number(r.value);s(o),t.onInput(o)});for(const o of["change","pointerup"])r.addEventListener(o,()=>t.onCommit?.());e.appendChild(r),i.appendChild(e)}function Us(i,t,e,n){const s=rt("button","chk");s.setAttribute("aria-pressed",String(e)),s.appendChild(rt("i")),s.appendChild(rt("span",void 0,t)),s.addEventListener("click",()=>{const r=s.getAttribute("aria-pressed")!=="true";s.setAttribute("aria-pressed",String(r)),n(r)}),i.appendChild(s)}function ca(i,t,e,n,s){const r=rt("div","row triple");r.appendChild(rt("label",void 0,t));for(let o=0;o<3;o++){const a=rt("input","num");a.type="text",a.inputMode="decimal",a.value=e[o].toFixed(n),a.addEventListener("change",()=>{const c=Number(a.value);Number.isFinite(c)?s(o,c):a.value=e[o].toFixed(n)}),r.appendChild(a)}i.appendChild(r)}function BM(i,t,e){i.textContent="";const n=t.selected;if(t.uv){const r=$e("展開","UNFOLD"),o=rt("div","row"),a=rt("div","segmented");for(const[d,m]of[["none","取り込んだまま"],["lscm","LSCM"],["projection","投影"]]){const v=rt("button","seg");v.textContent=m,v.setAttribute("aria-pressed",String(t.uv.method===d)),v.addEventListener("click",()=>e.onUvMethodChange(d)),a.appendChild(v)}o.appendChild(a),r.appendChild(o),r.appendChild(rt("div","hint",`「取り込んだまま」はメッシュが持っている UV をそのまま見せます。
「展開」を押すと LSCM に切り替わります。`)),i.appendChild(r);const c=$e("自動 UV","AUTO");en(c,{label:"角度",value:t.uv.auto.angle,min:10,max:180,step:1,format:d=>`${Math.round(d)}°`,onInput:d=>e.onUvAutoChange("angle",d)}),Us(c,"ハードエッジ",t.uv.auto.useHardEdges,d=>e.onUvAutoChange("useHardEdges",d)),Us(c,"クリース",t.uv.auto.useCreases,d=>e.onUvAutoChange("useCreases",d)),Us(c,"ポリグループ",t.uv.auto.usePolygroups,d=>e.onUvAutoChange("usePolygroups",d)),Us(c,"対称 X",t.uv.auto.symmetric,d=>e.onUvAutoChange("symmetric",d));const l=rt("button","act","自動 UV を実行");l.addEventListener("click",()=>e.onUvAutoRun()),c.appendChild(l),c.appendChild(rt("div","hint",`角度・ハードエッジ・クリース・ポリグループで切れ目を置き、
大きすぎる島と閉じた island を割ってから開きます。手で動かした分は捨てます。`)),i.appendChild(c);const h=$e(`スナップ${t.snap.active?"（効いています）":""}`,"SNAP"),u=rt("div","row"),f=rt("div","segmented");for(const[d,m,v]of[["grid","1/8",1/8],["grid","1/16",1/16],["grid","1/32",1/32],["vertex","UV 頂点",0]]){const p=rt("button","seg");p.textContent=m;const g=d==="vertex"?t.uv.snapKind==="vertex":t.uv.snapKind==="grid"&&Math.abs(t.uv.snapStep-v)<1e-9;p.setAttribute("aria-pressed",String(g)),p.addEventListener("click",()=>{e.onUvSnapChange("kind",d),d==="grid"&&e.onUvSnapChange("step",v)}),f.appendChild(p)}u.appendChild(f),h.appendChild(u),i.appendChild(h);return}if(n){const r=$e("トランスフォーム","TRANSFORM");ca(r,"移動",n.transform.position,3,(o,a)=>e.onTransformInput(n,"position",o,a)),ca(r,"回転",t.rotationEuler,1,(o,a)=>e.onTransformInput(n,"rotation",o,a)),ca(r,"スケール",n.transform.scale,3,(o,a)=>e.onTransformInput(n,"scale",o,a)),r.appendChild(rt("div","hint","回転は度で入れます。数値を打って Enter で確定します。")),i.appendChild(r)}if(t.tool==="multicut"){const r=$e("マルチカット","MULTI CUT");en(r,{label:"ステップ % スナップ",value:t.cut.snapStep,min:0,max:50,step:5,format:o=>o?`${Math.round(o)}%`:"オフ",onInput:o=>e.onCutChange("snapStep",o)}),Us(r,"エッジフロー",t.cut.edgeFlow,o=>e.onCutChange("edgeFlow",o)),r.appendChild(rt("div","hint",`ホバーで入る位置を先に見せます。Shift で 50% に固定。
エッジフローは頂点法線による三次補間で、ループをサーフェスに沿わせます。`)),i.appendChild(r)}if(t.tool==="bevel"||t.bevelActive){const r=$e("ベベル","BEVEL");en(r,{label:"幅",value:t.bevel.width,min:.005,max:2,step:.005,format:o=>o.toFixed(3),onInput:o=>e.onBevelChange("width",o)}),en(r,{label:"セグメント",value:t.bevel.segments,min:1,max:8,step:1,onInput:o=>e.onBevelChange("segments",o)}),r.appendChild(rt("div","hint",t.bevelActive?`確定したあとでも、ここを動かすとかけ直します。
別の操作をすると確定します。`:`エッジを選んで左右にドラッグすると幅が決まります。
セグメント 1 で面取り、2 以上で丸めになります。`)),i.appendChild(r)}if(t.compMode==="face"||t.compMode==="edge"){const r=$e("押し出し","EXTRUDE");en(r,{label:"距離",value:t.extrudeDist,min:.05,max:3,step:.05,onInput:o=>e.onExtrudeDistChange(o)}),r.appendChild(rt("div","hint",`編集メニューの「押し出し」で使う距離です。
SHF を押しながらドラッグする場合は距離ではなく動かした量になります。`)),i.appendChild(r)}{const r=$e(`スナップ${t.snap.active?"（効いています）":""}`,"SNAP"),o=rt("div","row"),a=rt("div","segmented");for(const[c,l]of[["grid","グリッド  X"],["vertex","頂点  V"],["edge","カーブ  C"],["surface","面"]]){const h=rt("button","seg");h.textContent=l,h.setAttribute("aria-pressed",String(t.snap.kind===c)),h.addEventListener("click",()=>e.onSnapChange("kind",c)),a.appendChild(h)}o.appendChild(a),r.appendChild(o),en(r,{label:"グリッドの刻み",value:t.snap.step,min:.05,max:2,step:.05,onInput:c=>e.onSnapChange("step",c)}),r.appendChild(rt("div","hint",`ツール列のスナップがオンのとき、または X / V / C を押している間だけ効きます。
移動のときだけ働き、寄せ先は緑で光ります。`)),i.appendChild(r)}if(t.compMode==="object"){const r=$e("ミラー","MIRROR"),o=rt("div","row"),a=rt("div","segmented");for(const[c,l]of[[0,"X"],[1,"Y"],[2,"Z"]]){const h=rt("button","seg");h.textContent=l,h.setAttribute("aria-pressed",String(t.mirrorAxis===c)),h.addEventListener("click",()=>e.onMirrorAxisChange(c)),a.appendChild(h)}o.appendChild(a),r.appendChild(o),r.appendChild(rt("div","hint",`編集メニュー（オブジェクト）の「ミラー」で使う軸です。
境目の頂点は「マージ距離」で溶接します。`)),i.appendChild(r)}if(t.compMode==="vertex"){const r=$e("頂点","VERTEX");en(r,{label:"マージ距離",value:t.vertex.mergeDist,min:.001,max:.5,step:.001,format:o=>o.toFixed(3),onInput:o=>e.onVertexOptChange("mergeDist",o)}),en(r,{label:"押し出しの太さ",value:t.vertex.extrudeWidth,min:.05,max:.6,step:.01,onInput:o=>e.onVertexOptChange("extrudeWidth",o)}),r.appendChild(rt("div","hint",`マージ距離は「距離でマージ」で使うしきい値です。
押し出しの太さは、尖らせたときの根元の広がり（辺の長さに対する割合）です。`)),i.appendChild(r)}if(t.compMode!=="object"){const r=$e("ソフト選択","SOFT SELECT");en(r,{label:"強度",value:t.soft.strength,min:0,max:1,step:.01,onInput:o=>e.onSoftChange("strength",o)}),en(r,{label:"範囲",value:t.soft.radius,min:.05,max:6,step:.05,onInput:o=>e.onSoftChange("radius",o)}),i.appendChild(r)}if(n){const r=Ms[n.kind];if(n.parametric&&r){const o=$e("入力ノード",r.en.toUpperCase()),a=rt("div","attr-title",n.name);a.appendChild(rt("span",void 0,r.en)),o.appendChild(a);for(const c of r.params)en(o,{label:c.label,value:n.params[c.key]??c.value,min:c.min,max:c.max,step:c.step,onInput:l=>e.onParamInput(n,c.key,l),onCommit:()=>e.onParamCommit(n,`${c.label} を変更`)});o.appendChild(rt("div","hint",`パラメトリックなので、値を変えると作り直されます。
編集すると通常のメッシュになります。`)),i.appendChild(o)}else{const o=$e("メッシュ","MESH"),a=n.mesh.stats();o.appendChild(rt("div","attr-title",n.name)),o.appendChild(rt("div","hint",`頂点 ${a.vertices} · エッジ ${a.edges} · 面 ${a.faces}`)),i.appendChild(o)}}const s=$e("表示","DISPLAY");en(s,{label:"スムージング角度",value:t.smoothAngle,min:0,max:180,step:1,format:r=>`${Math.round(r)}°`,onInput:r=>e.onSmoothAngleChange(r)}),en(s,{label:"マニピュレータの大きさ",value:t.manipSize,min:.5,max:2,step:.05,format:r=>`×${r.toFixed(2)}`,onInput:r=>e.onManipSizeChange(r)}),i.appendChild(s),i.children.length||i.appendChild(rt("div","empty","選択すると内容が出ます"))}function zM(i,t,e,n){if(i.textContent="",!t.length){i.appendChild(rt("div","empty",`オブジェクトがありません
ツール列から追加してください`));return}for(const s of t){const r=rt("button","olrow");r.setAttribute("aria-selected",String(s===e)),r.appendChild(rt("i","dot")),r.appendChild(rt("span","nm",s.name)),r.appendChild(rt("span","ty",s.parametric?s.kind:"mesh")),VM(r,s,n),i.appendChild(r)}}function VM(i,t,e){let n=null,s=0,r=0,o=!1,a=0;i.addEventListener("touchstart",l=>l.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",l=>l.preventDefault()),i.addEventListener("pointerdown",l=>{if(s=l.clientX,r=l.clientY,o=!1,l.pointerType==="mouse"&&l.button===2){o=!0,e.onOutlinerMenu(t,l.clientX,l.clientY);return}n=setTimeout(()=>{o=!0,e.onOutlinerMenu(t,s,r)},420)});const c=()=>{n!==null&&clearTimeout(n),n=null};i.addEventListener("pointermove",l=>{Math.hypot(l.clientX-s,l.clientY-r)>12&&c()}),i.addEventListener("pointerup",()=>{if(c(),o)return;const l=performance.now();if(l-a<400){a=0,HM(i,t,e);return}a=l,e.onSelect(t)}),i.addEventListener("pointercancel",c)}function HM(i,t,e){const n=i.querySelector(".nm");if(!n)return;const s=rt("input","olinput");s.value=t.name,n.replaceWith(s),s.focus(),s.select();let r=!1;const o=a=>{if(r)return;r=!0,a&&s.value.trim()&&e.onRename(t,s.value.trim());const c=rt("span","nm",t.name);s.replaceWith(c)};s.addEventListener("blur",()=>o(!0)),s.addEventListener("keydown",a=>{a.key==="Enter"&&o(!0),a.key==="Escape"&&o(!1)})}const Rn=(i,t,e)=>({label:i,detail:t,note:e}),GM={sculpt:{kicker:"未実装 — v1.5 の中核",title:"スカルプト",body:"モデリングモードで作ったローモデルを、クリースとディバイドでハイメッシュ化します。ディバイドスライダーを下げてモデリングに戻り頂点を編集すると、ハイメッシュのディテールを保ったままローモデルを調整できます。左のゲージはそのまま「ブラシ強度」と「ブラシサイズ」に置き換わります。",items:[Rn("ブラシ","Standard / Clay / Move / Smooth / Pinch / Inflate / Flatten / Trim / Polish","11 種"),Rn("サブディビジョン","接空間デルタによるマルチ解像度スタック","docs/03"),Rn("マスキング","ペン描画、キャビティ、ポリグループ、裏面マスク","自前実装"),Rn("対称","X / Y / Z 軸対称と放射状対称","自前実装"),Rn("レイヤー","レベルごとのデルタバッファと強度スライダー","v1.5")]},material:{kicker:"未実装 — v2.0 予定",title:"マテリアル",body:"2D ビュー（UV 空間）と 3D ビューを同時に表示し、両方で同期してペイントします。Substance のファイル形式は非公開のため直接は読めません。書き出したテクスチャセットを命名規則で自動認識する方式で対応します。左のゲージは「不透明度」と「ブラシサイズ」に置き換わります。",items:[Rn("チャンネル","BaseColor / Roughness / Metallic / Normal / Height / AO / Emissive","7 種"),Rn("レイヤー","塗り、ペイント、マスク、フォルダ、ブレンドモード","自前実装"),Rn("ベイク","法線、AO、カーブチャ、厚み、ポジション、ID","2K 既定"),Rn("読み込み","テクスチャセット（PNG / TGA / EXR）と MaterialX",".sbsar 不可"),Rn("書き出し","テクスチャセット、glTF、MaterialX","自前実装")]}};function WM(i){const t=rt("div","stub"),e=rt("div","stub-in");e.appendChild(rt("div","kicker",i.kicker)),e.appendChild(rt("h2",void 0,i.title)),e.appendChild(rt("p",void 0,i.body));const n=rt("ul");for(const s of i.items){const r=rt("li");r.appendChild(rt("b",void 0,s.label)),r.appendChild(rt("span",void 0,s.detail)),r.appendChild(rt("em",void 0,s.note)),n.appendChild(r)}return e.appendChild(n),t.appendChild(e),t}const qe={face:new bn({color:7776477,transparent:!0,opacity:.3,side:Ge,depthWrite:!1}),faceSel:new bn({color:15765820,transparent:!0,opacity:.5,side:Ge,depthWrite:!1}),wire:new ye({color:15134454}),seam:new ye({color:16739146}),wireSel:new ye({color:15765820}),point:new rn({color:12033002,size:6,sizeAttenuation:!1}),pointSel:new rn({color:15765820,size:9,sizeAttenuation:!1}),pin:new rn({color:7139450,size:11,sizeAttenuation:!1}),border:new ye({color:9675181}),manip:new ye({color:14862432}),manipHot:new ye({color:16770688}),manipCenter:new rn({color:14862432,size:10,sizeAttenuation:!1}),manipPivot:new ye({color:10149450}),manipPivotPoint:new rn({color:10149450,size:12,sizeAttenuation:!1})};function XM(i){const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d"),s=256/i;for(let o=0;o<i;o++)for(let a=0;a<i;a++)n.fillStyle=(a+o)%2===0?"#333a42":"#282e35",n.fillRect(a*s,o*s,s,s);const r=new Mu(e);return r.wrapS=Ni,r.wrapT=Ni,r.magFilter=Re,r}class $M{constructor(t,e){this.container=t,this.renderer=new Fu({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(2106410,1),this.scene.add(this.group),this.buildBackground(),this.resize()}renderer;scene=new Qa;camera=new tr(-.2,1.2,1.2,-.2,-10,10);center={u:.5,v:.5};span=1.4;checkerCells=8;group=new Qa;topology=null;frame=0;background=null;buildBackground(){this.background&&(this.scene.remove(this.background),this.background.geometry.dispose(),this.background.material.map?.dispose(),this.background.material.dispose());const t=new Qs(1,1);t.translate(.5,.5,0);const e=new bn({map:XM(this.checkerCells)}),n=new be(t,e);n.position.z=-1,this.scene.add(n),this.background=n;const s=new he;s.setAttribute("position",new Jt([0,0,0,1,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,1,0,0,0,0],3));const r=new In(s,qe.border);r.position.z=-.5,this.scene.add(r)}setCheckerCells(t){this.checkerCells=t,this.buildBackground()}get cells(){return this.checkerCells}resize(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.applyCamera()}applyCamera(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1,n=t/e,s=this.span/2,r=n>=1?s*n:s,o=n>=1?s:s/n;this.camera.left=this.center.u-r,this.camera.right=this.center.u+r,this.camera.top=this.center.v+o,this.camera.bottom=this.center.v-o,this.camera.updateProjectionMatrix()}pixelToUv(){const t=this.container.clientHeight||1;return(this.camera.top-this.camera.bottom)/t}pan(t,e){const n=this.pixelToUv();this.center.u-=t*n,this.center.v+=e*n,this.applyCamera()}zoom(t){this.span=Math.max(.02,Math.min(20,this.span*t)),this.applyCamera()}frameUnit(){this.center={u:.5,v:.5},this.span=1.4,this.applyCamera()}framepoints(t){if(!t.length)return this.frameUnit();let e=1/0,n=1/0,s=-1/0,r=-1/0;for(const o of t)e=Math.min(e,o.u),s=Math.max(s,o.u),n=Math.min(n,o.v),r=Math.max(r,o.v);this.center={u:(e+s)/2,v:(n+r)/2},this.span=Math.max(.05,Math.max(s-e,r-n)*1.5),this.applyCamera()}toUv(t){const e=this.container.clientWidth||1,n=this.container.clientHeight||1;return{u:this.camera.left+t.x/e*(this.camera.right-this.camera.left),v:this.camera.top-t.y/n*(this.camera.top-this.camera.bottom)}}toScreen(t,e){const n=this.container.clientWidth||1,s=this.container.clientHeight||1;return{x:(t-this.camera.left)/(this.camera.right-this.camera.left)*n,y:(this.camera.top-e)/(this.camera.top-this.camera.bottom)*s}}get uvTopology(){return this.topology}build(t,e){for(const p of this.group.children.slice())this.group.remove(p),(p instanceof be||p instanceof In||p instanceof dn)&&p.geometry.dispose();if(this.topology=null,!t)return;const n=t.mesh,s=n.uvSets.get(Le);if(!s)return;const r=e?.seams??new Set,o=er(n,r),a=[],c=[],l=[],h=new Map,u=new Map;o.forEach((p,g)=>{for(const _ of p.faces)u.set(_,g);const x=Ic(n,p,r),y=a.length;for(let _=0;_<x.count;_++)a.push([]),c.push(0,0),l.push(g);for(const _ of p.corners){const w=y+x.localOf.get(_);a[w].push(_),h.set(_,w);const S=He(n,_);c[w*2]=s[S*2],c[w*2+1]=s[S*2+1]}});const f=[],d=[],m=[],v=new Set;for(let p=0;p<n.faceCount;p++){const g=n.faceVerts(p),x=u.get(p)??0;for(let y=0;y<g.length;y++){const _=h.get(jn(p,y)),w=h.get(jn(p,(y+1)%g.length));if(_===void 0||w===void 0)continue;const S=`${Math.min(_,w)}_${Math.max(_,w)}`;if(v.has(S))continue;v.add(S),f.push([_,w]),d.push(x);const A=g[y],M=g[(y+1)%g.length];m.push(`${Math.min(A,M)}_${Math.max(A,M)}`)}}this.topology={charts:o,vertexCorners:a,vertexUv:Float32Array.from(c),vertexChart:Int32Array.from(l),edges:f,edgeChart:Int32Array.from(d),edgeKeys:m,cornerToVertex:h,chartOfFace:u},this.draw(t,r)}draw(t,e){const n=this.topology,s=t.mesh,r=[],o=[];for(let v=0;v<n.vertexUv.length/2;v++)r.push(n.vertexUv[v*2],n.vertexUv[v*2+1],0);for(let v=0;v<s.faceCount;v++){const p=s.faceSize(v),g=[];for(let x=0;x<p;x++){const y=this.vertexOfCorner(jn(v,x));y>=0&&g.push(y)}if(!(g.length<3))for(let x=1;x<g.length-1;x++)o.push(g[0],g[x],g[x+1])}const a=new he;a.setAttribute("position",new Jt(r,3)),a.setIndex(o);const c=new be(a,qe.face);c.renderOrder=0,this.group.add(c);const l=[],h=[],u=this.pixelToUv();n.edges.forEach(([v,p],g)=>{const x=n.vertexUv[v*2],y=n.vertexUv[v*2+1],_=n.vertexUv[p*2],w=n.vertexUv[p*2+1];if(!e.has(n.edgeKeys[g])){l.push(x,y,.01,_,w,.01);return}const S=_-x,A=w-y,M=Math.hypot(S,A)||1,T=-A/M*u,P=S/M*u;for(const R of[-1,0,1])h.push(x+T*R,y+P*R,.02,_+T*R,w+P*R,.02)});for(const[v,p]of[[l,qe.wire],[h,qe.seam]]){if(!v.length)continue;const g=new he;g.setAttribute("position",new Jt(v,3));const x=new In(g,p);x.renderOrder=1,this.group.add(x)}const f=[];for(let v=0;v<n.vertexUv.length/2;v++)f.push(n.vertexUv[v*2],n.vertexUv[v*2+1],.02);const d=new he;d.setAttribute("position",new Jt(f,3));const m=new dn(d,qe.point);m.renderOrder=2,this.group.add(m)}vertexOfCorner(t){return this.topology?.cornerToVertex.get(t)??-1}overlay=[];highlight(t,e,n,s){for(const o of this.overlay)this.group.remove(o),o.geometry.dispose();this.overlay=[];const r=this.topology;if(!(!r||!s)){if(t==="vertex"&&e.size){const o=[];for(const a of e)o.push(r.vertexUv[a*2],r.vertexUv[a*2+1],.05);this.addOverlay(new dn(ss(o),qe.pointSel))}if(t==="edge"&&e.size){const o=[];for(const a of e){const[c,l]=r.edges[a]??[0,0];o.push(r.vertexUv[c*2],r.vertexUv[c*2+1],.05,r.vertexUv[l*2],r.vertexUv[l*2+1],.05)}this.addOverlay(new In(ss(o),qe.wireSel))}if(t==="shell"&&e.size){const o=[],a=[];for(const l of e){const h=r.charts[l];if(h)for(const u of h.faces){const f=s.mesh.faceSize(u),d=[];for(let m=0;m<f;m++){const v=this.vertexOfCorner(jn(u,m));v<0||(d.push(o.length/3),o.push(r.vertexUv[v*2],r.vertexUv[v*2+1],.04))}for(let m=1;m<d.length-1;m++)a.push(d[0],d[m],d[m+1])}}const c=ss(o);c.setIndex(a),this.addOverlay(new be(c,qe.faceSel))}if(n.size){const o=[];for(const a of n)o.push(r.vertexUv[a*2],r.vertexUv[a*2+1],.06);this.addOverlay(new dn(ss(o),qe.pin))}}}manip=null;manipPoints=null;drawManipulator(t,e,n,s){for(const f of[this.manip,this.manipPoints])f&&(this.group.remove(f),f.geometry.dispose());if(this.manip=null,this.manipPoints=null,!t)return;const r=this.pixelToUv(),o=n*r,a=[],c=(f,d,m,v)=>{a.push(t.u+f,t.v+d,.08,t.u+m,t.v+v,.08)};if(c(0,0,o,0),c(o,0,o-o*.18,o*.09),c(o,0,o-o*.18,-o*.09),c(0,0,0,o),c(0,o,o*.09,o-o*.18),c(0,o,-o*.09,o-o*.18),!s){const f=o*.78,d=o*.07;c(f-d,f-d,f+d,f-d),c(f+d,f-d,f+d,f+d),c(f+d,f+d,f-d,f+d),c(f-d,f+d,f-d,f-d),c(0,0,f-d,f-d);const m=o*1.15,v=48;for(let p=0;p<v;p++){const g=p/v*Math.PI*2,x=(p+1)/v*Math.PI*2;c(Math.cos(g)*m,Math.sin(g)*m,Math.cos(x)*m,Math.sin(x)*m)}}const l=ss(a),h=new In(l,s?qe.manipPivot:e>=0?qe.manipHot:qe.manip);h.renderOrder=6,this.group.add(h),this.manip=h;const u=new dn(ss([t.u,t.v,.09]),s?qe.manipPivotPoint:qe.manipCenter);u.renderOrder=7,this.group.add(u),this.manipPoints=u}pickManipulator(t,e,n,s){if(!e)return-1;const r=this.toUv(t),o=this.pixelToUv(),a=(r.u-e.u)/o,c=(r.v-e.v)/o,l=Math.hypot(a,c);return l<14?3:!s&&((u,f)=>Math.hypot(a-u,c-f)<14)(n*.78,n*.78)?23:a>10&&a<n*1.1&&Math.abs(c)<12?0:c>10&&c<n*1.1&&Math.abs(a)<12?1:!s&&Math.abs(l-n*1.15)<12?10:-1}addOverlay(t){t.renderOrder=5,this.group.add(t),this.overlay.push(t)}pickVertex(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t),r=e*this.pixelToUv();let o=-1,a=r;for(let c=0;c<n.vertexUv.length/2;c++){const l=Math.hypot(n.vertexUv[c*2]-s.u,n.vertexUv[c*2+1]-s.v);l<a&&(a=l,o=c)}return o}pickEdge(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t),r=e*this.pixelToUv();let o=-1,a=r;return n.edges.forEach(([c,l],h)=>{const u=n.vertexUv[c*2],f=n.vertexUv[c*2+1],d=n.vertexUv[l*2],m=n.vertexUv[l*2+1],v=d-u,p=m-f,g=v*v+p*p,x=g>1e-12?Math.max(0,Math.min(1,((s.u-u)*v+(s.v-f)*p)/g)):0,y=Math.hypot(u+v*x-s.u,f+p*x-s.v);y<a&&(a=y,o=h)}),o}pickFace(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t);for(let r=0;r<e.mesh.faceCount;r++){const o=e.mesh.faceSize(r),a=[];for(let c=0;c<o;c++){const l=this.vertexOfCorner(jn(r,c));l<0||a.push([n.vertexUv[l*2],n.vertexUv[l*2+1]])}if(a.length>=3&&qM(a,s.u,s.v))return r}return-1}start(){const t=()=>{this.frame=requestAnimationFrame(t),this.renderer.render(this.scene,this.camera)};this.frame||t()}stop(){this.frame&&cancelAnimationFrame(this.frame),this.frame=0}}function ss(i){const t=new he;return t.setAttribute("position",new Jt(i,3)),t}function qM(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++){const[o,a]=i[s],[c,l]=i[r];a>e!=l>e&&t<(c-o)*(e-a)/(l-a)+o&&(n=!n)}return n}const YM=20,KM=14;class ZM{constructor(t,e,n){this.pane=t,this.host=n,this.view=new $M(t,e),this.router=new uf(e,s=>this.local(s),this.handlers()),this.router.attach()}view;router;unit="shell";chosen=new Set;pinned=new Set;drag=null;gesture=null;marquee=null;menuOpened=!1;manipDrag=null;pivotOverride=null;cancelPress(){this.menuOpened=!0,this.marquee=null,this.host.marquee(null),this.drag=null,this.manipDrag=null}local(t){const e=this.pane.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}start(){this.view.start()}stop(){this.view.stop()}resize(){this.view.resize()}stats(){const t=this.host.object(),e=this.host.recipe(),n={vertex:"UV 頂点",edge:"UV エッジ",shell:"UV シェル"}[this.unit];if(!t||!e)return{charts:0,maxStretch:1,unit:n};let s=1;const r=this.view.uvTopology;if(r)for(const o of r.charts){const a=Ic(t.mesh,o,e.seams),c=t.mesh.uvSets.get(Le);if(!c)continue;const l=new Float64Array(a.count*2);for(const h of o.corners){const u=a.localOf.get(h),f=He(t.mesh,h);l[u*2]=c[f*2],l[u*2+1]=c[f*2+1]}s=Math.max(s,Gu(a.positions,a.tri,l).maxStretch)}return{charts:r?.charts.length??0,maxStretch:s,unit:n}}rebuild(){const t=this.host.object();this.view.build(t,this.host.recipe()),this.syncPins(),this.refreshHighlight()}refreshHighlight(){this.view.highlight(this.unit,this.chosen,this.pinned,this.host.object()),this.refreshManipulator()}setUnit(t){this.unit!==t&&(this.unit=t,this.chosen.clear(),this.pivotOverride=null,this.refreshHighlight(),this.host.changed(null))}syncPins(){this.pinned.clear();const t=this.view.uvTopology,e=this.host.recipe();if(!(!t||!e))for(const n of e.pins.keys()){const s=t.cornerToVertex.get(n);s!==void 0&&this.pinned.add(s)}}syncFromView(t,e){const n=this.view.uvTopology,s=this.host.object();if(!(!n||!s)){if(t==="vertex"){this.unit="vertex",this.chosen.clear();const r=new Set(e.verts??[]);for(let o=0;o<n.vertexCorners.length;o++)for(const a of n.vertexCorners[o]??[]){const[c,l]=a.split(":").map(Number),h=s.mesh.faceVerts(c);if(h[l]!==void 0&&r.has(h[l])){this.chosen.add(o);break}}}else if(t==="edge"){this.unit="edge",this.chosen.clear();const r=new Set(e.edges??[]);n.edgeKeys.forEach((o,a)=>{r.has(o)&&this.chosen.add(a)})}else{this.unit="shell",this.chosen.clear();for(const r of e.faces??[]){const o=n.chartOfFace.get(r);o!==void 0&&this.chosen.add(o)}}this.refreshHighlight()}}pushToViewForTest(){this.pushToView()}pushToView(){const t=this.view.uvTopology,e=this.host.object();if(!t||!e){this.host.syncToView({mode:"face",verts:[],edges:[],faces:[]});return}if(this.unit==="vertex"){const n=new Set;for(const s of this.chosen)for(const r of t.vertexCorners[s]??[]){const[o,a]=r.split(":").map(Number),c=e.mesh.faceVerts(o);c[a]!==void 0&&n.add(c[a])}this.host.syncToView({mode:"vertex",verts:[...n].sort((s,r)=>s-r),edges:[],faces:[]});return}if(this.unit==="edge"){const n=new Set;for(const s of this.chosen){const r=t.edgeKeys[s];r&&n.add(r)}this.host.syncToView({mode:"edge",verts:[],edges:[...n].sort(),faces:[]});return}this.host.syncToView({mode:"face",verts:[],edges:[],faces:this.facesOfSelection()})}facesOfSelection(){const t=this.view.uvTopology;if(!t)return[];const e=new Set;if(this.unit==="shell")for(const n of this.chosen)for(const s of t.charts[n]?.faces??[])e.add(s);else{const n=[];if(this.unit==="vertex")for(const s of this.chosen)n.push(...t.vertexCorners[s]??[]);else for(const s of this.chosen){const[r,o]=t.edges[s]??[-1,-1];n.push(...t.vertexCorners[r]??[],...t.vertexCorners[o]??[])}for(const s of n)e.add(Number(s.slice(0,s.indexOf(":"))))}return[...e].sort((n,s)=>n-s)}selectedCorners(){const t=this.view.uvTopology;if(!t)return{corners:[],chart:-1};const e=[];let n=-1;const s=r=>{n<0&&(n=r)};if(this.unit==="shell")for(const r of this.chosen){s(r);for(const o of t.charts[r]?.corners??[])e.push(o)}else if(this.unit==="vertex")for(const r of this.chosen)s(t.vertexChart[r]),e.push(...t.vertexCorners[r]??[]);else for(const r of this.chosen){s(t.edgeChart[r]);const[o,a]=t.edges[r]??[-1,-1];e.push(...t.vertexCorners[o]??[],...t.vertexCorners[a]??[])}return{corners:[...new Set(e)],chart:n}}captureBase(t){const e=this.host.object(),n=new Map;if(!e)return n;const s=e.mesh.uvSets.get(Le);if(!s)return n;for(const r of t){const o=He(e.mesh,r);o>=0&&n.set(r,[s[o*2],s[o*2+1]])}return n}applyOffset(t,e,n,s=1,r=0,o){const a=this.host.object();if(!a)return;const c=a.mesh.uvSets.get(Le);if(!c)return;const l=o??Kh(t),h=Math.cos(r),u=Math.sin(r);for(const[f,d]of t){const m=He(a.mesh,f);if(m<0)continue;const v=(d[0]-l.u)*s,p=(d[1]-l.v)*s;c[m*2]=l.u+v*h-p*u+e,c[m*2+1]=l.v+v*u+p*h+n}this.rebuildGeometryOnly()}manipulatorPivot(){if(this.pivotOverride)return this.pivotOverride;if(!this.view.uvTopology||!this.chosen.size)return null;const{corners:e}=this.selectedCorners();if(!e.length)return null;const n=this.host.object(),s=n?.mesh.uvSets.get(Le);if(!n||!s)return null;let r=1/0,o=1/0,a=-1/0,c=-1/0;for(const l of e){const h=He(n.mesh,l);h<0||(r=Math.min(r,s[h*2]),a=Math.max(a,s[h*2]),o=Math.min(o,s[h*2+1]),c=Math.max(c,s[h*2+1]))}return Number.isFinite(r)?{u:(r+a)/2,v:(o+c)/2}:null}refreshManipulator(){this.view.drawManipulator(this.manipulatorPivot(),this.manipDrag?.handle??-1,this.manipSizePx(),this.host.pivotEdit())}manipSizePx(){return 60*this.host.manipSize()}resetPivot(){this.pivotOverride=null,this.refreshManipulator()}beginManip(t,e,n){const s=this.view.toUv(e);if(this.host.pivotEdit()){this.manipDrag={handle:t,start:s,pivot:n,base:new Map,chart:-1,snapshot:null,moved:!1},this.refreshManipulator();return}const{corners:r,chart:o}=this.selectedCorners();r.length&&(this.manipDrag={handle:t,start:s,pivot:n,base:this.captureBase(r),chart:o,snapshot:this.host.snapshot(),moved:!1},this.refreshManipulator())}updateManip(t){const e=this.manipDrag;if(!e)return;const n=this.view.toUv(t),s=n.u-e.start.u,r=n.v-e.start.v;if(this.host.pivotEdit()){const l={u:e.pivot.u+s,v:e.pivot.v+r};e.handle===0&&(l.v=e.pivot.v),e.handle===1&&(l.u=e.pivot.u);const h=this.host.uvSnap();h?.kind==="grid"&&(l.u=Math.round(l.u/h.step)*h.step,l.v=Math.round(l.v/h.step)*h.step),this.pivotOverride=l,e.moved=!0,this.refreshManipulator(),this.host.hint(`ピボット <kbd>${l.u.toFixed(3)}, ${l.v.toFixed(3)}</kbd>`);return}if(e.moved=!0,e.handle===10){const l=Math.atan2(e.start.v-e.pivot.v,e.start.u-e.pivot.u),u=Math.atan2(n.v-e.pivot.v,n.u-e.pivot.u)-l;this.applyOffset(e.base,0,0,1,u,e.pivot),this.host.hint(`回転 <kbd>${(u*180/Math.PI).toFixed(1)}°</kbd>`);return}if(e.handle===23){const l=Math.hypot(e.start.u-e.pivot.u,e.start.v-e.pivot.v),h=Math.hypot(n.u-e.pivot.u,n.v-e.pivot.v),u=l>1e-6?Math.max(.02,h/l):1;this.applyOffset(e.base,0,0,u,0,e.pivot),this.host.hint(`スケール <kbd>×${u.toFixed(2)}</kbd>`);return}let o=e.handle===1?0:s,a=e.handle===0?0:r;const c=this.host.uvSnap();if(c){const l=Kh(e.base);if(c.kind==="grid"){const h=Math.round((l.u+o)/c.step)*c.step,u=Math.round((l.v+a)/c.step)*c.step;e.handle!==1&&(o=h-l.u),e.handle!==0&&(a=u-l.v)}}this.applyOffset(e.base,o,a,1,0,e.pivot),this.host.hint(`移動 <kbd>${o.toFixed(3)}, ${a.toFixed(3)}</kbd>`)}endManip(){const t=this.manipDrag;if(this.manipDrag=null,!!t){if(t.moved&&!this.host.pivotEdit()&&t.snapshot!==null){const e=t.handle===10?"UV を回転":t.handle===23?"UV をスケール":"UV を移動";this.recordFrom(t.base,t.chart)&&this.host.commit(e,t.snapshot),this.host.changed(null)}this.refreshManipulator()}}recordFrom(t,e){const n=this.host.object(),s=this.host.recipe(),r=this.view.uvTopology;if(!n||!s||!r||e<0)return!1;const o=n.mesh.uvSets.get(Le),a=r.charts[e]?.fingerprint;if(!o||!a)return!1;const c=new Map;let l=!1;for(const[h,u]of t){const f=He(n.mesh,h);if(f<0)continue;const d=o[f*2]-u[0],m=o[f*2+1]-u[1];Math.abs(d)<1e-9&&Math.abs(m)<1e-9||(c.set(h,[d,m]),l=!0)}return l&&Kx(s,a,c),l}rebuildGeometryOnly(){this.view.build(this.host.object(),this.host.recipe()),this.refreshHighlight()}unfold(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;const n=this.host.snapshot(),s=e.method==="none";s&&(e.method="lscm");const r=os(t.mesh,e);this.host.commit("展開",n),this.rebuild(),this.host.changed(`展開 — 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}`+(s?"（LSCM に切り替えた）":""))}autoUnwrap(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;const n=this.host.snapshot(),s=Px(t.mesh,e.autoSeamParams,this.host.smoothAngle());e.seams=s,e.manual.clear(),e.pins.clear(),e.method="lscm";const r=os(t.mesh,e);this.host.commit("自動 UV",n),this.chosen.clear(),this.rebuild(),this.host.changed(`自動 UV — 切れ目 ${s.size} 本 / 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}`)}repack(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;if(e.method==="none"){this.host.toast("「取り込んだまま」では並べ直せません。先に展開してください");return}const n=this.host.snapshot();e.manual.clear();const s=os(t.mesh,e);this.host.commit("整列",n),this.rebuild(),this.host.changed(`整列 — 島 ${s.charts.length} を 0〜1 に詰めた`)}setMethod(t){const e=this.host.object(),n=this.host.recipe();if(!e||!n||n.method===t)return;const s=this.host.snapshot();if(n.method=t,t==="none"){const r=e.mesh.uvSets.get(Le);r&&(n.base=Float32Array.from(r),n.manual.clear())}os(e.mesh,n),this.host.commit("ソルバーの変更",s),this.rebuild(),this.host.changed({lscm:"LSCM",projection:"投影",none:"なし"}[t])}cutOrSew(t){const e=this.host.object(),n=this.host.recipe(),s=this.view.uvTopology;if(!e||!n||!s)return;if(!this.chosen.size){this.host.toast("先に選んでから実行してください");return}const r=this.edgesForCutSew(t),o=this.host.snapshot(),a=[];for(const c of r)(t?!n.seams.has(c):n.seams.has(c))&&(t?n.seams.add(c):n.seams.delete(c),a.push(c));if(!a.length){this.host.toast(t?"すでに切れています":"切れ目ではありません");return}!t&&n.method==="none"&&n.base&&Yx(e.mesh,n.base,a),os(e.mesh,n),this.host.commit(t?"カット":"ソー",o),this.chosen.clear(),this.rebuild(),this.host.changed(`${t?"カット":"ソー"} — ${a.length} 本`)}edgesForCutSew(t){const e=this.host.object(),n=this.view.uvTopology;if(!e||!n)return[];if(this.unit==="edge")return[...this.chosen].map(l=>n.edgeKeys[l]).filter(l=>!!l);if(this.unit==="vertex"){const l=new Set;for(const u of this.chosen)for(const f of n.vertexCorners[u]??[]){const[d,m]=f.split(":").map(Number),v=e.mesh.faceVerts(d);v[m]!==void 0&&l.add(v[m])}const h=new Set;for(const[u,f]of e.mesh.edges()){const d=l.has(u)&&l.has(f),m=l.size===1&&(l.has(u)||l.has(f));(d||m)&&h.add(Rt(u,f))}return[...h].sort()}const s=this.host.selectedFaces(),r=new Set(s.length?s:this.facesOfSelection()),o=l=>r.has(l),a=new Map;for(let l=0;l<e.mesh.faceCount;l++){const h=e.mesh.faceSize(l),u=e.mesh.faceVerts(l);for(let f=0;f<h;f++){const d=Rt(u[f],u[(f+1)%h]),m=a.get(d);m?m.push(l):a.set(d,[l])}}const c=[];for(const[l,h]of a){if(h.length!==2)continue;const[u,f]=h;(t?o(u)!==o(f):o(u)&&o(f))&&c.push(l)}return c.sort()}pinOrUnpin(t){const e=this.host.object(),n=this.host.recipe(),s=this.view.uvTopology;if(!e||!n||!s)return;if(this.unit!=="vertex"||!this.chosen.size){this.host.toast("UV 頂点を選んでから実行してください");return}const r=e.mesh.uvSets.get(Le);if(!r)return;const o=this.host.snapshot();for(const a of this.chosen)for(const c of s.vertexCorners[a]??[])if(t){const l=He(e.mesh,c);n.pins.set(c,[r[l*2],r[l*2+1]])}else n.pins.delete(c);this.host.commit(t?"ピン":"ピン解除",o),this.syncPins(),this.refreshHighlight(),this.host.changed(`${t?"ピン":"ピン解除"} — ${this.chosen.size} 点`)}tidy(t){const e=this.host.object();if(!e)return;const{corners:n,chart:s}=this.selectedCorners();if(n.length<2){this.host.toast("2 つ以上選んでから実行してください");return}const r=e.mesh.uvSets.get(Le);if(!r)return;const o=this.host.snapshot(),a=this.captureBase(n),c=[],l=new Map;for(const u of n){const f=He(e.mesh,u);f<0||(c.push(f),l.set(f,u))}const h={alignU:"整列 U",alignV:"整列 V",straighten:"直線化",merge:"マージ",symmetry:"対称"}[t];if(t==="alignU")zx(r,c);else if(t==="alignV")Vx(r,c);else if(t==="straighten")Hx(r,jM(r,c));else if(t==="merge")Gx(r,c,.01);else{const u=JM(r,c);if(!u.length){this.host.toast("対称の相手が見つかりません");return}Wx(r,u)}this.recordFrom(a,s),this.host.commit(h,o),this.rebuildGeometryOnly(),this.rebuild(),this.host.changed(h)}transformSelection(t){const e=this.host.object();if(!e)return;const{corners:n,chart:s}=this.selectedCorners();if(!n.length){this.host.toast("選択してから実行してください");return}const r=e.mesh.uvSets.get(Le);if(!r)return;const o=this.host.snapshot(),a=this.captureBase(n);let c=0,l=0;for(const[,h]of a)c+=h[0],l+=h[1];c/=a.size,l/=a.size;for(const[h,u]of a){const f=He(e.mesh,h),d=u[0]-c,m=u[1]-l;t==="flipU"?r[f*2]=c-d:t==="flipV"?r[f*2+1]=l-m:(r[f*2]=c-m,r[f*2+1]=l+d)}this.recordFrom(a,s),this.host.commit({flipU:"反転 U",flipV:"反転 V",rotate90:"90° 回転"}[t],o),this.rebuildGeometryOnly(),this.host.changed(null)}handlers(){return{toolDown:(t,e)=>this.down(t,e),toolMove:t=>this.move(t),toolUp:(t,e,n)=>this.up(t,e,n),hover:()=>{},hoverLeave:()=>{},openMarkingMenu:(t,e,n)=>{this.cancelPress(),this.host.markingMenu(t,e,n)},openTwoFingerMenu:(t,e)=>{this.cancelPress(),this.host.markingMenu(t,e,!0)},openCameraMenu:(t,e)=>{this.cancelPress(),this.host.cameraMenu(t,e)},undo:()=>this.host.undo(),redo:()=>this.host.redo(),abort:()=>{this.drag=null,this.gesture=null,this.manipDrag=null,this.marquee=null,this.host.marquee(null)},transformBegin:()=>this.gestureBegin(),transformUpdate:t=>this.gestureUpdate(t),transformEnd:()=>this.gestureEnd(),isOnMesh:()=>!0,zoomPivot:()=>null,marqueeStart:()=>{},tumble:()=>{},pan:(t,e)=>this.view.pan(t,e),dolly:t=>this.view.zoom(t),dollyAbout:(t,e)=>this.view.zoom(e),shiftOn:t=>this.host.shiftOn(t),altOn:()=>!1}}down(t,e){const n=this.host.object();if(!n)return;this.menuOpened=!1;const s=this.host.shiftOn(e),r=this.host.ctrlOn(e),o=this.manipulatorPivot();if(o&&!s&&!r){const c=this.view.pickManipulator(t,o,this.manipSizePx(),this.host.pivotEdit());if(c>=0){this.beginManip(c,t,o);return}}const a=this.pick(t,n);if(a>=0&&this.chosen.has(a)&&!s&&!r){this.beginDrag(t,e);return}if(a<0){this.marquee={x0:t.x,y0:t.y,x1:t.x,y1:t.y,add:s,sub:r,moved:!1};return}r?this.chosen.delete(a):(s||this.chosen.clear(),this.chosen.add(a)),this.refreshHighlight(),this.pushToView(),this.beginDrag(t,e)}updateMarquee(t){const e=this.marquee;e&&(e.x1=t.x,e.y1=t.y,(Math.abs(e.x1-e.x0)>ds||Math.abs(e.y1-e.y0)>ds)&&(e.moved=!0),this.host.marquee(e.moved?{x0:e.x0,y0:e.y0,x1:e.x1,y1:e.y1}:null))}applyMarquee(t){const e=this.topologyOrNull();if(!e)return;const n=this.view.toUv({x:Math.min(t.x0,t.x1),y:Math.max(t.y0,t.y1)}),s=this.view.toUv({x:Math.max(t.x0,t.x1),y:Math.min(t.y0,t.y1)}),r=(a,c)=>a>=n.u&&a<=s.u&&c>=n.v&&c<=s.v;!t.add&&!t.sub&&this.chosen.clear();const o=a=>{t.sub?this.chosen.delete(a):this.chosen.add(a)};if(this.unit==="vertex")for(let a=0;a<e.vertexUv.length/2;a++)r(e.vertexUv[a*2],e.vertexUv[a*2+1])&&o(a);else if(this.unit==="edge")e.edges.forEach(([a,c],l)=>{const h=(e.vertexUv[a*2]+e.vertexUv[c*2])/2,u=(e.vertexUv[a*2+1]+e.vertexUv[c*2+1])/2;r(h,u)&&o(l)});else{const a=new Set;for(let c=0;c<e.vertexUv.length/2;c++)r(e.vertexUv[c*2],e.vertexUv[c*2+1])&&a.add(e.vertexChart[c]);for(const c of a)o(c)}this.refreshHighlight(),this.pushToView()}topologyOrNull(){return this.view.uvTopology}pick(t,e){if(this.unit==="vertex")return this.view.pickVertex(t,YM);if(this.unit==="edge")return this.view.pickEdge(t,KM);const n=this.view.pickFace(t,e);return n<0?-1:this.view.uvTopology?.chartOfFace.get(n)??-1}beginDrag(t,e){const{corners:n,chart:s}=this.selectedCorners();n.length&&(this.drag={start:t,base:this.captureBase(n),chart:s,snapshot:this.host.snapshot(),moved:!1,pending:e.pointerType!=="mouse",t0:performance.now()})}move(t){if(this.manipDrag)return this.updateManip(t);if(this.marquee)return this.updateMarquee(t);const e=this.drag;if(!e)return;if(e.pending){const a=Math.hypot(t.x-e.start.x,t.y-e.start.y),c=performance.now()-e.t0;if(a<=Uc&&!(a>ds&&c>Nc))return;e.pending=!1}const n=this.view.pixelToUv();let s=(t.x-e.start.x)*n,r=-(t.y-e.start.y)*n;const o=this.host.uvSnap();if(o&&e.base.size){const a=this.anchorCorner(e,t);if(a){const c=[a[1][0]+s,a[1][1]+r],l=o.kind==="grid"?[Math.round(c[0]/o.step)*o.step,Math.round(c[1]/o.step)*o.step]:this.nearestUvVertex(c,e.base);l&&(s=l[0]-a[1][0],r=l[1]-a[1][1])}}(Math.abs(s)>1e-9||Math.abs(r)>1e-9)&&(e.moved=!0),this.applyOffset(e.base,s,r),this.host.hint((o?`スナップ ${o.kind==="grid"?"グリッド":"UV 頂点"} · `:"")+`移動 <kbd>${s.toFixed(3)}, ${r.toFixed(3)}</kbd>`)}anchorCorner(t,e){let n=null,s=1/0;for(const[r,o]of t.base){const a=this.view.toScreen(o[0],o[1]),c=Math.hypot(a.x-e.x,a.y-e.y);c<s&&(s=c,n=[r,o])}return n}nearestUvVertex(t,e){const n=this.host.object(),s=this.view.uvTopology;if(!n||!s)return null;const r=n.mesh.uvSets.get(Le);if(!r)return null;const o=this.view.toScreen(t[0],t[1]);let a=null,c=40;for(let l=0;l<s.vertexCorners.length;l++){const h=s.vertexCorners[l]??[];if(!h.length||h.some(m=>e.has(m)))continue;const u=He(n.mesh,h[0]);if(u<0)continue;const f=this.view.toScreen(r[u*2],r[u*2+1]),d=Math.hypot(f.x-o.x,f.y-o.y);d<c&&(c=d,a=[r[u*2],r[u*2+1]])}return a}up(t,e,n){if(this.manipDrag){this.endManip();return}const s=this.marquee;this.marquee=null,this.host.marquee(null);const r=this.drag;if(this.drag=null,this.menuOpened){this.menuOpened=!1;return}if(s){s.moved?this.applyMarquee(s):!s.add&&!s.sub&&this.chosen.size&&(this.chosen.clear(),this.refreshHighlight(),this.pushToView());return}!r||!r.moved||(this.recordFrom(r.base,r.chart)&&this.host.commit("UV を移動",r.snapshot),this.host.changed(null))}gestureBegin(){const{corners:t,chart:e}=this.selectedCorners();return t.length?(this.gesture={base:this.captureBase(t),chart:e,snapshot:this.host.snapshot(),moved:!1},!0):!1}gestureUpdate(t){const e=this.gesture;if(!e)return;e.moved=!0;const n=this.view.pixelToUv();if(t.kind==="scale"){this.applyOffset(e.base,0,0,Math.max(.02,t.scale)),this.host.hint(`スケール <kbd>×${t.scale.toFixed(2)}</kbd> · 指 3 本`);return}const s=t.axis==="horizontal"?t.pixels*n:0,r=t.axis==="vertical"?-t.pixels*n:0;this.applyOffset(e.base,s,r),this.host.hint(`移動 <kbd>${t.axis==="vertical"?"V":"U"} ${(s+r).toFixed(3)}</kbd> · 指 3 本`)}gestureEnd(){const t=this.gesture;this.gesture=null,!(!t||!t.moved)&&(this.recordFrom(t.base,t.chart)&&this.host.commit("UV を変形",t.snapshot),this.host.changed(null))}frame(){const t=this.view.uvTopology,{corners:e}=this.selectedCorners(),n=this.host.object();if(!t||!n||!e.length)return this.view.frameUnit();const s=n.mesh.uvSets.get(Le);if(!s)return this.view.frameUnit();this.view.framepoints(e.map(r=>{const o=He(n.mesh,r);return{u:s[o*2],v:s[o*2+1]}}))}}function Kh(i){let t=0,e=0;for(const[,n]of i)t+=n[0],e+=n[1];return i.size&&(t/=i.size,e/=i.size),{u:t,v:e}}function jM(i,t){if(t.length<3)return t;let e=0,n=0;for(const h of t)e+=i[h*2],n+=i[h*2+1];e/=t.length,n/=t.length;let s=0,r=0,o=0;for(const h of t){const u=i[h*2]-e,f=i[h*2+1]-n;s+=u*u,r+=u*f,o+=f*f}const a=.5*Math.atan2(2*r,s-o),c=Math.cos(a),l=Math.sin(a);return[...t].sort((h,u)=>(i[h*2]-e)*c+(i[h*2+1]-n)*l-((i[u*2]-e)*c+(i[u*2+1]-n)*l))}function JM(i,t){let e=1/0,n=-1/0;for(const l of t)e=Math.min(e,i[l*2]),n=Math.max(n,i[l*2]);const s=(e+n)/2,r=t.filter(l=>i[l*2]<s-1e-9),o=t.filter(l=>i[l*2]>s+1e-9),a=[],c=new Set;for(const l of r.sort((h,u)=>h-u)){let h=-1,u=1/0;for(const f of o){if(c.has(f))continue;const d=Math.hypot(s*2-i[l*2]-i[f*2],i[l*2+1]-i[f*2+1]);d<u&&(u=d,h=f)}h>=0&&(c.add(h),a.push([l,h]))}return a}const Z={move:'<path d="M12 3v18M3 12h18M12 3l-2.6 2.6M12 3l2.6 2.6M12 21l-2.6-2.6M12 21l2.6-2.6M3 12l2.6-2.6M3 12l2.6 2.6M21 12l-2.6-2.6M21 12l-2.6 2.6"/>',rotate:'<path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4"/><path d="M20.5 3.6v5h-5"/>',scale:'<path d="M5 19 18 6"/><path d="M12.5 6H18v5.5"/><rect x="3.2" y="15.2" width="5.6" height="5.6" rx=".8"/>',multicut:'<circle cx="5.5" cy="5.5" r="2.3"/><circle cx="5.5" cy="18.5" r="2.3"/><path d="M7.4 6.8 20 18M7.4 17.2 20 6"/>',extrude:'<path d="M4.5 13.5h8v7h-8z"/><path d="m4.5 13.5 4-4h8v7M12.5 13.5l4-4"/><path d="M20 3v5m0-5-1.8 1.8M20 3l1.8 1.8"/>',prim:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',camera:'<path d="M3.4 8.4h3.2l1.6-2.4h7.6l1.6 2.4h3.2v9.8a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1z"/><circle cx="12" cy="13" r="3.4"/>',shade:'<circle cx="12" cy="12" r="8.8"/><path d="M12 3.2a8.8 8.8 0 0 1 0 17.6z" fill="currentColor" fill-opacity=".5"/>',vObj:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/>',vVert:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="6" r="2" fill="currentColor"/><circle cx="6" cy="18" r="2" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/>',vEdge:'<rect x="6" y="6" width="12" height="12"/><path d="M6 6h12" stroke-width="3.4"/>',vFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".45"/>',vVertFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".2"/><circle cx="8.6" cy="8.6" r="2.1" fill="currentColor"/>',vMulti:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="1.9" fill="currentColor"/><path d="M6 18h12" stroke-width="3"/>',wire:'<rect x="4" y="4" width="16" height="16"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',shaded:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".5"/>',shadedWire:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".3"/><path d="M4 12h16M12 4v16"/>',smooth:'<circle cx="12" cy="12" r="8.6" fill="currentColor" fill-opacity=".5"/><path d="M8 15.4a6 6 0 0 1 5-6.6"/>',sym:'<path d="M12 3v18" stroke-dasharray="2.4 2.4"/><path d="M9.4 7 4.5 12l4.9 5zM14.6 7l4.9 5-4.9 5z"/>',xform:'<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="6.5"/><rect x="16.6" y="16.6" width="4.2" height="4.2"/><path d="M12 3l-2 2M12 3l2 2M3 12l2-2M3 12l2 2"/>',snap:'<path d="M6 20V10a6 6 0 0 1 12 0v10"/><path d="M6 15h4v5H6zM14 15h4v5h-4z"/>',pivot:'<circle cx="12" cy="12" r="2.2" fill="currentColor"/><path d="M12 2.6v5.6M12 15.8v5.6M2.6 12h5.6M15.8 12h5.6"/><circle cx="12" cy="12" r="6.6" stroke-dasharray="2.2 2.4"/>',rename:'<path d="M4 20h16"/><path d="M15.4 4.6 19 8.2 8.6 18.6 4.4 19.6l1-4.2z"/>',dup:'<rect x="3.6" y="3.6" width="12" height="12" rx="1"/><path d="M8.4 20.4h12v-12"/>',del:'<path d="M4 6.6h16M9.4 6.6V4.4h5.2v2.2M6.4 6.6l1 13.2a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l1-13.2"/>',frame:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3"/>',mModel:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',mUV:'<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="1"/><path d="M3.4 12h17.2M12 3.4v17.2" stroke-dasharray="2.6 2.2"/>',mSculpt:'<path d="M16.4 3.6 20.4 7.6 9.6 18.4l-5.2 1.2 1.2-5.2z"/><path d="m14.4 5.6 4 4"/>',mMaterial:'<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a8.6 8.6 0 0 1 0 17.2z" fill="currentColor" fill-opacity=".45"/><path d="M3.4 12h17.2"/>',pCube:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',pSphere:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',pCylinder:'<ellipse cx="12" cy="5.6" rx="7" ry="2.8"/><path d="M5 5.6v12.8M19 5.6v12.8"/><path d="M5 18.4a7 2.8 0 0 0 14 0"/>',pCone:'<path d="M12 3 19 18.4M12 3 5 18.4"/><ellipse cx="12" cy="18.4" rx="7" ry="2.8"/>',pTorus:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><ellipse cx="12" cy="12" rx="3.6" ry="1.9"/>',pPlane:'<path d="M2.6 16.4 9.4 6.6h12L14.6 16.4z"/><path d="M6 11.5h12"/>',pDisk:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><path d="M2.8 12h18.4"/>',pPlatonic:'<path d="m12 2.8 8.8 6.4-3.4 10.4H6.6L3.2 9.2z"/><path d="M12 2.8v16.8M3.2 9.2l13.8 10M20.8 9.2 7 19.2"/>'};function QM(i,t=18,e=1.6){return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">${i}</svg>`}const ty=["N","NE","E","SE","S","SW","W","NW"],as="http://www.w3.org/2000/svg",Ci=176,la=56,ey=42,pc=208,Vs=32,Zh=14;let De=null;function ny(i,t,e,n,s,r){const o=i+Math.cos(s)*n,a=t+Math.sin(s)*n,c=i+Math.cos(r)*n,l=t+Math.sin(r)*n,h=i+Math.cos(r)*e,u=t+Math.sin(r)*e,f=i+Math.cos(s)*e,d=t+Math.sin(s)*e;return`M${o},${a}A${n},${n} 0 0 1 ${c},${l}L${h},${u}A${e},${e} 0 0 0 ${f},${d}Z`}function kr(i,t,e,n){const s=document.createElementNS(as,"text");return i&&s.setAttribute("class",i),s.setAttribute("x",String(t)),s.setAttribute("y",String(e)),s.setAttribute("text-anchor","middle"),s.textContent=n,s}function Yn(i,t,e,n=[]){kc();const s=n.length?Zh+n.length*Vs:0,r=Math.max(Ci+16,Math.min(window.innerWidth-Ci-16,t)),o=Math.max(Ci+16,Math.min(window.innerHeight-Ci-s-16,e)),a=document.createElement("div");a.className="radial",a.addEventListener("touchstart",d=>d.preventDefault(),{passive:!1}),a.addEventListener("touchmove",d=>d.preventDefault(),{passive:!1});const c=document.createElementNS(as,"svg");a.appendChild(c),document.body.appendChild(a);const l=[];for(let d=0;d<8;d++){const m=i[ty[d]],v=(d*45-22.5-90)*Math.PI/180,p=(d*45+22.5-90)*Math.PI/180,g=document.createElementNS(as,"path");if(g.setAttribute("d",ny(r,o,la,Ci,v,p)),g.setAttribute("fill",m?"#2c3238":"#23272c"),g.setAttribute("stroke","#171a1e"),g.setAttribute("stroke-width","1"),g.setAttribute("opacity",m?"1":".45"),c.appendChild(g),!m){l.push(null);continue}const x=(v+p)/2,y=(la+Ci)/2,_=r+Math.cos(x)*y,w=o+Math.sin(x)*y,S=document.createElementNS(as,"g");S.setAttribute("transform",`translate(${_-12},${w-28}) scale(1)`),S.setAttribute("fill","none"),S.setAttribute("stroke","#dfe5ea"),S.setAttribute("stroke-width","1.6"),S.setAttribute("stroke-linecap","round"),S.setAttribute("stroke-linejoin","round"),S.innerHTML=m.icon??"",c.appendChild(S),c.appendChild(kr(null,_,w+12,m.label)),c.appendChild(kr("sub",_,w+26,m.sub??"")),l.push({path:g,icon:S,item:m,index:d})}const h=document.createElementNS(as,"circle");h.setAttribute("cx",String(r)),h.setAttribute("cy",String(o)),h.setAttribute("r",String(la-2)),h.setAttribute("fill","#20242a"),h.setAttribute("stroke","#3d454e"),c.appendChild(h),c.appendChild(kr("sub",r,o+4,"キャンセル"));const u=[],f=o+Ci+Zh;n.forEach((d,m)=>{const v=f+m*Vs,p=document.createElementNS(as,"rect");p.setAttribute("x",String(r-pc/2)),p.setAttribute("y",String(v)),p.setAttribute("width",String(pc)),p.setAttribute("height",String(Vs)),p.setAttribute("fill","#2c3238"),p.setAttribute("stroke","#171a1e"),c.appendChild(p);const g=kr(null,r,v+Vs/2+5,d.label);c.appendChild(g),u.push({rect:p,label:g,item:d,top:v})}),De={host:a,slices:l,rows:u,cx:r,cy:o,selected:-1,selectedRow:-1},window.addEventListener("pointermove",gf),window.addEventListener("pointerup",so),window.addEventListener("pointercancel",so)}function gf(i){if(!De)return;const t=i.clientX-De.cx,e=i.clientY-De.cy;let n=-1;Math.abs(t)<=pc/2&&(n=De.rows.findIndex(r=>i.clientY>=r.top&&i.clientY<r.top+Vs)),n!==De.selectedRow&&(De.rows.forEach((r,o)=>r.rect.setAttribute("fill",o===n?"#2f5f7d":"#2c3238")),De.selectedRow=n,n>=0&&navigator.vibrate?.(6));let s=-1;if(n<0&&Math.hypot(t,e)>=ey){const r=(Math.atan2(e,t)*180/Math.PI+90+360+22.5)%360,o=Math.floor(r/45);De.slices[o]&&(s=o)}if(s!==De.selected){for(const r of De.slices){if(!r)continue;const o=r.index===s;r.path.setAttribute("fill",o?"#2f5f7d":"#2c3238"),r.path.setAttribute("stroke",o?"#4f9fd1":"#171a1e"),r.icon.setAttribute("stroke",o?"#ffffff":"#dfe5ea")}De.selected=s,s>=0&&navigator.vibrate?.(6)}}function so(){if(!De)return;const{selected:i,selectedRow:t,slices:e,rows:n}=De;kc(),t>=0?n[t]?.item.run():i>=0&&e[i]?.item.run()}function kc(){De&&(window.removeEventListener("pointermove",gf),window.removeEventListener("pointerup",so),window.removeEventListener("pointercancel",so),De.host.remove(),De=null)}function jh(i,t,e){let n=null,s=!1,r=0,o=0,a=null;const c=()=>{n!==null&&clearTimeout(n),n=null};i.addEventListener("touchstart",u=>u.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",u=>u.preventDefault()),i.addEventListener("pointerdown",u=>{if(u.preventDefault(),a=u.pointerId,r=u.clientX,o=u.clientY,s=!1,u.pointerType==="mouse"&&u.button===2){s=!0,Yn(t(),r,o);return}n=setTimeout(()=>{s=!0,Yn(t(),r,o)},200)});const l=u=>{u.pointerId===a&&Math.hypot(u.clientX-r,u.clientY-o)>12&&c()},h=u=>{u.pointerId===a&&(c(),a=null,s||e?.(),s=!1)};window.addEventListener("pointermove",l),window.addEventListener("pointerup",h),window.addEventListener("pointercancel",h)}const ha=[{id:"object",label:"オブジェクト",key:"F8"},{id:"vertex",label:"頂点",key:"F9"},{id:"edge",label:"エッジ",key:"F10"},{id:"face",label:"フェース",key:"F11"}],cs=.5,$r=2,Jh=1.25;function iy(){const i=Number(localStorage.getItem("macbeth.manipSize"));return!Number.isFinite(i)||i<=0?1:Math.min($r,Math.max(cs,i))}const Ns={grid:"グリッド",vertex:"頂点",edge:"カーブ / エッジ",surface:"サーフェス"},sy={4:"wire",5:"shaded",6:"shadedWire",7:"smooth",8:"checker"},rs={model:"モデリング",uv:"UV",sculpt:"スカルプト",material:"マテリアル"},ry={object:Z.vObj,vertex:Z.vVert,edge:Z.vEdge,face:Z.vFace},oy={cube:Z.pCube,sphere:Z.pSphere,cylinder:Z.pCylinder,cone:Z.pCone,torus:Z.pTorus,plane:Z.pPlane,disk:Z.pDisk,platonic:Z.pPlatonic};class ay{state=new aM;history=new lM(this.state);viewport;picker;selector;autosave=new gM(this.state);hud=new kM(this.state);gauges=[];marqueeEl=It("marquee");marquee=null;popup=null;popupAnchor=null;syncingSelection=!1;router;manipulator;multicut;preselect;bevel=new yM;weldTarget=null;gestureDrag=null;uv=null;pushSelectionToUvForTest(){this.pushSelectionToUv()}uvSplit="both";gestureView=null;gestureMoved=!1;bevelSnapshot=null;docking;layout;zones={tools:"left",options:"rightTop",outliner:"rightBottom"};toolPanelBody=null;optionsBody=null;outlinerBody=null;paramSnapshot=null;drag=null;pendingDrag=null;slideDrag=null;pivotDrag=null;dragSnapshot=null;raycaster=new Tu;constructor(){const t=It("pane3d"),e=It("gl");this.viewport=new eM(t,e,this.state),this.picker=new j_(this.viewport,t),this.selector=new RM(this.state,this.picker,n=>{const s=this.state.doc.find(n);return s?this.viewport.viewOf(s):void 0}),this.multicut=new SM(this.state,this.picker,this.viewport.preview),this.preselect=new TM(this.state,this.picker,this.viewport.preselect),this.viewport.seamProvider=()=>this.state.selected?.uv?.seams??null,this.viewport.softWeightsProvider=()=>{const n=this.state.selected;return n?Wh(n.mesh,this.selector.selectedVertices(),{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0}).weights:new Map},this.manipulator=new rM({toScreen:n=>{const s=n.clone().project(this.viewport.camera);return{x:(s.x+1)/2*(t.clientWidth||1),y:(-s.y+1)/2*(t.clientHeight||1),z:s.z}},camera:()=>this.viewport.camera,orthoDistance:()=>this.state.camOpts.ortho?this.viewport.cam.distance:null,manipSize:()=>this.state.manipSize,pivotEdit:()=>this.state.pivotEdit}),this.state.manipSize=iy(),this.viewport.manip.add(this.manipulator.group),this.history.onChange=()=>{this.updateHistoryButtons(),this.autosave.schedule()},this.autosave.onSaved=n=>this.hud.setSaveNote(`自動保存 ${new Date(n).toLocaleTimeString("ja-JP",{timeStyle:"short"})}`),this.autosave.onError=n=>this.hud.toast(n),this.router=new uf(e,n=>this.picker.local(n),this.gestureHandlers()),this.router.attach(),this.docking=new LM(It("stage"),{onZoneChange:(n,s)=>{this.zones[n]=s,localStorage.setItem("macbeth.panelZones",JSON.stringify(this.zones))},onMessage:n=>this.hud.toast(n),onLayoutChange:()=>{this.layout?.apply(),this.viewport.resize()}});try{const n=localStorage.getItem("macbeth.panelZones");n&&(this.zones={...this.zones,...JSON.parse(n)})}catch{}this.buildToolDock(),this.buildPanels(),this.layout=new NM(It("stage"),It("dockColRight"),()=>this.viewport.resize()),this.buildGauges(),this.buildCluster(),this.bindKeyboard(),this.bindTopBar(),window.addEventListener("resize",()=>this.viewport.resize()),this.viewport.resize(),this.viewport.start()}async boot(){const t=await this.autosave.restore();t||this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]??null),this.viewport.syncAll(),this.refresh(),this.hud.defaultHint(),t?this.hud.toast("前回の続きを復元しました"):this.hud.setSaveNote(_M())}gestureHandlers(){return{toolDown:(t,e)=>this.startTool(t,e),toolMove:(t,e)=>this.moveTool(t,e),toolUp:(t,e,n)=>this.finishTool(t,e,n),hover:(t,e)=>{this.updateCutPreview(t,e),this.updatePreselect(t,e)},hoverLeave:()=>{this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},openMarkingMenu:(t,e,n)=>this.openMarkingMenu(t,e,n),openTwoFingerMenu:(t,e)=>this.openTwoFingerMenu(t,e),openCameraMenu:(t,e)=>{this.closePopup(),Yn(this.cameraMenu(),t,e,this.savedCameraItems())},undo:()=>this.doUndo(),redo:()=>this.doRedo(),abort:()=>{this.endMarquee(),this.drag=null,this.pendingDrag=null,this.pivotDrag=null,this.slideDrag=null,this.dragSnapshot=null,this.manipulator.hot=-1,this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},isOnMesh:(t,e)=>{const n=this.tolerance(e);return this.state.selected&&this.manipulator.pick(t,this.pivotWorld(),this.state.manip,n)>=0?!0:this.hitSelectedComponent(t,n)||!!this.picker.pickSurface(t)},zoomPivot:()=>this.pivotWorld(),marqueeStart:t=>this.startMarquee(t),tumble:(t,e)=>this.viewport.tumble(t,e),pan:(t,e)=>this.viewport.pan(t,e),dolly:t=>this.viewport.dolly(t),dollyAbout:(t,e)=>this.viewport.dollyAbout(t,e),transformBegin:()=>this.beginGestureTransform(),transformUpdate:t=>this.updateGestureTransform(t),transformEnd:()=>this.endGestureTransform(),shiftOn:t=>this.state.modOn("shift")||t.shiftKey,altOn:t=>this.state.modOn("alt")||t.altKey}}eulerOf(t){const e=new zn().setFromQuaternion(new an(t[0],t[1],t[2],t[3]),"XYZ"),n=180/Math.PI;return[e.x*n,e.y*n,e.z*n]}pixelToWorldAt(t){const e=new L().setFromMatrixColumn(this.viewport.camera.matrix,0),n=this.manipulator.toScreen(t),s=this.manipulator.toScreen(t.clone().add(e)),r=Math.hypot(s.x-n.x,s.y-n.y);return r>1e-6?1/r:.01}screenRightAxis(){const t=new L().setFromMatrixColumn(this.viewport.camera.matrix,0);return Math.abs(t.x)>=Math.abs(t.z)?new L(Math.sign(t.x)||1,0,0):new L(0,0,Math.sign(t.z)||1)}beginGestureTransform(){if(this.state.tool!=="select"||this.state.pivotEdit)return!1;const t=this.state.selected,e=this.pivotWorld();if(!t||!e)return!1;const n=this.captureTarget();if(!n)return!1;const s=this.manipulator.toScreen(e);return this.dragSnapshot=this.history.snapshot(),this.gestureDrag=$h({handle:nM,pivot:e,target:n,point:s,pivotScreen:s,ray:this.ray(s),cameraPosition:this.cameraPosition(),label:"変形"}),this.gestureView={pixelToWorld:this.pixelToWorldAt(e),horizontal:this.screenRightAxis()},this.gestureMoved=!1,!0}updateGestureTransform(t){const e=this.gestureDrag,n=this.gestureView,s=this.state.selected;if(!e||!n||!s)return;let r;if(t.kind==="scale")ra(e,s,{scale:t.scale}),r=`スケール <kbd>×${t.scale.toFixed(2)}</kbd>`;else if(t.axis==="vertical"){const o=-t.pixels*n.pixelToWorld;ra(e,s,{move:new L(0,o,0)}),r=`移動 <kbd>Y ${o>=0?"+":""}${o.toFixed(2)}</kbd>`}else{const o=t.pixels*n.pixelToWorld,a=n.horizontal;ra(e,s,{move:a.clone().multiplyScalar(o)});const c=a.x!==0?"X":"Z",l=o*(a.x!==0?a.x:a.z);r=`移動 <kbd>${c} ${l>=0?"+":""}${l.toFixed(2)}</kbd>`}if(this.gestureMoved=!0,e.target.kind==="object"){const o=this.viewport.viewOf(s);o&&(nn(o.group,s.transform),o.group.updateMatrixWorld())}else this.viewport.refreshPositions(s);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats(),It("hudHint").innerHTML=`${r} · 指 3 本`}endGestureTransform(){const t=this.gestureMoved;this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,t&&this.dragSnapshot&&this.history.commit("変形",this.dragSnapshot),this.dragSnapshot=null,this.refresh(),this.hud.defaultHint()}ray(t){return this.raycaster.setFromCamera(this.picker.ndc(t),this.viewport.camera),this.raycaster.ray}cameraPosition(){return this.viewport.camera.position}tolerance(t){return t.pointerType==="touch"?iM:1}hitSelectedComponent(t,e=1){const n=this.state.selected,s=n?this.viewport.viewOf(n):void 0;if(!n||!s||!this.state.comp.size)return!1;if(this.state.compMode==="face"){const r=this.picker.pickSurface(t);return!!r&&r.object===n&&this.state.comp.has(r.face)}if(this.state.compMode==="vertex"){const r=this.picker.pickVertex(s,t,22*e);return r>=0&&this.state.comp.has(r)}if(this.state.compMode==="edge"){const r=this.picker.pickEdge(s,t,16*e);return r.edge>=0&&this.state.comp.has(r.edge)}return!1}captureTarget(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;if(e.group.updateMatrixWorld(),this.state.compMode==="object")return{kind:"object",transform:mi(t.transform)};const n=this.selector.selectedVertices();if(!n.length)return null;const s=Wh(t.mesh,n,{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0});s.skipped&&this.hud.toast("範囲が広すぎるのでソフト選択を省きました");const r=[],o=[],a=[];for(const[c,l]of s.weights){const h=t.mesh.getPosition(c);r.push(c),o.push(l),a.push(new L(h[0],h[1],h[2]).applyMatrix4(e.group.matrixWorld))}return{kind:"component",verts:r,weights:o,world:a,inverse:new oe().copy(e.group.matrixWorld).invert(),mirror:this.state.symX?Xh(t.mesh,r):[]}}updatePreselect(t,e){if(e.pointerType==="touch"||this.state.tool==="multicut"){this.preselect.clear();return}const n=this.state.selected;this.preselect.update(t,n?this.viewport.viewOf(n):void 0)}updateCutPreview(t,e){if(this.state.tool!=="multicut")return;const n=this.state.selected,s=this.multicut.update(t,n?this.viewport.viewOf(n):void 0,this.state.modOn("shift")||e.shiftKey);s&&(It("hudHint").innerHTML=s)}startTool(t,e){if(this.state.tool==="multicut"){this.updateCutPreview(t,e);return}if(this.state.tool==="bevel"){this.startBevel(t);return}const n=this.state.selected,s=this.pivotWorld(),r=this.tolerance(e);let o=n?this.manipulator.pick(t,s,this.state.manip,r):-1;if(o<0&&n&&this.state.compMode!=="object"&&this.hitSelectedComponent(t,r)&&(o=Fc),o<0||!n||!s){this.startMarquee(t);return}if(this.state.pivotEdit){this.beginPivotDrag(o,t,s);return}if(e.pointerType!=="mouse"){this.pendingDrag={handle:o,point:t,t0:performance.now(),shift:this.state.modOn("shift")||e.shiftKey,ctrl:this.state.modOn("ctrl")||e.ctrlKey||e.metaKey},this.manipulator.hot=o,this.refreshManipulator();return}this.beginToolDrag(o,t,this.state.modOn("shift")||e.shiftKey,this.state.modOn("ctrl")||e.ctrlKey||e.metaKey)}beginToolDrag(t,e,n,s){const r=this.state.selected,o=this.pivotWorld();if(!r||!o){this.startMarquee(e);return}const a=this.history.snapshot();let c={move:"移動",rotate:"回転",scale:"スケール"}[Xr(t)??"move"];if(Xr(t)==="move"&&this.state.compMode!=="object"&&this.state.comp.size&&n&&s&&this.beginSlide(r,e)){this.dragSnapshot=a,this.manipulator.hot=t,this.refreshManipulator();return}Xr(t)==="move"&&this.state.compMode!=="object"&&this.state.comp.size&&n&&!s&&this.extrudeForDrag(r)&&(c="押し出し");const l=this.captureTarget();if(!l){this.startMarquee(e);return}this.dragSnapshot=a,this.drag=$h({handle:t,pivot:this.pivotWorld()??o,target:l,point:e,pivotScreen:this.manipulator.toScreen(this.pivotWorld()??o),ray:this.ray(e),cameraPosition:this.cameraPosition(),label:c}),this.manipulator.hot=t,this.refreshManipulator()}beginSlide(t,e){const n=this.selector.selectedVertices();if(!n.length)return!1;const s=this.viewport.viewOf(t);if(!s)return!1;s.group.updateMatrixWorld();const r=ux(t.mesh,n);if(![...r.values()].some(u=>u.length))return this.hud.toast("スライドできる辺がありません（まわりが全部選ばれています）"),!1;const o=u=>{const f=t.mesh.getPosition(u);return this.manipulator.toScreen(new L(f[0],f[1],f[2]).applyMatrix4(s.group.matrixWorld))},a=new Map;for(const u of n)a.set(u,o(u));const c=new Map;for(const[u,f]of r){const d=a.get(u);c.set(u,f.map(m=>{const v=o(m);return{x:v.x-d.x,y:v.y-d.y}}))}let l=n[0],h=1/0;for(const u of n){const f=a.get(u),d=Math.hypot(f.x-e.x,f.y-e.y);d<h&&(h=d,l=u)}return this.slideDrag={base:Float32Array.from(t.mesh.positions),rails:r,railScreen:c,anchor:l,start:e,mirror:this.state.symX?Xh(t.mesh,n):[]},!0}updateSlide(t,e){const n=this.slideDrag;if(!n)return;const s=e.x-n.start.x,r=e.y-n.start.y,o=Math.hypot(s,r);if(o<1e-6)return;const a=new Map;for(const[h,u]of n.rails){const f=n.railScreen.get(h)??[];let d=-1,m=0;for(let v=0;v<u.length;v++){const p=f[v],g=Math.hypot(p.x,p.y);if(g<1e-6)continue;const x=(p.x*s+p.y*r)/(g*o);x>m&&(m=x,d=v)}d>=0&&a.set(h,u[d])}if(!a.size)return;const c=a.get(n.anchor);let l=0;if(c!==void 0){const h=(n.rails.get(n.anchor)??[]).indexOf(c),u=(n.railScreen.get(n.anchor)??[])[h],f=u?u.x*u.x+u.y*u.y:0;f>1e-9&&(l=(s*u.x+r*u.y)/f)}else{const[h,u]=[...a][0],f=(n.rails.get(h)??[]).indexOf(u),d=(n.railScreen.get(h)??[])[f],m=d?d.x*d.x+d.y*d.y:0;m>1e-9&&(l=(s*d.x+r*d.y)/m)}if(l=Math.max(0,Math.min(.99,l)),n.mirror.length){const h=t.mesh.vertexNeighbors();for(const[u,f]of n.mirror){const d=a.get(u);if(d===void 0)continue;const m=[-n.base[d*3],n.base[d*3+1],n.base[d*3+2]];let v=-1;for(const p of h.get(f)??[])if(Math.abs(n.base[p*3]-m[0])<1e-4&&Math.abs(n.base[p*3+1]-m[1])<1e-4&&Math.abs(n.base[p*3+2]-m[2])<1e-4){v=p;break}v>=0&&a.set(f,v)}}fx(t.mesh,n.base,a,l),this.viewport.refreshPositions(t),this.viewport.rebuildOverlay(),this.refreshManipulator(),It("hudHint").innerHTML=`スライド <kbd>${l.toFixed(2)}</kbd>`}beginPivotDrag(t,e,n){const s=t<3?t:-1,r=new Kn().setFromNormalAndCoplanarPoint(new L().subVectors(this.cameraPosition(),n).normalize(),n);let o=null;if(s<0){const a=new L;this.ray(e).intersectPlane(r,a)&&(o=a)}this.pivotDrag={axis:s,origin:n.clone(),plane:r,planeStart:o,t0:s>=0?Ys(this.ray(e),n,Ze[s]):0},this.manipulator.hot=t,this.refreshManipulator()}updatePivotDrag(t){const e=this.pivotDrag;if(!e)return;const n=this.ray(t);let s;if(e.axis>=0){const r=Ys(n,e.origin,Ze[e.axis]);s=e.origin.clone().addScaledVector(Ze[e.axis],r-e.t0)}else{const r=new L;if(!n.intersectPlane(e.plane,r)||!e.planeStart)return;s=e.origin.clone().add(r.sub(e.planeStart))}if(this.state.snapping){const r=this.snapPoint(s);r&&(s=e.axis>=0?e.origin.clone().addScaledVector(Ze[e.axis],r.clone().sub(e.origin).dot(Ze[e.axis])):r.clone()),this.showSnapTarget()}this.state.pivotOverride={x:s.x,y:s.y,z:s.z},this.refreshManipulator(),this.state.snapping||(It("hudHint").innerHTML=`ピボット <kbd>${s.x.toFixed(2)}, ${s.y.toFixed(2)}, ${s.z.toFixed(2)}</kbd>`)}togglePivotEdit(){this.state.pivotEdit=!this.state.pivotEdit,this.manipulator.hot=-1,this.syncToggleButtons(),this.refreshManipulator(),this.uv?.refreshManipulator(),this.refresh(),this.hud.toast(this.state.pivotEdit?"ピボット編集: オン（もう一度 D で終了）":"ピボット編集: オフ")}resetPivot(){this.state.pivotOverride=null,this.refreshManipulator(),this.uv?.resetPivot(),this.hud.toast("ピボットを選択の中心へ")}setManipSize(t){this.state.manipSize=Math.min($r,Math.max(cs,t)),localStorage.setItem("macbeth.manipSize",String(this.state.manipSize)),this.refreshManipulator(),this.uv?.refreshManipulator(),this.refresh(),this.hud.toast(`マニピュレータの大きさ ×${this.state.manipSize.toFixed(2)}`)}openManipSizeGauge(t){if(this.popup?.dataset.gauge==="manipSize"){this.closePopup();return}this.closePopup();const e=t.getBoundingClientRect(),n=rt("div","cutin");n.dataset.gauge="manipSize",n.style.left=`${e.right+8}px`;const s=220,r=Math.max(8,Math.min(window.innerHeight-s-8,e.top+e.height/2-s/2));n.style.top=`${r}px`,n.style.height=`${s}px`,n.appendChild(rt("div","glabel","サイズ"));const o=rt("div","gauge"),a=rt("div","fill"),c=rt("div","knob");o.append(a,c),n.appendChild(o);const l=rt("div","gval");n.appendChild(l);const h=()=>{const d=(this.state.manipSize-cs)/($r-cs);a.style.height=`${d*100}%`,c.style.bottom=`calc(${d*100}% - 1px)`,l.textContent=`×${this.state.manipSize.toFixed(2)}`},u=d=>{const m=o.getBoundingClientRect(),v=Math.max(0,Math.min(1,1-(d-m.top)/m.height)),p=cs+v*($r-cs);this.state.manipSize=Math.round(p/.05)*.05,localStorage.setItem("macbeth.manipSize",String(this.state.manipSize)),h(),this.refreshManipulator(),this.uv?.refreshManipulator()};let f=!1;o.addEventListener("touchstart",d=>d.preventDefault(),{passive:!1}),o.addEventListener("pointerdown",d=>{d.preventDefault(),f=!0;try{o.setPointerCapture(d.pointerId)}catch{}u(d.clientY)}),o.addEventListener("pointermove",d=>{f&&u(d.clientY)});for(const d of["pointerup","pointercancel"])o.addEventListener(d,()=>{f&&(f=!1,this.refresh())});h(),document.body.appendChild(n),this.popup=n,this.popupAnchor=t}manipulatorMenu(){return{N:{label:this.state.pivotEdit?"ピボットの移動を終える":"ピボットを移動",sub:"Pivot  D",icon:Z.pivot,run:()=>this.togglePivotEdit()},NE:{label:"選択の中心へ戻す",sub:"Center",icon:Z.vObj,run:()=>this.resetPivot()},S:{label:"初期設定に戻す",sub:"Reset",icon:Z.xform,run:()=>{this.state.pivotEdit=!1,this.state.pivotOverride=null,this.uv?.resetPivot(),this.setManip("all"),this.setManipSize(1),this.syncToggleButtons(),this.hud.toast("マニピュレータを初期設定に戻した")}}}}extrudeForDrag(t){if(this.state.compMode==="face"){const n=ih(t.mesh,this.state.comp,0);return n?(t.mesh=n.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),!0):!1}if(this.state.compMode==="edge"){const n=this.viewport.viewOf(t);if(!n)return!1;const s=[...this.state.comp].map(a=>n.edges[a]).filter(Boolean),r=sh(t.mesh,s,0);if(!r)return!1;t.mesh=r.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t);const o=this.viewport.viewOf(t);if(o){const a=new Set(r.newEdges.map(([c,l])=>`${Math.min(c,l)}_${Math.max(c,l)}`));this.state.comp.clear(),o.edges.forEach(([c,l],h)=>{a.has(`${Math.min(c,l)}_${Math.max(c,l)}`)&&this.state.comp.add(h)})}return this.viewport.rebuildOverlay(),!0}const e=oh(t.mesh,this.state.comp,0,this.state.vertexOpts.extrudeWidth);if(!e)return this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）"),!1;t.mesh=e.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t),this.state.comp.clear();for(const n of e.tips)this.state.comp.add(n);return this.viewport.rebuildOverlay(),!0}moveTool(t,e){if(this.state.tool==="multicut")return this.updateCutPreview(t,e);if(this.state.tool==="bevel")return this.dragBevel(t);if(this.marquee)return this.updateMarquee(t);if(this.pivotDrag)return this.updatePivotDrag(t);if(this.slideDrag){const o=this.state.selected;o&&this.updateSlide(o,t);return}if(this.pendingDrag){const o=this.pendingDrag,a=Math.hypot(t.x-o.point.x,t.y-o.point.y),c=performance.now()-o.t0;if(a<=Uc&&!(a>ds&&c>Nc))return;if(this.pendingDrag=null,this.beginToolDrag(o.handle,o.point,o.shift,o.ctrl),this.slideDrag){const l=this.state.selected;l&&this.updateSlide(l,t);return}}const n=this.drag,s=this.state.selected;if(!n||!s)return;const r=this.state.snapping&&n.kind==="move";if(IM(n,s,t,this.ray(t),this.cameraPosition(),r?o=>this.snapPoint(o):void 0),r?this.showSnapTarget():this.updateWeldTarget(t,e,s),n.target.kind==="object"){const o=this.viewport.viewOf(s);o&&(nn(o.group,s.transform),o.group.updateMatrixWorld())}else this.viewport.refreshPositions(s);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats()}snapHit=null;snapPoint(t){const e=this.state.snap.kind;if(e==="grid"){const u=Math.max(1e-4,this.state.snap.step),f=new L(Math.round(t.x/u)*u,Math.round(t.y/u)*u,Math.round(t.z/u)*u);return this.snapHit=f,f}if(e==="surface"){const u=this.manipulator.toScreen(t),f=this.picker.pickSurface(u,this.state.selected);return this.snapHit=f?f.point.clone():null,this.snapHit}const n=this.manipulator.toScreen(t),s=40;let r=null,o=s;const a=u=>{const f=this.manipulator.toScreen(u),d=Math.hypot(f.x-n.x,f.y-n.y);d<o&&(o=d,r=u)},c=this.state.selected,l=this.state.compMode==="object",h=this.state.compMode==="vertex"?this.state.comp:null;for(const u of this.state.doc.objects){if(l&&u===c)continue;const f=this.viewport.viewOf(u);if(!f)continue;const d=u.mesh,m=v=>new L(d.positions[v*3],d.positions[v*3+1],d.positions[v*3+2]).applyMatrix4(f.group.matrixWorld);if(e==="vertex")for(let v=0;v<d.vertexCount;v++)u===c&&h?.has(v)||a(m(v));else for(const[v,p]of f.edges){if(u===c&&h?.has(v)&&h.has(p))continue;const g=m(v),y=m(p).clone().sub(g),_=y.lengthSq(),w=_>1e-12?Math.max(0,Math.min(1,t.clone().sub(g).dot(y)/_)):0;a(g.clone().addScaledVector(y,w))}}return this.snapHit=r,r}showSnapTarget(){const t=this.snapHit;if(this.preselect.clear(),!t){It("hudHint").innerHTML=`スナップ <kbd>${Ns[this.state.snap.kind]}</kbd> · near なし`;return}this.preselect.showWorldPoint(t.x,t.y,t.z),It("hudHint").innerHTML=`スナップ <kbd>${Ns[this.state.snap.kind]}</kbd> · <kbd>${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}</kbd>`}updateWeldTarget(t,e,n){if(this.weldTarget=null,this.preselect.clear(),this.state.compMode!=="vertex"||this.state.comp.size!==1)return;const s=this.viewport.viewOf(n);if(!s)return;const r=[...this.state.comp][0],o=22*this.tolerance(e),a=this.picker.pickVertexExcept(s,t,o,r);a<0||(this.weldTarget=a,this.preselect.showVertex(s,a),It("hudHint").innerHTML="離すと <kbd>この頂点へ溶接</kbd> します")}applyTargetWeld(t,e,n){t.mesh=Zn(to(t.mesh,[[e,n]]));const s=t.markTopologyChanged();this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let r="ターゲットウェルド";(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),s.rebased&&(r+=" · UV の土台を取り直した"),this.hud.toast(r)}finishTool(t,e,n){if(this.state.tool==="multicut"){this.doMultiCut();return}if(this.state.tool==="bevel"){this.endBevel(n);return}if(this.slideDrag){const r=this.slideDrag;this.slideDrag=null,this.manipulator.hot=-1;const o=this.state.selected;!!o&&r.base.some((c,l)=>Math.abs(c-o.mesh.positions[l])>1e-6)&&this.dragSnapshot&&(this.history.commit("スライド",this.dragSnapshot),this.hud.toast("スライド")),this.dragSnapshot=null,this.refreshManipulator(),this.refresh();return}if(this.pivotDrag){this.pivotDrag=null,this.manipulator.hot=-1,this.preselect.clear(),this.refreshManipulator(),this.hud.defaultHint();return}if(this.pendingDrag){this.pendingDrag=null,this.manipulator.hot=-1,this.refreshManipulator(),this.applySelectResult(this.selector.click(t,e));return}const s=this.marquee;if(s){this.endMarquee();const r=this.selector.marquee(s.x0,s.y0,s.x1,s.y1,t,e);this.applySelectResult(r)}else if(this.drag){const r=this.drag;if(this.drag=null,this.manipulator.hot=-1,this.preselect.clear(),!n)this.dragSnapshot=null,this.applySelectResult(this.selector.click(t,e));else if(this.dragSnapshot){const o=this.weldTarget,a=this.state.compMode==="vertex"?[...this.state.comp][0]:void 0;o!==null&&a!==void 0&&this.state.selected?(this.applyTargetWeld(this.state.selected,a,o),this.history.commit("ターゲットウェルド",this.dragSnapshot)):(this.history.commit(r.label,this.dragSnapshot),this.hud.toast(r.label)),this.dragSnapshot=null}else this.dragSnapshot=null;this.refresh()}else n||this.applySelectResult(this.selector.click(t,e))}selectedEdgePairs(t){const e=this.viewport.viewOf(t);return e?[...this.state.comp].map(n=>e.edges[n]).filter(Boolean):[]}startBevel(t){const e=this.state.selected;if(!e||this.state.compMode!=="edge"||!this.state.comp.size){this.hud.toast("エッジモードでエッジを選択してから、左右にドラッグしてください");return}const n=this.selectedEdgePairs(e),s=this.history.snapshot();this.bevel.begin(e,n,t.x)&&(this.bevelSnapshot=s)}dragBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;this.state.bevel.width=this.bevel.widthFromDrag(t.x-e.startX,e.scale);const s=this.bevel.apply(this.state.bevel);if(!s){this.hud.toast("この形はまだベベルできません（四角形と閉じたエッジのみ）");return}this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.hud.refreshStats(),It("hudHint").innerHTML=`ベベル <kbd>幅 ${this.state.bevel.width.toFixed(3)}</kbd> · <kbd>${this.state.bevel.segments} 分割</kbd> · ${s.faces} 面`}endBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;if(!t){this.bevel.cancel(),this.bevel.end(),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.refresh();return}const s=n.markTopologyChanged();this.state.comp.clear(),this.bevelSnapshot&&this.history.commit("ベベル",this.bevelSnapshot),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.refresh();let r=`ベベル — 幅 ${this.state.bevel.width.toFixed(3)} · ${this.state.bevel.segments} 分割`;(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),this.hud.toast(`${r}（オプションで作り直せます）`)}redoBevel(){const t=this.state.selected;!t||!this.bevel.active||this.bevel.apply(this.state.bevel)&&(this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats())}doMultiCut(){const t=this.state.selected;if(!t)return;const e=this.history.snapshot(),n=this.multicut.commit(this.viewport.viewOf(t));n&&(t.markTopologyChanged(),this.state.comp.clear(),this.history.commit("エッジループ挿入",e),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`エッジループを挿入しました — ${n.faceCount} 面`))}screenOfVertex(t){const e=this.state.selected,n=e?this.viewport.viewOf(e):void 0;if(!n||t>=n.object.mesh.vertexCount)return null;const s=this.picker.projectVertex(n,t);return{x:s.x,y:s.y}}refreshManipulator(){if(this.state.tool!=="select"){this.manipulator.clear();return}const t=[this.state.compMode,this.state.selected?.id??"-",this.state.comp.size,this.state.tool].join(",");this.manipulator.rebuild(this.pivotWorld(),this.state.manip,t)}setTool(t){if(this.state.tool!==t){this.bevel.active&&(this.bevel.end(),this.bevelSnapshot=null),this.state.tool=t,this.multicut.clear(),this.preselect.clear(),this.manipulator.clear(),this.refresh();for(const e of document.querySelectorAll("[data-tool]"))e.setAttribute("aria-pressed",String(e.dataset.tool===t));this.hud.toast(t==="multicut"?"マルチカット":"選択・変形"),this.hud.defaultHint()}}setDisplay(t){this.state.display=t,this.viewport.syncAll(),this.refresh(),this.hud.toast({wire:"ワイヤーフレーム",shaded:"シェード",shadedWire:"シェード + ワイヤー",smooth:"スムースシェード",checker:"チェッカー（UV の確認）"}[t])}cycleDisplay(){const t=["wire","shaded","shadedWire","smooth","checker"];this.setDisplay(t[(t.indexOf(this.state.display)+1)%t.length])}openCameraPopup(t){this.closePopup();const e=t.getBoundingClientRect(),n=rt("div","panel floating");n.style.left=`${e.right+6}px`,n.style.top=`${e.top}px`;const s=rt("div","pbody"),r=rt("div","hint"),o=()=>{const l=2*Math.atan(24/(2*this.state.camOpts.focal))*180/Math.PI;r.textContent=`アングル オブ ビュー  ${l.toFixed(2)}°
フィルム ゲート  35mm アカデミー`},a=(l,h,u,f,d)=>{const m=rt("div","row");m.appendChild(rt("label",void 0,l));const v=rt("input","num");v.type="text",v.readOnly=!0,v.value=String(this.state.camOpts[h]),m.appendChild(v);const p=rt("input","slider");p.type="range",p.min=String(u),p.max=String(f),p.step=String(d),p.value=String(this.state.camOpts[h]),p.addEventListener("input",()=>{const g=Number(p.value);this.state.camOpts[h]=g,v.value=String(g),this.viewport.applyCamera(),o(),this.refreshManipulator()}),m.appendChild(p),s.appendChild(m)};a("焦点距離","focal",10,200,1),a("ニア クリップ","near",.01,1,.01),a("ファー クリップ","far",50,2e3,10),o(),s.appendChild(r);const c=rt("button","chk");c.setAttribute("aria-pressed",String(this.state.camOpts.ortho)),c.appendChild(rt("i")),c.appendChild(rt("span",void 0,"平行投影")),c.addEventListener("click",()=>{this.state.camOpts.ortho=!this.state.camOpts.ortho,c.setAttribute("aria-pressed",String(this.state.camOpts.ortho)),this.viewport.applyCamera(),this.refresh()}),s.appendChild(c),n.appendChild(s),document.body.appendChild(n),this.popup=n}setManip(t){this.state.manip=t,this.manipulator.clear(),this.refreshManipulator(),this.hud.toast(`マニピュレータ: ${{all:"ユニバーサル",move:"移動",rotate:"回転",scale:"スケール"}[t]}`)}applySelectResult(t){t.changed&&(t.objectChanged&&this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),this.pushSelectionToUv(),t.message&&this.hud.toast(t.message))}pushSelectionToUv(){if(this.state.mode!=="uv"||!this.uv||this.syncingSelection)return;this.syncingSelection=!0;const t=this.state.selected,e=t?this.viewport.viewOf(t):void 0,n=[];if(this.state.compMode==="edge"&&e)for(const s of this.state.comp){const r=e.edges[s];r&&n.push(`${Math.min(r[0],r[1])}_${Math.max(r[0],r[1])}`)}this.uv.syncFromView(this.state.compMode,{verts:this.state.compMode==="vertex"?[...this.state.comp]:[],edges:n,faces:this.state.compMode==="face"?[...this.state.comp]:[]}),this.hud.uvNote=this.uv.stats(),this.hud.refreshStats(),this.syncingSelection=!1}startMarquee(t){this.marquee={x0:t.x,y0:t.y,x1:t.x,y1:t.y},this.marqueeEl.style.display="block",this.updateMarquee(t)}updateMarquee(t){const e=this.marquee;e&&(e.x1=t.x,e.y1=t.y,this.marqueeEl.style.left=`${Math.min(e.x0,e.x1)}px`,this.marqueeEl.style.top=`${Math.min(e.y0,e.y1)}px`,this.marqueeEl.style.width=`${Math.abs(e.x1-e.x0)}px`,this.marqueeEl.style.height=`${Math.abs(e.y1-e.y0)}px`)}endMarquee(){this.marquee=null,this.marqueeEl.style.display="none"}pivotWorld(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;const n=this.state.pivotOverride;if(n)return new L(n.x,n.y,n.z);if(e.group.updateMatrixWorld(),this.state.compMode==="object"||!this.state.comp.size)return new L().setFromMatrixPosition(e.group.matrixWorld);const s=this.selector.selectedVertices();if(!s.length)return null;const r=new L(1/0,1/0,1/0),o=new L(-1/0,-1/0,-1/0);for(const a of s){const c=t.mesh.getPosition(a),l=new L(c[0],c[1],c[2]).applyMatrix4(e.group.matrixWorld);r.min(l),o.max(l)}return r.add(o).multiplyScalar(.5)}openMarkingMenu(t,e,n){this.closePopup(),Yn(n?this.editMenu():this.selectModeMenu(),t,e)}openTwoFingerMenu(t,e){if(this.closePopup(),this.state.selected){Yn(this.editMenu(),t,e);return}Yn(this.cameraMenu(),t,e,this.savedCameraItems())}cameraMenu(){const t=e=>({label:zs[e].label,sub:zs[e].sub,icon:Z.camera,run:()=>this.setView(e)});return{N:t("persp"),NE:{label:"新規カメラ",sub:"New Camera",icon:Z.camera,run:()=>this.addCamera()},E:t("right"),SE:t("bottom"),S:t("front"),SW:t("back"),W:t("top"),NW:t("left")}}savedCameraItems(){return this.state.cameras.map(t=>({label:t.name,run:()=>this.recallCamera(t)}))}setView(t){this.viewport.setView(t),this.state.viewName=zs[t].label,this.refresh(),this.hud.toast(`${zs[t].label}ビュー`)}addCamera(){const t=this.viewport.cam,e={name:`camera${this.state.cameras.length+1}`,theta:t.theta,phi:t.phi,distance:t.distance,target:[t.target.x,t.target.y,t.target.z],focal:this.state.camOpts.focal,ortho:this.state.camOpts.ortho};this.state.cameras.push(e),this.state.viewName=e.name,this.refresh(),this.hud.toast(`${e.name} を控えました`)}recallCamera(t){const e=this.viewport.cam;e.theta=t.theta,e.phi=t.phi,e.distance=t.distance,e.target.set(t.target[0],t.target[1],t.target[2]),t.focal!==void 0&&(this.state.camOpts.focal=t.focal),t.ortho!==void 0&&(this.state.camOpts.ortho=t.ortho),this.viewport.applyCamera(),this.state.viewName=t.name,this.refresh(),this.hud.toast(`${t.name} に切り替えました`)}manipMenu(){return{N:{label:"ユニバーサル",sub:"All  T",icon:Z.xform,run:()=>this.setManip("all")},E:{label:"移動",sub:"Move  W",icon:Z.move,run:()=>this.setManip("move")},S:{label:"回転",sub:"Rotate  E",icon:Z.rotate,run:()=>this.setManip("rotate")},W:{label:"スケール",sub:"Scale  R",icon:Z.scale,run:()=>this.setManip("scale")}}}modeMenu(){const t=e=>()=>this.setMode(e);return{N:{label:rs.model,sub:"Modeling",icon:Z.mModel,run:t("model")},E:{label:rs.uv,sub:"UV Editor",icon:Z.mUV,run:t("uv")},S:{label:rs.sculpt,sub:"Sculpt",icon:Z.mSculpt,run:t("sculpt")},W:{label:rs.material,sub:"Material",icon:Z.mMaterial,run:t("material")}}}setMode(t){if(this.state.mode===t)return;this.state.mode=t,It("modeLabel").textContent=rs[t],this.closePopup(),this.multicut.clear(),this.preselect.clear();const e=It("modeStub");e.textContent="";const n=GM[t];t==="uv"?this.enterUv():this.leaveUv(),n?(e.appendChild(WM(n)),e.hidden=!1,It("stage").hidden=!0):(e.hidden=!0,It("stage").hidden=!1,this.viewport.resize()),this.renderToolColumn(),this.refresh(),this.hud.toast(rs[t])}uvToolColumn(){const t=this.uv;if(!t)return[];const e=(n,s,r)=>({kind:"button",icon:s,title:r,compMode:t.unit===n?n:`${n}_off`,onTap:()=>{t.setUnit(n),this.renderToolColumn()}});return[{kind:"label",text:"選択"},e("vertex",Z.vVert,"UV 頂点"),e("edge",Z.vEdge,"UV エッジ"),e("shell",Z.vFace,"UV シェル"),{kind:"separator"},{kind:"label",text:"UV"},{kind:"button",icon:Z.smooth,title:"展開（レシピから開き直す）",onTap:()=>t.unfold()},{kind:"button",icon:Z.mUV,title:"自動 UV（経験則で切れ目を引き直す）",onTap:()=>t.autoUnwrap()},{kind:"button",icon:Z.multicut,title:"カット（選んだところを切る）",onTap:()=>t.cutOrSew(!0)},{kind:"button",icon:Z.vEdge,title:"ソー（選んだ切れ目を縫う）",onTap:()=>t.cutOrSew(!1)},{kind:"button",icon:Z.pivot,title:"マニピュレータ（タップで大きさのスライダー · 長押しでピボット）",pressed:()=>this.state.pivotEdit,radial:()=>this.manipulatorMenu(),onTap:n=>this.openManipSizeGauge(n)},{kind:"button",icon:Z.snap,title:"スナップ（長押しで グリッド / UV 頂点）",pressed:()=>this.state.snapOn,radial:()=>this.uvSnapMenu(),onTap:()=>this.toggleSnap()},{kind:"separator"},{kind:"button",icon:Z.frame,title:"選択にフレーム",onTap:()=>t.frame()}]}enterUv(){const t=this.state.selected;this.uv||(this.uv=new ZM(It("paneUv"),It("uvgl"),{object:()=>this.state.selected,recipe:()=>this.state.selected?.uv??null,changed:n=>{const s=this.state.selected;s&&this.viewport.rebuildObject(s),this.viewport.rebuildOverlay(),this.hud.uvNote=this.uv?.stats()??null,this.refresh(),n&&this.hud.toast(n)},snapshot:()=>this.history.snapshot(),commit:(n,s)=>this.history.commit(n,s),syncToView:n=>{if(this.syncingSelection)return;this.syncingSelection=!0;const s=this.state.selected;if(this.state.compMode=n.mode,this.state.comp.clear(),n.mode==="vertex")for(const r of n.verts)this.state.comp.add(r);else if(n.mode==="edge"){const r=s?this.viewport.viewOf(s):void 0,o=new Set(n.edges);r?.edges.forEach(([a,c],l)=>{o.has(`${Math.min(a,c)}_${Math.max(a,c)}`)&&this.state.comp.add(l)})}else for(const r of n.faces)this.state.comp.add(r);this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats(),this.syncCompModeButtons(),this.syncingSelection=!1},markingMenu:(n,s,r)=>{this.closePopup(),Yn(r?this.uvEditMenu():this.uvSelectMenu(),n,s)},cameraMenu:(n,s)=>{this.closePopup(),Yn({N:{label:"0〜1 にフレーム",sub:"Unit",icon:Z.frame,run:()=>this.uv?.view.frameUnit()},S:{label:"選択にフレーム",sub:"Frame  F",icon:Z.frame,run:()=>this.uv?.frame()}},n,s)},hint:n=>{It("hudHint").innerHTML=n},toast:n=>this.hud.toast(n),undo:()=>this.doUndo(),redo:()=>this.doRedo(),shiftOn:n=>this.state.modOn("shift")||n.shiftKey,ctrlOn:n=>this.state.modOn("ctrl")||n.ctrlKey||n.metaKey,marquee:n=>{if(!n){this.marqueeEl.style.display="none";return}const s=It("paneUv"),r=s.offsetLeft,o=s.offsetTop;this.marqueeEl.style.display="block",this.marqueeEl.style.left=`${Math.min(n.x0,n.x1)+r}px`,this.marqueeEl.style.top=`${Math.min(n.y0,n.y1)+o}px`,this.marqueeEl.style.width=`${Math.abs(n.x1-n.x0)}px`,this.marqueeEl.style.height=`${Math.abs(n.y1-n.y0)}px`},uvSnap:()=>this.state.snapping?this.state.uvSnap:null,selectedFaces:()=>this.state.compMode==="face"?[...this.state.comp]:[],manipSize:()=>this.state.manipSize,pivotEdit:()=>this.state.pivotEdit,smoothAngle:()=>this.state.smoothAngle}),this.buildUvSwitch());let e=null;t&&!t.uv&&(t.uv=qx(t.mesh),e=os(t.mesh,t.uv).charts.length,this.viewport.rebuildObject(t)),It("paneUv").hidden=!1,It("uvSwitch").hidden=!1,this.applyUvSplit(),this.uv.start(),this.uv.rebuild(),this.hud.uvNote=this.uv.stats(),this.pushSelectionToUv(),e!==null&&this.hud.toast(`今の UV を取り込んだ — 島 ${e}（「展開」を押すまで開き直しません）`)}leaveUv(){this.hud.uvNote=null,this.uv&&(this.uv.stop(),It("paneUv").hidden=!0,It("uvSwitch").hidden=!0,It("vp").classList.remove("split","uvonly"),this.viewport.resize())}buildUvSwitch(){const t=It("uvSwitch");t.textContent="";for(const[e,n]of[["uv","2D"],["both","両方"],["view","3D"]]){const s=rt("button");s.textContent=n,s.dataset.split=e,s.addEventListener("click",()=>{this.uvSplit=e,this.applyUvSplit()}),t.appendChild(s)}}applyUvSplit(){const t=It("vp");t.classList.toggle("split",this.uvSplit==="both"),t.classList.toggle("uvonly",this.uvSplit==="uv"),It("paneUv").hidden=this.uvSplit==="view";for(const e of It("uvSwitch").querySelectorAll("button"))e.setAttribute("aria-pressed",String(e.dataset.split===this.uvSplit));requestAnimationFrame(()=>{this.viewport.resize(),this.uv?.resize()})}uvSelectMenu(){const t=n=>()=>this.uv?.setUnit(n),e=this.uv;return{N:{label:"UV エッジ",sub:"UV Edge",icon:Z.vEdge,run:t("edge")},NE:{label:"オブジェクト",sub:"Object",icon:Z.vObj,run:()=>this.setMode("model")},E:{label:"UV シェル",sub:"Shell",icon:Z.vFace,run:t("shell")},SE:{label:"カット",sub:"Cut",icon:Z.multicut,run:()=>e?.cutOrSew(!0)},S:{label:"面（3D と同期）",sub:"Face",icon:Z.vFace,run:t("shell")},SW:{label:"ソー",sub:"Sew",icon:Z.vEdge,run:()=>e?.cutOrSew(!1)},W:{label:"UV 頂点",sub:"UV Vertex",icon:Z.vVert,run:t("vertex")}}}uvEditMenu(){const t=this.uv;if(!t)return{};const e={N:{label:"展開",sub:"Unfold",icon:Z.smooth,run:()=>t.unfold()},NE:{label:"カット",sub:"Cut",icon:Z.multicut,run:()=>t.cutOrSew(!0)},E:{label:"ソー",sub:"Sew",icon:Z.vEdge,run:()=>t.cutOrSew(!1)}};return t.unit==="edge"?{...e,SE:{label:"整列",sub:"Layout",icon:Z.vMulti,run:()=>t.repack()},S:{label:"直線化",sub:"Straighten",icon:Z.vEdge,run:()=>t.tidy("straighten")},SW:{label:"整列 U",sub:"Align U",icon:Z.vMulti,run:()=>t.tidy("alignU")},W:{label:"整列 V",sub:"Align V",icon:Z.vMulti,run:()=>t.tidy("alignV")},NW:{label:"マージ",sub:"Merge",icon:Z.vVert,run:()=>t.tidy("merge")}}:t.unit==="vertex"?{...e,SE:{label:"ピン",sub:"Pin",icon:Z.vVert,run:()=>t.pinOrUnpin(!0)},S:{label:"ピン解除",sub:"Unpin",icon:Z.vVert,run:()=>t.pinOrUnpin(!1)},SW:{label:"整列 U",sub:"Align U",icon:Z.vMulti,run:()=>t.tidy("alignU")},W:{label:"整列 V",sub:"Align V",icon:Z.vMulti,run:()=>t.tidy("alignV")},NW:{label:"対称",sub:"Symmetry",icon:Z.sym,run:()=>t.tidy("symmetry")}}:{...e,SE:{label:"自動 UV",sub:"Auto",icon:Z.mUV,run:()=>t.autoUnwrap()},S:{label:"整列",sub:"Layout",icon:Z.vMulti,run:()=>t.repack()},SW:{label:"反転 U",sub:"Flip U",icon:Z.sym,run:()=>t.transformSelection("flipU")},W:{label:"反転 V",sub:"Flip V",icon:Z.sym,run:()=>t.transformSelection("flipV")},NW:{label:"90° 回転",sub:"Rotate",icon:Z.rotate,run:()=>t.transformSelection("rotate90")}}}toggleSnap(){this.state.snapOn=!this.state.snapOn,this.syncToggleButtons(),this.refresh(),this.hud.toast(this.state.snapOn?`スナップ オン: ${Ns[this.state.snap.kind]}`:"スナップ オフ")}setSnapKind(t){this.state.snap.kind=t,this.state.snapOn=!0,this.syncToggleButtons(),this.refresh(),this.hud.toast(`スナップ: ${Ns[t]}`)}snapMenu(){return{N:{label:"グリッド",sub:"Grid  X",icon:Z.wire,run:()=>this.setSnapKind("grid")},E:{label:"頂点",sub:"Point  V",icon:Z.vVert,run:()=>this.setSnapKind("vertex")},S:{label:"カーブ / エッジ",sub:"Curve  C",icon:Z.vEdge,run:()=>this.setSnapKind("edge")},W:{label:"サーフェス",sub:"Surface",icon:Z.vFace,run:()=>this.setSnapKind("surface")},SW:{label:"オフ",sub:"Off",icon:Z.snap,run:()=>{this.state.snapOn=!1,this.syncToggleButtons(),this.refresh(),this.hud.toast("スナップ オフ")}}}}uvSnapMenu(){const t=(e,n)=>({label:n,sub:"Grid",icon:Z.wire,run:()=>{this.state.uvSnap={kind:"grid",step:e},this.state.snapOn=!0,this.syncToggleButtons(),this.refresh(),this.hud.toast(`UV スナップ: グリッド ${n}`)}});return{N:t(1/8,"1/8"),NE:t(1/16,"1/16"),E:t(1/32,"1/32"),S:{label:"UV 頂点",sub:"UV Point",icon:Z.vVert,run:()=>{this.state.uvSnap={...this.state.uvSnap,kind:"vertex"},this.state.snapOn=!0,this.syncToggleButtons(),this.refresh(),this.hud.toast("UV スナップ: UV 頂点")}},SW:{label:"オフ",sub:"Off",icon:Z.snap,run:()=>{this.state.snapOn=!1,this.syncToggleButtons(),this.refresh(),this.hud.toast("スナップ オフ")}}}}shadingMenu(){return{N:{label:"ワイヤーフレーム",sub:"4",icon:Z.wire,run:()=>this.setDisplay("wire")},E:{label:"シェード",sub:"5",icon:Z.shaded,run:()=>this.setDisplay("shaded")},S:{label:"シェード + ワイヤー",sub:"6",icon:Z.shadedWire,run:()=>this.setDisplay("shadedWire")},W:{label:"スムースシェード",sub:"7",icon:Z.smooth,run:()=>this.setDisplay("smooth")},NW:{label:"チェッカー",sub:"8",icon:Z.mUV,run:()=>this.setDisplay("checker")}}}selectModeMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return{N:{label:"エッジ",sub:"Edge",icon:Z.vEdge,run:()=>this.setCompMode("edge")},NE:{label:"オブジェクト モード",sub:"Object",icon:Z.vObj,run:()=>this.setCompMode("object")},SE:{label:"マルチ",sub:"Multi",icon:Z.vMulti,run:t("マルチコンポーネント選択")},S:{label:"フェース",sub:"Face",icon:Z.vFace,run:()=>this.setCompMode("face")},SW:{label:"頂点フェース",sub:"Vertex Face",icon:Z.vVertFace,run:t("頂点フェース選択")},W:{label:"頂点",sub:"Vertex",icon:Z.vVert,run:()=>this.setCompMode("vertex")},NW:this.state.modOn("ctrl")?{label:"選択を縮小",sub:"Shrink  <",icon:Z.vMulti,run:()=>this.growOrShrink(!1)}:{label:"選択を拡張",sub:"Grow  >",icon:Z.vMulti,run:()=>this.growOrShrink(!0)}}}editMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return this.state.compMode==="face"?{N:{label:"押し出し",sub:"Extrude",icon:Z.extrude,run:()=>this.doExtrudeFaces()},NE:{label:"ベベル",sub:"Bevel",icon:Z.scale,run:t("ベベル")},E:{label:"ブリッジ",sub:"Bridge",icon:Z.vEdge,run:t("ブリッジ")},SE:{label:"複製",sub:"Duplicate",icon:Z.dup,run:()=>this.doDuplicateFaces()},S:{label:"削除",sub:"Delete",icon:Z.del,run:()=>this.doDeleteFaces()},SW:{label:"コラプス",sub:"Collapse",icon:Z.vVert,run:()=>this.doCollapseFaces()},W:{label:"スムース",sub:"Smooth",icon:Z.smooth,run:()=>this.doSmooth()},NW:{label:"抽出",sub:"Extract",icon:Z.vFace,run:()=>this.doExtractFaces()}}:this.state.compMode==="edge"?{N:{label:"押し出し",sub:"Extrude",icon:Z.extrude,run:()=>this.doExtrudeEdgesMenu()},NE:{label:"ベベル",sub:"Bevel",icon:Z.scale,run:()=>this.setTool("bevel")},E:{label:"ブリッジ",sub:"Bridge",icon:Z.vEdge,run:()=>this.doBridge()},SE:{label:"エッジループ挿入",sub:"Insert Loop",icon:Z.multicut,run:()=>this.setTool("multicut")},S:{label:"削除",sub:"Delete",icon:Z.del,run:()=>this.doDeleteEdges()},SW:{label:"スピン",sub:"Spin",icon:Z.rotate,run:t("スピンエッジ")},W:{label:"接続",sub:"Connect",icon:Z.vMulti,run:()=>this.doConnectEdges()},NW:{label:"境界を選択",sub:"Boundary",icon:Z.vEdge,run:()=>this.selectBoundary()}}:this.state.compMode==="vertex"?{N:{label:"距離でマージ",sub:"Merge",icon:Z.vVert,run:()=>this.doMergeByDistance()},NE:{label:"中心にマージ",sub:"To Center",icon:Z.vObj,run:()=>this.doMergeVertices()},E:{label:"面取り",sub:"Chamfer",icon:Z.scale,run:t("面取り")},SE:{label:"接続",sub:"Connect",icon:Z.vMulti,run:()=>this.doConnectVertices()},S:{label:"削除",sub:"Delete",icon:Z.del,run:()=>this.doDissolveVertices()},SW:{label:"平均化",sub:"Average",icon:Z.smooth,run:t("平均化")},W:{label:"分離",sub:"Detach",icon:Z.vVertFace,run:t("分離")},NW:{label:"押し出し",sub:"Extrude",icon:Z.extrude,run:()=>this.doExtrudeVertices()}}:{N:{label:"スムース",sub:"Smooth",icon:Z.smooth,run:()=>this.doSmooth()},NE:{label:"中心にピボット",sub:"Center Pivot",icon:Z.vObj,run:()=>this.doCenterPivot()},E:{label:"分離",sub:"Separate",icon:Z.vVertFace,run:()=>this.doSeparate()},SE:{label:"複製",sub:"Duplicate",icon:Z.dup,run:()=>this.doDuplicate()},S:{label:"削除",sub:"Delete",icon:Z.del,run:()=>this.doDelete()},SW:{label:"ミラー",sub:"Mirror",icon:Z.sym,run:()=>this.doMirror()},W:{label:"結合",sub:"Combine",icon:Z.prim,run:()=>this.doCombine()},NW:{label:"フリーズ",sub:"Freeze",icon:Z.vObj,run:()=>this.doFreeze()}}}growOrShrink(t){this.applySelectResult(this.selector.growOrShrink(t))}selectBoundary(){const t=this.selector.selectBoundary();t.changed&&this.syncCompModeButtons(),this.applySelectResult(t),!t.changed&&t.message&&this.hud.toast(t.message)}doSmooth(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");this.history.push("スムース"),t.mesh=c_(t.mesh,1),t.markTopologyChanged(),this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`スムース — ${t.mesh.faceCount} 面`)}applyTopologyChange(t,e,n,s){const r=this.history.snapshot();if(!n())return;const o=t.markTopologyChanged();this.state.comp.clear(),this.history.commit(e,r),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let a=s(t);(o.droppedLevels||o.droppedLayers)&&(a+=` · 上位レベル ${o.droppedLevels} とレイヤー ${o.droppedLayers} を破棄`),o.rebased&&(a+=" · UV の土台を取り直した"),this.hud.toast(a)}requireComponents(t,e=1){const n=this.state.selected,s={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"}[t];return!n||this.state.compMode!==t||this.state.comp.size<e?(this.hud.toast(`${s}モードで${e>1?`${e} つ以上`:""}選択してから実行してください`),null):n}doExtrudeFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"押し出し",()=>{const n=ih(t.mesh,this.state.comp,this.state.toolOpts.extrudeDist);return n?(t.mesh=n.mesh,e=n.faceCount,!0):!1},()=>`面を押し出し — ${e} 面`)}doExtrudeEdgesMenu(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean);let s=0;this.applyTopologyChange(t,"エッジを押し出し",()=>{const r=sh(t.mesh,n,this.state.toolOpts.extrudeDist);return r?(t.mesh=r.mesh,s=r.faceCount,!0):!1},()=>`エッジを押し出し — ${s} 面`)}doDeleteFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"面を削除",()=>{const n=Kv(t.mesh,this.state.comp);return n?(t.mesh=Zn(n.mesh),e=n.removed,!0):!1},()=>`${e} 面を削除`)}doCollapseFaces(){const t=this.requireComponents("face");t&&this.applyTopologyChange(t,"コラプス",()=>{const e=Zv(t.mesh,this.state.comp);return e?(t.mesh=Zn(e),!0):!1},()=>"フェースをコラプス")}doMergeVertices(){const t=this.requireComponents("vertex",2);t&&this.applyTopologyChange(t,"頂点をマージ",()=>(t.mesh=Zn(to(t.mesh,[[...this.state.comp]])),!0),()=>"頂点をマージ")}doMergeByDistance(){const t=this.state.selected;if(!t||this.state.compMode!=="vertex"){this.hud.toast("頂点モードで実行してください");return}const e=this.state.vertexOpts.mergeDist,n=this.state.comp.size>=2?[...this.state.comp]:void 0,s=Vu(t.mesh,e,n);if(!s){this.hud.toast(`${e.toFixed(3)} 以内に重なる頂点がありません`);return}this.applyTopologyChange(t,"距離でマージ",()=>(t.mesh=Zn(s.mesh),!0),()=>`${s.merged} 頂点をマージ（${e.toFixed(3)} 以内）`)}doDissolveVertices(){const t=this.requireComponents("vertex");if(!t)return;const e=cx(t.mesh,this.state.comp);if(!e){this.hud.toast("消せる頂点がありません（面が繋がっていない頂点です）");return}this.applyTopologyChange(t,"頂点を削除",()=>(t.mesh=Zn(e.mesh),!0),()=>`${e.removed} 頂点を削除`)}doExtrudeVertices(){const t=this.requireComponents("vertex");if(!t)return;const e=oh(t.mesh,this.state.comp,this.state.toolOpts.extrudeDist,this.state.vertexOpts.extrudeWidth);if(!e){this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）");return}this.applyTopologyChange(t,"頂点を押し出し",()=>(t.mesh=e.mesh,!0),()=>`頂点を押し出し — ${e.faces} 面`)}doDeleteEdges(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(o=>e.edges[o]).filter(Boolean);let s=0;const r=Yv(t.mesh,n);if(!r){this.hud.toast("結合できるエッジがありません（境界エッジは削除できません）");return}this.applyTopologyChange(t,"エッジを削除",()=>(t.mesh=r.mesh,s=r.merged,!0),()=>`エッジを削除 — ${s} 面を結合`)}doBridge(){const t=this.requireComponents("edge",2);if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean),s=ox(t.mesh,n);if(!s){this.hud.toast("ブリッジできません（境界エッジの 2 列を同じ本数だけ選んでください）");return}this.applyTopologyChange(t,"ブリッジ",()=>(t.mesh=s.mesh,!0),()=>`ブリッジ — ${s.faces} 面`)}doConnectVertices(){const t=this.requireComponents("vertex",2);if(!t)return;const e=Hu(t.mesh,this.state.comp);if(!e){this.hud.toast("結べる組がありません（同じ面にあり、隣り合っていない 2 点を選んでください）");return}this.applyTopologyChange(t,"接続",()=>(t.mesh=e.mesh,!0),()=>`接続 — ${e.edges} 本のエッジ`)}doConnectEdges(){const t=this.requireComponents("edge",2);if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean),s=hx(t.mesh,n);if(!s){this.hud.toast("結べる組がありません（同じ面に来るエッジを 2 本以上選んでください）");return}this.applyTopologyChange(t,"接続",()=>(t.mesh=s.mesh,!0),()=>`接続 — ${s.edges} 本のエッジ`)}doDuplicateFaces(){const t=this.requireComponents("face");if(!t)return;const e=px(t.mesh,this.state.comp);if(!e)return;let n=0;this.applyTopologyChange(t,"フェースの複製",()=>(t.mesh=e.mesh,n=e.faces.length,!0),()=>`${n} 面を複製`),this.state.comp.clear();for(const s of e.faces)this.state.comp.add(s);this.viewport.rebuildOverlay(),this.refresh()}doExtractFaces(){const t=this.requireComponents("face");if(!t)return;const e=mx(t.mesh,this.state.comp);if(!e){this.hud.toast("抽出できません（全部を選ぶと残りが無くなります）");return}const n=this.history.snapshot();t.mesh=e.mesh,t.markTopologyChanged();const s=this.state.doc.addMesh(e.extracted,`${t.name}_extract`);s.transform=mi(t.transform),this.history.commit("フェースの抽出",n),this.state.comp.clear(),this.viewport.syncAll(),this.state.select(s),this.setCompMode("object"),this.refresh(),this.hud.toast(`${e.count} 面を ${s.name} へ抽出`)}doSeparate(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");const e=vx(t.mesh);if(!e){this.hud.toast("分けられません（繋がった 1 つの塊です）");return}const n=this.history.snapshot(),s=this.state.doc.objects.indexOf(t);this.state.doc.objects.splice(s,1);let r=null;e.forEach((o,a)=>{const c=this.state.doc.addMesh(o,`${t.name}_${a+1}`);c.transform=mi(t.transform),r||(r=c)}),this.history.commit("分離",n),this.viewport.syncAll(),this.state.select(r),this.refresh(),this.hud.toast(`${e.length} 個に分離`)}doCombine(){const t=this.state.selectedObjects();if(t.length<2){this.hud.toast("オブジェクトモードで SHF を足して 2 つ以上選んでください");return}const e=gx(t.map(r=>({mesh:r.mesh,transform:r.transform})));if(!e)return;const n=this.history.snapshot();for(const r of t){const o=this.state.doc.objects.indexOf(r);o>=0&&this.state.doc.objects.splice(o,1)}const s=this.state.doc.addMesh(e,t[0].name);this.history.commit("結合",n),this.viewport.syncAll(),this.state.select(s),this.refresh(),this.hud.toast(`${t.length} 個を結合`)}doMirror(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");const e=this.state.mirrorAxis,n=xx(t.mesh,e,this.state.vertexOpts.mergeDist);n&&this.applyTopologyChange(t,"ミラー",()=>(t.mesh=n.mesh,!0),()=>`ミラー ${"XYZ"[e]} — ${n.welded} 頂点を溶接`)}doCenterPivot(){const t=this.state.selected;if(!t)return;this.history.push("中心にピボット");const e=t.mesh.boundsCenter();for(let n=0;n<t.mesh.vertexCount;n++){const s=t.mesh.getPosition(n);t.mesh.setPosition(n,s[0]-e[0],s[1]-e[1],s[2]-e[2])}t.transform.position=[t.transform.position[0]+e[0]*t.transform.scale[0],t.transform.position[1]+e[1]*t.transform.scale[1],t.transform.position[2]+e[2]*t.transform.scale[2]],t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("ピボットを中心へ")}doFreeze(){const t=this.state.selected;if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;this.history.push("フリーズ"),e.group.updateMatrixWorld();const n=e.group.matrixWorld;for(let s=0;s<t.mesh.vertexCount;s++){const r=t.mesh.getPosition(s),o=new L(r[0],r[1],r[2]).applyMatrix4(n);t.mesh.setPosition(s,o.x,o.y,o.z)}t.transform={position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]},t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("トランスフォームをフリーズ")}doDuplicate(){const t=this.state.selected;if(!t)return;this.history.push("複製");const e=this.state.doc.addMesh(t.mesh.clone(),`${t.name}_copy`);e.transform=mi(t.transform),this.state.select(e),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${e.name} を複製しました`)}doDelete(){const t=this.state.selected;t&&(this.history.push("削除"),this.state.doc.remove(t),this.state.select(null),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${t.name} を削除しました`))}doUndo(){const t=this.history.undo();t&&(this.afterHistory(),this.hud.toast(`元に戻す: ${t}`))}doRedo(){const t=this.history.redo();t&&(this.afterHistory(),this.hud.toast(`やり直す: ${t}`))}afterHistory(){this.viewport.syncAll(),this.selector.reset(),this.syncCompModeButtons(),this.refresh()}syncCompModeButtons(){for(const t of document.querySelectorAll("[data-comp-mode]"))t.setAttribute("aria-pressed",String(t.dataset.compMode===this.state.compMode))}syncToggleButtons(){this.renderToolColumn()}updateHistoryButtons(){It("btnUndo").disabled=!this.history.canUndo,It("btnRedo").disabled=!this.history.canRedo}toolColumn(){if(this.state.mode==="uv")return this.uvToolColumn();if(this.state.mode!=="model")return[];const t=[{kind:"label",text:"変形"},{kind:"button",icon:Z.xform,title:"選択・変形（長押しで 移動 / 回転 / スケール）",tool:"select",radial:()=>this.manipMenu(),onTap:()=>{this.setTool("select"),this.setManip("all")}},{kind:"button",icon:Z.multicut,title:"マルチカット（エッジループ挿入）",tool:"multicut",onTap:()=>this.setTool("multicut")},{kind:"button",icon:Z.scale,title:"ベベル（エッジを選んで左右にドラッグ）",tool:"bevel",onTap:()=>this.setTool("bevel")},{kind:"button",icon:Z.pivot,title:"マニピュレータ（タップで大きさのスライダー · 長押しでピボット）",pressed:()=>this.state.pivotEdit,radial:()=>this.manipulatorMenu(),onTap:e=>this.openManipSizeGauge(e)},{kind:"button",icon:Z.snap,title:"スナップ（長押しで グリッド / 頂点 / カーブ / サーフェス）",pressed:()=>this.state.snapOn,radial:()=>this.snapMenu(),onTap:()=>this.toggleSnap()},{kind:"separator"},{kind:"label",text:"選択"}];for(const e of ha)t.push({kind:"button",icon:ry[e.id],title:`${e.label} (${e.key})`,compMode:e.id,onTap:()=>this.setCompMode(e.id)});t.push({kind:"separator"},{kind:"label",text:"表示"},{kind:"button",icon:Z.shade,title:"シェーディング（長押しで切り替え。4–7）",radial:()=>this.shadingMenu(),onTap:()=>this.cycleDisplay()},{kind:"button",icon:Z.camera,title:"カメラ設定",onTap:e=>this.openCameraPopup(e)},{kind:"separator"},{kind:"label",text:"追加"});for(const e of Gv){const n=Ms[e];t.push({kind:"button",icon:oy[e]??Z.prim,title:`${n.label} を原点に追加`,onTap:()=>this.addPrimitive(e)})}return t}buildToolDock(){It("dockLeft").textContent="";const{panel:t,body:e}=aa("tools","ツール");this.toolPanelBody=e,this.renderToolColumn(),this.docking.attach(t),this.docking.place(t,this.zones.tools??"left")}renderToolColumn(){const t=this.toolPanelBody;if(!t)return;t.textContent="";const e=rt("div","toolcol");for(const n of this.toolColumn()){if(n.kind==="label"){e.appendChild(rt("div","minilbl",n.text));continue}if(n.kind==="separator"){e.appendChild(rt("div","tool-sep"));continue}const s=rt("button","ibtn");s.innerHTML=QM(n.icon),s.title=n.title,n.tool&&(s.dataset.tool=n.tool,s.setAttribute("aria-pressed",String(this.state.tool===n.tool))),n.compMode&&(s.dataset.compMode=n.compMode,s.setAttribute("aria-pressed",String(this.state.compMode===n.compMode))),n.pressed&&(s.dataset.toggle="1",s.setAttribute("aria-pressed",String(n.pressed()))),n.radial?(s.dataset.radial="1",jh(s,n.radial,()=>n.onTap(s))):s.addEventListener("click",()=>n.onTap(s)),e.appendChild(s)}t.appendChild(e)}buildPanels(){const t=aa("options","オプション");this.docking.attach(t.panel),this.docking.place(t.panel,this.zones.options??"rightTop"),this.optionsBody=t.body;const e=aa("outliner","アウトライナ");this.docking.attach(e.panel),this.docking.place(e.panel,this.zones.outliner??"rightBottom"),this.outlinerBody=e.body,this.renderPanels(),this.viewport.resize()}panelHost(){return{onParamInput:(t,e,n)=>{this.paramSnapshot??=this.history.snapshot(),t.params[e]=n,t.rebuild(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats(),this.refreshManipulator()},onParamCommit:(t,e)=>{this.paramSnapshot&&(this.history.commit(e,this.paramSnapshot),this.paramSnapshot=null)},onSoftChange:(t,e)=>{this.state.soft[t]=e,this.viewport.rebuildOverlay(),this.refresh()},onExtrudeDistChange:t=>{this.state.toolOpts.extrudeDist=t},onVertexOptChange:(t,e)=>{this.state.vertexOpts[t]=e},onMirrorAxisChange:t=>{this.state.mirrorAxis=t,this.refresh()},onTransformInput:(t,e,n,s)=>{this.history.push("数値入力");const r=mi(t.transform);if(e==="rotation"){const a=this.eulerOf(r.rotation);a[n]=s;const c=a.map(h=>h*Math.PI/180),l=new an().setFromEuler(new zn(c[0],c[1],c[2],"XYZ"));r.rotation=[l.x,l.y,l.z,l.w]}else{const a=[...r[e]];a[n]=s,r[e]=a}t.transform=r;const o=this.viewport.viewOf(t);o&&(nn(o.group,t.transform),o.group.updateMatrixWorld()),this.viewport.rebuildOverlay(),this.refresh()},onSnapChange:(t,e)=>{t==="kind"?this.setSnapKind(e):(this.state.snap.step=e,this.refresh())},onBevelChange:(t,e)=>{t==="segments"?this.state.bevel.segments=e:this.state.bevel.width=e,this.redoBevel()},onCutChange:(t,e)=>{t==="edgeFlow"?this.state.cut.edgeFlow=e:this.state.cut.snapStep=e},onSmoothAngleChange:t=>{this.state.smoothAngle=t;for(const e of this.state.doc.objects)this.viewport.rebuildObject(e)},onManipSizeChange:t=>this.setManipSize(t),onUvMethodChange:t=>{this.uv?.setMethod(t),this.refresh()},onUvAutoChange:(t,e)=>{const n=this.state.selected?.uv;n&&(t==="angle"?n.autoSeamParams.angle=e:n.autoSeamParams[t]=e)},onUvAutoRun:()=>this.uv?.autoUnwrap(),onUvSnapChange:(t,e)=>{t==="kind"?this.state.uvSnap.kind=e:this.state.uvSnap.step=e,this.state.snapOn=!0,this.syncToggleButtons(),this.refresh()},onSelect:t=>{this.state.select(t),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh()},onRename:(t,e)=>{this.history.push("名前変更"),t.name=e,this.refresh()},onOutlinerMenu:(t,e,n)=>{Yn({N:{label:"名前変更",sub:"Rename",icon:Z.rename,run:()=>this.hud.toast("行をダブルタップでも変更できます")},E:{label:"複製",sub:"Duplicate",icon:Z.dup,run:()=>{this.state.select(t),this.doDuplicate()}},S:{label:"削除",sub:"Delete",icon:Z.del,run:()=>{this.state.select(t),this.doDelete()}},W:{label:"フレーム",sub:"Frame",icon:Z.frame,run:()=>{this.state.select(t),this.refresh(),this.viewport.frameSelected()}}},e,n)}}}renderPanels(){const t=this.panelHost();this.optionsBody&&BM(this.optionsBody,{tool:this.state.tool,selected:this.state.selected,soft:this.state.soft,cut:this.state.cut,bevel:this.state.bevel,bevelActive:this.bevel.active,extrudeDist:this.state.toolOpts.extrudeDist,vertex:this.state.vertexOpts,snap:{...this.state.snap,active:this.state.snapping},mirrorAxis:this.state.mirrorAxis,rotationEuler:this.state.selected?this.eulerOf(this.state.selected.transform.rotation):[0,0,0],smoothAngle:this.state.smoothAngle,compMode:this.state.compMode,manipSize:this.state.manipSize,uv:this.state.mode==="uv"&&this.state.selected?.uv?{method:this.state.selected.uv.method,snapKind:this.state.uvSnap.kind,snapStep:this.state.uvSnap.step,auto:{...this.state.selected.uv.autoSeamParams}}:null},t),this.outlinerBody&&zM(this.outlinerBody,this.state.doc.objects,this.state.selected,t)}addPrimitive(t){this.history.push(`${Ms[t].label} を追加`);const e=this.state.doc.addObject(t);this.state.select(e),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${e.name} を追加しました`)}setCompMode(t){this.state.tool!=="select"&&this.setTool("select"),this.state.compMode!==t&&(this.state.compMode=t,this.state.comp.clear(),this.selector.reset(),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),this.syncCompModeButtons(),this.pushSelectionToUv(),this.hud.toast(ha.find(e=>e.id===t)?.label??t))}buildGauges(){const t=()=>this.viewport.rebuildOverlay();this.gauges=[new Yh(this.state,"gauge1","g1","g1lbl","g1val",t,()=>this.refresh()),new Yh(this.state,"gauge2","g2","g2lbl","g2val",t,()=>this.refresh())]}buildCluster(){const t=n=>{this.state.mods[n]=this.state.mods[n]==="off"?"on":"off",this.syncModButtons(),this.hud.refreshStats()};It("modShift").addEventListener("click",()=>t("shift")),It("modCtrl").addEventListener("click",()=>t("ctrl")),It("modAlt").addEventListener("click",()=>t("alt"));const e=It("btnFrame");e.addEventListener("touchstart",n=>n.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",n=>{e.setPointerCapture(n.pointerId),this.fHeld=!0});for(const n of["pointerup","pointercancel"])e.addEventListener(n,()=>{this.fHeld&&(this.fHeld=!1,this.fChord||this.viewport.frameSelected(),this.fChord=!1)})}get fHeld(){return this.router.fHeld}set fHeld(t){this.router.fHeld=t}get fChord(){return this.router.fChord}set fChord(t){this.router.fChord=t}syncModButtons(){for(const[t,e]of[["shift","modShift"],["ctrl","modCtrl"],["alt","modAlt"]])It(e).dataset.state=this.state.mods[t]}bindKeyboard(){window.addEventListener("keydown",t=>{const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;const n=ha.find(a=>a.key===t.key);if(n){t.preventDefault(),this.setCompMode(n.id);return}const s=sy[t.key];if(s){this.setDisplay(s);return}if(t.key==="f"||t.key==="F"){this.viewport.frameSelected();return}const r={q:"all",t:"all",w:"move",e:"rotate",r:"scale"}[t.key.toLowerCase()];if(r&&!t.ctrlKey&&!t.metaKey){this.setManip(r);return}if(t.key===">"||t.key==="."){this.growOrShrink(!0);return}if(t.key==="<"||t.key===","){this.growOrShrink(!1);return}const o={x:"grid",v:"vertex",c:"edge"}[t.key.toLowerCase()];if(o&&!t.ctrlKey&&!t.metaKey){this.state.snap.kind=o,this.state.snapKeyHeld||(this.state.snapKeyHeld=!0,this.hud.toast(`スナップ: ${Ns[this.state.snap.kind]}（押している間）`),this.refresh());return}if((t.key==="d"||t.key==="D"||t.key==="Insert")&&!t.ctrlKey&&!t.metaKey){t.preventDefault(),this.togglePivotEdit();return}if(t.key==="+"||t.key==="="){this.setManipSize(this.state.manipSize*Jh);return}if(t.key==="-"||t.key==="_"){this.setManipSize(this.state.manipSize/Jh);return}if(t.key==="s"||t.key==="S"){this.state.symX=!this.state.symX,this.refresh(),this.hud.toast(`対称編集 X: ${this.state.symX?"オン":"オフ"}`);return}if((t.ctrlKey||t.metaKey)&&(t.key==="z"||t.key==="Z")){t.preventDefault(),t.shiftKey?this.doRedo():this.doUndo();return}(t.ctrlKey||t.metaKey)&&(t.key==="y"||t.key==="Y")&&(t.preventDefault(),this.doRedo())}),window.addEventListener("keyup",t=>{this.state.snapKeyHeld&&["x","v","c"].includes(t.key.toLowerCase())&&(this.state.snapKeyHeld=!1,this.preselect.clear(),this.refresh(),this.hud.defaultHint())})}bindTopBar(){It("btnUndo").addEventListener("click",()=>this.doUndo()),It("btnRedo").addEventListener("click",()=>this.doRedo()),It("btnPanels").addEventListener("click",()=>{this.state.panelsHidden=!this.state.panelsHidden,It("btnPanels").setAttribute("aria-pressed",String(this.state.panelsHidden)),It("dockLeft").hidden=this.state.panelsHidden,It("dockColRight").hidden=this.state.panelsHidden,this.layout.apply(),this.viewport.resize()}),jh(It("modeBtn"),()=>this.modeMenu(),()=>this.hud.toast("長押しでモードを選べます")),It("fileBtn").addEventListener("click",t=>this.openFileMenu(t.currentTarget)),document.addEventListener("pointerdown",t=>{if(!this.popup)return;const e=t.target;this.popup.contains(e)||this.popupAnchor?.contains(e)||this.closePopup()})}closePopup(){this.popup?.remove(),this.popup=null,this.popupAnchor=null,kc()}openFileMenu(t){this.closePopup();const e=t.getBoundingClientRect(),n=rt("div","panel floating");n.style.left=`${e.left}px`,n.style.top=`${e.bottom+2}px`;const s=rt("div","pbody"),r=(o,a)=>{const c=rt("button","act",o);c.addEventListener("click",()=>{this.closePopup(),a()}),s.appendChild(c)};r("新規シーン",()=>this.newScene()),r("プロジェクトを開く (.mbz)",()=>this.openProject()),r("プロジェクトを保存 (.mbz)",()=>this.saveProject()),r("OBJ を読み込む",()=>this.importObj()),r("OBJ を書き出す",()=>this.exportObj()),n.appendChild(s),document.body.appendChild(n),this.popup=n}async newScene(){this.history.push("新規シーン"),this.state.doc.objects.length=0,this.state.select(null),this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]),this.viewport.syncAll(),this.refresh(),await this.autosave.saveNow()}async saveProject(){const{packMbz:t}=await Kc(async()=>{const{packMbz:r}=await import("./index-DJCnZyio.js");return{packMbz:r}},[]),e=t(this.state.doc,{appVersion:"0.1.0"}),n=`${this.state.doc.objects[0]?.name??"scene"}.mbz`,s=await Bh(e,n);this.hud.toast(s.saved?`${n} を保存しました`:"保存を取り消しました")}async openProject(){const t=await zh(".mbz");if(t)try{const{unpackMbz:e}=await Kc(async()=>{const{unpackMbz:s}=await import("./index-DJCnZyio.js");return{unpackMbz:s}},[]),{document:n}=e(t.bytes);this.state.doc=n,this.state.select(n.objects[0]??null),this.history.clear(),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を開きました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async importObj(){const t=await zh(".obj,text/plain");if(t)try{const e=l_(t.text);if(!e.length)return void this.hud.toast("面が見つかりませんでした");this.history.push("OBJ 読み込み");let n=null;for(const s of e)n=this.state.doc.addMesh(s.mesh,s.name);this.state.select(n),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を読み込みました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async exportObj(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;if(!t.length)return void this.hud.toast("書き出すものがありません");const e=h_(t.map(r=>({mesh:r.mesh,name:r.name}))),n=`${t[0].name}.obj`,s=await Bh(e,n);this.hud.toast(s.saved?`${n} を書き出しました`:"書き出しを取り消しました")}refresh(){this.preselect.clear(),this.viewport.applyDisplayAll(),this.refreshManipulator(),this.hud.refreshStats();for(const t of this.gauges)t.paint();this.updateHistoryButtons(),this.paramSnapshot||this.renderPanels()}}document.addEventListener("contextmenu",i=>i.preventDefault());document.addEventListener("selectstart",i=>{const t=i.target;t&&t.tagName!=="INPUT"&&t.tagName!=="TEXTAREA"&&i.preventDefault()});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/macbethUnity/app/sw.js",{scope:"/macbethUnity/app/"})});const vf=new ay;vf.boot();Object.assign(window,{macbeth:vf});export{ih as $,vy as A,Sx as B,hx as C,Ju as D,Hu as E,He as F,jn as G,g_ as H,Wv as I,Kv as J,Jx as K,Yv as L,io as M,cx as N,px as O,Ms as P,ix as Q,Rt as R,o_ as S,Jo as T,Le as U,Qx as V,$u as W,m_ as X,Ox as Y,mx as Z,sh as _,tf as a,oh as a0,Yu as a1,Ue as a2,dy as a3,py as a4,fy as a5,i_ as a6,dh as a7,ju as a8,$v as a9,s_ as aA,ph as aB,ux as aC,fx as aD,sc as aE,uy as aF,Hx as aG,c_ as aH,Bx as aI,Wx as aJ,Zu as aK,dx as aL,ly as aM,to as aN,h_ as aO,hy as aa,Xv as ab,Ou as ac,Ex as ad,Gu as ae,Vu as af,qv as ag,Gx as ah,xx as ai,Cx as aj,eo as ak,l_ as al,kx as am,hh as an,qx as ao,os as ap,Zx as aq,Kx as ar,my as as,qu as at,vx as au,jx as av,Yx as aw,Fx as ax,Ku as ay,t_ as az,_s as b,ie as c,Gv as d,oc as e,zx as f,Vx as g,fh as h,Tx as i,Px as j,Qv as k,n_ as l,ox as m,er as n,xy as o,z_ as p,a_ as q,e_ as r,Mx as s,Ic as t,G_ as u,gy as v,mi as w,Zv as x,gx as y,Zn as z};
//# sourceMappingURL=index-DjD02-tD.js.map
