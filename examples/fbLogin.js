  var connected = false;
  var enterProduct = false;
  var selectedCountry = 'us';
  
  window.fbAsyncInit = function() {
	  
  FB.init({
    appId      : '354429927942663',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.status === 'connected') {
	  connected = true;	
      displayName();
    } else if (response.status === 'not_authorized') {
      FB.login();
    } else {
      FB.login();
    }
  });
  };

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "http://connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));
  
  
  function displayName() {
    FB.api('/me/', function(response) {
			$("#demosMenu").html( "Welcome " + response.name );	
	});
  }
  
  function testAPI() {
	  
	var locationToLat = {};
    
    FB.api('/me/friends?fields=name,id,location', function(response) {
	
		myFriends = response.data;
		init = 0;
			
		for(friend in myFriends){
			
			if( myFriends[friend].location ){
				
				t =  myFriends[friend].location.id;
				
				if(!locationToLat[t]) {
					locationToLat[t] = {}
					locationToLat[t].id = t;
					locationToLat[t].name = myFriends[friend].location.name;
					locationToLat[t].users = [];
					locationToLat[t].users[0] = [myFriends[friend].name , myFriends[friend].id];
				}else{
					locationToLat[t].users[[locationToLat[t].users.length]] = [myFriends[friend].name , myFriends[friend].id];
				}	
			}
		}

		for(lc in locationToLat) {
			
			FB.api( '/' + lc , function(response){
					id = response.id;
					lat = locationToLat[id].latitude = response.location.latitude;
					longi = locationToLat[id].longitude = response.location.longitude;
					
					if(init == 0){
						initMap();
						init++;
					}else{
						addToMap( lat , longi , locationToLat[id].users[0][0] , locationToLat[id].users[0][1]);
					}
			});
		}
    }); 
  }

  function invokeLogin( country ){
	  selectedCountry = country;
	  
	  if(!connected){
		FB.login();
	  }else{
		testAPI();   	
		$.fn.fullpage.moveTo('firstPage', 2);
	  }	
  }	
