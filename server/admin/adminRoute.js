const express = require('express');
const adminRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

router.get('/getPendingUserDetails', async (req, res) => {
  res.send (await adminRepository.getPendingUserDetails());
});

router.put('/updateStatus', async (req, res) => {
  res.send (await adminRepository.updateStatus(req.body));
});

//TODO getPendingCourseDetails

module.exports = router;
