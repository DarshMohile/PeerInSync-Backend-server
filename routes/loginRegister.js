//Routes to handle login and signUp requests

const express = require('express');
const app = express();
const router = express.Router();
const userModel = require('../dataModels/userModel');

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


// router.get('/login', async (req, res) => {

//     try
//     {
//         const query = req.body.email;
//         const password = req.body.password;

        
//     }
//     catch(err)
//     {
//         console.log(err.message);
//         res.status(500).json({error: 'Internal Server Error.'});
//     }


// });


module.exports = router;