const mongoose = require('mongoose');

const discussionPostSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true
    },

    time: {

        type: String,
        required: true
    },

    editedFlag: {

        type: Boolean,
        required: true
    },

    postTitle: {

        type: String,
        required: true,
        maxlength: 50
    },

    postBody: {

        type: String,
        required: true,
        maxlength: 2000
    },

    parentThread: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'discussionPostModel'
    },

    author: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
});

const discussionPostModel = mongoose.model('discussionPostModel', discussionPostSchema);
module.exports = discussionPostModel;