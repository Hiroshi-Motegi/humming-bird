(function( $ ){
var
slice = Array.prototype.slice,
myExt = {
	/**
	 * StopWatch
	 * Firefoxのconsole.timeの代わり。
	 *
	 * Usage:
	 *   Date.sw.start("test");
	 * 	    something...
	 *   var ret = Date.sw.timeEnd("test");
	 */
	sw: function(){
		var times = {};
		
		function clearn( time ){
			return +(/^(?:.+:\s)?(\d+)(?:ms)?$/.exec(time)[1] || 0);
		}
		
		return {
			//timer start
			time: function( key ){
				if ( key ) {
					times[key] = +new Date;
				}
			},
			/**
			 * timer stop
			 * @param  {String}  key
			 * @param  {Boolean} clearn*
			 * @return {Number}   - milisecond
			 */
			timeEnd: function( key /*, clearn */ ){
				if ( key in times ) {
					var time = (+new Date) - times[key];
					return !arguments[1] ? key + ": " + time + "ms" : time;
				}
			},
			diff: function( t1, t2 ){
				t1 = typeof t1 == "number" ? t1 : clearn(t1);
				t2 = typeof t2 == "number" ? t2 : clearn(t2);
				
				return Math.max(t1, t2) - Math.min(t1, t2);
			}
		};
	}(),
	/**
	 * @param {Object} params
	 * 		- callback
	 * 		- loopCount
	 * 		- args
	 * @return {Object}
	 * 		- time
	 * 		- ret
	 */
	fnTime: function(){
		
		/**
		 * @param  {Function} callback - test function
		 * @param  {Number}   count    - loop count
		 * @param  {unknown}  arg      - arguments of callback
		 * @return {Number}
		 */
		function x( fn, count, arg ){
			var
			i   = 0,
			key = "debug-test" + (+new Date),
			ret;
			
			myExt.sw.time(key);
			
			for ( ; i < count ; i++ ) {
				ret = fn.apply( null, arg );
			}
			
			return {
				time: myExt.sw.timeEnd(key, true),
				ret : ret
			};
		}
		
		return function( loopCount, callback ){
			arg = slice.call(arguments).slice(2);
			var result = x( callback, loopCount, arg );
			return {
				time: result.time - x(function(){}, loopCount, arg).time,
				ret : result.ret
			};
		};
	}(),
	nodeType: {
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
	},
	keys: {
		BACKSPACE: 8,
		TAB: 9,
		CLEAR: 12,
		ENTER: 13,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		PAUSE: 19,
		CAPS_LOCK: 20,
		ESCAPE: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT_ARROW: 37,
		UP_ARROW: 38,
		RIGHT_ARROW: 39,
		DOWN_ARROW: 40,
		INSERT: 45,
		DELETE: 46,
		HELP: 47,
		LEFT_WINDOW: 91,
		RIGHT_WINDOW: 92,
		SELECT: 93,
		NUMPAD_0: 96,
		NUMPAD_1: 97,
		NUMPAD_2: 98,
		NUMPAD_3: 99,
		NUMPAD_4: 100,
		NUMPAD_5: 101,
		NUMPAD_6: 102,
		NUMPAD_7: 103,
		NUMPAD_8: 104,
		NUMPAD_9: 105,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_PLUS: 107,
		NUMPAD_ENTER: 108,
		NUMPAD_MINUS: 109,
		NUMPAD_PERIOD: 110,
		NUMPAD_DIVIDE: 111,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		F13: 124,
		F14: 125,
		F15: 126,
		NUM_LOCK: 144,
		SCROLL_LOCK: 145
	},
	// Merge Objects.
	merge: function(){
		var args = slice.call( arguments ),
		    j    = args.length || 0,
		    ret  = args[0],
		    i    = 1,
		    itm, arg;
		
		for ( arg = args[i] ; i < j ; arg = args[++i] ) {
			for ( itm in arg ) {
				if ( arg.hasOwnProperty(itm) ) {
					ret[itm] = arg[itm];
				}
			}
		}
		
		return ret;
	},
	overlay:function(){
		var Overlay = function( options ){
		
			var elm = $(options.dom_element),
			    pos = elm.position();
			
			this.image = $("<div>").css({
				"position": "absolute",
				"left"    : pos.left,
				"top"     : pos.top,
				"z-index" : 1E6
			})
			.width( elm.width() )
			.height( elm.height() );
			
			this.elm = elm;
			this.click_handler = options.click_handler;
			
			Overlay.instances.push(this);
		};
		
		Overlay.instances = [];
		
		Overlay.removeAll = function(){
			$.each(Overlay.instances, function(i, overlay){
				overlay.image.remove();
			});
			Overlay.instances = [];
		};
		
		Overlay.prototype.display = function(){
			var that = this;
			this.image
				.appendTo( that.elm.parent() )
				.click(function(){
					that.click_handler( that.elm );
					return false;
				});
		};
		
		return Overlay;
	}()
};

if (!$) {
	window.$ = myExt;
}
else {
	for ( var i in myExt ) {
		if ( !(i in $) ) {
			$[i] = myExt[i];
		}
	}
}
})( window["jQuery"] );