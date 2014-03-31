
var employees;

$(document).bind('pageinit', function(event) {
	$('#messages').bind('pageinit', function(event) {
			getEmployeeList();
	});

	$.ajaxSetup({ cache: false });

	function getEmployeeList() {
		
		$.getJSON(serviceURL + serviceListFile, function(data) {
			
			$('#employeelist li').remove();
			employees = data.items;
			$.each(employees, function(index, employee) {
				$('#employeeList').append(' <li data-role="list-divider">' + employee.date +'<span class="ui-li-count">' + employee.time +'</span></li><li><a href="#detailsPage?id=' + employee.id + '">' +
						
						'<p><div style="font-size: .8em; font-weight:normal; white-space:normal; height:auto; padding:3px">' + employee.title + '</div></p></a></li>');
			});
			$('#employeeList').listview('refresh');

		});
		setTimeout(getEmployeeList, 1000);
	}

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
});