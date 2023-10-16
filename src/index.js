const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const port = process.env.PORT || 3000;

const route = require("./routes");
const db = require("./config/db");

const dotenv = require("dotenv");
// Secret
dotenv.config();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Start by creating some disk storage options:
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, path.join(__dirname, "public/img"));
	},
	// Sets file(s) to be saved in uploads folder in same directory
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	},
	// Sets saved filename(s) to be original filename(s)
});

// Set saved storage options:
const upload = multer({ storage: storage });

//connect to db
db.connect();

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
app.use(
	cors({
		origin: "*",
	})
);
app.use(function (req, res, next) {
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
			compare: (a, b) => a.toString() === b.toString(),
			toString: (a) => a.toString(),
		},
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(upload.array("files"));

// Route
route(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
