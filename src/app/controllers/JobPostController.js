const Job = require("../models/Job");
const JobSkill = require("../models/JobSkill");
const dotenv = require("dotenv");
const Apply = require("../models/Apply");
const CV = require("../models/CV");
const moment = require("moment");
// Secret
dotenv.config();

const pageSize = Number(process.env.PAGE_SIZE);

class JobPostController {
	// [GET] /api/follows
	async show(req, res, next) {
		let predicates = {};
		const name = req.query.name;
		const position = req.query.position;
		const experience = req.query.experience;
		const benefit = req.query.benefit;
		const type = req.query.type;
		const salary = Number(req.query.salary);
		const salaryTo = Number(req.query.salaryTo);
		const salaryForm = Number(req.query.salaryForm);
		if (name) {
			predicates.name = { $regex: new RegExp(name) };
		}
		if (position) {
			predicates.position = { $regex: new RegExp(position) };
		}
		if (experience) {
			predicates.experience = { $regex: new RegExp(position) };
		}
		if (benefit) {
			predicates.benefit = { $regex: new RegExp(benefit) };
		}
		if (type) {
			predicates.type = { $regex: new RegExp(type) };
		}
		if (salary) {
			predicates.salary = { $eq: salary };
		} else if (salaryForm && !salaryTo) {
			predicates.salary = { $gte: salaryForm };
		} else if (salaryTo && !salaryForm) {
			predicates.salary = { $lte: salaryTo };
		} else if (salaryForm && salaryTo) {
			predicates.salary = { $gte: salaryForm, $lte: salaryTo };
		}
		console.log(predicates);
		try {
			var page = req.query.page;
			if (page) {
				page = parseInt(page);
				if (page < 1) {
					page = 1;
				}
				var skip = (page - 1) * pageSize;
				const jobs = await Job.find()
					.where(predicates)
					.skip(skip)
					.limit(pageSize)
					.lean();
				let total = jobs.length;
				let totalPage = Math.ceil(total / 8);
				res.status(200).json({
					total: total,
					totalPage: totalPage,
					data: jobs,
				});
			} else {
				const jobs = await Job.find().where(predicates).lean();
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
			if (data.end_date) {
				data.end_date = moment(data.end_date, "DD-MM-YYYY");
			}

			const user = res.locals.user;
			console.log(data);
			await Job.findByIdAndUpdate(jobId, data);
			res.status(200).json("Update successful");
		} catch (error) {
			console.log(error);
			res.status(500).json("Server error");
		}
	}

	// [DELETE] /api/job-post/:jobId
	async delete(req, res, next) {
		try {
			const jobId = req.params.jobId;
			const user = res.locals.user;
			await Job.findByIdAndDelete(jobId);
			await JobSkill.deleteMany({ job_id: jobId });
			await Apply.deleteMany({ job_id: jobId });
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
			const appliesOfJobPost = await Apply.find({ job_id: job._id }).distinct(
				"cv_id"
			);
			const cvs = await CV.find({
				_id: { $in: appliesOfJobPost },
			});
			res.status(200).json(cvs);
		} catch (error) {
			res.status(500).json("Server error");
		}
	}

	async top(req, res, next) {
		try {
			const jobs = await Job.find().sort({ salary: -1 }).limit(9);
			res.status(200).json(jobs);
		} catch (error) {
			console.log(error);
			res.status(500).json("Server error");
		}
	}
}

module.exports = new JobPostController();
