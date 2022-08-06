const express = require("express");
const companyRouter = express.Router();
const mongodb = require("../../features/mongodb");

async function run() {
  const companyCollection = await mongodb.collection("Companies");
  try {
    companyRouter.get("/", async (req, res) => {
      const query = req.query;
      const getCompanyDetails = await companyCollection.find(query).toArray();
      res.send(getCompanyDetails);
    });
    companyRouter.put("/:secret", async (req, res) => {
      const companySecret = req.params.secret;
      const filter = { companySecret };
      const options = { upsert: true };
      const data = {
        $set: req.body,
      };
      const update = await companyCollection.updateOne(filter, data, options);
      res.send(update);
    });
  } finally {
  }
}

// call the async server
run().catch(console.dir);

module.exports = companyRouter;
