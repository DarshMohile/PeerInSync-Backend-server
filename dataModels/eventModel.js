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

    participants: [],
});

const eventModel = mongoose.model('eventDetailModel', eventDetailSchema);
module.exports = eventModel;