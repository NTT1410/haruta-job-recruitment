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
		try {
			const user = await User.findById(id).lean();
			res.render("candidates/show", { user });
		} catch (error) {
			res.status(404).json(error);
		}
	}

	async employerDetails(req, res, next) {
		const id = req.params.userId;
		try {
			const user = await User.findById(id).lean();
			res.render("candidates/show", { user });
		} catch (error) {
			res.status(404).json(error);
		}
	}

	candidateCreate(req, res, next) {
		res.render("candidates/create");
	}

	employerCreate(req, res, next) {
		res.render("employers/create");
	}
}

module.exports = new SiteController();
