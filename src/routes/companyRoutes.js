const express = require("express");
const router = express.Router();

const companyController = require("../app/controllers/CompanyController");

router.get("/count", companyController.count);

// [GET, POST, PUT, DELETE]
router.get("/", companyController.show);
router.get("/:companyId", companyController.detail);

// admin
router.put("/", companyController.show);

// admin
router.delete("/", companyController.show);

module.exports = router;
