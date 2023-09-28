const User = require("../models/User");
class UserController {
	// [GET] /user
	index(req, res) {
		res.render("user");
	}

	// [GET] /user/:slug
	show(req, res, next) {
		User.findById(req.params.slug)
			.lean()
			.then((user) => {
				res.render("users/show", { user });
				// res.json(user);
			})
			.catch(next);
	}
}

module.exports = new UserController();
