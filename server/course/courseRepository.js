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
            'select a.title, a.description, a.datetime, u.name from "Announcement" as a inner JOIN "UserProfile" as u on a.owner = u.id where courseid =' + (req.params.id) +  'ORDER BY a.datetime DESC;');
        return (announcement.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.getDaySchoolDetails  = async (req, res) => {
    try {
        const daySchools = await pool.query(
            'select a.title, a.posteddate, u.name, a.date, a.fromtime, a.totime, a.courseid from "Dayschool" as a  inner JOIN "UserProfile" as u on a.owner = u.id  where courseid ='+ (req.params.id) + 'ORDER BY a.posteddate DESC;');
        return (daySchools.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.getAssignmentQuestionList = async (req, res) => {
    try {
        const Assignment = await pool.query(
            'select a.title, a.posteddate, a.duedatetime, a.issubmitted, u.name from "Assignment" as a inner JOIN "UserProfile" as u on a.owner = u.id where courseid =' + (req.params.id) +  'and "isAnswer" = FALSE;');
        return (Assignment.rows);
    } catch (e) {
        console.log(e.message);
    }
};

//TODO in FE
courseContext.getAssignmentAnswerList = async (req, res) => {
    try {
        const Assignment = await pool.query(
            'select a.title, a.posteddate, a.duedatetime, a.issubmitted, u.name from "Assignment" as a inner JOIN "UserProfile" as u on a.owner = u.id where courseid =' + (req.params.id) +  'and "isAnswer" = TRUE;');
        return (Assignment.rows);
    } catch (e) {
        console.log(e.message);
    }
};

courseContext.postAnnouncement =async (req, res) => {
    console.log("req.param >>>> ", req);
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

courseContext.postAssignment =async (req, res) => {
    try {
        const assignment = await pool.query(
            'insert into "Assignment" (title, posteddate, courseid, duedatetime, owner) values ($1, $2, $3, $4, $5)',
            [req.assTitle, req.postedDate, req.courseId, req.dueDateTime, req.owner]
        );
        return (assignment.rows);
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
