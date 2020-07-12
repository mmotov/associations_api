const config = require('config');
const jwt = require("jsonwebtoken");

const User = require('app/models/user.model');
const Role = require('app/models/role.model');
const EmailVerificationToken = require('app/models/emailVerificationToken.model');

const event = require('app/utils/eventEmitter');

const NotFoundException = require('app/exceptions/NotFoundException');
const ConflictException = require('app/exceptions/ConflictException');
const ForbiddenException = require('app/exceptions/ForbiddenException');

const EmailVerificationTokenService = require('app/services/emailVerificationToken.service');

const AuthService = {
    SignUp: async (userDto, host) => {

        if (await User.findOne({email: userDto.email})) {
            throw new ConflictException("User with such email is already exists");
        }
        if (await User.findOne({username: userDto.username})) {
            throw new ConflictException("User with such username is already exists");
        }

        userDto.roles = [];
        userDto.roles.push(await Role.findOne({name: "user"}));

        const user = await User.create(userDto);
        let token = await EmailVerificationTokenService.CreateNewToken(user);
        event.emit('send-verification', token, host);
        return user;
    },

    Verify: async (tokenStr) => {
        let token = await EmailVerificationToken.findOne({token: tokenStr})
            .orFail(new NotFoundException("Invalid token"));

        await User.findById(token.userId).then(user => {
            if (user.isVerified)
                throw new ConflictException("Account is already verified");
            user.isVerified = true;
            user.save();
        });

    },

    ResendVerification: async (email, host) => {
        let user = await User.findOne({email: email}).orFail(new NotFoundException("User with such email not found"));
        if (user.isVerified)
            throw new ConflictException("Account is already verified");

        let token = await EmailVerificationTokenService.CreateNewToken(user);
        event.emit('send-verification', token, host);
    },

    SignIn: async (userDto) => {
        let user = await User.findOne({email: userDto.email}).orFail(new NotFoundException("User with such email not found"));
        user.comparePassword(userDto.password, (error, match) => {
            if (!match) {throw new ForbiddenException("Wrong credentials");}
        });

        const token = jwt.sign(user.toJSON(), config.jwtSecret, { expiresIn: '1d' });
        return {user: user, jwt: token};
    }
}

module.exports = AuthService;