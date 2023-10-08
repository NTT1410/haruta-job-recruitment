const User = require("../models/User");
const test = require("../models/Apply");

class SiteController {
	// [GET] /
	index(req, res, next) {
		res.render("home");
	}

	login(req, res, next) {
		res.render("login", { layout: "mainLogin" });
	}

	candidate(req, res, next) {
		res.render("candidate");
	}

	employer(req, res, next) {
		res.render("employer");
	}

	async candidateDetails(req, res, next) {
		const id = req.params.userId;
		const user = await User.findById(id).lean();
		res.render("candidates/show", { user });
	}

	candidateCreate(req, res, next) {
		res.render("candidates/create");
	}
}

module.exports = new SiteController();
