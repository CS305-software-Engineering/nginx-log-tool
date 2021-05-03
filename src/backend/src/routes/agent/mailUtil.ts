import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import * as dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NOTIFICATION_ACC_EMAIL,
        pass: process.env.NOTIFICATION_ACC_PASS,
    },
});

transporter.use(
    'compile',
    hbs({
        viewEngine: {
            partialsDir: './src/views/',
            defaultLayout: '',
        },
        viewPath: './src/views/',
    })
);

// transporter.use('con')

export const sendNotifyMail = (
    email: string,
    agentId: string,
    message: string
) => {
    const mail_options = {
        from: process.env.NOTIFICATION_ACC_EMAIL,
        to: email,
        cc: '',
        bcc: '',
        subject: `[Nginx Log Tool] Alert Update for ${agentId}`,
        template: 'email',
        context: {
            message: message,
            name: 'nginx notification',
        }, // send extra values to template
    };
    transporter.sendMail(mail_options, (err, _data) => {
        if (err) {
            console.log(`Error in sending email to ${email} and ${agentId}`);
        } else {
            console.log(`Successfully sent email to ${email} and ${agentId}`);
        }
    });
};
