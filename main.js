const logger = require("./tools/logger.js");
const helper = require("./tools/helper.js");

// models
// must import users.js FIRST to connect database
// CANNOT connect database more than one time 
const users = require('./models/users.js');
const options = require('./models/options.js');
const matches = require('./models/matches.js');
const bets = require('./models/bets.js');

const Discord = require('discord.js');
const botToken = require('./secret.js');
const bot = new Discord.Client();

var prefix = '?';
var typeZh = [
	"",	// 0
	"半場主勝",	// 1
	"半場客勝",	// 2
	"半場和",	// 3
	"全場主勝",	// 4
	"全場客勝",	// 5
	"全場和",	// 6
	"半場主隊波膽",	// 7
	"半場客隊波膽",	// 8
	"全場主隊波膽",	// 9
	"全場客隊波膽",	// 10
	"半場波膽",	// 11
	"全場波膽",	// 12
	"半場入球細",	// 13
	"半場入球大",	// 14
	"全場入球細",	// 15
	"全場入球大",	// 16
	"角球大",	// 17
];
var commandList = [
	prefix + "help",
	prefix + "money",
	prefix + "matches",
	prefix + "options",
	prefix + "bet",
	prefix + "profile",
	prefix + "create",
	prefix + "test",
];
var commandHelpMessage = [
	":\tdisplay this help message",
	":\tget daily rewatd",
	" [number(optional)]:\tdisplay available matches for betting",
	" [match ID]:\tdisplay available betting options for a match",
	" [match ID] [option] [amount]:\tplace a bet",
	" [username(optional)]:\tdisplay the profile of a user account",
	":\tcreate a new account \*only one account per user",
];
var developerlist = [4791,];

bot.on('ready', () => {
	logger.trace(`Logged in as ${bot.user.tag}!`);
});
bot.on('message', (message) => {
	if (message.author.bot === false) {
		var content = message.content.replace(/\s+/g, ' ').split(" ");
		var username = message.author.username;
		var userID = message.author.discriminator;
		if (content[0].substring(0, 1) === prefix) {
			logger.info(username + ":\t" + content);
			switch (content[0]) {
				case (commandList[0]):
					displayHelp(message); // command: help
					break;
				case (commandList[1]): // command: money
					dailyReward(userID, message);
					break;
				case (commandList[2]): // command: matches [number(optional)]
					var number = !content[1] ? 5 : content[1];
					displayMatches(number, message);
					break;
				case (commandList[3]): // command: options [matchID]
					displayOptions(content[1], message);
					break;
				case (commandList[4]): // command: bet [matchID] [type] [amount]
					if(content[1] && content[2] && content[3]){
						placeBet(content[1], typeZh.indexOf(content[2]), content[3], message);
					}
					break;
				case (commandList[5]): // command: profile [username(optional)]
					var profile = !content[1] ? username : content[1];
					displayProfile(profile, message);
					break;
				case (commandList[6]): // command: create
					createUser(message);
					break;
				/****** testing area ******/
				case (commandList[7]): // command: test [argument(s)(optional)]
					if (helper.isDeveloper(message.author.discriminator, developerlist)) {
					} else {
						message.reply("其實你知唔知自己講緊乜？");
					}
					break;
				/****** testing area ******/
				default:
					message.reply("其實你知唔知自己講緊乜？");
					break;
			}
		}
	}
});
bot.login(botToken);

// main functions
function displayHelp(message) {
	var helpMessage="";
	var i;
	var l = commandList.length-1;
	for (i = 0; i < l; i++) {
		helpMessage += commandList[i] + commandHelpMessage[i]+"\n";
	}
	message.channel.send(helpMessage);
}

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
		if(userInfo){
			var newAmount = (userInfo.capital * 10 + amount) / 10;
			if (helper.praseDateInt(today) - helper.praseDateInt(userInfo.updated_on) > 0) { // only allow user to get money in alternative day
				users.updateUserCapital(userID, newAmount, function (result) {
					message.reply(`你多左\$${amount / 10}。`);
					logger.info(`${userInfo.username}got \$${amount}. New amount: \$${newAmount}`);
				});
			} else {
				message.reply("今日拎左錢啦你。仲想拎？");
			}
		} else {
			message.reply("你冇AC啊，你冇AC啊，你冇AC啊，你冇AC啊，你冇AC啊，你冇AC啊。");
		}
	});
}

function displayProfile(username, message) {
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
				matchesList += `__**${item.homeTeam.toUpperCase()} vs. ${item.awayTeam.toUpperCase()}**__\n` +
					`ID: __**${item.matchID}**__\n` +
					`日期: ${helper.praseDate(item.date)}\n`;
				if (item.endded === 1) {
					matchesList += `角球: ${item.corners}\n` +
						`比數: ${item.homeFinalScore}-${item.awayFinalScore}(${item.homeHalftimeScore}-${item.awayHalftimeScore})\n`;
				}
			});
			message.channel.send(matchesList);
		} else {
			message.reply("揾唔到野喎。");
		}
	});
}

function displayOptions(matchID, message) {
	if (matchID) {
		options.getOptionByMatchID(matchID, function (result) {
			var optionsList = "";
			if (result) {
				result.forEach(function (item) {
					if (typeZh[item.type] && item.ratio){
						if (item.special_requirement){
							optionsList += `__**${typeZh[item.type]}(${item.special_requirement})**__\n賠率: ${item.ratio}\n`;
						} else {
							optionsList += `__**${typeZh[item.type]}**__\n賠率: ${item.ratio}\n`;
						}
					}
				});
				if (optionsList) {
					message.channel.send(optionsList);
				} else {
					message.reply("呢到冇野比你買。");
				}
			} else {
				message.reply("呢到冇野比你買。");
			}
		});
	} else {
		message.reply("你想睇邊場波啊？");
	}
}

function placeBet(matchID, type, amount, message) {
	users.getUser(message.author.discriminator, function (user) {
		if(user){
			if (user.capital >= amount) {
				matches.getMatchByID(matchID, function (match) {
					if (match) {
						if (!match.endded && match.date.getTime() > Date.now()) {
							options.getOptionByMatchIDandType(matchID, type, function (option) {
								if (option) {
									bets.insertBet(matchID, type, amount, message, function (result) {
										if (result) {
											message.reply("幫你買左啦。");
											users.updateUserCapital(message.author.discriminator, user.capital-amount, function(){
												return true;
											});
										} else {
											message.reply("唔知搞咩落唔到注。");
										}
									});
								} else {
									message.reply("你買咩啊...");
								}
							});
						} else {
							message.reply("一早完左啦場波。");
						}
					} else {
						message.reply("邊有呢場波啊？");
					}
				});
			} else {
				message.reply("冇錢就咪買波啦！死窮鬼！");
			}
		} else {
			message.reply("咪玩啦，你都冇AC。");
		}
	});
}