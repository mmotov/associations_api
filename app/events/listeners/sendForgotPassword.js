const mailer = require('app/utils/mailer');
const User = require('app/models/user.model');

module.exports = (token, host) => {
    User.findById(token.userId).then((user) => {
        let mailOptions = {
            from: "dixit-game@mail.com",
            to: user.email,
            subject: "Password reset",
            text: "Follow this link to reset your password: \n" +
                "http:\/\/" + host + "\/reset-password\/" + token.token + ".\n"
        }
        mailer.sendMail(mailOptions, function (err, info) {
            if (err) {
                return console.error(err)
            }
            console.log(info);
        });
    });

}