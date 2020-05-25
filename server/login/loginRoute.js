const express = require('express');
const loginRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

router.get('/:id', async (req, res) => {
  res.send (await loginRepository.checkLoginDetails(req.params.id));
});

module.exports = router;
