const sidenav = document.getElementById("sidenav-1");
const sidenavInstance = mdb.Sidenav.getInstance(sidenav);

const formSignup = document.querySelector(".form-signup");
const usernameError = document.querySelector(".username.error");
const passwordError = document.querySelector(".password.error");

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

const formLogin = document.querySelector(".form-login");
if (formLogin) {
	formLogin.addEventListener("submit", async (e) => {
		e.preventDefault();

		// reset errors
		usernameError.textContent = "";
		passwordError.textContent = "";

		// get value
		const username = formLogin.username.value;
		const password = formLogin.password.value;
		console.log(username, password);

		try {
			const res = await fetch("/auth/login", {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.errors) {
				usernameError.textContent = data.errors.username;
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

// if (formSignup) {
// 	formSignup.addEventListener("submit", async (e) => {
// 		e.preventDefault();

// 		// reset errors
// 		usernameError.textContent = "";
// 		passwordError.textContent = "";

// 		// get value
// 		const username = form.username.value;
// 		const password = form.password.value;
// 		const first_name = form.first_name.value;
// 		const last_name = form.last_name.value;
// 		const phone = form.phone.value;
// 		const email = form.email.value;
// 		const day_of_birth = form.day_of_birth.value;

// 		try {
// 			const res = await fetch("/signup", {
// 				method: "POST",
// 				body: JSON.stringify({
// 					username,
// 					password,
// 					first_name,
// 					last_name,
// 					phone,
// 					email,
// 					day_of_birth,
// 				}),
// 				headers: { "Content-Type": "application/json" },
// 			});
// 			const data = await res.json();
// 			console.log(data);
// 			if (data.errors) {
// 				usernameError.textContent = data.errors.username;
// 				passwordError.textContent = data.errors.password;
// 			}
// 			if (data.user) {
// 				location.assign("/");
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	});
// }

// ------------------- COUNT ----------------
const countCandidate = $(".count-candidate");
const countEmployer = $(".count-employer");
const countJob = $(".count-job");
const countCompanies = $(".count-companies");
if (countCandidate) {
	$.ajax({
		type: "GET",
		url: "/api/candidates/count",
	})
		.then((data) => {
			countCandidate.text(data);
		})
		.catch((err) => {
			console.log(err);
		});
}
if (countEmployer) {
	$.ajax({
		type: "GET",
		url: "/api/employers/count",
	})
		.then((data) => {
			countEmployer.text(data);
		})
		.catch((err) => {
			console.log(err);
		});
}
if (countJob) {
	$.ajax({
		type: "GET",
		url: "/api/job-post/count",
	})
		.then((data) => {
			countJob.text(data);
		})
		.catch((err) => {
			console.log(err);
		});
}
if (countCompanies) {
	$.ajax({
		type: "GET",
		url: "/api/companies/count",
	})
		.then((data) => {
			countCompanies.text(data);
		})
		.catch((err) => {
			console.log(err);
		});
}
// ------------------- COUNT ----------------

// ---------------- TEMPLATES --------------------------------
const templatesTable = () => {
	const table = $("<table></table>");
	table.attr("id", "example");
	table.attr("class", "display");
	table.attr("width", "100%");
	// Tạo một phần `<thead>` mới
	const thead = $("<thead></thead>");

	// Tạo một hàng mới cho phần `<thead>`
	const row = $("<tr></tr>");

	// Tạo ba cột mới cho hàng
	const nameCell = $("<th></th>");
	const phoneCell = $("<th></th>");
	const createdAtCell = $("<th></th>");
	const statusCell = $("<th></th>");

	// Thiết lập nội dung của các cột
	nameCell.text("Name");
	phoneCell.text("Phone");
	createdAtCell.text("Created At");
	statusCell.text("Status");

	// Thêm các cột vào hàng
	row.append(nameCell);
	row.append(phoneCell);
	row.append(createdAtCell);
	row.append(statusCell);

	// Thêm hàng vào phần `<thead>`
	thead.append(row);
	// Thêm phần `<thead>` vào bảng
	table.prepend(thead);
	return table;
};
function fullName(data) {
	const img =
		"<img src=" +
		data.avatar +
		'style="width: 45px; height: 45px" class="rounded-circle" />';
	const name =
		'<div class="ms-3">' +
		'<p class="fw-bold mb-1 td-fullname">' +
		data.first_name +
		data.last_name +
		"</p>" +
		'<p class=" mb-0">' +
		data.email +
		"</p>" +
		"</div>";
	return img + name;
}
function activeTemplate(data) {
	const activeT =
		'<span class="badge badge-success rounded-pill d-inline">active</span>';
	const activeF =
		'<span class="badge badge-danger rounded-pill d-inline">Inactive</span>';
	return data ? activeT : activeF;
}
// ---------------- TEMPLATES --------------------------------

// ------------ Load Table --------------------------------
var idCandidate = null;
const loadTable = (page, path) => {
	Object.assign(DataTable.defaults, {
		info: false,
		paging: false,
	});
	const table = new DataTable("#example", {
		ajax: {
			type: "GET",
			url: "/admin" + path + "?page=" + page,
		},
		columns: [
			{
				className: "d-flex align-items-center",
				data: null,
				render: function (data, type) {
					// Combine the first and last names into a single table field
					return fullName(data);
				},
			},
			{
				data: "phone",
			},
			{
				data: "createdAt",
				render: function (data, type) {
					return moment(data).format("DD-MM-YYYY");
				},
			},
			{
				data: "active",
				render: function (data, type) {
					return activeTemplate(data);
				},
			},
		],
	});
	table.on("click", "tbody tr", (e) => {
		let classList = e.currentTarget.classList;
		let tr = e.target.closest("tr");
		let row = table.row(tr);
		if (classList.contains("selected")) {
			classList.remove("selected");
			idCandidate = null;
		} else {
			table
				.rows(".selected")
				.nodes()
				.each((row) => row.classList.remove("selected"));
			classList.add("selected");
			idCandidate = table.row(e.target.closest("tr")).data()._id;
		}
		console.log(idCandidate);
	});
	document.querySelector("#button-edit").addEventListener("click", function () {
		const tableC = $("#table-candidate");
		const tableE = $("#table-employer");
		if (tableC.length > 0) {
			if (idCandidate) {
				window.location.href = "/cdd/" + idCandidate;
			}
		} else if (tableE.length > 0) {
			if (idCandidate) {
				window.location.href = "/empl/" + idCandidate;
			}
		}
	});
	document
		.querySelector("#button-delete")
		.addEventListener("click", function () {
			if (idCandidate && table.row(".selected").length > 0) {
				table.row(".selected").remove().draw(false);
				deleteUser(idCandidate);
				idCandidate = null;
			}
		});
};

// ------------ Load Table --------------------------------

// ------------- PAGING TABLE --------------------------------
const paging = (path, table) => {
	$("#paging").pagination({
		dataSource: "/admin" + path + "?page=1",
		locator: "data",
		totalNumberLocator: function (res) {
			return res.total;
		},
		pageSize: 8,
		afterPageOnClick: function (evt, page) {
			$("#example_wrapper").remove();
			console.log(templatesTable());
			table.append(templatesTable());
			loadTable(page, path);
		},
	});
};
// ------------- PAGING TABLE --------------------------------

const createTable = () => {
	const tableC = $("#table-candidate");
	const tableE = $("#table-employer");
	const tableCompany = $("#table-company");
	const pathC = "/candidates";
	const pathE = "/employers";
	if (tableC.length > 0) {
		console.log("c");
		loadTable(1, pathC);
		paging(pathC, tableC);
	} else if (tableE.length > 0) {
		console.log(pathE);
		loadTable(1, pathE);
		paging(pathE, tableE);
	}
};
createTable();

const deleteRow = (id, path) => {
	$.ajax({
		type: "DELETE",
		url: "/api" + path + "/" + id,
	})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};

const deleteUser = (id) => {
	const tableC = $("#table-candidate");
	const tableE = $("#table-employer");
	const pathC = "/candidates";
	const pathE = "/employers";
	if (tableC.length > 0) {
		deleteRow(id, pathC);
	} else if (tableE.length > 0) {
		deleteRow(id, pathE);
	}
};

function update(path) {
	const id = $("#id").val();
	console.log(path);
	$.ajax({
		url: "/api" + path + "/" + id,
		type: "PUT",
		data: {
			first_name: $("#first_name").val(),
		},
	})
		.then((data) => {
			window.history.back();
		})
		.catch((err) => console.log(err));
}
function updateUser() {
	const updateC = $("#update-candidate");
	const updateE = $("#update-employer");
	const pathC = "/candidates";
	const pathE = "/employers";
	if (updateC.length > 0) {
		update(pathC);
	} else if (updateE.length > 0) {
		update(pathE);
	}
}

function create(data, path) {
	$.ajax({
		url: "/api" + path,
		type: "POST",
		data: {
			first_name: data.first_name,
			last_name: data.last_name,
			username: data.username,
			password: data.password,
			email: data.email,
			phone: data.phone,
		},
	})
		.then((data) => {
			window.history.back();
		})
		.catch((err) => console.log(err));
}

function createUser() {
	const first_name = $("#first_name").val();
	const last_name = $("#last_name").val();
	const username = $("#username").val();
	const password = $("#password").val();
	const email = $("#email").val();
	const phone = $("#phone").val();

	if (
		first_name === null ||
		last_name === null ||
		username === null ||
		password === null ||
		email === null ||
		phone === null
	) {
		alert("Please do not leave it blank");
	} else {
		const data = {
			first_name: first_name,
			last_name: last_name,
			username: username,
			password: password,
			email: email,
			phone: phone,
		};

		const createC = $("#create-candidate");
		const createE = $("#create-employer");
		const pathC = "/candidates";
		const pathE = "/employers";
		if (createC.length > 0) {
			create(data, pathC);
		} else if (createE.length > 0) {
			create(data, pathE);
		}
	}
}
