(function($){
	$.extend({
		//animating.
		effecting: false,
		//background-color or color(font color)
		applyAttr: 'background-color',
		//Preview Element Selecter
		prevSlctr: '#preview',
		
		getWebColors: function(){
			var hxs = ['ff', 'cc', '99', '66', '33', '00'], len = hxs.length, wccs = [];
			
			for (var i = 0; i < len; i++) {
				for (var n = 0; n < len; n++) {
					for (var m = 0; m < len; m++) {
						wccs.push('#' + hxs[i] + hxs[n] + hxs[m]);
					}
				}
			}
			return wccs;
		},
		
		createItemTable: function(slctrPart, colNum, data, callback){
		
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
			
		},
		
		makeThreeTables: function(){
		
			var fonts = ["Aharoni", "Albany", "Amienne", "Andale Sans", "Andale Sans UI", "Andalus", "Angsana New", "AngsanaUPC", "Arabic Typesetting", "Arial", "Arial Black", "Arial Narrow", "Arial Unicode MS", "Arnprior", "Batang", "BatangChe", "Baveuse", "Berylium", "Biondi", "Bitstream Vera Sans", "Bitstream Vera Sans Mono", "Bitstream Vera Serif", "Blue Highway", "Blue Highway Condensed", "Blue Highway D Type", "Blue Highway Linocut", "Book Antiqua", "Bookman Old Style", "Bookshelf Symbol 7", "Boopee", "Broadway", "Browallia New", "BrowalliaUPC", "Burnstown Dam", "Byington", "Calibri", "Cambria", "Cambria Math", "Candara", "Carbon Block", "Catriel", "Century", "Century Gothic", "Comic Sans MS", "Consolas", "Constantia", "Corbel", "Cordia New", "CordiaUPC", "Courier New", "Credit Valley", "Cumberland", "DaunPenh", "David", "DFKai-SB", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Earwig Factory", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Euphorigenic S", "FangSong", "Franklin Gothic Medium", "FrankRuehl", "FreesiaUPC", "Garamond", "Gautami", "Georgia", "Gisha", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Heavy Heap", "HG Mincho Light J", "HG PゴシックB Sun", "HG P明朝L Sun", "HG ゴシックB Sun", "HG 明朝L Sun", "HGP創英角ｺﾞｼｯｸUB", "HGP創英角ﾎﾟｯﾌﾟ体", "HGP創英ﾌﾟﾚｾﾞﾝｽEB", "HGP教科書体", "HGP明朝B", "HGP明朝E", "HGP行書体", "HGPｺﾞｼｯｸE", "HGPｺﾞｼｯｸM", "HGS創英角ｺﾞｼｯｸUB", "HGS創英角ﾎﾟｯﾌﾟ体", "HGS創英ﾌﾟﾚｾﾞﾝｽEB", "HGS教科書体", "HGS明朝B", "HGS明朝E", "HGS行書体", "HGSｺﾞｼｯｸE", "HGSｺﾞｼｯｸM", "HG丸ｺﾞｼｯｸM-PRO", "HG創英角ｺﾞｼｯｸUB", "HG創英角ﾎﾟｯﾌﾟ体", "HG創英ﾌﾟﾚｾﾞﾝｽEB", "HG教科書体", "HG明朝B", "HG明朝E", "HG正楷書体-PRO", "HG行書体", "HGｺﾞｼｯｸE", "HGｺﾞｼｯｸM", "Hurry Up", "Huxtable", "Impact", "Imprint MT Shadow", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KaiTi", "Kalinga", "Kartika", "Kidprint", "KodchiangUPC", "Kootenay", "Kredit", "Latha", "Leelawadee", "Levenim MT", "Ligurino", "Ligurino Condensed", "LilyUPC", "Lindsey", "Lucida Console", "Lucida Sans Unicode", "Malgun Gothic", "Mangal", "Marlett", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft Sans Serif", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Minya Nouvelle", "Miramonte", "Miriam", "Miriam Fixed", "Mongolian Baiti", "MoolBoran", "MS Outlook", "MS Reference Sans Serif", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "Mufferaw", "MV Boli", "Narkisim", "Neuropol", "NSimSun", "Nyala", "OCRB", "Palace Script", "Palace Script MT", "Palatino Linotype", "Pericles", "Pericles Light", "Pescadero", "Planet Benson 2", "Plantagenet Cherokee", "PMingLiU", "PMingLiU-ExtB", "Pupcat", "Raavi", "Rod", "Segoe Print", "Segoe Script", "Segoe UI", "Sheffield", "Shruti", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "StarSymbol", "Stereofidelic", "Sybil Green", "Sylfaen", "Symbol", "Tahoma", "Tandelle", "Teen", "Teen Light", "Thorndale", "Times New Roman", "Traditional Arabic", "Trebuchet MS", "Tunga", "Velvenda Cooler", "Verdana", "Vrinda", "Waker", "Webdings", "Wingdings", "Wingdings 2", "Wingdings 3", "メイリオ", "ＭＳ ゴシック", "ＭＳ 明朝", "ＭＳ Ｐゴシック", "ＭＳ Ｐ明朝"];
			var keys = ['named-color', 'web-color', 'font-family'];
			var tParams = {};
			
			tParams[keys[0]] = {
				colNum: 1,
				data: $.namedColors,
				callback: function(c, cc, cls){
					return $('<td>').attr('title', c).addClass(cls).css({
						backgroundColor: cc
					}).data('color', {
						code: cc,
						name: c
					}).append('<span>' + c + '</span>');
				}
			};
			
			tParams[keys[1]] = {
				colNum: 2,
				data: $.getWebColors(),
				callback: function(cc, cls){
					return $('<td>').attr('title', cc).addClass(cls).css({
						backgroundColor: cc
					}).data('color', {
						code: cc
					}).append('<span>' + cc + '</span>');
				}
			};
			
			tParams[keys[2]] = {
				colNum: 1,
				data: fonts,
				callback: function(f, cls){
					return $('<td>').attr('title', f).addClass(cls).data('font-family', {
						name: f
					}).append('<span>' + f + '</span>');
				}
			};
			
			for (var key in tParams) {
				if (tParams.hasOwnProperty(key)) 
					$.createItemTable(key, tParams[key].colNum, tParams[key].data, tParams[key].callback);
			}
			
			$.bindClickColorItem();
			$.bindClickFontFamilyItem();
		},
		
		bindClickColorItem: function(){
			var keys = ['web-color', 'named-color'], slctr = ['td.' + keys[0] + '-item', 'td.' + keys[1] + '-item'].join(',');
			
			$(slctr).click(function(){
				var attr = $.applyAttr, colorCode = $.data(this, 'color').code;
				
				if (attr != 'background-color' && attr != 'color') {
					attr = $.applyAttr = 'background-color';
					$('#apply-attr-inner').css({
						top: 0
					});
				}
				
				$($.prevSlctr).trigger('changeStyle', {
					'attr': attr,
					'val': colorCode
				});
				
			});
			
			$($.prevSlctr).trigger('changeStyle', {
				'attr': 'background-color',
				'val': '#333333'
			});
			$($.prevSlctr).trigger('changeStyle', {
				'attr': 'color',
				'val': '#cccccc'
			});
		},
		
		
		bindClickFontFamilyItem: function(){
			var key = 'font-family';
			
			$('td.' + key + '-item').click(function(){
				$($.prevSlctr).trigger('changeStyle', {
					'attr': key,
					'val': $.data(this, key).name
				});
			});
			
			$($.prevSlctr).trigger('changeStyle', {
				'attr': key,
				'val': 'Tahoma'
			});
		},
		
		
		bindStyleButtonEvent: function(key, attrVal){
		
			var evKey = key + '-change', $t = $('#tgl-' + key), changeValue = {}, bg = {}, colors = {};
			
			changeValue[attrVal[0]] = attrVal[1];
			changeValue[attrVal[1]] = attrVal[0];
			
			bg[attrVal[0]] = 'none';
			bg[attrVal[1]] = 'url(\'./img/ws_check.png\') no-repeat left';
			
			colors[attrVal[0]] = '#666';
			colors[attrVal[1]] = '#ccc';
			
			
			$t.click(function(){
				var changedValue = changeValue[$.data(this, key)];
				$.data(this, key, changedValue);
				$(this).trigger(evKey, changedValue);
				return false;
			});
			
			$t.bind(evKey, function(elm, styleVal){
				$(this).css({
					'background': bg[styleVal],
					'color': colors[styleVal]
				});
				
				$($.prevSlctr).trigger('changeStyle', {
					'attr': key,
					'val': styleVal
				});
			});
			
			
			//init
			var _default = 'normal';
			$.data($t.get(0), key, _default);
			$t.trigger(evKey, $.data($t.get(0), key));
		},
		
		
		
		bindSelectApplyAttr: function(){
		
			var $t = $('#apply-attr-inner'), parentHeight = $t.parent().height(), downRange = '+=' + parentHeight + 'px', upRange = '-=' + parentHeight + 'px', applyToggle = {
				'color': 'background-color',
				'background-color': 'color'
			};
			
			$t.css({
				lineHeight: parentHeight + 'px',
				top: 0
			}).click(function(){
				if ($.effecting) 
					return;
				
				$.effecting = true;
				
				$.applyAttr = applyToggle[$.applyAttr];
				var topVal;
				
				switch ($.applyAttr) {
					case 'background-color':
						topVal = downRange;
						break;
					case 'color':
						topVal = upRange;
						break;
					default:
						topVal = 0;
						$.applyAttr = 'background-color';
						break;
				}
				
				$(this).stop(true).animate({
					top: topVal
				}, 'fast', function(){
					$.effecting = false;
				});
				
			});
		},
		
		
		bindChangeFontSize: function(){
			var key = 'font-size';
			$('#' + key + '-select').change(function(){
				var fsize = $('option:selected', this).val() + 'px';
				$($.prevSlctr).trigger('changeStyle', {
					attr: key,
					val: fsize
				});
			}).trigger('change', this);
		},
		
		
		bindPrevierwChangeStyle: function(){
			$($.prevSlctr).bind('changeStyle', function(elm, prm){
				var o = {};
				o[prm['attr']] = prm['val'];
				
				//プレビューエレメントに色を設定
				$(this).css(o);
				//設定した色(カラーコード)を表示
				$('#current-' + prm.attr).text(prm.val);
			});
		},
		
		bindChangePrevTextArea: function(){
		
			function strEscape(s){
				return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\n/g, '\\n').replace(/ /g, '&nbsp;');
				//.replace(/\\/g, '\\\\')
			}
			
			$('#styles-textarea').val('Sample Text\nThe quick brown fox jumps over the lazy dog.').change(function(){
				$($.prevSlctr).empty();
				if (!$(this).val()) 
					return;
				var str = $(this).val().split('\n');
				
				for (var i = 0; i < str.length; i++) 
					str[i] = str[i] == '' ? '&nbsp;' : strEscape(str[i]);
				$($.prevSlctr).append('<p>' + str.join('</p><p>') + '</p>');
				
			}).trigger('change');
		},
		
		bindClickItemNavi: function(){
			$('a.navi-item').click(function(){
				$(this).blur();
				
				if ($.effecting) 
					return;
				
				$.effecting = true;
				
				$('a.navi-item.current').removeClass('current');
				$(this).addClass('current');
				
				$('div.item-container:visible').horizSlideClose(400);
				
				$('#wrap-' + $(this).text()).horizSlideOpen(400, function(){
					$.effecting = false;
				});
			}).filter(':first').trigger('click');
		},
		
		
		getCssDialog: function(){
		
			var $cssDialog = $('<div>').attr('id', 'css-text').css({
				borderColor: '#c0c0c0',
				borderStyle: 'solid',
				borderTopWidth: '4px',
				borderRightWidth: '10px',
				borderBottomWidth: '4px',
				borderLeftWidth: '10px',
				position: 'absolute', //bodyに追加する前に設定しておかないとIEでPage sizeがこの要素の分だけ大きくなる。
				textAlign: 'center',
				width: 350
			}).click(function(event){
				event.stopPropagation();
			});
			
			var $txtarea = $('<textarea>').attr({
				'id': 'css-txtr',
				'rows': $.browser.msie ? 9 : 8
			}).css({
				backgroundColor: '#333',
				border: '2px solid #c0c0c0',
				color: '#fff',
				fontFamily: 'Tahoma',
				fontSize: '16px',
				lineHeight: '20px',
				margin: '10px',
				overflow: 'auto',
				width: '80%'
			}).focus(function(){
				$(this).select();
			}).click(function(event){
				event.stopPropagation();
			}).keydown(function(e){
				e.stopPropagation();
			}).val((function(){
				var cs = ['background-color', 'color', 'font-family', 'font-size', 'font-style', 'font-weight'], str = [];
				for (var i = 0; i < cs.length; i++) 
					str.push(cs[i] + ':' + $('#current-' + cs[i]).text());
				
				return 'selector {\n\t' + str.join(';\n\t') + ';\n}';
			})()).appendTo($cssDialog);
			
			return $cssDialog;
		},
		
		bindMakeCssText: function(){
			$('#show-css').click(function(){
				var $cssDlg = $.getCssDialog();
				
				$.overlay.show(function(){
					$cssDlg.appendTo($.overlay.$ovLayer).positionCenter().find(':first').focus();
				});
				
				$.overlay.bind(function(){
					$.overlay.hide(function(){
						$cssDlg.remove();
					});
				});
			});
		}
		
	});
	
	$.fn.extend({
		horizSlideClose: function(duration, callback){
		
			callback = $.isFunction(duration) ? duration : callback ||
			function(){
			};
			duration = (+duration == duration || typeof duration == 'string') ? duration : 400;
			
			return this.each(function(index, elm){
				$.data(elm, 'horizSlide', {
					'width': $(elm).width()
				});
				
				$(elm).animate({
					width: 0
				}, {
					'duration': duration,
					'complete': function(){
						$(this).hide();
						callback.call(this);
					}
				});
				
			});
		},
		
		horizSlideOpen: function(duration, callback){
		
			callback = $.isFunction(duration) ? duration : callback ||
			function(){
			};
			duration = (+duration == duration || typeof duration == 'string') ? duration : 400;
			
			return this.each(function(index, elm){
				$(elm).show().animate({
					width: $.data(elm, 'horizSlide').width
				}, {
					'duration': duration,
					'complete': function(){
						callback.call(this);
					}
				});
			});
		}
		
	});
	
})(jQuery);



jQuery(function($){
	
	$.bindPrevierwChangeStyle();
	$.makeThreeTables();
	
	$.bindChangePrevTextArea();
	$.bindClickItemNavi();
	
	$.bindChangeFontSize();
	$.bindSelectApplyAttr();
	$.bindStyleButtonEvent('font-weight',['normal', 'bold']);
	$.bindStyleButtonEvent('font-style',['normal', 'italic']);
	
	$.bindMakeCssText();
	
	$.setTitle('color and font style tester β', '1.1');
	$.showLastModDate();
	
});