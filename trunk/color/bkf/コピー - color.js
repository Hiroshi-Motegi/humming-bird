function Color(){
	this.initialize.apply(this, arguments);
}
Color.prototype = {
	initialize:function(arguments){
		var r = arguments.r || 0;
		var g = arguments.g || 0;
		var b = arguments.b || 0;
		var name = arguments.name || "";
		var code = arguments.code || "";
		this.R = function(){ return r; };
		this.G = function(){ return g; };
		this.B = function(){ return b; };
		this.Name = function(){ return name; };
		this.Code = function(){ return code.toString(); };
	},
	toString:function(){
		return String(this.Code());
	}
}


Color.fromRgb = function(r, g, b){
	function rgbFormat(cp){
		return (cp < 0 || isNaN(cp)) ? 0 : ((cp > 255) ? 255 : cp);
	}
	
	r = rgbFormat(r);
	g = rgbFormat(g);
	b = rgbFormat(b);
	
	var code = Color.getCodeFromRgb(r, g, b);
	
	return new Color({
		r:r, g:g, b:b,
		code:code,
		name:Color.getNameFromCode(code)
	});
}

Color.fromColorCode = function(code){
	if (code.search(/^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/) != -1) {
		
		code = (function(code){
			code = code.replace(/^\s+|\s+$/g, "");
			code = code.toLowerCase();
		
			if (code.charAt(0) == "#") code = code.substr(1);
			
			var red = code.substr(0, code.length / 3);
			var green = code.substr(code.length / 3, code.length / 3);
			var blue = code.substr(code.length / 3 * 2, code.length / 3);
			
			if (code.length == 3) {
				red = red + red;
				green = green + green;
				blue = blue + blue;
			}
			
			return ("#" + red + green + blue);
		})(code);
		
		var rgb = Color.getRgbFromCode(code);
		
		return new Color({
			r:rgb.r,
			g:rgb.g,
			b:rgb.b,
			code:code,
			name:Color.getNameFromCode(code)
		});
	}
	
	return new Color({r:0, g:0, b:0, code:"", name:""});
}

Color.fromName = function(name){
	name = name.replace(/ /g,'');
	name = name.toLowerCase();
	
	if (name.match(/^[a-zA-Z]+$/)) {
		var code = Color.knownColor[name];
		
		if (code != undefined || code != "undefined") {
			var rgb = Color.getRgbFromCode(code);
			
			return new Color({
				r:rgb.r,
				g:rgb.g,
				b:rgb.b,
				code:code,
				name:name
			});
		}
	}
	
	return new Color({r:0, g:0, b:0, code:"", name:""});
}




Color.getNameFromCode = function(code){
	var kcList = Color.knownColor;
	
	for (var key in kcList) {
        if (code == kcList[key]) return key;
    }
	
	return "";
}

Color.getCodeFromRgb = function(r, g, b){
	return ((((1 << 8) + r << 8) + g << 8) + b).toString(16).replace(/^1/, '#');
}

Color.getRgbFromCode = function(code){
	if(code.charAt(0) == "#") code = code.substr(1);
	
	var rgb = {
		r:parseInt(code.substr(0, 2), 16),
		g:parseInt(code.substr(2, 2), 16),
		b:parseInt(code.substr(4), 16)
		};
	return rgb;
}

Color.getWebColors = function(){
	var hxs =["ff", "cc", "99", "66", "33", "00"];
	var codes = [];
	
	for(var i = 0; i < hxs.length; i++){
		for(var n = 0; n < hxs.length; n++){
			for(var m = 0; m < hxs.length; m++){
				codes.push("#" + hxs[i] + hxs[n] + hxs[m]);
			}
		}
	}
	
	return codes;
}

Color.getKnownColors = function(){
	var kclst = Color.knownColor;
	var kcArr = [];
	for(var kc in kclst){ kcArr.push(kclst[kc]);}
	return kcArr;
}



