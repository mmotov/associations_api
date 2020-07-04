const fs = require("fs");
const routePath = __dirname + '/api/'

module.exports = function (app) {
    fs.readdirSync(routePath).forEach(function (file) {
        const route = './api/' + file;
        app.use("/", require(route));
    })
}