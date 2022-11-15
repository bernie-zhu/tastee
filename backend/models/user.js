var mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign( {_id: this._id }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
    return token;
}

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
}

const User = mongoose.model('User', UserSchema);
module.exports = {User, validate};