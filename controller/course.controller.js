import { db } from "../config/dbConfig.js";

export const getCourses = async (req, res) => {
  try {
    const { name, level, country } = req.query;
    let sql = "SELECT DISTINCT Course.* FROM Course";

    sql +=
      " LEFT JOIN University ON Course.university_id = University.university_id";
    sql +=
      " LEFT JOIN EducationLevel ON Course.level_id = EducationLevel.level_id";

    const conditions = [];

    if (name) {
      conditions.push(
        `(University.university_name LIKE '%${name}%' OR Course.course_name LIKE '%${name}%')`
      );
    }
    if (level) {
      conditions.push(`EducationLevel.level_name = '${level}'`);
    }
    if (country) {
      conditions.push(
        `University.country_id IN (SELECT country_id FROM Country WHERE country_name = '${country}')`
      );
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
