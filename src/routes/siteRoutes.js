const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const candidateController = require("../app/controllers/CandidateController");
const employerController = require("../app/controllers/EmployerController");
const jobController = require("../app/controllers/JobPostController");
const companyController = require("../app/controllers/CompanyController");

router.get("/", siteController.index);
router.get("/cdd", siteController.candidate);
router.get("/cdd/create", siteController.candidateCreate);
router.get("/cdd/:userId", siteController.candidateDetails);
router.get("/empl", siteController.employer);
router.get("/empl/create", siteController.employerCreate);
router.get("/empl/:userId", siteController.employerDetails);
router.get("/cpn", siteController.company);
router.get("/cpn/create", siteController.companyCreate);
router.get("/cpn/:companyId", siteController.companyDetails);
router.get("/job", siteController.job);
router.get("/job/create", siteController.jobCreate);
router.get(
	"/job/:jobId",
	companyController.companiesNameAndId,
	siteController.jobDetails
);
router.get("/apply", siteController.apply);
router.get("/apply/create", siteController.jobCreate);
router.get(
	"/apply/:applyId",
	companyController.companiesNameAndId,
	siteController.jobDetails
);

router.get("/countCandidateMonthly", candidateController.countCandidateMonthly);
router.get("/countEmployerMonthly", employerController.countEmployerMonthly);

module.exports = router;
