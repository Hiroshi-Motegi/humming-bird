(function($){
$.fn.extend({
appendThumbNail: function(entry){
	return $(this).append($.yt.createThumbNail(entry));
}
});

$.extend({
youTube: function(options, callback){
	var opt = $.extend({
		'alt': 'json-in-script',
		'max-results': 10,
		'format':5,
		'orderby': 'relevance',
		'racy': 'exclude',
		'start-index': 1,
		'time': 'all_time',
		'vq': ''
	}, options);
	
	if (opt.vq) {
		$.get('http://gdata.youtube.com/feeds/api/videos', opt, function(data){
			if (data)
				callback.call(this, data.feed);
		},'jsonp');
	}
},
yt: {
	key: 'yt',
	currents: {
		'vq': '',
		'start-index': 1,
		'max-results': 24,
		'orderby':'relevance'
	},
	params:{
		'last-index': 0,
		'total-results': 0
	},
	changeThumbTable:function(callback){
		var $t = $('#yt-thumb-table-wrap');
		$.yt.createThumbTable(4, function(thumbTable){
			$t.append(thumbTable).children(':not(:last)').remove();
			$.yt.showThumbIndexInfo();
			if($.isFunction(callback))
				callback.call();
		});
	},
	showMovieInfo: function(data){
		for (var itm in data) 
			$('#movie-summary-' + itm).text(data[itm]);
		
		var pu = data.playerUrl.replace(/&feature=youtube_gdata/, '');
		
		$('#movie-summary-playerUrl')
			.empty()
			.append($('<a>')
				.attr({
					'href':pu + '&fmt=18',
					'rel':'external',
					'target':'_blank'
				}).text(pu));
	},
	showThumbIndexInfo: function(){
		var x = ['start-index', 'last-index', 'total-results'], sh = '#yt-thumb-';
		$(sh + x[0]).text($.yt.params[x[1]] > 0 ? $.yt.currents[x[0]] : 0);
		$(sh + x[1]).text($.yt.params[x[1]]);
		$(sh + x[2]).text($.yt.params[x[2]]);
	},
	createThumbTable: function(colNum, callback){
		
		$.youTube($.yt.currents, function(feed){
			var
			entries = feed.entry || [],
			elmKey = 'yt-thumb',
			$table = $('<table>').attr({
				'id': elmKey + '-table',
				'cellSpacing': '0'
			}),
			$tbody = $('<tbody>').appendTo($table),
			$tr;
			
			$.yt.params['total-results'] = feed.openSearch$totalResults.$t;
			$.yt.params['last-index'] = $.yt.currents['start-index'] + entries.length - 1;
			
			for (var i = 0, j = entries.length; i < j; i++) {
				if (i % colNum == 0) 
					$tr = $('<tr>').appendTo($tbody);
				
				$tr.append($('<td>').addClass(elmKey + '-outer').appendThumbNail(entries[i]));
			}
			
			if($.isFunction(callback))
				callback.call(this, $table);
		});
	},
	
	createThumbNail: function(entry){
		var mg = entry.media$group, key = $.yt.key;

		return $('<a>').addClass('yt-thumb-link').setData(key, {
			'author': entry.author[0].name.$t,
			'title': mg.media$title.$t,
			'contentUrl': mg.media$content ? mg.media$content[0].url.replace(/[\&\?]?f=videos&app=youtube_gdata/, '') : '',
			'content': mg.media$description.$t,
			'ratingAvg': entry.gd$rating == null ? 0 : entry.gd$rating.average + '/' + entry.gd$rating.numRaters + ' ratings',
			'playerUrl': mg.media$player[0].url || '',
			'published': entry.published.$t.replace(/^(\d{4})-(\d{2})-(\d{2}).*/, '$1/$2/$3'),
			'viewCount': (entry.yt$statistics == null ? 0 : entry.yt$statistics.viewCount) + ' views'
		}).append($('<img>').addClass('yt-thumb').attr({
			'src': mg.media$thumbnail[0].url,
			'title': entry.title.$t,
			'width': 120,
			'height': 90
		}).hover(function(){
			$(this).attr({'src': mg.media$thumbnail[1].url});
		},function(){
			$(this).attr({'src': mg.media$thumbnail[0].url});
		})).click(function(){
			var data = $.data(this, key);
			$.yt.showMovieInfo(data);
			
			if (data.contentUrl) {
				$.ytPlayer.get(data.contentUrl);
			}
			else {
				window.open(data.playerUrl + '&fmt=18');
			}
			return false;
		});
	}
}
});



/* -=-=-=- itunes -=-=-=-=- */
$.fn.extend({
myAccordion: function(options, callback){
	$.myAccordion($.extend(options, {wrap:'#' + $(this).attr('id')}), callback);
	return this;
},
appendiTunesNavi:function(options, callback){
	
	var
	op = options,
	iCategory = $.iTunes.categories,
	iGenre = $.iTunes.genre,
	iCex = $.iTunes.cex,
	$t = $(this);
	
	for (var c in iCategory) {
		
		var $cWrap = $('<div>')
			.addClass(op.cWrapClass)
			.append($('<a>').addClass(op.tglClass).text(c).attr('title', iCex[c]))
			.appendTo($t);
		
		var $gLst = $('<ul>').addClass(op.contClass).appendTo($cWrap);
		
		for (var g in iGenre) {
			$('<li>').append($('<a>')
				.addClass('genre')
				.text(g)
				.setData(op.key, {
					'category':iCategory[c],
					'genre': iGenre[g]
				})
				.click(function(e){
					var data = $(e.target).getData(op.key);
					$(e.target).currentOn('a.genre');
					$.changeiTunesRanking(data.category, data.genre);
				})).appendTo($gLst);
		}
	}
	
	if( $.isFunction(callback))
		callback.call(this);
	
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
			top: $.data(this, 'position').top,
			position: 'absolute'
		});
	});
},

