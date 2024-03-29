const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/user')
const env = require('./environment')

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: env.google_client_ID,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_call_back_URL,
},
function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({email: profile.emails[0].value}.exec(function(err,user){
        if(err){console.log('Error in google-strategy-passport',err) 
    return ;}
    console.log(profile)
    if(user){
        //if found , set this user as req.user
        return done(null,user)
    }
    else{
        //if user is not found in our database(New user) we will create it and set it as req.user 
        User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            passport: crypto.randomBytes(20).toString('hex')
        },function(err,user){
            if(err){console.log('Error in creating the user by google-strategy-passport',err) 
            return ;}
            return done(null,user);
        })
    }
    }))

}))

module.exports = passport;