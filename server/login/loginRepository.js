const pool = require('../connection');
const userContext = {};

userContext.checkLoginDetails = async (req, res) => {
    const email = req;

    try {
        const user = await pool.query(
            'select status, password, type from "UserProfile" where email =' + "'" + email + "'" + ';'
        );
        return (user.rows);
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = userContext;
