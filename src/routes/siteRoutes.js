const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const candidateController = require("../app/controllers/CandidateController");
const employerController = require("../app/controllers/EmployerController");
const jobController = require("../app/controllers/JobPostController");

router.get(
	"/",
	jobController.countJob,
	employerController.countEmployer,
	siteController.index
);
router.get("/cdd", siteController.candidate);
router.get("/cdd/create", siteController.candidateCreate);
router.get("/cdd/:userId", siteController.candidateDetails);
router.get("/empl", siteController.employer);
router.get("/countCandidateMonthly", candidateController.countCandidateMonthly);
router.get("/countEmployerMonthly", employerController.countEmployerMonthly);

module.exports = router;
