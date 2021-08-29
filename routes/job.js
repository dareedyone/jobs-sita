const jobRouter = require("express").Router();
const jobController = require("../controllers/job");
const middleware = require("../utils/middleware");
// get jobs that is of profession
jobRouter.get("/profiles", middleware.isJobSeeker, jobController.getJobs);
jobRouter.post(
	"/profile/create",
	middleware.isEmployer,
	jobController.createJob
);

module.exports = jobRouter;
