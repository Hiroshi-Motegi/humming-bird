var cl = {
	effecting:false, //animating.
	applyColorTarget:"background-color", //background-color or color(font color)
	prev_slctr:"#preview", //Preview Element Selecter
	

	tableClass: 'item-table',
	createWebColorItems:function(){
		var
		wcs = cl.getWebColors(),
		slctrPart = 'web-color',
		itemClass = slctrPart + '-item',
		$tbody = $('<tbody>'),
		$tr;
		
		for(var i = 0;i < wcs.length;i++){
			if((i%15)==0){
				$tr = $('<tr>');
				$tbody.append($tr);
			}
			
			var cc = wcs[i];
			
			$tr.append(
				$('<td>')
					.attr('title', cc)
					.addClass(itemClass)
					.css({backgroundColor:cc})
					.data('color', {code:cc, name:''})
					.append('<span>' + cc + '</span>')
			);
		}
		
		$('<table>')
			.attr('id', slctrPart + '-table')
			.addClass(cl.tableClass)
			.append($tbody)
			.appendTo('#wrap-' + slctrPart);
	},
	createKnownColorItems:function(){
		var
		kcs = $.namedColors,
		slctrPart = 'named-color',
		itemClass = slctrPart + '-item',
		$tbody = $('<tbody>'),
		$tr,
		n = 0;
		
		for(var c in kcs){
			if((n%6)==0){
				$tr = $('<tr>');
				$tbody.append($tr);
			}
			
			var cc = $.parseColorCode(kcs[c]);
			
			$tr.append(
				$('<td>')
					.attr('title', c)
					.addClass(itemClass)
					.css({backgroundColor: cc})
					.data('color', {code:cc, name:c})
					.append('<span>' + c + '</span>'));
			
			n++;
		}
		
		$('<table>')
			.attr('id', slctrPart + '-table')
			.addClass(cl.tableClass)
			.append($tbody)
			.appendTo('#wrap-' + slctrPart);
			
	},
	createFontFamilyItems: function(){
		$.getJSON('./js/fonts.js', function(json){
			var
			slctrPart = 'font-family',
			itemClass = slctrPart + '-item',
			$tbody = $('<tbody>'),
			fonts = json.fonts,
			$tr;
			
			for (var i = 0; i < fonts.length; i++) {
				if ((i % 6) == 0) {
					$tr = $('<tr>');
					$tbody.append($tr);
				}
				
				var f =  fonts[i];
				
				$tr.append(
					$('<td>')
						.attr('title', f)
						.addClass(itemClass)
						.data('family', {name:f})
						.append('<span>' + f + '</span>'));
			}
			
			$('<table>')
				.attr('id', slctrPart + '-table')
				.addClass(cl.tableClass)
				.append($tbody)
				.appendTo('#wrap-' + slctrPart);
			
			//-- bind click event action. --//
			$('td.' + itemClass).click(function(){
				var fndata = jQuery.data(this, 'family').name;
				$(cl.prev_slctr).css({fontFamily: fndata});
				$('#current-' + slctrPart).text(fndata);
			});
			
		});
		
	},
	
	
	bindClickColorItem:function(){
		var item_selector = 'td.web-color-item,td.named-color-item';
		
		$(item_selector).bind("click", function(){
			var applyTarget = {
				bgcolor:'background-color',
				fontcolor:'color'
			}
			var tgt = cl.applyColorTarget;
			var code = $.data(this, 'color').code;
			
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
	},
	getWebColors:function(){
		var
		hxs =['ff', 'cc', '99', '66', '33', '00'],
		len = hxs.length,
		wccs = []; //web color codes.
		
		for(var i = 0; i < len; i++){
			for(var n = 0; n < len; n++){
				for(var m = 0; m < len; m++){
					wccs.push('#' + hxs[i] + hxs[n] + hxs[m]);
				}
			}
		}
		return wccs;
	}
};




jQuery(function($){
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