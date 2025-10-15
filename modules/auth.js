const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../dataModels/userModel.js');


//Authentication using email and password
passport.use(new localStrategy(
    // {
    //   usernameField: 'username',   // match what you send in Postman
    //   passwordField: 'password',
    //   passReqToCallback: true
    // },
    async (/*req,*/ username, passwd, done) => {
      //req, username, password, done) => {
        
      try {
        // if GET, take from query
        // if (req.method === "GET") {
        //   username = req.query.username;
        //   password = req.query.password;
        // }
  
        console.log("Received credentials:", username, passwd);
  
        const user = await userModel.findOne({ username });

        console.log("after finding user");

        if (!user) 
        {
          return done(null, false, { message: "Invalid Credentials" });
        }

        console.log('user found: ' +  user.fName);
  
        const isValidPassword = user.comparePassword(passwd);
        
        if (isValidPassword) 
        {
          return done(null, user);
        } 
        else 
        {
          return done(null, false, { message: "Invalid Credentials" });
        }   
      } 
      catch (err) 
      {
        return done(err);
      }
    }
  ));

  module .exports = passport;