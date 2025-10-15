const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../dataModels/userModel.js');


//Authentication using email and password
passport.use(new localStrategy(
  
    async (username, passwd, done) => {
  
      try {
  
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


passport.serializeUser((user, done) => {

  done(null, user._id); // save user ID in the session cookie
});

passport.deserializeUser(async (id, done) => {

  try
  {
    const user = await userModel.findById(id); // fetch user from DB using ID
    done(null, user); // attach user to req.user
  }
  catch (err)
  {
    done(err, null);
  }
});


module.exports = passport;