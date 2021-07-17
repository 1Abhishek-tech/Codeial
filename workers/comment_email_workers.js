const queue = require('../config/kue')

const commentMailer = require('../mailer/comments_mailer')

queue.process('emails', function(job,done){
    console.log('Emails worker is processing a job',job.data)
    commentMailer.newComment(job.data)

    done();
})