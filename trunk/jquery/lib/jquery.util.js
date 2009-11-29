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
	dom: {
		NodeType: {
			ELEMENT: 1,
			ATTRIBUTE: 2,
			TEXT: 3,
			CDATA_SECTION: 4,
			ENTITY_REFERENCE: 5,
			ENTITY: 6,
			PROCESSING_INSTRUCTION: 7,
			COMMENT: 8,
			DOCUMENT: 9,
			DOCUMENT_TYPE: 10,
			DOCUMENT_FRAGMENT: 11,
			NOTATION: 12
		}
	},
	// check exist parent node
	existParent: function(elm){
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
		ret = args[0]||{},
		i = 1,
		itm, arg;
		
		for( ; i < len ; ){
			arg = args[i++];
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
	
	alphaImage: (function(){
		var _isOldIE = $.browser.msie && $.browser.version == 6;
		
		//sizingMethod = crop or image or scale
		return function(src, sizingMethod){
			_isOldIE ? {
				filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(' +
					'sizingMethod=' + (sizingMethod || 'image') +
					' src="' + src + '")'
			} : {
				backgroundImage: 'url(' + src + ')'
			};
		};
	})()
});






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
	setOpacity:(function(){
	
		var _opacity = (function(){
			var style = document.createElement('div').style,
			    keys = ['opacity', 'MozOpacity', 'KhtmlOpacity', 'filter'];
			
			for (var i = 0; i < keys.length; i++) {
				if (keys[i] in style) {
					return {
						'key': keys[i],
						'val': (function(){
							return keys[i] == 'filter' ? function(alpha){
								return 'alpha(opacity=' + parseInt(parseFloat(alpha) * 100) + ')';
							}:function(alpha){
								return alpha;
							}
						})()
					};
					break;
				}
			}
			
			return {};
		})();
		
		return function(alpha){
			for (var i = 0; i < this.length; i++) 
				this[i].style[_opacity.key] = _opacity.val(alpha);
			
			return this;
		};
	})()



});
})(jQuery);