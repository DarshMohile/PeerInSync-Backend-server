const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    fName:{

        type: String,
        required: true
    },

    lName:{

        type: String,
        required: true
    },

    email:{

        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /.+\@.+\..+/
    },
    
    password:{

        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
        select: false
    },
    
    mob_num:{
        
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    
    college_name:{

        type: String,
        required: true
    },

    current_year_of_study:{

        type: Number,
        required: true
    },

    course_name:{

        type: String,
        required: true,
    },

    branch:{

        type: String,
        required: true
    },

    gender:{

        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },

    role:{

        type: String,
        required: true,
        enum: ['Student', 'Alumni']
    }
    
}, {collection: "usermodels"});


const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;