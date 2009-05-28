/*
function errRangeSort(colors){
	function getErrRange(code){
		var rgb = Color.getRgbFromCode(code);
		var max = Math.max(rgb.r, rgb.g, rgb.b);
		var min = Math.min(rgb.r, rgb.g, rgb.b);
		return (max - min);
	}
	for (var i = 0; i < colors.length - 1; i++) {
		for (var n = i + 1; n < colors.length; n++) {
			if (getRgbAvg(colors[i]) == getRgbAvg(colors[n])) {
				if (getErrRange(colors[i]) > getErrRange(colors[n])) {
					var tmp = colors[i];
					colors[i] = colors[n];
					colors[n] = tmp;
				}
			}
		}
	}
	return colors;
}
*/


/*

function saturationSort(colors){
	function getErrRange(code){
		var rgb = Color.getRgbFromCode(code);
		var max = Math.max(rgb.r, rgb.g, rgb.b);
		var min = Math.min(rgb.r, rgb.g, rgb.b);
		return (max - min);
	}
	
	function getSaturation(code){
		var rgb = Color.getRgbFromCode(code);
		var xorRgb = {
			r:(255 ^ rgb.r),
			g:(255 ^ rgb.g),
			b:(255 ^ rgb.b)
		};
		
		var rSturn = Math.abs(rgb.r - xorRgb.r);
		var gSturn = Math.abs(rgb.g - xorRgb.g);
		var bSturn = Math.abs(rgb.b - xorRgb.b);
		
		return ((rSturn + gSturn + bSturn) / 3);
	}
	
	function getRgbAvg(code){
		var rgb = Color.getRgbFromCode(code);
		return ((rgb.r + rgb.g + rgb.b) / 3);
	}
	
	for (var i = 0; i < colors.length - 1; i++) {
		for (var n = i + 1; n < colors.length; n++) {
			if (getSaturation(colors[i]) > getSaturation(colors[n])) {
				var tmp = colors[i];
				colors[i] = colors[n];
				colors[n] = tmp;
			}
		}
	}
	
	for (var i = 0; i < colors.length - 1; i++) {
		for (var n = i + 1; n < colors.length; n++) {
			if (getSaturation(colors[i]) == getSaturation(colors[n])) {
				if (getRgbAvg(colors[i]) < getRgbAvg(colors[n])) {
					var tmp = colors[i];
					colors[i] = colors[n];
					colors[n] = tmp;
				}
			}
		}
	}
	
	for (var i = 0; i < colors.length - 1; i++) {
		for (var n = i + 1; n < colors.length; n++) {
			if (getSaturation(colors[i]) == getSaturation(colors[n])) {
				if (getErrRange(colors[i]) < getErrRange(colors[n])) {
					var tmp = colors[i];
					colors[i] = colors[n];
					colors[n] = tmp;
				}
			}
		}
	}
	
	return colors;
}
*/


//colors = saturationSort(colors);

/*
	var rgb = Color.getRgbFromCode("#003333");
	var xorRgb = {
		r:(255 ^ rgb.r),
		g:(255 ^ rgb.g),
		b:(255 ^ rgb.b)
	};
	
	alert(
		"Avg. : " + ((rgb.r + rgb.g + rgb.b) / 3) +
		"\nxorAvg. : " + ((xorRgb.r + xorRgb.g + xorRgb.b) / 3)
	);
*/


//colors = saturationSort(colors);
//colors = brightnessSort(colors);
//colors = errRangeSort(colors);

//colors = colorPartSort(colors, "r");
//colors = colorPartSort(colors, "g");
//colors = colorPartSort(colors, "b");



	//var color = Color.fromName("silver");
	//var color = Color.fromColorCode("#ffffff");

/*
	var color = Color.fromRgb(255, 0, 255);
	alert(
		"R : " + color.getR() +
		"\nG : " + color.getG() +
		"\nB : " + color.getB() +
		"\nCode : " + color.getCode() +
		"\nName : " + color.getName()
	);
*/



/*
	var rgb = Color.getRgbFromCode("#003333");
	alert(
		"R : " + rgb.r +
		"\nG : " + rgb.g +
		"\nB : " + rgb.b +
		"\nAvg. : " + (rgb.r + rgb.g + rgb.b) / 3
	);
*/



/*
function brightnessSort(colors){
	function getRgbAvg(code){
		var rgb = Color.getRgbFromCode(code);
		return ((rgb.r + rgb.g + rgb.b) / 3);
	}

	for (var i = 0; i < colors.length - 1; i++) {
		for (var n = i + 1; n < colors.length; n++) {
			if (getRgbAvg(colors[i]) < getRgbAvg(colors[n])) {
				var tmp = colors[i];
				colors[i] = colors[n];
				colors[n] = tmp;
			}
		}
	}
	return colors;
}
*/









function colorPartSort(colors, part){
	function getColorPart(code, part){
		var rgb = Color.getRgbFromCode(code);
		part = part.toLowerCase();
		switch (part) {
			case "r":
			case "red":
				return rgb.r;
				break;
			case "g":
			case "green":
				return rgb.g;
				break;
			case "b":
			case "blue":
				return rgb.b;
				break;
			default:
				return 0;
		}
	}
	
	function getRgbAvg(code){
		var rgb = Color.getRgbFromCode(code);
		return ((rgb.r + rgb.g + rgb.b) / 3);
	}
	
	for (var i = 0; i < colors.length - 1; i++) {
		for (var n = i + 1; n < colors.length; n++) {
			if (getRgbAvg(colors[i]) == getRgbAvg(colors[n]) && getRgbAvg(colors[i-1]) == getRgbAvg(colors[i])) {
				if (getColorPart(colors[i - 1], part) != getColorPart(colors[i], part)) {
					if (getColorPart(colors[i - 1], part) == getColorPart(colors[n], part)) {
						var tmp = colors[i];
						colors[i] = colors[n];
						colors[n] = tmp;
						continue;
					}
				}
			}
		}
	}
	return colors;
}



/*
var user_fonts = TextField.getFontList();
user_fonts.sort();
getURL('javascript:fontList("' + escape(user_fonts) + '")', '_self');

var fontList = function(user_fonts) {
    var obj = document.getElementById('font_getter'), fonts;
	
    if (typeof(user_fonts) != 'undefined') {
        fonts = unescape(user_fonts);
    } else if (typeof(obj.GetVariable) != 'undefined') {
        fonts = obj.GetVariable('/:user_fonts');
    };
	
    if(typeof(fonts) == 'string') fonts = fonts.split(',');
	
    return fonts;
};


var fonts = fontList();

for(var i = 0; i < fonts.length;i++){
	$("#webcolors-wrap").append(
		$("<div/>")
		.text(colors[i])
		.css({
			backgroundColor:colors[i],
			width:110,
			lineHeight:"30px",
			float:"left",
			margin:"5px",
			textAlign:"center"
			})
	);
}
*/
<object id="font_getter" name="font_getter" type="application/x-shockwave-flash" data="font_getter.swf" width="1" height="1">
	<param name="movie" value="font_getter.swf" />
</object>