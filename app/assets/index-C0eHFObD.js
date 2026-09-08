(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const jd="modulepreload",Jd=function(i){return"/macbethUnity/app/"+i},yl={},bl=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=o(e.map(l=>{if(l=Jd(l),l in yl)return;yl[l]=!0;const h=l.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const u=document.createElement("link");if(u.rel=h?"stylesheet":jd,h||(u.as="script"),u.crossOrigin="",u.href=l,c&&u.setAttribute("nonce",c),document.head.appendChild(u),h)return new Promise((d,p)=>{u.addEventListener("load",d),u.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Cc="185",Qd=0,Sl=1,tp=2,Hr=1,ep=2,Fs=3,_i=0,Je=1,Xe=2,ni=0,fs=1,wl=2,El=3,Tl=4,np=5,Ii=100,ip=101,sp=102,rp=103,op=104,ap=200,cp=201,lp=202,hp=203,pa=204,ma=205,up=206,fp=207,dp=208,pp=209,mp=210,gp=211,vp=212,xp=213,_p=214,ga=0,va=1,xa=2,vs=3,_a=4,Ma=5,ya=6,ba=7,Rc=0,Mp=1,yp=2,Bn=0,Au=1,Cu=2,Ru=3,Pu=4,Iu=5,Lu=6,Du=7,Uu=300,Oi=301,xs=302,_o=303,Mo=304,lo=306,ki=1e3,ei=1001,Sa=1002,Ie=1003,bp=1004,ar=1005,Ve=1006,yo=1007,Ui=1008,sn=1009,Nu=1010,Fu=1011,Gs=1012,Pc=1013,Gn=1014,Fn=1015,si=1016,Ic=1017,Lc=1018,Ws=1020,Ou=35902,ku=35899,Bu=1021,zu=1022,yn=1023,ri=1026,Ni=1027,Vu=1028,Dc=1029,Bi=1030,Uc=1031,Nc=1033,Gr=33776,Wr=33777,Xr=33778,$r=33779,wa=35840,Ea=35841,Ta=35842,Aa=35843,Ca=36196,Ra=37492,Pa=37496,Ia=37488,La=37489,Zr=37490,Da=37491,Ua=37808,Na=37809,Fa=37810,Oa=37811,ka=37812,Ba=37813,za=37814,Va=37815,Ha=37816,Ga=37817,Wa=37818,Xa=37819,$a=37820,qa=37821,Ya=36492,Ka=36494,Za=36495,ja=36283,Ja=36284,jr=36285,Qa=36286,Sp=3200,tc=0,wp=1,vi="",hn="srgb",Jr="srgb-linear",Qr="linear",te="srgb",$i=7680,Al=519,Ep=512,Tp=513,Ap=514,Fc=515,Cp=516,Rp=517,Oc=518,Pp=519,Cl=35044,Rl="300 es",On=2e3,Xs=2001;function Ip(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function to(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Lp(){const i=to("canvas");return i.style.display="block",i}const Pl={};function Il(...i){const t="THREE."+i.shift();console.log(t,...i)}function Hu(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ut(...i){i=Hu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function qt(...i){i=Hu(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ds(...i){const t=i.join(" ");t in Pl||(Pl[t]=!0,Ut(...i))}function Dp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Up={[ga]:va,[xa]:ya,[_a]:ba,[vs]:Ma,[va]:ga,[ya]:xa,[ba]:_a,[Ma]:vs};class Hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bo=Math.PI/180,ec=180/Math.PI;function Js(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function Np(i,t){return(i%t+t)%t}function So(i,t,e){return(1-e)*i+e*t}function Ss(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function qe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Wt{static{Wt.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class an{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],u=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(f!==v||c!==u||l!==d||h!==p){let g=c*u+l*d+h*p+f*v;g<0&&(u=-u,d=-d,p=-p,v=-v,g=-g);let m=1-a;if(g<.9995){const x=Math.acos(g),y=Math.sin(x);m=Math.sin(m*x)/y,a=Math.sin(a*x)/y,c=c*m+u*a,l=l*m+d*a,h=h*m+p*a,f=f*m+v*a}else{c=c*m+u*a,l=l*m+d*a,h=h*m+p*a,f=f*m+v*a;const x=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=x,l*=x,h*=x,f*=x}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],f=r[o],u=r[o+1],d=r[o+2],p=r[o+3];return t[e]=a*p+h*f+c*d-l*u,t[e+1]=c*p+h*u+l*f-a*d,t[e+2]=l*p+h*d+a*u-c*f,t[e+3]=h*p-a*f-c*u-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),f=a(r/2),u=c(n/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"YXZ":this._x=u*h*f+l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"ZXY":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f-u*d*p;break;case"ZYX":this._x=u*h*f-l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f+u*d*p;break;case"YZX":this._x=u*h*f+l*d*p,this._y=l*d*f+u*h*p,this._z=l*h*p-u*d*f,this._w=l*h*f-u*d*p;break;case"XZY":this._x=u*h*f-l*d*p,this._y=l*d*f-u*h*p,this._z=l*h*p+u*d*f,this._w=l*h*f+u*d*p;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],f=e[10],u=n+a+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{static{L.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ll.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ll.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),f=2*(r*n-o*e);return this.x=e+c*l+o*f-a*h,this.y=n+c*h+a*l-r*f,this.z=s+c*f+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return wo.copy(this).projectOnVector(t),this.sub(wo)}reflect(t){return this.sub(wo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wo=new L,Ll=new an;class Ot{static{Ot.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],p=n[8],v=s[0],g=s[3],m=s[6],x=s[1],y=s[4],_=s[7],S=s[2],w=s[5],A=s[8];return r[0]=o*v+a*x+c*S,r[3]=o*g+a*y+c*w,r[6]=o*m+a*_+c*A,r[1]=l*v+h*x+f*S,r[4]=l*g+h*y+f*w,r[7]=l*m+h*_+f*A,r[2]=u*v+d*x+p*S,r[5]=u*g+d*y+p*w,r[8]=u*m+d*_+p*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=h*o-a*l,u=a*c-h*r,d=l*r-o*c,p=e*f+n*u+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=f*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=u*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return ds("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Eo.makeScale(t,e)),this}rotate(t){return ds("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Eo.makeRotation(-t)),this}translate(t,e){return ds("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Eo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Eo=new Ot,Dl=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ul=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Fp(){const i={enabled:!0,workingColorSpace:Jr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===te&&(s.r=ii(s.r),s.g=ii(s.g),s.b=ii(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===te&&(s.r=ps(s.r),s.g=ps(s.g),s.b=ps(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vi?Qr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ds("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ds("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Jr]:{primaries:t,whitePoint:n,transfer:Qr,toXYZ:Dl,fromXYZ:Ul,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:t,whitePoint:n,transfer:te,toXYZ:Dl,fromXYZ:Ul,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const Xt=Fp();function ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ps(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qi;class Op{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{qi===void 0&&(qi=to("canvas")),qi.width=t.width,qi.height=t.height;const s=qi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=qi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=to("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ii(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ii(e[n]/255)*255):e[n]=ii(e[n]);return{data:e,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let kp=0;class kc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=Js(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(To(s[o].image)):r.push(To(s[o]))}else r=To(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function To(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Op.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let Bp=0;const Ao=new L;class He extends Hi{constructor(t=He.DEFAULT_IMAGE,e=He.DEFAULT_MAPPING,n=ei,s=ei,r=Ve,o=Ui,a=yn,c=sn,l=He.DEFAULT_ANISOTROPY,h=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Js(),this.name="",this.source=new kc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ao).x}get height(){return this.source.getSize(Ao).y}get depth(){return this.source.getSize(Ao).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ut(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ut(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Uu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ki:t.x=t.x-Math.floor(t.x);break;case ei:t.x=t.x<0?0:1;break;case Sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ki:t.y=t.y-Math.floor(t.y);break;case ei:t.y=t.y<0?0:1;break;case Sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=Uu;He.DEFAULT_ANISOTROPY=1;class ue{static{ue.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],p=c[9],v=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+v)<.1&&Math.abs(p+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,_=(d+1)/2,S=(m+1)/2,w=(h+u)/4,A=(f+v)/4,M=(p+g)/4;return y>_&&y>S?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=w/n,r=A/n):_>S?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=M/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=A/r,s=M/r),this.set(n,s,r,e),this}let x=Math.sqrt((g-p)*(g-p)+(f-v)*(f-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(f-v)/x,this.z=(u-h)/x,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zp extends Hi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ve,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new He(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Ve,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new kc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zn extends zp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Gu extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vp extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oe{static{oe.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,h,f,u,d,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,f,u,d,p,v,g)}set(t,e,n,s,r,o,a,c,l,h,f,u,d,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Yi.setFromMatrixColumn(t,0).length(),r=1/Yi.setFromMatrixColumn(t,1).length(),o=1/Yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=o*h,d=o*f,p=a*h,v=a*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=d+p*l,e[5]=u-v*l,e[9]=-a*c,e[2]=v-u*l,e[6]=p+d*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*h,d=c*f,p=l*h,v=l*f;e[0]=u+v*a,e[4]=p*a-d,e[8]=o*l,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=d*a-p,e[6]=v+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*h,d=c*f,p=l*h,v=l*f;e[0]=u-v*a,e[4]=-o*f,e[8]=p+d*a,e[1]=d+p*a,e[5]=o*h,e[9]=v-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*h,d=o*f,p=a*h,v=a*f;e[0]=c*h,e[4]=p*l-d,e[8]=u*l+v,e[1]=c*f,e[5]=v*l+u,e[9]=d*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,d=o*l,p=a*c,v=a*l;e[0]=c*h,e[4]=v-u*f,e[8]=p*f+d,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*f+p,e[10]=u-v*f}else if(t.order==="XZY"){const u=o*c,d=o*l,p=a*c,v=a*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=u*f+v,e[5]=o*h,e[9]=d*f-p,e[2]=p*f-d,e[6]=a*h,e[10]=v*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hp,t,Gp)}lookAt(t,e,n){const s=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),li.crossVectors(n,tn),li.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),li.crossVectors(n,tn)),li.normalize(),cr.crossVectors(tn,li),s[0]=li.x,s[4]=cr.x,s[8]=tn.x,s[1]=li.y,s[5]=cr.y,s[9]=tn.y,s[2]=li.z,s[6]=cr.z,s[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],p=n[2],v=n[6],g=n[10],m=n[14],x=n[3],y=n[7],_=n[11],S=n[15],w=s[0],A=s[4],M=s[8],E=s[12],P=s[1],C=s[5],I=s[9],V=s[13],O=s[2],D=s[6],z=s[10],N=s[14],q=s[3],j=s[7],it=s[11],tt=s[15];return r[0]=o*w+a*P+c*O+l*q,r[4]=o*A+a*C+c*D+l*j,r[8]=o*M+a*I+c*z+l*it,r[12]=o*E+a*V+c*N+l*tt,r[1]=h*w+f*P+u*O+d*q,r[5]=h*A+f*C+u*D+d*j,r[9]=h*M+f*I+u*z+d*it,r[13]=h*E+f*V+u*N+d*tt,r[2]=p*w+v*P+g*O+m*q,r[6]=p*A+v*C+g*D+m*j,r[10]=p*M+v*I+g*z+m*it,r[14]=p*E+v*V+g*N+m*tt,r[3]=x*w+y*P+_*O+S*q,r[7]=x*A+y*C+_*D+S*j,r[11]=x*M+y*I+_*z+S*it,r[15]=x*E+y*V+_*N+S*tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],f=t[6],u=t[10],d=t[14],p=t[3],v=t[7],g=t[11],m=t[15],x=c*d-l*u,y=a*d-l*f,_=a*u-c*f,S=o*d-l*h,w=o*u-c*h,A=o*f-a*h;return e*(v*x-g*y+m*_)-n*(p*x-g*S+m*w)+s*(p*y-v*S+m*A)-r*(p*_-v*w+g*A)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],h=t[10];return e*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=t[9],u=t[10],d=t[11],p=t[12],v=t[13],g=t[14],m=t[15],x=e*a-n*o,y=e*c-s*o,_=e*l-r*o,S=n*c-s*a,w=n*l-r*a,A=s*l-r*c,M=h*v-f*p,E=h*g-u*p,P=h*m-d*p,C=f*g-u*v,I=f*m-d*v,V=u*m-d*g,O=x*V-y*I+_*C+S*P-w*E+A*M;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/O;return t[0]=(a*V-c*I+l*C)*D,t[1]=(s*I-n*V-r*C)*D,t[2]=(v*A-g*w+m*S)*D,t[3]=(u*w-f*A-d*S)*D,t[4]=(c*P-o*V-l*E)*D,t[5]=(e*V-s*P+r*E)*D,t[6]=(g*_-p*A-m*y)*D,t[7]=(h*A-u*_+d*y)*D,t[8]=(o*I-a*P+l*M)*D,t[9]=(n*P-e*I-r*M)*D,t[10]=(p*w-v*_+m*x)*D,t[11]=(f*_-h*w-d*x)*D,t[12]=(a*E-o*C-c*M)*D,t[13]=(e*C-n*E+s*M)*D,t[14]=(v*y-p*S-g*x)*D,t[15]=(h*S-f*y+u*x)*D,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,f=a+a,u=r*l,d=r*h,p=r*f,v=o*h,g=o*f,m=a*f,x=c*l,y=c*h,_=c*f,S=n.x,w=n.y,A=n.z;return s[0]=(1-(v+m))*S,s[1]=(d+_)*S,s[2]=(p-y)*S,s[3]=0,s[4]=(d-_)*w,s[5]=(1-(u+m))*w,s[6]=(g+x)*w,s[7]=0,s[8]=(p+y)*A,s[9]=(g-x)*A,s[10]=(1-(u+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Yi.set(s[0],s[1],s[2]).length();const a=Yi.set(s[4],s[5],s[6]).length(),c=Yi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),pn.copy(this);const l=1/o,h=1/a,f=1/c;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=f,pn.elements[9]*=f,pn.elements[10]*=f,e.setFromRotationMatrix(pn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=On,c=!1){const l=this.elements,h=2*r/(e-t),f=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let p,v;if(c)p=r/(o-r),v=o*r/(o-r);else if(a===On)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Xs)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=On,c=!1){const l=this.elements,h=2/(e-t),f=2/(n-s),u=-(e+t)/(e-t),d=-(n+s)/(n-s);let p,v;if(c)p=1/(o-r),v=o/(o-r);else if(a===On)p=-2/(o-r),v=-(o+r)/(o-r);else if(a===Xs)p=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Yi=new L,pn=new oe,Hp=new L(0,0,0),Gp=new L(1,1,1),li=new L,cr=new L,tn=new L,Nl=new oe,Fl=new an;class Wn{constructor(t=0,e=0,n=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin($t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$t(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin($t(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-$t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Nl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Nl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fl.setFromEuler(this),this.setFromQuaternion(Fl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class Bc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Wp=0;const Ol=new L,Ki=new an,$n=new oe,lr=new L,ws=new L,Xp=new L,$p=new an,kl=new L(1,0,0),Bl=new L(0,1,0),zl=new L(0,0,1),Vl={type:"added"},qp={type:"removed"},Zi={type:"childadded",child:null},Co={type:"childremoved",child:null};class Te extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=Js(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new L,e=new Wn,n=new an,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new Ot}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ki.setFromAxisAngle(t,e),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(t,e){return Ki.setFromAxisAngle(t,e),this.quaternion.premultiply(Ki),this}rotateX(t){return this.rotateOnAxis(kl,t)}rotateY(t){return this.rotateOnAxis(Bl,t)}rotateZ(t){return this.rotateOnAxis(zl,t)}translateOnAxis(t,e){return Ol.copy(t).applyQuaternion(this.quaternion),this.position.add(Ol.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(kl,t)}translateY(t){return this.translateOnAxis(Bl,t)}translateZ(t){return this.translateOnAxis(zl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?lr.copy(t):lr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(ws,lr,this.up):$n.lookAt(lr,ws,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),Ki.setFromRotationMatrix($n),this.quaternion.premultiply(Ki.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vl),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qp),Co.child=t,this.dispatchEvent(Co),Co.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),$n.multiply(t.parent.matrixWorld)),t.applyMatrix4($n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vl),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,t,Xp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,$p,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),f=o(t.shapes),u=o(t.skeletons),d=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Te.DEFAULT_UP=new L(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _n extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yp={type:"move"};class Ro{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,p=.005;l.inputState.pinching&&u>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Yp)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new _n;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},hr={h:0,s:0,l:0};function Po(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=Np(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Po(o,r,t+1/3),this.g=Po(o,r,t),this.b=Po(o,r,t-1/3)}return Xt.colorSpaceToWorking(this,s),this}setStyle(t,e=hn){function n(r){r!==void 0&&parseFloat(r)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ut("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){const n=Wu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ii(t.r),this.g=ii(t.g),this.b=ii(t.b),this}copyLinearToSRGB(t){return this.r=ps(t.r),this.g=ps(t.g),this.b=ps(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return Xt.workingToColorSpace(ke.copy(this),t),Math.round($t(ke.r*255,0,255))*65536+Math.round($t(ke.g*255,0,255))*256+Math.round($t(ke.b*255,0,255))}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.workingToColorSpace(ke.copy(this),e);const n=ke.r,s=ke.g,r=ke.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.workingToColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=hn){Xt.workingToColorSpace(ke.copy(this),t);const e=ke.r,n=ke.g,s=ke.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(hi),this.setHSL(hi.h+t,hi.s+e,hi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(hi),t.getHSL(hr);const n=So(hi.h,hr.h,e),s=So(hi.s,hr.s,e),r=So(hi.l,hr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ke=new Gt;Gt.NAMES=Wu;class nc extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const mn=new L,qn=new L,Io=new L,Yn=new L,ji=new L,Ji=new L,Hl=new L,Lo=new L,Do=new L,Uo=new L,No=new ue,Fo=new ue,Oo=new ue;class Mn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),mn.subVectors(t,e),s.cross(mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){mn.subVectors(s,e),qn.subVectors(n,e),Io.subVectors(t,e);const o=mn.dot(mn),a=mn.dot(qn),c=mn.dot(Io),l=qn.dot(qn),h=qn.dot(Io),f=o*l-a*a;if(f===0)return r.set(0,0,0),null;const u=1/f,d=(l*c-a*h)*u,p=(o*h-a*c)*u;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Yn.x),c.addScaledVector(o,Yn.y),c.addScaledVector(a,Yn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return No.setScalar(0),Fo.setScalar(0),Oo.setScalar(0),No.fromBufferAttribute(t,e),Fo.fromBufferAttribute(t,n),Oo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(No,r.x),o.addScaledVector(Fo,r.y),o.addScaledVector(Oo,r.z),o}static isFrontFacing(t,e,n,s){return mn.subVectors(n,e),qn.subVectors(t,e),mn.cross(qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),mn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Mn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ji.subVectors(s,n),Ji.subVectors(r,n),Lo.subVectors(t,n);const c=ji.dot(Lo),l=Ji.dot(Lo);if(c<=0&&l<=0)return e.copy(n);Do.subVectors(t,s);const h=ji.dot(Do),f=Ji.dot(Do);if(h>=0&&f<=h)return e.copy(s);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ji,o);Uo.subVectors(t,r);const d=ji.dot(Uo),p=Ji.dot(Uo);if(p>=0&&d<=p)return e.copy(r);const v=d*l-c*p;if(v<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(Ji,a);const g=h*p-d*f;if(g<=0&&f-h>=0&&d-p>=0)return Hl.subVectors(r,s),a=(f-h)/(f-h+(d-p)),e.copy(s).addScaledVector(Hl,a);const m=1/(g+v+u);return o=v*m,a=u*m,e.copy(n).addScaledVector(ji,o).addScaledVector(Ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Qs{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ur.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ur.copy(n.boundingBox)),ur.applyMatrix4(t.matrixWorld),this.union(ur)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Es),fr.subVectors(this.max,Es),Qi.subVectors(t.a,Es),ts.subVectors(t.b,Es),es.subVectors(t.c,Es),ui.subVectors(ts,Qi),fi.subVectors(es,ts),wi.subVectors(Qi,es);let e=[0,-ui.z,ui.y,0,-fi.z,fi.y,0,-wi.z,wi.y,ui.z,0,-ui.x,fi.z,0,-fi.x,wi.z,0,-wi.x,-ui.y,ui.x,0,-fi.y,fi.x,0,-wi.y,wi.x,0];return!ko(e,Qi,ts,es,fr)||(e=[1,0,0,0,1,0,0,0,1],!ko(e,Qi,ts,es,fr))?!1:(dr.crossVectors(ui,fi),e=[dr.x,dr.y,dr.z],ko(e,Qi,ts,es,fr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Kn=[new L,new L,new L,new L,new L,new L,new L,new L],gn=new L,ur=new Qs,Qi=new L,ts=new L,es=new L,ui=new L,fi=new L,wi=new L,Es=new L,fr=new L,dr=new L,Ei=new L;function ko(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ei.fromArray(i,r);const a=s.x*Math.abs(Ei.x)+s.y*Math.abs(Ei.y)+s.z*Math.abs(Ei.z),c=t.dot(Ei),l=e.dot(Ei),h=n.dot(Ei);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Me=new L,pr=new Wt;let Kp=0;class Vn extends Hi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Cl,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)pr.fromBufferAttribute(this,e),pr.applyMatrix3(t),this.setXY(e,pr.x,pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ss(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=qe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ss(e,this.array)),e}setX(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ss(e,this.array)),e}setY(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ss(e,this.array)),e}setZ(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ss(e,this.array)),e}setW(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),s=qe(s,this.array),r=qe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cl&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Xu extends Vn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class $u extends Vn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Zt extends Vn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Zp=new Qs,Ts=new L,Bo=new L;class tr{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Zp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ts.subVectors(t,this.center);const e=Ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ts,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ts.copy(t.center).add(Bo)),this.expandByPoint(Ts.copy(t.center).sub(Bo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let jp=0;const ln=new oe,zo=new Te,ns=new L,en=new Qs,As=new Qs,Pe=new L;class he extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=Js(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ip(t)?$u:Xu)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,n){return ln.makeTranslation(t,e,n),this.applyMatrix4(ln),this}scale(t,e,n){return ln.makeScale(t,e,n),this.applyMatrix4(ln),this}lookAt(t){return zo.lookAt(t),zo.updateMatrix(),this.applyMatrix4(zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];As.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(en.min,As.min),en.expandByPoint(Pe),Pe.addVectors(en.max,As.max),en.expandByPoint(Pe)):(en.expandByPoint(As.min),en.expandByPoint(As.max))}en.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Pe.fromBufferAttribute(a,l),c&&(ns.fromBufferAttribute(t,l),Pe.add(ns)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Vn(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let M=0;M<n.count;M++)a[M]=new L,c[M]=new L;const l=new L,h=new L,f=new L,u=new Wt,d=new Wt,p=new Wt,v=new L,g=new L;function m(M,E,P){l.fromBufferAttribute(n,M),h.fromBufferAttribute(n,E),f.fromBufferAttribute(n,P),u.fromBufferAttribute(r,M),d.fromBufferAttribute(r,E),p.fromBufferAttribute(r,P),h.sub(l),f.sub(l),d.sub(u),p.sub(u);const C=1/(d.x*p.y-p.x*d.y);isFinite(C)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(C),g.copy(f).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(C),a[M].add(v),a[E].add(v),a[P].add(v),c[M].add(g),c[E].add(g),c[P].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let M=0,E=x.length;M<E;++M){const P=x[M],C=P.start,I=P.count;for(let V=C,O=C+I;V<O;V+=3)m(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const y=new L,_=new L,S=new L,w=new L;function A(M){S.fromBufferAttribute(s,M),w.copy(S);const E=a[M];y.copy(E),y.sub(S.multiplyScalar(S.dot(E))).normalize(),_.crossVectors(w,E);const C=_.dot(c[M])<0?-1:1;o.setXYZW(M,y.x,y.y,y.z,C)}for(let M=0,E=x.length;M<E;++M){const P=x[M],C=P.start,I=P.count;for(let V=C,O=C+I;V<O;V+=3)A(t.getX(V+0)),A(t.getX(V+1)),A(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Vn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,f=new L;if(t)for(let u=0,d=t.count;u<d;u+=3){const p=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,f=a.normalized,u=new l.constructor(c.length*h);let d=0,p=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*h;for(let m=0;m<h;m++)u[p++]=l[d++]}return new Vn(u,h,f)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new he,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,f=l.length;h<f;h++){const u=l[h],d=t(u,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const d=l[f];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Jp=0;class Gi extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=Js(),this.name="",this.type="Material",this.blending=fs,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pa,this.blendDst=ma,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ut(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ut(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==_i&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==pa&&(n.blendSrc=this.blendSrc),this.blendDst!==ma&&(n.blendDst=this.blendDst),this.blendEquation!==Ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Gt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Wt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Wt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Zn=new L,Vo=new L,mr=new L,di=new L,Ho=new L,gr=new L,Go=new L;class ho{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Vo.copy(t).add(e).multiplyScalar(.5),mr.copy(e).sub(t).normalize(),di.copy(this.origin).sub(Vo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(mr),a=di.dot(this.direction),c=-di.dot(mr),l=di.lengthSq(),h=Math.abs(1-o*o);let f,u,d,p;if(h>0)if(f=o*c-a,u=o*a-c,p=r*h,f>=0)if(u>=-p)if(u<=p){const v=1/h;f*=v,u*=v,d=f*(f+o*u+2*a)+u*(o*f+u+2*c)+l}else u=r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*c)+l;else u=-r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*c)+l;else u<=-p?(f=Math.max(0,-(-o*r+a)),u=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l):u<=p?(f=0,u=Math.min(Math.max(-r,-c),r),d=u*(u+2*c)+l):(f=Math.max(0,-(o*r+a)),u=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+u*(u+2*c)+l);else u=o>0?-r:r,f=Math.max(0,-(o*u+a)),d=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Vo).addScaledVector(mr,u),d}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);const n=Zn.dot(this.direction),s=Zn.dot(Zn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-u.z)*f,c=(t.max.z-u.z)*f):(a=(t.max.z-u.z)*f,c=(t.min.z-u.z)*f),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,s,r){Ho.subVectors(e,t),gr.subVectors(n,t),Go.crossVectors(Ho,gr);let o=this.direction.dot(Go),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;di.subVectors(this.origin,t);const c=a*this.direction.dot(gr.crossVectors(di,gr));if(c<0)return null;const l=a*this.direction.dot(Ho.cross(di));if(l<0||c+l>o)return null;const h=-a*di.dot(Go);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bn extends Gi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Gl=new oe,Ti=new ho,vr=new tr,Wl=new L,xr=new L,_r=new L,Mr=new L,Wo=new L,yr=new L,Xl=new L,br=new L;let be=class extends Te{constructor(t=new he,e=new bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){yr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],f=r[c];h!==0&&(Wo.fromBufferAttribute(f,t),o?yr.addScaledVector(Wo,h):yr.addScaledVector(Wo.sub(e),h))}e.add(yr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(r),Ti.copy(t.ray).recast(t.near),!(vr.containsPoint(Ti.origin)===!1&&(Ti.intersectSphere(vr,Wl)===null||Ti.origin.distanceToSquared(Wl)>(t.far-t.near)**2))&&(Gl.copy(r).invert(),Ti.copy(t.ray).applyMatrix4(Gl),!(n.boundingBox!==null&&Ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ti)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=o[g.materialIndex],x=Math.max(g.start,d.start),y=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let _=x,S=y;_<S;_+=3){const w=a.getX(_),A=a.getX(_+1),M=a.getX(_+2);s=Sr(this,m,t,n,l,h,f,w,A,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const x=a.getX(g),y=a.getX(g+1),_=a.getX(g+2);s=Sr(this,o,t,n,l,h,f,x,y,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=o[g.materialIndex],x=Math.max(g.start,d.start),y=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let _=x,S=y;_<S;_+=3){const w=_,A=_+1,M=_+2;s=Sr(this,m,t,n,l,h,f,w,A,M),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const x=g,y=g+1,_=g+2;s=Sr(this,o,t,n,l,h,f,x,y,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Qp(i,t,e,n,s,r,o,a){let c;if(t.side===Je?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===_i,a),c===null)return null;br.copy(a),br.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(br);return l<e.near||l>e.far?null:{distance:l,point:br.clone(),object:i}}function Sr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,xr),i.getVertexPosition(c,_r),i.getVertexPosition(l,Mr);const h=Qp(i,t,e,n,xr,_r,Mr,Xl);if(h){const f=new L;Mn.getBarycoord(Xl,xr,_r,Mr,f),s&&(h.uv=Mn.getInterpolatedAttribute(s,a,c,l,f,new Wt)),r&&(h.uv1=Mn.getInterpolatedAttribute(r,a,c,l,f,new Wt)),o&&(h.normal=Mn.getInterpolatedAttribute(o,a,c,l,f,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new L,materialIndex:0};Mn.getNormal(xr,_r,Mr,u.normal),h.face=u,h.barycoord=f}return h}class tm extends He{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Ie,h=Ie,f,u){super(null,o,a,c,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xo=new L,em=new L,nm=new Ot;class Qn{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Xo.subVectors(n,e).cross(em.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Xo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||nm.getNormalMatrix(t),s=this.coplanarPoint(Xo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ai=new tr,im=new Wt(.5,.5),wr=new L;class zc{constructor(t=new Qn,e=new Qn,n=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],p=r[8],v=r[9],g=r[10],m=r[11],x=r[12],y=r[13],_=r[14],S=r[15];if(s[0].setComponents(l-o,d-h,m-p,S-x).normalize(),s[1].setComponents(l+o,d+h,m+p,S+x).normalize(),s[2].setComponents(l+a,d+f,m+v,S+y).normalize(),s[3].setComponents(l-a,d-f,m-v,S-y).normalize(),n)s[4].setComponents(c,u,g,_).normalize(),s[5].setComponents(l-c,d-u,m-g,S-_).normalize();else if(s[4].setComponents(l-c,d-u,m-g,S-_).normalize(),e===On)s[5].setComponents(l+c,d+u,m+g,S+_).normalize();else if(e===Xs)s[5].setComponents(c,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(t){Ai.center.set(0,0,0);const e=im.distanceTo(t.center);return Ai.radius=.7071067811865476+e,Ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(wr.x=s.normal.x>0?t.max.x:t.min.x,wr.y=s.normal.y>0?t.max.y:t.min.y,wr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(wr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ye extends Gi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const eo=new L,no=new L,$l=new oe,Cs=new ho,Er=new tr,$o=new L,ql=new L;class er extends Te{constructor(t=new he,e=new ye){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)eo.fromBufferAttribute(e,s-1),no.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=eo.distanceTo(no);t.setAttribute("lineDistance",new Zt(n,1))}else Ut("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(s),Er.radius+=r,t.ray.intersectsSphere(Er)===!1)return;$l.copy(s).invert(),Cs.copy(t.ray).applyMatrix4($l);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=l){const m=h.getX(v),x=h.getX(v+1),y=Tr(this,t,Cs,c,m,x,v);y&&e.push(y)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(d),m=Tr(this,t,Cs,c,v,g,p-1);m&&e.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=l){const m=Tr(this,t,Cs,c,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=Tr(this,t,Cs,c,p-1,d,p-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Tr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(eo.fromBufferAttribute(a,s),no.fromBufferAttribute(a,r),e.distanceSqToSegment(eo,no,$o,ql)>n)return;$o.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo($o);if(!(l<t.near||l>t.far))return{distance:l,point:ql.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Yl=new L,Kl=new L;class Dn extends er{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Yl.fromBufferAttribute(e,s),Kl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Yl.distanceTo(Kl);t.setAttribute("lineDistance",new Zt(n,1))}else Ut("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rn extends Gi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Zl=new oe,ic=new ho,Ar=new tr,Cr=new L;class dn extends Te{constructor(t=new he,e=new rn){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(s),Ar.radius+=r,t.ray.intersectsSphere(Ar)===!1)return;Zl.copy(s).invert(),ic.copy(t.ray).applyMatrix4(Zl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let p=u,v=d;p<v;p++){const g=l.getX(p);Cr.fromBufferAttribute(f,g),jl(Cr,g,c,s,t,e,this)}}else{const u=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let p=u,v=d;p<v;p++)Cr.fromBufferAttribute(f,p),jl(Cr,p,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function jl(i,t,e,n,s,r,o){const a=ic.distanceSqToPoint(i);if(a<e){const c=new L;ic.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class qu extends He{constructor(t=[],e=Oi,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Yu extends He{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _s extends He{constructor(t,e,n=Gn,s,r,o,a=Ie,c=Ie,l,h=ri,f=1){if(h!==ri&&h!==Ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:f};super(u,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new kc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class sm extends _s{constructor(t,e=Gn,n=Oi,s,r,o=Ie,a=Ie,c,l=ri){const h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Ku extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class zi extends he{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],f=[];let u=0,d=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,s,o,2),p("x","z","y",1,-1,t,n,-e,s,o,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(f,2));function p(v,g,m,x,y,_,S,w,A,M,E){const P=_/A,C=S/M,I=_/2,V=S/2,O=w/2,D=A+1,z=M+1;let N=0,q=0;const j=new L;for(let it=0;it<z;it++){const tt=it*C-V;for(let ot=0;ot<D;ot++){const At=ot*P-I;j[v]=At*x,j[g]=tt*y,j[m]=O,l.push(j.x,j.y,j.z),j[v]=0,j[g]=0,j[m]=w>0?1:-1,h.push(j.x,j.y,j.z),f.push(ot/A),f.push(1-it/M),N+=1}}for(let it=0;it<M;it++)for(let tt=0;tt<A;tt++){const ot=u+tt+D*it,At=u+tt+D*(it+1),Ft=u+(tt+1)+D*(it+1),Ct=u+(tt+1)+D*it;c.push(ot,At,Ct),c.push(At,Ft,Ct),q+=6}a.addGroup(d,q,E),d+=q,u+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Vc extends he{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],u=[],d=[];let p=0;const v=[],g=n/2;let m=0;x(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Zt(f,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(d,2));function x(){const _=new L,S=new L;let w=0;const A=(e-t)/n;for(let M=0;M<=r;M++){const E=[],P=M/r,C=P*(e-t)+t;for(let I=0;I<=s;I++){const V=I/s,O=V*c+a,D=Math.sin(O),z=Math.cos(O);S.x=C*D,S.y=-P*n+g,S.z=C*z,f.push(S.x,S.y,S.z),_.set(D,A,z).normalize(),u.push(_.x,_.y,_.z),d.push(V,1-P),E.push(p++)}v.push(E)}for(let M=0;M<s;M++)for(let E=0;E<r;E++){const P=v[E][M],C=v[E+1][M],I=v[E+1][M+1],V=v[E][M+1];(t>0||E!==0)&&(h.push(P,C,V),w+=3),(e>0||E!==r-1)&&(h.push(C,I,V),w+=3)}l.addGroup(m,w,0),m+=w}function y(_){const S=p,w=new Wt,A=new L;let M=0;const E=_===!0?t:e,P=_===!0?1:-1;for(let I=1;I<=s;I++)f.push(0,g*P,0),u.push(0,P,0),d.push(.5,.5),p++;const C=p;for(let I=0;I<=s;I++){const O=I/s*c+a,D=Math.cos(O),z=Math.sin(O);A.x=E*z,A.y=g*P,A.z=E*D,f.push(A.x,A.y,A.z),u.push(0,P,0),w.x=D*.5+.5,w.y=z*.5*P+.5,d.push(w.x,w.y),p++}for(let I=0;I<s;I++){const V=S+I,O=C+I;_===!0?h.push(O,O+1,V):h.push(O+1,O,V),M+=3}l.addGroup(m,M,_===!0?1:2),m+=M}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vc(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Hc extends Vc{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Hc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class nr extends he{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,f=t/a,u=e/c,d=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const x=m*u-o;for(let y=0;y<l;y++){const _=y*f-r;p.push(_,-x,0),v.push(0,0,1),g.push(y/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const y=x+l*m,_=x+l*(m+1),S=x+1+l*(m+1),w=x+1+l*m;d.push(y,_,w),d.push(_,S,w)}this.setIndex(d),this.setAttribute("position",new Zt(p,3)),this.setAttribute("normal",new Zt(v,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.width,t.height,t.widthSegments,t.heightSegments)}}class Gc extends he{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],f=new L,u=new L,d=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const x=[],y=m/n,_=o+y*a,S=t*Math.cos(_),w=Math.sqrt(t*t-S*S);let A=0;m===0&&o===0?A=.5/e:m===n&&c===Math.PI&&(A=-.5/e);for(let M=0;M<=e;M++){const E=M/e,P=s+E*r;f.x=-w*Math.cos(P),f.y=S,f.z=w*Math.sin(P),p.push(f.x,f.y,f.z),u.copy(f).normalize(),v.push(u.x,u.y,u.z),g.push(E+A,1-y),x.push(l++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const y=h[m][x+1],_=h[m][x],S=h[m+1][x],w=h[m+1][x+1];(m!==0||o>0)&&d.push(y,_,w),(m!==n-1||c<Math.PI)&&d.push(_,S,w)}this.setIndex(d),this.setAttribute("position",new Zt(p,3)),this.setAttribute("normal",new Zt(v,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Ms(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Jl(s))s.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Jl(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function We(i){const t={};for(let e=0;e<i.length;e++){const n=Ms(i[e]);for(const s in n)t[s]=n[s]}return t}function Jl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function rm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Zu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const om={clone:Ms,merge:We};var am=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends Gi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=am,this.fragmentShader=cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=rm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Gt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Wt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ue().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"m4":this.uniforms[n].value=new oe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class lm extends Xn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ju extends Gi{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Gt(16777215),this.specular=new Gt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tc,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Rc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class hm extends Gi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class um extends Gi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ju extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class fm extends Ju{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const qo=new oe,Ql=new L,th=new L;class dm{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zc,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ql.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ql),th.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(th),e.updateMatrixWorld(),qo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qo,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Xs||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Rr=new L,Pr=new an,An=new L;class Qu extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Rr,Pr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rr,Pr,An.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Rr,Pr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Rr,Pr,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const pi=new L,eh=new Wt,nh=new Wt;class fn extends Qu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ec*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(bo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ec*2*Math.atan(Math.tan(bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(pi.x,pi.y).multiplyScalar(-t/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-t/pi.z)}getViewSize(t,e){return this.getViewBounds(t,eh,nh),e.subVectors(nh,eh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(bo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class ir extends Qu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class pm extends dm{constructor(){super(new ir(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ih extends Ju{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new pm}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const is=-90,ss=1;class mm extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new fn(is,ss,t,e);s.layers=this.layers,this.add(s);const r=new fn(is,ss,t,e);r.layers=this.layers,this.add(r);const o=new fn(is,ss,t,e);o.layers=this.layers,this.add(o);const a=new fn(is,ss,t,e);a.layers=this.layers,this.add(a);const c=new fn(is,ss,t,e);c.layers=this.layers,this.add(c);const l=new fn(is,ss,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class gm extends fn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const sh=new oe;class tf{constructor(t,e,n=0,s=1/0){this.ray=new ho(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Bc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):qt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return sh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sh),this}intersectObject(t,e=!0,n=[]){return sc(t,this,n,e),n.sort(rh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)sc(t[s],this,n,e);return n.sort(rh),n}}function rh(i,t){return i.distance-t.distance}function sc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)sc(r[o],t,e,!0)}}class ef{static{ef.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}}class vm extends Dn{constructor(t=10,e=10,n=4473924,s=8947848){n=new Gt(n),s=new Gt(s);const r=e/2,o=t/e,a=t/2,c=[],l=[];for(let u=0,d=0,p=-a;u<=e;u++,p+=o){c.push(-a,0,p,a,0,p),c.push(p,0,-a,p,0,a);const v=u===r?n:s;v.toArray(l,d),d+=3,v.toArray(l,d),d+=3,v.toArray(l,d),d+=3,v.toArray(l,d),d+=3}const h=new he;h.setAttribute("position",new Zt(c,3)),h.setAttribute("color",new Zt(l,3));const f=new ye({vertexColors:!0,toneMapped:!1});super(h,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function oh(i,t,e,n){const s=xm(n);switch(e){case Bu:return i*t;case Vu:return i*t/s.components*s.byteLength;case Dc:return i*t/s.components*s.byteLength;case Bi:return i*t*2/s.components*s.byteLength;case Uc:return i*t*2/s.components*s.byteLength;case zu:return i*t*3/s.components*s.byteLength;case yn:return i*t*4/s.components*s.byteLength;case Nc:return i*t*4/s.components*s.byteLength;case Gr:case Wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Xr:case $r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ea:case Aa:return Math.max(i,16)*Math.max(t,8)/4;case wa:case Ta:return Math.max(i,8)*Math.max(t,8)/2;case Ca:case Ra:case Ia:case La:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Pa:case Zr:case Da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Na:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Fa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ka:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Va:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case $a:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case qa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ya:case Ka:case Za:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ja:case Ja:return Math.ceil(i/4)*Math.ceil(t/4)*8;case jr:case Qa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xm(i){switch(i){case sn:case Nu:return{byteLength:1,components:1};case Gs:case Fu:case si:return{byteLength:2,components:1};case Ic:case Lc:return{byteLength:2,components:4};case Gn:case Pc:case Fn:return{byteLength:4,components:1};case Ou:case ku:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cc}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function nf(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function _m(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((d,p)=>d.start-p.start);let u=0;for(let d=1;d<f.length;d++){const p=f[u],v=f[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++u,f[u]=v)}f.length=u+1;for(let d=0,p=f.length;d<p;d++){const v=f[d];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Mm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ym=`#ifdef USE_ALPHAHASH
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
#endif`,bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Em=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tm=`#ifdef USE_AOMAP
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
#endif`,Am=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cm=`#ifdef USE_BATCHING
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
#endif`,Rm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Im=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Lm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Dm=`#ifdef USE_IRIDESCENCE
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
#endif`,Um=`#ifdef USE_BUMPMAP
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
#endif`,Nm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Om=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,km=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,zm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Vm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Hm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Gm=`#define PI 3.141592653589793
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
} // validated`,Wm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xm=`vec3 transformedNormal = objectNormal;
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
#endif`,$m=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ym=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Km=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zm="gl_FragColor = linearToOutputTexel( gl_FragColor );",jm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jm=`#ifdef USE_ENVMAP
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
#endif`,Qm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tg=`#ifdef USE_ENVMAP
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
#endif`,eg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ng=`#ifdef USE_ENVMAP
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
#endif`,ig=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,og=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ag=`#ifdef USE_GRADIENTMAP
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
}`,cg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ug=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,fg=`#ifdef USE_ENVMAP
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
#endif`,dg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vg=`PhysicalMaterial material;
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
#endif`,xg=`uniform sampler2D dfgLUT;
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
}`,_g=`
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
#endif`,Mg=`#if defined( RE_IndirectDiffuse )
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
#endif`,yg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Sg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Eg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ag=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pg=`#if defined( USE_POINTS_UV )
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
#endif`,Ig=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ug=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ng=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fg=`#ifdef USE_MORPHTARGETS
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
#endif`,Og=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Bg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Gg=`#ifdef USE_NORMALMAP
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
#endif`,Wg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$g=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,e0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,n0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,i0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,s0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,r0=`float getShadowMask() {
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
}`,o0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,a0=`#ifdef USE_SKINNING
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
#endif`,c0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,l0=`#ifdef USE_SKINNING
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
#endif`,h0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,u0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,f0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,d0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,p0=`#ifdef USE_TRANSMISSION
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
#endif`,m0=`#ifdef USE_TRANSMISSION
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
#endif`,g0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,v0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,x0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const M0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,y0=`uniform sampler2D t2D;
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
}`,b0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,S0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,w0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,E0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T0=`#include <common>
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
}`,A0=`#if DEPTH_PACKING == 3200
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
}`,C0=`#define DISTANCE
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
}`,R0=`#define DISTANCE
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
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,I0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`uniform float scale;
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
}`,D0=`uniform vec3 diffuse;
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
}`,U0=`#include <common>
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
}`,N0=`uniform vec3 diffuse;
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
}`,F0=`#define LAMBERT
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
}`,O0=`#define LAMBERT
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
}`,k0=`#define MATCAP
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
}`,B0=`#define MATCAP
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
}`,z0=`#define NORMAL
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
}`,V0=`#define NORMAL
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
}`,H0=`#define PHONG
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
}`,G0=`#define PHONG
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
}`,W0=`#define STANDARD
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
}`,X0=`#define STANDARD
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
}`,$0=`#define TOON
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
}`,q0=`#define TOON
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
}`,Y0=`uniform float size;
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
}`,K0=`uniform vec3 diffuse;
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
}`,Z0=`#include <common>
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
}`,j0=`uniform vec3 color;
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
}`,J0=`uniform float rotation;
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
}`,Q0=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:Mm,alphahash_pars_fragment:ym,alphamap_fragment:bm,alphamap_pars_fragment:Sm,alphatest_fragment:wm,alphatest_pars_fragment:Em,aomap_fragment:Tm,aomap_pars_fragment:Am,batching_pars_vertex:Cm,batching_vertex:Rm,begin_vertex:Pm,beginnormal_vertex:Im,bsdfs:Lm,iridescence_fragment:Dm,bumpmap_pars_fragment:Um,clipping_planes_fragment:Nm,clipping_planes_pars_fragment:Fm,clipping_planes_pars_vertex:Om,clipping_planes_vertex:km,color_fragment:Bm,color_pars_fragment:zm,color_pars_vertex:Vm,color_vertex:Hm,common:Gm,cube_uv_reflection_fragment:Wm,defaultnormal_vertex:Xm,displacementmap_pars_vertex:$m,displacementmap_vertex:qm,emissivemap_fragment:Ym,emissivemap_pars_fragment:Km,colorspace_fragment:Zm,colorspace_pars_fragment:jm,envmap_fragment:Jm,envmap_common_pars_fragment:Qm,envmap_pars_fragment:tg,envmap_pars_vertex:eg,envmap_physical_pars_fragment:fg,envmap_vertex:ng,fog_vertex:ig,fog_pars_vertex:sg,fog_fragment:rg,fog_pars_fragment:og,gradientmap_pars_fragment:ag,lightmap_pars_fragment:cg,lights_lambert_fragment:lg,lights_lambert_pars_fragment:hg,lights_pars_begin:ug,lights_toon_fragment:dg,lights_toon_pars_fragment:pg,lights_phong_fragment:mg,lights_phong_pars_fragment:gg,lights_physical_fragment:vg,lights_physical_pars_fragment:xg,lights_fragment_begin:_g,lights_fragment_maps:Mg,lights_fragment_end:yg,lightprobes_pars_fragment:bg,logdepthbuf_fragment:Sg,logdepthbuf_pars_fragment:wg,logdepthbuf_pars_vertex:Eg,logdepthbuf_vertex:Tg,map_fragment:Ag,map_pars_fragment:Cg,map_particle_fragment:Rg,map_particle_pars_fragment:Pg,metalnessmap_fragment:Ig,metalnessmap_pars_fragment:Lg,morphinstance_vertex:Dg,morphcolor_vertex:Ug,morphnormal_vertex:Ng,morphtarget_pars_vertex:Fg,morphtarget_vertex:Og,normal_fragment_begin:kg,normal_fragment_maps:Bg,normal_pars_fragment:zg,normal_pars_vertex:Vg,normal_vertex:Hg,normalmap_pars_fragment:Gg,clearcoat_normal_fragment_begin:Wg,clearcoat_normal_fragment_maps:Xg,clearcoat_pars_fragment:$g,iridescence_pars_fragment:qg,opaque_fragment:Yg,packing:Kg,premultiplied_alpha_fragment:Zg,project_vertex:jg,dithering_fragment:Jg,dithering_pars_fragment:Qg,roughnessmap_fragment:t0,roughnessmap_pars_fragment:e0,shadowmap_pars_fragment:n0,shadowmap_pars_vertex:i0,shadowmap_vertex:s0,shadowmask_pars_fragment:r0,skinbase_vertex:o0,skinning_pars_vertex:a0,skinning_vertex:c0,skinnormal_vertex:l0,specularmap_fragment:h0,specularmap_pars_fragment:u0,tonemapping_fragment:f0,tonemapping_pars_fragment:d0,transmission_fragment:p0,transmission_pars_fragment:m0,uv_pars_fragment:g0,uv_pars_vertex:v0,uv_vertex:x0,worldpos_vertex:_0,background_vert:M0,background_frag:y0,backgroundCube_vert:b0,backgroundCube_frag:S0,cube_vert:w0,cube_frag:E0,depth_vert:T0,depth_frag:A0,distance_vert:C0,distance_frag:R0,equirect_vert:P0,equirect_frag:I0,linedashed_vert:L0,linedashed_frag:D0,meshbasic_vert:U0,meshbasic_frag:N0,meshlambert_vert:F0,meshlambert_frag:O0,meshmatcap_vert:k0,meshmatcap_frag:B0,meshnormal_vert:z0,meshnormal_frag:V0,meshphong_vert:H0,meshphong_frag:G0,meshphysical_vert:W0,meshphysical_frag:X0,meshtoon_vert:$0,meshtoon_frag:q0,points_vert:Y0,points_frag:K0,shadow_vert:Z0,shadow_frag:j0,sprite_vert:J0,sprite_frag:Q0},pt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},In={basic:{uniforms:We([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:We([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:We([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:We([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:We([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:We([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:We([pt.points,pt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:We([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:We([pt.common,pt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:We([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:We([pt.sprite,pt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:We([pt.common,pt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:We([pt.lights,pt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};In.physical={uniforms:We([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const Ir={r:0,b:0,g:0},tv=new oe,sf=new Ot;sf.set(-1,0,0,0,1,0,0,0,1);function ev(i,t,e,n,s,r){const o=new Gt(0);let a=s===!0?0:1,c,l,h=null,f=0,u=null;function d(x){let y=x.isScene===!0?x.background:null;if(y&&y.isTexture){const _=x.backgroundBlurriness>0;y=t.get(y,_)}return y}function p(x){let y=!1;const _=d(x);_===null?g(o,a):_&&_.isColor&&(g(_,1),y=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,y){const _=d(y);_&&(_.isCubeTexture||_.mapping===lo)?(l===void 0&&(l=new be(new zi(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:Ms(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(tv.makeRotationFromEuler(y.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(sf),l.material.toneMapped=Xt.getTransfer(_.colorSpace)!==te,(h!==_||f!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,u=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new be(new nr(2,2),new Xn({name:"BackgroundMaterial",uniforms:Ms(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(_.colorSpace)!==te,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,f=_.version,u=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function g(x,y){x.getRGB(Ir,Zu(i)),e.buffers.color.setClear(Ir.r,Ir.g,Ir.b,y,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),a=y,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,g(o,a)},render:p,addToRenderList:v,dispose:m}}function nv(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(C,I,V,O,D){let z=!1;const N=f(C,O,V,I);r!==N&&(r=N,l(r.object)),z=d(C,O,V,D),z&&p(C,O,V,D),D!==null&&t.update(D,i.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,_(C,I,V,O),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function h(C){return i.deleteVertexArray(C)}function f(C,I,V,O){const D=O.wireframe===!0;let z=n[I.id];z===void 0&&(z={},n[I.id]=z);const N=C.isInstancedMesh===!0?C.id:0;let q=z[N];q===void 0&&(q={},z[N]=q);let j=q[V.id];j===void 0&&(j={},q[V.id]=j);let it=j[D];return it===void 0&&(it=u(c()),j[D]=it),it}function u(C){const I=[],V=[],O=[];for(let D=0;D<e;D++)I[D]=0,V[D]=0,O[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:O,object:C,attributes:{},index:null}}function d(C,I,V,O){const D=r.attributes,z=I.attributes;let N=0;const q=V.getAttributes();for(const j in q)if(q[j].location>=0){const tt=D[j];let ot=z[j];if(ot===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(ot=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(ot=C.instanceColor)),tt===void 0||tt.attribute!==ot||ot&&tt.data!==ot.data)return!0;N++}return r.attributesNum!==N||r.index!==O}function p(C,I,V,O){const D={},z=I.attributes;let N=0;const q=V.getAttributes();for(const j in q)if(q[j].location>=0){let tt=z[j];tt===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(tt=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(tt=C.instanceColor));const ot={};ot.attribute=tt,tt&&tt.data&&(ot.data=tt.data),D[j]=ot,N++}r.attributes=D,r.attributesNum=N,r.index=O}function v(){const C=r.newAttributes;for(let I=0,V=C.length;I<V;I++)C[I]=0}function g(C){m(C,0)}function m(C,I){const V=r.newAttributes,O=r.enabledAttributes,D=r.attributeDivisors;V[C]=1,O[C]===0&&(i.enableVertexAttribArray(C),O[C]=1),D[C]!==I&&(i.vertexAttribDivisor(C,I),D[C]=I)}function x(){const C=r.newAttributes,I=r.enabledAttributes;for(let V=0,O=I.length;V<O;V++)I[V]!==C[V]&&(i.disableVertexAttribArray(V),I[V]=0)}function y(C,I,V,O,D,z,N){N===!0?i.vertexAttribIPointer(C,I,V,D,z):i.vertexAttribPointer(C,I,V,O,D,z)}function _(C,I,V,O){v();const D=O.attributes,z=V.getAttributes(),N=I.defaultAttributeValues;for(const q in z){const j=z[q];if(j.location>=0){let it=D[q];if(it===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(it=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(it=C.instanceColor)),it!==void 0){const tt=it.normalized,ot=it.itemSize,At=t.get(it);if(At===void 0)continue;const Ft=At.buffer,Ct=At.type,K=At.bytesPerElement,rt=Ct===i.INT||Ct===i.UNSIGNED_INT||it.gpuType===Pc;if(it.isInterleavedBufferAttribute){const nt=it.data,Lt=nt.stride,Nt=it.offset;if(nt.isInstancedInterleavedBuffer){for(let Rt=0;Rt<j.locationSize;Rt++)m(j.location+Rt,nt.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Rt=0;Rt<j.locationSize;Rt++)g(j.location+Rt);i.bindBuffer(i.ARRAY_BUFFER,Ft);for(let Rt=0;Rt<j.locationSize;Rt++)y(j.location+Rt,ot/j.locationSize,Ct,tt,Lt*K,(Nt+ot/j.locationSize*Rt)*K,rt)}else{if(it.isInstancedBufferAttribute){for(let nt=0;nt<j.locationSize;nt++)m(j.location+nt,it.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let nt=0;nt<j.locationSize;nt++)g(j.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Ft);for(let nt=0;nt<j.locationSize;nt++)y(j.location+nt,ot/j.locationSize,Ct,tt,ot*K,ot/j.locationSize*nt*K,rt)}}else if(N!==void 0){const tt=N[q];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(j.location,tt);break;case 3:i.vertexAttrib3fv(j.location,tt);break;case 4:i.vertexAttrib4fv(j.location,tt);break;default:i.vertexAttrib1fv(j.location,tt)}}}}x()}function S(){E();for(const C in n){const I=n[C];for(const V in I){const O=I[V];for(const D in O){const z=O[D];for(const N in z)h(z[N].object),delete z[N];delete O[D]}}delete n[C]}}function w(C){if(n[C.id]===void 0)return;const I=n[C.id];for(const V in I){const O=I[V];for(const D in O){const z=O[D];for(const N in z)h(z[N].object),delete z[N];delete O[D]}}delete n[C.id]}function A(C){for(const I in n){const V=n[I];for(const O in V){const D=V[O];if(D[C.id]===void 0)continue;const z=D[C.id];for(const N in z)h(z[N].object),delete z[N];delete D[C.id]}}}function M(C){for(const I in n){const V=n[I],O=C.isInstancedMesh===!0?C.id:0,D=V[O];if(D!==void 0){for(const z in D){const N=D[z];for(const q in N)h(N[q].object),delete N[q];delete D[z]}delete V[O],Object.keys(V).length===0&&delete n[I]}}}function E(){P(),o=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:P,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfObject:M,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:x}}function iv(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function a(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function sv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==yn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const M=A===si&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==sn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Fn&&!M)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Ut("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:_,maxSamples:S,samples:w}}function rv(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Qn,a=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){const p=f.clippingPlanes,v=f.clipIntersection,g=f.clipShadows,m=i.get(f);if(!s||p===null||p.length===0||r&&!g)r?h(null):l();else{const x=r?0:n,y=x*4;let _=m.clippingState||null;c.value=_,_=h(p,u,y,d);for(let S=0;S!==y;++S)_[S]=e[S];m.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,d,p){const v=f!==null?f.length:0;let g=null;if(v!==0){if(g=c.value,p!==!0||g===null){const m=d+v*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,_=d;y!==v;++y,_+=4)o.copy(f[y]).applyMatrix4(x,a),o.normal.toArray(g,_),g[_+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}const xi=4,ah=[.125,.215,.35,.446,.526,.582],Li=20,ov=256,Rs=new ir,ch=new Gt;let Yo=null,Ko=0,Zo=0,jo=!1;const av=new L;class lh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=av}=r;Yo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),Zo=this._renderer.getActiveMipmapLevel(),jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Yo,Ko,Zo),this._renderer.xr.enabled=jo,t.scissorTest=!1,rs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Oi||t.mapping===xs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Yo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),Zo=this._renderer.getActiveMipmapLevel(),jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ve,minFilter:Ve,generateMipmaps:!1,type:si,format:yn,colorSpace:Jr,depthBuffer:!1},s=hh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hh(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=cv(r)),this._blurMaterial=hv(r,t,e),this._ggxMaterial=lv(r,t,e)}return s}_compileMaterial(t){const e=new be(new he,t);this._renderer.compile(e,Rs)}_sceneToCubeUV(t,e,n,s,r){const c=new fn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(ch),f.toneMapping=Bn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new be(new zi,new bn({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let m=!1;const x=t.background;x?x.isColor&&(g.color.copy(x),t.background=null,m=!0):(g.color.copy(ch),m=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[y],r.y,r.z)):_===1?(c.up.set(0,0,l[y]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[y],r.z)):(c.up.set(0,l[y],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[y]));const S=this._cubeSize;rs(s,_*S,y>2?S:0,S,S),f.setRenderTarget(s),m&&f.render(v,c),f.render(t,c)}f.toneMapping=d,f.autoClear=u,t.background=x}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Oi||t.mapping===xs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;rs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Rs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=0+l*1.25,d=f*u,{_lodMax:p}=this,v=this._sizeLods[n],g=3*v*(n>p-xi?n-p+xi:0),m=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=p-e,rs(r,g,m,3*v,2*v),s.setRenderTarget(r),s.render(a,Rs),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-n,rs(t,g,m,3*v,2*v),s.setRenderTarget(t),s.render(a,Rs)}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&qt("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[s];f.material=l;const u=l.uniforms,d=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Li-1),v=r/p,g=isFinite(r)?1+Math.floor(h*v):Li;g>Li&&Ut(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Li}`);const m=[];let x=0;for(let A=0;A<Li;++A){const M=A/v,E=Math.exp(-M*M/2);m.push(E),A===0?x+=E:A<g&&(x+=2*E)}for(let A=0;A<m.length;A++)m[A]=m[A]/x;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:y}=this;u.dTheta.value=p,u.mipInt.value=y-n;const _=this._sizeLods[s],S=3*_*(s>y-xi?s-y+xi:0),w=4*(this._cubeSize-_);rs(e,S,w,3*_,2*_),c.setRenderTarget(e),c.render(f,Rs)}}function cv(i){const t=[],e=[],n=[];let s=i;const r=i-xi+1+ah.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-xi?c=ah[o-i+xi-1]:o===0&&(c=0),e.push(c);const l=1/(a-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,p=6,v=3,g=2,m=1,x=new Float32Array(v*p*d),y=new Float32Array(g*p*d),_=new Float32Array(m*p*d);for(let w=0;w<d;w++){const A=w%3*2/3-1,M=w>2?0:-1,E=[A,M,0,A+2/3,M,0,A+2/3,M+1,0,A,M,0,A+2/3,M+1,0,A,M+1,0];x.set(E,v*p*w),y.set(u,g*p*w);const P=[w,w,w,w,w,w];_.set(P,m*p*w)}const S=new he;S.setAttribute("position",new Vn(x,v)),S.setAttribute("uv",new Vn(y,g)),S.setAttribute("faceIndex",new Vn(_,m)),n.push(new be(S,null)),s>xi&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function hh(i,t,e){const n=new zn(i,t,e);return n.texture.mapping=lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function lv(i,t,e){return new Xn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ov,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:uo(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function hv(i,t,e){const n=new Float32Array(Li),s=new L(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:Li,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:uo(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function uh(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uo(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function fh(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function uo(){return`

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
	`}class rf extends zn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new qu(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new zi(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:ni});r.uniforms.tEquirect.value=e;const o=new be(s,r),a=e.minFilter;return e.minFilter===Ui&&(e.minFilter=Ve),new mm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}function uv(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?o(u):r(u)}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===_o||d===Mo)if(t.has(u)){const p=t.get(u).texture;return a(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const v=new rf(p.height);return v.fromEquirectangularTexture(i,u),t.set(u,v),u.addEventListener("dispose",l),a(v.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const d=u.mapping,p=d===_o||d===Mo,v=d===Oi||d===xs;if(p||v){let g=e.get(u);const m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new lh(i)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{const x=u.image;return p&&x&&x.height>0||v&&x&&c(x)?(n===null&&(n=new lh(i)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,d){return d===_o?u.mapping=Oi:d===Mo&&(u.mapping=xs),u}function c(u){let d=0;const p=6;for(let v=0;v<p;v++)u[v]!==void 0&&d++;return d===p}function l(u){const d=u.target;d.removeEventListener("dispose",l);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function fv(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ds("WebGLRenderer: "+n+" extension not supported."),s}}}function dv(i,t,e,n){const s={},r=new WeakMap;function o(f){const u=f.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete s[u.id];const d=r.get(u);d&&(t.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(f,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(f){const u=f.attributes;for(const d in u)t.update(u[d],i.ARRAY_BUFFER)}function l(f){const u=[],d=f.index,p=f.attributes.position;let v=0;if(p===void 0)return;if(d!==null){const x=d.array;v=d.version;for(let y=0,_=x.length;y<_;y+=3){const S=x[y+0],w=x[y+1],A=x[y+2];u.push(S,w,w,A,A,S)}}else{const x=p.array;v=p.version;for(let y=0,_=x.length/3-1;y<_;y+=3){const S=y+0,w=y+1,A=y+2;u.push(S,w,w,A,A,S)}}const g=new(p.count>=65535?$u:Xu)(u,1);g.version=v;const m=r.get(f);m&&t.remove(m),r.set(f,g)}function h(f){const u=r.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function pv(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,u){i.drawElements(n,u,r,f*o),e.update(u,n,1)}function l(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,f*o,d),e.update(u,n,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let v=0;for(let g=0;g<d;g++)v+=u[g];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function mv(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:qt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function gv(i,t,e){const n=new WeakMap,s=new ue;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==f){let P=function(){M.dispose(),n.delete(a),a.removeEventListener("dispose",P)};var d=P;u!==void 0&&u.texture.dispose();const p=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;p===!0&&(_=1),v===!0&&(_=2),g===!0&&(_=3);let S=a.attributes.position.count*_,w=1;S>t.maxTextureSize&&(w=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const A=new Float32Array(S*w*4*f),M=new Gu(A,S,w,f);M.type=Fn,M.needsUpdate=!0;const E=_*4;for(let C=0;C<f;C++){const I=m[C],V=x[C],O=y[C],D=S*w*4*C;for(let z=0;z<I.count;z++){const N=z*E;p===!0&&(s.fromBufferAttribute(I,z),A[D+N+0]=s.x,A[D+N+1]=s.y,A[D+N+2]=s.z,A[D+N+3]=0),v===!0&&(s.fromBufferAttribute(V,z),A[D+N+4]=s.x,A[D+N+5]=s.y,A[D+N+6]=s.z,A[D+N+7]=0),g===!0&&(s.fromBufferAttribute(O,z),A[D+N+8]=s.x,A[D+N+9]=s.y,A[D+N+10]=s.z,A[D+N+11]=O.itemSize===4?s.w:1)}}u={count:f,texture:M,size:new Wt(S,w)},n.set(a,u),a.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let g=0;g<l.length;g++)p+=l[g];const v=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function vv(i,t,e,n,s){let r=new WeakMap;function o(l){const h=s.render.frame,f=l.geometry,u=t.get(l,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function a(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}const xv={[Au]:"LINEAR_TONE_MAPPING",[Cu]:"REINHARD_TONE_MAPPING",[Ru]:"CINEON_TONE_MAPPING",[Pu]:"ACES_FILMIC_TONE_MAPPING",[Lu]:"AGX_TONE_MAPPING",[Du]:"NEUTRAL_TONE_MAPPING",[Iu]:"CUSTOM_TONE_MAPPING"};function _v(i,t,e,n,s,r){const o=new zn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new _s(t,e):void 0}),a=new zn(t,e,{type:si,depthBuffer:!1,stencilBuffer:!1}),c=new he;c.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Zt([0,2,0,0,2,0],2));const l=new lm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new be(c,l),f=new ir(-1,1,1,-1,0,1);let u=null,d=null,p=!1,v,g=null,m=[],x=!1;this.setSize=function(y,_){o.setSize(y,_),a.setSize(y,_);for(let S=0;S<m.length;S++){const w=m[S];w.setSize&&w.setSize(y,_)}},this.setEffects=function(y){m=y,x=m.length>0&&m[0].isRenderPass===!0;const _=o.width,S=o.height;for(let w=0;w<m.length;w++){const A=m[w];A.setSize&&A.setSize(_,S)}},this.begin=function(y,_){if(p||y.toneMapping===Bn&&m.length===0)return!1;if(g=_,_!==null){const S=_.width,w=_.height;(o.width!==S||o.height!==w)&&this.setSize(S,w)}return x===!1&&y.setRenderTarget(o),v=y.toneMapping,y.toneMapping=Bn,!0},this.hasRenderPass=function(){return x},this.end=function(y,_){y.toneMapping=v,p=!0;let S=o,w=a;for(let A=0;A<m.length;A++){const M=m[A];if(M.enabled!==!1&&(M.render(y,w,S,_),M.needsSwap!==!1)){const E=S;S=w,w=E}}if(u!==y.outputColorSpace||d!==y.toneMapping){u=y.outputColorSpace,d=y.toneMapping,l.defines={},Xt.getTransfer(u)===te&&(l.defines.SRGB_TRANSFER="");const A=xv[d];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(g),y.render(h,f),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),c.dispose(),l.dispose()}}const of=new He,rc=new _s(1,1),af=new Gu,cf=new Vp,lf=new qu,dh=[],ph=[],mh=new Float32Array(16),gh=new Float32Array(9),vh=new Float32Array(4);function ys(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dh[s];if(r===void 0&&(r=new Float32Array(s),dh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function fo(i,t){let e=ph[t];e===void 0&&(e=new Int32Array(t),ph[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Mv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function yv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function bv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function Sv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function wv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;vh.set(n),i.uniformMatrix2fv(this.addr,!1,vh),Ce(e,n)}}function Ev(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;gh.set(n),i.uniformMatrix3fv(this.addr,!1,gh),Ce(e,n)}}function Tv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;mh.set(n),i.uniformMatrix4fv(this.addr,!1,mh),Ce(e,n)}}function Av(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Cv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function Rv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function Pv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function Iv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Lv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function Dv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function Uv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function Nv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(rc.compareFunction=e.isReversedDepthBuffer()?Oc:Fc,r=rc):r=of,e.setTexture2D(t||r,s)}function Fv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||cf,s)}function Ov(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||lf,s)}function kv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||af,s)}function Bv(i){switch(i){case 5126:return Mv;case 35664:return yv;case 35665:return bv;case 35666:return Sv;case 35674:return wv;case 35675:return Ev;case 35676:return Tv;case 5124:case 35670:return Av;case 35667:case 35671:return Cv;case 35668:case 35672:return Rv;case 35669:case 35673:return Pv;case 5125:return Iv;case 36294:return Lv;case 36295:return Dv;case 36296:return Uv;case 35678:case 36198:case 36298:case 36306:case 35682:return Nv;case 35679:case 36299:case 36307:return Fv;case 35680:case 36300:case 36308:case 36293:return Ov;case 36289:case 36303:case 36311:case 36292:return kv}}function zv(i,t){i.uniform1fv(this.addr,t)}function Vv(i,t){const e=ys(t,this.size,2);i.uniform2fv(this.addr,e)}function Hv(i,t){const e=ys(t,this.size,3);i.uniform3fv(this.addr,e)}function Gv(i,t){const e=ys(t,this.size,4);i.uniform4fv(this.addr,e)}function Wv(i,t){const e=ys(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Xv(i,t){const e=ys(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function $v(i,t){const e=ys(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function qv(i,t){i.uniform1iv(this.addr,t)}function Yv(i,t){i.uniform2iv(this.addr,t)}function Kv(i,t){i.uniform3iv(this.addr,t)}function Zv(i,t){i.uniform4iv(this.addr,t)}function jv(i,t){i.uniform1uiv(this.addr,t)}function Jv(i,t){i.uniform2uiv(this.addr,t)}function Qv(i,t){i.uniform3uiv(this.addr,t)}function tx(i,t){i.uniform4uiv(this.addr,t)}function ex(i,t,e){const n=this.cache,s=t.length,r=fo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=rc:o=of;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function nx(i,t,e){const n=this.cache,s=t.length,r=fo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||cf,r[o])}function ix(i,t,e){const n=this.cache,s=t.length,r=fo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||lf,r[o])}function sx(i,t,e){const n=this.cache,s=t.length,r=fo(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||af,r[o])}function rx(i){switch(i){case 5126:return zv;case 35664:return Vv;case 35665:return Hv;case 35666:return Gv;case 35674:return Wv;case 35675:return Xv;case 35676:return $v;case 5124:case 35670:return qv;case 35667:case 35671:return Yv;case 35668:case 35672:return Kv;case 35669:case 35673:return Zv;case 5125:return jv;case 36294:return Jv;case 36295:return Qv;case 36296:return tx;case 35678:case 36198:case 36298:case 36306:case 35682:return ex;case 35679:case 36299:case 36307:return nx;case 35680:case 36300:case 36308:case 36293:return ix;case 36289:case 36303:case 36311:case 36292:return sx}}class ox{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Bv(e.type)}}class ax{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rx(e.type)}}class cx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Jo=/(\w+)(\])?(\[|\.)?/g;function xh(i,t){i.seq.push(t),i.map[t.id]=t}function lx(i,t,e){const n=i.name,s=n.length;for(Jo.lastIndex=0;;){const r=Jo.exec(n),o=Jo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){xh(e,l===void 0?new ox(a,i,t):new ax(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new cx(a),xh(e,f)),e=f}}}class qr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);lx(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function _h(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const hx=37297;let ux=0;function fx(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Mh=new Ot;function dx(i){Xt._getMatrix(Mh,Xt.workingColorSpace,i);const t=`mat3( ${Mh.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(i)){case Qr:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function yh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+fx(i.getShaderSource(t),a)}else return r}function px(i,t){const e=dx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const mx={[Au]:"Linear",[Cu]:"Reinhard",[Ru]:"Cineon",[Pu]:"ACESFilmic",[Lu]:"AgX",[Du]:"Neutral",[Iu]:"Custom"};function gx(i,t){const e=mx[t];return e===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Lr=new L;function vx(){Xt.getLuminanceCoefficients(Lr);const i=Lr.x.toFixed(4),t=Lr.y.toFixed(4),e=Lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Os).join(`
`)}function _x(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Mx(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Os(i){return i!==""}function bh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const yx=/^[ \t]*#include +<([\w\d./]+)>/gm;function oc(i){return i.replace(yx,Sx)}const bx=new Map;function Sx(i,t){let e=Vt[t];if(e===void 0){const n=bx.get(t);if(n!==void 0)e=Vt[n],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return oc(e)}const wx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wh(i){return i.replace(wx,Ex)}function Ex(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Eh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const Tx={[Hr]:"SHADOWMAP_TYPE_PCF",[Fs]:"SHADOWMAP_TYPE_VSM"};function Ax(i){return Tx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Cx={[Oi]:"ENVMAP_TYPE_CUBE",[xs]:"ENVMAP_TYPE_CUBE",[lo]:"ENVMAP_TYPE_CUBE_UV"};function Rx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Cx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Px={[xs]:"ENVMAP_MODE_REFRACTION"};function Ix(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Px[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Lx={[Rc]:"ENVMAP_BLENDING_MULTIPLY",[Mp]:"ENVMAP_BLENDING_MIX",[yp]:"ENVMAP_BLENDING_ADD"};function Dx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Lx[i.combine]||"ENVMAP_BLENDING_NONE"}function Ux(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Nx(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Ax(e),l=Rx(e),h=Ix(e),f=Dx(e),u=Ux(e),d=xx(e),p=_x(r),v=s.createProgram();let g,m,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Os).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Os).join(`
`),m.length>0&&(m+=`
`)):(g=[Eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Os).join(`
`),m=[Eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bn?"#define TONE_MAPPING":"",e.toneMapping!==Bn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Bn?gx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,px("linearToOutputTexel",e.outputColorSpace),vx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Os).join(`
`)),o=oc(o),o=bh(o,e),o=Sh(o,e),a=oc(a),a=bh(a,e),a=Sh(a,e),o=wh(o),a=wh(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=x+g+o,_=x+m+a,S=_h(s,s.VERTEX_SHADER,y),w=_h(s,s.FRAGMENT_SHADER,_);s.attachShader(v,S),s.attachShader(v,w),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function A(C){if(i.debug.checkShaderErrors){const I=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(S)||"",O=s.getShaderInfoLog(w)||"",D=I.trim(),z=V.trim(),N=O.trim();let q=!0,j=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,S,w);else{const it=yh(s,S,"vertex"),tt=yh(s,w,"fragment");qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+D+`
`+it+`
`+tt)}else D!==""?Ut("WebGLProgram: Program Info Log:",D):(z===""||N==="")&&(j=!1);j&&(C.diagnostics={runnable:q,programLog:D,vertexShader:{log:z,prefix:g},fragmentShader:{log:N,prefix:m}})}s.deleteShader(S),s.deleteShader(w),M=new qr(s,v),E=Mx(s,v)}let M;this.getUniforms=function(){return M===void 0&&A(this),M};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,hx)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ux++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=w,this}let Fx=0;class Ox{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new kx(t),e.set(t,n)),n}}class kx{constructor(t){this.id=Fx++,this.code=t,this.usedTimes=0}}function Bx(i){return i===Bi||i===Zr||i===jr}function zx(i,t,e,n,s,r){const o=new Bc,a=new Ox,c=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(M){return c.add(M),M===0?"uv":`uv${M}`}function v(M,E,P,C,I,V){const O=C.fog,D=I.geometry,z=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?C.environment:null,N=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,q=t.get(M.envMap||z,N),j=q&&q.mapping===lo?q.image.height:null,it=d[M.type];M.precision!==null&&(u=n.getMaxPrecision(M.precision),u!==M.precision&&Ut("WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const tt=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ot=tt!==void 0?tt.length:0;let At=0;D.morphAttributes.position!==void 0&&(At=1),D.morphAttributes.normal!==void 0&&(At=2),D.morphAttributes.color!==void 0&&(At=3);let Ft,Ct,K,rt;if(it){const Mt=In[it];Ft=Mt.vertexShader,Ct=Mt.fragmentShader}else{Ft=M.vertexShader,Ct=M.fragmentShader;const Mt=a.getVertexShaderStage(M),de=a.getFragmentShaderStage(M);a.update(M,Mt,de),K=Mt.id,rt=de.id}const nt=i.getRenderTarget(),Lt=i.state.buffers.depth.getReversed(),Nt=I.isInstancedMesh===!0,Rt=I.isBatchedMesh===!0,ie=!!M.map,kt=!!M.matcap,jt=!!q,Jt=!!M.aoMap,Yt=!!M.lightMap,xe=!!M.bumpMap&&M.wireframe===!1,we=!!M.normalMap,Re=!!M.displacementMap,De=!!M.emissiveMap,fe=!!M.metalnessMap,_e=!!M.roughnessMap,F=M.anisotropy>0,$e=M.clearcoat>0,Qt=M.dispersion>0,R=M.iridescence>0,b=M.sheen>0,B=M.transmission>0,X=F&&!!M.anisotropyMap,Y=$e&&!!M.clearcoatMap,at=$e&&!!M.clearcoatNormalMap,lt=$e&&!!M.clearcoatRoughnessMap,Z=R&&!!M.iridescenceMap,Q=R&&!!M.iridescenceThicknessMap,ht=b&&!!M.sheenColorMap,wt=b&&!!M.sheenRoughnessMap,dt=!!M.specularMap,ut=!!M.specularColorMap,It=!!M.specularIntensityMap,Dt=B&&!!M.transmissionMap,Bt=B&&!!M.thicknessMap,U=!!M.gradientMap,ct=!!M.alphaMap,J=M.alphaTest>0,ft=!!M.alphaHash,vt=!!M.extensions;let et=Bn;M.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(et=i.toneMapping);const St={shaderID:it,shaderType:M.type,shaderName:M.name,vertexShader:Ft,fragmentShader:Ct,defines:M.defines,customVertexShaderID:K,customFragmentShaderID:rt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:Rt,batchingColor:Rt&&I._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&I.instanceColor!==null,instancingMorph:Nt&&I.morphTexture!==null,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Xt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:ie,matcap:kt,envMap:jt,envMapMode:jt&&q.mapping,envMapCubeUVHeight:j,aoMap:Jt,lightMap:Yt,bumpMap:xe,normalMap:we,displacementMap:Re,emissiveMap:De,normalMapObjectSpace:we&&M.normalMapType===wp,normalMapTangentSpace:we&&M.normalMapType===tc,packedNormalMap:we&&M.normalMapType===tc&&Bx(M.normalMap.format),metalnessMap:fe,roughnessMap:_e,anisotropy:F,anisotropyMap:X,clearcoat:$e,clearcoatMap:Y,clearcoatNormalMap:at,clearcoatRoughnessMap:lt,dispersion:Qt,iridescence:R,iridescenceMap:Z,iridescenceThicknessMap:Q,sheen:b,sheenColorMap:ht,sheenRoughnessMap:wt,specularMap:dt,specularColorMap:ut,specularIntensityMap:It,transmission:B,transmissionMap:Dt,thicknessMap:Bt,gradientMap:U,opaque:M.transparent===!1&&M.blending===fs&&M.alphaToCoverage===!1,alphaMap:ct,alphaTest:J,alphaHash:ft,combine:M.combine,mapUv:ie&&p(M.map.channel),aoMapUv:Jt&&p(M.aoMap.channel),lightMapUv:Yt&&p(M.lightMap.channel),bumpMapUv:xe&&p(M.bumpMap.channel),normalMapUv:we&&p(M.normalMap.channel),displacementMapUv:Re&&p(M.displacementMap.channel),emissiveMapUv:De&&p(M.emissiveMap.channel),metalnessMapUv:fe&&p(M.metalnessMap.channel),roughnessMapUv:_e&&p(M.roughnessMap.channel),anisotropyMapUv:X&&p(M.anisotropyMap.channel),clearcoatMapUv:Y&&p(M.clearcoatMap.channel),clearcoatNormalMapUv:at&&p(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&p(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&p(M.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&p(M.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&p(M.sheenColorMap.channel),sheenRoughnessMapUv:wt&&p(M.sheenRoughnessMap.channel),specularMapUv:dt&&p(M.specularMap.channel),specularColorMapUv:ut&&p(M.specularColorMap.channel),specularIntensityMapUv:It&&p(M.specularIntensityMap.channel),transmissionMapUv:Dt&&p(M.transmissionMap.channel),thicknessMapUv:Bt&&p(M.thicknessMap.channel),alphaMapUv:ct&&p(M.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(we||F),vertexNormals:!!D.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!D.attributes.uv&&(ie||ct),fog:!!O,useFog:M.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||D.attributes.normal===void 0&&we===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Lt,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:At,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:et,decodeVideoTexture:ie&&M.map.isVideoTexture===!0&&Xt.getTransfer(M.map.colorSpace)===te,decodeVideoTextureEmissive:De&&M.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(M.emissiveMap.colorSpace)===te,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Xe,flipSided:M.side===Je,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:vt&&M.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&M.extensions.multiDraw===!0||Rt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return St.vertexUv1s=c.has(1),St.vertexUv2s=c.has(2),St.vertexUv3s=c.has(3),c.clear(),St}function g(M){const E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)E.push(P),E.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(m(E,M),x(E,M),E.push(i.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function m(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function x(M,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),M.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),M.push(o.mask)}function y(M){const E=d[M.type];let P;if(E){const C=In[E];P=om.clone(C.uniforms)}else P=M.uniforms;return P}function _(M,E){let P=h.get(E);return P!==void 0?++P.usedTimes:(P=new Nx(i,E,M,s),l.push(P),h.set(E,P)),P}function S(M){if(--M.usedTimes===0){const E=l.indexOf(M);l[E]=l[l.length-1],l.pop(),h.delete(M.cacheKey),M.destroy()}}function w(M){a.remove(M)}function A(){a.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:y,acquireProgram:_,releaseProgram:S,releaseShaderCache:w,programs:l,dispose:A}}function Vx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Hx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Th(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ah(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function a(u,d,p,v,g,m){let x=i[t];return x===void 0?(x={id:u.id,object:u,geometry:d,material:p,materialVariant:o(u),groupOrder:v,renderOrder:u.renderOrder,z:g,group:m},i[t]=x):(x.id=u.id,x.object=u,x.geometry=d,x.material=p,x.materialVariant=o(u),x.groupOrder=v,x.renderOrder=u.renderOrder,x.z=g,x.group=m),t++,x}function c(u,d,p,v,g,m){const x=a(u,d,p,v,g,m);p.transmission>0?n.push(x):p.transparent===!0?s.push(x):e.push(x)}function l(u,d,p,v,g,m){const x=a(u,d,p,v,g,m);p.transmission>0?n.unshift(x):p.transparent===!0?s.unshift(x):e.unshift(x)}function h(u,d,p){e.length>1&&e.sort(u||Hx),n.length>1&&n.sort(d||Th),s.length>1&&s.sort(d||Th),p&&(e.reverse(),n.reverse(),s.reverse())}function f(){for(let u=t,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:h}}function Gx(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Ah,i.set(n,[o])):s>=r.length?(o=new Ah,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Wx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Gt};break;case"SpotLight":e={position:new L,direction:new L,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Xx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let $x=0;function qx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Yx(i){const t=new Wx,e=Xx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new oe,o=new oe;function a(l){let h=0,f=0,u=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,x=0,y=0,_=0,S=0,w=0,A=0;l.sort(qx);for(let E=0,P=l.length;E<P;E++){const C=l[E],I=C.color,V=C.intensity,O=C.distance;let D=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Bi?D=C.shadow.map.texture:D=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=I.r*V,f+=I.g*V,u+=I.b*V;else if(C.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(C.sh.coefficients[z],V);A++}else if(C.isDirectionalLight){const z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const N=C.shadow,q=e.get(C);q.shadowIntensity=N.intensity,q.shadowBias=N.bias,q.shadowNormalBias=N.normalBias,q.shadowRadius=N.radius,q.shadowMapSize=N.mapSize,n.directionalShadow[d]=q,n.directionalShadowMap[d]=D,n.directionalShadowMatrix[d]=C.shadow.matrix,x++}n.directional[d]=z,d++}else if(C.isSpotLight){const z=t.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(I).multiplyScalar(V),z.distance=O,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,n.spot[v]=z;const N=C.shadow;if(C.map&&(n.spotLightMap[S]=C.map,S++,N.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[v]=N.matrix,C.castShadow){const q=e.get(C);q.shadowIntensity=N.intensity,q.shadowBias=N.bias,q.shadowNormalBias=N.normalBias,q.shadowRadius=N.radius,q.shadowMapSize=N.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=D,_++}v++}else if(C.isRectAreaLight){const z=t.get(C);z.color.copy(I).multiplyScalar(V),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=z,g++}else if(C.isPointLight){const z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){const N=C.shadow,q=e.get(C);q.shadowIntensity=N.intensity,q.shadowBias=N.bias,q.shadowNormalBias=N.normalBias,q.shadowRadius=N.radius,q.shadowMapSize=N.mapSize,q.shadowCameraNear=N.camera.near,q.shadowCameraFar=N.camera.far,n.pointShadow[p]=q,n.pointShadowMap[p]=D,n.pointShadowMatrix[p]=C.shadow.matrix,y++}n.point[p]=z,p++}else if(C.isHemisphereLight){const z=t.get(C);z.skyColor.copy(C.color).multiplyScalar(V),z.groundColor.copy(C.groundColor).multiplyScalar(V),n.hemi[m]=z,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const M=n.hash;(M.directionalLength!==d||M.pointLength!==p||M.spotLength!==v||M.rectAreaLength!==g||M.hemiLength!==m||M.numDirectionalShadows!==x||M.numPointShadows!==y||M.numSpotShadows!==_||M.numSpotMaps!==S||M.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+S-w,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,M.directionalLength=d,M.pointLength=p,M.spotLength=v,M.rectAreaLength=g,M.hemiLength=m,M.numDirectionalShadows=x,M.numPointShadows=y,M.numSpotShadows=_,M.numSpotMaps=S,M.numLightProbes=A,n.version=$x++)}function c(l,h){let f=0,u=0,d=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const y=l[m];if(y.isDirectionalLight){const _=n.directional[f];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(y.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(y.isRectAreaLight){const _=n.rectArea[p];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),p++}else if(y.isPointLight){const _=n.point[u];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(g),u++}else if(y.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(g),v++}}}return{setup:a,setupView:c,state:n}}function Ch(i){const t=new Yx(i),e=[],n=[],s=[];function r(u){f.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}const f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function Kx(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ch(i),t.set(s,[a])):r>=o.length?(a=new Ch(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Zx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jx=`uniform sampler2D shadow_pass;
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
}`,Jx=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Qx=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Rh=new oe,Ps=new L,Qo=new L;function t_(i,t,e){let n=new zc;const s=new Wt,r=new Wt,o=new ue,a=new hm,c=new um,l={},h=e.maxTextureSize,f={[_i]:Je,[Je]:_i,[Xe]:Xe},u=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:Zx,fragmentShader:jx}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const p=new he;p.setAttribute("position",new Vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new be(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hr;let m=this.type;this.render=function(w,A,M){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===ep&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Hr);const E=i.getRenderTarget(),P=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),I=i.state;I.setBlending(ni),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const V=m!==this.type;V&&A.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(D=>D.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,D=w.length;O<D;O++){const z=w[O],N=z.shadow;if(N===void 0){Ut("WebGLShadowMap:",z,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const q=N.getFrameExtents();s.multiply(q),r.copy(N.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,N.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,N.mapSize.y=r.y));const j=i.state.buffers.depth.getReversed();if(N.camera._reversedDepth=j,N.map===null||V===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===Fs){if(z.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new zn(s.x,s.y,{format:Bi,type:si,minFilter:Ve,magFilter:Ve,generateMipmaps:!1}),N.map.texture.name=z.name+".shadowMap",N.map.depthTexture=new _s(s.x,s.y,Fn),N.map.depthTexture.name=z.name+".shadowMapDepth",N.map.depthTexture.format=ri,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ie,N.map.depthTexture.magFilter=Ie}else z.isPointLight?(N.map=new rf(s.x),N.map.depthTexture=new sm(s.x,Gn)):(N.map=new zn(s.x,s.y),N.map.depthTexture=new _s(s.x,s.y,Gn)),N.map.depthTexture.name=z.name+".shadowMap",N.map.depthTexture.format=ri,this.type===Hr?(N.map.depthTexture.compareFunction=j?Oc:Fc,N.map.depthTexture.minFilter=Ve,N.map.depthTexture.magFilter=Ve):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ie,N.map.depthTexture.magFilter=Ie);N.camera.updateProjectionMatrix()}const it=N.map.isWebGLCubeRenderTarget?6:1;for(let tt=0;tt<it;tt++){if(N.map.isWebGLCubeRenderTarget)i.setRenderTarget(N.map,tt),i.clear();else{tt===0&&(i.setRenderTarget(N.map),i.clear());const ot=N.getViewport(tt);o.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),I.viewport(o)}if(z.isPointLight){const ot=N.camera,At=N.matrix,Ft=z.distance||ot.far;Ft!==ot.far&&(ot.far=Ft,ot.updateProjectionMatrix()),Ps.setFromMatrixPosition(z.matrixWorld),ot.position.copy(Ps),Qo.copy(ot.position),Qo.add(Jx[tt]),ot.up.copy(Qx[tt]),ot.lookAt(Qo),ot.updateMatrixWorld(),At.makeTranslation(-Ps.x,-Ps.y,-Ps.z),Rh.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),N._frustum.setFromProjectionMatrix(Rh,ot.coordinateSystem,ot.reversedDepth)}else N.updateMatrices(z);n=N.getFrustum(),_(A,M,N.camera,z,this.type)}N.isPointLightShadow!==!0&&this.type===Fs&&x(N,M),N.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(E,P,C)};function x(w,A){const M=t.update(v);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new zn(s.x,s.y,{format:Bi,type:si})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,M,u,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,M,d,v,null)}function y(w,A,M,E){let P=null;const C=M.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)P=C;else if(P=M.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const I=P.uuid,V=A.uuid;let O=l[I];O===void 0&&(O={},l[I]=O);let D=O[V];D===void 0&&(D=P.clone(),O[V]=D,A.addEventListener("dispose",S)),P=D}if(P.visible=A.visible,P.wireframe=A.wireframe,E===Fs?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:f[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,M.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const I=i.properties.get(P);I.light=M}return P}function _(w,A,M,E,P){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&P===Fs)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,w.matrixWorld);const V=t.update(w),O=w.material;if(Array.isArray(O)){const D=V.groups;for(let z=0,N=D.length;z<N;z++){const q=D[z],j=O[q.materialIndex];if(j&&j.visible){const it=y(w,j,E,P);w.onBeforeShadow(i,w,A,M,V,it,q),i.renderBufferDirect(M,null,V,it,w,q),w.onAfterShadow(i,w,A,M,V,it,q)}}}else if(O.visible){const D=y(w,O,E,P);w.onBeforeShadow(i,w,A,M,V,D,null),i.renderBufferDirect(M,null,V,D,w,null),w.onAfterShadow(i,w,A,M,V,D,null)}}const I=w.children;for(let V=0,O=I.length;V<O;V++)_(I[V],A,M,E,P)}function S(w){w.target.removeEventListener("dispose",S);for(const M in l){const E=l[M],P=w.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function e_(i,t){function e(){let U=!1;const ct=new ue;let J=null;const ft=new ue(0,0,0,0);return{setMask:function(vt){J!==vt&&!U&&(i.colorMask(vt,vt,vt,vt),J=vt)},setLocked:function(vt){U=vt},setClear:function(vt,et,St,Mt,de){de===!0&&(vt*=Mt,et*=Mt,St*=Mt),ct.set(vt,et,St,Mt),ft.equals(ct)===!1&&(i.clearColor(vt,et,St,Mt),ft.copy(ct))},reset:function(){U=!1,J=null,ft.set(-1,0,0,0)}}}function n(){let U=!1,ct=!1,J=null,ft=null,vt=null;return{setReversed:function(et){if(ct!==et){const St=t.get("EXT_clip_control");et?St.clipControlEXT(St.LOWER_LEFT_EXT,St.ZERO_TO_ONE_EXT):St.clipControlEXT(St.LOWER_LEFT_EXT,St.NEGATIVE_ONE_TO_ONE_EXT),ct=et;const Mt=vt;vt=null,this.setClear(Mt)}},getReversed:function(){return ct},setTest:function(et){et?nt(i.DEPTH_TEST):Lt(i.DEPTH_TEST)},setMask:function(et){J!==et&&!U&&(i.depthMask(et),J=et)},setFunc:function(et){if(ct&&(et=Up[et]),ft!==et){switch(et){case ga:i.depthFunc(i.NEVER);break;case va:i.depthFunc(i.ALWAYS);break;case xa:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case _a:i.depthFunc(i.EQUAL);break;case Ma:i.depthFunc(i.GEQUAL);break;case ya:i.depthFunc(i.GREATER);break;case ba:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ft=et}},setLocked:function(et){U=et},setClear:function(et){vt!==et&&(vt=et,ct&&(et=1-et),i.clearDepth(et))},reset:function(){U=!1,J=null,ft=null,vt=null,ct=!1}}}function s(){let U=!1,ct=null,J=null,ft=null,vt=null,et=null,St=null,Mt=null,de=null;return{setTest:function(ae){U||(ae?nt(i.STENCIL_TEST):Lt(i.STENCIL_TEST))},setMask:function(ae){ct!==ae&&!U&&(i.stencilMask(ae),ct=ae)},setFunc:function(ae,wn,En){(J!==ae||ft!==wn||vt!==En)&&(i.stencilFunc(ae,wn,En),J=ae,ft=wn,vt=En)},setOp:function(ae,wn,En){(et!==ae||St!==wn||Mt!==En)&&(i.stencilOp(ae,wn,En),et=ae,St=wn,Mt=En)},setLocked:function(ae){U=ae},setClear:function(ae){de!==ae&&(i.clearStencil(ae),de=ae)},reset:function(){U=!1,ct=null,J=null,ft=null,vt=null,et=null,St=null,Mt=null,de=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},f={},u={},d=new WeakMap,p=[],v=null,g=!1,m=null,x=null,y=null,_=null,S=null,w=null,A=null,M=new Gt(0,0,0),E=0,P=!1,C=null,I=null,V=null,O=null,D=null;const z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,q=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(j)[1]),N=q>=1):j.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),N=q>=2);let it=null,tt={};const ot=i.getParameter(i.SCISSOR_BOX),At=i.getParameter(i.VIEWPORT),Ft=new ue().fromArray(ot),Ct=new ue().fromArray(At);function K(U,ct,J,ft){const vt=new Uint8Array(4),et=i.createTexture();i.bindTexture(U,et),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let St=0;St<J;St++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,ft,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ct+St,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return et}const rt={};rt[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),rt[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),rt[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(i.DEPTH_TEST),o.setFunc(vs),xe(!1),we(Sl),nt(i.CULL_FACE),Jt(ni);function nt(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Lt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Nt(U,ct){return u[U]!==ct?(i.bindFramebuffer(U,ct),u[U]=ct,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ct),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function Rt(U,ct){let J=p,ft=!1;if(U){J=d.get(ct),J===void 0&&(J=[],d.set(ct,J));const vt=U.textures;if(J.length!==vt.length||J[0]!==i.COLOR_ATTACHMENT0){for(let et=0,St=vt.length;et<St;et++)J[et]=i.COLOR_ATTACHMENT0+et;J.length=vt.length,ft=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ft=!0);ft&&i.drawBuffers(J)}function ie(U){return v!==U?(i.useProgram(U),v=U,!0):!1}const kt={[Ii]:i.FUNC_ADD,[ip]:i.FUNC_SUBTRACT,[sp]:i.FUNC_REVERSE_SUBTRACT};kt[rp]=i.MIN,kt[op]=i.MAX;const jt={[ap]:i.ZERO,[cp]:i.ONE,[lp]:i.SRC_COLOR,[pa]:i.SRC_ALPHA,[mp]:i.SRC_ALPHA_SATURATE,[dp]:i.DST_COLOR,[up]:i.DST_ALPHA,[hp]:i.ONE_MINUS_SRC_COLOR,[ma]:i.ONE_MINUS_SRC_ALPHA,[pp]:i.ONE_MINUS_DST_COLOR,[fp]:i.ONE_MINUS_DST_ALPHA,[gp]:i.CONSTANT_COLOR,[vp]:i.ONE_MINUS_CONSTANT_COLOR,[xp]:i.CONSTANT_ALPHA,[_p]:i.ONE_MINUS_CONSTANT_ALPHA};function Jt(U,ct,J,ft,vt,et,St,Mt,de,ae){if(U===ni){g===!0&&(Lt(i.BLEND),g=!1);return}if(g===!1&&(nt(i.BLEND),g=!0),U!==np){if(U!==m||ae!==P){if((x!==Ii||S!==Ii)&&(i.blendEquation(i.FUNC_ADD),x=Ii,S=Ii),ae)switch(U){case fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wl:i.blendFunc(i.ONE,i.ONE);break;case El:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Tl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qt("WebGLState: Invalid blending: ",U);break}else switch(U){case fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case El:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Tl:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",U);break}y=null,_=null,w=null,A=null,M.set(0,0,0),E=0,m=U,P=ae}return}vt=vt||ct,et=et||J,St=St||ft,(ct!==x||vt!==S)&&(i.blendEquationSeparate(kt[ct],kt[vt]),x=ct,S=vt),(J!==y||ft!==_||et!==w||St!==A)&&(i.blendFuncSeparate(jt[J],jt[ft],jt[et],jt[St]),y=J,_=ft,w=et,A=St),(Mt.equals(M)===!1||de!==E)&&(i.blendColor(Mt.r,Mt.g,Mt.b,de),M.copy(Mt),E=de),m=U,P=!1}function Yt(U,ct){U.side===Xe?Lt(i.CULL_FACE):nt(i.CULL_FACE);let J=U.side===Je;ct&&(J=!J),xe(J),U.blending===fs&&U.transparent===!1?Jt(ni):Jt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const ft=U.stencilWrite;a.setTest(ft),ft&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),De(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):Lt(i.SAMPLE_ALPHA_TO_COVERAGE)}function xe(U){C!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),C=U)}function we(U){U!==Qd?(nt(i.CULL_FACE),U!==I&&(U===Sl?i.cullFace(i.BACK):U===tp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Lt(i.CULL_FACE),I=U}function Re(U){U!==V&&(N&&i.lineWidth(U),V=U)}function De(U,ct,J){U?(nt(i.POLYGON_OFFSET_FILL),(O!==ct||D!==J)&&(O=ct,D=J,o.getReversed()&&(ct=-ct),i.polygonOffset(ct,J))):Lt(i.POLYGON_OFFSET_FILL)}function fe(U){U?nt(i.SCISSOR_TEST):Lt(i.SCISSOR_TEST)}function _e(U){U===void 0&&(U=i.TEXTURE0+z-1),it!==U&&(i.activeTexture(U),it=U)}function F(U,ct,J){J===void 0&&(it===null?J=i.TEXTURE0+z-1:J=it);let ft=tt[J];ft===void 0&&(ft={type:void 0,texture:void 0},tt[J]=ft),(ft.type!==U||ft.texture!==ct)&&(it!==J&&(i.activeTexture(J),it=J),i.bindTexture(U,ct||rt[U]),ft.type=U,ft.texture=ct)}function $e(){const U=tt[it];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Qt(){try{i.compressedTexImage2D(...arguments)}catch(U){qt("WebGLState:",U)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(U){qt("WebGLState:",U)}}function b(){try{i.texSubImage2D(...arguments)}catch(U){qt("WebGLState:",U)}}function B(){try{i.texSubImage3D(...arguments)}catch(U){qt("WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){qt("WebGLState:",U)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(U){qt("WebGLState:",U)}}function at(){try{i.texStorage2D(...arguments)}catch(U){qt("WebGLState:",U)}}function lt(){try{i.texStorage3D(...arguments)}catch(U){qt("WebGLState:",U)}}function Z(){try{i.texImage2D(...arguments)}catch(U){qt("WebGLState:",U)}}function Q(){try{i.texImage3D(...arguments)}catch(U){qt("WebGLState:",U)}}function ht(U){return f[U]!==void 0?f[U]:i.getParameter(U)}function wt(U,ct){f[U]!==ct&&(i.pixelStorei(U,ct),f[U]=ct)}function dt(U){Ft.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Ft.copy(U))}function ut(U){Ct.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Ct.copy(U))}function It(U,ct){let J=l.get(ct);J===void 0&&(J=new WeakMap,l.set(ct,J));let ft=J.get(U);ft===void 0&&(ft=i.getUniformBlockIndex(ct,U.name),J.set(U,ft))}function Dt(U,ct){const ft=l.get(ct).get(U);c.get(ct)!==ft&&(i.uniformBlockBinding(ct,ft,U.__bindingPointIndex),c.set(ct,ft))}function Bt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},it=null,tt={},u={},d=new WeakMap,p=[],v=null,g=!1,m=null,x=null,y=null,_=null,S=null,w=null,A=null,M=new Gt(0,0,0),E=0,P=!1,C=null,I=null,V=null,O=null,D=null,Ft.set(0,0,i.canvas.width,i.canvas.height),Ct.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:Lt,bindFramebuffer:Nt,drawBuffers:Rt,useProgram:ie,setBlending:Jt,setMaterial:Yt,setFlipSided:xe,setCullFace:we,setLineWidth:Re,setPolygonOffset:De,setScissorTest:fe,activeTexture:_e,bindTexture:F,unbindTexture:$e,compressedTexImage2D:Qt,compressedTexImage3D:R,texImage2D:Z,texImage3D:Q,pixelStorei:wt,getParameter:ht,updateUBOMapping:It,uniformBlockBinding:Dt,texStorage2D:at,texStorage3D:lt,texSubImage2D:b,texSubImage3D:B,compressedTexSubImage2D:X,compressedTexSubImage3D:Y,scissor:dt,viewport:ut,reset:Bt}}function n_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Wt,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,b){return p?new OffscreenCanvas(R,b):to("canvas")}function g(R,b,B){let X=1;const Y=Qt(R);if((Y.width>B||Y.height>B)&&(X=B/Math.max(Y.width,Y.height)),X<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const at=Math.floor(X*Y.width),lt=Math.floor(X*Y.height);u===void 0&&(u=v(at,lt));const Z=b?v(at,lt):u;return Z.width=at,Z.height=lt,Z.getContext("2d").drawImage(R,0,0,at,lt),Ut("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+at+"x"+lt+")."),Z}else return"data"in R&&Ut("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),R;return R}function m(R){return R.generateMipmaps}function x(R){i.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(R,b,B,X,Y,at=!1){if(R!==null){if(i[R]!==void 0)return i[R];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let lt;X&&(lt=t.get("EXT_texture_norm16"),lt||Ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=b;if(b===i.RED&&(B===i.FLOAT&&(Z=i.R32F),B===i.HALF_FLOAT&&(Z=i.R16F),B===i.UNSIGNED_BYTE&&(Z=i.R8),B===i.UNSIGNED_SHORT&&lt&&(Z=lt.R16_EXT),B===i.SHORT&&lt&&(Z=lt.R16_SNORM_EXT)),b===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.R8UI),B===i.UNSIGNED_SHORT&&(Z=i.R16UI),B===i.UNSIGNED_INT&&(Z=i.R32UI),B===i.BYTE&&(Z=i.R8I),B===i.SHORT&&(Z=i.R16I),B===i.INT&&(Z=i.R32I)),b===i.RG&&(B===i.FLOAT&&(Z=i.RG32F),B===i.HALF_FLOAT&&(Z=i.RG16F),B===i.UNSIGNED_BYTE&&(Z=i.RG8),B===i.UNSIGNED_SHORT&&lt&&(Z=lt.RG16_EXT),B===i.SHORT&&lt&&(Z=lt.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RG8UI),B===i.UNSIGNED_SHORT&&(Z=i.RG16UI),B===i.UNSIGNED_INT&&(Z=i.RG32UI),B===i.BYTE&&(Z=i.RG8I),B===i.SHORT&&(Z=i.RG16I),B===i.INT&&(Z=i.RG32I)),b===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),B===i.UNSIGNED_INT&&(Z=i.RGB32UI),B===i.BYTE&&(Z=i.RGB8I),B===i.SHORT&&(Z=i.RGB16I),B===i.INT&&(Z=i.RGB32I)),b===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),B===i.UNSIGNED_INT&&(Z=i.RGBA32UI),B===i.BYTE&&(Z=i.RGBA8I),B===i.SHORT&&(Z=i.RGBA16I),B===i.INT&&(Z=i.RGBA32I)),b===i.RGB&&(B===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGB16_EXT),B===i.SHORT&&lt&&(Z=lt.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),b===i.RGBA){const Q=at?Qr:Xt.getTransfer(Y);B===i.FLOAT&&(Z=i.RGBA32F),B===i.HALF_FLOAT&&(Z=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Z=Q===te?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&lt&&(Z=lt.RGBA16_EXT),B===i.SHORT&&lt&&(Z=lt.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function S(R,b){let B;return R?b===null||b===Gn||b===Ws?B=i.DEPTH24_STENCIL8:b===Fn?B=i.DEPTH32F_STENCIL8:b===Gs&&(B=i.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Gn||b===Ws?B=i.DEPTH_COMPONENT24:b===Fn?B=i.DEPTH_COMPONENT32F:b===Gs&&(B=i.DEPTH_COMPONENT16),B}function w(R,b){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ie&&R.minFilter!==Ve?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function A(R){const b=R.target;b.removeEventListener("dispose",A),E(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&f.delete(b)}function M(R){const b=R.target;b.removeEventListener("dispose",M),C(b)}function E(R){const b=n.get(R);if(b.__webglInit===void 0)return;const B=R.source,X=d.get(B);if(X){const Y=X[b.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(R),Object.keys(X).length===0&&d.delete(B)}n.remove(R)}function P(R){const b=n.get(R);i.deleteTexture(b.__webglTexture);const B=R.source,X=d.get(B);delete X[b.__cacheKey],o.memory.textures--}function C(R){const b=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(b.__webglFramebuffer[X]))for(let Y=0;Y<b.__webglFramebuffer[X].length;Y++)i.deleteFramebuffer(b.__webglFramebuffer[X][Y]);else i.deleteFramebuffer(b.__webglFramebuffer[X]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[X])}else{if(Array.isArray(b.__webglFramebuffer))for(let X=0;X<b.__webglFramebuffer.length;X++)i.deleteFramebuffer(b.__webglFramebuffer[X]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let X=0;X<b.__webglColorRenderbuffer.length;X++)b.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[X]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const B=R.textures;for(let X=0,Y=B.length;X<Y;X++){const at=n.get(B[X]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(B[X])}n.remove(R)}let I=0;function V(){I=0}function O(){return I}function D(R){I=R}function z(){const R=I;return R>=s.maxTextures&&Ut("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),I+=1,R}function N(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function q(R,b){const B=n.get(R);if(R.isVideoTexture&&F(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&B.__version!==R.version){const X=R.image;if(X===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{Lt(B,R,b);return}}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+b)}function j(R,b){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){Lt(B,R,b);return}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+b)}function it(R,b){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){Lt(B,R,b);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+b)}function tt(R,b){const B=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&B.__version!==R.version){Nt(B,R,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+b)}const ot={[ki]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[Sa]:i.MIRRORED_REPEAT},At={[Ie]:i.NEAREST,[bp]:i.NEAREST_MIPMAP_NEAREST,[ar]:i.NEAREST_MIPMAP_LINEAR,[Ve]:i.LINEAR,[yo]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},Ft={[Ep]:i.NEVER,[Pp]:i.ALWAYS,[Tp]:i.LESS,[Fc]:i.LEQUAL,[Ap]:i.EQUAL,[Oc]:i.GEQUAL,[Cp]:i.GREATER,[Rp]:i.NOTEQUAL};function Ct(R,b){if(b.type===Fn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Ve||b.magFilter===yo||b.magFilter===ar||b.magFilter===Ui||b.minFilter===Ve||b.minFilter===yo||b.minFilter===ar||b.minFilter===Ui)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ot[b.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ot[b.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ot[b.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,At[b.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,At[b.minFilter]),b.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Ft[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ie||b.minFilter!==ar&&b.minFilter!==Ui||b.type===Fn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function K(R,b){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",A));const X=b.source;let Y=d.get(X);Y===void 0&&(Y={},d.set(X,Y));const at=N(b);if(at!==R.__cacheKey){Y[at]===void 0&&(Y[at]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Y[at].usedTimes++;const lt=Y[R.__cacheKey];lt!==void 0&&(Y[R.__cacheKey].usedTimes--,lt.usedTimes===0&&P(b)),R.__cacheKey=at,R.__webglTexture=Y[at].texture}return B}function rt(R,b,B){return Math.floor(Math.floor(R/B)/b)}function nt(R,b,B,X){const at=R.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,B,X,b.data);else{at.sort((wt,dt)=>wt.start-dt.start);let lt=0;for(let wt=1;wt<at.length;wt++){const dt=at[lt],ut=at[wt],It=dt.start+dt.count,Dt=rt(ut.start,b.width,4),Bt=rt(dt.start,b.width,4);ut.start<=It+1&&Dt===Bt&&rt(ut.start+ut.count-1,b.width,4)===Dt?dt.count=Math.max(dt.count,ut.start+ut.count-dt.start):(++lt,at[lt]=ut)}at.length=lt+1;const Z=e.getParameter(i.UNPACK_ROW_LENGTH),Q=e.getParameter(i.UNPACK_SKIP_PIXELS),ht=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let wt=0,dt=at.length;wt<dt;wt++){const ut=at[wt],It=Math.floor(ut.start/4),Dt=Math.ceil(ut.count/4),Bt=It%b.width,U=Math.floor(It/b.width),ct=Dt,J=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Bt,U,ct,J,B,X,b.data)}R.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Q),e.pixelStorei(i.UNPACK_SKIP_ROWS,ht)}}function Lt(R,b,B){let X=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(X=i.TEXTURE_3D);const Y=K(R,b),at=b.source;e.bindTexture(X,R.__webglTexture,i.TEXTURE0+B);const lt=n.get(at);if(at.version!==lt.__version||Y===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const J=Xt.getPrimaries(Xt.workingColorSpace),ft=b.colorSpace===vi?null:Xt.getPrimaries(b.colorSpace),vt=b.colorSpace===vi||J===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let Q=g(b.image,!1,s.maxTextureSize);Q=$e(b,Q);const ht=r.convert(b.format,b.colorSpace),wt=r.convert(b.type);let dt=_(b.internalFormat,ht,wt,b.normalized,b.colorSpace,b.isVideoTexture);Ct(X,b);let ut;const It=b.mipmaps,Dt=b.isVideoTexture!==!0,Bt=lt.__version===void 0||Y===!0,U=at.dataReady,ct=w(b,Q);if(b.isDepthTexture)dt=S(b.format===Ni,b.type),Bt&&(Dt?e.texStorage2D(i.TEXTURE_2D,1,dt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,ht,wt,null));else if(b.isDataTexture)if(It.length>0){Dt&&Bt&&e.texStorage2D(i.TEXTURE_2D,ct,dt,It[0].width,It[0].height);for(let J=0,ft=It.length;J<ft;J++)ut=It[J],Dt?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,ht,wt,ut.data):e.texImage2D(i.TEXTURE_2D,J,dt,ut.width,ut.height,0,ht,wt,ut.data);b.generateMipmaps=!1}else Dt?(Bt&&e.texStorage2D(i.TEXTURE_2D,ct,dt,Q.width,Q.height),U&&nt(b,Q,ht,wt)):e.texImage2D(i.TEXTURE_2D,0,dt,Q.width,Q.height,0,ht,wt,Q.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Dt&&Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,dt,It[0].width,It[0].height,Q.depth);for(let J=0,ft=It.length;J<ft;J++)if(ut=It[J],b.format!==yn)if(ht!==null)if(Dt){if(U)if(b.layerUpdates.size>0){const vt=oh(ut.width,ut.height,b.format,b.type);for(const et of b.layerUpdates){const St=ut.data.subarray(et*vt/ut.data.BYTES_PER_ELEMENT,(et+1)*vt/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,et,ut.width,ut.height,1,ht,St)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,Q.depth,ht,ut.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,dt,ut.width,ut.height,Q.depth,0,ut.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,Q.depth,ht,wt,ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,dt,ut.width,ut.height,Q.depth,0,ht,wt,ut.data)}else{Dt&&Bt&&e.texStorage2D(i.TEXTURE_2D,ct,dt,It[0].width,It[0].height);for(let J=0,ft=It.length;J<ft;J++)ut=It[J],b.format!==yn?ht!==null?Dt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,ht,ut.data):e.compressedTexImage2D(i.TEXTURE_2D,J,dt,ut.width,ut.height,0,ut.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ut.width,ut.height,ht,wt,ut.data):e.texImage2D(i.TEXTURE_2D,J,dt,ut.width,ut.height,0,ht,wt,ut.data)}else if(b.isDataArrayTexture)if(Dt){if(Bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ct,dt,Q.width,Q.height,Q.depth),U)if(b.layerUpdates.size>0){const J=oh(Q.width,Q.height,b.format,b.type);for(const ft of b.layerUpdates){const vt=Q.data.subarray(ft*J/Q.data.BYTES_PER_ELEMENT,(ft+1)*J/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ft,Q.width,Q.height,1,ht,wt,vt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ht,wt,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,dt,Q.width,Q.height,Q.depth,0,ht,wt,Q.data);else if(b.isData3DTexture)Dt?(Bt&&e.texStorage3D(i.TEXTURE_3D,ct,dt,Q.width,Q.height,Q.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ht,wt,Q.data)):e.texImage3D(i.TEXTURE_3D,0,dt,Q.width,Q.height,Q.depth,0,ht,wt,Q.data);else if(b.isFramebufferTexture){if(Bt)if(Dt)e.texStorage2D(i.TEXTURE_2D,ct,dt,Q.width,Q.height);else{let J=Q.width,ft=Q.height;for(let vt=0;vt<ct;vt++)e.texImage2D(i.TEXTURE_2D,vt,dt,J,ft,0,ht,wt,null),J>>=1,ft>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Q.parentNode!==J){J.appendChild(Q),f.add(b),J.onpaint=ft=>{const vt=ft.changedElements;for(const et of f)vt.includes(et.image)&&(et.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Q);else{const vt=i.RGBA,et=i.RGBA,St=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,vt,et,St,Q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(It.length>0){if(Dt&&Bt){const J=Qt(It[0]);e.texStorage2D(i.TEXTURE_2D,ct,dt,J.width,J.height)}for(let J=0,ft=It.length;J<ft;J++)ut=It[J],Dt?U&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,ht,wt,ut):e.texImage2D(i.TEXTURE_2D,J,dt,ht,wt,ut);b.generateMipmaps=!1}else if(Dt){if(Bt){const J=Qt(Q);e.texStorage2D(i.TEXTURE_2D,ct,dt,J.width,J.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,wt,Q)}else e.texImage2D(i.TEXTURE_2D,0,dt,ht,wt,Q);m(b)&&x(X),lt.__version=at.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Nt(R,b,B){if(b.image.length!==6)return;const X=K(R,b),Y=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+B);const at=n.get(Y);if(Y.version!==at.__version||X===!0){e.activeTexture(i.TEXTURE0+B);const lt=Xt.getPrimaries(Xt.workingColorSpace),Z=b.colorSpace===vi?null:Xt.getPrimaries(b.colorSpace),Q=b.colorSpace===vi||lt===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);const ht=b.isCompressedTexture||b.image[0].isCompressedTexture,wt=b.image[0]&&b.image[0].isDataTexture,dt=[];for(let et=0;et<6;et++)!ht&&!wt?dt[et]=g(b.image[et],!0,s.maxCubemapSize):dt[et]=wt?b.image[et].image:b.image[et],dt[et]=$e(b,dt[et]);const ut=dt[0],It=r.convert(b.format,b.colorSpace),Dt=r.convert(b.type),Bt=_(b.internalFormat,It,Dt,b.normalized,b.colorSpace),U=b.isVideoTexture!==!0,ct=at.__version===void 0||X===!0,J=Y.dataReady;let ft=w(b,ut);Ct(i.TEXTURE_CUBE_MAP,b);let vt;if(ht){U&&ct&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Bt,ut.width,ut.height);for(let et=0;et<6;et++){vt=dt[et].mipmaps;for(let St=0;St<vt.length;St++){const Mt=vt[St];b.format!==yn?It!==null?U?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St,0,0,Mt.width,Mt.height,It,Mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St,Bt,Mt.width,Mt.height,0,Mt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St,0,0,Mt.width,Mt.height,It,Dt,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St,Bt,Mt.width,Mt.height,0,It,Dt,Mt.data)}}}else{if(vt=b.mipmaps,U&&ct){vt.length>0&&ft++;const et=Qt(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Bt,et.width,et.height)}for(let et=0;et<6;et++)if(wt){U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,dt[et].width,dt[et].height,It,Dt,dt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Bt,dt[et].width,dt[et].height,0,It,Dt,dt[et].data);for(let St=0;St<vt.length;St++){const de=vt[St].image[et].image;U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St+1,0,0,de.width,de.height,It,Dt,de.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St+1,Bt,de.width,de.height,0,It,Dt,de.data)}}else{U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,It,Dt,dt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Bt,It,Dt,dt[et]);for(let St=0;St<vt.length;St++){const Mt=vt[St];U?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St+1,0,0,It,Dt,Mt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,St+1,Bt,It,Dt,Mt.image[et])}}}m(b)&&x(i.TEXTURE_CUBE_MAP),at.__version=Y.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Rt(R,b,B,X,Y,at){const lt=r.convert(B.format,B.colorSpace),Z=r.convert(B.type),Q=_(B.internalFormat,lt,Z,B.normalized,B.colorSpace),ht=n.get(b),wt=n.get(B);if(wt.__renderTarget=b,!ht.__hasExternalTextures){const dt=Math.max(1,b.width>>at),ut=Math.max(1,b.height>>at);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,at,Q,dt,ut,b.depth,0,lt,Z,null):e.texImage2D(Y,at,Q,dt,ut,0,lt,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),_e(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,Y,wt.__webglTexture,0,fe(b)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,Y,wt.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ie(R,b,B){if(i.bindRenderbuffer(i.RENDERBUFFER,R),b.depthBuffer){const X=b.depthTexture,Y=X&&X.isDepthTexture?X.type:null,at=S(b.stencilBuffer,Y),lt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_e(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,fe(b),at,b.width,b.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,fe(b),at,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,at,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,R)}else{const X=b.textures;for(let Y=0;Y<X.length;Y++){const at=X[Y],lt=r.convert(at.format,at.colorSpace),Z=r.convert(at.type),Q=_(at.internalFormat,lt,Z,at.normalized,at.colorSpace);_e(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,fe(b),Q,b.width,b.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,fe(b),Q,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Q,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function kt(R,b,B){const X=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=n.get(b.depthTexture);if(Y.__renderTarget=b,(!Y.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,b.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Ct(i.TEXTURE_CUBE_MAP,b.depthTexture);const ht=r.convert(b.depthTexture.format),wt=r.convert(b.depthTexture.type);let dt;b.depthTexture.format===ri?dt=i.DEPTH_COMPONENT24:b.depthTexture.format===Ni&&(dt=i.DEPTH24_STENCIL8);for(let ut=0;ut<6;ut++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,dt,b.width,b.height,0,ht,wt,null)}}else q(b.depthTexture,0);const at=Y.__webglTexture,lt=fe(b),Z=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,Q=b.depthTexture.format===Ni?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===ri)_e(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,at,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,at,0);else if(b.depthTexture.format===Ni)_e(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,at,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,at,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function jt(R){const b=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const X=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),X){const Y=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,X.removeEventListener("dispose",Y)};X.addEventListener("dispose",Y),b.__depthDisposeCallback=Y}b.__boundDepthTexture=X}if(R.depthTexture&&!b.__autoAllocateDepthBuffer)if(B)for(let X=0;X<6;X++)kt(b.__webglFramebuffer[X],R,X);else{const X=R.texture.mipmaps;X&&X.length>0?kt(b.__webglFramebuffer[0],R,0):kt(b.__webglFramebuffer,R,0)}else if(B){b.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[X]),b.__webglDepthbuffer[X]===void 0)b.__webglDepthbuffer[X]=i.createRenderbuffer(),ie(b.__webglDepthbuffer[X],R,!1);else{const Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,at)}}else{const X=R.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ie(b.__webglDepthbuffer,R,!1);else{const Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,at)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Jt(R,b,B){const X=n.get(R);b!==void 0&&Rt(X.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&jt(R)}function Yt(R){const b=R.texture,B=n.get(R),X=n.get(b);R.addEventListener("dispose",M);const Y=R.textures,at=R.isWebGLCubeRenderTarget===!0,lt=Y.length>1;if(lt||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=b.version,o.memory.textures++),at){B.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer[Z]=[];for(let Q=0;Q<b.mipmaps.length;Q++)B.__webglFramebuffer[Z][Q]=i.createFramebuffer()}else B.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer=[];for(let Z=0;Z<b.mipmaps.length;Z++)B.__webglFramebuffer[Z]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(lt)for(let Z=0,Q=Y.length;Z<Q;Z++){const ht=n.get(Y[Z]);ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&_e(R)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){const Q=Y[Z];B.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Z]);const ht=r.convert(Q.format,Q.colorSpace),wt=r.convert(Q.type),dt=_(Q.internalFormat,ht,wt,Q.normalized,Q.colorSpace,R.isXRRenderTarget===!0),ut=fe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,dt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,B.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ie(B.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Ct(i.TEXTURE_CUBE_MAP,b);for(let Z=0;Z<6;Z++)if(b.mipmaps&&b.mipmaps.length>0)for(let Q=0;Q<b.mipmaps.length;Q++)Rt(B.__webglFramebuffer[Z][Q],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Q);else Rt(B.__webglFramebuffer[Z],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);m(b)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let Z=0,Q=Y.length;Z<Q;Z++){const ht=Y[Z],wt=n.get(ht);let dt=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(dt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,wt.__webglTexture),Ct(dt,ht),Rt(B.__webglFramebuffer,R,ht,i.COLOR_ATTACHMENT0+Z,dt,0),m(ht)&&x(dt)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Z=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,X.__webglTexture),Ct(Z,b),b.mipmaps&&b.mipmaps.length>0)for(let Q=0;Q<b.mipmaps.length;Q++)Rt(B.__webglFramebuffer[Q],R,b,i.COLOR_ATTACHMENT0,Z,Q);else Rt(B.__webglFramebuffer,R,b,i.COLOR_ATTACHMENT0,Z,0);m(b)&&x(Z),e.unbindTexture()}R.depthBuffer&&jt(R)}function xe(R){const b=R.textures;for(let B=0,X=b.length;B<X;B++){const Y=b[B];if(m(Y)){const at=y(R),lt=n.get(Y).__webglTexture;e.bindTexture(at,lt),x(at),e.unbindTexture()}}}const we=[],Re=[];function De(R){if(R.samples>0){if(_e(R)===!1){const b=R.textures,B=R.width,X=R.height;let Y=i.COLOR_BUFFER_BIT;const at=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(R),Z=b.length>1;if(Z)for(let ht=0;ht<b.length;ht++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const Q=R.texture.mipmaps;Q&&Q.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ht=0;ht<b.length;ht++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ht]);const wt=n.get(b[ht]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,wt,0)}i.blitFramebuffer(0,0,B,X,0,0,B,X,Y,i.NEAREST),c===!0&&(we.length=0,Re.length=0,we.push(i.COLOR_ATTACHMENT0+ht),R.depthBuffer&&R.resolveDepthBuffer===!1&&(we.push(at),Re.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Re)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,we))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ht=0;ht<b.length;ht++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ht]);const wt=n.get(b[ht]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const b=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function fe(R){return Math.min(s.maxSamples,R.samples)}function _e(R){const b=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function F(R){const b=o.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function $e(R,b){const B=R.colorSpace,X=R.format,Y=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==Jr&&B!==vi&&(Xt.getTransfer(B)===te?(X!==yn||Y!==sn)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",B)),b}function Qt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=V,this.getTextureUnits=O,this.setTextureUnits=D,this.setTexture2D=q,this.setTexture2DArray=j,this.setTexture3D=it,this.setTextureCube=tt,this.rebindTextures=Jt,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=_e,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function i_(i,t){function e(n,s=vi){let r;const o=Xt.getTransfer(s);if(n===sn)return i.UNSIGNED_BYTE;if(n===Ic)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Lc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ou)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ku)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nu)return i.BYTE;if(n===Fu)return i.SHORT;if(n===Gs)return i.UNSIGNED_SHORT;if(n===Pc)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===Fn)return i.FLOAT;if(n===si)return i.HALF_FLOAT;if(n===Bu)return i.ALPHA;if(n===zu)return i.RGB;if(n===yn)return i.RGBA;if(n===ri)return i.DEPTH_COMPONENT;if(n===Ni)return i.DEPTH_STENCIL;if(n===Vu)return i.RED;if(n===Dc)return i.RED_INTEGER;if(n===Bi)return i.RG;if(n===Uc)return i.RG_INTEGER;if(n===Nc)return i.RGBA_INTEGER;if(n===Gr||n===Wr||n===Xr||n===$r)if(o===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wa||n===Ea||n===Ta||n===Aa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ca||n===Ra||n===Pa||n===Ia||n===La||n===Zr||n===Da)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ca||n===Ra)return o===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Pa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ia)return r.COMPRESSED_R11_EAC;if(n===La)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Zr)return r.COMPRESSED_RG11_EAC;if(n===Da)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ua||n===Na||n===Fa||n===Oa||n===ka||n===Ba||n===za||n===Va||n===Ha||n===Ga||n===Wa||n===Xa||n===$a||n===qa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ua)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Na)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ka)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ba)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===za)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Va)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ha)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ga)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$a)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===qa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ya||n===Ka||n===Za)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ya)return o===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Za)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ja||n===Ja||n===jr||n===Qa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ja)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ja)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const s_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,r_=`
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

}`;class o_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Ku(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Xn({vertexShader:s_,fragmentShader:r_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new be(new nr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class a_ extends Hi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,p=null;const v=typeof XRWebGLBinding<"u",g=new o_,m={},x=e.getContextAttributes();let y=null,_=null;const S=[],w=[],A=new Wt;let M=null;const E=new fn;E.viewport=new ue;const P=new fn;P.viewport=new ue;const C=[E,P],I=new gm;let V=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let rt=S[K];return rt===void 0&&(rt=new Ro,S[K]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(K){let rt=S[K];return rt===void 0&&(rt=new Ro,S[K]=rt),rt.getGripSpace()},this.getHand=function(K){let rt=S[K];return rt===void 0&&(rt=new Ro,S[K]=rt),rt.getHandSpace()};function D(K){const rt=w.indexOf(K.inputSource);if(rt===-1)return;const nt=S[rt];nt!==void 0&&(nt.update(K.inputSource,K.frame,l||o),nt.dispatchEvent({type:K.type,data:K.inputSource}))}function z(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",N);for(let K=0;K<S.length;K++){const rt=w[K];rt!==null&&(w[K]=null,S[K].disconnect(rt))}V=null,O=null,g.reset();for(const K in m)delete m[K];t.setRenderTarget(y),d=null,u=null,f=null,s=null,_=null,Ct.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",z),s.addEventListener("inputsourceschange",N),x.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,Lt=null,Nt=null;x.depth&&(Nt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=x.stencil?Ni:ri,Lt=x.stencil?Ws:Gn);const Rt={colorFormat:e.RGBA8,depthFormat:Nt,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Rt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new zn(u.textureWidth,u.textureHeight,{format:yn,type:sn,depthTexture:new _s(u.textureWidth,u.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const nt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new zn(d.framebufferWidth,d.framebufferHeight,{format:yn,type:sn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ct.setContext(s),Ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function N(K){for(let rt=0;rt<K.removed.length;rt++){const nt=K.removed[rt],Lt=w.indexOf(nt);Lt>=0&&(w[Lt]=null,S[Lt].disconnect(nt))}for(let rt=0;rt<K.added.length;rt++){const nt=K.added[rt];let Lt=w.indexOf(nt);if(Lt===-1){for(let Rt=0;Rt<S.length;Rt++)if(Rt>=w.length){w.push(nt),Lt=Rt;break}else if(w[Rt]===null){w[Rt]=nt,Lt=Rt;break}if(Lt===-1)break}const Nt=S[Lt];Nt&&Nt.connect(nt)}}const q=new L,j=new L;function it(K,rt,nt){q.setFromMatrixPosition(rt.matrixWorld),j.setFromMatrixPosition(nt.matrixWorld);const Lt=q.distanceTo(j),Nt=rt.projectionMatrix.elements,Rt=nt.projectionMatrix.elements,ie=Nt[14]/(Nt[10]-1),kt=Nt[14]/(Nt[10]+1),jt=(Nt[9]+1)/Nt[5],Jt=(Nt[9]-1)/Nt[5],Yt=(Nt[8]-1)/Nt[0],xe=(Rt[8]+1)/Rt[0],we=ie*Yt,Re=ie*xe,De=Lt/(-Yt+xe),fe=De*-Yt;if(rt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(fe),K.translateZ(De),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Nt[10]===-1)K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const _e=ie+De,F=kt+De,$e=we-fe,Qt=Re+(Lt-fe),R=jt*kt/F*_e,b=Jt*kt/F*_e;K.projectionMatrix.makePerspective($e,Qt,R,b,_e,F),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function tt(K,rt){rt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(rt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let rt=K.near,nt=K.far;g.texture!==null&&(g.depthNear>0&&(rt=g.depthNear),g.depthFar>0&&(nt=g.depthFar)),I.near=P.near=E.near=rt,I.far=P.far=E.far=nt,(V!==I.near||O!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),V=I.near,O=I.far),I.layers.mask=K.layers.mask|6,E.layers.mask=I.layers.mask&-5,P.layers.mask=I.layers.mask&-3;const Lt=K.parent,Nt=I.cameras;tt(I,Lt);for(let Rt=0;Rt<Nt.length;Rt++)tt(Nt[Rt],Lt);Nt.length===2?it(I,E,P):I.projectionMatrix.copy(E.projectionMatrix),ot(K,I,Lt)};function ot(K,rt,nt){nt===null?K.matrix.copy(rt.matrixWorld):(K.matrix.copy(nt.matrixWorld),K.matrix.invert(),K.matrix.multiply(rt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ec*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(K){return m[K]};let At=null;function Ft(K,rt){if(h=rt.getViewerPose(l||o),p=rt,h!==null){const nt=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Lt=!1;nt.length!==I.cameras.length&&(I.cameras.length=0,Lt=!0);for(let kt=0;kt<nt.length;kt++){const jt=nt[kt];let Jt=null;if(d!==null)Jt=d.getViewport(jt);else{const xe=f.getViewSubImage(u,jt);Jt=xe.viewport,kt===0&&(t.setRenderTargetTextures(_,xe.colorTexture,xe.depthStencilTexture),t.setRenderTarget(_))}let Yt=C[kt];Yt===void 0&&(Yt=new fn,Yt.layers.enable(kt),Yt.viewport=new ue,C[kt]=Yt),Yt.matrix.fromArray(jt.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(jt.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),kt===0&&(I.matrix.copy(Yt.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Lt===!0&&I.cameras.push(Yt)}const Nt=s.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=n.getBinding();const kt=f.getDepthInformation(nt[0]);kt&&kt.isValid&&kt.texture&&g.init(kt,s.renderState)}if(Nt&&Nt.includes("camera-access")&&v){t.state.unbindTexture(),f=n.getBinding();for(let kt=0;kt<nt.length;kt++){const jt=nt[kt].camera;if(jt){let Jt=m[jt];Jt||(Jt=new Ku,m[jt]=Jt);const Yt=f.getCameraImage(jt);Jt.sourceTexture=Yt}}}}for(let nt=0;nt<S.length;nt++){const Lt=w[nt],Nt=S[nt];Lt!==null&&Nt!==void 0&&Nt.update(Lt,rt,l||o)}At&&At(K,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),p=null}const Ct=new nf;Ct.setAnimationLoop(Ft),this.setAnimationLoop=function(K){At=K},this.dispose=function(){}}}const c_=new oe,hf=new Ot;hf.set(-1,0,0,0,1,0,0,0,1);function l_(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Zu(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,x,y,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&d(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,x,y):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Je&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Je&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=t.get(m),y=x.envMap,_=x.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(c_.makeRotationFromEuler(_)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(hf),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,x,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=y*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Je&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const x=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function h_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,S){const w=S.program;n.uniformBlockBinding(_,w)}function l(_,S){let w=s[_.id];w===void 0&&(g(_),w=h(_),s[_.id]=w,_.addEventListener("dispose",x));const A=S.program;n.updateUBOMapping(_,A);const M=t.render.frame;r[_.id]!==M&&(u(_),r[_.id]=M)}function h(_){const S=f();_.__bindingPointIndex=S;const w=i.createBuffer(),A=_.__size,M=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,A,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,w),w}function f(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const S=s[_.id],w=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let M=0,E=w.length;M<E;M++){const P=w[M];if(Array.isArray(P))for(let C=0,I=P.length;C<I;C++)d(P[C],M,C,A);else d(P,M,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,S,w,A){if(v(_,S,w,A)===!0){const M=_.__offset,E=_.value;if(Array.isArray(E)){let P=0;for(let C=0;C<E.length;C++){const I=E[C],V=m(I);p(I,_.__data,P),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,_.__data)}}function p(_,S,w){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,w)}function v(_,S,w,A){const M=_.value,E=S+"_"+w;if(A[E]===void 0)return typeof M=="number"||typeof M=="boolean"?A[E]=M:ArrayBuffer.isView(M)?A[E]=M.slice():A[E]=M.clone(),!0;{const P=A[E];if(typeof M=="number"||typeof M=="boolean"){if(P!==M)return A[E]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(P.equals(M)===!1)return P.copy(M),!0}}return!1}function g(_){const S=_.uniforms;let w=0;const A=16;for(let E=0,P=S.length;E<P;E++){const C=Array.isArray(S[E])?S[E]:[S[E]];for(let I=0,V=C.length;I<V;I++){const O=C[I],D=Array.isArray(O.value)?O.value:[O.value];for(let z=0,N=D.length;z<N;z++){const q=D[z],j=m(q),it=w%A,tt=it%j.boundary,ot=it+tt;w+=tt,ot!==0&&A-ot<j.storage&&(w+=A-ot),O.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=w,w+=j.storage}}}const M=w%A;return M>0&&(w+=A-M),_.__size=w,_.__cache={},this}function m(_){const S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Ut("WebGLRenderer: Unsupported uniform value type.",_),S}function x(_){const S=_.target;S.removeEventListener("dispose",x);const w=o.indexOf(S.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function y(){for(const _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:y}}const u_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Cn=null;function f_(){return Cn===null&&(Cn=new tm(u_,16,16,Bi,si),Cn.name="DFG_LUT",Cn.minFilter=Ve,Cn.magFilter=Ve,Cn.wrapS=ei,Cn.wrapT=ei,Cn.generateMipmaps=!1,Cn.needsUpdate=!0),Cn}class uf{constructor(t={}){const{canvas:e=Lp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=sn}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const v=d,g=new Set([Nc,Uc,Dc]),m=new Set([sn,Gn,Gs,Ws,Ic,Lc]),x=new Uint32Array(4),y=new Int32Array(4),_=new L;let S=null,w=null;const A=[],M=[];let E=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let C=!1,I=null,V=null,O=null,D=null;this._outputColorSpace=hn;let z=0,N=0,q=null,j=-1,it=null;const tt=new ue,ot=new ue;let At=null;const Ft=new Gt(0);let Ct=0,K=e.width,rt=e.height,nt=1,Lt=null,Nt=null;const Rt=new ue(0,0,K,rt),ie=new ue(0,0,K,rt);let kt=!1;const jt=new zc;let Jt=!1,Yt=!1;const xe=new oe,we=new L,Re=new ue,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function _e(){return q===null?nt:1}let F=n;function $e(T,k){return e.getContext(T,k)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Cc}`),e.addEventListener("webglcontextlost",de,!1),e.addEventListener("webglcontextrestored",ae,!1),e.addEventListener("webglcontextcreationerror",wn,!1),F===null){const k="webgl2";if(F=$e(k,T),F===null)throw $e(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(T){throw qt("WebGLRenderer: "+T.message),T}let Qt,R,b,B,X,Y,at,lt,Z,Q,ht,wt,dt,ut,It,Dt,Bt,U,ct,J,ft,vt,et;function St(){Qt=new fv(F),Qt.init(),ft=new i_(F,Qt),R=new sv(F,Qt,t,ft),b=new e_(F,Qt),R.reversedDepthBuffer&&u&&b.buffers.depth.setReversed(!0),V=F.createFramebuffer(),O=F.createFramebuffer(),D=F.createFramebuffer(),B=new mv(F),X=new Vx,Y=new n_(F,Qt,b,X,R,ft,B),at=new uv(P),lt=new _m(F),vt=new nv(F,lt),Z=new dv(F,lt,B,vt),Q=new vv(F,Z,lt,vt,B),U=new gv(F,R,Y),It=new rv(X),ht=new zx(P,at,Qt,R,vt,It),wt=new l_(P,X),dt=new Gx,ut=new Kx(Qt),Bt=new ev(P,at,b,Q,p,c),Dt=new t_(P,Q,R),et=new h_(F,B,R,b),ct=new iv(F,Qt,B),J=new pv(F,Qt,B),B.programs=ht.programs,P.capabilities=R,P.extensions=Qt,P.properties=X,P.renderLists=dt,P.shadowMap=Dt,P.state=b,P.info=B}St(),v!==sn&&(E=new _v(v,e.width,e.height,a,s,r));const Mt=new a_(P,F);this.xr=Mt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const T=Qt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Qt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(T){T!==void 0&&(nt=T,this.setSize(K,rt,!1))},this.getSize=function(T){return T.set(K,rt)},this.setSize=function(T,k,$=!0){if(Mt.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,rt=k,e.width=Math.floor(T*nt),e.height=Math.floor(k*nt),$===!0&&(e.style.width=T+"px",e.style.height=k+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(K*nt,rt*nt).floor()},this.setDrawingBufferSize=function(T,k,$){K=T,rt=k,nt=$,e.width=Math.floor(T*$),e.height=Math.floor(k*$),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(v===sn){qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Ut("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(tt)},this.getViewport=function(T){return T.copy(Rt)},this.setViewport=function(T,k,$,G){T.isVector4?Rt.set(T.x,T.y,T.z,T.w):Rt.set(T,k,$,G),b.viewport(tt.copy(Rt).multiplyScalar(nt).round())},this.getScissor=function(T){return T.copy(ie)},this.setScissor=function(T,k,$,G){T.isVector4?ie.set(T.x,T.y,T.z,T.w):ie.set(T,k,$,G),b.scissor(ot.copy(ie).multiplyScalar(nt).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(T){b.setScissorTest(kt=T)},this.setOpaqueSort=function(T){Lt=T},this.setTransparentSort=function(T){Nt=T},this.getClearColor=function(T){return T.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor(...arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,$=!0){let G=0;if(T){let W=!1;if(q!==null){const gt=q.texture.format;W=g.has(gt)}if(W){const gt=q.texture.type,_t=m.has(gt),mt=Bt.getClearColor(),yt=Bt.getClearAlpha(),Et=mt.r,zt=mt.g,Ht=mt.b;_t?(x[0]=Et,x[1]=zt,x[2]=Ht,x[3]=yt,F.clearBufferuiv(F.COLOR,0,x)):(y[0]=Et,y[1]=zt,y[2]=Ht,y[3]=yt,F.clearBufferiv(F.COLOR,0,y))}else G|=F.COLOR_BUFFER_BIT}k&&(G|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),I=T},this.dispose=function(){e.removeEventListener("webglcontextlost",de,!1),e.removeEventListener("webglcontextrestored",ae,!1),e.removeEventListener("webglcontextcreationerror",wn,!1),Bt.dispose(),dt.dispose(),ut.dispose(),X.dispose(),at.dispose(),Q.dispose(),vt.dispose(),et.dispose(),ht.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",dl),Mt.removeEventListener("sessionend",pl),Si.stop()};function de(T){T.preventDefault(),Il("WebGLRenderer: Context Lost."),C=!0}function ae(){Il("WebGLRenderer: Context Restored."),C=!1;const T=B.autoReset,k=Dt.enabled,$=Dt.autoUpdate,G=Dt.needsUpdate,W=Dt.type;St(),B.autoReset=T,Dt.enabled=k,Dt.autoUpdate=$,Dt.needsUpdate=G,Dt.type=W}function wn(T){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function En(T){const k=T.target;k.removeEventListener("dispose",En),Wd(k)}function Wd(T){Xd(T),X.remove(T)}function Xd(T){const k=X.get(T).programs;k!==void 0&&(k.forEach(function($){ht.releaseProgram($)}),T.isShaderMaterial&&ht.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,$,G,W,gt){k===null&&(k=De);const _t=W.isMesh&&W.matrixWorld.determinantAffine()<0,mt=Yd(T,k,$,G,W);b.setMaterial(G,_t);let yt=$.index,Et=1;if(G.wireframe===!0){if(yt=Z.getWireframeAttribute($),yt===void 0)return;Et=2}const zt=$.drawRange,Ht=$.attributes.position;let Pt=zt.start*Et,ne=(zt.start+zt.count)*Et;gt!==null&&(Pt=Math.max(Pt,gt.start*Et),ne=Math.min(ne,(gt.start+gt.count)*Et)),yt!==null?(Pt=Math.max(Pt,0),ne=Math.min(ne,yt.count)):Ht!=null&&(Pt=Math.max(Pt,0),ne=Math.min(ne,Ht.count));const me=ne-Pt;if(me<0||me===1/0)return;vt.setup(W,G,mt,$,yt);let pe,se=ct;if(yt!==null&&(pe=lt.get(yt),se=J,se.setIndex(pe)),W.isMesh)G.wireframe===!0?(b.setLineWidth(G.wireframeLinewidth*_e()),se.setMode(F.LINES)):se.setMode(F.TRIANGLES);else if(W.isLine){let Fe=G.linewidth;Fe===void 0&&(Fe=1),b.setLineWidth(Fe*_e()),W.isLineSegments?se.setMode(F.LINES):W.isLineLoop?se.setMode(F.LINE_LOOP):se.setMode(F.LINE_STRIP)}else W.isPoints?se.setMode(F.POINTS):W.isSprite&&se.setMode(F.TRIANGLES);if(W.isBatchedMesh)if(Qt.get("WEBGL_multi_draw"))se.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Fe=W._multiDrawStarts,xt=W._multiDrawCounts,Qe=W._multiDrawCount,Kt=yt?lt.get(yt).bytesPerElement:1,cn=X.get(G).currentProgram.getUniforms();for(let Tn=0;Tn<Qe;Tn++)cn.setValue(F,"_gl_DrawID",Tn),se.render(Fe[Tn]/Kt,xt[Tn])}else if(W.isInstancedMesh)se.renderInstances(Pt,me,W.count);else if($.isInstancedBufferGeometry){const Fe=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,xt=Math.min($.instanceCount,Fe);se.renderInstances(Pt,me,xt)}else se.render(Pt,me)};function fl(T,k,$){T.transparent===!0&&T.side===Xe&&T.forceSinglePass===!1?(T.side=Je,T.needsUpdate=!0,or(T,k,$),T.side=_i,T.needsUpdate=!0,or(T,k,$),T.side=Xe):or(T,k,$)}this.compile=function(T,k,$=null){$===null&&($=T),w=ut.get($),w.init(k),M.push(w),$.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),T!==$&&T.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(w.pushLight(W),W.castShadow&&w.pushShadow(W))}),w.setupLights();const G=new Set;return T.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const gt=W.material;if(gt)if(Array.isArray(gt))for(let _t=0;_t<gt.length;_t++){const mt=gt[_t];fl(mt,$,W),G.add(mt)}else fl(gt,$,W),G.add(gt)}),w=M.pop(),G},this.compileAsync=function(T,k,$=null){const G=this.compile(T,k,$);return new Promise(W=>{function gt(){if(G.forEach(function(_t){X.get(_t).currentProgram.isReady()&&G.delete(_t)}),G.size===0){W(T);return}setTimeout(gt,10)}Qt.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let vo=null;function $d(T){vo&&vo(T)}function dl(){Si.stop()}function pl(){Si.start()}const Si=new nf;Si.setAnimationLoop($d),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(T){vo=T,Mt.setAnimationLoop(T),T===null?Si.stop():Si.start()},Mt.addEventListener("sessionstart",dl),Mt.addEventListener("sessionend",pl),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;I!==null&&I.renderStart(T,k);const $=Mt.enabled===!0&&Mt.isPresenting===!0,G=E!==null&&(q===null||$)&&E.begin(P,q);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(k),k=Mt.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,k,q),w=ut.get(T,M.length),w.init(k),w.state.textureUnits=Y.getTextureUnits(),M.push(w),xe.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),jt.setFromProjectionMatrix(xe,On,k.reversedDepth),Yt=this.localClippingEnabled,Jt=It.init(this.clippingPlanes,Yt),S=dt.get(T,A.length),S.init(),A.push(S),Mt.enabled===!0&&Mt.isPresenting===!0){const _t=P.xr.getDepthSensingMesh();_t!==null&&xo(_t,k,-1/0,P.sortObjects)}xo(T,k,0,P.sortObjects),S.finish(),P.sortObjects===!0&&S.sort(Lt,Nt,k.reversedDepth),fe=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,fe&&Bt.addToRenderList(S,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Jt===!0&&It.beginShadows();const W=w.state.shadowsArray;if(Dt.render(W,T,k),Jt===!0&&It.endShadows(),(G&&E.hasRenderPass())===!1){const _t=S.opaque,mt=S.transmissive;if(w.setupLights(),k.isArrayCamera){const yt=k.cameras;if(mt.length>0)for(let Et=0,zt=yt.length;Et<zt;Et++){const Ht=yt[Et];gl(_t,mt,T,Ht)}fe&&Bt.render(T);for(let Et=0,zt=yt.length;Et<zt;Et++){const Ht=yt[Et];ml(S,T,Ht,Ht.viewport)}}else mt.length>0&&gl(_t,mt,T,k),fe&&Bt.render(T),ml(S,T,k)}q!==null&&N===0&&(Y.updateMultisampleRenderTarget(q),Y.updateRenderTargetMipmap(q)),G&&E.end(P),T.isScene===!0&&T.onAfterRender(P,T,k),vt.resetDefaultState(),j=-1,it=null,M.pop(),M.length>0?(w=M[M.length-1],Y.setTextureUnits(w.state.textureUnits),Jt===!0&&It.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?S=A[A.length-1]:S=null,I!==null&&I.renderEnd()};function xo(T,k,$,G){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)$=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLightProbeGrid)w.pushLightProbeGrid(T);else if(T.isLight)w.pushLight(T),T.castShadow&&w.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||jt.intersectsSprite(T)){G&&Re.setFromMatrixPosition(T.matrixWorld).applyMatrix4(xe);const _t=Q.update(T),mt=T.material;mt.visible&&S.push(T,_t,mt,$,Re.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||jt.intersectsObject(T))){const _t=Q.update(T),mt=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Re.copy(T.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Re.copy(_t.boundingSphere.center)),Re.applyMatrix4(T.matrixWorld).applyMatrix4(xe)),Array.isArray(mt)){const yt=_t.groups;for(let Et=0,zt=yt.length;Et<zt;Et++){const Ht=yt[Et],Pt=mt[Ht.materialIndex];Pt&&Pt.visible&&S.push(T,_t,Pt,$,Re.z,Ht)}}else mt.visible&&S.push(T,_t,mt,$,Re.z,null)}}const gt=T.children;for(let _t=0,mt=gt.length;_t<mt;_t++)xo(gt[_t],k,$,G)}function ml(T,k,$,G){const{opaque:W,transmissive:gt,transparent:_t}=T;w.setupLightsView($),Jt===!0&&It.setGlobalState(P.clippingPlanes,$),G&&b.viewport(tt.copy(G)),W.length>0&&rr(W,k,$),gt.length>0&&rr(gt,k,$),_t.length>0&&rr(_t,k,$),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function gl(T,k,$,G){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[G.id]===void 0){const Pt=Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[G.id]=new zn(1,1,{generateMipmaps:!0,type:Pt?si:sn,minFilter:Ui,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace})}const gt=w.state.transmissionRenderTarget[G.id],_t=G.viewport||tt;gt.setSize(_t.z*P.transmissionResolutionScale,_t.w*P.transmissionResolutionScale);const mt=P.getRenderTarget(),yt=P.getActiveCubeFace(),Et=P.getActiveMipmapLevel();P.setRenderTarget(gt),P.getClearColor(Ft),Ct=P.getClearAlpha(),Ct<1&&P.setClearColor(16777215,.5),P.clear(),fe&&Bt.render($);const zt=P.toneMapping;P.toneMapping=Bn;const Ht=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),w.setupLightsView(G),Jt===!0&&It.setGlobalState(P.clippingPlanes,G),rr(T,$,G),Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let ne=0,me=k.length;ne<me;ne++){const pe=k[ne],{object:se,geometry:Fe,material:xt,group:Qe}=pe;if(xt.side===Xe&&se.layers.test(G.layers)){const Kt=xt.side;xt.side=Je,xt.needsUpdate=!0,vl(se,$,G,Fe,xt,Qe),xt.side=Kt,xt.needsUpdate=!0,Pt=!0}}Pt===!0&&(Y.updateMultisampleRenderTarget(gt),Y.updateRenderTargetMipmap(gt))}P.setRenderTarget(mt,yt,Et),P.setClearColor(Ft,Ct),Ht!==void 0&&(G.viewport=Ht),P.toneMapping=zt}function rr(T,k,$){const G=k.isScene===!0?k.overrideMaterial:null;for(let W=0,gt=T.length;W<gt;W++){const _t=T[W],{object:mt,geometry:yt,group:Et}=_t;let zt=_t.material;zt.allowOverride===!0&&G!==null&&(zt=G),mt.layers.test($.layers)&&vl(mt,k,$,yt,zt,Et)}}function vl(T,k,$,G,W,gt){T.onBeforeRender(P,k,$,G,W,gt),T.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),W.onBeforeRender(P,k,$,G,T,gt),W.transparent===!0&&W.side===Xe&&W.forceSinglePass===!1?(W.side=Je,W.needsUpdate=!0,P.renderBufferDirect($,k,G,W,T,gt),W.side=_i,W.needsUpdate=!0,P.renderBufferDirect($,k,G,W,T,gt),W.side=Xe):P.renderBufferDirect($,k,G,W,T,gt),T.onAfterRender(P,k,$,G,W,gt)}function or(T,k,$){k.isScene!==!0&&(k=De);const G=X.get(T),W=w.state.lights,gt=w.state.shadowsArray,_t=W.state.version,mt=ht.getParameters(T,W.state,gt,k,$,w.state.lightProbeGridArray),yt=ht.getProgramCacheKey(mt);let Et=G.programs;G.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,G.fog=k.fog;const zt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;G.envMap=at.get(T.envMap||G.environment,zt),G.envMapRotation=G.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,Et===void 0&&(T.addEventListener("dispose",En),Et=new Map,G.programs=Et);let Ht=Et.get(yt);if(Ht!==void 0){if(G.currentProgram===Ht&&G.lightsStateVersion===_t)return _l(T,mt),Ht}else mt.uniforms=ht.getUniforms(T),I!==null&&T.isNodeMaterial&&I.build(T,$,mt),T.onBeforeCompile(mt,P),Ht=ht.acquireProgram(mt,yt),Et.set(yt,Ht),G.uniforms=mt.uniforms;const Pt=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Pt.clippingPlanes=It.uniform),_l(T,mt),G.needsLights=Zd(T),G.lightsStateVersion=_t,G.needsLights&&(Pt.ambientLightColor.value=W.state.ambient,Pt.lightProbe.value=W.state.probe,Pt.directionalLights.value=W.state.directional,Pt.directionalLightShadows.value=W.state.directionalShadow,Pt.spotLights.value=W.state.spot,Pt.spotLightShadows.value=W.state.spotShadow,Pt.rectAreaLights.value=W.state.rectArea,Pt.ltc_1.value=W.state.rectAreaLTC1,Pt.ltc_2.value=W.state.rectAreaLTC2,Pt.pointLights.value=W.state.point,Pt.pointLightShadows.value=W.state.pointShadow,Pt.hemisphereLights.value=W.state.hemi,Pt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Pt.spotLightMatrix.value=W.state.spotLightMatrix,Pt.spotLightMap.value=W.state.spotLightMap,Pt.pointShadowMatrix.value=W.state.pointShadowMatrix),G.lightProbeGrid=w.state.lightProbeGridArray.length>0,G.currentProgram=Ht,G.uniformsList=null,Ht}function xl(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=qr.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function _l(T,k){const $=X.get(T);$.outputColorSpace=k.outputColorSpace,$.batching=k.batching,$.batchingColor=k.batchingColor,$.instancing=k.instancing,$.instancingColor=k.instancingColor,$.instancingMorph=k.instancingMorph,$.skinning=k.skinning,$.morphTargets=k.morphTargets,$.morphNormals=k.morphNormals,$.morphColors=k.morphColors,$.morphTargetsCount=k.morphTargetsCount,$.numClippingPlanes=k.numClippingPlanes,$.numIntersection=k.numClipIntersection,$.vertexAlphas=k.vertexAlphas,$.vertexTangents=k.vertexTangents,$.toneMapping=k.toneMapping}function qd(T,k){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;_.setFromMatrixPosition(k.matrixWorld);for(let $=0,G=T.length;$<G;$++){const W=T[$];if(W.texture!==null&&W.boundingBox.containsPoint(_))return W}return null}function Yd(T,k,$,G,W){k.isScene!==!0&&(k=De),Y.resetTextureUnits();const gt=k.fog,_t=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?k.environment:null,mt=q===null?P.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Xt.workingColorSpace,yt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Et=at.get(G.envMap||_t,yt),zt=G.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ht=!!$.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Pt=!!$.morphAttributes.position,ne=!!$.morphAttributes.normal,me=!!$.morphAttributes.color;let pe=Bn;G.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(pe=P.toneMapping);const se=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Fe=se!==void 0?se.length:0,xt=X.get(G),Qe=w.state.lights;if(Jt===!0&&(Yt===!0||T!==it)){const ce=T===it&&G.id===j;It.setState(G,T,ce)}let Kt=!1;G.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Qe.state.version||xt.outputColorSpace!==mt||W.isBatchedMesh&&xt.batching===!1||!W.isBatchedMesh&&xt.batching===!0||W.isBatchedMesh&&xt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&xt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&xt.instancing===!1||!W.isInstancedMesh&&xt.instancing===!0||W.isSkinnedMesh&&xt.skinning===!1||!W.isSkinnedMesh&&xt.skinning===!0||W.isInstancedMesh&&xt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&xt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&xt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&xt.instancingMorph===!1&&W.morphTexture!==null||xt.envMap!==Et||G.fog===!0&&xt.fog!==gt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==It.numPlanes||xt.numIntersection!==It.numIntersection)||xt.vertexAlphas!==zt||xt.vertexTangents!==Ht||xt.morphTargets!==Pt||xt.morphNormals!==ne||xt.morphColors!==me||xt.toneMapping!==pe||xt.morphTargetsCount!==Fe||!!xt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Kt=!0):(Kt=!0,xt.__version=G.version);let cn=xt.currentProgram;Kt===!0&&(cn=or(G,k,W),I&&G.isNodeMaterial&&I.onUpdateProgram(G,cn,xt));let Tn=!1,oi=!1,Wi=!1;const re=cn.getUniforms(),ge=xt.uniforms;if(b.useProgram(cn.program)&&(Tn=!0,oi=!0,Wi=!0),G.id!==j&&(j=G.id,oi=!0),xt.needsLights){const ce=qd(w.state.lightProbeGridArray,W);xt.lightProbeGrid!==ce&&(xt.lightProbeGrid=ce,oi=!0)}if(Tn||it!==T){b.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),re.setValue(F,"projectionMatrix",T.projectionMatrix),re.setValue(F,"viewMatrix",T.matrixWorldInverse);const ci=re.map.cameraPosition;ci!==void 0&&ci.setValue(F,we.setFromMatrixPosition(T.matrixWorld)),R.logarithmicDepthBuffer&&re.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&re.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),it!==T&&(it=T,oi=!0,Wi=!0)}if(xt.needsLights&&(Qe.state.directionalShadowMap.length>0&&re.setValue(F,"directionalShadowMap",Qe.state.directionalShadowMap,Y),Qe.state.spotShadowMap.length>0&&re.setValue(F,"spotShadowMap",Qe.state.spotShadowMap,Y),Qe.state.pointShadowMap.length>0&&re.setValue(F,"pointShadowMap",Qe.state.pointShadowMap,Y)),W.isSkinnedMesh){re.setOptional(F,W,"bindMatrix"),re.setOptional(F,W,"bindMatrixInverse");const ce=W.skeleton;ce&&(ce.boneTexture===null&&ce.computeBoneTexture(),re.setValue(F,"boneTexture",ce.boneTexture,Y))}W.isBatchedMesh&&(re.setOptional(F,W,"batchingTexture"),re.setValue(F,"batchingTexture",W._matricesTexture,Y),re.setOptional(F,W,"batchingIdTexture"),re.setValue(F,"batchingIdTexture",W._indirectTexture,Y),re.setOptional(F,W,"batchingColorTexture"),W._colorsTexture!==null&&re.setValue(F,"batchingColorTexture",W._colorsTexture,Y));const ai=$.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&U.update(W,$,cn),(oi||xt.receiveShadow!==W.receiveShadow)&&(xt.receiveShadow=W.receiveShadow,re.setValue(F,"receiveShadow",W.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&k.environment!==null&&(ge.envMapIntensity.value=k.environmentIntensity),ge.dfgLUT!==void 0&&(ge.dfgLUT.value=f_()),oi){if(re.setValue(F,"toneMappingExposure",P.toneMappingExposure),xt.needsLights&&Kd(ge,Wi),gt&&G.fog===!0&&wt.refreshFogUniforms(ge,gt),wt.refreshMaterialUniforms(ge,G,nt,rt,w.state.transmissionRenderTarget[T.id]),xt.needsLights&&xt.lightProbeGrid){const ce=xt.lightProbeGrid;ge.probesSH.value=ce.texture,ge.probesMin.value.copy(ce.boundingBox.min),ge.probesMax.value.copy(ce.boundingBox.max),ge.probesResolution.value.copy(ce.resolution)}qr.upload(F,xl(xt),ge,Y)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(qr.upload(F,xl(xt),ge,Y),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&re.setValue(F,"center",W.center),re.setValue(F,"modelViewMatrix",W.modelViewMatrix),re.setValue(F,"normalMatrix",W.normalMatrix),re.setValue(F,"modelMatrix",W.matrixWorld),G.uniformsGroups!==void 0){const ce=G.uniformsGroups;for(let ci=0,Xi=ce.length;ci<Xi;ci++){const Ml=ce[ci];et.update(Ml,cn),et.bind(Ml,cn)}}return cn}function Kd(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Zd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(T,k,$){const G=X.get(T);G.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),X.get(T.texture).__webglTexture=k,X.get(T.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:$,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const $=X.get(T);$.__webglFramebuffer=k,$.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,$=0){q=T,z=k,N=$;let G=null,W=!1,gt=!1;if(T){const mt=X.get(T);if(mt.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(F.FRAMEBUFFER,mt.__webglFramebuffer),tt.copy(T.viewport),ot.copy(T.scissor),At=T.scissorTest,b.viewport(tt),b.scissor(ot),b.setScissorTest(At),j=-1;return}else if(mt.__webglFramebuffer===void 0)Y.setupRenderTarget(T);else if(mt.__hasExternalTextures)Y.rebindTextures(T,X.get(T.texture).__webglTexture,X.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const zt=T.depthTexture;if(mt.__boundDepthTexture!==zt){if(zt!==null&&X.has(zt)&&(T.width!==zt.image.width||T.height!==zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(T)}}const yt=T.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(gt=!0);const Et=X.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Et[k])?G=Et[k][$]:G=Et[k],W=!0):T.samples>0&&Y.useMultisampledRTT(T)===!1?G=X.get(T).__webglMultisampledFramebuffer:Array.isArray(Et)?G=Et[$]:G=Et,tt.copy(T.viewport),ot.copy(T.scissor),At=T.scissorTest}else tt.copy(Rt).multiplyScalar(nt).floor(),ot.copy(ie).multiplyScalar(nt).floor(),At=kt;if($!==0&&(G=V),b.bindFramebuffer(F.FRAMEBUFFER,G)&&b.drawBuffers(T,G),b.viewport(tt),b.scissor(ot),b.setScissorTest(At),W){const mt=X.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+k,mt.__webglTexture,$)}else if(gt){const mt=k;for(let yt=0;yt<T.textures.length;yt++){const Et=X.get(T.textures[yt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+yt,Et.__webglTexture,$,mt)}}else if(T!==null&&$!==0){const mt=X.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,mt.__webglTexture,$)}j=-1},this.readRenderTargetPixels=function(T,k,$,G,W,gt,_t,mt=0){if(!(T&&T.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=X.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t]),yt){b.bindFramebuffer(F.FRAMEBUFFER,yt);try{const Et=T.textures[mt],zt=Et.format,Ht=Et.type;if(T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+mt),!R.textureFormatReadable(zt)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(Ht)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-G&&$>=0&&$<=T.height-W&&F.readPixels(k,$,G,W,ft.convert(zt),ft.convert(Ht),gt)}finally{const Et=q!==null?X.get(q).__webglFramebuffer:null;b.bindFramebuffer(F.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(T,k,$,G,W,gt,_t,mt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=X.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t]),yt)if(k>=0&&k<=T.width-G&&$>=0&&$<=T.height-W){b.bindFramebuffer(F.FRAMEBUFFER,yt);const Et=T.textures[mt],zt=Et.format,Ht=Et.type;if(T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+mt),!R.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Pt),F.bufferData(F.PIXEL_PACK_BUFFER,gt.byteLength,F.STREAM_READ),F.readPixels(k,$,G,W,ft.convert(zt),ft.convert(Ht),0);const ne=q!==null?X.get(q).__webglFramebuffer:null;b.bindFramebuffer(F.FRAMEBUFFER,ne);const me=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Dp(F,me,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Pt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,gt),F.deleteBuffer(Pt),F.deleteSync(me),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,$=0){const G=Math.pow(2,-$),W=Math.floor(T.image.width*G),gt=Math.floor(T.image.height*G),_t=k!==null?k.x:0,mt=k!==null?k.y:0;Y.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,$,0,0,_t,mt,W,gt),b.unbindTexture()},this.copyTextureToTexture=function(T,k,$=null,G=null,W=0,gt=0){let _t,mt,yt,Et,zt,Ht,Pt,ne,me;const pe=T.isCompressedTexture?T.mipmaps[gt]:T.image;if($!==null)_t=$.max.x-$.min.x,mt=$.max.y-$.min.y,yt=$.isBox3?$.max.z-$.min.z:1,Et=$.min.x,zt=$.min.y,Ht=$.isBox3?$.min.z:0;else{const ge=Math.pow(2,-W);_t=Math.floor(pe.width*ge),mt=Math.floor(pe.height*ge),T.isDataArrayTexture?yt=pe.depth:T.isData3DTexture?yt=Math.floor(pe.depth*ge):yt=1,Et=0,zt=0,Ht=0}G!==null?(Pt=G.x,ne=G.y,me=G.z):(Pt=0,ne=0,me=0);const se=ft.convert(k.format),Fe=ft.convert(k.type);let xt;k.isData3DTexture?(Y.setTexture3D(k,0),xt=F.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Y.setTexture2DArray(k,0),xt=F.TEXTURE_2D_ARRAY):(Y.setTexture2D(k,0),xt=F.TEXTURE_2D),b.activeTexture(F.TEXTURE0),b.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,k.flipY),b.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),b.pixelStorei(F.UNPACK_ALIGNMENT,k.unpackAlignment);const Qe=b.getParameter(F.UNPACK_ROW_LENGTH),Kt=b.getParameter(F.UNPACK_IMAGE_HEIGHT),cn=b.getParameter(F.UNPACK_SKIP_PIXELS),Tn=b.getParameter(F.UNPACK_SKIP_ROWS),oi=b.getParameter(F.UNPACK_SKIP_IMAGES);b.pixelStorei(F.UNPACK_ROW_LENGTH,pe.width),b.pixelStorei(F.UNPACK_IMAGE_HEIGHT,pe.height),b.pixelStorei(F.UNPACK_SKIP_PIXELS,Et),b.pixelStorei(F.UNPACK_SKIP_ROWS,zt),b.pixelStorei(F.UNPACK_SKIP_IMAGES,Ht);const Wi=T.isDataArrayTexture||T.isData3DTexture,re=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const ge=X.get(T),ai=X.get(k),ce=X.get(ge.__renderTarget),ci=X.get(ai.__renderTarget);b.bindFramebuffer(F.READ_FRAMEBUFFER,ce.__webglFramebuffer),b.bindFramebuffer(F.DRAW_FRAMEBUFFER,ci.__webglFramebuffer);for(let Xi=0;Xi<yt;Xi++)Wi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,X.get(T).__webglTexture,W,Ht+Xi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,X.get(k).__webglTexture,gt,me+Xi)),F.blitFramebuffer(Et,zt,_t,mt,Pt,ne,_t,mt,F.DEPTH_BUFFER_BIT,F.NEAREST);b.bindFramebuffer(F.READ_FRAMEBUFFER,null),b.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(W!==0||T.isRenderTargetTexture||X.has(T)){const ge=X.get(T),ai=X.get(k);b.bindFramebuffer(F.READ_FRAMEBUFFER,O),b.bindFramebuffer(F.DRAW_FRAMEBUFFER,D);for(let ce=0;ce<yt;ce++)Wi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ge.__webglTexture,W,Ht+ce):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ge.__webglTexture,W),re?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ai.__webglTexture,gt,me+ce):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ai.__webglTexture,gt),W!==0?F.blitFramebuffer(Et,zt,_t,mt,Pt,ne,_t,mt,F.COLOR_BUFFER_BIT,F.NEAREST):re?F.copyTexSubImage3D(xt,gt,Pt,ne,me+ce,Et,zt,_t,mt):F.copyTexSubImage2D(xt,gt,Pt,ne,Et,zt,_t,mt);b.bindFramebuffer(F.READ_FRAMEBUFFER,null),b.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else re?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(xt,gt,Pt,ne,me,_t,mt,yt,se,Fe,pe.data):k.isCompressedArrayTexture?F.compressedTexSubImage3D(xt,gt,Pt,ne,me,_t,mt,yt,se,pe.data):F.texSubImage3D(xt,gt,Pt,ne,me,_t,mt,yt,se,Fe,pe):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,gt,Pt,ne,_t,mt,se,Fe,pe.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,gt,Pt,ne,pe.width,pe.height,se,pe.data):F.texSubImage2D(F.TEXTURE_2D,gt,Pt,ne,_t,mt,se,Fe,pe);b.pixelStorei(F.UNPACK_ROW_LENGTH,Qe),b.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Kt),b.pixelStorei(F.UNPACK_SKIP_PIXELS,cn),b.pixelStorei(F.UNPACK_SKIP_ROWS,Tn),b.pixelStorei(F.UNPACK_SKIP_IMAGES,oi),gt===0&&k.generateMipmaps&&F.generateMipmap(xt),b.unbindTexture()},this.initRenderTarget=function(T){X.get(T).__webglFramebuffer===void 0&&Y.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Y.setTextureCube(T,0):T.isData3DTexture?Y.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Y.setTexture2DArray(T,0):Y.setTexture2D(T,0),b.unbindTexture()},this.resetState=function(){z=0,N=0,q=null,b.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}function bt(i,t){return i<t?`${i}_${t}`:`${t}_${i}`}class Vi{positions;faceOffsets;faceCorners;uvSets;crease;cornerSharp;polygroup;materialId;vertexColor;constructor(t,e,n,s={}){this.positions=t,this.faceOffsets=e,this.faceCorners=n;const r=Math.max(0,e.length-1);this.uvSets=s.uvSets??new Map,this.crease=s.crease??new Map,this.cornerSharp=s.cornerSharp??new Map,this.polygroup=s.polygroup??new Uint16Array(r),this.materialId=s.materialId??new Uint16Array(r),this.vertexColor=s.vertexColor??null}static empty(){return new Vi(new Float32Array(0),new Uint32Array([0]),new Uint32Array(0))}get vertexCount(){return this.positions.length/3}get faceCount(){return Math.max(0,this.faceOffsets.length-1)}get cornerCount(){return this.faceCorners.length}faceSize(t){return this.faceOffsets[t+1]-this.faceOffsets[t]}faceVerts(t){const e=[];for(let n=this.faceOffsets[t];n<this.faceOffsets[t+1];n++)e.push(this.faceCorners[n]);return e}cornerIndex(t,e){return this.faceOffsets[t]+e}getPosition(t,e=[0,0,0]){return e[0]=this.positions[t*3],e[1]=this.positions[t*3+1],e[2]=this.positions[t*3+2],e}setPosition(t,e,n,s){this.positions[t*3]=e,this.positions[t*3+1]=n,this.positions[t*3+2]=s}getCrease(t,e){return this.crease.get(bt(t,e))??0}setCrease(t,e,n){const s=bt(t,e);n<=0?this.crease.delete(s):this.crease.set(s,Math.min(10,n))}edges(){const t=new Set,e=[];for(let n=0;n<this.faceCount;n++){const s=this.faceOffsets[n],r=this.faceOffsets[n+1]-s;for(let o=0;o<r;o++){const a=this.faceCorners[s+o],c=this.faceCorners[s+(o+1)%r],l=bt(a,c);t.has(l)||(t.add(l),e.push([Math.min(a,c),Math.max(a,c)]))}}return e}edgeFaceMap(){const t=new Map;for(let e=0;e<this.faceCount;e++){const n=this.faceOffsets[e],s=this.faceOffsets[e+1]-n;for(let r=0;r<s;r++){const o=bt(this.faceCorners[n+r],this.faceCorners[n+(r+1)%s]),a=t.get(o);a?a.push(e):t.set(o,[e])}}return t}vertexFaces(){const t=new Map;for(let e=0;e<this.faceCount;e++)for(let n=this.faceOffsets[e];n<this.faceOffsets[e+1];n++){const s=this.faceCorners[n],r=t.get(s);r?r.push(e):t.set(s,[e])}return t}vertexNeighbors(){const t=new Map,e=(n,s)=>{const r=t.get(n);r?r.includes(s)||r.push(s):t.set(n,[s])};for(const[n,s]of this.edges())e(n,s),e(s,n);return t}triangulate(){let t=0;for(let r=0;r<this.faceCount;r++)t+=Math.max(0,this.faceSize(r)-2);const e=new Uint32Array(t*3),n=new Uint32Array(t);let s=0;for(let r=0;r<this.faceCount;r++){const o=this.faceOffsets[r],a=this.faceOffsets[r+1]-o;for(let c=1;c<a-1;c++)e[s*3]=this.faceCorners[o],e[s*3+1]=this.faceCorners[o+c],e[s*3+2]=this.faceCorners[o+c+1],n[s]=r,s++}return{tri:e,triToFace:n}}faceCenter(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,o=0;for(let a=0;a<n;a++){const c=this.faceCorners[e+a];s+=this.positions[c*3],r+=this.positions[c*3+1],o+=this.positions[c*3+2]}return[s/n,r/n,o/n]}faceNormal(t){const e=this.faceOffsets[t],n=this.faceOffsets[t+1]-e;let s=0,r=0,o=0;for(let c=0;c<n;c++){const l=this.faceCorners[e+c],h=this.faceCorners[e+(c+1)%n],f=this.positions[l*3],u=this.positions[l*3+1],d=this.positions[l*3+2],p=this.positions[h*3],v=this.positions[h*3+1],g=this.positions[h*3+2];s+=(u-v)*(d+g),r+=(d-g)*(f+p),o+=(f-p)*(u+v)}const a=Math.hypot(s,r,o)||1;return[s/a,r/a,o/a]}faceNormals(){const t=new Float32Array(this.faceCount*3);for(let e=0;e<this.faceCount;e++){const n=this.faceNormal(e);t[e*3]=n[0],t[e*3+1]=n[1],t[e*3+2]=n[2]}return t}vertexNormals(){const t=this.faceNormals(),e=new Float32Array(this.vertexCount*3);for(let n=0;n<this.faceCount;n++)for(let s=this.faceOffsets[n];s<this.faceOffsets[n+1];s++){const r=this.faceCorners[s];e[r*3]+=t[n*3],e[r*3+1]+=t[n*3+1],e[r*3+2]+=t[n*3+2]}for(let n=0;n<this.vertexCount;n++){const s=Math.hypot(e[n*3],e[n*3+1],e[n*3+2])||1;e[n*3]/=s,e[n*3+1]/=s,e[n*3+2]/=s}return e}boundsCenter(){if(this.vertexCount===0)return[0,0,0];const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let n=0;n<this.positions.length;n+=3)for(let s=0;s<3;s++){const r=this.positions[n+s];r<t[s]&&(t[s]=r),r>e[s]&&(e[s]=r)}return[(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2]}stats(){let t=0;for(let e=0;e<this.faceCount;e++)t+=Math.max(0,this.faceSize(e)-2);return{vertices:this.vertexCount,edges:this.edges().length,faces:this.faceCount,triangles:t,corners:this.cornerCount}}clone(){const t=new Map;for(const[e,n]of this.uvSets)t.set(e,n.slice());return new Vi(this.positions.slice(),this.faceOffsets.slice(),this.faceCorners.slice(),{uvSets:t,crease:new Map(this.crease),cornerSharp:new Map(this.cornerSharp),polygroup:this.polygroup.slice(),materialId:this.materialId.slice(),vertexColor:this.vertexColor?this.vertexColor.slice():null})}}class ee{pos=[];offsets=[0];corners=[];uv=new Map;groups=[];materials=[];weldMap;crease=new Map;cornerSharp=new Map;constructor(t={}){this.weldMap=t.weld===!1?null:new Map}vertex(t,e,n){if(this.weldMap){const r=l=>{const h=l.toFixed(5);return h==="-0.00000"?"0.00000":h},o=`${r(t)},${r(e)},${r(n)}`,a=this.weldMap.get(o);if(a!==void 0)return a;const c=this.pos.length/3;return this.pos.push(t,e,n),this.weldMap.set(o,c),c}const s=this.pos.length/3;return this.pos.push(t,e,n),s}get vertexCount(){return this.pos.length/3}positionAt(t){return[this.pos[t*3],this.pos[t*3+1],this.pos[t*3+2]]}get faceCount(){return this.offsets.length-1}face(t,e={}){const n=[],s=[];for(let r=0;r<t.length;r++){const o=t[r];n.length&&n[n.length-1]===o||n.includes(o)||(n.push(o),s.push(r))}if(n.length>=2&&n[0]===n[n.length-1]&&(n.pop(),s.pop()),n.length<3)return-1;for(const r of n)this.corners.push(r);if(this.offsets.push(this.corners.length),this.groups.push(e.polygroup??0),this.materials.push(e.materialId??0),e.uv)for(const[r,o]of e.uv){let a=this.uv.get(r);a||(a=new Array((this.corners.length-n.length)*2).fill(0),this.uv.set(r,a));for(const c of s){const l=o[c]??[0,0];a.push(l[0],l[1])}}for(const[r,o]of this.uv){const a=this.corners.length*2;for(;o.length<a;)o.push(0)}return this.faceCount-1}build(){const t=new Map;for(const[e,n]of this.uv){const s=new Float32Array(this.corners.length*2);s.set(n.slice(0,s.length)),t.set(e,s)}return new Vi(new Float32Array(this.pos),new Uint32Array(this.offsets),new Uint32Array(this.corners),{uvSets:t,crease:this.crease,cornerSharp:this.cornerSharp,polygroup:new Uint16Array(this.groups),materialId:new Uint16Array(this.materials)})}}function Le(i,t){if(i.uvSets.size===0)return null;const e=new Map,n=i.faceOffsets[t],s=i.faceOffsets[t+1]-n;for(const[r,o]of i.uvSets){const a=[];for(let c=0;c<s;c++)a.push([o[(n+c)*2],o[(n+c)*2+1]]);e.set(r,a)}return e}function d_(i){return Array.from(i.uvSets.keys())}function p_(i,t,e,n){if(!i)return null;const s=new Map;for(const[r,o]of i){const a=o[t]??[0,0],c=o[e]??[0,0];s.set(r,[a[0]+(c[0]-a[0])*n,a[1]+(c[1]-a[1])*n])}return s}function os(i,t,e,n,s=(a,c)=>[a,c],r=!1,o={}){for(let a=0;a<t;a++)for(let c=0;c<e;c++){const l=r?[[a,c],[a,c+1],[a+1,c+1],[a+1,c]]:[[a,c],[a+1,c],[a+1,c+1],[a,c+1]],h=[],f=[];for(const[u,d]of l){const p=u/t,v=d/e,g=n(o.u?u%t/t:p,o.v?d%e/e:v);h.push(i.vertex(g[0],g[1],g[2])),f.push(s(p,v))}i.face(h,{uv:new Map([["map1",f]])})}}function Dr(i,t,e,n,s,r,o=[.5,.5],a=.5){if(!(s<=0))for(let c=0;c<s;c++)for(let l=0;l<n;l++){const h=[[l,c],[l+1,c],[l+1,c+1],[l,c+1]],f=[],u=[];for(const[d,p]of h){const v=d%n/n*Math.PI*2,g=t*(1-p/s);f.push(i.vertex(g*Math.cos(v),e,g*Math.sin(v)));const m=g/t*a;u.push([o[0]+Math.cos(v)*m,o[1]+Math.sin(v)*m])}r>0&&(f.reverse(),u.reverse()),i.face(f,{uv:new Map([["map1",u]])})}}const ks=1/4,m_=(1-ks*3)/2;function as(i,t){const e=i*ks,n=m_+t*ks;return(s,r)=>[e+s*ks,n+r*ks]}function g_(i,t,e,n,s,r){const[o,a,c]=i,l=[a[0]-o[0],a[1]-o[1],a[2]-o[2]],h=[c[0]-o[0],c[1]-o[1],c[2]-o[2]],f=[l[1]*h[2]-l[2]*h[1],l[2]*h[0]-l[0]*h[2],l[0]*h[1]-l[1]*h[0]],u=Math.hypot(f[0],f[1],f[2])||1,d=[f[0]/u,f[1]/u,f[2]/u],p=Math.abs(d[1])<.9?[0,1,0]:[1,0,0],v=[p[1]*d[2]-p[2]*d[1],p[2]*d[0]-p[0]*d[2],p[0]*d[1]-p[1]*d[0]],g=Math.hypot(v[0],v[1],v[2])||1,m=[v[0]/g,v[1]/g,v[2]/g],x=[d[1]*m[2]-d[2]*m[1],d[2]*m[0]-d[0]*m[2],d[0]*m[1]-d[1]*m[0]],y=i.map(O=>[O[0]*m[0]+O[1]*m[1]+O[2]*m[2],O[0]*x[0]+O[1]*x[1]+O[2]*x[2]]);let _=1/0,S=1/0,w=-1/0,A=-1/0;for(const[O,D]of y)_=Math.min(_,O),w=Math.max(w,O),S=Math.min(S,D),A=Math.max(A,D);const M=Math.max(w-_,A-S,1e-9),E=1/n,P=1/s,C=(Math.min(E,P)-r*2)/M,I=t*E+(E-(w-_)*C)/2,V=e*P+(P-(A-S)*C)/2;return y.map(([O,D])=>[I+(O-_)*C,V+(D-S)*C])}const Sn={cube:{id:"cube",label:"キューブ",en:"Cube",params:[{key:"width",label:"幅",value:1,min:.05,max:6,step:.05},{key:"height",label:"高さ",value:1,min:.05,max:6,step:.05},{key:"depth",label:"奥行き",value:1,min:.05,max:6,step:.05},{key:"sdW",label:"分割数 幅",value:1,min:1,max:12,step:1},{key:"sdH",label:"分割数 高さ",value:1,min:1,max:12,step:1},{key:"sdD",label:"分割数 奥行き",value:1,min:1,max:12,step:1}],build(i){const t=new ee,e=i.width/2,n=i.height/2,s=i.depth/2,r=(o,a,c,l,h,f)=>os(t,l,h,(u,d)=>[o[0]+a[0]*u+c[0]*d,o[1]+a[1]*u+c[1]*d,o[2]+a[2]*u+c[2]*d],f);return r([-e,-n,s],[i.width,0,0],[0,i.height,0],i.sdW,i.sdH,as(0,1)),r([e,-n,-s],[-i.width,0,0],[0,i.height,0],i.sdW,i.sdH,as(2,1)),r([e,-n,s],[0,0,-i.depth],[0,i.height,0],i.sdD,i.sdH,as(1,1)),r([-e,-n,-s],[0,0,i.depth],[0,i.height,0],i.sdD,i.sdH,as(3,1)),r([-e,n,s],[i.width,0,0],[0,0,-i.depth],i.sdW,i.sdD,as(0,2)),r([-e,-n,-s],[i.width,0,0],[0,0,i.depth],i.sdW,i.sdD,as(0,0)),t.build()}},sphere:{id:"sphere",label:"スフィア",en:"Sphere",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sdAxis",label:"分割数 軸",value:20,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:12,min:2,max:64,step:1}],build(i){const t=new ee;return os(t,i.sdAxis,i.sdHeight,(e,n)=>{const s=e*Math.PI*2,r=n*Math.PI;return[i.radius*Math.sin(r)*Math.cos(s),i.radius*Math.cos(r),i.radius*Math.sin(r)*Math.sin(s)]},(e,n)=>[e,1-n],!1,{u:!0}),t.build()}},cylinder:{id:"cylinder",label:"シリンダー",en:"Cylinder",params:[{key:"radius",label:"半径",value:.6,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCaps",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new ee,e=i.height/2;return os(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*Math.cos(r),-e+s*i.height,i.radius*Math.sin(r)]},(n,s)=>[n,s*.5],!0,{u:!0}),Dr(t,i.radius,e,i.sdAxis,i.sdCaps,1,[.75,.75],.25),Dr(t,i.radius,-e,i.sdAxis,i.sdCaps,-1,[.25,.75],.25),t.build()}},cone:{id:"cone",label:"コーン",en:"Cone",params:[{key:"radius",label:"半径",value:.7,min:.05,max:3,step:.05},{key:"height",label:"高さ",value:2,min:.05,max:6,step:.05},{key:"sdAxis",label:"分割数 軸",value:16,min:3,max:64,step:1},{key:"sdHeight",label:"分割数 高さ",value:1,min:1,max:24,step:1},{key:"sdCap",label:"分割数 キャップ",value:1,min:0,max:8,step:1}],build(i){const t=new ee,e=i.height/2;return os(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2;return[i.radius*(1-s)*Math.cos(r),-e+s*i.height,i.radius*(1-s)*Math.sin(r)]},(n,s)=>[n,s*.5],!0,{u:!0}),Dr(t,i.radius,-e,i.sdAxis,i.sdCap,-1,[.5,.75],.25),t.build()}},torus:{id:"torus",label:"トーラス",en:"Torus",params:[{key:"radius",label:"半径",value:1,min:.1,max:4,step:.05},{key:"section",label:"断面半径",value:.32,min:.02,max:2,step:.02},{key:"twist",label:"ツイスト",value:0,min:0,max:360,step:5},{key:"sdAxis",label:"分割数 軸",value:24,min:3,max:80,step:1},{key:"sdHeight",label:"分割数 断面",value:12,min:3,max:48,step:1}],build(i){const t=new ee,e=i.twist*Math.PI/180;return os(t,i.sdAxis,i.sdHeight,(n,s)=>{const r=n*Math.PI*2,o=s*Math.PI*2+e*n,a=i.radius+i.section*Math.cos(o);return[a*Math.cos(r),i.section*Math.sin(o),a*Math.sin(r)]},(n,s)=>[n,s],!0,{u:!0,v:!0}),t.build()}},plane:{id:"plane",label:"プレーン",en:"Plane",params:[{key:"width",label:"幅",value:2,min:.05,max:10,step:.05},{key:"height",label:"奥行き",value:2,min:.05,max:10,step:.05},{key:"sdW",label:"分割数 幅",value:4,min:1,max:40,step:1},{key:"sdH",label:"分割数 奥行き",value:4,min:1,max:40,step:1}],build(i){const t=new ee;return os(t,i.sdW,i.sdH,(e,n)=>[-i.width/2+e*i.width,0,-i.height/2+n*i.height],(e,n)=>[e,n],!0),t.build()}},disk:{id:"disk",label:"ディスク",en:"Disk",params:[{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05},{key:"sides",label:"サイド数",value:16,min:3,max:64,step:1},{key:"sdCaps",label:"分割数",value:1,min:1,max:10,step:1}],build(i){const t=new ee;return Dr(t,i.radius,0,i.sides,i.sdCaps,1,[.5,.5],.5),t.build()}},platonic:{id:"platonic",label:"正多面体",en:"Platonic",params:[{key:"kind",label:"種類",value:4,min:0,max:4,step:1,choices:["正四面体","正六面体","正八面体","正十二面体","正二十面体"]},{key:"radius",label:"半径",value:1,min:.05,max:4,step:.05}],build(i){const t=(1+Math.sqrt(5))/2,e=1/t,n=Math.round(i.kind);let s,r;n===0?(s=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]],r=[[0,1,2],[0,3,1],[0,2,3],[1,3,2]]):n===1?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]],r=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]]):n===2?(s=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],r=[[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]]):n===3?(s=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1],[0,e,t],[0,e,-t],[0,-e,t],[0,-e,-t],[e,t,0],[e,-t,0],[-e,t,0],[-e,-t,0],[t,0,e],[t,0,-e],[-t,0,e],[-t,0,-e]],r=[[0,8,10,2,16],[0,16,17,1,12],[0,12,14,4,8],[8,4,18,6,10],[10,6,15,13,2],[2,13,3,17,16],[17,3,11,9,1],[1,9,5,14,12],[14,5,19,18,4],[18,19,7,15,6],[15,7,11,3,13],[9,11,7,19,5]]):(s=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]],r=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]);const o=new ee({weld:!1});for(const d of s){const p=Math.hypot(d[0],d[1],d[2]);o.vertex(d[0]/p*i.radius,d[1]/p*i.radius,d[2]/p*i.radius)}for(const d of r)o.face(d);const a=o.build(),c=[];for(let d=0;d<a.faceCount;d++){const p=a.faceCenter(d),v=a.faceNormal(d),g=a.faceVerts(d);c.push(p[0]*v[0]+p[1]*v[1]+p[2]*v[2]<0?g.reverse():g)}const l=new ee({weld:!1});for(let d=0;d<a.vertexCount;d++){const p=a.getPosition(d);l.vertex(p[0],p[1],p[2])}const h=Math.ceil(Math.sqrt(c.length)),f=Math.ceil(c.length/h),u=.02;return c.forEach((d,p)=>{const v=d.map(m=>a.getPosition(m)),g=g_(v,p%h,Math.floor(p/h),h,f,u);l.face(d,{uv:new Map([["map1",g]])})}),l.build()}}},ff=["cube","sphere","cylinder","cone","torus","plane","disk","platonic"];function io(i){const t=Sn[i],e={};if(!t)return e;for(const n of t.params)e[n.key]=n.value;return e}function Wc(i,t,e,n){const s=i.edgeFaceMap(),r=[],o=new Set,a=(c,l,h,f,u)=>{for(let d=0;d<1e5;d++){const v=(s.get(bt(c,l))??[]).find(M=>M!==f);if(v===void 0||o.has(v))return;const g=i.faceVerts(v);if(g.length!==4)return;o.add(v);let m=-1,x=c,y=l,_=h;for(let M=0;M<4;M++)if(g[M]===c&&g[(M+1)%4]===l){m=M;break}if(m<0){for(let M=0;M<4;M++)if(g[M]===l&&g[(M+1)%4]===c){m=M,x=l,y=c,_=1-h;break}}if(m<0)return;const S=(m+2)%4,w=(m+3)%4,A={face:v,a:x,b:y,t:_,c:g[S],d:g[w],ia:m,ib:(m+1)%4,ic:S,id:w};u?r.push(A):r.unshift(A),f=v,c=A.d,l=A.c,h=_}};return a(t,e,n,-1,!0),a(e,t,1-n,r.length?r[0].face:-1,!1),r}function so(i,t,e,n,s,r){const o=i.getPosition(t),a=i.getPosition(e);if(!s||!r)return[o[0]+(a[0]-o[0])*n,o[1]+(a[1]-o[1])*n,o[2]+(a[2]-o[2])*n];const c=[r[t*3],r[t*3+1],r[t*3+2]],l=[r[e*3],r[e*3+1],r[e*3+2]],h=[a[0]-o[0],a[1]-o[1],a[2]-o[2]],f=h[0]*c[0]+h[1]*c[1]+h[2]*c[2],u=-(h[0]*l[0]+h[1]*l[1]+h[2]*l[2]),d=[0,0,0],p=1-n;for(let v=0;v<3;v++){const g=(2*o[v]+a[v]-f*c[v])/3,m=(2*a[v]+o[v]-u*l[v])/3;d[v]=p*p*p*o[v]+3*p*p*n*g+3*p*n*n*m+n*n*n*a[v]}return d}function df(i,t,e,n,s){const r=Wc(i,t,e,n);if(!r.length)return null;const o=s?i.vertexNormals():null,a=[so(i,r[0].a,r[0].b,r[0].t,s,o)];for(const c of r)a.push(so(i,c.d,c.c,c.t,s,o));return{points:a,faceCount:r.length}}function pf(i,t,e,n,s=!1){const r=Wc(i,t,e,n);if(!r.length)return null;const o=s?i.vertexNormals():null,a=new Map;for(const u of r)a.set(u.face,u);const c=new ee({weld:!1});for(let u=0;u<i.vertexCount;u++){const d=i.getPosition(u);c.vertex(d[0],d[1],d[2])}const l=new Map,h=(u,d,p)=>{const v=Math.min(u,d),g=Math.max(u,d),m=`${v}_${g}`,x=l.get(m);if(x!==void 0)return x;const y=so(i,u,d,p,s,o),_=c.vertex(y[0],y[1],y[2]);return l.set(m,_),_};for(let u=0;u<i.faceCount;u++){const d=a.get(u),p=Le(i,u),v=i.polygroup[u],g=i.materialId[u];if(!d){c.face(i.faceVerts(u),{uv:p??void 0,polygroup:v,materialId:g});continue}const m=h(d.a,d.b,d.t),x=h(d.d,d.c,d.t),y=_=>{if(!p)return;const S=new Map;for(const[w,A]of p)S.set(w,_.map(M=>{if(typeof M=="number")return A[M]??[0,0];const[E,P]=M,C=A[E]??[0,0],I=A[P]??[0,0];return[C[0]+(I[0]-C[0])*d.t,C[1]+(I[1]-C[1])*d.t]}));return S};c.face([d.a,m,x,d.d],{uv:y([d.ia,[d.ia,d.ib],[d.id,d.ic],d.id]),polygroup:v,materialId:g}),c.face([m,d.b,d.c,x],{uv:y([[d.ia,d.ib],d.ib,d.ic,[d.id,d.ic]]),polygroup:v,materialId:g})}const f=c.build();for(const[u,d]of i.crease){const[p,v]=u.split("_").map(Number);l.has(`${Math.min(p,v)}_${Math.max(p,v)}`)||f.setCrease(p,v,d)}for(const[u,d]of i.cornerSharp)f.cornerSharp.set(u,d);return{mesh:f,faceCount:r.length}}function ac(i,t,e){const n=Array.from(new Set(t));if(!n.length)return null;const s=new Set(n);let r=0,o=0,a=0;for(const v of n){const g=i.faceNormal(v);r+=g[0],o+=g[1],a+=g[2]}const c=Math.hypot(r,o,a)||1;r/=c,o/=c,a/=c;const l=new ee({weld:!1});for(let v=0;v<i.vertexCount;v++){const g=i.getPosition(v);l.vertex(g[0],g[1],g[2])}const h=new Set;for(const v of n)for(const g of i.faceVerts(v))h.add(g);const f=new Map;for(const v of h){const g=i.getPosition(v);f.set(v,l.vertex(g[0]+r*e,g[1]+o*e,g[2]+a*e))}const u=new Map;for(const v of n){const g=i.faceVerts(v);for(let m=0;m<g.length;m++){const x=bt(g[m],g[(m+1)%g.length]);u.set(x,(u.get(x)??0)+1)}}const d=[];for(let v=0;v<i.faceCount;v++){const g=Le(i,v),m=i.polygroup[v],x=i.materialId[v],y=i.faceVerts(v);if(!s.has(v)){l.face(y,{uv:g??void 0,polygroup:m,materialId:x});continue}l.face(y.map(_=>f.get(_)),{uv:g??void 0,polygroup:m,materialId:x});for(let _=0;_<y.length;_++){const S=y[_],w=y[(_+1)%y.length];if(u.get(bt(S,w))!==1)continue;let A;if(g){A=new Map;for(const[M,E]of g){const P=E[_]??[0,0],C=E[(_+1)%y.length]??[0,0];A.set(M,[P,C,C,P])}}d.push({verts:[S,w,f.get(w),f.get(S)],uv:A,group:m,material:x})}}for(const v of d)l.face(v.verts,{uv:v.uv,polygroup:v.group,materialId:v.material});const p=l.build();for(const[v,g]of i.crease){const[m,x]=v.split("_").map(Number);p.setCrease(m,x,g)}return{mesh:p,faceCount:n.length}}function cc(i,t,e){if(!t.length)return null;const n=i.edgeFaceMap(),s=i.faceNormals();let r=0,o=0,a=0;for(const[d,p]of t)for(const v of n.get(bt(d,p))??[])r+=s[v*3],o+=s[v*3+1],a+=s[v*3+2];const c=Math.hypot(r,o,a);c<1e-6?(r=0,o=1,a=0):(r/=c,o/=c,a/=c);const l=new ee({weld:!1});for(let d=0;d<i.vertexCount;d++){const p=i.getPosition(d);l.vertex(p[0],p[1],p[2])}const h=new Set;for(const[d,p]of t)h.add(d),h.add(p);const f=new Map;for(const d of h){const p=i.getPosition(d);f.set(d,l.vertex(p[0]+r*e,p[1]+o*e,p[2]+a*e))}for(let d=0;d<i.faceCount;d++)l.face(i.faceVerts(d),{uv:Le(i,d)??void 0,polygroup:i.polygroup[d],materialId:i.materialId[d]});for(const[d,p]of t){const v=n.get(bt(d,p))??[];let g=!0;if(v.length){const m=i.faceVerts(v[0]);for(let x=0;x<m.length;x++)if(m[x]===d&&m[(x+1)%m.length]===p){g=!1;break}}g?l.face([d,p,f.get(p),f.get(d)]):l.face([p,d,f.get(d),f.get(p)])}const u=l.build();for(const[d,p]of i.crease){const[v,g]=d.split("_").map(Number);u.setCrease(v,g,p)}return{mesh:u,newEdges:t.map(([d,p])=>[f.get(d),f.get(p)]),faceCount:t.length}}function $s(i,t){const e=new Map,n=new Map;t.forEach((a,c)=>{let l=0,h=0,f=0;for(const d of a){const p=i.getPosition(d);l+=p[0],h+=p[1],f+=p[2]}const u=`g${c}`;n.set(u,[l/a.length,h/a.length,f/a.length]);for(const d of a)e.set(d,u)});const s=new ee({weld:!1}),r=new Map,o=a=>{const c=e.get(a)??`v${a}`,l=r.get(c);if(l!==void 0)return l;const h=e.has(a)?n.get(e.get(a)):i.getPosition(a),f=s.vertex(h[0],h[1],h[2]);return r.set(c,f),f};for(let a=0;a<i.faceCount;a++)s.face(i.faceVerts(a).map(o),{uv:Le(i,a)??void 0,polygroup:i.polygroup[a],materialId:i.materialId[a]});return s.build()}function mf(i,t,e,n){let s=-1,r=-1,o=-1;for(let f=0;f<i.length;f++){const u=i[f],d=i[(f+1)%i.length];if(u===e&&d===n||u===n&&d===e){s=f,r=u,o=d;break}}if(s<0)return null;const a=[];for(let f=0;f<i.length;f++)a.push(i[(s+1+f)%i.length]);let c=t,l=-1;for(let f=0;f<t.length;f++)if(t[f]===o&&t[(f+1)%t.length]===r){l=f;break}if(l<0){const f=[...t].reverse();for(let u=0;u<f.length;u++)if(f[u]===o&&f[(u+1)%f.length]===r){l=u,c=f;break}if(l<0)return null}const h=[];for(let f=0;f<c.length;f++)h.push(c[(l+1+f)%c.length]);return[...a,...h.slice(1,h.length-1)]}function gf(i,t){let e=[];for(let a=0;a<i.faceCount;a++)e.push(i.faceVerts(a));const n=Array.from(i.polygroup),s=Array.from(i.materialId);let r=0;for(const[a,c]of t){const l=new Map;e.forEach((u,d)=>{for(let p=0;p<u.length;p++){const v=bt(u[p],u[(p+1)%u.length]),g=l.get(v);g?g.push(d):l.set(v,[d])}});const h=l.get(bt(a,c))??[];if(h.length!==2)continue;const f=mf(e[h[0]],e[h[1]],a,c);!f||f.length<3||(e[h[0]]=f,e.splice(h[1],1),n.splice(h[1],1),s.splice(h[1],1),r++)}if(!r)return null;const o=new ee({weld:!1});for(let a=0;a<i.vertexCount;a++){const c=i.getPosition(a);o.vertex(c[0],c[1],c[2])}return e.forEach((a,c)=>{o.face(a,{polygroup:n[c]??0,materialId:s[c]??0})}),{mesh:o.build(),merged:r}}function vf(i,t){const e=new Set(t);if(!e.size)return null;const n=new ee({weld:!1});for(let o=0;o<i.vertexCount;o++){const a=i.getPosition(o);n.vertex(a[0],a[1],a[2])}let s=0;for(let o=0;o<i.faceCount;o++){if(e.has(o)){s++;continue}n.face(i.faceVerts(o),{uv:Le(i,o)??void 0,polygroup:i.polygroup[o],materialId:i.materialId[o]})}if(!s)return null;const r=n.build();for(const[o,a]of i.crease){const[c,l]=o.split("_").map(Number);r.setCrease(c,l,a)}return{mesh:r,removed:s}}function xf(i,t){const e=[];for(const n of t)n<i.faceCount&&e.push(i.faceVerts(n));return e.length?$s(i,e):null}function Ln(i){const t=new Set;for(let r=0;r<i.faceCorners.length;r++)t.add(i.faceCorners[r]);if(t.size===i.vertexCount)return i;const e=new ee({weld:!1}),n=new Map;for(let r=0;r<i.vertexCount;r++){if(!t.has(r))continue;const o=i.getPosition(r);n.set(r,e.vertex(o[0],o[1],o[2]))}for(let r=0;r<i.faceCount;r++)e.face(i.faceVerts(r).map(o=>n.get(o)),{uv:Le(i,r)??void 0,polygroup:i.polygroup[r],materialId:i.materialId[r]});const s=e.build();for(const[r,o]of i.crease){const[a,c]=r.split("_").map(Number),l=n.get(a),h=n.get(c);l!==void 0&&h!==void 0&&s.setCrease(l,h,o)}return s}function us(i,t){return[i[0]-t[0],i[1]-t[1],i[2]-t[2]]}function Ph(i){const t=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/t,i[1]/t,i[2]/t]}function v_(i,t){return[i[1]*t[2]-i[2]*t[1],i[2]*t[0]-i[0]*t[2],i[0]*t[1]-i[1]*t[0]]}function x_(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function _f(i,t,e,n=1){const s=Math.max(1,Math.round(n));if(!(e>0))return null;const r=new Set;for(const[x,y]of t)x!==y&&r.add(bt(x,y));if(!r.size)return null;const o=i.edgeFaceMap(),a=new Set;for(const x of r){const y=o.get(x);if(!y||y.length!==2)return null;for(const w of y)if(i.faceSize(w)!==4)return null;const[_,S]=x.split("_").map(Number);a.add(_),a.add(S)}const c=new ee({weld:!0}),l=[];for(let x=0;x<i.vertexCount;x++){const y=i.getPosition(x);l.push(c.vertex(y[0],y[1],y[2]))}const h=new Map,f=(x,y,_)=>`${x}|${y}|${_}`,u=new Map,d=x=>i.getPosition(x);for(let x=0;x<i.faceCount;x++){const y=i.faceVerts(x),_=[];for(let S=0;S<y.length;S++){const w=y[S],A=y[(S-1+y.length)%y.length],M=y[(S+1)%y.length],E=(S-1+y.length)%y.length,P=(S+1)%y.length;if(!a.has(w)){const tt={index:l[w],uv:{base:S,toward:[]}};_.push(tt);continue}const C=d(w),I=Ph(us(d(A),C)),V=Ph(us(d(M),C)),O=Math.hypot(...us(d(A),C))||1,D=Math.hypot(...us(d(M),C))||1,z=Math.min(e,O*.49),N=Math.min(e,D*.49),q=r.has(bt(A,w)),j=r.has(bt(w,M)),it=(tt,ot)=>({index:c.vertex(C[0]+tt[0],C[1]+tt[1],C[2]+tt[2]),uv:ot});if(q&&j){const tt=it([I[0]*z+V[0]*N,I[1]*z+V[1]*N,I[2]*z+V[2]*N],{base:S,toward:[{corner:E,t:z/O},{corner:P,t:N/D}]});_.push({index:tt.index,uv:tt.uv}),h.set(f(x,w,A),tt),h.set(f(x,w,M),tt)}else if(q){const tt=it([V[0]*N,V[1]*N,V[2]*N],{base:S,toward:[{corner:P,t:N/D}]});_.push({index:tt.index,uv:tt.uv}),h.set(f(x,w,A),tt),h.set(f(x,w,M),tt)}else if(j){const tt=it([I[0]*z,I[1]*z,I[2]*z],{base:S,toward:[{corner:E,t:z/O}]});_.push({index:tt.index,uv:tt.uv}),h.set(f(x,w,A),tt),h.set(f(x,w,M),tt)}else{const tt=it([I[0]*z,I[1]*z,I[2]*z],{base:S,toward:[{corner:E,t:z/O}]}),ot=it([V[0]*N,V[1]*N,V[2]*N],{base:S,toward:[{corner:P,t:N/D}]});_.push({index:tt.index,uv:tt.uv},{index:ot.index,uv:ot.uv}),h.set(f(x,w,A),tt),h.set(f(x,w,M),ot)}}u.set(x,_)}for(let x=0;x<i.faceCount;x++){const y=u.get(x),_=Le(i,x);c.face(y.map(S=>S.index),{uv:_?__(_,y.map(S=>S.uv)):void 0,polygroup:i.polygroup[x],materialId:i.materialId[x]})}let p=0;const v=new Map,g=(x,y)=>`${x}|${y}`;for(const x of r){const[y,_]=x.split("_").map(Number),[S,w]=o.get(x);for(const O of[y,_]){const D=O===y?_:y,z=h.get(f(S,O,D)),N=h.get(f(w,O,D));if(!z||!N)return null;const q=[],j=d(O),it=Hs(c,z.index),tt=Hs(c,N.index);for(let ot=0;ot<=s;ot++){const At=ot/s;if(ot===0)q.push(z.index);else if(ot===s)q.push(N.index);else{const Ft=1-At,Ct=Ft*Ft*it[0]+2*At*Ft*j[0]+At*At*tt[0],K=Ft*Ft*it[1]+2*At*Ft*j[1]+At*At*tt[1],rt=Ft*Ft*it[2]+2*At*Ft*j[2]+At*At*tt[2];q.push(c.vertex(Ct,K,rt))}}v.set(g(x,O),q)}const A=v.get(g(x,y)),M=v.get(g(x,_)),E=i.polygroup[S]??0,P=i.materialId[S]??0,C=i.faceVerts(S),I=C.indexOf(y),V=I>=0&&C[(I+1)%C.length]===_;for(let O=0;O<s;O++){const D=V?[M[O],A[O],A[O+1],M[O+1]]:[A[O],M[O],M[O+1],A[O+1]];c.face(D,{polygroup:E,materialId:P})>=0&&p++}}for(const x of a){const y=M_(i,x,o,r,h,v,f,g);if(y===null)return null;if(y.length<3)continue;const _=y_(c,y,i,x);c.face(_)>=0&&p++}const m=c.build();for(const[x,y]of i.crease){if(r.has(x))continue;const[_,S]=x.split("_").map(Number),w=l[_],A=l[S];w!==void 0&&A!==void 0&&!a.has(_)&&!a.has(S)&&m.setCrease(w,A,y)}return{mesh:m,newFaces:p}}function Hs(i,t){const e=i.positionAt(t);return[e[0],e[1],e[2]]}function __(i,t){const e=new Map;for(const[n,s]of i){const r=[];for(const o of t){const a=s[o.base]??[0,0];let c=a[0],l=a[1];for(const h of o.toward){const f=s[h.corner]??a;c+=(f[0]-a[0])*h.t,l+=(f[1]-a[1])*h.t}r.push([c,l])}e.set(n,r)}return e}function M_(i,t,e,n,s,r,o,a){const c=new Map;for(const p of i.vertexFaces().get(t)??[]){const v=i.faceVerts(p),g=v.indexOf(t);if(g<0)return null;c.set(p,[v[(g-1+v.length)%v.length],v[(g+1)%v.length]])}if(!c.size)return null;const l=[...c.keys()][0],h=[];let f=l,u=c.get(l)[0];for(let p=0;p<=c.size;p++){const v=c.get(f);if(!v)return null;const g=v[0]===u?v[1]:v[0];h.push({face:f,from:u,to:g});const m=(e.get(bt(t,g))??[]).find(x=>x!==f);if(m===void 0)return null;if(m===l&&g===c.get(l)[0])break;if(f=m,u=g,h.length>c.size)return null}if(h.length!==c.size)return null;const d=[];for(const p of h){const v=s.get(o(p.face,t,p.from)),g=s.get(o(p.face,t,p.to));if(!v||!g)return null;ta(d,v.index),g.index!==v.index&&ta(d,g.index);const m=bt(t,p.to);if(n.has(m)){const x=r.get(a(m,t));if(!x)return null;const _=e.get(m)[0]===p.face?x:[...x].reverse();for(const S of _)ta(d,S)}}return d.length>1&&d[0]===d[d.length-1]&&d.pop(),d}function ta(i,t){i.length&&i[i.length-1]===t||i.push(t)}function y_(i,t,e,n){const s=e.vertexNormals(),r=[s[n*3],s[n*3+1],s[n*3+2]],o=Hs(i,t[0]);let a=0,c=0,l=0;for(let h=1;h+1<t.length;h++){const f=v_(us(Hs(i,t[h]),o),us(Hs(i,t[h+1]),o));a+=f[0],c+=f[1],l+=f[2]}return x_([a,c,l],r)<0?[...t].reverse():t}function ea(i){return i.closed?i.verts.length:i.verts.length-1}function na(i,t){return[i.verts[t],i.verts[(t+1)%i.verts.length]]}function Mf(i){const t=new Map,e=(a,c)=>{const l=t.get(a);l?l.push(c):t.set(a,[c])},n=new Set;for(const[a,c]of i){if(a===c)continue;const l=bt(a,c);n.has(l)||(n.add(l),e(a,c),e(c,a))}for(const a of t.values())if(a.length>2)return null;const s=new Set,r=a=>{const c=[a];s.add(a);let l=-1,h=a;for(;;){const f=(t.get(h)??[]).find(u=>u!==l&&!s.has(u));if(f===void 0)return c;c.push(f),s.add(f),l=h,h=f}},o=[];for(const[a,c]of t)c.length===1&&!s.has(a)&&o.push({verts:r(a),closed:!1});for(const a of t.keys()){if(s.has(a))continue;const c=r(a),l=c[c.length-1],h=c.length>2&&(t.get(l)??[]).includes(c[0]);o.push({verts:c,closed:h})}return o}function Bs(i,t,e){const n=i.getPosition(t),s=i.getPosition(e);return Math.hypot(n[0]-s[0],n[1]-s[1],n[2]-s[2])}function b_(i,t,e){let n=0;for(let s=0;s<t.length;s++)n+=Bs(i,t[s],e[s]);return n}function S_(i,t,e){const n=e.verts;if(!e.closed){const o=Bs(i,t.verts[0],n[0])+Bs(i,t.verts[t.verts.length-1],n[n.length-1]);return Bs(i,t.verts[0],n[n.length-1])+Bs(i,t.verts[t.verts.length-1],n[0])<o?[...n].reverse():[...n]}let s=n,r=1/0;for(const o of[n,[...n].reverse()])for(let a=0;a<o.length;a++){const c=o.map((h,f)=>o[(a+f)%o.length]),l=b_(i,t.verts,c);l<r&&(r=l,s=c)}return s}function yf(i,t){const e=Mf(t);if(!e||e.length!==2)return null;const[n,s]=e;if(n.closed!==s.closed)return null;const r=ea(n);if(r<1||r!==ea(s))return null;const o=i.edgeFaceMap(),a=(d,p)=>{const v=o.get(bt(d,p))??[];return v.length===1?v[0]:-1};for(const d of[n,s])for(let p=0;p<ea(d);p++){const[v,g]=na(d,p);if(a(v,g)<0)return null}const l={verts:S_(i,n,s),closed:s.closed},h=new ee({weld:!1});for(let d=0;d<i.vertexCount;d++){const p=i.getPosition(d);h.vertex(p[0],p[1],p[2])}for(let d=0;d<i.faceCount;d++)h.face(i.faceVerts(d),{uv:Le(i,d)??void 0,polygroup:i.polygroup[d],materialId:i.materialId[d]});let f=0;for(let d=0;d<r;d++){const[p,v]=na(n,d),[g,m]=na(l,d),x=a(p,v);if(x<0)continue;const y=i.faceVerts(x),_=y.indexOf(p),w=_>=0&&y[(_+1)%y.length]===v?[v,p,g,m]:[p,v,m,g];h.face(w,{polygroup:i.polygroup[x],materialId:i.materialId[x]})>=0&&f++}if(!f)return null;const u=h.build();for(const[d,p]of i.crease){const[v,g]=d.split("_").map(Number);u.setCrease(v,g,p)}return{mesh:u,faces:f}}function bf(i,t,e){if(!e.length)return null;const n=new Map,s=new Map,r=[];for(const l of e){const h=i.faceVerts(l),f=h.indexOf(t);if(f<0||h.length<3)return null;const u={face:l,prev:h[(f-1+h.length)%h.length],next:h[(f+1)%h.length]};if(n.has(u.next)||s.has(u.prev))return null;n.set(u.next,u),s.set(u.prev,u),r.push(u)}const o=r.find(l=>!s.has(l.next))??r[0],a=[o];let c=o;for(let l=1;l<r.length;l++){const h=n.get(c.prev);if(!h||h===o)return null;a.push(h),c=h}return{cycle:a,closed:n.get(c.prev)===o}}function w_(i,t,e){const n=i.faceVerts(t),s=n.indexOf(e),r=[];for(let o=1;o<n.length;o++)r.push(n[(s+o)%n.length]);return r}function Sf(i){const t=new ee({weld:!1});for(let e=0;e<i.vertexCount;e++){const n=i.getPosition(e);t.vertex(n[0],n[1],n[2])}return t}function wf(i,t){for(const[e,n]of i.crease){const[s,r]=e.split("_").map(Number);s<t.vertexCount&&r<t.vertexCount&&t.setCrease(s,r,n)}}function Xc(i,t,e){if(!(t>0))return null;const n=e?[...new Set(e)]:Array.from({length:i.vertexCount},(d,p)=>p);if(n.length<2)return null;const s=t,r=new Map,o=(d,p,v)=>`${Math.floor(d/s)},${Math.floor(p/s)},${Math.floor(v/s)}`;for(const d of n){const p=i.getPosition(d),v=o(p[0],p[1],p[2]),g=r.get(v);g?g.push(d):r.set(v,[d])}const a=new Map,c=d=>{let p=d;for(;a.get(p)!==p;)p=a.get(p)??p;let v=d;for(;a.get(v)!==p;){const g=a.get(v)??p;a.set(v,p),v=g}return p};for(const d of n)a.set(d,d);const l=t*t;for(const d of n){const p=i.getPosition(d),v=Math.floor(p[0]/s),g=Math.floor(p[1]/s),m=Math.floor(p[2]/s);for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let _=-1;_<=1;_++)for(const S of r.get(`${v+x},${g+y},${m+_}`)??[]){if(S<=d)continue;const w=i.getPosition(S);if((p[0]-w[0])**2+(p[1]-w[1])**2+(p[2]-w[2])**2>l)continue;const M=c(d),E=c(S);M!==E&&a.set(E,M)}}const h=new Map;for(const d of n){const p=c(d),v=h.get(p);v?v.push(d):h.set(p,[d])}const f=[...h.values()].filter(d=>d.length>1);if(!f.length)return null;let u=0;for(const d of f)u+=d.length-1;return{mesh:$s(i,f),merged:u}}function Ef(i,t){let e=i,n=0;for(const s of new Set(t)){const o=e.vertexFaces().get(s)??[],a=bf(e,s,o);if(!a)continue;const c=[];for(const u of a.cycle)for(const d of w_(e,u.face,s))c[c.length-1]!==d&&c.push(d);if(c.length>1&&c[0]===c[c.length-1]&&c.pop(),c.length<3)continue;const l=new Set(o),h=Sf(e);for(let u=0;u<e.faceCount;u++)l.has(u)||h.face(e.faceVerts(u),{uv:Le(e,u)??void 0,polygroup:e.polygroup[u],materialId:e.materialId[u]});h.face(c,{polygroup:e.polygroup[a.cycle[0].face],materialId:e.materialId[a.cycle[0].face]});const f=h.build();wf(e,f),e=f,n++}return n?{mesh:e,removed:n}:null}function lc(i,t,e,n=.25){const s=[...new Set(t)];if(!s.length)return null;const r=Math.max(.01,Math.min(.9,n)),o=i.vertexFaces(),a=i.vertexNormals(),c=[],l=new Set;for(const m of s){const x=bf(i,m,o.get(m)??[]);if(!(!x||!x.closed)&&!x.cycle.some(y=>l.has(y.face))){for(const y of x.cycle)l.add(y.face);c.push({v:m,cycle:x.cycle})}}if(!c.length)return null;const h=Sf(i),f=new Map,u=new Map;for(const{v:m,cycle:x}of c){const y=i.getPosition(m);for(const _ of x){const S=bt(m,_.next);if(f.has(S))continue;const w=i.getPosition(_.next);f.set(S,h.vertex(y[0]+(w[0]-y[0])*r,y[1]+(w[1]-y[1])*r,y[2]+(w[2]-y[2])*r))}u.set(m,h.vertex(y[0]+a[m*3]*e,y[1]+a[m*3+1]*e,y[2]+a[m*3+2]*e))}const d=(m,x)=>[m[0]+(x[0]-m[0])*r,m[1]+(x[1]-m[1])*r],p=new Map;for(const{v:m,cycle:x}of c)for(const y of x)p.set(y.face,{v:m,entry:y});let v=0;for(let m=0;m<i.faceCount;m++){const x=p.get(m);if(!x){h.face(i.faceVerts(m),{uv:Le(i,m)??void 0,polygroup:i.polygroup[m],materialId:i.materialId[m]});continue}const{v:y,entry:_}=x,S=i.faceVerts(m),w=S.indexOf(y),A=f.get(bt(y,_.prev)),M=f.get(bt(y,_.next)),E=[],P=Le(i,m),C=new Map;if(P)for(const[I]of P)C.set(I,[]);for(let I=0;I<S.length;I++){const V=(w+I)%S.length;if(V===w){if(E.push(A,M),P)for(const[O,D]of P){const z=D[V]??[0,0],N=D[(V-1+S.length)%S.length]??z,q=D[(V+1)%S.length]??z;C.get(O).push(d(z,N),d(z,q))}continue}if(E.push(S[V]),P)for(const[O,D]of P)C.get(O).push(D[V]??[0,0])}h.face(E,{uv:P?C:void 0,polygroup:i.polygroup[m],materialId:i.materialId[m]})>=0&&v++}for(const{v:m,cycle:x}of c){const y=u.get(m);for(const _ of x){const S=f.get(bt(m,_.prev)),w=f.get(bt(m,_.next));h.face([w,S,y],{polygroup:i.polygroup[_.face],materialId:i.materialId[_.face]})>=0&&v++}}const g=h.build();return wf(i,g),{mesh:g,faces:v,tips:c.map(({v:m})=>u.get(m))}}function hc(i,t){const{verts:e,uv:n}=i,s=e.length,r=[];for(let o=0;o<s;o++)t.has(e[o])&&r.push(o);if(r.length<2||s<4)return[i];for(let o=0;o<r.length;o++)for(let a=o+1;a<r.length;a++){const c=r[o],l=r[a],h=l-c,f=s-h;if(h<2||f<2)continue;const u=m=>[m.slice(c,l+1),[...m.slice(l),...m.slice(0,c+1)]],[d,p]=u(e);let v=null,g=null;if(n){v=new Map,g=new Map;for(const[m,x]of n){const[y,_]=u(x);v.set(m,y),g.set(m,_)}}return[...hc({verts:d,uv:v},t),...hc({verts:p,uv:g},t)]}return[i]}function E_(i,t,e){const n=new ee({weld:!1});for(let o=0;o<i.vertexCount;o++){const a=i.getPosition(o);n.vertex(a[0],a[1],a[2])}let s=0;for(let o=0;o<i.faceCount;o++){const a=hc({verts:i.faceVerts(o),uv:Le(i,o)},t);s+=a.length-1;for(const c of a)n.face(c.verts,{uv:c.uv??void 0,polygroup:i.polygroup[o],materialId:i.materialId[o]})}if(!s)return null;const r=n.build();for(const[o,a]of i.crease){const[c,l]=o.split("_").map(Number);c<r.vertexCount&&l<r.vertexCount&&r.setCrease(c,l,a)}return{mesh:r,edges:s}}function $c(i,t){const e=new Set(t);return e.size<2?null:E_(i,e)}function Tf(i,t){const e=new Set(t.map(([c,l])=>bt(c,l)));if(e.size<2)return null;const n=new Map,s=[];let r=i.vertexCount;for(const c of e){const[l,h]=c.split("_").map(Number);if(l>=i.vertexCount||h>=i.vertexCount)continue;const f=i.getPosition(l),u=i.getPosition(h);s.push((f[0]+u[0])/2,(f[1]+u[1])/2,(f[2]+u[2])/2),n.set(c,r++)}if(n.size<2)return null;const o=new ee({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);o.vertex(l[0],l[1],l[2])}for(let c=0;c<s.length;c+=3)o.vertex(s[c],s[c+1],s[c+2]);for(let c=0;c<i.faceCount;c++){const l=i.faceVerts(c),h=Le(i,c),f=[],u=new Map;if(h)for(const[d]of h)u.set(d,[]);for(let d=0;d<l.length;d++){const p=l[d],v=l[(d+1)%l.length];if(f.push(p),h)for(const[m,x]of h)u.get(m).push(x[d]??[0,0]);const g=n.get(bt(p,v));if(g!==void 0&&(f.push(g),h))for(const[m,x]of h){const y=x[d]??[0,0],_=x[(d+1)%l.length]??y;u.get(m).push([(y[0]+_[0])/2,(y[1]+_[1])/2])}}o.face(f,{uv:h?u:void 0,polygroup:i.polygroup[c],materialId:i.materialId[c]})}const a=o.build();for(const[c,l]of i.crease){const[h,f]=c.split("_").map(Number);h<a.vertexCount&&f<a.vertexCount&&a.setCrease(h,f,l)}return $c(a,n.values())}function Af(i,t){const e=new Set(t),n=i.vertexNeighbors(),s=new Map;for(const r of[...e].sort((o,a)=>o-a)){const o=(n.get(r)??[]).filter(a=>!e.has(a)).sort((a,c)=>a-c);s.set(r,o)}return s}function Cf(i,t,e,n){const s=Math.max(-.99,Math.min(.99,n));for(const[r,o]of e){if(o<0)continue;const a=t[r*3],c=t[r*3+1],l=t[r*3+2];i.setPosition(r,a+(t[o*3]-a)*s,c+(t[o*3+1]-c)*s,l+(t[o*3+2]-l)*s)}}function Rf(i,t,e,n){let s=t*i.scale[0],r=e*i.scale[1],o=n*i.scale[2];const[a,c,l,h]=i.rotation,f=2*(c*o-l*r),u=2*(l*s-a*o),d=2*(a*r-c*s);return s+=h*f+(c*d-l*u),r+=h*u+(l*f-a*d),o+=h*d+(a*u-c*f),[s+i.position[0],r+i.position[1],o+i.position[2]]}function qs(i,t,e,n){i.face(t.faceVerts(e).map(n),{uv:Le(t,e)??void 0,polygroup:t.polygroup[e],materialId:t.materialId[e]})}function Pf(i,t){const e=[...new Set(t)].filter(c=>c>=0&&c<i.faceCount);if(!e.length)return null;const n=new ee({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);n.vertex(l[0],l[1],l[2])}for(let c=0;c<i.faceCount;c++)qs(n,i,c,l=>l);const s=new Map,r=[],o=[];for(const c of e)for(const l of i.faceVerts(c)){if(s.has(l))continue;const h=i.getPosition(l),f=n.vertex(h[0],h[1],h[2]);s.set(l,f),r.push(f)}for(const c of e){const l=i.faceCount+o.length;qs(n,i,c,h=>s.get(h)),o.push(l)}const a=n.build();for(const[c,l]of i.crease){const[h,f]=c.split("_").map(Number);a.setCrease(h,f,l)}return{mesh:a,faces:o,verts:r}}function If(i,t){const e=new Set([...t].filter(s=>s>=0&&s<i.faceCount));if(!e.size||e.size===i.faceCount)return null;const n=s=>{const r=new ee({weld:!1});for(let a=0;a<i.vertexCount;a++){const c=i.getPosition(a);r.vertex(c[0],c[1],c[2])}for(let a=0;a<i.faceCount;a++)s(a)&&qs(r,i,a,c=>c);const o=r.build();for(const[a,c]of i.crease){const[l,h]=a.split("_").map(Number);o.setCrease(l,h,c)}return Ln(o)};return{mesh:n(s=>!e.has(s)),extracted:n(s=>e.has(s)),count:e.size}}function Lf(i){if(i.length<2)return null;const t=new Set;for(const n of i)for(const s of n.mesh.uvSets.keys())t.add(s);const e=new ee({weld:!1});for(const{mesh:n,transform:s}of i){const r=e.vertexCount;for(let o=0;o<n.vertexCount;o++){const a=n.getPosition(o),c=s?Rf(s,a[0],a[1],a[2]):a;e.vertex(c[0],c[1],c[2])}for(let o=0;o<n.faceCount;o++){const a=n.faceVerts(o),c=Le(n,o);let l;if(t.size){l=new Map;for(const h of t)l.set(h,c?.get(h)??a.map(()=>[0,0]))}e.face(a.map(h=>r+h),{uv:l,polygroup:n.polygroup[o],materialId:n.materialId[o]})}}return e.build()}function Df(i){if(!i.faceCount)return null;const t=new Int32Array(i.faceCount);for(let o=0;o<i.faceCount;o++)t[o]=o;const e=o=>{let a=o;for(;t[a]!==a;)a=t[a];let c=o;for(;t[c]!==a;){const l=t[c];t[c]=a,c=l}return a},n=new Int32Array(i.vertexCount).fill(-1);for(let o=0;o<i.faceCount;o++)for(const a of i.faceVerts(o))if(n[a]<0)n[a]=o;else{const c=e(n[a]),l=e(o);c!==l&&(t[l]=c)}const s=new Map;for(let o=0;o<i.faceCount;o++){const a=e(o),c=s.get(a);c?c.push(o):s.set(a,[o])}if(s.size<2)return null;const r=[];for(const o of s.values()){const a=new ee({weld:!1});for(let l=0;l<i.vertexCount;l++){const h=i.getPosition(l);a.vertex(h[0],h[1],h[2])}for(const l of o)qs(a,i,l,h=>h);const c=a.build();for(const[l,h]of i.crease){const[f,u]=l.split("_").map(Number);c.setCrease(f,u,h)}r.push(Ln(c))}return r}function Uf(i,t,e=.001){if(!i.vertexCount)return null;const n=new ee({weld:!1});for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c);n.vertex(l[0],l[1],l[2])}const s=i.vertexCount;for(let c=0;c<i.vertexCount;c++){const l=i.getPosition(c),h=[l[0],l[1],l[2]];h[t]=-h[t],n.vertex(h[0],h[1],h[2])}for(let c=0;c<i.faceCount;c++)qs(n,i,c,l=>l);for(let c=0;c<i.faceCount;c++){const l=i.faceVerts(c).map(u=>s+u),h=Le(i,c);let f;if(h){f=new Map;for(const[u,d]of h)f.set(u,[...d].reverse())}n.face(l.reverse(),{uv:f,polygroup:i.polygroup[c],materialId:i.materialId[c]})}const r=n.build();for(const[c,l]of i.crease){const[h,f]=c.split("_").map(Number);r.setCrease(h,f,l),r.setCrease(s+h,s+f,l)}const o=[];for(let c=0;c<r.vertexCount;c++)Math.abs(r.getPosition(c)[t])<=e&&o.push(c);const a=o.length>=2?Xc(r,Math.max(e,1e-6),o):null;return a?{mesh:Ln(a.mesh),welded:a.merged}:{mesh:r,welded:0}}function Un(i,t){return`${i}:${t}`}function Ys(i){const t=i.indexOf(":");return[Number(i.slice(0,t)),Number(i.slice(t+1))]}function T_(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619)>>>0;return t.toString(16).padStart(8,"0")}function Nf(i,t){const e=[...i].sort((s,r)=>s-r).join(","),n=[...t].sort().join(",");return T_(`${e}|${n}`)}function A_(i,t,e){const n=i.faceOffsets[t],s=i.faceOffsets[t+1];for(let r=n;r<s;r++)if(i.faceCorners[r]===e)return r-n;return-1}function bs(i,t){const e=i.edgeFaceMap(),n=new Int32Array(i.faceCount);for(let a=0;a<i.faceCount;a++)n[a]=a;const s=a=>{let c=a;for(;n[c]!==c;)c=n[c];let l=a;for(;n[l]!==c;){const h=n[l];n[l]=c,l=h}return c};for(const[a,c]of e){if(c.length!==2||t.has(a))continue;const l=s(c[0]),h=s(c[1]);l!==h&&(n[Math.max(l,h)]=Math.min(l,h))}const r=new Map;for(let a=0;a<i.faceCount;a++){const c=s(a),l=r.get(c);l?l.push(a):r.set(c,[a])}const o=[];for(const a of[...r.keys()].sort((c,l)=>c-l)){const c=r.get(a),l=[],h=new Set(c),f=new Set;for(const d of c){const p=i.faceSize(d);for(let g=0;g<p;g++)l.push(Un(d,g));const v=i.faceVerts(d);for(let g=0;g<p;g++){const m=bt(v[g],v[(g+1)%p]),x=e.get(m)??[];(t.has(m)||x.length!==2||!x.every(y=>h.has(y)))&&f.add(m)}}const u=[...f].sort();o.push({faces:c,corners:l,boundarySeams:u,fingerprint:Nf(c,u)})}return o}function po(i,t,e){const n=i.edgeFaceMap(),s=new Set(t.faces),r=new Map;t.corners.forEach((g,m)=>r.set(g,m));const o=new Int32Array(t.corners.length);for(let g=0;g<o.length;g++)o[g]=g;const a=g=>{let m=g;for(;o[m]!==m;)m=o[m];let x=g;for(;o[x]!==m;){const y=o[x];o[x]=m,x=y}return m},c=(g,m)=>{const x=a(g),y=a(m);x!==y&&(o[Math.max(x,y)]=Math.min(x,y))};for(const g of t.faces){const m=i.faceVerts(g);for(let x=0;x<m.length;x++){const y=m[x],_=m[(x+1)%m.length],S=bt(y,_);if(e.has(S))continue;const w=n.get(S)??[];if(w.length!==2)continue;const A=w[0]===g?w[1]:w[0];if(!(A===g||!s.has(A)))for(const[M,E]of[[y,x],[_,(x+1)%m.length]]){const P=A_(i,A,M);if(P<0)continue;const C=r.get(Un(g,E)),I=r.get(Un(A,P));C!==void 0&&I!==void 0&&c(C,I)}}}const l=new Map,h=new Map,f=[];for(let g=0;g<t.corners.length;g++){const m=a(g);let x=l.get(m);if(x===void 0){x=l.size,l.set(m,x);const[y,_]=Ys(t.corners[g]);f.push(i.faceVerts(y)[_])}h.set(t.corners[g],x)}const u=l.size,d=new Float64Array(u*3),p=new Int32Array(u);for(let g=0;g<u;g++){const m=f[g];p[g]=m,d[g*3]=i.positions[m*3],d[g*3+1]=i.positions[m*3+1],d[g*3+2]=i.positions[m*3+2]}const v=[];for(const g of t.faces){const m=i.faceSize(g),x=[];for(let y=0;y<m;y++)x.push(h.get(Un(g,y)));for(let y=1;y<m-1;y++)v.push(x[0],x[y],x[y+1])}return{count:u,tri:Uint32Array.from(v),positions:d,localOf:h,vertexOf:p}}function C_(i,t){const e=new Float64Array(i.cols.length);for(let n=0;n<i.cols.length;n++){const s=i.cols[n],r=i.vals[n];let o=0;for(let a=0;a<s.length;a++)o+=r[a]*t[s[a]];e[n]=o}return e}function Ih(i,t){const e=new Float64Array(i.columns);for(let n=0;n<i.cols.length;n++){const s=i.cols[n],r=i.vals[n],o=t[n];if(o!==0)for(let a=0;a<s.length;a++)e[s[a]]+=r[a]*o}return e}function Ff(i,t=4e3,e=1e-10){const n=i.columns,s=new Float64Array(n),r=Ih(i,i.rhs),o=new Float64Array(n);for(let d=0;d<i.cols.length;d++){const p=i.cols[d],v=i.vals[d];for(let g=0;g<p.length;g++)o[p[g]]+=v[g]*v[g]}for(let d=0;d<n;d++)o[d]>1e-300||(o[d]=1);const a=Float64Array.from(r),c=new Float64Array(n);for(let d=0;d<n;d++)c[d]=a[d]/o[d];const l=Float64Array.from(c);let h=0,f=0;for(let d=0;d<n;d++)h+=a[d]*c[d],f+=a[d]*a[d];const u=Math.max(1e-300,f)*e*e;if(f<=u)return s;for(let d=0;d<t;d++){const p=Ih(i,C_(i,l));let v=0;for(let _=0;_<n;_++)v+=l[_]*p[_];if(!(Math.abs(v)>1e-300))break;const g=h/v;let m=0;for(let _=0;_<n;_++)s[_]+=g*l[_],a[_]-=g*p[_],m+=a[_]*a[_];if(m<=u)break;let x=0;for(let _=0;_<n;_++)c[_]=a[_]/o[_],x+=a[_]*c[_];const y=x/h;for(let _=0;_<n;_++)l[_]=c[_]+y*l[_];h=x}return s}function R_(i,t,e,n){const s=i[e*3]-i[t*3],r=i[e*3+1]-i[t*3+1],o=i[e*3+2]-i[t*3+2],a=i[n*3]-i[t*3],c=i[n*3+1]-i[t*3+1],l=i[n*3+2]-i[t*3+2],h=Math.hypot(s,r,o);if(h<1e-12)return{x:[0,0,0],y:[0,0,0],area2:0};const f=h,u=(s*a+r*c+o*l)/h,d=r*l-o*c,p=o*a-s*l,v=s*c-r*a,g=Math.hypot(d,p,v)/h;return{x:[0,f,u],y:[0,0,g],area2:f*g}}function Of(i,t,e){const n=i.length/3,s=new Float64Array(n*2);if(!n)return s;const r=[],o=new Int32Array(n).fill(-1);for(let u=0;u<n;u++)e.has(u)||(o[u]=r.length,r.push(u));const a=r.length*2;if(!a){for(const[u,d]of e)s[u*2]=d[0],s[u*2+1]=d[1];return s}const c=[],l=[],h=[];for(let u=0;u<t.length;u+=3){const d=[t[u],t[u+1],t[u+2]],{x:p,y:v,area2:g}=R_(i,d[0],d[1],d[2]);if(!(g>1e-16))continue;const m=1/Math.sqrt(g),x=[p[2]-p[1],p[0]-p[2],p[1]-p[0]],y=[v[2]-v[1],v[0]-v[2],v[1]-v[0]];for(const _ of[0,1]){const S=[],w=[];let A=0;for(let M=0;M<3;M++){const E=(_===0?x[M]:y[M])*m,P=(_===0?-y[M]:x[M])*m,C=d[M],I=e.get(C);if(I){A-=E*I[0]+P*I[1];continue}S.push(o[C],r.length+o[C]),w.push(E,P)}S.length&&(c.push(Int32Array.from(S)),l.push(Float64Array.from(w)),h.push(A))}}const f=Ff({cols:c,vals:l,rhs:Float64Array.from(h),columns:a});for(let u=0;u<r.length;u++){const d=r[u];s[d*2]=f[u],s[d*2+1]=f[r.length+u]}for(const[u,d]of e)s[u*2]=d[0],s[u*2+1]=d[1];return s}function kf(i,t){const e=i.length/3,n=new Map;if(e<2)return e===1&&n.set(0,[0,0]),n;if(!t||!t.length){const[u,d]=Lh(i,Array.from({length:e},(p,v)=>v));return u!==d&&(n.set(u,[0,0]),n.set(d,[1,0])),n}const s=new Int32Array(e);for(let u=0;u<e;u++)s[u]=u;const r=u=>{let d=u;for(;s[d]!==d;)d=s[d];for(;s[u]!==d;){const p=s[u];s[u]=d,u=p}return d},o=(u,d)=>{const p=r(u),v=r(d);p!==v&&(s[p]=v)};for(let u=0;u<t.length;u+=3)o(t[u],t[u+1]),o(t[u+1],t[u+2]);const a=new Map;for(let u=0;u<t.length;u+=3)for(let d=0;d<3;d++){const p=t[u+d],v=t[u+(d+1)%3];if(p===v)continue;const g=p<v?`${p}_${v}`:`${v}_${p}`;a.set(g,(a.get(g)??0)+1)}const c=new Set;for(const[u,d]of a){if(d!==1)continue;const[p,v]=u.split("_").map(Number);c.add(p),c.add(v)}const l=new Map;for(const[u,d]of a){if(d!==1)continue;const[p,v]=u.split("_").map(Number);for(const[g,m]of[[p,v],[v,p]]){const x=l.get(g);x?x.push(m):l.set(g,[m])}}const h=new Map;for(let u=0;u<e;u++){const d=r(u),p=h.get(d);p?p.push(u):h.set(d,[u])}let f=0;for(const u of[...h.keys()].sort((d,p)=>d-p)){const d=h.get(u),p=d.filter(x=>c.has(x)),v=P_(l,p);let g,m;v.length>=4?(g=v[0],m=v[Math.floor(v.length/2)]):[g,m]=Lh(i,p.length>=2?p:d),g!==m&&(n.set(g,[f,0]),n.set(m,[f+1,0]),f+=2)}return n}function P_(i,t){const e=t.length?Math.min(...t):-1;if(e<0)return[];const n=[e],s=new Set([e]);let r=e;for(let o=0;o<t.length+2;o++){const a=(i.get(r)??[]).filter(c=>!s.has(c)).sort((c,l)=>c-l);if(!a.length)break;r=a[0],s.add(r),n.push(r)}return n}function Lh(i,t){if(t.length<2)return[t[0]??0,t[0]??0];const e=[...t].sort((o,a)=>o-a);let n=e[0],s=-1;for(const o of e){const a=Dh(i,e[0],o);a>s&&(s=a,n=o)}let r=e[0];s=-1;for(const o of e){if(o===n)continue;const a=Dh(i,n,o);a>s&&(s=a,r=o)}return[n,r]}function Dh(i,t,e){return Math.hypot(i[t*3]-i[e*3],i[t*3+1]-i[e*3+1],i[t*3+2]-i[e*3+2])}function Bf(i,t,e){let n=0,s=0;for(let o=0;o<t.length;o+=3){const a=t[o],c=t[o+1],l=t[o+2],h=i[c*3]-i[a*3],f=i[c*3+1]-i[a*3+1],u=i[c*3+2]-i[a*3+2],d=i[l*3]-i[a*3],p=i[l*3+1]-i[a*3+1],v=i[l*3+2]-i[a*3+2],g=f*v-u*p,m=u*d-h*v,x=h*p-f*d;n+=Math.hypot(g,m,x)/2;const y=e[c*2]-e[a*2],_=e[c*2+1]-e[a*2+1],S=e[l*2]-e[a*2],w=e[l*2+1]-e[a*2+1];s+=Math.abs(y*w-_*S)/2}if(!(n>1e-16)||!(s>1e-16))return 1;const r=Math.sqrt(n/s);for(let o=0;o<e.length;o++)e[o]*=r;return r}function uc(i,t){const e=i.length/3,n=new Float64Array(e*2);if(!e)return n;let s=0,r=0,o=0;for(let m=0;m<t.length;m+=3){const x=t[m]*3,y=t[m+1]*3,_=t[m+2]*3,S=i[y]-i[x],w=i[y+1]-i[x+1],A=i[y+2]-i[x+2],M=i[_]-i[x],E=i[_+1]-i[x+1],P=i[_+2]-i[x+2];s+=w*P-A*E,r+=A*M-S*P,o+=S*E-w*M}let a=Math.hypot(s,r,o);a<1e-12&&(s=0,r=0,o=1,a=1),s/=a,r/=a,o/=a;const c=Math.abs(s)<.9?1:0,l=Math.abs(s)<.9?0:1;let h=l*o-0*r,f=0*s-c*o,u=c*r-l*s;const d=Math.hypot(h,f,u)||1;h/=d,f/=d,u/=d;const p=r*u-o*f,v=o*h-s*u,g=s*f-r*h;for(let m=0;m<e;m++){const x=i[m*3],y=i[m*3+1],_=i[m*3+2];n[m*2]=x*h+y*f+_*u,n[m*2+1]=x*p+y*v+_*g}return n}function ro(i,t,e,n){const s=t[e*3],r=t[e*3+1],o=t[e*3+2],a=i[r*3]-i[s*3],c=i[r*3+1]-i[s*3+1],l=i[r*3+2]-i[s*3+2],h=i[o*3]-i[s*3],f=i[o*3+1]-i[s*3+1],u=i[o*3+2]-i[s*3+2],d=Math.hypot(a,c,l);if(d<1e-12)return null;const p=d,v=(a*h+c*f+l*u)/d,g=c*u-l*f,m=l*h-a*u,x=a*f-c*h,y=Math.hypot(g,m,x),_=y/d,S=p*_;if(!(Math.abs(S)>1e-16))return null;const w=n[r*2]-n[s*2],A=n[r*2+1]-n[s*2+1],M=n[o*2]-n[s*2],E=n[o*2+1]-n[s*2+1],P=[w*_/S,(-w*v+M*p)/S,A*_/S,(-A*v+E*p)/S],C=g/y,I=m/y,V=x/y,O=a/d,D=c/d,z=l/d;return{ex:[O,D,z],ey:[I*z-V*D,V*O-C*z,C*D-I*O],normal:[C,I,V],j:P,area:y/2,uvArea:Math.abs(w*E-M*A)/2,local:[[0,0],[p,0],[v,_]]}}function qc(i,t,e){const n=t.length/3,s=new Float32Array(n);let r=1,o=0,a=0;for(let c=0;c<n;c++){const l=t[c*3],h=t[c*3+1],f=t[c*3+2],u=ro(i,t,c,e);if(!u){s[c]=1;continue}const[d,p,v,g]=u.j,m=(d+g)/2,x=(d-g)/2,y=(v+p)/2,_=(v-p)/2,S=Math.hypot(m,_),w=Math.hypot(x,y),A=S+w,M=Math.abs(S-w),E=M>1e-12?A/M:1e12;s[c]=E,E>r&&(r=E);const P=u.local,C=[[e[l*2],e[l*2+1]],[e[h*2],e[h*2+1]],[e[f*2],e[f*2+1]]];for(let I=0;I<3;I++){const V=P[I],O=P[(I+1)%3],D=P[(I+2)%3],z=C[I],N=C[(I+1)%3],q=C[(I+2)%3],j=Uh(V,O,D),it=Uh(z,N,q);Number.isFinite(j)&&Number.isFinite(it)&&(o+=Math.abs(j-it),a++)}}return{maxStretch:r,meanAngleError:a?o/a*(180/Math.PI):0,perTriangle:s}}function Uh(i,t,e){const n=t[0]-i[0],s=t[1]-i[1],r=e[0]-i[0],o=e[1]-i[1],a=Math.hypot(n,s),c=Math.hypot(r,o);if(a<1e-12||c<1e-12)return NaN;const l=Math.max(-1,Math.min(1,(n*r+s*o)/(a*c)));return Math.acos(l)}const Nh=.2,Fh=[0,1,0],I_=[1,0,0];function zf(i,t,e){const n=t.length/3;if(!n)return;let s=0,r=0;for(let f=0;f<n;f++){const u=ro(i,t,f,e);u&&(r+=u.area,L_(Fh,u.normal)>=Nh&&(s+=u.area))}if(!(r>0))return;const o=s*2>=r,a=o?Fh:I_;let c=0,l=0;for(let f=0;f<n;f++){const u=ro(i,t,f,e);if(!u)continue;const d=Vf(a,u.normal),p=Math.hypot(d[0],d[1],d[2]);if(p<Nh)continue;const v=fc(d,u.ex)/p,g=fc(d,u.ey)/p,[m,x,y,_]=u.j,S=m*v+x*g,w=y*v+_*g,A=Math.hypot(S,w);A<1e-12||(c+=S/A*u.uvArea,l+=w/A*u.uvArea)}if(Math.hypot(c,l)<1e-12)return;let h=Math.atan2(c,l);o||(h-=Math.PI/2),!(Math.abs(h)<1e-9)&&D_(e,h)}function L_(i,t){const e=Vf(i,t);return Math.hypot(e[0],e[1],e[2])}function Vf(i,t){const e=fc(i,t);return[i[0]-t[0]*e,i[1]-t[1]*e,i[2]-t[2]*e]}function fc(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function D_(i,t){const e=i.length/2;if(!e)return;let n=0,s=0;for(let a=0;a<e;a++)n+=i[a*2],s+=i[a*2+1];n/=e,s/=e;const r=Math.cos(t),o=Math.sin(t);for(let a=0;a<e;a++){const c=i[a*2]-n,l=i[a*2+1]-s;i[a*2]=n+c*r-l*o,i[a*2+1]=s+c*o+l*r}}function U_(i){const t=new Map;for(let e=0;e<i.faceCount;e++){const n=i.faceVerts(e);for(let s=0;s<n.length;s++){const r=bt(n[s],n[(s+1)%n.length]),o=t.get(r);o?o.push(e):t.set(r,[e])}}return t}function Fi(i,t){return i[0]*t[0]+i[1]*t[1]+i[2]*t[2]}function Hf(i,t,e){const n=new Set;if(i.faceCount===0)return n;const s=U_(i),r=[];for(let c=0;c<i.faceCount;c++)r.push(i.faceNormal(c));const o=Math.cos(Math.max(0,Math.min(180,t.angle))*Math.PI/180),a=Math.cos(Math.max(0,Math.min(180,e))*Math.PI/180);for(const c of[...s.keys()].sort()){const l=s.get(c);if(l.length!==2)continue;const[h,f]=l,u=Fi(r[h],r[f]);if(u<o){n.add(c);continue}if(t.useHardEdges&&u<a){n.add(c);continue}if(t.useCreases&&(i.crease.get(c)??0)>0){n.add(c);continue}t.usePolygroups&&i.polygroup[h]!==i.polygroup[f]&&n.add(c)}return N_(i,n,r,s),O_(i,n,r,s),t.symmetric&&B_(i,n),n}function N_(i,t,e,n){for(let s=0;s<4;s++){const r=bs(i,t);let o=!1;for(const a of r){if(a.faces.length<4)continue;const c=a.faces.length>i.faceCount/3,l=F_(a.faces,e)<Math.cos(120*Math.PI/180);!c&&!l||Gf(a.faces,t,e,n)&&(o=!0)}if(!o)return}}function F_(i,t){let e=1;const n=i[0];let s=n;for(const o of i){const a=Fi(t[n],t[o]);a<e&&(e=a,s=o)}let r=1;for(const o of i)r=Math.min(r,Fi(t[s],t[o]));return Math.min(e,r)}function Gf(i,t,e,n){const s=new Set(i),r=[...i].sort((p,v)=>p-v),o=r[0];let a=o,c=1;for(const p of r){const v=Fi(e[o],e[p]);v<c&&(c=v,a=p)}let l=a;c=1;for(const p of r){const v=Fi(e[a],e[p]);v<c&&(c=v,l=p)}if(a===l)return!1;const h=new Map;for(const[p,v]of n){if(v.length!==2||t.has(p))continue;const[g,m]=v;if(!(!s.has(g)||!s.has(m)))for(const[x,y]of[[g,m],[m,g]]){const _=h.get(x);_?_.push(y):h.set(x,[y])}}const f=new Map;f.set(a,0),f.set(l,1);const u=[a,l];for(;u.length;){const p=u.shift();for(const v of(h.get(p)??[]).sort((g,m)=>g-m)){if(f.has(v))continue;const g=Fi(e[v],e[a]),m=Fi(e[v],e[l]);f.set(v,g>=m?0:1),u.push(v)}}let d=0;for(const p of[...n.keys()].sort()){const v=n.get(p);if(v.length!==2||t.has(p))continue;const[g,m]=v;if(!s.has(g)||!s.has(m))continue;const x=f.get(g),y=f.get(m);x===void 0||y===void 0||x===y||(t.add(p),d++)}return d>0}function O_(i,t,e,n){for(let s=0;s<8;s++){const r=bs(i,t);let o=!1;for(const a of r){if(k_(i,a.faces,t))continue;if(Gf(a.faces,t,e,n)){o=!0;continue}const c=[...a.faces].sort((h,f)=>h-f)[0],l=i.faceVerts(c);for(let h=0;h<l.length;h++)t.add(bt(l[h],l[(h+1)%l.length]));o=!0}if(!o)return}}function k_(i,t,e){new Set(t);const n=new Map,s=l=>{let h=l;for(;n.get(h)!==h;)h=n.get(h)??h;let f=l;for(;n.get(f)!==h;){const u=n.get(f)??h;n.set(f,h),f=u}return h},r=(l,h)=>{const f=s(l),u=s(h);f!==u&&n.set(f,u)},o=(l,h)=>`${l}:${h}`;for(const l of t)for(let h=0;h<i.faceSize(l);h++)n.set(o(l,h),o(l,h));for(const l of t){const h=i.faceVerts(l);for(let f=0;f<h.length;f++){const u=h[f],d=h[(f+1)%h.length],p=bt(u,d);if(!e.has(p))for(const v of t){if(v===l)continue;const g=i.faceVerts(v),m=g.indexOf(u),x=g.indexOf(d);if(m<0||x<0)continue;const y=g.length;(m+1)%y!==x&&(x+1)%y!==m||(r(o(l,f),o(v,m)),r(o(l,(f+1)%h.length),o(v,x)))}}}const a=new Set;for(const l of t)for(let h=0;h<i.faceSize(l);h++)a.add(s(o(l,h)));const c=new Set;for(const l of t){const h=i.faceSize(l);for(let f=0;f<h;f++){const u=s(o(l,f)),d=s(o(l,(f+1)%h));c.add(u<d?`${u}|${d}`:`${d}|${u}`)}}return a.size-c.size+t.length===1}function B_(i,t){const e=i.positions,n=(o,a,c)=>`${o.toFixed(3)==="-0.000"?"0.000":o.toFixed(3)},${a.toFixed(3)},${c.toFixed(3)}`,s=new Map;for(let o=0;o<i.vertexCount;o++)s.set(n(e[o*3],e[o*3+1],e[o*3+2]),o);const r=new Set;for(const[o,a]of i.edges())r.add(bt(o,a));for(const o of[...t].sort()){const[a,c]=o.split("_").map(Number),l=s.get(n(-e[a*3],e[a*3+1],e[a*3+2])),h=s.get(n(-e[c*3],e[c*3+1],e[c*3+2]));if(l===void 0||h===void 0)continue;const f=bt(l,h);r.has(f)&&t.add(f)}}function Wf(i){const t=Math.max(1,i.textureSize);return Math.max(i.marginTexels,Math.ceil(5*1024/t))/t}function Xf(i,t,e){const n=i.length,s=i.map(()=>({x:0,y:0,rotated:!1,scale:1}));if(!n)return s;const r=i.map((d,p)=>{const v=e&&d.h>d.w;return{i:p,w:Math.max(1e-6,v?d.h:d.w),h:Math.max(1e-6,v?d.w:d.h),rotated:v}}),o=[...r].sort((d,p)=>p.h-d.h||p.w-d.w||d.i-p.i),a=Math.max(1e-6,1-t*2),c=d=>{let p=0,v=0;for(const w of r)p+=(w.w*d+t)*(w.h*d+t),v=Math.max(v,w.w*d);const g=Math.max(v,Math.sqrt(p)*1.05),m=new Array(n);let x=0,y=0,_=0,S=0;for(const w of o){const A=w.w*d,M=w.h*d;x>0&&x+A>g&&(y+=_+t,x=0,_=0),m[w.i]={x,y},x+=A+t,S=Math.max(S,x-t),_=Math.max(_,M)}return{place:m,usedWidth:S,usedHeight:y+_}},l=d=>{const p=c(d);return p.usedWidth<=a&&p.usedHeight<=a};let h=0,f=1;for(let d=0;d<40&&l(f);d++)h=f,f*=2;for(let d=0;d<40;d++){const p=(h+f)/2;l(p)?h=p:f=p}const u=c(h);for(let d=0;d<n;d++)s[d]={x:u.place[d].x+t,y:u.place[d].y+t,rotated:r[d].rotated,scale:h};return s}function $f(i,t,e,n){const s=[];for(let o=0;o<i.length;o++){const a=qf(i[o],t[o]),c=Math.max(1e-12,e[o]);s.push(a>1e-12?Math.sqrt(a/c):1)}let r=n;if(r===null){let o=0;for(let a=1;a<e.length;a++)e[a]>e[o]&&(o=a);r=s[o]??1}if(r>1e-12)for(let o=0;o<i.length;o++){const a=r/Math.max(1e-12,s[o]);if(Math.abs(a-1)<1e-9)continue;const c=i[o];let l=0,h=0;const f=c.length/2;for(let u=0;u<f;u++)l+=c[u*2],h+=c[u*2+1];l/=Math.max(1,f),h/=Math.max(1,f);for(let u=0;u<f;u++)c[u*2]=l+(c[u*2]-l)*a,c[u*2+1]=h+(c[u*2+1]-h)*a}}function qf(i,t){let e=0;for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],o=t[n+2];e+=Math.abs((i[r*2]-i[s*2])*(i[o*2+1]-i[s*2+1])-(i[o*2]-i[s*2])*(i[r*2+1]-i[s*2+1]))}return e/2}function Yf(i,t){let e=0;for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],o=t[n+2],a=i[r*3]-i[s*3],c=i[r*3+1]-i[s*3+1],l=i[r*3+2]-i[s*3+2],h=i[o*3]-i[s*3],f=i[o*3+1]-i[s*3+1],u=i[o*3+2]-i[s*3+2];e+=Math.hypot(c*u-l*f,l*h-a*u,a*f-c*h)}return e/2}function Kf(i,t,e="center"){oo(i,t,0,e)}function Zf(i,t,e="center"){oo(i,t,1,e)}function oo(i,t,e,n){const s=[...t];if(s.length<2)return;let r=0,o=1/0,a=-1/0;for(const l of s){const h=i[l*2+e];r+=h,o=Math.min(o,h),a=Math.max(a,h)}const c=n==="min"?o:n==="max"?a:r/s.length;for(const l of s)i[l*2+e]=c}function jf(i,t){const e=[...t];if(e.length<3)return;let n=0,s=0;for(const f of e)n+=i[f*2],s+=i[f*2+1];n/=e.length,s/=e.length;let r=0,o=0,a=0;for(const f of e){const u=i[f*2]-n,d=i[f*2+1]-s;r+=u*u,o+=u*d,a+=d*d}const c=.5*Math.atan2(2*o,r-a),l=Math.cos(c),h=Math.sin(c);for(const f of e){const u=i[f*2]-n,d=i[f*2+1]-s,p=u*l+d*h;i[f*2]=n+l*p,i[f*2+1]=s+h*p}}function z_(i,t){if(t.length<4)return;const e=[];for(let s=0;s<t.length;s++){const r=t[s],o=t[(s+1)%t.length];e.push(Math.abs(i[o*2]-i[r*2])>=Math.abs(i[o*2+1]-i[r*2+1]))}let n=0;for(;n<t.length;){let s=n;for(;s+1<t.length&&e[s+1]===e[n];)s++;const r=[];for(let o=n;o<=s+1&&o<t.length+1;o++)r.push(t[o%t.length]);r.length>=2&&(e[n]?oo(i,r,1,"center"):oo(i,r,0,"center")),n=s+1}}function V_(i,t){if(t.length<2)return;let e=1/0,n=1/0,s=-1/0,r=-1/0;for(const a of t)for(const c of a)e=Math.min(e,i[c*2]),s=Math.max(s,i[c*2]),n=Math.min(n,i[c*2+1]),r=Math.max(r,i[c*2+1]);if(!Number.isFinite(e))return;const o=t.length-1;for(let a=0;a<t.length;a++){const c=t[a],l=o>0?n+(r-n)*a/o:n,h=c.length-1;for(let f=0;f<c.length;f++){const u=h>0?e+(s-e)*f/h:e;i[c[f]*2]=u,i[c[f]*2+1]=l}}}function H_(i,t){Jf(i,t,0)}function G_(i,t){Jf(i,t,1)}function Jf(i,t,e){const n=[...t];if(!n.length)return;let s=1/0,r=-1/0;for(const a of n)s=Math.min(s,i[a*2+e]),r=Math.max(r,i[a*2+e]);const o=(s+r)/2;for(const a of n)i[a*2+e]=o*2-i[a*2+e]}function W_(i,t,e=1){const n=[...t];if(!n.length)return;let s=1/0,r=1/0,o=-1/0,a=-1/0;for(const f of n)s=Math.min(s,i[f*2]),o=Math.max(o,i[f*2]),r=Math.min(r,i[f*2+1]),a=Math.max(a,i[f*2+1]);const c=(s+o)/2,l=(r+a)/2,h=(e%4+4)%4;for(let f=0;f<h;f++)for(const u of n){const d=i[u*2]-c,p=i[u*2+1]-l;i[u*2]=c-p,i[u*2+1]=l+d}}function Qf(i,t,e){const n=[...t].sort((o,a)=>o-a),s=new Set;let r=0;for(let o=0;o<n.length;o++){const a=n[o];if(s.has(a))continue;const c=[a];for(let f=o+1;f<n.length;f++){const u=n[f];if(s.has(u))continue;Math.hypot(i[a*2]-i[u*2],i[a*2+1]-i[u*2+1])<=e&&(c.push(u),s.add(u))}if(c.length<2)continue;let l=0,h=0;for(const f of c)l+=i[f*2],h+=i[f*2+1];l/=c.length,h/=c.length;for(const f of c)i[f*2]=l,i[f*2+1]=h;r+=c.length-1}return r}function td(i,t,e){if(!t.length)return;let n=e;if(n===void 0){let s=0,r=0;for(const[o,a]of t)s+=i[o*2]+i[a*2],r+=2;n=r?s/r:0}for(const[s,r]of t)i[r*2]=n*2-i[s*2],i[r*2+1]=i[s*2+1]}const Ee="map1";function Yc(){return{seams:new Set,pins:new Map,method:"lscm",base:null,packing:{marginTexels:8,textureSize:1024,allowRotate:!1,texelDensity:null},manual:new Map,autoSeamParams:{angle:65,useHardEdges:!0,useCreases:!0,usePolygroups:!0,symmetric:!1}}}function dc(i){const t=new Map;for(const[e,n]of i.manual)t.set(e,new Map([...n].map(([s,r])=>[s,[r[0],r[1]]])));return{seams:new Set(i.seams),pins:new Map([...i.pins].map(([e,n])=>[e,[n[0],n[1]]])),method:i.method,base:i.base?Float32Array.from(i.base):null,packing:{...i.packing},manual:t,autoSeamParams:{...i.autoSeamParams}}}function Di(i,t,e={}){const n=bs(i,t.seams),s=new Float32Array(i.faceCorners.length*2),r=[],o=[],a=[],c=[],l=t.base??i.uvSets.get(Ee);for(const u of n){const d=po(i,u,t.seams);let p,v=t.method!=="none";if(t.method==="none"){p=new Float64Array(d.count*2);for(const g of u.corners){const m=d.localOf.get(g),x=Be(i,g);p[m*2]=l?l[x*2]:0,p[m*2+1]=l?l[x*2+1]:0}}else if(t.method==="projection")p=uc(d.positions,d.tri);else{const g=new Map;for(const m of u.corners){const x=t.pins.get(m);if(!x)continue;const y=d.localOf.get(m);y!==void 0&&g.set(y,[x[0],x[1]])}if(g.size<2)for(const[m,x]of kf(d.positions,d.tri))g.has(m)||g.set(m,x);else v=!1;p=Of(d.positions,d.tri,g),X_(p,d.count)||(p=uc(d.positions,d.tri)),t.pins.size<2&&Bf(d.positions,d.tri,p)}v&&zf(d.positions,d.tri,p),r.push(qc(d.positions,d.tri,p)),o.push(p),a.push(d.tri),c.push(Yf(d.positions,d.tri));for(const g of u.corners){const m=d.localOf.get(g),x=Be(i,g);s[x*2]=p[m*2],s[x*2+1]=p[m*2+1]}}!e.skipPack&&t.method!=="none"&&($f(o,a,c,t.packing.texelDensity),$_(n,o,s,i,t.packing));for(const u of n){const d=t.manual.get(u.fingerprint);if(d)for(const[p,v]of d){const g=Be(i,p);g<0||g*2+1>=s.length||(s[g*2]+=v[0],s[g*2+1]+=v[1])}}i.uvSets.set(Ee,s);let h=1,f=0;for(const u of r)h=Math.max(h,u.maxStretch),f+=u.meanAngleError;return{charts:n,distortion:r,maxStretch:h,meanAngleError:r.length?f/r.length:0}}function X_(i,t){if(!t)return!0;let e=1/0,n=1/0,s=-1/0,r=-1/0;for(let c=0;c<t;c++){const l=i[c*2],h=i[c*2+1];if(!Number.isFinite(l)||!Number.isFinite(h))return!1;e=Math.min(e,l),s=Math.max(s,l),n=Math.min(n,h),r=Math.max(r,h)}const o=s-e,a=r-n;return o>1e-9&&a>1e-9}function $_(i,t,e,n,s){if(!i.length)return;const r=[],o=[];t.forEach(c=>{let l=1/0,h=1/0,f=-1/0,u=-1/0;for(let d=0;d<c.length/2;d++)l=Math.min(l,c[d*2]),f=Math.max(f,c[d*2]),h=Math.min(h,c[d*2+1]),u=Math.max(u,c[d*2+1]);o.push([l,h]),r.push({w:f-l,h:u-h})});const a=Xf(r,Wf(s),s.allowRotate);i.forEach((c,l)=>{const h=a[l],[f,u]=o[l];for(const d of c.corners){const p=Be(n,d),v=e[p*2]-f,g=e[p*2+1]-u,m=h.rotated?g:v,x=h.rotated?r[l].w-v:g;e[p*2]=h.x+m*h.scale,e[p*2+1]=h.y+x*h.scale}})}function Kc(i,t=1e-6){const e=new Set,n=i.uvSets.get(Ee);if(!n)return e;const s=new Map;for(let r=0;r<i.faceCount;r++){const o=i.faceSize(r);for(let a=0;a<o;a++){const c=Zc(i,r,a),l=s.get(c);l?l.push([r,a]):s.set(c,[[r,a]])}}for(const[r,o]of s){if(o.length!==2)continue;const[a,c]=r.split("_").map(Number),l=(f,u)=>{const p=i.faceVerts(f).indexOf(u);if(p<0)return null;const v=i.faceOffsets[f]+p;return[n[v*2],n[v*2+1]]};let h=!1;for(const f of[a,c]){const u=l(o[0][0],f),d=l(o[1][0],f);!u||!d||(Math.abs(u[0]-d[0])>t||Math.abs(u[1]-d[1])>t)&&(h=!0)}h&&e.add(r)}return e}function ed(i){const t=Yc(),e=i.uvSets.get(Ee);if(!e)return t.method="projection",t;t.method="none",t.base=Float32Array.from(e);for(const n of Kc(i))t.seams.add(n);return t}function nd(i,t,e){const n=new Set(e);if(!n.size)return;const s=new Map;for(let r=0;r<i.faceCount;r++){const o=i.faceSize(r);for(let a=0;a<o;a++){const c=Zc(i,r,a);if(!n.has(c))continue;const l=s.get(c);l?l.push([r,a]):s.set(c,[[r,a]])}}for(const[r,o]of s){if(o.length!==2)continue;const[a,c]=r.split("_").map(Number);for(const l of[a,c]){const h=[];for(const[d]of o){const p=i.faceVerts(d).indexOf(l);p>=0&&h.push(i.faceOffsets[d]+p)}if(h.length!==2)continue;const f=(t[h[0]*2]+t[h[1]*2])/2,u=(t[h[0]*2+1]+t[h[1]*2+1])/2;for(const d of h)t[d*2]=f,t[d*2+1]=u}}}function Be(i,t){const[e,n]=Ys(t);return e<0||e>=i.faceCount?-1:i.faceOffsets[e]+n}function id(i,t,e){const n=i.manual.get(t)??new Map;for(const[s,r]of e){const o=n.get(s)??[0,0];n.set(s,[o[0]+r[0],o[1]+r[1]])}i.manual.set(t,n)}function sd(i,t){if(i.method==="none"){const a=t.uvSets.get(Ee);if(a){i.base=Float32Array.from(a),i.manual.clear();for(const h of Kc(t))i.seams.add(h);for(const h of[...i.pins.keys()]){const[f,u]=Ys(h);(f<0||f>=t.faceCount||u>=t.faceSize(f))&&i.pins.delete(h)}let c=0;const l=new Set;for(const[h,f]of t.edges())l.add(bt(h,f));for(const h of[...i.seams])l.has(h)||(i.seams.delete(h),c++);return{droppedSeams:c,droppedIslands:0,rebased:!0}}}const e=new Set;for(const[a,c]of t.edges())e.add(bt(a,c));let n=0;for(const a of[...i.seams])e.has(a)||(i.seams.delete(a),n++);for(const a of[...i.pins.keys()]){const[c,l]=Ys(a);(c<0||c>=t.faceCount||l>=t.faceSize(c))&&i.pins.delete(a)}const s=bs(t,i.seams),r=new Set(s.map(a=>a.fingerprint));let o=0;for(const a of[...i.manual.keys()])r.has(a)||(i.manual.delete(a),o++);return{droppedSeams:n,droppedIslands:o,rebased:!1}}function Zc(i,t,e){const n=i.faceVerts(t);return bt(n[e],n[(e+1)%n.length])}function rd(i){return{seams:[...i.seams].sort(),pins:[...i.pins].sort((t,e)=>t[0]<e[0]?-1:1).map(([t,e])=>[t,e[0],e[1]]),method:i.method,base:i.base?[...i.base]:null,packing:{...i.packing},manual:[...i.manual].sort((t,e)=>t[0]<e[0]?-1:1).map(([t,e])=>[t,[...e].sort((n,s)=>n[0]<s[0]?-1:1).map(([n,s])=>[n,s[0],s[1]])]),autoSeamParams:{...i.autoSeamParams}}}function od(i){if(!i)return null;const t=Yc();for(const e of i.seams??[])t.seams.add(e);for(const[e,n,s]of i.pins??[])t.pins.set(e,[n,s]);if(i.method&&(t.method=i.method),i.base&&(t.base=Float32Array.from(i.base)),i.packing){const e=i.packing;t.packing={...t.packing,...i.packing},e.marginTexels===void 0&&typeof e.margin=="number"&&(t.packing.marginTexels=Math.max(1,Math.round(e.margin*1024)),t.packing.textureSize=1024),e.allowRotate===void 0&&(t.packing.allowRotate=!1),delete t.packing.margin}i.autoSeamParams&&(t.autoSeamParams={...t.autoSeamParams,...i.autoSeamParams});for(const[e,n]of i.manual??[])t.manual.set(e,new Map(n.map(([s,r,o])=>[s,[r,o]])));return t}function Yr(i,t,e){const n=i.vertexNeighbors(),s=i.edgeFaceMap(),r=new Set,o=(h,f)=>{const u=n.get(f);if(!u||u.length!==4)return-1;const d=s.get(bt(h,f))??[];for(const p of u){if(p===h)continue;if(!(s.get(bt(f,p))??[]).some(g=>d.includes(g)))return p}return-1},a=[],c=(h,f,u,d)=>{let p=!0;for(let v=0;v<1e5;v++){const g=bt(h,f);if(r.has(g)&&!p)return!0;p&&d||(r.add(g),u?a.push([h,f]):a.unshift([f,h])),p=!1;const m=o(h,f);if(m<0)return!1;h=f,f=m}return!1},l=c(t,e,!0,!1);return l||c(e,t,!1,!0),{edges:a,closed:l}}function ad(i,t,e){const n=i.edgeFaceMap(),s=new Set,r=[],o=[],a=(f,u,d,p)=>{for(let v=0;v<1e5;v++){const m=(n.get(bt(f,u))??[]).find(w=>w!==d);if(m===void 0)return!1;if(s.has(m))return!0;const x=i.faceVerts(m);if(x.length!==4)return!1;s.add(m);let y=-1;for(let w=0;w<4;w++)if(x[w]===f&&x[(w+1)%4]===u){y=w;break}if(y<0){for(let w=0;w<4;w++)if(x[w]===u&&x[(w+1)%4]===f){y=w;break}}if(y<0)return!1;const _=x[(y+2)%4],S=x[(y+3)%4];p.push([S,_]),d=m,f=S,u=_}return!1},c=n.get(bt(t,e))??[],l=a(t,e,-1,r);if(!l){const f=c.find(u=>s.has(u));a(e,t,f??-1,o)}const h=[...o.reverse(),[t,e],...r];if(l&&h.length>1){const f=h[h.length-1];bt(f[0],f[1])===bt(t,e)&&h.pop()}return{edges:h,closed:l}}function pc(i,t,e){const n=i.edges.map(c=>bt(c[0],c[1]));let s=n.indexOf(t),r=n.indexOf(e);if(s<0||r<0)return null;s>r&&([s,r]=[r,s]);const o=i.edges.slice(s,r+1);if(!i.closed)return o;const a=[...i.edges.slice(r),...i.edges.slice(0,s+1)];return a.length<o.length?a:o}function jc(i,t){const e=i.edgeFaceMap(),n=new Set([t]),s=[t],r=[];for(;s.length;){const o=s.pop();r.push(o);const a=i.faceVerts(o);for(let c=0;c<a.length;c++){const l=e.get(bt(a[c],a[(c+1)%a.length]))??[];for(const h of l)n.has(h)||(n.add(h),s.push(h))}}return r}function cd(i,t){const e=new Set;for(const n of jc(i,t))for(const s of i.faceVerts(n))e.add(s);return Array.from(e)}function ld(i){const t=[];for(const[e,n]of i.edges)t.includes(e)||t.push(e),t.includes(n)||t.push(n);return t}function hd(i){const t=[];for(const[e,n]of i.edgeFaceMap())if(n.length===1){const[s,r]=e.split("_").map(Number);t.push([s,r])}return t}function mc(i,t){const e=i.vertexNeighbors(),n=new Set(t);for(const s of Array.from(n))for(const r of e.get(s)??[])n.add(r);return Array.from(n)}function gc(i,t){const e=i.vertexNeighbors(),n=new Set(t);return Array.from(n).filter(s=>(e.get(s)??[]).every(r=>n.has(r)))}function ud(i,t){const e=i.edgeFaceMap(),n=new Set(t);for(const s of Array.from(n)){const r=i.faceVerts(s);for(let o=0;o<r.length;o++)for(const a of e.get(bt(r[o],r[(o+1)%r.length]))??[])n.add(a)}return Array.from(n)}function fd(i,t){const e=i.edgeFaceMap(),n=new Set(t);return Array.from(n).filter(s=>{const r=i.faceVerts(s);for(let o=0;o<r.length;o++)for(const a of e.get(bt(r[o],r[(o+1)%r.length]))??[])if(!n.has(a))return!1;return!0})}function q_(i){let t=0,e=0;for(const n of i)t+=n[0],e+=n[1];return[t/i.length,e/i.length]}class Jc{vertexCount;faceCount;edgeList;edgeBase;faceBase;outCount;faceVerts=[];vertexFaces=[];neighbors=[];edgeIndex=new Map;edgeFaces=[];edgeSharp;sharpAt=[];constructor(t){this.vertexCount=t.vertexCount,this.faceCount=t.faceCount,this.edgeList=t.edges(),this.edgeBase=this.vertexCount,this.faceBase=this.vertexCount+this.edgeList.length,this.outCount=this.faceBase+this.faceCount;for(let r=0;r<this.faceCount;r++)this.faceVerts.push(t.faceVerts(r));const e=t.vertexFaces(),n=t.vertexNeighbors();for(let r=0;r<this.vertexCount;r++)this.vertexFaces.push(e.get(r)??[]),this.neighbors.push(n.get(r)??[]),this.sharpAt.push([]);const s=t.edgeFaceMap();this.edgeSharp=new Float64Array(this.edgeList.length);for(let r=0;r<this.edgeList.length;r++){const[o,a]=this.edgeList[r],c=bt(o,a);this.edgeIndex.set(c,r);const l=s.get(c)??[];this.edgeFaces.push(l),this.edgeSharp[r]=Math.min(1,t.getCrease(o,a));const h=l.length===1?1:this.edgeSharp[r];h>0&&(this.sharpAt[o].push({other:a,sharpness:h}),this.sharpAt[a].push({other:o,sharpness:h}))}}edgePointOf(t,e){const n=this.edgeIndex.get(bt(t,e));return n===void 0?-1:this.edgeBase+n}affected(t){const e=new Set,n=new Set;for(const s of t){if(s<0||s>=this.vertexCount)continue;const r=this.vertexFaces[s];r.length||n.add(s);for(const o of r)e.add(o)}for(const s of e){n.add(this.faceBase+s);const r=this.faceVerts[s];for(let o=0;o<r.length;o++){n.add(r[o]);const a=this.edgeIndex.get(bt(r[o],r[(o+1)%r.length]));a!==void 0&&n.add(this.edgeBase+a)}}return n}positions(t,e,n){const s=new Float64Array(this.faceCount*3),r=new Uint8Array(this.faceCount),o=f=>{if(!r[f]){const u=t.faceCenter(f);s[f*3]=u[0],s[f*3+1]=u[1],s[f*3+2]=u[2],r[f]=1}return f*3},a=f=>{const u=o(f),d=(this.faceBase+f)*3;e[d]=s[u],e[d+1]=s[u+1],e[d+2]=s[u+2]},c=f=>{const[u,d]=this.edgeList[f],p=t.getPosition(u),v=t.getPosition(d),g=[(p[0]+v[0])/2,(p[1]+v[1])/2,(p[2]+v[2])/2],m=(this.edgeBase+f)*3,x=this.edgeFaces[f];if(x.length!==2){e[m]=g[0],e[m+1]=g[1],e[m+2]=g[2];return}const y=o(x[0]),_=o(x[1]),S=this.edgeSharp[f];for(let w=0;w<3;w++){const A=(p[w]+v[w]+s[y+w]+s[_+w])/4;e[m+w]=A+(g[w]-A)*S}},l=f=>{const u=t.getPosition(f),d=this.vertexFaces[f],p=d.length,v=this.neighbors[f],g=f*3;let m;if(!p||!v.length)m=[u[0],u[1],u[2]];else{let S=0,w=0,A=0;for(const C of d){const I=o(C);S+=s[I],w+=s[I+1],A+=s[I+2]}S/=p,w/=p,A/=p;let M=0,E=0,P=0;for(const C of v){const I=t.getPosition(C);M+=(u[0]+I[0])/2,E+=(u[1]+I[1])/2,P+=(u[2]+I[2])/2}M/=v.length,E/=v.length,P/=v.length,m=[(S+2*M+(p-3)*u[0])/p,(w+2*E+(p-3)*u[1])/p,(A+2*P+(p-3)*u[2])/p]}const x=this.sharpAt[f];if(x.length<2){e[g]=m[0],e[g+1]=m[1],e[g+2]=m[2];return}let y;if(x.length>=3)y=[u[0],u[1],u[2]];else{let S=0,w=0,A=0;for(const M of x){const E=t.getPosition(M.other);S+=(u[0]+E[0])/2,w+=(u[1]+E[1])/2,A+=(u[2]+E[2])/2}y=[(S+6*u[0])/8,(w+6*u[1])/8,(A+6*u[2])/8]}let _=0;for(const S of x)_+=S.sharpness;_=Math.min(1,_/x.length);for(let S=0;S<3;S++)e[g+S]=m[S]+(y[S]-m[S])*_},h=f=>{f>=this.faceBase?a(f-this.faceBase):f>=this.edgeBase?c(f-this.edgeBase):l(f)};if(n){for(const f of n)f>=0&&f<this.outCount&&h(f);return}for(let f=0;f<this.faceCount;f++)a(f);for(let f=0;f<this.edgeList.length;f++)c(f);for(let f=0;f<this.vertexCount;f++)l(f)}build(t){const e=new Float32Array(this.outCount*3);this.positions(t,e);const n=new ee({weld:!1});for(let r=0;r<this.outCount;r++)n.vertex(e[r*3],e[r*3+1],e[r*3+2]);for(let r=0;r<this.faceCount;r++){const o=this.faceVerts[r],a=Le(t,r),c=t.polygroup[r],l=t.materialId[r],h=o.length,f=new Map;if(a)for(const[u,d]of a)f.set(u,q_(d));for(let u=0;u<h;u++){const d=o[u],p=o[(u+1)%h],v=o[(u-1+h)%h];let g;if(a){g=new Map;for(const[m,x]of a){const y=x[u]??[0,0],_=x[(u+1)%h]??[0,0],S=x[(u-1+h)%h]??[0,0];g.set(m,[y,[(y[0]+_[0])/2,(y[1]+_[1])/2],f.get(m),[(S[0]+y[0])/2,(S[1]+y[1])/2]])}}n.face([d,this.edgePointOf(d,p),this.faceBase+r,this.edgePointOf(v,d)],{uv:g,polygroup:c,materialId:l})}}const s=n.build();for(const[r,o]of t.crease){const a=o-1;if(a<=0)continue;const[c,l]=r.split("_").map(Number),h=this.edgePointOf(c,l);h<0||(s.setCrease(c,h,a),s.setCrease(h,l,a))}for(const[r,o]of t.cornerSharp){const a=o-1;a>0&&s.cornerSharp.set(r,a)}return s}}function dd(i){return new Jc(i).build(i)}function pd(i,t){let e=i;for(let n=0;n<t;n++)e=dd(e);return e}class Qc{vertexCount;vertexFaces=[];faceVerts=[];reference;scratch=new Float32Array(3);constructor(t){this.vertexCount=t.vertexCount;for(let s=0;s<t.faceCount;s++)this.faceVerts.push(t.faceVerts(s));const e=t.vertexFaces(),n=t.vertexNeighbors();this.reference=new Int32Array(this.vertexCount).fill(-1);for(let s=0;s<this.vertexCount;s++){this.vertexFaces.push(e.get(s)??[]);let r=-1;for(const o of n.get(s)??[])(r<0||o<r)&&(r=o);this.reference[s]=r}}affected(t){const e=new Set,n=new Set;for(const s of t)if(!(s<0||s>=this.vertexCount)){n.add(s);for(const r of this.vertexFaces[s])e.add(r)}for(const s of e)for(const r of this.faceVerts[s])n.add(r);return n}write(t,e,n){const s=t.positions,r=this.scratch;r[0]=0,r[1]=0,r[2]=0;for(const g of this.vertexFaces[e]){const m=t.faceNormal(g);r[0]+=m[0],r[1]+=m[1],r[2]+=m[2]}let o=r[0],a=r[1],c=r[2];const l=Math.hypot(o,a,c);l<1e-12?(o=0,a=0,c=1):(o/=l,a/=l,c/=l);const h=this.reference[e];let f=0,u=0,d=0;if(h>=0){f=s[h*3]-s[e*3],u=s[h*3+1]-s[e*3+1],d=s[h*3+2]-s[e*3+2];const g=f*o+u*a+d*c;f-=o*g,u-=a*g,d-=c*g}let p=Math.hypot(f,u,d);if(p<1e-12){const g=Math.abs(o)<.9?1:0,m=Math.abs(o)<.9?0:1;f=m*c,u=-g*c,d=g*a-m*o,p=Math.hypot(f,u,d)||1}f/=p,u/=p,d/=p;const v=e*9;n[v]=f,n[v+1]=u,n[v+2]=d,n[v+3]=a*d-c*u,n[v+4]=c*f-o*d,n[v+5]=o*u-a*f,n[v+6]=o,n[v+7]=a,n[v+8]=c}build(t){const e=new Float32Array(this.vertexCount*9);for(let n=0;n<this.vertexCount;n++)this.write(t,n,e);return e}}function tl(i){return new Qc(i).build(i)}function md(i,t,e=tl(i)){if(i.vertexCount!==t.vertexCount)throw new Error("デルタを取るには頂点数が一致している必要があります");const n=i.vertexCount,s=new Float32Array(n*3);for(let r=0;r<n;r++){const o=t.positions[r*3]-i.positions[r*3],a=t.positions[r*3+1]-i.positions[r*3+1],c=t.positions[r*3+2]-i.positions[r*3+2],l=r*9;s[r*3]=o*e[l]+a*e[l+1]+c*e[l+2],s[r*3+1]=o*e[l+3]+a*e[l+4]+c*e[l+5],s[r*3+2]=o*e[l+6]+a*e[l+7]+c*e[l+8]}return s}function vc(i,t,e,n,s){const r=o=>{const a=o*9,c=n[o*3]??0,l=n[o*3+1]??0,h=n[o*3+2]??0;i.positions[o*3]=t.positions[o*3]+e[a]*c+e[a+3]*l+e[a+6]*h,i.positions[o*3+1]=t.positions[o*3+1]+e[a+1]*c+e[a+4]*l+e[a+7]*h,i.positions[o*3+2]=t.positions[o*3+2]+e[a+2]*c+e[a+5]*l+e[a+8]*h};if(s){for(const o of s)r(o);return}for(let o=0;o<t.vertexCount;o++)r(o)}function Y_(i,t){const e=i.clone();return vc(e,i,tl(i),t),e}function K_(i,t){const e=new gd(i);for(let n=0;n<t.length;n++)e.divide(),e.deltas[n]=t[n];return e.levels()}class gd{constructor(t){this.baseMesh=t}deltas=[];stack=null;get base(){return this.baseMesh}get levelCount(){return this.deltas.length}divide(){this.deltas.push(null),this.stack=null}setBase(t,e){const n=t.vertexCount===this.baseMesh.vertexCount&&t.faceCount===this.baseMesh.faceCount;if(this.baseMesh=t,!e||!this.stack||!n){this.stack=null;return}this.updateFrom(t,e)}updateFrom(t,e){const n=this.stack;if(!n)return;let s=t,r=e;for(let o=0;o<n.length;o++){const a=n[o],c=a.plan.affected(r);a.plan.positions(s,a.smooth.positions,c);const l=this.deltas[o];if(l&&a.frames){const h=a.framePlan.affected(c);for(const f of h)a.framePlan.write(a.smooth,f,a.frames);vc(a.mesh,a.smooth,a.frames,l,h),r=h}else{for(const h of c)a.mesh.positions[h*3]=a.smooth.positions[h*3],a.mesh.positions[h*3+1]=a.smooth.positions[h*3+1],a.mesh.positions[h*3+2]=a.smooth.positions[h*3+2];r=c}s=a.mesh}}rebuild(){const t=[];let e=this.baseMesh;for(let n=0;n<this.deltas.length;n++){const s=new Jc(e),r=s.build(e),o=new Qc(r),a=this.deltas[n],c=a?o.build(r):null,l=r.clone();a&&c&&vc(l,r,c,a),t.push({plan:s,smooth:r,framePlan:o,frames:c,mesh:l}),e=l}return this.stack=t,t}ensure(){return this.stack??this.rebuild()}levels(){return[this.baseMesh,...this.ensure().map(t=>t.mesh)]}level(t){const e=this.levels();return e[Math.max(0,Math.min(e.length-1,t))]}smoothLevel(t){if(t<1||t>this.deltas.length)throw new Error(`レベル ${t} はありません`);return this.ensure()[t-1].smooth}sculpt(t,e){if(t<1||t>this.deltas.length)throw new Error(`レベル ${t} はありません`);const n=this.ensure()[t-1],s=n.frames??n.framePlan.build(n.smooth);this.deltas[t-1]=md(n.smooth,e,s),this.stack=null}dropAbove(t){this.deltas.length=Math.max(0,t),this.stack=null}}function Ur(i,t){return i^=t&255,i=Math.imul(i,16777619),i^=t>>>8&255,i=Math.imul(i,16777619),i^=t>>>16&255,i=Math.imul(i,16777619),i^=t>>>24&255,i=Math.imul(i,16777619),i>>>0}function el(i){let t=2166136261;t=Ur(t,i.vertexCount),t=Ur(t,i.faceCount);for(let e=0;e<i.faceOffsets.length;e++)t=Ur(t,i.faceOffsets[e]);for(let e=0;e<i.faceCorners.length;e++)t=Ur(t,i.faceCorners[e]);return t.toString(16).padStart(8,"0")}function Z_(i,t){if(i.vertexCount!==t.vertexCount)return{same:!1,reason:"vertexCount"};if(i.faceCount!==t.faceCount)return{same:!1,reason:"faceCount"};if(i.faceCorners.length!==t.faceCorners.length)return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceOffsets.length;e++)if(i.faceOffsets[e]!==t.faceOffsets[e])return{same:!1,reason:"faceOrder"};for(let e=0;e<i.faceCorners.length;e++)if(i.faceCorners[e]!==t.faceCorners[e])return{same:!1,reason:"faceOrder"};return{same:!0}}function nl(){return{position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]}}function ti(i){const[t,e,n]=i.position,[s,r,o,a]=i.rotation,[c,l,h]=i.scale;return{position:[t,e,n],rotation:[s,r,o,a],scale:[c,l,h]}}class ao{id;name;kind;parametric;params;transform;mesh;multires=[];sculptLayers=[];paintLayers=[];activeLevel=0;visible=!0;exportedTopologyHash=null;uv=null;constructor(t,e,n){this.id=e,this.kind=t;const s=Sn[t];this.name=n??(s?s.en.replace(/\s/g,""):"mesh")+e,this.parametric=!!s,this.params=io(t),this.transform=nl(),this.mesh=s?s.build(this.params):Vi.empty()}rebuild(){if(!this.parametric)return;const t=Sn[this.kind];t&&(this.mesh=t.build(this.params))}markTopologyChanged(){const t=this.multires.length,e=this.sculptLayers.length;this.parametric=!1,this.multires=[],this.sculptLayers=[],this.activeLevel=0;const n=this.uv?sd(this.uv,this.mesh):{droppedSeams:0,droppedIslands:0,rebased:!1};return{droppedLevels:t,droppedLayers:e,...n}}topologyHash(){return el(this.mesh)}hasUv(){return this.mesh.uvSets.size>0}}class il{objects=[];settings={};cameraBookmarks=[];nextId=1;newId(){return String(this.nextId++)}addObject(t){const e=new ao(t,this.newId());return this.objects.push(e),e}addMesh(t,e){const n=new ao("mesh",this.newId(),e);return n.parametric=!1,n.mesh=t,this.objects.push(n),n}remove(t){const e=this.objects.indexOf(t);e>=0&&this.objects.splice(e,1)}find(t){return this.objects.find(e=>e.id===t)}syncIdCounter(){let t=0;for(const e of this.objects){const n=Number(e.id);Number.isFinite(n)&&n>t&&(t=n)}this.nextId=t+1}stats(){let t=0,e=0,n=0;for(const s of this.objects){const r=s.mesh.stats();t+=r.vertices,e+=r.faces,n+=r.triangles}return{objects:this.objects.length,vertices:t,faces:e,triangles:n}}}function vd(i){const t=[],e=[],n=[];let s=null,r="mesh",o=new Map,a=!1,c=0;const l=new Map,h=()=>{s&&s.faceCount>0&&n.push({name:r,mesh:s.build()}),s=null,o=new Map,a=!1},f=()=>(s||(s=new ee({weld:!1})),s);for(const u of i.split(/\r?\n/)){const d=u.trim();if(!d||d.startsWith("#"))continue;const p=d.split(/\s+/),v=p[0];if(v==="v")t.push([Number(p[1]),Number(p[2]),Number(p[3])]);else if(v==="vt")e.push([Number(p[1]),Number(p[2]??0)]);else if(v==="o")h(),r=p.slice(1).join("_")||"mesh";else if(v==="g"){const g=p.slice(1).join("_")||"default";let m=l.get(g);m===void 0&&(m=l.size,l.set(g,m)),c=m,r==="mesh"&&!s&&(r=g)}else if(v==="f"){const g=f(),m=[],x=[];for(let y=1;y<p.length;y++){const _=p[y].split("/");let S=parseInt(_[0],10);if(!Number.isFinite(S))continue;S<0&&(S=t.length+S+1);let w=o.get(S);if(w===void 0){const M=t[S-1];if(!M)continue;w=g.vertex(M[0],M[1],M[2]),o.set(S,w)}if(m.includes(w))continue;m.push(w);let A=_[1]?parseInt(_[1],10):NaN;if(Number.isFinite(A)){A<0&&(A=e.length+A+1);const M=e[A-1];M?(x.push(M),a=!0):x.push([0,0])}else x.push([0,0])}m.length>=3&&g.face(m,{uv:a?new Map([["map1",x]]):void 0,polygroup:c})}}return h(),n}function xd(i){const t=["# macbeth"];let e=1,n=1;for(const s of i){const{mesh:r}=s;t.push(`o ${s.name.replace(/\s+/g,"_")}`);for(let l=0;l<r.vertexCount;l++){const h=r.getPosition(l),f=s.toWorld?s.toWorld(h[0],h[1],h[2]):h;t.push(`v ${f[0].toFixed(6)} ${f[1].toFixed(6)} ${f[2].toFixed(6)}`)}const o=r.uvSets.get("map1")??r.uvSets.values().next().value??null;if(o)for(let l=0;l<r.cornerCount;l++)t.push(`vt ${o[l*2].toFixed(6)} ${o[l*2+1].toFixed(6)}`);const a=new Map;for(let l=0;l<r.faceCount;l++){const h=r.polygroup[l],f=a.get(h);f?f.push(l):a.set(h,[l])}const c=a.size<=1;for(const[l,h]of a){c||t.push(`g group${l}`);for(const f of h){const u=[];for(let d=r.faceOffsets[f];d<r.faceOffsets[f+1];d++){const p=r.faceCorners[d]+e;u.push(o?`${p}/${d+n}`:`${p}`)}t.push(`f ${u.join(" ")}`)}}e+=r.vertexCount,o&&(n+=r.cornerCount)}return t.join(`
`)+`
`}function j_(i,t){const e=i.faceNormals(),n=i.uvSets.get(Ee)??null,s=Math.cos(Math.max(0,Math.min(180,t))*Math.PI/180),r=new Float32Array(i.vertexCount*3);for(let u=0;u<i.faceCount;u++)for(let d=i.faceOffsets[u];d<i.faceOffsets[u+1];d++){const p=i.faceCorners[d];r[p*3]+=e[u*3],r[p*3+1]+=e[u*3+1],r[p*3+2]+=e[u*3+2]}for(let u=0;u<i.vertexCount;u++){const d=Math.hypot(r[u*3],r[u*3+1],r[u*3+2])||1;r[u*3]/=d,r[u*3+1]/=d,r[u*3+2]/=d}const o=[],a=[],c=[],l=[],h=new Map,f=u=>{const d=J_(i,u),p=i.faceCorners[u],m=e[d*3]*r[p*3]+e[d*3+1]*r[p*3+1]+e[d*3+2]*r[p*3+2]<s?[e[d*3],e[d*3+1],e[d*3+2]]:[r[p*3],r[p*3+1],r[p*3+2]],x=n?[n[u*2],n[u*2+1]]:[0,0],y=`${p}|${m[0].toFixed(4)},${m[1].toFixed(4)},${m[2].toFixed(4)}|${x[0].toFixed(6)},${x[1].toFixed(6)}`,_=h.get(y);if(_!==void 0)return _;const S=o.length/3;return o.push(i.positions[p*3],i.positions[p*3+1],i.positions[p*3+2]),a.push(m[0],m[1],m[2]),c.push(x[0],x[1]),h.set(y,S),S};for(let u=0;u<i.faceCount;u++){const d=i.faceOffsets[u],p=i.faceOffsets[u+1];for(let v=d+1;v<p-1;v++)l.push(f(d),f(v),f(v+1))}return{position:Float32Array.from(o),normal:Float32Array.from(a),uv:n?Float32Array.from(c):null,index:Uint32Array.from(l)}}function J_(i,t){let e=0,n=i.faceCount-1;for(;e<n;){const s=e+n+1>>1;i.faceOffsets[s]<=t?e=s:n=s-1}return e}function Oh(i){return i+3&-4}function _d(i,t={}){const e=t.smoothAngle??30,n=[];let s=0;const r=[],o=[],a=(_,S)=>{const w=Oh(_.byteLength),A=new Uint8Array(w);A.set(_),n.push(A);const M={buffer:0,byteOffset:s,byteLength:_.byteLength};return S!==void 0&&(M.target=S),r.push(M),s+=w,r.length-1},c=(_,S,w,A)=>{const M=a(new Uint8Array(_.buffer,_.byteOffset,_.byteLength),A),E=S==="SCALAR"?1:S==="VEC2"?2:3,P=_.length/E,C=new Array(E).fill(1/0),I=new Array(E).fill(-1/0);for(let V=0;V<P;V++)for(let O=0;O<E;O++){const D=_[V*E+O];D<C[O]&&(C[O]=D),D>I[O]&&(I[O]=D)}return o.push({bufferView:M,componentType:w,count:P,type:S,min:C,max:I}),o.length-1},l=[],h=[];i.forEach(_=>{const S=j_(_.mesh,e),w={POSITION:c(S.position,"VEC3",5126,34962),NORMAL:c(S.normal,"VEC3",5126,34962)};S.uv&&(w.TEXCOORD_0=c(S.uv,"VEC2",5126,34962));const A=c(S.index,"SCALAR",5125,34963);l.push({name:_.name,primitives:[{attributes:w,indices:A,material:0,mode:4}]}),h.push({name:_.name,mesh:l.length-1,translation:_.position,rotation:_.rotation,scale:_.scale})});const f={asset:{version:"2.0",generator:t.generator??"macbeth"},scene:0,scenes:[{nodes:h.map((_,S)=>S)}],nodes:h,meshes:l,materials:[{name:"macbeth",pbrMetallicRoughness:{baseColorFactor:[.75,.78,.81,1],metallicFactor:0,roughnessFactor:.7},doubleSided:!0}],accessors:o,bufferViews:r,buffers:[{byteLength:s}]};let d=new TextEncoder().encode(JSON.stringify(f));const p=Oh(d.byteLength);if(p!==d.byteLength){const _=new Uint8Array(p).fill(32);_.set(d),d=_}const v=s,g=20+d.byteLength+(v?8+v:0),m=new Uint8Array(g),x=new DataView(m.buffer);let y=0;if(x.setUint32(y,1179937895,!0),x.setUint32(y+4,2,!0),x.setUint32(y+8,g,!0),y+=12,x.setUint32(y,d.byteLength,!0),x.setUint32(y+4,1313821514,!0),y+=8,m.set(d,y),y+=d.byteLength,v){x.setUint32(y,v,!0),x.setUint32(y+4,5130562,!0),y+=8;for(const _ of n)m.set(_,y),y+=_.byteLength}return m}function Md(i){return i.filter(t=>t.visible&&t.mesh.faceCount>0).map(t=>({name:t.name,mesh:t.mesh,position:[...t.transform.position],rotation:[...t.transform.rotation],scale:[...t.transform.scale]}))}const yd="MBMESH\0\0",sl=1;function xc(i){return i+3&-4}function Q_(i){let t=16;for(const r of i)t+=8+xc(r.data.byteLength);const e=new Uint8Array(t),n=new DataView(e.buffer);for(let r=0;r<8;r++)e[r]=yd.charCodeAt(r);n.setUint32(8,sl,!0),n.setUint32(12,i.length,!0);let s=16;for(const r of i){for(let o=0;o<4;o++)e[s+o]=r.tag.charCodeAt(o);n.setUint32(s+4,r.data.byteLength,!0),e.set(r.data,s+8),s+=8+xc(r.data.byteLength)}return e}function tM(i){for(let o=0;o<8;o++)if(i[o]!==yd.charCodeAt(o))throw new Error("メッシュのバイナリ形式ではありません");const t=new DataView(i.buffer,i.byteOffset,i.byteLength),e=t.getUint32(8,!0),n=t.getUint32(12,!0),s=new Map;let r=16;for(let o=0;o<n;o++){let a="";for(let l=0;l<4;l++)a+=String.fromCharCode(i[r+l]);const c=t.getUint32(r+4,!0);s.set(a,i.subarray(r+8,r+8+c)),r+=8+xc(c)}return{version:e,chunks:s}}function vn(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Nr(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Fr(i){return new Uint32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function kh(i){return new Uint16Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}const eM=new TextEncoder,nM=new TextDecoder;function bd(i){const t=[{tag:"POSI",data:vn(i.positions)},{tag:"FOFF",data:vn(i.faceOffsets)},{tag:"FCOR",data:vn(i.faceCorners)}];if(i.polygroup.some(e=>e!==0)&&t.push({tag:"PGRP",data:vn(i.polygroup)}),i.materialId.some(e=>e!==0)&&t.push({tag:"MTID",data:vn(i.materialId)}),i.vertexColor&&t.push({tag:"VCOL",data:vn(i.vertexColor)}),i.crease.size){const e=new Uint32Array(i.crease.size*2),n=new Float32Array(i.crease.size);let s=0;for(const[r,o]of i.crease){const[a,c]=r.split("_").map(Number);e[s*2]=a,e[s*2+1]=c,n[s]=o,s++}t.push({tag:"CRID",data:vn(e)},{tag:"CRSH",data:vn(n)})}if(i.cornerSharp.size){const e=new Uint32Array(i.cornerSharp.size),n=new Float32Array(i.cornerSharp.size);let s=0;for(const[r,o]of i.cornerSharp)e[s]=r,n[s]=o,s++;t.push({tag:"CNID",data:vn(e)},{tag:"CNSH",data:vn(n)})}if(i.uvSets.size){const e=Array.from(i.uvSets.keys());t.push({tag:"UVNM",data:eM.encode(JSON.stringify(e))}),e.forEach((n,s)=>{t.push({tag:`UV${String(s).padStart(2,"0")}`,data:vn(i.uvSets.get(n))})})}return Q_(t)}function Sd(i){const{version:t,chunks:e}=tM(i);if(t>sl)throw new Error(`このメッシュは新しい版 (v${t}) で保存されています。アプリを更新してください`);const n=Nr(e.get("POSI")),s=Fr(e.get("FOFF")),r=Fr(e.get("FCOR")),o=new Map,a=e.get("UVNM");a&&JSON.parse(nM.decode(a)).forEach((y,_)=>{const S=e.get(`UV${String(_).padStart(2,"0")}`);S&&o.set(y,Nr(S))});const c=new Map,l=e.get("CRID"),h=e.get("CRSH");if(l&&h){const x=Fr(l),y=Nr(h);for(let _=0;_<y.length;_++){const S=x[_*2],w=x[_*2+1];c.set(S<w?`${S}_${w}`:`${w}_${S}`,y[_])}}const f=new Map,u=e.get("CNID"),d=e.get("CNSH");if(u&&d){const x=Fr(u),y=Nr(d);for(let _=0;_<y.length;_++)f.set(x[_],y[_])}const p=Math.max(0,s.length-1),v=e.get("PGRP"),g=e.get("MTID"),m=e.get("VCOL");return new Vi(n,s,r,{uvSets:o,crease:c,cornerSharp:f,polygroup:v?kh(v):new Uint16Array(p),materialId:g?kh(g):new Uint16Array(p),vertexColor:m?new Uint8Array(m):null})}var ve=Uint8Array,on=Uint16Array,rl=Int32Array,mo=new ve([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),go=new ve([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),_c=new ve([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),wd=function(i,t){for(var e=new on(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new rl(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)s[r]=r-e[n]<<5|n;return{b:e,r:s}},Ed=wd(mo,2),Td=Ed.b,Mc=Ed.r;Td[28]=258,Mc[258]=28;var Ad=wd(go,0),iM=Ad.b,Bh=Ad.r,yc=new on(32768);for(var le=0;le<32768;++le){var mi=(le&43690)>>1|(le&21845)<<1;mi=(mi&52428)>>2|(mi&13107)<<2,mi=(mi&61680)>>4|(mi&3855)<<4,yc[le]=((mi&65280)>>8|(mi&255)<<8)>>1}var Hn=(function(i,t,e){for(var n=i.length,s=0,r=new on(t);s<n;++s)i[s]&&++r[i[s]-1];var o=new on(t);for(s=1;s<t;++s)o[s]=o[s-1]+r[s-1]<<1;var a;if(e){a=new on(1<<t);var c=15-t;for(s=0;s<n;++s)if(i[s])for(var l=s<<4|i[s],h=t-i[s],f=o[i[s]-1]++<<h,u=f|(1<<h)-1;f<=u;++f)a[yc[f]>>c]=l}else for(a=new on(n),s=0;s<n;++s)i[s]&&(a[s]=yc[o[i[s]-1]++]>>15-i[s]);return a}),Mi=new ve(288);for(var le=0;le<144;++le)Mi[le]=8;for(var le=144;le<256;++le)Mi[le]=9;for(var le=256;le<280;++le)Mi[le]=7;for(var le=280;le<288;++le)Mi[le]=8;var Ks=new ve(32);for(var le=0;le<32;++le)Ks[le]=5;var sM=Hn(Mi,9,0),rM=Hn(Mi,9,1),oM=Hn(Ks,5,0),aM=Hn(Ks,5,1),ia=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},xn=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},sa=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},ol=function(i){return(i+7)/8|0},sr=function(i,t,e){return(t==null||t<0)&&(t=0),(e==null||e>i.length)&&(e=i.length),new ve(i.subarray(t,e))},cM=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ze=function(i,t,e){var n=new Error(t||cM[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,ze),!e)throw n;return n},lM=function(i,t,e,n){var s=i.length,r=n?n.length:0;if(!s||t.f&&!t.l)return e||new ve(0);var o=!e,a=o||t.i!=2,c=t.i;o&&(e=new ve(s*3));var l=function(Rt){var ie=e.length;if(Rt>ie){var kt=new ve(Math.max(ie*2,Rt));kt.set(e),e=kt}},h=t.f||0,f=t.p||0,u=t.b||0,d=t.l,p=t.d,v=t.m,g=t.n,m=s*8;do{if(!d){h=xn(i,f,1);var x=xn(i,f+1,3);if(f+=3,x)if(x==1)d=rM,p=aM,v=9,g=5;else if(x==2){var w=xn(i,f,31)+257,A=xn(i,f+10,15)+4,M=w+xn(i,f+5,31)+1;f+=14;for(var E=new ve(M),P=new ve(19),C=0;C<A;++C)P[_c[C]]=xn(i,f+C*3,7);f+=A*3;for(var I=ia(P),V=(1<<I)-1,O=Hn(P,I,1),C=0;C<M;){var D=O[xn(i,f,V)];f+=D&15;var y=D>>4;if(y<16)E[C++]=y;else{var z=0,N=0;for(y==16?(N=3+xn(i,f,3),f+=2,z=E[C-1]):y==17?(N=3+xn(i,f,7),f+=3):y==18&&(N=11+xn(i,f,127),f+=7);N--;)E[C++]=z}}var q=E.subarray(0,w),j=E.subarray(w);v=ia(q),g=ia(j),d=Hn(q,v,1),p=Hn(j,g,1)}else ze(1);else{var y=ol(f)+4,_=i[y-4]|i[y-3]<<8,S=y+_;if(S>s){c&&ze(0);break}a&&l(u+_),e.set(i.subarray(y,S),u),t.b=u+=_,t.p=f=S*8,t.f=h;continue}if(f>m){c&&ze(0);break}}a&&l(u+131072);for(var it=(1<<v)-1,tt=(1<<g)-1,ot=f;;ot=f){var z=d[sa(i,f)&it],At=z>>4;if(f+=z&15,f>m){c&&ze(0);break}if(z||ze(2),At<256)e[u++]=At;else if(At==256){ot=f,d=null;break}else{var Ft=At-254;if(At>264){var C=At-257,Ct=mo[C];Ft=xn(i,f,(1<<Ct)-1)+Td[C],f+=Ct}var K=p[sa(i,f)&tt],rt=K>>4;K||ze(3),f+=K&15;var j=iM[rt];if(rt>3){var Ct=go[rt];j+=sa(i,f)&(1<<Ct)-1,f+=Ct}if(f>m){c&&ze(0);break}a&&l(u+131072);var nt=u+Ft;if(u<j){var Lt=r-j,Nt=Math.min(j,nt);for(Lt+u<0&&ze(3);u<Nt;++u)e[u]=n[Lt+u]}for(;u<nt;++u)e[u]=e[u-j]}}t.l=d,t.p=ot,t.b=u,t.f=h,d&&(h=1,t.m=v,t.d=p,t.n=g)}while(!h);return u!=e.length&&o?sr(e,0,u):e.subarray(0,u)},jn=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8},Is=function(i,t,e){e<<=t&7;var n=t/8|0;i[n]|=e,i[n+1]|=e>>8,i[n+2]|=e>>16},ra=function(i,t){for(var e=[],n=0;n<i.length;++n)i[n]&&e.push({s:n,f:i[n]});var s=e.length,r=e.slice();if(!s)return{t:Rd,l:0};if(s==1){var o=new ve(e[0].s+1);return o[e[0].s]=1,{t:o,l:1}}e.sort(function(S,w){return S.f-w.f}),e.push({s:-1,f:25001});var a=e[0],c=e[1],l=0,h=1,f=2;for(e[0]={s:-1,f:a.f+c.f,l:a,r:c};h!=s-1;)a=e[e[l].f<e[f].f?l++:f++],c=e[l!=h&&e[l].f<e[f].f?l++:f++],e[h++]={s:-1,f:a.f+c.f,l:a,r:c};for(var u=r[0].s,n=1;n<s;++n)r[n].s>u&&(u=r[n].s);var d=new on(u+1),p=bc(e[h-1],d,0);if(p>t){var n=0,v=0,g=p-t,m=1<<g;for(r.sort(function(w,A){return d[A.s]-d[w.s]||w.f-A.f});n<s;++n){var x=r[n].s;if(d[x]>t)v+=m-(1<<p-d[x]),d[x]=t;else break}for(v>>=g;v>0;){var y=r[n].s;d[y]<t?v-=1<<t-d[y]++-1:++n}for(;n>=0&&v;--n){var _=r[n].s;d[_]==t&&(--d[_],++v)}p=t}return{t:new ve(d),l:p}},bc=function(i,t,e){return i.s==-1?Math.max(bc(i.l,t,e+1),bc(i.r,t,e+1)):t[i.s]=e},zh=function(i){for(var t=i.length;t&&!i[--t];);for(var e=new on(++t),n=0,s=i[0],r=1,o=function(c){e[n++]=c},a=1;a<=t;++a)if(i[a]==s&&a!=t)++r;else{if(!s&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(s),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(s);r=1,s=i[a]}return{c:e.subarray(0,n),n:t}},Ls=function(i,t){for(var e=0,n=0;n<t.length;++n)e+=i[n]*t[n];return e},Cd=function(i,t,e){var n=e.length,s=ol(t+2);i[s]=n&255,i[s+1]=n>>8,i[s+2]=i[s]^255,i[s+3]=i[s+1]^255;for(var r=0;r<n;++r)i[s+r+4]=e[r];return(s+4+n)*8},Vh=function(i,t,e,n,s,r,o,a,c,l,h){jn(t,h++,e),++s[256];for(var f=ra(s,15),u=f.t,d=f.l,p=ra(r,15),v=p.t,g=p.l,m=zh(u),x=m.c,y=m.n,_=zh(v),S=_.c,w=_.n,A=new on(19),M=0;M<x.length;++M)++A[x[M]&31];for(var M=0;M<S.length;++M)++A[S[M]&31];for(var E=ra(A,7),P=E.t,C=E.l,I=19;I>4&&!P[_c[I-1]];--I);var V=l+5<<3,O=Ls(s,Mi)+Ls(r,Ks)+o,D=Ls(s,u)+Ls(r,v)+o+14+3*I+Ls(A,P)+2*A[16]+3*A[17]+7*A[18];if(c>=0&&V<=O&&V<=D)return Cd(t,h,i.subarray(c,c+l));var z,N,q,j;if(jn(t,h,1+(D<O)),h+=2,D<O){z=Hn(u,d,0),N=u,q=Hn(v,g,0),j=v;var it=Hn(P,C,0);jn(t,h,y-257),jn(t,h+5,w-1),jn(t,h+10,I-4),h+=14;for(var M=0;M<I;++M)jn(t,h+3*M,P[_c[M]]);h+=3*I;for(var tt=[x,S],ot=0;ot<2;++ot)for(var At=tt[ot],M=0;M<At.length;++M){var Ft=At[M]&31;jn(t,h,it[Ft]),h+=P[Ft],Ft>15&&(jn(t,h,At[M]>>5&127),h+=At[M]>>12)}}else z=sM,N=Mi,q=oM,j=Ks;for(var M=0;M<a;++M){var Ct=n[M];if(Ct>255){var Ft=Ct>>18&31;Is(t,h,z[Ft+257]),h+=N[Ft+257],Ft>7&&(jn(t,h,Ct>>23&31),h+=mo[Ft]);var K=Ct&31;Is(t,h,q[K]),h+=j[K],K>3&&(Is(t,h,Ct>>5&8191),h+=go[K])}else Is(t,h,z[Ct]),h+=N[Ct]}return Is(t,h,z[256]),h+N[256]},hM=new rl([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Rd=new ve(0),uM=function(i,t,e,n,s,r){var o=r.z||i.length,a=new ve(n+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(n,a.length-s),l=r.l,h=(r.r||0)&7;if(t){h&&(c[0]=r.r>>3);for(var f=hM[t-1],u=f>>13,d=f&8191,p=(1<<e)-1,v=r.p||new on(32768),g=r.h||new on(p+1),m=Math.ceil(e/3),x=2*m,y=function(jt){return(i[jt]^i[jt+1]<<m^i[jt+2]<<x)&p},_=new rl(25e3),S=new on(288),w=new on(32),A=0,M=0,E=r.i||0,P=0,C=r.w||0,I=0;E+2<o;++E){var V=y(E),O=E&32767,D=g[V];if(v[O]=D,g[V]=O,C<=E){var z=o-E;if((A>7e3||P>24576)&&(z>423||!l)){h=Vh(i,c,0,_,S,w,M,P,I,E-I,h),P=A=M=0,I=E;for(var N=0;N<286;++N)S[N]=0;for(var N=0;N<30;++N)w[N]=0}var q=2,j=0,it=d,tt=O-D&32767;if(z>2&&V==y(E-tt))for(var ot=Math.min(u,z)-1,At=Math.min(32767,E),Ft=Math.min(258,z);tt<=At&&--it&&O!=D;){if(i[E+q]==i[E+q-tt]){for(var Ct=0;Ct<Ft&&i[E+Ct]==i[E+Ct-tt];++Ct);if(Ct>q){if(q=Ct,j=tt,Ct>ot)break;for(var K=Math.min(tt,Ct-2),rt=0,N=0;N<K;++N){var nt=E-tt+N&32767,Lt=v[nt],Nt=nt-Lt&32767;Nt>rt&&(rt=Nt,D=nt)}}}O=D,D=v[O],tt+=O-D&32767}if(j){_[P++]=268435456|Mc[q]<<18|Bh[j];var Rt=Mc[q]&31,ie=Bh[j]&31;M+=mo[Rt]+go[ie],++S[257+Rt],++w[ie],C=E+q,++A}else _[P++]=i[E],++S[i[E]]}}for(E=Math.max(E,C);E<o;++E)_[P++]=i[E],++S[i[E]];h=Vh(i,c,l,_,S,w,M,P,I,E-I,h),l||(r.r=h&7|c[h/8|0]<<3,h-=7,r.h=g,r.p=v,r.i=E,r.w=C)}else{for(var E=r.w||0;E<o+l;E+=65535){var kt=E+65535;kt>=o&&(c[h/8|0]=l,kt=o),h=Cd(c,h+1,i.subarray(E,kt))}r.i=o}return sr(a,0,n+ol(h)+s)},fM=(function(){for(var i=new Int32Array(256),t=0;t<256;++t){for(var e=t,n=9;--n;)e=(e&1&&-306674912)^e>>>1;i[t]=e}return i})(),dM=function(){var i=-1;return{p:function(t){for(var e=i,n=0;n<t.length;++n)e=fM[e&255^t[n]]^e>>>8;i=e},d:function(){return~i}}},pM=function(i,t,e,n,s){if(!s&&(s={l:1},t.dictionary)){var r=t.dictionary.subarray(-32768),o=new ve(r.length+i.length);o.set(r),o.set(i,r.length),i=o,s.w=r.length}return uM(i,t.level==null?6:t.level,t.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+t.mem,e,n,s)},Pd=function(i,t){var e={};for(var n in i)e[n]=i[n];for(var n in t)e[n]=t[n];return e},Nn=function(i,t){return i[t]|i[t+1]<<8},un=function(i,t){return(i[t]|i[t+1]<<8|i[t+2]<<16|i[t+3]<<24)>>>0},oa=function(i,t){return un(i,t)+un(i,t+4)*4294967296},Ue=function(i,t,e){for(;e;++t)i[t]=e,e>>>=8};function mM(i,t){return pM(i,t||{},0,0)}function gM(i,t){return lM(i,{i:2},t&&t.out,t&&t.dictionary)}var Id=function(i,t,e,n){for(var s in i){var r=i[s],o=t+s,a=n;Array.isArray(r)&&(a=Pd(n,r[1]),r=r[0]),ArrayBuffer.isView(r)?e[o]=[r,a]:(e[o+="/"]=[new ve(0),a],Id(r,o,e,n))}},Hh=typeof TextEncoder<"u"&&new TextEncoder,Sc=typeof TextDecoder<"u"&&new TextDecoder,vM=0;try{Sc.decode(Rd,{stream:!0}),vM=1}catch{}var xM=function(i){for(var t="",e=0;;){var n=i[e++],s=(n>127)+(n>223)+(n>239);if(e+s>i.length)return{s:t,r:sr(i,e-1)};s?s==3?(n=((n&15)<<18|(i[e++]&63)<<12|(i[e++]&63)<<6|i[e++]&63)-65536,t+=String.fromCharCode(55296|n>>10,56320|n&1023)):s&1?t+=String.fromCharCode((n&31)<<6|i[e++]&63):t+=String.fromCharCode((n&15)<<12|(i[e++]&63)<<6|i[e++]&63):t+=String.fromCharCode(n)}};function Gh(i,t){var e;if(Hh)return Hh.encode(i);for(var n=i.length,s=new ve(i.length+(i.length>>1)),r=0,o=function(l){s[r++]=l},e=0;e<n;++e){if(r+5>s.length){var a=new ve(r+8+(n-e<<1));a.set(s),s=a}var c=i.charCodeAt(e);c<128||t?o(c):c<2048?(o(192|c>>6),o(128|c&63)):c>55295&&c<57344?(c=65536+(c&1047552)|i.charCodeAt(++e)&1023,o(240|c>>18),o(128|c>>12&63),o(128|c>>6&63),o(128|c&63)):(o(224|c>>12),o(128|c>>6&63),o(128|c&63))}return sr(s,0,r)}function _M(i,t){if(t){for(var e="",n=0;n<i.length;n+=16384)e+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return e}else{if(Sc)return Sc.decode(i);var s=xM(i),r=s.s,e=s.r;return e.length&&ze(8),r}}var MM=function(i,t){return t+30+Nn(i,t+26)+Nn(i,t+28)},yM=function(i,t,e){var n=Nn(i,t+28),s=Nn(i,t+30),r=_M(i.subarray(t+46,t+46+n),!(Nn(i,t+8)&2048)),o=t+46+n,a=bM(i,o,s,e,un(i,t+20),un(i,t+24),un(i,t+42)),c=a[0],l=a[1],h=a[2];return[Nn(i,t+10),c,l,r,o+s+Nn(i,t+32),h]},bM=function(i,t,e,n,s,r,o){var a=s==4294967295,c=r==4294967295,l=o==4294967295,h=t+e,f=a+c+l;if(n&&f){for(;t+4<h;t+=4+Nn(i,t+2))if(Nn(i,t)==1)return[a?oa(i,t+4+8*c):s,c?oa(i,t+4):r,l?oa(i,t+4+8*(c+a)):o,1];n<2&&ze(13)}return[s,r,o,0]},wc=function(i){var t=0;if(i)for(var e in i){var n=i[e].length;n>65535&&ze(9),t+=n+4}return t},Wh=function(i,t,e,n,s,r,o,a){var c=n.length,l=e.extra,h=a&&a.length,f=wc(l);Ue(i,t,o!=null?33639248:67324752),t+=4,o!=null&&(i[t++]=20,i[t++]=e.os),i[t]=20,t+=2,i[t++]=e.flag<<1|(r<0&&8),i[t++]=s&&8,i[t++]=e.compression&255,i[t++]=e.compression>>8;var u=new Date(e.mtime==null?Date.now():e.mtime),d=u.getFullYear()-1980;if((d<0||d>119)&&ze(10),Ue(i,t,d<<25|u.getMonth()+1<<21|u.getDate()<<16|u.getHours()<<11|u.getMinutes()<<5|u.getSeconds()>>1),t+=4,r!=-1&&(Ue(i,t,e.crc),Ue(i,t+4,r<0?-r-2:r),Ue(i,t+8,e.size)),Ue(i,t+12,c),Ue(i,t+14,f),t+=16,o!=null&&(Ue(i,t,h),Ue(i,t+6,e.attrs),Ue(i,t+10,o),t+=14),i.set(n,t),t+=c,f)for(var p in l){var v=l[p],g=v.length;Ue(i,t,+p),Ue(i,t+2,g),i.set(v,t+4),t+=4+g}return h&&(i.set(a,t),t+=h),t},SM=function(i,t,e,n,s){Ue(i,t,101010256),Ue(i,t+8,e),Ue(i,t+10,e),Ue(i,t+12,n),Ue(i,t+16,s)};function wM(i,t){t||(t={});var e={},n=[];Id(i,"",e,t);var s=0,r=0;for(var o in e){var a=e[o],c=a[0],l=a[1],h=l.level==0?0:8,f=Gh(o),u=f.length,d=l.comment,p=d&&Gh(d),v=p&&p.length,g=wc(l.extra);u>65535&&ze(11);var m=h?mM(c,l):c,x=m.length,y=dM();y.p(c),n.push(Pd(l,{size:c.length,crc:y.d(),c:m,f,m:p,u:u!=o.length||p&&d.length!=v,o:s,compression:h})),s+=30+u+g+x,r+=76+2*(u+g)+(v||0)+x}for(var _=new ve(r+22),S=s,w=r-s,A=0;A<n.length;++A){var f=n[A];Wh(_,f.o,f,f.f,f.u,f.c.length);var M=30+f.f.length+wc(f.extra);_.set(f.c,f.o+M),Wh(_,s,f,f.f,f.u,f.c.length,f.o,f.m),s+=16+M+(f.m?f.m.length:0)}return SM(_,s,n.length,w,S),_}function EM(i,t){for(var e={},n=i.length-22;un(i,n)!=101010256;--n)(!n||i.length-n>65558)&&ze(13);var s=Nn(i,n+8);if(!s)return{};var r=un(i,n+16),o=un(i,n-20)==117853008;if(o){var a=un(i,n-12);o=un(i,a)==101075792,o&&(s=un(i,a+32),r=un(i,a+48))}for(var c=0;c<s;++c){var l=yM(i,r,o),h=l[0],f=l[1],u=l[2],d=l[3],p=l[4],v=l[5],g=MM(i,v);r=p,h?h==8?e[d]=gM(i.subarray(g,g+f),{out:new ve(u)}):ze(14,"unknown compression type "+h):e[d]=sr(i,g,g+f)}return e}const Zs=1,Xh=new TextEncoder,$h=new TextDecoder;function qh(i){return new Uint8Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Yh(i){return new Float32Array(i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength))}function Ld(i,t={}){const e={},n=new Date().toISOString(),s={objects:i.objects.map(o=>{e[`meshes/${o.id}.bin`]=bd(o.mesh);for(const a of o.multires)e[`multires/${o.id}/L${a.level}.bin`]=qh(a.delta);for(const a of o.sculptLayers)e[`layers/${o.id}/${a.id}.bin`]=qh(a.delta);return{id:o.id,name:o.name,kind:o.kind,parametric:o.parametric,params:o.params,transform:o.transform,visible:o.visible,activeLevel:o.activeLevel,exportedTopologyHash:o.exportedTopologyHash,multires:o.multires.map(a=>({level:a.level,count:a.delta.length})),sculptLayers:o.sculptLayers.map(a=>({id:a.id,name:a.name,level:a.level,weight:a.weight,visible:a.visible,count:a.delta.length})),paintLayers:o.paintLayers,uv:o.uv?rd(o.uv):null}}),settings:i.settings,cameraBookmarks:i.cameraBookmarks},r={formatVersion:Zs,app:"macbeth",appVersion:t.appVersion??"0.1.0",created:n,modified:n};if(t.thumbnail&&(e["thumbnail.png"]=t.thumbnail,r.thumbnail="thumbnail.png"),t.extraFiles)for(const[o,a]of t.extraFiles)e[o]=a;return e["manifest.json"]=Xh.encode(JSON.stringify(r,null,2)),e["scene.json"]=Xh.encode(JSON.stringify(s)),wM(e,{level:6})}const TM={};function AM(i,t,e){let n=i;for(let s=e;s<Zs;s++){const r=TM[s];if(!r)throw new Error(`版 ${s} から ${s+1} への変換がありません`);n=r(n,t)}return n}function Dd(i){const t=EM(i),e=t["manifest.json"];if(!e)throw new Error("manifest.json がありません。macbeth のプロジェクトではないようです");const n=JSON.parse($h.decode(e));if(n.formatVersion>Zs)throw new Error(`このプロジェクトは新しい版 (v${n.formatVersion}) で保存されています。アプリを更新してください`);let s=JSON.parse($h.decode(t["scene.json"]));n.formatVersion<Zs&&(s=AM(s,t,n.formatVersion));const r=new il;r.settings=s.settings??{},r.cameraBookmarks=s.cameraBookmarks??[];const o=new Set(["manifest.json","scene.json"]);for(const c of s.objects){const l=new ao(c.kind,c.id,c.name);l.parametric=c.parametric,l.params=c.params,l.transform=c.transform??nl(),l.visible=c.visible??!0,l.activeLevel=c.activeLevel??0,l.exportedTopologyHash=c.exportedTopologyHash??null;const h=`meshes/${c.id}.bin`,f=t[h];if(!f)throw new Error(`${c.name} のメッシュ (${h}) がありません`);l.mesh=Sd(f),o.add(h),l.multires=(c.multires??[]).map(u=>{const d=`multires/${c.id}/L${u.level}.bin`,p=t[d];return p?(o.add(d),{level:u.level,delta:Yh(p)}):null}).filter(u=>u!==null),l.sculptLayers=(c.sculptLayers??[]).map(u=>{const d=`layers/${c.id}/${u.id}.bin`,p=t[d];return p?(o.add(d),{id:u.id,name:u.name,level:u.level,weight:u.weight,visible:u.visible,delta:Yh(p)}):null}).filter(u=>u!==null),l.paintLayers=c.paintLayers??[],l.uv=od(c.uv),r.objects.push(l)}r.syncIdCounter();const a=new Map;for(const[c,l]of Object.entries(t))o.has(c)||a.set(c,l);return{document:r,manifest:n,extraFiles:a}}function CM(i,t){return el(i.mesh)===t}const Ec=Object.freeze(Object.defineProperty({__proto__:null,Document:il,FramePlan:Qc,MBZ_FORMAT_VERSION:Zs,MESH_BINARY_VERSION:sl,Mesh:Vi,MeshBuilder:ee,Multires:gd,PRIMITIVES:Sn,PRIMITIVE_ORDER:ff,SceneObject:ao,SubdivPlan:Jc,UV_SET:Ee,alignU:Kf,alignV:Zf,applyDeltas:Y_,arcBetween:pc,autoPins:kf,autoSeams:Hf,bevelEdges:_f,boundaryEdges:hd,bridgeEdges:yf,buildCharts:bs,buildFrames:tl,canReplaceBase:CM,captureDeltas:md,catmullClark:dd,chainVertices:ld,chartFingerprint:Nf,chartMesh:po,cloneRecipe:dc,cloneTransform:ti,collapseFaces:xf,combineMeshes:Lf,compact:Ln,compareTopology:Z_,conjugateGradient:Ff,connectEdges:Tf,connectVertices:$c,cornerIndex:Be,cornerKey:Un,decodeMesh:Sd,defaultParams:io,deleteFaces:vf,deserializeRecipe:od,dissolveEdges:gf,dissolveVertices:Ef,duplicateFaces:Pf,edgeChains:Mf,edgeKey:bt,edgeLoopFrom:Yr,edgeRingFrom:ad,emptyRecipe:Yc,encodeMesh:bd,equalizeTexelDensity:$f,evaluateLevels:K_,extractFaces:If,extrudeEdges:cc,extrudeFaces:ac,extrudeVertices:lc,faceEdgeKey:Zc,faceUvs:Le,flipU:H_,flipV:G_,gridding:V_,growFaces:ud,growVertices:mc,identityTransform:nl,insertEdgeLoop:pf,lerpUvRows:p_,loopPreviewPoints:df,loopStrip:Wc,lscm:Of,marginUv:Wf,measure:qc,mergeByDistance:Xc,mergeFacesAcrossEdge:mf,mergeUvs:Qf,mirrorMesh:Uf,nodesFromObjects:Md,normalizeScale:Bf,packMbz:Ld,parseCorner:Ys,parseObj:vd,polygonArea:qf,projectChart:uc,recipeFromMesh:ed,recompute:Di,reconcile:sd,recordManual:id,rotate90:W_,seamsFromUv:Kc,separateShells:Df,serializeRecipe:rd,sewInBase:nd,shelfPack:Xf,shellFaces:jc,shellVertices:cd,shrinkFaces:fd,shrinkVertices:gc,slideRails:Af,slideVertices:Cf,splitPoint:so,straightenBorder:z_,straightenPoints:jf,subdivide:pd,surfaceArea:Yf,symmetrizeUv:td,topologyHash:el,transformPoint:Rf,triangleFrame:ro,unpackMbz:Dd,uprightChart:zf,uvSetNames:d_,weldVertices:$s,writeGlb:_d,writeObj:xd},Symbol.toStringTag,{value:"Module"}));function Or(i){let t=0,e=0;for(const o of i.values())t+=o.x,e+=o.y;const n=i.size||1;t/=n,e/=n;let s=0;const r=new Map;for(const[o,a]of i)s+=Math.hypot(a.x-t,a.y-e),r.set(o,Math.atan2(a.y-e,a.x-t));return{cx:t,cy:e,spread:s/n,angles:r}}function RM(i,t){let e=0,n=0;for(const[s,r]of t.angles){const o=i.angles.get(s);if(o===void 0)continue;let a=r-o;for(;a>Math.PI;)a-=Math.PI*2;for(;a<-Math.PI;)a+=Math.PI*2;e+=a,n++}return n?e/n:0}function Ud(i,t){return Math.abs(t.spread-i.spread)*2}function PM(i,t){const e=Math.abs(RM(i,t))*t.spread;return Math.hypot(t.cx-i.cx,t.cy-i.cy)+Ud(i,t)+e}const IM=5,aa=10,al=12,LM=120,cl=300,DM=400,UM=400,ms=3;class Nd{constructor(t,e,n){this.canvas=t,this.local=e,this.h=n}pointers=new Map;gesture=null;holdTimer=null;tap={t0:0,maxN:0,moved:!1,stagger:!1,lastN:0,lastT:0};fHeld=!1;fChord=!1;fingerCam=!1;attach(){const t=this.canvas;t.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("touchmove",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>this.down(e)),t.addEventListener("pointermove",e=>this.move(e)),t.addEventListener("pointerup",e=>this.up(e)),t.addEventListener("pointercancel",e=>this.cancelled(e)),t.addEventListener("pointerleave",()=>{this.pointers.size||this.h.hoverLeave()}),t.addEventListener("wheel",e=>{e.preventDefault(),this.h.dolly(1+Math.sign(e.deltaY)*.09)},{passive:!1})}touchCount(){let t=0;for(const e of this.pointers.values())e.type==="touch"&&t++;return t}down(t){try{this.canvas.setPointerCapture(t.pointerId)}catch{}if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,x0:t.clientX,y0:t.clientY,type:t.pointerType}),this.tapDown(t),this.pointers.size>=2){if(this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.h.abort(),this.cancelHold(),this.pointers.size===3&&this.touchCount()===3){const n=Or(this.pointers);this.gesture={mode:"threefinger",live:!1,acc:0,basis:n,last:n},this.startHold(3,()=>this.h.openCameraMenu(n.cx,n.cy));return}if(this.pointers.size===2){const n=Or(this.pointers);this.gesture={mode:"twofinger",live:!1,acc:0,last:n},this.touchCount()===2&&this.startHold(2,()=>this.h.openTwoFingerMenu(n.cx,n.cy)),this.fHeld&&(this.fChord=!0,this.gesture.zoomOnly=!0,this.gesture.pivot=this.h.zoomPivot()??void 0)}else this.gesture={mode:"idle"};return}const e=this.local(t);if(this.fHeld){this.fChord=!0,this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},this.h.marqueeStart(e);return}if(t.pointerType==="mouse"){if(this.h.altOn(t)){this.gesture={mode:t.button===0?"tumble":t.button===1?"pan":"dolly"};return}if(t.button===2){this.h.openMarkingMenu(t.clientX,t.clientY,this.h.shiftOn(t)),this.gesture={mode:"marking"};return}if(t.button===1){this.gesture={mode:"pan"};return}}if(t.pointerType==="touch"&&!(!this.fingerCam&&this.h.isOnMesh(e,t))){this.gesture={mode:"tumble",live:!1,acc:0},this.startMarkingHold(t);return}this.gesture={mode:"tool",moved:!1,sx:e.x,sy:e.y},t.pointerType!=="mouse"&&this.startMarkingHold(t),this.h.toolDown(e,t)}move(t){const e=this.pointers.get(t.pointerId);if(!e){t.buttons===0&&!this.pointers.size&&this.h.hover(this.local(t),t);return}const n=e.x,s=e.y;e.x=t.clientX,e.y=t.clientY,Math.hypot(t.clientX-e.x0,t.clientY-e.y0)>al&&(this.tap.moved=!0,this.cancelHold());const r=this.gesture;if(r){if(r.mode==="tumble"){if(!r.live&&t.pointerType==="touch"){if(r.acc=(r.acc??0)+Math.hypot(t.clientX-n,t.clientY-s),r.acc<IM)return;r.live=!0}this.h.tumble(t.clientX-n,t.clientY-s);return}if(r.mode==="pan")return this.h.pan(t.clientX-n,t.clientY-s);if(r.mode==="dolly")return this.h.dolly(1+(t.clientX-n+(t.clientY-s))*.006);if(r.mode==="twofinger"){if(this.pointers.size<2)return;const o=Or(this.pointers),a=r.last??o;if(!r.live){if(r.acc=(r.acc??0)+PM(a,o),r.last=o,r.acc<aa)return;r.live=!0,this.tap.moved=!0,this.cancelHold();return}const c=a.spread>1e-6&&o.spread>1e-6?a.spread/o.spread:1;r.zoomOnly&&r.pivot?this.h.dollyAbout(r.pivot,c):(this.h.dolly(c),this.h.pan(o.cx-a.cx,o.cy-a.cy)),r.last=o;return}if(r.mode==="threefinger"){if(this.pointers.size!==3)return;const o=Or(this.pointers),a=r.basis??o;if(!r.live){const l=r.fresh??=new Set;if(l.add(t.pointerId),l.size<this.pointers.size)return;l.clear(),r.last=o;const h=Ud(a,o),f=o.cx-a.cx,u=o.cy-a.cy,d=Math.hypot(f,u);if(h<aa&&d<aa)return;if(!this.h.transformBegin()){this.gesture={mode:"idle"};return}r.live=!0,this.tap.moved=!0,this.cancelHold(),r.delta=h>=d?{kind:"scale"}:{kind:"swipe",axis:Math.abs(u)>=Math.abs(f)?"vertical":"horizontal"},r.basis=o;return}const c=r.delta??{kind:"scale"};c.kind==="scale"?this.h.transformUpdate({kind:"scale",scale:a.spread>1e-6?o.spread/a.spread:1}):this.h.transformUpdate({kind:"swipe",axis:c.axis,pixels:c.axis==="vertical"?o.cy-a.cy:o.cx-a.cx});return}if(r.mode==="tool"){const o=this.local(t);(Math.abs(o.x-(r.sx??0))>ms||Math.abs(o.y-(r.sy??0))>ms)&&(r.moved=!0),this.h.toolMove(o,t)}}}up(t){this.cancelHold();const e=this.gesture;e?.mode==="threefinger"&&e.live&&this.h.transformEnd();const n=e?.mode==="tool",s=n&&!!e?.moved;this.pointers.delete(t.pointerId),n&&this.h.toolUp(this.local(t),t,s),this.pointers.size===0?(this.gesture=null,this.tapUp(t)):this.gesture={mode:"idle"}}cancelled(t){this.gesture?.mode==="threefinger"&&this.gesture.live&&this.h.transformEnd(),this.pointers.delete(t.pointerId),this.cancelHold(),this.h.abort(),this.pointers.size?this.gesture={mode:"idle"}:(this.gesture=null,this.tap.lastN=0)}tapDown(t){if(t.pointerType!=="touch")return;const e=performance.now(),n=this.touchCount();n===1?(this.tap.t0=e,this.tap.maxN=1,this.tap.moved=!1,this.tap.stagger=!1):(this.tap.maxN=Math.max(this.tap.maxN,n),e-this.tap.t0>LM&&(this.tap.stagger=!0))}tapUp(t){if(t.pointerType!=="touch")return;const e=performance.now();if(!(!this.tap.moved&&!this.tap.stagger&&e-this.tap.t0<cl&&this.tap.maxN>=2)){this.tap.lastN=0;return}this.tap.lastN===this.tap.maxN&&e-this.tap.lastT<DM?(this.tap.lastN=0,this.tap.maxN===2?this.h.undo():this.h.redo(),navigator.vibrate?.(8)):(this.tap.lastN=this.tap.maxN,this.tap.lastT=e)}startMarkingHold(t){const e=this.h.shiftOn(t),{clientX:n,clientY:s}=t;this.startHold(1,()=>this.h.openMarkingMenu(n,s,e))}startHold(t,e){this.cancelHold(),this.holdTimer=setTimeout(()=>{this.pointers.size===t&&(this.h.abort(),this.gesture=null,e())},UM)}cancelHold(){this.holdTimer!==null&&clearTimeout(this.holdTimer),this.holdTimer=null}}const Kh=new tf,NM=new L,FM=1e-6;class OM{constructor(t,e){this.viewport=t,this.container=e}cameraBased=()=>!1;facingCache=null;edgeFaceCache=null;frontFaces(t){if(this.facingCache?.view===t)return this.facingCache.front;const e=t.object.mesh;t.group.updateMatrixWorld();const n=new Ot().getNormalMatrix(t.group.matrixWorld),s=e.faceNormals(),r=new Uint8Array(e.faceCount),o=this.viewport.camera,a=new L;o.getWorldDirection(a);const c=o.isPerspectiveCamera===!0,l=new L,h=new L;for(let f=0;f<e.faceCount;f++){l.set(s[f*3],s[f*3+1],s[f*3+2]).applyMatrix3(n);let u;if(c){const p=e.faceCenter(f);h.set(p[0],p[1],p[2]).applyMatrix4(t.group.matrixWorld),u=h.subVectors(o.position,h)}else u=h.copy(a).negate();const d=l.dot(u)/Math.max(1e-12,l.length()*u.length());r[f]=d>FM?1:0}return this.facingCache={view:t,front:r},r}edgeFaces(t){if(this.edgeFaceCache?.view===t)return this.edgeFaceCache.map;const e=t.object.mesh.edgeFaceMap();return this.edgeFaceCache={view:t,map:e},e}withFacing(t){this.facingCache=null,this.edgeFaceCache=null;try{return t()}finally{this.facingCache=null,this.edgeFaceCache=null}}edgeFacing(t,e,n){if(!this.cameraBased())return!0;const s=this.frontFaces(t),r=this.edgeFaces(t).get(bt(e,n));return r?.length?r.some(o=>s[o]===1):!0}faceVisible(t,e){return this.cameraBased()?this.frontFaces(t)[e]===1:!0}vertexVisible(t,e,n){if(!this.cameraBased())return!0;const s=this.frontFaces(t),r=n.get(e);return r?.length?r.some(o=>s[o]===1):!0}get width(){return this.container.clientWidth||1}get height(){return this.container.clientHeight||1}local(t){const e=this.container.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}ndc(t){return new Wt(t.x/this.width*2-1,-(t.y/this.height*2-1))}project(t,e,n,s){t.group.updateMatrixWorld();const r=NM.set(e,n,s).applyMatrix4(t.group.matrixWorld).project(this.viewport.camera);return{x:(r.x+1)/2*this.width,y:(-r.y+1)/2*this.height,z:r.z}}projectVertex(t,e){const n=t.object.mesh.positions;return this.project(t,n[e*3],n[e*3+1],n[e*3+2])}pickSurface(t,e){Kh.setFromCamera(this.ndc(t),this.viewport.camera);const n=this.viewport.allViews().filter(l=>l.object.visible&&(!e||l.object!==e)),r=Kh.intersectObjects(n.map(l=>l.surface),!1)[0];if(!r)return null;const o=n.find(l=>l.surface===r.object);if(!o)return null;const a=r.faceIndex??0,c=o.tri.triToFace[a]??0;return{object:o.object,view:o,face:c,point:r.point.clone(),distance:r.distance}}pickVertex(t,e,n,s=-1){return this.withFacing(()=>{const r=this.cameraBased()?t.object.mesh.vertexFaces():new Map;let o=-1,a=n*n;const c=t.object.mesh.vertexCount;for(let l=0;l<c;l++){if(l===s)continue;const h=this.projectVertex(t,l);if(h.z>1)continue;const f=(h.x-e.x)**2+(h.y-e.y)**2;f>=a||this.vertexVisible(t,l,r)&&(a=f,o=l)}return o})}pickVertexExcept(t,e,n,s){return this.pickVertex(t,e,n,s)}pickEdge(t,e,n){return this.withFacing(()=>{let s=-1,r=n,o=.5;for(let a=0;a<t.edges.length;a++){const[c,l]=t.edges[a],h=this.projectVertex(t,c),f=this.projectVertex(t,l);if(h.z>1&&f.z>1)continue;const u=f.x-h.x,d=f.y-h.y,p=u*u+d*d,v=p?Math.max(0,Math.min(1,((e.x-h.x)*u+(e.y-h.y)*d)/p)):0,g=Math.hypot(h.x+u*v-e.x,h.y+d*v-e.y);g>=r||this.edgeFacing(t,c,l)&&(r=g,s=a,o=v)}return{edge:s,t:o}})}vertsInRect(t,e,n,s,r){return this.withFacing(()=>{const o={x:Math.min(e,s),y:Math.min(n,r)},a={x:Math.max(e,s),y:Math.max(n,r)},c=[],l=this.cameraBased()?t.object.mesh.vertexFaces():new Map,h=t.object.mesh.vertexCount;for(let f=0;f<h;f++){const u=this.projectVertex(t,f);u.z>1||u.x<o.x||u.x>a.x||u.y<o.y||u.y>a.y||this.vertexVisible(t,f,l)&&c.push(f)}return c})}edgeVisible(t,e,n){return this.cameraBased()?this.edgeFacing(t,e,n):!0}}const kM=[14176847,7129418,5214176];let Ds=null;function BM(){if(!Ds){const e=document.createElement("canvas");e.width=512,e.height=512;const n=e.getContext("2d"),s=512/16;for(let r=0;r<16;r++)for(let o=0;o<16;o++)n.fillStyle=(o+r)%2===0?"#d7dde3":"#7d8891",n.fillRect(o*s,r*s,s,s);n.fillStyle="#e0723c",n.fillRect(0,512-s,s,s),Ds=new Yu(e),Ds.wrapS=ki,Ds.wrapT=ki}return new ju({map:Ds,specular:1712166,shininess:14,side:Xe})}const Ke={surf:new ju({color:10134701,specular:2765112,shininess:24,side:Xe}),wire:new ye({color:1317407,transparent:!0,opacity:.9}),wireSel:new ye({color:5111629}),wireComp:new ye({color:4608605}),vert:new rn({color:9134e3,size:6,sizeAttenuation:!1}),vertSel:new rn({color:16752128,size:11,sizeAttenuation:!1}),edgeSel:new ye({color:16752128}),faceSel:new bn({color:16752128,transparent:!0,opacity:.5,side:Xe,depthWrite:!1}),softPt:new rn({color:13658666,size:7,sizeAttenuation:!1}),seam:new ye({color:16739146}),cutLine:new ye({color:16769354}),cutPt:new rn({color:16769354,size:9,sizeAttenuation:!1}),pivot:new ye({color:15915386})};function Fd(i,t,e){const n=i.faceNormals(),s=i.vertexFaces(),r=Math.cos(e*Math.PI/180)-1e-4,o=t.tri.length,a=new Float32Array(o*3),c=new Float32Array(o*3);for(let f=0;f<o;f+=3){const u=t.triToFace[f/3],d=n[u*3],p=n[u*3+1],v=n[u*3+2];for(let g=0;g<3;g++){const m=t.tri[f+g],x=(f+g)*3;a[x]=i.positions[m*3],a[x+1]=i.positions[m*3+1],a[x+2]=i.positions[m*3+2];let y=0,_=0,S=0;for(const A of s.get(m)??[]){const M=n[A*3],E=n[A*3+1],P=n[A*3+2];M*d+E*p+P*v>=r&&(y+=M,_+=E,S+=P)}const w=Math.hypot(y,_,S)||1;c[x]=y/w,c[x+1]=_/w,c[x+2]=S/w}}const l=new he;l.setAttribute("position",new Zt(a,3)),l.setAttribute("normal",new Zt(c,3));const h=i.uvSets.get("map1");if(h){const f=new Float32Array(o*2);let u=-1,d=0;for(let p=0;p<o;p+=3){const v=t.triToFace[p/3];v!==u&&(u=v,d=0);const g=[0,d+1,d+2];for(let m=0;m<3;m++){const x=i.faceOffsets[v]+g[m];f[(p+m)*2]=h[x*2]??0,f[(p+m)*2+1]=h[x*2+1]??0}d++}l.setAttribute("uv",new Zt(f,2))}return l}function Od(i,t){const e=new Float32Array(t.length*6);for(let s=0;s<t.length;s++){const[r,o]=t[s];e[s*6]=i.positions[r*3],e[s*6+1]=i.positions[r*3+1],e[s*6+2]=i.positions[r*3+2],e[s*6+3]=i.positions[o*3],e[s*6+4]=i.positions[o*3+1],e[s*6+5]=i.positions[o*3+2]}const n=new he;return n.setAttribute("position",new Zt(e,3)),n}function Ze(i){const t=new he;return t.setAttribute("position",new Zt(Float32Array.from(i),3)),t}function nn(i,t){return i.position.set(t.position[0],t.position[1],t.position[2]),i.quaternion.set(t.rotation[0],t.rotation[1],t.rotation[2],t.rotation[3]),i.scale.set(t.scale[0],t.scale[1],t.scale[2]),i}function zM(i,t){const e=new _n;nn(e,i.transform);const n=i.mesh.triangulate(),s=i.mesh.edges(),r=new be(Fd(i.mesh,n,t),Ke.surf);r.userData.objectId=i.id,e.add(r);const o=new Dn(Od(i.mesh,s),Ke.wire);e.add(o);const a=new dn(Ze(i.mesh.positions),Ke.vert);return e.add(a),e.updateMatrixWorld(),{object:i,group:e,surface:r,wire:o,points:a,tri:n,edges:s}}function gs(i){i.traverse(t=>{const e=t.geometry;e&&e.dispose()})}const zs={persp:{label:"パース",sub:"Persp",theta:.72,phi:1.12,ortho:!1},top:{label:"上",sub:"Top",theta:0,phi:.001,ortho:!0},bottom:{label:"下",sub:"Bottom",theta:0,phi:Math.PI-.001,ortho:!0},front:{label:"前",sub:"Front",theta:0,phi:Math.PI/2,ortho:!0},back:{label:"後",sub:"Back",theta:Math.PI,phi:Math.PI/2,ortho:!0},right:{label:"右",sub:"Right",theta:Math.PI/2,phi:Math.PI/2,ortho:!0},left:{label:"左",sub:"Left",theta:-Math.PI/2,phi:Math.PI/2,ortho:!0}},Zh=.3,jh=140;class VM{constructor(t,e,n){this.container=t,this.state=n,this.renderer=new uf({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene.add(this.root,this.overlay,this.manip,this.preview,this.preselect),this.addLights(),this.addGrid(),this.applyCamera()}renderer;scene=new nc;persp=new fn(45,1,.05,500);ortho=new ir(-1,1,1,-1,.05,500);camera=this.persp;root=new _n;overlay=new _n;manip=new _n;preview=new _n;preselect=new _n;cam={target:new L(0,.4,0),theta:.72,phi:1.12,distance:7.2};views=new Map;frame=0;addLights(){this.scene.add(new fm(12371921,3356733,.85));const t=new ih(16777215,.72);t.position.set(3,6,4);const e=new ih(10466502,.28);e.position.set(-4,2,-3),this.scene.add(t,e)}addGrid(){const t=new vm(24,24,7174272,4936796),e=t.material;e.transparent=!0,e.opacity=.55,this.scene.add(t);const n=(s,r)=>{const o=new he;o.setAttribute("position",new Zt(s,3)),this.scene.add(new er(o,new ye({color:r})))};n([-12,0,0,12,0,0],12610154),n([0,0,-12,0,0,12],6982336)}applyCamera(){const{cam:t}=this,e=Math.sin(t.phi),n=t.target.x+t.distance*e*Math.sin(t.theta),s=t.target.y+t.distance*Math.cos(t.phi),r=t.target.z+t.distance*e*Math.cos(t.theta),o=this.state.camOpts;this.persp.position.set(n,s,r),this.persp.lookAt(t.target),this.persp.near=o.near,this.persp.far=o.far,this.persp.setFocalLength(o.focal),this.ortho.position.set(n,s,r),this.ortho.lookAt(t.target);const a=(this.container.clientWidth||1)/(this.container.clientHeight||1),c=t.distance*.42;this.ortho.left=-c*a,this.ortho.right=c*a,this.ortho.top=c,this.ortho.bottom=-c,this.ortho.near=o.near,this.ortho.far=o.far,this.ortho.updateProjectionMatrix(),this.camera=o.ortho?this.ortho:this.persp}setView(t){const e=zs[t];this.cam.theta=e.theta,this.cam.phi=e.phi,this.state.camOpts.ortho=e.ortho,this.applyCamera()}tumble(t,e){this.cam.theta-=t*.0088,this.cam.phi=Math.max(.05,Math.min(Math.PI-.05,this.cam.phi-e*.0088)),this.applyCamera()}pan(t,e){const n=new L().setFromMatrixColumn(this.camera.matrix,0),s=new L().setFromMatrixColumn(this.camera.matrix,1),r=this.cam.distance*.0016;this.cam.target.addScaledVector(n,-t*r).addScaledVector(s,e*r),this.applyCamera()}dolly(t){this.cam.distance=Math.max(Zh,Math.min(jh,this.cam.distance*t)),this.applyCamera()}dollyAbout(t,e){const n=Math.max(Zh,Math.min(jh,this.cam.distance*e)),s=n/this.cam.distance;this.cam.target.sub(t).multiplyScalar(s).add(t),this.cam.distance=n,this.applyCamera()}frameSelected(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;let e=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0],s=!1;for(const o of t){const a=this.views.get(o.id);if(!a)continue;const c=o.mesh.positions;for(let l=0;l<o.mesh.vertexCount;l++){const h=new L(c[l*3],c[l*3+1],c[l*3+2]).applyMatrix4(a.group.matrixWorld);e=[Math.min(e[0],h.x),Math.min(e[1],h.y),Math.min(e[2],h.z)],n=[Math.max(n[0],h.x),Math.max(n[1],h.y),Math.max(n[2],h.z)],s=!0}}if(!s)return;this.cam.target.set((e[0]+n[0])/2,(e[1]+n[1])/2,(e[2]+n[2])/2);const r=Math.max(n[0]-e[0],n[1]-e[1],n[2]-e[2]);this.cam.distance=Math.max(1.4,r*2.4),this.applyCamera()}viewOf(t){return this.views.get(t.id)}allViews(){return[...this.views.values()]}rebuildObject(t){const e=this.views.get(t.id);e&&(this.root.remove(e.group),gs(e.group));const n=zM(t,this.shadingAngle);this.root.add(n.group),this.views.set(t.id,n),this.applyDisplay(n)}syncAll(){const t=new Set(this.state.doc.objects.map(e=>e.id));for(const[e,n]of this.views)t.has(e)||(this.root.remove(n.group),gs(n.group),this.views.delete(e));for(const e of this.state.doc.objects)this.rebuildObject(e);this.rebuildOverlay()}get shadingAngle(){return this.state.display==="shaded"?0:this.state.smoothAngle}refreshPositions(t){const e=this.views.get(t.id);if(!e)return this.rebuildObject(t);nn(e.group,t.transform),e.group.updateMatrixWorld(),e.surface.geometry.dispose(),e.surface.geometry=Fd(t.mesh,e.tri,this.shadingAngle),e.wire.geometry.dispose(),e.wire.geometry=Od(t.mesh,e.edges),e.points.geometry.dispose(),e.points.geometry=Ze(t.mesh.positions)}applyDisplay(t){const e=this.state.display,n=t.object===this.state.selected||this.state.also.has(t.object);t.surface.visible=e!=="wire",t.surface.material=e==="checker"?t.checker??=BM():Ke.surf,t.wire.visible=e==="wire"||e==="shadedWire"||n,t.wire.material=n?this.state.compMode==="object"?Ke.wireSel:Ke.wireComp:Ke.wire,t.points.visible=n&&this.state.compMode==="vertex",t.group.visible=t.object.visible}applyDisplayAll(){for(const t of this.views.values())this.applyDisplay(t)}softWeightsProvider=null;seamProvider=null;rebuildOverlay(){for(const r of this.overlay.children.slice())this.overlay.remove(r),gs(r);const t=this.state.selected,e=t?this.views.get(t.id):void 0;if(!t||!e)return;const n=t.mesh,s=this.seamProvider?.();if(s?.size){const r=[];for(const[o,a]of e.edges){const c=`${Math.min(o,a)}_${Math.max(o,a)}`;s.has(c)&&(r.push(n.positions[o*3],n.positions[o*3+1],n.positions[o*3+2]),r.push(n.positions[a*3],n.positions[a*3+1],n.positions[a*3+2]))}if(r.length){const o=new Dn(Ze(r),Ke.seam);nn(o,t.transform).renderOrder=3,this.overlay.add(o)}}if(this.state.comp.size){if(this.state.soft.strength>0&&this.state.compMode!=="object"&&this.softWeightsProvider){const r=[];for(const[o,a]of this.softWeightsProvider())a>.02&&a<.999&&r.push(n.positions[o*3],n.positions[o*3+1],n.positions[o*3+2]);if(r.length){const o=new dn(Ze(r),Ke.softPt);nn(o,t.transform).renderOrder=2,this.overlay.add(o)}}if(this.state.compMode==="vertex"){const r=[];for(const a of this.state.comp)r.push(n.positions[a*3],n.positions[a*3+1],n.positions[a*3+2]);const o=new dn(Ze(r),Ke.vertSel);nn(o,t.transform).renderOrder=4,this.overlay.add(o)}else if(this.state.compMode==="edge"){const r=[];for(const a of this.state.comp){const c=e.edges[a];c&&(r.push(n.positions[c[0]*3],n.positions[c[0]*3+1],n.positions[c[0]*3+2]),r.push(n.positions[c[1]*3],n.positions[c[1]*3+1],n.positions[c[1]*3+2]))}const o=new Dn(Ze(r),Ke.edgeSel);nn(o,t.transform).renderOrder=4,this.overlay.add(o)}else if(this.state.compMode==="face"){const r=[],o=[];for(const l of this.state.comp){if(l>=n.faceCount)continue;const h=n.faceVerts(l),f=r.length/3;for(const u of h)r.push(n.positions[u*3],n.positions[u*3+1],n.positions[u*3+2]);for(let u=1;u<h.length-1;u++)o.push(f,f+u,f+u+1)}const a=Ze(r);a.setIndex(o);const c=new be(a,Ke.faceSel);nn(c,t.transform).renderOrder=4,this.overlay.add(c)}}}resize(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.persp.aspect=t/e,this.persp.updateProjectionMatrix(),this.applyCamera()}start(){const t=()=>{this.frame=requestAnimationFrame(t),this.renderer.render(this.scene,this.camera)};t()}stop(){cancelAnimationFrame(this.frame)}}const je=[new L(1,0,0),new L(0,1,0),new L(0,0,1)],Jh=3,Qh=13,tu=23,ll=30,HM=40;function Kr(i){return i<0?null:i===ll||i<10?"move":i<20?"rotate":"scale"}const GM=1.8,Ci=16770688,eu=14862432,nu=10149450;function ca(i){const t=i==="all";return{move:t||i==="move",rotate:t||i==="rotate",scale:t||i==="scale",arrow:1,ring:t?.68:1,cube:t?1.3:1}}function iu(i,t,e,n,s=64){const r=new an().setFromUnitVectors(new L(0,0,1),t.clone().normalize()),o=[];for(let l=0;l<=s;l++){const h=l/s*Math.PI*2,f=new L(Math.cos(h)*e,Math.sin(h)*e,0).applyQuaternion(r).add(i);o.push(f.x,f.y,f.z)}const a=new he;a.setAttribute("position",new Zt(o,3));const c=new er(a,new ye({color:n}));return c.renderOrder=6,c}function WM(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=n*n+s*s,o=r?Math.max(0,Math.min(1,((i.x-t.x)*n+(i.y-t.y)*s)/r)):0;return Math.hypot(t.x+n*o-i.x,t.y+s*o-i.y)}class XM{constructor(t){this.host=t}group=new _n;hot=-1;signature="";toScreen(t){return this.host.toScreen(t)}scaleAt(t){const e=this.host.orthoDistance();return(e!==null?e*.09:this.host.camera().position.distanceTo(t)*.15)*this.host.manipSize()}clear(){for(const t of this.group.children.slice())this.group.remove(t),gs(t);this.signature=""}rebuild(t,e,n){if(!t){this.signature&&this.clear();return}const s=this.scaleAt(t),r=this.host.pivotEdit(),o=[e,this.hot,n,r?"pivot":"",t.x.toFixed(3),t.y.toFixed(3),t.z.toFixed(3),s.toFixed(3)].join("|");if(o===this.signature)return;this.clear(),this.signature=o;const a=ca(r?"move":e),c=f=>r?nu:kM[f],l=f=>this.hot===f;for(let f=0;f<3;f++){const u=je[f];if(a.move||a.scale){const d=u.clone().multiplyScalar((a.scale?a.cube:a.arrow)*s).add(t),p=l(f)||l(20+f)?Ci:c(f),v=new he;v.setAttribute("position",new Zt([t.x,t.y,t.z,d.x,d.y,d.z],3));const g=new er(v,new ye({color:p}));g.renderOrder=6,this.group.add(g)}if(a.move){const d=new be(new Hc(s*.075,s*.22,10),new bn({color:l(f)?Ci:c(f)}));d.quaternion.setFromUnitVectors(new L(0,1,0),u),d.position.copy(u.clone().multiplyScalar(a.arrow*s).add(t)),d.renderOrder=6,this.group.add(d)}if(a.scale){const d=new be(new zi(s*.12,s*.12,s*.12),new bn({color:l(20+f)?Ci:c(f)}));d.position.copy(u.clone().multiplyScalar(a.cube*s).add(t)),d.renderOrder=6,this.group.add(d)}a.rotate&&this.group.add(iu(t,u,a.ring*s,l(10+f)?Ci:c(f)))}if(e==="rotate"&&!r){const f=new L().subVectors(this.host.camera().position,t).normalize();this.group.add(iu(t,f,s*1.18,l(Qh)?Ci:12174283))}const h=e==="scale"&&!r?new be(new zi(s*.14,s*.14,s*.14),new bn({color:l(tu)?Ci:eu})):new be(new Gc(s*.085,12,10),new bn({color:l(Jh)||l(ll)?Ci:r?nu:eu}));h.position.copy(t),h.renderOrder=6,this.group.add(h)}pick(t,e,n,s=1){if(!e)return-1;const o=this.host.pivotEdit()?"move":n,a=this.scaleAt(e),c=this.host.toScreen(e);if(Math.hypot(c.x-t.x,c.y-t.y)<16*s)return o==="scale"?tu:Jh;const l=ca(o);let h=-1,f=1/0;const u=(d,p,v)=>{p<v&&p<f&&(f=p,h=d)};for(let d=0;d<3;d++){const p=je[d];if(l.scale){const v=this.host.toScreen(p.clone().multiplyScalar(l.cube*a).add(e));u(20+d,Math.hypot(v.x-t.x,v.y-t.y),16*s)}if(l.move){const v=this.host.toScreen(p.clone().multiplyScalar(.3*a).add(e)),g=this.host.toScreen(p.clone().multiplyScalar(l.arrow*a).add(e));u(d,WM(t,v,g),14*s)}}if(h>=0)return h;if(l.rotate){for(let d=0;d<3;d++)u(10+d,this.ringDistance(t,e,je[d],l.ring*a),12*s);if(o==="rotate"){const d=new L().subVectors(this.host.camera().position,e).normalize();u(Qh,this.ringDistance(t,e,d,a*1.18),12*s)}}return h}ringDistance(t,e,n,s){const r=new an().setFromUnitVectors(new L(0,0,1),n.clone().normalize());let o=1/0;for(let a=0;a<64;a++){const c=a/64*Math.PI*2,l=new L(Math.cos(c)*s,Math.sin(c)*s,0).applyQuaternion(r).add(e),h=this.host.toScreen(l);o=Math.min(o,Math.hypot(h.x-t.x,h.y-t.y))}return o}}function js(i,t,e){const n=new L().subVectors(t,i.origin),s=e.dot(e),r=e.dot(i.direction),o=i.direction.dot(i.direction),a=e.dot(n),c=i.direction.dot(n),l=s*o-r*r;return Math.abs(l)<1e-9?0:(r*c-o*a)/l}const $M={model:{g1:gi("強度","ソフト選択 強度",0,1,.01,"strength"),g2:gi("範囲","ソフト選択 範囲",.05,6,.05,"radius")},uv:{g1:gi("強度","ソフト選択 強度",0,1,.01,"strength"),g2:gi("範囲","ソフト選択 範囲",.05,6,.05,"radius")},sculpt:{g1:gi("強度","ブラシ強度",0,1,.01,"strength"),g2:gi("サイズ","ブラシサイズ",.05,6,.05,"radius")},material:{g1:gi("不透明","不透明度",0,1,.01,"strength"),g2:gi("サイズ","ブラシサイズ",.05,6,.05,"radius")}};function gi(i,t,e,n,s,r){return{label:i,full:t,min:e,max:n,step:s,get:o=>o.soft[r],set:(o,a)=>{o.soft[r]=a}}}class qM{doc=new il;selected=null;comp=new Set;also=new Set;mode="model";compMode="object";tool="select";manip="all";display="shadedWire";manipSize=1;pivotEdit=!1;pivotOverride=null;mods={shift:"off",ctrl:"off",alt:"off"};symX=!1;fingerCam=!1;panelsHidden=!1;soft={strength:0,radius:1};toolOpts={extrudeDist:.35};vertexOpts={mergeDist:.05,extrudeWidth:.25};snap={kind:"grid",step:.5};snapOn=!1;snapKeyHeld=!1;uvSnap={kind:"grid",step:1/8};mirrorAxis=0;cut={snapStep:0,edgeFlow:!1};bevel={width:.1,segments:1};cameraBased=!1;rotateStep=0;preventNegativeScale=!0;lastEdit="multicut";lastPrimitive="cube";primitiveDefaults={};smoothAngle=30;camOpts={focal:35,near:.05,far:500,ortho:!1};viewName="パース";get cameras(){return this.doc.cameraBookmarks}gauge(t){return $M[this.mode][t]}modOn(t){return this.mods[t]!=="off"}get snapping(){return this.snapKeyHeld||this.snapOn}activeMods(){const t=[];return this.mods.shift!=="off"&&t.push("SHF"),this.mods.ctrl!=="off"&&t.push("CTL"),this.mods.alt!=="off"&&t.push("ALT"),t}select(t){this.selected!==t&&this.comp.clear(),this.also.clear(),this.selected=t,this.pivotOverride=null}selectedObjects(){return this.selected?[this.selected,...[...this.also].filter(t=>t!==this.selected)]:[]}addObject(t){if(!this.selected){this.selected=t;return}t!==this.selected&&(this.also.has(t)?this.also.delete(t):this.also.add(t))}}const YM=40;class KM{constructor(t){this.state=t}undoStack=[];redoStack=[];onChange=null;get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get undoLabel(){return this.undoStack.at(-1)?.label??null}get redoLabel(){return this.redoStack.at(-1)?.label??null}push(t){this.commit(t,this.snapshot())}snapshot(){return{objects:this.state.doc.objects.map(t=>({ref:t,name:t.name,kind:t.kind,parametric:t.parametric,params:{...t.params},transform:ti(t.transform),visible:t.visible,activeLevel:t.activeLevel,mesh:t.mesh.clone(),uv:t.uv?dc(t.uv):null,multires:t.multires.slice(),sculptLayers:t.sculptLayers.slice(),paintLayers:t.paintLayers.slice()})),selectedId:this.state.selected?.id??null,compMode:this.state.compMode,comp:[...this.state.comp]}}commit(t,e){this.undoStack.push({label:t,snap:e}),this.undoStack.length>YM&&this.undoStack.shift(),this.redoStack.length=0,this.onChange?.()}drop(){this.undoStack.pop(),this.onChange?.()}undo(){const t=this.undoStack.pop();return t?(this.redoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}redo(){const t=this.redoStack.pop();return t?(this.undoStack.push({label:t.label,snap:this.snapshot()}),this.restore(t.snap),this.onChange?.(),t.label):null}clear(){this.undoStack.length=0,this.redoStack.length=0,this.onChange?.()}restore(t){const e=this.state.doc;e.objects=t.objects.map(r=>{const o=r.ref;return o.name=r.name,o.kind=r.kind,o.parametric=r.parametric,o.params={...r.params},o.transform=ti(r.transform),o.visible=r.visible,o.activeLevel=r.activeLevel,o.mesh=r.mesh.clone(),o.uv=r.uv?dc(r.uv):null,o.multires=r.multires.slice(),o.sculptLayers=r.sculptLayers.slice(),o.paintLayers=r.paintLayers.slice(),o}),this.state.selected=t.selectedId?e.find(t.selectedId)??null:null,this.state.compMode=t.compMode,this.state.comp.clear();const n=this.state.selected?.mesh,s=!n||t.compMode==="object"?0:t.compMode==="vertex"?n.vertexCount:t.compMode==="face"?n.faceCount:1/0;for(const r of t.comp)r<s&&this.state.comp.add(r)}}const ZM="macbeth",jM=1,yi="projects",bi="blobs";let kr=null;function kd(){return kr||(kr=new Promise((i,t)=>{const e=indexedDB.open(ZM,jM);e.onupgradeneeded=()=>{const n=e.result;n.objectStoreNames.contains(yi)||n.createObjectStore(yi,{keyPath:"id"}),n.objectStoreNames.contains(bi)||n.createObjectStore(bi)},e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error??new Error("IndexedDB を開けません"))}),kr)}function hl(i,t,e){return kd().then(n=>new Promise((s,r)=>{const o=n.transaction(i,t);let a;Promise.resolve(e(o)).then(c=>{a=c},r),o.oncomplete=()=>s(a),o.onerror=()=>r(o.error??new Error("IndexedDB の操作に失敗しました")),o.onabort=()=>r(o.error??new Error("IndexedDB の操作が中断されました"))}))}function su(i){return new Promise((t,e)=>{i.onsuccess=()=>t(i.result),i.onerror=()=>e(i.error)})}async function ru(){try{return await kd(),!0}catch{return!1}}async function JM(i,t){const e=Date.now(),n={...i,created:i.created??e,modified:e,size:t.byteLength};return await hl([yi,bi],"readwrite",s=>{s.objectStore(yi).put(n),s.objectStore(bi).put(t.slice().buffer,n.id)}),n}async function QM(i){return await hl([yi,bi],"readonly",async e=>{const n=await su(e.objectStore(yi).get(i)),s=await su(e.objectStore(bi).get(i));return n&&s?{record:n,bytes:new Uint8Array(s)}:null})}async function ou(i){await hl([yi,bi],"readwrite",t=>{t.objectStore(yi).delete(i),t.objectStore(bi).delete(i)})}const Br="__autosave__",ty=1200,ey="0.1.0";class ny{constructor(t){this.state=t}timer=null;writing=!1;pending=!1;available=null;onError=null;onSaved=null;schedule(){this.timer!==null&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.timer=null,this.saveNow()},ty)}async saveNow(){if(this.writing){this.pending=!0;return}if(this.available===null&&(this.available=await ru()),!!this.available){this.writing=!0;try{const t=Ld(this.state.doc,{appVersion:ey}),e=await JM({id:Br,name:"自動保存",thumbnail:"",autosave:!0},t);this.onSaved?.(e.modified)}catch(t){this.onError?.(t instanceof Error?t.message:"自動保存に失敗しました")}finally{this.writing=!1,this.pending&&(this.pending=!1,this.schedule())}}}async restore(){if(this.available===null&&(this.available=await ru()),!this.available)return!1;try{const t=await QM(Br);if(!t)return!1;const{document:e}=Dd(t.bytes);return e.objects.length?(this.state.doc=e,this.state.select(null),!0):!1}catch(t){return this.onError?.(t instanceof Error?t.message:"前回の状態を読み込めませんでした"),await ou(Br).catch(()=>{}),!1}}async clear(){this.timer!==null&&clearTimeout(this.timer),this.timer=null,await ou(Br).catch(()=>{})}}function Bd(){return typeof window.showSaveFilePicker=="function"?"file-system-access":typeof navigator.canShare=="function"&&typeof navigator.share=="function"?"share":"download"}function iy(i){return i.endsWith(".mbz")?"application/zip":i.endsWith(".obj")?"text/plain":i.endsWith(".png")?"image/png":"application/octet-stream"}function sy(i){return i.endsWith(".mbz")?{"application/zip":[".mbz"]}:i.endsWith(".obj")?{"text/plain":[".obj"]}:{"application/octet-stream":[`.${i.split(".").pop()}`]}}function au(i,t){const e=URL.createObjectURL(i),n=document.createElement("a");n.href=e,n.download=t,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(e),2e3)}async function zr(i,t){const e=new Blob([i],{type:iy(t)}),n=Bd();if(n==="file-system-access")try{const s=await window.showSaveFilePicker({suggestedName:t,types:[{description:"macbeth",accept:sy(t)}]}),r=await s.createWritable();return await r.write(e),await r.close(),{method:n,target:{handle:s,name:s.name},saved:!0}}catch(s){return s?.name==="AbortError"?{method:n,target:null,saved:!1}:(au(e,t),{method:"download",target:{name:t},saved:!0})}if(n==="share"){const s=new File([e],t,{type:e.type});if(navigator.canShare?.({files:[s]}))try{return await navigator.share({files:[s],title:t}),{method:n,target:{name:t},saved:!0}}catch(r){if(r?.name==="AbortError")return{method:n,target:null,saved:!1}}}return au(e,t),{method:"download",target:{name:t},saved:!0}}async function cu(i){if(typeof window.showOpenFilePicker=="function")try{const t=i.split(",").map(r=>r.trim()),[e]=await window.showOpenFilePicker({multiple:!1,types:[{description:"macbeth",accept:{"*/*":t}}]}),n=await e.getFile(),s=await n.arrayBuffer();return{name:n.name,bytes:new Uint8Array(s),text:await n.text(),handle:e}}catch(t){if(t?.name==="AbortError")return null}return new Promise(t=>{const e=document.createElement("input");e.type="file",e.accept=i,e.style.display="none",document.body.appendChild(e);let n=!1;const s=r=>{n||(n=!0,e.remove(),t(r))};e.addEventListener("change",async()=>{const r=e.files?.[0];if(!r)return s(null);const o=await r.arrayBuffer();s({name:r.name,bytes:new Uint8Array(o),text:new TextDecoder().decode(o)})}),window.addEventListener("focus",()=>setTimeout(()=>s(null),800),{once:!0}),e.click()})}function ry(){switch(Bd()){case"file-system-access":return"フォルダを選んで保存（同じファイルに上書きできます）";case"share":return"共有シートから「ファイル」App へ保存";default:return"ダウンロード"}}const oy=100;class ay{session=null;get active(){return this.session!==null}begin(t,e,n){if(!e.length)return null;let s=0;for(const[o,a]of e){const c=t.mesh.getPosition(o),l=t.mesh.getPosition(a);s+=Math.hypot(c[0]-l[0],c[1]-l[1],c[2]-l[2])}const r=s/e.length||1;return this.session={object:t,source:t.mesh.clone(),edges:e,scale:r,startX:n},this.session}widthFromDrag(t,e){const n=t/oy*e*.5;return Math.max(e*.02,Math.min(e*.49,n))}apply(t){const e=this.session;if(!e)return null;const n=_f(e.source,e.edges,t.width,t.segments);return n?(e.object.mesh=n.mesh,{faces:n.newFaces}):null}cancel(){const t=this.session;t&&(t.object.mesh=t.source,this.session=null)}keep(){return this.session}end(){this.session=null}}const cy=30;class ly{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}preview=null;get current(){return this.preview}snap(t,e){if(e)return .5;const n=this.state.cut.snapStep;if(n>0){const s=n/100;t=Math.round(t/s)*s}return Math.max(.02,Math.min(.98,t))}clear(){for(const t of this.group.children.slice())this.group.remove(t),gs(t);this.preview=null}update(t,e,n){if(this.clear(),!e)return null;const s=this.picker.pickEdge(e,t,cy);if(s.edge<0)return null;const r=this.snap(s.t,n),[o,a]=e.edges[s.edge],c=df(e.object.mesh,o,a,r,this.state.cut.edgeFlow);if(!c)return null;this.preview={edge:s.edge,t:r,faceCount:c.faceCount};const l=[];for(const d of c.points)l.push(d[0],d[1],d[2]);const h=new er(Ze(l),Ke.cutLine);nn(h,e.object.transform).renderOrder=5,this.group.add(h);const f=c.points[0],u=new dn(Ze([f[0],f[1],f[2]]),Ke.cutPt);return nn(u,e.object.transform).renderOrder=5,this.group.add(u),`エッジループ挿入 <kbd>${Math.round(r*100)}%</kbd> · ${c.faceCount} 面`+(this.state.cut.edgeFlow?" · エッジフロー":"")+" · <kbd>Shift</kbd> で 50%"}commit(t){const e=this.preview;if(!e||!t)return null;const[n,s]=t.edges[e.edge],r=pf(t.object.mesh,n,s,e.t,this.state.cut.edgeFlow);return this.clear(),r?(t.object.mesh=r.mesh,{faceCount:r.faceCount}):null}}const hy=22,uy=16,Us={vert:new rn({color:16761963,size:9,sizeAttenuation:!1,transparent:!0,opacity:.75}),edge:new ye({color:16761963,transparent:!0,opacity:.8}),weld:new rn({color:7139450,size:14,sizeAttenuation:!1}),snap:new rn({color:7139450,size:11,sizeAttenuation:!1}),face:new bn({color:16761963,transparent:!0,opacity:.22,side:Xe,depthWrite:!1})};class fy{constructor(t,e,n){this.state=t,this.picker=e,this.group=n}current="";clear(){if(this.current){for(const t of this.group.children.slice())this.group.remove(t),gs(t);this.current=""}}showVertex(t,e){if(this.setKey(`w${e}`))return;const n=t.object.mesh,s=new dn(Ze([n.positions[e*3],n.positions[e*3+1],n.positions[e*3+2]]),Us.weld);this.add(s,t)}showWorldPoint(t,e,n){const s=`s${t.toFixed(4)},${e.toFixed(4)},${n.toFixed(4)}`;if(this.setKey(s))return;const r=new dn(Ze([t,e,n]),Us.snap);r.renderOrder=3,this.group.add(r)}update(t,e){if(!e||this.state.compMode==="object")return this.clear();const n=e.object,s=n.mesh;if(this.state.compMode==="vertex"){const h=this.picker.pickVertex(e,t,hy);if(h<0)return this.clear();if(this.setKey(`v${h}`))return;const f=new dn(Ze([s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]]),Us.vert);this.add(f,e);return}if(this.state.compMode==="edge"){const h=this.picker.pickEdge(e,t,uy);if(h.edge<0)return this.clear();if(this.setKey(`e${h.edge}`))return;const[f,u]=e.edges[h.edge],d=new Dn(Ze([s.positions[f*3],s.positions[f*3+1],s.positions[f*3+2],s.positions[u*3],s.positions[u*3+1],s.positions[u*3+2]]),Us.edge);this.add(d,e);return}const r=this.picker.pickSurface(t);if(!r||r.object!==n)return this.clear();if(this.setKey(`f${r.face}`))return;const o=s.faceVerts(r.face),a=[],c=[];for(const h of o)a.push(s.positions[h*3],s.positions[h*3+1],s.positions[h*3+2]);for(let h=1;h<o.length-1;h++)c.push(0,h,h+1);const l=Ze(a);l.setIndex(c),this.add(new be(l,Us.face),e)}setKey(t){return this.current===t?!0:(this.clear(),this.current=t,!1)}add(t,e){nn(t,e.object.transform).renderOrder=3,this.group.add(t)}}const lu=22,hu=16,dy=380,py=14,uu=4;function Ri(i,t,e){e?i.delete(t):i.add(t)}const Rn={changed:!1,objectChanged:!1};class my{constructor(t,e,n){this.state=t,this.picker=e,this.viewOf=n}lastClick=null;add(t){return this.state.modOn("shift")||t.shiftKey}sub(t){return this.state.modOn("ctrl")||t.ctrlKey||t.metaKey}click(t,e){if(this.state.compMode==="object"){const h=this.picker.pickSurface(t)?.object??null;if(h&&this.add(e))return this.state.addObject(h),this.lastClick=null,{changed:!0,objectChanged:!0};const f=h!==this.state.selected||this.state.also.size>0;return this.state.select(h),this.lastClick=null,{changed:f,objectChanged:f}}let n=this.state.selected;if(!n){const l=this.picker.pickSurface(t);if(!l)return Rn;this.state.select(l.object),n=l.object;const h=this.viewOf(n.id);return h&&(this.pickOne(t,e,h),this.lastClick={t:performance.now(),x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,before:new Set}),{changed:!0,objectChanged:!0}}const s=this.viewOf(n.id);if(!s)return Rn;const r=performance.now(),o=this.lastClick;if(o!==null&&r-o.t<dy&&Math.hypot(t.x-o.x,t.y-o.y)<py&&o.mode===this.state.compMode&&o.objectId===n.id&&o)return this.lastClick=null,this.double(t,e,s,o.before);const c=new Set(this.state.comp);return!this.add(e)&&!this.sub(e)&&this.state.comp.clear(),this.pickOne(t,e,s),this.lastClick={t:r,x:t.x,y:t.y,mode:this.state.compMode,objectId:n.id,before:c},{changed:!0,objectChanged:!1}}pickOne(t,e,n){const s=this.sub(e),r=this.state.comp;if(this.state.compMode==="vertex"){const o=this.picker.pickVertex(n,t,lu);o>=0&&Ri(r,o,s)}else if(this.state.compMode==="edge"){const o=this.picker.pickEdge(n,t,hu);o.edge>=0&&Ri(r,o.edge,s)}else if(this.state.compMode==="face"){const o=this.picker.pickSurface(t);o&&o.object===n.object&&Ri(r,o.face,s)}}edgeIndex(t){const e=new Map;return t.edges.forEach((n,s)=>e.set(bt(n[0],n[1]),s)),e}double(t,e,n,s){const r=n.object,o=r.mesh,a=this.add(e),c=this.sub(e),l=this.edgeIndex(n),h=u=>u.map(d=>l.get(bt(d[0],d[1]))).filter(d=>d!==void 0),f=(u,d)=>{!a&&!c?this.state.comp.clear():this.state.comp=new Set(s);for(const p of u)Ri(this.state.comp,p,c);return{changed:!0,objectChanged:!1,message:`${d} — ${u.length}`}};if(this.state.compMode==="edge"){const u=this.picker.pickEdge(n,t,hu);if(u.edge<0)return Rn;const[d,p]=n.edges[u.edge];if(a&&s.size){const v=[...s][s.size-1],g=n.edges[v];if(g){const m=bt(g[0],g[1]),x=bt(d,p),y=Yr(o,g[0],g[1]),_=pc(y,m,x);if(_)return f(h(_),"部分エッジループ");const S=ad(o,g[0],g[1]),w=pc(S,m,x);if(w)return f(h(w),"部分エッジリング")}}return f(h(Yr(o,d,p).edges),"エッジループ")}if(this.state.compMode==="face"){const u=this.picker.pickSurface(t);return!u||u.object!==r?Rn:f(jc(o,u.face),"シェル")}if(this.state.compMode==="vertex"){const u=this.picker.pickVertex(n,t,lu);if(u<0)return Rn;if(a&&s.size){const p=[...s][s.size-1],v=n.edges.find(([g,m])=>g===p||m===p);if(v){const g=Yr(o,v[0],v[1]),m=ld(g),x=m.indexOf(p),y=m.indexOf(u);if(x>=0&&y>=0){const[_,S]=x<y?[x,y]:[y,x];return f(m.slice(_,S+1),"頂点列")}}}const d=o.vertexFaces().get(u);return d?.length?f(cd(o,d[0]),"シェル"):Rn}return Rn}marquee(t,e,n,s,r,o){const a={x:Math.min(t,n),y:Math.min(e,s)},c={x:Math.max(t,n),y:Math.max(e,s)};if(c.x-a.x<uu&&c.y-a.y<uu)return this.click(r,o);const l=p=>p.z<=1&&p.x>=a.x&&p.x<=c.x&&p.y>=a.y&&p.y<=c.y;if(this.state.compMode==="object"){let p=null;for(const g of this.state.doc.objects){const m=this.viewOf(g.id);if(m&&this.picker.vertsInRect(m,a.x,a.y,c.x,c.y).length){p=g;break}}const v=p!==this.state.selected;return this.state.select(p),{changed:v,objectChanged:v}}const h=this.state.selected,f=h?this.viewOf(h.id):void 0;if(!h||!f)return Rn;const u=this.sub(o);!this.add(o)&&!u&&this.state.comp.clear();const d=this.state.comp;if(this.state.compMode==="vertex")for(const p of this.picker.vertsInRect(f,a.x,a.y,c.x,c.y))Ri(d,p,u);else if(this.state.compMode==="edge")f.edges.forEach((p,v)=>{const g=h.mesh.getPosition(p[0]),m=h.mesh.getPosition(p[1]),x=this.picker.project(f,(g[0]+m[0])/2,(g[1]+m[1])/2,(g[2]+m[2])/2);l(x)&&this.picker.edgeVisible(f,p[0],p[1])&&Ri(d,v,u)});else if(this.state.compMode==="face")for(let p=0;p<h.mesh.faceCount;p++){const v=h.mesh.faceCenter(p),g=this.picker.project(f,v[0],v[1],v[2]);l(g)&&this.picker.faceVisible(f,p)&&Ri(d,p,u)}return{changed:!0,objectChanged:!1}}growOrShrink(t){const e=this.state.selected;if(!e||this.state.compMode==="object"||!this.state.comp.size)return{changed:!1,objectChanged:!1,message:"コンポーネントを選択してください"};const n=e.mesh,s=this.state.comp;if(this.state.compMode==="vertex"){const r=t?mc(n,s):gc(n,s);s.clear();for(const o of r)s.add(o)}else if(this.state.compMode==="face"){const r=t?ud(n,s):fd(n,s);s.clear();for(const o of r)s.add(o)}else{const r=this.viewOf(e.id);if(!r)return Rn;const o=new Set;for(const c of s){const l=r.edges[c];l&&(o.add(l[0]),o.add(l[1]))}const a=new Set(t?mc(n,o):gc(n,o));s.clear(),r.edges.forEach(([c,l],h)=>{a.has(c)&&a.has(l)&&s.add(h)})}return{changed:!0,objectChanged:!1,message:`${t?"選択を拡張":"選択を縮小"} — ${s.size}`}}selectBoundary(){const t=this.state.selected;if(!t)return{changed:!1,objectChanged:!1,message:"オブジェクトを選択してください"};const e=this.viewOf(t.id);if(!e)return Rn;const n=new Set(hd(t.mesh).map(([s,r])=>bt(s,r)));return n.size?(this.state.compMode="edge",this.state.comp.clear(),e.edges.forEach(([s,r],o)=>{n.has(bt(s,r))&&this.state.comp.add(o)}),this.lastClick=null,{changed:!0,objectChanged:!1,message:`境界エッジ — ${this.state.comp.size}`}):{changed:!1,objectChanged:!1,message:"境界エッジがありません（閉じたメッシュです）"}}selectedVertices(){const t=this.state.selected;if(!t)return[];const e=this.viewOf(t.id),n=new Set;if(this.state.compMode==="vertex")for(const s of this.state.comp)n.add(s);else if(this.state.compMode==="edge"&&e)for(const s of this.state.comp){const r=e.edges[s];r&&(n.add(r[0]),n.add(r[1]))}else if(this.state.compMode==="face")for(const s of this.state.comp)for(const r of t.mesh.faceVerts(s))n.add(r);else for(let s=0;s<t.mesh.vertexCount;s++)n.add(s);return[...n]}reset(){this.lastClick=null}}const gy=4e5;function fu(i,t,e){const n=new Map;for(const c of t)n.set(c,1);if(!e.enabled||e.strength<=0||!t.length)return{weights:n,skipped:!1};const s=i.vertexCount;if(s*t.length>gy)return{weights:n,skipped:!0};const r=i.positions,{radius:o,strength:a}=e;for(let c=0;c<s;c++){if(n.get(c)===1)continue;let l=1/0;for(const h of t){const f=Math.hypot(r[c*3]-r[h*3],r[c*3+1]-r[h*3+1],r[c*3+2]-r[h*3+2]);f<l&&(l=f)}if(l<o){const h=1-l/o;n.set(c,a*(h*h*(3-2*h)))}}return{weights:n,skipped:!1}}function du(i,t){const e=new Set(t),n=i.positions,s=(a,c,l)=>`${a.toFixed(3)==="-0.000"?"0.000":a.toFixed(3)},${c.toFixed(3)},${l.toFixed(3)}`,r=new Map;for(let a=0;a<i.vertexCount;a++)r.set(s(n[a*3],n[a*3+1],n[a*3+2]),a);const o=[];for(const a of e){const c=r.get(s(-n[a*3],n[a*3+1],n[a*3+2]));c!==void 0&&c!==a&&!e.has(c)&&o.push([a,c])}return o}function pu(i){const{handle:t,pivot:e,ray:n}=i,s=Kr(t)??"move",r=t!==30&&t%10<3?t%10:-1,o=new Qn().setFromNormalAndCoplanarPoint(new L().subVectors(i.cameraPosition,e).normalize(),e);let a=null;if(r<0){const c=new L;n.intersectPlane(o,c)&&(a=c)}return{kind:s,label:i.label,handle:t,axis:r,pivot:e.clone(),target:i.target,start:i.point,pivotScreen:i.pivotScreen,t0:r>=0?js(n,e,je[r]):0,a0:Math.atan2(i.point.y-i.pivotScreen.y,i.point.x-i.pivotScreen.x),plane:o,planeStart:a}}const vy=.001;function xy(i,t,e,n,s,r={}){const o=r.snap;if(i.kind==="move"){let l;if(i.axis<0){const h=new L;if(!i.planeStart||!n.intersectPlane(i.plane,h))return;l=new L().subVectors(h,i.planeStart)}else{const h=je[i.axis];l=h.clone().multiplyScalar(js(n,i.pivot,h)-i.t0)}if(o){const h=o(i.pivot.clone().add(l));if(h){const f=h.sub(i.pivot);l=i.axis<0?f:je[i.axis].clone().multiplyScalar(f.dot(je[i.axis]))}}ha(i,t,(h,f)=>h.clone().addScaledVector(l,f),{position:l});return}if(i.kind==="rotate"){let l=Math.atan2(e.y-i.pivotScreen.y,e.x-i.pivotScreen.x)-i.a0;const h=r.rotateStep??0;if(h>0){const u=h*Math.PI/180;l=Math.round(l/u)*u}const f=i.axis<0?new L().subVectors(s,i.pivot).normalize():je[i.axis].clone();i.axis>=0&&f.dot(new L().subVectors(s,i.pivot))<0&&(l=-l),ha(i,t,(u,d)=>{const p=new an().setFromAxisAngle(f,-l*d);return u.clone().sub(i.pivot).applyQuaternion(p).add(i.pivot)},{rotation:new an().setFromAxisAngle(f,-l)});return}const a=r.preventNegativeScale===!1?-1/0:vy;let c;if(i.axis<0)c=new L(1,1,1).multiplyScalar(Math.max(a,1+(e.x-i.start.x)*.008));else{const l=js(n,i.pivot,je[i.axis]),h=Math.max(a,1+(l-i.t0)/Math.max(1e-4,Math.abs(i.t0))*.6);c=new L(1,1,1),c.setComponent(i.axis,h)}ha(i,t,(l,h)=>{const f=l.clone().sub(i.pivot);return f.set(f.x*(1+(c.x-1)*h),f.y*(1+(c.y-1)*h),f.z*(1+(c.z-1)*h)),f.add(i.pivot)},{scale:c})}function la(i,t,e){const n=Math.max(.02,e.scale??1),s=e.move??new L,r=i.pivot,o=i.target,a=c=>c.clone().sub(r).multiplyScalar(n).add(r).add(s);if(o.kind==="object"){const c=o.transform,l=a(new L(c.position[0],c.position[1],c.position[2]));t.transform={position:[l.x,l.y,l.z],rotation:[...c.rotation],scale:[c.scale[0]*n,c.scale[1]*n,c.scale[2]*n]};return}for(let c=0;c<o.verts.length;c++){const l=o.world[c],h=l.clone().lerp(a(l),o.weights[c]).applyMatrix4(o.inverse);t.mesh.setPosition(o.verts[c],h.x,h.y,h.z)}for(const[c,l]of o.mirror){const h=t.mesh.getPosition(c);t.mesh.setPosition(l,-h[0],h[1],h[2])}}function ha(i,t,e,n){const s=i.target;if(s.kind==="object"){const r=s.transform,o=ti(r),a=new L(r.position[0],r.position[1],r.position[2]);if(n.position){const c=a.clone().add(n.position);o.position=[c.x,c.y,c.z]}if(n.rotation){const c=n.rotation.clone().multiply(new an(r.rotation[0],r.rotation[1],r.rotation[2],r.rotation[3]));o.rotation=[c.x,c.y,c.z,c.w];const l=a.clone().sub(i.pivot).applyQuaternion(n.rotation).add(i.pivot);o.position=[l.x,l.y,l.z]}if(n.scale){const c=n.scale;o.scale=[r.scale[0]*c.x,r.scale[1]*c.y,r.scale[2]*c.z];const l=a.clone().sub(i.pivot);l.set(l.x*c.x,l.y*c.y,l.z*c.z),l.add(i.pivot),o.position=[l.x,l.y,l.z]}t.transform=o;return}for(let r=0;r<s.verts.length;r++){const o=e(s.world[r],s.weights[r]).applyMatrix4(s.inverse);t.mesh.setPosition(s.verts[r],o.x,o.y,o.z)}for(const[r,o]of s.mirror){const a=t.mesh.getPosition(r);t.mesh.setPosition(o,-a[0],a[1],a[2])}}function Tt(i){const t=document.getElementById(i);if(!t)throw new Error(`#${i} が見つかりません`);return t}function st(i,t,e){const n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.textContent=e),n}class _y{constructor(t,e){this.stage=t,this.host=e}drag=null;attach(t){const e=t.querySelector(".phead");if(!e)return;const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("class","grip"),n.setAttribute("viewBox","0 0 8 12"),n.setAttribute("fill","currentColor");for(const[s,r]of[[2,2],[6,2],[2,6],[6,6],[2,10],[6,10]]){const o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("cx",String(s)),o.setAttribute("cy",String(r)),o.setAttribute("r","1"),n.appendChild(o)}e.insertBefore(n,e.firstChild),e.addEventListener("touchstart",s=>s.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",s=>this.start(s,t))}place(t,e){e==="float"?(t.classList.add("floating"),t.style.left="320px",t.style.top="90px",this.stage.appendChild(t)):(t.classList.remove("floating"),t.style.left="",t.style.top="",this.stage.querySelector(`[data-zone="${e}"]`)?.appendChild(t)),this.updateDockWidths()}updateDockWidths(){for(const t of this.stage.querySelectorAll(".dock"))t.classList.toggle("narrow",!!t.querySelector('.panel[data-panel="tools"]'))}start(t,e){t.preventDefault();const n=e.getBoundingClientRect();this.drag={panel:e,key:e.dataset.panel??"",dx:t.clientX-n.left,dy:t.clientY-n.top,zones:[],hot:null},this.showDropZones(),e.classList.add("floating"),this.stage.appendChild(e),this.move(t),window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.end),window.addEventListener("pointercancel",this.end)}move=t=>{const e=this.drag;if(!e)return;const n=this.stage.getBoundingClientRect();e.panel.style.left=`${t.clientX-n.left-e.dx}px`,e.panel.style.top=`${t.clientY-n.top-e.dy}px`;let s=null;for(const r of e.zones){const o=r.el.getBoundingClientRect(),a=t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom;r.el.classList.toggle("hot",a),a&&(s=r)}e.hot=s};end=()=>{window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.end),window.removeEventListener("pointercancel",this.end);const t=this.drag;t&&(t.hot?(this.place(t.panel,t.hot.zone),this.host.onZoneChange(t.key,t.hot.zone),this.host.onMessage(`${t.panel.querySelector(".phead span")?.textContent??""}を${t.hot.name}にドッキング`)):this.host.onZoneChange(t.key,"float"),this.hideDropZones(),this.drag=null,this.updateDockWidths(),setTimeout(()=>this.host.onLayoutChange(),0))};showDropZones(){const t=this.drag;if(!t)return;const e=this.stage.getBoundingClientRect(),n=[{zone:"left",name:"左",x:64,y:0,w:200,h:e.height},{zone:"rightTop",name:"右上",x:e.width-236,y:0,w:236,h:e.height*.62},{zone:"rightBottom",name:"右下",x:e.width-236,y:e.height*.62,w:236,h:e.height*.38}];for(const s of n){const r=st("div","dropz");r.style.left=`${s.x}px`,r.style.top=`${s.y}px`,r.style.width=`${s.w}px`,r.style.height=`${s.h}px`,r.appendChild(st("span",void 0,s.name)),this.stage.appendChild(r),t.zones.push({el:r,zone:s.zone,name:s.name})}}hideDropZones(){for(const t of this.stage.querySelectorAll(".dropz"))t.remove()}}const My=180,yy=420,mu="macbeth.dockSize";class by{constructor(t,e,n){this.stage=t,this.dockCol=e,this.onChange=n;try{const s=localStorage.getItem(mu);s&&(this.sizes={...this.sizes,...JSON.parse(s)})}catch{}this.grip=document.createElement("div"),this.grip.className="dockgrip",this.stage.appendChild(this.grip),this.attachGrip(),this.apply(),window.addEventListener("resize",()=>this.apply())}grip;sizes={landscape:236,portrait:240};portrait=!1;apply(){const t=this.stage.getBoundingClientRect(),e=t.height>t.width,n=e!==this.portrait;this.portrait=e,this.stage.classList.toggle("portrait",e),this.setSize(this.size),this.grip.classList.toggle("vertical",!e),this.grip.classList.toggle("horizontal",e),this.placeGrip(),n&&this.onChange()}get size(){return this.portrait?this.sizes.portrait:this.sizes.landscape}setSize(t){const e=Math.max(My,Math.min(yy,t));this.portrait?this.sizes.portrait=e:this.sizes.landscape=e,this.stage.style.setProperty("--dockw",`${e}px`),this.placeGrip()}placeGrip(){const t=!this.dockCol.querySelector(".panel");if(this.grip.hidden=t,t)return;const e=this.stage.getBoundingClientRect(),n=this.dockCol.getBoundingClientRect();this.portrait?(this.grip.style.top=`${n.top-e.top-3}px`,this.grip.style.left=""):(this.grip.style.left=`${n.left-e.left-3}px`,this.grip.style.top="")}attachGrip(){let t=!1;this.grip.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),this.grip.addEventListener("pointerdown",e=>{e.preventDefault(),t=!0,this.grip.classList.add("active"),this.grip.setPointerCapture(e.pointerId)}),this.grip.addEventListener("pointermove",e=>{if(!t)return;const n=this.stage.getBoundingClientRect();this.setSize(this.portrait?n.bottom-e.clientY:n.right-e.clientX),this.onChange()});for(const e of["pointerup","pointercancel"])this.grip.addEventListener(e,()=>{if(t){t=!1,this.grip.classList.remove("active");try{localStorage.setItem(mu,JSON.stringify(this.sizes))}catch{}this.onChange()}})}get isPortrait(){return this.portrait}}class gu{constructor(t,e,n,s,r,o,a){this.state=t,this.which=n,this.labelId=s,this.valueId=r,this.onInput=o,this.onCommit=a,this.root=Tt(e),this.fill=this.root.querySelector(".fill"),this.knob=this.root.querySelector(".knob"),this.attach(),this.paint()}root;fill;knob;active=!1;paint(){const t=this.state.gauge(this.which),e=t.get(this.state),n=(e-t.min)/(t.max-t.min);this.fill.style.height=`${n*100}%`,this.knob.style.bottom=`calc(${n*100}% - 1px)`,Tt(this.labelId).textContent=t.label,this.root.title=t.full,Tt(this.valueId).textContent=e.toFixed(2),this.root.dataset.off=this.which==="g1"&&e<=0?"true":"false"}setFromY(t){const e=this.state.gauge(this.which),n=this.root.getBoundingClientRect(),s=Math.max(0,Math.min(1,1-(t-n.top)/n.height)),r=e.min+s*(e.max-e.min);e.set(this.state,Math.round(r/e.step)*e.step),this.paint(),this.onInput()}attach(){const t=this.root;t.addEventListener("touchstart",e=>e.preventDefault(),{passive:!1}),t.addEventListener("pointerdown",e=>{e.preventDefault(),this.active=!0,t.setPointerCapture(e.pointerId),this.setFromY(e.clientY)}),t.addEventListener("pointermove",e=>{this.active&&this.setFromY(e.clientY)});for(const e of["pointerup","pointercancel"])t.addEventListener(e,()=>{this.active&&(this.active=!1,this.onCommit())})}}const Sy={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"},wy={wire:"WIRE",shaded:"SHADED",shadedWire:"SHADED+WIRE",smooth:"SMOOTH",checker:"CHECKER"};class Ey{constructor(t){this.state=t}toastTimer=null;uvNote=null;refreshStats(){const t=this.state.doc.stats();let e=0;for(const a of this.state.doc.objects)e+=a.mesh.stats().edges;Tt("hudStats").innerHTML=`<i>Verts</i><span>${t.vertices}</span><i>Edges</i><span>${e}</span><i>Faces</i><span>${t.faces}</span><i>Tris</i><span>${t.triangles}</span>`;const n=this.state.activeMods(),s=n.length?` · <b>${n.join(" ")}</b>`:"";if(this.state.mode==="uv"&&this.uvNote){const a=this.uvNote;Tt("hudMode").innerHTML=`UV · <b>${a.unit}</b>${s}<br>島 ${a.charts} · 伸び ×${a.maxStretch.toFixed(2)}`+(this.state.selected?` · ${this.state.selected.name}`:"");return}const r=Sy[this.state.compMode],o=wy[this.state.display];Tt("hudMode").innerHTML=`${this.state.tool}${this.state.symX?" · 対称X":""}`+(this.state.pivotEdit?" · <b>ピボット編集</b>":"")+` · <b>${r}</b>`+(this.state.comp.size?` · ${this.state.comp.size}`:"")+s+`<br>${o} · ${this.state.viewName}${this.state.camOpts.ortho?" · ORTHO":""}`+(this.state.selected?` · ${this.state.selected.name}`:"")}toast(t){Tt("hudHint").innerHTML=t,this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>this.defaultHint(),2800)}defaultHint(){this.toastTimer!==null&&clearTimeout(this.toastTimer),this.toastTimer=null,Tt("hudHint").innerHTML=(this.state.fingerCam?"指1本 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>":"指1本 メッシュ上 <kbd>ツール</kbd> / 外 <kbd>タンブル</kbd> · ペン <kbd>ツール</kbd>")+" · 指2本 <kbd>パン / ズーム</kbd><br><b>指3本 つまむ <kbd>選択を拡大縮小</kbd> · 上下 <kbd>Y へ移動</kbd> · 左右 <kbd>X / Z へ移動</kbd></b><br>長押し 指1本 <kbd>マーキング</kbd> 指2本 <kbd>カメラ / 編集</kbd> 指3本 <kbd>カメラ</kbd> · ダブルタップ 指2本 <kbd>戻る</kbd> 指3本 <kbd>進む</kbd><br><kbd>SHF</kbd> + 移動 <kbd>押し出し</kbd> · <kbd>SHF</kbd> + <kbd>CTL</kbd> + 移動 <kbd>スライド</kbd> · <kbd>D</kbd> <kbd>ピボット</kbd> · <kbd>+</kbd>/<kbd>-</kbd> <kbd>マニピュレータの大きさ</kbd><br>スナップ <kbd>ツール列</kbd> または <kbd>X</kbd>/<kbd>V</kbd>/<kbd>C</kbd> を押している間 · <kbd>F</kbd> <kbd>矩形 / フレーム</kbd><br>マウス <kbd>Alt+左 タンブル</kbd> <kbd>Alt+中 パン</kbd> <kbd>Alt+右 ズーム</kbd>"}setSaveNote(t){Tt("saveNote").textContent=t}}function vu(i,t){const e=st("div","panel");e.dataset.panel=i;const n=st("div","phead");n.appendChild(st("span",void 0,t));const s=st("div","pbody");return e.append(n,s),{panel:e,body:s}}function Se(i,t){const e=st("div","sect"),n=st("div","sect-h");return n.appendChild(st("span",void 0,i)),t&&n.appendChild(st("b",void 0,t)),e.appendChild(n),e}function Ge(i,t){const e=st("div","row");e.appendChild(st("label",void 0,t.label));const n=st("input","num");n.type="text",n.readOnly=!0;const s=o=>{n.value=t.format?t.format(o):o.toFixed(t.step<1?2:0)};s(t.value),e.appendChild(n);const r=st("input","slider");r.type="range",r.min=String(t.min),r.max=String(t.max),r.step=String(t.step),r.value=String(t.value),r.addEventListener("input",()=>{const o=Number(r.value);s(o),t.onInput(o)});for(const o of["change","pointerup"])r.addEventListener(o,()=>t.onCommit?.());e.appendChild(r),i.appendChild(e)}function kn(i,t,e,n){const s=st("button","chk");s.setAttribute("aria-pressed",String(e)),s.appendChild(st("i")),s.appendChild(st("span",void 0,t)),s.addEventListener("click",()=>{const r=s.getAttribute("aria-pressed")!=="true";s.setAttribute("aria-pressed",String(r)),n(r)}),i.appendChild(s)}function Ty(i,t){const e=Se("パッキング","PACK");Ge(e,{label:"余白",value:i.packing.marginTexels,min:2,max:64,step:1,format:r=>`${Math.round(r)} tx`,onInput:r=>t.onUvPackingChange("marginTexels",Math.round(r))});const n=st("div","row"),s=st("div","segmented");for(const r of[512,1024,2048,4096]){const o=st("button","seg");o.textContent=String(r),o.setAttribute("aria-pressed",String(i.packing.textureSize===r)),o.addEventListener("click",()=>t.onUvPackingChange("textureSize",r)),s.appendChild(o)}return n.appendChild(s),e.appendChild(n),kn(e,"90° 回転を許す",i.packing.allowRotate,r=>t.onUvPackingChange("allowRotate",r)),e.appendChild(st("div","hint",`余白はテクスチャのテクセルで持ちます。どの大きさでも最低 5px は空きます。
90° 回転は島の向き（上が +V）を崩すので、既定は切ってあります。`)),e}function ua(i,t,e,n,s){const r=st("div","row triple");r.appendChild(st("label",void 0,t));for(let o=0;o<3;o++){const a=st("input","num");a.type="text",a.inputMode="decimal",a.value=e[o].toFixed(n),a.addEventListener("change",()=>{const c=Number(a.value);Number.isFinite(c)?s(o,c):a.value=e[o].toFixed(n)}),r.appendChild(a)}i.appendChild(r)}function Ay(i,t){const e=i.selected;if(!e)return null;const n=Se("トランスフォーム","TRANSFORM");return ua(n,"移動",e.transform.position,3,(s,r)=>t.onTransformInput(e,"position",s,r)),ua(n,"回転",i.rotationEuler,1,(s,r)=>t.onTransformInput(e,"rotation",s,r)),ua(n,"スケール",e.transform.scale,3,(s,r)=>t.onTransformInput(e,"scale",s,r)),n.appendChild(st("div","hint","回転は度で入れます。数値を打って Enter で確定します。")),n}function Cy(i,t){const e={all:"ユニバーサル",move:"移動",rotate:"回転",scale:"スケール"}[i.manip],n=Se(e,"MANIPULATOR");if(Ge(n,{label:"大きさ",value:i.manipSize,min:.5,max:2,step:.05,format:s=>`×${s.toFixed(2)}`,onInput:s=>t.onManipSizeChange(s)}),kn(n,"ピボットを移動（D）",i.pivotEdit,()=>t.onPivotEditToggle()),i.manip==="rotate"||i.manip==="all"){const s=st("div","row");s.appendChild(st("label",void 0,"刻み"));const r=st("div","segmented");for(const[o,a]of[[0,"なし"],[5,"5°"],[15,"15°"],[45,"45°"],[90,"90°"]]){const c=st("button","seg");c.textContent=a,c.setAttribute("aria-pressed",String(i.rotateStep===o)),c.addEventListener("click",()=>t.onRotateStepChange(o)),r.appendChild(c)}s.appendChild(r),n.appendChild(s)}return(i.manip==="scale"||i.manip==="all")&&kn(n,"負のスケールを防ぐ",i.preventNegativeScale,s=>t.onPreventNegativeScaleChange(s)),n.appendChild(st("div","hint",`長押しで 移動 / 回転 / スケール を切り替えます。
ピボットの移動中は、メッシュではなくピボットだけが動きます。`)),n}function xu(i,t){const e=Se("選択","SELECT");return kn(e,"カメラベース選択",i.cameraBased,n=>t.onCameraBasedChange(n)),e.appendChild(st("div","hint",`オンにすると、カメラから見えているものだけを選びます。
裏側の頂点やエッジは、タップでも矩形でも拾いません。`)),e}function Ry(i,t){const e=Se("マルチカット","MULTI CUT");return Ge(e,{label:"ステップ % スナップ",value:i.cut.snapStep,min:0,max:50,step:5,format:n=>n?`${Math.round(n)}%`:"オフ",onInput:n=>t.onCutChange("snapStep",n)}),kn(e,"エッジフロー",i.cut.edgeFlow,n=>t.onCutChange("edgeFlow",n)),e.appendChild(st("div","hint",`ホバーで入る位置を先に見せます。Shift で 50% に固定。
エッジフローは頂点法線による三次補間で、ループをサーフェスに沿わせます。`)),e}function Py(i,t){const e=Se("ベベル","BEVEL");return Ge(e,{label:"幅",value:i.bevel.width,min:.005,max:2,step:.005,format:n=>n.toFixed(3),onInput:n=>t.onBevelChange("width",n)}),Ge(e,{label:"セグメント",value:i.bevel.segments,min:1,max:8,step:1,onInput:n=>t.onBevelChange("segments",n)}),e.appendChild(st("div","hint",i.bevelActive?`確定したあとでも、ここを動かすとかけ直します。
別の操作をすると確定します。`:`エッジを選んで左右にドラッグすると幅が決まります。
セグメント 1 で面取り、2 以上で丸めになります。`)),e}function Iy(i,t){const e=Se("押し出し","EXTRUDE");return Ge(e,{label:"距離",value:i.extrudeDist,min:.05,max:3,step:.05,onInput:n=>t.onExtrudeDistChange(n)}),e.appendChild(st("div","hint",`編集メニューの「押し出し」で使う距離です。
SHF を押しながらドラッグする場合は距離ではなく動かした量になります。`)),e}function Ly(){const i=Se("ブリッジ","BRIDGE");return i.appendChild(st("div","hint",`境界のエッジ列を 2 つ選んで実行します。数が同じでないと繋げません。
分割数はまだ 1 だけです。`)),i}function Dy(){const i=Se("コネクト","CONNECT");return i.appendChild(st("div","hint",`同じ面にある頂点どうしを結んで面を分けます。
エッジを選んだときは中点を作ってから結びます。`)),i}function Uy(i,t){const e=Se(`スナップ${i.snap.active?"（効いています）":""}`,"SNAP"),n=st("div","row"),s=st("div","segmented");for(const[r,o]of[["grid","グリッド  X"],["vertex","頂点  V"],["edge","カーブ  C"],["surface","面"]]){const a=st("button","seg");a.textContent=o,a.setAttribute("aria-pressed",String(i.snap.kind===r)),a.addEventListener("click",()=>t.onSnapChange("kind",r)),s.appendChild(a)}return n.appendChild(s),e.appendChild(n),Ge(e,{label:"グリッドの刻み",value:i.snap.step,min:.05,max:2,step:.05,onInput:r=>t.onSnapChange("step",r)}),e.appendChild(st("div","hint",`ツール列のスナップがオンのとき、または X / V / C を押している間だけ効きます。
移動のときだけ働き、寄せ先は緑で光ります。`)),e}function Ny(i,t){const e=Se("ミラー","MIRROR"),n=st("div","row"),s=st("div","segmented");for(const[r,o]of[[0,"X"],[1,"Y"],[2,"Z"]]){const a=st("button","seg");a.textContent=o,a.setAttribute("aria-pressed",String(i.mirrorAxis===r)),a.addEventListener("click",()=>t.onMirrorAxisChange(r)),s.appendChild(a)}return n.appendChild(s),e.appendChild(n),e.appendChild(st("div","hint",`編集メニュー（オブジェクト）の「ミラー」で使う軸です。
境目の頂点は「マージ距離」で溶接します。`)),e}function fa(i,t){const e=Se("頂点","VERTEX");return Ge(e,{label:"マージ距離",value:i.vertex.mergeDist,min:.001,max:.5,step:.001,format:n=>n.toFixed(3),onInput:n=>t.onVertexOptChange("mergeDist",n)}),Ge(e,{label:"押し出しの太さ",value:i.vertex.extrudeWidth,min:.05,max:.6,step:.01,onInput:n=>t.onVertexOptChange("extrudeWidth",n)}),e.appendChild(st("div","hint",`マージ距離は「距離でマージ」で使うしきい値です。
押し出しの太さは、尖らせたときの根元の広がり（辺の長さに対する割合）です。`)),e}function Fy(i,t){const e=Se("ソフト選択","SOFT SELECT");return Ge(e,{label:"強度",value:i.soft.strength,min:0,max:1,step:.01,onInput:n=>t.onSoftChange("strength",n)}),Ge(e,{label:"範囲",value:i.soft.radius,min:.05,max:6,step:.05,onInput:n=>t.onSoftChange("radius",n)}),e}function Oy(i,t){const e=i.selected;if(e&&e.parametric&&Sn[e.kind]){const o=Sn[e.kind],a=Se("入力ノード",o.en.toUpperCase()),c=st("div","attr-title",e.name);c.appendChild(st("span",void 0,o.en)),a.appendChild(c);for(const l of o.params)Ge(a,{label:l.label,value:e.params[l.key]??l.value,min:l.min,max:l.max,step:l.step,onInput:h=>t.onParamInput(e,l.key,h),onCommit:()=>t.onParamCommit(e,`${l.label} を変更`)});return a.appendChild(st("div","hint",`パラメトリックなので、値を変えると作り直されます。
編集すると通常のメッシュになります。`)),a}const n=i.nextPrimitive,s=Sn[n],r=Se(`次の${s?.label??n}`,(s?.en??n).toUpperCase());if(!s)return r;for(const o of s.params)Ge(r,{label:o.label,value:i.nextPrimitiveParams[o.key]??o.value,min:o.min,max:o.max,step:o.step,onInput:a=>t.onDefaultParamChange(n,o.key,a)});if(r.appendChild(st("div","hint","長押しのメニューから追加すると、この値で作られます。")),e){const o=e.mesh.stats();r.appendChild(st("div","attr-title",e.name)),r.appendChild(st("div","hint",`頂点 ${o.vertices} · エッジ ${o.edges} · 面 ${o.faces}`))}return r}function ky(i,t){const e=Se("表示","DISPLAY");return Ge(e,{label:"スムージング角度",value:i.smoothAngle,min:0,max:180,step:1,format:n=>`${Math.round(n)}°`,onInput:n=>t.onSmoothAngleChange(n)}),e.appendChild(st("div","hint","長押しで ワイヤ / シェード / シェード + ワイヤ / スムース を選べます（4〜7）。")),e}function By(i,t){const e=Se("カメラ","CAMERA"),n=st("div","hint"),s=a=>{const c=2*Math.atan(24/(2*a))*180/Math.PI;n.textContent=`アングル オブ ビュー  ${c.toFixed(2)}°
フィルム ゲート  35mm アカデミー`},r=(a,c,l,h,f)=>{Ge(e,{label:a,value:i.cam[c],min:l,max:h,step:f,format:u=>String(f<1?Number(u.toFixed(2)):Math.round(u)),onInput:u=>{t.onCamOptChange(c,u),c==="focal"&&s(u)}})};r("焦点距離","focal",10,200,1),r("ニア クリップ","near",.01,1,.01),r("ファー クリップ","far",50,2e3,10),s(i.cam.focal),e.appendChild(n),kn(e,"平行投影",i.cam.ortho,a=>t.onCamOrthoChange(a));const o=st("button","act","初期設定に戻す");return o.addEventListener("click",()=>t.onCamReset()),e.appendChild(o),e.appendChild(st("div","hint","焦点距離 35mm・ニア 0.05・ファー 500・パースに戻します。")),e}function zy(i,t){const e=[Ty(i,t)],n=Se("展開","UNFOLD"),s=st("div","row"),r=st("div","segmented");for(const[c,l]of[["none","取り込んだまま"],["lscm","LSCM"],["projection","投影"]]){const h=st("button","seg");h.textContent=l,h.setAttribute("aria-pressed",String(i.method===c)),h.addEventListener("click",()=>t.onUvMethodChange(c)),r.appendChild(h)}s.appendChild(r),n.appendChild(s),n.appendChild(st("div","hint",`「取り込んだまま」はメッシュが持っている UV をそのまま見せます。
「展開」を押すと LSCM に切り替わります。`)),e.push(n);const o=Se("自動 UV","AUTO");Ge(o,{label:"角度",value:i.auto.angle,min:10,max:180,step:1,format:c=>`${Math.round(c)}°`,onInput:c=>t.onUvAutoChange("angle",c)}),kn(o,"ハードエッジ",i.auto.useHardEdges,c=>t.onUvAutoChange("useHardEdges",c)),kn(o,"クリース",i.auto.useCreases,c=>t.onUvAutoChange("useCreases",c)),kn(o,"ポリグループ",i.auto.usePolygroups,c=>t.onUvAutoChange("usePolygroups",c)),kn(o,"対称 X",i.auto.symmetric,c=>t.onUvAutoChange("symmetric",c));const a=st("button","act","自動 UV を実行");return a.addEventListener("click",()=>t.onUvAutoRun()),o.appendChild(a),o.appendChild(st("div","hint",`角度・ハードエッジ・クリース・ポリグループで切れ目を置き、
大きすぎる島と閉じた island を割ってから開きます。手で動かした分は捨てます。`)),e.push(o),e}function Vy(i,t,e){const n=Se(`UV スナップ${t.snap.active?"（効いています）":""}`,"SNAP"),s=st("div","row"),r=st("div","segmented");for(const[o,a,c]of[["grid","1/8",1/8],["grid","1/16",1/16],["grid","1/32",1/32],["vertex","UV 頂点",0]]){const l=st("button","seg");l.textContent=a;const h=o==="vertex"?i.snapKind==="vertex":i.snapKind==="grid"&&Math.abs(i.snapStep-c)<1e-9;l.setAttribute("aria-pressed",String(h)),l.addEventListener("click",()=>{e.onUvSnapChange("kind",o),o==="grid"&&e.onUvSnapChange("step",c)}),r.appendChild(l)}return s.appendChild(r),n.appendChild(s),n}function Hy(i,t,e,n){if(i.textContent="",!t.length){i.appendChild(st("div","empty",`オブジェクトがありません
ツール列から追加してください`));return}for(const s of t){const r=st("button","olrow");r.setAttribute("aria-selected",String(s===e)),r.appendChild(st("i","dot")),r.appendChild(st("span","nm",s.name)),r.appendChild(st("span","ty",s.parametric?s.kind:"mesh")),Gy(r,s,n),i.appendChild(r)}}function Gy(i,t,e){let n=null,s=0,r=0,o=!1,a=0;i.addEventListener("touchstart",l=>l.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",l=>l.preventDefault()),i.addEventListener("pointerdown",l=>{if(s=l.clientX,r=l.clientY,o=!1,l.pointerType==="mouse"&&l.button===2){o=!0,e.onOutlinerMenu(t,l.clientX,l.clientY);return}n=setTimeout(()=>{o=!0,e.onOutlinerMenu(t,s,r)},420)});const c=()=>{n!==null&&clearTimeout(n),n=null};i.addEventListener("pointermove",l=>{Math.hypot(l.clientX-s,l.clientY-r)>12&&c()}),i.addEventListener("pointerup",()=>{if(c(),o)return;const l=performance.now();if(l-a<400){a=0,Wy(i,t,e);return}a=l,e.onSelect(t)}),i.addEventListener("pointercancel",c)}function Wy(i,t,e){const n=i.querySelector(".nm");if(!n)return;const s=st("input","olinput");s.value=t.name,n.replaceWith(s),s.focus(),s.select();let r=!1;const o=a=>{if(r)return;r=!0,a&&s.value.trim()&&e.onRename(t,s.value.trim());const c=st("span","nm",t.name);s.replaceWith(c)};s.addEventListener("blur",()=>o(!0)),s.addEventListener("keydown",a=>{a.key==="Enter"&&o(!0),a.key==="Escape"&&o(!1)})}const Pn=(i,t,e)=>({label:i,detail:t,note:e}),Xy={sculpt:{kicker:"未実装 — v1.5 の中核",title:"スカルプト",body:"モデリングモードで作ったローモデルを、クリースとディバイドでハイメッシュ化します。ディバイドスライダーを下げてモデリングに戻り頂点を編集すると、ハイメッシュのディテールを保ったままローモデルを調整できます。左のゲージはそのまま「ブラシ強度」と「ブラシサイズ」に置き換わります。",items:[Pn("ブラシ","Standard / Clay / Move / Smooth / Pinch / Inflate / Flatten / Trim / Polish","11 種"),Pn("サブディビジョン","接空間デルタによるマルチ解像度スタック","docs/03"),Pn("マスキング","ペン描画、キャビティ、ポリグループ、裏面マスク","自前実装"),Pn("対称","X / Y / Z 軸対称と放射状対称","自前実装"),Pn("レイヤー","レベルごとのデルタバッファと強度スライダー","v1.5")]},material:{kicker:"未実装 — v2.0 予定",title:"マテリアル",body:"2D ビュー（UV 空間）と 3D ビューを同時に表示し、両方で同期してペイントします。Substance のファイル形式は非公開のため直接は読めません。書き出したテクスチャセットを命名規則で自動認識する方式で対応します。左のゲージは「不透明度」と「ブラシサイズ」に置き換わります。",items:[Pn("チャンネル","BaseColor / Roughness / Metallic / Normal / Height / AO / Emissive","7 種"),Pn("レイヤー","塗り、ペイント、マスク、フォルダ、ブレンドモード","自前実装"),Pn("ベイク","法線、AO、カーブチャ、厚み、ポジション、ID","2K 既定"),Pn("読み込み","テクスチャセット（PNG / TGA / EXR）と MaterialX",".sbsar 不可"),Pn("書き出し","テクスチャセット、glTF、MaterialX","自前実装")]}};function $y(i){const t=st("div","stub"),e=st("div","stub-in");e.appendChild(st("div","kicker",i.kicker)),e.appendChild(st("h2",void 0,i.title)),e.appendChild(st("p",void 0,i.body));const n=st("ul");for(const s of i.items){const r=st("li");r.appendChild(st("b",void 0,s.label)),r.appendChild(st("span",void 0,s.detail)),r.appendChild(st("em",void 0,s.note)),n.appendChild(r)}return e.appendChild(n),t.appendChild(e),t}const Ye={face:new bn({color:7776477,transparent:!0,opacity:.3,side:Xe,depthWrite:!1}),faceSel:new bn({color:15765820,transparent:!0,opacity:.5,side:Xe,depthWrite:!1}),wire:new ye({color:15134454}),seam:new ye({color:16739146}),wireSel:new ye({color:15765820}),point:new rn({color:12033002,size:6,sizeAttenuation:!1}),pointSel:new rn({color:15765820,size:9,sizeAttenuation:!1}),pin:new rn({color:7139450,size:11,sizeAttenuation:!1}),border:new ye({color:9675181}),manip:new ye({color:14862432}),manipHot:new ye({color:16770688}),manipCenter:new rn({color:14862432,size:10,sizeAttenuation:!1}),manipPivot:new ye({color:10149450}),manipPivotPoint:new rn({color:10149450,size:12,sizeAttenuation:!1})};function qy(i){const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d"),s=256/i;for(let o=0;o<i;o++)for(let a=0;a<i;a++)n.fillStyle=(a+o)%2===0?"#333a42":"#282e35",n.fillRect(a*s,o*s,s,s);const r=new Yu(e);return r.wrapS=ki,r.wrapT=ki,r.magFilter=Ie,r}class Yy{constructor(t,e){this.container=t,this.renderer=new uf({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(2106410,1),this.scene.add(this.group),this.buildBackground(),this.resize()}renderer;scene=new nc;camera=new ir(-.2,1.2,1.2,-.2,-10,10);center={u:.5,v:.5};span=1.4;checkerCells=8;group=new nc;topology=null;frame=0;background=null;buildBackground(){this.background&&(this.scene.remove(this.background),this.background.geometry.dispose(),this.background.material.map?.dispose(),this.background.material.dispose());const t=new nr(1,1);t.translate(.5,.5,0);const e=new bn({map:qy(this.checkerCells)}),n=new be(t,e);n.position.z=-1,this.scene.add(n),this.background=n;const s=new he;s.setAttribute("position",new Zt([0,0,0,1,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,1,0,0,0,0],3));const r=new Dn(s,Ye.border);r.position.z=-.5,this.scene.add(r)}setCheckerCells(t){this.checkerCells=t,this.buildBackground()}get cells(){return this.checkerCells}resize(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.applyCamera()}applyCamera(){const t=this.container.clientWidth||1,e=this.container.clientHeight||1,n=t/e,s=this.span/2,r=n>=1?s*n:s,o=n>=1?s:s/n;this.camera.left=this.center.u-r,this.camera.right=this.center.u+r,this.camera.top=this.center.v+o,this.camera.bottom=this.center.v-o,this.camera.updateProjectionMatrix()}pixelToUv(){const t=this.container.clientHeight||1;return(this.camera.top-this.camera.bottom)/t}pan(t,e){const n=this.pixelToUv();this.center.u-=t*n,this.center.v+=e*n,this.applyCamera()}zoom(t){this.span=Math.max(.02,Math.min(20,this.span*t)),this.applyCamera()}frameUnit(){this.center={u:.5,v:.5},this.span=1.4,this.applyCamera()}framepoints(t){if(!t.length)return this.frameUnit();let e=1/0,n=1/0,s=-1/0,r=-1/0;for(const o of t)e=Math.min(e,o.u),s=Math.max(s,o.u),n=Math.min(n,o.v),r=Math.max(r,o.v);this.center={u:(e+s)/2,v:(n+r)/2},this.span=Math.max(.05,Math.max(s-e,r-n)*1.5),this.applyCamera()}toUv(t){const e=this.container.clientWidth||1,n=this.container.clientHeight||1;return{u:this.camera.left+t.x/e*(this.camera.right-this.camera.left),v:this.camera.top-t.y/n*(this.camera.top-this.camera.bottom)}}toScreen(t,e){const n=this.container.clientWidth||1,s=this.container.clientHeight||1;return{x:(t-this.camera.left)/(this.camera.right-this.camera.left)*n,y:(this.camera.top-e)/(this.camera.top-this.camera.bottom)*s}}get uvTopology(){return this.topology}build(t,e){for(const g of this.group.children.slice())this.group.remove(g),(g instanceof be||g instanceof Dn||g instanceof dn)&&g.geometry.dispose();if(this.topology=null,!t)return;const n=t.mesh,s=n.uvSets.get(Ee);if(!s)return;const r=e?.seams??new Set,o=bs(n,r),a=[],c=[],l=[],h=new Map,f=new Map;o.forEach((g,m)=>{for(const _ of g.faces)f.set(_,m);const x=po(n,g,r),y=a.length;for(let _=0;_<x.count;_++)a.push([]),c.push(0,0),l.push(m);for(const _ of g.corners){const S=y+x.localOf.get(_);a[S].push(_),h.set(_,S);const w=Be(n,_);c[S*2]=s[w*2],c[S*2+1]=s[w*2+1]}});const u=[],d=[],p=[],v=new Set;for(let g=0;g<n.faceCount;g++){const m=n.faceVerts(g),x=f.get(g)??0;for(let y=0;y<m.length;y++){const _=h.get(Un(g,y)),S=h.get(Un(g,(y+1)%m.length));if(_===void 0||S===void 0)continue;const w=`${Math.min(_,S)}_${Math.max(_,S)}`;if(v.has(w))continue;v.add(w),u.push([_,S]),d.push(x);const A=m[y],M=m[(y+1)%m.length];p.push(`${Math.min(A,M)}_${Math.max(A,M)}`)}}this.topology={charts:o,vertexCorners:a,vertexUv:Float32Array.from(c),vertexChart:Int32Array.from(l),edges:u,edgeChart:Int32Array.from(d),edgeKeys:p,cornerToVertex:h,chartOfFace:f},this.draw(t,r)}draw(t,e){const n=this.topology,s=t.mesh,r=[],o=[];for(let v=0;v<n.vertexUv.length/2;v++)r.push(n.vertexUv[v*2],n.vertexUv[v*2+1],0);for(let v=0;v<s.faceCount;v++){const g=s.faceSize(v),m=[];for(let x=0;x<g;x++){const y=this.vertexOfCorner(Un(v,x));y>=0&&m.push(y)}if(!(m.length<3))for(let x=1;x<m.length-1;x++)o.push(m[0],m[x],m[x+1])}const a=new he;a.setAttribute("position",new Zt(r,3)),a.setIndex(o);const c=new be(a,Ye.face);c.renderOrder=0,this.group.add(c);const l=[],h=[],f=this.pixelToUv();n.edges.forEach(([v,g],m)=>{const x=n.vertexUv[v*2],y=n.vertexUv[v*2+1],_=n.vertexUv[g*2],S=n.vertexUv[g*2+1];if(!e.has(n.edgeKeys[m])){l.push(x,y,.01,_,S,.01);return}const w=_-x,A=S-y,M=Math.hypot(w,A)||1,E=-A/M*f,P=w/M*f;for(const C of[-1,0,1])h.push(x+E*C,y+P*C,.02,_+E*C,S+P*C,.02)});for(const[v,g]of[[l,Ye.wire],[h,Ye.seam]]){if(!v.length)continue;const m=new he;m.setAttribute("position",new Zt(v,3));const x=new Dn(m,g);x.renderOrder=1,this.group.add(x)}const u=[];for(let v=0;v<n.vertexUv.length/2;v++)u.push(n.vertexUv[v*2],n.vertexUv[v*2+1],.02);const d=new he;d.setAttribute("position",new Zt(u,3));const p=new dn(d,Ye.point);p.renderOrder=2,this.group.add(p)}vertexOfCorner(t){return this.topology?.cornerToVertex.get(t)??-1}overlay=[];highlight(t,e,n,s){for(const o of this.overlay)this.group.remove(o),o.geometry.dispose();this.overlay=[];const r=this.topology;if(!(!r||!s)){if(t==="vertex"&&e.size){const o=[];for(const a of e)o.push(r.vertexUv[a*2],r.vertexUv[a*2+1],.05);this.addOverlay(new dn(cs(o),Ye.pointSel))}if(t==="edge"&&e.size){const o=[];for(const a of e){const[c,l]=r.edges[a]??[0,0];o.push(r.vertexUv[c*2],r.vertexUv[c*2+1],.05,r.vertexUv[l*2],r.vertexUv[l*2+1],.05)}this.addOverlay(new Dn(cs(o),Ye.wireSel))}if(t==="shell"&&e.size){const o=[],a=[];for(const l of e){const h=r.charts[l];if(h)for(const f of h.faces){const u=s.mesh.faceSize(f),d=[];for(let p=0;p<u;p++){const v=this.vertexOfCorner(Un(f,p));v<0||(d.push(o.length/3),o.push(r.vertexUv[v*2],r.vertexUv[v*2+1],.04))}for(let p=1;p<d.length-1;p++)a.push(d[0],d[p],d[p+1])}}const c=cs(o);c.setIndex(a),this.addOverlay(new be(c,Ye.faceSel))}if(n.size){const o=[];for(const a of n)o.push(r.vertexUv[a*2],r.vertexUv[a*2+1],.06);this.addOverlay(new dn(cs(o),Ye.pin))}}}manip=null;manipPoints=null;drawManipulator(t,e,n,s){for(const u of[this.manip,this.manipPoints])u&&(this.group.remove(u),u.geometry.dispose());if(this.manip=null,this.manipPoints=null,!t)return;const r=this.pixelToUv(),o=n*r,a=[],c=(u,d,p,v)=>{a.push(t.u+u,t.v+d,.08,t.u+p,t.v+v,.08)};if(c(0,0,o,0),c(o,0,o-o*.18,o*.09),c(o,0,o-o*.18,-o*.09),c(0,0,0,o),c(0,o,o*.09,o-o*.18),c(0,o,-o*.09,o-o*.18),!s){const u=o*.78,d=o*.07;c(u-d,u-d,u+d,u-d),c(u+d,u-d,u+d,u+d),c(u+d,u+d,u-d,u+d),c(u-d,u+d,u-d,u-d),c(0,0,u-d,u-d);const p=o*1.15,v=48;for(let g=0;g<v;g++){const m=g/v*Math.PI*2,x=(g+1)/v*Math.PI*2;c(Math.cos(m)*p,Math.sin(m)*p,Math.cos(x)*p,Math.sin(x)*p)}}const l=cs(a),h=new Dn(l,s?Ye.manipPivot:e>=0?Ye.manipHot:Ye.manip);h.renderOrder=6,this.group.add(h),this.manip=h;const f=new dn(cs([t.u,t.v,.09]),s?Ye.manipPivotPoint:Ye.manipCenter);f.renderOrder=7,this.group.add(f),this.manipPoints=f}pickManipulator(t,e,n,s){if(!e)return-1;const r=this.toUv(t),o=this.pixelToUv(),a=(r.u-e.u)/o,c=(r.v-e.v)/o,l=Math.hypot(a,c);return l<14?3:!s&&((f,u)=>Math.hypot(a-f,c-u)<14)(n*.78,n*.78)?23:a>10&&a<n*1.1&&Math.abs(c)<12?0:c>10&&c<n*1.1&&Math.abs(a)<12?1:!s&&Math.abs(l-n*1.15)<12?10:-1}addOverlay(t){t.renderOrder=5,this.group.add(t),this.overlay.push(t)}pickVertex(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t),r=e*this.pixelToUv();let o=-1,a=r;for(let c=0;c<n.vertexUv.length/2;c++){const l=Math.hypot(n.vertexUv[c*2]-s.u,n.vertexUv[c*2+1]-s.v);l<a&&(a=l,o=c)}return o}pickEdge(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t),r=e*this.pixelToUv();let o=-1,a=r;return n.edges.forEach(([c,l],h)=>{const f=n.vertexUv[c*2],u=n.vertexUv[c*2+1],d=n.vertexUv[l*2],p=n.vertexUv[l*2+1],v=d-f,g=p-u,m=v*v+g*g,x=m>1e-12?Math.max(0,Math.min(1,((s.u-f)*v+(s.v-u)*g)/m)):0,y=Math.hypot(f+v*x-s.u,u+g*x-s.v);y<a&&(a=y,o=h)}),o}pickFace(t,e){const n=this.topology;if(!n)return-1;const s=this.toUv(t);for(let r=0;r<e.mesh.faceCount;r++){const o=e.mesh.faceSize(r),a=[];for(let c=0;c<o;c++){const l=this.vertexOfCorner(Un(r,c));l<0||a.push([n.vertexUv[l*2],n.vertexUv[l*2+1]])}if(a.length>=3&&Ky(a,s.u,s.v))return r}return-1}start(){const t=()=>{this.frame=requestAnimationFrame(t),this.renderer.render(this.scene,this.camera)};this.frame||t()}stop(){this.frame&&cancelAnimationFrame(this.frame),this.frame=0}}function cs(i){const t=new he;return t.setAttribute("position",new Zt(i,3)),t}function Ky(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++){const[o,a]=i[s],[c,l]=i[r];a>e!=l>e&&t<(c-o)*(e-a)/(l-a)+o&&(n=!n)}return n}const Zy=20,jy=14;class Jy{constructor(t,e,n){this.pane=t,this.host=n,this.view=new Yy(t,e),this.router=new Nd(e,s=>this.local(s),this.handlers()),this.router.attach()}view;router;unit="shell";chosen=new Set;pinned=new Set;drag=null;gesture=null;marquee=null;menuOpened=!1;manipDrag=null;pivotOverride=null;cancelPress(){this.menuOpened=!0,this.marquee=null,this.host.marquee(null),this.drag=null,this.manipDrag=null}local(t){const e=this.pane.getBoundingClientRect();return{x:t.clientX-e.left,y:t.clientY-e.top}}start(){this.view.start()}stop(){this.view.stop()}resize(){this.view.resize()}stats(){const t=this.host.object(),e=this.host.recipe(),n={vertex:"UV 頂点",edge:"UV エッジ",shell:"UV シェル"}[this.unit];if(!t||!e)return{charts:0,maxStretch:1,unit:n};let s=1;const r=this.view.uvTopology;if(r)for(const o of r.charts){const a=po(t.mesh,o,e.seams),c=t.mesh.uvSets.get(Ee);if(!c)continue;const l=new Float64Array(a.count*2);for(const h of o.corners){const f=a.localOf.get(h),u=Be(t.mesh,h);l[f*2]=c[u*2],l[f*2+1]=c[u*2+1]}s=Math.max(s,qc(a.positions,a.tri,l).maxStretch)}return{charts:r?.charts.length??0,maxStretch:s,unit:n}}rebuild(){const t=this.host.object();this.view.build(t,this.host.recipe()),this.syncPins(),this.refreshHighlight()}refreshHighlight(){this.view.highlight(this.unit,this.chosen,this.pinned,this.host.object()),this.refreshManipulator()}setUnit(t){this.unit!==t&&(this.unit=t,this.chosen.clear(),this.pivotOverride=null,this.refreshHighlight(),this.host.changed(null))}syncPins(){this.pinned.clear();const t=this.view.uvTopology,e=this.host.recipe();if(!(!t||!e))for(const n of e.pins.keys()){const s=t.cornerToVertex.get(n);s!==void 0&&this.pinned.add(s)}}syncFromView(t,e){const n=this.view.uvTopology,s=this.host.object();if(!(!n||!s)){if(t==="vertex"){this.unit="vertex",this.chosen.clear();const r=new Set(e.verts??[]);for(let o=0;o<n.vertexCorners.length;o++)for(const a of n.vertexCorners[o]??[]){const[c,l]=a.split(":").map(Number),h=s.mesh.faceVerts(c);if(h[l]!==void 0&&r.has(h[l])){this.chosen.add(o);break}}}else if(t==="edge"){this.unit="edge",this.chosen.clear();const r=new Set(e.edges??[]);n.edgeKeys.forEach((o,a)=>{r.has(o)&&this.chosen.add(a)})}else{this.unit="shell",this.chosen.clear();for(const r of e.faces??[]){const o=n.chartOfFace.get(r);o!==void 0&&this.chosen.add(o)}}this.refreshHighlight()}}pushToViewForTest(){this.pushToView()}pushToView(){const t=this.view.uvTopology,e=this.host.object();if(!t||!e){this.host.syncToView({mode:"face",verts:[],edges:[],faces:[]});return}if(this.unit==="vertex"){const n=new Set;for(const s of this.chosen)for(const r of t.vertexCorners[s]??[]){const[o,a]=r.split(":").map(Number),c=e.mesh.faceVerts(o);c[a]!==void 0&&n.add(c[a])}this.host.syncToView({mode:"vertex",verts:[...n].sort((s,r)=>s-r),edges:[],faces:[]});return}if(this.unit==="edge"){const n=new Set;for(const s of this.chosen){const r=t.edgeKeys[s];r&&n.add(r)}this.host.syncToView({mode:"edge",verts:[],edges:[...n].sort(),faces:[]});return}this.host.syncToView({mode:"face",verts:[],edges:[],faces:this.facesOfSelection()})}facesOfSelection(){const t=this.view.uvTopology;if(!t)return[];const e=new Set;if(this.unit==="shell")for(const n of this.chosen)for(const s of t.charts[n]?.faces??[])e.add(s);else{const n=[];if(this.unit==="vertex")for(const s of this.chosen)n.push(...t.vertexCorners[s]??[]);else for(const s of this.chosen){const[r,o]=t.edges[s]??[-1,-1];n.push(...t.vertexCorners[r]??[],...t.vertexCorners[o]??[])}for(const s of n)e.add(Number(s.slice(0,s.indexOf(":"))))}return[...e].sort((n,s)=>n-s)}selectedCorners(){const t=this.view.uvTopology;if(!t)return{corners:[],chart:-1};const e=[];let n=-1;const s=r=>{n<0&&(n=r)};if(this.unit==="shell")for(const r of this.chosen){s(r);for(const o of t.charts[r]?.corners??[])e.push(o)}else if(this.unit==="vertex")for(const r of this.chosen)s(t.vertexChart[r]),e.push(...t.vertexCorners[r]??[]);else for(const r of this.chosen){s(t.edgeChart[r]);const[o,a]=t.edges[r]??[-1,-1];e.push(...t.vertexCorners[o]??[],...t.vertexCorners[a]??[])}return{corners:[...new Set(e)],chart:n}}captureBase(t){const e=this.host.object(),n=new Map;if(!e)return n;const s=e.mesh.uvSets.get(Ee);if(!s)return n;for(const r of t){const o=Be(e.mesh,r);o>=0&&n.set(r,[s[o*2],s[o*2+1]])}return n}applyOffset(t,e,n,s=1,r=0,o){const a=this.host.object();if(!a)return;const c=a.mesh.uvSets.get(Ee);if(!c)return;const l=o??_u(t),h=Math.cos(r),f=Math.sin(r);for(const[u,d]of t){const p=Be(a.mesh,u);if(p<0)continue;const v=(d[0]-l.u)*s,g=(d[1]-l.v)*s;c[p*2]=l.u+v*h-g*f+e,c[p*2+1]=l.v+v*f+g*h+n}this.rebuildGeometryOnly()}manipulatorPivot(){if(this.pivotOverride)return this.pivotOverride;if(!this.view.uvTopology||!this.chosen.size)return null;const{corners:e}=this.selectedCorners();if(!e.length)return null;const n=this.host.object(),s=n?.mesh.uvSets.get(Ee);if(!n||!s)return null;let r=1/0,o=1/0,a=-1/0,c=-1/0;for(const l of e){const h=Be(n.mesh,l);h<0||(r=Math.min(r,s[h*2]),a=Math.max(a,s[h*2]),o=Math.min(o,s[h*2+1]),c=Math.max(c,s[h*2+1]))}return Number.isFinite(r)?{u:(r+a)/2,v:(o+c)/2}:null}refreshManipulator(){this.view.drawManipulator(this.manipulatorPivot(),this.manipDrag?.handle??-1,this.manipSizePx(),this.host.pivotEdit())}manipSizePx(){return 60*this.host.manipSize()}resetPivot(){this.pivotOverride=null,this.refreshManipulator()}beginManip(t,e,n){const s=this.view.toUv(e);if(this.host.pivotEdit()){this.manipDrag={handle:t,start:s,pivot:n,base:new Map,chart:-1,snapshot:null,moved:!1},this.refreshManipulator();return}const{corners:r,chart:o}=this.selectedCorners();r.length&&(this.manipDrag={handle:t,start:s,pivot:n,base:this.captureBase(r),chart:o,snapshot:this.host.snapshot(),moved:!1},this.refreshManipulator())}updateManip(t){const e=this.manipDrag;if(!e)return;const n=this.view.toUv(t),s=n.u-e.start.u,r=n.v-e.start.v;if(this.host.pivotEdit()){const l={u:e.pivot.u+s,v:e.pivot.v+r};e.handle===0&&(l.v=e.pivot.v),e.handle===1&&(l.u=e.pivot.u);const h=this.host.uvSnap();h?.kind==="grid"&&(l.u=Math.round(l.u/h.step)*h.step,l.v=Math.round(l.v/h.step)*h.step),this.pivotOverride=l,e.moved=!0,this.refreshManipulator(),this.host.hint(`ピボット <kbd>${l.u.toFixed(3)}, ${l.v.toFixed(3)}</kbd>`);return}if(e.moved=!0,e.handle===10){const l=Math.atan2(e.start.v-e.pivot.v,e.start.u-e.pivot.u),f=Math.atan2(n.v-e.pivot.v,n.u-e.pivot.u)-l;this.applyOffset(e.base,0,0,1,f,e.pivot),this.host.hint(`回転 <kbd>${(f*180/Math.PI).toFixed(1)}°</kbd>`);return}if(e.handle===23){const l=Math.hypot(e.start.u-e.pivot.u,e.start.v-e.pivot.v),h=Math.hypot(n.u-e.pivot.u,n.v-e.pivot.v),f=l>1e-6?Math.max(.02,h/l):1;this.applyOffset(e.base,0,0,f,0,e.pivot),this.host.hint(`スケール <kbd>×${f.toFixed(2)}</kbd>`);return}let o=e.handle===1?0:s,a=e.handle===0?0:r;const c=this.host.uvSnap();if(c){const l=_u(e.base);if(c.kind==="grid"){const h=Math.round((l.u+o)/c.step)*c.step,f=Math.round((l.v+a)/c.step)*c.step;e.handle!==1&&(o=h-l.u),e.handle!==0&&(a=f-l.v)}}this.applyOffset(e.base,o,a,1,0,e.pivot),this.host.hint(`移動 <kbd>${o.toFixed(3)}, ${a.toFixed(3)}</kbd>`)}endManip(){const t=this.manipDrag;if(this.manipDrag=null,!!t){if(t.moved&&!this.host.pivotEdit()&&t.snapshot!==null){const e=t.handle===10?"UV を回転":t.handle===23?"UV をスケール":"UV を移動";this.recordFrom(t.base,t.chart)&&this.host.commit(e,t.snapshot),this.host.changed(null)}this.refreshManipulator()}}recordFrom(t,e){const n=this.host.object(),s=this.host.recipe(),r=this.view.uvTopology;if(!n||!s||!r||e<0)return!1;const o=n.mesh.uvSets.get(Ee),a=r.charts[e]?.fingerprint;if(!o||!a)return!1;const c=new Map;let l=!1;for(const[h,f]of t){const u=Be(n.mesh,h);if(u<0)continue;const d=o[u*2]-f[0],p=o[u*2+1]-f[1];Math.abs(d)<1e-9&&Math.abs(p)<1e-9||(c.set(h,[d,p]),l=!0)}return l&&id(s,a,c),l}rebuildGeometryOnly(){this.view.build(this.host.object(),this.host.recipe()),this.refreshHighlight()}unfold(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;const n=this.host.snapshot(),s=e.method==="none";s&&(e.method="lscm");const r=Di(t.mesh,e);this.host.commit("展開",n),this.rebuild(),this.host.changed(`展開 — 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}`+(s?"（LSCM に切り替えた）":""))}autoUnwrap(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;const n=this.host.snapshot(),s=Hf(t.mesh,e.autoSeamParams,this.host.smoothAngle());e.seams=s,e.manual.clear(),e.pins.clear(),e.method="lscm";const r=Di(t.mesh,e);this.host.commit("自動 UV",n),this.chosen.clear(),this.rebuild(),this.host.changed(`自動 UV — 切れ目 ${s.size} 本 / 島 ${r.charts.length} / 伸び ×${r.maxStretch.toFixed(2)}`)}repack(){const t=this.host.object(),e=this.host.recipe();if(!t||!e)return;if(e.method==="none"){this.host.toast("「取り込んだまま」では並べ直せません。先に展開してください");return}const n=this.host.snapshot();e.manual.clear();const s=Di(t.mesh,e);this.host.commit("整列",n),this.rebuild(),this.host.changed(`整列 — 島 ${s.charts.length} を 0〜1 に詰めた`)}setMethod(t){const e=this.host.object(),n=this.host.recipe();if(!e||!n||n.method===t)return;const s=this.host.snapshot();if(n.method=t,t==="none"){const r=e.mesh.uvSets.get(Ee);r&&(n.base=Float32Array.from(r),n.manual.clear())}Di(e.mesh,n),this.host.commit("ソルバーの変更",s),this.rebuild(),this.host.changed({lscm:"LSCM",projection:"投影",none:"なし"}[t])}cutOrSew(t){const e=this.host.object(),n=this.host.recipe(),s=this.view.uvTopology;if(!e||!n||!s)return;if(!this.chosen.size){this.host.toast("先に選んでから実行してください");return}const r=this.edgesForCutSew(t),o=this.host.snapshot(),a=[];for(const c of r)(t?!n.seams.has(c):n.seams.has(c))&&(t?n.seams.add(c):n.seams.delete(c),a.push(c));if(!a.length){this.host.toast(t?"すでに切れています":"切れ目ではありません");return}!t&&n.method==="none"&&n.base&&nd(e.mesh,n.base,a),Di(e.mesh,n),this.host.commit(t?"カット":"ソー",o),this.chosen.clear(),this.rebuild(),this.host.changed(`${t?"カット":"ソー"} — ${a.length} 本`)}edgesForCutSew(t){const e=this.host.object(),n=this.view.uvTopology;if(!e||!n)return[];if(this.unit==="edge")return[...this.chosen].map(l=>n.edgeKeys[l]).filter(l=>!!l);if(this.unit==="vertex"){const l=new Set;for(const f of this.chosen)for(const u of n.vertexCorners[f]??[]){const[d,p]=u.split(":").map(Number),v=e.mesh.faceVerts(d);v[p]!==void 0&&l.add(v[p])}const h=new Set;for(const[f,u]of e.mesh.edges()){const d=l.has(f)&&l.has(u),p=l.size===1&&(l.has(f)||l.has(u));(d||p)&&h.add(bt(f,u))}return[...h].sort()}const s=this.host.selectedFaces(),r=new Set(s.length?s:this.facesOfSelection()),o=l=>r.has(l),a=new Map;for(let l=0;l<e.mesh.faceCount;l++){const h=e.mesh.faceSize(l),f=e.mesh.faceVerts(l);for(let u=0;u<h;u++){const d=bt(f[u],f[(u+1)%h]),p=a.get(d);p?p.push(l):a.set(d,[l])}}const c=[];for(const[l,h]of a){if(h.length!==2)continue;const[f,u]=h;(t?o(f)!==o(u):o(f)&&o(u))&&c.push(l)}return c.sort()}pinOrUnpin(t){const e=this.host.object(),n=this.host.recipe(),s=this.view.uvTopology;if(!e||!n||!s)return;if(this.unit!=="vertex"||!this.chosen.size){this.host.toast("UV 頂点を選んでから実行してください");return}const r=e.mesh.uvSets.get(Ee);if(!r)return;const o=this.host.snapshot();for(const a of this.chosen)for(const c of s.vertexCorners[a]??[])if(t){const l=Be(e.mesh,c);n.pins.set(c,[r[l*2],r[l*2+1]])}else n.pins.delete(c);this.host.commit(t?"ピン":"ピン解除",o),this.syncPins(),this.refreshHighlight(),this.host.changed(`${t?"ピン":"ピン解除"} — ${this.chosen.size} 点`)}tidy(t){const e=this.host.object();if(!e)return;const{corners:n,chart:s}=this.selectedCorners();if(n.length<2){this.host.toast("2 つ以上選んでから実行してください");return}const r=e.mesh.uvSets.get(Ee);if(!r)return;const o=this.host.snapshot(),a=this.captureBase(n),c=[],l=new Map;for(const f of n){const u=Be(e.mesh,f);u<0||(c.push(u),l.set(u,f))}const h={alignU:"整列 U",alignV:"整列 V",straighten:"直線化",merge:"マージ",symmetry:"対称"}[t];if(t==="alignU")Kf(r,c);else if(t==="alignV")Zf(r,c);else if(t==="straighten")jf(r,Qy(r,c));else if(t==="merge")Qf(r,c,.01);else{const f=tb(r,c);if(!f.length){this.host.toast("対称の相手が見つかりません");return}td(r,f)}this.recordFrom(a,s),this.host.commit(h,o),this.rebuildGeometryOnly(),this.rebuild(),this.host.changed(h)}transformSelection(t){const e=this.host.object();if(!e)return;const{corners:n,chart:s}=this.selectedCorners();if(!n.length){this.host.toast("選択してから実行してください");return}const r=e.mesh.uvSets.get(Ee);if(!r)return;const o=this.host.snapshot(),a=this.captureBase(n);let c=0,l=0;for(const[,h]of a)c+=h[0],l+=h[1];c/=a.size,l/=a.size;for(const[h,f]of a){const u=Be(e.mesh,h),d=f[0]-c,p=f[1]-l;t==="flipU"?r[u*2]=c-d:t==="flipV"?r[u*2+1]=l-p:(r[u*2]=c-p,r[u*2+1]=l+d)}this.recordFrom(a,s),this.host.commit({flipU:"反転 U",flipV:"反転 V",rotate90:"90° 回転"}[t],o),this.rebuildGeometryOnly(),this.host.changed(null)}handlers(){return{toolDown:(t,e)=>this.down(t,e),toolMove:t=>this.move(t),toolUp:(t,e,n)=>this.up(t,e,n),hover:()=>{},hoverLeave:()=>{},openMarkingMenu:(t,e,n)=>{this.cancelPress(),this.host.markingMenu(t,e,n)},openTwoFingerMenu:(t,e)=>{this.cancelPress(),this.host.markingMenu(t,e,!0)},openCameraMenu:(t,e)=>{this.cancelPress(),this.host.cameraMenu(t,e)},undo:()=>this.host.undo(),redo:()=>this.host.redo(),abort:()=>{this.drag=null,this.gesture=null,this.manipDrag=null,this.marquee=null,this.host.marquee(null)},transformBegin:()=>this.gestureBegin(),transformUpdate:t=>this.gestureUpdate(t),transformEnd:()=>this.gestureEnd(),isOnMesh:()=>!0,zoomPivot:()=>null,marqueeStart:()=>{},tumble:()=>{},pan:(t,e)=>this.view.pan(t,e),dolly:t=>this.view.zoom(t),dollyAbout:(t,e)=>this.view.zoom(e),shiftOn:t=>this.host.shiftOn(t),altOn:()=>!1}}down(t,e){const n=this.host.object();if(!n)return;this.menuOpened=!1;const s=this.host.shiftOn(e),r=this.host.ctrlOn(e),o=this.manipulatorPivot();if(o&&!s&&!r){const c=this.view.pickManipulator(t,o,this.manipSizePx(),this.host.pivotEdit());if(c>=0){this.beginManip(c,t,o);return}}const a=this.pick(t,n);if(a>=0&&this.chosen.has(a)&&!s&&!r){this.beginDrag(t,e);return}if(a<0){this.marquee={x0:t.x,y0:t.y,x1:t.x,y1:t.y,add:s,sub:r,moved:!1};return}r?this.chosen.delete(a):(s||this.chosen.clear(),this.chosen.add(a)),this.refreshHighlight(),this.pushToView(),this.beginDrag(t,e)}updateMarquee(t){const e=this.marquee;e&&(e.x1=t.x,e.y1=t.y,(Math.abs(e.x1-e.x0)>ms||Math.abs(e.y1-e.y0)>ms)&&(e.moved=!0),this.host.marquee(e.moved?{x0:e.x0,y0:e.y0,x1:e.x1,y1:e.y1}:null))}applyMarquee(t){const e=this.topologyOrNull();if(!e)return;const n=this.view.toUv({x:Math.min(t.x0,t.x1),y:Math.max(t.y0,t.y1)}),s=this.view.toUv({x:Math.max(t.x0,t.x1),y:Math.min(t.y0,t.y1)}),r=(a,c)=>a>=n.u&&a<=s.u&&c>=n.v&&c<=s.v;!t.add&&!t.sub&&this.chosen.clear();const o=a=>{t.sub?this.chosen.delete(a):this.chosen.add(a)};if(this.unit==="vertex")for(let a=0;a<e.vertexUv.length/2;a++)r(e.vertexUv[a*2],e.vertexUv[a*2+1])&&o(a);else if(this.unit==="edge")e.edges.forEach(([a,c],l)=>{const h=(e.vertexUv[a*2]+e.vertexUv[c*2])/2,f=(e.vertexUv[a*2+1]+e.vertexUv[c*2+1])/2;r(h,f)&&o(l)});else{const a=new Set;for(let c=0;c<e.vertexUv.length/2;c++)r(e.vertexUv[c*2],e.vertexUv[c*2+1])&&a.add(e.vertexChart[c]);for(const c of a)o(c)}this.refreshHighlight(),this.pushToView()}topologyOrNull(){return this.view.uvTopology}pick(t,e){if(this.unit==="vertex")return this.view.pickVertex(t,Zy);if(this.unit==="edge")return this.view.pickEdge(t,jy);const n=this.view.pickFace(t,e);return n<0?-1:this.view.uvTopology?.chartOfFace.get(n)??-1}beginDrag(t,e){const{corners:n,chart:s}=this.selectedCorners();n.length&&(this.drag={start:t,base:this.captureBase(n),chart:s,snapshot:this.host.snapshot(),moved:!1,pending:e.pointerType!=="mouse",t0:performance.now()})}move(t){if(this.manipDrag)return this.updateManip(t);if(this.marquee)return this.updateMarquee(t);const e=this.drag;if(!e)return;if(e.pending){const a=Math.hypot(t.x-e.start.x,t.y-e.start.y),c=performance.now()-e.t0;if(a<=al&&!(a>ms&&c>cl))return;e.pending=!1}const n=this.view.pixelToUv();let s=(t.x-e.start.x)*n,r=-(t.y-e.start.y)*n;const o=this.host.uvSnap();if(o&&e.base.size){const a=this.anchorCorner(e,t);if(a){const c=[a[1][0]+s,a[1][1]+r],l=o.kind==="grid"?[Math.round(c[0]/o.step)*o.step,Math.round(c[1]/o.step)*o.step]:this.nearestUvVertex(c,e.base);l&&(s=l[0]-a[1][0],r=l[1]-a[1][1])}}(Math.abs(s)>1e-9||Math.abs(r)>1e-9)&&(e.moved=!0),this.applyOffset(e.base,s,r),this.host.hint((o?`スナップ ${o.kind==="grid"?"グリッド":"UV 頂点"} · `:"")+`移動 <kbd>${s.toFixed(3)}, ${r.toFixed(3)}</kbd>`)}anchorCorner(t,e){let n=null,s=1/0;for(const[r,o]of t.base){const a=this.view.toScreen(o[0],o[1]),c=Math.hypot(a.x-e.x,a.y-e.y);c<s&&(s=c,n=[r,o])}return n}nearestUvVertex(t,e){const n=this.host.object(),s=this.view.uvTopology;if(!n||!s)return null;const r=n.mesh.uvSets.get(Ee);if(!r)return null;const o=this.view.toScreen(t[0],t[1]);let a=null,c=40;for(let l=0;l<s.vertexCorners.length;l++){const h=s.vertexCorners[l]??[];if(!h.length||h.some(p=>e.has(p)))continue;const f=Be(n.mesh,h[0]);if(f<0)continue;const u=this.view.toScreen(r[f*2],r[f*2+1]),d=Math.hypot(u.x-o.x,u.y-o.y);d<c&&(c=d,a=[r[f*2],r[f*2+1]])}return a}up(t,e,n){if(this.manipDrag){this.endManip();return}const s=this.marquee;this.marquee=null,this.host.marquee(null);const r=this.drag;if(this.drag=null,this.menuOpened){this.menuOpened=!1;return}if(s){s.moved?this.applyMarquee(s):!s.add&&!s.sub&&this.chosen.size&&(this.chosen.clear(),this.refreshHighlight(),this.pushToView());return}!r||!r.moved||(this.recordFrom(r.base,r.chart)&&this.host.commit("UV を移動",r.snapshot),this.host.changed(null))}gestureBegin(){const{corners:t,chart:e}=this.selectedCorners();return t.length?(this.gesture={base:this.captureBase(t),chart:e,snapshot:this.host.snapshot(),moved:!1},!0):!1}gestureUpdate(t){const e=this.gesture;if(!e)return;e.moved=!0;const n=this.view.pixelToUv();if(t.kind==="scale"){this.applyOffset(e.base,0,0,Math.max(.02,t.scale)),this.host.hint(`スケール <kbd>×${t.scale.toFixed(2)}</kbd> · 指 3 本`);return}const s=t.axis==="horizontal"?t.pixels*n:0,r=t.axis==="vertical"?-t.pixels*n:0;this.applyOffset(e.base,s,r),this.host.hint(`移動 <kbd>${t.axis==="vertical"?"V":"U"} ${(s+r).toFixed(3)}</kbd> · 指 3 本`)}gestureEnd(){const t=this.gesture;this.gesture=null,!(!t||!t.moved)&&(this.recordFrom(t.base,t.chart)&&this.host.commit("UV を変形",t.snapshot),this.host.changed(null))}frame(){const t=this.view.uvTopology,{corners:e}=this.selectedCorners(),n=this.host.object();if(!t||!n||!e.length)return this.view.frameUnit();const s=n.mesh.uvSets.get(Ee);if(!s)return this.view.frameUnit();this.view.framepoints(e.map(r=>{const o=Be(n.mesh,r);return{u:s[o*2],v:s[o*2+1]}}))}}function _u(i){let t=0,e=0;for(const[,n]of i)t+=n[0],e+=n[1];return i.size&&(t/=i.size,e/=i.size),{u:t,v:e}}function Qy(i,t){if(t.length<3)return t;let e=0,n=0;for(const h of t)e+=i[h*2],n+=i[h*2+1];e/=t.length,n/=t.length;let s=0,r=0,o=0;for(const h of t){const f=i[h*2]-e,u=i[h*2+1]-n;s+=f*f,r+=f*u,o+=u*u}const a=.5*Math.atan2(2*r,s-o),c=Math.cos(a),l=Math.sin(a);return[...t].sort((h,f)=>(i[h*2]-e)*c+(i[h*2+1]-n)*l-((i[f*2]-e)*c+(i[f*2+1]-n)*l))}function tb(i,t){let e=1/0,n=-1/0;for(const l of t)e=Math.min(e,i[l*2]),n=Math.max(n,i[l*2]);const s=(e+n)/2,r=t.filter(l=>i[l*2]<s-1e-9),o=t.filter(l=>i[l*2]>s+1e-9),a=[],c=new Set;for(const l of r.sort((h,f)=>h-f)){let h=-1,f=1/0;for(const u of o){if(c.has(u))continue;const d=Math.hypot(s*2-i[l*2]-i[u*2],i[l*2+1]-i[u*2+1]);d<f&&(f=d,h=u)}h>=0&&(c.add(h),a.push([l,h]))}return a}const H={move:'<path d="M12 3v18M3 12h18M12 3l-2.6 2.6M12 3l2.6 2.6M12 21l-2.6-2.6M12 21l2.6-2.6M3 12l2.6-2.6M3 12l2.6 2.6M21 12l-2.6-2.6M21 12l-2.6 2.6"/>',rotate:'<path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4"/><path d="M20.5 3.6v5h-5"/>',scale:'<path d="M5 19 18 6"/><path d="M12.5 6H18v5.5"/><rect x="3.2" y="15.2" width="5.6" height="5.6" rx=".8"/>',multicut:'<circle cx="5.5" cy="5.5" r="2.3"/><circle cx="5.5" cy="18.5" r="2.3"/><path d="M7.4 6.8 20 18M7.4 17.2 20 6"/>',extrude:'<path d="M4.5 13.5h8v7h-8z"/><path d="m4.5 13.5 4-4h8v7M12.5 13.5l4-4"/><path d="M20 3v5m0-5-1.8 1.8M20 3l1.8 1.8"/>',prim:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',camera:'<path d="M3.4 8.4h3.2l1.6-2.4h7.6l1.6 2.4h3.2v9.8a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1z"/><circle cx="12" cy="13" r="3.4"/>',vObj:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/>',vVert:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="6" r="2" fill="currentColor"/><circle cx="6" cy="18" r="2" fill="currentColor"/><circle cx="18" cy="18" r="2" fill="currentColor"/>',vEdge:'<rect x="6" y="6" width="12" height="12"/><path d="M6 6h12" stroke-width="3.4"/>',vFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".45"/>',vVertFace:'<rect x="6" y="6" width="12" height="12" fill="currentColor" fill-opacity=".2"/><circle cx="8.6" cy="8.6" r="2.1" fill="currentColor"/>',vMulti:'<rect x="6" y="6" width="12" height="12"/><circle cx="6" cy="6" r="1.9" fill="currentColor"/><path d="M6 18h12" stroke-width="3"/>',wire:'<rect x="4" y="4" width="16" height="16"/><path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',shaded:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".5"/>',shadedWire:'<rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" fill-opacity=".3"/><path d="M4 12h16M12 4v16"/>',smooth:'<circle cx="12" cy="12" r="8.6" fill="currentColor" fill-opacity=".5"/><path d="M8 15.4a6 6 0 0 1 5-6.6"/>',sym:'<path d="M12 3v18" stroke-dasharray="2.4 2.4"/><path d="M9.4 7 4.5 12l4.9 5zM14.6 7l4.9 5-4.9 5z"/>',xform:'<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="6.5"/><rect x="16.6" y="16.6" width="4.2" height="4.2"/><path d="M12 3l-2 2M12 3l2 2M3 12l2-2M3 12l2 2"/>',snap:'<path d="M6 20V10a6 6 0 0 1 12 0v10"/><path d="M6 15h4v5H6zM14 15h4v5h-4z"/>',pivot:'<circle cx="12" cy="12" r="2.2" fill="currentColor"/><path d="M12 2.6v5.6M12 15.8v5.6M2.6 12h5.6M15.8 12h5.6"/><circle cx="12" cy="12" r="6.6" stroke-dasharray="2.2 2.4"/>',rename:'<path d="M4 20h16"/><path d="M15.4 4.6 19 8.2 8.6 18.6 4.4 19.6l1-4.2z"/>',dup:'<rect x="3.6" y="3.6" width="12" height="12" rx="1"/><path d="M8.4 20.4h12v-12"/>',del:'<path d="M4 6.6h16M9.4 6.6V4.4h5.2v2.2M6.4 6.6l1 13.2a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9l1-13.2"/>',frame:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3"/>',mModel:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',mUV:'<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="1"/><path d="M3.4 12h17.2M12 3.4v17.2" stroke-dasharray="2.6 2.2"/>',mSculpt:'<path d="M16.4 3.6 20.4 7.6 9.6 18.4l-5.2 1.2 1.2-5.2z"/><path d="m14.4 5.6 4 4"/>',mMaterial:'<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a8.6 8.6 0 0 1 0 17.2z" fill="currentColor" fill-opacity=".45"/><path d="M3.4 12h17.2"/>',pCube:'<path d="m12 2.6 8.6 4.8v9.2L12 21.4l-8.6-4.8V7.4z"/><path d="M12 12.2 20.6 7.4M12 12.2v9.2M12 12.2 3.4 7.4"/>',pSphere:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',pCylinder:'<ellipse cx="12" cy="5.6" rx="7" ry="2.8"/><path d="M5 5.6v12.8M19 5.6v12.8"/><path d="M5 18.4a7 2.8 0 0 0 14 0"/>',pCone:'<path d="M12 3 19 18.4M12 3 5 18.4"/><ellipse cx="12" cy="18.4" rx="7" ry="2.8"/>',pTorus:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><ellipse cx="12" cy="12" rx="3.6" ry="1.9"/>',pPlane:'<path d="M2.6 16.4 9.4 6.6h12L14.6 16.4z"/><path d="M6 11.5h12"/>',pDisk:'<ellipse cx="12" cy="12" rx="9.2" ry="5.4"/><path d="M2.8 12h18.4"/>',pPlatonic:'<path d="m12 2.8 8.8 6.4-3.4 10.4H6.6L3.2 9.2z"/><path d="M12 2.8v16.8M3.2 9.2l13.8 10M20.8 9.2 7 19.2"/>'};function eb(i,t=18,e=1.6){return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${e}" stroke-linecap="round" stroke-linejoin="round">${i}</svg>`}const Tc=["N","NE","E","SE","S","SW","W","NW"],hs="http://www.w3.org/2000/svg",Pi=176,da=56,nb=42,Ac=208,Vs=32,Mu=14;let Ne=null;function ib(i,t,e,n,s,r){const o=i+Math.cos(s)*n,a=t+Math.sin(s)*n,c=i+Math.cos(r)*n,l=t+Math.sin(r)*n,h=i+Math.cos(r)*e,f=t+Math.sin(r)*e,u=i+Math.cos(s)*e,d=t+Math.sin(s)*e;return`M${o},${a}A${n},${n} 0 0 1 ${c},${l}L${h},${f}A${e},${e} 0 0 0 ${u},${d}Z`}function Vr(i,t,e,n){const s=document.createElementNS(hs,"text");return i&&s.setAttribute("class",i),s.setAttribute("x",String(t)),s.setAttribute("y",String(e)),s.setAttribute("text-anchor","middle"),s.textContent=n,s}function Jn(i,t,e,n=[]){ul();const s=n.length?Mu+n.length*Vs:0,r=Math.max(Pi+16,Math.min(window.innerWidth-Pi-16,t)),o=Math.max(Pi+16,Math.min(window.innerHeight-Pi-s-16,e)),a=document.createElement("div");a.className="radial",a.addEventListener("touchstart",d=>d.preventDefault(),{passive:!1}),a.addEventListener("touchmove",d=>d.preventDefault(),{passive:!1});const c=document.createElementNS(hs,"svg");a.appendChild(c),document.body.appendChild(a);const l=[];for(let d=0;d<8;d++){const p=i[Tc[d]],v=(d*45-22.5-90)*Math.PI/180,g=(d*45+22.5-90)*Math.PI/180,m=document.createElementNS(hs,"path");if(m.setAttribute("d",ib(r,o,da,Pi,v,g)),m.setAttribute("fill",p?"#2c3238":"#23272c"),m.setAttribute("stroke","#171a1e"),m.setAttribute("stroke-width","1"),m.setAttribute("opacity",p?"1":".45"),c.appendChild(m),!p){l.push(null);continue}const x=(v+g)/2,y=(da+Pi)/2,_=r+Math.cos(x)*y,S=o+Math.sin(x)*y,w=document.createElementNS(hs,"g");w.setAttribute("transform",`translate(${_-12},${S-28}) scale(1)`),w.setAttribute("fill","none"),w.setAttribute("stroke","#dfe5ea"),w.setAttribute("stroke-width","1.6"),w.setAttribute("stroke-linecap","round"),w.setAttribute("stroke-linejoin","round"),w.innerHTML=p.icon??"",c.appendChild(w),c.appendChild(Vr(null,_,S+12,p.label)),c.appendChild(Vr("sub",_,S+26,p.sub??"")),l.push({path:m,icon:w,item:p,index:d})}const h=document.createElementNS(hs,"circle");h.setAttribute("cx",String(r)),h.setAttribute("cy",String(o)),h.setAttribute("r",String(da-2)),h.setAttribute("fill","#20242a"),h.setAttribute("stroke","#3d454e"),c.appendChild(h),c.appendChild(Vr("sub",r,o+4,"キャンセル"));const f=[],u=o+Pi+Mu;n.forEach((d,p)=>{const v=u+p*Vs,g=document.createElementNS(hs,"rect");g.setAttribute("x",String(r-Ac/2)),g.setAttribute("y",String(v)),g.setAttribute("width",String(Ac)),g.setAttribute("height",String(Vs)),g.setAttribute("fill","#2c3238"),g.setAttribute("stroke","#171a1e"),c.appendChild(g);const m=Vr(null,r,v+Vs/2+5,d.label);c.appendChild(m),f.push({rect:g,label:m,item:d,top:v})}),Ne={host:a,slices:l,rows:f,cx:r,cy:o,selected:-1,selectedRow:-1},window.addEventListener("pointermove",zd),window.addEventListener("pointerup",co),window.addEventListener("pointercancel",co)}function zd(i){if(!Ne)return;const t=i.clientX-Ne.cx,e=i.clientY-Ne.cy;let n=-1;Math.abs(t)<=Ac/2&&(n=Ne.rows.findIndex(r=>i.clientY>=r.top&&i.clientY<r.top+Vs)),n!==Ne.selectedRow&&(Ne.rows.forEach((r,o)=>r.rect.setAttribute("fill",o===n?"#2f5f7d":"#2c3238")),Ne.selectedRow=n,n>=0&&navigator.vibrate?.(6));let s=-1;if(n<0&&Math.hypot(t,e)>=nb){const r=(Math.atan2(e,t)*180/Math.PI+90+360+22.5)%360,o=Math.floor(r/45);Ne.slices[o]&&(s=o)}if(s!==Ne.selected){for(const r of Ne.slices){if(!r)continue;const o=r.index===s;r.path.setAttribute("fill",o?"#2f5f7d":"#2c3238"),r.path.setAttribute("stroke",o?"#4f9fd1":"#171a1e"),r.icon.setAttribute("stroke",o?"#ffffff":"#dfe5ea")}Ne.selected=s,s>=0&&navigator.vibrate?.(6)}}function co(){if(!Ne)return;const{selected:i,selectedRow:t,slices:e,rows:n}=Ne;ul(),t>=0?n[t]?.item.run():i>=0&&e[i]?.item.run()}function ul(){Ne&&(window.removeEventListener("pointermove",zd),window.removeEventListener("pointerup",co),window.removeEventListener("pointercancel",co),Ne.host.remove(),Ne=null)}function yu(i,t,e,n){let s=null,r=!1,o=0,a=0,c=null;const l=()=>{s!==null&&clearTimeout(s),s=null},h=d=>{const p=d?window.addEventListener:window.removeEventListener;p("pointermove",f),p("pointerup",u),p("pointercancel",u)},f=d=>{d.pointerId===c&&Math.hypot(d.clientX-o,d.clientY-a)>12&&l()},u=d=>{d.pointerId===c&&(l(),c=null,h(!1),r||e?.(),r=!1)};i.addEventListener("touchstart",d=>d.preventDefault(),{passive:!1}),i.addEventListener("contextmenu",d=>d.preventDefault()),i.addEventListener("pointerdown",d=>{if(d.preventDefault(),c=d.pointerId,o=d.clientX,a=d.clientY,r=!1,h(!0),d.pointerType==="mouse"&&d.button===2){r=!0,Jn(t(),o,a,n?.()??[]);return}s=setTimeout(()=>{r=!0,Jn(t(),o,a,n?.()??[])},200)})}const bu=[{id:"object",label:"オブジェクト",key:"F8"},{id:"vertex",label:"頂点",key:"F9"},{id:"edge",label:"エッジ",key:"F10"},{id:"face",label:"フェース",key:"F11"}],Vd=.5,Hd=2,Su=1.25;function sb(){const i=Number(localStorage.getItem("macbeth.manipSize"));return!Number.isFinite(i)||i<=0?1:Math.min(Hd,Math.max(Vd,i))}const Ns={grid:"グリッド",vertex:"頂点",edge:"カーブ / エッジ",surface:"サーフェス"},rb={4:"wire",5:"shaded",6:"shadedWire",7:"smooth",8:"checker"},ls={model:"モデリング",uv:"UV",sculpt:"スカルプト",material:"マテリアル"},ob={object:H.vObj,vertex:H.vVert,edge:H.vEdge,face:H.vFace},wu={all:H.xform,move:H.move,rotate:H.rotate,scale:H.scale},Eu={multicut:H.multicut,bevel:H.scale,bridge:H.vEdge,extrude:H.extrude,connect:H.vMulti,weld:H.vVert},ab={multicut:"マルチカット",bevel:"ベベル",bridge:"ブリッジ",extrude:"押し出し",connect:"接続",weld:"ターゲットウェルド"},cb={grid:H.snap,vertex:H.vVert,edge:H.vEdge,surface:H.vFace},lb={wire:H.wire,shaded:H.shaded,shadedWire:H.shadedWire,smooth:H.smooth,checker:H.mUV},Tu={cube:H.pCube,sphere:H.pSphere,cylinder:H.pCylinder,cone:H.pCone,torus:H.pTorus,plane:H.pPlane,disk:H.pDisk,platonic:H.pPlatonic};class hb{state=new qM;history=new KM(this.state);viewport;picker;selector;autosave=new ny(this.state);hud=new Ey(this.state);gauges=[];marqueeEl=Tt("marquee");marquee=null;popup=null;popupAnchor=null;syncingSelection=!1;router;manipulator;multicut;preselect;bevel=new ay;weldTarget=null;gestureDrag=null;uv=null;pushSelectionToUvForTest(){this.pushSelectionToUv()}uvSplit="both";gestureView=null;gestureMoved=!1;bevelSnapshot=null;docking;layout;zones={tools:"left",outliner:"rightTop"};toolPanelBody=null;outlinerBody=null;paramSnapshot=null;drag=null;pendingDrag=null;slideDrag=null;pivotDrag=null;dragSnapshot=null;raycaster=new tf;constructor(){const t=Tt("pane3d"),e=Tt("gl");this.viewport=new VM(t,e,this.state),this.picker=new OM(this.viewport,t),this.picker.cameraBased=()=>this.state.cameraBased,this.selector=new my(this.state,this.picker,n=>{const s=this.state.doc.find(n);return s?this.viewport.viewOf(s):void 0}),this.multicut=new ly(this.state,this.picker,this.viewport.preview),this.preselect=new fy(this.state,this.picker,this.viewport.preselect),this.viewport.seamProvider=()=>this.state.selected?.uv?.seams??null,this.viewport.softWeightsProvider=()=>{const n=this.state.selected;return n?fu(n.mesh,this.selector.selectedVertices(),{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0}).weights:new Map},this.manipulator=new XM({toScreen:n=>{const s=n.clone().project(this.viewport.camera);return{x:(s.x+1)/2*(t.clientWidth||1),y:(-s.y+1)/2*(t.clientHeight||1),z:s.z}},camera:()=>this.viewport.camera,orthoDistance:()=>this.state.camOpts.ortho?this.viewport.cam.distance:null,manipSize:()=>this.state.manipSize,pivotEdit:()=>this.state.pivotEdit}),this.state.manipSize=sb(),this.viewport.manip.add(this.manipulator.group),this.history.onChange=()=>{this.updateHistoryButtons(),this.autosave.schedule()},this.autosave.onSaved=n=>this.hud.setSaveNote(`自動保存 ${new Date(n).toLocaleTimeString("ja-JP",{timeStyle:"short"})}`),this.autosave.onError=n=>this.hud.toast(n),this.router=new Nd(e,n=>this.picker.local(n),this.gestureHandlers()),this.router.attach(),this.docking=new _y(Tt("stage"),{onZoneChange:(n,s)=>{this.zones[n]=s,localStorage.setItem("macbeth.panelZones",JSON.stringify(this.zones))},onMessage:n=>this.hud.toast(n),onLayoutChange:()=>{this.layout?.apply(),this.viewport.resize()}});try{const n=localStorage.getItem("macbeth.panelZones");n&&(this.zones={...this.zones,...JSON.parse(n)})}catch{}this.restoreSettings(),this.buildToolDock(),this.buildPanels(),this.layout=new by(Tt("stage"),Tt("dockColRight"),()=>this.viewport.resize()),this.buildGauges(),this.buildCluster(),this.bindKeyboard(),this.bindTopBar(),window.addEventListener("resize",()=>this.viewport.resize()),this.viewport.resize(),this.viewport.start()}async boot(){const t=await this.autosave.restore();t||this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]??null),this.viewport.syncAll(),this.refresh(),this.hud.defaultHint(),t?this.hud.toast("前回の続きを復元しました"):this.hud.setSaveNote(ry())}gestureHandlers(){return{toolDown:(t,e)=>this.startTool(t,e),toolMove:(t,e)=>this.moveTool(t,e),toolUp:(t,e,n)=>this.finishTool(t,e,n),hover:(t,e)=>{this.updateCutPreview(t,e),this.updatePreselect(t,e)},hoverLeave:()=>{this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},openMarkingMenu:(t,e,n)=>this.openMarkingMenu(t,e,n),openTwoFingerMenu:(t,e)=>this.openTwoFingerMenu(t,e),openCameraMenu:(t,e)=>{this.closePopup(),Jn(this.cameraMenu(),t,e,this.savedCameraItems())},undo:()=>this.doUndo(),redo:()=>this.doRedo(),abort:()=>{this.endMarquee(),this.drag=null,this.pendingDrag=null,this.pivotDrag=null,this.slideDrag=null,this.dragSnapshot=null,this.manipulator.hot=-1,this.multicut.clear(),this.preselect.clear(),this.weldTarget=null,this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,this.bevel.active&&(this.bevel.cancel(),this.bevelSnapshot=null)},isOnMesh:(t,e)=>{const n=this.tolerance(e);return this.state.selected&&this.manipulator.pick(t,this.pivotWorld(),this.state.manip,n)>=0?!0:this.hitSelectedComponent(t,n)||!!this.picker.pickSurface(t)},zoomPivot:()=>this.pivotWorld(),marqueeStart:t=>this.startMarquee(t),tumble:(t,e)=>this.viewport.tumble(t,e),pan:(t,e)=>this.viewport.pan(t,e),dolly:t=>this.viewport.dolly(t),dollyAbout:(t,e)=>this.viewport.dollyAbout(t,e),transformBegin:()=>this.beginGestureTransform(),transformUpdate:t=>this.updateGestureTransform(t),transformEnd:()=>this.endGestureTransform(),shiftOn:t=>this.state.modOn("shift")||t.shiftKey,altOn:t=>this.state.modOn("alt")||t.altKey}}eulerOf(t){const e=new Wn().setFromQuaternion(new an(t[0],t[1],t[2],t[3]),"XYZ"),n=180/Math.PI;return[e.x*n,e.y*n,e.z*n]}pixelToWorldAt(t){const e=new L().setFromMatrixColumn(this.viewport.camera.matrix,0),n=this.manipulator.toScreen(t),s=this.manipulator.toScreen(t.clone().add(e)),r=Math.hypot(s.x-n.x,s.y-n.y);return r>1e-6?1/r:.01}screenRightAxis(){const t=new L().setFromMatrixColumn(this.viewport.camera.matrix,0);return Math.abs(t.x)>=Math.abs(t.z)?new L(Math.sign(t.x)||1,0,0):new L(0,0,Math.sign(t.z)||1)}beginGestureTransform(){if(this.state.tool!=="select"||this.state.pivotEdit)return!1;const t=this.state.selected,e=this.pivotWorld();if(!t||!e)return!1;const n=this.captureTarget();if(!n)return!1;const s=this.manipulator.toScreen(e);return this.dragSnapshot=this.history.snapshot(),this.gestureDrag=pu({handle:HM,pivot:e,target:n,point:s,pivotScreen:s,ray:this.ray(s),cameraPosition:this.cameraPosition(),label:"変形"}),this.gestureView={pixelToWorld:this.pixelToWorldAt(e),horizontal:this.screenRightAxis()},this.gestureMoved=!1,!0}updateGestureTransform(t){const e=this.gestureDrag,n=this.gestureView,s=this.state.selected;if(!e||!n||!s)return;let r;if(t.kind==="scale")la(e,s,{scale:t.scale}),r=`スケール <kbd>×${t.scale.toFixed(2)}</kbd>`;else if(t.axis==="vertical"){const o=-t.pixels*n.pixelToWorld;la(e,s,{move:new L(0,o,0)}),r=`移動 <kbd>Y ${o>=0?"+":""}${o.toFixed(2)}</kbd>`}else{const o=t.pixels*n.pixelToWorld,a=n.horizontal;la(e,s,{move:a.clone().multiplyScalar(o)});const c=a.x!==0?"X":"Z",l=o*(a.x!==0?a.x:a.z);r=`移動 <kbd>${c} ${l>=0?"+":""}${l.toFixed(2)}</kbd>`}if(this.gestureMoved=!0,e.target.kind==="object"){const o=this.viewport.viewOf(s);o&&(nn(o.group,s.transform),o.group.updateMatrixWorld())}else this.viewport.refreshPositions(s);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats(),Tt("hudHint").innerHTML=`${r} · 指 3 本`}endGestureTransform(){const t=this.gestureMoved;this.gestureDrag=null,this.gestureView=null,this.gestureMoved=!1,t&&this.dragSnapshot&&this.history.commit("変形",this.dragSnapshot),this.dragSnapshot=null,this.refresh(),this.hud.defaultHint()}ray(t){return this.raycaster.setFromCamera(this.picker.ndc(t),this.viewport.camera),this.raycaster.ray}cameraPosition(){return this.viewport.camera.position}tolerance(t){return t.pointerType==="touch"?GM:1}hitSelectedComponent(t,e=1){const n=this.state.selected,s=n?this.viewport.viewOf(n):void 0;if(!n||!s||!this.state.comp.size)return!1;if(this.state.compMode==="face"){const r=this.picker.pickSurface(t);return!!r&&r.object===n&&this.state.comp.has(r.face)}if(this.state.compMode==="vertex"){const r=this.picker.pickVertex(s,t,22*e);return r>=0&&this.state.comp.has(r)}if(this.state.compMode==="edge"){const r=this.picker.pickEdge(s,t,16*e);return r.edge>=0&&this.state.comp.has(r.edge)}return!1}captureTarget(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;if(e.group.updateMatrixWorld(),this.state.compMode==="object")return{kind:"object",transform:ti(t.transform)};const n=this.selector.selectedVertices();if(!n.length)return null;const s=fu(t.mesh,n,{strength:this.state.soft.strength,radius:this.state.soft.radius,enabled:!0});s.skipped&&this.hud.toast("範囲が広すぎるのでソフト選択を省きました");const r=[],o=[],a=[];for(const[c,l]of s.weights){const h=t.mesh.getPosition(c);r.push(c),o.push(l),a.push(new L(h[0],h[1],h[2]).applyMatrix4(e.group.matrixWorld))}return{kind:"component",verts:r,weights:o,world:a,inverse:new oe().copy(e.group.matrixWorld).invert(),mirror:this.state.symX?du(t.mesh,r):[]}}updatePreselect(t,e){if(e.pointerType==="touch"||this.state.tool==="multicut"){this.preselect.clear();return}const n=this.state.selected;this.preselect.update(t,n?this.viewport.viewOf(n):void 0)}updateCutPreview(t,e){if(this.state.tool!=="multicut")return;const n=this.state.selected,s=this.multicut.update(t,n?this.viewport.viewOf(n):void 0,this.state.modOn("shift")||e.shiftKey);s&&(Tt("hudHint").innerHTML=s)}startTool(t,e){if(this.state.tool==="multicut"){this.updateCutPreview(t,e);return}if(this.state.tool==="bevel"){this.startBevel(t);return}const n=this.state.selected,s=this.pivotWorld(),r=this.tolerance(e);let o=n?this.manipulator.pick(t,s,this.state.manip,r):-1;if(o<0&&n&&this.state.compMode!=="object"&&this.hitSelectedComponent(t,r)&&(o=ll),o<0||!n||!s){this.startMarquee(t);return}if(this.state.pivotEdit){this.beginPivotDrag(o,t,s);return}if(e.pointerType!=="mouse"){this.pendingDrag={handle:o,point:t,t0:performance.now(),shift:this.state.modOn("shift")||e.shiftKey,ctrl:this.state.modOn("ctrl")||e.ctrlKey||e.metaKey},this.manipulator.hot=o,this.refreshManipulator();return}this.beginToolDrag(o,t,this.state.modOn("shift")||e.shiftKey,this.state.modOn("ctrl")||e.ctrlKey||e.metaKey)}beginToolDrag(t,e,n,s){const r=this.state.selected,o=this.pivotWorld();if(!r||!o){this.startMarquee(e);return}const a=this.history.snapshot();let c={move:"移動",rotate:"回転",scale:"スケール"}[Kr(t)??"move"];if(Kr(t)==="move"&&this.state.compMode!=="object"&&this.state.comp.size&&n&&s&&this.beginSlide(r,e)){this.dragSnapshot=a,this.manipulator.hot=t,this.refreshManipulator();return}Kr(t)==="move"&&this.state.compMode!=="object"&&this.state.comp.size&&n&&!s&&this.extrudeForDrag(r)&&(c="押し出し");const l=this.captureTarget();if(!l){this.startMarquee(e);return}this.dragSnapshot=a,this.drag=pu({handle:t,pivot:this.pivotWorld()??o,target:l,point:e,pivotScreen:this.manipulator.toScreen(this.pivotWorld()??o),ray:this.ray(e),cameraPosition:this.cameraPosition(),label:c}),this.manipulator.hot=t,this.refreshManipulator()}beginSlide(t,e){const n=this.selector.selectedVertices();if(!n.length)return!1;const s=this.viewport.viewOf(t);if(!s)return!1;s.group.updateMatrixWorld();const r=Af(t.mesh,n);if(![...r.values()].some(f=>f.length))return this.hud.toast("スライドできる辺がありません（まわりが全部選ばれています）"),!1;const o=f=>{const u=t.mesh.getPosition(f);return this.manipulator.toScreen(new L(u[0],u[1],u[2]).applyMatrix4(s.group.matrixWorld))},a=new Map;for(const f of n)a.set(f,o(f));const c=new Map;for(const[f,u]of r){const d=a.get(f);c.set(f,u.map(p=>{const v=o(p);return{x:v.x-d.x,y:v.y-d.y}}))}let l=n[0],h=1/0;for(const f of n){const u=a.get(f),d=Math.hypot(u.x-e.x,u.y-e.y);d<h&&(h=d,l=f)}return this.slideDrag={base:Float32Array.from(t.mesh.positions),rails:r,railScreen:c,anchor:l,start:e,mirror:this.state.symX?du(t.mesh,n):[]},!0}updateSlide(t,e){const n=this.slideDrag;if(!n)return;const s=e.x-n.start.x,r=e.y-n.start.y,o=Math.hypot(s,r);if(o<1e-6)return;const a=new Map;for(const[h,f]of n.rails){const u=n.railScreen.get(h)??[];let d=-1,p=0;for(let v=0;v<f.length;v++){const g=u[v],m=Math.hypot(g.x,g.y);if(m<1e-6)continue;const x=(g.x*s+g.y*r)/(m*o);x>p&&(p=x,d=v)}d>=0&&a.set(h,f[d])}if(!a.size)return;const c=a.get(n.anchor);let l=0;if(c!==void 0){const h=(n.rails.get(n.anchor)??[]).indexOf(c),f=(n.railScreen.get(n.anchor)??[])[h],u=f?f.x*f.x+f.y*f.y:0;u>1e-9&&(l=(s*f.x+r*f.y)/u)}else{const[h,f]=[...a][0],u=(n.rails.get(h)??[]).indexOf(f),d=(n.railScreen.get(h)??[])[u],p=d?d.x*d.x+d.y*d.y:0;p>1e-9&&(l=(s*d.x+r*d.y)/p)}if(l=Math.max(0,Math.min(.99,l)),n.mirror.length){const h=t.mesh.vertexNeighbors();for(const[f,u]of n.mirror){const d=a.get(f);if(d===void 0)continue;const p=[-n.base[d*3],n.base[d*3+1],n.base[d*3+2]];let v=-1;for(const g of h.get(u)??[])if(Math.abs(n.base[g*3]-p[0])<1e-4&&Math.abs(n.base[g*3+1]-p[1])<1e-4&&Math.abs(n.base[g*3+2]-p[2])<1e-4){v=g;break}v>=0&&a.set(u,v)}}Cf(t.mesh,n.base,a,l),this.viewport.refreshPositions(t),this.viewport.rebuildOverlay(),this.refreshManipulator(),Tt("hudHint").innerHTML=`スライド <kbd>${l.toFixed(2)}</kbd>`}beginPivotDrag(t,e,n){const s=t<3?t:-1,r=new Qn().setFromNormalAndCoplanarPoint(new L().subVectors(this.cameraPosition(),n).normalize(),n);let o=null;if(s<0){const a=new L;this.ray(e).intersectPlane(r,a)&&(o=a)}this.pivotDrag={axis:s,origin:n.clone(),plane:r,planeStart:o,t0:s>=0?js(this.ray(e),n,je[s]):0},this.manipulator.hot=t,this.refreshManipulator()}updatePivotDrag(t){const e=this.pivotDrag;if(!e)return;const n=this.ray(t);let s;if(e.axis>=0){const r=js(n,e.origin,je[e.axis]);s=e.origin.clone().addScaledVector(je[e.axis],r-e.t0)}else{const r=new L;if(!n.intersectPlane(e.plane,r)||!e.planeStart)return;s=e.origin.clone().add(r.sub(e.planeStart))}if(this.state.snapping){const r=this.snapPoint(s);r&&(s=e.axis>=0?e.origin.clone().addScaledVector(je[e.axis],r.clone().sub(e.origin).dot(je[e.axis])):r.clone()),this.showSnapTarget()}this.state.pivotOverride={x:s.x,y:s.y,z:s.z},this.refreshManipulator(),this.state.snapping||(Tt("hudHint").innerHTML=`ピボット <kbd>${s.x.toFixed(2)}, ${s.y.toFixed(2)}, ${s.z.toFixed(2)}</kbd>`)}togglePivotEdit(){this.state.pivotEdit=!this.state.pivotEdit,this.manipulator.hot=-1,this.syncToggleButtons(),this.refreshManipulator(),this.uv?.refreshManipulator(),this.refresh(),this.hud.toast(this.state.pivotEdit?"ピボット編集: オン（もう一度 D で終了）":"ピボット編集: オフ")}resetPivot(){this.state.pivotOverride=null,this.refreshManipulator(),this.uv?.resetPivot(),this.hud.toast("ピボットを選択の中心へ")}setManipSize(t){this.state.manipSize=Math.min(Hd,Math.max(Vd,t)),localStorage.setItem("macbeth.manipSize",String(this.state.manipSize)),this.refreshManipulator(),this.uv?.refreshManipulator(),this.refresh(),this.hud.toast(`マニピュレータの大きさ ×${this.state.manipSize.toFixed(2)}`)}manipulatorMenu(){return{N:{label:"ユニバーサル",sub:"All  T",icon:H.xform,run:()=>this.setManip("all")},NE:{label:this.state.pivotEdit?"ピボットの移動を終える":"ピボットを移動",sub:"Pivot  D",icon:H.pivot,run:()=>this.togglePivotEdit()},E:{label:"移動",sub:"Move  W",icon:H.move,run:()=>this.setManip("move")},SE:{label:"ピボットを戻す",sub:"Center",icon:H.vObj,run:()=>this.resetPivot()},S:{label:"回転",sub:"Rotate  E",icon:H.rotate,run:()=>this.setManip("rotate")},SW:{label:"距離でマージ",sub:"Merge",icon:H.vVert,run:()=>this.doMergeByDistance()},W:{label:"スケール",sub:"Scale  R",icon:H.scale,run:()=>this.setManip("scale")},NW:{label:"初期設定に戻す",sub:"Reset",icon:H.xform,run:()=>{this.state.pivotEdit=!1,this.state.pivotOverride=null,this.uv?.resetPivot(),this.setManip("all"),this.setManipSize(1),this.syncToggleButtons(),this.hud.toast("マニピュレータを初期設定に戻した")}}}}extrudeForDrag(t){if(this.state.compMode==="face"){const n=ac(t.mesh,this.state.comp,0);return n?(t.mesh=n.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),!0):!1}if(this.state.compMode==="edge"){const n=this.viewport.viewOf(t);if(!n)return!1;const s=[...this.state.comp].map(a=>n.edges[a]).filter(Boolean),r=cc(t.mesh,s,0);if(!r)return!1;t.mesh=r.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t);const o=this.viewport.viewOf(t);if(o){const a=new Set(r.newEdges.map(([c,l])=>`${Math.min(c,l)}_${Math.max(c,l)}`));this.state.comp.clear(),o.edges.forEach(([c,l],h)=>{a.has(`${Math.min(c,l)}_${Math.max(c,l)}`)&&this.state.comp.add(h)})}return this.viewport.rebuildOverlay(),!0}const e=lc(t.mesh,this.state.comp,0,this.state.vertexOpts.extrudeWidth);if(!e)return this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）"),!1;t.mesh=e.mesh,t.markTopologyChanged(),this.viewport.rebuildObject(t),this.state.comp.clear();for(const n of e.tips)this.state.comp.add(n);return this.viewport.rebuildOverlay(),!0}moveTool(t,e){if(this.state.tool==="multicut")return this.updateCutPreview(t,e);if(this.state.tool==="bevel")return this.dragBevel(t);if(this.marquee)return this.updateMarquee(t);if(this.pivotDrag)return this.updatePivotDrag(t);if(this.slideDrag){const o=this.state.selected;o&&this.updateSlide(o,t);return}if(this.pendingDrag){const o=this.pendingDrag,a=Math.hypot(t.x-o.point.x,t.y-o.point.y),c=performance.now()-o.t0;if(a<=al&&!(a>ms&&c>cl))return;if(this.pendingDrag=null,this.beginToolDrag(o.handle,o.point,o.shift,o.ctrl),this.slideDrag){const l=this.state.selected;l&&this.updateSlide(l,t);return}}const n=this.drag,s=this.state.selected;if(!n||!s)return;const r=this.state.snapping&&n.kind==="move";if(xy(n,s,t,this.ray(t),this.cameraPosition(),{snap:r?o=>this.snapPoint(o):void 0,rotateStep:this.state.rotateStep,preventNegativeScale:this.state.preventNegativeScale}),r?this.showSnapTarget():this.updateWeldTarget(t,e,s),n.target.kind==="object"){const o=this.viewport.viewOf(s);o&&(nn(o.group,s.transform),o.group.updateMatrixWorld())}else this.viewport.refreshPositions(s);this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats()}snapHit=null;snapPoint(t){const e=this.state.snap.kind;if(e==="grid"){const f=Math.max(1e-4,this.state.snap.step),u=new L(Math.round(t.x/f)*f,Math.round(t.y/f)*f,Math.round(t.z/f)*f);return this.snapHit=u,u}if(e==="surface"){const f=this.manipulator.toScreen(t),u=this.picker.pickSurface(f,this.state.selected);return this.snapHit=u?u.point.clone():null,this.snapHit}const n=this.manipulator.toScreen(t),s=40;let r=null,o=s;const a=f=>{const u=this.manipulator.toScreen(f),d=Math.hypot(u.x-n.x,u.y-n.y);d<o&&(o=d,r=f)},c=this.state.selected,l=this.state.compMode==="object",h=this.state.compMode==="vertex"?this.state.comp:null;for(const f of this.state.doc.objects){if(l&&f===c)continue;const u=this.viewport.viewOf(f);if(!u)continue;const d=f.mesh,p=v=>new L(d.positions[v*3],d.positions[v*3+1],d.positions[v*3+2]).applyMatrix4(u.group.matrixWorld);if(e==="vertex")for(let v=0;v<d.vertexCount;v++)f===c&&h?.has(v)||a(p(v));else for(const[v,g]of u.edges){if(f===c&&h?.has(v)&&h.has(g))continue;const m=p(v),y=p(g).clone().sub(m),_=y.lengthSq(),S=_>1e-12?Math.max(0,Math.min(1,t.clone().sub(m).dot(y)/_)):0;a(m.clone().addScaledVector(y,S))}}return this.snapHit=r,r}showSnapTarget(){const t=this.snapHit;if(this.preselect.clear(),!t){Tt("hudHint").innerHTML=`スナップ <kbd>${Ns[this.state.snap.kind]}</kbd> · near なし`;return}this.preselect.showWorldPoint(t.x,t.y,t.z),Tt("hudHint").innerHTML=`スナップ <kbd>${Ns[this.state.snap.kind]}</kbd> · <kbd>${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}</kbd>`}updateWeldTarget(t,e,n){if(this.weldTarget=null,this.preselect.clear(),this.state.compMode!=="vertex"||this.state.comp.size!==1)return;const s=this.viewport.viewOf(n);if(!s)return;const r=[...this.state.comp][0],o=22*this.tolerance(e),a=this.picker.pickVertexExcept(s,t,o,r);a<0||(this.weldTarget=a,this.preselect.showVertex(s,a),Tt("hudHint").innerHTML="離すと <kbd>この頂点へ溶接</kbd> します")}applyTargetWeld(t,e,n){t.mesh=Ln($s(t.mesh,[[e,n]]));const s=t.markTopologyChanged();this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let r="ターゲットウェルド";(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),s.rebased&&(r+=" · UV の土台を取り直した"),this.hud.toast(r)}finishTool(t,e,n){if(this.state.tool==="multicut"){this.doMultiCut();return}if(this.state.tool==="bevel"){this.endBevel(n);return}if(this.slideDrag){const r=this.slideDrag;this.slideDrag=null,this.manipulator.hot=-1;const o=this.state.selected;!!o&&r.base.some((c,l)=>Math.abs(c-o.mesh.positions[l])>1e-6)&&this.dragSnapshot&&(this.history.commit("スライド",this.dragSnapshot),this.hud.toast("スライド")),this.dragSnapshot=null,this.refreshManipulator(),this.refresh();return}if(this.pivotDrag){this.pivotDrag=null,this.manipulator.hot=-1,this.preselect.clear(),this.refreshManipulator(),this.hud.defaultHint();return}if(this.pendingDrag){this.pendingDrag=null,this.manipulator.hot=-1,this.refreshManipulator(),this.applySelectResult(this.selector.click(t,e));return}const s=this.marquee;if(s){this.endMarquee();const r=this.selector.marquee(s.x0,s.y0,s.x1,s.y1,t,e);this.applySelectResult(r)}else if(this.drag){const r=this.drag;if(this.drag=null,this.manipulator.hot=-1,this.preselect.clear(),!n)this.dragSnapshot=null,this.applySelectResult(this.selector.click(t,e));else if(this.dragSnapshot){const o=this.weldTarget,a=this.state.compMode==="vertex"?[...this.state.comp][0]:void 0;o!==null&&a!==void 0&&this.state.selected?(this.applyTargetWeld(this.state.selected,a,o),this.history.commit("ターゲットウェルド",this.dragSnapshot)):(this.history.commit(r.label,this.dragSnapshot),this.hud.toast(r.label)),this.dragSnapshot=null}else this.dragSnapshot=null;this.refresh()}else n||this.applySelectResult(this.selector.click(t,e))}selectedEdgePairs(t){const e=this.viewport.viewOf(t);return e?[...this.state.comp].map(n=>e.edges[n]).filter(Boolean):[]}startBevel(t){const e=this.state.selected;if(!e||this.state.compMode!=="edge"||!this.state.comp.size){this.hud.toast("エッジモードでエッジを選択してから、左右にドラッグしてください");return}const n=this.selectedEdgePairs(e),s=this.history.snapshot();this.bevel.begin(e,n,t.x)&&(this.bevelSnapshot=s)}dragBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;this.state.bevel.width=this.bevel.widthFromDrag(t.x-e.startX,e.scale);const s=this.bevel.apply(this.state.bevel);if(!s){this.hud.toast("この形はまだベベルできません（四角形と閉じたエッジのみ）");return}this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.hud.refreshStats(),Tt("hudHint").innerHTML=`ベベル <kbd>幅 ${this.state.bevel.width.toFixed(3)}</kbd> · <kbd>${this.state.bevel.segments} 分割</kbd> · ${s.faces} 面`}endBevel(t){const e=this.bevel.keep(),n=this.state.selected;if(!e||!n)return;if(!t){this.bevel.cancel(),this.bevel.end(),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.refresh();return}const s=n.markTopologyChanged();this.state.comp.clear(),this.bevelSnapshot&&this.history.commit("ベベル",this.bevelSnapshot),this.bevelSnapshot=null,this.viewport.rebuildObject(n),this.viewport.rebuildOverlay(),this.refresh();let r=`ベベル — 幅 ${this.state.bevel.width.toFixed(3)} · ${this.state.bevel.segments} 分割`;(s.droppedLevels||s.droppedLayers)&&(r+=` · 上位レベル ${s.droppedLevels} とレイヤー ${s.droppedLayers} を破棄`),this.hud.toast(`${r}（オプションで作り直せます）`)}redoBevel(){const t=this.state.selected;!t||!this.bevel.active||this.bevel.apply(this.state.bevel)&&(this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats())}doMultiCut(){const t=this.state.selected;if(!t)return;const e=this.history.snapshot(),n=this.multicut.commit(this.viewport.viewOf(t));n&&(t.markTopologyChanged(),this.state.comp.clear(),this.history.commit("エッジループ挿入",e),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`エッジループを挿入しました — ${n.faceCount} 面`))}screenOfVertex(t){const e=this.state.selected,n=e?this.viewport.viewOf(e):void 0;if(!n||t>=n.object.mesh.vertexCount)return null;const s=this.picker.projectVertex(n,t);return{x:s.x,y:s.y}}refreshManipulator(){if(this.state.tool!=="select"){this.manipulator.clear();return}const t=[this.state.compMode,this.state.selected?.id??"-",this.state.comp.size,this.state.tool].join(",");this.manipulator.rebuild(this.pivotWorld(),this.state.manip,t)}setTool(t){if(this.state.tool!==t){this.bevel.active&&(this.bevel.end(),this.bevelSnapshot=null),this.state.tool=t,this.multicut.clear(),this.preselect.clear(),this.manipulator.clear(),this.refresh();for(const e of document.querySelectorAll("[data-tool]"))e.setAttribute("aria-pressed",String(e.dataset.tool===t));this.renderToolColumn(),this.hud.toast(t==="multicut"?"マルチカット":"選択・変形"),this.hud.defaultHint()}}setDisplay(t){this.state.display=t,this.renderToolColumn(),this.viewport.syncAll(),this.refresh(),this.hud.toast({wire:"ワイヤーフレーム",shaded:"シェード",shadedWire:"シェード + ワイヤー",smooth:"スムースシェード",checker:"チェッカー（UV の確認）"}[t])}setManip(t){this.state.manip=t,this.manipulator.clear(),this.renderToolColumn(),this.refreshManipulator(),this.hud.toast(`マニピュレータ: ${{all:"ユニバーサル",move:"移動",rotate:"回転",scale:"スケール"}[t]}`)}applySelectResult(t){t.changed&&(t.objectChanged&&this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),this.pushSelectionToUv(),t.message&&this.hud.toast(t.message))}pushSelectionToUv(){if(this.state.mode!=="uv"||!this.uv||this.syncingSelection)return;this.syncingSelection=!0;const t=this.state.selected,e=t?this.viewport.viewOf(t):void 0,n=[];if(this.state.compMode==="edge"&&e)for(const s of this.state.comp){const r=e.edges[s];r&&n.push(`${Math.min(r[0],r[1])}_${Math.max(r[0],r[1])}`)}this.uv.syncFromView(this.state.compMode,{verts:this.state.compMode==="vertex"?[...this.state.comp]:[],edges:n,faces:this.state.compMode==="face"?[...this.state.comp]:[]}),this.hud.uvNote=this.uv.stats(),this.hud.refreshStats(),this.syncingSelection=!1}startMarquee(t){this.marquee={x0:t.x,y0:t.y,x1:t.x,y1:t.y},this.marqueeEl.style.display="block",this.updateMarquee(t)}updateMarquee(t){const e=this.marquee;e&&(e.x1=t.x,e.y1=t.y,this.marqueeEl.style.left=`${Math.min(e.x0,e.x1)}px`,this.marqueeEl.style.top=`${Math.min(e.y0,e.y1)}px`,this.marqueeEl.style.width=`${Math.abs(e.x1-e.x0)}px`,this.marqueeEl.style.height=`${Math.abs(e.y1-e.y0)}px`)}endMarquee(){this.marquee=null,this.marqueeEl.style.display="none"}pivotWorld(){const t=this.state.selected;if(!t)return null;const e=this.viewport.viewOf(t);if(!e)return null;const n=this.state.pivotOverride;if(n)return new L(n.x,n.y,n.z);if(e.group.updateMatrixWorld(),this.state.compMode==="object"||!this.state.comp.size)return new L().setFromMatrixPosition(e.group.matrixWorld);const s=this.selector.selectedVertices();if(!s.length)return null;const r=new L(1/0,1/0,1/0),o=new L(-1/0,-1/0,-1/0);for(const a of s){const c=t.mesh.getPosition(a),l=new L(c[0],c[1],c[2]).applyMatrix4(e.group.matrixWorld);r.min(l),o.max(l)}return r.add(o).multiplyScalar(.5)}openMarkingMenu(t,e,n){this.closePopup(),Jn(n?this.editMenu():this.selectModeMenu(),t,e)}openTwoFingerMenu(t,e){if(this.closePopup(),this.state.selected){Jn(this.editMenu(),t,e);return}Jn(this.cameraMenu(),t,e,this.savedCameraItems())}cameraMenu(){const t=e=>({label:zs[e].label,sub:zs[e].sub,icon:H.camera,run:()=>this.setView(e)});return{N:t("persp"),NE:{label:"新規カメラ",sub:"New Camera",icon:H.camera,run:()=>this.addCamera()},E:t("right"),SE:t("bottom"),S:t("front"),SW:t("back"),W:t("top"),NW:t("left")}}savedCameraItems(){return this.state.cameras.map(t=>({label:t.name,run:()=>this.recallCamera(t)}))}setView(t){this.viewport.setView(t),this.state.viewName=zs[t].label,this.refresh(),this.hud.toast(`${zs[t].label}ビュー`)}addCamera(){const t=this.viewport.cam,e={name:`camera${this.state.cameras.length+1}`,theta:t.theta,phi:t.phi,distance:t.distance,target:[t.target.x,t.target.y,t.target.z],focal:this.state.camOpts.focal,ortho:this.state.camOpts.ortho};this.state.cameras.push(e),this.state.viewName=e.name,this.refresh(),this.hud.toast(`${e.name} を控えました`)}recallCamera(t){const e=this.viewport.cam;e.theta=t.theta,e.phi=t.phi,e.distance=t.distance,e.target.set(t.target[0],t.target[1],t.target[2]),t.focal!==void 0&&(this.state.camOpts.focal=t.focal),t.ortho!==void 0&&(this.state.camOpts.ortho=t.ortho),this.viewport.applyCamera(),this.state.viewName=t.name,this.refresh(),this.hud.toast(`${t.name} に切り替えました`)}modeMenu(){const t=e=>()=>this.setMode(e);return{N:{label:ls.model,sub:"Modeling",icon:H.mModel,run:t("model")},E:{label:ls.uv,sub:"UV Editor",icon:H.mUV,run:t("uv")},S:{label:ls.sculpt,sub:"Sculpt",icon:H.mSculpt,run:t("sculpt")},W:{label:ls.material,sub:"Material",icon:H.mMaterial,run:t("material")}}}setMode(t){if(this.state.mode===t)return;this.state.mode=t,Tt("modeLabel").textContent=ls[t],this.closePopup(),this.multicut.clear(),this.preselect.clear();const e=Tt("modeStub");e.textContent="";const n=Xy[t];t==="uv"?this.enterUv():this.leaveUv(),n?(e.appendChild($y(n)),e.hidden=!1,Tt("stage").hidden=!0):(e.hidden=!0,Tt("stage").hidden=!1,this.viewport.resize()),this.renderToolColumn(),this.refresh(),this.hud.toast(ls[t])}uvToolColumn(){const t=this.uv;if(!t)return[];const e={vertex:H.vVert,edge:H.vEdge,shell:H.vFace},n=(s,r,o,a)=>({kind:"button",id:s,icon:r,title:o,onTap:a});return[{kind:"label",text:"選択"},{kind:"button",id:"select",icon:()=>e[t.unit],title:"UV の選択（長押しで 頂点 / エッジ / シェル）",radial:()=>({E:{label:"UV 頂点",sub:"Vertex",icon:H.vVert,run:()=>this.setUvUnit("vertex")},S:{label:"UV エッジ",sub:"Edge",icon:H.vEdge,run:()=>this.setUvUnit("edge")},W:{label:"UV シェル",sub:"Shell",icon:H.vFace,run:()=>this.setUvUnit("shell")}}),options:()=>[xu(this.optionsState(),this.panelHost())],onTap:()=>{}},{kind:"button",id:"xform",icon:()=>this.state.pivotEdit?H.pivot:wu[this.state.manip],title:"変形（長押しで マニピュレータ / ピボット）",pressed:()=>this.state.pivotEdit,radial:()=>this.manipulatorMenu(),options:()=>this.xformOptions(),onTap:()=>{}},{kind:"button",id:"snap",icon:()=>this.state.uvSnap.kind==="vertex"?H.vVert:H.snap,title:"スナップ（タップでオン / オフ · 長押しで種類）",pressed:()=>this.state.snapOn,radial:()=>this.uvSnapMenu(),onTap:()=>this.toggleSnap()},{kind:"separator"},{kind:"label",text:"UV"},{kind:"button",id:"unfold",icon:H.smooth,title:"展開（タップで開き直す · 長押しで自動 UV と方式）",radial:()=>({N:{label:"展開",sub:"Unfold",icon:H.smooth,run:()=>t.unfold()},E:{label:"自動 UV",sub:"Auto",icon:H.mUV,run:()=>t.autoUnwrap()},S:{label:"整列",sub:"Layout",icon:H.vMulti,run:()=>t.repack()},W:{label:"オプション…",sub:"Options",icon:H.mUV,run:()=>this.openGroupOptions("unfold",()=>this.uvUnfoldOptions())}}),onTap:()=>t.unfold()},n("cut",H.multicut,"カット（選んだところを切る）",()=>t.cutOrSew(!0)),n("sew",H.vEdge,"ソー（選んだ切れ目を縫う）",()=>t.cutOrSew(!1)),{kind:"separator"},n("frame",H.frame,"選択にフレーム",()=>t.frame())]}setUvUnit(t){this.uv?.setUnit(t),this.renderToolColumn()}uvUnfoldOptions(){const t=this.optionsState();if(!t.uv)return[];const e=this.panelHost();return[...zy(t.uv,e),Vy(t.uv,t,e)]}enterUv(){const t=this.state.selected;this.uv||(this.uv=new Jy(Tt("paneUv"),Tt("uvgl"),{object:()=>this.state.selected,recipe:()=>this.state.selected?.uv??null,changed:n=>{const s=this.state.selected;s&&this.viewport.rebuildObject(s),this.viewport.rebuildOverlay(),this.hud.uvNote=this.uv?.stats()??null,this.refresh(),n&&this.hud.toast(n)},snapshot:()=>this.history.snapshot(),commit:(n,s)=>this.history.commit(n,s),syncToView:n=>{if(this.syncingSelection)return;this.syncingSelection=!0;const s=this.state.selected;if(this.state.compMode=n.mode,this.state.comp.clear(),n.mode==="vertex")for(const r of n.verts)this.state.comp.add(r);else if(n.mode==="edge"){const r=s?this.viewport.viewOf(s):void 0,o=new Set(n.edges);r?.edges.forEach(([a,c],l)=>{o.has(`${Math.min(a,c)}_${Math.max(a,c)}`)&&this.state.comp.add(l)})}else for(const r of n.faces)this.state.comp.add(r);this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refreshManipulator(),this.hud.refreshStats(),this.syncCompModeButtons(),this.syncingSelection=!1},markingMenu:(n,s,r)=>{this.closePopup(),Jn(r?this.uvEditMenu():this.uvSelectMenu(),n,s)},cameraMenu:(n,s)=>{this.closePopup(),Jn({N:{label:"0〜1 にフレーム",sub:"Unit",icon:H.frame,run:()=>this.uv?.view.frameUnit()},S:{label:"選択にフレーム",sub:"Frame  F",icon:H.frame,run:()=>this.uv?.frame()}},n,s)},hint:n=>{Tt("hudHint").innerHTML=n},toast:n=>this.hud.toast(n),undo:()=>this.doUndo(),redo:()=>this.doRedo(),shiftOn:n=>this.state.modOn("shift")||n.shiftKey,ctrlOn:n=>this.state.modOn("ctrl")||n.ctrlKey||n.metaKey,marquee:n=>{if(!n){this.marqueeEl.style.display="none";return}const s=Tt("paneUv"),r=s.offsetLeft,o=s.offsetTop;this.marqueeEl.style.display="block",this.marqueeEl.style.left=`${Math.min(n.x0,n.x1)+r}px`,this.marqueeEl.style.top=`${Math.min(n.y0,n.y1)+o}px`,this.marqueeEl.style.width=`${Math.abs(n.x1-n.x0)}px`,this.marqueeEl.style.height=`${Math.abs(n.y1-n.y0)}px`},uvSnap:()=>this.state.snapping?this.state.uvSnap:null,selectedFaces:()=>this.state.compMode==="face"?[...this.state.comp]:[],manipSize:()=>this.state.manipSize,pivotEdit:()=>this.state.pivotEdit,smoothAngle:()=>this.state.smoothAngle}),this.buildUvSwitch());let e=null;t&&!t.uv&&(t.uv=ed(t.mesh),e=Di(t.mesh,t.uv).charts.length,this.viewport.rebuildObject(t)),Tt("paneUv").hidden=!1,Tt("uvSwitch").hidden=!1,this.applyUvSplit(),this.uv.start(),this.uv.rebuild(),this.hud.uvNote=this.uv.stats(),this.pushSelectionToUv(),e!==null&&this.hud.toast(`今の UV を取り込んだ — 島 ${e}（「展開」を押すまで開き直しません）`)}leaveUv(){this.hud.uvNote=null,this.uv&&(this.uv.stop(),Tt("paneUv").hidden=!0,Tt("uvSwitch").hidden=!0,Tt("vp").classList.remove("split","uvonly"),this.viewport.resize())}buildUvSwitch(){const t=Tt("uvSwitch");t.textContent="";for(const[e,n]of[["uv","2D"],["both","両方"],["view","3D"]]){const s=st("button");s.textContent=n,s.dataset.split=e,s.addEventListener("click",()=>{this.uvSplit=e,this.applyUvSplit()}),t.appendChild(s)}}applyUvSplit(){const t=Tt("vp");t.classList.toggle("split",this.uvSplit==="both"),t.classList.toggle("uvonly",this.uvSplit==="uv"),Tt("paneUv").hidden=this.uvSplit==="view";for(const e of Tt("uvSwitch").querySelectorAll("button"))e.setAttribute("aria-pressed",String(e.dataset.split===this.uvSplit));requestAnimationFrame(()=>{this.viewport.resize(),this.uv?.resize()})}uvSelectMenu(){const t=n=>()=>this.uv?.setUnit(n),e=this.uv;return{N:{label:"UV エッジ",sub:"UV Edge",icon:H.vEdge,run:t("edge")},NE:{label:"オブジェクト",sub:"Object",icon:H.vObj,run:()=>this.setMode("model")},E:{label:"UV シェル",sub:"Shell",icon:H.vFace,run:t("shell")},SE:{label:"カット",sub:"Cut",icon:H.multicut,run:()=>e?.cutOrSew(!0)},S:{label:"面（3D と同期）",sub:"Face",icon:H.vFace,run:t("shell")},SW:{label:"ソー",sub:"Sew",icon:H.vEdge,run:()=>e?.cutOrSew(!1)},W:{label:"UV 頂点",sub:"UV Vertex",icon:H.vVert,run:t("vertex")}}}uvEditMenu(){const t=this.uv;if(!t)return{};const e={N:{label:"展開",sub:"Unfold",icon:H.smooth,run:()=>t.unfold()},NE:{label:"カット",sub:"Cut",icon:H.multicut,run:()=>t.cutOrSew(!0)},E:{label:"ソー",sub:"Sew",icon:H.vEdge,run:()=>t.cutOrSew(!1)}};return t.unit==="edge"?{...e,SE:{label:"整列",sub:"Layout",icon:H.vMulti,run:()=>t.repack()},S:{label:"直線化",sub:"Straighten",icon:H.vEdge,run:()=>t.tidy("straighten")},SW:{label:"整列 U",sub:"Align U",icon:H.vMulti,run:()=>t.tidy("alignU")},W:{label:"整列 V",sub:"Align V",icon:H.vMulti,run:()=>t.tidy("alignV")},NW:{label:"マージ",sub:"Merge",icon:H.vVert,run:()=>t.tidy("merge")}}:t.unit==="vertex"?{...e,SE:{label:"ピン",sub:"Pin",icon:H.vVert,run:()=>t.pinOrUnpin(!0)},S:{label:"ピン解除",sub:"Unpin",icon:H.vVert,run:()=>t.pinOrUnpin(!1)},SW:{label:"整列 U",sub:"Align U",icon:H.vMulti,run:()=>t.tidy("alignU")},W:{label:"整列 V",sub:"Align V",icon:H.vMulti,run:()=>t.tidy("alignV")},NW:{label:"対称",sub:"Symmetry",icon:H.sym,run:()=>t.tidy("symmetry")}}:{...e,SE:{label:"自動 UV",sub:"Auto",icon:H.mUV,run:()=>t.autoUnwrap()},S:{label:"整列",sub:"Layout",icon:H.vMulti,run:()=>t.repack()},SW:{label:"反転 U",sub:"Flip U",icon:H.sym,run:()=>t.transformSelection("flipU")},W:{label:"反転 V",sub:"Flip V",icon:H.sym,run:()=>t.transformSelection("flipV")},NW:{label:"90° 回転",sub:"Rotate",icon:H.rotate,run:()=>t.transformSelection("rotate90")}}}toggleSnap(){this.state.snapOn=!this.state.snapOn,this.syncToggleButtons(),this.refresh(),this.hud.toast(this.state.snapOn?`スナップ オン: ${Ns[this.state.snap.kind]}`:"スナップ オフ")}setSnapKind(t){this.state.snap.kind=t,this.state.snapOn=!0,this.renderToolColumn(),this.syncToggleButtons(),this.refresh(),this.hud.toast(`スナップ: ${Ns[t]}`)}snapMenu(){return{N:{label:"グリッド",sub:"Grid  X",icon:H.wire,run:()=>this.setSnapKind("grid")},E:{label:"頂点",sub:"Point  V",icon:H.vVert,run:()=>this.setSnapKind("vertex")},S:{label:"カーブ / エッジ",sub:"Curve  C",icon:H.vEdge,run:()=>this.setSnapKind("edge")},W:{label:"サーフェス",sub:"Surface",icon:H.vFace,run:()=>this.setSnapKind("surface")},SE:{label:"オプション…",sub:"Options",icon:H.snap,run:()=>this.openGroupOptions("snap",()=>[Uy(this.optionsState(),this.panelHost())])},SW:{label:"オフ",sub:"Off",icon:H.snap,run:()=>{this.state.snapOn=!1,this.syncToggleButtons(),this.refresh(),this.hud.toast("スナップ オフ")}}}}uvSnapMenu(){const t=(e,n)=>({label:n,sub:"Grid",icon:H.wire,run:()=>{this.state.uvSnap={kind:"grid",step:e},this.state.snapOn=!0,this.syncToggleButtons(),this.refresh(),this.hud.toast(`UV スナップ: グリッド ${n}`)}});return{N:t(1/8,"1/8"),NE:t(1/16,"1/16"),E:t(1/32,"1/32"),S:{label:"UV 頂点",sub:"UV Point",icon:H.vVert,run:()=>{this.state.uvSnap={...this.state.uvSnap,kind:"vertex"},this.state.snapOn=!0,this.syncToggleButtons(),this.refresh(),this.hud.toast("UV スナップ: UV 頂点")}},SW:{label:"オフ",sub:"Off",icon:H.snap,run:()=>{this.state.snapOn=!1,this.syncToggleButtons(),this.refresh(),this.hud.toast("スナップ オフ")}}}}shadingMenu(){return{N:{label:"ワイヤーフレーム",sub:"4",icon:H.wire,run:()=>this.setDisplay("wire")},E:{label:"シェード",sub:"5",icon:H.shaded,run:()=>this.setDisplay("shaded")},S:{label:"シェード + ワイヤー",sub:"6",icon:H.shadedWire,run:()=>this.setDisplay("shadedWire")},W:{label:"スムースシェード",sub:"7",icon:H.smooth,run:()=>this.setDisplay("smooth")},NW:{label:"チェッカー",sub:"8",icon:H.mUV,run:()=>this.setDisplay("checker")}}}selectModeMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return{N:{label:"エッジ",sub:"Edge",icon:H.vEdge,run:()=>this.setCompMode("edge")},NE:{label:"オブジェクト モード",sub:"Object",icon:H.vObj,run:()=>this.setCompMode("object")},SE:{label:"マルチ",sub:"Multi",icon:H.vMulti,run:t("マルチコンポーネント選択")},S:{label:"フェース",sub:"Face",icon:H.vFace,run:()=>this.setCompMode("face")},SW:{label:"頂点フェース",sub:"Vertex Face",icon:H.vVertFace,run:t("頂点フェース選択")},W:{label:"頂点",sub:"Vertex",icon:H.vVert,run:()=>this.setCompMode("vertex")},NW:this.state.modOn("ctrl")?{label:"選択を縮小",sub:"Shrink  <",icon:H.vMulti,run:()=>this.growOrShrink(!1)}:{label:"選択を拡張",sub:"Grow  >",icon:H.vMulti,run:()=>this.growOrShrink(!0)}}}editMenu(){const t=e=>()=>this.hud.toast(`${e} は未実装です`);return this.state.compMode==="face"?{N:{label:"押し出し",sub:"Extrude",icon:H.extrude,run:()=>this.doExtrudeFaces()},NE:{label:"ベベル",sub:"Bevel",icon:H.scale,run:t("ベベル")},E:{label:"ブリッジ",sub:"Bridge",icon:H.vEdge,run:t("ブリッジ")},SE:{label:"複製",sub:"Duplicate",icon:H.dup,run:()=>this.doDuplicateFaces()},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>this.doDeleteFaces()},SW:{label:"コラプス",sub:"Collapse",icon:H.vVert,run:()=>this.doCollapseFaces()},W:{label:"スムース",sub:"Smooth",icon:H.smooth,run:()=>this.doSmooth()},NW:{label:"抽出",sub:"Extract",icon:H.vFace,run:()=>this.doExtractFaces()}}:this.state.compMode==="edge"?{N:{label:"押し出し",sub:"Extrude",icon:H.extrude,run:()=>this.doExtrudeEdgesMenu()},NE:{label:"ベベル",sub:"Bevel",icon:H.scale,run:()=>this.setTool("bevel")},E:{label:"ブリッジ",sub:"Bridge",icon:H.vEdge,run:()=>this.doBridge()},SE:{label:"エッジループ挿入",sub:"Insert Loop",icon:H.multicut,run:()=>this.setTool("multicut")},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>this.doDeleteEdges()},SW:{label:"スピン",sub:"Spin",icon:H.rotate,run:t("スピンエッジ")},W:{label:"接続",sub:"Connect",icon:H.vMulti,run:()=>this.doConnectEdges()},NW:{label:"境界を選択",sub:"Boundary",icon:H.vEdge,run:()=>this.selectBoundary()}}:this.state.compMode==="vertex"?{N:{label:"距離でマージ",sub:"Merge",icon:H.vVert,run:()=>this.doMergeByDistance()},NE:{label:"中心にマージ",sub:"To Center",icon:H.vObj,run:()=>this.doMergeVertices()},E:{label:"面取り",sub:"Chamfer",icon:H.scale,run:t("面取り")},SE:{label:"接続",sub:"Connect",icon:H.vMulti,run:()=>this.doConnectVertices()},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>this.doDissolveVertices()},SW:{label:"平均化",sub:"Average",icon:H.smooth,run:t("平均化")},W:{label:"分離",sub:"Detach",icon:H.vVertFace,run:t("分離")},NW:{label:"押し出し",sub:"Extrude",icon:H.extrude,run:()=>this.doExtrudeVertices()}}:{N:{label:"スムース",sub:"Smooth",icon:H.smooth,run:()=>this.doSmooth()},NE:{label:"中心にピボット",sub:"Center Pivot",icon:H.vObj,run:()=>this.doCenterPivot()},E:{label:"分離",sub:"Separate",icon:H.vVertFace,run:()=>this.doSeparate()},SE:{label:"複製",sub:"Duplicate",icon:H.dup,run:()=>this.doDuplicate()},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>this.doDelete()},SW:{label:"ミラー",sub:"Mirror",icon:H.sym,run:()=>this.doMirror()},W:{label:"結合",sub:"Combine",icon:H.prim,run:()=>this.doCombine()},NW:{label:"フリーズ",sub:"Freeze",icon:H.vObj,run:()=>this.doFreeze()}}}growOrShrink(t){this.applySelectResult(this.selector.growOrShrink(t))}selectBoundary(){const t=this.selector.selectBoundary();t.changed&&this.syncCompModeButtons(),this.applySelectResult(t),!t.changed&&t.message&&this.hud.toast(t.message)}doSmooth(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");this.history.push("スムース"),t.mesh=pd(t.mesh,1),t.markTopologyChanged(),this.state.comp.clear(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast(`スムース — ${t.mesh.faceCount} 面`)}applyTopologyChange(t,e,n,s){const r=this.history.snapshot();if(!n())return;const o=t.markTopologyChanged();this.state.comp.clear(),this.history.commit(e,r),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh();let a=s(t);(o.droppedLevels||o.droppedLayers)&&(a+=` · 上位レベル ${o.droppedLevels} とレイヤー ${o.droppedLayers} を破棄`),o.rebased&&(a+=" · UV の土台を取り直した"),this.hud.toast(a)}requireComponents(t,e=1){const n=this.state.selected,s={object:"オブジェクト",vertex:"頂点",edge:"エッジ",face:"フェース"}[t];return!n||this.state.compMode!==t||this.state.comp.size<e?(this.hud.toast(`${s}モードで${e>1?`${e} つ以上`:""}選択してから実行してください`),null):n}doExtrudeFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"押し出し",()=>{const n=ac(t.mesh,this.state.comp,this.state.toolOpts.extrudeDist);return n?(t.mesh=n.mesh,e=n.faceCount,!0):!1},()=>`面を押し出し — ${e} 面`)}doExtrudeEdgesMenu(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean);let s=0;this.applyTopologyChange(t,"エッジを押し出し",()=>{const r=cc(t.mesh,n,this.state.toolOpts.extrudeDist);return r?(t.mesh=r.mesh,s=r.faceCount,!0):!1},()=>`エッジを押し出し — ${s} 面`)}doDeleteFaces(){const t=this.requireComponents("face");if(!t)return;let e=0;this.applyTopologyChange(t,"面を削除",()=>{const n=vf(t.mesh,this.state.comp);return n?(t.mesh=Ln(n.mesh),e=n.removed,!0):!1},()=>`${e} 面を削除`)}doCollapseFaces(){const t=this.requireComponents("face");t&&this.applyTopologyChange(t,"コラプス",()=>{const e=xf(t.mesh,this.state.comp);return e?(t.mesh=Ln(e),!0):!1},()=>"フェースをコラプス")}doMergeVertices(){const t=this.requireComponents("vertex",2);t&&this.applyTopologyChange(t,"頂点をマージ",()=>(t.mesh=Ln($s(t.mesh,[[...this.state.comp]])),!0),()=>"頂点をマージ")}doMergeByDistance(){const t=this.state.selected;if(!t||this.state.compMode!=="vertex"){this.hud.toast("頂点モードで実行してください");return}const e=this.state.vertexOpts.mergeDist,n=this.state.comp.size>=2?[...this.state.comp]:void 0,s=Xc(t.mesh,e,n);if(!s){this.hud.toast(`${e.toFixed(3)} 以内に重なる頂点がありません`);return}this.applyTopologyChange(t,"距離でマージ",()=>(t.mesh=Ln(s.mesh),!0),()=>`${s.merged} 頂点をマージ（${e.toFixed(3)} 以内）`)}doDissolveVertices(){const t=this.requireComponents("vertex");if(!t)return;const e=Ef(t.mesh,this.state.comp);if(!e){this.hud.toast("消せる頂点がありません（面が繋がっていない頂点です）");return}this.applyTopologyChange(t,"頂点を削除",()=>(t.mesh=Ln(e.mesh),!0),()=>`${e.removed} 頂点を削除`)}doExtrudeVertices(){const t=this.requireComponents("vertex");if(!t)return;const e=lc(t.mesh,this.state.comp,this.state.toolOpts.extrudeDist,this.state.vertexOpts.extrudeWidth);if(!e){this.hud.toast("押し出せる頂点がありません（まわりの面が輪になっている必要があります）");return}this.applyTopologyChange(t,"頂点を押し出し",()=>(t.mesh=e.mesh,!0),()=>`頂点を押し出し — ${e.faces} 面`)}doDeleteEdges(){const t=this.requireComponents("edge");if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(o=>e.edges[o]).filter(Boolean);let s=0;const r=gf(t.mesh,n);if(!r){this.hud.toast("結合できるエッジがありません（境界エッジは削除できません）");return}this.applyTopologyChange(t,"エッジを削除",()=>(t.mesh=r.mesh,s=r.merged,!0),()=>`エッジを削除 — ${s} 面を結合`)}doBridge(){const t=this.requireComponents("edge",2);if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean),s=yf(t.mesh,n);if(!s){this.hud.toast("ブリッジできません（境界エッジの 2 列を同じ本数だけ選んでください）");return}this.applyTopologyChange(t,"ブリッジ",()=>(t.mesh=s.mesh,!0),()=>`ブリッジ — ${s.faces} 面`)}doConnectVertices(){const t=this.requireComponents("vertex",2);if(!t)return;const e=$c(t.mesh,this.state.comp);if(!e){this.hud.toast("結べる組がありません（同じ面にあり、隣り合っていない 2 点を選んでください）");return}this.applyTopologyChange(t,"接続",()=>(t.mesh=e.mesh,!0),()=>`接続 — ${e.edges} 本のエッジ`)}doConnectEdges(){const t=this.requireComponents("edge",2);if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;const n=[...this.state.comp].map(r=>e.edges[r]).filter(Boolean),s=Tf(t.mesh,n);if(!s){this.hud.toast("結べる組がありません（同じ面に来るエッジを 2 本以上選んでください）");return}this.applyTopologyChange(t,"接続",()=>(t.mesh=s.mesh,!0),()=>`接続 — ${s.edges} 本のエッジ`)}doDuplicateFaces(){const t=this.requireComponents("face");if(!t)return;const e=Pf(t.mesh,this.state.comp);if(!e)return;let n=0;this.applyTopologyChange(t,"フェースの複製",()=>(t.mesh=e.mesh,n=e.faces.length,!0),()=>`${n} 面を複製`),this.state.comp.clear();for(const s of e.faces)this.state.comp.add(s);this.viewport.rebuildOverlay(),this.refresh()}doExtractFaces(){const t=this.requireComponents("face");if(!t)return;const e=If(t.mesh,this.state.comp);if(!e){this.hud.toast("抽出できません（全部を選ぶと残りが無くなります）");return}const n=this.history.snapshot();t.mesh=e.mesh,t.markTopologyChanged();const s=this.state.doc.addMesh(e.extracted,`${t.name}_extract`);s.transform=ti(t.transform),this.history.commit("フェースの抽出",n),this.state.comp.clear(),this.viewport.syncAll(),this.state.select(s),this.setCompMode("object"),this.refresh(),this.hud.toast(`${e.count} 面を ${s.name} へ抽出`)}doSeparate(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");const e=Df(t.mesh);if(!e){this.hud.toast("分けられません（繋がった 1 つの塊です）");return}const n=this.history.snapshot(),s=this.state.doc.objects.indexOf(t);this.state.doc.objects.splice(s,1);let r=null;e.forEach((o,a)=>{const c=this.state.doc.addMesh(o,`${t.name}_${a+1}`);c.transform=ti(t.transform),r||(r=c)}),this.history.commit("分離",n),this.viewport.syncAll(),this.state.select(r),this.refresh(),this.hud.toast(`${e.length} 個に分離`)}doCombine(){const t=this.state.selectedObjects();if(t.length<2){this.hud.toast("オブジェクトモードで SHF を足して 2 つ以上選んでください");return}const e=Lf(t.map(r=>({mesh:r.mesh,transform:r.transform})));if(!e)return;const n=this.history.snapshot();for(const r of t){const o=this.state.doc.objects.indexOf(r);o>=0&&this.state.doc.objects.splice(o,1)}const s=this.state.doc.addMesh(e,t[0].name);this.history.commit("結合",n),this.viewport.syncAll(),this.state.select(s),this.refresh(),this.hud.toast(`${t.length} 個を結合`)}doMirror(){const t=this.state.selected;if(!t)return void this.hud.toast("オブジェクトを選択してください");const e=this.state.mirrorAxis,n=Uf(t.mesh,e,this.state.vertexOpts.mergeDist);n&&this.applyTopologyChange(t,"ミラー",()=>(t.mesh=n.mesh,!0),()=>`ミラー ${"XYZ"[e]} — ${n.welded} 頂点を溶接`)}doCenterPivot(){const t=this.state.selected;if(!t)return;this.history.push("中心にピボット");const e=t.mesh.boundsCenter();for(let n=0;n<t.mesh.vertexCount;n++){const s=t.mesh.getPosition(n);t.mesh.setPosition(n,s[0]-e[0],s[1]-e[1],s[2]-e[2])}t.transform.position=[t.transform.position[0]+e[0]*t.transform.scale[0],t.transform.position[1]+e[1]*t.transform.scale[1],t.transform.position[2]+e[2]*t.transform.scale[2]],t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("ピボットを中心へ")}doFreeze(){const t=this.state.selected;if(!t)return;const e=this.viewport.viewOf(t);if(!e)return;this.history.push("フリーズ"),e.group.updateMatrixWorld();const n=e.group.matrixWorld;for(let s=0;s<t.mesh.vertexCount;s++){const r=t.mesh.getPosition(s),o=new L(r[0],r[1],r[2]).applyMatrix4(n);t.mesh.setPosition(s,o.x,o.y,o.z)}t.transform={position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]},t.parametric=!1,this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.refresh(),this.hud.toast("トランスフォームをフリーズ")}doDuplicate(){const t=this.state.selected;if(!t)return;this.history.push("複製");const e=this.state.doc.addMesh(t.mesh.clone(),`${t.name}_copy`);e.transform=ti(t.transform),this.state.select(e),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${e.name} を複製しました`)}doDelete(){const t=this.state.selected;t&&(this.history.push("削除"),this.state.doc.remove(t),this.state.select(null),this.viewport.syncAll(),this.refresh(),this.hud.toast(`${t.name} を削除しました`))}doUndo(){const t=this.history.undo();t&&(this.afterHistory(),this.hud.toast(`元に戻す: ${t}`))}doRedo(){const t=this.history.redo();t&&(this.afterHistory(),this.hud.toast(`やり直す: ${t}`))}afterHistory(){this.viewport.syncAll(),this.selector.reset(),this.syncCompModeButtons(),this.state.mode==="uv"&&this.uv&&(this.uv.rebuild(),this.pushSelectionToUv()),this.refresh()}syncCompModeButtons(){for(const t of document.querySelectorAll("[data-comp-mode]"))t.setAttribute("aria-pressed",String(t.dataset.compMode===this.state.compMode))}syncToggleButtons(){this.renderToolColumn()}updateHistoryButtons(){Tt("btnUndo").disabled=!this.history.canUndo,Tt("btnRedo").disabled=!this.history.canRedo}toolColumn(){return this.state.mode==="uv"?this.uvToolColumn():this.state.mode!=="model"?[]:[{kind:"label",text:"選択"},{kind:"button",id:"select",icon:()=>ob[this.state.compMode],title:"選択（長押しで オブジェクト / 頂点 / エッジ / フェース）",pressed:()=>this.state.tool==="select",radial:()=>this.selectGroupMenu(),options:()=>this.selectOptions(),onTap:()=>this.setTool("select")},{kind:"button",id:"xform",icon:()=>this.state.pivotEdit?H.pivot:wu[this.state.manip],title:"変形（長押しで ユニバーサル / 移動 / 回転 / スケール / ピボット）",pressed:()=>this.state.pivotEdit,radial:()=>this.manipulatorMenu(),options:()=>this.xformOptions(),onTap:()=>this.setTool("select")},{kind:"button",id:"edit",icon:()=>Eu[this.state.lastEdit],title:"編集（長押しで マルチカット / ベベル / ブリッジ / 押し出し / 接続 / ウェルド）",pressed:()=>this.state.tool==="multicut"||this.state.tool==="bevel",radial:()=>this.editGroupMenu(),options:()=>this.editOptions(),onTap:()=>this.activateEdit(this.state.lastEdit)},{kind:"button",id:"snap",icon:()=>cb[this.state.snap.kind],title:"スナップ（タップでオン / オフ · 長押しで種類とオプション）",pressed:()=>this.state.snapOn,radial:()=>this.snapMenu(),onTap:()=>this.toggleSnap()},{kind:"separator"},{kind:"label",text:"表示"},{kind:"button",id:"display",icon:()=>lb[this.state.display],title:"シェーディング（長押しで切り替え。4–8）",radial:()=>this.shadingMenu(),options:()=>[ky(this.optionsState(),this.panelHost())],onTap:()=>{}},{kind:"button",id:"camera",icon:H.camera,title:"カメラ（長押しでビューの切り替え · タップで設定）",pressed:()=>this.state.camOpts.ortho,radial:()=>this.cameraMenu(),radialList:()=>this.savedCameraItems(),options:()=>[By(this.optionsState(),this.panelHost())],onTap:()=>{}},{kind:"separator"},{kind:"label",text:"追加"},{kind:"button",id:"add",icon:()=>Tu[this.primitiveIconKind()]??H.prim,title:"追加（長押しでプリミティブを選ぶ · タップで入力ノード）",radial:()=>this.primitiveMenu(),options:()=>[Oy(this.optionsState(),this.panelHost())],onTap:()=>{}}]}primitiveIconKind(){const t=this.state.selected;return t?.parametric&&Sn[t.kind]?t.kind:this.state.lastPrimitive}selectGroupMenu(){return{N:{label:"オブジェクト",sub:"Object  F8",icon:H.vObj,run:()=>this.setCompMode("object")},E:{label:"頂点",sub:"Vertex  F9",icon:H.vVert,run:()=>this.setCompMode("vertex")},S:{label:"エッジ",sub:"Edge  F10",icon:H.vEdge,run:()=>this.setCompMode("edge")},W:{label:"フェース",sub:"Face  F11",icon:H.vFace,run:()=>this.setCompMode("face")},NW:this.state.modOn("ctrl")?{label:"選択を縮小",sub:"Shrink  <",icon:H.vMulti,run:()=>this.growOrShrink(!1)}:{label:"選択を拡張",sub:"Grow  >",icon:H.vMulti,run:()=>this.growOrShrink(!0)}}}editGroupMenu(){const t=(e,n)=>({label:ab[e],sub:n,icon:Eu[e],run:()=>this.activateEdit(e,!0)});return{N:t("multicut","Multi Cut"),E:t("bevel","Bevel"),S:t("bridge","Bridge"),W:t("extrude","Extrude"),NW:t("connect","Connect"),SW:t("weld","Target Weld")}}primitiveMenu(){const t={};return ff.forEach((e,n)=>{const s=Sn[e];!s||n>=Tc.length||(t[Tc[n]]={label:s.label,sub:s.en,icon:Tu[e]??H.prim,run:()=>this.addPrimitive(e)})}),t}activateEdit(t,e=!1){if(this.state.lastEdit=t,t==="multicut"||t==="bevel"){this.setTool(t);return}if(this.setTool("select"),!e){this.renderToolColumn();return}t==="bridge"?this.doBridge():t==="extrude"?this.doExtrudeForMode():t==="connect"?this.doConnectForMode():this.hud.toast("頂点を掴んで、別の頂点の近くで離すと溶接します"),this.renderToolColumn()}doExtrudeForMode(){this.state.compMode==="face"?this.doExtrudeFaces():this.state.compMode==="edge"?this.doExtrudeEdgesMenu():this.state.compMode==="vertex"?this.doExtrudeVertices():this.hud.toast("面・エッジ・頂点を選んでください")}doConnectForMode(){this.state.compMode==="edge"?this.doConnectEdges():this.state.compMode==="vertex"?this.doConnectVertices():this.hud.toast("エッジか頂点を選んでください")}selectOptions(){const t=this.optionsState(),e=this.panelHost(),n=[xu(t,e)];return this.state.compMode!=="object"&&n.push(Fy(t,e)),this.state.compMode==="vertex"&&n.push(fa(t,e)),this.state.compMode==="object"&&n.push(Ny(t,e)),n}xformOptions(){const t=this.optionsState(),e=this.panelHost(),n=[Cy(t,e)];this.state.compMode==="vertex"&&n.push(fa(t,e));const s=Ay(t,e);return s&&n.push(s),n}editOptions(){const t=this.optionsState(),e=this.panelHost();switch(this.state.lastEdit){case"multicut":return[Ry(t,e)];case"bevel":return[Py(t,e)];case"bridge":return[Ly()];case"connect":return[Dy()];case"extrude":return[Iy(t,e)];default:return[fa(t,e)]}}buildToolDock(){Tt("dockLeft").textContent="";const{panel:t,body:e}=vu("tools","ツール");this.toolPanelBody=e,this.renderToolColumn(),this.docking.attach(t),this.docking.place(t,this.zones.tools??"left")}renderToolColumn(){const t=this.toolPanelBody;if(!t)return;t.textContent="";const e=st("div","toolcol");for(const n of this.toolColumn()){if(n.kind==="label"){e.appendChild(st("div","minilbl",n.text));continue}if(n.kind==="separator"){e.appendChild(st("div","tool-sep"));continue}const s=st("button","ibtn");s.dataset.group=n.id,s.innerHTML=eb(typeof n.icon=="function"?n.icon():n.icon),s.title=n.title,n.tool&&(s.dataset.tool=n.tool,s.setAttribute("aria-pressed",String(this.state.tool===n.tool))),n.compMode&&(s.dataset.compMode=n.compMode,s.setAttribute("aria-pressed",String(this.state.compMode===n.compMode))),n.pressed&&(s.dataset.toggle="1",s.setAttribute("aria-pressed",String(n.pressed())));const r=()=>{const o=n.options&&this.popup?.dataset.gauge===n.id;if(n.onTap(s),!n.options)return;if(o){this.closePopup();return}const a=this.toolPanelBody?.querySelector(`[data-group="${n.id}"]`)??s;this.openToolOptions(a,n.id,n.options)};n.radial?(s.dataset.radial="1",yu(s,n.radial,r,n.radialList)):s.addEventListener("click",r),e.appendChild(s)}t.appendChild(e)}openToolOptions(t,e,n){this.closePopup();const s=n();if(!s.length)return;const r=t.getBoundingClientRect(),o=st("div","cutin wide");o.dataset.gauge=e,o.style.left=`${r.right+8}px`,o.style.top=`${Math.max(8,Math.min(window.innerHeight-120,r.top))}px`,o.style.maxHeight=`${window.innerHeight-Math.max(8,r.top)-16}px`;for(const a of s)o.appendChild(a);document.body.appendChild(o),this.popup=o,this.popupAnchor=t}openGroupOptions(t,e){const n=this.toolPanelBody?.querySelector(`[data-group="${t}"]`);n&&this.openToolOptions(n,t,e)}optionsState(){const t=this.primitiveIconKind();return{tool:this.state.tool,selected:this.state.selected,soft:this.state.soft,cut:this.state.cut,bevel:this.state.bevel,bevelActive:this.bevel.active,extrudeDist:this.state.toolOpts.extrudeDist,vertex:this.state.vertexOpts,snap:{...this.state.snap,active:this.state.snapping},mirrorAxis:this.state.mirrorAxis,rotationEuler:this.state.selected?this.eulerOf(this.state.selected.transform.rotation):[0,0,0],smoothAngle:this.state.smoothAngle,compMode:this.state.compMode,manipSize:this.state.manipSize,manip:this.state.manip,pivotEdit:this.state.pivotEdit,rotateStep:this.state.rotateStep,preventNegativeScale:this.state.preventNegativeScale,cameraBased:this.state.cameraBased,cam:this.state.camOpts,nextPrimitive:t,nextPrimitiveParams:this.state.primitiveDefaults[t]??io(t),uv:this.state.mode==="uv"&&this.state.selected?.uv?{method:this.state.selected.uv.method,snapKind:this.state.uvSnap.kind,snapStep:this.state.uvSnap.step,auto:{...this.state.selected.uv.autoSeamParams},packing:{...this.state.selected.uv.packing}}:null}}buildPanels(){const t=vu("outliner","アウトライナ");this.docking.attach(t.panel),this.docking.place(t.panel,this.zones.outliner??"rightTop"),this.outlinerBody=t.body,this.renderPanels(),this.viewport.resize()}panelHost(){return{onParamInput:(t,e,n)=>{this.paramSnapshot??=this.history.snapshot(),t.params[e]=n,t.rebuild(),this.viewport.rebuildObject(t),this.viewport.rebuildOverlay(),this.hud.refreshStats(),this.refreshManipulator()},onParamCommit:(t,e)=>{this.paramSnapshot&&(this.history.commit(e,this.paramSnapshot),this.paramSnapshot=null)},onSoftChange:(t,e)=>{this.state.soft[t]=e,this.viewport.rebuildOverlay(),this.refresh()},onExtrudeDistChange:t=>{this.state.toolOpts.extrudeDist=t},onVertexOptChange:(t,e)=>{this.state.vertexOpts[t]=e},onMirrorAxisChange:t=>{this.state.mirrorAxis=t,this.refresh()},onTransformInput:(t,e,n,s)=>{this.history.push("数値入力");const r=ti(t.transform);if(e==="rotation"){const a=this.eulerOf(r.rotation);a[n]=s;const c=a.map(h=>h*Math.PI/180),l=new an().setFromEuler(new Wn(c[0],c[1],c[2],"XYZ"));r.rotation=[l.x,l.y,l.z,l.w]}else{const a=[...r[e]];a[n]=s,r[e]=a}t.transform=r;const o=this.viewport.viewOf(t);o&&(nn(o.group,t.transform),o.group.updateMatrixWorld()),this.viewport.rebuildOverlay(),this.refresh()},onSnapChange:(t,e)=>{t==="kind"?this.setSnapKind(e):(this.state.snap.step=e,this.refresh())},onBevelChange:(t,e)=>{t==="segments"?this.state.bevel.segments=e:this.state.bevel.width=e,this.redoBevel()},onCutChange:(t,e)=>{t==="edgeFlow"?this.state.cut.edgeFlow=e:this.state.cut.snapStep=e},onSmoothAngleChange:t=>{this.state.smoothAngle=t;for(const e of this.state.doc.objects)this.viewport.rebuildObject(e)},onManipSizeChange:t=>this.setManipSize(t),onUvMethodChange:t=>{this.uv?.setMethod(t),this.refresh()},onUvAutoChange:(t,e)=>{const n=this.state.selected?.uv;n&&(t==="angle"?n.autoSeamParams.angle=e:n.autoSeamParams[t]=e)},onUvAutoRun:()=>this.uv?.autoUnwrap(),onUvPackingChange:(t,e)=>{const n=this.state.selected?.uv;n&&(t==="allowRotate"?n.packing.allowRotate=e:n.packing[t]=e,this.uv?.repack(),this.refresh())},onUvSnapChange:(t,e)=>{t==="kind"?this.state.uvSnap.kind=e:this.state.uvSnap.step=e,this.state.snapOn=!0,this.syncToggleButtons(),this.refresh()},onCameraBasedChange:t=>{this.state.cameraBased=t,this.remember("cameraBased",t),this.hud.toast(t?"カメラベース選択: オン":"カメラベース選択: オフ")},onRotateStepChange:t=>{this.state.rotateStep=t,this.remember("rotateStep",t),this.reopenToolOptions("xform")},onPreventNegativeScaleChange:t=>{this.state.preventNegativeScale=t,this.remember("preventNegativeScale",t)},onPivotEditToggle:()=>{this.togglePivotEdit(),this.reopenToolOptions("xform")},onCamOptChange:(t,e)=>{this.state.camOpts[t]=e,this.viewport.applyCamera(),this.refreshManipulator()},onCamOrthoChange:t=>{this.state.camOpts.ortho=t,this.viewport.applyCamera(),this.refresh()},onCamReset:()=>{this.state.camOpts={focal:35,near:.05,far:500,ortho:!1},this.setView("persp"),this.refreshManipulator(),this.reopenToolOptions("camera"),this.hud.toast("カメラを初期設定に戻した")},onDefaultParamChange:(t,e,n)=>{const s=this.state.primitiveDefaults[t]??=io(t);s[e]=n},onSelect:t=>{this.state.select(t),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh()},onRename:(t,e)=>{this.history.push("名前変更"),t.name=e,this.refresh()},onOutlinerMenu:(t,e,n)=>{Jn({N:{label:"名前変更",sub:"Rename",icon:H.rename,run:()=>this.hud.toast("行をダブルタップでも変更できます")},E:{label:"複製",sub:"Duplicate",icon:H.dup,run:()=>{this.state.select(t),this.doDuplicate()}},S:{label:"削除",sub:"Delete",icon:H.del,run:()=>{this.state.select(t),this.doDelete()}},W:{label:"フレーム",sub:"Frame",icon:H.frame,run:()=>{this.state.select(t),this.refresh(),this.viewport.frameSelected()}}},e,n)}}}renderPanels(){this.outlinerBody&&Hy(this.outlinerBody,this.state.doc.objects,this.state.selected,this.panelHost())}reopenToolOptions(t){if(this.popup?.dataset.gauge!==t)return;const e=this.popupAnchor,n=this.toolColumn().find(r=>r.kind==="button"&&r.id===t);if(!e||!n||n.kind!=="button"||!n.options)return;this.renderToolColumn();const s=this.toolPanelBody?.querySelector(`[data-group="${t}"]`)??e;this.openToolOptions(s,t,n.options)}restoreSettings(){const t=s=>{try{return localStorage.getItem(`macbeth.${s}`)}catch{return null}};this.state.cameraBased=t("cameraBased")==="true",this.state.preventNegativeScale=t("preventNegativeScale")!=="false";const e=Number(t("rotateStep"));Number.isFinite(e)&&e>=0&&(this.state.rotateStep=e);const n=t("lastPrimitive");n&&Sn[n]&&(this.state.lastPrimitive=n)}remember(t,e){try{localStorage.setItem(`macbeth.${t}`,String(e))}catch{}}addPrimitive(t){this.history.push(`${Sn[t].label} を追加`);const e=this.state.doc.addObject(t),n=this.state.primitiveDefaults[t];n&&(e.params={...n},e.rebuild()),this.state.lastPrimitive=t,this.remember("lastPrimitive",t),this.state.select(e),this.viewport.syncAll(),this.renderToolColumn(),this.refresh(),this.hud.toast(`${e.name} を追加しました`)}setCompMode(t){this.state.tool!=="select"&&this.setTool("select"),this.state.compMode!==t&&(this.state.compMode=t,this.state.comp.clear(),this.selector.reset(),this.viewport.applyDisplayAll(),this.viewport.rebuildOverlay(),this.refresh(),this.syncCompModeButtons(),this.pushSelectionToUv(),this.hud.toast(bu.find(e=>e.id===t)?.label??t))}buildGauges(){const t=()=>this.viewport.rebuildOverlay();this.gauges=[new gu(this.state,"gauge1","g1","g1lbl","g1val",t,()=>this.refresh()),new gu(this.state,"gauge2","g2","g2lbl","g2val",t,()=>this.refresh())]}buildCluster(){const t=n=>{this.state.mods[n]=this.state.mods[n]==="off"?"on":"off",this.syncModButtons(),this.hud.refreshStats()};Tt("modShift").addEventListener("click",()=>t("shift")),Tt("modCtrl").addEventListener("click",()=>t("ctrl")),Tt("modAlt").addEventListener("click",()=>t("alt"));const e=Tt("btnFrame");e.addEventListener("touchstart",n=>n.preventDefault(),{passive:!1}),e.addEventListener("pointerdown",n=>{e.setPointerCapture(n.pointerId),this.fHeld=!0});for(const n of["pointerup","pointercancel"])e.addEventListener(n,()=>{this.fHeld&&(this.fHeld=!1,this.fChord||this.viewport.frameSelected(),this.fChord=!1)})}get fHeld(){return this.router.fHeld}set fHeld(t){this.router.fHeld=t}get fChord(){return this.router.fChord}set fChord(t){this.router.fChord=t}syncModButtons(){for(const[t,e]of[["shift","modShift"],["ctrl","modCtrl"],["alt","modAlt"]])Tt(e).dataset.state=this.state.mods[t]}bindKeyboard(){window.addEventListener("keydown",t=>{const e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"))return;const n=bu.find(a=>a.key===t.key);if(n){t.preventDefault(),this.setCompMode(n.id);return}const s=rb[t.key];if(s){this.setDisplay(s);return}if(t.key==="f"||t.key==="F"){this.viewport.frameSelected();return}const r={q:"all",t:"all",w:"move",e:"rotate",r:"scale"}[t.key.toLowerCase()];if(r&&!t.ctrlKey&&!t.metaKey){this.setManip(r);return}if(t.key===">"||t.key==="."){this.growOrShrink(!0);return}if(t.key==="<"||t.key===","){this.growOrShrink(!1);return}const o={x:"grid",v:"vertex",c:"edge"}[t.key.toLowerCase()];if(o&&!t.ctrlKey&&!t.metaKey){this.state.snap.kind=o,this.state.snapKeyHeld||(this.state.snapKeyHeld=!0,this.hud.toast(`スナップ: ${Ns[this.state.snap.kind]}（押している間）`),this.refresh());return}if((t.key==="d"||t.key==="D"||t.key==="Insert")&&!t.ctrlKey&&!t.metaKey){t.preventDefault(),this.togglePivotEdit();return}if(t.key==="+"||t.key==="="){this.setManipSize(this.state.manipSize*Su);return}if(t.key==="-"||t.key==="_"){this.setManipSize(this.state.manipSize/Su);return}if(t.key==="s"||t.key==="S"){this.state.symX=!this.state.symX,this.refresh(),this.hud.toast(`対称編集 X: ${this.state.symX?"オン":"オフ"}`);return}if((t.ctrlKey||t.metaKey)&&(t.key==="z"||t.key==="Z")){t.preventDefault(),t.shiftKey?this.doRedo():this.doUndo();return}(t.ctrlKey||t.metaKey)&&(t.key==="y"||t.key==="Y")&&(t.preventDefault(),this.doRedo())}),window.addEventListener("keyup",t=>{this.state.snapKeyHeld&&["x","v","c"].includes(t.key.toLowerCase())&&(this.state.snapKeyHeld=!1,this.preselect.clear(),this.refresh(),this.hud.defaultHint())})}bindTopBar(){Tt("btnUndo").addEventListener("click",()=>this.doUndo()),Tt("btnRedo").addEventListener("click",()=>this.doRedo()),Tt("btnPanels").addEventListener("click",()=>{this.state.panelsHidden=!this.state.panelsHidden,Tt("btnPanels").setAttribute("aria-pressed",String(this.state.panelsHidden)),Tt("dockLeft").hidden=this.state.panelsHidden,Tt("dockColRight").hidden=this.state.panelsHidden,this.layout.apply(),this.viewport.resize()}),yu(Tt("modeBtn"),()=>this.modeMenu(),()=>this.hud.toast("長押しでモードを選べます")),Tt("fileBtn").addEventListener("click",t=>this.openFileMenu(t.currentTarget)),document.addEventListener("pointerdown",t=>{if(!this.popup)return;const e=t.target;this.popup.contains(e)||this.popupAnchor?.contains(e)||this.closePopup()})}closePopup(){this.popup?.remove(),this.popup=null,this.popupAnchor=null,ul()}openFileMenu(t){this.closePopup();const e=t.getBoundingClientRect(),n=st("div","panel floating");n.style.left=`${e.left}px`,n.style.top=`${e.bottom+2}px`;const s=st("div","pbody"),r=(o,a)=>{const c=st("button","act",o);c.addEventListener("click",()=>{this.closePopup(),a()}),s.appendChild(c)};r("新規シーン",()=>this.newScene()),r("プロジェクトを開く (.mbz)",()=>this.openProject()),r("プロジェクトを保存 (.mbz)",()=>this.saveProject()),r("OBJ を読み込む",()=>this.importObj()),r("OBJ を書き出す",()=>this.exportObj()),r("glTF を書き出す (.glb)",()=>this.exportGlb()),r("画面を画像で保存 (.png)",()=>this.exportPng()),r("更新を確認して開き直す",()=>this.checkForUpdate()),s.appendChild(st("div","hint","ビルド 2026-09-08 15:27 · 7eb5435")),n.appendChild(s),document.body.appendChild(n),this.popup=n}async checkForUpdate(){this.hud.toast("更新を確認しています…");try{await(await navigator.serviceWorker?.getRegistration())?.update()}catch{}location.reload()}async newScene(){this.history.push("新規シーン"),this.state.doc.objects.length=0,this.state.select(null),this.state.doc.addObject("cube"),this.state.select(this.state.doc.objects[0]),this.viewport.syncAll(),this.refresh(),await this.autosave.saveNow()}async saveProject(){const{packMbz:t}=await bl(async()=>{const{packMbz:r}=await Promise.resolve().then(()=>Ec);return{packMbz:r}},void 0),e=t(this.state.doc,{appVersion:"0.1.0"}),n=`${this.state.doc.objects[0]?.name??"scene"}.mbz`,s=await zr(e,n);this.hud.toast(s.saved?`${n} を保存しました`:"保存を取り消しました")}async openProject(){const t=await cu(".mbz");if(t)try{const{unpackMbz:e}=await bl(async()=>{const{unpackMbz:s}=await Promise.resolve().then(()=>Ec);return{unpackMbz:s}},void 0),{document:n}=e(t.bytes);this.state.doc=n,this.state.select(n.objects[0]??null),this.history.clear(),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を開きました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async importObj(){const t=await cu(".obj,text/plain");if(t)try{const e=vd(t.text);if(!e.length)return void this.hud.toast("面が見つかりませんでした");this.history.push("OBJ 読み込み");let n=null;for(const s of e)n=this.state.doc.addMesh(s.mesh,s.name);this.state.select(n),this.viewport.syncAll(),this.viewport.frameSelected(),this.refresh(),this.hud.toast(`${t.name} を読み込みました`)}catch(e){this.hud.toast(e instanceof Error?e.message:"読み込めませんでした")}}async exportObj(){const t=this.state.selected?[this.state.selected]:this.state.doc.objects;if(!t.length)return void this.hud.toast("書き出すものがありません");const e=xd(t.map(r=>({mesh:r.mesh,name:r.name}))),n=`${t[0].name}.obj`,s=await zr(e,n);this.hud.toast(s.saved?`${n} を書き出しました`:"書き出しを取り消しました")}async exportGlb(){const t=Md(this.state.doc.objects);if(!t.length)return void this.hud.toast("書き出すものがありません");const e=_d(t,{smoothAngle:this.state.smoothAngle,generator:"macbeth"}),n=`${this.state.doc.objects[0]?.name??"scene"}.glb`,s=await zr(e,n);this.hud.toast(s.saved?`${n} を書き出しました — ${t.length} オブジェクト`:"書き出しを取り消しました")}async exportPng(){this.viewport.renderer.render(this.viewport.scene,this.viewport.camera);const t=Tt("gl"),e=await new Promise(o=>t.toBlob(a=>o(a),"image/png"));if(!e)return void this.hud.toast("画像を作れませんでした");const n=new Uint8Array(await e.arrayBuffer()),s=`${this.state.doc.objects[0]?.name??"macbeth"}.png`,r=await zr(n,s);this.hud.toast(r.saved?`${s} を保存しました`:"保存を取り消しました")}refresh(){this.preselect.clear(),this.viewport.applyDisplayAll(),this.refreshManipulator(),this.hud.refreshStats();for(const t of this.gauges)t.paint();this.updateHistoryButtons(),this.paramSnapshot||this.renderPanels()}}document.addEventListener("contextmenu",i=>i.preventDefault());document.addEventListener("selectstart",i=>{const t=i.target;t&&t.tagName!=="INPUT"&&t.tagName!=="TEXTAREA"&&i.preventDefault()});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/macbethUnity/app/sw.js",{scope:"/macbethUnity/app/",updateViaCache:"none"}).then(i=>i.update()).catch(()=>{})});const Gd=new hb;Gd.boot();Object.assign(window,{macbeth:Gd,macbethCore:Ec});
//# sourceMappingURL=index-C0eHFObD.js.map
