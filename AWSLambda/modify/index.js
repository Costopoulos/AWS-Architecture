const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = 'metaversekickoffcosto';
const SUBFOLDER = 'StreamingAssets';

exports.handler = async (event) => {
    const FOLDER_TO_MODIFY_FROM = event.pathParameters.folder;
    let FILE_TO_MODIFY = event.pathParameters.file;
    FILE_TO_MODIFY = `${SUBFOLDER}/${FOLDER_TO_MODIFY_FROM}/${FILE_TO_MODIFY}`;
    
    console.log("event ", event);
    const fileName = event.body.split('\r\n')[1].split(';')[1].split('=')[1].replace(/^"|"$/g, '').trim();
    let binary64Part = '';
    let fileContent = '';
    if (fileName.endsWith(".txt")) {
        fileContent = event.body.split('\r\n')[4].trim();
    }
    else {
        binary64Part = event.body.split('\r\n')[3];
        console.log('binary64Part: ', binary64Part);
        fileContent = Buffer.from(binary64Part, 'base64');
    }
    console.log('name: ', fileName)
    console.log('content: ', fileContent)
    // fileContent += `\n\nProcess Timestamp: ${new Date().toISOString()}`
    
    const params = {
        Bucket: BUCKET_NAME,
        Key: FILE_TO_MODIFY,
        Body: fileContent,
        ContentEncoding: 'base64'
    }
    const response = await s3.putObject(params).promise();
    return response;
};
