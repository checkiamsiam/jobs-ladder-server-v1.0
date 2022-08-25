const { query } = require("express");
const express = require("express");
const { ObjectId } = require("mongodb");
const jobPostRouter = express.Router();
const mongodb = require("../../features/mongodb");

async function run() {
  const jobPostCollection = await mongodb.collection("Job-post");
  const jobPostResponses = await mongodb.collection("Job-responses");
  try {
    jobPostRouter.get("/count", async (req, res) => {
      const count = await jobPostCollection.estimatedDocumentCount();
      res.send({ count });
    });

    jobPostRouter.get("/", async (req, res) => {
      const companySecret = await req.query.companySecret;
      let jobs;
      if (companySecret) {
        jobs = await jobPostCollection
          .find({ companySecret })
          .sort({ _id: -1 })
          .toArray();
      } else {
        const cursor = await jobPostCollection.find({}).sort({ _id: -1 });
        const page = await req.query.currentPage;
        if (page) {
          jobs = await cursor
            .skip(page * 10)
            .limit(10)
            .toArray();
        } else {
          console.log(page);
          jobs = await cursor.limit(10).toArray();
        }
      }
      res.send(jobs);
    });

    jobPostRouter.get( '/search/:searchKey' , async (req , res) => {
      const searchText = req.params.searchKey
      const jobPosts = await jobPostCollection.find({
        "$or" : [
          {title : {$regex : searchText}}
        ]
      }).toArray()
      res.send(jobPosts)
    })

    jobPostRouter.post("/", async (req, res) => {
      const jobData = req.body;
      const postJob = await jobPostCollection.insertOne(jobData);
      res.send(postJob);
    });

    jobPostRouter.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deletePost = await jobPostCollection.deleteOne(query);
      res.send(deletePost);
    });

    jobPostRouter.post("/response", async (req, res) => {
      const responseData = req.body;
      const addResponseData = await jobPostResponses.insertOne(responseData);
      res.send(addResponseData);
    });

    // Get Job Title For Individual Company
    jobPostRouter.get("/job-title", async (req, res) => {
      const companySecret = { companySecret: req?.query?.companySecret };
      const projection = { title: 1 };
      const jobTitle = await jobPostCollection
        .find(companySecret)
        .project(projection)
        .sort({ _id: -1 })
        .toArray();
      res.send(jobTitle);
    });
  } finally {
  }
}

// call the async server
run().catch(console.dir);

module.exports = jobPostRouter;
