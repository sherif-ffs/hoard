const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// upload file to s3
function uploadFile(file) {
  console.log('file: ', file);
  const fileStream = fs.createReadStream(file);
  console.log('fileStream: ', fileStream);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file
  }

  return s3.upload(uploadParams).promise();
}

// download file from s3
function getFileStream(ImageID) {
  console.log('adsasd ImageID: ', ImageID);
  const key = `./screenshots/${ImageID}.png`;
  console.log('key: ', key);
  console.log('bucketName: ', bucketName);
  const downloadParams = {
    Bucket: bucketName,
    Key: key
  }

  return s3.getObject(downloadParams).createReadStream()
}

exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;