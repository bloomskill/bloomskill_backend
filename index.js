const path = require("path");
require("dotenv").config();
const app = require("./app");

const mongoose = require("mongoose");

const { PORT = 3030, DB_HOST } = process.env;
// console.log('DB_HOST:\t', DB_HOST);
// console.log('DB_TEST_HOST:\t', DB_TEST_HOST);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_HOST);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
