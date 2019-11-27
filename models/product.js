const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(name, price, description, id){
        this.name = name;
        this.price = price;
        this.description = description;
        this.id = id;
    }

    save(){
        const db = getDb();
        let dbOp;
        if(this.id){
            dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this.id)}, {$set: this})
        }else{
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp;
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray()
    }

    static findById(productId){
        const db = getDb();
        return db.collection('products').findOne({ _id: new mongodb.ObjectId(productId)});
    }

    static deleteOne(productId){
        const db = getDb();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(productId)});
    }
}

module.exports = Product;