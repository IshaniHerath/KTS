const express = require('express');
const registerRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

router.post('/', async (req, res) => {
  res.send (await registerRepository.saveRegisterDetails(req.body));
  // res.end();
});

module.exports = router;
