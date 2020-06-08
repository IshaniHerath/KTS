const express = require('express');
const courseRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

router.get('/getPrograms', async (req, res) => {
  res.send (await courseRepository.getPrograms());
});

//TODO
router.get('/getCoursesByProgram', async (req, res) => {
  var pid = 10;
  console.log('req.body : ' , req.body)
  res.send(await courseRepository.getCoursesByProgram(pid));
});

router.put('/updateUserCourseStatus', async (req, res) => {
  console.log(" req body : >>> ", req.body);
  res.send(await courseRepository.updateUserCourseStatus(req.body))
});

module.exports = router;
