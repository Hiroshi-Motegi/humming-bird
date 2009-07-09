/*@cc_on
var doc = document;
eval('var document = doc');
@*/

/* update:2009/07/05 */

(function($){
$.extend({
	captionSlideEffects: {
		// Caption Element vertical slide Down from Top.
		captionDown: function($wrap, $img, $caption, options){
			if (options.setBorder) {
				$caption.css({
					borderBottom: options.border
				})
			}
			//abusolute指定した後でtopを指定しないとfirefoxでtopの位置がおかしくなるので注意。
			$caption.css({
				top: -$caption.outerHeight() + 'px'
			});
			return {
				mOver: {
					top: 0
				},
				mOut: {
					top: -$caption.outerHeight() + 'px'
				}
			};
		}
	},
	
	captionSlide: function(options){
		var opt = $.extend({
			text: '論理的より感じるままに...   気ままなアウトプット',
			wrapID: 'captionSlideWrap',
			imgSelector: '#Header1_headerimg',
			duration: 250, // animate speed
			easing: 'swing', // animate easing
			effect: 'captionDown', // default slide animate
			
			//caption element styles
			color: '#FF6600', // text color
			fontSize: '14px',
			margin: '5px 10px',
			textAlign: 'center',
			bgColor: '#000', // background color
			bgImage: 'none', // background-image
			opacity: 0.8,
			height: 'original', //example 100% or pixel
			width: '100%', //example 100% or pixel
			setBorder: true,
			border: '1px solid #666'
		}, options);
		
		var
		$wrap = $(document.createElement('div')), //container element
		$img = $(opt.imgSelector), // first-child element
		$caption = $(document.createElement('div')), //second-child element
		$title = $(opt.titleSelector), $desc = $(document.createElement('p')),
		ez = {
			mOver: null,
			mOut: null
		};
		
		$wrap.attr('id', opt.wrapID).css({
			display: 'block',
			position: 'relative',
			top: 0,
			left: 0,
			margin: 0,
			padding: 0,
			overflow: 'hidden',
			backgroundColor: opt.bgColor,
			height: $img.outerHeight(),
			width: $img.outerWidth()
		});
		
		$img.css({
			position: 'absolute',
			top: 0,
			left: 0
		}).wrap($wrap);
		
		$caption.css({
			top: 0,
			left: 0,
			margin: 0,
			padding: 0,
			textAlign: opt.textAlign,
			backgroundColor: opt.bgColor,
			position: 'absolute',
			opacity: opt.opacity
		});
		
		//set caption element height
		if (opt.height.toLowerCase() != 'original') {
			$caption.css({
				height: opt.height
			});
		}
		
		//set caption element width
		if (opt.width.toLowerCase() != 'original') {
			$caption.css({
				width: opt.width
			});
		}
		
		//set caption element background-image
		if (opt.bgImage.match(/^.+\.(?:jpg|png|gif)$/)) {
			$caption.css({
				backgroundImage: 'url("' + opt.bgImage + '")'
			});
		}
		
		
		if (opt.color != 'original') {
			$desc.css({
				color: opt.color
			})
		}
		if (opt.fontSize != 'original') {
			$desc.css({
				fontSize: opt.fontSize
			})
		}
		
		$desc.css({
			padding: 0,
			display: 'inline-block',
			margin: opt.margin
		}).text(opt.text).appendTo($caption);
		
		
		$wrap = $('#' + opt.wrapID); //取得し直さないと正しく動作しない。
		$wrap.append($caption);
		
		var $anchor = $wrap.parent();
		while ($anchor.size() != 0) {
			if ($anchor.get(0).tagName.toLowerCase() == 'a') {
				break
			}
			$anchor = $anchor.parent();
		}
		if ($anchor.size() != 0) {
			$anchor.css({
				textDecoration: 'none'
			})
		}
		
		ez = $.captionSlideEffects[opt.effect]($wrap, $img, $caption, opt);
		
		$wrap.hover(function(){
			$caption.stop(true).animate(ez.mOver, {
				duration: opt.duration,
				easing: opt.easing
			});
		}, function(){
			$caption.stop(true).animate(ez.mOut, {
				duration: opt.duration,
				easing: opt.easing
			});
		});
	},
	
	//get my feed. using for recent posts.
	getMyFeed: function(options, domain, order, callback){
		var opt = $.extend({
			'max-results': 10,
			'redirect': false,
			'alt': 'json-in-script'
		}, options);
		
		$.ajax({
			dataType: 'jsonp',
			data: opt,
			cache: true,
			url: 'http://' + encodeURIComponent(domain) + '.blogspot.com/feeds/' + order + '/default',
			success: callback
		});
	},
	
	
	hb: {
		showPostDate: function(){
		
			var
			_oldDateElm = '.date-header', //post date element selector.
			_iTgt = '.post-title > a', //selector at target insert post date element.
			_month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
			
			try {
				$(_oldDateElm).each(function(index, elm){
					var _date = new Date($(elm).text());
					
					$('<div class="post-date-wrap"><table class="post-date-table"><tbody>' +
					'<tr><td class="pd-day" rowSpan="2">' +
					_date.getDate() +
					'</td>' +
					'<td class="pd-year">' +
					_date.getFullYear() +
					'</td></tr>' +
					'<tr><td class="pd-month">' +
					_month[_date.getMonth()] +
					'</td></tr>' +
					'</tbody></table></div>').insertBefore($(_iTgt)[index]);
					
					$(elm).remove();
				});
				
			} 
			catch (e) {
				return false
			}
		},
		
		//using highslide add onclick attr
		addHsAttr: function(){
		
			if (document.getElementById('Blog1') == null) 
				return false;
			var isIE = (document.documentElement.getAttribute('style') == document.documentElement.style);
			
			var hsAncs = document.getElementById('Blog1').getElementsByTagName('a');
			
			for (var i = 0, len = hsAncs.length; i < len; i++) {
				if (hsAncs[i].className == 'highslide') {
					if (!hsAncs[i].getAttribute('onclick')) {
						isIE ? hsAncs[i].setAttribute('onclick', new Function('return hs.expand(this)')) : hsAncs[i].setAttribute('onclick', 'return hs.expand(this)');
					}
				}
			}
			
		},
		
		
		archiveInt: function(){
			$('li.archivedate > a')
				.css({textDecoration: 'none', paddingLeft: '1em'})
				.hover(function(){
					$(this).stop(true).append('<span> ≫</span>')
						.animate({paddingLeft: '2em'}, 'fast');
				}, function(){
					$(this).stop(true).children('span').remove();
					$(this).animate({paddingLeft: '1em'}, 'normal');
			});
		},
		
		
		siteThumbInit: function(){
			$('img.mysite-thumb-img')
				.css({border: '1px solid #c0c0c0'})
				.fadeTo(0, 0.4)
				.hover(function(){
					$(this).stop(true).fadeTo(300, 1.0)
				}, function(){
					$(this).stop(true).fadeTo(400, 0.4)
			});
		},
		
		
		createRecentPosts: function(){
			$.getMyFeed({}, 'yas-hummingbird', 'posts', function(data){
			
				var entries = data.feed.entry, list = [];
				
				for (var i = 0; i < entries.length; i++) {
				
					var entry = entries[i];
					
					list.push('<span class="item-title"><a href="' +
					(function(links){
						for (var k = 0; k < links.length; k++) {
							if (links[k].rel == 'alternate') {
								return links[k].href;
							}
						}
						return '';
					})(entry.link || []) + '">' + entry.title.$t + '</a></span>');
					
				}
				
				$('#Feed99_feedItemListDisplay').html('<li>' + list.join('</li><li>') + '</li>');
				
			});
		}
	}

});
})(jQuery);


jQuery(function($){
	$('div.post-body table').attr('cellSpacing','1');
	
	//Modify and show the post date.
	$.hb.showPostDate();
	
	//load prettyPrint.
	if($('pre.prettyprint').length > 0) prettyPrint();
	
	//add attr use to highslide.
	$.hb.addHsAttr();
	
	//archive initialize and bind hover animate.
	$.hb.archiveInt();
	
	//bind my site thumb animate.
	$.hb.siteThumbInit();
	
	//create Recent Posts
	$.hb.createRecentPosts();
	
	// show Blog description Effect.
	$(window).load(function(){
		$.captionSlide();
	});
});