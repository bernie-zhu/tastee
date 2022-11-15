var mongoose = require('mongoose');
const Joi = require("joi");

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
}

const User = mongoose.model('User', UserSchema);
module.exports = {User, validate};