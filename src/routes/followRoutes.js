const express = require("express");
const followController = require("../app/controllers/FollowController");
const router = express.Router();

const { checkCandidate, checkAdmin } = require("../middleware/authMiddleware");

// router.get("/", checkAdmin, followController.show);

router.get("/", checkCandidate, followController.detail);
router.post("/:companyId", checkCandidate, followController.create);
router.delete("/:companyId", checkCandidate, followController.delete);

module.exports = router;
