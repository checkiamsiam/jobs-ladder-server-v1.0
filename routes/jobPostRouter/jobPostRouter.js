const express = require('express');
const jobPostRouter = express.Router();
const mongodb = require('../../features/mongodb');


async function run() {
  const jobPostCollection = await mongodb.collection('Job-post')
  try {
   
  jobPostRouter.post('/' , async (req , res) => {
    const jobData = req.body 
    const postJob = await jobPostCollection.insertOne(jobData)
    res.send(postJob)
  })
   

  } finally {
  }
};


// call the async server
run().catch(console.dir);

module.exports = jobPostRouter ;
