const express = require('express');
const groupPostRouter = express.Router();
const groupPostRepository = require('./groupPostRepository');

groupPostRouter.get('/:gid', async(req,res) => {
    res.send(await groupPostRepository.getGroupPostData(req.params.gid));
});

groupPostRouter.post('/',async(req,res) => {
    await groupPostRepository.addGroupPostData(req.body);
    res.end();
});


module.exports = groupPostRouter;