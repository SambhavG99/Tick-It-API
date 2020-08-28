const express = require('express');
const {Genre, validateGenre} = require('../models/genres');
const {auth} = require('../middleware/auth');
const {admin} = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req,res) => {
    throw new Error('Could not get genres');
        const genres = await Genre
        .find()
        .sort({name:1})
        .select('name');
        res.status(200).json(genres);
});
router.get('/:id' ,  async (req , res) => {
        try{
        const genre = await Genre.findById(req.params.id);
        if(!genre) return res.send(`The genre you're looking for doesn't exist`);
        res.json(genre);
        } catch(err){
        return res.status(404).send(`The ID you entered is invalid`);
        }
        
})


router.post('/',auth, async (req,res) => {
        const {error} = validateGenre(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const genre = new Genre({
            name:req.body.name
        });
        await genre.save();
        res.status(200).json(genre).toString();
  }); 

router.put('/:id',auth, async (req,res) => {
        
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        try {
            const genre = await Genre.findByIdAndUpdate(req.params.id , 
                {
                    name: req.body.name
                }
            ,{new:true});
            if(!genre) return res.send(`The genre you're looking for doesn't exist`)
            res.status(200).json(genre);
        } catch (error) {
         return res.status(404).send('The ID you entered is invalid');  
        }
    });

router.delete('/:id',[auth,admin], async (req,res) => {
        try {
            const genre = await Genre.findByIdAndRemove(req.params.id);
            if(!genre) return res.status(404).send(`The genre you're looking for doesn't exist`);
            res.send(`${genre.name} is deleted`);
        } catch(error) {
            res.status(400).send('The ID you entered is invalid'); 
        }
    });

module.exports = router;    
