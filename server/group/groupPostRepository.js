const pool = require('../connection');

const groupPostData = {};

groupPostData.getGroupPostData = async(gid) => {
    try {
        const allGroupPosts = await pool.query('SELECT * FROM posts WHERE group_id = $1 ORDER BY post_id DESC',[gid]);
        return allGroupPosts.rows;
    } catch (error) {
        console.log(error.message);
    }
}

groupPostData.addGroupPostData = async(content )=>{
    try {
         const post = await pool.query('insert into posts(post_content,user_id,group_id) values($1, $2, $3);',
         [content.post_content, content.user_id, content.group_id]);
        
    } catch (err) {
        console.log(err);
    }
};

module.exports = groupPostData;