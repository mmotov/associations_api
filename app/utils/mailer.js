const nodeMailer = require('nodemailer');
const config = require('config');

const mailer = nodeMailer.createTransport({
    host: config.get("mail.host"),
    port: config.get("mail.port"),
    secure: false,
    auth: {
        user: config.get("mail.user"),
        pass: config.get("mail.pass")
    }
});

module.exports = mailer;