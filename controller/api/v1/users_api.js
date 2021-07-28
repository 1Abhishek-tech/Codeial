const User = require('../../../models/user')
const env = require('../../../config/environment')
const jwt = require('jsonwebtoken')

//Sign in and create a session for user
module.exports.createSession = async function(req,res){
    try{
    let user = await User.findOne({email : req.body.email});

    if ( !user || user.password != req.body.password ){
        return res.json(422,{
            message :'Invalid Username or Password'
        })
    }
    return res.json(200,{
        message: 'Sign in successfully, keep your token safe',
        data : {
            token: jwt.sign(user.toJSON(),env.jwt_strategy,{expiresIn: '100000'})
        }
    })

    }catch(err){
        console.log('!!!!!!!!!!!!!!!!!!!!Error',err)
        return res.json(500,{
        message : "Internal Server Error"
    })    
    }
}