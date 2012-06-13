/**
 * jQuery plugin - switchBox
 * Copyright 2010 y@s
 * Released under the MIT and GPL licenses.
 * 
 * @Author     : y@s
 * @LastUpdate :
 */
/*@cc_on 
var doc = document;
eval('var document = doc');
@*/
;(function( $, undefined ){

$.extend($.expr[':'],{
	addedToDom: function( elm ){
		while (elm.parentNode && elm.parentNode.tagName) {
			elm = elm.parentNode;
		}
		return elm.tagName.toLowerCase() === "html";
	}
});

var
$doc = $(document),
Switcher = {
create:function( defState, defDisabled ){
	
	var
	state    = typeof(defState) == "boolean" ? defState : true,
	disabled = typeof(defDisabled) == "boolean" ? defDisabled : false,
	key      = "switcher-state-changed" + (+new Date),
	dsckey   = "switcher-disabled-state-changed" + (+new Date),
	fn       = function(){};
	
	fn.prototype = {
		disabled: function( ds ){
			if(typeof(ds) == "boolean"){
				if(ds !== disabled){
					disabled = ds;
					$doc.trigger(dsckey, [disabled]);
				}
				return this;
			}else{
				return disabled;
			}
		},
		isOn: function(){
			return state;
		},
		toggle:function( callback ){
			return this[state ? "off" : "on"]( callback );
		},
		on: function( callback ){
			if (!disabled) {
				state = true;
				$doc.trigger(key, [state]);
				(callback || function(){}).call(this, state);
			}
			return this;
		},
		off: function( callback ){
			if (!disabled) {
				state = false;
				$doc.trigger(key, [state]);
				(callback || function(){}).call(this, state);
			}
			return this;
		},
		bindStateChanged: function( handler ){
			$doc.bind(key, handler);
			return this;
		},
		unbindStateChanged: function( handler ){
			$doc.unbind(key, handler);
			return this;
		},
		bindDisabledStateChanged: function( handler ){
			$doc.bind(dsckey, handler);
			return this;
		},
		unbindDisabledStateChanged: function( handler ){
			$doc.unbind(dsckey, handler);
			return this;
		}
	};
	
	return new fn;	
}};

$.switchBox = {
create:function( elm, options ){
	
	var
	opt = $.extend({
		key       : "switch",
		state     : true,
		disabled  : false,
		duration  : 300,
		easing    : "swing",
		separator : "", //to remove separator, if "none" or false 
		sepWidth  : "8px",
		raiseEvent: "after", //after or before
		width     : 0,
		height    : 0,
		label: {
			on : "ON",
			off: "OFF"
		}
	},options),
	
	pos = {},
	$inner = null,
	$on    = null,
	$off   = null,
	$sep   = null,
	fn = function(){
		this.initialize.apply(this, arguments);
	},
	raiseEvent = (opt.raiseEvent === "after" || opt.raiseEvent === "before")
		? opt.raiseEvent
		: "after",
	clickHandler = {};
	
	pos[true] = 0;
	
	fn.prototype = Switcher.create( opt.state, !opt.disabled );
	fn.prototype.initialize = function( elm ){
		
		var
		self = this,
		h = 0,
		w = 0,
		$span, $parent, isAdded;
		
		$inner = $((""
			+ "<table cellSpacing='0' class='%key%-inner'><tbody><tr>"
			+ "<td class='%key%-on'><span>%label_on%</span></td>"
			+ "<td class='%key%-sep'><span>&nbsp;</span></td>"
			+ "<td class='%key%-off'><span>%label_off%</span></td>"
			+ "</tr></tbody></table>")
				.replace(/%key%/g, opt.key)
				.replace(/%label_on%/g, opt.label.on)
				.replace(/%label_off%/g, opt.label.off))
			.css({
				"border-collapse": "collapse",
				"border-spacing" : "0",
				"border-width"   : "0",
				"cursor"         : "pointer",
				"margin"         : "0",
				"padding"        : "0",
				"top"            : "0",
				"left"           : "0"
			})
			.find("tbody,tr,td")
			.css({
				"border-width": "0",
				"margin"      : "0",
				"padding"     : "0"
			})
			.end();
		
		clickHandler = {
			before: function(){
				self.toggle(function(state){
					$inner.stop(true).animate({
						left: pos[ state ]
					}, opt.duration, opt.easing);
				});
			},
			after: function(){
				$inner.stop(true).animate({
					left: pos[ !self.isOn() ]
				}, opt.duration, opt.easing, function(){
					self.toggle();
				});
			}
		};

		
		$("span", $inner).css({
			"display"   : "block",
			"text-align": "center"
		});
		
		$on  = $("." + opt.key + "-on > span" , $inner);
		$off = $("." + opt.key + "-off > span", $inner);
		$sep = $("." + opt.key + "-sep > span", $inner);
		
		if( +opt.sepWidth === 0 || opt.separator === "none" || opt.separator === false){
			$sep.remove();
			$sep = null;
		}
		
		this.$content = $(elm)
			.addClass(opt.key)
			.css({
				display : "block", //"inline-block",
				padding : "0",
				position: "relative",
				overflow: "hidden"
			})
			.append($inner);
		
		this.bindDisabledStateChanged(function( e, disabled ){
			if(disabled){
				$inner
					.css({ cursor: "default" })
					.unbind("click", clickHandler[ raiseEvent ]);
				self.$content.addClass("disabled");
			}else{
				$inner
					.css({ cursor: "pointer" })
					.bind("click", clickHandler[ raiseEvent ]);
				self.$content.removeClass("disabled");
			}
			return this;
		}).disabled( opt.disabled ); //init disabled
		
		
		//↓ set size
		
		isAdded = this.$content.is(":addedToDom");
		
		if( !isAdded ){
			$parent = this.$content.parent();
			$(document.body).append(this.$content);
		}
		
		$span = $("span", this.$content);
		
		
		//set height
		h = ( opt.height ? opt.height : $span.outerHeight() ) + "";
		h = h.slice(-2) !== "px" ? h + "px" : h;
		
		$span
			.add( $span.parent() )
			.css({
				"line-height": h,
				"height"     : h
			});
		
		$inner.height( $span.outerHeight() );
		//set height end
		
		
		
		//set width
		
		//set separator width
		if($sep && opt.sepWidth){
			$sep.css("width", opt.sepWidth);
		}
		
		//set label width
		if (opt.width) {
			$on.add( $off ).width( opt.width - ($sep ? $sep.outerWidth() / 2 : 0 ) );
		}
		else {
			//get max width
			$on.add( $off ).each(function(){
				w = Math.max( $(this).outerWidth(), w );
			}).width(w);
		}
		
		this.$content
			//100% -> IE relative position bug
			.height(($.browser.msie && $.browser.version < 8)
				|| ($.browser.mozilla && ($.browser.version.split(".")[1] - 6) < 3)
				? "100%"
				: $inner.outerHeight())
			.width($on.outerWidth()
				+ ( $sep
				? $sep.outerWidth() - ($sep.css("border-right-width").match(/\d+/)||[0])[0]
				: 0)
				);

		//set width end
		
		
		pos[false] = ( -$on.outerWidth() ) - ( $sep
			? ($sep.css("border-left-width").match(/\d+/)||[0])[0]
			: 0 );
		
		//init position
		$inner.css({
			position: "relative",
			left    : pos[ this.isOn() ]
		});
		
		if( !isAdded && $parent.length ){
			$parent.append(this.$content);
		}
	}
	
	fn.prototype.performClick = function(){
		$inner.trigger("click", arguments);
		return this;
	}
	
	return new fn( elm, options );	
}};

$.fn.switchBox = function(){
	var args = Array.prototype.slice.call(arguments), cb = [];
	this.each(function(){
		args.unshift(this);
		cb.push($.switchBox.create.apply(null, args));
	});
	return cb;
};
})(jQuery);