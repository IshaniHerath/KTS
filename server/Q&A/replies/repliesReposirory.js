const pool = require('../../connection');

const replayData = {};

//get all replies Data
replayData.getReplaytData = async()=>{
    try{
        const allReplies = await pool.query('SELECT * FROM replies;');
        return allReplies.rows;
    }catch(err){
        console.log(err.message);
    }
};

//get one replay data
replayData.getOneReplaytData = async(post_id)=>{
    try{
        const oneReplies = await pool.query('SELECT * FROM replies where post_id = $1;',
        [post_id]);
        return oneReplies.rows;
    }catch(err){
        console.log(err.message);
    }
};


//add replies data
replayData.addReplayData = async(content )=>{
    try {
        const replay = await pool.query('insert into replies(replay_content , user_id , post_id) values($1 , $2 , $3);',
        [content.replay_content, content.user_id, content.post_id]);
    } catch (err) {
        console.log(err);
    }
};

module.exports = replayData;