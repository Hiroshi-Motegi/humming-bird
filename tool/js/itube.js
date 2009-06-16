(function($){
$.currents = {
	'vq': '',
	'start-index': 1,
	'max-results': 24,
	'orderby':'relevance'
};

$.fn.appendThumbTable = function(options, colNum){
	$.createThumbTable(this, options, colNum);
	return this;
}

$.createThumbTable = function(elm, options, colNum){
	
	var op = $.extend($.currents, options);
	
	$.youTube( op, function( feed ) {
		
		var
		entries = feed.entry || [],
		elmKey = 'yt-thumb',
		$table = $('<table>').attr({'id':elmKey + '-table', 'cellSpacing':'0'}),
		$tbody = $('<tbody>').appendTo($table),
		$tr;
		
		$.currents['total-results'] = feed.openSearch$totalResults.$t;
		$.currents['last-index'] = $.currents['start-index'] + entries.length -1;
		
		for( var i = 0, j = entries.length ; i < j ; i++ ){
			if (i % colNum == 0) 
				$tr = $('<tr>').appendTo($tbody);
			
			$tr.append($('<td>')
				.addClass(elmKey + '-outer')
				.appendThumbNail(entries[i]));
		}
		
		elm.append($table);
		$.showThumbResultsInfo();
		
	});
}

$.fn.appendThumbNail = function(entry){
	return $(this).append($.createThumbNail(entry));
}


$.createThumbNail = function(entry){
	var mg = entry.media$group;
	
//"投稿者　：" item.author[0].name.$t
//"投稿日　：" item.published.$t  replace(/^(\d{4})-(\d{2})-(\d{2}).*/, "$1年$2月$3日"))
//"再生回数：" item.yt$statistics == null) ? "0" : item.yt$statistics.viewCount
//"説明　　：" item.content.$t

	return $('<a>')
		.addClass('thumb-link')
		.setData('yt',{
			'author': entry.author[0].name.$t,
			// hl:国
			// autoplay:自動再生
			// rel:関連動画
			// fs:
			//fmt:quality 6 or 18
			//color1,color2:色
			// border:ボーダーの有無
			//hd:HD再生 1=true
			'title':entry.title.$t,
			'contentUrl': mg.media$content ? mg.media$content[0].url.replace(/&f=videos&app=youtube_gdata/, '') + '&hl=ja&fs=1&autoplay=1&rel=0&color1=0x1a1a1a&color2=0x333333&hd=1&fmt=18' : '',
			'content': entry.content.$t,
			'playerUrl' : mg.media$player[0].url || '',
			'published': entry.published.$t.replace(/^(\d{4})-(\d{2})-(\d{2}).*/, '$1年$2月$3日'),
			'viewCount' : (entry.yt$statistics == null ? 0 : entry.yt$statistics.viewCount) + ' views'
		})
		.click(function(e){
			var c = $.data(this, 'yt').contentUrl;
			
			$.showMovieInfo($.data(this, 'yt'));

			if(c){
				$('param[name=movie]').attr('value', c);
				$('#movie_player').attr('src', c);
			}else{
				window.open($.data(this,'yt').playerUrl,'');
			}
			return false;
		})
		.append($('<img>')
			.attr({
				'src':mg.media$thumbnail[0].url,
				'title':entry.title.$t
			}));
}

$.showMovieInfo = function(data){
	for(var itm in data)
		$('#movie-summary-' + itm).text(data[itm]);
}

$.showThumbResultsInfo = function(){
	$('#thumb-start-index').text($.currents['start-index']);
	$('#thumb-last-index').text($.currents['last-index']);
	$('#thumb-total-results').text($.currents['total-results']);
}

})(jQuery);




jQuery(function($){
	
$('#itunes-country').addCountryItem('county-item');
$('option.county-item:last').attr('selected', true);


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

$('#itunes-navi-list').appendiTunesNavi(op, function(){
	$(this).myAccordion(op, function(){
		$('a.genre:first').trigger('click');
	});
});





$('a.thumb-prev').click(function(e){
	if($.currents['start-index'] <= 1) return false;
	
	if ($.currents.vq) {
		$.currents['start-index'] = Math.max(parseInt($.currents['start-index']) - parseInt($.currents['max-results']), 1);
		$('#yt-thumb-table-wrap').empty().appendThumbTable({}, 4);
	}
	return false;
});

$('a.thumb-next').click(function(e){
	if(parseInt($.currents['last-index']) >= $.currents['total-results']) return false;
	
	if ($.currents.vq) {
		$.currents['start-index'] = Math.min(parseInt($.currents['start-index']) + parseInt($.currents['max-results']),
			parseInt($.currents['total-results']));
		
		$('#yt-thumb-table-wrap').empty().appendThumbTable({}, 4);
	}
	return false;
});




$('#search-btn').click(function(){
	var kw = $('#search-text').val();
	if (kw) {
		$.currents.vq = kw;
		$.currents['start-index'] = 1;
		$('#yt-thumb-table-wrap').empty().appendThumbTable({}, 4);
	}
	return false;
});

$('#search-text').change(function(){
	var kw = $(this).val();
	if (kw) {
		$.currents.vq = kw;
		$.currents['start-index'] = 1;
		$('#yt-thumb-table-wrap').empty().appendThumbTable({}, 4);
	}
	return false;
});


$('a.thumb-order').click(function(){
	$.currents.orderby = $(this).attr('rel');
	$('#yt-thumb-table-wrap').empty().appendThumbTable({}, 4);
});


/*
$('#itunes-ranking').bind('changeList', function(category, genre){
	console.log(category);
	$(this).slideUp(function(){
		$(this)
			.empty()
			.appendiTunesRanking(category, genre, function(){
				$('a.keyword').click(function(e){
					var kw = $(e.target).text();
					$.currents.vq = kw;
					$('#search-text').val(kw);
					$.currents['start-index'] = 1;
					$('#yt-thumb-table-wrap').empty().appendThumbTable({}, 4);
					return false;
				}).eq(0).trigger('click');
				
				$('#itunes-ranking')
					//.append($('<div>').addClass('clear'))
					.slideDown();	
		});
	});
});
*/


$.setTitle('iTube β', '1.0');
$.showLastModDate();
});