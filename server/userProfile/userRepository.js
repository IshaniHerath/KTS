const pool = require('../connection');
const userContext = {};

/**
 * getCourses - Retrieve some details of Course by user ID
 * @returns {array} list of Courses
 */
userContext.getCourses = async (req, res) => {
    try {
        const allUser = await pool.query(
            'select c.name , c.code from "Course" as c INNER JOIN "user_course" as t on c.id = t.cid where t.uid =' + (req.params.id) + 'and t.status = 2'+';'
        );
        return (allUser.rows);
    } catch (e) {
        console.log(e.message);
    }
};

/**
 * getPrograms - Retrieve all programs
 * @returns {array} list of Courses
 */
userContext.getDepartments = async () => {
    try {
        const allDepartments = await pool.query(
            'select id, name from "Department";'
        );
        return (allDepartments.rows);
    } catch (e) {
        console.log(e.message);
    }
};

userContext.getUserTypes = async () => {
    try {
        const allUserTypes = await pool.query(
            'select typeid, name from "UserType";'
        );
        return (allUserTypes.rows);
    } catch (e) {
        console.log("ERROR!!", e.message);
    }
};

/**
 * saveUserDetails - Save User details
 * @returns {array} 0 or 1
 */
userContext.saveUserDetails = async (user) => {
    if (user.Type === 1) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'insert into "UserProfile" (name, email, type, regnumber, programid) values ($1 , $2 , $3 , $4 , $5) RETURNING id ;',
                [user.UserName, user.Email, user.Type, user.regNumber, user.ProgramId]
            );
            console.log("newUser : ", newUser.rows);
            return (newUser.rows);
        } catch (e) {
            console.log(e.message);
        }

    }
    if (user.Type === 2) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'insert into "UserProfile" (name, email, type, programid , departmentid) values ($1 , $2 , $3 , $4 , $5) RETURNING id ;',
                [user.UserName, user.Email, user.Type, user.ProgramId, user.DepartmentId]
            );
        } catch (e) {
            console.log(e.message);
        }
    }
    if (user.Type === 3) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'insert into "UserProfile" (name, email, type) values ($1 , $2 , $3) RETURNING id ;',
                [user.UserName, user.Email, user.Type]
            );
        } catch (e) {
            console.log(e.message);
        }
    }
};

module.exports = userContext;
