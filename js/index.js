

$(document).ready(function () {
	// getSquareNews();
	getAllSchool();
})

function getSquareNews () {

	var data = {
		name: 'alice',
		age: '18'
	}
	
	$.ajax({
	    url: domain + '/get/square/news',
	    type: 'get',
	    dataType: 'json',
	    data: data,
	    success: function(data) {
	    	console.log(data);
	        if(data.code == 0){
	            // success
	        }
	        else
	            alert("get userlists failed!");
	    },
	    error: function(err) {
	        console.log(err);
	    }
	});
}

function getAllSchool () {
	 $.ajax({
	     url: domain + '/all/school',
	     type: 'get',
	     dataType: 'json',
	     data: {},
	     success: function(data) {
	         if(data.code == 0){
	         	console.log(data);
	         }
	         else
	             alert("get userlists failed!");
	     },
	     error: function(err) {
	         console.log(err);
	     }
	 });
}