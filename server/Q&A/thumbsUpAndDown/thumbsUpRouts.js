const express = require('express');
const Router = express.Router();
const thumbsUpRepository = require('./thumbsUpRepository');

Router.use(express.json());

//get Thumbs Up Count
Router.get('/up/:post_id',async(req,res)=>{
    res.send(await thumbsUpRepository.getThumbsUpData(req.params.post_id));

});

Router.get('/down/:post_id',async(req,res)=>{
    res.send(await thumbsUpRepository.getThumbsDownData(req.params.post_id));

});

//add Thumbs Up data 
Router.post('/' , async(req,res)=>{
    await thumbsUpRepository.addThumbsUpData(req.body);
    res.end();
});

module.exports = Router;