setStatic:function(){
	return this.each(function(){
		$(this).css({
			top: 'auto',
			position: 'static'
		});
	});
},

setData:function(key, val){
	return this.each(function(indx, elm){
		$.data(elm, key, val);
	});
},
getData:function(key) {
	return $.data(this.get(0), key);
},

currentOn:function(cls){
	$(cls).removeClass('current');
	return this.addClass('current');
},
appendCountryItems: function(clsName){
	return this.append($.createCountryItem(clsName));
}
});




$.extend({
iTunes: {
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
	gFeed: function(params, callback){
	
		callback = $.isFunction(params) ? params : callback ||function(){};
		params = $.isFunction(params) ? {} : params ||{};
		
		var prms = $.extend({
			category: 'topalbms',
			sf: 143462,
			limit: 10,
			genre: 0,
			explicit: true
		}, params);
		
		var feed = new google.feeds.Feed('http://ax.itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/' +
			prms.category.toLowerCase() + 
			'/sf=' + prms.sf +
			'/limit=' + prms.limit +
			'/genre=' + prms.genre +
			'/explicit=' + prms.explicit +
			'/rss.xml');
		
		feed.setNumEntries(-1);
		feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
		
		feed.load(function(result){
			if (!result.error) {
				callback.call(this, result.feed);
			}
		});
	}
},



myAccordion: function(options, callback){
	
	var op = $.extend({
		contClass: '', //content className
		cWrapClass:'', //category wrapper className
		duration: 350,
		tglClass: '', // navigation className
		wrap:'' // navigation wrapper className
	}, options),
	dataKey = 'accordion',
	$tgl = $('.' + op.tglClass),
	$conts = $('.' + op.contClass),
	$cWrap = $('.' + op.cWrapClass);
	
	function isAnimated(){
		return $conts.is(':animated');
	}
	
	$conts.sameHeight().hide().filter(':first').show();
	$(op.wrap).height(($cWrap.eq(1).outerHeight() * ($cWrap.length - 1)) + $cWrap.eq(0).outerHeight());
	
	$cWrap
		.width($cWrap.width())
		.each(function(index, elm){
			$.data(elm, 'position', { 'top': $(elm).position().top });
		})
		.eq(0).setStatic()
		.nextAll().setAbsolute();
	
	$tgl
		.each(function(index, elm){
			
			var
			$t = $(elm),
			$c = $conts.eq(index),
			$sttcsTgt = $t.parent().prevAll().andSelf(),
			$notThis = $tgl.not($t),
			$nxts = $t.parent().nextAll();
			
			$.data(elm, dataKey, function(){
				if ( $c.is(':hidden') && !isAnimated() ) {
					$t.addClass('current');
					$sttcsTgt.setStatic();
					$conts.filter(':visible').slideUp(op.duration);
					$c.slideDown(op.duration, function(){
						$notThis.removeClass('current');
						$nxts.setAbsolute();
					});
				}
			});
	
		})
		.click(function(e){
			$.data(e.target, dataKey).call(e.target);
			return false;
		}).eq(0).addClass('current');
	
	if($.isFunction(callback))
		callback.call(this);
},


createiTunesRanking: function(options, callback){

	var $t = $('<div>');
	
	$.iTunes.gFeed(options, function(feed){
	
		var entries = feed.entries;
		
		$t.append('<h4 id=\'itunes-ranking-title\'>' + feed.title + '</h4>');
		
		function getNodes(xnd, nm, indx){
			return google.feeds.getElementsByTagNameNS(xnd, 'http://phobos.apple.com/rss/1.0/modules/itms/', nm)[indx];
		}
		
		for (var i = 0, j = entries.length; i < j; i++) {
		
			var entry = entries[i], eNode = entry.xmlNode, $eWrap = $('<div>').addClass('entry');
			var caNodes = getNodes(eNode, 'coverArt', 0), alnkNodes = getNodes(eNode, 'albumLink', 0);
			
			if (caNodes && caNodes.firstChild) {
				$('<a>').addClass('coverart').attr('href', alnkNodes.firstChild.nodeValue).append($('<img>').attr('src', caNodes.firstChild.nodeValue)).appendTo($eWrap);
			}
			
			var td = [], nds, eex;
			
			nds = getNodes(eNode, 'album', 0);
			if (nds && nds.firstChild) {
				var regx = /\s?-\s(?:EP|Single)|\s?\(Single\)/;
				eex = nds.firstChild.nodeValue;
				
				td.push('<th class=\'eLabel\'>Album </th><td><a class=\'keyword\'>' +
				(regx.test(eex) ? eex.replace(regx, '') + '</a>' + eex.match(regx) : eex + '</a>') +
				'</td>');
			}
			
			nds = getNodes(eNode, 'artist', 0);
			if (nds && nds.firstChild) {
				eex = nds.firstChild.nodeValue;
				td.push('<th class=\'eLabel\'>Artist </th><td>' + (/Various Artist/.test(eex) ? eex : '<a class=\'keyword\'>' + eex + '</a>') + '</td>');
			}
			
			nds = getNodes(eNode, 'rights', 0);
			if (nds && nds.firstChild) 
				td.push('<td class=\'c-rights\' colSpan=\'2\'>© ' + nds.firstChild.nodeValue + '</td>');
			
			$('<table>').attr({
				'cellSpacing': '0'
			}).append('<tbody><tr>' + td.join('</tr><tr>') + '</tr></tbody>').appendTo($eWrap);
			
			$t.append($eWrap.append($('<div>').addClass('clear')));
		}
		
		if ($.isFunction(callback)) 
			callback.call(this, $t);
		
	});
},
createCountryItem: function(cls){
	var cs = $.iTunes.countries, lst = [];
	
	for (var c in cs) 
		lst.push('<option class=\'' + cls + ' value=\'' + cs[c] + '\'>' + c + '</option>');
	
	return lst.join('');
},
changeiTunesRanking:function(category, genre, callback){
	var $t = $('#itunes-ranking');

	$.createiTunesRanking({
			'category': category,
			'genre': genre,
			'sf': $('#itunes-country option:selected').val(),
			'limit': $('#itunes-entry-count option:selected').val()
		},function(rankingElm){
			$t.append(rankingElm.css({'float':'left', 'width':$t.width()}));
			
			var $hdn = $t.children(':not(:last)');
			
			if($hdn.length){
				$hdn.each(function(){
					$(this).css({
						backgroundColor: '#333333',
						position: 'absolute',
						top: 0,
						left: 0
					}).animate({
						'top': $t.children(':last').height(),
						opacity: 0
					}, function(){
						$(this).remove();
					});
				});
			}
			
			$('a.keyword', rankingElm).click($.keywordClick);
			
			if($.isFunction(callback))
				callback.call();
	});
},
keywordClick:function(e){
	var kw = $(e.target).text();
	$.yt.currents.vq = kw;
	$('#search-text').val(kw);
	$.yt.currents['start-index'] = 1;
	$.yt.changeThumbTable();
	return false;
}
});

