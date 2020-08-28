const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength:50
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
});

const User = mongoose.model('User',userSchema);
function validateUser(user){
    const schema = {
        name: Joi.string().max(50).required(),
        email: Joi.string().email().required,
        password: Joi.string().min(8).required()
    };
    return Joi.validate(user,schema);
};

module.exports.validateUser = validateUser;
module.exports.User = User;