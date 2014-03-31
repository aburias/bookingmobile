    var userAgent = navigator.userAgent + '';
    if (userAgent.indexOf('iPhone') > -1) {
      document.write('<script src="js/cordova.ios.js"></sc' + 'ript>');
      var mobile_system = 'iphone';
    } else if (userAgent.indexOf('Android') > -1) {
      document.write('<script src="js/cordova.andr.js"></sc' + 'ript>');
      var mobile_system = 'android';
    } else if (userAgent.indexOf('iPad') > -1) {
      document.write('<script src="js/cordova.ios.js"></sc' + 'ript>');
      var mobile_system = 'ipad';
    } else {
      var mobile_system = '';
    }
            
        
