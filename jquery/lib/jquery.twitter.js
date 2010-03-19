/**
 * jQuery plugin - twitter : tweets , userInfo , seach
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * @Author      : y@s
 * @Version     : 1.0
 * @LastUpdate  : 2009/06/12
 * @Demo        : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/twitter.html
 */

(function($){
$.twitter = {
	tweets: function(name, params, callback){
		if ($.isFunction(params)) {
			callback = params;
			params = {};
		}
		
		if (params.since) 
			params.since = encodeURIComponent(new Date(params.since));
		
		$.getJSON('http://twitter.com/status/user_timeline/' + name + '.json?callback=?', params, callback);
	},
	userInfo: function(name, callback){
		$.getJSON('http://twitter.com/status/user_timeline/' + name + '.json?callback=?', function(data){
			callback.call(this, data[0].user);
		});
	},
	seach: function(keyword, callback){
		$.getJSON('http://search.twitter.com/search.json?callback=?&q=' + keyword, callback);
	}
};
})(jQuery);