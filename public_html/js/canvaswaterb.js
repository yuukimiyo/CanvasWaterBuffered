/*
* canvaswater.js 0.5 javascript library
*
* Copyright (c) 2012 Yuuki miyoshi
* Licensed under the MIT License:
* http://www.opensource.org/licenses/mit-license.php
*
* @author Yuuki miyoshi
* @version 0.5
* @url http://github.com/yuukimiyo/CanvasWater
* @github http://github.com/yuukimiyo/CanvasWater
*
*/

var BACKGROUND_COLOR = 'rgb(0, 77, 80)';
var RING_COLOR = 'rgb(255, 255, 255)';

var CANVAS_ID = "canvaswaterb";
var CANVASV_ID = "canvaswaterbv"
var WRAPPER_ID = "wrapper";

var ANIMATION_DELAY = "50";

var cm;
var cmv;
var am;

/**
 * constractor 
 */
function canvaswater() {
	cm = new CanvasManager();
	cmv = new CanvasManager();
	am = new AnimationManager();
}

/**
 * program loader. 
 */
onload = function(){
	if (!document.getElementById(CANVAS_ID)) { return false; }
	if (!document.getElementById(CANVASV_ID)) { return false; }
	if (!document.getElementById(WRAPPER_ID)) { return false; }
	
	var canvas = document.getElementById(CANVAS_ID);
	var canvasv = document.getElementById(CANVASV_ID);
	if (!canvas.getContext) { return false; }
	if (!canvasv.getContext) { return false; }
	
	cm.setContext(canvas.getContext('2d'));
	cm.setOffsetLeft($("#"+CANVAS_ID).offset()["left"]);
	cm.setOffsetTop($("#"+CANVAS_ID).offset()["top"]);
	cm.setWidth($("#"+WRAPPER_ID).width());
	cm.setHeight($("#"+WRAPPER_ID).height());
	
	cmv.setContext(canvasv.getContext('2d'));
	cmv.setOffsetLeft($("#"+CANVASV_ID).offset()["left"]);
	cmv.setOffsetTop($("#"+CANVASV_ID).offset()["top"]);
	cmv.setWidth($("#"+WRAPPER_ID).width());
	cmv.setHeight($("#"+WRAPPER_ID).height());

	cm.drawBackground();
	
	$(window).resize(function() {
		cm.setWidth($("#"+WRAPPER_ID).width());
		cm.setHeight($("#"+WRAPPER_ID).height());
		
		cmv.setWidth($("#"+WRAPPER_ID).width());
		cmv.setHeight($("#"+WRAPPER_ID).height());
		
		cm.drawBackground();
	});
	
	$("#"+CANVAS_ID).mousedown(function(e){
		cm.setMouseX(Math.floor(e.pageX - cm.getOffsetLeft()));
		cm.setMouseY(Math.floor(e.pageY - cm.getOffsetTop()));

		am.setCanvasManager(cm, cmv);
		am.start();
    });
}

function AnimationManager() {
	var _cm;
	var _cmv;
	var _r;
	
	this.setCanvasManager = function(c, cv) {
		_cm = c;
		_cmv = cv;
	}
	
	this.start = function() {
		_r = 10;
		this.motionLoop(_r);
	}
	
	this.motionLoop = function(_r) {
		_cm.clearCanvas();
		_cm.drawBackground();
		_cm.drawPointCircle(_cm.getMouseX(), _cm.getMouseY(), _r);

		if (_r < 1000) {
			_r = _r + 10;
			setTimeout(function(){am.motionLoop(_r);},ANIMATION_DELAY);
		}
	}
}

function CanvasManager(){
	var ctx;
	var mouseX = 0;
	var mouseY = 0;
	
	var offsetLeft = 0;
	var offsetTop = 0;
	var canvasWidth = 0;
	var canvasHeight = 0;
	
	var startRadius = 40;
	var radius = startRadius;
	
	/**
	 * context 's setter & getter
	 */
	this.setContext = function(c) {
		ctx = c;
	}
	
	/**
	 * offsetLeft 's setter & getter
	 */
	this.setOffsetLeft = function(l) {
		offsetLeft = l;
	}
	this.getOffsetLeft = function() {
		return offsetLeft;
	}
	
	/**
	 * offsetTop 's setter & getter
	 */
	this.setOffsetTop = function(t) {
		offsetTop = t;
	}
	this.getOffsetTop = function() {
		return offsetTop;
	}
	
	/**
	 * mouseX 's setter & getter
	 */
	this.setMouseX = function(x) {
		mouseX = x;
	}
	this.getMouseX = function() {
		return mouseX;
	}
	
	/**
	 * mouseY 's setter & getter
	 */
	this.setMouseY = function(y) {
		mouseY = y;
	}
	this.getMouseY = function() {
		return mouseY;
	}
	
	/**
	 * width 's setter
	 */
	this.setWidth = function(w) {
		canvasWidth = w;
		$("#"+CANVAS_ID).attr({width:canvasWidth});
	}
	
	/**
	 * height 's setter 
	 */
	this.setHeight = function(h) {
		canvasHeight = h;
		$("#"+CANVAS_ID).attr({height:canvasHeight});
	}
	
	/**
	 * fill background 
	 */
	this.drawBackground = function() {
		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.fillRect(offsetLeft, offsetTop, canvasWidth, canvasHeight);
		ctx.fill();
	}
	
	this.drawPointCircle = function(x,y,r) {
		var polygon = 200;
		
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		for (i = 0; i <= polygon; i++) {
			t=3.14*2*i/polygon;
			ctx.lineTo(Math.cos(t)*r+x, Math.sin(t)*r+y);
		}
		ctx.strokeStyle = RING_COLOR;
		ctx.stroke();
	}
	
	this.clearCanvas = function() {
		ctx.clearRect(offsetLeft, offsetTop, canvasWidth, canvasHeight);
		this.drawBackground();
	}
}

canvaswater();