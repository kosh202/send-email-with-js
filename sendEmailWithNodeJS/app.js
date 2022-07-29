require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const user = process.env.email_01;
const pass = process.env.pass_01;

const email_send = process.env.email_02;

app.get("/send-email", async (req, res) => {// se colocar post  n seria possivel acessar pelo site

    var transport = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        auth: {
          user: user,
          pass: pass
        }
      });

      var message = {
        from: user,
        to: email_send,
        subject: "test2",
        text: "Plaintext version of the message",
        html: "<p>vendo se funciona com o env</p>"
      };

      transport.sendMail(message, function (err){
        if(err) return res.status(400).json({
            erro: true,
            mensagem: "erro: email nao enviado com sucesso"
        })
      });
      

    return res.json({
        erro: false,
        mensagem: "email enviado com sucesso!"
    })
})

app.listen(8080, () => {
    console.log("servidor iniciado na porta 8080: http://localhost:8080");
})