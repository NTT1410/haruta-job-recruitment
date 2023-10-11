const userRole = require("../models/UserRole");
const Role = require("../models/Role");
const Follow = require("../models/Follow");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Employer = require("../models/Employer");
const dotenv = require("dotenv");
const Apply = require("../models/Apply");
// Secret
dotenv.config();

const pageSize = Number(process.env.PAGE_SIZE);

class JobPostController {
	// [GET] /api/follows
	async show(req, res, next) {
		// const
		try {
			var page = req.query.page;
			if (page) {
				page = parseInt(page);
				if (page < 1) {
					page = 1;
				}
				var skip = (page - 1) * pageSize;
				const jobs = await Job.find().skip(skip).limit(pageSize).lean();
				let total = await Job.countDocuments();
				let totalPage = Math.ceil(total / 8);
				res.status(200).json({
					total: total,
					totalPage: totalPage,
					data: jobs,
				});
			} else {
				const jobs = await Job.find().lean();
				res.status(200).json({ data: jobs });
			}
		} catch (error) {
			console.log(error);
			res.status(404).json("Not Found");
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

	async appliesOfJobPost(req, res, next) {
		try {
			const jobId = req.params.jobId;
			const job = await Job.findById(jobId);
			const appliesOfJobPost = await Apply.find({ job_id: job._id });
			const cvs = await CV;
			res.status(200).json(appliesOfJobPost);
		} catch (error) {
			res.status(500).json("Server error");
		}
	}
}

module.exports = new JobPostController();
