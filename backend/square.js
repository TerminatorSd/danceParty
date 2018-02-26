

exports.getNews = function (req,res) {
    
	console.log(req.query.name);

	var data = {
		name: 'alice',
		age: '18'
	}

	var result = {};
	result.code = 0;
	result.errMsg = 'none';
	result.data = data;

	res.end(JSON.stringify(result));

}