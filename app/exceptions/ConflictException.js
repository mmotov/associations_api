const ApiException = require('./ApiException');

class ConflictException extends ApiException {
    constructor(message) {
        super(message, 409);
    }
}

module.exports = ConflictException;