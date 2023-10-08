const express = require("express");
const router = express.Router();

const { checkCandidate, checkAdmin } = require("../middleware/authMiddleware");

const skillCandidateController = require("../app/controllers/SkillCandidateController");

// [GET] /api/skill-candidates
router.get("/", checkAdmin, skillCandidateController.show);

// [GET] /api/skill-candidates
// check current user
// router.get("/", checkCandidate, skillCandidateController.detail);

module.exports = router;
