const express = require("express");
const router = express.Router();

const companyController = require("../app/controllers/CompanyController");

// [GET, POST, PUT, DELETE]
router.get("/", companyController.show);
router.get("/:companyId", companyController.detail);

// admin
router.put("/", companyController.show);

// admin
router.delete("/", companyController.show);

module.exports = router;
