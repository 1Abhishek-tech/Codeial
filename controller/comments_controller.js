const Comment= require('../models/comment')
const Post = require('../models/posts')

module.exports.create= function(req,res){
Post.findById(req.body.post,function(err,post){
if(err){console.log('Error');}
// res.redirect('/');
    if(post){
        Comment.create({
            content: req.body.content,
            post: req.body.post  ,  // or use post._id 
            user: req.user._id
        },function(err,comment){
            post.comments.push(comment)
            post.save();

           return res.redirect('/');
        })
    }
})
}