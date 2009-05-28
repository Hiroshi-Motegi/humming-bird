/*
 * jQuery plugin overlay
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 */

(function($) {
$.overlay = {
	selector:'',
	options:{
		id: 'overlay',
		bgColor: '#000000',
		bgImgUrl:'none',
		bgImgOpt:'repeat',
		opacity: 0.75,
		duration: 400,
		easing:'swing',
		modal:true
	},
	show:function(options, callback){
		var
		opt = $.extend($.overlay.options, options),
		tmp_id = opt.id,
		cnt = 0;
		
		while(document.getElementById(tmp_id)){
			tmp_id = opt.id + cnt;
			cnt++;
		}
		
		if(tmp_id != opt.id) opt.id = tmp_id;
		$.overlay.selector = '#' + opt.id
		
		if(opt.bgImgUrl != 'none')
			opt.bgImgUrl = 'url(\'' + opt.bgImg + '\') ' + $.overlay.options.bgImgOpt;
		
		callback = $.isFunction(options) ? options : callback || function(){};
		
		if( $.browser.msie && $.browser.version<7 )
			$('embed,object,select').css('visibility', 'hidden');
		
		$(window).bind('resize', $.overlay.resize);
		
		$('<div>')
			.attr('id', opt.id)
			.width($(document).width())
			.height($(document).height())
			.css({
				position: 'absolute',
				left: 0,
				top: 0,
				margin: 0,
				backgroundImage:opt.bgImg,
				backgroundColor: opt.bgColor
			})
			.appendTo(document.body)
			.fadeTo(0, 0)
			.animate({opacity: opt.opacity},{
					duration: opt.duration,
					easing: opt.easing,
					complete: callback
				});
		
		$.overlay.bindEvents();
	},
	hide:function(options, callback){
		var opt = $.extend($.overlay.options, options);
		
		callback = $.isFunction(options) ? options : (callback || function(){});
		
		$(window).unbind('resize', $.overlay.resize);
		$.overlay.unbindEvents();
		
		$($.overlay.selector)
			.stop(true)
			.animate({opacity: 0},{
				duration: opt.duration,
				easing: opt.easing,
				complete: function(){
					$(this).remove();
					if ($.browser.msie && $.browser.version < 7) 
						$('embed, object, select').css('visibility', 'visible');
					callback.call(this);
				}
			});
	},
	resize:function(){
		$($.overlay.selector)
			.hide()
			.height($(document).height())
			.width($(document).width())
			.show();
	},
	bindEvents:function(){
		$($.overlay.selector).bind('click', $.overlay.clickEvh)
		$(document).bind('keydown', $.overlay.keydownEvh);
	},
	unbindEvents:function(){
		$(document).unbind('keydown', $.overlay.keydownEvh);
	},
	clickEvh:function(e){
		$.overlay.hide();
		e.stopPropagation();
		return false;
	},
	keydownEvh:function(e){
		var keycode = (e == null) ? e.keyCode : e.which;
		if (keycode == 27 || keycode == 13) { $.overlay.hide() }
		return false;
	}
}
})(jQuery);