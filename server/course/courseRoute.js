const express = require('express');
const courseRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

router.get('/getPrograms', async (req, res) => {
  res.send (await courseRepository.getPrograms());
});


module.exports = router;
