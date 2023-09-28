const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillCandidate = new Schema({
	skill_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Skill",
		required: true,
	},
	candidate_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Candidate",
		required: true,
	},
});

module.exports = mongoose.model("Skill_Candidate", SkillCandidate);
