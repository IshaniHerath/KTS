const express = require('express');
const adminRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

router.get('/getPendingUserDetails', async (req, res) => {
    res.send(await adminRepository.getPendingUserDetails());
});

router.get('/getPendingCourseDetails', async (req, res) => {
    res.send(await adminRepository.getPendingCourseDetails(res, res))
});

router.put('/updateUserStatus', async (req, res) => {
    res.send(await adminRepository.updateUserStatus(req.body));
});

router.put('/updateCourseStatus', async (req, res) => {
    res.send(await adminRepository.updateCourseStatus(req.body))
});

module.exports = router;
