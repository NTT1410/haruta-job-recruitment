const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
	_id: ObjectId,
	fullname: { type: String },
	phone: { type: String },
});

module.exports = mongoose.model("User", User);
