const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = 'metaversekickoffcosto';
const SUBFOLDER = 'StreamingAssets';

exports.handler = async (event) => {
    const FOLDER_TO_DELETE_FROM = event.pathParameters.folder;
    let FILE_TO_DELETE = event.pathParameters.file;
    FILE_TO_DELETE = `${SUBFOLDER}/${FOLDER_TO_DELETE_FROM}/${FILE_TO_DELETE}`;
    
    const fileName = event.body.split('\r\n')[1].split(';')[2].split('=')[1].replace(/^"|"$/g, '').trim();
    let fileContent = '';
    if (fileName.endsWith(".txt")) {
        fileContent = event.body.split('\r\n')[4].trim();
    } 
    
    // Set the parameters for the S3 API call
    const params = {
      Bucket: BUCKET_NAME,
      Key: FILE_TO_DELETE,
      Body: fileContent,
    };
    console.log(fileContent);
    
    const response = await s3.putObject(params).promise();
    return response;
};
