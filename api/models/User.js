const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        min: 6,
        max: 255,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error : 'Invalid email adress'})
            }
        }
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 255
    },
    img_url: {
        type: String,
        require: false,
        min: 6,
        max: 255
    },
    tokens : [{
        token: [{
            type: String,
            require: true
        }]
    }]
}, {
    timestamps: true,
    collection: 'users'
});

// middleware function for encrypting password
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
});

// generates a json web token
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// finds user with given email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;