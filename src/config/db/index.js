const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Secret
dotenv.config();
async function connect() {
	try {
		const url = process.env.MONGODB_URI;

		await mongoose.connect(url, {});
		// mongoose.set("useNewUrlParser", true);
		// mongoose.set("useFindAndModify", false);
		// mongoose.set("useCreateIndex", true);
		console.log("connect successfully");
	} catch (error) {
		console.log(error);
	}
}

module.exports = { connect };
