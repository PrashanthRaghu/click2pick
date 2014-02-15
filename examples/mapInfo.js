var map;
var message;
var initLocationInfo = {}
initLocationInfo.cn = {}
initLocationInfo.cn.latitude = '34.30714'; 
initLocationInfo.cn.longitude = '104.76563';

initLocationInfo.us = {}
initLocationInfo.us.latitude = '42.03297'; 
initLocationInfo.us.longitude = '-102.6562';

initLocationInfo.uk = {}
initLocationInfo.uk.latitude = '54.00777'; 
initLocationInfo.uk.longitude = '-2.19727';

function initMap(){
	
	initLat = initLocationInfo[selectedCountry].latitude;
	initLong = initLocationInfo[selectedCountry].longitude;
	
	map = L.map('map', {
			center: [ initLat , initLong ],
			zoom: 5 }
			);

	L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: ' Find your friends @ the following locations !!!'
		}).addTo(map);
		
}

function addToMap( lat , longi , name , id ){
		message = "Hey " + name + " , Can you please get me a " + productName + "?";
		L.marker([lat , longi]).addTo(map).bindPopup( "<div id='align'> <h3 class='names'> It's  : " + name + " :) </h3>" + "<div class='left'> <img src='https://graph.facebook.com/"+id+"/picture?type=large' style='margin-left:36px;'></img></div> <div class='right'> </br> <textarea rows='4' class='message'> Hey " + name + " , Can you please get me a " + productName + " ? </textarea> <button class='punch' style='margin-left:40px;' onclick=openDialog("+id+")>  Send Message </button></div> </div>" );
}

function openDialog(id , name ){
	FB.ui({
		method: 'send',
		link: productInfo[selectedCountry].url,
		to:id
	});
}
	

