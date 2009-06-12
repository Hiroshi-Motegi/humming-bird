(function($){
$.fn.extend({
createiTunesNavi:function(){
	
	var
	dataKey = $.iTunes.dataKey,
	elmKey = dataKey + '-navi',
	wrapID = elmKey + '-wrap',
	cWrapClass = elmKey + '-category-wrap',
	tglClass = elmKey + '-tgl',
	contClass = elmKey + '-list',
	iCategory = $.iTunes.categories,
	iGenre = $.iTunes.genre,
	$wrap = $('<div>').attr('id', wrapID);
	
	for (var c in iCategory) {
		
		var $cWrap = $('<div>')
			.addClass(cWrapClass)
			.append($('<a>').addClass(tglClass).text(c).attr('title',$.iTunes.cex[c]))
			.appendTo($wrap);
		
		var $gLst = $('<ul>').addClass(contClass).appendTo($cWrap);
		
		for (var g in iGenre) {
			var $a = $('<a>')
				.addClass('genre')
				.attr('href', 'javascript:void(0)')
				.text(g)
				.click(function(e){
					$('a.genre.current').removeClass('current');
					$(e.target).blur().addClass('current');
				});
			
			$.data($a.get(0), dataKey, {
				'category':iCategory[c],
				'genre': iGenre[g]
			});
			
			$('<li>').append($a).appendTo($gLst);
		}
	}
	
	$(this).eq(0).append($wrap);
	
	$.myAccordion({
		cont:'ul.' + contClass,
		cWrap:'div.' + cWrapClass,
		navi:'a.' + tglClass,
		wrap:'#' + wrapID
	});
	
	return this;
},

sameHeight: function(){
	var h = 0;
	return this.each(function(){
		h = Math.max(h, $(this).outerHeight());
	}).height(h);
},

setAbsolute:function(){
	return this.each(function(){
		$(this).css({
			top: $.data(this, 'posTop'),
			position: 'absolute'
		});
	});
}

});


$.iTunes = {
	dataKey: 'itunes',
	categories: {
		'Top Albums': 'topalbums',
		'Top Songs': 'topsongs',
		'New Releases': 'newreleases',
		'Just Added': 'justadded',
		'Featured Albums': 'featuredalbums'
	},
	genre: {
		'All': 0,
		'Blues': 2,
		'Country': 6,
		'Electronic': 7,
		'Folk': 10,
		'Jazz': 11,
		'New Age': 13,
		'Pop': 14,
		'R&B/Soul': 15,
		'Dance': 17,
		'HipHop/Rap': 18,
		'World': 19,
		'Rock': 21,
		'Vocal': 23,
		'Reggae': 24,
		'J-Pop': 27
		// etc ...
	},
	countries: {
		usa: 143441,
		france: 143442,
		germany: 143443,
		uk: 143444,
		italy: 143450,
		canada: 143455,
		australia: 143460,
		japan: 143462
	},
	//category exchanger
	cex: {
		'Top Albums': 'トップアルバム',
		'Top Songs': 'トップソング',
		'New Releases': '最新リリース',
		'Just Added': '新規追加',
		'Featured Albums': '特集 & 限定'
	},
	//genre exchanger
	gex: {
		0: 'All',
		6: 'Country',
		7: 'Electronic',
		10: 'Folk',
		11: 'Jazz',
		13: 'New Age',
		14: 'Pop',
		15: 'R&B/Soul',
		17: 'Dance',
		18: 'HipHop/Rap',
		19: 'World',
		21: 'Rock',
		23: 'Vocal',
		24: 'Reggae',
		27: 'J-Pop'
	},
	gFeed: function(params, callback){
	
		callback = $.isFunction(params) ? params : callback || function(){};
		params = $.isFunction(params) ? {} : params || {} ;
		
		var prms = $.extend({
			category: 'topalbms',
			sf: 143462,
			limit: 10,
			genre: 0,
			explicit: true
		}, params);
		
		var url = 'http://ax.itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/' +
		prms.category.toLowerCase() +
		'/sf=' +
		prms.sf +
		'/limit=' +
		prms.limit +
		'/genre=' +
		prms.genre +
		'/explicit=' +
		prms.explicit +
		'/rss.xml';
		
		var feed = new google.feeds.Feed(url);
		
		feed.setNumEntries(-1);
		feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
		feed.load(function(result){
			if (!result.error) {
				callback.call(this, result.feed);
			}
		});
	}
};


$.makeiTunesRankingList = function(category, genre){
	$('#itunes-feed-list').slideUp(function(){
		$.iTunes.gFeed({
			'category':category,
			sf: 143462,
			limit: 10,
			'genre':genre
		}, function(feed){
			
			var
			entries = feed.entries,
			$wrap = $('<div>').append('<h4 id=\'itunes-feed-title\'>' + feed.title + '</h4>');
			
			function getNodes (xnd, nm, indx){
				return google.feeds.getElementsByTagNameNS(xnd, 'http://phobos.apple.com/rss/1.0/modules/itms/', nm)[indx];
			}
			
			for ( var i = 0, j = entries.length ; i < j ; i++ ) {
				
				var
				entry = entries[i],
				eNode = entry.xmlNode,
				$eWrap = $('<div>').addClass('entry');
				
				var
				caNodes = getNodes(eNode,'coverArt', 0);
				alnkNodes = getNodes(eNode,'albumLink', 0);
				if (caNodes != null) {
					$('<a>')
						.addClass('coverart')
						.attr('href', alnkNodes.firstChild.nodeValue)
						.append($('<img>').attr('src', caNodes.firstChild.nodeValue))
						.appendTo($eWrap);
				}
				
				var td = [], nds, eex;
				
				nds = getNodes(eNode, 'album', 0);
				if (nds) {
					var regx = /\s?-\s(?:EP|Single)|\s?\(Single\)/;
					eex = nds.firstChild.nodeValue;
					
					td.push('<th class=\'eLabel\'>Album </th><td><a>' + 
						(regx.test(eex) ? eex.replace(regx, '') + '</a>' + eex.match(regx) :eex + '</a>') + '</td>');
				}
				
				nds = getNodes(eNode, 'artist', 0);
				if (nds) {
					eex = nds.firstChild.nodeValue;
					td.push('<th class=\'eLabel\'>Artist </th><td>' + (/Various Artist/.test(eex) ? eex : '<a>' + eex + '</a>') + '</td>');
				}
				
				nds = getNodes(eNode, 'rights', 0);
				if (nds)
					td.push('<td class=\'c-rights\' colSpan=\'2\'>© ' + nds.firstChild.nodeValue + '</td>');
				
				$('<table>').append('<tbody><tr>' + td.join('</tr><tr>') + '</tr></tbody>').appendTo($eWrap);
				$wrap.append($eWrap.append($('<div>').addClass('clear')));
			}
			
			$('#itunes-feed-list').empty().append($wrap.contents()).slideDown();
			$wrap.remove();
		});
	});
}


$.myAccordion = function(options){
	var op = $.extend({
		cont: '', //content selector
		cWrap:'', //category wrapper selector
		duration: 350,
		navi: '', // navigation selector
		wrap:'' // navigation wrapper selector
	}, options),
	dataKey = 'accordion',
	$navi = $(op.navi),
	$conts = $(op.cont),
	$cWrap = $(op.cWrap);
	
	function isAnimated(){
		return $conts.is(':animated');
	}
	
	$conts.sameHeight().hide().filter(':first').show();
	$(op.wrap).height(($cWrap.eq(1).outerHeight() * ($cWrap.length - 1)) + $cWrap.eq(0).outerHeight());
	
	$cWrap
		.width($cWrap.width())
		.each(function(index,elm){
			$.data(elm,'posTop',$(elm).position().top);
		})
		.eq(0).css({top:'auto',position:'static'})
		.nextAll().setAbsolute();
	
	$navi
	.eq(0).addClass('current')
	.end().each(function(index, elm){
		var
		$t = $(elm),
		$c = $conts.eq($navi.index($t)),
		$sttcsTgt = $t.parent().prevAll().andSelf(),
		$notThisNavis = $navi.not($t),
		$nxts = $t.parent().nextAll();
		
		$.data(elm, dataKey, function(){
			if ($c.is(':hidden') && !isAnimated()) {
				$t.addClass('current');
				$sttcsTgt.css({top:'auto',position:'static'});
				$conts.filter(':visible').slideUp(op.duration);
				$c.slideDown(op.duration,function(){
					$notThisNavis.removeClass('current');
					$nxts.setAbsolute();
				});
			}
		});
	})
	.click(function(e){
		$.data(e.target, dataKey).call(e.target);
		return false;
	});
}

})(jQuery);