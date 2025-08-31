//entrypoint file for web server.
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('./dataModels/userModel');

const loginRegisterRoutes = require('./routes/loginRegister');
const { findOne } = require('./dataModels/userModel');

const port = process.env.PORT || 3000;

require('dotenv').config();
require('./modules/databaseLink');


app.use(express.json());
app.use(cors());
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'rootPage')));


//Log the details of every request that comes to backend
const logInfo = (req, res, next) => {

    const ip = req.header['x-forwarded-for'] || req.ip;

    console.log(`[${new Date().toLocaleString()}] Incoming Request:\nClient IP: ${ip}\nClient Host Name: ${req.headers.origin}\nMethod: ${req.method}\nTo: ${req.originalUrl}\n`);
    next();
}
app.use(logInfo);


//Authentication using email and password
passport.use(new localStrategy (async (username, password, done) => {

    try
    {
        console.log("Received Credentials for Auth: ", username, password);

        const user = await userModel.findOne({email: username});

        if(!user)
        {
            return done(null, false, {message: 'User not found'});
        }
        
        const isValidPassword = user.password === password ? true : false;

        if(isValidPassword)
        {
            return done(null, user);
        }
        else
        {
            return done(null, false, {message: 'Invalid Password'});
        }

    }
    catch(err)
    {
        return done(err);
    }

}));

app.use(passport.initialize());


//Server root or homepage
app.get('/', passport.authenticate('local', {session: false}), (req, res) => {

    try
    {
        res.sendFile(path.join(__dirname, '/rootPage/serverRoot.html'));
    }
    catch(err)
    {
        console.log('Error displaying root page: ', err);
        res.status(500).json({msg: 'something went wrong'});
    }
});


//simple get method for testing purposes
app.get('/hello', (req, res) => {

    try
    {
        res.send('hello from backend!');
    }
    catch(err)
    {
        console.log('Error displaying root page: ', err);
        res.status(500).json({msg: 'something went wrong'});
    }
});

app.use('/loginRegisterRoutes', loginRegisterRoutes);



app.listen(port, () => {
    
    console.log("Server is online on port: " + port);
});