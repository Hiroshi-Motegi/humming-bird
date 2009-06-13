(function($){
$.fn.extend({
createiTunesNavi:function(){
	
	var
	dataKey = 'itunes',
	elmKey = dataKey + '-navi',
	wrapID = elmKey + '-wrap',
	cWrapClass = elmKey + '-category-wrap',
	tglClass = elmKey + '-category-tgl',
	contClass = elmKey + '-genre-list',
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
			$('<li>').append($('<a>')
				.addClass('genre')
				.text(g)
				.setData(dataKey, {
					'category':iCategory[c],
					'genre': iGenre[g]
				})
				.click(function(e){
					$('a.genre.current').removeClass('current');
					$(e.target).blur().addClass('current');
					$.makeiTunesRankingList(
						$.data(e.target, dataKey).category,
						$.data(e.target, dataKey).genre);
				})).appendTo($gLst);
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
},

setData:function(key, val){
	return this.each(function(indx, elm){
		$.data(elm, key, val);
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
	$('#itunes-ranking').slideUp(function(){
		$.iTunes.gFeed({
			'category':category,
			sf:143441,//$('#itunes-country option:selected').val(),
			limit:10,//$('#itunes-entry-count option:selected').val(),
			'genre':genre
		}, function(feed){
		
			var
			entries = feed.entries,
			$wrap = $('<div>').append('<h4 id=\'itunes-title\'>' + feed.title + '</h4>');
			
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
					
					td.push('<th class=\'eLabel\'>Album </th><td><a class=\'keyword\'>' + 
						(regx.test(eex) ? eex.replace(regx, '') + '</a>' + eex.match(regx) :eex + '</a>') + '</td>');
				}
				
				nds = getNodes(eNode, 'artist', 0);
				if (nds) {
					eex = nds.firstChild.nodeValue;
					td.push('<th class=\'eLabel\'>Artist </th><td>' + (/Various Artist/.test(eex) ? eex : '<a class=\'keyword\'>' + eex + '</a>') + '</td>');
				}
				
				nds = getNodes(eNode, 'rights', 0);
				if (nds)
					td.push('<td class=\'c-rights\' colSpan=\'2\'>© ' + nds.firstChild.nodeValue + '</td>');
				
				$('<table>')
					.attr({'cellSpacing':'0'})
					.append('<tbody><tr>' + td.join('</tr><tr>') + '</tr></tbody>')
					.appendTo($eWrap);
				
				$wrap.append($eWrap.append($('<div>').addClass('clear')));
			}
			
			$('#itunes-ranking')
				.empty()
				.append(
					$wrap.contents(),
					$('<div>').addClass('clear'))
				.slideDown();
			
			$wrap.remove();
			$.bindKeywordClick();
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
			$.data(elm, 'posTop', $(elm).position().top);
		})
		.eq(0)
		.css({top:'auto',position:'static'})
		.nextAll()
		.setAbsolute();
	
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
			if ( $c.is(':hidden') && !isAnimated() ) {
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


$.bindKeywordClick = function(){
	$('a.keyword').click(function(e){
		$.createThumbTable($(e.target).text(), 9);
		return false;
	}).eq(0).trigger('click');
}

$.createThumbTable = function(keyword, maxResults){
	$.youTube({
		'vq': keyword,
		'max-results': maxResults
	}, function( feed ){
		var
		entries = feed.entry,
		tableID = 'youtube-thumb-table',
		$table = $('<table>').attr({'id':tableID,'cellSpacing':'0'}),
		$tbody = $('<tbody>').appendTo($table),
		$tr;
		
		for( var i = 0, j = entries.length ; i < j ; i++ ){
			if (i % 3 == 0) 
				$tr = $('<tr>').appendTo($tbody);
			
			$tr.append($.createThumbNail(entries[i]));
		}
		
		$('#' + tableID + '-wrap').empty().append($table, $('<div>').addClass('clear'));
	});
}

$.createThumbNail = function(entry){
	var mg = entry.media$group;
	
	return $('<td>')
		.addClass('thumb-wrap')
		.append($('<a>')
			.addClass('thumb-link')
			.setData('youtube',{
				'content': mg.media$content ? mg.media$content[0].url.replace(/&f=videos&app=youtube_gdata/, '') : '',
				'player' : mg.media$player[0].url || ''
			})
			.click(function(e){
				var c = $.data(this, 'youtube').content.replace(/&f=videos&app=youtube_gdata/, '') + '&hl=ja&fs=1&autoplay=1';
				if(c){
					$('#movie_player').attr('src', c);//&autoplay=1&fmt=6&fmt=18&fs=1'
				}else{
					window.open($.data(this, 'youtube').player);
				}
				return false;
			})
			.append($('<img>').attr({
				'src':mg.media$thumbnail[0].url,
				'title':entry.title.$t})));
}

$.addCountryItem = function(){
	var countries = $.iTunes.countries;
	for(var c in countries){
		$('#itunes-country').append(
			$('<option>').addClass('county-item').text(c).val(countries[c])
		).find(':last-child').select();
	}
}

})(jQuery);