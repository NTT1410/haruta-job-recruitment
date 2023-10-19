const express = require("express");
const router = express.Router();
const { checkActive } = require("../middleware/authMiddleware");

const authController = require("../app/controllers/authController");
const SiteController = require("../app/controllers/SiteController");
const CandidateController = require("../app/controllers/CandidateController");
const EmployerController = require("../app/controllers/EmployerController");

const fileUploader = require("../config/cloudinary.config");

router.get("/login", SiteController.login);
router.post("/login", authController.login);
router.post("/login_c", authController.login_c);
router.post("/login_e", authController.login_e);
router.get("/logout", authController.logout);
router.get("/logout_admin", authController.logout_get);
router.put("/update-password", authController.update);
router.post(
	"/signup_c",
	fileUploader.single("file"),
	CandidateController.create
);
router.post(
	"/signup_e",
	fileUploader.single("file"),
	EmployerController.create
);

module.exports = router;
