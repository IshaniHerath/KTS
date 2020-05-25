const express = require('express');
const repliesRouter = express.Router();
const repliesRepository = require('./repliesReposirory');

repliesRouter.get('/',async(req,res,next) => {
    res.send(await repliesRepository.getReplaytData());
});
repliesRouter.post('/',async(req,res,next) => {
    await repliesRepository.addReplayData(req.body);
    res.end();
});


repliesRouter.get('/:post_id',async(req,res,next) => {
    res.send(await repliesRepository.getOneReplaytData(req.params.post_id));
});

module.exports = repliesRouter;