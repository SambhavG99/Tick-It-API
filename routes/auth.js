const config = require('config');
const Joi = require('joi');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {User} = require('../models/users');
const bcrypt = require('bcryptjs');
const express = require('express');


const router = express.Router();

router.post('/' , async (req,res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send(`Invalid email or password`);

    const passMatch = await bcrypt.compare(req.body.password , user.password);
    if(!passMatch) return res.status(400).send(`Invalid email or password`);

    const token = await jwt.sign({ email: user.email } , config.get('jwtPrivateKey'));
    res.send(token);
});

function validateUser(credentials) {
    const schema = {
        email:Joi.string().max(255).required().email(),
        password:Joi.string().max(255).min(5).required()
    }
    return Joi.validate(credentials,schema);
}

module.exports = router;