const User = require("../models/User");

class SiteController {
	// [GET] /
	index(req, res) {
		async function getUsers() {
			const userlist = await User.find({});
			return userlist;
		}
		getUsers().then(function findItems(item) {
			res.json(item);
		});
	}
}

module.exports = new SiteController();
