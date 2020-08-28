const express = require('express');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movies');
const {Rental,validateRental} = require('../models/rental');
const mongoose = require('mongoose');
const Fawn = require('fawn');

const router = express.Router();

Fawn.init(mongoose);

router.post('/' , async (req,res) => {
        const {error} = validateRental(req.body);
        if(error) return res.send(error.details[0].message);

        let customer = await Customer.findById(req.body.customerId);
        if(!customer) return res.status(404).send('Invalid customer ID');

        let movie = await Movie.findById(req.body.movieId);
        if(!movie) return res.status(404).send('Invalid Movie ID');
        
        if(movie.numberInStock <= 0) return res.status(400).send(`${movie.title} is out of stock`);    
        
        const rental = new Rental({
            customer: {
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone    
            },
            movie: {
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });    

        // let result = await rental.save();
        // movie.numberInStock--;
        // movie = await movie.save(); 
        try{
            new Fawn.Task()
                .save('rentals',rental)  //save rental is the collection rentals
                .update('movies' , { _id: movie._id} , {   //updating movies collection
                    $inc: {numberInStock: -1}
                })
                .run();  //if we dont exec run none of the operatoins will be performed
            res.send(rental);
        }
        catch(error){
            res.status(500).send('Something went wrong');
        }        
});


module.exports = router;