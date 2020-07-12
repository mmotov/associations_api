const ForbiddenException = require('app/exceptions/ForbiddenException');

const notAuthenticated = (req, res, next) => {
    const header = req.header('authorization');
    if (!header) {
        next();
    } else {
        throw new ForbiddenException("Already authenticated");
    }
}

module.exports = notAuthenticated;