const pool = require('../connection');
const userContext = {};

/**
 * saveRegisterDetails - Save User details
 * @returns {array} 0 or 1
 */
userContext.saveRegisterDetails = async (user) => {
    if (user.Type === 1) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'insert into "UserProfile" (name, email, type, regnumber, password, status) values ($1 , $2 , $3 , $4 , $5, $6) RETURNING id ;',
                [user.UserName, user.Email, user.Type, user.RegNumber, user.Password, user.StatusId]
            );
            console.log("newUser : ", newUser.rows);
            return (newUser.rows);
        } catch (e) {
            console.log(e.message);
        }

    }
    if (user.Type === 2 || user.Type === 3) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'insert into "UserProfile" (name, email, type, password, status) values ($1 , $2 , $3 , $5, $6) RETURNING id ;',
                [user.UserName, user.Email, user.Type, user.Password, user.Status]
            );
            return (newUser.rows);
        } catch (e) {
            console.log(e.message);
        }
    }
};

module.exports = userContext;
