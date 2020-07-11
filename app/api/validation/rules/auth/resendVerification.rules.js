const {body} = require('express-validator')

const resendVerificationRules = () => {
    console.log("VALIDATION");
    return [
        body('email').exists().isEmail()
    ];
}

module.exports = resendVerificationRules