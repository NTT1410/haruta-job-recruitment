const sidenav = document.getElementById("sidenav-1");
const sidenavInstance = mdb.Sidenav.getInstance(sidenav);
const tableC = $("#table-candidate");
const tableE = $("#table-employer");
const tableCompany = $("#table-company");
const tableJob = $("#table-job");
const pathC = "/candidates";
const pathE = "/employers";
const pathCompany = "/companies";
const pathJob = "/job-post";

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

const templatesTableCompany = () => {
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
	const establishmentCell = $("<th></th>");
	const authCell = $("<th></th>");
	const statusCell = $("<th></th>");

	// Thiết lập nội dung của các cột
	nameCell.text("Name");
	phoneCell.text("Phone");
	establishmentCell.text("Establishment Date");
	authCell.text("Auth");
	statusCell.text("Status");

	// Thêm các cột vào hàng
	row.append(nameCell);
	row.append(phoneCell);
	row.append(establishmentCell);
	row.append(authCell);
	row.append(statusCell);

	// Thêm hàng vào phần `<thead>`
	thead.append(row);
	// Thêm phần `<thead>` vào bảng
	table.prepend(thead);
	return table;
};

const templatesTableJob = () => {
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
	const companyCell = $("<th></th>");
	const startDateCell = $("<th></th>");
	const endDateCell = $("<th></th>");
	const statusCell = $("<th></th>");

	// Thiết lập nội dung của các cột
	nameCell.text("Name");
	companyCell.text("company");
	startDateCell.text("Start Date");
	endDateCell.text("End Date");
	statusCell.text("Status");

	// Thêm các cột vào hàng
	row.append(nameCell);
	row.append(companyCell);
	row.append(startDateCell);
	row.append(endDateCell);
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
		" " +
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

// --------- TABLES --------------------------------
const tableUsers = (page, path) => {
	return new DataTable("#example", {
		ajax: {
			type: "GET",
			// url: "/admin" + path + "?page=" + page,
			url: "/admin" + path,
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
};
const tableCompanies = (page, path) => {
	return new DataTable("#example", {
		ajax: {
			type: "GET",
			url: "/admin" + path,
		},
		columns: [
			{ data: "name" },
			{
				data: "phone",
			},
			{
				data: "establishment_date",
				render: function (data, type) {
					return moment(data).format("DD-MM-YYYY");
				},
			},
			{
				data: "auth",
				render: function (data, type) {
					return activeTemplate(data);
				},
			},
			{
				data: "status",
				render: function (data, type) {
					return activeTemplate(data);
				},
			},
		],
	});
};
const tableJobs = (page, path) => {
	return new DataTable("#example", {
		ajax: {
			type: "GET",
			url: "/admin" + path,
		},
		columns: [
			{
				data: "name",
			},
			{
				data: "company_id",
			},
			{
				data: "start_date",
				render: function (data, type) {
					return moment(data).format("DD-MM-YYYY");
				},
			},
			{
				data: "end_date",
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
};
// --------- TABLES --------------------------------

// ------------ Load Table --------------------------------
var idCandidate = null;
const loadTable = (page, path) => {
	Object.assign(DataTable.defaults, {
		info: false,
		// paging: false,
	});
	let table = null;
	if (tableC.length > 0 || tableE.length > 0) {
		table = tableUsers(page, path);
	} else if (tableCompany.length > 0) {
		table = tableCompanies(page, path);
	} else if (tableJob.length > 0) {
		console.log(page, path);
		table = tableJobs(page, path);
	}
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
		if (tableC.length > 0) {
			if (idCandidate) {
				window.location.href = "/cdd/" + idCandidate;
			}
		} else if (tableE.length > 0) {
			if (idCandidate) {
				window.location.href = "/empl/" + idCandidate;
			}
		} else if (tableCompany.length > 0) {
			if (idCandidate) {
				window.location.href = "/cpn/" + idCandidate;
			}
		} else if (tableJob.length > 0) {
			if (idCandidate) {
				window.location.href = "/job/" + idCandidate;
			}
		}
	});
	document
		.querySelector("#button-delete")
		.addEventListener("click", function () {
			if (idCandidate && table.row(".selected").length > 0) {
				table.row(".selected").remove().draw(false);
				if (tableC.length > 0 || tableE.length > 0) {
					deleteUser(idCandidate);
				} else if (tableCompany.length > 0) {
					deleteCompany(idCandidate);
				} else if (tableJob.length > 0) {
					deleteJob(idCandidate);
				}

				idCandidate = null;
			}
		});
};

// ------------ Load Table --------------------------------

// ------------- PAGING TABLE --------------------------------
const paging = (path, table) => {
	console.log(path);
	$("#paging").pagination({
		dataSource: "/admin" + path + "?page=1",
		locator: "data",
		totalNumberLocator: function (res) {
			return res.total;
		},
		pageSize: 8,
		afterPageOnClick: function (evt, page) {
			$("#example_wrapper").remove();
			if (tableC.length > 0 || tableE.length > 0) {
				table.append(templatesTable());
			} else if (tableCompany.length > 0) {
				table.append(templatesTableCompany());
			} else if (tableJob.length > 0) {
				table.append(templatesTableJob());
			}
			loadTable(page, path);
		},
	});
};
// ------------- PAGING TABLE --------------------------------

const createTable = () => {
	if (tableC.length > 0) {
		loadTable(1, pathC);
		// paging(pathC, tableC);
	} else if (tableE.length > 0) {
		loadTable(1, pathE);
		// paging(pathE, tableE);
	} else if (tableCompany.length > 0) {
		loadTable(1, pathCompany);
		// paging(pathCompany, tableCompany);
	} else if (tableJob.length > 0) {
		loadTable(1, pathJob);
		// paging(pathJob, tableJob);
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
	if (tableC.length > 0) {
		deleteRow(id, pathC);
	} else if (tableE.length > 0) {
		deleteRow(id, pathE);
	}
};
const deleteCompany = (id) => {
	deleteRow(id, pathCompany);
};
const deleteJob = (id) => {
	deleteRow(id, pathJob);
};

function update(path) {
	const id = $("#id").val();
	const first_name = $("#first_name").val();
	const last_name = $("#last_name").val();
	const username = $("#username").val();
	const email = $("#email").val();
	const phone = $("#phone").val();
	const day_of_birth = $("#day_of_birth").val();
	const active = $("#active").val();
	if (
		!first_name ||
		!last_name ||
		!username ||
		!email ||
		!phone ||
		!day_of_birth ||
		!active
	) {
		// Tạo một thẻ i
		const i = document.createElement("i");
		i.classList.add("fas", "fa-exclamation-circle");

		// Tạo một thẻ span
		const span = document.createElement("span");
		span.textContent = "Please complete all information";

		$("#error").append(i);
		$("#error").append(span);
	} else {
		const data = {
			id,
			first_name,
			last_name,
			username,
			email,
			phone,
			day_of_birth,
			active,
		};
		$.ajax({
			url: "/api" + path + "/" + id,
			type: "PUT",
			data: data,
		})
			.then((data) => {
				window.history.back();
			})
			.catch((err) => console.log(err));
	}
}
function updateUser() {
	const updateC = $("#update-candidate");
	const updateE = $("#update-employer");
	if (updateC.length > 0) {
		update(pathC);
	} else if (updateE.length > 0) {
		update(pathE);
	}
}

const updateCompany = () => {
	const id = $("#id").val();
	$.ajax({
		url: "/api/companies/" + id,
		type: "PUT",
		data: {
			name: $("#name").val(),
		},
	})
		.then((data) => {
			window.history.back();
		})
		.catch((err) => console.log(err));
};
const updateJob = () => {
	const id = $("#id").val();
	$.ajax({
		url: "/api/job-post/" + id,
		type: "PUT",
		data: {
			name: $("#name").val(),
		},
	})
		.then((data) => {
			window.history.back();
		})
		.catch((err) => console.log(err));
};

function create(data, path) {
	fetch("/api" + path, {
		method: "POST",
		body: data, // Payload is formData object
	})
		.then((data) => window.history.back())
		.catch((err) => console.log(err));
}

function createUser() {
	const files = document.getElementById("files");
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
		const formData = new FormData();
		formData.append("first_name", first_name);
		formData.append("last_name", last_name);
		formData.append("username", username);
		formData.append("password", password);
		formData.append("email", email);
		formData.append("phone", phone);
		for (let i = 0; i < files.files.length; i++) {
			formData.append("files", files.files[i]);
		}
		const createC = $("#create-candidate");
		const createE = $("#create-employer");
		const pathC = "/candidates";
		const pathE = "/employers";
		if (createC.length > 0) {
			create(formData, pathC);
		} else if (createE.length > 0) {
			create(formData, pathE);
		}
	}
}
