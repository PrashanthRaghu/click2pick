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

var greenIcon = L.icon({
    iconUrl: '../imgs/leaf-green.png',

    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -26] // point from which the popup should open relative to the iconAnchor
});

var redIcon = L.icon({
    iconUrl: '../imgs/leaf-red.png',

   iconSize:     [32, 32], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -26] // point from which the popup should open relative to the iconAnchor

});

var orangeIcon = L.icon({
    iconUrl: '../imgs/leaf-orange.png',

    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -26] // point from which the popup should open relative to the iconAnchor
});


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

function addToMap( lat , longi , name , id, color ){
		message = "Hey " + name + " , Can you please get me a " + productName + "?";
		if (color == 'green') {
		L.marker([lat , longi],{icon: greenIcon}).addTo(map).bindPopup( "<div id='align'> <h3 class='names'> It's  : " + name + " :) </h3>" + "<div class='left'> <img src='https://graph.facebook.com/"+id+"/picture?type=large' style='margin-left:36px;'></img></div> <div class='right'> </br> <textarea rows='4' class='message'> Hey " + name + " , Can you please get me a " + productName + " ? </textarea> <button class='punch' style='margin-left:40px;' onclick=openDialog("+id+")>  Send Message </button></div> </div>" );
		}
		if (color == 'red') {
		L.marker([lat , longi],{icon: redIcon}).addTo(map).bindPopup( "<div id='align'> <h3 class='names'> It's  : " + name + " :) </h3>" + "<div class='left'> <img src='https://graph.facebook.com/"+id+"/picture?type=large' style='margin-left:36px;'></img></div> <div class='right'> </br> <textarea rows='4' class='message'> Hey " + name + " , Can you please get me a " + productName + " ? </textarea> <button class='punch' style='margin-left:40px;' onclick=openDialog("+id+")>  Send Message </button></div> </div>" );
		}
		if (color == 'orange') {
		L.marker([lat , longi],{icon: orangeIcon}).addTo(map).bindPopup( "<div id='align'> <h3 class='names'> It's  : " + name + " :) </h3>" + "<div class='left'> <img src='https://graph.facebook.com/"+id+"/picture?type=large' style='margin-left:36px;'></img></div> <div class='right'> </br> <textarea rows='4' class='message'> Hey " + name + " , Can you please get me a " + productName + " ? </textarea> <button class='punch' style='margin-left:40px;' onclick=openDialog("+id+")>  Send Message </button></div> </div>" );
		}
				
}

function openDialog(id , name ){
	FB.ui({
		method: 'send',
		link: productInfo[selectedCountry].url,
		to:id
	});
}
	

