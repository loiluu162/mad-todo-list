const nodemailer = require('nodemailer');
// const htmlToText = require('html-to-text');
const { from, user, pass } = require('../../config').email;

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: user,
    pass: pass,
  },
});
const sendVerification = async (to, token) => {
  return await send(to, token, 'welcome', 'Welcome to the Mad to do list');
};
const sendPasswordReset = async (to, token) => {
  return await send(
    to,
    token,
    'passwordReset',
    'Your password reset token (valid for only 30 minutes)'
  );
};

const send = async (to, token, template, subject) => {
  const text = '12334: ' + token;
  const mailOptions = {
    from: from,
    to: to,
    subject,
    text: text,
  };
  return await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordReset, sendVerification };
