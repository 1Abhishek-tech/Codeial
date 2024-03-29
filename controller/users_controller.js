const User = require('../models/user')
const fs = require('fs')
const path = require('path')

module.exports.profile=async function(req,res){
    // return res.end('<h1>User Profile </h1>')
    // User.findById(req.params.id,function(err,user){
    //     return res.render('user_profile',{
    //         title:"Profile Page",
    //         profile_user: user
    //     })
    // })
    try{
        let user = await User.findById(req.params.id)
        return res.render('user_profile',{
            title:"Profile Page",
            profile_user: user
        })
    }catch(err){
        console.log('Error',err)
    }
   
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
module.exports.update = async function(req,res){
//     if(req.user.id == req.params.id){
// // or User.findByIdAndUpdate(req.params.id,{name:req.body.name , email: req.body.email},)
// User.findByIdAndUpdate(req.user.id, req.body,function(err,user){
//     req.flash('success','Profile Updated Successfully');
//     return res.redirect('back')
//         })
//     }else{
//         return res.status(401).send('Unauthorized')
//     }
if(req.user.id == req.params.id){
    try{
        let user = await User.findById(req.params.id)
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log('***********Multer Error: ',err)}
            // console.log(req.file)
            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                }
                //it is saving the path of uploaded file into the avatar field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename
            }
            user.save()
            return res.redirect('back')
        })
    }catch(err){
        req.flash('error','err')
        return res.redirect('back')
    }

}else{
    req.flash('error','Unauthorized')
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
        res.flash('error','Password Mismatch');
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
            req.flash('error','Email already registered');
            return res.redirect('back')
        }
    })
}
//Sign in and create a session for user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully')
    return res.redirect('/')
}
module.exports.destroySession = function(req,res){
    req.logout()
    req.flash('success','Logged out Successfully')

    res.redirect('/')
}