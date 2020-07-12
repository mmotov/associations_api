const {body, param} = require('express-validator')

const validate = require('app/api/validation/validate');
const passwordMatch = require('app/api/validation/validators/passwordMatch');

exports.signUp = [
    body('username').isString().notEmpty().withMessage('Required field').trim(),
    body('email').isEmail(),
    body('password').isLength({min: 5}).withMessage('Min length: 5').custom(passwordMatch),
    validate
]

exports.signIn = [
    body("email").exists().isEmail(),
    body("password").exists().isString(),
    validate
]

exports.verify = [
    param('token')
        .exists().withMessage("Token is not provided")
        .isString().notEmpty().withMessage("Token is not provided"),
    validate
]

exports.resendVerification = [
    body('email').exists().isEmail(),
    validate
]

exports.forgotPassword = [
    body('email').exists().isEmail(),
    validate
]

exports.resetPassword = [
    param('token').exists().isString().notEmpty(),
    body('password').isLength({min: 5}).withMessage('Min length: 5').custom(passwordMatch),
    validate
]

