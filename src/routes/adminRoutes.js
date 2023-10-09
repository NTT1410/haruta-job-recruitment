const express = require("express");
const router = express.Router();

const candidateRoutes = require("./candidateRoutes");
const employerRoutes = require("./employerRoutes");

const siteController = require("../app/controllers/SiteController");
const candidateController = require("../app/controllers/CandidateController");
const employerController = require("../app/controllers/EmployerController");

router.put("/active", candidateRoutes);
// router.get("/candidate", (req, res) => res.send("okay!"));
router.get("/candidates", candidateController.show);
router.get("/employers", employerController.show);

module.exports = router;
