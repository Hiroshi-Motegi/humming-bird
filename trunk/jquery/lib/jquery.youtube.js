/**
 * jQuery plugin - youTube
 * Copyright 2009, y@s
 * Released under the MIT and GPL licenses.
 * 
 * @Version    : 1.1
 * @LastUpdate : 2009-06-12
 */
;(function($){
/**
 * @Param format  : 1(mobile) , 5 , 6(mobile MP-4)
 * @Param orderby : updated(追加日), viewCount(再生回数), rating(評価), relevance(関連度), relevance_lang_jpn
 * @Param racy    : include or exclude → 制限つきビデオを検索結果に含めるか
 * @Param time    : all_time(すべての期間), today(本日), this_week(今週), this_month(今月)
 */
$.youTube = function(options, callback){
	var op = $.extend({
		'alt'         : 'json-in-script',
		'max-results' : 10,
		'format'      : 5,
		'orderby'     : 'relevance',
		'racy'        : 'include',
		'start-index' : 1,
		'time'        : 'all_time',
		'vq'          : ''
	}, options);
	
	if (op.vq) {
		$.get('http://gdata.youtube.com/feeds/api/videos', op, function(data){
			if (data)
				callback.call(this, data.feed);
		},'jsonp');
	}
}
})(jQuery);