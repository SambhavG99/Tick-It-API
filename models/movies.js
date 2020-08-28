const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genres');

const movieSchema = new mongoose.Schema({
    title: { type: String , required:true},
    genre: {type: genreSchema , required: true },
    numberInStock: {type: Number , required: true},
    dailyRentalRate: {type: Number , required: true} 
});

const Movie = mongoose.model('Movie' , movieSchema);

function validateMovie(movie){
    const schema = {
        title: Joi.string().max(255).required(),
        genreId: Joi.objectId().max(255).required(),
        numberInStock: Joi.number().min(0).max(10000).required(),
        dailyRentalRate: Joi.number().min(0).required()        
    };

    return Joi.validate(movie,schema);
}

module.exports.validateMovie = validateMovie;
module.exports.Movie = Movie;