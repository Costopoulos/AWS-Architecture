const emptyDir = require('./emptyS3Service');

const BUCKET_NAME = 'metaversekickoffcosto';
const SUBFOLDER = 'StreamingAssets';

exports.handler = async (event) => {
    let FOLDER_TO_DELETE = event.pathParameters.folder;
    FOLDER_TO_DELETE = `${SUBFOLDER}/${FOLDER_TO_DELETE}`;
    let response = {};
    try {
        response = emptyDir.emptyS3Directory(BUCKET_NAME, FOLDER_TO_DELETE);
    } catch (err) {
        response = console.error(err.message);
    }
    return response;
};
