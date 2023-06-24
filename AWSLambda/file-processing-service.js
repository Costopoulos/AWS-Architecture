const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const util = require("./util");

const bucketName = 'metaversekickoffcosto';
const s3Subfolder = 'StreamingAssets';

async function process(requestBody) {
    const fileName = requestBody.split('\r\n')[1].split(';')[2].split('=')[1].replace(/^"|"$/g, '').trim();
    let fileContent = '';
    if (fileName.endsWith(".txt")) {
        fileContent = requestBody.split('\r\n')[4].trim();
    } 
    else {
        fileContent = Buffer.from(requestBody, 'base64').toString('ascii');
    }
    console.log('name: ', fileName)
    console.log('content: ', fileContent)
    // fileContent += `\n\nProcess Timestamp: ${new Date().toISOString()}`
    
    const params = {
        Bucket: bucketName,
        Key: `${s3Subfolder}/${fileName}`,
        Body: fileContent
    }
    await s3.putObject(params).promise();
    return util.buildResponse(200, requestBody);
}

module.exports.process = process;