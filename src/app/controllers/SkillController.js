const Candidate = require("../models/Candidate");
const User = require("../models/User");
const Skill = require("../models/Skill");

const maxAge = 3 * 24 * 60 * 60;

class SkillController {
	// [GET] /candidates/
	async show(req, res, next) {
		try {
			const skills = await Skill.find().lean();
			console.log(skills.length);
			res.status(200).json(skills);
		} catch (error) {
			res.status(404).json("Not Found");
		}
	}
}

module.exports = new SkillController();
