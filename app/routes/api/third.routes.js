const express = require('express');
const router = express.Router();

testMiddlewareFail = (request, response, next) => {
    if (1 + 1 === 3) {
        next()
    } else {
        response.status(500).send();
    }
}

// this is an example of how to use middleware in routes
router.get('/third', [testMiddlewareFail], function (request, response) {
    response.send('First GET');
})

module.exports = router;