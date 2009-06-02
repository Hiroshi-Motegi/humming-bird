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
	var rgb = $.getRGB(color);
	var n = 0;
	

	if (n = /^(\d+)%$/.exec(p)) { //example: '150%', '50%'
		n = parseInt(n[1]);
		for (var i = 0; i < rgb.length; i++) 
			rgb[i] = (rgb[i] / 100) * n;
	}
	else {
		if (+p == p) { //example: 10, -20, +30
			n = p;
		}
		else if (n = /^([\+-])=(\d+)$/.exec(p)) { //example: '+=20', '-=100'
			n = n[1] + n[2]; 
		}
		
		n = parseInt(n);
		
		for (var i = 0; i < rgb.length; i++)
			rgb[i] = rgb[i] + n;
	}
	
	
	for (var i = 0; i < rgb.length; i++)
		rgb[i] = Math.max(Math.min(parseInt(rgb[i]), 255), 0);
	
	return $.parseColorCode(rgb);
}
})(jQuery);
