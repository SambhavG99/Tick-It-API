const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {auth} = require('../middleware/auth');
const {admin} = require('../middleware/admin');
const {User,validateUser} = require('../models/users');
const express = require('express');


const router = express.Router();

router.get('/me',auth,async (req,res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).send(user);
});

router.post('/' , async (req,res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User already registered..');

    user = await new User(_.pick(req.body , ['name', 'email' , 'password'])); //pick returns a new object having the following properties of object req.body
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user, ['_id' , 'name' , 'email']));
});

module.exports = router;