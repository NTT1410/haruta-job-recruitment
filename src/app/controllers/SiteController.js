const User = require("../models/User");
const test = require("../models/Apply");
const Company = require("../models/Company");
const Job = require("../models/Job");

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

	company(req, res, next) {
		res.render("company");
	}

	job(req, res, next) {
		res.render("job");
	}

	apply(req, res, next) {
		res.render("apply");
	}

	async candidateDetails(req, res, next) {
		const id = req.params.userId;
		try {
			const user = await User.findById(id, { password: 0 }).lean();
			res.render("candidates/show", { user });
		} catch (error) {
			res.status(404).json(error);
		}
	}

	async employerDetails(req, res, next) {
		const id = req.params.userId;
		try {
			const user = await User.findById(id, { password: 0 }).lean();
			res.render("employers/show", { user });
		} catch (error) {
			res.status(404).json(error);
		}
	}

	async companyDetails(req, res, next) {
		const id = req.params.companyId;
		try {
			const company = await Company.findById(id).lean();
			res.render("companies/show", { company });
		} catch (error) {
			res.status(404).json(error);
		}
	}

	async jobDetails(req, res, next) {
		const id = req.params.jobId;
		try {
			const job = await Job.findById(id).lean();
			res.render("jobs/show", { job });
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

	companyCreate(req, res, next) {
		res.render("companies/create");
	}

	jobCreate(req, res, next) {
		res.render("jobs/create");
	}
}

module.exports = new SiteController();
