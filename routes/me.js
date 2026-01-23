const express = require('express');
const { jwtAuth } = require('../modules/jwt');
const router = express.Router();

const userModel = require('../dataModels/userModel');

router.get('/me', jwtAuth, async (req, res) => {

    const uid = req.user.id;
    const user = await userModel.findOne({ _id: uid })

    if (!user) 
    {
        return res.status(404).json({msg: 'User Data Not Found'});
    }

    res.status(200).json(user);

});


router.put('/update', jwtAuth, async (req, res) => {

    try
    {
        const uid = req.user.id;
        const data = req.body;

        const response = await userModel.findByIdAndUpdate(uid, data, {

            new: true,  //return the updated data
            runValidators: true     //Check all validations (like required field, not NULL etc...)
        });

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


module.exports = router;