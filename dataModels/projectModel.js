const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({

    fileName: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    content: {
        type: String,
        default: ""
    },

    updatedAt: {
        type:String,
        required: true
    }
}, {_id : true});


const projectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: true
    },

    members: [{
        type: mongoose.Schema.ObjectId,
        ref: 'usermodel'
    }],

    files: [fileSchema]
}, {timestamps : true});

module.exports = mongoose.model("projectModel", projectSchema);