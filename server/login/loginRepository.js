const pool = require('../connection');
const userContext = {};

userContext.checkLoginDetails = async (req, res) => {
    try {
        const user = await pool.query(
            'select id, status, password, type from "UserProfile" where email =' + "'" + req + "'" + ';'
        );
        return (user.rows);
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = userContext;
