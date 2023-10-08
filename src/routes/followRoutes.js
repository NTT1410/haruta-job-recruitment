const express = require("express");
const followController = require("../app/controllers/FollowController");
const router = express.Router();

const { checkCandidate, checkAdmin } = require("../middleware/authMiddleware");

// router.get("/", checkAdmin, followController.show);

router.get("/", checkCandidate, followController.detail);
router.post("/", checkCandidate, followController.create);
router.delete("/", checkCandidate, followController.create);

module.exports = router;
