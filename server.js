//entrypoint file for web server.
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const loginRegisterRoutes = require('./routes/loginRegister.js');
const port = process.env.PORT || 3000;

require('dotenv').config();
require('./modules/databaseLink.js');
require('./modules/auth.js');
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'rootPage')));
app.set('trust proxy', true);

//Log the details of every request that comes to backend
const logInfo = (req, res, next) => {

    const ip = req.header['x-forwarded-for'] || req.ip;

    console.log(`[${new Date().toLocaleString()}] Incoming Request:\nClient IP: ${ip}\nClient Host Name: ${req.headers.origin}\nMethod: ${req.method}\nTo: ${req.originalUrl}\n`);
    next();
}
app.use(logInfo);


app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret', // secret to encrypt session ID
    resave: false,  // don’t save session if nothing changed
    saveUninitialized: false, // don’t create empty sessions
    cookie: {
        httpOnly: true, // cookie cannot be accessed via JS in browser (more secure)
        maxAge: 1000 * 60 * 60 * 24 // cookie expires after 1 day
    }
}));

app.use(passport.initialize());
app.use(passport.session());


const isAuthenticated = (req, res, next) => {
    // if (req.isAuthenticated()) {
    //     return next(); // user is logged in
    // }
    // res.status(401).json({ msg: "You must log in first" });
}


//Server root or homepage
app.get('/', (req, res) => {

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