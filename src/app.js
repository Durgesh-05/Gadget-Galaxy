import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

export { app };
