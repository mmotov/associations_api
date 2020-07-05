const fs = require("fs");
const routePath = __dirname + '/routes'

function processRoutePath(route_path, app) {
    fs.readdirSync(route_path).forEach(function(file) {
        const filepath = route_path + '/' + file;
        fs.stat(filepath, function(err,stat) {
            if (stat.isDirectory()) {
                processRoutePath(filepath);
            } else {
                app.use("/api", require(filepath));
            }
        });
    });
}

module.exports = function (app) {
    console.info("Loading routes...");
    processRoutePath(routePath, app);
}