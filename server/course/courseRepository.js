const pool = require('../connection');
const courseContext = {};

courseContext.getPrograms = async () => {
    try {
        const allPrograms = await pool.query(
            'select id, name from "Program";'
        );
        return (allPrograms.rows);
        // res.send (allUser.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.getCoursesByProgram = async (req, res) => {
    try {
        const allPrograms = await pool.query(
            'select id, name from "Course" where program =' + (req.params.id) + ';'
        );
        return (allPrograms.rows);
    } catch (e) {
        console.log(e.message);
    }
};

//TODO
courseContext.getCourseDetails = async (req, res) => {
    try {
        const allCourseDetails = await pool.query(
            'select name, code, description from "Course" where id =' + (req.params.id) + ';'
        );
        return (allCourseDetails.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.getAnnouncementDetails = async (req, res) => {
    try {
        const announcement = await pool.query(
            'select a.id, a.title, a.description, a.datetime, u.name from "Announcement" as a inner JOIN "UserProfile" as u on a.owner = u.id where courseid =' + (req.params.id) +  'ORDER BY a.datetime DESC;');
        return (announcement.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.getDaySchoolDetails  = async (req, res) => {
    try {
        const daySchools = await pool.query(
            'select a.id, a.title, a.posteddate, u.name, a.date, a.fromtime, a.totime, a.courseid from "Dayschool" as a  inner JOIN "UserProfile" as u on a.owner = u.id  where courseid ='+ (req.params.id) + 'ORDER BY a.posteddate DESC;');
        return (daySchools.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.getAssignmentQuestionList = async (req, res) => {
    try {
        const Assignment = await pool.query(
            'select a.id, a.title, a.posteddate, a.duedatetime, a.issubmitted, u.name, f."OriginalName" from "Assignment" as a \n' +
            'inner JOIN "UserProfile" as u on a.owner = u.id \n' +
            'inner JOIN "FileUpload" as f on a."fileId" = f.id \n' +
            'where a.courseid =' + (req.params.id) + ' and a."isAnswer" = FALSE;');
        return (Assignment.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.getAssignmentAnswerList = async (req, res) => {
    try {
        const Assignment = await pool.query(
            'select a.id, a.owner, a.title, a.posteddate, a.issubmitted, u.name, a."QuestionId", f."OriginalName" \n' +
            'from "AssignmentAnswer" as a \n' +
            'inner JOIN "UserProfile" as u on a.owner = u.id \n' +
            'inner JOIN "FileUpload" as f on a."fileId" = f.id\n' +
            'inner JOIN "Assignment" as b on a."QuestionId" = b.id\n' +
            'where a.courseid =' + (req.params.cid) + ';');
        return (Assignment.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.getMarkList = async (req, res) => {
    try {
        const Marks = await pool.query(
            'select m.id, m.title, m.posteddate, f."OriginalName" from "Mark" as m \n' +
            'inner JOIN "FileUpload" as f on m."fileId" = f.id \n' +
            'where m.courseid =' + (req.params.id) + ';');
        return (Marks.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.deleteAnnouncement = async (req, res) => {
    try {
        const Announcement = await pool.query(
        'DELETE FROM "Announcement" WHERE id = $1;',[req]);
        return (Assignment.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.deleteDaySchool  = async (req, res) => {
    try {
        const DaySchool = await pool.query(
            'DELETE FROM "Dayschool" WHERE id = $1;',[req]);
        return (DaySchool.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.deleteAssignmentQuestion  = async (req, res) => {
    try {
        const AssignmentQuestion = await pool.query(
            'DELETE FROM "Assignment" WHERE id = $1;',[req]);
        return (AssignmentQuestion.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.deleteAssignmentAnswer  = async (req, res) => {
    try {
        const AssignmentAnswer = await pool.query(
        'DELETE FROM "AssignmentAnswer" WHERE id = $1;',[req]);
        return (AssignmentAnswer.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.deleteMark  = async (req, res) => {
    try {
        const Mark = await pool.query(
            'DELETE FROM "Mark" WHERE id = $1;',[req]);
        return (Mark.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.postAnnouncement =async (req, res) => {
    try {
        const announcement = await pool.query(
            'insert into "Announcement" (title, description, courseid, datetime, owner) values ($1, $2, $3, $4, $5)',
            [req.title, req.announcement, req.courseId, req.dateTime, req.owner]
        );
        return (announcement.rows);
    }catch (e) {
        console.log(e.message)
    }
};

courseContext.postAssignment = async (req, res) => {
    try {
        const assignment = await pool.query(
            'insert into "Assignment" (title, posteddate, courseid, duedatetime, owner, "isAnswer", "fileId", issubmitted) values ($1, $2, $3, $4, $5, $6, $7, $8)',
            [req.assTitle, req.postedDate, req.courseId, req.dueDateTime, req.owner, req.isAnswer, req.fileId, req.isSubmitted]
        );
        return (assignment.rows);
    }catch (e) {
        console.log(e.message)
    }
};

courseContext.postAssignmentAnswer = async (req, res) => {
    try {
        const assignmentAnswers = await pool.query(
            'insert into "AssignmentAnswer" (title, posteddate, courseid, "fileId", "owner", "QuestionId", issubmitted) values ($1, $2, $3, $4, $5, $6, $7)',
            [req.assAnsTitle, req.postedDate, req.courseId, req.fileId, req.owner, req.questionId,  req.isSubmitted]
        );
        return (assignmentAnswers.rows);
    }catch (e) {
        console.log(e.message)
    }
};


courseContext.postMark = async (req, res) => {
    try {
        const Marks = await pool.query(
            'insert into "Mark" (title, posteddate, courseid, "owner", "fileId") values ($1, $2, $3, $4, $5)',
            [req.markTitle, req.postedDate, req.courseId, req.owner, req.fileId]
        );
        return (Marks.rows);
    }catch (e) {
        console.log(e.message)
    }
};


courseContext.postDayschool = async (req, res) => {
    try {
        const daySchool = await pool.query(
            'insert into "Dayschool" (title, posteddate, owner, date, fromtime, totime, courseid) ' +
            'values ($1, $2, $3, $4, $5, $6, $7)',
            [req.title, req.postedDate, req.owner, req.dsDate, req.fromTime, req.toTime, req.courseId]
        );
    return (daySchool.rows);
    }
    catch (e) {
        console.log(e.message);
    }

};

courseContext.updateUserCourseStatus = async (req, res) => {
    try {
        const allPrograms = await pool.query(
            'insert into "user_course" ("cid", "uid", "status") values ($1, $2, $3)',
            [req.CourseId, req.UserId, req.CourseStatus]
        );
        return (allPrograms.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.getAllCoursesByUserId = async (req, res) => {
    try {
        const courses = await pool.query('SELECT "Course".id, "Course".name, "Course".code FROM "Course" INNER JOIN user_course ON "Course".id = user_course.cid WHERE user_course.uid = $1;',
        [req.params.uid]);
        return courses.rows;
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = courseContext;
