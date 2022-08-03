const express = require("express");
const userRouter = express.Router();
const mongodb = require("../../features/mongodb");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../../middlewares/verifyJWT");

async function run() {
  const userCollection = await mongodb.collection("Users");
  const companyCollection = await mongodb.collection("Companies");
  try {
    userRouter.get("/", verifyJWT, async (req, res) => {
      const query = req.query;
      const users = await userCollection.find(query);
      const result = await users.toArray();
      res.send(result);
    });

    userRouter.post("/", async (req, res) => {
      const userData = await req.body;
      const query = { email: userData.email };
      const alreadyUser = await userCollection.findOne(query);
      var token = jwt.sign(query, process.env.TOKEN_SECRET);
      if (alreadyUser) {
        return res.send({ message: "already added", accessToken: token });
      }
      const result = await userCollection.insertOne(userData);
      res.send({ message: "User added", accessToken: token });
    });

    userRouter.put("/add-info", async (req, res) => {
      const name = await req?.body?.userName;
      const email = await req?.body?.email;
      const companyName = req?.body?.companyName;
      const companySecret = req?.body?.companySecret;
      const role = req?.body?.role;
      const filter = { email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name,
          role,
          companyName,
        },
      };
      const updateUserInfo = await userCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      let insertCompany = {};
      const existCompany = await companyCollection.findOne({ companySecret });
      if (role === "HR") {
        if (existCompany) {
          insertCompany = {
            status: "failed",
            message: "Please try again with another one",
          };
        } else {
          insertCompany = await companyCollection.insertOne({
            companyName,
            companySecret,
            employees: [],
          });
        }
      } else {
        if (existCompany) {
          await companyCollection.updateOne(
            { companySecret },
            { $push: { employees: { name, email } } },
            options
          );
        } else {
          insertCompany = {
            status: "failed",
            message: "Please try again with another one",
          };
        }
      }
      res.send({ updateUserInfo, insertCompany });
    });
  } finally {
  }
}

// call the async server
run().catch(console.dir);

module.exports = userRouter;

