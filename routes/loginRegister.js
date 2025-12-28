//Routes to handle login and signUp requests

const express = require('express');
const app = express();
const router = express.Router();
const userModel = require('../dataModels/userModel');
const passport = require('passport');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


router.post('/login', async (req, res, next) => {
    
    passport.authenticate('local', (err, user, info) => {

        if(err) return res.status(500).json({ msg: "Server error", error: err });
        if(!user) return res.status(400).json({ msg: "Invalid credentials" });

        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ msg: "Login failed", error: err });
            res.status(200).json({ msg: "Logged in successfully" });
        });

    })(req, res, next);
});

module.exports = router;