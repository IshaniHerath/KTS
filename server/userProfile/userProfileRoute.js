const express = require('express');
const userRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

router.get('/', async (req, res) => {
  // res.send ("hello");
  res.send (await userRepository.getCourses());
  // return userRepository.getCourses(req, res);
});

router.get('/getDepartments', async (req, res) => {
  res.send (await userRepository.getDepartments());
});

router.get('/getTypes', async (req, res) => {
  res.send (await userRepository.getTypes());
});

router.post('/', async (req, res) => {
  res.send (await userRepository.saveUserDetails(req.body));
  // res.end();
});

module.exports = router;
