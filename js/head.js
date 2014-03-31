$(document).ready(function(){ var myPhotoSwipe = $("#Gallery a").photoSwipe({ imageScaleMethod: "zoom" ,  autoStartSlideshow: true , captionAndToolbarShowEmptyCaptions: false , slideTimingFunction: "ease-out" , slideSpeed: 500}); });

$(document).ready(function(){ var myPhotoSwipe = $("#Gallery2 a").photoSwipe({ imageScaleMethod: "fit" ,  autoStartSlideshow: true , captionAndToolbarShowEmptyCaptions: false , slideTimingFunction: "ease-out" , slideSpeed: 500}); });

    document.addEventListener("offline", 
    							function() {
    								alert("No internet connection");
								}, 
								false
								);

//maximage	
$(function(){
				// Trigger maximage
				jQuery('#maximage').maximage();
			});
			