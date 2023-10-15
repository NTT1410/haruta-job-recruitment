const express = require("express");
const router = express.Router();

const jobPostController = require("../app/controllers/JobPostController");

router.get("/count", jobPostController.countJob);
router.get("/top", jobPostController.top);
router.get("/", jobPostController.show);
router.post("/", jobPostController.create);
router.get("/:jobId/applies", jobPostController.appliesOfJobPost);
router.get("/:jobId", jobPostController.detail);
// router.put("/:jobId", (req, res) => res.send("oke"));
router.put("/:jobId", jobPostController.update);
router.delete("/:jobId", jobPostController.delete);

module.exports = router;
