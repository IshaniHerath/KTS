const pool = require('../connection');

const groupData = {};

groupData.getGroupData = async() => {
    try {
        const allGroups = await pool.query('SELECT * FROM "Groups"');
        return allGroups.rows;
    } catch (error) {
        console.log(error.message);
    }
}

groupData.getGroupDataById = async(uid)=>{
    try{
        const groupDataById = await pool.query('SELECT "Groups".id,"Groups".name FROM "Groups" INNER JOIN user_course on "Groups".courseid = user_course.cid where user_course.uid = $1;',
        [uid]);
        return groupDataById.rows;
        
    }catch(err){
        console.log(err.message);
    }
};

groupData.addGroupData = async(content)=>{
    try {
        const group = await pool.query('insert into "Groups"(name, owner, courseid) values($1,$2,$3);',
        [content.name,content.owner,content.courseid]);
    } catch (error) {
        console.log(error);
    }
};

groupData.deleteGroupData = async(id)=>{
    try{
        console.log(id);
        const dGroup = await pool.query('DELETE FROM "Groups" WHERE id = $1;',[id]);
    }catch(err){
        console.log(err.message);
    }
};

module.exports = groupData;