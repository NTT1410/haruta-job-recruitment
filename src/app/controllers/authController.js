const User = require("../models/User");
const UserRole = require("../models/UserRole");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const bcrypt = require("bcrypt");

const { handleErrors } = require("../../middleware/errors");
const Role = require("../models/Role");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, "net ninja secret", {
		expiresIn: maxAge,
	});
};
// module.exports.signup_post = async (req, res) => {
// 	const day_of_birth = moment(req.body.day_of_birth, "DD-MM-YYYY");
// 	const { username, password, first_name, last_name, email, phone } = req.body;
// 	console.log(
// 		username,
// 		password,
// 		first_name,
// 		last_name,
// 		email,
// 		day_of_birth,
// 		phone
// 	);
// 	try {
// 		const user = await User.create({
// 			username,
// 			password,
// 			first_name,
// 			last_name,
// 			email,
// 			day_of_birth,
// 			phone,
// 		});
// 		const token = createToken(user._id);
// 		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
// 		res.status(201).json({ user: user._id });
// 	} catch (err) {
// 		const errors = handleErrors(err);
// 		res.status(400).json({ errors });
// 	}
// };

// chua xong
module.exports.login = async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	try {
		const user = await User.login(username, password);
		const userRole = await UserRole.findOne({ user_id: user._id });
		const role = await Role.findById(userRole.role_id);
		if (role.name == "admin") {
			if (user.active) {
				const token = createToken(user._id);
				res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
				res.status(200).json({ user: user._id });
			} else {
				res.status(401).send("Account is not activated.");
			}
		} else {
			res.status(400).json("User not admin");
		}
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

// da xong
module.exports.login_c = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.login(username, password);
		const userRole = await UserRole.findOne({ user_id: user._id });
		const role = await Role.findById(userRole.role_id);
		if (role.name == "candidate") {
			if (user.active) {
				const token = createToken(user._id);
				res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
				res.status(200).json({ user: user._id });
			} else {
				res.status(401).send("Account is not activated.");
			}
		} else {
			res.status(400).json("User not a candidate");
		}
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

// chua xong
module.exports.login_e = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.login(username, password);
		const userRole = await UserRole.findOne({ user_id: user._id });
		const role = await Role.findById(userRole.role_id);
		if (role.name == "employer") {
			if (user.active) {
				const token = createToken(user._id);
				res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
				res.status(200).json({ user: user._id });
			} else {
				res.status(401).send("Account is not activated.");
			}
		} else {
			res.status(400).json("User not a employer");
		}
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.update = async (req, res) => {
	const token = req.cookies.jwt;
	const { oldPassword, newPassword, confirmPassword } = req.body;
	if (token) {
		jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.status(500).json("Invalid token");
			} else {
				try {
					const currentUser = await User.findById(decodedToken.id).lean();
					if (
						oldPassword &&
						newPassword &&
						confirmPassword &&
						newPassword === confirmPassword
					) {
						const auth = await bcrypt.compare(
							oldPassword,
							currentUser.password
						);
						if (auth) {
							const salt = await bcrypt.genSalt();
							currentUser.password = await bcrypt.hash(newPassword, salt);
							await User.updateOne(
								{ _id: currentUser._id },
								{ password: currentUser.password }
							);
							res.status(200).json("Updated successfully");
						} else {
							res.status(400).json("Client error");
						}
					} else {
						res.status(400).json("Client error");
					}
				} catch (error) {
					console.log(error);
					const errors = handleErrors(error);
					res.status(500).json({ errors });
				}
			}
		});
	} else {
		res.status(500).json("Token not found");
	}
	// try {
	// 	const user = await User.login(username, password);
	// 	const userRole = await UserRole.findOne({ user_id: user._id });
	// 	const role = await Role.findById(userRole.role_id);
	// 	if (role.name == "employer") {
	// 		if (user.active) {
	// 			const token = createToken(user._id);
	// 			res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
	// 			res.status(200).json({ user: user._id });
	// 		} else {
	// 			res.status(401).send("Account is not activated.");
	// 		}
	// 	} else {
	// 		res.status(400).json("User not a employer");
	// 	}
	// } catch (err) {
	// 	const errors = handleErrors(err);
	// 	res.status(400).json({ errors });
	// }
};

// da xong
module.exports.logout_get = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/login");
};

// logout user
module.exports.logout = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.status(200).json("Logout successful");
};
