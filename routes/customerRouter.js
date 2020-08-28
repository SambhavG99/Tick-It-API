const express = require('express');

const {Customer,validateDetails} = require('../models/customer');
const router = express.Router();



router.get('/' , async (req,res) => {
    try {
        const customer = await Customer.find().sort({name:1});
        if(!customer) return res.send(`No Customers yet`);
        res.status(200).json(customer);
    } catch (error) {
        return res.status(404).send(`Something went wrong`);
    } 
});

router.get('/:id' , async (req,res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(400).send(`Customer doesn't exist`);
        res.json(customer);
    } catch (error) {
        return res.status(404).send(`The ID you entered is invalid`);
    }
});

router.post('/' , async (req,res) => {
    try {
        const {error} = validateDetails(req.body);
        if(error) return res.status(400).send(error.details[0].message); 
       const customer = await new Customer({
           name:req.body.name,
           isGold: req.body.isGold,
           phone:req.body.phone
       }) ;
       await customer.save();
       res.send(customer);
    } catch (error) {
        return res.status(404).send(`Something went wrong , ${error.message}`);
    }
});

router.put('/:id' ,async (req,res) => {
    try {
        const {error} = validateDetails(req.body);
        if(error) return res.status(400).send(error.details[0].message); 
        const customer = await Customer.findByIdAndUpdate(req.params.id , {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        } , { new: true });
        if(!customer) return res.status(404).send('Customer doesnt exist');
        res.json(customer);
    } catch (error) {
        return res.status(404).send(`Something went wrong ${error.message}`);
    }
});

router.delete('/:id' ,async (req,res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if(!customer) return res.status(404).send('Customer doesnt exist');
        res.send(`${customer.name}'s  record successfully deleted`);
    } catch (error) {
        return res.status(404).send(`Something went wrong ${error.message}`);
    }
});

module.exports = router;