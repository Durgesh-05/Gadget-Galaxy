import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmailForResetPassword = async (fullName, email, link, resetPasswordToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.USER_EMAIL}`,
      pass: process.env.PASSWORD,
    }
  });

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: 'Gadget-Galaxy',
      link: 'https://www.google.com'
    }
  });

  const emailFormat = {
    body: {
      name: fullName,
      intro: `Welcome to Gadget-Galaxy! We\'re very excited to have you on board. This is the Reset Password Token: ${resetPasswordToken}`,
      action: {
        instructions: 'To get started with Gadget-Galaxy, please click here:',
        button: {
          color: '#22BC66',
          text: 'Verify your account',
          link: link
        }
      },
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
  };

  const emailBody = mailGenerator.generate(emailFormat);
  const emailText = mailGenerator.generatePlaintext(emailFormat);

  const mailOptions = {
    from: "durgesh.d1805@gmail.com",
    to: email,
    subject: "Reset your password",
    html: emailBody,
    text: emailText
  };
  await transporter.sendMail(mailOptions);
  console.log("Email Sent Successfully");
};


export { sendEmailForResetPassword };