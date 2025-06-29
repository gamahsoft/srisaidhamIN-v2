import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

// console.log('sendgrid api key', process.env.SENDGRID_API_KEY)

export const sendEmail = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: ["gamahsoft@gmail.com"], // Change to your recipient
    from: "sam@digitalseva.us", // Change to your verified sender
    subject: "Your password reset token (valid for 10 minutes)",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  // sgMail
  // 	.send(msg)
  // 	.then(() => {
  // 		console.log('Email sent')
  // 	})
  // 	.catch((error) => {
  // 		console.error(error)
  // 	})
};

export function sendTemplateEmail(to, from, templateId, url, devotee) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: to, // Change to your recipient
    from: { name: "saidham", email: from }, // Change to your verified sender
    subject: "Your password reset token (valid for 15 minutes)",
    templateId,
    dynamic_template_data: {
      url: url,
      devotee,
    },
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("Email sent", { templateId });
      console.log("response", response);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function sendNodeEmail(body, res, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE, //comment this line if you use custom server/domain
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify((err, success) => {
    if (err) {
      res.status(403).send({
        message: `Error happen when verify ${err.message}`,
      });
      console.log("fatal error1 sending email auth.js");
      console.log(err.message);
    } else {
      console.log("Server is ready to take our messages: ");
    }
  });

  transporter.sendMail(body, (err, data) => {
    if (err) {
      res.status(403).send({
        message: `Error when sending email ${err.message}`,
      });
    } else {
      res.status(202).send({
        message: `Email Sent, Please check your email inbox or junk folder`,
      });
    }
  });
}
