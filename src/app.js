import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/api/v1/user", userRoute);

export { app };
