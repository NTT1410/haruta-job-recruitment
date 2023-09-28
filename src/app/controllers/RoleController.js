const Role = require("../models/Role");
class RoleController {
	// [GET] /
	index(req, res, next) {
		Role.find()
			.then((ur) => {
				res.json(ur);
			})
			.catch(next);
	}
}

module.exports = new RoleController();
