const mongoose = require("mongoose");

// const hostname = "127.0.0.1";
// const port = 3000;
const username = "haruta-job_1";
const password = "LPOXvK1idBRQxpt3";

const url = `mongodb+srv://${username}:${password}@atlascluster.akqikjq.mongodb.net/job_recruitment?retryWrites=true&w=majority`;
async function connect() {
	try {
		await mongoose.connect(url, {});
		console.log("connect successfully");
	} catch (error) {
		console.log("error connecting");
	}
}

module.exports = { connect };