Color.knownColor = {
    aliceblue:'#f0f8ff',
	antiquewhite:'#faebd7',
	aqua:'#00ffff',
	aquamarine:'#7fffd4',
	azure:'#f0ffff',
	beige:'#f5f5dc',
	bisque:'#ffe4c4',
	black:'#000000',
	blanchedalmond:'#ffebcd',
	blue:'#0000ff',
	blueviolet:'#8a2be2',
	brown:'#a52a2a',
	burlywood:'#deb887',
	cadetblue:'#5f9ea0',
	chartreuse:'#7fff00',
	chocolate:'#d2691e',
	coral:'#ff7f50',
	cornflowerblue:'#6495ed',
	cornsilk:'#fff8dc',
	crimson:'#dc143c',
	cyan:'#00ffff',
	darkblue:'#00008b',
	darkcyan:'#008b8b',
	darkgoldenrod:'#b8860b',
	darkgray:'#a9a9a9',
	darkgreen:'#006400',
	darkkhaki:'#bdb76b',
	darkmagenta:'#8b008b',
	darkolivegreen:'#556b2f',
	darkorange:'#ff8c00',
	darkorchid:'#9932cc',
	darkred:'#8b0000',
	darksalmon:'#e9967a',
	darkseagreen:'#8fbc8f',
	darkslateblue:'#483d8b',
	darkslategray:'#2f4f4f',
	darkturquoise:'#00ced1',
	darkviolet:'#9400d3',
	deeppink:'#ff1493',
	deepskyblue:'#00bfff',
	dimgray:'#696969',
	dodgerblue:'#1e90ff',
	feldspar:'#d19275',
	firebrick:'#b22222',
	floralwhite:'#fffaf0',
	forestgreen:'#228b22',
	fuchsia:'#ff00ff',
	gainsboro:'#dcdcdc',
	ghostwhite:'#f8f8ff',
	gold:'#ffd700',
	goldenrod:'#daa520',
	gray:'#808080',
	green:'#008000',
	greenyellow:'#adff2f',
	honeydew:'#f0fff0',
	hotpink:'#ff69b4',
	indianred:'#cd5c5c',
	indigo:'#4b0082',
	ivory:'#fffff0',
	khaki:'#f0e68c',
	lavender:'#e6e6fa',
	lavenderblush:'#fff0f5',
	lawngreen:'#7cfc00',
	lemonchiffon:'#fffacd',
	lightblue:'#add8e6',
	lightcoral:'#f08080',
	lightcyan:'#e0ffff',
	lightgoldenrodyellow:'#fafad2',
	lightgrey:'#d3d3d3',
	lightgreen:'#90ee90',
	lightpink:'#ffb6c1',
	lightsalmon:'#ffa07a',
	lightseagreen:'#20b2aa',
	lightskyblue:'#87cefa',
	lightslateblue:'#8470ff',
	lightslategray:'#778899',
	lightsteelblue:'#b0c4de',
	lightyellow:'#ffffe0',
	lime:'#00ff00',
	limegreen:'#32cd32',
	linen:'#faf0e6',
	magenta:'#ff00ff',
	maroon:'#800000',
	mediumaquamarine:'#66cdaa',
	mediumblue:'#0000cd',
	mediumorchid:'#ba55d3',
	mediumpurple:'#9370d8',
	mediumseagreen:'#3cb371',
	mediumslateblue:'#7b68ee',
	mediumspringgreen:'#00fa9a',
	mediumturquoise:'#48d1cc',
	mediumvioletred:'#c71585',
	midnightblue:'#191970',
	mintcream:'#f5fffa',
	mistyrose:'#ffe4e1',
	moccasin:'#ffe4b5',
	navajowhite:'#ffdead',
	navy:'#000080',
	oldlace:'#fdf5e6',
	olive:'#808000',
	olivedrab:'#6b8e23',
	orange:'#ffa500',
	orangered:'#ff4500',
	orchid:'#da70d6',
	palegoldenrod:'#eee8aa',
	palegreen:'#98fb98',
	paleturquoise:'#afeeee',
	palevioletred:'#d87093',
	papayawhip:'#ffefd5',
	peachpuff:'#ffdab9',
	peru:'#cd853f',
	pink:'#ffc0cb',
	plum:'#dda0dd',
	powderblue:'#b0e0e6',
	purple:'#800080',
	red:'#ff0000',
	rosybrown:'#bc8f8f',
	royalblue:'#4169e1',
	saddlebrown:'#8b4513',
	salmon:'#fa8072',
	sandybrown:'#f4a460',
	seagreen:'#2e8b57',
	seashell:'#fff5ee',
	sienna:'#a0522d',
	silver:'#c0c0c0',
	skyblue:'#87ceeb',
	slateblue:'#6a5acd',
	slategray:'#708090',
	snow:'#fffafa',
	springgreen:'#00ff7f',
	steelblue:'#4682b4',
	tan:'#d2b48c',
	teal:'#008080',
	thistle:'#d8bfd8',
	tomato:'#ff6347',
	turquoise:'#40e0d0',
	violet:'#ee82ee',
	violetred:'#d02090',
	wheat:'#f5deb3',
	white:'#ffffff',
	whitesmoke:'#f5f5f5',
	yellow:'#ffff00',
	yellowgreen:'#9acd32'
}


