!function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e){"use strict";if("undefined"==typeof AFRAME)throw"Component attempted to register before AFRAME was available.";AFRAME.registerComponent("drag-look-controls",{dependencies:["position","rotation"],schema:{enabled:{"default":!0}},init:function(){this.previousPosition=new THREE.Vector3,this.deltaPosition=new THREE.Vector3,this.setupMouseControls(),this.setupHMDControls(),this.__addStylesheetRules(),this.__updateCursor()},update:function(t){this.__updateCursor(),this.data.enabled&&(this.controls.update(),this.updateOrientation(),this.updatePosition())},remove:function(){this.pause(),this.__removeStylesheetRules()},tick:function(t){this.update()},pause:function(){this.removeEventListeners()},play:function(){this.previousPosition.set(0,0,0),this.addEventListeners()},setupMouseControls:function(){this.mouseDown=!1,this.pitchObject=new THREE.Object3D,this.yawObject=new THREE.Object3D,this.yawObject.position.y=10,this.yawObject.add(this.pitchObject)},setupHMDControls:function(){this.dolly=new THREE.Object3D,this.euler=new THREE.Euler,this.controls=new THREE.VRControls(this.dolly),this.zeroQuaternion=new THREE.Quaternion},updateOrientation:function(){var t=new THREE.Euler;return t.order="YXZ",function(){var e=this.pitchObject,o=this.yawObject,n=this.calculateHMDQuaternion();t.setFromQuaternion(n),this.el.setAttribute("rotation",{x:THREE.Math.radToDeg(t.x)+THREE.Math.radToDeg(e.rotation.x),y:THREE.Math.radToDeg(t.y)+THREE.Math.radToDeg(o.rotation.y),z:THREE.Math.radToDeg(t.z)})}}(),zeroOrientation:function(){var t=new THREE.Euler;t.setFromQuaternion(this.dolly.quaternion.clone().inverse()),t.z=0,t.x=0,this.zeroQuaternion.setFromEuler(t)},calculateHMDQuaternion:function(){var t=new THREE.Quaternion;return function(){var e=this.dolly;return this.zeroed||e.quaternion.equals(this.zeroQuaternion)||(this.zeroOrientation(),this.zeroed=!0),t.copy(this.zeroQuaternion).multiply(e.quaternion),t}}(),updateHMDQuaternion:function(){var t=new THREE.Quaternion;return function(){var e=this.dolly;return this.controls.update(),this.zeroed||e.quaternion.equals(this.zeroQuaternion)||(this.zeroOrientation(),this.zeroed=!0),t.copy(this.zeroQuaternion).multiply(e.quaternion),t}}(),updatePosition:function(){var t=this.el,e=this.calculateDeltaPosition(),o=t.getComputedAttribute("position");t.setAttribute("position",{x:o.x+e.x,y:o.y+e.y,z:o.z+e.z})},calculateDeltaPosition:function(){var t=this.dolly,e=this.deltaPosition,o=this.previousPosition;return e.copy(t.position),e.sub(o),o.copy(t.position),e},addEventListeners:function(){var t=this.el.sceneEl,e=t.canvas;return e?(e.addEventListener("mousedown",this.onMouseDown.bind(this)),e.addEventListener("mousemove",this.onMouseMove.bind(this)),e.addEventListener("mouseup",this.releaseMouse.bind(this)),e.addEventListener("mouseout",this.releaseMouse.bind(this)),e.addEventListener("touchstart",this.onTouchStart.bind(this)),e.addEventListener("touchmove",this.onTouchMove.bind(this)),e.addEventListener("touchend",this.onTouchEnd.bind(this)),void this.__updateCursor()):void t.addEventListener("render-target-loaded",this.addEventListeners.bind(this))},removeEventListeners:function(){var t=this.el.sceneEl,e=t.canvas;e&&(e.removeEventListener("mousedown",this.onMouseDown.bind(this)),e.removeEventListener("mousemove",this.onMouseMove.bind(this)),e.removeEventListener("mouseup",this.releaseMouse.bind(this)),e.removeEventListener("mouseout",this.releaseMouse.bind(this)),e.removeEventListener("touchstart",this.onTouchStart.bind(this)),e.removeEventListener("touchmove",this.onTouchMove.bind(this)),e.removeEventListener("touchend",this.onTouchEnd.bind(this)))},onMouseMove:function(t){var e=Math.PI/2,o=this.pitchObject,n=this.yawObject,i=this.previousMouseEvent;if(this.mouseDown&&this.data.enabled){var s=t.movementX||t.mozMovementX,r=t.movementY||t.mozMovementY;void 0!==s&&void 0!==r||(s=t.screenX-i.screenX,r=t.screenY-i.screenY),this.previousMouseEvent=t,n.rotation.y+=.002*s,o.rotation.x+=.002*r,o.rotation.x=Math.max(-e,Math.min(e,o.rotation.x))}},onMouseDown:function(t){this.mouseDown=!0,this.previousMouseEvent=t,this.__updateCursor()},releaseMouse:function(){this.mouseDown=!1,this.__updateCursor()},onTouchStart:function(t){1===t.touches.length&&(this.touchStart={x:t.touches[0].pageX,y:t.touches[0].pageY},this.touchStarted=!0)},onTouchMove:function(t){var e=void 0,o=this.yawObject;this.touchStarted&&(e=2*Math.PI*(t.touches[0].pageX-this.touchStart.x)/this.el.sceneEl.canvas.clientWidth,o.rotation.y+=.5*e,this.touchStart={x:t.touches[0].pageX,y:t.touches[0].pageY})},onTouchEnd:function(){this.touchStarted=!1},__removeStylesheetRules:function(){this.__styleEl&&document.head.removeChild(this.__styleEl)},__addStylesheetRules:function(){this.__styleEl=document.createElement("style"),document.head.appendChild(this.__styleEl);var t=this.__styleEl.sheet;t.insertRule(".aframe-grab{cursor:-moz-grab;cursor:-webkit-grab;cursor:grab;}",t.cssRules.length),t.insertRule(".aframe-grabbing{cursor:-moz-grabbing;cursor:-webkit-grabbing;cursor:grabbing;}",t.cssRules.length)},__updateCursor:function(){var t=this.el.sceneEl.canvas;t&&(this.data.enabled?this.mouseDown?(t.classList.remove("aframe-grab"),t.classList.add("aframe-grabbing")):(t.classList.add("aframe-grab"),t.classList.remove("aframe-grabbing")):(t.classList.remove("aframe-grab"),t.classList.remove("aframe-grabbing")))}})}]);