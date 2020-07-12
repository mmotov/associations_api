const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    mongoose.connect(`mongodb://` +
        `${config.DB_HOST}:` +
        `${config.DB_PORT}/` +
        `${config.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => {
        console.log("Successfully connected to Database")
    }).catch((error) => {
        console.log("Connection error", error)
        process.exit();
    })
}