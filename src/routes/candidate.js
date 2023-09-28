const express = require("express");
const router = express.Router();

const candidateController = require("../app/controllers/CandidateController");

router.get("/create", candidateController.create);
router.post("/store", candidateController.store);
router.get("/detail/:slug", candidateController.detail);
router.get("/", candidateController.show);

module.exports = router;
