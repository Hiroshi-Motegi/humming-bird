/*
 * jQuery plugin iTunesFeed
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * demo:
 * http://code.google.com/p/humming-bird/source/browse/trunk/jquery/demo/itunes.feed.demo.html
 */

(function($){
$.iTunes = {
	categories: {
		'Top Albums': 'topalbums',
		'Top Songs': 'topsongs',
		'New Releases': 'newreleases',
		'Just Added': 'justadded',
		'Featured Albums': 'featuredalbums'
	},
	genre: {
		'All': 0,
		'Country':6,
		'Electronic': 7,
		'Folk': 10,
		'Jazz':11,
		'New Age': 13,
		'Pop': 14,
		'R&B/Soul': 15,
		'Dance':17,
		'HipHop/Rap': 18,
		'World': 19,
		'Rock': 21,
		'Vocal':23,
		'Reggae':24,
		'J-Pop': 27
		// etc ...
	},
	//genre exchanger
	gex: {
		0:'All',
		6:'Country',
		7:'Electronic',
		10:'Folk',
		11:'Jazz',
		13:'New Age',
		14:'Pop',
		15:'R&B/Soul',
		17:'Dance',
		18:'HipHop/Rap',
		19:'World',
		21:'Rock',
		23:'Vocal',
		24:'Reggae',
		27:'J-Pop'
	},
	countries: {
		usa: 143441,
		france: 143442,
		germany: 143443,
		uk: 143444,
		italy: 143450,
		canada:143455,
		australia: 143460,
		japan: 143462
	},
	feed: function( params, callback){
		var prms = $.extend({
			category:'topalbums',
			country:143462,
			limit:10,
			genre:0
		}, params);
		
		callback = $.isFunction(params) ? params : callback || function(){};
		
		var op = {
			num: '-1',
			scoring:'h',
			q: 'http://ax.itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/' + 
				prms.category.toLowerCase() +
				'/sf=' + (function(c){
					return (+c == c) ? c : $.iTunes.countries[c.toLowerCase()] || $.iTunes.countries.japan;
				})(prms.country) +
				'/limit=' + prms.limit +
				'/genre=' + prms.genre + '/rss.xml'
		}
		
		$.gFeed(op, callback);
	}
}


$.gFeed = function(options, callback){
	var op = $.extend({
		v: '1.0',
		num: 10
	}, options);
	
	if (op.q) {
		$.getJSON('http://ajax.googleapis.com/ajax/services/feed/load?callback=?', op, function(data){
			if (data)
				callback.call(this, data.responseData.feed);
		});
	}
}
})(jQuery);