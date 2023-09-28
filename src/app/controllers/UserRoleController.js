const userRole = require("../models/UserRole");
const Role = require("../models/Role");
const { default: mongoose } = require("mongoose");
class UserRoleController {
	// [GET] /
	index(req, res, next) {
		userRole
			.find()
			.then((ur) => {
				res.json(ur);
			})
			.catch(next);
	}
}

module.exports = new UserRoleController();
