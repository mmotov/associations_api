const router = require('express').Router();
const {matchedData} = require('express-validator');
const validate = require('../validation');
const signUpRules = require('../validation/rules/auth/signUp.rules');

const UserService = require('../../services/user.service');

router.post('/auth/sign-up', [signUpRules(), validate], async (request, response) => {
    const data = matchedData(request);
    let createdUser = await UserService.SignUp(request, data);
    response.json(createdUser);
})

router.post('auth/verify', function (request, response) {
    response.send("Implement Resend Verification router");
})

router.post('auth/resend-verification', function (request, response) {
    response.send("Implement Resend Verification router");
})


router.post('auth/sign-in', function (request, response) {
    response.send("Implement Sign In router");
})



router.post('auth/forgot-password', function (request, response) {
    response.send("Implement Forgot Password router");
})

module.exports = router;