const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chaudhary2527@gmail.com', // your Gmail account email
      pass: '@sachin2511' // your Gmail account password
    }
  });

  const mailOptions = {
    from: email,
    to: 'editingsk6@gmail.com', // recipient email
    subject: subject,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
