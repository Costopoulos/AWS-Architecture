const fileDeletion = require('./deleteFileService');

const BUCKET_NAME = 'metaversekickoffcosto';
const SUBFOLDER = 'StreamingAssets';

exports.handler = async (event) => {
    const FOLDER_TO_DELETE_FROM = event.pathParameters.folder;
    let FILE_TO_DELETE = event.pathParameters.file;
    FILE_TO_DELETE = `${SUBFOLDER}/${FOLDER_TO_DELETE_FROM}/${FILE_TO_DELETE}`;
    
    const response = fileDeletion.deleteFile(BUCKET_NAME, FILE_TO_DELETE);
    return response;
};
