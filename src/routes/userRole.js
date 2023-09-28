const express = require("express");
const router = express.Router();

const userRoleController = require("../app/controllers/UserRoleController");

router.get("/", userRoleController.index);

module.exports = router;
