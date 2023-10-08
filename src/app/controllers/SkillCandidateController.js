const Candidate = require("../models/Candidate");
const User = require("../models/User");
const Skill = require("../models/Skill");
const SkillCandidate = require("../models/SkillCandidate");

const mongoose = require("mongoose");

class SkillCandidateController {
	// [GET] /api/skill-candidates
	async show(req, res, next) {
		try {
			const skillCandidates = await SkillCandidate.find().lean();

			res.status(200).json(skillCandidates);
		} catch (error) {
			res.status(404).json("Not Found");
		}
	}

	// [GET] /api/skill-candidates/:userId
	async detailById(req, res, next) {
		const user = res.locals.user;
		console.log(user._id);
		try {
			const skillCandidates = await SkillCandidate.find({
				user_id: user._id,
			})
				.distinct("skill_id")
				.lean();
			const skills = await Skill.find().where("_id").in(skillCandidates);
			res.status(200).json(skills);
		} catch (error) {
			res.status(404).json("Not Found");
		}
	}

	// [GET] /api/skill-candidates
	async detail(req, res, next) {
		const user = res.locals.user;
		try {
			const skillCandidates = await SkillCandidate.find({
				user_id: user._id,
			})
				.distinct("skill_id")
				.lean();
			const skills = await Skill.find().where("_id").in(skillCandidates);
			res.status(200).json(skills);
		} catch (error) {
			res.status(404).json("Not Found");
		}
	}

	// [POST] /api/skill-candidates
	async create(req, res, next) {
		try {
			const user = res.locals.user;
			const { skill_id } = req.body;
			const skill = await Skill.findById(skill_id);
			const exist = await SkillCandidate.find({
				user_id: user._id,
				skill_id: skill._id,
			});
			if (exist.length <= 0) {
				const skillCandidates = await SkillCandidate.create({
					user_id: user._id,
					skill_id: skill._id,
				});
				res.status(200).json(skillCandidates);
			} else {
				res.status(400).json("Candidate already has this skill");
			}
		} catch (error) {
			res.status(404).json("Not Found");
		}
	}

	// [DELETE] /api/skill-candidates
	async delete(req, res, next) {
		try {
			const user = res.locals.user;
			const { skill_id } = req.body;
			const skill = await Skill.findById(skill_id);
			const skillCandidate = await SkillCandidate.findOne({
				user_id: user._id,
				skill_id: skill._id,
			});
			await SkillCandidate.deleteOne(skillCandidate._id);
			res.status(200).json("Delete successful");
		} catch (error) {
			res.status(404).json("Delete failed");
		}
	}
}

module.exports = new SkillCandidateController();
