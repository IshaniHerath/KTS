const pool = require('../connection');
const userContext = {};

/**
 * getStatuses - Retrieve details of Statuses
 * @returns {array} list of Statuses
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

module.exports = userContext;
