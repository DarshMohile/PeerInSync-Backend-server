//entrypoint file for web server.
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const passport = require('passport');



const loginRegisterRoutes = require('./routes/loginRegister');
const port = process.env.PORT || 3000;

require('dotenv').config();
require('./modules/databaseLink');


app.use(express.json());
app.use(cors());
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'rootPage')));
app.use(passport.initialize());

const authMiddleWare = passport.authenticate('local', {session: false});


//Log the details of every request that comes to backend
const logInfo = (req, res, next) => {

    const ip = req.header['x-forwarded-for'] || req.ip;

    console.log(`[${new Date().toLocaleString()}] Incoming Request:\nClient IP: ${ip}\nClient Host Name: ${req.headers.origin}\nMethod: ${req.method}\nTo: ${req.originalUrl}\n`);
    next();
}
app.use(logInfo);


//Server root or homepage
app.get('/', authMiddleWare, (req, res) => {

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