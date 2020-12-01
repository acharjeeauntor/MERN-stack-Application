const Exp = require("../../models/Exp");

// Load Input Validation
const validateExpInput = require("../../validation/incExp");

exports.addExp = (req, res) => {
  const { errors, isValid } = validateExpInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { desc, amount } = req.body;
  const newExp = new Exp({
    user: req.user.id,
    desc,
    amount
  });
  newExp
    .save()
    .then((exp) => res.status(200).json(exp))
    .catch((err) => console.log("please Fill up the required fields"));
};

exports.getExpList = (req, res) => {
  Exp.find({ user: req.user.id })
    .then((expList) => res.json(expList))
    .catch((err) => console.log(err));
};

exports.getTotalExp = (req, res) => {
  Exp.find({ user: req.user.id })
    .then((expList) => {
      let initialExp = 0;
      expList.forEach((exp) => {
        initialExp = initialExp + exp.amount;
      });
      res.json({ exp: initialExp });
    })
    .catch((err) => console.log(err));
};

exports.deleteExp = (req, res) => {
  const expId = req.params.id;
  Exp.findById({ _id: expId })
    .then((exp) => {
      if (exp.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "user not authorized" });
      }
      exp.remove().then((result) => res.json(result));
    })
    .catch((err) =>
      res.status(404).json({ noIncomeFound: "No expenses List found" })
    );
};
