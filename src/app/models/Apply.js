const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Apply = new Schema({
	job_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Job",
		required: true,
	},
	cv_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CV",
		required: true,
	},
	apply_date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Apply", Apply);
