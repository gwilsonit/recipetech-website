const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const mailOptions = {
    from: `"${process.env.FORM_NAME}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `New Contact Form Submission from ${process.env.FORM_NAME}`,
    text: `
Name: ${process.env.FORM_NAME}
Email: ${process.env.FORM_EMAIL}
Message:
${process.env.FORM_MESSAGE}
`
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
        process.exit(1);
    } else {
        console.log('Email sent:', info.response);
    }
});
