const logger = require("./tools/logger.js");
const helper = require("./tools/helper.js");

// models
// must import users.js FIRST to connect database
// CANNOT connect database more than one time 
const users = require('./models/users.js');
const options = require('./models/options.js');
const matches = require('./models/matches.js');

const Discord = require('discord.js');
const botToken = require('./secret.js');
const bot = new Discord.Client();

var prefix = '?';

bot.on('ready', () => {
	logger.trace(`Logged in as ${bot.user.tag}!`);
});
bot.on('message', (message) => {
	if (message.author.bot === false) {
		var content = message.content.split(" ");
		var username = message.author.username;
		var userID = message.author.discriminator;

		if (content[0].substring(0, 1) === prefix) {
			logger.info(username + ":\t" + content);
			switch (content[0]) {
				case (prefix + "create"): // command: create
					createUser(message);
					break;
				case (prefix + "money"): // command: money
					dailyReward(userID, message);
					break;
				case (prefix + "profile"): // command: profile [username(optional)]
					var profile = !content[1] ? username : content[1];
					displaySelfStatus(profile, message);
					break;
				case (prefix + "matches"): // command: matches [number(optional)]
					var number = !content[1] ? 5 : content[1];
					displayMatches(number, message);
					break;
				case (prefix + "options"): // command: options [matchID]
					if (content[1]) {
						displayOptions(content[1], message);
					} else {
						message.reply(`喂，打漏野啊，係\"${prefix}option [matchID]\"。`);
					}
					break;
					// 	break;
					// case (prefix + "bet"): // command: bet [matchID] [type] [amount]
					// 	break;

				default:
					message.reply("其實你知唔知自己講緊乜？");
					break;
			}
		}
	}
});
bot.login(botToken);

/****** testing area ******/
// users.getUser(321312, function(result) {!result?console.log("not exist") : console.log("exist");});
/****** testing area ******/

// main functions
function createUser(message) {
	users.createUser(message.author, function (result) {
		var resultMessage = (result === "exist") ? "你有AC囉喎。" : "你個AC開左啦。依家有$200本金。";
		message.reply(resultMessage);
	});
}

function dailyReward(userID, message) {
	var amount = Math.floor(Math.random() * 500); // 0 to 500
	var today = new Date();

	users.getUser(userID, function (userInfo) {
		var newAmount = (userInfo.capital * 10 + amount) / 10;
		if (helper.praseDateInt(today) - helper.praseDateInt(userInfo.updated_on) > 0) { // only allow user to get money in alternative day
			users.updateUserCapital(userID, newAmount, function (result) {
				message.reply(`你多左\$${amount / 10}。`);
				logger.info(`${userInfo.username}got \$${amount}. New amount: \$${newAmount}`);
			});
		} else {
			message.reply("今日拎左錢啦你。仲想拎？");
		}
	});
}

function displaySelfStatus(username, message) {
	users.getUserByUsername(username, function (userInfo) {
		if (!userInfo) {
			message.reply("冇呢條友喎。");
		} else {
			var userInfoMessage = `__**${userInfo.username}**__\n錢: \$${userInfo.capital}`;
			message.channel.send(userInfoMessage);
		}
	});
}

function displayMatches(number, message) {
	matches.getMatches(number, function (result) {
		var matchesList = "";
		if (result.length > 0) {
			result.forEach(function (item) {
				matchesList += `__**${item.matchID}.**__\t__**${item.homeTeam.toUpperCase()} vs. ${item.awayTeam.toUpperCase()}**__\n` +
					`\t\t日期: ${helper.praseDate(item.date)}\n`;
				if (item.endded === 1) {
					matchesList += `\t\t角球: ${item.corners}\n` +
						`\t\t比數: ${item.homeFinalScore}-${item.awayFinalScore}(${item.homeHalftimeScore}-${item.awayHalftimeScore})\n`;
				}
			});
			message.channel.send(matchesList);
		} else {
			message.reply("揾唔到野喎。");
		}
	});
}

function displayOptions(matchID, message) {
	options.getOptionByMatchID(matchID, function (result) {
		var optionsList = "";
		if (result) {
			result.forEach(function (item) {
				optionsList += `__**${item.type}**__\n賠率: ${item.ratio}\n`;
			});
			message.channel.send(optionsList);
		} else {
			message.reply("都唔知你買乜柒！");
		}
	});
}
		}
	});
}