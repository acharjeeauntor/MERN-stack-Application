const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateResetPasswordInput(data) {
     let errors = {};

  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "New Password field is required";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 10 })) {
    errors.newPassword = "New Password must be at least 6 characters";
  }

  if (!Validator.equals(data.newPassword, data.confirmPassword)) {
    errors.confirmPassword = "Password not match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
