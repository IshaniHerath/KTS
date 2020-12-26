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

module.exports = QAndARouter;
