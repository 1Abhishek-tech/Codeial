const User = require('../models/user')

module.exports.profile=function(req,res){
    // return res.end('<h1>User Profile </h1>')
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"Profile Page",
            profile_user: user
        })
    })
}

module.exports.post=function(req,res){
    return res.end('<h1>Post is uploaded by User </h1>')
}
//render the sign in page
module.exports.SignIn= function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{ 
        title: "Codeial | Sign In"
    })
}
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
// or User.findByIdAndUpdate(req.params.id,{name:req.body.name , email: req.body.email},)
User.findByIdAndUpdate(req.user.id, req.body,function(err,user){
    return res.redirect('back')
        })
    }else{
        return res.status(401).send('Unauthorized')
    }
}
//render the sign up page
module.exports.SignUp= function(req,res){
if(req.isAuthenticated()){
    return res.redirect('/users/profile')
}

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
    return res.redirect('/')
}
module.exports.destroySession = function(req,res){
    req.logout()
    res.redirect('/')
}