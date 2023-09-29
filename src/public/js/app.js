const sidenav = document.getElementById("sidenav-1");
const sidenavInstance = mdb.Sidenav.getInstance(sidenav);

let innerWidth = null;

const setMode = (e) => {
	if (window.innerWidth === innerWidth) {
		return;
	}

	innerWidth = window.innerWidth;

	if (window.innerWidth < 992) {
		sidenavInstance.changeMode("over");
		sidenavInstance.hide();
	} else {
		sidenavInstance.changeMode("side");
		sidenavInstance.show();
	}
};

setMode();

window.addEventListener("resize", setMode);

const form = document.querySelector("form");
const usernamError = document.querySelector(".username.error");
const passwordError = document.querySelector(".password.error");

const loginPage = document.querySelector(".login-page");
const signupPage = document.querySelector(".signup-page");

const nav = document.querySelector(".navbar");
const sidebar = document.querySelector("#sidenav-1");
const main = document.querySelector(".main");

if (loginPage) {
	nav.parentNode.removeChild(nav);
	sidebar.parentNode.removeChild(sidebar);
	main.setAttribute("class", "");
	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		// reset errors
		usernamError.textContent = "";
		passwordError.textContent = "";

		// get value
		const username = form.username.value;
		const password = form.password.value;

		try {
			const res = await fetch("/auth/login", {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			console.log(data);
			if (data.errors) {
				usernamError.textContent = data.errors.username;
				passwordError.textContent = data.errors.password;
			}
			if (data.user) {
				location.assign("/");
			}
		} catch (err) {
			console.log(err);
		}
	});
} else {
	// Không tìm thấy thẻ .login-page
}

if (signupPage) {
	const form = document.querySelector("form");
	const usernamError = document.querySelector(".username.error");
	const passwordError = document.querySelector(".password.error");

	nav.parentNode.removeChild(nav);
	sidebar.parentNode.removeChild(sidebar);
	main.setAttribute("class", "mt-4");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		// reset errors
		usernamError.textContent = "";
		passwordError.textContent = "";

		// get value
		const username = form.username.value;
		const password = form.password.value;
		const first_name = form.first_name.value;
		const last_name = form.last_name.value;
		const phone = form.phone.value;
		const email = form.email.value;
		const day_of_birth = form.day_of_birth.value;

		try {
			const res = await fetch("/signup", {
				method: "POST",
				body: JSON.stringify({
					username,
					password,
					first_name,
					last_name,
					phone,
					email,
					day_of_birth,
				}),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			console.log(data);
			if (data.errors) {
				usernamError.textContent = data.errors.username;
				passwordError.textContent = data.errors.password;
			}
			if (data.user) {
				location.assign("/");
			}
		} catch (err) {
			console.log(err);
		}
	});
}
