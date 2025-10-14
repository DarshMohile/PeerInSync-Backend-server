const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('./dataModels/userModel');


//Authentication using email and password
passport.use(new localStrategy(
    // {
    //   usernameField: 'username',   // match what you send in Postman
    //   passwordField: 'password',
    //   passReqToCallback: true
    // },
    async (req, username, password, done) => {
      try {
        // if GET, take from query
        if (req.method === "GET") {
          username = req.query.username;
          password = req.query.password;
        }
  
        console.log("Received credentials:", username, password);
  
        const user = await userModel.findOne({ email: username });
        if (!user) 
        {
          return done(null, false, { message: "Invalid Credentials" });
        }
  
        const isValidPassword = user.password === password;
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