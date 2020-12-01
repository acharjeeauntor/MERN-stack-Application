const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../config/passport");

const userController = require("../controllers/Users");

router.post("/register", userController.userRegistration);

router.post("/login", userController.loginUser);

router.post("/resetpassword", userController.resetPassword);

router.post("/reset/setnewpassword", userController.setNewPassword);

router.post(
  "/oauth/google",
  passport.authenticate("google", { session: false }),
  userController.googleOAuth
);

router.post(
  "/oauth/facebook",
  passport.authenticate("facebook", { session: false }),
  userController.facebookOAuth
);

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  userController.getDashboard
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userController.loginCurrentUser
);

router.post(
  "/changepassword",
  passport.authenticate("jwt", { session: false }),
  userController.changePassword
);

router.delete('/deletemyaccount',
  passport.authenticate("jwt", { session: false })
  , userController.deleteMyAccount)

module.exports = router;
