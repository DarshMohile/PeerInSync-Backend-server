const mongoose = require('mongoose');
require('dotenv').config();
const localDatabaseUrl = 'mongodb://localhost:27017/test_db';
const databaseUrl = process.env.MONGO_URL || localDatabaseUrl;


function connectDatabase()
{
    mongoose.connect(databaseUrl, {

    serverSelectionTimeoutMS: 1000,
    useUnifiedTopology: true
    })
    .catch(err => {

        console.log('Error connecting database: ', err);
        console.log('Retrying in 5 seconds');

        setTimeout(connectDatabase, 5000);
    });
}


connectDatabase();


mongoose.connection.on('open', () => {

    console.log("Database status: connected.");
});


mongoose.connection.on('disconnected', () => {

    console.log("Database status: disconnected.");
    console.log('Retrying in 5 seconds');

    setTimeout(connectDatabase, 5000);
});