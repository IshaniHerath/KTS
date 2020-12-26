const pool = require('../connection');

const ChatData = {};

ChatData.getChatRoomNameByUserId = async(uid)=>{
    try{
        const allChat = await pool.query('Select chat_name from chat INNER JOIN user_course on chat.course_id = user_course.cid where user_course.uid = $1',
        [uid]);
        return allChat.rows;
    }catch(err){
        console.log(err.message);
    }
};

ChatData.createRoom = async(content)=>{
    try {
        const room = await pool.query('INSERT INTO chat (chat_name, course_id) VALUES($1, $2);',
        [content.chat_name,content.cid]);
    } catch (err) {
        console.log(err);
    }
};

ChatData.deleteRoom = async(content) => {
    try {
        const delroom = await pool.query('DELETE FROM chat WHERE chat_name = $1;',
        [content.chat_name]);
        console.log(content.chat_name);
    } catch (err) {
        console.log(err);
    }
};

ChatData.getMessagesByRoomName = async(room_name)=>{
    try {
        const message = await pool.query('SELECT * FROM chatmessage WHERE room_name = $1;',
        [room_name]);
        return message.rows;
    } catch (err) {
        console.log(err);
    }
};

ChatData.addMessage = async(content)=>{
    try {
        const message = await pool.query('insert into chatmessage (c_message, room_name, user_id) values($1, $2 , $3);',
        [content.c_message, content.room_name, content.user_id ]);
    } catch (err) {
        console.log(err);
    }
};

module.exports = ChatData;