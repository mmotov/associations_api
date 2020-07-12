const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required:true,
            unique: true
        },
        email: {
            type: String,
            required:true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    },
    {
        timestamps: {}
    }
);

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    } else {
        user.password = bcrypt.hashSync(user.password);
        next();
    }
})

UserSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};


const User = mongoose.model("User", UserSchema);

module.exports = User;