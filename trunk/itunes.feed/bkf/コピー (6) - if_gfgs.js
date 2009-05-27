/*@cc_on 
var doc = document;
eval('var document = doc');
@*/

function Edit_Word(tgtStr){
	editStr = tgtStr.replace(/\s?-\s(EP|Single)/, "");
	editStr = editStr.replace(/(\(|\[|~|～).*(\)|\]|~|～)/g, "");
	editStr = editStr.replace(/\s~.*$/, "");
	editStr = editStr.replace(/~[^0-9]*$/, "");
	editStr = editStr.replace(/^\s+|\s+$/g, "");
	return editStr;
}

function edit_point(tgtStr){
	editStr = tgtStr.replace(/"/g, "\\\"");
	editStr = editStr.replace(/'/g, "\\\'");
	return editStr;
}

function Content_Clear(tgtPID){
	try {
		var tgtParent=document.getElementById(tgtPID);
		var tgt_firstchild=tgtParent.firstChild;
		
		while (tgt_firstchild.nextSibling){
			tgtParent.removeChild(tgt_firstchild.nextSibling);
		}
		
		tgtParent.removeChild(tgt_firstchild);
	} catch (e) {} 
}

function List_GetSelectedValue(id){
	try{
			element = document.getElementById(id);
			return element.options[element.selectedIndex].value;
		}catch (e) {}
}

function Set_CandG_Val(cVal,gVal){
	with(document){
		getElementById("categoryVal").value = cVal;
		getElementById("genreVal").value = gVal;
	}
}

function List_SelectedValue_Changed(){
	with (document) {
		cVal = getElementById("categoryVal").value;
		gVal = getElementById("genreVal").value;
	}
	initialize(cVal, gVal);
}
//-------------------------------------------------------------------------------
function xEBaseElement() {
	this.initialize.apply(this, arguments);
}
xEBaseElement.prototype = {
	initialize: function(){
		this.Base = document.createElement("div");
		this.Base.className = "basecontent";
		
		this.caCntnr = document.createElement("div");
		this.caCntnr.className = "coverart";
		this.Base.appendChild(this.caCntnr);
		
		this.eContent = document.createElement("div");
		this.eContent.className = "content";
		this.eTable = document.createElement("table");
		this.eTable.className = "contTable";
		this.eTbody = document.createElement("tbody");
		this.eTbody.className = "contTbody";
		
		this.eTable.appendChild(this.eTbody);
		this.eContent.appendChild(this.eTable);
		this.Base.appendChild(this.eContent);
		
		this.clear = document.createElement("div");
		this.clear.className = "clear";
		this.Base.appendChild(this.clear);
	}
};
//-------------------------------------------------------------------------------
function xcaElement() {
	this.initialize.apply(this, arguments);
}
xcaElement.prototype = {
	initialize: function(){
		this.Anc = document.createElement("a");
		this.Img = document.createElement('img');
		this.Anc.appendChild(this.Img);
	},
	setHrefToAnc: function(al){
		this.Anc.setAttribute("href", al);
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
		ex = Edit_Word(txt);
		Anc.title = "Keyword:[" + ex + "] Go Search";
		Anc.setAttribute("href", "javascript:OnLoad(\'" + edit_point(ex) + "\');");
		
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

function initialize(fC,fG){
	
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
			FeedTitle.className = "feedtitle";
			FeedTitle.innerHTML = feedDescription;
			containerDiv.appendChild(FeedTitle);
			
			var ns = "http://phobos.apple.com/rss/1.0/modules/itms/";
			var sapiCallStr = {
				Top:"javascript:OnLoad(\'",
				End:"\');"
				};
			var ancTitleStr = {
				Top:"Keyword:[",
				End:"] Go Search"
				};
				
			var covorArtSize = {
					small: 0,
				 midium: 1,
					large: 2
				};
			
			var Content_Selected = {
				TitleOnly:"Title_Only",
						Full:"Full_Contents"
				};
				
			/* ----------------------------------------------------------------------------------- */
			
			for (var i = 0; i < result.feed.entries.length; i++) {
			
				var entry = result.feed.entries[i];
				var eNode = entry.xmlNode;
				
				//エントリーを格納するタグを追加
				var entryContainer = document.createElement("div");
				entryContainer.className = "entryCont";
				containerDiv.appendChild(entryContainer);
				
				/* エントリータイトルの取得 & 表示処理 Start */
				if (entry.title != null) {
					try {
						var entryHeader = document.createElement("div");
						entryHeader.className = "entryTitle";
						
						var str = new String;
						str = entry.title;
						
						re = RegExp(/^[0-9]+\.\s/);
						if (str.match(re)){
							rankNum = str.substring(0,str.indexOf(" ")) ;//rankNum = RegExp.lastMatch ;
							str = str.replace(rankNum,"");
							entryHeader.appendChild(document.createTextNode(rankNum));
						}
						
						arr_et = str.split(/\s\-\s/);
						
						for (etcnt = 0; etcnt < arr_et.length; etcnt++) {
							if(etcnt != 0){
								entryHeader.appendChild(document.createTextNode(" - "));
							}
							if (arr_et[etcnt].match(/(^EP$|^Single$|^Various\s\s?Artists$)/)) {
								entryHeader.appendChild(document.createTextNode(arr_et[etcnt]));
							}else{
								etAnc = document.createElement("a");
								searchword = Edit_Word(arr_et[etcnt]);
								etAnc.setAttribute("title", ancTitleStr.Top + searchword + ancTitleStr.End);
								etAnc.setAttribute("href", sapiCallStr.Top + edit_point(searchword) + sapiCallStr.End);
								etAnc.appendChild(document.createTextNode(arr_et[etcnt]));
								entryHeader.appendChild(etAnc);
							}
						}
						
						entryContainer.appendChild(entryHeader);
						
					} catch (e) {
						var entryHeader = document.createElement("div");
						entryHeader.className = "entryTitle";
						entryHeader.appendChild(document.createTextNode(entry.title));
						entryContainer.appendChild(entryHeader);
					}
				}/* エントリータイトルの取得 & 表示処理 End */
				
				if (List_GetSelectedValue("EntryVisiblityList") == Content_Selected.Full) {
				
					var eBCE = new xEBaseElement();
					entryContainer.appendChild(eBCE.Base);
					
					/* 各エントリーの各情報を取得--------------------------------------------------------- */
					
					//カバーアート
					var coverNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "coverArt")[covorArtSize.large];
					if (coverNodes != null) {
						var imgEl = new xcaElement();
						imgEl.Img.src = coverNodes.firstChild.nodeValue;
						var albumNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "albumLink")[0];
						imgEl.setHrefToAnc(albumNodes.firstChild.nodeValue);
						eBCE.caCntnr.appendChild(imgEl.Anc);
					}
					
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
									case 0:
									case 1:
										CreateChildElementName(ek[ni]);
										setAncTextToChildElementContent(cnd[ni].firstChild.nodeValue);
										break;
									case 2:
									case 3:
										CreateChildElementName(ek[ni]);
										setTextToChildElementContent(cnd[ni].firstChild.nodeValue);
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
					}
				}
			}
			//コンテンツを表示
			container.appendChild(containerDiv);
			
			//以前に表示していたものがあれば削除
			if (container.firstChild.nextSibling) {
				container.removeChild(container.firstChild);
			}
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
