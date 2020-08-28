const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {type: String , required: true , minlength:3},
    isGold: {type:Boolean , default:false},
    phone: {type:Number, required:true , minlength:10}
});

const Customer = mongoose.model('Customer',customerSchema);

function validateDetails(customer){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.number().min(10).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer,schema);
}

module.exports.validateDetails = validateDetails;

module.exports.Customer = Customer;