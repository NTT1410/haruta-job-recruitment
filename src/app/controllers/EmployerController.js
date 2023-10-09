const jwt = require("jsonwebtoken");
const moment = require("moment");
const { handleErrors } = require("../../middleware/errors");
const { createToken } = require("../../middleware/token");

const Candidate = require("../models/Candidate");
const Employer = require("../models/Employer");
const User = require("../models/User");
const Role = require("../models/Role");
const UserRole = require("../models/UserRole");

const dotenv = require("dotenv");
// Secret
dotenv.config();

const maxAge = 3 * 24 * 60 * 60;
const pageSize = Number(process.env.PAGE_SIZE);
class EmployerController {
	// [GET] /candidates/
	async show(req, res, next) {
		try {
			const roleId = await Role.findOne({ name: "employer" }).distinct("_id");
			const userRole = await UserRole.find({
				role_id: roleId,
			}).distinct("user_id");
			var page = req.query.page;
			if (page) {
				page = parseInt(page);
				if (page < 1) {
					page = 1;
				}
				var skip = (page - 1) * pageSize;
				const users = await User.find()
					.where("_id")
					.in(userRole)
					.skip(skip)
					.limit(pageSize)
					.lean();
				let total = await User.find().where("_id").in(userRole);
				total = total.length;
				let totalPage = Math.ceil(total.length / 8);
				res.status(200).json({
					total: total,
					totalPage: totalPage,
					data: users,
				});
			} else {
				const users = await User.find().where("_id").in(userRole).lean();
				res.status(200).json({ data: users });
			}
		} catch (error) {
			console.log(error);
			res.status(404).json("Not Found");
		}
	}

	// [GET] /candidates/
	async detail(req, res, next) {
		try {
			const user = await res.locals.user;
			res.status(200).json(user);
		} catch (error) {
			res.status(404).json("Not Found");
		}
	}

	// [PUT] /candidates/
	async update(req, res, next) {
		try {
			const data = req.body;
			const user = res.locals.user;
			await User.updateOne({ _id: user._id }, data);
			res.status(200).json("Update successful");
		} catch (error) {
			res.status(500).json("Update failed");
		}
	}

	// [DELETE] /candidates/
	async delete(req, res, next) {
		try {
			const user = res.locals.user;
			await User.deleteOne({ _id: user._id });
			res.status(200).json("Delete successful");
		} catch (error) {
			res.status(500).json("Delete failed");
		}
	}

	// [GET] /candidates/:candidateId
	async detailById(req, res, next) {
		try {
			const userId = req.params.userId;
			const user = await User.findById(userId);
			res.status(200).json(user);
		} catch (error) {
			res.status(404).json("Not Found");
		}
	}

	// [PUT] /candidates/:candidateId
	async update(req, res, next) {
		try {
			const data = req.body;
			const userId = req.params.userId;
			await User.updateOne({ _id: userId }, data);
			res.status(200).json("Update successful");
		} catch (error) {
			res.status(500).json("Update failed");
		}
	}

	// [DELETE] /candidates/:userId
	async deleteById(req, res, next) {
		try {
			const userId = req.params.userId;
			console.log(userId);
			await Candidate.deleteOne({ user_id: userId });
			await UserRole.deleteOne({ user_id: userId });
			await User.deleteOne({ _id: userId });
			res.status(200).json("Delete successful");
		} catch (error) {
			console.log(error);
			res.status(500).json("Delete failed");
		}
	}

	// [POST] /candidates/
	async create(req, res, next) {
		const day_of_birth = null;
		if (day_of_birth) {
			day_of_birth = moment(req.body.day_of_birth, "DD-MM-YYYY");
		}
		const { avatar, username, password, first_name, last_name, email, phone } =
			req.body;
		try {
			const user = await User.create({
				avatar,
				username,
				password,
				first_name,
				last_name,
				email,
				day_of_birth,
				phone,
			});
			const role = await Role.findOne({ name: "employer" });
			await UserRole.create({ role_id: role.id, user_id: user._id });
			res.status(201).json({ user: user._id });
		} catch (err) {
			console.log(err);
			const errors = handleErrors(err);
			res.status(400).json({ errors });
		}
	}

	async countEmployer(req, res, next) {
		try {
			const roleId = await Role.findOne({ name: "employer" }).distinct("_id");
			const users = await UserRole.find({
				role_id: roleId,
			}).distinct("user_id");
			const count = await User.count().in("_id", users).lean();
			res.locals.countEmployer = count;
			res.status(200).json(count);
			console.log(count);
		} catch (error) {
			console.log(error);
			res.status(500).json("Server error");
		}
	}

	async countEmployerMonthly(req, res, next) {
		try {
			const roleId = await Role.findOne({ name: "employer" }).distinct("_id");
			const users = await UserRole.find({
				role_id: roleId,
			}).distinct("user_id");
			const count = await User.count().in("_id", users).lean();
			const epls = [];
			for (let i = 0; i < 12; i++) {
				epls.push(
					await User.count()
						.where("createdAt")
						.gte(moment().set("month", i).set("date", 1))
						.lt(
							moment()
								.set("month", i + 1)
								.set("date", 0)
						)
						.in("_id", users)
						.lean()
				);
			}
			res.status(200).json(epls);
			console.log(epls);
			next();
		} catch (error) {
			console.log(error);
			res.status(500).json("Server error");
		}
	}
}

module.exports = new EmployerController();