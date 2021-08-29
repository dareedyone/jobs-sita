const jobSeekerRouter = require("express").Router();
const jobSeekerController = require("../controllers/job_seeker");
const middleware = require("../utils/middleware");

jobSeekerRouter.get(
	"/profiles",
	middleware.isEmployer,
	jobSeekerController.getProfiles
);

jobSeekerRouter.get(
	"/profile",
	middleware.isJobSeeker,
	jobSeekerController.getProfile
);
jobSeekerRouter.post("/profile/fill", jobSeekerController.createOrEditProfile);

module.exports = jobSeekerRouter;
