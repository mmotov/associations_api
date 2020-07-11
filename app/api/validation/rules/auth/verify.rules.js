const {param} = require('express-validator')

const verifyRules = () => {
    return [
        param('token')
            .isString()
            .exists().withMessage("Token is not provided")
            .notEmpty().withMessage("Token is not provided")
    ]
}

module.exports = verifyRules;