//entrypoint file for web server.
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const loginRegisterRoutes = require('./routes/loginRegister');

const port = process.env.PORT || 3000;

require('dotenv').config();
require('./modules/databaseLink');


app.use(express.json());
app.use(cors());
app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'rootPage')));


const logInfo = (req, res, next) => {

    const ip = req.header['x-forwarded-for'] || req.ip;

    console.log(`[${new Date().toLocaleString()}] Incoming Request:\nClient IP: ${ip}\nClient Host Name: ${req.headers.origin}\nMethod: ${req.method}\nTo: ${req.originalUrl}\n`);
    next();
}
app.use(logInfo);


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



app.listen(port, () => {
    
    console.log("Server is online on port: " + port);
});