//Routes to handle login and signUp requests

const express = require('express');
const router = express.Router();
const helpTicket = require('../dataModels/helpTicketModel');


router.post('/help', async (req, res) => {

    try
    {
        const data = req.body;

        const mappedData = {
            fullName: data.fullName,
            email: data.email,
            message: data.message,
            time: new Date().toString()
        }

        console.log('Received helpTicket: ', mappedData);

        let newTicket = new helpTicket(mappedData);
        await newTicket.save();
        
        res.status(200).json({msg: 'registered successfully'});
    }
    catch(err)
    {
        console.log('Error receiving data: ', err.message);
        res.status(500).json({msg: 'something went wrong', error: err.message});
    }
});


module.exports = router;