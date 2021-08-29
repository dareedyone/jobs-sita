const User = require("../database/models/user");
// const userService = require("../services/user");
const logger = require("../utils/logger");

const login = async (req, res) => {
	console.log("from login", req.body);
	const { email, password } = req.body;
	try {
		const lowercase = email.toLowerCase();
		const user = await User.findOne({ email: lowercase });

		if (!user) {
			return res.json({
				message: "Incorrect login details",
				value: false,
			});
		}
		const isPasswordValid = await user.verifyPass(password);

		if (!isPasswordValid) {
			return res.json({
				message: "Incorrect login details",
				value: false,
			});
		}

		const token = user.jwtToken();

		return res.json({
			message: token,
			value: true,
			user,
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).send({ message: error, value: false });
	}
};

const signUp = async (req, res) => {
	// console.log("from signup", req.body);
	const { email } = req.body;
	try {
		const lowercase = email.toLowerCase();
		const user = await User.findOne({ email: lowercase });

		if (user) {
			return res.json({
				message: "User already exists",
				value: false,
			});
		}

		const newUser = new User({
			email: lowercase,
			userType: "user",
			...req.body,
		});
		const result = await newUser.save();
		// leave email verification for simplicity

		return res.json({
			message: "Account created successfully",
			value: true,
			user: result,
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).send({ message: error, value: false });
	}
};
// also leave forgot password and others for simplicity
module.exports = { login, signUp };
