const express = require("express");
const mongodb = require("../../../features/mongodb");
const employeeRouter = express.Router();

async function run() {
  const companyCollection = await mongodb.collection("Companies");
  try {
    employeeRouter.get("/:secret/employee", async (req, res) => {
      const companySecret = req.params.secret;
      const query = { companySecret };
      const options = {
        projection: { employee: 1 },
      };
      const result = await companyCollection.findOne(query, options);
      res.send(result);
    });

    employeeRouter.put("/:secret/employee/:email", async (req, res) => {
      const employeeEmail = req.params.email;
      const companySecret = req.params.secret;
      const query = { companySecret, "employee.email": employeeEmail };
      let updateDoc = {};
      if (req.body.img) {
        updateDoc = {
          $set: {
            "employee.$.img": req.body.img,
          },
        };
      } else {
        updateDoc = {
          $set: {
            "employee.$.name": req.body.name,
            "employee.$.role": req.body.role,
            "employee.$.linkedin": req.body.linkedin,
            "employee.$.facebook": req.body.facebook,
            "employee.$.twitter": req.body.twitter,
          },
        };
      }
      const companyDetail = await companyCollection.updateOne(query, updateDoc, { upsert: true });
      res.send(companyDetail);
    });
  } finally {
  }
}

// call the async server
run().catch(console.dir);

module.exports = employeeRouter;
