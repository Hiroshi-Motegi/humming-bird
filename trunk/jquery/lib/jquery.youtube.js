/*
 * jQuery plugin - youTube
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author : y@s
 * Version : 1.1
 * Update : 2009/06/12
 * 
 * @Param orderby : updated, viewCount, rating, relevance, relevance_lang_jpn
 * @Param racy : include or exclude
 * @Param time : all_time, today, this_week, this_month
 */

(function($){
$.youTube = function(options, callback){
	var op = $.extend({
		'vq': '',
		'orderby': 'relevance',
		'start-index': 1,
		'racy': 'exclude',
		'max-results': 10,
		'time': 'all_time',
		'alt': 'json-in-script'
	}, options);
	
	if (op.vq) {
		$.get('http://gdata.youtube.com/feeds/api/videos?callback=?', op, function(data){
			if (data) 
				callback.call(this, data.feed);
		},'json');
	}
}
})(jQuery);