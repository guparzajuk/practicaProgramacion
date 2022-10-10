import hbs from "express-handlebars";
import express from "express";

const PORT = 4000;
const app = express();

import routerForm from "./routes/form.js";

//express-hbs config
app.engine(".hbs", hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

//defino la carpeta de recusrso estaticos Public
app.use(express.static("public"));

//habilitamos la lectur del formularion con el midleware urlencouder
app.use(express.urlencoded({ extended: true }))

//puerto de trabajo
app.listen(PORT, (err) => {
    !err ? console.log(`Running on http://localhost:${PORT}`): console.log(`No Funca`);
})
app.get("/", (req, res) => {
    res.render("home")
})
//configuro la ruta para para mailtrap
app.use("/form", routerForm);