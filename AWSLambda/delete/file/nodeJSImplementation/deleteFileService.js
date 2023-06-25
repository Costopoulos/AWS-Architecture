const AWS = require('aws-sdk');
const s3 = new AWS.S3();

async function deleteFile(bucket, file) {
    const params = {
        Bucket: bucket,
        Key: file
    };
    
    // Check if file exists
    try {
        await s3.headObject(params).promise();
    } catch (e) {
        if (e.code === 'NotFound') {
            // File not found
            return {
                statusCode: 404,
                body: JSON.stringify({ Message: 'File not found' }),
                
            };
        } 
        else {
            // Other error occurred
            console.error(`Error occurred while checking file existence: ${e}`);
            return {
                statusCode: 500,
                body: JSON.stringify({ Message: 'Error occurred while checking file existence' }),
            };
        }
    }
    
    // File exists, proceed with deletion
    try {
        await s3.deleteObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ Message: 'File deleted successfully' }),
        };
    } catch (e) {
        console.error(`Error deleting file: ${e}`);
        return {
            statusCode: 500,
            body: JSON.stringify({ Message: 'Error deleting file' }),
        };
    }
}

module.exports.deleteFile = deleteFile;
