/**
 * jQuery plugin Overlay
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author: y@s
 * Version:1.2
 * Update:2009-06-21
 * Demo:http://humming-bird.googlecode.com/svn/trunk/jquery/demo/overlay.demo.html
 */

(function($) {

function clickEvh(e){
	if (e.button == 0) {
		$.overlay.$layer.trigger(evKey);
		e.stopPropagation();
	}
	return false;
}

function keydownEvh(e){
	var keycode = (e == null) ? e.keyCode : e.which;
	if (keycode == 27 || keycode == 13) 
		$.overlay.$layer.trigger(evKey);
	return false;
}

function resizeEvh(){
	var ls = $.overlay.$layer.get(0).style;
	ls['display'] = 'none';
	ls['height'] = $(document).height() + 'px';
	ls['width'] = $(document).width() + 'px';
	ls['display'] = 'block';
}

var

ovCSS = {
	position: 'absolute',
	left: 0,
	top: 0,
	margin: 0,
	background:'none',
	backgroundColor:'#000'
},

animOpts = {
	opacity: 0.75,
	duration: 400,
	easing:'swing'
},

ovID = 'overlay',

evKey = 'overlay';

$.overlay = {
	
	$layer: null,
	
	create: function( options, callback ){
		
		if($.overlay.$layer) return;
		
		callback = $.isFunction(options) ? options : callback || function(){};
		options = options && typeof options == 'object' && !$.isFunction(options) ? options : {};
		
		var _n = 0;
		
		while(document.getElementById(ovID))
			ovID += _n++;
		
		$.overlay.$layer = $('<div>').attr('id', ovID).css($.extend(ovCSS, options.css || {}));
		
		callback.call(this);
	
	},
	
	show:function(options, callback){

		callback = $.isFunction(options) ? options : callback || function(){};
		options = options && typeof options == 'object' && !$.isFunction(options) ? options : {};
		
		var $doc = $(document);
		
		if($.overlay.$layer == null)
			$.overlay.create(options);
		
		if( $.browser.msie && $.browser.version<7 )
			$('embed,object,select').css('visibility', 'hidden');
		
		$(window).bind('resize', resizeEvh);
		$doc.bind('keydown', keydownEvh);
		
		$.overlay.$layer
			.css({
				height:$doc.height(),
				width:$doc.width(),
				opacity:0
			})
			.appendTo(document.body)
			.bind('click', clickEvh)
			.animate($.extend({opacity: 0.75}, options.animateParams || {}),
				$.extend(animOpts, {complete:callback}, options.animateOptions || {}));
	},
	
	hide:function(options, callback){

		callback = $.isFunction(options) ? options : callback || function(){};
		options = options && typeof options == 'object' && !$.isFunction(options) ? options : {};
		
		$(window).unbind('resize', resizeEvh);
		
		$.overlay.$layer
			.stop(true)
			.animate({opacity: 0}, $.extend(animOpts, {complete:function(){
				$(this).remove();
				if ($.browser.msie && $.browser.version < 7) 
					$('embed,object,select').css('visibility', 'visible');
				$(document).unbind('keydown', keydownEvh);
				callback.call(this);
			}}, options.animateOptions || {}));
	},
	
	bind:function(fn){
		if ($.overlay.$layer)
			$.overlay.$layer.bind(evKey, fn);
	}
}
})(jQuery);