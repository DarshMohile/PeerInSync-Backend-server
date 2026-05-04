const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({

    fileName: {
        type: String,
    },

    folder: {
        type: String
    },

    language: {
        type: String,
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

    project_title: {
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