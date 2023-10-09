const path = require("path");
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const cors = require("cors");

const route = require("./routes");
const db = require("./config/db");

const dotenv = require("dotenv");
// Secret
dotenv.config();

//connect to db
db.connect();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../node_modules/moment/min")));
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// CORS
app.use("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

//http logger
app.use(morgan("combined"));

//Templates engine
app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		helpers: {
			sum: (...a) => [...a].reduce((total, num) => total + (+num || 0)),
			dateFormat: (a) => moment(a).format("DD/MM/YYYY"),
		},
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Route
route(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
