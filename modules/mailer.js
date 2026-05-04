const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: /*587*/2525,
    secure: false,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS
    }
});


transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Server is ready to send emails");
    }
});


const sendLoginMail = async (email, username, ip, device, loc, coords, postal) => {
    try {
        const loginTime = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short"
        }) + " IST";

        const mailOptions = {
            from: `"Peer In Sync Security" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'New Login Detected',

            html: `
            <div style="background-color:#f8e7d1; padding: 10px; border: 2px solid black; border-radius: 10px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                <center style="font-size: 30px;">Peer In Sync Security</center>

                <h2>Hello <span style="color:#0080FF;">${username}</span></h2>

                <p style="background-color:#F73535; color:#FFFFFF; padding:8px;">
                    A new login to your account was detected.
                </p>

                <p><strong>Login details:</strong></p>

                <ul>
                    <li><strong>Time:</strong> ${loginTime}</li>
                    <li><strong>IP Address:</strong> ${ip}</li>
                    <li><strong>Device:</strong> ${device}</li>
                    <li><strong>Location:</strong> ${loc}</li>
                    <li><strong>Coordinates:</strong> ${coords}</li>
                    <li><strong>Postal Code:</strong> ${postal}</li>
                </ul>
    
                <p>If this was you, you can ignore this email.</p>
                <p>If not, please reset your password immediately. Reach out to us through our <a href="https://peer-in-sync.vercel.app/Help">Help Desk</a></p>
    
                <br/>
                <p>*This is an automated security email.</p>
            </div>
            `
        }

        await transporter.sendMail(mailOptions, { timeout: 10000 });
        console.log('Login Email sent');
    }
    catch (err) {
        console.log('Error sending login email: ', err);
    }
}


const sendEventRegisterEmail = async (event_title, event_type, host, event_time, event_date, venue_link, username) => {
    try {

        const mailOptions = {
            from: `"Peer In Sync Event Manager" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'New Login Detected',

            html: `
            <div style="background-color:#f8e7d1; padding: 20px; border: 2px solid black; border-radius: 10px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                <center style="font-size: 30px;">Peer In Sync Events Manager</center>

                <div style="
                    height: 100px;
                    background-image: linear-gradient(126deg, #cc9432 33%, #0b473b 65%);
                    background-size: cover;
                    margin-top:20px;
                    padding:20px;
                    color:white;
                    background-position: right;
                    background-repeat: no-repeat;
                    border-radius: 10px;
                ">
                    <h2>Hello, ${username}!</h1>
                </div>

                <p><strong>You have successfully registered for the Event!</strong></p>
                <p><strong>Event Details:</strong></p>

                <ul>
                    <li><strong>Event Name:</strong> ${event_title}</li>
                    <li><strong>Conducted By:</strong> ${host}</li>
                    <li><strong>Date:</strong> ${event_date}</li>
                    <li><strong>Time:</strong> ${event_time}</li>
                    <li><strong>Type:</strong> ${event_type}</li>
                    <li><strong>Venue / Link:</strong> ${venue_link}</li>
                </ul>
    
                <p>If this was not you, please reset your password immediately. Reach out to us through our <a href="https://peer-in-sync.vercel.app/Help">Help Desk</a></p>
    
                <br/>
                <p>*This is an automated notification email.</p>
            </div>
            
            `
        }

        await transporter.sendMail(mailOptions, { timeout: 10000 });
        console.log('Login Email sent');
    }
    catch (err) {
        console.log('Error sending login email: ', err);
    }
}


module.exports = sendLoginMail;