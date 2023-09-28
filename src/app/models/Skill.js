const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Skill = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports = mongoose.model("Skill", Skill);
