const express = require("express");
const router = express.Router();

const companyController = require("../app/controllers/CompanyController");

router.get("/count", companyController.count);
router.get("/id-name", companyController.companiesNameAndId);
router.get("/:companyId/job-post", companyController.jobPostOfCompany);

// [GET, POST, PUT, DELETE]
router.get("/", companyController.show);
router.get("/:companyId", companyController.detail);

// admin
// router.put("/:companyId", (req, res) => res.send("oe"));
router.put("/:companyId", companyController.updateById);

// admin
// router.delete("/:companyId", (req, res) => res.json(req.params.companyId));
router.delete("/:companyId", companyController.deleteById);

module.exports = router;
