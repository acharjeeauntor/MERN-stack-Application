const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../../config/passport");
const passportJwt = passport.authenticate("jwt", { session: false });
const budgetController = require("../../controllers/budget/Exp");


router.post("/", passportJwt, budgetController.addExp);

router.get("/getexplist", passportJwt, budgetController.getExpList);

router.get("/gettotalexp", passportJwt, budgetController.getTotalExp);

router.delete("/deleteexp/:id", passportJwt, budgetController.deleteExp);

module.exports = router;
