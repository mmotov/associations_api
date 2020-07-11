const ApiException = require('./ApiException');

class NotFoundException extends ApiException {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = NotFoundException;