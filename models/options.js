const logger = require('../tools/logger.js');
const helper = require('../tools/helper.js')

const mysql = require('../tools/database.js');
const db = mysql.mysqlDatabase;

var getOptionByMatchID = function (matchID, callback) {
	var sql = "SELECT * FROM `options` WHERE `matchID`=?";
	var data = [matchID];
	db.query(sql, data, function (err, result, fields) {
		helper.logError(err);
		callback(result);
	});
};

var getOptionByMatchIDandType = function (matchID, type) {
	var sql = "SELECT * FROM `options` WHERE `matchID`=? AND `type`=?";
	var data = [matchID, type];
	db.query(sql, data, function (err, result, fields) {
		helper.logError(err);
		callback(result);
	});
};

module.exports = {
  getOptionByMatchID,
  getOptionByMatchIDandType,

};