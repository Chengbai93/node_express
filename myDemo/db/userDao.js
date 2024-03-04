var db = require('./db');

module.exports = {

    getUser: function (username, password, callback) {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (err, rows) {
            if (err) {
                callback(err);
            } else {
                callback(null, rows[0]);
            }
        });
    },

    getUserByUsername: function (username, callback) {
        db.query('SELECT * FROM users WHERE username = ?', [username], function (err, rows) {
            if (err) {
                callback(err);
            } else {
                callback(null, rows[0]);
            }
        });
    }
}