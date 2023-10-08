// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { username: "", password: "" };

	// incorrect username
	if (err.message === "Incorrect username") {
		errors.username = "That username is not registered";
	}

	// incorrect password
	if (err.message === "Incorrect password") {
		errors.password = "That password is incorrect";
	}

	// duplicate error code
	if (err.code === 11000) {
		errors.username = "that username is already registered";
		return errors;
	}

	// validation errors
	if (err.message.includes("User validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

module.exports = { handleErrors };
