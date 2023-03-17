const sgMail = require('@sendgrid/mail')
const sendGridApiKey = "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"

sgMail.setApiKey(sendGridApiKey);

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'task-manager@email.com',
        subject: 'Thanks for joining task-manager.',
        text: `Welcome to task-manager app ${name}`
    })
}

const sendCancelEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'task-manager@email.com',
        subject: 'Bye Bye from task-manager',
        text: `Its sad to see ${name} leaving us. Please let us know what went wrong and how we can improve.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail

}
