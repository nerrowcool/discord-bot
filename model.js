const log4js = require('log4js')
log4js.configure({
  appenders: { logger: { type: 'file', filename: 'log.log' } },
  categories: { default: { appenders: ['logger'], level: 'trace' } }
});
const logger = log4js.getLogger('logger')

const mongoClient = require('mongodb').MongoClient;
const mongoUri = "mongodb+srv://root:9TpXKo88kq7PNLEE@jc-occro.azure.mongodb.net/test?retryWrites=true";
const mongo = new mongoClient(mongoUri, { useNewUrlParser: true });

function insertOneMongo(tableName, data){
    mongo.db("JC").collection(tableName).insertOne(data, function(error, result){
        if (error) throw error;
        logger.info(result);
    });
}

function insertManyMongo(tableName, data){
    mongo.db("JC").collection(tableName).insertMany(data, function(error, result){
        if (error) throw error;
        logger.info(result);
    });
}

function insertUser(data){
    mongo.connect(err => {
        insertOneMongo("users", data)
    });
}

function updateUser(){
    mongo.connect(err => {
        console.log(mongo.db("JC").collection("users"));
        // perform actions on the collection object
        mongo.close();
    });
}

function insertBet(){
    mongo.connect(err => {
        console.log(mongo.db("JC").collection("users"));
        // perform actions on the collection object
        mongo.close();
    });
}

function updateBet(){
    mongo.connect(err => {
        console.log(mongo.db("JC").collection("users"));
        // perform actions on the collection object
        mongo.close();
    });
}

function insertReward(){
    mongo.connect(err => {
        console.log(mongo.db("JC").collection("users"));
        // perform actions on the collection object
        mongo.close();
    });
}