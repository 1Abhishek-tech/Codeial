module.exports.index = function(req,res){
    return res.json(200,{
        message: 'Post Created using v2',
        posts: []
    })
}