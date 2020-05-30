const express = require('express');
const Router = express.Router();
const likeRout = require('./likeRepository');

Router.use(express.json());

//Add like count
Router.post('/' , async(req,res)=>{
    await likeRout.addLikeData(req.body);
    res.end();
});

Router.get('/:post_id',async(req,res) => {
    res.send(await likeRout.getLikeData(req.params.post_id));
});

module.exports = Router;