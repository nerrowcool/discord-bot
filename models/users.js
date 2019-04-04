const logger = require('../tools/logger.js');
const helper = require('../tools/helper.js')

const mysql = require('../tools/database.js');
const db = mysql.mysqlDatabase;
mysql.mysqlConnect(db);

var createUser = function (messageAuthor, callback) {
	getUser(messageAuthor.discriminator, function (record) {
		if (!record) {
			var sql = "INSERT INTO `users` SET ?";
			var data = {
				userID: messageAuthor.discriminator,
				username: messageAuthor.username,
				capital: 200.0,
			};
			db.query(sql, data, function (err, result, fields) {
				helper.logError(err);
				callback(result);
			});
		} else {
			record = "exist";
			callback(record);
		}
	});
};

var getUser = function (id, callback) {
	var sql = "SELECT * FROM `users` WHERE `userID`=? LIMIT 1";
	var data = [id];
	db.query(sql, data, function (err, result, fields) {
		helper.logError(err);
		callback(result[0]);
	});
};

var getUserByUsername = function (name, callback) {
	var sql = "SELECT * FROM `users` WHERE `username`=? LIMIT 1";
	var data = [name];
	db.query(sql, data, function (err, result, fields) {
		helper.logError(err);
		callback(result[0]);
	});
};

var updateUserCapital = function (id, newAmount, callback) {
	var sql = "UPDATE `users` SET `capital`=? WHERE `userID`=?";
	var data = [newAmount, id];
	db.query(sql, data, function (err, result, fields) {
		helper.logError(err);
		callback(result);
	});
};

module.exports = {
	getUser,
	getUserByUsername,
	updateUserCapital,
	createUser,
};