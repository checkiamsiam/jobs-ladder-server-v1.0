// imports
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// middle ware
app.use(express.json())
app.use(cors())

// database access
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a8gmi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


// body of the program
async function run() {
  try {
   
   

  } finally {
  }
};


// call the async server
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send("Welcome to the job's ladder backside")
})

app.listen(port)