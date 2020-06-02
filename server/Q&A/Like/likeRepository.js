const pool = require('../../connection');

const likeData = {};

//get like count
likeData.getLikeData = async(post_id)=>{
    try{
        const allLikes = await pool.query('SELECT COUNT(*) FROM likes where post_id = $1;',
        [post_id]);
        console.log(allLikes.rows);
        return allLikes.rows;
        
    }catch(err){
        console.log(err.message);
    }
};

//Add like count
likeData.addLikeData = async(content )=>{
    try {
        //content.user_id = 1;
        const like = await pool.query('INSERT INTO likes (user_id,post_id,post_user) values($1,$2,$3);',
        [content.user_id , content.post_id , content.post_user]);
    } catch (err) {
        console.log(err);
    }
};

module.exports = likeData;