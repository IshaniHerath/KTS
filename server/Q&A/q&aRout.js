const express = require('express');
const Router = express.Router();
const postRepository = require('./q&aRepository');

Router.use(express.json());


//get all post data
Router.get('/',async(req,res)=>{
    res.send(await postRepository.getPostData());
});

//add post data 
Router.post('/addpost' , async(req,res)=>{
    await postRepository.addPostData(req.body);
});



module.exports = Router;