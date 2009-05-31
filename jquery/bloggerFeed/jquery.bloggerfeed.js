/*
 * jQuery plugin bloggerFeed
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 */

(function($){$.extend({
	// domain : blog domain
	bloggerFeed: function(domain, options, callback){
		var opt = $.extend({
			'max-results': 10,
			'redirect': false,
			'alt': 'json-in-script'
		}, options);
		
		callback = $.isFunction(options) ? options : callback || function(){};
		
		$.getJSON('http://' + encodeURIComponent(domain) + '.blogspot.com/feeds/posts/default?callback=?', opt,
			function(data){
				if(data)
					callback.call(this, data.feed);
			});
	}
})})(jQuery);