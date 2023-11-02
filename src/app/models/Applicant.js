const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const { isEmail, isMobilePhone } = require("validator");
var mongooseDelete = require("mongoose-delete");

const Applicant = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter a full name"],
		},
		avatar: {
			type: String,
			default:
				"https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
		},
		phone: {
			type: String,
			required: [true, "Please enter a phone number"],
			unique: true,
			validate: [isEmail, "vi-VN", "Please enter a valid phone number"],
		},
		email: {
			type: String,
			required: [true, "Please enter an email"],
			unique: true,
			lowercase: true,
			validate: [isEmail, "Please enter a valid email"],
		},
		gender: {
			type: String,
			enum: ["Male", "Female"],
		},
		day_of_birth: {
			type: Date,
		},
		location: {
			type: Object,
			required: [true, "Please enter a location"],
			properties: {
				address: { type: String, required: [true, "Please enter an address"] },
				city: { type: String, required: [true, "Please enter a city"] },
				country: { type: String, required: [true, "Please enter a country"] },
			},
		},
		active: {
			type: Boolean,
			default: true,
		},
		slug: { type: String, slug: "first_name" },
	},
	{
		timestamps: true,
	}
);

// ADD Plugins
mongoose.plugin(slug);
User.plugin(mongooseDelete, {
	deletedAt: true,
	deletedBy: true,
	overrideMethods: true,
});

module.exports = mongoose.model("Applicant", Applicant);
