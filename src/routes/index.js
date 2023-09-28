const siteRouter = require("./site");
const userRouter = require("./user");
const userRole = require("./userRole");
const role = require("./role");
const candidateRouter = require("./candidate");
const authRouter = require("./authRoutes");
const cookies = require("./cookies");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

function route(app) {
	app.use("*", checkUser);
	app.use(authRouter);
	app.use("/candidate", candidateRouter);
	app.use("/users", userRouter);
	app.use("/roles", role);
	app.use("/user-roles", userRole);
	app.use("/", requireAuth, siteRouter);

	// cookies
	app.use("/cookies", cookies);
}

module.exports = route;
