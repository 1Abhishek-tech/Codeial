const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");

//Authentication using passport
passport.use(new LocalStrategy(
    {
      usernameField: 'email',
    },function (email, password, done) {
      //find the user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user-->password");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid username/password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
//serializing the user to decide which key is to be kept in the cookie
//serialize will store the userid in the session cookie which is encrypted using my express session in main index.js
passport.serializeUser(function(user,done){
    done(null,user.id)
})

//deserializing the user from the key in the cookie
//it will be used to find out which user is there
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){ 
    if(err){   console.log("Error in finding user-->password");
    return done(err);}
    return done(null,user)
      }  )
})
module.exports = passport;

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
  //if User is signed in ,then pass on the request to next function(controller's function)
if(req.isAuthenticated()){
  return next();
}
//if Not signed in
return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser= function(req,res,next){
  if(req.isAuthenticated()){
//req.user contain the current signedin user from the session cookie and we are just sending this to the locals for the views
res.locals.user = req.user;
  }
  next();
}