$('#send-booking').live("click", function() {
	
	var url = 'http://www.theapp4u.com/services/assets/formbook.php';
	var error = 0;
	var $bookingpage = $(this).closest('.ui-page');
	var $bookingform = $(this).closest('.booking-form');
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
		var mobilephone = $bookingform.find('input[name="mobilephone"]').val();
		var location = $bookingform.find('input[name="location"]').val();
		var persons = $bookingform.find('select[name="persons"]').val();
        var model = $bookingform.find('input[name="modelname"]').val();
      
		//submit the form
		$.ajax({
			type: "GET",
			url: url,
			data: {firstname:firstname, email: email, mobilephone: mobilephone, location: location, persons: persons, model: model},
            success: function (data) {
				if (data == 'success') {
					// show thank you 
					$bookingform.find("input[type=text], input[type=number], input[type=email], select").val("");
					$bookingpage.find('.booking-thankyou').show(0);
					$bookingpage.find('.booking-form').hide(0);
					$bookingpage.find('.booking-thankyou').delay(5000).hide(0);
					$bookingpage.find('.booking-form').delay(5000).show(0);
					
				}  else {
					alert('Unable to send your message. Please try again.');
				}
			}
		}); //$.ajax

	}
	return false;
});
