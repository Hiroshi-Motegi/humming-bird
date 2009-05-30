/*
 * jQuery plugin gFeed
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * options
 * 	q, v, hl, key, context, num, scoring, output
 */

(function($){
	$.gFeed = function(options, callback){
		var opt = $.extend({
			v: '1.0',
			num: 10
		}, options);
		
		if (!opt.q) 
			return false;
		
		$.getJSON(
			'http://ajax.googleapis.com/ajax/services/feed/load?callback=?',
			opt,
			function(data){
				if (data) 
					callback.call(this, data.responseData.feed);
			});
	}
})(jQuery);
