const mongoose = require('mongoose');

const helpTicketSchema = new mongoose.Schema({

    fullName: {

        type: String,
        required: true
    },

    email: {

        type: String,
        required: true
    },

    message: {

        type: String,
        required: true,
        maxlength: 2000
    },

    time: {

        type: String,
        required: true
    }
});

const helpTicketModel = mongoose.model('helpTicketModel', helpTicketSchema);
module.exports = helpTicketModel;