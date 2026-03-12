const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth.routers");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials: true,
}));

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

app.listen(PORT,()=> console.log("Server is listening on port",PORT));
mongoose
    .connect(MONGODB_URI)
    .then(()=> console.log("Successfully Connected to DB"))
    .catch((err) => console.log("Failed to connect to DB",err.message));