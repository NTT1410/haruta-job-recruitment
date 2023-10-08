const express = require("express");
const router = express.Router();

const candidateRoutes = require("./candidateRoutes");
const employerRoutes = require("./employerRoutes");

const siteController = require("../app/controllers/SiteController");
const candidateController = require("../app/controllers/CandidateController");

router.put("/active", candidateRoutes);
// router.get("/candidate", (req, res) => res.send("okay!"));
router.get("/candidate", candidateController.show);
router.get("/employer", employerRoutes);

module.exports = router;
