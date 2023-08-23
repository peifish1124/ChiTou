require('dotenv').config();
const nodemailer = require("nodemailer");

const mailOptions = require('./email_options');


async function sendMailWithOption (options) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SYSTEM_EMAIL,
      pass: process.env.SYSTEM_EMAIL_PWD
    }
  });

  transporter.sendMail(options, function(error, info){
    if(error){
      console.log(error);
    } else {
      console.log('Email Sent Successfully: ' + info.response);
    }
  });
}

// set options and call send mail function
exports.sendAddedTripEmail = async (receivers, senderName, recipientName, tripName) => {
  const [subject, html] = mailOptions.addedTrip(senderName, recipientName, tripName);
  const options = {
    from: process.env.SYSTEM_FROM,
    to: receivers,
    subject: subject,
    html: html,
  };
  await sendMailWithOption(options);
}

exports.sendCreateTripEmail = async (receivers, senderName, tripName) => {
  const [subject, html] = mailOptions.createTrip(senderName, tripName);
  const options = {
    from: process.env.SYSTEM_FROM,
    to: receivers,
    subject: subject,
    html: html,
  };
  await sendMailWithOption(options);
}

// TODO: (opt.) implements preTrip
exports.sendPreTripEmail = async (receivers, recipientName, tripName) => {
  const [subject, html] = mailOptions.preTrip(recipientName, tripName);
  const options = {
    from: process.env.SYSTEM_FROM,
    to: receivers,
    subject: subject,
    html: html,
  };
  await sendMailWithOption(options);
}
