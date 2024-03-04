var mysql = require('mysql');


var db = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'swhy1234',
    database: 'test'
});

module.exports = db;