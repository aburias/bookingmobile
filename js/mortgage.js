$('#mortgage').live('pageshow', function() {
	
	Number.prototype.formatMoney = function(c, d, t){
		var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
		   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};
 
	function checkForZero(field) {
        if (field.value == 0 || field.value.length == 0) {
            //alert ("This field can't be 0!");
            field.focus(); }
        else
	    calculatePayment(field.form);
    }
	
	function calculate() {
		cmdCalc_Click();
	}
	
    function cmdCalc_Click() {
        if ($('#price').attr('value') == 0 || $('#price').attr('value').length == 0) {
         //   alert ("The Price field can't be 0!");
            $('#price').attr('value').focus(); }
        else if ($('#ir').attr('value') == 0 || $('#ir').attr('value').length == 0) {
          //  alert ("The Interest Rate field can't be 0!");
            $('#ir').attr('value').focus(); }
        else if ($('#term').attr('value') == 0 || $('#term').attr('value').length == 0) {
          //  alert ("The Term field can't be 0!");
            $('#term').attr('value').focus(); }
        else
			
            calculatePayment();
    }

    function calculatePayment() {
        princ = ($('#price').attr('value')  * 1000) - ($('#dp').attr('value') * 1000);
        intRate = ($('#ir').attr('value')/100) / 12;
        months = $('#term').attr('value') * 12;
        var pmt = Math.floor((princ*intRate)/(1-Math.pow(1+intRate,(-1*months)))*100)/100;
	    var payments = months;
		//console.log("============================");
		//console.log("principle is " + princ);
		//console.log("payments is " + payments);
		//console.log("pmt is " + pmt);
		princ = "£"+princ.formatMoney(0, '.', ',');
		pmt = "£"+pmt.formatMoney(2, '.', ',');
		$('div.output .principle span.output').html(princ);
		$('div.output .payments span.output').html(payments);
		$('div.output .monthly span.output').html(pmt);
    }
	
	$('input').change(function() {
		calculate();
	});
	
	cmdCalc_Click()
});