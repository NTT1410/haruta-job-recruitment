const User = require("../models/User");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { username: "", password: "" };

	// incorrect username
	if (err.message === "Incorrect username") {
		errors.username = "That username is not registered";
	}

	// incorrect password
	if (err.message === "Incorrect password") {
		errors.password = "That password is incorrect";
	}

	// duplicate error code
	if (err.code === 11000) {
		errors.username = "that username is already registered";
		return errors;
	}

	// validation errors
	if (err.message.includes("User validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, "net ninja secret", {
		expiresIn: maxAge,
	});
};

module.exports.signup_get = (req, res) => {
	res.render("signup", { layout: false });
};
module.exports.login_get = (req, res) => {
	res.render("login", {
		disablePartials: true,
	});
};
module.exports.signup_post = async (req, res) => {
	const day_of_birth = moment(req.body.day_of_birth, "DD-MM-YYYY");
	const { username, password, first_name, last_name, email, phone } = req.body;
	console.log(
		username,
		password,
		first_name,
		last_name,
		email,
		day_of_birth,
		phone
	);
	try {
		const user = await User.create({
			username,
			password,
			first_name,
			last_name,
			email,
			day_of_birth,
			phone,
		});
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
module.exports.login_post = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.login(username, password);
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.logout_get = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/");
};
