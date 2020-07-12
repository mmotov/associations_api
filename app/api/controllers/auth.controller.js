const {matchedData} = require('express-validator');
const AuthService = require('app/services/auth.service');

exports.SignUp = async (req, res, next) => {
    try {
        const userDto = matchedData(req);
        let createdUser = await AuthService.SignUp(userDto, req.headers.host);
        res.json(createdUser);
    } catch (e) {
        next(e);
    }
}

exports.SignIn = async (req, res, next) => {
    try {
        const userDto = matchedData(req);
        const user = await AuthService.SignIn(userDto);
        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
}

exports.Verify = async (req, res, next) => {
    try {
        await AuthService.Verify(req.params.token);
        res.status(200).json();
    } catch (e) {
        next(e);
    }
}

exports.ResendVerification = async (req, res, next) => {
    try {
        const {email} = matchedData(req);
        await AuthService.ResendVerification(email, req.headers.host);
        res.status(200).json();
    } catch (e) {
        next(e);
    }
}

exports.ForgotPassword = async (req, res, next) => {
    try {
        const {email} = matchedData(req);
        await AuthService.ForgotPassword(email, req.headers.host);
        res.status(200).json();
    } catch (e) {
        next(e);
    }
}

exports.ResetPassword = async (req, res, next) => {
    try {
        const resetPasswordDto = matchedData(req);
        await AuthService.ResetPassword(resetPasswordDto, req.params.token);
        res.status(200).json();
    } catch (e) {
        next(e);
    }
}
