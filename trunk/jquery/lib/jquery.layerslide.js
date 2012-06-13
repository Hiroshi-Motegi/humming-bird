/**
 * jQuery plugin - layerSlide
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author  : y@s
 * Version : 1.0
 */
;(function($){
$.extend({
	slideEffects: {
		// --- First Element slide Effect. ---
		
		//vertical slide Down
		down: function($this, $first, $second){
			return {
				mOver: {
					top: $this.height() + 'px'
				},
				mOut: {
					top: 0
				}
			}
		},
		//vertical slide Raise
		raise: function($this, $first, $second){
			return {
				mOver: {
					top: -$this.height() + 'px'
				},
				mOut: {
					top: 0
				}
			}
		},
		//horizontal slide Left	
		left: function($this, $first, $second){
			return {
				mOver: {
					left: -$this.width() + 'px'
				},
				mOut: {
					left: 0
				}
			}
		},
		//horizontal slide Right
		right: function($this, $first, $second){
			return {
				mOver: {
					left: $this.width() + 'px'
				},
				mOut: {
					left: 0
				}
			}
		},
		
		
		//diagonal slide TopLeft
		topLeft: function($this, $first, $second){
			return {
				mOver: {
					top : -$this.height() + 'px',
					left: -$this.width() + 'px'
				},
				mOut: {
					top: 0,
					left: 0
				}
			}
		},
		//diagonal slide TopRight
		topRight: function($this, $first, $second){
			return {
				mOver: {
					top : -$this.height() + 'px',
					left: $this.width()   + 'px'
				},
				mOut: {
					top: 0,
					left: 0
				}
			}
		},
		//diagonal slide BottomLeft
		bottomLeft: function($this, $first, $second){
			return {
				mOver: {
					top : $this.height() + 'px',
					left: -$this.width() + 'px'
				},
				mOut: {
					top : 0,
					left: 0
				}
			}
		},
		//diagonal slide BottomRight
		bottomRight: function($this, $first, $second){
			return {
				mOver: {
					top : $this.height() + 'px',
					left: $this.width()  + 'px'
				},
				mOut: {
					top : 0,
					left: 0
				}
			}
		},
		
		
		//vertical slide partial Down.
		partialDown: function($this, $first, $second){
			$second.css({
				position: 'absolute'
			});
			var h = $second.height();
			$second.css({
				position: 'static'
			});
			return {
				mOver: {
					top: h + 'px'
				},
				mOut: {
					top: 0
				}
			};
		},
		//vertical slide partial Raise.
		partialRaise: function($this, $first, $second){
			$first.css({
				zIndex: 9999
			});
			$second.css({
				position: 'absolute',
				zIndex  : 9998
			});
			$second.css({
				top: $this.height() - $second.height() + 'px'
			});
			
			return {
				mOver: {
					top: -$second.height() + 'px'
				},
				mOut: {
					top: 0
				}
			};
		},
		//vertical slide partial Left.
		partialLeft: function($this, $first, $second){
			$first.css({
				zIndex: 9999
			});
			$second.css({
				position: 'absolute',
				zIndex  : 9998
			});
			$second.css({
				left: $this.width() - $second.width() + 'px'
			});
			
			return {
				mOver: {
					left: -$second.width() + 'px'
				},
				mOut: {
					left: 0
				}
			};
		},
		//vertical slide partial Right.
		partialRight: function($this, $first, $second){
			return {
				mOver: {
					left: $second.width() + 'px'
				},
				mOut: {
					left: 0
				}
			};
		},
		
		
		
		
		// --- Second Element slide Effect. ---
		
		// Second Element vertical slide Raise
		secondRaise: function($this, $first, $second){
			$second.css({
				top: $this.height() + 'px'
			});
			return {
				mOver: {
					top: $this.height() - $second.height() + 'px'
				},
				mOut: {
					top: $this.height() + 'px'
				}
			};
		},
		// Second Element vertical slide Down
		secondDown: function($this, $first, $second){
			$second.css({
				top: -$second.height() + 'px'
			}); //abusolute指定した後でtopを指定しないとfirefoxでtopの位置がおかしくなる。
			return {
				mOver: {
					top: 0
				},
				mOut: {
					top: -$second.height() + 'px'
				}
			};
		},
		// Second Element horizontal slide from Left
		secondLeft: function($this, $first, $second){
			$second.css({
				left: -$second.width()
			});
			return {
				mOver: {
					left: 0
				},
				mOut: {
					left: -$second.width()
				}
			};
		},
		// Second Element horizontal slide from Right
		secondRight: function($this, $first, $second){
			$second.css({
				left: $this.width()
			});
			return {
				mOver: {
					left: $this.width() - $second.width()
				},
				mOut: {
					left: $this.width()
				}
			};
		},
		
		
		//Second Element diagonal slide TopLeft
		secondTopLeft: function($this, $first, $second){
			$second.css({
				top : -$second.height(),
				left: -$second.width()
			});
			return {
				mOver: {
					top : 0,
					left: 0
				},
				mOut: {
					top : -$second.height(),
					left: -$second.width()
				}
			};
		},
		//Second Element diagonal slide TopRight
		secondTopRight: function($this, $first, $second){
			$second.css({
				top   : -$second.height(),
				left  : $this.width(),
				width : $second.width(),
				height: $second.height()
			});
			return {
				mOver: {
					top : 0,
					left: $this.width() - $second.width()
				},
				mOut: {
					top : -$second.height(),
					left: $this.width()
				}
			};
		},
		//Second Element diagonal slide BottomLeft
		secondBottomLeft: function($this, $first, $second){
			$second.css({
				top : $this.height(),
				left: -$second.width()
			});
			return {
				mOver: {
					top : $this.height() - $second.height(),
					left: 0
				},
				mOut: {
					top : $this.height(),
					left: -$second.width()
				}
			};
		},
		//Second Element diagonal slide BottomRight
		secondBottomRight: function($this, $first, $second){
			$second.css({
				top   : $this.height(),
				left  : $this.width(),
				width : $second.width(),
				height: $second.height()
			});
			return {
				mOver: {
					top : $this.height() - $second.height(),
					left: $this.width() - $second.width()
				},
				mOut: {
					top : $this.height(),
					left: $this.width()
				}
			};
		}
	}
});

$.fn.extend({
layerSlide:function(options, element){

	var opt = $.extend({
		duration : 300,        // animate speed
		easing   : 'swing',    // animate easing
		bgColor  : '#000',     // second layer background color
		opacity  : 0.8,        // second element opacity
		color    : '#eee',     // second element color
		margin   : '10px',     // second element margin
		textAlign: 'left',     // second element text-align
		height   : 'original', // second element height
		width    : 'original', // second element width
		bgImage  : 'none',     // second element background-image
		effect   : 'down'      // default slide animate
		}, options);
	
	element = options.childNodes ? options : element.childNodes ? element : null;
	
return this.each(function(){

	var $this   = $(this), //container element
	    $first  = $(':first', $this), // first-child element
	    $second = $(document.createElement('div')), //second-child element
	    ez      = {
			tgt  : null,
			mOver: null,
			mOut : null
		};	

	$(element)
		.css({margin: opt.margin})
		.appendTo($second);
	
	$second
		.css({
			top            : 0,
			left           : 0,
			margin         : 0,
			padding        : 0,
			textAlign      : opt.textAlign,
			color          : opt.color,
			backgroundColor: opt.bgColor
		});
	
	//set second element height
	if(opt.height.toLowerCase() != 'original'){
		$second.css({height:opt.height});
	}
	
	//set second element width
	if(opt.width.toLowerCase() != 'original'){
		$second.css({width:opt.width});
	}
	
	//set style second element if effect target is second.
	if(opt.effect.match(/second/)){
		$second.css({position: 'absolute', opacity: opt.opacity});
	}
	
	//set second element background-image
	if(opt.bgImage.match(/^.+\.(?:jpg|png|gif)$/)){
		$second.css({ backgroundImage: 'url("' + opt.bgImage + '")' });
	}
	
	$first
		.css({
			position: 'absolute',
			top     : 0,
			left    : 0,
			margin  : 0,
			padding : 0
		});
	
	
	$this
		.css({
			display        : 'block',
			position       : 'relative',
			top            : 0,
			left           : 0,
			margin         : 0,
			padding        : 0,
			overflow       : 'hidden',
			textDecoration : 'none',
			backgroundColor: opt.bgColor,
			height         : $first.outerHeight(),
			width          : $first.outerWidth()
		})
		.append($second);
	
	ez = $.slideEffects[opt.effect]($this, $first, $second);
	
	//set effect target.
	ez.tgt = opt.effect.match(/second/) ? $second : $first;

	$this.hover(function(){
		ez.tgt.stop(true).animate(ez.mOver,{duration:opt.duration, easing:opt.easing});
	}, function() {
		ez.tgt.stop(true).animate(ez.mOut,{duration:opt.duration, easing:opt.easing});
	});

});
}
})})(jQuery);