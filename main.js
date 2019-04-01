const log4js = require('log4js')
log4js.configure({
  appenders: { logger: { type: 'file', filename: 'log.log' } },
  categories: { default: { appenders: ['logger'], level: 'trace' } }
});
const logger = log4js.getLogger('logger')

const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NTU3NTcwNDAyNjMzNjQ2MTA2.D3YDIw.QT9Fc2ew0uWjDFhvxmJB7L6J1gc";

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

/* get new message*/
client.on('message', (result) => {
  var message = result.content;
  var username = result.author.username;
  var userID = result.author.id;
  var createdAt = new Date(result.createdTimestamp);

  logger.info(createdAt+" "+username+":\t"+message);
});
client.login(token);

// main functions
function userExsist(userID){

}

function dailyReward(userID){
  var money = db.query({
    sql: "SELECT money FROM `profile` WHERE `userID`=?",
    values: [userID],
  });
  var amount = Math.floor((Math.random() * 10) + 1);
  var date = new Date();

  return db.query({
    sql: 'UPDATE `profile` SET `money`=? WHERE `userID`=?',
    values: [money+amount, userID],
  });
}

function betting(userID){
    
}