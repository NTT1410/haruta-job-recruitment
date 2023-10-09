const express = require("express");
const router = express.Router();

const jobPostController = require("../app/controllers/JobPostController");

router.get("/count", jobPostController.countJob);
router.get("/", jobPostController.show);
router.post("/", jobPostController.create);
router.get("/:jobId", jobPostController.detail);
router.put("/:jobId", jobPostController.update);
router.delete("/:jobId", jobPostController.delete);

module.exports = router;
