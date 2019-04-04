const logger = require('./logger.js');
const helper = require('./helper.js');

const mysql = require('mysql'); 
const mysqlDatabase = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jc",
});

var mysqlConnect = function(connection) {
    connection.connect(function(err,result) {
        if (err){
            logger.fatal(err);
            helper.die();
        }
        logger.trace("Database Connected");
    });
};

module.exports = {
    mysqlDatabase,
    mysqlConnect,
};