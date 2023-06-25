const emptyDir = require('./emptyS3Service');

const BUCKET_NAME = 'metaversekickoffcosto';
const FOLDER_TO_DELETE = 'presentation';

exports.handler = async (event) => {
    let response;
    try {
        response = emptyDir.emptyS3Directory(BUCKET_NAME, FOLDER_TO_DELETE);
    } catch (err) {
        response = console.error(err.message);
        response.status(500).send("Server Error");
    }
    return response;
};

