const moment = require('moment');
const crypto = require('crypto');

const PasswordResetToken = require('app/models/passwordResetToken.model');
const ConflictException = require('app/exceptions/ConflictException');

const PasswordResetTokenService = {
    CreateNewToken: async (user) => {
        let token = await PasswordResetToken.findOne({userId: user.id});
        if (token) {
            let diff = moment().diff(moment(token.createdAt), 'minutes');
            if (diff < 15) {
                throw new ConflictException("Last token issued less than 15 minutes ago");
            }
        }
        await PasswordResetToken.deleteMany({userId: user.id});
        return await PasswordResetToken.create({
            userId: user,
            token: crypto.randomBytes(16).toString('hex')
        });
    }
};

module.exports = PasswordResetTokenService;