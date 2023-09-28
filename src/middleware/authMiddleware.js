const jwt = require("jsonwebtoken");
const User = require("../app/models/User");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// check json web token exists & is verified
	if (token) {
		jwt.verify(token, "net ninja secret", (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect("/login");
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect("/login");
	}
};

// check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			} else {
				// console.log(decodedToken);
				let user = await User.findById(decodedToken.id).lean();
				res.locals.user = user;
				res.cookie("isEmployer", true, {
					maxAge: 1000 * 60 * 60 * 24,
					httpOnly: true,
				});
				// console.log("tao da tao user roi: " + res.locals.user.first_name);
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { requireAuth, checkUser };
