//npm i express dotenv passport passport-auth0 express-session massive
// to install all the server dependencies

//set server parts first, then test to make sure it works.
//next, if using authentication, set up passport 

//require what we need
require('dotenv').config();
const express = require('express') 
    , bodyParser = require('body-parser')
    , controller = require('./controller');

//deconstruct the data from the .env file
const {
    SERVER_PORT
} = process.env;


const app = express(); //server

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());



app.get('/api/search/', controller.searchPictures);


//server
//get that server going 
app.listen(SERVER_PORT, () => {
    console.log('Listening on port ', SERVER_PORT);
})