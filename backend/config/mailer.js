import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 587,
  secure: false, // true for TLS, false for SSL
  auth: {
    user: "info@sevensquaregroup.in",
    pass: "123@Sevensquare",
  },
});

// create the message object

const sendMail = (mailId, name, sponserid, password) => {
  const recipient = mailId;

  const message = {
    from: `SEVENSQUARE GROUP <info@sevensquaregroup.in>`,
    to: `${recipient}`,
    subject: `Hi ${name}, Registration successful.`,
    text: `Hi ${name}, Welcome to SEVENSQUARE`,
    html: `<h4>Congrats! You have joined the SEVENSQUARE Group.</h4><p>Your sponserID is <strong>${sponserid}</strong><br/>Username: ${name}<br />Password: ${password}</p>`,
  };

  // send the email
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return;
    }

    console.log(`Message sent: ${info.messageId}`);
  });
};

export default sendMail;
