const logger = require('../tools/logger.js');
const helper = require('../tools/helper.js')

const mysql = require('../tools/database.js');
const db = mysql.mysqlDatabase;

var getMatches = function (number, callback) {
  var sql = "SELECT * FROM `matches` ORDER BY `date` DESC LIMIT ?";
  var data = [number];
  db.query(sql, data, function (err, result, fields) {
    helper.logError(err);
    callback(result);
  });
};

module.exports = {
  getMatches,

}