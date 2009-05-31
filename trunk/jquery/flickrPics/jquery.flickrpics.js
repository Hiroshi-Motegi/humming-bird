/*
 * jQuery plugin flickrPics
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 */

(function($){
$.flickrPics = function(options, callback){
	var opt = $.extend({
		tagmode:'any',
		format:'json'
	}, options);
	
	$.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?' , opt, callback);
}
})(jQuery);