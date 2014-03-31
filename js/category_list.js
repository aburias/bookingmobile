(function(){
        $.ajax({url: (serviceURL + productsListFile + '?company_code=' + encodeURIComponent(company_code)), 
               type:'get',        
               success:function(data){
                   var j = JSON.parse(data);
                   var items = j.products;
                   localStorage.setItem('items',JSON.stringify(items));
                   var ul = $("#category_list").find("ul");
                   ul.find('li').remove();
                   for (i in items){
                      ul.append(" <li><a href='#detail?id=" + i + "' rel='external'><img src='" + items[i].image_url + "'>" + items[i].product_name + "</a></li>");
                   }
                  
                   
                }         
                });          
                          
})();
$(document).bind('pageinit', function(event) {
   $('#category_list').live('pageinit',function(){
      $("#category_list").find("ul").listview('refresh');
   });
   $('#detail').live('pageshow',function(){
   	  var a = getUrlVars();
        var items = JSON.parse(localStorage['items']);
   	    $.mobile.showPageLoadingMsg("d", "Loading Data...");
       
                              var mi = $(this).find("#model-info"); 
                             
                       	      if (items[a.id].image_url != ""){
                                 $("#profile-photo").attr('src',items[a.id].image_url);
                                 $("#profile-photo").show();
                              }
                              else
                                 $("#profile-photo").hide(); 

                              $('.ui-collapsible-heading').find(".ui-btn-text").html(items[a.id].product_name.split(' ')[0] + "'s Profile");
                              mi.find('.ui-btn-text').html("About " + items[a.id].product_name.split(' ')[0]); 
                       	      $(".ui-grid-a").html(items[a.id].product_description);

                       	      $.mobile.showPageLoadingMsg("d", "",true);
							  
		
	});
});

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
