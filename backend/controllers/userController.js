const dotenv = require("dotenv");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");
const dayjs = require("dayjs");
const bcryptjs = require("bcryptjs");
const jwtDecode = require("jwt-decode");
const jwt=require("jsonwebtoken")
const customParseFormat = require("dayjs/plugin/customParseFormat");
const {
  onSuccessfullRegistration,
  otpEmailForRegisteration,
  otpEmailForForgotPassword,
  sendMail,
} = require("../utils/mailService");
const { registerationOtpGenerator, forgotPasswordOtpGenerator } = require("../utils/otpService");
const { addOtp } = require("./otpController");
const Pharmacy = require("../models/pharmacyModel");
const pharmacyInventory = require("../models/pharmacyInventory");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const Laboratory = require("../models/laboratoyModel");
dayjs.extend(customParseFormat);
dotenv.config();

JWT_SECRET=process.env.JWT_SECRET

exports.loginToPortal = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });
    if (user) {
      const result = await bcryptjs.compare(password, user.password);
      if (result) {
        const token=await jwt.sign({email:user.email,username:user.username,role:user.role,userId:user._id},JWT_SECRET,{expiresIn:60*60})
        return res
          .status(200)
          .json({ message: "login successfull", userData: user ,jwtToken:token});
      } else {
        return res.status(400).json({ message: "login unsuccessfull" });
      }
    }
    return res.status(400).json({ message: "login user doesn't present" });
  } catch (error) {
    console.log(`error ${error}`);
  }
};

exports.createPatientAccount = async (req, res) => {
  try {

    // await console.log(`session ${req.sessionID}`);
    // await console.log(`user ${JSON.stringify(req.session.user)}`);
    var newPatient,savedPatient
    const userData = req.session.user;
    userData.password = await bcryptjs.hash(userData.password, 10);
    console.log(userData);
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    if (savedUser) {
          try {
            newPatient=new Patient({userId:savedUser._id}) 
            savedPatient=await newPatient.save()
            if(savedPatient){
              await onSuccessfullRegistration(userData.email);
            }   
          } catch (error) {
            const deletedUser=await User.deleteOne({email:userData.email})
            console.log(`deleted user on error ${deletedUser}`)
            res.status(400).json({ message: `error found : ${error}` });
            
          }
    }
    req.session.destroy()
    res.clearCookie("connect.sid", { path: "/" }).status(200)
    .json({
      message: `user has created the account successfully`,
      CreationStatus: true,
    });
  } catch (error) {
    res.status(400).json({ message: `error found : ${error}` });
    console.log(error)
  }
};

