const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../dataModels/userModel.js');


//Authentication using email and password
passport.use(new localStrategy(
  
    async (username, passwd, done) => {
  
      try {
  
        console.log("Received credentials:", username, password);
        const user = await userModel.findOne({ username });
        console.log("after finding user");


        if (!user) 
        {
          return done(null, false, { message: "Invalid Credentials" });
        }


        console.log('user found: ' +  user.fName);
        const isValidPassword = user.password === password ? true : false;
        

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

module.exports = passport;