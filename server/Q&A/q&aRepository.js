const pool = require('../connection');

const postData = {};

//get all post Data
postData.getPostData = async()=>{
    try{
        const allusers = await pool.query('SELECT * FROM posts;');
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

module.exports = postData;