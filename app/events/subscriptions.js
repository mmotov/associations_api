const event = require('app/utils/eventEmitter');
const sendEmailVerification = require('app/events/listeners/sendEmailVerification')

console.info("Subscribing to events...");

event.addListener('send-verification', sendEmailVerification);