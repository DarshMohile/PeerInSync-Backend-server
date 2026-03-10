const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    connectionTimeout: 10000,
    family: 4,
    auth: {
        user: process.env.EMAIL_MAILER,
        pass: process.env.PASS_MAILER
    }
});

const sendLoginMail = async (email, username, ip, device) => {
    try
    {

        const mailOptions = {
            from: `"Peer In Sync Security" <${process.env.EMAIL_MAILER}>`,
            to: email,
            subject: 'New Login Detected',
    
            html:`
                <h2>Hello ${username}</h2>
                <p>A new login to your account was detected.</p>
    
                <p><strong>Login details:</strong></p>
                <ul>
                    <li>Time: ${new Date().toLocaleString()}</li>
                    <li>IP Address: ${ip}</li>
                    <li>Device: ${device}</li>
                </ul>
    
                <p>If this was you, you can ignore this email.</p>
                <p>If not, please reset your password immediately.</p>
    
                <br/>
                <small>This is an automated security email.</small>
            `
        }
    
        await transporter.sendMail(mailOptions);
        console.log('Login Email sent');
    }
    catch(err)
    {
        console.log('Error sending login email: ', err);
    }
}

module.exports = sendLoginMail;