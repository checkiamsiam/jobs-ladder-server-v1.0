const express = require("express");
const mongodb = require("../../../features/mongodb");
const employeeRouter = express.Router();

async function run() {
  const companyCollection = await mongodb.collection("Companies");
  try {
    employeeRouter.get("/:secret/employee", async (req, res) => {
      const companySecret = req.params.secret
      const query = {companySecret}
      const options = {
        projection: { employee : 1},
      };
      const result = await companyCollection.findOne(query , options)
      res.send(result);
    });
  } finally {
  }
}

// call the async server
run().catch(console.dir);

module.exports = employeeRouter;