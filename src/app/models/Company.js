const mongoose = require("mongoose");
const Employer = require("./Employer");
const Schema = mongoose.Schema;

const Company = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	establishment_date: {
		type: Date,
		required: true,
	},
	address: {
		type: Array,
		required: true,
	},
	phone: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				const phoneRegex = /^\d{10}$/;
				return phoneRegex.test(value);
			},
			message: "Phone number must be 10 digits",
		},
	},
	website: {
		type: String,
		unique: true,
	},
	auth: {
		type: Boolean,
		default: false,
	},
	status: {
		type: Boolean,
		default: false,
	},
	numEmployer: {
		type: Number,
		default: 0,
	},
	logo: {
		type: String,
	},
});

module.exports = mongoose.model("Company", Company);
