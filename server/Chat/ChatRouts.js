const express = require('express');
const chatRouter = express.Router();
const ChatRepository = require('./ChatRepository');

chatRouter.get('/:uid', async(req,res) => {
    res.send(await ChatRepository.getChatRoomNameByUserId(req.params.uid));
});
chatRouter.post('/',async(req,res) => {
    await ChatRepository.createRoom(req.body);
    res.end();
});

chatRouter.delete('/:chat_id',async(req,res) => {
    await ChatRepository.deleteRoom(req.body);
    res.end();
});

chatRouter.get('/messages/:room_name', async(req,res) => {
    console.log(req.params.room_name);
    res.send(await ChatRepository.getMessagesByRoomName(req.params.room_name));
});

chatRouter.post('/messages',async(req,res) => {
    await ChatRepository.addMessage(req.body);
    res.end();
});


module.exports = chatRouter;