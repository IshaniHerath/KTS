const pool = require('../../connection');
const thumbsDownData = {};

//get Thumbs Down Count
thumbsDownData.getThumbsDownData = async()=>{
    try{
        const thumbsDown = await pool.query('SELECT COUNT(*) from thumbs_down;');
        return thumbsDown.rows;
    }catch(err){
        console.log(err.message);
    }
};



//add thumbsDown Data
thumbsDownData.addThumbsDownData = async(content )=>{
    try {
        content.user_id = 1;
        const thumbsDown = await pool.query('Insert INTO thumbs_down(user_id) VALUES($1);',
        [content.user_id]);
    } catch (err) {
        console.log(err);
    }
};

module.exports = thumbsDownData;