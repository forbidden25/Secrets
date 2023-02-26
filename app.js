//jshint esversion:6
require('dotenv').config();
//const bcrypt = require('bcrypt');
//const saltRounds = 10;

const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require("passport");

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

app.use(session({
    secret: "Our litter secret",
    resave: false,
    saveUninitialized: false,


}));

app.use(passport.initialize());
app.use(passport.session());



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

  userSchema.plugin(passportLocalMongoose);
  

//define a User Model
  const User = mongoose.model("User", userSchema);
  
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
// home route
app.get("/", function(req, res) {
    
res.render('home');
}); //home route



    // register route
app.get("/register", function(req, res) {
    
    res.render('register');
    
    
    
    
    }); //register route


    app.get("/secrets", function(req, res) {
        if(req.isAuthenticated()){
            res.render('secrets');
        }else{
            res.redirect("/login");
        }
        }); 


//create newUser
app.post("/register",function(req, res){
    
        //bcrypt
        // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            
        //     const newUser = new User({
        //         email: req.body.username,
        //         password: hash
        //     });
        
        //     //saves NewUser
        //     newUser.save(function(err){
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             res.render("secrets");
        //         } 
        
        //     });  //saves NewUser

        // });


        //passport-local-mongoose
        User.register({username: req.body.username}, req.body.password, function( err, user){
            if(err){
                console.log(err);
                res.redirect("/register");
            } else{
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/secrets");
                });
            }
        });


   
});


    

    
//app.get login route
app.get("/login", function(req, res) {
    
    res.render('login');
    
    }); //app.get login route



//app.post login
app.post("/login", function(req, res) {
    // const username = req.body.username;
    // const password = req.body.password;

    // User.findOne({email: username}, function(err, foundUser){
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if(foundUser){
    //             bcrypt.compare(password, foundUser.password, function(err, result) {
    //                 if (result === true){
    //                     res.render("secrets");
    //                 }
    //             });
                    
                
    //         }
    //     }

    // });

    //using Passport
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        }else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });



}); //route app.post login



//logout route
app.get("/logout",function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});//logout route



app.post("", (req, res) => {
  
    
});



  


//process.env.PORT < HEROKU
//app listen port
app.listen(process.env.PORT || port, function() {
    console.log("Server Started on port 3000");
  }); //app.listen


 
  


   