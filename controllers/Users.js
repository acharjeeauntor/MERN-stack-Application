const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/Users");
const JWT_SECRET = require("../config/Keys").secretOrKey;
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateChangePasswordInput = require("../validation/changePassword");
const validateResetEmailInput = require("../validation/resetEmail");
const validateResetPasswordInput = require("../validation/resetPassword");
//import jwt_decode from 'jwt-decode';

// signToken = (user) => {
//   return JWT.sign(
//     {
//       iss: "Budget App",
//       sub: user.id
//     },
//     JWT_SECRET,
//     { expiresIn: 3600 }
//   );
// };



signToken = (user) => {

if(user.method=='local'){
  return JWT.sign(
    {
      iss: "Budget App",
      sub: user.id,
      username:user.local.name
    },
    JWT_SECRET
  );
}else{
  return JWT.sign(
    {
      iss: "Budget App",
      sub: user.id,
       username:user.local.name
    },
    JWT_SECRET
  );
}








};

//Config of nodemailer
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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"
    }
  })
);

//For new User Register
exports.userRegistration = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm"
  });

  User.findOne({ "local.email": email })
    .then((user) => {
      if (user) {
        errors.email = "Email Already Exists";
        return res.status(400).json(errors);
      } else {
        bcrypt
          .hash(password, 10)
          .then((hassedPassword) => {
            const newUser = new User({
              method: "local",
              local: {
                name,
                email,
                password: hassedPassword,
                avatar
              }
            });
            newUser
              .save()
              .then((user) => {
                res.status(200).json(user);

                //send a Confirmation or Welcome email
                transporter.sendMail({
                  to: email,
                  from: "bugetapp@gmail.com",
                  subject: "Confirmation of new account",
                  html: `
            <div class="container">
            <h3>Welcome to Budget App</h3>
            <p>Click this <a href="http://localhost:3000/login">link</a> to Login.</p>
            </div>
          `
                });
              })
          })
      }
    })
    .catch((err) => console.log(err));
};

//For User Login
exports.loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ "local.email": email })
    .then((user) => {
      if (!user) {
        errors.email = "This user not register";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.local.password).then((isMatch) => {
        if (!isMatch) {
          errors.password = "Password Incorrect";
          return res.status(404).json(errors);
        }
        const token = signToken(user);
        //console.log(jwt_decode(token));
        return res.status(200).json({ token });
      });
    })
    .catch((err) => console.log(err));
};

exports.googleOAuth = (req, res) => {
  // Generate token
  const token = signToken(req.user);
  res.status(200).json({ token });
};

exports.facebookOAuth = (req, res) => {
  // Generate token
  const token = signToken(req.user);
  res.status(200).json({ token });
};

exports.getDashboard = (req, res) => {
  res.json({ userId: req.user.id, success: true });
};

//for current user login
exports.loginCurrentUser = (req, res) => {
  const { local, google, facebook } = req.user;
  if (JSON.stringify(local) !== "{}") {
    return res.json({
      name: local.name,
      email: local.email,
      avatar: local.avatar,
      type: "local"
    });
  } else if (JSON.stringify(google) !== "{}") {
    return res.json({
      name: google.name,
      email: google.email,
      avatar: google.avatar,
      type: "google"
    });
  } else if (JSON.stringify(facebook) !== "{}") {
    return res.json({
      name: facebook.name,
      email: facebook.email,
      avatar: facebook.avatar,
      type: "facebook"
    });
  }
};

exports.changePassword = (req, res) => {
  const { errors, isValid } = validateChangePasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;
  //find by id
  User.findById(id)
    .then((user) => {
      //if the user is local then
      bcrypt.compare(oldPassword, user.local.password).then((isMatch) => {
        if (!isMatch) {
          //if old password dose not match
          errors.oldPassword =
            "Old Password Incorrect,Please Enter Correct Password!";
          return res.status(401).json(errors);
        } else {
          //hassed new password
          bcrypt.hash(newPassword, 10).then((hassedPassword) => {
            //store and save the new password on database
            user.local.password = hassedPassword;
            user
              .save()
              .then((user) => res.status(200).json({ message: "Successfully Change Password Done." }))
              .catch((err) => console.log(err));
          });
        }
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteMyAccount = (req, res) => {
  const { id } = req.user;
  User.findByIdAndDelete(id)
    .then((user) => {
    res.json({success:true})
    })
    .catch((err) => console.log(err));
};

exports.resetPassword = (req, res) => {
  const { errors, isValid } = validateResetEmailInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  //Ganarate the token
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ "local.email": email })
      .then((user) => {
        if (!user) {
          errors.email = "This user is not Registered";
          return res.status(404).json(errors);
        }
        user.local.resetToken = token;
        user.local.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        transporter.sendMail({
          to: email,
          from: "bugetapp@gmail.com",
          subject: "Password reset",
          html: `
      <div class="card-body">
        <h5 class="card-title">You requested a password reset</h5>
        <p class="card-text">Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
        <p class="card-text"><small class="text-muted">This link is valid only for 1 hour..</small></p>
      </div>
          `
        });
        res.json({success:true})
      })
      .catch((err) => console.log(err));
  });
};

exports.setNewPassword = (req, res) => {
  const { errors, isValid } = validateResetPasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { token, newPassword } = req.body;

  User.findOne({
    "local.resetToken": token,
    "local.resetTokenExpiration": { $gt: Date.now() }
  })
    .then((user) => {
      if (!user) {
        //console.log("no user found");
        errors.resetToken =
          "Reset Token Invalid,Please again go to forgot password";
        return res.status(404).json(errors);
      }
      bcrypt
        .hash(newPassword, 12)
        .then((hassedPassword) => {
          (user.local.password = hassedPassword),
            (user.local.resetToken = undefined),
            (user.local.resetTokenExpiration = undefined);
          return user.save();
        })
        .then((result) => {
          res.json({ success: true });
        });
      //console.log(user);
    })
    .catch();
};
