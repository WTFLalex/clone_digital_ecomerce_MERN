const mongoose = require('mongoose');
require('dotenv').config();
const {countConnection, checkOverLoad} = require('../middlewares/checkConnection.mongodb');

const connectionString = process.env.MONGODB_URL;

class Database {
    constructor(){
        this.connect();
    }
    connect(type = 'mongodb'){

        if(checkOverLoad()){
            mongoose.set(`debug`, true);
            mongoose.set(`debug`, {color: true});
        }

        mongoose.connect(connectionString, {
            maxConnecting: 1000, maxPoolSize: 50
        }).then(()=> console.log(`connected db: `, countConnection()))
        .catch(error => console.log(`failed to connect db!!!`, error))
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;