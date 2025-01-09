import nodemailer from 'nodemailer';

// Create email template function
const createEmailTemplate = (email, subject, message) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Us Response</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
                line-height: 1.6;
            }
            .footer {
                margin-top: 20px;
                font-size: 0.8em;
                text-align: center;
                color: #888;
            }
            .divider {
                height: 1px;
                background-color: #e0e0e0;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>New Contact Form Submission</h1>
            <div class="divider"></div>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            
        </div>
    </body>
    </html>
  `;
};

// Controller to handle contact form submissions
export const contactUs = async (req, res) => {
  const { email, subject, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email service
    auth: {
      user: process.env.EMAIL, // your email address
      pass: process.env.EMAIL_PASSWORD, // your email password or app password
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL, // where you want to receive the message
    subject: subject,
    html: createEmailTemplate(email, subject, message), // Use the HTML template
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
};
