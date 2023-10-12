const authRouter = require("./authRoutes");
const cookies = require("./cookies");
const apiRouter = require("./apiRoutes");
const adminRouter = require("./adminRoutes");
const siteRouter = require("./siteRoutes");
const {
	requireAuth,
	checkUser,
	checkCandidate,
	checkAdmin,
} = require("../middleware/authMiddleware");
const CandidateController = require("../app/controllers/CandidateController");
const User = require("../app/models/User");

function route(app) {
	app.get("/test", async (req, res) => {
		let predicates = {};
		predicates.username = { $regex: new RegExp("ad") };
		const conditions = {
			username: { $regex: new RegExp("ad") },
			// phone: { $regex: new RegExp("2") },
			// gender: "Male",
		};
		console.log(predicates);
		console.log(conditions);
		const users = await User.find()
			.where(predicates)
			.select({ _id: 1, username: 1 });
		res.json(users);
	});
	app.use("*", checkUser);

	// auth
	app.use("/auth", authRouter);

	app.use("/*", requireAuth);

	// admin checkAdmin
	app.use("/admin", checkAdmin, adminRouter);

	// cookies
	app.use("/cookies", checkAdmin, cookies);

	// api
	app.use("/api", apiRouter);

	// admin site
	app.use("/", checkAdmin, siteRouter);
}

module.exports = route;
