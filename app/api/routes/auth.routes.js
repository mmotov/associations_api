const controller = require('app/api/controllers/auth.controller');
const validate = require("app/api/validation/auth");

module.exports = function (app) {
    app.route('/auth/sign-up').post(validate.signUp, controller.SignUp);
    app.route('/auth/sign-in').post(validate.signIn, controller.SignIn);
    app.route('/auth/verify/:token').post(validate.verify, controller.Verify);
    app.route('/auth/resend-verification').post(validate.resendVerification, controller.ResendVerification);
}