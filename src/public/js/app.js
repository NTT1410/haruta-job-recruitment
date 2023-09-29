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

if (loginPage) {
	const nav = document.querySelector(".navbar");
	nav.parentNode.removeChild(nav);
	const sidebar = document.querySelector("#sidenav-1");
	sidebar.parentNode.removeChild(sidebar);
	const main = document.querySelector(".main");
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
