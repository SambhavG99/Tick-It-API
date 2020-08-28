const mongoose =require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer: {
    type: new mongoose.Schema({
            name: {
                type:String,
                maxlength:255,
                minlength:3,
                required:true
            },
            isGold: {
                type:Boolean,
                required:true
            },
            phone: {
                type:Number,
                required:true,
                maxlength:10,
                minlength:0
            },
        }),
    required:true
    },
    movie:{
        type: new mongoose.Schema({
            title: {
                type:String,
                maxlength:255,
                minlength:0,
                required:true
            },
            dailyRentalRate: {
                type: Number,
                minlength:0,
                maxlength:255,
                required:true
            }
        }),
        required:true
    },
    dateOut:{
        type:Date,
        default:Date.now,
        required:true
    },
    dateReturned: {
        type:Date
    },
    rentalFee: {
        type:Number,
        minlength:0
    }

});

const Rental = mongoose.model('Rental',rentalSchema);

function validateRental(rental){
    const schema = {
        movieId: Joi.objectId().max(255).required(),
        customerId: Joi.objectId().max(255).required()
    }
    return Joi.validate(rental,schema);
}

module.exports.Rental = Rental ;
module.exports.validateRental = validateRental;