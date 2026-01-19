const express = require('express');
const router = express.Router();
const eventModel = require('../dataModels/eventDetails');
const { jwtAuth } = require('../modules/jwt');


router.post('/create', jwtAuth, async (req, res) => {

    try
    {
        if(req.user.role !== 'alumni')
        {
            return res.status(403).json({ msg: 'Only Alumni can create events.' });
        }
            
        const data = req.body;

        const mappedData = {
            project_title: data.project_title,
            description: data.description,
            date_time: data.date_time,
            event_type: data.event_type,
            loc_link: data.loc_link
        }

        console.log('Received event Details: ', mappedData);

        let event = new eventModel(mappedData);
        await event.save();
        
        res.status(200).json({msg: 'Event Created successfully'});
    }
    catch(err)
    {
        console.log('Error receiving data: ', err.message);
        res.status(500).json({msg: 'something went wrong', error: err.message});
    }
});


module.exports = router;