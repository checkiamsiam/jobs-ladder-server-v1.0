const express = require("express");
const taskRouter = express.Router();
const mongodb = require("../../features/mongodb");
const Sib = require("sib-api-v3-sdk");
const { ObjectId } = require("mongodb");
require("dotenv").config();

async function run() {
  const taskCollection = await mongodb.collection("Tasks");
  try {
    //   Create/Give a Task
    taskRouter.post("/give-task", async (req, res) => {
      const details = req.body;
      const addedTask = await taskCollection.insertOne(details);
      const { from, to, taskTitle, taskDetails, companyName } = req?.body;
      // Send Email with SendInBlue
      const client = Sib.ApiClient.instance;

      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.SIB_API_KEY;

      const tranEmailApi = new Sib.TransactionalEmailsApi();

      const sender = {
        email: from,
        name: companyName,
      };

      const receivers = [
        {
          email: to,
        },
      ];

      tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: `Task: ${taskTitle}`,
        htmlContent: `
        <h2>${taskTitle}</h2> </br>
        <p style="font-size: 16px; margin-top:20px">${taskDetails}</p> </br>
        <button style="border-radius: 6px; background-color: #007FFF; color: white; padding: 8px 17px; border: none; margin: 20px 0">
          <a href="https://job-ledder.web.app/" style="color: white; font-size:17px">Visit our Website</a>
        </button>
        <p style="font-size: 14px; margin: 15px 0 0 0">Regards, </p>
        <p style="font-size: 14px; margin: 0 0">${companyName}</p>
        `,
      });
      res.send(addedTask);
    });

    // Get Tasks for a user using Email
    taskRouter.get("/", async (req, res) => {
      const email = req.query?.email;
      const query = { to: email };
      const task = await taskCollection.find(query).sort({ _id: -1 }).toArray();
      res.send(task);
    });

    // Get a single task details
    taskRouter.get("/:taskId", async (req, res) => {
      const taskId = req.params.taskId;
      const query = { _id: ObjectId(taskId) };
      const taskDetails = await taskCollection.findOne(query);
      res.send(taskDetails);
    });

    // Submit a Task
    taskRouter.put("/submit", async (req, res) => {
      const taskId = req.query.id;
      const query = { _id: ObjectId(taskId) };
      const options = { upsert: false };
      const updateInfo = {
        $set: req.body,
      };
      const result = await taskCollection.updateOne(query, updateInfo, options);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
module.exports = taskRouter;
