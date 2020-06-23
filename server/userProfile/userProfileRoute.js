const express = require('express');
const userRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

router.get('/:id', async (req, res) => {
  res.send (await userRepository.getUserDetails(req, res));
});

router.get('/:id/courseList/', async (req, res) => {
  res.send (await userRepository.getCourses(req, res));
});

router.get('/:id/getDepartments', async (req, res) => {
  res.send (await userRepository.getDepartments());
});

router.get('/:id/getUserTypes', async (req, res) => {
  res.send (await userRepository.getUserTypes());
});

router.put('/:id', async (req, res) => {
  res.send (await userRepository.saveUserDetails(req.body));
});

module.exports = router;
