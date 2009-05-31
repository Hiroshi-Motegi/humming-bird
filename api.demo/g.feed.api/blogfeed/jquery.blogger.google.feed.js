(function($){
$.bloggerGoogleFeed = function(options, feedUrl){
	var opt = $.extend({
		targetID:'HTML99',
		numEntries:10,
		pubDate:true,
		author:false,
		delimiter:' - ',
		dateFormat: function (date) {
		    return (date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
		}
	}, options);
	
	feedUrl = typeof options === 'string' ? options : feedUrl || '';
	if(feedUrl.length == 0) return;
	
	var feed = new google.feeds.Feed(feedUrl);
	
	feed.setNumEntries(opt.numEntries);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	
	feed.load(function(result){
		if (!result.error) {
			var $ul = $('<ul>').attr('id', opt.targetID + '_feedItemListDisplay');
			
			for (var i = 0, j = result.feed.entries.length; i < j ; i++) {
				var entry = result.feed.entries[i];
				
				$('<li>')
					.html('<span class="item-title"><a href=' + entry.link + ' >' + entry.title + '</a></span>' + 
						(opt.pubDate ? '<span class="item-date">' + opt.delimiter + opt.dateFormat(new Date(entry.publishedDate)) + '</span>' : '') + 
						(opt.author ? '<span class="item-author">' + opt.delimiter + entry.author + '</span>' : ''))
					.appendTo($ul);
			}
			$('#' + opt.targetID + ' div.widget-content').append($ul);
		}
	});
}
})(jQuery);

google.load('feeds', '1', {'nocss' : true});

$(function(){
	$.bloggerGoogleFeed('http://googleblog.blogspot.com/feeds/posts/default?redirect=false');
});