// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

// // create a stream for the file
// const fileStream = fs.createReadStream(filePath);

// // set the S3 object params
// const params = {
//   Bucket: 'my-bucket-name',
//   Key: 'path/to/new/file',
//   Body: fileStream
// };

// // upload the file to S3
// const uploadResponse = await s3.upload(params).promise();

// // save the S3 object ID to the student's resource list
// const student = await Student.findById(studentId);
// student.resources.push({
//   type: 'video',
//   title: 'My video',
//   description: 'This is a video I uploaded',
//   url: uploadResponse.Location // save the S3 object URL
// });
// await student.save();
