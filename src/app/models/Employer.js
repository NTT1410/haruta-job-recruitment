const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Employer = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	spyke_account: {
		type: String,
	},
	company_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company",
		required: true,
	},
});

module.exports = mongoose.model("Employer", Employer);
