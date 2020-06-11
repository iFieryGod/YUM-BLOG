const express = require('express');
const nodemailer = require('nodemailer')

let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: "bloggeryummy@gmail.com",
    pass: "xeukcxsiktgiaaxw"
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})

const router = express.Router();
module.exports = router

router.post('/mail', (req, res) => {
  transport.sendMail({
  from: 'bloggeryummy@gmail.com',
  to: `${req.body.mail}`,
  subject: 'Welcome to YumBlog 🍨',
  text: `Hello! This is you newsletter, :D`,
  html: `<b>Hello ${req.body.username}, Thank you for signing up to our newsletter. We are always happy to have a new member join our family.👨‍👩‍👦‍👦</b>`
  }).catch(console.error)
  req.flash('success_msg', 'Check your mail');
  res.redirect('/')
})