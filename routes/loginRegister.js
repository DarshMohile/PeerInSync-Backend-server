//Routes to handle login and signUp requests

const express = require('express');
const app = express();
const router = express.Router();
const studentModel = require('../dataModels/studentModel');

app.use(express.json());


router.post('/signup', async (req, res) => {

    try
    {
        const data = req.body;
        console.log('Received Data: ', data);
        res.status(200).json({msg: 'registered successfully'});
        
        if(data.role == 'Student')
        {
            let newStudent = new studentModel(data);
            await newStudent.save();
            
        }
        
        if(data.role == 'Alumni')
        {
            let newAlumni = new alumniModel(data);
            await newAlumni.save();
        }
        
    }
    catch(err)
    {
        console.log('Error receiving data: ', err.message);
        res.status(500).json({msg: 'something went wrong', error: err.message});
    }
});


module.exports = router;