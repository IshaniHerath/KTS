const express = require('express');
const Router = express.Router();
const likeRout = require('./likeRepository');

Router.use(express.json());

//get like count
Router.get('/',async(req,res)=>{
    res.send(await likeRout.getLikeData());
});

//Add like count
Router.post('/' , async(req,res)=>{
    await likeRout.addLikeData(req.body);
    res.end();
});

module.exports = Router;