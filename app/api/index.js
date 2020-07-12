const fs = require("fs");
const routePath = __dirname + '/routes'
const ApiException = require('../exceptions/ApiException');

function processRoutePath(route_path, app) {
    fs.readdirSync(route_path).forEach(function(file) {
        const filepath = route_path + '/' + file;
        fs.stat(filepath, function(err,stat) {
            if (stat.isDirectory()) {
                processRoutePath(filepath);
            } else {
                app.use("/api", require(filepath));
                app.use(errorHandler);
            }
        });
    });
}

function errorHandler(err, req, res, next) {
    if (err instanceof ApiException) {
        res.status(err.httpStatus).json({"error": err.message});
    } else {
        res.status(500).json(err);
    }
}

module.exports = function (app) {
    console.info("Loading routes...");
    processRoutePath(routePath, app);
}