//entrypoint file for web server.
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const loginRegisterRoutes = require('./routes/loginRegister');
require('dotenv').config();
require('./modules/databaseLink');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'rootPage')));


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


const logInfo = (req, res, next) => {

    console.log(`[${new Date().toLocaleString()}] Request made:\nRemote IP:${req.ip}\nRemote Host Name: ${req.hostname}\nMethod: ${req.method}\nTo: ${req.originalUrl}\n`);
    next();
}

app.use(logInfo);

app.listen(port, () => {
    
    console.log("Server is online on port: " + port);
});