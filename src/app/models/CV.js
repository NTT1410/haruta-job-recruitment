const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CV = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
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
