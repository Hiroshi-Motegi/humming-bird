/**
 * jQuery plugin Overlay
 * Copyright 2009 y@s
 * Version 1.1
 * Released under the MIT and GPL licenses.
 * 
 * demo http://humming-bird.googlecode.com/svn/trunk/jquery/demo/overlay.demo.html
 */

(function($) {
	
	function clickEvh(e){
		$.overlay.$ovLayer.trigger($.overlay.evName);
		e.stopPropagation();
		return false;
	}
	
	function keydownEvh(e){
		var keycode = (e == null) ? e.keyCode : e.which;
		if (keycode == 27 || keycode == 13) 
			$.overlay.$ovLayer.trigger($.overlay.evName);
		return false;
	}
	
	function resizeEvh(){
		$.overlay.$ovLayer
			.hide()
			.height($(document).height())
			.width($(document).width())
			.show();
	}
	
$.overlay = {
	evName: 'ovrly',
	$ovLayer: null,
	options:{
		id: 'overlay',
		bgColor: '#000000',
		bgImgUrl:'none',
		bgImgOption:'repeat',
		opacity: 0.75,
		duration: 400,
		easing:'swing'
	},
	
	
	create: function( options, callback ){
		
		if($.overlay.$ovLayer) return;
		
		callback = $.isFunction(options) ? options : callback || function(){};
		
		var
		op = $.extend($.overlay.options, options),
		tmpID = op.id,
		cnt = 0;
		
		while(document.getElementById(tmpID)){
			tmpID = op.id + cnt;
			cnt++;
		}
		
		if(tmpID != op.id)
			op.id = tmpID;
		
		if(op.bgImgUrl != 'none')
			op.bgImgUrl = 'url(\'' + op.bgImg + '\') ' + op.bgImgOption;
		
		$.overlay.$ovLayer = $('<div>')
			.attr('id', op.id)
			.css({
				position: 'absolute',
				left: 0,
				top: 0,
				margin: 0,
				backgroundImage:op.bgImg,
				backgroundColor: op.bgColor
			});
		
		callback.call(this);
	
	},
	
	
	show:function(options, callback){
		var op = $.extend($.overlay.options, options);
		
		if(!$.overlay.$ovLayer)
			$.overlay.create();
		
		callback = $.isFunction(options) ? options : callback || function(){};
		
		if( $.browser.msie && $.browser.version<7 )
			$('embed,object,select').css('visibility', 'hidden');
		
		$(window).bind('resize', resizeEvh);
		$(document).bind('keydown', keydownEvh);
		
		$.overlay.$ovLayer
			.width($(document).width())
			.height($(document).height())
			.appendTo(document.body)
			.fadeTo(0, 0)
			.bind('click', clickEvh)
			.animate({opacity: op.opacity},{
				duration: op.duration,
				easing: op.easing,
				complete: callback
			});
	},
	
	
	hide:function(options, callback){
		var op = $.extend($.overlay.options, options);
		callback = $.isFunction(options) ? options : (callback || function(){});
		
		$(window).unbind('resize', resizeEvh);
		
		$.overlay.$ovLayer
			.stop(true)
			.animate({opacity: 0},{
				duration: op.duration,
				easing: op.easing,
				complete: function(){
					$(this).remove();
					if ($.browser.msie && $.browser.version < 7) 
						$('embed, object, select').css('visibility', 'visible');
						$(document).unbind('keydown', keydownEvh);
					callback.call(this);
				}
			});
	},
	
	bind:function(fn){
		if ($.overlay.$ovLayer)
			$.overlay.$ovLayer.bind($.overlay.evName, fn);
	}
}
})(jQuery);