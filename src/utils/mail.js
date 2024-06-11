import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmail = async (fullName, email, link) => {
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
      intro: 'Welcome to Gadget-Galaxy! We\'re very excited to have you on board.',
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
    subject: "Verify your Email",
    html: emailBody,
    text: emailText
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("Failed to send Email, ERROR: ", error);
  }
};


export { sendEmail };