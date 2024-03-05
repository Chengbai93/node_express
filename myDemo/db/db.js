var mysql = require('mysql');


var db = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'swhy1234',
    database: 'test'
});

// var db = mysql.createPool({
//     connectionLimit : 10,
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'test'
// });

module.exports = db;