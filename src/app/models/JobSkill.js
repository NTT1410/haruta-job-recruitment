const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSkill = new Schema({
	job_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Job",
		required: true,
	},
	skill_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Skill",
		required: true,
	},
});

module.exports = mongoose.model("Job_Skill", JobSkill);
