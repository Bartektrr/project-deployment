var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
// Or
/* GET pictures listing. */
router.get('/', async function(req, res, next) {
  // pictures = s3.listObjectsV2(params, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });
  // const pictures = fs.readdirSync(path.join(__dirname, '../pictures/'));
  const pictures = []
  res.render('pictures', { pictures: pictures});
});

router.get('/:pictureName', function(req, res, next) {
  res.render('pictureDetails', { picture: req.params.pictureName});
});

router.post('/', async function(req, res, next) {  
  const file = req.files.file;
  console.log(req.files);
  await s3.putObject({
    Body: file.data,
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: "public/" + file.name,
  }).promise()
  res.end();
});

module.exports = router;
