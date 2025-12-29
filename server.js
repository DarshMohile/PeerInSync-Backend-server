//entrypoint file for web server.
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const passport = require('passport');

const loginRegisterRoutes = require('./routes/loginRegister.js');
const helpDesk = require('./routes/helpDesk.js');
const port = process.env.PORT || 3000;

require('dotenv').config();
require('./modules/databaseLink.js');
require('./modules/auth.js');
app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(express.static(path.join(__dirname, 'rootPage')));
app.set('trust proxy', true);

//Log the details of every request that comes to backend
const logInfo = (req, res, next) => {

    const ip = req.headers['x-forwarded-for'] || req.ip;

    console.log(`[${new Date().toLocaleString()}] Incoming Request:\nClient IP: ${ip}\nClient Host Name: ${req.headers.origin}\nMethod: ${req.method}\nTo: ${req.originalUrl}\n`);
    next();
}
app.use(logInfo);
app.use(passport.initialize());


const Authentication = passport.authenticate('local', {session : false});


//Server root or homepage
app.get('/', Authentication, (req, res) => {

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
app.use('/help', helpDesk);


app.listen(port, () => {
    
    console.log("Server is online on port: " + port);
});