import express from "express"
const router = express.Router()
import validationRules from "./validators/validationsrules.js";
import transport from "../config/nodemailer.js"

//importamos dos  (bady y validationResult) de express-validator
import validator from "express-validator";
const { validationResult } = validator;

// ruta raiz manejado por router formulario
router.get("/", (req, res) => {
  res.render("form");
});
router.post("/", validationRules ,async (req, res) => {
    //Aqui se atraparan los popsibles errores del formulario validado
 
            const { name, lastName, email, message } = req.body;
            const emailMsg = {
                to: "atencioncliente@nuestraempresa.com",
                from: email,
                subject: "Mensaje desde formulario",
                html: `Contacto de  ${name} ${lastName} : ${message}`
            }
            const sendMailStatus = await transport.sendMail(emailMsg)
        
            if (sendMailStatus.rejected.length) {
                req.app.locals.sendMailFeedback = "No se envio el Mensaje";
            } else {
                req.app.locals.sendMailFeedback = "Mensaje enviado";
            }
            res.redirect("/")
            }
    )
export default router