/* -=-=-=- swf object -=-=-=-=- */
$.ytPlayer = {
	get: function(url, options, params){
		/*
		hl:国
		autoplay:自動再生
		rel:関連動画
		egm:再生中でもオンマウスで関連動画を表示
		loop:ループ再生
		fs:全画面ボタンの表示
		fmt:quality 6 , 18, 22, 34, 35　…(効かないので無意味)
		color1,color2:色
		border:ボーダーの有無
		hd:HD再生 1=true
		*/
		
		var op = $.extend({
			allowScriptAccess: 'always',
			allowFullScreen: 'true',
			height: '385px',
			quality: 'high',
			width: '640px'
		}, options);
		
		var prms = $.extend({
			enablejsapi:1,
			playerapiid:'ytplayer',
			hl:'ja',
			rel:0,
			iv_load_policy:3,
			autoplay:1,
			hd:1//,
			//quality:'high'
		}, params);
		
		var urlPrms = [];
		for(var i in prms){
			if(prms.hasOwnProperty(i))
				urlPrms.push(i + '=' + prms[i]);
		}
		
		$.swf.get(url + '&' + urlPrms.join('&'), op);
	}
}

$.swf = {
	id:'movie-player',
	get: function(url, options){
		swfobject.embedSWF( url, $.swf.id, options.width.match(/\d+/), options.height.match(/\d+/), '8', null, null, options, { id: $.swf.id });
	},
	play: function(){
		var p = document.getElementById($.swf.id);
		if (p) p.playVideo();
	}
}
})(jQuery);







