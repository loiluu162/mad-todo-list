import nodemailer from 'nodemailer';
// const htmlToText = require('html-to-text');
import { emailService } from '../config/index.js';
const { from, user, pass, host } = emailService;

const transporter = nodemailer.createTransport({
  host: host,
  port: 587,
  auth: {
    user: user,
    pass: pass,
  },
});

const sendVerification = async (to, token) => {
  return await send(
    to,
    token,
    'welcome',
    'Your verification code (valid for only 60 minutes)'
  );
};

const sendPasswordReset = async (to, token) => {
  return await send(
    to,
    token,
    'passwordReset',
    'Your password reset code (valid for only 60 minutes)'
  );
};

const send = async (to, token, template, subject) => {
  const text = 'Your code: ' + token;
  const mailOptions = {
    from: from,
    to: to,
    subject,
    text: text,
  };
  return await transporter.sendMail(mailOptions);
};

export default { sendPasswordReset, sendVerification };
