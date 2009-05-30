/*
 * 
 * 
 */

(function($){
$.iTunes = {
	categories: {
		Top_Albums: 'topalbums',
		Top_Songs: 'topsongs',
		New_Releases: 'newreleases',
		Just_Added: 'justadded',
		Featured_Albums: 'featuredalbums',
		_default: 'topalbums'
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
	feed: function(category, country, limit, genre, params, callback){
		var countries = {
			usa: 143441,
			france: 143442,
			germany: 143443,
			uk: 143444,
			italy: 143450,
			canada:143455,
			australia: 143460,
			japan: 143462,
			// etc ...
			_default: 143462
		};
		
		params.q = 
			'http://ax.itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/' + 
			(category || categories._default) +
			('/sf=' + countries[country.toLowerCase()] || countries._default) +
			('/limit=' + (+limit == limit ? limit : 10)) +
			('/genre=' + (+genre == genre ? genre : 0)) + '/rss.xml';
		
		$.gFeed(params, callback);
	}
}
})(jQuery);
