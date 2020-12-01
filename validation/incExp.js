const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateincExpInput(data) {
  let errors = {};

  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";

  
  if (Validator.isEmpty(data.desc)) {
    errors.desc = "Description field is required";
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
