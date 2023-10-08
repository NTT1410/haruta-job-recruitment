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

function route(app) {
	app.get("/test", (req, res) => res.json(req.query.t));
	app.use("*", checkUser);

	// auth
	app.use("/auth", authRouter);

	app.use("/*", requireAuth);

	// admin checkAdmin
	app.use("/admin", adminRouter);

	// admin site
	app.use("/", siteRouter);

	// cookies
	app.use("/cookies", cookies);

	// api
	app.use("/api", apiRouter);
}

module.exports = route;
