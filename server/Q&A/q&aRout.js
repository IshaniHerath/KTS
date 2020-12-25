const express = require('express');
const QAndARouter = express.Router();
const postRepository = require('./q&aRepository');

QAndARouter.get('/', async(req,res) => {
    res.send(await postRepository.getPostData());
});
QAndARouter.post('/',async(req,res) => {
    await postRepository.addPostData(req.body);
    res.end();
});
QAndARouter.delete('/:post_id',async(req,res) => {
    res.send(await postRepository.deletePostData(req.params.post_id));
});

QAndARouter.get('/img', async(req,res) => {
    res.sendFile('F:\\0001\\DOCS\\Campus\\4th year\\EEY6A89-Group Project\\Implementation\\FYP\\KTS\\server\\fileUpload\\files\\mathu_matta.pdf');
});

module.exports = QAndARouter;
