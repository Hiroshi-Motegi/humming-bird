/**
 * jQuery plugin flickrPics
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * Ref  : http://www.flickr.com/services/feeds/docs/photos_public/
 * Demo : http://code.google.com/p/humming-bird/source/browse/trunk/jquery/demo/flickr.demo.html
 */

(function($){
$.flickr = function(options, callback){
	var opt = $.extend({
		tagmode : "any",
		format  : "json"
	}, options);
	
	$.get("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
		opt, callback, "json");
}
})(jQuery);