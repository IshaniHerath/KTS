const pool = require('../connection');
const adminContext = {};

adminContext.getPendingUserDetails = async () => {
    try {
        const allUser = await pool.query(
            'select p.id, p.name, p.email, p.regnumber, t.name as typename, s.statusname from "UserProfile" as p INNER JOIN "UserType" as t on p.type = t.typeid INNER JOIN "Status" as s on p.status = s.id where p.status = 1;'
        );
        return (allUser.rows);
    } catch (e) {
        console.log(e.message);
    }
};

adminContext.getPendingCourseDetails = async (req, res) => {
    try {
        const allCourseRequest = await pool.query(
            'select u.name as username, u.regnumber, p.name as programname, m.cid, m.uid, c.name as courseName, c.code\n' +
            '            from "UserProfile" as u inner \n' +
            '            JOIN "user_course" as m on u.id = m.uid \n' +
            '            inner join "Course" as c on c.id = m.cid \n' +
            '            inner join "Program" As p on p.id = u.programid\n' +
            '            where  m.status = 1\n' +
            '             and u.type != 3; '
        );
        return (allCourseRequest.rows);
    } catch (e) {
        console.log(e.message);
    }
};

adminContext.updateUserStatus = async (req, res) => {
    var userId = parseInt(req.UserId);
    var newStatusId = parseInt(req.NewStatusId);

    try {
        const allUser = await pool.query(
            'update "UserProfile" set status =' + (newStatusId) + 'where id =' + (userId) + 'RETURNING id;'
        );
        return (allUser.rows);
    } catch (e) {
        console.log(e.message);
    }
};

adminContext.updateCourseStatus = async (req, res) => {
    try {
        const updateStatus = await pool.query(
            'update "user_course" set status =' + (req.NewStatusId) + 'where uid = ' + (req.uId) + 'and cid =' + (req.cId) + ';'
        );
        console.log("updateStatus.rows : ", updateStatus.rows)
        return (updateStatus.rows);
    } catch (e) {
        console.log(e);
    }
};

module.exports = adminContext;
