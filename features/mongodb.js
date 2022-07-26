const { MongoClient } = require('mongodb');
require('dotenv').config()



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a8gmi.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri);

const mongodb = dbClient.db("Job's-Ladder")

module.exports = mongodb ;