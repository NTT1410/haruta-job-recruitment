const userRole = require("../models/UserRole");
const Role = require("../models/Role");
const Follow = require("../models/Follow");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Employer = require("../models/Employer");

class UserRoleController {
	// [GET] /api/follows
	async show(req, res, next) {
		try {
			const follows = await Job.find().lean();
			res.status(200).json(follows);
		} catch (error) {
			res.status(500).json("Server error");
		}
	}

	// [GET] /api/job-post/:jobId
	async detail(req, res, next) {
		try {
			const jobId = req.params.jobId;
			const job = await Job.findById(jobId).lean();
			res.status(200).json(job);
		} catch (error) {
			res.status(500).json("Server error");
		}
	}

	// [POST] /api/follows
	async create(req, res, next) {
		try {
			const {
				name,
				company_id,
				location,
				position,
				experience,
				benefit,
				type,
				salary,
				description,
				start_date,
				end_date,
			} = req.body;
			const user = res.locals.user;
			const job = await Job.create({
				name,
				company_id,
				location,
				position,
				experience,
				benefit,
				type,
				salary,
				description,
				start_date,
				end_date,
			});
			res.status(200).json(job);
		} catch (error) {
			res.status(500).json("Server error");
		}
	}

	// [PUT] /api/job-post/:jobId
	async update(req, res, next) {
		try {
			const jobId = req.params.jobId;
			const data = req.body;
			const user = res.locals.user;
			await Job.findByIdAndUpdate(jobId, data);
			res.status(200).json("Update successful");
		} catch (error) {
			res.status(500).json("Server error");
		}
	}

	// [DELETE] /api/job-post/:jobId
	async delete(req, res, next) {
		try {
			const jobId = req.params.jobId;
			const user = res.locals.user;
			await Job.findByIdAndDelete(jobId);
			res.status(200).json("delete successful");
		} catch (error) {
			res.status(500).json("Server error");
		}
	}

	async countJob(req, res, next) {
		try {
			const count = await Job.countDocuments().lean();
			res.status(200).json(count);
		} catch (error) {
			console.log(error);
			res.status(500).json("Server error");
		}
	}
}

module.exports = new UserRoleController();
