const cron = require("node-cron");
const nodemailer = require("nodemailer");

const scheduleMail = (date, receiver, eventTitle = "title", text = "text") => {
  const mailOptions = {
    from: "pankj6342@gmail.com",
    to: receiver || "psbhardwaj.psb@gmail.com",
    subject: `Event Reminder for ${eventTitle}`,
    text: text,
  };
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pankj6342@gmail.com",
      pass: "psb2401!",
    },
  });
  cron.schedule(`${Date.now() - date}* * * * * *`, () => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log({ errorInSendMail: error });
      } else {
        console.log("email sent" + info.response);
      }
    });
  });
};

module.exports = { scheduleMail };
