const express = require('express');
const router = express.Router();
const fileupload = require('express-fileupload');
const fileUploadRepository = require('./fileUploadRepository');

router.use(fileupload());

router.post('/fileupload', async (req, res, next) => {
    const file = req.files.tma;

    file.mv('F:\\0001\\DOCS\\Campus\\4th year\\EEY6A89-Group Project\\Implementation\\FYP\\KTS\\server\\fileUpload\\files\\'+ file.name, function(err,result){
        if(err){
            throw err;
        }
        res.send({
            success: true,
            message: 'File Uploaded'
        })
    });
});

router.post('/fileUploadToDB', async (req, res) => {
    res.send(await fileUploadRepository.postFileUpload(req.body))
});

router.get('/getAttachementByName/:name', async(req,res) => {
    var fileName = req.params.name;
    res.sendFile('F:\\0001\\DOCS\\Campus\\4th year\\EEY6A89-Group Project\\Implementation\\FYP\\KTS\\server\\fileUpload\\files\\' + fileName);
});

module.exports = router;
