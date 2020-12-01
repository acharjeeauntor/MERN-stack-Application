const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  desc: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default:0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Exp = mongoose.model("exp", expSchema);
module.exports = Exp;
