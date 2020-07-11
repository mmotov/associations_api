const event = require('../utils/eventEmitter');
const sendEmailVerification = require('./listeners/sendEmailVerification')

console.info("Subscribing to events...");

event.addListener('send-verification', sendEmailVerification);