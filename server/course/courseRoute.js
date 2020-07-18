const express = require('express');
const courseRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

router.get('/getPrograms', async (req, res) => {
  res.send (await courseRepository.getPrograms());
});

router.get('/getCoursesByProgram/:id', async (req, res) => {
  res.send(await courseRepository.getCoursesByProgram(req, res));
});

router.get('/getCourseDetails/:id', async (req, res) => {
  res.send(await courseRepository.getCourseDetails(req, res));
});

router.get('/getAnnouncementDetails/:id', async (req, res) => {
  res.send(await courseRepository.getAnnouncementDetails(req, res));
});

router.post('/createDayschool', async (req, res) => {
  console.log("aaaaaaaaaaaaaaaaaa", req.body);
  res.send(await courseRepository.postDayschool(req.body))
});

router.post('/postAnnouncement', async (req, res) => {
  console.log("req.data : " ,req.body)
  res.send(await courseRepository.postAnnouncement(req.body))
});

router.post('/updateUserCourseStatus', async (req, res) => {
  res.send(await courseRepository.updateUserCourseStatus(req.body))
});

module.exports = router;
