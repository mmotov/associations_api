const User = require('../models/user.model');
const Role = require('../models/role.model');
const event = require('../utils/eventEmitter');

UserService = {
    SignUp: async (request, userDto) => {
        userDto.roles = [];
        userDto.roles.push(await Role.findOne({name: "user"}));
        const user = await User.create(userDto);
        event.emit('user-registered', request, user);
        return user;
    }
}

module.exports = UserService;