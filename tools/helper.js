const logger = require('./logger.js');

var logError = function (err) {
	if (err)
		logger.error(err);
};

var die = function () {
	process.kill(process.pid);
};

var praseDateInt = function (date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	if (day < 10)
		day = '0' + day;
	if (month < 10)
		month = '0' + month;
	return parseInt(year + month + day);
};

var praseDate = function (date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var hour = date.getHours();
	var min = date.getMinutes();
	if (month < 10)
		month = '0' + month;
	if (day < 10)
		day = '0' + day;
	if (hour < 10)
		hour = '0' + hour;
	if (min < 10)
		min = '0' + min;
	return `${year}-${month}-${day} ${hour}:${min}`
}

var isDeveloper = function (userID, developerList) {
	var exist = developerList.find(function (item) {
		return item == userID;
	});
	return exist ? true : false;
};

module.exports = {
	logError,
	die,
	praseDateInt,
	praseDate,
	isDeveloper,
};