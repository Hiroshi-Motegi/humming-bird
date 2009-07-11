(function($) {
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
		elm = 'length' in elm ? elm.get(0) : elm;
		return (!elm.parentNode || !elm.parentNode.tagName);
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
	
	// Query String
	toQueryString: function(o){
		var ret = [];
		for(i in o){
			if(o.hasOwnProperty( i ))
				ret.push( i + '=' + encodeURIComponent(o[i]) );
		}
		return ret.join('&');
	},
	
	backgroundImage: function(src, sizingMethod){
		var bg = $.browser.msie && $.browser.version == 6 ? {
			filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=' + 
				(sizingMethod || 'image') + ' src="' + src + '")'
		} : {
			backgroundImage: 'url(' + src + ')'
		};
		return bg;
	}
});


$.fn.extend({
	setBgImage: function(src, options){
		var bg = $.backgroundImage(src, options);
		return this.each(function(){
			$(this).css(bg);
		});
	},
	
	removeSelf: function(){
		return $.removeSelf(this);
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
	}
});
})(jQuery);