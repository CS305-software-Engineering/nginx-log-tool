require('dotenv').config();

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const log = console.log;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL2,  
        pass: process.env.PASSWORD2 
    }
});

transporter.use('compile', hbs({
   viewEngine: {
       partialsDir: "./",
       defaultLayout: ""
   },
   viewPath:"./",
   //extName:".hbs"
}));


let mailOptions = {
    from: process.env.EMAIL2, 
    to: 'sacsham.gupta17@gmail.com', 
    cc: '',
    bcc: '',
    subject: 'sendemail - Test',
    //text: 'it works!!',
    attachments: [
       {filename : '2.jpg', path : './2.jpg'}
    ],
    template: 'index',
    context: {
       name: 'nginx notification'
    } // send extra values to template
};

transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!');
});