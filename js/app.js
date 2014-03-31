var startApp = function() {
  // alert('started');

};



// scrollfix init

$(function() {
	


	// prevent rubber banding for header and footer
//	if (iOS && standalone)
//	{
		$(".fixed-header, .fixed-footer").bind('touchmove', function(e){ e.preventDefault(); });
//	}
	new ScrollFix($(".pageContainer")[0]);
	
	var allpages = $.makeArray($("div[data-role='page']"));
	var currentpageIndex = 0;
	
		
	});

$(document).bind("pageinit", function(evt){
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	
	/* Strage: Without that scrolling is not possible with android. With it ios can't scroll...*/ 
	if (isAndroid) {
		$("#hdr-txt").text("android 2 hack applied");		
	   	$(evt.target).css("overflow-x","visible");
	   	$(evt.target).find(".ui-content").css("overflow-x","visible");
      
	}

	// Header and footer were added in the first page (to get easy enhancement)
	// Both are now removed from the first page and moved to the body 
	var header = $(".fixed-header");
	var footer = $(".fixed-footer");
	$("body").prepend(header);
	$("body").prepend(footer);
});

// geoloading

function onBodyLoad()
	{		
		document.addEventListener("deviceready", onDeviceReady, false);
	}
	
 
 
$('#call').ready(function() {  var userAgent = navigator.userAgent + '';
    if (userAgent.indexOf('iPhone') > -1) {
      
       function callios() {

         location.href = calllinkios;
        //$.mobile.changePage(calllinkios);

   };
   document.getElementById("call").onclick = function() { callios(); };

      var mobile_system = 'iphone';
    } else if (userAgent.indexOf('Android') > -1) {
      
       function callandr() {

         location.href = calllinkandr;
     //  $.mobile.changePage(calllinkandr);


   };
   document.getElementById("call").onclick = function() { callandr(); };

      var mobile_system = 'android';
    } else if (userAgent.indexOf('iPad') > -1) {
      
       function callios() {

         location.href = calllinkios;
    // $.mobile.changePage(calllinkios);

   };
   document.getElementById("call").onclick = function() { callios(); };

      var mobile_system = 'ipad';
   } else {
      var mobile_system = '';
    }
    });


$('#call2').ready(function() {  var userAgent = navigator.userAgent + '';
    if (userAgent.indexOf('iPhone') > -1) {
      
       function callios() {

         location.href = calllinkios;
        //$.mobile.changePage(calllinkios);

   };
   document.getElementById("call2").onclick = function() { callios(); };

      var mobile_system = 'iphone';
    } else if (userAgent.indexOf('Android') > -1) {
      
       function callandr() {

         location.href = calllinkandr;
     //  $.mobile.changePage(calllinkandr);


   };
   document.getElementById("call2").onclick = function() { callandr(); };

      var mobile_system = 'android';
    } else if (userAgent.indexOf('iPad') > -1) {
      
       function callios() {

         location.href = calllinkios;
    // $.mobile.changePage(calllinkios);

   };
   document.getElementById("call2").onclick = function() { callios(); };

      var mobile_system = 'ipad';
   } else {
      var mobile_system = '';
    }
    });


$('#directions').ready(function() { 
var userAgent = navigator.userAgent + '';
    if (userAgent.indexOf('iPhone') > -1) {
    
    function directions() {
navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position)
        {
	        var dirlinkios = "maps:saddr=" + position.coords.latitude + "," + position.coords.longitude + "&daddr=" + businessaddress;
	        location.href = dirlinkios;
	  		};

   };
   document.getElementById("directions").onclick = function() { directions(); };
  
  var mobile_system = 'iphone';
    } else if (userAgent.indexOf('Android') > -1) {
      
       function directionsandr() {

	      var dirlinkandr = "geo:0,0?q=" + businessaddress;
          location.href = dirlinkandr;
   };
   document.getElementById("directions").onclick = function() { directionsandr(); };

      var mobile_system = 'android';
    } else if (userAgent.indexOf('iPad') > -1) {
    
    function directions() {
navigator.geolocation.getCurrentPosition(showPosition);

        function showPosition(position)
        {
	        var dirlinkios = "maps:saddr=" + position.coords.latitude + "," + position.coords.longitude + "&daddr=" + businessaddress;
	        location.href = dirlinkios;
	  		};

   };
   document.getElementById("directions").onclick = function() { directions(); };
      var mobile_system = 'ipad';
    
    } else {
       function directions2() {
	      
	      var dirlink = "geo:0,0?q=" + businessaddress;
          location.href = dirlink;

   };
   document.getElementById("directions").onclick = function() { directions2(); };

      var mobile_system = '';
    }
    });

// EmailComposer
            


$('#email').ready(function() {  var userAgent = navigator.userAgent + '';
    if (userAgent.indexOf('iPhone') > -1) {
      
       function emailios() {

         var args;
        
         window.plugins.emailComposer.showEmailComposer(subject, body, [mailto], [], [],false,[]); 

   };
   document.getElementById("email").onclick = function() { emailios(); };

      var mobile_system = 'iphone';
    } else if (userAgent.indexOf('Android') > -1) {
      
       function emailandr() {

	       var maillink = "mailto:" + mailto;	
	       location.href = maillink;

   };
   document.getElementById("email").onclick = function() { emailandr(); };

      var mobile_system = 'android';
    } else if (userAgent.indexOf('iPad') > -1) {
      
       function emailios() {

         var args;
        
         window.plugins.emailComposer.showEmailComposer(subject, body, [mailto], [], [],false,[]); 

   };
   document.getElementById("email").onclick = function() { emailios(); };

      var mobile_system = 'ipad';
    } else {
      var mobile_system = '';
    }
    });



