const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    const url = 'mongodb://localhost:27017/testing';
    const extraClasses = {useUnifiedTopology: true,
        useNewUrlParser: true
    }
    MongoClient.connect(url, extraClasses)
    .then((client) => {
        _db = client.db();
        callback();
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No database found';
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;