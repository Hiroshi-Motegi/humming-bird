/*@cc_on 
var doc = document;
eval('var document = doc');
@*/

/**
 * Color
 */
var Color ={
	getKnownColors:function(){
		var kclst = Color.knownColor;
		var kcArr = [];
		for(var kc in kclst) kcArr.push(kclst[kc]);
		return kcArr;
	},
	getWebColors:function(){
		var hxs =["ff", "cc", "99", "66", "33", "00"];
		var wccs = []; //web color codes.
		
		for(var i = 0; i < hxs.length; i++){
			for(var n = 0; n < hxs.length; n++){
				for(var m = 0; m < hxs.length; m++){
					wccs.push("#" + hxs[i] + hxs[n] + hxs[m]);
				}
			}
		}
		return wccs;
	},
	knownColor:{
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
}


/**
 * font family
 */
var fonts = [
	"Aharoni",
	"Albany",
	"Amienne",
	"Andale Sans",
	"Andale Sans UI",
	"Andalus",
	"Angsana New",
	"AngsanaUPC",
	"Arabic Typesetting",
	"Arial",
	"Arial Black",
	"Arial Narrow",
	"Arial Unicode MS",
	"Arnprior",
	"Batang",
	"BatangChe",
	"Baveuse",
	"Berylium",
	"Biondi",
	"Bitstream Vera Sans",
	"Bitstream Vera Sans Mono",
	"Bitstream Vera Serif",
	"Blue Highway",
	"Blue Highway Condensed",
	"Blue Highway D Type",
	"Blue Highway Linocut",
	"Book Antiqua",
	"Bookman Old Style",
	"Bookshelf Symbol 7",
	"Boopee",
	"Broadway",
	"Browallia New",
	"BrowalliaUPC",
	"Burnstown Dam",
	"Byington",
	"Calibri",
	"Cambria",
	"Cambria Math",
	"Candara",
	"Carbon Block",
	"Catriel",
	"Century",
	"Century Gothic",
	"Comic Sans MS",
	"Consolas",
	"Constantia",
	"Corbel",
	"Cordia New",
	"CordiaUPC",
	"Courier New",
	"Credit Valley",
	"Cumberland",
	"DaunPenh",
	"David",
	"DFKai-SB",
	"DilleniaUPC",
	"DokChampa",
	"Dotum",
	"DotumChe",
	"Earwig Factory",
	"Estrangelo Edessa",
	"EucrosiaUPC",
	"Euphemia",
	"Euphorigenic S",
	"FangSong",
	"Franklin Gothic Medium",
	"FrankRuehl",
	"FreesiaUPC",
	"Garamond",
	"Gautami",
	"Georgia",
	"Gisha",
	"Gulim",
	"GulimChe",
	"Gungsuh",
	"GungsuhChe",
	"Heavy Heap",
	"HG Mincho Light J",
	"HG PゴシックB Sun",
	"HG P明朝L Sun",
	"HG ゴシックB Sun",
	"HG 明朝L Sun",
	"HGP創英角ｺﾞｼｯｸUB",
	"HGP創英角ﾎﾟｯﾌﾟ体",
	"HGP創英ﾌﾟﾚｾﾞﾝｽEB",
	"HGP教科書体",
	"HGP明朝B",
	"HGP明朝E",
	"HGP行書体",
	"HGPｺﾞｼｯｸE",
	"HGPｺﾞｼｯｸM",
	"HGS創英角ｺﾞｼｯｸUB",
	"HGS創英角ﾎﾟｯﾌﾟ体",
	"HGS創英ﾌﾟﾚｾﾞﾝｽEB",
	"HGS教科書体",
	"HGS明朝B",
	"HGS明朝E",
	"HGS行書体",
	"HGSｺﾞｼｯｸE",
	"HGSｺﾞｼｯｸM",
	"HG丸ｺﾞｼｯｸM-PRO",
	"HG創英角ｺﾞｼｯｸUB",
	"HG創英角ﾎﾟｯﾌﾟ体",
	"HG創英ﾌﾟﾚｾﾞﾝｽEB",
	"HG教科書体",
	"HG明朝B",
	"HG明朝E",
	"HG正楷書体-PRO",
	"HG行書体",
	"HGｺﾞｼｯｸE",
	"HGｺﾞｼｯｸM",
	"Hurry Up",
	"Huxtable",
	"Impact",
	"Imprint MT Shadow",
	"IrisUPC",
	"Iskoola Pota",
	"JasmineUPC",
	"KaiTi",
	"Kalinga",
	"Kartika",
	"Kidprint",
	"KodchiangUPC",
	"Kootenay",
	"Kredit",
	"Latha",
	"Leelawadee",
	"Levenim MT",
	"Ligurino",
	"Ligurino Condensed",
	"LilyUPC",
	"Lindsey",
	"Lucida Console",
	"Lucida Sans Unicode",
	"Malgun Gothic",
	"Mangal",
	"Marlett",
	"Microsoft Himalaya",
	"Microsoft JhengHei",
	"Microsoft Sans Serif",
	"Microsoft Uighur",
	"Microsoft YaHei",
	"Microsoft Yi Baiti",
	"MingLiU",
	"MingLiU-ExtB",
	"MingLiU_HKSCS",
	"MingLiU_HKSCS-ExtB",
	"Minya Nouvelle",
	"Miramonte",
	"Miriam",
	"Miriam Fixed",
	"Mongolian Baiti",
	"MoolBoran",
	"MS Outlook",
	"MS Reference Sans Serif",
	"MS Reference Specialty",
	"MS UI Gothic",
	"MT Extra",
	"Mufferaw",
	"MV Boli",
	"Narkisim",
	"Neuropol",
	"NSimSun",
	"Nyala",
	"OCRB",
	"Palace Script",
	"Palace Script MT",
	"Palatino Linotype",
	"Pericles",
	"Pericles Light",
	"Pescadero",
	"Planet Benson 2",
	"Plantagenet Cherokee",
	"PMingLiU",
	"PMingLiU-ExtB",
	"Pupcat",
	"Raavi",
	"Rod",
	"Segoe Print",
	"Segoe Script",
	"Segoe UI",
	"Sheffield",
	"Shruti",
	"SimHei",
	"Simplified Arabic",
	"Simplified Arabic Fixed",
	"SimSun",
	"SimSun-ExtB",
	"StarSymbol",
	"Stereofidelic",
	"Sybil Green",
	"Sylfaen",
	"Symbol",
	"Tahoma",
	"Tandelle",
	"Teen",
	"Teen Light",
	"Thorndale",
	"Times New Roman",
	"Traditional Arabic",
	"Trebuchet MS",
	"Tunga",
	"Velvenda Cooler",
	"Verdana",
	"Vrinda",
	"Waker",
	"Webdings",
	"Wingdings",
	"Wingdings 2",
	"Wingdings 3",
	"メイリオ",
	"ＭＳ ゴシック",
	"ＭＳ 明朝",
	"ＭＳ Ｐゴシック",
	"ＭＳ Ｐ明朝"
];



(function($) {
jQuery.extend({
	overlay: function(options, callback){
		var opt = jQuery.extend({
			id: 'overlay',
			bgColor: '#000000',
			opacity: 0.75,
			duration: 'normal',
			easing:'linear'
		}, options);
		
		if(document.getElementById(opt.id)) return false;
		
		var selector = '#' + opt.id;
		
		callback = jQuery.isFunction(options) ? options : (callback || function(){});
		
		if(jQuery.browser.msie && jQuery.browser.version < 7) jQuery('embed, object, select').css({ 'visibility' : 'hidden' });
		
		function _resizeWindow(){
			$(selector)
				.hide()
				.height($(document).height())
				.width($(document).width())
				.show();
		}
		
		$(window).bind('resize', _resizeWindow);
		
		$('<div/>').attr('id', opt.id).css({
			'position': 'absolute',
			'width': $(document).width(),
			'height': $(document).height(),
			'left': 0,
			'top': 0,
			'margin': 0,
			backgroundColor: opt.bgColor
		})
		.appendTo(document.body)
		.fadeTo(0, 0)
		.animate({opacity: opt.opacity}, opt.duration, opt.easing, callback);
	}
});
})(jQuery);


(function($) {
jQuery.fn.extend({
	positionCenter: function() {
		var win = jQuery(window);
		var winHeight = win.height();
		var winWidth = win.width();
		var scrollTop = win.scrollTop();
		var scrollLeft = win.scrollLeft();
		
		this.each(function(){
		  	var posStyle =  jQuery.css(this,"position");
			
			if(posStyle != "absolute" && posStyle != "fixed") {
				jQuery(this).css("position", "absolute");
				posStyle = jQuery.css(this,"position");
			}
			
			var thisHeight = jQuery(this).height() || 0;
			var thisWidth = jQuery(this).width() || 0;
			var top = Math.floor((winHeight - thisHeight) / 2);
			var left = Math.floor((winWidth - thisWidth) / 2);
			
			if (posStyle == "absolute") {
				top += scrollTop;
				left += scrollLeft;
			}
			
			jQuery(this).css({"top":top,"left":left});
		});
		
		return this;
	}
});
})(jQuery);


var cl = {
	effecting:false, //do animating.
	applyColorTarget:"background-color", //background-color or color(font color)
	prev_slctr:"#preview", //Preview Element Selecter
	
	createWebColorItems:function(){
		var wcs = Color.getWebColors();
		var itemClass = "color-item";
		var tbody = document.createElement("tbody");
		var table_id = "web-color-items-table";
		var table_class = "item-table";
		var tr;
		
		for(var i = 0;i < wcs.length;i++){
			if((i%12)==0){
				tr = document.createElement("tr");
				$(tbody).append(tr);
			}
			
			$(tr).append(
				$("<td/>")
				.attr({title:wcs[i], "class":itemClass}) //IEではclassは文字列でないと×
				.css({backgroundColor:wcs[i]})
				.data("color", {code:wcs[i], name:""})
				.append("<span>" + wcs[i] + "</span>")
			);
		}
		
		$("<table/>")
			.attr({"id":table_id,"class":table_class})
			.append(tbody)
			.appendTo("#wrap-web-color-items");
	},
	createKnownColorItems:function(){
		var kcs = Color.knownColor;
		var itemClass = "color-item";
		var tbody = document.createElement("tbody");
		var table_id= "known-color-items-table";
		var table_class= "item-table";
		var tr;
		var n = 0;
		
		for(var c in kcs){
			if((n%12)==0){
				tr = document.createElement("tr")
				$(tbody).append(tr);
			}
			
			$(tr).append(
				$("<td/>")
				.attr({title:c,"class":itemClass})
				.css({backgroundColor:kcs[c]})
				.data("color", {code:kcs[c], name:c})
				.append("<span>" + kcs[c] + "</span>")
			);
			
			n++;
		}
		
		$("<table/>")
			.attr({"id":table_id, "class":table_class})
			.append(tbody)
			.appendTo("#wrap-known-color-items");
			
	},
	createFontFamilyItems:function(){
		var item_class = "font-family-item";
		var table_id= "font-family-items-table";
		var table_class= "item-table";
		var tbody = document.createElement("tbody");
		var tr;
		
		for(var i = 0; i< fonts.length; i++){
			if((i%6)==0){
				tr = document.createElement("tr")
				$(tbody).append(tr);
			}

			$(tr).append(
				$("<td/>")
				.attr({title:fonts[i],"class":item_class})
				.data("family", {name:fonts[i]})
				.append("<span>" + fonts[i] + "</span>")
			);
		}
		
		$("<table/>")
			.attr({"id":table_id,"class":table_class})
			.append(tbody)
			.appendTo("#wrap-font-family-items");
		
		
		//-- bind click event action. --//
		var selector = "td." + item_class;
		$(selector).click(function(){
			var fndata = jQuery.data(this, "family").name;
			$(cl.prev_slctr).css({fontFamily:fndata});
			$("#current-font-family").text(fndata);
		});
		
	},
	bindClickColorItem:function(){
		var item_selector = "td.color-item";
		
		$(item_selector).bind("click", function(){
			var applyTarget = {
				bgcolor:"background-color",
				fontcolor:"color"
			}
			var tgt = cl.applyColorTarget;
			var code = $.data(this, "color").code;
			
			$(cl.prev_slctr).css(tgt, code);
			
			if(tgt == applyTarget.bgcolor){
				$("#current-bg-color").text(code);
			}else if(tgt == applyTarget.fontcolor ){
				$("#current-font-color").text(code);
			}else{
				cl.applyColorTarget == applyTarget.bgcolor;
				$("#current-bg-color").text(code);
				cl.effecting = true;
				$("#tgl-apply-color-string").stop().queue([])
					.animate({"top":"0px"},"fast",
					function(){cl.effecting = false;});
			}
		});
	},
	bindSelectApplyColor:function(){
		var selector = "#tgl-apply-color-string";
		var ph = $(selector).parent().height() + "px";
		var downRange = "+=" + ph;
		var upRange = "-=" + ph;
		var duration = "fast";
		var tgt = {back:"background-color", font:"color"}
		
		$(selector)
		.css({lineHeight:ph})
		.bind("click",function(){
			if(cl.effecting) return;
			cl.effecting = true;
			
			if (cl.applyColorTarget == tgt.back) {
				cl.applyColorTarget = tgt.font;
				$(this).stop().queue([])
					.animate({"top":upRange},duration,
					function(){cl.effecting = false;});
			}
			else if (cl.applyColorTarget == tgt.font){
				cl.applyColorTarget = tgt.back;
				$(this).stop().queue([])
					.animate({"top":downRange},duration,
					function(){cl.effecting = false;});
			}
			else{
				cl.applyColorTarget = tgt.back;
				$(this).stop().queue([])
					.animate({"top":"0px"},duration,
					function(){cl.effecting = false;});
			}
		});
	},
	bindSelectFontWeight:function(){	
		var selector = "#tgl-font-weight";
		var fw ={normal:"normal", bold:"bold"};
		var off_color = "#666";
		var on_color = "#ccc";
		var current = "#current-font-weight";
		
		$(selector).bind("click", function(){
			var current_fw = $(current).text();
			
			function setFontWeight(value){
				$(current).text(value);
				$(cl.prev_slctr).css("font-weight", value);
			}
			
			if (current_fw == fw.normal) {
				setFontWeight(fw.bold);
				$(this).css({
					"background":"url('ws_check.png') no-repeat left",
					"color":on_color
				});
			}
			else if (current_fw == fw.bold){
				setFontWeight(fw.normal);
				$(this).css({
					"background":"none",
					"color":off_color
				});
			}
			else{
				setFontWeight(fw.normal);
				$(this).css({
					"background":"none",
					"color":off_color
				});
			}
		})
		.css({"background":"none","color":off_color});
		
		//init
		$(current).text(fw.normal);
		$(cl.prev_slctr).css("font-weight", fw.normal);
	},
	bindSelectFontStyle:function(){
		var selector = "#tgl-font-style";
		var fs ={normal:"normal", italic:"italic"};
		var off_color = "#666";
		var on_color = "#ccc";
		var current = "#current-font-style";
		
		function setFontStyle(value){
			$(current).text(value);
			$(cl.prev_slctr).css("font-style", value);
		}
		
		$(selector).bind("click",function(){	
			var current_fs = $(current).text();	
			
			if (current_fs == fs.normal) {
				setFontStyle(fs.italic);
				$(this).css({
					"background":"url('ws_check.png') no-repeat left",
					"color":on_color
				});
			}
			else if (current_fs == fs.italic){
				setFontStyle(fs.normal);
				$(this).css({
					"background":"none",
					"color":off_color
				});
			}else{
				setFontStyle(fs.normal);
				$(this).css({
					"background":"none",
					"color":off_color
				});
			}
		})
		.css({"background":"none","color":off_color});
		
		//init
		$(current).text(fs.normal);
		$(cl.prev_slctr).css("font-style", fs.normal);
	},
	bindChangeFontSize:function(){
		$("#prev-font-size-select")
			.bind("change", function(){
				var fsize = $("option:selected",this).text() + "px";
			      $(cl.prev_slctr).css("font-size", fsize);
				  $("#current-font-size").text(fsize);
			})
			.trigger("change");
	},
	bindChangePrevTextArea:function(){
		var txtar_slctr = "#prev-textarea"; 
		
		$(txtar_slctr).bind("change",function(){
			$(cl.prev_slctr).empty();
			if($(this).val() == "") return;
			var str = $(this).val().split("\n");
			
			for(var i = 0; i < str.length;i++) {
				str[i] = (str[i] == "") ? "&nbsp;": str[i];
				$(cl.prev_slctr).append("<p>" + str[i] + "</p>");
			}
		}).trigger("change");
	},
	bindClickItemNavi:function(){
		var item ={
			kc:"known color",
			wc:"web color",
			ff:"font family"
		};
		
		var selectors ={
			kc:"#wrap-known-color-items",
			wc:"#wrap-web-color-items",
			ff:"#wrap-font-family-items"
		};
		
		var duration = "normal";
		
		$(".item-navi").bind("click", function(){
			if(cl.effecting) return;
			cl.effecting = true;
			
			$("a.item-navi").css({backgroundColor:"transparent"});
			$(this).css({backgroundColor:"#1a1a1a"});
			
			$("div.item-container:visible").slideUp(duration);
			
			var showTgt;
			
			switch($(this).text()){
				case item.kc:
					showTgt = selectors.kc;
					break;
				case item.wc:
					showTgt = selectors.wc;
					break;
				case item.ff:
					showTgt = selectors.ff;
					break;
				default:
					cl.effecting = false;
					return;
			}
			
			$(showTgt).slideDown(duration, function(){cl.effecting = false;});
		});
	},
	currentStyleInit:function(){
		var cs = {
			bgcolor:"#current-bg-color",
			color:"#current-font-color",
			family:"#current-font-family",
			weight:"#current-font-weight",
			style:"#current-font-style",
			size:"#current-font-size"
		}
		
		$(cs.bgcolor).text($("body").css("background-color").parseColorCode());
		$(cs.color).text($("body").css("color").parseColorCode());
		$(cs.family).text($("body").css("font-family"));
		$(cs.weight).text("normal");
		$(cs.style).text("normal");
		$(cs.size).text($("option:selected","#prev-font-size-select").text() + "px");
	},
	getCurrentStyleText:function(){
		var cs = {
			bgcolor:"#current-bg-color",
			color:"#current-font-color",
			family:"#current-font-family",
			weight:"#current-font-weight",
			style:"#current-font-style",
			size:"#current-font-size"
		}
		
		return "selector {\n" +
			"  background-color:" + $(cs.bgcolor).text() + ";\n" +
			"  color:" + $(cs.color).text() + ";\n" +
			"  font-family:\'" + $(cs.family).text() + "\';\n" +
			"  font-weight:" + $(cs.weight).text() + ";\n" +
			"  font-style:" + $(cs.style).text() + ";\n" +
			"  font-size:" + $(cs.size).text() + ";\n}";
	},
	getCssDialog:function(){
		
		var cssDialog = $("<div/>")
			.attr("id","css-text")
			.css({
				"width":350,
				"position":"absolute", //bodyに追加する前に設定しておかないとIEでPage sizeがこの要素の分だけ大きくなる。
				"border-color": "#c0c0c0",
				"border-style":"solid",
				"border-top-width":"4px",
				"border-right-width":"10px",
				"border-bottom-width":"4px",
				"border-left-width":"10px",
				textAlign:"center"
			});
		
		var txtarea = $("<textarea/>")
			.attr({"id":"css-txtr","rows":jQuery.browser.msie ? 9 : 8})
			.css({
				"width":"80%",
				color:"#c0c0c0",
				"margin":"10px",
				"backgroundColor":"#333",
				"border":"2px solid #c0c0c0",
				"font-size":"16px",
				"overflow":"auto",
				"font-family":$("body").css("font-family")
			})
			.bind("click",function(event){
				event.stopPropagation();
			})
			.appendTo(cssDialog);
			
		$(txtarea).val(cl.getCurrentStyleText());
		
		return cssDialog;
	},
	showCssText:function(){
		var cssDlg = cl.getCssDialog();	
		var _id = "ct_overlay";
		var selector = "#" + _id;
		
		$.overlay({id:_id},function(){			
			$(cssDlg)
				.appendTo(document.body)
				.positionCenter()
				.children(":first").focus();
		});
		
		function _removeThis(){
			$(cssDlg).remove();
			$(window).unbind('resize');
			$(document).unbind('keydown');
			$(selector).stop(true).animate({opacity: 0}, "normal", "swing", function(){ 
				if(jQuery.browser.msie && jQuery.browser.version < 7) $('embed, object, select').css({ 'visibility' : 'visible' });
				$(this).remove();
			});
		}
		
		$(selector).bind("click", function(e){
			_removeThis();
			e.stopPropagation();
		});
		
		$(document).bind('keydown', function(e){
			var _keycode = (e == null) ? event.keyCode : e.which;
			if (_keycode == 27) _removeThis();
			e.stopPropagation();
		});
		
	},
	bindClickShowCss:function(){
		$("#show-css").bind("click", function(){
			cl.showCssText();
		});
	},
	init:function(){
		//三つでセット
		cl.createWebColorItems();
		cl.createKnownColorItems();
		cl.bindClickColorItem();
		
		cl.bindChangePrevTextArea();
		cl.bindSelectApplyColor();
		cl.bindSelectFontWeight();
		cl.bindSelectFontStyle();
		cl.bindChangeFontSize();
		cl.createFontFamilyItems();
		cl.bindClickItemNavi();
		cl.currentStyleInit();
		cl.bindClickShowCss();
		
		
		//preview text init.
		$("#prev-textarea").val("Sample Text\nThe quick brown fox jumps over the lazy dog.");
		$("#prev-textarea").change();
		
		//show item init.
		$("div.item-container").slideUp(0);
		$("div.item-container:first").slideDown(0);
		
		//item navi init. 
		$(".item-navi:first").css({backgroundColor:"#1a1a1a"});
	}
};




String.prototype.parseColorCode = function(){
	var result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(this);
	//IEの場合、rgb(num,num,num)という形で返されるのでこれをカラーコードに変換する
	return result ? ((((1 << 8) + parseInt(result[1]) << 8) + parseInt(result[2]) << 8) + parseInt(result[3])).toString(16).replace(/^1/, '#') : String(this);
}