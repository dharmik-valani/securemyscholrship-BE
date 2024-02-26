import { Router } from "express";
import { getCourses } from "../controller/course.controller.js";
export const courseRouter = Router();

courseRouter.get("/", getCourses);
