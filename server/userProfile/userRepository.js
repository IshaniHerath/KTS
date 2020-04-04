const pool = require('../connection');
const userContext = {};

/**
 * getCourses - Retrieve some details of Course
 * @returns {array} list of Courses
 */
userContext.getCourses = async (req, res) => {
  try{
    const allUser = await pool.query(
        'select c.name from "course" as c INNER JOIN "user_course" as t on c.id = t."cid" where t.uid = 1;'
    );
    res.send (allUser.rows);
  }catch(e){
    console.log(e.message);
  }
};

/**
 * saveUserDetails - Save User details
 * @returns {array} 0 or 1
 */
userContext.saveUserDetails = async (req, res) => {
  try{
    const allUser = await pool.query(
        'select c.name from "course" as c INNER JOIN "user_course" as t on c.id = t."cid" where t.uid = 1;'
    );
    res.send (allUser.rows);
  }catch(e){
    console.log(e.message);
  }
};

module.exports = userContext;
