const crypto = require('crypto');
const mailer = require('../../utils/mailer');
const EmailVerificationToken = require('../../models/email_verification_token.model');

module.exports = (request, user) => {
    console.info("Sending verification email");
    const token = EmailVerificationToken({
        userId: user,
        token: crypto.randomBytes(16).toString('hex')
    });
    token.save(function (err) {

        let mailOptions = {
            from: "dixit-game@mail.com",
            to: 'motov.maxim@gmail.com',
            subject: "Account confirmation",
            text: "Please verify your account by clicking the link: \n" +
                "http:\/\/" + request.headers.host + "\/confirmation\/" + token.token + ".\n"
        }
        mailer.sendMail(mailOptions, function (err, info) {
            if (err) {
                return console.error(err)
            }
            console.log(info);
        });
    })
}