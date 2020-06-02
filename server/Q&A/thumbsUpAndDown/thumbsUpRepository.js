const pool = require('../../connection');

const thumbsUpData = {};

//get Thumbs Up Count
thumbsUpData.getThumbsUpData = async(post_id)=>{
    try{
        const thumbsUp = await pool.query("select count(*) from thumbs_up_down where thumbs='1' and post_id = $1; ",
        [post_id]);
        return thumbsUp.rows;
    }catch(err){
        console.log(err.message);
    }
};

thumbsUpData.getThumbsDownData = async(post_id)=>{
    try{
        const thumbsUp = await pool.query("select count(*) from thumbs_up_down where thumbs='0' and post_id = $1; " ,
        [post_id]);
        return thumbsUp.rows;
    }catch(err){
        console.log(err.message);
    }
};

//add thumbsUp Data
thumbsUpData.addThumbsUpData = async(content )=>{
    try {
        const thumbsUp = await pool.query('INSERT INTO thumbs_up_down (user_id,post_id,post_user,thumbs) values($1,$2,$3,$4)',
        [content.user_id , content.post_id , content.post_user , content.thumbs]);
    } catch (err) {
        console.log(err);
    }
};
module.exports = thumbsUpData;