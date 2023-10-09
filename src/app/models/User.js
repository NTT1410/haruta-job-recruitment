const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
var mongooseDelete = require("mongoose-delete");

const User = new Schema(
	{
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		phone: {
			type: String,
			required: [true, "Please enter an phone number"],
			validate: {
				validator: (value) => {
					const phoneRegex = /^\d{10}$/;
					return phoneRegex.test(value);
				},
				message: "Phone number must be 10 digits",
			},
			unique: true,
		},
		username: {
			type: String,
			required: [true, "Please enter an username"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please enter an password"],
			minlength: [8, "Minimum password length is 8 characters"],
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
		country: {
			type: String,
		},
		city: {
			type: String,
		},
		active: {
			type: Boolean,
			default: false,
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

// // fire a function after doc saved to database
// User.post("save", function (doc, next) {
// 	console.log("new user was created & saved", doc);

// 	next();
// });

// fire a function before doc saved to database
User.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// static method to login user
User.statics.login = async function (username, password) {
	const user = await this.findOne({ username });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("Incorrect password");
	}
	throw Error("Incorrect username");
};

module.exports = mongoose.model("User", User);
