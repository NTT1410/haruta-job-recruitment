const express = require("express");
const router = express.Router();

const skillController = require("../app/controllers/SkillController");

// [GET] /api/skills
router.get("/", skillController.show);

module.exports = router;
