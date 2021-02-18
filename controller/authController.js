const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
var validate = require("validate.js");
const userModel=require('../model/userModel')

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "notification.ekluvya@gmail.com",
    pass: "ekluvya@123coaching",
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("error in setting transporter", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

/////////------ User SignUp ----////////////////

exports.Signup = (req, res) => {
  const { name, email, password, mobile} = req.body;
 // const mobileNumber = req.body.mobileNumber ? req.body.mobileNumber : null;
  /**  name:string, 
    mobileNumber:number,
    password:string,
   */
  // validation
  let validation = validate(req.body, {
    name: {
      presence: true,
      format: {
        pattern: "^([a-zA-z]*\\s*)*[a-zA-z]$",
        message:
          "Enter full name and it can only contain alphabets and space in between",
      },
    },
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
      length: { minimum: 6, message: "password must be 8 characters long" },
    },
  });
  if (validation) {
    res.status(400).json({ error: validation });
    return console.log(validation);
  } else {
    userModel.findOne({ email: email }).then((user) => {
      if (user) {
        res.status(404).json({ error: "email Address is already taken" });
      } else {
        bcryptjs.hash(password, 12).then((hashedpassword) => {
          let newStudent = new userModel({
            email: email,
            password: hashedpassword,
            name: name,
            mobile: mobile,
          });
        //  console.log('done');
          newStudent
            .save()
            .then((user) => {
             // console.log(user);
              const token = jwt.sign(
                { secretId: user.uId },
                process.env.JWT_SECRET
              );
              res.json({
                message: "signUp successfully",
              });
            })
            .catch((err) => {
              //   console.log(err.message)
              res.status(404).json({ error: err.message });
            });
        });
      }
    });
  }
};
/////////------ User SignIn ----////////////////
exports.Signin = (req, res) => {
  const { email, password } = req.body;
  let validation = validate(req.body, {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
    },
  });

  if (validation) {
    res.status(400).json({ error: validation });
    return console.log(validation);
  } else {
    userModel.findOne({ email: email }).then((user) => {
      if (user) {
        // console.log(password,user.password)
        bcryptjs
          .compare(password, user.password)
          .then((ifSame) => {
            //if user is normal user
            if (ifSame) {
              let md5 = require("md5");
              let userId = md5(user._id);
              const token = jwt.sign(
                { secretId: userId },
                process.env.JWT_SECRET
              );
              res.json({
                message: "SignSuccess",
                token: token,
                email: user.email,
                name: user.name,
                userId:user._id
              });
            } else {
              res.status(400).json({ error: "Invalid password" });
            }
          })
          .catch((err) => {
            console.log("error in comparing password", err);
          });
      } else {
        res
          .status(404)
          .json({ error: "User not found of " + email + " address" });
      }
    });
  }
};

exports.ForgetPassword = (req, res) => {
  var otpGenerator = require('otp-generator')
   let ResetOTP=otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false });
  //     console.log(ResetOTP);
      userModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User doesn't exist" });
        } else {
          user.otp = ResetOTP;
        //  user.expireToken = Date.now() + 3600000;
          user.save().then((r) => {
            transporter.sendMail({
              to: user.email,
              from: "forgotpassword2gmail.com",
              subject: "Otp ",
              html: `

              <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html xmlns="http://www.w3.org/1999/xhtml">
              <head>
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
                  <link rel="preconnect" href="https://fonts.gstatic.com">
                  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap" rel="stylesheet">
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <title>Forgot Password</title>
                  <style>
                      body {
                          background-color: #FFFFFF; 
                          padding: 0; margin: 0;
                          font-family: 'Open Sans', sans-serif;
                          font-weight: 600;
                       color:   #505050
                      }
                      tr .span{
                          color: #354A21;
                          box-shadow: 0px 0px 4px 0px grey;
                      }
                      tr .span span{
                          color: #354A21;
                          font-size: 14px;
                         
                      }
                      .resetButton{
                          background: transparent;
                font-family: 'Montserrat', sans-serif;
                font-style: normal;
                font-weight: 600;
                font-size: 12px;
                color: #728B6B;
                text-align: center;
                border: 2px solid #728B6B ;
                transition: 0.5s !important;
                border-radius: 50px;
                letter-spacing: 1px;
                padding: 8px 24px !important;
                margin: 0 8px;
                cursor: pointer;
              }
              .resetButton:hover {
                
                background: #728B6B;
                color: #ffffff !important;
              
              
              }
              tr .resetButton a{
                  text-decoration: none;
                  color: #728b6b;
              }
              tr .resetButton a:hover{
                  color: #ffffff;
              }
                  </style>
              </head>
              <body style="background-color: #FFFFFF; padding: 0; margin: 0;">
              <table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">
                  <tr>
                      <td align="center" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">
                              <tr>
                                 
                              </tr>
                              <!-- Title -->
                              <tr>
                                  <td align="left" valign="top" colspan="2" class="text-center " style="border-bottom: 1px solid #CCCCCC; font-weight: 700; padding: 20px 0 10px 0;">
                                      <span style="font-size: 15px; font-weight: 600; ">FORGOT PASSWORD</span>
                                  </td>
                              </tr>
                              <!-- Messages -->
                              <tr>
                                  <td  class="span" align="top" colspan="2" style="padding-top: 10px;">
                                      <span style=" line-height: 1.5;">
                                          We have sent you this email in response to your request to 
                                          reset your password on Udemy. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.
                                          <br/><br/>
                                          To reset your password for please follow the link below:
                                          <br/><br/>
                                          <div class=" text-center ">
              <h1>${user.otp}</h1>
                                         
                                          </div>
                                
                                          <br/><br/>
                                          If you need help, or you have any other questions, feel free to email 
                                        Udemywebapp@gmail.com.
                                          or call Udemy customer service toll-free at <a href="tel:7489279080">7489279080</a>.
                                          <br/><br/>
                                          Udemy Customer Service
                                      </span>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
              </body>
              </html>
              
                       
`,
            });
          });
          res.json("check your email");
        }
      });
    
};

exports.verifyOTP = (req, res) => {
  var crypto=require('crypto')
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.json("something went wrong" + err);
    } else {
      const token = buffer.toString("hex");
      // console.log(token);
      userModel.findOne({ otp:req.body.otp,email:req.body.email }).then((user) => {
        if (!user) {
          return res.status(404).json({ error: "OTP doesn't match" });
        } else {
          //   console.log(user);

          user.ResetToken = token;
          user.otp=null
          user.expireToken = Date.now() + 3600000;
          user.save().then((r) => {
            res.json({ResetToken:token});
          });
        }
      });
    }
  });
};

exports.newPassword = (req, res) => {
  //console.log(req.body);
  try {
  userModel.findOne({
      ResetToken: req.body.resetToken,
      expireToken: { $gt: Date.now() },
    }).then((user) => {
      if (!user) {
        res.status(404).json("token expires");
      //  console.log("jjj", user.expireToken, Date.now());
      } else {
        console.log(req.body.password)
        bcryptjs.hash(req.body.password, 12).then((newpassword) => {
          user.password = newpassword;
          user.save().then((u) => {
            if (!u) {
              console.log("wrong");
              res.status(404).json("not changed");
            } else {
              console.log("changed");
              user.ResetToken = null;
              user.expireToken = null;
              user.otp=null
              user.save();
              res.json("successfully changed password");
            }
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};