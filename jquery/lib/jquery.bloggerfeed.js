/**
 * jQuery plugin - bloggerFeed
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 */
;(function($){
$.extend({
	/**
	 * @param {string}   domain   : blog domain
	 * @param {Object}   options  : query params
	 * @param {function} callback : callback function
	 */
	bloggerFeed: function(domain, options, callback){
		var opt = $.extend({
			'max-results' : 10,
			'redirect'    : false,
			'alt'         : 'json-in-script'
		}, options);
		
		callback = $.isFunction(options) ? options : callback || function(){};
		
		$.getJSON('http://' + domain +
			'.blogspot.com/feeds/posts/default?callback=?', opt,
			function(data){
				if (data) {
					callback.call(this, data.feed);
				}
			});
	}
});
})(jQuery);