// bot and database set up
const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NTU3NTcwNDAyNjMzNjQ2MTA2.D3YDIw.QT9Fc2ew0uWjDFhvxmJB7L6J1gc";

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'betting',
})

var serverReady = false;
var clientReady = false;

db.connect(function(error, result, fields){
  //if(error){
  if(false){
    console.error("Error while connecting to mysql server");
    console.error(""+error);
    process.exit();
  }
  console.log("Connection to mysql server success!");
  serverReady = true;
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  clientReady = true;
});

client.on('message', (result) => {
  var message = result.content;
  var username = result.author.username;
  var userID = result.author.id;
  var createdAt = new Date(result.createdTimestamp);

  console.log(createdAt+" "+username+":\t"+message);
});

client.login(token);

// main functions

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