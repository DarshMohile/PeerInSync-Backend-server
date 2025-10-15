const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    
    mobile_no:{
        
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    
    college_name:{

        type: String,
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

    current_year_of_study:{

        type: String,
        required: true,
        enum: ['1st year', '2nd year', '3rd year', '4th year', 'graduated']
    },

    gender:{

        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },

    role:{

        type: String,
        required: true,
        enum: ['student', 'alumni']
    }
    
}, {collection: "usermodels"});

userSchema.pre('save', async function (next)
{
    
    if(!this.isModified('password'))
    {
        return next();
    }

    try
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;

        next();
    }
    catch(e)
    {
        return next(e);
    }
})


const userModel = mongoose.model('userModel', userSchema);

userModel.schema.methods.comparePassword = async function (candidatePassword)
{

    try
    {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(e)
    {
        throw err;
    }
};

module.exports = userModel;