const express = require('express');
const groupRouter = express.Router();
const groupRepository = require('./groupRepository');

groupRouter.get('/', async(req,res) => {
    res.send(await groupRepository.getGroupData());
});

groupRouter.get('/:uid',async(req,res) => {
    res.send(await groupRepository.getGroupDataById(req.params.uid));
});

groupRouter.post('/',async(req,res) => {
    await groupRepository.addGroupData(req.body);
    res.end();
});
groupRouter.delete('/:id',async(req,res) => {
    await groupRepository.deleteGroupData(req.params.id);
    res.end();
});

module.exports = groupRouter;