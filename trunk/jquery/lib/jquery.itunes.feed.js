/*
 * jQuery plugin iTunesFeed
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * demo http://code.google.com/p/humming-bird/source/browse/trunk/jquery/demo/itunes.feed.demo.html
 */

(function($){
$.iTunes = {
	categories: {
		Top_Albums: 'topalbums',
		Top_Songs: 'topsongs',
		New_Releases: 'newreleases',
		Just_Added: 'justadded',
		Featured_Albums: 'featuredalbums'
	},
	genre: {
		all: 0,
		country:6,
		electronic: 7,
		folk: 10,
		jazz:11,
		newAge: 13,
		pop: 14,
		rb_Soul: 15,
		dance:17,
		hiphop_Rap: 18,
		world: 19,
		rock: 21,
		vocal:23,
		reggae:24,
		jPop: 27
		// etc ...
	},
	feed: function( params, options, callback){
		var prms = $.extend({
			category:'topalbums',
			country:143462,
			limit:10,
			genre:0
		}, params);
		
		var countries = {
			usa: 143441,
			france: 143442,
			germany: 143443,
			uk: 143444,
			italy: 143450,
			canada:143455,
			australia: 143460,
			japan: 143462
		};
		
		prms.country = (function(c){
			return (+c == c) ? c : countries[c.toLowerCase()] || countries.japan;
		})(prms.country);
		
		callback = $.isFunction(options) ? options : callback || function(){};
		options = ( !options || $.isFunction(options) ) ? {} : options;
		options.q = 'http://ax.itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/' + 
			prms.category +
			'/sf=' + prms.country +
			'/limit=' + prms.limit +
			'/genre=' + prms.genre + '/rss.xml';
		
		$.gFeed(options, callback);
	}
}


$.gFeed = function(options, callback){
	var opt = $.extend({
		v: '1.0',
		num: 10
	}, options);
	
	if (opt.q) {
		$.getJSON('http://ajax.googleapis.com/ajax/services/feed/load?callback=?', opt, function(data){
			if (data) 
				callback.call(this, data.responseData.feed);
		});
	}
}
})(jQuery);