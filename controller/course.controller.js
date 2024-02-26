import { courseQuery, findCourseByField } from "../services/course.service.js";

export const getCourses = async (req, res) => {
  try {
    const query = courseQuery(req.query);
    const courses = await findCourseByField(query);
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
