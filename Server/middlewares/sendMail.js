import { createTransport } from 'nodemailer';

const sendMail = async (email, subject, data) => {
    const transport = createTransport({
        host: "smtp.gmail.com",  // Correct host for Gmail
        port: 465,  // SSL port (ensure this is a number, not a string)
        secure: true,  // Use SSL for the connection
        auth: {
            user: process.env.Gmail,  // Gmail account from environment variables
            pass: process.env.Password  // Gmail app-specific password
        }
    });

    // HTML content for the email
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                color: red;
            }
            p {
                margin-bottom: 20px;
                color: #666;
            }
            .otp {
                font-size: 36px;
                color: #7b68ee; /* Purple text */
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>OTP Verification</h1>
            <p>Hello ${data.name}, your One-Time Password (OTP) for account verification is:</p>
            <p class="otp">${data.otp}</p> 
        </div>
    </body>
    </html>`;

    // Sending the email
    await transport.sendMail({
        from: process.env.Gmail,  // Sender's email from environment variables
        to: email,  // Recipient's email
        subject,  // Email subject
        html  // Email content in HTML format
    });
};

export default sendMail;