Color.basicColor = {
	black:'#000000',
	gray:'#808080',
	silver:'#c0c0c0',
	white:'#ffffff',
	maroon:'#800000',
	red:'#ff0000',
	purple:'#800080',
	fuchsia:'#ff00ff',
	green:'#008000',
	lime:'#00ff00',
	olive:'#808000',
	yellow:'#ffff00',
	navy:'#000080',
	blue:'#0000ff',
	teal:'#008080',
	aqua:'#00ffff'
}



Color.aliceblue = '#f0f8ff';
Color.antiquewhite = '#faebd7';
Color.aqua = '#00ffff';
Color.aquamarine = '#7fffd4';
Color.azure = '#f0ffff';
Color.beige = '#f5f5dc';
Color.bisque = '#ffe4c4';
Color.black = '#000000';
Color.blanchedalmond = '#ffebcd';
Color.blue = '#0000ff';
Color.blueviolet = '#8a2be2';
Color.brown = '#a52a2a';
Color.burlywood = '#deb887';
Color.cadetblue = '#5f9ea0';
Color.chartreuse = '#7fff00';
Color.chocolate = '#d2691e';
Color.coral = '#ff7f50';
Color.cornflowerblue = '#6495ed';
Color.cornsilk = '#fff8dc';
Color.crimson = '#dc143c';
Color.cyan = '#00ffff';
Color.darkblue = '#00008b';
Color.darkcyan = '#008b8b';
Color.darkgoldenrod = '#b8860b';
Color.darkgray = '#a9a9a9';
Color.darkgreen = '#006400';
Color.darkkhaki = '#bdb76b';
Color.darkmagenta = '#8b008b';
Color.darkolivegreen = '#556b2f';
Color.darkorange = '#ff8c00';
Color.darkorchid = '#9932cc';
Color.darkred = '#8b0000';
Color.darksalmon = '#e9967a';
Color.darkseagreen = '#8fbc8f';
Color.darkslateblue = '#483d8b';
Color.darkslategray = '#2f4f4f';
Color.darkturquoise = '#00ced1';
Color.darkviolet = '#9400d3';
Color.deeppink = '#ff1493';
Color.deepskyblue = '#00bfff';
Color.dimgray = '#696969';
Color.dodgerblue = '#1e90ff';
Color.feldspar = '#d19275';
Color.firebrick = '#b22222';
Color.floralwhite = '#fffaf0';
Color.forestgreen = '#228b22';
Color.fuchsia = '#ff00ff';
Color.gainsboro = '#dcdcdc';
Color.ghostwhite = '#f8f8ff';
Color.gold = '#ffd700';
Color.goldenrod = '#daa520';
Color.gray = '#808080';
Color.green = '#008000';
Color.greenyellow = '#adff2f';
Color.honeydew = '#f0fff0';
Color.hotpink = '#ff69b4';
Color.indianred = '#cd5c5c';
Color.indigo = '#4b0082';
Color.ivory = '#fffff0';
Color.khaki = '#f0e68c';
Color.lavender = '#e6e6fa';
Color.lavenderblush = '#fff0f5';
Color.lawngreen = '#7cfc00';
Color.lemonchiffon = '#fffacd';
Color.lightblue = '#add8e6';
Color.lightcoral = '#f08080';
Color.lightcyan = '#e0ffff';
Color.lightgoldenrodyellow = '#fafad2';
Color.lightgrey = '#d3d3d3';
Color.lightgreen = '#90ee90';
Color.lightpink = '#ffb6c1';
Color.lightsalmon = '#ffa07a';
Color.lightseagreen = '#20b2aa';
Color.lightskyblue = '#87cefa';
Color.lightslateblue = '#8470ff';
Color.lightslategray = '#778899';
Color.lightsteelblue = '#b0c4de';
Color.lightyellow = '#ffffe0';
Color.lime = '#00ff00';
Color.limegreen = '#32cd32';
Color.linen = '#faf0e6';
Color.magenta = '#ff00ff';
Color.maroon = '#800000';
Color.mediumaquamarine = '#66cdaa';
Color.mediumblue = '#0000cd';
Color.mediumorchid = '#ba55d3';
Color.mediumpurple = '#9370d8';
Color.mediumseagreen = '#3cb371';
Color.mediumslateblue = '#7b68ee';
Color.mediumspringgreen = '#00fa9a';
Color.mediumturquoise = '#48d1cc';
Color.mediumvioletred = '#c71585';
Color.midnightblue = '#191970';
Color.mintcream = '#f5fffa';
Color.mistyrose = '#ffe4e1';
Color.moccasin = '#ffe4b5';
Color.navajowhite = '#ffdead';
Color.navy = '#000080';
Color.oldlace = '#fdf5e6';
Color.olive = '#808000';
Color.olivedrab = '#6b8e23';
Color.orange = '#ffa500';
Color.orangered = '#ff4500';
Color.orchid = '#da70d6';
Color.palegoldenrod = '#eee8aa';
Color.palegreen = '#98fb98';
Color.paleturquoise = '#afeeee';
Color.palevioletred = '#d87093';
Color.papayawhip = '#ffefd5';
Color.peachpuff = '#ffdab9';
Color.peru = '#cd853f';
Color.pink = '#ffc0cb';
Color.plum = '#dda0dd';
Color.powderblue = '#b0e0e6';
Color.purple = '#800080';
Color.red = '#ff0000';
Color.rosybrown = '#bc8f8f';
Color.royalblue = '#4169e1';
Color.saddlebrown = '#8b4513';
Color.salmon = '#fa8072';
Color.sandybrown = '#f4a460';
Color.seagreen = '#2e8b57';
Color.seashell = '#fff5ee';
Color.sienna = '#a0522d';
Color.silver = '#c0c0c0';
Color.skyblue = '#87ceeb';
Color.slateblue = '#6a5acd';
Color.slategray = '#708090';
Color.snow = '#fffafa';
Color.springgreen = '#00ff7f';
Color.steelblue = '#4682b4';
Color.tan = '#d2b48c';
Color.teal = '#008080';
Color.thistle = '#d8bfd8';
Color.tomato = '#ff6347';
Color.turquoise = '#40e0d0';
Color.violet = '#ee82ee';
Color.violetred = '#d02090';
Color.wheat = '#f5deb3';
Color.white = '#ffffff';
Color.whitesmoke = '#f5f5f5';
Color.yellow = '#ffff00';
Color.yellowgreen = '#9acd32';


