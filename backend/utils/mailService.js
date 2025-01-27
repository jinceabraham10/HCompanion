const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

FROM_MAIL = process.env.FROM_MAIL;
MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: FROM_MAIL,
    pass: MAIL_PASSWORD,
  },
  debug: true,
  logger: true,
});

exports.onSuccessfullRegistration = async (toMail) => {
  try {
    const info = await transporter.sendMail({
      from: FROM_MAIL,
      to: toMail,
      text: `Hi,\n\nyou have successfully created an account\n\nfrom,\n\nHealthCompanion`,
      subject:"Account Creation Successfull"
    });
    await console.log(info)
  } catch (error) {
    console.log(error);
  }
};

exports.otpEmailForRegisteration = async ({otp,recipientEmail}) => {
  try {
    const info = await transporter.sendMail({
      from: FROM_MAIL,
      to: recipientEmail,
      html: `<p>Hi,
             </p>The OTP generated is <b>${otp}</b>
             <p>by,<br/>Health Companion<p>`,
      subject:"OTP"
    });
    await console.log(info)
    return info
  } catch (error) {
    console.log(error);
  }
};

exports.otpEmailForForgotPassword = async ({otp,recipientEmail}) => {
  try {
    const info = await transporter.sendMail({
      from: FROM_MAIL,
      to: recipientEmail,
      html: `<p>Hi,
             </p>The OTP generated for forgot password is <b>${otp}</b>
             <p>by,<br/>Health Companion<p>`,
      subject:"OTP"
    });
    // await console.log(info)
    return info
  } catch (error) {
    console.log(error);
  }
};

exports.sendMail = async ({to,body,subject}) => {
  try {
    const info = await transporter.sendMail({
      from: FROM_MAIL,
      to: to,
      html: body,
      subject:subject
    });
    // await console.log(info)
    return info
  } catch (error) {
    console.log(error);
  }
};