//pushnot init


    function onBodyLoad() {
      document.addEventListener("deviceready", function() {

        push = window.pushNotification

        // Reset Badge on resume
        document.addEventListener("resume", function() {
          push.resetBadge()
        })

        push.getIncoming(function (incoming) {
          if(incoming.message) {
            console.log("Incoming push: " + incoming.message)
          } else {
            console.log("No incoming message")
          }
        })

        function on_push(data) {
          console.log("Received push: " + data.message)
        }

        function on_reg(error, pushID) {
          if (!error) {
            console.log("Reg Success: " + pushID)
            $('#id').text(pushID)
          }
        }

        push.registerEvent('registration', on_reg)

        push.registerEvent('push', on_push)

        function add_tag(tag) {
          $('#tags').prepend("<p>" + tag + "<input type='button' class='removeTagButton' value='Remove' /></p>")
          //This needs to be here because the element doesn't exist at load.
          $(".removeTagButton").on("click", function(ev) {
            p = $(ev.target).parent()
            tag = p.text()
            p.remove()
            push.getTags(function(obj) {
              console.log("Removing tag: " + tag)
              obj.tags.splice(obj.tags.indexOf(tag), 1)
              push.setTags(obj.tags)
            })
          })
        }

        function set_alias(alias) {
          $("#alias").text(alias)
          $("#setAliasField").val("")
        }

        push.isPushEnabled(function(has_push) {
          if (has_push) {
            $('#pushEnabled').val('on').change();
          } else {
            $('#pushEnabled').val('off').change();
          }
        })

        push.isSoundEnabled(function(has_sound) {
          if (has_sound) {
            $('#soundEnabled').val('on').change();
          } else {
            $('#soundEnabled').val('off').change();
          }
        })

        push.isVibrateEnabled(function(has_vibrate) {
          if (has_vibrate) {
            $('#vibrateEnabled').val('on').change();
          } else {
            $('#vibrateEnabled').val('off').change();
          }
        })

        push.isQuietTimeEnabled(function(has_quiettime) {
          if (has_quiettime) {
            $('#quietTimeEnabled').val('on').change();
          } else {
            $('#quietTimeEnabled').val('off').change();
          }
        })

        push.isLocationEnabled(function(enabled) {
          if (enabled) {
            $('#locationEnabled').val('on').change();
          } else {
            $('#locationEnabled').val('off').change();
          }
        })

        $('#pushEnabled').change(function() {
          if ($('#pushEnabled').val() == "on") {
            // This means we want to turn it on
            push.enablePush()
          } else {
            push.disablePush()
          }
        })

        $('#soundEnabled').change(function() {
          if ($('#soundEnabled').val() == "on") {
            //This means we want to turn it on
            push.setSoundEnabled(true)
          } else {
            push.setSoundEnabled(false)
          }
        })

        $('#vibrateEnabled').change(function() {
          if ($('#vibrateEnabled').val() == "on") {
            //This means we want to turn it on
            push.setVibrateEnabled(true)
          } else {
            push.setVibrateEnabled(false)
          }
        })

        $('#quietTimeEnabled').change(function() {
          if ($('#quietTimeEnabled').val() == "on") {
            //This means we want to turn it on
            push.setQuietTimeEnabled(true)
          } else {
            push.setQuietTimeEnabled(false)
          }
        })

        $('#locationEnabled').change(function() {
          if ($('#locationEnabled').val() == "on") {
            //This means we want to turn it on
            push.enableLocation()
          } else {
            push.disableLocation()
          }
        })

        $("#addTagButton").click(function(ev) {
          var new_tag = $("#addTagField").val()
          console.log("Adding new tag: " + new_tag)
          push.getTags(function(obj) {
            if (obj.tags.indexOf(new_tag) == -1) {
              console.log("Valid tag: " + new_tag)
              obj.tags = obj.tags.concat([new_tag])
              push.setTags(obj.tags, function() {
                add_tag(new_tag)
                $("#addTagField").val('')
              })
            }
          })
        })

        $("#setQuietTimeButton").click(function(ev) {
          var startHour = parseInt($("#startHour").val())
          var startMinute = parseInt($("#startMinute").val())
          var endHour = parseInt($("#endHour").val())
          var endMinute = parseInt($("#endMinute").val())

          push.setQuietTime(startHour, startMinute, endHour, endMinute, function() {
            console.log("Set quiet time from JS")
          })
        })

        $("#setAliasButton").click(function(ev) {
          var new_alias = $("#setAliasField").val()
          push.setAlias(new_alias, function() {
            set_alias(new_alias)
          })
        })

        push.getPushID(function (id) {
            if (id) {
             console.log("Got push ID: " + id)
             $('#id').text(id)
          }
        })

        push.getAlias(function (alias) {
          if(alias) {
            console.log("Got alias: " + alias)
            set_alias(alias)
          } else {
            console.log("No alias");
          }
        })

        push.getTags(function(obj) {
          obj.tags.forEach(function(tag) {
            add_tag(tag)
          })
        })

        push.getQuietTime(function(obj) {
          $("#startHour").val(obj.startHour)
          $("#startMinute").val(obj.startMinute)
          $("#endHour").val(obj.endHour)
          $("#endMinute").val(obj.endMinute)
        })

        push.registerForNotificationTypes(push.notificationType.badge | push.notificationType.sound | push.notificationType.alert)
        if (device.platform != "Android") {
          $("#soundEnabledSection").hide();
          $("#vibrateEnabledSection").hide();
        }
      })
    }
	


// messages page unbind click
            

	/*		$("#detailsPage").live('pageinit', function(event) {
                $(".ui-collapsible-heading").unbind("click");
            });	
*/