const logger = require('./tools/logger.js');

const mysql = require('./tools/database.js'); 
const db = mysql.mysqlDatabase;
mysql.mysqlConnect(db);

var getUser = function(id, callback) {
    var sql = "SELECT * FROM `users` WHERE `userID`="+id+" LIMIT 1";
    db.query(sql, function(err, result, fields) {
        if (err)
            logger.error(err);
        // console.log(JSON.stringify(result[0]));
        if (callback)
            callback(result[0]);
    });
};

var updateUserCapital = function(id, newAmount, callback) {
    var sql = "UPDATE `users` SET `capital`="+newAmount+" WHERE `userID`="+id;
    db.query(sql, function(err, result, fields) {
        if (err)
            logger.error(err);
        // console.log(JSON.stringify(result));
        callback(result);
    });
}

module.exports = {
    getUser,
    updateUserCapital,
};

