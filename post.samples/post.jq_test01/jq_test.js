$(function(){
	function xListElement() {
		var el = document.createElement("div");
		el.className = "xEl";
		el.appendChild(document.createTextNode("Added Element"));
		return el;
	};
	
	$('.funcEl').click(function(){
		
		var El = new xListElement();
		$('#AddTarget').append(El);
		
		$("xEl").click(function(){
			alert('Clicked!');
		});
		
		$(El).click(function(){
			alert('Clicked!');
		});
	});
	
	$("xEl").click(function(){
			alert('Clicked!');
	});
});

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
		if (ds == "none") {this[0] = "▶";this[1] = "◀";}
		else {					 this[0] = "▼";this[1] = "▼";}
	})(tN.style.display);
	
	tglEl = new (function(){
		this[0] = document.createElement("span").appendChild(document.createTextNode(tgl[0]));
		this[1] = nn;
		this[2] = document.createElement("span").appendChild(document.createTextNode(tgl[1]));
	})();
	
	for (oio in tglEl){nd.appendChild(tglEl[oio]);}
}