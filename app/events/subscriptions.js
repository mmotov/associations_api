const event = require('../utils/eventEmitter');
const sendEmailVerification = require('./listeners/sendEmailVerification')

console.info("Subscribing to events...");

event.addListener('user-registered', sendEmailVerification);