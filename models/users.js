const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('Joi');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:255,
        minlength:3
    },
    email: {
        type:String,
        required:true,
        maxlength:255,
        unique:true
    },
    password: {
        type:String,
        required:true,
        maxlength:255
    },
    isAdmin: Boolean
}) ;
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ id: this._id, isAdmin: this.isAdmin } , config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User',userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().max(50).required(),
        email:Joi.string().max(255).required().email(),
        password:Joi.string().max(255).min(5).required()
    }
    return Joi.validate(user,schema);
}

module.exports.validateUser = validateUser;
module.exports.User = User;


