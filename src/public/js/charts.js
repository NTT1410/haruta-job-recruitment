google.charts.load("current", { packages: ["corechart", "bar"] });
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart2);

async function drawChart() {
	const res = await fetch("/countCandidateMonthly", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	const cdds = await res.json();

	const res2 = await fetch("/countEmployerMonthly", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	const empls = await res2.json();

	var dataR = ["Month", "Candidates", "Employers"];
	var dataC = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const mergedArray = dataC.map((x, i) => [x, cdds[i], empls[i]]);
	mergedArray.unshift(dataR);

	var data = google.visualization.arrayToDataTable(mergedArray);

	var options = {
		// title: "Company Performance",
		curveType: "function",
		legend: { position: "top", alignment: "center" },
		height: 400,
	};

	var chart = new google.visualization.LineChart(
		document.getElementById("curve_chart")
	);

	chart.draw(data, options);
}

function drawChart2() {
	var data = google.visualization.arrayToDataTable([
		["Year", "Jobs", "Applies"],
		["2014", 1000, 400],
		["2015", 1170, 460],
		["2016", 660, 1120],
		["2017", 1030, 540],
	]);

	var options = {
		// width: 900,
		legend: { position: "top", alignment: "center" },
	};

	var chart = new google.visualization.ColumnChart(
		document.getElementById("columnchart_material")
	);

	chart.draw(data, options);
}
