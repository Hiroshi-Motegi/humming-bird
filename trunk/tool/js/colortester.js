(function($){
$.getWebColors = function(){
	var hxs = ['ff', 'cc', '99', '66', '33', '00'], len = hxs.length, wccs = [];
	
	for (var i = 0; i < len; i++) {
		for (var n = 0; n < len; n++) {
			for (var m = 0; m < len; m++) {
				wccs.push('#' + hxs[i] + hxs[n] + hxs[m]);
			}
		}
	}
	return wccs;
}

$.createItemTable = function(slctrPart, colNum, data, callback){

	var tableClass = 'item-table', itemClass = slctrPart + '-item', $tbody = $('<tbody>'), $tr;
	
	if ($.isArray(data)) {
		for (var i = 0, j = data.length; i < j; i++) {
		
			if ((i % colNum) == 0) {
				$tr = $('<tr>');
				$tr.appendTo($tbody);
			}
			
			$tr.append(callback.call(this, data[i], itemClass));
		}
	}
	else {
		var n = 0;
		for (var key in data) {
			if ((n++ % colNum) == 0) 
				$tr = $('<tr>').appendTo($tbody);
			
			$tr.append(callback.call(this, key, $.parseColorCode(data[key]), itemClass));
		}
	}
	
	$('<table>').attr('id', slctrPart + '-table').addClass(tableClass).append($tbody).appendTo('#wrap-' + slctrPart);
	
}

$.makeThreeTables = function(){
	
	var fonts = ["Aharoni", "Albany", "Amienne", "Andale Sans", "Andale Sans UI", "Andalus", "Angsana New", "AngsanaUPC", "Arabic Typesetting", "Arial", "Arial Black", "Arial Narrow", "Arial Unicode MS", "Arnprior", "Batang", "BatangChe", "Baveuse", "Berylium", "Biondi", "Bitstream Vera Sans", "Bitstream Vera Sans Mono", "Bitstream Vera Serif", "Blue Highway", "Blue Highway Condensed", "Blue Highway D Type", "Blue Highway Linocut", "Book Antiqua", "Bookman Old Style", "Bookshelf Symbol 7", "Boopee", "Broadway", "Browallia New", "BrowalliaUPC", "Burnstown Dam", "Byington", "Calibri", "Cambria", "Cambria Math", "Candara", "Carbon Block", "Catriel", "Century", "Century Gothic", "Comic Sans MS", "Consolas", "Constantia", "Corbel", "Cordia New", "CordiaUPC", "Courier New", "Credit Valley", "Cumberland", "DaunPenh", "David", "DFKai-SB", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Earwig Factory", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Euphorigenic S", "FangSong", "Franklin Gothic Medium", "FrankRuehl", "FreesiaUPC", "Garamond", "Gautami", "Georgia", "Gisha", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Heavy Heap", "HG Mincho Light J", "HG PゴシックB Sun", "HG P明朝L Sun", "HG ゴシックB Sun", "HG 明朝L Sun", "HGP創英角ｺﾞｼｯｸUB", "HGP創英角ﾎﾟｯﾌﾟ体", "HGP創英ﾌﾟﾚｾﾞﾝｽEB", "HGP教科書体", "HGP明朝B", "HGP明朝E", "HGP行書体", "HGPｺﾞｼｯｸE", "HGPｺﾞｼｯｸM", "HGS創英角ｺﾞｼｯｸUB", "HGS創英角ﾎﾟｯﾌﾟ体", "HGS創英ﾌﾟﾚｾﾞﾝｽEB", "HGS教科書体", "HGS明朝B", "HGS明朝E", "HGS行書体", "HGSｺﾞｼｯｸE", "HGSｺﾞｼｯｸM", "HG丸ｺﾞｼｯｸM-PRO", "HG創英角ｺﾞｼｯｸUB", "HG創英角ﾎﾟｯﾌﾟ体", "HG創英ﾌﾟﾚｾﾞﾝｽEB", "HG教科書体", "HG明朝B", "HG明朝E", "HG正楷書体-PRO", "HG行書体", "HGｺﾞｼｯｸE", "HGｺﾞｼｯｸM", "Hurry Up", "Huxtable", "Impact", "Imprint MT Shadow", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KaiTi", "Kalinga", "Kartika", "Kidprint", "KodchiangUPC", "Kootenay", "Kredit", "Latha", "Leelawadee", "Levenim MT", "Ligurino", "Ligurino Condensed", "LilyUPC", "Lindsey", "Lucida Console", "Lucida Sans Unicode", "Malgun Gothic", "Mangal", "Marlett", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft Sans Serif", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Minya Nouvelle", "Miramonte", "Miriam", "Miriam Fixed", "Mongolian Baiti", "MoolBoran", "MS Outlook", "MS Reference Sans Serif", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "Mufferaw", "MV Boli", "Narkisim", "Neuropol", "NSimSun", "Nyala", "OCRB", "Palace Script", "Palace Script MT", "Palatino Linotype", "Pericles", "Pericles Light", "Pescadero", "Planet Benson 2", "Plantagenet Cherokee", "PMingLiU", "PMingLiU-ExtB", "Pupcat", "Raavi", "Rod", "Segoe Print", "Segoe Script", "Segoe UI", "Sheffield", "Shruti", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "StarSymbol", "Stereofidelic", "Sybil Green", "Sylfaen", "Symbol", "Tahoma", "Tandelle", "Teen", "Teen Light", "Thorndale", "Times New Roman", "Traditional Arabic", "Trebuchet MS", "Tunga", "Velvenda Cooler", "Verdana", "Vrinda", "Waker", "Webdings", "Wingdings", "Wingdings 2", "Wingdings 3", "メイリオ", "ＭＳ ゴシック", "ＭＳ 明朝", "ＭＳ Ｐゴシック", "ＭＳ Ｐ明朝"];
	
	var tParams = {
		'named-color': {
			colNum:7,
			data:$.namedColors,
			callback: function(c, cc, cls){
				return $('<td>')
					.attr('title', c)
					.addClass(cls)
					.css({backgroundColor: cc})
					.data('color', {code:cc, name:c})
					.append('<span>' + c + '</span>');
			}
		},
		'web-color': {
			colNum:16,
			data:$.getWebColors(),
			callback: function(cc, cls){
				return $('<td>')
					.attr('title', cc)
					.addClass(cls)
					.css({backgroundColor: cc})
					.data('color', { code: cc })
					.append('<span>' + cc + '</span>');
			}
		},
		'font-family': {
			colNum: 6,
			data: fonts,
			callback: function(f, cls){
				return $('<td>')
					.attr('title', f)
					.addClass(cls)
					.data('family', {name:f})
					.append('<span>' + f + '</span>');
			}
		}
	};
	
	for (var key in tParams){
		$.createItemTable(key,
			tParams[key].colNum,
			tParams[key].data,
			tParams[key].callback);
	}
}

})(jQuery);