jQuery(function($){
if($.browser.mozilla)
	$('#movie-player-wrap').height($('#movie-player-wrap').height() + 1);

$('#itunes-country').appendCountryItems('county-item').children('option:last').attr('selected', true);


var
key = 'itunes',
elmKey = key + '-navi-list',
op = {
	'key': key,
	'elmKey': elmKey,
	cWrapClass: elmKey + '-category-wrap',
	tglClass: elmKey + '-category-tgl',
	contClass: elmKey + '-genre-list'
};

$('#top-content').slideUp(0);
$('#itunes-navi-list').appendiTunesNavi(op, function(){
	$(this).myAccordion(op, function(){
		var data = $('a.genre:first').currentOn('a.genre').getData(op.key);
		$.changeiTunesRanking(data.category, data.genre, function(){
			var kw = $('a.keyword:first').text();
			$.yt.currents.vq = kw;
			$('#search-text').val(kw);
			$.yt.currents['start-index'] = 1;
			
			$.yt.changeThumbTable(function(){
				$('a.yt-thumb-link:first').trigger('click');
				$('#top-content').slideDown(500);
			});
			
		});
	});
});



$('a.yt-prev').click(function(e){
	var c = $.yt.currents;
	if(c['start-index'] <= 1) return false;
	
	if (c.vq) {
		$.yt.currents['start-index'] = Math.max(c['start-index'] - c['max-results'], 1);
		$.yt.changeThumbTable();
	}
	return false;
});

$('a.yt-next').click(function(e){
	var
	c = $.yt.currents,
	p = $.yt.params;
	
	if(p['last-index'] >= p['total-results']) return false;
	
	if (c.vq) {
		$.yt.currents['start-index'] = Math.min(c['start-index'] + c['max-results'], p['total-results']);
		$.yt.changeThumbTable();
	}
	
	return false;
});


function searchInputFn(){
	var kw = $('#search-text').val();
	if (kw) {
		$.yt.currents.vq = kw;
		$.yt.currents['start-index'] = 1;
		$.yt.changeThumbTable();
	}
	return false;
}
$('#search-btn').click(searchInputFn);
$('#search-text').change(searchInputFn);


$('a.yt-order').click(function(){
	$.yt.currents.orderby = $(this).attr('rel');
	$(this).currentOn('a.yt-order');
	$.yt.changeThumbTable();
	return false;
});

$.setTitle('iTube β', '1.0');
});