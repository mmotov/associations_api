const db = require('../models')
const bcrypt = require('bcryptjs');
const User = db.user;
const Role = db.role;

module.exports = function () {
    db.mongoose.connect(`mongodb://` +
        `${process.env.DB_HOST}:` +
        `${process.env.DB_PORT}/` +
        `${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => {
        console.log("Successfully connected to Database")
        initial();
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