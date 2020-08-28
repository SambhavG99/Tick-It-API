const express = require('express');
const {Genre} = require('../models/genres');
const {validateMovie,Movie} = require('../models/movies');
const router = express.Router();
const {auth} = require('../middleware/auth');


router.post('/',auth, async (req,res) => {
    try {
        const {error} = validateMovie(req.body);
        if(error) return res.send(error.details[0].message);

        const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(404).send('Invalid genre ID');
        
        const movie = await new Movie({
            title: req.body.title,
            genre:{
                _id:genre._id,
                name:genre.name
            },
            numberInStock:req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
        
        await movie.save();
        res.send(movie);
    } catch (error) {
        res.status(400).send('Invalid ID. Please check the genreId again.');
        console.log(error.message);
    }
});


module.exports = router;