const path = require("path");
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const route = require("./routes");
const db = require("./config/db");

// Secret
dotenv.config();

//connect to db
db.connect();

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());
app.use(cookieParser());

//http logger
app.use(morgan("combined"));

//Templates engine
app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		helpers: {
			sum: (...a) => [...a].reduce((total, num) => total + (+num || 0)),
		},
	})
);

app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "views"));

// Route
route(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
