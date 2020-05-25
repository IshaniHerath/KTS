const pool = require('../../connection');

const likeData = {};

//get like count
likeData.getLikeData = async()=>{
    try{
        const allLikes = await pool.query('SELECT COUNT(*) FROM likes;');
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