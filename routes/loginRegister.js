//Routes to handle login and signUp requests

const express = require('express');
const router = express.Router();
const userModel = require('../dataModels/userModel');
const passport = require('passport');

router.post('/signup', async (req, res) => {

    try
    {
        const data = req.body;

        const mappedData = {
            fName: data.fName,
            lName: data.lName,
            email: data.email,
            password: data.password,
            mobile_no: data.mobile_no,
            college_name: data.college_name,
            course_name: data.course_name,
            branch: data.branch,
            current_year_of_study: data.current_year_of_study,
            gender: data.gender,
            role: data.role
        }

        console.log('Received Data: ', mappedData);

        let newUser = new userModel(mappedData);
        await newUser.save();
        
        res.status(200).json({msg: 'registered successfully'});
    }
    catch(err)
    {
        console.log('Error receiving data: ', err.message);
        res.status(500).json({msg: 'something went wrong', error: err.message});
    }
});


router.post('/login', async (req, res) => {
    
    try
    {
        const data = req.body;

        const mappedData = {
            email: data.email,
            password: data.password,
        }

        console.log('Received Credentials: ', mappedData); //for testing, debugging

        const user = await userModel.findOne({ email: mappedData.email }).select('+password');

        if (!user) 
        {
            console.log('Error receiving data');
            res.status(500).json({msg: 'Invalid Credentials'});
        }
        else
        {
            console.log('user found: ' +  user.fName);
            const isValidPassword = await user.comparePassword(mappedData.password);

            if (isValidPassword) 
            {
                res.status(200).json({
                    uniqid: user._id,
                    name: user.fName + " " + user.lName,
                    email: user.email
                });
            } 
            else 
            {
                res.status(500).json({msg: 'Invalid Credentials'});
            }
        }
    }
    catch(err)
    {
        console.log('Error receiving data: ', err.message);
        res.status(500).json({msg: 'something went wrong', error: err.message});
    }
    
});

router.delete('/delete/:id', async (req, res) => {

    try
    {
        const userId = req.params.id;   //extract unique user id from request parameters

        const response = await userModel.findByIdAndDelete(userId);

        if(!response)   //If the specified record is not found
        {
            console.log('::Failed to delete data. Specified id not found.\n');
            return res.status(404).json({err: 'User not found.'});
        }
        
        console.log('::Data deleted successfully');
        res.status(200).json(response);
    }

    catch(err)
    {
        console.log('::Error accessing the data from database: ' + err + '\n');
        res.status(500).json({error : 'Internal Server Error.'});
    }
})

module.exports = router;