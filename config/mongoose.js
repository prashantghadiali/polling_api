const mongoose = require("mongoose");

// connect with mongoose
mongoose.connect("mongodb://127.0.0.1:27017/polling_api");

//database connection
const database = mongoose.connection;

// If any error in mongoose
database.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

// It operated one time IF mongoose database is connected.
database.once('open', function(){
    console.log("Database Connected :: MongoDB");
    console.log("Click to create Question : http://localhost:8000/questions/create");
    console.log("Click to create Option : http://localhost:8000/questions/:id/options/create");
    console.log("Click to delete Question : http://localhost:8000/questions/:id/delete");
})


module.exports = database;