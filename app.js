import express from "express";
import path from "path";

import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";

import usersRouter from "./routes/users.js";
import itemsRouter from "./routes/items.js";
import listingsRouter from "./routes/listings.js";

const app = express();
import fileupload from "express-fileupload";
app.use(fileupload({ useTempFiles: true }));

import multer from "multer";
app.use(logger("dev"));
app.use(multer());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
	res.render("iGive api homepage");
});

app.use("/api/users", usersRouter);
app.use("/api/items", itemsRouter);
app.use("/api/listings", listingsRouter);

app.use(function (req, res, next) {
	res
		.status(404)
		.json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).json(err);
});

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, console.log(`Server running on port ${PORT}`));

export default app;
