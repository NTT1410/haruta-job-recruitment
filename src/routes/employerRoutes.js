const express = require("express");
const router = express.Router();

const { checkEmployer, checkAdmin } = require("../middleware/authMiddleware");

const employerController = require("../app/controllers/EmployerController");

// chua xu ly deletedAt deletedBy

// [GET] /api/employers
// check current user
router.get("/", checkEmployer, employerController.detail); //success
router.put("/", checkEmployer, employerController.update); //success
router.delete("/", checkEmployer, employerController.delete); //success

// count
router.get("/count", employerController.countEmployer);

router.get("/company", employerController.company);

// [POST] /api/employers
// check candidate
router.post("/", employerController.create); //success

// [GET] /api/employers/:userId
//  check admin
router.get("/:userId", checkAdmin, employerController.detailById); //success
router.put("/:userId", checkAdmin, employerController.updateById); //success
router.delete("/:userId", checkAdmin, employerController.deleteById); //success

module.exports = router;
