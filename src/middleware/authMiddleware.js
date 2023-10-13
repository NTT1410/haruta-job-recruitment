const jwt = require("jsonwebtoken");
const User = require("../app/models/User");
const Candidate = require("../app/models/Candidate");
const Employer = require("../app/models/Employer");
const UserRole = require("../app/models/UserRole");
const Role = require("../app/models/Role");

const { handleErrors } = require("./errors");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// check json web token exists & is verified
	if (token) {
		jwt.verify(token, "net ninja secret", (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				// res.json("vao A");
				res.redirect("/auth/login");
			} else {
				next();
			}
		});
	} else {
		res.locals.user = null;
		// res.json("vao B");
		res.redirect("/auth/login");
	}
};

// check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				let user = await User.findById(decodedToken.id).lean();
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

// check candidate
const checkCandidate = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.status(500).json("Invalid token");
			} else {
				const user = await User.findById(decodedToken.id).lean();
				const userRole = await UserRole.findOne({ user_id: user._id }).lean();
				const role = await Role.findById(userRole.role_id).lean();
				if (role.name === "candidate" || role.name === "admin") {
					res.locals.user = user;
					next();
				} else {
					res.status(403).json("Not permission");
				}
			}
		});
	} else {
		res.status(500).json("Token not found");
	}
};

const checkEmployer = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.status(500).json("Invalid token");
			} else {
				const user = await User.findById(decodedToken.id).lean();
				const userRole = await UserRole.findOne({ user_id: user._id }).lean();
				const role = await Role.findById(userRole.role_id).lean();
				if (role.name === "employer" || role.name === "admin") {
					res.locals.user = user;
					next();
				} else {
					res.status(403).json("Not permission");
				}
			}
		});
	} else {
		res.status(500).json("Token not found");
	}
};

const checkAdmin = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.status(500).json("Invalid token");
			} else {
				const user = await User.findById(decodedToken.id).lean();
				try {
					const userRole = await UserRole.findOne({ user_id: user._id });
					const role = await Role.findById(userRole.role_id);
					if (role.name === "admin") {
						res.locals.user = user;
						next();
					} else {
						res.status(403).json("Not permission");
					}
				} catch (error) {
					res.status(500).json("server error");
				}
			}
		});
	} else {
		res.status(500).json("Token not found");
	}
};

// check candidate
const checkActive = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const user = await User.login(username, password);
		const active = user.active;
		if (active) {
			res.locals.user = user;
			next();
		} else {
			res.status(401).send("Account is not activated.");
		}
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports = {
	requireAuth,
	checkUser,
	checkCandidate,
	checkEmployer,
	checkActive,
	checkAdmin,
};
