/**
 * jQuery plugin Flash
 * Copyright 2009 y@s
 * Version 1.1
 * Released under the MIT and GPL licenses.
 * 
 * Dependencies:
 * 	- jQuery plugin changeBright
 * 	- jQuery plugin Color Animations ver.2
 * 
 * @Param bright  : '+=20', '40', '60%' など
 * @Param attr    : 'backgroundColor', 'borderColor', 'color'
 * @Param options : animate options
 * 
 * flash 初回コール時にデフォルトの色を記憶する仕様。
 * 理由はこのエフェクトはコール時の色に戻す動作のため、続けて複数回呼ばれるとデフォルトの色が変わってしまうため。
 */

(function($){
$.fn.flash = function(bright, attr, options){
	
	function isAttr(attr){
		var attrs = ['backgroundColor', 'borderColor', 'color'];
		for (var i= 0; i < attrs.length ; i++)
			if( attr == attrs[i] ) return true;
		return false;
	}
	
	options = bright && bright.constructor == Object ? bright : attr && attr.constructor == Object ? attr : options || {};
	attr = typeof bright === 'string' && isAttr(bright)? bright : attr && isAttr(attr) ? attr : 'backgroundColor';
	bright = typeof bright === 'string' && /^[-+]?\d%?$/.test(bright) || +bright == bright ? bright : '+=50';

	var
	op = $.extend({
		duration : 400,
		easing   : 'swing',
		complete : function(){}
	}, options),
	dataKey = 'flash';
	
	return this.each(function(){
		
		function toArray(attr){
			if (attr == 'borderColor') 
				return ['borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor'];
			
			return [attr];
		}
		
		var
		$t = $(this),
		attrs = toArray(attr);
		
		if( !$.data(this, dataKey) || !$.data(this, dataKey)[attrs[0]] ){
			
			var tmp = {};
			
			for(var i = 0, j = attrs.length; i < j; i++ ){
				var c = $t.css(attrs[i]);
				tmp[attrs[i]] = c == 'transparent' ? '#000' : c;
			}
			
			$.data(this, dataKey, tmp);
			
		}
		
		var
		def_attrs = {},
		hi_attrs  = {};
		
		for (var i = 0, j = attrs.length; i < j; i++) {
			var key = attrs[i];
			
			def_attrs[key] = $.data(this, dataKey)[key];
			hi_attrs[key]  = $.changeBright(def_attrs[key], bright);
		}
		
		$t.css(hi_attrs).animate(def_attrs, op);
		
	});
}
})(jQuery);