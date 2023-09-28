const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CV = new Schema({
	candidate_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Cadidate",
		required: true,
	},
	file: {
		type: String,
		default: "Unknown",
	},
	title: {
		type: String,
		default: "Unnamed",
	},
});

module.exports = mongoose.model("CV", CV);
