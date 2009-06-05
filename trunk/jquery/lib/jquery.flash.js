/*
 * jQuery plugin Flash
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 
 * Dependencies:。
 * [ jQuery plugin changeBright ]
 *  
 * flash 初回コール時にデフォルトの色を記憶する仕様。
 * 理由はこのエフェクトはコール時の色に戻す動作のため、続けて複数回呼ばれるとデフォルトの色が変わってしまうため。
 */

(function($){
$.fn.flash = function(bright, attrs, options){
	options = (!$.isArray(bright) && typeof bright == 'object') ? bright :
		(!$.isArray(attrs) && typeof attrs == 'object') ? attrs : options || {};

	attrs = $.isArray(bright) ? bright : $.isArray(attrs) ? attrs : ['backgroundColor'];
	$.isArray(bright);
	
	bright = typeof bright == 'string' || +bright == bright ? bright : '+=40';

	var opt = $.extend({
		duration: 400,
		easing: 'swing',
		complete: function(){}
	}, options),
	dataKey = 'flash';
	
	return this.each(function(){
		var $t = $(this);

		if(!$.data(this, dataKey)){
			var tmp = {};
			
			$.each([
				'backgroundColor',
				'borderBottomColor',
				'borderLeftColor',
				'borderRightColor',
				'borderTopColor',
				'color',
				'outlineColor'],
				 function(i, attr){
					tmp[attr] = $t.css(attr);
				});
				
			$.data(this, dataKey,{'def_attrs': tmp});
		}
		
		var def_attrs = {}, hi_attrs = {};
		for (var i = 0; i < attrs.length;i++) {
			var key = attrs[i];
			def_attrs[key] = $.data(this, dataKey).def_attrs[key];
			hi_attrs[key] = $.changeBright(def_attrs[key], bright);
		}
		
		$t.css(hi_attrs).animate(def_attrs, opt);
	});
}
})(jQuery);