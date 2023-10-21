const express = require("express");
const router = express.Router();

const candidateRoutes = require("./candidateRoutes");
const employerRoutes = require("./employerRoutes");

const siteController = require("../app/controllers/SiteController");
const candidateController = require("../app/controllers/CandidateController");
const employerController = require("../app/controllers/EmployerController");
const companyController = require("../app/controllers/CompanyController");
const jobPostController = require("../app/controllers/JobPostController");

router.put("/active", candidateRoutes);
// router.get("/candidate", (req, res) => res.send("okay!"));
router.get("/candidates", candidateController.show);
router.get("/employers", employerController.show);
router.get("/companies", companyController.show);
router.get("/job-post", jobPostController.show);
router.get("/info", siteController.info);
router.get("/update-password", siteController.updatePassword);

module.exports = router;
