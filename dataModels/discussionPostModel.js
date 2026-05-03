const mongoose = require('mongoose');

const discussionPostSchema = new mongoose.Schema({

    author: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    
    postRole: {
        type: String,
        required: true
    },
    
    time: {

        type: String,
        required: true
    },
    
    editedFlag: {

        type: Boolean,
        required: true,
        default: false
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
    
    postCategory: {
        type: String,
        required: true
    }
});

const discussionPostModel = mongoose.model('discussionPostModel', discussionPostSchema);
module.exports = discussionPostModel;