/*
 * jQuery plugin changeBright
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * Dependencies:
 * [ jQuery Color Animations Ver.2 ]
 */

(function($){
$.changeBright = function(color, p) {
	
	if ( !color || color === 'transparent' ) return color;
	
	var rgb = $.getRGB(color), re, n = 0;
	
	if ( re = /^(\d+)%$/.exec( p ) ) { //example: '150%', '50%'
	
		n = re[1];
		
		return 'rgb(' + [
				Math.max( Math.min( parseInt( (rgb[0] / 100) * n ), 255), 0 ),
				Math.max( Math.min( parseInt( (rgb[1] / 100) * n ), 255), 0 ),
				Math.max( Math.min( parseInt( (rgb[2] / 100) * n ), 255), 0 )
			].join(',') + ')';

	}
	else {
		
		if (+p === p) { //example: '10', -20, +30
			n = p;
		}
		else 
			if ( re = /^([\+\-])=(\d+)$/.exec( p ) ) { //example: '+=20', '-=100'
				n = re[1] + re[2];
			}
			else {
				return color;
			}
		
		n = parseInt(n);
		
		return 'rgb(' + [
				Math.max( Math.min( rgb[0] + n, 255), 0 ),
				Math.max( Math.min( rgb[1] + n, 255), 0 ),
				Math.max( Math.min( rgb[2] + n, 255), 0 )
			].join(',') + ')';
	}

}
})(jQuery);
