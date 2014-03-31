
    /**
     * Take picture with camera
     */
    function takePicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Success";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI,saveToPhotoAlbum: true, correctOrientation: true, targetWidth: 1024, targetHeight: 768});
    };

    /**
     * Upload current picture
     */
    function uploadPicture() {
    	// Get URI of picture to upload
        var img = document.getElementById('camera_image');
        var imageURI = img.src;
        if (!imageURI || (img.style.display == "none")) {
            document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
            return;
        }
        
        // Verify server has been entered
        server = document.getElementById('serverUrl').value;
        if (server) {
        	
            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode = false;
           options.linkname = "http://www.theapp4u.com/upload/" + options.fileName;
            options.link = '<a href="' + options.linkname + '">Click here to see the image</a>';
window.plugins.emailComposer.showEmailComposer(subject, options.link, [mailto], [], [], true, []);
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	
	if (isAndroid) {
var maillink = 'mailto:' + mailto	+ '?subject=' + subject + '&amp;body=' + options.link + '&amp;content-type=text/html';
	       location.href = maillink;
	};
            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                document.getElementById('camera_status').innerHTML = "Upload successful"; 
                           	
            }, function(error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;            	
            }, options);
        }
    }

