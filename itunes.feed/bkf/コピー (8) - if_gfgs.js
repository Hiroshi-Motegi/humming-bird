/*@cc_on 
var doc = document;
eval('var document = doc');
@*/

/* ---------------------------------------------------------------- */
function EDIT_STRING(str){
	var re = new Array(/\s?-\s(EP|Single)/,/(\(|\[|~|～).*(\)|\]|~|～)/g,/\s~.*$/,/~[^0-9]*$/,/^\s+|\s+$/g);
	editStr = str;
	for (ki in re) {
		editStr = editStr.replace(re[ki], "");
	}
	return editStr;
}

function Edit_PointUseAtTitle(str){
	editStr = str.replace(/"/g, '&quot;');
	editStr = editStr.replace(/'/g, '&#39;');//『'』= &apos; or &#39;
	return editStr;
}
function Edit_PointUseAtHref(str){
	editStr = str.replace(/"/g, "\\\"");
	editStr = editStr.replace(/'/g, "\\\'");
	return editStr;
}

function Content_Clear(id){
	try {
		var pNode = document.getElementById(id);
		while (pNode.firstChild){
			pNode.removeChild(pNode.firstChild);
		}
	} catch (e) {} 
}

function List_GetSelectedValue(id){
	try{	el = document.getElementById(id);
			return el.options[el.selectedIndex].value;
	}catch (e) {}
}

function Set_CandG_Val(cVal,gVal){
	with(document){
		getElementById("cddlst").value = cVal;
		getElementById("gddlst").value = gVal;
	}
}

function List_SelectedValue_Changed(){
	with (document) {
		cVal = getElementById("cddlst").value;
		gVal = getElementById("gddlst").value;
	}
	gfInit(cVal, gVal);
}
//-------------------------------------------------------------------------------
function xETitleElement() {
	this.initialize.apply(this, arguments);
}
xETitleElement.prototype = {
	initialize: function(title){
		this.TitleElement = document.createElement("div");
		this.TitleElement.className = "entryTitle";
		this.Title = title;
		this.SearchWord = this.CreateSearchWord();
		this.TitleToggle = this.CreateTitleToggle();
		this.CreateTitle();
	},
	CreateTitle: function(){
		eStr = EDIT_STRING(this.SearchWord);
		Anc = document.createElement("a");
		Anc.title = "Keyword:[" + Edit_PointUseAtTitle(eStr) + "] Go Search";
		Anc.setAttribute("href", "javascript:OnLoad(\'" + Edit_PointUseAtHref(eStr) + "\');");
		Anc.appendChild(document.createTextNode(this.Title));
		
		this.TitleElement.appendChild(this.TitleToggle);
		this.TitleElement.appendChild(Anc);
	},
	CreateTitleToggle: function(){
		var tglEl = document.createElement("span");
		tglEl.className = "titleToggle";
		if(List_GetSelectedValue("EntryVisiblityList") == "Title_Only"){
			tglEl.appendChild(document.createTextNode("▶"));
		}else{
			tglEl.appendChild(document.createTextNode("▼"));
		}
		return tglEl;
	},
	CreateSearchWord: function(){
		var str = new String;
		str = this.Title;
		
		re = RegExp(/^[0-9]+\.\s/);
		if (str.match(re)){
			str = str.replace(str.substring(0,str.indexOf(" ")+1),"");
		}
		
		var arrStr = str.split(/\s-\s/);
		var SearchStr = "";
		
		for (nn = 0; nn < arrStr.length; nn++) {
			if (arrStr[nn].match(/(^EP$|^Single$|^Various\s\s?Artists$)/) != true) {
				if(nn != 0){SearchStr += " ";}
				SearchStr += arrStr[nn];
			}
		}
		return SearchStr;
	}
};
//-------------------------------------------------------------------------------

function xEBaseElement() {
	this.initialize.apply(this, arguments);
}
xEBaseElement.prototype = {
	initialize: function(){
		this.Base = document.createElement("div");
		this.Base.className = "basecontent";
		if (List_GetSelectedValue("EntryVisiblityList") == "Title_Only") {
			this.Base.style.display = "none";
		}
		
		this.caCntnr = document.createElement("div");
		this.caCntnr.className = "coverart";
		
		var content = document.createElement("div");
		content.className = "content";
		
		var table = document.createElement("table");
		table.className = "contTable";
		this.eTbody = document.createElement("tbody");
		this.eTbody.className = "contTbody";
		
		var clear = document.createElement("div");
		clear.className = "clear";
		
		this.Base.appendChild(this.caCntnr);
		table.appendChild(this.eTbody);
		content.appendChild(table);
		this.Base.appendChild(content);
		this.Base.appendChild(clear);
	}
};
//-------------------------------------------------------------------------------
function xCoverArtElement() {
	this.initialize.apply(this, arguments);
}
xCoverArtElement.prototype = {
	initialize: function(){
		this.Element = document.createElement("a");
		this.Img = document.createElement('img');
		this.Element.appendChild(this.Img);
	},
	SetHref: function(al){
		this.Element.setAttribute("href", al);
	}
};
//-------------------------------------------------------------------------------
function xElement() {
	this.initialize.apply(this, arguments);
}

xElement.prototype = {
    initialize: function() {
		this.ParentElement = document.createElement("tr");
		this.ChildElementName = null;
		this.ChildElementContent = null;
    },
	CreateChildElementName: function(nt){
		with (this) {
			ChildElementName = document.createElement("td");
			ChildElementName.className = "nametd";
			ChildElementName.appendChild(document.createTextNode(nt + " :"));
		}
	},
	CreateChildElementContent: function(){
		this.ChildElementContent = document.createElement("td");
		this.ChildElementContent.className = "eValuetd";
	},
	setTextToChildElementContent: function(txt){
		if (this.ChildElementContent == null) {this.CreateChildElementContent();}
		this.ChildElementContent.appendChild(document.createTextNode(txt));
	},
	setAncTextToChildElementContent: function(txt){
		if (this.ChildElementContent == null) {this.CreateChildElementContent();}
		
		var Anc = document.createElement('a');
		Anc.appendChild(document.createTextNode(txt));
		ex = EDIT_STRING(txt);
		Anc.title = "Keyword:[" + Edit_PointUseAtTitle(ex) + "] Go Search";
		Anc.setAttribute("href", "javascript:OnLoad(\'" + Edit_PointUseAtHref(ex) + "\');");
		
		this.ChildElementContent.appendChild(Anc);
	},
	addElement: function(tgt){
		with (this) {
			if (ChildElementName != null) {
				ParentElement.appendChild(ChildElementName);
			}
			if (ChildElementContent != null) {
				ParentElement.appendChild(ChildElementContent);
			}
			tgt.appendChild(ParentElement);
		}
	}
};
//-------------------------------------------------------------------------------
function xFeedURL() {
	this.initialize.apply(this, arguments);
}
xFeedURL.prototype = {
    initialize: function(fc,fg) {
		var feedurlstrct = {
			Top:"http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStore.woa/wpa/MRSS/",
			Country:"/sf=",
			Tail:"/rss.xml",
			Genre:"/genre=",
			Limit:"/limit="
		};
		
		var feedCategory = Array("topsongs","topalbums","newreleases","justadded","featuredalbums");
		
		this.URL = feedurlstrct.Top + feedCategory[fc] + feedurlstrct.Country + List_GetSelectedValue("CountryList") + feedurlstrct.Limit + List_GetSelectedValue("EntryCountList");
		if (fg == 0) {
			this.URL +=  feedurlstrct.Tail;
		}else{
			this.URL +=  feedurlstrct.Genre + fg + feedurlstrct.Tail;
		}
    }
};

function gfInit(fC,fG){
	
	var fURL = new xFeedURL(fC,fG);
	//カテゴリーとジャンルの値を保持するためにtextboxに書き出す
	Set_CandG_Val(fC,fG);//+ "/explicit=false"
	
	//取得したFeedの内容を表示するタグの取得
	container = document.getElementById("feed");
	
	var feed = new google.feeds.Feed(fURL.URL);
	
	feed.setNumEntries(-1);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	
	feed.load(function(result){
		if (!result.error) {
			
			//各フィードを格納するタグの生成と追加
			var containerDiv = document.createElement("div");
			containerDiv.className = "feedcontainer";
			
			//フィードタイトルを取得
			var feedDescription = result.feed.description; 
			feedDescription = feedDescription.replace(/iTunes Store ?:/,"");
			
			//フィードタイトルを格納するタグの生成と追加
			var FeedTitle = document.createElement("h3");
			FeedTitle.id = "feedTitle";
			FeedTitle.innerHTML = feedDescription;
			containerDiv.appendChild(FeedTitle);
			
			var ns = "http://phobos.apple.com/rss/1.0/modules/itms/";
				
			var covorArtSize = {
					small: 0,
				 midium: 1,
					large: 2
				};
				
			/* ----------------------------------------------------------------------------------- */
			for (var i = 0; i < result.feed.entries.length; i++) {
			
				var entry = result.feed.entries[i];
				var eNode = entry.xmlNode;
				
				//エントリーを格納するタグを追加
				var entryContainer = document.createElement("div");
				entryContainer.className = "entryCont";
				containerDiv.appendChild(entryContainer);
				
				/* エントリータイトルの取得 & 表示処理 Start -------------------------------------------- */
				if (entry.title != null) {
					var tEl = new xETitleElement(entry.title);
					entryContainer.appendChild(tEl.TitleElement);
				}/* エントリータイトルの取得 & 表示処理 End -------------------------------------------- */
				
				var Content_Selected = {
					TitleOnly:"Title_Only",
							Full:"Full_Contents"
				};
				
					
				//各エントリーの各情報を格納する要素の生成と追加
				var eBCE = new xEBaseElement();
				entryContainer.appendChild(eBCE.Base);
				
				/* 各エントリーの各情報を取得--------------------------------------------------------- */
				
				//カバーアート
				var coverNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "coverArt")[covorArtSize.large];
				if (coverNodes != null) {
					var imgEl = new xCoverArtElement();
					imgEl.Img.src = coverNodes.firstChild.nodeValue;
					imgEl.SetHref(google.feeds.getElementsByTagNameNS(eNode, ns, "albumLink")[0].firstChild.nodeValue);
					eBCE.caCntnr.appendChild(imgEl.Element);
				}
				
				//その他エントリー
				var ck = Array("album", "artist", "albumPrice", "releasedate", "rights");
				var ek = Array("Album", "Artist", "Price", "Release", "Copyright ");
				var cnd = new Array(ck.length);
				for (ni = 0; ni < cnd.length; ni++) {
					try {
						cnd[ni] = google.feeds.getElementsByTagNameNS(eNode, ns, ck[ni])[0];
					} 
					catch (e) {
					}
					if (cnd[ni] != null) {
						var El = new xElement();
						with (El) {
							switch (ni) {
								case 0: case 1: case 2: case 3:
									CreateChildElementName(ek[ni]);
									switch (ni) {
										case 0: case 1:
											setAncTextToChildElementContent(cnd[ni].firstChild.nodeValue);
											break;
										case 2: case 3:
											setTextToChildElementContent(cnd[ni].firstChild.nodeValue);
											break;
									}
									break;
								case 4:
									try {
										setTextToChildElementContent(ek[ni] + cnd[ni].firstChild.nodeValue);
										ChildElementContent.title = ek[ni] + cnd[ni].firstChild.nodeValue;
										ChildElementContent.className = "cprght";
										ChildElementContent.setAttribute("colSpan", "2");
									} catch (e) {}
									break;
							}
							addElement(eBCE.eTbody);
						}
					}
				}/* 各エントリーの各情報を取得 End--------------------------------------------------------- */
			}
			//以前に表示していたものがあれば削除
			container.removeChild(container.firstChild);
			//ランキングコンテンツを表示
			container.appendChild(containerDiv);
			
			$('.titleToggle').click(function(){
				var $_tgl = $(this);
				$(this).parent().next().slideToggle('normal',function(){
					if($(this).css("display") == "none"){
						$_tgl.text("▶");
					}else{
						$_tgl.text("▼");
					}
				});
			});
		}
	});
}

function OnLoad(queryWord) {
  var searchControl = new google.search.SearchControl();
  searchControl.addSearcher(new google.search.VideoSearch());
  searchControl.addSearcher(new google.search.ImageSearch());
  searchControl.addSearcher(new google.search.WebSearch());
  searchControl.addSearcher(new google.search.NewsSearch());
  searchControl.draw(document.getElementById("Search"));
  searchControl.execute(queryWord);
}


$(function(){
	gfInit(0,0); 
	OnLoad('');
	
	$('#Side-Wrap > h4.mnTitle').click(function(){
		var $tglChild = $(this).children();
		$(this).next().slideToggle('normal',function(){
			if($(this).css("display") == "none"){
				$($tglChild[0]).text("▶");$($tglChild[2]).text("◀");
			}else{
				$($tglChild[0]).text("▼");$($tglChild[2]).text("▼");
			}
		});
	});
});
