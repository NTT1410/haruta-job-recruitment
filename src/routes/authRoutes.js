const express = require("express");
const router = express.Router();
const { checkActive } = require("../middleware/authMiddleware");

const authController = require("../app/controllers/authController");
const SiteController = require("../app/controllers/SiteController");

router.get("/login", SiteController.login);
router.post("/login", authController.login);
router.post("/login_c", authController.login_c);
router.post("/login_e", authController.login_e);
router.get("/logout", authController.logout_get);

module.exports = router;
