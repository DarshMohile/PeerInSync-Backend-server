const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

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
    
    
    mob_num:{
        
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    
    course_name:{

        type: String,
        required: true,
    },

    branch:{

        type: String,
        required: true
    },
    
    college_name:{

        type: String,
        required: true
    },

    current_year_of_study:{

        type: Number,
        required: true
    },

    gender:{

        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    
    password:{

        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
        select: false
    },

    role:{

        type: String,
        required: true,
        enum: ['Student', 'Alumni']
    }
});


const studentModel = mongoose.model('studentModel', studentSchema);
module.exports = studentModel;