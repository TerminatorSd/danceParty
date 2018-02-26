
var mysql = require('../mysql')

exports.getAll = function (req, res) {

	var query = 'select * from school';

	mysql.query(query, {}, (err, data) => {
		var result = {};

		if(err) {
			result.errMsg = err;
		}
		else {
			result.data = data;
			result.code = 0;
			result.errMsg = '';
		}

		res.end(JSON.stringify(result));	
	})
}