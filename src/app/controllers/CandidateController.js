const Candidate = require("../models/Candidate");
const User = require("../models/User");
const moment = require("moment");

class CandidateController {
	// [GET] /
	async show(req, res, next) {
		const candidates = await Candidate.find();
		const user_ids = candidates.map((candidate) => candidate.user_id);
		const users = await User.find({
			_id: { $in: user_ids },
		}).lean();
		for (const user of users) {
			user.createdAt = moment(user.createdAt).format("DD-MM-YYYY");
		}
		res.render("candidate", { users });
	}

	// [GET] /candidate/detail/:slug
	detail(req, res, next) {
		Candidate.findOne({ user_id: req.params.slug })
			.then((candidate) => {
				User.findById(candidate.user_id)
					.lean()
					.then((user) => {
						res.render("candidates/show", { user });
					});
			})
			.catch(next);
	}

	// [GET] /candidate/create
	create(req, res, next) {
		res.render("candidates/create");
	}

	// [POST] /candidate/store
	store(req, res, next) {
		// res.json(req.body);
		const formData = req.body;
		formData.avatar =
			"https://robohash.org/magnamquiadistinctio.png?size=50x50&set=set1";
		formData.username = "admin";
		formData.password = "admin@123";
		formData.country = "Vietnam";
		formData.city = "abc";
		formData.day_of_birth = moment(formData.day_of_birth, "DD-MM-YYYY");
		const user = new User(formData);
		user
			.save()
			.then((user) => new Candidate({ user_id: user._id }).save())
			.then(() => res.redirect("/candidate"))
			.catch(next);
	}
}

module.exports = new CandidateController();
