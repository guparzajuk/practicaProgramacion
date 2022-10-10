import * as dotenv from "dotenv"; // consulte https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});
export default transport;
