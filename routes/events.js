const express = require('express');
const router = express.Router();
const eventModel = require('../dataModels/eventModel');
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
            name: data.name,
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


router.get('/getEvents', jwtAuth, async(req, res) => {

    try
    {
        const events = await eventModel.find();
        res.status(200).json(events);
    }
    catch(e)
    {
        console.log('error sending event details: ', e.message);
        res.status(500).json('something went wrong');
    }
});


router.post('/registerEvent/:eventID', jwtAuth, async(req, res) => {

    try
    {
        const eventID = req.params.eventID;
        const uid = req.user._id;

        const result = await eventModel.updateOne(
            {
                _id: eventID,
                participants: { $ne: uid },
                $expr: { $lt: [{ $size: "$participants" }, "$maxParticipants"] }
            },
            {
                $addToSet: { participants: uid }
            }
        );

        if (result.matchedCount === 0)
        {
            return res.status(400).json('Event not found, already registered, or event is full');
        }

        return res.status(200).json('Event registered successfully');
    }
    catch(err)
    {
        console.log('::Error registering for event:', err.message);
        res.status(500).json('something went wrong');
    }

});


module.exports = router;