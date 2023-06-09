const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thinaat282@gmail.com',
        pass: process.env.mailpassword
    }
});

function sendmail(tomail, otp) {
    const mailoptions = {
        from: 'thinaat282@gmail.com',
        to: tomail,
        subject: 'Account Verification',
        text: `Your OTP for Account Verification : ${otp}`
    };

    transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Mail Sent: ' + info.response);
        }
    })
};

module.exports = {sendmail}