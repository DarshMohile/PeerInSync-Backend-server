const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: /*587*/2525,
    secure: false,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS
    }
});


transporter.verify(function (error, success)
{
    if (error)
        {
              console.log(error);
                  }
                      else
                          {
                                console.log("Server is ready to send emails");
                                    }
                                    });


const sendLoginMail = async (email, username, ip, device, loc, coords, postal) => {
    try
    {

        const mailOptions = {
            from: `"Peer In Sync Security" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'New Login Detected',
    
            html:`
                <h2>Hello ${username}</h2>
                <p>A new login to your account was detected.</p>
    
                <p><strong>Login details:</strong></p>
                <ul>
                    <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
                    <li><strong>IP Address:</strong> ${ip}</li>
                    <li><strong>Device:</strong> ${device}</li>
                    <li><strong>Location:</strong> ${loc}</li>
                    <li><strong>Coordinates:</strong> ${coords}</li>
                    <li><strong>Postal Code:</strong> ${postal}</li>
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