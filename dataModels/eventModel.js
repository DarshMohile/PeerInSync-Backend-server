const mongoose = require('mongoose');

const eventDetailSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true
    },

    project_title: {

        type: String,
        required: true
    },

    description: {

        type: String,
        required: false
    },

    
    creationDate: {
        
        type: String,
        default: Date.now
    },
    
    date: {

        type: String,
        required: true
    },
    
    time: {

        type: String,
        required: true
    },

    event_type: {

        type: String,
        required: true, 
    },

    loc_link: {

        type: String,
        required: false,
    },

    maxParticipants: {

        type: Number,
        default: 0,
        min: 0,
        max: 50
    },

    participants: [{type: mongoose.Schema.Types.ObjectId}]
});

const eventModel = mongoose.model('eventDetailModel', eventDetailSchema);
module.exports = eventModel;