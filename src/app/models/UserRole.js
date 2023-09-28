const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRole = new Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	role_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role",
		required: true,
	},
});

module.exports = mongoose.model("User_Role", UserRole);
