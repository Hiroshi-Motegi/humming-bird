/*@cc_on
var doc = document;
eval('var document = doc');
@*/

var hb = {
	old_pde_selector:'.date-header', //post date element selector.
	insert_tgt_selector:'.post-title > a', //selector at target insert post date element. 
	arrMonth:['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],
	show_post_date:function(){
		try {
			$(hb.old_pde_selector).each(function(index, elm){
				var pDate = new Date($(elm).text());
				
				$( '<div class="post-date-wrap"><table class="post-date-table"><tbody>'+
					'<tr><td class="pd-day" rowSpan="2">' + pDate.getDate() + '</td>' +
					'<td class="pd-year">' + pDate.getFullYear() + '</td></tr>' +
					'<tr><td class="pd-month">' + hb.arrMonth[pDate.getMonth()] +'</td></tr>'+
					'</tbody></table></div>' )
					.insertBefore($(hb.insert_tgt_selector)[index]);
				
				$(elm).remove();
			});
			
		}catch(e){return false}
	},

	//using highslide add onclick attr
	add_hs_attr:function(){
		if(document.getElementById('Blog1') == null) return false;
		var isIE = (document.documentElement.getAttribute('style') == document.documentElement.style);
		
		var hsAncs = document.getElementById('Blog1').getElementsByTagName('a');
		
		for (var i = 0, len = hsAncs.length; i < len; i++) {
			if (hsAncs[i].className == 'highslide') {
				if (!hsAncs[i].getAttribute('onclick')) {
					isIE ? hsAncs[i].setAttribute('onclick', new Function('return hs.expand(this)')) : 
							 hsAncs[i].setAttribute('onclick','return hs.expand(this)');
				}
			}
		}
	},
	
	
	archive_selector:'.archivedate', //archive selector.
	archive_bgColor:'#333', //archive background color
	archive_bgColor_hover:'#1a1a1a', //archive background color hover
	archive_int:function(){
		hb.archive_bgColor = $(hb.archive_selector).css('background-color');
		
		$(hb.archive_selector).children('a')
		.css({
			textDecoration:'none',
			paddingLeft:'1em'
			})
		.hover(
			function(){
				$(this)
					.stop(true)
					.css({backgroundColor:hb.archive_bgColor_hover})
					.append('<span> ≫</span>')
					.animate({paddingLeft:'2em'},'fast');
			},
			function(){
				$(this).stop(true).children('span').remove();
				$(this)
					.css({backgroundColor:hb.archive_bgColor})
					.animate({paddingLeft:'1em'},'normal');
			});
	},
	
	
	thumb_selector:'img.mysite-thumb-img', //my site thumb image selector.
	siteThumb_init:function(){
		$(hb.thumb_selector)
			.css({'border':'1px solid #c0c0c0'})
			.fadeTo(0,0.4)
			.hover(
				function(){$(this).stop(true).fadeTo(300, 1.0)},
				function(){$(this).stop(true).fadeTo(400, 0.4)});
	},
	
	showDesc:function(){
		if($.captionSlide){$.captionSlide()}
	},
	
	windowOnloadattachEvent:function (evFn){
		if (window.addEventListener) {
			window.addEventListener('load', evFn, false);
		}
		else 
			if (window.attachEvent) {
				window.attachEvent('onload', evFn);
			}
	},

	init:function(){
		//Modify and show the post date.
		hb.show_post_date();
		
		//load prettyPrint.
		if($('pre.prettyprint').length > 0) prettyPrint();
		
		//add attr use to highslide.
		hb.add_hs_attr();
		
		//archive initialize and bind hover animate.
		hb.archive_int();
		
		//bind my site thumb animate.
		hb.siteThumb_init();
		
		hb.windowOnloadattachEvent(hb.showDesc);
	}
};

$(function(){
	$('div.post-body table').attr('cellSpacing','1');
	 hb.init();
});