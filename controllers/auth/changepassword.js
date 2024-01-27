const { ValidationError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const { Users } = require("../../models");
const {
  userMainField,
  userFieldReceivedFromFront,
  dataFilter,
} = require("../../helpers");

const changePassword = async (req, res, next) => {
  try {
    const newData = dataFilter(req.body, userFieldReceivedFromFront);
    const hashPassword = bcrypt.hashSync(
      newData.password,
      bcrypt.genSaltSync(10)
    );
    newData.password = hashPassword;
    const user = await Users.findOneAndUpdate(
      { email: newData.email },
      { $set: { password: newData.password } },
      { returnDocument: "after" }
    );
    console.log("user", user);
    const transporter = nodemailer.createTransport({
      host: "smtp.ukr.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const from = "SoFi Finance Club <vlad_np@ukr.net>";
    const to = user.email;

    transporter.sendMail(
      {
        from,
        to,
        subject: "Change password",
        html: `<h1>Hello</h1><p>Hello. Please note that you have changed the access password to the SoFi Finance Club</p><p>Hope to see you soon. <br> Wish you a nice day.</p><p>Your SoFi Finance Club support</p>`,
      },
      (err, data) => {
        if (err) {
          console.error("Error sending:", err);
        } else {
          console.log("Letter sent");
        }
      }
    );

    const newResponse = dataFilter(user, userMainField);
    return res.status(201).json(newResponse);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = changePassword;
