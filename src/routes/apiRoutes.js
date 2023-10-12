const express = require("express");
const router = express.Router();
const {
	requireAuth,
	checkUser,
	checkCandidate,
} = require("../middleware/authMiddleware");

const candidateRoutes = require("./candidateRoutes");
const employerRoutes = require("./employerRoutes");
const skillRoutes = require("./skillRoutes");
const skillCandidateRoutes = require("./skillCandidateRoutes");
const companyRoutes = require("./companyRoutes");
const followRoutes = require("./followRoutes");
const jobPostRoutes = require("./jobPostRoutes");
const applyRoutes = require("./applyRoutes");

// /api/candidates
router.use("/candidates", candidateRoutes);
// router.get("/candidates", (req, res, next) => res.send("test"));

// /api/employers
router.use("/employers", employerRoutes);

// /api/skills
router.use("/skills", skillRoutes);

// /api/companies
router.use("/companies", companyRoutes);

// /api/skill-candidates
router.use("/skill-candidates", skillCandidateRoutes);

// /api/follow
router.use("/follows", followRoutes);

// api/job-post
router.use("/job-post", jobPostRoutes);

// api/apply
// router.use("/apply", applyRoutes);

module.exports = router;
