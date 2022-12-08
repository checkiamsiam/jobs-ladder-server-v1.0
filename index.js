// imports
const express = require("express");
const cors = require("cors");
const colors = require('colors');
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require("./routes/userRouter/userRouter");
const jobPostRouter = require("./routes/jobPostRouter/jobPostRouter");
const companyRouter = require("./routes/companyRouter/companyRouter");
const responseRouter = require("./routes/responseRouter/responseRouter");
const taskRouter = require("./routes/taskRouter/taskRouter");

// middle ware
app.use(express.json());
app.use(cors());

// routers
app.use("/company", companyRouter);
app.use("/users", userRouter);
app.use("/job-post", jobPostRouter);
app.use("/response", responseRouter);
app.use("/tasks", taskRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the job's ladder backside");
});

app.listen(port, ()=> {console.log(`Jobs Ladder Running on : ${port}`.blue.bold)});
