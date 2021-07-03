const Post= require('../models/posts')
const User = require('../models/user') 
module.exports.home = function(req,res){
    // return res.end('<h1> Express is up for work  </h1>')
    console.log(req.cookies)
    // res.cookie('user_id',15)
    // Post.find({},function(err,posts){
    //     if(err){console.log('Error in finding Post ') 
    // return;}
    //     return res.render('home',{
    //         title: "Home",
    //         posts: posts
    //     })
    // })
    //Populating user of each post
    // Post.find({}).populate('user').exec(function(err,posts){
    Post.find({}).populate('user').populate({path: 'comments',
    populate: {
        path: 'user'
    }
    }).exec(function(err,posts){
   /*     if(err){console.log('Error in finding Post ') 
        return;}
     */      User.find({},function(err,users){
        return res.render('home',{
            title: "Home",
            posts: posts,
            all_users: users
        });
     })
   
    });
};



module.exports.about = function(req,res){
    User.findOne({},function(err,users){
        return res.render('test',{
            title: 'Test Page || Posts',
            
        })
    })
    return res.end('<h1> About page </h1>')
}

// module.exports.actionName = function(req, res){}