const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
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
  }
);

const Income = mongoose.model("income", incomeSchema);
module.exports = Income;
