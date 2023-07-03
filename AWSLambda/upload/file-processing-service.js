const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const util = require("./util");

const bucketName = 'metaversekickoffcosto';
const s3Subfolder = 'StreamingAssets';

async function process(requestBody) {
    const fileName = requestBody.split('\r\n')[1].split(';')[1].split('=')[1].replace(/^"|"$/g, '').trim();
    let binary64Part = '';
    let fileContent = '';
    if (fileName.endsWith(".txt")) {
        fileContent = requestBody.split('\r\n')[4].trim();
    }
    else {
        binary64Part = requestBody.split('\r\n')[3];
        console.log('binary64Part: ', binary64Part);
        fileContent = Buffer.from(binary64Part, 'base64');
    }
    console.log('name: ', fileName)
    console.log('content: ', fileContent)
    // fileContent += `\n\nProcess Timestamp: ${new Date().toISOString()}`
    
    const params = {
        Bucket: bucketName,
        Key: `${s3Subfolder}/${fileName}`,
        Body: fileContent,
        ContentEncoding: 'base64'
    }
    await s3.putObject(params).promise();
    return util.buildResponse(200, requestBody);
}

module.exports.process = process;