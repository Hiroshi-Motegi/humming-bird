/**
 * jQuery plugin iTunesFeed
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * @Author    : y@s
 * @Version   : 1.4.1
 * @Published : 2009/06/00
 * @Update    : 2010/03/14
 * @Demo      : http://code.google.com/p/humming-bird/source/browse/trunk/jquery/demo/itunes.feed.demo.html
 */

(function($){
	$.iTunes = {
		/**
		 * @param {Object}   params   - query params
		 * @param {Function} callback - callback function
		 */
		feed: function(params, callback){
			var
			outputType = params.output = params.output.toLowerCase(),
			
			// make query params.
			op = (function(prms){
				var query = (function(qs){
					var ret = [], q;
					for (q in qs) {
						if (qs.hasOwnProperty(q)) 
							ret.push(q + '=' + qs[q]);
					}
					return ret.join('/');
				}({
					sf: prms.sf,
					limit: prms.limit,
					genre: prms.genre,
					explicit: prms.explicit
				}));
				
				return {
					v: '1.0',
					num: prms.limit || '-1', //-1 = all
					output: prms.output || 'json', //json, xml or json_xml
					q: 'http://ax.itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/' +
						prms.category.toLowerCase() + '/' + query + '/rss.xml'
				};
			}($.extend({
				//default query params
				category: 'topalbums',
				sf: 143462,
				limit: 10,
				genre: 0,
				explicit: true
			}, params)));
			
			
			function parseXMLfromString(xmlString){
				if (window.DOMParser) {
					var parser = new DOMParser();
					if ('async' in parser) 
						parser.async = false;
					
					var dom = parser.parseFromString(xmlString, 'text/xml');
					return dom.documentElement.firstChild;
				}
				else //IE
					if (window.ActiveXObject) {
						var xobj = new ActiveXObject('Microsoft.XMLDOM');
						xobj.async = false;
						xobj.loadXML(xmlString);
						return xobj.documentElement.firstChild;
					}
					else {
						return false;
					}
			}
			
			
			$.get('http://ajax.googleapis.com/ajax/services/feed/load?callback=?', op, function(result){
				if (result && result.responseStatus == 200) {
					var res = result.responseData;
					callback.call(this, {
						'json': outputType.match(/json/) ? res.feed : null,
						'xml': outputType.match(/xml/) ? parseXMLfromString(res.xmlString) : null
					});
				}
				else {
					return false;
				}
			}, 'json');
		},
		
		
		categories: {
			'Top Albums'     : 'topalbums',
			'Top Songs'      : 'topsongs',
			'New Releases'   : 'newreleases',
			'Just Added'     : 'justadded',
			'Featured Albums': 'featuredalbums'
		},
		
		
		genre: {
			'All'       :  0,
			'Blues'     :  2,
			'Country'   :  6,
			'Electronic':  7,
			'Folk'      : 10,
			'Jazz'      : 11,
			'New Age'   : 13,
			'Pop'       : 14,
			'R&B/Soul'  : 15,
			'Dance'     : 17,
			'HipHop/Rap': 18,
			'World'     : 19,
			'Rock'      : 21,
			'Vocal'     : 23,
			'Reggae'    : 24,
			'J-Pop'     : 27
			// etc ...
		},
		
		
		countries: {
			usa       : 143441,
			france    : 143442,
			germany   : 143443,
			uk        : 143444,
			italy     : 143450,
			canada    : 143455,
			australia : 143460,
			japan     : 143462
			// etc ...
		}
	}
})(jQuery);