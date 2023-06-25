function buildResponse(statusCode, body) {
    return {
        status: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

module.exports.buildResponse = buildResponse;