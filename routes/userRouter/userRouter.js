const express = require('express');
const userRouter = express.Router();
const mongodb = require('../../features/mongodb');
const jwt = require('jsonwebtoken');


async function run() {
  const userCollection = await mongodb.collection('Users')
  try {
   
    userRouter.get('/' , async (req , res) => {
      const query = req.query ;
      const users = await userCollection.find(query) ;
      const result = await users.toArray() ;
      res.send(result)
    })

    userRouter.post('/', async (req, res) => {
      const userData = await req.body;
      const query = { email: userData.email };
      const alreadyUser = await userCollection.findOne(query);
      var token = jwt.sign(query, process.env.TOKEN_SECRET);
      if (alreadyUser) {
        return res.send({ message: 'already added', accessToken: token })
      }
      const result = await userCollection.insertOne(userData);
      res.send({ message: 'User added', accessToken: token })
    })
   

  } finally {
  }
};


// call the async server
run().catch(console.dir);

module.exports = userRouter ;