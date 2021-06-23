const mongoose = require('mongoose')

const signInUserSchema = new mongoose.Schema({
    UserName:{
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type:String,
        required: true
    }
})

const SignInUser= mongoose.model('SignInUser',signInUserSchema)
module.exports=SignInUser;