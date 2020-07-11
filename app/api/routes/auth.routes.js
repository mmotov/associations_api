const router = require('express').Router();
const {matchedData} = require('express-validator');

const validate = require('../validation');
const signUpRules = require('../validation/rules/auth/signUp.rules');
const verifyRules = require('../validation/rules/auth/verify.rules');
const resendVerificationRules = require('../validation/rules/auth/resendVerification.rules');

const ApiException = require('../../exceptions/ApiException');

const UserService = require('../../services/user.service');

router.post('/auth/sign-up',
    [signUpRules(), validate],
    async (request, response) => {
        const userDto = matchedData(request);
        let createdUser = await UserService.SignUp(userDto, request.headers.host);
        response.json(createdUser);
    })

router.post('/auth/verify/:token',
    [verifyRules(), validate],
    async (request, response, next) => {
        try {
            await UserService.Verify(request.params.token);
            response.status(200).json();
        } catch (e) {
            next(e);
        }
    })

router.post('/auth/resend-verification',
    [resendVerificationRules(), validate],
    async (request, response) => {
        try {
            const {email} = matchedData(request);
            await UserService.ResendVerification(email, request.headers.host);
            response.status(200).json();
        } catch (e) {
            if (e instanceof ApiException) {
                response.status(e.httpStatus).json(e.message);
            }
        }
    })


router.post('/auth/sign-in', function (request, response) {
    response.send("Implement Sign In router");
})


router.post('/auth/forgot-password', function (request, response) {
    response.send("Implement Forgot Password router");
})

module.exports = router;