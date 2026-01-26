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

        type: Date,
        required: true,
        min: '1900-01-01',
        max: Date.now
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
        default: null,
        min: 0
    },

    participants: [],
});

const eventModel = mongoose.model('eventDetailModel', eventDetailSchema);
module.exports = eventModel;