const JobSeeker = require("../database/models/job_seeker");
const logger = require("../utils/logger");
const User = require("../database/models/user");

const createOrEditProfile = async (req, res) => {
	const { userId } = req.app.locals.authenticated;
	try {
		const existedProfile = await JobSeeker.findOne({ user: userId });
		// we will allow users to change all details for simplicity

		if (existedProfile) {
			const updatedProfile = await JobSeeker.findByIdAndUpdate(
				existedProfile._id,
				{ ...req.body },
				{ new: true }
			)
				.populate("user")
				.exec();
			return res.json({
				message: "Profile updated successfully",
				value: true,
				user: updatedProfile,
			});
		}
		const newJobSeeker = new JobSeeker({
			user: userId,
			...req.body,
		});
		const jobSeeker = await newJobSeeker.save();
		const user = await User.findByIdAndUpdate(
			userId,
			{
				userType: "job_seeker",
			},
			{ new: true }
		);

		const token = user.jwtToken();
		const populatedJobSeeker = await JobSeeker.populate(jobSeeker, "user");

		return res.json({
			message: token,
			value: true,
			user: populatedJobSeeker,
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).send({ message: error, value: false });
	}
};

const getProfile = async (req, res) => {
	const { userId } = req.app.locals.authenticated;
	try {
		const jobSeeker = await JobSeeker.findOne({ user: userId }).populate(
			"user"
		);

		return res.json({
			message: "Profile fetched successfully",
			value: true,
			candidate: jobSeeker,
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).send({ message: error, value: false });
	}
};

const getProfiles = async (req, res) => {
	try {
		const jobSeekers = await JobSeeker.find().populate("user");

		return res.json({
			message: "Profile fetched successfully",
			value: true,
			candidates: jobSeekers,
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).send({ message: error, value: false });
	}
};

module.exports = { createOrEditProfile, getProfile, getProfiles };
