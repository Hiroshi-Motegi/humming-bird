$(function(){
	function xElement_1() {
		var el = document.createElement("div");
		el.className = "xEl1";
		el.appendChild(document.createTextNode("Added Element"));
		return el;
	};
	function xElement_2() {
		var el = document.createElement("div");
		el.className = "xEl2";
		el.appendChild(document.createTextNode("Added Element"));
		return el;
	};
	function xElement_3() {
		var el = document.createElement("div");
		el.className = "xEl3";
		el.appendChild(document.createTextNode("Added Element"));
		return el;
	};
	
	//*********************************
	$('.funcEl-1').click(function(){
		var El = new xElement_1();
		$('#AddTarget-1').append(El);
	});
	
	$(".xEl1").click(function(){
			alert('Clicked!');
	});
	//*********************************
	$('.funcEl-2').click(function(){
		var El = new xElement_2();
		$('#AddTarget-2').append(El);
		
		$(".xEl2").click(function(){
			alert('Clicked!');
		});
	});
	//*********************************
	$('.funcEl-3').click(function(){
		var El = new xElement_3();
		$('#AddTarget-3').append(El);
		
		$(El).click(function(){
			alert('Clicked!');
		});
	});
	
});
