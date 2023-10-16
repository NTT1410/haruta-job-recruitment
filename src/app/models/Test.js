const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Test = new Schema({
	file: {
		type: String,
	},
});

module.exports = mongoose.model("Test", Test);
