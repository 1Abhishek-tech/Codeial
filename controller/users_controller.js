const User = require('../models/user')

module.exports.profile=function(req,res){
    return res.end('<h1>User Profile </h1>')
}

module.exports.post=function(req,res){
    return res.end('<h1>Post is uploaded by User </h1>')
}
//render the sign in page
module.exports.SignIn= function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}
//render the sign up page
module.exports.SignUp= function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}
//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password!= req.body.confirm_password){
        console.log("Password does not match")
        return res.redirect('back')
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('Error in finding user in signing up'); 
        return;}
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('Error in creating user in signing up'); return}
                return res.redirect('/users/sign-in')
            })
        }else{
            console.log('Email already registered')
            return res.redirect('back')
        }
    })
}
//Sign in and create a session for user
module.exports.createSession = function(req,res){

}