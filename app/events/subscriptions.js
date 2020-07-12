const event = require('app/utils/eventEmitter');
const sendEmailVerification = require('app/events/listeners/sendEmailVerification')
const sendForgotPassword = require('app/events/listeners/sendForgotPassword')

console.info("Subscribing to events...");

event.addListener('send-verification', sendEmailVerification);

event.addListener('forgot-password', sendForgotPassword);