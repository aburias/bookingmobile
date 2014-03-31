
$(window).bind('load',function(){
   (function(){  
    
      var i = 0;
      var mc = $('#models ul').html();
      var mc1 = $('#commercial ul').html();
      var ul = $('<ul></ul>');

      ul.append(mc);
      ul.append(mc1);
      mc = ul.find('li');
         
      serviceURL = "http://theapp4u.com/services/assets/";
      serviceListFile = 'getemployees.php';
      serviceDetailsFile = 'getemployee.php';    
          
      var testfunc = function(){
        var a = mc.eq(i).find('a');
        var category;
                        
        if (typeof(a.attr('href')) != "undefined"){

          category = a.attr('href').split('?')[1].replace('rel=','');
   
          if (i < mc.length){
             $.ajax({url: (serviceURL + serviceListFile + '?category='+ category), 
                               success:function(data){
                                
                                       localStorage.setItem(category,data);
                         i++;
                         setTimeout(testfunc,300);
                    }
            });
          }
        }
        }
      testfunc();
   })();
   (function(){
       var temp = [];
       var j = 0;

       var get_desc = function(){
           if (j < temp.length){

              $.ajax({
                      url:temp[j].url,
                      success:function(data){
                          var detail = $(data).find('.blogpostdetail');
                           temp[j].description = detail.find('p').html();
                           j++;
                           setTimeout(get_desc,50);
                      }
              });
           }else{
              localStorage.setItem('news-feed',JSON.stringify(temp));

           }
       }

       $.ajax({
            url:'http://www.assetsmodels.com/index.php/ireland/fashion/fashion-news',
            dataType:'html',
            success:function(data){
               var content = $(data).find('.blogpost');
               var i = 0;
               content.each(function(){
                    
                    var rel = $(this).find('a').attr('href');
                    var sdate = $(this).find('img').attr('title');
                    var id = $(this).attr('id');
                    var detail_url = rel;
                    var featured_photo =  $(this).find('img').attr('src').replace('&h=260&w=570&zc=1','&h=320&w=320&zc=1');
                    var title =  $(this).find('h2').html();
                    var xdata = {id:id,date:sdate,url:detail_url,featured_photo:featured_photo,title:title,description:''};
                    temp[i] = xdata
                    i++;
                    
               });
              
               localStorage.setItem('news-feed',JSON.stringify(temp));
               get_desc();
             } 
      });

   })();
});
(function(window, $, PhotoSwipe){


  
   $(document).on('pagebeforeshow', '#model-gallery', function(){

     var ul = $(this).find(".gallery");
     var a = getUrlVars();
     var base =  "http://www.assetsmodels.com/wp-content/themes/assetsmodels-com/functions/thumb.php?src=";
     var thumb_param = "&h=320&w=240&zc=1";
     var large_param = "&h=900&w=600&zc=1";
     var filename = "",
         filename1 = "";
         ul.html('');
         
         $(this).find("h1").html(models[a.id].name + "'s Gallery"); 

         for (i in models[a.id].photos){
                 filename = base + models[a.id].photos[i][1] + thumb_param;
                 filename1 = base + models[a.id].photos[i][1] + large_param;
                 ul.append('<li><a href="' + filename + '" rel="external"><img src="' + 
                           filename1 + '"  /></a></li>');
         }   
        var myPhotoSwipe = $(this).find(".gallery li a").photoSwipe({
           jQueryMobile: true,
           loop: false,
           enableMouseWheel: false,
           enableKeyboard: false
        });

    myPhotoSwipe.show(0);       
  });			
  
}(window, window.jQuery, window.Code.PhotoSwipe));