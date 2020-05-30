const pool = require('../connection');

const postData = {};

//get all post Data
postData.getPostData = async()=>{
    try{
        const allusers = await pool.query('SELECT post_id, post_content, user_name FROM posts INNER JOIN users ON posts.user_id = users.user_id ORDER BY post_id DESC;');
        return allusers.rows;
    }catch(err){
        console.log(err.message);
    }
};

//add post data
postData.addPostData = async(content )=>{
    try {
        const post = await pool.query('insert into posts (post_content,user_id) values($1,$2)',
        [content.post_content,content.user_id]);
    } catch (err) {
        console.log(err);
    }
};

postData.deletePostData = async(post_id)=>{
    try{
        const dLike = await pool.query('DELETE FROM likes WHERE post_id = $1;',[post_id]);
        const dTuAndTd = await pool.query('DELETE FROM thumbs_up_down WHERE post_id = $1;',[post_id]);
        const dReplies = await pool.query('DELETE FROM replies WHERE post_id = $1;',[post_id]);
        const dPost = await pool.query('DELETE FROM posts WHERE post_id = $1;',[post_id]);
    }catch(err){
        console.log(err.message);
    }
};

module.exports = postData;