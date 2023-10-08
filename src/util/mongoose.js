const SkillCandidate = require("../app/models/SkillCandidate");
const User = require("../app/models/User");

const handle = async () => {
	const sc = await User.find().lean();
	// console.log(sc);
};

handle();
