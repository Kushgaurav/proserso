const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'sales.support@proserso.com',
        pass: process.env.EMAIL_PASSWORD // This should be set in your environment variables
    }
});

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log('SMTP Server connection error:', error);
    } else {
        console.log('SMTP Server is ready to handle messages');
    }
});

const sendContactEmail = async (contactData) => {
    try {
        const mailOptions = {
            from: '"Proserso Contact Form" <sales.support@proserso.com>',
            to: 'sales.support@proserso.com',
            replyTo: contactData.email,
            subject: `New Contact Form Submission: ${contactData.subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${contactData.name}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
                <p><strong>Company:</strong> ${contactData.company || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${contactData.subject}</p>
                <h3>Message:</h3>
                <p>${contactData.message}</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendContactEmail
};