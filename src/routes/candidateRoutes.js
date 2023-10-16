const express = require("express");
const router = express.Router();

const { checkCandidate, checkAdmin } = require("../middleware/authMiddleware");

const candidateController = require("../app/controllers/CandidateController");
const SkillCandidateController = require("../app/controllers/SkillCandidateController");
const CandidateController = require("../app/controllers/CandidateController");

// chua xu ly deletedAt deletedBy

// [GET] /api/candidates/
// check admin
// router.get("/", checkAdmin, candidateController.show);

// [GET] /api/candidates
// check current user

router.get("/", checkCandidate, candidateController.detail); //success
router.put("/", checkCandidate, candidateController.update); //success
router.delete("/", checkCandidate, candidateController.delete); //success

// [GET, POST, PUT, DELETE] /api/candidates/skill-candidate
router.get("/skill-candidate", checkCandidate, SkillCandidateController.detail);
router.post(
	"/skill-candidate",
	checkCandidate,
	SkillCandidateController.create
);
router.delete(
	"/skill-candidate",
	checkCandidate,
	SkillCandidateController.delete
);

// count
router.get("/count", CandidateController.countCandidate);

// [POST] /api/candidates
// check candidate
router.post("/", candidateController.create); //success
// router.post("/", (req, res) => res.json("test")); //success

router.get("/cv/:cvId", candidateController.candidateOfCV); //success

// [GET] /api/candidates/:userId
//  check admin
// router.get("/:userId", checkAdmin, (req, res) => res.send("oke")); //success
router.get("/:userId", checkAdmin, candidateController.detailById); //success
router.put("/:userId", checkAdmin, candidateController.updateById); //success
// router.put("/:userId", (req, res) => res.send("oke")); //success
router.delete("/:userId", checkAdmin, candidateController.deleteById); //success

module.exports = router;
