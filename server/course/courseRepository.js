const pool = require('../connection');
const userContext = {};

/**
 * getPrograms - Retrieve all programs
 * @returns {array} list of Courses
 */
userContext.getPrograms = async () => {
    try {
        const allPrograms = await pool.query(
            'select id, name from "Program";'
        );
        return (allPrograms.rows);
        // res.send (allUser.rows);
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = userContext;
