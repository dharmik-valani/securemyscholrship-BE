import { db } from "../config/dbConfig.js";

export const findCourseByField = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const getCourseQuery = (queryReq) => {
  const { name, level, country } = queryReq;
  let query =
    "SELECT DISTINCT Course.*, University.*, EducationLevel.*, Country.* FROM Course";

  query +=
    " LEFT JOIN University ON Course.university_id = University.university_id";
  query +=
    " LEFT JOIN EducationLevel ON Course.level_id = EducationLevel.level_id";
  query += " LEFT JOIN Country ON University.country_id = Country.country_id";

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
    query += " WHERE " + conditions.join(" AND ");
  }

  return query;
};
