const ApiException = require('./ApiException');

class ForbiddenException extends ApiException {
    constructor(message) {
        super(message, 403);
    }
}

module.exports = ForbiddenException;