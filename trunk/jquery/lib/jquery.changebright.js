/**
 * jQuery plugin - changeBright
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * Last Update  : 2010-04-18
 * Dependencies : jQuery Color Animations Ver.2
 */
;(function($){
$.changeBright = function( color, p ) {
	
	if (!color || color == 'transparent') return color;
	
	var rgb = $.getRGB(color),
	    n   = 0,
	    re;
	
	function toRGBString( rgb ){
		return 'rgb(' + [
				Math.max( Math.min( parseInt( rgb[0] ), 255), 0 ),
				Math.max( Math.min( parseInt( rgb[1] ), 255), 0 ),
				Math.max( Math.min( parseInt( rgb[2] ), 255), 0 )
			].join(',') + ')';
	}
	
	if ( re = /^(\d+)%$/.exec(p) ) { //example: '150%', '50%'
		n = re[1];
		return toRGBString([
			(rgb[0] / 100) * n,
			(rgb[1] / 100) * n,
			(rgb[2] / 100) * n
		]);
	}
	else {
		if ( +p == p ) { //example: '10', -20, +30
			n = p;
		}
		else 
			if ( re = /^([\+\-])=(\d+)$/.exec(p) ) { //example: '+=20', '-=100'
				n = re[1] + re[2];
			}
			else {
				return color;
			}
		
		n = parseInt(n);
		return toRGBString([rgb[0] + n, rgb[1] + n, rgb[2] + n]);
	}
}
})(jQuery);