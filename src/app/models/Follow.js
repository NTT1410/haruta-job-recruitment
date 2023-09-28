const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Follow = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	company_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company",
		required: true,
	},
});

module.exports = mongoose.model("Follow", Follow);
