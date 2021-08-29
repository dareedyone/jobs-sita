const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const bcrypt = require("bcryptjs");

config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

const mongooseUniqueValidator = require("mongoose-unique-validator");
const { JWT_SECRET_KEY } = require("../../utils/config");

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		userType: {
			type: String,
			enum: ["job_seeker", "employer", "user"],
		},
	},
	{
		timestamps: true,
	}
);
userSchema.plugin(mongooseUniqueValidator);
// Hash password before save to DB
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await this.hashPass(this.password);
	}

	next();
});
// clear sensitive or useless data
userSchema.set("toJSON", {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString();
		delete returnedObj._id;
		delete returnedObj.__v;
		delete returnedObj.userType;
		// the passwordHash should not be revealed
		delete returnedObj.password;
	},
});

userSchema.methods = {
	// Sign token for user authorization
	jwtToken: function () {
		return jwt.sign(
			{ userId: this._id, userType: this.userType },
			JWT_SECRET_KEY,
			{
				expiresIn: "5d",
			}
		);
	},

	// Sign token for forgot password
	passwordToken: function () {
		return jwt.sign({ userId: this._id }, JWT_SECRET_KEY, {
			expiresIn: "30m",
		});
	},

	// Hash Password
	hashPass: async function (password) {
		return await bcrypt.hash(password, 12);
	},

	// Verify user password
	verifyPass: async function (password) {
		const cp = await bcrypt.compare(password, this.password);

		return cp;
	},
};

module.exports = mongoose.model("User", userSchema);
