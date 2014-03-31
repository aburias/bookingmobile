$('#send-rate').live("click", function() {
	var url = 'http://www.theapp4u.com/services/efit/rate.php';
	var error = 0;
	var $bookingpage = $(this).closest('.ui-page');
	var $bookingform = $(this).closest('.rate-form');
	$('.required', $bookingform).each(function (i) {
        if ($(this).val() === '') {
			error++;
        } 
	}); // each
	if (error > 0) {
			alert('Please fill in all the mandatory fields. Mandatory fields are marked with an asterisk *.');	
	} else {
		var firstname = $bookingform.find('input[name="firstname"]').val();
		var email = $bookingform.find('input[name="email"]').val();
		var service = $bookingform.find('select[name="service"]').val();
		var rate = $bookingform.find('select[name="rate"]').val();		
		var note = $bookingform.find('textarea[name="note"]').val();

		//submit the form
		$.ajax({
			type: "GET",
			url: url,
			data: {firstname:firstname, email:email, service:service, rate:rate, note:note, },
            success: function (data) {
				if (data == 'success') {
					// show thank you 
					$bookingform.find("input[type=text], input[type=email], select, textarea").val("");
					$bookingpage.find('.booking-thankyou').show(0);
					$bookingpage.find('.rate-form').hide(0);
					$bookingpage.find('.booking-thankyou').delay(5000).hide(0);
					$bookingpage.find('.rate-form').delay(5000).show(0);
					
				}  else {
					alert('Unable to send your message. Please try again.');
				}
			}
		}); //$.ajax

	}
	return false;
});
