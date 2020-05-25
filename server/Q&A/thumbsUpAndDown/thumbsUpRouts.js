const express = require('express');
const Router = express.Router();
const thumbsUpRepository = require('./thumbsUpRepository');

Router.use(express.json());

//get Thumbs Up Count
Router.get('/',async(req,res)=>{
    res.send(await thumbsUpRepository.getThumbsUpData());
});

//add Thumbs Up data 
Router.post('/' , async(req,res)=>{
    await thumbsUpRepository.addThumbsUpData(req.body);
    res.end();
});

module.exports = Router;