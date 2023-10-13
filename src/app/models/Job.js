const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Job = new Schema({
	name: {
		type: String,
		required: true,
	},
	company_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Company",
		required: true,
	},
	location: {
		type: Array,
		required: true,
	},
	position: {
		type: String,
		required: true,
	},
	experience: {
		type: String,
		required: true,
	},
	benefit: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	salary: {
		type: BigInt,
		required: true,
	},
	description: {
		type: String,
	},
	start_date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	end_date: {
		type: Date,
		default: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
	},
	active: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model("Job", Job);
