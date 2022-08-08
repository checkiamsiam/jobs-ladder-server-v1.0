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
    responseRouter.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deleteCandidate = await responseCollection.deleteOne(query);
      res.send(deleteCandidate);
    });
  } finally {
    // client.close()
  }
}

run().catch(console.dir);

module.exports = responseRouter;
