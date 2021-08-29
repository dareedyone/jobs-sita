/* eslint-disable no-unused-vars */
require("dotenv").config();

const { PORT, MONGODB_URI, NODE_ENV, JWT_SECRET_KEY } = process.env;
// if (NODE_ENV === "test" || NODE_ENV === "development")
// 	MONGODB_URI = TEST_MONGODB_URI;
module.exports = { MONGODB_URI, PORT, JWT_SECRET_KEY, NODE_ENV };
