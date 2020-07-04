const express = require('express');
const router = express.Router();

router.get('/first', function (request, response) {
    response.send('First GET');
})

router.post('/first', function (request, response) {
    response.send('First POST');
})

module.exports = router;