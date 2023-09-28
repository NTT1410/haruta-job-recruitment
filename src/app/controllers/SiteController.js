const User = require("../models/User");
const test = require("../models/Apply");

class SiteController {
	// [GET] /
	// index(req, res, next) {
	// 	async function getUsers() {
	// 		const userlist = await User.find({});
	// 		return userlist;
	// 	}
	// 	getUsers()
	// 		.then(function findItems(item) {
	// 			res.json(item);
	// 		})
	// 		.catch(next);
	// }

	// [GET] /
	index(req, res, next) {
		User.find({})
			.lean()
			.then((users) => res.render("home", { users }))
			.catch(next);
	}
}

module.exports = new SiteController();
