const pool = require('../connection');
const fileUploadContext = {};

fileUploadContext.uploadFiles = async (file) => {
console.log("File 333333333333333333");
    try {
        // const newUser = await pool.query(
        // );
        // console.log("newUser : ", newUser.rows);
        // return (newUser.rows);
    } catch (e) {
        // console.log(e.message);
    }
};

module.exports = fileUploadContext;
