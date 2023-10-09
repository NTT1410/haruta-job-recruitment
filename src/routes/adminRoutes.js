const express = require("express");
const router = express.Router();

const candidateRoutes = require("./candidateRoutes");
const employerRoutes = require("./employerRoutes");

const siteController = require("../app/controllers/SiteController");
const candidateController = require("../app/controllers/CandidateController");
const employerController = require("../app/controllers/EmployerController");
const companyController = require("../app/controllers/CompanyController");

router.put("/active", candidateRoutes);
// router.get("/candidate", (req, res) => res.send("okay!"));
router.get("/candidates", candidateController.show);
router.get("/employers", employerController.show);
router.get("/companies", companyController.show);

module.exports = router;
