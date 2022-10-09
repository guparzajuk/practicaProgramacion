import express from "express"
const router = express.Router()

import nodemailer from "nodemailer";


// ruta raiz manejado por router formulario
router.get("/", (req, res) => {
  res.render("form");
});
router.post("/", async (req, res) => {
    const { name, lastName, email, message } = req.body;
    const emailMsg = {
        to: "atencioncliente@nuestraempresa.com",
        from: email,
        subject: "Mensaje desde formulario",
        html: `Contacto de  ${name} ${lastName} : ${message}`
    }
    //codigo inseguro con variables de entorno
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });
    //no es verdad que el mensaje es checado hay que recibir una respuesta del servidor
    const sendMailStatus = await transport.sendMail(emailMsg)
    let sendMailfeddback = "";
    //rejected.length busca que la respuesta tenga un array vacio, si tiene lengthg es por que hay error  entonces No se entrego el mensaje
    if (sendMailStatus.rejected.length) {
        sendMailfeddback = "No se envio el Mensaje";
    } else {
        sendMailfeddback = "Mensaje enviado";
    }
    res.render("home", {message: sendMailfeddback})
    })
    

export default router
