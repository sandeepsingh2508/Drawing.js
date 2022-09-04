const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{ type: String },
    phone: {
        type: String,
        validate: [
            validator.isMobilePhone,
            'Please provide a valid phone number',
        ],
    },
    email: { 
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    password: { 
        type: String,
        minLength: 6,
        maxLength: 15
    }
},
{ timestamps: true });

const Users = mongoose.model("Users", userSchema);

module.exports = Users;