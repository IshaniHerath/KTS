const pool = require('../connection');
const userContext = {};

/**
 * saveRegisterDetails - Save User details
 * @returns {array} 0 or 1
 */
userContext.saveRegisterDetails = async (user) => {

    //Student
    if (user.Type === 1) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'insert into "UserProfile" (name, email, type, regnumber, password, status, programid) values ($1 , $2 , $3 , $4 , $5, $6, $7) RETURNING id ;',
                [user.UserName, user.Email, user.Type, user.RegNumber, user.Password, user.StatusId, user.Program]
            );
            console.log("newUser : ", newUser.rows);
            return (newUser.rows);
        } catch (e) {
            console.log(e.message);
        }

    }

    //Lecturer
    if (user.Type === 2) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'insert into "UserProfile" (name, email, type, password, status, programid) values ($1 , $2 , $3 , $4, $5, $6) RETURNING id ;',
                [user.UserName, user.Email, user.Type, user.Password, user.StatusId, user.Program]
            );
            return (newUser.rows);
        } catch (e) {
            console.log(e.message);
        }
    }

    //Other
    if (user.Type === 3) {
        console.log("User : ", user);
        try {
            const newUser = await pool.query(
                'insert into "UserProfile" (name, email, type, password, status) values ($1 , $2 , $3 , $4, $5) RETURNING id ;',
                [user.UserName, user.Email, user.Type, user.Password, user.StatusId]
            );
            return (newUser.rows);
        } catch (e) {
            console.log(e.message);
        }
    }

};

module.exports = userContext;
