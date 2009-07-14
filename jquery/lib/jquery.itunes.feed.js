/*
 * jQuery plugin iTunesFeed
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * @Author:y@s
 * @Version:1.2
 * @Published:2009/06/00
 * @Update:2009/07/14
 * @Demo:http://code.google.com/p/humming-bird/source/browse/trunk/jquery/demo/itunes.feed.demo.html
 */

(function($){

var _defaultParams = {
	category:'topalbums',
	sf:143462,
	limit:10,
	genre:0,
	explicit:true
};


function createOptions (prms){
	return {
		v: '1.0',
		num: prms.limit || '-1',
		output: 'json', //json, json_xml, xml
		q: 'http://ax.itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/' + 
			prms.category.toLowerCase() +
			'/sf=' + prms.sf +
			'/limit=' + prms.limit +
			'/genre=' + prms.genre +
			'/explicit=' + prms.explicit + '/rss.xml'
	}
}

function parseXMLfromString(xmlString){
	if (window.DOMParser) {
		var parser = new DOMParser();
		if('async' in parser)
			parser.async = false;
		
		var dom = parser.parseFromString(xmlString, 'text/xml');
		return dom.documentElement.firstChild;
	}
	else 
		if (window.ActiveXObject) { //IE
			var xobj = new ActiveXObject('Microsoft.XMLDOM');
			xobj.async = false;
			xobj.loadXML(xmlString);
			return xobj.documentElement.firstChild;
		}
	return false;
}


$.iTunes = {
	feed: function( type, params, callback ){
		
		callback = $.isFunction(params) ? params : callback || function(){};
		params = typeof type == 'object' ? type : typeof params == 'object' && !$.isFunction(params) ? params : {};
		type = typeof type == 'string' ? type : 'json';
		
		var
		prms = $.extend({}, _defaultParams, params),
		op = $.extend(createOptions(prms),{output:type});
		
		$.get('http://ajax.googleapis.com/ajax/services/feed/load?callback=?', op,
			function(data){
				if (data && data.responseStatus == 200){
					
					callback.call(this, {
						'json' : /json/.test(op.output) ? data.responseData.feed : null,
						'xml' : /xml/.test(op.output) ? parseXMLfromString(data.responseData.xmlString) : null
					});
					
				}else{
					return false;
				}
		},'json');
	},
	categories: {
		'Top Albums': 'topalbums',
		'Top Songs': 'topsongs',
		'New Releases': 'newreleases',
		'Just Added': 'justadded',
		'Featured Albums': 'featuredalbums'
	},
	genre: {
		'All': 0,
		'Blues':2,
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
	countries: {
		usa: 143441,
		france: 143442,
		germany: 143443,
		uk: 143444,
		italy: 143450,
		canada:143455,
		australia: 143460,
		japan: 143462
	}
}
})(jQuery);