const mailer = require('../../utils/mailer');
const User = require('../../models/user.model');

module.exports = (token, host) => {
    console.info("Sending verification email");
    User.findById(token.userId).then((user) => {
        let mailOptions = {
            from: "dixit-game@mail.com",
            to: user.email,
            subject: "Account confirmation",
            text: "Please verify your account by clicking the link: \n" +
                "http:\/\/" + host + "\/confirmation\/" + token.token + ".\n"
        }
        mailer.sendMail(mailOptions, function (err, info) {
            if (err) {
                return console.error(err)
            }
            console.log(info);
        });
    });

}