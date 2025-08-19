//Routes to handle login and signUp requests

const express = require('express');
const app = express();
const router = express.Router();
const userModel = require('../dataModels/userModel');

app.use(express.json());

router.post('/signup', async (req, res) => {

    try
    {
        const data = req.body;
        console.log('Received Data: ', data);

        let newUser = new userModel(data);
        await newUser.save();
        
        res.status(200).json({msg: 'registered successfully'});
    }
    catch(err)
    {
        console.log('Error receiving data: ', err.message);
        res.status(500).json({msg: 'something went wrong', error: err.message});
    }
});


module.exports = router;