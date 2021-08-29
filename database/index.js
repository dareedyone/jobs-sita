const mongoose = require("mongoose");
const { config } = require("dotenv");
const { MONGODB_URI } = require("../utils/config");

config();

mongoose.Promise = global.Promise; // To Use Promises With Mongoose

const connection = () => {
	try {
		mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Message if Successfully Connected to DB
		mongoose.connection.on("connected", () => {
			console.log(`Connected to database ${MONGODB_URI}`);
		});

		// Message if There is an error in database Connection
		mongoose.connection.on("error", (err) => {
			throw err;
		});

		// To Remove moongoose depreciation warnings
		mongoose.set("useFindAndModify", false);
		mongoose.set("useCreateIndex", true);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const isValidObjectId = (id) => {
	return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
	connection,
	isValidObjectId,
};
