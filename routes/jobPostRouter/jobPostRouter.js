const express = require('express');
const { ObjectId } = require('mongodb');
const jobPostRouter = express.Router();
const mongodb = require('../../features/mongodb');


async function run() {
  const jobPostCollection = await mongodb.collection('Job-post')
  const jobPostResponses = await mongodb.collection('Job-responses')
  try {

    jobPostRouter.get('/', async (req, res) => {
      const query = req.query
      const getPosts = await (await jobPostCollection.find(query).toArray()).reverse()
      res.send(getPosts)
    })

    jobPostRouter.post('/', async (req, res) => {
      const jobData = req.body
      const postJob = await jobPostCollection.insertOne(jobData)
      res.send(postJob)
    })

    jobPostRouter.delete('/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const deletePost = await jobPostCollection.deleteOne(query)
      res.send(deletePost)

    })

    jobPostRouter.post('/response', async (req, res) => {
      const responseData = req.body;
      const addResponseData = await jobPostResponses.insertOne(responseData)
      res.send(addResponseData)
    })

  } finally {
  }
};


// call the async server
run().catch(console.dir);

module.exports = jobPostRouter;
