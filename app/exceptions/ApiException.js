class ApiException extends Error {

    constructor(message, status) {
        super(message);
        this.httpStatus = status
    }
}

module.exports = ApiException;