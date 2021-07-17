const Comment= require('../models/comment')
const Post = require('../models/posts')
const commentMailer = require('../mailer/comments_mailer')
const commentEmailWorker = require('../workers/comment_email_workers')
const queue = require('../config/kue')

module.exports.create= async function(req,res){
// Post.findById(req.body.post,function(err,post){
// if(err){console.log('Error');}
// // res.redirect('/');
//     if(post){
//         Comment.create({
//             content: req.body.content,
//             post: req.body.post  ,  // or use post._id 
//             user: req.user._id
//         },function(err,comment){
//             post.comments.push(comment)
//             post.save();

//            return res.redirect('/');
//         })
//     }
// })
try{
    let post =await Post.findById(req.body.post)
    if(post){
        let comment = await Comment.create({content: req.body.content, post : req.body.post, user: req.user._id})
        post.comments.push(comment)
        post.save()

        comment = await comment.populate('user', 'name email').execPopulate();
        // commentMailer.newComment(comment)
       let job = queue.create('emails',comment).save(function(err){
            if(err){
                console.log('error in creating a queue',err);
                return;
            }
            console.log(job.id)
        })

        if (req.xhr){
            // Similar for comments to fetch the user's id!

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Post created!"
            });
        }
        req.flash('success', 'Comment published!');
        return res.redirect('/');
        }
}catch(err){
    console.log('Error', err)
}

}

module.exports.destroy = async function(req,res){
    // Comment.findById(req.params.id,function(err,comment){
    //     if(comment.user == req.user.id ){
    //         let postId = comment.post;
    //         comment.remove()
    //         Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}} ,function(err,post){
    //             return res.redirect('back')
    //         })
    //     }else{
    //         return res.redirect('back') 
    //     }
    // })
    try{
        let comment =await Comment.findById(req.params.id)
            if(comment.user == req.user.id ){
                let postId = comment.post;
                comment.remove()
               await Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}})
                          // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');
                    return res.redirect('back')
            }
            else{
                return res.redirect('back') 
            }

    }catch(err){
        console.log('Error',err)
    }
    }
