const fileProcessing = require('./file-processing-service');
const util = require('./util');
const fileUploadPath = '/upload';

exports.handler = async (event) => {
    console.log('Request Event is: ', event);
    let response;
    switch (true) {
        case event.httpMethod === 'POST' && event.path === fileUploadPath:
            response = await fileProcessing.process(event.body);
            break;
        default:
            response = util.buildResponse(404);
    }
    return response;
};
