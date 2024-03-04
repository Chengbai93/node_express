var db = require('./db');


getUserByUsername = (username) => {
    return new Promise((resolve, reject) => db.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) =>{
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
    }))
};


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

    getUserByUsername: getUserByUsername
}