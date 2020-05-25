const express = require('express');
const Router = express.Router();
const thumbsDownRepository = require('./thumbsDownRepository');

Router.use(express.json());

//get Thumbs Down Count
Router.get('/',async(req,res)=>{
    res.send(await thumbsDownRepository.getThumbsDownData());
});


//add Thumbs Down data 
Router.post('/' , async(req,res)=>{
    await thumbsDownRepository.addThumbsDownData(req.body);
    res.end();
});

module.exports = Router;
