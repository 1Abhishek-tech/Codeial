const nodemailer = require('../config/nodemailer')

exports.newPost = (post)=>{
    let htmlString = nodemailer.renderTemplate({post: post},'/post/new_post.ejs')
    nodemailer.transport.sendMail({
        from: 'faltuMail4u@gmail.com',
        to: post.user.email,
        subject: 'Post Published',
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log('Error on sending mail for post ',err)
            return;
        }
        console.log('Message sent ',info)
        return;
    })
}