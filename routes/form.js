import express from "express"
const router = express.Router()
import transport from "../config/nodemailer.js"

//importamos dos  (bady y validationResult) de express-validator
import validator from "express-validator";
const { body, validationResult } = validator
const validationRules = [
  body("name")
    .notEmpty().withMessage("Campo obligatorio")
    .isLength({ min: 2, max: 30 }).withMessage("min2, max 30"),
  body("lastName")
    .notEmpty().withMessage("Campo obligatorio")
    .isLength({ min: 2, Max: 30 }).withMessage("min2, max 30"),
  body("email").isEmail().withMessage("Debe Ingresar un email Valido"),
    body("message")
        .notEmpty().withMessage("")
        .trim(" ")
    .isLength({min:10, max:300}).withMessage("Mensaje debe contener entre 10 y 300 carcteres")
]
// ruta raiz manejado por router formulario
router.get("/", (req, res) => {
  res.render("form");
});
router.post("/", validationRules ,async (req, res) => {
    //Aqui se atraparan los popsibles errores del formulario validado
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formData = req.body;
        const arrWarnings = errors.array();
        res.render("form",{arrWarnings, formData})
    } else {
            const { name, lastName, email, message } = req.body;
            const emailMsg = {
                to: "atencioncliente@nuestraempresa.com",
                from: email,
                subject: "Mensaje desde formulario",
                html: `Contacto de  ${name} ${lastName} : ${message}`
            }
            const sendMailStatus = await transport.sendMail(emailMsg)
            let sendMailfeddback = "";
          
            if (sendMailStatus.rejected.length) {
                sendMailfeddback = "No se envio el Mensaje";
            } else {
                sendMailfeddback = "Mensaje enviado";
            }
            res.render("home", {message: sendMailfeddback})
            }
    })
export default router
