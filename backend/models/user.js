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
    },
    height: {
        type: Number,
        default: 1
    },
    weight: {
        type: Number,
        default: 1
    },
    age: {
        type: Number,
        default: 1
    },
    gender: {
        type: String,
        default: "male"
    }
})

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign( {_id: this._id }, process.env.TOKEN_SECRET);
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

const validateAll = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
        height: Joi.number().integer().min(0).max(200).required().label("Height"),
        weight: Joi.number().integer().min(0).max(1000).required().label("Weight"),
        age: Joi.number().integer().min(0).max(150).required().label("Age"),
        gender: Joi.string().required().label("Gender"),
    });
    return schema.validate(data);
}

const User = mongoose.model('User', UserSchema);
module.exports = {User, validate, validateAll};