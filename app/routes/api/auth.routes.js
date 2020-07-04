const express = require('express');
const router = express.Router();

router.post('/sign-up', function (request, response) {
    response.send("Implement Sign Up router");
})

router.post('/sign-in', function (request, response) {
    response.send("Implement Sign In router");
})

router.post('/resend-verification', function (request, response) {
    response.send("Implement Resend Verification router");
})

router.post('/forgot-password', function (request, response) {
    response.send("Implement Forgot Password router");
})





