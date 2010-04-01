/**
 * jQuery plugin Overlay
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author    :y@s
 * Version   :1.2
 * Published :2009-06-21
 * Update    :2010-04-02
 * Demo      :http://humming-bird.googlecode.com/svn/trunk/jquery/demo/overlay.demo.html
 */

(function($) {

function clickEventHandler(e){
	if (e.button == 0) {
		$.overlay.$layer.trigger(evKey);
		e.stopPropagation();
	}
	return false;
}

function keydownEventHandler(e){	
	var kc = e.keyCode;
	if (kc == 27 || kc == 13) {
		$.overlay.$layer.trigger(evKey);
		e.stopPropagation();
	}
	return false;
}

function windowResizeEventHandler(){
	
	var
	ls = $.overlay.$layer[0].style,
	styles = {
		'display': 'none',
		'height' : $doc.height() + 'px',
		'width'  : $doc.width() + 'px',
		'display': 'block'
	};
	
	for(var s in styles){
		ls[s] = styles[s];
	}

}


var
isOldIE = $.browser.msie && $.browser.version < 7,

$win = $(window),
$doc = $(document),

ovCSS = {
	background      : 'none',
	backgroundColor : '#000',
	borderWidth     : '0',
	display         : 'block',
	left            : '0',
	margin          : '0',
	overflow        : 'hidden',
	padding         : '0',
	position        : 'absolute',
	top             : '0',
	position        : 'fixed'
},

animOpts = {
	duration : 350,
	easing   : 'swing'
},

evKey,
ovID,
dataKey = evKey = ovID = 'overlay',


showEOS = isOldIE ? function(){
	$('embed,object,select').each(function(){
		var v = $.data(this, dataKey);
		if(v)
			this.style.visibility = v.oldVisibility;
	});
}:function(){},

hideEOS = isOldIE ? function(){
	$('embed,object,select').each(function(){
		$.data(this, dataKey,{
			'oldVisibility': $.css(this, 'visibility')
		});
	}).css('visibility', 'hidden');
}:function(){};


var Overlay = function(){};

Overlay.prototype = {
	
	$layer: null,
	
	create: function( options, callback ){
		
		callback = $.isFunction(options) ? options : callback || function(){};
		options = options && typeof options == 'object' && !$.isFunction(options) ? options : {};
		
		if (!this.$layer) {
			var n = 0,
				tmpID = ovID;
			
			while (document.getElementById(ovID)) 
				ovID = tmpID + n++;
			
			this.$layer = $(document.createElement('div')).attr('id', ovID).css($.extend({}, ovCSS, options.css || {}));
		}
		
		callback.call(this);
	},
	
	show:function(options, callback){

		callback = $.isFunction(options) ? options : callback || function(){};
		options = options && typeof options == 'object' && !$.isFunction(options) ? options : {};
		
		if (!this.$layer) {
			this.create(options);
		}
		
		//hide embed,object,select
		hideEOS();
		
		$win.bind('resize', windowResizeEventHandler);
		$doc.bind('keydown', keydownEventHandler);
		
		this.$layer
			.css({
				height:$doc.height(),
				width:$doc.width(),
				opacity:0
			})
			.appendTo(document.body)
			.bind('click', clickEventHandler)
			.animate($.extend({opacity: 0.75}, options.animateParams || {}),
				$.extend({}, animOpts, {complete:callback}, options.animateOptions || {}));
	},
	
	hide:function(options, callback){

		callback = $.isFunction(options) ? options : callback || function(){};
		options = options && typeof options == 'object' && !$.isFunction(options) ? options : {};
		
		$win.unbind('resize', windowResizeEventHandler);
		
		this.$layer
			.stop(true)
			.animate({
				opacity: 0
			}, $.extend({}, animOpts, {
				complete: function(){
					$(this).remove();
					//show embed,object,select
					showEOS();
					$(document).unbind('keydown', keydownEventHandler);
					callback.call(this);
				}
			}, options.animateOptions || {}));
	},
	
	bind:function(fn){
		if (this.$layer)
			this.$layer.bind(evKey, fn);
	}
};

$.overlay = new Overlay();
})(jQuery);