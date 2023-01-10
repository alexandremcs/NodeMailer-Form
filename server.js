const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {

    const transporter = nodemailer.createTransport({
        host: '${process.env.MAIL_HOST}',
        service: '${process.env.MAIL_HOST}',
        port: 587,
        secure: false,
        auth: {
            user: '${process.env.MAIL_USER}',
            pass: '${process.env.MAIL_PASSWORD}'
        }
    });
  
  const mailOptions = {
    from: req.body.email,
    to: 'alexandre@alexsantos.com.br',
    subject: 'Cadastro de ${req.body.email}',
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