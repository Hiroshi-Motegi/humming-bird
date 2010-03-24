/**
 * jQuery plugin flickr - json feed
 * Copyright (C) 2010
 * Released under the MIT and GPL licenses.
 * 
 * @Author     : y@s
 * @Version    : 1.1
 * @Published  : -
 * @LastUpdate : 2010-03-24
 * @Demo       : http://code.google.com/p/humming-bird/source/browse/trunk/jquery/demo/flickr.demo.html
 * 
 * [Query string parameters]
 * id      : user ID
 * ids     : user ID's, delimiter - ","
 * tags    : filter the feed, delimiter - ","
 * tagmode : Control whether items must have ALL the tags,
 *           or ANY of the tags. Default is ALL.
 * format  : The format of the feed
 * lang    : The display language
 * 
 * [Res values]
 * title
 * link
 * items
 *  - title
 *  - link
 *  - author
 * 	- author_id
 *  - tags
 *  - date_taken
 *  - description
 *  - published
 *  - image*
 * 
 * [Size]
 * s  - w,h:75
 * t  - w,h:100
 * m  - w,h:240
 * d, - w,h:500
 * b  - w,h:1024
 */
(function($) {

function toQueryString(qs){
	var ret = [], q;
	for (q in qs) {
		if (qs.hasOwnProperty(q)) 
			ret.push(q + '=' + qs[q]);
	}
	return ret.join("&");
}

$.flickr = function(params, callback) {

	callback = $.isFunction(callback) ? callback : function(){};

	$.get("http://api.flickr.com/services/feeds/photos_public.gne?" +
		toQueryString($.extend({
			format       : "json",
			jsoncallback : "?"
		}, params)), function(res){
			
			var
			prefix = ["_s", "_t", "_m", "", "_b"],
			i      = res.items.length,
			item, m, j;
			
			
			while(i--){
				item = res.items[i];
				m    = item.media.m;
				j    = prefix.length;
				
				item.description = item.description.replace(/<\/?[^>]+>/g, "");
				
				while (j--)
					item["image" + prefix[j]] = m.replace("_m", prefix[j]);
				
				delete item.media.m;
			}
			
			callback.call(this, res);
			
		},"json");
};


/*past
$.flickr = function(options, callback){
	var opt = $.extend({
		tagmode : "any",
		format  : "json"
	}, options);
	
	$.get("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
		opt, callback, "json");
};
*/

})(jQuery);