exports.createAccountUsingGoogle = async (req, res) => {
  try {
    const { googleToken, role } = req.body;
    const googleUserData = await jwtDecode.jwtDecode(googleToken);
    // console.log(googleUserData)
    // console.log(role)
    const newUser = new User({
      username: googleUserData.email,
      email: googleUserData.email,
      role,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      await onSuccessfullRegistration(googleUserData.email);
    }
    return res
      .status(200)
      .json({ message: "Logged in Successfull", userData: savedUser });
  } catch (error) {
    res.status(400).json({ message: `error occured : ${error}` });
  }
};

exports.loginUsingGoogle = async (req, res) => {
  try {
    const { googleToken } = req.body;
    const googleUserData = await jwtDecode.jwtDecode(googleToken);
    const user = await User.findOne({ email: googleUserData.email });
    res.status(200).json({ message: "User doesn't Presents", userData: user });
  } catch (error) {
    res.status(400).json({ message: `error occured : ${error}` });
  }
};

exports.createOTpAndSendMail = async (req, res) => {
  try {
    const { email,username } = req.body;
    // console.log(`session ${JSON.stringify(req.sessionID)}`)
    req.session.user=req.body
    // await console.log(req.body);
    const checkUserPresent=await User.findOne({$or:[{email},{username}]})
    if(checkUserPresent){
      return res.clearCookie("connect.sid", { path: "/" }).status(401).json({message:"already user exist"})
    }
    const otp = await registerationOtpGenerator();
    const addedOtp = await addOtp({ email, otp });
    if (addedOtp) {
      const success = await otpEmailForRegisteration({
        otp,
        recipientEmail: email,
      });
      if (success) {
        res.status(200).json({ message: "otp has been sent", info: success });
      } else {
        res.status(404).json({ message: "issue while sending mail" });
      }
    }
    else{
        res.status(500).json({ message: "issue on generating otp" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.forgotPasswordOtpGenerate=async (req,res)=>{
  try {
    const {email}=req.body
    const otp=await forgotPasswordOtpGenerator()
    const addedOtpEntry=await addOtp({email,otp})
    req.session.email={email}
    if(addedOtpEntry){
      const info=await otpEmailForForgotPassword({recipientEmail:email,otp})
      if(info)
        return res.status(200).json({message:"Otp has been sent"})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Issue on sending email"})
  }
}

exports.resetPassword = async (req, res) => {
  try {

    // await console.log(`session ${req.sessionID}`);
    // await console.log(`user ${JSON.stringify(req.session.user)}`);
    // const userData = req.session.user;
    const {email,password}=req.body
    hashedPassword = await bcryptjs.hash(password, 10);
    const passwordUpdated = await User.findOneAndUpdate({email},{password:hashedPassword})
    console.log(passwordUpdated)
    if (passwordUpdated) {
      await sendMail({
        to:email,
        body:`<p>Hi,<br/><br/>Your password has been updated. <br/><br/>by,<br/>HealthCompanion</p>`,
        subject:`Password Reset`
      });
    }
    req.session.destroy()
    res.clearCookie("connect.sid", { path: "/" }).status(200)
    .json({
      message: `user has created the account successfully`,
      CreationStatus: true,
    });
  } catch (error) {
    res.status(400).json({ message: `error found : ${error}` });
    console.log(error)
  }
};

exports.createPharmacyAccount = async (req, res) => {
  try {

    // await console.log(`session ${req.sessionID}`);
    // await console.log(`user ${JSON.stringify(req.session.user)}`);
    var newPharmacy,savedPharmacy;
    const userData = req.session.user;
    userData.password = await bcryptjs.hash(userData.password, 10);
    console.log(userData);
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    if (savedUser) {
      try {
        newPharmacy=new Pharmacy({userId:savedUser._id}) 
        savedPharmacy=await newPharmacy.save()
        if(savedPharmacy){
          await onSuccessfullRegistration(userData.email);
        }   
      } catch (error) {
        const deletedUser=await User.deleteOne({email:userData.email})
        console.log(`deleted user on error ${deletedUser}`)
        res.status(400).json({ message: `error found : ${error}` });
        
      }
      
    }
    req.session.destroy()
    res.clearCookie("connect.sid", { path: "/" }).status(200)
    .json({
      message: `user has created the account successfully`,
      CreationStatus: true,
    });
  } catch (error) {
    res.status(400).json({ message: `error found : ${error}` });
    console.log(error)
  }
};

exports.createLaboratoryAccount = async (req, res) => {
  try {

    // await console.log(`session ${req.sessionID}`);
    // await console.log(`user ${JSON.stringify(req.session.user)}`);
    var newLaboratory,savedLaboratory;
    const userData = req.session.user;
    userData.password = await bcryptjs.hash(userData.password, 10);
    console.log(userData);
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    if (savedUser) {
      try {
        newLaboratory=new Laboratory({userId:savedUser._id}) 
        savedLaboratory=await newLaboratory.save()
        if(savedLaboratory){
          await onSuccessfullRegistration(userData.email);
        }   
      } catch (error) {
        const deletedUser=await User.deleteOne({email:userData.email})
        console.log(`deleted user on error ${deletedUser}`)
        res.status(400).json({ message: `error found : ${error}` });
        
      }
      
    }
    req.session.destroy()
    res.clearCookie("connect.sid", { path: "/" }).status(200)
    .json({
      message: `user has created the account successfully`,
      CreationStatus: true,
    });
  } catch (error) {
    res.status(400).json({ message: `error found : ${error}` });
    console.log(error)
  }
};

exports.createDoctorAccount = async (req, res) => {
  try {

    // await console.log(`session ${req.sessionID}`);
    // await console.log(`user ${JSON.stringify(req.session.user)}`);
    var newDoctor,savedDoctor
    const userData = req.session.user;
    userData.password = await bcryptjs.hash(userData.password, 10);
    console.log(userData);
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    if (savedUser) {
          try {
            newDoctor=new Doctor({userId:savedUser._id}) 
            savedDoctor=await newDoctor.save()
            if(savedDoctor){
              await onSuccessfullRegistration(userData.email);
            }   
          } catch (error) {
            const deletedUser=await User.deleteOne({email:userData.email})
            console.log(`deleted user on error ${deletedUser}`)
            res.status(400).json({ message: `error found : ${error}` });
            
          }
    }
    req.session.destroy()
    res.clearCookie("connect.sid", { path: "/" }).status(200)
    .json({
      message: `user has created the account successfully`,
      CreationStatus: true,
    });
  } catch (error) {
    res.status(400).json({ message: `error found : ${error}` });
    console.log(error)
  }
};

exports.resetPasswordFromProfile = async (req, res) => {
  try {

    // await console.log(`session ${req.sessionID}`);
    // await console.log(`user ${JSON.stringify(req.session.user)}`);
    // const userData = req.session.user;
    const {email,password}=req.body
    hashedPassword = await bcryptjs.hash(password, 10);
    const passwordUpdated = await User.findOneAndUpdate({email},{password:hashedPassword})
    // console.log(passwordUpdated)
    if (passwordUpdated.modifiedCount>0) {
      await sendMail({
        to:email,
        body:`<p>Hi,<br/><br/>Your password has been updated. <br/><br/>by,<br/>HealthCompanion</p>`,
        subject:`Password Reset`
      });
    }
    res.status(200)
    .json({
      message: `user has created the account successfully`,
      CreationStatus: true,
    });
  } catch (error) {
    res.status(500).json({ message: `error found : ${error}`,errorServer:true });
    console.log(error)
  }
};


exports.createAdminAccount = async (req, res) => {
  try {

    // await console.log(`session ${req.sessionID}`);
    // await console.log(`user ${JSON.stringify(req.session.user)}`);
    // var newLaboratory,savedLaboratory;
    // const userData = req.session.user;
    const {username,email,password,phone}=req.body
    // userData.password = await bcryptjs.hash(userData.password, 10);
    const hashedPassword = await bcryptjs.hash(password, 10);
    // console.log(userData);
    const newUser = new User({username,password:hashedPassword,phone,email});
    const savedUser = await newUser.save();
    // if (savedUser) {
    //   try {
    //     newLaboratory=new L({userId:savedUser._id}) 
    //     savedLaboratory=await newLaboratory.save()
    //     if(savedLaboratory){
    //       await onSuccessfullRegistration(userData.email);
    //     }   
    //   } catch (error) {
    //     const deletedUser=await User.deleteOne({email:userData.email})
    //     console.log(`deleted user on error ${deletedUser}`)
    //     res.status(400).json({ message: `error found : ${error}` });
        
    //   }
      
    // }
    // req.session.destroy()
    // res.clearCookie("connect.sid", { path: "/" }).status(200)
    // .json({
    //   message: `user has created the account successfully`,
    //   CreationStatus: true,
    // });
    if (savedUser) {
      return res.status(200)
      .json({
        message: `user has created the account successfully`,
        CreationStatus: true,
      });

    }
    res.status(400)
      .json({
        message: `user hasn't been created `
      });

   
  } catch (error) {
    res.status(400).json({ message: `error found : ${error}` });
    console.log(error)
  }
};



