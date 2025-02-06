const mongoose = require("mongoose");

const connectDB = async (DATABASE_URL, DATABASE) => {
  try {
    const DB_OPTIONS = {
      dbName: DATABASE,
    };

    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
