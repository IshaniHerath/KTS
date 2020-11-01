const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const pool = require('../connection');
const fileUploadRepository = require('./.').repo;

router.use(fileUpload());

router.post('/upload', async (req, res) => {
    console.log("File 22222222222222222222")
    res.send (await fileUploadRepository.uploadFiles(req.body));
    // res.end();
});

module.exports = router;
