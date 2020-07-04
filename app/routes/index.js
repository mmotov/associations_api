const express = require('express');
const app = express();
const fs = require("fs");
const routePath = __dirname + '/api'

processRoutePath(routePath);

function processRoutePath(route_path) {
    fs.readdirSync(route_path).forEach(function(file) {
        const filepath = route_path + '/' + file;
        fs.stat(filepath, function(err,stat) {
            if (stat.isDirectory()) {
                processRoutePath(filepath);
            } else {
                console.info('Loading route: ' + filepath);
                app.use("/api", require(filepath));
            }
        });
    });
}