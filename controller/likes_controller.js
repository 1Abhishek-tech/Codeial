const Like = require('../models/likes');
const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){
    try{        
        //likes/toggle/?id=jfdakdf&type=Post
        let likeable;
        let deleted = false;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes')
        }
        //check if a like already exist
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel :req.query.type,
            user : req.user._id
        }) 

        //if a like already exist then remove it
        if(existingLike){
            likeable.likes.pull(existingLike._id)
            likeable.save()
            existingLike.remove()
            deleted = true;
        }else{
            //make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            likeable.likes.push(newLike._id)
            likeable.save()
        }
        return res.json(200,{
            message: 'Request successsful',
            data:{
                deleted: deleted
            }
        })

    }catch(err){
        console.log('Internal Server Error',err)
        return res.json(500,{
            message : 'Internal server error'
        })
    }
}