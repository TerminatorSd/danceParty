'use strict'

var mysql = require("mysql");

//连接本地数据库
function getConn(){
    return mysql.createConnection({
        host:"localhost",
        port:"3306",
        user:"root",
        password:"123456",  //你的mysql root密码
        database:"dance_party" ,  //你的数据库名称
        charset:'UTF8_GENERAL_CI',
        multipleStatements: true   //多条mysql语句
      })
}

//查询mysql数据库的方法
exports.query = function (sql, params, callback) {
    var conn = getConn();
    conn.query(sql, params, function (err, data) {
        callback(err, data);
    });
    conn.end();
};