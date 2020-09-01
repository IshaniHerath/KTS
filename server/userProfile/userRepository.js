const pool = require('../connection');
const userContext = {};

userContext.getUserDetails = async  (req, res) => {
    try{
        const allUserDetails = await pool.query(
            'select u.name as username, u.email, u.regnumber, p.id as programid, p.name as progname, t.typeid, t.name as typename\n' +
            'from "UserProfile" as u \n' +
            'inner join "Program" as p on u.programid = p.id\n' +
            'INNER join "UserType" as t on u.type = t.typeid\n' +
            ' where u.id=' + (req.params.id) + ';'
        );
        return (allUserDetails.rows);
    } catch (e) {
        console.log("Error", e);
    }
};

userContext.getCourses = async (req, res) => {
    try {
        const allCourses = await pool.query(
            'select c.id, c.name , c.code from "Course" as c INNER JOIN "user_course" as t on c.id = t.cid where t.uid =' + (req.params.id) + 'and t.status = 2'+';'
        );
        return (allCourses.rows);
    } catch (e) {
        console.log(e.message);
    }
};

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

userContext.saveUserDetails = async (user) => {
    if (user.Type === 1) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'Update "UserProfile" set name = ($1), email = ($2), type = ($3), regnumber = ($4), programid = ($5) where id = ' + (user.UserId)+ ';',
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
                'Update "UserProfile" set name = ($1), email = ($2), type = ($3), programid = ($4), departmentid = ($5) where id = ' + (user.UserId)+ ';',
                [user.UserName, user.Email, user.Type, user.ProgramId, user.DepartmentId]
            );
            console.log("newUser : ", newUser.rows);
            return (newUser.rows);
        } catch (e) {
            console.log(e.message);
        }
    }
    if (user.Type === 3) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'Update "UserProfile" set name = ($1), email = ($2), type = ($3) where id = ' +  (user.UserId)+ ';',
                [user.UserName, user.Email, user.Type]
            );
            console.log("newUser : ", newUser.rows);
            return (newUser.rows);
        } catch (e) {
            console.log(e.message);
        }
    }
};

userContext.getAssignments = async  (req, res) => {
    try{
        const assignments = await pool.query(
            'select title, duedatetime from "Assignment" as a inner join "user_course" as m on a.courseid = m.cid ' +
            ' where m.uid=' + (req.params.id) + ';'
        );
        return (assignments.rows);
    } catch (e) {
        console.log("Error", e);
    }
};

module.exports = userContext;
