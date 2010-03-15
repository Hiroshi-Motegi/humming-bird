/**
 * jQuery plugin jsonToString
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author  : y@s
 * Updated : 2009-06-06
 * Version : 1.0
 * demo    : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/jsonToString.html
 */

function escapeAndModify(s){
	return (s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

(function($){
$.jsonToString = function(json){

	function oFn(o){
		
		if (o === null) return 'null';
		if (o === undefined) return 'undefined';
		
		switch (o.constructor) {
			case Boolean:
			case Number:
				return o;
			case String:
				return '\'' + o + '\'';
			case Date:
				return '\'' + o.toString() + '\'';
			case Array:
				var arr = [];
				for (var i = 0, k = o.length; i < k; i++)
					arr[arr.length] = oFn(o[i]);
				
				return '[' + arr.join(',\n') + ']';
			case Object:
					var arr = [];
					for (var x in o) {
						if (o.hasOwnProperty(x))
							arr.push(x + ':' + oFn(o[x]));
					}
					return '{\n' + arr.join(',\n') + '\n}';
			default:
				return null;
		}
	}
	
	return oFn(json);
}

$.showJsonString = function(json){
	$('<textarea>').val($.jsonToString(json)).appendTo(document.body);
}
})(jQuery);





var g = {
	media$group: {
		media$category: [{
			$t: 'Music',
			label: '音楽',
			scheme: 'http://gdata.youtube.com/schemas/2007/categories.cat'
		}],
		media$content: [{
			url: 'http://www.youtube.com/v/FYl04pPOqv0?f=videos&app=youtube_gdata',
			type: 'application/x-shockwave-flash',
			medium: 'video',
			isDefault: 'true',
			expression: 'full',
			duration: 371,
			yt$format: 5
		}, {
			url: 'rtsp://rtsp2.youtube.com/CiILENy73wIaGQn9qs6T4nSJFRMYDSANFEgGUgZ2aWRlb3MM/0/0/0/video.3gp',
			type: 'video/3gpp',
			medium: 'video',
			expression: 'full',
			duration: 371,
			yt$format: 1
		}, {
			url: 'rtsp://rtsp2.youtube.com/CiILENy73wIaGQn9qs6T4nSJFRMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp',
			type: 'video/3gpp',
			medium: 'video',
			expression: 'full',
			duration: 371,
			yt$format: 6
		}],
		media$description: {
			$t: 'All the previews for the songs on the Jonas Brothers album " Lines, Vines, & Trying Times". They played these previews in the facebook live chat, but in case you missed it...HERE IT IS! :) enjoyy! and once again I dont own anything. and no copyright is intended. PLEEASSEE subscribee!',
			type: 'plain'
		},
		media$keywords: {
			$t: 'jonas, brothers, lines, vines, and, trying, times, previews, songs, jb, jobros, album, facebook, live, chat'
		},
		media$player: [{
			url: 'http://www.youtube.com/watch?v=FYl04pPOqv0'
		}],
		media$thumbnail: [{
			url: 'http://i.ytimg.com/vi/FYl04pPOqv0/2.jpg',
			height: 90,
			width: 120,
			time: '00:03:05.500'
		}, {
			url: 'http://i.ytimg.com/vi/FYl04pPOqv0/1.jpg',
			height: 90,
			width: 120,
			time: '00:01:32.750'
		}, {
			url: 'http://i.ytimg.com/vi/FYl04pPOqv0/3.jpg',
			height: 90,
			width: 120,
			time: '00:04:38.250'
		}, {
			url: 'http://i.ytimg.com/vi/FYl04pPOqv0/0.jpg',
			height: 240,
			width: 320,
			time: '00:03:05.500'
		}],
		media$title: {
			$t: 'Line, Vines, And Trying Times Album Song Previews Jonas Brothers in HQ',
			type: 'plain'
		},
		yt$duration: {
			seconds: '371'
		}
	},
	gd$rating: {
		average   : 4.9555554,
		max       : 5,
		min       : 1,
		numRaters : 90,
		rel       : 'http://schemas.google.com/g/2005#overall'
	},
	yt$statistics: {
		favoriteCount : '192',
		viewCount     : '7223'
	}
}

