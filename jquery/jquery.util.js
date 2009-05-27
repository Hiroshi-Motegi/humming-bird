$.fn.backgroundImage = function(src) {
  var bg = $.browser.msie && $.browser.version == 6 ?
    { filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+src+'")' } :
    { backgroundImage: 'url('+src+')' };
 
  return this.each(function() {
    $(this).css(bg);
  });
};

// extend browser
(function($) {
  $.extend($.browser, {
    iphone: $.browser.safari && /iphone/.test(userAgent),
    chrome: $.browser.safari && /chrome/.test(userAgent)
  });
})(jQuery);


// extend animate speed
(function($) {
  $.extend($.fx.speeds, {
    faster: 100,
	normal:450,
    slower: 1000
  })
})(jQuery);


// check exist parent node
(function($) {
$.extend({
	existParent: function(elm){
		elm = $(elm).get(0);
		return (!elm.parentNode || !elm.parentNode.tagName);
	}
});
})(jQuery);


// position absolute
(function($){

$.fn.extend({	
	positionAbsolute:function(){
		var posKeys = ['position', 'top', 'left',
			'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
			'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
		
		return this.each(function(){
			var $t = $(this);
			if ($.css(this, 'position') != 'absolute') {
				for(var i = 0; i < posKeys.length ; i++){
					if ( !$.data(this, 'old' + posKeys[i]) ) 
					$.data(this, 'old' + posKeys[i], $.css(this, posKeys[i])));
				}
				
				$t.css({
					top: $t.offset().top,
					left: $t.offset().left,
					margin: 0,
					position: 'absolute'
				});
			}
		});
	},
	positionOriginal:function(){
		return this.each(function(){
			var $t = $(this),
			posCss = {};
			if ($.css(this, 'position') == 'absolute') {
				for(var i = 0; i < posKeys.length;i++){
					var d = $.data(this, 'old' + posKeys[i]);
					if ( d ) posCss[posKeys[i]] = d;
				}
				$t.css(posCss);
			}
		});
	}
})
})(jQuery);





// Remove only own.
(function($) {
$.extend({	
	removeSelf:function(elms) {
		$.each(elms, function(i, elm) {
			$(elm).after($(elm).contents()).remove();
		});
	}
});

$.fn.extend({	
  removeSelf:function() {
    return $.removeSelf(this);
  }
});

})(jQuery);


// arrange height
(function($) {
$.fn.extend({	
  arrangeHeight:function() {
    var h = 0;
    return this.each(function() {
        h = Math.max($(this).height(), h);
      }).height(h);
  }
})
})(jQuery);

