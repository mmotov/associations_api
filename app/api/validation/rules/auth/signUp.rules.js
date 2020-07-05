const {body} = require('express-validator')
const User = require('../../../../models/user.model');
const passwordMatch = require('../../validators/passwordMatch');

const signUpRules = () => {
    return [
        body('username')
            .isString()
            .notEmpty().withMessage('Required field')
            .custom(usernameNotInUse)
            .trim(),

        body('email').isEmail().custom(emailNotInUse),

        body('password')
            .isLength({min: 5}).withMessage('Min length: 5')
            .custom(passwordMatch),
    ]
}

const emailNotInUse = async (value) => {
    await User.findOne({email: value}).then(user => {
        if (user) {
            return Promise.reject('Such email is already in use');
        }
    });
}

const usernameNotInUse = async (value) => {
    await User.findOne({username: value}).then(user => {
        if (user) {
            return Promise.reject('Username is already in taken');
        }
    });
}



module.exports = signUpRules;