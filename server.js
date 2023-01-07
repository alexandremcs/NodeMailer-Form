const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/send-email', (req, res) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'alexandre@alexsantos.com.br',
            pass: 'Amcs@0000'
            // user: process.env.MAIL_USER,
            // pass: process.env.MAIL_PASSWORD
        }
    });
  
  const mailOptions = {
    from: 'alexandre@alexsantos.com.br',
    to: req.body.email,
    subject: 'Assunto do Email',
    text: req.body.message
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Ocorreu um erro ao enviar o email.');
    } else {
      console.log(`Email enviado: ${info.response}`);
      res.send('Email enviado com sucesso!');
    }
  });
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});