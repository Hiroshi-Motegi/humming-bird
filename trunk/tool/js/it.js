(function($){
$.fn.extend({
appendiTunesRanking: function(options, callback){
	$.createiTunesRanking(this, options, callback);
	return this;
},
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
					$(e.target).currentOn('a.genre');
					var data = $(e.target).getData(op.key);
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
addCountryItem: function(clsName){
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
		.eq(0)
		.setStatic()
		.nextAll()
		.setAbsolute();
	
	$tgl
		.eq(0)
		.addClass('current')
		.end()
		.each(function(index, elm){
			
			var
			$t = $(elm),
			$c = $conts.eq($tgl.index($t)),
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
		});
	
	if($.isFunction(callback))
		callback.call(this);
},


createiTunesRanking: function(elm, options, callback){

	//var $t = $(elm);
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
changeiTunesRanking:function(category, genre){
	var $t = $('#itunes-ranking');
	$t.appendiTunesRanking({
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
			
			$('a.keyword', rankingElm).click(function(e){
				var kw = $(e.target).text();
				$.yt.currents.vq = kw;
				$('#search-text').val(kw);
				$.yt.currents['start-index'] = 1;
				$.yt.changeThumbTable();
				return false;
			}).eq(0).trigger('click');
	});
}
})
})(jQuery);
