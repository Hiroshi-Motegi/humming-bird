/*
 * jQuery plugin tweets
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 */

(function($){
$.tweets = function(name, params, callback){
	if($.isFunction(params)){
		 callback = params;
		 params = {};
	}
	
	if (params.since)
		params.since = encodeURIComponent(new Date(params.since));
	
	$.getJSON('http://twitter.com/status/user_timeline/' + name + '.json?&callback=?', params, callback);
}

$.twitterUserInfo = function(name, callback){
	$.getJSON('http://twitter.com/status/user_timeline/' + name + '.json?&callback=?',
		function(data){
			callback.call(this, data[0].user);
		});
}

$.twitterSeach = function(keyword, callback){
	$.getJSON('http://search.twitter.com/search.json?callback=?&q=' + keyword, callback);
}
})(jQuery);