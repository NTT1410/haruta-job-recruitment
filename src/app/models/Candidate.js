const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Candidate = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("Candidate", Candidate);
