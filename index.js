// imports
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require("./routes/userRouter/userRouter");
const jobPostRouter = require("./routes/jobPostRouter/jobPostRouter");
const companyRouter = require("./routes/companyRouter/companyRouter");

// middle ware
app.use(express.json());
app.use(cors());

// routers
app.use("/company", companyRouter);
app.use("/users", userRouter);
app.use("/job-post", jobPostRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the job's ladder backside");
});

app.listen(port);
