const logger = require('../tools/logger.js');
const helper = require('../tools/helper.js')

const mysql = require('../tools/database.js');
const db = mysql.mysqlDatabase;

var getOptionByMatchID = function (matchID, callback) {
	var sql = "SELECT * FROM `options` WHERE `matchID`=?";
	var data = [matchID];
	db.query(sql, data, function (err, result, fields) {
		helper.logError(err);
		if(result.length){
			callback(result);
		} else {
			callback(false);
		}
	});
};

var getOptionByMatchIDandType = function (matchID, type, callback) {
	var sql = "SELECT * FROM `options` WHERE `matchID`=? AND `type`=? LIMIT 1";
	var data = [matchID, type];
	db.query(sql, data, function (err, result, fields) {
		helper.logError(err);
		if(result.length){
			callback(result[0]);
		} else {
			callback(false);
		}
	});
};

var insertOption = function(type, ratio, callback){
  var sql = "INSERT INTO `options` SET ?";
  var data = {
    matchID: 1,
    type: type,
    ratio: ratio,
  };
  db.query(sql, data, function (err, result, fields) {
    helper.logError(err);
    callback(result);
  });
};

module.exports = {
  getOptionByMatchID,
  getOptionByMatchIDandType,
	insertOption,
};