const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		// Can be a model ref
		profession: {
			type: String,
			required: true,
		},
		topic: {
			type: String,
			required: true,
		},
		description: {
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

module.exports = mongoose.model("Job", studentSchema);
