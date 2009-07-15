(function($) {
	
var _isOldIE = $.browser.msie && $.browser.version == 6;

// extend browser
$.extend($.browser, {
	iphone: $.browser.safari && /iphone/.test(userAgent),
	chrome: $.browser.safari && /chrome/.test(userAgent)
});

// extend animate speed
$.extend($.fx.speeds, {
	faster: 100,
	normal:450,
	slower: 1000
});


$.extend({
	// check exist parent node
	existParent: function(elm){
		//elm = 'length' in elm ? elm.get(0) : elm;
		elm = 'length' in elm ? elm[0] : 'tagName' in elm ? elm : null;
		return elm ? (!elm.parentNode || !elm.parentNode.tagName) : false;
	},
	
	// Remove only own.
	removeSelf:function(elms) {
		$.each(elms, function(i, elm) {
			$(elm).after($(elm).contents()).remove();
		});
	},
	
	// Merge Objects.
	merge:function(){

		var
		args = Array.prototype.slice.call(arguments),
		len = args.length,
		ret = args[0],
		itm;
		
		for( var i = 1; i < len ; i++ ){
			var arg = args[i];
			for (itm in arg) {
				if (arg.hasOwnProperty(itm))
					ret[itm] = arg[itm];
			}
		}
		
		return ret;

	},
	
	// make Query String
	toQueryString: function(o){
		var ret = [];
		for(i in o){
			if( o.hasOwnProperty(i) )
				ret.push( i + '=' + encodeURIComponent(o[i]) );
		}
		return ret.join('&');
	},
	
	alphaImage: function(src, sizingMethod){
		//sizingMethod = crop or image or scale
		return _isOldIE ? {
				filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=' + 
					(sizingMethod || 'image') + ' src="' + src + '")'
			} : {
				backgroundImage: 'url(' + src + ')'
			};
	}
});



var _opacity = (function(){
	var
	style = document.createElement('div').style,
	keys = ['opacity', 'MozOpacity', 'KhtmlOpacity', 'filter'];
	
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] in style) {
			return {
				'key': keys[i],
				'val': (function(){
					return keys[i] == 'filter' ? function(alpha){
						return 'alpha(opacity=' + parseInt(parseFloat(alpha) * 100) + ')';
					} : function(alpha){
						return alpha;
					}
				})()
			};
			break;
		}
	}
})();


$.fn.extend({
	setAlphaImage: function(src, sizingMethod){
		return $(this).css($.alphaImage(src, sizingMethod));
	},
	
	removeSelf: function(){
		$.removeSelf(this);
	},
	
	// arrange to same height
	arrangeHeight: function(){
		var h = 0;
		return this.each(function(){
			h = Math.max($(this).outerHeight(), h);
		}).height(h);
	},
	
	
	setData: function(key, val){
		return this.each(function(i, elm){
			$.data(elm, key, val);
		});
	},
	getData: function(key){
		if ($(this).length == 1) 
			return $.data($(this).get(0), key);
		
		return $.map(this.each(function(index, elm){
			return $.data(elm, key);
		}));
	},
	setOpacity:function(alpha){
		for (var i = 0; i < this.length; i++)
			this[i].style[_opacity.key] = _opacity.val(alpha);
		
		return this;
	}
});
})(jQuery);