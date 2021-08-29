const employerRouter = require("express").Router();
const employerController = require("../controllers/employer");
const middleware = require("../utils/middleware");

employerRouter.get(
	"/profile",
	middleware.isEmployer,
	employerController.getProfile
);
employerRouter.post("/profile/fill", employerController.createOrEditProfile);

module.exports = employerRouter;
