const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

mongoose.plugin(slug);

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
			required: true,
			validate: {
				validator: (dayOfBirth) => {
					const currentYear = new Date().getFullYear();

					const age = currentYear - dayOfBirth.getFullYear();

					if (age < 18) {
						return false;
					}
					return true;
				},
				message: "tuổi phải lớn hơn 18",
			},
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
