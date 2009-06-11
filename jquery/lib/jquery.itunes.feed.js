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
	},
	feed: function( type, params, callback ){
		
		callback = $.isFunction(params) ? params : callback || function(){};
		params = typeof type == 'object' ? type : params || {};
		type = typeof type == 'string' ? type : 'json'; 
		
		var prms = $.extend({
			category:'topalbums',
			sf:143462,
			limit:10,
			genre:0,
			explicit:true
		}, params);
		
		var op = $.extend({
			v: '1.0',
			num: '-1',
			output: 'json', //json, json_xml, xml
			q: 'http://ax.itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/' + 
				prms.category.toLowerCase() + '/' +
				(function(p){
					var s = []; 
					for(var a in p){
						if(p.hasOwnProperty(a))
							s.push(a + '=' + p[a]);
					}
					return s.join('/');
				})(prms) + '/rss.xml'
				
		},{'output':type});
		
		function parseXMLfromString(xmlString){
			if (window.DOMParser) {
				var parser = new DOMParser();
				parser.async = false;
				var dom = parser.parseFromString(xmlString, 'text/xml');
				return dom.documentElement.firstChild;
			}
			else 
				if (window.ActiveXObject) {
					var xobj = new ActiveXObject('Microsoft.XMLDOM');
					xobj.async = false;
					xobj.loadXML( xmlString );
					return xobj.documentElement;
				}
			return;
		}
		
		$.get('http://ajax.googleapis.com/ajax/services/feed/load?callback=?', op,
			function(data){
				if (data && data.responseStatus == 200){
					switch(op.output){
						case 'json':
						callback.call(this, data.responseData.feed);
						break;
						case 'xml':
						callback.call(this, parseXMLfromString(data.responseData.xmlString));
						break;
						case 'json_xml':
						callback.call(this, {
							'feed':data.responseData.feed,
							'xml':parseXMLfromString(data.responseData.xmlString)
						});
						break;
						default:
							return false;
					}
				}else{
					return false;
				}
		},'json');
	}
}
})(jQuery);