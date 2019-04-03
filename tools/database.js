const logger = require('./logger.js');

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
            process.kill(process.pid);
        }
        logger.trace("Database Connected");
    });
};

module.exports = {
    mysqlDatabase,
    mysqlConnect,
};