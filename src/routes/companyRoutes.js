const express = require("express");
const router = express.Router();

const companyController = require("../app/controllers/CompanyController");
const { checkAdmin } = require("../middleware/authMiddleware");

router.get("/count", companyController.count);
router.get("/id-name", companyController.companiesNameAndId);
router.get("/top9", companyController.top9);

// [GET, POST, PUT, DELETE]
router.get("/", companyController.show);
router.get("/:companyId", companyController.detail);
router.get("/:companyId/job-post", companyController.jobPostOfCompany);

router.get("/:companyId/cv", companyController.cv);

// admin
// router.put("/:companyId", (req, res) => res.send("oe"));
router.put("/:companyId", checkAdmin, companyController.updateById);

// admin
// router.delete("/:companyId", (req, res) => res.json(req.params.companyId));
router.delete("/:companyId", checkAdmin, companyController.deleteById);

module.exports = router;
