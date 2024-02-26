import {
  getCourseQuery,
  findCourseByField,
} from "../services/course.service.js";
import { asyncMW } from "../utils/async-middleware.js";

export const getCourses = asyncMW(async (req, res) => {
  const query = getCourseQuery(req.query);
  const courses = await findCourseByField(query);
  res.status(200).json({ courses });
});
