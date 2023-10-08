const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();
class UserController {
	// [GET] /
	index(req, res, next) {
		User.find({})
			.lean()
			.then((users) => {
				res.render("home", { users });
				// res.json(users);
			})
			.catch(next);
	}

	// [GET] /:id
	detail(req, res, next) {
		User.findById(req.params.id)
			.lean()
			.then((user) => {
				res.render("users/show", { user });
				// res.json(user);
			})
			.catch(next);
	}
}

module.exports = new UserController();
