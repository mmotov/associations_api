const fs = require("fs");
const routePath = __dirname + '/routes'
const ApiException = require('app/exceptions/ApiException');


function processRoutePath(route_path, app) {
    fs.readdirSync(route_path).forEach(function(file) {
        const filepath = route_path + '/' + file;
        fs.stat(filepath, function(err,stat) {
            if (stat.isDirectory()) {
                processRoutePath(filepath);
            } else {
                require(filepath)(app);
                app.use(errorHandler);
            }
        });
    });
}

function errorHandler(err, req, res, next) {
    if (err instanceof ApiException) {
        res.status(err.httpStatus).json({"error": err.message});
    } else {
        res.status(500).json({message: err.message, stack: err.stack});
    }
}

module.exports = function (app) {
    console.info("Loading routes...");
    processRoutePath(routePath, app);
}