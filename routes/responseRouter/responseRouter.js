const express = require("express");
const { ObjectId } = require("mongodb");
const responseRouter = express.Router();
const mongodb = require("../../features/mongodb");

async function run() {
  const responseCollection = await mongodb.collection("Job-responses");
  try {
    //   Get Responses for a job post
    responseRouter.get("/", async (req, res) => {
      const query = { jobPostId: req?.query?.jobId };
      const response = await responseCollection
        .find(query)
        .sort({ _id: -1 })
        .toArray();
      res.send(response);
    });

    // Remove a candidate
    responseRouter.delete("/delete-candidate", async (req, res) => {
      const candidateId = { _id: ObjectId(req?.body?.candidateId) };
      const deleteCandidate = await responseCollection.deleteOne(candidateId);
      res.send(deleteCandidate);
    });
  } finally {
    // client.close()
  }
}

run().catch(console.dir);

module.exports = responseRouter;
