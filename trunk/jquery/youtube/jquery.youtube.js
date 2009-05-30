/*
 * jQuery plugin youTube
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 */

(function($){
$.youTube = function(options, callback){
	var opt = $.extend({
		'vq': '',
		// updated, viewCount, rating, relevance, relevance_lang_jpn
		'orderby': 'relevance',
		'start-index': 1,
		// include or exclude
		'racy': 'exclude',
		'max-results': 10,
		 // all_time, today, this_week, this_month
		'time': 'all_time',
		'alt': 'json-in-script'
	}, options);
	
	if (!opt.vq)
		return false; 
	
	$.getJSON('http://gdata.youtube.com/feeds/api/videos?callback=?', opt, 
		function(data){
			if(data)
				callback.call(this, data.feed);
		});
}
})(jQuery);