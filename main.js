const logger = require("./tools/logger.js");
const model = require('./model.js');

const Discord = require('discord.js');
const botToken = require('./secret.js');
const bot = new Discord.Client();
bot.on('ready', () => {
	logger.trace(`Logged in as ${bot.user.tag}!`);
});
/* get new command*/
bot.on('message', (result) => {
	var message = result.content;
	var username = result.author.username;
	var userID = result.author.id;
	var createdAt = new Date(result.createdTimestamp);
	
	logger.info(username+":\t"+message);
});
bot.login(botToken);

/****** testing area ******/
dailyReward(1);
/****** testing area ******/

function die() {
	process.kill(process.pid);
}
function praseDate(date) {
	var day = date.getDate();
	var month = date.getMonth()+1;
	var year = date.getFullYear();
	if(day<10){
		day = '0'+day;
	}
	if(month<10){
		month = '0'+month;
	}
	return parseInt(year+month+day);
}

// main functions
function dailyReward(userID) {
	var amount = Math.floor(Math.random()*150)/10; // 0 to 15 (1 d.c.)
	var today = new Date();

	model.getUser(userID, function(userInfo) {
		if(praseDate(today)-praseDate(userInfo.updated_on)>0){ // only allow user to get money in alternative day
			model.updateUserCapital(userID, userInfo.capital+amount, function(result) {
				logger.info(userInfo.username+" got $"+amount+". New capital: $"+(userInfo.capital+amount));
			});
		} else {
			// reply cannot get money
		}
	});
}