var cl = {
	effecting:false, //animating.
	applyAttr:'background-color', //background-color or color(font color)
	prev_slctr:"#preview", //Preview Element Selecter

	bindClickFontFamilyItem:function(){
		var attrKey = 'font-family';
		$('td.' + attrKey + '-item').click(function(){
			var fndata = jQuery.data(this, 'family').name;
			$(cl.prev_slctr).css({fontFamily: fndata});
			$('#current-' + attrKey).text(fndata);
		});
	},
	bindClickColorItem:function(){
		var
		item_selector = 'td.web-color-item,td.named-color-item',
		attrKey = {
			'background-color':'bg-color',
			'color':'font-color'
		};
		
		$(item_selector).click( function(){
			
			var
			attr = cl.applyAttr,
			colorCode = $.data(this, 'color').code;
			
			if (attr == 'background-color' || attr == 'color' ) {
				//プレビューエレメントに色を設定
				$(cl.prev_slctr).css(attr, colorCode);
				//設定した色(カラーコード)を表示
				$('#current-' + attrKey[attr]).text(colorCode);
			}
			else {
				cl.applyAttr == 'background-color';
				$('#current-bg-color').text(code);
				
				cl.effecting = true;
				
				$('#tgl-apply-color-string')
					.stop(true).animate({
						top: '0px'
					}, 'fast', function(){
						cl.effecting = false;
					});
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
			
			if (cl.applyAttr == tgt.back) {
				cl.applyAttr = tgt.font;
				$(this).stop().queue([])
					.animate({"top":upRange},duration,
					function(){cl.effecting = false;});
			}
			else if (cl.applyAttr == tgt.font){
				cl.applyAttr = tgt.back;
				$(this).stop().queue([])
					.animate({"top":downRange},duration,
					function(){cl.effecting = false;});
			}
			else{
				cl.applyAttr = tgt.back;
				$(this).stop().queue([])
					.animate({"top":"0px"},duration,
					function(){cl.effecting = false;});
			}
		});
	},
	bindSelectFontWeight:function(){	
		var
		evName = 'fs-change',
		key = 'font-weight',
		$fw = $('#tgl-' + key);
		
		$fw.click(function(){
			var changeData = {'normal':'bold', 'bold':'normal'};
			$.data(this, key, changeData[$.data(this, key)]);
			$(this).trigger(evName, $.data(this, key));
		});
		
		$fw.bind(evName, function(elm, fontWeight){
			var
			bg = { 'normal':'none', 'bold':'url(\'./img/ws_check.png\') no-repeat left' },
			color ={ 'normal':'#666', 'bold':'#ccc' };
			
			$('#current-' + key).text(fontWeight);
			$(cl.prev_slctr).css(key, fontWeight);
			$(this).css({
				'background':bg[fontWeight],
				'color':color[fontWeight]
			});
		});
		
		//init
		$.data($fw.get(0), key,'normal');
		$fw.trigger(evName, $.data($fw.get(0), key));
	},
	
	bindSelectFontStyle:function(){	
		var
		evName = 'fs-change',
		key = 'font-style',
		$fs = $('#tgl-' + key);
		
		$fs.click(function(){
			var changeData = {'normal':'italic', 'italic':'normal'};
			$.data(this, key, changeData[$.data(this, key)]);
			$(this).trigger(evName, $.data(this, key));
		});
		
		$fs.bind(evName, function(elm, fontStyle){
			var
			bg = { 'normal':'none', 'italic':'url(\'./img/ws_check.png\') no-repeat left' },
			color ={ 'normal':'#666', 'italic':'#ccc' };
			
			$('#current-' + key).text(fontStyle);
			$(cl.prev_slctr).css(key, fontStyle);
			$(this).css({
				'background':bg[fontStyle],
				'color':color[fontStyle]
			});
		});
		
		//init
		$.data($fs.get(0), key,'normal');
		$fs.trigger(evName, $.data($fs.get(0), key));
	},
	
	bindChangeFontSize:function(){
		$('#prev-font-size-select').change(function(){
			var fsize = $('option:selected',this).text() + 'px';
		      $(cl.prev_slctr).css('font-size', fsize);
			  $('#current-font-size').text(fsize);
		}).trigger('change');
	},
	
	strEscape:function(s){
		return (s || '').replace(/&/g, '&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g, '&#39;').replace(/\n/g, '\\n').replace(/ /g, '&nbsp;');
		//.replace(/\\/g, '\\\\')
	},
	
	bindChangePrevTextArea:function(){
		$('#styles-textarea').change(function(){
			$(cl.prev_slctr).empty();
			if(!$(this).val()) return;
			var str = $(this).val().split('\n');
			
			for (var i = 0; i < str.length; i++)
				str[i] = str[i] ? cl.strEscape(str[i]) : '&nbsp;';
			$(cl.prev_slctr).append('<p>' + str.join('</p><p>') + '</p>');
			
		}).trigger('change');
	},
	bindClickItemNavi:function(){
		var selectors ={
			'named-color':"#wrap-named-color",
			'web-color':"#wrap-web-color",
			'font-family':"#wrap-font-family"
		};
		
		$('.item-navi').click( function(){
			$(this).blur();
			if(cl.effecting) return;
			cl.effecting = true;
			
			$("a.item-navi").css({backgroundColor:"transparent"});
			$(this).css({backgroundColor:"#1a1a1a"});
			
			$('div.item-container:visible').slideUp(400);
			$(selectors[$(this).text()]).slideDown(400,
				function(){
					cl.effecting = false;
				});
		});
	},
	cs:{
		'background-color':"#current-bg-color",
		'color':"#current-font-color",
		'font-family':"#current-font-family",
		'font-weight':"#current-font-weight",
		'font-style':"#current-font-style",
		'font-size':"#current-font-size"
	},
	currentStyleInit:function(){
		var cs = cl.cs, $body = $('body');

		$(cs['background-color']).text( $.parseColorCode( $.getRGB( $body.css('background-color') ) ) );
		$(cs['color']).text( $.parseColorCode( $.getRGB( $body.css('color') ) ) );
		$(cs['font-family']).text($body.css('font-family'));
		$(cs['font-weight']).text('normal');
		$(cs['font-style']).text('normal');
		$(cs['font-size']).text($('option:selected','#prev-font-size-select').text() + 'px');
	},
	getCurrentStyleText:function(){
		var cs = cl.cs, str = [];
		for(var i in cs)
			str.push(i + ':' + $(cs[i]).text());
		return 'selector {\n\t' + str.join(';\n\t') + ';\n}';
	},
	getCssDialog:function(){
		var cssDialog = $('<div>')
			.attr('id','css-text')
			.css({
				width:350,
				position:'absolute', //bodyに追加する前に設定しておかないとIEでPage sizeがこの要素の分だけ大きくなる。
				borderColor: '#c0c0c0',
				borderStyle:'solid',
				borderTopWidth:'4px',
				borderRightWidth:'10px',
				borderBottomWidth:'4px',
				borderLeftWidth:'10px',
				textAlign:'center'
			});
		
		var txtarea = $('<textarea>')
			.attr({
				'id':'css-txtr',
				'rows':$.browser.msie ? 9 : 8
				})
			.css({
				width:'80%',
				color:'#c0c0c0',
				margin:'10px',
				backgroundColor:'#333',
				border:'2px solid #c0c0c0',
				fontSize:'16px',
				overflow:'auto',
				fontFamily:$('body').css('font-family')
			})
			.click(function(event){
				event.stopPropagation();
			})
			.appendTo(cssDialog);
			
		$(txtarea).val(cl.getCurrentStyleText());
		
		return cssDialog;
	},
	showCssText:function(){
		var cssDlg = cl.getCssDialog();	
		var overlayID = 'ct_overlay';
		var selector = '#' + overlayID;
		
		$.overlay.show({id:overlayID},function(){			
			$(cssDlg)
				.appendTo(document.body)
				.positionCenter()
				.find(':first').focus()
				.keydown(function(e){
					e.stopPropagation();
				});
		});
		
		$($.overlay.selector).bind($.overlay.eventKey, function(){
			$(cssDlg).remove();
			$.overlay.hide();
		});
	}
};




jQuery(function($){

	$.makeThreeTables();
	cl.bindClickColorItem();
	cl.bindClickFontFamilyItem();
	
	cl.bindChangePrevTextArea();
	cl.bindSelectApplyColor();
	cl.bindSelectFontWeight();
	cl.bindSelectFontStyle();
	cl.bindChangeFontSize();
	cl.bindClickItemNavi();
	cl.currentStyleInit();
	
	$('#show-css').click(function(){
		cl.showCssText();
	});
	
	
	//preview text init.
	$('#styles-textarea')
		.val('Sample Text\nThe quick brown fox jumps over the lazy dog.')
		.change();
	
	//item navi init. 
	$('.item-navi:first').css({backgroundColor:'#1a1a1a'});
	
	$('#this-title').text(document.title);
	
	
	$.extend($.my.title,{
		ja: 'color and font style tester Beta',
		en: 'color and font style tester β'
	});
	$.my.ver = '1.1';
	
	$.setTitle($.my.title.en, $.my.ver);
	$.showLastModDate();
	
});