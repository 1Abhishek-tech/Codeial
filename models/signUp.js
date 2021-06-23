const mongoose = require('mongoose')

const signUpUserSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    UserName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type:String,
        required: true
    }
})

const SignUpUser= mongoose.model('SignUpUser',signUpUserSchema)
module.exports=SignUpUser;