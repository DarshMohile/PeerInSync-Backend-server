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
        required: true
    },

    date_time: {

        type: String,
        required: true,
    },

    event_type: {

        type: String,
        required: true,
    },

    loc_link: {

        type: String,
        required: true,
    }
});

const eventDetailModel = mongoose.model('eventDetailModel', eventDetailSchema);
module.exports = eventDetailModel;