/*
Color.aliceblue = function(){ return Color.fromName('aliceblue'); }
Color.antiquewhite = function(){ return Color.fromName('antiquewhite'); }
Color.aqua = function(){ return Color.fromName('aqua'); }
Color.aquamarine = function(){ return Color.fromName('aquamarine'); }
Color.azure = function(){ return Color.fromName('azure'); }
Color.beige = function(){ return Color.fromName('beige'); }
Color.bisque = function(){ return Color.fromName('bisque'); }
Color.black = function(){ return Color.fromName('black'); }
Color.blanchedalmond = function(){ return Color.fromName('blanchedalmond'); }
Color.blue = function(){ return Color.fromName('blue'); }
Color.blueviolet = function(){ return Color.fromName('blueviolet'); }
Color.brown = function(){ return Color.fromName('brown'); }
Color.burlywood = function(){ return Color.fromName('burlywood'); }
Color.cadetblue = function(){ return Color.fromName('cadetblue'); }
Color.chartreuse = function(){ return Color.fromName('chartreuse'); }
Color.chocolate = function(){ return Color.fromName('chocolate'); }
Color.coral = function(){ return Color.fromName('coral'); }
Color.cornflowerblue = function(){ return Color.fromName('cornflowerblue'); }
Color.cornsilk = function(){ return Color.fromName('cornsilk'); }
Color.crimson = function(){ return Color.fromName('crimson'); }
Color.cyan = function(){ return Color.fromName('cyan'); }
Color.darkblue = function(){ return Color.fromName('darkblue'); }
Color.darkcyan = function(){ return Color.fromName('darkcyan'); }
Color.darkgoldenrod = function(){ return Color.fromName('darkgoldenrod'); }
Color.darkgray = function(){ return Color.fromName('darkgray'); }
Color.darkgreen = function(){ return Color.fromName('darkgreen'); }
Color.darkkhaki = function(){ return Color.fromName('darkkhaki'); }
Color.darkmagenta = function(){ return Color.fromName('darkmagenta'); }
Color.darkolivegreen = function(){ return Color.fromName('darkolivegreen'); }
Color.darkorange = function(){ return Color.fromName('darkorange'); }
Color.darkorchid = function(){ return Color.fromName('darkorchid'); }
Color.darkred = function(){ return Color.fromName('darkred'); }
Color.darksalmon = function(){ return Color.fromName('darksalmon'); }
Color.darkseagreen = function(){ return Color.fromName('darkseagreen'); }
Color.darkslateblue = function(){ return Color.fromName('darkslateblue'); }
Color.darkslategray = function(){ return Color.fromName('darkslategray'); }
Color.darkturquoise = function(){ return Color.fromName('darkturquoise'); }
Color.darkviolet = function(){ return Color.fromName('darkviolet'); }
Color.deeppink = function(){ return Color.fromName('deeppink'); }
Color.deepskyblue = function(){ return Color.fromName('deepskyblue'); }
Color.dimgray = function(){ return Color.fromName('dimgray'); }
Color.dodgerblue = function(){ return Color.fromName('dodgerblue'); }
Color.feldspar = function(){ return Color.fromName('feldspar'); }
Color.firebrick = function(){ return Color.fromName('firebrick'); }
Color.floralwhite = function(){ return Color.fromName('floralwhite'); }
Color.forestgreen = function(){ return Color.fromName('forestgreen'); }
Color.fuchsia = function(){ return Color.fromName('fuchsia'); }
Color.gainsboro = function(){ return Color.fromName('gainsboro'); }
Color.ghostwhite = function(){ return Color.fromName('ghostwhite'); }
Color.gold = function(){ return Color.fromName('gold'); }
Color.goldenrod = function(){ return Color.fromName('goldenrod'); }
Color.gray = function(){ return Color.fromName('gray'); }
Color.green = function(){ return Color.fromName('green'); }
Color.greenyellow = function(){ return Color.fromName('greenyellow'); }
Color.honeydew = function(){ return Color.fromName('honeydew'); }
Color.hotpink = function(){ return Color.fromName('hotpink'); }
Color.indianred = function(){ return Color.fromName('indianred'); }
Color.indigo = function(){ return Color.fromName('indigo'); }
Color.ivory = function(){ return Color.fromName('ivory'); }
Color.khaki = function(){ return Color.fromName('khaki'); }
Color.lavender = function(){ return Color.fromName('lavender'); }
Color.lavenderblush = function(){ return Color.fromName('lavenderblush'); }
Color.lawngreen = function(){ return Color.fromName('lawngreen'); }
Color.lemonchiffon = function(){ return Color.fromName('lemonchiffon'); }
Color.lightblue = function(){ return Color.fromName('lightblue'); }
Color.lightcoral = function(){ return Color.fromName('lightcoral'); }
Color.lightcyan = function(){ return Color.fromName('lightcyan'); }
Color.lightgoldenrodyellow = function(){ return Color.fromName('lightgoldenrodyellow'); }
Color.lightgrey = function(){ return Color.fromName('lightgrey'); }
Color.lightgreen = function(){ return Color.fromName('lightgreen'); }
Color.lightpink = function(){ return Color.fromName('lightpink'); }
Color.lightsalmon = function(){ return Color.fromName('lightsalmon'); }
Color.lightseagreen = function(){ return Color.fromName('lightseagreen'); }
Color.lightskyblue = function(){ return Color.fromName('lightskyblue'); }
Color.lightslateblue = function(){ return Color.fromName('lightslateblue'); }
Color.lightslategray = function(){ return Color.fromName('lightslategray'); }
Color.lightsteelblue = function(){ return Color.fromName('lightsteelblue'); }
Color.lightyellow = function(){ return Color.fromName('lightyellow'); }
Color.lime = function(){ return Color.fromName('lime'); }
Color.limegreen = function(){ return Color.fromName('limegreen'); }
Color.linen = function(){ return Color.fromName('linen'); }
Color.magenta = function(){ return Color.fromName('magenta'); }
Color.maroon = function(){ return Color.fromName('maroon'); }
Color.mediumaquamarine = function(){ return Color.fromName('mediumaquamarine'); }
Color.mediumblue = function(){ return Color.fromName('mediumblue'); }
Color.mediumorchid = function(){ return Color.fromName('mediumorchid'); }
Color.mediumpurple = function(){ return Color.fromName('mediumpurple'); }
Color.mediumseagreen = function(){ return Color.fromName('mediumseagreen'); }
Color.mediumslateblue = function(){ return Color.fromName('mediumslateblue'); }
Color.mediumspringgreen = function(){ return Color.fromName('mediumspringgreen'); }
Color.mediumturquoise = function(){ return Color.fromName('mediumturquoise'); }
Color.mediumvioletred = function(){ return Color.fromName('mediumvioletred'); }
Color.midnightblue = function(){ return Color.fromName('midnightblue'); }
Color.mintcream = function(){ return Color.fromName('mintcream'); }
Color.mistyrose = function(){ return Color.fromName('mistyrose'); }
Color.moccasin = function(){ return Color.fromName('moccasin'); }
Color.navajowhite = function(){ return Color.fromName('navajowhite'); }
Color.navy = function(){ return Color.fromName('navy'); }
Color.oldlace = function(){ return Color.fromName('oldlace'); }
Color.olive = function(){ return Color.fromName('olive'); }
Color.olivedrab = function(){ return Color.fromName('olivedrab'); }
Color.orange = function(){ return Color.fromName('orange'); }
Color.orangered = function(){ return Color.fromName('orangered'); }
Color.orchid = function(){ return Color.fromName('orchid'); }
Color.palegoldenrod = function(){ return Color.fromName('palegoldenrod'); }
Color.palegreen = function(){ return Color.fromName('palegreen'); }
Color.paleturquoise = function(){ return Color.fromName('paleturquoise'); }
Color.palevioletred = function(){ return Color.fromName('palevioletred'); }
Color.papayawhip = function(){ return Color.fromName('papayawhip'); }
Color.peachpuff = function(){ return Color.fromName('peachpuff'); }
Color.peru = function(){ return Color.fromName('peru'); }
Color.pink = function(){ return Color.fromName('pink'); }
Color.plum = function(){ return Color.fromName('plum'); }
Color.powderblue = function(){ return Color.fromName('powderblue'); }
Color.purple = function(){ return Color.fromName('purple'); }
Color.red = function(){ return Color.fromName('red'); }
Color.rosybrown = function(){ return Color.fromName('rosybrown'); }
Color.royalblue = function(){ return Color.fromName('royalblue'); }
Color.saddlebrown = function(){ return Color.fromName('saddlebrown'); }
Color.salmon = function(){ return Color.fromName('salmon'); }
Color.sandybrown = function(){ return Color.fromName('sandybrown'); }
Color.seagreen = function(){ return Color.fromName('seagreen'); }
Color.seashell = function(){ return Color.fromName('seashell'); }
Color.sienna = function(){ return Color.fromName('sienna'); }
Color.silver = function(){ return Color.fromName('silver'); }
Color.skyblue = function(){ return Color.fromName('skyblue'); }
Color.slateblue = function(){ return Color.fromName('slateblue'); }
Color.slategray = function(){ return Color.fromName('slategray'); }
Color.snow = function(){ return Color.fromName('snow'); }
Color.springgreen = function(){ return Color.fromName('springgreen'); }
Color.steelblue = function(){ return Color.fromName('steelblue'); }
Color.tan = function(){ return Color.fromName('tan'); }
Color.teal = function(){ return Color.fromName('teal'); }
Color.thistle = function(){ return Color.fromName('thistle'); }
Color.tomato = function(){ return Color.fromName('tomato'); }
Color.turquoise = function(){ return Color.fromName('turquoise'); }
Color.violet = function(){ return Color.fromName('violet'); }
Color.violetred = function(){ return Color.fromName('violetred'); }
Color.wheat = function(){ return Color.fromName('wheat'); }
Color.white = function(){ return Color.fromName('white'); }
Color.whitesmoke = function(){ return Color.fromName('whitesmoke'); }
Color.yellow = function(){ return Color.fromName('yellow'); }
Color.yellowgreen = function(){ return Color.fromName('yellowgreen'); }
*/