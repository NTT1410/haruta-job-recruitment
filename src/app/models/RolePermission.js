const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolePermission = new Schema({
	role_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Role",
		required: true,
	},
	permission_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Permission",
		required: true,
	},
});

module.exports = mongoose.model("Role_Permission", RolePermission);
