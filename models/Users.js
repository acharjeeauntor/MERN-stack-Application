const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true
  },
  local: {
    name: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    },
    avatar: {
      type: String
    },
    resetToken: String,
    resetTokenExpiration:Date
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    avatar: {
      type: String
    },
    name: {
      type:String
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    name: {
      type:String
    },
    avatar: {
      type: String
    }
  }
});

// Create a model
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
