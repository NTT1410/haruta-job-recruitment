const mongoose = require("mongoose");
async function connect() {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/job_recruitment");
		console.log("connect successfully");
	} catch (error) {
		console.log("error connecting");
	}
}

module.exports = { connect };
