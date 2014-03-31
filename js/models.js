
var employees;
var models = [];

serviceURL = "http://theapp4u.com/services/assets/";
serviceListFile = 'getemployees.php';
serviceDetailsFile = 'getemployee.php';


$.ajaxSetup({ cache: false });

$(document).bind('pageinit', function(event) {
	
    var fashion_url = "";
    $('.news-feed a').live('click',function(event){
    	fashion_url = $(this).attr('rel');
    });
    $('#blog-detail').live('pageshow',function(event){
      $('#blog-detail').find('.ui-content').hide();
      $.mobile.showPageLoadingMsg("d", "Loading Data...");
      if (fashion_url != ""){
      	  /*var temp = localStorage['news-feed'] || "no data";
          if (temp != "no data"){
               temp = JSON.parse(temp);
               var i = 0;
               for (i in temp){
             
                   if (temp[i].url == fashion_url)
                        break;
                }       
                console.debug(temp[i]);
                   	    $('#blog-detail').find('.ui-collapsible-heading').find('.ui-btn-text').html(temp[i].title);
		      			$('#blog-detail').find('#photo').attr('src',temp[i].featured_photo);
		      			$('#blog-detail').find('h2').html(temp[i].title);
		      			$('#blog-detail').find('p').html(temp[i].description);
		      			$('#blog-detail').find('b').html(temp[i].date);
		      			$.mobile.showPageLoadingMsg("d", "",true);
		      			$('#blog-detail').find('.ui-content').fadeIn();
                   
               
          }else{
          	*/
		      $.ajax({
		      			url:fashion_url,
		      			dataType:'html',
		      			success:function(data){
		      			   var detail = $(data).find('.blogpostdetail');
		      			   var title =detail.find('h2').html();
		      		      
		      			   $('#blog-detail').find('.ui-collapsible-heading').find('.ui-btn-text').html(title);
		      			   $('#blog-detail').find('#photo').attr('src',detail.find('img').attr('src'));
		      			   $('#blog-detail').find('h2').html(title);
		      			   $('#blog-detail').find('p').html(detail.find('p').html());
		      			    $('#blog-detail').find('b').html(detail.find('img').attr('title'));
		      			   $.mobile.showPageLoadingMsg("d", "",true);
		      			    $('#blog-detail').find('.ui-content').fadeIn();
		      			}	
		      });
		  //}
     }
    });
    $('#blogs').live('pageshow', function(event) {
      $('.news-feed li').remove();	
      $.mobile.showPageLoadingMsg("d", "Loading News...");
      var temp = localStorage['news-feed'] || "no data";
      
      if (temp != "no data"){
      	   $('.news-feed li').remove();
      	   temp = JSON.parse(temp);
           for (i in temp){
	   	   		
	      		 var s = '<li data-role="list-divider" data-theme="c">' + temp[i].date + '</li>' +
	                     '<li><a href="#blog-detail" rel="' + temp[i].url + '"><img src="' +  temp[i].featured_photo  + '">' +
	                     '<p>' +  temp[i].title  + '</p></a></li>'
	   	    
		         $('.news-feed').append(s); 

           }
           $('.news-feed').listview('refresh'); 
           $.mobile.showPageLoadingMsg("d", "",true);
      }else{
	      $.ajax({
	      			url:'http://www.assetsmodels.com/index.php/ireland/fashion/fashion-news',
	      			dataType:'html',
	      			success:function(data){
	      			   var content = $(data).find('.blogpost');

	      			    $('.news-feed li').remove();	
	      			   content.each(function(){
	      			   	   
	      			   	    var rel = $(this).find('a').attr('href');
	      			   	    var s = '<li data-role="list-divider" data-theme="c">' + $(this).find('img').attr('title') + '</li>' +
	                                '<li><a href="#blog-detail" rel="' + rel + '"><img src="' +  $(this).find('img').attr('src').replace('&h=260&w=570&zc=1','&h=320&w=320&zc=1')  + '">' +
	                                '<p>' +  $(this).find('h2').html()  + '</p></a></li>';

	      			   	    
		          			$('.news-feed').append(s);  
	      			   });
	      			   $('.news-feed').listview('refresh');
	      			   $.mobile.showPageLoadingMsg("d", "",true);
	      			}	
	      });
      }
   }); 

   $('#model-category').live('pagebeforeshow', function(event) {
        if ($('#model-list').is(':visible'))
          $('#model-list').hide();
   });
   
   $('#back-button').live('click', function(event) {
        if ($('#model-list').is(':visible'))
          $('#model-list').hide();
   });


   $('#model-category').live('pageshow', function(event) {
	 var a = getUrlVars();
	 var id = a.rel;

	   $('#model-list li').remove();
	   
       $.mobile.showPageLoadingMsg("d", "Loading Models...");
       
       var data = localStorage[a.rel] || "no data";
	 
	   if (data == "no data"){
           $.ajax({url: (serviceURL + serviceListFile + '?category='+ a.rel), 
                       success:function(data){
                       	       localStorage.setItem(a.rel,data);
                       	       var d = localStorage[a.rel] || "no data";
                       	       models = JSON.parse(d.split("|||")[0]);
							   for ( i in models) {
									   var base = 'http://theapp4u.com/services/assets/';	
									   var filename = "";
									   filename = models[i].photos[0][0];
									   
									   if (filename.indexOf('http') == 0)
									      $('#model-list').append('<li><a href="#model-page?link=' + id + '&rel=' + i + '" rel="external"><img src="' + models[i].photos[0][0] + '"><h3>' + models[i].name  + '</h3></a></li>');
							           else		  
							           	  $('#model-list').append('<li><a href="#model-page?link=' + id + '&rel=' + i + '" rel="external"><img src="' + base + models[i].photos[0][0] + '"><h3>' + models[i].name  + '</h3></a></li>');
								}

								$.mobile.showPageLoadingMsg("d", "",true);
								$('#model-list').listview('refresh');
		                        $('#model-list').show();
		                       
						}
			});
	   }
       else{
	      
	       models = JSON.parse(data.split("|||")[0]);     
	      
		   for ( i in models) {
				   var base = 'http://theapp4u.com/services/assets/';	
				   var filename = "";
				   filename = models[i].photos[0][0];
				   
				   if (filename.indexOf('http') == 0)
				      $('#model-list').append('<li><a href="#model-page?link=' + id + '&rel=' + i + '" rel="external"><img src="' + models[i].photos[0][0] + '"><h3>' + models[i].name  + '</h3></a></li>');
		           else		  
		           	  $('#model-list').append('<li><a href="#model-page?link=' + id + '&rel=' + i + '" rel="external"><img src="' + base + models[i].photos[0][0] + '"><h3>' + models[i].name  + '</h3></a></li>');
			}

			$.mobile.showPageLoadingMsg("d", "",true);
			$('#model-list').listview('refresh');
		    $('#model-list').show();
        }    
	
	
    });

	$('#model-page').live('pageshow',function(event){
		var a = getUrlVars();
		var id = a.rel;
		var mi = $(this).find("#model-info"); 
		var table = mi.find(".ui-grid-a");
		var info = [];
		table.html('');
        		
		var filename = "";
		var base =  "http://www.assetsmodels.com/wp-content/themes/assetsmodels-com/functions/thumb.php?src=";
        var thumb_param = "&h=320&w=240&zc=1";
	    
	    filename =  base + models[id].photos[0][1] + thumb_param;
	    
		$("#modelname").val(models[id].name);
		$('.ui-collapsible-heading').find(".ui-btn-text").html(models[id].name);
	    mi.find('.ui-btn-text').html('Model Information');
	    $(this).find("h2").html(models[id].description);
        
        $('#model-page').find("#profile-photo").remove();
	    $('#model-page').find('#holder').html('<img id="profile-photo">');

        var img = $(this).find("#profile-photo");
        $("#holder").height(Math.floor((320 / 240) * img.width())-30);
        img.hide();
       $.mobile.showPageLoadingMsg("a", "Loading...", true);
	    $(this).find("#profile-photo").attr("src",filename).load(function(){
	    	$.mobile.showPageLoadingMsg("d", "",true);
	    	img.fadeIn();
	    	$('#holder').css({'height':img.height()});
	        img.attr("src",models[id].photos[0][1]);
	        $('#holder').css({'height':'auto'});
	    });
	     
	    $(this).find("#back-button").attr("href","#model-category?rel=" + a.link);
	    $(this).find("#back-button").attr("rel","external");
	    $(this).find("#gallery-button").attr("href","#model-gallery?rel=" + a.link + "&id=" + id);
	    $(this).find("#gallery-button").attr("rel","external");
		info = models[id].description.split(',');

		for (i=0;i<=info.length -2;i++){
		   var s = 	info[i].split(':');

	       table.append('<div class="ui-block-a">' + s[0] + '</div><div class="ui-block-b">' + s[1] + '</div>');
		}
		
	});

});
$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + serviceDetailsFile + '?id='+id, displayEmployee);
});

function displayEmployee(data) {
	var employee = data.item;
	$('#employeeTitle').text(employee.title);
	$('#employeeTime').text(employee.date + ' ' +employee.time);

	$('#actionList').listview('refresh');
	
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
