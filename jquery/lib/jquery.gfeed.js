/**
 * jQuery plugin gFeed
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author:y@s
 * Version:1.0.1
 * Published:2009-05-30
 * Update:2009-07-13
 * Reference:http://code.google.com/intl/ja/apis/ajaxfeeds/documentation/reference.html#_intro_fonje
 * Demo:http://code.google.com/p/humming-bird/source/browse/trunk/jquery/demo/gfeed.demo.html
 */

(function($){
//@param options{object} - q, v, hl, key, context, num, scoring, output 
//@param callback{function} - callback function
$.gFeed = function(options, callback){
	var opt = $.extend({
		v: '1.0',
		num: 10
	}, options);
	
	if (opt.q) {
		$.get('http://ajax.googleapis.com/ajax/services/feed/load?callback=?', opt, function(data){
			if (data) 
				callback.call(this, data.responseData.feed);
		}, 'json');
	}
}
})(jQuery);
