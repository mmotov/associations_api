const controller = require('app/api/controllers/auth.controller');
const validate = require("app/api/validation/auth");
const notAuthenticated = require('app/middlewares/notAuthenticated');

module.exports = function (app) {
    app.route('/auth/sign-up').post([notAuthenticated, validate.signUp], controller.SignUp);
    app.route('/auth/sign-in').post([notAuthenticated, validate.signIn], controller.SignIn);
    app.route('/auth/verify/:token').post([notAuthenticated, validate.verify], controller.Verify);
    app.route('/auth/resend-verification').post([notAuthenticated, validate.resendVerification], controller.ResendVerification);
    app.route('/auth/forgot-password').post([notAuthenticated, validate.forgotPassword], controller.ForgotPassword);
    app.route('/auth/reset-password/:token').post([notAuthenticated, validate.resetPassword], controller.ResetPassword);
}