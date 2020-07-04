const express = require('express');
const router = express.Router();

router.get('/second', function (request, response) {
    response.send('Second GET');
})

router.post('/second', function (request, response) {
    response.send('Second POST');
})

module.exports = router;