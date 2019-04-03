const logger = require("./tools/logger.js");
const model = require('./model.js');

const Discord = require('discord.js');
const botToken = require('./secret.js');
const bot = new Discord.Client();

var prefix = '?';

bot.on('ready', () => {
	logger.trace(`Logged in as ${bot.user.tag}!`);
});
/* get new command*/
bot.on('message', (message) => {
	if(message.author.bot === false){
		var content = message.content.split(" ");
		var username = message.author.username;
		var userID = message.author.discriminator;
		
		if(content[0].substring(0,1)===prefix){
			logger.info(username+":\t"+content);
			switch(content[0]) {
				case("?create"):
					createUser(message);
					break;
				case("?money"):
					dailyReward(userID, message);
					break;
				case("?profile"):
					profile = !content[1] ? username : content[1]; 
					getSelfStatus(profile, message.channel);
					break;

				default:
					message.reply("this is not a valid command.");
					break;
			}
		}
	}
});
bot.login(botToken);

/****** testing area ******/
// model.getUser(321312, function(result) {!result?console.log("not exist") : console.log("exist");});
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
function createUser(message){
	model.createUser(message.author, function(result) {
		if(result==="exist"){
			message.reply("your account already exist.");
		} else {
			message.reply("your account had been successfully created. You have $200 initial capital.");
		}
	});
}

function dailyReward(userID, message) {
	var amount = Math.floor(Math.random()*500); // 0 to 500
	var today = new Date();
	
	model.getUser(userID, function(userInfo) {
		var newAmount = (userInfo.capital*10+amount)/10;
		if(praseDate(today)-praseDate(userInfo.updated_on)>=0){ // only allow user to get money in alternative day
			model.updateUserCapital(userID, newAmount, function(result) {
				message.reply("you have got $"+(amount/10));
				logger.info(userInfo.username+" got $"+amount+". New amount: $"+newAmount);	
			});
		} else {
			message.reply("you can only get money once per day. You greedy motherfucker.");
		}
	});

}

function getSelfStatus(username, channel) {
	model.getUser(username, function(userInfo) {
		var userInfoMessage = '__**'+username+'**__';
		channel.send(userInfoMessage);
	});
}