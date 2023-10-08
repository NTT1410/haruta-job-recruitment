const userRole = require("../models/UserRole");
const Role = require("../models/Role");
const Follow = require("../models/Follow");
const Company = require("../models/Company");

const { mongoose } = require("mongoose");

class UserRoleController {
	// [GET] /api/follows
	async show(req, res, next) {
		try {
			const follows = await Follow.find().lean();
			res.status(200).json(follows);
		} catch (error) {
			res.status(500).json("Server error");
		}
	}

	// [GET] /api/follows
	async detail(req, res, next) {
		try {
			const user = res.locals.user;
			const follows = await Follow.find({ user_id: user._id }).lean();
			res.status(200).json(follows);
		} catch (error) {
			res.status(500).json("Server error");
		}
	}

	// [POST] /api/follows
	async create(req, res, next) {
		try {
			const companyId = req.body.company_id;
			const user = res.locals.user;
			const company = await Company.findById(companyId).lean();
			const exist = await Follow.find({
				user_id: user._id,
				company_id: company._id,
			}).lean();
			if (exist.length <= 0) {
				const follow = await Follow.create({
					user_id: user._id,
					company_id: company._id,
				});
				res.status(200).json(follow);
			} else {
				res.status(400).json("Followed");
			}
		} catch (error) {
			res.status(500).json("Server error");
		}
	}
}

module.exports = new UserRoleController();
