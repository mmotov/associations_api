const {matchedData} = require('express-validator');
const AuthService = require('app/services/auth.service');
const UserService = require("app/services/auth.service");

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
        const user = await UserService.SignIn(userDto);
        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
}

exports.Verify = async (req, res, next) => {
    try {
        await UserService.Verify(req.params.token);
        res.status(200).json();
    } catch (e) {
        next(e);
    }
}

exports.ResendVerification = async (req, res, next) => {
    try {
        const {email} = matchedData(req);
        await UserService.ResendVerification(email, req.headers.host);
        res.status(200).json();
    } catch (e) {
        next(e);
    }
}
