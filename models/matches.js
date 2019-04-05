const logger = require('../tools/logger.js');
const helper = require('../tools/helper.js')

const mysql = require('../tools/database.js');
const db = mysql.mysqlDatabase;

var getMatches = function (number, callback) {
  var sql = "SELECT * FROM `matches` ORDER BY `date` DESC LIMIT ?";
  var data = [number];
  db.query(sql, data, function (err, result, fields) {
    helper.logError(err);
    if(result.length){
			callback(result);
		} else {
			callback(false);
		}
  });
};

var getMatchByID = function (matchID, callback) {
  var sql = "SELECT * FROM `matches` WHERE `matchID`=? LIMIT 1";
  var data = [matchID];
  db.query(sql, data, function (err, result, fields) {
    helper.logError(err);
    if(result.length){
      callback(result[0]);
    } else {
      callback(false);
    }
  });
};

module.exports = {
  getMatches,
  getMatchByID,
}