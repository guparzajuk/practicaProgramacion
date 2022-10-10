import validator from "express-validator"
const {body, validationResult} = validator
const validationRules = [
  body("name")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("min2, max 30"),
  body("lastName")
    .notEmpty()
    .withMessage("Campo obligatorio")
    .isLength({ min: 2, Max: 30 })
    .withMessage("min2, max 30"),
  body("email").isEmail().withMessage("Debe Ingresar un email Valido"),
  body("message")
    .notEmpty()
    .withMessage("")
    .trim(" ")
    .isLength({ min: 10, max: 300 })
        .withMessage("Mensaje debe contener entre 10 y 300 carcteres"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formData = req.body;
            const arrWarnings = errors.array();
            res.render("form", { arrWarnings, formData })
        } else return next()
    }
]
export default validationRules