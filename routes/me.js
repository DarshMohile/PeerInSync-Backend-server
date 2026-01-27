const express = require('express');
const { jwtAuth } = require('../modules/jwt');
const router = express.Router();

const userModel = require('../dataModels/userModel');

router.get('/me', jwtAuth, async (req, res) => {

    try
    {
        const uid = req.user.id;
        const user = await userModel.findOne({ _id: uid })
    
        if (!user) 
        {
            return res.status(404).json({msg: 'User Data Not Found'});
        }
    
        res.status(200).json(user);
    }
    catch(err)
    {
        console.log('Error sending userInfo: ', err);
        res.status(500).json({msg: 'something went wrong'});
    }

});


router.put('/update', jwtAuth, async (req, res) => {

    try
    {
        const uid = req.user.id;
        const data = req.body;

        const mappedData = {
            fName: data.fName,
            lName: data.lName,
            email: data.email,
            mobile_no: data.mobile_no,
            college_name: data.college_name,
            course_name: data.course_name,
            branch: data.branch,
            current_year_of_study: data.current_year_of_study,
            gender: data.gender,
            role: data.role
        }

        const response = await userModel.findByIdAndUpdate(uid, { $set: mappedData}, {

            new: true,  //return the updated data
            runValidators: false     //Check all validations (like required field, not NULL etc...)
        }).select('-password');

        if(!response)   //If the specified record is not found
        {
            console.log('::Failed to update data. Specified id not found.\n');
            return res.status(404).json({err: 'User not found.'});
        }

        console.log('::Data updated successfully');
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log('::Error accessing the data from database: ' + err + '\n');
        res.status(500).json({error : 'Internal Server Error.'});
    }

});


router.get('/myEvents', jwtAuth, async(req, res) => {

    try
    {
        const uid = req.user.id;
        const events = await eventModel.find({participants: uid});

        if(!events)
        {
            return res.status(404).json({msg: 'No events found.'});
        }
        
        res.status(200).json(events);

    }
    catch(err)
    {
        console.log('Error reading events: ', err);
        res.status(500).json({msg: 'something went wrong'});
    }
});


module.exports = router;