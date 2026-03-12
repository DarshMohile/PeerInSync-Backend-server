//Routes to handle login and signUp requests
const express = require('express');
const router = express.Router();
const UAParser = require('ua-parser-js');
const axios = require('axios');
const userModel = require('../dataModels/userModel');
const {jwtAuth, generateToken} = require('../modules/jwt');
const sendLoginMail = require('../modules/mailer');


module.exports = router;


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

        const payload = {
            id: newUser._id,
        };

        const token = generateToken(payload);
        console.log('Token Saved. token: ', token);
        
        //res.status(200).json({msg: 'registered successfully', token: token});
        res.status(200).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000}
        ).json({msg: 'registered successfully'});
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

        const user = await userModel.findOne({ email: mappedData.email }).select('+password');

        if (!user) 
        {
            console.log('Error receiving data');
            return res.status(401).json({msg: 'Invalid Credentials'});
        }

        console.log('user found: ' +  user.fName);
        const isValidPassword = await user.comparePassword(mappedData.password);

        if (isValidPassword) 
        {
            const payload = {
                id: user._id,
                email: user.email,
                role: user.role
            };

            const token = generateToken(payload);

            console.log('sending email...');

            //send notification on email
            const parser = new UAParser(req.headers['user-agent']);     //parse user agent header
            const userAgentDetails = parser.getResult();                //get the user agent details
            const browser = userAgentDetails.browser.name;              //get the browser name
            const os = userAgentDetails.os.name;                        //get the os name

            const ip = req.headers['x-forwarded-for']?.split(',')[0];
            const ipApiRes = await axios.get(`https://ipapi.co/${ip}/json/`);
            console.log('IP api details of client: ', ipApiRes);
            const location = `${ipApiRes.data.city || 'unknown city'}, ${ipApiRes.country_name || 'Unknown country'}`;
            const coords = `Latitude: ${ipApiRes.latitude || 'N/A'}, Logitude: ${ipApiRes.longitude || 'N/A'}`;


            const device = `${browser} on ${os}`;
            const fullName = user.fName + " " + user.lName;

            //sendLoginMail(user.email, fullName, ip, device, location, coords);


            res.status(200).cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000
            }).json({msg: 'logged in successfully'});
        } 
        else 
        {
            res.status(401).json({msg: 'Invalid Credentials'});
        }
    
    }
    catch(err)
    {
        console.log('Error logging in: ', err.message);
        res.status(500).json({msg: 'something went wrong', error: err.message});
    }
    
});

router.post('/logout', jwtAuth ,(req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    res.status(200).json({msg: 'logged out successfully'});
});


router.delete('/delete', jwtAuth ,async (req, res) => {

    try
    {
        const userId = req.user.id;
        const response = await userModel.findByIdAndDelete(userId);

        if(!response)  
        {
            console.log('::Failed to delete data. Specified id was not found.\n');
            return res.status(404).json({err: 'User not found.'});
        }
        
        console.log('::Data deleted successfully');
    
        res.clearCookie('token');
        res.status(200).json(response);
    }

    catch(err)
    {
        console.log('::Error accessing the data from database: ' + err + '\n');
        res.status(500).json({error : 'Internal Server Error.'});
    }
})

module.exports = router;