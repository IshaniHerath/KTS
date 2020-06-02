const pool = require('../connection');
const userContext = {};

userContext.getPendingUserDetails = async () => {
    try {
        const allUser = await pool.query(
            'select p.id, p.name, p.email, p.regnumber, t.name as typename, s.statusname from "UserProfile" as p INNER JOIN "UserType" as t on p.type = t.typeid INNER JOIN "Status" as s on p.status = s.id where p.status = 1;'
        );
        return (allUser.rows);
    } catch (e) {
        console.log(e.message);
    }
};

userContext.updateStatus = async (req, res) => {
    var userId = parseInt(req.UserId);
    var newStatusId = parseInt(req.NewStatusId);

    try {
        const allUser = await pool.query(
            // 'update "UserProfile" set status = 2 where id = ($1) RETURNING id ;',[user.UserId]
            'update "UserProfile" set status =' + (newStatusId) + 'where id =' + (userId) + 'RETURNING id;'
        );
        return (allUser.rows);
    } catch (e) {
        console.log(e.message);
    }
};


//TODO getPendingCourseDetails

module.exports = userContext;
