const moment = require('moment');
const crypto = require('crypto');

const EmailVerificationToken = require('app/models/emailVerificationToken.model');
const ConflictException = require('app/exceptions/ConflictException');

const EmailVerificationTokenService = {
    CreateNewToken: async (user) => {
        let token = await EmailVerificationToken.findOne({userId: user.id});
        if (token) {
            let diff = moment().diff(moment(token.createdAt), 'minutes');
            if (diff < 15) {
                throw new ConflictException("Last token issued less than 15 minutes ago");
            }
        }
        await EmailVerificationToken.deleteMany({userId: user.id});
        return await EmailVerificationToken.create({
            userId: user,
            token: crypto.randomBytes(16).toString('hex')
        });
    }
}

module.exports = EmailVerificationTokenService;