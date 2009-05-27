function OPENorCLOSEtoLIST(nd){
	tN = nd.nextSibling;
	while (tN.nodeName.toUpperCase() != "UL") {
		tN = tN.nextSibling;
	}
	if (tN.style.display == "none") {
		tN.style.display = "block";
	}else{
		tN.style.display = "none";
	}
	
	nn = nd.firstChild;
	while (nn.nodeName.toUpperCase() != "SPAN") {
		nn = nn.nextSibling;
	}
	
	fc = nd.firstChild;
	while (fc.nextSibling != null) {
		nd.removeChild(fc.nextSibling);
	}
	nd.removeChild(fc);

	tglOpen = "▼";
	tglCloseL = "▶";
	tglCloseR = "◀";
	tglElL = document.createElement("b"); 
	tglElR = document.createElement("b"); 
	if(tN.style.display == "none"){
		tglElL.appendChild(document.createTextNode(tglCloseL));
		tglElR.appendChild(document.createTextNode(tglCloseR));
	}else{
		tglElL.appendChild(document.createTextNode(tglOpen));
		tglElR.appendChild(document.createTextNode(tglOpen));
	}
	nd.appendChild(tglElL);
	nd.appendChild(nn);
	nd.appendChild(tglElR);
}

function OPENorCLOSEtoLIST(nd){
	tN = nd.nextSibling;
	while (tN.nodeName.toUpperCase() != "UL") {tN = tN.nextSibling;}
	
	if (tN.style.display == "none") {
		tN.style.display = "block";
	}else{
		tN.style.display = "none";
	}
	document.documentElement
	
	nn = nd.firstChild.nextSibling;
	while (nd.firstChild != null) {nd.removeChild(nd.firstChild);}

	tglOpen = "▼";
	tglCloseL = "▶";
	tglCloseR = "◀";
	tglElL = document.createElement("span"); 
	tglElR = document.createElement("span"); 
	if(tN.style.display == "none"){
		tglElL.appendChild(document.createTextNode(tglCloseL));
		tglElR.appendChild(document.createTextNode(tglCloseR));
	}else{
		tglElL.appendChild(document.createTextNode(tglOpen));
		tglElR.appendChild(document.createTextNode(tglOpen));
	}
	
	nd.appendChild(tglElL);
	nd.appendChild(nn);
	nd.appendChild(tglElR);
}

/* ---------------------------------------------------------------- */
function OPENorCLOSEtoLIST(nd){
	tN = nd.nextSibling;
	while (tN.nodeName.toUpperCase() != "UL") {tN = tN.nextSibling;}
	
	if (tN.style.display == "none") {
		tN.style.display = "block";
	}else{
		tN.style.display = "none";
	}
	
	
	
	var tglEl = new (function(ns){
		var tgl = new (function(nsi){if(nsi == "none"){this[0]="▶";this[1]="◀";}else{this[0]="▼";this[1]="▼";}})(ns);
		bEl = function(){document.createElement("b");};
		this[0] = bEl().appendChild(document.createTextNode(tgl[0]));
		this[1] = bEl.appendChild(document.createTextNode(tgl[1]));
	})(tN.style.display);
	
	var zi = 0;
	fc = nd.firstChild;
	
	while (fc != null) {
		if(fc.nodeName.toUpperCase() == "B"){
			tmpfc = fc.nextSibling;
			fc.replaceNode(tglEl[zi]);
			fc = tmpfc;
			zi++;
		}
		fc = fc.nextSibling;
	}
}

/* ---------------------------------------------------------------- */
function OPENorCLOSEtoLIST(nd){
	tN = nd.nextSibling;
	while (tN.nodeName.toUpperCase() != "UL") {tN = tN.nextSibling;}
	
	if (tN.style.display == "none") {
		tN.style.display = "block";
	}else{
		tN.style.display = "none";
	}
	
	nn = nd.firstChild.nextSibling;
	while (nd.firstChild != null) {nd.removeChild(nd.firstChild);}
	
	tgl = new (function(ds){
		if (ds == "none") {
			this[0] = "▶";this[1] = "◀";
		}
		else {
			this[0] = "▼";this[1] = "▼";
		}
	})(tN.style.display);
	
	tglEl = new (function(){
		this[0] = document.createElement("span").appendChild(document.createTextNode(tgl[0]));
		this[1] = nn;
		this[2] = document.createElement("span").appendChild(document.createTextNode(tgl[1]));
	})();
	
	for (oio in tglEl){nd.appendChild(tglEl[oio]);}
}