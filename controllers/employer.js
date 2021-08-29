const User = require("../database/models/user");
const Employer = require("../database/models/employer");
const logger = require("../utils/logger");

const createOrEditProfile = async (req, res) => {
	const { userId } = req.app.locals.authenticated;
	try {
		const existedProfile = await Employer.findOne({ user: userId });
		// we will allow users to change all details for simplicity
		console.log("xisted profile", existedProfile);
		if (existedProfile) {
			const updatedProfile = await Employer.findByIdAndUpdate(
				existedProfile._id,
				{ ...req.body },
				{ new: true }
			)
				.populate("user")
				.exec();

			return res.json({
				message: "Profile updated successfully",
				value: true,
				employer: updatedProfile,
			});
		}
		console.log("test", userId, typeof userId);
		const newEmployer = new Employer({
			user: userId,
			...req.body,
		});

		const employer = await newEmployer.save();

		const user = await User.findByIdAndUpdate(
			userId,
			{
				userType: "employer",
			},
			{ new: true }
		);
		const token = user.jwtToken();
		const populatedEmployer = await Employer.populate(employer, "user");

		return res.json({
			message: token,
			value: true,
			employer: populatedEmployer,
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).send({ message: error, value: false });
	}
};

const getProfile = async (req, res) => {
	const { userId } = req.app.locals.authenticated;
	try {
		const employer = await Employer.find({ user: userId }).populate("user");

		return res.json({
			message: "Profile fetched successfully",
			value: true,
			employer,
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).send({ message: error, value: false });
	}
};

module.exports = { createOrEditProfile, getProfile };
