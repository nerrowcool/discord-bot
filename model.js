const log4js = require('log4js')
log4js.configure({
  appenders: { logger: { type: 'file', filename: 'log.log' } },
  categories: { default: { appenders: ['logger'], level: 'trace' } }
});
const logger = log4js.getLogger('logger');

const mysql = require('mysql'); 
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jc",
});
mysqlConnection.connect(function(err,result) {
    if (err){
        logger.error(err);
        process.kill(process.pid);
    }
    logger.info("Database Connected");
});

var getUser = function (id, callback){
    var sql = "SELECT * FROM `users` WHERE `userID`="+id+" LIMIT 1";
    mysqlConnection.query(sql, function(err, result, fields){
        if (err){
            logger.error(err);
        }
        console.log(JSON.stringify(result[0]));
        if (callback)
            callback(result[0]);
    });
};

var updateUserCapital = function (id, newAmount, callback){
    var sql = "UPDATE `users` SET `capital`="+newAmount+" WHERE `userID`="+id;
    mysqlConnection.query(sql, function(err, result, fields){
        if (err) throw err;
        console.log(JSON.stringify(result));
        callback(result);
    });
}

module.exports = {
    getUser,
    updateUserCapital,
};

