import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from 'cors';
import { db } from "./config/dbConfig.js";
import { courseRouter } from "./router/course.router.js";

dotenv.config();
db;

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use("/api/courses", courseRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
