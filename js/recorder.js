// handling document ready and phonegap deviceready

var mediaFile = "sample.wav"

var ua = navigator.userAgent.toLowerCase();
                var isAndroid = ua.indexOf("android") > -1;
	
                if (isAndroid) {
	                var mediaFile = "sample.mp3"
	                	};


document.addEventListener("deviceready", function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, gotFS, function fail(){});
}, false);

var gotFS = function (fileSystem) {
    fileSystem.root.getFile(mediaFile,
        { create: true, exclusive: false }, //create if it does not exist
        function success(entry) {
            var src = entry.toURL();
            console.log(src); //logs blank.wav's path starting with file://
            window.rootFS = fileSystem.root;
        },
        function fail() {}
    );
};




window.addEventListener('load', function () {
    document.addEventListener('deviceready', onDeviceReady, false);
}, false);

// Phonegap is loaded and can be used
function onDeviceReady(){

	var play_btn = $('#play');
	var pause_btn = $('#pause');
	var stop_btn = $('#stop');
	var rewind_btn = $('#rewind');
	var record_btn = $('#record');
	var upload_btn = $('#upload');

	upload_btn.click(function(){
		uploadFile(mediaFile);
	});

	
	play_btn.click(function(){
		playAudio(mediaFile);
		
		$(this).button('disable');
		pause_btn.button('enable');
	});
	
	pause_btn.click(function(){
		pauseAudio();
		
		$(this).button('disable');
		play_btn.button('enable');
	});
	
	stop_btn.click(function(){
		stopAudio();
		// reset slider
		$('#slider').val(0);
		$('#slider').slider('refresh');
		
	    pause_btn.button('disable');
		play_btn.button('enable');
	});
	
	rewind_btn.click(function(){
		stopAudio();
		playAudio(mediaFile);
		
	    play_btn.button('enable');
		pause_btn.button('disable');
	});
	
	record_btn.click(function(){
		stopAudio();
		$(this).button('disable');
		play_btn.button('enable');
		stop_btn.button('enable');
	//	pause_btn.button('disable');
		
		var recsec = 30;
		recordAudio(mediaFile);
		var rectxt = setInterval(function(){
			var recording = $('#recording');
			if(recsec == 0) {
				clearInterval(rectxt);
				recording.text('Recording done, ready to send...');
				record_btn.button('enable');
				//playAudio(mediaFile);
			} else {
				recording.text('Stop recording in ' + recsec + ' seconds' );
				--recsec;
			}
		},1000);
	});
}

/* Audio player */
var audio = null;
var audioTimer = null;
var pausePos = 0;

/* play audio file */
function playAudio(mediaFile){
	audio = new Media(mediaFile, function(){ // success callback
    	console.log("playAudio():Audio Success");
    }, function(error){ // error callback
    	alert('code: '    + error.code    + '\n' + 
          	  'message: ' + error.message + '\n');
    });
    
    // get audio duration
    var duration = audio.getDuration();
    
    // set slider data
    if( duration > 0 ){
	    $('#slider').attr( 'max', Math.round(duration) );
	    $('#slider').slider('refresh');
    }
    
    // play audio
    audio.play();
    
    audio.seekTo(pausePos*1000);

    // update audio position every second
    if (audioTimer == null) {
        audioTimer = setInterval(function() {
            // get audio position
            audio.getCurrentPosition(
                function(position) { // get position success
                    if (position > -1) {
                        setAudioPosition(position);
                    }
                }, function(e) { // get position error
                    console.log("Error getting pos=" + e);
                    //setAudioPosition(duration);
                }
            );
        }, 1000);
    }
}


    function uploadFile(mediaFile) {

    	var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=mediaFile.substr(mediaFile.lastIndexOf('/')+1);
            options.fileType="audio/wav";
            options.chunkedMode = false;
            options.linkname = "http://www.theapp4u.com/upload/" + options.fileName;
            options.link = '<h3><a href="' + options.linkname + '">Click here to download</a></h3>';
	                
            var userAgent = navigator.userAgent + '';
            	if (userAgent.indexOf('iPhone') > -1) {
	            	window.plugins.emailComposer.showEmailComposer(subject, options.link, [mailto], [], [], true, []);
        
	        var ft = new FileTransfer(),
            	path = "file://localhost"+window.rootFS.fullPath+"/",
            	name = mediaFile;
   };
    
            var userAgent = navigator.userAgent + '';
            	if (userAgent.indexOf('iPad') > -1) {
	            	window.plugins.emailComposer.showEmailComposer(subject, options.link, [mailto], [], [], true, []);
        
	        var ft = new FileTransfer(),
            	path = "file://localhost"+window.rootFS.fullPath+"/",
            	name = mediaFile;
   };
      
            
            var ua = navigator.userAgent.toLowerCase();
                var isAndroid = ua.indexOf("android") > -1;
	
                if (isAndroid) {
	                 var maillinkvoice = "mailto:" + mailto	+ "?subject=" + subject + "&amp;body=" + options.link + "&amp;content-type=text/html";
	                location.href = maillinkvoice;
	                 
	        var ft = new FileTransfer(),
            	path = "file:///mnt/sdcard/",
            	name = mediaFile;
	};


        ft.upload(path+name,
            "http://www.theapp4u.com/upload.php",
            function(result) {
                console.log('Upload success: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent');
                document.getElementById('recording').innerHTML = "Upload successful";
                
                
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
                document.getElementById('recording').innerHTML = "Upload failed: Code = "+error.code; 
            },
             options );   
    }


/* pause audio */
function pauseAudio() {
    if (audio) {
        audio.pause();
    }
}

/* stop audio */
function stopAudio() {
    if (audio) {
        audio.stop();
        audio.release();

    }
    clearInterval(audioTimer);
    audioTimer = null;
    pausePos = 0;
}

/* set audio position */
function setAudioPosition(position) {
	pausePos = position;
	position = Math.round(position);
    $('#slider').val(position);
    $('#slider').slider('refresh');
}

/* record audio file */
function recordAudio(mediaFile){
	audioRec = new Media(mediaFile, function(){ // success callback
    	console.log("recordAudio():Audio Success");
    }, function(error){ // error callback
    	alert('recording error : ' + error.message);
    });
    
    // start recording
    audioRec.startRecord();
    
    // stop recording after 10 seconds
   setTimeout(function(){
    	audioRec.stopRecord();
    	audioRec.release();
    }, 30000);
}
