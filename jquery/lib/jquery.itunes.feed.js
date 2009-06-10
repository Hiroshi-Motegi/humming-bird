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
	cex: {
		'Top Albums': 'トップアルバム',
		'Top Songs': 'トップソング',
		'New Releases': '最新リリース',
		'Just Added': '新規追加',
		'Featured Albums': '特集 & 限定'
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
	feed: function( feedType, params, callback ){
		
		callback = $.isFunction(params) ? params : callback || function(){};
		params = typeof feedType == 'object' ? feedType : params || {};
		feedType = typeof feedType == 'string' ? feedType : 'xml'; 
		
		var prms = $.extend({
			category:'topalbums',
			country:143462,
			limit:10,
			genre:0
		}, params);
		
		var op = {
			v: '1.0',
			num: '-1',
			output:feedType, //json, json_xml, xml
			//scoring:'h',
			q: 'http://ax.itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/' + 
				prms.category.toLowerCase() +
				'/sf=' + (function(c){
					return (+c == c) ? c : $.iTunes.countries[c.toLowerCase()] || $.iTunes.countries.japan;
				})(prms.country) +
				'/limit=' + prms.limit +
				'/genre=' + prms.genre + '/explicit=true/rss.xml'
		};
		
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
		
		/*
		function parseXMLfromString(xmlString){
			if (window.DOMParser) {
				return (new DOMParser()).parseFromString(xmlString, 'text/xml').documentElement;
			}
			else 
				if (window.ActiveXObject) {
					return (new ActiveXObject('Microsoft.XMLDOM')).loadXML(xmlString).documentElement;
				}
			return;
		}
		*/
		
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