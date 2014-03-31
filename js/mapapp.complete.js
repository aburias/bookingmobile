
var mapdata = { destination: new google.maps.LatLng(lat,lon) };

// Home page
$('#location').live("pageinit", function() {
	$('#map_square').gmap(
	    { 'center' : mapdata.destination, 
	      'zoom' : 12, 
	      'mapTypeControl' : false,
	      'navigationControl' : false,
	      'streetViewControl' : false 
	    })
	    .bind('init', function(evt, map) { 
	        $('#map_square').gmap('addMarker', 
	            { 'position': map.getCenter(), 
	              'animation' : google.maps.Animation.DROP 
	            });
				$('#map_square').gmap('refresh');               	
                            
	    });
		
   $('#map_square').live('pageshow',function(){
      google.maps.event.trigger(gmap, 'resize');
      $('#map_square').gmap('refresh'); 
   });
});



var previousOrientation = window.orientation;
var checkOrientation = function(){
    if(window.orientation !== previousOrientation){
        previousOrientation = window.orientation;
        google.maps.event.trigger(gmap, 'resize');
        $('#map_square').gmap('refresh'); 
    }
};

window.addEventListener("resize", checkOrientation, false);
window.addEventListener("orientationchange", checkOrientation, false);