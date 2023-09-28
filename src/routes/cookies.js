const express = require("express");
const router = express.Router();

router.get("/set-cookies", (req, res) => {
	// res.setHeader("Set-Cookie", "newUser=true");

	res.cookie("newUser", false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
	res.send("your-cookie");
});
router.get("/read-cookies", (req, res) => {
	const cookies = req.cookies;
	console.log(cookies);

	res.json(cookies);
});

module.exports = router;
