const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const jobSeekerRouter = require("./routes/job_seeker");
const employerRouter = require("./routes/employer");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");
const { connection } = require("./database");
const baseMid = "/api";
// logger.info("connecting to", config.MONGODB_URI);
connection();

app.use(cors());
// app.use(express.static("build")) ;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${baseMid}/users`, userRouter);

app.use(middleware.isAuthenticated);
app.use(`${baseMid}/candidates`, jobSeekerRouter);
app.use(`${baseMid}/employers`, employerRouter);
app.use(`${baseMid}/jobs`, jobRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
