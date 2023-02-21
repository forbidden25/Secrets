//jshint esversion:6
require('dotenv').config();
const md5 = require('md5');
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require ('ejs');
//const _ = require ("lodash");
const app = express();
const port = 3000;



//ejs set
app.set('view engine', 'ejs');


//body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

//express
app.use(express.static(__dirname + '/public'));//public folder




//MongoDB connection

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/userDB');

  
}
//MongoDB connection



//schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
  
  });//schema

  
  

//define a User Model
  const User = mongoose.model("User", userSchema);

  
// home route
app.get("/", function(req, res) {
    
res.render('home');
}); //home route



    // register route
app.get("/register", function(req, res) {
    
    res.render('register');
    
    
    
    
    }); //register route



//create newUser
app.post("/register",function(req, res){
    
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });

    //saves NewUser
    newUser.save(function(err){
        if (err) {
            console.log(err);
        } else {
            res.render("secrets");
        } 

    });  //saves NewUser
});


    

    
//app.get login route
app.get("/login", function(req, res) {
    
    res.render('login');
    
    }); //app.get login route



//app.post login
app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({email: username}, function(err, foundUser){
        if (err) {
            console.log(err);
        } else {
            if(foundUser){
                if(foundUser.password === password){
                    res.render("secrets");
                }
            }
        }

    });
}); //route app.post login



//logout route
app.get("/logout",function(req,res){
    res.redirect("/");
});//logout route



app.post("", (req, res) => {
  
    
});



  


//process.env.PORT < HEROKU
//app listen port
app.listen(process.env.PORT || port, function() {
    console.log("Server Started on port 3000");
  }); //app.listen


 
  


   