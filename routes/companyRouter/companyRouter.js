const express = require('express');
const companyRouter = express.Router();
const mongodb = require('../../features/mongodb');


async function run() {
  const companyCollection = await mongodb.collection('Companies')
  try {
   
    
   

  } finally {
  }
};


// call the async server
run().catch(console.dir);

module.exports = companyRouter ;
