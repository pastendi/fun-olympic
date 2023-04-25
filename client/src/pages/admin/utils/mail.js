const nodemailer = require('nodemailer')

const sendResetLink = async (sent_to, sent_from, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const messageDetail = {
    from: sent_from,
    to: sent_to,
    subject: 'Password reset',
    html: `<p>It has come to notice that you have requested to reset password. So, now you can reset your password by clicking on this <a href="http://localhost:3000/resetPassword/${token}">reset link</a></p><br/>
    <p>Regards, fun olympic team</p>`,
  }

  transporter.sendMail(messageDetail, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}
const sendMessage = async (sent_to, sent_from, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const messageDetail = {
    from: sent_from,
    to: sent_to,
    subject: subject,
    html: message,
  }

  transporter.sendMail(messageDetail, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

module.exports = { sendResetLink, sendMessage }
