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
		$.getJSON('fonts.js', function(json){
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
					"background":"url('./img/ws_check.png') no-repeat left",
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
					"background":"url('./img/ws_check.png') no-repeat left",
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
			$(selectors[$(this).text()]).slideDown(400, function(){cl.effecting = false;});
		});
	},
	cs:{
		bgcolor:"#current-bg-color",
		color:"#current-font-color",
		family:"#current-font-family",
		weight:"#current-font-weight",
		style:"#current-font-style",
		size:"#current-font-size"
	},
	currentStyleInit:function(){
		var
		cs = cl.cs,
		$body = $('body');

		$(cs.bgcolor).text( $.parseColorCode( $.getRGB( $body.css('background-color') ) ) );
		$(cs.color).text( $.parseColorCode( $.getRGB( $body.css('color') ) ) );
		$(cs.family).text($body.css("font-family"));
		$(cs.weight).text("normal");
		$(cs.style).text("normal");
		$(cs.size).text($("option:selected","#prev-font-size-select").text() + "px");
		
	},
	getCurrentStyleText:function(){
		var cs = cl.cs;
		
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
		
		$.overlay.show({id:_id},function(){			
			$(cssDlg)
				.appendTo(document.body)
				.positionCenter()
				.children(":first").focus();
		});
		
		/*
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
		*/
		
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
	$('#prev-textarea')
		.val("Sample Text\nThe quick brown fox jumps over the lazy dog.")
		.change();
	

	
	//item navi init. 
	$(".item-navi:first").css({backgroundColor:"#1a1a1a"});
	
	$('#this-title').text(document.title);
	
	$('#lastmod').text((function(date){
			return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
		})(new Date(document.lastModified)));
	
});


