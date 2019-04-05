const logger = require('../tools/logger.js');
const helper = require('../tools/helper.js')

const mysql = require('../tools/database.js');
const db = mysql.mysqlDatabase;

var insertBet = function (matchID, type, amount, message, callback) {
  var sql = "INSERT INTO `bets` SET ?";
  var data = {
    userID: message.author.discriminator,
    matchID: matchID,
    amount: amount,
    type: type,
  };
  db.query(sql, data, function (err, result, fields) {
    helper.logError(err);
    callback(result);
  });
};

module.exports = {
  insertBet,
};