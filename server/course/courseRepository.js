const pool = require('../connection');
const courseContext = {};

/**
 * getPrograms - Retrieve all programs
 * @returns {array} list of Courses
 */
courseContext.getPrograms = async () => {
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

courseContext.getCoursesByProgram = async (req, res) => {
    try {
        const allPrograms = await pool.query(
            'select id, name from "Course" where program =' + (req) + ';'
        );
        return (allPrograms.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.updateUserCourseStatus = async (req, res) => {
    try {
        const allPrograms = await pool.query(
            'insert into "user_course" ("cid", "uid", "status") values ($1, $2, $3)',
            [req.CourseId, req.UserId, req.CourseStatus]
        );
        return (allPrograms.rows);
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = courseContext;
