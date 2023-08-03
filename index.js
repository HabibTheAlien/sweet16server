const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6010;

//MONGODB CONNECTION
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB successfully connected !!!"))
	.catch((err) => {
		console.log(err);
	});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

//HOME PAGE RESPONSE
app.get("/", (req, res) => {
	res.send(
		"<div><h1 >Hello world</h1><h2>Hello I am Sweet 16th app server </h2></div>"
	);
});

//CLIENT SIDE ERROR
app.use((req, res) => {
	res.send("<h1>404 Page Not Found</h1>");
});

//CREATING THE BACKEND SERVER
app.listen(PORT, () => {
	console.log(
		`Backend server is successfully running at http://localhost:${PORT}`
	);
});
