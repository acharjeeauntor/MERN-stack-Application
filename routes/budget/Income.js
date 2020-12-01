const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../../config/passport");
const passportJwt = passport.authenticate("jwt", { session: false });
const budgetController = require("../../controllers/budget/Income");

router.post("/", passportJwt, budgetController.addIncome);

router.get("/getincomelist", passportJwt, budgetController.getIncomeList);

router.get("/gettotalincome", passportJwt, budgetController.getTotalIncome);

router.delete("/deleteincome/:id", passportJwt, budgetController.deleteIncome);

module.exports = router;
