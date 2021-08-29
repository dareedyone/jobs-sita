const mongoose = require("mongoose");
const { Schema } = mongoose;

const employerSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		// Can be a model ref
		organization: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		// Can be a model ref
		country: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }

	// other bunch of details can be added like years of experience
	// we will leave it like this for simplicity
);

module.exports = mongoose.model("Employer", employerSchema);
