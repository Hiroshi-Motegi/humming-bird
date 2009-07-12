/**
 * jQuery plugin Overlay
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author:y@s
 * Version:1.2
 * Published:2009-06-21
 * Update:2009-07-12
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
	var ls = $.overlay.$layer[0].style;
	ls['display'] = 'none';
	ls['height'] = $doc.height() + 'px';
	ls['width'] = $doc.width() + 'px';
	ls['display'] = 'block';
}

$.fn.extend({
eosShow:function(){
	return this.each(function(){
		var v = $.data(this, dataKey);
		if(v)
			this.style.visibility = v.oldVisibility;
	});
},
eosHide:function(){
	return this.each(function(){
		$.data(this, dataKey,{'oldVisibility': $.css(this,'visibility')});
	}).css('visibility', 'hidden');
}
});



var
isOldIE = $.browser.msie && $.browser.version < 7,

$win = $(window),
$doc = $(document),

ovCSS = {
	background:'none',
	backgroundColor:'#000',
	left: 0,
	margin: 0,
	padding: 0,
	position: 'absolute',
	top: 0
},

animOpts = {
	duration: 350,
	easing:'swing'
},

dataKey = evKey = ovID = 'overlay';


$.overlay = {
	
	$layer: null,
	
	create: function( options, callback ){
		
		callback = $.isFunction(options) ? options : callback || function(){};
		options = options && typeof options == 'object' && !$.isFunction(options) ? options : {};
		
		if (!this.$layer) {
			var n = 0, tmpID = ovID;
			
			while (document.getElementById(ovID)) 
				ovID = tmpID + n++;
			
			this.$layer = $(document.createElement('div')).attr('id', ovID).css($.extend({}, ovCSS, options.css || {}));
		}
		
		callback.call(this);
	},
	
	show:function(options, callback){

		callback = $.isFunction(options) ? options : callback || function(){};
		options = options && typeof options == 'object' && !$.isFunction(options) ? options : {};
		
		if(!this.$layer)
			this.create(options);
		
		if(isOldIE)
			$('embed,object,select').eosHide();
		
		$win.bind('resize', resizeEvh);
		$doc.bind('keydown', keydownEvh);
		
		this.$layer
			.css({
				height:$doc.height(),
				width:$doc.width(),
				opacity:0
			})
			.appendTo(document.body)
			.bind('click', clickEvh)
			.animate($.extend({opacity: 0.75}, options.animateParams || {}),
				$.extend({}, animOpts, {complete:callback}, options.animateOptions || {}));
	},
	
	hide:function(options, callback){

		callback = $.isFunction(options) ? options : callback || function(){};
		options = options && typeof options == 'object' && !$.isFunction(options) ? options : {};
		
		$win.unbind('resize', resizeEvh);
		
		this.$layer
			.stop(true)
			.animate({opacity: 0}, $.extend({}, animOpts, {complete:function(){
				$(this).remove();
				if (isOldIE)
					$('embed,object,select').eosShow();
				
				$(document).unbind('keydown', keydownEvh);
				callback.call(this);
			}}, options.animateOptions || {}));
	},
	
	bind:function(fn){
		if (this.$layer)
			this.$layer.bind(evKey, fn);
	}
}
})(jQuery);