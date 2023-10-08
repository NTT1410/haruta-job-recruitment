const sidenav = document.getElementById("sidenav-1");
const sidenavInstance = mdb.Sidenav.getInstance(sidenav);
const formLogin = document.querySelector(".form-login");
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

if (formSignup) {
	formSignup.addEventListener("submit", async (e) => {
		e.preventDefault();

		// reset errors
		usernameError.textContent = "";
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

// if (signupPage) {
// 	nav.parentNode.removeChild(nav);
// 	sidebar.parentNode.removeChild(sidebar);
// 	main.setAttribute("class", "mt-4");
// }

// const candidate_1 = document.querySelector(".candidate_1");
// if (candidate_1) {

// $(".count-candidate").text(countJob);
const countCandidate = $(".count-candidate");
const countEmployer = $(".count-employer");
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
		url: "/api/employer/count",
	})
		.then((data) => {
			countCandidate.text(data);
		})
		.catch((err) => {
			console.log(err);
		});
}

$("#paging").pagination({
	dataSource: "/admin/candidate?page=1",
	locator: "data",
	totalNumberLocator: function (res) {
		return res.total;
	},
	// dataSource: [1, 2, 3, 4, 5, 6, 7, 8],
	pageSize: 8,
	afterPageOnClick: function (evt, page) {
		$("#example_wrapper").remove();
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
		$("#table-candidate").append(table);
		loadCandidate(page);
	},
});

function deleteCandidate(id) {
	$.ajax({
		type: "DELETE",
		url: "/api/candidates/" + id,
	})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
}

// templates
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

var idCandidate = null;
function loadCandidate(page) {
	Object.assign(DataTable.defaults, {
		// searching: false,
		info: false,
		paging: false,
	});
	const table = new DataTable("#example", {
		ajax: {
			type: "GET",
			url: `/admin/candidate?page=` + page,
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
		idCandidate = table.row(e.target.closest("tr")).data()._id;
		let tr = e.target.closest("tr");
		let row = table.row(tr);
		console.log(row.data());
		if (classList.contains("selected")) {
			classList.remove("selected");
		} else {
			table
				.rows(".selected")
				.nodes()
				.each((row) => row.classList.remove("selected"));
			classList.add("selected");
		}
	});
	document.querySelector("#button-edit").addEventListener("click", function () {
		if (idCandidate) {
			window.location.href = "/cdd/" + idCandidate;
		}
	});
	document
		.querySelector("#button-delete")
		.addEventListener("click", function () {
			if (idCandidate) {
				deleteCandidate(idCandidate);
				idCandidate = "null";
				table.row(".selected").remove().draw(false);
			}
		});
}

loadCandidate(1);

function update(uri) {
	const id = $("#id").val();
	$.ajax({
		url: "/api" + uri + id,
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
function updateCandidate() {
	let uri = "/candidates/";
	update(uri);
}
