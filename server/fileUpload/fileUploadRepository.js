const pool = require('../connection');
const fileUploadContext = {};

fileUploadContext.postFileUpload =async (req, res) => {
    try {
        const fileUpload = await pool.query(
            'insert into "FileUpload" ("FileName","OriginalName", "UpdatedDate", "UserId", "Path", "courseid", "title") values ($1, $2, $3, $4, $5 ,$6, $7) RETURNING id',
            [req.fileName, req.originalName, req.postedDate, req.userID, req.path, req.courseId, req.title]
        );
        return (fileUpload.rows);
    }catch (e) {
        console.log(e.message)
    }
};

//TODO - getFileName

module.exports = fileUploadContext;
