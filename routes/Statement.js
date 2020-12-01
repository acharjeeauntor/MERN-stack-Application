const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const passportJwt = passport.authenticate("jwt", { session: false });
const statementController = require("../controllers/Statement");

router.delete("/", passportJwt, statementController.addStatement);

router.get("/mystatement", passportJwt, statementController.getStatement);

module.exports = router;
