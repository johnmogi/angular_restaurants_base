function sendError(response, err) {
    if(config.production) {
        response.status(500).send("Some error occurred, please try again later.");
    }
    else {
        response.status(500).send(err.message);
    }
}

module.exports = sendError;
