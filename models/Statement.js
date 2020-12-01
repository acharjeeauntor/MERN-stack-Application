const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statementSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  todayExp: {
    type: Number,
    required: true,
    default:0
  },
  todayInc: {
    type: Number,
    required: true,
    default:0
  },
  todayTotal: {
       type: Number,
       required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Statement = mongoose.model("statement", statementSchema);
module.exports = Statement;
