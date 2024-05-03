import nodemailer from "nodemailer";

export const MailService = async (emailTo, emailMessage,emailText,message) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
        <style>
            .container {
                height: 500px;
                width: 700px;
                margin: 0 auto; /* Center the container horizontally */
                background-color: rgb(171, 141, 141);
            }

            .companyHeading {
                height: 50px;
                font-size: 25px;
                color: rgb(255, 255, 255);
                background-color: rgb(0, 0, 0);
                line-height: 50px; /* Vertically center the text */
                text-align: center;
            }

            .message {
                font-size: 18px;
                padding: 30px; /* Adjust as needed */
                text-align: left;       
                color:black;
            }

            .resetButton {
                text-align: center;
            
            }

            .custom-btn {
                width: 160px;
                height: 40px;
                color: #fff;
                border-radius: 5px;
                padding: 10px 25px;
                font-family: 'Lato', sans-serif;
                font-weight: 500;
                background: linear-gradient(0deg, rgba(96, 9, 240, 1) 0%, rgba(129, 5, 240, 1) 100%);
                border: none;
                cursor: pointer;
                outline: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="companyHeading">Igenerate</div>
            <div class="message">
                <p>Subject: ${emailMessage}</p>
                <p>Dear User,</p>
                <p>To reset your password, click the button below and follow the instructions on the page.</p>
                <p>If you didn't request this, ignore this email.</p>
                <p>Thanks,</p>
                <p>${emailText}</p>
            </div>
            <div class="resetButton">
                <a href="/resetpassword">
                    <button class="custom-btn">Reset Password</button>
                </a>
            </div>
        </div>
    </body>
    </html>`;
 

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD ,
    },
  });
  const info = await transporter.sendMail({
    from: '"Rajesh Bhai matre 👻" <matrerajesh.igenerate@gmail.com>',
    to: emailTo,
    subject: emailMessage,  
    text:emailText,
    html: htmlTemplate,
  });

  return info.accepted;
};
