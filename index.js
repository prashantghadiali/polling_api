const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const port = 8000;
const bodyParser=require('body-parser')

const db = require('./config/mongoose');


// Used express.urlencoded with extended option
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({
//     extended: true
//     }));




// app.use(express.static('./assets'));


// // we use ejs engine
// app.set('view engine', 'ejs');

// // set up the view engine
// app.set('views', path.join(__dirname, 'views'));



// middleware
app.use(bodyParser.json());
// app.use(express.urlencoded()); // it tells the server to pass the data from frontend to req.body object

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);    //if there is any error on server
    }

    console.log(`Server is running on port: ${port}`);
});