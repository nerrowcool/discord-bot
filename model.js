const log4js = require('log4js')
log4js.configure({
  appenders: { logger: { type: 'file', filename: 'log.log' } },
  categories: { default: { appenders: ['logger'], level: 'trace' } }
});
const logger = log4js.getLogger('logger');

const mongoClient = require('mongodb').MongoClient;
const mongoUri = "mongodb+srv://root:9TpXKo88kq7PNLEE@jc-occro.azure.mongodb.net/JC?retryWrites=true";
const mongo = new mongoClient(mongoUri, { useNewUrlParser: true, });


module.exports = {
    findUser: function (id){
        var result = "didnot change";
        mongo.connect((err, database) => {
            if (err) throw err;
            database.db("JC").collection("users").find({userID: "1"}).toArray(
                function (err, abc){
                    if (err) throw err;
                    result = JSON.stringify(abc);
                    console.log("function 1 is returning value now");
                    return result;
                }
            );
        });
    },
};