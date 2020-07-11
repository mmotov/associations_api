const User = require('../models/user.model');
const Role = require('../models/role.model');
const EmailVerificationToken = require('../models/emailVerificationToken.model');
const event = require('../utils/eventEmitter');
const NotFoundException = require('../exceptions/NotFoundException');
const ConflictException = require('../exceptions/ConflictException');
const EmailVerificationTokenService = require('./emailVerificationToken.service');

const UserService = {
    SignUp: async (userDto, host) => {
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
    }


}

module.exports = UserService;