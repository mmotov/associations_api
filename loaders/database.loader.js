const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../app/models/user.model');
const Role = require('../app/models/role.model');

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
        // initial();
    }).catch((error) => {
        console.log("Connection error", error)
        process.exit();
    })
}

async function initial() {

    const roles = [
        new Role({name: "admin"}),
        new Role({name: "user"})
    ];

    roles.map(async (role) => {
        try {
            const savedRole = await role.save();
            await new User({
                username: savedRole.name,
                email: savedRole.name + '@mail.com',
                password: bcrypt.hashSync("password"),
                roles: [savedRole]
            }).save();
        } catch (e) {}
    });
}