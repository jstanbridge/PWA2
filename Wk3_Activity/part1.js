$(document).ready(function () {
	$('#zipcode').change(function(e){
		var zipCode = $(this).val();
		
		var requestURL = 'http://ziptasticapi.com/' + zipCode +'?callback=?';
		$.getJSON(requestURL, null, function(data){
			console.log(data);
			
			if (data.city) $('#city').val(data.city);
			if (data.state) $('#state').val(data.state);
		});
	});