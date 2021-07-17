const nodemailer = require('../config/nodemailer')

//another way of exporting the method
exports.newComment = (comment)=>{
    // console.log('inside newComment mailer',comment)
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs')

    nodemailer.transport.sendMail({
        from: 'faltuMail4u@gamil.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        // html:'<h1> Yup,your comment published </h1>'
        html:htmlString
    },(err,info)=>{
        if(er){console.log('Error on sending mail',err)
    return;}
    console.log('Message sent', info)
    return;
    })
}