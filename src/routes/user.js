const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

// router.get('/candidate-detail', )
router.get("/:slug", userController.show);
router.get("/", userController.index);

module.exports = router;
