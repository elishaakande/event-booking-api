require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const eventRoutes = require("./routes/eventRoutes");
const limiter = require("./middlewares/limiter");
const { requestLogger } = require("./middlewares/logger");

const app = express();

// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const DATABASE = process.env.DB || "Booking";
connectDB(DATABASE_URL, DATABASE);

// Middleware
app.use(express.json());
app.use(require("cors")());
app.use(require("helmet")());
app.use(require("morgan")("dev"));
app.use(limiter);
app.use(requestLogger);

// Routes
app.use("/api/events", eventRoutes);

module.exports = app;
