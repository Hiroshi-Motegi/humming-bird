/*@cc_on 
var doc = document;
eval('var document = doc');
@*/

google.load('feeds', '1', {'nocss' : true});

function bloggerGoogleFeed (options, feedUrl){

	function extend(a, b){
		for (var x in b) 
			a[x] = b[x];
		return a;
	}

	var opt = extend({
		targetID: 'HTML99',
		numEntries: 10,
		pubDate: true,
		author: false,
		delimiter: ' - ',
		dateFormat: function(date){
			return (date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
		}
	}, options);

	var tgt = document.getElementById(opt.targetID).firstChild;
	while(tgt){
		if(tgt.className == 'widget-content') break;
		tgt = tgt.nextSibling;
	}
	if(!tgt || tgt.className != 'widget-content') return;
	
	feedUrl = typeof options === 'string' ? options : feedUrl || '';
	
	if(!feedUrl.length) return; 
	
	var feed = new google.feeds.Feed(feedUrl);
	feed.setNumEntries(opt.numEntries);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	
	feed.load(function(result){
		if (!result.error) {
			var ul = document.createElement('ul');
			ul.id = opt.targetID + '_feedItemListDisplay';
			
			function cNode(cn, txt){
				var span = document.createElement('span');
					span.className = cn;
					span.appendChild(document.createTextNode(opt.delimiter + txt));
					return span;
			}

			for (var i = 0; i < result.feed.entries.length; i++) {
				var
				entry = result.feed.entries[i],
				li = document.createElement('li'),
				spanTitle = document.createElement('span'),
				anc = document.createElement('a');
				
				anc.setAttribute('href', entry.link);
				anc.appendChild(document.createTextNode(entry.title));

				spanTitle.className = 'item-title';
				spanTitle.appendChild(anc);			
				li.appendChild(spanTitle);

				if (opt.pubDate)
					li.appendChild(cNode('item-date', opt.dateFormat(new Date(entry.publishedDate))));
				
				if (opt.author)
					li.appendChild(cNode('item-author', entry.author));
				
				ul.appendChild(li);
			}
			tgt.appendChild(ul);
		}
	});
}

(function(fn){
	if (window.addEventListener) {window.addEventListener('load', fn, false)}
	else if (window.attachEvent) {window.attachEvent('onload', fn)}
})(function(){
	bloggerGoogleFeed('http://yas-hummingbird.blogspot.com/feeds/posts/default?redirect=false');
});