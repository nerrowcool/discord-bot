const log4js = require('log4js')
log4js.configure({
	appenders: { logger: { type: 'file', filename: 'log.log' } },
	categories: { default: { appenders: ['logger'], level: 'trace' } }
});
const logger = log4js.getLogger('logger')

const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NTU3NTcwNDAyNjMzNjQ2MTA2.D3YDIw.QT9Fc2ew0uWjDFhvxmJB7L6J1gc";

const model = require('./model.js');

client.on('ready', () => {
	var data = model.findUser();
	console.log(`Logged in as ${client.user.tag}!`);
	console.log('return value from function 1: '+data);
	// logger.info(model.findUser());
});

/* get new command*/
client.on('message', (result) => {
	var message = result.content;
	var username = result.author.username;
	var userID = result.author.id;
	var createdAt = new Date(result.createdTimestamp);

	console.log(model.findUser());
	console.log("logged");
	logger.info(username+":\t"+message);
});
client.login(token);

// main functions
function dailyReward(userID){
	var money = model.findUser(userID);
	var amount = Math.floor((Math.random() * 10) + 1);
	var date = new Date();

	return db.query({
		sql: 'UPDATE `profile` SET `money`=? WHERE `userID`=?',
		values: [money+amount, userID],
	});
}

function betting(userID){
    
}