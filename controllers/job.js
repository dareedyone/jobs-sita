const Job = require("../database/models/job");
const JobSeeker = require("../database/models/job_seeker");
const logger = require("../utils/logger");

const createJob = async (req, res) => {
	const { userId } = req.app.locals.authenticated;
	try {
		const newJob = new Job({
			user: userId,
			...req.body,
		});
		const job = await newJob.save();
		const populatedJob = await Job.populate(job, "user");

		return res.json({
			message: "Job created successfully",
			value: true,
			job: populatedJob,
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).send({ message: error, value: false });
	}
};

const getJobs = async (req, res) => {
	const { userId } = req.app.locals.authenticated;
	try {
		const candidate = await JobSeeker.findOne({ user: userId });
		console.log("candidate", candidate);
		const jobs = await Job.find({ profession: candidate.profession }).populate(
			"user"
		);

		return res.json({
			message: "Jobs fetched successfully",
			value: true,
			jobs,
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).send({ message: error, value: false });
	}
};

module.exports = { createJob, getJobs };
