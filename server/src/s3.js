const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY
  // AWS_BUCKET_REGION="us-east-1"
  // AWS_ACCESS_KEY="AKIA5UN37WEG3H2EGG7V"
  // AWE_SECRET_KEY="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"

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

exports.uploadFile = uploadFile;

// download file from s3